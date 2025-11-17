'use client';

import { useMarketStore } from '@/lib/store';

export function HistoryTable() {
  const { historyData } = useMarketStore();

  const displayData = historyData.slice(-10).reverse(); // Last 10 points, newest first

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
      <h2 className="text-lg font-semibold text-white mb-4">Recent History</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="pb-3 text-gray-400 font-medium">Time</th>
              <th className="pb-3 text-gray-400 font-medium text-right">Supply APR</th>
              <th className="pb-3 text-gray-400 font-medium text-right">Borrow APR</th>
              <th className="pb-3 text-gray-400 font-medium text-right">Utilization</th>
            </tr>
          </thead>
          <tbody>
            {displayData.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-400">
                  Loading history data...
                </td>
              </tr>
            ) : (
              displayData.map((row, index) => (
                <tr
                  key={row.timestampMs}
                  className={`border-b border-gray-800/50 ${
                    index % 2 === 0 ? 'bg-gray-900/20' : ''
                  }`}
                >
                  <td className="py-3 text-gray-300">
                    {new Date(row.timestampMs).toLocaleString()}
                  </td>
                  <td className="py-3 text-right text-emerald-400">
                    {(row.supplyApr || 0).toFixed(2)}%
                  </td>
                  <td className="py-3 text-right text-amber-400">
                    {(row.borrowApr || 0).toFixed(2)}%
                  </td>
                  <td className="py-3 text-right text-purple-400">
                    {(row.utilizationPct || 0).toFixed(2)}%
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
