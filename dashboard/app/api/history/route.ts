import { NextRequest, NextResponse } from 'next/server';

const KAMINO_API_BASE = 'https://api.kamino.finance';
const KAMINO_MARKET_ID = '7u3HeHxYDLhnCoErrtycNokbQYbWGzLs6JSDqGAv5PfF';
const KAMINO_RESERVE_ID = 'd4A2prbA2whesmvHaL88BH6Ewn5N4bTSU2Ze8P6Bc4Q';

let cachedHistory: any[] = [];
let cachedHistoryFetchedAt = 0;

async function fetchKaminoHistory() {
  const now = Date.now();

  // Return cache if less than 1 minute old
  if (cachedHistory.length && now - cachedHistoryFetchedAt < 60_000) {
    return cachedHistory;
  }

  try {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 21 * 24 * 60 * 60 * 1000); // 21 days ago

    const params = new URLSearchParams({
      env: 'mainnet-beta',
      start: startDate.toISOString().split('.')[0] + 'Z',
      end: endDate.toISOString().split('.')[0] + 'Z',
      frequency: 'hour',
    });

    const url = `${KAMINO_API_BASE}/kamino-market/${KAMINO_MARKET_ID}/reserves/${KAMINO_RESERVE_ID}/metrics/history?${params}`;
    const response = await fetch(url, { headers: { accept: 'application/json' } });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = await response.json();
    const rows = Array.isArray(payload?.history) ? payload.history : [];

    const points = rows
      .map((entry: any) => {
        const timestampMs = Date.parse(entry.timestamp);
        if (!Number.isFinite(timestampMs)) return null;

        const metrics = entry.metrics || {};
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
          timestampMs,
          supplyApr,
          borrowApr,
          utilizationPct,
        };
      })
      .filter((point: any) => point !== null);

    if (points.length) {
      cachedHistory = points.sort((a: any, b: any) => a.timestampMs - b.timestampMs);
      cachedHistoryFetchedAt = now;
    }

    return cachedHistory;
  } catch (error) {
    console.error('Failed to fetch Kamino history:', error);
    return [];
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const field = searchParams.get('field') || 'supplyApr';
    const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : undefined;

    const history = await fetchKaminoHistory();
    let filtered = history;

    if (limit && filtered.length > limit) {
      filtered = filtered.slice(-limit);
    }

    // Convert to chart bars
    const bars = filtered.map((point: any) => {
      const value = (point as any)[field] || 0;
      const time = point.timestampMs;

      return {
        time,
        open: value,
        high: value,
        low: value,
        close: value,
        volume: point.borrowApr || 0,
      };
    });

    return NextResponse.json({
      field,
      bars,
      points: filtered,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    );
  }
}
