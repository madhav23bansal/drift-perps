module.exports = [
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/assert/assert.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.assert = void 0;
function assert(condition, error) {
    if (!condition) {
        throw new Error(error || 'Unspecified AssertionError');
    }
}
exports.assert = assert;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/factory/bigNum.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BigNum = void 0;
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const assert_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/assert/assert.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
class BigNum {
    static setLocale(locale) {
        BigNum.delim = 1.1.toLocaleString(locale).slice(1, 2) || '.';
        BigNum.spacer = 1000..toLocaleString(locale).slice(1, 2) || ',';
    }
    constructor(val, precisionVal = new anchor_1.BN(0)){
        this.toString = (base, length)=>this.val.toString(base, length);
        this.val = new anchor_1.BN(val);
        this.precision = new anchor_1.BN(precisionVal);
    }
    bigNumFromParam(bn) {
        return anchor_1.BN.isBN(bn) ? BigNum.from(bn) : bn;
    }
    add(bn) {
        (0, assert_1.assert)(bn.precision.eq(this.precision), 'Adding unequal precisions');
        return BigNum.from(this.val.add(bn.val), this.precision);
    }
    sub(bn) {
        (0, assert_1.assert)(bn.precision.eq(this.precision), 'Subtracting unequal precisions');
        return BigNum.from(this.val.sub(bn.val), this.precision);
    }
    mul(bn) {
        const mulVal = this.bigNumFromParam(bn);
        return BigNum.from(this.val.mul(mulVal.val), this.precision.add(mulVal.precision));
    }
    /**
     * Multiplies by another big number then scales the result down by the big number's precision so that we're in the same precision space
     * @param bn
     * @returns
     */ scalarMul(bn) {
        if (anchor_1.BN.isBN(bn)) return BigNum.from(this.val.mul(bn), this.precision);
        return BigNum.from(this.val.mul(bn.val), this.precision.add(bn.precision)).shift(bn.precision.neg());
    }
    div(bn) {
        if (anchor_1.BN.isBN(bn)) return BigNum.from(this.val.div(bn), this.precision);
        return BigNum.from(this.val.div(bn.val), this.precision.sub(bn.precision));
    }
    /**
     * Shift precision up or down
     * @param exponent
     * @param skipAdjustingPrecision
     * @returns
     */ shift(exponent, skipAdjustingPrecision = false) {
        const shiftVal = typeof exponent === 'number' ? new anchor_1.BN(exponent) : exponent;
        return BigNum.from(shiftVal.isNeg() ? this.val.div(new anchor_1.BN(10).pow(shiftVal)) : this.val.mul(new anchor_1.BN(10).pow(shiftVal)), skipAdjustingPrecision ? this.precision : this.precision.add(shiftVal));
    }
    /**
     * Shift to a target precision
     * @param targetPrecision
     * @returns
     */ shiftTo(targetPrecision) {
        return this.shift(targetPrecision.sub(this.precision));
    }
    /**
     * Scale the number by a fraction
     * @param numerator
     * @param denominator
     * @returns
     */ scale(numerator, denominator) {
        return this.mul(BigNum.from(new anchor_1.BN(numerator))).div(new anchor_1.BN(denominator));
    }
    toPercentage(denominator, precision) {
        return this.shift(precision).shift(2, true).div(denominator).toPrecision(precision);
    }
    gt(bn, ignorePrecision) {
        const comparisonVal = this.bigNumFromParam(bn);
        if (!ignorePrecision && !comparisonVal.eq(numericConstants_1.ZERO)) {
            (0, assert_1.assert)(comparisonVal.precision.eq(this.precision), 'Trying to compare numbers with different precision. Yo can opt to ignore precision using the ignorePrecision parameter');
        }
        return this.val.gt(comparisonVal.val);
    }
    lt(bn, ignorePrecision) {
        const comparisonVal = this.bigNumFromParam(bn);
        if (!ignorePrecision && !comparisonVal.val.eq(numericConstants_1.ZERO)) {
            (0, assert_1.assert)(comparisonVal.precision.eq(this.precision), 'Trying to compare numbers with different precision. Yo can opt to ignore precision using the ignorePrecision parameter');
        }
        return this.val.lt(comparisonVal.val);
    }
    gte(bn, ignorePrecision) {
        const comparisonVal = this.bigNumFromParam(bn);
        if (!ignorePrecision && !comparisonVal.val.eq(numericConstants_1.ZERO)) {
            (0, assert_1.assert)(comparisonVal.precision.eq(this.precision), 'Trying to compare numbers with different precision. Yo can opt to ignore precision using the ignorePrecision parameter');
        }
        return this.val.gte(comparisonVal.val);
    }
    lte(bn, ignorePrecision) {
        const comparisonVal = this.bigNumFromParam(bn);
        if (!ignorePrecision && !comparisonVal.val.eq(numericConstants_1.ZERO)) {
            (0, assert_1.assert)(comparisonVal.precision.eq(this.precision), 'Trying to compare numbers with different precision. Yo can opt to ignore precision using the ignorePrecision parameter');
        }
        return this.val.lte(comparisonVal.val);
    }
    eq(bn, ignorePrecision) {
        const comparisonVal = this.bigNumFromParam(bn);
        if (!ignorePrecision && !comparisonVal.val.eq(numericConstants_1.ZERO)) {
            (0, assert_1.assert)(comparisonVal.precision.eq(this.precision), 'Trying to compare numbers with different precision. Yo can opt to ignore precision using the ignorePrecision parameter');
        }
        return this.val.eq(comparisonVal.val);
    }
    eqZero() {
        return this.val.eq(numericConstants_1.ZERO);
    }
    gtZero() {
        return this.val.gt(numericConstants_1.ZERO);
    }
    ltZero() {
        return this.val.lt(numericConstants_1.ZERO);
    }
    gteZero() {
        return this.val.gte(numericConstants_1.ZERO);
    }
    lteZero() {
        return this.val.lte(numericConstants_1.ZERO);
    }
    abs() {
        return new BigNum(this.val.abs(), this.precision);
    }
    neg() {
        return new BigNum(this.val.neg(), this.precision);
    }
    /**
     * Pretty print the underlying value in human-readable form. Depends on precision being correct for the output string to be correct
     * @returns
     */ print() {
        (0, assert_1.assert)(this.precision.gte(numericConstants_1.ZERO), 'Tried to print a BN with precision lower than zero');
        const isNeg = this.isNeg();
        const plainString = this.abs().toString();
        const precisionNum = this.precision.toNumber();
        // make a string with at least the precisionNum number of zeroes
        let printString = [
            ...Array(this.precision.toNumber()).fill(0),
            ...plainString.split('')
        ].join('');
        // inject decimal
        printString = printString.substring(0, printString.length - precisionNum) + BigNum.delim + printString.substring(printString.length - precisionNum);
        // remove leading zeroes
        printString = printString.replace(/^0+/, '');
        // add zero if leading delim
        if (printString[0] === BigNum.delim) printString = `0${printString}`;
        // Add minus if negative
        if (isNeg) printString = `-${printString}`;
        // remove trailing delim
        if (printString[printString.length - 1] === BigNum.delim) printString = printString.slice(0, printString.length - 1);
        return printString;
    }
    prettyPrint(useTradePrecision, precisionOverride, decimalOverride) {
        const [leftSide, rightSide] = this.printShort(useTradePrecision, precisionOverride).split(BigNum.delim);
        let formattedLeftSide = leftSide;
        let formattedRightSide = rightSide;
        // Apply decimal override if specified
        if (decimalOverride !== undefined) {
            if (decimalOverride === 0) {
                formattedRightSide = undefined;
            } else {
                // If no decimal part exists, create one with zeros
                const currentRightSide = rightSide || '';
                // Pad with zeros if needed or truncate if too long
                formattedRightSide = currentRightSide.padEnd(decimalOverride, '0').substring(0, decimalOverride);
            }
        }
        const isNeg = formattedLeftSide.includes('-');
        if (isNeg) {
            formattedLeftSide = formattedLeftSide.replace('-', '');
        }
        let index = formattedLeftSide.length - 3;
        while(index >= 1){
            const formattedLeftSideArray = formattedLeftSide.split('');
            formattedLeftSideArray.splice(index, 0, BigNum.spacer);
            formattedLeftSide = formattedLeftSideArray.join('');
            index -= 3;
        }
        return `${isNeg ? '-' : ''}${formattedLeftSide}${formattedRightSide ? `${BigNum.delim}${formattedRightSide}` : ''}`;
    }
    /**
     * Print and remove unnecessary trailing zeroes
     * @returns
     */ printShort(useTradePrecision, precisionOverride) {
        const printVal = precisionOverride ? this.toPrecision(precisionOverride) : useTradePrecision ? this.toTradePrecision() : this.print();
        if (!printVal.includes(BigNum.delim)) return printVal;
        return printVal.replace(/0+$/g, '').replace(/\.$/, '').replace(/,$/, '');
    }
    debug() {
        console.log(`${this.toString()} | ${this.print()} | ${this.precision.toString()}`);
    }
    /**
     * Pretty print with the specified number of decimal places
     * @param fixedPrecision
     * @returns
     */ toFixed(fixedPrecision, rounded = false) {
        if (rounded) {
            return this.toRounded(fixedPrecision).toFixed(fixedPrecision);
        }
        const printString = this.print();
        const [leftSide, rightSide] = printString.split(BigNum.delim);
        const filledRightSide = [
            ...(rightSide !== null && rightSide !== void 0 ? rightSide : '').slice(0, fixedPrecision),
            ...Array(fixedPrecision).fill('0')
        ].slice(0, fixedPrecision).join('');
        return `${leftSide}${BigNum.delim}${filledRightSide}`;
    }
    getZeroes(count) {
        return new Array(Math.max(count, 0)).fill('0').join('');
    }
    toRounded(roundingPrecision) {
        const printString = this.toString();
        let shouldRoundUp = false;
        const roundingDigitChar = printString[roundingPrecision];
        if (roundingDigitChar) {
            const roundingDigitVal = Number(roundingDigitChar);
            if (roundingDigitVal >= 5) shouldRoundUp = true;
        }
        if (shouldRoundUp) {
            const valueWithRoundedPrecisionAdded = this.add(BigNum.from(new anchor_1.BN(10).pow(new anchor_1.BN(printString.length - roundingPrecision)), this.precision));
            const roundedUpPrintString = valueWithRoundedPrecisionAdded.toString().slice(0, roundingPrecision) + this.getZeroes(printString.length - roundingPrecision);
            return BigNum.from(roundedUpPrintString, this.precision);
        } else {
            const roundedDownPrintString = printString.slice(0, roundingPrecision) + this.getZeroes(printString.length - roundingPrecision);
            return BigNum.from(roundedDownPrintString, this.precision);
        }
    }
    /**
     * Pretty print to the specified number of significant figures
     * @param fixedPrecision
     * @returns
     */ toPrecision(fixedPrecision, trailingZeroes = false, rounded = false) {
        if (rounded) {
            return this.toRounded(fixedPrecision).toPrecision(fixedPrecision, trailingZeroes);
        }
        const isNeg = this.isNeg();
        const printString = this.abs().print();
        const thisString = this.abs().toString();
        // Handle small numbers (those with leading zeros after decimal)
        if (printString.includes(BigNum.delim)) {
            const [leftSide, rightSide] = printString.split(BigNum.delim);
            if (leftSide === '0' && rightSide) {
                // Count leading zeros
                let leadingZeros = 0;
                for(let i = 0; i < rightSide.length; i++){
                    if (rightSide[i] === '0') {
                        leadingZeros++;
                    } else {
                        break;
                    }
                }
                // Get significant digits starting after leading zeros
                const significantPart = rightSide.slice(leadingZeros);
                let significantDigits = significantPart.slice(0, fixedPrecision);
                // Remove trailing zeros if not requested
                if (!trailingZeroes) {
                    significantDigits = significantDigits.replace(/0+$/, '');
                }
                // Only return result if we have significant digits
                if (significantDigits.length > 0) {
                    const result = `${isNeg ? '-' : ''}0${BigNum.delim}${rightSide.slice(0, leadingZeros)}${significantDigits}`;
                    return result;
                }
            }
        }
        let precisionPrintString = printString.slice(0, fixedPrecision + 1);
        if (!printString.includes(BigNum.delim) && thisString.length < fixedPrecision) {
            const precisionMismatch = fixedPrecision - thisString.length;
            return BigNum.from((isNeg ? '-' : '') + thisString + this.getZeroes(precisionMismatch), precisionMismatch).toPrecision(fixedPrecision, trailingZeroes);
        }
        if (!precisionPrintString.includes(BigNum.delim) || precisionPrintString[precisionPrintString.length - 1] === BigNum.delim) {
            precisionPrintString = printString.slice(0, fixedPrecision);
        }
        const pointsOfPrecision = precisionPrintString.replace(BigNum.delim, '').length;
        if (pointsOfPrecision < fixedPrecision) {
            precisionPrintString = [
                ...precisionPrintString.split(''),
                ...Array(fixedPrecision - pointsOfPrecision).fill('0')
            ].join('');
        }
        if (!precisionPrintString.includes(BigNum.delim)) {
            const delimFullStringLocation = printString.indexOf(BigNum.delim);
            let skipExponent = false;
            if (delimFullStringLocation === -1) {
                // no decimal, not missing any precision
                skipExponent = true;
            }
            if (precisionPrintString[precisionPrintString.length - 1] === BigNum.delim) {
                // decimal is at end of string, not missing any precision, do nothing
                skipExponent = true;
            }
            if (printString.indexOf(BigNum.delim) === fixedPrecision) {
                // decimal is at end of string, not missing any precision, do nothing
                skipExponent = true;
            }
            if (!skipExponent) {
                const exponent = delimFullStringLocation - fixedPrecision;
                if (trailingZeroes) {
                    precisionPrintString = `${precisionPrintString}${Array(exponent).fill('0').join('')}`;
                } else {
                    precisionPrintString = `${precisionPrintString}e${exponent}`;
                }
            }
        }
        return `${isNeg ? '-' : ''}${precisionPrintString}`;
    }
    toTradePrecision(rounded = false) {
        return this.toPrecision(6, true, rounded);
    }
    /**
     * Print dollar formatted value. Defaults to fixed decimals two unless a given precision is given.
     * @param useTradePrecision
     * @param precisionOverride
     * @returns
     */ toNotional(useTradePrecision, precisionOverride, decimalOverride) {
        var _a;
        const prefix = `${this.lt(BigNum.zero()) ? `-` : ``}$`;
        const usingCustomPrecision = true && (useTradePrecision || precisionOverride || decimalOverride);
        let val = usingCustomPrecision ? this.prettyPrint(useTradePrecision, precisionOverride, decimalOverride) : BigNum.fromPrint(this.toFixed(2), new anchor_1.BN(2)).prettyPrint();
        // Append trailing zeroes out to 2 decimal places if not using custom precision
        if (!usingCustomPrecision) {
            const [_, rightSide] = val.split(BigNum.delim);
            const trailingLength = (_a = rightSide === null || rightSide === void 0 ? void 0 : rightSide.length) !== null && _a !== void 0 ? _a : 0;
            if (trailingLength === 0) {
                val = `${val}${BigNum.delim}00`;
            } else if (trailingLength === 1) {
                val = `${val}0`;
            }
        }
        return `${prefix}${val.replace('-', '')}`;
    }
    toMillified(precision = 3, rounded = false, type = 'financial') {
        if (rounded) {
            return this.toRounded(precision).toMillified(precision);
        }
        const isNeg = this.isNeg();
        const stringVal = this.abs().print();
        const [leftSide] = stringVal.split(BigNum.delim);
        if (!leftSide) {
            return this.shift(new anchor_1.BN(precision)).toPrecision(precision, true);
        }
        if (leftSide.length <= precision) {
            return this.toPrecision(precision);
        }
        if (leftSide.length <= 3) {
            return this.shift(new anchor_1.BN(precision)).toPrecision(precision, true);
        }
        const unitTicks = type === 'financial' ? [
            '',
            'K',
            'M',
            'B',
            'T',
            'Q'
        ] : [
            '',
            'K',
            'M',
            'G',
            'T',
            'P',
            'E',
            'Z',
            'Y'
        ];
        // TODO -- handle nubers which are larger than the max unit tick
        const unitNumber = Math.floor((leftSide.length - 1) / 3);
        const unit = unitTicks[unitNumber];
        let leadDigits = leftSide.slice(0, precision);
        if (leadDigits.length < precision) {
            leadDigits = [
                ...leadDigits.split(''),
                ...Array(precision - leadDigits.length).fill('0')
            ].join('');
        }
        const decimalLocation = leftSide.length - 3 * unitNumber;
        let leadString = '';
        if (decimalLocation >= precision) {
            leadString = `${leadDigits}`;
        } else {
            leadString = `${leadDigits.slice(0, decimalLocation)}${BigNum.delim}${leadDigits.slice(decimalLocation)}`;
        }
        return `${isNeg ? '-' : ''}${leadString}${unit}`;
    }
    toJSON() {
        return {
            val: this.val.toString(),
            precision: this.precision.toString()
        };
    }
    isNeg() {
        return this.lt(numericConstants_1.ZERO, true);
    }
    isPos() {
        return !this.isNeg();
    }
    /**
     * Get the numerical value of the BigNum. This can break if the BigNum is too large.
     * @returns
     */ toNum() {
        let printedValue = this.print();
        // Must convert any non-US delimiters and spacers to US format before using parseFloat
        if (BigNum.delim !== '.' || BigNum.spacer !== ',') {
            printedValue = printedValue.split('').map((char)=>{
                if (char === BigNum.delim) return '.';
                if (char === BigNum.spacer) return ',';
                return char;
            }).join('');
        }
        return parseFloat(printedValue);
    }
    static fromJSON(json) {
        return BigNum.from(new anchor_1.BN(json.val), new anchor_1.BN(json.precision));
    }
    /**
     * Create a BigNum instance
     * @param val
     * @param precision
     * @returns
     */ static from(val = numericConstants_1.ZERO, precision) {
        (0, assert_1.assert)(new anchor_1.BN(precision).lt(new anchor_1.BN(100)), 'Tried to create a bignum with precision higher than 10^100');
        return new BigNum(val, precision);
    }
    /**
     * Create a BigNum instance from a printed BigNum
     * @param val
     * @param precisionOverride
     * @returns
     */ static fromPrint(val, precisionShift) {
        var _a, _b;
        // Handle empty number edge cases
        if (!val) return BigNum.from(numericConstants_1.ZERO, precisionShift);
        if (!val.replace(BigNum.delim, '')) {
            return BigNum.from(numericConstants_1.ZERO, precisionShift);
        }
        if (val.includes('e')) val = (+val).toFixed((_a = precisionShift === null || precisionShift === void 0 ? void 0 : precisionShift.toNumber()) !== null && _a !== void 0 ? _a : 9); // prevent small numbers e.g. 3.1e-8, use assume max precision 9 as default
        const sides = val.split(BigNum.delim);
        const rightSide = sides[1];
        const leftSide = sides[0].replace(/\s/g, '');
        const bnInput = `${leftSide !== null && leftSide !== void 0 ? leftSide : ''}${rightSide !== null && rightSide !== void 0 ? rightSide : ''}`;
        const rawBn = new anchor_1.BN(bnInput);
        const rightSideLength = (_b = rightSide === null || rightSide === void 0 ? void 0 : rightSide.length) !== null && _b !== void 0 ? _b : 0;
        const totalShift = precisionShift ? precisionShift.sub(new anchor_1.BN(rightSideLength)) : numericConstants_1.ZERO;
        return BigNum.from(rawBn, precisionShift).shift(totalShift, true);
    }
    static max(a, b) {
        return a.gt(b) ? a : b;
    }
    static min(a, b) {
        return a.lt(b) ? a : b;
    }
    static zero(precision) {
        return BigNum.from(0, precision);
    }
}
exports.BigNum = BigNum;
BigNum.delim = '.';
BigNum.spacer = ',';
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/factory/oracleClient.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getOracleClient = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const pythClient_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/pythClient.js [app-route] (ecmascript)");
// import { SwitchboardClient } from '../oracles/switchboardClient';
const quoteAssetOracleClient_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/quoteAssetOracleClient.js [app-route] (ecmascript)");
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const prelaunchOracleClient_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/prelaunchOracleClient.js [app-route] (ecmascript)");
const switchboardClient_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/switchboardClient.js [app-route] (ecmascript)");
const pythPullClient_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/pythPullClient.js [app-route] (ecmascript)");
const switchboardOnDemandClient_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/switchboardOnDemandClient.js [app-route] (ecmascript)");
const pythLazerClient_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/pythLazerClient.js [app-route] (ecmascript)");
function getOracleClient(oracleSource, connection, program) {
    if ((0, types_1.isVariant)(oracleSource, 'pyth')) {
        return new pythClient_1.PythClient(connection);
    }
    if ((0, types_1.isVariant)(oracleSource, 'pythPull')) {
        return new pythPullClient_1.PythPullClient(connection);
    }
    if ((0, types_1.isVariant)(oracleSource, 'pyth1K')) {
        return new pythClient_1.PythClient(connection, new anchor_1.BN(1000));
    }
    if ((0, types_1.isVariant)(oracleSource, 'pyth1KPull')) {
        return new pythPullClient_1.PythPullClient(connection, new anchor_1.BN(1000));
    }
    if ((0, types_1.isVariant)(oracleSource, 'pyth1M')) {
        return new pythClient_1.PythClient(connection, new anchor_1.BN(1000000));
    }
    if ((0, types_1.isVariant)(oracleSource, 'pyth1MPull')) {
        return new pythPullClient_1.PythPullClient(connection, new anchor_1.BN(1000000));
    }
    if ((0, types_1.isVariant)(oracleSource, 'pythStableCoin')) {
        return new pythClient_1.PythClient(connection, undefined, true);
    }
    if ((0, types_1.isVariant)(oracleSource, 'pythStableCoinPull')) {
        return new pythPullClient_1.PythPullClient(connection, undefined, true);
    }
    if ((0, types_1.isVariant)(oracleSource, 'switchboard')) {
        return new switchboardClient_1.SwitchboardClient(connection);
    }
    if ((0, types_1.isVariant)(oracleSource, 'prelaunch')) {
        return new prelaunchOracleClient_1.PrelaunchOracleClient(connection, program);
    }
    if ((0, types_1.isVariant)(oracleSource, 'quoteAsset')) {
        return new quoteAssetOracleClient_1.QuoteAssetOracleClient();
    }
    if ((0, types_1.isVariant)(oracleSource, 'switchboardOnDemand')) {
        return new switchboardOnDemandClient_1.SwitchboardOnDemandClient(connection);
    }
    if ((0, types_1.isVariant)(oracleSource, 'pythLazer')) {
        return new pythLazerClient_1.PythLazerClient(connection);
    }
    if ((0, types_1.isVariant)(oracleSource, 'pythLazer1K')) {
        return new pythLazerClient_1.PythLazerClient(connection, new anchor_1.BN(1000));
    }
    if ((0, types_1.isVariant)(oracleSource, 'pythLazer1M')) {
        return new pythLazerClient_1.PythLazerClient(connection, new anchor_1.BN(1000000));
    }
    if ((0, types_1.isVariant)(oracleSource, 'pythLazerStableCoin')) {
        return new pythLazerClient_1.PythLazerClient(connection, undefined, true);
    }
    throw new Error(`Unknown oracle source ${oracleSource}`);
}
exports.getOracleClient = getOracleClient;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MARGIN_PRECISION = exports.AMM_TIMES_PEG_TO_QUOTE_PRECISION_RATIO = exports.PRICE_TO_QUOTE_PRECISION = exports.PRICE_DIV_PEG = exports.AMM_TO_QUOTE_PRECISION_RATIO = exports.BASE_PRECISION_EXP = exports.BASE_PRECISION = exports.AMM_RESERVE_PRECISION = exports.PEG_PRECISION = exports.FUNDING_RATE_BUFFER_PRECISION = exports.FUNDING_RATE_PRECISION = exports.PRICE_PRECISION = exports.QUOTE_PRECISION = exports.LIQUIDATION_FEE_PRECISION = exports.SPOT_MARKET_IMF_PRECISION = exports.SPOT_MARKET_IMF_PRECISION_EXP = exports.SPOT_MARKET_BALANCE_PRECISION = exports.SPOT_MARKET_BALANCE_PRECISION_EXP = exports.SPOT_MARKET_WEIGHT_PRECISION = exports.SPOT_MARKET_UTILIZATION_PRECISION = exports.SPOT_MARKET_UTILIZATION_PRECISION_EXP = exports.SPOT_MARKET_CUMULATIVE_INTEREST_PRECISION = exports.SPOT_MARKET_CUMULATIVE_INTEREST_PRECISION_EXP = exports.SPOT_MARKET_RATE_PRECISION = exports.SPOT_MARKET_RATE_PRECISION_EXP = exports.AMM_RESERVE_PRECISION_EXP = exports.PEG_PRECISION_EXP = exports.FUNDING_RATE_PRECISION_EXP = exports.PRICE_PRECISION_EXP = exports.FUNDING_RATE_BUFFER_PRECISION_EXP = exports.QUOTE_PRECISION_EXP = exports.CONCENTRATION_PRECISION = exports.PERCENTAGE_PRECISION = exports.PERCENTAGE_PRECISION_EXP = exports.MAX_LEVERAGE_ORDER_SIZE = exports.MAX_LEVERAGE = exports.TEN_MILLION = exports.BN_MAX = exports.TEN_THOUSAND = exports.TEN = exports.NINE = exports.EIGHT = exports.SEVEN = exports.SIX = exports.FIVE = exports.FOUR = exports.THREE = exports.TWO = exports.ONE = exports.ZERO = void 0;
exports.MIN_I64 = exports.MAX_I64 = exports.GET_MULTIPLE_ACCOUNTS_CHUNK_SIZE = exports.MAX_PREDICTION_PRICE = exports.FUEL_START_TS = exports.FUEL_WINDOW = exports.DUST_POSITION_SIZE = exports.SLOT_TIME_ESTIMATE_MS = exports.IDLE_TIME_SLOTS = exports.ACCOUNT_AGE_DELETION_CUTOFF_SECONDS = exports.DEFAULT_REVENUE_SINCE_LAST_FUNDING_SPREAD_RETREAT = exports.OPEN_ORDER_MARGIN_REQUIREMENT = exports.LAMPORTS_EXP = exports.LAMPORTS_PRECISION = exports.GOV_SPOT_MARKET_INDEX = exports.QUOTE_SPOT_MARKET_INDEX = exports.ONE_YEAR = exports.ONE_HOUR = exports.FIVE_MINUTE = exports.PRICE_TIMES_AMM_TO_QUOTE_PRECISION_RATIO = exports.FUNDING_RATE_OFFSET_DENOMINATOR = exports.LIQUIDATION_PCT_PRECISION = exports.BID_ASK_SPREAD_PRECISION = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const bigNum_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/factory/bigNum.js [app-route] (ecmascript)");
exports.ZERO = new anchor_1.BN(0);
exports.ONE = new anchor_1.BN(1);
exports.TWO = new anchor_1.BN(2);
exports.THREE = new anchor_1.BN(3);
exports.FOUR = new anchor_1.BN(4);
exports.FIVE = new anchor_1.BN(5);
exports.SIX = new anchor_1.BN(6);
exports.SEVEN = new anchor_1.BN(7);
exports.EIGHT = new anchor_1.BN(8);
exports.NINE = new anchor_1.BN(9);
exports.TEN = new anchor_1.BN(10);
exports.TEN_THOUSAND = new anchor_1.BN(10000);
exports.BN_MAX = new anchor_1.BN(Number.MAX_SAFE_INTEGER);
exports.TEN_MILLION = exports.TEN_THOUSAND.mul(exports.TEN_THOUSAND);
exports.MAX_LEVERAGE = new anchor_1.BN(5);
exports.MAX_LEVERAGE_ORDER_SIZE = new anchor_1.BN('18446744073709551615');
exports.PERCENTAGE_PRECISION_EXP = new anchor_1.BN(6);
exports.PERCENTAGE_PRECISION = new anchor_1.BN(10).pow(exports.PERCENTAGE_PRECISION_EXP);
exports.CONCENTRATION_PRECISION = exports.PERCENTAGE_PRECISION;
exports.QUOTE_PRECISION_EXP = new anchor_1.BN(6);
exports.FUNDING_RATE_BUFFER_PRECISION_EXP = new anchor_1.BN(3);
exports.PRICE_PRECISION_EXP = new anchor_1.BN(6);
exports.FUNDING_RATE_PRECISION_EXP = exports.PRICE_PRECISION_EXP.add(exports.FUNDING_RATE_BUFFER_PRECISION_EXP);
exports.PEG_PRECISION_EXP = new anchor_1.BN(6);
exports.AMM_RESERVE_PRECISION_EXP = new anchor_1.BN(9);
exports.SPOT_MARKET_RATE_PRECISION_EXP = new anchor_1.BN(6);
exports.SPOT_MARKET_RATE_PRECISION = new anchor_1.BN(10).pow(exports.SPOT_MARKET_RATE_PRECISION_EXP);
exports.SPOT_MARKET_CUMULATIVE_INTEREST_PRECISION_EXP = new anchor_1.BN(10);
exports.SPOT_MARKET_CUMULATIVE_INTEREST_PRECISION = new anchor_1.BN(10).pow(exports.SPOT_MARKET_CUMULATIVE_INTEREST_PRECISION_EXP);
exports.SPOT_MARKET_UTILIZATION_PRECISION_EXP = new anchor_1.BN(6);
exports.SPOT_MARKET_UTILIZATION_PRECISION = new anchor_1.BN(10).pow(exports.SPOT_MARKET_UTILIZATION_PRECISION_EXP);
exports.SPOT_MARKET_WEIGHT_PRECISION = new anchor_1.BN(10000);
exports.SPOT_MARKET_BALANCE_PRECISION_EXP = new anchor_1.BN(9);
exports.SPOT_MARKET_BALANCE_PRECISION = new anchor_1.BN(10).pow(exports.SPOT_MARKET_BALANCE_PRECISION_EXP);
exports.SPOT_MARKET_IMF_PRECISION_EXP = new anchor_1.BN(6);
exports.SPOT_MARKET_IMF_PRECISION = new anchor_1.BN(10).pow(exports.SPOT_MARKET_IMF_PRECISION_EXP);
exports.LIQUIDATION_FEE_PRECISION = new anchor_1.BN(1000000);
exports.QUOTE_PRECISION = new anchor_1.BN(10).pow(exports.QUOTE_PRECISION_EXP);
exports.PRICE_PRECISION = new anchor_1.BN(10).pow(exports.PRICE_PRECISION_EXP);
exports.FUNDING_RATE_PRECISION = new anchor_1.BN(10).pow(exports.FUNDING_RATE_PRECISION_EXP);
exports.FUNDING_RATE_BUFFER_PRECISION = new anchor_1.BN(10).pow(exports.FUNDING_RATE_BUFFER_PRECISION_EXP);
exports.PEG_PRECISION = new anchor_1.BN(10).pow(exports.PEG_PRECISION_EXP);
exports.AMM_RESERVE_PRECISION = new anchor_1.BN(10).pow(exports.AMM_RESERVE_PRECISION_EXP);
exports.BASE_PRECISION = exports.AMM_RESERVE_PRECISION;
exports.BASE_PRECISION_EXP = exports.AMM_RESERVE_PRECISION_EXP;
exports.AMM_TO_QUOTE_PRECISION_RATIO = exports.AMM_RESERVE_PRECISION.div(exports.QUOTE_PRECISION); // 10^3
exports.PRICE_DIV_PEG = exports.PRICE_PRECISION.div(exports.PEG_PRECISION); //10^1
exports.PRICE_TO_QUOTE_PRECISION = exports.PRICE_PRECISION.div(exports.QUOTE_PRECISION); // 10^1
exports.AMM_TIMES_PEG_TO_QUOTE_PRECISION_RATIO = exports.AMM_RESERVE_PRECISION.mul(exports.PEG_PRECISION).div(exports.QUOTE_PRECISION); // 10^9
exports.MARGIN_PRECISION = exports.TEN_THOUSAND;
exports.BID_ASK_SPREAD_PRECISION = new anchor_1.BN(1000000); // 10^6
exports.LIQUIDATION_PCT_PRECISION = exports.TEN_THOUSAND;
exports.FUNDING_RATE_OFFSET_DENOMINATOR = new anchor_1.BN(5000);
exports.PRICE_TIMES_AMM_TO_QUOTE_PRECISION_RATIO = exports.PRICE_PRECISION.mul(exports.AMM_TO_QUOTE_PRECISION_RATIO);
exports.FIVE_MINUTE = new anchor_1.BN(60 * 5);
exports.ONE_HOUR = new anchor_1.BN(60 * 60);
exports.ONE_YEAR = new anchor_1.BN(31536000);
exports.QUOTE_SPOT_MARKET_INDEX = 0;
exports.GOV_SPOT_MARKET_INDEX = 15;
exports.LAMPORTS_PRECISION = new anchor_1.BN(web3_js_1.LAMPORTS_PER_SOL);
exports.LAMPORTS_EXP = new anchor_1.BN(Math.log10(web3_js_1.LAMPORTS_PER_SOL));
exports.OPEN_ORDER_MARGIN_REQUIREMENT = exports.QUOTE_PRECISION.div(new anchor_1.BN(100));
exports.DEFAULT_REVENUE_SINCE_LAST_FUNDING_SPREAD_RETREAT = new anchor_1.BN(-25).mul(exports.QUOTE_PRECISION);
exports.ACCOUNT_AGE_DELETION_CUTOFF_SECONDS = 60 * 60 * 24 * 13; // 13 days
exports.IDLE_TIME_SLOTS = 9000;
exports.SLOT_TIME_ESTIMATE_MS = 400;
exports.DUST_POSITION_SIZE = exports.QUOTE_PRECISION.divn(100); // Dust position is any position smaller than 1c
exports.FUEL_WINDOW = new anchor_1.BN(60 * 60 * 24 * 28); // 28 days
exports.FUEL_START_TS = new anchor_1.BN(1723147200); // unix timestamp
exports.MAX_PREDICTION_PRICE = exports.PRICE_PRECISION;
exports.GET_MULTIPLE_ACCOUNTS_CHUNK_SIZE = 99;
// integer constants
exports.MAX_I64 = bigNum_1.BigNum.fromPrint('9223372036854775807').val;
exports.MIN_I64 = bigNum_1.BigNum.fromPrint('-9223372036854775808').val;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/perpMarkets.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PerpMarkets = exports.MainnetPerpMarkets = exports.DevnetPerpMarkets = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
exports.DevnetPerpMarkets = [
    {
        fullName: 'Solana',
        category: [
            'L1',
            'Infra'
        ],
        symbol: 'SOL-PERP',
        baseAssetSymbol: 'SOL',
        marketIndex: 0,
        oracle: new web3_js_1.PublicKey('3m6i4RFWEDw2Ft4tFHPJtYgmpPe21k56M3FHeWYrgGBz'),
        launchTs: 1655751353000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d',
        pythLazerId: 6
    },
    {
        fullName: 'Bitcoin',
        category: [
            'L1',
            'Payment'
        ],
        symbol: 'BTC-PERP',
        baseAssetSymbol: 'BTC',
        marketIndex: 1,
        oracle: new web3_js_1.PublicKey('35MbvS1Juz2wf7GsyHrkCw8yfKciRLxVpEhfZDZFrB4R'),
        launchTs: 1655751353000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
        pythLazerId: 1
    },
    {
        fullName: 'Ethereum',
        category: [
            'L1',
            'Infra'
        ],
        symbol: 'ETH-PERP',
        baseAssetSymbol: 'ETH',
        marketIndex: 2,
        oracle: new web3_js_1.PublicKey('93FG52TzNKCnMiasV14Ba34BYcHDb9p4zK4GjZnLwqWR'),
        launchTs: 1637691133472,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
        pythLazerId: 2
    },
    {
        fullName: 'Aptos',
        category: [
            'L1',
            'Infra'
        ],
        symbol: 'APT-PERP',
        baseAssetSymbol: 'APT',
        marketIndex: 3,
        oracle: new web3_js_1.PublicKey('79EWaCYU9jiQN8SbvVzGFAhAncUZYp3PjNg7KxmN5cLE'),
        launchTs: 1675610186000,
        oracleSource: types_1.OracleSource.PYTH_PULL,
        pythFeedId: '0x03ae4db29ed4ae33d323568895aa00337e658e348b37509f5372ae51f0af00d5',
        pythLazerId: 28
    },
    {
        fullName: 'Bonk',
        category: [
            'Meme',
            'Dog'
        ],
        symbol: '1MBONK-PERP',
        baseAssetSymbol: '1MBONK',
        marketIndex: 4,
        oracle: new web3_js_1.PublicKey('BERaNi6cpEresbq6HC1EQGaB1H1UjvEo4NGnmYSSJof4'),
        launchTs: 1677068931000,
        oracleSource: types_1.OracleSource.PYTH_LAZER_1M,
        pythFeedId: '0x72b021217ca3fe68922a19aaf990109cb9d84e9ad004b4d2025ad6f529314419',
        pythLazerId: 9
    },
    {
        fullName: 'Polygon',
        category: [
            'L2',
            'Infra'
        ],
        symbol: 'POL-PERP',
        baseAssetSymbol: 'POL',
        marketIndex: 5,
        oracle: new web3_js_1.PublicKey('BrzyDgwELy4jjjsqLQpBeUxzrsueYyMhuWpYBaUYcXvi'),
        launchTs: 1677690149000,
        oracleSource: types_1.OracleSource.PYTH_PULL,
        pythFeedId: '0xffd11c5a1cfd42f80afb2df4d9f264c15f956d68153335374ec10722edd70472',
        pythLazerId: 32
    },
    {
        fullName: 'Arbitrum',
        category: [
            'L2',
            'Infra'
        ],
        symbol: 'ARB-PERP',
        baseAssetSymbol: 'ARB',
        marketIndex: 6,
        oracle: new web3_js_1.PublicKey('8ocfAdqVRnzvfdubQaTxar4Kz5HJhNbPNmkLxswqiHUD'),
        launchTs: 1679501812000,
        oracleSource: types_1.OracleSource.PYTH_PULL,
        pythFeedId: '0x3fa4252848f9f0a1480be62745a4629d9eb1322aebab8a791e344b3b9c1adcf5',
        pythLazerId: 37
    },
    {
        fullName: 'Doge',
        category: [
            'Meme',
            'Dog'
        ],
        symbol: 'DOGE-PERP',
        baseAssetSymbol: 'DOGE',
        marketIndex: 7,
        oracle: new web3_js_1.PublicKey('23y63pHVwKfYSCDFdiGRaGbTYWoyr8UzhUE7zukyf6gK'),
        launchTs: 1680808053000,
        oracleSource: types_1.OracleSource.PYTH_PULL,
        pythFeedId: '0xdcef50dd0a4cd2dcc17e45df1676dcb336a11a61c69df7a0299b0150c672d25c',
        pythLazerId: 13
    },
    {
        fullName: 'Binance Coin',
        category: [
            'Exchange'
        ],
        symbol: 'BNB-PERP',
        baseAssetSymbol: 'BNB',
        marketIndex: 8,
        oracle: new web3_js_1.PublicKey('Dk8eWjuQHMbxJAwB9Sg7pXQPH4kgbg8qZGcUrWcD9gTm'),
        launchTs: 1680808053000,
        oracleSource: types_1.OracleSource.PYTH_PULL,
        pythFeedId: '0x2f95862b045670cd22bee3114c39763a4a08beeb663b145d283c31d7d1101c4f',
        pythLazerId: 15
    },
    {
        fullName: 'Sui',
        category: [
            'L1'
        ],
        symbol: 'SUI-PERP',
        baseAssetSymbol: 'SUI',
        marketIndex: 9,
        oracle: new web3_js_1.PublicKey('HBordkz5YxjzNURmKUY4vfEYFG9fZyZNeNF1VDLMoemT'),
        launchTs: 1683125906000,
        oracleSource: types_1.OracleSource.PYTH_PULL,
        pythFeedId: '0x23d7315113f5b1d3ba7a83604c44b94d79f4fd69af77f804fc7f920a6dc65744',
        pythLazerId: 11
    },
    {
        fullName: 'Pepe',
        category: [
            'Meme'
        ],
        symbol: '1MPEPE-PERP',
        baseAssetSymbol: '1MPEPE',
        marketIndex: 10,
        oracle: new web3_js_1.PublicKey('CLxofhtzvLiErpn25wvUzpZXEqBhuZ6WMEckEraxyuGt'),
        launchTs: 1683781239000,
        oracleSource: types_1.OracleSource.PYTH_1M_PULL,
        pythFeedId: '0xd69731a2e74ac1ce884fc3890f7ee324b6deb66147055249568869ed700882e4',
        pythLazerId: 4
    },
    {
        fullName: 'OP',
        category: [
            'L2',
            'Infra'
        ],
        symbol: 'OP-PERP',
        baseAssetSymbol: 'OP',
        marketIndex: 11,
        oracle: new web3_js_1.PublicKey('C9Zi2Y3Mt6Zt6pcFvobN3N29HcrzKujPAPBDDTDRcUa2'),
        launchTs: 1686091480000,
        oracleSource: types_1.OracleSource.PYTH_PULL,
        pythFeedId: '0x385f64d993f7b77d8182ed5003d97c60aa3361f3cecfe711544d2d59165e9bdf',
        pythLazerId: 41
    },
    {
        fullName: 'RENDER',
        category: [
            'Infra'
        ],
        symbol: 'RENDER-PERP',
        baseAssetSymbol: 'RENDER',
        marketIndex: 12,
        oracle: new web3_js_1.PublicKey('8TQztfGcNjHGRusX4ejQQtPZs3Ypczt9jWF6pkgQMqUX'),
        launchTs: 1687201081000,
        oracleSource: types_1.OracleSource.PYTH_PULL,
        pythFeedId: '0x3d4a2bd9535be6ce8059d75eadeba507b043257321aa544717c56fa19b49e35d',
        pythLazerId: 34
    },
    {
        fullName: 'XRP',
        category: [
            'Payments'
        ],
        symbol: 'XRP-PERP',
        baseAssetSymbol: 'XRP',
        marketIndex: 13,
        oracle: new web3_js_1.PublicKey('9757epAjXWCWQH98kyK9vzgehd1XDVEf7joNHUaKk3iV'),
        launchTs: 1689270550000,
        oracleSource: types_1.OracleSource.PYTH_PULL,
        pythFeedId: '0xec5d399846a9209f3fe5881d70aae9268c94339ff9817e8d18ff19fa05eea1c8',
        pythLazerId: 14
    },
    {
        fullName: 'HNT',
        category: [
            'IoT'
        ],
        symbol: 'HNT-PERP',
        baseAssetSymbol: 'HNT',
        marketIndex: 14,
        oracle: new web3_js_1.PublicKey('9b1rcK9RUPK2vAqwNYCYEG34gUVpS2WGs2YCZZy2X5Tb'),
        launchTs: 1692294955000,
        oracleSource: types_1.OracleSource.PYTH_PULL,
        pythFeedId: '0x649fdd7ec08e8e2a20f425729854e90293dcbe2376abc47197a14da6ff339756'
    },
    {
        fullName: 'INJ',
        category: [
            'L1',
            'Exchange'
        ],
        symbol: 'INJ-PERP',
        baseAssetSymbol: 'INJ',
        marketIndex: 15,
        oracle: new web3_js_1.PublicKey('BfXcyDWJmYADa5eZD7gySSDd6giqgjvm7xsAhQ239SUD'),
        launchTs: 1698074659000,
        oracleSource: types_1.OracleSource.PYTH_PULL,
        pythFeedId: '0x7a5bc1d2b56ad029048cd63964b3ad2776eadf812edc1a43a31406cb54bff592',
        pythLazerId: 46
    },
    {
        fullName: 'LINK',
        category: [
            'Oracle'
        ],
        symbol: 'LINK-PERP',
        baseAssetSymbol: 'LINK',
        marketIndex: 16,
        oracle: new web3_js_1.PublicKey('Gwvob7yoLMgQRVWjScCRyQFMsgpRKrSAYisYEyjDJwEp'),
        launchTs: 1698074659000,
        oracleSource: types_1.OracleSource.PYTH_PULL,
        pythFeedId: '0x8ac0c70fff57e9aefdf5edf44b51d62c2d433653cbb2cf5cc06bb115af04d221',
        pythLazerId: 19
    },
    {
        fullName: 'Rollbit',
        category: [
            'Exchange'
        ],
        symbol: 'RLB-PERP',
        baseAssetSymbol: 'RLB',
        marketIndex: 17,
        oracle: new web3_js_1.PublicKey('4CyhPqyVK3UQHFWhEpk91Aw4WbBsN3JtyosXH6zjoRqG'),
        launchTs: 1699265968000,
        oracleSource: types_1.OracleSource.PYTH_PULL,
        pythFeedId: '0x2f2d17abbc1e781bd87b4a5d52c8b2856886f5c482fa3593cebf6795040ab0b6'
    },
    {
        fullName: 'Pyth',
        category: [
            'Oracle'
        ],
        symbol: 'PYTH-PERP',
        baseAssetSymbol: 'PYTH',
        marketIndex: 18,
        oracle: new web3_js_1.PublicKey('GqkCu7CbsPVz1H6W6AAHuReqbJckYG59TXz7Y5HDV7hr'),
        launchTs: 1700542800000,
        oracleSource: types_1.OracleSource.PYTH_PULL,
        pythFeedId: '0x0bbf28e9a841a1cc788f6a361b17ca072d0ea3098a1e5df1c3922d06719579ff',
        pythLazerId: 3
    },
    {
        fullName: 'Celestia',
        category: [
            'Data'
        ],
        symbol: 'TIA-PERP',
        baseAssetSymbol: 'TIA',
        marketIndex: 19,
        oracle: new web3_js_1.PublicKey('C6LHPUrgjrgo5eNUitC8raNEdEttfoRhmqdJ3BHVBJhi'),
        launchTs: 1701880540000,
        oracleSource: types_1.OracleSource.PYTH_PULL,
        pythFeedId: '0x09f7c1d7dfbb7df2b8fe3d3d87ee94a2259d212da4f30c1f0540d066dfa44723',
        pythLazerId: 48
    },
    {
        fullName: 'Jito',
        category: [
            'MEV'
        ],
        symbol: 'JTO-PERP',
        baseAssetSymbol: 'JTO',
        marketIndex: 20,
        oracle: new web3_js_1.PublicKey('Ffq6ACJ17NAgaxC6ocfMzVXL3K61qxB2xHg6WUawWPfP'),
        launchTs: 1701967240000,
        oracleSource: types_1.OracleSource.PYTH_PULL,
        pythFeedId: '0xb43660a5f790c69354b0729a5ef9d50d68f1df92107540210b9cccba1f947cc2',
        pythLazerId: 91
    },
    {
        fullName: 'SEI',
        category: [
            'L1'
        ],
        symbol: 'SEI-PERP',
        baseAssetSymbol: 'SEI',
        marketIndex: 21,
        oracle: new web3_js_1.PublicKey('EVyoxFo5jWpv1vV7p6KVjDWwVqtTqvrZ4JMFkieVkVsD'),
        launchTs: 1703173331000,
        oracleSource: types_1.OracleSource.PYTH_PULL,
        pythFeedId: '0x53614f1cb0c031d4af66c04cb9c756234adad0e1cee85303795091499a4084eb',
        pythLazerId: 51
    },
    {
        fullName: 'AVAX',
        category: [
            'Rollup',
            'Infra'
        ],
        symbol: 'AVAX-PERP',
        baseAssetSymbol: 'AVAX',
        marketIndex: 22,
        oracle: new web3_js_1.PublicKey('FgBGHNex4urrBmNbSj8ntNQDGqeHcWewKtkvL6JE6dEX'),
        launchTs: 1704209558000,
        oracleSource: types_1.OracleSource.PYTH_PULL,
        pythFeedId: '0x93da3352f9f1d105fdfe4971cfa80e9dd777bfc5d0f683ebb6e1294b92137bb7',
        pythLazerId: 18
    },
    {
        fullName: 'Wormhole',
        category: [
            'Bridge'
        ],
        symbol: 'W-PERP',
        baseAssetSymbol: 'W',
        marketIndex: 23,
        oracle: new web3_js_1.PublicKey('J9nrFWjDUeDVZ4BhhxsbQXWgLcLEgQyNBrCbwSADmJdr'),
        launchTs: 1709852537000,
        oracleSource: types_1.OracleSource.SWITCHBOARD_ON_DEMAND,
        pythFeedId: '0xeff7446475e218517566ea99e72a4abec2e1bd8498b43b7d8331e29dcb059389',
        pythLazerId: 102
    },
    {
        fullName: 'Kamino',
        category: [
            'Lending'
        ],
        symbol: 'KMNO-PERP',
        baseAssetSymbol: 'KMNO',
        marketIndex: 24,
        oracle: new web3_js_1.PublicKey('7aqj2wH1BH8XT3QQ3MWtvt3My7RAGf5Stm3vx5fiysJz'),
        launchTs: 1711475936000,
        oracleSource: types_1.OracleSource.PYTH_PULL,
        pythFeedId: '0xb17e5bc5de742a8a378b54c9c75442b7d51e30ada63f28d9bd28d3c0e26511a0'
    },
    {
        fullName: 'Wen',
        category: [
            'Solana',
            'Meme'
        ],
        symbol: '1KWEN-PERP',
        baseAssetSymbol: '1KWEN',
        marketIndex: 25,
        oracle: new web3_js_1.PublicKey('F47c7aJgYkfKXQ9gzrJaEpsNwUKHprysregTWXrtYLFp'),
        launchTs: 1720572064000,
        oracleSource: types_1.OracleSource.PYTH_1K_PULL,
        pythFeedId: '0x5169491cd7e2a44c98353b779d5eb612e4ac32e073f5cc534303d86307c2f1bc'
    },
    {
        fullName: 'TRUMP-WIN-2024',
        category: [
            'Prediction',
            'Election'
        ],
        symbol: 'TRUMP-WIN-2024-PREDICT',
        baseAssetSymbol: 'TRUMP-WIN-2024',
        marketIndex: 26,
        oracle: new web3_js_1.PublicKey('3TVuLmEGBRfVgrmFRtYTheczXaaoRBwcHw1yibZHSeNA'),
        launchTs: 1722214583000,
        oracleSource: types_1.OracleSource.Prelaunch
    },
    {
        fullName: 'KAMALA-POPULAR-VOTE-2024',
        category: [
            'Prediction',
            'Election'
        ],
        symbol: 'KAMALA-POPULAR-VOTE-2024-PREDICT',
        baseAssetSymbol: 'KAMALA-POPULAR-VOTE',
        marketIndex: 27,
        oracle: new web3_js_1.PublicKey('GU6CA7a2KCyhpfqZNb36UAfc9uzKBM8jHjGdt245QhYX'),
        launchTs: 1722214583000,
        oracleSource: types_1.OracleSource.Prelaunch
    },
    {
        fullName: 'RANDOM-2024',
        category: [
            'Prediction'
        ],
        symbol: 'RANDOM-2024-PREDICT',
        baseAssetSymbol: 'RANDOM-2024',
        marketIndex: 28,
        oracle: new web3_js_1.PublicKey('sDAQaZQJQ4RXAxH3x526mbEXyQZT15ktkL84d7hmk7M'),
        launchTs: 1729622442000,
        oracleSource: types_1.OracleSource.Prelaunch
    }
];
exports.MainnetPerpMarkets = [
    {
        fullName: 'Solana',
        category: [
            'L1',
            'Infra',
            'Solana'
        ],
        symbol: 'SOL-PERP',
        baseAssetSymbol: 'SOL',
        marketIndex: 0,
        oracle: new web3_js_1.PublicKey('3m6i4RFWEDw2Ft4tFHPJtYgmpPe21k56M3FHeWYrgGBz'),
        launchTs: 1667560505000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d',
        pythLazerId: 6
    },
    {
        fullName: 'Bitcoin',
        category: [
            'L1',
            'Payment'
        ],
        symbol: 'BTC-PERP',
        baseAssetSymbol: 'BTC',
        marketIndex: 1,
        oracle: new web3_js_1.PublicKey('35MbvS1Juz2wf7GsyHrkCw8yfKciRLxVpEhfZDZFrB4R'),
        launchTs: 1670347281000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
        pythLazerId: 1
    },
    {
        fullName: 'Ethereum',
        category: [
            'L1',
            'Infra'
        ],
        symbol: 'ETH-PERP',
        baseAssetSymbol: 'ETH',
        marketIndex: 2,
        oracle: new web3_js_1.PublicKey('93FG52TzNKCnMiasV14Ba34BYcHDb9p4zK4GjZnLwqWR'),
        launchTs: 1670347281000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
        pythLazerId: 2
    },
    {
        fullName: 'Aptos',
        category: [
            'L1',
            'Infra'
        ],
        symbol: 'APT-PERP',
        baseAssetSymbol: 'APT',
        marketIndex: 3,
        oracle: new web3_js_1.PublicKey('CXZhzKePYajrZgZyrzgvHYFKK3c5tNgDrRobAgySo8Nb'),
        launchTs: 1675802661000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x03ae4db29ed4ae33d323568895aa00337e658e348b37509f5372ae51f0af00d5',
        pythLazerId: 28
    },
    {
        fullName: 'Bonk',
        category: [
            'Meme',
            'Solana'
        ],
        symbol: '1MBONK-PERP',
        baseAssetSymbol: '1MBONK',
        marketIndex: 4,
        oracle: new web3_js_1.PublicKey('BERaNi6cpEresbq6HC1EQGaB1H1UjvEo4NGnmYSSJof4'),
        launchTs: 1677690149000,
        oracleSource: types_1.OracleSource.PYTH_LAZER_1M,
        pythFeedId: '0x72b021217ca3fe68922a19aaf990109cb9d84e9ad004b4d2025ad6f529314419',
        pythLazerId: 9
    },
    {
        fullName: 'Polygon',
        category: [
            'L2',
            'Infra'
        ],
        symbol: 'POL-PERP',
        baseAssetSymbol: 'POL',
        marketIndex: 5,
        oracle: new web3_js_1.PublicKey('HDveCibToLf157NtUqShCEWX3GcF4Aq8Ngt2bst1s1cc'),
        launchTs: 1677690149000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0xffd11c5a1cfd42f80afb2df4d9f264c15f956d68153335374ec10722edd70472',
        pythLazerId: 32
    },
    {
        fullName: 'Arbitrum',
        category: [
            'L2',
            'Infra'
        ],
        symbol: 'ARB-PERP',
        baseAssetSymbol: 'ARB',
        marketIndex: 6,
        oracle: new web3_js_1.PublicKey('5DYEjGpr28q3EsLKAnLXiDq6UeaFgDFZ5Gdwgp5RmPAp'),
        launchTs: 1679501812000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x3fa4252848f9f0a1480be62745a4629d9eb1322aebab8a791e344b3b9c1adcf5',
        pythLazerId: 37
    },
    {
        fullName: 'Doge',
        category: [
            'Meme',
            'Dog'
        ],
        symbol: 'DOGE-PERP',
        baseAssetSymbol: 'DOGE',
        marketIndex: 7,
        oracle: new web3_js_1.PublicKey('GqjDJZu9bNCebq5PTUbjRrgw1LK84GEexVjrfYJ76YXc'),
        launchTs: 1680808053000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0xdcef50dd0a4cd2dcc17e45df1676dcb336a11a61c69df7a0299b0150c672d25c',
        pythLazerId: 13
    },
    {
        fullName: 'Binance Coin',
        category: [
            'Exchange'
        ],
        symbol: 'BNB-PERP',
        baseAssetSymbol: 'BNB',
        marketIndex: 8,
        oracle: new web3_js_1.PublicKey('A9J2j1pRB2aPqAbjUTtKy94niSCTuPUrpimfzvpZHKG1'),
        launchTs: 1680808053000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x2f95862b045670cd22bee3114c39763a4a08beeb663b145d283c31d7d1101c4f',
        pythLazerId: 15
    },
    {
        fullName: 'Sui',
        category: [
            'L1'
        ],
        symbol: 'SUI-PERP',
        baseAssetSymbol: 'SUI',
        marketIndex: 9,
        oracle: new web3_js_1.PublicKey('HmeJeBKgceqvSBd5XBXZUYECLabnbS1SefLkeJKH8ERK'),
        launchTs: 1683125906000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x23d7315113f5b1d3ba7a83604c44b94d79f4fd69af77f804fc7f920a6dc65744',
        pythLazerId: 11
    },
    {
        fullName: 'Pepe',
        category: [
            'Meme'
        ],
        symbol: '1MPEPE-PERP',
        baseAssetSymbol: '1MPEPE',
        marketIndex: 10,
        oracle: new web3_js_1.PublicKey('Eo8x9Y1289GvsuYVwRS2R8HfiWRXxYofL1KYvHK2ZM2o'),
        launchTs: 1683781239000,
        oracleSource: types_1.OracleSource.PYTH_LAZER_1M,
        pythFeedId: '0xd69731a2e74ac1ce884fc3890f7ee324b6deb66147055249568869ed700882e4',
        pythLazerId: 4
    },
    {
        fullName: 'OP',
        category: [
            'L2',
            'Infra'
        ],
        symbol: 'OP-PERP',
        baseAssetSymbol: 'OP',
        marketIndex: 11,
        oracle: new web3_js_1.PublicKey('7GPbmQee2T4jMsJg99GuzWyMuzr8c2Uk7rAR9qvvQkzf'),
        launchTs: 1686091480000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x385f64d993f7b77d8182ed5003d97c60aa3361f3cecfe711544d2d59165e9bdf',
        pythLazerId: 41
    },
    {
        fullName: 'RENDER',
        category: [
            'Infra',
            'Solana'
        ],
        symbol: 'RENDER-PERP',
        baseAssetSymbol: 'RENDER',
        marketIndex: 12,
        oracle: new web3_js_1.PublicKey('97EqsAGbTnShB7oYWAFFCVVAx8PWXgDYDhcpm99izNQ4'),
        launchTs: 1687201081000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x3d4a2bd9535be6ce8059d75eadeba507b043257321aa544717c56fa19b49e35d',
        pythLazerId: 34
    },
    {
        fullName: 'XRP',
        category: [
            'Payments'
        ],
        symbol: 'XRP-PERP',
        baseAssetSymbol: 'XRP',
        marketIndex: 13,
        oracle: new web3_js_1.PublicKey('92VexDMsSzYvVq7eiEoodEzZxCLqYnfGKpVTqpkX12FY'),
        launchTs: 1689270550000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0xec5d399846a9209f3fe5881d70aae9268c94339ff9817e8d18ff19fa05eea1c8',
        pythLazerId: 14
    },
    {
        fullName: 'HNT',
        category: [
            'IoT',
            'Solana'
        ],
        symbol: 'HNT-PERP',
        baseAssetSymbol: 'HNT',
        marketIndex: 14,
        oracle: new web3_js_1.PublicKey('AEPgc6qUTCT8AwdckPcGbJXtcM9bj8mGYAyHE4BscJtm'),
        launchTs: 1692294955000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x649fdd7ec08e8e2a20f425729854e90293dcbe2376abc47197a14da6ff339756',
        pythLazerId: 168
    },
    {
        fullName: 'INJ',
        category: [
            'L1',
            'Exchange'
        ],
        symbol: 'INJ-PERP',
        baseAssetSymbol: 'INJ',
        marketIndex: 15,
        oracle: new web3_js_1.PublicKey('Ac442xcU276nb6gJFUCsNYAwAo6KWuw4xocxmG3nvDym'),
        launchTs: 1698074659000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x7a5bc1d2b56ad029048cd63964b3ad2776eadf812edc1a43a31406cb54bff592',
        pythLazerId: 46
    },
    {
        fullName: 'LINK',
        category: [
            'Oracle'
        ],
        symbol: 'LINK-PERP',
        baseAssetSymbol: 'LINK',
        marketIndex: 16,
        oracle: new web3_js_1.PublicKey('rwyPmfH5xsHdjPf6XsVxvyQEZogX2k4pmhaKEVvgseW'),
        launchTs: 1698074659000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x8ac0c70fff57e9aefdf5edf44b51d62c2d433653cbb2cf5cc06bb115af04d221',
        pythLazerId: 19
    },
    {
        fullName: 'Rollbit',
        category: [
            'Exchange'
        ],
        symbol: 'RLB-PERP',
        baseAssetSymbol: 'RLB',
        marketIndex: 17,
        oracle: new web3_js_1.PublicKey('4CyhPqyVK3UQHFWhEpk91Aw4WbBsN3JtyosXH6zjoRqG'),
        launchTs: 1699265968000,
        oracleSource: types_1.OracleSource.PYTH_PULL,
        pythFeedId: '0x2f2d17abbc1e781bd87b4a5d52c8b2856886f5c482fa3593cebf6795040ab0b6',
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'Pyth',
        category: [
            'Oracle',
            'Solana'
        ],
        symbol: 'PYTH-PERP',
        baseAssetSymbol: 'PYTH',
        marketIndex: 18,
        oracle: new web3_js_1.PublicKey('6Sfx8ZAt6xaEgMXTahR6GrT7oYB6nFBMoVyCmMyHmeJV'),
        launchTs: 1700542800000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x0bbf28e9a841a1cc788f6a361b17ca072d0ea3098a1e5df1c3922d06719579ff',
        pythLazerId: 3
    },
    {
        fullName: 'Celestia',
        category: [
            'Data'
        ],
        symbol: 'TIA-PERP',
        baseAssetSymbol: 'TIA',
        marketIndex: 19,
        oracle: new web3_js_1.PublicKey('2rDfWydvqvMQjDuf7vQsgfpa6dLMZehrWrpoXitn6gPx'),
        launchTs: 1701880540000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x09f7c1d7dfbb7df2b8fe3d3d87ee94a2259d212da4f30c1f0540d066dfa44723',
        pythLazerId: 48
    },
    {
        fullName: 'Jito',
        category: [
            'MEV',
            'Solana'
        ],
        symbol: 'JTO-PERP',
        baseAssetSymbol: 'JTO',
        marketIndex: 20,
        oracle: new web3_js_1.PublicKey('CGCz4mB8NsDddCq6BZToRUDUuktzsAfpKYh6ATgyyCGF'),
        launchTs: 1701967240000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0xb43660a5f790c69354b0729a5ef9d50d68f1df92107540210b9cccba1f947cc2',
        pythLazerId: 91
    },
    {
        fullName: 'SEI',
        category: [
            'L1'
        ],
        symbol: 'SEI-PERP',
        baseAssetSymbol: 'SEI',
        marketIndex: 21,
        oracle: new web3_js_1.PublicKey('Edk1TWipQtsaD8nnBXYQV1CEAiQb1GFtEAKeFZCi2A4C'),
        launchTs: 1703173331000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x53614f1cb0c031d4af66c04cb9c756234adad0e1cee85303795091499a4084eb',
        pythLazerId: 51
    },
    {
        fullName: 'AVAX',
        category: [
            'Rollup',
            'Infra'
        ],
        symbol: 'AVAX-PERP',
        baseAssetSymbol: 'AVAX',
        marketIndex: 22,
        oracle: new web3_js_1.PublicKey('5ASZLwk3GFCwZiDQ3XpmduRqNPEUGHXjELMX85u8McK3'),
        launchTs: 1704209558000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x93da3352f9f1d105fdfe4971cfa80e9dd777bfc5d0f683ebb6e1294b92137bb7',
        pythLazerId: 18
    },
    {
        fullName: 'WIF',
        category: [
            'Meme',
            'Dog',
            'Solana'
        ],
        symbol: 'WIF-PERP',
        baseAssetSymbol: 'WIF',
        marketIndex: 23,
        oracle: new web3_js_1.PublicKey('4QXWStoyEErTZFVsvKrvxuNa6QT8zpeA8jddZunSGvYE'),
        launchTs: 1706219971000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x4ca4beeca86f0d164160323817a4e42b10010a724c2217c6ee41b54cd4cc61fc',
        pythLazerId: 10
    },
    {
        fullName: 'JUP',
        category: [
            'Exchange',
            'Infra',
            'Solana'
        ],
        symbol: 'JUP-PERP',
        baseAssetSymbol: 'JUP',
        marketIndex: 24,
        oracle: new web3_js_1.PublicKey('DXqKSHyhTBKEW4qgnL7ycbf3Jca5hCvUgWHFYWsh4KJa'),
        launchTs: 1706713201000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x0a0408d619e9380abad35060f9192039ed5042fa6f82301d0e48bb52be830996',
        pythLazerId: 92
    },
    {
        fullName: 'Dymension',
        category: [
            'Rollup',
            'Infra'
        ],
        symbol: 'DYM-PERP',
        baseAssetSymbol: 'DYM',
        marketIndex: 25,
        oracle: new web3_js_1.PublicKey('HWDqaKbbNrEsgWPLMeKG39AguefMbHsWcvNSthToXG2t'),
        launchTs: 1708448765000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0xa9f3b2a89c6f85a6c20a9518abde39b944e839ca49a0c92307c65974d3f14a57',
        pythLazerId: 83,
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'BITTENSOR',
        category: [
            'AI',
            'Infra'
        ],
        symbol: 'TAO-PERP',
        baseAssetSymbol: 'TAO',
        marketIndex: 26,
        oracle: new web3_js_1.PublicKey('44fqbLqAkKK5kEj1FFvuEPYq56XoQQL3ABzCPrqsW3Cv'),
        launchTs: 1709136669000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x410f41de235f2db824e562ea7ab2d3d3d4ff048316c61d629c0b93f58584e1af',
        pythLazerId: 36
    },
    {
        fullName: 'Wormhole',
        category: [
            'Bridge'
        ],
        symbol: 'W-PERP',
        baseAssetSymbol: 'W',
        marketIndex: 27,
        oracle: new web3_js_1.PublicKey('CsFUXiA5dM4eCKjVBBy8tXhXzDkDRNoYjU5rjpHyfNEZ'),
        launchTs: 1710418343000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0xeff7446475e218517566ea99e72a4abec2e1bd8498b43b7d8331e29dcb059389',
        pythLazerId: 102
    },
    {
        fullName: 'Kamino',
        category: [
            'Lending',
            'Solana'
        ],
        symbol: 'KMNO-PERP',
        baseAssetSymbol: 'KMNO',
        marketIndex: 28,
        oracle: new web3_js_1.PublicKey('6ua3DK1sHoYyNi15dsxy6RYwUcZPDDXfyChzaRMaheQF'),
        launchTs: 1712240681000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0xb17e5bc5de742a8a378b54c9c75442b7d51e30ada63f28d9bd28d3c0e26511a0',
        pythLazerId: 464
    },
    {
        fullName: 'Tensor',
        category: [
            'NFT',
            'Solana'
        ],
        symbol: 'TNSR-PERP',
        baseAssetSymbol: 'TNSR',
        marketIndex: 29,
        oracle: new web3_js_1.PublicKey('EX6r1GdfsgcUsY6cQ6YsToV4RGsb4HKpjrkokK2DrmsS'),
        launchTs: 1712593532000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x05ecd4597cd48fe13d6cc3596c62af4f9675aee06e2e0b94c06d8bee2b659e05',
        pythLazerId: 99
    },
    {
        fullName: 'Drift',
        category: [
            'DEX',
            'Solana'
        ],
        symbol: 'DRIFT-PERP',
        baseAssetSymbol: 'DRIFT',
        marketIndex: 30,
        oracle: new web3_js_1.PublicKey('5VJou4ufN2vE11zyZUaLsKLTXhyzCTgiq6QDsts2YnnD'),
        launchTs: 1716595200000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x5c1690b27bb02446db17cdda13ccc2c1d609ad6d2ef5bf4983a85ea8b6f19d07',
        pythLazerId: 249
    },
    {
        fullName: 'Sanctum',
        category: [
            'LST',
            'Solana'
        ],
        symbol: 'CLOUD-PERP',
        baseAssetSymbol: 'CLOUD',
        marketIndex: 31,
        oracle: new web3_js_1.PublicKey('9Ennia27iT83kNAk3JtRKxSMzuCzsVtT4MzuxpE7anME'),
        launchTs: 1717597648000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x7358313661dcd4f842a1423aa4f7a05f009001c9113201c719621d3f1aa80a73',
        pythLazerId: 404
    },
    {
        fullName: 'IO',
        category: [
            'DePIN',
            'Solana'
        ],
        symbol: 'IO-PERP',
        baseAssetSymbol: 'IO',
        marketIndex: 32,
        oracle: new web3_js_1.PublicKey('8x84eFZVGD9C8vmQqnB9P8UDPMdDWduFaULspKUYGthP'),
        launchTs: 1718021389000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x82595d1509b770fa52681e260af4dda9752b87316d7c048535d8ead3fa856eb1',
        pythLazerId: 90,
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'ZEX',
        category: [
            'DEX',
            'Solana'
        ],
        symbol: 'ZEX-PERP',
        baseAssetSymbol: 'ZEX',
        marketIndex: 33,
        oracle: new web3_js_1.PublicKey('HVwBCaR4GEB1fHrp7xCTzbYoZXL3V8b1aek2swPrmGx3'),
        launchTs: 1719415157000,
        oracleSource: types_1.OracleSource.PYTH_PULL,
        pythFeedId: '0x3d63be09d1b88f6dffe6585d0170670592124fd9fa4e0fe8a09ff18464f05e3a',
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'POPCAT',
        category: [
            'Meme',
            'Solana'
        ],
        symbol: 'POPCAT-PERP',
        baseAssetSymbol: 'POPCAT',
        marketIndex: 34,
        oracle: new web3_js_1.PublicKey('C5fiAmQyjdfDR4EGepZqnEL3fJwMBav5yoAk6XyKMF6u'),
        launchTs: 1720013054000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0xb9312a7ee50e189ef045aa3c7842e099b061bd9bdc99ac645956c3b660dc8cce',
        pythLazerId: 130
    },
    {
        fullName: 'Wen',
        category: [
            'Solana',
            'Meme'
        ],
        symbol: '1KWEN-PERP',
        baseAssetSymbol: '1KWEN',
        marketIndex: 35,
        oracle: new web3_js_1.PublicKey('F47c7aJgYkfKXQ9gzrJaEpsNwUKHprysregTWXrtYLFp'),
        launchTs: 1720633344000,
        oracleSource: types_1.OracleSource.PYTH_1K_PULL,
        pythFeedId: '0x5169491cd7e2a44c98353b779d5eb612e4ac32e073f5cc534303d86307c2f1bc',
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'TRUMP-WIN-2024-BET',
        category: [
            'Prediction',
            'Election'
        ],
        symbol: 'TRUMP-WIN-2024-BET',
        baseAssetSymbol: 'TRUMP-WIN-2024',
        marketIndex: 36,
        oracle: new web3_js_1.PublicKey('7YrQUxmxGdbk8pvns9KcL5ojbZSL2eHj62hxRqggtEUR'),
        launchTs: 1723996800000,
        oracleSource: types_1.OracleSource.Prelaunch,
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'KAMALA-POPULAR-VOTE-2024-BET',
        category: [
            'Prediction',
            'Election'
        ],
        symbol: 'KAMALA-POPULAR-VOTE-2024-BET',
        baseAssetSymbol: 'KAMALA-POPULAR-VOTE-2024',
        marketIndex: 37,
        oracle: new web3_js_1.PublicKey('AowFw1dCVjS8kngvTCoT3oshiUyL69k7P1uxqXwteWH4'),
        launchTs: 1723996800000,
        oracleSource: types_1.OracleSource.Prelaunch,
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'FED-CUT-50-SEPT-2024-BET',
        category: [
            'Prediction',
            'Election'
        ],
        symbol: 'FED-CUT-50-SEPT-2024-BET',
        baseAssetSymbol: 'FED-CUT-50-SEPT-2024',
        marketIndex: 38,
        oracle: new web3_js_1.PublicKey('5QzgqAbEhJ1cPnLX4tSZEXezmW7sz7PPVVg2VanGi8QQ'),
        launchTs: 1724250126000,
        oracleSource: types_1.OracleSource.Prelaunch,
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'REPUBLICAN-POPULAR-AND-WIN-BET',
        category: [
            'Prediction',
            'Election'
        ],
        symbol: 'REPUBLICAN-POPULAR-AND-WIN-BET',
        baseAssetSymbol: 'REPUBLICAN-POPULAR-AND-WIN',
        marketIndex: 39,
        oracle: new web3_js_1.PublicKey('BtUUSUc9rZSzBmmKhQq4no65zHQTzMFeVYss7xcMRD53'),
        launchTs: 1724250126000,
        oracleSource: types_1.OracleSource.Prelaunch,
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'BREAKPOINT-IGGYERIC-BET',
        category: [
            'Prediction',
            'Solana'
        ],
        symbol: 'BREAKPOINT-IGGYERIC-BET',
        baseAssetSymbol: 'BREAKPOINT-IGGYERIC',
        marketIndex: 40,
        oracle: new web3_js_1.PublicKey('2ftYxoSupperd4ULxy9xyS2Az38wfAe7Lm8FCAPwjjVV'),
        launchTs: 1724250126000,
        oracleSource: types_1.OracleSource.Prelaunch,
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'DEMOCRATS-WIN-MICHIGAN-BET',
        category: [
            'Prediction',
            'Election'
        ],
        symbol: 'DEMOCRATS-WIN-MICHIGAN-BET',
        baseAssetSymbol: 'DEMOCRATS-WIN-MICHIGAN',
        marketIndex: 41,
        oracle: new web3_js_1.PublicKey('8HTDLjhb2esGU5mu11v3pq3eWeFqmvKPkQNCnTTwKAyB'),
        launchTs: 1725551484000,
        oracleSource: types_1.OracleSource.Prelaunch,
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'TON',
        category: [
            'L1'
        ],
        symbol: 'TON-PERP',
        baseAssetSymbol: 'TON',
        marketIndex: 42,
        oracle: new web3_js_1.PublicKey('Cbhiaky9kxDsviokcQaS9qc4HmpAzLaGjfmdSah1qakL'),
        launchTs: 1725551484000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x8963217838ab4cf5cadc172203c1f0b763fbaa45f346d8ee50ba994bbcac3026',
        pythLazerId: 12
    },
    {
        fullName: 'LANDO-F1-SGP-WIN-BET',
        category: [
            'Prediction',
            'Sports'
        ],
        symbol: 'LANDO-F1-SGP-WIN-BET',
        baseAssetSymbol: 'LANDO-F1-SGP-WIN',
        marketIndex: 43,
        oracle: new web3_js_1.PublicKey('DpJz7rjTJLxxnuqrqZTUjMWtnaMFAEfZUv5ATdb9HTh1'),
        launchTs: 1726646453000,
        oracleSource: types_1.OracleSource.Prelaunch,
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'MOTHER',
        category: [
            'Solana',
            'Meme'
        ],
        symbol: 'MOTHER-PERP',
        baseAssetSymbol: 'MOTHER',
        marketIndex: 44,
        oracle: new web3_js_1.PublicKey('469WQgfJ6AJ3eJ8FUcdhiZawf7yNChA3hseTSyhFatHZ'),
        launchTs: 1727291859000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x62742a997d01f7524f791fdb2dd43aaf0e567d765ebf8fd0406a994239e874d4',
        pythLazerId: 501,
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'MOODENG',
        category: [
            'Solana',
            'Meme'
        ],
        symbol: 'MOODENG-PERP',
        baseAssetSymbol: 'MOODENG',
        marketIndex: 45,
        oracle: new web3_js_1.PublicKey('CVy5m6JqhEdjbz11idgVeb2KnH5NpFowKnYPVMdfc7FC'),
        launchTs: 1727965864000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0xffff73128917a90950cd0473fd2551d7cd274fd5a6cc45641881bbcc6ee73417',
        pythLazerId: 500,
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'WARWICK-FIGHT-WIN-BET',
        category: [
            'Prediction',
            'Sport'
        ],
        symbol: 'WARWICK-FIGHT-WIN-BET',
        baseAssetSymbol: 'WARWICK-FIGHT-WIN',
        marketIndex: 46,
        oracle: new web3_js_1.PublicKey('Dz5Nvxo1hv7Zfyu11hy8e97twLMRKk6heTWCDGXytj7N'),
        launchTs: 1727965864000,
        oracleSource: types_1.OracleSource.Prelaunch,
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'DeBridge',
        category: [
            'Bridge'
        ],
        symbol: 'DBR-PERP',
        baseAssetSymbol: 'DBR',
        marketIndex: 47,
        oracle: new web3_js_1.PublicKey('53j4mz7cQV7mAZekKbV3n2L4bY7jY6eXdgaTkWDLYxq4'),
        launchTs: 1728574493000,
        oracleSource: types_1.OracleSource.PYTH_PULL,
        pythFeedId: '0xf788488fe2df341b10a498e0a789f03209c0938d9ed04bc521f8224748d6d236',
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'WLF-5B-1W',
        category: [
            'Prediction'
        ],
        symbol: 'WLF-5B-1W-BET',
        baseAssetSymbol: 'WLF-5B-1W',
        marketIndex: 48,
        oracle: new web3_js_1.PublicKey('7LpRfPaWR7cQqN7CMkCmZjEQpWyqso5LGuKCvDXH5ZAr'),
        launchTs: 1728574493000,
        oracleSource: types_1.OracleSource.Prelaunch,
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'VRSTPN-WIN-F1-24-DRVRS-CHMP',
        category: [
            'Prediction',
            'Sport'
        ],
        symbol: 'VRSTPN-WIN-F1-24-DRVRS-CHMP-BET',
        baseAssetSymbol: 'VRSTPN-WIN-F1-24-DRVRS-CHMP',
        marketIndex: 49,
        oracle: new web3_js_1.PublicKey('E36rvXEwysWeiToXCpWfHVADd8bzzyR4w83ZSSwxAxqG'),
        launchTs: 1729209600000,
        oracleSource: types_1.OracleSource.Prelaunch,
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'LNDO-WIN-F1-24-US-GP',
        category: [
            'Prediction',
            'Sport'
        ],
        symbol: 'LNDO-WIN-F1-24-US-GP-BET',
        baseAssetSymbol: 'LNDO-WIN-F1-24-US-GP',
        marketIndex: 50,
        oracle: new web3_js_1.PublicKey('6AVy1y9SnJECnosQaiK2uY1kcT4ZEBf1F4DMvhxgvhUo'),
        launchTs: 1729209600000,
        oracleSource: types_1.OracleSource.Prelaunch,
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: '1KMEW',
        category: [
            'Meme'
        ],
        symbol: '1KMEW-PERP',
        baseAssetSymbol: '1KMEW',
        marketIndex: 51,
        oracle: new web3_js_1.PublicKey('138RQdT1frDTnEp989V7gUWoQ5yg382ns4ihjvgJLcz7'),
        launchTs: 1729702915000,
        oracleSource: types_1.OracleSource.PYTH_LAZER_1K,
        pythFeedId: '0x514aed52ca5294177f20187ae883cec4a018619772ddce41efcc36a6448f5d5d',
        pythLazerId: 137,
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'MICHI',
        category: [
            'Meme'
        ],
        symbol: 'MICHI-PERP',
        baseAssetSymbol: 'MICHI',
        marketIndex: 52,
        oracle: new web3_js_1.PublicKey('GHzvsMDMSiuyZoWhEAuM27MKFdN2Y4fA4wSDuSd6dLMA'),
        launchTs: 1730402722000,
        oracleSource: types_1.OracleSource.PYTH_PULL,
        pythFeedId: '0x63a45218d6b13ffd28ca04748615511bf70eff80a3411c97d96b8ed74a6decab',
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'GOAT',
        category: [
            'Meme'
        ],
        symbol: 'GOAT-PERP',
        baseAssetSymbol: 'GOAT',
        marketIndex: 53,
        oracle: new web3_js_1.PublicKey('4uBrnNZyD2wUkpzytuyfiEYp2eWA3WdxXSbWEQbZzs45'),
        launchTs: 1731443152000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0xf7731dc812590214d3eb4343bfb13d1b4cfa9b1d4e020644b5d5d8e07d60c66c',
        pythLazerId: 437,
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'FWOG',
        category: [
            'Meme'
        ],
        symbol: 'FWOG-PERP',
        baseAssetSymbol: 'FWOG',
        marketIndex: 54,
        oracle: new web3_js_1.PublicKey('5Z7uvkAsHNN6qqkQkwcKcEPYZqiMbFE9E24p7SpvfSrv'),
        launchTs: 1731443152000,
        oracleSource: types_1.OracleSource.PYTH_PULL,
        pythFeedId: '0x656cc2a39dd795bdecb59de810d4f4d1e74c25fe4c42d0bf1c65a38d74df48e9',
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'PNUT',
        category: [
            'Meme'
        ],
        symbol: 'PNUT-PERP',
        baseAssetSymbol: 'PNUT',
        marketIndex: 55,
        oracle: new web3_js_1.PublicKey('Fbd2hz8Uz26gLm2Jrj7WSrhxusrh9VuSEWVpLBPJgMYX'),
        launchTs: 1731443152000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x116da895807f81f6b5c5f01b109376e7f6834dc8b51365ab7cdfa66634340e54',
        pythLazerId: 77,
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'RAY',
        category: [
            'DEX'
        ],
        symbol: 'RAY-PERP',
        baseAssetSymbol: 'RAY',
        marketIndex: 56,
        oracle: new web3_js_1.PublicKey('6VXU2P9BJkuPkfA7FJVonBtAo1c2pGnHoV9rxsdZKZyb'),
        launchTs: 1732721897000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x91568baa8beb53db23eb3fb7f22c6e8bd303d103919e19733f2bb642d3e7987a',
        pythLazerId: 54
    },
    {
        fullName: 'SUPERBOWL-LIX-LIONS',
        category: [
            'Prediction',
            'Sport'
        ],
        symbol: 'SUPERBOWL-LIX-LIONS-BET',
        baseAssetSymbol: 'SUPERBOWL-LIX-LIONS',
        marketIndex: 57,
        oracle: new web3_js_1.PublicKey('GfTeKKnBxeLSB1Hm24ArjduQM4yqaAgoGgiC99gq5E2P'),
        launchTs: 1732721897000,
        oracleSource: types_1.OracleSource.Prelaunch,
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'SUPERBOWL-LIX-CHIEFS',
        category: [
            'Prediction',
            'Sport'
        ],
        symbol: 'SUPERBOWL-LIX-CHIEFS-BET',
        baseAssetSymbol: 'SUPERBOWL-LIX-CHIEFS',
        marketIndex: 58,
        oracle: new web3_js_1.PublicKey('EdB17Nyu4bnEBiSEfFrwvp4VCUvtq9eDJHc6Ujys3Jwd'),
        launchTs: 1732721897000,
        oracleSource: types_1.OracleSource.Prelaunch,
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'Hyperliquid',
        category: [
            'DEX'
        ],
        symbol: 'HYPE-PERP',
        baseAssetSymbol: 'HYPE',
        marketIndex: 59,
        oracle: new web3_js_1.PublicKey('3ivZ5AnnUhocgmjiWjT8kDV87S6PpEL3CEHcd3vn2itM'),
        launchTs: 1733374800000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x4279e31cc369bbcc2faf022b382b080e32a8e689ff20fbc530d2a603eb6cd98b',
        pythLazerId: 110
    },
    {
        fullName: 'LiteCoin',
        category: [
            'Payment'
        ],
        symbol: 'LTC-PERP',
        baseAssetSymbol: 'LTC',
        marketIndex: 60,
        oracle: new web3_js_1.PublicKey('CrW8rga5bEZP1KBnqoQmPUcnYjrCPYQFbrMja99QKxsK'),
        launchTs: 1733374800000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x6e3f3fa8253588df9326580180233eb791e03b443a3ba7a1d892e73874e19a54',
        pythLazerId: 26
    },
    {
        fullName: 'Magic Eden',
        category: [
            'DEX'
        ],
        symbol: 'ME-PERP',
        baseAssetSymbol: 'ME',
        marketIndex: 61,
        oracle: new web3_js_1.PublicKey('BboTg1yT114FQkqT6MM3P3G3CcCktuM2RePgU8Gr3K4A'),
        launchTs: 1733839936000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x91519e3e48571e1232a85a938e714da19fe5ce05107f3eebb8a870b2e8020169',
        pythLazerId: 93
    },
    {
        fullName: 'PENGU',
        category: [
            'Meme'
        ],
        symbol: 'PENGU-PERP',
        baseAssetSymbol: 'PENGU',
        marketIndex: 62,
        oracle: new web3_js_1.PublicKey('4A3KroGPjZxPAeBNF287V3NyRwV2q8iBi1vX7kHxTCh7'),
        launchTs: 1734444000000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0xbed3097008b9b5e3c93bec20be79cb43986b85a996475589351a21e67bae9b61',
        pythLazerId: 97
    },
    {
        fullName: 'AI16Z',
        category: [
            'AI'
        ],
        symbol: 'AI16Z-PERP',
        baseAssetSymbol: 'AI16Z',
        marketIndex: 63,
        oracle: new web3_js_1.PublicKey('3BGheQVvYtBNpBKSUXSTjpyKQc3dh8iiwT91Aiq7KYCU'),
        launchTs: 1736384970000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x2551eca7784671173def2c41e6f3e51e11cd87494863f1d208fdd8c64a1f85ae',
        pythLazerId: 171,
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'TRUMP',
        category: [
            'Meme'
        ],
        symbol: 'TRUMP-PERP',
        baseAssetSymbol: 'TRUMP',
        marketIndex: 64,
        oracle: new web3_js_1.PublicKey('FPQjZYvHRGy51guJ77p7n9u9b8eo1ktKRc2D2g5Vysth'),
        launchTs: 1737219250000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x879551021853eec7a7dc827578e8e69da7e4fa8148339aa0d3d5296405be4b1a',
        pythLazerId: 203
    },
    {
        fullName: 'MELANIA',
        category: [
            'Meme'
        ],
        symbol: 'MELANIA-PERP',
        baseAssetSymbol: 'MELANIA',
        marketIndex: 65,
        oracle: new web3_js_1.PublicKey('3RgNWYYcZCKf5uZfriK8ASUbGQErhH6YbpdvZQ7ZKDCf'),
        launchTs: 1737360280000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x8fef7d52c7f4e3a6258d663f9d27e64a1b6fd95ab5f7d545dbf9a515353d0064',
        pythLazerId: 145,
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'BERA',
        category: [
            'L1',
            'EVM'
        ],
        symbol: 'BERA-PERP',
        baseAssetSymbol: 'BERA',
        marketIndex: 66,
        oracle: new web3_js_1.PublicKey('r8eNLQ8jysUyk9rrWXuicwAoKZ7V3YngAB6737zfxmv'),
        launchTs: 1738850177000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x962088abcfdbdb6e30db2e340c8cf887d9efb311b1f2f17b155a63dbb6d40265',
        pythLazerId: 308
    },
    {
        fullName: 'NBAFINALS25-OKC',
        category: [
            'Prediction',
            'Sport'
        ],
        symbol: 'NBAFINALS25-OKC-BET',
        baseAssetSymbol: 'NBAFINALS25-OKC',
        marketIndex: 67,
        oracle: new web3_js_1.PublicKey('HieNNSAy9tjtU2mLEcGtgCMViCeZ1881fX7tfezL7wdV'),
        launchTs: 1739463226000,
        oracleSource: types_1.OracleSource.Prelaunch,
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'NBAFINALS25-BOS',
        category: [
            'Prediction',
            'Sport'
        ],
        symbol: 'NBAFINALS25-BOS-BET',
        baseAssetSymbol: 'NBAFINALS25-BOS',
        marketIndex: 68,
        oracle: new web3_js_1.PublicKey('HorrnsG8RBMv7dhzbgPX4wqcWbUTV5NwV8r59UwTu4CJ'),
        launchTs: 1739463226000,
        oracleSource: types_1.OracleSource.Prelaunch,
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'KAITO',
        category: [
            'AI'
        ],
        symbol: 'KAITO-PERP',
        baseAssetSymbol: 'KAITO',
        marketIndex: 69,
        oracle: new web3_js_1.PublicKey('8M8mjNJ42k2Xi12Q1zRnQRC3xhggu3WGuftiu5VZZmsF'),
        launchTs: 1739545901000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x7302dee641a08507c297a7b0c8b3efa74a48a3baa6c040acab1e5209692b7e59',
        pythLazerId: 306
    },
    {
        fullName: 'Story Protocol',
        category: [
            'L1'
        ],
        symbol: 'IP-PERP',
        baseAssetSymbol: 'IP',
        marketIndex: 70,
        oracle: new web3_js_1.PublicKey('AZVVDFve8ijzLAm9z6W53GFsoWbcycFsdxCL7WUjMz8S'),
        launchTs: 1740150623000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0xb620ba83044577029da7e4ded7a2abccf8e6afc2a0d4d26d89ccdd39ec109025',
        pythLazerId: 309
    },
    {
        fullName: 'Fart Coin',
        category: [
            'Meme'
        ],
        symbol: 'FARTCOIN-PERP',
        baseAssetSymbol: 'FARTCOIN',
        marketIndex: 71,
        oracle: new web3_js_1.PublicKey('2sZomfWMDuQLcFak3nuharXorHrZ3hK8iaML6ZGSHtso'),
        launchTs: 1743086746000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythLazerId: 182
    },
    {
        fullName: 'Cardano',
        category: [
            'L1'
        ],
        symbol: 'ADA-PERP',
        baseAssetSymbol: 'ADA',
        marketIndex: 72,
        oracle: new web3_js_1.PublicKey('55722FS8VeAxRghz5h2ARJvNjkFiHyzkZ9BF7CEQWN6E'),
        launchTs: 1743708559000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythLazerId: 16
    },
    {
        fullName: 'Pax Gold',
        category: [
            'RWA'
        ],
        symbol: 'PAXG-PERP',
        baseAssetSymbol: 'PAXG',
        marketIndex: 73,
        oracle: new web3_js_1.PublicKey('8FauFNbX2gvjkPLH8w2kntXCcSGCwZL2prZjHBpvq6aE'),
        launchTs: 1744402932000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythLazerId: 163
    },
    {
        fullName: 'LAUNCHCOIN',
        category: [
            'Meme'
        ],
        symbol: 'LAUNCHCOIN-PERP',
        baseAssetSymbol: 'LAUNCHCOIN',
        marketIndex: 74,
        oracle: new web3_js_1.PublicKey('GAzR3C5cn7gGVvuqJB57wSYTPWP3n2Lw4mRJRxvTvqYy'),
        launchTs: 1747318237000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        marketStatus: types_1.MarketStatus.DELISTED
    },
    {
        fullName: 'PUMP',
        category: [
            'Launchpad'
        ],
        symbol: 'PUMP-PERP',
        baseAssetSymbol: 'PUMP',
        marketIndex: 75,
        oracle: new web3_js_1.PublicKey('5r8RWTaRiMgr9Lph3FTUE3sGb1vymhpCrm83Bovjfcps'),
        launchTs: 1747318237000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythLazerId: 1578
    },
    {
        fullName: 'ASTER',
        category: [
            'DEX'
        ],
        symbol: 'ASTER-PERP',
        baseAssetSymbol: 'ASTER',
        marketIndex: 76,
        oracle: new web3_js_1.PublicKey('E4tyjB3os4jVczLVQ258uxLdcwjuqmhcsPquVWgrpah4'),
        launchTs: 1758632629000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0xa903b5a82cb572397e3d47595d2889cf80513f5b4cf7a36b513ae10cc8b1e338',
        pythLazerId: 2310
    },
    {
        fullName: 'PLASMA',
        category: [
            'DEX'
        ],
        symbol: 'XPL-PERP',
        baseAssetSymbol: 'XPL',
        marketIndex: 77,
        oracle: new web3_js_1.PublicKey('6kgE1KJcxTux4tkPLE8LL8GRyW2cAsvyZsDFWqCrhHVe'),
        launchTs: 1758898862000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x9873512f5cb33c77ad7a5af098d74812c62111166be395fd0941c8cedb9b00d4',
        pythLazerId: 2312
    },
    {
        fullName: 'Double Zero',
        category: [
            'Infra'
        ],
        symbol: '2Z-PERP',
        baseAssetSymbol: '2Z',
        marketIndex: 78,
        oracle: new web3_js_1.PublicKey('4HTDpcHAwBTHCJLNMwT35w4FGc4nfA4YhT1BkcZQwQ2m'),
        launchTs: 1759412919000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0xf2b3ab1c49e35e881003c3c0482d18b181a1560b697b844c24c8f85aba1cab95',
        pythLazerId: 2316
    },
    {
        fullName: 'ZCash',
        category: [
            'Privacy'
        ],
        symbol: 'ZEC-PERP',
        baseAssetSymbol: 'ZEC',
        marketIndex: 79,
        oracle: new web3_js_1.PublicKey('BXunfRSyiQWJHv88qMvE42mpMpksWEC8Bf13p2msnRms'),
        launchTs: 1760366017000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0xbe9b59d178f0d6a97ab4c343bff2aa69caa1eaae3e9048a65788c529b125bb24',
        pythLazerId: 66
    },
    {
        fullName: 'Mantle',
        category: [
            'L1'
        ],
        symbol: 'MNT-PERP',
        baseAssetSymbol: 'MNT',
        marketIndex: 80,
        oracle: new web3_js_1.PublicKey('Gy7cJ4U1nxMA44XXC3hwqkpcxEB1mZTYiwJVkaqZfU7u'),
        launchTs: 1760366017000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x4e3037c822d852d79af3ac80e35eb420ee3b870dca49f9344a38ef4773fb0585',
        pythLazerId: 199
    },
    {
        fullName: '1KPUMP',
        category: [
            'Launchpad'
        ],
        symbol: '1KPUMP-PERP',
        baseAssetSymbol: '1KPUMP',
        marketIndex: 81,
        oracle: new web3_js_1.PublicKey('5r8RWTaRiMgr9Lph3FTUE3sGb1vymhpCrm83Bovjfcps'),
        launchTs: 1760366017000,
        oracleSource: types_1.OracleSource.PYTH_LAZER_1K,
        pythLazerId: 1578
    },
    {
        fullName: 'Meteroa',
        category: [
            'Solana',
            'DEX'
        ],
        symbol: 'MET-PERP',
        baseAssetSymbol: 'MET',
        marketIndex: 82,
        oracle: new web3_js_1.PublicKey('HN7qfUNM5Q7gQTwyEucmYdCF4CjwUrspj3DbNQ4V8P52'),
        launchTs: 1761225524000,
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythLazerId: 2382
    }
];
exports.PerpMarkets = {
    devnet: exports.DevnetPerpMarkets,
    'mainnet-beta': exports.MainnetPerpMarkets
};
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/spotMarkets.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SpotMarkets = exports.MainnetSpotMarkets = exports.DevnetSpotMarkets = exports.WRAPPED_SOL_MINT = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
exports.WRAPPED_SOL_MINT = new web3_js_1.PublicKey('So11111111111111111111111111111111111111112');
exports.DevnetSpotMarkets = [
    {
        symbol: 'USDC',
        marketIndex: 0,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('9VCioxmni2gDLv11qufWzT3RDERhQE4iY5Gf7NTfYyAV'),
        oracleSource: types_1.OracleSource.PYTH_LAZER_STABLE_COIN,
        mint: new web3_js_1.PublicKey('8zGuJQqwhZafTah7Uc7Z4tXRnguqkn5KLFAP8oV6PHe2'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        pythFeedId: '0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a',
        pythLazerId: 7
    },
    {
        symbol: 'SOL',
        marketIndex: 1,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('3m6i4RFWEDw2Ft4tFHPJtYgmpPe21k56M3FHeWYrgGBz'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey(exports.WRAPPED_SOL_MINT),
        precision: numericConstants_1.LAMPORTS_PRECISION,
        precisionExp: numericConstants_1.LAMPORTS_EXP,
        serumMarket: new web3_js_1.PublicKey('8N37SsnTu8RYxtjrV9SStjkkwVhmU8aCWhLvwduAPEKW'),
        phoenixMarket: new web3_js_1.PublicKey('78ehDnHgbkFxqXZwdFxa8HK7saX58GymeX2wNGdkqYLp'),
        pythFeedId: '0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d',
        pythLazerId: 6
    },
    {
        symbol: 'BTC',
        marketIndex: 2,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('486kr3pmFPfTsS4aZgcsQ7kS4i9rjMsYYZup6HQNSTT4'),
        oracleSource: types_1.OracleSource.PYTH_PULL,
        mint: new web3_js_1.PublicKey('3BZPwbcqB5kKScF3TEXxwNfx5ipV13kbRVDvfVp5c6fv'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        serumMarket: new web3_js_1.PublicKey('AGsmbVu3MS9u68GEYABWosQQCZwmLcBHu4pWEuBYH7Za'),
        pythFeedId: '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
        pythLazerId: 1
    },
    {
        symbol: 'PYUSD',
        marketIndex: 3,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('HpMoKp3TCd3QT4MWYUKk2zCBwmhr5Df45fB6wdxYqEeh'),
        oracleSource: types_1.OracleSource.PYTH_PULL,
        mint: new web3_js_1.PublicKey('GLfF72ZCUnS6N9iDJw8kedHzd6WFVf3VbpwdKKy76FRk'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        pythFeedId: '0xc1da1b73d7f01e7ddd54b3766cf7fcd644395ad14f70aa706ec5384c59e76692'
    },
    {
        symbol: 'Bonk',
        marketIndex: 4,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('GojbSnJuPdKDT1ZuHuAM5t9oz6bxTo1xhUKpTua2F72p'),
        oracleSource: types_1.OracleSource.PYTH_PULL,
        mint: new web3_js_1.PublicKey('7SekVZDmKCCDgTP8m6Hk4CfexFSru9RkwDCczmcwcsP6'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.FIVE),
        precisionExp: numericConstants_1.FIVE,
        pythFeedId: '0x72b021217ca3fe68922a19aaf990109cb9d84e9ad004b4d2025ad6f529314419',
        pythLazerId: 9
    },
    {
        symbol: 'JLP',
        marketIndex: 5,
        poolId: 1,
        oracle: new web3_js_1.PublicKey('5Mb11e5rt1Sp6A286B145E4TmgMzsM2UX9nCF2vas5bs'),
        oracleSource: types_1.OracleSource.PYTH_PULL,
        mint: new web3_js_1.PublicKey('HGe9FejFyhWSx6zdvx2RjynX7rmoEXFiJiLU437NXemZ'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        pythFeedId: '0xc811abc82b4bad1f9bd711a2773ccaa935b03ecef974236942cec5e0eb845a3a'
    },
    {
        symbol: 'USDC',
        marketIndex: 6,
        poolId: 1,
        oracle: new web3_js_1.PublicKey('En8hkHLkRe9d9DraYmBTrus518BvmVH448YcvmrFM6Ce'),
        oracleSource: types_1.OracleSource.PYTH_STABLE_COIN_PULL,
        mint: new web3_js_1.PublicKey('8zGuJQqwhZafTah7Uc7Z4tXRnguqkn5KLFAP8oV6PHe2'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        pythFeedId: '0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a',
        pythLazerId: 7
    },
    {
        symbol: 'GLXY',
        marketIndex: 7,
        poolId: 2,
        oracle: new web3_js_1.PublicKey('4wFrjUQHzRBc6qjVtMDbt28aEVgn6GaNiWR6vEff4KxR'),
        oracleSource: types_1.OracleSource.Prelaunch,
        mint: new web3_js_1.PublicKey('2vVfXmcWXEaFzp7iaTVnQ4y1gR41S6tJQQMo1S5asJyC'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        pythFeedId: '0x67e031d1723e5c89e4a826d80b2f3b41a91b05ef6122d523b8829a02e0f563aa'
    },
    {
        symbol: 'GLXY',
        marketIndex: 8,
        poolId: 2,
        oracle: new web3_js_1.PublicKey('4wFrjUQHzRBc6qjVtMDbt28aEVgn6GaNiWR6vEff4KxR'),
        oracleSource: types_1.OracleSource.Prelaunch,
        mint: new web3_js_1.PublicKey('2vVfXmcWXEaFzp7iaTVnQ4y1gR41S6tJQQMo1S5asJyC'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        pythFeedId: '0x67e031d1723e5c89e4a826d80b2f3b41a91b05ef6122d523b8829a02e0f563aa'
    }
];
exports.MainnetSpotMarkets = [
    {
        symbol: 'USDC',
        marketIndex: 0,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('9VCioxmni2gDLv11qufWzT3RDERhQE4iY5Gf7NTfYyAV'),
        oracleSource: types_1.OracleSource.PYTH_LAZER_STABLE_COIN,
        mint: new web3_js_1.PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
        precision: numericConstants_1.QUOTE_PRECISION,
        precisionExp: numericConstants_1.QUOTE_PRECISION_EXP,
        pythFeedId: '0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a',
        pythLazerId: 7
    },
    {
        symbol: 'SOL',
        marketIndex: 1,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('3m6i4RFWEDw2Ft4tFHPJtYgmpPe21k56M3FHeWYrgGBz'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey(exports.WRAPPED_SOL_MINT),
        precision: numericConstants_1.LAMPORTS_PRECISION,
        precisionExp: numericConstants_1.LAMPORTS_EXP,
        serumMarket: new web3_js_1.PublicKey('8BnEgHoWFysVcuFFX7QztDmzuH8r5ZFvyP3sYwn1XTh6'),
        phoenixMarket: new web3_js_1.PublicKey('4DoNfFBfF7UokCC2FQzriy7yHK6DY6NVdYpuekQ5pRgg'),
        openbookMarket: new web3_js_1.PublicKey('AFgkED1FUVfBe2trPUDqSqK9QKd4stJrfzq5q1RwAFTa'),
        pythFeedId: '0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d',
        pythLazerId: 6
    },
    {
        symbol: 'mSOL',
        marketIndex: 2,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('FY2JMi1vYz1uayVT2GJ96ysZgpagjhdPRG2upNPtSZsC'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.NINE),
        precisionExp: numericConstants_1.NINE,
        serumMarket: new web3_js_1.PublicKey('9Lyhks5bQQxb9EyyX55NtgKQzpM4WK7JCmeaWuQ5MoXD'),
        pythFeedId: '0xc2289a6a43d2ce91c6f55caec370f4acc38a2ed477f58813334c6d03749ff2a4',
        pythLazerId: 503
    },
    {
        symbol: 'wBTC',
        marketIndex: 3,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('fqPfDa6uQr9ndMvwaFp4mUBeUrHmLop8Jxfb1XJNmVm'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.EIGHT),
        precisionExp: numericConstants_1.EIGHT,
        serumMarket: new web3_js_1.PublicKey('3BAKsQd3RuhZKES2DGysMhjBdwjZYKYmxRqnSMtZ4KSN'),
        pythFeedId: '0xc9d8b075a5c69303365ae23633d4e085199bf5c520a3b90fed1322a0342ffc33',
        pythLazerId: 103
    },
    {
        symbol: 'wETH',
        marketIndex: 4,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('6bEp2MiyoiiiDxcVqE8rUHQWwHirXUXtKfAEATTVqNzT'),
        oracleSource: types_1.OracleSource.PYTH_PULL,
        mint: new web3_js_1.PublicKey('7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.EIGHT),
        precisionExp: numericConstants_1.EIGHT,
        serumMarket: new web3_js_1.PublicKey('BbJgE7HZMaDp5NTYvRh5jZSkQPVDTU8ubPFtpogUkEj4'),
        phoenixMarket: new web3_js_1.PublicKey('Ew3vFDdtdGrknJAVVfraxCA37uNJtimXYPY4QjnfhFHH'),
        openbookMarket: new web3_js_1.PublicKey('AT1R2jUNb9iTo4EaRfKSTPiNTX4Jb64KSwnVmig6Hu4t'),
        pythFeedId: '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace'
    },
    {
        symbol: 'USDT',
        marketIndex: 5,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('JDKJSkxjasBGL3ce1pkrN6tqDzuVUZPWzzkGuyX8m9yN'),
        oracleSource: types_1.OracleSource.PYTH_LAZER_STABLE_COIN,
        mint: new web3_js_1.PublicKey('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'),
        precision: numericConstants_1.QUOTE_PRECISION,
        precisionExp: numericConstants_1.QUOTE_PRECISION_EXP,
        serumMarket: new web3_js_1.PublicKey('B2na8Awyd7cpC59iEU43FagJAPLigr3AP3s38KM982bu'),
        pythFeedId: '0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b',
        pythLazerId: 8
    },
    {
        symbol: 'jitoSOL',
        marketIndex: 6,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('2cHCtAkMnttMh3bNKSCgSKSP5D4yN3p8bfnMdS3VZsDf'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.NINE),
        precisionExp: numericConstants_1.NINE,
        serumMarket: new web3_js_1.PublicKey('DkbVbMhFxswS32xnn1K2UY4aoBugXooBTxdzkWWDWRkH'),
        phoenixMarket: new web3_js_1.PublicKey('5LQLfGtqcC5rm2WuGxJf4tjqYmDjsQAbKo2AMLQ8KB7p'),
        pythFeedId: '0x67be9f519b95cf24338801051f9a808eff0a578ccb388db73b7f6fe1de019ffb',
        pythLazerId: 458
    },
    {
        symbol: 'PYTH',
        marketIndex: 7,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('6Sfx8ZAt6xaEgMXTahR6GrT7oYB6nFBMoVyCmMyHmeJV'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        serumMarket: new web3_js_1.PublicKey('4E17F3BxtNVqzVsirxguuqkpYLtFgCR6NfTpccPh82WE'),
        phoenixMarket: new web3_js_1.PublicKey('2sTMN9A1D1qeZLF95XQgJCUPiKe5DiV52jLfZGqMP46m'),
        pythFeedId: '0x0bbf28e9a841a1cc788f6a361b17ca072d0ea3098a1e5df1c3922d06719579ff',
        pythLazerId: 3
    },
    {
        symbol: 'bSOL',
        marketIndex: 8,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('BmDWPMsytWmYkh9n6o7m79eVshVYf2B5GVaqQ2EWKnGH'),
        oracleSource: types_1.OracleSource.PYTH_PULL,
        mint: new web3_js_1.PublicKey('bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.NINE),
        precisionExp: numericConstants_1.NINE,
        serumMarket: new web3_js_1.PublicKey('ARjaHVxGCQfTvvKjLd7U7srvk6orthZSE6uqWchCczZc'),
        pythFeedId: '0x89875379e70f8fbadc17aef315adf3a8d5d160b811435537e03c97e8aac97d9c'
    },
    {
        symbol: 'JTO',
        marketIndex: 9,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('CGCz4mB8NsDddCq6BZToRUDUuktzsAfpKYh6ATgyyCGF'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.NINE),
        precisionExp: numericConstants_1.NINE,
        serumMarket: new web3_js_1.PublicKey('H87FfmHABiZLRGrDsXRZtqq25YpARzaokCzL1vMYGiep'),
        phoenixMarket: new web3_js_1.PublicKey('BRLLmdtPGuuFn3BU6orYw4KHaohAEptBToi3dwRUnHQZ'),
        pythFeedId: '0xb43660a5f790c69354b0729a5ef9d50d68f1df92107540210b9cccba1f947cc2',
        pythLazerId: 91
    },
    {
        symbol: 'WIF',
        marketIndex: 10,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('4QXWStoyEErTZFVsvKrvxuNa6QT8zpeA8jddZunSGvYE'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        serumMarket: new web3_js_1.PublicKey('2BtDHBTCTUxvdur498ZEcMgimasaFrY5GzLv8wS8XgCb'),
        phoenixMarket: new web3_js_1.PublicKey('6ojSigXF7nDPyhFRgmn3V9ywhYseKF9J32ZrranMGVSX'),
        openbookMarket: new web3_js_1.PublicKey('CwGmEwYFo7u5D7vghGwtcCbRToWosytaZa3Ys3JAto6J'),
        pythFeedId: '0x4ca4beeca86f0d164160323817a4e42b10010a724c2217c6ee41b54cd4cc61fc',
        pythLazerId: 10
    },
    {
        symbol: 'JUP',
        marketIndex: 11,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('DXqKSHyhTBKEW4qgnL7ycbf3Jca5hCvUgWHFYWsh4KJa'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        phoenixMarket: new web3_js_1.PublicKey('2pspvjWWaf3dNgt3jsgSzFCNvMGPb7t8FrEYvLGjvcCe'),
        launchTs: 1706731200000,
        pythFeedId: '0x0a0408d619e9380abad35060f9192039ed5042fa6f82301d0e48bb52be830996',
        pythLazerId: 92
    },
    {
        symbol: 'RENDER',
        marketIndex: 12,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('97EqsAGbTnShB7oYWAFFCVVAx8PWXgDYDhcpm99izNQ4'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.EIGHT),
        precisionExp: numericConstants_1.EIGHT,
        serumMarket: new web3_js_1.PublicKey('2m7ZLEKtxWF29727DSb5D91erpXPUY1bqhRWRC3wQX7u'),
        launchTs: 1708964021000,
        pythFeedId: '0x3d4a2bd9535be6ce8059d75eadeba507b043257321aa544717c56fa19b49e35d',
        pythLazerId: 34
    },
    {
        symbol: 'W',
        marketIndex: 13,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('CsFUXiA5dM4eCKjVBBy8tXhXzDkDRNoYjU5rjpHyfNEZ'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        phoenixMarket: new web3_js_1.PublicKey('8dFTCTAbtGuHsdDL8WEPrTU6pXFDrU1QSjBTutw8fwZk'),
        launchTs: 1712149014000,
        pythFeedId: '0xeff7446475e218517566ea99e72a4abec2e1bd8498b43b7d8331e29dcb059389',
        pythLazerId: 102
    },
    {
        symbol: 'TNSR',
        marketIndex: 14,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('EX6r1GdfsgcUsY6cQ6YsToV4RGsb4HKpjrkokK2DrmsS'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('TNSRxcUxoT9xBG3de7PiJyTDYu7kskLqcpddxnEJAS6'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.NINE),
        precisionExp: numericConstants_1.NINE,
        phoenixMarket: new web3_js_1.PublicKey('AbJCZ9TAJiby5AY3cHcXS2gUdENC6mtsm6m7XpC2ZMvE'),
        launchTs: 1712593532000,
        pythFeedId: '0x05ecd4597cd48fe13d6cc3596c62af4f9675aee06e2e0b94c06d8bee2b659e05',
        pythLazerId: 99
    },
    {
        symbol: 'DRIFT',
        marketIndex: 15,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('5VJou4ufN2vE11zyZUaLsKLTXhyzCTgiq6QDsts2YnnD'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('DriFtupJYLTosbwoN8koMbEYSx54aFAVLddWsbksjwg7'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        phoenixMarket: new web3_js_1.PublicKey('8BV6rrWsUabnTDA3dE6A69oUDJAj3hMhtBHTJyXB7czp'),
        launchTs: 1715860800000,
        pythFeedId: '0x5c1690b27bb02446db17cdda13ccc2c1d609ad6d2ef5bf4983a85ea8b6f19d07',
        pythLazerId: 249
    },
    {
        symbol: 'INF',
        marketIndex: 16,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('B7RUYg2zF6UdUSHv2RmpnriPVJccYWojgFydNS1NY5F8'),
        oracleSource: types_1.OracleSource.PYTH_PULL,
        mint: new web3_js_1.PublicKey('5oVNBeEEQvYi1cX3ir8Dx5n1P7pdxydbGF2X4TxVusJm'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.NINE),
        precisionExp: numericConstants_1.NINE,
        launchTs: 1716595200000,
        pythFeedId: '0xf51570985c642c49c2d6e50156390fdba80bb6d5f7fa389d2f012ced4f7d208f'
    },
    {
        symbol: 'dSOL',
        marketIndex: 17,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('4YstsHafLyDbYFxmJbgoEr33iJJEp6rNPgLTQRgXDkG2'),
        oracleSource: types_1.OracleSource.PYTH_PULL,
        mint: new web3_js_1.PublicKey('Dso1bDeDjCQxTrWHqUUi63oBvV7Mdm6WaobLbQ7gnPQ'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.NINE),
        precisionExp: numericConstants_1.NINE,
        launchTs: 1716595200000,
        pythFeedId: '0x41f858bae36e7ee3f4a3a6d4f176f0893d4a261460a52763350d00f8648195ee'
    },
    {
        symbol: 'USDY',
        marketIndex: 18,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('9PgHM68FNGDK6nHb29ERDBcFrV6gNMD8LyUqwxbyyeb2'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('A1KLoBrKBde8Ty9qtNQUtq3C2ortoC3u7twggz7sEto6'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        launchTs: 1718811089000,
        pythFeedId: '0xe393449f6aff8a4b6d3e1165a7c9ebec103685f3b41e60db4277b5b6d10e7326',
        pythLazerId: 276
    },
    {
        symbol: 'JLP',
        marketIndex: 19,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('4VMtKepA6iFwMTJ7bBbdcGxavNRKiDjxxRr1CaB2NnFJ'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('27G8MtK7VtTcCHkpASjSDdkWWYfoqT6ggEuKidVJidD4'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        launchTs: 1719415157000,
        pythFeedId: '0xc811abc82b4bad1f9bd711a2773ccaa935b03ecef974236942cec5e0eb845a3a',
        pythLazerId: 459
    },
    {
        symbol: 'POPCAT',
        marketIndex: 20,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('C5fiAmQyjdfDR4EGepZqnEL3fJwMBav5yoAk6XyKMF6u'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.NINE),
        precisionExp: numericConstants_1.NINE,
        launchTs: 1720013054000,
        phoenixMarket: new web3_js_1.PublicKey('31XgvAQ1HgFQEk31KdszbPkVXKaQqB1bgYZPoDrFpSR2'),
        pythFeedId: '0xb9312a7ee50e189ef045aa3c7842e099b061bd9bdc99ac645956c3b660dc8cce',
        pythLazerId: 130
    },
    {
        symbol: 'CLOUD',
        marketIndex: 21,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('9Ennia27iT83kNAk3JtRKxSMzuCzsVtT4MzuxpE7anME'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        pythFeedId: '0x7358313661dcd4f842a1423aa4f7a05f009001c9113201c719621d3f1aa80a73',
        mint: new web3_js_1.PublicKey('CLoUDKc4Ane7HeQcPpE3YHnznRxhMimJ4MyaUqyHFzAu'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.NINE),
        precisionExp: numericConstants_1.NINE,
        launchTs: 1721316817000,
        pythLazerId: 404
    },
    {
        symbol: 'PYUSD',
        marketIndex: 22,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('5QZMnsyndmphvZF4BNgoMHwVZaREXeE2rpBoCPMxgCCd'),
        oracleSource: types_1.OracleSource.PYTH_LAZER_STABLE_COIN,
        mint: new web3_js_1.PublicKey('2b1kV6DkPAnxd5ixfnxCpjxmKwqjjaYmCZfHsFu24GXo'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        pythFeedId: '0xc1da1b73d7f01e7ddd54b3766cf7fcd644395ad14f70aa706ec5384c59e76692',
        pythLazerId: 156
    },
    {
        symbol: 'USDe',
        marketIndex: 23,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('5uR6oza6teuMRpjsbMi9fDhCDid2hoYdRBiLW7WzcK54'),
        oracleSource: types_1.OracleSource.PYTH_LAZER_STABLE_COIN,
        mint: new web3_js_1.PublicKey('DEkqHyPN7GMRJ5cArtQFAWefqbZb33Hyf6s5iCwjEonT'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.NINE),
        precisionExp: numericConstants_1.NINE,
        pythFeedId: '0x6ec879b1e9963de5ee97e9c8710b742d6228252a5e2ca12d4ae81d7fe5ee8c5d',
        pythLazerId: 204
    },
    {
        symbol: 'sUSDe',
        marketIndex: 24,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('CX7JCXtUTiC43ZA4uzoH7iQBD15jtVwdBNCnjKHt1BrQ'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('Eh6XEPhSwoLv5wFApukmnaVSHQ6sAnoD9BmgmwQoN2sN'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.NINE),
        precisionExp: numericConstants_1.NINE,
        pythFeedId: '0xca3ba9a619a4b3755c10ac7d5e760275aa95e9823d38a84fedd416856cdba37c',
        pythLazerId: 582
    },
    {
        symbol: 'BNSOL',
        marketIndex: 25,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('2LxMbHBHsw74aE3XgfthmUNkdDfUGcSEy3G3D3t642fd'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('BNso1VUJnh4zcfpZa6986Ea66P6TCp59hvtNJ8b1X85'),
        precision: numericConstants_1.LAMPORTS_PRECISION,
        precisionExp: numericConstants_1.LAMPORTS_EXP,
        pythFeedId: '0x55f8289be7450f1ae564dd9798e49e7d797d89adbc54fe4f8c906b1fcb94b0c3',
        pythLazerId: 384
    },
    {
        symbol: 'MOTHER',
        marketIndex: 26,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('469WQgfJ6AJ3eJ8FUcdhiZawf7yNChA3hseTSyhFatHZ'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('3S8qX1MsMqRbiwKg2cQyx7nis1oHMgaCuc9c4VfvVdPN'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        pythFeedId: '0x62742a997d01f7524f791fdb2dd43aaf0e567d765ebf8fd0406a994239e874d4',
        pythLazerId: 501
    },
    {
        symbol: 'cbBTC',
        marketIndex: 27,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('9jPy6EHpLkXaMdvfkoVnRnSdJoQysQDKKj3bW5Amz4Ci'),
        oracleSource: types_1.OracleSource.PYTH_PULL,
        mint: new web3_js_1.PublicKey('cbbtcf3aa214zXHbiAZQwf4122FBYbraNdFqgw4iMij'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.EIGHT),
        precisionExp: numericConstants_1.EIGHT,
        openbookMarket: new web3_js_1.PublicKey('2HXgKaXKsMUEzQaSBZiXSd54eMHaS3roiefyGWtkW97W'),
        pythFeedId: '0x2817d7bfe5c64b8ea956e9a26f573ef64e72e4d7891f2d6af9bcc93f7aff9a97'
    },
    {
        symbol: 'USDS',
        marketIndex: 28,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('5Km85n3s9Zs5wEoXYWuHbpoDzst4EBkS5f1XuQJGG1DL'),
        oracleSource: types_1.OracleSource.PYTH_LAZER_STABLE_COIN,
        mint: new web3_js_1.PublicKey('USDSwr9ApdHk5bvJKMjzff41FfuX8bSxdKcR81vTwcA'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        pythFeedId: '0x77f0971af11cc8bac224917275c1bf55f2319ed5c654a1ca955c82fa2d297ea1',
        pythLazerId: 611
    },
    {
        symbol: 'META',
        marketIndex: 29,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('DwYF1yveo8XTF1oqfsqykj332rjSxAd7bR6Gu6i4iUET'),
        oracleSource: types_1.OracleSource.SWITCHBOARD_ON_DEMAND,
        mint: new web3_js_1.PublicKey('METADDFL6wWMWEoKTFJwcThTbUmtarRJZjRpzUvkxhr'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.NINE),
        precisionExp: numericConstants_1.NINE
    },
    {
        symbol: 'ME',
        marketIndex: 30,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('BboTg1yT114FQkqT6MM3P3G3CcCktuM2RePgU8Gr3K4A'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('MEFNBXixkEbait3xn9bkm8WsJzXtVsaJEn4c8Sam21u'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        pythFeedId: '0x91519e3e48571e1232a85a938e714da19fe5ce05107f3eebb8a870b2e8020169',
        pythLazerId: 93
    },
    {
        symbol: 'PENGU',
        marketIndex: 31,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('4A3KroGPjZxPAeBNF287V3NyRwV2q8iBi1vX7kHxTCh7'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('2zMMhcVQEXDtdE6vsFS7S7D5oUodfJHE8vd1gnBouauv'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        pythFeedId: '0xbed3097008b9b5e3c93bec20be79cb43986b85a996475589351a21e67bae9b61',
        pythLazerId: 97
    },
    {
        symbol: 'BONK',
        marketIndex: 32,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('BERaNi6cpEresbq6HC1EQGaB1H1UjvEo4NGnmYSSJof4'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.FIVE),
        precisionExp: numericConstants_1.FIVE,
        pythFeedId: '0x72b021217ca3fe68922a19aaf990109cb9d84e9ad004b4d2025ad6f529314419',
        openbookMarket: new web3_js_1.PublicKey('D3gZwng2MgZGjktYcKpbR8Bz8653i4qCgzHCf5E4TcZb'),
        launchTs: 1734717937000,
        pythLazerId: 9
    },
    {
        symbol: 'JLP-1',
        marketIndex: 33,
        poolId: 1,
        oracle: new web3_js_1.PublicKey('3ZLn5XDgSLWhTk2NjqAU44cPkSeC5JAhW5o6w5Nz4p8R'),
        oracleSource: types_1.OracleSource.PYTH_PULL,
        mint: new web3_js_1.PublicKey('27G8MtK7VtTcCHkpASjSDdkWWYfoqT6ggEuKidVJidD4'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        pythFeedId: '0x6704952e00b6a088b6dcdb8170dcd591eaf64cff9e996ca75ae0ca55bfb96687',
        launchTs: 1735255852000
    },
    {
        symbol: 'USDC-1',
        marketIndex: 34,
        poolId: 1,
        oracle: new web3_js_1.PublicKey('9VCioxmni2gDLv11qufWzT3RDERhQE4iY5Gf7NTfYyAV'),
        oracleSource: types_1.OracleSource.PYTH_LAZER_STABLE_COIN,
        mint: new web3_js_1.PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        pythFeedId: '0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a',
        launchTs: 1735255852000,
        pythLazerId: 7
    },
    {
        symbol: 'AI16Z',
        marketIndex: 35,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('3BGheQVvYtBNpBKSUXSTjpyKQc3dh8iiwT91Aiq7KYCU'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.NINE),
        precisionExp: numericConstants_1.NINE,
        pythFeedId: '0x2551eca7784671173def2c41e6f3e51e11cd87494863f1d208fdd8c64a1f85ae',
        launchTs: 1736384970000,
        pythLazerId: 171
    },
    {
        symbol: 'TRUMP',
        marketIndex: 36,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('FPQjZYvHRGy51guJ77p7n9u9b8eo1ktKRc2D2g5Vysth'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        pythFeedId: '0x879551021853eec7a7dc827578e8e69da7e4fa8148339aa0d3d5296405be4b1a',
        launchTs: 1737219250000,
        pythLazerId: 203
    },
    {
        symbol: 'MELANIA',
        marketIndex: 37,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('3RgNWYYcZCKf5uZfriK8ASUbGQErhH6YbpdvZQ7ZKDCf'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('FUAfBo2jgks6gB4Z4LfZkqSZgzNucisEHqnNebaRxM1P'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        pythFeedId: '0x8fef7d52c7f4e3a6258d663f9d27e64a1b6fd95ab5f7d545dbf9a515353d0064',
        launchTs: 1737360280000,
        pythLazerId: 145
    },
    {
        symbol: 'AUSD',
        marketIndex: 38,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('9JYpqJfLXgrW8Wqzfd93GvJF73m2jJFjNqpQv3wQtehZ'),
        oracleSource: types_1.OracleSource.PYTH_LAZER_STABLE_COIN,
        mint: new web3_js_1.PublicKey('AUSD1jCcCyPLybk1YnvPWsHQSrZ46dxwoMniN4N2UEB9'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        pythFeedId: '0xd9912df360b5b7f21a122f15bdd5e27f62ce5e72bd316c291f7c86620e07fb2a',
        launchTs: 1738255943000,
        pythLazerId: 367
    },
    {
        symbol: 'FARTCOIN',
        marketIndex: 39,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('2sZomfWMDuQLcFak3nuharXorHrZ3hK8iaML6ZGSHtso'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        pythLazerId: 182,
        launchTs: 1743086746000
    },
    {
        symbol: 'JitoSOL-3',
        marketIndex: 40,
        poolId: 3,
        oracle: new web3_js_1.PublicKey('Fqv8vT5fdjvBbHd5k4B4ZvnXLH6bbdKP8cMv93ybCP8W'),
        oracleSource: types_1.OracleSource.SWITCHBOARD_ON_DEMAND,
        mint: new web3_js_1.PublicKey('J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.NINE),
        precisionExp: numericConstants_1.NINE,
        serumMarket: new web3_js_1.PublicKey('DkbVbMhFxswS32xnn1K2UY4aoBugXooBTxdzkWWDWRkH'),
        phoenixMarket: new web3_js_1.PublicKey('5LQLfGtqcC5rm2WuGxJf4tjqYmDjsQAbKo2AMLQ8KB7p'),
        pythFeedId: '0x67be9f519b95cf24338801051f9a808eff0a578ccb388db73b7f6fe1de019ffb'
    },
    {
        symbol: 'PT-fragSOL-10JUL25-3',
        marketIndex: 41,
        poolId: 3,
        oracle: new web3_js_1.PublicKey('CLjvwowzQ2L9PrmXA6zqbamxLVeDY9vE87aBxMZLJLoY'),
        oracleSource: types_1.OracleSource.SWITCHBOARD_ON_DEMAND,
        mint: new web3_js_1.PublicKey('8adRViFUNTe3yexj2gbQtx929zBJtWJRM8TeTzYbQBgx'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.NINE),
        precisionExp: numericConstants_1.NINE
    },
    {
        symbol: 'PT-kySOL-15JUN25-3',
        marketIndex: 42,
        poolId: 3,
        oracle: new web3_js_1.PublicKey('G4FdLzuezfaJxBd8eChuw1NU4Sq3n1rasGTwSh7dXegN'),
        oracleSource: types_1.OracleSource.SWITCHBOARD_ON_DEMAND,
        mint: new web3_js_1.PublicKey('FxT7bPGvkS5jKF2vgnJ16MciHqtsNqxbcWTfFg7L136h'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.NINE),
        precisionExp: numericConstants_1.NINE
    },
    {
        symbol: 'PT-dSOL-30JUN25-3',
        marketIndex: 43,
        poolId: 3,
        oracle: new web3_js_1.PublicKey('BR4NCRe2R8shvDAskUt6HE3n8Ej8HdMnVqshLz97BMm9'),
        oracleSource: types_1.OracleSource.SWITCHBOARD_ON_DEMAND,
        mint: new web3_js_1.PublicKey('8H3tZ7WcgYPKEQ7fCCAFQuaNqKdMH1EtBp2ovUPpRK3k'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.NINE),
        precisionExp: numericConstants_1.NINE
    },
    {
        symbol: 'JTO-3',
        marketIndex: 44,
        poolId: 3,
        oracle: new web3_js_1.PublicKey('DPvVSQYhZXQ2ygfT2Qjdg6iyeQVAyiz8okj88YRjy6NN'),
        oracleSource: types_1.OracleSource.SWITCHBOARD_ON_DEMAND,
        mint: new web3_js_1.PublicKey('jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.NINE),
        precisionExp: numericConstants_1.NINE
    },
    {
        symbol: 'zBTC',
        marketIndex: 45,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('3xcpvBUVV8ALVV4Wod733Vyic3fe8iJAeXDpRdk19Z3p'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('zBTCug3er3tLyffELcvDNrKkCymbPWysGcWihESYfLg'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.EIGHT),
        precisionExp: numericConstants_1.EIGHT,
        pythFeedId: '0x3d824c7f7c26ed1c85421ecec8c754e6b52d66a4e45de20a9c9ea91de8b396f9',
        launchTs: 1747155600000,
        pythLazerId: 640
    },
    {
        symbol: 'ZEUS',
        marketIndex: 46,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('8cH72H3vqYPArV9QvkYJkwzTdsdNPPgVPrusz9sMmgNN'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('ZEUS1aR7aX8DFFJf5QjWj2ftDDdNTroMNGo8YoQm3Gq'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        pythFeedId: '0x31558e9ccb18c151af6c52bf78afd03098a7aca1b9cf171a65b693b464c2f066',
        launchTs: 1747155600000,
        pythLazerId: 643
    },
    {
        symbol: 'USDC-4',
        marketIndex: 47,
        poolId: 4,
        oracle: new web3_js_1.PublicKey('9VCioxmni2gDLv11qufWzT3RDERhQE4iY5Gf7NTfYyAV'),
        oracleSource: types_1.OracleSource.PYTH_LAZER_STABLE_COIN,
        mint: new web3_js_1.PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
        precision: numericConstants_1.QUOTE_PRECISION,
        precisionExp: numericConstants_1.QUOTE_PRECISION_EXP,
        pythFeedId: '0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a',
        pythLazerId: 7,
        launchTs: 1747494165000
    },
    {
        symbol: 'USDT-4',
        marketIndex: 48,
        poolId: 4,
        oracle: new web3_js_1.PublicKey('JDKJSkxjasBGL3ce1pkrN6tqDzuVUZPWzzkGuyX8m9yN'),
        oracleSource: types_1.OracleSource.PYTH_LAZER_STABLE_COIN,
        mint: new web3_js_1.PublicKey('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'),
        precision: numericConstants_1.QUOTE_PRECISION,
        precisionExp: numericConstants_1.QUOTE_PRECISION_EXP,
        serumMarket: new web3_js_1.PublicKey('B2na8Awyd7cpC59iEU43FagJAPLigr3AP3s38KM982bu'),
        pythFeedId: '0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b',
        pythLazerId: 8
    },
    {
        symbol: 'SOL-2',
        marketIndex: 49,
        poolId: 2,
        oracle: new web3_js_1.PublicKey('3PiwrLLyiuWaxS7zJL5znGR9iYD3KWubZThdQzsCdg2e'),
        oracleSource: types_1.OracleSource.SWITCHBOARD_ON_DEMAND,
        mint: new web3_js_1.PublicKey(exports.WRAPPED_SOL_MINT),
        precision: numericConstants_1.LAMPORTS_PRECISION,
        precisionExp: numericConstants_1.LAMPORTS_EXP
    },
    {
        symbol: 'JitoSOL-2',
        marketIndex: 50,
        poolId: 2,
        oracle: new web3_js_1.PublicKey('Fqv8vT5fdjvBbHd5k4B4ZvnXLH6bbdKP8cMv93ybCP8W'),
        oracleSource: types_1.OracleSource.SWITCHBOARD_ON_DEMAND,
        mint: new web3_js_1.PublicKey('J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.NINE),
        precisionExp: numericConstants_1.NINE
    },
    {
        symbol: 'JTO-2',
        marketIndex: 51,
        poolId: 2,
        oracle: new web3_js_1.PublicKey('DPvVSQYhZXQ2ygfT2Qjdg6iyeQVAyiz8okj88YRjy6NN'),
        oracleSource: types_1.OracleSource.SWITCHBOARD_ON_DEMAND,
        mint: new web3_js_1.PublicKey('jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.NINE),
        precisionExp: numericConstants_1.NINE
    },
    {
        symbol: 'dfdvSOL',
        marketIndex: 52,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('EUQQD2fNN7h7su5TbWpUnf22zeGtF3RjEX2hgX2YPfLd'),
        oracleSource: types_1.OracleSource.SWITCHBOARD_ON_DEMAND,
        mint: new web3_js_1.PublicKey('sctmB7GPi5L2Q5G9tUSzXvhZ4YiDMEGcRov9KfArQpx'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.NINE),
        precisionExp: numericConstants_1.NINE
    },
    {
        symbol: 'sACRED',
        marketIndex: 53,
        poolId: 4,
        oracle: new web3_js_1.PublicKey('GheMfcCB49SuVCWrFReQDD2tLkcPDMG3qZEZWU44mHu'),
        oracleSource: types_1.OracleSource.SWITCHBOARD_ON_DEMAND,
        mint: new web3_js_1.PublicKey('59CwZq5b6drmDizgGfxECG7f16hxDpG1nXrxPoQx4y8g'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX
    },
    {
        symbol: 'EURC',
        marketIndex: 54,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('BkdSPLmw4W6twrJjAePw2bJAwDTBtxJ9t6LvNHfcBKg1'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('HzwqbKZw8HxMN6bF2yFZNrht3c2iXXzpKcFu7uBEDKtr'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        pythFeedId: '0x76fa85158bf14ede77087fe3ae472f66213f6ea2f5b411cb2de472794990fa5c',
        pythLazerId: 240
    },
    {
        symbol: 'PT-fragSOL-31OCT25-3',
        marketIndex: 55,
        poolId: 3,
        oracle: new web3_js_1.PublicKey('C41YpBLZfERAbV1p8DD48vDwbYhRQCbiryMx8Vp5sfo4'),
        oracleSource: types_1.OracleSource.SWITCHBOARD_ON_DEMAND,
        mint: new web3_js_1.PublicKey('Aby6y5DYtTrhQD8i7JXLs4H3jdUTwSXDraYqnwn5tKbt'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.NINE),
        precisionExp: numericConstants_1.NINE
    },
    {
        symbol: 'PUMP',
        marketIndex: 56,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('5r8RWTaRiMgr9Lph3FTUE3sGb1vymhpCrm83Bovjfcps'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        pythFeedId: '0x7a01fca212788bba7c5bf8c9efd576a8a722f070d2c17596ff7bb609b8d5c3b9',
        pythLazerId: 1578
    },
    {
        symbol: 'syrupUSDC',
        marketIndex: 57,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('GqqkoqHU5pqgTvL88xSCipH9txbPETyzvAvybQ3zRpzw'),
        oracleSource: types_1.OracleSource.PYTH_PULL,
        mint: new web3_js_1.PublicKey('AvZZF1YaZDziPY2RCK4oJrRVrbN3mTD9NL24hPeaZeUj'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        pythFeedId: '0x2ad31d1c4a85fbf2156ce57fab4104124c5ef76a6386375ecfc8da1ed5ce1486'
    },
    {
        symbol: 'LBTC',
        marketIndex: 58,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('Fa3VKWbdb9yQ89vA9JfYnR6micY9LwGneoQ1So9JgXHT'),
        oracleSource: types_1.OracleSource.PYTH_PULL,
        mint: new web3_js_1.PublicKey('LBTCgU4b3wsFKsPwBn1rRZDx5DoFutM6RPiEt1TPDsY'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.EIGHT),
        precisionExp: numericConstants_1.EIGHT,
        pythFeedId: '0x8f257aab6e7698bb92b15511915e593d6f8eae914452f781874754b03d0c612b',
        launchTs: 1756392947000
    },
    {
        symbol: '2Z',
        marketIndex: 59,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('4HTDpcHAwBTHCJLNMwT35w4FGc4nfA4YhT1BkcZQwQ2m'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('J6pQQ3FAcJQeWPPGppWRb4nM8jU3wLyYbRrLh7feMfvd'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.EIGHT),
        precisionExp: numericConstants_1.EIGHT,
        pythFeedId: '0xf2b3ab1c49e35e881003c3c0482d18b181a1560b697b844c24c8f85aba1cab95',
        pythLazerId: 2316,
        launchTs: 1759412919000
    },
    {
        symbol: 'MET',
        marketIndex: 60,
        poolId: 0,
        oracle: new web3_js_1.PublicKey('HN7qfUNM5Q7gQTwyEucmYdCF4CjwUrspj3DbNQ4V8P52'),
        oracleSource: types_1.OracleSource.PYTH_LAZER,
        mint: new web3_js_1.PublicKey('METvsvVRapdj9cFLzq4Tr43xK4tAjQfwX76z3n6mWQL'),
        precision: new anchor_1.BN(10).pow(numericConstants_1.SIX),
        precisionExp: numericConstants_1.SIX,
        pythFeedId: '0x0292e0f405bcd4a496d34e48307f6787349ad2bcd8505c3d3a9f77d81a67a682',
        pythLazerId: 2382,
        launchTs: 1761225524000
    }
];
exports.SpotMarkets = {
    devnet: exports.DevnetSpotMarkets,
    'mainnet-beta': exports.MainnetSpotMarkets
};
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/txConstants.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FUEL_RESET_LOG_ACCOUNT = exports.NOT_CONFIRMED_ERROR_CODE = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
exports.NOT_CONFIRMED_ERROR_CODE = -1001;
exports.FUEL_RESET_LOG_ACCOUNT = new web3_js_1.PublicKey('FuE1gqp2fzw2sDNLrbZqKsqpphJcoSW6HPaSJjGd4RZ4');
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/insuranceFund.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MAX_APR_PER_REVENUE_SETTLE_TO_INSURANCE_FUND_VAULT_GOV = void 0;
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
// follows program constant MAX_APR_PER_REVENUE_SETTLE_TO_INSURANCE_FUND_VAULT_GOV in math/constants.rs
/**
 * Max APR for DRIFT IF vault.
 */ exports.MAX_APR_PER_REVENUE_SETTLE_TO_INSURANCE_FUND_VAULT_GOV = numericConstants_1.PERCENTAGE_PRECISION.divn(22);
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/insuranceFund.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/perpMarkets.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/spotMarkets.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/txConstants.js [app-route] (ecmascript)"), exports);
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConstituentLpOperation = exports.ConstituentStatus = exports.OracleValidity = exports.SwapReduceOnly = exports.PlaceAndTakeOrderSuccessCondition = exports.FuelOverflowStatus = exports.ReferrerStatus = exports.DefaultOrderParams = exports.ModifyOrderPolicy = exports.OrderParamsBitFlag = exports.PostOnlyParams = exports.LiquidationType = exports.LPAction = exports.TradeSide = exports.getVariant = exports.isOneOfVariant = exports.isVariant = exports.SettlePnlMode = exports.StakeAction = exports.SpotFulfillmentConfigStatus = exports.SettlePnlExplanation = exports.DepositExplanation = exports.SpotFulfillmentStatus = exports.SpotFulfillmentType = exports.OrderTriggerCondition = exports.OrderActionExplanation = exports.OrderAction = exports.OrderBitFlag = exports.OrderStatus = exports.MarketType = exports.OrderType = exports.OracleSourceNum = exports.OracleSource = exports.DepositDirection = exports.PositionDirection = exports.SpotBalanceType = exports.SwapDirection = exports.TokenProgramFlag = exports.AssetTier = exports.ContractTier = exports.ContractType = exports.MarginMode = exports.UserStatus = exports.InsuranceFundOperation = exports.SpotOperation = exports.PerpOperation = exports.MarketStatus = exports.FeatureBitFlags = exports.ExchangeStatus = void 0;
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
// # Utility Types / Enums / Constants
var ExchangeStatus;
(function(ExchangeStatus) {
    ExchangeStatus[ExchangeStatus["ACTIVE"] = 0] = "ACTIVE";
    ExchangeStatus[ExchangeStatus["DEPOSIT_PAUSED"] = 1] = "DEPOSIT_PAUSED";
    ExchangeStatus[ExchangeStatus["WITHDRAW_PAUSED"] = 2] = "WITHDRAW_PAUSED";
    ExchangeStatus[ExchangeStatus["AMM_PAUSED"] = 4] = "AMM_PAUSED";
    ExchangeStatus[ExchangeStatus["FILL_PAUSED"] = 8] = "FILL_PAUSED";
    ExchangeStatus[ExchangeStatus["LIQ_PAUSED"] = 16] = "LIQ_PAUSED";
    ExchangeStatus[ExchangeStatus["FUNDING_PAUSED"] = 32] = "FUNDING_PAUSED";
    ExchangeStatus[ExchangeStatus["SETTLE_PNL_PAUSED"] = 64] = "SETTLE_PNL_PAUSED";
    ExchangeStatus[ExchangeStatus["AMM_IMMEDIATE_FILL_PAUSED"] = 128] = "AMM_IMMEDIATE_FILL_PAUSED";
    ExchangeStatus[ExchangeStatus["PAUSED"] = 255] = "PAUSED";
})(ExchangeStatus || (exports.ExchangeStatus = ExchangeStatus = {}));
var FeatureBitFlags;
(function(FeatureBitFlags) {
    FeatureBitFlags[FeatureBitFlags["MM_ORACLE_UPDATE"] = 1] = "MM_ORACLE_UPDATE";
    FeatureBitFlags[FeatureBitFlags["MEDIAN_TRIGGER_PRICE"] = 2] = "MEDIAN_TRIGGER_PRICE";
    FeatureBitFlags[FeatureBitFlags["BUILDER_CODES"] = 4] = "BUILDER_CODES";
    FeatureBitFlags[FeatureBitFlags["BUILDER_REFERRAL"] = 8] = "BUILDER_REFERRAL";
})(FeatureBitFlags || (exports.FeatureBitFlags = FeatureBitFlags = {}));
class MarketStatus {
}
exports.MarketStatus = MarketStatus;
MarketStatus.INITIALIZED = {
    initialized: {}
};
MarketStatus.ACTIVE = {
    active: {}
};
MarketStatus.FUNDING_PAUSED = {
    fundingPaused: {}
};
MarketStatus.AMM_PAUSED = {
    ammPaused: {}
};
MarketStatus.FILL_PAUSED = {
    fillPaused: {}
};
MarketStatus.WITHDRAW_PAUSED = {
    withdrawPaused: {}
};
MarketStatus.REDUCE_ONLY = {
    reduceOnly: {}
};
MarketStatus.SETTLEMENT = {
    settlement: {}
};
MarketStatus.DELISTED = {
    delisted: {}
};
var PerpOperation;
(function(PerpOperation) {
    PerpOperation[PerpOperation["UPDATE_FUNDING"] = 1] = "UPDATE_FUNDING";
    PerpOperation[PerpOperation["AMM_FILL"] = 2] = "AMM_FILL";
    PerpOperation[PerpOperation["FILL"] = 4] = "FILL";
    PerpOperation[PerpOperation["SETTLE_PNL"] = 8] = "SETTLE_PNL";
    PerpOperation[PerpOperation["SETTLE_PNL_WITH_POSITION"] = 16] = "SETTLE_PNL_WITH_POSITION";
    PerpOperation[PerpOperation["LIQUIDATION"] = 32] = "LIQUIDATION";
    PerpOperation[PerpOperation["SETTLE_REV_POOL"] = 64] = "SETTLE_REV_POOL";
})(PerpOperation || (exports.PerpOperation = PerpOperation = {}));
var SpotOperation;
(function(SpotOperation) {
    SpotOperation[SpotOperation["UPDATE_CUMULATIVE_INTEREST"] = 1] = "UPDATE_CUMULATIVE_INTEREST";
    SpotOperation[SpotOperation["FILL"] = 2] = "FILL";
    SpotOperation[SpotOperation["DEPOSIT"] = 4] = "DEPOSIT";
    SpotOperation[SpotOperation["WITHDRAW"] = 8] = "WITHDRAW";
    SpotOperation[SpotOperation["LIQUIDATION"] = 16] = "LIQUIDATION";
})(SpotOperation || (exports.SpotOperation = SpotOperation = {}));
var InsuranceFundOperation;
(function(InsuranceFundOperation) {
    InsuranceFundOperation[InsuranceFundOperation["INIT"] = 1] = "INIT";
    InsuranceFundOperation[InsuranceFundOperation["ADD"] = 2] = "ADD";
    InsuranceFundOperation[InsuranceFundOperation["REQUEST_REMOVE"] = 4] = "REQUEST_REMOVE";
    InsuranceFundOperation[InsuranceFundOperation["REMOVE"] = 8] = "REMOVE";
})(InsuranceFundOperation || (exports.InsuranceFundOperation = InsuranceFundOperation = {}));
var UserStatus;
(function(UserStatus) {
    UserStatus[UserStatus["BEING_LIQUIDATED"] = 1] = "BEING_LIQUIDATED";
    UserStatus[UserStatus["BANKRUPT"] = 2] = "BANKRUPT";
    UserStatus[UserStatus["REDUCE_ONLY"] = 4] = "REDUCE_ONLY";
    UserStatus[UserStatus["ADVANCED_LP"] = 8] = "ADVANCED_LP";
    UserStatus[UserStatus["PROTECTED_MAKER"] = 16] = "PROTECTED_MAKER";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
class MarginMode {
}
exports.MarginMode = MarginMode;
MarginMode.DEFAULT = {
    default: {}
};
MarginMode.HIGH_LEVERAGE = {
    highLeverage: {}
};
MarginMode.HIGH_LEVERAGE_MAINTENANCE = {
    highLeverageMaintenance: {}
};
class ContractType {
}
exports.ContractType = ContractType;
ContractType.PERPETUAL = {
    perpetual: {}
};
ContractType.FUTURE = {
    future: {}
};
ContractType.PREDICTION = {
    prediction: {}
};
class ContractTier {
}
exports.ContractTier = ContractTier;
ContractTier.A = {
    a: {}
};
ContractTier.B = {
    b: {}
};
ContractTier.C = {
    c: {}
};
ContractTier.SPECULATIVE = {
    speculative: {}
};
ContractTier.HIGHLY_SPECULATIVE = {
    highlySpeculative: {}
};
ContractTier.ISOLATED = {
    isolated: {}
};
class AssetTier {
}
exports.AssetTier = AssetTier;
AssetTier.COLLATERAL = {
    collateral: {}
};
AssetTier.PROTECTED = {
    protected: {}
};
AssetTier.CROSS = {
    cross: {}
};
AssetTier.ISOLATED = {
    isolated: {}
};
AssetTier.UNLISTED = {
    unlisted: {}
};
var TokenProgramFlag;
(function(TokenProgramFlag) {
    TokenProgramFlag[TokenProgramFlag["Token2022"] = 1] = "Token2022";
    TokenProgramFlag[TokenProgramFlag["TransferHook"] = 2] = "TransferHook";
})(TokenProgramFlag || (exports.TokenProgramFlag = TokenProgramFlag = {}));
class SwapDirection {
}
exports.SwapDirection = SwapDirection;
SwapDirection.ADD = {
    add: {}
};
SwapDirection.REMOVE = {
    remove: {}
};
class SpotBalanceType {
}
exports.SpotBalanceType = SpotBalanceType;
SpotBalanceType.DEPOSIT = {
    deposit: {}
};
SpotBalanceType.BORROW = {
    borrow: {}
};
class PositionDirection {
}
exports.PositionDirection = PositionDirection;
PositionDirection.LONG = {
    long: {}
};
PositionDirection.SHORT = {
    short: {}
};
class DepositDirection {
}
exports.DepositDirection = DepositDirection;
DepositDirection.DEPOSIT = {
    deposit: {}
};
DepositDirection.WITHDRAW = {
    withdraw: {}
};
class OracleSource {
}
exports.OracleSource = OracleSource;
OracleSource.PYTH = {
    pyth: {}
};
OracleSource.PYTH_1K = {
    pyth1K: {}
};
OracleSource.PYTH_1M = {
    pyth1M: {}
};
OracleSource.PYTH_PULL = {
    pythPull: {}
};
OracleSource.PYTH_1K_PULL = {
    pyth1KPull: {}
};
OracleSource.PYTH_1M_PULL = {
    pyth1MPull: {}
};
OracleSource.SWITCHBOARD = {
    switchboard: {}
};
OracleSource.QUOTE_ASSET = {
    quoteAsset: {}
};
OracleSource.PYTH_STABLE_COIN = {
    pythStableCoin: {}
};
OracleSource.PYTH_STABLE_COIN_PULL = {
    pythStableCoinPull: {}
};
OracleSource.Prelaunch = {
    prelaunch: {}
};
OracleSource.SWITCHBOARD_ON_DEMAND = {
    switchboardOnDemand: {}
};
OracleSource.PYTH_LAZER = {
    pythLazer: {}
};
OracleSource.PYTH_LAZER_1K = {
    pythLazer1K: {}
};
OracleSource.PYTH_LAZER_1M = {
    pythLazer1M: {}
};
OracleSource.PYTH_LAZER_STABLE_COIN = {
    pythLazerStableCoin: {}
};
class OracleSourceNum {
}
exports.OracleSourceNum = OracleSourceNum;
OracleSourceNum.PYTH = 0;
OracleSourceNum.PYTH_1K = 1;
OracleSourceNum.PYTH_1M = 2;
OracleSourceNum.PYTH_PULL = 3;
OracleSourceNum.PYTH_1K_PULL = 4;
OracleSourceNum.PYTH_1M_PULL = 5;
OracleSourceNum.SWITCHBOARD = 6;
OracleSourceNum.QUOTE_ASSET = 7;
OracleSourceNum.PYTH_STABLE_COIN = 8;
OracleSourceNum.PYTH_STABLE_COIN_PULL = 9;
OracleSourceNum.PRELAUNCH = 10;
OracleSourceNum.SWITCHBOARD_ON_DEMAND = 11;
OracleSourceNum.PYTH_LAZER = 12;
OracleSourceNum.PYTH_LAZER_1K = 13;
OracleSourceNum.PYTH_LAZER_1M = 14;
OracleSourceNum.PYTH_LAZER_STABLE_COIN = 15;
class OrderType {
}
exports.OrderType = OrderType;
OrderType.LIMIT = {
    limit: {}
};
OrderType.TRIGGER_MARKET = {
    triggerMarket: {}
};
OrderType.TRIGGER_LIMIT = {
    triggerLimit: {}
};
OrderType.MARKET = {
    market: {}
};
OrderType.ORACLE = {
    oracle: {}
};
class MarketType {
}
exports.MarketType = MarketType;
MarketType.SPOT = {
    spot: {}
};
MarketType.PERP = {
    perp: {}
};
class OrderStatus {
}
exports.OrderStatus = OrderStatus;
OrderStatus.INIT = {
    init: {}
};
OrderStatus.OPEN = {
    open: {}
};
OrderStatus.FILLED = {
    filled: {}
};
OrderStatus.CANCELED = {
    canceled: {}
};
class OrderBitFlag {
}
exports.OrderBitFlag = OrderBitFlag;
OrderBitFlag.SignedMessage = 1;
OrderBitFlag.OracleTriggerMarket = 2;
OrderBitFlag.SafeTriggerOrder = 4;
OrderBitFlag.NewTriggerReduceOnly = 8;
class OrderAction {
}
exports.OrderAction = OrderAction;
OrderAction.PLACE = {
    place: {}
};
OrderAction.CANCEL = {
    cancel: {}
};
OrderAction.EXPIRE = {
    expire: {}
};
OrderAction.FILL = {
    fill: {}
};
OrderAction.TRIGGER = {
    trigger: {}
};
class OrderActionExplanation {
}
exports.OrderActionExplanation = OrderActionExplanation;
OrderActionExplanation.NONE = {
    none: {}
};
OrderActionExplanation.INSUFFICIENT_FREE_COLLATERAL = {
    insufficientFreeCollateral: {}
};
OrderActionExplanation.ORACLE_PRICE_BREACHED_LIMIT_PRICE = {
    oraclePriceBreachedLimitPrice: {}
};
OrderActionExplanation.MARKET_ORDER_FILLED_TO_LIMIT_PRICE = {
    marketOrderFilledToLimitPrice: {}
};
OrderActionExplanation.ORDER_EXPIRED = {
    orderExpired: {}
};
OrderActionExplanation.LIQUIDATION = {
    liquidation: {}
};
OrderActionExplanation.ORDER_FILLED_WITH_AMM = {
    orderFilledWithAmm: {}
};
OrderActionExplanation.ORDER_FILLED_WITH_AMM_JIT = {
    orderFilledWithAmmJit: {}
};
OrderActionExplanation.ORDER_FILLED_WITH_AMM_JIT_LP_SPLIT = {
    orderFilledWithAmmJitLpSplit: {}
};
OrderActionExplanation.ORDER_FILLED_WITH_LP_JIT = {
    orderFilledWithLpJit: {}
};
OrderActionExplanation.ORDER_FILLED_WITH_MATCH = {
    orderFilledWithMatch: {}
};
OrderActionExplanation.ORDER_FILLED_WITH_MATCH_JIT = {
    orderFilledWithMatchJit: {}
};
OrderActionExplanation.MARKET_EXPIRED = {
    marketExpired: {}
};
OrderActionExplanation.RISK_INCREASING_ORDER = {
    riskingIncreasingOrder: {}
};
OrderActionExplanation.ORDER_FILLED_WITH_SERUM = {
    orderFillWithSerum: {}
};
OrderActionExplanation.ORDER_FILLED_WITH_OPENBOOK_V2 = {
    orderFilledWithOpenbookV2: {}
};
OrderActionExplanation.ORDER_FILLED_WITH_PHOENIX = {
    orderFillWithPhoenix: {}
};
OrderActionExplanation.REDUCE_ONLY_ORDER_INCREASED_POSITION = {
    reduceOnlyOrderIncreasedPosition: {}
};
OrderActionExplanation.DERISK_LP = {
    deriskLp: {}
};
OrderActionExplanation.TRANSFER_PERP_POSITION = {
    transferPerpPosition: {}
};
class OrderTriggerCondition {
}
exports.OrderTriggerCondition = OrderTriggerCondition;
OrderTriggerCondition.ABOVE = {
    above: {}
};
OrderTriggerCondition.BELOW = {
    below: {}
};
OrderTriggerCondition.TRIGGERED_ABOVE = {
    triggeredAbove: {}
}; // above condition has been triggered
OrderTriggerCondition.TRIGGERED_BELOW = {
    triggeredBelow: {}
}; // below condition has been triggered
class SpotFulfillmentType {
}
exports.SpotFulfillmentType = SpotFulfillmentType;
SpotFulfillmentType.EXTERNAL = {
    external: {}
};
SpotFulfillmentType.MATCH = {
    match: {}
};
class SpotFulfillmentStatus {
}
exports.SpotFulfillmentStatus = SpotFulfillmentStatus;
SpotFulfillmentStatus.ENABLED = {
    enabled: {}
};
SpotFulfillmentStatus.DISABLED = {
    disabled: {}
};
class DepositExplanation {
}
exports.DepositExplanation = DepositExplanation;
DepositExplanation.NONE = {
    none: {}
};
DepositExplanation.TRANSFER = {
    transfer: {}
};
DepositExplanation.BORROW = {
    borrow: {}
};
DepositExplanation.REPAY_BORROW = {
    repayBorrow: {}
};
DepositExplanation.REWARD = {
    reward: {}
};
class SettlePnlExplanation {
}
exports.SettlePnlExplanation = SettlePnlExplanation;
SettlePnlExplanation.NONE = {
    none: {}
};
SettlePnlExplanation.EXPIRED_POSITION = {
    expiredPosition: {}
};
class SpotFulfillmentConfigStatus {
}
exports.SpotFulfillmentConfigStatus = SpotFulfillmentConfigStatus;
SpotFulfillmentConfigStatus.ENABLED = {
    enabled: {}
};
SpotFulfillmentConfigStatus.DISABLED = {
    disabled: {}
};
class StakeAction {
}
exports.StakeAction = StakeAction;
StakeAction.STAKE = {
    stake: {}
};
StakeAction.UNSTAKE_REQUEST = {
    unstakeRequest: {}
};
StakeAction.UNSTAKE_CANCEL_REQUEST = {
    unstakeCancelRequest: {}
};
StakeAction.UNSTAKE = {
    unstake: {}
};
StakeAction.UNSTAKE_TRANSFER = {
    unstakeTransfer: {}
};
StakeAction.STAKE_TRANSFER = {
    stakeTransfer: {}
};
class SettlePnlMode {
}
exports.SettlePnlMode = SettlePnlMode;
SettlePnlMode.TRY_SETTLE = {
    trySettle: {}
};
SettlePnlMode.MUST_SETTLE = {
    mustSettle: {}
};
function isVariant(object, type) {
    return object.hasOwnProperty(type);
}
exports.isVariant = isVariant;
function isOneOfVariant(object, types) {
    return types.reduce((result, type)=>{
        return result || object.hasOwnProperty(type);
    }, false);
}
exports.isOneOfVariant = isOneOfVariant;
function getVariant(object) {
    return Object.keys(object)[0];
}
exports.getVariant = getVariant;
var TradeSide;
(function(TradeSide) {
    TradeSide[TradeSide["None"] = 0] = "None";
    TradeSide[TradeSide["Buy"] = 1] = "Buy";
    TradeSide[TradeSide["Sell"] = 2] = "Sell";
})(TradeSide || (exports.TradeSide = TradeSide = {}));
class LPAction {
}
exports.LPAction = LPAction;
LPAction.ADD_LIQUIDITY = {
    addLiquidity: {}
};
LPAction.REMOVE_LIQUIDITY = {
    removeLiquidity: {}
};
LPAction.SETTLE_LIQUIDITY = {
    settleLiquidity: {}
};
LPAction.REMOVE_LIQUIDITY_DERISK = {
    removeLiquidityDerisk: {}
};
class LiquidationType {
}
exports.LiquidationType = LiquidationType;
LiquidationType.LIQUIDATE_PERP = {
    liquidatePerp: {}
};
LiquidationType.LIQUIDATE_BORROW_FOR_PERP_PNL = {
    liquidateBorrowForPerpPnl: {}
};
LiquidationType.LIQUIDATE_PERP_PNL_FOR_DEPOSIT = {
    liquidatePerpPnlForDeposit: {}
};
LiquidationType.PERP_BANKRUPTCY = {
    perpBankruptcy: {}
};
LiquidationType.SPOT_BANKRUPTCY = {
    spotBankruptcy: {}
};
LiquidationType.LIQUIDATE_SPOT = {
    liquidateSpot: {}
};
class PostOnlyParams {
}
exports.PostOnlyParams = PostOnlyParams;
PostOnlyParams.NONE = {
    none: {}
};
PostOnlyParams.MUST_POST_ONLY = {
    mustPostOnly: {}
}; // Tx fails if order can't be post only
PostOnlyParams.TRY_POST_ONLY = {
    tryPostOnly: {}
}; // Tx succeeds and order not placed if can't be post only
PostOnlyParams.SLIDE = {
    slide: {}
}; // Modify price to be post only if can't be post only
class OrderParamsBitFlag {
}
exports.OrderParamsBitFlag = OrderParamsBitFlag;
OrderParamsBitFlag.ImmediateOrCancel = 1;
OrderParamsBitFlag.UpdateHighLeverageMode = 2;
var ModifyOrderPolicy;
(function(ModifyOrderPolicy) {
    ModifyOrderPolicy[ModifyOrderPolicy["MustModify"] = 1] = "MustModify";
    ModifyOrderPolicy[ModifyOrderPolicy["ExcludePreviousFill"] = 2] = "ExcludePreviousFill";
})(ModifyOrderPolicy || (exports.ModifyOrderPolicy = ModifyOrderPolicy = {}));
exports.DefaultOrderParams = {
    orderType: OrderType.MARKET,
    marketType: MarketType.PERP,
    userOrderId: 0,
    direction: PositionDirection.LONG,
    baseAssetAmount: numericConstants_1.ZERO,
    price: numericConstants_1.ZERO,
    marketIndex: 0,
    reduceOnly: false,
    postOnly: PostOnlyParams.NONE,
    bitFlags: 0,
    triggerPrice: null,
    triggerCondition: OrderTriggerCondition.ABOVE,
    oraclePriceOffset: null,
    auctionDuration: null,
    maxTs: null,
    auctionStartPrice: null,
    auctionEndPrice: null
};
var ReferrerStatus;
(function(ReferrerStatus) {
    ReferrerStatus[ReferrerStatus["IsReferrer"] = 1] = "IsReferrer";
    ReferrerStatus[ReferrerStatus["IsReferred"] = 2] = "IsReferred";
})(ReferrerStatus || (exports.ReferrerStatus = ReferrerStatus = {}));
var FuelOverflowStatus;
(function(FuelOverflowStatus) {
    FuelOverflowStatus[FuelOverflowStatus["Exists"] = 1] = "Exists";
})(FuelOverflowStatus || (exports.FuelOverflowStatus = FuelOverflowStatus = {}));
var PlaceAndTakeOrderSuccessCondition;
(function(PlaceAndTakeOrderSuccessCondition) {
    PlaceAndTakeOrderSuccessCondition[PlaceAndTakeOrderSuccessCondition["PartialFill"] = 1] = "PartialFill";
    PlaceAndTakeOrderSuccessCondition[PlaceAndTakeOrderSuccessCondition["FullFill"] = 2] = "FullFill";
})(PlaceAndTakeOrderSuccessCondition || (exports.PlaceAndTakeOrderSuccessCondition = PlaceAndTakeOrderSuccessCondition = {}));
class SwapReduceOnly {
}
exports.SwapReduceOnly = SwapReduceOnly;
SwapReduceOnly.In = {
    in: {}
};
SwapReduceOnly.Out = {
    out: {}
};
var OracleValidity;
(function(OracleValidity) {
    OracleValidity[OracleValidity["NonPositive"] = 0] = "NonPositive";
    OracleValidity[OracleValidity["TooVolatile"] = 1] = "TooVolatile";
    OracleValidity[OracleValidity["TooUncertain"] = 2] = "TooUncertain";
    OracleValidity[OracleValidity["StaleForMargin"] = 3] = "StaleForMargin";
    OracleValidity[OracleValidity["InsufficientDataPoints"] = 4] = "InsufficientDataPoints";
    OracleValidity[OracleValidity["StaleForAMMLowRisk"] = 5] = "StaleForAMMLowRisk";
    OracleValidity[OracleValidity["isStaleForAmmImmediate"] = 6] = "isStaleForAmmImmediate";
    OracleValidity[OracleValidity["Valid"] = 7] = "Valid";
})(OracleValidity || (exports.OracleValidity = OracleValidity = {}));
var ConstituentStatus;
(function(ConstituentStatus) {
    ConstituentStatus[ConstituentStatus["ACTIVE"] = 0] = "ACTIVE";
    ConstituentStatus[ConstituentStatus["REDUCE_ONLY"] = 1] = "REDUCE_ONLY";
    ConstituentStatus[ConstituentStatus["DECOMMISSIONED"] = 2] = "DECOMMISSIONED";
})(ConstituentStatus || (exports.ConstituentStatus = ConstituentStatus = {}));
var ConstituentLpOperation;
(function(ConstituentLpOperation) {
    ConstituentLpOperation[ConstituentLpOperation["Swap"] = 1] = "Swap";
    ConstituentLpOperation[ConstituentLpOperation["Deposit"] = 2] = "Deposit";
    ConstituentLpOperation[ConstituentLpOperation["Withdraw"] = 4] = "Withdraw";
})(ConstituentLpOperation || (exports.ConstituentLpOperation = ConstituentLpOperation = {}));
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/oracleId.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPublicKeyAndSourceFromOracleId = exports.getOracleId = exports.getOracleSourceFromNum = exports.getOracleSourceNum = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
function getOracleSourceNum(source) {
    if ('pyth' in source) return types_1.OracleSourceNum.PYTH;
    if ('pyth1K' in source) return types_1.OracleSourceNum.PYTH_1K;
    if ('pyth1M' in source) return types_1.OracleSourceNum.PYTH_1M;
    if ('pythPull' in source) return types_1.OracleSourceNum.PYTH_PULL;
    if ('pyth1KPull' in source) return types_1.OracleSourceNum.PYTH_1K_PULL;
    if ('pyth1MPull' in source) return types_1.OracleSourceNum.PYTH_1M_PULL;
    if ('switchboard' in source) return types_1.OracleSourceNum.SWITCHBOARD;
    if ('quoteAsset' in source) return types_1.OracleSourceNum.QUOTE_ASSET;
    if ('pythStableCoin' in source) return types_1.OracleSourceNum.PYTH_STABLE_COIN;
    if ('pythStableCoinPull' in source) return types_1.OracleSourceNum.PYTH_STABLE_COIN_PULL;
    if ('prelaunch' in source) return types_1.OracleSourceNum.PRELAUNCH;
    if ('switchboardOnDemand' in source) return types_1.OracleSourceNum.SWITCHBOARD_ON_DEMAND;
    if ('pythLazer' in source) return types_1.OracleSourceNum.PYTH_LAZER;
    if ('pythLazer1K' in source) return types_1.OracleSourceNum.PYTH_LAZER_1K;
    if ('pythLazer1M' in source) return types_1.OracleSourceNum.PYTH_LAZER_1M;
    if ('pythLazerStableCoin' in source) return types_1.OracleSourceNum.PYTH_LAZER_STABLE_COIN;
    throw new Error('Invalid oracle source');
}
exports.getOracleSourceNum = getOracleSourceNum;
function getOracleSourceFromNum(sourceNum) {
    if (sourceNum === types_1.OracleSourceNum.PYTH) return 'pyth';
    if (sourceNum === types_1.OracleSourceNum.PYTH_1K) return 'pyth1K';
    if (sourceNum === types_1.OracleSourceNum.PYTH_1M) return 'pyth1M';
    if (sourceNum === types_1.OracleSourceNum.PYTH_PULL) return 'pythPull';
    if (sourceNum === types_1.OracleSourceNum.PYTH_1K_PULL) return 'pyth1KPull';
    if (sourceNum === types_1.OracleSourceNum.PYTH_1M_PULL) return 'pyth1MPull';
    if (sourceNum === types_1.OracleSourceNum.SWITCHBOARD) return 'switchboard';
    if (sourceNum === types_1.OracleSourceNum.QUOTE_ASSET) return 'quoteAsset';
    if (sourceNum === types_1.OracleSourceNum.PYTH_STABLE_COIN) return 'pythStableCoin';
    if (sourceNum === types_1.OracleSourceNum.PYTH_STABLE_COIN_PULL) return 'pythStableCoinPull';
    if (sourceNum === types_1.OracleSourceNum.PRELAUNCH) return 'prelaunch';
    if (sourceNum === types_1.OracleSourceNum.SWITCHBOARD_ON_DEMAND) return 'switchboardOnDemand';
    if (sourceNum === types_1.OracleSourceNum.PYTH_LAZER) return 'pythLazer';
    if (sourceNum === types_1.OracleSourceNum.PYTH_LAZER_1K) return 'pythLazer1K';
    if (sourceNum === types_1.OracleSourceNum.PYTH_LAZER_1M) return 'pythLazer1M';
    if (sourceNum === types_1.OracleSourceNum.PYTH_LAZER_STABLE_COIN) return 'pythLazerStableCoin';
    throw new Error('Invalid oracle source');
}
exports.getOracleSourceFromNum = getOracleSourceFromNum;
function getOracleId(publicKey, source) {
    return `${publicKey.toBase58()}-${getOracleSourceNum(source)}`;
}
exports.getOracleId = getOracleId;
function getPublicKeyAndSourceFromOracleId(oracleId) {
    const [publicKey, source] = oracleId.split('-');
    return {
        publicKey: new web3_js_1.PublicKey(publicKey),
        source: getOracleSourceFromNum(parseInt(source))
    };
}
exports.getPublicKeyAndSourceFromOracleId = getPublicKeyAndSourceFromOracleId;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/types.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/pythClient.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PythClient = void 0;
const client_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@pythnetwork+client@2.5.3_typescript@5.9.3/node_modules/@pythnetwork/client/lib/index.js [app-route] (ecmascript)");
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
class PythClient {
    constructor(connection, multiple = numericConstants_1.ONE, stableCoin = false){
        this.connection = connection;
        this.multiple = multiple;
        this.stableCoin = stableCoin;
    }
    async getOraclePriceData(pricePublicKey) {
        const accountInfo = await this.connection.getAccountInfo(pricePublicKey);
        return this.getOraclePriceDataFromBuffer(accountInfo.data);
    }
    getOraclePriceDataFromBuffer(buffer) {
        const priceData = (0, client_1.parsePriceData)(buffer);
        const confidence = convertPythPrice(priceData.confidence, priceData.exponent, this.multiple);
        const minPublishers = Math.min(priceData.numComponentPrices, 3);
        let price = convertPythPrice(priceData.aggregate.price, priceData.exponent, this.multiple);
        if (this.stableCoin) {
            price = getStableCoinPrice(price, confidence);
        }
        return {
            price,
            slot: new anchor_1.BN(priceData.lastSlot.toString()),
            confidence,
            twap: convertPythPrice(priceData.twap.value, priceData.exponent, this.multiple),
            twapConfidence: convertPythPrice(priceData.twac.value, priceData.exponent, this.multiple),
            hasSufficientNumberOfDataPoints: priceData.numQuoters >= minPublishers
        };
    }
}
exports.PythClient = PythClient;
function convertPythPrice(price, exponent, multiple) {
    exponent = Math.abs(exponent);
    const pythPrecision = numericConstants_1.TEN.pow(new anchor_1.BN(exponent).abs()).div(multiple);
    return new anchor_1.BN(price * Math.pow(10, exponent)).mul(numericConstants_1.PRICE_PRECISION).div(pythPrecision);
}
const fiveBPS = new anchor_1.BN(500);
function getStableCoinPrice(price, confidence) {
    if (price.sub(numericConstants_1.QUOTE_PRECISION).abs().lt(anchor_1.BN.min(confidence, fiveBPS))) {
        return numericConstants_1.QUOTE_PRECISION;
    } else {
        return price;
    }
}
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/strictOraclePrice.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StrictOraclePrice = void 0;
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
class StrictOraclePrice {
    constructor(current, twap){
        this.current = current;
        this.twap = twap;
    }
    max() {
        return this.twap ? anchor_1.BN.max(this.twap, this.current) : this.current;
    }
    min() {
        return this.twap ? anchor_1.BN.min(this.twap, this.current) : this.current;
    }
}
exports.StrictOraclePrice = StrictOraclePrice;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/quoteAssetOracleClient.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.QuoteAssetOracleClient = exports.QUOTE_ORACLE_PRICE_DATA = void 0;
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
exports.QUOTE_ORACLE_PRICE_DATA = {
    price: numericConstants_1.PRICE_PRECISION,
    slot: new anchor_1.BN(0),
    confidence: new anchor_1.BN(1),
    hasSufficientNumberOfDataPoints: true
};
class QuoteAssetOracleClient {
    constructor(){}
    async getOraclePriceData(_pricePublicKey) {
        return Promise.resolve(exports.QUOTE_ORACLE_PRICE_DATA);
    }
    getOraclePriceDataFromBuffer(_buffer) {
        return exports.QUOTE_ORACLE_PRICE_DATA;
    }
}
exports.QuoteAssetOracleClient = QuoteAssetOracleClient;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/prelaunchOracleClient.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PrelaunchOracleClient = void 0;
class PrelaunchOracleClient {
    constructor(connection, program){
        this.connection = connection;
        this.program = program;
    }
    async getOraclePriceData(pricePublicKey) {
        const accountInfo = await this.connection.getAccountInfo(pricePublicKey);
        return this.getOraclePriceDataFromBuffer(accountInfo.data);
    }
    getOraclePriceDataFromBuffer(buffer) {
        const prelaunchOracle = this.program.account.prelaunchOracle.coder.accounts.decodeUnchecked('PrelaunchOracle', buffer);
        return {
            price: prelaunchOracle.price,
            slot: prelaunchOracle.ammLastUpdateSlot,
            confidence: prelaunchOracle.confidence,
            hasSufficientNumberOfDataPoints: true,
            maxPrice: prelaunchOracle.maxPrice
        };
    }
}
exports.PrelaunchOracleClient = PrelaunchOracleClient;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/switchboardClient.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SwitchboardClient = void 0;
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const switchboard_json_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/idl/switchboard.json (json)"));
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
class SwitchboardClient {
    constructor(connection){
        this.connection = connection;
        this.coder = new anchor_1.BorshAccountsCoder(switchboard_json_1.default);
    }
    async getOraclePriceData(pricePublicKey) {
        const accountInfo = await this.connection.getAccountInfo(pricePublicKey);
        return this.getOraclePriceDataFromBuffer(accountInfo.data);
    }
    getOraclePriceDataFromBuffer(buffer) {
        const aggregatorAccountData = this.coder.decodeUnchecked('AggregatorAccountData', buffer);
        const price = convertSwitchboardDecimal(aggregatorAccountData.latestConfirmedRound.result);
        const confidence = anchor_1.BN.max(convertSwitchboardDecimal(aggregatorAccountData.latestConfirmedRound.stdDeviation), price.divn(1000));
        const hasSufficientNumberOfDataPoints = aggregatorAccountData.latestConfirmedRound.numSuccess >= aggregatorAccountData.minOracleResults;
        const slot = aggregatorAccountData.latestConfirmedRound.roundOpenSlot;
        return {
            price,
            slot,
            confidence,
            hasSufficientNumberOfDataPoints
        };
    }
}
exports.SwitchboardClient = SwitchboardClient;
function convertSwitchboardDecimal(switchboardDecimal) {
    const switchboardPrecision = numericConstants_1.TEN.pow(new anchor_1.BN(switchboardDecimal.scale));
    return switchboardDecimal.mantissa.mul(numericConstants_1.PRICE_PRECISION).div(switchboardPrecision);
}
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/pythPullClient.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.convertPythPrice = exports.PythPullClient = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const pyth_solana_receiver_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@pythnetwork+pyth-solana-receiver@0.7.0_typescript@5.9.3/node_modules/@pythnetwork/pyth-solana-receiver/lib/index.js [app-route] (ecmascript)");
const config_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/config.js [app-route] (ecmascript)");
const wallet_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/wallet.js [app-route] (ecmascript)");
class PythPullClient {
    constructor(connection, multiple = numericConstants_1.ONE, stableCoin = false){
        this.connection = connection;
        this.multiple = multiple;
        this.stableCoin = stableCoin;
        const provider = new anchor_1.AnchorProvider(this.connection, //@ts-ignore
        new wallet_1.Wallet(new web3_js_1.Keypair()), {
            commitment: connection.commitment
        });
        this.receiver = new anchor_1.Program(pyth_solana_receiver_1.pythSolanaReceiverIdl, config_1.DRIFT_ORACLE_RECEIVER_ID, provider);
        this.decodeFunc = this.receiver.account.priceUpdateV2.coder.accounts.decodeUnchecked.bind(this.receiver.account.priceUpdateV2.coder.accounts);
    }
    async getOraclePriceData(pricePublicKey) {
        const accountInfo = await this.connection.getAccountInfo(pricePublicKey);
        return this.getOraclePriceDataFromBuffer(accountInfo.data);
    }
    getOraclePriceDataFromBuffer(buffer) {
        const message = this.decodeFunc('priceUpdateV2', buffer);
        const priceData = message.priceMessage;
        const confidence = convertPythPrice(priceData.conf, priceData.exponent, this.multiple);
        let price = convertPythPrice(priceData.price, priceData.exponent, this.multiple);
        if (this.stableCoin) {
            price = getStableCoinPrice(price, confidence);
        }
        return {
            price,
            slot: message.postedSlot,
            confidence,
            twap: convertPythPrice(priceData.price, priceData.exponent, this.multiple),
            twapConfidence: convertPythPrice(priceData.price, priceData.exponent, this.multiple),
            hasSufficientNumberOfDataPoints: true,
            sequenceId: priceData.publishTime
        };
    }
}
exports.PythPullClient = PythPullClient;
function convertPythPrice(price, exponent, multiple) {
    exponent = Math.abs(exponent);
    const pythPrecision = numericConstants_1.TEN.pow(new anchor_1.BN(exponent).abs()).div(multiple);
    return price.mul(numericConstants_1.PRICE_PRECISION).div(pythPrecision);
}
exports.convertPythPrice = convertPythPrice;
const fiveBPS = new anchor_1.BN(500);
function getStableCoinPrice(price, confidence) {
    if (price.sub(numericConstants_1.QUOTE_PRECISION).abs().lt(anchor_1.BN.min(confidence, fiveBPS))) {
        return numericConstants_1.QUOTE_PRECISION;
    } else {
        return price;
    }
}
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/switchboardOnDemandClient.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SwitchboardOnDemandClient = void 0;
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const switchboard_on_demand_30_json_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/idl/switchboard_on_demand_30.json (json)"));
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const anchor_30_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.30.1_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const SB_PRECISION_EXP = new anchor_1.BN(18);
const SB_PRECISION = new anchor_1.BN(10).pow(SB_PRECISION_EXP.sub(numericConstants_1.PRICE_PRECISION_EXP));
class SwitchboardOnDemandClient {
    constructor(connection){
        this.connection = connection;
        this.coder = new anchor_30_1.BorshAccountsCoder(switchboard_on_demand_30_json_1.default);
    }
    async getOraclePriceData(pricePublicKey) {
        const accountInfo = await this.connection.getAccountInfo(pricePublicKey);
        return this.getOraclePriceDataFromBuffer(accountInfo.data);
    }
    getOraclePriceDataFromBuffer(buffer) {
        const pullFeedAccountData = this.coder.decodeUnchecked('PullFeedAccountData', buffer);
        const landedAt = pullFeedAccountData.submissions.reduce((max, s)=>anchor_1.BN.max(max, s.landed_at), new anchor_1.BN(0));
        return {
            price: pullFeedAccountData.result.value.div(SB_PRECISION),
            slot: landedAt,
            confidence: pullFeedAccountData.result.range.div(SB_PRECISION),
            hasSufficientNumberOfDataPoints: true
        };
    }
}
exports.SwitchboardOnDemandClient = SwitchboardOnDemandClient;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/pythLazerClient.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PythLazerClient = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const config_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/config.js [app-route] (ecmascript)");
const wallet_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/wallet.js [app-route] (ecmascript)");
const drift_json_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/idl/drift.json (json)"));
class PythLazerClient {
    constructor(connection, multiple = numericConstants_1.ONE, stableCoin = false){
        this.connection = connection;
        this.multiple = multiple;
        this.stableCoin = stableCoin;
        const provider = new anchor_1.AnchorProvider(this.connection, //@ts-ignore
        new wallet_1.Wallet(new web3_js_1.Keypair()), {
            commitment: connection.commitment
        });
        this.program = new anchor_1.Program(drift_json_1.default, new web3_js_1.PublicKey(config_1.DRIFT_PROGRAM_ID), provider);
        this.decodeFunc = this.program.account.pythLazerOracle.coder.accounts.decodeUnchecked.bind(this.program.account.pythLazerOracle.coder.accounts);
    }
    async getOraclePriceData(pricePublicKey) {
        const accountInfo = await this.connection.getAccountInfo(pricePublicKey);
        return this.getOraclePriceDataFromBuffer(accountInfo.data);
    }
    getOraclePriceDataFromBuffer(buffer) {
        const priceData = this.decodeFunc('PythLazerOracle', buffer);
        const confidence = convertPythPrice(priceData.conf, priceData.exponent, this.multiple);
        let price = convertPythPrice(priceData.price, priceData.exponent, this.multiple);
        if (this.stableCoin) {
            price = getStableCoinPrice(price, confidence);
        }
        return {
            price,
            slot: priceData.postedSlot,
            confidence,
            twap: convertPythPrice(priceData.price, priceData.exponent, this.multiple),
            twapConfidence: convertPythPrice(priceData.price, priceData.exponent, this.multiple),
            hasSufficientNumberOfDataPoints: true,
            sequenceId: priceData.publishTime
        };
    }
}
exports.PythLazerClient = PythLazerClient;
function convertPythPrice(price, exponent, multiple) {
    exponent = Math.abs(exponent);
    const pythPrecision = numericConstants_1.TEN.pow(new anchor_1.BN(exponent).abs()).div(multiple);
    return price.mul(numericConstants_1.PRICE_PRECISION).div(pythPrecision);
}
const fiveBPS = new anchor_1.BN(500);
function getStableCoinPrice(price, confidence) {
    if (price.sub(numericConstants_1.QUOTE_PRECISION).abs().lt(anchor_1.BN.min(confidence, fiveBPS))) {
        return numericConstants_1.QUOTE_PRECISION;
    } else {
        return price;
    }
}
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/oracleClientCache.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OracleClientCache = void 0;
const oracleClient_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/factory/oracleClient.js [app-route] (ecmascript)");
class OracleClientCache {
    constructor(){
        this.cache = new Map();
    }
    get(oracleSource, connection, program) {
        const key = Object.keys(oracleSource)[0];
        if (this.cache.has(key)) {
            return this.cache.get(key);
        }
        const client = (0, oracleClient_1.getOracleClient)(oracleSource, connection, program);
        this.cache.set(key, client);
        return client;
    }
}
exports.OracleClientCache = OracleClientCache;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/utils.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getOracleConfidenceFromMMOracleData = void 0;
function getOracleConfidenceFromMMOracleData(mmOraclePrice, oraclePriceData) {
    const mmOracleDiffPremium = mmOraclePrice.sub(oraclePriceData.price).abs();
    return oraclePriceData.confidence.add(mmOracleDiffPremium);
}
exports.getOracleConfidenceFromMMOracleData = getOracleConfidenceFromMMOracleData;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/config.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findAllMarketAndOracles = exports.getMarketsAndOraclesForSubscription = exports.initialize = exports.getConfig = exports.configs = exports.DEFAULT_CONFIRMATION_OPTS = exports.PYTH_LAZER_STORAGE_ACCOUNT_KEY = exports.PTYH_LAZER_PROGRAM_ID = exports.DRIFT_ORACLE_RECEIVER_ID = exports.DRIFT_PROGRAM_ID = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const perpMarkets_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/perpMarkets.js [app-route] (ecmascript)");
const spotMarkets_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/spotMarkets.js [app-route] (ecmascript)");
const on_demand_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/index.js [app-route] (ecmascript)");
const oracleId_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/oracleId.js [app-route] (ecmascript)");
exports.DRIFT_PROGRAM_ID = 'dRiftyHA39MWEi3m9aunc5MzRF1JYuBsbn6VPcn33UH';
exports.DRIFT_ORACLE_RECEIVER_ID = 'G6EoTTTgpkNBtVXo96EQp2m6uwwVh2Kt6YidjkmQqoha';
exports.PTYH_LAZER_PROGRAM_ID = 'pytd2yyk641x7ak7mkaasSJVXh6YYZnC7wTmtgAyxPt';
exports.PYTH_LAZER_STORAGE_ACCOUNT_KEY = new web3_js_1.PublicKey('3rdJbqfnagQ4yx9HXJViD4zc4xpiSqmFsKpPuSCQVyQL');
exports.DEFAULT_CONFIRMATION_OPTS = {
    preflightCommitment: 'confirmed',
    commitment: 'confirmed'
};
exports.configs = {
    devnet: {
        ENV: 'devnet',
        PYTH_ORACLE_MAPPING_ADDRESS: 'BmA9Z6FjioHJPpjT39QazZyhDRUdZy2ezwx4GiDdE2u2',
        DRIFT_PROGRAM_ID: exports.DRIFT_PROGRAM_ID,
        JIT_PROXY_PROGRAM_ID: 'J1TnP8zvVxbtF5KFp5xRmWuvG9McnhzmBd9XGfCyuxFP',
        USDC_MINT_ADDRESS: '8zGuJQqwhZafTah7Uc7Z4tXRnguqkn5KLFAP8oV6PHe2',
        SERUM_V3: 'DESVgJVGajEgKGXhb6XmqDHGz3VjdgP7rEVESBgxmroY',
        PHOENIX: 'PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY',
        OPENBOOK: 'opnb2LAfJYbRMAHHvqjCwQxanZn7ReEHp1k81EohpZb',
        V2_ALPHA_TICKET_MINT_ADDRESS: 'DeEiGWfCMP9psnLGkxGrBBMEAW5Jv8bBGMN8DCtFRCyB',
        PERP_MARKETS: perpMarkets_1.DevnetPerpMarkets,
        SPOT_MARKETS: spotMarkets_1.DevnetSpotMarkets,
        /** @deprecated use MARKET_LOOKUP_TABLES */ MARKET_LOOKUP_TABLE: 'FaMS3U4uBojvGn5FSDEPimddcXsCfwkKsFgMVVnDdxGb',
        MARKET_LOOKUP_TABLES: [
            'FaMS3U4uBojvGn5FSDEPimddcXsCfwkKsFgMVVnDdxGb'
        ],
        DRIFT_ORACLE_RECEIVER_ID: exports.DRIFT_ORACLE_RECEIVER_ID,
        SB_ON_DEMAND_PID: on_demand_1.ON_DEMAND_DEVNET_PID
    },
    'mainnet-beta': {
        ENV: 'mainnet-beta',
        PYTH_ORACLE_MAPPING_ADDRESS: 'AHtgzX45WTKfkPG53L6WYhGEXwQkN1BVknET3sVsLL8J',
        DRIFT_PROGRAM_ID: exports.DRIFT_PROGRAM_ID,
        JIT_PROXY_PROGRAM_ID: 'J1TnP8zvVxbtF5KFp5xRmWuvG9McnhzmBd9XGfCyuxFP',
        USDC_MINT_ADDRESS: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        SERUM_V3: 'srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX',
        PHOENIX: 'PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY',
        OPENBOOK: 'opnb2LAfJYbRMAHHvqjCwQxanZn7ReEHp1k81EohpZb',
        V2_ALPHA_TICKET_MINT_ADDRESS: 'Cmvhycb6LQvvzaShGw4iDHRLzeSSryioAsU98DSSkMNa',
        PERP_MARKETS: perpMarkets_1.MainnetPerpMarkets,
        SPOT_MARKETS: spotMarkets_1.MainnetSpotMarkets,
        /** @deprecated use MARKET_LOOKUP_TABLES */ MARKET_LOOKUP_TABLE: 'Fpys8GRa5RBWfyeN7AaDUwFGD1zkDCA4z3t4CJLV8dfL',
        MARKET_LOOKUP_TABLES: [
            'Fpys8GRa5RBWfyeN7AaDUwFGD1zkDCA4z3t4CJLV8dfL',
            'EiWSskK5HXnBTptiS5DH6gpAJRVNQ3cAhTKBGaiaysAb'
        ],
        SERUM_LOOKUP_TABLE: 'GPZkp76cJtNL2mphCvT6FXkJCVPpouidnacckR6rzKDN',
        DRIFT_ORACLE_RECEIVER_ID: exports.DRIFT_ORACLE_RECEIVER_ID,
        SB_ON_DEMAND_PID: on_demand_1.ON_DEMAND_MAINNET_PID
    }
};
let currentConfig = exports.configs.devnet;
const getConfig = ()=>currentConfig;
exports.getConfig = getConfig;
/**
 * Allows customization of the SDK's environment and endpoints. You can pass individual settings to override the settings with your own presets.
 *
 * Defaults to master environment if you don't use this function.
 * @param props
 * @returns
 */ const initialize = (props)=>{
    var _a, _b;
    //@ts-ignore
    if (props.env === 'master') return {
        ...exports.configs['devnet'],
        ...(_a = props.overrideEnv) !== null && _a !== void 0 ? _a : {}
    };
    currentConfig = {
        ...exports.configs[props.env],
        ...(_b = props.overrideEnv) !== null && _b !== void 0 ? _b : {}
    };
    return currentConfig;
};
exports.initialize = initialize;
function getMarketsAndOraclesForSubscription(env, perpMarkets, spotMarkets) {
    const perpMarketsToUse = (perpMarkets === null || perpMarkets === void 0 ? void 0 : perpMarkets.length) > 0 ? perpMarkets : perpMarkets_1.PerpMarkets[env];
    const spotMarketsToUse = (spotMarkets === null || spotMarkets === void 0 ? void 0 : spotMarkets.length) > 0 ? spotMarkets : spotMarkets_1.SpotMarkets[env];
    const perpMarketIndexes = [];
    const spotMarketIndexes = [];
    const oracleInfos = new Map();
    for (const market of perpMarketsToUse){
        perpMarketIndexes.push(market.marketIndex);
        oracleInfos.set((0, oracleId_1.getOracleId)(market.oracle, market.oracleSource), {
            publicKey: market.oracle,
            source: market.oracleSource
        });
    }
    for (const spotMarket of spotMarketsToUse){
        spotMarketIndexes.push(spotMarket.marketIndex);
        oracleInfos.set((0, oracleId_1.getOracleId)(spotMarket.oracle, spotMarket.oracleSource), {
            publicKey: spotMarket.oracle,
            source: spotMarket.oracleSource
        });
    }
    return {
        perpMarketIndexes: perpMarketIndexes,
        spotMarketIndexes: spotMarketIndexes,
        oracleInfos: Array.from(oracleInfos.values())
    };
}
exports.getMarketsAndOraclesForSubscription = getMarketsAndOraclesForSubscription;
async function findAllMarketAndOracles(program) {
    const perpMarketIndexes = [];
    const spotMarketIndexes = [];
    const oracleInfos = new Map();
    const perpMarketProgramAccounts = await program.account.perpMarket.all();
    const spotMarketProgramAccounts = await program.account.spotMarket.all();
    for (const perpMarketProgramAccount of perpMarketProgramAccounts){
        const perpMarket = perpMarketProgramAccount.account;
        perpMarketIndexes.push(perpMarket.marketIndex);
        oracleInfos.set((0, oracleId_1.getOracleId)(perpMarket.amm.oracle, perpMarket.amm.oracleSource), {
            publicKey: perpMarket.amm.oracle,
            source: perpMarket.amm.oracleSource
        });
    }
    for (const spotMarketProgramAccount of spotMarketProgramAccounts){
        const spotMarket = spotMarketProgramAccount.account;
        spotMarketIndexes.push(spotMarket.marketIndex);
        oracleInfos.set((0, oracleId_1.getOracleId)(spotMarket.oracle, spotMarket.oracleSource), {
            publicKey: spotMarket.oracle,
            source: spotMarket.oracleSource
        });
    }
    return {
        perpMarketIndexes,
        perpMarketAccounts: perpMarketProgramAccounts.map((account)=>account.account),
        spotMarketIndexes,
        spotMarketAccounts: spotMarketProgramAccounts.map((account)=>account.account),
        oracleInfos: Array.from(oracleInfos.values())
    };
}
exports.findAllMarketAndOracles = findAllMarketAndOracles;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tokenFaucet.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TokenFaucet = void 0;
const anchor = __importStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)"));
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const spl_token_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.4.13_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/index.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const token_faucet_json_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/idl/token_faucet.json (json)"));
const config_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/config.js [app-route] (ecmascript)");
class TokenFaucet {
    constructor(connection, wallet, programId, mint, opts, context){
        this.connection = connection;
        this.context = context;
        this.wallet = wallet;
        this.opts = opts || config_1.DEFAULT_CONFIRMATION_OPTS;
        // @ts-ignore
        const provider = new anchor_1.AnchorProvider(context ? context.connection.toConnection() : this.connection, // @ts-ignore
        wallet, this.opts);
        this.provider = provider;
        this.program = new anchor_1.Program(token_faucet_json_1.default, programId, provider);
        this.mint = mint;
    }
    async getFaucetConfigPublicKeyAndNonce() {
        return anchor.web3.PublicKey.findProgramAddress([
            Buffer.from(anchor.utils.bytes.utf8.encode('faucet_config')),
            this.mint.toBuffer()
        ], this.program.programId);
    }
    async getMintAuthority() {
        return (await anchor.web3.PublicKey.findProgramAddress([
            Buffer.from(anchor.utils.bytes.utf8.encode('mint_authority')),
            this.mint.toBuffer()
        ], this.program.programId))[0];
    }
    async getFaucetConfigPublicKey() {
        return (await this.getFaucetConfigPublicKeyAndNonce())[0];
    }
    async initialize() {
        const [faucetConfigPublicKey] = await this.getFaucetConfigPublicKeyAndNonce();
        const ix = this.program.instruction.initialize({
            accounts: {
                faucetConfig: faucetConfigPublicKey,
                admin: this.wallet.publicKey,
                mintAccount: this.mint,
                rent: web3_js_1.SYSVAR_RENT_PUBKEY,
                systemProgram: anchor.web3.SystemProgram.programId,
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID
            }
        });
        const tx = new web3_js_1.Transaction().add(ix);
        const txSig = await this.context.sendTransaction(tx);
        return txSig;
    }
    async fetchState() {
        return await this.program.account.faucetConfig.fetch(await this.getFaucetConfigPublicKey());
    }
    async mintToUserIx(userTokenAccount, amount) {
        return this.program.instruction.mintToUser(amount, {
            accounts: {
                faucetConfig: await this.getFaucetConfigPublicKey(),
                mintAccount: this.mint,
                userTokenAccount,
                mintAuthority: await this.getMintAuthority(),
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID
            }
        });
    }
    async mintToUser(userTokenAccount, amount) {
        const mintIx = await this.mintToUserIx(userTokenAccount, amount);
        const tx = new web3_js_1.Transaction().add(mintIx);
        if (this.context) {
            return await this.context.sendTransaction(tx);
        } else {
            return await this.program.provider.sendAndConfirm(tx, [], this.opts);
        }
    }
    async transferMintAuthority() {
        if (this.context) {
            const ix = this.program.instruction.transferMintAuthority({
                accounts: {
                    faucetConfig: await this.getFaucetConfigPublicKey(),
                    mintAccount: this.mint,
                    mintAuthority: await this.getMintAuthority(),
                    tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                    admin: this.wallet.publicKey
                }
            });
            const tx = new web3_js_1.Transaction().add(ix);
            const txSig = await this.context.sendTransaction(tx);
            return txSig;
        }
        return await this.program.rpc.transferMintAuthority({
            accounts: {
                faucetConfig: await this.getFaucetConfigPublicKey(),
                mintAccount: this.mint,
                mintAuthority: await this.getMintAuthority(),
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                admin: this.wallet.publicKey
            }
        });
    }
    async createAssociatedTokenAccountAndMintTo(userPublicKey, amount) {
        const tx = new web3_js_1.Transaction();
        const [associatedTokenPublicKey, createAssociatedAccountIx, mintToTx] = await this.createAssociatedTokenAccountAndMintToInstructions(userPublicKey, amount);
        let associatedTokenAccountExists = false;
        try {
            const assosciatedTokenAccount = await this.context.connection.getAccountInfo(associatedTokenPublicKey);
            associatedTokenAccountExists = !!assosciatedTokenAccount;
        } catch (e) {
            // token account doesn't exist
            associatedTokenAccountExists = false;
        }
        const skipAccountCreation = associatedTokenAccountExists;
        if (!skipAccountCreation) tx.add(createAssociatedAccountIx);
        tx.add(mintToTx);
        let txSig;
        if (this.context) {
            txSig = await this.context.sendTransaction(tx);
        } else {
            txSig = await this.program.provider.sendAndConfirm(tx, [], this.opts);
        }
        return [
            associatedTokenPublicKey,
            txSig
        ];
    }
    async createAssociatedTokenAccountAndMintToInstructions(userPublicKey, amount) {
        const state = await this.fetchState();
        const associateTokenPublicKey = await this.getAssosciatedMockUSDMintAddress({
            userPubKey: userPublicKey
        });
        const createAssociatedAccountIx = (0, spl_token_1.createAssociatedTokenAccountInstruction)(this.wallet.publicKey, associateTokenPublicKey, userPublicKey, state.mint);
        const mintToIx = await this.mintToUserIx(associateTokenPublicKey, amount);
        return [
            associateTokenPublicKey,
            createAssociatedAccountIx,
            mintToIx
        ];
    }
    async getAssosciatedMockUSDMintAddress(props) {
        const state = await this.fetchState();
        return (0, spl_token_1.getAssociatedTokenAddress)(state.mint, props.userPubKey);
    }
    async getTokenAccountInfo(props) {
        const associatedKey = await this.getAssosciatedMockUSDMintAddress(props);
        if (this.context) {
            return await this.context.connection.getTokenAccount(associatedKey);
        }
        return await (0, spl_token_1.getAccount)(this.connection, associatedKey);
    }
    async subscribeToTokenAccount(props) {
        try {
            const tokenAccountKey = await this.getAssosciatedMockUSDMintAddress(props);
            props.callback(await this.getTokenAccountInfo(props));
            // Couldn't find a way to do it using anchor framework subscription, someone on serum discord recommended this way
            this.context.connection.onAccountChange(tokenAccountKey, async (_accountInfo /* accountInfo is a buffer which we don't know how to deserialize */ )=>{
                props.callback(await this.getTokenAccountInfo(props));
            });
            return true;
        } catch (e) {
            return false;
        }
    }
}
exports.TokenFaucet = TokenFaucet;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/addresses/pda.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLpPoolTokenTokenAccountPublicKey = exports.getConstituentCorrelationsPublicKey = exports.getAmmCachePublicKey = exports.getConstituentVaultPublicKey = exports.getConstituentPublicKey = exports.getConstituentTargetBasePublicKey = exports.getAmmConstituentMappingPublicKey = exports.getLpPoolTokenVaultPublicKey = exports.getLpPoolPublicKey = exports.getRevenueShareEscrowAccountPublicKey = exports.getRevenueShareAccountPublicKey = exports.getIfRebalanceConfigPublicKey = exports.getProtectedMakerModeConfigPublicKey = exports.getHighLeverageModeConfigPublicKey = exports.getTokenProgramForSpotMarket = exports.getPythLazerOraclePublicKey = exports.getPythPullOraclePublicKey = exports.getPrelaunchOraclePublicKey = exports.getProtocolIfSharesTransferConfigPublicKey = exports.getReferrerNamePublicKeySync = exports.getOpenbookV2FulfillmentConfigPublicKey = exports.getPhoenixFulfillmentConfigPublicKey = exports.getSerumFulfillmentConfigPublicKey = exports.getSerumSignerPublicKey = exports.getSerumOpenOrdersPublicKey = exports.getDriftSignerPublicKey = exports.getInsuranceFundStakeAccountPublicKey = exports.getInsuranceFundVaultPublicKey = exports.getSpotMarketVaultPublicKey = exports.getSpotMarketPublicKeySync = exports.getSpotMarketPublicKey = exports.getPerpMarketPublicKeySync = exports.getPerpMarketPublicKey = exports.getSignedMsgWsDelegatesAccountPublicKey = exports.getSignedMsgUserAccountPublicKey = exports.getFuelOverflowAccountPublicKey = exports.getUserStatsAccountPublicKey = exports.getUserAccountPublicKeySync = exports.getUserAccountPublicKey = exports.getUserAccountPublicKeyAndNonce = exports.getDriftStateAccountPublicKey = exports.getDriftStateAccountPublicKeyAndNonce = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const anchor = __importStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)"));
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const spl_token_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.4.13_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/index.js [app-route] (ecmascript)");
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
async function getDriftStateAccountPublicKeyAndNonce(programId) {
    return web3_js_1.PublicKey.findProgramAddress([
        Buffer.from(anchor.utils.bytes.utf8.encode('drift_state'))
    ], programId);
}
exports.getDriftStateAccountPublicKeyAndNonce = getDriftStateAccountPublicKeyAndNonce;
async function getDriftStateAccountPublicKey(programId) {
    return (await getDriftStateAccountPublicKeyAndNonce(programId))[0];
}
exports.getDriftStateAccountPublicKey = getDriftStateAccountPublicKey;
async function getUserAccountPublicKeyAndNonce(programId, authority, subAccountId = 0) {
    return web3_js_1.PublicKey.findProgramAddress([
        Buffer.from(anchor.utils.bytes.utf8.encode('user')),
        authority.toBuffer(),
        new anchor.BN(subAccountId).toArrayLike(Buffer, 'le', 2)
    ], programId);
}
exports.getUserAccountPublicKeyAndNonce = getUserAccountPublicKeyAndNonce;
async function getUserAccountPublicKey(programId, authority, subAccountId = 0) {
    return (await getUserAccountPublicKeyAndNonce(programId, authority, subAccountId))[0];
}
exports.getUserAccountPublicKey = getUserAccountPublicKey;
function getUserAccountPublicKeySync(programId, authority, subAccountId = 0) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('user')),
        authority.toBuffer(),
        new anchor.BN(subAccountId).toArrayLike(Buffer, 'le', 2)
    ], programId)[0];
}
exports.getUserAccountPublicKeySync = getUserAccountPublicKeySync;
function getUserStatsAccountPublicKey(programId, authority) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('user_stats')),
        authority.toBuffer()
    ], programId)[0];
}
exports.getUserStatsAccountPublicKey = getUserStatsAccountPublicKey;
function getFuelOverflowAccountPublicKey(programId, authority) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('fuel_overflow')),
        authority.toBuffer()
    ], programId)[0];
}
exports.getFuelOverflowAccountPublicKey = getFuelOverflowAccountPublicKey;
function getSignedMsgUserAccountPublicKey(programId, authority) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('SIGNED_MSG')),
        authority.toBuffer()
    ], programId)[0];
}
exports.getSignedMsgUserAccountPublicKey = getSignedMsgUserAccountPublicKey;
function getSignedMsgWsDelegatesAccountPublicKey(programId, authority) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('SIGNED_MSG_WS')),
        authority.toBuffer()
    ], programId)[0];
}
exports.getSignedMsgWsDelegatesAccountPublicKey = getSignedMsgWsDelegatesAccountPublicKey;
async function getPerpMarketPublicKey(programId, marketIndex) {
    return (await web3_js_1.PublicKey.findProgramAddress([
        Buffer.from(anchor.utils.bytes.utf8.encode('perp_market')),
        new anchor.BN(marketIndex).toArrayLike(Buffer, 'le', 2)
    ], programId))[0];
}
exports.getPerpMarketPublicKey = getPerpMarketPublicKey;
function getPerpMarketPublicKeySync(programId, marketIndex) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('perp_market')),
        new anchor.BN(marketIndex).toArrayLike(Buffer, 'le', 2)
    ], programId)[0];
}
exports.getPerpMarketPublicKeySync = getPerpMarketPublicKeySync;
async function getSpotMarketPublicKey(programId, marketIndex) {
    return (await web3_js_1.PublicKey.findProgramAddress([
        Buffer.from(anchor.utils.bytes.utf8.encode('spot_market')),
        new anchor.BN(marketIndex).toArrayLike(Buffer, 'le', 2)
    ], programId))[0];
}
exports.getSpotMarketPublicKey = getSpotMarketPublicKey;
function getSpotMarketPublicKeySync(programId, marketIndex) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('spot_market')),
        new anchor.BN(marketIndex).toArrayLike(Buffer, 'le', 2)
    ], programId)[0];
}
exports.getSpotMarketPublicKeySync = getSpotMarketPublicKeySync;
async function getSpotMarketVaultPublicKey(programId, marketIndex) {
    return (await web3_js_1.PublicKey.findProgramAddress([
        Buffer.from(anchor.utils.bytes.utf8.encode('spot_market_vault')),
        new anchor.BN(marketIndex).toArrayLike(Buffer, 'le', 2)
    ], programId))[0];
}
exports.getSpotMarketVaultPublicKey = getSpotMarketVaultPublicKey;
async function getInsuranceFundVaultPublicKey(programId, marketIndex) {
    return (await web3_js_1.PublicKey.findProgramAddress([
        Buffer.from(anchor.utils.bytes.utf8.encode('insurance_fund_vault')),
        new anchor.BN(marketIndex).toArrayLike(Buffer, 'le', 2)
    ], programId))[0];
}
exports.getInsuranceFundVaultPublicKey = getInsuranceFundVaultPublicKey;
function getInsuranceFundStakeAccountPublicKey(programId, authority, marketIndex) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('insurance_fund_stake')),
        authority.toBuffer(),
        new anchor.BN(marketIndex).toArrayLike(Buffer, 'le', 2)
    ], programId)[0];
}
exports.getInsuranceFundStakeAccountPublicKey = getInsuranceFundStakeAccountPublicKey;
function getDriftSignerPublicKey(programId) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('drift_signer'))
    ], programId)[0];
}
exports.getDriftSignerPublicKey = getDriftSignerPublicKey;
function getSerumOpenOrdersPublicKey(programId, market) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('serum_open_orders')),
        market.toBuffer()
    ], programId)[0];
}
exports.getSerumOpenOrdersPublicKey = getSerumOpenOrdersPublicKey;
function getSerumSignerPublicKey(programId, market, nonce) {
    return anchor.web3.PublicKey.createProgramAddressSync([
        market.toBuffer(),
        nonce.toArrayLike(Buffer, 'le', 8)
    ], programId);
}
exports.getSerumSignerPublicKey = getSerumSignerPublicKey;
function getSerumFulfillmentConfigPublicKey(programId, market) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('serum_fulfillment_config')),
        market.toBuffer()
    ], programId)[0];
}
exports.getSerumFulfillmentConfigPublicKey = getSerumFulfillmentConfigPublicKey;
function getPhoenixFulfillmentConfigPublicKey(programId, market) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('phoenix_fulfillment_config')),
        market.toBuffer()
    ], programId)[0];
}
exports.getPhoenixFulfillmentConfigPublicKey = getPhoenixFulfillmentConfigPublicKey;
function getOpenbookV2FulfillmentConfigPublicKey(programId, market) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('openbook_v2_fulfillment_config')),
        market.toBuffer()
    ], programId)[0];
}
exports.getOpenbookV2FulfillmentConfigPublicKey = getOpenbookV2FulfillmentConfigPublicKey;
function getReferrerNamePublicKeySync(programId, nameBuffer) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('referrer_name')),
        Buffer.from(nameBuffer)
    ], programId)[0];
}
exports.getReferrerNamePublicKeySync = getReferrerNamePublicKeySync;
function getProtocolIfSharesTransferConfigPublicKey(programId) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('if_shares_transfer_config'))
    ], programId)[0];
}
exports.getProtocolIfSharesTransferConfigPublicKey = getProtocolIfSharesTransferConfigPublicKey;
function getPrelaunchOraclePublicKey(programId, marketIndex) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('prelaunch_oracle')),
        new anchor.BN(marketIndex).toArrayLike(Buffer, 'le', 2)
    ], programId)[0];
}
exports.getPrelaunchOraclePublicKey = getPrelaunchOraclePublicKey;
function getPythPullOraclePublicKey(progarmId, feedId) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('pyth_pull')),
        Buffer.from(feedId)
    ], progarmId)[0];
}
exports.getPythPullOraclePublicKey = getPythPullOraclePublicKey;
function getPythLazerOraclePublicKey(progarmId, feedId) {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setUint32(0, feedId, true);
    const feedIdBytes = new Uint8Array(buffer);
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('pyth_lazer')),
        Buffer.from(feedIdBytes)
    ], progarmId)[0];
}
exports.getPythLazerOraclePublicKey = getPythLazerOraclePublicKey;
function getTokenProgramForSpotMarket(spotMarketAccount) {
    if ((spotMarketAccount.tokenProgramFlag & types_1.TokenProgramFlag.Token2022) > 0) {
        return spl_token_1.TOKEN_2022_PROGRAM_ID;
    }
    return spl_token_1.TOKEN_PROGRAM_ID;
}
exports.getTokenProgramForSpotMarket = getTokenProgramForSpotMarket;
function getHighLeverageModeConfigPublicKey(programId) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('high_leverage_mode_config'))
    ], programId)[0];
}
exports.getHighLeverageModeConfigPublicKey = getHighLeverageModeConfigPublicKey;
function getProtectedMakerModeConfigPublicKey(programId) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('protected_maker_mode_config'))
    ], programId)[0];
}
exports.getProtectedMakerModeConfigPublicKey = getProtectedMakerModeConfigPublicKey;
function getIfRebalanceConfigPublicKey(programId, inMarketIndex, outMarketIndex) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('if_rebalance_config')),
        new anchor_1.BN(inMarketIndex).toArrayLike(Buffer, 'le', 2),
        new anchor_1.BN(outMarketIndex).toArrayLike(Buffer, 'le', 2)
    ], programId)[0];
}
exports.getIfRebalanceConfigPublicKey = getIfRebalanceConfigPublicKey;
function getRevenueShareAccountPublicKey(programId, authority) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('REV_SHARE')),
        authority.toBuffer()
    ], programId)[0];
}
exports.getRevenueShareAccountPublicKey = getRevenueShareAccountPublicKey;
function getRevenueShareEscrowAccountPublicKey(programId, authority) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('REV_ESCROW')),
        authority.toBuffer()
    ], programId)[0];
}
exports.getRevenueShareEscrowAccountPublicKey = getRevenueShareEscrowAccountPublicKey;
function getLpPoolPublicKey(programId, lpPoolId) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('lp_pool')),
        new anchor.BN(lpPoolId).toArrayLike(Buffer, 'le', 1)
    ], programId)[0];
}
exports.getLpPoolPublicKey = getLpPoolPublicKey;
function getLpPoolTokenVaultPublicKey(programId, lpPool) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('LP_POOL_TOKEN_VAULT')),
        lpPool.toBuffer()
    ], programId)[0];
}
exports.getLpPoolTokenVaultPublicKey = getLpPoolTokenVaultPublicKey;
function getAmmConstituentMappingPublicKey(programId, lpPoolPublicKey) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('AMM_MAP')),
        lpPoolPublicKey.toBuffer()
    ], programId)[0];
}
exports.getAmmConstituentMappingPublicKey = getAmmConstituentMappingPublicKey;
function getConstituentTargetBasePublicKey(programId, lpPoolPublicKey) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('constituent_target_base_seed')),
        lpPoolPublicKey.toBuffer()
    ], programId)[0];
}
exports.getConstituentTargetBasePublicKey = getConstituentTargetBasePublicKey;
function getConstituentPublicKey(programId, lpPoolPublicKey, spotMarketIndex) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('CONSTITUENT')),
        lpPoolPublicKey.toBuffer(),
        new anchor.BN(spotMarketIndex).toArrayLike(Buffer, 'le', 2)
    ], programId)[0];
}
exports.getConstituentPublicKey = getConstituentPublicKey;
function getConstituentVaultPublicKey(programId, lpPoolPublicKey, spotMarketIndex) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('CONSTITUENT_VAULT')),
        lpPoolPublicKey.toBuffer(),
        new anchor.BN(spotMarketIndex).toArrayLike(Buffer, 'le', 2)
    ], programId)[0];
}
exports.getConstituentVaultPublicKey = getConstituentVaultPublicKey;
function getAmmCachePublicKey(programId) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('amm_cache_seed'))
    ], programId)[0];
}
exports.getAmmCachePublicKey = getAmmCachePublicKey;
function getConstituentCorrelationsPublicKey(programId, lpPoolPublicKey) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from(anchor.utils.bytes.utf8.encode('constituent_correlations')),
        lpPoolPublicKey.toBuffer()
    ], programId)[0];
}
exports.getConstituentCorrelationsPublicKey = getConstituentCorrelationsPublicKey;
async function getLpPoolTokenTokenAccountPublicKey(lpPoolTokenMint, authority) {
    return await (0, spl_token_1.getAssociatedTokenAddress)(lpPoolTokenMint, authority, true);
}
exports.getLpPoolTokenTokenAccountPublicKey = getLpPoolTokenTokenAccountPublicKey;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/wallet.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WalletV2 = exports.Wallet = void 0;
const tweetnacl_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/tweetnacl@1.0.3/node_modules/tweetnacl/nacl-fast.js [app-route] (ecmascript)"));
class Wallet {
    constructor(payer){
        this.payer = payer;
    }
    async signTransaction(tx) {
        tx.partialSign(this.payer);
        return tx;
    }
    async signVersionedTransaction(tx) {
        tx.sign([
            this.payer
        ]);
        return tx;
    }
    async signAllTransactions(txs) {
        return txs.map((t)=>{
            t.partialSign(this.payer);
            return t;
        });
    }
    async signAllVersionedTransactions(txs) {
        return txs.map((t)=>{
            t.sign([
                this.payer
            ]);
            return t;
        });
    }
    get publicKey() {
        return this.payer.publicKey;
    }
}
exports.Wallet = Wallet;
class WalletV2 extends Wallet {
    constructor(payer){
        super(payer);
        this.payer = payer;
    }
    async signMessage(message) {
        return Buffer.from(tweetnacl_1.default.sign.detached(message, this.payer.secretKey));
    }
}
exports.WalletV2 = WalletV2;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/userName.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeName = exports.encodeName = exports.DEFAULT_MARKET_NAME = exports.DEFAULT_USER_NAME = exports.MAX_NAME_LENGTH = void 0;
exports.MAX_NAME_LENGTH = 32;
exports.DEFAULT_USER_NAME = 'Main Account';
exports.DEFAULT_MARKET_NAME = 'Default Market Name';
function encodeName(name) {
    if (name.length > exports.MAX_NAME_LENGTH) {
        throw Error(`Name (${name}) longer than 32 characters`);
    }
    const buffer = Buffer.alloc(32);
    buffer.fill(name);
    buffer.fill(' ', name.length);
    return Array(...buffer);
}
exports.encodeName = encodeName;
function decodeName(bytes) {
    const buffer = Buffer.from(bytes);
    return buffer.toString('utf8').trim();
}
exports.decodeName = decodeName;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/memcmp.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getConstituentLpPoolFilter = exports.getConstituentFilter = exports.getRevenueShareEscrowFilter = exports.getSpotMarketAccountsFilter = exports.getPerpMarketAccountsFilter = exports.getSignedMsgUserOrdersFilter = exports.getUserStatsIsReferredOrReferrerFilter = exports.getUserStatsIsReferredFilter = exports.getUserStatsFilter = exports.getUsersWithPoolId = exports.getUserWithName = exports.getUserThatHasBeenLP = exports.getUserWithAuctionFilter = exports.getUserWithoutOrderFilter = exports.getUserWithOrderFilter = exports.getNonIdleUserFilter = exports.getUserFilter = void 0;
const bs58_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/bs58@4.0.1/node_modules/bs58/index.js [app-route] (ecmascript)"));
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const userName_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/userName.js [app-route] (ecmascript)");
function getUserFilter() {
    return {
        memcmp: {
            offset: 0,
            bytes: bs58_1.default.encode(anchor_1.BorshAccountsCoder.accountDiscriminator('User'))
        }
    };
}
exports.getUserFilter = getUserFilter;
function getNonIdleUserFilter() {
    return {
        memcmp: {
            offset: 4350,
            bytes: bs58_1.default.encode(Uint8Array.from([
                0
            ]))
        }
    };
}
exports.getNonIdleUserFilter = getNonIdleUserFilter;
function getUserWithOrderFilter() {
    return {
        memcmp: {
            offset: 4352,
            bytes: bs58_1.default.encode(Uint8Array.from([
                1
            ]))
        }
    };
}
exports.getUserWithOrderFilter = getUserWithOrderFilter;
function getUserWithoutOrderFilter() {
    return {
        memcmp: {
            offset: 4352,
            bytes: bs58_1.default.encode(Uint8Array.from([
                0
            ]))
        }
    };
}
exports.getUserWithoutOrderFilter = getUserWithoutOrderFilter;
function getUserWithAuctionFilter() {
    return {
        memcmp: {
            offset: 4354,
            bytes: bs58_1.default.encode(Uint8Array.from([
                1
            ]))
        }
    };
}
exports.getUserWithAuctionFilter = getUserWithAuctionFilter;
function getUserThatHasBeenLP() {
    return {
        memcmp: {
            offset: 4267,
            bytes: bs58_1.default.encode(Uint8Array.from([
                99
            ]))
        }
    };
}
exports.getUserThatHasBeenLP = getUserThatHasBeenLP;
function getUserWithName(name) {
    return {
        memcmp: {
            offset: 72,
            bytes: bs58_1.default.encode(Uint8Array.from((0, userName_1.encodeName)(name)))
        }
    };
}
exports.getUserWithName = getUserWithName;
function getUsersWithPoolId(poolId) {
    return {
        memcmp: {
            offset: 4356,
            bytes: bs58_1.default.encode(Uint8Array.from([
                poolId
            ]))
        }
    };
}
exports.getUsersWithPoolId = getUsersWithPoolId;
function getUserStatsFilter() {
    return {
        memcmp: {
            offset: 0,
            bytes: bs58_1.default.encode(anchor_1.BorshAccountsCoder.accountDiscriminator('UserStats'))
        }
    };
}
exports.getUserStatsFilter = getUserStatsFilter;
function getUserStatsIsReferredFilter() {
    return {
        memcmp: {
            offset: 188,
            bytes: bs58_1.default.encode(Buffer.from(Uint8Array.from([
                2
            ])))
        }
    };
}
exports.getUserStatsIsReferredFilter = getUserStatsIsReferredFilter;
function getUserStatsIsReferredOrReferrerFilter() {
    return {
        memcmp: {
            offset: 188,
            bytes: bs58_1.default.encode(Buffer.from(Uint8Array.from([
                3
            ])))
        }
    };
}
exports.getUserStatsIsReferredOrReferrerFilter = getUserStatsIsReferredOrReferrerFilter;
function getSignedMsgUserOrdersFilter() {
    return {
        memcmp: {
            offset: 0,
            bytes: bs58_1.default.encode(anchor_1.BorshAccountsCoder.accountDiscriminator('SignedMsgUserOrders'))
        }
    };
}
exports.getSignedMsgUserOrdersFilter = getSignedMsgUserOrdersFilter;
function getPerpMarketAccountsFilter() {
    return {
        memcmp: {
            offset: 0,
            bytes: bs58_1.default.encode(anchor_1.BorshAccountsCoder.accountDiscriminator('PerpMarket'))
        }
    };
}
exports.getPerpMarketAccountsFilter = getPerpMarketAccountsFilter;
function getSpotMarketAccountsFilter() {
    return {
        memcmp: {
            offset: 0,
            bytes: bs58_1.default.encode(anchor_1.BorshAccountsCoder.accountDiscriminator('SpotMarket'))
        }
    };
}
exports.getSpotMarketAccountsFilter = getSpotMarketAccountsFilter;
function getRevenueShareEscrowFilter() {
    return {
        memcmp: {
            offset: 0,
            bytes: bs58_1.default.encode(anchor_1.BorshAccountsCoder.accountDiscriminator('RevenueShareEscrow'))
        }
    };
}
exports.getRevenueShareEscrowFilter = getRevenueShareEscrowFilter;
function getConstituentFilter() {
    return {
        memcmp: {
            offset: 0,
            bytes: bs58_1.default.encode(anchor_1.BorshAccountsCoder.accountDiscriminator('Constituent'))
        }
    };
}
exports.getConstituentFilter = getConstituentFilter;
function getConstituentLpPoolFilter(lpPoolPublicKey) {
    return {
        memcmp: {
            offset: 72,
            bytes: lpPoolPublicKey.toBase58()
        }
    };
}
exports.getConstituentLpPoolFilter = getConstituentLpPoolFilter;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/util/promiseTimeout.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.promiseTimeout = void 0;
function promiseTimeout(promise, timeoutMs) {
    let timeoutId;
    const timeoutPromise = new Promise((resolve)=>{
        timeoutId = setTimeout(()=>resolve(null), timeoutMs);
    });
    return Promise.race([
        promise,
        timeoutPromise
    ]).then((result)=>{
        clearTimeout(timeoutId);
        return result;
    });
}
exports.promiseTimeout = promiseTimeout;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/util/computeUnits.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.containsComputeUnitIxs = exports.isSetComputeUnitPriceIx = exports.isSetComputeUnitsIx = exports.findComputeUnitConsumption = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
async function findComputeUnitConsumption(programId, connection, txSignature, commitment = 'confirmed') {
    const tx = await connection.getTransaction(txSignature, {
        commitment
    });
    const computeUnits = [];
    const regex = new RegExp(`Program ${programId.toString()} consumed ([0-9]{0,6}) of ([0-9]{0,7}) compute units`);
    tx.meta.logMessages.forEach((logMessage)=>{
        const match = logMessage.match(regex);
        if (match && match[1]) {
            computeUnits.push(match[1]);
        }
    });
    return computeUnits;
}
exports.findComputeUnitConsumption = findComputeUnitConsumption;
function isSetComputeUnitsIx(ix) {
    // Compute budget program discriminator is first byte
    // 2: set compute unit limit
    // 3: set compute unit price
    if (ix.programId.equals(web3_js_1.ComputeBudgetProgram.programId) && // @ts-ignore
    ix.data.at(0) === 2) {
        return true;
    }
    return false;
}
exports.isSetComputeUnitsIx = isSetComputeUnitsIx;
function isSetComputeUnitPriceIx(ix) {
    // Compute budget program discriminator is first byte
    // 2: set compute unit limit
    // 3: set compute unit price
    if (ix.programId.equals(web3_js_1.ComputeBudgetProgram.programId) && // @ts-ignore
    ix.data.at(0) === 3) {
        return true;
    }
    return false;
}
exports.isSetComputeUnitPriceIx = isSetComputeUnitPriceIx;
function containsComputeUnitIxs(ixs) {
    return {
        hasSetComputeUnitLimitIx: ixs.some(isSetComputeUnitsIx),
        hasSetComputeUnitPriceIx: ixs.some(isSetComputeUnitPriceIx)
    };
}
exports.containsComputeUnitIxs = containsComputeUnitIxs;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/util/pythOracleUtils.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFeedIdUint8Array = exports.trimFeedId = void 0;
function trimFeedId(feedId) {
    if (feedId.startsWith('0x')) {
        return feedId.slice(2);
    }
    return feedId;
}
exports.trimFeedId = trimFeedId;
function getFeedIdUint8Array(feedId) {
    const trimmedFeedId = trimFeedId(feedId);
    return Uint8Array.from(Buffer.from(trimmedFeedId, 'hex'));
}
exports.getFeedIdUint8Array = getFeedIdUint8Array;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/util/ed25519Utils.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createMinimalEd25519VerifyIx = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const BufferLayout = __importStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)"));
const ED25519_INSTRUCTION_LEN = 16;
const SIGNATURE_LEN = 64;
const PUBKEY_LEN = 32;
const MAGIC_LEN = 4;
const MESSAGE_SIZE_LEN = 2;
const readUint16LE = (data, offset)=>{
    return data[offset] | data[offset + 1] << 8;
};
const ED25519_INSTRUCTION_LAYOUT = BufferLayout.struct([
    BufferLayout.u8('numSignatures'),
    BufferLayout.u8('padding'),
    BufferLayout.u16('signatureOffset'),
    BufferLayout.u16('signatureInstructionIndex'),
    BufferLayout.u16('publicKeyOffset'),
    BufferLayout.u16('publicKeyInstructionIndex'),
    BufferLayout.u16('messageDataOffset'),
    BufferLayout.u16('messageDataSize'),
    BufferLayout.u16('messageInstructionIndex')
]);
/**
 * Constructs a minimal Ed25519 verification instruction that references the data
 * inside the drift custom instruction (e.g. postPythLazerOracleUpdate, placeSignedMsgTakerOrder).
 *
 * @param customInstructionIndex The index of the custom instruction in the transaction (e.g. if tx contains compute budget limit, compute budget price, ed25519 verify, custom ix, this would be 3).
 * @param messageOffset The offset within the custom instruction data where the signed message begins.
 * @param customInstructionData The entire instruction data array for the custom instruction.
 */ function createMinimalEd25519VerifyIx(customInstructionIndex, messageOffset, customInstructionData, magicLen) {
    const signatureOffset = messageOffset + (magicLen === undefined ? MAGIC_LEN : magicLen);
    const publicKeyOffset = signatureOffset + SIGNATURE_LEN;
    const messageDataSizeOffset = publicKeyOffset + PUBKEY_LEN;
    const messageDataOffset = messageDataSizeOffset + MESSAGE_SIZE_LEN;
    const messageDataSize = readUint16LE(customInstructionData, messageDataSizeOffset - messageOffset);
    const instructionData = Buffer.alloc(ED25519_INSTRUCTION_LEN);
    ED25519_INSTRUCTION_LAYOUT.encode({
        numSignatures: 1,
        padding: 0,
        signatureOffset,
        signatureInstructionIndex: customInstructionIndex,
        publicKeyOffset,
        publicKeyInstructionIndex: customInstructionIndex,
        messageDataOffset,
        messageDataSize: messageDataSize,
        messageInstructionIndex: customInstructionIndex
    }, instructionData);
    return new web3_js_1.TransactionInstruction({
        keys: [],
        programId: web3_js_1.Ed25519Program.programId,
        data: instructionData
    });
}
exports.createMinimalEd25519VerifyIx = createMinimalEd25519VerifyIx;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/util/digest.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateSignedMsgUuid = exports.digestSignature = exports.digest = void 0;
const crypto_1 = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
const nanoid_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/nanoid@3.3.4/node_modules/nanoid/index.cjs [app-route] (ecmascript)");
function digest(data) {
    const hash = (0, crypto_1.createHash)('sha256');
    hash.update(data);
    return hash.digest();
}
exports.digest = digest;
function digestSignature(signature) {
    return (0, crypto_1.createHash)('sha256').update(signature).digest('base64');
}
exports.digestSignature = digestSignature;
function generateSignedMsgUuid() {
    return Uint8Array.from(Buffer.from((0, nanoid_1.nanoid)(8)));
}
exports.generateSignedMsgUuid = generateSignedMsgUuid;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/util/tps.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.estimateTps = void 0;
async function estimateTps(programId, connection, failed) {
    let signatures = await connection.getSignaturesForAddress(programId, undefined, 'finalized');
    if (failed) {
        signatures = signatures.filter((signature)=>signature.err);
    }
    const numberOfSignatures = signatures.length;
    if (numberOfSignatures === 0) {
        return 0;
    }
    return numberOfSignatures / (signatures[0].blockTime - signatures[numberOfSignatures - 1].blockTime);
}
exports.estimateTps = estimateTps;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/util/chainClock.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChainClock = void 0;
class ChainClock {
    constructor(props){
        this._state = new Map();
        props.forEach((prop)=>{
            this._state.set(prop.commitment, prop);
        });
    }
    update(props) {
        const state = this._state.get(props.commitment);
        if (state) {
            if (props.blockHeight) state.blockHeight = props.blockHeight;
            if (props.slot) state.slot = props.slot;
            if (props.ts) state.ts = props.ts;
        } else {
            this._state.set(props.commitment, props);
        }
    }
    getState(commitment) {
        return this._state.get(commitment);
    }
}
exports.ChainClock = ChainClock;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/util/TransactionConfirmationManager.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TransactionConfirmationManager = void 0;
const config_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/config.js [app-route] (ecmascript)");
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/types.js [app-route] (ecmascript)");
const txConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/txConstants.js [app-route] (ecmascript)");
const reportTransactionError_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/reportTransactionError.js [app-route] (ecmascript)");
const promiseTimeout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/util/promiseTimeout.js [app-route] (ecmascript)");
const confirmationStatusValues = {
    processed: 0,
    confirmed: 1,
    finalized: 2
};
/**
 * Class to await for transaction confirmations in an optimised manner. It tracks a shared list of all pending transactions and fetches them in bulk in a shared RPC request whenever they have an "overlapping" polling interval. E.g. tx1 with an interval of 200ms and tx2 with an interval of 300ms (if sent at the same time) will be fetched together at 600ms, 1200ms, 1800ms, etc.
 */ class TransactionConfirmationManager {
    constructor(connection){
        this.pendingConfirmations = new Map();
        this.intervalId = null;
        this.connection = connection;
    }
    async confirmTransactionWebSocket(txSig, timeout = 30000, desiredConfirmationStatus = config_1.DEFAULT_CONFIRMATION_OPTS.commitment) {
        const start = Date.now();
        const subscriptionCommitment = desiredConfirmationStatus || config_1.DEFAULT_CONFIRMATION_OPTS.commitment;
        let response = null;
        let subscriptionId;
        const confirmationPromise = new Promise((resolve, reject)=>{
            try {
                subscriptionId = this.connection.onSignature(txSig, (result, context)=>{
                    response = {
                        context,
                        value: result
                    };
                    resolve(null);
                }, subscriptionCommitment);
            } catch (err) {
                reject(err);
            }
        });
        // We do a one-shot confirmation check just in case the transaction is ALREADY confirmed when we create the websocket confirmation .. We want to run this concurrently with the onSignature subscription. If this returns true then we can return early as the transaction has already been confirmed.
        const oneShotConfirmationPromise = this.connection.getSignatureStatuses([
            txSig
        ]);
        const resolveReference = {};
        // This is the promise we are waiting on to resolve the overall confirmation. It will resolve the faster of a positive oneShot confirmation, or the websocket confirmation, or the timeout.
        const overallWaitingForConfirmationPromise = new Promise((resolve)=>{
            resolveReference.resolve = resolve;
        });
        // Await for the one shot confirmation and resolve the waiting promise if we get a positive confirmation result
        oneShotConfirmationPromise.then(async (oneShotResponse)=>{
            var _a, _b;
            if (!oneShotResponse || !((_a = oneShotResponse === null || oneShotResponse === void 0 ? void 0 : oneShotResponse.value) === null || _a === void 0 ? void 0 : _a[0])) return;
            const resultValue = oneShotResponse.value[0];
            if (resultValue.err) {
                await (0, reportTransactionError_1.throwTransactionError)(txSig, this.connection);
            }
            if (this.checkStatusMatchesDesiredConfirmationStatus(resultValue, desiredConfirmationStatus)) {
                response = {
                    context: oneShotResponse.context,
                    value: oneShotResponse.value[0]
                };
                (_b = resolveReference.resolve) === null || _b === void 0 ? void 0 : _b.call(resolveReference);
            }
        }, (onRejected)=>{
            throw onRejected;
        });
        // Await for the websocket confirmation with the configured timeout
        (0, promiseTimeout_1.promiseTimeout)(confirmationPromise, timeout).then(()=>{
            var _a;
            (_a = resolveReference.resolve) === null || _a === void 0 ? void 0 : _a.call(resolveReference);
        }, (onRejected)=>{
            throw onRejected;
        });
        try {
            await overallWaitingForConfirmationPromise;
        } finally{
            if (subscriptionId !== undefined) {
                this.connection.removeSignatureListener(subscriptionId);
            }
        }
        const duration = (Date.now() - start) / 1000;
        if (response === null) {
            throw new types_1.TxSendError(`Transaction was not confirmed in ${duration.toFixed(2)} seconds. It is unknown if it succeeded or failed. Check signature ${txSig} using the Solana Explorer or CLI tools.`, txConstants_1.NOT_CONFIRMED_ERROR_CODE);
        }
        return response;
    }
    async confirmTransactionPolling(txSig, desiredConfirmationStatus = config_1.DEFAULT_CONFIRMATION_OPTS.commitment, timeout = 30000, pollInterval = 1000, searchTransactionHistory = false) {
        // Interval must be > 400ms and a multiple of 100ms
        if (pollInterval < 400 || pollInterval % 100 !== 0) {
            throw new Error('Transaction confirmation polling interval must be at least 400ms and a multiple of 100ms');
        }
        return new Promise((resolve, reject)=>{
            this.pendingConfirmations.set(txSig, {
                txSig,
                desiredConfirmationStatus,
                timeout,
                pollInterval,
                searchTransactionHistory,
                startTime: Date.now(),
                resolve,
                reject
            });
            if (!this.intervalId) {
                this.startConfirmationLoop();
            }
        });
    }
    startConfirmationLoop() {
        this.intervalId = setInterval(()=>this.checkPendingConfirmations(), 100);
    }
    async checkPendingConfirmations() {
        const now = Date.now();
        const transactionsToCheck = [];
        for (const [txSig, request] of this.pendingConfirmations.entries()){
            if (now - request.startTime >= request.timeout) {
                request.reject(new Error(`Transaction confirmation timeout after ${request.timeout}ms`));
                this.pendingConfirmations.delete(txSig);
            } else if ((now - request.startTime) % request.pollInterval < 100) {
                transactionsToCheck.push(request);
            }
        }
        if (transactionsToCheck.length > 0) {
            await this.checkTransactionStatuses(transactionsToCheck);
        }
        if (this.pendingConfirmations.size === 0 && this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
    checkStatusMatchesDesiredConfirmationStatus(status, desiredConfirmationStatus) {
        if (status.confirmationStatus && confirmationStatusValues[status.confirmationStatus] >= confirmationStatusValues[desiredConfirmationStatus]) {
            return true;
        }
        return false;
    }
    async checkTransactionStatuses(requests) {
        const txSigs = requests.map((request)=>request.txSig);
        const { value: statuses } = await this.connection.getSignatureStatuses(txSigs, {
            searchTransactionHistory: requests.some((req)=>req.searchTransactionHistory)
        });
        if (!statuses || statuses.length !== txSigs.length) {
            throw new Error('Failed to get signature statuses');
        }
        for(let i = 0; i < statuses.length; i++){
            const status = statuses[i];
            const request = requests[i];
            if (status === null) {
                continue;
            }
            if (status.err) {
                this.pendingConfirmations.delete(request.txSig);
                request.reject(await (0, reportTransactionError_1.getTransactionErrorFromTxSig)(request.txSig, this.connection));
                continue;
            }
            if (confirmationStatusValues[status.confirmationStatus] === undefined || confirmationStatusValues[request.desiredConfirmationStatus] === undefined) {
                throw new Error(`Invalid confirmation status when awaiting confirmation: ${status.confirmationStatus}`);
            }
            if (this.checkStatusMatchesDesiredConfirmationStatus(status, request.desiredConfirmationStatus)) {
                request.resolve(status);
                this.pendingConfirmations.delete(request.txSig);
            }
        }
    }
}
exports.TransactionConfirmationManager = TransactionConfirmationManager;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/token/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseTokenAccount = void 0;
const spl_token_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.4.13_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/index.js [app-route] (ecmascript)");
function parseTokenAccount(data, pubkey) {
    // mock AccountInfo so unpackAccount can be used
    const accountInfo = {
        data,
        owner: spl_token_1.TOKEN_PROGRAM_ID,
        executable: false,
        lamports: 0
    };
    return (0, spl_token_1.unpackAccount)(pubkey, accountInfo, spl_token_1.TOKEN_PROGRAM_ID);
}
exports.parseTokenAccount = parseTokenAccount;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/isomorphic/grpc.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createClient = void 0;
// Export a function to create a new Client instance
function createClient(..._args) {
    throw new Error('Only available in node context');
}
exports.createClient = createClient;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/user.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.User = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const position_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/position.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const bigNum_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/factory/bigNum.js [app-route] (ecmascript)");
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const position_2 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/position.js [app-route] (ecmascript)");
const market_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/market.js [app-route] (ecmascript)");
const margin_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/margin.js [app-route] (ecmascript)");
const spotMarket_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/spotMarket.js [app-route] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/utils.js [app-route] (ecmascript)");
const spotBalance_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/spotBalance.js [app-route] (ecmascript)");
const trade_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/trade.js [app-route] (ecmascript)");
const types_2 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const orders_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/orders.js [app-route] (ecmascript)");
const websocketProgramUserAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/websocketProgramUserAccountSubscriber.js [app-route] (ecmascript)");
const spotBalance_2 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/spotBalance.js [app-route] (ecmascript)");
const margin_2 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/margin.js [app-route] (ecmascript)");
const pollingUserAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/pollingUserAccountSubscriber.js [app-route] (ecmascript)");
const webSocketUserAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketUserAccountSubscriber.js [app-route] (ecmascript)");
const spotPosition_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/spotPosition.js [app-route] (ecmascript)");
const oracles_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/oracles.js [app-route] (ecmascript)");
const tiers_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/tiers.js [app-route] (ecmascript)");
const strictOraclePrice_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/strictOraclePrice.js [app-route] (ecmascript)");
const fuel_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/fuel.js [app-route] (ecmascript)");
const grpcUserAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/grpcUserAccountSubscriber.js [app-route] (ecmascript)");
class User {
    get isSubscribed() {
        return this._isSubscribed && this.accountSubscriber.isSubscribed;
    }
    set isSubscribed(val) {
        this._isSubscribed = val;
    }
    constructor(config){
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        this._isSubscribed = false;
        this.driftClient = config.driftClient;
        this.userAccountPublicKey = config.userAccountPublicKey;
        if (((_a = config.accountSubscription) === null || _a === void 0 ? void 0 : _a.type) === 'polling') {
            this.accountSubscriber = new pollingUserAccountSubscriber_1.PollingUserAccountSubscriber(config.driftClient.connection, config.userAccountPublicKey, config.accountSubscription.accountLoader, this.driftClient.program.account.user.coder.accounts.decodeUnchecked.bind(this.driftClient.program.account.user.coder.accounts));
        } else if (((_b = config.accountSubscription) === null || _b === void 0 ? void 0 : _b.type) === 'custom') {
            this.accountSubscriber = config.accountSubscription.userAccountSubscriber;
        } else if (((_c = config.accountSubscription) === null || _c === void 0 ? void 0 : _c.type) === 'grpc') {
            if (config.accountSubscription.grpcMultiUserAccountSubscriber) {
                this.accountSubscriber = config.accountSubscription.grpcMultiUserAccountSubscriber.forUser(config.userAccountPublicKey);
            } else {
                this.accountSubscriber = new grpcUserAccountSubscriber_1.grpcUserAccountSubscriber(config.accountSubscription.grpcConfigs, config.driftClient.program, config.userAccountPublicKey, {
                    resubTimeoutMs: (_d = config.accountSubscription) === null || _d === void 0 ? void 0 : _d.resubTimeoutMs,
                    logResubMessages: (_e = config.accountSubscription) === null || _e === void 0 ? void 0 : _e.logResubMessages
                });
            }
        } else {
            if (((_f = config.accountSubscription) === null || _f === void 0 ? void 0 : _f.type) === 'websocket' && ((_g = config.accountSubscription) === null || _g === void 0 ? void 0 : _g.programUserAccountSubscriber)) {
                this.accountSubscriber = new websocketProgramUserAccountSubscriber_1.WebSocketProgramUserAccountSubscriber(config.driftClient.program, config.userAccountPublicKey, config.accountSubscription.programUserAccountSubscriber);
            } else {
                this.accountSubscriber = new webSocketUserAccountSubscriber_1.WebSocketUserAccountSubscriber(config.driftClient.program, config.userAccountPublicKey, {
                    resubTimeoutMs: (_h = config.accountSubscription) === null || _h === void 0 ? void 0 : _h.resubTimeoutMs,
                    logResubMessages: (_j = config.accountSubscription) === null || _j === void 0 ? void 0 : _j.logResubMessages
                }, (_k = config.accountSubscription) === null || _k === void 0 ? void 0 : _k.commitment);
            }
        }
        this.eventEmitter = this.accountSubscriber.eventEmitter;
    }
    /**
     * Subscribe to User state accounts
     * @returns SusbcriptionSuccess result
     */ async subscribe(userAccount) {
        this.isSubscribed = await this.accountSubscriber.subscribe(userAccount);
        return this.isSubscribed;
    }
    /**
     *	Forces the accountSubscriber to fetch account updates from rpc
     */ async fetchAccounts() {
        await this.accountSubscriber.fetch();
    }
    async unsubscribe() {
        await this.accountSubscriber.unsubscribe();
        this.isSubscribed = false;
    }
    getUserAccount() {
        return this.accountSubscriber.getUserAccountAndSlot().data;
    }
    async forceGetUserAccount() {
        await this.fetchAccounts();
        return this.accountSubscriber.getUserAccountAndSlot().data;
    }
    getUserAccountAndSlot() {
        return this.accountSubscriber.getUserAccountAndSlot();
    }
    getPerpPositionForUserAccount(userAccount, marketIndex) {
        return this.getActivePerpPositionsForUserAccount(userAccount).find((position)=>position.marketIndex === marketIndex);
    }
    /**
     * Gets the user's current position for a given perp market. If the user has no position returns undefined
     * @param marketIndex
     * @returns userPerpPosition
     */ getPerpPosition(marketIndex) {
        const userAccount = this.getUserAccount();
        return this.getPerpPositionForUserAccount(userAccount, marketIndex);
    }
    getPerpPositionOrEmpty(marketIndex) {
        var _a;
        const userAccount = this.getUserAccount();
        return (_a = this.getPerpPositionForUserAccount(userAccount, marketIndex)) !== null && _a !== void 0 ? _a : this.getEmptyPosition(marketIndex);
    }
    getPerpPositionAndSlot(marketIndex) {
        const userAccount = this.getUserAccountAndSlot();
        const perpPosition = this.getPerpPositionForUserAccount(userAccount.data, marketIndex);
        return {
            data: perpPosition,
            slot: userAccount.slot
        };
    }
    getSpotPositionForUserAccount(userAccount, marketIndex) {
        return userAccount.spotPositions.find((position)=>position.marketIndex === marketIndex);
    }
    /**
     * Gets the user's current position for a given spot market. If the user has no position returns undefined
     * @param marketIndex
     * @returns userSpotPosition
     */ getSpotPosition(marketIndex) {
        const userAccount = this.getUserAccount();
        return this.getSpotPositionForUserAccount(userAccount, marketIndex);
    }
    getSpotPositionAndSlot(marketIndex) {
        const userAccount = this.getUserAccountAndSlot();
        const spotPosition = this.getSpotPositionForUserAccount(userAccount.data, marketIndex);
        return {
            data: spotPosition,
            slot: userAccount.slot
        };
    }
    getEmptySpotPosition(marketIndex) {
        return {
            marketIndex,
            scaledBalance: numericConstants_1.ZERO,
            balanceType: types_2.SpotBalanceType.DEPOSIT,
            cumulativeDeposits: numericConstants_1.ZERO,
            openAsks: numericConstants_1.ZERO,
            openBids: numericConstants_1.ZERO,
            openOrders: 0
        };
    }
    /**
     * Returns the token amount for a given market. The spot market precision is based on the token mint decimals.
     * Positive if it is a deposit, negative if it is a borrow.
     *
     * @param marketIndex
     */ getTokenAmount(marketIndex) {
        const spotPosition = this.getSpotPosition(marketIndex);
        if (spotPosition === undefined) {
            return numericConstants_1.ZERO;
        }
        const spotMarket = this.driftClient.getSpotMarketAccount(marketIndex);
        return (0, spotBalance_1.getSignedTokenAmount)((0, spotBalance_2.getTokenAmount)(spotPosition.scaledBalance, spotMarket, spotPosition.balanceType), spotPosition.balanceType);
    }
    getEmptyPosition(marketIndex) {
        return {
            baseAssetAmount: numericConstants_1.ZERO,
            remainderBaseAssetAmount: 0,
            lastCumulativeFundingRate: numericConstants_1.ZERO,
            marketIndex,
            quoteAssetAmount: numericConstants_1.ZERO,
            quoteEntryAmount: numericConstants_1.ZERO,
            quoteBreakEvenAmount: numericConstants_1.ZERO,
            openOrders: 0,
            openBids: numericConstants_1.ZERO,
            openAsks: numericConstants_1.ZERO,
            settledPnl: numericConstants_1.ZERO,
            lpShares: numericConstants_1.ZERO,
            lastBaseAssetAmountPerLp: numericConstants_1.ZERO,
            lastQuoteAssetAmountPerLp: numericConstants_1.ZERO,
            perLpBase: 0,
            maxMarginRatio: 0,
            isolatedPositionScaledBalance: numericConstants_1.ZERO,
            positionFlag: 0
        };
    }
    getClonedPosition(position) {
        const clonedPosition = Object.assign({}, position);
        return clonedPosition;
    }
    getOrderForUserAccount(userAccount, orderId) {
        return userAccount.orders.find((order)=>order.orderId === orderId);
    }
    /**
     * @param orderId
     * @returns Order
     */ getOrder(orderId) {
        const userAccount = this.getUserAccount();
        return this.getOrderForUserAccount(userAccount, orderId);
    }
    getOrderAndSlot(orderId) {
        const userAccount = this.getUserAccountAndSlot();
        const order = this.getOrderForUserAccount(userAccount.data, orderId);
        return {
            data: order,
            slot: userAccount.slot
        };
    }
    getOrderByUserIdForUserAccount(userAccount, userOrderId) {
        return userAccount.orders.find((order)=>order.userOrderId === userOrderId);
    }
    /**
     * @param userOrderId
     * @returns Order
     */ getOrderByUserOrderId(userOrderId) {
        const userAccount = this.getUserAccount();
        return this.getOrderByUserIdForUserAccount(userAccount, userOrderId);
    }
    getOrderByUserOrderIdAndSlot(userOrderId) {
        const userAccount = this.getUserAccountAndSlot();
        const order = this.getOrderByUserIdForUserAccount(userAccount.data, userOrderId);
        return {
            data: order,
            slot: userAccount.slot
        };
    }
    getOpenOrdersForUserAccount(userAccount) {
        return userAccount === null || userAccount === void 0 ? void 0 : userAccount.orders.filter((order)=>(0, types_1.isVariant)(order.status, 'open'));
    }
    getOpenOrders() {
        const userAccount = this.getUserAccount();
        return this.getOpenOrdersForUserAccount(userAccount);
    }
    getOpenOrdersAndSlot() {
        const userAccount = this.getUserAccountAndSlot();
        const openOrders = this.getOpenOrdersForUserAccount(userAccount.data);
        return {
            data: openOrders,
            slot: userAccount.slot
        };
    }
    getUserAccountPublicKey() {
        return this.userAccountPublicKey;
    }
    async exists() {
        const userAccountRPCResponse = await this.driftClient.connection.getParsedAccountInfo(this.userAccountPublicKey);
        return userAccountRPCResponse.value !== null;
    }
    /**
     * calculates the total open bids/asks in a perp market (including lps)
     * @returns : open bids
     * @returns : open asks
     */ getPerpBidAsks(marketIndex) {
        const position = this.getPerpPosition(marketIndex);
        const totalOpenBids = position.openBids;
        const totalOpenAsks = position.openAsks;
        return [
            totalOpenBids,
            totalOpenAsks
        ];
    }
    /**
     * calculates Buying Power = free collateral / initial margin ratio
     * @returns : Precision QUOTE_PRECISION
     */ getPerpBuyingPower(marketIndex, collateralBuffer = numericConstants_1.ZERO, enterHighLeverageMode = undefined, maxMarginRatio = undefined) {
        const perpPosition = this.getPerpPositionOrEmpty(marketIndex);
        const perpMarket = this.driftClient.getPerpMarketAccount(marketIndex);
        const oraclePriceData = this.getOracleDataForPerpMarket(marketIndex);
        const worstCaseBaseAssetAmount = perpPosition ? (0, margin_2.calculateWorstCaseBaseAssetAmount)(perpPosition, perpMarket, oraclePriceData.price) : numericConstants_1.ZERO;
        const freeCollateral = this.getFreeCollateral('Initial', enterHighLeverageMode).sub(collateralBuffer);
        return this.getPerpBuyingPowerFromFreeCollateralAndBaseAssetAmount(marketIndex, freeCollateral, worstCaseBaseAssetAmount, enterHighLeverageMode, maxMarginRatio || perpPosition.maxMarginRatio);
    }
    getPerpBuyingPowerFromFreeCollateralAndBaseAssetAmount(marketIndex, freeCollateral, baseAssetAmount, enterHighLeverageMode = undefined, perpMarketMaxMarginRatio = undefined) {
        const maxMarginRatio = Math.max(perpMarketMaxMarginRatio, this.getUserAccount().maxMarginRatio);
        const marginRatio = (0, market_1.calculateMarketMarginRatio)(this.driftClient.getPerpMarketAccount(marketIndex), baseAssetAmount, 'Initial', maxMarginRatio, enterHighLeverageMode || this.isHighLeverageMode('Initial'));
        return freeCollateral.mul(numericConstants_1.MARGIN_PRECISION).div(new anchor_1.BN(marginRatio));
    }
    /**
     * calculates Free Collateral = Total collateral - margin requirement
     * @returns : Precision QUOTE_PRECISION
     */ getFreeCollateral(marginCategory = 'Initial', enterHighLeverageMode = undefined) {
        const totalCollateral = this.getTotalCollateral(marginCategory, true);
        const marginRequirement = marginCategory === 'Initial' ? this.getInitialMarginRequirement(enterHighLeverageMode) : this.getMaintenanceMarginRequirement();
        const freeCollateral = totalCollateral.sub(marginRequirement);
        return freeCollateral.gte(numericConstants_1.ZERO) ? freeCollateral : numericConstants_1.ZERO;
    }
    /**
     * @returns The margin requirement of a certain type (Initial or Maintenance) in USDC. : QUOTE_PRECISION
     */ getMarginRequirement(marginCategory, liquidationBuffer, strict = false, includeOpenOrders = true, enteringHighLeverage = undefined) {
        return this.getTotalPerpPositionLiability(marginCategory, liquidationBuffer, includeOpenOrders, strict, enteringHighLeverage).add(this.getSpotMarketLiabilityValue(undefined, marginCategory, liquidationBuffer, includeOpenOrders, strict));
    }
    /**
     * @returns The initial margin requirement in USDC. : QUOTE_PRECISION
     */ getInitialMarginRequirement(enterHighLeverageMode = undefined) {
        return this.getMarginRequirement('Initial', undefined, true, undefined, enterHighLeverageMode);
    }
    /**
     * @returns The maintenance margin requirement in USDC. : QUOTE_PRECISION
     */ getMaintenanceMarginRequirement(liquidationBuffer) {
        return this.getMarginRequirement('Maintenance', liquidationBuffer);
    }
    getActivePerpPositionsForUserAccount(userAccount) {
        return userAccount.perpPositions.filter((pos)=>!pos.baseAssetAmount.eq(numericConstants_1.ZERO) || !pos.quoteAssetAmount.eq(numericConstants_1.ZERO) || !(pos.openOrders == 0));
    }
    getActivePerpPositions() {
        const userAccount = this.getUserAccount();
        return this.getActivePerpPositionsForUserAccount(userAccount);
    }
    getActivePerpPositionsAndSlot() {
        const userAccount = this.getUserAccountAndSlot();
        const positions = this.getActivePerpPositionsForUserAccount(userAccount.data);
        return {
            data: positions,
            slot: userAccount.slot
        };
    }
    getActiveSpotPositionsForUserAccount(userAccount) {
        return userAccount.spotPositions.filter((pos)=>!(0, spotPosition_1.isSpotPositionAvailable)(pos));
    }
    getActiveSpotPositions() {
        const userAccount = this.getUserAccount();
        return this.getActiveSpotPositionsForUserAccount(userAccount);
    }
    getActiveSpotPositionsAndSlot() {
        const userAccount = this.getUserAccountAndSlot();
        const positions = this.getActiveSpotPositionsForUserAccount(userAccount.data);
        return {
            data: positions,
            slot: userAccount.slot
        };
    }
    /**
     * calculates unrealized position price pnl
     * @returns : Precision QUOTE_PRECISION
     */ getUnrealizedPNL(withFunding, marketIndex, withWeightMarginCategory, strict = false, liquidationBuffer) {
        return this.getActivePerpPositions().filter((pos)=>marketIndex !== undefined ? pos.marketIndex === marketIndex : true).reduce((unrealizedPnl, perpPosition)=>{
            const market = this.driftClient.getPerpMarketAccount(perpPosition.marketIndex);
            const oraclePriceData = this.getMMOracleDataForPerpMarket(market.marketIndex);
            const quoteSpotMarket = this.driftClient.getSpotMarketAccount(market.quoteSpotMarketIndex);
            const quoteOraclePriceData = this.getOracleDataForSpotMarket(market.quoteSpotMarketIndex);
            let positionUnrealizedPnl = (0, position_2.calculatePositionPNL)(market, perpPosition, withFunding, oraclePriceData);
            let quotePrice;
            if (strict && positionUnrealizedPnl.gt(numericConstants_1.ZERO)) {
                quotePrice = anchor_1.BN.min(quoteOraclePriceData.price, quoteSpotMarket.historicalOracleData.lastOraclePriceTwap5Min);
            } else if (strict && positionUnrealizedPnl.lt(numericConstants_1.ZERO)) {
                quotePrice = anchor_1.BN.max(quoteOraclePriceData.price, quoteSpotMarket.historicalOracleData.lastOraclePriceTwap5Min);
            } else {
                quotePrice = quoteOraclePriceData.price;
            }
            positionUnrealizedPnl = positionUnrealizedPnl.mul(quotePrice).div(numericConstants_1.PRICE_PRECISION);
            if (withWeightMarginCategory !== undefined) {
                if (positionUnrealizedPnl.gt(numericConstants_1.ZERO)) {
                    positionUnrealizedPnl = positionUnrealizedPnl.mul((0, market_1.calculateUnrealizedAssetWeight)(market, quoteSpotMarket, positionUnrealizedPnl, withWeightMarginCategory, oraclePriceData)).div(new anchor_1.BN(numericConstants_1.SPOT_MARKET_WEIGHT_PRECISION));
                }
                if (liquidationBuffer && positionUnrealizedPnl.lt(numericConstants_1.ZERO)) {
                    positionUnrealizedPnl = positionUnrealizedPnl.add(positionUnrealizedPnl.mul(liquidationBuffer).div(numericConstants_1.MARGIN_PRECISION));
                }
            }
            return unrealizedPnl.add(positionUnrealizedPnl);
        }, numericConstants_1.ZERO);
    }
    /**
     * calculates unrealized funding payment pnl
     * @returns : Precision QUOTE_PRECISION
     */ getUnrealizedFundingPNL(marketIndex) {
        return this.getUserAccount().perpPositions.filter((pos)=>marketIndex !== undefined ? pos.marketIndex === marketIndex : true).reduce((pnl, perpPosition)=>{
            const market = this.driftClient.getPerpMarketAccount(perpPosition.marketIndex);
            return pnl.add((0, position_1.calculateUnsettledFundingPnl)(market, perpPosition));
        }, numericConstants_1.ZERO);
    }
    getFuelBonus(now, includeSettled = true, includeUnsettled = true, givenUserStats) {
        const userAccount = this.getUserAccount();
        const result = {
            insuranceFuel: numericConstants_1.ZERO,
            takerFuel: numericConstants_1.ZERO,
            makerFuel: numericConstants_1.ZERO,
            depositFuel: numericConstants_1.ZERO,
            borrowFuel: numericConstants_1.ZERO,
            positionFuel: numericConstants_1.ZERO
        };
        const userStats = givenUserStats !== null && givenUserStats !== void 0 ? givenUserStats : this.driftClient.getUserStats();
        const userStatsAccount = userStats.getAccount();
        if (includeSettled) {
            result.takerFuel = result.takerFuel.add(new anchor_1.BN(userStatsAccount.fuelTaker));
            result.makerFuel = result.makerFuel.add(new anchor_1.BN(userStatsAccount.fuelMaker));
            result.depositFuel = result.depositFuel.add(new anchor_1.BN(userStatsAccount.fuelDeposits));
            result.borrowFuel = result.borrowFuel.add(new anchor_1.BN(userStatsAccount.fuelBorrows));
            result.positionFuel = result.positionFuel.add(new anchor_1.BN(userStatsAccount.fuelPositions));
        }
        if (includeUnsettled) {
            const fuelBonusNumerator = anchor_1.BN.max(now.sub(anchor_1.BN.max(new anchor_1.BN(userAccount.lastFuelBonusUpdateTs), numericConstants_1.FUEL_START_TS)), numericConstants_1.ZERO);
            if (fuelBonusNumerator.gt(numericConstants_1.ZERO)) {
                for (const spotPosition of this.getActiveSpotPositions()){
                    const spotMarketAccount = this.driftClient.getSpotMarketAccount(spotPosition.marketIndex);
                    const tokenAmount = this.getTokenAmount(spotPosition.marketIndex);
                    const oraclePriceData = this.getOracleDataForSpotMarket(spotPosition.marketIndex);
                    const twap5min = (0, oracles_1.calculateLiveOracleTwap)(spotMarketAccount.historicalOracleData, oraclePriceData, now, numericConstants_1.FIVE_MINUTE // 5MIN
                    );
                    const strictOraclePrice = new strictOraclePrice_1.StrictOraclePrice(oraclePriceData.price, twap5min);
                    const signedTokenValue = (0, spotBalance_1.getStrictTokenValue)(tokenAmount, spotMarketAccount.decimals, strictOraclePrice);
                    if (signedTokenValue.gt(numericConstants_1.ZERO)) {
                        result.depositFuel = result.depositFuel.add((0, fuel_1.calculateSpotFuelBonus)(spotMarketAccount, signedTokenValue, fuelBonusNumerator));
                    } else {
                        result.borrowFuel = result.borrowFuel.add((0, fuel_1.calculateSpotFuelBonus)(spotMarketAccount, signedTokenValue, fuelBonusNumerator));
                    }
                }
                for (const perpPosition of this.getActivePerpPositions()){
                    const oraclePriceData = this.getMMOracleDataForPerpMarket(perpPosition.marketIndex);
                    const perpMarketAccount = this.driftClient.getPerpMarketAccount(perpPosition.marketIndex);
                    const baseAssetValue = this.getPerpPositionValue(perpPosition.marketIndex, oraclePriceData, false);
                    result.positionFuel = result.positionFuel.add((0, fuel_1.calculatePerpFuelBonus)(perpMarketAccount, baseAssetValue, fuelBonusNumerator));
                }
            }
        }
        result.insuranceFuel = userStats.getInsuranceFuelBonus(now, includeSettled, includeUnsettled);
        return result;
    }
    getSpotMarketAssetAndLiabilityValue(marketIndex, marginCategory, liquidationBuffer, includeOpenOrders, strict = false, now) {
        now = now || new anchor_1.BN(new Date().getTime() / 1000);
        let netQuoteValue = numericConstants_1.ZERO;
        let totalAssetValue = numericConstants_1.ZERO;
        let totalLiabilityValue = numericConstants_1.ZERO;
        for (const spotPosition of this.getUserAccount().spotPositions){
            const countForBase = marketIndex === undefined || spotPosition.marketIndex === marketIndex;
            const countForQuote = marketIndex === undefined || marketIndex === numericConstants_1.QUOTE_SPOT_MARKET_INDEX || includeOpenOrders && spotPosition.openOrders !== 0;
            if ((0, spotPosition_1.isSpotPositionAvailable)(spotPosition) || !countForBase && !countForQuote) {
                continue;
            }
            const spotMarketAccount = this.driftClient.getSpotMarketAccount(spotPosition.marketIndex);
            const oraclePriceData = this.getOracleDataForSpotMarket(spotPosition.marketIndex);
            let twap5min;
            if (strict) {
                twap5min = (0, oracles_1.calculateLiveOracleTwap)(spotMarketAccount.historicalOracleData, oraclePriceData, now, numericConstants_1.FIVE_MINUTE // 5MIN
                );
            }
            const strictOraclePrice = new strictOraclePrice_1.StrictOraclePrice(oraclePriceData.price, twap5min);
            if (spotPosition.marketIndex === numericConstants_1.QUOTE_SPOT_MARKET_INDEX && countForQuote) {
                const tokenAmount = (0, spotBalance_1.getSignedTokenAmount)((0, spotBalance_2.getTokenAmount)(spotPosition.scaledBalance, spotMarketAccount, spotPosition.balanceType), spotPosition.balanceType);
                if ((0, types_1.isVariant)(spotPosition.balanceType, 'borrow')) {
                    const weightedTokenValue = this.getSpotLiabilityValue(tokenAmount, strictOraclePrice, spotMarketAccount, marginCategory, liquidationBuffer).abs();
                    netQuoteValue = netQuoteValue.sub(weightedTokenValue);
                } else {
                    const weightedTokenValue = this.getSpotAssetValue(tokenAmount, strictOraclePrice, spotMarketAccount, marginCategory);
                    netQuoteValue = netQuoteValue.add(weightedTokenValue);
                }
                continue;
            }
            if (!includeOpenOrders && countForBase) {
                if ((0, types_1.isVariant)(spotPosition.balanceType, 'borrow')) {
                    const tokenAmount = (0, spotBalance_1.getSignedTokenAmount)((0, spotBalance_2.getTokenAmount)(spotPosition.scaledBalance, spotMarketAccount, spotPosition.balanceType), types_2.SpotBalanceType.BORROW);
                    const liabilityValue = this.getSpotLiabilityValue(tokenAmount, strictOraclePrice, spotMarketAccount, marginCategory, liquidationBuffer).abs();
                    totalLiabilityValue = totalLiabilityValue.add(liabilityValue);
                    continue;
                } else {
                    const tokenAmount = (0, spotBalance_2.getTokenAmount)(spotPosition.scaledBalance, spotMarketAccount, spotPosition.balanceType);
                    const assetValue = this.getSpotAssetValue(tokenAmount, strictOraclePrice, spotMarketAccount, marginCategory);
                    totalAssetValue = totalAssetValue.add(assetValue);
                    continue;
                }
            }
            const { tokenAmount: worstCaseTokenAmount, ordersValue: worstCaseQuoteTokenAmount } = (0, spotPosition_1.getWorstCaseTokenAmounts)(spotPosition, spotMarketAccount, strictOraclePrice, marginCategory, this.getUserAccount().maxMarginRatio);
            if (worstCaseTokenAmount.gt(numericConstants_1.ZERO) && countForBase) {
                const baseAssetValue = this.getSpotAssetValue(worstCaseTokenAmount, strictOraclePrice, spotMarketAccount, marginCategory);
                totalAssetValue = totalAssetValue.add(baseAssetValue);
            }
            if (worstCaseTokenAmount.lt(numericConstants_1.ZERO) && countForBase) {
                const baseLiabilityValue = this.getSpotLiabilityValue(worstCaseTokenAmount, strictOraclePrice, spotMarketAccount, marginCategory, liquidationBuffer).abs();
                totalLiabilityValue = totalLiabilityValue.add(baseLiabilityValue);
            }
            if (worstCaseQuoteTokenAmount.gt(numericConstants_1.ZERO) && countForQuote) {
                netQuoteValue = netQuoteValue.add(worstCaseQuoteTokenAmount);
            }
            if (worstCaseQuoteTokenAmount.lt(numericConstants_1.ZERO) && countForQuote) {
                let weight = numericConstants_1.SPOT_MARKET_WEIGHT_PRECISION;
                if (marginCategory === 'Initial') {
                    weight = anchor_1.BN.max(weight, new anchor_1.BN(this.getUserAccount().maxMarginRatio));
                }
                const weightedTokenValue = worstCaseQuoteTokenAmount.abs().mul(weight).div(numericConstants_1.SPOT_MARKET_WEIGHT_PRECISION);
                netQuoteValue = netQuoteValue.sub(weightedTokenValue);
            }
            totalLiabilityValue = totalLiabilityValue.add(new anchor_1.BN(spotPosition.openOrders).mul(numericConstants_1.OPEN_ORDER_MARGIN_REQUIREMENT));
        }
        if (marketIndex === undefined || marketIndex === numericConstants_1.QUOTE_SPOT_MARKET_INDEX) {
            if (netQuoteValue.gt(numericConstants_1.ZERO)) {
                totalAssetValue = totalAssetValue.add(netQuoteValue);
            } else {
                totalLiabilityValue = totalLiabilityValue.add(netQuoteValue.abs());
            }
        }
        return {
            totalAssetValue,
            totalLiabilityValue
        };
    }
    getSpotMarketLiabilityValue(marketIndex, marginCategory, liquidationBuffer, includeOpenOrders, strict = false, now) {
        const { totalLiabilityValue } = this.getSpotMarketAssetAndLiabilityValue(marketIndex, marginCategory, liquidationBuffer, includeOpenOrders, strict, now);
        return totalLiabilityValue;
    }
    getSpotLiabilityValue(tokenAmount, strictOraclePrice, spotMarketAccount, marginCategory, liquidationBuffer) {
        return (0, spotBalance_2.getSpotLiabilityValue)(tokenAmount, strictOraclePrice, spotMarketAccount, this.getUserAccount().maxMarginRatio, marginCategory, liquidationBuffer);
    }
    getSpotMarketAssetValue(marketIndex, marginCategory, includeOpenOrders, strict = false, now) {
        const { totalAssetValue } = this.getSpotMarketAssetAndLiabilityValue(marketIndex, marginCategory, undefined, includeOpenOrders, strict, now);
        return totalAssetValue;
    }
    getSpotAssetValue(tokenAmount, strictOraclePrice, spotMarketAccount, marginCategory) {
        return (0, spotBalance_2.getSpotAssetValue)(tokenAmount, strictOraclePrice, spotMarketAccount, this.getUserAccount().maxMarginRatio, marginCategory);
    }
    getSpotPositionValue(marketIndex, marginCategory, includeOpenOrders, strict = false, now) {
        const { totalAssetValue, totalLiabilityValue } = this.getSpotMarketAssetAndLiabilityValue(marketIndex, marginCategory, undefined, includeOpenOrders, strict, now);
        return totalAssetValue.sub(totalLiabilityValue);
    }
    getNetSpotMarketValue(withWeightMarginCategory) {
        const { totalAssetValue, totalLiabilityValue } = this.getSpotMarketAssetAndLiabilityValue(undefined, withWeightMarginCategory);
        return totalAssetValue.sub(totalLiabilityValue);
    }
    /**
     * calculates TotalCollateral: collateral + unrealized pnl
     * @returns : Precision QUOTE_PRECISION
     */ getTotalCollateral(marginCategory = 'Initial', strict = false, includeOpenOrders = true, liquidationBuffer) {
        return this.getSpotMarketAssetValue(undefined, marginCategory, includeOpenOrders, strict).add(this.getUnrealizedPNL(true, undefined, marginCategory, strict, liquidationBuffer));
    }
    getLiquidationBuffer() {
        // if user being liq'd, can continue to be liq'd until total collateral above the margin requirement plus buffer
        let liquidationBuffer = undefined;
        if (this.isBeingLiquidated()) {
            liquidationBuffer = new anchor_1.BN(this.driftClient.getStateAccount().liquidationMarginBufferRatio);
        }
        return liquidationBuffer;
    }
    /**
     * calculates User Health by comparing total collateral and maint. margin requirement
     * @returns : number (value from [0, 100])
     */ getHealth() {
        if (this.isBeingLiquidated()) {
            return 0;
        }
        const totalCollateral = this.getTotalCollateral('Maintenance');
        const maintenanceMarginReq = this.getMaintenanceMarginRequirement();
        let health;
        if (maintenanceMarginReq.eq(numericConstants_1.ZERO) && totalCollateral.gte(numericConstants_1.ZERO)) {
            health = 100;
        } else if (totalCollateral.lte(numericConstants_1.ZERO)) {
            health = 0;
        } else {
            health = Math.round(Math.min(100, Math.max(0, (1 - maintenanceMarginReq.toNumber() / totalCollateral.toNumber()) * 100)));
        }
        return health;
    }
    calculateWeightedPerpPositionLiability(perpPosition, marginCategory, liquidationBuffer, includeOpenOrders, strict = false, enteringHighLeverage = undefined) {
        const market = this.driftClient.getPerpMarketAccount(perpPosition.marketIndex);
        let valuationPrice = this.getOracleDataForPerpMarket(market.marketIndex).price;
        if ((0, types_1.isVariant)(market.status, 'settlement')) {
            valuationPrice = market.expiryPrice;
        }
        let baseAssetAmount;
        let liabilityValue;
        if (includeOpenOrders) {
            const { worstCaseBaseAssetAmount, worstCaseLiabilityValue } = (0, margin_1.calculateWorstCasePerpLiabilityValue)(perpPosition, market, valuationPrice);
            baseAssetAmount = worstCaseBaseAssetAmount;
            liabilityValue = worstCaseLiabilityValue;
        } else {
            baseAssetAmount = perpPosition.baseAssetAmount;
            liabilityValue = (0, margin_1.calculatePerpLiabilityValue)(baseAssetAmount, valuationPrice, (0, types_1.isVariant)(market.contractType, 'prediction'));
        }
        if (marginCategory) {
            const userCustomMargin = Math.max(perpPosition.maxMarginRatio, this.getUserAccount().maxMarginRatio);
            let marginRatio = new anchor_1.BN((0, market_1.calculateMarketMarginRatio)(market, baseAssetAmount.abs(), marginCategory, enteringHighLeverage === false ? Math.max(market.marginRatioInitial, userCustomMargin) : userCustomMargin, this.isHighLeverageMode(marginCategory) || enteringHighLeverage === true));
            if (liquidationBuffer !== undefined) {
                marginRatio = marginRatio.add(liquidationBuffer);
            }
            if ((0, types_1.isVariant)(market.status, 'settlement')) {
                marginRatio = numericConstants_1.ZERO;
            }
            const quoteSpotMarket = this.driftClient.getSpotMarketAccount(market.quoteSpotMarketIndex);
            const quoteOraclePriceData = this.driftClient.getOracleDataForSpotMarket(numericConstants_1.QUOTE_SPOT_MARKET_INDEX);
            let quotePrice;
            if (strict) {
                quotePrice = anchor_1.BN.max(quoteOraclePriceData.price, quoteSpotMarket.historicalOracleData.lastOraclePriceTwap5Min);
            } else {
                quotePrice = quoteOraclePriceData.price;
            }
            liabilityValue = liabilityValue.mul(quotePrice).div(numericConstants_1.PRICE_PRECISION).mul(marginRatio).div(numericConstants_1.MARGIN_PRECISION);
            if (includeOpenOrders) {
                liabilityValue = liabilityValue.add(new anchor_1.BN(perpPosition.openOrders).mul(numericConstants_1.OPEN_ORDER_MARGIN_REQUIREMENT));
            }
        }
        return liabilityValue;
    }
    /**
     * calculates position value of a single perp market in margin system
     * @returns : Precision QUOTE_PRECISION
     */ getPerpMarketLiabilityValue(marketIndex, marginCategory, liquidationBuffer, includeOpenOrders, strict = false) {
        const perpPosition = this.getPerpPosition(marketIndex);
        return this.calculateWeightedPerpPositionLiability(perpPosition, marginCategory, liquidationBuffer, includeOpenOrders, strict);
    }
    /**
     * calculates sum of position value across all positions in margin system
     * @returns : Precision QUOTE_PRECISION
     */ getTotalPerpPositionLiability(marginCategory, liquidationBuffer, includeOpenOrders, strict = false, enteringHighLeverage = undefined) {
        return this.getActivePerpPositions().reduce((totalPerpValue, perpPosition)=>{
            const baseAssetValue = this.calculateWeightedPerpPositionLiability(perpPosition, marginCategory, liquidationBuffer, includeOpenOrders, strict, enteringHighLeverage);
            return totalPerpValue.add(baseAssetValue);
        }, numericConstants_1.ZERO);
    }
    /**
     * calculates position value based on oracle
     * @returns : Precision QUOTE_PRECISION
     */ getPerpPositionValue(marketIndex, oraclePriceData, includeOpenOrders = false) {
        const userPosition = this.getPerpPositionOrEmpty(marketIndex);
        const market = this.driftClient.getPerpMarketAccount(userPosition.marketIndex);
        return (0, margin_2.calculateBaseAssetValueWithOracle)(market, userPosition, oraclePriceData, includeOpenOrders);
    }
    /**
     * calculates position liabiltiy value in margin system
     * @returns : Precision QUOTE_PRECISION
     */ getPerpLiabilityValue(marketIndex, oraclePriceData, includeOpenOrders = false) {
        const userPosition = this.getPerpPositionOrEmpty(marketIndex);
        const market = this.driftClient.getPerpMarketAccount(userPosition.marketIndex);
        if (includeOpenOrders) {
            return (0, margin_1.calculateWorstCasePerpLiabilityValue)(userPosition, market, oraclePriceData.price).worstCaseLiabilityValue;
        } else {
            return (0, margin_1.calculatePerpLiabilityValue)(userPosition.baseAssetAmount, oraclePriceData.price, (0, types_1.isVariant)(market.contractType, 'prediction'));
        }
    }
    getPositionSide(currentPosition) {
        if (currentPosition.baseAssetAmount.gt(numericConstants_1.ZERO)) {
            return types_2.PositionDirection.LONG;
        } else if (currentPosition.baseAssetAmount.lt(numericConstants_1.ZERO)) {
            return types_2.PositionDirection.SHORT;
        } else {
            return undefined;
        }
    }
    /**
     * calculates average exit price (optionally for closing up to 100% of position)
     * @returns : Precision PRICE_PRECISION
     */ getPositionEstimatedExitPriceAndPnl(position, amountToClose, useAMMClose = false) {
        const market = this.driftClient.getPerpMarketAccount(position.marketIndex);
        const entryPrice = (0, position_1.calculateEntryPrice)(position);
        const oraclePriceData = this.getMMOracleDataForPerpMarket(position.marketIndex);
        if (amountToClose) {
            if (amountToClose.eq(numericConstants_1.ZERO)) {
                return [
                    (0, market_1.calculateReservePrice)(market, oraclePriceData),
                    numericConstants_1.ZERO
                ];
            }
            position = {
                baseAssetAmount: amountToClose,
                lastCumulativeFundingRate: position.lastCumulativeFundingRate,
                marketIndex: position.marketIndex,
                quoteAssetAmount: position.quoteAssetAmount
            };
        }
        let baseAssetValue;
        if (useAMMClose) {
            baseAssetValue = (0, position_2.calculateBaseAssetValue)(market, position, oraclePriceData);
        } else {
            baseAssetValue = (0, margin_2.calculateBaseAssetValueWithOracle)(market, position, oraclePriceData);
        }
        if (position.baseAssetAmount.eq(numericConstants_1.ZERO)) {
            return [
                numericConstants_1.ZERO,
                numericConstants_1.ZERO
            ];
        }
        const exitPrice = baseAssetValue.mul(numericConstants_1.AMM_TO_QUOTE_PRECISION_RATIO).mul(numericConstants_1.PRICE_PRECISION).div(position.baseAssetAmount.abs());
        const pnlPerBase = exitPrice.sub(entryPrice);
        const pnl = pnlPerBase.mul(position.baseAssetAmount).div(numericConstants_1.PRICE_PRECISION).div(numericConstants_1.AMM_TO_QUOTE_PRECISION_RATIO);
        return [
            exitPrice,
            pnl
        ];
    }
    /**
     * calculates current user leverage which is (total liability size) / (net asset value)
     * @returns : Precision TEN_THOUSAND
     */ getLeverage(includeOpenOrders = true) {
        return this.calculateLeverageFromComponents(this.getLeverageComponents(includeOpenOrders));
    }
    calculateLeverageFromComponents({ perpLiabilityValue, perpPnl, spotAssetValue, spotLiabilityValue }) {
        const totalLiabilityValue = perpLiabilityValue.add(spotLiabilityValue);
        const totalAssetValue = spotAssetValue.add(perpPnl);
        const netAssetValue = totalAssetValue.sub(spotLiabilityValue);
        if (netAssetValue.eq(numericConstants_1.ZERO)) {
            return numericConstants_1.ZERO;
        }
        return totalLiabilityValue.mul(numericConstants_1.TEN_THOUSAND).div(netAssetValue);
    }
    getLeverageComponents(includeOpenOrders = true, marginCategory = undefined) {
        const perpLiability = this.getTotalPerpPositionLiability(marginCategory, undefined, includeOpenOrders);
        const perpPnl = this.getUnrealizedPNL(true, undefined, marginCategory);
        const { totalAssetValue: spotAssetValue, totalLiabilityValue: spotLiabilityValue } = this.getSpotMarketAssetAndLiabilityValue(undefined, marginCategory, undefined, includeOpenOrders);
        return {
            perpLiabilityValue: perpLiability,
            perpPnl,
            spotAssetValue,
            spotLiabilityValue
        };
    }
    isDustDepositPosition(spotMarketAccount) {
        const marketIndex = spotMarketAccount.marketIndex;
        const spotPosition = this.getSpotPosition(spotMarketAccount.marketIndex);
        if ((0, spotPosition_1.isSpotPositionAvailable)(spotPosition)) {
            return false;
        }
        const depositAmount = this.getTokenAmount(spotMarketAccount.marketIndex);
        if (depositAmount.lte(numericConstants_1.ZERO)) {
            return false;
        }
        const oraclePriceData = this.getOracleDataForSpotMarket(marketIndex);
        const strictOraclePrice = new strictOraclePrice_1.StrictOraclePrice(oraclePriceData.price, oraclePriceData.twap);
        const balanceValue = this.getSpotAssetValue(depositAmount, strictOraclePrice, spotMarketAccount);
        if (balanceValue.lt(numericConstants_1.DUST_POSITION_SIZE)) {
            return true;
        }
        return false;
    }
    getSpotMarketAccountsWithDustPosition() {
        const spotMarketAccounts = this.driftClient.getSpotMarketAccounts();
        const dustPositionAccounts = [];
        for (const spotMarketAccount of spotMarketAccounts){
            const isDust = this.isDustDepositPosition(spotMarketAccount);
            if (isDust) {
                dustPositionAccounts.push(spotMarketAccount);
            }
        }
        return dustPositionAccounts;
    }
    getTotalLiabilityValue(marginCategory) {
        return this.getTotalPerpPositionLiability(marginCategory, undefined, true).add(this.getSpotMarketLiabilityValue(undefined, marginCategory, undefined, true));
    }
    getTotalAssetValue(marginCategory) {
        return this.getSpotMarketAssetValue(undefined, marginCategory, true).add(this.getUnrealizedPNL(true, undefined, marginCategory));
    }
    getNetUsdValue() {
        const netSpotValue = this.getNetSpotMarketValue();
        const unrealizedPnl = this.getUnrealizedPNL(true, undefined, undefined);
        return netSpotValue.add(unrealizedPnl);
    }
    /**
     * Calculates the all time P&L of the user.
     *
     * Net withdraws + Net spot market value + Net unrealized P&L -
     */ getTotalAllTimePnl() {
        const netUsdValue = this.getNetUsdValue();
        const totalDeposits = this.getUserAccount().totalDeposits;
        const totalWithdraws = this.getUserAccount().totalWithdraws;
        const totalPnl = netUsdValue.add(totalWithdraws).sub(totalDeposits);
        return totalPnl;
    }
    /**
     * calculates max allowable leverage exceeding hitting requirement category
     * for large sizes where imf factor activates, result is a lower bound
     * @param marginCategory {Initial, Maintenance}
     * @param isLp if calculating max leveraging for adding lp, need to add buffer
     * @param enterHighLeverageMode can pass this as true to calculate max leverage if the user was to enter high leverage mode
     * @returns : Precision TEN_THOUSAND
     */ getMaxLeverageForPerp(perpMarketIndex, _marginCategory = 'Initial', isLp = false, enterHighLeverageMode = undefined) {
        const market = this.driftClient.getPerpMarketAccount(perpMarketIndex);
        const marketPrice = this.driftClient.getOracleDataForPerpMarket(perpMarketIndex).price;
        const { perpLiabilityValue, perpPnl, spotAssetValue, spotLiabilityValue } = this.getLeverageComponents();
        const totalAssetValue = spotAssetValue.add(perpPnl);
        const netAssetValue = totalAssetValue.sub(spotLiabilityValue);
        if (netAssetValue.eq(numericConstants_1.ZERO)) {
            return numericConstants_1.ZERO;
        }
        const totalLiabilityValue = perpLiabilityValue.add(spotLiabilityValue);
        const lpBuffer = isLp ? marketPrice.mul(market.amm.orderStepSize).div(numericConstants_1.AMM_RESERVE_PRECISION) : numericConstants_1.ZERO;
        // absolute max fesible size (upper bound)
        const maxSizeQuote = anchor_1.BN.max(anchor_1.BN.min(this.getMaxTradeSizeUSDCForPerp(perpMarketIndex, types_2.PositionDirection.LONG, false, enterHighLeverageMode || this.isHighLeverageMode('Initial')).tradeSize, this.getMaxTradeSizeUSDCForPerp(perpMarketIndex, types_2.PositionDirection.SHORT, false, enterHighLeverageMode || this.isHighLeverageMode('Initial')).tradeSize).sub(lpBuffer), numericConstants_1.ZERO);
        return totalLiabilityValue.add(maxSizeQuote).mul(numericConstants_1.TEN_THOUSAND).div(netAssetValue);
    }
    /**
     * calculates max allowable leverage exceeding hitting requirement category
     * @param spotMarketIndex
     * @param direction
     * @returns : Precision TEN_THOUSAND
     */ getMaxLeverageForSpot(spotMarketIndex, direction) {
        const { perpLiabilityValue, perpPnl, spotAssetValue, spotLiabilityValue } = this.getLeverageComponents();
        const totalLiabilityValue = perpLiabilityValue.add(spotLiabilityValue);
        const totalAssetValue = spotAssetValue.add(perpPnl);
        const netAssetValue = totalAssetValue.sub(spotLiabilityValue);
        if (netAssetValue.eq(numericConstants_1.ZERO)) {
            return numericConstants_1.ZERO;
        }
        const currentQuoteAssetValue = this.getSpotMarketAssetValue(numericConstants_1.QUOTE_SPOT_MARKET_INDEX);
        const currentQuoteLiabilityValue = this.getSpotMarketLiabilityValue(numericConstants_1.QUOTE_SPOT_MARKET_INDEX);
        const currentQuoteValue = currentQuoteAssetValue.sub(currentQuoteLiabilityValue);
        const currentSpotMarketAssetValue = this.getSpotMarketAssetValue(spotMarketIndex);
        const currentSpotMarketLiabilityValue = this.getSpotMarketLiabilityValue(spotMarketIndex);
        const currentSpotMarketNetValue = currentSpotMarketAssetValue.sub(currentSpotMarketLiabilityValue);
        const tradeQuoteAmount = this.getMaxTradeSizeUSDCForSpot(spotMarketIndex, direction, currentQuoteAssetValue, currentSpotMarketNetValue);
        let assetValueToAdd = numericConstants_1.ZERO;
        let liabilityValueToAdd = numericConstants_1.ZERO;
        const newQuoteNetValue = (0, types_1.isVariant)(direction, 'short') ? currentQuoteValue.add(tradeQuoteAmount) : currentQuoteValue.sub(tradeQuoteAmount);
        const newQuoteAssetValue = anchor_1.BN.max(newQuoteNetValue, numericConstants_1.ZERO);
        const newQuoteLiabilityValue = anchor_1.BN.min(newQuoteNetValue, numericConstants_1.ZERO).abs();
        assetValueToAdd = assetValueToAdd.add(newQuoteAssetValue.sub(currentQuoteAssetValue));
        liabilityValueToAdd = liabilityValueToAdd.add(newQuoteLiabilityValue.sub(currentQuoteLiabilityValue));
        const newSpotMarketNetValue = (0, types_1.isVariant)(direction, 'long') ? currentSpotMarketNetValue.add(tradeQuoteAmount) : currentSpotMarketNetValue.sub(tradeQuoteAmount);
        const newSpotMarketAssetValue = anchor_1.BN.max(newSpotMarketNetValue, numericConstants_1.ZERO);
        const newSpotMarketLiabilityValue = anchor_1.BN.min(newSpotMarketNetValue, numericConstants_1.ZERO).abs();
        assetValueToAdd = assetValueToAdd.add(newSpotMarketAssetValue.sub(currentSpotMarketAssetValue));
        liabilityValueToAdd = liabilityValueToAdd.add(newSpotMarketLiabilityValue.sub(currentSpotMarketLiabilityValue));
        const finalTotalAssetValue = totalAssetValue.add(assetValueToAdd);
        const finalTotalSpotLiability = spotLiabilityValue.add(liabilityValueToAdd);
        const finalTotalLiabilityValue = totalLiabilityValue.add(liabilityValueToAdd);
        const finalNetAssetValue = finalTotalAssetValue.sub(finalTotalSpotLiability);
        return finalTotalLiabilityValue.mul(numericConstants_1.TEN_THOUSAND).div(finalNetAssetValue);
    }
    /**
     * calculates margin ratio: 1 / leverage
     * @returns : Precision TEN_THOUSAND
     */ getMarginRatio() {
        const { perpLiabilityValue, perpPnl, spotAssetValue, spotLiabilityValue } = this.getLeverageComponents();
        const totalLiabilityValue = perpLiabilityValue.add(spotLiabilityValue);
        const totalAssetValue = spotAssetValue.add(perpPnl);
        if (totalLiabilityValue.eq(numericConstants_1.ZERO)) {
            return numericConstants_1.BN_MAX;
        }
        const netAssetValue = totalAssetValue.sub(spotLiabilityValue);
        return netAssetValue.mul(numericConstants_1.TEN_THOUSAND).div(totalLiabilityValue);
    }
    canBeLiquidated() {
        const liquidationBuffer = this.getLiquidationBuffer();
        const totalCollateral = this.getTotalCollateral('Maintenance', undefined, undefined, liquidationBuffer);
        const marginRequirement = this.getMaintenanceMarginRequirement(liquidationBuffer);
        const canBeLiquidated = totalCollateral.lt(marginRequirement);
        return {
            canBeLiquidated,
            marginRequirement,
            totalCollateral
        };
    }
    isBeingLiquidated() {
        return (this.getUserAccount().status & (types_1.UserStatus.BEING_LIQUIDATED | types_1.UserStatus.BANKRUPT)) > 0;
    }
    hasStatus(status) {
        return (this.getUserAccount().status & status) > 0;
    }
    isBankrupt() {
        return (this.getUserAccount().status & types_1.UserStatus.BANKRUPT) > 0;
    }
    isHighLeverageMode(marginCategory) {
        return (0, types_1.isVariant)(this.getUserAccount().marginMode, 'highLeverage') || marginCategory === 'Maintenance' && (0, types_1.isVariant)(this.getUserAccount().marginMode, 'highLeverageMaintenance');
    }
    /**
     * Checks if any user position cumulative funding differs from respective market cumulative funding
     * @returns
     */ needsToSettleFundingPayment() {
        for (const userPosition of this.getUserAccount().perpPositions){
            if (userPosition.baseAssetAmount.eq(numericConstants_1.ZERO)) {
                continue;
            }
            const market = this.driftClient.getPerpMarketAccount(userPosition.marketIndex);
            if (market.amm.cumulativeFundingRateLong.eq(userPosition.lastCumulativeFundingRate) || market.amm.cumulativeFundingRateShort.eq(userPosition.lastCumulativeFundingRate)) {
                continue;
            }
            return true;
        }
        return false;
    }
    /**
     * Calculate the liquidation price of a spot position
     * @param marketIndex
     * @returns Precision : PRICE_PRECISION
     */ spotLiquidationPrice(marketIndex, positionBaseSizeChange = numericConstants_1.ZERO) {
        const currentSpotPosition = this.getSpotPosition(marketIndex);
        if (!currentSpotPosition) {
            return new anchor_1.BN(-1);
        }
        const totalCollateral = this.getTotalCollateral('Maintenance');
        const maintenanceMarginRequirement = this.getMaintenanceMarginRequirement();
        const freeCollateral = anchor_1.BN.max(numericConstants_1.ZERO, totalCollateral.sub(maintenanceMarginRequirement));
        const market = this.driftClient.getSpotMarketAccount(marketIndex);
        let signedTokenAmount = (0, spotBalance_1.getSignedTokenAmount)((0, spotBalance_2.getTokenAmount)(currentSpotPosition.scaledBalance, market, currentSpotPosition.balanceType), currentSpotPosition.balanceType);
        signedTokenAmount = signedTokenAmount.add(positionBaseSizeChange);
        if (signedTokenAmount.eq(numericConstants_1.ZERO)) {
            return new anchor_1.BN(-1);
        }
        let freeCollateralDelta = this.calculateFreeCollateralDeltaForSpot(market, signedTokenAmount);
        const oracle = market.oracle;
        const perpMarketWithSameOracle = this.driftClient.getPerpMarketAccounts().find((market)=>market.amm.oracle.equals(oracle));
        const oraclePrice = this.driftClient.getOracleDataForSpotMarket(marketIndex).price;
        if (perpMarketWithSameOracle) {
            const perpPosition = this.getPerpPositionOrEmpty(perpMarketWithSameOracle.marketIndex);
            if (perpPosition) {
                let freeCollateralDeltaForPerp = this.calculateFreeCollateralDeltaForPerp(perpMarketWithSameOracle, perpPosition, numericConstants_1.ZERO, oraclePrice);
                if (freeCollateralDeltaForPerp) {
                    const { numerator, denominator } = (0, oracles_1.getMultipleBetweenOracleSources)(market.oracleSource, perpMarketWithSameOracle.amm.oracleSource);
                    freeCollateralDeltaForPerp = freeCollateralDeltaForPerp.mul(numerator).div(denominator);
                }
                freeCollateralDelta = freeCollateralDelta.add(freeCollateralDeltaForPerp || numericConstants_1.ZERO);
            }
        }
        if (freeCollateralDelta.eq(numericConstants_1.ZERO)) {
            return new anchor_1.BN(-1);
        }
        const liqPriceDelta = freeCollateral.mul(numericConstants_1.QUOTE_PRECISION).div(freeCollateralDelta);
        const liqPrice = oraclePrice.sub(liqPriceDelta);
        if (liqPrice.lt(numericConstants_1.ZERO)) {
            return new anchor_1.BN(-1);
        }
        return liqPrice;
    }
    /**
     * Calculate the liquidation price of a perp position, with optional parameter to calculate the liquidation price after a trade
     * @param marketIndex
     * @param positionBaseSizeChange // change in position size to calculate liquidation price for : Precision 10^9
     * @param estimatedEntryPrice
     * @param marginCategory // allow Initial to be passed in if we are trying to calculate price for DLP de-risking
     * @param includeOpenOrders
     * @param offsetCollateral // allows calculating the liquidation price after this offset collateral is added to the user's account (e.g. : what will the liquidation price be for this position AFTER I deposit $x worth of collateral)
     * @returns Precision : PRICE_PRECISION
     */ liquidationPrice(marketIndex, positionBaseSizeChange = numericConstants_1.ZERO, estimatedEntryPrice = numericConstants_1.ZERO, marginCategory = 'Maintenance', includeOpenOrders = false, offsetCollateral = numericConstants_1.ZERO, enteringHighLeverage = undefined) {
        const totalCollateral = this.getTotalCollateral(marginCategory, false, includeOpenOrders);
        const marginRequirement = this.getMarginRequirement(marginCategory, undefined, false, includeOpenOrders, enteringHighLeverage);
        let freeCollateral = anchor_1.BN.max(numericConstants_1.ZERO, totalCollateral.sub(marginRequirement)).add(offsetCollateral);
        const oracle = this.driftClient.getPerpMarketAccount(marketIndex).amm.oracle;
        const oraclePrice = this.driftClient.getOracleDataForPerpMarket(marketIndex).price;
        const market = this.driftClient.getPerpMarketAccount(marketIndex);
        const currentPerpPosition = this.getPerpPositionOrEmpty(marketIndex);
        positionBaseSizeChange = (0, orders_1.standardizeBaseAssetAmount)(positionBaseSizeChange, market.amm.orderStepSize);
        const freeCollateralChangeFromNewPosition = this.calculateEntriesEffectOnFreeCollateral(market, oraclePrice, currentPerpPosition, positionBaseSizeChange, estimatedEntryPrice, includeOpenOrders, enteringHighLeverage);
        freeCollateral = freeCollateral.add(freeCollateralChangeFromNewPosition);
        let freeCollateralDelta = this.calculateFreeCollateralDeltaForPerp(market, currentPerpPosition, positionBaseSizeChange, oraclePrice, marginCategory, includeOpenOrders, enteringHighLeverage);
        if (!freeCollateralDelta) {
            return new anchor_1.BN(-1);
        }
        const spotMarketWithSameOracle = this.driftClient.getSpotMarketAccounts().find((market)=>market.oracle.equals(oracle));
        if (spotMarketWithSameOracle) {
            const spotPosition = this.getSpotPosition(spotMarketWithSameOracle.marketIndex);
            if (spotPosition) {
                const signedTokenAmount = (0, spotBalance_1.getSignedTokenAmount)((0, spotBalance_2.getTokenAmount)(spotPosition.scaledBalance, spotMarketWithSameOracle, spotPosition.balanceType), spotPosition.balanceType);
                let spotFreeCollateralDelta = this.calculateFreeCollateralDeltaForSpot(spotMarketWithSameOracle, signedTokenAmount, marginCategory);
                if (spotFreeCollateralDelta) {
                    const { numerator, denominator } = (0, oracles_1.getMultipleBetweenOracleSources)(market.amm.oracleSource, spotMarketWithSameOracle.oracleSource);
                    spotFreeCollateralDelta = spotFreeCollateralDelta.mul(numerator).div(denominator);
                }
                freeCollateralDelta = freeCollateralDelta.add(spotFreeCollateralDelta || numericConstants_1.ZERO);
            }
        }
        if (freeCollateralDelta.eq(numericConstants_1.ZERO)) {
            return new anchor_1.BN(-1);
        }
        const liqPriceDelta = freeCollateral.mul(numericConstants_1.QUOTE_PRECISION).div(freeCollateralDelta);
        const liqPrice = oraclePrice.sub(liqPriceDelta);
        if (liqPrice.lt(numericConstants_1.ZERO)) {
            return new anchor_1.BN(-1);
        }
        return liqPrice;
    }
    calculateEntriesEffectOnFreeCollateral(market, oraclePrice, perpPosition, positionBaseSizeChange, estimatedEntryPrice, includeOpenOrders, enteringHighLeverage = undefined, marginCategory = 'Maintenance') {
        let freeCollateralChange = numericConstants_1.ZERO;
        // update free collateral to account for change in pnl from new position
        if (!estimatedEntryPrice.eq(numericConstants_1.ZERO) && !positionBaseSizeChange.eq(numericConstants_1.ZERO) && marginCategory === 'Maintenance') {
            const costBasis = oraclePrice.mul(positionBaseSizeChange.abs()).div(numericConstants_1.BASE_PRECISION);
            const newPositionValue = estimatedEntryPrice.mul(positionBaseSizeChange.abs()).div(numericConstants_1.BASE_PRECISION);
            if (positionBaseSizeChange.gt(numericConstants_1.ZERO)) {
                freeCollateralChange = costBasis.sub(newPositionValue);
            } else {
                freeCollateralChange = newPositionValue.sub(costBasis);
            }
            // assume worst fee tier
            const takerFeeTier = this.driftClient.getStateAccount().perpFeeStructure.feeTiers[0];
            const takerFee = newPositionValue.muln(takerFeeTier.feeNumerator).divn(takerFeeTier.feeDenominator);
            freeCollateralChange = freeCollateralChange.sub(takerFee);
        }
        const calculateMarginRequirement = (perpPosition)=>{
            let baseAssetAmount;
            let liabilityValue;
            if (includeOpenOrders) {
                const { worstCaseBaseAssetAmount, worstCaseLiabilityValue } = (0, margin_1.calculateWorstCasePerpLiabilityValue)(perpPosition, market, oraclePrice);
                baseAssetAmount = worstCaseBaseAssetAmount;
                liabilityValue = worstCaseLiabilityValue;
            } else {
                baseAssetAmount = perpPosition.baseAssetAmount;
                liabilityValue = (0, margin_1.calculatePerpLiabilityValue)(baseAssetAmount, oraclePrice, (0, types_1.isVariant)(market.contractType, 'prediction'));
            }
            const userCustomMargin = Math.max(perpPosition.maxMarginRatio, this.getUserAccount().maxMarginRatio);
            const marginRatio = (0, market_1.calculateMarketMarginRatio)(market, baseAssetAmount.abs(), marginCategory, enteringHighLeverage === false ? Math.max(market.marginRatioInitial, userCustomMargin) : userCustomMargin, this.isHighLeverageMode(marginCategory) || enteringHighLeverage === true);
            return liabilityValue.mul(new anchor_1.BN(marginRatio)).div(numericConstants_1.MARGIN_PRECISION);
        };
        const freeCollateralConsumptionBefore = calculateMarginRequirement(perpPosition);
        const perpPositionAfter = Object.assign({}, perpPosition);
        perpPositionAfter.baseAssetAmount = perpPositionAfter.baseAssetAmount.add(positionBaseSizeChange);
        const freeCollateralConsumptionAfter = calculateMarginRequirement(perpPositionAfter);
        return freeCollateralChange.sub(freeCollateralConsumptionAfter.sub(freeCollateralConsumptionBefore));
    }
    calculateFreeCollateralDeltaForPerp(market, perpPosition, positionBaseSizeChange, oraclePrice, marginCategory = 'Maintenance', includeOpenOrders = false, enteringHighLeverage = undefined) {
        const baseAssetAmount = includeOpenOrders ? (0, margin_2.calculateWorstCaseBaseAssetAmount)(perpPosition, market, oraclePrice) : perpPosition.baseAssetAmount;
        // zero if include orders == false
        const orderBaseAssetAmount = baseAssetAmount.sub(perpPosition.baseAssetAmount);
        const proposedBaseAssetAmount = baseAssetAmount.add(positionBaseSizeChange);
        const userCustomMargin = Math.max(perpPosition.maxMarginRatio, this.getUserAccount().maxMarginRatio);
        const marginRatio = (0, market_1.calculateMarketMarginRatio)(market, proposedBaseAssetAmount.abs(), marginCategory, enteringHighLeverage === false ? Math.max(market.marginRatioInitial, userCustomMargin) : userCustomMargin, this.isHighLeverageMode(marginCategory) || enteringHighLeverage === true);
        const marginRatioQuotePrecision = new anchor_1.BN(marginRatio).mul(numericConstants_1.QUOTE_PRECISION).div(numericConstants_1.MARGIN_PRECISION);
        if (proposedBaseAssetAmount.eq(numericConstants_1.ZERO)) {
            return undefined;
        }
        let freeCollateralDelta = numericConstants_1.ZERO;
        if ((0, types_1.isVariant)(market.contractType, 'prediction')) {
            // for prediction market, increase in pnl and margin requirement will net out for position
            // open order margin requirement will change with price though
            if (orderBaseAssetAmount.gt(numericConstants_1.ZERO)) {
                freeCollateralDelta = marginRatioQuotePrecision.neg();
            } else if (orderBaseAssetAmount.lt(numericConstants_1.ZERO)) {
                freeCollateralDelta = marginRatioQuotePrecision;
            }
        } else {
            if (proposedBaseAssetAmount.gt(numericConstants_1.ZERO)) {
                freeCollateralDelta = numericConstants_1.QUOTE_PRECISION.sub(marginRatioQuotePrecision).mul(proposedBaseAssetAmount).div(numericConstants_1.BASE_PRECISION);
            } else {
                freeCollateralDelta = numericConstants_1.QUOTE_PRECISION.neg().sub(marginRatioQuotePrecision).mul(proposedBaseAssetAmount.abs()).div(numericConstants_1.BASE_PRECISION);
            }
            if (!orderBaseAssetAmount.eq(numericConstants_1.ZERO)) {
                freeCollateralDelta = freeCollateralDelta.sub(marginRatioQuotePrecision.mul(orderBaseAssetAmount.abs()).div(numericConstants_1.BASE_PRECISION));
            }
        }
        return freeCollateralDelta;
    }
    calculateFreeCollateralDeltaForSpot(market, signedTokenAmount, marginCategory = 'Maintenance') {
        const tokenPrecision = new anchor_1.BN(Math.pow(10, market.decimals));
        if (signedTokenAmount.gt(numericConstants_1.ZERO)) {
            const assetWeight = (0, spotBalance_2.calculateAssetWeight)(signedTokenAmount, this.driftClient.getOracleDataForSpotMarket(market.marketIndex).price, market, marginCategory);
            return numericConstants_1.QUOTE_PRECISION.mul(assetWeight).div(numericConstants_1.SPOT_MARKET_WEIGHT_PRECISION).mul(signedTokenAmount).div(tokenPrecision);
        } else {
            const liabilityWeight = (0, spotBalance_2.calculateLiabilityWeight)(signedTokenAmount.abs(), market, marginCategory);
            return numericConstants_1.QUOTE_PRECISION.neg().mul(liabilityWeight).div(numericConstants_1.SPOT_MARKET_WEIGHT_PRECISION).mul(signedTokenAmount.abs()).div(tokenPrecision);
        }
    }
    /**
     * Calculates the estimated liquidation price for a position after closing a quote amount of the position.
     * @param positionMarketIndex
     * @param closeQuoteAmount
     * @returns : Precision PRICE_PRECISION
     */ liquidationPriceAfterClose(positionMarketIndex, closeQuoteAmount, estimatedEntryPrice = numericConstants_1.ZERO) {
        const currentPosition = this.getPerpPositionOrEmpty(positionMarketIndex);
        const closeBaseAmount = currentPosition.baseAssetAmount.mul(closeQuoteAmount).div(currentPosition.quoteAssetAmount.abs()).add(currentPosition.baseAssetAmount.mul(closeQuoteAmount).mod(currentPosition.quoteAssetAmount.abs())).neg();
        return this.liquidationPrice(positionMarketIndex, closeBaseAmount, estimatedEntryPrice);
    }
    getMarginUSDCRequiredForTrade(targetMarketIndex, baseSize, estEntryPrice, perpMarketMaxMarginRatio) {
        const maxMarginRatio = Math.max(perpMarketMaxMarginRatio, this.getUserAccount().maxMarginRatio);
        return (0, margin_2.calculateMarginUSDCRequiredForTrade)(this.driftClient, targetMarketIndex, baseSize, maxMarginRatio, undefined, estEntryPrice);
    }
    getCollateralDepositRequiredForTrade(targetMarketIndex, baseSize, collateralIndex, perpMarketMaxMarginRatio) {
        const maxMarginRatio = Math.max(perpMarketMaxMarginRatio, this.getUserAccount().maxMarginRatio);
        return (0, margin_2.calculateCollateralDepositRequiredForTrade)(this.driftClient, targetMarketIndex, baseSize, collateralIndex, maxMarginRatio, false // assume user cant be high leverage if they havent created user account ?
        );
    }
    /**
     * Separates the max trade size into two parts:
     * - tradeSize: The maximum trade size for target direction
     * - oppositeSideTradeSize: the trade size for closing the opposite direction
     * @param targetMarketIndex
     * @param tradeSide
     * @param isLp
     * @returns { tradeSize: BN, oppositeSideTradeSize: BN} : Precision QUOTE_PRECISION
     */ getMaxTradeSizeUSDCForPerp(targetMarketIndex, tradeSide, isLp = false, enterHighLeverageMode = undefined, maxMarginRatio = undefined) {
        let tradeSize = numericConstants_1.ZERO;
        let oppositeSideTradeSize = numericConstants_1.ZERO;
        const currentPosition = this.getPerpPositionOrEmpty(targetMarketIndex);
        const targetSide = (0, types_1.isVariant)(tradeSide, 'short') ? 'short' : 'long';
        const currentPositionSide = (currentPosition === null || currentPosition === void 0 ? void 0 : currentPosition.baseAssetAmount.isNeg()) ? 'short' : 'long';
        const targetingSameSide = !currentPosition ? true : targetSide === currentPositionSide;
        const oracleData = this.getMMOracleDataForPerpMarket(targetMarketIndex);
        const marketAccount = this.driftClient.getPerpMarketAccount(targetMarketIndex);
        const lpBuffer = isLp ? oracleData.price.mul(marketAccount.amm.orderStepSize).div(numericConstants_1.AMM_RESERVE_PRECISION) : numericConstants_1.ZERO;
        // add any position we have on the opposite side of the current trade, because we can "flip" the size of this position without taking any extra leverage.
        const oppositeSizeLiabilityValue = targetingSameSide ? numericConstants_1.ZERO : (0, margin_1.calculatePerpLiabilityValue)(currentPosition.baseAssetAmount, oracleData.price, (0, types_1.isVariant)(marketAccount.contractType, 'prediction'));
        const maxPositionSize = this.getPerpBuyingPower(targetMarketIndex, lpBuffer, enterHighLeverageMode, maxMarginRatio);
        if (maxPositionSize.gte(numericConstants_1.ZERO)) {
            if (oppositeSizeLiabilityValue.eq(numericConstants_1.ZERO)) {
                // case 1 : Regular trade where current total position less than max, and no opposite position to account for
                // do nothing
                tradeSize = maxPositionSize;
            } else {
                // case 2 : trade where current total position less than max, but need to account for flipping the current position over to the other side
                tradeSize = maxPositionSize.add(oppositeSizeLiabilityValue);
                oppositeSideTradeSize = oppositeSizeLiabilityValue;
            }
        } else {
            // current leverage is greater than max leverage - can only reduce position size
            if (!targetingSameSide) {
                const market = this.driftClient.getPerpMarketAccount(targetMarketIndex);
                const perpLiabilityValue = (0, margin_1.calculatePerpLiabilityValue)(currentPosition.baseAssetAmount, oracleData.price, (0, types_1.isVariant)(market.contractType, 'prediction'));
                const totalCollateral = this.getTotalCollateral();
                const marginRequirement = this.getInitialMarginRequirement(enterHighLeverageMode);
                const marginRatio = Math.max(currentPosition.maxMarginRatio, this.getUserAccount().maxMarginRatio);
                const marginFreedByClosing = perpLiabilityValue.mul(new anchor_1.BN(marginRatio)).div(numericConstants_1.MARGIN_PRECISION);
                const marginRequirementAfterClosing = marginRequirement.sub(marginFreedByClosing);
                if (marginRequirementAfterClosing.gt(totalCollateral)) {
                    oppositeSideTradeSize = perpLiabilityValue;
                } else {
                    const freeCollateralAfterClose = totalCollateral.sub(marginRequirementAfterClosing);
                    const buyingPowerAfterClose = this.getPerpBuyingPowerFromFreeCollateralAndBaseAssetAmount(targetMarketIndex, freeCollateralAfterClose, numericConstants_1.ZERO, currentPosition.maxMarginRatio);
                    oppositeSideTradeSize = perpLiabilityValue;
                    tradeSize = buyingPowerAfterClose;
                }
            } else {
                // do nothing if targetting same side
                tradeSize = maxPositionSize;
            }
        }
        const freeCollateral = this.getFreeCollateral('Initial', enterHighLeverageMode);
        let baseTradeSize = targetSide === 'long' ? tradeSize.mul(numericConstants_1.BASE_PRECISION).div(oracleData.price) : tradeSize.mul(numericConstants_1.BASE_PRECISION).div(oracleData.price).neg();
        let freeCollateralChangeFromNewPosition = this.calculateEntriesEffectOnFreeCollateral(marketAccount, oracleData.price, currentPosition, baseTradeSize, oracleData.price, false, enterHighLeverageMode, 'Initial');
        while(freeCollateralChangeFromNewPosition.isNeg() && freeCollateralChangeFromNewPosition.abs().gt(freeCollateral)){
            tradeSize = tradeSize.mul(new anchor_1.BN(99)).div(new anchor_1.BN(100));
            baseTradeSize = targetSide === 'long' ? tradeSize.mul(numericConstants_1.BASE_PRECISION).div(oracleData.price) : tradeSize.mul(numericConstants_1.BASE_PRECISION).div(oracleData.price).neg();
            freeCollateralChangeFromNewPosition = this.calculateEntriesEffectOnFreeCollateral(marketAccount, oracleData.price, currentPosition, baseTradeSize, oracleData.price, false, enterHighLeverageMode, 'Initial');
        }
        return {
            tradeSize,
            oppositeSideTradeSize
        };
    }
    /**
     * Get the maximum trade size for a given market, taking into account the user's current leverage, positions, collateral, etc.
     *
     * @param targetMarketIndex
     * @param direction
     * @param currentQuoteAssetValue
     * @param currentSpotMarketNetValue
     * @returns tradeSizeAllowed : Precision QUOTE_PRECISION
     */ getMaxTradeSizeUSDCForSpot(targetMarketIndex, direction, currentQuoteAssetValue, currentSpotMarketNetValue) {
        const market = this.driftClient.getSpotMarketAccount(targetMarketIndex);
        const oraclePrice = this.driftClient.getOracleDataForSpotMarket(targetMarketIndex).price;
        currentQuoteAssetValue = this.getSpotMarketAssetValue(numericConstants_1.QUOTE_SPOT_MARKET_INDEX);
        currentSpotMarketNetValue = currentSpotMarketNetValue !== null && currentSpotMarketNetValue !== void 0 ? currentSpotMarketNetValue : this.getSpotPositionValue(targetMarketIndex);
        let freeCollateral = this.getFreeCollateral();
        const marginRatio = (0, spotMarket_1.calculateSpotMarketMarginRatio)(market, oraclePrice, 'Initial', numericConstants_1.ZERO, (0, types_1.isVariant)(direction, 'long') ? types_2.SpotBalanceType.DEPOSIT : types_2.SpotBalanceType.BORROW, this.getUserAccount().maxMarginRatio);
        let tradeAmount = numericConstants_1.ZERO;
        if (this.getUserAccount().isMarginTradingEnabled) {
            // if the user is buying/selling and already short/long, need to account for closing out short/long
            if ((0, types_1.isVariant)(direction, 'long') && currentSpotMarketNetValue.lt(numericConstants_1.ZERO)) {
                tradeAmount = currentSpotMarketNetValue.abs();
                const marginRatio = (0, spotMarket_1.calculateSpotMarketMarginRatio)(market, oraclePrice, 'Initial', this.getTokenAmount(targetMarketIndex).abs(), types_2.SpotBalanceType.BORROW, this.getUserAccount().maxMarginRatio);
                freeCollateral = freeCollateral.add(tradeAmount.mul(new anchor_1.BN(marginRatio)).div(numericConstants_1.MARGIN_PRECISION));
            } else if ((0, types_1.isVariant)(direction, 'short') && currentSpotMarketNetValue.gt(numericConstants_1.ZERO)) {
                tradeAmount = currentSpotMarketNetValue;
                const marginRatio = (0, spotMarket_1.calculateSpotMarketMarginRatio)(market, oraclePrice, 'Initial', this.getTokenAmount(targetMarketIndex), types_2.SpotBalanceType.DEPOSIT, this.getUserAccount().maxMarginRatio);
                freeCollateral = freeCollateral.add(tradeAmount.mul(new anchor_1.BN(marginRatio)).div(numericConstants_1.MARGIN_PRECISION));
            }
            tradeAmount = tradeAmount.add(freeCollateral.mul(numericConstants_1.MARGIN_PRECISION).div(new anchor_1.BN(marginRatio)));
        } else if ((0, types_1.isVariant)(direction, 'long')) {
            tradeAmount = anchor_1.BN.min(currentQuoteAssetValue, freeCollateral.mul(numericConstants_1.MARGIN_PRECISION).div(new anchor_1.BN(marginRatio)));
        } else {
            tradeAmount = anchor_1.BN.max(numericConstants_1.ZERO, currentSpotMarketNetValue);
        }
        return tradeAmount;
    }
    /**
     * Calculates the max amount of token that can be swapped from inMarket to outMarket
     * Assumes swap happens at oracle price
     *
     * @param inMarketIndex
     * @param outMarketIndex
     * @param calculateSwap function to similate in to out swa
     * @param iterationLimit how long to run appromixation before erroring out
     */ getMaxSwapAmount({ inMarketIndex, outMarketIndex, calculateSwap, iterationLimit = 1000 }) {
        const inMarket = this.driftClient.getSpotMarketAccount(inMarketIndex);
        const outMarket = this.driftClient.getSpotMarketAccount(outMarketIndex);
        const inOraclePriceData = this.getOracleDataForSpotMarket(inMarketIndex);
        const inOraclePrice = inOraclePriceData.price;
        const outOraclePriceData = this.getOracleDataForSpotMarket(outMarketIndex);
        const outOraclePrice = outOraclePriceData.price;
        const inStrictOraclePrice = new strictOraclePrice_1.StrictOraclePrice(inOraclePrice);
        const outStrictOraclePrice = new strictOraclePrice_1.StrictOraclePrice(outOraclePrice);
        const inPrecision = new anchor_1.BN(10 ** inMarket.decimals);
        const outPrecision = new anchor_1.BN(10 ** outMarket.decimals);
        const inSpotPosition = this.getSpotPosition(inMarketIndex) || this.getEmptySpotPosition(inMarketIndex);
        const outSpotPosition = this.getSpotPosition(outMarketIndex) || this.getEmptySpotPosition(outMarketIndex);
        const freeCollateral = this.getFreeCollateral();
        const inContributionInitial = this.calculateSpotPositionFreeCollateralContribution(inSpotPosition, inStrictOraclePrice);
        const { totalAssetValue: inTotalAssetValueInitial, totalLiabilityValue: inTotalLiabilityValueInitial } = this.calculateSpotPositionLeverageContribution(inSpotPosition, inStrictOraclePrice);
        const outContributionInitial = this.calculateSpotPositionFreeCollateralContribution(outSpotPosition, outStrictOraclePrice);
        const { totalAssetValue: outTotalAssetValueInitial, totalLiabilityValue: outTotalLiabilityValueInitial } = this.calculateSpotPositionLeverageContribution(outSpotPosition, outStrictOraclePrice);
        const initialContribution = inContributionInitial.add(outContributionInitial);
        const { perpLiabilityValue, perpPnl, spotAssetValue, spotLiabilityValue } = this.getLeverageComponents();
        if (!calculateSwap) {
            calculateSwap = (inSwap)=>{
                return inSwap.mul(outPrecision).mul(inOraclePrice).div(outOraclePrice).div(inPrecision);
            };
        }
        let inSwap = numericConstants_1.ZERO;
        let outSwap = numericConstants_1.ZERO;
        const inTokenAmount = this.getTokenAmount(inMarketIndex);
        const outTokenAmount = this.getTokenAmount(outMarketIndex);
        const inAssetWeight = (0, spotBalance_2.calculateAssetWeight)(inTokenAmount, inOraclePriceData.price, inMarket, 'Initial');
        const outAssetWeight = (0, spotBalance_2.calculateAssetWeight)(outTokenAmount, outOraclePriceData.price, outMarket, 'Initial');
        const outSaferThanIn = // selling asset to close borrow
        inTokenAmount.gt(numericConstants_1.ZERO) && outTokenAmount.lt(numericConstants_1.ZERO) || // buying asset with higher initial asset weight
        inAssetWeight.lte(outAssetWeight);
        if (freeCollateral.lt(numericConstants_1.PRICE_PRECISION.divn(100))) {
            if (outSaferThanIn && inTokenAmount.gt(numericConstants_1.ZERO)) {
                inSwap = inTokenAmount;
                outSwap = calculateSwap(inSwap);
            }
        } else {
            let minSwap = numericConstants_1.ZERO;
            let maxSwap = anchor_1.BN.max(freeCollateral.mul(inPrecision).mul(new anchor_1.BN(100)).div(inOraclePrice), inTokenAmount.abs().mul(new anchor_1.BN(10)) // 10x current position
            );
            inSwap = maxSwap.div(numericConstants_1.TWO);
            const error = freeCollateral.div(new anchor_1.BN(10000));
            let i = 0;
            let freeCollateralAfter = freeCollateral;
            while(freeCollateralAfter.gt(error) || freeCollateralAfter.isNeg()){
                outSwap = calculateSwap(inSwap);
                const inPositionAfter = this.cloneAndUpdateSpotPosition(inSpotPosition, inSwap.neg(), inMarket);
                const outPositionAfter = this.cloneAndUpdateSpotPosition(outSpotPosition, outSwap, outMarket);
                const inContributionAfter = this.calculateSpotPositionFreeCollateralContribution(inPositionAfter, inStrictOraclePrice);
                const outContributionAfter = this.calculateSpotPositionFreeCollateralContribution(outPositionAfter, outStrictOraclePrice);
                const contributionAfter = inContributionAfter.add(outContributionAfter);
                const contributionDelta = contributionAfter.sub(initialContribution);
                freeCollateralAfter = freeCollateral.add(contributionDelta);
                if (freeCollateralAfter.gt(error)) {
                    minSwap = inSwap;
                    inSwap = minSwap.add(maxSwap).div(numericConstants_1.TWO);
                } else if (freeCollateralAfter.isNeg()) {
                    maxSwap = inSwap;
                    inSwap = minSwap.add(maxSwap).div(numericConstants_1.TWO);
                }
                if (i++ > iterationLimit) {
                    console.log('getMaxSwapAmount iteration limit reached');
                    break;
                }
            }
        }
        const inPositionAfter = this.cloneAndUpdateSpotPosition(inSpotPosition, inSwap.neg(), inMarket);
        const outPositionAfter = this.cloneAndUpdateSpotPosition(outSpotPosition, outSwap, outMarket);
        const { totalAssetValue: inTotalAssetValueAfter, totalLiabilityValue: inTotalLiabilityValueAfter } = this.calculateSpotPositionLeverageContribution(inPositionAfter, inStrictOraclePrice);
        const { totalAssetValue: outTotalAssetValueAfter, totalLiabilityValue: outTotalLiabilityValueAfter } = this.calculateSpotPositionLeverageContribution(outPositionAfter, outStrictOraclePrice);
        const spotAssetValueDelta = inTotalAssetValueAfter.add(outTotalAssetValueAfter).sub(inTotalAssetValueInitial).sub(outTotalAssetValueInitial);
        const spotLiabilityValueDelta = inTotalLiabilityValueAfter.add(outTotalLiabilityValueAfter).sub(inTotalLiabilityValueInitial).sub(outTotalLiabilityValueInitial);
        const spotAssetValueAfter = spotAssetValue.add(spotAssetValueDelta);
        const spotLiabilityValueAfter = spotLiabilityValue.add(spotLiabilityValueDelta);
        const leverage = this.calculateLeverageFromComponents({
            perpLiabilityValue,
            perpPnl,
            spotAssetValue: spotAssetValueAfter,
            spotLiabilityValue: spotLiabilityValueAfter
        });
        return {
            inAmount: inSwap,
            outAmount: outSwap,
            leverage
        };
    }
    cloneAndUpdateSpotPosition(position, tokenAmount, market) {
        const clonedPosition = Object.assign({}, position);
        if (tokenAmount.eq(numericConstants_1.ZERO)) {
            return clonedPosition;
        }
        const preTokenAmount = (0, spotBalance_1.getSignedTokenAmount)((0, spotBalance_2.getTokenAmount)(position.scaledBalance, market, position.balanceType), position.balanceType);
        if ((0, utils_1.sigNum)(preTokenAmount).eq((0, utils_1.sigNum)(tokenAmount))) {
            const scaledBalanceDelta = (0, spotBalance_1.getBalance)(tokenAmount.abs(), market, position.balanceType);
            clonedPosition.scaledBalance = clonedPosition.scaledBalance.add(scaledBalanceDelta);
            return clonedPosition;
        }
        const updateDirection = tokenAmount.isNeg() ? types_2.SpotBalanceType.BORROW : types_2.SpotBalanceType.DEPOSIT;
        if (tokenAmount.abs().gte(preTokenAmount.abs())) {
            clonedPosition.scaledBalance = (0, spotBalance_1.getBalance)(tokenAmount.abs().sub(preTokenAmount.abs()), market, updateDirection);
            clonedPosition.balanceType = updateDirection;
        } else {
            const scaledBalanceDelta = (0, spotBalance_1.getBalance)(tokenAmount.abs(), market, position.balanceType);
            clonedPosition.scaledBalance = clonedPosition.scaledBalance.sub(scaledBalanceDelta);
        }
        return clonedPosition;
    }
    calculateSpotPositionFreeCollateralContribution(spotPosition, strictOraclePrice) {
        const marginCategory = 'Initial';
        const spotMarketAccount = this.driftClient.getSpotMarketAccount(spotPosition.marketIndex);
        const { freeCollateralContribution } = (0, spotPosition_1.getWorstCaseTokenAmounts)(spotPosition, spotMarketAccount, strictOraclePrice, marginCategory, this.getUserAccount().maxMarginRatio);
        return freeCollateralContribution;
    }
    calculateSpotPositionLeverageContribution(spotPosition, strictOraclePrice) {
        let totalAssetValue = numericConstants_1.ZERO;
        let totalLiabilityValue = numericConstants_1.ZERO;
        const spotMarketAccount = this.driftClient.getSpotMarketAccount(spotPosition.marketIndex);
        const { tokenValue, ordersValue } = (0, spotPosition_1.getWorstCaseTokenAmounts)(spotPosition, spotMarketAccount, strictOraclePrice, 'Initial', this.getUserAccount().maxMarginRatio);
        if (tokenValue.gte(numericConstants_1.ZERO)) {
            totalAssetValue = tokenValue;
        } else {
            totalLiabilityValue = tokenValue.abs();
        }
        if (ordersValue.gt(numericConstants_1.ZERO)) {
            totalAssetValue = totalAssetValue.add(ordersValue);
        } else {
            totalLiabilityValue = totalLiabilityValue.add(ordersValue.abs());
        }
        return {
            totalAssetValue,
            totalLiabilityValue
        };
    }
    /**
     * Estimates what the user leverage will be after swap
     * @param inMarketIndex
     * @param outMarketIndex
     * @param inAmount
     * @param outAmount
     */ accountLeverageAfterSwap({ inMarketIndex, outMarketIndex, inAmount, outAmount }) {
        const inMarket = this.driftClient.getSpotMarketAccount(inMarketIndex);
        const outMarket = this.driftClient.getSpotMarketAccount(outMarketIndex);
        const inOraclePriceData = this.getOracleDataForSpotMarket(inMarketIndex);
        const inOraclePrice = inOraclePriceData.price;
        const outOraclePriceData = this.getOracleDataForSpotMarket(outMarketIndex);
        const outOraclePrice = outOraclePriceData.price;
        const inStrictOraclePrice = new strictOraclePrice_1.StrictOraclePrice(inOraclePrice);
        const outStrictOraclePrice = new strictOraclePrice_1.StrictOraclePrice(outOraclePrice);
        const inSpotPosition = this.getSpotPosition(inMarketIndex) || this.getEmptySpotPosition(inMarketIndex);
        const outSpotPosition = this.getSpotPosition(outMarketIndex) || this.getEmptySpotPosition(outMarketIndex);
        const { totalAssetValue: inTotalAssetValueInitial, totalLiabilityValue: inTotalLiabilityValueInitial } = this.calculateSpotPositionLeverageContribution(inSpotPosition, inStrictOraclePrice);
        const { totalAssetValue: outTotalAssetValueInitial, totalLiabilityValue: outTotalLiabilityValueInitial } = this.calculateSpotPositionLeverageContribution(outSpotPosition, outStrictOraclePrice);
        const { perpLiabilityValue, perpPnl, spotAssetValue, spotLiabilityValue } = this.getLeverageComponents();
        const inPositionAfter = this.cloneAndUpdateSpotPosition(inSpotPosition, inAmount.abs().neg(), inMarket);
        const outPositionAfter = this.cloneAndUpdateSpotPosition(outSpotPosition, outAmount.abs(), outMarket);
        const { totalAssetValue: inTotalAssetValueAfter, totalLiabilityValue: inTotalLiabilityValueAfter } = this.calculateSpotPositionLeverageContribution(inPositionAfter, inStrictOraclePrice);
        const { totalAssetValue: outTotalAssetValueAfter, totalLiabilityValue: outTotalLiabilityValueAfter } = this.calculateSpotPositionLeverageContribution(outPositionAfter, outStrictOraclePrice);
        const spotAssetValueDelta = inTotalAssetValueAfter.add(outTotalAssetValueAfter).sub(inTotalAssetValueInitial).sub(outTotalAssetValueInitial);
        const spotLiabilityValueDelta = inTotalLiabilityValueAfter.add(outTotalLiabilityValueAfter).sub(inTotalLiabilityValueInitial).sub(outTotalLiabilityValueInitial);
        const spotAssetValueAfter = spotAssetValue.add(spotAssetValueDelta);
        const spotLiabilityValueAfter = spotLiabilityValue.add(spotLiabilityValueDelta);
        return this.calculateLeverageFromComponents({
            perpLiabilityValue,
            perpPnl,
            spotAssetValue: spotAssetValueAfter,
            spotLiabilityValue: spotLiabilityValueAfter
        });
    }
    // TODO - should this take the price impact of the trade into account for strict accuracy?
    /**
     * Returns the leverage ratio for the account after adding (or subtracting) the given quote size to the given position
     * @param targetMarketIndex
     * @param: targetMarketType
     * @param tradeQuoteAmount
     * @param tradeSide
     * @param includeOpenOrders
     * @returns leverageRatio : Precision TEN_THOUSAND
     */ accountLeverageRatioAfterTrade(targetMarketIndex, targetMarketType, tradeQuoteAmount, tradeSide, includeOpenOrders = true) {
        const tradeIsPerp = (0, types_1.isVariant)(targetMarketType, 'perp');
        if (!tradeIsPerp) {
            // calculate new asset/liability values for base and quote market to find new account leverage
            const totalLiabilityValue = this.getTotalLiabilityValue();
            const totalAssetValue = this.getTotalAssetValue();
            const spotLiabilityValue = this.getSpotMarketLiabilityValue(undefined, undefined, undefined, includeOpenOrders);
            const currentQuoteAssetValue = this.getSpotMarketAssetValue(numericConstants_1.QUOTE_SPOT_MARKET_INDEX, undefined, includeOpenOrders);
            const currentQuoteLiabilityValue = this.getSpotMarketLiabilityValue(numericConstants_1.QUOTE_SPOT_MARKET_INDEX, undefined, undefined, includeOpenOrders);
            const currentQuoteValue = currentQuoteAssetValue.sub(currentQuoteLiabilityValue);
            const currentSpotMarketAssetValue = this.getSpotMarketAssetValue(targetMarketIndex, undefined, includeOpenOrders);
            const currentSpotMarketLiabilityValue = this.getSpotMarketLiabilityValue(targetMarketIndex, undefined, undefined, includeOpenOrders);
            const currentSpotMarketNetValue = currentSpotMarketAssetValue.sub(currentSpotMarketLiabilityValue);
            let assetValueToAdd = numericConstants_1.ZERO;
            let liabilityValueToAdd = numericConstants_1.ZERO;
            const newQuoteNetValue = tradeSide == types_2.PositionDirection.SHORT ? currentQuoteValue.add(tradeQuoteAmount) : currentQuoteValue.sub(tradeQuoteAmount);
            const newQuoteAssetValue = anchor_1.BN.max(newQuoteNetValue, numericConstants_1.ZERO);
            const newQuoteLiabilityValue = anchor_1.BN.min(newQuoteNetValue, numericConstants_1.ZERO).abs();
            assetValueToAdd = assetValueToAdd.add(newQuoteAssetValue.sub(currentQuoteAssetValue));
            liabilityValueToAdd = liabilityValueToAdd.add(newQuoteLiabilityValue.sub(currentQuoteLiabilityValue));
            const newSpotMarketNetValue = tradeSide == types_2.PositionDirection.LONG ? currentSpotMarketNetValue.add(tradeQuoteAmount) : currentSpotMarketNetValue.sub(tradeQuoteAmount);
            const newSpotMarketAssetValue = anchor_1.BN.max(newSpotMarketNetValue, numericConstants_1.ZERO);
            const newSpotMarketLiabilityValue = anchor_1.BN.min(newSpotMarketNetValue, numericConstants_1.ZERO).abs();
            assetValueToAdd = assetValueToAdd.add(newSpotMarketAssetValue.sub(currentSpotMarketAssetValue));
            liabilityValueToAdd = liabilityValueToAdd.add(newSpotMarketLiabilityValue.sub(currentSpotMarketLiabilityValue));
            const totalAssetValueAfterTrade = totalAssetValue.add(assetValueToAdd);
            const totalSpotLiabilityValueAfterTrade = spotLiabilityValue.add(liabilityValueToAdd);
            const totalLiabilityValueAfterTrade = totalLiabilityValue.add(liabilityValueToAdd);
            const netAssetValueAfterTrade = totalAssetValueAfterTrade.sub(totalSpotLiabilityValueAfterTrade);
            if (netAssetValueAfterTrade.eq(numericConstants_1.ZERO)) {
                return numericConstants_1.ZERO;
            }
            const newLeverage = totalLiabilityValueAfterTrade.mul(numericConstants_1.TEN_THOUSAND).div(netAssetValueAfterTrade);
            return newLeverage;
        }
        const currentPosition = this.getPerpPositionOrEmpty(targetMarketIndex);
        const perpMarket = this.driftClient.getPerpMarketAccount(targetMarketIndex);
        const oracleData = this.getOracleDataForPerpMarket(targetMarketIndex);
        let { // eslint-disable-next-line prefer-const
        worstCaseBaseAssetAmount: worstCaseBase, worstCaseLiabilityValue: currentPositionQuoteAmount } = (0, margin_1.calculateWorstCasePerpLiabilityValue)(currentPosition, perpMarket, oracleData.price);
        // current side is short if position base asset amount is negative OR there is no position open but open orders are short
        const currentSide = currentPosition.baseAssetAmount.isNeg() || currentPosition.baseAssetAmount.eq(numericConstants_1.ZERO) && worstCaseBase.isNeg() ? types_2.PositionDirection.SHORT : types_2.PositionDirection.LONG;
        if (currentSide === types_2.PositionDirection.SHORT) currentPositionQuoteAmount = currentPositionQuoteAmount.neg();
        if (tradeSide === types_2.PositionDirection.SHORT) tradeQuoteAmount = tradeQuoteAmount.neg();
        const currentPerpPositionAfterTrade = currentPositionQuoteAmount.add(tradeQuoteAmount).abs();
        const totalPositionAfterTradeExcludingTargetMarket = this.getTotalPerpPositionValueExcludingMarket(targetMarketIndex, undefined, undefined, includeOpenOrders);
        const totalAssetValue = this.getTotalAssetValue();
        const totalPerpPositionLiability = currentPerpPositionAfterTrade.add(totalPositionAfterTradeExcludingTargetMarket).abs();
        const totalSpotLiability = this.getSpotMarketLiabilityValue(undefined, undefined, undefined, includeOpenOrders);
        const totalLiabilitiesAfterTrade = totalPerpPositionLiability.add(totalSpotLiability);
        const netAssetValue = totalAssetValue.sub(totalSpotLiability);
        if (netAssetValue.eq(numericConstants_1.ZERO)) {
            return numericConstants_1.ZERO;
        }
        const newLeverage = totalLiabilitiesAfterTrade.mul(numericConstants_1.TEN_THOUSAND).div(netAssetValue);
        return newLeverage;
    }
    getUserFeeTier(marketType, now) {
        const state = this.driftClient.getStateAccount();
        const feeTierIndex = 0;
        if ((0, types_1.isVariant)(marketType, 'perp')) {
            if (this.isHighLeverageMode('Initial')) {
                return state.perpFeeStructure.feeTiers[0];
            }
            const userStatsAccount = this.driftClient.getUserStats().getAccount();
            const total30dVolume = (0, trade_1.getUser30dRollingVolumeEstimate)(userStatsAccount, now);
            const stakedGovAssetAmount = userStatsAccount.ifStakedGovTokenAmount;
            const volumeThresholds = [
                new anchor_1.BN(2000000).mul(numericConstants_1.QUOTE_PRECISION),
                new anchor_1.BN(10000000).mul(numericConstants_1.QUOTE_PRECISION),
                new anchor_1.BN(20000000).mul(numericConstants_1.QUOTE_PRECISION),
                new anchor_1.BN(80000000).mul(numericConstants_1.QUOTE_PRECISION),
                new anchor_1.BN(200000000).mul(numericConstants_1.QUOTE_PRECISION)
            ];
            const stakeThresholds = [
                new anchor_1.BN(1000 - 1).mul(numericConstants_1.QUOTE_PRECISION),
                new anchor_1.BN(10000 - 1).mul(numericConstants_1.QUOTE_PRECISION),
                new anchor_1.BN(50000 - 1).mul(numericConstants_1.QUOTE_PRECISION),
                new anchor_1.BN(100000 - 1).mul(numericConstants_1.QUOTE_PRECISION),
                new anchor_1.BN(250000 - 5).mul(numericConstants_1.QUOTE_PRECISION)
            ];
            const stakeBenefitFrac = [
                0,
                5,
                10,
                20,
                30,
                40
            ];
            let feeTierIndex = 5;
            for(let i = 0; i < volumeThresholds.length; i++){
                if (total30dVolume.lt(volumeThresholds[i])) {
                    feeTierIndex = i;
                    break;
                }
            }
            let stakeBenefitIndex = 5;
            for(let i = 0; i < stakeThresholds.length; i++){
                if (stakedGovAssetAmount.lt(stakeThresholds[i])) {
                    stakeBenefitIndex = i;
                    break;
                }
            }
            const stakeBenefit = stakeBenefitFrac[stakeBenefitIndex];
            const tier = {
                ...state.perpFeeStructure.feeTiers[feeTierIndex]
            };
            if (stakeBenefit > 0) {
                tier.feeNumerator = tier.feeNumerator * (100 - stakeBenefit) / 100;
                tier.makerRebateNumerator = tier.makerRebateNumerator * (100 + stakeBenefit) / 100;
            }
            return tier;
        }
        return state.spotFeeStructure.feeTiers[feeTierIndex];
    }
    /**
     * Calculates how much perp fee will be taken for a given sized trade
     * @param quoteAmount
     * @returns feeForQuote : Precision QUOTE_PRECISION
     */ calculateFeeForQuoteAmount(quoteAmount, marketIndex, enteringHighLeverageMode) {
        if (marketIndex !== undefined) {
            const takerFeeMultiplier = this.driftClient.getMarketFees(types_2.MarketType.PERP, marketIndex, this, enteringHighLeverageMode).takerFee;
            const feeAmountNum = bigNum_1.BigNum.from(quoteAmount, numericConstants_1.QUOTE_PRECISION_EXP).toNum() * takerFeeMultiplier;
            return bigNum_1.BigNum.fromPrint(feeAmountNum.toString(), numericConstants_1.QUOTE_PRECISION_EXP).val;
        } else {
            const feeTier = this.getUserFeeTier(types_2.MarketType.PERP);
            return quoteAmount.mul(new anchor_1.BN(feeTier.feeNumerator)).div(new anchor_1.BN(feeTier.feeDenominator));
        }
    }
    /**
     * Calculates a user's max withdrawal amounts for a spot market. If reduceOnly is true,
     * it will return the max withdrawal amount without opening a liability for the user
     * @param marketIndex
     * @returns withdrawalLimit : Precision is the token precision for the chosen SpotMarket
     */ getWithdrawalLimit(marketIndex, reduceOnly) {
        const nowTs = new anchor_1.BN(Math.floor(Date.now() / 1000));
        const spotMarket = this.driftClient.getSpotMarketAccount(marketIndex);
        // eslint-disable-next-line prefer-const
        let { borrowLimit, withdrawLimit } = (0, spotBalance_2.calculateWithdrawLimit)(spotMarket, nowTs);
        const freeCollateral = this.getFreeCollateral();
        const initialMarginRequirement = this.getInitialMarginRequirement();
        const oracleData = this.getOracleDataForSpotMarket(marketIndex);
        const { numeratorScale, denominatorScale } = spotMarket.decimals > 6 ? {
            numeratorScale: new anchor_1.BN(10).pow(new anchor_1.BN(spotMarket.decimals - 6)),
            denominatorScale: new anchor_1.BN(1)
        } : {
            numeratorScale: new anchor_1.BN(1),
            denominatorScale: new anchor_1.BN(10).pow(new anchor_1.BN(6 - spotMarket.decimals))
        };
        const { canBypass, depositAmount: userDepositAmount } = this.canBypassWithdrawLimits(marketIndex);
        if (canBypass) {
            withdrawLimit = anchor_1.BN.max(withdrawLimit, userDepositAmount);
        }
        const assetWeight = (0, spotBalance_2.calculateAssetWeight)(userDepositAmount, oracleData.price, spotMarket, 'Initial');
        let amountWithdrawable;
        if (assetWeight.eq(numericConstants_1.ZERO)) {
            amountWithdrawable = userDepositAmount;
        } else if (initialMarginRequirement.eq(numericConstants_1.ZERO)) {
            amountWithdrawable = userDepositAmount;
        } else {
            amountWithdrawable = (0, utils_1.divCeil)((0, utils_1.divCeil)(freeCollateral.mul(numericConstants_1.MARGIN_PRECISION), assetWeight).mul(numericConstants_1.PRICE_PRECISION), oracleData.price).mul(numeratorScale).div(denominatorScale);
        }
        const maxWithdrawValue = anchor_1.BN.min(anchor_1.BN.min(amountWithdrawable, userDepositAmount), withdrawLimit.abs());
        if (reduceOnly) {
            return anchor_1.BN.max(maxWithdrawValue, numericConstants_1.ZERO);
        } else {
            const weightedAssetValue = this.getSpotMarketAssetValue(marketIndex, 'Initial', false);
            const freeCollatAfterWithdraw = userDepositAmount.gt(numericConstants_1.ZERO) ? freeCollateral.sub(weightedAssetValue) : freeCollateral;
            const maxLiabilityAllowed = freeCollatAfterWithdraw.mul(numericConstants_1.MARGIN_PRECISION).div(new anchor_1.BN(spotMarket.initialLiabilityWeight)).mul(numericConstants_1.PRICE_PRECISION).div(oracleData.price).mul(numeratorScale).div(denominatorScale);
            const maxBorrowValue = anchor_1.BN.min(maxWithdrawValue.add(maxLiabilityAllowed), borrowLimit.abs());
            return anchor_1.BN.max(maxBorrowValue, numericConstants_1.ZERO);
        }
    }
    canBypassWithdrawLimits(marketIndex) {
        const spotMarket = this.driftClient.getSpotMarketAccount(marketIndex);
        const maxDepositAmount = spotMarket.withdrawGuardThreshold.div(new anchor_1.BN(10));
        const position = this.getSpotPosition(marketIndex);
        const netDeposits = this.getUserAccount().totalDeposits.sub(this.getUserAccount().totalWithdraws);
        if (!position) {
            return {
                canBypass: false,
                maxDepositAmount,
                depositAmount: numericConstants_1.ZERO,
                netDeposits
            };
        }
        if ((0, types_1.isVariant)(position.balanceType, 'borrow')) {
            return {
                canBypass: false,
                maxDepositAmount,
                netDeposits,
                depositAmount: numericConstants_1.ZERO
            };
        }
        const depositAmount = (0, spotBalance_2.getTokenAmount)(position.scaledBalance, spotMarket, types_2.SpotBalanceType.DEPOSIT);
        if (netDeposits.lt(numericConstants_1.ZERO)) {
            return {
                canBypass: false,
                maxDepositAmount,
                depositAmount,
                netDeposits
            };
        }
        return {
            canBypass: depositAmount.lt(maxDepositAmount),
            maxDepositAmount,
            netDeposits,
            depositAmount
        };
    }
    canMakeIdle(slot) {
        const userAccount = this.getUserAccount();
        if (userAccount.idle) {
            return false;
        }
        const { totalAssetValue, totalLiabilityValue } = this.getSpotMarketAssetAndLiabilityValue();
        const equity = totalAssetValue.sub(totalLiabilityValue);
        let slotsBeforeIdle;
        if (equity.lt(numericConstants_1.QUOTE_PRECISION.muln(1000))) {
            slotsBeforeIdle = new anchor_1.BN(9000); // 1 hour
        } else {
            slotsBeforeIdle = new anchor_1.BN(1512000); // 1 week
        }
        const userLastActiveSlot = userAccount.lastActiveSlot;
        const slotsSinceLastActive = slot.sub(userLastActiveSlot);
        if (slotsSinceLastActive.lt(slotsBeforeIdle)) {
            return false;
        }
        if (this.isBeingLiquidated()) {
            return false;
        }
        for (const perpPosition of userAccount.perpPositions){
            if (!(0, position_1.positionIsAvailable)(perpPosition)) {
                return false;
            }
        }
        for (const spotPosition of userAccount.spotPositions){
            if ((0, types_1.isVariant)(spotPosition.balanceType, 'borrow') && spotPosition.scaledBalance.gt(numericConstants_1.ZERO)) {
                return false;
            }
            if (spotPosition.openOrders !== 0) {
                return false;
            }
        }
        for (const order of userAccount.orders){
            if ((0, types_1.isVariant)(order.status, 'open')) {
                return false;
            }
        }
        return true;
    }
    getSafestTiers() {
        let safestPerpTier = 4;
        let safestSpotTier = 4;
        for (const perpPosition of this.getActivePerpPositions()){
            safestPerpTier = Math.min(safestPerpTier, (0, tiers_1.getPerpMarketTierNumber)(this.driftClient.getPerpMarketAccount(perpPosition.marketIndex)));
        }
        for (const spotPosition of this.getActiveSpotPositions()){
            if ((0, types_1.isVariant)(spotPosition.balanceType, 'deposit')) {
                continue;
            }
            safestSpotTier = Math.min(safestSpotTier, (0, tiers_1.getSpotMarketTierNumber)(this.driftClient.getSpotMarketAccount(spotPosition.marketIndex)));
        }
        return {
            perpTier: safestPerpTier,
            spotTier: safestSpotTier
        };
    }
    getPerpPositionHealth({ marginCategory, perpPosition, oraclePriceData, quoteOraclePriceData, includeOpenOrders = true }) {
        const perpMarket = this.driftClient.getPerpMarketAccount(perpPosition.marketIndex);
        const _oraclePriceData = oraclePriceData || this.driftClient.getOracleDataForPerpMarket(perpMarket.marketIndex);
        const oraclePrice = _oraclePriceData.price;
        let worstCaseBaseAmount;
        let worstCaseLiabilityValue;
        if (includeOpenOrders) {
            const worstCaseIncludeOrders = (0, margin_1.calculateWorstCasePerpLiabilityValue)(perpPosition, perpMarket, oraclePrice);
            worstCaseBaseAmount = worstCaseIncludeOrders.worstCaseBaseAssetAmount;
            worstCaseLiabilityValue = worstCaseIncludeOrders.worstCaseLiabilityValue;
        } else {
            worstCaseBaseAmount = perpPosition.baseAssetAmount;
            worstCaseLiabilityValue = (0, margin_1.calculatePerpLiabilityValue)(perpPosition.baseAssetAmount, oraclePrice, (0, types_1.isVariant)(perpMarket.contractType, 'prediction'));
        }
        const userCustomMargin = Math.max(perpPosition.maxMarginRatio, this.getUserAccount().maxMarginRatio);
        const marginRatio = new anchor_1.BN((0, market_1.calculateMarketMarginRatio)(perpMarket, worstCaseBaseAmount.abs(), marginCategory, userCustomMargin, this.isHighLeverageMode(marginCategory)));
        const _quoteOraclePriceData = quoteOraclePriceData || this.driftClient.getOracleDataForSpotMarket(numericConstants_1.QUOTE_SPOT_MARKET_INDEX);
        let marginRequirement = worstCaseLiabilityValue.mul(_quoteOraclePriceData.price).div(numericConstants_1.PRICE_PRECISION).mul(marginRatio).div(numericConstants_1.MARGIN_PRECISION);
        marginRequirement = marginRequirement.add(new anchor_1.BN(perpPosition.openOrders).mul(numericConstants_1.OPEN_ORDER_MARGIN_REQUIREMENT));
        return {
            marketIndex: perpMarket.marketIndex,
            size: worstCaseBaseAmount,
            value: worstCaseLiabilityValue,
            weight: marginRatio,
            weightedValue: marginRequirement
        };
    }
    getHealthComponents({ marginCategory }) {
        const healthComponents = {
            deposits: [],
            borrows: [],
            perpPositions: [],
            perpPnl: []
        };
        for (const perpPosition of this.getActivePerpPositions()){
            const perpMarket = this.driftClient.getPerpMarketAccount(perpPosition.marketIndex);
            const oraclePriceData = this.driftClient.getOracleDataForPerpMarket(perpMarket.marketIndex);
            const quoteOraclePriceData = this.driftClient.getOracleDataForSpotMarket(numericConstants_1.QUOTE_SPOT_MARKET_INDEX);
            healthComponents.perpPositions.push(this.getPerpPositionHealth({
                marginCategory,
                perpPosition,
                oraclePriceData,
                quoteOraclePriceData
            }));
            const quoteSpotMarket = this.driftClient.getSpotMarketAccount(perpMarket.quoteSpotMarketIndex);
            const positionUnrealizedPnl = (0, position_2.calculatePositionPNL)(perpMarket, perpPosition, true, oraclePriceData);
            let pnlWeight;
            if (positionUnrealizedPnl.gt(numericConstants_1.ZERO)) {
                pnlWeight = (0, market_1.calculateUnrealizedAssetWeight)(perpMarket, quoteSpotMarket, positionUnrealizedPnl, marginCategory, oraclePriceData);
            } else {
                pnlWeight = numericConstants_1.SPOT_MARKET_WEIGHT_PRECISION;
            }
            const pnlValue = positionUnrealizedPnl.mul(quoteOraclePriceData.price).div(numericConstants_1.PRICE_PRECISION);
            const wegithedPnlValue = pnlValue.mul(pnlWeight).div(numericConstants_1.SPOT_MARKET_WEIGHT_PRECISION);
            healthComponents.perpPnl.push({
                marketIndex: perpMarket.marketIndex,
                size: positionUnrealizedPnl,
                value: pnlValue,
                weight: pnlWeight,
                weightedValue: wegithedPnlValue
            });
        }
        let netQuoteValue = numericConstants_1.ZERO;
        for (const spotPosition of this.getActiveSpotPositions()){
            const spotMarketAccount = this.driftClient.getSpotMarketAccount(spotPosition.marketIndex);
            const oraclePriceData = this.getOracleDataForSpotMarket(spotPosition.marketIndex);
            const strictOraclePrice = new strictOraclePrice_1.StrictOraclePrice(oraclePriceData.price);
            if (spotPosition.marketIndex === numericConstants_1.QUOTE_SPOT_MARKET_INDEX) {
                const tokenAmount = (0, spotBalance_1.getSignedTokenAmount)((0, spotBalance_2.getTokenAmount)(spotPosition.scaledBalance, spotMarketAccount, spotPosition.balanceType), spotPosition.balanceType);
                netQuoteValue = netQuoteValue.add(tokenAmount);
                continue;
            }
            const { tokenAmount: worstCaseTokenAmount, tokenValue: tokenValue, weight, weightedTokenValue: weightedTokenValue, ordersValue: ordersValue } = (0, spotPosition_1.getWorstCaseTokenAmounts)(spotPosition, spotMarketAccount, strictOraclePrice, marginCategory, this.getUserAccount().maxMarginRatio);
            netQuoteValue = netQuoteValue.add(ordersValue);
            const baseAssetValue = tokenValue.abs();
            const weightedValue = weightedTokenValue.abs();
            if (weightedTokenValue.lt(numericConstants_1.ZERO)) {
                healthComponents.borrows.push({
                    marketIndex: spotMarketAccount.marketIndex,
                    size: worstCaseTokenAmount,
                    value: baseAssetValue,
                    weight: weight,
                    weightedValue: weightedValue
                });
            } else {
                healthComponents.deposits.push({
                    marketIndex: spotMarketAccount.marketIndex,
                    size: worstCaseTokenAmount,
                    value: baseAssetValue,
                    weight: weight,
                    weightedValue: weightedValue
                });
            }
        }
        if (!netQuoteValue.eq(numericConstants_1.ZERO)) {
            const spotMarketAccount = this.driftClient.getQuoteSpotMarketAccount();
            const oraclePriceData = this.getOracleDataForSpotMarket(numericConstants_1.QUOTE_SPOT_MARKET_INDEX);
            const baseAssetValue = (0, spotBalance_1.getTokenValue)(netQuoteValue, spotMarketAccount.decimals, oraclePriceData);
            const { weight, weightedTokenValue } = (0, spotPosition_1.calculateWeightedTokenValue)(netQuoteValue, baseAssetValue, oraclePriceData.price, spotMarketAccount, marginCategory, this.getUserAccount().maxMarginRatio);
            if (netQuoteValue.lt(numericConstants_1.ZERO)) {
                healthComponents.borrows.push({
                    marketIndex: spotMarketAccount.marketIndex,
                    size: netQuoteValue,
                    value: baseAssetValue.abs(),
                    weight: weight,
                    weightedValue: weightedTokenValue.abs()
                });
            } else {
                healthComponents.deposits.push({
                    marketIndex: spotMarketAccount.marketIndex,
                    size: netQuoteValue,
                    value: baseAssetValue,
                    weight: weight,
                    weightedValue: weightedTokenValue
                });
            }
        }
        return healthComponents;
    }
    /**
     * Get the total position value, excluding any position coming from the given target market
     * @param marketToIgnore
     * @returns positionValue : Precision QUOTE_PRECISION
     */ getTotalPerpPositionValueExcludingMarket(marketToIgnore, marginCategory, liquidationBuffer, includeOpenOrders) {
        const currentPerpPosition = this.getPerpPositionOrEmpty(marketToIgnore);
        const oracleData = this.getOracleDataForPerpMarket(marketToIgnore);
        let currentPerpPositionValueUSDC = numericConstants_1.ZERO;
        if (currentPerpPosition) {
            currentPerpPositionValueUSDC = this.getPerpLiabilityValue(marketToIgnore, oracleData, includeOpenOrders);
        }
        return this.getTotalPerpPositionLiability(marginCategory, liquidationBuffer, includeOpenOrders).sub(currentPerpPositionValueUSDC);
    }
    getMMOracleDataForPerpMarket(marketIndex) {
        return this.driftClient.getMMOracleDataForPerpMarket(marketIndex);
    }
    getOracleDataForPerpMarket(marketIndex) {
        return this.driftClient.getOracleDataForPerpMarket(marketIndex);
    }
    getOracleDataForSpotMarket(marketIndex) {
        return this.driftClient.getOracleDataForSpotMarket(marketIndex);
    }
    /**
     * Get the active perp and spot positions of the user.
     */ getActivePositions() {
        const activePerpMarkets = this.getActivePerpPositions().map((position)=>position.marketIndex);
        const activeSpotMarkets = this.getActiveSpotPositions().map((position)=>position.marketIndex);
        return {
            activePerpPositions: activePerpMarkets,
            activeSpotPositions: activeSpotMarkets
        };
    }
}
exports.User = User;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/types.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TxSendError = exports.ConfirmationStrategy = void 0;
var ConfirmationStrategy;
(function(ConfirmationStrategy) {
    ConfirmationStrategy["WebSocket"] = "websocket";
    ConfirmationStrategy["Polling"] = "polling";
    ConfirmationStrategy["Combo"] = "combo";
})(ConfirmationStrategy || (exports.ConfirmationStrategy = ConfirmationStrategy = {}));
class TxSendError extends Error {
    constructor(message, code){
        super(message);
        this.message = message;
        this.code = code;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, TxSendError);
        }
    }
}
exports.TxSendError = TxSendError;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/txParamProcessor.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TransactionParamProcessor = void 0;
const COMPUTE_UNIT_BUFFER_FACTOR = 1.2;
const MAX_COMPUTE_UNITS = 1400000;
const TEST_SIMS_ALWAYS_FAIL = false;
/**
 * This class is responsible for running through a "processing" pipeline for a base transaction, to adjust the standard transaction parameters based on a given configuration.
 */ class TransactionParamProcessor {
    static async getComputeUnitsFromSim(txSim) {
        var _a, _b;
        if ((_a = txSim === null || txSim === void 0 ? void 0 : txSim.value) === null || _a === void 0 ? void 0 : _a.unitsConsumed) {
            return (_b = txSim === null || txSim === void 0 ? void 0 : txSim.value) === null || _b === void 0 ? void 0 : _b.unitsConsumed;
        }
        return undefined;
    }
    static async getTxSimComputeUnits(tx, connection, bufferMultiplier, lowerBoundCu, simulatedTx) {
        var _a, _b;
        try {
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const simTxResult = simulatedTx ? {
                value: simulatedTx
            } : await connection.simulateTransaction(tx, {
                replaceRecentBlockhash: true
            });
            if ((_a = simTxResult === null || simTxResult === void 0 ? void 0 : simTxResult.value) === null || _a === void 0 ? void 0 : _a.err) {
                throw (_b = simTxResult === null || simTxResult === void 0 ? void 0 : simTxResult.value) === null || _b === void 0 ? void 0 : _b.err;
            }
            const computeUnits = await this.getComputeUnitsFromSim(simTxResult);
            // Apply the buffer, but round down to the MAX_COMPUTE_UNITS, and round up to the nearest whole number
            let bufferedComputeUnits = Math.ceil(Math.min(computeUnits * bufferMultiplier, MAX_COMPUTE_UNITS));
            // If a lower bound CU is passed then enforce it
            if (lowerBoundCu) {
                bufferedComputeUnits = Math.max(bufferedComputeUnits, Math.min(lowerBoundCu, MAX_COMPUTE_UNITS));
            }
            return {
                success: true,
                computeUnits: bufferedComputeUnits
            };
        } catch (e) {
            console.warn(`Failed to get Simulated Compute Units for txParamProcessor`, e);
            return {
                success: false,
                computeUnits: undefined
            };
        }
    }
    static async process(props) {
        var _a;
        // # Exit early if no process config is provided
        if (!props.processConfig || Object.keys(props.processConfig).length === 0) {
            return props.baseTxParams;
        }
        // # Setup
        const { txBuilder: txBuilder, processConfig, processParams: processProps } = props;
        const finalTxParams = {
            ...props.baseTxParams
        };
        // # Run Processes
        if (processConfig.useSimulatedComputeUnits) {
            const txToSim = await txBuilder({
                txParams: {
                    ...finalTxParams,
                    computeUnits: MAX_COMPUTE_UNITS
                }
            });
            const txSimComputeUnitsResult = await this.getTxSimComputeUnits(txToSim, processProps.connection, (_a = processConfig === null || processConfig === void 0 ? void 0 : processConfig.computeUnitsBufferMultiplier) !== null && _a !== void 0 ? _a : COMPUTE_UNIT_BUFFER_FACTOR, undefined, processProps.simulatedTx);
            if (txSimComputeUnitsResult.success) {
                // Adjust the transaction based on the simulated compute units
                finalTxParams.computeUnits = txSimComputeUnitsResult.computeUnits;
            }
        }
        if (processConfig === null || processConfig === void 0 ? void 0 : processConfig.useSimulatedComputeUnitsForCUPriceCalculation) {
            if (!(processConfig === null || processConfig === void 0 ? void 0 : processConfig.useSimulatedComputeUnits)) {
                throw new Error(`encountered useSimulatedComputeUnitsForFees=true, but useSimulatedComputeUnits is false`);
            }
            if (!(processConfig === null || processConfig === void 0 ? void 0 : processConfig.getCUPriceFromComputeUnits)) {
                throw new Error(`encountered useSimulatedComputeUnitsForFees=true, but getComputeUnitPriceFromUnitsToUse helper method is undefined`);
            }
            const simulatedComputeUnits = finalTxParams.computeUnits;
            const computeUnitPrice = processConfig.getCUPriceFromComputeUnits(simulatedComputeUnits);
            console.debug(`🔧:: Adjusting compute unit price for simulated compute unit budget :: ${finalTxParams.computeUnitsPrice}=>${computeUnitPrice}`);
            finalTxParams.computeUnitsPrice = computeUnitPrice;
        }
        // # Return Final Tx Params
        return finalTxParams;
    }
}
exports.TransactionParamProcessor = TransactionParamProcessor;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/blockhashFetcher/cachedBlockhashFetcher.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CachedBlockhashFetcher = void 0;
/**
 * Fetches the latest blockhash and caches it for a configurable amount of time.
 *
 * - Prevents RPC spam by reusing cached values
 * - Retries on failure with exponential backoff
 * - Prevents concurrent requests for the same blockhash
 */ class CachedBlockhashFetcher {
    constructor(connection, blockhashCommitment, retryCount, retrySleepTimeMs, staleCacheTimeMs){
        this.connection = connection;
        this.blockhashCommitment = blockhashCommitment;
        this.retryCount = retryCount;
        this.retrySleepTimeMs = retrySleepTimeMs;
        this.staleCacheTimeMs = staleCacheTimeMs;
        this.recentBlockhashCache = {
            value: undefined,
            lastUpdated: 0
        };
        this.blockhashFetchingPromise = null;
    }
    async fetchBlockhashWithRetry() {
        for(let i = 0; i < this.retryCount; i++){
            try {
                return await this.connection.getLatestBlockhash(this.blockhashCommitment);
            } catch (err) {
                if (i === this.retryCount - 1) {
                    throw new Error('Failed to fetch blockhash after maximum retries');
                }
                await this.sleep(this.retrySleepTimeMs * 2 ** i);
            }
        }
        throw new Error('Failed to fetch blockhash after maximum retries');
    }
    sleep(ms) {
        return new Promise((resolve)=>setTimeout(resolve, ms));
    }
    async updateBlockhashCache() {
        const result = await this.fetchBlockhashWithRetry();
        this.recentBlockhashCache = {
            value: result,
            lastUpdated: Date.now()
        };
    }
    async getLatestBlockhash() {
        if (this.isCacheStale()) {
            await this.refreshBlockhash();
        }
        return this.recentBlockhashCache.value;
    }
    isCacheStale() {
        const lastUpdateTime = this.recentBlockhashCache.lastUpdated;
        return !lastUpdateTime || Date.now() > lastUpdateTime + this.staleCacheTimeMs;
    }
    /**
     * Refresh the blockhash cache, await a pending refresh if it exists
     */ async refreshBlockhash() {
        if (!this.blockhashFetchingPromise) {
            this.blockhashFetchingPromise = this.updateBlockhashCache();
            try {
                await this.blockhashFetchingPromise;
            } finally{
                this.blockhashFetchingPromise = null;
            }
        } else {
            await this.blockhashFetchingPromise;
        }
    }
}
exports.CachedBlockhashFetcher = CachedBlockhashFetcher;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/blockhashFetcher/baseBlockhashFetcher.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BaseBlockhashFetcher = void 0;
class BaseBlockhashFetcher {
    constructor(connection, blockhashCommitment){
        this.connection = connection;
        this.blockhashCommitment = blockhashCommitment;
    }
    async getLatestBlockhash() {
        return this.connection.getLatestBlockhash(this.blockhashCommitment);
    }
}
exports.BaseBlockhashFetcher = BaseBlockhashFetcher;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/utils.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createNativeInstructionDiscriminatorBuffer = exports.getSizeOfTransaction = exports.isVersionedTransaction = exports.NATIVE_INSTRUCTION_MAGIC_BYTES = exports.MAX_TX_BYTE_SIZE = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
exports.MAX_TX_BYTE_SIZE = 1232;
exports.NATIVE_INSTRUCTION_MAGIC_BYTES = [
    0xff,
    0xff,
    0xff,
    0xff
];
const isVersionedTransaction = (tx)=>{
    const version = tx === null || tx === void 0 ? void 0 : tx.version;
    const isVersionedTx = tx instanceof web3_js_1.VersionedTransaction || version !== undefined;
    return isVersionedTx;
};
exports.isVersionedTransaction = isVersionedTransaction;
const getSizeOfTransaction = (instructions, versionedTransaction = true, addressLookupTables = [])=>{
    const programs = new Set();
    const signers = new Set();
    let accounts = new Set();
    instructions.forEach((ix)=>{
        try {
            if (ix.programId) {
                programs.add(ix.programId.toBase58());
                accounts.add(ix.programId.toBase58());
            }
            if (ix.keys) {
                ix.keys.forEach((key)=>{
                    if (key.isSigner) {
                        signers.add(key.pubkey.toBase58());
                    }
                    accounts.add(key.pubkey.toBase58());
                });
            }
        } catch (e) {
            console.log(e);
        }
    });
    const instructionSizes = instructions.map((ix)=>1 + getSizeOfCompressedU16(ix.keys.length) + ix.keys.length + getSizeOfCompressedU16(ix.data.length) + ix.data.length).reduce((a, b)=>a + b, 0);
    let numberOfAddressLookups = 0;
    if (addressLookupTables.length > 0) {
        const lookupTableAddresses = addressLookupTables.map((addressLookupTable)=>addressLookupTable.state.addresses.map((address)=>address.toBase58())).flat();
        const totalNumberOfAccounts = accounts.size;
        accounts = new Set([
            ...accounts
        ].filter((account)=>!lookupTableAddresses.includes(account)));
        accounts = new Set([
            ...accounts,
            ...programs,
            ...signers
        ]);
        numberOfAddressLookups = totalNumberOfAccounts - accounts.size;
    }
    return getSizeOfCompressedU16(signers.size) + signers.size * 64 + // array of signatures
    3 + getSizeOfCompressedU16(accounts.size) + 32 * accounts.size + // array of account addresses
    32 + // recent blockhash
    getSizeOfCompressedU16(instructions.length) + instructionSizes + // array of instructions
    (versionedTransaction ? 1 + getSizeOfCompressedU16(0) : 0) + (versionedTransaction ? 32 * addressLookupTables.length : 0) + (versionedTransaction && addressLookupTables.length > 0 ? 2 : 0) + numberOfAddressLookups;
};
exports.getSizeOfTransaction = getSizeOfTransaction;
function getSizeOfCompressedU16(n) {
    return 1 + Number(n >= 128) + Number(n >= 16384);
}
function createNativeInstructionDiscriminatorBuffer(discriminator) {
    const buffer = new Uint8Array(5);
    buffer.set(exports.NATIVE_INSTRUCTION_MAGIC_BYTES, 0);
    buffer.set([
        discriminator
    ], 4);
    return buffer;
}
exports.createNativeInstructionDiscriminatorBuffer = createNativeInstructionDiscriminatorBuffer;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/txHandler.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TxHandler = exports.COMPUTE_UNITS_DEFAULT = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const txParamProcessor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/txParamProcessor.js [app-route] (ecmascript)");
const bs58_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/bs58@4.0.1/node_modules/bs58/index.js [app-route] (ecmascript)"));
const computeUnits_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/util/computeUnits.js [app-route] (ecmascript)");
const cachedBlockhashFetcher_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/blockhashFetcher/cachedBlockhashFetcher.js [app-route] (ecmascript)");
const baseBlockhashFetcher_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/blockhashFetcher/baseBlockhashFetcher.js [app-route] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/utils.js [app-route] (ecmascript)");
const config_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/config.js [app-route] (ecmascript)");
/**
 * Explanation for SIGNATURE_BLOCK_AND_EXPIRY:
 *
 * When the whileValidTxSender waits for confirmation of a given transaction, it needs the last available blockheight and blockhash used in the signature to do so. For pre-signed transactions, these values aren't attached to the transaction object by default. For a "scrappy" workaround which doesn't break backwards compatibility, the SIGNATURE_BLOCK_AND_EXPIRY property is simply attached to the transaction objects as they are created or signed in this handler despite a mismatch in the typescript types. If the values are attached to the transaction when they reach the whileValidTxSender, it can opt-in to use these values.
 */ const DEV_TRY_FORCE_TX_TIMEOUTS = process.env.DEV_TRY_FORCE_TX_TIMEOUTS === 'true' || false;
exports.COMPUTE_UNITS_DEFAULT = 200000;
const BLOCKHASH_FETCH_RETRY_COUNT = 3;
const BLOCKHASH_FETCH_RETRY_SLEEP = 200;
const RECENT_BLOCKHASH_STALE_TIME_MS = 2000; // Reuse blockhashes within this timeframe during bursts of tx contruction
/**
 * This class is responsible for creating and signing transactions.
 */ class TxHandler {
    constructor(props){
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
        this.blockHashToLastValidBlockHeightLookup = {};
        this.returnBlockHeightsWithSignedTxCallbackData = false;
        this.blockhashCommitment = config_1.DEFAULT_CONFIRMATION_OPTS.commitment;
        this.getProps = (wallet, confirmationOpts)=>[
                wallet !== null && wallet !== void 0 ? wallet : this.wallet,
                confirmationOpts !== null && confirmationOpts !== void 0 ? confirmationOpts : this.confirmationOptions
            ];
        this.connection = props.connection;
        this.wallet = props.wallet;
        this.confirmationOptions = props.confirmationOptions;
        this.blockhashCommitment = (_e = (_d = (_b = (_a = props.confirmationOptions) === null || _a === void 0 ? void 0 : _a.preflightCommitment) !== null && _b !== void 0 ? _b : (_c = props === null || props === void 0 ? void 0 : props.connection) === null || _c === void 0 ? void 0 : _c.commitment) !== null && _d !== void 0 ? _d : this.blockhashCommitment) !== null && _e !== void 0 ? _e : 'confirmed';
        this.blockHashFetcher = ((_f = props === null || props === void 0 ? void 0 : props.config) === null || _f === void 0 ? void 0 : _f.blockhashCachingEnabled) ? new cachedBlockhashFetcher_1.CachedBlockhashFetcher(this.connection, this.blockhashCommitment, (_j = (_h = (_g = props === null || props === void 0 ? void 0 : props.config) === null || _g === void 0 ? void 0 : _g.blockhashCachingConfig) === null || _h === void 0 ? void 0 : _h.retryCount) !== null && _j !== void 0 ? _j : BLOCKHASH_FETCH_RETRY_COUNT, (_m = (_l = (_k = props === null || props === void 0 ? void 0 : props.config) === null || _k === void 0 ? void 0 : _k.blockhashCachingConfig) === null || _l === void 0 ? void 0 : _l.retrySleepTimeMs) !== null && _m !== void 0 ? _m : BLOCKHASH_FETCH_RETRY_SLEEP, (_q = (_p = (_o = props === null || props === void 0 ? void 0 : props.config) === null || _o === void 0 ? void 0 : _o.blockhashCachingConfig) === null || _p === void 0 ? void 0 : _p.staleCacheTimeMs) !== null && _q !== void 0 ? _q : RECENT_BLOCKHASH_STALE_TIME_MS) : new baseBlockhashFetcher_1.BaseBlockhashFetcher(this.connection, this.blockhashCommitment);
        // #Optionals
        this.returnBlockHeightsWithSignedTxCallbackData = (_s = (_r = props.opts) === null || _r === void 0 ? void 0 : _r.returnBlockHeightsWithSignedTxCallbackData) !== null && _s !== void 0 ? _s : false;
        this.onSignedCb = (_t = props.opts) === null || _t === void 0 ? void 0 : _t.onSignedCb;
        this.preSignedCb = (_u = props.opts) === null || _u === void 0 ? void 0 : _u.preSignedCb;
    }
    getWallet() {
        return this.wallet;
    }
    addHashAndExpiryToLookup(hashAndExpiry) {
        if (!this.returnBlockHeightsWithSignedTxCallbackData) return;
        this.blockHashToLastValidBlockHeightLookup[hashAndExpiry.blockhash] = hashAndExpiry.lastValidBlockHeight;
    }
    updateWallet(wallet) {
        this.wallet = wallet;
    }
    /**
     * Created this to prevent non-finalized blockhashes being used when building transactions. We want to always use finalized because otherwise it's easy to get the BlockHashNotFound error (RPC uses finalized to validate a transaction). Using an older blockhash when building transactions should never really be a problem right now.
     *
     * https://www.helius.dev/blog/how-to-deal-with-blockhash-errors-on-solana#why-do-blockhash-errors-occur
     *
     * @returns
     */ async getLatestBlockhashForTransaction() {
        return this.blockHashFetcher.getLatestBlockhash();
    }
    /**
     * Applies recent blockhash and signs a given transaction
     * @param tx
     * @param additionalSigners
     * @param wallet
     * @param confirmationOpts
     * @param preSigned
     * @param recentBlockhash
     * @returns
     */ async prepareTx(tx, additionalSigners, wallet, confirmationOpts, preSigned, recentBlockhash) {
        if (preSigned) {
            return tx;
        }
        [wallet, confirmationOpts] = this.getProps(wallet, confirmationOpts);
        tx.feePayer = wallet.publicKey;
        recentBlockhash = recentBlockhash ? recentBlockhash : await this.getLatestBlockhashForTransaction();
        tx.recentBlockhash = recentBlockhash.blockhash;
        this.addHashAndExpiryToLookup(recentBlockhash);
        const signedTx = await this.signTx(tx, additionalSigners);
        // @ts-ignore
        signedTx.SIGNATURE_BLOCK_AND_EXPIRY = recentBlockhash;
        return signedTx;
    }
    isVersionedTransaction(tx) {
        return (0, utils_1.isVersionedTransaction)(tx);
    }
    isLegacyTransaction(tx) {
        return !this.isVersionedTransaction(tx);
    }
    getTxSigFromSignedTx(signedTx) {
        if (this.isVersionedTransaction(signedTx)) {
            return bs58_1.default.encode(Buffer.from(signedTx.signatures[0]));
        } else {
            return bs58_1.default.encode(Buffer.from(signedTx.signature));
        }
    }
    getBlockhashFromSignedTx(signedTx) {
        if (this.isVersionedTransaction(signedTx)) {
            return signedTx.message.recentBlockhash;
        } else {
            return signedTx.recentBlockhash;
        }
    }
    async signTx(tx, additionalSigners, wallet) {
        var _a;
        [wallet] = this.getProps(wallet);
        additionalSigners.filter((s)=>s !== undefined).forEach((kp)=>{
            tx.partialSign(kp);
        });
        (_a = this.preSignedCb) === null || _a === void 0 ? void 0 : _a.call(this);
        const signedTx = await wallet.signTransaction(tx);
        // Turn txSig Buffer into base58 string
        const txSig = this.getTxSigFromSignedTx(signedTx);
        this.handleSignedTxData([
            {
                txSig,
                signedTx,
                blockHash: this.getBlockhashFromSignedTx(signedTx)
            }
        ]);
        return signedTx;
    }
    async signVersionedTx(tx, additionalSigners, recentBlockhash, wallet) {
        var _a;
        [wallet] = this.getProps(wallet);
        if (recentBlockhash) {
            tx.message.recentBlockhash = recentBlockhash.blockhash;
            this.addHashAndExpiryToLookup(recentBlockhash);
            // @ts-ignore
            tx.SIGNATURE_BLOCK_AND_EXPIRY = recentBlockhash;
        }
        additionalSigners === null || additionalSigners === void 0 ? void 0 : additionalSigners.filter((s)=>s !== undefined).forEach((kp)=>{
            tx.sign([
                kp
            ]);
        });
        (_a = this.preSignedCb) === null || _a === void 0 ? void 0 : _a.call(this);
        //@ts-ignore
        const signedTx = await wallet.signTransaction(tx);
        // Turn txSig Buffer into base58 string
        const txSig = this.getTxSigFromSignedTx(signedTx);
        this.handleSignedTxData([
            {
                txSig,
                signedTx,
                blockHash: this.getBlockhashFromSignedTx(signedTx)
            }
        ]);
        return signedTx;
    }
    handleSignedTxData(txData) {
        if (!this.returnBlockHeightsWithSignedTxCallbackData) {
            if (this.onSignedCb) {
                this.onSignedCb(txData);
            }
            return;
        }
        const signedTxData = txData.map((tx)=>{
            const lastValidBlockHeight = this.blockHashToLastValidBlockHeightLookup[tx.blockHash];
            return {
                ...tx,
                lastValidBlockHeight
            };
        });
        if (this.onSignedCb) {
            this.onSignedCb(signedTxData);
        }
        return signedTxData;
    }
    /**
     * Gets transaction params with extra processing applied, like using the simulated compute units or using a dynamically calculated compute unit price.
     * @param txBuildingProps
     * @returns
     */ async getProcessedTransactionParams(txBuildingProps) {
        var _a, _b;
        const baseTxParams = {
            computeUnits: (_a = txBuildingProps === null || txBuildingProps === void 0 ? void 0 : txBuildingProps.txParams) === null || _a === void 0 ? void 0 : _a.computeUnits,
            computeUnitsPrice: (_b = txBuildingProps === null || txBuildingProps === void 0 ? void 0 : txBuildingProps.txParams) === null || _b === void 0 ? void 0 : _b.computeUnitsPrice
        };
        const processedTxParams = await txParamProcessor_1.TransactionParamProcessor.process({
            baseTxParams,
            txBuilder: (updatedTxParams)=>{
                var _a;
                return this.buildTransaction({
                    ...txBuildingProps,
                    txParams: (_a = updatedTxParams.txParams) !== null && _a !== void 0 ? _a : baseTxParams,
                    forceVersionedTransaction: true
                });
            },
            processConfig: {
                useSimulatedComputeUnits: txBuildingProps.txParams.useSimulatedComputeUnits,
                computeUnitsBufferMultiplier: txBuildingProps.txParams.computeUnitsBufferMultiplier,
                useSimulatedComputeUnitsForCUPriceCalculation: txBuildingProps.txParams.useSimulatedComputeUnitsForCUPriceCalculation,
                getCUPriceFromComputeUnits: txBuildingProps.txParams.getCUPriceFromComputeUnits
            },
            processParams: {
                connection: this.connection,
                simulatedTx: txBuildingProps.simulatedTx
            }
        });
        return processedTxParams;
    }
    _generateVersionedTransaction(recentBlockhash, message) {
        this.addHashAndExpiryToLookup(recentBlockhash);
        return new web3_js_1.VersionedTransaction(message);
    }
    generateLegacyVersionedTransaction(recentBlockhash, ixs, wallet) {
        [wallet] = this.getProps(wallet);
        const message = new web3_js_1.TransactionMessage({
            payerKey: wallet.publicKey,
            recentBlockhash: recentBlockhash.blockhash,
            instructions: ixs
        }).compileToLegacyMessage();
        const tx = this._generateVersionedTransaction(recentBlockhash, message);
        // @ts-ignore
        tx.SIGNATURE_BLOCK_AND_EXPIRY = recentBlockhash;
        return tx;
    }
    generateVersionedTransaction(recentBlockhash, ixs, lookupTableAccounts, wallet) {
        [wallet] = this.getProps(wallet);
        const message = new web3_js_1.TransactionMessage({
            payerKey: wallet.publicKey,
            recentBlockhash: recentBlockhash.blockhash,
            instructions: ixs
        }).compileToV0Message(lookupTableAccounts);
        const tx = this._generateVersionedTransaction(recentBlockhash, message);
        // @ts-ignore
        tx.SIGNATURE_BLOCK_AND_EXPIRY = recentBlockhash;
        return tx;
    }
    generateLegacyTransaction(ixs, recentBlockhash) {
        const tx = new web3_js_1.Transaction().add(...ixs);
        if (recentBlockhash) {
            tx.recentBlockhash = recentBlockhash.blockhash;
        }
        return tx;
    }
    /**
     * Accepts multiple instructions and builds a transaction for each. Prevents needing to spam RPC with requests for the same blockhash.
     * @param props
     * @returns
     */ async buildBulkTransactions(props) {
        var _a;
        const recentBlockhash = (_a = props === null || props === void 0 ? void 0 : props.recentBlockhash) !== null && _a !== void 0 ? _a : await this.getLatestBlockhashForTransaction();
        return await Promise.all(props.instructions.map((ix)=>{
            if (!ix) return undefined;
            return this.buildTransaction({
                ...props,
                instructions: ix,
                recentBlockhash
            });
        }));
    }
    /**
     *
     * @param instructions
     * @param txParams
     * @param txVersion
     * @param lookupTables
     * @param forceVersionedTransaction Return a VersionedTransaction instance even if the version of the transaction is Legacy
     * @returns
     */ async buildTransaction(props) {
        var _a;
        const { txVersion, txParams, connection: _connection, preFlightCommitment: _preFlightCommitment, fetchAllMarketLookupTableAccounts, forceVersionedTransaction, instructions } = props;
        let { lookupTables } = props;
        const marketLookupTables = await fetchAllMarketLookupTableAccounts();
        lookupTables = lookupTables ? [
            ...lookupTables,
            ...marketLookupTables
        ] : marketLookupTables;
        // # Collect and process Tx Params
        let baseTxParams = {
            computeUnits: txParams === null || txParams === void 0 ? void 0 : txParams.computeUnits,
            computeUnitsPrice: txParams === null || txParams === void 0 ? void 0 : txParams.computeUnitsPrice
        };
        const instructionsArray = Array.isArray(instructions) ? instructions : [
            instructions
        ];
        let instructionsToUse;
        let simulatedTx;
        // add optional ixs if there's room and it doesn't fail simulation (usually oracle cranks)
        if (props.optionalIxs && txVersion === 0) {
            [instructionsToUse, simulatedTx] = await this.simulateAndCalculateInstructions({
                ...props,
                instructions: instructionsArray,
                txVersion,
                lookupTables
            }, props.optionalIxs, txVersion === 0, lookupTables);
        } else {
            instructionsToUse = instructionsArray;
        }
        if (txParams === null || txParams === void 0 ? void 0 : txParams.useSimulatedComputeUnits) {
            const processedTxParams = await this.getProcessedTransactionParams({
                ...props,
                instructions: instructionsToUse,
                simulatedTx: simulatedTx
            });
            baseTxParams = {
                ...baseTxParams,
                ...processedTxParams
            };
        }
        const { hasSetComputeUnitLimitIx, hasSetComputeUnitPriceIx } = (0, computeUnits_1.containsComputeUnitIxs)(instructionsToUse);
        // # Create Tx Instructions
        const allIx = [];
        const computeUnits = baseTxParams === null || baseTxParams === void 0 ? void 0 : baseTxParams.computeUnits;
        if (computeUnits > 0 && !hasSetComputeUnitLimitIx) {
            allIx.push(web3_js_1.ComputeBudgetProgram.setComputeUnitLimit({
                units: computeUnits
            }));
        }
        const computeUnitsPrice = baseTxParams === null || baseTxParams === void 0 ? void 0 : baseTxParams.computeUnitsPrice;
        if (DEV_TRY_FORCE_TX_TIMEOUTS) {
            allIx.push(web3_js_1.ComputeBudgetProgram.setComputeUnitPrice({
                microLamports: 0
            }));
        } else if (computeUnitsPrice > 0 && !hasSetComputeUnitPriceIx) {
            allIx.push(web3_js_1.ComputeBudgetProgram.setComputeUnitPrice({
                microLamports: computeUnitsPrice
            }));
        }
        allIx.push(...instructionsToUse);
        const recentBlockhash = (_a = props === null || props === void 0 ? void 0 : props.recentBlockhash) !== null && _a !== void 0 ? _a : await this.getLatestBlockhashForTransaction();
        // # Create and return Transaction
        if (txVersion === 'legacy') {
            if (forceVersionedTransaction) {
                return this.generateLegacyVersionedTransaction(recentBlockhash, allIx);
            } else {
                return this.generateLegacyTransaction(allIx, recentBlockhash);
            }
        } else {
            return this.generateVersionedTransaction(recentBlockhash, allIx, lookupTables);
        }
    }
    wrapInTx(instruction, computeUnits = 600000, computeUnitsPrice = 0) {
        const tx = new web3_js_1.Transaction();
        if (computeUnits != exports.COMPUTE_UNITS_DEFAULT) {
            tx.add(web3_js_1.ComputeBudgetProgram.setComputeUnitLimit({
                units: computeUnits
            }));
        }
        if (DEV_TRY_FORCE_TX_TIMEOUTS) {
            tx.add(web3_js_1.ComputeBudgetProgram.setComputeUnitPrice({
                microLamports: 0
            }));
        } else if (computeUnitsPrice != 0) {
            tx.add(web3_js_1.ComputeBudgetProgram.setComputeUnitPrice({
                microLamports: computeUnitsPrice
            }));
        }
        return tx.add(instruction);
    }
    /**
     * Get a map of signed and prepared transactions from an array of legacy transactions
     * @param txsToSign
     * @param keys
     * @param wallet
     * @param commitment
     * @returns
     */ async getPreparedAndSignedLegacyTransactionMap(txsMap, wallet, commitment, recentBlockhash) {
        var _a, _b;
        recentBlockhash = recentBlockhash ? recentBlockhash : await this.getLatestBlockhashForTransaction();
        this.addHashAndExpiryToLookup(recentBlockhash);
        for (const tx of Object.values(txsMap)){
            if (!tx) continue;
            tx.recentBlockhash = recentBlockhash.blockhash;
            tx.feePayer = (_a = wallet === null || wallet === void 0 ? void 0 : wallet.publicKey) !== null && _a !== void 0 ? _a : (_b = this.wallet) === null || _b === void 0 ? void 0 : _b.publicKey;
            // @ts-ignore
            tx.SIGNATURE_BLOCK_AND_EXPIRY = recentBlockhash;
        }
        return this.getSignedTransactionMap(txsMap, wallet);
    }
    /**
     * Get a map of signed transactions from an array of transactions to sign.
     * @param txsToSign
     * @param keys
     * @param wallet
     * @returns
     */ async getSignedTransactionMap(txsToSignMap, wallet) {
        var _a;
        [wallet] = this.getProps(wallet);
        const txsToSignEntries = Object.entries(txsToSignMap);
        // Create a map of the same keys as the input map, but with the values set to undefined. We'll populate the filtered (non-undefined) values with signed transactions.
        const signedTxMap = txsToSignEntries.reduce((acc, [key])=>{
            acc[key] = undefined;
            return acc;
        }, {});
        const filteredTxEntries = txsToSignEntries.filter(([_, tx])=>!!tx);
        // Extra handling for legacy transactions
        for (const [_key, tx] of filteredTxEntries){
            if (this.isLegacyTransaction(tx)) {
                tx.feePayer = wallet.publicKey;
            }
        }
        (_a = this.preSignedCb) === null || _a === void 0 ? void 0 : _a.call(this);
        const signedFilteredTxs = await wallet.signAllTransactions(filteredTxEntries.map(([_, tx])=>tx));
        signedFilteredTxs.forEach((signedTx, index)=>{
            var _a;
            // @ts-ignore
            signedTx.SIGNATURE_BLOCK_AND_EXPIRY = // @ts-ignore
            (_a = filteredTxEntries[index][1]) === null || _a === void 0 ? void 0 : _a.SIGNATURE_BLOCK_AND_EXPIRY;
        });
        const signedTxData = this.handleSignedTxData(signedFilteredTxs.map((signedTx)=>{
            return {
                txSig: this.getTxSigFromSignedTx(signedTx),
                signedTx,
                blockHash: this.getBlockhashFromSignedTx(signedTx)
            };
        }));
        filteredTxEntries.forEach(([key], index)=>{
            const signedTx = signedFilteredTxs[index];
            // @ts-ignore
            signedTxMap[key] = signedTx;
        });
        return {
            signedTxMap,
            signedTxData
        };
    }
    /**
     * Accepts multiple instructions and builds a transaction for each. Prevents needing to spam RPC with requests for the same blockhash.
     * @param props
     * @returns
     */ async buildTransactionsMap(props) {
        const builtTxs = await this.buildBulkTransactions({
            ...props,
            instructions: Object.values(props.instructionsMap)
        });
        return Object.keys(props.instructionsMap).reduce((acc, key, index)=>{
            acc[key] = builtTxs[index];
            return acc;
        }, {});
    }
    /**
     * Builds and signs transactions from a given array of instructions for multiple transactions.
     * @param props
     * @returns
     */ async buildAndSignTransactionMap(props) {
        const builtTxs = await this.buildTransactionsMap(props);
        const preppedTransactions = await (props.txVersion === 'legacy' ? this.getPreparedAndSignedLegacyTransactionMap(builtTxs, props.wallet, props.preFlightCommitment) : this.getSignedTransactionMap(builtTxs, props.wallet));
        return preppedTransactions;
    }
    async simulateAndCalculateInstructions(txBuildingProps, optionalInstructions = [], versionedTransaction = true, addressLookupTables = []) {
        var _a;
        const baseInstructions = Array.isArray(txBuildingProps.instructions) ? txBuildingProps.instructions : [
            txBuildingProps.instructions
        ];
        if (optionalInstructions.length === 0) {
            return [
                baseInstructions,
                undefined
            ];
        }
        let allInstructions = [
            ...optionalInstructions,
            ...baseInstructions
        ];
        let txSize = (0, utils_1.getSizeOfTransaction)(allInstructions, versionedTransaction, addressLookupTables);
        while(txSize > utils_1.MAX_TX_BYTE_SIZE && allInstructions.length > baseInstructions.length){
            allInstructions = allInstructions.slice(1);
            txSize = (0, utils_1.getSizeOfTransaction)(allInstructions, versionedTransaction, addressLookupTables);
        }
        const tx = await this.buildTransaction({
            ...txBuildingProps,
            optionalIxs: undefined,
            instructions: allInstructions
        });
        const simulatedTx = await this.connection.simulateTransaction(tx);
        if ((_a = simulatedTx.value) === null || _a === void 0 ? void 0 : _a.err) {
            const tx = await this.buildTransaction({
                ...txBuildingProps,
                optionalIxs: undefined,
                instructions: baseInstructions
            });
            const simulationWithoutOptionalIxs = await this.connection.simulateTransaction(tx);
            return [
                baseInstructions,
                simulationWithoutOptionalIxs.value
            ];
        }
        return [
            allInstructions,
            simulatedTx.value
        ];
    }
}
exports.TxHandler = TxHandler;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/reportTransactionError.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getTransactionError = exports.getTransactionErrorFromTxSig = exports.throwTransactionError = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const config_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/config.js [app-route] (ecmascript)");
/**
 * The new getTransaction method expects a Finality type instead of a Commitment type. The only options for Finality are 'confirmed' and 'finalized'.
 * @param commitment
 * @returns
 */ const commitmentToFinality = (commitment)=>{
    switch(commitment){
        case 'confirmed':
            return 'confirmed';
        case 'finalized':
            return 'finalized';
        default:
            throw new Error(`Invalid commitment when reporting transaction error. The commitment must be 'confirmed' or 'finalized' but was given '${commitment}'. If you're using this commitment for a specific reason, you may need to roll your own logic here.`);
    }
};
const getTransactionResult = async (txSig, connection, commitment)=>{
    const finality = commitmentToFinality(commitment || connection.commitment || config_1.DEFAULT_CONFIRMATION_OPTS.commitment);
    return await connection.getTransaction(txSig, {
        maxSupportedTransactionVersion: 0,
        commitment: finality
    });
};
const getTransactionResultWithRetry = async (txSig, connection, commitment)=>{
    const start = Date.now();
    const retryTimeout = 3000; // Timeout after 3 seconds
    const retryInterval = 800; // Retry with 800ms interval
    const retryCount = 3; // Retry 3 times
    let currentCount = 0;
    let transactionResult = await getTransactionResult(txSig, connection, commitment);
    // Retry 3 times or until timeout as long as we don't have a result yet
    while(!transactionResult && Date.now() - start < retryTimeout && currentCount < retryCount){
        // Sleep for 1 second :: Do this first so that we don't run the first loop immediately after the initial fetch above
        await new Promise((resolve)=>setTimeout(resolve, retryInterval));
        transactionResult = await getTransactionResult(txSig, connection, commitment);
        currentCount++;
    }
    return transactionResult;
};
/**
 * THROWS if there is an error
 *
 * Should only be used for a txSig that is confirmed has an error. There is a race-condition where sometimes the transaction is not instantly available to fetch after the confirmation has already failed with an error, so this method has retry logic which we don't want to do wastefully. This method will throw a generic error if it can't get the transaction result after a retry period.
 * @param txSig
 * @param connection
 * @returns
 */ const throwTransactionError = async (txSig, connection, commitment)=>{
    const err = await (0, exports.getTransactionErrorFromTxSig)(txSig, connection, commitment);
    if (err) {
        throw err;
    }
    return;
};
exports.throwTransactionError = throwTransactionError;
/**
 * RETURNS an error if there is one
 *
 * Should only be used for a txSig that is confirmed has an error. There is a race-condition where sometimes the transaction is not instantly available to fetch after the confirmation has already failed with an error, so this method has retry logic which we don't want to do wastefully. This method will throw a generic error if it can't get the transaction result after a retry period.
 * @param txSig
 * @param connection
 * @returns
 */ const getTransactionErrorFromTxSig = async (txSig, connection, commitment)=>{
    var _a;
    const transactionResult = await getTransactionResultWithRetry(txSig, connection, commitment);
    if (!transactionResult) {
        // Throw a generic error because we couldn't get the transaction result for the given txSig
        return new web3_js_1.SendTransactionError({
            action: 'send',
            signature: txSig,
            transactionMessage: `Transaction Failed`
        });
    }
    if (!((_a = transactionResult === null || transactionResult === void 0 ? void 0 : transactionResult.meta) === null || _a === void 0 ? void 0 : _a.err)) {
        // Assume that the transaction was successful and we are here erroneously because we have a result with no error
        return;
    }
    return (0, exports.getTransactionError)(transactionResult);
};
exports.getTransactionErrorFromTxSig = getTransactionErrorFromTxSig;
const getTransactionError = (transactionResult)=>{
    var _a, _b, _c, _d, _e, _f;
    if (!((_a = transactionResult === null || transactionResult === void 0 ? void 0 : transactionResult.meta) === null || _a === void 0 ? void 0 : _a.err)) {
        return;
    }
    const logs = (_c = (_b = transactionResult === null || transactionResult === void 0 ? void 0 : transactionResult.meta) === null || _b === void 0 ? void 0 : _b.logMessages) !== null && _c !== void 0 ? _c : [
        'No logs'
    ];
    const lastLog = logs[logs.length - 1];
    const friendlyMessage = (_d = lastLog === null || lastLog === void 0 ? void 0 : lastLog.match(/(failed:) (.+)/)) === null || _d === void 0 ? void 0 : _d[2];
    return new web3_js_1.SendTransactionError({
        action: 'send',
        signature: (_f = (_e = transactionResult === null || transactionResult === void 0 ? void 0 : transactionResult.transaction) === null || _e === void 0 ? void 0 : _e.signatures) === null || _f === void 0 ? void 0 : _f[0],
        transactionMessage: `Transaction Failed${friendlyMessage ? `: ${friendlyMessage}` : ''}`,
        logs
    });
};
exports.getTransactionError = getTransactionError;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/baseTxSender.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BaseTxSender = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/types.js [app-route] (ecmascript)");
const assert_1 = __importDefault(__turbopack_context__.r("[externals]/assert [external] (assert, cjs)"));
const bs58_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/bs58@4.0.1/node_modules/bs58/index.js [app-route] (ecmascript)"));
const txHandler_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/txHandler.js [app-route] (ecmascript)");
const node_cache_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/node-cache@5.1.2/node_modules/node-cache/index.js [app-route] (ecmascript)"));
const config_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/config.js [app-route] (ecmascript)");
const txConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/txConstants.js [app-route] (ecmascript)");
const reportTransactionError_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/reportTransactionError.js [app-route] (ecmascript)");
const BASELINE_TX_LAND_RATE = 0.9;
const DEFAULT_TIMEOUT = 35000;
const DEFAULT_TX_LAND_RATE_LOOKBACK_WINDOW_MINUTES = 10;
class BaseTxSender {
    constructor({ connection, wallet, opts = config_1.DEFAULT_CONFIRMATION_OPTS, timeout = DEFAULT_TIMEOUT, additionalConnections = new Array(), confirmationStrategy = types_1.ConfirmationStrategy.Combo, additionalTxSenderCallbacks, trackTxLandRate, txHandler, txLandRateLookbackWindowMinutes = DEFAULT_TX_LAND_RATE_LOOKBACK_WINDOW_MINUTES, landRateToFeeFunc, throwOnTimeoutError = true, throwOnTransactionError = true }){
        this.timeoutCount = 0;
        this.txLandRate = 0;
        this.lastPriorityFeeSuggestion = 1;
        this.connection = connection;
        this.wallet = wallet;
        this.opts = opts;
        this.timeout = timeout;
        this.additionalConnections = additionalConnections;
        this.confirmationStrategy = confirmationStrategy;
        this.additionalTxSenderCallbacks = additionalTxSenderCallbacks;
        this.txHandler = txHandler !== null && txHandler !== void 0 ? txHandler : new txHandler_1.TxHandler({
            connection: this.connection,
            wallet: this.wallet,
            confirmationOptions: this.opts
        });
        this.trackTxLandRate = trackTxLandRate;
        this.lookbackWindowMinutes = txLandRateLookbackWindowMinutes * 60;
        if (this.trackTxLandRate) {
            this.txSigCache = new node_cache_1.default({
                stdTTL: this.lookbackWindowMinutes,
                checkperiod: 120
            });
        }
        this.landRateToFeeFunc = landRateToFeeFunc !== null && landRateToFeeFunc !== void 0 ? landRateToFeeFunc : this.defaultLandRateToFeeFunc.bind(this);
        this.throwOnTimeoutError = throwOnTimeoutError;
        this.throwOnTransactionError = throwOnTransactionError;
    }
    async send(tx, additionalSigners, opts, preSigned) {
        if (additionalSigners === undefined) {
            additionalSigners = [];
        }
        if (opts === undefined) {
            opts = this.opts;
        }
        const signedTx = await this.prepareTx(tx, additionalSigners, opts, preSigned);
        return this.sendRawTransaction(signedTx.serialize(), opts);
    }
    async prepareTx(tx, additionalSigners, opts, preSigned) {
        return this.txHandler.prepareTx(tx, additionalSigners, undefined, opts, preSigned);
    }
    async getVersionedTransaction(ixs, lookupTableAccounts, _additionalSigners, opts, blockhash) {
        return this.txHandler.generateVersionedTransaction(blockhash !== null && blockhash !== void 0 ? blockhash : await this.connection.getLatestBlockhash(), ixs, lookupTableAccounts, this.wallet);
    }
    async sendVersionedTransaction(tx, additionalSigners, opts, preSigned) {
        let signedTx;
        if (preSigned) {
            signedTx = tx;
        // @ts-ignore
        } else if (this.wallet.payer) {
            // @ts-ignore
            tx.sign((additionalSigners !== null && additionalSigners !== void 0 ? additionalSigners : []).concat(this.wallet.payer));
            signedTx = tx;
        } else {
            signedTx = await this.txHandler.signVersionedTx(tx, additionalSigners, undefined, this.wallet);
        }
        if (opts === undefined) {
            opts = this.opts;
        }
        return this.sendRawTransaction(signedTx.serialize(), opts);
    }
    async sendRawTransaction(// eslint-disable-next-line @typescript-eslint/no-unused-vars
    rawTransaction, // eslint-disable-next-line @typescript-eslint/no-unused-vars
    opts) {
        throw new Error('Must be implemented by subclass');
    }
    /* Simulate the tx and return a boolean for success value */ async simulateTransaction(tx) {
        try {
            const result = await this.connection.simulateTransaction(tx);
            if (result.value.err != null) {
                console.error('Error in transaction simulation: ', result.value.err);
                return false;
            }
            return true;
        } catch (e) {
            console.error('Error calling simulateTransaction: ', e);
            return false;
        }
    }
    async confirmTransactionWebSocket(signature, commitment) {
        var _a, _b;
        let decodedSignature;
        try {
            decodedSignature = bs58_1.default.decode(signature);
        } catch (err) {
            throw new Error('signature must be base58 encoded: ' + signature);
        }
        (0, assert_1.default)(decodedSignature.length === 64, 'signature has invalid length');
        const start = Date.now();
        const subscriptionCommitment = commitment || this.opts.commitment;
        const subscriptionIds = new Array();
        const connections = [
            this.connection,
            ...this.additionalConnections
        ];
        let response = null;
        const promises = connections.map((connection, i)=>{
            let subscriptionId;
            const confirmPromise = new Promise((resolve, reject)=>{
                try {
                    subscriptionId = connection.onSignature(signature, (result, context)=>{
                        subscriptionIds[i] = undefined;
                        response = {
                            context,
                            value: result
                        };
                        resolve(null);
                    }, subscriptionCommitment);
                } catch (err) {
                    reject(err);
                }
            });
            subscriptionIds.push(subscriptionId);
            return confirmPromise;
        });
        try {
            await this.promiseTimeout(promises, this.timeout);
        } finally{
            for (const [i, subscriptionId] of subscriptionIds.entries()){
                if (subscriptionId) {
                    connections[i].removeSignatureListener(subscriptionId);
                }
            }
        }
        if (response === null) {
            if (this.confirmationStrategy === types_1.ConfirmationStrategy.Combo) {
                try {
                    const rpcResponse = await this.connection.getSignatureStatuses([
                        signature
                    ]);
                    if ((_b = (_a = rpcResponse === null || rpcResponse === void 0 ? void 0 : rpcResponse.value) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.confirmationStatus) {
                        response = {
                            context: rpcResponse.context,
                            value: {
                                err: rpcResponse.value[0].err
                            }
                        };
                        return response;
                    }
                } catch (error) {
                // Ignore error to pass through to timeout error
                }
            }
            this.timeoutCount += 1;
            const duration = (Date.now() - start) / 1000;
            if (this.throwOnTimeoutError) {
                throw new types_1.TxSendError(`Transaction was not confirmed in ${duration.toFixed(2)} seconds. It is unknown if it succeeded or failed. Check signature ${signature} using the Solana Explorer or CLI tools.`, txConstants_1.NOT_CONFIRMED_ERROR_CODE);
            }
        }
        return response;
    }
    async confirmTransactionPolling(signature, commitment = 'finalized') {
        var _a;
        let totalTime = 0;
        let backoffTime = 400; // approx block time
        const start = Date.now();
        while(totalTime < this.timeout){
            await new Promise((resolve)=>setTimeout(resolve, backoffTime));
            const rpcResponse = await this.connection.getSignatureStatuses([
                signature
            ]);
            const signatureResult = rpcResponse && ((_a = rpcResponse.value) === null || _a === void 0 ? void 0 : _a[0]);
            if (rpcResponse && signatureResult && signatureResult.confirmationStatus === commitment) {
                return {
                    context: rpcResponse.context,
                    value: {
                        err: null
                    }
                };
            }
            totalTime += backoffTime;
            backoffTime = Math.min(backoffTime * 2, 5000);
        }
        // Transaction not confirmed within 30 seconds
        this.timeoutCount += 1;
        const duration = (Date.now() - start) / 1000;
        if (this.throwOnTimeoutError) {
            throw new types_1.TxSendError(`Transaction was not confirmed in ${duration.toFixed(2)} seconds. It is unknown if it succeeded or failed. Check signature ${signature} using the Solana Explorer or CLI tools.`, txConstants_1.NOT_CONFIRMED_ERROR_CODE);
        }
    }
    async confirmTransaction(signature, commitment) {
        if (this.confirmationStrategy === types_1.ConfirmationStrategy.WebSocket || this.confirmationStrategy === types_1.ConfirmationStrategy.Combo) {
            return await this.confirmTransactionWebSocket(signature, commitment);
        } else if (this.confirmationStrategy === types_1.ConfirmationStrategy.Polling) {
            return await this.confirmTransactionPolling(signature, commitment);
        }
    }
    getTimestamp() {
        return new Date().getTime();
    }
    promiseTimeout(promises, timeoutMs) {
        let timeoutId;
        const timeoutPromise = new Promise((resolve)=>{
            timeoutId = setTimeout(()=>resolve(null), timeoutMs);
        });
        return Promise.race([
            ...promises,
            timeoutPromise
        ]).then((result)=>{
            clearTimeout(timeoutId);
            return result;
        });
    }
    sendToAdditionalConnections(rawTx, opts) {
        var _a;
        this.additionalConnections.map((connection)=>{
            connection.sendRawTransaction(rawTx, opts).catch((e)=>{
                console.error(// @ts-ignore
                `error sending tx to additional connection ${connection._rpcEndpoint}`);
                console.error(e);
            });
        });
        (_a = this.additionalTxSenderCallbacks) === null || _a === void 0 ? void 0 : _a.map((callback)=>{
            callback(bs58_1.default.encode(rawTx));
        });
    }
    addAdditionalConnection(newConnection) {
        const alreadyUsingConnection = this.additionalConnections.filter((connection)=>{
            // @ts-ignore
            return connection._rpcEndpoint === newConnection.rpcEndpoint;
        }).length > 0;
        if (!alreadyUsingConnection) {
            this.additionalConnections.push(newConnection);
        }
    }
    getTimeoutCount() {
        return this.timeoutCount;
    }
    async checkConfirmationResultForError(txSig, result) {
        var _a;
        if (result === null || result === void 0 ? void 0 : result.err) {
            await (0, reportTransactionError_1.throwTransactionError)(txSig, this.connection, (_a = this.opts) === null || _a === void 0 ? void 0 : _a.commitment);
        }
        return;
    }
    getTxLandRate() {
        if (!this.trackTxLandRate) {
            return this.txLandRate;
        }
        const keys = this.txSigCache.keys();
        const denominator = keys.length;
        if (denominator === 0) {
            return this.txLandRate;
        }
        let numerator = 0;
        for (const key of keys){
            const value = this.txSigCache.get(key);
            if (value) {
                numerator += 1;
            }
        }
        this.txLandRate = numerator / denominator;
        return this.txLandRate;
    }
    defaultLandRateToFeeFunc(txLandRate) {
        if (txLandRate >= BASELINE_TX_LAND_RATE || this.txSigCache.keys().length < 3) {
            return 1;
        }
        const multiplier = 10 * Math.log10(1 + (BASELINE_TX_LAND_RATE - txLandRate) * 5);
        return Math.min(multiplier, 10);
    }
    getSuggestedPriorityFeeMultiplier() {
        if (!this.trackTxLandRate) {
            return 1;
        }
        return this.landRateToFeeFunc(this.getTxLandRate());
    }
}
exports.BaseTxSender = BaseTxSender;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/retryTxSender.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RetryTxSender = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/types.js [app-route] (ecmascript)");
const baseTxSender_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/baseTxSender.js [app-route] (ecmascript)");
const config_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/config.js [app-route] (ecmascript)");
const DEFAULT_TIMEOUT = 35000;
const DEFAULT_RETRY = 2000;
class RetryTxSender extends baseTxSender_1.BaseTxSender {
    constructor({ connection, wallet, opts = {
        ...config_1.DEFAULT_CONFIRMATION_OPTS,
        maxRetries: 0
    }, timeout = DEFAULT_TIMEOUT, retrySleep = DEFAULT_RETRY, additionalConnections = new Array(), confirmationStrategy = types_1.ConfirmationStrategy.Combo, additionalTxSenderCallbacks = [], txHandler, trackTxLandRate, txLandRateLookbackWindowMinutes, landRateToFeeFunc, throwOnTimeoutError = true }){
        super({
            connection,
            wallet,
            opts,
            timeout,
            additionalConnections,
            confirmationStrategy,
            additionalTxSenderCallbacks,
            txHandler,
            trackTxLandRate,
            txLandRateLookbackWindowMinutes,
            landRateToFeeFunc,
            throwOnTimeoutError
        });
        this.timoutCount = 0;
        this.connection = connection;
        this.wallet = wallet;
        this.opts = opts;
        this.timeout = timeout;
        this.retrySleep = retrySleep;
        this.additionalConnections = additionalConnections;
    }
    async sleep(reference) {
        return new Promise((resolve)=>{
            reference.resolve = resolve;
            setTimeout(resolve, this.retrySleep);
        });
    }
    async sendRawTransaction(rawTransaction, opts) {
        var _a, _b, _c;
        const startTime = this.getTimestamp();
        const txid = await this.connection.sendRawTransaction(rawTransaction, opts);
        (_a = this.txSigCache) === null || _a === void 0 ? void 0 : _a.set(txid, false);
        this.sendToAdditionalConnections(rawTransaction, opts);
        let done = false;
        const resolveReference = {
            resolve: undefined
        };
        const stopWaiting = ()=>{
            done = true;
            if (resolveReference.resolve) {
                resolveReference.resolve();
            }
        };
        (async ()=>{
            while(!done && this.getTimestamp() - startTime < this.timeout){
                await this.sleep(resolveReference);
                if (!done) {
                    this.connection.sendRawTransaction(rawTransaction, opts).catch((e)=>{
                        console.error(e);
                        stopWaiting();
                    });
                    this.sendToAdditionalConnections(rawTransaction, opts);
                }
            }
        })();
        let slot;
        try {
            const result = await this.confirmTransaction(txid, opts.commitment);
            (_b = this.txSigCache) === null || _b === void 0 ? void 0 : _b.set(txid, true);
            await this.checkConfirmationResultForError(txid, result === null || result === void 0 ? void 0 : result.value);
            slot = (_c = result === null || result === void 0 ? void 0 : result.context) === null || _c === void 0 ? void 0 : _c.slot;
        // eslint-disable-next-line no-useless-catch
        } catch (e) {
            throw e;
        } finally{
            stopWaiting();
        }
        return {
            txSig: txid,
            slot
        };
    }
}
exports.RetryTxSender = RetryTxSender;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/fastSingleTxSender.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FastSingleTxSender = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/types.js [app-route] (ecmascript)");
const baseTxSender_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/baseTxSender.js [app-route] (ecmascript)");
const config_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/config.js [app-route] (ecmascript)");
const DEFAULT_TIMEOUT = 35000;
const DEFAULT_BLOCKHASH_REFRESH = 10000;
class FastSingleTxSender extends baseTxSender_1.BaseTxSender {
    constructor({ connection, wallet, opts = {
        ...config_1.DEFAULT_CONFIRMATION_OPTS,
        maxRetries: 0
    }, timeout = DEFAULT_TIMEOUT, blockhashRefreshInterval = DEFAULT_BLOCKHASH_REFRESH, additionalConnections = new Array(), skipConfirmation = false, confirmInBackground = false, blockhashCommitment = 'finalized', confirmationStrategy = types_1.ConfirmationStrategy.Combo, trackTxLandRate, txHandler, txLandRateLookbackWindowMinutes, landRateToFeeFunc, throwOnTimeoutError = true }){
        super({
            connection,
            wallet,
            opts,
            timeout,
            additionalConnections,
            confirmationStrategy,
            txHandler,
            trackTxLandRate,
            txLandRateLookbackWindowMinutes,
            landRateToFeeFunc,
            throwOnTimeoutError
        });
        this.timoutCount = 0;
        this.connection = connection;
        this.wallet = wallet;
        this.opts = opts;
        this.timeout = timeout;
        this.blockhashRefreshInterval = blockhashRefreshInterval;
        this.additionalConnections = additionalConnections;
        this.skipConfirmation = skipConfirmation;
        this.confirmInBackground = confirmInBackground;
        this.blockhashCommitment = blockhashCommitment;
        this.startBlockhashRefreshLoop();
    }
    startBlockhashRefreshLoop() {
        if (this.blockhashRefreshInterval > 0) {
            this.blockhashIntervalId = setInterval(async ()=>{
                try {
                    this.recentBlockhash = await this.connection.getLatestBlockhash(this.blockhashCommitment);
                } catch (e) {
                    console.error('Error in startBlockhashRefreshLoop: ', e);
                }
            }, this.blockhashRefreshInterval);
        }
    }
    async sendRawTransaction(rawTransaction, opts) {
        var _a, _b, _c;
        let txid;
        try {
            txid = await this.connection.sendRawTransaction(rawTransaction, opts);
            (_a = this.txSigCache) === null || _a === void 0 ? void 0 : _a.set(txid, false);
            this.sendToAdditionalConnections(rawTransaction, opts);
        } catch (e) {
            console.error(e);
            throw e;
        }
        let slot;
        if (!this.skipConfirmation) {
            try {
                if (this.confirmInBackground) {
                    this.confirmTransaction(txid, opts.commitment).then(async (result)=>{
                        var _a;
                        (_a = this.txSigCache) === null || _a === void 0 ? void 0 : _a.set(txid, true);
                        await this.checkConfirmationResultForError(txid, result === null || result === void 0 ? void 0 : result.value);
                        slot = result.context.slot;
                    });
                } else {
                    const result = await this.confirmTransaction(txid, opts.commitment);
                    (_b = this.txSigCache) === null || _b === void 0 ? void 0 : _b.set(txid, true);
                    await this.checkConfirmationResultForError(txid, result === null || result === void 0 ? void 0 : result.value);
                    slot = (_c = result === null || result === void 0 ? void 0 : result.context) === null || _c === void 0 ? void 0 : _c.slot;
                }
            } catch (e) {
                console.error(e);
                throw e;
            }
        }
        return {
            txSig: txid,
            slot
        };
    }
}
exports.FastSingleTxSender = FastSingleTxSender;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/whileValidTxSender.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WhileValidTxSender = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/types.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const baseTxSender_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/baseTxSender.js [app-route] (ecmascript)");
const bs58_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/bs58@4.0.1/node_modules/bs58/index.js [app-route] (ecmascript)"));
const config_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/config.js [app-route] (ecmascript)");
const DEFAULT_RETRY = 2000;
class WhileValidTxSender extends baseTxSender_1.BaseTxSender {
    async checkAndSetUseBlockHeightOffset() {
        this.connection.getVersion().then((version)=>{
            const solanaCoreVersion = version['solana-core'];
            if (!solanaCoreVersion) return;
            const majorVersion = solanaCoreVersion.split('.')[0];
            if (!majorVersion) return;
            const parsedMajorVersion = parseInt(majorVersion);
            if (isNaN(parsedMajorVersion)) return;
            if (parsedMajorVersion >= 2) {
                this.useBlockHeightOffset = false;
            } else {
                this.useBlockHeightOffset = true;
            }
        });
    }
    constructor({ connection, wallet, opts = {
        ...config_1.DEFAULT_CONFIRMATION_OPTS,
        maxRetries: 0
    }, retrySleep = DEFAULT_RETRY, additionalConnections = new Array(), confirmationStrategy = types_1.ConfirmationStrategy.Combo, additionalTxSenderCallbacks = [], txHandler, trackTxLandRate, txLandRateLookbackWindowMinutes, landRateToFeeFunc, throwOnTimeoutError = true, throwOnTransactionError = true }){
        super({
            connection,
            wallet,
            opts,
            additionalConnections,
            additionalTxSenderCallbacks,
            txHandler,
            trackTxLandRate,
            txLandRateLookbackWindowMinutes,
            confirmationStrategy,
            landRateToFeeFunc,
            throwOnTimeoutError,
            throwOnTransactionError
        });
        this.timoutCount = 0;
        this.untilValid = new Map();
        this.useBlockHeightOffset = true;
        this.retrySleep = retrySleep;
        this.checkAndSetUseBlockHeightOffset();
    }
    async sleep(reference) {
        return new Promise((resolve)=>{
            reference.resolve = resolve;
            setTimeout(resolve, this.retrySleep);
        });
    }
    async prepareTx(tx, additionalSigners, opts, preSigned) {
        var _a;
        let latestBlockhash = await this.txHandler.getLatestBlockhashForTransaction();
        // handle tx
        let signedTx = tx;
        if (!preSigned) {
            signedTx = await this.txHandler.prepareTx(tx, additionalSigners, undefined, opts, false, latestBlockhash);
        }
        // See SIGNATURE_BLOCK_AND_EXPIRY explanation in txHandler.ts if this is confusing
        // @ts-ignore
        if (preSigned && tx.SIGNATURE_BLOCK_AND_EXPIRY) {
            // @ts-ignore
            latestBlockhash = tx.SIGNATURE_BLOCK_AND_EXPIRY;
        }
        // handle subclass-specific side effects
        const txSig = bs58_1.default.encode((signedTx === null || signedTx === void 0 ? void 0 : signedTx.signature) || ((_a = signedTx.signatures[0]) === null || _a === void 0 ? void 0 : _a.signature));
        this.untilValid.set(txSig, latestBlockhash);
        return signedTx;
    }
    async sendVersionedTransaction(tx, additionalSigners, opts, preSigned) {
        let latestBlockhash = await this.txHandler.getLatestBlockhashForTransaction();
        let signedTx;
        if (preSigned) {
            signedTx = tx;
            // See SIGNATURE_BLOCK_AND_EXPIRY explanation in txHandler.ts if this is confusing
            // @ts-ignore
            if (tx.SIGNATURE_BLOCK_AND_EXPIRY) {
                // @ts-ignore
                latestBlockhash = tx.SIGNATURE_BLOCK_AND_EXPIRY;
            }
        // @ts-ignore
        } else if (this.wallet.payer) {
            tx.message.recentBlockhash = latestBlockhash.blockhash;
            // @ts-ignore
            tx.sign((additionalSigners !== null && additionalSigners !== void 0 ? additionalSigners : []).concat(this.wallet.payer));
            signedTx = tx;
        } else {
            tx.message.recentBlockhash = latestBlockhash.blockhash;
            additionalSigners === null || additionalSigners === void 0 ? void 0 : additionalSigners.filter((s)=>s !== undefined).forEach((kp)=>{
                tx.sign([
                    kp
                ]);
            });
            signedTx = await this.txHandler.signVersionedTx(tx, additionalSigners, latestBlockhash);
        }
        if (opts === undefined) {
            opts = this.opts;
        }
        const txSig = bs58_1.default.encode(signedTx.signatures[0]);
        this.untilValid.set(txSig, latestBlockhash);
        return this.sendRawTransaction(signedTx.serialize(), opts);
    }
    async sendRawTransaction(rawTransaction, opts) {
        var _a, _b, _c, _d;
        const startTime = this.getTimestamp();
        const txid = await this.connection.sendRawTransaction(rawTransaction, opts);
        (_a = this.txSigCache) === null || _a === void 0 ? void 0 : _a.set(txid, false);
        this.sendToAdditionalConnections(rawTransaction, opts);
        let done = false;
        const resolveReference = {
            resolve: undefined
        };
        const stopWaiting = ()=>{
            done = true;
            if (resolveReference.resolve) {
                resolveReference.resolve();
            }
        };
        (async ()=>{
            while(!done && this.getTimestamp() - startTime < this.timeout){
                await this.sleep(resolveReference);
                if (!done) {
                    this.connection.sendRawTransaction(rawTransaction, opts).catch((e)=>{
                        console.error(e);
                        stopWaiting();
                    });
                    this.sendToAdditionalConnections(rawTransaction, opts);
                }
            }
        })();
        let slot;
        try {
            const result = await this.confirmTransaction(txid, opts.commitment);
            (_b = this.txSigCache) === null || _b === void 0 ? void 0 : _b.set(txid, true);
            await this.checkConfirmationResultForError(txid, result === null || result === void 0 ? void 0 : result.value);
            if (((_c = result === null || result === void 0 ? void 0 : result.value) === null || _c === void 0 ? void 0 : _c.err) && this.throwOnTransactionError) {
                // Fallback error handling if there's a problem reporting the error in checkConfirmationResultForError
                throw new web3_js_1.SendTransactionError({
                    action: 'send',
                    signature: txid,
                    transactionMessage: `Transaction Failed`
                });
            }
            slot = (_d = result === null || result === void 0 ? void 0 : result.context) === null || _d === void 0 ? void 0 : _d.slot;
        // eslint-disable-next-line no-useless-catch
        } catch (e) {
            throw e;
        } finally{
            stopWaiting();
            this.untilValid.delete(txid);
        }
        return {
            txSig: txid,
            slot
        };
    }
}
exports.WhileValidTxSender = WhileValidTxSender;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/priorityFeeCalculator.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PriorityFeeCalculator = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
/**
 * This class determines whether a priority fee needs to be included in a transaction based on
 * a recent history of timed out transactions.
 */ class PriorityFeeCalculator {
    /**
     * Constructor for the PriorityFeeCalculator class.
     * @param currentTimeMs - The current time in milliseconds.
     * @param priorityFeeLatchDurationMs - The duration for how long to stay in triggered state before resetting. Default value is 10 seconds.
     */ constructor(currentTimeMs, priorityFeeLatchDurationMs = 10 * 1000){
        this.lastTxTimeoutCount = 0;
        this.priorityFeeTriggered = false;
        this.lastTxTimeoutCountTriggered = currentTimeMs;
        this.priorityFeeLatchDurationMs = priorityFeeLatchDurationMs;
    }
    /**
     * Update the priority fee state based on the current time and the current timeout count.
     * @param currentTimeMs current time in milliseconds
     * @returns true if priority fee should be included in the next transaction
     */ updatePriorityFee(currentTimeMs, txTimeoutCount) {
        let triggerPriorityFee = false;
        if (txTimeoutCount > this.lastTxTimeoutCount) {
            this.lastTxTimeoutCount = txTimeoutCount;
            this.lastTxTimeoutCountTriggered = currentTimeMs;
            triggerPriorityFee = true;
        } else {
            if (!this.priorityFeeTriggered) {
                triggerPriorityFee = false;
            } else if (currentTimeMs - this.lastTxTimeoutCountTriggered < this.priorityFeeLatchDurationMs) {
                triggerPriorityFee = true;
            }
        }
        this.priorityFeeTriggered = triggerPriorityFee;
        return triggerPriorityFee;
    }
    /**
     * This method returns a transaction instruction list that sets the compute limit on the ComputeBudget program.
     * @param computeUnitLimit - The maximum number of compute units that can be used by the transaction.
     * @returns An array of transaction instructions.
     */ generateComputeBudgetIxs(computeUnitLimit) {
        const ixs = [
            web3_js_1.ComputeBudgetProgram.setComputeUnitLimit({
                units: computeUnitLimit
            })
        ];
        return ixs;
    }
    /**
     * Calculates the compute unit price to use based on the desired additional fee to pay and the compute unit limit.
     * @param computeUnitLimit desired CU to use
     * @param additionalFeeMicroLamports desired additional fee to pay, in micro lamports
     * @returns the compute unit price to use, in micro lamports
     */ calculateComputeUnitPrice(computeUnitLimit, additionalFeeMicroLamports) {
        return additionalFeeMicroLamports / computeUnitLimit;
    }
    /**
     * This method generates a list of transaction instructions for the ComputeBudget program, and includes a priority fee if it's required
     * @param computeUnitLimit - The maximum number of compute units that can be used by the transaction.
     * @param usePriorityFee - A boolean indicating whether to include a priority fee in the transaction, this should be from `this.updatePriorityFee()` or `this.priorityFeeTriggered`.
     * @param additionalFeeMicroLamports - The additional fee to be paid, in micro lamports, the actual price will be calculated.
     * @returns An array of transaction instructions.
     */ generateComputeBudgetWithPriorityFeeIx(computeUnitLimit, usePriorityFee, additionalFeeMicroLamports) {
        const ixs = this.generateComputeBudgetIxs(computeUnitLimit);
        if (usePriorityFee) {
            const computeUnitPrice = this.calculateComputeUnitPrice(computeUnitLimit, additionalFeeMicroLamports);
            ixs.push(web3_js_1.ComputeBudgetProgram.setComputeUnitPrice({
                microLamports: computeUnitPrice
            }));
        }
        return ixs;
    }
}
exports.PriorityFeeCalculator = PriorityFeeCalculator;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/forwardOnlyTxSender.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ForwardOnlyTxSender = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const bs58_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/bs58@4.0.1/node_modules/bs58/index.js [app-route] (ecmascript)"));
const baseTxSender_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/baseTxSender.js [app-route] (ecmascript)");
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/types.js [app-route] (ecmascript)");
const config_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/config.js [app-route] (ecmascript)");
const DEFAULT_TIMEOUT = 35000;
const DEFAULT_RETRY = 5000;
class ForwardOnlyTxSender extends baseTxSender_1.BaseTxSender {
    constructor({ connection, wallet, opts = {
        ...config_1.DEFAULT_CONFIRMATION_OPTS,
        maxRetries: 0
    }, timeout = DEFAULT_TIMEOUT, retrySleep = DEFAULT_RETRY, confirmationStrategy = types_1.ConfirmationStrategy.Combo, additionalTxSenderCallbacks = [], txHandler, trackTxLandRate, txLandRateLookbackWindowMinutes, landRateToFeeFunc, throwOnTimeoutError = true }){
        super({
            connection,
            wallet,
            opts,
            timeout,
            additionalConnections: [],
            confirmationStrategy,
            additionalTxSenderCallbacks,
            txHandler,
            trackTxLandRate,
            txLandRateLookbackWindowMinutes,
            landRateToFeeFunc,
            throwOnTimeoutError
        });
        this.timoutCount = 0;
        this.connection = connection;
        this.wallet = wallet;
        this.opts = opts;
        this.timeout = timeout;
        this.retrySleep = retrySleep;
        this.additionalConnections = [];
    }
    async sleep(reference) {
        return new Promise((resolve)=>{
            reference.resolve = resolve;
            setTimeout(resolve, this.retrySleep);
        });
    }
    sendToAdditionalConnections(rawTx, _opts) {
        var _a;
        (_a = this.additionalTxSenderCallbacks) === null || _a === void 0 ? void 0 : _a.map((callback)=>{
            callback(bs58_1.default.encode(rawTx));
        });
    }
    async sendRawTransaction(rawTransaction, opts) {
        var _a, _b, _c;
        const deserializedTx = web3_js_1.VersionedTransaction.deserialize(rawTransaction);
        const txSig = deserializedTx.signatures[0];
        const encodedTxSig = bs58_1.default.encode(txSig);
        const startTime = this.getTimestamp();
        this.sendToAdditionalConnections(rawTransaction, opts);
        (_a = this.txSigCache) === null || _a === void 0 ? void 0 : _a.set(encodedTxSig, false);
        let done = false;
        const resolveReference = {
            resolve: undefined
        };
        const stopWaiting = ()=>{
            done = true;
            if (resolveReference.resolve) {
                resolveReference.resolve();
            }
        };
        (async ()=>{
            while(!done && this.getTimestamp() - startTime < this.timeout){
                await this.sleep(resolveReference);
                if (!done) {
                    this.sendToAdditionalConnections(rawTransaction, opts);
                }
            }
        })();
        let slot;
        try {
            const result = await this.confirmTransaction(encodedTxSig, opts.commitment);
            slot = (_b = result === null || result === void 0 ? void 0 : result.context) === null || _b === void 0 ? void 0 : _b.slot;
            (_c = this.txSigCache) === null || _c === void 0 ? void 0 : _c.set(encodedTxSig, true);
        // eslint-disable-next-line no-useless-catch
        } catch (e) {
            throw e;
        } finally{
            stopWaiting();
        }
        return {
            txSig: encodedTxSig,
            slot
        };
    }
}
exports.ForwardOnlyTxSender = ForwardOnlyTxSender;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/userStats.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserStats = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const pollingUserStatsAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/pollingUserStatsAccountSubscriber.js [app-route] (ecmascript)");
const webSocketUserStatsAccountSubsriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketUserStatsAccountSubsriber.js [app-route] (ecmascript)");
const pda_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/addresses/pda.js [app-route] (ecmascript)");
const grpcUserStatsAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/grpcUserStatsAccountSubscriber.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const numericConstants_2 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const numericConstants_3 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const fuel_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/fuel.js [app-route] (ecmascript)");
class UserStats {
    constructor(config){
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.driftClient = config.driftClient;
        this.userStatsAccountPublicKey = config.userStatsAccountPublicKey;
        if (((_a = config.accountSubscription) === null || _a === void 0 ? void 0 : _a.type) === 'polling') {
            this.accountSubscriber = new pollingUserStatsAccountSubscriber_1.PollingUserStatsAccountSubscriber(config.driftClient.program, config.userStatsAccountPublicKey, config.accountSubscription.accountLoader);
        } else if (((_b = config.accountSubscription) === null || _b === void 0 ? void 0 : _b.type) === 'grpc') {
            this.accountSubscriber = new grpcUserStatsAccountSubscriber_1.grpcUserStatsAccountSubscriber(config.accountSubscription.grpcConfigs, config.driftClient.program, config.userStatsAccountPublicKey, {
                resubTimeoutMs: (_c = config.accountSubscription) === null || _c === void 0 ? void 0 : _c.resubTimeoutMs,
                logResubMessages: (_d = config.accountSubscription) === null || _d === void 0 ? void 0 : _d.logResubMessages
            });
        } else if (((_e = config.accountSubscription) === null || _e === void 0 ? void 0 : _e.type) === 'websocket') {
            this.accountSubscriber = new webSocketUserStatsAccountSubsriber_1.WebSocketUserStatsAccountSubscriber(config.driftClient.program, config.userStatsAccountPublicKey, {
                resubTimeoutMs: (_f = config.accountSubscription) === null || _f === void 0 ? void 0 : _f.resubTimeoutMs,
                logResubMessages: (_g = config.accountSubscription) === null || _g === void 0 ? void 0 : _g.logResubMessages
            }, config.accountSubscription.commitment);
        } else if (((_h = config.accountSubscription) === null || _h === void 0 ? void 0 : _h.type) === 'custom') {
            this.accountSubscriber = config.accountSubscription.userStatsAccountSubscriber;
        } else {
            const exhaustiveCheck = config.accountSubscription;
            throw new Error(`Unknown user stats account subscription type: ${exhaustiveCheck}`);
        }
    }
    async subscribe(userStatsAccount) {
        this.isSubscribed = await this.accountSubscriber.subscribe(userStatsAccount);
        return this.isSubscribed;
    }
    async fetchAccounts() {
        await this.accountSubscriber.fetch();
    }
    async unsubscribe() {
        await this.accountSubscriber.unsubscribe();
        this.isSubscribed = false;
    }
    getAccountAndSlot() {
        return this.accountSubscriber.getUserStatsAccountAndSlot();
    }
    getAccount() {
        return this.accountSubscriber.getUserStatsAccountAndSlot().data;
    }
    getInsuranceFuelBonus(now, includeSettled = true, includeUnsettled = true) {
        const userStats = this.getAccount();
        let insuranceFuel = numericConstants_2.ZERO;
        if (includeSettled) {
            insuranceFuel = insuranceFuel.add(new anchor_1.BN(userStats.fuelInsurance));
        }
        if (includeUnsettled) {
            // todo: get real time ifStakedGovTokenAmount using ifStakeAccount
            if (userStats.ifStakedGovTokenAmount.gt(numericConstants_2.ZERO)) {
                const spotMarketAccount = this.driftClient.getSpotMarketAccount(numericConstants_3.GOV_SPOT_MARKET_INDEX);
                const fuelBonusNumeratorUserStats = anchor_1.BN.max(now.sub(anchor_1.BN.max(new anchor_1.BN(userStats.lastFuelIfBonusUpdateTs), numericConstants_1.FUEL_START_TS)), numericConstants_2.ZERO);
                insuranceFuel = insuranceFuel.add((0, fuel_1.calculateInsuranceFuelBonus)(spotMarketAccount, userStats.ifStakedGovTokenAmount, fuelBonusNumeratorUserStats));
            }
            if (userStats.ifStakedQuoteAssetAmount.gt(numericConstants_2.ZERO)) {
                const spotMarketAccount = this.driftClient.getSpotMarketAccount(numericConstants_3.QUOTE_SPOT_MARKET_INDEX);
                const fuelBonusNumeratorUserStats = anchor_1.BN.max(now.sub(anchor_1.BN.max(new anchor_1.BN(userStats.lastFuelIfBonusUpdateTs), numericConstants_1.FUEL_START_TS)), numericConstants_2.ZERO);
                insuranceFuel = insuranceFuel.add((0, fuel_1.calculateInsuranceFuelBonus)(spotMarketAccount, userStats.ifStakedQuoteAssetAmount, fuelBonusNumeratorUserStats));
            }
        }
        return insuranceFuel;
    }
    getReferrerInfo() {
        if (this.getAccount().referrer.equals(web3_js_1.PublicKey.default)) {
            return undefined;
        } else {
            return {
                referrer: (0, pda_1.getUserAccountPublicKeySync)(this.driftClient.program.programId, this.getAccount().referrer, 0),
                referrerStats: (0, pda_1.getUserStatsAccountPublicKey)(this.driftClient.program.programId, this.getAccount().referrer)
            };
        }
    }
    static getOldestActionTs(account) {
        return Math.min(account.lastFillerVolume30DTs.toNumber(), account.lastMakerVolume30DTs.toNumber(), account.lastTakerVolume30DTs.toNumber());
    }
}
exports.UserStats = UserStats;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/jupiter/jupiterClient.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.JupiterClient = exports.RECOMMENDED_JUPITER_API = exports.RECOMMENDED_JUPITER_API_VERSION = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const node_fetch_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/node-fetch@2.7.0/node_modules/node-fetch/lib/index.mjs [app-route] (ecmascript)"));
exports.RECOMMENDED_JUPITER_API_VERSION = '/v1';
exports.RECOMMENDED_JUPITER_API = 'https://lite-api.jup.ag/swap';
class JupiterClient {
    constructor({ connection, url }){
        this.lookupTableCahce = new Map();
        this.connection = connection;
        this.url = url !== null && url !== void 0 ? url : exports.RECOMMENDED_JUPITER_API;
    }
    /**
     * Get routes for a swap
     * @param inputMint the mint of the input token
     * @param outputMint the mint of the output token
     * @param amount the amount of the input token
     * @param slippageBps the slippage tolerance in basis points
     * @param swapMode the swap mode (ExactIn or ExactOut)
     * @param onlyDirectRoutes whether to only return direct routes
     */ async getQuote({ inputMint, outputMint, amount, maxAccounts = 50, slippageBps = 50, swapMode = 'ExactIn', onlyDirectRoutes = false, excludeDexes, autoSlippage = false, maxAutoSlippageBps, usdEstimate }) {
        const params = new URLSearchParams({
            inputMint: inputMint.toString(),
            outputMint: outputMint.toString(),
            amount: amount.toString(),
            slippageBps: autoSlippage ? '0' : slippageBps.toString(),
            swapMode,
            onlyDirectRoutes: onlyDirectRoutes.toString(),
            maxAccounts: maxAccounts.toString(),
            autoSlippage: autoSlippage.toString(),
            maxAutoSlippageBps: autoSlippage ? maxAutoSlippageBps.toString() : '0',
            autoSlippageCollisionUsdValue: autoSlippage ? usdEstimate.toString() : '0',
            ...excludeDexes && {
                excludeDexes: excludeDexes.join(',')
            }
        });
        if (swapMode === 'ExactOut') {
            params.delete('maxAccounts');
        }
        const apiVersionParam = this.url === exports.RECOMMENDED_JUPITER_API ? exports.RECOMMENDED_JUPITER_API_VERSION : '';
        const quote = await (await (0, node_fetch_1.default)(`${this.url}${apiVersionParam}/quote?${params.toString()}`)).json();
        return quote;
    }
    /**
     * Get a swap transaction for quote
     * @param quoteResponse quote to perform swap
     * @param userPublicKey the signer's wallet public key
     * @param slippageBps the slippage tolerance in basis points
     */ async getSwap({ quote, userPublicKey, slippageBps = 50 }) {
        var _a;
        if (!quote) {
            throw new Error('Jupiter swap quote not provided. Please try again.');
        }
        const apiVersionParam = this.url === exports.RECOMMENDED_JUPITER_API ? exports.RECOMMENDED_JUPITER_API_VERSION : '';
        const resp = await (await (0, node_fetch_1.default)(`${this.url}${apiVersionParam}/swap`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quoteResponse: quote,
                userPublicKey,
                slippageBps
            })
        })).json();
        if (!('swapTransaction' in resp)) {
            throw new Error(`swapTransaction not found, error from Jupiter: ${resp.error} ${', ' + ((_a = resp.message) !== null && _a !== void 0 ? _a : '')}`);
        }
        const { swapTransaction } = resp;
        try {
            const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
            return web3_js_1.VersionedTransaction.deserialize(swapTransactionBuf);
        } catch (err) {
            throw new Error('Something went wrong with creating the Jupiter swap transaction. Please try again.');
        }
    }
    /**
     * Get the transaction message and lookup tables for a transaction
     * @param transaction
     */ async getTransactionMessageAndLookupTables({ transaction }) {
        const message = transaction.message;
        const lookupTables = (await Promise.all(message.addressTableLookups.map(async (lookup)=>{
            return await this.getLookupTable(lookup.accountKey);
        }))).filter((lookup)=>lookup);
        const transactionMessage = web3_js_1.TransactionMessage.decompile(message, {
            addressLookupTableAccounts: lookupTables
        });
        return {
            transactionMessage,
            lookupTables
        };
    }
    async getLookupTable(accountKey) {
        if (this.lookupTableCahce.has(accountKey.toString())) {
            return this.lookupTableCahce.get(accountKey.toString());
        }
        return (await this.connection.getAddressLookupTable(accountKey)).value;
    }
    /**
     * Get the jupiter instructions from transaction by filtering out instructions to compute budget and associated token programs
     * @param transactionMessage the transaction message
     * @param inputMint the input mint
     * @param outputMint the output mint
     */ getJupiterInstructions({ transactionMessage, inputMint, outputMint }) {
        return transactionMessage.instructions.filter((instruction)=>{
            if (instruction.programId.toString() === 'ComputeBudget111111111111111111111111111111') {
                return false;
            }
            if (instruction.programId.toString() === 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') {
                return false;
            }
            if (instruction.programId.toString() === '11111111111111111111111111111111') {
                return false;
            }
            if (instruction.programId.toString() === 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL') {
                const mint = instruction.keys[3].pubkey;
                if (mint.equals(inputMint) || mint.equals(outputMint)) {
                    return false;
                }
            }
            return true;
        });
    }
}
exports.JupiterClient = JupiterClient;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/marinade/types.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IDL = void 0;
exports.IDL = {
    version: '0.1.0',
    name: 'marinade_finance',
    instructions: [
        {
            name: 'initialize',
            accounts: [
                {
                    name: 'creatorAuthority',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'state',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'reservePda',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'stakeList',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'validatorList',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'msolMint',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'operationalSolAccount',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'liqPool',
                    accounts: [
                        {
                            name: 'lpMint',
                            isMut: false,
                            isSigner: false
                        },
                        {
                            name: 'solLegPda',
                            isMut: false,
                            isSigner: false
                        },
                        {
                            name: 'msolLeg',
                            isMut: false,
                            isSigner: false
                        }
                    ]
                },
                {
                    name: 'treasuryMsolAccount',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'clock',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'rent',
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'data',
                    type: {
                        defined: 'InitializeData'
                    }
                }
            ]
        },
        {
            name: 'changeAuthority',
            accounts: [
                {
                    name: 'state',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'adminAuthority',
                    isMut: false,
                    isSigner: true
                }
            ],
            args: [
                {
                    name: 'data',
                    type: {
                        defined: 'ChangeAuthorityData'
                    }
                }
            ]
        },
        {
            name: 'addValidator',
            accounts: [
                {
                    name: 'state',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'managerAuthority',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'validatorList',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'validatorVote',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'duplicationFlag',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'rentPayer',
                    isMut: true,
                    isSigner: true
                },
                {
                    name: 'clock',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'rent',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'score',
                    type: 'u32'
                }
            ]
        },
        {
            name: 'removeValidator',
            accounts: [
                {
                    name: 'state',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'managerAuthority',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'validatorList',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'duplicationFlag',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'operationalSolAccount',
                    isMut: true,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'index',
                    type: 'u32'
                },
                {
                    name: 'validatorVote',
                    type: 'publicKey'
                }
            ]
        },
        {
            name: 'setValidatorScore',
            accounts: [
                {
                    name: 'state',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'managerAuthority',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'validatorList',
                    isMut: true,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'index',
                    type: 'u32'
                },
                {
                    name: 'validatorVote',
                    type: 'publicKey'
                },
                {
                    name: 'score',
                    type: 'u32'
                }
            ]
        },
        {
            name: 'configValidatorSystem',
            accounts: [
                {
                    name: 'state',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'managerAuthority',
                    isMut: false,
                    isSigner: true
                }
            ],
            args: [
                {
                    name: 'extraRuns',
                    type: 'u32'
                }
            ]
        },
        {
            name: 'deposit',
            accounts: [
                {
                    name: 'state',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'msolMint',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'liqPoolSolLegPda',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'liqPoolMsolLeg',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'liqPoolMsolLegAuthority',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'reservePda',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'transferFrom',
                    isMut: true,
                    isSigner: true
                },
                {
                    name: 'mintTo',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'msolMintAuthority',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'lamports',
                    type: 'u64'
                }
            ]
        },
        {
            name: 'depositStakeAccount',
            accounts: [
                {
                    name: 'state',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'validatorList',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'stakeList',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'stakeAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'stakeAuthority',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'duplicationFlag',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'rentPayer',
                    isMut: true,
                    isSigner: true
                },
                {
                    name: 'msolMint',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'mintTo',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'msolMintAuthority',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'clock',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'rent',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'stakeProgram',
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'validatorIndex',
                    type: 'u32'
                }
            ]
        },
        {
            name: 'liquidUnstake',
            accounts: [
                {
                    name: 'state',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'msolMint',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'liqPoolSolLegPda',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'liqPoolMsolLeg',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'treasuryMsolAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'getMsolFrom',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'getMsolFromAuthority',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'transferSolTo',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'msolAmount',
                    type: 'u64'
                }
            ]
        },
        {
            name: 'addLiquidity',
            accounts: [
                {
                    name: 'state',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'lpMint',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'lpMintAuthority',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'liqPoolMsolLeg',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'liqPoolSolLegPda',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'transferFrom',
                    isMut: true,
                    isSigner: true
                },
                {
                    name: 'mintTo',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'lamports',
                    type: 'u64'
                }
            ]
        },
        {
            name: 'removeLiquidity',
            accounts: [
                {
                    name: 'state',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'lpMint',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'burnFrom',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'burnFromAuthority',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'transferSolTo',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'transferMsolTo',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'liqPoolSolLegPda',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'liqPoolMsolLeg',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'liqPoolMsolLegAuthority',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'tokens',
                    type: 'u64'
                }
            ]
        },
        {
            name: 'configLp',
            accounts: [
                {
                    name: 'state',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'adminAuthority',
                    isMut: false,
                    isSigner: true
                }
            ],
            args: [
                {
                    name: 'params',
                    type: {
                        defined: 'ConfigLpParams'
                    }
                }
            ]
        },
        {
            name: 'configMarinade',
            accounts: [
                {
                    name: 'state',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'adminAuthority',
                    isMut: false,
                    isSigner: true
                }
            ],
            args: [
                {
                    name: 'params',
                    type: {
                        defined: 'ConfigMarinadeParams'
                    }
                }
            ]
        },
        {
            name: 'orderUnstake',
            accounts: [
                {
                    name: 'state',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'msolMint',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'burnMsolFrom',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'burnMsolAuthority',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'newTicketAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'clock',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'rent',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'msolAmount',
                    type: 'u64'
                }
            ]
        },
        {
            name: 'claim',
            accounts: [
                {
                    name: 'state',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'reservePda',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'ticketAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'transferSolTo',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'clock',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false
                }
            ],
            args: []
        },
        {
            name: 'stakeReserve',
            accounts: [
                {
                    name: 'state',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'validatorList',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'stakeList',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'validatorVote',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'reservePda',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'stakeAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'stakeDepositAuthority',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'clock',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'epochSchedule',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'rent',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'stakeHistory',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'stakeConfig',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'stakeProgram',
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'validatorIndex',
                    type: 'u32'
                }
            ]
        },
        {
            name: 'updateActive',
            accounts: [
                {
                    name: 'common',
                    accounts: [
                        {
                            name: 'state',
                            isMut: true,
                            isSigner: false
                        },
                        {
                            name: 'stakeList',
                            isMut: true,
                            isSigner: false
                        },
                        {
                            name: 'stakeAccount',
                            isMut: true,
                            isSigner: false
                        },
                        {
                            name: 'stakeWithdrawAuthority',
                            isMut: false,
                            isSigner: false
                        },
                        {
                            name: 'reservePda',
                            isMut: true,
                            isSigner: false
                        },
                        {
                            name: 'msolMint',
                            isMut: true,
                            isSigner: false
                        },
                        {
                            name: 'msolMintAuthority',
                            isMut: false,
                            isSigner: false
                        },
                        {
                            name: 'treasuryMsolAccount',
                            isMut: true,
                            isSigner: false
                        },
                        {
                            name: 'clock',
                            isMut: false,
                            isSigner: false
                        },
                        {
                            name: 'stakeHistory',
                            isMut: false,
                            isSigner: false
                        },
                        {
                            name: 'stakeProgram',
                            isMut: false,
                            isSigner: false
                        },
                        {
                            name: 'tokenProgram',
                            isMut: false,
                            isSigner: false
                        }
                    ]
                },
                {
                    name: 'validatorList',
                    isMut: true,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'stakeIndex',
                    type: 'u32'
                },
                {
                    name: 'validatorIndex',
                    type: 'u32'
                }
            ]
        },
        {
            name: 'updateDeactivated',
            accounts: [
                {
                    name: 'common',
                    accounts: [
                        {
                            name: 'state',
                            isMut: true,
                            isSigner: false
                        },
                        {
                            name: 'stakeList',
                            isMut: true,
                            isSigner: false
                        },
                        {
                            name: 'stakeAccount',
                            isMut: true,
                            isSigner: false
                        },
                        {
                            name: 'stakeWithdrawAuthority',
                            isMut: false,
                            isSigner: false
                        },
                        {
                            name: 'reservePda',
                            isMut: true,
                            isSigner: false
                        },
                        {
                            name: 'msolMint',
                            isMut: true,
                            isSigner: false
                        },
                        {
                            name: 'msolMintAuthority',
                            isMut: false,
                            isSigner: false
                        },
                        {
                            name: 'treasuryMsolAccount',
                            isMut: true,
                            isSigner: false
                        },
                        {
                            name: 'clock',
                            isMut: false,
                            isSigner: false
                        },
                        {
                            name: 'stakeHistory',
                            isMut: false,
                            isSigner: false
                        },
                        {
                            name: 'stakeProgram',
                            isMut: false,
                            isSigner: false
                        },
                        {
                            name: 'tokenProgram',
                            isMut: false,
                            isSigner: false
                        }
                    ]
                },
                {
                    name: 'operationalSolAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'stakeIndex',
                    type: 'u32'
                }
            ]
        },
        {
            name: 'deactivateStake',
            accounts: [
                {
                    name: 'state',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'reservePda',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'validatorList',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'stakeList',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'stakeAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'stakeDepositAuthority',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'splitStakeAccount',
                    isMut: true,
                    isSigner: true
                },
                {
                    name: 'splitStakeRentPayer',
                    isMut: true,
                    isSigner: true
                },
                {
                    name: 'clock',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'rent',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'epochSchedule',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'stakeHistory',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'stakeProgram',
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'stakeIndex',
                    type: 'u32'
                },
                {
                    name: 'validatorIndex',
                    type: 'u32'
                }
            ]
        },
        {
            name: 'emergencyUnstake',
            accounts: [
                {
                    name: 'state',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'validatorManagerAuthority',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'validatorList',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'stakeList',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'stakeAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'stakeDepositAuthority',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'clock',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'stakeProgram',
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'stakeIndex',
                    type: 'u32'
                },
                {
                    name: 'validatorIndex',
                    type: 'u32'
                }
            ]
        },
        {
            name: 'partialUnstake',
            accounts: [
                {
                    name: 'state',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'validatorManagerAuthority',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'validatorList',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'stakeList',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'stakeAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'stakeDepositAuthority',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'reservePda',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'splitStakeAccount',
                    isMut: true,
                    isSigner: true
                },
                {
                    name: 'splitStakeRentPayer',
                    isMut: true,
                    isSigner: true
                },
                {
                    name: 'clock',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'rent',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'stakeHistory',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'stakeProgram',
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'stakeIndex',
                    type: 'u32'
                },
                {
                    name: 'validatorIndex',
                    type: 'u32'
                },
                {
                    name: 'desiredUnstakeAmount',
                    type: 'u64'
                }
            ]
        },
        {
            name: 'mergeStakes',
            accounts: [
                {
                    name: 'state',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'stakeList',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'validatorList',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'destinationStake',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'sourceStake',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'stakeDepositAuthority',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'stakeWithdrawAuthority',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'operationalSolAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'clock',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'stakeHistory',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'stakeProgram',
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'destinationStakeIndex',
                    type: 'u32'
                },
                {
                    name: 'sourceStakeIndex',
                    type: 'u32'
                },
                {
                    name: 'validatorIndex',
                    type: 'u32'
                }
            ]
        }
    ],
    accounts: [
        {
            name: 'state',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'msolMint',
                        type: 'publicKey'
                    },
                    {
                        name: 'adminAuthority',
                        type: 'publicKey'
                    },
                    {
                        name: 'operationalSolAccount',
                        type: 'publicKey'
                    },
                    {
                        name: 'treasuryMsolAccount',
                        type: 'publicKey'
                    },
                    {
                        name: 'reserveBumpSeed',
                        type: 'u8'
                    },
                    {
                        name: 'msolMintAuthorityBumpSeed',
                        type: 'u8'
                    },
                    {
                        name: 'rentExemptForTokenAcc',
                        type: 'u64'
                    },
                    {
                        name: 'rewardFee',
                        type: {
                            defined: 'Fee'
                        }
                    },
                    {
                        name: 'stakeSystem',
                        type: {
                            defined: 'StakeSystem'
                        }
                    },
                    {
                        name: 'validatorSystem',
                        type: {
                            defined: 'ValidatorSystem'
                        }
                    },
                    {
                        name: 'liqPool',
                        type: {
                            defined: 'LiqPool'
                        }
                    },
                    {
                        name: 'availableReserveBalance',
                        type: 'u64'
                    },
                    {
                        name: 'msolSupply',
                        type: 'u64'
                    },
                    {
                        name: 'msolPrice',
                        type: 'u64'
                    },
                    {
                        name: 'circulatingTicketCount',
                        docs: [
                            'count tickets for delayed-unstake'
                        ],
                        type: 'u64'
                    },
                    {
                        name: 'circulatingTicketBalance',
                        docs: [
                            'total lamports amount of generated and not claimed yet tickets'
                        ],
                        type: 'u64'
                    },
                    {
                        name: 'lentFromReserve',
                        type: 'u64'
                    },
                    {
                        name: 'minDeposit',
                        type: 'u64'
                    },
                    {
                        name: 'minWithdraw',
                        type: 'u64'
                    },
                    {
                        name: 'stakingSolCap',
                        type: 'u64'
                    },
                    {
                        name: 'emergencyCoolingDown',
                        type: 'u64'
                    }
                ]
            }
        },
        {
            name: 'ticketAccountData',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'stateAddress',
                        type: 'publicKey'
                    },
                    {
                        name: 'beneficiary',
                        type: 'publicKey'
                    },
                    {
                        name: 'lamportsAmount',
                        type: 'u64'
                    },
                    {
                        name: 'createdEpoch',
                        type: 'u64'
                    }
                ]
            }
        }
    ],
    types: [
        {
            name: 'LiqPool',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'lpMint',
                        type: 'publicKey'
                    },
                    {
                        name: 'lpMintAuthorityBumpSeed',
                        type: 'u8'
                    },
                    {
                        name: 'solLegBumpSeed',
                        type: 'u8'
                    },
                    {
                        name: 'msolLegAuthorityBumpSeed',
                        type: 'u8'
                    },
                    {
                        name: 'msolLeg',
                        type: 'publicKey'
                    },
                    {
                        name: 'lpLiquidityTarget',
                        docs: [
                            'Liquidity target. If the Liquidity reach this amount, the fee reaches lp_min_discount_fee'
                        ],
                        type: 'u64'
                    },
                    {
                        name: 'lpMaxFee',
                        docs: [
                            'Liquidity pool max fee'
                        ],
                        type: {
                            defined: 'Fee'
                        }
                    },
                    {
                        name: 'lpMinFee',
                        docs: [
                            'SOL/mSOL Liquidity pool min fee'
                        ],
                        type: {
                            defined: 'Fee'
                        }
                    },
                    {
                        name: 'treasuryCut',
                        docs: [
                            'Treasury cut'
                        ],
                        type: {
                            defined: 'Fee'
                        }
                    },
                    {
                        name: 'lpSupply',
                        type: 'u64'
                    },
                    {
                        name: 'lentFromSolLeg',
                        type: 'u64'
                    },
                    {
                        name: 'liquiditySolCap',
                        type: 'u64'
                    }
                ]
            }
        },
        {
            name: 'List',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'account',
                        type: 'publicKey'
                    },
                    {
                        name: 'itemSize',
                        type: 'u32'
                    },
                    {
                        name: 'count',
                        type: 'u32'
                    },
                    {
                        name: 'newAccount',
                        type: 'publicKey'
                    },
                    {
                        name: 'copiedCount',
                        type: 'u32'
                    }
                ]
            }
        },
        {
            name: 'StakeRecord',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'stakeAccount',
                        type: 'publicKey'
                    },
                    {
                        name: 'lastUpdateDelegatedLamports',
                        type: 'u64'
                    },
                    {
                        name: 'lastUpdateEpoch',
                        type: 'u64'
                    },
                    {
                        name: 'isEmergencyUnstaking',
                        type: 'u8'
                    }
                ]
            }
        },
        {
            name: 'StakeSystem',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'stakeList',
                        type: {
                            defined: 'List'
                        }
                    },
                    {
                        name: 'delayedUnstakeCoolingDown',
                        type: 'u64'
                    },
                    {
                        name: 'stakeDepositBumpSeed',
                        type: 'u8'
                    },
                    {
                        name: 'stakeWithdrawBumpSeed',
                        type: 'u8'
                    },
                    {
                        name: 'slotsForStakeDelta',
                        docs: [
                            'set by admin, how much slots before the end of the epoch, stake-delta can start'
                        ],
                        type: 'u64'
                    },
                    {
                        name: 'lastStakeDeltaEpoch',
                        docs: [
                            'Marks the start of stake-delta operations, meaning that if somebody starts a delayed-unstake ticket',
                            'after this var is set with epoch_num the ticket will have epoch_created = current_epoch+1',
                            '(the user must wait one more epoch, because their unstake-delta will be execute in this epoch)'
                        ],
                        type: 'u64'
                    },
                    {
                        name: 'minStake',
                        type: 'u64'
                    },
                    {
                        name: 'extraStakeDeltaRuns',
                        docs: [
                            'can be set by validator-manager-auth to allow a second run of stake-delta to stake late stakers in the last minute of the epoch',
                            "so we maximize user's rewards"
                        ],
                        type: 'u32'
                    }
                ]
            }
        },
        {
            name: 'ValidatorRecord',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'validatorAccount',
                        docs: [
                            'Validator vote pubkey'
                        ],
                        type: 'publicKey'
                    },
                    {
                        name: 'activeBalance',
                        docs: [
                            'Validator total balance in lamports'
                        ],
                        type: 'u64'
                    },
                    {
                        name: 'score',
                        type: 'u32'
                    },
                    {
                        name: 'lastStakeDeltaEpoch',
                        type: 'u64'
                    },
                    {
                        name: 'duplicationFlagBumpSeed',
                        type: 'u8'
                    }
                ]
            }
        },
        {
            name: 'ValidatorSystem',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'validatorList',
                        type: {
                            defined: 'List'
                        }
                    },
                    {
                        name: 'managerAuthority',
                        type: 'publicKey'
                    },
                    {
                        name: 'totalValidatorScore',
                        type: 'u32'
                    },
                    {
                        name: 'totalActiveBalance',
                        docs: [
                            'sum of all active lamports staked'
                        ],
                        type: 'u64'
                    },
                    {
                        name: 'autoAddValidatorEnabled',
                        docs: [
                            'allow & auto-add validator when a user deposits a stake-account of a non-listed validator'
                        ],
                        type: 'u8'
                    }
                ]
            }
        },
        {
            name: 'Fee',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'basisPoints',
                        type: 'u32'
                    }
                ]
            }
        },
        {
            name: 'InitializeData',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'adminAuthority',
                        type: 'publicKey'
                    },
                    {
                        name: 'validatorManagerAuthority',
                        type: 'publicKey'
                    },
                    {
                        name: 'minStake',
                        type: 'u64'
                    },
                    {
                        name: 'rewardFee',
                        type: {
                            defined: 'Fee'
                        }
                    },
                    {
                        name: 'liqPool',
                        type: {
                            defined: 'LiqPoolInitializeData'
                        }
                    },
                    {
                        name: 'additionalStakeRecordSpace',
                        type: 'u32'
                    },
                    {
                        name: 'additionalValidatorRecordSpace',
                        type: 'u32'
                    },
                    {
                        name: 'slotsForStakeDelta',
                        type: 'u64'
                    }
                ]
            }
        },
        {
            name: 'LiqPoolInitializeData',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'lpLiquidityTarget',
                        type: 'u64'
                    },
                    {
                        name: 'lpMaxFee',
                        type: {
                            defined: 'Fee'
                        }
                    },
                    {
                        name: 'lpMinFee',
                        type: {
                            defined: 'Fee'
                        }
                    },
                    {
                        name: 'lpTreasuryCut',
                        type: {
                            defined: 'Fee'
                        }
                    }
                ]
            }
        },
        {
            name: 'ChangeAuthorityData',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'admin',
                        type: {
                            option: 'publicKey'
                        }
                    },
                    {
                        name: 'validatorManager',
                        type: {
                            option: 'publicKey'
                        }
                    },
                    {
                        name: 'operationalSolAccount',
                        type: {
                            option: 'publicKey'
                        }
                    },
                    {
                        name: 'treasuryMsolAccount',
                        type: {
                            option: 'publicKey'
                        }
                    }
                ]
            }
        },
        {
            name: 'ConfigLpParams',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'minFee',
                        type: {
                            option: {
                                defined: 'Fee'
                            }
                        }
                    },
                    {
                        name: 'maxFee',
                        type: {
                            option: {
                                defined: 'Fee'
                            }
                        }
                    },
                    {
                        name: 'liquidityTarget',
                        type: {
                            option: 'u64'
                        }
                    },
                    {
                        name: 'treasuryCut',
                        type: {
                            option: {
                                defined: 'Fee'
                            }
                        }
                    }
                ]
            }
        },
        {
            name: 'ConfigMarinadeParams',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'rewardsFee',
                        type: {
                            option: {
                                defined: 'Fee'
                            }
                        }
                    },
                    {
                        name: 'slotsForStakeDelta',
                        type: {
                            option: 'u64'
                        }
                    },
                    {
                        name: 'minStake',
                        type: {
                            option: 'u64'
                        }
                    },
                    {
                        name: 'minDeposit',
                        type: {
                            option: 'u64'
                        }
                    },
                    {
                        name: 'minWithdraw',
                        type: {
                            option: 'u64'
                        }
                    },
                    {
                        name: 'stakingSolCap',
                        type: {
                            option: 'u64'
                        }
                    },
                    {
                        name: 'liquiditySolCap',
                        type: {
                            option: 'u64'
                        }
                    },
                    {
                        name: 'autoAddValidatorEnabled',
                        type: {
                            option: 'bool'
                        }
                    }
                ]
            }
        },
        {
            name: 'CommonError',
            type: {
                kind: 'enum',
                variants: [
                    {
                        name: 'WrongReserveOwner'
                    },
                    {
                        name: 'NonEmptyReserveData'
                    },
                    {
                        name: 'InvalidInitialReserveLamports'
                    },
                    {
                        name: 'ZeroValidatorChunkSize'
                    },
                    {
                        name: 'TooBigValidatorChunkSize'
                    },
                    {
                        name: 'ZeroCreditChunkSize'
                    },
                    {
                        name: 'TooBigCreditChunkSize'
                    },
                    {
                        name: 'TooLowCreditFee'
                    },
                    {
                        name: 'InvalidMintAuthority'
                    },
                    {
                        name: 'MintHasInitialSupply'
                    },
                    {
                        name: 'InvalidOwnerFeeState'
                    },
                    {
                        name: 'InvalidProgramId'
                    },
                    {
                        name: 'UnexpectedAccount'
                    },
                    {
                        name: 'CalculationFailure'
                    },
                    {
                        name: 'AccountWithLockup'
                    },
                    {
                        name: 'NumberTooLow'
                    },
                    {
                        name: 'NumberTooHigh'
                    },
                    {
                        name: 'FeeTooHigh'
                    },
                    {
                        name: 'FeesWrongWayRound'
                    },
                    {
                        name: 'LiquidityTargetTooLow'
                    },
                    {
                        name: 'TicketNotDue'
                    },
                    {
                        name: 'TicketNotReady'
                    },
                    {
                        name: 'WrongBeneficiary'
                    },
                    {
                        name: 'StakeAccountNotUpdatedYet'
                    },
                    {
                        name: 'StakeNotDelegated'
                    },
                    {
                        name: 'StakeAccountIsEmergencyUnstaking'
                    },
                    {
                        name: 'InsufficientLiquidity'
                    },
                    {
                        name: 'InvalidValidator'
                    }
                ]
            }
        }
    ]
};
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/marinade/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMarinadeMSolPrice = exports.getMarinadeDepositIx = exports.getMarinadeFinanceProgram = void 0;
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/marinade/types.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const spl_token_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.4.13_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/index.js [app-route] (ecmascript)");
const marinadeFinanceProgramId = new web3_js_1.PublicKey('MarBmsSgKXdrN1egZf5sqe1TMai9K1rChYNDJgjq7aD');
function getMarinadeFinanceProgram(provider) {
    return new anchor_1.Program(types_1.IDL, marinadeFinanceProgramId, provider);
}
exports.getMarinadeFinanceProgram = getMarinadeFinanceProgram;
function getMarinadeDepositIx({ program, amount, mSOLAccount, transferFrom }) {
    return program.methods.deposit(amount).accountsStrict({
        reservePda: new web3_js_1.PublicKey('Du3Ysj1wKbxPKkuPPnvzQLQh8oMSVifs3jGZjJWXFmHN'),
        state: new web3_js_1.PublicKey('8szGkuLTAux9XMgZ2vtY39jVSowEcpBfFfD8hXSEqdGC'),
        msolMint: new web3_js_1.PublicKey('mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So'),
        msolMintAuthority: new web3_js_1.PublicKey('3JLPCS1qM2zRw3Dp6V4hZnYHd4toMNPkNesXdX9tg6KM'),
        liqPoolMsolLegAuthority: new web3_js_1.PublicKey('EyaSjUtSgo9aRD1f8LWXwdvkpDTmXAW54yoSHZRF14WL'),
        liqPoolMsolLeg: new web3_js_1.PublicKey('7GgPYjS5Dza89wV6FpZ23kUJRG5vbQ1GM25ezspYFSoE'),
        liqPoolSolLegPda: new web3_js_1.PublicKey('UefNb6z6yvArqe4cJHTXCqStRsKmWhGxnZzuHbikP5Q'),
        mintTo: mSOLAccount,
        transferFrom,
        systemProgram: web3_js_1.SystemProgram.programId,
        tokenProgram: spl_token_1.TOKEN_PROGRAM_ID
    }).instruction();
}
exports.getMarinadeDepositIx = getMarinadeDepositIx;
async function getMarinadeMSolPrice(program) {
    const state = await program.account.state.fetch(new web3_js_1.PublicKey('8szGkuLTAux9XMgZ2vtY39jVSowEcpBfFfD8hXSEqdGC'));
    return state.msolPrice.toNumber() / 4294967296;
}
exports.getMarinadeMSolPrice = getMarinadeMSolPrice;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/orderParams.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isUpdateHighLeverageMode = exports.getOrderParams = exports.getMarketOrderParams = exports.getTriggerLimitOrderParams = exports.getTriggerMarketOrderParams = exports.getLimitOrderParams = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
function getLimitOrderParams(params) {
    return getOrderParams(Object.assign({}, params, {
        orderType: types_1.OrderType.LIMIT
    }));
}
exports.getLimitOrderParams = getLimitOrderParams;
function getTriggerMarketOrderParams(params) {
    return getOrderParams(Object.assign({}, params, {
        orderType: types_1.OrderType.TRIGGER_MARKET
    }));
}
exports.getTriggerMarketOrderParams = getTriggerMarketOrderParams;
function getTriggerLimitOrderParams(params) {
    return getOrderParams(Object.assign({}, params, {
        orderType: types_1.OrderType.TRIGGER_LIMIT
    }));
}
exports.getTriggerLimitOrderParams = getTriggerLimitOrderParams;
function getMarketOrderParams(params) {
    return getOrderParams(Object.assign({}, params, {
        orderType: types_1.OrderType.MARKET
    }));
}
exports.getMarketOrderParams = getMarketOrderParams;
/**
 * Creates an OrderParams object with the given OptionalOrderParams and any params to override.
 *
 * example:
 * ```
 * const orderParams = getOrderParams(optionalOrderParams, { marketType: MarketType.PERP });
 * ```
 *
 * @param optionalOrderParams
 * @param overridingParams
 * @returns
 */ function getOrderParams(optionalOrderParams, overridingParams = {}) {
    return Object.assign({}, types_1.DefaultOrderParams, optionalOrderParams, overridingParams);
}
exports.getOrderParams = getOrderParams;
function isUpdateHighLeverageMode(bitFlags) {
    return (bitFlags & types_1.OrderParamsBitFlag.UpdateHighLeverageMode) !== 0;
}
exports.isUpdateHighLeverageMode = isUpdateHighLeverageMode;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/titan/titanClient.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TitanClient = exports.SwapMode = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const msgpack_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@msgpack+msgpack@3.1.2/node_modules/@msgpack/msgpack/dist.esm/index.mjs [app-route] (ecmascript)");
var SwapMode;
(function(SwapMode) {
    SwapMode["ExactIn"] = "ExactIn";
    SwapMode["ExactOut"] = "ExactOut";
})(SwapMode || (exports.SwapMode = SwapMode = {}));
const TITAN_API_URL = 'https://api.titan.exchange';
class TitanClient {
    constructor({ connection, authToken, url }){
        this.connection = connection;
        this.authToken = authToken;
        this.url = url !== null && url !== void 0 ? url : TITAN_API_URL;
    }
    /**
     * Get routes for a swap
     */ async getQuote({ inputMint, outputMint, amount, userPublicKey, maxAccounts = 50, slippageBps, swapMode, onlyDirectRoutes, excludeDexes, sizeConstraint, accountsLimitWritable }) {
        var _a;
        const params = new URLSearchParams({
            inputMint: inputMint.toString(),
            outputMint: outputMint.toString(),
            amount: amount.toString(),
            userPublicKey: userPublicKey.toString(),
            ...slippageBps && {
                slippageBps: slippageBps.toString()
            },
            ...swapMode && {
                swapMode: swapMode === 'ExactOut' ? SwapMode.ExactOut : SwapMode.ExactIn
            },
            ...onlyDirectRoutes && {
                onlyDirectRoutes: onlyDirectRoutes.toString()
            },
            ...maxAccounts && {
                accountsLimitTotal: maxAccounts.toString()
            },
            ...excludeDexes && {
                excludeDexes: excludeDexes.join(',')
            },
            ...sizeConstraint && {
                sizeConstraint: sizeConstraint.toString()
            },
            ...accountsLimitWritable && {
                accountsLimitWritable: accountsLimitWritable.toString()
            }
        });
        const response = await fetch(`${this.url}/api/v1/quote/swap?${params.toString()}`, {
            headers: {
                Accept: 'application/vnd.msgpack',
                'Accept-Encoding': 'gzip, deflate, br',
                Authorization: `Bearer ${this.authToken}`
            }
        });
        if (!response.ok) {
            throw new Error(`Titan API error: ${response.status} ${response.statusText}`);
        }
        const buffer = await response.arrayBuffer();
        const data = (0, msgpack_1.decode)(buffer);
        const route = data.quotes[Object.keys(data.quotes).find((key)=>key.toLowerCase() === 'titan') || ''];
        if (!route) {
            throw new Error('No routes available');
        }
        return {
            inputMint: inputMint.toString(),
            inAmount: amount.toString(),
            outputMint: outputMint.toString(),
            outAmount: route.outAmount.toString(),
            swapMode: data.swapMode,
            slippageBps: route.slippageBps,
            platformFee: route.platformFee ? {
                amount: route.platformFee.amount.toString(),
                feeBps: route.platformFee.fee_bps
            } : undefined,
            routePlan: ((_a = route.steps) === null || _a === void 0 ? void 0 : _a.map((step)=>{
                var _a;
                return {
                    swapInfo: {
                        ammKey: new web3_js_1.PublicKey(step.ammKey).toString(),
                        label: step.label,
                        inputMint: new web3_js_1.PublicKey(step.inputMint).toString(),
                        outputMint: new web3_js_1.PublicKey(step.outputMint).toString(),
                        inAmount: step.inAmount.toString(),
                        outAmount: step.outAmount.toString(),
                        feeAmount: ((_a = step.feeAmount) === null || _a === void 0 ? void 0 : _a.toString()) || '0',
                        feeMint: step.feeMint ? new web3_js_1.PublicKey(step.feeMint).toString() : ''
                    },
                    percent: 100
                };
            })) || [],
            contextSlot: route.contextSlot,
            timeTaken: route.timeTaken
        };
    }
    /**
     * Get a swap transaction for quote
     */ async getSwap({ inputMint, outputMint, amount, userPublicKey, maxAccounts = 50, slippageBps, swapMode, onlyDirectRoutes, excludeDexes, sizeConstraint, accountsLimitWritable }) {
        const params = new URLSearchParams({
            inputMint: inputMint.toString(),
            outputMint: outputMint.toString(),
            amount: amount.toString(),
            userPublicKey: userPublicKey.toString(),
            ...slippageBps && {
                slippageBps: slippageBps.toString()
            },
            ...swapMode && {
                swapMode: swapMode
            },
            ...maxAccounts && {
                accountsLimitTotal: maxAccounts.toString()
            },
            ...excludeDexes && {
                excludeDexes: excludeDexes.join(',')
            },
            ...onlyDirectRoutes && {
                onlyDirectRoutes: onlyDirectRoutes.toString()
            },
            ...sizeConstraint && {
                sizeConstraint: sizeConstraint.toString()
            },
            ...accountsLimitWritable && {
                accountsLimitWritable: accountsLimitWritable.toString()
            }
        });
        const response = await fetch(`${this.url}/api/v1/quote/swap?${params.toString()}`, {
            headers: {
                Accept: 'application/vnd.msgpack',
                'Accept-Encoding': 'gzip, deflate, br',
                Authorization: `Bearer ${this.authToken}`
            }
        });
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('No routes available');
            }
            throw new Error(`Titan API error: ${response.status} ${response.statusText}`);
        }
        const buffer = await response.arrayBuffer();
        const data = (0, msgpack_1.decode)(buffer);
        const route = data.quotes[Object.keys(data.quotes).find((key)=>key.toLowerCase() === 'titan') || ''];
        if (!route) {
            throw new Error('No routes available');
        }
        if (route.instructions && route.instructions.length > 0) {
            try {
                const { transactionMessage, lookupTables } = await this.getTransactionMessageAndLookupTables(route, userPublicKey);
                return {
                    transactionMessage,
                    lookupTables
                };
            } catch (err) {
                throw new Error('Something went wrong with creating the Titan swap transaction. Please try again.');
            }
        }
        throw new Error('No instructions provided in the route');
    }
    /**
     * Get the titan instructions from transaction by filtering out instructions to compute budget and associated token programs
     * @param transactionMessage the transaction message
     * @param inputMint the input mint
     * @param outputMint the output mint
     */ getTitanInstructions({ transactionMessage, inputMint, outputMint }) {
        // Filter out common system instructions that can be handled by DriftClient
        const filteredInstructions = transactionMessage.instructions.filter((instruction)=>{
            const programId = instruction.programId.toString();
            // Filter out system programs
            if (programId === 'ComputeBudget111111111111111111111111111111') {
                return false;
            }
            if (programId === 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') {
                return false;
            }
            if (programId === '11111111111111111111111111111111') {
                return false;
            }
            // Filter out Associated Token Account creation for input/output mints
            if (programId === 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL') {
                if (instruction.keys.length > 3) {
                    const mint = instruction.keys[3].pubkey;
                    if (mint.equals(inputMint) || mint.equals(outputMint)) {
                        return false;
                    }
                }
            }
            return true;
        });
        return filteredInstructions;
    }
    async getTransactionMessageAndLookupTables(route, userPublicKey) {
        const solanaInstructions = route.instructions.map((instruction)=>({
                programId: new web3_js_1.PublicKey(instruction.p),
                keys: instruction.a.map((meta)=>({
                        pubkey: new web3_js_1.PublicKey(meta.p),
                        isSigner: meta.s,
                        isWritable: meta.w
                    })),
                data: Buffer.from(instruction.d)
            }));
        // Get recent blockhash
        const { blockhash } = await this.connection.getLatestBlockhash();
        // Build address lookup tables if provided
        const addressLookupTables = [];
        if (route.addressLookupTables && route.addressLookupTables.length > 0) {
            for (const altPubkey of route.addressLookupTables){
                try {
                    const altAccount = await this.connection.getAddressLookupTable(new web3_js_1.PublicKey(altPubkey));
                    if (altAccount.value) {
                        addressLookupTables.push(altAccount.value);
                    }
                } catch (err) {
                    console.warn(`Failed to fetch address lookup table:`, err);
                }
            }
        }
        const transactionMessage = new web3_js_1.TransactionMessage({
            payerKey: userPublicKey,
            recentBlockhash: blockhash,
            instructions: solanaInstructions
        });
        return {
            transactionMessage,
            lookupTables: addressLookupTables
        };
    }
}
exports.TitanClient = TitanClient;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/swap/UnifiedSwapClient.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UnifiedSwapClient = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const jupiterClient_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/jupiter/jupiterClient.js [app-route] (ecmascript)");
const titanClient_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/titan/titanClient.js [app-route] (ecmascript)");
class UnifiedSwapClient {
    constructor({ clientType, connection, authToken, url }){
        this.clientType = clientType;
        if (clientType === 'jupiter') {
            this.client = new jupiterClient_1.JupiterClient({
                connection,
                url
            });
        } else if (clientType === 'titan') {
            if (!authToken) {
                throw new Error('authToken is required for Titan client');
            }
            this.client = new titanClient_1.TitanClient({
                connection,
                authToken,
                url
            });
        } else {
            throw new Error(`Unsupported client type: ${clientType}`);
        }
    }
    /**
     * Get a swap quote from the underlying client
     */ async getQuote(params) {
        if (this.clientType === 'jupiter') {
            const jupiterClient = this.client;
            const { userPublicKey: _userPublicKey, sizeConstraint: _sizeConstraint, accountsLimitWritable: _accountsLimitWritable, ...jupiterParams } = params;
            return await jupiterClient.getQuote(jupiterParams);
        } else {
            const titanClient = this.client;
            const { autoSlippage: _autoSlippage, maxAutoSlippageBps: _maxAutoSlippageBps, usdEstimate: _usdEstimate, ...titanParams } = params;
            if (!titanParams.userPublicKey) {
                throw new Error('userPublicKey is required for Titan quotes');
            }
            // Cast to ensure TypeScript knows userPublicKey is defined
            const titanParamsWithUser = {
                ...titanParams,
                userPublicKey: titanParams.userPublicKey,
                swapMode: titanParams.swapMode
            };
            return await titanClient.getQuote(titanParamsWithUser);
        }
    }
    /**
     * Get a swap transaction from the underlying client
     */ async getSwap(params) {
        if (this.clientType === 'jupiter') {
            const jupiterClient = this.client;
            // Cast the quote to Jupiter's specific QuoteResponse type
            const jupiterParams = {
                ...params,
                quote: params.quote
            };
            const transaction = await jupiterClient.getSwap(jupiterParams);
            return {
                transaction
            };
        } else {
            const titanClient = this.client;
            const { quote, userPublicKey, slippageBps } = params;
            // For Titan, we need to reconstruct the parameters from the quote
            const titanQuote = quote;
            const result = await titanClient.getSwap({
                inputMint: new web3_js_1.PublicKey(titanQuote.inputMint),
                outputMint: new web3_js_1.PublicKey(titanQuote.outputMint),
                amount: new anchor_1.BN(titanQuote.inAmount),
                userPublicKey,
                slippageBps: slippageBps || titanQuote.slippageBps,
                swapMode: titanQuote.swapMode
            });
            return {
                transactionMessage: result.transactionMessage,
                lookupTables: result.lookupTables
            };
        }
    }
    /**
     * Get swap instructions from the underlying client (Jupiter or Titan)
     * This is the core swap logic without any context preparation
     */ async getSwapInstructions({ inputMint, outputMint, amount, userPublicKey, slippageBps, swapMode = 'ExactIn', onlyDirectRoutes = false, quote, sizeConstraint }) {
        const isExactOut = swapMode === 'ExactOut';
        let swapInstructions;
        let lookupTables;
        if (this.clientType === 'jupiter') {
            const jupiterClient = this.client;
            // Get quote if not provided
            let finalQuote = quote;
            if (!finalQuote) {
                finalQuote = await jupiterClient.getQuote({
                    inputMint,
                    outputMint,
                    amount,
                    slippageBps,
                    swapMode,
                    onlyDirectRoutes
                });
            }
            if (!finalQuote) {
                throw new Error('Could not fetch swap quote. Please try again.');
            }
            // Get swap transaction and extract instructions
            const transaction = await jupiterClient.getSwap({
                quote: finalQuote,
                userPublicKey,
                slippageBps
            });
            const { transactionMessage, lookupTables: jupiterLookupTables } = await jupiterClient.getTransactionMessageAndLookupTables({
                transaction
            });
            swapInstructions = jupiterClient.getJupiterInstructions({
                transactionMessage,
                inputMint,
                outputMint
            });
            lookupTables = jupiterLookupTables;
        } else {
            const titanClient = this.client;
            // For Titan, get swap directly (it handles quote internally)
            const { transactionMessage, lookupTables: titanLookupTables } = await titanClient.getSwap({
                inputMint,
                outputMint,
                amount,
                userPublicKey,
                slippageBps,
                swapMode: isExactOut ? titanClient_1.SwapMode.ExactOut : titanClient_1.SwapMode.ExactIn,
                onlyDirectRoutes,
                sizeConstraint: sizeConstraint || 1280 - 375
            });
            swapInstructions = titanClient.getTitanInstructions({
                transactionMessage,
                inputMint,
                outputMint
            });
            lookupTables = titanLookupTables;
        }
        return {
            instructions: swapInstructions,
            lookupTables
        };
    }
    /**
     * Get the underlying client instance
     */ getClient() {
        return this.client;
    }
    /**
     * Get the client type
     */ getClientType() {
        return this.clientType;
    }
    /**
     * Check if this is a Jupiter client
     */ isJupiter() {
        return this.clientType === 'jupiter';
    }
    /**
     * Check if this is a Titan client
     */ isTitan() {
        return this.clientType === 'titan';
    }
}
exports.UnifiedSwapClient = UnifiedSwapClient;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/testClient.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TestClient = void 0;
const adminClient_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/adminClient.js [app-route] (ecmascript)");
class TestClient extends adminClient_1.AdminClient {
    constructor(config){
        config.txVersion = 'legacy';
        if (config.accountSubscription.type !== 'polling') {
            throw new Error('Test client must be polling');
        }
        super(config);
    }
    async sendTransaction(tx, additionalSigners, opts, preSigned) {
        const { txSig, slot } = await super.sendTransaction(tx, additionalSigners, opts, preSigned);
        let lastFetchedSlot = this.accountSubscriber.accountLoader.mostRecentSlot;
        await this.fetchAccounts();
        while(lastFetchedSlot < slot){
            await this.fetchAccounts();
            lastFetchedSlot = this.accountSubscriber.accountLoader.mostRecentSlot;
        }
        return {
            txSig,
            slot
        };
    }
}
exports.TestClient = TestClient;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/userConfig.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/userStatsConfig.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/decode/user.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeUser = void 0;
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
function readUnsignedBigInt64LE(buffer, offset) {
    return new anchor_1.BN(buffer.subarray(offset, offset + 8), 10, 'le');
}
function readSignedBigInt64LE(buffer, offset) {
    const unsignedValue = new anchor_1.BN(buffer.subarray(offset, offset + 8), 10, 'le');
    if (unsignedValue.testn(63)) {
        const inverted = unsignedValue.notn(64).addn(1);
        return inverted.neg();
    } else {
        return unsignedValue;
    }
}
function decodeUser(buffer) {
    let offset = 8;
    const authority = new web3_js_1.PublicKey(buffer.slice(offset, offset + 32));
    offset += 32;
    const delegate = new web3_js_1.PublicKey(buffer.slice(offset, offset + 32));
    offset += 32;
    const name = [];
    for(let i = 0; i < 32; i++){
        name.push(buffer.readUint8(offset + i));
    }
    offset += 32;
    const spotPositions = [];
    for(let i = 0; i < 8; i++){
        const scaledBalance = readUnsignedBigInt64LE(buffer, offset);
        const openOrders = buffer.readUInt8(offset + 35);
        if (scaledBalance.eq(numericConstants_1.ZERO) && openOrders === 0) {
            offset += 40;
            continue;
        }
        offset += 8;
        const openBids = readSignedBigInt64LE(buffer, offset);
        offset += 8;
        const openAsks = readSignedBigInt64LE(buffer, offset);
        offset += 8;
        const cumulativeDeposits = readSignedBigInt64LE(buffer, offset);
        offset += 8;
        const marketIndex = buffer.readUInt16LE(offset);
        offset += 2;
        const balanceTypeNum = buffer.readUInt8(offset);
        let balanceType;
        if (balanceTypeNum === 0) {
            balanceType = types_1.SpotBalanceType.DEPOSIT;
        } else {
            balanceType = types_1.SpotBalanceType.BORROW;
        }
        offset += 6;
        spotPositions.push({
            scaledBalance,
            openBids,
            openAsks,
            cumulativeDeposits,
            marketIndex,
            balanceType,
            openOrders
        });
    }
    const perpPositions = [];
    for(let i = 0; i < 8; i++){
        const baseAssetAmount = readSignedBigInt64LE(buffer, offset + 8);
        const quoteAssetAmount = readSignedBigInt64LE(buffer, offset + 16);
        const lpShares = readUnsignedBigInt64LE(buffer, offset + 64);
        const openOrders = buffer.readUInt8(offset + 94);
        const positionFlag = buffer.readUInt8(offset + 95);
        const isolatedPositionScaledBalance = readUnsignedBigInt64LE(buffer, offset + 96);
        if (baseAssetAmount.eq(numericConstants_1.ZERO) && openOrders === 0 && quoteAssetAmount.eq(numericConstants_1.ZERO) && lpShares.eq(numericConstants_1.ZERO)) {
            offset += 96;
            continue;
        }
        const lastCumulativeFundingRate = readSignedBigInt64LE(buffer, offset);
        offset += 24;
        const quoteBreakEvenAmount = readSignedBigInt64LE(buffer, offset);
        offset += 8;
        const quoteEntryAmount = readSignedBigInt64LE(buffer, offset);
        offset += 8;
        const openBids = readSignedBigInt64LE(buffer, offset);
        offset += 8;
        const openAsks = readSignedBigInt64LE(buffer, offset);
        offset += 8;
        const settledPnl = readSignedBigInt64LE(buffer, offset);
        offset += 16;
        const lastBaseAssetAmountPerLp = readSignedBigInt64LE(buffer, offset);
        offset += 8;
        const lastQuoteAssetAmountPerLp = readSignedBigInt64LE(buffer, offset);
        offset += 8;
        const maxMarginRatio = buffer.readUInt16LE(offset);
        offset += 4;
        const marketIndex = buffer.readUInt16LE(offset);
        offset += 3;
        const perLpBase = buffer.readUInt8(offset);
        offset += 1;
        perpPositions.push({
            lastCumulativeFundingRate,
            baseAssetAmount,
            quoteAssetAmount,
            quoteBreakEvenAmount,
            quoteEntryAmount,
            openBids,
            openAsks,
            settledPnl,
            lpShares,
            remainderBaseAssetAmount: 0,
            lastBaseAssetAmountPerLp,
            lastQuoteAssetAmountPerLp,
            marketIndex,
            openOrders,
            perLpBase,
            maxMarginRatio,
            isolatedPositionScaledBalance,
            positionFlag
        });
    }
    const orders = [];
    for(let i = 0; i < 32; i++){
        // skip order if it's not open
        if (buffer.readUint8(offset + 82) !== 1) {
            offset += 96;
            continue;
        }
        const slot = readUnsignedBigInt64LE(buffer, offset);
        offset += 8;
        const price = readUnsignedBigInt64LE(buffer, offset);
        offset += 8;
        const baseAssetAmount = readUnsignedBigInt64LE(buffer, offset);
        offset += 8;
        const baseAssetAmountFilled = readUnsignedBigInt64LE(buffer, offset);
        offset += 8;
        const quoteAssetAmountFilled = readUnsignedBigInt64LE(buffer, offset);
        offset += 8;
        const triggerPrice = readUnsignedBigInt64LE(buffer, offset);
        offset += 8;
        const auctionStartPrice = readSignedBigInt64LE(buffer, offset);
        offset += 8;
        const auctionEndPrice = readSignedBigInt64LE(buffer, offset);
        offset += 8;
        const maxTs = readSignedBigInt64LE(buffer, offset);
        offset += 8;
        const oraclePriceOffset = buffer.readInt32LE(offset);
        offset += 4;
        const orderId = buffer.readUInt32LE(offset);
        offset += 4;
        const marketIndex = buffer.readUInt16LE(offset);
        offset += 2;
        const orderStatusNum = buffer.readUInt8(offset);
        let status;
        if (orderStatusNum === 0) {
            status = types_1.OrderStatus.INIT;
        } else if (orderStatusNum === 1) {
            status = types_1.OrderStatus.OPEN;
        }
        offset += 1;
        const orderTypeNum = buffer.readUInt8(offset);
        let orderType;
        if (orderTypeNum === 0) {
            orderType = types_1.OrderType.MARKET;
        } else if (orderTypeNum === 1) {
            orderType = types_1.OrderType.LIMIT;
        } else if (orderTypeNum === 2) {
            orderType = types_1.OrderType.TRIGGER_MARKET;
        } else if (orderTypeNum === 3) {
            orderType = types_1.OrderType.TRIGGER_LIMIT;
        } else if (orderTypeNum === 4) {
            orderType = types_1.OrderType.ORACLE;
        }
        offset += 1;
        const marketTypeNum = buffer.readUInt8(offset);
        let marketType;
        if (marketTypeNum === 0) {
            marketType = types_1.MarketType.SPOT;
        } else {
            marketType = types_1.MarketType.PERP;
        }
        offset += 1;
        const userOrderId = buffer.readUint8(offset);
        offset += 1;
        const existingPositionDirectionNum = buffer.readUInt8(offset);
        let existingPositionDirection;
        if (existingPositionDirectionNum === 0) {
            existingPositionDirection = types_1.PositionDirection.LONG;
        } else {
            existingPositionDirection = types_1.PositionDirection.SHORT;
        }
        offset += 1;
        const positionDirectionNum = buffer.readUInt8(offset);
        let direction;
        if (positionDirectionNum === 0) {
            direction = types_1.PositionDirection.LONG;
        } else {
            direction = types_1.PositionDirection.SHORT;
        }
        offset += 1;
        const reduceOnly = buffer.readUInt8(offset) === 1;
        offset += 1;
        const postOnly = buffer.readUInt8(offset) === 1;
        offset += 1;
        const immediateOrCancel = buffer.readUInt8(offset) === 1;
        offset += 1;
        const triggerConditionNum = buffer.readUInt8(offset);
        let triggerCondition;
        if (triggerConditionNum === 0) {
            triggerCondition = types_1.OrderTriggerCondition.ABOVE;
        } else if (triggerConditionNum === 1) {
            triggerCondition = types_1.OrderTriggerCondition.BELOW;
        } else if (triggerConditionNum === 2) {
            triggerCondition = types_1.OrderTriggerCondition.TRIGGERED_ABOVE;
        } else if (triggerConditionNum === 3) {
            triggerCondition = types_1.OrderTriggerCondition.TRIGGERED_BELOW;
        }
        offset += 1;
        const auctionDuration = buffer.readUInt8(offset);
        offset += 1;
        const postedSlotTail = buffer.readUint8(offset);
        offset += 1;
        const bitFlags = buffer.readUint8(offset);
        offset += 1;
        offset += 1; // padding
        orders.push({
            slot,
            price,
            baseAssetAmount,
            quoteAssetAmount: undefined,
            baseAssetAmountFilled,
            quoteAssetAmountFilled,
            triggerPrice,
            auctionStartPrice,
            auctionEndPrice,
            maxTs,
            oraclePriceOffset,
            orderId,
            marketIndex,
            status,
            orderType,
            marketType,
            userOrderId,
            existingPositionDirection,
            direction,
            reduceOnly,
            postOnly,
            immediateOrCancel,
            triggerCondition,
            auctionDuration,
            bitFlags,
            postedSlotTail
        });
    }
    const lastAddPerpLpSharesTs = readSignedBigInt64LE(buffer, offset);
    offset += 8;
    const totalDeposits = readUnsignedBigInt64LE(buffer, offset);
    offset += 8;
    const totalWithdraws = readUnsignedBigInt64LE(buffer, offset);
    offset += 8;
    const totalSocialLoss = readUnsignedBigInt64LE(buffer, offset);
    offset += 8;
    const settledPerpPnl = readSignedBigInt64LE(buffer, offset);
    offset += 8;
    const cumulativeSpotFees = readSignedBigInt64LE(buffer, offset);
    offset += 8;
    const cumulativePerpFunding = readSignedBigInt64LE(buffer, offset);
    offset += 8;
    const liquidationMarginFreed = readUnsignedBigInt64LE(buffer, offset);
    offset += 8;
    const lastActiveSlot = readUnsignedBigInt64LE(buffer, offset);
    offset += 8;
    const nextOrderId = buffer.readUInt32LE(offset);
    offset += 4;
    const maxMarginRatio = buffer.readUInt32LE(offset);
    offset += 4;
    const nextLiquidationId = buffer.readUInt16LE(offset);
    offset += 2;
    const subAccountId = buffer.readUInt16LE(offset);
    offset += 2;
    const status = buffer.readUInt8(offset);
    offset += 1;
    const isMarginTradingEnabled = buffer.readUInt8(offset) === 1;
    offset += 1;
    const idle = buffer.readUInt8(offset) === 1;
    offset += 1;
    const openOrders = buffer.readUInt8(offset);
    offset += 1;
    const hasOpenOrder = buffer.readUInt8(offset) === 1;
    offset += 1;
    const openAuctions = buffer.readUInt8(offset);
    offset += 1;
    const hasOpenAuction = buffer.readUInt8(offset) === 1;
    offset += 1;
    let marginMode;
    const marginModeNum = buffer.readUInt8(offset);
    if (marginModeNum === 0) {
        marginMode = types_1.MarginMode.DEFAULT;
    } else if (marginModeNum === 1) {
        marginMode = types_1.MarginMode.HIGH_LEVERAGE;
    } else if (marginModeNum === 2) {
        marginMode = types_1.MarginMode.HIGH_LEVERAGE_MAINTENANCE;
    } else {
        console.error(`Detected unknown margin mode: ${marginModeNum}. Please update @drift-labs/sdk for latest IDL.`);
        marginMode = types_1.MarginMode.DEFAULT;
    }
    offset += 1;
    const poolId = buffer.readUint8(offset);
    offset += 1;
    offset += 3; // padding
    const lastFuelBonusUpdateTs = buffer.readUint32LE(offset);
    offset += 4;
    return {
        authority,
        delegate,
        name,
        spotPositions,
        perpPositions,
        orders,
        lastAddPerpLpSharesTs,
        totalDeposits,
        totalWithdraws,
        totalSocialLoss,
        settledPerpPnl,
        cumulativeSpotFees,
        cumulativePerpFunding,
        liquidationMarginFreed,
        lastActiveSlot,
        nextOrderId,
        maxMarginRatio,
        nextLiquidationId,
        subAccountId,
        status,
        isMarginTradingEnabled,
        idle,
        openOrders,
        hasOpenOrder,
        openAuctions,
        hasOpenAuction,
        marginMode,
        poolId,
        lastFuelBonusUpdateTs
    };
}
exports.decodeUser = decodeUser;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/decode/customCoder.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CustomBorshAccountsCoder = exports.CustomBorshCoder = void 0;
const buffer_1 = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)");
const camelcase_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/camelcase@6.3.0/node_modules/camelcase/index.js [app-route] (ecmascript)"));
const coder_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/cjs/coder/index.js [app-route] (ecmascript)");
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/cjs/coder/borsh/types.js [app-route] (ecmascript)");
const discriminator_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/cjs/coder/borsh/discriminator.js [app-route] (ecmascript)");
class CustomBorshCoder {
    constructor(idl){
        this.instruction = new coder_1.BorshInstructionCoder(idl);
        this.accounts = new CustomBorshAccountsCoder(idl);
        this.events = new coder_1.BorshEventCoder(idl);
        this.types = new types_1.BorshTypesCoder(idl);
        this.idl = idl;
    }
}
exports.CustomBorshCoder = CustomBorshCoder;
/**
 * Custom accounts coder that wraps BorshAccountsCoder to fix encode buffer sizing.
 */ class CustomBorshAccountsCoder {
    constructor(idl){
        this.baseCoder = new coder_1.BorshAccountsCoder(idl);
        this.idl = idl;
    }
    async encode(accountName, account) {
        var _a;
        const idlAcc = (_a = this.idl.accounts) === null || _a === void 0 ? void 0 : _a.find((acc)=>acc.name === accountName);
        if (!idlAcc) {
            throw new Error(`Unknown account not found in idl: ${accountName}`);
        }
        const buffer = buffer_1.Buffer.alloc(this.size(idlAcc)); // fix encode issue - use proper size instead of fixed 1000
        const layout = this.baseCoder['accountLayouts'].get(accountName);
        if (!layout) {
            throw new Error(`Unknown account: ${accountName}`);
        }
        const len = layout.encode(account, buffer);
        const accountData = buffer.slice(0, len);
        const discriminator = coder_1.BorshAccountsCoder.accountDiscriminator(accountName);
        return buffer_1.Buffer.concat([
            discriminator,
            accountData
        ]);
    }
    // Delegate all other methods to the base coder
    decode(accountName, data) {
        return this.baseCoder.decode(accountName, data);
    }
    decodeAny(data) {
        return this.baseCoder.decodeAny(data);
    }
    decodeUnchecked(accountName, ix) {
        return this.baseCoder.decodeUnchecked(accountName, ix);
    }
    memcmp(accountName, appendData) {
        return this.baseCoder.memcmp(accountName, appendData);
    }
    size(idlAccount) {
        return this.baseCoder.size(idlAccount);
    }
    /**
     * Calculates and returns a unique 8 byte discriminator prepended to all anchor accounts.
     *
     * @param name The name of the account to calculate the discriminator.
     */ static accountDiscriminator(name) {
        const discriminatorPreimage = `account:${(0, camelcase_1.default)(name, {
            pascalCase: true,
            preserveConsecutiveUppercase: true
        })}`;
        return (0, discriminator_1.discriminator)(discriminatorPreimage);
    }
}
exports.CustomBorshAccountsCoder = CustomBorshAccountsCoder;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/decode/phoenix.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fastDecode = exports.restingOrderBeet = exports.orderIdBeet = void 0;
const phoenix_sdk_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@ellipsis-labs+phoenix-sdk@1.4.5_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@ellipsis-labs/phoenix-sdk/dist/index.js [app-route] (ecmascript)");
const beet = __importStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@metaplex-foundation+beet@0.7.2/node_modules/@metaplex-foundation/beet/dist/cjs/src/beet.js [app-route] (ecmascript)"));
exports.orderIdBeet = new beet.BeetArgsStruct([
    [
        'priceInTicks',
        beet.u64
    ],
    [
        'orderSequenceNumber',
        beet.u64
    ]
], 'fIFOOrderId');
exports.restingOrderBeet = new beet.BeetArgsStruct([
    [
        'traderIndex',
        beet.u64
    ],
    [
        'numBaseLots',
        beet.u64
    ],
    [
        'lastValidSlot',
        beet.u64
    ],
    [
        'lastValidUnixTimestampInSeconds',
        beet.u64
    ]
], 'fIFORestingOrder');
function deserializeRedBlackTree(data, keyDeserializer, valueDeserializer) {
    const tree = new Map();
    const treeNodes = deserializeRedBlackTreeNodes(data, keyDeserializer, valueDeserializer);
    const nodes = treeNodes[0];
    const freeNodes = treeNodes[1];
    for (const [index, [key, value]] of nodes.entries()){
        if (!freeNodes.has(index)) {
            tree.set(key, value);
        }
    }
    return tree;
}
function deserializeRedBlackTreeNodes(data, keyDeserializer, valueDeserializer) {
    let offset = 0;
    const keySize = keyDeserializer.byteSize;
    const valueSize = valueDeserializer.byteSize;
    const nodes = new Array();
    // Skip RBTree header
    offset += 16;
    // Skip node allocator size
    offset += 8;
    const bumpIndex = data.readInt32LE(offset);
    offset += 4;
    let freeListHead = data.readInt32LE(offset);
    offset += 4;
    const freeListPointers = new Array();
    for(let index = 0; offset < data.length && index < bumpIndex - 1; index++){
        const registers = new Array();
        for(let i = 0; i < 4; i++){
            registers.push(data.readInt32LE(offset)); // skip padding
            offset += 4;
        }
        const [key] = keyDeserializer.deserialize(data.subarray(offset, offset + keySize));
        offset += keySize;
        const [value] = valueDeserializer.deserialize(data.subarray(offset, offset + valueSize));
        offset += valueSize;
        nodes.push([
            key,
            value
        ]);
        freeListPointers.push([
            index,
            registers[0]
        ]);
    }
    const freeNodes = new Set();
    let indexToRemove = freeListHead - 1;
    let counter = 0;
    // If there's an infinite loop here, that means that the state is corrupted
    while(freeListHead < bumpIndex){
        // We need to subtract 1 because the node allocator is 1-indexed
        const next = freeListPointers[freeListHead - 1];
        [indexToRemove, freeListHead] = next;
        freeNodes.add(indexToRemove);
        counter += 1;
        if (counter > bumpIndex) {
            throw new Error('Infinite loop detected');
        }
    }
    return [
        nodes,
        freeNodes
    ];
}
const fastDecode = (buffer)=>{
    let offset = phoenix_sdk_1.marketHeaderBeet.byteSize;
    const [header] = phoenix_sdk_1.marketHeaderBeet.deserialize(buffer.subarray(0, offset));
    const paddingLen = 8 * 32;
    let remaining = buffer.subarray(offset + paddingLen);
    offset = 0;
    const baseLotsPerBaseUnit = Number(remaining.readBigUInt64LE(offset));
    offset += 8;
    const quoteLotsPerBaseUnitPerTick = Number(remaining.readBigUInt64LE(offset));
    offset += 8;
    const sequenceNumber = Number(remaining.readBigUInt64LE(offset));
    offset += 8;
    const takerFeeBps = Number(remaining.readBigUInt64LE(offset));
    offset += 8;
    const collectedQuoteLotFees = Number(remaining.readBigUInt64LE(offset));
    offset += 8;
    const unclaimedQuoteLotFees = Number(remaining.readBigUInt64LE(offset));
    offset += 8;
    remaining = remaining.subarray(offset);
    const totalNumBids = (0, phoenix_sdk_1.toNum)(header.marketSizeParams.bidsSize);
    const totalNumAsks = (0, phoenix_sdk_1.toNum)(header.marketSizeParams.asksSize);
    const totalBidsSize = 16 + 16 + (16 + exports.orderIdBeet.byteSize + exports.restingOrderBeet.byteSize) * totalNumBids;
    const totalAsksSize = 16 + 16 + (16 + exports.orderIdBeet.byteSize + exports.restingOrderBeet.byteSize) * totalNumAsks;
    offset = 0;
    const bidBuffer = remaining.subarray(offset, offset + totalBidsSize);
    offset += totalBidsSize;
    const askBuffer = remaining.subarray(offset, offset + totalAsksSize);
    const bidsUnsorted = deserializeRedBlackTree(bidBuffer, exports.orderIdBeet, exports.restingOrderBeet);
    const asksUnsorted = deserializeRedBlackTree(askBuffer, exports.orderIdBeet, exports.restingOrderBeet);
    const bids = [
        ...bidsUnsorted
    ].sort((a, b)=>{
        const priceComparison = (0, phoenix_sdk_1.sign)((0, phoenix_sdk_1.toBN)(b[0].priceInTicks).sub((0, phoenix_sdk_1.toBN)(a[0].priceInTicks)));
        if (priceComparison !== 0) {
            return priceComparison;
        }
        return (0, phoenix_sdk_1.sign)((0, phoenix_sdk_1.getUiOrderSequenceNumber)(a[0]).sub((0, phoenix_sdk_1.getUiOrderSequenceNumber)(b[0])));
    });
    const asks = [
        ...asksUnsorted
    ].sort((a, b)=>{
        const priceComparison = (0, phoenix_sdk_1.sign)((0, phoenix_sdk_1.toBN)(a[0].priceInTicks).sub((0, phoenix_sdk_1.toBN)(b[0].priceInTicks)));
        if (priceComparison !== 0) {
            return priceComparison;
        }
        return (0, phoenix_sdk_1.sign)((0, phoenix_sdk_1.getUiOrderSequenceNumber)(a[0]).sub((0, phoenix_sdk_1.getUiOrderSequenceNumber)(b[0])));
    });
    const traders = new Map();
    const traderPubkeyToTraderIndex = new Map();
    const traderIndexToTraderPubkey = new Map();
    return {
        header,
        baseLotsPerBaseUnit,
        quoteLotsPerBaseUnitPerTick,
        sequenceNumber,
        takerFeeBps,
        collectedQuoteLotFees,
        unclaimedQuoteLotFees,
        bids,
        asks,
        traders,
        traderPubkeyToTraderIndex,
        traderIndexToTraderPubkey
    };
};
exports.fastDecode = fastDecode;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/events/types.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DefaultEventSubscriptionOptions = void 0;
exports.DefaultEventSubscriptionOptions = {
    eventTypes: [
        'DepositRecord',
        'FundingPaymentRecord',
        'LiquidationRecord',
        'OrderRecord',
        'OrderActionRecord',
        'FundingRateRecord',
        'NewUserRecord',
        'SettlePnlRecord',
        'LPRecord',
        'InsuranceFundRecord',
        'SpotInterestRecord',
        'InsuranceFundStakeRecord',
        'CurveRecord',
        'SwapRecord',
        'SpotMarketVaultDepositRecord',
        'SignedMsgOrderRecord',
        'DeleteUserRecord',
        'FuelSweepRecord',
        'FuelSeasonRecord',
        'InsuranceFundSwapRecord',
        'TransferProtocolIfSharesToRevenuePoolRecord',
        'LPMintRedeemRecord',
        'LPSettleRecord',
        'LPSwapRecord'
    ],
    maxEventsPerType: 4096,
    orderBy: 'blockchain',
    orderDir: 'asc',
    commitment: 'confirmed',
    maxTx: 4096,
    logProviderConfig: {
        type: 'websocket'
    }
};
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/events/txEventCache.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TxEventCache = void 0;
class Node {
    constructor(key, value, next, prev){
        this.key = key;
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}
// lru cache
class TxEventCache {
    constructor(maxTx = 1024){
        this.maxTx = maxTx;
        this.size = 0;
        this.cacheMap = {};
    }
    add(key, events) {
        const existingNode = this.cacheMap[key];
        if (existingNode) {
            this.detach(existingNode);
            this.size--;
        } else if (this.size === this.maxTx) {
            delete this.cacheMap[this.tail.key];
            this.detach(this.tail);
            this.size--;
        }
        // Write to head of LinkedList
        if (!this.head) {
            this.head = this.tail = new Node(key, events);
        } else {
            const node = new Node(key, events, this.head);
            this.head.prev = node;
            this.head = node;
        }
        // update cacheMap with LinkedList key and Node reference
        this.cacheMap[key] = this.head;
        this.size++;
    }
    has(key) {
        return this.cacheMap.hasOwnProperty(key);
    }
    get(key) {
        var _a;
        return (_a = this.cacheMap[key]) === null || _a === void 0 ? void 0 : _a.value;
    }
    detach(node) {
        if (node.prev !== undefined) {
            node.prev.next = node.next;
        } else {
            this.head = node.next;
        }
        if (node.next !== undefined) {
            node.next.prev = node.prev;
        } else {
            this.tail = node.prev;
        }
    }
    clear() {
        this.head = undefined;
        this.tail = undefined;
        this.size = 0;
        this.cacheMap = {};
    }
}
exports.TxEventCache = TxEventCache;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/events/eventList.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EventList = void 0;
class Node {
    constructor(event, next, prev){
        this.event = event;
        this.next = next;
        this.prev = prev;
    }
}
class EventList {
    constructor(eventType, maxSize, sortFn, orderDirection){
        this.eventType = eventType;
        this.maxSize = maxSize;
        this.sortFn = sortFn;
        this.orderDirection = orderDirection;
        this.size = 0;
    }
    insert(event) {
        this.size++;
        const newNode = new Node(event);
        if (this.head === undefined) {
            this.head = this.tail = newNode;
            return;
        }
        if (this.sortFn(this.head.event, newNode.event) === (this.orderDirection === 'asc' ? 'less than' : 'greater than')) {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        } else {
            let currentNode = this.head;
            while(currentNode.next !== undefined && this.sortFn(currentNode.next.event, newNode.event) !== (this.orderDirection === 'asc' ? 'less than' : 'greater than')){
                currentNode = currentNode.next;
            }
            newNode.next = currentNode.next;
            if (currentNode.next !== undefined) {
                newNode.next.prev = newNode;
            } else {
                this.tail = newNode;
            }
            currentNode.next = newNode;
            newNode.prev = currentNode;
        }
        if (this.size > this.maxSize) {
            this.detach();
        }
    }
    detach() {
        const node = this.tail;
        if (node.prev !== undefined) {
            node.prev.next = node.next;
        } else {
            this.head = node.next;
        }
        if (node.next !== undefined) {
            node.next.prev = node.prev;
        } else {
            this.tail = node.prev;
        }
        this.size--;
    }
    toArray() {
        return Array.from(this);
    }
    *[Symbol.iterator]() {
        let node = this.head;
        while(node){
            yield node.event;
            node = node.next;
        }
    }
}
exports.EventList = EventList;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/events/parse.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseLogsForCuUsage = exports.parseLogsWithRaw = exports.parseLogs = void 0;
const driftProgramId = 'dRiftyHA39MWEi3m9aunc5MzRF1JYuBsbn6VPcn33UH';
const PROGRAM_LOG = 'Program log: ';
const PROGRAM_INSTRUCTION = 'Program log: Instruction: ';
const PROGRAM_DATA = 'Program data: ';
const PROGRAM_LOG_START_INDEX = PROGRAM_LOG.length;
const PROGRAM_DATA_START_INDEX = PROGRAM_DATA.length;
const PROGRAM_INSTRUCTION_START_INDEX = PROGRAM_INSTRUCTION.length;
function parseLogs(program, logs, programId = driftProgramId) {
    const { events } = parseLogsWithRaw(program, logs, programId);
    return events;
}
exports.parseLogs = parseLogs;
function parseLogsWithRaw(program, logs, programId = driftProgramId) {
    const events = [];
    const rawLogs = [];
    const execution = new ExecutionContext();
    for (const log of logs){
        if (log.startsWith('Log truncated')) {
            break;
        }
        const [event, newProgram, didPop] = handleLog(execution, log, program, programId);
        if (event) {
            events.push(event);
            rawLogs.push(log);
        }
        if (newProgram) {
            execution.push(newProgram);
        }
        if (didPop) {
            execution.pop();
        }
    }
    return {
        events,
        rawLogs
    };
}
exports.parseLogsWithRaw = parseLogsWithRaw;
function handleLog(execution, log, program, programId = driftProgramId) {
    // Executing program is drift program.
    if (execution.stack.length > 0 && execution.program() === programId) {
        return handleProgramLog(log, program, programId);
    } else {
        return [
            null,
            ...handleSystemLog(log, programId)
        ];
    }
}
// Handles logs from *drift* program.
function handleProgramLog(log, program, programId = driftProgramId) {
    // This is a `msg!` log or a `sol_log_data` log.
    if (log.startsWith(PROGRAM_LOG)) {
        const logStr = log.slice(PROGRAM_LOG_START_INDEX);
        const event = program.coder.events.decode(logStr);
        return [
            event,
            null,
            false
        ];
    } else if (log.startsWith(PROGRAM_DATA)) {
        const logStr = log.slice(PROGRAM_DATA_START_INDEX);
        const event = program.coder.events.decode(logStr);
        return [
            event,
            null,
            false
        ];
    } else {
        return [
            null,
            ...handleSystemLog(log, programId)
        ];
    }
}
// Handles logs when the current program being executing is *not* drift.
function handleSystemLog(log, programId = driftProgramId) {
    // System component.
    const logStart = log.split(':')[0];
    const programStart = `Program ${programId} invoke`;
    // Did the program finish executing?
    if (logStart.match(/^Program (.*) success/g) !== null) {
        return [
            null,
            true
        ];
    // Recursive call.
    } else if (logStart.startsWith(programStart)) {
        return [
            programId,
            false
        ];
    } else if (logStart.includes('invoke')) {
        return [
            'cpi',
            false
        ]; // Any string will do.
    } else {
        return [
            null,
            false
        ];
    }
}
// Stack frame execution context, allowing one to track what program is
// executing for a given log.
class ExecutionContext {
    constructor(){
        this.stack = [];
        this.ixStack = [];
    }
    program() {
        if (!this.stack.length) {
            throw new Error('Expected the stack to have elements');
        }
        return this.stack[this.stack.length - 1];
    }
    push(newProgram) {
        this.stack.push(newProgram);
    }
    pop() {
        if (!this.stack.length) {
            throw new Error('Expected the stack to have elements');
        }
        this.stack.pop();
    }
    ix() {
        if (!this.ixStack.length) {
            throw new Error('Expected the ix stack to have elements');
        }
        return this.ixStack[this.ixStack.length - 1];
    }
    pushIx(newIx) {
        this.ixStack.push(newIx);
    }
    popIx() {
        this.ixStack.pop();
    }
}
function parseLogsForCuUsage(logs, programId = driftProgramId) {
    const cuUsageEvents = [];
    const execution = new ExecutionContext();
    for (const log of logs){
        if (log.startsWith('Log truncated')) {
            break;
        }
        const [newProgram, newIx, didPopProgram, didPopIx] = handleLogForCuUsage(execution, log, programId);
        if (newProgram) {
            execution.push(newProgram);
        }
        if (newIx) {
            execution.pushIx(newIx);
        }
        if (didPopProgram) {
            execution.pop();
        }
        if (didPopIx !== null) {
            cuUsageEvents.push({
                name: 'CuUsage',
                data: {
                    instruction: execution.ix(),
                    cuUsage: didPopIx
                }
            });
            execution.popIx();
        }
    }
    return cuUsageEvents;
}
exports.parseLogsForCuUsage = parseLogsForCuUsage;
function handleLogForCuUsage(execution, log, programId = driftProgramId) {
    if (execution.stack.length > 0 && execution.program() === programId) {
        return handleProgramLogForCuUsage(log, programId);
    } else {
        return handleSystemLogForCuUsage(log, programId);
    }
}
function handleProgramLogForCuUsage(log, programId = driftProgramId) {
    if (log.startsWith(PROGRAM_INSTRUCTION)) {
        const ixStr = log.slice(PROGRAM_INSTRUCTION_START_INDEX);
        return [
            null,
            ixStr,
            false,
            null
        ];
    } else {
        return handleSystemLogForCuUsage(log, programId);
    }
}
function handleSystemLogForCuUsage(log, programId = driftProgramId) {
    // System component.
    const logStart = log.split(':')[0];
    const programStart = `Program ${programId} invoke`;
    // Did the program finish executing?
    if (logStart.match(/^Program (.*) success/g) !== null) {
        return [
            null,
            null,
            true,
            null
        ];
    // Recursive call.
    } else if (logStart.startsWith(programStart)) {
        return [
            programId,
            null,
            false,
            null
        ];
    // Consumed CU log.
    } else if (log.startsWith(`Program ${programId} consumed `)) {
        // Extract CU usage, e.g. 'Program ... consumed 29242 of 199700 compute units'
        // We need to extract the consumed value (29242)
        const matches = log.match(/consumed (\d+) of \d+ compute units/);
        if (matches) {
            return [
                null,
                null,
                false,
                Number(matches[1])
            ];
        }
        return [
            null,
            null,
            false,
            null
        ];
    } else if (logStart.includes('invoke')) {
        return [
            'cpi',
            null,
            false,
            null
        ]; // Any string will do.
    } else {
        return [
            null,
            null,
            false,
            null
        ];
    }
}
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/events/fetchLogs.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LogParser = exports.fetchTransactionLogs = exports.fetchLogs = void 0;
const promiseTimeout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/util/promiseTimeout.js [app-route] (ecmascript)");
const parse_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/events/parse.js [app-route] (ecmascript)");
function mapTransactionResponseToLog(transaction) {
    return {
        txSig: transaction.transaction.signatures[0],
        slot: transaction.slot,
        logs: transaction.meta.logMessages
    };
}
async function fetchLogs(connection, address, finality, beforeTx, untilTx, limit, batchSize = 25) {
    const signatures = await connection.getSignaturesForAddress(address, {
        before: beforeTx,
        until: untilTx,
        limit
    }, finality);
    const sortedSignatures = signatures.sort((a, b)=>a.slot === b.slot ? 0 : a.slot < b.slot ? -1 : 1);
    const filteredSignatures = sortedSignatures.filter((signature)=>!signature.err);
    if (filteredSignatures.length === 0) {
        return undefined;
    }
    const chunkedSignatures = chunk(filteredSignatures, batchSize);
    const transactionLogs = (await Promise.all(chunkedSignatures.map(async (chunk)=>{
        return await fetchTransactionLogs(connection, chunk.map((confirmedSignature)=>confirmedSignature.signature), finality);
    }))).flat();
    const earliest = filteredSignatures[0];
    const mostRecent = filteredSignatures[filteredSignatures.length - 1];
    return {
        transactionLogs: transactionLogs,
        earliestTx: earliest.signature,
        mostRecentTx: mostRecent.signature,
        earliestSlot: earliest.slot,
        mostRecentSlot: mostRecent.slot,
        mostRecentBlockTime: mostRecent.blockTime
    };
}
exports.fetchLogs = fetchLogs;
async function fetchTransactionLogs(connection, signatures, finality) {
    const requests = new Array();
    for (const signature of signatures){
        const args = [
            signature,
            {
                commitment: finality,
                maxSupportedTransactionVersion: 0
            }
        ];
        requests.push({
            methodName: 'getTransaction',
            args
        });
    }
    const rpcResponses = await (0, promiseTimeout_1.promiseTimeout)(// @ts-ignore
    connection._rpcBatchRequest(requests), 10 * 1000 // 10 second timeout
    );
    if (rpcResponses === null) {
        return Promise.reject('RPC request timed out fetching transactions');
    }
    const logs = new Array();
    for (const rpcResponse of rpcResponses){
        if (rpcResponse.result) {
            logs.push(mapTransactionResponseToLog(rpcResponse.result));
        }
    }
    return logs;
}
exports.fetchTransactionLogs = fetchTransactionLogs;
function chunk(array, size) {
    return new Array(Math.ceil(array.length / size)).fill(null).map((_, index)=>index * size).map((begin)=>array.slice(begin, begin + size));
}
class LogParser {
    constructor(program){
        this.program = program;
    }
    parseEventsFromTransaction(transaction) {
        const transactionLogObject = mapTransactionResponseToLog(transaction);
        return this.parseEventsFromLogs(transactionLogObject);
    }
    parseEventsFromLogs(event) {
        const records = [];
        if (!event.logs) return records;
        let runningEventIndex = 0;
        for (const eventLog of (0, parse_1.parseLogs)(this.program, event.logs)){
            eventLog.data.txSig = event.txSig;
            eventLog.data.slot = event.slot;
            eventLog.data.eventType = eventLog.name;
            eventLog.data.txSigIndex = runningEventIndex;
            // @ts-ignore
            records.push(eventLog.data);
            runningEventIndex++;
        }
        return records;
    }
}
exports.LogParser = LogParser;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/events/pollingLogProvider.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PollingLogProvider = void 0;
const fetchLogs_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/events/fetchLogs.js [app-route] (ecmascript)");
class PollingLogProvider {
    constructor(connection, address, commitment, frequency = 15 * 1000, batchSize){
        this.connection = connection;
        this.address = address;
        this.frequency = frequency;
        this.batchSize = batchSize;
        this.firstFetch = true;
        this.finality = commitment === 'finalized' ? 'finalized' : 'confirmed';
    }
    async subscribe(callback, skipHistory) {
        if (this.intervalId) {
            return true;
        }
        this.intervalId = setInterval(async ()=>{
            if (this.mutex === 1) {
                return;
            }
            this.mutex = 1;
            try {
                const response = await (0, fetchLogs_1.fetchLogs)(this.connection, this.address, this.finality, undefined, this.mostRecentSeenTx, // If skipping history, only fetch one log back, not the maximum amount available
                skipHistory && this.firstFetch ? 1 : undefined, this.batchSize);
                if (response === undefined) {
                    return;
                }
                this.firstFetch = false;
                const { mostRecentTx, transactionLogs } = response;
                for (const { txSig, slot, logs } of transactionLogs){
                    callback(txSig, slot, logs, response.mostRecentBlockTime, undefined);
                }
                this.mostRecentSeenTx = mostRecentTx;
            } catch (e) {
                console.error('PollingLogProvider threw an Error');
                console.error(e);
            } finally{
                this.mutex = 0;
            }
        }, this.frequency);
        return true;
    }
    isSubscribed() {
        return this.intervalId !== undefined;
    }
    async unsubscribe() {
        if (this.intervalId !== undefined) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
        return true;
    }
}
exports.PollingLogProvider = PollingLogProvider;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/events/webSocketLogProvider.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WebSocketLogProvider = void 0;
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
class WebSocketLogProvider {
    constructor(connection, address, commitment, resubTimeoutMs){
        this.connection = connection;
        this.address = address;
        this.commitment = commitment;
        this.resubTimeoutMs = resubTimeoutMs;
        this.isUnsubscribing = false;
        this.externalUnsubscribe = false;
        this.receivingData = false;
        this.reconnectAttempts = 0;
        if (this.resubTimeoutMs) {
            this.eventEmitter = new events_1.EventEmitter();
        }
    }
    async subscribe(callback) {
        if (this.subscriptionId != null) {
            return true;
        }
        this.callback = callback;
        try {
            this.setSubscription(callback);
        } catch (error) {
            // Sometimes ws connection isn't ready, give it a few secs
            setTimeout(()=>this.setSubscription(callback), 2000);
        }
        if (this.resubTimeoutMs) {
            this.setTimeout();
        }
        return true;
    }
    setSubscription(callback) {
        this.subscriptionId = this.connection.onLogs(this.address, (logs, ctx)=>{
            if (this.resubTimeoutMs && !this.isUnsubscribing) {
                this.receivingData = true;
                clearTimeout(this.timeoutId);
                this.setTimeout();
                if (this.reconnectAttempts > 0) {
                    console.log('Resetting reconnect attempts to 0');
                }
                this.reconnectAttempts = 0;
            }
            if (logs.err !== null) {
                return;
            }
            callback(logs.signature, ctx.slot, logs.logs, undefined, undefined);
        }, this.commitment);
    }
    isSubscribed() {
        return this.subscriptionId != null;
    }
    async unsubscribe(external = false) {
        this.isUnsubscribing = true;
        this.externalUnsubscribe = external;
        clearTimeout(this.timeoutId);
        this.timeoutId = undefined;
        if (this.subscriptionId != null) {
            try {
                await this.connection.removeOnLogsListener(this.subscriptionId);
                this.subscriptionId = undefined;
                this.isUnsubscribing = false;
                return true;
            } catch (err) {
                console.log('Error unsubscribing from logs: ', err);
                this.isUnsubscribing = false;
                return false;
            }
        } else {
            this.isUnsubscribing = false;
            return true;
        }
    }
    setTimeout() {
        this.timeoutId = setTimeout(async ()=>{
            if (this.isUnsubscribing || this.externalUnsubscribe) {
                // If we are in the process of unsubscribing, do not attempt to resubscribe
                return;
            }
            if (this.receivingData) {
                console.log(`webSocketLogProvider: No log data in ${this.resubTimeoutMs}ms, resubscribing on attempt ${this.reconnectAttempts + 1}`);
                await this.unsubscribe();
                this.receivingData = false;
                this.reconnectAttempts++;
                this.eventEmitter.emit('reconnect', this.reconnectAttempts);
                this.subscribe(this.callback);
            }
        }, this.resubTimeoutMs);
    }
}
exports.WebSocketLogProvider = WebSocketLogProvider;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/events/sort.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSortFn = void 0;
function clientSortAscFn() {
    return 'less than';
}
function clientSortDescFn() {
    return 'greater than';
}
function blockchainSortFn(currentEvent, newEvent) {
    if (currentEvent.slot == newEvent.slot) {
        return currentEvent.txSigIndex < newEvent.txSigIndex ? 'less than' : 'greater than';
    }
    return currentEvent.slot < newEvent.slot ? 'less than' : 'greater than';
}
function getSortFn(orderBy, orderDir) {
    if (orderBy === 'client') {
        return orderDir === 'asc' ? clientSortAscFn : clientSortDescFn;
    }
    return blockchainSortFn;
}
exports.getSortFn = getSortFn;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/events/eventsServerLogProvider.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EventsServerLogProvider = void 0;
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
// browser support
let WebSocketImpl;
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    WebSocketImpl = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/ws@7.5.10/node_modules/ws/index.js [app-route] (ecmascript)");
}
const EVENT_SERVER_HEARTBEAT_INTERVAL_MS = 5000;
const ALLOWED_MISSED_HEARTBEATS = 3;
class EventsServerLogProvider {
    constructor(url, eventTypes, userAccount){
        this.url = url;
        this.eventTypes = eventTypes;
        this.userAccount = userAccount;
        this.isUnsubscribing = false;
        this.externalUnsubscribe = false;
        this.lastHeartbeat = 0;
        this.reconnectAttempts = 0;
        this.eventEmitter = new events_1.EventEmitter();
    }
    isSubscribed() {
        return this.ws !== undefined;
    }
    async subscribe(callback) {
        if (this.ws !== undefined) {
            return true;
        }
        this.ws = new WebSocketImpl(this.url);
        this.callback = callback;
        this.ws.addEventListener('open', ()=>{
            for (const channel of this.eventTypes){
                const subscribeMessage = {
                    type: 'subscribe',
                    channel: channel
                };
                if (this.userAccount) {
                    subscribeMessage['user'] = this.userAccount;
                }
                this.ws.send(JSON.stringify(subscribeMessage));
            }
            this.reconnectAttempts = 0;
        });
        this.ws.addEventListener('message', (data)=>{
            try {
                if (!this.isUnsubscribing) {
                    clearTimeout(this.timeoutId);
                    this.setTimeout();
                    if (this.reconnectAttempts > 0) {
                        console.log('eventsServerLogProvider: Resetting reconnect attempts to 0');
                    }
                    this.reconnectAttempts = 0;
                }
                const parsedData = JSON.parse(data.data.toString());
                if (parsedData.channel === 'heartbeat') {
                    this.lastHeartbeat = Date.now();
                    return;
                }
                if (parsedData.message !== undefined) {
                    return;
                }
                const event = JSON.parse(parsedData.data);
                this.callback(event.txSig, event.slot, [
                    'Program dRiftyHA39MWEi3m9aunc5MzRF1JYuBsbn6VPcn33UH invoke [1]',
                    event.rawLog,
                    'Program dRiftyHA39MWEi3m9aunc5MzRF1JYuBsbn6VPcn33UH success'
                ], undefined, event.txSigIndex);
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        });
        this.ws.addEventListener('close', ()=>{
            console.log('eventsServerLogProvider: WebSocket closed');
        });
        this.ws.addEventListener('error', (error)=>{
            console.error('eventsServerLogProvider: WebSocket error:', error);
        });
        this.setTimeout();
        return true;
    }
    async unsubscribe(external = false) {
        this.isUnsubscribing = true;
        this.externalUnsubscribe = external;
        if (this.timeoutId) {
            clearInterval(this.timeoutId);
            this.timeoutId = undefined;
        }
        if (this.ws !== undefined) {
            this.ws.close();
            this.ws = undefined;
            return true;
        } else {
            this.isUnsubscribing = false;
            return true;
        }
    }
    setTimeout() {
        this.timeoutId = setTimeout(async ()=>{
            if (this.isUnsubscribing || this.externalUnsubscribe) {
                // If we are in the process of unsubscribing, do not attempt to resubscribe
                return;
            }
            const timeSinceLastHeartbeat = Date.now() - this.lastHeartbeat;
            if (timeSinceLastHeartbeat > EVENT_SERVER_HEARTBEAT_INTERVAL_MS * ALLOWED_MISSED_HEARTBEATS) {
                console.log(`eventServerLogProvider: No heartbeat in ${timeSinceLastHeartbeat}ms, resubscribing on attempt ${this.reconnectAttempts + 1}`);
                await this.unsubscribe();
                this.reconnectAttempts++;
                this.eventEmitter.emit('reconnect', this.reconnectAttempts);
                this.subscribe(this.callback);
            }
        }, EVENT_SERVER_HEARTBEAT_INTERVAL_MS * 2);
    }
}
exports.EventsServerLogProvider = EventsServerLogProvider;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/events/eventSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EventSubscriber = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/events/types.js [app-route] (ecmascript)");
const txEventCache_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/events/txEventCache.js [app-route] (ecmascript)");
const eventList_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/events/eventList.js [app-route] (ecmascript)");
const pollingLogProvider_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/events/pollingLogProvider.js [app-route] (ecmascript)");
const fetchLogs_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/events/fetchLogs.js [app-route] (ecmascript)");
const webSocketLogProvider_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/events/webSocketLogProvider.js [app-route] (ecmascript)");
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
const sort_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/events/sort.js [app-route] (ecmascript)");
const parse_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/events/parse.js [app-route] (ecmascript)");
const eventsServerLogProvider_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/events/eventsServerLogProvider.js [app-route] (ecmascript)");
class EventSubscriber {
    constructor(connection, program, options = types_1.DefaultEventSubscriptionOptions){
        var _a;
        this.connection = connection;
        this.program = program;
        this.options = options;
        this.awaitTxPromises = new Map();
        this.awaitTxResolver = new Map();
        this.options = Object.assign({}, types_1.DefaultEventSubscriptionOptions, options);
        this.address = (_a = this.options.address) !== null && _a !== void 0 ? _a : program.programId;
        this.txEventCache = new txEventCache_1.TxEventCache(this.options.maxTx);
        this.eventListMap = new Map();
        this.eventEmitter = new events_1.EventEmitter();
        this._currentProviderType = this.options.logProviderConfig.type;
        this.initializeLogProvider();
    }
    get currentProviderType() {
        return this._currentProviderType;
    }
    initializeLogProvider(subscribe = false) {
        const logProviderConfig = this.options.logProviderConfig;
        if (this._currentProviderType === 'websocket') {
            this.logProvider = new webSocketLogProvider_1.WebSocketLogProvider(// @ts-ignore
            this.connection, this.address, this.options.commitment, this.options.logProviderConfig.resubTimeoutMs);
        } else if (this._currentProviderType === 'polling') {
            const frequency = 'frequency' in logProviderConfig ? logProviderConfig.frequency : logProviderConfig.fallbackFrequency;
            const batchSize = 'batchSize' in logProviderConfig ? logProviderConfig.batchSize : logProviderConfig.fallbackBatchSize;
            this.logProvider = new pollingLogProvider_1.PollingLogProvider(// @ts-ignore
            this.connection, this.address, this.options.commitment, frequency, batchSize);
        } else if (this._currentProviderType === 'events-server') {
            this.logProvider = new eventsServerLogProvider_1.EventsServerLogProvider(logProviderConfig.url, this.options.eventTypes, this.options.address ? this.options.address.toString() : undefined);
        } else {
            throw new Error(`Invalid log provider type: ${this._currentProviderType}`);
        }
        if (subscribe) {
            this.logProvider.subscribe((txSig, slot, logs, mostRecentBlockTime, txSigIndex)=>{
                this.handleTxLogs(txSig, slot, logs, mostRecentBlockTime, this._currentProviderType === 'events-server', txSigIndex);
            }, true);
        }
    }
    populateInitialEventListMap() {
        for (const eventType of this.options.eventTypes){
            this.eventListMap.set(eventType, new eventList_1.EventList(eventType, this.options.maxEventsPerType, (0, sort_1.getSortFn)(this.options.orderBy, this.options.orderDir), this.options.orderDir));
        }
    }
    /**
     * Implements fallback logic for reconnecting to LogProvider. Currently terminates at polling,
     * could be improved to try the original type again after some cooldown.
     */ updateFallbackProviderType(reconnectAttempts, maxReconnectAttempts) {
        if (reconnectAttempts < maxReconnectAttempts) {
            return;
        }
        let nextProviderType = this._currentProviderType;
        if (this._currentProviderType === 'events-server') {
            nextProviderType = 'websocket';
        } else if (this._currentProviderType === 'websocket') {
            nextProviderType = 'polling';
        } else if (this._currentProviderType === 'polling') {
            nextProviderType = 'polling';
        }
        console.log(`EventSubscriber: Failing over providerType ${this._currentProviderType} to ${nextProviderType}`);
        this._currentProviderType = nextProviderType;
    }
    async subscribe() {
        try {
            if (this.logProvider.isSubscribed()) {
                return true;
            }
            this.populateInitialEventListMap();
            if (this.options.logProviderConfig.type === 'websocket' || this.options.logProviderConfig.type === 'events-server') {
                const logProviderConfig = this.options.logProviderConfig;
                if (this.logProvider.eventEmitter) {
                    this.logProvider.eventEmitter.on('reconnect', async (reconnectAttempts)=>{
                        if (reconnectAttempts > logProviderConfig.maxReconnectAttempts) {
                            console.log(`EventSubscriber: Reconnect attempts ${reconnectAttempts}/${logProviderConfig.maxReconnectAttempts}, reconnecting...`);
                            this.logProvider.eventEmitter.removeAllListeners('reconnect');
                            await this.unsubscribe();
                            this.updateFallbackProviderType(reconnectAttempts, logProviderConfig.maxReconnectAttempts);
                            this.initializeLogProvider(true);
                        }
                    });
                }
            }
            this.logProvider.subscribe((txSig, slot, logs, mostRecentBlockTime, txSigIndex)=>{
                this.handleTxLogs(txSig, slot, logs, mostRecentBlockTime, this._currentProviderType === 'events-server', txSigIndex);
            }, true);
            return true;
        } catch (e) {
            console.error('Error fetching previous txs in event subscriber');
            console.error(e);
            return false;
        }
    }
    handleTxLogs(txSig, slot, logs, mostRecentBlockTime, fromEventsServer = false, txSigIndex = undefined) {
        if (!fromEventsServer && this.txEventCache.has(txSig)) {
            return;
        }
        const wrappedEvents = this.parseEventsFromLogs(txSig, slot, logs, txSigIndex);
        for (const wrappedEvent of wrappedEvents){
            this.eventListMap.get(wrappedEvent.eventType).insert(wrappedEvent);
        }
        // dont emit event till we've added all the events to the eventListMap
        for (const wrappedEvent of wrappedEvents){
            this.eventEmitter.emit('newEvent', wrappedEvent);
        }
        if (this.awaitTxPromises.has(txSig)) {
            this.awaitTxPromises.delete(txSig);
            this.awaitTxResolver.get(txSig)();
            this.awaitTxResolver.delete(txSig);
        }
        if (!this.lastSeenSlot || slot > this.lastSeenSlot) {
            this.lastSeenTxSig = txSig;
            this.lastSeenSlot = slot;
        }
        if (this.lastSeenBlockTime === undefined || mostRecentBlockTime > this.lastSeenBlockTime) {
            this.lastSeenBlockTime = mostRecentBlockTime;
        }
        this.txEventCache.add(txSig, wrappedEvents);
    }
    async fetchPreviousTx(fetchMax) {
        if (!this.options.untilTx && !fetchMax) {
            return;
        }
        let txFetched = 0;
        let beforeTx = undefined;
        const untilTx = this.options.untilTx;
        while(txFetched < this.options.maxTx){
            const response = await (0, fetchLogs_1.fetchLogs)(// @ts-ignore
            this.connection, this.address, this.options.commitment === 'finalized' ? 'finalized' : 'confirmed', beforeTx, untilTx);
            if (response === undefined) {
                break;
            }
            txFetched += response.transactionLogs.length;
            beforeTx = response.earliestTx;
            for (const { txSig, slot, logs } of response.transactionLogs){
                this.handleTxLogs(txSig, slot, logs, response.mostRecentBlockTime);
            }
        }
    }
    async unsubscribe() {
        this.eventListMap.clear();
        this.txEventCache.clear();
        this.awaitTxPromises.clear();
        this.awaitTxResolver.clear();
        return await this.logProvider.unsubscribe(true);
    }
    parseEventsFromLogs(txSig, slot, logs, txSigIndex) {
        const records = [];
        // @ts-ignore
        const events = (0, parse_1.parseLogs)(this.program, logs);
        let runningEventIndex = 0;
        for (const event of events){
            // @ts-ignore
            const expectRecordType = this.eventListMap.has(event.name);
            if (expectRecordType) {
                event.data.txSig = txSig;
                event.data.slot = slot;
                event.data.eventType = event.name;
                event.data.txSigIndex = txSigIndex !== undefined ? txSigIndex : runningEventIndex;
                records.push(event.data);
            }
            runningEventIndex++;
        }
        return records;
    }
    awaitTx(txSig) {
        if (this.awaitTxPromises.has(txSig)) {
            return this.awaitTxPromises.get(txSig);
        }
        if (this.txEventCache.has(txSig)) {
            return Promise.resolve();
        }
        const promise = new Promise((resolve)=>{
            this.awaitTxResolver.set(txSig, resolve);
        });
        this.awaitTxPromises.set(txSig, promise);
        return promise;
    }
    getEventList(eventType) {
        return this.eventListMap.get(eventType);
    }
    /**
     * This requires the EventList be cast to an array, which requires reallocation of memory.
     * Would bias to using getEventList over getEvents
     *
     * @param eventType
     */ getEventsArray(eventType) {
        return this.eventListMap.get(eventType).toArray();
    }
    getEventsByTx(txSig) {
        return this.txEventCache.get(txSig);
    }
}
exports.EventSubscriber = EventSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/slot/SlotSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SlotSubscriber = void 0;
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
class SlotSubscriber {
    constructor(connection, config){
        this.connection = connection;
        this.isUnsubscribing = false;
        this.receivingData = false;
        this.eventEmitter = new events_1.EventEmitter();
        this.resubTimeoutMs = config === null || config === void 0 ? void 0 : config.resubTimeoutMs;
        if (this.resubTimeoutMs < 1000) {
            console.log('resubTimeoutMs should be at least 1000ms to avoid spamming resub');
        }
    }
    async subscribe() {
        if (this.subscriptionId != null) {
            return;
        }
        const newSlot = await this.connection.getSlot('confirmed');
        this.updateCurrentSlot(newSlot);
        this.subscriptionId = this.connection.onSlotChange((slotInfo)=>{
            const newSlot = slotInfo.slot;
            if (!this.currentSlot || this.currentSlot < newSlot) {
                if (this.resubTimeoutMs && !this.isUnsubscribing) {
                    this.receivingData = true;
                    clearTimeout(this.timeoutId);
                    this.setTimeout();
                }
                this.updateCurrentSlot(newSlot);
            }
        });
        if (this.resubTimeoutMs) {
            this.receivingData = true;
            this.setTimeout();
        }
    }
    updateCurrentSlot(slot) {
        this.currentSlot = slot;
        this.eventEmitter.emit('newSlot', slot);
    }
    setTimeout() {
        this.timeoutId = setTimeout(async ()=>{
            if (this.isUnsubscribing) {
                // If we are in the process of unsubscribing, do not attempt to resubscribe
                return;
            }
            if (this.receivingData) {
                console.log(`No new slot in ${this.resubTimeoutMs}ms, slot subscriber resubscribing`);
                await this.unsubscribe(true);
                this.receivingData = false;
                await this.subscribe();
            }
        }, this.resubTimeoutMs);
    }
    getSlot() {
        return this.currentSlot;
    }
    async unsubscribe(onResub = false) {
        if (!onResub) {
            this.resubTimeoutMs = undefined;
        }
        this.isUnsubscribing = true;
        clearTimeout(this.timeoutId);
        this.timeoutId = undefined;
        if (this.subscriptionId != null) {
            await this.connection.removeSlotChangeListener(this.subscriptionId);
            this.subscriptionId = undefined;
            this.isUnsubscribing = false;
        } else {
            this.isUnsubscribing = false;
        }
    }
}
exports.SlotSubscriber = SlotSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/slot/SlothashSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SlothashSubscriber = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const bytes_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/cjs/utils/bytes/index.js [app-route] (ecmascript)");
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
class SlothashSubscriber {
    constructor(connection, config){
        var _a;
        this.connection = connection;
        this.isUnsubscribing = false;
        this.receivingData = false;
        this.resubTimeoutMs = config === null || config === void 0 ? void 0 : config.resubTimeoutMs;
        this.commitment = (_a = config === null || config === void 0 ? void 0 : config.commitment) !== null && _a !== void 0 ? _a : 'processed';
        if (this.resubTimeoutMs < 1000) {
            console.log('resubTimeoutMs should be at least 1000ms to avoid spamming resub');
        }
    }
    async subscribe() {
        if (this.subscriptionId != null) {
            return;
        }
        const currentAccountData = await this.connection.getAccountInfo(web3_js_1.SYSVAR_SLOT_HASHES_PUBKEY, this.commitment);
        if (currentAccountData == null) {
            throw new Error('Failed to retrieve current slot hash');
        }
        this.currentSlothash = deserializeSlothash(currentAccountData.data);
        this.subscriptionId = this.connection.onAccountChange(web3_js_1.SYSVAR_SLOT_HASHES_PUBKEY, (slothashInfo, context)=>{
            if (!this.currentSlothash || this.currentSlothash.slot < context.slot) {
                if (this.resubTimeoutMs && !this.isUnsubscribing) {
                    this.receivingData = true;
                    clearTimeout(this.timeoutId);
                    this.setTimeout();
                }
                this.currentSlothash = deserializeSlothash(slothashInfo.data);
            }
        }, this.commitment);
        if (this.resubTimeoutMs) {
            this.receivingData = true;
            this.setTimeout();
        }
    }
    setTimeout() {
        this.timeoutId = setTimeout(async ()=>{
            if (this.isUnsubscribing) {
                // If we are in the process of unsubscribing, do not attempt to resubscribe
                return;
            }
            if (this.receivingData) {
                console.log(`No new slot in ${this.resubTimeoutMs}ms, slot subscriber resubscribing`);
                await this.unsubscribe(true);
                this.receivingData = false;
                await this.subscribe();
            }
        }, this.resubTimeoutMs);
    }
    getSlothash() {
        return this.currentSlothash;
    }
    async unsubscribe(onResub = false) {
        if (!onResub) {
            this.resubTimeoutMs = undefined;
        }
        this.isUnsubscribing = true;
        clearTimeout(this.timeoutId);
        this.timeoutId = undefined;
        if (this.subscriptionId != null) {
            await this.connection.removeSlotChangeListener(this.subscriptionId);
            this.subscriptionId = undefined;
            this.isUnsubscribing = false;
        } else {
            this.isUnsubscribing = false;
        }
    }
}
exports.SlothashSubscriber = SlothashSubscriber;
function deserializeSlothash(data) {
    const slotNumber = new anchor_1.BN(data.subarray(8, 16), 10, 'le');
    const hash = bytes_1.bs58.encode(data.subarray(16, 48));
    return {
        slot: slotNumber.toNumber(),
        hash
    };
}
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/keypair.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadKeypair = void 0;
const fs_1 = __importDefault(__turbopack_context__.r("[externals]/fs [external] (fs, cjs)"));
const bs58_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/bs58@4.0.1/node_modules/bs58/index.js [app-route] (ecmascript)"));
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
function loadKeypair(privateKey) {
    // try to load privateKey as a filepath
    let loadedKey;
    if (fs_1.default.existsSync(privateKey)) {
        privateKey = fs_1.default.readFileSync(privateKey).toString();
    }
    if (privateKey.includes('[') && privateKey.includes(']')) {
        loadedKey = Uint8Array.from(JSON.parse(privateKey));
    } else if (privateKey.includes(',')) {
        loadedKey = Uint8Array.from(privateKey.split(',').map((val)=>Number(val)));
    } else {
        privateKey = privateKey.replace(/\s/g, '');
        loadedKey = new Uint8Array(bs58_1.default.decode(privateKey));
    }
    return web3_js_1.Keypair.fromSecretKey(Uint8Array.from(loadedKey));
}
exports.loadKeypair = loadKeypair;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/serum/serumSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SerumSubscriber = void 0;
const serum_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/index.js [app-route] (ecmascript)");
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
class SerumSubscriber {
    constructor(config){
        this.connection = config.connection;
        this.programId = config.programId;
        this.marketAddress = config.marketAddress;
        if (config.accountSubscription.type === 'polling') {
            this.subscriptionType = 'polling';
            this.accountLoader = config.accountSubscription.accountLoader;
        } else {
            this.subscriptionType = 'websocket';
        }
    }
    async subscribe() {
        if (this.subscribed) {
            return;
        }
        this.market = await serum_1.Market.load(this.connection, this.marketAddress, undefined, this.programId);
        this.asksAddress = this.market.asksAddress;
        this.asks = await this.market.loadAsks(this.connection);
        if (this.subscriptionType === 'websocket') {
            this.asksCallbackId = this.connection.onAccountChange(this.asksAddress, (accountInfo, ctx)=>{
                this.lastAsksSlot = ctx.slot;
                this.asks = serum_1.Orderbook.decode(this.market, accountInfo.data);
            });
        } else {
            this.asksCallbackId = await this.accountLoader.addAccount(this.asksAddress, (buffer, slot)=>{
                this.lastAsksSlot = slot;
                this.asks = serum_1.Orderbook.decode(this.market, buffer);
            });
        }
        this.bidsAddress = this.market.bidsAddress;
        this.bids = await this.market.loadBids(this.connection);
        if (this.subscriptionType === 'websocket') {
            this.bidsCallbackId = this.connection.onAccountChange(this.bidsAddress, (accountInfo, ctx)=>{
                this.lastBidsSlot = ctx.slot;
                this.bids = serum_1.Orderbook.decode(this.market, accountInfo.data);
            });
        } else {
            this.bidsCallbackId = await this.accountLoader.addAccount(this.bidsAddress, (buffer, slot)=>{
                this.lastBidsSlot = slot;
                this.bids = serum_1.Orderbook.decode(this.market, buffer);
            });
        }
        this.subscribed = true;
    }
    getBestBid() {
        const bestBid = this.bids.getL2(1)[0];
        if (!bestBid) {
            return undefined;
        }
        return new anchor_1.BN(bestBid[0] * numericConstants_1.PRICE_PRECISION.toNumber());
    }
    getBestAsk() {
        const bestAsk = this.asks.getL2(1)[0];
        if (!bestAsk) {
            return undefined;
        }
        return new anchor_1.BN(bestAsk[0] * numericConstants_1.PRICE_PRECISION.toNumber());
    }
    getL2Bids() {
        return this.getL2Levels('bids');
    }
    getL2Asks() {
        return this.getL2Levels('asks');
    }
    *getL2Levels(side) {
        // @ts-ignore
        const basePrecision = Math.pow(10, this.market._baseSplTokenDecimals);
        const pricePrecision = numericConstants_1.PRICE_PRECISION.toNumber();
        for (const { price: priceNum, size: sizeNum } of this[side].items(side === 'bids')){
            const price = new anchor_1.BN(priceNum * pricePrecision);
            const size = new anchor_1.BN(sizeNum * basePrecision);
            yield {
                price,
                size,
                sources: {
                    serum: size
                }
            };
        }
    }
    async unsubscribe() {
        if (!this.subscribed) {
            return;
        }
        // remove listeners
        if (this.subscriptionType === 'websocket') {
            await this.connection.removeAccountChangeListener(this.asksCallbackId);
            await this.connection.removeAccountChangeListener(this.bidsCallbackId);
        } else {
            this.accountLoader.removeAccount(this.asksAddress, this.asksCallbackId);
            this.accountLoader.removeAccount(this.bidsAddress, this.bidsCallbackId);
        }
        this.subscribed = false;
    }
}
exports.SerumSubscriber = SerumSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/serum/serumFulfillmentConfigMap.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SerumFulfillmentConfigMap = void 0;
class SerumFulfillmentConfigMap {
    constructor(driftClient){
        this.map = new Map();
        this.driftClient = driftClient;
    }
    async add(marketIndex, serumMarketAddress) {
        const account = await this.driftClient.getSerumV3FulfillmentConfig(serumMarketAddress);
        this.map.set(marketIndex, account);
    }
    get(marketIndex) {
        return this.map.get(marketIndex);
    }
}
exports.SerumFulfillmentConfigMap = SerumFulfillmentConfigMap;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/phoenix/phoenixSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PhoenixSubscriber = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const phoenix_sdk_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@ellipsis-labs+phoenix-sdk@1.4.5_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@ellipsis-labs/phoenix-sdk/dist/index.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const phoenix_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/decode/phoenix.js [app-route] (ecmascript)");
class PhoenixSubscriber {
    constructor(config){
        var _a;
        this.connection = config.connection;
        this.programId = config.programId;
        this.marketAddress = config.marketAddress;
        if (config.accountSubscription.type === 'polling') {
            this.subscriptionType = 'polling';
            this.accountLoader = config.accountSubscription.accountLoader;
        } else {
            this.subscriptionType = 'websocket';
        }
        this.lastSlot = 0;
        this.lastUnixTimestamp = 0;
        this.fastDecode = (_a = config.fastDecode) !== null && _a !== void 0 ? _a : true;
    }
    async subscribe() {
        if (this.subscribed) {
            return;
        }
        this.market = await phoenix_sdk_1.Market.loadFromAddress({
            connection: this.connection,
            address: this.marketAddress
        });
        const clock = (0, phoenix_sdk_1.deserializeClockData)((await this.connection.getAccountInfo(web3_js_1.SYSVAR_CLOCK_PUBKEY, 'confirmed')).data);
        this.lastUnixTimestamp = (0, phoenix_sdk_1.toNum)(clock.unixTimestamp);
        if (this.subscriptionType === 'websocket') {
            this.marketCallbackId = this.connection.onAccountChange(this.marketAddress, (accountInfo, _ctx)=>{
                try {
                    if (this.fastDecode) {
                        this.market.data = (0, phoenix_1.fastDecode)(accountInfo.data);
                    } else {
                        this.market = this.market.reload(accountInfo.data);
                    }
                } catch  {
                    console.error('Failed to reload Phoenix market data');
                }
            });
            this.clockCallbackId = this.connection.onAccountChange(web3_js_1.SYSVAR_CLOCK_PUBKEY, (accountInfo, ctx)=>{
                try {
                    this.lastSlot = ctx.slot;
                    const clock = (0, phoenix_sdk_1.deserializeClockData)(accountInfo.data);
                    this.lastUnixTimestamp = (0, phoenix_sdk_1.toNum)(clock.unixTimestamp);
                } catch  {
                    console.error('Failed to reload clock data');
                }
            });
        } else {
            this.marketCallbackId = await this.accountLoader.addAccount(this.marketAddress, (buffer, slot)=>{
                try {
                    this.lastSlot = slot;
                    if (buffer) {
                        if (this.fastDecode) {
                            this.market.data = (0, phoenix_1.fastDecode)(buffer);
                        } else {
                            this.market = this.market.reload(buffer);
                        }
                    }
                } catch  {
                    console.error('Failed to reload Phoenix market data');
                }
            });
            this.clockCallbackId = await this.accountLoader.addAccount(web3_js_1.SYSVAR_CLOCK_PUBKEY, (buffer, slot)=>{
                try {
                    this.lastSlot = slot;
                    const clock = (0, phoenix_sdk_1.deserializeClockData)(buffer);
                    this.lastUnixTimestamp = (0, phoenix_sdk_1.toNum)(clock.unixTimestamp);
                } catch  {
                    console.error('Failed to reload clock data');
                }
            });
        }
        this.subscribed = true;
    }
    getBestBid() {
        const ladder = (0, phoenix_sdk_1.getMarketLadder)(this.market, this.lastSlot, this.lastUnixTimestamp, 1);
        const bestBid = ladder.bids[0];
        if (!bestBid) {
            return undefined;
        }
        return this.convertPriceInTicksToPricePrecision(bestBid.priceInTicks);
    }
    getBestAsk() {
        const ladder = (0, phoenix_sdk_1.getMarketLadder)(this.market, this.lastSlot, this.lastUnixTimestamp, 1);
        const bestAsk = ladder.asks[0];
        if (!bestAsk) {
            return undefined;
        }
        return this.convertPriceInTicksToPricePrecision(bestAsk.priceInTicks);
    }
    convertPriceInTicksToPricePrecision(priceInTicks) {
        const quotePrecision = new anchor_1.BN(Math.pow(10, this.market.data.header.quoteParams.decimals));
        const denom = quotePrecision.muln(this.market.data.header.rawBaseUnitsPerBaseUnit);
        const price = priceInTicks.muln(this.market.data.quoteLotsPerBaseUnitPerTick).muln((0, phoenix_sdk_1.toNum)(this.market.data.header.quoteLotSize));
        return price.mul(numericConstants_1.PRICE_PRECISION).div(denom);
    }
    convertSizeInBaseLotsToMarketPrecision(sizeInBaseLots) {
        return sizeInBaseLots.muln((0, phoenix_sdk_1.toNum)(this.market.data.header.baseLotSize));
    }
    getL2Bids() {
        return this.getL2Levels('bids');
    }
    getL2Asks() {
        return this.getL2Levels('asks');
    }
    *getL2Levels(side) {
        const ladder = (0, phoenix_sdk_1.getMarketLadder)(this.market, this.lastSlot, this.lastUnixTimestamp, 20);
        for(let i = 0; i < ladder[side].length; i++){
            const { priceInTicks, sizeInBaseLots } = ladder[side][i];
            try {
                const size = this.convertSizeInBaseLotsToMarketPrecision(sizeInBaseLots);
                const updatedPrice = this.convertPriceInTicksToPricePrecision(priceInTicks);
                yield {
                    price: updatedPrice,
                    size,
                    sources: {
                        phoenix: size
                    }
                };
            } catch  {
                continue;
            }
        }
    }
    async unsubscribe() {
        if (!this.subscribed) {
            return;
        }
        // remove listeners
        if (this.subscriptionType === 'websocket') {
            await this.connection.removeAccountChangeListener(this.marketCallbackId);
            await this.connection.removeAccountChangeListener(this.clockCallbackId);
        } else {
            this.accountLoader.removeAccount(this.marketAddress, this.marketCallbackId);
            this.accountLoader.removeAccount(web3_js_1.SYSVAR_CLOCK_PUBKEY, this.clockCallbackId);
        }
        this.subscribed = false;
    }
}
exports.PhoenixSubscriber = PhoenixSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/phoenix/phoenixFulfillmentConfigMap.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PhoenixFulfillmentConfigMap = void 0;
class PhoenixFulfillmentConfigMap {
    constructor(driftClient){
        this.map = new Map();
        this.driftClient = driftClient;
    }
    async add(marketIndex, phoenixMarketAddress) {
        const account = await this.driftClient.getPhoenixV1FulfillmentConfig(phoenixMarketAddress);
        this.map.set(marketIndex, account);
    }
    get(marketIndex) {
        return this.map.get(marketIndex);
    }
}
exports.PhoenixFulfillmentConfigMap = PhoenixFulfillmentConfigMap;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/averageOverSlotsStrategy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AverageOverSlotsStrategy = void 0;
class AverageOverSlotsStrategy {
    calculate(samples) {
        if (samples.length === 0) {
            return 0;
        }
        let runningSumFees = 0;
        for(let i = 0; i < samples.length; i++){
            runningSumFees += samples[i].prioritizationFee;
        }
        return runningSumFees / samples.length;
    }
}
exports.AverageOverSlotsStrategy = AverageOverSlotsStrategy;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/averageStrategy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AverageStrategy = void 0;
class AverageStrategy {
    calculate(samples) {
        return samples.reduce((a, b)=>{
            return a + b.prioritizationFee;
        }, 0) / samples.length;
    }
}
exports.AverageStrategy = AverageStrategy;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/ewmaStrategy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EwmaStrategy = void 0;
class EwmaStrategy {
    /**
     * @param halfLife The half life of the EWMA in slots. Default is 25 slots, approx 10 seconds.
     */ constructor(halfLife = 25){
        this.halfLife = halfLife;
    }
    // samples provided in desc slot order
    calculate(samples) {
        if (samples.length === 0) {
            return 0;
        }
        if (samples.length === 1) {
            return samples[0].prioritizationFee;
        }
        let ewma = 0;
        const samplesReversed = samples.slice().reverse();
        for(let i = 0; i < samplesReversed.length; i++){
            if (i === 0) {
                ewma = samplesReversed[i].prioritizationFee;
                continue;
            }
            const gap = samplesReversed[i].slot - samplesReversed[i - 1].slot;
            const alpha = 1 - Math.exp(Math.log(0.5) / this.halfLife * gap);
            ewma = alpha * samplesReversed[i].prioritizationFee + (1 - alpha) * ewma;
        }
        return ewma;
    }
}
exports.EwmaStrategy = EwmaStrategy;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/maxOverSlotsStrategy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MaxOverSlotsStrategy = void 0;
class MaxOverSlotsStrategy {
    calculate(samples) {
        if (samples.length === 0) {
            return 0;
        }
        // Assuming samples are sorted in descending order of slot.
        let currMaxFee = samples[0].prioritizationFee;
        for(let i = 0; i < samples.length; i++){
            currMaxFee = Math.max(samples[i].prioritizationFee, currMaxFee);
        }
        return currMaxFee;
    }
}
exports.MaxOverSlotsStrategy = MaxOverSlotsStrategy;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/maxStrategy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MaxStrategy = void 0;
class MaxStrategy {
    calculate(samples) {
        return Math.max(...samples.map((result)=>result.prioritizationFee));
    }
}
exports.MaxStrategy = MaxStrategy;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/types.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PriorityFeeMethod = exports.DEFAULT_PRIORITY_FEE_MAP_FREQUENCY_MS = void 0;
exports.DEFAULT_PRIORITY_FEE_MAP_FREQUENCY_MS = 10000;
var PriorityFeeMethod;
(function(PriorityFeeMethod) {
    PriorityFeeMethod["SOLANA"] = "solana";
    PriorityFeeMethod["HELIUS"] = "helius";
    PriorityFeeMethod["DRIFT"] = "drift";
})(PriorityFeeMethod || (exports.PriorityFeeMethod = PriorityFeeMethod = {}));
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/solanaPriorityFeeMethod.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchSolanaPriorityFee = void 0;
async function fetchSolanaPriorityFee(connection, lookbackDistance, addresses) {
    try {
        // @ts-ignore
        const rpcJSONResponse = await connection._rpcRequest('getRecentPrioritizationFees', [
            addresses
        ]);
        const results = rpcJSONResponse === null || rpcJSONResponse === void 0 ? void 0 : rpcJSONResponse.result;
        if (!results.length) return;
        // Sort and filter results based on the slot lookback setting
        const descResults = results.sort((a, b)=>b.slot - a.slot);
        const cutoffSlot = descResults[0].slot - lookbackDistance;
        return descResults.filter((result)=>result.slot >= cutoffSlot);
    } catch (err) {
        console.error(err);
    }
    return [];
}
exports.fetchSolanaPriorityFee = fetchSolanaPriorityFee;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/heliusPriorityFeeMethod.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchHeliusPriorityFee = exports.HeliusPriorityLevel = void 0;
const node_fetch_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/node-fetch@2.7.0/node_modules/node-fetch/lib/index.mjs [app-route] (ecmascript)"));
var HeliusPriorityLevel;
(function(HeliusPriorityLevel) {
    HeliusPriorityLevel["MIN"] = "min";
    HeliusPriorityLevel["LOW"] = "low";
    HeliusPriorityLevel["MEDIUM"] = "medium";
    HeliusPriorityLevel["HIGH"] = "high";
    HeliusPriorityLevel["VERY_HIGH"] = "veryHigh";
    HeliusPriorityLevel["UNSAFE_MAX"] = "unsafeMax";
})(HeliusPriorityLevel || (exports.HeliusPriorityLevel = HeliusPriorityLevel = {}));
/// Fetches the priority fee from the Helius API
/// https://docs.helius.dev/solana-rpc-nodes/alpha-priority-fee-api
async function fetchHeliusPriorityFee(heliusRpcUrl, lookbackDistance, addresses) {
    try {
        const response = await (0, node_fetch_1.default)(heliusRpcUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: '1',
                method: 'getPriorityFeeEstimate',
                params: [
                    {
                        accountKeys: addresses,
                        options: {
                            includeAllPriorityFeeLevels: true,
                            lookbackSlots: lookbackDistance
                        }
                    }
                ]
            })
        });
        return await response.json();
    } catch (err) {
        console.error(err);
    }
    return undefined;
}
exports.fetchHeliusPriorityFee = fetchHeliusPriorityFee;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/driftPriorityFeeMethod.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchDriftPriorityFee = void 0;
const node_fetch_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/node-fetch@2.7.0/node_modules/node-fetch/lib/index.mjs [app-route] (ecmascript)"));
async function fetchDriftPriorityFee(url, marketTypes, marketIndexes) {
    try {
        const response = await (0, node_fetch_1.default)(`${url}/batchPriorityFees?marketType=${marketTypes.join(',')}&marketIndex=${marketIndexes.join(',')}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (err) {
        if (err instanceof Error) {
            console.error('Error fetching priority fees:', err.message);
        } else {
            console.error('Unknown error fetching priority fees:', err);
        }
    }
    return [];
}
exports.fetchDriftPriorityFee = fetchDriftPriorityFee;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/priorityFeeSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PriorityFeeSubscriber = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/types.js [app-route] (ecmascript)");
const averageOverSlotsStrategy_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/averageOverSlotsStrategy.js [app-route] (ecmascript)");
const maxOverSlotsStrategy_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/maxOverSlotsStrategy.js [app-route] (ecmascript)");
const solanaPriorityFeeMethod_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/solanaPriorityFeeMethod.js [app-route] (ecmascript)");
const heliusPriorityFeeMethod_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/heliusPriorityFeeMethod.js [app-route] (ecmascript)");
const driftPriorityFeeMethod_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/driftPriorityFeeMethod.js [app-route] (ecmascript)");
class PriorityFeeSubscriber {
    constructor(config){
        var _a, _b, _c;
        this.averageStrategy = new averageOverSlotsStrategy_1.AverageOverSlotsStrategy();
        this.maxStrategy = new maxOverSlotsStrategy_1.MaxOverSlotsStrategy();
        this.priorityFeeMethod = types_1.PriorityFeeMethod.SOLANA;
        this.latestPriorityFee = 0;
        this.lastCustomStrategyResult = 0;
        this.lastAvgStrategyResult = 0;
        this.lastMaxStrategyResult = 0;
        this.lastSlotSeen = 0;
        this.connection = config.connection;
        this.frequencyMs = (_a = config.frequencyMs) !== null && _a !== void 0 ? _a : types_1.DEFAULT_PRIORITY_FEE_MAP_FREQUENCY_MS;
        this.addresses = config.addresses ? config.addresses.map((address)=>address.toBase58()) : [];
        this.driftMarkets = config.driftMarkets;
        if (config.customStrategy) {
            this.customStrategy = config.customStrategy;
        } else {
            this.customStrategy = this.averageStrategy;
        }
        this.lookbackDistance = (_b = config.slotsToCheck) !== null && _b !== void 0 ? _b : 50;
        if (config.priorityFeeMethod) {
            this.priorityFeeMethod = config.priorityFeeMethod;
            if (this.priorityFeeMethod === types_1.PriorityFeeMethod.HELIUS) {
                if (config.heliusRpcUrl === undefined) {
                    if (this.connection.rpcEndpoint.includes('helius')) {
                        this.heliusRpcUrl = this.connection.rpcEndpoint;
                    } else {
                        throw new Error('Connection must be helius, or heliusRpcUrl must be provided to use PriorityFeeMethod.HELIUS');
                    }
                } else {
                    this.heliusRpcUrl = config.heliusRpcUrl;
                }
            } else if (this.priorityFeeMethod === types_1.PriorityFeeMethod.DRIFT) {
                this.driftPriorityFeeEndpoint = config.driftPriorityFeeEndpoint;
            }
        }
        if (this.priorityFeeMethod === types_1.PriorityFeeMethod.SOLANA) {
            if (this.connection === undefined) {
                throw new Error('connection must be provided to use SOLANA priority fee API');
            }
        }
        this.maxFeeMicroLamports = config.maxFeeMicroLamports;
        this.priorityFeeMultiplier = (_c = config.priorityFeeMultiplier) !== null && _c !== void 0 ? _c : 1.0;
    }
    async subscribe() {
        if (this.intervalId) {
            return;
        }
        this.intervalId = setInterval(this.load.bind(this), this.frequencyMs); // we set the intervalId first, preventing a side effect of unsubscribing failing during the race condition where unsubscribes happens before subscribe is finished
        await this.load();
    }
    async loadForSolana() {
        const samples = await (0, solanaPriorityFeeMethod_1.fetchSolanaPriorityFee)(this.connection, this.lookbackDistance, this.addresses);
        if (samples.length > 0) {
            this.latestPriorityFee = samples[0].prioritizationFee;
            this.lastSlotSeen = samples[0].slot;
            this.lastAvgStrategyResult = this.averageStrategy.calculate(samples);
            this.lastMaxStrategyResult = this.maxStrategy.calculate(samples);
            if (this.customStrategy) {
                this.lastCustomStrategyResult = this.customStrategy.calculate(samples);
            }
        }
    }
    async loadForHelius() {
        var _a, _b;
        const sample = await (0, heliusPriorityFeeMethod_1.fetchHeliusPriorityFee)(this.heliusRpcUrl, this.lookbackDistance, this.addresses);
        this.lastHeliusSample = (_b = (_a = sample === null || sample === void 0 ? void 0 : sample.result) === null || _a === void 0 ? void 0 : _a.priorityFeeLevels) !== null && _b !== void 0 ? _b : undefined;
        if (this.lastHeliusSample) {
            this.lastAvgStrategyResult = this.lastHeliusSample[heliusPriorityFeeMethod_1.HeliusPriorityLevel.MEDIUM];
            this.lastMaxStrategyResult = this.lastHeliusSample[heliusPriorityFeeMethod_1.HeliusPriorityLevel.UNSAFE_MAX];
            if (this.customStrategy) {
                this.lastCustomStrategyResult = this.customStrategy.calculate(sample);
            }
        }
    }
    async loadForDrift() {
        if (!this.driftMarkets) {
            return;
        }
        const sample = await (0, driftPriorityFeeMethod_1.fetchDriftPriorityFee)(this.driftPriorityFeeEndpoint, this.driftMarkets.map((m)=>m.marketType), this.driftMarkets.map((m)=>m.marketIndex));
        if (sample.length > 0) {
            this.lastAvgStrategyResult = sample[heliusPriorityFeeMethod_1.HeliusPriorityLevel.MEDIUM];
            this.lastMaxStrategyResult = sample[heliusPriorityFeeMethod_1.HeliusPriorityLevel.UNSAFE_MAX];
            if (this.customStrategy) {
                this.lastCustomStrategyResult = this.customStrategy.calculate(sample);
            }
        }
    }
    getMaxPriorityFee() {
        return this.maxFeeMicroLamports;
    }
    updateMaxPriorityFee(newMaxFee) {
        this.maxFeeMicroLamports = newMaxFee;
    }
    getPriorityFeeMultiplier() {
        var _a;
        return (_a = this.priorityFeeMultiplier) !== null && _a !== void 0 ? _a : 1.0;
    }
    updatePriorityFeeMultiplier(newPriorityFeeMultiplier) {
        this.priorityFeeMultiplier = newPriorityFeeMultiplier;
    }
    updateCustomStrategy(newStrategy) {
        this.customStrategy = newStrategy;
    }
    getHeliusPriorityFeeLevel(level = heliusPriorityFeeMethod_1.HeliusPriorityLevel.MEDIUM) {
        if (this.lastHeliusSample === undefined) {
            return 0;
        }
        if (this.maxFeeMicroLamports !== undefined) {
            return Math.min(this.maxFeeMicroLamports, this.lastHeliusSample[level]);
        }
        return this.lastHeliusSample[level];
    }
    getCustomStrategyResult() {
        const result = this.lastCustomStrategyResult * this.getPriorityFeeMultiplier();
        if (this.maxFeeMicroLamports !== undefined) {
            return Math.min(this.maxFeeMicroLamports, result);
        }
        return result;
    }
    getAvgStrategyResult() {
        const result = this.lastAvgStrategyResult * this.getPriorityFeeMultiplier();
        if (this.maxFeeMicroLamports !== undefined) {
            return Math.min(this.maxFeeMicroLamports, result);
        }
        return result;
    }
    getMaxStrategyResult() {
        const result = this.lastMaxStrategyResult * this.getPriorityFeeMultiplier();
        if (this.maxFeeMicroLamports !== undefined) {
            return Math.min(this.maxFeeMicroLamports, result);
        }
        return result;
    }
    async load() {
        try {
            if (this.priorityFeeMethod === types_1.PriorityFeeMethod.SOLANA) {
                await this.loadForSolana();
            } else if (this.priorityFeeMethod === types_1.PriorityFeeMethod.HELIUS) {
                await this.loadForHelius();
            } else if (this.priorityFeeMethod === types_1.PriorityFeeMethod.DRIFT) {
                await this.loadForDrift();
            } else {
                throw new Error(`${this.priorityFeeMethod} load not implemented`);
            }
        } catch (err) {
            const e = err;
            console.error(`Error loading priority fee ${this.priorityFeeMethod}: ${e.message}\n${e.stack ? e.stack : ''}`);
            return;
        }
    }
    async unsubscribe() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
    }
    updateAddresses(addresses) {
        this.addresses = addresses.map((k)=>k.toBase58());
    }
    updateMarketTypeAndIndex(driftMarkets) {
        this.driftMarkets = driftMarkets;
    }
}
exports.PriorityFeeSubscriber = PriorityFeeSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/priorityFeeSubscriberMap.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PriorityFeeSubscriberMap = void 0;
const driftPriorityFeeMethod_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/driftPriorityFeeMethod.js [app-route] (ecmascript)");
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/types.js [app-route] (ecmascript)");
/**
 * takes advantage of /batchPriorityFees endpoint from drift hosted priority fee service
 */ class PriorityFeeSubscriberMap {
    constructor(config){
        var _a;
        this.frequencyMs = config.frequencyMs;
        this.frequencyMs = (_a = config.frequencyMs) !== null && _a !== void 0 ? _a : types_1.DEFAULT_PRIORITY_FEE_MAP_FREQUENCY_MS;
        this.driftPriorityFeeEndpoint = config.driftPriorityFeeEndpoint;
        this.driftMarkets = config.driftMarkets;
        this.feesMap = new Map();
        this.feesMap.set('perp', new Map());
        this.feesMap.set('spot', new Map());
    }
    updateFeesMap(driftPriorityFeeResponse) {
        driftPriorityFeeResponse.forEach((fee)=>{
            this.feesMap.get(fee.marketType).set(fee.marketIndex, fee);
        });
    }
    async subscribe() {
        if (this.intervalId) {
            return;
        }
        await this.load();
        this.intervalId = setInterval(this.load.bind(this), this.frequencyMs);
    }
    async unsubscribe() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
    }
    async load() {
        try {
            if (!this.driftMarkets) {
                return;
            }
            const fees = await (0, driftPriorityFeeMethod_1.fetchDriftPriorityFee)(this.driftPriorityFeeEndpoint, this.driftMarkets.map((m)=>m.marketType), this.driftMarkets.map((m)=>m.marketIndex));
            this.updateFeesMap(fees);
        } catch (e) {
            console.error('Error fetching drift priority fees', e);
        }
    }
    updateMarketTypeAndIndex(driftMarkets) {
        this.driftMarkets = driftMarkets;
    }
    getPriorityFees(marketType, marketIndex) {
        var _a;
        return (_a = this.feesMap.get(marketType)) === null || _a === void 0 ? void 0 : _a.get(marketIndex);
    }
}
exports.PriorityFeeSubscriberMap = PriorityFeeSubscriberMap; /** Example usage:
async function main() {
    const driftMarkets: DriftMarketInfo[] = [
        { marketType: 'perp', marketIndex: 0 },
        { marketType: 'perp', marketIndex: 1 },
        { marketType: 'spot', marketIndex: 2 }
    ];

    const subscriber = new PriorityFeeSubscriberMap({
        driftPriorityFeeEndpoint: 'https://dlob.drift.trade',
        frequencyMs: 5000,
        driftMarkets
    });
    await subscriber.subscribe();

    for (let i = 0; i < 20; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        driftMarkets.forEach(market => {
            const fees = subscriber.getPriorityFees(market.marketType, market.marketIndex);
            console.log(`Priority fees for ${market.marketType} market ${market.marketIndex}:`, fees);
        });
    }


    await subscriber.unsubscribe();
}

main().catch(console.error);
*/ 
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/averageOverSlotsStrategy.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/averageStrategy.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/ewmaStrategy.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/maxOverSlotsStrategy.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/maxStrategy.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/priorityFeeSubscriber.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/priorityFeeSubscriberMap.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/solanaPriorityFeeMethod.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/heliusPriorityFeeMethod.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/driftPriorityFeeMethod.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/types.js [app-route] (ecmascript)"), exports);
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/openbook/openbookV2Subscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OpenbookV2Subscriber = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const openbook_v2_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/index.js [app-route] (ecmascript)");
const openbook_json_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/idl/openbook.json (json)"));
class OpenbookV2Subscriber {
    constructor(config){
        this.connection = config.connection;
        this.programId = config.programId;
        this.marketAddress = config.marketAddress;
        this.subscribed = false;
        if (config.accountSubscription.type === 'polling') {
            this.subscriptionType = 'polling';
            this.accountLoader = config.accountSubscription.accountLoader;
        } else {
            this.subscriptionType = 'websocket';
        }
    }
    async subscribe() {
        if (this.subscribed === true) {
            return;
        }
        const anchorProvider = new anchor_1.AnchorProvider(this.connection, new anchor_1.Wallet(web3_js_1.Keypair.generate()), {});
        const openbookV2Program = new anchor_1.Program(openbook_json_1.default, this.programId, anchorProvider);
        this.client = new openbook_v2_1.OpenBookV2Client(anchorProvider);
        const market = await openbook_v2_1.Market.load(this.client, this.marketAddress);
        this.market = await market.loadOrderBook();
        if (this.subscriptionType === 'websocket') {
            this.marketCallbackId = this.connection.onAccountChange(this.marketAddress, async (accountInfo, _)=>{
                const marketRaw = openbookV2Program.coder.accounts.decode('Market', accountInfo.data);
                const market = new openbook_v2_1.Market(this.client, this.marketAddress, marketRaw);
                await market.loadOrderBook();
                this.market = market;
            });
        } else {
            this.marketCallbackId = await this.accountLoader.addAccount(this.marketAddress, async (buffer, _)=>{
                const marketRaw = openbookV2Program.coder.accounts.decode('Market', buffer);
                const market = new openbook_v2_1.Market(this.client, this.marketAddress, marketRaw);
                await market.loadOrderBook();
                this.market = market;
            });
        }
        this.subscribed = true;
    }
    getBestBid() {
        var _a;
        const bestBid = (_a = this.market.bids) === null || _a === void 0 ? void 0 : _a.best();
        if (bestBid === undefined) {
            return undefined;
        }
        return this.convertPriceInLotsToPricePrecision(bestBid.priceLots);
    }
    getBestAsk() {
        var _a;
        const bestAsk = (_a = this.market.asks) === null || _a === void 0 ? void 0 : _a.best();
        if (bestAsk === undefined) {
            return undefined;
        }
        return this.convertPriceInLotsToPricePrecision(bestAsk.priceLots);
    }
    getL2Bids() {
        return this.getL2Levels('bids');
    }
    getL2Asks() {
        return this.getL2Levels('asks');
    }
    convertSizeInBaseLotsToMarketPrecision(sizeInLots) {
        return sizeInLots.mul(this.market.account.baseLotSize);
    }
    convertPriceInLotsToPricePrecision(priceInLots) {
        const adjPrice = priceInLots.mul(numericConstants_1.PRICE_PRECISION).muln(10 ** (this.market.account.baseDecimals - this.market.account.quoteDecimals)).mul(this.market.account.quoteLotSize).div(this.market.account.baseLotSize);
        return adjPrice;
    }
    *getL2Levels(side) {
        var _a;
        const levels = side === 'bids' ? this.market.bids : this.market.asks;
        for (const order of (_a = levels === null || levels === void 0 ? void 0 : levels.items()) !== null && _a !== void 0 ? _a : []){
            const size = this.convertSizeInBaseLotsToMarketPrecision(order.sizeLots);
            const price = this.convertPriceInLotsToPricePrecision(order.priceLots);
            yield {
                price,
                size,
                sources: {
                    openbook: size
                }
            };
        }
    }
    async unsubscribe() {
        if (!this.subscribed) {
            return;
        }
        if (this.subscriptionType === 'websocket') {
            await this.connection.removeAccountChangeListener(this.marketCallbackId);
        } else {
            this.accountLoader.removeAccount(this.marketAddress, this.marketCallbackId);
        }
        this.subscribed = false;
    }
}
exports.OpenbookV2Subscriber = OpenbookV2Subscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/openbook/openbookV2FulfillmentConfigMap.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OpenbookV2FulfillmentConfigMap = void 0;
class OpenbookV2FulfillmentConfigMap {
    constructor(driftClient){
        this.map = new Map();
        this.driftClient = driftClient;
    }
    async add(marketIndex, openbookV2MarketAddress) {
        const account = await this.driftClient.getOpenbookV2FulfillmentConfig(openbookV2MarketAddress);
        this.map.set(marketIndex, account);
    }
    get(marketIndex) {
        return this.map.get(marketIndex);
    }
}
exports.OpenbookV2FulfillmentConfigMap = OpenbookV2FulfillmentConfigMap;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/swift/swiftOrderSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SwiftOrderSubscriber = void 0;
const perpMarkets_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/perpMarkets.js [app-route] (ecmascript)");
const pda_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/addresses/pda.js [app-route] (ecmascript)");
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const tweetnacl_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/tweetnacl@1.0.3/node_modules/tweetnacl/nacl-fast.js [app-route] (ecmascript)"));
const tweetnacl_util_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/tweetnacl-util@0.15.1/node_modules/tweetnacl-util/nacl-util.js [app-route] (ecmascript)");
const ws_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/ws@7.5.10/node_modules/ws/index.js [app-route] (ecmascript)"));
const sha256_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@noble+hashes@1.8.0/node_modules/@noble/hashes/sha256.js [app-route] (ecmascript)");
class SwiftOrderSubscriber {
    constructor(config){
        this.config = config;
        this.heartbeatTimeout = null;
        this.heartbeatIntervalMs = 60000;
        this.ws = null;
        this.subscribed = false;
        this.driftClient = config.driftClient;
        this.userAccountGetter = config.userAccountGetter;
    }
    unsubscribe() {
        if (this.subscribed) {
            this.ws.removeAllListeners();
            this.ws.terminate();
            this.ws = null;
            this.subscribed = false;
        }
    }
    getSymbolForMarketIndex(marketIndex) {
        const markets = this.config.driftEnv === 'devnet' ? perpMarkets_1.DevnetPerpMarkets : perpMarkets_1.MainnetPerpMarkets;
        return markets[marketIndex].symbol;
    }
    generateChallengeResponse(nonce) {
        const messageBytes = (0, tweetnacl_util_1.decodeUTF8)(nonce);
        const signature = tweetnacl_1.default.sign.detached(messageBytes, this.config.keypair.secretKey);
        const signatureBase64 = Buffer.from(signature).toString('base64');
        return signatureBase64;
    }
    handleAuthMessage(message) {
        var _a, _b;
        if (message['channel'] === 'auth' && message['nonce'] != null) {
            const signatureBase64 = this.generateChallengeResponse(message['nonce']);
            (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({
                pubkey: this.config.keypair.publicKey.toBase58(),
                signature: signatureBase64
            }));
        }
        if (message['channel'] === 'auth' && ((_b = message['message']) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === 'authenticated') {
            this.subscribed = true;
            this.config.marketIndexes.forEach(async (marketIndex)=>{
                var _a;
                (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({
                    action: 'subscribe',
                    market_type: 'perp',
                    market_name: this.getSymbolForMarketIndex(marketIndex)
                }));
                await new Promise((resolve)=>setTimeout(resolve, 100));
            });
        }
    }
    async subscribe(onOrder, acceptSanitized = false, acceptDepositTrade = false) {
        this.onOrder = onOrder;
        const endpoint = this.config.endpoint || this.config.driftEnv === 'devnet' ? 'wss://master.swift.drift.trade/ws' : 'wss://swift.drift.trade/ws';
        const ws = new ws_1.default(endpoint + '?pubkey=' + this.config.keypair.publicKey.toBase58());
        this.ws = ws;
        ws.on('open', async ()=>{
            console.log('Connected to the server');
            ws.on('message', async (data)=>{
                const message = JSON.parse(data.toString());
                this.startHeartbeatTimer();
                if (message['channel'] === 'auth') {
                    this.handleAuthMessage(message);
                }
                if (message['order']) {
                    const order = message['order'];
                    // ignore likely sanitized orders by default
                    if (order.will_sanitize === true && !acceptSanitized) {
                        return;
                    }
                    // order has a prerequisite deposit tx attached
                    if (message['deposit']) {
                        order.depositTx = message['deposit'];
                        if (!acceptDepositTrade) {
                            return;
                        }
                    }
                    const signedMsgOrderParamsBuf = Buffer.from(order.order_message, 'hex');
                    const isDelegateSigner = signedMsgOrderParamsBuf.slice(0, 8).equals(Uint8Array.from(Buffer.from((0, sha256_1.sha256)('global' + ':' + 'SignedMsgOrderParamsDelegateMessage')).slice(0, 8)));
                    const signedMessage = this.driftClient.decodeSignedMsgOrderParamsMessage(signedMsgOrderParamsBuf, isDelegateSigner);
                    if (!signedMessage.signedMsgOrderParams.price) {
                        console.error(`order has no price: ${JSON.stringify(signedMessage.signedMsgOrderParams)}`);
                        return;
                    }
                    onOrder(order, signedMessage, isDelegateSigner);
                }
            });
            ws.on('close', ()=>{
                console.log('Disconnected from the server');
                this.reconnect();
            });
            ws.on('error', (error)=>{
                console.error('WebSocket error:', error);
                this.reconnect();
            });
        });
        ws.on('unexpected-response', async (request, response)=>{
            console.error('Unexpected response, reconnecting in 5s:', response.statusCode);
            setTimeout(()=>{
                if (this.heartbeatTimeout) clearTimeout(this.heartbeatTimeout);
                this.reconnect();
            }, 5000);
        });
        ws.on('error', async (request, response)=>{
            console.error('WS closed from error, reconnecting in 1s:', response.statusCode);
            setTimeout(()=>{
                if (this.heartbeatTimeout) clearTimeout(this.heartbeatTimeout);
                this.reconnect();
            }, 1000);
        });
    }
    async getPlaceAndMakeSignedMsgOrderIxs(orderMessageRaw, signedMsgOrderParamsMessage, makerOrderParams) {
        if (!this.userAccountGetter) {
            throw new Error('userAccountGetter must be set to use this function');
        }
        const signedMsgOrderParamsBuf = Buffer.from(orderMessageRaw.order_message, 'hex');
        const isDelegateSigner = signedMsgOrderParamsBuf.slice(0, 8).equals(Uint8Array.from(Buffer.from((0, sha256_1.sha256)('global' + ':' + 'SignedMsgOrderParamsDelegateMessage')).slice(0, 8)));
        const signedMessage = this.driftClient.decodeSignedMsgOrderParamsMessage(signedMsgOrderParamsBuf, isDelegateSigner);
        const takerAuthority = new web3_js_1.PublicKey(orderMessageRaw.taker_authority);
        const signingAuthority = new web3_js_1.PublicKey(orderMessageRaw.signing_authority);
        const takerUserPubkey = isDelegateSigner ? signedMessage.takerPubkey : await (0, pda_1.getUserAccountPublicKey)(this.driftClient.program.programId, takerAuthority, signedMessage.subAccountId);
        const takerUserAccount = await this.userAccountGetter.mustGetUserAccount(takerUserPubkey.toString());
        const ixs = await this.driftClient.getPlaceAndMakeSignedMsgPerpOrderIxs({
            orderParams: signedMsgOrderParamsBuf,
            signature: Buffer.from(orderMessageRaw.order_signature, 'base64')
        }, (0, tweetnacl_util_1.decodeUTF8)(orderMessageRaw.uuid), {
            taker: takerUserPubkey,
            takerUserAccount,
            takerStats: (0, pda_1.getUserStatsAccountPublicKey)(this.driftClient.program.programId, takerUserAccount.authority),
            signingAuthority: signingAuthority
        }, Object.assign({}, makerOrderParams, {
            postOnly: types_1.PostOnlyParams.MUST_POST_ONLY,
            immediateOrCancel: true,
            marketType: types_1.MarketType.PERP
        }));
        return ixs;
    }
    startHeartbeatTimer() {
        if (this.heartbeatTimeout) {
            clearTimeout(this.heartbeatTimeout);
        }
        if (!this.onOrder) {
            throw new Error('onOrder callback function must be set');
        }
        this.heartbeatTimeout = setTimeout(()=>{
            console.warn('No heartbeat received within 30 seconds, reconnecting...');
            this.reconnect();
        }, this.heartbeatIntervalMs);
    }
    reconnect() {
        if (this.ws) {
            this.ws.removeAllListeners();
            this.ws.terminate();
        }
        console.log('Reconnecting to WebSocket...');
        setTimeout(()=>{
            this.subscribe(this.onOrder);
        }, 1000);
    }
}
exports.SwiftOrderSubscriber = SwiftOrderSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/swift/signedMsgUserAccountSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SignedMsgUserOrdersAccountSubscriber = void 0;
const memcmp_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/memcmp.js [app-route] (ecmascript)");
const webSocketProgramAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketProgramAccountSubscriber.js [app-route] (ecmascript)");
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
class SignedMsgUserOrdersAccountSubscriber {
    constructor({ driftClient, commitment, resubOpts, decodeFn, resyncIntervalMs }){
        this.signedMsgUserOrderAccounts = new Map();
        this.commitment = commitment !== null && commitment !== void 0 ? commitment : 'confirmed';
        this.resubOpts = resubOpts;
        this.driftClient = driftClient;
        this.decodeFn = decodeFn !== null && decodeFn !== void 0 ? decodeFn : this.driftClient.program.account.signedMsgUserOrders.coder.accounts.decodeUnchecked.bind(this.driftClient.program.account.signedMsgUserOrders.coder.accounts);
        this.resyncIntervalMs = resyncIntervalMs;
        this.eventEmitter = new events_1.EventEmitter();
        this.resubOpts = resubOpts;
    }
    async subscribe() {
        if (!this.subscriber) {
            const filters = [
                (0, memcmp_1.getSignedMsgUserOrdersFilter)()
            ];
            this.subscriber = new webSocketProgramAccountSubscriber_1.WebSocketProgramAccountSubscriber('SingedMsgUserOrdersAccountMap', 'SignedMsgUserOrders', this.driftClient.program, this.decodeFn, {
                filters,
                commitment: this.commitment
            }, this.resubOpts);
        }
        await this.subscriber.subscribe((_accountId, account, context)=>{
            this.tryUpdateSignedMsgUserOrdersAccount(account, 'decoded', context.slot);
        });
        await this.fetch();
        if (this.resyncIntervalMs) {
            const recursiveResync = ()=>{
                this.resyncTimeoutId = setTimeout(()=>{
                    this.fetch().catch((e)=>{
                        console.error('Failed to resync in OrderSubscriber');
                        console.log(e);
                    }).finally(()=>{
                        if (!this.resyncTimeoutId) return;
                        recursiveResync();
                    });
                }, this.resyncIntervalMs);
            };
            recursiveResync();
        }
    }
    async fetch() {
        if (this.fetchPromise) {
            return this.fetchPromise;
        }
        this.fetchPromise = new Promise((resolver)=>{
            this.fetchPromiseResolver = resolver;
        });
        const skipEventEmitting = this.signedMsgUserOrderAccounts.size === 0;
        try {
            const rpcResponseAndContext = await this.driftClient.connection.getProgramAccounts(this.driftClient.program.programId, {
                commitment: this.commitment,
                filters: [
                    (0, memcmp_1.getSignedMsgUserOrdersFilter)()
                ],
                encoding: 'base64',
                withContext: true
            });
            const slot = rpcResponseAndContext.context.slot;
            for (const programAccount of rpcResponseAndContext.value){
                this.tryUpdateSignedMsgUserOrdersAccount(programAccount.account.data, 'buffer', slot, skipEventEmitting);
                await new Promise((resolve)=>setTimeout(resolve, 0));
            }
        } catch (e) {
            console.error(e);
        } finally{
            this.fetchPromiseResolver();
            this.fetchPromise = undefined;
        }
    }
    tryUpdateSignedMsgUserOrdersAccount(data, dataType, slot, skipEventEmitting = false) {
        var _a;
        if (!this.mostRecentSlot || slot > this.mostRecentSlot) {
            this.mostRecentSlot = slot;
        }
        const signedMsgUserOrdersAccount = dataType === 'buffer' ? this.decodeFn('SignedMsgUserOrders', data) : data;
        const key = signedMsgUserOrdersAccount.authorityPubkey.toBase58();
        const slotAndSignedMsgUserOrdersAccount = this.signedMsgUserOrderAccounts.get(key);
        if (!slotAndSignedMsgUserOrdersAccount || slotAndSignedMsgUserOrdersAccount.slot <= slot) {
            if (!skipEventEmitting) {
                this.eventEmitter.emit('onAccountUpdate', signedMsgUserOrdersAccount.signedMsgOrderData.filter((signedMsgOrderId)=>signedMsgOrderId.orderId !== 0), signedMsgUserOrdersAccount.authorityPubkey, slot);
            }
            const existingSignedMsgOrderIds = (_a = slotAndSignedMsgUserOrdersAccount === null || slotAndSignedMsgUserOrdersAccount === void 0 ? void 0 : slotAndSignedMsgUserOrdersAccount.signedMsgUserOrdersAccount.signedMsgOrderData.map((signedMsgOrderId)=>signedMsgOrderId.orderId)) !== null && _a !== void 0 ? _a : [];
            const newSignedMsgOrderIds = signedMsgUserOrdersAccount.signedMsgOrderData.filter((signedMsgOrderId)=>!existingSignedMsgOrderIds.includes(signedMsgOrderId.orderId) && signedMsgOrderId.orderId !== 0);
            if (newSignedMsgOrderIds.length > 0 && !skipEventEmitting) {
                this.eventEmitter.emit('newSignedMsgOrderIds', newSignedMsgOrderIds, signedMsgUserOrdersAccount.authorityPubkey, slot);
            }
            this.signedMsgUserOrderAccounts.set(key, {
                slot,
                signedMsgUserOrdersAccount
            });
        }
    }
    async unsubscribe() {
        if (!this.subscriber) return;
        await this.subscriber.unsubscribe();
        this.subscriber = undefined;
        if (this.resyncTimeoutId !== undefined) {
            clearTimeout(this.resyncTimeoutId);
            this.resyncTimeoutId = undefined;
        }
    }
}
exports.SignedMsgUserOrdersAccountSubscriber = SignedMsgUserOrdersAccountSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/swift/grpcSignedMsgUserAccountSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.grpcSignedMsgUserOrdersAccountSubscriber = void 0;
const grpcProgramAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/grpcProgramAccountSubscriber.js [app-route] (ecmascript)");
const memcmp_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/memcmp.js [app-route] (ecmascript)");
const signedMsgUserAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/swift/signedMsgUserAccountSubscriber.js [app-route] (ecmascript)");
class grpcSignedMsgUserOrdersAccountSubscriber extends signedMsgUserAccountSubscriber_1.SignedMsgUserOrdersAccountSubscriber {
    constructor({ grpcConfigs, driftClient, commitment, resubOpts, decodeFn, resyncIntervalMs }){
        super({
            driftClient,
            commitment,
            resubOpts,
            decodeFn,
            resyncIntervalMs
        });
        this.grpcConfigs = grpcConfigs;
    }
    async subscribe() {
        if (!this.subscriber) {
            this.subscriber = await grpcProgramAccountSubscriber_1.grpcProgramAccountSubscriber.create(this.grpcConfigs, 'SingedMsgUserOrdersAccountMap', 'SignedMsgUserOrders', this.driftClient.program, this.decodeFn, {
                filters: [
                    (0, memcmp_1.getSignedMsgUserOrdersFilter)()
                ]
            }, this.resubOpts);
        }
        await this.subscriber.subscribe((_accountId, account, context)=>{
            this.tryUpdateSignedMsgUserOrdersAccount(account, 'decoded', context.slot);
        });
        if (this.resyncIntervalMs) {
            const recursiveResync = ()=>{
                this.resyncTimeoutId = setTimeout(()=>{
                    this.fetch().catch((e)=>{
                        console.error('Failed to resync in OrderSubscriber');
                        console.log(e);
                    }).finally(()=>{
                        if (!this.resyncTimeoutId) return;
                        recursiveResync();
                    });
                }, this.resyncIntervalMs);
            };
            recursiveResync();
        }
    }
    async unsubscribe() {
        if (!this.subscriber) return;
        await this.subscriber.unsubscribe();
        this.subscriber = undefined;
        if (this.resyncTimeoutId !== undefined) {
            clearTimeout(this.resyncTimeoutId);
            this.resyncTimeoutId = undefined;
        }
    }
}
exports.grpcSignedMsgUserOrdersAccountSubscriber = grpcSignedMsgUserOrdersAccountSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/driftClientConfig.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/dlob/DLOBNode.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createNode = exports.SignedMsgOrderNode = exports.TriggerOrderNode = exports.MarketOrderNode = exports.FloatingLimitOrderNode = exports.RestingLimitOrderNode = exports.TakingLimitOrderNode = exports.OrderNode = void 0;
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const orders_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/orders.js [app-route] (ecmascript)");
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const conversion_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/conversion.js [app-route] (ecmascript)");
const NodeList_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/dlob/NodeList.js [app-route] (ecmascript)");
class OrderNode {
    constructor(order, userAccount, isProtectedMaker, protectedMakerParams, baseAssetAmount, isSignedMsg = false){
        this.haveFilled = false;
        this.haveTrigger = false;
        // Copy the order over to the node
        this.order = {
            ...order
        };
        this.userAccount = userAccount;
        this.sortValue = this.getSortValue(order);
        this.isProtectedMaker = isProtectedMaker;
        this.protectedMakerParams = protectedMakerParams;
        this.baseAssetAmount = baseAssetAmount !== null && baseAssetAmount !== void 0 ? baseAssetAmount : order.baseAssetAmount;
        this.isSignedMsg = isSignedMsg;
    }
    getLabel() {
        let msg = `Order ${(0, NodeList_1.getOrderSignature)(this.order.orderId, this.userAccount)}`;
        msg += ` ${(0, types_1.isVariant)(this.order.direction, 'long') ? 'LONG' : 'SHORT'} `;
        msg += `${(0, conversion_1.convertToNumber)(this.order.baseAssetAmount, numericConstants_1.AMM_RESERVE_PRECISION).toFixed(3)}`;
        if (this.order.price.gt(numericConstants_1.ZERO)) {
            msg += ` @ ${(0, conversion_1.convertToNumber)(this.order.price, numericConstants_1.PRICE_PRECISION).toFixed(3)}`;
        }
        if (this.order.triggerPrice.gt(numericConstants_1.ZERO)) {
            msg += ` ${(0, types_1.isVariant)(this.order.triggerCondition, 'below') ? 'BELOW' : 'ABOVE'}`;
            msg += ` ${(0, conversion_1.convertToNumber)(this.order.triggerPrice, numericConstants_1.PRICE_PRECISION).toFixed(3)}`;
        }
        return msg;
    }
    getPrice(oraclePriceData, slot) {
        return (0, orders_1.getLimitPrice)(this.order, oraclePriceData, slot, undefined, this.isProtectedMaker ? this.protectedMakerParams : undefined);
    }
    isBaseFilled() {
        return this.order.baseAssetAmountFilled.eq(this.order.baseAssetAmount);
    }
    isVammNode() {
        return false;
    }
}
exports.OrderNode = OrderNode;
class TakingLimitOrderNode extends OrderNode {
    getSortValue(order) {
        return order.slot;
    }
}
exports.TakingLimitOrderNode = TakingLimitOrderNode;
class RestingLimitOrderNode extends OrderNode {
    getSortValue(order) {
        let sortValue = order.price;
        if (this.protectedMakerParams && this.isProtectedMaker) {
            const offset = sortValue.divn(1000);
            if ((0, types_1.isVariant)(order.direction, 'long')) {
                sortValue = sortValue.sub(offset);
            } else {
                sortValue = sortValue.add(offset);
            }
        }
        return sortValue;
    }
}
exports.RestingLimitOrderNode = RestingLimitOrderNode;
class FloatingLimitOrderNode extends OrderNode {
    getSortValue(order) {
        return new anchor_1.BN(order.oraclePriceOffset);
    }
}
exports.FloatingLimitOrderNode = FloatingLimitOrderNode;
class MarketOrderNode extends OrderNode {
    getSortValue(order) {
        return order.slot;
    }
}
exports.MarketOrderNode = MarketOrderNode;
class TriggerOrderNode extends OrderNode {
    getSortValue(order) {
        return order.triggerPrice;
    }
}
exports.TriggerOrderNode = TriggerOrderNode;
// We'll use the signedMsg uuid for the order id since it's not yet on-chain
class SignedMsgOrderNode extends OrderNode {
    constructor(order, userAccount, baseAssetAmount){
        super(order, userAccount, false, undefined, baseAssetAmount, true);
    }
    getSortValue(order) {
        return order.slot;
    }
}
exports.SignedMsgOrderNode = SignedMsgOrderNode;
function createNode(nodeType, order, userAccount, isProtectedMaker, protectedMakerParams, baseAssetAmount) {
    switch(nodeType){
        case 'floatingLimit':
            return new FloatingLimitOrderNode(order, userAccount, isProtectedMaker, protectedMakerParams, baseAssetAmount);
        case 'protectedFloatingLimit':
            return new FloatingLimitOrderNode(order, userAccount, isProtectedMaker, protectedMakerParams, baseAssetAmount);
        case 'restingLimit':
            return new RestingLimitOrderNode(order, userAccount, isProtectedMaker, protectedMakerParams, baseAssetAmount);
        case 'takingLimit':
            return new TakingLimitOrderNode(order, userAccount, isProtectedMaker, protectedMakerParams, baseAssetAmount);
        case 'market':
            return new MarketOrderNode(order, userAccount, isProtectedMaker, undefined, baseAssetAmount);
        case 'trigger':
            return new TriggerOrderNode(order, userAccount, isProtectedMaker, undefined, baseAssetAmount);
        case 'signedMsg':
            return new SignedMsgOrderNode(order, userAccount, baseAssetAmount);
        default:
            throw Error(`Unknown DLOBNode type ${nodeType}`);
    }
}
exports.createNode = createNode;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/dlob/NodeList.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NodeList = exports.getOrderSignature = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const DLOBNode_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/dlob/DLOBNode.js [app-route] (ecmascript)");
function getOrderSignature(orderId, userAccount) {
    return `${userAccount.toString()}-${orderId.toString()}`;
}
exports.getOrderSignature = getOrderSignature;
class NodeList {
    constructor(nodeType, sortDirection){
        this.nodeType = nodeType;
        this.sortDirection = sortDirection;
        this.length = 0;
        this.nodeMap = new Map();
    }
    clear() {
        this.head = undefined;
        this.length = 0;
        this.nodeMap.clear();
    }
    insert(order, marketType, userAccount, isProtectedMaker, protectedMakerParamsMap, baseAssetAmount) {
        if (!(0, types_1.isVariant)(order.status, 'open')) {
            return;
        }
        const newNode = (0, DLOBNode_1.createNode)(this.nodeType, order, userAccount, isProtectedMaker, protectedMakerParamsMap, baseAssetAmount);
        const orderSignature = getOrderSignature(order.orderId, userAccount);
        if (this.nodeMap.has(orderSignature)) {
            return;
        }
        this.nodeMap.set(orderSignature, newNode);
        this.length += 1;
        if (this.head === undefined) {
            this.head = newNode;
            return;
        }
        if (this.prependNode(this.head, newNode)) {
            this.head.previous = newNode;
            newNode.next = this.head;
            this.head = newNode;
            return;
        }
        let currentNode = this.head;
        while(currentNode.next !== undefined && !this.prependNode(currentNode.next, newNode)){
            currentNode = currentNode.next;
        }
        newNode.next = currentNode.next;
        if (currentNode.next !== undefined) {
            newNode.next.previous = newNode;
        }
        currentNode.next = newNode;
        newNode.previous = currentNode;
    }
    prependNode(currentNode, newNode) {
        const currentOrder = currentNode.order;
        const newOrder = newNode.order;
        const currentOrderSortPrice = currentNode.sortValue;
        const newOrderSortPrice = newNode.sortValue;
        if (newOrderSortPrice.eq(currentOrderSortPrice)) {
            return newOrder.slot.lt(currentOrder.slot);
        }
        if (this.sortDirection === 'asc') {
            return newOrderSortPrice.lt(currentOrderSortPrice);
        } else {
            return newOrderSortPrice.gt(currentOrderSortPrice);
        }
    }
    update(order, userAccount) {
        const orderId = getOrderSignature(order.orderId, userAccount);
        if (this.nodeMap.has(orderId)) {
            const node = this.nodeMap.get(orderId);
            Object.assign(node.order, order);
            node.haveFilled = false;
        }
    }
    remove(order, userAccount) {
        const orderId = getOrderSignature(order.orderId, userAccount);
        if (this.nodeMap.has(orderId)) {
            const node = this.nodeMap.get(orderId);
            if (node.next) {
                node.next.previous = node.previous;
            }
            if (node.previous) {
                node.previous.next = node.next;
            }
            if (this.head && node.order.orderId === this.head.order.orderId) {
                this.head = node.next;
            }
            node.previous = undefined;
            node.next = undefined;
            this.nodeMap.delete(orderId);
            this.length--;
        }
    }
    *getGenerator() {
        let node = this.head;
        while(node !== undefined){
            yield node;
            node = node.next;
        }
    }
    has(order, userAccount) {
        return this.nodeMap.has(getOrderSignature(order.orderId, userAccount));
    }
    get(orderSignature) {
        return this.nodeMap.get(orderSignature);
    }
    print() {
        let currentNode = this.head;
        while(currentNode !== undefined){
            console.log(currentNode.getLabel());
            currentNode = currentNode.next;
        }
    }
    printTop() {
        if (this.head) {
            console.log(this.sortDirection.toUpperCase(), this.head.getLabel());
        } else {
            console.log('---');
        }
    }
}
exports.NodeList = NodeList;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/dlob/orderBookLevels.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.uncrossL2 = exports.groupL2 = exports.getVammL2Generator = exports.createL2Levels = exports.mergeL2LevelGenerators = exports.getL2GeneratorFromDLOBNodes = exports.MAJORS_TOP_OF_BOOK_QUOTE_AMOUNTS = exports.DEFAULT_TOP_OF_BOOK_QUOTE_AMOUNTS = void 0;
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const amm_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/amm.js [app-route] (ecmascript)");
const exchangeStatus_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/exchangeStatus.js [app-route] (ecmascript)");
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const orders_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/orders.js [app-route] (ecmascript)");
exports.DEFAULT_TOP_OF_BOOK_QUOTE_AMOUNTS = [
    new anchor_1.BN(500).mul(numericConstants_1.QUOTE_PRECISION),
    new anchor_1.BN(1000).mul(numericConstants_1.QUOTE_PRECISION),
    new anchor_1.BN(2000).mul(numericConstants_1.QUOTE_PRECISION),
    new anchor_1.BN(5000).mul(numericConstants_1.QUOTE_PRECISION)
];
exports.MAJORS_TOP_OF_BOOK_QUOTE_AMOUNTS = [
    new anchor_1.BN(5000).mul(numericConstants_1.QUOTE_PRECISION),
    new anchor_1.BN(10000).mul(numericConstants_1.QUOTE_PRECISION),
    new anchor_1.BN(20000).mul(numericConstants_1.QUOTE_PRECISION),
    new anchor_1.BN(50000).mul(numericConstants_1.QUOTE_PRECISION)
];
const INDICATIVE_QUOTES_PUBKEY = 'inDNdu3ML4vG5LNExqcwuCQtLcCU8KfK5YM2qYV3JJz';
/**
 * Get an {@link Generator<L2Level>} generator from a {@link Generator<DLOBNode>}
 * @param dlobNodes e.g. {@link DLOB#getRestingLimitAsks} or {@link DLOB#getRestingLimitBids}
 * @param oraclePriceData
 * @param slot
 */ function* getL2GeneratorFromDLOBNodes(dlobNodes, oraclePriceData, slot) {
    for (const dlobNode of dlobNodes){
        const size = dlobNode.baseAssetAmount.sub(dlobNode.order.baseAssetAmountFilled);
        if (size.lte(numericConstants_1.ZERO)) {
            continue;
        }
        yield {
            size,
            price: dlobNode.getPrice(oraclePriceData, slot),
            sources: dlobNode.userAccount == INDICATIVE_QUOTES_PUBKEY ? {
                indicative: size
            } : {
                dlob: size
            }
        };
    }
}
exports.getL2GeneratorFromDLOBNodes = getL2GeneratorFromDLOBNodes;
function* mergeL2LevelGenerators(l2LevelGenerators, compare) {
    const generators = l2LevelGenerators.map((generator)=>{
        return {
            generator,
            next: generator.next()
        };
    });
    let next;
    do {
        next = generators.reduce((best, next)=>{
            if (next.next.done) {
                return best;
            }
            if (!best) {
                return next;
            }
            if (compare(next.next.value, best.next.value)) {
                return next;
            } else {
                return best;
            }
        }, undefined);
        if (next) {
            yield next.next.value;
            next.next = next.generator.next();
        }
    }while (next !== undefined)
}
exports.mergeL2LevelGenerators = mergeL2LevelGenerators;
function createL2Levels(generator, depth) {
    const levels = [];
    for (const level of generator){
        const price = level.price;
        const size = level.size;
        if (levels.length > 0 && levels[levels.length - 1].price.eq(price)) {
            const currentLevel = levels[levels.length - 1];
            currentLevel.size = currentLevel.size.add(size);
            for (const [source, size] of Object.entries(level.sources)){
                if (currentLevel.sources[source]) {
                    currentLevel.sources[source] = currentLevel.sources[source].add(size);
                } else {
                    currentLevel.sources[source] = size;
                }
            }
        } else if (levels.length === depth) {
            break;
        } else {
            levels.push(level);
        }
    }
    return levels;
}
exports.createL2Levels = createL2Levels;
function getVammL2Generator({ marketAccount, mmOraclePriceData, numOrders, now = new anchor_1.BN(Math.floor(Date.now() / 1000)), topOfBookQuoteAmounts = [], latestSlot }) {
    const updatedAmm = (0, amm_1.calculateUpdatedAMM)(marketAccount.amm, mmOraclePriceData);
    const paused = (0, exchangeStatus_1.isOperationPaused)(marketAccount.pausedOperations, types_1.PerpOperation.AMM_FILL);
    let [openBids, openAsks] = paused ? [
        numericConstants_1.ZERO,
        numericConstants_1.ZERO
    ] : (0, amm_1.calculateMarketOpenBidAsk)(updatedAmm.baseAssetReserve, updatedAmm.minBaseAssetReserve, updatedAmm.maxBaseAssetReserve, updatedAmm.orderStepSize);
    if (openBids.lt(marketAccount.amm.minOrderSize.muln(2))) openBids = numericConstants_1.ZERO;
    if (openAsks.abs().lt(marketAccount.amm.minOrderSize.muln(2))) openAsks = numericConstants_1.ZERO;
    const [bidReserves, askReserves] = (0, amm_1.calculateSpreadReserves)(updatedAmm, mmOraclePriceData, now, (0, types_1.isVariant)(marketAccount.contractType, 'prediction'), latestSlot);
    const numBaseOrders = Math.max(1, numOrders - topOfBookQuoteAmounts.length);
    const commonOpts = {
        numOrders,
        numBaseOrders,
        mmOraclePriceData,
        orderTickSize: marketAccount.amm.orderTickSize,
        orderStepSize: marketAccount.amm.orderStepSize,
        pegMultiplier: updatedAmm.pegMultiplier,
        sqrtK: updatedAmm.sqrtK,
        topOfBookQuoteAmounts
    };
    const makeL2Gen = ({ openLiquidity, startReserves, swapDir, positionDir })=>{
        return function*() {
            let count = 0;
            let topSize = numericConstants_1.ZERO;
            let size = openLiquidity.abs().divn(commonOpts.numBaseOrders);
            const amm = {
                ...startReserves,
                sqrtK: commonOpts.sqrtK,
                pegMultiplier: commonOpts.pegMultiplier
            };
            while(count < commonOpts.numOrders && size.gt(numericConstants_1.ZERO)){
                let baseSwap = size;
                if (count < commonOpts.topOfBookQuoteAmounts.length) {
                    const raw = commonOpts.topOfBookQuoteAmounts[count].mul(numericConstants_1.AMM_TO_QUOTE_PRECISION_RATIO).mul(numericConstants_1.PRICE_PRECISION).div(commonOpts.mmOraclePriceData.price);
                    baseSwap = (0, orders_1.standardizeBaseAssetAmount)(raw, commonOpts.orderStepSize);
                    const remaining = openLiquidity.abs().sub(topSize);
                    if (remaining.lt(baseSwap)) baseSwap = remaining;
                }
                if (baseSwap.isZero()) return;
                const [newQuoteRes, newBaseRes] = (0, amm_1.calculateAmmReservesAfterSwap)(amm, 'base', baseSwap, swapDir);
                const quoteSwapped = (0, amm_1.calculateQuoteAssetAmountSwapped)(amm.quoteAssetReserve.sub(newQuoteRes).abs(), amm.pegMultiplier, swapDir);
                const price = (0, orders_1.standardizePrice)(quoteSwapped.mul(numericConstants_1.BASE_PRECISION).div(baseSwap), commonOpts.orderTickSize, positionDir);
                amm.baseAssetReserve = newBaseRes;
                amm.quoteAssetReserve = newQuoteRes;
                if (count < commonOpts.topOfBookQuoteAmounts.length) {
                    topSize = topSize.add(baseSwap);
                    size = openLiquidity.abs().sub(topSize).divn(commonOpts.numBaseOrders);
                }
                yield {
                    price,
                    size: baseSwap,
                    sources: {
                        vamm: baseSwap
                    }
                };
                count++;
            }
        };
    };
    return {
        getL2Bids: makeL2Gen({
            openLiquidity: openBids,
            startReserves: bidReserves,
            swapDir: types_1.SwapDirection.ADD,
            positionDir: types_1.PositionDirection.LONG
        }),
        getL2Asks: makeL2Gen({
            openLiquidity: openAsks,
            startReserves: askReserves,
            swapDir: types_1.SwapDirection.REMOVE,
            positionDir: types_1.PositionDirection.SHORT
        })
    };
}
exports.getVammL2Generator = getVammL2Generator;
function groupL2(l2, grouping, depth) {
    return {
        bids: groupL2Levels(l2.bids, grouping, types_1.PositionDirection.LONG, depth),
        asks: groupL2Levels(l2.asks, grouping, types_1.PositionDirection.SHORT, depth),
        slot: l2.slot
    };
}
exports.groupL2 = groupL2;
function cloneL2Level(level) {
    if (!level) return level;
    return {
        price: level.price,
        size: level.size,
        sources: {
            ...level.sources
        }
    };
}
function groupL2Levels(levels, grouping, direction, depth) {
    const groupedLevels = [];
    for (const level of levels){
        const price = (0, orders_1.standardizePrice)(level.price, grouping, direction);
        const size = level.size;
        if (groupedLevels.length > 0 && groupedLevels[groupedLevels.length - 1].price.eq(price)) {
            // Clones things so we don't mutate the original
            const currentLevel = cloneL2Level(groupedLevels[groupedLevels.length - 1]);
            currentLevel.size = currentLevel.size.add(size);
            for (const [source, size] of Object.entries(level.sources)){
                if (currentLevel.sources[source]) {
                    currentLevel.sources[source] = currentLevel.sources[source].add(size);
                } else {
                    currentLevel.sources[source] = size;
                }
            }
            groupedLevels[groupedLevels.length - 1] = currentLevel;
        } else {
            const groupedLevel = {
                price: price,
                size,
                sources: level.sources
            };
            groupedLevels.push(groupedLevel);
        }
        if (groupedLevels.length === depth) {
            break;
        }
    }
    return groupedLevels;
}
/**
 * Method to merge bids or asks by price
 */ const mergeByPrice = (bidsOrAsks)=>{
    const merged = new Map();
    for (const level of bidsOrAsks){
        const key = level.price.toString();
        if (merged.has(key)) {
            const existing = merged.get(key);
            existing.size = existing.size.add(level.size);
            for (const [source, size] of Object.entries(level.sources)){
                if (existing.sources[source]) {
                    existing.sources[source] = existing.sources[source].add(size);
                } else {
                    existing.sources[source] = size;
                }
            }
        } else {
            merged.set(key, cloneL2Level(level));
        }
    }
    return Array.from(merged.values());
};
/**
 * The purpose of this function is uncross the L2 orderbook by modifying the bid/ask price at the top of the book
 * This will make the liquidity look worse but more intuitive (users familiar with clob get confused w temporarily
 * crossing book)
 *
 * Things to note about how it works:
 * - it will not uncross the user's liquidity
 * - it does the uncrossing by "shifting" the crossing liquidity to the nearest uncrossed levels. Thus the output liquidity maintains the same total size.
 *
 * @param bids
 * @param asks
 * @param oraclePrice
 * @param oracleTwap5Min
 * @param markTwap5Min
 * @param grouping
 * @param userBids
 * @param userAsks
 */ function uncrossL2(bids, asks, oraclePrice, oracleTwap5Min, markTwap5Min, grouping, userBids, userAsks) {
    // If there are no bids or asks, there is nothing to center
    if (bids.length === 0 || asks.length === 0) {
        return {
            bids,
            asks
        };
    }
    // If the top of the book is already centered, there is nothing to do
    if (bids[0].price.lt(asks[0].price)) {
        return {
            bids,
            asks
        };
    }
    const newBids = [];
    const newAsks = [];
    const updateLevels = (newPrice, oldLevel, levels)=>{
        if (levels.length > 0 && levels[levels.length - 1].price.eq(newPrice)) {
            levels[levels.length - 1].size = levels[levels.length - 1].size.add(oldLevel.size);
            for (const [source, size] of Object.entries(oldLevel.sources)){
                if (levels[levels.length - 1].sources[source]) {
                    levels[levels.length - 1].sources = {
                        ...levels[levels.length - 1].sources,
                        [source]: levels[levels.length - 1].sources[source].add(size)
                    };
                } else {
                    levels[levels.length - 1].sources[source] = size;
                }
            }
        } else {
            levels.push({
                price: newPrice,
                size: oldLevel.size,
                sources: oldLevel.sources
            });
        }
    };
    // This is the best estimate of the premium in the market vs oracle to filter crossing around
    const referencePrice = oraclePrice.add(markTwap5Min.sub(oracleTwap5Min));
    let bidIndex = 0;
    let askIndex = 0;
    let maxBid;
    let minAsk;
    const getPriceAndSetBound = (newPrice, direction)=>{
        if ((0, types_1.isVariant)(direction, 'long')) {
            maxBid = maxBid ? anchor_1.BN.min(maxBid, newPrice) : newPrice;
            return maxBid;
        } else {
            minAsk = minAsk ? anchor_1.BN.max(minAsk, newPrice) : newPrice;
            return minAsk;
        }
    };
    while(bidIndex < bids.length || askIndex < asks.length){
        const nextBid = cloneL2Level(bids[bidIndex]);
        const nextAsk = cloneL2Level(asks[askIndex]);
        if (!nextBid) {
            newAsks.push(nextAsk);
            askIndex++;
            continue;
        }
        if (!nextAsk) {
            newBids.push(nextBid);
            bidIndex++;
            continue;
        }
        if (userBids.has(nextBid.price.toString())) {
            newBids.push(nextBid);
            bidIndex++;
            continue;
        }
        if (userAsks.has(nextAsk.price.toString())) {
            newAsks.push(nextAsk);
            askIndex++;
            continue;
        }
        if (nextBid.price.gte(nextAsk.price)) {
            if (nextBid.price.gt(referencePrice) && nextAsk.price.gt(referencePrice)) {
                let newBidPrice = nextAsk.price.sub(grouping);
                newBidPrice = getPriceAndSetBound(newBidPrice, types_1.PositionDirection.LONG);
                updateLevels(newBidPrice, nextBid, newBids);
                bidIndex++;
            } else if (nextAsk.price.lt(referencePrice) && nextBid.price.lt(referencePrice)) {
                let newAskPrice = nextBid.price.add(grouping);
                newAskPrice = getPriceAndSetBound(newAskPrice, types_1.PositionDirection.SHORT);
                updateLevels(newAskPrice, nextAsk, newAsks);
                askIndex++;
            } else {
                let newBidPrice = referencePrice.sub(grouping);
                let newAskPrice = referencePrice.add(grouping);
                newBidPrice = getPriceAndSetBound(newBidPrice, types_1.PositionDirection.LONG);
                newAskPrice = getPriceAndSetBound(newAskPrice, types_1.PositionDirection.SHORT);
                updateLevels(newBidPrice, nextBid, newBids);
                updateLevels(newAskPrice, nextAsk, newAsks);
                bidIndex++;
                askIndex++;
            }
        } else {
            if (minAsk && nextAsk.price.lte(minAsk)) {
                const newAskPrice = getPriceAndSetBound(nextAsk.price, types_1.PositionDirection.SHORT);
                updateLevels(newAskPrice, nextAsk, newAsks);
            } else {
                newAsks.push(nextAsk);
            }
            askIndex++;
            if (maxBid && nextBid.price.gte(maxBid)) {
                const newBidPrice = getPriceAndSetBound(nextBid.price, types_1.PositionDirection.LONG);
                updateLevels(newBidPrice, nextBid, newBids);
            } else {
                newBids.push(nextBid);
            }
            bidIndex++;
        }
    }
    newBids.sort((a, b)=>b.price.cmp(a.price));
    newAsks.sort((a, b)=>a.price.cmp(b.price));
    const finalNewBids = mergeByPrice(newBids);
    const finalNewAsks = mergeByPrice(newAsks);
    return {
        bids: finalNewBids,
        asks: finalNewAsks
    };
}
exports.uncrossL2 = uncrossL2;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/dlob/DLOB.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DLOB = void 0;
const NodeList_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/dlob/NodeList.js [app-route] (ecmascript)");
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const userName_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/userName.js [app-route] (ecmascript)");
const orders_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/orders.js [app-route] (ecmascript)");
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const userStatus_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/userStatus.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const exchangeStatus_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/exchangeStatus.js [app-route] (ecmascript)");
const orderBookLevels_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/dlob/orderBookLevels.js [app-route] (ecmascript)");
const auction_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/auction.js [app-route] (ecmascript)");
const conversion_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/conversion.js [app-route] (ecmascript)");
const SUPPORTED_ORDER_TYPES = [
    'market',
    'limit',
    'triggerMarket',
    'triggerLimit',
    'oracle'
];
class DLOB {
    constructor(protectedMakerParamsMap){
        this.openOrders = new Map();
        this.orderLists = new Map();
        this.maxSlotForRestingLimitOrders = 0;
        this.initialized = false;
        this.protectedMakerParamsMap = protectedMakerParamsMap || {
            perp: new Map(),
            spot: new Map()
        };
        this.init();
    }
    init() {
        this.openOrders.set('perp', new Set());
        this.openOrders.set('spot', new Set());
        this.orderLists.set('perp', new Map());
        this.orderLists.set('spot', new Map());
    }
    clear() {
        for (const marketType of this.openOrders.keys()){
            this.openOrders.get(marketType).clear();
        }
        this.openOrders.clear();
        for (const marketType of this.orderLists.keys()){
            for (const marketIndex of this.orderLists.get(marketType).keys()){
                const marketNodeLists = this.orderLists.get(marketType).get(marketIndex);
                for (const side of Object.keys(marketNodeLists)){
                    for (const orderType of Object.keys(marketNodeLists[side])){
                        marketNodeLists[side][orderType].clear();
                    }
                }
            }
        }
        this.orderLists.clear();
        this.maxSlotForRestingLimitOrders = 0;
        this.init();
    }
    /**
     * initializes a new DLOB instance
     *
     * @returns a promise that resolves when the DLOB is initialized
     */ async initFromUserMap(userMap, slot) {
        var _a;
        if (this.initialized) {
            return false;
        }
        // initialize the dlob with the user map
        for (const user of userMap.values()){
            const userAccount = user.getUserAccount();
            const userAccountPubkey = user.getUserAccountPublicKey();
            const userAccountPubkeyString = userAccountPubkey.toString();
            const protectedMaker = (0, userStatus_1.isUserProtectedMaker)(userAccount);
            for (const order of userAccount.orders){
                let baseAssetAmount = order.baseAssetAmount;
                if (order.reduceOnly) {
                    const existingBaseAmount = ((_a = userAccount.perpPositions.find((pos)=>pos.marketIndex === order.marketIndex && pos.openOrders > 0)) === null || _a === void 0 ? void 0 : _a.baseAssetAmount) || numericConstants_1.ZERO;
                    baseAssetAmount = (0, orders_1.calculateOrderBaseAssetAmount)(order, existingBaseAmount);
                }
                this.insertOrder(order, userAccountPubkeyString, slot, protectedMaker, baseAssetAmount);
            }
        }
        this.initialized = true;
        return true;
    }
    insertOrder(order, userAccount, slot, isUserProtectedMaker, baseAssetAmount, onInsert) {
        var _a;
        if (!(0, types_1.isVariant)(order.status, 'open')) {
            return;
        }
        if (!(0, types_1.isOneOfVariant)(order.orderType, SUPPORTED_ORDER_TYPES)) {
            return;
        }
        const marketType = (0, types_1.getVariant)(order.marketType);
        if (!this.orderLists.get(marketType).has(order.marketIndex)) {
            this.addOrderList(marketType, order.marketIndex);
        }
        if ((0, types_1.isVariant)(order.status, 'open')) {
            this.openOrders.get(marketType).add((0, NodeList_1.getOrderSignature)(order.orderId, userAccount));
        }
        (_a = this.getListForOnChainOrder(order, slot, isUserProtectedMaker)) === null || _a === void 0 ? void 0 : _a.insert(order, marketType, userAccount, isUserProtectedMaker, this.protectedMakerParamsMap[marketType].get(order.marketIndex), baseAssetAmount);
        if (onInsert) {
            onInsert();
        }
    }
    insertSignedMsgOrder(order, userAccount, isUserProtectedMaker, baseAssetAmount, onInsert) {
        const marketType = (0, types_1.getVariant)(order.marketType);
        const marketIndex = order.marketIndex;
        const bidOrAsk = (0, types_1.isVariant)(order.direction, 'long') ? 'bid' : 'ask';
        if (!this.orderLists.get(marketType).has(order.marketIndex)) {
            this.addOrderList(marketType, order.marketIndex);
        }
        this.openOrders.get(marketType).add((0, NodeList_1.getOrderSignature)(order.orderId, userAccount));
        this.orderLists.get(marketType).get(marketIndex).signedMsg[bidOrAsk].insert(order, marketType, userAccount, isUserProtectedMaker, this.protectedMakerParamsMap[marketType].get(order.marketIndex), baseAssetAmount);
        if (onInsert) {
            onInsert();
        }
    }
    addOrderList(marketType, marketIndex) {
        this.orderLists.get(marketType).set(marketIndex, {
            restingLimit: {
                ask: new NodeList_1.NodeList('restingLimit', 'asc'),
                bid: new NodeList_1.NodeList('restingLimit', 'desc')
            },
            floatingLimit: {
                ask: new NodeList_1.NodeList('floatingLimit', 'asc'),
                bid: new NodeList_1.NodeList('floatingLimit', 'desc')
            },
            protectedFloatingLimit: {
                ask: new NodeList_1.NodeList('protectedFloatingLimit', 'asc'),
                bid: new NodeList_1.NodeList('protectedFloatingLimit', 'desc')
            },
            takingLimit: {
                ask: new NodeList_1.NodeList('takingLimit', 'asc'),
                bid: new NodeList_1.NodeList('takingLimit', 'asc')
            },
            market: {
                ask: new NodeList_1.NodeList('market', 'asc'),
                bid: new NodeList_1.NodeList('market', 'asc')
            },
            trigger: {
                above: new NodeList_1.NodeList('trigger', 'asc'),
                below: new NodeList_1.NodeList('trigger', 'desc')
            },
            signedMsg: {
                ask: new NodeList_1.NodeList('signedMsg', 'asc'),
                bid: new NodeList_1.NodeList('signedMsg', 'asc')
            }
        });
    }
    delete(order, userAccount, slot, isUserProtectedMaker, onDelete) {
        var _a;
        if (!(0, types_1.isVariant)(order.status, 'open')) {
            return;
        }
        this.updateRestingLimitOrders(slot);
        (_a = this.getListForOnChainOrder(order, slot, isUserProtectedMaker)) === null || _a === void 0 ? void 0 : _a.remove(order, userAccount.toString());
        if (onDelete) {
            onDelete();
        }
    }
    getListForOnChainOrder(order, slot, isProtectedMaker) {
        const isInactiveTriggerOrder = (0, orders_1.mustBeTriggered)(order) && !(0, orders_1.isTriggered)(order);
        let type;
        if (isInactiveTriggerOrder) {
            type = 'trigger';
        } else if ((0, types_1.isOneOfVariant)(order.orderType, [
            'market',
            'triggerMarket',
            'oracle'
        ])) {
            type = 'market';
        } else if (order.oraclePriceOffset !== 0) {
            type = isProtectedMaker ? 'protectedFloatingLimit' : 'floatingLimit';
        } else {
            const isResting = (0, orders_1.isRestingLimitOrder)(order, slot);
            type = isResting ? 'restingLimit' : 'takingLimit';
        }
        let subType;
        if (isInactiveTriggerOrder) {
            subType = (0, types_1.isVariant)(order.triggerCondition, 'above') ? 'above' : 'below';
        } else {
            subType = (0, types_1.isVariant)(order.direction, 'long') ? 'bid' : 'ask';
        }
        const marketType = (0, types_1.getVariant)(order.marketType);
        if (!this.orderLists.has(marketType)) {
            return undefined;
        }
        return this.orderLists.get(marketType).get(order.marketIndex)[type][subType];
    }
    updateRestingLimitOrders(slot) {
        if (slot <= this.maxSlotForRestingLimitOrders) {
            return;
        }
        this.maxSlotForRestingLimitOrders = slot;
        this.updateRestingLimitOrdersForMarketType(slot, 'perp');
        this.updateRestingLimitOrdersForMarketType(slot, 'spot');
    }
    updateRestingLimitOrdersForMarketType(slot, marketTypeStr) {
        for (const [_, nodeLists] of this.orderLists.get(marketTypeStr)){
            const nodesToUpdate = [];
            for (const node of nodeLists.takingLimit.ask.getGenerator()){
                if (!(0, orders_1.isRestingLimitOrder)(node.order, slot)) {
                    continue;
                }
                nodesToUpdate.push({
                    side: 'ask',
                    node
                });
            }
            for (const node of nodeLists.takingLimit.bid.getGenerator()){
                if (!(0, orders_1.isRestingLimitOrder)(node.order, slot)) {
                    continue;
                }
                nodesToUpdate.push({
                    side: 'bid',
                    node
                });
            }
            for (const nodeToUpdate of nodesToUpdate){
                const { side, node } = nodeToUpdate;
                nodeLists.takingLimit[side].remove(node.order, node.userAccount);
                nodeLists.restingLimit[side].insert(node.order, marketTypeStr, node.userAccount, node.isProtectedMaker, this.protectedMakerParamsMap[marketTypeStr].get(node.order.marketIndex));
            }
        }
    }
    getOrder(orderId, userAccount) {
        const orderSignature = (0, NodeList_1.getOrderSignature)(orderId, userAccount.toString());
        for (const nodeList of this.getNodeLists()){
            const node = nodeList.get(orderSignature);
            if (node) {
                return node.order;
            }
        }
        return undefined;
    }
    findNodesToFill(marketIndex, fallbackBid, fallbackAsk, slot, ts, marketType, oraclePriceData, stateAccount, marketAccount) {
        if ((0, exchangeStatus_1.fillPaused)(stateAccount, marketAccount)) {
            return [];
        }
        const isAmmPaused = (0, exchangeStatus_1.ammPaused)(stateAccount, marketAccount);
        const { makerRebateNumerator, makerRebateDenominator } = this.getMakerRebate(marketType, stateAccount, marketAccount);
        const takingOrderNodesToFill = this.findTakingNodesToFill(marketIndex, slot, marketType, oraclePriceData, isAmmPaused, stateAccount, marketAccount, fallbackAsk, fallbackBid);
        const restingLimitOrderNodesToFill = this.findRestingLimitOrderNodesToFill(marketIndex, slot, marketType, oraclePriceData, isAmmPaused, stateAccount, marketAccount, makerRebateNumerator, makerRebateDenominator, fallbackAsk, fallbackBid);
        // get expired market nodes
        const expiredNodesToFill = this.findExpiredNodesToFill(marketIndex, ts, marketType, new anchor_1.BN(slot));
        const stepSize = (0, types_1.isVariant)(marketType, 'perp') ? marketAccount.amm.orderStepSize : marketAccount.orderStepSize;
        const cancelReduceOnlyNodesToFill = this.findUnfillableReduceOnlyOrdersToCancel(marketIndex, marketType, stepSize);
        return this.mergeNodesToFill(restingLimitOrderNodesToFill, takingOrderNodesToFill).concat(expiredNodesToFill).concat(cancelReduceOnlyNodesToFill);
    }
    getMakerRebate(marketType, stateAccount, marketAccount) {
        let makerRebateNumerator;
        let makerRebateDenominator;
        if ((0, types_1.isVariant)(marketType, 'perp')) {
            makerRebateNumerator = stateAccount.perpFeeStructure.feeTiers[0].makerRebateNumerator;
            makerRebateDenominator = stateAccount.perpFeeStructure.feeTiers[0].makerRebateDenominator;
        } else {
            makerRebateNumerator = stateAccount.spotFeeStructure.feeTiers[0].makerRebateNumerator;
            makerRebateDenominator = stateAccount.spotFeeStructure.feeTiers[0].makerRebateDenominator;
        }
        // @ts-ignore
        const feeAdjustment = marketAccount.feeAdjustment || 0;
        if (feeAdjustment !== 0) {
            makerRebateNumerator += makerRebateNumerator * feeAdjustment / 100;
        }
        return {
            makerRebateNumerator,
            makerRebateDenominator
        };
    }
    mergeNodesToFill(restingLimitOrderNodesToFill, takingOrderNodesToFill) {
        const mergedNodesToFill = new Map();
        const mergeNodesToFillHelper = (nodesToFillArray)=>{
            nodesToFillArray.forEach((nodeToFill)=>{
                const nodeSignature = (0, NodeList_1.getOrderSignature)(nodeToFill.node.order.orderId, nodeToFill.node.userAccount);
                if (!mergedNodesToFill.has(nodeSignature)) {
                    mergedNodesToFill.set(nodeSignature, {
                        node: nodeToFill.node,
                        makerNodes: []
                    });
                }
                if (nodeToFill.makerNodes) {
                    mergedNodesToFill.get(nodeSignature).makerNodes.push(...nodeToFill.makerNodes);
                }
            });
        };
        mergeNodesToFillHelper(restingLimitOrderNodesToFill);
        mergeNodesToFillHelper(takingOrderNodesToFill);
        return Array.from(mergedNodesToFill.values());
    }
    findRestingLimitOrderNodesToFill(marketIndex, slot, marketType, oraclePriceData, isAmmPaused, stateAccount, marketAccount, makerRebateNumerator, makerRebateDenominator, fallbackAsk, fallbackBid) {
        const nodesToFill = new Array();
        const crossingNodes = this.findCrossingRestingLimitOrders(marketIndex, slot, marketType, oraclePriceData);
        for (const crossingNode of crossingNodes){
            nodesToFill.push(crossingNode);
        }
        if (fallbackBid && !isAmmPaused) {
            const askGenerator = this.getRestingLimitAsks(marketIndex, slot, marketType, oraclePriceData);
            const fallbackBidWithBuffer = fallbackBid.sub(fallbackBid.muln(makerRebateNumerator).divn(makerRebateDenominator));
            const asksCrossingFallback = this.findNodesCrossingFallbackLiquidity(marketType, slot, oraclePriceData, askGenerator, (askPrice)=>{
                return askPrice.lte(fallbackBidWithBuffer);
            }, stateAccount, marketAccount);
            for (const askCrossingFallback of asksCrossingFallback){
                nodesToFill.push(askCrossingFallback);
            }
        }
        if (fallbackAsk && !isAmmPaused) {
            const bidGenerator = this.getRestingLimitBids(marketIndex, slot, marketType, oraclePriceData);
            const fallbackAskWithBuffer = fallbackAsk.add(fallbackAsk.muln(makerRebateNumerator).divn(makerRebateDenominator));
            const bidsCrossingFallback = this.findNodesCrossingFallbackLiquidity(marketType, slot, oraclePriceData, bidGenerator, (bidPrice)=>{
                return bidPrice.gte(fallbackAskWithBuffer);
            }, stateAccount, marketAccount);
            for (const bidCrossingFallback of bidsCrossingFallback){
                nodesToFill.push(bidCrossingFallback);
            }
        }
        return nodesToFill;
    }
    findTakingNodesToFill(marketIndex, slot, marketType, oraclePriceData, isAmmPaused, state, marketAccount, fallbackAsk, fallbackBid) {
        const nodesToFill = new Array();
        let takingOrderGenerator = this.getTakingAsks(marketIndex, marketType, slot, oraclePriceData);
        const takingAsksCrossingBids = this.findTakingNodesCrossingMakerNodes(marketIndex, slot, marketType, oraclePriceData, takingOrderGenerator, this.getRestingLimitBids.bind(this), (takerPrice, makerPrice)=>{
            if ((0, types_1.isVariant)(marketType, 'spot')) {
                if (takerPrice === undefined) {
                    return false;
                }
                if (fallbackBid && makerPrice.lt(fallbackBid)) {
                    return false;
                }
            }
            return takerPrice === undefined || takerPrice.lte(makerPrice);
        });
        for (const takingAskCrossingBid of takingAsksCrossingBids){
            nodesToFill.push(takingAskCrossingBid);
        }
        if (fallbackBid && !isAmmPaused) {
            takingOrderGenerator = this.getTakingAsks(marketIndex, marketType, slot, oraclePriceData);
            const takingAsksCrossingFallback = this.findNodesCrossingFallbackLiquidity(marketType, slot, oraclePriceData, takingOrderGenerator, (takerPrice)=>{
                return takerPrice === undefined || takerPrice.lte(fallbackBid);
            }, state, marketAccount);
            for (const takingAskCrossingFallback of takingAsksCrossingFallback){
                nodesToFill.push(takingAskCrossingFallback);
            }
        }
        takingOrderGenerator = this.getTakingBids(marketIndex, marketType, slot, oraclePriceData);
        const takingBidsToFill = this.findTakingNodesCrossingMakerNodes(marketIndex, slot, marketType, oraclePriceData, takingOrderGenerator, this.getRestingLimitAsks.bind(this), (takerPrice, makerPrice)=>{
            if ((0, types_1.isVariant)(marketType, 'spot')) {
                if (takerPrice === undefined) {
                    return false;
                }
                if (fallbackAsk && makerPrice.gt(fallbackAsk)) {
                    return false;
                }
            }
            return takerPrice === undefined || takerPrice.gte(makerPrice);
        });
        for (const takingBidToFill of takingBidsToFill){
            nodesToFill.push(takingBidToFill);
        }
        if (fallbackAsk && !isAmmPaused) {
            takingOrderGenerator = this.getTakingBids(marketIndex, marketType, slot, oraclePriceData);
            const takingBidsCrossingFallback = this.findNodesCrossingFallbackLiquidity(marketType, slot, oraclePriceData, takingOrderGenerator, (takerPrice)=>{
                return takerPrice === undefined || takerPrice.gte(fallbackAsk);
            }, state, marketAccount);
            for (const marketBidCrossingFallback of takingBidsCrossingFallback){
                nodesToFill.push(marketBidCrossingFallback);
            }
        }
        return nodesToFill;
    }
    findTakingNodesCrossingMakerNodes(marketIndex, slot, marketType, oraclePriceData, takerNodeGenerator, makerNodeGeneratorFn, doesCross) {
        const nodesToFill = new Array();
        for (const takerNode of takerNodeGenerator){
            const makerNodeGenerator = makerNodeGeneratorFn(marketIndex, slot, marketType, oraclePriceData);
            for (const makerNode of makerNodeGenerator){
                // Can't match orders from the same user
                const sameUser = takerNode.userAccount === makerNode.userAccount;
                if (sameUser) {
                    continue;
                }
                const makerPrice = makerNode.getPrice(oraclePriceData, slot);
                const takerPrice = takerNode.getPrice(oraclePriceData, slot);
                const ordersCross = doesCross(takerPrice, makerPrice);
                if (!ordersCross) {
                    break;
                }
                nodesToFill.push({
                    node: takerNode,
                    makerNodes: [
                        makerNode
                    ]
                });
                const makerOrder = makerNode.order;
                const takerOrder = takerNode.order;
                const makerBaseRemaining = makerOrder.baseAssetAmount.sub(makerOrder.baseAssetAmountFilled);
                const takerBaseRemaining = takerOrder.baseAssetAmount.sub(takerOrder.baseAssetAmountFilled);
                const baseFilled = anchor_1.BN.min(makerBaseRemaining, takerBaseRemaining);
                const newMakerOrder = {
                    ...makerOrder
                };
                newMakerOrder.baseAssetAmountFilled = makerOrder.baseAssetAmountFilled.add(baseFilled);
                this.getListForOnChainOrder(newMakerOrder, slot, makerNode.isProtectedMaker).update(newMakerOrder, makerNode.userAccount);
                const newTakerOrder = {
                    ...takerOrder
                };
                newTakerOrder.baseAssetAmountFilled = takerOrder.baseAssetAmountFilled.add(baseFilled);
                if (takerNode.isSignedMsg) {
                    const marketTypeStr = (0, types_1.getVariant)(marketType);
                    const orderList = (0, types_1.isVariant)(takerOrder.direction, 'long') ? this.orderLists.get(marketTypeStr).get(marketIndex).signedMsg.bid : this.orderLists.get(marketTypeStr).get(marketIndex).signedMsg.ask;
                    orderList.update(newTakerOrder, takerNode.userAccount);
                } else {
                    this.getListForOnChainOrder(newTakerOrder, slot, takerNode.isProtectedMaker).update(newTakerOrder, takerNode.userAccount);
                }
                if (newTakerOrder.baseAssetAmountFilled.eq(takerOrder.baseAssetAmount)) {
                    break;
                }
            }
        }
        return nodesToFill;
    }
    findNodesCrossingFallbackLiquidity(marketType, slot, oraclePriceData, nodeGenerator, doesCross, state, marketAccount) {
        var _a;
        const nodesToFill = new Array();
        let nextNode = nodeGenerator.next();
        while(!nextNode.done){
            const node = nextNode.value;
            if ((0, types_1.isVariant)(marketType, 'spot') && ((_a = node.order) === null || _a === void 0 ? void 0 : _a.postOnly)) {
                nextNode = nodeGenerator.next();
                continue;
            }
            const nodePrice = (0, orders_1.getLimitPrice)(node.order, oraclePriceData, slot);
            // order crosses if there is no limit price or it crosses fallback price
            const crosses = doesCross(nodePrice);
            // fallback is available if auction is complete or it's a spot order
            const fallbackAvailable = (0, types_1.isVariant)(marketType, 'spot') || (0, auction_1.isFallbackAvailableLiquiditySource)(node.order, oraclePriceData, slot, state, marketAccount);
            if (crosses && fallbackAvailable) {
                nodesToFill.push({
                    node: node,
                    makerNodes: []
                });
            }
            nextNode = nodeGenerator.next();
        }
        return nodesToFill;
    }
    findExpiredNodesToFill(marketIndex, ts, marketType, slot) {
        const nodesToFill = new Array();
        const marketTypeStr = (0, types_1.getVariant)(marketType);
        const nodeLists = this.orderLists.get(marketTypeStr).get(marketIndex);
        if (!nodeLists) {
            return nodesToFill;
        }
        // All bids/asks that can expire
        // dont try to expire limit orders with tif as its inefficient use of blockspace
        const bidGenerators = [
            nodeLists.takingLimit.bid.getGenerator(),
            nodeLists.restingLimit.bid.getGenerator(),
            nodeLists.floatingLimit.bid.getGenerator(),
            nodeLists.market.bid.getGenerator(),
            nodeLists.signedMsg.bid.getGenerator()
        ];
        const askGenerators = [
            nodeLists.takingLimit.ask.getGenerator(),
            nodeLists.restingLimit.ask.getGenerator(),
            nodeLists.floatingLimit.ask.getGenerator(),
            nodeLists.market.ask.getGenerator(),
            nodeLists.signedMsg.ask.getGenerator()
        ];
        for (const bidGenerator of bidGenerators){
            for (const bid of bidGenerator){
                if (bid.isSignedMsg && slot.gt(bid.order.slot.addn(bid.order.auctionDuration))) {
                    this.orderLists.get(marketTypeStr).get(marketIndex).signedMsg.bid.remove(bid.order, bid.userAccount);
                } else if ((0, orders_1.isOrderExpired)(bid.order, ts, true, 25)) {
                    nodesToFill.push({
                        node: bid,
                        makerNodes: []
                    });
                }
            }
        }
        for (const askGenerator of askGenerators){
            for (const ask of askGenerator){
                if (ask.isSignedMsg && slot.gt(ask.order.slot.addn(ask.order.auctionDuration))) {
                    this.orderLists.get(marketTypeStr).get(marketIndex).signedMsg.ask.remove(ask.order, ask.userAccount);
                } else if ((0, orders_1.isOrderExpired)(ask.order, ts, true, 25)) {
                    nodesToFill.push({
                        node: ask,
                        makerNodes: []
                    });
                }
            }
        }
        return nodesToFill;
    }
    findUnfillableReduceOnlyOrdersToCancel(marketIndex, marketType, stepSize) {
        const nodesToFill = new Array();
        const marketTypeStr = (0, types_1.getVariant)(marketType);
        const nodeLists = this.orderLists.get(marketTypeStr).get(marketIndex);
        if (!nodeLists) {
            return nodesToFill;
        }
        const generators = [
            nodeLists.takingLimit.bid.getGenerator(),
            nodeLists.restingLimit.bid.getGenerator(),
            nodeLists.floatingLimit.bid.getGenerator(),
            nodeLists.market.bid.getGenerator(),
            nodeLists.signedMsg.bid.getGenerator(),
            nodeLists.takingLimit.ask.getGenerator(),
            nodeLists.restingLimit.ask.getGenerator(),
            nodeLists.floatingLimit.ask.getGenerator(),
            nodeLists.market.ask.getGenerator(),
            nodeLists.signedMsg.ask.getGenerator(),
            nodeLists.trigger.above.getGenerator(),
            nodeLists.trigger.below.getGenerator()
        ];
        for (const generator of generators){
            for (const node of generator){
                if (!node.order.reduceOnly) {
                    continue;
                }
                if (node.baseAssetAmount.lt(stepSize)) {
                    nodesToFill.push({
                        node,
                        makerNodes: []
                    });
                }
            }
        }
        return nodesToFill;
    }
    *getTakingBids(marketIndex, marketType, slot, oraclePriceData, filterFcn) {
        const marketTypeStr = (0, types_1.getVariant)(marketType);
        const orderLists = this.orderLists.get(marketTypeStr).get(marketIndex);
        if (!orderLists) {
            return;
        }
        this.updateRestingLimitOrders(slot);
        const generatorList = [
            orderLists.market.bid.getGenerator(),
            orderLists.takingLimit.bid.getGenerator(),
            this.signedMsgGenerator(orderLists.signedMsg.bid, (x)=>!(0, orders_1.isRestingLimitOrder)(x.order, slot))
        ];
        yield* this.getBestNode(generatorList, oraclePriceData, slot, (bestNode, currentNode)=>{
            return bestNode.order.slot.lt(currentNode.order.slot);
        }, filterFcn);
    }
    *getTakingAsks(marketIndex, marketType, slot, oraclePriceData, filterFcn) {
        const marketTypeStr = (0, types_1.getVariant)(marketType);
        const orderLists = this.orderLists.get(marketTypeStr).get(marketIndex);
        if (!orderLists) {
            return;
        }
        this.updateRestingLimitOrders(slot);
        const generatorList = [
            orderLists.market.ask.getGenerator(),
            orderLists.takingLimit.ask.getGenerator(),
            this.signedMsgGenerator(orderLists.signedMsg.ask, (x)=>!(0, orders_1.isRestingLimitOrder)(x.order, slot))
        ];
        yield* this.getBestNode(generatorList, oraclePriceData, slot, (bestNode, currentNode)=>{
            return bestNode.order.slot.lt(currentNode.order.slot);
        }, filterFcn);
    }
    *signedMsgGenerator(signedMsgOrderList, filter) {
        for (const signedMsgOrder of signedMsgOrderList.getGenerator()){
            if (filter(signedMsgOrder)) {
                yield signedMsgOrder;
            }
        }
    }
    *getBestNode(generatorList, oraclePriceData, slot, compareFcn, filterFcn) {
        const generators = generatorList.map((generator)=>{
            return {
                next: generator.next(),
                generator
            };
        });
        let sideExhausted = false;
        while(!sideExhausted){
            const bestGenerator = generators.reduce((bestGenerator, currentGenerator)=>{
                if (currentGenerator.next.done) {
                    return bestGenerator;
                }
                if (bestGenerator.next.done) {
                    return currentGenerator;
                }
                const bestValue = bestGenerator.next.value;
                const currentValue = currentGenerator.next.value;
                return compareFcn(bestValue, currentValue, slot, oraclePriceData) ? bestGenerator : currentGenerator;
            });
            if (!bestGenerator.next.done) {
                // skip this node if it's already completely filled
                if (bestGenerator.next.value.isBaseFilled()) {
                    bestGenerator.next = bestGenerator.generator.next();
                    continue;
                }
                if (filterFcn && !filterFcn(bestGenerator.next.value)) {
                    bestGenerator.next = bestGenerator.generator.next();
                    continue;
                }
                yield bestGenerator.next.value;
                bestGenerator.next = bestGenerator.generator.next();
            } else {
                sideExhausted = true;
            }
        }
    }
    *getRestingLimitAsks(marketIndex, slot, marketType, oraclePriceData, filterFcn) {
        if ((0, types_1.isVariant)(marketType, 'spot') && !oraclePriceData) {
            throw new Error('Must provide OraclePriceData to get spot asks');
        }
        this.updateRestingLimitOrders(slot);
        const marketTypeStr = (0, types_1.getVariant)(marketType);
        const nodeLists = this.orderLists.get(marketTypeStr).get(marketIndex);
        if (!nodeLists) {
            return;
        }
        const generatorList = [
            nodeLists.restingLimit.ask.getGenerator(),
            nodeLists.floatingLimit.ask.getGenerator(),
            nodeLists.protectedFloatingLimit.ask.getGenerator(),
            this.signedMsgGenerator(nodeLists.signedMsg.ask, (x)=>(0, orders_1.isRestingLimitOrder)(x.order, slot))
        ];
        yield* this.getBestNode(generatorList, oraclePriceData, slot, (bestNode, currentNode, slot, oraclePriceData)=>{
            return bestNode.getPrice(oraclePriceData, slot).lt(currentNode.getPrice(oraclePriceData, slot));
        }, filterFcn);
    }
    *getRestingLimitBids(marketIndex, slot, marketType, oraclePriceData, filterFcn) {
        if ((0, types_1.isVariant)(marketType, 'spot') && !oraclePriceData) {
            throw new Error('Must provide OraclePriceData to get spot bids');
        }
        this.updateRestingLimitOrders(slot);
        const marketTypeStr = (0, types_1.getVariant)(marketType);
        const nodeLists = this.orderLists.get(marketTypeStr).get(marketIndex);
        if (!nodeLists) {
            return;
        }
        const generatorList = [
            nodeLists.restingLimit.bid.getGenerator(),
            nodeLists.floatingLimit.bid.getGenerator(),
            nodeLists.protectedFloatingLimit.bid.getGenerator(),
            this.signedMsgGenerator(nodeLists.signedMsg.bid, (x)=>(0, orders_1.isRestingLimitOrder)(x.order, slot))
        ];
        yield* this.getBestNode(generatorList, oraclePriceData, slot, (bestNode, currentNode, slot, oraclePriceData)=>{
            return bestNode.getPrice(oraclePriceData, slot).gt(currentNode.getPrice(oraclePriceData, slot));
        }, filterFcn);
    }
    /**
     * This will look at both the taking and resting limit asks
     * @param marketIndex
     * @param fallbackAsk
     * @param slot
     * @param marketType
     * @param oraclePriceData
     * @param filterFcn
     */ *getAsks(marketIndex, _fallbackAsk, slot, marketType, oraclePriceData, filterFcn) {
        if ((0, types_1.isVariant)(marketType, 'spot') && !oraclePriceData) {
            throw new Error('Must provide OraclePriceData to get spot asks');
        }
        const generatorList = [
            this.getTakingAsks(marketIndex, marketType, slot, oraclePriceData),
            this.getRestingLimitAsks(marketIndex, slot, marketType, oraclePriceData)
        ];
        yield* this.getBestNode(generatorList, oraclePriceData, slot, (bestNode, currentNode, slot, oraclePriceData)=>{
            var _a, _b;
            const bestNodePrice = (_a = bestNode.getPrice(oraclePriceData, slot)) !== null && _a !== void 0 ? _a : numericConstants_1.ZERO;
            const currentNodePrice = (_b = currentNode.getPrice(oraclePriceData, slot)) !== null && _b !== void 0 ? _b : numericConstants_1.ZERO;
            if (bestNodePrice.eq(currentNodePrice)) {
                return bestNode.order.slot.lt(currentNode.order.slot);
            }
            return bestNodePrice.lt(currentNodePrice);
        }, filterFcn);
    }
    /**
     * This will look at both the taking and resting limit bids
     * @param marketIndex
     * @param fallbackBid
     * @param slot
     * @param marketType
     * @param oraclePriceData
     * @param filterFcn
     */ *getBids(marketIndex, _fallbackBid, slot, marketType, oraclePriceData, filterFcn) {
        if ((0, types_1.isVariant)(marketType, 'spot') && !oraclePriceData) {
            throw new Error('Must provide OraclePriceData to get spot bids');
        }
        const generatorList = [
            this.getTakingBids(marketIndex, marketType, slot, oraclePriceData),
            this.getRestingLimitBids(marketIndex, slot, marketType, oraclePriceData)
        ];
        yield* this.getBestNode(generatorList, oraclePriceData, slot, (bestNode, currentNode, slot, oraclePriceData)=>{
            var _a, _b;
            const bestNodePrice = (_a = bestNode.getPrice(oraclePriceData, slot)) !== null && _a !== void 0 ? _a : numericConstants_1.BN_MAX;
            const currentNodePrice = (_b = currentNode.getPrice(oraclePriceData, slot)) !== null && _b !== void 0 ? _b : numericConstants_1.BN_MAX;
            if (bestNodePrice.eq(currentNodePrice)) {
                return bestNode.order.slot.lt(currentNode.order.slot);
            }
            return bestNodePrice.gt(currentNodePrice);
        }, filterFcn);
    }
    findCrossingRestingLimitOrders(marketIndex, slot, marketType, oraclePriceData) {
        const nodesToFill = new Array();
        for (const askNode of this.getRestingLimitAsks(marketIndex, slot, marketType, oraclePriceData)){
            const bidGenerator = this.getRestingLimitBids(marketIndex, slot, marketType, oraclePriceData);
            for (const bidNode of bidGenerator){
                const bidPrice = bidNode.getPrice(oraclePriceData, slot);
                const askPrice = askNode.getPrice(oraclePriceData, slot);
                // orders don't cross
                if (bidPrice.lt(askPrice)) {
                    break;
                }
                const bidOrder = bidNode.order;
                const askOrder = askNode.order;
                // Can't match orders from the same user
                const sameUser = bidNode.userAccount === askNode.userAccount;
                if (sameUser) {
                    continue;
                }
                const makerAndTaker = this.determineMakerAndTaker(askNode, bidNode);
                // unable to match maker and taker due to post only or slot
                if (!makerAndTaker) {
                    continue;
                }
                const { takerNode, makerNode } = makerAndTaker;
                const bidBaseRemaining = bidOrder.baseAssetAmount.sub(bidOrder.baseAssetAmountFilled);
                const askBaseRemaining = askOrder.baseAssetAmount.sub(askOrder.baseAssetAmountFilled);
                const baseFilled = anchor_1.BN.min(bidBaseRemaining, askBaseRemaining);
                const newBidOrder = {
                    ...bidOrder
                };
                newBidOrder.baseAssetAmountFilled = bidOrder.baseAssetAmountFilled.add(baseFilled);
                this.getListForOnChainOrder(newBidOrder, slot, bidNode.isProtectedMaker).update(newBidOrder, bidNode.userAccount);
                // ask completely filled
                const newAskOrder = {
                    ...askOrder
                };
                newAskOrder.baseAssetAmountFilled = askOrder.baseAssetAmountFilled.add(baseFilled);
                this.getListForOnChainOrder(newAskOrder, slot, askNode.isProtectedMaker).update(newAskOrder, askNode.userAccount);
                nodesToFill.push({
                    node: takerNode,
                    makerNodes: [
                        makerNode
                    ]
                });
                if (newAskOrder.baseAssetAmount.eq(newAskOrder.baseAssetAmountFilled)) {
                    break;
                }
            }
        }
        return nodesToFill;
    }
    determineMakerAndTaker(askNode, bidNode) {
        const askSlot = askNode.order.slot.add(new anchor_1.BN(askNode.order.auctionDuration));
        const bidSlot = bidNode.order.slot.add(new anchor_1.BN(bidNode.order.auctionDuration));
        if (bidNode.order.postOnly && askNode.order.postOnly) {
            return undefined;
        } else if (bidNode.order.postOnly) {
            return {
                takerNode: askNode,
                makerNode: bidNode
            };
        } else if (askNode.order.postOnly) {
            return {
                takerNode: bidNode,
                makerNode: askNode
            };
        } else if (askSlot.lte(bidSlot)) {
            return {
                takerNode: bidNode,
                makerNode: askNode
            };
        } else {
            return {
                takerNode: askNode,
                makerNode: bidNode
            };
        }
    }
    getBestAsk(marketIndex, slot, marketType, oraclePriceData) {
        const bestAsk = this.getRestingLimitAsks(marketIndex, slot, marketType, oraclePriceData).next().value;
        if (bestAsk) {
            return bestAsk.getPrice(oraclePriceData, slot);
        }
        return undefined;
    }
    getBestBid(marketIndex, slot, marketType, oraclePriceData) {
        const bestBid = this.getRestingLimitBids(marketIndex, slot, marketType, oraclePriceData).next().value;
        if (bestBid) {
            return bestBid.getPrice(oraclePriceData, slot);
        }
        return undefined;
    }
    *getStopLosses(marketIndex, marketType, direction) {
        const marketTypeStr = (0, types_1.getVariant)(marketType);
        const marketNodeLists = this.orderLists.get(marketTypeStr).get(marketIndex);
        if ((0, types_1.isVariant)(direction, 'long') && marketNodeLists.trigger.below) {
            for (const node of marketNodeLists.trigger.below.getGenerator()){
                if ((0, types_1.isVariant)(node.order.direction, 'short')) {
                    yield node;
                }
            }
        } else if ((0, types_1.isVariant)(direction, 'short') && marketNodeLists.trigger.above) {
            for (const node of marketNodeLists.trigger.above.getGenerator()){
                if ((0, types_1.isVariant)(node.order.direction, 'long')) {
                    yield node;
                }
            }
        }
    }
    *getStopLossMarkets(marketIndex, marketType, direction) {
        for (const node of this.getStopLosses(marketIndex, marketType, direction)){
            if ((0, types_1.isVariant)(node.order.orderType, 'triggerMarket')) {
                yield node;
            }
        }
    }
    *getStopLossLimits(marketIndex, marketType, direction) {
        for (const node of this.getStopLosses(marketIndex, marketType, direction)){
            if ((0, types_1.isVariant)(node.order.orderType, 'triggerLimit')) {
                yield node;
            }
        }
    }
    *getTakeProfits(marketIndex, marketType, direction) {
        const marketTypeStr = (0, types_1.getVariant)(marketType);
        const marketNodeLists = this.orderLists.get(marketTypeStr).get(marketIndex);
        if ((0, types_1.isVariant)(direction, 'long') && marketNodeLists.trigger.above) {
            for (const node of marketNodeLists.trigger.above.getGenerator()){
                if ((0, types_1.isVariant)(node.order.direction, 'short')) {
                    yield node;
                }
            }
        } else if ((0, types_1.isVariant)(direction, 'short') && marketNodeLists.trigger.below) {
            for (const node of marketNodeLists.trigger.below.getGenerator()){
                if ((0, types_1.isVariant)(node.order.direction, 'long')) {
                    yield node;
                }
            }
        }
    }
    *getTakeProfitMarkets(marketIndex, marketType, direction) {
        for (const node of this.getTakeProfits(marketIndex, marketType, direction)){
            if ((0, types_1.isVariant)(node.order.orderType, 'triggerMarket')) {
                yield node;
            }
        }
    }
    *getTakeProfitLimits(marketIndex, marketType, direction) {
        for (const node of this.getTakeProfits(marketIndex, marketType, direction)){
            if ((0, types_1.isVariant)(node.order.orderType, 'triggerLimit')) {
                yield node;
            }
        }
    }
    findNodesToTrigger(marketIndex, slot, triggerPrice, marketType, stateAccount) {
        if ((0, exchangeStatus_1.exchangePaused)(stateAccount)) {
            return [];
        }
        const nodesToTrigger = [];
        const marketTypeStr = (0, types_1.getVariant)(marketType);
        const marketNodeLists = this.orderLists.get(marketTypeStr).get(marketIndex);
        const triggerAboveList = marketNodeLists ? marketNodeLists.trigger.above : undefined;
        if (triggerAboveList) {
            for (const node of triggerAboveList.getGenerator()){
                if (triggerPrice.gt(node.order.triggerPrice)) {
                    nodesToTrigger.push({
                        node: node
                    });
                } else {
                    break;
                }
            }
        }
        const triggerBelowList = marketNodeLists ? marketNodeLists.trigger.below : undefined;
        if (triggerBelowList) {
            for (const node of triggerBelowList.getGenerator()){
                if (triggerPrice.lt(node.order.triggerPrice)) {
                    nodesToTrigger.push({
                        node: node
                    });
                } else {
                    break;
                }
            }
        }
        return nodesToTrigger;
    }
    printTop(driftClient, slotSubscriber, marketIndex, marketType) {
        if ((0, types_1.isVariant)(marketType, 'perp')) {
            const slot = slotSubscriber.getSlot();
            const oraclePriceData = driftClient.getMMOracleDataForPerpMarket(marketIndex);
            const bestAsk = this.getBestAsk(marketIndex, slot, marketType, oraclePriceData);
            const bestBid = this.getBestBid(marketIndex, slot, marketType, oraclePriceData);
            const mid = bestAsk.add(bestBid).div(new anchor_1.BN(2));
            const bidSpread = ((0, conversion_1.convertToNumber)(bestBid, numericConstants_1.PRICE_PRECISION) / (0, conversion_1.convertToNumber)(oraclePriceData.price, numericConstants_1.PRICE_PRECISION) - 1) * 100.0;
            const askSpread = ((0, conversion_1.convertToNumber)(bestAsk, numericConstants_1.PRICE_PRECISION) / (0, conversion_1.convertToNumber)(oraclePriceData.price, numericConstants_1.PRICE_PRECISION) - 1) * 100.0;
            const name = (0, userName_1.decodeName)(driftClient.getPerpMarketAccount(marketIndex).name);
            console.log(`Market ${name} Orders`);
            console.log(`  Ask`, (0, conversion_1.convertToNumber)(bestAsk, numericConstants_1.PRICE_PRECISION).toFixed(3), `(${askSpread.toFixed(4)}%)`);
            console.log(`  Mid`, (0, conversion_1.convertToNumber)(mid, numericConstants_1.PRICE_PRECISION).toFixed(3));
            console.log(`  Bid`, (0, conversion_1.convertToNumber)(bestBid, numericConstants_1.PRICE_PRECISION).toFixed(3), `(${bidSpread.toFixed(4)}%)`);
        } else if ((0, types_1.isVariant)(marketType, 'spot')) {
            const slot = slotSubscriber.getSlot();
            const oraclePriceData = driftClient.getOracleDataForSpotMarket(marketIndex);
            const bestAsk = this.getBestAsk(marketIndex, slot, types_1.MarketType.SPOT, oraclePriceData);
            const bestBid = this.getBestBid(marketIndex, slot, types_1.MarketType.SPOT, oraclePriceData);
            const mid = bestAsk.add(bestBid).div(new anchor_1.BN(2));
            const bidSpread = ((0, conversion_1.convertToNumber)(bestBid, numericConstants_1.PRICE_PRECISION) / (0, conversion_1.convertToNumber)(oraclePriceData.price, numericConstants_1.PRICE_PRECISION) - 1) * 100.0;
            const askSpread = ((0, conversion_1.convertToNumber)(bestAsk, numericConstants_1.PRICE_PRECISION) / (0, conversion_1.convertToNumber)(oraclePriceData.price, numericConstants_1.PRICE_PRECISION) - 1) * 100.0;
            const name = (0, userName_1.decodeName)(driftClient.getSpotMarketAccount(marketIndex).name);
            console.log(`Market ${name} Orders`);
            console.log(`  Ask`, (0, conversion_1.convertToNumber)(bestAsk, numericConstants_1.PRICE_PRECISION).toFixed(3), `(${askSpread.toFixed(4)}%)`);
            console.log(`  Mid`, (0, conversion_1.convertToNumber)(mid, numericConstants_1.PRICE_PRECISION).toFixed(3));
            console.log(`  Bid`, (0, conversion_1.convertToNumber)(bestBid, numericConstants_1.PRICE_PRECISION).toFixed(3), `(${bidSpread.toFixed(4)}%)`);
        }
    }
    getDLOBOrders() {
        const dlobOrders = [];
        for (const nodeList of this.getNodeLists()){
            for (const node of nodeList.getGenerator()){
                dlobOrders.push({
                    user: new web3_js_1.PublicKey(node.userAccount),
                    order: node.order
                });
            }
        }
        return dlobOrders;
    }
    *getNodeLists() {
        for (const [_, nodeLists] of this.orderLists.get('perp')){
            yield nodeLists.restingLimit.bid;
            yield nodeLists.restingLimit.ask;
            yield nodeLists.takingLimit.bid;
            yield nodeLists.takingLimit.ask;
            yield nodeLists.market.bid;
            yield nodeLists.market.ask;
            yield nodeLists.floatingLimit.bid;
            yield nodeLists.floatingLimit.ask;
            yield nodeLists.protectedFloatingLimit.bid;
            yield nodeLists.protectedFloatingLimit.ask;
            yield nodeLists.trigger.above;
            yield nodeLists.trigger.below;
        }
        for (const [_, nodeLists] of this.orderLists.get('spot')){
            yield nodeLists.restingLimit.bid;
            yield nodeLists.restingLimit.ask;
            yield nodeLists.takingLimit.bid;
            yield nodeLists.takingLimit.ask;
            yield nodeLists.market.bid;
            yield nodeLists.market.ask;
            yield nodeLists.floatingLimit.bid;
            yield nodeLists.floatingLimit.ask;
            yield nodeLists.protectedFloatingLimit.bid;
            yield nodeLists.protectedFloatingLimit.ask;
            yield nodeLists.trigger.above;
            yield nodeLists.trigger.below;
        }
    }
    /**
     * Get an L2 view of the order book for a given market.
     *
     * @param marketIndex
     * @param marketType
     * @param slot
     * @param oraclePriceData
     * @param depth how many levels of the order book to return
     * @param fallbackL2Generators L2 generators for fallback liquidity e.g. vAMM {@link getVammL2Generator}, openbook {@link SerumSubscriber}
     */ getL2({ marketIndex, marketType, slot, oraclePriceData, depth, fallbackL2Generators = [] }) {
        const makerAskL2LevelGenerator = (0, orderBookLevels_1.getL2GeneratorFromDLOBNodes)(this.getRestingLimitAsks(marketIndex, slot, marketType, oraclePriceData), oraclePriceData, slot);
        const fallbackAskGenerators = fallbackL2Generators.map((fallbackL2Generator)=>{
            return fallbackL2Generator.getL2Asks();
        });
        const askL2LevelGenerator = (0, orderBookLevels_1.mergeL2LevelGenerators)([
            makerAskL2LevelGenerator,
            ...fallbackAskGenerators
        ], (a, b)=>{
            return a.price.lt(b.price);
        });
        const asks = (0, orderBookLevels_1.createL2Levels)(askL2LevelGenerator, depth);
        const makerBidGenerator = (0, orderBookLevels_1.getL2GeneratorFromDLOBNodes)(this.getRestingLimitBids(marketIndex, slot, marketType, oraclePriceData), oraclePriceData, slot);
        const fallbackBidGenerators = fallbackL2Generators.map((fallbackOrders)=>{
            return fallbackOrders.getL2Bids();
        });
        const bidL2LevelGenerator = (0, orderBookLevels_1.mergeL2LevelGenerators)([
            makerBidGenerator,
            ...fallbackBidGenerators
        ], (a, b)=>{
            return a.price.gt(b.price);
        });
        const bids = (0, orderBookLevels_1.createL2Levels)(bidL2LevelGenerator, depth);
        return {
            bids,
            asks,
            slot
        };
    }
    /**
     * Get an L3 view of the order book for a given market. Does not include fallback liquidity sources
     *
     * @param marketIndex
     * @param marketType
     * @param slot
     * @param oraclePriceData
     */ getL3({ marketIndex, marketType, slot, oraclePriceData }) {
        const bids = [];
        const asks = [];
        const restingAsks = this.getRestingLimitAsks(marketIndex, slot, marketType, oraclePriceData);
        for (const ask of restingAsks){
            asks.push({
                price: ask.getPrice(oraclePriceData, slot),
                size: ask.order.baseAssetAmount.sub(ask.order.baseAssetAmountFilled),
                maker: new web3_js_1.PublicKey(ask.userAccount),
                orderId: ask.order.orderId
            });
        }
        const restingBids = this.getRestingLimitBids(marketIndex, slot, marketType, oraclePriceData);
        for (const bid of restingBids){
            bids.push({
                price: bid.getPrice(oraclePriceData, slot),
                size: bid.order.baseAssetAmount.sub(bid.order.baseAssetAmountFilled),
                maker: new web3_js_1.PublicKey(bid.userAccount),
                orderId: bid.order.orderId
            });
        }
        return {
            bids,
            asks,
            slot
        };
    }
    estimateFillExactBaseAmountInForSide(baseAmountIn, oraclePriceData, slot, dlobSide) {
        let runningSumQuote = numericConstants_1.ZERO;
        let runningSumBase = numericConstants_1.ZERO;
        for (const side of dlobSide){
            const price = side.getPrice(oraclePriceData, slot); //side.order.quoteAssetAmount.div(side.order.baseAssetAmount);
            const baseAmountRemaining = side.order.baseAssetAmount.sub(side.order.baseAssetAmountFilled);
            if (runningSumBase.add(baseAmountRemaining).gt(baseAmountIn)) {
                const remainingBase = baseAmountIn.sub(runningSumBase);
                runningSumBase = runningSumBase.add(remainingBase);
                runningSumQuote = runningSumQuote.add(remainingBase.mul(price));
                break;
            } else {
                runningSumBase = runningSumBase.add(baseAmountRemaining);
                runningSumQuote = runningSumQuote.add(baseAmountRemaining.mul(price));
            }
        }
        return runningSumQuote.mul(numericConstants_1.QUOTE_PRECISION).div(numericConstants_1.BASE_PRECISION.mul(numericConstants_1.PRICE_PRECISION));
    }
    /**
     *
     * @param param.marketIndex the index of the market
     * @param param.marketType the type of the market
     * @param param.baseAmount the base amount in to estimate
     * @param param.orderDirection the direction of the trade
     * @param param.slot current slot for estimating dlob node price
     * @param param.oraclePriceData the oracle price data
     * @returns the estimated quote amount filled: QUOTE_PRECISION
     */ estimateFillWithExactBaseAmount({ marketIndex, marketType, baseAmount, orderDirection, slot, oraclePriceData }) {
        if ((0, types_1.isVariant)(orderDirection, 'long')) {
            return this.estimateFillExactBaseAmountInForSide(baseAmount, oraclePriceData, slot, this.getRestingLimitAsks(marketIndex, slot, marketType, oraclePriceData));
        } else if ((0, types_1.isVariant)(orderDirection, 'short')) {
            return this.estimateFillExactBaseAmountInForSide(baseAmount, oraclePriceData, slot, this.getRestingLimitBids(marketIndex, slot, marketType, oraclePriceData));
        }
    }
    getBestMakers({ marketIndex, marketType, direction, slot, oraclePriceData, numMakers }) {
        const makers = new Map();
        const generator = (0, types_1.isVariant)(direction, 'long') ? this.getRestingLimitBids(marketIndex, slot, marketType, oraclePriceData) : this.getRestingLimitAsks(marketIndex, slot, marketType, oraclePriceData);
        for (const node of generator){
            if (!makers.has(node.userAccount.toString())) {
                makers.set(node.userAccount.toString(), new web3_js_1.PublicKey(node.userAccount));
            }
            if (makers.size === numMakers) {
                break;
            }
        }
        return Array.from(makers.values());
    }
}
exports.DLOB = DLOB;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/dlob/DLOBSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DLOBSubscriber = void 0;
const DLOB_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/dlob/DLOB.js [app-route] (ecmascript)");
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const orderBookLevels_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/dlob/orderBookLevels.js [app-route] (ecmascript)");
const protectedMakerParams_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/protectedMakerParams.js [app-route] (ecmascript)");
class DLOBSubscriber {
    constructor(config){
        this.driftClient = config.driftClient;
        this.dlobSource = config.dlobSource;
        this.slotSource = config.slotSource;
        this.updateFrequency = config.updateFrequency;
        this.protectedMakerView = config.protectedMakerView || false;
        this.dlob = new DLOB_1.DLOB(this.getProtectedMakerParamsMap());
        this.eventEmitter = new events_1.EventEmitter();
    }
    async subscribe() {
        if (this.intervalId) {
            return;
        }
        await this.updateDLOB();
        this.intervalId = setInterval(async ()=>{
            try {
                await this.updateDLOB();
                this.eventEmitter.emit('update', this.dlob);
            } catch (e) {
                this.eventEmitter.emit('error', e);
            }
        }, this.updateFrequency);
    }
    getProtectedMakerParamsMap() {
        return this.protectedMakerView ? (0, protectedMakerParams_1.getProtectedMakerParamsMap)(this.driftClient.getPerpMarketAccounts()) : undefined;
    }
    async updateDLOB() {
        this.dlob = await this.dlobSource.getDLOB(this.slotSource.getSlot(), this.getProtectedMakerParamsMap());
    }
    getDLOB() {
        return this.dlob;
    }
    /**
     * Get the L2 order book for a given market.
     *
     * @param marketName e.g. "SOL-PERP" or "SOL". If not provided, marketIndex and marketType must be provided.
     * @param marketIndex
     * @param marketType
     * @param depth Number of orders to include in the order book. Defaults to 10.
     * @param includeVamm Whether to include the VAMM orders in the order book. Defaults to false. If true, creates vAMM generator {@link getVammL2Generator} and adds it to fallbackL2Generators.
     * @param fallbackL2Generators L2 generators for fallback liquidity e.g. vAMM {@link getVammL2Generator}, openbook {@link SerumSubscriber}
     * @param latestSlot Latest slot observed via slot subscriber or similar for accuarate vamm quotes (if including the vAMM).
     */ getL2({ marketName, marketIndex, marketType, depth = 10, includeVamm = false, numVammOrders, fallbackL2Generators = [], latestSlot }) {
        if (marketName) {
            const derivedMarketInfo = this.driftClient.getMarketIndexAndType(marketName);
            if (!derivedMarketInfo) {
                throw new Error(`Market ${marketName} not found`);
            }
            marketIndex = derivedMarketInfo.marketIndex;
            marketType = derivedMarketInfo.marketType;
        } else {
            if (marketIndex === undefined || marketType === undefined) {
                throw new Error('Either marketName or marketIndex and marketType must be provided');
            }
        }
        let oraclePriceData;
        const isPerp = (0, types_1.isVariant)(marketType, 'perp');
        if (isPerp) {
            const perpMarketAccount = this.driftClient.getPerpMarketAccount(marketIndex);
            oraclePriceData = this.driftClient.getOracleDataForPerpMarket(perpMarketAccount.marketIndex);
        } else {
            oraclePriceData = this.driftClient.getOracleDataForSpotMarket(marketIndex);
        }
        if (isPerp && includeVamm) {
            if (fallbackL2Generators.length > 0) {
                throw new Error('includeVamm can only be used if fallbackL2Generators is empty');
            }
            fallbackL2Generators = [
                (0, orderBookLevels_1.getVammL2Generator)({
                    marketAccount: this.driftClient.getPerpMarketAccount(marketIndex),
                    mmOraclePriceData: this.driftClient.getMMOracleDataForPerpMarket(marketIndex),
                    numOrders: numVammOrders !== null && numVammOrders !== void 0 ? numVammOrders : depth,
                    topOfBookQuoteAmounts: marketIndex < 3 ? orderBookLevels_1.MAJORS_TOP_OF_BOOK_QUOTE_AMOUNTS : orderBookLevels_1.DEFAULT_TOP_OF_BOOK_QUOTE_AMOUNTS,
                    latestSlot
                })
            ];
        }
        return this.dlob.getL2({
            marketIndex,
            marketType,
            depth,
            oraclePriceData,
            slot: this.slotSource.getSlot(),
            fallbackL2Generators: fallbackL2Generators
        });
    }
    /**
     * Get the L3 order book for a given market.
     *
     * @param marketName e.g. "SOL-PERP" or "SOL". If not provided, marketIndex and marketType must be provided.
     * @param marketIndex
     * @param marketType
     */ getL3({ marketName, marketIndex, marketType }) {
        if (marketName) {
            const derivedMarketInfo = this.driftClient.getMarketIndexAndType(marketName);
            if (!derivedMarketInfo) {
                throw new Error(`Market ${marketName} not found`);
            }
            marketIndex = derivedMarketInfo.marketIndex;
            marketType = derivedMarketInfo.marketType;
        } else {
            if (marketIndex === undefined || marketType === undefined) {
                throw new Error('Either marketName or marketIndex and marketType must be provided');
            }
        }
        let oraclePriceData;
        const isPerp = (0, types_1.isVariant)(marketType, 'perp');
        if (isPerp) {
            oraclePriceData = this.driftClient.getOracleDataForPerpMarket(marketIndex);
        } else {
            oraclePriceData = this.driftClient.getOracleDataForSpotMarket(marketIndex);
        }
        return this.dlob.getL3({
            marketIndex,
            marketType,
            oraclePriceData,
            slot: this.slotSource.getSlot()
        });
    }
    async unsubscribe() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
    }
}
exports.DLOBSubscriber = DLOBSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/dlob/types.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/userMap/WebsocketSubscription.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WebsocketSubscription = void 0;
const memcmp_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/memcmp.js [app-route] (ecmascript)");
const webSocketProgramAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketProgramAccountSubscriber.js [app-route] (ecmascript)");
class WebsocketSubscription {
    constructor({ userMap, commitment, skipInitialLoad = false, resubOpts, includeIdle = false, decodeFn, additionalFilters = undefined }){
        this.userMap = userMap;
        this.commitment = commitment;
        this.skipInitialLoad = skipInitialLoad;
        this.resubOpts = resubOpts;
        this.includeIdle = includeIdle || false;
        this.decodeFn = decodeFn;
        this.additionalFilters = additionalFilters;
    }
    async subscribe() {
        if (!this.subscriber) {
            const filters = [
                (0, memcmp_1.getUserFilter)()
            ];
            if (!this.includeIdle) {
                filters.push((0, memcmp_1.getNonIdleUserFilter)());
            }
            if (this.additionalFilters) {
                filters.push(...this.additionalFilters);
            }
            this.subscriber = new webSocketProgramAccountSubscriber_1.WebSocketProgramAccountSubscriber('UserMap', 'User', this.userMap.driftClient.program, this.decodeFn, {
                filters,
                commitment: this.commitment
            }, this.resubOpts);
        }
        await this.subscriber.subscribe((accountId, account, context)=>{
            const userKey = accountId.toBase58();
            this.userMap.updateUserAccount(userKey, account, context.slot);
        });
        if (!this.skipInitialLoad) {
            await this.userMap.sync();
        }
    }
    async unsubscribe() {
        if (!this.subscriber) return;
        await this.subscriber.unsubscribe();
        this.subscriber = undefined;
    }
}
exports.WebsocketSubscription = WebsocketSubscription;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/userMap/PollingSubscription.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PollingSubscription = void 0;
class PollingSubscription {
    constructor({ userMap, frequency, skipInitialLoad = false }){
        this.userMap = userMap;
        this.frequency = frequency;
        this.skipInitialLoad = skipInitialLoad;
    }
    async subscribe() {
        if (this.intervalId || this.frequency <= 0) {
            return;
        }
        const executeSync = async ()=>{
            await this.userMap.sync();
            this.intervalId = setTimeout(executeSync, this.frequency);
        };
        if (!this.skipInitialLoad) {
            await this.userMap.sync();
        }
        executeSync();
    }
    async unsubscribe() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
    }
}
exports.PollingSubscription = PollingSubscription;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/userMap/grpcSubscription.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.grpcSubscription = void 0;
const memcmp_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/memcmp.js [app-route] (ecmascript)");
const grpcProgramAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/grpcProgramAccountSubscriber.js [app-route] (ecmascript)");
class grpcSubscription {
    constructor({ grpcConfigs, userMap, skipInitialLoad = false, resubOpts, includeIdle = false, decodeFn, additionalFilters = undefined }){
        this.userMap = userMap;
        this.skipInitialLoad = skipInitialLoad;
        this.resubOpts = resubOpts;
        this.includeIdle = includeIdle || false;
        this.decodeFn = decodeFn;
        this.grpcConfigs = grpcConfigs;
        this.additionalFilters = additionalFilters;
    }
    async subscribe() {
        if (!this.subscriber) {
            const filters = [
                (0, memcmp_1.getUserFilter)()
            ];
            if (!this.includeIdle) {
                filters.push((0, memcmp_1.getNonIdleUserFilter)());
            }
            if (this.additionalFilters) {
                filters.push(...this.additionalFilters);
            }
            this.subscriber = await grpcProgramAccountSubscriber_1.grpcProgramAccountSubscriber.create(this.grpcConfigs, 'UserMap', 'User', this.userMap.driftClient.program, this.decodeFn, {
                filters
            }, this.resubOpts);
        }
        await this.subscriber.subscribe((accountId, account, context)=>{
            const userKey = accountId.toBase58();
            this.userMap.updateUserAccount(userKey, account, context.slot);
        });
        if (!this.skipInitialLoad) {
            await this.userMap.sync();
        }
    }
    async unsubscribe() {
        if (!this.subscriber) return;
        await this.subscriber.unsubscribe();
        this.subscriber = undefined;
    }
}
exports.grpcSubscription = grpcSubscription;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/userMap/userMap.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserMap = void 0;
const user_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/user.js [app-route] (ecmascript)");
const DLOB_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/dlob/DLOB.js [app-route] (ecmascript)");
const oneShotUserAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/oneShotUserAccountSubscriber.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const buffer_1 = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)");
const zstddec_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/zstddec@0.1.0/node_modules/zstddec/dist/zstddec.cjs [app-route] (ecmascript)");
const memcmp_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/memcmp.js [app-route] (ecmascript)");
const WebsocketSubscription_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/userMap/WebsocketSubscription.js [app-route] (ecmascript)");
const PollingSubscription_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/userMap/PollingSubscription.js [app-route] (ecmascript)");
const user_2 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/decode/user.js [app-route] (ecmascript)");
const grpcSubscription_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/userMap/grpcSubscription.js [app-route] (ecmascript)");
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
const MAX_USER_ACCOUNT_SIZE_BYTES = 4376;
class UserMap {
    /**
     * Constructs a new UserMap instance.
     */ constructor(config){
        var _a, _b, _c, _d, _e, _f;
        this.userMap = new Map();
        this.stateAccountUpdateCallback = async (state)=>{
            if (!state.numberOfSubAccounts.eq(this.lastNumberOfSubAccounts)) {
                await this.sync();
                this.lastNumberOfSubAccounts = state.numberOfSubAccounts;
            }
        };
        this.mostRecentSlot = 0;
        this.driftClient = config.driftClient;
        if (config.connection) {
            this.connection = config.connection;
        } else {
            this.connection = this.driftClient.connection;
        }
        this.commitment = config.subscriptionConfig.type === 'websocket' || config.subscriptionConfig.type === 'polling' ? (_a = config.subscriptionConfig.commitment) !== null && _a !== void 0 ? _a : this.driftClient.opts.commitment : this.driftClient.opts.commitment;
        this.includeIdle = (_b = config.includeIdle) !== null && _b !== void 0 ? _b : false;
        this.filterByPoolId = config.filterByPoolId;
        this.additionalFilters = config.additionalFilters;
        this.disableSyncOnTotalAccountsChange = (_c = config.disableSyncOnTotalAccountsChange) !== null && _c !== void 0 ? _c : false;
        let decodeFn;
        if ((_d = config.fastDecode) !== null && _d !== void 0 ? _d : true) {
            decodeFn = (name, buffer)=>(0, user_2.decodeUser)(buffer);
        } else {
            decodeFn = this.driftClient.program.account.user.coder.accounts.decodeUnchecked.bind(this.driftClient.program.account.user.coder.accounts);
        }
        this.decode = decodeFn;
        if (config.subscriptionConfig.type === 'polling') {
            this.subscription = new PollingSubscription_1.PollingSubscription({
                userMap: this,
                frequency: config.subscriptionConfig.frequency,
                skipInitialLoad: config.skipInitialLoad
            });
        } else if (config.subscriptionConfig.type === 'grpc') {
            this.subscription = new grpcSubscription_1.grpcSubscription({
                userMap: this,
                grpcConfigs: config.subscriptionConfig.grpcConfigs,
                resubOpts: {
                    resubTimeoutMs: config.subscriptionConfig.resubTimeoutMs,
                    logResubMessages: config.subscriptionConfig.logResubMessages
                },
                skipInitialLoad: config.skipInitialLoad,
                decodeFn
            });
        } else {
            this.subscription = new WebsocketSubscription_1.WebsocketSubscription({
                userMap: this,
                commitment: this.commitment,
                resubOpts: {
                    resubTimeoutMs: config.subscriptionConfig.resubTimeoutMs,
                    logResubMessages: config.subscriptionConfig.logResubMessages
                },
                skipInitialLoad: config.skipInitialLoad,
                decodeFn
            });
        }
        this.syncConfig = (_e = config.syncConfig) !== null && _e !== void 0 ? _e : {
            type: 'default'
        };
        // Whether to throw an error if the userMap fails to sync. Defaults to false.
        this.throwOnFailedSync = (_f = config.throwOnFailedSync) !== null && _f !== void 0 ? _f : false;
        this.eventEmitter = new events_1.EventEmitter();
    }
    async subscribe() {
        if (this.size() > 0) {
            return;
        }
        await this.driftClient.subscribe();
        this.lastNumberOfSubAccounts = this.driftClient.getStateAccount().numberOfSubAccounts;
        if (!this.disableSyncOnTotalAccountsChange) {
            this.driftClient.eventEmitter.on('stateAccountUpdate', this.stateAccountUpdateCallback);
        }
        await this.subscription.subscribe();
    }
    async addPubkey(userAccountPublicKey, userAccount, slot, accountSubscription) {
        var _a;
        const user = new user_1.User({
            driftClient: this.driftClient,
            userAccountPublicKey,
            accountSubscription: accountSubscription !== null && accountSubscription !== void 0 ? accountSubscription : {
                type: 'custom',
                // OneShotUserAccountSubscriber used here so we don't load up the RPC with AccountSubscribes
                userAccountSubscriber: new oneShotUserAccountSubscriber_1.OneShotUserAccountSubscriber(this.driftClient.program, userAccountPublicKey, userAccount, slot, this.commitment)
            }
        });
        await user.subscribe(userAccount);
        this.userMap.set(userAccountPublicKey.toString(), {
            data: user,
            slot: slot !== null && slot !== void 0 ? slot : (_a = user.getUserAccountAndSlot()) === null || _a === void 0 ? void 0 : _a.slot
        });
        this.eventEmitter.emit('userUpdate', user);
    }
    has(key) {
        return this.userMap.has(key);
    }
    /**
     * gets the User for a particular userAccountPublicKey, if no User exists, undefined is returned
     * @param key userAccountPublicKey to get User for
     * @returns user User | undefined
     */ get(key) {
        var _a;
        return (_a = this.userMap.get(key)) === null || _a === void 0 ? void 0 : _a.data;
    }
    getWithSlot(key) {
        return this.userMap.get(key);
    }
    /**
     * gets the User for a particular userAccountPublicKey, if no User exists, new one is created
     * @param key userAccountPublicKey to get User for
     * @returns  User
     */ async mustGet(key, accountSubscription) {
        if (!this.has(key)) {
            await this.addPubkey(new web3_js_1.PublicKey(key), undefined, undefined, accountSubscription);
        }
        return this.userMap.get(key).data;
    }
    async mustGetWithSlot(key, accountSubscription) {
        if (!this.has(key)) {
            await this.addPubkey(new web3_js_1.PublicKey(key), undefined, undefined, accountSubscription);
        }
        return this.userMap.get(key);
    }
    async mustGetUserAccount(key) {
        const user = await this.mustGet(key);
        return user.getUserAccount();
    }
    /**
     * gets the Authority for a particular userAccountPublicKey, if no User exists, undefined is returned
     * @param key userAccountPublicKey to get User for
     * @returns authority PublicKey | undefined
     */ getUserAuthority(key) {
        const user = this.userMap.get(key);
        if (!user) {
            return undefined;
        }
        return user.data.getUserAccount().authority;
    }
    /**
     * implements the {@link DLOBSource} interface
     * create a DLOB from all the subscribed users
     * @param slot
     */ async getDLOB(slot, protectedMakerParamsMap) {
        const dlob = new DLOB_1.DLOB(protectedMakerParamsMap);
        await dlob.initFromUserMap(this, slot);
        return dlob;
    }
    async updateWithOrderRecord(record) {
        if (!this.has(record.user.toString())) {
            await this.addPubkey(record.user);
        }
    }
    async updateWithEventRecord(record) {
        if (record.eventType === 'DepositRecord') {
            const depositRecord = record;
            await this.mustGet(depositRecord.user.toString());
        } else if (record.eventType === 'FundingPaymentRecord') {
            const fundingPaymentRecord = record;
            await this.mustGet(fundingPaymentRecord.user.toString());
        } else if (record.eventType === 'LiquidationRecord') {
            const liqRecord = record;
            await this.mustGet(liqRecord.user.toString());
            await this.mustGet(liqRecord.liquidator.toString());
        } else if (record.eventType === 'OrderRecord') {
            const orderRecord = record;
            await this.updateWithOrderRecord(orderRecord);
        } else if (record.eventType === 'OrderActionRecord') {
            const actionRecord = record;
            if (actionRecord.taker) {
                await this.mustGet(actionRecord.taker.toString());
            }
            if (actionRecord.maker) {
                await this.mustGet(actionRecord.maker.toString());
            }
        } else if (record.eventType === 'SettlePnlRecord') {
            const settlePnlRecord = record;
            await this.mustGet(settlePnlRecord.user.toString());
        } else if (record.eventType === 'NewUserRecord') {
            const newUserRecord = record;
            await this.mustGet(newUserRecord.user.toString());
        } else if (record.eventType === 'LPRecord') {
            const lpRecord = record;
            await this.mustGet(lpRecord.user.toString());
        }
    }
    *values() {
        for (const dataAndSlot of this.userMap.values()){
            yield dataAndSlot.data;
        }
    }
    valuesWithSlot() {
        return this.userMap.values();
    }
    *entries() {
        for (const [key, dataAndSlot] of this.userMap.entries()){
            yield [
                key,
                dataAndSlot.data
            ];
        }
    }
    entriesWithSlot() {
        return this.userMap.entries();
    }
    size() {
        return this.userMap.size;
    }
    /**
     * Returns a unique list of authorities for all users in the UserMap that meet the filter criteria
     * @param filterCriteria: Users must meet these criteria to be included
     * @returns
     */ getUniqueAuthorities(filterCriteria) {
        const usersMeetingCriteria = Array.from(this.values()).filter((user)=>{
            let pass = true;
            if (filterCriteria && filterCriteria.hasOpenOrders) {
                pass = pass && user.getUserAccount().hasOpenOrder;
            }
            return pass;
        });
        const userAuths = new Set(usersMeetingCriteria.map((user)=>user.getUserAccount().authority.toBase58()));
        const userAuthKeys = Array.from(userAuths).map((userAuth)=>new web3_js_1.PublicKey(userAuth));
        return userAuthKeys;
    }
    async sync() {
        if (this.syncConfig.type === 'default') {
            return this.defaultSync();
        } else {
            return this.paginatedSync();
        }
    }
    getFilters() {
        const filters = [
            (0, memcmp_1.getUserFilter)()
        ];
        if (!this.includeIdle) {
            filters.push((0, memcmp_1.getNonIdleUserFilter)());
        }
        if (this.filterByPoolId !== undefined) {
            filters.push((0, memcmp_1.getUsersWithPoolId)(this.filterByPoolId));
        }
        if (this.additionalFilters) {
            filters.push(...this.additionalFilters);
        }
        return filters;
    }
    /**
     * Syncs the UserMap using the default sync method (single getProgramAccounts call with filters).
     * This method may fail when drift has too many users. (nodejs response size limits)
     * @returns
     */ async defaultSync() {
        var _a;
        if (this.syncPromise) {
            return this.syncPromise;
        }
        this.syncPromise = new Promise((resolver)=>{
            this.syncPromiseResolver = resolver;
        });
        try {
            const rpcRequestArgs = [
                this.driftClient.program.programId.toBase58(),
                {
                    commitment: this.commitment,
                    filters: this.getFilters(),
                    encoding: 'base64+zstd',
                    withContext: true
                }
            ];
            // @ts-ignore
            const rpcJSONResponse = await this.connection._rpcRequest('getProgramAccounts', rpcRequestArgs);
            const rpcResponseAndContext = rpcJSONResponse.result;
            const slot = rpcResponseAndContext.context.slot;
            this.updateLatestSlot(slot);
            const programAccountBufferMap = new Map();
            const decodingPromises = rpcResponseAndContext.value.map(async (programAccount)=>{
                const compressedUserData = buffer_1.Buffer.from(programAccount.account.data[0], 'base64');
                const decoder = new zstddec_1.ZSTDDecoder();
                await decoder.init();
                const userBuffer = decoder.decode(compressedUserData, MAX_USER_ACCOUNT_SIZE_BYTES);
                programAccountBufferMap.set(programAccount.pubkey.toString(), buffer_1.Buffer.from(userBuffer));
            });
            await Promise.all(decodingPromises);
            const promises = Array.from(programAccountBufferMap.entries()).map(([key, buffer])=>(async ()=>{
                    const currAccountWithSlot = this.getWithSlot(key);
                    if (currAccountWithSlot) {
                        if (slot >= currAccountWithSlot.slot) {
                            const userAccount = this.decode('User', buffer);
                            this.updateUserAccount(key, userAccount, slot);
                        }
                    } else {
                        const userAccount = this.decode('User', buffer);
                        await this.addPubkey(new web3_js_1.PublicKey(key), userAccount, slot);
                    }
                })());
            await Promise.all(promises);
            for (const [key] of this.entries()){
                if (!programAccountBufferMap.has(key)) {
                    const user = this.get(key);
                    if (user) {
                        await user.unsubscribe();
                        this.userMap.delete(key);
                    }
                }
            }
        } catch (err) {
            const e = err;
            console.error(`Error in UserMap.sync(): ${e.message} ${(_a = e.stack) !== null && _a !== void 0 ? _a : ''}`);
            if (this.throwOnFailedSync) {
                throw e;
            }
        } finally{
            this.syncPromiseResolver();
            this.syncPromise = undefined;
        }
    }
    /**
     * Syncs the UserMap using the paginated sync method (multiple getMultipleAccounts calls with filters).
     * This method is more reliable when drift has many users.
     * @returns
     */ async paginatedSync() {
        var _a, _b;
        if (this.syncPromise) {
            return this.syncPromise;
        }
        this.syncPromise = new Promise((resolve)=>{
            this.syncPromiseResolver = resolve;
        });
        try {
            const accountsPrefetch = await this.connection.getProgramAccounts(this.driftClient.program.programId, {
                dataSlice: {
                    offset: 0,
                    length: 0
                },
                filters: this.getFilters()
            });
            const accountPublicKeys = accountsPrefetch.map((account)=>account.pubkey);
            const limitConcurrency = async (tasks, limit)=>{
                const executing = [];
                const results = [];
                for(let i = 0; i < tasks.length; i++){
                    const executor = Promise.resolve().then(tasks[i]);
                    results.push(executor);
                    if (executing.length < limit) {
                        executing.push(executor);
                        executor.finally(()=>{
                            const index = executing.indexOf(executor);
                            if (index > -1) {
                                executing.splice(index, 1);
                            }
                        });
                    } else {
                        await Promise.race(executing);
                    }
                }
                return Promise.all(results);
            };
            const programAccountBufferMap = new Map();
            // @ts-ignore
            const chunkSize = (_a = this.syncConfig.chunkSize) !== null && _a !== void 0 ? _a : 100;
            const tasks = [];
            for(let i = 0; i < accountPublicKeys.length; i += chunkSize){
                const chunk = accountPublicKeys.slice(i, i + chunkSize);
                tasks.push(async ()=>{
                    const accountInfos = await this.connection.getMultipleAccountsInfoAndContext(chunk, {
                        commitment: this.commitment
                    });
                    const accountInfosSlot = accountInfos.context.slot;
                    for(let j = 0; j < accountInfos.value.length; j += 1){
                        const accountInfo = accountInfos.value[j];
                        if (accountInfo === null) continue;
                        const publicKeyString = chunk[j].toString();
                        const buffer = buffer_1.Buffer.from(accountInfo.data);
                        programAccountBufferMap.set(publicKeyString, buffer);
                        const decodedUser = this.decode('User', buffer);
                        const currAccountWithSlot = this.getWithSlot(publicKeyString);
                        if (currAccountWithSlot && currAccountWithSlot.slot <= accountInfosSlot) {
                            this.updateUserAccount(publicKeyString, decodedUser, accountInfosSlot);
                        } else {
                            await this.addPubkey(new web3_js_1.PublicKey(publicKeyString), decodedUser, accountInfosSlot);
                        }
                    }
                });
            }
            // @ts-ignore
            const concurrencyLimit = (_b = this.syncConfig.concurrencyLimit) !== null && _b !== void 0 ? _b : 10;
            await limitConcurrency(tasks, concurrencyLimit);
            for (const [key] of this.entries()){
                if (!programAccountBufferMap.has(key)) {
                    const user = this.get(key);
                    if (user) {
                        await user.unsubscribe();
                        this.userMap.delete(key);
                    }
                }
            }
        } catch (err) {
            console.error(`Error in UserMap.sync():`, err);
            if (this.throwOnFailedSync) {
                throw err;
            }
        } finally{
            if (this.syncPromiseResolver) {
                this.syncPromiseResolver();
            }
            this.syncPromise = undefined;
        }
    }
    async unsubscribe() {
        await this.subscription.unsubscribe();
        for (const [key, user] of this.entries()){
            await user.unsubscribe();
            this.userMap.delete(key);
        }
        if (this.lastNumberOfSubAccounts) {
            if (!this.disableSyncOnTotalAccountsChange) {
                this.driftClient.eventEmitter.removeListener('stateAccountUpdate', this.stateAccountUpdateCallback);
            }
            this.lastNumberOfSubAccounts = undefined;
        }
    }
    async updateUserAccount(key, userAccount, slot) {
        const userWithSlot = this.getWithSlot(key);
        this.updateLatestSlot(slot);
        if (userWithSlot) {
            if (slot >= userWithSlot.slot) {
                userWithSlot.data.accountSubscriber.updateData(userAccount, slot);
                this.userMap.set(key, {
                    data: userWithSlot.data,
                    slot
                });
                this.eventEmitter.emit('userUpdate', userWithSlot.data);
            }
        } else {
            this.addPubkey(new web3_js_1.PublicKey(key), userAccount, slot);
        }
    }
    updateLatestSlot(slot) {
        this.mostRecentSlot = Math.max(slot, this.mostRecentSlot);
    }
    getSlot() {
        return this.mostRecentSlot;
    }
}
exports.UserMap = UserMap;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/userMap/referrerMap.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReferrerMap = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const pda_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/addresses/pda.js [app-route] (ecmascript)");
const memcmp_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/memcmp.js [app-route] (ecmascript)");
const bytes_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/cjs/utils/bytes/index.js [app-route] (ecmascript)");
const DEFAULT_PUBLIC_KEY = web3_js_1.PublicKey.default.toBase58();
class ReferrerMap {
    /**
     * Creates a new UserStatsMap instance.
     *
     * @param {DriftClient} driftClient - The DriftClient instance.
     */ constructor(driftClient, parallelSync){
        /**
         * map from authority pubkey to referrer pubkey.
         */ this.authorityReferrerMap = new Map();
        /**
         * map from referrer pubkey to ReferrerInfo.
         * Will be undefined if the referrer is not in the map yet.
         */ this.referrerReferrerInfoMap = new Map();
        this.driftClient = driftClient;
        this.parallelSync = parallelSync !== undefined ? parallelSync : true;
    }
    /**
     * Subscribe to all UserStats accounts.
     */ async subscribe() {
        if (this.size() > 0) {
            return;
        }
        await this.driftClient.subscribe();
        await this.sync();
    }
    has(authorityPublicKey) {
        return this.authorityReferrerMap.has(authorityPublicKey);
    }
    get(authorityPublicKey) {
        return this.getReferrer(authorityPublicKey);
    }
    async addReferrer(authority, referrer) {
        if (referrer) {
            this.authorityReferrerMap.set(authority, referrer);
        } else if (referrer === undefined) {
            const userStatsAccountPublicKey = (0, pda_1.getUserStatsAccountPublicKey)(this.driftClient.program.programId, new web3_js_1.PublicKey(authority));
            const buffer = (await this.driftClient.connection.getAccountInfo(userStatsAccountPublicKey, 'processed')).data;
            const referrer = bytes_1.bs58.encode(buffer.subarray(40, 72));
            this.addReferrer(authority, referrer);
        }
    }
    /**
     * Enforce that a UserStats will exist for the given authorityPublicKey,
     * reading one from the blockchain if necessary.
     * @param authorityPublicKey
     * @returns
     */ async mustGet(authorityPublicKey) {
        if (!this.has(authorityPublicKey)) {
            await this.addReferrer(authorityPublicKey);
        }
        return this.getReferrer(authorityPublicKey);
    }
    getReferrer(authorityPublicKey) {
        const referrer = this.authorityReferrerMap.get(authorityPublicKey);
        if (!referrer) {
            // return undefined if the referrer is not in the map
            return undefined;
        }
        if (referrer === DEFAULT_PUBLIC_KEY) {
            return undefined;
        }
        if (this.referrerReferrerInfoMap.has(referrer)) {
            return this.referrerReferrerInfoMap.get(referrer);
        }
        const referrerKey = new web3_js_1.PublicKey(referrer);
        const referrerInfo = {
            referrer: (0, pda_1.getUserAccountPublicKeySync)(this.driftClient.program.programId, referrerKey, 0),
            referrerStats: (0, pda_1.getUserStatsAccountPublicKey)(this.driftClient.program.programId, referrerKey)
        };
        this.referrerReferrerInfoMap.set(referrer, referrerInfo);
        return referrerInfo;
    }
    size() {
        return this.authorityReferrerMap.size;
    }
    numberOfReferred() {
        return Array.from(this.authorityReferrerMap.values()).filter((referrer)=>referrer !== DEFAULT_PUBLIC_KEY).length;
    }
    async sync() {
        if (this.fetchPromise) {
            return this.fetchPromise;
        }
        this.fetchPromise = new Promise((resolver)=>{
            this.fetchPromiseResolver = resolver;
        });
        try {
            if (this.parallelSync) {
                await Promise.all([
                    this.syncAll(),
                    this.syncReferrer((0, memcmp_1.getUserStatsIsReferredFilter)()),
                    this.syncReferrer((0, memcmp_1.getUserStatsIsReferredOrReferrerFilter)())
                ]);
            } else {
                await this.syncAll();
                await this.syncReferrer((0, memcmp_1.getUserStatsIsReferredFilter)());
                await this.syncReferrer((0, memcmp_1.getUserStatsIsReferredOrReferrerFilter)());
            }
        } finally{
            this.fetchPromiseResolver();
            this.fetchPromise = undefined;
        }
    }
    async syncAll() {
        const rpcRequestArgs = [
            this.driftClient.program.programId.toBase58(),
            {
                commitment: this.driftClient.opts.commitment,
                filters: [
                    (0, memcmp_1.getUserStatsFilter)()
                ],
                encoding: 'base64',
                dataSlice: {
                    offset: 0,
                    length: 0
                },
                withContext: true
            }
        ];
        const rpcJSONResponse = // @ts-ignore
        await this.driftClient.connection._rpcRequest('getProgramAccounts', rpcRequestArgs);
        const rpcResponseAndContext = rpcJSONResponse.result;
        for (const account of rpcResponseAndContext.value){
            // only add if it isn't already in the map
            // so that if syncReferrer already set it, we dont overwrite
            if (!this.has(account.pubkey)) {
                this.addReferrer(account.pubkey, DEFAULT_PUBLIC_KEY);
            }
        }
    }
    async syncReferrer(referrerFilter) {
        const rpcRequestArgs = [
            this.driftClient.program.programId.toBase58(),
            {
                commitment: this.driftClient.opts.commitment,
                filters: [
                    (0, memcmp_1.getUserStatsFilter)(),
                    referrerFilter
                ],
                encoding: 'base64',
                dataSlice: {
                    offset: 0,
                    length: 72
                },
                withContext: true
            }
        ];
        const rpcJSONResponse = // @ts-ignore
        await this.driftClient.connection._rpcRequest('getProgramAccounts', rpcRequestArgs);
        const rpcResponseAndContext = rpcJSONResponse.result;
        const batchSize = 1000;
        for(let i = 0; i < rpcResponseAndContext.value.length; i += batchSize){
            const batch = rpcResponseAndContext.value.slice(i, i + batchSize);
            await Promise.all(batch.map(async (programAccount)=>{
                // @ts-ignore
                const buffer = Buffer.from(programAccount.account.data[0], programAccount.account.data[1]);
                const authority = bytes_1.bs58.encode(buffer.subarray(8, 40));
                const referrer = bytes_1.bs58.encode(buffer.subarray(40, 72));
                this.addReferrer(authority, referrer);
            }));
            await new Promise((resolve)=>setTimeout(resolve, 0));
        }
    }
    async unsubscribe() {
        this.authorityReferrerMap.clear();
        this.referrerReferrerInfoMap.clear();
    }
}
exports.ReferrerMap = ReferrerMap;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/userMap/userStatsMap.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserStatsMap = void 0;
const pda_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/addresses/pda.js [app-route] (ecmascript)");
const userStats_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/userStats.js [app-route] (ecmascript)");
const bulkAccountLoader_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/bulkAccountLoader.js [app-route] (ecmascript)");
const memcmp_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/memcmp.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
class UserStatsMap {
    /**
     * Creates a new UserStatsMap instance.
     *
     * @param {DriftClient} driftClient - The DriftClient instance.
     * @param {BulkAccountLoader} [bulkAccountLoader] - If not provided, a new BulkAccountLoader with polling disabled will be created.
     */ constructor(driftClient, bulkAccountLoader, syncConfig){
        /**
         * map from authority pubkey to UserStats
         */ this.userStatsMap = new Map();
        this.driftClient = driftClient;
        if (!bulkAccountLoader) {
            bulkAccountLoader = new bulkAccountLoader_1.BulkAccountLoader(driftClient.connection, driftClient.opts.commitment, 0);
        }
        this.bulkAccountLoader = bulkAccountLoader;
        this.syncConfig = syncConfig !== null && syncConfig !== void 0 ? syncConfig : {
            type: 'default'
        };
        this.decode = this.driftClient.program.account.userStats.coder.accounts.decodeUnchecked.bind(this.driftClient.program.account.userStats.coder.accounts);
    }
    async subscribe(authorities) {
        if (this.size() > 0) {
            return;
        }
        await this.driftClient.subscribe();
        await this.sync(authorities);
    }
    /**
     *
     * @param authority that owns the UserStatsAccount
     * @param userStatsAccount optional UserStatsAccount to subscribe to, if undefined will be fetched later
     * @param skipFetch if true, will not immediately fetch the UserStatsAccount
     */ async addUserStat(authority, userStatsAccount, skipFetch) {
        const userStat = new userStats_1.UserStats({
            driftClient: this.driftClient,
            userStatsAccountPublicKey: (0, pda_1.getUserStatsAccountPublicKey)(this.driftClient.program.programId, authority),
            accountSubscription: {
                type: 'polling',
                accountLoader: this.bulkAccountLoader
            }
        });
        if (skipFetch) {
            await userStat.accountSubscriber.addToAccountLoader();
        } else {
            await userStat.subscribe(userStatsAccount);
        }
        this.userStatsMap.set(authority.toString(), userStat);
    }
    async updateWithOrderRecord(record, userMap) {
        const user = await userMap.mustGet(record.user.toString());
        if (!this.has(user.getUserAccount().authority.toString())) {
            await this.addUserStat(user.getUserAccount().authority, undefined, false);
        }
    }
    async updateWithEventRecord(record, userMap) {
        if (record.eventType === 'DepositRecord') {
            const depositRecord = record;
            await this.mustGet(depositRecord.userAuthority.toString());
        } else if (record.eventType === 'FundingPaymentRecord') {
            const fundingPaymentRecord = record;
            await this.mustGet(fundingPaymentRecord.userAuthority.toString());
        } else if (record.eventType === 'LiquidationRecord') {
            if (!userMap) {
                return;
            }
            const liqRecord = record;
            const user = await userMap.mustGet(liqRecord.user.toString());
            await this.mustGet(user.getUserAccount().authority.toString());
            const liquidatorUser = await userMap.mustGet(liqRecord.liquidator.toString());
            await this.mustGet(liquidatorUser.getUserAccount().authority.toString());
        } else if (record.eventType === 'OrderRecord') {
            if (!userMap) {
                return;
            }
            const orderRecord = record;
            await userMap.updateWithOrderRecord(orderRecord);
        } else if (record.eventType === 'OrderActionRecord') {
            if (!userMap) {
                return;
            }
            const actionRecord = record;
            if (actionRecord.taker) {
                const taker = await userMap.mustGet(actionRecord.taker.toString());
                await this.mustGet(taker.getUserAccount().authority.toString());
            }
            if (actionRecord.maker) {
                const maker = await userMap.mustGet(actionRecord.maker.toString());
                await this.mustGet(maker.getUserAccount().authority.toString());
            }
        } else if (record.eventType === 'SettlePnlRecord') {
            if (!userMap) {
                return;
            }
            const settlePnlRecord = record;
            const user = await userMap.mustGet(settlePnlRecord.user.toString());
            await this.mustGet(user.getUserAccount().authority.toString());
        } else if (record.eventType === 'NewUserRecord') {
            const newUserRecord = record;
            await this.mustGet(newUserRecord.userAuthority.toString());
        } else if (record.eventType === 'LPRecord') {
            if (!userMap) {
                return;
            }
            const lpRecord = record;
            const user = await userMap.mustGet(lpRecord.user.toString());
            await this.mustGet(user.getUserAccount().authority.toString());
        } else if (record.eventType === 'InsuranceFundStakeRecord') {
            const ifStakeRecord = record;
            await this.mustGet(ifStakeRecord.userAuthority.toString());
        }
    }
    has(authorityPublicKey) {
        return this.userStatsMap.has(authorityPublicKey);
    }
    get(authorityPublicKey) {
        return this.userStatsMap.get(authorityPublicKey);
    }
    /**
     * Enforce that a UserStats will exist for the given authorityPublicKey,
     * reading one from the blockchain if necessary.
     * @param authorityPublicKey
     * @returns
     */ async mustGet(authorityPublicKey) {
        if (!this.has(authorityPublicKey)) {
            await this.addUserStat(new web3_js_1.PublicKey(authorityPublicKey), undefined, false);
        }
        return this.get(authorityPublicKey);
    }
    values() {
        return this.userStatsMap.values();
    }
    size() {
        return this.userStatsMap.size;
    }
    /**
     * Sync the UserStatsMap
     * @param authorities list of authorities to derive UserStatsAccount public keys from.
     * You may want to get this list from UserMap in order to filter out idle users
     */ async sync(authorities) {
        if (this.syncConfig.type === 'default') {
            return this.defaultSync(authorities);
        } else {
            return this.paginatedSync(authorities);
        }
    }
    /**
     * Sync the UserStatsMap using the default sync method, which loads individual users into the bulkAccountLoader and
     * loads them. (bulkAccountLoader uses batch getMultipleAccounts)
     * @param authorities
     */ async defaultSync(authorities) {
        await Promise.all(authorities.map((authority)=>this.addUserStat(authority, undefined, true)));
        await this.bulkAccountLoader.load();
    }
    /**
     * Sync the UserStatsMap using the paginated sync method, which uses multiple getMultipleAccounts calls (without RPC batching), and limits concurrency.
     * @param authorities
     */ async paginatedSync(authorities) {
        var _a, _b;
        if (this.syncPromise) {
            return this.syncPromise;
        }
        this.syncPromise = new Promise((resolve)=>{
            this.syncPromiseResolver = resolve;
        });
        try {
            let accountsToLoad = authorities;
            if (authorities.length === 0) {
                const accountsPrefetch = await this.driftClient.connection.getProgramAccounts(this.driftClient.program.programId, {
                    dataSlice: {
                        offset: 0,
                        length: 0
                    },
                    filters: [
                        (0, memcmp_1.getUserStatsFilter)()
                    ]
                });
                accountsToLoad = accountsPrefetch.map((account)=>account.pubkey);
            }
            const limitConcurrency = async (tasks, limit)=>{
                const executing = [];
                const results = [];
                for(let i = 0; i < tasks.length; i++){
                    const executor = Promise.resolve().then(tasks[i]);
                    results.push(executor);
                    if (executing.length < limit) {
                        executing.push(executor);
                        executor.finally(()=>{
                            const index = executing.indexOf(executor);
                            if (index > -1) {
                                executing.splice(index, 1);
                            }
                        });
                    } else {
                        await Promise.race(executing);
                    }
                }
                return Promise.all(results);
            };
            const programAccountBufferMap = new Set();
            // @ts-ignore
            const chunkSize = (_a = this.syncConfig.chunkSize) !== null && _a !== void 0 ? _a : 100;
            const tasks = [];
            for(let i = 0; i < accountsToLoad.length; i += chunkSize){
                const chunk = accountsToLoad.slice(i, i + chunkSize);
                tasks.push(async ()=>{
                    const accountInfos = await this.driftClient.connection.getMultipleAccountsInfoAndContext(chunk, {
                        commitment: this.driftClient.opts.commitment
                    });
                    for(let j = 0; j < accountInfos.value.length; j += 1){
                        const accountInfo = accountInfos.value[j];
                        if (accountInfo === null) continue;
                        const publicKeyString = chunk[j].toString();
                        if (!this.has(publicKeyString)) {
                            const buffer = Buffer.from(accountInfo.data);
                            const decodedUserStats = this.decode('UserStats', buffer);
                            programAccountBufferMap.add(decodedUserStats.authority.toBase58());
                            this.addUserStat(decodedUserStats.authority, decodedUserStats, false);
                        }
                    }
                });
            }
            // @ts-ignore
            const concurrencyLimit = (_b = this.syncConfig.concurrencyLimit) !== null && _b !== void 0 ? _b : 10;
            await limitConcurrency(tasks, concurrencyLimit);
            for (const [key] of this.userStatsMap.entries()){
                if (!programAccountBufferMap.has(key)) {
                    const user = this.get(key);
                    if (user) {
                        await user.unsubscribe();
                        this.userStatsMap.delete(key);
                    }
                }
            }
        } catch (err) {
            console.error(`Error in UserStatsMap.paginatedSync():`, err);
        } finally{
            if (this.syncPromiseResolver) {
                this.syncPromiseResolver();
            }
            this.syncPromise = undefined;
        }
    }
    async unsubscribe() {
        for (const [key, userStats] of this.userStatsMap.entries()){
            await userStats.unsubscribe();
            this.userStatsMap.delete(key);
        }
    }
}
exports.UserStatsMap = UserStatsMap;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/userMap/revenueShareEscrowMap.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RevenueShareEscrowMap = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const pda_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/addresses/pda.js [app-route] (ecmascript)");
const memcmp_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/memcmp.js [app-route] (ecmascript)");
class RevenueShareEscrowMap {
    /**
     * Creates a new RevenueShareEscrowMap instance.
     *
     * @param {DriftClient} driftClient - The DriftClient instance.
     * @param {boolean} parallelSync - Whether to sync accounts in parallel.
     */ constructor(driftClient, parallelSync){
        /**
         * map from authority pubkey to RevenueShareEscrow account data.
         */ this.authorityEscrowMap = new Map();
        this.driftClient = driftClient;
        this.parallelSync = parallelSync !== undefined ? parallelSync : true;
    }
    /**
     * Subscribe to all RevenueShareEscrow accounts.
     */ async subscribe() {
        if (this.size() > 0) {
            return;
        }
        await this.driftClient.subscribe();
        await this.sync();
    }
    has(authorityPublicKey) {
        return this.authorityEscrowMap.has(authorityPublicKey);
    }
    get(authorityPublicKey) {
        return this.authorityEscrowMap.get(authorityPublicKey);
    }
    /**
     * Enforce that a RevenueShareEscrow will exist for the given authorityPublicKey,
     * reading one from the blockchain if necessary.
     * @param authorityPublicKey
     * @returns
     */ async mustGet(authorityPublicKey) {
        if (!this.has(authorityPublicKey)) {
            await this.addRevenueShareEscrow(authorityPublicKey);
        }
        return this.get(authorityPublicKey);
    }
    async addRevenueShareEscrow(authority) {
        const escrowAccountPublicKey = (0, pda_1.getRevenueShareEscrowAccountPublicKey)(this.driftClient.program.programId, new web3_js_1.PublicKey(authority));
        try {
            const accountInfo = await this.driftClient.connection.getAccountInfo(escrowAccountPublicKey, 'processed');
            if (accountInfo && accountInfo.data) {
                const escrow = this.driftClient.program.account.revenueShareEscrow.coder.accounts.decode('RevenueShareEscrow', accountInfo.data);
                this.authorityEscrowMap.set(authority, escrow);
            }
        } catch (error) {
            // RevenueShareEscrow account doesn't exist for this authority, which is normal
            console.debug(`No RevenueShareEscrow account found for authority: ${authority}`);
        }
    }
    size() {
        return this.authorityEscrowMap.size;
    }
    async sync() {
        if (this.fetchPromise) {
            return this.fetchPromise;
        }
        this.fetchPromise = new Promise((resolver)=>{
            this.fetchPromiseResolver = resolver;
        });
        try {
            await this.syncAll();
        } finally{
            this.fetchPromiseResolver();
            this.fetchPromise = undefined;
        }
    }
    /**
     * A slow, bankrun test friendly version of sync(), uses getAccountInfo on every cached account to refresh data
     * @returns
     */ async slowSync() {
        if (this.fetchPromise) {
            return this.fetchPromise;
        }
        for (const authority of this.authorityEscrowMap.keys()){
            const accountInfo = await this.driftClient.connection.getAccountInfo((0, pda_1.getRevenueShareEscrowAccountPublicKey)(this.driftClient.program.programId, new web3_js_1.PublicKey(authority)), 'confirmed');
            const escrowNew = this.driftClient.program.account.revenueShareEscrow.coder.accounts.decode('RevenueShareEscrow', accountInfo.data);
            this.authorityEscrowMap.set(authority, escrowNew);
        }
    }
    async syncAll() {
        const rpcRequestArgs = [
            this.driftClient.program.programId.toBase58(),
            {
                commitment: this.driftClient.opts.commitment,
                filters: [
                    (0, memcmp_1.getRevenueShareEscrowFilter)()
                ],
                encoding: 'base64',
                withContext: true
            }
        ];
        const rpcJSONResponse = // @ts-ignore
        await this.driftClient.connection._rpcRequest('getProgramAccounts', rpcRequestArgs);
        const rpcResponseAndContext = rpcJSONResponse.result;
        const batchSize = 100;
        for(let i = 0; i < rpcResponseAndContext.value.length; i += batchSize){
            const batch = rpcResponseAndContext.value.slice(i, i + batchSize);
            if (this.parallelSync) {
                await Promise.all(batch.map(async (programAccount)=>{
                    try {
                        // @ts-ignore
                        const buffer = Buffer.from(programAccount.account.data[0], programAccount.account.data[1]);
                        const escrow = this.driftClient.program.account.revenueShareEscrow.coder.accounts.decode('RevenueShareEscrow', buffer);
                        // Extract authority from the account data
                        const authorityKey = escrow.authority.toBase58();
                        this.authorityEscrowMap.set(authorityKey, escrow);
                    } catch (error) {
                        console.warn(`Failed to decode RevenueShareEscrow account ${programAccount.pubkey}:`, error);
                    }
                }));
            } else {
                for (const programAccount of batch){
                    try {
                        // @ts-ignore
                        const buffer = Buffer.from(programAccount.account.data[0], programAccount.account.data[1]);
                        const escrow = this.driftClient.program.account.revenueShareEscrow.coder.accounts.decode('RevenueShareEscrow', buffer);
                        // Extract authority from the account data
                        const authorityKey = escrow.authority.toBase58();
                        this.authorityEscrowMap.set(authorityKey, escrow);
                    } catch (error) {
                        console.warn(`Failed to decode RevenueShareEscrow account ${programAccount.pubkey}:`, error);
                    }
                }
            }
            // Add a small delay between batches to avoid overwhelming the RPC
            await new Promise((resolve)=>setTimeout(resolve, 10));
        }
    }
    /**
     * Get all RevenueShareEscrow accounts
     */ getAll() {
        return new Map(this.authorityEscrowMap);
    }
    /**
     * Get all authorities that have RevenueShareEscrow accounts
     */ getAuthorities() {
        return Array.from(this.authorityEscrowMap.keys());
    }
    /**
     * Get RevenueShareEscrow accounts that have approved referrers
     */ getEscrowsWithApprovedReferrers() {
        const result = new Map();
        for (const [authority, escrow] of this.authorityEscrowMap){
            if (escrow.approvedBuilders && escrow.approvedBuilders.length > 0) {
                result.set(authority, escrow);
            }
        }
        return result;
    }
    /**
     * Get RevenueShareEscrow accounts that have active orders
     */ getEscrowsWithOrders() {
        const result = new Map();
        for (const [authority, escrow] of this.authorityEscrowMap){
            if (escrow.orders && escrow.orders.length > 0) {
                result.set(authority, escrow);
            }
        }
        return result;
    }
    /**
     * Get RevenueShareEscrow account by referrer
     */ getByReferrer(referrerPublicKey) {
        for (const escrow of this.authorityEscrowMap.values()){
            if (escrow.referrer.toBase58() === referrerPublicKey) {
                return escrow;
            }
        }
        return undefined;
    }
    /**
     * Get all RevenueShareEscrow accounts for a specific referrer
     */ getAllByReferrer(referrerPublicKey) {
        const result = [];
        for (const escrow of this.authorityEscrowMap.values()){
            if (escrow.referrer.toBase58() === referrerPublicKey) {
                result.push(escrow);
            }
        }
        return result;
    }
    async unsubscribe() {
        this.authorityEscrowMap.clear();
    }
}
exports.RevenueShareEscrowMap = RevenueShareEscrowMap;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/userMap/userMapConfig.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/orderSubscriber/PollingSubscription.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PollingSubscription = void 0;
class PollingSubscription {
    constructor({ orderSubscriber, frequency }){
        this.orderSubscriber = orderSubscriber;
        this.frequency = frequency;
    }
    async subscribe() {
        if (this.intervalId) {
            return;
        }
        this.intervalId = setInterval(this.orderSubscriber.fetch.bind(this.orderSubscriber), this.frequency);
        await this.orderSubscriber.fetch();
    }
    async unsubscribe() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
    }
}
exports.PollingSubscription = PollingSubscription;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/orderSubscriber/WebsocketSubscription.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WebsocketSubscription = void 0;
const memcmp_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/memcmp.js [app-route] (ecmascript)");
const webSocketProgramAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketProgramAccountSubscriber.js [app-route] (ecmascript)");
class WebsocketSubscription {
    constructor({ orderSubscriber, commitment, skipInitialLoad = false, resubOpts, resyncIntervalMs, decoded = true }){
        this.orderSubscriber = orderSubscriber;
        this.commitment = commitment;
        this.skipInitialLoad = skipInitialLoad;
        this.resubOpts = resubOpts;
        this.resyncIntervalMs = resyncIntervalMs;
        this.decoded = decoded;
    }
    async subscribe() {
        if (this.subscriber) {
            return;
        }
        this.subscriber = new webSocketProgramAccountSubscriber_1.WebSocketProgramAccountSubscriber('OrderSubscriber', 'User', this.orderSubscriber.driftClient.program, this.orderSubscriber.decodeFn, {
            filters: [
                (0, memcmp_1.getUserFilter)(),
                (0, memcmp_1.getNonIdleUserFilter)()
            ],
            commitment: this.commitment
        }, this.resubOpts);
        await this.subscriber.subscribe((accountId, account, context, buffer)=>{
            var _a;
            const userKey = accountId.toBase58();
            if ((_a = this.decoded) !== null && _a !== void 0 ? _a : true) {
                this.orderSubscriber.tryUpdateUserAccount(userKey, 'decoded', account, context.slot);
            } else {
                this.orderSubscriber.tryUpdateUserAccount(userKey, 'buffer', buffer, context.slot);
            }
        });
        if (!this.skipInitialLoad) {
            await this.orderSubscriber.fetch();
        }
        if (this.resyncIntervalMs) {
            const recursiveResync = ()=>{
                this.resyncTimeoutId = setTimeout(()=>{
                    this.orderSubscriber.fetch().catch((e)=>{
                        console.error('Failed to resync in OrderSubscriber');
                        console.log(e);
                    }).finally(()=>{
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        if (!this.resyncTimeoutId) return;
                        recursiveResync();
                    });
                }, this.resyncIntervalMs);
            };
            recursiveResync();
        }
    }
    async unsubscribe() {
        if (!this.subscriber) return;
        await this.subscriber.unsubscribe();
        this.subscriber = undefined;
        if (this.resyncTimeoutId !== undefined) {
            clearTimeout(this.resyncTimeoutId);
            this.resyncTimeoutId = undefined;
        }
    }
}
exports.WebsocketSubscription = WebsocketSubscription;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/orderSubscriber/grpcSubscription.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.grpcSubscription = void 0;
const grpcProgramAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/grpcProgramAccountSubscriber.js [app-route] (ecmascript)");
const memcmp_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/memcmp.js [app-route] (ecmascript)");
const laserProgramAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/laserProgramAccountSubscriber.js [app-route] (ecmascript)");
class grpcSubscription {
    constructor({ grpcConfigs, orderSubscriber, skipInitialLoad = false, resubOpts, resyncIntervalMs, decoded = true }){
        this.orderSubscriber = orderSubscriber;
        this.skipInitialLoad = skipInitialLoad;
        this.resubOpts = resubOpts;
        this.resyncIntervalMs = resyncIntervalMs;
        this.decoded = decoded;
        this.grpcConfigs = grpcConfigs;
    }
    async subscribe() {
        if (this.subscriber) {
            return;
        }
        if (this.grpcConfigs.client === 'laser') {
            this.subscriber = await laserProgramAccountSubscriber_1.LaserstreamProgramAccountSubscriber.create(this.grpcConfigs, 'OrderSubscriber', 'User', this.orderSubscriber.driftClient.program, this.orderSubscriber.decodeFn, {
                filters: [
                    (0, memcmp_1.getUserFilter)(),
                    (0, memcmp_1.getNonIdleUserFilter)()
                ]
            }, this.resubOpts);
        } else {
            this.subscriber = await grpcProgramAccountSubscriber_1.grpcProgramAccountSubscriber.create(this.grpcConfigs, 'OrderSubscriber', 'User', this.orderSubscriber.driftClient.program, this.orderSubscriber.decodeFn, {
                filters: [
                    (0, memcmp_1.getUserFilter)(),
                    (0, memcmp_1.getNonIdleUserFilter)()
                ]
            }, this.resubOpts);
        }
        await this.subscriber.subscribe((accountId, account, context, buffer)=>{
            var _a;
            const userKey = accountId.toBase58();
            if ((_a = this.decoded) !== null && _a !== void 0 ? _a : true) {
                this.orderSubscriber.tryUpdateUserAccount(userKey, 'decoded', account, context.slot);
            } else {
                this.orderSubscriber.tryUpdateUserAccount(userKey, 'buffer', buffer, context.slot);
            }
        });
        if (!this.skipInitialLoad) {
            await this.orderSubscriber.fetch();
        }
        if (this.resyncIntervalMs) {
            const recursiveResync = ()=>{
                this.resyncTimeoutId = setTimeout(()=>{
                    this.orderSubscriber.fetch().catch((e)=>{
                        console.error('Failed to resync in OrderSubscriber');
                        console.log(e);
                    }).finally(()=>{
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        if (!this.resyncTimeoutId) return;
                        recursiveResync();
                    });
                }, this.resyncIntervalMs);
            };
            recursiveResync();
        }
    }
    async unsubscribe() {
        if (!this.subscriber) return;
        await this.subscriber.unsubscribe();
        this.subscriber = undefined;
        if (this.resyncTimeoutId !== undefined) {
            clearTimeout(this.resyncTimeoutId);
            this.resyncTimeoutId = undefined;
        }
    }
}
exports.grpcSubscription = grpcSubscription;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/orderSubscriber/OrderSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OrderSubscriber = void 0;
const memcmp_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/memcmp.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const buffer_1 = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)");
const DLOB_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/dlob/DLOB.js [app-route] (ecmascript)");
const PollingSubscription_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/orderSubscriber/PollingSubscription.js [app-route] (ecmascript)");
const WebsocketSubscription_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/orderSubscriber/WebsocketSubscription.js [app-route] (ecmascript)");
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const user_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/decode/user.js [app-route] (ecmascript)");
const grpcSubscription_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/orderSubscriber/grpcSubscription.js [app-route] (ecmascript)");
const userStatus_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/userStatus.js [app-route] (ecmascript)");
const orders_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/orders.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
class OrderSubscriber {
    constructor(config){
        var _a, _b, _c, _d, _e;
        this.usersAccounts = new Map();
        this.driftClient = config.driftClient;
        this.commitment = config.subscriptionConfig.commitment || 'processed';
        if (config.subscriptionConfig.type === 'polling') {
            this.subscription = new PollingSubscription_1.PollingSubscription({
                orderSubscriber: this,
                frequency: config.subscriptionConfig.frequency
            });
        } else if (config.subscriptionConfig.type === 'grpc') {
            this.subscription = new grpcSubscription_1.grpcSubscription({
                orderSubscriber: this,
                grpcConfigs: config.subscriptionConfig.grpcConfigs,
                skipInitialLoad: config.subscriptionConfig.skipInitialLoad,
                resubOpts: {
                    resubTimeoutMs: (_a = config.subscriptionConfig) === null || _a === void 0 ? void 0 : _a.resubTimeoutMs,
                    logResubMessages: (_b = config.subscriptionConfig) === null || _b === void 0 ? void 0 : _b.logResubMessages
                },
                resyncIntervalMs: config.subscriptionConfig.resyncIntervalMs,
                decoded: config.decodeData
            });
        } else {
            this.subscription = new WebsocketSubscription_1.WebsocketSubscription({
                orderSubscriber: this,
                commitment: this.commitment,
                skipInitialLoad: config.subscriptionConfig.skipInitialLoad,
                resubOpts: {
                    resubTimeoutMs: (_c = config.subscriptionConfig) === null || _c === void 0 ? void 0 : _c.resubTimeoutMs,
                    logResubMessages: (_d = config.subscriptionConfig) === null || _d === void 0 ? void 0 : _d.logResubMessages
                },
                resyncIntervalMs: config.subscriptionConfig.resyncIntervalMs,
                decoded: config.decodeData
            });
        }
        if ((_e = config.fastDecode) !== null && _e !== void 0 ? _e : true) {
            this.decodeFn = (name, data)=>(0, user_1.decodeUser)(data);
        } else {
            this.decodeFn = this.driftClient.program.account.user.coder.accounts.decodeUnchecked.bind(this.driftClient.program.account.user.coder.accounts);
        }
        this.eventEmitter = new events_1.EventEmitter();
        this.fetchAllNonIdleUsers = config.fetchAllNonIdleUsers;
    }
    async subscribe() {
        await this.subscription.subscribe();
    }
    async fetch() {
        if (this.fetchPromise) {
            return this.fetchPromise;
        }
        this.fetchPromise = new Promise((resolver)=>{
            this.fetchPromiseResolver = resolver;
        });
        const filters = this.fetchAllNonIdleUsers ? [
            (0, memcmp_1.getUserFilter)(),
            (0, memcmp_1.getNonIdleUserFilter)()
        ] : [
            (0, memcmp_1.getUserFilter)(),
            (0, memcmp_1.getUserWithOrderFilter)()
        ];
        try {
            const rpcRequestArgs = [
                this.driftClient.program.programId.toBase58(),
                {
                    commitment: this.commitment,
                    filters,
                    encoding: 'base64',
                    withContext: true
                }
            ];
            const rpcJSONResponse = // @ts-ignore
            await this.driftClient.connection._rpcRequest('getProgramAccounts', rpcRequestArgs);
            const rpcResponseAndContext = rpcJSONResponse.result;
            const slot = rpcResponseAndContext.context.slot;
            for (const programAccount of rpcResponseAndContext.value){
                const key = programAccount.pubkey.toString();
                this.tryUpdateUserAccount(key, 'raw', programAccount.account.data, slot);
                // give event loop a chance to breathe
                await new Promise((resolve)=>setTimeout(resolve, 0));
            }
        } catch (e) {
            console.error(e);
        } finally{
            this.fetchPromiseResolver();
            this.fetchPromise = undefined;
        }
    }
    tryUpdateUserAccount(key, dataType, data, slot) {
        if (!this.mostRecentSlot || slot > this.mostRecentSlot) {
            this.mostRecentSlot = slot;
        }
        this.eventEmitter.emit('updateReceived', new web3_js_1.PublicKey(key), slot, dataType);
        const slotAndUserAccount = this.usersAccounts.get(key);
        if (!slotAndUserAccount || slotAndUserAccount.slot <= slot) {
            let userAccount;
            // Polling leads to a lot of redundant decoding, so we only decode if data is from a fresh slot
            if (dataType === 'raw') {
                // @ts-ignore
                const buffer = buffer_1.Buffer.from(data[0], data[1]);
                const newLastActiveSlot = new anchor_1.BN(buffer.subarray(4328, 4328 + 8), undefined, 'le');
                if (slotAndUserAccount && slotAndUserAccount.userAccount.lastActiveSlot.gt(newLastActiveSlot)) {
                    return;
                }
                userAccount = this.decodeFn('User', buffer);
            } else if (dataType === 'buffer') {
                const buffer = data;
                const newLastActiveSlot = new anchor_1.BN(buffer.subarray(4328, 4328 + 8), undefined, 'le');
                if (slotAndUserAccount && slotAndUserAccount.userAccount.lastActiveSlot.gt(newLastActiveSlot)) {
                    return;
                }
                userAccount = this.decodeFn('User', data);
            } else {
                userAccount = data;
            }
            this.eventEmitter.emit('userUpdated', userAccount, new web3_js_1.PublicKey(key), slot, dataType);
            const newOrders = userAccount.orders.filter((order)=>{
                var _a;
                return order.slot.toNumber() > ((_a = slotAndUserAccount === null || slotAndUserAccount === void 0 ? void 0 : slotAndUserAccount.slot) !== null && _a !== void 0 ? _a : 0) && order.slot.toNumber() <= slot;
            });
            if (newOrders.length > 0) {
                this.eventEmitter.emit('orderCreated', userAccount, newOrders, new web3_js_1.PublicKey(key), slot, dataType);
            }
            this.usersAccounts.set(key, {
                slot,
                userAccount
            });
        }
    }
    /**
     * Creates a new DLOB for the order subscriber to fill. This will allow a
     * caller to extend the DLOB Subscriber with a custom DLOB type.
     * @returns New, empty DLOB object.
     */ createDLOB(protectedMakerParamsMap) {
        return new DLOB_1.DLOB(protectedMakerParamsMap);
    }
    async getDLOB(slot, protectedMakerParamsMap) {
        var _a;
        const dlob = this.createDLOB(protectedMakerParamsMap);
        for (const [key, { userAccount }] of this.usersAccounts.entries()){
            const protectedMaker = (0, userStatus_1.isUserProtectedMaker)(userAccount);
            for (const order of userAccount.orders){
                let baseAssetAmount = order.baseAssetAmount;
                if (order.reduceOnly) {
                    const existingBaseAmount = ((_a = userAccount.perpPositions.find((pos)=>pos.marketIndex === order.marketIndex && pos.openOrders > 0)) === null || _a === void 0 ? void 0 : _a.baseAssetAmount) || numericConstants_1.ZERO;
                    baseAssetAmount = (0, orders_1.calculateOrderBaseAssetAmount)(order, existingBaseAmount);
                }
                dlob.insertOrder(order, key, slot, protectedMaker, baseAssetAmount);
            }
        }
        return dlob;
    }
    getSlot() {
        var _a;
        return (_a = this.mostRecentSlot) !== null && _a !== void 0 ? _a : 0;
    }
    async addPubkey(userAccountPublicKey) {
        const accountInfo = await this.driftClient.connection.getAccountInfoAndContext(userAccountPublicKey, this.commitment);
        if (accountInfo) {
            this.tryUpdateUserAccount(userAccountPublicKey.toString(), 'buffer', accountInfo.value.data, accountInfo.context.slot);
        }
    }
    async mustGetUserAccount(key) {
        if (!this.usersAccounts.has(key)) {
            await this.addPubkey(new web3_js_1.PublicKey(key));
        }
        return this.usersAccounts.get(key).userAccount;
    }
    async unsubscribe() {
        this.usersAccounts.clear();
        await this.subscription.unsubscribe();
    }
}
exports.OrderSubscriber = OrderSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/orderSubscriber/types.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/orderSubscriber/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/orderSubscriber/OrderSubscriber.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/orderSubscriber/types.js [app-route] (ecmascript)"), exports);
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/auctionSubscriber/types.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/auctionSubscriber/auctionSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuctionSubscriber = void 0;
const memcmp_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/memcmp.js [app-route] (ecmascript)");
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
const webSocketProgramAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketProgramAccountSubscriber.js [app-route] (ecmascript)");
class AuctionSubscriber {
    constructor({ driftClient, opts, resubTimeoutMs, logResubMessages }){
        this.driftClient = driftClient;
        this.opts = opts || this.driftClient.opts;
        this.eventEmitter = new events_1.EventEmitter();
        this.resubOpts = {
            resubTimeoutMs,
            logResubMessages
        };
    }
    async subscribe() {
        if (!this.subscriber) {
            this.subscriber = new webSocketProgramAccountSubscriber_1.WebSocketProgramAccountSubscriber('AuctionSubscriber', 'User', this.driftClient.program, this.driftClient.program.account.user.coder.accounts.decode.bind(this.driftClient.program.account.user.coder.accounts), {
                filters: [
                    (0, memcmp_1.getUserFilter)(),
                    (0, memcmp_1.getUserWithAuctionFilter)()
                ],
                commitment: this.opts.commitment
            }, this.resubOpts);
        }
        await this.subscriber.subscribe((accountId, data, context)=>{
            this.eventEmitter.emit('onAccountUpdate', data, accountId, context.slot);
        });
    }
    async unsubscribe() {
        if (!this.subscriber) {
            return;
        }
        this.subscriber.unsubscribe();
    }
}
exports.AuctionSubscriber = AuctionSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/auctionSubscriber/auctionSubscriberGrpc.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuctionSubscriberGrpc = void 0;
const memcmp_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/memcmp.js [app-route] (ecmascript)");
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
const grpcProgramAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/grpcProgramAccountSubscriber.js [app-route] (ecmascript)");
class AuctionSubscriberGrpc {
    constructor({ driftClient, opts, grpcConfigs, resubTimeoutMs, logResubMessages }){
        this.driftClient = driftClient;
        this.opts = opts || this.driftClient.opts;
        this.eventEmitter = new events_1.EventEmitter();
        this.resubOpts = {
            resubTimeoutMs,
            logResubMessages
        };
        this.grpcConfigs = grpcConfigs;
    }
    async subscribe() {
        if (!this.subscriber) {
            this.subscriber = await grpcProgramAccountSubscriber_1.grpcProgramAccountSubscriber.create(this.grpcConfigs, 'AuctionSubscriber', 'User', this.driftClient.program, this.driftClient.program.account.user.coder.accounts.decode.bind(this.driftClient.program.account.user.coder.accounts), {
                filters: [
                    (0, memcmp_1.getUserFilter)(),
                    (0, memcmp_1.getUserWithAuctionFilter)()
                ]
            }, this.resubOpts);
        }
        await this.subscriber.subscribe((accountId, data, context)=>{
            this.eventEmitter.emit('onAccountUpdate', data, accountId, context.slot);
        });
    }
    async unsubscribe() {
        if (!this.subscriber) {
            return;
        }
        this.subscriber.unsubscribe();
    }
}
exports.AuctionSubscriberGrpc = AuctionSubscriberGrpc;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/auctionSubscriber/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/auctionSubscriber/types.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/auctionSubscriber/auctionSubscriber.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/auctionSubscriber/auctionSubscriberGrpc.js [app-route] (ecmascript)"), exports);
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/blockhashSubscriber/BlockhashSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BlockhashSubscriber = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
class BlockhashSubscriber {
    constructor(config){
        var _a, _b;
        this.isSubscribed = false;
        this.blockhashes = [];
        if (!config.connection && !config.rpcUrl) {
            throw new Error('BlockhashSubscriber requires one of connection or rpcUrl must be provided');
        }
        this.connection = config.connection || new web3_js_1.Connection(config.rpcUrl);
        this.commitment = (_a = config.commitment) !== null && _a !== void 0 ? _a : 'confirmed';
        this.updateIntervalMs = (_b = config.updateIntervalMs) !== null && _b !== void 0 ? _b : 1000;
    }
    getBlockhashCacheSize() {
        return this.blockhashes.length;
    }
    getLatestBlockHeight() {
        return this.latestBlockHeight;
    }
    getLatestBlockHeightContext() {
        return this.latestBlockHeightContext;
    }
    /**
     * Returns the latest cached blockhash, based on an offset from the latest obtained
     * @param offset Offset to use, defaulting to 0
     * @param offsetType If 'seconds', it will use calculate the actual element offset based on the update interval; otherwise it will return a fixed index
     * @returns Cached blockhash at the given offset, or undefined
     */ getLatestBlockhash(offset = 0, offsetType = 'index') {
        if (this.blockhashes.length === 0) {
            return undefined;
        }
        const elementOffset = offsetType == 'seconds' ? Math.floor(offset * 1000 / this.updateIntervalMs) : offset;
        const clampedOffset = Math.max(0, Math.min(this.blockhashes.length - 1, elementOffset));
        return this.blockhashes[this.blockhashes.length - 1 - clampedOffset];
    }
    pruneBlockhashes() {
        if (this.latestBlockHeight) {
            this.blockhashes = this.blockhashes.filter((blockhash)=>blockhash.lastValidBlockHeight > this.latestBlockHeight);
        }
    }
    async updateBlockhash() {
        try {
            const [resp, lastConfirmedBlockHeight] = await Promise.all([
                this.connection.getLatestBlockhashAndContext({
                    commitment: this.commitment
                }),
                this.connection.getBlockHeight({
                    commitment: this.commitment
                })
            ]);
            this.latestBlockHeight = lastConfirmedBlockHeight;
            this.latestBlockHeightContext = resp.context;
            // avoid caching duplicate blockhashes
            if (this.blockhashes.length > 0) {
                if (resp.value.blockhash === this.blockhashes[this.blockhashes.length - 1].blockhash) {
                    return;
                }
            }
            this.blockhashes.push(resp.value);
        } catch (e) {
            console.error('Error updating blockhash:\n', e);
        } finally{
            this.pruneBlockhashes();
        }
    }
    async subscribe() {
        if (this.isSubscribed) {
            return;
        }
        this.isSubscribed = true;
        await this.updateBlockhash();
        this.updateBlockhashIntervalId = setInterval(this.updateBlockhash.bind(this), this.updateIntervalMs);
    }
    unsubscribe() {
        if (this.updateBlockhashIntervalId) {
            clearInterval(this.updateBlockhashIntervalId);
            this.updateBlockhashIntervalId = undefined;
        }
        this.isSubscribed = false;
    }
}
exports.BlockhashSubscriber = BlockhashSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/blockhashSubscriber/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/blockhashSubscriber/BlockhashSubscriber.js [app-route] (ecmascript)"), exports);
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/clock/clockSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ClockSubscriber = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
class ClockSubscriber {
    get latestSlot() {
        return this._latestSlot;
    }
    get currentTs() {
        return this._currentTs;
    }
    constructor(connection, config){
        this.connection = connection;
        this.isUnsubscribing = false;
        this.receivingData = false;
        this.eventEmitter = new events_1.EventEmitter();
        this.resubTimeoutMs = config === null || config === void 0 ? void 0 : config.resubTimeoutMs;
        this.commitment = (config === null || config === void 0 ? void 0 : config.commitment) || 'confirmed';
        if (this.resubTimeoutMs < 1000) {
            console.log('resubTimeoutMs should be at least 1000ms to avoid spamming resub');
        }
    }
    async subscribe() {
        if (this.subscriptionId != null) {
            return;
        }
        this.subscriptionId = this.connection.onAccountChange(web3_js_1.SYSVAR_CLOCK_PUBKEY, (acctInfo, context)=>{
            if (!this.latestSlot || this.latestSlot < context.slot) {
                if (this.resubTimeoutMs && !this.isUnsubscribing) {
                    this.receivingData = true;
                    clearTimeout(this.timeoutId);
                    this.setTimeout();
                }
                this._latestSlot = context.slot;
                this._currentTs = new anchor_1.BN(acctInfo.data.subarray(32, 39), undefined, 'le').toNumber();
                this.eventEmitter.emit('clockUpdate', this.currentTs);
            }
        }, this.commitment);
        if (this.resubTimeoutMs) {
            this.receivingData = true;
            this.setTimeout();
        }
    }
    setTimeout() {
        this.timeoutId = setTimeout(async ()=>{
            if (this.isUnsubscribing) {
                // If we are in the process of unsubscribing, do not attempt to resubscribe
                return;
            }
            if (this.receivingData) {
                console.log(`No new slot in ${this.resubTimeoutMs}ms, slot subscriber resubscribing`);
                await this.unsubscribe(true);
                this.receivingData = false;
                await this.subscribe();
            }
        }, this.resubTimeoutMs);
    }
    getUnixTs() {
        return this.currentTs;
    }
    async unsubscribe(onResub = false) {
        if (!onResub) {
            this.resubTimeoutMs = undefined;
        }
        this.isUnsubscribing = true;
        clearTimeout(this.timeoutId);
        this.timeoutId = undefined;
        if (this.subscriptionId != null) {
            await this.connection.removeAccountChangeListener(this.subscriptionId);
            this.subscriptionId = undefined;
            this.isUnsubscribing = false;
        } else {
            this.isUnsubscribing = false;
        }
    }
}
exports.ClockSubscriber = ClockSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/indicative-quotes/indicativeQuotesSender.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IndicativeQuotesSender = void 0;
const tweetnacl_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/tweetnacl@1.0.3/node_modules/tweetnacl/nacl-fast.js [app-route] (ecmascript)"));
const tweetnacl_util_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/tweetnacl-util@0.15.1/node_modules/tweetnacl-util/nacl-util.js [app-route] (ecmascript)");
const ws_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/ws@7.5.10/node_modules/ws/index.js [app-route] (ecmascript)"));
const SEND_INTERVAL = 500;
const MAX_BUFFERED_AMOUNT = 20 * 1024; // 20 KB as worst case scenario
class IndicativeQuotesSender {
    constructor(endpoint, keypair){
        this.endpoint = endpoint;
        this.keypair = keypair;
        this.heartbeatTimeout = null;
        this.sendQuotesInterval = null;
        this.heartbeatIntervalMs = 60000;
        this.reconnectDelay = 1000;
        this.ws = null;
        this.connected = false;
        this.quotes = new Map();
    }
    generateChallengeResponse(nonce) {
        const messageBytes = (0, tweetnacl_util_1.decodeUTF8)(nonce);
        const signature = tweetnacl_1.default.sign.detached(messageBytes, this.keypair.secretKey);
        const signatureBase64 = Buffer.from(signature).toString('base64');
        return signatureBase64;
    }
    handleAuthMessage(message) {
        var _a, _b;
        if (message['channel'] === 'auth' && message['nonce'] != null) {
            const signatureBase64 = this.generateChallengeResponse(message['nonce']);
            (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({
                pubkey: this.keypair.publicKey.toBase58(),
                signature: signatureBase64
            }));
        }
        if (message['channel'] === 'auth' && ((_b = message['message']) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === 'authenticated') {
            this.connected = true;
        }
    }
    async connect() {
        const ws = new ws_1.default(this.endpoint + '?pubkey=' + this.keypair.publicKey.toBase58());
        this.ws = ws;
        ws.on('open', async ()=>{
            console.log('Connected to the server');
            this.reconnectDelay = 1000;
            ws.on('message', async (data)=>{
                var _a;
                let message;
                try {
                    message = JSON.parse(data.toString());
                } catch (e) {
                    console.warn('Failed to parse json message: ', data.toString());
                    return;
                }
                this.startHeartbeatTimer();
                if (message['channel'] === 'auth') {
                    this.handleAuthMessage(message);
                }
                if (message['channel'] === 'auth' && ((_a = message['message']) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'authenticated') {
                    this.sendQuotesInterval = setInterval(()=>{
                        var _a, _b;
                        if (this.connected) {
                            for (const [marketIndex, quotes] of this.quotes.entries()){
                                const message = {
                                    market_index: marketIndex,
                                    market_type: 'perp',
                                    quotes: quotes.map((quote)=>{
                                        return {
                                            bid_price: quote.bidPrice.toString(),
                                            ask_price: quote.askPrice.toString(),
                                            bid_size: quote.bidBaseAssetAmount.toString(),
                                            ask_size: quote.askBaseAssetAmount.toString(),
                                            is_oracle_offset: quote.isOracleOffset
                                        };
                                    })
                                };
                                try {
                                    if (((_a = this.ws) === null || _a === void 0 ? void 0 : _a.readyState) === ws_1.default.OPEN && ((_b = this.ws) === null || _b === void 0 ? void 0 : _b.bufferedAmount) < MAX_BUFFERED_AMOUNT) {
                                        this.ws.send(JSON.stringify(message));
                                    }
                                } catch (err) {
                                    console.error('Error sending quote:', err);
                                }
                            }
                        }
                    }, SEND_INTERVAL);
                }
            });
            ws.on('close', ()=>{
                console.log('Disconnected from the server');
                this.reconnect();
            });
            ws.on('error', (error)=>{
                console.error('WebSocket error:', error);
                this.reconnect();
            });
        });
        ws.on('unexpected-response', async (request, response)=>{
            console.error('Unexpected response, reconnecting in 5s:', response === null || response === void 0 ? void 0 : response.statusCode);
            setTimeout(()=>{
                if (this.heartbeatTimeout) clearTimeout(this.heartbeatTimeout);
                if (this.sendQuotesInterval) clearInterval(this.sendQuotesInterval);
                this.reconnect();
            }, 5000);
        });
        ws.on('error', async (request, response)=>{
            console.error('WS closed from error, reconnecting in 1s:', response);
            setTimeout(()=>{
                if (this.heartbeatTimeout) clearTimeout(this.heartbeatTimeout);
                if (this.sendQuotesInterval) clearInterval(this.sendQuotesInterval);
                this.reconnect();
            }, 1000);
        });
    }
    startHeartbeatTimer() {
        if (this.heartbeatTimeout) {
            clearTimeout(this.heartbeatTimeout);
        }
        this.heartbeatTimeout = setTimeout(()=>{
            console.warn('No heartbeat received within 30 seconds, reconnecting...');
            this.reconnect();
        }, this.heartbeatIntervalMs);
    }
    setQuote(newQuotes) {
        var _a;
        if (!this.connected) {
            console.warn('Setting quote before connected to the server, ignoring');
        }
        const quotes = Array.isArray(newQuotes) ? newQuotes : [
            newQuotes
        ];
        const newQuoteMap = new Map();
        for (const quote of quotes){
            if (quote.marketIndex == null || quote.bidPrice == null || quote.askPrice == null || quote.bidBaseAssetAmount == null || quote.askBaseAssetAmount == null) {
                console.warn('Received incomplete quote, ignoring and deleting old quote', quote);
                if (quote.marketIndex != null) {
                    this.quotes.delete(quote.marketIndex);
                }
                return;
            }
            if (!newQuoteMap.has(quote.marketIndex)) {
                newQuoteMap.set(quote.marketIndex, []);
            }
            (_a = newQuoteMap.get(quote.marketIndex)) === null || _a === void 0 ? void 0 : _a.push(quote);
        }
        for (const marketIndex of newQuoteMap.keys()){
            this.quotes.set(marketIndex, newQuoteMap.get(marketIndex));
        }
    }
    reconnect() {
        if (this.ws) {
            this.ws.removeAllListeners();
            this.ws.terminate();
        }
        if (this.heartbeatTimeout) {
            clearTimeout(this.heartbeatTimeout);
            this.heartbeatTimeout = null;
        }
        if (this.sendQuotesInterval) {
            clearInterval(this.sendQuotesInterval);
            this.sendQuotesInterval = null;
        }
        console.log(`Reconnecting to WebSocket in ${this.reconnectDelay / 1000} seconds...`);
        setTimeout(()=>{
            this.connect();
            this.reconnectDelay = Math.min(this.reconnectDelay * 2, 30000);
        }, this.reconnectDelay);
    }
}
exports.IndicativeQuotesSender = IndicativeQuotesSender;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constituentMap/pollingConstituentAccountSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PollingConstituentAccountSubscriber = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/types.js [app-route] (ecmascript)");
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
class PollingConstituentAccountSubscriber {
    constructor(constituentMap, program, frequency, commitment, additionalFilters){
        this.constituentMap = constituentMap;
        this.isSubscribed = false;
        this.program = program;
        this.frequency = frequency;
        this.commitment = commitment;
        this.additionalFilters = additionalFilters;
        this.eventEmitter = new events_1.EventEmitter();
    }
    async subscribe() {
        if (this.isSubscribed || this.frequency <= 0) {
            return true;
        }
        const executeSync = async ()=>{
            await this.sync();
            this.intervalId = setTimeout(executeSync, this.frequency);
        };
        // Initial sync
        await this.sync();
        // Start polling
        this.intervalId = setTimeout(executeSync, this.frequency);
        this.isSubscribed = true;
        return true;
    }
    async sync() {
        try {
            await this.constituentMap.sync();
            this.eventEmitter.emit('update');
        } catch (error) {
            console.log(`PollingConstituentAccountSubscriber.sync() error: ${error.message}`);
            this.eventEmitter.emit('error', error);
        }
    }
    async unsubscribe() {
        if (!this.isSubscribed) {
            return;
        }
        if (this.intervalId) {
            clearTimeout(this.intervalId);
            this.intervalId = undefined;
        }
        this.isSubscribed = false;
    }
    assertIsSubscribed() {
        if (!this.isSubscribed) {
            throw new types_1.NotSubscribedError('You must call `subscribe` before using this function');
        }
    }
    didSubscriptionSucceed() {
        return this.isSubscribed;
    }
}
exports.PollingConstituentAccountSubscriber = PollingConstituentAccountSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constituentMap/webSocketConstituentAccountSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WebSocketConstituentAccountSubscriber = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/types.js [app-route] (ecmascript)");
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
const webSocketProgramAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketProgramAccountSubscriber.js [app-route] (ecmascript)");
const memcmp_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/memcmp.js [app-route] (ecmascript)");
class WebSocketConstituentAccountSubscriber {
    constructor(constituentMap, program, resubTimeoutMs, commitment, additionalFilters){
        this.constituentMap = constituentMap;
        this.isSubscribed = false;
        this.program = program;
        this.eventEmitter = new events_1.EventEmitter();
        this.resubTimeoutMs = resubTimeoutMs;
        this.commitment = commitment;
        this.additionalFilters = additionalFilters;
    }
    async subscribe() {
        if (this.isSubscribed) {
            return true;
        }
        this.constituentDataAccountSubscriber = new webSocketProgramAccountSubscriber_1.WebSocketProgramAccountSubscriber('LpPoolConstituent', 'Constituent', this.program, this.program.account.constituent.coder.accounts.decode.bind(this.program.account.constituent.coder.accounts), {
            filters: [
                (0, memcmp_1.getConstituentFilter)(),
                ...this.additionalFilters || []
            ],
            commitment: this.commitment
        });
        await this.constituentDataAccountSubscriber.subscribe((accountId, account, context)=>{
            this.constituentMap.updateConstituentAccount(accountId.toBase58(), account, context.slot);
            this.eventEmitter.emit('onAccountUpdate', account, accountId, context.slot);
        });
        this.eventEmitter.emit('update');
        this.isSubscribed = true;
        return true;
    }
    async sync() {
        try {
            await this.constituentMap.sync();
            this.eventEmitter.emit('update');
        } catch (error) {
            console.log(`WebSocketConstituentAccountSubscriber.sync() error: ${error.message}`);
            this.eventEmitter.emit('error', error);
        }
    }
    async unsubscribe() {
        if (!this.isSubscribed) {
            return;
        }
        await Promise.all([
            this.constituentDataAccountSubscriber.unsubscribe()
        ]);
        this.isSubscribed = false;
    }
    assertIsSubscribed() {
        if (!this.isSubscribed) {
            throw new types_1.NotSubscribedError('You must call `subscribe` before using this function');
        }
    }
}
exports.WebSocketConstituentAccountSubscriber = WebSocketConstituentAccountSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constituentMap/constituentMap.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConstituentMap = void 0;
const pollingConstituentAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constituentMap/pollingConstituentAccountSubscriber.js [app-route] (ecmascript)");
const webSocketConstituentAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constituentMap/webSocketConstituentAccountSubscriber.js [app-route] (ecmascript)");
const memcmp_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/memcmp.js [app-route] (ecmascript)");
const zstddec_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/zstddec@0.1.0/node_modules/zstddec/dist/zstddec.cjs [app-route] (ecmascript)");
const pda_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/addresses/pda.js [app-route] (ecmascript)");
const MAX_CONSTITUENT_SIZE_BYTES = 480; // TODO: update this when account is finalized
class ConstituentMap {
    constructor(config){
        var _a, _b;
        this.constituentMap = new Map();
        this.constituentIndexToKeyMap = new Map();
        this.spotMarketIndexToKeyMap = new Map();
        this.driftClient = config.driftClient;
        this.additionalFilters = config.additionalFilters;
        this.commitment = config.subscriptionConfig.commitment;
        this.connection = config.connection || this.driftClient.connection;
        this.lpPoolId = (_a = config.lpPoolId) !== null && _a !== void 0 ? _a : 0;
        this.decoder = (_b = config.decoder) !== null && _b !== void 0 ? _b : 'base64+zstd';
        if (config.subscriptionConfig.type === 'polling') {
            this.constituentAccountSubscriber = new pollingConstituentAccountSubscriber_1.PollingConstituentAccountSubscriber(this, this.driftClient.program, config.subscriptionConfig.frequency, config.subscriptionConfig.commitment, this.getFilters());
        } else if (config.subscriptionConfig.type === 'websocket') {
            this.constituentAccountSubscriber = new webSocketConstituentAccountSubscriber_1.WebSocketConstituentAccountSubscriber(this, this.driftClient.program, config.subscriptionConfig.resubTimeoutMs, config.subscriptionConfig.commitment, this.getFilters());
        }
        // Listen for account updates from the subscriber
        this.constituentAccountSubscriber.eventEmitter.on('onAccountUpdate', (account, pubkey, slot)=>{
            this.updateConstituentAccount(pubkey.toString(), account, slot);
        });
    }
    getFilters() {
        const filters = [
            (0, memcmp_1.getConstituentFilter)(),
            (0, memcmp_1.getConstituentLpPoolFilter)((0, pda_1.getLpPoolPublicKey)(this.driftClient.program.programId, this.lpPoolId))
        ];
        if (this.additionalFilters) {
            filters.push(...this.additionalFilters);
        }
        return filters;
    }
    decode(name, buffer) {
        return this.driftClient.program.account.constituent.coder.accounts.decodeUnchecked(name, buffer);
    }
    async sync() {
        try {
            const rpcRequestArgs = [
                this.driftClient.program.programId.toBase58(),
                {
                    commitment: this.commitment,
                    filters: this.getFilters(),
                    encoding: this.decoder,
                    withContext: true
                }
            ];
            // @ts-ignore
            const rpcJSONResponse = await this.connection._rpcRequest('getProgramAccounts', rpcRequestArgs);
            const rpcResponseAndContext = rpcJSONResponse.result;
            const slot = rpcResponseAndContext.context.slot;
            const promises = rpcResponseAndContext.value.map(async (programAccount)=>{
                let buffer;
                if (this.decoder === 'base64+zstd') {
                    const compressedUserData = Buffer.from(programAccount.account.data[0], 'base64');
                    const decoder = new zstddec_1.ZSTDDecoder();
                    await decoder.init();
                    buffer = Buffer.from(decoder.decode(compressedUserData, MAX_CONSTITUENT_SIZE_BYTES));
                } else {
                    buffer = Buffer.from(programAccount.account.data[0], 'base64');
                }
                const key = programAccount.pubkey.toString();
                const currAccountWithSlot = this.getWithSlot(key);
                if (currAccountWithSlot) {
                    if (slot >= currAccountWithSlot.slot) {
                        const constituentAcc = this.decode('Constituent', buffer);
                        this.updateConstituentAccount(key, constituentAcc, slot);
                    }
                } else {
                    const constituentAcc = this.decode('Constituent', buffer);
                    this.updateConstituentAccount(key, constituentAcc, slot);
                }
            });
            await Promise.all(promises);
        } catch (error) {
            console.log(`ConstituentMap.sync() error: ${error.message}`);
        }
    }
    async subscribe() {
        await this.constituentAccountSubscriber.subscribe();
    }
    async unsubscribe() {
        await this.constituentAccountSubscriber.unsubscribe();
        this.constituentMap.clear();
    }
    has(key) {
        return this.constituentMap.has(key);
    }
    get(key) {
        var _a;
        return (_a = this.constituentMap.get(key)) === null || _a === void 0 ? void 0 : _a.data;
    }
    getFromConstituentIndex(constituentIndex) {
        const key = this.constituentIndexToKeyMap.get(constituentIndex);
        return key ? this.get(key) : undefined;
    }
    getFromSpotMarketIndex(spotMarketIndex) {
        const key = this.spotMarketIndexToKeyMap.get(spotMarketIndex);
        return key ? this.get(key) : undefined;
    }
    getWithSlot(key) {
        return this.constituentMap.get(key);
    }
    async mustGet(key) {
        if (!this.has(key)) {
            await this.sync();
        }
        const result = this.constituentMap.get(key);
        if (!result) {
            throw new Error(`ConstituentAccount not found for key: ${key}`);
        }
        return result.data;
    }
    async mustGetWithSlot(key) {
        if (!this.has(key)) {
            await this.sync();
        }
        const result = this.constituentMap.get(key);
        if (!result) {
            throw new Error(`ConstituentAccount not found for key: ${key}`);
        }
        return result;
    }
    size() {
        return this.constituentMap.size;
    }
    *values() {
        for (const dataAndSlot of this.constituentMap.values()){
            yield dataAndSlot.data;
        }
    }
    valuesWithSlot() {
        return this.constituentMap.values();
    }
    *entries() {
        for (const [key, dataAndSlot] of this.constituentMap.entries()){
            yield [
                key,
                dataAndSlot.data
            ];
        }
    }
    entriesWithSlot() {
        return this.constituentMap.entries();
    }
    updateConstituentAccount(key, constituentAccount, slot) {
        const existingData = this.getWithSlot(key);
        if (existingData) {
            if (slot >= existingData.slot) {
                this.constituentMap.set(key, {
                    data: constituentAccount,
                    slot
                });
            }
        } else {
            this.constituentMap.set(key, {
                data: constituentAccount,
                slot
            });
        }
        this.constituentIndexToKeyMap.set(constituentAccount.constituentIndex, key);
        this.spotMarketIndexToKeyMap.set(constituentAccount.spotMarketIndex, key);
    }
}
exports.ConstituentMap = ConstituentMap;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pyth = exports.PublicKey = exports.BN = exports.CustomizedCadenceBulkAccountLoader = exports.WebSocketDriftClientAccountSubscriberV2 = exports.WebSocketProgramAccountsSubscriberV2 = exports.WebSocketProgramUserAccountSubscriber = exports.WebSocketProgramAccountSubscriber = exports.WebSocketAccountSubscriberV2 = void 0;
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
Object.defineProperty(exports, "BN", {
    enumerable: true,
    get: function() {
        return anchor_1.BN;
    }
});
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
Object.defineProperty(exports, "PublicKey", {
    enumerable: true,
    get: function() {
        return web3_js_1.PublicKey;
    }
});
const client_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@pythnetwork+client@2.5.3_typescript@5.9.3/node_modules/@pythnetwork/client/lib/index.js [app-route] (ecmascript)"));
exports.pyth = client_1.default;
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tokenFaucet.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/types.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/pythClient.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/strictOraclePrice.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/fetch.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketDriftClientAccountSubscriber.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketInsuranceFundStakeAccountSubscriber.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketHighLeverageModeConfigAccountSubscriber.js [app-route] (ecmascript)"), exports);
var webSocketAccountSubscriberV2_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketAccountSubscriberV2.js [app-route] (ecmascript)");
Object.defineProperty(exports, "WebSocketAccountSubscriberV2", {
    enumerable: true,
    get: function() {
        return webSocketAccountSubscriberV2_1.WebSocketAccountSubscriberV2;
    }
});
var webSocketProgramAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketProgramAccountSubscriber.js [app-route] (ecmascript)");
Object.defineProperty(exports, "WebSocketProgramAccountSubscriber", {
    enumerable: true,
    get: function() {
        return webSocketProgramAccountSubscriber_1.WebSocketProgramAccountSubscriber;
    }
});
var websocketProgramUserAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/websocketProgramUserAccountSubscriber.js [app-route] (ecmascript)");
Object.defineProperty(exports, "WebSocketProgramUserAccountSubscriber", {
    enumerable: true,
    get: function() {
        return websocketProgramUserAccountSubscriber_1.WebSocketProgramUserAccountSubscriber;
    }
});
var webSocketProgramAccountsSubscriberV2_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketProgramAccountsSubscriberV2.js [app-route] (ecmascript)");
Object.defineProperty(exports, "WebSocketProgramAccountsSubscriberV2", {
    enumerable: true,
    get: function() {
        return webSocketProgramAccountsSubscriberV2_1.WebSocketProgramAccountsSubscriberV2;
    }
});
var webSocketDriftClientAccountSubscriberV2_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketDriftClientAccountSubscriberV2.js [app-route] (ecmascript)");
Object.defineProperty(exports, "WebSocketDriftClientAccountSubscriberV2", {
    enumerable: true,
    get: function() {
        return webSocketDriftClientAccountSubscriberV2_1.WebSocketDriftClientAccountSubscriberV2;
    }
});
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/bulkAccountLoader.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/bulkUserSubscription.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/bulkUserStatsSubscription.js [app-route] (ecmascript)"), exports);
var customizedCadenceBulkAccountLoader_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/customizedCadenceBulkAccountLoader.js [app-route] (ecmascript)");
Object.defineProperty(exports, "CustomizedCadenceBulkAccountLoader", {
    enumerable: true,
    get: function() {
        return customizedCadenceBulkAccountLoader_1.CustomizedCadenceBulkAccountLoader;
    }
});
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/pollingDriftClientAccountSubscriber.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/pollingOracleAccountSubscriber.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/pollingTokenAccountSubscriber.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/pollingUserAccountSubscriber.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/pollingUserStatsAccountSubscriber.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/pollingInsuranceFundStakeAccountSubscriber.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/pollingHighLeverageModeConfigAccountSubscriber.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/basicUserAccountSubscriber.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/oneShotUserAccountSubscriber.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/oneShotUserStatsAccountSubscriber.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/types.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/addresses/pda.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/adminClient.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/assert/assert.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/testClient.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/user.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/userConfig.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/userStats.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/userName.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/userStatsConfig.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/decode/user.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/decode/customCoder.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/driftClient.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/factory/oracleClient.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/factory/bigNum.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/events/types.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/events/eventSubscriber.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/events/fetchLogs.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/events/txEventCache.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/events/webSocketLogProvider.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/events/parse.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/events/pollingLogProvider.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/jupiter/jupiterClient.js [app-route] (ecmascript)"), exports);
// Primary swap client interface - use this for all swap operations
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/swap/UnifiedSwapClient.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/auction.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/builder.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/spotMarket.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/conversion.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/exchangeStatus.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/funding.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/market.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/position.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/oracles.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/amm.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/trade.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/orders.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/repeg.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/liquidation.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/margin.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/insurance.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/superStake.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/spotPosition.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/state.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/tiers.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/marinade/index.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/orderParams.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/slot/SlotSubscriber.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/slot/SlothashSubscriber.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/wallet.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/keypair.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/utils.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/fuel.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/config.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/serum/serumSubscriber.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/serum/serumFulfillmentConfigMap.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/phoenix/phoenixSubscriber.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/priorityFee/index.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/phoenix/phoenixFulfillmentConfigMap.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/openbook/openbookV2Subscriber.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/openbook/openbookV2FulfillmentConfigMap.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/pythClient.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/pythPullClient.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/pythLazerClient.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/switchboardOnDemandClient.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/oracleId.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/utils.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/swift/swiftOrderSubscriber.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/swift/signedMsgUserAccountSubscriber.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/swift/grpcSignedMsgUserAccountSubscriber.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/fastSingleTxSender.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/retryTxSender.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/whileValidTxSender.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/priorityFeeCalculator.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/forwardOnlyTxSender.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/types.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/txHandler.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/tx/txParamProcessor.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/util/computeUnits.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/util/digest.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/util/tps.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/util/promiseTimeout.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/util/pythOracleUtils.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/spotBalance.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/driftClientConfig.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/dlob/DLOB.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/dlob/DLOBNode.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/dlob/NodeList.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/dlob/DLOBSubscriber.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/dlob/types.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/dlob/orderBookLevels.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/userMap/userMap.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/userMap/referrerMap.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/userMap/userStatsMap.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/userMap/revenueShareEscrowMap.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/userMap/userMapConfig.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/bankruptcy.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/orderSubscriber/index.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/orderSubscriber/types.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/auctionSubscriber/index.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/auctionSubscriber/types.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/memcmp.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/decode/user.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/blockhashSubscriber/index.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/util/chainClock.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/util/TransactionConfirmationManager.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/clock/clockSubscriber.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/math/userStatus.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/indicative-quotes/indicativeQuotesSender.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/index.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constituentMap/constituentMap.js [app-route] (ecmascript)"), exports);
}),
];

//# sourceMappingURL=df7f8_%40drift-labs_sdk_lib_browser_4e744a01._.js.map