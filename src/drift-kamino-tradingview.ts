/**
 * Demo server that merges Drift perp market data with Kamino reserve metrics
 * and renders charts using either TradingView Charting Library OR Lightweight Charts.
 *
 * TWO OPTIONS:
 *
 * OPTION 1 - TradingView Charting Library (Full Features):
 * - Request access at: https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/
 * - After approval, download files to ./charting_library
 * - Requires company/public project, approval takes days-weeks
 *
 * OPTION 2 - Lightweight Charts (Works Immediately):
 * - Uses TradingView's open-source Lightweight Charts via CDN
 * - No approval needed, works out of the box
 * - Automatically used if charting_library directory not found
 *
 * Requirements:
 * - Node 18+ (for global fetch) and pnpm/tsx to run the script.
 *
 * Usage example:
 *   pnpm tsx src/drift-kamino-tradingview.ts \
 *     --drift-market SOL-PERP \
 *     --tv-symbol BINANCE:SOLUSDT \
 *     --kamino-market 7u3HeHxYDLhnCoErrtycNokbQYbWGzLs6JSDqGAv5PfF \
 *     --kamino-reserve d4A2prbA2whesmvHaL88BH6Ewn5N4bTSU2Ze8P6Bc4Q \
 *     --history-days 21
 */

import {
  BASE_PRECISION,
  DriftClient,
  DriftEnv,
  FUNDING_RATE_PRECISION,
  PRICE_PRECISION,
  PerpMarkets,
} from '@drift-labs/sdk';
import { Connection, Keypair } from '@solana/web3.js';

import { Wallet } from '@coral-xyz/anchor';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const PRICE_PRECISION_NUM = PRICE_PRECISION.toNumber();
const BASE_PRECISION_NUM = BASE_PRECISION.toNumber();
const FUNDING_RATE_PRECISION_NUM = FUNDING_RATE_PRECISION.toNumber();
const WAD = 1e18;

// ---------- Types ---------- //

type DriftMarketSnapshot = {
  symbol: string;
  markPrice?: number;
  fundingRatePct?: number;
  openInterest?: number;
};

type KaminoReserveSnapshot = {
  symbol: string;
  supplyApr?: number;
  borrowApr?: number;
  utilizationPct?: number;
  totalDeposits?: number;
  totalBorrows?: number;
};

type KaminoHistoryPoint = {
  timestampMs: number;
  supplyApr?: number;
  borrowApr?: number;
  utilizationPct?: number;
};

type MergedSnapshot = {
  marketSymbol: string;
  tradingViewSymbol: string;
  markPrice: number;
  fundingRatePct: number;
  openInterest: number;
  kaminoSupplyApr: number;
  kaminoBorrowApr: number;
  kaminoUtilization: number;
  combinedCarryApr: number;
  fetchedAt: string;
};

type CliArgs = Record<string, string>;

// ---------- CLI parsing ---------- //

function parseCliArgs(rawArgs: string[]): CliArgs {
  const parsed: CliArgs = {};
  for (let i = 0; i < rawArgs.length; i++) {
    const token = rawArgs[i];
    if (!token.startsWith('--')) {
      continue;
    }
    const [keyPart, inlineValue] = token.split('=');
    const key = keyPart.replace(/^--/, '');
    if (inlineValue !== undefined) {
      parsed[key] = inlineValue;
    } else {
      const next = rawArgs[i + 1];
      if (next && !next.startsWith('--')) {
        parsed[key] = next;
        i++;
      } else {
        parsed[key] = 'true';
      }
    }
  }
  return parsed;
}

const cliArgs = parseCliArgs(process.argv.slice(2));

const port = Number(cliArgs.port ?? process.env.PORT ?? 3001);

const driftMarketSymbol = (
  cliArgs['drift-market'] ??
  process.env.DRIFT_MARKET_SYMBOL ??
  'SOL-PERP'
).toUpperCase();
const tradingViewSymbol =
  cliArgs['tv-symbol'] ?? process.env.TRADINGVIEW_SYMBOL ?? 'BINANCE:SOLUSDT';

