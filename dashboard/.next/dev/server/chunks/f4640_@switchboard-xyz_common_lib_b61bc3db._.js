module.exports = [
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/big.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fromBN",
    ()=>fromBN,
    "fromBigint",
    ()=>fromBigint,
    "fromDecimal",
    ()=>fromDecimal,
    "max",
    ()=>max,
    "median",
    ()=>median,
    "min",
    ()=>min,
    "safeDiv",
    ()=>safeDiv,
    "safeMul",
    ()=>safeMul,
    "toDecimal",
    ()=>toDecimal,
    "variance",
    ()=>variance,
    "weightedAverage",
    ()=>weightedAverage,
    "weightedMedian",
    ()=>weightedMedian
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/big.js@6.2.2/node_modules/big.js/big.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bn.js@5.2.2/node_modules/bn.js/lib/bn.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$40$10$2e$6$2e$0$2f$node_modules$2f$decimal$2e$js$2f$decimal$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/decimal.js@10.6.0/node_modules/decimal.js/decimal.mjs [app-route] (ecmascript)");
;
;
;
function comparator(a, b) {
    if (a.gt(b)) return 1;
    if (a.lt(b)) return -1;
    return 0;
}
function median(results) {
    if (!(results === null || results === void 0 ? void 0 : results.length)) throw new Error('Cannot take median of empty array.');
    const arrSort = results.slice().sort(comparator);
    const mid = Math.ceil(arrSort.length / 2);
    if (arrSort.length % 2 === 0) {
        const addition = arrSort[mid].add(arrSort[mid - 1]);
        return safeDiv(addition, new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"](2.0));
    }
    return arrSort[mid - 1];
}
function weightedAverage(v1, w1, v2, w2) {
    return safeDiv(safeMul(v1, w1).add(safeMul(v2, w2)), w1.add(w2));
}
function weightedMedian(results) {
    if (!(results === null || results === void 0 ? void 0 : results.length)) throw new Error('Cannot take median of empty array.');
    for(let i = 0; i < results.length; ++i){
        if (results[i].weight === 0) {
            results[i].weight = 1;
        }
    }
    const arrSort = results.slice().sort((a, b)=>comparator(a.value, b.value));
    const halfWeight = arrSort.reduce((sum, { weight })=>weight + sum, 0) / 2;
    let i = 0;
    let w = 0;
    // get the index (i) and total weight (w) of item just above half
    for(; w < halfWeight; ++i){
        w = w + arrSort[i].weight;
    }
    // if it actually is exactly the half, we need to take the average
    if (w === halfWeight) {
        return weightedAverage(arrSort[i - 1].value, new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"](arrSort[i - 1].weight), arrSort[i].value, new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"](arrSort[i].weight));
    }
    // otherwise we return the value
    return arrSort[i - 1].value;
}
function min(results) {
    if (results.length === 0) {
        throw new Error('Cannot reduce empty array.');
    }
    return results.reduce((val, current)=>val.lt(current) ? val : current, results[0]);
}
function max(results) {
    if (results.length === 0) {
        throw new Error('Cannot reduce empty array.');
    }
    return results.reduce((val, current)=>val.gt(current) ? val : current, results[0]);
}
function variance(results) {
    if ((results === null || results === void 0 ? void 0 : results.length) === 0) {
        throw new Error('Cannot take variance of empty array');
    }
    const arrSort = results.slice().sort((n1, n2)=>n1.minus(n2).toNumber());
    const min = arrSort[0];
    const max = arrSort[arrSort.length - 1];
    return max.minus(min);
}
function safeDiv(number_, denominator, decimals = 20) {
    const oldDp = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"].DP;
    __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"].DP = decimals;
    const result = number_.div(denominator);
    __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"].DP = oldDp;
    return result;
}
function safeMul(...n) {
    if (n.length === 0) {
        throw new Error(`need to provide elements to multiply ${n}`);
    }
    let result = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"](1);
    for (const x of n){
        result = result.mul(x);
    }
    return result;
}
function fromBN(n, decimals = 0) {
    let mantissa = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](n, 10);
    let s = 1;
    const c = [];
    const ZERO = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](0, 10);
    const TEN = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](10, 10);
    if (mantissa.lt(ZERO)) {
        s = -1;
        mantissa = mantissa.abs();
    }
    while(mantissa.gt(ZERO)){
        c.unshift(mantissa.mod(TEN).toNumber());
        mantissa = mantissa.div(TEN);
    }
    const e = c.length - decimals - 1;
    const result = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"](0);
    if (c.length === 0) {
        return result;
    }
    result.s = s;
    result.c = c;
    result.e = e;
    return result;
}
function fromBigint(n) {
    const big = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"](n.toString(10));
    return big;
}
function toDecimal(big, decimals = 20) {
    const oldPrecision = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$40$10$2e$6$2e$0$2f$node_modules$2f$decimal$2e$js$2f$decimal$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Decimal"].precision;
    __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$40$10$2e$6$2e$0$2f$node_modules$2f$decimal$2e$js$2f$decimal$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Decimal"].set({
        precision: decimals
    });
    const decimal = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$40$10$2e$6$2e$0$2f$node_modules$2f$decimal$2e$js$2f$decimal$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Decimal"](big.toFixed(decimals, 0));
    __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$40$10$2e$6$2e$0$2f$node_modules$2f$decimal$2e$js$2f$decimal$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Decimal"].set({
        precision: oldPrecision
    });
    return decimal;
}
function fromDecimal(decimal, decimals = 20) {
    if (decimal.isNaN()) {
        throw new TypeError('cannot convert NaN decimal.js to Big.js');
    }
    if (!decimal.isFinite()) {
        throw new TypeError('cannot convert INF decimal.js to Big.js');
    }
    const big = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"](decimal.toFixed(decimals, 0));
    return big;
}
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/instructions.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IxFromHex",
    ()=>IxFromHex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$6$2e$0$2e$0$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bs58@6.0.0/node_modules/bs58/src/esm/index.js [app-route] (ecmascript)");
