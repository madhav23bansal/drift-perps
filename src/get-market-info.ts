import * as dotenv from 'dotenv';

import {
  BASE_PRECISION,
  BN,
  DriftClient,
  PRICE_PRECISION,
  PerpMarkets,
} from '@drift-labs/sdk';
import { Connection, PublicKey } from '@solana/web3.js';

dotenv.config();

const RPC_URL = process.env.RPC_URL || 'https://api.mainnet-beta.solana.com';
const ENVIRONMENT = 'mainnet-beta' as 'mainnet-beta' | 'devnet';

/**
 * Get margin requirements and leverage limits for a specific market
 * 
 * WHERE TO FIND THIS INFORMATION:
 * 
 * 1. PerpMarkets constant (from @drift-labs/sdk):
 *    - Contains all market configurations
 *    - Import: import { PerpMarkets } from '@drift-labs/sdk'
 *    - Access: PerpMarkets['mainnet-beta'] or PerpMarkets['devnet']
 * 
 * 2. Market Account (on-chain data):
 *    - marginRatioInitial: Initial margin requirement (in basis points, e.g., 500 = 5%)
 *    - marginRatioMaintenance: Maintenance margin requirement (in basis points, e.g., 200 = 2%)
 *    - Access via: driftClient.getPerpMarketAccount(marketIndex)
 * 
 * 3. Calculate Max Leverage:
 *    - Max Leverage = 1 / (Initial Margin Ratio / 10000)
 *    - Example: If initial margin is 5% (500 basis points), max leverage = 1 / 0.05 = 20x
 * 
 * 4. Min Leverage:
 *    - There's no minimum leverage - you can use as little leverage as you want (1x = no leverage)
 *    - However, minimum order sizes may limit how small positions can be
 */

