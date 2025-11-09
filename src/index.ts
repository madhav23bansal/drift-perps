import * as dotenv from 'dotenv';

import {
  BN,
  DriftClient,
  MainnetSpotMarkets,
  MarketType,
  PositionDirection,
  QUOTE_PRECISION,
  SpotMarkets,
} from '@drift-labs/sdk';
import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  TransactionInstruction,
  VersionedTransaction,
} from '@solana/web3.js';
import {
  TOKEN_PROGRAM_ID,
  getAccount,
  getAssociatedTokenAddress,
  getOrCreateAssociatedTokenAccount,
} from '@solana/spl-token';

// @ts-ignore - bs58 types may not be available but the package works
import bs58 from 'bs58';

dotenv.config();

// Get public key from private key (base58 string, JSON string, or array)
function getPublicKeyFromPrivateKey(privateKey: string | number[] | Uint8Array): PublicKey {
  let keypair: Keypair;
  
  // Check if it's a Uint8Array first
  if (privateKey instanceof Uint8Array) {
    if (privateKey.length !== 64) {
      throw new Error(`Invalid secret key length: ${privateKey.length}, expected 64`);
    }
    keypair = Keypair.fromSecretKey(privateKey);
  } 
  // Check if it's an array
  else if (Array.isArray(privateKey)) {
    const secretKey = Uint8Array.from(privateKey);
    if (secretKey.length !== 64) {
      throw new Error(`Invalid secret key length: ${secretKey.length}, expected 64`);
    }
    keypair = Keypair.fromSecretKey(secretKey);
  } 
  // Check if it's a string
  else if (typeof privateKey === 'string') {
    try {
      // Try parsing as JSON array first
      const parsed = JSON.parse(privateKey);
      if (Array.isArray(parsed)) {
        keypair = Keypair.fromSecretKey(Uint8Array.from(parsed));
      } else {
        throw new Error('JSON parsed but not an array');
      }
    } catch (jsonError) {
      // If JSON parse fails, try as base58 (Solana format)
      try {
        const decoded = bs58.decode(privateKey);
        if (decoded.length === 64) {
          keypair = Keypair.fromSecretKey(decoded);
        } else {
          throw new Error(`Invalid secret key length: ${decoded.length}, expected 64`);
        }
      } catch (base58Error) {
        // If base58 fails, try as base64
        try {
          const decoded = Uint8Array.from(Buffer.from(privateKey, 'base64'));
          if (decoded.length === 64) {
            keypair = Keypair.fromSecretKey(decoded);
          } else {
            throw new Error(`Invalid secret key length: ${decoded.length}, expected 64`);
          }
        } catch (base64Error) {
          throw new Error('Invalid private key format. Expected JSON array, base58, or base64 string');
        }
      }
    }
  } else {
    throw new Error('Invalid private key type');
  }
  return keypair.publicKey;
}

// Get spot market index for USDC or SOL
function getSpotMarketIndex(asset: 'USDC' | 'SOL', env: 'mainnet-beta' | 'devnet' = 'mainnet-beta'): number {
  const markets = env === 'mainnet-beta' ? MainnetSpotMarkets : SpotMarkets[env];
  const market = markets.find((m) => m.symbol === asset);
  if (!market) {
    throw new Error(`${asset} market not found`);
  }
  return market.marketIndex;
}

// Initialize DriftClient with public key only (no private key)
async function initializeDriftClient(
  connection: Connection,
  userPublicKey: PublicKey,
  env: 'mainnet-beta' | 'devnet' = 'mainnet-beta'
): Promise<DriftClient> {
  // Create a wallet with user's public key - we won't use it for signing
  // but it ensures transactions are built with the correct fee payer
  const wallet = {
    publicKey: userPublicKey,
    signTransaction: async (tx: any) => {
      // This won't actually be called since we sign separately
      throw new Error('Should not call signTransaction on this wallet');
    },
    signAllTransactions: async (txs: any[]) => {
      // This won't actually be called since we sign separately
      throw new Error('Should not call signAllTransactions on this wallet');
    },
  };

  // Use WebSocket subscription instead of polling to work with free RPC endpoints
  const driftClient = new DriftClient({
    connection,
    wallet: wallet,
    env,
    perpMarketIndexes: [0], // Subscribe to market index 0
    spotMarketIndexes: [0, 1], // Subscribe to USDC and SOL markets
    accountSubscription: {
      type: 'websocket',
      commitment: 'confirmed',
    },
    authority: userPublicKey, // Use public key only, not private key
  });

  await driftClient.subscribe();
  return driftClient;
}