const kaminoMarketId =
  cliArgs['kamino-market'] ??
  process.env.KAMINO_MARKET_ID ??
  '7u3HeHxYDLhnCoErrtycNokbQYbWGzLs6JSDqGAv5PfF';
const kaminoReserveId =
  cliArgs['kamino-reserve'] ??
  process.env.KAMINO_RESERVE_ID ??
  'd4A2prbA2whesmvHaL88BH6Ewn5N4bTSU2Ze8P6Bc4Q';
const kaminoEnv =
  cliArgs['kamino-env'] ?? process.env.KAMINO_ENV ?? 'mainnet-beta';
const kaminoApiBase =
  cliArgs['kamino-api-base'] ??
  process.env.KAMINO_API_BASE ??
  'https://api.kamino.finance';

const rpcUrl =
  cliArgs['rpc-url'] ?? process.env.RPC_URL ?? 'https://api.mainnet-beta.solana.com';
const driftEnv = (cliArgs['drift-env'] ?? process.env.DRIFT_ENV ?? 'mainnet-beta') as DriftEnv;

const historyDays = Number(cliArgs['history-days'] ?? process.env.HISTORY_DAYS ?? 14);
const historyFrequency =
  cliArgs['history-frequency'] ?? process.env.HISTORY_FREQUENCY ?? 'hour';
const historyEndIso =
  cliArgs['history-end'] ?? process.env.HISTORY_END ?? formatDateParam(new Date());
const historyStartIso =
  cliArgs['history-start'] ??
  process.env.HISTORY_START ??
  formatDateParam(new Date(Date.now() - historyDays * 24 * 60 * 60 * 1000));

const chartingLibraryDir = path.resolve(
  cliArgs['charting-library-dir'] ?? process.env.TV_LIBRARY_DIR ?? 'charting_library'
);
const chartingLibraryUrlPrefix =
  cliArgs['charting-library-url-prefix'] ??
  process.env.TV_LIBRARY_URL_PREFIX ??
  '/charting_library/';
const chartingLibraryPathForWidget =
  cliArgs['charting-library-path'] ??
  process.env.TV_LIBRARY_PATH ??
  chartingLibraryUrlPrefix;

const chartSeriesOptions = [
  { key: 'supplyApr', label: 'Supply APR' },
  { key: 'borrowApr', label: 'Borrow APR' },
  { key: 'utilizationPct', label: 'Utilization %' },
];
const defaultChartSeries =
  cliArgs['chart-series'] ?? process.env.CHART_SERIES ?? chartSeriesOptions[0].key;

// ---------- Drift setup ---------- //

const marketConfig = PerpMarkets[driftEnv].find(
  (market) => market.symbol === driftMarketSymbol
);
if (!marketConfig) {
  throw new Error(
    `Unknown Drift perp market "${driftMarketSymbol}" for env ${driftEnv}`
  );
}
const driftMarketIndex = marketConfig.marketIndex;

const driftClientPromise = initDriftClient(driftMarketIndex);

process.once('SIGINT', async () => {
  const client = await driftClientPromise;
  await client.unsubscribe();
  process.exit(0);
});

async function initDriftClient(marketIndex: number): Promise<DriftClient> {
  const connection = new Connection(rpcUrl, 'confirmed');
  const keypair = Keypair.generate();
  const wallet = new Wallet(keypair);

  const driftClient = new DriftClient({
    connection,
    wallet,
    authority: wallet.publicKey,
    env: driftEnv,
    perpMarketIndexes: [marketIndex],
    spotMarketIndexes: [0],
    accountSubscription: {
      type: 'websocket',
    },
  });

  await driftClient.subscribe();
  return driftClient;
}

