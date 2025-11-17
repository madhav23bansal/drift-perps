import { create } from 'zustand';

export type MergedData = {
  marketSymbol: string;
  markPrice: number;
  fundingRatePct: number;
  openInterest: number;
  kaminoSupplyApr: number;
  kaminoBorrowApr: number;
  kaminoUtilization: number;
  combinedCarryApr: number;
  fetchedAt: string;
};

export type HistoryPoint = {
  timestampMs: number;
  supplyApr?: number;
  borrowApr?: number;
  utilizationPct?: number;
};

export type ChartBar = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

type MarketState = {
  mergedData: MergedData | null;
  historyData: HistoryPoint[];
  chartBars: ChartBar[];
  selectedMetric: 'supplyApr' | 'borrowApr' | 'utilizationPct';
  loading: boolean;
  error: string | null;

  setSelectedMetric: (metric: 'supplyApr' | 'borrowApr' | 'utilizationPct') => void;
  fetchMergedData: () => Promise<void>;
  fetchHistoryData: (field: string) => Promise<void>;
};

export const useMarketStore = create<MarketState>((set, get) => ({
  mergedData: null,
  historyData: [],
  chartBars: [],
  selectedMetric: 'supplyApr',
  loading: false,
  error: null,

  setSelectedMetric: (metric) => {
    set({ selectedMetric: metric });
    get().fetchHistoryData(metric);
  },

  fetchMergedData: async () => {
    try {
      set({ loading: true, error: null });
      const response = await fetch('/api/merged');
      if (!response.ok) throw new Error('Failed to fetch merged data');
      const data = await response.json();
      set({ mergedData: data, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error',
        loading: false
      });
    }
  },

  fetchHistoryData: async (field: string) => {
    try {
      const response = await fetch(`/api/history?field=${field}`);
      if (!response.ok) throw new Error('Failed to fetch history data');
      const data = await response.json();
      set({
        historyData: data.points || [],
        chartBars: data.bars || []
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },
}));