// Get or create user account
async function ensureUserAccount(
  driftClient: DriftClient,
  userPublicKey: PublicKey,
  subAccountId: number = 0
): Promise<PublicKey | null> {
  // First, add the user to DriftClient if it doesn't exist
  try {
    const user = driftClient.getUser(subAccountId, userPublicKey);
    if (user) {
      const exists = await user.exists();
      if (exists) {
        return user.getUserAccountPublicKey();
      }
    }
  } catch (error) {
    // User doesn't exist in DriftClient, add it
    console.log('User not found in DriftClient, adding user...');
  }

  // Add user to DriftClient
  await driftClient.addUser(subAccountId, userPublicKey);
  
  // Check if user account exists on-chain
  const user = driftClient.getUser(subAccountId, userPublicKey);
  const exists = await user.exists();
  
  if (exists) {
    return user.getUserAccountPublicKey();
  }

  // User account doesn't exist on-chain, will be created in deposit transaction
  return null;
}

// Build deposit transaction (unsigned)
async function buildDepositTransaction(
  driftClient: DriftClient,
  userPublicKey: PublicKey,
  amount: BN,
  asset: 'USDC' | 'SOL',
  subAccountId: number = 0
): Promise<Transaction | VersionedTransaction> {
  const spotMarketIndex = getSpotMarketIndex(asset, driftClient.env as 'mainnet-beta' | 'devnet');
  
  // Get associated token account for the asset
  const spotMarket = driftClient.getSpotMarketAccount(spotMarketIndex);
  if (!spotMarket) {
    throw new Error(`Spot market ${spotMarketIndex} not found`);
  }

  // Get or create associated token account
  // Note: This requires the user to have SOL for fees and the token account creation
  // For now, we'll just get the address - the account should exist or be created by the deposit instruction
  const associatedTokenAccount = await getAssociatedTokenAddress(
    spotMarket.mint,
    userPublicKey,
    false, // allowOwnerOffCurve
    TOKEN_PROGRAM_ID
  );
  
  console.log(`Associated Token Account: ${associatedTokenAccount.toString()}`);

  // Check if user account exists, if not, create it with deposit
  const existingUserAccount = await ensureUserAccount(driftClient, userPublicKey, subAccountId);
  const user = driftClient.getUser(subAccountId, userPublicKey);
  const userExists = existingUserAccount !== null;

  let instructions: TransactionInstruction[];

  if (!userExists) {
    // Initialize user account and deposit in one transaction
    const result = await driftClient.createInitializeUserAccountAndDepositCollateralIxs(
      amount,
      associatedTokenAccount,
      spotMarketIndex,
      subAccountId
    );
    instructions = result.ixs;
  } else {
    // Just deposit
    instructions = await driftClient.getDepositTxnIx(
      amount,
      spotMarketIndex,
      associatedTokenAccount,
      subAccountId
    );
  }

  // Build transaction with user as fee payer
  const transaction = await driftClient.buildTransaction(
    instructions,
    undefined, // txParams
    undefined, // txVersion
    undefined, // lookupTables
    undefined, // forceVersionedTransaction
    undefined, // recentBlockhash
    undefined, // optionalIxs
  );
  
  // For VersionedTransaction, we need to ensure the signer is in the account keys
  if (transaction instanceof VersionedTransaction) {
    // The transaction should already have the signer set up by buildTransaction
    // But we need to make sure the fee payer is the user
    return transaction;
  } else {
    // For legacy Transaction, set fee payer
    transaction.feePayer = userPublicKey;
    return transaction;
  }
}

