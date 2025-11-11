import * as dotenv from 'dotenv';

import {
  BN,
  DriftClient,
  MainnetSpotMarkets,
  MarketType,
  PositionDirection,
  QUOTE_PRECISION,
} from '@drift-labs/sdk';
import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  VersionedTransaction,
} from '@solana/web3.js';
import {
  TOKEN_PROGRAM_ID,
  getAccount,
  getAssociatedTokenAddress,
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

// Configuration - Edit these values
const ORIGINAL_DEPOSIT_AMOUNT = 5; // Original amount deposited (in USDC or SOL)
const COLLATERAL_ASSET: 'USDC' | 'SOL' = 'USDC'; // Asset to withdraw
const MARKET_INDEX = 0; // Perp market index to close position on
const SUB_ACCOUNT_ID = 0; // Sub account ID

// ============================================================================

// Get public key from private key
function getPublicKeyFromPrivateKey(privateKey: string | number[] | Uint8Array): PublicKey {
  let keypair: Keypair;
  
  if (privateKey instanceof Uint8Array) {
    if (privateKey.length !== 64) {
      throw new Error(`Invalid secret key length: ${privateKey.length}, expected 64`);
    }
    keypair = Keypair.fromSecretKey(privateKey);
  } else if (Array.isArray(privateKey)) {
    const secretKey = Uint8Array.from(privateKey);
    if (secretKey.length !== 64) {
      throw new Error(`Invalid secret key length: ${secretKey.length}, expected 64`);
    }
    keypair = Keypair.fromSecretKey(secretKey);
  } else if (typeof privateKey === 'string') {
    try {
      const parsed = JSON.parse(privateKey);
      if (Array.isArray(parsed)) {
        keypair = Keypair.fromSecretKey(Uint8Array.from(parsed));
      } else {
        throw new Error('JSON parsed but not an array');
      }
    } catch (jsonError) {
      try {
        const decoded = bs58.decode(privateKey);
        if (decoded.length === 64) {
          keypair = Keypair.fromSecretKey(decoded);
        } else {
          throw new Error(`Invalid secret key length: ${decoded.length}, expected 64`);
        }
      } catch (base58Error) {
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

// Get keypair from private key
function getKeypairFromPrivateKey(privateKey: string | number[] | Uint8Array): Keypair {
  if (privateKey instanceof Uint8Array) {
    return Keypair.fromSecretKey(privateKey);
  } else if (Array.isArray(privateKey)) {
    return Keypair.fromSecretKey(Uint8Array.from(privateKey));
  } else if (typeof privateKey === 'string') {
    try {
      const parsed = JSON.parse(privateKey);
      if (Array.isArray(parsed)) {
        return Keypair.fromSecretKey(Uint8Array.from(parsed));
      } else {
        throw new Error('JSON parsed but not an array');
      }
    } catch (jsonError) {
      try {
        const decoded = bs58.decode(privateKey);
        if (decoded.length === 64) {
          return Keypair.fromSecretKey(decoded);
        } else {
          throw new Error(`Invalid secret key length: ${decoded.length}, expected 64`);
        }
      } catch (base58Error) {
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
  } else {
    throw new Error('Invalid private key type');
  }
}

// Get spot market index for USDC or SOL
function getSpotMarketIndex(asset: 'USDC' | 'SOL', env: 'mainnet-beta' | 'devnet' = 'mainnet-beta'): number {
  const markets = env === 'mainnet-beta' ? MainnetSpotMarkets : [];
  const market = markets.find((m) => m.symbol === asset);
  if (!market) {
    throw new Error(`${asset} market not found`);
  }
  return market.marketIndex;
}

// Initialize DriftClient
async function initializeDriftClient(
  connection: Connection,
  userPublicKey: PublicKey,
  env: 'mainnet-beta' | 'devnet' = 'mainnet-beta'
): Promise<DriftClient> {
  const wallet = {
    publicKey: userPublicKey,
    signTransaction: async (tx: any) => { throw new Error('Should not call signTransaction on this wallet'); },
    signAllTransactions: async (txs: any[]) => { throw new Error('Should not call signAllTransactions on this wallet'); },
  };

  const driftClient = new DriftClient({
    connection,
    wallet: wallet,
    env,
    perpMarketIndexes: [MARKET_INDEX],
    spotMarketIndexes: [0, 1],
    accountSubscription: {
      type: 'websocket',
      commitment: 'confirmed',
    },
    authority: userPublicKey,
  });

  await driftClient.subscribe();
  return driftClient;
}

// Helper function to sign transaction with private key
function signTransactionWithPrivateKey(
  transaction: Transaction | VersionedTransaction,
  privateKey: string | number[] | Uint8Array
): Transaction | VersionedTransaction {
  const keypair = getKeypairFromPrivateKey(privateKey);
  
  if (transaction instanceof VersionedTransaction) {
    transaction.sign([keypair]);
    return transaction;
  } else {
    transaction.sign(keypair);
    return transaction;
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
    console.log('DRIFT PERPS - CLOSE POSITION & WITHDRAW');
    console.log('='.repeat(60));
    console.log('\nConfiguration:');
    console.log(`  Original Deposit Amount: ${ORIGINAL_DEPOSIT_AMOUNT} ${COLLATERAL_ASSET}`);
    console.log(`  Collateral Asset: ${COLLATERAL_ASSET}`);
    console.log(`  Market Index: ${MARKET_INDEX}`);
    console.log(`  RPC URL: ${RPC_URL}`);
    console.log('\n' + '='.repeat(60) + '\n');

    // Get public key from private key
    const userPublicKey = getPublicKeyFromPrivateKey(privateKey);
    console.log(`User Public Key: ${userPublicKey.toString()}\n`);

    // Initialize connection
    const connection = new Connection(RPC_URL, 'confirmed');

    // Initialize DriftClient
    const driftClient = await initializeDriftClient(connection, userPublicKey, 'mainnet-beta');

    // Get user account
    const user = driftClient.getUser(SUB_ACCOUNT_ID, userPublicKey);
    await user.fetchAccounts();

    // Check current position
    const perpPosition = user.getPerpPosition(MARKET_INDEX);
    
    console.log('\n📊 Current Position Status:');
    if (perpPosition && !perpPosition.baseAssetAmount.isZero()) {
      const baseAmount = perpPosition.baseAssetAmount;
      const direction = baseAmount.gt(new BN(0)) ? 'LONG' : 'SHORT';
      const baseAmountAbs = baseAmount.abs();
      
      // Get current price
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
      
      const price = oraclePriceData.data.price;
      const priceInUSD = price.toNumber() / 1e6;
      const notionalValue = baseAmountAbs.mul(price).div(QUOTE_PRECISION);
      const notionalValueInUSD = notionalValue.toNumber() / 1e6;
      
      console.log(`  Position: ${direction}`);
      console.log(`  Base Amount: ${baseAmountAbs.toString()}`);
      console.log(`  Current Price: $${priceInUSD.toFixed(2)} USD`);
      console.log(`  Notional Value: ${notionalValueInUSD.toFixed(6)} USDC`);
      
      // Close position
      console.log('\n' + '='.repeat(60));
      console.log('STEP 1: CLOSE POSITION');
      console.log('='.repeat(60));
      console.log(`\nClosing ${direction} position on market index ${MARKET_INDEX}...`);
      
      // Build close position order (reduce only, opposite direction)
      const closeDirection = direction === 'LONG' ? PositionDirection.SHORT : PositionDirection.LONG;
      
      const closeOrderParams = {
        marketIndex: MARKET_INDEX,
        marketType: MarketType.PERP,
        direction: closeDirection,
        baseAssetAmount: baseAmountAbs, // Close entire position
        price: new BN(0), // Market order
        orderType: {
          market: {},
        },
        reduceOnly: true, // Important: reduce only
      };
      
      const closeIx = await driftClient.getPlacePerpOrderIx(closeOrderParams, SUB_ACCOUNT_ID);
      const closeTx = await driftClient.buildTransaction(closeIx);
      
      console.log('✅ Close position transaction built');
      console.log('Signing close position transaction...');
      const signedCloseTx = signTransactionWithPrivateKey(closeTx, privateKey);
      
      console.log('Sending close position transaction to network...');
      const closeTxSig = await connection.sendRawTransaction(
        signedCloseTx instanceof VersionedTransaction
          ? signedCloseTx.serialize()
          : signedCloseTx.serialize(),
        {
          skipPreflight: false,
          maxRetries: 3,
        }
      );
      
      console.log(`✅ Close position transaction sent! Signature: ${closeTxSig}`);
      console.log(`   View on Solana Explorer: https://solscan.io/tx/${closeTxSig}`);
      
      // Wait for confirmation
      console.log('Waiting for confirmation (this may take up to 60 seconds)...');
      try {
        const confirmation = await Promise.race([
          connection.confirmTransaction(closeTxSig, 'confirmed'),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), 60000)
          )
        ]) as any;
        
        if (confirmation.value?.err) {
          console.error('❌ Close position transaction failed:', confirmation.value.err);
          throw new Error(`Transaction failed: ${JSON.stringify(confirmation.value.err)}`);
        } else {
          console.log(`✅ Position closed successfully!`);
        }
      } catch (error: any) {
        if (error.message === 'Timeout' || error.message?.includes('not confirmed')) {
          console.log(`\n⏳ Confirmation timeout - checking transaction status...`);
          const status = await connection.getSignatureStatus(closeTxSig);
          if (status.value?.err) {
            console.error('❌ Close position transaction failed:', status.value.err);
            throw new Error(`Transaction failed: ${JSON.stringify(status.value.err)}`);
          } else {
            console.log(`✅ Position may have been closed! Please verify on Solana Explorer.`);
            console.log(`   View: https://solscan.io/tx/${closeTxSig}`);
          }
        } else {
          throw error;
        }
      }
      
      // Wait a bit for account to update and verify position is closed
      console.log('\n⏳ Waiting for account state to update...');
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Refresh user account and verify position is closed
      await user.fetchAccounts();
      const verifyPosition = user.getPerpPosition(MARKET_INDEX);
      if (verifyPosition && !verifyPosition.baseAssetAmount.isZero()) {
        console.log('⚠️  Warning: Position may not be fully closed yet. Base amount:', verifyPosition.baseAssetAmount.toString());
        console.log('   Waiting additional time for position to settle...');
        await new Promise(resolve => setTimeout(resolve, 3000));
        await user.fetchAccounts();
      } else {
        console.log('✅ Position confirmed closed');
      }
    } else {
      console.log('  No open position found');
    }
    
    // Get account balance
    console.log('\n' + '='.repeat(60));
    console.log('STEP 2: WITHDRAW COLLATERAL');
    console.log('='.repeat(60));
    
    // Get spot market
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
    
    // Refresh account to get latest balance after closing position
    await user.fetchAccounts();
    
    // Get free collateral - this is what's actually available to withdraw
    // Free collateral is the amount that can be withdrawn without violating margin requirements
    const freeCollateral = user.getFreeCollateral();
    const freeCollateralInUSD = freeCollateral.toNumber() / 1e6;
    
    // Get spot position for reference (total balance, not necessarily withdrawable)
    const spotPosition = user.getSpotPosition(spotMarketIndex);
    let spotBalanceInAsset = 0;
    if (spotPosition && !spotPosition.scaledBalance.isZero()) {
      const spotBalance = spotPosition.scaledBalance;
      spotBalanceInAsset = spotBalance.toNumber() / marketConfig.precision.toNumber();
    }
    
    console.log(`\n📊 Account Balance After Closing Position:`);
    console.log(`  Spot Balance (total): ${spotBalanceInAsset.toFixed(6)} ${COLLATERAL_ASSET}`);
    console.log(`  Free Collateral (withdrawable): ${freeCollateralInUSD.toFixed(6)} USDC`);
    console.log(`  Original Deposit Amount: ${ORIGINAL_DEPOSIT_AMOUNT} ${COLLATERAL_ASSET}`);
    
    // Calculate target withdrawal: min of original deposit and final account balance
    const targetWithdrawalAmount = Math.min(ORIGINAL_DEPOSIT_AMOUNT, spotBalanceInAsset);
    
    console.log(`\n💰 Withdrawal Target:`);
    console.log(`  Original Collateral: ${ORIGINAL_DEPOSIT_AMOUNT.toFixed(6)} ${COLLATERAL_ASSET}`);
    console.log(`  Final Account Balance: ${spotBalanceInAsset.toFixed(6)} ${COLLATERAL_ASSET}`);
    console.log(`  Target Withdrawal (min of both): ${targetWithdrawalAmount.toFixed(6)} ${COLLATERAL_ASSET}`);
    
    if (targetWithdrawalAmount <= 0) {
      console.log('\n⚠️  No funds available to withdraw');
      return;
    }
    
    // Get associated token account
    const associatedTokenAccount = await getAssociatedTokenAddress(
      spotMarket.mint,
      userPublicKey,
      false,
      TOKEN_PROGRAM_ID
    );
    
    console.log(`  Associated Token Account: ${associatedTokenAccount.toString()}\n`);
    
    // Withdraw in batches until we reach the target or run out of free collateral
    let totalWithdrawn = 0;
    let withdrawalAttempt = 0;
    const maxAttempts = 10; // Safety limit
    
    while (totalWithdrawn < targetWithdrawalAmount && withdrawalAttempt < maxAttempts) {
      withdrawalAttempt++;
      
      // Refresh account to get latest free collateral
      await user.fetchAccounts();
      const currentFreeCollateral = user.getFreeCollateral();
      const currentFreeCollateralInUSD = currentFreeCollateral.toNumber() / 1e6;
      
      if (currentFreeCollateralInUSD <= 0.001) { // Minimum threshold (1 cent)
        console.log(`\n✅ No more free collateral available. Total withdrawn: ${totalWithdrawn.toFixed(6)} ${COLLATERAL_ASSET}`);
        break;
      }
      
      // Calculate remaining amount to withdraw
      const remainingToWithdraw = targetWithdrawalAmount - totalWithdrawn;
      
      // Withdraw the minimum of: remaining amount, or available free collateral
      const thisWithdrawalAmount = Math.min(remainingToWithdraw, currentFreeCollateralInUSD);
      
      console.log(`\n📤 Withdrawal Attempt ${withdrawalAttempt}:`);
      console.log(`  Remaining to withdraw: ${remainingToWithdraw.toFixed(6)} ${COLLATERAL_ASSET}`);
      console.log(`  Available free collateral: ${currentFreeCollateralInUSD.toFixed(6)} USDC`);
      console.log(`  This withdrawal: ${thisWithdrawalAmount.toFixed(6)} ${COLLATERAL_ASSET}`);
      
      // Convert to token precision
      const withdrawalAmountBN = new BN(thisWithdrawalAmount).mul(marketConfig.precision);
      const freeCollateralInTokenPrecision = currentFreeCollateral.mul(marketConfig.precision).div(QUOTE_PRECISION);
      
      // Ensure we don't exceed free collateral (use 95% to leave small buffer)
      const maxWithdrawalBN = freeCollateralInTokenPrecision.mul(new BN(95)).div(new BN(100));
      let actualWithdrawalBN = withdrawalAmountBN.lt(maxWithdrawalBN) ? withdrawalAmountBN : maxWithdrawalBN;
      
      if (actualWithdrawalBN.isZero()) {
        console.log(`  ⚠️  Withdrawal amount too small, skipping...`);
        break;
      }
      
      const actualWithdrawalAmount = actualWithdrawalBN.toNumber() / marketConfig.precision.toNumber();
      console.log(`  Actual withdrawal: ${actualWithdrawalAmount.toFixed(6)} ${COLLATERAL_ASSET}`);
      
      // Build withdrawal transaction
      const withdrawIx = await driftClient.getWithdrawIx(
        actualWithdrawalBN,
        spotMarketIndex,
        associatedTokenAccount,
        false, // allowBorrow
        SUB_ACCOUNT_ID
      );
      
      const withdrawTx = await driftClient.buildTransaction(withdrawIx);
      const signedWithdrawTx = signTransactionWithPrivateKey(withdrawTx, privateKey);
      
      console.log('  Sending withdrawal transaction...');
      let withdrawTxSig: string;
      
      try {
        withdrawTxSig = await connection.sendRawTransaction(
          signedWithdrawTx instanceof VersionedTransaction
            ? signedWithdrawTx.serialize()
            : signedWithdrawTx.serialize(),
          {
            skipPreflight: false,
            maxRetries: 3,
          }
        );
      } catch (error: any) {
        if (error.message && (error.message.includes('Insufficient collateral') || error.message.includes('0x1773'))) {
          console.log(`  ⚠️  Withdrawal failed due to margin requirements, trying 80% of free collateral...`);
          actualWithdrawalBN = freeCollateralInTokenPrecision.mul(new BN(80)).div(new BN(100));
          
          if (actualWithdrawalBN.isZero()) {
            console.log(`  ❌ Cannot withdraw even 80% of free collateral`);
            break;
          }
          
          const adjustedWithdrawIx = await driftClient.getWithdrawIx(
            actualWithdrawalBN,
            spotMarketIndex,
            associatedTokenAccount,
            false,
            SUB_ACCOUNT_ID
          );
          
          const adjustedWithdrawTx = await driftClient.buildTransaction(adjustedWithdrawIx);
          const signedAdjustedWithdrawTx = signTransactionWithPrivateKey(adjustedWithdrawTx, privateKey);
          
          withdrawTxSig = await connection.sendRawTransaction(
            signedAdjustedWithdrawTx instanceof VersionedTransaction
              ? signedAdjustedWithdrawTx.serialize()
              : signedAdjustedWithdrawTx.serialize(),
            {
              skipPreflight: false,
              maxRetries: 3,
            }
          );
        } else {
          throw error;
        }
      }
      
      console.log(`  ✅ Transaction sent: ${withdrawTxSig}`);
      console.log(`     View: https://solscan.io/tx/${withdrawTxSig}`);
      
      // Wait for confirmation and verify success
      let transactionSucceeded = false;
      try {
        await Promise.race([
          connection.confirmTransaction(withdrawTxSig, 'confirmed'),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), 60000)
          )
        ]);
        console.log(`  ✅ Transaction confirmed`);
        transactionSucceeded = true;
      } catch (error: any) {
        // Handle timeout or confirmation errors
        if (error.message === 'Timeout' || 
            error.message?.includes('not confirmed') || 
            error.message?.includes('TransactionExpiredTimeoutError') ||
            error.name === 'TransactionExpiredTimeoutError') {
          console.log(`  ⏳ Confirmation timeout - checking transaction status...`);
          const status = await connection.getSignatureStatus(withdrawTxSig);
          if (status.value?.err) {
            console.log(`  ❌ Transaction failed: ${JSON.stringify(status.value.err)}`);
            break;
          } else if (status.value?.confirmationStatus) {
            console.log(`  ✅ Transaction appears to be ${status.value.confirmationStatus}`);
            transactionSucceeded = true;
          } else {
            console.log(`  ⏳ Transaction status unknown, checking again...`);
            // Wait a bit and check again
            await new Promise(resolve => setTimeout(resolve, 2000));
            const retryStatus = await connection.getSignatureStatus(withdrawTxSig);
            if (retryStatus.value?.err) {
              console.log(`  ❌ Transaction failed: ${JSON.stringify(retryStatus.value.err)}`);
              break;
            } else if (retryStatus.value?.confirmationStatus) {
              console.log(`  ✅ Transaction confirmed on retry`);
              transactionSucceeded = true;
            } else {
              console.log(`  ⚠️  Transaction status still unknown, but continuing...`);
              console.log(`     Please verify manually: https://solscan.io/tx/${withdrawTxSig}`);
              // Assume it succeeded to continue the loop
              transactionSucceeded = true;
            }
          }
        } else {
          // For other errors, check status before breaking
          console.log(`  ⚠️  Error during confirmation: ${error.message}`);
          const status = await connection.getSignatureStatus(withdrawTxSig);
          if (status.value?.err) {
            console.log(`  ❌ Transaction failed: ${JSON.stringify(status.value.err)}`);
            break;
          } else {
            console.log(`  ⏳ Transaction may have succeeded, continuing...`);
            transactionSucceeded = true;
          }
        }
      }
      
      // Only update total withdrawn if transaction succeeded
      if (transactionSucceeded) {
        totalWithdrawn += actualWithdrawalAmount;
        console.log(`  💰 Total withdrawn so far: ${totalWithdrawn.toFixed(6)} ${COLLATERAL_ASSET}`);
      } else {
        console.log(`  ⚠️  Skipping withdrawal amount update due to transaction failure`);
      }
      
      // Wait a bit before next withdrawal
      if (totalWithdrawn < targetWithdrawalAmount) {
        console.log(`  ⏳ Waiting for account to update before next withdrawal...`);
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }
    
    console.log(`\n💰 Withdrawal Summary:`);
    console.log(`  Target: ${targetWithdrawalAmount.toFixed(6)} ${COLLATERAL_ASSET}`);
    console.log(`  Total Withdrawn: ${totalWithdrawn.toFixed(6)} ${COLLATERAL_ASSET}`);
    
    // Refresh and show final balance
    await user.fetchAccounts();
    const finalSpotPosition = user.getSpotPosition(spotMarketIndex);
    const finalSpotBalance = finalSpotPosition && !finalSpotPosition.scaledBalance.isZero()
      ? finalSpotPosition.scaledBalance.toNumber() / marketConfig.precision.toNumber()
      : 0;
    const finalFreeCollateral = user.getFreeCollateral().toNumber() / 1e6;
    
    console.log(`  Remaining Balance: ${finalSpotBalance.toFixed(6)} ${COLLATERAL_ASSET}`);
    console.log(`  Remaining Free Collateral: ${finalFreeCollateral.toFixed(6)} USDC`);
    
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

