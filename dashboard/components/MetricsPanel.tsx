'use client';

import { useMarketStore } from '@/lib/store';

export function MetricsPanel() {
  const { mergedData, loading, error } = useMarketStore();

  if (error) {
    return (
      <div className="bg-red-950/20 border border-red-900/50 rounded-lg p-4">
        <p className="text-red-400">Error: {error}</p>
      </div>
    );
  }

  if (loading || !mergedData) {
    return (
      <div className="space-y-3">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="bg-gray-800 rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-6 bg-gray-700 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  const metrics = [
    { label: 'Mark Price', value: `$${mergedData.markPrice.toFixed(2)}`, color: 'text-blue-400' },
    {
      label: 'Funding Rate (24h)',
      value: `${mergedData.fundingRatePct.toFixed(4)}%`,
      color: mergedData.fundingRatePct >= 0 ? 'text-green-400' : 'text-red-400',
    },
    {
      label: 'Open Interest',
      value: mergedData.openInterest.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      color: 'text-gray-300',
    },
    {
      label: 'Kamino Supply APR',
      value: `${mergedData.kaminoSupplyApr.toFixed(2)}%`,
      color: 'text-emerald-400',
    },
    {
      label: 'Kamino Borrow APR',
      value: `${mergedData.kaminoBorrowApr.toFixed(2)}%`,
      color: 'text-amber-400',
    },
    {
      label: 'Utilization',
      value: `${mergedData.kaminoUtilization.toFixed(2)}%`,
      color: 'text-purple-400',
    },
    {
      label: 'Carry APR (Borrow - Funding)',
      value: `${mergedData.combinedCarryApr.toFixed(2)}%`,
      color: mergedData.combinedCarryApr >= 0 ? 'text-green-400' : 'text-red-400',
    },
  ];

  return (
    <div className="space-y-3">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 hover:border-gray-600/50 transition-colors"
        >
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
            {metric.label}
          </div>
          <div className={`text-xl font-semibold ${metric.color}`}>
            {metric.value}
          </div>
        </div>
      ))}

      <div className="text-xs text-gray-500 text-center mt-4">
        Last updated: {new Date(mergedData.fetchedAt).toLocaleTimeString()}
      </div>
    </div>
  );
}