// Calculate trade size for 10x leverage
function calculateTradeSizeForLeverage(
  user: any,
  perpMarketIndex: number,
  leverage: number,
  direction: PositionDirection
): BN {
  // Get free collateral
  const freeCollateral = user.getFreeCollateral();
  
  // Calculate buying power with leverage
  // Buying power = free collateral * leverage
  const buyingPower = freeCollateral.mul(new BN(leverage));
  
  // Get max trade size for the perp market
  const maxTradeSize = user.getMaxTradeSizeUSDCForPerp(
    perpMarketIndex,
    direction
  );
  
  // Use the minimum of buying power and max trade size
  const tradeSize = BN.min(buyingPower, maxTradeSize.tradeSize);
  
  return tradeSize;
}

// Build perp order transaction (unsigned)
async function buildPerpOrderTransaction(
  driftClient: DriftClient,
  userPublicKey: PublicKey,
  perpMarketIndex: number,
  tradeSize: BN,
  direction: PositionDirection,
  subAccountId: number = 0
): Promise<Transaction | VersionedTransaction> {
  // Get perp market to check current price
  const perpMarket = driftClient.getPerpMarketAccount(perpMarketIndex);
  if (!perpMarket) {
    throw new Error(`Perp market ${perpMarketIndex} not found`);
  }

  // Get oracle price
  const oraclePriceData = driftClient.getOraclePriceDataAndSlot(
    perpMarket.amm.oracle,
    perpMarket.amm.oracleSource
  );
  
  if (!oraclePriceData) {
    throw new Error('Oracle price data not available');
  }

  // Calculate base asset amount from quote size
  // baseAmount = quoteSize / price
  const price = oraclePriceData.data.price;
  const baseAmount = tradeSize.mul(QUOTE_PRECISION).div(price);

  // Build order params
  const orderParams = {
    marketIndex: perpMarketIndex,
    marketType: MarketType.PERP,
    direction,
    baseAssetAmount: baseAmount,
    price: new BN(0), // Market order (0 = market price)
    orderType: {
      market: {},
    },
    reduceOnly: false,
  };

  // Get place perp order instruction
  const instruction = await driftClient.getPlacePerpOrderIx(orderParams, subAccountId);

  const transaction = await driftClient.buildTransaction(instruction);
  return transaction;
}

