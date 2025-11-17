import { NextResponse } from 'next/server';
import {
  DriftClient,
  PerpMarkets,
  PRICE_PRECISION,
  FUNDING_RATE_PRECISION,
  BASE_PRECISION,
  Wallet,
} from '@drift-labs/sdk';
import { Connection, Keypair } from '@solana/web3.js';

const DRIFT_ENV = 'mainnet-beta';
const DRIFT_MARKET = 'SOL-PERP';
const RPC_URL = process.env.RPC_URL || 'https://api.mainnet-beta.solana.com';
const KAMINO_API_BASE = 'https://api.kamino.finance';
const KAMINO_MARKET_ID = '7u3HeHxYDLhnCoErrtycNokbQYbWGzLs6JSDqGAv5PfF';
const KAMINO_RESERVE_ID = 'd4A2prbA2whesmvHaL88BH6Ewn5N4bTSU2Ze8P6Bc4Q';

const PRICE_PRECISION_NUM = PRICE_PRECISION.toNumber();
const FUNDING_RATE_PRECISION_NUM = FUNDING_RATE_PRECISION.toNumber();
const BASE_PRECISION_NUM = BASE_PRECISION.toNumber();

let driftClient: DriftClient | null = null;
let driftMarketIndex: number;

async function getDriftClient() {
  if (driftClient) return driftClient;

  const marketConfig = PerpMarkets[DRIFT_ENV].find(
    (market) => market.symbol === DRIFT_MARKET
  );
  if (!marketConfig) {
    throw new Error(`Market ${DRIFT_MARKET} not found`);
  }
  driftMarketIndex = marketConfig.marketIndex;

  const connection = new Connection(RPC_URL, 'confirmed');
  const keypair = Keypair.generate();
  const wallet = new Wallet(keypair);

  driftClient = new DriftClient({
    connection,
    wallet,
    authority: wallet.publicKey,
    env: DRIFT_ENV as any,
    perpMarketIndexes: [driftMarketIndex],
    spotMarketIndexes: [0],
    accountSubscription: {
      type: 'websocket',
    },
  });

  await driftClient.subscribe();
  return driftClient;
}

async function fetchDriftData() {
  try {
    const client = await getDriftClient();
    await client.fetchAccounts();
    const marketAccount = client.getPerpMarketAccount(driftMarketIndex);
    if (!marketAccount) {
      return { symbol: DRIFT_MARKET, markPrice: 0, fundingRatePct: 0, openInterest: 0 };
    }

    const oracleData = client.getOracleDataForPerpMarket(driftMarketIndex);
    const markPrice = oracleData
      ? oracleData.price.toNumber() / PRICE_PRECISION_NUM
      : 0;

    const fundingRateRaw = marketAccount.amm.lastFundingRate;
    const fundingRatePct = fundingRateRaw
      ? (fundingRateRaw.toNumber() / FUNDING_RATE_PRECISION_NUM) * 100
      : 0;

    const baseAssetWithAmm = marketAccount.amm.baseAssetAmountWithAmm;
    const openInterest = baseAssetWithAmm
      ? Math.abs(baseAssetWithAmm.toNumber()) / BASE_PRECISION_NUM
      : 0;

    return {
      symbol: DRIFT_MARKET,
      markPrice,
      fundingRatePct,
      openInterest,
    };
  } catch (error) {
    console.error('Failed to fetch Drift data:', error);
    return { symbol: DRIFT_MARKET, markPrice: 0, fundingRatePct: 0, openInterest: 0 };
  }
}

async function fetchKaminoData() {
  try {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const start = oneDayAgo.toISOString().split('.')[0] + 'Z';
    const end = now.toISOString().split('.')[0] + 'Z';

    const params = new URLSearchParams({
      env: 'mainnet-beta',
      start,
      end,
      frequency: 'hour',
    });

    const url = `${KAMINO_API_BASE}/kamino-market/${KAMINO_MARKET_ID}/reserves/${KAMINO_RESERVE_ID}/metrics/history?${params}`;
    const response = await fetch(url, { headers: { accept: 'application/json' } });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = await response.json();
    const history = Array.isArray(payload?.history) ? payload.history : [];

    if (history.length === 0) {
      return { symbol: KAMINO_RESERVE_ID, supplyApr: 0, borrowApr: 0, utilizationPct: 0 };
    }

    const latest = history[history.length - 1];
    const metrics = latest.metrics || {};

    const supplyApr = (metrics.supplyInterestAPY || 0) * 100;
    const borrowApr = (metrics.borrowInterestAPY || 0) * 100;

    let utilizationPct = 0;
    if (metrics.totalBorrows && metrics.totalSupply) {
      const borrows = Number(metrics.totalBorrows);
      const supply = Number(metrics.totalSupply);
      if (supply > 0) {
        utilizationPct = (borrows / supply) * 100;
      }
    }

    return {
      symbol: KAMINO_RESERVE_ID,
      supplyApr,
      borrowApr,
      utilizationPct,
    };
  } catch (error) {
    console.error('Failed to fetch Kamino data:', error);
    return { symbol: KAMINO_RESERVE_ID, supplyApr: 0, borrowApr: 0, utilizationPct: 0 };
  }
}

export async function GET() {
  try {
    const [driftData, kaminoData] = await Promise.all([
      fetchDriftData(),
      fetchKaminoData(),
    ]);

    const mergedData = {
      marketSymbol: driftData.symbol,
      tradingViewSymbol: 'BINANCE:SOLUSDT',
      markPrice: driftData.markPrice,
      fundingRatePct: driftData.fundingRatePct,
      openInterest: driftData.openInterest,
      kaminoSupplyApr: kaminoData.supplyApr,
      kaminoBorrowApr: kaminoData.borrowApr,
      kaminoUtilization: kaminoData.utilizationPct,
      combinedCarryApr: kaminoData.borrowApr - driftData.fundingRatePct,
      fetchedAt: new Date().toISOString(),
    };

    return NextResponse.json(mergedData);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