;
;
function IxFromHex(pullIx) {
    const keys = pullIx.keys.map((key)=>({
            ...key,
            pubkey: new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"](Buffer.from(key.pubkey, 'hex'))
        }));
    const programId = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"](__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$6$2e$0$2e$0$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].encode(Buffer.from(pullIx.programId, 'hex')));
    const data = Buffer.from(pullIx.data, 'hex');
    return new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TransactionInstruction"]({
        keys,
        programId,
        data
    });
}
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/string.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buf2String",
    ()=>buf2String,
    "decodeString",
    ()=>decodeString,
    "isBase58",
    ()=>isBase58,
    "isBase64",
    ()=>isBase64,
    "isBytes",
    ()=>isBytes,
    "isHex",
    ()=>isHex,
    "isKeypairString",
    ()=>isKeypairString,
    "parseMrEnclave",
    ()=>parseMrEnclave,
    "parseRawMrEnclave",
    ()=>parseRawMrEnclave,
    "toUtf8",
    ()=>toUtf8
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$6$2e$0$2e$0$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bs58@6.0.0/node_modules/bs58/src/esm/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/buffer [external] (buffer, cjs)");
;
;
const assertPositiveInteger = (int)=>{
    if (int && (!Number.isInteger(int) || int < 0)) {
        throw new Error('parameter expects a positive integer.');
    }
};
const buf2String = (buf)=>(__TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].isBuffer(buf) ? buf : __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(buf)).toString('utf8').split('\0').join('');
const toUtf8 = buf2String;
const isBase58 = (value)=>/^[A-HJ-NP-Za-km-z1-9]*$/.test(value);
const isBytes = (value, length)=>{
    assertPositiveInteger(length);
    const lengthPattern = length ? `{${length},}` : '*';
    const bytesRegexPattern = new RegExp(`^\\[\\s*(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)((\\s*,\\s*(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))${lengthPattern})?\\s*\\]$`);
    return bytesRegexPattern.test(value);
};
const isKeypairString = isBytes;
const isHex = (value, length)=>{
    assertPositiveInteger(length);
    const hexRegexPattern = length ? new RegExp(`^(0x|0X)?[a-fA-F0-9]{${length !== null && length !== void 0 ? length : 64}}`) : new RegExp('^(0x|0X)?[a-fA-F0-9]+$');
    return hexRegexPattern.test(value);
};
const isBase64 = (value, length)=>{
    assertPositiveInteger(length);
    const base64RegexPattern = length ? new RegExp(`^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4}){${length},}$`) : new RegExp('^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$');
    return base64RegexPattern.test(value);
};
const decodeString = (data)=>{
    const trimmed = data.trim();
    if (isBytes(trimmed)) {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(new Uint8Array(JSON.parse(trimmed)));
    } else if (isHex(trimmed)) {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(trimmed.toLowerCase().replace(/^0x/, ''), 'hex');
    } else if (isBase58(trimmed)) {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$6$2e$0$2e$0$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].decode(trimmed));
    } else if (isBase64(trimmed)) {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(trimmed, 'base64');
    }
    return undefined;
};
function parseMrEnclave(hexString) {
    if (!isHex(hexString, 64)) {
        throw new Error('Not a valid hex string representation of a MRENCLAVE measurement');
    }
    const myUint8Array = new Uint8Array(__TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(hexString.replaceAll(/0x|0X/g, ''), 'hex'));
    if (myUint8Array.byteLength !== 32) {
        throw new Error('Not a valid hex string representation of a MRENCLAVE measurement');
    }
    return myUint8Array;
}
function parseRawMrEnclave(rawBuffer, addMissingBytes = false) {
    let myUint8Array;
    if (typeof rawBuffer === 'string') {
        if (isBytes(rawBuffer, 32)) {
            // check if its a string of bytes '[1,2,3]'
            myUint8Array = new Uint8Array(JSON.parse(rawBuffer));
        } else if (isHex(rawBuffer, 64)) {
            // check if its a hex string '0x1A'
            myUint8Array = new Uint8Array(__TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(rawBuffer.replaceAll(/0x|0X/g, ''), 'hex'));
        } else if (isBase64(rawBuffer, 32)) {
            // check if its a base64 string
            myUint8Array = new Uint8Array(__TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(rawBuffer, 'base64'));
        } else {
            // assume utf-8
            myUint8Array = new Uint8Array(__TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(rawBuffer, 'utf-8'));
        }
    } else if (rawBuffer instanceof __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"]) {
        myUint8Array = new Uint8Array(rawBuffer);
    } else if (rawBuffer instanceof Uint8Array) {
        myUint8Array = rawBuffer;
    } else {
        // Assume input is number[]
        myUint8Array = new Uint8Array(rawBuffer);
    }
    if (addMissingBytes) {
        // make sure its always 32 bytes
        return new Uint8Array(Array.from(myUint8Array).concat(Array(32).fill(0)).slice(0, 32));
    }
    if (myUint8Array.byteLength !== 32) {
        throw new Error('Not a valid hex string representation of a MRENCLAVE measurement');
    }
    return myUint8Array;
}
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/async.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assertFulfilled",
    ()=>assertFulfilled,
    "promiseWithRetry",
    ()=>promiseWithRetry,
    "promiseWithTimeout",
    ()=>promiseWithTimeout,
    "sleep",
    ()=>sleep
]);
class TimeoutError extends Error {
    constructor(ms, msg){
        super(`TimeoutError: ${msg !== null && msg !== void 0 ? msg : TimeoutError.defaultMessage(ms)}`);
        this.ms = ms;
        this.name = 'TimeoutError';
        Object.setPrototypeOf(this, TimeoutError.prototype);
    }
}
TimeoutError.defaultMessage = (ms)=>`timed out after ${Math.round(ms / 1000).toFixed(3)} seconds`;
async function sleep(ms) {
    return new Promise((s)=>setTimeout(s, ms));
}
function assertFulfilled(item) {
    return item.status === 'fulfilled';
}
async function promiseWithTimeout(ms, promise, options = {}) {
    const { timeoutError, signal } = options;
    const cancelledError = new TimeoutError(ms, 'Operation cancelled');
    if (signal === null || signal === void 0 ? void 0 : signal.aborted) throw cancelledError;
    const promises = Array.isArray(promise) ? promise : [
        promise
    ];
    return new Promise((resolve, reject)=>{
        // Setup timeout timer
        const timeoutId = setTimeout(()=>reject(new TimeoutError(ms, timeoutError)), ms);
        if (typeof timeoutId.unref === 'function') timeoutId.unref();
        // Handle abort signal
        signal === null || signal === void 0 ? void 0 : signal.addEventListener('abort', ()=>{
            clearTimeout(timeoutId);
            reject(cancelledError);
        }, {
            once: true
        });
        // Race the promises
        Promise.race(promises).then((result)=>resolve(result)).catch((error)=>reject(error)).finally(()=>clearTimeout(timeoutId));
    });
}
const promiseWithRetry = (/** The async function to execute with retry logic */ fn, /** Maximum number of retry attempts */ attempts = 3, /** Base delay in milliseconds. Actual delay increases exponentially: (2^attempt * baseMs) */ backoffMs = 150, /** The type of backoff to use */ backoffType = 'exponential')=>{
    const _internalPromiseWithRetry = async (attempt)=>await Promise.resolve().then(fn).catch(async (error)=>{
            if (attempt >= attempts) throw error;
            const backoffMultiplier = backoffType === 'exponential' ? Math.pow(2, attempt) : attempt;
            await sleep(backoffMultiplier * backoffMs);
            return _internalPromiseWithRetry(attempt + 1);
        });
    return _internalPromiseWithRetry(0);
};
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/non-empty-array.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "safeValidate",
    ()=>safeValidate,
    "validate",
    ()=>validate
]);
class NonEmptyArrayError extends Error {
    constructor(message){
        super(`NonEmptyArrayError: ${message}`);
        this.name = 'NonEmptyArrayError';
        Object.setPrototypeOf(this, NonEmptyArrayError.prototype);
    }
}
function safeValidate(results) {
    return Array.isArray(results) && results.length > 0;
}
function validate(results) {
    if (safeValidate(results)) return results;
    throw new NonEmptyArrayError('array is empty');
}
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/non-empty-array.js [app-route] (ecmascript) <export * as NonEmptyArrayUtils>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NonEmptyArrayUtils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$non$2d$empty$2d$array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$non$2d$empty$2d$array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/non-empty-array.js [app-route] (ecmascript)");
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/big.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "compare",
    ()=>compare,
    "max",
    ()=>max,
    "median",
    ()=>median,
    "min",
    ()=>min,
    "safeDiv",
    ()=>safeDiv,
    "sort",
    ()=>sort,
    "variance",
    ()=>variance
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$non$2d$empty$2d$array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__NonEmptyArrayUtils$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/non-empty-array.js [app-route] (ecmascript) <export * as NonEmptyArrayUtils>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/big.js@6.2.2/node_modules/big.js/big.mjs [app-route] (ecmascript)");
;
;
function compare(a, b) {
    return a.cmp(b);
}
function min(data) {
    __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$non$2d$empty$2d$array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__NonEmptyArrayUtils$3e$__["NonEmptyArrayUtils"].validate(data);
    return data.reduce((val, current)=>val.lt(current) ? val : current);
}
function max(data) {
    __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$non$2d$empty$2d$array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__NonEmptyArrayUtils$3e$__["NonEmptyArrayUtils"].validate(data);
    return data.reduce((val, current)=>val.gt(current) ? val : current);
}
function sort(data) {
    return data.slice().sort(compare);
}
function variance(data) {
    __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$non$2d$empty$2d$array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__NonEmptyArrayUtils$3e$__["NonEmptyArrayUtils"].validate(data);
    return max(data).minus(min(data));
}
function median(data) {
    __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$non$2d$empty$2d$array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__NonEmptyArrayUtils$3e$__["NonEmptyArrayUtils"].validate(data);
    const sorted = sort(data);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? safeDiv(sorted[mid - 1].add(sorted[mid]), 2) : sorted[mid];
}
function safeDiv(value, dividend, decimals = 20) {
    const oldDp = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"].DP;
    __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"].DP = decimals;
    const result = value.div(dividend);
    __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"].DP = oldDp;
    return result;
}
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/date.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BNtoDateTimeString",
    ()=>BNtoDateTimeString,
    "toDateTimeString",
    ()=>toDateTimeString
]);
const padTime = (number_)=>number_.toString().padStart(2, '0');
function toDateTimeString(d) {
    if (d) return `${d.getFullYear()}-${padTime(d.getMonth() + 1)}-${padTime(d.getDate())} ${padTime(d.getHours())}:${padTime(d.getMinutes())}:${padTime(d.getSeconds())} L`;
    return '';
}
function BNtoDateTimeString(ts) {
    try {
        return toDateTimeString(new Date(ts.toNumber() * 1000));
    } catch  {
        return 'N/A';
    }
}
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/json.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "jsonReplacers",
    ()=>jsonReplacers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$SwitchboardDecimal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/SwitchboardDecimal.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/string.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/big.js@6.2.2/node_modules/big.js/big.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bn.js@5.2.2/node_modules/bn.js/lib/bn.js [app-route] (ecmascript)");
;
;
;
;
function big2NumberOrString(big) {
    const oldStrict = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"].strict;
    __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"].strict = true;
    try {
        const num = big.toNumber();
        __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"].strict = oldStrict;
        return num;
    } catch  {} // eslint-disable-line no-empty
    __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"].strict = oldStrict;
    return big.toString();
}
function jsonReplacers(key, value) {
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        return value;
    }
    // bigint
    if (typeof value === 'bigint') {
        return value.toString();
    }
    // BN
    if (__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].isBN(value)) {
        return value.toNumber();
    }
    // name and metadata replacers
    if (key === 'name' || key === 'metadata') {
        if (value instanceof Uint8Array || Buffer.isBuffer(value)) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buf2String"])(value);
        }
    }
    // Switchboard Decimal
    if (value instanceof __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$SwitchboardDecimal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SwitchboardDecimal"] || value && typeof value === 'object' && 'mantissa' in value && 'scale' in value) {
        const swbDecimal = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$SwitchboardDecimal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SwitchboardDecimal"](value.mantissa, value.scale);
        return big2NumberOrString(swbDecimal.toBig());
    }
    // big.js
    if (value instanceof __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"]) {
        return big2NumberOrString(value);
    }
    // pubkey
    if ('toBase58' in value && typeof value.toBase58 === 'function') {
        return value.toBase58();
    }
    // toString
    if ('toString' in value && typeof value.toString === 'function') {
        return value.toString();
    }
    // Fall through for nested objects
    return value;
}
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/networks.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSupportedChain",
    ()=>getSupportedChain,
    "getSupportedNetwork",
    ()=>getSupportedNetwork,
    "isSwitchboardLabsQueue",
    ()=>isSwitchboardLabsQueue,
    "validateSupportedChain",
    ()=>validateSupportedChain
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/types.js [app-route] (ecmascript)");
;
;
;
const validateSupportedChain = (_chain)=>{
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isSupportedChain"])(_chain)) {
        const supportedChainsString = `'${__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_CHAINS"].slice(0, -1).join("', '")}', or '${__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_CHAINS"][__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_CHAINS"].length - 1]}'`;
        throw new Error(`chain ${_chain} is not supported, the currently supported chains are ${supportedChainsString}`);
    }
    return _chain;
};
const getSupportedChain = (_chain)=>{
    const chain = validateSupportedChain(_chain);
    return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"][chain];
};
const getSupportedNetwork = (_chain, _network)=>{
    const chain = validateSupportedChain(_chain);
    const chainConfig = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"][chain];
    if (chain === 'solana') {
        if (_network !== 'mainnet' && _network !== 'devnet') {
            throw new Error("UnsupportedNetwork: network needs to be 'mainnet' or 'devnet'");
        }
        return chainConfig[_network];
    }
    if (chain === 'starknet') {
        const supported = new Set([
            'goerli',
            'sepolia',
            'mainnet'
        ]);
        if (supported.has(_network)) {
            const starknetNetwork = _network;
            return chainConfig[starknetNetwork];
        }
        throw new Error(`UnsupportedNetwork: '${_network}'`);
    }
    if (_network !== 'mainnet' && _network !== 'testnet' && _network !== 'sepolia') {
        throw new Error("UnsupportedNetwork: network needs to be 'mainnet', 'sepolia', or 'testnet'");
    }
    return chainConfig[_network];
};
const isSwitchboardLabsQueue = (_chain, _network, _queue)=>{
    try {
        const networkConfig = getSupportedNetwork(_chain, _network);
        for (const queue of networkConfig.queues){
            if (queue.address === _queue) return true;
        }
    } catch  {} // eslint-disable-line no-empty
    return false;
};
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/number.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "max",
    ()=>max,
    "median",
    ()=>median,
    "min",
    ()=>min
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$non$2d$empty$2d$array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__NonEmptyArrayUtils$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/non-empty-array.js [app-route] (ecmascript) <export * as NonEmptyArrayUtils>");
;
function min(data) {
    __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$non$2d$empty$2d$array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__NonEmptyArrayUtils$3e$__["NonEmptyArrayUtils"].validate(data);
    return Math.min(...data);
}
function max(data) {
    __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$non$2d$empty$2d$array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__NonEmptyArrayUtils$3e$__["NonEmptyArrayUtils"].validate(data);
    return Math.max(...data);
}
function median(data) {
    __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$non$2d$empty$2d$array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__NonEmptyArrayUtils$3e$__["NonEmptyArrayUtils"].validate(data);
    const sortedNumbers = data.slice().sort((a, b)=>a - b);
    const midIndex = Math.floor(sortedNumbers.length / 2);
    return sortedNumbers.length % 2 === 0 ? (sortedNumbers[midIndex - 1] + sortedNumbers[midIndex]) / 2 : sortedNumbers[midIndex];
}
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/oracle-job.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deserializeOracleJob",
    ()=>deserializeOracleJob,
    "normalizeOracleJob",
    ()=>normalizeOracleJob,
    "serializeOracleJob",
    ()=>serializeOracleJob
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$protos$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/protos.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$non$2d$empty$2d$array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__NonEmptyArrayUtils$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/non-empty-array.js [app-route] (ecmascript) <export * as NonEmptyArrayUtils>");
var __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/buffer [external] (buffer, cjs)");
;
;
;
class OracleJobError extends Error {
    constructor(message){
        super(message);
        this.name = 'OracleJobError';
        Object.setPrototypeOf(this, OracleJobError.prototype);
    }
}
function normalizeOracleJob(data) {
    const parseJobObject = (jobData)=>{
        if (!jobData) {
            throw new OracleJobError(`No job data provided: ${jobData}`);
        } else if (!('tasks' in jobData)) {
            throw new OracleJobError('"tasks" property is required');
        } else if (!__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$non$2d$empty$2d$array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__NonEmptyArrayUtils$3e$__["NonEmptyArrayUtils"].safeValidate(jobData.tasks)) {
            throw new OracleJobError('"tasks" property must be a non-empty array');
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$protos$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OracleJob"].fromObject(jobData);
    };
    const parseJobString = (jobString)=>{
        // Strip comments using regex from https://regex101.com/r/B8WkuX/1
        const cleanJson = jobString.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/g, '');
        return parseJobObject(JSON.parse(cleanJson));
    };
    return typeof data === 'string' ? parseJobString(data) : parseJobObject(data);
}
function serializeOracleJob(data) {
    const job = normalizeOracleJob(data);
    return __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$protos$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OracleJob"].encodeDelimited(job).finish());
}
function deserializeOracleJob(data) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$protos$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OracleJob"].decodeDelimited(data);
}
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$async$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/async.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$big$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/big.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$date$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/date.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/json.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$networks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/networks.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$non$2d$empty$2d$array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/non-empty-array.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$number$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/number.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$oracle$2d$job$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/oracle-job.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/string.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AsyncUtils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$async$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    "BNtoDateTimeString",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$date$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BNtoDateTimeString"],
    "BigUtils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$big$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    "NonEmptyArrayUtils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$non$2d$empty$2d$array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    "NumberUtils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$number$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    "OracleJobUtils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$oracle$2d$job$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    "buf2String",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buf2String"],
    "decodeString",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeString"],
    "getSupportedChain",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$networks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSupportedChain"],
    "getSupportedNetwork",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$networks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSupportedNetwork"],
    "isBase58",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isBase58"],
    "isBase64",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isBase64"],
    "isBytes",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isBytes"],
    "isHex",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isHex"],
    "isKeypairString",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isKeypairString"],
    "isSwitchboardLabsQueue",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$networks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSwitchboardLabsQueue"],
    "jsonReplacers",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonReplacers"],
    "parseMrEnclave",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseMrEnclave"],
    "parseRawMrEnclave",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseRawMrEnclave"],
    "toDateTimeString",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$date$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toDateTimeString"],
    "toUtf8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toUtf8"],
    "validateSupportedChain",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$networks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateSupportedChain"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$async$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/async.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$big$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/big.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$date$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/date.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/json.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$networks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/networks.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$non$2d$empty$2d$array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/non-empty-array.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$number$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/number.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$oracle$2d$job$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/oracle-job.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/string.js [app-route] (ecmascript)");
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/CrossbarClient.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CrossbarClient",
    ()=>CrossbarClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$instructions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/instructions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/string.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/axios@1.13.2/node_modules/axios/lib/axios.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$6$2e$0$2e$0$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bs58@6.0.0/node_modules/bs58/src/esm/index.js [app-route] (ecmascript)");