async function getMarketInfo(marketIndex: number) {
  try {
    console.log(`\n📊 Getting market info for Market Index ${marketIndex}...\n`);

    // Initialize connection
    const connection = new Connection(RPC_URL, 'confirmed');

    // Initialize DriftClient
    const driftClient = new DriftClient({
      connection,
      wallet: {
        publicKey: PublicKey.default,
        signTransaction: async () => {
          throw new Error('Read-only mode');
        },
        signAllTransactions: async () => {
          throw new Error('Read-only mode');
        },
      },
      env: ENVIRONMENT,
      perpMarketIndexes: [marketIndex], // Subscribe to specific market
      spotMarketIndexes: [0, 1],
      accountSubscription: {
        type: 'websocket',
        commitment: 'confirmed',
      },
    });

    await driftClient.subscribe();
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for subscription

    // Get market from PerpMarkets constant
    const marketConfig = PerpMarkets[ENVIRONMENT].find((m) => m.marketIndex === marketIndex);
    if (!marketConfig) {
      console.log(`❌ Market index ${marketIndex} not found in PerpMarkets`);
      return;
    }

    console.log(`Market: ${marketConfig.baseAssetSymbol}-PERP (Index: ${marketIndex})`);

    // Get on-chain market account
    const marketAccount = driftClient.getPerpMarketAccount(marketIndex);
    if (!marketAccount) {
      console.log(`❌ Could not fetch market account for index ${marketIndex}`);
      await driftClient.unsubscribe();
      return;
    }

    // Get margin ratios
    const initialMarginRatioValue = (marketAccount.marginRatioInitial as any).toNumber
      ? (marketAccount.marginRatioInitial as BN).toNumber()
      : (marketAccount.marginRatioInitial as number);
    const maintenanceMarginRatioValue = (marketAccount.marginRatioMaintenance as any).toNumber
      ? (marketAccount.marginRatioMaintenance as BN).toNumber()
      : (marketAccount.marginRatioMaintenance as number);

    // Convert from basis points to decimal (e.g., 500 = 5%)
    const initialMarginRatio = initialMarginRatioValue / 10000;
    const maintenanceMarginRatio = maintenanceMarginRatioValue / 10000;

    // Calculate max leverage
    const maxLeverage = 1 / initialMarginRatio;

    // Get oracle price
    const oracleData = driftClient.getOracleDataForPerpMarket(marketIndex);
    const oraclePrice = oracleData?.price
      ? oracleData.price.toNumber() / PRICE_PRECISION.toNumber()
      : 0;

    // Get market constraints
    const orderStepSize = marketAccount.amm.orderStepSize;
    const minOrderSize = marketAccount.amm.minOrderSize;

    console.log('\n' + '='.repeat(60));
    console.log('MARGIN REQUIREMENTS & LEVERAGE LIMITS');
    console.log('='.repeat(60));
    console.log('');
    console.log(`💰 Margin Requirements:`);
    console.log(`   Initial Margin: ${(initialMarginRatio * 100).toFixed(2)}% (${initialMarginRatioValue} basis points)`);
    console.log(`   Maintenance Margin: ${(maintenanceMarginRatio * 100).toFixed(2)}% (${maintenanceMarginRatioValue} basis points)`);
    console.log('');
    console.log(`⚖️  Leverage Limits:`);
    console.log(`   Maximum Leverage: ${maxLeverage.toFixed(2)}x`);
    console.log(`   Minimum Leverage: 1x (no minimum, but limited by order sizes)`);
    console.log(`   Calculation: Max Leverage = 1 / Initial Margin Ratio`);
    console.log(`                Max Leverage = 1 / ${initialMarginRatio.toFixed(4)} = ${maxLeverage.toFixed(2)}x`);
    console.log('');
    console.log(`📏 Order Constraints:`);
    console.log(`   Minimum Order Size: ${minOrderSize.toString()} (${(minOrderSize.toNumber() / BASE_PRECISION.toNumber()).toFixed(6)} ${marketConfig.baseAssetSymbol})`);
    console.log(`   Order Step Size: ${orderStepSize.toString()} (${(orderStepSize.toNumber() / BASE_PRECISION.toNumber()).toFixed(6)} ${marketConfig.baseAssetSymbol})`);
    if (oraclePrice > 0) {
      const minOrderSizeUSD = (minOrderSize.toNumber() / BASE_PRECISION.toNumber()) * oraclePrice;
      const orderStepSizeUSD = (orderStepSize.toNumber() / BASE_PRECISION.toNumber()) * oraclePrice;
      console.log(`   Minimum Order Size (USD): $${minOrderSizeUSD.toFixed(2)}`);
      console.log(`   Order Step Size (USD): $${orderStepSizeUSD.toFixed(2)}`);
    }
    console.log('');
    console.log(`📈 Current Market Data:`);
    console.log(`   Oracle Price: $${oraclePrice.toFixed(2)}`);
    console.log('');

    await driftClient.unsubscribe();
  } catch (error) {
    console.error('\n❌ Error getting market info:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
  }
}

// List all available markets
function listAllMarkets() {
  console.log('='.repeat(60));
  console.log('ALL AVAILABLE DRIFT PERPETUAL MARKETS');
  console.log('='.repeat(60));
  console.log(`\nEnvironment: ${ENVIRONMENT}`);
  console.log(`\nMarkets are defined in: PerpMarkets['${ENVIRONMENT}'] from @drift-labs/sdk\n`);

  const allMarkets = PerpMarkets[ENVIRONMENT];
  const sortedMarkets = [...allMarkets].sort((a, b) => a.marketIndex - b.marketIndex);

  console.log('Market Index'.padEnd(15) + 'Symbol'.padEnd(20) + 'Market Name');
  console.log('-'.repeat(60));

  for (const market of sortedMarkets) {
    console.log(
      market.marketIndex.toString().padEnd(15) +
      market.baseAssetSymbol.padEnd(20) +
      `${market.baseAssetSymbol}-PERP`
    );
  }

  console.log(`\nTotal Markets: ${allMarkets.length}`);
  console.log('\n💡 To get margin requirements for a specific market, run:');
  console.log('   npx tsx src/get-market-info.ts <marketIndex>');
  console.log('\n   Example: npx tsx src/get-market-info.ts 0  (for SOL-PERP)');
  console.log('   Example: npx tsx src/get-market-info.ts 1  (for BTC-PERP)');
}

// Main execution
const marketIndexArg = process.argv[2];

if (marketIndexArg) {
  const marketIndex = Number.parseInt(marketIndexArg, 10);
  if (Number.isNaN(marketIndex)) {
    console.error('❌ Invalid market index. Please provide a number.');
    process.exit(1);
  }
  getMarketInfo(marketIndex);
} else {
  listAllMarkets();
}