// Main function: Deposit and get quote for 10x leverage trade
export async function depositAndGetTradeQuote(
  privateKey: string | number[] | Uint8Array,
  depositAmount: number,
  asset: 'USDC' | 'SOL',
  direction: 'long' | 'short' = 'long',
  rpcUrl?: string
): Promise<{
  depositTx: Transaction | VersionedTransaction;
  tradeTx: Transaction | VersionedTransaction;
  tradeSize: string;
  estimatedPrice: string;
}> {
  try {
    // Get public key from private key
    const userPublicKey = getPublicKeyFromPrivateKey(privateKey);

    // Initialize connection
    const connection = new Connection(
      rpcUrl || process.env.RPC_URL || 'https://api.mainnet-beta.solana.com',
      'confirmed'
    );

    // Initialize DriftClient with public key only
    const driftClient = await initializeDriftClient(connection, userPublicKey, 'mainnet-beta');

    console.log(`User Public Key: ${userPublicKey.toString()}`);
    console.log(`Depositing ${depositAmount} ${asset}...`);

    // Convert deposit amount to BN (with proper precision)
    const spotMarketIndex = getSpotMarketIndex(asset, 'mainnet-beta');
    const spotMarket = driftClient.getSpotMarketAccount(spotMarketIndex);
    if (!spotMarket) {
      throw new Error(`Spot market ${spotMarketIndex} not found`);
    }

    // Get precision from market config
    const marketConfig = MainnetSpotMarkets.find((m) => m.marketIndex === spotMarketIndex);
    if (!marketConfig) {
      throw new Error(`Market config for ${asset} not found`);
    }

    // Amount in token precision (e.g., USDC has 6 decimals, SOL has 9 decimals)
    const depositAmountBN = new BN(depositAmount).mul(marketConfig.precision);

    // Build deposit transaction
    const depositTx = await buildDepositTransaction(
      driftClient,
      userPublicKey,
      depositAmountBN,
      asset,
      0
    );

    console.log('Deposit transaction built');

    // After deposit, we need to simulate or calculate trade size
    // For now, we'll calculate based on the deposit amount and leverage
    const leverage = 10;
    
    // Calculate trade size: depositAmount * leverage (in quote precision)
    // Convert deposit amount to quote precision
    const depositInQuotePrecision = depositAmountBN.mul(QUOTE_PRECISION).div(marketConfig.precision);
    const tradeSize = depositInQuotePrecision.mul(new BN(leverage));

    // Get perp market for price
    const perpMarket = driftClient.getPerpMarketAccount(0);
    if (!perpMarket) {
      throw new Error('Perp market 0 not found');
    }

    const oraclePriceData = driftClient.getOraclePriceDataAndSlot(
      perpMarket.amm.oracle,
      perpMarket.amm.oracleSource
    );

    if (!oraclePriceData) {
      throw new Error('Oracle price data not available');
    }

    const positionDirection = direction === 'long' ? PositionDirection.LONG : PositionDirection.SHORT;

    // Build perp order transaction
    const tradeTx = await buildPerpOrderTransaction(
      driftClient,
      userPublicKey,
      0, // market index 0
      tradeSize,
      positionDirection,
      0
    );

    const price = oraclePriceData.data.price;
    const priceInUSD = price.toNumber() / 1e6; // Convert from PRICE_PRECISION to USD

    console.log(`Trade size: ${tradeSize.toString()} (${tradeSize.toNumber() / 1e6} USDC)`);
    console.log(`Estimated price: ${priceInUSD} USD`);

    return {
      depositTx,
      tradeTx,
      tradeSize: tradeSize.toString(),
      estimatedPrice: priceInUSD.toString(),
    };
  } catch (error) {
    console.error('Error in depositAndGetTradeQuote:', error);
    throw error;
  }
}

// Helper function to sign transaction with private key
export function signTransactionWithPrivateKey(
  transaction: Transaction | VersionedTransaction,
  privateKey: string | number[] | Uint8Array
): Transaction | VersionedTransaction {
  const keypair = getKeypairFromPrivateKey(privateKey);
  
  if (transaction instanceof VersionedTransaction) {
    transaction.sign([keypair]);
  } else {
    transaction.sign(keypair);
  }
  
  return transaction;
}

// Helper to get keypair from private key
function getKeypairFromPrivateKey(privateKey: string | number[] | Uint8Array): Keypair {
  if (typeof privateKey === 'string') {
    try {
      // Try parsing as JSON array first
      const parsed = JSON.parse(privateKey);
      if (Array.isArray(parsed)) {
        return Keypair.fromSecretKey(Uint8Array.from(parsed));
      } else {
        throw new Error('JSON parsed but not an array');
      }
    } catch (jsonError) {
      // If JSON parse fails, try as base58 (Solana format)
      try {
        const decoded = bs58.decode(privateKey);
        if (decoded.length === 64) {
          return Keypair.fromSecretKey(decoded);
        } else {
          throw new Error(`Invalid secret key length: ${decoded.length}, expected 64`);
        }
      } catch (base58Error) {
        // If base58 fails, try as base64
        try {
          const decoded = Uint8Array.from(Buffer.from(privateKey, 'base64'));
          if (decoded.length === 64) {
            return Keypair.fromSecretKey(decoded);
          } else {
            throw new Error(`Invalid secret key length: ${decoded.length}, expected 64`);
          }
        } catch (base64Error) {
          throw new Error('Invalid private key format. Expected JSON array, base58, or base64 string');
        }
      }
    }
  } else if (Array.isArray(privateKey)) {
    return Keypair.fromSecretKey(Uint8Array.from(privateKey));
  } else if (privateKey instanceof Uint8Array) {
    return Keypair.fromSecretKey(privateKey);
  } else {
    throw new Error('Invalid private key type');
  }
}

