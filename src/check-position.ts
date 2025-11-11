import * as dotenv from 'dotenv';

import {
  BASE_PRECISION,
  BN,
  DriftClient,
  PositionDirection,
  QUOTE_PRECISION,
  ZERO,
} from '@drift-labs/sdk';
import {
  Connection,
  Keypair,
  PublicKey,
  VersionedTransaction,
} from '@solana/web3.js';

import bs58 from 'bs58';

// Load environment variables
dotenv.config();

const RPC_URL = process.env.RPC_URL || 'https://api.mainnet-beta.solana.com';
const PRIVATE_KEY = process.env.PRIVATE_KEY || '';

// Helper to get keypair from private key
function getKeypairFromPrivateKey(privateKey: string | number[] | Uint8Array): Keypair {
  // Handle Uint8Array
  if (privateKey instanceof Uint8Array) {
    if (privateKey.length !== 64) {
      throw new Error(`Invalid secret key length: ${privateKey.length}, expected 64`);
    }
    return Keypair.fromSecretKey(privateKey);
  }
  
  // Handle array
  if (Array.isArray(privateKey)) {
    const secretKey = Uint8Array.from(privateKey);
    if (secretKey.length !== 64) {
      throw new Error(`Invalid secret key length: ${secretKey.length}, expected 64`);
    }
    return Keypair.fromSecretKey(secretKey);
  }
  
  // Handle string
  if (typeof privateKey === 'string') {
    // Trim whitespace
    const trimmed = privateKey.trim();
    
    // Remove quotes if present
    const unquoted = trimmed.replace(/^["']|["']$/g, '');
    
    try {
      // Try parsing as JSON array first
      const parsed = JSON.parse(unquoted);
      if (Array.isArray(parsed)) {
        const secretKey = Uint8Array.from(parsed);
        if (secretKey.length !== 64) {
          throw new Error(`Invalid secret key length: ${secretKey.length}, expected 64`);
        }
        return Keypair.fromSecretKey(secretKey);
      } else {
        throw new Error('JSON parsed but not an array');
      }
    } catch (jsonError) {
      // If JSON parse fails, try as base58 (Solana format)
      try {
        const decoded = bs58.decode(unquoted);
        if (decoded.length === 64) {
          return Keypair.fromSecretKey(decoded);
        } else {
          throw new Error(`Invalid secret key length: ${decoded.length}, expected 64`);
        }
      } catch (base58Error) {
        // If base58 fails, try as base64
        try {
          const decoded = Uint8Array.from(Buffer.from(unquoted, 'base64'));
          if (decoded.length === 64) {
            return Keypair.fromSecretKey(decoded);
          } else {
            throw new Error(`Invalid secret key length: ${decoded.length}, expected 64`);
          }
        } catch (base64Error) {
          throw new Error(`Invalid private key format. Expected JSON array, base58, or base64 string. Error: ${base64Error instanceof Error ? base64Error.message : 'Unknown error'}`);
        }
      }
    }
  }
  
  throw new Error('Invalid private key type');
}

// Initialize DriftClient with keypair
async function initializeDriftClient(
  connection: Connection,
  userPublicKey: PublicKey,
  keypair: Keypair,
  env: 'mainnet-beta' | 'devnet' = 'mainnet-beta'
): Promise<DriftClient> {
  const wallet = {
    publicKey: keypair.publicKey,
    signTransaction: async (tx: any) => {
      if (tx instanceof VersionedTransaction) {
        tx.sign([keypair]);
      } else {
        tx.sign(keypair);
      }
      return tx;
    },
    signAllTransactions: async (txs: any[]) => {
      return txs.map(tx => {
        if (tx instanceof VersionedTransaction) {
          tx.sign([keypair]);
        } else {
          tx.sign(keypair);
        }
        return tx;
      });
    },
  };

  const driftClient = new DriftClient({
    connection,
    wallet: wallet,
    env,
    perpMarketIndexes: [0], // Subscribe to SOL-PERP
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

// Main function to check position details
async function checkPositionDetails() {
  try {
    if (!PRIVATE_KEY || PRIVATE_KEY.trim() === '') {
      console.error('❌ Error: PRIVATE_KEY is required in .env file');
      process.exit(1);
    }

    console.log('='.repeat(60));
    console.log('DRIFT POSITION CHECKER');
    console.log('='.repeat(60));
    console.log(`\nRPC URL: ${RPC_URL}\n`);

    // Get keypair and public key (trim the private key to handle any whitespace)
    const trimmedPrivateKey = PRIVATE_KEY.trim();
    const keypair = getKeypairFromPrivateKey(trimmedPrivateKey);
    const userPublicKey = keypair.publicKey;
    console.log(`User Public Key: ${userPublicKey.toString()}\n`);

    // Initialize connection
    const connection = new Connection(RPC_URL, 'confirmed');

    // Initialize DriftClient
    console.log('Connecting to Drift Protocol...');
    const driftClient = await initializeDriftClient(connection, userPublicKey, keypair, 'mainnet-beta');
    console.log('✅ Connected to Drift Protocol\n');

    // Get user account
    const user = driftClient.getUser(0, userPublicKey);
    await user.fetchAccounts();

    // Get account state
    const freeCollateral = user.getFreeCollateral();
    const freeCollateralUSD = freeCollateral.toNumber() / 1e6;
    const totalCollateral = user.getTotalCollateral();
    const totalCollateralUSD = totalCollateral.toNumber() / 1e6;

    console.log('='.repeat(60));
    console.log('ACCOUNT STATE');
    console.log('='.repeat(60));
    console.log(`Free Collateral: $${freeCollateralUSD.toFixed(6)} USDC`);
    console.log(`Total Collateral: $${totalCollateralUSD.toFixed(6)} USDC`);

    // Get all perp positions
    const perpPositions = user.getActivePerpPositions();
    
    if (perpPositions.length === 0) {
      console.log('\n❌ No active perp positions found');
      return;
    }

    console.log(`\n📊 Found ${perpPositions.length} active perp position(s)\n`);

    // Get perp market for price data
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

    const markPrice = oraclePriceData.data.price;
    const markPriceUSD = markPrice.toNumber() / 1e6;

    // Display each position
    for (let i = 0; i < perpPositions.length; i++) {
      const position = perpPositions[i];
      const marketIndex = position.marketIndex;
      const baseAssetAmount = position.baseAssetAmount;
      const baseAssetAmountAbs = baseAssetAmount.abs();
      const direction = baseAssetAmount.gte(ZERO) ? PositionDirection.LONG : PositionDirection.SHORT;

      // Skip if position is zero
      if (baseAssetAmountAbs.isZero()) {
        continue;
      }

      console.log('='.repeat(60));
      console.log(`POSITION #${i + 1} - Market Index ${marketIndex}`);
      console.log('='.repeat(60));

      // Position size
      const solQuantity = baseAssetAmountAbs.toNumber() / BASE_PRECISION.toNumber();
      console.log(`\n📏 Position Size:`);
      console.log(`  Direction: ${direction === PositionDirection.LONG ? 'LONG' : 'SHORT'}`);
      console.log(`  Base Asset Amount: ${baseAssetAmountAbs.toString()}`);
      console.log(`  SOL Quantity: ${solQuantity.toFixed(4)} SOL`);

      // Position notional (current value)
      const positionNotional = baseAssetAmountAbs.mul(markPrice).div(BASE_PRECISION);
      const positionNotionalUSD = positionNotional.toNumber() / 1e6;
      console.log(`  Position Notional: $${positionNotionalUSD.toFixed(6)} USDC`);

      // Entry price (calculated from position)
      // Entry price = quoteEntryAmount / baseAssetAmount (in proper precisions)
      const quoteEntryAmount = position.quoteEntryAmount;
      const entryPriceBN = baseAssetAmountAbs.gt(ZERO) 
        ? quoteEntryAmount.abs().mul(BASE_PRECISION).div(baseAssetAmountAbs)
        : markPrice; // Fallback to mark price if base amount is zero
      const entryPriceUSD = entryPriceBN.toNumber() / 1e6;
      console.log(`\n💰 Entry Price: $${entryPriceUSD.toFixed(6)} USD`);

      // Mark price (current market price)
      console.log(`📈 Mark Price: $${markPriceUSD.toFixed(6)} USD`);

      // Unrealized PnL
      const unrealizedPnl = user.getUnrealizedPNL(true, marketIndex);
      const unrealizedPnlUSD = unrealizedPnl.toNumber() / 1e6;
      const unrealizedPnlPercent = entryPriceUSD > 0 
        ? ((markPriceUSD - entryPriceUSD) / entryPriceUSD) * 100 * (direction === PositionDirection.LONG ? 1 : -1)
        : 0;
      
      console.log(`\n💵 Unrealized P&L:`);
      console.log(`  Amount: ${unrealizedPnlUSD >= 0 ? '+' : ''}$${unrealizedPnlUSD.toFixed(6)} USDC`);
      console.log(`  Percentage: ${unrealizedPnlPercent >= 0 ? '+' : ''}${unrealizedPnlPercent.toFixed(2)}%`);

      // Margin and leverage
      const perpMarketAccount = driftClient.getPerpMarketAccount(marketIndex);
      if (perpMarketAccount) {
        // Get margin ratios
        const initialMarginRatioValue = (perpMarketAccount.marginRatioInitial as any).toNumber
          ? (perpMarketAccount.marginRatioInitial as BN).toNumber()
          : (perpMarketAccount.marginRatioInitial as number);
        const maintenanceMarginRatioValue = (perpMarketAccount.marginRatioMaintenance as any).toNumber
          ? (perpMarketAccount.marginRatioMaintenance as BN).toNumber()
          : (perpMarketAccount.marginRatioMaintenance as number);

        const initialMarginRatio = initialMarginRatioValue / 1e4;
        const maintenanceMarginRatio = maintenanceMarginRatioValue / 1e4;

        // Calculate margin requirements
        const initialMarginRequired = positionNotionalUSD * initialMarginRatio;
        const maintenanceMarginRequired = positionNotionalUSD * maintenanceMarginRatio;

        // Get actual margin used (from user's collateral)
        const perpPosition = user.getPerpPosition(marketIndex);
        
        // Calculate liquidation price using Maintenance margin (correct for liquidation)
        const liquidationPriceBN = user.liquidationPrice(
          marketIndex,
          ZERO, // No position change
          markPrice,
          'Maintenance', // Use maintenance margin for liquidation price
          false,
          ZERO,
          undefined
        );

        if (liquidationPriceBN.gte(ZERO)) {
          const liquidationPriceUSD = liquidationPriceBN.toNumber() / 1e6;
          console.log(`\n⚠️  Liquidation Price: $${liquidationPriceUSD.toFixed(2)} USD`);
          
          // Calculate price move to liquidation
          const priceMoveToLiquidation = direction === PositionDirection.LONG
            ? ((entryPriceUSD - liquidationPriceUSD) / entryPriceUSD) * 100
            : ((liquidationPriceUSD - entryPriceUSD) / entryPriceUSD) * 100;
          
          console.log(`  Price Move to Liquidation: ${priceMoveToLiquidation.toFixed(2)}%`);
        }

        // Calculate margin USED
        // Note: The platform may show different values due to how margin is allocated
        // We calculate based on margin ratios, but actual allocation may vary
        const initialMarginUsed = positionNotionalUSD * initialMarginRatio;
        const maintenanceMarginUsed = positionNotionalUSD * maintenanceMarginRatio;
        const initialMarginUsedPercent = (initialMarginUsed / positionNotionalUSD) * 100;
        const maintenanceMarginUsedPercent = (maintenanceMarginUsed / positionNotionalUSD) * 100;

        console.log(`\n📊 Margin Usage:`);
        console.log(`  Initial Margin Ratio: ${(initialMarginRatio * 100).toFixed(2)}%`);
        console.log(`  Maintenance Margin Ratio: ${(maintenanceMarginRatio * 100).toFixed(2)}%`);
        console.log(`  Initial Margin Used: $${initialMarginUsed.toFixed(2)} (${initialMarginUsedPercent.toFixed(2)}% of notional)`);
        console.log(`  Maintenance Margin Used: $${maintenanceMarginUsed.toFixed(2)} (${maintenanceMarginUsedPercent.toFixed(2)}% of notional)`);
        console.log(`  📝 Note: Platform may show different values due to margin allocation methods`);
      }

      // Calculate estimated leverage
      // This is approximate - we use the initial margin requirement
      if (perpMarketAccount) {
        const initialMarginRatioValue = (perpMarketAccount.marginRatioInitial as any).toNumber
          ? (perpMarketAccount.marginRatioInitial as BN).toNumber()
          : (perpMarketAccount.marginRatioInitial as number);
        const initialMarginRatio = initialMarginRatioValue / 1e4;
        const estimatedCollateralUsed = positionNotionalUSD * initialMarginRatio;
        const estimatedLeverage = positionNotionalUSD / estimatedCollateralUsed;
        
        console.log(`\n⚖️  Estimated Leverage:`);
        console.log(`  Estimated Collateral Used: $${estimatedCollateralUsed.toFixed(6)} USDC`);
        console.log(`  Estimated Leverage: ${estimatedLeverage.toFixed(2)}x`);
      }

      // Cost basis (quote entry amount in USD)
      const costBasisUSD = quoteEntryAmount.abs().toNumber() / 1e6;
      console.log(`\n💼 Cost Basis: $${costBasisUSD.toFixed(2)} USDC`);

      // Break even price
      // Break even = (Cost Basis + Fees) / Position Size
      // For simplicity, we'll use a small fee estimate (typically 0.1-0.2% of notional)
      // Actual break even includes funding fees which vary
      const estimatedFees = positionNotionalUSD * 0.001; // 0.1% estimate
      const breakEvenNotional = costBasisUSD + estimatedFees;
      const breakEvenPriceUSD = baseAssetAmountAbs.gt(ZERO)
        ? (breakEvenNotional * BASE_PRECISION.toNumber()) / baseAssetAmountAbs.toNumber() / 1e6
        : entryPriceUSD;
      console.log(`📉 Break Even Price: $${breakEvenPriceUSD.toFixed(2)} USD`);
    }

    console.log('\n' + '='.repeat(60));
    console.log('POSITION CHECK COMPLETE');
    console.log('='.repeat(60));

    // Cleanup
    await driftClient.unsubscribe();
  } catch (error) {
    console.error('\n❌ Error checking position:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    process.exit(1);
  }
}

// Run the check
checkPositionDetails();