;
;
;
;
class CrossbarClient {
    static default(verbose) {
        return new CrossbarClient('https://crossbar.switchboard.xyz', verbose);
    }
    constructor(crossbarUrl, verbose){
        // feed hash -> crossbar response
        this.feedCache = new Map();
        this.crossbarUrl = new URL(crossbarUrl).origin;
        this.verbose = !!verbose;
    }
    /**
     * GET /fetch/:feedHash
     * Fetch data from the crossbar using the provided feedHash
     * @param {string} feedHash - The hash of the feed to fetch data for
     * @returns {Promise<{feedHash: string; queueHex: string; jobs: IOracleJob[];}} - The data fetched from the crossbar
     */ async fetch(feedHash) {
        try {
            // Check if the feedHash is already in the cache
            const cached = this.feedCache.get(feedHash);
            if (cached) return cached;
            // Fetch the data from the crossbar
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].get(`${this.crossbarUrl}/fetch/${feedHash}`).then((resp)=>resp.data);
            // Cache the response on the crossbar instance
            this.feedCache.set(feedHash, response);
            return response;
        } catch (err) {
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].isAxiosError(err)) throw err;
            const response = err.response;
            if (!response) throw err;
            // If response is outside of the 200 range, log the status and throw an error.
            if (this.verbose) console.error(`${response.status}: ${response.data}`);
            throw new Error(`Bad Crossbar fetch status: ${response.status}`);
        }
    }
    /**
     * POST /store
     * Store oracle jobs on the crossbar, associated with a queue address
     * @param {string} queueAddress - The address of the queue
     * @param {IOracleJob[]} jobs - The oracle jobs to store
     * @returns {Promise<{ cid: string; feedHash: string; queueHex: string }>} - The stored data information
     */ async store(queueAddress, jobs) {
        try {
            // Try to decode the queueAddress to a Buffer so that we can send it in the expected format,
            // base58, to the Crossbar node.
            const queue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeString"])(queueAddress);
            if (!queue) throw new Error(`Unable to parse queue: ${queueAddress}`);
            return await __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].post(`${this.crossbarUrl}/store`, {
                queue: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$6$2e$0$2e$0$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].encode(queue),
                jobs
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((resp)=>{
                if (resp.status === 200) return resp.data;
                throw new Error(`Bad Crossbar store response: ${resp.status}`);
            });
        } catch (err) {
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].isAxiosError(err)) throw err;
            const response = err.response;
            if (!response) throw err;
            if (this.verbose) console.error(`${response.status}: ${response.data}`);
            throw new Error(`Bad Crossbar store response: ${response.status}`);
        }
    }
    /**
     * GET /simulate/:feedHashes
     * Simulate fetching feed results from the crossbar using feed hashes
     * @param {string[]} feedHashes - The hashes of the feeds to simulate
     * @param {boolean} [includeReceipts] - Whether to include receipts in the response
     * @returns {Promise<CrossbarSimulateResponse[]>} - The simulated feed results
     */ async simulateFeeds(feedHashes, includeReceipts) {
        try {
            if (!feedHashes || feedHashes.length === 0) throw new Error('At least one feed is required');
            const feedsParam = feedHashes.join(',');
            return await __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].get(`${this.crossbarUrl}/simulate/${feedsParam}`, {
                params: {
                    includeReceipts
                }
            }).then((resp)=>resp.data);
        } catch (err) {
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].isAxiosError(err)) throw err;
            const response = err.response;
            if (!response) throw err;
            if (this.verbose) console.error(`${response.status}: ${response.data}`);
            throw new Error(`Bad Crossbar simulateFeed response: ${response.status}`);
        }
    }
    /**
     * GET /updates/solana/:network/:feedpubkeys
     * Fetch updates for Solana network feeds from the crossbar
     * @param {string} network - The Solana network to fetch updates for
     * @param {string[]} feedpubkeys - The public keys of the feeds to fetch updates for
     * @param {number} [numSignatures] - The number of signatures to fetch (optional)
     * @returns {Promise<{ success: boolean; pullIx: TransactionInstruction; responses: { oracle: string; result: number | null; errors: string }[]; lookupTables: string[] }[]>} - The updates for the specified feeds
     */ async fetchSolanaUpdates(network, feedpubkeys, numSignatures) {
        try {
            if (!network) throw new Error('Network is required');
            if (!feedpubkeys || feedpubkeys.length === 0) throw new Error('At least one feed is required');
            const feedsParam = feedpubkeys.join(',');
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].get(`${this.crossbarUrl}/updates/solana/${network}/${feedsParam}`, {
                params: {
                    numSignatures
                }
            }).then((resp)=>resp.data);
            // Convert pullIx from hex to TransactionInstruction using IxFromHex
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const updates = response.map((update)=>({
                    ...update,
                    pullIx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$instructions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IxFromHex"])(update.pullIx)
                }));
            return updates;
        } catch (err) {
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].isAxiosError(err)) throw err;
            const response = err.response;
            if (!response) throw err;
            if (this.verbose) console.error(`${response.status}: ${response.data}`);
            throw new Error(`Bad Crossbar fetchSolanaUpdates response: ${response.status}`);
        }
    }
    /**
     * GET /simulate/solana/:network/:feedpubkeys
     * Simulate fetching Solana feed results from the crossbar
     * @param {string} network - The Solana network to simulate
     * @param {string[]} feedpubkeys - The public keys of the feeds to simulate
     * @returns {Promise<{ feed: string; feedHash: string; results: number[] }[]>} - The simulated feed results
     */ async simulateSolanaFeeds(network, feedpubkeys) {
        try {
            if (!network) throw new Error('Network is required');
            if (!feedpubkeys || feedpubkeys.length === 0) throw new Error('At least one feed is required');
            const feedsParam = feedpubkeys.join(',');
            return await __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].get(`${this.crossbarUrl}/simulate/solana/${network}/${feedsParam}`).then((resp)=>resp.data);
        } catch (err) {
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].isAxiosError(err)) throw err;
            const response = err.response;
            if (!response) throw err;
            if (this.verbose) console.error(`${response.status}: ${response.data}`);
            throw new Error(`Bad Crossbar simulateSolanaFeeds response: ${response.status}`);
        }
    }
    /**
     * GET /updates/evm/:chainId/:aggregatorIds
     * Fetch updates for EVM network feeds from the crossbar
     * @param param0 - The chain ID and aggregator IDs to fetch updates for
     * @returns Promise<{ results: EVMResult[]; encoded: string[] }> - The updates for the specified feeds
     */ async fetchEVMResults({ chainId, aggregatorIds }) {
        try {
            if (!chainId) throw new Error('Chain ID is required');
            if (!aggregatorIds || aggregatorIds.length === 0) throw new Error('At least one feed is required');
            const feedsParam = aggregatorIds.join(',');
            return await __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].get(`${this.crossbarUrl}/updates/evm/${chainId}/${feedsParam}`).then((resp)=>resp.data);
        } catch (err) {
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].isAxiosError(err)) throw err;
            const response = err.response;
            if (!response) throw err;
            if (this.verbose) console.error(`${response.status}: ${response.data}`);
            throw new Error(`Bad Crossbar fetchEVMUpdates response: ${response.status}`);
        }
    }
    /**
     * GET /simulate/evm/:network/:aggregatorIds
     * Simulate fetching Solana feed results from the crossbar
     * @param {string} network - The Solana network to simulate
     * @param {string[]} aggregatorIds - The public keys of the feeds to simulate
     * @returns {Promise<{ feed: string; feedHash: string; results: number[] }[]>} - The simulated feed results
     */ async simulateEVMFeeds(network, aggregatorIds) {
        try {
            if (!network) throw new Error('Network is required');
            if (!aggregatorIds || aggregatorIds.length === 0) throw new Error('At least one feed is required');
            const feedsParam = aggregatorIds.join(',');
            return await __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].get(`${this.crossbarUrl}/simulate/evm/${network}/${feedsParam}`).then((resp)=>resp.data);
        } catch (err) {
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].isAxiosError(err)) throw err;
            const response = err.response;
            if (!response) throw err;
            if (this.verbose) console.error(`${response.status}: ${response.data}`);
            throw new Error(`Bad Crossbar simulateEVMFeeds response: ${response.status}`);
        }
    }
    /**
     * GET /randomness/evm/:chainId/:randomnessId
     * @param param0 - The chain ID and randomness ID to resolve
     */ async resolveEVMRandomness({ chainId, randomnessId }) {
        try {
            return await __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].get(`${this.crossbarUrl}/randomness/evm/${chainId}/${randomnessId}`).then((resp)=>resp.data);
        } catch (err) {
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].isAxiosError(err)) throw err;
            const response = err.response;
            if (!response) throw err;
            if (this.verbose) console.error(`${response.status}: ${response.data}`);
            throw new Error(`Bad Crossbar resolveEVMRandomness response: ${response.status}`);
        }
    }
}
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/protos.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OracleJob",
    ()=>OracleJob,
    "Task",
    ()=>Task
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$protobufjs$40$7$2e$5$2e$4$2f$node_modules$2f$protobufjs$2f$minimal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/protobufjs@7.5.4/node_modules/protobufjs/minimal.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$protos$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/protos/index.js [app-route] (ecmascript)");
;
__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$protobufjs$40$7$2e$5$2e$4$2f$node_modules$2f$protobufjs$2f$minimal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].util.toJSONOptions = {
    longs: String,
    enums: String,
    bytes: String,
    json: true
};
;
var OracleJob = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$protos$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["oracle_job"].OracleJob;
var Task = OracleJob.Task;
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/FeedHash.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FeedHash",
    ()=>FeedHash
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$protos$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/protos.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/buffer [external] (buffer, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$js$2d$sha256$40$0$2e$11$2e$1$2f$node_modules$2f$js$2d$sha256$2f$src$2f$sha256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/js-sha256@0.11.1/node_modules/js-sha256/src/sha256.js [app-route] (ecmascript)");
;
;
;
class FeedHash {
    /**
     *  Disable object instantiation.
     */ constructor(){}
    /**
     *  Validate that a provided string is indeed a valid feed hash.
     *
     *  To be a valid feed hash, the string should be a hex string that is 64 characters in length.
     *
     *  @returns the transformed feed hash (hex value) if valid.
     */ static validate(feedHash) {
        // Make the feed hash lower case and remove the optional '0x' prefix if necessary.
        const transformed = (()=>{
            const lowerCase = feedHash.toLowerCase();
            return lowerCase.startsWith('0x') ? lowerCase.substring(2) : lowerCase;
        })();
        // Validate that the result is 64 characters long and lower-case hex.
        if (/^[a-f0-9]{64}$/.test(transformed)) return transformed;
        throw new Error(`FeedHash.validate failed: ${feedHash}`);
    }
    /**
     *  After validating {@linkcode feedHash}, return it as a {@linkcode Buffer}.
     *
     *  @returns Buffer
     */ static serialize(feedHash) {
        const validated = FeedHash.validate(feedHash);
        return __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(validated, 'hex');
    }
    /**
     *  Given a feed definition (a list of jobs), produce the associated feed hash and return it as a
     *  buffer.
     */ static compute(queue, jobs) {
        const hasher = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$js$2d$sha256$40$0$2e$11$2e$1$2f$node_modules$2f$js$2d$sha256$2f$src$2f$sha256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha256"].create();
        hasher.update(queue);
        jobs.forEach((job)=>{
            hasher.update(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$protos$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OracleJob"].encodeDelimited(job).finish());
        });
        return __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(hasher.digest());
    }
    /**
     *  Validate that {@linkcode feedHash} is ok and try to fetch a verified feed definition for it.
     *
     *  @returns VerifiedFeed
     *  @throws If {@linkcode feedHash} is invalid or if there is no associated verified feed data.
     */ static async fetchVerified(feedHash) {
        const validated = FeedHash.validate(feedHash);
        if (!validated) throw new Error('`feedHash` parameter is invalid.');
        // TODO: implement this function when we have a centralized place to load verified feeds from.
        throw new Error('NotImplemented');
    }
}
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/aptos.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SWITCHBOARD_APTOS_CONFIG",
    ()=>SWITCHBOARD_APTOS_CONFIG,
    "SWITCHBOARD_APTOS_MAINNET_CONFIG",
    ()=>SWITCHBOARD_APTOS_MAINNET_CONFIG,
    "SWITCHBOARD_APTOS_TESTNET_CONFIG",
    ()=>SWITCHBOARD_APTOS_TESTNET_CONFIG
]);
const SWITCHBOARD_APTOS_MAINNET_CONFIG = {
    chain: 'aptos',
    networkName: 'Mainnet',
    address: '0x7d7e436f0b2aafde60774efb26ccc432cf881b677aca7faaf2a01879bd19fb8',
    metadata: {
        defaultRpcUrl: 'https://fullnode.mainnet.aptoslabs.com/v1',
        defaultExplorer: 'https://explorer.aptoslabs.com/?network=mainnet',
        chainId: 1
    },
    queues: [
        {
            name: 'Permissioned Queue',
            address: '0x11fbd91e4a718066891f37958f0b68d10e720f2edf8d57854fb20c299a119a8c',
            crankAddress: '0xbc9576fedda51d33e8129b5f122ef4707c2079dfb11cd836e86adcb168cbd473',
            permissioned: true
        },
        {
            name: 'Permissionless Queue',
            address: '0xc887072e37f17f9cc7afc0a00e2b283775d703c610acca3997cb26e74bc53f3b',
            crankAddress: '0x7d5ced8797f212c2eeb36486d5e5f30c1043530a340fe9debf4fc958559f3ec4',
            permissioned: false
        }
    ],
    attestationQueues: []
};
const SWITCHBOARD_APTOS_TESTNET_CONFIG = {
    chain: 'aptos',
    networkName: 'Testnet',
    address: '0xb91d3fef0eeb4e685dc85e739c7d3e2968784945be4424e92e2f86e2418bf271',
    metadata: {
        defaultRpcUrl: 'https://fullnode.testnet.aptoslabs.com/v1',
        defaultExplorer: 'https://explorer.aptoslabs.com/?network=testnet',
        chainId: 2
    },
    queues: [
        {
            name: 'Permissionless Queue',
            address: '0x9190d0fad0520ef650caa1ef8bd89da660d6eb617feabd618039b9c6bf11e802',
            crankAddress: '0xd08a5107feb5f2df15c913702b0969ae4e22b3653a98c14fcd5e9e00cf8a039d',
            permissioned: false
        }
    ],
    attestationQueues: []
};
const SWITCHBOARD_APTOS_CONFIG = {
    mainnet: SWITCHBOARD_APTOS_MAINNET_CONFIG,
    testnet: SWITCHBOARD_APTOS_TESTNET_CONFIG
};
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/arbitrum.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SWITCHBOARD_ARBITRUM_CONFIG",
    ()=>SWITCHBOARD_ARBITRUM_CONFIG,
    "SWITCHBOARD_ARBITRUM_MAINNET_CONFIG",
    ()=>SWITCHBOARD_ARBITRUM_MAINNET_CONFIG,
    "SWITCHBOARD_ARBITRUM_SEPOLIA_CONFIG",
    ()=>SWITCHBOARD_ARBITRUM_SEPOLIA_CONFIG,
    "SWITCHBOARD_ARBITRUM_TESTNET_CONFIG",
    ()=>SWITCHBOARD_ARBITRUM_TESTNET_CONFIG
]);
const SWITCHBOARD_ARBITRUM_MAINNET_CONFIG = {
    chain: 'arbitrum',
    chainId: 42161,
    networkName: 'Mainnet',
    address: '0xE30582eBD4A678065a61975Da113bD2e7aE38679',
    sbPushOracle: '0xD33F9a409bF48f9aFb8f5c70C949AF8E8E11449F',
    metadata: {
        defaultRpcUrl: 'https://arb1.arbitrum.io/rpc',
        defaultExplorer: 'https://arbiscan.io'
    },
    queues: [],
    attestationQueues: [
        {
            name: 'SwitchboardLabs Attestation Queue',
            address: '0x2D3385BFF20b3EEBA91caEA535569F2dc55c2980'
        }
    ]
};
const SWITCHBOARD_ARBITRUM_TESTNET_CONFIG = {
    chain: 'arbitrum',
    chainId: 421613,
    networkName: 'Goerli',
    address: '0xA3c9F9F6E40282e1366bdC01C1D30F7F7F58888e',
    sbPushOracle: '0xDf8bed962Af2EA8E61F57B35294436dCc3eF80dd',
    metadata: {
        defaultRpcUrl: 'https://goerli-rollup.arbitrum.io/rpc',
        defaultExplorer: 'https://goerli.arbiscan.io'
    },
    queues: [],
    attestationQueues: [
        {
            name: 'SwitchboardLabs Attestation Queue',
            address: '0x54f8A91bE5baAD3E2368b00A11bF4012EA6b031F'
        }
    ]
};
const SWITCHBOARD_ARBITRUM_SEPOLIA_CONFIG = {
    chain: 'arbitrum',
    chainId: 421614,
    networkName: 'Sepolia',
    address: '0x0d251E9F64Fb3a146af61bB99d80471893b20cCF',
    sbPushOracle: '0xf680EcD48f257795070A655979f23E3fd3e9c635',
    metadata: {
        defaultRpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc',
        defaultExplorer: 'https://sepolia.arbiscan.io'
    },
    queues: [],
    attestationQueues: [
        {
            name: 'SwitchboardLabs Attestation Queue',
            address: '0x3e84bb41e96F90A93D0Ce930e75Cf47a2b262Ace'
        }
    ]
};
const SWITCHBOARD_ARBITRUM_CONFIG = {
    mainnet: SWITCHBOARD_ARBITRUM_MAINNET_CONFIG,
    testnet: SWITCHBOARD_ARBITRUM_TESTNET_CONFIG,
    sepolia: SWITCHBOARD_ARBITRUM_SEPOLIA_CONFIG
};
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/aurora.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SWITCHBOARD_AURORA_CONFIG",
    ()=>SWITCHBOARD_AURORA_CONFIG,
    "SWITCHBOARD_AURORA_MAINNET_CONFIG",
    ()=>SWITCHBOARD_AURORA_MAINNET_CONFIG,
    "SWITCHBOARD_AURORA_TESTNET_CONFIG",
    ()=>SWITCHBOARD_AURORA_TESTNET_CONFIG
]);
const SWITCHBOARD_AURORA_MAINNET_CONFIG = {
    chain: 'aurora',
    chainId: 1313161554,
    networkName: 'Mainnet',
    address: '0x6E7dabEF37A8Da80b111344dB41b223F24eAA903',
    sbPushOracle: '0x49a19751978F36c133D9cE26e61fab9795b5826B',
    metadata: {
        defaultRpcUrl: 'https://mainnet.aurora.dev',
        defaultExplorer: 'https://aurorascan.dev'
    },
    queues: [],
    attestationQueues: [
        {
            name: 'SwitchboardLabs Attestation Queue',
            address: ''
        }
    ]
};
const SWITCHBOARD_AURORA_TESTNET_CONFIG = {
    chain: 'aurora',
    chainId: 1313161555,
    networkName: 'Testnet',
    address: '0x7d05d5745499D8cc68FA4Eb5dbd45df53E9c3f1f',
    sbPushOracle: '0xc9d804F1e904cA0912D46E0C02600f75563A4988',
    metadata: {
        defaultRpcUrl: 'https://testnet.aurora.dev',
        defaultExplorer: 'https://testnet.aurorascan.dev'
    },
    queues: [],
    attestationQueues: [
        {
            name: 'SwitchboardLabs Attestation Queue',
            address: '0x455c706AF00af9fCFDA04746Be34c3051aAAD1d4'
        }
    ]
};
const SWITCHBOARD_AURORA_CONFIG = {
    mainnet: SWITCHBOARD_AURORA_MAINNET_CONFIG,
    testnet: SWITCHBOARD_AURORA_TESTNET_CONFIG
};
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/base.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SWITCHBOARD_BASE_CONFIG",
    ()=>SWITCHBOARD_BASE_CONFIG,
    "SWITCHBOARD_BASE_MAINNET_CONFIG",
    ()=>SWITCHBOARD_BASE_MAINNET_CONFIG,
    "SWITCHBOARD_BASE_TESTNET_CONFIG",
    ()=>SWITCHBOARD_BASE_TESTNET_CONFIG
]);
const SWITCHBOARD_BASE_MAINNET_CONFIG = {
    chain: 'base',
    chainId: 8453,
    networkName: 'Mainnet',
    address: '',
    sbPushOracle: '',
    metadata: {
        defaultRpcUrl: 'https://mainnet.base.org',
        defaultExplorer: 'https://basescan.org'
    },
    queues: [],
    attestationQueues: [
        {
            name: 'SwitchboardLabs Attestation Queue',
            address: ''
        }
    ]
};
const SWITCHBOARD_BASE_TESTNET_CONFIG = {
    chain: 'base',
    chainId: 84531,
    networkName: 'Goerli',
    address: '0x9640b33Ef3CB1a8b1f943Fb20FB6ff70d5F4DE96',
    sbPushOracle: '0xC29aAabf235c1E71633fb7365E95772B97F425d7',
    metadata: {
        defaultRpcUrl: 'https://goerli.base.org',
        defaultExplorer: 'https://goerli.basescan.org'
    },
    queues: [],
    attestationQueues: [
        {
            name: 'SwitchboardLabs Attestation Queue',
            address: '0x80391284b2C81a2E11696EFb8825412c8D0d2a4d'
        }
    ]
};
const SWITCHBOARD_BASE_CONFIG = {
    mainnet: SWITCHBOARD_BASE_MAINNET_CONFIG,
    testnet: SWITCHBOARD_BASE_TESTNET_CONFIG
};
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/coredao.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SWITCHBOARD_COREDAO_CONFIG",
    ()=>SWITCHBOARD_COREDAO_CONFIG,
    "SWITCHBOARD_COREDAO_MAINNET_CONFIG",
    ()=>SWITCHBOARD_COREDAO_MAINNET_CONFIG,
    "SWITCHBOARD_COREDAO_TESTNET_CONFIG",
    ()=>SWITCHBOARD_COREDAO_TESTNET_CONFIG
]);
const SWITCHBOARD_COREDAO_MAINNET_CONFIG = {
    chain: 'coredao',
    chainId: 1116,
    networkName: 'Mainnet',
    address: '0xE30582eBD4A678065a61975Da113bD2e7aE38679',
    sbPushOracle: '0xC29aAabf235c1E71633fb7365E95772B97F425d7',
    metadata: {
        defaultRpcUrl: 'https://rpc.coredao.org',
        defaultExplorer: 'https://scan.coredao.org'
    },
    queues: [],
    attestationQueues: [
        {
            name: 'SwitchboardLabs Attestation Queue',
            address: '0x929b24A47F87819Be9f210F667C0CF655622453d'
        }
    ]
};
const SWITCHBOARD_COREDAO_TESTNET_CONFIG = {
    chain: 'coredao',
    chainId: 1115,
    networkName: 'Testnet',
    address: '0xf9BD4FA5152b029576F33565Afb676da98Dd0563',
    sbPushOracle: '0x4D06F949eb1057EB86446532eDf1cF323e787a8f',
    metadata: {
        defaultRpcUrl: 'https://rpc.test.btcs.network',
        defaultExplorer: 'https://scan.test.btcs.network'
    },
    queues: [],
    attestationQueues: [
        {
            name: 'SwitchboardLabs Attestation Queue',
            address: '0x928e9c71007514393bFff60b58D072dEb1309328'
        }
    ]
};
const SWITCHBOARD_COREDAO_CONFIG = {
    mainnet: SWITCHBOARD_COREDAO_MAINNET_CONFIG,
    testnet: SWITCHBOARD_COREDAO_TESTNET_CONFIG
};
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/ethereum.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SWITCHBOARD_ETHEREUM_CONFIG",
    ()=>SWITCHBOARD_ETHEREUM_CONFIG,
    "SWITCHBOARD_ETHEREUM_MAINNET_CONFIG",
    ()=>SWITCHBOARD_ETHEREUM_MAINNET_CONFIG,
    "SWITCHBOARD_ETHEREUM_TESTNET_CONFIG",
    ()=>SWITCHBOARD_ETHEREUM_TESTNET_CONFIG
]);
const SWITCHBOARD_ETHEREUM_MAINNET_CONFIG = {
    chain: 'ethereum',
    chainId: 1,
    networkName: 'Mainnet',
    address: '',
    sbPushOracle: '',
    metadata: {
        defaultRpcUrl: 'https://ethereum.publicnode.com',
        defaultExplorer: 'https://etherscan.io'
    },
    queues: [],
    attestationQueues: [
        {
            name: 'SwitchboardLabs Attestation Queue',
            address: ''
        }
    ]
};
const SWITCHBOARD_ETHEREUM_TESTNET_CONFIG = {
    chain: 'ethereum',
    chainId: 5,
    networkName: 'Goerli',
    address: '',
    sbPushOracle: '',
    metadata: {
        defaultRpcUrl: 'https://ethereum-goerli.publicnode.com',
        defaultExplorer: 'https://goerli.etherscan.io'
    },
    queues: [],
    attestationQueues: [
        {
            name: 'SwitchboardLabs Attestation Queue',
            address: ''
        }
    ]
};
const SWITCHBOARD_ETHEREUM_CONFIG = {
    mainnet: SWITCHBOARD_ETHEREUM_MAINNET_CONFIG,
    testnet: SWITCHBOARD_ETHEREUM_TESTNET_CONFIG
};
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/near.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SWITCHBOARD_NEAR_CONFIG",
    ()=>SWITCHBOARD_NEAR_CONFIG,
    "SWITCHBOARD_NEAR_MAINNET_CONFIG",
    ()=>SWITCHBOARD_NEAR_MAINNET_CONFIG,
    "SWITCHBOARD_NEAR_TESTNET_CONFIG",
    ()=>SWITCHBOARD_NEAR_TESTNET_CONFIG
]);
const SWITCHBOARD_NEAR_MAINNET_CONFIG = {
    chain: 'near',
    networkName: 'Mainnet',
    address: 'switchboard-v2.near',
    metadata: {
        defaultRpcUrl: 'https://rpc.mainnet.near.org',
        defaultExplorer: 'https://explorer.near.org'
    },
    queues: [
        {
            name: 'Permissionless Queue',
            address: 'Ztup1aJ8WTe81RZHx7nUP9zxUMrDe9r2TyTCzRzpRoY',
            crankAddress: 'HeS3xrDqHA2CSHTmN9osstz8vbXfgh2mmcGixJ1v9NFx',
            permissioned: false
        }
    ],
    attestationQueues: []
};
const SWITCHBOARD_NEAR_TESTNET_CONFIG = {
    chain: 'near',
    networkName: 'Testnet',
    address: 'switchboard-v2.testnet',
    metadata: {
        defaultRpcUrl: 'https://rpc.testnet.near.org',
        defaultExplorer: 'https://explorer.testnet.near.org'
    },
    queues: [
        {
            name: 'Permissionless Queue',
            address: 'HFSJrvA1w2uhciLGLUfE4sADGwGBpUiAjxZPgeFSs61M',
            crankAddress: '9Vzzu1Z74oPLctxwjRHwkKSd5H32AiQe32iMesuQwKnQ',
            permissioned: false
        }
    ],
    attestationQueues: []
};
const SWITCHBOARD_NEAR_CONFIG = {
    mainnet: SWITCHBOARD_NEAR_MAINNET_CONFIG,
    testnet: SWITCHBOARD_NEAR_TESTNET_CONFIG
};
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/optimism.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SWITCHBOARD_OPTIMISM_CONFIG",
    ()=>SWITCHBOARD_OPTIMISM_CONFIG,
    "SWITCHBOARD_OPTIMISM_MAINNET_CONFIG",
    ()=>SWITCHBOARD_OPTIMISM_MAINNET_CONFIG,
    "SWITCHBOARD_OPTIMISM_TESTNET_CONFIG",
    ()=>SWITCHBOARD_OPTIMISM_TESTNET_CONFIG
]);
const SWITCHBOARD_OPTIMISM_MAINNET_CONFIG = {
    chain: 'optimism',
    chainId: 10,
    networkName: 'Mainnet',
    address: '',
    sbPushOracle: '',
    metadata: {
        defaultRpcUrl: 'https://mainnet.optimism.io',
        defaultExplorer: 'https://explorer.optimism.io'
    },
    queues: [],
    attestationQueues: [
        {
            name: 'SwitchboardLabs Attestation Queue',
            address: ''
        }
    ]
};
const SWITCHBOARD_OPTIMISM_TESTNET_CONFIG = {
    chain: 'optimism',
    chainId: 420,
    networkName: 'Goerli',
    address: '0x7d05d5745499D8cc68FA4Eb5dbd45df53E9c3f1f',
    sbPushOracle: '0xc9d804F1e904cA0912D46E0C02600f75563A4988',
    metadata: {
        defaultRpcUrl: 'https://goerli.optimism.io',
        defaultExplorer: 'https://goerli-explorer.optimism.io'
    },
    queues: [],
    attestationQueues: [
        {
            name: 'SwitchboardLabs Attestation Queue',
            address: '0x455c706AF00af9fCFDA04746Be34c3051aAAD1d4'
        }
    ]
};
const SWITCHBOARD_OPTIMISM_CONFIG = {
    mainnet: SWITCHBOARD_OPTIMISM_MAINNET_CONFIG,
    testnet: SWITCHBOARD_OPTIMISM_TESTNET_CONFIG
};
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/solana.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SWITCHBOARD_SOLANA_CONFIG",
    ()=>SWITCHBOARD_SOLANA_CONFIG,
    "SWITCHBOARD_SOLANA_DEVNET_CONFIG",
    ()=>SWITCHBOARD_SOLANA_DEVNET_CONFIG,
    "SWITCHBOARD_SOLANA_MAINNET_CONFIG",
    ()=>SWITCHBOARD_SOLANA_MAINNET_CONFIG
]);
const SWITCHBOARD_SOLANA_MAINNET_CONFIG = {
    chain: 'solana',
    networkName: 'Mainnet-Beta',
    address: 'SW1TCH7qEPTdLsDHRgPuMQjbQxKdH2aBStViMFnt64f',
    idlAddress: 'Fi8vncGpNKbq62gPo56G4toCehWNy77GgqGkTaAF5Lkk',
    attestationService: 'sbattyXrzedoNATfc4L31wC9Mhxsi1BmFhTiN8gDshx',
    attestationIdlAddress: '5ExuoQR69trmKQfB95fDsUGsUrrChbGq9PFgt8qouncz',
    metadata: {
        defaultRpcUrl: 'https://api.mainnet-beta.solana.com',
        defaultExplorer: 'https://explorer.solana.com'
    },
    queues: [
        {
            name: 'Permissionless Queue',
            address: '5JYwqvKkqp35w8Nq3ba4z1WYUeJQ1rB36V8XvaGp6zn1',
            crankAddress: 'BKtF8yyQsj3Ft6jb2nkfpEKzARZVdGgdEPs6mFmZNmbA',
            permissioned: false
        },
        {
            name: 'Permissioned Queue',
            address: '3HBb2DQqDfuMdzWxNk1Eo9RTMkFYmuEAd32RiLKn9pAn',
            crankAddress: 'GdNVLWzcE6h9SPuSbmu69YzxAj8enim9t6mjzuqTXgLd',
            permissioned: true
        }
    ],
    attestationQueues: [
        {
            name: 'SwitchboardLabs Attestation Queue',
            address: '2ie3JZfKcvsRLsJaP5fSo43gUo1vsurnUAtAgUdUAiDG'
        }
    ]
};
const SWITCHBOARD_SOLANA_DEVNET_CONFIG = {
    chain: 'solana',
    networkName: 'Devnet',
    address: 'SW1TCH7qEPTdLsDHRgPuMQjbQxKdH2aBStViMFnt64f',
    idlAddress: 'Fi8vncGpNKbq62gPo56G4toCehWNy77GgqGkTaAF5Lkk',
    attestationService: 'sbattyXrzedoNATfc4L31wC9Mhxsi1BmFhTiN8gDshx',
    attestationIdlAddress: '5ExuoQR69trmKQfB95fDsUGsUrrChbGq9PFgt8qouncz',
    metadata: {
        defaultRpcUrl: 'https://api.devnet.solana.com',
        defaultExplorer: 'https://explorer.solana.com/?cluster=devnet'
    },
    queues: [
        {
            name: 'Permissionless Queue',
            address: 'uPeRMdfPmrPqgRWSrjAnAkH78RqAhe5kXoW6vBYRqFX',
            crankAddress: 'UcrnK4w2HXCEjY8z6TcQ9tysYr3c9VcFLdYAU9YQP5e',
            permissioned: false
        },
        {
            name: 'Permissioned Queue',
            address: 'PeRMnAqNqHQYHUuCBEjhm1XPeVTh4BxjY4t4TPan1pG',
            crankAddress: 'crnKsPsuP6f7uiDbAYYw66h2RNBrqoazmtZHwazkC6V',
            permissioned: true
        }
    ],
    attestationQueues: [
        {
            name: 'SwitchboardLabs Attestation Queue',
            address: 'CkvizjVnm2zA5Wuwan34NhVT3zFc7vqUyGnA6tuEF5aE'
        }
    ]
};
const SWITCHBOARD_SOLANA_CONFIG = {
    mainnet: SWITCHBOARD_SOLANA_MAINNET_CONFIG,
    devnet: SWITCHBOARD_SOLANA_DEVNET_CONFIG
};
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/starknet.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SWITCHBOARD_STARKNET_CONFIG",
    ()=>SWITCHBOARD_STARKNET_CONFIG,
    "SWITCHBOARD_STARKNET_GOERLI_CONFIG",
    ()=>SWITCHBOARD_STARKNET_GOERLI_CONFIG,
    "SWITCHBOARD_STARKNET_MAINNET_CONFIG",
    ()=>SWITCHBOARD_STARKNET_MAINNET_CONFIG,
    "SWITCHBOARD_STARKNET_SEPOLIA_CONFIG",
    ()=>SWITCHBOARD_STARKNET_SEPOLIA_CONFIG
]);
const SWITCHBOARD_STARKNET_GOERLI_CONFIG = {
    chain: 'starknet',
    networkName: 'Goerli',
    address: '0x026183fd8df673e4b2a007eec9d70bc38eb8a0df960dd5b0c57a9250ae2e63ac',
    metadata: {
        defaultRpcUrl: 'https://alpha4.starknet.io',
        defaultExplorer: 'https://testnet.starkscan.co/'
    },
    chainId: '0x534e5f474f45524c49',
    queues: [],
    attestationQueues: [
        {
            name: 'Permissionless',
            address: '0x1'
        }
    ]
};
const SWITCHBOARD_STARKNET_SEPOLIA_CONFIG = {
    chain: 'starknet',
    networkName: 'Sepolia',
    address: '',
    metadata: {
        defaultRpcUrl: '',
        defaultExplorer: 'https://sepolia.starkscan.co/'
    },
    chainId: '',
    queues: [],
    attestationQueues: [
        {
            name: 'Permissionless',
            address: ''
        }
    ]
};
const SWITCHBOARD_STARKNET_MAINNET_CONFIG = {
    chain: 'starknet',
    networkName: 'Mainnet',
    address: '0x0728d32b3d508dbe5989824dd0edb1e03b8a319d561b9ec6507dff245a95c52f',
    metadata: {
        defaultRpcUrl: 'https://alpha-mainnet.starknet.io',
        defaultExplorer: 'https://starkscan.co/'
    },
    chainId: '0x534e5f4d41494e',
    queues: [],
    attestationQueues: [
        {
            name: 'Permissionless',
            address: '0x1'
        }
    ]
};
const SWITCHBOARD_STARKNET_CONFIG = {
    goerli: SWITCHBOARD_STARKNET_GOERLI_CONFIG,
    sepolia: SWITCHBOARD_STARKNET_SEPOLIA_CONFIG,
    mainnet: SWITCHBOARD_STARKNET_MAINNET_CONFIG
};
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/sui.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SWITCHBOARD_SUI_CONFIG",
    ()=>SWITCHBOARD_SUI_CONFIG,
    "SWITCHBOARD_SUI_MAINNET_CONFIG",
    ()=>SWITCHBOARD_SUI_MAINNET_CONFIG,
    "SWITCHBOARD_SUI_TESTNET_CONFIG",
    ()=>SWITCHBOARD_SUI_TESTNET_CONFIG
]);
const SWITCHBOARD_SUI_MAINNET_CONFIG = {
    chain: 'sui',
    networkName: 'Mainnet',
    address: '0xfd2e0f4383df3ec9106326dcd9a20510cdce72146754296deed15403fcd3df8b',
    switchboardStdLib: '0x08d79f4d920b03d88faca1e421af023a87fbb1e4a6fd200248e6e9998d09e470',
    metadata: {
        defaultRpcUrl: 'https://fullnode.mainnet.sui.io:443',
        defaultExplorer: 'https://suiexplorer.com'
    },
    queues: [
        {
            name: 'Permissioned Queue',
            address: '0xea802bde1319363a27134a72a9d2f45e110fd60ef32ab2e10cdb06c973d6c64f',
            crankAddress: '',
            permissioned: true
        },
        {
            name: 'Permissionless Queue',
            address: '0xe9324b82374f18d17de601ae5a19cd72e8c9f57f54661bf9e41a76f8948e80b5',
            crankAddress: '',
            permissioned: false
        }
    ],
    attestationQueues: []
};
const SWITCHBOARD_SUI_TESTNET_CONFIG = {
    chain: 'sui',
    networkName: 'Testnet',
    address: '0x4247e72df58552701456293027e75237fe85a214cd050b6e0358dc5047a3fb17',
    switchboardStdLib: '0x98670585b87e06628ef2d7f7cb1e7bee8ada65b43b82997935225a7e6e21d18e',
    metadata: {
        defaultRpcUrl: 'https://fullnode.testnet.sui.io:443',
        defaultExplorer: 'https://suiexplorer.com/?network=testnet'
    },
    queues: [
        {
            name: 'Permissionless Queue',
            address: '0x955e87b8bf01e8f8a739e07c7556956108fa93aa02dae0b017083bfbe99cbd34',
            crankAddress: '',
            permissioned: false
        }
    ],
    attestationQueues: []
};
const SWITCHBOARD_SUI_CONFIG = {
    mainnet: SWITCHBOARD_SUI_MAINNET_CONFIG,
    testnet: SWITCHBOARD_SUI_TESTNET_CONFIG
};
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/types.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