async function fetchDriftSnapshot(): Promise<DriftMarketSnapshot> {
  const driftClient = await driftClientPromise;
  await driftClient.fetchAccounts();
  const marketAccount = driftClient.getPerpMarketAccount(driftMarketIndex);
  if (!marketAccount) {
    return { symbol: driftMarketSymbol };
  }

  const oracleData = driftClient.getOracleDataForPerpMarket(driftMarketIndex);
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
    symbol: driftMarketSymbol,
    markPrice,
    fundingRatePct,
    openInterest,
  };
}

// ---------- Kamino history helpers ---------- //

let cachedHistory: KaminoHistoryPoint[] = [];
let cachedHistoryFetchedAt = 0;

function formatDateParam(input: string | Date): string {
  if (typeof input === 'string') {
    return input;
  }
  const iso = input.toISOString();
  return iso.substring(0, iso.indexOf('.')) + 'Z';
}

async function fetchJsonOrNull<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, { headers: { accept: 'application/json' } });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.warn(
      `[warn] Failed to fetch ${url}: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    return null;
  }
}

async function fetchKaminoHistoryFromApi(): Promise<KaminoHistoryPoint[]> {
  const params = new URLSearchParams({
    env: kaminoEnv,
    start: historyStartIso,
    end: historyEndIso,
    frequency: historyFrequency,
  });
  const url = `${kaminoApiBase}/kamino-market/${kaminoMarketId}/reserves/${kaminoReserveId}/metrics/history?${params.toString()}`;
  const payload = await fetchJsonOrNull<any>(url);
  const rows: any[] = Array.isArray(payload?.history)
    ? payload.history
    : Array.isArray(payload?.data)
    ? payload.data
    : Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.results)
    ? payload.results
    : [];

  const points: Array<KaminoHistoryPoint | null> = rows.map((entry) => {
    const tsRaw = entry.timestamp ?? entry.time ?? entry.date;
    const timestampMs = typeof tsRaw === 'number' ? tsRaw : Date.parse(tsRaw);
    if (!Number.isFinite(timestampMs)) {
      return null;
    }
    const metrics = entry.metrics ?? entry;
    // Kamino API returns supplyInterestAPY and borrowInterestAPY
    const supplyApr = normalizeApr(
      metrics.supplyInterestAPY ?? metrics.supplyApr ?? metrics.supply_apy
    );
    const borrowApr = normalizeApr(
      metrics.borrowInterestAPY ?? metrics.borrowApr ?? metrics.borrow_apy
    );
    // Calculate utilization from totalBorrows and totalSupply if not provided
    const utilizationRaw = metrics.utilization ?? metrics.utilizationRate;
    let utilizationPct: number | undefined;
    if (utilizationRaw !== undefined && utilizationRaw !== null) {
      utilizationPct = Number(utilizationRaw) * (utilizationRaw > 1 ? 1 : 100);
    } else if (metrics.totalBorrows && metrics.totalSupply) {
      const borrows = Number(metrics.totalBorrows);
      const supply = Number(metrics.totalSupply);
      if (supply > 0) {
        utilizationPct = (borrows / supply) * 100;
      }
    }

    const point: KaminoHistoryPoint = {
      timestampMs,
      supplyApr,
      borrowApr,
      utilizationPct,
    };
    return point;
  });

  return points.filter((point): point is KaminoHistoryPoint => Boolean(point));
}

function normalizeApr(value: any): number | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }
  const num = Number(value);
  if (!Number.isFinite(num)) {
    return undefined;
  }
  // Kamino API returns decimal values (e.g., 0.052 = 5.2%)
  // Convert to percentage for display
  return num < 1 ? num * 100 : num;
}

async function getKaminoHistory(force = false): Promise<KaminoHistoryPoint[]> {
  const now = Date.now();
  if (!force && cachedHistory.length && now - cachedHistoryFetchedAt < 60_000) {
    return cachedHistory;
  }
  const fresh = await fetchKaminoHistoryFromApi();
  if (fresh.length) {
    cachedHistory = fresh.sort((a, b) => a.timestampMs - b.timestampMs);
    cachedHistoryFetchedAt = now;
  }
  return cachedHistory;
}

async function fetchKaminoSnapshot(): Promise<KaminoReserveSnapshot> {
  const history = await getKaminoHistory();
  const latest = history[history.length - 1];
  if (!latest) {
    return { symbol: kaminoReserveId };
  }
  return {
    symbol: kaminoReserveId,
    supplyApr: latest.supplyApr,
    borrowApr: latest.borrowApr,
    utilizationPct: latest.utilizationPct,
  };
}

function mapHistoryToBars(
  history: KaminoHistoryPoint[],
  field: string
): Array<{ time: number; open: number; high: number; low: number; close: number; volume: number }> {
  return history
    .map((point) => {
      const valueRaw = (point as Record<string, number | undefined>)[field];
      if (valueRaw === undefined || valueRaw === null) {
        return null;
      }
      const value = Number(valueRaw);
      // TradingView expects time in milliseconds, not seconds
      const time = point.timestampMs;
      return {
        time,
        open: value,
        high: value,
        low: value,
        close: value,
        volume: point.borrowApr ?? 0,
      };
    })
    .filter((bar): bar is {
      time: number;
      open: number;
      high: number;
      low: number;
      close: number;
      volume: number;
    } => Boolean(bar));
}

// ---------- Snapshot merge ---------- //

function mergeSnapshots(
  drift: DriftMarketSnapshot,
  kamino: KaminoReserveSnapshot
): MergedSnapshot {
  const utilizationPct =
    kamino.utilizationPct ??
    (() => {
      if (
        kamino.totalDeposits !== undefined &&
        kamino.totalBorrows !== undefined &&
        kamino.totalDeposits > 0
      ) {
        return (kamino.totalBorrows / kamino.totalDeposits) * 100;
      }
      return 0;
    })();

  const fundingRatePct = drift.fundingRatePct ?? 0;
  const combinedCarryApr = (kamino.borrowApr ?? 0) - fundingRatePct;

  return {
    marketSymbol: drift.symbol || driftMarketSymbol,
    tradingViewSymbol,
    markPrice: drift.markPrice ?? 0,
    fundingRatePct,
    openInterest: drift.openInterest ?? 0,
    kaminoSupplyApr: kamino.supplyApr ?? 0,
    kaminoBorrowApr: kamino.borrowApr ?? 0,
    kaminoUtilization: utilizationPct,
    combinedCarryApr,
    fetchedAt: new Date().toISOString(),
  };
}

async function fetchMergedSnapshot(): Promise<MergedSnapshot> {
  const [driftSnapshot, kaminoSnapshot] = await Promise.all([
    fetchDriftSnapshot(),
    fetchKaminoSnapshot(),
  ]);
  return mergeSnapshots(driftSnapshot, kaminoSnapshot);
}

// ---------- HTML template ---------- //

const reserveLabel = `${kaminoReserveId.slice(0, 4)}...${kaminoReserveId.slice(-4)}`;
const hasChartingLibrary = fs.existsSync(chartingLibraryDir);
const chartingInstructions = hasChartingLibrary
  ? `Using TradingView Charting Library from ${chartingLibraryDir}`
  : `Using Lightweight Charts (open-source). For full Charting Library, request access at tradingview.com/HTML5-stock-forex-bitcoin-charting-library/`;

const baseHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Drift + Kamino TradingView Demo</title>
    <!-- Lightweight Charts CDN (fallback if Charting Library not available) -->
    <script src="https://unpkg.com/lightweight-charts@5.0.9/dist/lightweight-charts.standalone.production.js"></script>
    <style>
      :root {
        color-scheme: dark;
      }
      body {
        margin: 0;
        background: #05080c;
        color: #f7f9fc;
        font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      header {
        padding: 18px 28px 10px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      header h1 {
        margin: 0 0 4px;
        font-size: 24px;
      }
      header .meta {
        font-size: 13px;
        color: #9ea7b6;
        margin: 0;
      }
      .note {
        font-size: 12px;
        color: #c6d0e0;
      }
      main {
        flex: 1;
        display: grid;
        grid-template-columns: minmax(220px, 300px) 1fr;
        min-height: 0;
      }
      aside {
        background: #0d1117;
        padding: 18px 20px 24px;
        overflow-y: auto;
      }
      .metric-card {
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 10px;
        padding: 12px;
        margin-bottom: 12px;
        background: rgba(255, 255, 255, 0.02);
      }
      .metric-label {
        text-transform: uppercase;
        font-size: 10px;
        letter-spacing: 0.08em;
        color: #8b949e;
      }
      .metric-value {
        font-size: 18px;
        font-weight: 600;
        margin-top: 4px;
      }
      .chart-panel {
        position: relative;
        min-height: 0;
      }
      #tv_chart {
        position: absolute;
        inset: 0;
      }
      #chart-status {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        text-align: center;
        padding: 24px;
        color: #cbd5f5;
        background: rgba(5, 8, 12, 0.92);
      }
      .controls {
        margin-bottom: 16px;
      }
      select {
        width: 100%;
        padding: 8px;
        border-radius: 6px;
        border: 1px solid rgba(255, 255, 255, 0.15);
        background: #111827;
        color: #f8fafc;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 12px;
        margin-top: 12px;
      }
      th, td {
        text-align: left;
        padding: 6px 4px;
      }
      th {
        color: #9ea7b6;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      tr:nth-child(even) {
        background: rgba(255, 255, 255, 0.02);
      }
      a {
        color: #5aa9ff;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
      @media (max-width: 1024px) {
        main {
          grid-template-columns: 1fr;
        }
        .chart-panel {
          order: -1;
          height: 60vh;
        }
      }
    </style>
  </head>
  <body>
    <header>
      <h1>Drift ${driftMarketSymbol} × Kamino Reserve</h1>
      <p class="meta">
        TV Symbol: ${tradingViewSymbol} · Reserve
        <a href="https://kamino.com/borrow/reserve/${kaminoMarketId}/${kaminoReserveId}" target="_blank" rel="noopener">${reserveLabel}</a>
      </p>
      <p class="note">${chartingInstructions}</p>
    </header>
    <main>
      <aside>
        <div class="controls">
          <label for="series-select" class="metric-label">Chart Series</label>
          <select id="series-select"></select>
        </div>
        <div id="metrics-root">Loading metrics...</div>
        <h4 style="margin:16px 0 4px;">Recent Kamino points</h4>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Supply %</th>
              <th>Borrow %</th>
              <th>Util %</th>
            </tr>
          </thead>
          <tbody id="history-body">
            <tr><td colspan="4">Loading…</td></tr>
          </tbody>
        </table>
      </aside>
      <section class="chart-panel">
        <div id="tv_chart"></div>
        <div id="chart-status">Waiting for TradingView Charting Library assets…</div>
      </section>
    </main>
    <script>
      const chartSeriesOptions = ${JSON.stringify(chartSeriesOptions)};
      const defaultSeries = '${defaultChartSeries}';

      const selectEl = document.getElementById('series-select');
      chartSeriesOptions.forEach((option) => {
        const opt = document.createElement('option');
        opt.value = option.key;
        opt.textContent = option.label;
        if (option.key === defaultSeries) {
          opt.selected = true;
        }
        selectEl.appendChild(opt);
      });

      class CustomDatafeed {
        constructor() {
          this.field = selectEl.value;
          this.subscribers = new Map();
          this.resolutions = ['60', '240', '1D'];
        }
        setField(field) {
          this.field = field;
        }
        onReady(callback) {
          setTimeout(
            () =>
              callback({
                supported_resolutions: this.resolutions,
              }),
            0
          );
        }
        searchSymbols(userInput, exchange, symbolType, onResultReadyCallback) {
          // Return empty array since we're using a fixed symbol
          setTimeout(() => onResultReadyCallback([]), 0);
        }
        resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
          const symbolInfo = {
            name: symbolName,
            description: symbolName,
            ticker: symbolName,
            type: 'custom',
            session: '24x7',
            timezone: 'Etc/UTC',
            minmov: 1,
            pricescale: 10000,
            has_intraday: true,
            intraday_multipliers: ['60', '240'],
            supported_resolutions: this.resolutions,
            volume_precision: 2,
          };
          setTimeout(() => onSymbolResolvedCallback(symbolInfo), 0);
        }
        async getBars(symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) {
          try {
            const params = new URLSearchParams({ resolution, field: this.field });
            if (periodParams.from) params.set('from', periodParams.from.toString());
            if (periodParams.to) params.set('to', periodParams.to.toString());
            const response = await fetch('/api/history?' + params.toString());
            const data = await response.json();
            const bars = data.bars ?? [];
            const meta = { noData: !bars.length };
            onHistoryCallback(bars, meta);
          } catch (error) {
            console.error('[datafeed] getBars failed', error);
            onErrorCallback(error);
          }
        }
        subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID) {
          const poll = async () => {
            try {
              const params = new URLSearchParams({ field: this.field, limit: '1' });
              const response = await fetch('/api/history?' + params.toString());
              const data = await response.json();
              const bar = data.bars?.[data.bars.length - 1];
              if (bar) {
                onRealtimeCallback(bar);
              }
            } catch (error) {
              console.warn('[datafeed] realtime poll failed', error);
            }
          };
          poll();
          const timer = setInterval(poll, 60_000);
          this.subscribers.set(subscriberUID, timer);
        }
        unsubscribeBars(subscriberUID) {
          const timer = this.subscribers.get(subscriberUID);
          if (timer) {
            clearInterval(timer);
          }
          this.subscribers.delete(subscriberUID);
        }
      }

      const datafeed = new CustomDatafeed();
      selectEl.addEventListener('change', () => {
        datafeed.setField(selectEl.value);
        // Reload data for both libraries
        if (window.LightweightCharts && window.lwSeries) {
          loadLightweightChartData();
        } else {
          initializeWidget(true);
        }
      });

      async function refreshMetrics() {
        try {
          const response = await fetch('/api/merged');
          const data = await response.json();
          const root = document.getElementById('metrics-root');
          const cards = [
            { label: 'Mark Price', value: '$' + Number(data.markPrice || 0).toFixed(2) },
            { label: 'Funding Rate (24h)', value: Number(data.fundingRatePct || 0).toFixed(4) + '%' },
            { label: 'Open Interest', value: Number(data.openInterest || 0).toLocaleString(undefined, { maximumFractionDigits: 2 }) },
            { label: 'Kamino Supply APR', value: Number(data.kaminoSupplyApr || 0).toFixed(2) + '%' },
            { label: 'Kamino Borrow APR', value: Number(data.kaminoBorrowApr || 0).toFixed(2) + '%' },
            { label: 'Utilization', value: Number(data.kaminoUtilization || 0).toFixed(2) + '%' },
            { label: 'Carry (Borrow APR - Funding)', value: Number(data.combinedCarryApr || 0).toFixed(2) + '%' },
          ];
          root.innerHTML = cards
            .map(
              (metric) => \`
            <article class="metric-card">
              <div class="metric-label">\${metric.label}</div>
              <div class="metric-value">\${metric.value}</div>
            </article>\`
            )
            .join('');
        } catch (error) {
          document.getElementById('metrics-root').textContent = 'Failed to load metrics: ' + error;
        }
      }

      async function refreshHistoryTable() {
        try {
          const response = await fetch('/api/history?limit=10');
          const data = await response.json();
          const tbody = document.getElementById('history-body');
          const rows = data.points ?? [];
          if (!rows.length) {
            tbody.innerHTML = '<tr><td colspan="4">No history</td></tr>';
            return;
          }
          tbody.innerHTML = rows
            .map((row) => {
              const date = new Date(row.timestampMs).toLocaleString();
              return \`
                <tr>
                  <td>\${date}</td>
                  <td>\${Number(row.supplyApr ?? 0).toFixed(2)}%</td>
                  <td>\${Number(row.borrowApr ?? 0).toFixed(2)}%</td>
                  <td>\${Number(row.utilizationPct ?? 0).toFixed(2)}%</td>
                </tr>\`;
            })
            .join('');
        } catch (error) {
          document.getElementById('history-body').innerHTML = '<tr><td colspan="4">History error</td></tr>';
        }
      }

      function initializeWidget(force) {
        const statusEl = document.getElementById('chart-status');
        const chartContainer = document.getElementById('tv_chart');

        // Check if full Charting Library is available
        if (window.TradingView && window.TradingView.widget) {
          statusEl.style.display = 'none';
          if (force && window.tvWidget) {
            window.tvWidget.remove();
            window.tvWidget = null;
          }
          window.tvWidget = new TradingView.widget({
            symbol: '${driftMarketSymbol}:${kaminoReserveId}',
            interval: '60',
            fullscreen: false,
            autosize: true,
            container: 'tv_chart',
            datafeed,
            library_path: '${chartingLibraryPathForWidget}',
            locale: 'en',
            theme: 'dark',
            timezone: 'Etc/UTC',
            custom_css_url: '',
            overrides: {
              'paneProperties.background': '#05080c',
            },
          });
          return;
        }

        // Fallback to Lightweight Charts
        if (window.LightweightCharts) {
          statusEl.style.display = 'none';
          if (force && window.lwChart) {
            window.lwChart.remove();
            window.lwChart = null;
            window.lwSeries = null;
          }

          // Clear container
          chartContainer.innerHTML = '';

          // Create Lightweight Chart
          window.lwChart = LightweightCharts.createChart(chartContainer, {
            layout: {
              background: { color: '#05080c' },
              textColor: '#f7f9fc',
            },
            grid: {
              vertLines: { color: 'rgba(255, 255, 255, 0.08)' },
              horzLines: { color: 'rgba(255, 255, 255, 0.08)' },
            },
            timeScale: {
              timeVisible: true,
              secondsVisible: false,
            },
            width: chartContainer.clientWidth,
            height: chartContainer.clientHeight,
          });

          // Add line series
          window.lwSeries = window.lwChart.addLineSeries({
            color: '#5aa9ff',
            lineWidth: 2,
          });

          // Load initial data
          loadLightweightChartData();

          // Handle window resize
          const resizeObserver = new ResizeObserver(entries => {
            if (window.lwChart && entries.length > 0) {
              const { width, height } = entries[0].contentRect;
              window.lwChart.applyOptions({ width, height });
            }
          });
          resizeObserver.observe(chartContainer);

          // Auto-refresh every minute
          if (!window.lwUpdateInterval) {
            window.lwUpdateInterval = setInterval(loadLightweightChartData, 60_000);
          }
          return;
        }

        // No charting library available
        statusEl.style.display = 'flex';
        statusEl.innerHTML = '<div>Loading charting library...</div>';
      }

      async function loadLightweightChartData() {
        if (!window.lwSeries) return;
        try {
          const params = new URLSearchParams({ field: selectEl.value, limit: '1000' });
          const response = await fetch('/api/history?' + params.toString());
          const data = await response.json();
          const bars = data.bars ?? [];

          // Convert bars to Lightweight Charts format
          const lightweightData = bars.map(bar => ({
            time: Math.floor(bar.time / 1000), // Lightweight Charts uses seconds
            value: bar.close,
          }));

          window.lwSeries.setData(lightweightData);
        } catch (error) {
          console.error('[lightweight] Failed to load data', error);
        }
      }

      window.addEventListener('load', () => {
        initializeWidget(false);
        refreshMetrics();
        refreshHistoryTable();
        setInterval(refreshMetrics, 60_000);
        setInterval(refreshHistoryTable, 120_000);
      });
    </script>
  </body>
</html>`;

// ---------- HTTP helpers ---------- //

function serveChartingLibrary(req: http.IncomingMessage, res: http.ServerResponse): boolean {
  if (!req.url || !req.url.startsWith(chartingLibraryUrlPrefix)) {
    return false;
  }
  const relative = decodeURIComponent(
    req.url.slice(chartingLibraryUrlPrefix.length)
  ).replace(/\0/g, '');
  const safePath = path.normalize(relative).replace(/^\.\/+/, '');
  const filePath = path.join(chartingLibraryDir, safePath);
  if (!filePath.startsWith(chartingLibraryDir)) {
    res.writeHead(403).end('Forbidden');
    return true;
  }
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404).end('Not found');
      return;
    }
    const stream = fs.createReadStream(filePath);
    res.writeHead(200, {
      'Content-Type': getMimeType(filePath),
    });
    stream.pipe(res);
  });
  return true;
}

