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

async function listAllMarkets() {
  try {
    console.log('='.repeat(80));
    console.log('DRIFT PERPETUAL MARKETS - MARGIN REQUIREMENTS & LEVERAGE LIMITS');
    console.log('='.repeat(80));
    console.log(`\nEnvironment: ${ENVIRONMENT}`);
    console.log(`RPC URL: ${RPC_URL}\n`);

    // Initialize connection
    const connection = new Connection(RPC_URL, 'confirmed');

    // Get all markets from PerpMarkets constant first
    const allMarkets = PerpMarkets[ENVIRONMENT];
    console.log(`Total Markets Available: ${allMarkets.length}\n`);
    
    // Initialize DriftClient (minimal subscription, we'll fetch markets individually)
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
      perpMarketIndexes: [], // Start with no markets, fetch individually
      spotMarketIndexes: [0, 1],
      accountSubscription: {
        type: 'polling', // Use polling instead of websocket to avoid subscription issues
        commitment: 'confirmed',
      },
    });

    await driftClient.subscribe();

    console.log('='.repeat(80));
    console.log('MARKET DETAILS');
    console.log('='.repeat(80));
    console.log('');

    // Sort markets by index and limit to first 20 for demonstration
    const sortedMarkets = [...allMarkets]
      .sort((a, b) => a.marketIndex - b.marketIndex)
      .slice(0, 20); // Show first 20 markets

    for (const marketConfig of sortedMarkets) {
      const marketIndex = marketConfig.marketIndex;
      
      // Try to fetch the market account
      let marketAccount;
      try {
        // Add market to subscription if not already subscribed
        await driftClient.addPerpMarket(marketIndex);
        await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for subscription
        marketAccount = driftClient.getPerpMarketAccount(marketIndex);
      } catch (error) {
        console.log(`⚠️  Market ${marketIndex} (${marketConfig.baseAssetSymbol}-PERP): Not available or delisted`);
        continue;
      }

      if (!marketAccount) {
        console.log(`⚠️  Market ${marketIndex} (${marketConfig.baseAssetSymbol}-PERP): Could not fetch`);
        continue;
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

      // Calculate max leverage (theoretical maximum)
      const maxLeverage = 1 / initialMarginRatio;

      // Get oracle price
      const oracleData = driftClient.getOracleDataForPerpMarket(marketIndex);
      const oraclePrice = oracleData?.price
        ? oracleData.price.toNumber() / PRICE_PRECISION.toNumber()
        : 0;

      // Get market constraints
      const orderStepSize = marketAccount.amm.orderStepSize;
      const minOrderSize = marketAccount.amm.minOrderSize;
      const maxOrderSize = marketAccount.amm.maxBaseAssetReserve;

      // Calculate min/max order sizes in USD
      const minOrderSizeUSD = oraclePrice > 0
        ? (minOrderSize.toNumber() / BASE_PRECISION.toNumber()) * oraclePrice
        : 0;
      const orderStepSizeUSD = oraclePrice > 0
        ? (orderStepSize.toNumber() / BASE_PRECISION.toNumber()) * oraclePrice
        : 0;

      console.log(`📊 Market ${marketIndex}: ${marketConfig.baseAssetSymbol}-PERP`);
      console.log(`   Symbol: ${marketConfig.baseAssetSymbol}`);
      console.log(`   Oracle Price: $${oraclePrice.toFixed(2)}`);
      console.log(``);
      console.log(`   💰 Margin Requirements:`);
      console.log(`      Initial Margin: ${(initialMarginRatio * 100).toFixed(2)}%`);
      console.log(`      Maintenance Margin: ${(maintenanceMarginRatio * 100).toFixed(2)}%`);
      console.log(``);
      console.log(`   ⚖️  Leverage Limits:`);
      console.log(`      Maximum Leverage: ${maxLeverage.toFixed(2)}x`);
      console.log(`      (Calculated as: 1 / Initial Margin Ratio)`);
      console.log(``);
      console.log(`   📏 Order Constraints:`);
      console.log(`      Minimum Order Size: ${minOrderSize.toString()} (${(minOrderSize.toNumber() / BASE_PRECISION.toNumber()).toFixed(6)} ${marketConfig.baseAssetSymbol})`);
      if (minOrderSizeUSD > 0) {
        console.log(`      Minimum Order Size (USD): $${minOrderSizeUSD.toFixed(2)}`);
      }
      console.log(`      Order Step Size: ${orderStepSize.toString()} (${(orderStepSize.toNumber() / BASE_PRECISION.toNumber()).toFixed(6)} ${marketConfig.baseAssetSymbol})`);
      if (orderStepSizeUSD > 0) {
        console.log(`      Order Step Size (USD): $${orderStepSizeUSD.toFixed(2)}`);
      }
      console.log(``);
      console.log(`   📈 Market Info:`);
      console.log(`      Max Base Asset Reserve: ${maxOrderSize.toString()}`);
      
      // Get funding rate if available
      const fundingRate = marketAccount.amm.lastFundingRate;
      const fundingRateDecimal = fundingRate.toNumber() / PRICE_PRECISION.toNumber();
      const fundingRateBps = fundingRateDecimal * 10000;
      console.log(`      Current Funding Rate: ${fundingRateBps.toFixed(4)} bps (${(fundingRateDecimal * 100).toFixed(4)}%)`);
      
      console.log('');
      console.log('-'.repeat(80));
      console.log('');
    }

    // Summary table
    console.log('='.repeat(80));
    console.log('SUMMARY TABLE');
    console.log('='.repeat(80));
    console.log('');
    console.log(
      'Market Index'.padEnd(15) +
      'Symbol'.padEnd(15) +
      'Initial Margin'.padEnd(18) +
      'Max Leverage'.padEnd(15) +
      'Price (USD)'.padEnd(15)
    );
    console.log('-'.repeat(80));

    for (const marketConfig of sortedMarkets) {
      const marketIndex = marketConfig.marketIndex;
      const marketAccount = driftClient.getPerpMarketAccount(marketIndex);

      if (!marketAccount) {
        continue;
      }

      const initialMarginRatioValue = (marketAccount.marginRatioInitial as any).toNumber
        ? (marketAccount.marginRatioInitial as BN).toNumber()
        : (marketAccount.marginRatioInitial as number);
      const initialMarginRatio = initialMarginRatioValue / 10000;
      const maxLeverage = 1 / initialMarginRatio;

      const oracleData = driftClient.getOracleDataForPerpMarket(marketIndex);
      const oraclePrice = oracleData?.price
        ? oracleData.price.toNumber() / PRICE_PRECISION.toNumber()
        : 0;

      console.log(
        marketIndex.toString().padEnd(15) +
        marketConfig.baseAssetSymbol.padEnd(15) +
        `${(initialMarginRatio * 100).toFixed(2)}%`.padEnd(18) +
        `${maxLeverage.toFixed(2)}x`.padEnd(15) +
        `$${oraclePrice.toFixed(2)}`.padEnd(15)
      );
    }

    console.log('');
    console.log('='.repeat(80));
    console.log('NOTE: Leverage is calculated as 1 / Initial Margin Ratio');
    console.log('      Actual leverage may vary based on market conditions and fees');
    console.log('='.repeat(80));

    await driftClient.unsubscribe();
  } catch (error) {
    console.error('\n❌ Error listing markets:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    process.exit(1);
  }
}

// Run the script
listAllMarkets();

