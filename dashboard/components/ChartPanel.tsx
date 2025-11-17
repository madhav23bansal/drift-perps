'use client';

import { useEffect, useRef, useState } from 'react';
import { useMarketStore } from '@/lib/store';

export function ChartPanel() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const seriesRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [chartError, setChartError] = useState<string | null>(null);

  const { chartBars, selectedMetric, setSelectedMetric } = useMarketStore();

  const metricOptions = [
    { key: 'supplyApr' as const, label: 'Supply APR' },
    { key: 'borrowApr' as const, label: 'Borrow APR' },
    { key: 'utilizationPct' as const, label: 'Utilization %' },
  ];

  // Initialize chart with dynamic import
  useEffect(() => {
    if (!chartContainerRef.current || chartRef.current) return;

    const initChart = async () => {
      try {
        // Dynamic import for client-side only
        const LightweightCharts = await import('lightweight-charts');

        if (!chartContainerRef.current) return;

        // Use createChart from the module
        const chart = LightweightCharts.createChart(chartContainerRef.current, {
          layout: {
            background: {
              type: LightweightCharts.ColorType.Solid,
              color: '#111827'
            },
            textColor: '#9ca3af',
          },
          grid: {
            vertLines: { color: '#1f2937' },
            horzLines: { color: '#1f2937' },
          },
          width: chartContainerRef.current.clientWidth,
          height: 400,
          timeScale: {
            timeVisible: true,
            secondsVisible: false,
          },
        });

        // Add line series - check if method exists
        if (typeof chart.addLineSeries !== 'function') {
          throw new Error('addLineSeries method not found on chart object');
        }

        const lineSeries = chart.addLineSeries({
          color: '#3b82f6',
          lineWidth: 2,
        });

        chartRef.current = chart;
        seriesRef.current = lineSeries;
        setIsLoading(false);
        setChartError(null);

        // Handle resize
        const handleResize = () => {
          if (chartContainerRef.current && chartRef.current) {
            chartRef.current.applyOptions({
              width: chartContainerRef.current.clientWidth,
            });
          }
        };

        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      } catch (error) {
        console.error('Error initializing chart:', error);
        setChartError(error instanceof Error ? error.message : 'Failed to initialize chart');
        setIsLoading(false);
      }
    };

    initChart();

    return () => {
      if (chartRef.current) {
        try {
          chartRef.current.remove();
        } catch (e) {
          console.error('Error removing chart:', e);
        }
        chartRef.current = null;
        seriesRef.current = null;
      }
    };
  }, []);

  // Update chart data
  useEffect(() => {
    if (!seriesRef.current || !chartBars.length) return;

    try {
      const data = chartBars.map((bar) => ({
        time: Math.floor(bar.time / 1000), // Lightweight Charts expects seconds
        value: bar.close,
      }));

      seriesRef.current.setData(data);

      // Fit content to view
      if (chartRef.current) {
        chartRef.current.timeScale().fitContent();
      }
    } catch (error) {
      console.error('Error updating chart:', error);
    }
  }, [chartBars]);

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Historical Data</h2>
        <select
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value as any)}
          className="bg-gray-700 text-white text-sm rounded-lg px-3 py-2 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          {metricOptions.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {chartError ? (
        <div className="text-center py-20 text-red-400">
          <p className="mb-2">Chart Error: {chartError}</p>
          <p className="text-sm text-gray-500">Try refreshing the page</p>
        </div>
      ) : (
        <>
          <div ref={chartContainerRef} className="w-full" style={{ minHeight: '400px' }} />

          {(isLoading || chartBars.length === 0) && !chartError && (
            <div className="text-center py-20 text-gray-400">
              {isLoading ? 'Initializing chart...' : 'Loading chart data...'}
            </div>
          )}
        </>
      )}
    </div>
  );
}
