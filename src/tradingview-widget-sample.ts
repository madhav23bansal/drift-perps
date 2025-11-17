/**
 * Minimal HTTP server that renders a TradingView Advanced Chart widget.
 *
 * Docs: https://www.tradingview.com/widget-docs/tutorials/build-page/widget-integration/
 * Run with: pnpm tsx src/tradingview-widget-sample.ts
 */

import http from 'node:http';

type TradingViewWidgetConfig = {
  symbol: string;
  interval: string;
  timezone: string;
  theme: 'light' | 'dark';
  style: string;
  locale: string;
  allow_symbol_change: boolean;
  calendar: boolean;
  autosize: boolean;
  support_host: string;
};

const port = Number(process.env.PORT ?? 3000);

const widgetConfig: TradingViewWidgetConfig = {
  symbol: 'NASDAQ:AAPL',
  interval: 'D',
  timezone: 'Etc/UTC',
  theme: 'dark',
  style: '1',
  locale: 'en',
  allow_symbol_change: true,
  calendar: false,
  autosize: true,
  support_host: 'https://www.tradingview.com',
};

const widgetConfigJson = JSON.stringify(widgetConfig, null, 2);

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TradingView Advanced Chart Sample</title>
    <style>
      html,
      body {
        margin: 0;
        height: 100%;
        width: 100%;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
          sans-serif;
        background: #0e1114;
      }

      .tradingview-widget-container {
        height: 100%;
        width: 100%;
      }
    </style>
  </head>
  <body>
    <div class="tradingview-widget-container">
      <div class="tradingview-widget-container__widget"></div>
      <div class="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/symbols/${widgetConfig.symbol.replace(
            '/',
            '-'
          )}/?exchange=NASDAQ"
          rel="noopener"
          target="_blank"
        >
          <span class="blue-text">Tracking ${widgetConfig.symbol}</span>
        </a>
        by TradingView
      </div>
      <script
        type="text/javascript"
        src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
        async
      >
${widgetConfigJson}
      </script>
    </div>
  </body>
</html>`;

const server = http.createServer((_req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=UTF-8',
    'Cache-Control': 'no-store',
  });
  res.end(html);
});

server.listen(port, () => {
  console.log(
    `TradingView sample running at http://localhost:${port} (symbol ${widgetConfig.symbol})`
  );
  console.log('Press Ctrl+C to stop the server.');
});

