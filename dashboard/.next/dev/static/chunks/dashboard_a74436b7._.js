(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/dashboard/lib/store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMarketStore",
    ()=>useMarketStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$8_$40$types$2b$react$40$19$2e$2$2e$5_react$40$19$2e$2$2e$0$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/zustand@5.0.8_@types+react@19.2.5_react@19.2.0/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
;
const useMarketStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$8_$40$types$2b$react$40$19$2e$2$2e$5_react$40$19$2e$2$2e$0$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        mergedData: null,
        historyData: [],
        chartBars: [],
        selectedMetric: 'supplyApr',
        loading: false,
        error: null,
        setSelectedMetric: (metric)=>{
            set({
                selectedMetric: metric
            });
            get().fetchHistoryData(metric);
        },
        fetchMergedData: async ()=>{
            try {
                set({
                    loading: true,
                    error: null
                });
                const response = await fetch('/api/merged');
                if (!response.ok) throw new Error('Failed to fetch merged data');
                const data = await response.json();
                set({
                    mergedData: data,
                    loading: false
                });
            } catch (error) {
                set({
                    error: error instanceof Error ? error.message : 'Unknown error',
                    loading: false
                });
            }
        },
        fetchHistoryData: async (field)=>{
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
        }
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dashboard/components/MetricsPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MetricsPanel",
    ()=>MetricsPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/lib/store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function MetricsPanel() {
    _s();
    const { mergedData, loading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMarketStore"])();
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-red-950/20 border border-red-900/50 rounded-lg p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-red-400",
                children: [
                    "Error: ",
                    error
                ]
            }, void 0, true, {
                fileName: "[project]/dashboard/components/MetricsPanel.tsx",
                lineNumber: 11,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/dashboard/components/MetricsPanel.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this);
    }
    if (loading || !mergedData) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-3",
            children: [
                ...Array(7)
            ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gray-800 rounded-lg p-4 animate-pulse",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-4 bg-gray-700 rounded w-1/2 mb-2"
                        }, void 0, false, {
                            fileName: "[project]/dashboard/components/MetricsPanel.tsx",
                            lineNumber: 21,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-6 bg-gray-700 rounded w-3/4"
                        }, void 0, false, {
                            fileName: "[project]/dashboard/components/MetricsPanel.tsx",
                            lineNumber: 22,
                            columnNumber: 13
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/dashboard/components/MetricsPanel.tsx",
                    lineNumber: 20,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/dashboard/components/MetricsPanel.tsx",
            lineNumber: 18,
            columnNumber: 7
        }, this);
    }
    const metrics = [
        {
            label: 'Mark Price',
            value: `$${mergedData.markPrice.toFixed(2)}`,
            color: 'text-blue-400'
        },
        {
            label: 'Funding Rate (24h)',
            value: `${mergedData.fundingRatePct.toFixed(4)}%`,
            color: mergedData.fundingRatePct >= 0 ? 'text-green-400' : 'text-red-400'
        },
        {
            label: 'Open Interest',
            value: mergedData.openInterest.toLocaleString(undefined, {
                maximumFractionDigits: 2
            }),
            color: 'text-gray-300'
        },
        {
            label: 'Kamino Supply APR',
            value: `${mergedData.kaminoSupplyApr.toFixed(2)}%`,
            color: 'text-emerald-400'
        },
        {
            label: 'Kamino Borrow APR',
            value: `${mergedData.kaminoBorrowApr.toFixed(2)}%`,
            color: 'text-amber-400'
        },
        {
            label: 'Utilization',
            value: `${mergedData.kaminoUtilization.toFixed(2)}%`,
            color: 'text-purple-400'
        },
        {
            label: 'Carry APR (Borrow - Funding)',
            value: `${mergedData.combinedCarryApr.toFixed(2)}%`,
            color: mergedData.combinedCarryApr >= 0 ? 'text-green-400' : 'text-red-400'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: [
            metrics.map((metric)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 hover:border-gray-600/50 transition-colors",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs font-medium text-gray-400 uppercase tracking-wider mb-1",
                            children: metric.label
                        }, void 0, false, {
                            fileName: "[project]/dashboard/components/MetricsPanel.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `text-xl font-semibold ${metric.color}`,
                            children: metric.value
                        }, void 0, false, {
                            fileName: "[project]/dashboard/components/MetricsPanel.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this)
                    ]
                }, metric.label, true, {
                    fileName: "[project]/dashboard/components/MetricsPanel.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs text-gray-500 text-center mt-4",
                children: [
                    "Last updated: ",
                    new Date(mergedData.fetchedAt).toLocaleTimeString()
                ]
            }, void 0, true, {
                fileName: "[project]/dashboard/components/MetricsPanel.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/dashboard/components/MetricsPanel.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
_s(MetricsPanel, "LcUHXNKKd2g0ofGscGsJ7diGpUY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMarketStore"]
    ];
});
_c = MetricsPanel;
var _c;
__turbopack_context__.k.register(_c, "MetricsPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dashboard/components/ChartPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChartPanel",
    ()=>ChartPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$lightweight$2d$charts$40$5$2e$0$2e$9$2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/lightweight-charts@5.0.9/node_modules/lightweight-charts/dist/lightweight-charts.development.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/lib/store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function ChartPanel() {
    _s();
    const chartContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const chartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const seriesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { chartBars, selectedMetric, setSelectedMetric } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMarketStore"])();
    const metricOptions = [
        {
            key: 'supplyApr',
            label: 'Supply APR'
        },
        {
            key: 'borrowApr',
            label: 'Borrow APR'
        },
        {
            key: 'utilizationPct',
            label: 'Utilization %'
        }
    ];
    // Initialize chart
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChartPanel.useEffect": ()=>{
            if (!chartContainerRef.current || chartRef.current) return;
            const chart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$lightweight$2d$charts$40$5$2e$0$2e$9$2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChart"])(chartContainerRef.current, {
                layout: {
                    background: {
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$lightweight$2d$charts$40$5$2e$0$2e$9$2f$node_modules$2f$lightweight$2d$charts$2f$dist$2f$lightweight$2d$charts$2e$development$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColorType"].Solid,
                        color: '#111827'
                    },
                    textColor: '#9ca3af'
                },
                grid: {
                    vertLines: {
                        color: '#1f2937'
                    },
                    horzLines: {
                        color: '#1f2937'
                    }
                },
                width: chartContainerRef.current.clientWidth,
                height: 400,
                timeScale: {
                    timeVisible: true,
                    secondsVisible: false
                }
            });
            const lineSeries = chart.addLineSeries({
                color: '#3b82f6',
                lineWidth: 2
            });
            chartRef.current = chart;
            seriesRef.current = lineSeries;
            // Handle resize
            const handleResize = {
                "ChartPanel.useEffect.handleResize": ()=>{
                    if (chartContainerRef.current && chartRef.current) {
                        chartRef.current.applyOptions({
                            width: chartContainerRef.current.clientWidth
                        });
                    }
                }
            }["ChartPanel.useEffect.handleResize"];
            window.addEventListener('resize', handleResize);
            return ({
                "ChartPanel.useEffect": ()=>{
                    window.removeEventListener('resize', handleResize);
                    if (chartRef.current) {
                        chartRef.current.remove();
                        chartRef.current = null;
                        seriesRef.current = null;
                    }
                }
            })["ChartPanel.useEffect"];
        }
    }["ChartPanel.useEffect"], []);
    // Update chart data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChartPanel.useEffect": ()=>{
            if (!seriesRef.current || !chartBars.length) return;
            try {
                const data = chartBars.map({
                    "ChartPanel.useEffect.data": (bar)=>({
                            time: Math.floor(bar.time / 1000),
                            value: bar.close
                        })
                }["ChartPanel.useEffect.data"]);
                seriesRef.current.setData(data);
                // Fit content to view
                if (chartRef.current) {
                    chartRef.current.timeScale().fitContent();
                }
            } catch (error) {
                console.error('Error updating chart:', error);
            }
        }
    }["ChartPanel.useEffect"], [
        chartBars
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-gray-800/50 border border-gray-700/50 rounded-lg p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-semibold text-white",
                        children: "Historical Data"
                    }, void 0, false, {
                        fileName: "[project]/dashboard/components/ChartPanel.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: selectedMetric,
                        onChange: (e)=>setSelectedMetric(e.target.value),
                        className: "bg-gray-700 text-white text-sm rounded-lg px-3 py-2 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none",
                        children: metricOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: option.key,
                                children: option.label
                            }, option.key, false, {
                                fileName: "[project]/dashboard/components/ChartPanel.tsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/dashboard/components/ChartPanel.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/dashboard/components/ChartPanel.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: chartContainerRef,
                className: "w-full"
            }, void 0, false, {
                fileName: "[project]/dashboard/components/ChartPanel.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            chartBars.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center py-20 text-gray-400",
                children: "Loading chart data..."
            }, void 0, false, {
                fileName: "[project]/dashboard/components/ChartPanel.tsx",
                lineNumber: 111,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/dashboard/components/ChartPanel.tsx",
        lineNumber: 92,
        columnNumber: 5
    }, this);
}
_s(ChartPanel, "1Q6KKQ1b0yPChTAQ9y/MuXMo9VI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMarketStore"]
    ];
});
_c = ChartPanel;
var _c;
__turbopack_context__.k.register(_c, "ChartPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dashboard/components/HistoryTable.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HistoryTable",
    ()=>HistoryTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/lib/store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function HistoryTable() {
    _s();
    const { historyData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMarketStore"])();
    const displayData = historyData.slice(-10).reverse(); // Last 10 points, newest first
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-gray-800/50 border border-gray-700/50 rounded-lg p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-semibold text-white mb-4",
                children: "Recent History"
            }, void 0, false, {
                fileName: "[project]/dashboard/components/HistoryTable.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-x-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "text-left border-b border-gray-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "pb-3 text-gray-400 font-medium",
                                        children: "Time"
                                    }, void 0, false, {
                                        fileName: "[project]/dashboard/components/HistoryTable.tsx",
                                        lineNumber: 18,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "pb-3 text-gray-400 font-medium text-right",
                                        children: "Supply APR"
                                    }, void 0, false, {
                                        fileName: "[project]/dashboard/components/HistoryTable.tsx",
                                        lineNumber: 19,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "pb-3 text-gray-400 font-medium text-right",
                                        children: "Borrow APR"
                                    }, void 0, false, {
                                        fileName: "[project]/dashboard/components/HistoryTable.tsx",
                                        lineNumber: 20,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "pb-3 text-gray-400 font-medium text-right",
                                        children: "Utilization"
                                    }, void 0, false, {
                                        fileName: "[project]/dashboard/components/HistoryTable.tsx",
                                        lineNumber: 21,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/dashboard/components/HistoryTable.tsx",
                                lineNumber: 17,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/dashboard/components/HistoryTable.tsx",
                            lineNumber: 16,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: displayData.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    colSpan: 4,
                                    className: "py-8 text-center text-gray-400",
                                    children: "Loading history data..."
                                }, void 0, false, {
                                    fileName: "[project]/dashboard/components/HistoryTable.tsx",
                                    lineNumber: 27,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/dashboard/components/HistoryTable.tsx",
                                lineNumber: 26,
                                columnNumber: 15
                            }, this) : displayData.map((row, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: `border-b border-gray-800/50 ${index % 2 === 0 ? 'bg-gray-900/20' : ''}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "py-3 text-gray-300",
                                            children: new Date(row.timestampMs).toLocaleString()
                                        }, void 0, false, {
                                            fileName: "[project]/dashboard/components/HistoryTable.tsx",
                                            lineNumber: 39,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "py-3 text-right text-emerald-400",
                                            children: [
                                                (row.supplyApr || 0).toFixed(2),
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/dashboard/components/HistoryTable.tsx",
                                            lineNumber: 42,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "py-3 text-right text-amber-400",
                                            children: [
                                                (row.borrowApr || 0).toFixed(2),
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/dashboard/components/HistoryTable.tsx",
                                            lineNumber: 45,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "py-3 text-right text-purple-400",
                                            children: [
                                                (row.utilizationPct || 0).toFixed(2),
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/dashboard/components/HistoryTable.tsx",
                                            lineNumber: 48,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, row.timestampMs, true, {
                                    fileName: "[project]/dashboard/components/HistoryTable.tsx",
                                    lineNumber: 33,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/dashboard/components/HistoryTable.tsx",
                            lineNumber: 24,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/dashboard/components/HistoryTable.tsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/dashboard/components/HistoryTable.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/dashboard/components/HistoryTable.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_s(HistoryTable, "xmbVkTg2Pfh94waY7qhM8jyq01E=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMarketStore"]
    ];
});
_c = HistoryTable;
var _c;
__turbopack_context__.k.register(_c, "HistoryTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/dashboard/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$components$2f$MetricsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/components/MetricsPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$components$2f$ChartPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/components/ChartPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$components$2f$HistoryTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/components/HistoryTable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/lib/store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function Home() {
    _s();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { fetchMergedData, fetchHistoryData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMarketStore"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            setMounted(true);
        }
    }["Home.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            if (!mounted) return;
            // Initial fetch
            fetchMergedData();
            fetchHistoryData('supplyApr');
            // Set up polling
            const mergedInterval = setInterval(fetchMergedData, 60000); // 1 minute
            const historyInterval = setInterval({
                "Home.useEffect.historyInterval": ()=>fetchHistoryData('supplyApr')
            }["Home.useEffect.historyInterval"], 120000); // 2 minutes
            return ({
                "Home.useEffect": ()=>{
                    clearInterval(mergedInterval);
                    clearInterval(historyInterval);
                }
            })["Home.useEffect"];
        }
    }["Home.useEffect"], [
        mounted,
        fetchMergedData,
        fetchHistoryData
    ]);
    if (!mounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-900 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-white",
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/dashboard/app/page.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/dashboard/app/page.tsx",
            lineNumber: 36,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-900",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "border-b border-gray-800 bg-gray-950 px-6 py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold text-white",
                        children: "Drift × Kamino Dashboard"
                    }, void 0, false, {
                        fileName: "[project]/dashboard/app/page.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-400 mt-1",
                        children: "Real-time perpetuals and lending market data"
                    }, void 0, false, {
                        fileName: "[project]/dashboard/app/page.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/dashboard/app/page.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$components$2f$MetricsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MetricsPanel"], {}, void 0, false, {
                                    fileName: "[project]/dashboard/app/page.tsx",
                                    lineNumber: 55,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/dashboard/app/page.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$components$2f$ChartPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChartPanel"], {}, void 0, false, {
                                    fileName: "[project]/dashboard/app/page.tsx",
                                    lineNumber: 60,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/dashboard/app/page.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/dashboard/app/page.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$components$2f$HistoryTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HistoryTable"], {}, void 0, false, {
                            fileName: "[project]/dashboard/app/page.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/dashboard/app/page.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/dashboard/app/page.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/dashboard/app/page.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_s(Home, "LkLgjclUSJoPMSxd3fMXnLXGepI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMarketStore"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=dashboard_a74436b7._.js.map