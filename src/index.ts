import * as dotenv from 'dotenv';

import {
  BASE_PRECISION,
  BN,
  DriftClient,
  MainnetSpotMarkets,
  MarketType,
  PositionDirection,
  QUOTE_PRECISION,
  SpotMarkets,
  ZERO,
  calculateCollateralDepositRequiredForTrade,
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

// ============================================================================
// CONFIGURATION - Edit these values as needed
// ============================================================================

// Environment variables (from .env file)
const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
const RPC_URL = process.env.RPC_URL || 'https://api.mainnet-beta.solana.com';

// Trading configuration - Edit these values
const COLLATERAL_AMOUNT = 5; // Total collateral available (in USDC or SOL)
const COLLATERAL_ASSET: 'USDC' | 'SOL' = 'USDC'; // Asset to deposit as collateral
const COLLATERAL_PERCENTAGE = 0.25; // Percentage of collateral to use (0.5 = 50%, 1.0 = 100%)
const LEVERAGE = 20; // Leverage multiplier (e.g., 10 for 10x)
const POSITION: 'long' | 'short' = 'long'; // Position direction
const MARKET_INDEX = 0; // Perp market index to trade
const SHOULD_DEPOSIT = false; // Set to false to skip deposit and only open position

// ============================================================================

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

// Initialize DriftClient with keypair (for signing transactions)
async function initializeDriftClient(
  connection: Connection,
  userPublicKey: PublicKey,
  keypair?: Keypair,
  env: 'mainnet-beta' | 'devnet' = 'mainnet-beta'
): Promise<DriftClient> {
  // Create a wallet - if keypair is provided, use it for signing; otherwise use dummy wallet
  let wallet: any;
  
  if (keypair) {
    // Create a real wallet that can sign transactions
    wallet = {
      publicKey: keypair.publicKey,
      signTransaction: async (tx: any) => {
        if (tx instanceof Transaction) {
          tx.sign(keypair);
        } else {
          // VersionedTransaction
          tx.sign([keypair]);
        }
        return tx;
      },
      signAllTransactions: async (txs: any[]) => {
        return txs.map(tx => {
          if (tx instanceof Transaction) {
            tx.sign(keypair);
          } else {
            // VersionedTransaction
            tx.sign([keypair]);
          }
          return tx;
        });
      },
    };
  } else {
    // Create a dummy wallet (for read-only operations)
    wallet = {
      publicKey: userPublicKey,
      signTransaction: async (tx: any) => {
        throw new Error('Should not call signTransaction on this wallet - keypair not provided');
      },
      signAllTransactions: async (txs: any[]) => {
        throw new Error('Should not call signAllTransactions on this wallet - keypair not provided');
      },
    };
  }

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
    authority: userPublicKey,
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

// Calculate position size for desired leverage using Drift's margin calculation
// This function uses calculateCollateralDepositRequiredForTrade to find the correct position size
async function calculatePositionSizeForLeverage(
  driftClient: DriftClient,
  user: any,
  perpMarketIndex: number,
  collateralToUse: BN, // Collateral to use in quote precision
  leverage: number,
  direction: PositionDirection,
  collateralSpotMarketIndex: number, // Spot market index for collateral (0 for USDC, 1 for SOL)
  price: BN // Current oracle price
): Promise<{ baseAmount: BN; positionNotional: BN; actualLeverage: number }> {
  console.log(`\n  📐 calculatePositionSizeForLeverage called:`);
  console.log(`    Perp Market Index: ${perpMarketIndex}`);
  console.log(`    Collateral to Use: ${collateralToUse.toString()} (${collateralToUse.toNumber() / 1e6} USDC)`);
  console.log(`    Desired Leverage: ${leverage}x`);
  console.log(`    Direction: ${direction === PositionDirection.LONG ? 'LONG' : 'SHORT'}`);
  
  // Get perp market
  const perpMarket = driftClient.getPerpMarketAccount(perpMarketIndex);
  if (!perpMarket) {
    throw new Error(`Perp market ${perpMarketIndex} not found`);
  }
  
  const orderStepSize = perpMarket.amm.orderStepSize;
  
  // Calculate target position notional: collateral * leverage
  const targetPositionNotional = collateralToUse.mul(new BN(leverage));
  const targetPositionNotionalInUSD = targetPositionNotional.toNumber() / 1e6;
  console.log(`    Target Position Notional: ${targetPositionNotional.toString()} (${targetPositionNotionalInUSD.toFixed(6)} USDC)`);
  
  // Convert to base amount (initial estimate)
  // IMPORTANT: baseAmount must be in BASE_PRECISION (1e9 for SOL), not QUOTE_PRECISION!
  // Formula: baseAmount (in BASE_PRECISION) = (positionNotional / price) * BASE_PRECISION
  // Where: positionNotional is in QUOTE_PRECISION (1e6), price is in PRICE_PRECISION (1e6)
  let estimatedBaseAmount = targetPositionNotional.mul(BASE_PRECISION).div(price);
  
  // Binary search to find the base amount that uses exactly collateralToUse
  // Match a.ts exactly - start with estimatedBaseAmount as high bound
  let low = orderStepSize;
  let high = estimatedBaseAmount;
  
  // Round high to nearest orderStepSize (matching a.ts exactly)
  const highRemainder = high.mod(orderStepSize);
  if (!highRemainder.isZero()) {
    high = high.sub(highRemainder);
  }
  if (high.lt(orderStepSize)) {
    high = orderStepSize;
  }
  
  let bestBaseAmount = high;
  let bestDiff = new BN(Number.MAX_SAFE_INTEGER);
  let bestRequiredCollateral = new BN(0);
  
  console.log(`    Starting binary search for optimal position size...`);
  console.log(`    Search range: ${low.toString()} to ${high.toString()} (base asset)`);
  
  // Binary search with max iterations
  const maxIterations = 20;
  for (let i = 0; i < maxIterations && low.lte(high); i++) {
    // Calculate mid point, rounded to orderStepSize
    let mid = low.add(high).div(new BN(2));
    const midRemainder = mid.mod(orderStepSize);
    if (!midRemainder.isZero()) {
      mid = mid.sub(midRemainder);
    }
    if (mid.lt(orderStepSize)) {
      mid = orderStepSize;
    }
    
    // Calculate required collateral for this base amount
    const requiredCollateral = calculateCollateralDepositRequiredForTrade(
      driftClient,
      perpMarketIndex,
      direction === PositionDirection.LONG ? mid : mid.neg(), // Negative for short
      collateralSpotMarketIndex
    );
    
    const diff = requiredCollateral.sub(collateralToUse).abs();
    
    // Track best match (matching a.ts exactly)
    if (diff.lt(bestDiff)) {
      bestDiff = diff;
      bestBaseAmount = mid;
      bestRequiredCollateral = requiredCollateral;
    }
    
    const requiredCollateralInUSD = requiredCollateral.toNumber() / 1e6;
    console.log(`    Iteration ${i + 1}: baseAmount=${mid.toString()}, requiredCollateral=${requiredCollateralInUSD.toFixed(6)} USDC`);
    
    // Adjust search range
    if (requiredCollateral.gt(collateralToUse)) {
      // Too much collateral required, reduce position size
      high = mid.sub(orderStepSize);
      if (high.lt(orderStepSize)) {
        high = orderStepSize;
      }
    } else {
      // Can use more collateral, increase position size
      low = mid.add(orderStepSize);
    }
    
    // If we're close enough (within 0.1% of target), break
    const diffPercent = diff.mul(new BN(10000)).div(collateralToUse).toNumber() / 100;
    if (diffPercent < 0.1) {
      console.log(`    ✅ Found optimal position size (within 0.1% of target)`);
      break;
    }
  }
  
  // Calculate final position notional and leverage
  // Use bestRequiredCollateral from binary search (matching a.ts exactly)
  // Correct formula from SDK calculatePerpLiabilityValue:
  // positionNotional = baseAmount * price / BASE_PRECISION
  // Result is already in QUOTE_PRECISION (1e6)
  const finalPositionNotional = bestBaseAmount.mul(price).div(BASE_PRECISION);
  const finalRequiredCollateral = bestRequiredCollateral; // Use the best match from binary search
  
  const finalPositionNotionalInUSD = finalPositionNotional.toNumber() / 1e6;
  const finalRequiredCollateralInUSD = finalRequiredCollateral.toNumber() / 1e6;
  const actualLeverage = finalPositionNotionalInUSD / finalRequiredCollateralInUSD;
  
  console.log(`\n    ✅ Final Position Size:`);
  console.log(`      Base Amount: ${bestBaseAmount.toString()}`);
  console.log(`      Position Notional: ${finalPositionNotional.toString()} (${finalPositionNotionalInUSD.toFixed(6)} USDC)`);
  console.log(`      Required Collateral: ${finalRequiredCollateral.toString()} (${finalRequiredCollateralInUSD.toFixed(6)} USDC)`);
  console.log(`      Actual Leverage: ${actualLeverage.toFixed(2)}x`);
  
  return {
    baseAmount: bestBaseAmount,
    positionNotional: finalPositionNotional,
    actualLeverage,
  };
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
  console.log(`\n🔨 Building Perp Order Transaction:`);
  console.log(`  Market Index: ${perpMarketIndex}`);
  console.log(`  Direction: ${direction === PositionDirection.LONG ? 'LONG' : 'SHORT'}`);
  console.log(`  Trade Size (input): ${tradeSize.toString()} (${tradeSize.toNumber() / 1e6} USDC)`);
  
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
  // IMPORTANT: baseAmount must be in BASE_PRECISION (1e9 for SOL)
  // Formula: baseAmount = (quoteSize / price) * BASE_PRECISION
  const price = oraclePriceData.data.price;
  const priceInUSD = price.toNumber() / 1e6;
  let baseAmount = tradeSize.mul(BASE_PRECISION).div(price);
  
  console.log(`  Oracle Price: ${price.toString()} (${priceInUSD.toFixed(2)} USD)`);
  console.log(`  Calculated Base Amount: ${baseAmount.toString()}`);

  // Ensure base amount meets minimum order step size requirement
  const orderStepSize = perpMarket.amm.orderStepSize;
  console.log(`  Order Step Size: ${orderStepSize.toString()}`);
  
  // Round up to the nearest multiple of orderStepSize
  if (baseAmount.lt(orderStepSize)) {
    console.log(`\n⚠️  WARNING: Calculated base amount (${baseAmount.toString()}) is below minimum order step size (${orderStepSize.toString()})`);
    console.log(`   This should have been caught earlier. Rounding up to minimum order step size...`);
    baseAmount = orderStepSize;
  } else {
    // Round up to nearest multiple of orderStepSize
    const remainder = baseAmount.mod(orderStepSize);
    if (!remainder.isZero()) {
      const originalBaseAmount = baseAmount.toString();
      baseAmount = baseAmount.sub(remainder).add(orderStepSize);
      console.log(`   Rounded up base amount from ${originalBaseAmount} to ${baseAmount.toString()} to meet order step size requirement`);
    } else {
      console.log(`   Base amount already meets order step size requirement`);
    }
  }
  
  // Recalculate actual trade size based on rounded base amount
  // Correct formula: positionNotional = baseAmount * price / BASE_PRECISION
  const actualTradeSize = baseAmount.mul(price).div(BASE_PRECISION);
  const actualTradeSizeInUSD = actualTradeSize.toNumber() / 1e6;
  
  console.log(`\n📊 Final Order Parameters:`);
  console.log(`  Base Asset Amount: ${baseAmount.toString()}`);
  console.log(`  Actual Trade Size: ${actualTradeSize.toString()} (${actualTradeSizeInUSD.toFixed(6)} USDC)`);
  console.log(`  Price per unit: ${priceInUSD.toFixed(2)} USD`);

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

  console.log(`  Order Type: Market Order`);
  console.log(`  Reduce Only: false`);

  // Get place perp order instruction
  const instruction = await driftClient.getPlacePerpOrderIx(orderParams, subAccountId);
  console.log(`  Instruction created successfully`);

  const transaction = await driftClient.buildTransaction(instruction);
  console.log(`  Transaction built successfully`);
  
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

    // Initialize DriftClient without keypair (read-only for building transactions)
    const driftClient = await initializeDriftClient(connection, userPublicKey, undefined, 'mainnet-beta');

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

// Main execution function
async function main() {
  // Validate configuration
  if (!PRIVATE_KEY || PRIVATE_KEY.trim() === '') {
    console.error('❌ Error: PRIVATE_KEY is required in .env file');
    console.error('   Please set PRIVATE_KEY in your .env file');
    process.exit(1);
  }

  const privateKey = PRIVATE_KEY;

  try {
    console.log('='.repeat(60));
    console.log('DRIFT PERPS TRADING BOT');
    console.log('='.repeat(60));
    console.log('\nConfiguration:');
    console.log(`  Collateral Amount: ${COLLATERAL_AMOUNT} ${COLLATERAL_ASSET}`);
    console.log(`  Collateral Percentage: ${(COLLATERAL_PERCENTAGE * 100).toFixed(0)}%`);
    console.log(`  Leverage: ${LEVERAGE}x`);
    console.log(`  Position: ${POSITION.toUpperCase()}`);
    console.log(`  Market Index: ${MARKET_INDEX}`);
    console.log(`  Should Deposit: ${SHOULD_DEPOSIT}`);
    console.log(`  RPC URL: ${RPC_URL}`);
    console.log('\n' + '='.repeat(60) + '\n');

    // Get public key from private key
    const userPublicKey = getPublicKeyFromPrivateKey(privateKey);
    console.log(`User Public Key: ${userPublicKey.toString()}\n`);

    // Get keypair from private key (needed for signing transactions)
    const keypair = getKeypairFromPrivateKey(privateKey);

    // Initialize connection
    const connection = new Connection(RPC_URL, 'confirmed');

    // Initialize DriftClient with keypair (for signing transactions)
    const driftClient = await initializeDriftClient(connection, userPublicKey, keypair, 'mainnet-beta');

    // Get spot market for the collateral asset
    const spotMarketIndex = getSpotMarketIndex(COLLATERAL_ASSET, 'mainnet-beta');
    const spotMarket = driftClient.getSpotMarketAccount(spotMarketIndex);
    if (!spotMarket) {
      throw new Error(`Spot market ${spotMarketIndex} not found`);
    }

    // Get precision from market config
    const marketConfig = MainnetSpotMarkets.find((m) => m.marketIndex === spotMarketIndex);
    if (!marketConfig) {
      throw new Error(`Market config for ${COLLATERAL_ASSET} not found`);
    }

    // Amount in token precision
    // marketConfig.precision is the precision value (e.g., 1000000 for USDC with 6 decimals)
    const depositAmountBN = new BN(COLLATERAL_AMOUNT).mul(marketConfig.precision);
    
    console.log(`Deposit amount calculation:`);
    console.log(`  Collateral Amount: ${COLLATERAL_AMOUNT} ${COLLATERAL_ASSET}`);
    console.log(`  Precision: ${marketConfig.precision.toString()}`);
    console.log(`  Precision Exponent: ${marketConfig.precisionExp.toString()}`);
    console.log(`  Deposit Amount (raw): ${depositAmountBN.toString()}`);
    console.log(`  Deposit Amount (formatted): ${depositAmountBN.toNumber() / marketConfig.precision.toNumber()} ${COLLATERAL_ASSET}`);

    // Check balance before attempting deposit
    const associatedTokenAccount = await getAssociatedTokenAddress(
      spotMarket.mint,
      userPublicKey,
      false,
      TOKEN_PROGRAM_ID
    );
    
    console.log(`Checking ${COLLATERAL_ASSET} balance...`);
    console.log(`Associated Token Account: ${associatedTokenAccount.toString()}`);
    
    // Check SOL balance for transaction fees
    const solBalance = await connection.getBalance(userPublicKey);
    const solBalanceInSOL = solBalance / 1e9;
    console.log(`SOL balance: ${solBalanceInSOL.toFixed(6)} SOL`);
    
    if (solBalance < 0.001 * 1e9) {
      console.error(`\n❌ Error: Insufficient SOL for transaction fees`);
      console.error(`   Current SOL balance: ${solBalanceInSOL.toFixed(6)} SOL`);
      console.error(`   Recommended: At least 0.001 SOL for transaction fees`);
      throw new Error('Insufficient SOL for transaction fees. Please add SOL to your wallet.');
    }
    
    try {
      const tokenAccount = await getAccount(connection, associatedTokenAccount);
      const balance = Number(tokenAccount.amount);
      const balanceInAsset = balance / Math.pow(10, marketConfig.precisionExp.toNumber());
      const requiredAmount = depositAmountBN.toNumber();
      
      console.log(`Current ${COLLATERAL_ASSET} balance: ${balanceInAsset} ${COLLATERAL_ASSET}`);
      console.log(`Required ${COLLATERAL_ASSET} amount: ${COLLATERAL_AMOUNT} ${COLLATERAL_ASSET} (${requiredAmount} raw units)`);
      console.log(`Available ${COLLATERAL_ASSET} amount: ${balance} raw units`);
      
      if (balance < requiredAmount) {
        const shortfall = (requiredAmount - balance) / Math.pow(10, marketConfig.precisionExp.toNumber());
        throw new Error(
          `Insufficient ${COLLATERAL_ASSET} balance. Required: ${COLLATERAL_AMOUNT} ${COLLATERAL_ASSET}, Available: ${balanceInAsset} ${COLLATERAL_ASSET}, Shortfall: ${shortfall.toFixed(6)} ${COLLATERAL_ASSET}`
        );
      }
      
      // Double-check with a fresh balance fetch right before building transaction
      console.log(`✅ Balance check passed: ${balanceInAsset} ${COLLATERAL_ASSET} >= ${COLLATERAL_AMOUNT} ${COLLATERAL_ASSET}`);
    } catch (error: any) {
      if (error.name === 'TokenAccountNotFoundError') {
        console.log(`⚠️  ${COLLATERAL_ASSET} token account does not exist. You need to have ${COLLATERAL_ASSET} in your wallet first.`);
        throw new Error(`${COLLATERAL_ASSET} token account not found. Please ensure you have ${COLLATERAL_ASSET} in your wallet.`);
      }
      throw error;
    }

    // Deposit logic (only if SHOULD_DEPOSIT is true)
    if (SHOULD_DEPOSIT) {
      // Build deposit transaction
      const depositTx = await buildDepositTransaction(
        driftClient,
        userPublicKey,
        depositAmountBN,
        COLLATERAL_ASSET,
        0
      );

      console.log('✅ Deposit transaction built');

      // Re-check balance right before sending to catch any changes
      try {
        const tokenAccount = await getAccount(connection, associatedTokenAccount);
        const currentBalance = Number(tokenAccount.amount);
        const currentBalanceInAsset = currentBalance / Math.pow(10, marketConfig.precisionExp.toNumber());
        const requiredAmount = depositAmountBN.toNumber();
        
        console.log(`\n🔍 Final balance check before sending transaction:`);
        console.log(`  Current ${COLLATERAL_ASSET} balance: ${currentBalanceInAsset} ${COLLATERAL_ASSET} (${currentBalance} raw units)`);
        console.log(`  Required amount: ${COLLATERAL_AMOUNT} ${COLLATERAL_ASSET} (${requiredAmount} raw units)`);
        
        if (currentBalance < requiredAmount) {
          const shortfall = (requiredAmount - currentBalance) / Math.pow(10, marketConfig.precisionExp.toNumber());
          throw new Error(
            `Insufficient ${COLLATERAL_ASSET} balance at transaction time. Required: ${COLLATERAL_AMOUNT} ${COLLATERAL_ASSET}, Available: ${currentBalanceInAsset} ${COLLATERAL_ASSET}, Shortfall: ${shortfall.toFixed(6)} ${COLLATERAL_ASSET}`
          );
        }
        console.log(`  ✅ Balance sufficient: ${currentBalanceInAsset} ${COLLATERAL_ASSET} >= ${COLLATERAL_AMOUNT} ${COLLATERAL_ASSET}`);
      } catch (error: any) {
        if (error.name === 'TokenAccountNotFoundError') {
          throw new Error(`${COLLATERAL_ASSET} token account not found. Please ensure you have ${COLLATERAL_ASSET} in your wallet.`);
        }
        throw error;
      }

      // Sign and send deposit transaction
      console.log('='.repeat(60));
      console.log('STEP 1: DEPOSIT COLLATERAL');
      console.log('='.repeat(60));
      console.log(`\nDepositing ${COLLATERAL_AMOUNT} ${COLLATERAL_ASSET}...`);
      console.log('Signing deposit transaction...');
      const signedDepositTx = signTransactionWithPrivateKey(depositTx, privateKey);
      
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
        if (error.message && (error.message.includes('insufficient funds') || error.message.includes('Insufficient'))) {
          console.error('\n❌ Transaction failed: Insufficient funds');
          console.error(`\nPlease check:`);
          console.error(`  1. Your ${COLLATERAL_ASSET} token account has at least ${COLLATERAL_AMOUNT} ${COLLATERAL_ASSET}`);
          console.error(`  2. Your SOL balance is sufficient for transaction fees (recommended: 0.001+ SOL)`);
          console.error(`  3. No other transactions are using your ${COLLATERAL_ASSET} balance`);
          
          // Try to get current balance for debugging
          try {
            const tokenAccount = await getAccount(connection, associatedTokenAccount);
            const balance = Number(tokenAccount.amount);
            const balanceInAsset = balance / Math.pow(10, marketConfig.precisionExp.toNumber());
            console.error(`\nCurrent ${COLLATERAL_ASSET} balance: ${balanceInAsset} ${COLLATERAL_ASSET}`);
            console.error(`Required: ${COLLATERAL_AMOUNT} ${COLLATERAL_ASSET}`);
          } catch (e) {
            // Ignore errors in error handling
          }
          
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
            console.log(`\n💰 Successfully deposited ${COLLATERAL_AMOUNT} ${COLLATERAL_ASSET}!`);
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
        
        // Wait a bit for account to update
        if (SHOULD_DEPOSIT) {
          console.log('\n⏳ Waiting for account state to update...');
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
    } else {
      console.log('\n⏭️  Skipping deposit (SHOULD_DEPOSIT = false)');
    }
    
    // Get perp market for the specified market index
    const perpMarket = driftClient.getPerpMarketAccount(MARKET_INDEX);
    if (!perpMarket) {
      throw new Error(`Perp market ${MARKET_INDEX} not found`);
    }

    const oraclePriceData = driftClient.getOraclePriceDataAndSlot(
      perpMarket.amm.oracle,
      perpMarket.amm.oracleSource
    );

    if (!oraclePriceData) {
      throw new Error('Oracle price data not available');
    }

    const positionDirection = POSITION === 'long' ? PositionDirection.LONG : PositionDirection.SHORT;
    const price = oraclePriceData.data.price;
    const priceInUSD = price.toNumber() / 1e6;

    // Get user account to use Drift's built-in functions
    const user = driftClient.getUser(0, userPublicKey);
    await user.fetchAccounts();
    
    // Get free collateral from account
    const freeCollateral = user.getFreeCollateral();
    const freeCollateralInUSD = freeCollateral.toNumber() / 1e6;
    
    console.log(`\n📊 Account State:`);
    console.log(`  Free Collateral: ${freeCollateralInUSD.toFixed(6)} USDC`);
    
    // Calculate desired collateral to use based on percentage
    // Match the exact calculation from a.ts
    const desiredCollateralToUseUSD = COLLATERAL_AMOUNT * COLLATERAL_PERCENTAGE; // e.g., 5 * 0.25 = 1.25 USDC
    
    // Use actual free collateral if it's less than desired
    const actualCollateralToUseUSD = Math.min(desiredCollateralToUseUSD, freeCollateralInUSD);
    
    // Convert to quote precision (USDC has 6 decimals, same as QUOTE_PRECISION)
    // Simple conversion: collateralUSD * 1e6 (matching a.ts exactly)
    const actualCollateralToUseInQuotePrecision = new BN(actualCollateralToUseUSD * 1e6);
    
    // Check if we have sufficient free collateral
    if (freeCollateralInUSD < 0.001) {
      console.log(`\n❌ Error: Insufficient free collateral in Drift account`);
      console.log(`   Free Collateral: ${freeCollateralInUSD.toFixed(6)} USDC`);
      console.log(`   Required: At least ${desiredCollateralToUseUSD.toFixed(6)} ${COLLATERAL_ASSET} (${(COLLATERAL_PERCENTAGE * 100).toFixed(0)}% of ${COLLATERAL_AMOUNT} ${COLLATERAL_ASSET})`);
      
      if (!SHOULD_DEPOSIT) {
        console.log(`\n💡 Solution:`);
        console.log(`   Set SHOULD_DEPOSIT = true in the configuration to deposit collateral first`);
        console.log(`   Or deposit collateral manually to your Drift account`);
        throw new Error('Insufficient free collateral. Please deposit funds first or set SHOULD_DEPOSIT = true');
      } else {
        console.log(`\n⚠️  Note: SHOULD_DEPOSIT is true, but deposit was skipped or failed`);
        throw new Error('Insufficient free collateral. Deposit may have failed or was skipped');
      }
    }
    
    // Check if free collateral is sufficient for the desired trade
    if (freeCollateralInUSD < desiredCollateralToUseUSD) {
      console.log(`\n⚠️  Warning: Free collateral (${freeCollateralInUSD.toFixed(6)} USDC) is less than desired collateral to use (${desiredCollateralToUseUSD.toFixed(6)} ${COLLATERAL_ASSET})`);
      console.log(`   Will use available free collateral (${actualCollateralToUseUSD.toFixed(6)} ${COLLATERAL_ASSET}) instead`);
    }
    
    console.log(`\n📈 Trade Calculation (using Drift SDK):`);
    console.log(`  Total Collateral (config): ${COLLATERAL_AMOUNT} ${COLLATERAL_ASSET}`);
    console.log(`  Collateral Percentage: ${(COLLATERAL_PERCENTAGE * 100).toFixed(0)}%`);
    console.log(`  Desired Collateral to Use: ${desiredCollateralToUseUSD.toFixed(6)} ${COLLATERAL_ASSET}`);
    console.log(`  Available Free Collateral: ${freeCollateralInUSD.toFixed(6)} USDC`);
    console.log(`  Actual Collateral to Use: ${actualCollateralToUseUSD.toFixed(6)} ${COLLATERAL_ASSET}`);
    console.log(`  Leverage: ${LEVERAGE}x`);
    console.log(`  Market Price: $${priceInUSD.toFixed(2)} USD`);
    
    // Get collateral spot market index (0 for USDC, 1 for SOL)
    const collateralSpotMarketIndex = spotMarketIndex;
    
    // Use calculatePositionSizeForLeverage to find the correct position size
    // This function uses Drift's calculateCollateralDepositRequiredForTrade to ensure accurate leverage
    const positionSizeResult = await calculatePositionSizeForLeverage(
      driftClient,
      user,
      MARKET_INDEX,
      actualCollateralToUseInQuotePrecision,
      LEVERAGE,
      positionDirection,
      collateralSpotMarketIndex,
      price
    );
    
    const targetBaseAmount = positionSizeResult.baseAmount;
    const finalPositionNotional = positionSizeResult.positionNotional;
    const actualLeverage = positionSizeResult.actualLeverage;
    const finalPositionNotionalInUSD = finalPositionNotional.toNumber() / 1e6;
    const actualCollateralUsedInUSD = actualCollateralToUseUSD; // Use the USD value directly
    
    console.log(`\n✅ Final Trade Parameters (using Drift SDK):`);
    console.log(`  Base Asset Amount: ${targetBaseAmount.toString()}`);
    console.log(`  Position Notional: ${finalPositionNotionalInUSD.toFixed(6)} USDC`);
    console.log(`  Collateral Used: ${actualCollateralUsedInUSD.toFixed(6)} ${COLLATERAL_ASSET}`);
    console.log(`  Actual Leverage: ${actualLeverage.toFixed(2)}x`);
    
    // Use the notional value for the order
    const finalPositionSize = finalPositionNotional;
    const finalPositionSizeInUSD = finalPositionNotionalInUSD;
    
    // Log additional info for debugging
    const orderStepSize = perpMarket.amm.orderStepSize;
    const minOrderSizeInUSD = orderStepSize.mul(price).div(BASE_PRECISION).toNumber() / 1e6;
    console.log(`  Minimum Order Step Size: ${orderStepSize.toString()} (base asset)`);
    console.log(`  Minimum Order Size: ${minOrderSizeInUSD.toFixed(6)} USDC`);

    // Calculate liquidation price using SDK (if user instance available)
    let liquidationPriceUSD = 0;
    if (user) {
      const positionBaseSizeChange = positionDirection === PositionDirection.LONG 
        ? targetBaseAmount 
        : targetBaseAmount.neg();
      
      const liquidationPriceBN = user.liquidationPrice(
        MARKET_INDEX,
        positionBaseSizeChange,  // Simulate opening this position
        price,                   // Estimated entry price
        'Maintenance',           // Use maintenance margin for liquidation
        false,                   // includeOpenOrders
        ZERO,                    // offsetCollateral
        undefined                // enteringHighLeverage
      );
      
      if (liquidationPriceBN.gte(ZERO)) {
        liquidationPriceUSD = liquidationPriceBN.toNumber() / 1e6;
        console.log(`\n  📊 Liquidation Price (from SDK): $${liquidationPriceUSD.toFixed(2)}`);
      }
    }

    // Open position using Drift SDK's openPosition method
    console.log('\n' + '='.repeat(60));
    console.log('STEP 2: OPEN PERP POSITION');
    console.log('='.repeat(60));
    console.log(`\nOpening ${POSITION.toUpperCase()} position on market index ${MARKET_INDEX}...`);
    console.log(`Base Asset Amount: ${targetBaseAmount.toString()} (${(targetBaseAmount.toNumber() / BASE_PRECISION.toNumber()).toFixed(4)} SOL)`);
    console.log(`Position Notional: $${finalPositionNotionalInUSD.toFixed(2)}`);
    console.log(`Expected Collateral Used: $${actualCollateralUsedInUSD.toFixed(6)} ${COLLATERAL_ASSET}`);
    console.log(`Expected Leverage: ${actualLeverage.toFixed(2)}x`);
    if (liquidationPriceUSD > 0) {
      console.log(`Liquidation Price: $${liquidationPriceUSD.toFixed(2)}`);
    }
    
    console.log('\nCalling driftClient.openPosition()...');
    const txSignature = await driftClient.openPosition(
      positionDirection,        // PositionDirection.LONG or PositionDirection.SHORT
      targetBaseAmount,         // Amount in base asset precision (BASE_PRECISION, 1e9 for SOL)
      MARKET_INDEX,             // Market index (0 for SOL-PERP)
      undefined                 // limitPrice = undefined for MARKET ORDER
    );
    
    console.log(`✅ Position opened! Transaction signature: ${txSignature}`);
    console.log(`   View on Solana Explorer: https://solscan.io/tx/${txSignature}`);
    
    // Wait for confirmation
    console.log('Waiting for confirmation...');
    try {
      const confirmation = await Promise.race([
        connection.confirmTransaction(txSignature, 'confirmed'),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 60000)
        )
      ]) as any;
      
      if (confirmation.value?.err) {
        console.error('❌ Transaction failed:', confirmation.value.err);
        throw new Error(`Transaction failed: ${JSON.stringify(confirmation.value.err)}`);
      } else {
        console.log(`✅ Transaction confirmed!`);
        console.log(`\n🎉 Successfully opened ${POSITION.toUpperCase()} position!`);
        console.log(`   Market Index: ${MARKET_INDEX}`);
        console.log(`   Position Notional: $${finalPositionNotionalInUSD.toFixed(2)}`);
        console.log(`   Expected Collateral Used: $${actualCollateralUsedInUSD.toFixed(6)} ${COLLATERAL_ASSET}`);
        console.log(`   Expected Leverage: ${actualLeverage.toFixed(2)}x`);
        if (liquidationPriceUSD > 0) {
          console.log(`   Liquidation Price: $${liquidationPriceUSD.toFixed(2)}`);
        }
      }
    } catch (error: any) {
      if (error.message === 'Timeout' || error.message?.includes('not confirmed')) {
        console.log(`\n⏳ Confirmation timeout - checking status...`);
        const status = await connection.getSignatureStatus(txSignature);
        if (status.value?.err) {
          console.error('❌ Transaction failed:', status.value.err);
          throw new Error(`Transaction failed: ${JSON.stringify(status.value.err)}`);
        } else {
          console.log(`✅ Transaction may have succeeded! Check: https://solscan.io/tx/${txSignature}`);
        }
      } else {
        throw error;
      }
    }
    console.log('\n' + '='.repeat(60));
    console.log('COMPLETE');
    console.log('='.repeat(60));
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