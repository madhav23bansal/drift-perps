# Drift × Kamino Dashboard

Professional Next.js dashboard for real-time Drift perpetuals and Kamino lending market data.

## 🚀 Quick Start

```bash
cd dashboard
pnpm dev
```

**Access:** http://localhost:3000

## ✅ Status: FULLY OPERATIONAL

### API Endpoints
- **Merged Data**: `GET /api/merged` - Drift + Kamino combined metrics
- **History Data**: `GET /api/history?field=supplyApr` - Historical Kamino data

### Latest Data (Live)
- **Mark Price**: $139.00
- **Kamino Supply APR**: 3.83%
- **Kamino Borrow APR**: 5.73%
- **Funding Rate**: -0.13%
- **Status**: ✅ All systems operational

## 📊 Features

### 1. Live Metrics Panel
- Real-time Drift mark price & funding rate
- Open interest tracking
- Kamino APY rates (supply & borrow)
- Utilization percentage
- Combined carry APR calculation
- Auto-refreshes every 60 seconds

### 2. Interactive Chart (Lightweight Charts)
- 21 days of historical data
- Switch between metrics:
  - Supply APR
  - Borrow APR
  - Utilization %
- Responsive design
- Auto-refresh every 120 seconds

### 3. Historical Data Table
- Last 10 data points
- Timestamps in local timezone
- Color-coded metrics

## 🛠 Tech Stack

- **Next.js 16** - App Router with Turbopack
- **React 19** - Latest React features
- **TypeScript** - Full type safety
- **Tailwind CSS v4** - Modern styling
- **Zustand** - Lightweight state management
- **Lightweight Charts** - TradingView's open-source charting
- **Drift SDK** - Perpetuals data
- **Kamino API** - Lending market data

## 📁 Project Structure

```
dashboard/
├── app/
│   ├── api/
│   │   ├── merged/route.ts      # Drift + Kamino merged endpoint
│   │   └── history/route.ts     # Historical data endpoint
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main dashboard page
├── components/
│   ├── MetricsPanel.tsx         # Live metrics cards
│   ├── ChartPanel.tsx           # Interactive chart
│   └── HistoryTable.tsx         # Recent data table
├── lib/
│   └── store.ts                 # Zustand state management
└── Configuration files

## 🔧 Configuration

### Environment Variables (.env.local)
```env
RPC_URL=https://api.mainnet-beta.solana.com
```

### Configured Markets
- **Drift Market**: SOL-PERP
- **Kamino Market**: 7u3HeHxYDLhnCoErrtycNokbQYbWGzLs6JSDqGAv5PfF
- **Kamino Reserve**: d4A2prbA2whesmvHaL88BH6Ewn5N4bTSU2Ze8P6Bc4Q

## 🎯 Usage

### Development
```bash
pnpm dev          # Start dev server (localhost:3000)
```

### Production
```bash
pnpm build        # Build for production
pnpm start        # Start production server
```

### API Testing
```bash
# Test merged endpoint
curl http://localhost:3000/api/merged | jq

# Test history endpoint
curl "http://localhost:3000/api/history?field=supplyApr&limit=10" | jq
```

## 🐛 Troubleshooting

### Chart not displaying
- Ensure browser console is clear
- Check that `/api/history` returns data
- Verify Lightweight Charts is loaded

### API errors
- Check RPC_URL in .env.local
- Verify network connectivity
- Check server logs: `tail -f /tmp/nextjs-dev.log`

### Build issues
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && pnpm install`

## 📊 Key Improvements Over Previous Implementation

| Feature | Old Script | New Dashboard |
|---------|-----------|---------------|
| Framework | Vanilla JS | ✅ Next.js 16 |
| State Management | Global vars | ✅ Zustand |
| Type Safety | None | ✅ Full TypeScript |
| Components | Monolithic | ✅ Modular React |
| Styling | Inline CSS | ✅ Tailwind CSS v4 |
| API Routes | Single file | ✅ Organized routes |
| Hot Reload | Manual | ✅ Instant HMR |
| Error Handling | Basic | ✅ Comprehensive |
| Build Optimization | None | ✅ Next.js + Turbopack |

## 🎨 Color Scheme

- **Background**: Dark gray (#0a0e14)
- **Cards**: Gray-800 with transparency
- **Accent**: Blue (#3b82f6)
- **Success**: Emerald/Green
- **Warning**: Amber
- **Error**: Red

## 📝 Notes

- Data refreshes automatically (no manual refresh needed)
- Chart uses seconds for timestamps (Lightweight Charts requirement)
- API endpoints cache data for 60 seconds to reduce load
- Drift client connection persists across requests

## 🔗 Links

- **Dashboard**: http://localhost:3000
- **Drift Protocol**: https://drift.trade
- **Kamino Finance**: https://kamino.finance
- **Next.js Docs**: https://nextjs.org/docs
- **Lightweight Charts**: https://tradingview.github.io/lightweight-charts/

---

**Built with ❤️ using Next.js, React, and TradingView Lightweight Charts**
