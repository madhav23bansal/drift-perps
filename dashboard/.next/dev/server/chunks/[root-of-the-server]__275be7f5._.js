module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/dashboard/app/api/history/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0/node_modules/next/server.js [app-route] (ecmascript)");
;
const KAMINO_API_BASE = 'https://api.kamino.finance';
const KAMINO_MARKET_ID = '7u3HeHxYDLhnCoErrtycNokbQYbWGzLs6JSDqGAv5PfF';
const KAMINO_RESERVE_ID = 'd4A2prbA2whesmvHaL88BH6Ewn5N4bTSU2Ze8P6Bc4Q';
let cachedHistory = [];
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
            frequency: 'hour'
        });
        const url = `${KAMINO_API_BASE}/kamino-market/${KAMINO_MARKET_ID}/reserves/${KAMINO_RESERVE_ID}/metrics/history?${params}`;
        const response = await fetch(url, {
            headers: {
                accept: 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const payload = await response.json();
        const rows = Array.isArray(payload?.history) ? payload.history : [];
        const points = rows.map((entry)=>{
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
                    utilizationPct = borrows / supply * 100;
                }
            }
            return {
                timestampMs,
                supplyApr,
                borrowApr,
                utilizationPct
            };
        }).filter((point)=>point !== null);
        if (points.length) {
            cachedHistory = points.sort((a, b)=>a.timestampMs - b.timestampMs);
            cachedHistoryFetchedAt = now;
        }
        return cachedHistory;
    } catch (error) {
        console.error('Failed to fetch Kamino history:', error);
        return [];
    }
}
async function GET(request) {
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
        const bars = filtered.map((point)=>{
            const value = point[field] || 0;
            const time = point.timestampMs;
            return {
                time,
                open: value,
                high: value,
                low: value,
                close: value,
                volume: point.borrowApr || 0
            };
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            field,
            bars,
            points: filtered
        });
    } catch (error) {
        console.error('API error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch history'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__275be7f5._.js.map