function getMimeType(filePath: string): string {
  if (filePath.endsWith('.js')) return 'application/javascript';
  if (filePath.endsWith('.css')) return 'text/css';
  if (filePath.endsWith('.json')) return 'application/json';
  if (filePath.endsWith('.wasm')) return 'application/wasm';
  return 'application/octet-stream';
}

function filterHistoryByRange(
  history: KaminoHistoryPoint[],
  from?: number,
  to?: number,
  limit?: number
): KaminoHistoryPoint[] {
  let filtered = history;
  if (from) {
    filtered = filtered.filter((point) => point.timestampMs / 1000 >= from);
  }
  if (to) {
    filtered = filtered.filter((point) => point.timestampMs / 1000 <= to);
  }
  if (limit && filtered.length > limit) {
    filtered = filtered.slice(-limit);
  }
  return filtered;
}

// ---------- HTTP server ---------- //

const server = http.createServer(async (req, res) => {
  if (!req.url) {
    res.writeHead(400).end('Bad request');
    return;
  }

  if (serveChartingLibrary(req, res)) {
    return;
  }

  if (req.url.startsWith('/api/merged')) {
    try {
      const payload = await fetchMergedSnapshot();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(payload));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          error: error instanceof Error ? error.message : 'unknown error',
        })
      );
    }
    return;
  }

  if (req.url.startsWith('/api/history')) {
    try {
      const url = new URL(req.url, `http://localhost:${port}`);
      const field = url.searchParams.get('field') ?? defaultChartSeries;
      const resolution = url.searchParams.get('resolution') ?? '60';
      const from = url.searchParams.get('from');
      const to = url.searchParams.get('to');
      const limit = url.searchParams.get('limit');

      const history = await getKaminoHistory();
      const filtered = filterHistoryByRange(
        history,
        from ? Number(from) : undefined,
        to ? Number(to) : undefined,
        limit ? Number(limit) : undefined
      );
      const bars = mapHistoryToBars(filtered, field).sort((a, b) => a.time - b.time);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          field,
          resolution,
          bars,
          points: filtered,
        })
      );
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          error: error instanceof Error ? error.message : 'unknown error',
        })
      );
    }
    return;
  }

  if (req.url === '/' || req.url.startsWith('/?')) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    res.end(baseHtml);
    return;
  }

  res.writeHead(404).end('Not found');
});

server.listen(port, () => {
  console.log(
    `Drift + Kamino TradingView demo at http://localhost:${port} (Drift market ${driftMarketSymbol}, TradingView symbol ${tradingViewSymbol})`
  );
  console.log(`Using Solana RPC: ${rpcUrl}`);
  console.log(`Kamino reserve history from ${kaminoApiBase}`);

  if (fs.existsSync(chartingLibraryDir)) {
    console.log(`[✓] Using TradingView Charting Library from: ${chartingLibraryDir}`);
  } else {
    console.log(`[✓] Using Lightweight Charts (open-source) via CDN`);
    console.log(`[info] For full Charting Library features, request access at:`);
    console.log(`       https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/`);
  }
});
