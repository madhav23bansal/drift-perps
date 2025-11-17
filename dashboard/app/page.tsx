'use client';

import { useEffect, useState } from 'react';
import { MetricsPanel } from '@/components/MetricsPanel';
import { ChartPanel } from '@/components/ChartPanel';
import { HistoryTable } from '@/components/HistoryTable';
import { useMarketStore } from '@/lib/store';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { fetchMergedData, fetchHistoryData } = useMarketStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Initial fetch
    fetchMergedData();
    fetchHistoryData('supplyApr');

    // Set up polling
    const mergedInterval = setInterval(fetchMergedData, 60000); // 1 minute
    const historyInterval = setInterval(() => fetchHistoryData('supplyApr'), 120000); // 2 minutes

    return () => {
      clearInterval(mergedInterval);
      clearInterval(historyInterval);
    };
  }, [mounted, fetchMergedData, fetchHistoryData]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="border-b border-gray-800 bg-gray-950 px-6 py-4">
        <h1 className="text-2xl font-bold text-white">Drift × Kamino Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">
          Real-time perpetuals and lending market data
        </p>
      </header>

      <main className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Metrics Panel */}
          <div className="lg:col-span-1">
            <MetricsPanel />
          </div>

          {/* Chart Panel */}
          <div className="lg:col-span-2">
            <ChartPanel />
          </div>
        </div>

        {/* History Table */}
        <div className="mt-6">
          <HistoryTable />
        </div>
      </main>
    </div>
  );
}