///////////////////////////////////////////////////////////////////////////////
/////////////// Supported Chains///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
/** The current EVM chains Switchboard is currently deployed on. */ __turbopack_context__.s([
    "SUPPORTED_EVM_CHAIN_IDS",
    ()=>SUPPORTED_EVM_CHAIN_IDS,
    "SWITCHBOARD_CHAINS",
    ()=>SWITCHBOARD_CHAINS,
    "SWITCHBOARD_EVM_CHAINS",
    ()=>SWITCHBOARD_EVM_CHAINS
]);
const SWITCHBOARD_EVM_CHAINS = [
    'arbitrum',
    'base',
    'coredao',
    'ethereum',
    'optimism',
    'aurora'
];
const SWITCHBOARD_CHAINS = [
    'aptos',
    'near',
    'solana',
    'starknet',
    'sui',
    ...SWITCHBOARD_EVM_CHAINS
];
const SUPPORTED_EVM_CHAIN_IDS = [
    // arbitrum
    42161,
    421613,
    421614,
    // base
    8453,
    84531,
    // core
    1116,
    1115,
    // ethereum
    1,
    5,
    // optimism
    10,
    420,
    // aurora
    1313161554,
    1313161555
];
///////////////////////////////////////////////////////////////////////////////
/////////////// Supported Networks ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const EVM_SUPPPORTED_NETWORKS = [
    'mainnet',
    'testnet'
];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SUPPPORTED_NETWORKS = [
    ...EVM_SUPPPORTED_NETWORKS,
    'devnet'
];
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SWITCHBOARD_EVM_CHAIN_IDS",
    ()=>SWITCHBOARD_EVM_CHAIN_IDS,
    "SWITCHBOARD_EVM_NETWORKS",
    ()=>SWITCHBOARD_EVM_NETWORKS,
    "SWITCHBOARD_NETWORKS",
    ()=>SWITCHBOARD_NETWORKS,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getSupportedChain",
    ()=>getSupportedChain,
    "getSupportedEvmChain",
    ()=>getSupportedEvmChain,
    "getSupportedEvmChainId",
    ()=>getSupportedEvmChainId,
    "isSupportedChain",
    ()=>isSupportedChain,
    "isSupportedChainId",
    ()=>isSupportedChainId,
    "isSupportedEvmChain",
    ()=>isSupportedEvmChain
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$aptos$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/aptos.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$arbitrum$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/arbitrum.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$aurora$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/aurora.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/base.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$coredao$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/coredao.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$ethereum$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/ethereum.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$near$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/near.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$optimism$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/optimism.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$solana$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/solana.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$starknet$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/starknet.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$sui$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/sui.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/types.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
const SWITCHBOARD_EVM_NETWORKS = {
    arbitrum: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$arbitrum$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_ARBITRUM_CONFIG"],
    base: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_BASE_CONFIG"],
    coredao: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$coredao$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_COREDAO_CONFIG"],
    ethereum: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$ethereum$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_ETHEREUM_CONFIG"],
    optimism: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$optimism$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_OPTIMISM_CONFIG"],
    aurora: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$aurora$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_AURORA_CONFIG"]
};
function isSupportedEvmChain(chain) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_EVM_CHAINS"].includes(chain);
}
function getSupportedEvmChain(chain) {
    if (!isSupportedEvmChain(chain)) {
        throw new Error(`The provided chain '${chain}' is not yet supported by the Switchboard network. Available chains are: [${__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_EVM_CHAINS"].map((c)=>"'" + c + "'").join(', ')}]`);
    }
    return SWITCHBOARD_EVM_NETWORKS[chain];
}
const SWITCHBOARD_EVM_CHAIN_IDS = {
    1: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$ethereum$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_ETHEREUM_MAINNET_CONFIG"],
    5: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$ethereum$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_ETHEREUM_TESTNET_CONFIG"],
    10: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$optimism$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_OPTIMISM_MAINNET_CONFIG"],
    420: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$optimism$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_OPTIMISM_TESTNET_CONFIG"],
    8453: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_BASE_MAINNET_CONFIG"],
    84531: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_BASE_TESTNET_CONFIG"],
    42161: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$arbitrum$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_ARBITRUM_MAINNET_CONFIG"],
    421613: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$arbitrum$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_ARBITRUM_TESTNET_CONFIG"],
    421614: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$arbitrum$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_ARBITRUM_SEPOLIA_CONFIG"],
    1116: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$coredao$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_COREDAO_MAINNET_CONFIG"],
    1115: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$coredao$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_COREDAO_TESTNET_CONFIG"],
    1313161555: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$aurora$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_AURORA_TESTNET_CONFIG"],
    1313161554: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$aurora$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_AURORA_MAINNET_CONFIG"]
};
function isSupportedChainId(chainId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SUPPORTED_EVM_CHAIN_IDS"].includes(chainId);
}
function getSupportedEvmChainId(chainId) {
    if (!isSupportedChainId(chainId)) {
        throw new Error(`The provided chainID '${chainId}' is not yet supported by the Switchboard network. Available chainID's are: [${__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SUPPORTED_EVM_CHAIN_IDS"].map((c)=>"'" + c + "'").join(', ')}]`);
    }
    return SWITCHBOARD_EVM_CHAIN_IDS[chainId];
}
const SWITCHBOARD_NETWORKS = {
    aptos: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$aptos$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_APTOS_CONFIG"],
    near: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$near$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_NEAR_CONFIG"],
    solana: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$solana$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_SOLANA_CONFIG"],
    starknet: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$starknet$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_STARKNET_CONFIG"],
    sui: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$sui$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_SUI_CONFIG"],
    ...SWITCHBOARD_EVM_NETWORKS
};
function isSupportedChain(chain) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_CHAINS"].includes(chain);
}
function getSupportedChain(chain) {
    if (!isSupportedChain(chain)) {
        throw new Error(`The provided chain '${chain}' is not yet supported by the Switchboard network. Available chains are: [${__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_CHAINS"].map((c)=>"'" + c + "'").join(', ')}]`);
    }
    return SWITCHBOARD_NETWORKS[chain];
}
;
;
;
;
;
;
;
;
;
;
;
const __TURBOPACK__default__export__ = SWITCHBOARD_NETWORKS;
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/secrets.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AddMrEnclavePayload",
    ()=>AddMrEnclavePayload,
    "CreateSecretPayload",
    ()=>CreateSecretPayload,
    "DeleteSecretPayload",
    ()=>DeleteSecretPayload,
    "RemoveMrEnclavePayload",
    ()=>RemoveMrEnclavePayload,
    "SwitchboardSecrets",
    ()=>SwitchboardSecrets,
    "UpdateUserPayload",
    ()=>UpdateUserPayload
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/buffer [external] (buffer, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$js$2d$sha256$40$0$2e$11$2e$1$2f$node_modules$2f$js$2d$sha256$2f$src$2f$sha256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/js-sha256@0.11.1/node_modules/js-sha256/src/sha256.js [app-route] (ecmascript)");
;
;
/**
 *  Default is to expire requests 30 seconds from now.
 */ const getDefaultRequestTimestamp = ()=>Math.floor(Date.now() / 1000) + 30;
class SwitchboardSecrets {
    constructor(url){
        this.url = url !== null && url !== void 0 ? url : 'https://api.secrets.switchboard.xyz';
    }
    async getUser(userPubkey, ciphersuite) {
        const url = `${this.url}/user/${userPubkey}/ciphersuite/${ciphersuite}`;
        // eslint-disable-next-line n/no-unsupported-features/node-builtins
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Signed-Header': __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$js$2d$sha256$40$0$2e$11$2e$1$2f$node_modules$2f$js$2d$sha256$2f$src$2f$sha256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha256"].create().update('test-sig').digest()).toString('hex')
            }
        });
        if (!response.ok) {
            throw new Error(`getUser failed: ${response.statusText}`);
        }
        const json = await response.json();
        return {
            ciphersuite: json.ciphersuite,
            user_pubkey: json.user_pubkey,
            created_at: new Date(json.created_at),
            updated_at: new Date(json.updated_at),
            contact_info: json.contact_info
        };
    }
    createOrUpdateUserRequest(/**
     *  The address of the user.
     */ userPubkey, /**
     *  'ed25519' for Solana users, 'ethers' for EVM users.
     */ ciphersuite, /**
     *  Stringified contact info for the user.
     */ contactInfo = '', /**
     *  The timestamp that this request expires.
     *
     *  Default: now + 30 seconds.
     */ expiryTimestamp = getDefaultRequestTimestamp()) {
        return new UpdateUserPayload(userPubkey, ciphersuite, contactInfo, expiryTimestamp);
    }
    async createOrUpdateUser(request, signature) {
        const url = `${this.url}/user`;
        // eslint-disable-next-line n/no-unsupported-features/node-builtins
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Signed-Header': signature
            },
            body: request.toString()
        });
        if (!response.ok) {
            throw new Error(`createOrUpdateUser failed: ${response.statusText}`);
        }
    }
    async getUserSecrets(userPubkey, ciphersuite) {
        const url = `${this.url}/user/${userPubkey}/ciphersuite/${ciphersuite}/secrets`;
        // eslint-disable-next-line n/no-unsupported-features/node-builtins
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Signed-Header': __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$js$2d$sha256$40$0$2e$11$2e$1$2f$node_modules$2f$js$2d$sha256$2f$src$2f$sha256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha256"].create().update('test-sig').digest()).toString('hex')
            }
        });
        if (!response.ok) {
            throw new Error(`getUserSecrets failed: ${response.statusText}`);
        }
        const json = await response.json();
        return Array.isArray(json) ? json.map((item)=>({
                secret: item.secret,
                secret_name: item.secret_name,
                created_at: new Date(item.created_at),
                updated_at: new Date(item.updated_at),
                whitelist: Array.isArray(item.whitelisted_mrenclaves) ? item.whitelisted_mrenclaves.filter((val)=>!!val) : []
            })).sort((a, b)=>b.updated_at.getTime() - a.updated_at.getTime()) : [];
    }
    createSecretRequest(/**
     *  The address of the user.
     */ userPubkey, /**
     *  'ed25519' for Solana users, 'ethers' for EVM users.
     */ ciphersuite, /**
     *  The key of the secret.
     *
     *  Keys must be unique per user.
     */ secretName, /**
     *  The value of the secret.
     */ secretValue, /**
     *  The timestamp that this request expires.
     *
     *  Default: now + 30 seconds.
     */ expiryTimestamp = getDefaultRequestTimestamp()) {
        return new CreateSecretPayload(userPubkey, ciphersuite, secretName, secretValue, expiryTimestamp);
    }
    async createSecret(request, signature) {
        const url = `${this.url}/secret`;
        // eslint-disable-next-line n/no-unsupported-features/node-builtins
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Signed-Header': signature
            },
            body: request.toString()
        });
        if (!response.ok) {
            throw new Error(`createSecret failed: ${response.statusText}`);
        }
    }
    createAddMrEnclaveRequest(/**
     *  The address of the user.
     */ userPubkey, /**
     *  'ed25519' for Solana users, 'ethers' for EVM users.
     */ ciphersuite, /**
     *  The MrEnclave value to add.
     */ mrEnclave, /**
     *  The names of the secrets to whitelist the MrEnclave value for.
     */ secretNames, /**
     *  The timestamp that this request expires.
     *
     *  Default: now + 30 seconds.
     */ expiryTimestamp = getDefaultRequestTimestamp()) {
        return new AddMrEnclavePayload(userPubkey, ciphersuite, mrEnclave, secretNames, expiryTimestamp);
    }
    async addMrEnclave(request, signature) {
        const url = `${this.url}/mrenclave/whitelist`;
        // eslint-disable-next-line n/no-unsupported-features/node-builtins
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Signed-Header': signature
            },
            body: request.toString()
        });
        if (!response.ok) {
            throw new Error(`addMrEnclave failed: ${response.statusText}`);
        }
    }
    createRemoveMrEnclaveRequest(/**
     *  The address of the user.
     */ userPubkey, /**
     *  'ed25519' for Solana users, 'ethers' for EVM users.
     */ ciphersuite, /**
     *  The mrEnclave value to remove.
     */ mrEnclave, /**
     *  The timestamp that this request expires.
     *
     *  Default: now + 30 seconds.
     */ expiryTimestamp = getDefaultRequestTimestamp()) {
        return new RemoveMrEnclavePayload(userPubkey, ciphersuite, mrEnclave, expiryTimestamp);
    }
    async removeMrEnclave(request, signature) {
        const url = `${this.url}/mrenclave/whitelist`;
        // eslint-disable-next-line n/no-unsupported-features/node-builtins
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Signed-Header': signature
            },
            body: request.toString()
        });
        if (!response.ok) {
            throw new Error(`removeMrEnclave failed: ${response.statusText}`);
        }
    }
    createDeleteSecretRequest(/**
     *  The address of the user.
     */ userPubkey, /**
     *  'ed25519' for Solana users, 'ethers' for EVM users.
     */ ciphersuite, /**
     *  The name fo the secret to delete.
     */ secretName, /**
     *  The timestamp that this request expires.
     *
     *  Default: now + 30 seconds.
     */ expiryTimestamp = getDefaultRequestTimestamp()) {
        return new DeleteSecretPayload(userPubkey, ciphersuite, secretName, expiryTimestamp);
    }
    async deleteSecret(request, signature) {
        const url = `${this.url}/secret`;
        // eslint-disable-next-line n/no-unsupported-features/node-builtins
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Signed-Header': signature
            },
            body: request.toString()
        });
        if (!response.ok) {
            throw new Error(`deleteSecret failed: ${response.statusText}`);
        }
    }
}
class UpdateUserPayload {
    constructor(user_pubkey, ciphersuite, contact_info, timestamp){
        this.user_pubkey = user_pubkey;
        this.ciphersuite = ciphersuite;
        this.contact_info = contact_info;
        this.timestamp = timestamp;
    }
    static from(obj) {
        return new UpdateUserPayload(obj.user_pubkey, obj.ciphersuite, obj.contact_info, obj.timestamp);
    }
    toJSON() {
        return {
            user_pubkey: this.user_pubkey,
            ciphersuite: this.ciphersuite,
            contact_info: this.contact_info,
            timestamp: this.timestamp
        };
    }
    toString() {
        return JSON.stringify(this.toJSON());
    }
    toEncodedMessage() {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$js$2d$sha256$40$0$2e$11$2e$1$2f$node_modules$2f$js$2d$sha256$2f$src$2f$sha256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha256"].create().update(this.toString()).digest());
    }
}
class CreateSecretPayload {
    constructor(user_pubkey, ciphersuite, secret_name, secret, timestamp){
        this.user_pubkey = user_pubkey;
        this.ciphersuite = ciphersuite;
        this.secret_name = secret_name;
        this.secret = secret;
        this.timestamp = timestamp;
    }
    static from(obj) {
        return new CreateSecretPayload(obj.user_pubkey, obj.ciphersuite, obj.secret_name, obj.secret, obj.timestamp);
    }
    toJSON() {
        return {
            user_pubkey: this.user_pubkey,
            ciphersuite: this.ciphersuite,
            secret: this.secret,
            secret_name: this.secret_name,
            timestamp: this.timestamp
        };
    }
    toString() {
        return JSON.stringify(this.toJSON());
    }
    toEncodedMessage() {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$js$2d$sha256$40$0$2e$11$2e$1$2f$node_modules$2f$js$2d$sha256$2f$src$2f$sha256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha256"].create().update(this.toString()).digest());
    }
}
class AddMrEnclavePayload {
    constructor(user_pubkey, ciphersuite, mr_enclave, secret_names, timestamp){
        this.user_pubkey = user_pubkey;
        this.ciphersuite = ciphersuite;
        this.mr_enclave = mr_enclave;
        this.secret_names = secret_names;
        this.timestamp = timestamp;
    }
    static from(obj) {
        return new AddMrEnclavePayload(obj.user_pubkey, obj.ciphersuite, obj.mr_enclave, obj.secret_names, obj.timestamp);
    }
    toJSON() {
        return {
            user_pubkey: this.user_pubkey,
            ciphersuite: this.ciphersuite,
            mr_enclave: this.mr_enclave,
            secret_names: this.secret_names,
            timestamp: this.timestamp
        };
    }
    toString() {
        return JSON.stringify(this.toJSON());
    }
    toEncodedMessage() {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$js$2d$sha256$40$0$2e$11$2e$1$2f$node_modules$2f$js$2d$sha256$2f$src$2f$sha256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha256"].create().update(this.toString()).digest());
    }
}
class RemoveMrEnclavePayload {
    constructor(user_pubkey, ciphersuite, mr_enclave, timestamp){
        this.user_pubkey = user_pubkey;
        this.ciphersuite = ciphersuite;
        this.mr_enclave = mr_enclave;
        this.timestamp = timestamp;
    }
    static from(obj) {
        return new RemoveMrEnclavePayload(obj.user_pubkey, obj.ciphersuite, obj.mr_enclave, obj.timestamp);
    }
    toJSON() {
        return {
            user_pubkey: this.user_pubkey,
            ciphersuite: this.ciphersuite,
            mr_enclave: this.mr_enclave,
            timestamp: this.timestamp
        };
    }
    toString() {
        return JSON.stringify(this.toJSON());
    }
    toEncodedMessage() {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$js$2d$sha256$40$0$2e$11$2e$1$2f$node_modules$2f$js$2d$sha256$2f$src$2f$sha256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha256"].create().update(this.toString()).digest());
    }
}
class DeleteSecretPayload {
    constructor(user_pubkey, ciphersuite, secret_name, timestamp){
        this.user_pubkey = user_pubkey;
        this.ciphersuite = ciphersuite;
        this.secret_name = secret_name;
        this.timestamp = timestamp;
    }
    static from(obj) {
        return new DeleteSecretPayload(obj.user_pubkey, obj.ciphersuite, obj.secret_name, obj.timestamp);
    }
    toJSON() {
        return {
            user_pubkey: this.user_pubkey,
            ciphersuite: this.ciphersuite,
            secret_name: this.secret_name,
            timestamp: this.timestamp
        };
    }
    toString() {
        return JSON.stringify(this.toJSON());
    }
    toEncodedMessage() {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$js$2d$sha256$40$0$2e$11$2e$1$2f$node_modules$2f$js$2d$sha256$2f$src$2f$sha256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha256"].create().update(this.toString()).digest());
    }
}
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/SwitchboardDecimal.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SwitchboardDecimal",
    ()=>SwitchboardDecimal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$big$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/big.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/big.js@6.2.2/node_modules/big.js/big.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bn.js@5.2.2/node_modules/bn.js/lib/bn.js [app-route] (ecmascript)");
