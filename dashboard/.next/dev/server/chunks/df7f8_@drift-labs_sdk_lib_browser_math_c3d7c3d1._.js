module.exports = [
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/utils.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.numberToSafeBN = exports.isBNSafe = exports.checkSameDate = exports.timeRemainingUntilUpdate = exports.sigNum = exports.divCeil = exports.squareRootBN = exports.clampBN = void 0;
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
function clampBN(x, min, max) {
    return anchor_1.BN.max(min, anchor_1.BN.min(x, max));
}
exports.clampBN = clampBN;
const squareRootBN = (n)=>{
    if (n.lt(new anchor_1.BN(0))) {
        throw new Error('Sqrt only works on non-negtiave inputs');
    }
    if (n.lt(new anchor_1.BN(2))) {
        return n;
    }
    const smallCand = (0, exports.squareRootBN)(n.shrn(2)).shln(1);
    const largeCand = smallCand.add(new anchor_1.BN(1));
    if (largeCand.mul(largeCand).gt(n)) {
        return smallCand;
    } else {
        return largeCand;
    }
};
exports.squareRootBN = squareRootBN;
const divCeil = (a, b)=>{
    const quotient = a.div(b);
    const remainder = a.mod(b);
    if (remainder.gt(numericConstants_1.ZERO)) {
        return quotient.add(numericConstants_1.ONE);
    } else {
        return quotient;
    }
};
exports.divCeil = divCeil;
const sigNum = (x)=>{
    return x.isNeg() ? new anchor_1.BN(-1) : new anchor_1.BN(1);
};
exports.sigNum = sigNum;
/**
 * calculates the time remaining until the next update based on a rounded, "on-the-hour" update schedule
 * this schedule is used for Perpetual Funding Rate and Revenue -> Insurance Updates
 * @param now: current blockchain unix timestamp
 * @param lastUpdateTs: the unix timestamp of the last update
 * @param updatePeriod: desired interval between updates (in seconds)
 * @returns: timeRemainingUntilUpdate (in seconds)
 */ function timeRemainingUntilUpdate(now, lastUpdateTs, updatePeriod) {
    const timeSinceLastUpdate = now.sub(lastUpdateTs);
    // round next update time to be available on the hour
    let nextUpdateWait = updatePeriod;
    if (updatePeriod.gt(new anchor_1.BN(1))) {
        const lastUpdateDelay = lastUpdateTs.umod(updatePeriod);
        if (!lastUpdateDelay.isZero()) {
            const maxDelayForNextPeriod = updatePeriod.div(new anchor_1.BN(3));
            const twoFundingPeriods = updatePeriod.mul(new anchor_1.BN(2));
            if (lastUpdateDelay.gt(maxDelayForNextPeriod)) {
                // too late for on the hour next period, delay to following period
                nextUpdateWait = twoFundingPeriods.sub(lastUpdateDelay);
            } else {
                // allow update on the hour
                nextUpdateWait = updatePeriod.sub(lastUpdateDelay);
            }
            if (nextUpdateWait.gt(twoFundingPeriods)) {
                nextUpdateWait = nextUpdateWait.sub(updatePeriod);
            }
        }
    }
    const timeRemainingUntilUpdate = nextUpdateWait.sub(timeSinceLastUpdate).isNeg() ? numericConstants_1.ZERO : nextUpdateWait.sub(timeSinceLastUpdate);
    return timeRemainingUntilUpdate;
}
exports.timeRemainingUntilUpdate = timeRemainingUntilUpdate;
const checkSameDate = (dateString1, dateString2)=>{
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);
    const isSameDate = date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
    return isSameDate;
};
exports.checkSameDate = checkSameDate;
function isBNSafe(number) {
    return number <= 0x1fffffffffffff;
}
exports.isBNSafe = isBNSafe;
/**
 * Converts a number to BN makes sure the number is safe to convert to BN (that it does not overflow number after multiplying by precision)
 * @param number the number to convert to BN
 * @param precision the BN precision to use (i.e. QUOTE_PRECISION and BASE_PRECISION from drift sdk)
 */ function numberToSafeBN(number, precision) {
    // check if number has decimals
    const candidate = number * precision.toNumber();
    if (isBNSafe(candidate)) {
        return new anchor_1.BN(candidate);
    } else {
        if (number % 1 === 0) {
            return new anchor_1.BN(number.toString()).mul(precision);
        } else {
            return new anchor_1.BN(number).mul(precision);
        }
    }
}
exports.numberToSafeBN = numberToSafeBN;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/tiers.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.perpTierIsAsSafeAs = exports.getSpotMarketTierNumber = exports.getPerpMarketTierNumber = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
function getPerpMarketTierNumber(perpMarket) {
    if ((0, types_1.isVariant)(perpMarket.contractTier, 'a')) {
        return 0;
    } else if ((0, types_1.isVariant)(perpMarket.contractTier, 'b')) {
        return 1;
    } else if ((0, types_1.isVariant)(perpMarket.contractTier, 'c')) {
        return 2;
    } else if ((0, types_1.isVariant)(perpMarket.contractTier, 'speculative')) {
        return 3;
    } else if ((0, types_1.isVariant)(perpMarket.contractTier, 'highlySpeculative')) {
        return 4;
    } else {
        return 5;
    }
}
exports.getPerpMarketTierNumber = getPerpMarketTierNumber;
function getSpotMarketTierNumber(spotMarket) {
    if ((0, types_1.isVariant)(spotMarket.assetTier, 'collateral')) {
        return 0;
    } else if ((0, types_1.isVariant)(spotMarket.assetTier, 'protected')) {
        return 1;
    } else if ((0, types_1.isVariant)(spotMarket.assetTier, 'cross')) {
        return 2;
    } else if ((0, types_1.isVariant)(spotMarket.assetTier, 'isolated')) {
        return 3;
    } else if ((0, types_1.isVariant)(spotMarket.assetTier, 'unlisted')) {
        return 4;
    } else {
        return 5;
    }
}
exports.getSpotMarketTierNumber = getSpotMarketTierNumber;
function perpTierIsAsSafeAs(perpTier, otherPerpTier, otherSpotTier) {
    const asSafeAsPerp = perpTier <= otherPerpTier;
    const asSafeAsSpot = otherSpotTier === 4 || otherSpotTier >= 2 && perpTier <= 2;
    return asSafeAsSpot && asSafeAsPerp;
}
exports.perpTierIsAsSafeAs = perpTierIsAsSafeAs;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/oracles.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMultipleBetweenOracleSources = exports.trimVaaSignatures = exports.getNewOracleConfPct = exports.calculateLiveOracleStd = exports.calculateLiveOracleTwap = exports.isOracleTooDivergent = exports.isOracleValid = exports.getOracleValidity = exports.getMaxConfidenceIntervalMultiplier = exports.oraclePriceBands = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const assert_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/assert/assert.js [app-route] (ecmascript)");
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
function oraclePriceBands(market, oraclePriceData) {
    const maxPercentDiff = market.marginRatioInitial - market.marginRatioMaintenance;
    const offset = oraclePriceData.price.mul(new anchor_1.BN(maxPercentDiff)).div(numericConstants_1.MARGIN_PRECISION);
    (0, assert_1.assert)(offset.gte(numericConstants_1.ZERO));
    return [
        oraclePriceData.price.sub(offset),
        oraclePriceData.price.add(offset)
    ];
}
exports.oraclePriceBands = oraclePriceBands;
function getMaxConfidenceIntervalMultiplier(market) {
    let maxConfidenceIntervalMultiplier;
    if ((0, types_1.isVariant)(market.contractTier, 'a')) {
        maxConfidenceIntervalMultiplier = new anchor_1.BN(1);
    } else if ((0, types_1.isVariant)(market.contractTier, 'b')) {
        maxConfidenceIntervalMultiplier = new anchor_1.BN(1);
    } else if ((0, types_1.isVariant)(market.contractTier, 'c')) {
        maxConfidenceIntervalMultiplier = new anchor_1.BN(2);
    } else if ((0, types_1.isVariant)(market.contractTier, 'speculative')) {
        maxConfidenceIntervalMultiplier = new anchor_1.BN(10);
    } else {
        maxConfidenceIntervalMultiplier = new anchor_1.BN(50);
    }
    return maxConfidenceIntervalMultiplier;
}
exports.getMaxConfidenceIntervalMultiplier = getMaxConfidenceIntervalMultiplier;
function getOracleValidity(market, oraclePriceData, oracleGuardRails, slot, oracleStalenessBuffer = numericConstants_1.FIVE) {
    const isNonPositive = oraclePriceData.price.lte(numericConstants_1.ZERO);
    const isTooVolatile = anchor_1.BN.max(oraclePriceData.price, market.amm.historicalOracleData.lastOraclePriceTwap).div(anchor_1.BN.max(numericConstants_1.ONE, anchor_1.BN.min(oraclePriceData.price, market.amm.historicalOracleData.lastOraclePriceTwap))).gt(oracleGuardRails.validity.tooVolatileRatio);
    const confPctOfPrice = oraclePriceData.confidence.mul(numericConstants_1.BID_ASK_SPREAD_PRECISION).div(oraclePriceData.price);
    const isConfTooLarge = confPctOfPrice.gt(oracleGuardRails.validity.confidenceIntervalMaxSize.mul(getMaxConfidenceIntervalMultiplier(market)));
    const oracleDelay = slot.sub(oraclePriceData.slot).sub(oracleStalenessBuffer);
    let isStaleForAmmImmediate = true;
    if (market.amm.oracleSlotDelayOverride != 0) {
        isStaleForAmmImmediate = oracleDelay.gt(anchor_1.BN.max(new anchor_1.BN(market.amm.oracleSlotDelayOverride), numericConstants_1.ZERO));
    }
    let isStaleForAmmLowRisk = false;
    if (market.amm.oracleLowRiskSlotDelayOverride != 0) {
        isStaleForAmmLowRisk = oracleDelay.gt(anchor_1.BN.max(new anchor_1.BN(market.amm.oracleLowRiskSlotDelayOverride), numericConstants_1.ZERO));
    } else {
        isStaleForAmmLowRisk = oracleDelay.gt(oracleGuardRails.validity.slotsBeforeStaleForAmm);
    }
    let isStaleForMargin = oracleDelay.gt(new anchor_1.BN(oracleGuardRails.validity.slotsBeforeStaleForMargin));
    if ((0, types_1.isOneOfVariant)(market.amm.oracleSource, [
        'pythStableCoinPull',
        'pythLazerStableCoin'
    ])) {
        isStaleForMargin = oracleDelay.gt(new anchor_1.BN(oracleGuardRails.validity.slotsBeforeStaleForMargin).muln(3));
    }
    if (isNonPositive) {
        return types_1.OracleValidity.NonPositive;
    } else if (isTooVolatile) {
        return types_1.OracleValidity.TooVolatile;
    } else if (isConfTooLarge) {
        return types_1.OracleValidity.TooUncertain;
    } else if (isStaleForMargin) {
        return types_1.OracleValidity.StaleForMargin;
    } else if (!oraclePriceData.hasSufficientNumberOfDataPoints) {
        return types_1.OracleValidity.InsufficientDataPoints;
    } else if (isStaleForAmmLowRisk) {
        return types_1.OracleValidity.StaleForAMMLowRisk;
    } else if (isStaleForAmmImmediate) {
        return types_1.OracleValidity.isStaleForAmmImmediate;
    } else {
        return types_1.OracleValidity.Valid;
    }
}
exports.getOracleValidity = getOracleValidity;
function isOracleValid(market, oraclePriceData, oracleGuardRails, slot) {
    // checks if oracle is valid for an AMM only fill
    const amm = market.amm;
    const isOraclePriceNonPositive = oraclePriceData.price.lte(numericConstants_1.ZERO);
    const isOraclePriceTooVolatile = oraclePriceData.price.div(anchor_1.BN.max(numericConstants_1.ONE, amm.historicalOracleData.lastOraclePriceTwap)).gt(oracleGuardRails.validity.tooVolatileRatio) || amm.historicalOracleData.lastOraclePriceTwap.div(anchor_1.BN.max(numericConstants_1.ONE, oraclePriceData.price)).gt(oracleGuardRails.validity.tooVolatileRatio);
    const maxConfidenceIntervalMultiplier = getMaxConfidenceIntervalMultiplier(market);
    const isConfidenceTooLarge = anchor_1.BN.max(numericConstants_1.ONE, oraclePriceData.confidence).mul(numericConstants_1.BID_ASK_SPREAD_PRECISION).div(oraclePriceData.price).gt(oracleGuardRails.validity.confidenceIntervalMaxSize.mul(maxConfidenceIntervalMultiplier));
    const oracleIsStale = new anchor_1.BN(slot).sub(oraclePriceData.slot).gt(oracleGuardRails.validity.slotsBeforeStaleForAmm);
    return !(!oraclePriceData.hasSufficientNumberOfDataPoints || oracleIsStale || isOraclePriceNonPositive || isOraclePriceTooVolatile || isConfidenceTooLarge);
}
exports.isOracleValid = isOracleValid;
function isOracleTooDivergent(amm, oraclePriceData, oracleGuardRails) {
    const oracleSpreadPct = oraclePriceData.price.sub(amm.historicalOracleData.lastOraclePriceTwap5Min).mul(numericConstants_1.PERCENTAGE_PRECISION).div(amm.historicalOracleData.lastOraclePriceTwap5Min);
    const maxDivergence = anchor_1.BN.max(oracleGuardRails.priceDivergence.oracleTwap5MinPercentDivergence, numericConstants_1.PERCENTAGE_PRECISION.div(new anchor_1.BN(2)));
    const tooDivergent = oracleSpreadPct.abs().gte(maxDivergence);
    return tooDivergent;
}
exports.isOracleTooDivergent = isOracleTooDivergent;
function calculateLiveOracleTwap(histOracleData, oraclePriceData, now, period) {
    let oracleTwap = undefined;
    if (period.eq(numericConstants_1.FIVE_MINUTE)) {
        oracleTwap = histOracleData.lastOraclePriceTwap5Min;
    } else {
        //todo: assumes its fundingPeriod (1hr)
        // period = amm.fundingPeriod;
        oracleTwap = histOracleData.lastOraclePriceTwap;
    }
    const sinceLastUpdate = anchor_1.BN.max(numericConstants_1.ONE, now.sub(histOracleData.lastOraclePriceTwapTs));
    const sinceStart = anchor_1.BN.max(numericConstants_1.ZERO, period.sub(sinceLastUpdate));
    const clampRange = oracleTwap.div(new anchor_1.BN(3));
    const clampedOraclePrice = anchor_1.BN.min(oracleTwap.add(clampRange), anchor_1.BN.max(oraclePriceData.price, oracleTwap.sub(clampRange)));
    const newOracleTwap = oracleTwap.mul(sinceStart).add(clampedOraclePrice.mul(sinceLastUpdate)).div(sinceStart.add(sinceLastUpdate));
    return newOracleTwap;
}
exports.calculateLiveOracleTwap = calculateLiveOracleTwap;
function calculateLiveOracleStd(amm, oraclePriceData, now) {
    const sinceLastUpdate = anchor_1.BN.max(numericConstants_1.ONE, now.sub(amm.historicalOracleData.lastOraclePriceTwapTs));
    const sinceStart = anchor_1.BN.max(numericConstants_1.ZERO, amm.fundingPeriod.sub(sinceLastUpdate));
    const liveOracleTwap = calculateLiveOracleTwap(amm.historicalOracleData, oraclePriceData, now, amm.fundingPeriod);
    const liveOracleTwap5MIN = calculateLiveOracleTwap(amm.historicalOracleData, oraclePriceData, now, numericConstants_1.FIVE_MINUTE);
    const priceDeltaVsTwap = anchor_1.BN.max(oraclePriceData.price.sub(liveOracleTwap).abs(), oraclePriceData.price.sub(liveOracleTwap5MIN).abs());
    const oracleStd = priceDeltaVsTwap.add(amm.oracleStd.mul(sinceStart).div(sinceStart.add(sinceLastUpdate)));
    return oracleStd;
}
exports.calculateLiveOracleStd = calculateLiveOracleStd;
function getNewOracleConfPct(amm, oraclePriceData, reservePrice, now) {
    const confInterval = oraclePriceData.confidence || numericConstants_1.ZERO;
    const sinceLastUpdate = anchor_1.BN.max(numericConstants_1.ZERO, now.sub(amm.historicalOracleData.lastOraclePriceTwapTs));
    let lowerBoundConfPct = amm.lastOracleConfPct;
    if (sinceLastUpdate.gt(numericConstants_1.ZERO)) {
        const lowerBoundConfDivisor = anchor_1.BN.max(new anchor_1.BN(21).sub(sinceLastUpdate), new anchor_1.BN(5));
        lowerBoundConfPct = amm.lastOracleConfPct.sub(amm.lastOracleConfPct.div(lowerBoundConfDivisor));
    }
    const confIntervalPct = confInterval.mul(numericConstants_1.BID_ASK_SPREAD_PRECISION).div(reservePrice);
    const confIntervalPctResult = anchor_1.BN.max(confIntervalPct, lowerBoundConfPct);
    return confIntervalPctResult;
}
exports.getNewOracleConfPct = getNewOracleConfPct;
function trimVaaSignatures(vaa, n = 3) {
    const currentNumSignatures = vaa[5];
    if (n > currentNumSignatures) {
        throw new Error("Resulting VAA can't have more signatures than the original VAA");
    }
    const trimmedVaa = Buffer.concat([
        vaa.subarray(0, 6 + n * 66),
        vaa.subarray(6 + currentNumSignatures * 66)
    ]);
    trimmedVaa[5] = n;
    return trimmedVaa;
}
exports.trimVaaSignatures = trimVaaSignatures;
function getMultipleBetweenOracleSources(firstOracleSource, secondOracleSource) {
    if ((0, types_1.isVariant)(firstOracleSource, 'pythPull') && (0, types_1.isVariant)(secondOracleSource, 'pyth1MPull')) {
        return {
            numerator: new anchor_1.BN(1000000),
            denominator: new anchor_1.BN(1)
        };
    }
    if ((0, types_1.isVariant)(firstOracleSource, 'pythPull') && (0, types_1.isVariant)(secondOracleSource, 'pyth1KPull')) {
        return {
            numerator: new anchor_1.BN(1000),
            denominator: new anchor_1.BN(1)
        };
    }
    if ((0, types_1.isVariant)(firstOracleSource, 'pyth1MPull') && (0, types_1.isVariant)(secondOracleSource, 'pythPull')) {
        return {
            numerator: new anchor_1.BN(1),
            denominator: new anchor_1.BN(1000000)
        };
    }
    if ((0, types_1.isVariant)(firstOracleSource, 'pyth1KPull') && (0, types_1.isVariant)(secondOracleSource, 'pythPull')) {
        return {
            numerator: new anchor_1.BN(1),
            denominator: new anchor_1.BN(1000)
        };
    }
    if ((0, types_1.isVariant)(firstOracleSource, 'pythLazer') && (0, types_1.isVariant)(secondOracleSource, 'pythLazer1M')) {
        return {
            numerator: new anchor_1.BN(1000000),
            denominator: new anchor_1.BN(1)
        };
    }
    if ((0, types_1.isVariant)(firstOracleSource, 'pythLazer') && (0, types_1.isVariant)(secondOracleSource, 'pythLazer1K')) {
        return {
            numerator: new anchor_1.BN(1000),
            denominator: new anchor_1.BN(1)
        };
    }
    if ((0, types_1.isVariant)(firstOracleSource, 'pythLazer1M') && (0, types_1.isVariant)(secondOracleSource, 'pythLazer')) {
        return {
            numerator: new anchor_1.BN(1),
            denominator: new anchor_1.BN(1000000)
        };
    }
    if ((0, types_1.isVariant)(firstOracleSource, 'pythLazer1K') && (0, types_1.isVariant)(secondOracleSource, 'pythLazer')) {
        return {
            numerator: new anchor_1.BN(1),
            denominator: new anchor_1.BN(1000)
        };
    }
    return {
        numerator: new anchor_1.BN(1),
        denominator: new anchor_1.BN(1)
    };
}
exports.getMultipleBetweenOracleSources = getMultipleBetweenOracleSources;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/exchangeStatus.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isAmmDrawdownPause = exports.isOperationPaused = exports.ammPaused = exports.fillPaused = exports.exchangePaused = void 0;
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
function exchangePaused(state) {
    return state.exchangeStatus !== types_1.ExchangeStatus.ACTIVE;
}
exports.exchangePaused = exchangePaused;
function fillPaused(state, market) {
    if ((state.exchangeStatus & types_1.ExchangeStatus.FILL_PAUSED) === types_1.ExchangeStatus.FILL_PAUSED) {
        return true;
    }
    if (market.hasOwnProperty('amm')) {
        return isOperationPaused(market.pausedOperations, types_1.PerpOperation.FILL);
    } else {
        return isOperationPaused(market.pausedOperations, types_1.SpotOperation.FILL);
    }
}
exports.fillPaused = fillPaused;
function ammPaused(state, market) {
    if ((state.exchangeStatus & types_1.ExchangeStatus.AMM_PAUSED) === types_1.ExchangeStatus.AMM_PAUSED) {
        return true;
    }
    if (market.hasOwnProperty('amm')) {
        const operationPaused = isOperationPaused(market.pausedOperations, types_1.PerpOperation.AMM_FILL);
        if (operationPaused) {
            return true;
        }
        if (isAmmDrawdownPause(market)) {
            return true;
        }
    }
    return false;
}
exports.ammPaused = ammPaused;
function isOperationPaused(pausedOperations, operation) {
    return (pausedOperations & operation) > 0;
}
exports.isOperationPaused = isOperationPaused;
function isAmmDrawdownPause(market) {
    let quoteDrawdownLimitBreached;
    if ((0, types_1.isVariant)(market.contractTier, 'a') || (0, types_1.isVariant)(market.contractTier, 'b')) {
        quoteDrawdownLimitBreached = market.amm.netRevenueSinceLastFunding.lte(numericConstants_1.DEFAULT_REVENUE_SINCE_LAST_FUNDING_SPREAD_RETREAT.muln(400));
    } else {
        quoteDrawdownLimitBreached = market.amm.netRevenueSinceLastFunding.lte(numericConstants_1.DEFAULT_REVENUE_SINCE_LAST_FUNDING_SPREAD_RETREAT.muln(200));
    }
    if (quoteDrawdownLimitBreached) {
        const percentDrawdown = market.amm.netRevenueSinceLastFunding.mul(numericConstants_1.PERCENTAGE_PRECISION).div(anchor_1.BN.max(market.amm.totalFeeMinusDistributions, numericConstants_1.ONE));
        let percentDrawdownLimitBreached;
        if ((0, types_1.isVariant)(market.contractTier, 'a')) {
            percentDrawdownLimitBreached = percentDrawdown.lte(numericConstants_1.PERCENTAGE_PRECISION.divn(50).neg());
        } else if ((0, types_1.isVariant)(market.contractTier, 'b')) {
            percentDrawdownLimitBreached = percentDrawdown.lte(numericConstants_1.PERCENTAGE_PRECISION.divn(33).neg());
        } else if ((0, types_1.isVariant)(market.contractTier, 'c')) {
            percentDrawdownLimitBreached = percentDrawdown.lte(numericConstants_1.PERCENTAGE_PRECISION.divn(25).neg());
        } else {
            percentDrawdownLimitBreached = percentDrawdown.lte(numericConstants_1.PERCENTAGE_PRECISION.divn(20).neg());
        }
        if (percentDrawdownLimitBreached) {
            return true;
        }
    }
    return false;
}
exports.isAmmDrawdownPause = isAmmDrawdownPause;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/auction.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getTriggerAuctionStartAndExecutionPrice = exports.getTriggerAuctionStartPrice = exports.deriveOracleAuctionParams = exports.getAuctionPriceForOracleOffsetAuction = exports.getAuctionPriceForFixedAuction = exports.getAuctionPrice = exports.isFallbackAvailableLiquiditySource = exports.isAuctionComplete = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const types_2 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const tiers_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/tiers.js [app-route] (ecmascript)");
const orders_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/orders.js [app-route] (ecmascript)");
const oracles_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/oracles.js [app-route] (ecmascript)");
const exchangeStatus_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/exchangeStatus.js [app-route] (ecmascript)");
function isAuctionComplete(order, slot) {
    if (order.auctionDuration === 0) {
        return true;
    }
    return new anchor_1.BN(slot).sub(order.slot).gt(new anchor_1.BN(order.auctionDuration));
}
exports.isAuctionComplete = isAuctionComplete;
function isFallbackAvailableLiquiditySource(order, mmOraclePriceData, slot, state, market, isLiquidation) {
    if ((0, exchangeStatus_1.isOperationPaused)(market.pausedOperations, types_1.PerpOperation.AMM_FILL)) {
        return false;
    }
    // TODO: include too much drawdown check & mm oracle volatility
    const oracleValidity = (0, oracles_1.getOracleValidity)(market, {
        price: mmOraclePriceData.price,
        slot: mmOraclePriceData.slot,
        confidence: mmOraclePriceData.confidence,
        hasSufficientNumberOfDataPoints: mmOraclePriceData.hasSufficientNumberOfDataPoints
    }, state.oracleGuardRails, new anchor_1.BN(slot));
    if (oracleValidity <= types_1.OracleValidity.StaleForAMMLowRisk) {
        return false;
    }
    if (oracleValidity == types_1.OracleValidity.Valid) {
        return true;
    }
    const isOrderLowRiskForAmm = (0, orders_1.isLowRiskForAmm)(order, mmOraclePriceData, isLiquidation);
    if (!isOrderLowRiskForAmm) {
        return false;
    } else {
        return true;
    }
}
exports.isFallbackAvailableLiquiditySource = isFallbackAvailableLiquiditySource;
/**
 *
 * @param order
 * @param slot
 * @param oraclePrice Use MMOraclePriceData source for perp orders, OraclePriceData for spot
 * @returns BN
 */ function getAuctionPrice(order, slot, oraclePrice) {
    if ((0, types_1.isOneOfVariant)(order.orderType, [
        'market',
        'triggerLimit'
    ]) || (0, types_1.isVariant)(order.orderType, 'triggerMarket') && (order.bitFlags & types_2.OrderBitFlag.OracleTriggerMarket) === 0) {
        return getAuctionPriceForFixedAuction(order, slot);
    } else if ((0, types_1.isVariant)(order.orderType, 'limit')) {
        if (order.oraclePriceOffset != null && order.oraclePriceOffset !== 0) {
            return getAuctionPriceForOracleOffsetAuction(order, slot, oraclePrice);
        } else {
            return getAuctionPriceForFixedAuction(order, slot);
        }
    } else if ((0, types_1.isVariant)(order.orderType, 'oracle') || (0, types_1.isVariant)(order.orderType, 'triggerMarket') && (order.bitFlags & types_2.OrderBitFlag.OracleTriggerMarket) !== 0) {
        return getAuctionPriceForOracleOffsetAuction(order, slot, oraclePrice);
    } else {
        throw Error(`Cant get auction price for order type ${(0, types_2.getVariant)(order.orderType)}`);
    }
}
exports.getAuctionPrice = getAuctionPrice;
function getAuctionPriceForFixedAuction(order, slot) {
    const slotsElapsed = new anchor_1.BN(slot).sub(order.slot);
    const deltaDenominator = new anchor_1.BN(order.auctionDuration);
    const deltaNumerator = anchor_1.BN.min(slotsElapsed, deltaDenominator);
    if (deltaDenominator.eq(numericConstants_1.ZERO)) {
        return order.auctionEndPrice;
    }
    let priceDelta;
    if ((0, types_1.isVariant)(order.direction, 'long')) {
        priceDelta = order.auctionEndPrice.sub(order.auctionStartPrice).mul(deltaNumerator).div(deltaDenominator);
    } else {
        priceDelta = order.auctionStartPrice.sub(order.auctionEndPrice).mul(deltaNumerator).div(deltaDenominator);
    }
    let price;
    if ((0, types_1.isVariant)(order.direction, 'long')) {
        price = order.auctionStartPrice.add(priceDelta);
    } else {
        price = order.auctionStartPrice.sub(priceDelta);
    }
    return price;
}
exports.getAuctionPriceForFixedAuction = getAuctionPriceForFixedAuction;
/**
 *
 * @param order
 * @param slot
 * @param oraclePrice Use MMOraclePriceData source for perp orders, OraclePriceData for spot
 * @returns
 */ function getAuctionPriceForOracleOffsetAuction(order, slot, oraclePrice) {
    const slotsElapsed = new anchor_1.BN(slot).sub(order.slot);
    const deltaDenominator = new anchor_1.BN(order.auctionDuration);
    const deltaNumerator = anchor_1.BN.min(slotsElapsed, deltaDenominator);
    if (deltaDenominator.eq(numericConstants_1.ZERO)) {
        return anchor_1.BN.max(oraclePrice.add(order.auctionEndPrice), numericConstants_1.ONE);
    }
    let priceOffsetDelta;
    if ((0, types_1.isVariant)(order.direction, 'long')) {
        priceOffsetDelta = order.auctionEndPrice.sub(order.auctionStartPrice).mul(deltaNumerator).div(deltaDenominator);
    } else {
        priceOffsetDelta = order.auctionStartPrice.sub(order.auctionEndPrice).mul(deltaNumerator).div(deltaDenominator);
    }
    let priceOffset;
    if ((0, types_1.isVariant)(order.direction, 'long')) {
        priceOffset = order.auctionStartPrice.add(priceOffsetDelta);
    } else {
        priceOffset = order.auctionStartPrice.sub(priceOffsetDelta);
    }
    return anchor_1.BN.max(oraclePrice.add(priceOffset), numericConstants_1.ONE);
}
exports.getAuctionPriceForOracleOffsetAuction = getAuctionPriceForOracleOffsetAuction;
function deriveOracleAuctionParams({ direction, oraclePrice, auctionStartPrice, auctionEndPrice, limitPrice, auctionPriceCaps }) {
    let oraclePriceOffset;
    if (limitPrice.eq(numericConstants_1.ZERO) || oraclePrice.eq(numericConstants_1.ZERO)) {
        oraclePriceOffset = numericConstants_1.ZERO;
    } else {
        oraclePriceOffset = limitPrice.sub(oraclePrice);
    }
    if (oraclePriceOffset.eq(numericConstants_1.ZERO)) {
        oraclePriceOffset = (0, types_1.isVariant)(direction, 'long') ? auctionEndPrice.sub(oraclePrice).add(numericConstants_1.ONE) : auctionEndPrice.sub(oraclePrice).sub(numericConstants_1.ONE);
    }
    let oraclePriceOffsetNum;
    try {
        oraclePriceOffsetNum = oraclePriceOffset.toNumber();
    } catch (e) {
        oraclePriceOffsetNum = 0;
    }
    if (auctionPriceCaps) {
        auctionStartPrice = anchor_1.BN.min(anchor_1.BN.max(auctionStartPrice, auctionPriceCaps.min), auctionPriceCaps.max);
        auctionEndPrice = anchor_1.BN.min(anchor_1.BN.max(auctionEndPrice, auctionPriceCaps.min), auctionPriceCaps.max);
    }
    return {
        auctionStartPrice: auctionStartPrice.sub(oraclePrice),
        auctionEndPrice: auctionEndPrice.sub(oraclePrice),
        oraclePriceOffset: oraclePriceOffsetNum
    };
}
exports.deriveOracleAuctionParams = deriveOracleAuctionParams;
/**
 *
 * @param params Use OraclePriceData.price for oraclePrice param
 * @returns
 */ function getTriggerAuctionStartPrice(params) {
    const { perpMarket, direction, oraclePrice, limitPrice } = params;
    const twapMismatch = perpMarket.amm.historicalOracleData.lastOraclePriceTwapTs.sub(perpMarket.amm.lastMarkPriceTwapTs).abs().gte(new anchor_1.BN(60)) || perpMarket.amm.volume24H.lte(new anchor_1.BN(100000).mul(numericConstants_1.QUOTE_PRECISION));
    let baselineStartOffset;
    if (twapMismatch) {
        const contractTierNumber = (0, tiers_1.getPerpMarketTierNumber)(perpMarket);
        const priceDivisor = contractTierNumber <= 1 ? 500 : 100;
        baselineStartOffset = (0, types_1.isVariant)(direction, 'long') ? perpMarket.amm.lastBidPriceTwap.divn(priceDivisor) : perpMarket.amm.lastAskPriceTwap.divn(priceDivisor).neg();
    } else {
        const markTwapSlow = (0, types_1.isVariant)(direction, 'long') ? perpMarket.amm.lastBidPriceTwap : perpMarket.amm.lastAskPriceTwap;
        const markTwapFast = perpMarket.amm.lastMarkPriceTwap5Min;
        const oracleTwapSlow = perpMarket.amm.historicalOracleData.lastOraclePriceTwap;
        const oracleTwapFast = perpMarket.amm.historicalOracleData.lastOraclePriceTwap5Min;
        const offsetSlow = markTwapSlow.sub(oracleTwapSlow);
        const offsetFast = markTwapFast.sub(oracleTwapFast);
        const fracOfLongSpreadInPrice = new anchor_1.BN(perpMarket.amm.longSpread).mul(markTwapSlow).div(numericConstants_1.PRICE_PRECISION.muln(10)); // divide by 10x for safety
        const fracOfShortSpreadInPrice = new anchor_1.BN(perpMarket.amm.shortSpread).mul(markTwapSlow).div(numericConstants_1.PRICE_PRECISION.muln(10)); // divide by 10x for safety
        baselineStartOffset = (0, types_1.isVariant)(direction, 'long') ? anchor_1.BN.min(offsetSlow.add(fracOfLongSpreadInPrice), offsetFast.sub(fracOfShortSpreadInPrice)) : anchor_1.BN.max(offsetSlow.sub(fracOfShortSpreadInPrice), offsetFast.add(fracOfLongSpreadInPrice));
    }
    let startBuffer = -3500;
    if ((0, types_1.isVariant)(perpMarket.contractTier, 'a') || (0, types_1.isVariant)(perpMarket.contractTier, 'b')) {
        startBuffer = -500;
    }
    // Apply start buffer (in BPS)
    const startBufferPrice = oraclePrice.mul(new anchor_1.BN(startBuffer)).div(new anchor_1.BN(numericConstants_1.PRICE_PRECISION));
    let auctionStartPrice = (0, types_1.isVariant)(direction, 'long') ? oraclePrice.add(baselineStartOffset).sub(startBufferPrice) : oraclePrice.add(baselineStartOffset).add(startBufferPrice);
    if (limitPrice) {
        if ((0, types_1.isVariant)(direction, 'long')) {
            auctionStartPrice = anchor_1.BN.min(auctionStartPrice, limitPrice);
        } else {
            auctionStartPrice = anchor_1.BN.max(auctionStartPrice, limitPrice);
        }
    }
    return auctionStartPrice;
}
exports.getTriggerAuctionStartPrice = getTriggerAuctionStartPrice;
/**
 *
 * @param params Use OraclePriceData.price for oraclePrice param and MMOraclePriceData.price for mmOraclePrice
 * @returns
 */ function getTriggerAuctionStartAndExecutionPrice(params) {
    const { perpMarket, direction, oraclePrice, limitPrice, mmOraclePrice } = params;
    const startPrice = getTriggerAuctionStartPrice({
        perpMarket,
        direction,
        oraclePrice,
        limitPrice
    });
    const offsetPlusBuffer = startPrice.sub(oraclePrice);
    let executionPrice = mmOraclePrice.add(offsetPlusBuffer);
    if (limitPrice) {
        if ((0, types_1.isVariant)(direction, 'long')) {
            executionPrice = anchor_1.BN.min(executionPrice, limitPrice);
        } else {
            executionPrice = anchor_1.BN.max(executionPrice, limitPrice);
        }
    }
    return {
        startPrice,
        executionPrice
    };
}
exports.getTriggerAuctionStartAndExecutionPrice = getTriggerAuctionStartAndExecutionPrice;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/spotBalance.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSpotLiabilityValue = exports.getSpotAssetValue = exports.calculateWithdrawLimit = exports.calculateTokenUtilizationLimits = exports.calculateInterestAccumulated = exports.calculateBorrowRate = exports.calculateDepositRate = exports.calculateInterestRate = exports.calculateSpotMarketBorrowCapacity = exports.calculateUtilization = exports.calculateLiabilityWeight = exports.calculateScaledInitialAssetWeight = exports.calculateAssetWeight = exports.getTokenValue = exports.getStrictTokenValue = exports.getSignedTokenAmount = exports.getTokenAmount = exports.getBalance = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const margin_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/margin.js [app-route] (ecmascript)");
const numericConstants_2 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/utils.js [app-route] (ecmascript)");
/**
 * Calculates the balance of a given token amount including any accumulated interest. This
 * is the same as `SpotPosition.scaledBalance`.
 *
 * @param {BN} tokenAmount - the amount of tokens
 * @param {SpotMarketAccount} spotMarket - the spot market account
 * @param {SpotBalanceType} balanceType - the balance type ('deposit' or 'borrow')
 * @return {BN} the calculated balance, scaled by `SPOT_MARKET_BALANCE_PRECISION`
 */ function getBalance(tokenAmount, spotMarket, balanceType) {
    const precisionIncrease = numericConstants_1.TEN.pow(new anchor_1.BN(19 - spotMarket.decimals));
    const cumulativeInterest = (0, types_1.isVariant)(balanceType, 'deposit') ? spotMarket.cumulativeDepositInterest : spotMarket.cumulativeBorrowInterest;
    let balance = tokenAmount.mul(precisionIncrease).div(cumulativeInterest);
    if (!balance.eq(numericConstants_1.ZERO) && (0, types_1.isVariant)(balanceType, 'borrow')) {
        balance = balance.add(numericConstants_1.ONE);
    }
    return balance;
}
exports.getBalance = getBalance;
/**
 * Calculates the spot token amount including any accumulated interest.
 *
 * @param {BN} balanceAmount - The balance amount, typically from `SpotPosition.scaledBalance`
 * @param {SpotMarketAccount} spotMarket - The spot market account details
 * @param {SpotBalanceType} balanceType - The balance type to be used for calculation
 * @returns {BN} The calculated token amount, scaled by `SpotMarketConfig.precision`
 */ function getTokenAmount(balanceAmount, spotMarket, balanceType) {
    const precisionDecrease = numericConstants_1.TEN.pow(new anchor_1.BN(19 - spotMarket.decimals));
    if ((0, types_1.isVariant)(balanceType, 'deposit')) {
        return balanceAmount.mul(spotMarket.cumulativeDepositInterest).div(precisionDecrease);
    } else {
        return (0, utils_1.divCeil)(balanceAmount.mul(spotMarket.cumulativeBorrowInterest), precisionDecrease);
    }
}
exports.getTokenAmount = getTokenAmount;
/**
 * Returns the signed (positive for deposit,negative for borrow) token amount based on the balance type.
 *
 * @param {BN} tokenAmount - The token amount to convert (from `getTokenAmount`)
 * @param {SpotBalanceType} balanceType - The balance type to determine the sign of the token amount.
 * @returns {BN} - The signed token amount, scaled by `SpotMarketConfig.precision`
 */ function getSignedTokenAmount(tokenAmount, balanceType) {
    if ((0, types_1.isVariant)(balanceType, 'deposit')) {
        return tokenAmount;
    } else {
        return tokenAmount.abs().neg();
    }
}
exports.getSignedTokenAmount = getSignedTokenAmount;
/**
 * Calculates the value of a given token amount using the worst of the provided oracle price and its TWAP.
 *
 * @param {BN} tokenAmount - The amount of tokens to calculate the value for (from `getTokenAmount`)
 * @param {number} spotDecimals - The number of decimals in the token.
 * @param {StrictOraclePrice} strictOraclePrice - Contains oracle price and 5min twap.
 * @return {BN} The calculated value of the given token amount, scaled by `PRICE_PRECISION`
 */ function getStrictTokenValue(tokenAmount, spotDecimals, strictOraclePrice) {
    if (tokenAmount.eq(numericConstants_1.ZERO)) {
        return numericConstants_1.ZERO;
    }
    let price;
    if (tokenAmount.gte(numericConstants_1.ZERO)) {
        price = strictOraclePrice.min();
    } else {
        price = strictOraclePrice.max();
    }
    const precisionDecrease = numericConstants_1.TEN.pow(new anchor_1.BN(spotDecimals));
    return tokenAmount.mul(price).div(precisionDecrease);
}
exports.getStrictTokenValue = getStrictTokenValue;
/**
 * Calculates the value of a given token amount in relation to an oracle price data
 *
 * @param {BN} tokenAmount - The amount of tokens to calculate the value for (from `getTokenAmount`)
 * @param {number} spotDecimals - The number of decimal places of the token.
 * @param {OraclePriceData} oraclePriceData - The oracle price data (typically a token/USD oracle).
 * @return {BN} The value of the token based on the oracle, scaled by `PRICE_PRECISION`
 */ function getTokenValue(tokenAmount, spotDecimals, oraclePriceData) {
    if (tokenAmount.eq(numericConstants_1.ZERO)) {
        return numericConstants_1.ZERO;
    }
    const precisionDecrease = numericConstants_1.TEN.pow(new anchor_1.BN(spotDecimals));
    return tokenAmount.mul(oraclePriceData.price).div(precisionDecrease);
}
exports.getTokenValue = getTokenValue;
function calculateAssetWeight(balanceAmount, oraclePrice, spotMarket, marginCategory) {
    const sizePrecision = numericConstants_1.TEN.pow(new anchor_1.BN(spotMarket.decimals));
    let sizeInAmmReservePrecision;
    if (sizePrecision.gt(numericConstants_1.AMM_RESERVE_PRECISION)) {
        sizeInAmmReservePrecision = balanceAmount.div(sizePrecision.div(numericConstants_1.AMM_RESERVE_PRECISION));
    } else {
        sizeInAmmReservePrecision = balanceAmount.mul(numericConstants_1.AMM_RESERVE_PRECISION).div(sizePrecision);
    }
    let assetWeight;
    switch(marginCategory){
        case 'Initial':
            assetWeight = (0, margin_1.calculateSizeDiscountAssetWeight)(sizeInAmmReservePrecision, new anchor_1.BN(spotMarket.imfFactor), calculateScaledInitialAssetWeight(spotMarket, oraclePrice));
            break;
        case 'Maintenance':
            assetWeight = (0, margin_1.calculateSizeDiscountAssetWeight)(sizeInAmmReservePrecision, new anchor_1.BN(spotMarket.imfFactor), new anchor_1.BN(spotMarket.maintenanceAssetWeight));
            break;
        default:
            assetWeight = calculateScaledInitialAssetWeight(spotMarket, oraclePrice);
            break;
    }
    return assetWeight;
}
exports.calculateAssetWeight = calculateAssetWeight;
function calculateScaledInitialAssetWeight(spotMarket, oraclePrice) {
    if (spotMarket.scaleInitialAssetWeightStart.eq(numericConstants_1.ZERO)) {
        return new anchor_1.BN(spotMarket.initialAssetWeight);
    }
    const deposits = getTokenAmount(spotMarket.depositBalance, spotMarket, types_1.SpotBalanceType.DEPOSIT);
    const depositsValue = getTokenValue(deposits, spotMarket.decimals, {
        price: oraclePrice
    });
    if (depositsValue.lt(spotMarket.scaleInitialAssetWeightStart)) {
        return new anchor_1.BN(spotMarket.initialAssetWeight);
    } else {
        return new anchor_1.BN(spotMarket.initialAssetWeight).mul(spotMarket.scaleInitialAssetWeightStart).div(depositsValue);
    }
}
exports.calculateScaledInitialAssetWeight = calculateScaledInitialAssetWeight;
function calculateLiabilityWeight(size, spotMarket, marginCategory) {
    const sizePrecision = numericConstants_1.TEN.pow(new anchor_1.BN(spotMarket.decimals));
    let sizeInAmmReservePrecision;
    if (sizePrecision.gt(numericConstants_1.AMM_RESERVE_PRECISION)) {
        sizeInAmmReservePrecision = size.div(sizePrecision.div(numericConstants_1.AMM_RESERVE_PRECISION));
    } else {
        sizeInAmmReservePrecision = size.mul(numericConstants_1.AMM_RESERVE_PRECISION).div(sizePrecision);
    }
    let liabilityWeight;
    switch(marginCategory){
        case 'Initial':
            liabilityWeight = (0, margin_1.calculateSizePremiumLiabilityWeight)(sizeInAmmReservePrecision, new anchor_1.BN(spotMarket.imfFactor), new anchor_1.BN(spotMarket.initialLiabilityWeight), numericConstants_1.SPOT_MARKET_WEIGHT_PRECISION);
            break;
        case 'Maintenance':
            liabilityWeight = (0, margin_1.calculateSizePremiumLiabilityWeight)(sizeInAmmReservePrecision, new anchor_1.BN(spotMarket.imfFactor), new anchor_1.BN(spotMarket.maintenanceLiabilityWeight), numericConstants_1.SPOT_MARKET_WEIGHT_PRECISION);
            break;
        default:
            liabilityWeight = new anchor_1.BN(spotMarket.initialLiabilityWeight);
            break;
    }
    return liabilityWeight;
}
exports.calculateLiabilityWeight = calculateLiabilityWeight;
function calculateUtilization(bank, delta = numericConstants_1.ZERO) {
    let tokenDepositAmount = getTokenAmount(bank.depositBalance, bank, types_1.SpotBalanceType.DEPOSIT);
    let tokenBorrowAmount = getTokenAmount(bank.borrowBalance, bank, types_1.SpotBalanceType.BORROW);
    if (delta.gt(numericConstants_1.ZERO)) {
        tokenDepositAmount = tokenDepositAmount.add(delta);
    } else if (delta.lt(numericConstants_1.ZERO)) {
        tokenBorrowAmount = tokenBorrowAmount.add(delta.abs());
    }
    let utilization;
    if (tokenBorrowAmount.eq(numericConstants_1.ZERO) && tokenDepositAmount.eq(numericConstants_1.ZERO)) {
        utilization = numericConstants_1.ZERO;
    } else if (tokenDepositAmount.eq(numericConstants_1.ZERO)) {
        utilization = numericConstants_1.SPOT_MARKET_UTILIZATION_PRECISION;
    } else {
        utilization = tokenBorrowAmount.mul(numericConstants_1.SPOT_MARKET_UTILIZATION_PRECISION).div(tokenDepositAmount);
    }
    return utilization;
}
exports.calculateUtilization = calculateUtilization;
/**
 * calculates max borrow amount where rate would stay below targetBorrowRate
 * @param spotMarketAccount
 * @param targetBorrowRate
 * @returns : Precision: TOKEN DECIMALS
 */ function calculateSpotMarketBorrowCapacity(spotMarketAccount, targetBorrowRate) {
    const currentBorrowRate = calculateBorrowRate(spotMarketAccount);
    const tokenDepositAmount = getTokenAmount(spotMarketAccount.depositBalance, spotMarketAccount, types_1.SpotBalanceType.DEPOSIT);
    const tokenBorrowAmount = getTokenAmount(spotMarketAccount.borrowBalance, spotMarketAccount, types_1.SpotBalanceType.BORROW);
    let targetUtilization;
    // target utilization past mid point
    if (targetBorrowRate.gte(new anchor_1.BN(spotMarketAccount.optimalBorrowRate))) {
        const borrowRateSlope = new anchor_1.BN(spotMarketAccount.maxBorrowRate - spotMarketAccount.optimalBorrowRate).mul(numericConstants_1.SPOT_MARKET_UTILIZATION_PRECISION).div(numericConstants_1.SPOT_MARKET_UTILIZATION_PRECISION.sub(new anchor_1.BN(spotMarketAccount.optimalUtilization)));
        const surplusTargetUtilization = targetBorrowRate.sub(new anchor_1.BN(spotMarketAccount.optimalBorrowRate)).mul(numericConstants_1.SPOT_MARKET_UTILIZATION_PRECISION).div(borrowRateSlope);
        targetUtilization = surplusTargetUtilization.add(new anchor_1.BN(spotMarketAccount.optimalUtilization));
    } else {
        const borrowRateSlope = new anchor_1.BN(spotMarketAccount.optimalBorrowRate).mul(numericConstants_1.SPOT_MARKET_UTILIZATION_PRECISION).div(new anchor_1.BN(spotMarketAccount.optimalUtilization));
        targetUtilization = targetBorrowRate.mul(numericConstants_1.SPOT_MARKET_UTILIZATION_PRECISION).div(borrowRateSlope);
    }
    const totalCapacity = tokenDepositAmount.mul(targetUtilization).div(numericConstants_1.SPOT_MARKET_UTILIZATION_PRECISION);
    let remainingCapacity;
    if (currentBorrowRate.gte(targetBorrowRate)) {
        remainingCapacity = numericConstants_1.ZERO;
    } else {
        remainingCapacity = anchor_1.BN.max(numericConstants_1.ZERO, totalCapacity.sub(tokenBorrowAmount));
    }
    if (spotMarketAccount.maxTokenBorrowsFraction > 0) {
        const maxTokenBorrows = spotMarketAccount.maxTokenDeposits.mul(new anchor_1.BN(spotMarketAccount.maxTokenBorrowsFraction)).divn(10000);
        remainingCapacity = anchor_1.BN.min(remainingCapacity, anchor_1.BN.max(numericConstants_1.ZERO, maxTokenBorrows.sub(tokenBorrowAmount)));
    }
    return {
        totalCapacity,
        remainingCapacity
    };
}
exports.calculateSpotMarketBorrowCapacity = calculateSpotMarketBorrowCapacity;
function calculateInterestRate(bank, delta = numericConstants_1.ZERO, currentUtilization = null) {
    // todo: ensure both a delta and current util aren't pass?
    const utilization = currentUtilization || calculateUtilization(bank, delta);
    const optimalUtil = new anchor_1.BN(bank.optimalUtilization);
    const optimalRate = new anchor_1.BN(bank.optimalBorrowRate);
    const maxRate = new anchor_1.BN(bank.maxBorrowRate);
    const minRate = new anchor_1.BN(bank.minBorrowRate).mul(numericConstants_2.PERCENTAGE_PRECISION.divn(200));
    const weightsDivisor = new anchor_1.BN(1000);
    const segments = [
        [
            new anchor_1.BN(850000),
            new anchor_1.BN(50)
        ],
        [
            new anchor_1.BN(900000),
            new anchor_1.BN(100)
        ],
        [
            new anchor_1.BN(950000),
            new anchor_1.BN(150)
        ],
        [
            new anchor_1.BN(990000),
            new anchor_1.BN(200)
        ],
        [
            new anchor_1.BN(995000),
            new anchor_1.BN(250)
        ],
        [
            numericConstants_1.SPOT_MARKET_UTILIZATION_PRECISION,
            new anchor_1.BN(250)
        ]
    ];
    let rate;
    if (utilization.lte(optimalUtil)) {
        // below optimal: linear ramp from 0 to optimalRate
        const slope = optimalRate.mul(numericConstants_1.SPOT_MARKET_UTILIZATION_PRECISION).div(optimalUtil);
        rate = utilization.mul(slope).div(numericConstants_1.SPOT_MARKET_UTILIZATION_PRECISION);
    } else {
        // above optimal: piecewise segments
        const totalExtraRate = maxRate.sub(optimalRate);
        rate = optimalRate.clone();
        let prevUtil = optimalUtil.clone();
        for (const [bp, weight] of segments){
            const segmentEnd = bp.gt(numericConstants_1.SPOT_MARKET_UTILIZATION_PRECISION) ? numericConstants_1.SPOT_MARKET_UTILIZATION_PRECISION : bp;
            const segmentRange = segmentEnd.sub(prevUtil);
            const segmentRateTotal = totalExtraRate.mul(weight).div(weightsDivisor);
            if (utilization.lte(segmentEnd)) {
                const partialUtil = utilization.sub(prevUtil);
                const partialRate = segmentRateTotal.mul(partialUtil).div(segmentRange);
                rate = rate.add(partialRate);
                break;
            } else {
                rate = rate.add(segmentRateTotal);
                prevUtil = segmentEnd;
            }
        }
    }
    return anchor_1.BN.max(minRate, rate);
}
exports.calculateInterestRate = calculateInterestRate;
function calculateDepositRate(bank, delta = numericConstants_1.ZERO, currentUtilization = null) {
    // positive delta => adding to deposit
    // negative delta => adding to borrow
    const utilization = currentUtilization || calculateUtilization(bank, delta);
    const borrowRate = calculateBorrowRate(bank, delta, utilization);
    const depositRate = borrowRate.mul(numericConstants_2.PERCENTAGE_PRECISION.sub(new anchor_1.BN(bank.insuranceFund.totalFactor))).mul(utilization).div(numericConstants_1.SPOT_MARKET_UTILIZATION_PRECISION).div(numericConstants_2.PERCENTAGE_PRECISION);
    return depositRate;
}
exports.calculateDepositRate = calculateDepositRate;
function calculateBorrowRate(bank, delta = numericConstants_1.ZERO, currentUtilization = null) {
    return calculateInterestRate(bank, delta, currentUtilization);
}
exports.calculateBorrowRate = calculateBorrowRate;
function calculateInterestAccumulated(bank, now) {
    const interestRate = calculateInterestRate(bank);
    const timeSinceLastUpdate = now.sub(bank.lastInterestTs);
    const modifiedBorrowRate = interestRate.mul(timeSinceLastUpdate);
    const utilization = calculateUtilization(bank);
    const modifiedDepositRate = modifiedBorrowRate.mul(utilization).div(numericConstants_1.SPOT_MARKET_UTILIZATION_PRECISION);
    const borrowInterest = bank.cumulativeBorrowInterest.mul(modifiedBorrowRate).div(numericConstants_1.ONE_YEAR).div(numericConstants_1.SPOT_MARKET_RATE_PRECISION).add(numericConstants_1.ONE);
    const depositInterest = bank.cumulativeDepositInterest.mul(modifiedDepositRate).div(numericConstants_1.ONE_YEAR).div(numericConstants_1.SPOT_MARKET_RATE_PRECISION);
    return {
        borrowInterest,
        depositInterest
    };
}
exports.calculateInterestAccumulated = calculateInterestAccumulated;
function calculateTokenUtilizationLimits(depositTokenAmount, borrowTokenAmount, spotMarket) {
    // Calculates the allowable minimum deposit and maximum borrow amounts for immediate withdrawal based on market utilization.
    // First, it determines a maximum withdrawal utilization from the market's target and historic utilization.
    // Then, it deduces corresponding deposit/borrow amounts.
    // Note: For deposit sizes below the guard threshold, withdrawals aren't blocked.
    const maxWithdrawUtilization = anchor_1.BN.max(new anchor_1.BN(spotMarket.optimalUtilization), spotMarket.utilizationTwap.add(numericConstants_1.SPOT_MARKET_UTILIZATION_PRECISION.sub(spotMarket.utilizationTwap).div(new anchor_1.BN(2))));
    let minDepositTokensForUtilization = borrowTokenAmount.mul(numericConstants_1.SPOT_MARKET_UTILIZATION_PRECISION).div(maxWithdrawUtilization);
    // don't block withdraws for deposit sizes below guard threshold
    minDepositTokensForUtilization = anchor_1.BN.min(minDepositTokensForUtilization, depositTokenAmount.sub(spotMarket.withdrawGuardThreshold));
    let maxBorrowTokensForUtilization = maxWithdrawUtilization.mul(depositTokenAmount).div(numericConstants_1.SPOT_MARKET_UTILIZATION_PRECISION);
    maxBorrowTokensForUtilization = anchor_1.BN.max(spotMarket.withdrawGuardThreshold, maxBorrowTokensForUtilization);
    return {
        minDepositTokensForUtilization,
        maxBorrowTokensForUtilization
    };
}
exports.calculateTokenUtilizationLimits = calculateTokenUtilizationLimits;
function calculateWithdrawLimit(spotMarket, now) {
    const marketDepositTokenAmount = getTokenAmount(spotMarket.depositBalance, spotMarket, types_1.SpotBalanceType.DEPOSIT);
    const marketBorrowTokenAmount = getTokenAmount(spotMarket.borrowBalance, spotMarket, types_1.SpotBalanceType.BORROW);
    const twentyFourHours = new anchor_1.BN(60 * 60 * 24);
    const sinceLast = now.sub(spotMarket.lastTwapTs);
    const sinceStart = anchor_1.BN.max(numericConstants_1.ZERO, twentyFourHours.sub(sinceLast));
    const borrowTokenTwapLive = spotMarket.borrowTokenTwap.mul(sinceStart).add(marketBorrowTokenAmount.mul(sinceLast)).div(sinceLast.add(sinceStart));
    const depositTokenTwapLive = spotMarket.depositTokenTwap.mul(sinceStart).add(marketDepositTokenAmount.mul(sinceLast)).div(sinceLast.add(sinceStart));
    const lesserDepositAmount = anchor_1.BN.min(marketDepositTokenAmount, depositTokenTwapLive);
    let maxBorrowTokensTwap;
    if (spotMarket.poolId == 0) {
        maxBorrowTokensTwap = anchor_1.BN.max(spotMarket.withdrawGuardThreshold, anchor_1.BN.min(anchor_1.BN.max(marketDepositTokenAmount.div(new anchor_1.BN(3)), borrowTokenTwapLive.add(lesserDepositAmount.div(new anchor_1.BN(7)))), lesserDepositAmount.sub(lesserDepositAmount.div(new anchor_1.BN(8))))); // main pool between ~30-92.5% utilization with friction on twap in 20% increments
    } else {
        maxBorrowTokensTwap = anchor_1.BN.max(spotMarket.withdrawGuardThreshold, anchor_1.BN.min(anchor_1.BN.max(marketDepositTokenAmount.div(new anchor_1.BN(2)), borrowTokenTwapLive.add(lesserDepositAmount.div(new anchor_1.BN(3)))), lesserDepositAmount.sub(lesserDepositAmount.div(new anchor_1.BN(20))))); // isolated pools between 50-95% utilization with friction on twap in 33% increments
    }
    const minDepositTokensTwap = depositTokenTwapLive.sub(anchor_1.BN.max(depositTokenTwapLive.div(new anchor_1.BN(4)), anchor_1.BN.min(spotMarket.withdrawGuardThreshold, depositTokenTwapLive)));
    const { minDepositTokensForUtilization, maxBorrowTokensForUtilization } = calculateTokenUtilizationLimits(marketDepositTokenAmount, marketBorrowTokenAmount, spotMarket);
    const minDepositTokens = anchor_1.BN.max(minDepositTokensForUtilization, minDepositTokensTwap);
    let maxBorrowTokens = anchor_1.BN.min(maxBorrowTokensForUtilization, maxBorrowTokensTwap);
    const withdrawLimit = anchor_1.BN.max(marketDepositTokenAmount.sub(minDepositTokens), numericConstants_1.ZERO);
    let borrowLimit = maxBorrowTokens.sub(marketBorrowTokenAmount);
    borrowLimit = anchor_1.BN.min(borrowLimit, marketDepositTokenAmount.sub(marketBorrowTokenAmount));
    if (spotMarket.maxTokenBorrowsFraction > 0) {
        const maxTokenBorrowsByFraction = spotMarket.maxTokenDeposits.mul(new anchor_1.BN(spotMarket.maxTokenBorrowsFraction)).divn(10000);
        const trueMaxBorrowTokensAvailable = maxTokenBorrowsByFraction.sub(marketBorrowTokenAmount);
        maxBorrowTokens = anchor_1.BN.min(maxBorrowTokens, trueMaxBorrowTokensAvailable);
        borrowLimit = anchor_1.BN.min(borrowLimit, maxBorrowTokens);
    }
    if (withdrawLimit.eq(numericConstants_1.ZERO) || (0, types_1.isVariant)(spotMarket.assetTier, 'protected')) {
        borrowLimit = numericConstants_1.ZERO;
    }
    return {
        borrowLimit,
        withdrawLimit,
        maxBorrowAmount: maxBorrowTokens,
        minDepositAmount: minDepositTokens,
        currentDepositAmount: marketDepositTokenAmount,
        currentBorrowAmount: marketBorrowTokenAmount
    };
}
exports.calculateWithdrawLimit = calculateWithdrawLimit;
function getSpotAssetValue(tokenAmount, strictOraclePrice, spotMarketAccount, maxMarginRatio, marginCategory) {
    let assetValue = getStrictTokenValue(tokenAmount, spotMarketAccount.decimals, strictOraclePrice);
    if (marginCategory !== undefined) {
        let weight = calculateAssetWeight(tokenAmount, strictOraclePrice.current, spotMarketAccount, marginCategory);
        if (marginCategory === 'Initial' && spotMarketAccount.marketIndex !== numericConstants_1.QUOTE_SPOT_MARKET_INDEX) {
            const userCustomAssetWeight = anchor_1.BN.max(numericConstants_1.ZERO, numericConstants_1.SPOT_MARKET_WEIGHT_PRECISION.subn(maxMarginRatio));
            weight = anchor_1.BN.min(weight, userCustomAssetWeight);
        }
        assetValue = assetValue.mul(weight).div(numericConstants_1.SPOT_MARKET_WEIGHT_PRECISION);
    }
    return assetValue;
}
exports.getSpotAssetValue = getSpotAssetValue;
function getSpotLiabilityValue(tokenAmount, strictOraclePrice, spotMarketAccount, maxMarginRatio, marginCategory, liquidationBuffer) {
    let liabilityValue = getStrictTokenValue(tokenAmount, spotMarketAccount.decimals, strictOraclePrice);
    if (marginCategory !== undefined) {
        let weight = calculateLiabilityWeight(tokenAmount, spotMarketAccount, marginCategory);
        if (marginCategory === 'Initial' && spotMarketAccount.marketIndex !== numericConstants_1.QUOTE_SPOT_MARKET_INDEX) {
            weight = anchor_1.BN.max(weight, numericConstants_1.SPOT_MARKET_WEIGHT_PRECISION.addn(maxMarginRatio));
        }
        if (liquidationBuffer !== undefined) {
            weight = weight.add(liquidationBuffer);
        }
        liabilityValue = liabilityValue.mul(weight).div(numericConstants_1.SPOT_MARKET_WEIGHT_PRECISION);
    }
    return liabilityValue;
}
exports.getSpotLiabilityValue = getSpotLiabilityValue;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/market.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getTriggerPrice = exports.calculatePerpMarketBaseLiquidatorFee = exports.calculateAvailablePerpLiquidity = exports.calculateNetUserPnlImbalance = exports.calculateNetUserPnl = exports.calculateMarketMaxAvailableInsurance = exports.calculateMarketAvailablePNL = exports.calculateUnrealizedAssetWeight = exports.calculateMarketMarginRatio = exports.calculateOracleSpread = exports.calculateOracleReserveSpread = exports.calculateNewMarketAfterTrade = exports.calculateAskPrice = exports.calculateBidPrice = exports.calculateReservePrice = void 0;
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const amm_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/amm.js [app-route] (ecmascript)");
const margin_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/margin.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const spotBalance_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/spotBalance.js [app-route] (ecmascript)");
const assert_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/assert/assert.js [app-route] (ecmascript)");
/**
 * Calculates market mark price
 *
 * @param market
 * @return markPrice : Precision PRICE_PRECISION
 */ function calculateReservePrice(market, mmOraclePriceData) {
    const newAmm = (0, amm_1.calculateUpdatedAMM)(market.amm, mmOraclePriceData);
    return (0, amm_1.calculatePrice)(newAmm.baseAssetReserve, newAmm.quoteAssetReserve, newAmm.pegMultiplier);
}
exports.calculateReservePrice = calculateReservePrice;
/**
 * Calculates market bid price
 *
 * @param market
 * @return bidPrice : Precision PRICE_PRECISION
 */ function calculateBidPrice(market, mmOraclePriceData, latestSlot) {
    const { baseAssetReserve, quoteAssetReserve, newPeg } = (0, amm_1.calculateUpdatedAMMSpreadReserves)(market.amm, types_1.PositionDirection.SHORT, mmOraclePriceData, undefined, latestSlot);
    return (0, amm_1.calculatePrice)(baseAssetReserve, quoteAssetReserve, newPeg);
}
exports.calculateBidPrice = calculateBidPrice;
/**
 * Calculates market ask price
 *
 * @param market
 * @return askPrice : Precision PRICE_PRECISION
 */ function calculateAskPrice(market, mmOraclePriceData, latestSlot) {
    const { baseAssetReserve, quoteAssetReserve, newPeg } = (0, amm_1.calculateUpdatedAMMSpreadReserves)(market.amm, types_1.PositionDirection.LONG, mmOraclePriceData, undefined, latestSlot);
    return (0, amm_1.calculatePrice)(baseAssetReserve, quoteAssetReserve, newPeg);
}
exports.calculateAskPrice = calculateAskPrice;
function calculateNewMarketAfterTrade(baseAssetAmount, direction, market) {
    const [newQuoteAssetReserve, newBaseAssetReserve] = (0, amm_1.calculateAmmReservesAfterSwap)(market.amm, 'base', baseAssetAmount.abs(), (0, amm_1.getSwapDirection)('base', direction));
    const newAmm = Object.assign({}, market.amm);
    const newMarket = Object.assign({}, market);
    newMarket.amm = newAmm;
    newMarket.amm.quoteAssetReserve = newQuoteAssetReserve;
    newMarket.amm.baseAssetReserve = newBaseAssetReserve;
    return newMarket;
}
exports.calculateNewMarketAfterTrade = calculateNewMarketAfterTrade;
function calculateOracleReserveSpread(market, mmOraclePriceData) {
    const reservePrice = calculateReservePrice(market, mmOraclePriceData);
    return calculateOracleSpread(reservePrice, mmOraclePriceData);
}
exports.calculateOracleReserveSpread = calculateOracleReserveSpread;
function calculateOracleSpread(price, oraclePriceData) {
    return price.sub(oraclePriceData.price);
}
exports.calculateOracleSpread = calculateOracleSpread;
function calculateMarketMarginRatio(market, size, marginCategory, customMarginRatio = 0, userHighLeverageMode = false) {
    if (market.status === 'Settlement') return 0;
    const isHighLeverageUser = userHighLeverageMode && market.highLeverageMarginRatioInitial > 0 && market.highLeverageMarginRatioMaintenance > 0;
    const marginRatioInitial = isHighLeverageUser ? market.highLeverageMarginRatioInitial : market.marginRatioInitial;
    const marginRatioMaintenance = isHighLeverageUser ? market.highLeverageMarginRatioMaintenance : market.marginRatioMaintenance;
    let defaultMarginRatio;
    switch(marginCategory){
        case 'Initial':
            defaultMarginRatio = marginRatioInitial;
            break;
        case 'Maintenance':
            defaultMarginRatio = marginRatioMaintenance;
            break;
        default:
            throw new Error('Invalid margin category');
    }
    let marginRatio;
    if (isHighLeverageUser && marginCategory !== 'Maintenance') {
        // Use ordinary-mode initial/fill ratios for size-adjusted calc
        let preSizeAdjMarginRatio;
        switch(marginCategory){
            case 'Initial':
                preSizeAdjMarginRatio = market.marginRatioInitial;
                break;
            default:
                preSizeAdjMarginRatio = marginRatioMaintenance;
                break;
        }
        const sizeAdjMarginRatio = (0, margin_1.calculateSizePremiumLiabilityWeight)(size, new anchor_1.BN(market.imfFactor), new anchor_1.BN(preSizeAdjMarginRatio), numericConstants_1.MARGIN_PRECISION, false).toNumber();
        marginRatio = (0, margin_1.calcHighLeverageModeInitialMarginRatioFromSize)(new anchor_1.BN(preSizeAdjMarginRatio), new anchor_1.BN(sizeAdjMarginRatio), new anchor_1.BN(defaultMarginRatio)).toNumber();
    } else {
        const sizeAdjMarginRatio = (0, margin_1.calculateSizePremiumLiabilityWeight)(size, new anchor_1.BN(market.imfFactor), new anchor_1.BN(defaultMarginRatio), numericConstants_1.MARGIN_PRECISION, true).toNumber();
        marginRatio = Math.max(defaultMarginRatio, sizeAdjMarginRatio);
    }
    if (marginCategory === 'Initial') {
        marginRatio = Math.max(marginRatio, customMarginRatio);
    }
    return marginRatio;
}
exports.calculateMarketMarginRatio = calculateMarketMarginRatio;
function calculateUnrealizedAssetWeight(market, quoteSpotMarket, unrealizedPnl, marginCategory, oraclePriceData) {
    let assetWeight;
    switch(marginCategory){
        case 'Initial':
            assetWeight = new anchor_1.BN(market.unrealizedPnlInitialAssetWeight);
            if (market.unrealizedPnlMaxImbalance.gt(numericConstants_1.ZERO)) {
                const netUnsettledPnl = calculateNetUserPnlImbalance(market, quoteSpotMarket, oraclePriceData);
                if (netUnsettledPnl.gt(market.unrealizedPnlMaxImbalance)) {
                    assetWeight = assetWeight.mul(market.unrealizedPnlMaxImbalance).div(netUnsettledPnl);
                }
            }
            assetWeight = (0, margin_1.calculateSizeDiscountAssetWeight)(unrealizedPnl, new anchor_1.BN(market.unrealizedPnlImfFactor), assetWeight);
            break;
        case 'Maintenance':
            assetWeight = new anchor_1.BN(market.unrealizedPnlMaintenanceAssetWeight);
            break;
    }
    return assetWeight;
}
exports.calculateUnrealizedAssetWeight = calculateUnrealizedAssetWeight;
function calculateMarketAvailablePNL(perpMarket, spotMarket) {
    return (0, spotBalance_1.getTokenAmount)(perpMarket.pnlPool.scaledBalance, spotMarket, types_1.SpotBalanceType.DEPOSIT);
}
exports.calculateMarketAvailablePNL = calculateMarketAvailablePNL;
function calculateMarketMaxAvailableInsurance(perpMarket, spotMarket) {
    (0, assert_1.assert)(spotMarket.marketIndex == numericConstants_1.QUOTE_SPOT_MARKET_INDEX);
    // todo: insuranceFundAllocation technically not guaranteed to be in Insurance Fund
    const insuranceFundAllocation = perpMarket.insuranceClaim.quoteMaxInsurance.sub(perpMarket.insuranceClaim.quoteSettledInsurance);
    const ammFeePool = (0, spotBalance_1.getTokenAmount)(perpMarket.amm.feePool.scaledBalance, spotMarket, types_1.SpotBalanceType.DEPOSIT);
    return insuranceFundAllocation.add(ammFeePool);
}
exports.calculateMarketMaxAvailableInsurance = calculateMarketMaxAvailableInsurance;
function calculateNetUserPnl(perpMarket, oraclePriceData) {
    const netUserPositionValue = perpMarket.amm.baseAssetAmountWithAmm.add(perpMarket.amm.baseAssetAmountWithUnsettledLp).mul(oraclePriceData.price).div(numericConstants_1.BASE_PRECISION).div(numericConstants_1.PRICE_TO_QUOTE_PRECISION);
    const netUserCostBasis = perpMarket.amm.quoteAssetAmount.add(perpMarket.amm.quoteAssetAmountWithUnsettledLp).add(perpMarket.amm.netUnsettledFundingPnl);
    const netUserPnl = netUserPositionValue.add(netUserCostBasis);
    return netUserPnl;
}
exports.calculateNetUserPnl = calculateNetUserPnl;
function calculateNetUserPnlImbalance(perpMarket, spotMarket, oraclePriceData, applyFeePoolDiscount = true) {
    const netUserPnl = calculateNetUserPnl(perpMarket, oraclePriceData);
    const pnlPool = (0, spotBalance_1.getTokenAmount)(perpMarket.pnlPool.scaledBalance, spotMarket, types_1.SpotBalanceType.DEPOSIT);
    let feePool = (0, spotBalance_1.getTokenAmount)(perpMarket.amm.feePool.scaledBalance, spotMarket, types_1.SpotBalanceType.DEPOSIT);
    if (applyFeePoolDiscount) {
        feePool = feePool.div(new anchor_1.BN(5));
    }
    const imbalance = netUserPnl.sub(pnlPool.add(feePool));
    return imbalance;
}
exports.calculateNetUserPnlImbalance = calculateNetUserPnlImbalance;
function calculateAvailablePerpLiquidity(market, mmOraclePriceData, dlob, slot) {
    let [bids, asks] = (0, amm_1.calculateMarketOpenBidAsk)(market.amm.baseAssetReserve, market.amm.minBaseAssetReserve, market.amm.maxBaseAssetReserve, market.amm.orderStepSize);
    asks = asks.abs();
    for (const bid of dlob.getRestingLimitBids(market.marketIndex, slot, types_1.MarketType.PERP, mmOraclePriceData)){
        bids = bids.add(bid.order.baseAssetAmount.sub(bid.order.baseAssetAmountFilled));
    }
    for (const ask of dlob.getRestingLimitAsks(market.marketIndex, slot, types_1.MarketType.PERP, mmOraclePriceData)){
        asks = asks.add(ask.order.baseAssetAmount.sub(ask.order.baseAssetAmountFilled));
    }
    return {
        bids: bids,
        asks: asks
    };
}
exports.calculateAvailablePerpLiquidity = calculateAvailablePerpLiquidity;
function calculatePerpMarketBaseLiquidatorFee(market, userHighLeverageMode) {
    if (userHighLeverageMode && market.highLeverageMarginRatioMaintenance > 0) {
        const marginRatio = market.highLeverageMarginRatioMaintenance * 100;
        // min(liquidator_fee, .8 * high_leverage_margin_ratio_maintenance)
        return Math.min(market.liquidatorFee, marginRatio - Math.floor(marginRatio / 5));
    } else {
        return market.liquidatorFee;
    }
}
exports.calculatePerpMarketBaseLiquidatorFee = calculatePerpMarketBaseLiquidatorFee;
/**
 * Calculates trigger price for a perp market based on oracle price and current time
 * Implements the same logic as the Rust get_trigger_price function
 *
 * @param market - The perp market account
 * @param oraclePrice - Current oracle price (precision: PRICE_PRECISION)
 * @param now - Current timestamp in seconds
 * @returns trigger price (precision: PRICE_PRECISION)
 */ function getTriggerPrice(market, oraclePrice, now, useMedianPrice) {
    if (!useMedianPrice) {
        return oraclePrice.abs();
    }
    const lastFillPrice = market.lastFillPrice;
    // Calculate 5-minute basis
    const markPrice5minTwap = market.amm.lastMarkPriceTwap5Min;
    const lastOraclePriceTwap5min = market.amm.historicalOracleData.lastOraclePriceTwap5Min;
    const basis5min = markPrice5minTwap.sub(lastOraclePriceTwap5min);
    const oraclePlusBasis5min = oraclePrice.add(basis5min);
    // Calculate funding basis
    const lastFundingBasis = getLastFundingBasis(market, oraclePrice, now);
    const oraclePlusFundingBasis = oraclePrice.add(lastFundingBasis);
    const prices = [
        lastFillPrice.gt(numericConstants_1.ZERO) ? lastFillPrice : oraclePrice,
        oraclePlusFundingBasis,
        oraclePlusBasis5min
    ].sort((a, b)=>a.cmp(b));
    const medianPrice = prices[1];
    return clampTriggerPrice(market, oraclePrice.abs(), medianPrice);
}
exports.getTriggerPrice = getTriggerPrice;
/**
 * Calculates the last funding basis for trigger price calculation
 * Implements the same logic as the Rust get_last_funding_basis function
 */ function getLastFundingBasis(market, oraclePrice, now) {
    if (market.amm.lastFundingOracleTwap.gt(numericConstants_1.ZERO)) {
        const lastFundingRate = market.amm.lastFundingRate.mul(numericConstants_1.PRICE_PRECISION).div(market.amm.lastFundingOracleTwap).muln(24);
        const lastFundingRatePreAdj = lastFundingRate.sub(numericConstants_1.FUNDING_RATE_PRECISION.div(new anchor_1.BN(5000)) // FUNDING_RATE_OFFSET_PERCENTAGE
        );
        const timeLeftUntilFundingUpdate = anchor_1.BN.min(anchor_1.BN.max(now.sub(market.amm.lastFundingRateTs), numericConstants_1.ZERO), market.amm.fundingPeriod);
        const lastFundingBasis = oraclePrice.mul(lastFundingRatePreAdj).div(numericConstants_1.PERCENTAGE_PRECISION).mul(market.amm.fundingPeriod.sub(timeLeftUntilFundingUpdate)).div(market.amm.fundingPeriod).div(new anchor_1.BN(1000)); // FUNDING_RATE_BUFFER
        return lastFundingBasis;
    } else {
        return numericConstants_1.ZERO;
    }
}
/**
 * Clamps trigger price based on contract tier
 * Implements the same logic as the Rust clamp_trigger_price function
 */ function clampTriggerPrice(market, oraclePrice, medianPrice) {
    let maxBpsDiff;
    const tier = market.contractTier;
    if ((0, types_1.isVariant)(tier, 'a') || (0, types_1.isVariant)(tier, 'b')) {
        maxBpsDiff = new anchor_1.BN(500); // 20 BPS
    } else if ((0, types_1.isVariant)(tier, 'c')) {
        maxBpsDiff = new anchor_1.BN(100); // 100 BPS
    } else {
        maxBpsDiff = new anchor_1.BN(40); // 250 BPS
    }
    const maxOracleDiff = oraclePrice.div(maxBpsDiff);
    return anchor_1.BN.min(anchor_1.BN.max(medianPrice, oraclePrice.sub(maxOracleDiff)), oraclePrice.add(maxOracleDiff));
}
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/spotMarket.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.calculateMaxRemainingDeposit = exports.calculateSpotMarketMarginRatio = exports.castNumberToSpotPrecision = void 0;
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const spotBalance_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/spotBalance.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/utils.js [app-route] (ecmascript)");
function castNumberToSpotPrecision(value, spotMarket) {
    if (typeof value === 'number') {
        return (0, utils_1.numberToSafeBN)(value, new anchor_1.BN(Math.pow(10, spotMarket.decimals)));
    } else {
        return value.mul(new anchor_1.BN(Math.pow(10, spotMarket.decimals)));
    }
}
exports.castNumberToSpotPrecision = castNumberToSpotPrecision;
function calculateSpotMarketMarginRatio(market, oraclePrice, marginCategory, size, balanceType, customMarginRatio = 0) {
    let marginRatio;
    if ((0, types_1.isVariant)(balanceType, 'deposit')) {
        const assetWeight = (0, spotBalance_1.calculateAssetWeight)(size, oraclePrice, market, marginCategory);
        marginRatio = numericConstants_1.MARGIN_PRECISION.sub(assetWeight).toNumber();
    } else {
        const liabilityWeight = (0, spotBalance_1.calculateLiabilityWeight)(size, market, marginCategory);
        marginRatio = liabilityWeight.sub(numericConstants_1.MARGIN_PRECISION).toNumber();
    }
    if (marginCategory === 'Initial') {
        // use lowest leverage between max allowed and optional user custom max
        return Math.max(marginRatio, customMarginRatio);
    }
    return marginRatio;
}
exports.calculateSpotMarketMarginRatio = calculateSpotMarketMarginRatio;
/**
 * Returns the maximum remaining deposit that can be made to the spot market. If the maxTokenDeposits on the market is zero then there is no limit and this function will also return zero. (so that needs to be checked)
 * @param market
 * @returns
 */ function calculateMaxRemainingDeposit(market) {
    const marketMaxTokenDeposits = market.maxTokenDeposits;
    if (marketMaxTokenDeposits.eq(numericConstants_1.ZERO)) {
        // If the maxTokenDeposits is set to zero then that means there is no limit. Return the largest number we can to represent infinite available deposit.
        return numericConstants_1.ZERO;
    }
    const totalDepositsTokenAmount = (0, spotBalance_1.getTokenAmount)(market.depositBalance, market, types_1.SpotBalanceType.DEPOSIT);
    return marketMaxTokenDeposits.sub(totalDepositsTokenAmount);
}
exports.calculateMaxRemainingDeposit = calculateMaxRemainingDeposit;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/trade.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUser30dRollingVolumeEstimate = exports.calculateEstimatedEntryPriceWithL2 = exports.calculateEstimatedSpotEntryPrice = exports.calculateEstimatedPerpEntryPrice = exports.calculateTargetPriceTrade = exports.calculateTradeAcquiredAmounts = exports.calculateTradeSlippage = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const assert_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/assert/assert.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const market_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/market.js [app-route] (ecmascript)");
const amm_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/amm.js [app-route] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/utils.js [app-route] (ecmascript)");
const types_2 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const MAXPCT = new anchor_1.BN(1000); //percentage units are [0,1000] => [0,1]
/**
 * Calculates avg/max slippage (price impact) for candidate trade
 *
 * @deprecated use calculateEstimatedPerpEntryPrice instead
 *
 * @param direction
 * @param amount
 * @param market
 * @param inputAssetType which asset is being traded
 * @param useSpread whether to consider spread with calculating slippage
 * @return [pctAvgSlippage, pctMaxSlippage, entryPrice, newPrice]
 *
 * 'pctAvgSlippage' =>  the percentage change to entryPrice (average est slippage in execution) : Precision PRICE_PRECISION
 *
 * 'pctMaxSlippage' =>  the percentage change to maxPrice (highest est slippage in execution) : Precision PRICE_PRECISION
 *
 * 'entryPrice' => the average price of the trade : Precision PRICE_PRECISION
 *
 * 'newPrice' => the price of the asset after the trade : Precision PRICE_PRECISION
 */ function calculateTradeSlippage(direction, amount, market, inputAssetType = 'quote', mmOraclePriceData, useSpread = true, latestSlot) {
    let oldPrice;
    if (useSpread && market.amm.baseSpread > 0) {
        if ((0, types_2.isVariant)(direction, 'long')) {
            oldPrice = (0, market_1.calculateAskPrice)(market, mmOraclePriceData);
        } else {
            oldPrice = (0, market_1.calculateBidPrice)(market, mmOraclePriceData);
        }
    } else {
        oldPrice = (0, market_1.calculateReservePrice)(market, mmOraclePriceData);
    }
    if (amount.eq(numericConstants_1.ZERO)) {
        return [
            numericConstants_1.ZERO,
            numericConstants_1.ZERO,
            oldPrice,
            oldPrice
        ];
    }
    const [acquiredBaseReserve, acquiredQuoteReserve, acquiredQuoteAssetAmount] = calculateTradeAcquiredAmounts(direction, amount, market, inputAssetType, mmOraclePriceData, useSpread);
    const entryPrice = acquiredQuoteAssetAmount.mul(numericConstants_1.AMM_TO_QUOTE_PRECISION_RATIO).mul(numericConstants_1.PRICE_PRECISION).div(acquiredBaseReserve.abs());
    let amm;
    if (useSpread && market.amm.baseSpread > 0) {
        const { baseAssetReserve, quoteAssetReserve, sqrtK, newPeg } = (0, amm_1.calculateUpdatedAMMSpreadReserves)(market.amm, direction, mmOraclePriceData, undefined, latestSlot);
        amm = {
            baseAssetReserve,
            quoteAssetReserve,
            sqrtK: sqrtK,
            pegMultiplier: newPeg
        };
    } else {
        amm = market.amm;
    }
    const newPrice = (0, amm_1.calculatePrice)(amm.baseAssetReserve.sub(acquiredBaseReserve), amm.quoteAssetReserve.sub(acquiredQuoteReserve), amm.pegMultiplier);
    if (direction == types_1.PositionDirection.SHORT) {
        (0, assert_1.assert)(newPrice.lte(oldPrice));
    } else {
        (0, assert_1.assert)(oldPrice.lte(newPrice));
    }
    const pctMaxSlippage = newPrice.sub(oldPrice).mul(numericConstants_1.PRICE_PRECISION).div(oldPrice).abs();
    const pctAvgSlippage = entryPrice.sub(oldPrice).mul(numericConstants_1.PRICE_PRECISION).div(oldPrice).abs();
    return [
        pctAvgSlippage,
        pctMaxSlippage,
        entryPrice,
        newPrice
    ];
}
exports.calculateTradeSlippage = calculateTradeSlippage;
/**
 * Calculates acquired amounts for trade executed
 * @param direction
 * @param amount
 * @param market
 * @param inputAssetType
 * @param useSpread
 * @return
 * 	| 'acquiredBase' =>  positive/negative change in user's base : BN AMM_RESERVE_PRECISION
 * 	| 'acquiredQuote' => positive/negative change in user's quote : BN TODO-PRECISION
 */ function calculateTradeAcquiredAmounts(direction, amount, market, inputAssetType = 'quote', mmOraclePriceData, useSpread = true, latestSlot) {
    if (amount.eq(numericConstants_1.ZERO)) {
        return [
            numericConstants_1.ZERO,
            numericConstants_1.ZERO,
            numericConstants_1.ZERO
        ];
    }
    const swapDirection = (0, amm_1.getSwapDirection)(inputAssetType, direction);
    let amm;
    if (useSpread && market.amm.baseSpread > 0) {
        const { baseAssetReserve, quoteAssetReserve, sqrtK, newPeg } = (0, amm_1.calculateUpdatedAMMSpreadReserves)(market.amm, direction, mmOraclePriceData, undefined, latestSlot);
        amm = {
            baseAssetReserve,
            quoteAssetReserve,
            sqrtK: sqrtK,
            pegMultiplier: newPeg
        };
    } else {
        amm = market.amm;
    }
    const [newQuoteAssetReserve, newBaseAssetReserve] = (0, amm_1.calculateAmmReservesAfterSwap)(amm, inputAssetType, amount, swapDirection);
    const acquiredBase = amm.baseAssetReserve.sub(newBaseAssetReserve);
    const acquiredQuote = amm.quoteAssetReserve.sub(newQuoteAssetReserve);
    const acquiredQuoteAssetAmount = (0, amm_1.calculateQuoteAssetAmountSwapped)(acquiredQuote.abs(), amm.pegMultiplier, swapDirection);
    return [
        acquiredBase,
        acquiredQuote,
        acquiredQuoteAssetAmount
    ];
}
exports.calculateTradeAcquiredAmounts = calculateTradeAcquiredAmounts;
/**
 * calculateTargetPriceTrade
 * simple function for finding arbitraging trades
 *
 * @deprecated
 *
 * @param market
 * @param targetPrice
 * @param pct optional default is 100% gap filling, can set smaller.
 * @param outputAssetType which asset to trade.
 * @param useSpread whether or not to consider the spread when calculating the trade size
 * @returns trade direction/size in order to push price to a targetPrice,
 *
 * [
 *   direction => direction of trade required, PositionDirection
 *   tradeSize => size of trade required, TODO-PRECISION
 *   entryPrice => the entry price for the trade, PRICE_PRECISION
 *   targetPrice => the target price PRICE_PRECISION
 * ]
 */ function calculateTargetPriceTrade(market, targetPrice, pct = MAXPCT, outputAssetType = 'quote', mmOraclePriceData, useSpread = true, latestSlot) {
    (0, assert_1.assert)(market.amm.baseAssetReserve.gt(numericConstants_1.ZERO));
    (0, assert_1.assert)(targetPrice.gt(numericConstants_1.ZERO));
    (0, assert_1.assert)(pct.lte(MAXPCT) && pct.gt(numericConstants_1.ZERO));
    const reservePriceBefore = (0, market_1.calculateReservePrice)(market, mmOraclePriceData);
    const bidPriceBefore = (0, market_1.calculateBidPrice)(market, mmOraclePriceData);
    const askPriceBefore = (0, market_1.calculateAskPrice)(market, mmOraclePriceData);
    let direction;
    if (targetPrice.gt(reservePriceBefore)) {
        const priceGap = targetPrice.sub(reservePriceBefore);
        const priceGapScaled = priceGap.mul(pct).div(MAXPCT);
        targetPrice = reservePriceBefore.add(priceGapScaled);
        direction = types_1.PositionDirection.LONG;
    } else {
        const priceGap = reservePriceBefore.sub(targetPrice);
        const priceGapScaled = priceGap.mul(pct).div(MAXPCT);
        targetPrice = reservePriceBefore.sub(priceGapScaled);
        direction = types_1.PositionDirection.SHORT;
    }
    let tradeSize;
    let baseSize;
    let baseAssetReserveBefore;
    let quoteAssetReserveBefore;
    let peg = market.amm.pegMultiplier;
    if (useSpread && market.amm.baseSpread > 0) {
        const { baseAssetReserve, quoteAssetReserve, newPeg } = (0, amm_1.calculateUpdatedAMMSpreadReserves)(market.amm, direction, mmOraclePriceData, undefined, latestSlot);
        baseAssetReserveBefore = baseAssetReserve;
        quoteAssetReserveBefore = quoteAssetReserve;
        peg = newPeg;
    } else {
        baseAssetReserveBefore = market.amm.baseAssetReserve;
        quoteAssetReserveBefore = market.amm.quoteAssetReserve;
    }
    const invariant = market.amm.sqrtK.mul(market.amm.sqrtK);
    const k = invariant.mul(numericConstants_1.PRICE_PRECISION);
    let baseAssetReserveAfter;
    let quoteAssetReserveAfter;
    const biasModifier = new anchor_1.BN(1);
    let markPriceAfter;
    if (useSpread && targetPrice.lt(askPriceBefore) && targetPrice.gt(bidPriceBefore)) {
        // no trade, market is at target
        if (reservePriceBefore.gt(targetPrice)) {
            direction = types_1.PositionDirection.SHORT;
        } else {
            direction = types_1.PositionDirection.LONG;
        }
        tradeSize = numericConstants_1.ZERO;
        return [
            direction,
            tradeSize,
            targetPrice,
            targetPrice
        ];
    } else if (reservePriceBefore.gt(targetPrice)) {
        // overestimate y2
        baseAssetReserveAfter = (0, utils_1.squareRootBN)(k.div(targetPrice).mul(peg).div(numericConstants_1.PEG_PRECISION).sub(biasModifier)).sub(new anchor_1.BN(1));
        quoteAssetReserveAfter = k.div(numericConstants_1.PRICE_PRECISION).div(baseAssetReserveAfter);
        markPriceAfter = (0, amm_1.calculatePrice)(baseAssetReserveAfter, quoteAssetReserveAfter, peg);
        direction = types_1.PositionDirection.SHORT;
        tradeSize = quoteAssetReserveBefore.sub(quoteAssetReserveAfter).mul(peg).div(numericConstants_1.PEG_PRECISION).div(numericConstants_1.AMM_TO_QUOTE_PRECISION_RATIO);
        baseSize = baseAssetReserveAfter.sub(baseAssetReserveBefore);
    } else if (reservePriceBefore.lt(targetPrice)) {
        // underestimate y2
        baseAssetReserveAfter = (0, utils_1.squareRootBN)(k.div(targetPrice).mul(peg).div(numericConstants_1.PEG_PRECISION).add(biasModifier)).add(new anchor_1.BN(1));
        quoteAssetReserveAfter = k.div(numericConstants_1.PRICE_PRECISION).div(baseAssetReserveAfter);
        markPriceAfter = (0, amm_1.calculatePrice)(baseAssetReserveAfter, quoteAssetReserveAfter, peg);
        direction = types_1.PositionDirection.LONG;
        tradeSize = quoteAssetReserveAfter.sub(quoteAssetReserveBefore).mul(peg).div(numericConstants_1.PEG_PRECISION).div(numericConstants_1.AMM_TO_QUOTE_PRECISION_RATIO);
        baseSize = baseAssetReserveBefore.sub(baseAssetReserveAfter);
    } else {
        // no trade, market is at target
        direction = types_1.PositionDirection.LONG;
        tradeSize = numericConstants_1.ZERO;
        return [
            direction,
            tradeSize,
            targetPrice,
            targetPrice
        ];
    }
    let tp1 = targetPrice;
    let tp2 = markPriceAfter;
    let originalDiff = targetPrice.sub(reservePriceBefore);
    if (direction == types_1.PositionDirection.SHORT) {
        tp1 = markPriceAfter;
        tp2 = targetPrice;
        originalDiff = reservePriceBefore.sub(targetPrice);
    }
    const entryPrice = tradeSize.mul(numericConstants_1.AMM_TO_QUOTE_PRECISION_RATIO).mul(numericConstants_1.PRICE_PRECISION).div(baseSize.abs());
    (0, assert_1.assert)(tp1.sub(tp2).lte(originalDiff), 'Target Price Calculation incorrect');
    (0, assert_1.assert)(tp2.lte(tp1) || tp2.sub(tp1).abs() < 100000, 'Target Price Calculation incorrect' + tp2.toString() + '>=' + tp1.toString() + 'err: ' + tp2.sub(tp1).abs().toString());
    if (outputAssetType == 'quote') {
        return [
            direction,
            tradeSize,
            entryPrice,
            targetPrice
        ];
    } else {
        return [
            direction,
            baseSize,
            entryPrice,
            targetPrice
        ];
    }
}
exports.calculateTargetPriceTrade = calculateTargetPriceTrade;
/**
 * Calculates the estimated entry price and price impact of order, in base or quote
 * Price impact is based on the difference between the entry price and the best bid/ask price (whether it's dlob or vamm)
 *
 * @param assetType
 * @param amount
 * @param direction
 * @param market
 * @param oraclePriceData
 * @param dlob
 * @param slot
 * @param usersToSkip
 */ function calculateEstimatedPerpEntryPrice(assetType, amount, direction, market, mmOraclePriceData, dlob, slot, usersToSkip = new Map()) {
    if (amount.eq(numericConstants_1.ZERO)) {
        return {
            entryPrice: numericConstants_1.ZERO,
            priceImpact: numericConstants_1.ZERO,
            bestPrice: numericConstants_1.ZERO,
            worstPrice: numericConstants_1.ZERO,
            baseFilled: numericConstants_1.ZERO,
            quoteFilled: numericConstants_1.ZERO
        };
    }
    const takerIsLong = (0, types_2.isVariant)(direction, 'long');
    const limitOrders = dlob[takerIsLong ? 'getRestingLimitAsks' : 'getRestingLimitBids'](market.marketIndex, slot, types_1.MarketType.PERP, mmOraclePriceData);
    const swapDirection = (0, amm_1.getSwapDirection)(assetType, direction);
    const { baseAssetReserve, quoteAssetReserve, sqrtK, newPeg } = (0, amm_1.calculateUpdatedAMMSpreadReserves)(market.amm, direction, mmOraclePriceData, undefined, new anchor_1.BN(slot));
    const amm = {
        baseAssetReserve,
        quoteAssetReserve,
        sqrtK: sqrtK,
        pegMultiplier: newPeg
    };
    const [ammBids, ammAsks] = (0, amm_1.calculateMarketOpenBidAsk)(market.amm.baseAssetReserve, market.amm.minBaseAssetReserve, market.amm.maxBaseAssetReserve, market.amm.orderStepSize);
    let ammLiquidity;
    if (assetType === 'base') {
        ammLiquidity = takerIsLong ? ammAsks.abs() : ammBids;
    } else {
        const [afterSwapQuoteReserves, _] = (0, amm_1.calculateAmmReservesAfterSwap)(amm, 'base', takerIsLong ? ammAsks.abs() : ammBids, (0, amm_1.getSwapDirection)('base', direction));
        ammLiquidity = (0, amm_1.calculateQuoteAssetAmountSwapped)(amm.quoteAssetReserve.sub(afterSwapQuoteReserves).abs(), amm.pegMultiplier, swapDirection);
    }
    const invariant = amm.sqrtK.mul(amm.sqrtK);
    let bestPrice = (0, amm_1.calculatePrice)(amm.baseAssetReserve, amm.quoteAssetReserve, amm.pegMultiplier);
    let cumulativeBaseFilled = numericConstants_1.ZERO;
    let cumulativeQuoteFilled = numericConstants_1.ZERO;
    let limitOrder = limitOrders.next().value;
    if (limitOrder) {
        const limitOrderPrice = limitOrder.getPrice(mmOraclePriceData, slot);
        bestPrice = takerIsLong ? anchor_1.BN.min(limitOrderPrice, bestPrice) : anchor_1.BN.max(limitOrderPrice, bestPrice);
    }
    let worstPrice = bestPrice;
    if (assetType === 'base') {
        while(!cumulativeBaseFilled.eq(amount) && (ammLiquidity.gt(numericConstants_1.ZERO) || limitOrder)){
            const limitOrderPrice = limitOrder === null || limitOrder === void 0 ? void 0 : limitOrder.getPrice(mmOraclePriceData, slot);
            let maxAmmFill;
            if (limitOrderPrice) {
                const newBaseReserves = (0, utils_1.squareRootBN)(invariant.mul(numericConstants_1.PRICE_PRECISION).mul(amm.pegMultiplier).div(limitOrderPrice).div(numericConstants_1.PEG_PRECISION));
                // will be zero if the limit order price is better than the amm price
                maxAmmFill = takerIsLong ? amm.baseAssetReserve.sub(newBaseReserves) : newBaseReserves.sub(amm.baseAssetReserve);
            } else {
                maxAmmFill = amount.sub(cumulativeBaseFilled);
            }
            maxAmmFill = anchor_1.BN.min(maxAmmFill, ammLiquidity);
            if (maxAmmFill.gt(numericConstants_1.ZERO)) {
                const baseFilled = anchor_1.BN.min(amount.sub(cumulativeBaseFilled), maxAmmFill);
                const [afterSwapQuoteReserves, afterSwapBaseReserves] = (0, amm_1.calculateAmmReservesAfterSwap)(amm, 'base', baseFilled, swapDirection);
                ammLiquidity = ammLiquidity.sub(baseFilled);
                const quoteFilled = (0, amm_1.calculateQuoteAssetAmountSwapped)(amm.quoteAssetReserve.sub(afterSwapQuoteReserves).abs(), amm.pegMultiplier, swapDirection);
                cumulativeBaseFilled = cumulativeBaseFilled.add(baseFilled);
                cumulativeQuoteFilled = cumulativeQuoteFilled.add(quoteFilled);
                amm.baseAssetReserve = afterSwapBaseReserves;
                amm.quoteAssetReserve = afterSwapQuoteReserves;
                worstPrice = (0, amm_1.calculatePrice)(amm.baseAssetReserve, amm.quoteAssetReserve, amm.pegMultiplier);
                if (cumulativeBaseFilled.eq(amount)) {
                    break;
                }
            }
            if (!limitOrder) {
                continue;
            }
            if (usersToSkip.has(limitOrder.userAccount)) {
                continue;
            }
            const baseFilled = anchor_1.BN.min(limitOrder.order.baseAssetAmount.sub(limitOrder.order.baseAssetAmountFilled), amount.sub(cumulativeBaseFilled));
            const quoteFilled = baseFilled.mul(limitOrderPrice).div(numericConstants_1.BASE_PRECISION);
            cumulativeBaseFilled = cumulativeBaseFilled.add(baseFilled);
            cumulativeQuoteFilled = cumulativeQuoteFilled.add(quoteFilled);
            worstPrice = limitOrderPrice;
            if (cumulativeBaseFilled.eq(amount)) {
                break;
            }
            limitOrder = limitOrders.next().value;
        }
    } else {
        while(!cumulativeQuoteFilled.eq(amount) && (ammLiquidity.gt(numericConstants_1.ZERO) || limitOrder)){
            const limitOrderPrice = limitOrder === null || limitOrder === void 0 ? void 0 : limitOrder.getPrice(mmOraclePriceData, slot);
            let maxAmmFill;
            if (limitOrderPrice) {
                const newQuoteReserves = (0, utils_1.squareRootBN)(invariant.mul(numericConstants_1.PEG_PRECISION).mul(limitOrderPrice).div(amm.pegMultiplier).div(numericConstants_1.PRICE_PRECISION));
                // will be zero if the limit order price is better than the amm price
                maxAmmFill = takerIsLong ? newQuoteReserves.sub(amm.quoteAssetReserve) : amm.quoteAssetReserve.sub(newQuoteReserves);
            } else {
                maxAmmFill = amount.sub(cumulativeQuoteFilled);
            }
            maxAmmFill = anchor_1.BN.min(maxAmmFill, ammLiquidity);
            if (maxAmmFill.gt(numericConstants_1.ZERO)) {
                const quoteFilled = anchor_1.BN.min(amount.sub(cumulativeQuoteFilled), maxAmmFill);
                const [afterSwapQuoteReserves, afterSwapBaseReserves] = (0, amm_1.calculateAmmReservesAfterSwap)(amm, 'quote', quoteFilled, swapDirection);
                ammLiquidity = ammLiquidity.sub(quoteFilled);
                const baseFilled = afterSwapBaseReserves.sub(amm.baseAssetReserve).abs();
                cumulativeBaseFilled = cumulativeBaseFilled.add(baseFilled);
                cumulativeQuoteFilled = cumulativeQuoteFilled.add(quoteFilled);
                amm.baseAssetReserve = afterSwapBaseReserves;
                amm.quoteAssetReserve = afterSwapQuoteReserves;
                worstPrice = (0, amm_1.calculatePrice)(amm.baseAssetReserve, amm.quoteAssetReserve, amm.pegMultiplier);
                if (cumulativeQuoteFilled.eq(amount)) {
                    break;
                }
            }
            if (!limitOrder) {
                continue;
            }
            if (usersToSkip.has(limitOrder.userAccount)) {
                continue;
            }
            const quoteFilled = anchor_1.BN.min(limitOrder.order.baseAssetAmount.sub(limitOrder.order.baseAssetAmountFilled).mul(limitOrderPrice).div(numericConstants_1.BASE_PRECISION), amount.sub(cumulativeQuoteFilled));
            const baseFilled = quoteFilled.mul(numericConstants_1.BASE_PRECISION).div(limitOrderPrice);
            cumulativeBaseFilled = cumulativeBaseFilled.add(baseFilled);
            cumulativeQuoteFilled = cumulativeQuoteFilled.add(quoteFilled);
            worstPrice = limitOrderPrice;
            if (cumulativeQuoteFilled.eq(amount)) {
                break;
            }
            limitOrder = limitOrders.next().value;
        }
    }
    const entryPrice = cumulativeBaseFilled && cumulativeBaseFilled.gt(numericConstants_1.ZERO) ? cumulativeQuoteFilled.mul(numericConstants_1.BASE_PRECISION).div(cumulativeBaseFilled) : numericConstants_1.ZERO;
    const priceImpact = bestPrice && bestPrice.gt(numericConstants_1.ZERO) ? entryPrice.sub(bestPrice).mul(numericConstants_1.PRICE_PRECISION).div(bestPrice).abs() : numericConstants_1.ZERO;
    return {
        entryPrice,
        priceImpact,
        bestPrice,
        worstPrice,
        baseFilled: cumulativeBaseFilled,
        quoteFilled: cumulativeQuoteFilled
    };
}
exports.calculateEstimatedPerpEntryPrice = calculateEstimatedPerpEntryPrice;
/**
 * Calculates the estimated entry price and price impact of order, in base or quote
 * Price impact is based on the difference between the entry price and the best bid/ask price (whether it's dlob or serum)
 *
 * @param assetType
 * @param amount
 * @param direction
 * @param market
 * @param oraclePriceData
 * @param dlob
 * @param serumBids
 * @param serumAsks
 * @param slot
 * @param usersToSkip
 */ function calculateEstimatedSpotEntryPrice(assetType, amount, direction, market, oraclePriceData, dlob, serumBids, serumAsks, slot, usersToSkip = new Map()) {
    if (amount.eq(numericConstants_1.ZERO)) {
        return {
            entryPrice: numericConstants_1.ZERO,
            priceImpact: numericConstants_1.ZERO,
            bestPrice: numericConstants_1.ZERO,
            worstPrice: numericConstants_1.ZERO,
            baseFilled: numericConstants_1.ZERO,
            quoteFilled: numericConstants_1.ZERO
        };
    }
    const basePrecision = new anchor_1.BN(Math.pow(10, market.decimals));
    const takerIsLong = (0, types_2.isVariant)(direction, 'long');
    const dlobLimitOrders = dlob[takerIsLong ? 'getRestingLimitAsks' : 'getRestingLimitBids'](market.marketIndex, slot, types_1.MarketType.SPOT, oraclePriceData);
    const serumLimitOrders = takerIsLong ? serumAsks.getL2(100) : serumBids.getL2(100);
    let cumulativeBaseFilled = numericConstants_1.ZERO;
    let cumulativeQuoteFilled = numericConstants_1.ZERO;
    let dlobLimitOrder = dlobLimitOrders.next().value;
    let serumLimitOrder = serumLimitOrders.shift();
    const dlobLimitOrderPrice = dlobLimitOrder === null || dlobLimitOrder === void 0 ? void 0 : dlobLimitOrder.getPrice(oraclePriceData, slot);
    const serumLimitOrderPrice = serumLimitOrder ? new anchor_1.BN(serumLimitOrder[0] * numericConstants_1.PRICE_PRECISION.toNumber()) : undefined;
    const bestPrice = takerIsLong ? anchor_1.BN.min(serumLimitOrderPrice || numericConstants_1.BN_MAX, dlobLimitOrderPrice || numericConstants_1.BN_MAX) : anchor_1.BN.max(serumLimitOrderPrice || numericConstants_1.ZERO, dlobLimitOrderPrice || numericConstants_1.ZERO);
    let worstPrice = bestPrice;
    if (assetType === 'base') {
        while(!cumulativeBaseFilled.eq(amount) && (dlobLimitOrder || serumLimitOrder)){
            const dlobLimitOrderPrice = dlobLimitOrder === null || dlobLimitOrder === void 0 ? void 0 : dlobLimitOrder.getPrice(oraclePriceData, slot);
            const serumLimitOrderPrice = serumLimitOrder ? new anchor_1.BN(serumLimitOrder[0] * numericConstants_1.PRICE_PRECISION.toNumber()) : undefined;
            const useSerum = takerIsLong ? (serumLimitOrderPrice || numericConstants_1.BN_MAX).lt(dlobLimitOrderPrice || numericConstants_1.BN_MAX) : (serumLimitOrderPrice || numericConstants_1.ZERO).gt(dlobLimitOrderPrice || numericConstants_1.ZERO);
            if (!useSerum) {
                if (dlobLimitOrder && usersToSkip.has(dlobLimitOrder.userAccount)) {
                    continue;
                }
                const baseFilled = anchor_1.BN.min(dlobLimitOrder.order.baseAssetAmount.sub(dlobLimitOrder.order.baseAssetAmountFilled), amount.sub(cumulativeBaseFilled));
                const quoteFilled = baseFilled.mul(dlobLimitOrderPrice).div(basePrecision);
                cumulativeBaseFilled = cumulativeBaseFilled.add(baseFilled);
                cumulativeQuoteFilled = cumulativeQuoteFilled.add(quoteFilled);
                worstPrice = dlobLimitOrderPrice;
                dlobLimitOrder = dlobLimitOrders.next().value;
            } else {
                const baseFilled = anchor_1.BN.min(new anchor_1.BN(serumLimitOrder[1] * basePrecision.toNumber()), amount.sub(cumulativeBaseFilled));
                const quoteFilled = baseFilled.mul(serumLimitOrderPrice).div(basePrecision);
                cumulativeBaseFilled = cumulativeBaseFilled.add(baseFilled);
                cumulativeQuoteFilled = cumulativeQuoteFilled.add(quoteFilled);
                worstPrice = serumLimitOrderPrice;
                serumLimitOrder = serumLimitOrders.shift();
            }
        }
    } else {
        while(!cumulativeQuoteFilled.eq(amount) && (dlobLimitOrder || serumLimitOrder)){
            const dlobLimitOrderPrice = dlobLimitOrder === null || dlobLimitOrder === void 0 ? void 0 : dlobLimitOrder.getPrice(oraclePriceData, slot);
            const serumLimitOrderPrice = serumLimitOrder ? new anchor_1.BN(serumLimitOrder[0] * numericConstants_1.PRICE_PRECISION.toNumber()) : undefined;
            const useSerum = takerIsLong ? (serumLimitOrderPrice || numericConstants_1.BN_MAX).lt(dlobLimitOrderPrice || numericConstants_1.BN_MAX) : (serumLimitOrderPrice || numericConstants_1.ZERO).gt(dlobLimitOrderPrice || numericConstants_1.ZERO);
            if (!useSerum) {
                if (dlobLimitOrder && usersToSkip.has(dlobLimitOrder.userAccount)) {
                    continue;
                }
                const quoteFilled = anchor_1.BN.min(dlobLimitOrder.order.baseAssetAmount.sub(dlobLimitOrder.order.baseAssetAmountFilled).mul(dlobLimitOrderPrice).div(basePrecision), amount.sub(cumulativeQuoteFilled));
                const baseFilled = quoteFilled.mul(basePrecision).div(dlobLimitOrderPrice);
                cumulativeBaseFilled = cumulativeBaseFilled.add(baseFilled);
                cumulativeQuoteFilled = cumulativeQuoteFilled.add(quoteFilled);
                worstPrice = dlobLimitOrderPrice;
                dlobLimitOrder = dlobLimitOrders.next().value;
            } else {
                const serumOrderBaseAmount = new anchor_1.BN(serumLimitOrder[1] * basePrecision.toNumber());
                const quoteFilled = anchor_1.BN.min(serumOrderBaseAmount.mul(serumLimitOrderPrice).div(basePrecision), amount.sub(cumulativeQuoteFilled));
                const baseFilled = quoteFilled.mul(basePrecision).div(serumLimitOrderPrice);
                cumulativeBaseFilled = cumulativeBaseFilled.add(baseFilled);
                cumulativeQuoteFilled = cumulativeQuoteFilled.add(quoteFilled);
                worstPrice = serumLimitOrderPrice;
                serumLimitOrder = serumLimitOrders.shift();
            }
        }
    }
    const entryPrice = cumulativeBaseFilled && cumulativeBaseFilled.gt(numericConstants_1.ZERO) ? cumulativeQuoteFilled.mul(basePrecision).div(cumulativeBaseFilled) : numericConstants_1.ZERO;
    const priceImpact = bestPrice && bestPrice.gt(numericConstants_1.ZERO) ? entryPrice.sub(bestPrice).mul(numericConstants_1.PRICE_PRECISION).div(bestPrice).abs() : numericConstants_1.ZERO;
    return {
        entryPrice,
        priceImpact,
        bestPrice,
        worstPrice,
        baseFilled: cumulativeBaseFilled,
        quoteFilled: cumulativeQuoteFilled
    };
}
exports.calculateEstimatedSpotEntryPrice = calculateEstimatedSpotEntryPrice;
function calculateEstimatedEntryPriceWithL2(assetType, amount, direction, basePrecision, l2) {
    const takerIsLong = (0, types_2.isVariant)(direction, 'long');
    let cumulativeBaseFilled = numericConstants_1.ZERO;
    let cumulativeQuoteFilled = numericConstants_1.ZERO;
    const levels = [
        ...takerIsLong ? l2.asks : l2.bids
    ];
    let nextLevel = levels.shift();
    let bestPrice;
    let worstPrice;
    if (nextLevel) {
        bestPrice = nextLevel.price;
        worstPrice = nextLevel.price;
    } else {
        bestPrice = takerIsLong ? numericConstants_1.BN_MAX : numericConstants_1.ZERO;
        worstPrice = bestPrice;
    }
    if (assetType === 'base') {
        while(!cumulativeBaseFilled.eq(amount) && nextLevel){
            const price = nextLevel.price;
            const size = nextLevel.size;
            worstPrice = price;
            const baseFilled = anchor_1.BN.min(size, amount.sub(cumulativeBaseFilled));
            const quoteFilled = baseFilled.mul(price).div(basePrecision);
            cumulativeBaseFilled = cumulativeBaseFilled.add(baseFilled);
            cumulativeQuoteFilled = cumulativeQuoteFilled.add(quoteFilled);
            nextLevel = levels.shift();
        }
    } else {
        while(!cumulativeQuoteFilled.eq(amount) && nextLevel){
            const price = nextLevel.price;
            const size = nextLevel.size;
            worstPrice = price;
            const quoteFilled = anchor_1.BN.min(size.mul(price).div(basePrecision), amount.sub(cumulativeQuoteFilled));
            const baseFilled = quoteFilled.mul(basePrecision).div(price);
            cumulativeBaseFilled = cumulativeBaseFilled.add(baseFilled);
            cumulativeQuoteFilled = cumulativeQuoteFilled.add(quoteFilled);
            nextLevel = levels.shift();
        }
    }
    const entryPrice = cumulativeBaseFilled && cumulativeBaseFilled.gt(numericConstants_1.ZERO) ? cumulativeQuoteFilled.mul(basePrecision).div(cumulativeBaseFilled) : numericConstants_1.ZERO;
    const priceImpact = bestPrice && bestPrice.gt(numericConstants_1.ZERO) ? entryPrice.sub(bestPrice).mul(numericConstants_1.PRICE_PRECISION).div(bestPrice).abs() : numericConstants_1.ZERO;
    return {
        entryPrice,
        priceImpact,
        bestPrice,
        worstPrice,
        baseFilled: cumulativeBaseFilled,
        quoteFilled: cumulativeQuoteFilled
    };
}
exports.calculateEstimatedEntryPriceWithL2 = calculateEstimatedEntryPriceWithL2;
function getUser30dRollingVolumeEstimate(userStatsAccount, now) {
    now = now || new anchor_1.BN(new Date().getTime() / 1000);
    const sinceLastTaker = anchor_1.BN.max(now.sub(userStatsAccount.lastTakerVolume30DTs), numericConstants_1.ZERO);
    const sinceLastMaker = anchor_1.BN.max(now.sub(userStatsAccount.lastMakerVolume30DTs), numericConstants_1.ZERO);
    const thirtyDaysInSeconds = new anchor_1.BN(60 * 60 * 24 * 30);
    const last30dVolume = userStatsAccount.takerVolume30D.mul(anchor_1.BN.max(thirtyDaysInSeconds.sub(sinceLastTaker), numericConstants_1.ZERO)).div(thirtyDaysInSeconds).add(userStatsAccount.makerVolume30D.mul(anchor_1.BN.max(thirtyDaysInSeconds.sub(sinceLastMaker), numericConstants_1.ZERO)).div(thirtyDaysInSeconds));
    return last30dVolume;
}
exports.getUser30dRollingVolumeEstimate = getUser30dRollingVolumeEstimate;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/spotPosition.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.simulateOrderFill = exports.calculateWeightedTokenValue = exports.getWorstCaseTokenAmounts = exports.isSpotPositionAvailable = void 0;
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const spotBalance_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/spotBalance.js [app-route] (ecmascript)");
function isSpotPositionAvailable(position) {
    return position.scaledBalance.eq(numericConstants_1.ZERO) && position.openOrders === 0;
}
exports.isSpotPositionAvailable = isSpotPositionAvailable;
function getWorstCaseTokenAmounts(spotPosition, spotMarketAccount, strictOraclePrice, marginCategory, customMarginRatio) {
    const tokenAmount = (0, spotBalance_1.getSignedTokenAmount)((0, spotBalance_1.getTokenAmount)(spotPosition.scaledBalance, spotMarketAccount, spotPosition.balanceType), spotPosition.balanceType);
    const tokenValue = (0, spotBalance_1.getStrictTokenValue)(tokenAmount, spotMarketAccount.decimals, strictOraclePrice);
    if (spotPosition.openBids.eq(numericConstants_1.ZERO) && spotPosition.openAsks.eq(numericConstants_1.ZERO)) {
        const { weight, weightedTokenValue } = calculateWeightedTokenValue(tokenAmount, tokenValue, strictOraclePrice.current, spotMarketAccount, marginCategory, customMarginRatio);
        return {
            tokenAmount,
            ordersValue: numericConstants_1.ZERO,
            tokenValue,
            weight,
            weightedTokenValue,
            freeCollateralContribution: weightedTokenValue
        };
    }
    const bidsSimulation = simulateOrderFill(tokenAmount, tokenValue, spotPosition.openBids, strictOraclePrice, spotMarketAccount, marginCategory, customMarginRatio);
    const asksSimulation = simulateOrderFill(tokenAmount, tokenValue, spotPosition.openAsks, strictOraclePrice, spotMarketAccount, marginCategory, customMarginRatio);
    if (asksSimulation.freeCollateralContribution.lt(bidsSimulation.freeCollateralContribution)) {
        return asksSimulation;
    } else {
        return bidsSimulation;
    }
}
exports.getWorstCaseTokenAmounts = getWorstCaseTokenAmounts;
function calculateWeightedTokenValue(tokenAmount, tokenValue, oraclePrice, spotMarket, marginCategory, customMarginRatio) {
    let weight;
    if (tokenValue.gte(numericConstants_1.ZERO)) {
        weight = (0, spotBalance_1.calculateAssetWeight)(tokenAmount, oraclePrice, spotMarket, marginCategory);
    } else {
        weight = (0, spotBalance_1.calculateLiabilityWeight)(tokenAmount.abs(), spotMarket, marginCategory);
    }
    if (marginCategory === 'Initial' && customMarginRatio && spotMarket.marketIndex !== numericConstants_1.QUOTE_SPOT_MARKET_INDEX) {
        const userCustomAssetWeight = tokenValue.gte(numericConstants_1.ZERO) ? anchor_1.BN.max(numericConstants_1.ZERO, numericConstants_1.SPOT_MARKET_WEIGHT_PRECISION.subn(customMarginRatio)) : numericConstants_1.SPOT_MARKET_WEIGHT_PRECISION.addn(customMarginRatio);
        weight = tokenValue.gte(numericConstants_1.ZERO) ? anchor_1.BN.min(weight, userCustomAssetWeight) : anchor_1.BN.max(weight, userCustomAssetWeight);
    }
    return {
        weight: weight,
        weightedTokenValue: tokenValue.mul(weight).div(numericConstants_1.SPOT_MARKET_WEIGHT_PRECISION)
    };
}
exports.calculateWeightedTokenValue = calculateWeightedTokenValue;
function simulateOrderFill(tokenAmount, tokenValue, openOrders, strictOraclePrice, spotMarket, marginCategory, customMarginRatio) {
    const ordersValue = (0, spotBalance_1.getTokenValue)(openOrders.neg(), spotMarket.decimals, {
        price: strictOraclePrice.max()
    });
    const tokenAmountAfterFill = tokenAmount.add(openOrders);
    const tokenValueAfterFill = tokenValue.add(ordersValue.neg());
    const { weight, weightedTokenValue: weightedTokenValueAfterFill } = calculateWeightedTokenValue(tokenAmountAfterFill, tokenValueAfterFill, strictOraclePrice.current, spotMarket, marginCategory, customMarginRatio);
    const freeCollateralContribution = weightedTokenValueAfterFill.add(ordersValue);
    return {
        tokenAmount: tokenAmountAfterFill,
        ordersValue: ordersValue,
        tokenValue: tokenValueAfterFill,
        weight,
        weightedTokenValue: weightedTokenValueAfterFill,
        freeCollateralContribution
    };
}
exports.simulateOrderFill = simulateOrderFill;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/fuel.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.calculatePerpFuelBonus = exports.calculateSpotFuelBonus = exports.calculateInsuranceFuelBonus = void 0;
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
function calculateInsuranceFuelBonus(spotMarket, tokenStakeAmount, fuelBonusNumerator) {
    const result = tokenStakeAmount.abs().mul(fuelBonusNumerator).mul(new anchor_1.BN(spotMarket.fuelBoostInsurance)).div(numericConstants_1.FUEL_WINDOW).div(numericConstants_1.QUOTE_PRECISION.div(new anchor_1.BN(10)));
    return result;
}
exports.calculateInsuranceFuelBonus = calculateInsuranceFuelBonus;
function calculateSpotFuelBonus(spotMarket, signedTokenValue, fuelBonusNumerator) {
    let result;
    if (signedTokenValue.abs().lte(numericConstants_1.QUOTE_PRECISION)) {
        result = numericConstants_1.ZERO;
    } else if (signedTokenValue.gt(new anchor_1.BN(0))) {
        result = signedTokenValue.abs().mul(fuelBonusNumerator).mul(new anchor_1.BN(spotMarket.fuelBoostDeposits)).div(numericConstants_1.FUEL_WINDOW).div(numericConstants_1.QUOTE_PRECISION.div(new anchor_1.BN(10)));
    } else {
        result = signedTokenValue.abs().mul(fuelBonusNumerator).mul(new anchor_1.BN(spotMarket.fuelBoostBorrows)).div(numericConstants_1.FUEL_WINDOW).div(numericConstants_1.QUOTE_PRECISION.div(new anchor_1.BN(10)));
    }
    return result;
}
exports.calculateSpotFuelBonus = calculateSpotFuelBonus;
function calculatePerpFuelBonus(perpMarket, baseAssetValue, fuelBonusNumerator) {
    let result;
    if (baseAssetValue.abs().lte(numericConstants_1.QUOTE_PRECISION)) {
        result = new anchor_1.BN(0);
    } else {
        result = baseAssetValue.abs().mul(fuelBonusNumerator).mul(new anchor_1.BN(perpMarket.fuelBoostPosition)).div(numericConstants_1.FUEL_WINDOW).div(numericConstants_1.QUOTE_PRECISION.div(new anchor_1.BN(10)));
    }
    return result;
}
exports.calculatePerpFuelBonus = calculatePerpFuelBonus;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/margin.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.calcHighLeverageModeInitialMarginRatioFromSize = exports.calculateUserMaxPerpOrderSize = exports.calculateLiquidationPrice = exports.calculateCollateralValueOfDeposit = exports.calculateCollateralDepositRequiredForTrade = exports.calculateMarginUSDCRequiredForTrade = exports.calculatePerpLiabilityValue = exports.calculateWorstCasePerpLiabilityValue = exports.calculateWorstCaseBaseAssetAmount = exports.calculateBaseAssetValueWithOracle = exports.calculateOraclePriceForPerpMargin = exports.calculateSizeDiscountAssetWeight = exports.calculateSizePremiumLiabilityWeight = void 0;
const utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/utils.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const market_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/market.js [app-route] (ecmascript)");
const spotBalance_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/spotBalance.js [app-route] (ecmascript)");
const oneShotUserAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/oneShotUserAccountSubscriber.js [app-route] (ecmascript)");
const user_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/user.js [app-route] (ecmascript)");
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const assert_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/assert/assert.js [app-route] (ecmascript)");
function calculateSizePremiumLiabilityWeight(size, imfFactor, liabilityWeight, precision, isBounded = true) {
    if (imfFactor.eq(numericConstants_1.ZERO)) {
        return liabilityWeight;
    }
    const sizeSqrt = (0, utils_1.squareRootBN)(size.abs().mul(new anchor_1.BN(10)).add(new anchor_1.BN(1))); //1e9 -> 1e10 -> 1e5
    const liabilityWeightNumerator = liabilityWeight.sub(liabilityWeight.div(new anchor_1.BN(5)));
    const denom = new anchor_1.BN(100000).mul(numericConstants_1.SPOT_MARKET_IMF_PRECISION).div(precision);
    (0, assert_1.assert)(denom.gt(numericConstants_1.ZERO));
    const sizePremiumLiabilityWeight = liabilityWeightNumerator.add(sizeSqrt // 1e5
    .mul(imfFactor).div(denom) // 1e5
    );
    let maxLiabilityWeight;
    if (isBounded) {
        maxLiabilityWeight = anchor_1.BN.max(liabilityWeight, sizePremiumLiabilityWeight);
    } else {
        maxLiabilityWeight = sizePremiumLiabilityWeight;
    }
    return maxLiabilityWeight;
}
exports.calculateSizePremiumLiabilityWeight = calculateSizePremiumLiabilityWeight;
function calculateSizeDiscountAssetWeight(size, imfFactor, assetWeight) {
    if (imfFactor.eq(numericConstants_1.ZERO)) {
        return assetWeight;
    }
    const sizeSqrt = (0, utils_1.squareRootBN)(size.abs().mul(new anchor_1.BN(10)).add(new anchor_1.BN(1))); //1e9 -> 1e10 -> 1e5
    const imfNumerator = numericConstants_1.SPOT_MARKET_IMF_PRECISION.add(numericConstants_1.SPOT_MARKET_IMF_PRECISION.div(new anchor_1.BN(10)));
    const sizeDiscountAssetWeight = imfNumerator.mul(numericConstants_1.SPOT_MARKET_WEIGHT_PRECISION).div(numericConstants_1.SPOT_MARKET_IMF_PRECISION.add(sizeSqrt // 1e5
    .mul(imfFactor).div(new anchor_1.BN(100000)) // 1e5
    ));
    const minAssetWeight = anchor_1.BN.min(assetWeight, sizeDiscountAssetWeight);
    return minAssetWeight;
}
exports.calculateSizeDiscountAssetWeight = calculateSizeDiscountAssetWeight;
function calculateOraclePriceForPerpMargin(perpPosition, market, oraclePriceData) {
    const oraclePriceOffset = anchor_1.BN.min(new anchor_1.BN(market.amm.maxSpread).mul(oraclePriceData.price).div(numericConstants_1.BID_ASK_SPREAD_PRECISION), oraclePriceData.confidence.add(new anchor_1.BN(market.amm.baseSpread).mul(oraclePriceData.price).div(numericConstants_1.BID_ASK_SPREAD_PRECISION)));
    let marginPrice;
    if (perpPosition.baseAssetAmount.gt(numericConstants_1.ZERO)) {
        marginPrice = oraclePriceData.price.sub(oraclePriceOffset);
    } else {
        marginPrice = oraclePriceData.price.add(oraclePriceOffset);
    }
    return marginPrice;
}
exports.calculateOraclePriceForPerpMargin = calculateOraclePriceForPerpMargin;
/**
 * This is _not_ the same as liability value as for prediction markets, the liability for the short in prediction market is (1 - oracle price) * base
 * See {@link calculatePerpLiabilityValue} to get the liabiltiy value
 * @param market
 * @param perpPosition
 * @param oraclePriceData
 * @param includeOpenOrders
 */ function calculateBaseAssetValueWithOracle(market, perpPosition, oraclePriceData, includeOpenOrders = false) {
    let price = oraclePriceData.price;
    if ((0, types_1.isVariant)(market.status, 'settlement')) {
        price = market.expiryPrice;
    }
    const baseAssetAmount = includeOpenOrders ? calculateWorstCaseBaseAssetAmount(perpPosition, market, oraclePriceData.price) : perpPosition.baseAssetAmount;
    return baseAssetAmount.abs().mul(price).div(numericConstants_1.AMM_RESERVE_PRECISION);
}
exports.calculateBaseAssetValueWithOracle = calculateBaseAssetValueWithOracle;
function calculateWorstCaseBaseAssetAmount(perpPosition, perpMarket, oraclePrice) {
    return calculateWorstCasePerpLiabilityValue(perpPosition, perpMarket, oraclePrice).worstCaseBaseAssetAmount;
}
exports.calculateWorstCaseBaseAssetAmount = calculateWorstCaseBaseAssetAmount;
function calculateWorstCasePerpLiabilityValue(perpPosition, perpMarket, oraclePrice) {
    const allBids = perpPosition.baseAssetAmount.add(perpPosition.openBids);
    const allAsks = perpPosition.baseAssetAmount.add(perpPosition.openAsks);
    const isPredictionMarket = (0, types_1.isVariant)(perpMarket.contractType, 'prediction');
    const allBidsLiabilityValue = calculatePerpLiabilityValue(allBids, oraclePrice, isPredictionMarket);
    const allAsksLiabilityValue = calculatePerpLiabilityValue(allAsks, oraclePrice, isPredictionMarket);
    if (allAsksLiabilityValue.gte(allBidsLiabilityValue)) {
        return {
            worstCaseBaseAssetAmount: allAsks,
            worstCaseLiabilityValue: allAsksLiabilityValue
        };
    } else {
        return {
            worstCaseBaseAssetAmount: allBids,
            worstCaseLiabilityValue: allBidsLiabilityValue
        };
    }
}
exports.calculateWorstCasePerpLiabilityValue = calculateWorstCasePerpLiabilityValue;
function calculatePerpLiabilityValue(baseAssetAmount, price, isPredictionMarket) {
    if (isPredictionMarket) {
        if (baseAssetAmount.gt(numericConstants_1.ZERO)) {
            return baseAssetAmount.mul(price).div(numericConstants_1.BASE_PRECISION);
        } else {
            return baseAssetAmount.abs().mul(numericConstants_1.MAX_PREDICTION_PRICE.sub(price)).div(numericConstants_1.BASE_PRECISION);
        }
    } else {
        return baseAssetAmount.abs().mul(price).div(numericConstants_1.BASE_PRECISION);
    }
}
exports.calculatePerpLiabilityValue = calculatePerpLiabilityValue;
/**
 * Calculates the margin required to open a trade, in quote amount. Only accounts for the trade size as a scalar value, does not account for the trade direction or current open positions and whether the trade would _actually_ be risk-increasing and use any extra collateral.
 * @param targetMarketIndex
 * @param baseSize
 * @returns
 */ function calculateMarginUSDCRequiredForTrade(driftClient, targetMarketIndex, baseSize, userMaxMarginRatio, userHighLeverageMode, entryPrice) {
    const targetMarket = driftClient.getPerpMarketAccount(targetMarketIndex);
    const price = entryPrice !== null && entryPrice !== void 0 ? entryPrice : driftClient.getOracleDataForPerpMarket(targetMarket.marketIndex).price;
    const perpLiabilityValue = calculatePerpLiabilityValue(baseSize, price, (0, types_1.isVariant)(targetMarket.contractType, 'prediction'));
    const marginRequired = new anchor_1.BN((0, market_1.calculateMarketMarginRatio)(targetMarket, baseSize.abs(), 'Initial', userMaxMarginRatio, userHighLeverageMode)).mul(perpLiabilityValue).div(numericConstants_1.MARGIN_PRECISION);
    return marginRequired;
}
exports.calculateMarginUSDCRequiredForTrade = calculateMarginUSDCRequiredForTrade;
/**
 * Similar to calculatetMarginUSDCRequiredForTrade, but calculates how much of a given collateral is required to cover the margin requirements for a given trade. Basically does the same thing as getMarginUSDCRequiredForTrade but also accounts for asset weight of the selected collateral.
 *
 * Returns collateral required in the precision of the target collateral market.
 */ function calculateCollateralDepositRequiredForTrade(driftClient, targetMarketIndex, baseSize, collateralIndex, userMaxMarginRatio, userHighLeverageMode, estEntryPrice) {
    const marginRequiredUsdc = calculateMarginUSDCRequiredForTrade(driftClient, targetMarketIndex, baseSize, userMaxMarginRatio, userHighLeverageMode, estEntryPrice);
    const collateralMarket = driftClient.getSpotMarketAccount(collateralIndex);
    const collateralOracleData = driftClient.getOracleDataForSpotMarket(collateralIndex);
    const scaledAssetWeight = (0, spotBalance_1.calculateScaledInitialAssetWeight)(collateralMarket, collateralOracleData.price);
    // Base amount required to deposit = (marginRequiredUsdc / priceOfAsset) / assetWeight .. (E.g. $100 required / $10000 price / 0.5 weight)
    const baseAmountRequired = driftClient.convertToSpotPrecision(collateralIndex, marginRequiredUsdc).mul(numericConstants_1.PRICE_PRECISION) // adjust for division by oracle price
    .mul(numericConstants_1.SPOT_MARKET_WEIGHT_PRECISION) // adjust for division by scaled asset weight
    .div(collateralOracleData.price).div(scaledAssetWeight).div(numericConstants_1.QUOTE_PRECISION); // adjust for marginRequiredUsdc value's QUOTE_PRECISION
    // TODO : Round by step size?
    return baseAmountRequired;
}
exports.calculateCollateralDepositRequiredForTrade = calculateCollateralDepositRequiredForTrade;
function calculateCollateralValueOfDeposit(driftClient, collateralIndex, baseSize) {
    const collateralMarket = driftClient.getSpotMarketAccount(collateralIndex);
    const collateralOracleData = driftClient.getOracleDataForSpotMarket(collateralIndex);
    const scaledAssetWeight = (0, spotBalance_1.calculateScaledInitialAssetWeight)(collateralMarket, collateralOracleData.price);
    // CollateralBaseValue = oracle price * collateral base amount (and shift to QUOTE_PRECISION)
    const collateralBaseValue = collateralOracleData.price.mul(baseSize).mul(numericConstants_1.QUOTE_PRECISION).div(numericConstants_1.PRICE_PRECISION).div(new anchor_1.BN(10).pow(new anchor_1.BN(collateralMarket.decimals)));
    const depositCollateralValue = collateralBaseValue.mul(scaledAssetWeight).div(numericConstants_1.SPOT_MARKET_WEIGHT_PRECISION);
    return depositCollateralValue;
}
exports.calculateCollateralValueOfDeposit = calculateCollateralValueOfDeposit;
function calculateLiquidationPrice(freeCollateral, freeCollateralDelta, oraclePrice) {
    const liqPriceDelta = freeCollateral.mul(numericConstants_1.QUOTE_PRECISION).div(freeCollateralDelta);
    const liqPrice = oraclePrice.sub(liqPriceDelta);
    if (liqPrice.lt(numericConstants_1.ZERO)) {
        return new anchor_1.BN(-1);
    }
    return liqPrice;
}
exports.calculateLiquidationPrice = calculateLiquidationPrice;
function calculateUserMaxPerpOrderSize(driftClient, userAccountKey, userAccount, targetMarketIndex, tradeSide) {
    const userAccountSubscriber = new oneShotUserAccountSubscriber_1.OneShotUserAccountSubscriber(driftClient.program, userAccountKey, userAccount);
    const user = new user_1.User({
        driftClient,
        userAccountPublicKey: userAccountKey,
        accountSubscription: {
            type: 'custom',
            userAccountSubscriber: userAccountSubscriber
        }
    });
    user.isSubscribed = true;
    return user.getMaxTradeSizeUSDCForPerp(targetMarketIndex, tradeSide);
}
exports.calculateUserMaxPerpOrderSize = calculateUserMaxPerpOrderSize;
function calcHighLeverageModeInitialMarginRatioFromSize(preSizeAdjMarginRatio, sizeAdjMarginRatio, defaultMarginRatio) {
    let result;
    if (sizeAdjMarginRatio.lt(preSizeAdjMarginRatio)) {
        const sizePctDiscountFactor = numericConstants_1.PERCENTAGE_PRECISION.sub(preSizeAdjMarginRatio.sub(sizeAdjMarginRatio).mul(numericConstants_1.PERCENTAGE_PRECISION).div(preSizeAdjMarginRatio.div(new anchor_1.BN(5))));
        const hlmMarginDelta = anchor_1.BN.max(preSizeAdjMarginRatio.sub(defaultMarginRatio), new anchor_1.BN(1));
        const hlmMarginDeltaProportion = hlmMarginDelta.mul(sizePctDiscountFactor).div(numericConstants_1.PERCENTAGE_PRECISION);
        result = hlmMarginDeltaProportion.add(defaultMarginRatio);
    } else if (sizeAdjMarginRatio.eq(preSizeAdjMarginRatio)) {
        result = defaultMarginRatio;
    } else {
        result = sizeAdjMarginRatio;
    }
    return result;
}
exports.calcHighLeverageModeInitialMarginRatioFromSize = calcHighLeverageModeInitialMarginRatioFromSize;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/orders.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.maxSizeForTargetLiabilityWeightBN = exports.calculateOrderBaseAssetAmount = exports.hasBuilder = exports.isSignedMsgOrder = exports.isTakingOrder = exports.isRestingLimitOrder = exports.isTriggered = exports.mustBeTriggered = exports.isLimitOrder = exports.isMarketOrder = exports.isOrderExpired = exports.calculateBaseAssetAmountToFillUpToLimitPrice = exports.calculateBaseAssetAmountForAmmToFulfill = exports.isLowRiskForAmm = exports.isFillableByVAMM = exports.hasAuctionPrice = exports.hasLimitPrice = exports.applyProtectedMakerParams = exports.getLimitPrice = exports.standardizePrice = exports.standardizeBaseAssetAmount = exports.isOrderReduceOnly = exports.isOrderRiskIncreasingInSameDirection = exports.isOrderRiskIncreasing = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const auction_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/auction.js [app-route] (ecmascript)");
const amm_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/amm.js [app-route] (ecmascript)");
const margin_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/margin.js [app-route] (ecmascript)");
function isOrderRiskIncreasing(user, order) {
    if (!(0, types_1.isVariant)(order.status, 'open')) {
        return false;
    }
    const position = user.getPerpPosition(order.marketIndex) || user.getEmptyPosition(order.marketIndex);
    // if no position exists, it's risk increasing
    if (position.baseAssetAmount.eq(numericConstants_1.ZERO)) {
        return true;
    }
    // if position is long and order is long
    if (position.baseAssetAmount.gt(numericConstants_1.ZERO) && (0, types_1.isVariant)(order.direction, 'long')) {
        return true;
    }
    // if position is short and order is short
    if (position.baseAssetAmount.lt(numericConstants_1.ZERO) && (0, types_1.isVariant)(order.direction, 'short')) {
        return true;
    }
    const baseAssetAmountToFill = order.baseAssetAmount.sub(order.baseAssetAmountFilled);
    // if order will flip position
    if (baseAssetAmountToFill.gt(position.baseAssetAmount.abs().mul(numericConstants_1.TWO))) {
        return true;
    }
    return false;
}
exports.isOrderRiskIncreasing = isOrderRiskIncreasing;
function isOrderRiskIncreasingInSameDirection(user, order) {
    if (!(0, types_1.isVariant)(order.status, 'open')) {
        return false;
    }
    const position = user.getPerpPosition(order.marketIndex) || user.getEmptyPosition(order.marketIndex);
    // if no position exists, it's risk increasing
    if (position.baseAssetAmount.eq(numericConstants_1.ZERO)) {
        return true;
    }
    // if position is long and order is long
    if (position.baseAssetAmount.gt(numericConstants_1.ZERO) && (0, types_1.isVariant)(order.direction, 'long')) {
        return true;
    }
    // if position is short and order is short
    if (position.baseAssetAmount.lt(numericConstants_1.ZERO) && (0, types_1.isVariant)(order.direction, 'short')) {
        return true;
    }
    return false;
}
exports.isOrderRiskIncreasingInSameDirection = isOrderRiskIncreasingInSameDirection;
function isOrderReduceOnly(user, order) {
    if (!(0, types_1.isVariant)(order.status, 'open')) {
        return false;
    }
    const position = user.getPerpPosition(order.marketIndex) || user.getEmptyPosition(order.marketIndex);
    // if position is long and order is long
    if (position.baseAssetAmount.gte(numericConstants_1.ZERO) && (0, types_1.isVariant)(order.direction, 'long')) {
        return false;
    }
    // if position is short and order is short
    if (position.baseAssetAmount.lte(numericConstants_1.ZERO) && (0, types_1.isVariant)(order.direction, 'short')) {
        return false;
    }
    return true;
}
exports.isOrderReduceOnly = isOrderReduceOnly;
function standardizeBaseAssetAmount(baseAssetAmount, stepSize) {
    const remainder = baseAssetAmount.mod(stepSize);
    return baseAssetAmount.sub(remainder);
}
exports.standardizeBaseAssetAmount = standardizeBaseAssetAmount;
function standardizePrice(price, tickSize, direction) {
    if (price.eq(numericConstants_1.ZERO)) {
        console.log('price is zero');
        return price;
    }
    const remainder = price.mod(tickSize);
    if (remainder.eq(numericConstants_1.ZERO)) {
        return price;
    }
    if ((0, types_1.isVariant)(direction, 'long')) {
        return price.sub(remainder);
    } else {
        return price.add(tickSize).sub(remainder);
    }
}
exports.standardizePrice = standardizePrice;
function getLimitPrice(order, oraclePriceData, slot, fallbackPrice, protectedMakerParams) {
    let limitPrice;
    if (hasAuctionPrice(order, slot)) {
        limitPrice = (0, auction_1.getAuctionPrice)(order, slot, oraclePriceData.price);
    } else if (order.oraclePriceOffset !== 0) {
        limitPrice = anchor_1.BN.max(oraclePriceData.price.add(new anchor_1.BN(order.oraclePriceOffset)), numericConstants_1.ONE);
    } else if (order.price.eq(numericConstants_1.ZERO)) {
        limitPrice = fallbackPrice;
    } else {
        limitPrice = order.price;
    }
    if (protectedMakerParams) {
        limitPrice = applyProtectedMakerParams(limitPrice, order.direction, protectedMakerParams);
    }
    return limitPrice;
}
exports.getLimitPrice = getLimitPrice;
function applyProtectedMakerParams(limitPrice, direction, protectedMakerParams) {
    const minOffset = protectedMakerParams.tickSize.muln(8);
    let limitPriceBpsDivisor;
    if (protectedMakerParams.limitPriceDivisor > 0) {
        limitPriceBpsDivisor = 10000 / protectedMakerParams.limitPriceDivisor;
    } else {
        limitPriceBpsDivisor = 1000;
    }
    const limitPriceOffset = anchor_1.BN.min(anchor_1.BN.max(anchor_1.BN.max(limitPrice.divn(limitPriceBpsDivisor), minOffset), protectedMakerParams.dynamicOffset), limitPrice.divn(20));
    if ((0, types_1.isVariant)(direction, 'long')) {
        return anchor_1.BN.max(limitPrice.sub(limitPriceOffset), protectedMakerParams.tickSize);
    } else {
        return limitPrice.add(limitPriceOffset);
    }
}
exports.applyProtectedMakerParams = applyProtectedMakerParams;
function hasLimitPrice(order, slot) {
    return order.price.gt(numericConstants_1.ZERO) || order.oraclePriceOffset != 0 || !(0, auction_1.isAuctionComplete)(order, slot);
}
exports.hasLimitPrice = hasLimitPrice;
function hasAuctionPrice(order, slot) {
    return !(0, auction_1.isAuctionComplete)(order, slot) && (!order.auctionStartPrice.eq(numericConstants_1.ZERO) || !order.auctionEndPrice.eq(numericConstants_1.ZERO));
}
exports.hasAuctionPrice = hasAuctionPrice;
function isFillableByVAMM(order, market, mmOraclePriceData, slot, ts, state) {
    return (0, auction_1.isFallbackAvailableLiquiditySource)(order, mmOraclePriceData, slot, state, market) && calculateBaseAssetAmountForAmmToFulfill(order, market, mmOraclePriceData, slot).gt(numericConstants_1.ZERO) || isOrderExpired(order, ts);
}
exports.isFillableByVAMM = isFillableByVAMM;
function isLowRiskForAmm(order, mmOraclePriceData, isLiquidation) {
    if ((0, types_1.isVariant)(order.marketType, 'spot')) {
        return false;
    }
    const orderOlderThanOracleDelay = new anchor_1.BN(order.slot).lte(mmOraclePriceData.slot);
    return orderOlderThanOracleDelay || isLiquidation || (order.bitFlags & types_1.OrderBitFlag.SafeTriggerOrder) !== 0;
}
exports.isLowRiskForAmm = isLowRiskForAmm;
function calculateBaseAssetAmountForAmmToFulfill(order, market, mmOraclePriceData, slot) {
    if (mustBeTriggered(order) && !isTriggered(order)) {
        return numericConstants_1.ZERO;
    }
    const limitPrice = getLimitPrice(order, mmOraclePriceData, slot);
    let baseAssetAmount;
    const updatedAMM = (0, amm_1.calculateUpdatedAMM)(market.amm, mmOraclePriceData);
    if (limitPrice !== undefined) {
        baseAssetAmount = calculateBaseAssetAmountToFillUpToLimitPrice(order, updatedAMM, limitPrice, mmOraclePriceData);
    } else {
        baseAssetAmount = order.baseAssetAmount.sub(order.baseAssetAmountFilled);
    }
    const maxBaseAssetAmount = (0, amm_1.calculateMaxBaseAssetAmountFillable)(updatedAMM, order.direction);
    return anchor_1.BN.min(maxBaseAssetAmount, baseAssetAmount);
}
exports.calculateBaseAssetAmountForAmmToFulfill = calculateBaseAssetAmountForAmmToFulfill;
function calculateBaseAssetAmountToFillUpToLimitPrice(order, amm, limitPrice, mmOraclePriceData) {
    const adjustedLimitPrice = (0, types_1.isVariant)(order.direction, 'long') ? limitPrice.sub(amm.orderTickSize) : limitPrice.add(amm.orderTickSize);
    const [maxAmountToTrade, direction] = (0, amm_1.calculateMaxBaseAssetAmountToTrade)(amm, adjustedLimitPrice, order.direction, mmOraclePriceData);
    const baseAssetAmount = standardizeBaseAssetAmount(maxAmountToTrade, amm.orderStepSize);
    // Check that directions are the same
    const sameDirection = isSameDirection(direction, order.direction);
    if (!sameDirection) {
        return numericConstants_1.ZERO;
    }
    const baseAssetAmountUnfilled = order.baseAssetAmount.sub(order.baseAssetAmountFilled);
    return baseAssetAmount.gt(baseAssetAmountUnfilled) ? baseAssetAmountUnfilled : baseAssetAmount;
}
exports.calculateBaseAssetAmountToFillUpToLimitPrice = calculateBaseAssetAmountToFillUpToLimitPrice;
function isSameDirection(firstDirection, secondDirection) {
    return (0, types_1.isVariant)(firstDirection, 'long') && (0, types_1.isVariant)(secondDirection, 'long') || (0, types_1.isVariant)(firstDirection, 'short') && (0, types_1.isVariant)(secondDirection, 'short');
}
function isOrderExpired(order, ts, enforceBuffer = false, bufferSeconds = 15) {
    if (mustBeTriggered(order) || !(0, types_1.isVariant)(order.status, 'open') || order.maxTs.eq(numericConstants_1.ZERO)) {
        return false;
    }
    let maxTs;
    if (enforceBuffer && isLimitOrder(order)) {
        maxTs = order.maxTs.addn(bufferSeconds);
    } else {
        maxTs = order.maxTs;
    }
    return new anchor_1.BN(ts).gt(maxTs);
}
exports.isOrderExpired = isOrderExpired;
function isMarketOrder(order) {
    return (0, types_1.isOneOfVariant)(order.orderType, [
        'market',
        'triggerMarket',
        'oracle'
    ]);
}
exports.isMarketOrder = isMarketOrder;
function isLimitOrder(order) {
    return (0, types_1.isOneOfVariant)(order.orderType, [
        'limit',
        'triggerLimit'
    ]);
}
exports.isLimitOrder = isLimitOrder;
function mustBeTriggered(order) {
    return (0, types_1.isOneOfVariant)(order.orderType, [
        'triggerMarket',
        'triggerLimit'
    ]);
}
exports.mustBeTriggered = mustBeTriggered;
function isTriggered(order) {
    return (0, types_1.isOneOfVariant)(order.triggerCondition, [
        'triggeredAbove',
        'triggeredBelow'
    ]);
}
exports.isTriggered = isTriggered;
function isRestingLimitOrder(order, slot) {
    if (!isLimitOrder(order)) {
        return false;
    }
    return order.postOnly || (0, auction_1.isAuctionComplete)(order, slot);
}
exports.isRestingLimitOrder = isRestingLimitOrder;
function isTakingOrder(order, slot) {
    return isMarketOrder(order) || !isRestingLimitOrder(order, slot);
}
exports.isTakingOrder = isTakingOrder;
const FLAG_IS_SIGNED_MSG = 0x01;
function isSignedMsgOrder(order) {
    return (order.bitFlags & FLAG_IS_SIGNED_MSG) !== 0;
}
exports.isSignedMsgOrder = isSignedMsgOrder;
const FLAG_HAS_BUILDER = 0x10;
function hasBuilder(order) {
    return (order.bitFlags & FLAG_HAS_BUILDER) !== 0;
}
exports.hasBuilder = hasBuilder;
function calculateOrderBaseAssetAmount(order, existingBaseAssetAmount) {
    if (!order.reduceOnly) {
        return order.baseAssetAmount;
    }
    if ((0, types_1.isVariant)(order.direction, 'long')) {
        return anchor_1.BN.min(anchor_1.BN.min(existingBaseAssetAmount, numericConstants_1.ZERO).abs(), order.baseAssetAmount);
    } else {
        return anchor_1.BN.min(anchor_1.BN.max(existingBaseAssetAmount, numericConstants_1.ZERO), order.baseAssetAmount);
    }
}
exports.calculateOrderBaseAssetAmount = calculateOrderBaseAssetAmount;
// ---------- inverse ----------
/**
 * Invert the size-premium liability weight: given a target margin ratio (liability weight),
 * return the max `size` (AMM_RESERVE_PRECISION units) that still yields <= target.
 *
 * Returns:
 * - BN size (>=0) if bounded
 * - null if impossible (target < liabilityWeight) OR imfFactor == 0 (unbounded)
 */ function maxSizeForTargetLiabilityWeightBN(target, imfFactor, liabilityWeight, market) {
    if (target.lt(liabilityWeight)) return null;
    if (imfFactor.isZero()) return null;
    const base = liabilityWeight.muln(4).divn(5);
    const denom = new anchor_1.BN(100000).mul(numericConstants_1.SPOT_MARKET_IMF_PRECISION).div(numericConstants_1.MARGIN_PRECISION);
    if (denom.isZero()) throw new Error('denom=0: bad precision/spotImfPrecision');
    const allowedInc = target.gt(base) ? target.sub(base) : numericConstants_1.ZERO;
    const maxSqrt = allowedInc.mul(denom).div(imfFactor);
    if (maxSqrt.lte(numericConstants_1.ZERO)) {
        const fitsZero = (0, margin_1.calculateSizePremiumLiabilityWeight)(numericConstants_1.ZERO, imfFactor, liabilityWeight, numericConstants_1.MARGIN_PRECISION).lte(target);
        return fitsZero ? numericConstants_1.ZERO : null;
    }
    let hi = maxSqrt.mul(maxSqrt).sub(numericConstants_1.ONE).divn(10);
    if (hi.isNeg()) hi = numericConstants_1.ZERO;
    let lo = numericConstants_1.ZERO;
    while(lo.lt(hi)){
        const mid = lo.add(hi).add(numericConstants_1.ONE).divn(2); // upper mid to prevent infinite loop
        if ((0, margin_1.calculateSizePremiumLiabilityWeight)(mid, imfFactor, liabilityWeight, numericConstants_1.MARGIN_PRECISION).lte(target)) {
            lo = mid;
        } else {
            hi = mid.sub(numericConstants_1.ONE);
        }
    }
    // cap at max OI
    const maxOpenInterest = market.amm.maxOpenInterest;
    if (lo.gt(maxOpenInterest)) {
        return maxOpenInterest;
    }
    return lo;
}
exports.maxSizeForTargetLiabilityWeightBN = maxSizeForTargetLiabilityWeightBN;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/repeg.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.calculateBudgetedPeg = exports.calculateBudgetedK = exports.calculateBudgetedKBN = exports.calculateRepegCost = exports.calculateAdjustKCost = void 0;
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const assert_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/assert/assert.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
/**
 * Helper function calculating adjust k cost
 * @param amm
 * @param numerator
 * @param denomenator
 * @returns cost : Precision QUOTE_ASSET_PRECISION
 */ function calculateAdjustKCost(amm, numerator, denomenator) {
    // const k = market.amm.sqrtK.mul(market.amm.sqrtK);
    const x = amm.baseAssetReserve;
    const y = amm.quoteAssetReserve;
    const d = amm.baseAssetAmountWithAmm;
    const Q = amm.pegMultiplier;
    const quoteScale = y.mul(d).mul(Q); //.div(AMM_RESERVE_PRECISION);
    const p = numerator.mul(numericConstants_1.PRICE_PRECISION).div(denomenator);
    const cost = quoteScale.mul(numericConstants_1.PERCENTAGE_PRECISION).mul(numericConstants_1.PERCENTAGE_PRECISION).div(x.add(d)).sub(quoteScale.mul(p).mul(numericConstants_1.PERCENTAGE_PRECISION).mul(numericConstants_1.PERCENTAGE_PRECISION).div(numericConstants_1.PRICE_PRECISION).div(x.mul(p).div(numericConstants_1.PRICE_PRECISION).add(d))).div(numericConstants_1.PERCENTAGE_PRECISION).div(numericConstants_1.PERCENTAGE_PRECISION).div(numericConstants_1.AMM_TO_QUOTE_PRECISION_RATIO).div(numericConstants_1.PEG_PRECISION);
    return cost.mul(new anchor_1.BN(-1));
}
exports.calculateAdjustKCost = calculateAdjustKCost;
// /**
//  * Helper function calculating adjust k cost
//  * @param amm
//  * @param numerator
//  * @param denomenator
//  * @returns cost : Precision QUOTE_ASSET_PRECISION
//  */
// export function calculateAdjustKCost2(
// 	amm: AMM,
// 	numerator: BN,
// 	denomenator: BN
// ): BN {
// 	// const k = market.amm.sqrtK.mul(market.amm.sqrtK);
// 	const directionToClose = amm.baseAssetAmountWithAmm.gt(ZERO)
// 		? PositionDirection.SHORT
// 		: PositionDirection.LONG;
// 	const [newQuoteAssetReserve, _newBaseAssetReserve] =
// 		calculateAmmReservesAfterSwap(
// 			amm,
// 			'base',
// 			amm.baseAssetAmountWithAmm.abs(),
// 			getSwapDirection('base', directionToClose)
// 		);
// }
/**
 * Helper function calculating adjust pegMultiplier (repeg) cost
 *
 * @param amm
 * @param newPeg
 * @returns cost : Precision QUOTE_ASSET_PRECISION
 */ function calculateRepegCost(amm, newPeg) {
    const dqar = amm.quoteAssetReserve.sub(amm.terminalQuoteAssetReserve);
    const cost = dqar.mul(newPeg.sub(amm.pegMultiplier)).div(numericConstants_1.AMM_TO_QUOTE_PRECISION_RATIO).div(numericConstants_1.PEG_PRECISION);
    return cost;
}
exports.calculateRepegCost = calculateRepegCost;
function calculateBudgetedKBN(x, y, budget, Q, d) {
    (0, assert_1.assert)(Q.gt(new anchor_1.BN(0)));
    const C = budget.mul(new anchor_1.BN(-1));
    let dSign = new anchor_1.BN(1);
    if (d.lt(new anchor_1.BN(0))) {
        dSign = new anchor_1.BN(-1);
    }
    const pegged_y_d_d = y.mul(d).mul(d).mul(Q).div(numericConstants_1.AMM_RESERVE_PRECISION).div(numericConstants_1.AMM_RESERVE_PRECISION).div(numericConstants_1.PEG_PRECISION);
    const numer1 = pegged_y_d_d;
    const numer2 = C.mul(d).div(numericConstants_1.QUOTE_PRECISION).mul(x.add(d)).div(numericConstants_1.AMM_RESERVE_PRECISION).mul(dSign);
    const denom1 = C.mul(x).mul(x.add(d)).div(numericConstants_1.AMM_RESERVE_PRECISION).div(numericConstants_1.QUOTE_PRECISION);
    const denom2 = pegged_y_d_d;
    // protocol is spending to increase k
    if (C.lt(numericConstants_1.ZERO)) {
        // thus denom1 is negative and solution is unstable
        if (denom1.abs().gt(denom2.abs())) {
            console.log('denom1 > denom2', denom1.toString(), denom2.toString());
            console.log('budget cost exceeds stable K solution');
            return [
                new anchor_1.BN(10000),
                new anchor_1.BN(1)
            ];
        }
    }
    const numerator = numer1.sub(numer2).div(numericConstants_1.AMM_TO_QUOTE_PRECISION_RATIO);
    const denominator = denom1.add(denom2).div(numericConstants_1.AMM_TO_QUOTE_PRECISION_RATIO);
    return [
        numerator,
        denominator
    ];
}
exports.calculateBudgetedKBN = calculateBudgetedKBN;
function calculateBudgetedK(amm, cost) {
    // wolframalpha.com
    // (1/(x+d) - p/(x*p+d))*y*d*Q = C solve for p
    // p = (d(y*d*Q - C(x+d))) / (C*x(x+d) + y*d*d*Q)
    // numer
    //   =  y*d*d*Q - Cxd - Cdd
    //   =  y/x*Q*d*d - Cd - Cd/x
    //   = mark      - C/d - C/(x)
    //   =  mark/C    - 1/d - 1/x
    // denom
    // = C*x*x + C*x*d + y*d*d*Q
    // = x/d**2 + 1 / d + mark/C
    // todo: assumes k = x * y
    // otherwise use: (y(1-p) + (kp^2/(x*p+d)) - k/(x+d)) * Q = C solve for p
    const x = amm.baseAssetReserve;
    const y = amm.quoteAssetReserve;
    const d = amm.baseAssetAmountWithAmm;
    const Q = amm.pegMultiplier;
    const [numerator, denominator] = calculateBudgetedKBN(x, y, cost, Q, d);
    return [
        numerator,
        denominator
    ];
}
exports.calculateBudgetedK = calculateBudgetedK;
function calculateBudgetedPeg(amm, budget, targetPrice) {
    let perPegCost = amm.quoteAssetReserve.sub(amm.terminalQuoteAssetReserve).div(numericConstants_1.AMM_RESERVE_PRECISION.div(numericConstants_1.PRICE_PRECISION));
    if (perPegCost.gt(numericConstants_1.ZERO)) {
        perPegCost = perPegCost.add(numericConstants_1.ONE);
    } else if (perPegCost.lt(numericConstants_1.ZERO)) {
        perPegCost = perPegCost.sub(numericConstants_1.ONE);
    }
    const targetPeg = targetPrice.mul(amm.baseAssetReserve).div(amm.quoteAssetReserve).div(numericConstants_1.PRICE_DIV_PEG);
    const pegChangeDirection = targetPeg.sub(amm.pegMultiplier);
    const useTargetPeg = perPegCost.lt(numericConstants_1.ZERO) && pegChangeDirection.gt(numericConstants_1.ZERO) || perPegCost.gt(numericConstants_1.ZERO) && pegChangeDirection.lt(numericConstants_1.ZERO);
    if (perPegCost.eq(numericConstants_1.ZERO) || useTargetPeg) {
        return targetPeg;
    }
    const budgetDeltaPeg = budget.mul(numericConstants_1.PEG_PRECISION).div(perPegCost);
    const newPeg = anchor_1.BN.max(numericConstants_1.ONE, amm.pegMultiplier.add(budgetDeltaPeg));
    return newPeg;
}
exports.calculateBudgetedPeg = calculateBudgetedPeg;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/amm.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.calculateMaxBaseAssetAmountFillable = exports.calculateQuoteAssetAmountSwapped = exports.calculateMaxBaseAssetAmountToTrade = exports.calculateTerminalPrice = exports.getSwapDirection = exports.calculateSwapOutput = exports.calculateSpreadReserves = exports.getQuoteAssetReservePredictionMarketBounds = exports.calculateSpread = exports.calculateSpreadBN = exports.calculateVolSpreadBN = exports.calculateMaxSpread = exports.calculateEffectiveLeverage = exports.calculateReferencePriceOffset = exports.calculateInventoryScale = exports.calculateInventoryLiquidityRatioForReferencePriceOffset = exports.calculateInventoryLiquidityRatio = exports.calculateMarketOpenBidAsk = exports.calculateAmmReservesAfterSwap = exports.calculatePrice = exports.calculateBidAskPrice = exports.calculateUpdatedAMMSpreadReserves = exports.calculateUpdatedAMM = exports.calculateNewAmm = exports.calculateOptimalPegAndBudget = exports.calculatePegFromTargetPrice = void 0;
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const assert_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/assert/assert.js [app-route] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/utils.js [app-route] (ecmascript)");
const orders_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/orders.js [app-route] (ecmascript)");
const repeg_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/repeg.js [app-route] (ecmascript)");
const oracles_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/oracles.js [app-route] (ecmascript)");
function calculatePegFromTargetPrice(targetPrice, baseAssetReserve, quoteAssetReserve) {
    return anchor_1.BN.max(targetPrice.mul(baseAssetReserve).div(quoteAssetReserve).add(numericConstants_1.PRICE_DIV_PEG.div(new anchor_1.BN(2))).div(numericConstants_1.PRICE_DIV_PEG), numericConstants_1.ONE);
}
exports.calculatePegFromTargetPrice = calculatePegFromTargetPrice;
function calculateOptimalPegAndBudget(amm, mmOraclePriceData) {
    const reservePriceBefore = calculatePrice(amm.baseAssetReserve, amm.quoteAssetReserve, amm.pegMultiplier);
    const targetPrice = mmOraclePriceData.price;
    const newPeg = calculatePegFromTargetPrice(targetPrice, amm.baseAssetReserve, amm.quoteAssetReserve);
    const prePegCost = (0, repeg_1.calculateRepegCost)(amm, newPeg);
    const totalFeeLB = amm.totalExchangeFee.div(new anchor_1.BN(2));
    const budget = anchor_1.BN.max(numericConstants_1.ZERO, amm.totalFeeMinusDistributions.sub(totalFeeLB));
    let checkLowerBound = true;
    if (budget.lt(prePegCost)) {
        const halfMaxPriceSpread = new anchor_1.BN(amm.maxSpread).div(new anchor_1.BN(2)).mul(targetPrice).div(numericConstants_1.BID_ASK_SPREAD_PRECISION);
        let newTargetPrice;
        let newOptimalPeg;
        let newBudget;
        const targetPriceGap = reservePriceBefore.sub(targetPrice);
        if (targetPriceGap.abs().gt(halfMaxPriceSpread)) {
            const markAdj = targetPriceGap.abs().sub(halfMaxPriceSpread);
            if (targetPriceGap.lt(new anchor_1.BN(0))) {
                newTargetPrice = reservePriceBefore.add(markAdj);
            } else {
                newTargetPrice = reservePriceBefore.sub(markAdj);
            }
            newOptimalPeg = calculatePegFromTargetPrice(newTargetPrice, amm.baseAssetReserve, amm.quoteAssetReserve);
            newBudget = (0, repeg_1.calculateRepegCost)(amm, newOptimalPeg);
            checkLowerBound = false;
            return [
                newTargetPrice,
                newOptimalPeg,
                newBudget,
                false
            ];
        } else if (amm.totalFeeMinusDistributions.lt(amm.totalExchangeFee.div(new anchor_1.BN(2)))) {
            checkLowerBound = false;
        }
    }
    return [
        targetPrice,
        newPeg,
        budget,
        checkLowerBound
    ];
}
exports.calculateOptimalPegAndBudget = calculateOptimalPegAndBudget;
function calculateNewAmm(amm, mmOraclePriceData) {
    let pKNumer = new anchor_1.BN(1);
    let pKDenom = new anchor_1.BN(1);
    const [targetPrice, _newPeg, budget, _checkLowerBound] = calculateOptimalPegAndBudget(amm, mmOraclePriceData);
    let prePegCost = (0, repeg_1.calculateRepegCost)(amm, _newPeg);
    let newPeg = _newPeg;
    if (prePegCost.gte(budget) && prePegCost.gt(numericConstants_1.ZERO)) {
        [pKNumer, pKDenom] = [
            new anchor_1.BN(999),
            new anchor_1.BN(1000)
        ];
        const deficitMadeup = (0, repeg_1.calculateAdjustKCost)(amm, pKNumer, pKDenom);
        (0, assert_1.assert)(deficitMadeup.lte(new anchor_1.BN(0)));
        prePegCost = budget.add(deficitMadeup.abs());
        const newAmm = Object.assign({}, amm);
        newAmm.baseAssetReserve = newAmm.baseAssetReserve.mul(pKNumer).div(pKDenom);
        newAmm.sqrtK = newAmm.sqrtK.mul(pKNumer).div(pKDenom);
        const invariant = newAmm.sqrtK.mul(newAmm.sqrtK);
        newAmm.quoteAssetReserve = invariant.div(newAmm.baseAssetReserve);
        const directionToClose = amm.baseAssetAmountWithAmm.gt(numericConstants_1.ZERO) ? types_1.PositionDirection.SHORT : types_1.PositionDirection.LONG;
        const [newQuoteAssetReserve, _newBaseAssetReserve] = calculateAmmReservesAfterSwap(newAmm, 'base', amm.baseAssetAmountWithAmm.abs(), getSwapDirection('base', directionToClose));
        newAmm.terminalQuoteAssetReserve = newQuoteAssetReserve;
        newPeg = (0, repeg_1.calculateBudgetedPeg)(newAmm, prePegCost, targetPrice);
        prePegCost = (0, repeg_1.calculateRepegCost)(newAmm, newPeg);
    }
    return [
        prePegCost,
        pKNumer,
        pKDenom,
        newPeg
    ];
}
exports.calculateNewAmm = calculateNewAmm;
function calculateUpdatedAMM(amm, mmOraclePriceData) {
    if (amm.curveUpdateIntensity == 0 || mmOraclePriceData === undefined) {
        return amm;
    }
    const newAmm = Object.assign({}, amm);
    const [prepegCost, pKNumer, pKDenom, newPeg] = calculateNewAmm(amm, mmOraclePriceData);
    newAmm.baseAssetReserve = newAmm.baseAssetReserve.mul(pKNumer).div(pKDenom);
    newAmm.sqrtK = newAmm.sqrtK.mul(pKNumer).div(pKDenom);
    const invariant = newAmm.sqrtK.mul(newAmm.sqrtK);
    newAmm.quoteAssetReserve = invariant.div(newAmm.baseAssetReserve);
    newAmm.pegMultiplier = newPeg;
    const directionToClose = amm.baseAssetAmountWithAmm.gt(numericConstants_1.ZERO) ? types_1.PositionDirection.SHORT : types_1.PositionDirection.LONG;
    const [newQuoteAssetReserve, _newBaseAssetReserve] = calculateAmmReservesAfterSwap(newAmm, 'base', amm.baseAssetAmountWithAmm.abs(), getSwapDirection('base', directionToClose));
    newAmm.terminalQuoteAssetReserve = newQuoteAssetReserve;
    newAmm.totalFeeMinusDistributions = newAmm.totalFeeMinusDistributions.sub(prepegCost);
    newAmm.netRevenueSinceLastFunding = newAmm.netRevenueSinceLastFunding.sub(prepegCost);
    return newAmm;
}
exports.calculateUpdatedAMM = calculateUpdatedAMM;
function calculateUpdatedAMMSpreadReserves(amm, direction, mmOraclePriceData, isPrediction = false, latestSlot) {
    const newAmm = calculateUpdatedAMM(amm, mmOraclePriceData);
    const [shortReserves, longReserves] = calculateSpreadReserves(newAmm, mmOraclePriceData, undefined, isPrediction, latestSlot);
    const dirReserves = (0, types_1.isVariant)(direction, 'long') ? longReserves : shortReserves;
    const result = {
        baseAssetReserve: dirReserves.baseAssetReserve,
        quoteAssetReserve: dirReserves.quoteAssetReserve,
        sqrtK: newAmm.sqrtK,
        newPeg: newAmm.pegMultiplier
    };
    return result;
}
exports.calculateUpdatedAMMSpreadReserves = calculateUpdatedAMMSpreadReserves;
function calculateBidAskPrice(amm, mmOraclePriceData, withUpdate = true, isPrediction = false, latestSlot) {
    let newAmm;
    if (withUpdate) {
        newAmm = calculateUpdatedAMM(amm, mmOraclePriceData);
    } else {
        newAmm = amm;
    }
    const [bidReserves, askReserves] = calculateSpreadReserves(newAmm, mmOraclePriceData, undefined, isPrediction, latestSlot);
    const askPrice = calculatePrice(askReserves.baseAssetReserve, askReserves.quoteAssetReserve, newAmm.pegMultiplier);
    const bidPrice = calculatePrice(bidReserves.baseAssetReserve, bidReserves.quoteAssetReserve, newAmm.pegMultiplier);
    return [
        bidPrice,
        askPrice
    ];
}
exports.calculateBidAskPrice = calculateBidAskPrice;
/**
 * Calculates a price given an arbitrary base and quote amount (they must have the same precision)
 *
 * @param baseAssetReserves
 * @param quoteAssetReserves
 * @param pegMultiplier
 * @returns price : Precision PRICE_PRECISION
 */ function calculatePrice(baseAssetReserves, quoteAssetReserves, pegMultiplier) {
    if (baseAssetReserves.abs().lte(numericConstants_1.ZERO)) {
        return new anchor_1.BN(0);
    }
    return quoteAssetReserves.mul(numericConstants_1.PRICE_PRECISION).mul(pegMultiplier).div(numericConstants_1.PEG_PRECISION).div(baseAssetReserves);
}
exports.calculatePrice = calculatePrice;
/**
 * Calculates what the amm reserves would be after swapping a quote or base asset amount.
 *
 * @param amm
 * @param inputAssetType
 * @param swapAmount
 * @param swapDirection
 * @returns quoteAssetReserve and baseAssetReserve after swap. : Precision AMM_RESERVE_PRECISION
 */ function calculateAmmReservesAfterSwap(amm, inputAssetType, swapAmount, swapDirection) {
    (0, assert_1.assert)(swapAmount.gte(numericConstants_1.ZERO), 'swapAmount must be greater than 0');
    let newQuoteAssetReserve;
    let newBaseAssetReserve;
    if (inputAssetType === 'quote') {
        swapAmount = swapAmount.mul(numericConstants_1.AMM_TIMES_PEG_TO_QUOTE_PRECISION_RATIO).div(amm.pegMultiplier);
        [newQuoteAssetReserve, newBaseAssetReserve] = calculateSwapOutput(amm.quoteAssetReserve, swapAmount, swapDirection, amm.sqrtK.mul(amm.sqrtK));
    } else {
        [newBaseAssetReserve, newQuoteAssetReserve] = calculateSwapOutput(amm.baseAssetReserve, swapAmount, swapDirection, amm.sqrtK.mul(amm.sqrtK));
    }
    return [
        newQuoteAssetReserve,
        newBaseAssetReserve
    ];
}
exports.calculateAmmReservesAfterSwap = calculateAmmReservesAfterSwap;
function calculateMarketOpenBidAsk(baseAssetReserve, minBaseAssetReserve, maxBaseAssetReserve, stepSize) {
    // open orders
    let openAsks;
    if (minBaseAssetReserve.lt(baseAssetReserve)) {
        openAsks = baseAssetReserve.sub(minBaseAssetReserve).mul(new anchor_1.BN(-1));
        if (stepSize && openAsks.abs().div(numericConstants_1.TWO).lt(stepSize)) {
            openAsks = numericConstants_1.ZERO;
        }
    } else {
        openAsks = numericConstants_1.ZERO;
    }
    let openBids;
    if (maxBaseAssetReserve.gt(baseAssetReserve)) {
        openBids = maxBaseAssetReserve.sub(baseAssetReserve);
        if (stepSize && openBids.div(numericConstants_1.TWO).lt(stepSize)) {
            openBids = numericConstants_1.ZERO;
        }
    } else {
        openBids = numericConstants_1.ZERO;
    }
    return [
        openBids,
        openAsks
    ];
}
exports.calculateMarketOpenBidAsk = calculateMarketOpenBidAsk;
function calculateInventoryLiquidityRatio(baseAssetAmountWithAmm, baseAssetReserve, minBaseAssetReserve, maxBaseAssetReserve) {
    // inventory skew
    const [openBids, openAsks] = calculateMarketOpenBidAsk(baseAssetReserve, minBaseAssetReserve, maxBaseAssetReserve);
    const minSideLiquidity = anchor_1.BN.min(openBids.abs(), openAsks.abs());
    const inventoryScaleBN = anchor_1.BN.min(baseAssetAmountWithAmm.mul(numericConstants_1.PERCENTAGE_PRECISION).div(anchor_1.BN.max(minSideLiquidity, numericConstants_1.ONE)).abs(), numericConstants_1.PERCENTAGE_PRECISION);
    return inventoryScaleBN;
}
exports.calculateInventoryLiquidityRatio = calculateInventoryLiquidityRatio;
function calculateInventoryLiquidityRatioForReferencePriceOffset(baseAssetAmountWithAmm, baseAssetReserve, minBaseAssetReserve, maxBaseAssetReserve) {
    // inventory skew
    const [openBids, openAsks] = calculateMarketOpenBidAsk(baseAssetReserve, minBaseAssetReserve, maxBaseAssetReserve);
    const avgSideLiquidity = openBids.abs().add(openAsks.abs()).div(numericConstants_1.TWO);
    const inventoryScaleBN = anchor_1.BN.min(baseAssetAmountWithAmm.mul(numericConstants_1.PERCENTAGE_PRECISION).div(anchor_1.BN.max(avgSideLiquidity, numericConstants_1.ONE)).abs(), numericConstants_1.PERCENTAGE_PRECISION);
    return inventoryScaleBN;
}
exports.calculateInventoryLiquidityRatioForReferencePriceOffset = calculateInventoryLiquidityRatioForReferencePriceOffset;
function calculateInventoryScale(baseAssetAmountWithAmm, baseAssetReserve, minBaseAssetReserve, maxBaseAssetReserve, directionalSpread, maxSpread) {
    if (baseAssetAmountWithAmm.eq(numericConstants_1.ZERO)) {
        return 1;
    }
    const MAX_BID_ASK_INVENTORY_SKEW_FACTOR = numericConstants_1.BID_ASK_SPREAD_PRECISION.mul(new anchor_1.BN(10));
    const inventoryScaleBN = calculateInventoryLiquidityRatio(baseAssetAmountWithAmm, baseAssetReserve, minBaseAssetReserve, maxBaseAssetReserve);
    const inventoryScaleMaxBN = anchor_1.BN.max(MAX_BID_ASK_INVENTORY_SKEW_FACTOR, new anchor_1.BN(maxSpread).mul(numericConstants_1.BID_ASK_SPREAD_PRECISION).div(new anchor_1.BN(Math.max(directionalSpread, 1))));
    const inventoryScaleCapped = anchor_1.BN.min(inventoryScaleMaxBN, numericConstants_1.BID_ASK_SPREAD_PRECISION.add(inventoryScaleMaxBN.mul(inventoryScaleBN).div(numericConstants_1.PERCENTAGE_PRECISION))).toNumber() / numericConstants_1.BID_ASK_SPREAD_PRECISION.toNumber();
    return inventoryScaleCapped;
}
exports.calculateInventoryScale = calculateInventoryScale;
function calculateReferencePriceOffset(reservePrice, last24hAvgFundingRate, liquidityFraction, oracleTwapFast, markTwapFast, oracleTwapSlow, markTwapSlow, maxOffsetPct) {
    if (last24hAvgFundingRate.eq(numericConstants_1.ZERO) || liquidityFraction.eq(numericConstants_1.ZERO)) {
        return numericConstants_1.ZERO;
    }
    const maxOffsetInPrice = new anchor_1.BN(maxOffsetPct).mul(reservePrice).div(numericConstants_1.PERCENTAGE_PRECISION);
    // Calculate quote denominated market premium
    const markPremiumMinute = (0, utils_1.clampBN)(markTwapFast.sub(oracleTwapFast), maxOffsetInPrice.mul(new anchor_1.BN(-1)), maxOffsetInPrice);
    const markPremiumHour = (0, utils_1.clampBN)(markTwapSlow.sub(oracleTwapSlow), maxOffsetInPrice.mul(new anchor_1.BN(-1)), maxOffsetInPrice);
    // Convert last24hAvgFundingRate to quote denominated premium
    const markPremiumDay = (0, utils_1.clampBN)(last24hAvgFundingRate.div(numericConstants_1.FUNDING_RATE_BUFFER_PRECISION).mul(new anchor_1.BN(24)), maxOffsetInPrice.mul(new anchor_1.BN(-1)), maxOffsetInPrice);
    // Take average clamped premium as the price-based offset
    const markPremiumAvg = markPremiumMinute.add(markPremiumHour).add(markPremiumDay).div(new anchor_1.BN(3));
    const markPremiumAvgPct = markPremiumAvg.mul(numericConstants_1.PRICE_PRECISION).div(reservePrice);
    const inventoryPct = (0, utils_1.clampBN)(liquidityFraction.mul(new anchor_1.BN(maxOffsetPct)).div(numericConstants_1.PERCENTAGE_PRECISION), new anchor_1.BN(maxOffsetPct).mul(new anchor_1.BN(-1)), new anchor_1.BN(maxOffsetPct));
    // Only apply when inventory is consistent with recent and 24h market premium
    let offsetPct = markPremiumAvgPct.add(inventoryPct);
    if (!(0, utils_1.sigNum)(inventoryPct).eq((0, utils_1.sigNum)(markPremiumAvgPct))) {
        offsetPct = numericConstants_1.ZERO;
    }
    const clampedOffsetPct = (0, utils_1.clampBN)(offsetPct, new anchor_1.BN(-maxOffsetPct), new anchor_1.BN(maxOffsetPct));
    return clampedOffsetPct;
}
exports.calculateReferencePriceOffset = calculateReferencePriceOffset;
function calculateEffectiveLeverage(baseSpread, quoteAssetReserve, terminalQuoteAssetReserve, pegMultiplier, netBaseAssetAmount, reservePrice, totalFeeMinusDistributions) {
    // vAMM skew
    const netBaseAssetValue = quoteAssetReserve.sub(terminalQuoteAssetReserve).mul(pegMultiplier).div(numericConstants_1.AMM_TIMES_PEG_TO_QUOTE_PRECISION_RATIO);
    const localBaseAssetValue = netBaseAssetAmount.mul(reservePrice).div(numericConstants_1.AMM_TO_QUOTE_PRECISION_RATIO.mul(numericConstants_1.PRICE_PRECISION));
    const effectiveGap = Math.max(0, localBaseAssetValue.sub(netBaseAssetValue).toNumber());
    const effectiveLeverage = effectiveGap / (Math.max(0, totalFeeMinusDistributions.toNumber()) + 1) + 1 / numericConstants_1.QUOTE_PRECISION.toNumber();
    return effectiveLeverage;
}
exports.calculateEffectiveLeverage = calculateEffectiveLeverage;
function calculateMaxSpread(marginRatioInitial) {
    const maxTargetSpread = new anchor_1.BN(marginRatioInitial).mul(numericConstants_1.BID_ASK_SPREAD_PRECISION.div(numericConstants_1.MARGIN_PRECISION)).toNumber();
    return maxTargetSpread;
}
exports.calculateMaxSpread = calculateMaxSpread;
function calculateVolSpreadBN(lastOracleConfPct, reservePrice, markStd, oracleStd, longIntensity, shortIntensity, volume24H) {
    const marketAvgStdPct = markStd.add(oracleStd).mul(numericConstants_1.PERCENTAGE_PRECISION).div(reservePrice).div(new anchor_1.BN(4));
    const volSpread = anchor_1.BN.max(lastOracleConfPct, marketAvgStdPct.div(new anchor_1.BN(2)));
    const clampMin = numericConstants_1.PERCENTAGE_PRECISION.div(new anchor_1.BN(100));
    const clampMax = numericConstants_1.PERCENTAGE_PRECISION;
    const longVolSpreadFactor = (0, utils_1.clampBN)(longIntensity.mul(numericConstants_1.PERCENTAGE_PRECISION).div(anchor_1.BN.max(numericConstants_1.ONE, volume24H)), clampMin, clampMax);
    const shortVolSpreadFactor = (0, utils_1.clampBN)(shortIntensity.mul(numericConstants_1.PERCENTAGE_PRECISION).div(anchor_1.BN.max(numericConstants_1.ONE, volume24H)), clampMin, clampMax);
    // only consider confidence interval at full value when above 25 bps
    let confComponent = lastOracleConfPct;
    if (lastOracleConfPct.lte(numericConstants_1.PRICE_PRECISION.div(new anchor_1.BN(400)))) {
        confComponent = lastOracleConfPct.div(new anchor_1.BN(20));
    }
    const longVolSpread = anchor_1.BN.max(confComponent, volSpread.mul(longVolSpreadFactor).div(numericConstants_1.PERCENTAGE_PRECISION));
    const shortVolSpread = anchor_1.BN.max(confComponent, volSpread.mul(shortVolSpreadFactor).div(numericConstants_1.PERCENTAGE_PRECISION));
    return [
        longVolSpread,
        shortVolSpread
    ];
}
exports.calculateVolSpreadBN = calculateVolSpreadBN;
function calculateSpreadBN(baseSpread, lastOracleReservePriceSpreadPct, lastOracleConfPct, maxSpread, quoteAssetReserve, terminalQuoteAssetReserve, pegMultiplier, baseAssetAmountWithAmm, reservePrice, totalFeeMinusDistributions, netRevenueSinceLastFunding, baseAssetReserve, minBaseAssetReserve, maxBaseAssetReserve, markStd, oracleStd, longIntensity, shortIntensity, volume24H, ammInventorySpreadAdjustment, returnTerms = false) {
    (0, assert_1.assert)(Number.isInteger(baseSpread));
    (0, assert_1.assert)(Number.isInteger(maxSpread));
    const spreadTerms = {
        longVolSpread: 0,
        shortVolSpread: 0,
        longSpreadwPS: 0,
        shortSpreadwPS: 0,
        maxTargetSpread: 0,
        inventorySpreadScale: 0,
        longSpreadwInvScale: 0,
        shortSpreadwInvScale: 0,
        effectiveLeverage: 0,
        effectiveLeverageCapped: 0,
        longSpreadwEL: 0,
        shortSpreadwEL: 0,
        revenueRetreatAmount: 0,
        halfRevenueRetreatAmount: 0,
        longSpreadwRevRetreat: 0,
        shortSpreadwRevRetreat: 0,
        longSpreadwOffsetShrink: 0,
        shortSpreadwOffsetShrink: 0,
        totalSpread: 0,
        longSpread: 0,
        shortSpread: 0
    };
    const [longVolSpread, shortVolSpread] = calculateVolSpreadBN(lastOracleConfPct, reservePrice, markStd, oracleStd, longIntensity, shortIntensity, volume24H);
    spreadTerms.longVolSpread = longVolSpread.toNumber();
    spreadTerms.shortVolSpread = shortVolSpread.toNumber();
    let longSpread = Math.max(baseSpread / 2, longVolSpread.toNumber());
    let shortSpread = Math.max(baseSpread / 2, shortVolSpread.toNumber());
    if (lastOracleReservePriceSpreadPct.gt(numericConstants_1.ZERO)) {
        shortSpread = Math.max(shortSpread, lastOracleReservePriceSpreadPct.abs().toNumber() + shortVolSpread.toNumber());
    } else if (lastOracleReservePriceSpreadPct.lt(numericConstants_1.ZERO)) {
        longSpread = Math.max(longSpread, lastOracleReservePriceSpreadPct.abs().toNumber() + longVolSpread.toNumber());
    }
    spreadTerms.longSpreadwPS = longSpread;
    spreadTerms.shortSpreadwPS = shortSpread;
    const maxSpreadBaseline = Math.min(Math.max(lastOracleReservePriceSpreadPct.abs().toNumber(), lastOracleConfPct.muln(2).toNumber(), anchor_1.BN.max(markStd, oracleStd).mul(numericConstants_1.PERCENTAGE_PRECISION).div(reservePrice).toNumber()), numericConstants_1.BID_ASK_SPREAD_PRECISION.toNumber());
    const maxTargetSpread = Math.floor(Math.max(maxSpread, maxSpreadBaseline));
    const inventorySpreadScale = calculateInventoryScale(baseAssetAmountWithAmm, baseAssetReserve, minBaseAssetReserve, maxBaseAssetReserve, baseAssetAmountWithAmm.gt(numericConstants_1.ZERO) ? longSpread : shortSpread, maxTargetSpread);
    if (baseAssetAmountWithAmm.gt(numericConstants_1.ZERO)) {
        longSpread *= inventorySpreadScale;
    } else if (baseAssetAmountWithAmm.lt(numericConstants_1.ZERO)) {
        shortSpread *= inventorySpreadScale;
    }
    spreadTerms.maxTargetSpread = maxTargetSpread;
    spreadTerms.inventorySpreadScale = inventorySpreadScale;
    spreadTerms.longSpreadwInvScale = longSpread;
    spreadTerms.shortSpreadwInvScale = shortSpread;
    const MAX_SPREAD_SCALE = 10;
    if (totalFeeMinusDistributions.gt(numericConstants_1.ZERO)) {
        const effectiveLeverage = calculateEffectiveLeverage(baseSpread, quoteAssetReserve, terminalQuoteAssetReserve, pegMultiplier, baseAssetAmountWithAmm, reservePrice, totalFeeMinusDistributions);
        spreadTerms.effectiveLeverage = effectiveLeverage;
        const spreadScale = Math.min(MAX_SPREAD_SCALE, 1 + effectiveLeverage);
        spreadTerms.effectiveLeverageCapped = spreadScale;
        if (baseAssetAmountWithAmm.gt(numericConstants_1.ZERO)) {
            longSpread *= spreadScale;
            longSpread = Math.floor(longSpread);
        } else {
            shortSpread *= spreadScale;
            shortSpread = Math.floor(shortSpread);
        }
    } else {
        longSpread *= MAX_SPREAD_SCALE;
        shortSpread *= MAX_SPREAD_SCALE;
    }
    spreadTerms.longSpreadwEL = longSpread;
    spreadTerms.shortSpreadwEL = shortSpread;
    if (netRevenueSinceLastFunding.lt(numericConstants_1.DEFAULT_REVENUE_SINCE_LAST_FUNDING_SPREAD_RETREAT)) {
        const maxRetreat = maxTargetSpread / 10;
        let revenueRetreatAmount = maxRetreat;
        if (netRevenueSinceLastFunding.gte(numericConstants_1.DEFAULT_REVENUE_SINCE_LAST_FUNDING_SPREAD_RETREAT.mul(new anchor_1.BN(1000)))) {
            revenueRetreatAmount = Math.min(maxRetreat, Math.floor(baseSpread * netRevenueSinceLastFunding.abs().toNumber() / numericConstants_1.DEFAULT_REVENUE_SINCE_LAST_FUNDING_SPREAD_RETREAT.abs().toNumber()));
        }
        const halfRevenueRetreatAmount = Math.floor(revenueRetreatAmount / 2);
        spreadTerms.revenueRetreatAmount = revenueRetreatAmount;
        spreadTerms.halfRevenueRetreatAmount = halfRevenueRetreatAmount;
        if (baseAssetAmountWithAmm.gt(numericConstants_1.ZERO)) {
            longSpread += revenueRetreatAmount;
            shortSpread += halfRevenueRetreatAmount;
        } else if (baseAssetAmountWithAmm.lt(numericConstants_1.ZERO)) {
            longSpread += halfRevenueRetreatAmount;
            shortSpread += revenueRetreatAmount;
        } else {
            longSpread += halfRevenueRetreatAmount;
            shortSpread += halfRevenueRetreatAmount;
        }
    }
    spreadTerms.longSpreadwRevRetreat = longSpread;
    spreadTerms.shortSpreadwRevRetreat = shortSpread;
    if (ammInventorySpreadAdjustment < 0) {
        const adjustment = Math.abs(ammInventorySpreadAdjustment);
        const shrunkLong = Math.max(1, longSpread - Math.floor(longSpread * adjustment / 100));
        const shrunkShort = Math.max(1, shortSpread - Math.floor(shortSpread * adjustment / 100));
        longSpread = Math.max(longVolSpread.toNumber(), shrunkLong);
        shortSpread = Math.max(shortVolSpread.toNumber(), shrunkShort);
    } else if (ammInventorySpreadAdjustment > 0) {
        const adjustment = ammInventorySpreadAdjustment;
        const grownLong = Math.max(1, longSpread + Math.ceil(longSpread * adjustment / 100));
        const grownShort = Math.max(1, shortSpread + Math.ceil(shortSpread * adjustment / 100));
        longSpread = Math.max(longVolSpread.toNumber(), grownLong);
        shortSpread = Math.max(shortVolSpread.toNumber(), grownShort);
    }
    const totalSpread = longSpread + shortSpread;
    if (totalSpread > maxTargetSpread) {
        if (longSpread > shortSpread) {
            longSpread = Math.ceil(longSpread * maxTargetSpread / totalSpread);
            shortSpread = Math.floor(maxTargetSpread - longSpread);
        } else {
            shortSpread = Math.ceil(shortSpread * maxTargetSpread / totalSpread);
            longSpread = Math.floor(maxTargetSpread - shortSpread);
        }
    }
    spreadTerms.totalSpread = totalSpread;
    spreadTerms.longSpread = longSpread;
    spreadTerms.shortSpread = shortSpread;
    if (returnTerms) {
        return spreadTerms;
    }
    return [
        longSpread,
        shortSpread
    ];
}
exports.calculateSpreadBN = calculateSpreadBN;
function calculateSpread(amm, oraclePriceData, now, reservePrice) {
    if (amm.baseSpread == 0 || amm.curveUpdateIntensity == 0) {
        return [
            amm.baseSpread / 2,
            amm.baseSpread / 2
        ];
    }
    if (!reservePrice) {
        reservePrice = calculatePrice(amm.baseAssetReserve, amm.quoteAssetReserve, amm.pegMultiplier);
    }
    const targetPrice = (oraclePriceData === null || oraclePriceData === void 0 ? void 0 : oraclePriceData.price) || reservePrice;
    const targetMarkSpreadPct = reservePrice.sub(targetPrice).mul(numericConstants_1.BID_ASK_SPREAD_PRECISION).div(reservePrice);
    now = now || new anchor_1.BN(new Date().getTime() / 1000); //todo
    const liveOracleStd = (0, oracles_1.calculateLiveOracleStd)(amm, oraclePriceData, now);
    const confIntervalPct = (0, oracles_1.getNewOracleConfPct)(amm, oraclePriceData, reservePrice, now);
    const spreads = calculateSpreadBN(amm.baseSpread, targetMarkSpreadPct, confIntervalPct, amm.maxSpread, amm.quoteAssetReserve, amm.terminalQuoteAssetReserve, amm.pegMultiplier, amm.baseAssetAmountWithAmm, reservePrice, amm.totalFeeMinusDistributions, amm.netRevenueSinceLastFunding, amm.baseAssetReserve, amm.minBaseAssetReserve, amm.maxBaseAssetReserve, amm.markStd, liveOracleStd, amm.longIntensityVolume, amm.shortIntensityVolume, amm.volume24H, amm.ammInventorySpreadAdjustment);
    let longSpread = spreads[0];
    let shortSpread = spreads[1];
    if (amm.ammSpreadAdjustment > 0) {
        longSpread = Math.max(longSpread + longSpread * amm.ammSpreadAdjustment / 100, 1);
        shortSpread = Math.max(shortSpread + shortSpread * amm.ammSpreadAdjustment / 100, 1);
    } else if (amm.ammSpreadAdjustment < 0) {
        longSpread = Math.max(longSpread - longSpread * -amm.ammSpreadAdjustment / 100, 1);
        shortSpread = Math.max(shortSpread - shortSpread * -amm.ammSpreadAdjustment / 100, 1);
    }
    return [
        longSpread,
        shortSpread
    ];
}
exports.calculateSpread = calculateSpread;
function getQuoteAssetReservePredictionMarketBounds(amm, direction) {
    let quoteAssetReserveLowerBound = numericConstants_1.ZERO;
    const pegSqrt = (0, utils_1.squareRootBN)(amm.pegMultiplier.mul(numericConstants_1.PEG_PRECISION).addn(1)).addn(1);
    let quoteAssetReserveUpperBound = amm.sqrtK.mul(pegSqrt).div(amm.pegMultiplier);
    if (direction === types_1.PositionDirection.LONG) {
        quoteAssetReserveLowerBound = amm.sqrtK.muln(22361).mul(pegSqrt).divn(100000).div(amm.pegMultiplier);
    } else {
        quoteAssetReserveUpperBound = amm.sqrtK.muln(97467).mul(pegSqrt).divn(100000).div(amm.pegMultiplier);
    }
    return [
        quoteAssetReserveLowerBound,
        quoteAssetReserveUpperBound
    ];
}
exports.getQuoteAssetReservePredictionMarketBounds = getQuoteAssetReservePredictionMarketBounds;
function calculateSpreadReserves(amm, mmOraclePriceData, now, isPrediction = false, latestSlot) {
    function calculateSpreadReserve(spread, direction, amm) {
        if (spread === 0) {
            return {
                baseAssetReserve: amm.baseAssetReserve,
                quoteAssetReserve: amm.quoteAssetReserve
            };
        }
        let spreadFraction = new anchor_1.BN(spread).div(new anchor_1.BN(2));
        // make non-zero
        if (spreadFraction.eq(numericConstants_1.ZERO)) {
            spreadFraction = spread >= 0 ? new anchor_1.BN(1) : new anchor_1.BN(-1);
        }
        const quoteAssetReserveDelta = amm.quoteAssetReserve.div(numericConstants_1.BID_ASK_SPREAD_PRECISION.div(spreadFraction));
        let quoteAssetReserve;
        if (quoteAssetReserveDelta.gte(numericConstants_1.ZERO)) {
            quoteAssetReserve = amm.quoteAssetReserve.add(quoteAssetReserveDelta.abs());
        } else {
            quoteAssetReserve = amm.quoteAssetReserve.sub(quoteAssetReserveDelta.abs());
        }
        if (isPrediction) {
            const [qarLower, qarUpper] = getQuoteAssetReservePredictionMarketBounds(amm, direction);
            quoteAssetReserve = (0, utils_1.clampBN)(quoteAssetReserve, qarLower, qarUpper);
        }
        const baseAssetReserve = amm.sqrtK.mul(amm.sqrtK).div(quoteAssetReserve);
        return {
            baseAssetReserve,
            quoteAssetReserve
        };
    }
    const reservePrice = calculatePrice(amm.baseAssetReserve, amm.quoteAssetReserve, amm.pegMultiplier);
    // always allow 10 bps of price offset, up to a half of the market's max_spread
    let maxOffset = 0;
    let referencePriceOffset = 0;
    if (amm.curveUpdateIntensity > 100) {
        maxOffset = Math.max(amm.maxSpread / 2, numericConstants_1.PERCENTAGE_PRECISION.toNumber() / 10000 * (amm.curveUpdateIntensity - 100));
        const liquidityFraction = calculateInventoryLiquidityRatioForReferencePriceOffset(amm.baseAssetAmountWithAmm, amm.baseAssetReserve, amm.minBaseAssetReserve, amm.maxBaseAssetReserve);
        const liquidityFractionSigned = liquidityFraction.mul((0, utils_1.sigNum)(amm.baseAssetAmountWithAmm.add(amm.baseAssetAmountWithUnsettledLp)));
        let liquidityFractionAfterDeadband = liquidityFractionSigned;
        const deadbandPct = amm.referencePriceOffsetDeadbandPct ? numericConstants_1.PERCENTAGE_PRECISION.mul(new anchor_1.BN(amm.referencePriceOffsetDeadbandPct)).divn(100) : numericConstants_1.ZERO;
        if (!liquidityFractionAfterDeadband.eq(numericConstants_1.ZERO) && deadbandPct.gt(numericConstants_1.ZERO)) {
            const abs = liquidityFractionAfterDeadband.abs();
            if (abs.lte(deadbandPct)) {
                liquidityFractionAfterDeadband = numericConstants_1.ZERO;
            } else {
                liquidityFractionAfterDeadband = liquidityFractionAfterDeadband.sub(deadbandPct.mul((0, utils_1.sigNum)(liquidityFractionAfterDeadband)));
            }
        }
        referencePriceOffset = calculateReferencePriceOffset(reservePrice, amm.last24HAvgFundingRate, liquidityFractionAfterDeadband, amm.historicalOracleData.lastOraclePriceTwap5Min, amm.lastMarkPriceTwap5Min, amm.historicalOracleData.lastOraclePriceTwap, amm.lastMarkPriceTwap, maxOffset).toNumber();
    }
    let [longSpread, shortSpread] = calculateSpread(amm, mmOraclePriceData, now, reservePrice);
    const doReferencePricOffsetSmooth = Math.sign(referencePriceOffset) !== Math.sign(amm.referencePriceOffset) && amm.curveUpdateIntensity > 100;
    if (doReferencePricOffsetSmooth) {
        const slotsPassed = latestSlot != null ? anchor_1.BN.max(latestSlot.sub(amm.lastUpdateSlot), numericConstants_1.ZERO).toNumber() : 0;
        const fullOffsetDelta = referencePriceOffset - amm.referencePriceOffset;
        const raw = Math.trunc(Math.min(Math.abs(fullOffsetDelta), slotsPassed * 1000) / 10);
        const maxAllowed = Math.abs(amm.referencePriceOffset) || Math.abs(referencePriceOffset);
        const magnitude = Math.min(Math.max(raw, 10), maxAllowed);
        const referencePriceDelta = Math.sign(fullOffsetDelta) * magnitude;
        referencePriceOffset = amm.referencePriceOffset + referencePriceDelta;
        if (referencePriceDelta < 0) {
            longSpread += Math.abs(referencePriceDelta);
            shortSpread += Math.abs(referencePriceOffset);
        } else {
            shortSpread += Math.abs(referencePriceDelta);
            longSpread += Math.abs(referencePriceOffset);
        }
    }
    const askReserves = calculateSpreadReserve(longSpread + referencePriceOffset, types_1.PositionDirection.LONG, amm);
    const bidReserves = calculateSpreadReserve(-shortSpread + referencePriceOffset, types_1.PositionDirection.SHORT, amm);
    return [
        bidReserves,
        askReserves
    ];
}
exports.calculateSpreadReserves = calculateSpreadReserves;
/**
 * Helper function calculating constant product curve output. Agnostic to whether input asset is quote or base
 *
 * @param inputAssetReserve
 * @param swapAmount
 * @param swapDirection
 * @param invariant
 * @returns newInputAssetReserve and newOutputAssetReserve after swap. : Precision AMM_RESERVE_PRECISION
 */ function calculateSwapOutput(inputAssetReserve, swapAmount, swapDirection, invariant) {
    let newInputAssetReserve;
    if (swapDirection === types_1.SwapDirection.ADD) {
        newInputAssetReserve = inputAssetReserve.add(swapAmount);
    } else {
        newInputAssetReserve = inputAssetReserve.sub(swapAmount);
    }
    const newOutputAssetReserve = invariant.div(newInputAssetReserve);
    return [
        newInputAssetReserve,
        newOutputAssetReserve
    ];
}
exports.calculateSwapOutput = calculateSwapOutput;
/**
 * Translate long/shorting quote/base asset into amm operation
 *
 * @param inputAssetType
 * @param positionDirection
 */ function getSwapDirection(inputAssetType, positionDirection) {
    if ((0, types_1.isVariant)(positionDirection, 'long') && inputAssetType === 'base') {
        return types_1.SwapDirection.REMOVE;
    }
    if ((0, types_1.isVariant)(positionDirection, 'short') && inputAssetType === 'quote') {
        return types_1.SwapDirection.REMOVE;
    }
    return types_1.SwapDirection.ADD;
}
exports.getSwapDirection = getSwapDirection;
/**
 * Helper function calculating terminal price of amm
 *
 * @param market
 * @returns cost : Precision PRICE_PRECISION
 */ function calculateTerminalPrice(market) {
    const directionToClose = market.amm.baseAssetAmountWithAmm.gt(numericConstants_1.ZERO) ? types_1.PositionDirection.SHORT : types_1.PositionDirection.LONG;
    const [newQuoteAssetReserve, newBaseAssetReserve] = calculateAmmReservesAfterSwap(market.amm, 'base', market.amm.baseAssetAmountWithAmm.abs(), getSwapDirection('base', directionToClose));
    const terminalPrice = newQuoteAssetReserve.mul(numericConstants_1.PRICE_PRECISION).mul(market.amm.pegMultiplier).div(numericConstants_1.PEG_PRECISION).div(newBaseAssetReserve);
    return terminalPrice;
}
exports.calculateTerminalPrice = calculateTerminalPrice;
function calculateMaxBaseAssetAmountToTrade(amm, limit_price, direction, mmOraclePriceData, now, isPrediction = false) {
    const invariant = amm.sqrtK.mul(amm.sqrtK);
    const newBaseAssetReserveSquared = invariant.mul(numericConstants_1.PRICE_PRECISION).mul(amm.pegMultiplier).div(limit_price).div(numericConstants_1.PEG_PRECISION);
    const newBaseAssetReserve = (0, utils_1.squareRootBN)(newBaseAssetReserveSquared);
    const [shortSpreadReserves, longSpreadReserves] = calculateSpreadReserves(amm, mmOraclePriceData, now, isPrediction);
    const baseAssetReserveBefore = (0, types_1.isVariant)(direction, 'long') ? longSpreadReserves.baseAssetReserve : shortSpreadReserves.baseAssetReserve;
    if (newBaseAssetReserve.gt(baseAssetReserveBefore)) {
        return [
            newBaseAssetReserve.sub(baseAssetReserveBefore),
            types_1.PositionDirection.SHORT
        ];
    } else if (newBaseAssetReserve.lt(baseAssetReserveBefore)) {
        return [
            baseAssetReserveBefore.sub(newBaseAssetReserve),
            types_1.PositionDirection.LONG
        ];
    } else {
        console.log('tradeSize Too Small');
        return [
            new anchor_1.BN(0),
            types_1.PositionDirection.LONG
        ];
    }
}
exports.calculateMaxBaseAssetAmountToTrade = calculateMaxBaseAssetAmountToTrade;
function calculateQuoteAssetAmountSwapped(quoteAssetReserves, pegMultiplier, swapDirection) {
    if ((0, types_1.isVariant)(swapDirection, 'remove')) {
        quoteAssetReserves = quoteAssetReserves.add(numericConstants_1.ONE);
    }
    let quoteAssetAmount = quoteAssetReserves.mul(pegMultiplier).div(numericConstants_1.AMM_TIMES_PEG_TO_QUOTE_PRECISION_RATIO);
    if ((0, types_1.isVariant)(swapDirection, 'remove')) {
        quoteAssetAmount = quoteAssetAmount.add(numericConstants_1.ONE);
    }
    return quoteAssetAmount;
}
exports.calculateQuoteAssetAmountSwapped = calculateQuoteAssetAmountSwapped;
function calculateMaxBaseAssetAmountFillable(amm, orderDirection) {
    const maxFillSize = amm.baseAssetReserve.div(new anchor_1.BN(amm.maxFillReserveFraction));
    let maxBaseAssetAmountOnSide;
    if ((0, types_1.isVariant)(orderDirection, 'long')) {
        maxBaseAssetAmountOnSide = anchor_1.BN.max(numericConstants_1.ZERO, amm.baseAssetReserve.sub(amm.minBaseAssetReserve));
    } else {
        maxBaseAssetAmountOnSide = anchor_1.BN.max(numericConstants_1.ZERO, amm.maxBaseAssetReserve.sub(amm.baseAssetReserve));
    }
    return (0, orders_1.standardizeBaseAssetAmount)(anchor_1.BN.min(maxFillSize, maxBaseAssetAmountOnSide), amm.orderStepSize);
}
exports.calculateMaxBaseAssetAmountFillable = calculateMaxBaseAssetAmountFillable;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/position.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasOpenOrders = exports.isEmptyPosition = exports.positionCurrentDirection = exports.findDirectionToClose = exports.calculateCostBasis = exports.calculateEntryPrice = exports.calculateBreakEvenPrice = exports.positionIsAvailable = exports.calculatePositionFundingPNL = exports.calculateUnsettledFundingPnl = exports.calculateFeesAndFundingPnl = exports.calculateClaimablePnl = exports.calculatePositionPNL = exports.calculateBaseAssetValue = void 0;
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const amm_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/amm.js [app-route] (ecmascript)");
const margin_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/margin.js [app-route] (ecmascript)");
const market_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/market.js [app-route] (ecmascript)");
/**
 * calculateBaseAssetValue
 * = market value of closing entire position
 * @param market
 * @param userPosition
 * @param oraclePriceData
 * @returns Base Asset Value. : Precision QUOTE_PRECISION
 */ function calculateBaseAssetValue(market, userPosition, mmOraclePriceData, useSpread = true, skipUpdate = false, latestSlot) {
    if (userPosition.baseAssetAmount.eq(numericConstants_1.ZERO)) {
        return numericConstants_1.ZERO;
    }
    const directionToClose = findDirectionToClose(userPosition);
    let prepegAmm;
    if (!skipUpdate) {
        if (market.amm.baseSpread > 0 && useSpread) {
            const { baseAssetReserve, quoteAssetReserve, sqrtK, newPeg } = (0, amm_1.calculateUpdatedAMMSpreadReserves)(market.amm, directionToClose, mmOraclePriceData, undefined, latestSlot);
            prepegAmm = {
                baseAssetReserve,
                quoteAssetReserve,
                sqrtK: sqrtK,
                pegMultiplier: newPeg
            };
        } else {
            prepegAmm = (0, amm_1.calculateUpdatedAMM)(market.amm, mmOraclePriceData);
        }
    } else {
        prepegAmm = market.amm;
    }
    const [newQuoteAssetReserve, _] = (0, amm_1.calculateAmmReservesAfterSwap)(prepegAmm, 'base', userPosition.baseAssetAmount.abs(), (0, amm_1.getSwapDirection)('base', directionToClose));
    switch(directionToClose){
        case types_1.PositionDirection.SHORT:
            return prepegAmm.quoteAssetReserve.sub(newQuoteAssetReserve).mul(prepegAmm.pegMultiplier).div(numericConstants_1.AMM_TIMES_PEG_TO_QUOTE_PRECISION_RATIO);
        case types_1.PositionDirection.LONG:
            return newQuoteAssetReserve.sub(prepegAmm.quoteAssetReserve).mul(prepegAmm.pegMultiplier).div(numericConstants_1.AMM_TIMES_PEG_TO_QUOTE_PRECISION_RATIO).add(numericConstants_1.ONE);
    }
}
exports.calculateBaseAssetValue = calculateBaseAssetValue;
/**
 * calculatePositionPNL
 * = BaseAssetAmount * (Avg Exit Price - Avg Entry Price)
 * @param market
 * @param PerpPosition
 * @param withFunding (adds unrealized funding payment pnl to result)
 * @param oraclePriceData
 * @returns BaseAssetAmount : Precision QUOTE_PRECISION
 */ function calculatePositionPNL(market, perpPosition, withFunding = false, oraclePriceData) {
    if (perpPosition.baseAssetAmount.eq(numericConstants_1.ZERO)) {
        return perpPosition.quoteAssetAmount;
    }
    const baseAssetValue = (0, margin_1.calculateBaseAssetValueWithOracle)(market, perpPosition, oraclePriceData);
    const baseAssetValueSign = perpPosition.baseAssetAmount.isNeg() ? new anchor_1.BN(-1) : new anchor_1.BN(1);
    let pnl = baseAssetValue.mul(baseAssetValueSign).add(perpPosition.quoteAssetAmount);
    if (withFunding) {
        const fundingRatePnL = calculateUnsettledFundingPnl(market, perpPosition);
        pnl = pnl.add(fundingRatePnL);
    }
    return pnl;
}
exports.calculatePositionPNL = calculatePositionPNL;
function calculateClaimablePnl(market, spotMarket, perpPosition, oraclePriceData) {
    const unrealizedPnl = calculatePositionPNL(market, perpPosition, true, oraclePriceData);
    let unsettledPnl = unrealizedPnl;
    if (unrealizedPnl.gt(numericConstants_1.ZERO)) {
        const excessPnlPool = anchor_1.BN.max(numericConstants_1.ZERO, (0, market_1.calculateNetUserPnlImbalance)(market, spotMarket, oraclePriceData).mul(new anchor_1.BN(-1)));
        const maxPositivePnl = anchor_1.BN.max(perpPosition.quoteAssetAmount.sub(perpPosition.quoteEntryAmount), numericConstants_1.ZERO).add(excessPnlPool);
        unsettledPnl = anchor_1.BN.min(maxPositivePnl, unrealizedPnl);
    }
    return unsettledPnl;
}
exports.calculateClaimablePnl = calculateClaimablePnl;
/**
 * Returns total fees and funding pnl for a position
 *
 * @param market
 * @param PerpPosition
 * @param includeUnsettled include unsettled funding in return value (default: true)
 * @returns — // QUOTE_PRECISION
 */ function calculateFeesAndFundingPnl(market, perpPosition, includeUnsettled = true) {
    const settledFundingAndFeesPnl = perpPosition.quoteBreakEvenAmount.sub(perpPosition.quoteEntryAmount);
    if (!includeUnsettled) {
        return settledFundingAndFeesPnl;
    }
    const unsettledFundingPnl = calculateUnsettledFundingPnl(market, perpPosition);
    return settledFundingAndFeesPnl.add(unsettledFundingPnl);
}
exports.calculateFeesAndFundingPnl = calculateFeesAndFundingPnl;
/**
 * Returns unsettled funding pnl for the position
 *
 * To calculate all fees and funding pnl including settled, use calculateFeesAndFundingPnl
 *
 * @param market
 * @param PerpPosition
 * @returns // QUOTE_PRECISION
 */ function calculateUnsettledFundingPnl(market, perpPosition) {
    if (perpPosition.baseAssetAmount.eq(numericConstants_1.ZERO)) {
        return numericConstants_1.ZERO;
    }
    let ammCumulativeFundingRate;
    if (perpPosition.baseAssetAmount.gt(numericConstants_1.ZERO)) {
        ammCumulativeFundingRate = market.amm.cumulativeFundingRateLong;
    } else {
        ammCumulativeFundingRate = market.amm.cumulativeFundingRateShort;
    }
    const perPositionFundingRate = ammCumulativeFundingRate.sub(perpPosition.lastCumulativeFundingRate).mul(perpPosition.baseAssetAmount).div(numericConstants_1.AMM_RESERVE_PRECISION).div(numericConstants_1.FUNDING_RATE_BUFFER_PRECISION).mul(new anchor_1.BN(-1));
    return perPositionFundingRate;
}
exports.calculateUnsettledFundingPnl = calculateUnsettledFundingPnl;
/**
 * @deprecated use calculateUnsettledFundingPnl or calculateFeesAndFundingPnl instead
 */ function calculatePositionFundingPNL(market, perpPosition) {
    return calculateUnsettledFundingPnl(market, perpPosition);
}
exports.calculatePositionFundingPNL = calculatePositionFundingPNL;
function positionIsAvailable(position) {
    return position.baseAssetAmount.eq(numericConstants_1.ZERO) && position.openOrders === 0 && position.quoteAssetAmount.eq(numericConstants_1.ZERO) && position.lpShares.eq(numericConstants_1.ZERO);
}
exports.positionIsAvailable = positionIsAvailable;
/**
 *
 * @param userPosition
 * @returns Precision: PRICE_PRECISION (10^6)
 */ function calculateBreakEvenPrice(userPosition) {
    if (userPosition.baseAssetAmount.eq(numericConstants_1.ZERO)) {
        return numericConstants_1.ZERO;
    }
    return userPosition.quoteBreakEvenAmount.mul(numericConstants_1.PRICE_PRECISION).mul(numericConstants_1.AMM_TO_QUOTE_PRECISION_RATIO).div(userPosition.baseAssetAmount).abs();
}
exports.calculateBreakEvenPrice = calculateBreakEvenPrice;
/**
 *
 * @param userPosition
 * @returns Precision: PRICE_PRECISION (10^6)
 */ function calculateEntryPrice(userPosition) {
    if (userPosition.baseAssetAmount.eq(numericConstants_1.ZERO)) {
        return numericConstants_1.ZERO;
    }
    return userPosition.quoteEntryAmount.mul(numericConstants_1.PRICE_PRECISION).mul(numericConstants_1.AMM_TO_QUOTE_PRECISION_RATIO).div(userPosition.baseAssetAmount).abs();
}
exports.calculateEntryPrice = calculateEntryPrice;
/**
 *
 * @param userPosition
 * @returns Precision: PRICE_PRECISION (10^10)
 */ function calculateCostBasis(userPosition, includeSettledPnl = false) {
    if (userPosition.baseAssetAmount.eq(numericConstants_1.ZERO)) {
        return numericConstants_1.ZERO;
    }
    return userPosition.quoteAssetAmount.add(includeSettledPnl ? userPosition.settledPnl : numericConstants_1.ZERO).mul(numericConstants_1.PRICE_PRECISION).mul(numericConstants_1.AMM_TO_QUOTE_PRECISION_RATIO).div(userPosition.baseAssetAmount).abs();
}
exports.calculateCostBasis = calculateCostBasis;
function findDirectionToClose(userPosition) {
    return userPosition.baseAssetAmount.gt(numericConstants_1.ZERO) ? types_1.PositionDirection.SHORT : types_1.PositionDirection.LONG;
}
exports.findDirectionToClose = findDirectionToClose;
function positionCurrentDirection(userPosition) {
    return userPosition.baseAssetAmount.gte(numericConstants_1.ZERO) ? types_1.PositionDirection.LONG : types_1.PositionDirection.SHORT;
}
exports.positionCurrentDirection = positionCurrentDirection;
function isEmptyPosition(userPosition) {
    return userPosition.baseAssetAmount.eq(numericConstants_1.ZERO) && userPosition.openOrders === 0;
}
exports.isEmptyPosition = isEmptyPosition;
function hasOpenOrders(position) {
    return position.openOrders != 0 || !position.openBids.eq(numericConstants_1.ZERO) || !position.openAsks.eq(numericConstants_1.ZERO);
}
exports.hasOpenOrders = hasOpenOrders;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/builder.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isBuilderOrderAvailable = exports.isBuilderOrderReferral = exports.isBuilderOrderCompleted = exports.isBuilderOrderOpen = void 0;
const FLAG_IS_OPEN = 0x01;
function isBuilderOrderOpen(order) {
    return (order.bitFlags & FLAG_IS_OPEN) !== 0;
}
exports.isBuilderOrderOpen = isBuilderOrderOpen;
const FLAG_IS_COMPLETED = 0x02;
function isBuilderOrderCompleted(order) {
    return (order.bitFlags & FLAG_IS_COMPLETED) !== 0;
}
exports.isBuilderOrderCompleted = isBuilderOrderCompleted;
const FLAG_IS_REFERRAL = 0x04;
function isBuilderOrderReferral(order) {
    return (order.bitFlags & FLAG_IS_REFERRAL) !== 0;
}
exports.isBuilderOrderReferral = isBuilderOrderReferral;
function isBuilderOrderAvailable(order) {
    return !isBuilderOrderOpen(order) && !isBuilderOrderCompleted(order);
}
exports.isBuilderOrderAvailable = isBuilderOrderAvailable;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/conversion.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.convertToBN = exports.convertToNumber = void 0;
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const convertToNumber = (bigNumber, precision = numericConstants_1.PRICE_PRECISION)=>{
    if (!bigNumber) return 0;
    return bigNumber.div(precision).toNumber() + bigNumber.mod(precision).toNumber() / precision.toNumber();
};
exports.convertToNumber = convertToNumber;
function convertToBN(value, precision) {
    // Get the whole part using Math.floor
    const wholePart = Math.floor(value);
    // Get decimal part by subtracting whole part and multiplying by precision
    const decimalPart = Math.round((value - wholePart) * precision.toNumber());
    // Combine: wholePart * PRECISION + decimalPart
    return new anchor_1.BN(wholePart).mul(precision).add(new anchor_1.BN(decimalPart));
}
exports.convertToBN = convertToBN;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/funding.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.calculateFundingPool = exports.calculateLongShortFundingRateAndLiveTwaps = exports.calculateLongShortFundingRate = exports.calculateFormattedLiveFundingRate = exports.calculateAllEstimatedFundingRate = void 0;
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const bigNum_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/factory/bigNum.js [app-route] (ecmascript)");
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const amm_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/amm.js [app-route] (ecmascript)");
const oracles_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/oracles.js [app-route] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/utils.js [app-route] (ecmascript)");
const numericConstants_2 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
function calculateLiveMarkTwap(market, mmOraclePriceData, markPrice, now, period = new anchor_1.BN(3600)) {
    now = now || new anchor_1.BN((Date.now() / 1000).toFixed(0));
    const lastMarkTwapWithMantissa = market.amm.lastMarkPriceTwap;
    const lastMarkPriceTwapTs = market.amm.lastMarkPriceTwapTs;
    const timeSinceLastMarkChange = now.sub(lastMarkPriceTwapTs);
    const markTwapTimeSinceLastUpdate = anchor_1.BN.max(period, anchor_1.BN.max(numericConstants_1.ZERO, period.sub(timeSinceLastMarkChange)));
    if (!markPrice) {
        const [bid, ask] = (0, amm_1.calculateBidAskPrice)(market.amm, mmOraclePriceData);
        markPrice = bid.add(ask).div(new anchor_1.BN(2));
    }
    const markTwapWithMantissa = markTwapTimeSinceLastUpdate.mul(lastMarkTwapWithMantissa).add(timeSinceLastMarkChange.mul(markPrice)).div(timeSinceLastMarkChange.add(markTwapTimeSinceLastUpdate));
    return markTwapWithMantissa;
}
function shrinkStaleTwaps(market, markTwapWithMantissa, oracleTwapWithMantissa, now) {
    now = now || new anchor_1.BN((Date.now() / 1000).toFixed(0));
    let newMarkTwap = markTwapWithMantissa;
    let newOracleTwap = oracleTwapWithMantissa;
    if (market.amm.lastMarkPriceTwapTs.gt(market.amm.historicalOracleData.lastOraclePriceTwapTs)) {
        // shrink oracle based on invalid intervals
        const oracleInvalidDuration = anchor_1.BN.max(numericConstants_1.ZERO, market.amm.lastMarkPriceTwapTs.sub(market.amm.historicalOracleData.lastOraclePriceTwapTs));
        const timeSinceLastOracleTwapUpdate = now.sub(market.amm.historicalOracleData.lastOraclePriceTwapTs);
        const oracleTwapTimeSinceLastUpdate = anchor_1.BN.max(numericConstants_1.ONE, anchor_1.BN.min(market.amm.fundingPeriod, anchor_1.BN.max(numericConstants_1.ONE, market.amm.fundingPeriod.sub(timeSinceLastOracleTwapUpdate))));
        newOracleTwap = oracleTwapTimeSinceLastUpdate.mul(oracleTwapWithMantissa).add(oracleInvalidDuration.mul(markTwapWithMantissa)).div(oracleTwapTimeSinceLastUpdate.add(oracleInvalidDuration));
    } else if (market.amm.lastMarkPriceTwapTs.lt(market.amm.historicalOracleData.lastOraclePriceTwapTs)) {
        // shrink mark to oracle twap over tradless intervals
        const tradelessDuration = anchor_1.BN.max(numericConstants_1.ZERO, market.amm.historicalOracleData.lastOraclePriceTwapTs.sub(market.amm.lastMarkPriceTwapTs));
        const timeSinceLastMarkTwapUpdate = now.sub(market.amm.lastMarkPriceTwapTs);
        const markTwapTimeSinceLastUpdate = anchor_1.BN.max(numericConstants_1.ONE, anchor_1.BN.min(market.amm.fundingPeriod, anchor_1.BN.max(numericConstants_1.ONE, market.amm.fundingPeriod.sub(timeSinceLastMarkTwapUpdate))));
        newMarkTwap = markTwapTimeSinceLastUpdate.mul(markTwapWithMantissa).add(tradelessDuration.mul(oracleTwapWithMantissa)).div(markTwapTimeSinceLastUpdate.add(tradelessDuration));
    }
    return [
        newMarkTwap,
        newOracleTwap
    ];
}
/**
 *
 * @param market
 * @param oraclePriceData
 * @param periodAdjustment
 * @returns Estimated funding rate. : Precision //TODO-PRECISION
 */ function calculateAllEstimatedFundingRate(market, mmOraclePriceData, oraclePriceData, markPrice, now) {
    if ((0, types_1.isVariant)(market.status, 'uninitialized')) {
        return [
            numericConstants_1.ZERO,
            numericConstants_1.ZERO,
            numericConstants_1.ZERO,
            numericConstants_1.ZERO,
            numericConstants_1.ZERO
        ];
    }
    // todo: sufficiently differs from blockchain timestamp?
    now = now || new anchor_1.BN((Date.now() / 1000).toFixed(0));
    // calculate real-time mark and oracle twap
    const liveMarkTwap = calculateLiveMarkTwap(market, mmOraclePriceData, markPrice, now, market.amm.fundingPeriod);
    const liveOracleTwap = (0, oracles_1.calculateLiveOracleTwap)(market.amm.historicalOracleData, oraclePriceData, now, market.amm.fundingPeriod);
    const [markTwap, oracleTwap] = shrinkStaleTwaps(market, liveMarkTwap, liveOracleTwap, now);
    // if(!markTwap.eq(liveMarkTwap)){
    // 	console.log('shrink mark:', liveMarkTwap.toString(), '->', markTwap.toString());
    // }
    // if(!oracleTwap.eq(liveOracleTwap)){
    // 	console.log('shrink orac:', liveOracleTwap.toString(), '->', oracleTwap.toString());
    // }
    const twapSpread = markTwap.sub(oracleTwap);
    const twapSpreadWithOffset = twapSpread.add(oracleTwap.abs().div(numericConstants_1.FUNDING_RATE_OFFSET_DENOMINATOR));
    const maxSpread = getMaxPriceDivergenceForFundingRate(market, oracleTwap);
    const clampedSpreadWithOffset = (0, utils_1.clampBN)(twapSpreadWithOffset, maxSpread.mul(new anchor_1.BN(-1)), maxSpread);
    const twapSpreadPct = clampedSpreadWithOffset.mul(numericConstants_1.PRICE_PRECISION).mul(new anchor_1.BN(100)).div(oracleTwap);
    const secondsInHour = new anchor_1.BN(3600);
    const hoursInDay = new anchor_1.BN(24);
    const timeSinceLastUpdate = now.sub(market.amm.lastFundingRateTs);
    const lowerboundEst = twapSpreadPct.mul(market.amm.fundingPeriod).mul(anchor_1.BN.min(secondsInHour, timeSinceLastUpdate)).div(secondsInHour).div(secondsInHour).div(hoursInDay);
    const interpEst = twapSpreadPct.div(hoursInDay);
    const interpRateQuote = twapSpreadPct.div(hoursInDay).div(numericConstants_1.PRICE_PRECISION.div(numericConstants_1.QUOTE_PRECISION));
    let feePoolSize = calculateFundingPool(market);
    if (interpRateQuote.lt(new anchor_1.BN(0))) {
        feePoolSize = feePoolSize.mul(new anchor_1.BN(-1));
    }
    let cappedAltEst;
    let largerSide;
    let smallerSide;
    if (market.amm.baseAssetAmountLong.gt(market.amm.baseAssetAmountShort.abs())) {
        largerSide = market.amm.baseAssetAmountLong.abs();
        smallerSide = market.amm.baseAssetAmountShort.abs();
        if (twapSpread.gt(new anchor_1.BN(0))) {
            return [
                markTwap,
                oracleTwap,
                lowerboundEst,
                interpEst,
                interpEst
            ];
        }
    } else if (market.amm.baseAssetAmountLong.lt(market.amm.baseAssetAmountShort.abs())) {
        largerSide = market.amm.baseAssetAmountShort.abs();
        smallerSide = market.amm.baseAssetAmountLong.abs();
        if (twapSpread.lt(new anchor_1.BN(0))) {
            return [
                markTwap,
                oracleTwap,
                lowerboundEst,
                interpEst,
                interpEst
            ];
        }
    } else {
        return [
            markTwap,
            oracleTwap,
            lowerboundEst,
            interpEst,
            interpEst
        ];
    }
    if (largerSide.gt(numericConstants_1.ZERO)) {
        // funding smaller flow
        cappedAltEst = smallerSide.mul(twapSpread).div(hoursInDay);
        const feePoolTopOff = feePoolSize.mul(numericConstants_1.PRICE_PRECISION.div(numericConstants_1.QUOTE_PRECISION)).mul(numericConstants_1.AMM_RESERVE_PRECISION);
        cappedAltEst = cappedAltEst.add(feePoolTopOff).div(largerSide);
        cappedAltEst = cappedAltEst.mul(numericConstants_1.PRICE_PRECISION).mul(new anchor_1.BN(100)).div(oracleTwap);
        if (cappedAltEst.abs().gte(interpEst.abs())) {
            cappedAltEst = interpEst;
        }
    } else {
        cappedAltEst = interpEst;
    }
    return [
        markTwap,
        oracleTwap,
        lowerboundEst,
        cappedAltEst,
        interpEst
    ];
}
exports.calculateAllEstimatedFundingRate = calculateAllEstimatedFundingRate;
/**
 * To get funding rate as a percentage, you need to multiply by the funding rate buffer precision
 * @param rawFundingRate
 * @returns
 */ const getFundingRatePct = (rawFundingRate)=>{
    return bigNum_1.BigNum.from(rawFundingRate.mul(numericConstants_2.FUNDING_RATE_BUFFER_PRECISION), numericConstants_2.FUNDING_RATE_PRECISION_EXP).toNum();
};
/**
 * Calculate funding rates in human-readable form. Values will have some lost precision and shouldn't be used in strict accounting.
 * @param period : 'hour' | 'year' :: Use 'hour' for the hourly payment as a percentage, 'year' for the payment as an estimated APR.
 */ function calculateFormattedLiveFundingRate(market, mmOraclePriceData, oraclePriceData, period) {
    const nowBN = new anchor_1.BN(Date.now() / 1000);
    const [_markTwapLive, _oracleTwapLive, longFundingRate, shortFundingRate] = calculateLongShortFundingRateAndLiveTwaps(market, mmOraclePriceData, oraclePriceData, undefined, nowBN);
    let longFundingRateNum = getFundingRatePct(longFundingRate);
    let shortFundingRateNum = getFundingRatePct(shortFundingRate);
    if (period == 'year') {
        const paymentsPerYear = 24 * 365.25;
        longFundingRateNum *= paymentsPerYear;
        shortFundingRateNum *= paymentsPerYear;
    }
    const longsArePaying = longFundingRateNum > 0;
    const shortsArePaying = !(shortFundingRateNum > 0);
    const longsAreString = longsArePaying ? 'pay' : 'receive';
    const shortsAreString = !shortsArePaying ? 'receive' : 'pay';
    const absoluteLongFundingRateNum = Math.abs(longFundingRateNum);
    const absoluteShortFundingRateNum = Math.abs(shortFundingRateNum);
    const formattedLongRatePct = absoluteLongFundingRateNum.toFixed(period == 'hour' ? 5 : 2);
    const formattedShortRatePct = absoluteShortFundingRateNum.toFixed(period == 'hour' ? 5 : 2);
    const fundingRateUnit = period == 'year' ? '% APR' : '%';
    const formattedFundingRateSummary = `At this rate, longs would ${longsAreString} ${formattedLongRatePct} ${fundingRateUnit} and shorts would ${shortsAreString} ${formattedShortRatePct} ${fundingRateUnit} at the end of the hour.`;
    return {
        longRate: longsArePaying ? -absoluteLongFundingRateNum : absoluteLongFundingRateNum,
        shortRate: shortsArePaying ? -absoluteShortFundingRateNum : absoluteShortFundingRateNum,
        fundingRateUnit: fundingRateUnit,
        formattedFundingRateSummary
    };
}
exports.calculateFormattedLiveFundingRate = calculateFormattedLiveFundingRate;
function getMaxPriceDivergenceForFundingRate(market, oracleTwap) {
    if ((0, types_1.isVariant)(market.contractTier, 'a')) {
        return oracleTwap.divn(33);
    } else if ((0, types_1.isVariant)(market.contractTier, 'b')) {
        return oracleTwap.divn(33);
    } else if ((0, types_1.isVariant)(market.contractTier, 'c')) {
        return oracleTwap.divn(20);
    } else {
        return oracleTwap.divn(10);
    }
}
/**
 *
 * @param market
 * @param oraclePriceData
 * @param periodAdjustment
 * @returns Estimated funding rate. : Precision //TODO-PRECISION
 */ function calculateLongShortFundingRate(market, mmOraclePriceData, oraclePriceData, markPrice, now) {
    const [_1, _2, _, cappedAltEst, interpEst] = calculateAllEstimatedFundingRate(market, mmOraclePriceData, oraclePriceData, markPrice, now);
    if (market.amm.baseAssetAmountLong.gt(market.amm.baseAssetAmountShort)) {
        return [
            cappedAltEst,
            interpEst
        ];
    } else if (market.amm.baseAssetAmountLong.lt(market.amm.baseAssetAmountShort)) {
        return [
            interpEst,
            cappedAltEst
        ];
    } else {
        return [
            interpEst,
            interpEst
        ];
    }
}
exports.calculateLongShortFundingRate = calculateLongShortFundingRate;
/**
 *
 * @param market
 * @param oraclePriceData
 * @param periodAdjustment
 * @returns Estimated funding rate. : Precision //TODO-PRECISION
 */ function calculateLongShortFundingRateAndLiveTwaps(market, mmOraclePriceData, oraclePriceData, markPrice, now) {
    const [markTwapLive, oracleTwapLive, _2, cappedAltEst, interpEst] = calculateAllEstimatedFundingRate(market, mmOraclePriceData, oraclePriceData, markPrice, now);
    if (market.amm.baseAssetAmountLong.gt(market.amm.baseAssetAmountShort.abs())) {
        return [
            markTwapLive,
            oracleTwapLive,
            cappedAltEst,
            interpEst
        ];
    } else if (market.amm.baseAssetAmountLong.lt(market.amm.baseAssetAmountShort.abs())) {
        return [
            markTwapLive,
            oracleTwapLive,
            interpEst,
            cappedAltEst
        ];
    } else {
        return [
            markTwapLive,
            oracleTwapLive,
            interpEst,
            interpEst
        ];
    }
}
exports.calculateLongShortFundingRateAndLiveTwaps = calculateLongShortFundingRateAndLiveTwaps;
/**
 *
 * @param market
 * @returns Estimated fee pool size
 */ function calculateFundingPool(market) {
    // todo
    const totalFeeLB = market.amm.totalExchangeFee.div(new anchor_1.BN(2));
    const feePool = anchor_1.BN.max(numericConstants_1.ZERO, market.amm.totalFeeMinusDistributions.sub(totalFeeLB).mul(new anchor_1.BN(1)).div(new anchor_1.BN(3)));
    return feePool;
}
exports.calculateFundingPool = calculateFundingPool;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/liquidation.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMarginShortage = exports.calculateMaxPctToLiquidate = exports.calculateAssetTransferForLiabilityTransfer = exports.calculateLiabilityTransferToCoverMarginShortage = exports.calculateBaseAssetAmountToCoverMarginShortage = void 0;
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
function calculateBaseAssetAmountToCoverMarginShortage(marginShortage, marginRatio, liquidationFee, ifLiquidationFee, oraclePrice, quoteOraclePrice) {
    const marginRatioBN = new anchor_1.BN(marginRatio).mul(numericConstants_1.LIQUIDATION_FEE_PRECISION).div(numericConstants_1.MARGIN_PRECISION);
    const liquidationFeeBN = new anchor_1.BN(liquidationFee);
    if (oraclePrice.eq(new anchor_1.BN(0)) || marginRatioBN.lte(liquidationFeeBN)) {
        // undefined is max
        return undefined;
    }
    return marginShortage.mul(numericConstants_1.PRICE_TIMES_AMM_TO_QUOTE_PRECISION_RATIO).div(oraclePrice.mul(quoteOraclePrice).div(numericConstants_1.PRICE_PRECISION).mul(marginRatioBN.sub(liquidationFeeBN)).div(numericConstants_1.LIQUIDATION_FEE_PRECISION).sub(oraclePrice.mul(new anchor_1.BN(ifLiquidationFee)).div(numericConstants_1.LIQUIDATION_FEE_PRECISION)));
}
exports.calculateBaseAssetAmountToCoverMarginShortage = calculateBaseAssetAmountToCoverMarginShortage;
function calculateLiabilityTransferToCoverMarginShortage(marginShortage, assetWeight, assetLiquidationMultiplier, liabilityWeight, liabilityLiquidationMultiplier, liabilityDecimals, liabilityPrice, ifLiquidationFee) {
    if (assetWeight >= liabilityWeight) {
        // undefined is max
        return undefined;
    }
    let numeratorScale;
    let denominatorScale;
    if (liabilityDecimals > 6) {
        numeratorScale = new anchor_1.BN(10).pow(new anchor_1.BN(liabilityDecimals - 6));
        denominatorScale = new anchor_1.BN(1);
    } else {
        numeratorScale = new anchor_1.BN(1);
        denominatorScale = new anchor_1.BN(10).pow(new anchor_1.BN(6 - liabilityDecimals));
    }
    // multiply market weights by extra 10 to increase precision
    const liabilityWeightComponent = liabilityWeight * 10;
    const assetWeightComponent = assetWeight * 10 * assetLiquidationMultiplier / liabilityLiquidationMultiplier;
    if (assetWeightComponent >= liabilityWeightComponent) {
        return undefined;
    }
    return anchor_1.BN.max(marginShortage.mul(numeratorScale).mul(numericConstants_1.PRICE_PRECISION.mul(numericConstants_1.SPOT_MARKET_WEIGHT_PRECISION).mul(numericConstants_1.TEN)).div(liabilityPrice.mul(new anchor_1.BN(liabilityWeightComponent).sub(new anchor_1.BN(assetWeightComponent))).sub(liabilityPrice.mul(new anchor_1.BN(ifLiquidationFee)).div(numericConstants_1.LIQUIDATION_FEE_PRECISION).mul(new anchor_1.BN(liabilityWeight)).mul(new anchor_1.BN(10)))).div(denominatorScale), numericConstants_1.ONE);
}
exports.calculateLiabilityTransferToCoverMarginShortage = calculateLiabilityTransferToCoverMarginShortage;
function calculateAssetTransferForLiabilityTransfer(assetAmount, assetLiquidationMultiplier, assetDecimals, assetPrice, liabilityAmount, liabilityLiquidationMultiplier, liabilityDecimals, liabilityPrice) {
    let numeratorScale;
    let denominatorScale;
    if (assetDecimals > liabilityDecimals) {
        numeratorScale = new anchor_1.BN(10).pow(new anchor_1.BN(assetDecimals - liabilityDecimals));
        denominatorScale = new anchor_1.BN(1);
    } else {
        numeratorScale = new anchor_1.BN(1);
        denominatorScale = new anchor_1.BN(10).pow(new anchor_1.BN(liabilityDecimals - assetDecimals));
    }
    let assetTransfer = liabilityAmount.mul(numeratorScale).mul(liabilityPrice).mul(new anchor_1.BN(assetLiquidationMultiplier)).div(assetPrice.mul(new anchor_1.BN(liabilityLiquidationMultiplier))).div(denominatorScale);
    assetTransfer = anchor_1.BN.max(assetTransfer, numericConstants_1.ONE);
    // Need to check if asset_transfer should be rounded to asset amount
    let assetValueNumeratorScale;
    let assetValueDenominatorScale;
    if (assetDecimals > 6) {
        assetValueNumeratorScale = new anchor_1.BN(10).pow(new anchor_1.BN(assetDecimals - 6));
        assetValueDenominatorScale = new anchor_1.BN(1);
    } else {
        assetValueNumeratorScale = new anchor_1.BN(1);
        assetValueDenominatorScale = new anchor_1.BN(10).pow(new anchor_1.BN(6 - assetDecimals));
    }
    let assetDelta;
    if (assetTransfer > assetAmount) {
        assetDelta = assetTransfer.sub(assetAmount);
    } else {
        assetDelta = assetAmount.sub(assetTransfer);
    }
    const assetValueDelta = assetDelta.mul(assetPrice).div(numericConstants_1.PRICE_PRECISION).mul(assetValueNumeratorScale).div(assetValueDenominatorScale);
    if (assetValueDelta.lt(numericConstants_1.QUOTE_PRECISION)) {
        assetTransfer = assetAmount;
    }
    return assetTransfer;
}
exports.calculateAssetTransferForLiabilityTransfer = calculateAssetTransferForLiabilityTransfer;
function calculateMaxPctToLiquidate(userLastActiveSlot, userLiquidationMarginFreed, marginShortage, slot, initialPctToLiquidate, liquidationDuration) {
    // if margin shortage is tiny, accelerate liquidation
    if (marginShortage.lt(new anchor_1.BN(50).mul(numericConstants_1.QUOTE_PRECISION))) {
        return numericConstants_1.LIQUIDATION_PCT_PRECISION;
    }
    let slotsElapsed;
    if (userLiquidationMarginFreed.gt(new anchor_1.BN(0))) {
        slotsElapsed = anchor_1.BN.max(slot.sub(userLastActiveSlot), new anchor_1.BN(0));
    } else {
        slotsElapsed = new anchor_1.BN(0);
    }
    const pctFreeable = anchor_1.BN.min(slotsElapsed.mul(numericConstants_1.LIQUIDATION_PCT_PRECISION).div(liquidationDuration) // ~ 1 minute if per slot is 400ms
    .add(initialPctToLiquidate), numericConstants_1.LIQUIDATION_PCT_PRECISION);
    const totalMarginShortage = marginShortage.add(userLiquidationMarginFreed);
    const maxMarginFreed = totalMarginShortage.mul(pctFreeable).div(numericConstants_1.LIQUIDATION_PCT_PRECISION);
    const marginFreeable = anchor_1.BN.max(maxMarginFreed.sub(userLiquidationMarginFreed), new anchor_1.BN(0));
    return marginFreeable.mul(numericConstants_1.LIQUIDATION_PCT_PRECISION).div(marginShortage);
}
exports.calculateMaxPctToLiquidate = calculateMaxPctToLiquidate;
function getMarginShortage(maintenanceMarginRequirementPlusBuffer, maintenanceTotalCollateral) {
    return maintenanceMarginRequirementPlusBuffer.sub(maintenanceTotalCollateral).abs();
}
exports.getMarginShortage = getMarginShortage;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/insurance.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.unstakeSharesToAmountWithOpenRequest = exports.unstakeSharesToAmount = exports.stakeAmountToShares = exports.nextRevenuePoolSettleApr = void 0;
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const spotBalance_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/spotBalance.js [app-route] (ecmascript)");
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
function nextRevenuePoolSettleApr(spotMarket, vaultBalance, amount // delta token amount
) {
    const MAX_APR = new anchor_1.BN(10).mul(numericConstants_1.PERCENTAGE_PRECISION); // 1000% APR
    // Conmputing the APR:
    const revenuePoolBN = (0, spotBalance_1.getTokenAmount)(spotMarket.revenuePool.scaledBalance, spotMarket, types_1.SpotBalanceType.DEPOSIT);
    const payoutRatio = 0.1;
    const ratioForStakers = spotMarket.insuranceFund.totalFactor > 0 && spotMarket.insuranceFund.userFactor > 0 && spotMarket.insuranceFund.revenueSettlePeriod.gt(numericConstants_1.ZERO) ? spotMarket.insuranceFund.userFactor / spotMarket.insuranceFund.totalFactor : 0;
    // Settle periods from on-chain data:
    const revSettlePeriod = spotMarket.insuranceFund.revenueSettlePeriod.toNumber() * 1000;
    const settlesPerYear = 31536000000 / revSettlePeriod;
    const projectedAnnualRev = revenuePoolBN.muln(settlesPerYear).muln(payoutRatio);
    const uncappedApr = vaultBalance.add(amount).eq(numericConstants_1.ZERO) ? 0 : projectedAnnualRev.muln(1000).div(vaultBalance.add(amount)).toNumber() * 100 * 1000;
    const cappedApr = Math.min(uncappedApr, MAX_APR.toNumber());
    const nextApr = cappedApr * ratioForStakers;
    return nextApr;
}
exports.nextRevenuePoolSettleApr = nextRevenuePoolSettleApr;
function stakeAmountToShares(amount, totalIfShares, insuranceFundVaultBalance) {
    let nShares;
    if (insuranceFundVaultBalance.gt(numericConstants_1.ZERO)) {
        nShares = amount.mul(totalIfShares).div(insuranceFundVaultBalance);
    } else {
        nShares = amount;
    }
    return nShares;
}
exports.stakeAmountToShares = stakeAmountToShares;
function unstakeSharesToAmount(nShares, totalIfShares, insuranceFundVaultBalance) {
    let amount;
    if (totalIfShares.gt(numericConstants_1.ZERO)) {
        amount = anchor_1.BN.max(numericConstants_1.ZERO, nShares.mul(insuranceFundVaultBalance).div(totalIfShares));
    } else {
        amount = numericConstants_1.ZERO;
    }
    return amount;
}
exports.unstakeSharesToAmount = unstakeSharesToAmount;
function unstakeSharesToAmountWithOpenRequest(nShares, withdrawRequestShares, withdrawRequestAmount, totalIfShares, insuranceFundVaultBalance) {
    let stakedAmount;
    if (totalIfShares.gt(numericConstants_1.ZERO)) {
        stakedAmount = anchor_1.BN.max(numericConstants_1.ZERO, nShares.sub(withdrawRequestShares).mul(insuranceFundVaultBalance).div(totalIfShares));
    } else {
        stakedAmount = numericConstants_1.ZERO;
    }
    const withdrawAmount = anchor_1.BN.min(withdrawRequestAmount, withdrawRequestShares.mul(insuranceFundVaultBalance).div(totalIfShares));
    const amount = withdrawAmount.add(stakedAmount);
    return amount;
}
exports.unstakeSharesToAmountWithOpenRequest = unstakeSharesToAmountWithOpenRequest;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/superStake.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.calculateEstimatedSuperStakeLiquidationPrice = exports.calculateSolEarned = exports.fetchMSolMetrics = exports.fetchJitoSolMetrics = exports.findBestLstSuperStakeIxs = exports.findBestJitoSolSuperStakeIxs = exports.findBestMSolSuperStakeIxs = exports.findBestSuperStakeIxs = exports.fetchBSolDriftEmissions = exports.fetchBSolMetrics = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const marinade_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/marinade/index.js [app-route] (ecmascript)");
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const node_fetch_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/node-fetch@2.7.0/node_modules/node-fetch/lib/index.mjs [app-route] (ecmascript)"));
const utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/utils.js [app-route] (ecmascript)");
async function fetchBSolMetrics() {
    return await (0, node_fetch_1.default)('https://stake.solblaze.org/api/v1/stats');
}
exports.fetchBSolMetrics = fetchBSolMetrics;
async function fetchBSolDriftEmissions() {
    return await (0, node_fetch_1.default)('https://stake.solblaze.org/api/v1/drift_emissions');
}
exports.fetchBSolDriftEmissions = fetchBSolDriftEmissions;
async function findBestSuperStakeIxs({ marketIndex, amount, jupiterClient, driftClient, userAccountPublicKey, price, forceMarinade, onlyDirectRoutes, jupiterQuote }) {
    if (marketIndex === 2) {
        return findBestMSolSuperStakeIxs({
            amount,
            jupiterClient,
            driftClient,
            userAccountPublicKey,
            price,
            forceMarinade,
            onlyDirectRoutes,
            jupiterQuote
        });
    } else if (marketIndex === 6) {
        return findBestJitoSolSuperStakeIxs({
            amount,
            jupiterClient,
            driftClient,
            userAccountPublicKey,
            onlyDirectRoutes,
            jupiterQuote
        });
    } else if (marketIndex === 8) {
        return findBestLstSuperStakeIxs({
            amount,
            lstMint: driftClient.getSpotMarketAccount(8).mint,
            lstMarketIndex: 8,
            jupiterClient,
            driftClient,
            userAccountPublicKey,
            onlyDirectRoutes,
            jupiterQuote
        });
    } else {
        throw new Error(`Unsupported superstake market index: ${marketIndex}`);
    }
}
exports.findBestSuperStakeIxs = findBestSuperStakeIxs;
async function findBestMSolSuperStakeIxs({ amount, jupiterClient, driftClient, userAccountPublicKey, price, forceMarinade, onlyDirectRoutes, jupiterQuote }) {
    if (!price) {
        const marinadeProgram = (0, marinade_1.getMarinadeFinanceProgram)(driftClient.provider);
        price = await (0, marinade_1.getMarinadeMSolPrice)(marinadeProgram);
    }
    const solSpotMarketAccount = driftClient.getSpotMarketAccount(1);
    const mSolSpotMarketAccount = driftClient.getSpotMarketAccount(2);
    let jupiterPrice;
    let quote = jupiterQuote;
    if (!jupiterQuote) {
        try {
            const fetchedQuote = await jupiterClient.getQuote({
                inputMint: solSpotMarketAccount.mint,
                outputMint: mSolSpotMarketAccount.mint,
                amount,
                slippageBps: 1000,
                onlyDirectRoutes
            });
            jupiterPrice = +quote.outAmount / +quote.inAmount;
            quote = fetchedQuote;
        } catch (e) {
            console.error('Error getting jupiter price', e);
        }
    }
    if (!jupiterPrice || price <= jupiterPrice || forceMarinade) {
        const ixs = await driftClient.getStakeForMSOLIx({
            amount,
            userAccountPublicKey
        });
        return {
            method: 'marinade',
            ixs,
            lookupTables: [],
            price: price
        };
    } else {
        const { ixs, lookupTables } = await driftClient.getJupiterSwapIxV6({
            inMarketIndex: 1,
            outMarketIndex: 2,
            jupiterClient,
            amount,
            userAccountPublicKey,
            onlyDirectRoutes,
            quote
        });
        return {
            method: 'jupiter',
            ixs,
            lookupTables,
            price: jupiterPrice
        };
    }
}
exports.findBestMSolSuperStakeIxs = findBestMSolSuperStakeIxs;
async function findBestJitoSolSuperStakeIxs({ amount, jupiterClient, driftClient, userAccountPublicKey, onlyDirectRoutes, jupiterQuote }) {
    return await findBestLstSuperStakeIxs({
        amount,
        jupiterClient,
        driftClient,
        userAccountPublicKey,
        onlyDirectRoutes,
        lstMint: driftClient.getSpotMarketAccount(6).mint,
        lstMarketIndex: 6,
        jupiterQuote
    });
}
exports.findBestJitoSolSuperStakeIxs = findBestJitoSolSuperStakeIxs;
/**
 * Finds best swap instructions for a generic lstMint
 *
 * Without doing any extra steps like checking if you can get a better rate by staking directly with that LST platform
 */ async function findBestLstSuperStakeIxs({ amount, jupiterClient, driftClient, userAccountPublicKey, onlyDirectRoutes, lstMarketIndex, jupiterQuote }) {
    const { ixs, lookupTables } = await driftClient.getJupiterSwapIxV6({
        inMarketIndex: 1,
        outMarketIndex: lstMarketIndex,
        jupiterClient,
        amount,
        userAccountPublicKey,
        onlyDirectRoutes,
        quote: jupiterQuote
    });
    return {
        method: 'jupiter',
        ixs,
        lookupTables
    };
}
exports.findBestLstSuperStakeIxs = findBestLstSuperStakeIxs;
/**
 * Removes hours, minutes, seconds from a date, and returns the ISO string value (with milliseconds trimmed from the output (required by Jito API))
 * @param inDate
 * @returns
 */ const getNormalizedDateString = (inDate)=>{
    const date = new Date(inDate.getTime());
    date.setUTCHours(0, 0, 0, 0);
    return date.toISOString().slice(0, 19) + 'Z';
};
const get30DAgo = ()=>{
    const date = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    return date;
};
async function fetchJitoSolMetrics() {
    const res = await (0, node_fetch_1.default)('https://kobe.mainnet.jito.network/api/v1/stake_pool_stats', {
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            bucket_type: 'Daily',
            range_filter: {
                start: getNormalizedDateString(get30DAgo()),
                end: getNormalizedDateString(new Date())
            },
            sort_by: {
                order: 'Asc',
                field: 'BlockTime'
            }
        }),
        method: 'POST'
    });
    const data = await res.json();
    return data;
}
exports.fetchJitoSolMetrics = fetchJitoSolMetrics;
const fetchMSolMetrics = async ()=>{
    const res = await (0, node_fetch_1.default)('https://api2.marinade.finance/metrics_json');
    const data = await res.json();
    return data;
};
exports.fetchMSolMetrics = fetchMSolMetrics;
const getJitoSolHistoricalPriceMap = async (timestamps)=>{
    try {
        const data = await fetchJitoSolMetrics();
        const jitoSolHistoricalPriceMap = new Map();
        const jitoSolHistoricalPriceInSol = [];
        for(let i = 0; i < data.supply.length; i++){
            const priceInSol = data.tvl[i].data / 10 ** 9 / data.supply[i].data;
            jitoSolHistoricalPriceInSol.push({
                price: priceInSol,
                ts: data.tvl[i].date
            });
        }
        for (const timestamp of timestamps){
            const date = new Date(timestamp * 1000);
            const dateString = date.toISOString();
            const price = jitoSolHistoricalPriceInSol.find((p)=>(0, utils_1.checkSameDate)(p.ts, dateString));
            if (price) {
                jitoSolHistoricalPriceMap.set(timestamp, price.price);
            }
        }
        return jitoSolHistoricalPriceMap;
    } catch (err) {
        console.error(err);
        return undefined;
    }
};
async function calculateSolEarned({ marketIndex, user, depositRecords }) {
    const now = Date.now() / 1000;
    const timestamps = [
        now,
        ...depositRecords.filter((r)=>r.marketIndex === marketIndex).map((r)=>r.ts.toNumber())
    ];
    let lstRatios = new Map();
    const getMsolPrice = async (timestamp)=>{
        const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
        const swaggerApiDateTime = date.toISOString(); // Format date as swagger API date-time
        const url = `https://api.marinade.finance/msol/price_sol?time=${swaggerApiDateTime}`;
        const response = await (0, node_fetch_1.default)(url);
        if (response.status === 200) {
            const data = await response.json();
            lstRatios.set(timestamp, data);
        }
    };
    const getBSolPrice = async (timestamps)=>{
        var _a, _b;
        // Currently there's only one bSOL price, no timestamped data
        // So just use the same price for every timestamp for now
        const response = await fetchBSolMetrics();
        if (response.status === 200) {
            const data = await response.json();
            const bSolRatio = (_b = (_a = data === null || data === void 0 ? void 0 : data.stats) === null || _a === void 0 ? void 0 : _a.conversion) === null || _b === void 0 ? void 0 : _b.bsol_to_sol;
            if (bSolRatio) {
                timestamps.forEach((timestamp)=>lstRatios.set(timestamp, bSolRatio));
            }
        }
    };
    // This block kind of assumes the record are all from the same market
    // Otherwise the following code that checks the record.marketIndex would break
    if (marketIndex === 2) {
        await Promise.all(timestamps.map(getMsolPrice));
    } else if (marketIndex === 6) {
        lstRatios = await getJitoSolHistoricalPriceMap(timestamps);
    } else if (marketIndex === 8) {
        await getBSolPrice(timestamps);
    }
    let solEarned = numericConstants_1.ZERO;
    for (const record of depositRecords){
        if (record.marketIndex === 1) {
            if ((0, types_1.isVariant)(record.direction, 'deposit')) {
                solEarned = solEarned.sub(record.amount);
            } else {
                solEarned = solEarned.add(record.amount);
            }
        } else if (record.marketIndex === 2 || record.marketIndex === 6 || record.marketIndex === 8) {
            const lstRatio = lstRatios.get(record.ts.toNumber());
            const lstRatioBN = new anchor_1.BN(lstRatio * web3_js_1.LAMPORTS_PER_SOL);
            const solAmount = record.amount.mul(lstRatioBN).div(numericConstants_1.LAMPORTS_PRECISION);
            if ((0, types_1.isVariant)(record.direction, 'deposit')) {
                solEarned = solEarned.sub(solAmount);
            } else {
                solEarned = solEarned.add(solAmount);
            }
        }
    }
    const currentLstTokenAmount = await user.getTokenAmount(marketIndex);
    const currentLstRatio = lstRatios.get(now);
    const currentLstRatioBN = new anchor_1.BN(currentLstRatio * web3_js_1.LAMPORTS_PER_SOL);
    solEarned = solEarned.add(currentLstTokenAmount.mul(currentLstRatioBN).div(numericConstants_1.LAMPORTS_PRECISION));
    const currentSOLTokenAmount = await user.getTokenAmount(1);
    solEarned = solEarned.add(currentSOLTokenAmount);
    return solEarned;
}
exports.calculateSolEarned = calculateSolEarned;
// calculate estimated liquidation price (in LST/SOL) based on target amounts
function calculateEstimatedSuperStakeLiquidationPrice(lstDepositAmount, lstMaintenanceAssetWeight, solBorrowAmount, solMaintenanceLiabilityWeight, lstPriceRatio) {
    const liquidationDivergence = solMaintenanceLiabilityWeight * solBorrowAmount / (lstMaintenanceAssetWeight * lstDepositAmount * lstPriceRatio);
    const liquidationPrice = lstPriceRatio * liquidationDivergence;
    return liquidationPrice;
}
exports.calculateEstimatedSuperStakeLiquidationPrice = calculateEstimatedSuperStakeLiquidationPrice;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/state.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.builderReferralEnabled = exports.builderCodesEnabled = exports.useMedianTriggerPrice = exports.getMaxNumberOfSubAccounts = exports.calculateInitUserFee = void 0;
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
function calculateInitUserFee(stateAccount) {
    const maxInitFee = new anchor_1.BN(stateAccount.maxInitializeUserFee).mul(numericConstants_1.LAMPORTS_PRECISION).divn(100);
    const targetUtilization = numericConstants_1.PERCENTAGE_PRECISION.muln(8).divn(10);
    const accountSpaceUtilization = stateAccount.numberOfSubAccounts.addn(1).mul(numericConstants_1.PERCENTAGE_PRECISION).div(getMaxNumberOfSubAccounts(stateAccount));
    if (accountSpaceUtilization.gt(targetUtilization)) {
        return maxInitFee.mul(accountSpaceUtilization.sub(targetUtilization)).div(numericConstants_1.PERCENTAGE_PRECISION.sub(targetUtilization));
    } else {
        return numericConstants_1.ZERO;
    }
}
exports.calculateInitUserFee = calculateInitUserFee;
function getMaxNumberOfSubAccounts(stateAccount) {
    if (stateAccount.maxNumberOfSubAccounts <= 5) {
        return new anchor_1.BN(stateAccount.maxNumberOfSubAccounts);
    }
    return new anchor_1.BN(stateAccount.maxNumberOfSubAccounts).muln(100);
}
exports.getMaxNumberOfSubAccounts = getMaxNumberOfSubAccounts;
function useMedianTriggerPrice(stateAccount) {
    return (stateAccount.featureBitFlags & types_1.FeatureBitFlags.MEDIAN_TRIGGER_PRICE) > 0;
}
exports.useMedianTriggerPrice = useMedianTriggerPrice;
function builderCodesEnabled(stateAccount) {
    return (stateAccount.featureBitFlags & types_1.FeatureBitFlags.BUILDER_CODES) > 0;
}
exports.builderCodesEnabled = builderCodesEnabled;
function builderReferralEnabled(stateAccount) {
    return (stateAccount.featureBitFlags & types_1.FeatureBitFlags.BUILDER_REFERRAL) > 0;
}
exports.builderReferralEnabled = builderReferralEnabled;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/userStatus.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isUserProtectedMaker = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
function isUserProtectedMaker(userAccount) {
    return (userAccount.status & types_1.UserStatus.PROTECTED_MAKER) > 0;
}
exports.isUserProtectedMaker = isUserProtectedMaker;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/protectedMakerParams.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getProtectedMakerParamsMap = exports.getProtectedMakerParams = void 0;
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
function getProtectedMakerParams(perpMarket) {
    let dynamicOffset;
    if (perpMarket.protectedMakerDynamicDivisor > 0) {
        dynamicOffset = anchor_1.BN.max(perpMarket.amm.oracleStd, perpMarket.amm.markStd).divn(perpMarket.protectedMakerDynamicDivisor);
    } else {
        dynamicOffset = 0;
    }
    return {
        tickSize: perpMarket.amm.orderTickSize,
        limitPriceDivisor: perpMarket.protectedMakerLimitPriceDivisor,
        dynamicOffset: dynamicOffset
    };
}
exports.getProtectedMakerParams = getProtectedMakerParams;
function getProtectedMakerParamsMap(perpMarkets) {
    const map = {
        perp: new Map(),
        spot: new Map()
    };
    for (const perpMarket of perpMarkets){
        const marketIndex = perpMarket.marketIndex;
        const protectedMakerParams = getProtectedMakerParams(perpMarket);
        map.perp.set(marketIndex, protectedMakerParams);
    }
    return map;
}
exports.getProtectedMakerParamsMap = getProtectedMakerParamsMap;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/bankruptcy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isUserBankrupt = void 0;
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const position_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/position.js [app-route] (ecmascript)");
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
function isUserBankrupt(user) {
    const userAccount = user.getUserAccount();
    let hasLiability = false;
    for (const position of userAccount.spotPositions){
        if (position.scaledBalance.gt(numericConstants_1.ZERO)) {
            if ((0, types_1.isVariant)(position.balanceType, 'deposit')) {
                return false;
            }
            if ((0, types_1.isVariant)(position.balanceType, 'borrow')) {
                hasLiability = true;
            }
        }
    }
    for (const position of userAccount.perpPositions){
        if (!position.baseAssetAmount.eq(numericConstants_1.ZERO) || position.quoteAssetAmount.gt(numericConstants_1.ZERO) || (0, position_1.hasOpenOrders)(position)) {
            return false;
        }
        if (position.quoteAssetAmount.lt(numericConstants_1.ZERO)) {
            hasLiability = true;
        }
    }
    return hasLiability;
}
exports.isUserBankrupt = isUserBankrupt;
}),
];

//# sourceMappingURL=df7f8_%40drift-labs_sdk_lib_browser_math_c3d7c3d1._.js.map