// Example usage
async function main() {
  // For testing: Generate a dummy keypair if no private key is provided
  let privateKey: string | number[] | Uint8Array | undefined;
  let dummyKeypair: Keypair | null = null;
  
  if (process.env.PRIVATE_KEY && process.env.PRIVATE_KEY.trim() !== '') {
    privateKey = process.env.PRIVATE_KEY;
    console.log('Using PRIVATE_KEY from environment');
  } else {
    console.log('No PRIVATE_KEY found, generating dummy keypair for testing...');
    dummyKeypair = Keypair.generate();
    privateKey = Array.from(dummyKeypair.secretKey);
    console.log('Using dummy keypair for testing (transactions will not be valid for real accounts)');
    console.log(`Dummy keypair public key: ${dummyKeypair.publicKey.toString()}`);
  }

  try {
    console.log('Starting deposit and trade quote generation...\n');
    
    // If we have a dummy keypair, use it directly to get public key
    const userPublicKey = dummyKeypair 
      ? dummyKeypair.publicKey 
      : (privateKey ? getPublicKeyFromPrivateKey(privateKey) : (() => { throw new Error('No private key or keypair provided'); })());
    
    // Initialize connection
    const connection = new Connection(
      process.env.RPC_URL || 'https://api.mainnet-beta.solana.com',
      'confirmed'
    );

    // Initialize DriftClient with public key only
    const driftClient = await initializeDriftClient(connection, userPublicKey, 'mainnet-beta');

    console.log(`User Public Key: ${userPublicKey.toString()}`);
    console.log(`Depositing 5 USDC...`);

    // Get spot market for USDC
    const spotMarketIndex = getSpotMarketIndex('USDC', 'mainnet-beta');
    const spotMarket = driftClient.getSpotMarketAccount(spotMarketIndex);
    if (!spotMarket) {
      throw new Error(`Spot market ${spotMarketIndex} not found`);
    }

    // Get precision from market config
    const marketConfig = MainnetSpotMarkets.find((m) => m.marketIndex === spotMarketIndex);
    if (!marketConfig) {
      throw new Error(`Market config for USDC not found`);
    }

    // Amount in token precision (5 USDC)
    const depositAmountBN = new BN(5).mul(marketConfig.precision);

    // Check USDC balance before attempting deposit
    const associatedTokenAccount = await getAssociatedTokenAddress(
      spotMarket.mint,
      userPublicKey,
      false,
      TOKEN_PROGRAM_ID
    );
    
    console.log(`Checking USDC balance...`);
    console.log(`Associated Token Account: ${associatedTokenAccount.toString()}`);
    
    try {
      const tokenAccount = await getAccount(connection, associatedTokenAccount);
      const balance = Number(tokenAccount.amount);
      const balanceInUSDC = balance / Math.pow(10, marketConfig.precisionExp.toNumber());
      console.log(`Current USDC balance: ${balanceInUSDC} USDC`);
      
      if (balance < depositAmountBN.toNumber()) {
        throw new Error(
          `Insufficient USDC balance. Required: 5 USDC, Available: ${balanceInUSDC} USDC`
        );
      }
    } catch (error: any) {
      if (error.name === 'TokenAccountNotFoundError') {
        console.log('⚠️  USDC token account does not exist. You need to have USDC in your wallet first.');
        throw new Error('USDC token account not found. Please ensure you have USDC in your wallet.');
      }
      throw error;
    }

    // Build deposit transaction
    const depositTx = await buildDepositTransaction(
      driftClient,
      userPublicKey,
      depositAmountBN,
      'USDC',
      0
    );

    console.log('Deposit transaction built');

    // Calculate trade size for 10x leverage
    const leverage = 10;
    const depositInQuotePrecision = depositAmountBN.mul(QUOTE_PRECISION).div(marketConfig.precision);
    const tradeSize = depositInQuotePrecision.mul(new BN(leverage));

    // Get perp market for price
    const perpMarket = driftClient.getPerpMarketAccount(0);
    if (!perpMarket) {
      throw new Error('Perp market 0 not found');
    }

    const oraclePriceData = driftClient.getOraclePriceDataAndSlot(
      perpMarket.amm.oracle,
      perpMarket.amm.oracleSource
    );

    if (!oraclePriceData) {
      throw new Error('Oracle price data not available');
    }

    const positionDirection = PositionDirection.LONG;

    // Build perp order transaction
    const tradeTx = await buildPerpOrderTransaction(
      driftClient,
      userPublicKey,
      0,
      tradeSize,
      positionDirection,
      0
    );

    const price = oraclePriceData.data.price;
    const priceInUSD = price.toNumber() / 1e6;

    console.log(`Trade size: ${tradeSize.toString()} (${tradeSize.toNumber() / 1e6} USDC)`);
    console.log(`Estimated price: ${priceInUSD} USD`);

    const result = {
      depositTx,
      tradeTx,
      tradeSize: tradeSize.toString(),
      estimatedPrice: priceInUSD.toString(),
    };

    console.log('\n=== Transaction Data ===');
    console.log('Deposit Transaction built');
    console.log('Trade Transaction built');
    console.log('Trade Size:', result.tradeSize);
    console.log('Estimated Price:', result.estimatedPrice);

    // Sign and send deposit transaction
    if (dummyKeypair) {
      console.log('\n⚠️  Using dummy keypair - transactions are for testing only and will fail on-chain');
      console.log('Please provide a real PRIVATE_KEY to send actual transactions.');
    } else if (privateKey) {
      console.log('\nSigning deposit transaction...');
      const signedDepositTx = signTransactionWithPrivateKey(result.depositTx, privateKey);
      
      console.log('Sending deposit transaction to network...');
      
      // Try to send with preflight check first
      let depositTxSig: string;
      try {
        depositTxSig = await connection.sendRawTransaction(
          signedDepositTx instanceof VersionedTransaction
            ? signedDepositTx.serialize()
            : signedDepositTx.serialize(),
          {
            skipPreflight: false,
            maxRetries: 3,
          }
        );
      } catch (error: any) {
        // If simulation fails due to insufficient funds, provide helpful message
        if (error.message && error.message.includes('insufficient funds')) {
          console.error('\n❌ Transaction failed: Insufficient USDC balance');
          console.error('Please ensure your wallet has at least 5 USDC before depositing.');
          throw error;
        }
        // If it's a simulation error, try with skipPreflight
        if (error.message && error.message.includes('Simulation failed')) {
          console.log('⚠️  Preflight check failed, attempting to send anyway (skipPreflight=true)...');
          depositTxSig = await connection.sendRawTransaction(
            signedDepositTx instanceof VersionedTransaction
              ? signedDepositTx.serialize()
              : signedDepositTx.serialize(),
            {
              skipPreflight: true,
              maxRetries: 3,
            }
          );
        } else {
          throw error;
        }
      }
      
      console.log(`✅ Deposit transaction sent! Signature: ${depositTxSig}`);
      console.log(`   View on Solana Explorer: https://solscan.io/tx/${depositTxSig}`);
      
      // Wait for confirmation with longer timeout
      console.log('Waiting for confirmation (this may take up to 60 seconds)...');
      try {
        const confirmation = await Promise.race([
          connection.confirmTransaction(depositTxSig, 'confirmed'),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 60000)
          )
        ]) as any;
        
        if (confirmation.value?.err) {
          console.error('❌ Transaction failed:', confirmation.value.err);
          console.error('\nPossible reasons:');
          console.error('1. Insufficient USDC balance in wallet');
          console.error('2. Associated token account does not exist');
          console.error('3. Insufficient SOL for transaction fees');
          console.error('4. User account initialization failed');
          console.error('\nPlease check:');
          console.error(`- Your wallet has at least 5 USDC: ${userPublicKey.toString()}`);
          console.error(`- Your wallet has SOL for fees`);
          console.error(`- View transaction: https://solscan.io/tx/${depositTxSig}`);
          throw new Error(`Transaction failed: ${JSON.stringify(confirmation.value.err)}`);
        } else {
          console.log(`✅ Deposit transaction confirmed!`);
          console.log(`\n💰 Successfully deposited 5 USDC!`);
        }
      } catch (error: any) {
        if (error.message === 'Timeout' || error.message?.includes('not confirmed')) {
          console.log(`\n⏳ Confirmation timeout - checking transaction status...`);
          // Check if transaction was actually successful
          const status = await connection.getSignatureStatus(depositTxSig);
          if (status.value?.err) {
            console.error('❌ Transaction failed:', status.value.err);
            throw new Error(`Transaction failed: ${JSON.stringify(status.value.err)}`);
          } else if (status.value?.confirmationStatus) {
            console.log(`✅ Transaction appears to be ${status.value.confirmationStatus}`);
            console.log(`\n💰 Deposit may have succeeded! Please verify on Solana Explorer.`);
            console.log(`   View: https://solscan.io/tx/${depositTxSig}`);
          } else {
            console.log(`\n⚠️  Transaction status unknown. Please check manually:`);
            console.log(`   https://solscan.io/tx/${depositTxSig}`);
            // Continue anyway - the transaction might have succeeded
            console.log(`\n💰 Proceeding assuming deposit succeeded...`);
          }
        } else {
          throw error;
        }
      }
      
      // Now sign and send the trade transaction (only if deposit succeeded or we're proceeding)
      console.log('\nSigning trade transaction...');
      const signedTradeTx = signTransactionWithPrivateKey(result.tradeTx, privateKey);
      
      console.log('Sending trade transaction to network...');
      const tradeTxSig = await connection.sendRawTransaction(
        signedTradeTx instanceof VersionedTransaction
          ? signedTradeTx.serialize()
          : signedTradeTx.serialize(),
        {
          skipPreflight: false,
          maxRetries: 3,
        }
      );
      
      console.log(`✅ Trade transaction sent! Signature: ${tradeTxSig}`);
      console.log(`   View on Solana Explorer: https://solscan.io/tx/${tradeTxSig}`);
      
      // Wait for confirmation
      console.log('Waiting for confirmation...');
      try {
        const tradeConfirmation = await Promise.race([
          connection.confirmTransaction(tradeTxSig, 'confirmed'),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 60000)
          )
        ]) as any;
        
        if (tradeConfirmation.value?.err) {
          console.error('❌ Trade transaction failed:', tradeConfirmation.value.err);
          throw new Error(`Trade transaction failed: ${JSON.stringify(tradeConfirmation.value.err)}`);
        } else {
          console.log(`✅ Trade transaction confirmed!`);
          console.log(`\n🎉 Successfully opened ${result.tradeSize} USDC position at 10x leverage!`);
        }
      } catch (error: any) {
        if (error.message === 'Timeout' || error.message?.includes('not confirmed')) {
          console.log(`\n⏳ Trade confirmation timeout - checking status...`);
          const status = await connection.getSignatureStatus(tradeTxSig);
          if (status.value?.err) {
            console.error('❌ Trade transaction failed:', status.value.err);
            throw new Error(`Trade transaction failed: ${JSON.stringify(status.value.err)}`);
          } else {
            console.log(`✅ Trade transaction may have succeeded! Check: https://solscan.io/tx/${tradeTxSig}`);
          }
        } else {
          throw error;
        }
      }
    } else {
      console.log('\n⚠️  No private key provided. Cannot sign transactions.');
    }
  } catch (error) {
    console.error('Error:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
  }
}


// Run the main function
main();