;
;
;
class SwitchboardDecimal {
    constructor(mantissa, scale){
        this.mantissa = mantissa;
        this.scale = scale;
    }
    /**
     * Convert untyped object to a Switchboard decimal, if possible.
     * @param obj raw object to convert from
     * @return SwitchboardDecimal
     */ static from(obj) {
        return new SwitchboardDecimal(new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](obj.mantissa), obj.scale);
    }
    /**
     * Convert a Big.js decimal to a Switchboard decimal.
     * @param big a Big.js decimal
     * @return a SwitchboardDecimal
     */ static fromBig(big) {
        // Round to fit in Switchboard Decimal
        // TODO: smarter logic.
        big = big.round(20);
        let mantissa = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](big.c.join(''), 10);
        // Set the scale. Big.exponenet sets scale from the opposite side
        // SwitchboardDecimal does.
        let scale = big.c.slice(1).length - big.e;
        if (scale < 0) {
            mantissa = mantissa.mul(new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](10, 10).pow(new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](Math.abs(scale), 10)));
            scale = 0;
        }
        if (scale < 0) {
            throw new Error('SwitchboardDecimal: Unexpected negative scale.');
        }
        if (scale >= 28) {
            throw new Error('SwitchboardDecimalExcessiveScaleError');
        }
        // Set sign for the coefficient (mantissa)
        mantissa = mantissa.mul(new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](big.s, 10));
        const result = new SwitchboardDecimal(mantissa, scale);
        if (big.sub(result.toBig()).abs().gt(new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"](0.00005))) {
            throw new Error('SwitchboardDecimal: Converted decimal does not match original:\n' + `out: ${result.toBig().toNumber()} vs in: ${big.toNumber()}\n` + `-- result mantissa and scale: ${result.mantissa.toString()} ${result.scale.toString()}\n` + `${result} ${result.toBig()}`);
        }
        return result;
    }
    /**
     * SwitchboardDecimal equality comparator.
     * @param other object to compare to.
     * @return true iff equal
     */ eq(other) {
        return this.mantissa.eq(other.mantissa) && this.scale === other.scale;
    }
    get big() {
        return this.toBig();
    }
    /**
     * Convert SwitchboardDecimal to big.js Big type.
     * @return Big representation
     */ toBig() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$big$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromBN"])(this.mantissa, this.scale);
    }
    toString() {
        return this.big.toString();
    }
    toJSON() {
        return {
            mantissa: this.mantissa.toString(10),
            scale: this.scale,
            value: this.toString()
        };
    }
}
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/types.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$big$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/big.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$CrossbarClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/CrossbarClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$FeedHash$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/FeedHash.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/types.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$protos$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/protos.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$secrets$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/secrets.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$SwitchboardDecimal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/SwitchboardDecimal.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/types.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$async$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/async.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$oracle$2d$job$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/oracle-job.js [app-route] (ecmascript)"); // NOTE: Exported here for compatibility with old code
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/big.js@6.2.2/node_modules/big.js/big.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bn.js@5.2.2/node_modules/bn.js/lib/bn.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$6$2e$0$2e$0$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bs58@6.0.0/node_modules/bs58/src/esm/index.js [app-route] (ecmascript)");
// import { OracleJob } from "./protos/index.js";
// export import ITask = OracleJob.ITask;
// export import Task = OracleJob.Task;
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$protobufjs$40$7$2e$5$2e$4$2f$node_modules$2f$protobufjs$2f$minimal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/protobufjs@7.5.4/node_modules/protobufjs/minimal.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$protobufjs$40$7$2e$5$2e$4$2f$node_modules$2f$protobufjs$2f$minimal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].util.toJSONOptions = {
    longs: String,
    enums: String,
    bytes: String,
    json: true
};
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AddMrEnclavePayload",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$secrets$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AddMrEnclavePayload"],
    "AsyncUtils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsyncUtils"],
    "BN",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"],
    "BNtoDateTimeString",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BNtoDateTimeString"],
    "Big",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"],
    "BigUtils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$big$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    "CreateSecretPayload",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$secrets$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateSecretPayload"],
    "CrossbarClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$CrossbarClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CrossbarClient"],
    "DeleteSecretPayload",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$secrets$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DeleteSecretPayload"],
    "FeedHash",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$FeedHash$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FeedHash"],
    "NonEmptyArrayUtils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NonEmptyArrayUtils"],
    "NumberUtils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NumberUtils"],
    "OracleJob",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$protos$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OracleJob"],
    "OracleJobUtils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OracleJobUtils"],
    "RemoveMrEnclavePayload",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$secrets$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RemoveMrEnclavePayload"],
    "SUPPORTED_EVM_CHAIN_IDS",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SUPPORTED_EVM_CHAIN_IDS"],
    "SWITCHBOARD_CHAINS",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_CHAINS"],
    "SWITCHBOARD_EVM_CHAINS",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SWITCHBOARD_EVM_CHAINS"],
    "SwitchboardDecimal",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$SwitchboardDecimal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SwitchboardDecimal"],
    "SwitchboardSecrets",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$secrets$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SwitchboardSecrets"],
    "Task",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$protos$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Task"],
    "UpdateUserPayload",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$secrets$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UpdateUserPayload"],
    "bs58",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$6$2e$0$2e$0$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"],
    "buf2String",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buf2String"],
    "decodeString",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeString"],
    "deserializeOracleJob",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$oracle$2d$job$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deserializeOracleJob"],
    "getSupportedChain",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getSupportedChain"],
    "getSupportedEvmChain",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getSupportedEvmChain"],
    "getSupportedEvmChainId",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getSupportedEvmChainId"],
    "getSupportedNetwork",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSupportedNetwork"],
    "isBase58",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isBase58"],
    "isBase64",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isBase64"],
    "isBytes",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isBytes"],
    "isHex",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isHex"],
    "isKeypairString",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isKeypairString"],
    "isSupportedChain",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isSupportedChain"],
    "isSupportedChainId",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isSupportedChainId"],
    "isSupportedEvmChain",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isSupportedEvmChain"],
    "isSwitchboardLabsQueue",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSwitchboardLabsQueue"],
    "jsonReplacers",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonReplacers"],
    "networks",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"],
    "parseMrEnclave",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseMrEnclave"],
    "parseRawMrEnclave",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseRawMrEnclave"],
    "serializeOracleJob",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$oracle$2d$job$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serializeOracleJob"],
    "sleep",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$async$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sleep"],
    "toDateTimeString",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toDateTimeString"],
    "toUtf8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toUtf8"],
    "validateSupportedChain",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateSupportedChain"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$big$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/big.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$CrossbarClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/CrossbarClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$FeedHash$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/FeedHash.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$networks$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/networks/types.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$protos$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/protos.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$secrets$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/secrets.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$SwitchboardDecimal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/SwitchboardDecimal.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/types.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$async$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/async.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$oracle$2d$job$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/oracle-job.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/big.js@6.2.2/node_modules/big.js/big.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bn.js@5.2.2/node_modules/bn.js/lib/bn.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$6$2e$0$2e$0$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bs58@6.0.0/node_modules/bs58/src/esm/index.js [app-route] (ecmascript)");
}),
];

//# sourceMappingURL=f4640_%40switchboard-xyz_common_lib_b61bc3db._.js.map