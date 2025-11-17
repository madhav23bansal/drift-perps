module.exports = [
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/fetch.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchRevenueShareEscrowAccount = exports.fetchRevenueShareAccount = exports.fetchUserStatsAccount = exports.fetchUserAccountsUsingKeys = exports.fetchUserAccounts = void 0;
const pda_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/addresses/pda.js [app-route] (ecmascript)");
async function fetchUserAccounts(connection, program, authority, limit = 8) {
    const userAccountPublicKeys = new Array();
    for(let i = 0; i < limit; i++){
        userAccountPublicKeys.push(await (0, pda_1.getUserAccountPublicKey)(program.programId, authority, i));
    }
    return fetchUserAccountsUsingKeys(connection, program, userAccountPublicKeys);
}
exports.fetchUserAccounts = fetchUserAccounts;
async function fetchUserAccountsUsingKeys(connection, program, userAccountPublicKeys) {
    const accountInfos = await connection.getMultipleAccountsInfo(userAccountPublicKeys, 'confirmed');
    return accountInfos.map((accountInfo)=>{
        if (!accountInfo) {
            return undefined;
        }
        return program.account.user.coder.accounts.decodeUnchecked('User', accountInfo.data);
    });
}
exports.fetchUserAccountsUsingKeys = fetchUserAccountsUsingKeys;
async function fetchUserStatsAccount(connection, program, authority) {
    const userStatsPublicKey = (0, pda_1.getUserStatsAccountPublicKey)(program.programId, authority);
    const accountInfo = await connection.getAccountInfo(userStatsPublicKey, 'confirmed');
    return accountInfo ? program.account.user.coder.accounts.decodeUnchecked('UserStats', accountInfo.data) : undefined;
}
exports.fetchUserStatsAccount = fetchUserStatsAccount;
async function fetchRevenueShareAccount(connection, program, authority) {
    const revenueShareAccountPublicKey = (0, pda_1.getRevenueShareAccountPublicKey)(program.programId, authority);
    const accountInfo = await connection.getAccountInfo(revenueShareAccountPublicKey);
    if (!accountInfo) return null;
    return program.account.revenueShare.coder.accounts.decode('RevenueShare', accountInfo.data);
}
exports.fetchRevenueShareAccount = fetchRevenueShareAccount;
async function fetchRevenueShareEscrowAccount(connection, program, authority) {
    const revenueShareEscrowPubKey = (0, pda_1.getRevenueShareEscrowAccountPublicKey)(program.programId, authority);
    const escrow = await connection.getAccountInfo(revenueShareEscrowPubKey);
    if (!escrow) return null;
    const escrowAccount = program.account.revenueShareEscrow.coder.accounts.decode('RevenueShareEscrow', escrow.data);
    return escrowAccount;
}
exports.fetchRevenueShareEscrowAccount = fetchRevenueShareEscrowAccount;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/types.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DelistedMarketSetting = exports.NotSubscribedError = void 0;
class NotSubscribedError extends Error {
    constructor(){
        super(...arguments);
        this.name = 'NotSubscribedError';
    }
}
exports.NotSubscribedError = NotSubscribedError;
var DelistedMarketSetting;
(function(DelistedMarketSetting) {
    DelistedMarketSetting[DelistedMarketSetting["Unsubscribe"] = 0] = "Unsubscribe";
    DelistedMarketSetting[DelistedMarketSetting["Subscribe"] = 1] = "Subscribe";
    DelistedMarketSetting[DelistedMarketSetting["Discard"] = 2] = "Discard";
})(DelistedMarketSetting || (exports.DelistedMarketSetting = DelistedMarketSetting = {}));
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/utils.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findDelistedPerpMarketsAndOracles = exports.capitalize = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const oracleId_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/oracleId.js [app-route] (ecmascript)");
function capitalize(value) {
    return value[0].toUpperCase() + value.slice(1);
}
exports.capitalize = capitalize;
function findDelistedPerpMarketsAndOracles(perpMarkets, spotMarkets) {
    const delistedPerpMarketIndexes = [];
    const delistedOracles = [];
    for (const perpMarket of perpMarkets){
        if (!perpMarket.data) {
            continue;
        }
        if ((0, types_1.isVariant)(perpMarket.data.status, 'delisted')) {
            delistedPerpMarketIndexes.push(perpMarket.data.marketIndex);
            delistedOracles.push({
                publicKey: perpMarket.data.amm.oracle,
                source: perpMarket.data.amm.oracleSource
            });
        }
    }
    // make sure oracle isn't used by spot market
    const filteredDelistedOracles = [];
    for (const delistedOracle of delistedOracles){
        let isUsedBySpotMarket = false;
        for (const spotMarket of spotMarkets){
            if (!spotMarket.data) {
                continue;
            }
            const delistedOracleId = (0, oracleId_1.getOracleId)(delistedOracle.publicKey, delistedOracle.source);
            const spotMarketOracleId = (0, oracleId_1.getOracleId)(spotMarket.data.oracle, spotMarket.data.oracleSource);
            if (spotMarketOracleId === delistedOracleId) {
                isUsedBySpotMarket = true;
                break;
            }
        }
        if (!isUsedBySpotMarket) {
            filteredDelistedOracles.push(delistedOracle);
        }
    }
    return {
        perpMarketIndexes: delistedPerpMarketIndexes,
        oracles: filteredDelistedOracles
    };
}
exports.findDelistedPerpMarketsAndOracles = findDelistedPerpMarketsAndOracles;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketAccountSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WebSocketAccountSubscriber = void 0;
const utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/utils.js [app-route] (ecmascript)");
class WebSocketAccountSubscriber {
    constructor(accountName, program, accountPublicKey, decodeBuffer, resubOpts, commitment){
        var _a;
        this.isUnsubscribing = false;
        this.accountName = accountName;
        this.logAccountName = `${accountName}-${accountPublicKey.toBase58()}`;
        this.program = program;
        this.accountPublicKey = accountPublicKey;
        this.decodeBufferFn = decodeBuffer;
        this.resubOpts = resubOpts;
        if (((_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.resubTimeoutMs) < 1000) {
            console.log(`resubTimeoutMs should be at least 1000ms to avoid spamming resub ${this.logAccountName}`);
        }
        this.receivingData = false;
        this.commitment = commitment !== null && commitment !== void 0 ? commitment : this.program.provider.opts.commitment;
    }
    async subscribe(onChange) {
        var _a, _b;
        if (this.listenerId != null || this.isUnsubscribing) {
            if ((_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.logResubMessages) {
                console.log(`[${this.logAccountName}] Subscribe returning early - listenerId=${this.listenerId}, isUnsubscribing=${this.isUnsubscribing}`);
            }
            return;
        }
        this.onChange = onChange;
        if (!this.dataAndSlot) {
            await this.fetch();
        }
        this.listenerId = this.program.provider.connection.onAccountChange(this.accountPublicKey, (accountInfo, context)=>{
            var _a;
            if ((_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.resubTimeoutMs) {
                this.receivingData = true;
                clearTimeout(this.timeoutId);
                this.handleRpcResponse(context, accountInfo);
                this.setTimeout();
            } else {
                this.handleRpcResponse(context, accountInfo);
            }
        }, this.commitment);
        if ((_b = this.resubOpts) === null || _b === void 0 ? void 0 : _b.resubTimeoutMs) {
            this.receivingData = true;
            this.setTimeout();
        }
    }
    setData(data, slot) {
        const newSlot = slot || 0;
        if (this.dataAndSlot && this.dataAndSlot.slot > newSlot) {
            return;
        }
        this.dataAndSlot = {
            data,
            slot
        };
    }
    setTimeout() {
        var _a;
        if (!this.onChange) {
            throw new Error('onChange callback function must be set');
        }
        this.timeoutId = setTimeout(async ()=>{
            var _a, _b, _c, _d;
            if (this.isUnsubscribing) {
                // If we are in the process of unsubscribing, do not attempt to resubscribe
                if ((_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.logResubMessages) {
                    console.log(`[${this.logAccountName}] Timeout fired but isUnsubscribing=true, skipping resubscribe`);
                }
                return;
            }
            if (this.receivingData) {
                if ((_b = this.resubOpts) === null || _b === void 0 ? void 0 : _b.logResubMessages) {
                    console.log(`No ws data from ${this.logAccountName} in ${this.resubOpts.resubTimeoutMs}ms, resubscribing - listenerId=${this.listenerId}, isUnsubscribing=${this.isUnsubscribing}`);
                }
                await this.unsubscribe(true);
                this.receivingData = false;
                await this.subscribe(this.onChange);
                if ((_c = this.resubOpts) === null || _c === void 0 ? void 0 : _c.logResubMessages) {
                    console.log(`[${this.logAccountName}] Resubscribe completed - receivingData=${this.receivingData}, listenerId=${this.listenerId}, isUnsubscribing=${this.isUnsubscribing}`);
                }
            } else {
                if ((_d = this.resubOpts) === null || _d === void 0 ? void 0 : _d.logResubMessages) {
                    console.log(`[${this.logAccountName}] Timeout fired but receivingData=false, skipping resubscribe`);
                }
            }
        }, (_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.resubTimeoutMs);
    }
    async fetch() {
        const rpcResponse = await this.program.provider.connection.getAccountInfoAndContext(this.accountPublicKey, this.program.provider.opts.commitment);
        this.handleRpcResponse(rpcResponse.context, rpcResponse === null || rpcResponse === void 0 ? void 0 : rpcResponse.value);
    }
    handleRpcResponse(context, accountInfo) {
        const newSlot = context.slot;
        let newBuffer = undefined;
        if (accountInfo) {
            newBuffer = accountInfo.data;
        }
        if (!this.bufferAndSlot) {
            this.bufferAndSlot = {
                buffer: newBuffer,
                slot: newSlot
            };
            if (newBuffer) {
                const account = this.decodeBuffer(newBuffer);
                this.dataAndSlot = {
                    data: account,
                    slot: newSlot
                };
                this.onChange(account);
            }
            return;
        }
        if (newSlot < this.bufferAndSlot.slot) {
            return;
        }
        const oldBuffer = this.bufferAndSlot.buffer;
        if (newBuffer && (!oldBuffer || !newBuffer.equals(oldBuffer))) {
            this.bufferAndSlot = {
                buffer: newBuffer,
                slot: newSlot
            };
            const account = this.decodeBuffer(newBuffer);
            this.dataAndSlot = {
                data: account,
                slot: newSlot
            };
            this.onChange(account);
        }
    }
    decodeBuffer(buffer) {
        if (this.decodeBufferFn) {
            return this.decodeBufferFn(buffer);
        } else {
            return this.program.account[this.accountName].coder.accounts.decode((0, utils_1.capitalize)(this.accountName), buffer);
        }
    }
    unsubscribe(onResub = false) {
        if (!onResub && this.resubOpts) {
            this.resubOpts.resubTimeoutMs = undefined;
        }
        this.isUnsubscribing = true;
        clearTimeout(this.timeoutId);
        this.timeoutId = undefined;
        if (this.listenerId != null) {
            const promise = Promise.race([
                this.program.provider.connection.removeAccountChangeListener(this.listenerId),
                new Promise((_, reject)=>setTimeout(()=>reject(new Error(`Unsubscribe timeout for account ${this.logAccountName}`)), 10000))
            ]).then(()=>{
                this.listenerId = undefined;
                this.isUnsubscribing = false;
            }).catch((error)=>{
                console.error(`[${this.logAccountName}] Unsubscribe failed, forcing cleanup - listenerId=${this.listenerId}, isUnsubscribing=${this.isUnsubscribing}`, error);
                this.listenerId = undefined;
                this.isUnsubscribing = false;
            });
            return promise;
        } else {
            this.isUnsubscribing = false;
        }
    }
}
exports.WebSocketAccountSubscriber = WebSocketAccountSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketDriftClientAccountSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WebSocketDriftClientAccountSubscriber = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/types.js [app-route] (ecmascript)");
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
const pda_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/addresses/pda.js [app-route] (ecmascript)");
const webSocketAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketAccountSubscriber.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const oracleClientCache_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/oracleClientCache.js [app-route] (ecmascript)");
const quoteAssetOracleClient_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/quoteAssetOracleClient.js [app-route] (ecmascript)");
const config_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/config.js [app-route] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/utils.js [app-route] (ecmascript)");
const oracleId_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/oracleId.js [app-route] (ecmascript)");
const types_2 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const ORACLE_DEFAULT_ID = (0, oracleId_1.getOracleId)(web3_js_1.PublicKey.default, types_2.OracleSource.QUOTE_ASSET);
class WebSocketDriftClientAccountSubscriber {
    constructor(program, perpMarketIndexes, spotMarketIndexes, oracleInfos, shouldFindAllMarketsAndOracles, delistedMarketSetting, resubOpts, commitment, customPerpMarketAccountSubscriber, customOracleAccountSubscriber){
        this.oracleClientCache = new oracleClientCache_1.OracleClientCache();
        this.perpMarketAccountSubscribers = new Map();
        this.perpOracleMap = new Map();
        this.perpOracleStringMap = new Map();
        this.spotMarketAccountSubscribers = new Map();
        this.spotOracleMap = new Map();
        this.spotOracleStringMap = new Map();
        this.oracleSubscribers = new Map();
        this.isSubscribing = false;
        this.chunks = (array, size)=>{
            return new Array(Math.ceil(array.length / size)).fill(null).map((_, index)=>index * size).map((begin)=>array.slice(begin, begin + size));
        };
        this.isSubscribed = false;
        this.program = program;
        this.eventEmitter = new events_1.EventEmitter();
        this.perpMarketIndexes = perpMarketIndexes;
        this.spotMarketIndexes = spotMarketIndexes;
        this.oracleInfos = oracleInfos;
        this.shouldFindAllMarketsAndOracles = shouldFindAllMarketsAndOracles;
        this.delistedMarketSetting = delistedMarketSetting;
        this.resubOpts = resubOpts;
        this.commitment = commitment;
        this.customPerpMarketAccountSubscriber = customPerpMarketAccountSubscriber;
        this.customOracleAccountSubscriber = customOracleAccountSubscriber;
    }
    async subscribe() {
        if (this.isSubscribed) {
            return true;
        }
        if (this.isSubscribing) {
            return await this.subscriptionPromise;
        }
        this.isSubscribing = true;
        this.subscriptionPromise = new Promise((res)=>{
            this.subscriptionPromiseResolver = res;
        });
        if (this.shouldFindAllMarketsAndOracles) {
            const { perpMarketIndexes, perpMarketAccounts, spotMarketIndexes, spotMarketAccounts, oracleInfos } = await (0, config_1.findAllMarketAndOracles)(this.program);
            this.perpMarketIndexes = perpMarketIndexes;
            this.spotMarketIndexes = spotMarketIndexes;
            this.oracleInfos = oracleInfos;
            // front run and set the initial data here to save extra gma call in set initial data
            this.initialPerpMarketAccountData = new Map(perpMarketAccounts.map((market)=>[
                    market.marketIndex,
                    market
                ]));
            this.initialSpotMarketAccountData = new Map(spotMarketAccounts.map((market)=>[
                    market.marketIndex,
                    market
                ]));
        }
        const statePublicKey = await (0, pda_1.getDriftStateAccountPublicKey)(this.program.programId);
        // create and activate main state account subscription
        this.stateAccountSubscriber = new webSocketAccountSubscriber_1.WebSocketAccountSubscriber('state', this.program, statePublicKey, undefined, undefined, this.commitment);
        await this.stateAccountSubscriber.subscribe((data)=>{
            this.eventEmitter.emit('stateAccountUpdate', data);
            this.eventEmitter.emit('update');
        });
        // set initial data to avoid spamming getAccountInfo calls in webSocketAccountSubscriber
        await this.setInitialData();
        await Promise.all([
            // subscribe to market accounts
            this.subscribeToPerpMarketAccounts(),
            // subscribe to spot market accounts
            this.subscribeToSpotMarketAccounts(),
            // subscribe to oracles
            this.subscribeToOracles()
        ]);
        this.eventEmitter.emit('update');
        await this.handleDelistedMarkets();
        await Promise.all([
            this.setPerpOracleMap(),
            this.setSpotOracleMap()
        ]);
        this.isSubscribing = false;
        this.isSubscribed = true;
        this.subscriptionPromiseResolver(true);
        // delete initial data
        this.removeInitialData();
        return true;
    }
    async setInitialData() {
        const connection = this.program.provider.connection;
        if (!this.initialPerpMarketAccountData) {
            const perpMarketPublicKeys = this.perpMarketIndexes.map((marketIndex)=>(0, pda_1.getPerpMarketPublicKeySync)(this.program.programId, marketIndex));
            const perpMarketPublicKeysChunks = this.chunks(perpMarketPublicKeys, 75);
            const perpMarketAccountInfos = (await Promise.all(perpMarketPublicKeysChunks.map((perpMarketPublicKeysChunk)=>connection.getMultipleAccountsInfo(perpMarketPublicKeysChunk)))).flat();
            this.initialPerpMarketAccountData = new Map(perpMarketAccountInfos.filter((accountInfo)=>!!accountInfo).map((accountInfo)=>{
                const perpMarket = this.program.coder.accounts.decode('PerpMarket', accountInfo.data);
                return [
                    perpMarket.marketIndex,
                    perpMarket
                ];
            }));
        }
        if (!this.initialSpotMarketAccountData) {
            const spotMarketPublicKeys = this.spotMarketIndexes.map((marketIndex)=>(0, pda_1.getSpotMarketPublicKeySync)(this.program.programId, marketIndex));
            const spotMarketPublicKeysChunks = this.chunks(spotMarketPublicKeys, 75);
            const spotMarketAccountInfos = (await Promise.all(spotMarketPublicKeysChunks.map((spotMarketPublicKeysChunk)=>connection.getMultipleAccountsInfo(spotMarketPublicKeysChunk)))).flat();
            this.initialSpotMarketAccountData = new Map(spotMarketAccountInfos.filter((accountInfo)=>!!accountInfo).map((accountInfo)=>{
                const spotMarket = this.program.coder.accounts.decode('SpotMarket', accountInfo.data);
                return [
                    spotMarket.marketIndex,
                    spotMarket
                ];
            }));
        }
        const oracleAccountPubkeyChunks = this.chunks(this.oracleInfos.map((oracleInfo)=>oracleInfo.publicKey), 75);
        const oracleAccountInfos = (await Promise.all(oracleAccountPubkeyChunks.map((oracleAccountPublicKeysChunk)=>connection.getMultipleAccountsInfo(oracleAccountPublicKeysChunk)))).flat();
        this.initialOraclePriceData = new Map(this.oracleInfos.reduce((result, oracleInfo, i)=>{
            if (!oracleAccountInfos[i]) {
                return result;
            }
            const oracleClient = this.oracleClientCache.get(oracleInfo.source, connection, this.program);
            const oraclePriceData = oracleClient.getOraclePriceDataFromBuffer(oracleAccountInfos[i].data);
            result.push([
                (0, oracleId_1.getOracleId)(oracleInfo.publicKey, oracleInfo.source),
                oraclePriceData
            ]);
            return result;
        }, []));
    }
    removeInitialData() {
        this.initialPerpMarketAccountData = new Map();
        this.initialSpotMarketAccountData = new Map();
        this.initialOraclePriceData = new Map();
    }
    async subscribeToPerpMarketAccounts() {
        await Promise.all(this.perpMarketIndexes.map((marketIndex)=>this.subscribeToPerpMarketAccount(marketIndex)));
        return true;
    }
    async subscribeToPerpMarketAccount(marketIndex) {
        const perpMarketPublicKey = await (0, pda_1.getPerpMarketPublicKey)(this.program.programId, marketIndex);
        const AccountSubscriberClass = this.customPerpMarketAccountSubscriber || webSocketAccountSubscriber_1.WebSocketAccountSubscriber;
        const accountSubscriber = new AccountSubscriberClass('perpMarket', this.program, perpMarketPublicKey, undefined, this.resubOpts, this.commitment);
        accountSubscriber.setData(this.initialPerpMarketAccountData.get(marketIndex));
        await accountSubscriber.subscribe((data)=>{
            this.eventEmitter.emit('perpMarketAccountUpdate', data);
            this.eventEmitter.emit('update');
        });
        this.perpMarketAccountSubscribers.set(marketIndex, accountSubscriber);
        return true;
    }
    async subscribeToSpotMarketAccounts() {
        await Promise.all(this.spotMarketIndexes.map((marketIndex)=>this.subscribeToSpotMarketAccount(marketIndex)));
        return true;
    }
    async subscribeToSpotMarketAccount(marketIndex) {
        const marketPublicKey = await (0, pda_1.getSpotMarketPublicKey)(this.program.programId, marketIndex);
        const accountSubscriber = new webSocketAccountSubscriber_1.WebSocketAccountSubscriber('spotMarket', this.program, marketPublicKey, undefined, this.resubOpts, this.commitment);
        accountSubscriber.setData(this.initialSpotMarketAccountData.get(marketIndex));
        await accountSubscriber.subscribe((data)=>{
            this.eventEmitter.emit('spotMarketAccountUpdate', data);
            this.eventEmitter.emit('update');
        });
        this.spotMarketAccountSubscribers.set(marketIndex, accountSubscriber);
        return true;
    }
    async subscribeToOracles() {
        await Promise.all(this.oracleInfos.filter((oracleInfo)=>!oracleInfo.publicKey.equals(web3_js_1.PublicKey.default)).map((oracleInfo)=>this.subscribeToOracle(oracleInfo)));
        return true;
    }
    async subscribeToOracle(oracleInfo) {
        const oracleId = (0, oracleId_1.getOracleId)(oracleInfo.publicKey, oracleInfo.source);
        const client = this.oracleClientCache.get(oracleInfo.source, this.program.provider.connection, this.program);
        const AccountSubscriberClass = this.customOracleAccountSubscriber || webSocketAccountSubscriber_1.WebSocketAccountSubscriber;
        const accountSubscriber = new AccountSubscriberClass('oracle', this.program, oracleInfo.publicKey, (buffer)=>{
            return client.getOraclePriceDataFromBuffer(buffer);
        }, this.resubOpts, this.commitment);
        const initialOraclePriceData = this.initialOraclePriceData.get(oracleId);
        if (initialOraclePriceData) {
            accountSubscriber.setData(initialOraclePriceData);
        }
        await accountSubscriber.subscribe((data)=>{
            this.eventEmitter.emit('oraclePriceUpdate', oracleInfo.publicKey, oracleInfo.source, data);
            this.eventEmitter.emit('update');
        });
        this.oracleSubscribers.set(oracleId, accountSubscriber);
        return true;
    }
    async unsubscribeFromMarketAccounts() {
        await Promise.all(Array.from(this.perpMarketAccountSubscribers.values()).map((accountSubscriber)=>accountSubscriber.unsubscribe()));
    }
    async unsubscribeFromSpotMarketAccounts() {
        await Promise.all(Array.from(this.spotMarketAccountSubscribers.values()).map((accountSubscriber)=>accountSubscriber.unsubscribe()));
    }
    async unsubscribeFromOracles() {
        await Promise.all(Array.from(this.oracleSubscribers.values()).map((accountSubscriber)=>accountSubscriber.unsubscribe()));
    }
    async fetch() {
        if (!this.isSubscribed) {
            return;
        }
        const promises = [
            this.stateAccountSubscriber.fetch()
        ].concat(Array.from(this.perpMarketAccountSubscribers.values()).map((subscriber)=>subscriber.fetch())).concat(Array.from(this.spotMarketAccountSubscribers.values()).map((subscriber)=>subscriber.fetch()));
        await Promise.all(promises);
    }
    async unsubscribe() {
        if (!this.isSubscribed) {
            return;
        }
        await this.stateAccountSubscriber.unsubscribe();
        await this.unsubscribeFromMarketAccounts();
        await this.unsubscribeFromSpotMarketAccounts();
        await this.unsubscribeFromOracles();
        this.isSubscribed = false;
    }
    async addSpotMarket(marketIndex) {
        if (this.spotMarketAccountSubscribers.has(marketIndex)) {
            return true;
        }
        const subscriptionSuccess = this.subscribeToSpotMarketAccount(marketIndex);
        await this.setSpotOracleMap();
        return subscriptionSuccess;
    }
    async addPerpMarket(marketIndex) {
        if (this.perpMarketAccountSubscribers.has(marketIndex)) {
            return true;
        }
        const subscriptionSuccess = this.subscribeToPerpMarketAccount(marketIndex);
        await this.setPerpOracleMap();
        return subscriptionSuccess;
    }
    async addOracle(oracleInfo) {
        const oracleId = (0, oracleId_1.getOracleId)(oracleInfo.publicKey, oracleInfo.source);
        if (this.oracleSubscribers.has(oracleId)) {
            return true;
        }
        if (oracleInfo.publicKey.equals(web3_js_1.PublicKey.default)) {
            return true;
        }
        return this.subscribeToOracle(oracleInfo);
    }
    async setPerpOracleMap() {
        const perpMarkets = this.getMarketAccountsAndSlots();
        const addOraclePromises = [];
        for (const perpMarket of perpMarkets){
            if (!perpMarket || !perpMarket.data) {
                continue;
            }
            const perpMarketAccount = perpMarket.data;
            const perpMarketIndex = perpMarketAccount.marketIndex;
            const oracle = perpMarketAccount.amm.oracle;
            const oracleId = (0, oracleId_1.getOracleId)(oracle, perpMarket.data.amm.oracleSource);
            if (!this.oracleSubscribers.has(oracleId)) {
                addOraclePromises.push(this.addOracle({
                    publicKey: oracle,
                    source: perpMarket.data.amm.oracleSource
                }));
            }
            this.perpOracleMap.set(perpMarketIndex, oracle);
            this.perpOracleStringMap.set(perpMarketIndex, oracleId);
        }
        await Promise.all(addOraclePromises);
    }
    async setSpotOracleMap() {
        const spotMarkets = this.getSpotMarketAccountsAndSlots();
        const addOraclePromises = [];
        for (const spotMarket of spotMarkets){
            if (!spotMarket || !spotMarket.data) {
                continue;
            }
            const spotMarketAccount = spotMarket.data;
            const spotMarketIndex = spotMarketAccount.marketIndex;
            const oracle = spotMarketAccount.oracle;
            const oracleId = (0, oracleId_1.getOracleId)(oracle, spotMarketAccount.oracleSource);
            if (!this.oracleSubscribers.has(oracleId)) {
                addOraclePromises.push(this.addOracle({
                    publicKey: oracle,
                    source: spotMarketAccount.oracleSource
                }));
            }
            this.spotOracleMap.set(spotMarketIndex, oracle);
            this.spotOracleStringMap.set(spotMarketIndex, oracleId);
        }
        await Promise.all(addOraclePromises);
    }
    async handleDelistedMarkets() {
        if (this.delistedMarketSetting === types_1.DelistedMarketSetting.Subscribe) {
            return;
        }
        const { perpMarketIndexes, oracles } = (0, utils_1.findDelistedPerpMarketsAndOracles)(this.getMarketAccountsAndSlots(), this.getSpotMarketAccountsAndSlots());
        for (const perpMarketIndex of perpMarketIndexes){
            await this.perpMarketAccountSubscribers.get(perpMarketIndex).unsubscribe();
            if (this.delistedMarketSetting === types_1.DelistedMarketSetting.Discard) {
                this.perpMarketAccountSubscribers.delete(perpMarketIndex);
            }
        }
        for (const oracle of oracles){
            const oracleId = (0, oracleId_1.getOracleId)(oracle.publicKey, oracle.source);
            await this.oracleSubscribers.get(oracleId).unsubscribe();
            if (this.delistedMarketSetting === types_1.DelistedMarketSetting.Discard) {
                this.oracleSubscribers.delete(oracleId);
            }
        }
    }
    assertIsSubscribed() {
        if (!this.isSubscribed) {
            throw new types_1.NotSubscribedError('You must call `subscribe` before using this function');
        }
    }
    getStateAccountAndSlot() {
        this.assertIsSubscribed();
        return this.stateAccountSubscriber.dataAndSlot;
    }
    getMarketAccountAndSlot(marketIndex) {
        this.assertIsSubscribed();
        return this.perpMarketAccountSubscribers.get(marketIndex).dataAndSlot;
    }
    getMarketAccountsAndSlots() {
        return Array.from(this.perpMarketAccountSubscribers.values()).map((subscriber)=>subscriber.dataAndSlot);
    }
    getSpotMarketAccountAndSlot(marketIndex) {
        this.assertIsSubscribed();
        return this.spotMarketAccountSubscribers.get(marketIndex).dataAndSlot;
    }
    getSpotMarketAccountsAndSlots() {
        return Array.from(this.spotMarketAccountSubscribers.values()).map((subscriber)=>subscriber.dataAndSlot);
    }
    getOraclePriceDataAndSlot(oracleId) {
        this.assertIsSubscribed();
        if (oracleId === ORACLE_DEFAULT_ID) {
            return {
                data: quoteAssetOracleClient_1.QUOTE_ORACLE_PRICE_DATA,
                slot: 0
            };
        }
        return this.oracleSubscribers.get(oracleId).dataAndSlot;
    }
    getOraclePriceDataAndSlotForPerpMarket(marketIndex) {
        const perpMarketAccount = this.getMarketAccountAndSlot(marketIndex);
        const oracle = this.perpOracleMap.get(marketIndex);
        const oracleId = this.perpOracleStringMap.get(marketIndex);
        if (!perpMarketAccount || !oracleId) {
            return undefined;
        }
        if (!perpMarketAccount.data.amm.oracle.equals(oracle)) {
            // If the oracle has changed, we need to update the oracle map in background
            this.setPerpOracleMap();
        }
        return this.getOraclePriceDataAndSlot(oracleId);
    }
    getOraclePriceDataAndSlotForSpotMarket(marketIndex) {
        const spotMarketAccount = this.getSpotMarketAccountAndSlot(marketIndex);
        const oracle = this.spotOracleMap.get(marketIndex);
        const oracleId = this.spotOracleStringMap.get(marketIndex);
        if (!spotMarketAccount || !oracleId) {
            return undefined;
        }
        if (!spotMarketAccount.data.oracle.equals(oracle)) {
            // If the oracle has changed, we need to update the oracle map in background
            this.setSpotOracleMap();
        }
        return this.getOraclePriceDataAndSlot(oracleId);
    }
}
exports.WebSocketDriftClientAccountSubscriber = WebSocketDriftClientAccountSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketInsuranceFundStakeAccountSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WebSocketInsuranceFundStakeAccountSubscriber = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/types.js [app-route] (ecmascript)");
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
const webSocketAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketAccountSubscriber.js [app-route] (ecmascript)");
class WebSocketInsuranceFundStakeAccountSubscriber {
    constructor(program, insuranceFundStakeAccountPublicKey, resubTimeoutMs, commitment){
        this.isSubscribed = false;
        this.program = program;
        this.insuranceFundStakeAccountPublicKey = insuranceFundStakeAccountPublicKey;
        this.eventEmitter = new events_1.EventEmitter();
        this.resubTimeoutMs = resubTimeoutMs;
        this.commitment = commitment;
    }
    async subscribe(insuranceFundStakeAccount) {
        if (this.isSubscribed) {
            return true;
        }
        this.insuranceFundStakeDataAccountSubscriber = new webSocketAccountSubscriber_1.WebSocketAccountSubscriber('insuranceFundStake', this.program, this.insuranceFundStakeAccountPublicKey, undefined, {
            resubTimeoutMs: this.resubTimeoutMs
        }, this.commitment);
        if (insuranceFundStakeAccount) {
            this.insuranceFundStakeDataAccountSubscriber.setData(insuranceFundStakeAccount);
        }
        await this.insuranceFundStakeDataAccountSubscriber.subscribe((data)=>{
            this.eventEmitter.emit('insuranceFundStakeAccountUpdate', data);
            this.eventEmitter.emit('update');
        });
        this.eventEmitter.emit('update');
        this.isSubscribed = true;
        return true;
    }
    async fetch() {
        await Promise.all([
            this.insuranceFundStakeDataAccountSubscriber.fetch()
        ]);
    }
    async unsubscribe() {
        if (!this.isSubscribed) {
            return;
        }
        await Promise.all([
            this.insuranceFundStakeDataAccountSubscriber.unsubscribe()
        ]);
        this.isSubscribed = false;
    }
    assertIsSubscribed() {
        if (!this.isSubscribed) {
            throw new types_1.NotSubscribedError('You must call `subscribe` before using this function');
        }
    }
    getInsuranceFundStakeAccountAndSlot() {
        this.assertIsSubscribed();
        return this.insuranceFundStakeDataAccountSubscriber.dataAndSlot;
    }
    updateData(insuranceFundStake, slot) {
        var _a;
        const currentDataSlot = ((_a = this.insuranceFundStakeDataAccountSubscriber.dataAndSlot) === null || _a === void 0 ? void 0 : _a.slot) || 0;
        if (currentDataSlot <= slot) {
            this.insuranceFundStakeDataAccountSubscriber.setData(insuranceFundStake, slot);
            this.eventEmitter.emit('insuranceFundStakeAccountUpdate', insuranceFundStake);
            this.eventEmitter.emit('update');
        }
    }
}
exports.WebSocketInsuranceFundStakeAccountSubscriber = WebSocketInsuranceFundStakeAccountSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketHighLeverageModeConfigAccountSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WebSocketHighLeverageModeConfigAccountSubscriber = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/types.js [app-route] (ecmascript)");
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
const webSocketAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketAccountSubscriber.js [app-route] (ecmascript)");
class WebSocketHighLeverageModeConfigAccountSubscriber {
    constructor(program, highLeverageModeConfigAccountPublicKey, resubTimeoutMs, commitment){
        this.isSubscribed = false;
        this.program = program;
        this.highLeverageModeConfigAccountPublicKey = highLeverageModeConfigAccountPublicKey;
        this.eventEmitter = new events_1.EventEmitter();
        this.resubTimeoutMs = resubTimeoutMs;
        this.commitment = commitment;
    }
    async subscribe(highLeverageModeConfigAccount) {
        if (this.isSubscribed) {
            return true;
        }
        this.highLeverageModeConfigDataAccountSubscriber = new webSocketAccountSubscriber_1.WebSocketAccountSubscriber('highLeverageModeConfig', this.program, this.highLeverageModeConfigAccountPublicKey, undefined, {
            resubTimeoutMs: this.resubTimeoutMs
        }, this.commitment);
        if (highLeverageModeConfigAccount) {
            this.highLeverageModeConfigDataAccountSubscriber.setData(highLeverageModeConfigAccount);
        }
        await this.highLeverageModeConfigDataAccountSubscriber.subscribe((data)=>{
            this.eventEmitter.emit('highLeverageModeConfigAccountUpdate', data);
            this.eventEmitter.emit('update');
        });
        this.eventEmitter.emit('update');
        this.isSubscribed = true;
        return true;
    }
    async fetch() {
        await Promise.all([
            this.highLeverageModeConfigDataAccountSubscriber.fetch()
        ]);
    }
    async unsubscribe() {
        if (!this.isSubscribed) {
            return;
        }
        await Promise.all([
            this.highLeverageModeConfigDataAccountSubscriber.unsubscribe()
        ]);
        this.isSubscribed = false;
    }
    assertIsSubscribed() {
        if (!this.isSubscribed) {
            throw new types_1.NotSubscribedError('You must call `subscribe` before using this function');
        }
    }
    getHighLeverageModeConfigAccountAndSlot() {
        this.assertIsSubscribed();
        return this.highLeverageModeConfigDataAccountSubscriber.dataAndSlot;
    }
    updateData(highLeverageModeConfig, slot) {
        var _a;
        const currentDataSlot = ((_a = this.highLeverageModeConfigDataAccountSubscriber.dataAndSlot) === null || _a === void 0 ? void 0 : _a.slot) || 0;
        if (currentDataSlot <= slot) {
            this.highLeverageModeConfigDataAccountSubscriber.setData(highLeverageModeConfig, slot);
            this.eventEmitter.emit('highLeverageModeConfigAccountUpdate', highLeverageModeConfig);
            this.eventEmitter.emit('update');
        }
    }
}
exports.WebSocketHighLeverageModeConfigAccountSubscriber = WebSocketHighLeverageModeConfigAccountSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketAccountSubscriberV2.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WebSocketAccountSubscriberV2 = void 0;
const utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/utils.js [app-route] (ecmascript)");
const gill_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/gill@0.10.3_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/gill/dist/index.node.cjs [app-route] (ecmascript)");
const bs58_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/bs58@4.0.1/node_modules/bs58/index.js [app-route] (ecmascript)"));
/**
 * WebSocketAccountSubscriberV2
 *
 * High-level overview
 * - WebSocket-first subscriber for a single Solana account with optional
 *   polling safeguards when the WS feed goes quiet.
 * - Emits decoded updates via `onChange` and maintains the latest
 *   `{buffer, slot}` and decoded `{data, slot}` internally.
 *
 * Why polling if this is a WebSocket subscriber?
 * - Under real-world conditions, WS notifications can stall or get dropped.
 * - When `resubOpts.resubTimeoutMs` elapses without WS data, you can either:
 *   - resubscribe to the WS stream (default), or
 *   - enable `resubOpts.usePollingInsteadOfResub` to start polling this single
 *     account via RPC to check for missed changes.
 * - Polling compares the fetched buffer to the last known buffer. If different
 *   at an equal-or-later slot, it indicates a missed update and we resubscribe
 *   to WS to restore a clean stream.
 *
 * Initial fetch (on subscribe)
 * - On `subscribe()`, we do a one-time RPC `fetch()` to seed internal state and
 *   emit the latest account state, ensuring consumers start from ground truth
 *   even before WS events arrive.
 *
 * Continuous polling (opt-in)
 * - If `usePollingInsteadOfResub` is set, the inactivity timeout triggers a
 *   polling loop that periodically `fetch()`es the account and checks for
 *   changes. On change, polling stops and we resubscribe to WS.
 * - If not set (default), the inactivity timeout immediately triggers a WS
 *   resubscription (no polling loop).
 *
 * Account focus
 * - This class tracks exactly one account — the one passed to the constructor —
 *   which is by definition the account the consumer cares about. The extra
 *   logic is narrowly scoped to this account to minimize overhead.
 *
 * Tuning knobs
 * - `resubOpts.resubTimeoutMs`: WS inactivity threshold before fallback.
 * - `resubOpts.usePollingInsteadOfResub`: toggle polling vs immediate resub.
 * - `resubOpts.pollingIntervalMs`: polling cadence (default 30s).
 * - `resubOpts.logResubMessages`: verbose logs for diagnostics.
 * - `commitment`: WS/RPC commitment used for reads and notifications.
 * - `decodeBufferFn`: optional custom decode; defaults to Anchor coder.
 *
 * Implementation notes
 * - Uses `gill` for both WS (`rpcSubscriptions`) and RPC (`rpc`) to match the
 *   program provider’s RPC endpoint. Handles base58/base64 encoded data.
 */ class WebSocketAccountSubscriberV2 {
    /**
     * Create a single-account WebSocket subscriber with optional polling fallback.
     *
     * @param accountName Name of the Anchor account type (used for default decode).
     * @param program Anchor `Program` used for decoding and provider access.
     * @param accountPublicKey Public key of the account to track.
     * @param decodeBuffer Optional custom decode function; if omitted, uses
     *   program coder to decode `accountName`.
     * @param resubOpts Resubscription/polling options. See class docs.
     * @param commitment Commitment for WS and RPC operations.
     * @param rpcSubscriptions Optional override/injection for testing.
     * @param rpc Optional override/injection for testing.
     */ constructor(accountName, program, accountPublicKey, decodeBuffer, resubOpts, commitment, rpcSubscriptions, rpc){
        this.isUnsubscribing = false;
        this.accountName = accountName;
        this.logAccountName = `${accountName}-${accountPublicKey.toBase58()}-ws-acct-subscriber-v2`;
        this.program = program;
        this.accountPublicKey = accountPublicKey;
        this.decodeBufferFn = decodeBuffer;
        this.resubOpts = resubOpts !== null && resubOpts !== void 0 ? resubOpts : {
            resubTimeoutMs: 30000,
            usePollingInsteadOfResub: true,
            logResubMessages: false
        };
        if (this.resubOpts.resubTimeoutMs < 1000) {
            console.log(`resubTimeoutMs should be at least 1000ms to avoid spamming resub ${this.logAccountName}`);
        }
        this.receivingData = false;
        if ([
            'recent',
            'single',
            'singleGossip',
            'root',
            'max'
        ].includes(this.program.provider.opts.commitment)) {
            console.warn(`using commitment ${this.program.provider.opts.commitment} that is not supported by gill, this may cause issues`);
        }
        this.commitment = commitment !== null && commitment !== void 0 ? commitment : this.program.provider.opts.commitment;
        // Initialize gill client using the same RPC URL as the program provider
        this.rpc = rpc ? rpc : (()=>{
            const rpcUrl = this.program.provider.connection.rpcEndpoint;
            const { rpc } = (0, gill_1.createSolanaClient)({
                urlOrMoniker: rpcUrl
            });
            return rpc;
        })();
        this.rpcSubscriptions = rpcSubscriptions ? rpcSubscriptions : (()=>{
            const rpcUrl = this.program.provider.connection.rpcEndpoint;
            const { rpcSubscriptions } = (0, gill_1.createSolanaClient)({
                urlOrMoniker: rpcUrl
            });
            return rpcSubscriptions;
        })();
    }
    async handleNotificationLoop(subscriptionPromise) {
        const subscription = await subscriptionPromise;
        for await (const notification of subscription){
            // If we're currently polling and receive a WebSocket event, stop polling
            if (this.pollingTimeoutId) {
                if (this.resubOpts.logResubMessages) {
                    console.log(`[${this.logAccountName}] Received WebSocket event while polling, stopping polling`);
                }
                this.stopPolling();
            }
            this.receivingData = true;
            clearTimeout(this.timeoutId);
            this.handleRpcResponse(notification.context, notification.value);
            this.setTimeout();
        }
    }
    async subscribe(onChange) {
        /**
         * Start the WebSocket subscription and (optionally) setup inactivity
         * fallback.
         *
         * Flow
         * - If we do not have initial state, perform a one-time `fetch()` to seed
         *   internal buffers and emit current data.
         * - Subscribe to account notifications via WS.
         * - If `resubOpts.resubTimeoutMs` is set, schedule an inactivity timeout.
         *   When it fires:
         *   - if `usePollingInsteadOfResub` is true, start polling loop;
         *   - otherwise, resubscribe to WS immediately.
         */ if (this.listenerId != null || this.isUnsubscribing) {
            if (this.resubOpts.logResubMessages) {
                console.log(`[${this.logAccountName}] Subscribe returning early - listenerId=${this.listenerId}, isUnsubscribing=${this.isUnsubscribing}`);
            }
            return;
        }
        this.onChange = onChange;
        if (!this.dataAndSlot) {
            await this.fetch();
        }
        // Create abort controller for proper cleanup
        const abortController = new AbortController();
        this.abortController = abortController;
        this.listenerId = Math.random(); // Unique ID for logging purposes
        if (this.resubOpts.resubTimeoutMs) {
            this.receivingData = true;
            this.setTimeout();
        }
        // Subscribe to account changes using gill's rpcSubscriptions
        const pubkey = this.accountPublicKey.toBase58();
        if ((0, gill_1.isAddress)(pubkey)) {
            const subscriptionPromise = this.rpcSubscriptions.accountNotifications(pubkey, {
                commitment: this.commitment,
                encoding: 'base64'
            }).subscribe({
                abortSignal: abortController.signal
            });
            // Start notification loop with the subscription promise
            this.handleNotificationLoop(subscriptionPromise);
        } else {
            throw new Error('Invalid account public key');
        }
    }
    setData(data, slot) {
        const newSlot = slot || 0;
        if (this.dataAndSlot && this.dataAndSlot.slot > newSlot) {
            return;
        }
        this.dataAndSlot = {
            data,
            slot
        };
    }
    setTimeout() {
        /**
         * Schedule inactivity handling. If WS is quiet for
         * `resubOpts.resubTimeoutMs` and `receivingData` is true, trigger either
         * a polling loop or a resubscribe depending on options.
         */ if (!this.onChange) {
            throw new Error('onChange callback function must be set');
        }
        this.timeoutId = setTimeout(async ()=>{
            if (this.isUnsubscribing) {
                // If we are in the process of unsubscribing, do not attempt to resubscribe
                if (this.resubOpts.logResubMessages) {
                    console.log(`[${this.logAccountName}] Timeout fired but isUnsubscribing=true, skipping resubscribe`);
                }
                return;
            }
            if (this.receivingData) {
                if (this.resubOpts.usePollingInsteadOfResub) {
                    // Use polling instead of resubscribing
                    if (this.resubOpts.logResubMessages) {
                        console.log(`[${this.logAccountName}] No ws data in ${this.resubOpts.resubTimeoutMs}ms, starting polling - listenerId=${this.listenerId}`);
                    }
                    this.startPolling();
                } else {
                    // Original resubscribe behavior
                    if (this.resubOpts.logResubMessages) {
                        console.log(`No ws data from ${this.logAccountName} in ${this.resubOpts.resubTimeoutMs}ms, resubscribing - listenerId=${this.listenerId}, isUnsubscribing=${this.isUnsubscribing}`);
                    }
                    await this.unsubscribe(true);
                    this.receivingData = false;
                    await this.subscribe(this.onChange);
                    if (this.resubOpts.logResubMessages) {
                        console.log(`[${this.logAccountName}] Resubscribe completed - receivingData=${this.receivingData}, listenerId=${this.listenerId}, isUnsubscribing=${this.isUnsubscribing}`);
                    }
                }
            } else {
                if (this.resubOpts.logResubMessages) {
                    console.log(`[${this.logAccountName}] Timeout fired but receivingData=false, skipping resubscribe`);
                }
            }
        }, this.resubOpts.resubTimeoutMs);
    }
    /**
     * Start the polling loop (single-account).
     * - Periodically calls `fetch()` and compares buffers to detect changes.
     * - On detected change, stops polling and resubscribes to WS.
     */ startPolling() {
        const pollingInterval = this.resubOpts.pollingIntervalMs || 30000; // Default to 30s
        const poll = async ()=>{
            var _a, _b;
            if (this.isUnsubscribing) {
                return;
            }
            try {
                // Store current data and buffer before polling
                const currentBuffer = (_a = this.bufferAndSlot) === null || _a === void 0 ? void 0 : _a.buffer;
                // Fetch latest account data
                await this.fetch();
                // Check if we got new data by comparing buffers
                const newBuffer = (_b = this.bufferAndSlot) === null || _b === void 0 ? void 0 : _b.buffer;
                const hasNewData = newBuffer && (!currentBuffer || !newBuffer.equals(currentBuffer));
                if (hasNewData) {
                    // New data received, stop polling and resubscribe to websocket
                    if (this.resubOpts.logResubMessages) {
                        console.log(`[${this.logAccountName}] Polling detected account data change, resubscribing to websocket`);
                    }
                    await this.unsubscribe(true);
                    this.receivingData = false;
                    await this.subscribe(this.onChange);
                } else {
                    // No new data, continue polling
                    if (this.resubOpts.logResubMessages) {
                        console.log(`[${this.logAccountName}] Polling found no account changes, continuing to poll every ${pollingInterval}ms`);
                    }
                    this.pollingTimeoutId = setTimeout(poll, pollingInterval);
                }
            } catch (error) {
                if (this.resubOpts.logResubMessages) {
                    console.error(`[${this.logAccountName}] Error during polling:`, error);
                }
                // On error, continue polling
                this.pollingTimeoutId = setTimeout(poll, pollingInterval);
            }
        };
        // Start polling immediately
        poll();
    }
    stopPolling() {
        if (this.pollingTimeoutId) {
            clearTimeout(this.pollingTimeoutId);
            this.pollingTimeoutId = undefined;
        }
    }
    /**
     * Fetch the current account state via RPC and process it through the same
     * decoding and update pathway as WS notifications.
     */ async fetch() {
        // Use gill's rpc for fetching account info
        const accountAddress = this.accountPublicKey.toBase58();
        const rpcResponse = await this.rpc.getAccountInfo(accountAddress, {
            commitment: this.commitment,
            encoding: 'base64'
        }).send();
        // Convert gill response to match the expected format
        const context = {
            slot: Number(rpcResponse.context.slot)
        };
        const accountInfo = rpcResponse.value;
        this.handleRpcResponse({
            slot: BigInt(context.slot)
        }, accountInfo);
    }
    handleRpcResponse(context, accountInfo) {
        const newSlot = context.slot;
        let newBuffer = undefined;
        if (accountInfo) {
            // Extract data from gill response
            if (accountInfo.data) {
                // Handle different data formats from gill
                if (Array.isArray(accountInfo.data)) {
                    // If it's a tuple [data, encoding]
                    const [data, encoding] = accountInfo.data;
                    if (encoding === 'base58') {
                        // we know encoding will be base58
                        // Convert base58 to buffer using bs58
                        newBuffer = Buffer.from(bs58_1.default.decode(data));
                    } else {
                        newBuffer = Buffer.from(data, 'base64');
                    }
                }
            }
        }
        if (!this.bufferAndSlot) {
            this.bufferAndSlot = {
                buffer: newBuffer,
                slot: Number(newSlot)
            };
            if (newBuffer) {
                const account = this.decodeBuffer(newBuffer);
                this.dataAndSlot = {
                    data: account,
                    slot: Number(newSlot)
                };
                this.onChange(account);
            }
            return;
        }
        if (Number(newSlot) < this.bufferAndSlot.slot) {
            return;
        }
        const oldBuffer = this.bufferAndSlot.buffer;
        if (newBuffer && (!oldBuffer || !newBuffer.equals(oldBuffer))) {
            this.bufferAndSlot = {
                buffer: newBuffer,
                slot: Number(newSlot)
            };
            const account = this.decodeBuffer(newBuffer);
            this.dataAndSlot = {
                data: account,
                slot: Number(newSlot)
            };
            this.onChange(account);
        }
    }
    decodeBuffer(buffer) {
        if (this.decodeBufferFn) {
            return this.decodeBufferFn(buffer);
        } else {
            return this.program.account[this.accountName].coder.accounts.decode((0, utils_1.capitalize)(this.accountName), buffer);
        }
    }
    unsubscribe(onResub = false) {
        /**
         * Stop timers, polling, and WS subscription.
         * - When called during a resubscribe (`onResub=true`), we preserve
         *   `resubOpts.resubTimeoutMs` for the restarted subscription.
         */ if (!onResub && this.resubOpts) {
            this.resubOpts.resubTimeoutMs = undefined;
        }
        this.isUnsubscribing = true;
        clearTimeout(this.timeoutId);
        this.timeoutId = undefined;
        // Stop polling if active
        this.stopPolling();
        // Abort the WebSocket subscription
        if (this.abortController) {
            this.abortController.abort('unsubscribing');
            this.abortController = undefined;
        }
        this.listenerId = undefined;
        this.isUnsubscribing = false;
        return Promise.resolve();
    }
}
exports.WebSocketAccountSubscriberV2 = WebSocketAccountSubscriberV2;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketProgramAccountSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WebSocketProgramAccountSubscriber = void 0;
class WebSocketProgramAccountSubscriber {
    constructor(subscriptionName, accountDiscriminator, program, decodeBufferFn, options = {
        filters: []
    }, resubOpts){
        var _a;
        this.bufferAndSlotMap = new Map();
        this.isUnsubscribing = false;
        this.receivingData = false;
        this.subscriptionName = subscriptionName;
        this.accountDiscriminator = accountDiscriminator;
        this.program = program;
        this.decodeBuffer = decodeBufferFn;
        this.resubOpts = resubOpts;
        if (((_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.resubTimeoutMs) < 1000) {
            console.log('resubTimeoutMs should be at least 1000ms to avoid spamming resub');
        }
        this.options = options;
        this.receivingData = false;
    }
    async subscribe(onChange) {
        var _a, _b;
        if (this.listenerId != null || this.isUnsubscribing) {
            return;
        }
        this.onChange = onChange;
        this.listenerId = this.program.provider.connection.onProgramAccountChange(this.program.programId, (keyedAccountInfo, context)=>{
            var _a;
            if ((_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.resubTimeoutMs) {
                this.receivingData = true;
                clearTimeout(this.timeoutId);
                this.handleRpcResponse(context, keyedAccountInfo);
                this.setTimeout();
            } else {
                this.handleRpcResponse(context, keyedAccountInfo);
            }
        }, (_a = this.options.commitment) !== null && _a !== void 0 ? _a : this.program.provider.opts.commitment, this.options.filters);
        if ((_b = this.resubOpts) === null || _b === void 0 ? void 0 : _b.resubTimeoutMs) {
            this.receivingData = true;
            this.setTimeout();
        }
    }
    setTimeout() {
        var _a;
        if (!this.onChange) {
            throw new Error('onChange callback function must be set');
        }
        this.timeoutId = setTimeout(async ()=>{
            var _a, _b;
            if (this.isUnsubscribing) {
                // If we are in the process of unsubscribing, do not attempt to resubscribe
                return;
            }
            if (this.receivingData) {
                if ((_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.logResubMessages) {
                    console.log(`No ws data from ${this.subscriptionName} in ${(_b = this.resubOpts) === null || _b === void 0 ? void 0 : _b.resubTimeoutMs}ms, resubscribing`);
                }
                await this.unsubscribe(true);
                this.receivingData = false;
                await this.subscribe(this.onChange);
            }
        }, (_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.resubTimeoutMs);
    }
    handleRpcResponse(context, keyedAccountInfo) {
        const newSlot = context.slot;
        let newBuffer = undefined;
        if (keyedAccountInfo) {
            newBuffer = keyedAccountInfo.accountInfo.data;
        }
        const accountId = keyedAccountInfo.accountId.toBase58();
        const existingBufferAndSlot = this.bufferAndSlotMap.get(accountId);
        if (!existingBufferAndSlot) {
            if (newBuffer) {
                this.bufferAndSlotMap.set(accountId, {
                    buffer: newBuffer,
                    slot: newSlot
                });
                const account = this.decodeBuffer(this.accountDiscriminator, newBuffer);
                this.onChange(keyedAccountInfo.accountId, account, context, newBuffer);
            }
            return;
        }
        if (newSlot < existingBufferAndSlot.slot) {
            return;
        }
        const oldBuffer = existingBufferAndSlot.buffer;
        if (newBuffer && (!oldBuffer || !newBuffer.equals(oldBuffer))) {
            this.bufferAndSlotMap.set(accountId, {
                buffer: newBuffer,
                slot: newSlot
            });
            const account = this.decodeBuffer(this.accountDiscriminator, newBuffer);
            this.onChange(keyedAccountInfo.accountId, account, context, newBuffer);
        }
    }
    unsubscribe(onResub = false) {
        if (!onResub) {
            this.resubOpts.resubTimeoutMs = undefined;
        }
        this.isUnsubscribing = true;
        clearTimeout(this.timeoutId);
        this.timeoutId = undefined;
        if (this.listenerId != null) {
            const promise = this.program.provider.connection.removeAccountChangeListener(this.listenerId).then(()=>{
                this.listenerId = undefined;
                this.isUnsubscribing = false;
            });
            return promise;
        } else {
            this.isUnsubscribing = false;
        }
    }
}
exports.WebSocketProgramAccountSubscriber = WebSocketProgramAccountSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/websocketProgramUserAccountSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WebSocketProgramUserAccountSubscriber = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/types.js [app-route] (ecmascript)");
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
class WebSocketProgramUserAccountSubscriber {
    constructor(program, userAccountPublicKey, programSubscriber){
        this.isSubscribed = false;
        this.program = program;
        this.userAccountPublicKey = userAccountPublicKey;
        this.eventEmitter = new events_1.EventEmitter();
        this.programSubscriber = programSubscriber;
    }
    async subscribe(userAccount) {
        if (this.isSubscribed) {
            return true;
        }
        if (userAccount) {
            this.updateData(userAccount, 0);
        }
        this.programSubscriber.onChange = (accountId, data, context)=>{
            if (accountId.equals(this.userAccountPublicKey)) {
                this.updateData(data, context.slot);
                this.eventEmitter.emit('userAccountUpdate', data);
                this.eventEmitter.emit('update');
            }
        };
        this.isSubscribed = true;
        return true;
    }
    async fetch() {
        if (!this.isSubscribed) {
            throw new types_1.NotSubscribedError('Must subscribe before fetching account updates');
        }
        const account = await this.program.account.user.fetch(this.userAccountPublicKey);
        this.updateData(account, 0);
    }
    updateData(userAccount, slot) {
        this.userAccountAndSlot = {
            data: userAccount,
            slot
        };
    }
    async unsubscribe() {
        this.isSubscribed = false;
    }
    getUserAccountAndSlot() {
        if (!this.userAccountAndSlot) {
            throw new types_1.NotSubscribedError('Must subscribe before getting user account data');
        }
        return this.userAccountAndSlot;
    }
}
exports.WebSocketProgramUserAccountSubscriber = WebSocketProgramUserAccountSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketProgramAccountsSubscriberV2.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WebSocketProgramAccountsSubscriberV2 = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const gill_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/gill@0.10.3_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/gill/dist/index.node.cjs [app-route] (ecmascript)");
const bs58_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/bs58@4.0.1/node_modules/bs58/index.js [app-route] (ecmascript)"));
/**
 * WebSocketProgramAccountsSubscriberV2
 *
 * High-level overview
 * - WebSocket-first subscriber for Solana program accounts that also layers in
 *   targeted polling to detect missed updates reliably.
 * - Emits decoded account updates via the provided `onChange` callback.
 * - Designed to focus extra work on the specific accounts the consumer cares
 *   about ("monitored accounts") while keeping baseline WS behavior for the
 *   full program subscription.
 *
 * Why polling if this is a WebSocket subscriber?
 * - WS infra can stall, drop, or reorder notifications under network stress or
 *   provider hiccups. When that happens, critical account changes can be missed.
 * - To mitigate this, the class accepts a set of accounts (provided via constructor) to monitor
 *   and uses light polling to verify whether a WS change was missed.
 * - If polling detects a newer slot with different data than the last seen
 *   buffer, a centralized resubscription is triggered to restore a clean stream.
 *
 * Initial fetch (on subscribe)
 * - On `subscribe()`, we first perform a single batched fetch of all monitored
 *   accounts ("initial monitor fetch").
 * - Purpose: seed the internal `bufferAndSlotMap` and emit the latest state so
 *   consumers have up-to-date data immediately, even before WS events arrive.
 * - This step does not decide resubscription; it only establishes ground truth.
 *
 * Continuous polling (only for monitored accounts)
 * - After seeding, each monitored account is put into a monitoring cycle:
 *   1) If no WS notification for an account is observed for `pollingIntervalMs`,
 *      we enqueue it for a batched fetch (buffered for a short window).
 *   2) Once an account enters the "currently polling" set, a shared batch poll
 *      runs every `pollingIntervalMs` across all such accounts.
 *   3) If WS notifications resume for an account, that account is removed from
 *      the polling set and returns to passive monitoring.
 * - Polling compares the newly fetched buffer with the last stored buffer at a
 *   later slot. A difference indicates a missed update; we schedule a single
 *   resubscription (coalesced across accounts) to re-sync.
 *
 * Accounts the consumer cares about
 * - Provide accounts up-front via the constructor `accountsToMonitor`, or add
 *   them dynamically with `addAccountToMonitor()` and remove with
 *   `removeAccountFromMonitor()`.
 * - Only these accounts incur additional polling safeguards; other accounts are
 *   still processed from the WS stream normally.
 *
 * Resubscription strategy
 * - Missed updates from any monitored account are coalesced and trigger a single
 *   resubscription after a short delay. This avoids rapid churn.
 * - If `resubOpts.resubTimeoutMs` is set, an inactivity timer also performs a
 *   batch check of monitored accounts. If a missed update is found, the same
 *   centralized resubscription flow is used.
 *
 * Tuning knobs
 * - `setPollingInterval(ms)`: adjust how often monitoring/polling runs
 *   (default 30s). Shorter = faster detection, higher RPC load.
 * - Debounced immediate poll (~100ms): batches accounts added to polling right after inactivity.
 * - Batch size for `getMultipleAccounts` is limited to 100, requests are chunked
 *   and processed concurrently.
 */ class WebSocketProgramAccountsSubscriberV2 {
    constructor(subscriptionName, accountDiscriminator, program, decodeBufferFn, options = {
        filters: []
    }, resubOpts, accountsToMonitor // Optional list of accounts to poll
    ){
        var _a;
        this.bufferAndSlotMap = new Map();
        this.isUnsubscribing = false;
        this.receivingData = false;
        // Polling logic for specific accounts
        this.accountsToMonitor = new Set();
        this.pollingIntervalMs = 30000; // 30 seconds
        this.pollingTimeouts = new Map();
        this.lastWsNotificationTime = new Map(); // Track last WS notification time per account
        this.accountsCurrentlyPolling = new Set(); // Track which accounts are being polled
        this.debouncedImmediatePollMs = 100; // configurable short window
        // Centralized resubscription handling
        this.missedChangeDetected = false; // Flag to track if any missed change was detected
        this.accountsWithMissedUpdates = new Set(); // Track which accounts had missed updates
        this.subscriptionName = subscriptionName;
        this.accountDiscriminator = accountDiscriminator;
        this.program = program;
        this.decodeBuffer = decodeBufferFn;
        this.resubOpts = resubOpts !== null && resubOpts !== void 0 ? resubOpts : {
            resubTimeoutMs: 30000,
            usePollingInsteadOfResub: true,
            logResubMessages: false
        };
        if (((_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.resubTimeoutMs) < 1000) {
            console.log('resubTimeoutMs should be at least 1000ms to avoid spamming resub');
        }
        this.options = options;
        this.receivingData = false;
        // Initialize accounts to monitor
        if (accountsToMonitor) {
            accountsToMonitor.forEach((account)=>{
                this.accountsToMonitor.add(account.toBase58());
            });
        }
        // Initialize gill client using the same RPC URL as the program provider
        const rpcUrl = this.program.provider.connection.rpcEndpoint;
        const { rpc, rpcSubscriptions } = (0, gill_1.createSolanaClient)({
            urlOrMoniker: rpcUrl
        });
        this.rpc = rpc;
        this.rpcSubscriptions = rpcSubscriptions;
    }
    async handleNotificationLoop(notificationPromise) {
        var _a;
        try {
            const subscriptionIterable = await notificationPromise;
            for await (const notification of subscriptionIterable){
                try {
                    if ((_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.resubTimeoutMs) {
                        this.receivingData = true;
                        clearTimeout(this.timeoutId);
                        this.handleRpcResponse(notification.context, notification.value.pubkey, notification.value.account.data);
                        this.setTimeout();
                    } else {
                        this.handleRpcResponse(notification.context, notification.value.pubkey, notification.value.account.data);
                    }
                } catch (error) {
                    console.error(`Error handling RPC response for pubkey ${notification.value.pubkey}:`, error);
                }
            }
        } catch (error) {
            console.error(`[${this.subscriptionName}] Error in notification loop:`, error);
        }
    }
    async subscribe(onChange) {
        var _a, _b;
        /**
         * Start the WebSocket subscription and initialize polling safeguards.
         *
         * Flow
         * - Seeds all monitored accounts with a single batched RPC fetch and emits
         *   their current state.
         * - Subscribes to program notifications via WS using gill.
         * - If `resubOpts.resubTimeoutMs` is set, starts an inactivity timer that
         *   batch-checks monitored accounts when WS goes quiet.
         * - Begins monitoring for accounts that may need polling when WS
         *   notifications are not observed within `pollingIntervalMs`.
         *
         * @param onChange Callback invoked with decoded account data when an update
         * is detected (via WS or batch RPC fetch).
         */ const startTime = performance.now();
        if (this.listenerId != null || this.isUnsubscribing) {
            return;
        }
        if ((_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.logResubMessages) {
            console.log(`[${this.subscriptionName}] initializing subscription. This many monitored accounts: ${this.accountsToMonitor.size}`);
        }
        this.onChange = onChange;
        // initial fetch of monitored data - only fetch and populate, don't check for missed changes
        await this.fetchAndPopulateAllMonitoredAccounts();
        // Create abort controller for proper cleanup
        const abortController = new AbortController();
        this.abortController = abortController;
        this.listenerId = Math.random(); // Unique ID for logging purposes
        if ((_b = this.resubOpts) === null || _b === void 0 ? void 0 : _b.resubTimeoutMs) {
            this.receivingData = true;
            this.setTimeout();
        }
        // Subscribe to program account changes using gill's rpcSubscriptions
        const programId = this.program.programId.toBase58();
        if ((0, gill_1.isAddress)(programId)) {
            const subscriptionPromise = this.rpcSubscriptions.programNotifications(programId, {
                commitment: this.options.commitment,
                encoding: 'base64',
                filters: this.options.filters.map((filter)=>{
                    // Convert filter bytes from base58 to base64 if needed
                    let bytes = filter.memcmp.bytes;
                    if (typeof bytes === 'string' && /^[1-9A-HJ-NP-Za-km-z]+$/.test(bytes)) {
                        // Looks like base58 - convert to base64
                        const decoded = bs58_1.default.decode(bytes);
                        bytes = Buffer.from(decoded).toString('base64');
                    }
                    return {
                        memcmp: {
                            offset: BigInt(filter.memcmp.offset),
                            bytes: bytes,
                            encoding: 'base64'
                        }
                    };
                })
            }).subscribe({
                abortSignal: abortController.signal
            });
            // Start notification loop without awaiting
            this.handleNotificationLoop(subscriptionPromise);
            // Start monitoring for accounts that may need polling if no WS event is received
            this.startMonitoringForAccounts();
        }
        const endTime = performance.now();
        console.log(`[PROFILING] ${this.subscriptionName}.subscribe() completed in ${endTime - startTime}ms`);
    }
    setTimeout() {
        var _a;
        if (!this.onChange) {
            throw new Error('onChange callback function must be set');
        }
        this.timeoutId = setTimeout(async ()=>{
            var _a, _b;
            if (this.isUnsubscribing) {
                // If we are in the process of unsubscribing, do not attempt to resubscribe
                return;
            }
            if (this.receivingData) {
                if ((_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.logResubMessages) {
                    console.log(`No ws data from ${this.subscriptionName} in ${(_b = this.resubOpts) === null || _b === void 0 ? void 0 : _b.resubTimeoutMs}ms, checking for missed changes`);
                }
                // Check for missed changes in monitored accounts
                const missedChangeDetected = await this.fetchAllMonitoredAccounts();
                if (missedChangeDetected) {
                    // Signal missed change with a generic identifier since we don't have specific account IDs from this context
                    this.signalMissedChange('timeout-check');
                } else {
                    // No missed changes, continue monitoring
                    this.receivingData = false;
                    this.setTimeout();
                }
            }
        }, (_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.resubTimeoutMs);
    }
    handleRpcResponse(context, accountId, accountInfo) {
        const newSlot = Number(context.slot);
        let newBuffer = undefined;
        if (accountInfo) {
            // Handle different data formats from gill
            if (Array.isArray(accountInfo)) {
                // If it's a tuple [data, encoding]
                const [data, encoding] = accountInfo;
                if (encoding === 'base58') {
                    // Convert base58 to buffer using bs58
                    newBuffer = Buffer.from(bs58_1.default.decode(data));
                } else {
                    newBuffer = Buffer.from(data, 'base64');
                }
            }
        }
        const accountIdString = accountId.toString();
        const existingBufferAndSlot = this.bufferAndSlotMap.get(accountIdString);
        // Track WebSocket notification time for this account
        this.lastWsNotificationTime.set(accountIdString, Date.now());
        // If this account was being polled, stop polling it if the buffer has changed
        if (this.accountsCurrentlyPolling.has(accountIdString) && !(existingBufferAndSlot === null || existingBufferAndSlot === void 0 ? void 0 : existingBufferAndSlot.buffer.equals(newBuffer))) {
            this.accountsCurrentlyPolling.delete(accountIdString);
            // If no more accounts are being polled, stop batch polling
            if (this.accountsCurrentlyPolling.size === 0 && this.batchPollingTimeout) {
                clearTimeout(this.batchPollingTimeout);
                this.batchPollingTimeout = undefined;
            }
        }
        if (!existingBufferAndSlot) {
            if (newBuffer) {
                this.updateBufferAndHandleChange(newBuffer, newSlot, accountIdString);
            }
            return;
        }
        if (newSlot < existingBufferAndSlot.slot) {
            return;
        }
        const oldBuffer = existingBufferAndSlot.buffer;
        if (newBuffer && (!oldBuffer || !newBuffer.equals(oldBuffer))) {
            this.updateBufferAndHandleChange(newBuffer, newSlot, accountIdString);
        }
    }
    startMonitoringForAccounts() {
        // Clear any existing polling timeouts
        this.clearPollingTimeouts();
        // Start monitoring for each account in the accountsToMonitor set
        this.accountsToMonitor.forEach((accountIdString)=>{
            this.startMonitoringForAccount(accountIdString);
        });
    }
    startMonitoringForAccount(accountIdString) {
        // Clear existing timeout for this account
        const existingTimeout = this.pollingTimeouts.get(accountIdString);
        if (existingTimeout) {
            clearTimeout(existingTimeout);
        }
        // Set up monitoring timeout - only start polling if no WS notification in 30s
        const timeoutId = setTimeout(async ()=>{
            var _a;
            // Check if we've received a WS notification for this account recently
            const lastNotificationTime = this.lastWsNotificationTime.get(accountIdString) || 0;
            const currentTime = Date.now();
            if (!lastNotificationTime || currentTime - lastNotificationTime >= this.pollingIntervalMs) {
                if ((_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.logResubMessages) {
                    console.debug(`[${this.subscriptionName}] No recent WS notification for ${accountIdString}, adding to polling set`);
                }
                // No recent WS notification: add to polling and schedule debounced poll
                this.accountsCurrentlyPolling.add(accountIdString);
                this.scheduleDebouncedImmediatePoll();
            } else {
                // We received a WS notification recently, continue monitoring
                this.startMonitoringForAccount(accountIdString);
            }
        }, this.pollingIntervalMs);
        this.pollingTimeouts.set(accountIdString, timeoutId);
    }
    scheduleDebouncedImmediatePoll() {
        if (this.debouncedImmediatePollTimeout) {
            clearTimeout(this.debouncedImmediatePollTimeout);
        }
        this.debouncedImmediatePollTimeout = setTimeout(async ()=>{
            var _a;
            try {
                await this.pollAllAccounts();
                // After the immediate poll, ensure continuous batch polling is active
                if (!this.batchPollingTimeout && this.accountsCurrentlyPolling.size > 0) {
                    this.startBatchPolling();
                }
            } catch (e) {
                if ((_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.logResubMessages) {
                    console.log(`[${this.subscriptionName}] Error during debounced immediate poll:`, e);
                }
            }
        }, this.debouncedImmediatePollMs);
    }
    startBatchPolling() {
        var _a;
        if ((_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.logResubMessages) {
            console.debug(`[${this.subscriptionName}] Scheduling batch polling`);
        }
        // Clear existing batch polling timeout
        if (this.batchPollingTimeout) {
            clearTimeout(this.batchPollingTimeout);
        }
        // Set up batch polling interval
        this.batchPollingTimeout = setTimeout(async ()=>{
            await this.pollAllAccounts();
            // Schedule next batch poll
            this.startBatchPolling();
        }, this.pollingIntervalMs);
    }
    async pollAllAccounts() {
        var _a, _b;
        try {
            // Get all accounts currently being polled
            const accountsToPoll = Array.from(this.accountsCurrentlyPolling);
            if (accountsToPoll.length === 0) {
                return;
            }
            if ((_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.logResubMessages) {
                console.debug(`[${this.subscriptionName}] Polling all accounts`, accountsToPoll.length, 'accounts');
            }
            // Use the shared batch fetch method
            await this.fetchAccountsBatch(accountsToPoll);
        } catch (error) {
            if ((_b = this.resubOpts) === null || _b === void 0 ? void 0 : _b.logResubMessages) {
                console.log(`[${this.subscriptionName}] Error batch polling accounts:`, error);
            }
        }
    }
    /**
     * Fetches and populates all monitored accounts data without checking for missed changes
     * This is used during initial subscription to populate data
     */ async fetchAndPopulateAllMonitoredAccounts() {
        var _a;
        try {
            // Get all accounts currently being polled
            const accountsToMonitor = Array.from(this.accountsToMonitor);
            if (accountsToMonitor.length === 0) {
                return;
            }
            // Fetch all accounts in a single batch request
            const accountAddresses = accountsToMonitor.map((accountId)=>accountId);
            const rpcResponse = await this.rpc.getMultipleAccounts(accountAddresses, {
                commitment: this.options.commitment,
                encoding: 'base64'
            }).send();
            const currentSlot = Number(rpcResponse.context.slot);
            // Process each account response
            for(let i = 0; i < accountsToMonitor.length; i++){
                const accountIdString = accountsToMonitor[i];
                const accountInfo = rpcResponse.value[i];
                if (!accountInfo) {
                    continue;
                }
                const existingBufferAndSlot = this.bufferAndSlotMap.get(accountIdString);
                if (!existingBufferAndSlot) {
                    // Account not in our map yet, add it
                    let newBuffer = undefined;
                    if (accountInfo) {
                        if (Array.isArray(accountInfo.data)) {
                            const [data, encoding] = accountInfo.data;
                            newBuffer = Buffer.from(data, encoding);
                        }
                    }
                    if (newBuffer) {
                        this.updateBufferAndHandleChange(newBuffer, currentSlot, accountIdString);
                    }
                    continue;
                }
                // For initial population, just update the slot if we have newer data
                if (currentSlot > existingBufferAndSlot.slot) {
                    let newBuffer = undefined;
                    if (accountInfo.data) {
                        if (Array.isArray(accountInfo.data)) {
                            const [data, encoding] = accountInfo.data;
                            if (encoding === 'base58') {
                                newBuffer = Buffer.from(bs58_1.default.decode(data));
                            } else {
                                newBuffer = Buffer.from(data, 'base64');
                            }
                        }
                    }
                    // Update with newer data if available
                    if (newBuffer) {
                        this.updateBufferAndHandleChange(newBuffer, currentSlot, accountIdString);
                    }
                }
            }
        } catch (error) {
            if ((_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.logResubMessages) {
                console.log(`[${this.subscriptionName}] Error fetching and populating monitored accounts:`, error);
            }
        }
    }
    /**
     * Fetches all monitored accounts and checks for missed changes
     * Returns true if a missed change was detected and resubscription is needed
     */ async fetchAllMonitoredAccounts() {
        var _a, _b;
        try {
            // Get all accounts currently being polled
            const accountsToMonitor = Array.from(this.accountsToMonitor);
            if (accountsToMonitor.length === 0) {
                return false;
            }
            // Fetch all accounts in a single batch request
            const accountAddresses = accountsToMonitor.map((accountId)=>accountId);
            const rpcResponse = await this.rpc.getMultipleAccounts(accountAddresses, {
                commitment: this.options.commitment,
                encoding: 'base64'
            }).send();
            const currentSlot = Number(rpcResponse.context.slot);
            // Process each account response
            for(let i = 0; i < accountsToMonitor.length; i++){
                const accountIdString = accountsToMonitor[i];
                const accountInfo = rpcResponse.value[i];
                if (!accountInfo) {
                    continue;
                }
                const existingBufferAndSlot = this.bufferAndSlotMap.get(accountIdString);
                if (!existingBufferAndSlot) {
                    // Account not in our map yet, add it
                    let newBuffer = undefined;
                    if (accountInfo.data) {
                        if (Array.isArray(accountInfo.data)) {
                            const [data, encoding] = accountInfo.data;
                            newBuffer = Buffer.from(data, encoding);
                        }
                    }
                    if (newBuffer) {
                        this.updateBufferAndHandleChange(newBuffer, currentSlot, accountIdString);
                    }
                    continue;
                }
                // Check if we missed an update
                if (currentSlot > existingBufferAndSlot.slot) {
                    let newBuffer = undefined;
                    if (accountInfo.data) {
                        if (Array.isArray(accountInfo.data)) {
                            const [data, encoding] = accountInfo.data;
                            if (encoding === 'base58') {
                                newBuffer = Buffer.from(bs58_1.default.decode(data));
                            } else {
                                newBuffer = Buffer.from(data, 'base64');
                            }
                        }
                    }
                    // Check if buffer has changed
                    if (newBuffer && (!existingBufferAndSlot.buffer || !newBuffer.equals(existingBufferAndSlot.buffer))) {
                        if ((_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.logResubMessages) {
                            console.log(`[${this.subscriptionName}] Batch polling detected missed update for account ${accountIdString}, resubscribing`);
                        }
                        // We missed an update, return true to indicate resubscription is needed
                        return true;
                    }
                }
            }
            // No missed changes detected
            return false;
        } catch (error) {
            if ((_b = this.resubOpts) === null || _b === void 0 ? void 0 : _b.logResubMessages) {
                console.log(`[${this.subscriptionName}] Error batch polling accounts:`, error);
            }
            return false;
        }
    }
    async fetchAccountsBatch(accountIds) {
        var _a;
        try {
            // Chunk account IDs into groups of 100 (getMultipleAccounts limit)
            const chunkSize = 100;
            const chunks = [];
            for(let i = 0; i < accountIds.length; i += chunkSize){
                chunks.push(accountIds.slice(i, i + chunkSize));
            }
            // Process all chunks concurrently
            await Promise.all(chunks.map(async (chunk)=>{
                var _a;
                const accountAddresses = chunk.map((accountId)=>accountId);
                const rpcResponse = await this.rpc.getMultipleAccounts(accountAddresses, {
                    commitment: this.options.commitment,
                    encoding: 'base64'
                }).send();
                const currentSlot = Number(rpcResponse.context.slot);
                // Process each account response in this chunk
                for(let i = 0; i < chunk.length; i++){
                    const accountIdString = chunk[i];
                    const accountInfo = rpcResponse.value[i];
                    if (!accountInfo) {
                        continue;
                    }
                    const existingBufferAndSlot = this.bufferAndSlotMap.get(accountIdString);
                    if (!existingBufferAndSlot) {
                        // Account not in our map yet, add it
                        let newBuffer = undefined;
                        if (accountInfo.data) {
                            if (Array.isArray(accountInfo.data)) {
                                const [data, encoding] = accountInfo.data;
                                newBuffer = Buffer.from(data, encoding);
                            }
                        }
                        if (newBuffer) {
                            this.updateBufferAndHandleChange(newBuffer, currentSlot, accountIdString);
                        }
                        continue;
                    }
                    // Check if we missed an update
                    if (currentSlot > existingBufferAndSlot.slot) {
                        let newBuffer = undefined;
                        if (accountInfo.data) {
                            if (Array.isArray(accountInfo.data)) {
                                const [data, encoding] = accountInfo.data;
                                if (encoding === 'base58') {
                                    newBuffer = Buffer.from(bs58_1.default.decode(data));
                                } else {
                                    newBuffer = Buffer.from(data, 'base64');
                                }
                            }
                        }
                        // Check if buffer has changed
                        if (newBuffer && (!existingBufferAndSlot.buffer || !newBuffer.equals(existingBufferAndSlot.buffer))) {
                            if ((_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.logResubMessages) {
                                console.log(`[${this.subscriptionName}] Batch polling detected missed update for account ${accountIdString}, signaling resubscription`);
                            }
                            // Signal missed change instead of immediately resubscribing
                            this.signalMissedChange(accountIdString);
                            return;
                        }
                    }
                }
            }));
        } catch (error) {
            if ((_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.logResubMessages) {
                console.log(`[${this.subscriptionName}] Error fetching accounts batch:`, error);
            }
        }
    }
    clearPollingTimeouts() {
        this.pollingTimeouts.forEach((timeoutId)=>{
            clearTimeout(timeoutId);
        });
        this.pollingTimeouts.clear();
        // Clear batch polling timeout
        if (this.batchPollingTimeout) {
            clearTimeout(this.batchPollingTimeout);
            this.batchPollingTimeout = undefined;
        }
        // Clear initial fetch timeout
        // if (this.initialFetchTimeout) {
        // 	clearTimeout(this.initialFetchTimeout);
        // 	this.initialFetchTimeout = undefined;
        // }
        // Clear resubscription timeout
        if (this.resubscriptionTimeout) {
            clearTimeout(this.resubscriptionTimeout);
            this.resubscriptionTimeout = undefined;
        }
        // Clear accounts currently polling
        this.accountsCurrentlyPolling.clear();
        // Clear accounts pending initial monitor fetch
        // this.accountsPendingInitialMonitorFetch.clear();
        // Reset missed change flag and clear accounts with missed updates
        this.missedChangeDetected = false;
        this.accountsWithMissedUpdates.clear();
    }
    /**
     * Centralized resubscription handler that only resubscribes once after checking all accounts
     */ async handleResubscription() {
        var _a;
        if (this.missedChangeDetected) {
            if ((_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.logResubMessages) {
                console.log(`[${this.subscriptionName}] Missed change detected for ${this.accountsWithMissedUpdates.size} accounts: ${Array.from(this.accountsWithMissedUpdates).join(', ')}, resubscribing`);
            }
            await this.unsubscribe(true);
            this.receivingData = false;
            await this.subscribe(this.onChange);
            this.missedChangeDetected = false;
            this.accountsWithMissedUpdates.clear();
        }
    }
    /**
     * Signal that a missed change was detected and schedule resubscription
     */ signalMissedChange(accountIdString) {
        if (!this.missedChangeDetected) {
            this.missedChangeDetected = true;
            this.accountsWithMissedUpdates.add(accountIdString);
            // Clear any existing resubscription timeout
            if (this.resubscriptionTimeout) {
                clearTimeout(this.resubscriptionTimeout);
            }
            // Schedule resubscription after a short delay to allow for batch processing
            this.resubscriptionTimeout = setTimeout(async ()=>{
                await this.handleResubscription();
            }, 100); // 100ms delay to allow for batch processing
        } else {
            // If already detected, just add the account to the set
            this.accountsWithMissedUpdates.add(accountIdString);
        }
    }
    unsubscribe(onResub = false) {
        if (!onResub) {
            this.resubOpts.resubTimeoutMs = undefined;
        }
        this.isUnsubscribing = true;
        clearTimeout(this.timeoutId);
        this.timeoutId = undefined;
        // Clear polling timeouts
        this.clearPollingTimeouts();
        // Abort the WebSocket subscription
        if (this.abortController) {
            this.abortController.abort('unsubscribing');
            this.abortController = undefined;
        }
        this.listenerId = undefined;
        this.isUnsubscribing = false;
        return Promise.resolve();
    }
    // Method to add accounts to the polling list
    /**
     * Add an account to the monitored set.
     * - Monitored accounts are subject to initial fetch and periodic batch polls
     *   if WS notifications are not observed within `pollingIntervalMs`.
     */ addAccountToMonitor(accountId) {
        const accountIdString = accountId.toBase58();
        this.accountsToMonitor.add(accountIdString);
        // If already subscribed, start monitoring for this account
        if (this.listenerId != null && !this.isUnsubscribing) {
            this.startMonitoringForAccount(accountIdString);
        }
    }
    // Method to remove accounts from the polling list
    removeAccountFromMonitor(accountId) {
        const accountIdString = accountId.toBase58();
        this.accountsToMonitor.delete(accountIdString);
        // Clear monitoring timeout for this account
        const timeoutId = this.pollingTimeouts.get(accountIdString);
        if (timeoutId) {
            clearTimeout(timeoutId);
            this.pollingTimeouts.delete(accountIdString);
        }
        // Remove from currently polling set if it was being polled
        this.accountsCurrentlyPolling.delete(accountIdString);
        // If no more accounts are being polled, stop batch polling
        if (this.accountsCurrentlyPolling.size === 0 && this.batchPollingTimeout) {
            clearTimeout(this.batchPollingTimeout);
            this.batchPollingTimeout = undefined;
        }
    }
    // Method to set polling interval
    /**
     * Set the monitoring/polling interval for monitored accounts.
     * Shorter intervals detect missed updates sooner but increase RPC load.
     */ setPollingInterval(intervalMs) {
        this.pollingIntervalMs = intervalMs;
        // Restart monitoring with new interval if already subscribed
        if (this.listenerId != null && !this.isUnsubscribing) {
            this.startMonitoringForAccounts();
        }
    }
    updateBufferAndHandleChange(newBuffer, newSlot, accountIdString) {
        this.bufferAndSlotMap.set(accountIdString, {
            buffer: newBuffer,
            slot: newSlot
        });
        const account = this.decodeBuffer(this.accountDiscriminator, newBuffer);
        const accountIdPubkey = new web3_js_1.PublicKey(accountIdString);
        this.onChange(accountIdPubkey, account, {
            slot: newSlot
        }, newBuffer);
    }
}
exports.WebSocketProgramAccountsSubscriberV2 = WebSocketProgramAccountsSubscriberV2;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketDriftClientAccountSubscriberV2.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WebSocketDriftClientAccountSubscriberV2 = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/types.js [app-route] (ecmascript)");
const types_2 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
const pda_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/addresses/pda.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const gill_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/gill@0.10.3_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/gill/dist/index.node.cjs [app-route] (ecmascript)");
const oracleClientCache_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/oracleClientCache.js [app-route] (ecmascript)");
const quoteAssetOracleClient_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/quoteAssetOracleClient.js [app-route] (ecmascript)");
const config_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/config.js [app-route] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/utils.js [app-route] (ecmascript)");
const oracleId_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/oracleId.js [app-route] (ecmascript)");
const types_3 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const memcmp_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/memcmp.js [app-route] (ecmascript)");
const webSocketProgramAccountsSubscriberV2_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketProgramAccountsSubscriberV2.js [app-route] (ecmascript)");
const webSocketAccountSubscriberV2_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketAccountSubscriberV2.js [app-route] (ecmascript)");
const ORACLE_DEFAULT_ID = (0, oracleId_1.getOracleId)(web3_js_1.PublicKey.default, types_3.OracleSource.QUOTE_ASSET);
class WebSocketDriftClientAccountSubscriberV2 {
    constructor(program, perpMarketIndexes, spotMarketIndexes, oracleInfos, shouldFindAllMarketsAndOracles, delistedMarketSetting, resubOpts, commitment, skipInitialData){
        this.oracleClientCache = new oracleClientCache_1.OracleClientCache();
        this.skipInitialData = true;
        this.perpMarketAccountLatestData = new Map();
        this.spotMarketAccountLatestData = new Map();
        this.perpOracleMap = new Map();
        this.perpOracleStringMap = new Map();
        this.spotOracleMap = new Map();
        this.spotOracleStringMap = new Map();
        this.oracleSubscribers = new Map();
        this.isSubscribing = false;
        this.chunks = (array, size)=>{
            const result = [];
            for(let i = 0; i < array.length; i += size){
                result.push(array.slice(i, i + size));
            }
            return result;
        };
        this.isSubscribed = false;
        this.program = program;
        this.eventEmitter = new events_1.EventEmitter();
        this.perpMarketIndexes = perpMarketIndexes;
        this.spotMarketIndexes = spotMarketIndexes;
        this.oracleInfos = oracleInfos;
        this.shouldFindAllMarketsAndOracles = shouldFindAllMarketsAndOracles;
        this.delistedMarketSetting = delistedMarketSetting;
        this.resubOpts = resubOpts;
        this.commitment = commitment;
        this.skipInitialData = skipInitialData !== null && skipInitialData !== void 0 ? skipInitialData : false;
        const { rpc, rpcSubscriptions } = (0, gill_1.createSolanaClient)({
            urlOrMoniker: this.program.provider.connection.rpcEndpoint
        });
        this.rpc = rpc;
        this.rpcSubscriptions = rpcSubscriptions;
    }
    async subscribe() {
        try {
            const startTime = performance.now();
            if (this.isSubscribed) {
                console.log(`[PROFILING] WebSocketDriftClientAccountSubscriberV2.subscribe() skipped - already subscribed`);
                return true;
            }
            if (this.isSubscribing) {
                console.log(`[PROFILING] WebSocketDriftClientAccountSubscriberV2.subscribe() waiting for existing subscription`);
                return await this.subscriptionPromise;
            }
            this.isSubscribing = true;
            // Initialize subscriptionPromiseResolver to a no-op function
            this.subscriptionPromiseResolver = ()=>{};
            this.subscriptionPromise = new Promise((res)=>{
                this.subscriptionPromiseResolver = res;
            });
            const [perpMarketAccountPubkeys, spotMarketAccountPubkeys] = await Promise.all([
                Promise.all(this.perpMarketIndexes.map((marketIndex)=>(0, pda_1.getPerpMarketPublicKey)(this.program.programId, marketIndex))),
                Promise.all(this.spotMarketIndexes.map((marketIndex)=>(0, pda_1.getSpotMarketPublicKey)(this.program.programId, marketIndex)))
            ]);
            // Profile findAllMarketsAndOracles if needed
            let findAllMarketsDuration = 0;
            if (this.shouldFindAllMarketsAndOracles) {
                const findAllMarketsStartTime = performance.now();
                const { perpMarketIndexes, perpMarketAccounts, spotMarketIndexes, spotMarketAccounts, oracleInfos } = await (0, config_1.findAllMarketAndOracles)(this.program);
                this.perpMarketIndexes = perpMarketIndexes;
                this.spotMarketIndexes = spotMarketIndexes;
                this.oracleInfos = oracleInfos;
                // front run and set the initial data here to save extra gma call in set initial data
                this.initialPerpMarketAccountData = new Map(perpMarketAccounts.map((market)=>[
                        market.marketIndex,
                        market
                    ]));
                this.initialSpotMarketAccountData = new Map(spotMarketAccounts.map((market)=>[
                        market.marketIndex,
                        market
                    ]));
                const findAllMarketsEndTime = performance.now();
                findAllMarketsDuration = findAllMarketsEndTime - findAllMarketsStartTime;
                console.log(`[PROFILING] findAllMarketAndOracles completed in ${findAllMarketsDuration.toFixed(2)}ms (${perpMarketAccounts.length} perp markets, ${spotMarketAccounts.length} spot markets)`);
            }
            // Create subscribers
            this.perpMarketAllAccountsSubscriber = new webSocketProgramAccountsSubscriberV2_1.WebSocketProgramAccountsSubscriberV2('PerpMarketAccountsSubscriber', 'PerpMarket', this.program, this.program.account.perpMarket.coder.accounts.decodeUnchecked.bind(this.program.account.perpMarket.coder.accounts), {
                filters: [
                    (0, memcmp_1.getPerpMarketAccountsFilter)()
                ],
                commitment: this.commitment
            }, this.resubOpts, perpMarketAccountPubkeys // because we pass these in, it will monitor these accounts and fetch them right away
            );
            this.spotMarketAllAccountsSubscriber = new webSocketProgramAccountsSubscriberV2_1.WebSocketProgramAccountsSubscriberV2('SpotMarketAccountsSubscriber', 'SpotMarket', this.program, this.program.account.spotMarket.coder.accounts.decodeUnchecked.bind(this.program.account.spotMarket.coder.accounts), {
                filters: [
                    (0, memcmp_1.getSpotMarketAccountsFilter)()
                ],
                commitment: this.commitment
            }, this.resubOpts, spotMarketAccountPubkeys // because we pass these in, it will monitor these accounts and fetch them right away
            );
            // Run all subscriptions in parallel
            await Promise.all([
                // Perp market subscription
                this.perpMarketAllAccountsSubscriber.subscribe((_accountId, data, context, _buffer)=>{
                    if (this.delistedMarketSetting !== types_1.DelistedMarketSetting.Subscribe && (0, types_2.isVariant)(data.status, 'delisted')) {
                        return;
                    }
                    this.perpMarketAccountLatestData.set(data.marketIndex, {
                        data,
                        slot: context.slot
                    });
                    this.eventEmitter.emit('perpMarketAccountUpdate', data);
                    this.eventEmitter.emit('update');
                }),
                // Spot market subscription
                this.spotMarketAllAccountsSubscriber.subscribe((_accountId, data, context, _buffer)=>{
                    if (this.delistedMarketSetting !== types_1.DelistedMarketSetting.Subscribe && (0, types_2.isVariant)(data.status, 'delisted')) {
                        return;
                    }
                    this.spotMarketAccountLatestData.set(data.marketIndex, {
                        data,
                        slot: context.slot
                    });
                    this.eventEmitter.emit('spotMarketAccountUpdate', data);
                    this.eventEmitter.emit('update');
                }),
                // State account subscription
                (async ()=>{
                    const statePublicKey = await (0, pda_1.getDriftStateAccountPublicKey)(this.program.programId);
                    this.stateAccountSubscriber = new webSocketAccountSubscriberV2_1.WebSocketAccountSubscriberV2('state', this.program, statePublicKey, undefined, undefined, this.commitment, this.rpcSubscriptions, this.rpc);
                    await Promise.all([
                        this.stateAccountSubscriber.fetch(),
                        this.stateAccountSubscriber.subscribe((data)=>{
                            this.eventEmitter.emit('stateAccountUpdate', data);
                            this.eventEmitter.emit('update');
                        })
                    ]);
                })(),
                (async ()=>{
                    await this.setInitialData();
                    const subscribeToOraclesStartTime = performance.now();
                    await this.subscribeToOracles();
                    const subscribeToOraclesEndTime = performance.now();
                    const duration = subscribeToOraclesEndTime - subscribeToOraclesStartTime;
                    return duration;
                })()
            ]);
            // const initialPerpMarketDataFromLatestData = new Map(
            // 	Array.from(this.perpMarketAccountLatestData.values()).map((data) => [
            // 		data.data.marketIndex,
            // 		data.data,
            // 	])
            // );
            // const initialSpotMarketDataFromLatestData = new Map(
            // 	Array.from(this.spotMarketAccountLatestData.values()).map((data) => [
            // 		data.data.marketIndex,
            // 		data.data,
            // 	])
            // );
            // this.initialPerpMarketAccountData = initialPerpMarketDataFromLatestData;
            // this.initialSpotMarketAccountData = initialSpotMarketDataFromLatestData;
            await this.handleDelistedMarketOracles();
            await Promise.all([
                this.setPerpOracleMap(),
                this.setSpotOracleMap()
            ]);
            this.eventEmitter.emit('update');
            // delete initial data
            this.removeInitialData();
            const totalDuration = performance.now() - startTime;
            console.log(`[PROFILING] WebSocketDriftClientAccountSubscriberV2.subscribe() completed in ${totalDuration.toFixed(2)}ms`);
            // Resolve the subscription promise
            this.isSubscribed = true;
            this.isSubscribing = false;
            // Before calling subscriptionPromiseResolver, check if it's defined
            if (this.subscriptionPromiseResolver) {
                this.subscriptionPromiseResolver(true);
            }
            return true;
        } catch (error) {
            console.error('Subscription failed:', error);
            this.isSubscribing = false;
            this.subscriptionPromiseResolver(false);
            return false;
        }
    }
    async fetch() {
        await this.setInitialData();
    }
    /**
     * This is a no-op method that always returns true.
     * Unlike the previous implementation, we don't need to manually subscribe to individual perp markets
     * because we automatically receive updates for all program account changes via a single websocket subscription.
     * This means any new perp markets will automatically be included without explicit subscription.
     * @param marketIndex The perp market index to add (unused)
     * @returns Promise that resolves to true
     */ addPerpMarket(_marketIndex) {
        return Promise.resolve(true);
    }
    /**
     * This is a no-op method that always returns true.
     * Unlike the previous implementation, we don't need to manually subscribe to individual spot markets
     * because we automatically receive updates for all program account changes via a single websocket subscription.
     * This means any new spot markets will automatically be included without explicit subscription.
     * @param marketIndex The spot market index to add (unused)
     * @returns Promise that resolves to true
     */ addSpotMarket(_marketIndex) {
        return Promise.resolve(true);
    }
    // TODO: need more options to skip loading perp market and spot market data. Because of how we fetch within the program account subscribers, I am commenting this all out
    async setInitialData() {
        var _a;
        const connection = this.program.provider.connection;
        // Profile oracle initial data setup
        const oracleSetupStartTime = performance.now();
        const oracleAccountPubkeyChunks = this.chunks(this.oracleInfos.map((oracleInfo)=>oracleInfo.publicKey), 100);
        const oracleAccountInfos = (await Promise.all(oracleAccountPubkeyChunks.map((oracleAccountPublicKeysChunk)=>connection.getMultipleAccountsInfo(oracleAccountPublicKeysChunk)))).flat();
        this.initialOraclePriceData = new Map(this.oracleInfos.reduce((result, oracleInfo, i)=>{
            if (!oracleAccountInfos[i]) {
                return result;
            }
            const oracleClient = this.oracleClientCache.get(oracleInfo.source, connection, this.program);
            const oraclePriceData = oracleClient.getOraclePriceDataFromBuffer(oracleAccountInfos[i].data);
            result.push([
                (0, oracleId_1.getOracleId)(oracleInfo.publicKey, oracleInfo.source),
                oraclePriceData
            ]);
            return result;
        }, []));
        const oracleSetupEndTime = performance.now();
        const oracleSetupDuration = oracleSetupEndTime - oracleSetupStartTime;
        if ((_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.logResubMessages) {
            console.log(`[PROFILING] Oracle initial data setup completed in ${oracleSetupDuration.toFixed(2)}ms (${this.initialOraclePriceData.size} oracles)`);
        }
        // emit initial oracle price data
        Array.from(this.initialOraclePriceData.entries()).forEach(([oracleId, oraclePriceData])=>{
            const { publicKey, source } = (0, oracleId_1.getPublicKeyAndSourceFromOracleId)(oracleId);
            this.eventEmitter.emit('oraclePriceUpdate', publicKey, source, oraclePriceData);
        });
        this.eventEmitter.emit('update');
    }
    removeInitialData() {
        this.initialPerpMarketAccountData = new Map();
        this.initialSpotMarketAccountData = new Map();
        this.initialOraclePriceData = new Map();
    }
    async subscribeToOracles() {
        const startTime = performance.now();
        // Filter out default oracles and duplicates to avoid unnecessary subscriptions
        const validOracleInfos = this.oracleInfos.filter((oracleInfo)=>!this.oracleSubscribers.has((0, oracleId_1.getOracleId)(oracleInfo.publicKey, oracleInfo.source)));
        await Promise.all(validOracleInfos.map((oracleInfo)=>this.subscribeToOracle(oracleInfo)));
        const totalDuration = performance.now() - startTime;
        console.log(`[PROFILING] subscribeToOracles() completed in ${totalDuration.toFixed(2)}ms`);
        return true;
    }
    async subscribeToOracle(oracleInfo) {
        var _a;
        try {
            const oracleId = (0, oracleId_1.getOracleId)(oracleInfo.publicKey, oracleInfo.source);
            const client = this.oracleClientCache.get(oracleInfo.source, this.program.provider.connection, this.program);
            const accountSubscriber = new webSocketAccountSubscriberV2_1.WebSocketAccountSubscriberV2('oracle', this.program, oracleInfo.publicKey, (buffer)=>{
                return client.getOraclePriceDataFromBuffer(buffer);
            }, this.resubOpts, this.commitment, this.rpcSubscriptions, this.rpc);
            const initialOraclePriceData = (_a = this.initialOraclePriceData) === null || _a === void 0 ? void 0 : _a.get(oracleId);
            if (initialOraclePriceData) {
                accountSubscriber.setData(initialOraclePriceData);
            }
            await accountSubscriber.subscribe((data)=>{
                this.eventEmitter.emit('oraclePriceUpdate', oracleInfo.publicKey, oracleInfo.source, data);
                this.eventEmitter.emit('update');
            });
            this.oracleSubscribers.set(oracleId, accountSubscriber);
            return true;
        } catch (error) {
            console.error(`Failed to subscribe to oracle ${oracleInfo.publicKey.toString()}:`, error);
            return false;
        }
    }
    async unsubscribeFromMarketAccounts() {
        await this.perpMarketAllAccountsSubscriber.unsubscribe();
    }
    async unsubscribeFromSpotMarketAccounts() {
        await this.spotMarketAllAccountsSubscriber.unsubscribe();
    }
    async unsubscribeFromOracles() {
        await Promise.all(Array.from(this.oracleSubscribers.values()).map((accountSubscriber)=>accountSubscriber.unsubscribe()));
    }
    async unsubscribe() {
        var _a;
        if (!this.isSubscribed) {
            return;
        }
        if (this.subscriptionPromise) {
            await this.subscriptionPromise;
        }
        await Promise.all([
            (_a = this.stateAccountSubscriber) === null || _a === void 0 ? void 0 : _a.unsubscribe(),
            this.unsubscribeFromMarketAccounts(),
            this.unsubscribeFromSpotMarketAccounts(),
            this.unsubscribeFromOracles()
        ]);
        this.isSubscribed = false;
        this.isSubscribing = false;
        this.subscriptionPromiseResolver = ()=>{};
    }
    async addOracle(oracleInfo) {
        const oracleId = (0, oracleId_1.getOracleId)(oracleInfo.publicKey, oracleInfo.source);
        if (this.oracleSubscribers.has(oracleId)) {
            return true;
        }
        if (oracleInfo.publicKey.equals(web3_js_1.PublicKey.default)) {
            return true;
        }
        return this.subscribeToOracle(oracleInfo);
    }
    async setPerpOracleMap() {
        const perpMarkets = this.getMarketAccountsAndSlots();
        const addOraclePromises = [];
        for (const perpMarket of perpMarkets){
            if (!perpMarket || !perpMarket.data) {
                continue;
            }
            const perpMarketAccount = perpMarket.data;
            const perpMarketIndex = perpMarketAccount.marketIndex;
            const oracle = perpMarketAccount.amm.oracle;
            const oracleId = (0, oracleId_1.getOracleId)(oracle, perpMarket.data.amm.oracleSource);
            if (!this.oracleSubscribers.has(oracleId)) {
                addOraclePromises.push(this.addOracle({
                    publicKey: oracle,
                    source: perpMarket.data.amm.oracleSource
                }));
            }
            this.perpOracleMap.set(perpMarketIndex, oracle);
            this.perpOracleStringMap.set(perpMarketIndex, oracleId);
        }
        await Promise.all(addOraclePromises);
    }
    async setSpotOracleMap() {
        const spotMarkets = this.getSpotMarketAccountsAndSlots();
        const addOraclePromises = [];
        for (const spotMarket of spotMarkets){
            if (!spotMarket || !spotMarket.data) {
                continue;
            }
            const spotMarketAccount = spotMarket.data;
            const spotMarketIndex = spotMarketAccount.marketIndex;
            const oracle = spotMarketAccount.oracle;
            const oracleId = (0, oracleId_1.getOracleId)(oracle, spotMarketAccount.oracleSource);
            if (!this.oracleSubscribers.has(oracleId)) {
                addOraclePromises.push(this.addOracle({
                    publicKey: oracle,
                    source: spotMarketAccount.oracleSource
                }));
            }
            this.spotOracleMap.set(spotMarketIndex, oracle);
            this.spotOracleStringMap.set(spotMarketIndex, oracleId);
        }
        await Promise.all(addOraclePromises);
    }
    async handleDelistedMarketOracles() {
        if (this.delistedMarketSetting === types_1.DelistedMarketSetting.Subscribe) {
            return;
        }
        const { oracles } = (0, utils_1.findDelistedPerpMarketsAndOracles)(this.getMarketAccountsAndSlots(), this.getSpotMarketAccountsAndSlots());
        for (const oracle of oracles){
            const oracleId = (0, oracleId_1.getOracleId)(oracle.publicKey, oracle.source);
            if (this.oracleSubscribers.has(oracleId)) {
                await this.oracleSubscribers.get(oracleId).unsubscribe();
                if (this.delistedMarketSetting === types_1.DelistedMarketSetting.Discard) {
                    this.oracleSubscribers.delete(oracleId);
                }
            }
        }
    }
    assertIsSubscribed() {
        if (!this.isSubscribed) {
            throw new types_1.NotSubscribedError('You must call `subscribe` before using this function');
        }
    }
    getStateAccountAndSlot() {
        this.assertIsSubscribed();
        return this.stateAccountSubscriber.dataAndSlot;
    }
    getMarketAccountAndSlot(marketIndex) {
        this.assertIsSubscribed();
        return this.perpMarketAccountLatestData.get(marketIndex);
    }
    getMarketAccountsAndSlots() {
        return Array.from(this.perpMarketAccountLatestData.values());
    }
    getSpotMarketAccountAndSlot(marketIndex) {
        this.assertIsSubscribed();
        return this.spotMarketAccountLatestData.get(marketIndex);
    }
    getSpotMarketAccountsAndSlots() {
        return Array.from(this.spotMarketAccountLatestData.values());
    }
    getOraclePriceDataAndSlot(oracleId) {
        var _a;
        this.assertIsSubscribed();
        if (oracleId === ORACLE_DEFAULT_ID) {
            return {
                data: quoteAssetOracleClient_1.QUOTE_ORACLE_PRICE_DATA,
                slot: 0
            };
        }
        return (_a = this.oracleSubscribers.get(oracleId)) === null || _a === void 0 ? void 0 : _a.dataAndSlot;
    }
    getOraclePriceDataAndSlotForPerpMarket(marketIndex) {
        const perpMarketAccount = this.getMarketAccountAndSlot(marketIndex);
        const oracle = this.perpOracleMap.get(marketIndex);
        const oracleId = this.perpOracleStringMap.get(marketIndex);
        if (!perpMarketAccount || !oracleId) {
            return undefined;
        }
        if (!perpMarketAccount.data.amm.oracle.equals(oracle)) {
            // If the oracle has changed, we need to update the oracle map in background
            this.setPerpOracleMap();
        }
        return this.getOraclePriceDataAndSlot(oracleId);
    }
    getOraclePriceDataAndSlotForSpotMarket(marketIndex) {
        const spotMarketAccount = this.getSpotMarketAccountAndSlot(marketIndex);
        const oracle = this.spotOracleMap.get(marketIndex);
        const oracleId = this.spotOracleStringMap.get(marketIndex);
        if (!spotMarketAccount || !oracleId) {
            return undefined;
        }
        if (!spotMarketAccount.data.oracle.equals(oracle)) {
            // If the oracle has changed, we need to update the oracle map in background
            this.setSpotOracleMap();
        }
        return this.getOraclePriceDataAndSlot(oracleId);
    }
}
exports.WebSocketDriftClientAccountSubscriberV2 = WebSocketDriftClientAccountSubscriberV2;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/bulkAccountLoader.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BulkAccountLoader = void 0;
const uuid_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/index.js [app-route] (ecmascript)");
const promiseTimeout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/util/promiseTimeout.js [app-route] (ecmascript)");
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const oneMinute = 60 * 1000;
class BulkAccountLoader {
    constructor(connection, commitment, pollingFrequency){
        this.accountsToLoad = new Map();
        this.bufferAndSlotMap = new Map();
        this.errorCallbacks = new Map();
        this.lastTimeLoadingPromiseCleared = Date.now();
        this.mostRecentSlot = 0;
        this.connection = connection;
        this.commitment = commitment;
        this.pollingFrequency = pollingFrequency;
    }
    async addAccount(publicKey, callback) {
        if (!publicKey) {
            console.trace(`Caught adding blank publickey to bulkAccountLoader`);
        }
        const existingSize = this.accountsToLoad.size;
        const callbackId = (0, uuid_1.v4)();
        const existingAccountToLoad = this.accountsToLoad.get(publicKey.toString());
        if (existingAccountToLoad) {
            existingAccountToLoad.callbacks.set(callbackId, callback);
        } else {
            const callbacks = new Map();
            callbacks.set(callbackId, callback);
            const newAccountToLoad = {
                publicKey,
                callbacks
            };
            this.accountsToLoad.set(publicKey.toString(), newAccountToLoad);
        }
        if (existingSize === 0) {
            this.startPolling();
        }
        // resolve the current loadPromise in case client wants to call load
        await this.loadPromise;
        return callbackId;
    }
    removeAccount(publicKey, callbackId) {
        const existingAccountToLoad = this.accountsToLoad.get(publicKey.toString());
        if (existingAccountToLoad) {
            existingAccountToLoad.callbacks.delete(callbackId);
            if (existingAccountToLoad.callbacks.size === 0) {
                this.bufferAndSlotMap.delete(publicKey.toString());
                this.accountsToLoad.delete(existingAccountToLoad.publicKey.toString());
            }
        }
        if (this.accountsToLoad.size === 0) {
            this.stopPolling();
        }
    }
    addErrorCallbacks(callback) {
        const callbackId = (0, uuid_1.v4)();
        this.errorCallbacks.set(callbackId, callback);
        return callbackId;
    }
    removeErrorCallbacks(callbackId) {
        this.errorCallbacks.delete(callbackId);
    }
    chunks(array, size) {
        return new Array(Math.ceil(array.length / size)).fill(null).map((_, index)=>index * size).map((begin)=>array.slice(begin, begin + size));
    }
    async load() {
        if (this.loadPromise) {
            const now = Date.now();
            if (now - this.lastTimeLoadingPromiseCleared > oneMinute) {
                this.loadPromise = undefined;
            } else {
                return this.loadPromise;
            }
        }
        this.loadPromise = new Promise((resolver)=>{
            this.loadPromiseResolver = resolver;
        });
        this.lastTimeLoadingPromiseCleared = Date.now();
        try {
            const chunks = this.chunks(this.chunks(Array.from(this.accountsToLoad.values()), numericConstants_1.GET_MULTIPLE_ACCOUNTS_CHUNK_SIZE), 10);
            await Promise.all(chunks.map((chunk)=>{
                return this.loadChunk(chunk);
            }));
        } catch (e) {
            console.error(`Error in bulkAccountLoader.load()`);
            console.error(e);
            for (const [_, callback] of this.errorCallbacks){
                callback(e);
            }
        } finally{
            this.loadPromiseResolver();
            this.loadPromise = undefined;
        }
    }
    async loadChunk(accountsToLoadChunks) {
        if (accountsToLoadChunks.length === 0) {
            return;
        }
        const requests = new Array();
        for (const accountsToLoadChunk of accountsToLoadChunks){
            const args = [
                accountsToLoadChunk.filter((accountToLoad)=>accountToLoad.callbacks.size > 0).map((accountToLoad)=>{
                    return accountToLoad.publicKey.toBase58();
                }),
                {
                    commitment: this.commitment
                }
            ];
            requests.push({
                methodName: 'getMultipleAccounts',
                args
            });
        }
        const rpcResponses = await (0, promiseTimeout_1.promiseTimeout)(// @ts-ignore
        this.connection._rpcBatchRequest(requests), 10 * 1000 // 30 second timeout
        );
        if (rpcResponses === null) {
            this.log('request to rpc timed out');
            return;
        }
        rpcResponses.forEach((rpcResponse, i)=>{
            if (!rpcResponse.result) {
                console.error('rpc response missing result:');
                console.log(JSON.stringify(rpcResponse));
                return;
            }
            const newSlot = rpcResponse.result.context.slot;
            if (newSlot > this.mostRecentSlot) {
                this.mostRecentSlot = newSlot;
            }
            const accountsToLoad = accountsToLoadChunks[i];
            accountsToLoad.forEach((accountToLoad, j)=>{
                if (accountToLoad.callbacks.size === 0) {
                    return;
                }
                const key = accountToLoad.publicKey.toBase58();
                const oldRPCResponse = this.bufferAndSlotMap.get(key);
                if (oldRPCResponse && newSlot < oldRPCResponse.slot) {
                    return;
                }
                let newBuffer = undefined;
                if (rpcResponse.result.value[j]) {
                    const raw = rpcResponse.result.value[j].data[0];
                    const dataType = rpcResponse.result.value[j].data[1];
                    newBuffer = Buffer.from(raw, dataType);
                }
                if (!oldRPCResponse) {
                    this.bufferAndSlotMap.set(key, {
                        slot: newSlot,
                        buffer: newBuffer
                    });
                    this.handleAccountCallbacks(accountToLoad, newBuffer, newSlot);
                    return;
                }
                const oldBuffer = oldRPCResponse.buffer;
                if (newBuffer && (!oldBuffer || !newBuffer.equals(oldBuffer))) {
                    this.bufferAndSlotMap.set(key, {
                        slot: newSlot,
                        buffer: newBuffer
                    });
                    this.handleAccountCallbacks(accountToLoad, newBuffer, newSlot);
                }
            });
        });
    }
    handleAccountCallbacks(accountToLoad, buffer, slot) {
        for (const [_, callback] of accountToLoad.callbacks){
            try {
                callback(buffer, slot);
            } catch (e) {
                console.log('Bulk account load: error in account callback');
                console.log('accounto to load', accountToLoad.publicKey.toString());
                console.log('buffer', buffer.toString('base64'));
                for (const callback of accountToLoad.callbacks.values()){
                    console.log('account to load cb', callback);
                }
                throw e;
            }
        }
    }
    getBufferAndSlot(publicKey) {
        return this.bufferAndSlotMap.get(publicKey.toString());
    }
    getSlot() {
        return this.mostRecentSlot;
    }
    startPolling() {
        if (this.intervalId) {
            return;
        }
        if (this.pollingFrequency !== 0) this.intervalId = setInterval(this.load.bind(this), this.pollingFrequency);
    }
    stopPolling() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
    }
    log(msg) {
        console.log(msg);
    }
    updatePollingFrequency(pollingFrequency) {
        this.stopPolling();
        this.pollingFrequency = pollingFrequency;
        if (this.accountsToLoad.size > 0) {
            this.startPolling();
        }
    }
}
exports.BulkAccountLoader = BulkAccountLoader;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/bulkUserSubscription.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bulkPollingUserSubscribe = void 0;
/**
 * @param users
 * @param accountLoader
 */ async function bulkPollingUserSubscribe(users, accountLoader) {
    if (users.length === 0) {
        await accountLoader.load();
        return;
    }
    await Promise.all(users.map((user)=>{
        return user.accountSubscriber.addToAccountLoader();
    }));
    await accountLoader.load();
    await Promise.all(users.map(async (user)=>{
        return user.subscribe();
    }));
}
exports.bulkPollingUserSubscribe = bulkPollingUserSubscribe;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/bulkUserStatsSubscription.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bulkPollingUserStatsSubscribe = void 0;
/**
 * @param userStats
 * @param accountLoader
 */ async function bulkPollingUserStatsSubscribe(userStats, accountLoader) {
    if (userStats.length === 0) {
        await accountLoader.load();
        return;
    }
    await Promise.all(userStats.map((userStat)=>{
        return userStat.accountSubscriber.addToAccountLoader();
    }));
    await accountLoader.load();
    await Promise.all(userStats.map(async (userStat)=>{
        return userStat.subscribe();
    }));
}
exports.bulkPollingUserStatsSubscribe = bulkPollingUserStatsSubscribe;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/customizedCadenceBulkAccountLoader.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CustomizedCadenceBulkAccountLoader = void 0;
const numericConstants_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/constants/numericConstants.js [app-route] (ecmascript)");
const bulkAccountLoader_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/bulkAccountLoader.js [app-route] (ecmascript)");
const uuid_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/uuid@8.3.2/node_modules/uuid/dist/esm-node/index.js [app-route] (ecmascript)");
class CustomizedCadenceBulkAccountLoader extends bulkAccountLoader_1.BulkAccountLoader {
    constructor(connection, commitment, defaultPollingFrequency){
        super(connection, commitment, defaultPollingFrequency);
        this.customIntervalId = null;
        this.currentPollingFrequency = null;
        this.accountFrequencies = new Map();
        this.lastPollingTimes = new Map();
        this.defaultPollingFrequency = defaultPollingFrequency;
    }
    getAccountsToLoad() {
        const currentTime = Date.now();
        const accountsToLoad = [];
        for (const [key, frequency] of this.accountFrequencies.entries()){
            const lastPollTime = this.lastPollingTimes.get(key) || 0;
            if (currentTime - lastPollTime >= frequency) {
                const account = this.accountsToLoad.get(key);
                if (account) {
                    accountsToLoad.push(account);
                    this.lastPollingTimes.set(key, currentTime);
                }
            }
        }
        return accountsToLoad;
    }
    async load() {
        return this.handleAccountLoading();
    }
    async handleAccountLoading() {
        const accounts = this.getAccountsToLoad();
        if (accounts.length > 0) {
            const chunks = this.chunks(this.chunks(accounts, numericConstants_1.GET_MULTIPLE_ACCOUNTS_CHUNK_SIZE), 10);
            await Promise.all(chunks.map((chunk)=>{
                return this.loadChunk(chunk);
            }));
        }
    }
    /**
     * Updates the polling frequency for an account. This affects all callbacks attached to this account.
     *
     * @param publicKey The public key of the account to set the custom polling frequency for
     * @param newFrequency The new polling frequency in ms
     */ setCustomPollingFrequency(publicKey, newFrequency) {
        const key = publicKey.toBase58();
        this.accountFrequencies.set(key, newFrequency);
        this.lastPollingTimes.set(key, 0); // Reset last polling time to ensure immediate load
        this.restartPollingIfNeeded(newFrequency);
    }
    restartPollingIfNeeded(newFrequency) {
        if (this.currentPollingFrequency && newFrequency < this.currentPollingFrequency || !this.customIntervalId) {
            this.stopPolling();
            this.startPolling();
        }
    }
    /**
     * Adds an account to be monitored by the bulk account loader
     * @param publicKey The public key of the account to monitor
     * @param callback Function to be called when account data is received
     * @param customPollingFrequency Optional custom polling frequency in ms for this specific account.
     * If not provided, will use the default polling frequency
     * @returns A unique callback ID that can be used to remove this specific callback later
     *
     * The method will:
     * 1. Create a new callback mapping for the account if it doesn't exist already
     * 2. Set up polling frequency tracking for the account if it doesn't exist already. If previous polling frequency is faster than the new one,
     *    we will use the previous frequency.
     * 3. Reset last polling time to 0 to ensure data fetch is triggered on the next poll. Note that this does not mean the account will be fetched immediately.
     * 4. Automatically restart polling if this account needs a faster frequency than existing accounts
     */ async addAccount(publicKey, callback, customPollingFrequency) {
        const callbackId = (0, uuid_1.v4)();
        const existingAccountToLoad = this.accountsToLoad.get(publicKey.toString());
        if (existingAccountToLoad) {
            existingAccountToLoad.callbacks.set(callbackId, callback);
        } else {
            const callbacks = new Map();
            callbacks.set(callbackId, callback);
            const newAccountToLoad = {
                publicKey,
                callbacks
            };
            this.accountsToLoad.set(publicKey.toString(), newAccountToLoad);
        }
        const key = publicKey.toBase58();
        const previousFrequency = this.accountFrequencies.get(key) || this.defaultPollingFrequency;
        const updatedFrequency = customPollingFrequency && customPollingFrequency < previousFrequency ? customPollingFrequency : previousFrequency;
        this.accountFrequencies.set(key, updatedFrequency);
        this.lastPollingTimes.set(key, 0); // Reset last polling time to ensure immediate load
        this.restartPollingIfNeeded(updatedFrequency);
        return callbackId;
    }
    removeAccount(publicKey, callbackId) {
        const existingAccountToLoad = this.accountsToLoad.get(publicKey.toString());
        if (existingAccountToLoad) {
            existingAccountToLoad.callbacks.delete(callbackId);
            if (existingAccountToLoad.callbacks.size === 0) {
                this.bufferAndSlotMap.delete(publicKey.toString());
                this.accountsToLoad.delete(existingAccountToLoad.publicKey.toString());
                const key = publicKey.toBase58();
                this.accountFrequencies.delete(key);
                this.lastPollingTimes.delete(key);
            }
        }
        if (this.accountsToLoad.size === 0) {
            this.stopPolling();
        } else {
            // Restart polling in case we removed the account with the smallest frequency
            this.restartPollingIfNeeded(this.defaultPollingFrequency);
        }
    }
    getAccountCadence(publicKey) {
        const key = publicKey.toBase58();
        return this.accountFrequencies.get(key) || null;
    }
    startPolling() {
        if (this.customIntervalId) {
            return;
        }
        const minFrequency = Math.min(...Array.from(this.accountFrequencies.values()), this.defaultPollingFrequency);
        this.currentPollingFrequency = minFrequency;
        this.customIntervalId = setInterval(()=>{
            this.handleAccountLoading().catch((error)=>{
                console.error('Error in account loading:', error);
            });
        }, minFrequency);
    }
    stopPolling() {
        super.stopPolling();
        if (this.customIntervalId) {
            clearInterval(this.customIntervalId);
            this.customIntervalId = null;
            this.currentPollingFrequency = null;
        }
        this.lastPollingTimes.clear();
    }
    clearAccountFrequencies() {
        this.accountFrequencies.clear();
    }
}
exports.CustomizedCadenceBulkAccountLoader = CustomizedCadenceBulkAccountLoader;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/pollingDriftClientAccountSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PollingDriftClientAccountSubscriber = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/types.js [app-route] (ecmascript)");
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
const types_2 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/types.js [app-route] (ecmascript)");
const pda_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/addresses/pda.js [app-route] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/utils.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const oracleClientCache_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/oracleClientCache.js [app-route] (ecmascript)");
const quoteAssetOracleClient_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/quoteAssetOracleClient.js [app-route] (ecmascript)");
const config_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/config.js [app-route] (ecmascript)");
const oracleId_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/oracleId.js [app-route] (ecmascript)");
const ORACLE_DEFAULT_ID = (0, oracleId_1.getOracleId)(web3_js_1.PublicKey.default, types_2.OracleSource.QUOTE_ASSET);
class PollingDriftClientAccountSubscriber {
    constructor(program, accountLoader, perpMarketIndexes, spotMarketIndexes, oracleInfos, shouldFindAllMarketsAndOracles, delistedMarketSetting){
        this.oracleClientCache = new oracleClientCache_1.OracleClientCache();
        this.accountsToPoll = new Map();
        this.oraclesToPoll = new Map();
        this.perpMarket = new Map();
        this.perpOracleMap = new Map();
        this.perpOracleStringMap = new Map();
        this.spotMarket = new Map();
        this.spotOracleMap = new Map();
        this.spotOracleStringMap = new Map();
        this.oracles = new Map();
        this.isSubscribing = false;
        this.isSubscribed = false;
        this.program = program;
        this.eventEmitter = new events_1.EventEmitter();
        this.accountLoader = accountLoader;
        this.perpMarketIndexes = perpMarketIndexes;
        this.spotMarketIndexes = spotMarketIndexes;
        this.oracleInfos = oracleInfos;
        this.shouldFindAllMarketsAndOracles = shouldFindAllMarketsAndOracles;
        this.delistedMarketSetting = delistedMarketSetting;
    }
    async subscribe() {
        if (this.isSubscribed) {
            return true;
        }
        if (this.isSubscribing) {
            return await this.subscriptionPromise;
        }
        this.isSubscribing = true;
        this.subscriptionPromise = new Promise((res)=>{
            this.subscriptionPromiseResolver = res;
        });
        if (this.shouldFindAllMarketsAndOracles) {
            const { perpMarketIndexes, spotMarketIndexes, oracleInfos } = await (0, config_1.findAllMarketAndOracles)(this.program);
            this.perpMarketIndexes = perpMarketIndexes;
            this.spotMarketIndexes = spotMarketIndexes;
            this.oracleInfos = oracleInfos;
        }
        await this.updateAccountsToPoll();
        this.updateOraclesToPoll();
        await this.addToAccountLoader();
        let subscriptionSucceeded = false;
        let retries = 0;
        while(!subscriptionSucceeded && retries < 5){
            await this.fetch();
            subscriptionSucceeded = this.didSubscriptionSucceed();
            retries++;
        }
        if (subscriptionSucceeded) {
            this.eventEmitter.emit('update');
        }
        this.handleDelistedMarkets();
        await Promise.all([
            this.setPerpOracleMap(),
            this.setSpotOracleMap()
        ]);
        this.isSubscribing = false;
        this.isSubscribed = subscriptionSucceeded;
        this.subscriptionPromiseResolver(subscriptionSucceeded);
        return subscriptionSucceeded;
    }
    async updateAccountsToPoll() {
        if (this.accountsToPoll.size > 0) {
            return;
        }
        const statePublicKey = await (0, pda_1.getDriftStateAccountPublicKey)(this.program.programId);
        this.accountsToPoll.set(statePublicKey.toString(), {
            key: 'state',
            publicKey: statePublicKey,
            eventType: 'stateAccountUpdate'
        });
        await Promise.all([
            this.updatePerpMarketAccountsToPoll(),
            this.updateSpotMarketAccountsToPoll()
        ]);
    }
    async updatePerpMarketAccountsToPoll() {
        await Promise.all(this.perpMarketIndexes.map((marketIndex)=>{
            return this.addPerpMarketAccountToPoll(marketIndex);
        }));
        return true;
    }
    async addPerpMarketAccountToPoll(marketIndex) {
        const perpMarketPublicKey = await (0, pda_1.getPerpMarketPublicKey)(this.program.programId, marketIndex);
        this.accountsToPoll.set(perpMarketPublicKey.toString(), {
            key: 'perpMarket',
            publicKey: perpMarketPublicKey,
            eventType: 'perpMarketAccountUpdate',
            mapKey: marketIndex
        });
        return true;
    }
    async updateSpotMarketAccountsToPoll() {
        await Promise.all(this.spotMarketIndexes.map(async (marketIndex)=>{
            await this.addSpotMarketAccountToPoll(marketIndex);
        }));
        return true;
    }
    async addSpotMarketAccountToPoll(marketIndex) {
        const marketPublicKey = await (0, pda_1.getSpotMarketPublicKey)(this.program.programId, marketIndex);
        this.accountsToPoll.set(marketPublicKey.toString(), {
            key: 'spotMarket',
            publicKey: marketPublicKey,
            eventType: 'spotMarketAccountUpdate',
            mapKey: marketIndex
        });
        return true;
    }
    updateOraclesToPoll() {
        for (const oracleInfo of this.oracleInfos){
            if (!oracleInfo.publicKey.equals(web3_js_1.PublicKey.default)) {
                this.addOracleToPoll(oracleInfo);
            }
        }
        return true;
    }
    addOracleToPoll(oracleInfo) {
        this.oraclesToPoll.set((0, oracleId_1.getOracleId)(oracleInfo.publicKey, oracleInfo.source), {
            publicKey: oracleInfo.publicKey,
            source: oracleInfo.source
        });
        return true;
    }
    async addToAccountLoader() {
        const accountPromises = [];
        for (const [_, accountToPoll] of this.accountsToPoll){
            accountPromises.push(this.addAccountToAccountLoader(accountToPoll));
        }
        const oraclePromises = [];
        for (const [_, oracleToPoll] of this.oraclesToPoll){
            oraclePromises.push(this.addOracleToAccountLoader(oracleToPoll));
        }
        await Promise.all([
            ...accountPromises,
            ...oraclePromises
        ]);
        this.errorCallbackId = this.accountLoader.addErrorCallbacks((error)=>{
            this.eventEmitter.emit('error', error);
        });
    }
    async addAccountToAccountLoader(accountToPoll) {
        accountToPoll.callbackId = await this.accountLoader.addAccount(accountToPoll.publicKey, (buffer, slot)=>{
            if (!buffer) return;
            const account = this.program.account[accountToPoll.key].coder.accounts.decodeUnchecked((0, utils_1.capitalize)(accountToPoll.key), buffer);
            const dataAndSlot = {
                data: account,
                slot
            };
            if (accountToPoll.mapKey != undefined) {
                this[accountToPoll.key].set(accountToPoll.mapKey, dataAndSlot);
            } else {
                this[accountToPoll.key] = dataAndSlot;
            }
            // @ts-ignore
            this.eventEmitter.emit(accountToPoll.eventType, account);
            this.eventEmitter.emit('update');
            if (!this.isSubscribed) {
                this.isSubscribed = this.didSubscriptionSucceed();
            }
        });
    }
    async addOracleToAccountLoader(oracleToPoll) {
        const oracleClient = this.oracleClientCache.get(oracleToPoll.source, this.program.provider.connection, this.program);
        const oracleId = (0, oracleId_1.getOracleId)(oracleToPoll.publicKey, oracleToPoll.source);
        oracleToPoll.callbackId = await this.accountLoader.addAccount(oracleToPoll.publicKey, (buffer, slot)=>{
            if (!buffer) return;
            const oraclePriceData = oracleClient.getOraclePriceDataFromBuffer(buffer);
            const dataAndSlot = {
                data: oraclePriceData,
                slot
            };
            this.oracles.set(oracleId, dataAndSlot);
            this.eventEmitter.emit('oraclePriceUpdate', oracleToPoll.publicKey, oracleToPoll.source, oraclePriceData);
            this.eventEmitter.emit('update');
        });
    }
    async fetch() {
        await this.accountLoader.load();
        for (const [_, accountToPoll] of this.accountsToPoll){
            const bufferAndSlot = this.accountLoader.getBufferAndSlot(accountToPoll.publicKey);
            if (!bufferAndSlot) {
                continue;
            }
            const { buffer, slot } = bufferAndSlot;
            if (buffer) {
                const account = this.program.account[accountToPoll.key].coder.accounts.decodeUnchecked((0, utils_1.capitalize)(accountToPoll.key), buffer);
                if (accountToPoll.mapKey != undefined) {
                    this[accountToPoll.key].set(accountToPoll.mapKey, {
                        data: account,
                        slot
                    });
                } else {
                    this[accountToPoll.key] = {
                        data: account,
                        slot
                    };
                }
            }
        }
        for (const [_, oracleToPoll] of this.oraclesToPoll){
            const bufferAndSlot = this.accountLoader.getBufferAndSlot(oracleToPoll.publicKey);
            if (!bufferAndSlot) {
                continue;
            }
            const { buffer, slot } = bufferAndSlot;
            if (buffer) {
                const oracleClient = this.oracleClientCache.get(oracleToPoll.source, this.program.provider.connection, this.program);
                const oraclePriceData = oracleClient.getOraclePriceDataFromBuffer(buffer);
                this.oracles.set((0, oracleId_1.getOracleId)(oracleToPoll.publicKey, oracleToPoll.source), {
                    data: oraclePriceData,
                    slot
                });
            }
        }
    }
    didSubscriptionSucceed() {
        if (this.state) return true;
        return false;
    }
    async unsubscribe() {
        for (const [_, accountToPoll] of this.accountsToPoll){
            this.accountLoader.removeAccount(accountToPoll.publicKey, accountToPoll.callbackId);
        }
        for (const [_, oracleToPoll] of this.oraclesToPoll){
            this.accountLoader.removeAccount(oracleToPoll.publicKey, oracleToPoll.callbackId);
        }
        this.accountLoader.removeErrorCallbacks(this.errorCallbackId);
        this.errorCallbackId = undefined;
        this.accountsToPoll.clear();
        this.oraclesToPoll.clear();
        this.isSubscribed = false;
    }
    async addSpotMarket(marketIndex) {
        const marketPublicKey = await (0, pda_1.getSpotMarketPublicKey)(this.program.programId, marketIndex);
        if (this.accountsToPoll.has(marketPublicKey.toString())) {
            return true;
        }
        await this.addSpotMarketAccountToPoll(marketIndex);
        const accountToPoll = this.accountsToPoll.get(marketPublicKey.toString());
        await this.addAccountToAccountLoader(accountToPoll);
        this.setSpotOracleMap();
        return true;
    }
    async addPerpMarket(marketIndex) {
        const marketPublicKey = await (0, pda_1.getPerpMarketPublicKey)(this.program.programId, marketIndex);
        if (this.accountsToPoll.has(marketPublicKey.toString())) {
            return true;
        }
        await this.addPerpMarketAccountToPoll(marketIndex);
        const accountToPoll = this.accountsToPoll.get(marketPublicKey.toString());
        await this.addAccountToAccountLoader(accountToPoll);
        await this.setPerpOracleMap();
        return true;
    }
    async addOracle(oracleInfo) {
        const oracleId = (0, oracleId_1.getOracleId)(oracleInfo.publicKey, oracleInfo.source);
        if (oracleInfo.publicKey.equals(web3_js_1.PublicKey.default) || this.oracles.has(oracleId)) {
            return true;
        }
        // this func can be called multiple times before the first pauseForOracleToBeAdded finishes
        // avoid adding to oraclesToPoll multiple time
        if (!this.oraclesToPoll.has(oracleId)) {
            this.addOracleToPoll(oracleInfo);
            const oracleToPoll = this.oraclesToPoll.get(oracleId);
            await this.addOracleToAccountLoader(oracleToPoll);
        }
        await this.pauseForOracleToBeAdded(3, oracleInfo.publicKey.toBase58());
        return true;
    }
    async pauseForOracleToBeAdded(tries, oracle) {
        let i = 0;
        while(i < tries){
            await new Promise((r)=>setTimeout(r, this.accountLoader.pollingFrequency));
            if (this.accountLoader.bufferAndSlotMap.has(oracle)) {
                return;
            }
            i++;
        }
        console.log(`Pausing to find oracle ${oracle} failed`);
    }
    async setPerpOracleMap() {
        const perpMarkets = this.getMarketAccountsAndSlots();
        const oraclePromises = [];
        for (const perpMarket of perpMarkets){
            const perpMarketAccount = perpMarket.data;
            const perpMarketIndex = perpMarketAccount.marketIndex;
            const oracle = perpMarketAccount.amm.oracle;
            const oracleId = (0, oracleId_1.getOracleId)(oracle, perpMarketAccount.amm.oracleSource);
            if (!this.oracles.has(oracleId)) {
                oraclePromises.push(this.addOracle({
                    publicKey: oracle,
                    source: perpMarketAccount.amm.oracleSource
                }));
            }
            this.perpOracleMap.set(perpMarketIndex, oracle);
            this.perpOracleStringMap.set(perpMarketIndex, oracleId);
        }
        await Promise.all(oraclePromises);
    }
    async setSpotOracleMap() {
        const spotMarkets = this.getSpotMarketAccountsAndSlots();
        const oraclePromises = [];
        for (const spotMarket of spotMarkets){
            const spotMarketAccount = spotMarket.data;
            const spotMarketIndex = spotMarketAccount.marketIndex;
            const oracle = spotMarketAccount.oracle;
            const oracleId = (0, oracleId_1.getOracleId)(oracle, spotMarketAccount.oracleSource);
            if (!this.oracles.has(oracleId)) {
                oraclePromises.push(this.addOracle({
                    publicKey: oracle,
                    source: spotMarketAccount.oracleSource
                }));
            }
            this.spotOracleMap.set(spotMarketIndex, oracle);
            this.spotOracleStringMap.set(spotMarketIndex, oracleId);
        }
        await Promise.all(oraclePromises);
    }
    handleDelistedMarkets() {
        if (this.delistedMarketSetting === types_1.DelistedMarketSetting.Subscribe) {
            return;
        }
        const { perpMarketIndexes, oracles } = (0, utils_1.findDelistedPerpMarketsAndOracles)(this.getMarketAccountsAndSlots(), this.getSpotMarketAccountsAndSlots());
        for (const perpMarketIndex of perpMarketIndexes){
            const perpMarketPubkey = this.perpMarket.get(perpMarketIndex).data.pubkey;
            const callbackId = this.accountsToPoll.get(perpMarketPubkey.toBase58()).callbackId;
            this.accountLoader.removeAccount(perpMarketPubkey, callbackId);
            if (this.delistedMarketSetting === types_1.DelistedMarketSetting.Discard) {
                this.perpMarket.delete(perpMarketIndex);
            }
        }
        for (const oracle of oracles){
            const oracleId = (0, oracleId_1.getOracleId)(oracle.publicKey, oracle.source);
            const callbackId = this.oraclesToPoll.get(oracleId).callbackId;
            this.accountLoader.removeAccount(oracle.publicKey, callbackId);
            if (this.delistedMarketSetting === types_1.DelistedMarketSetting.Discard) {
                this.oracles.delete(oracleId);
            }
        }
    }
    assertIsSubscribed() {
        if (!this.isSubscribed) {
            throw new types_1.NotSubscribedError('You must call `subscribe` before using this function');
        }
    }
    getStateAccountAndSlot() {
        this.assertIsSubscribed();
        return this.state;
    }
    getMarketAccountAndSlot(marketIndex) {
        return this.perpMarket.get(marketIndex);
    }
    getMarketAccountsAndSlots() {
        return Array.from(this.perpMarket.values());
    }
    getSpotMarketAccountAndSlot(marketIndex) {
        return this.spotMarket.get(marketIndex);
    }
    getSpotMarketAccountsAndSlots() {
        return Array.from(this.spotMarket.values());
    }
    getOraclePriceDataAndSlot(oracleId) {
        this.assertIsSubscribed();
        if (oracleId === ORACLE_DEFAULT_ID) {
            return {
                data: quoteAssetOracleClient_1.QUOTE_ORACLE_PRICE_DATA,
                slot: 0
            };
        }
        return this.oracles.get(oracleId);
    }
    getOraclePriceDataAndSlotForPerpMarket(marketIndex) {
        const perpMarketAccount = this.getMarketAccountAndSlot(marketIndex);
        const oracle = this.perpOracleMap.get(marketIndex);
        const oracleId = this.perpOracleStringMap.get(marketIndex);
        if (!perpMarketAccount || !oracle) {
            return undefined;
        }
        if (!perpMarketAccount.data.amm.oracle.equals(oracle)) {
            // If the oracle has changed, we need to update the oracle map in background
            this.setPerpOracleMap();
        }
        return this.getOraclePriceDataAndSlot(oracleId);
    }
    getOraclePriceDataAndSlotForSpotMarket(marketIndex) {
        const spotMarketAccount = this.getSpotMarketAccountAndSlot(marketIndex);
        const oracle = this.spotOracleMap.get(marketIndex);
        const oracleId = this.spotOracleStringMap.get(marketIndex);
        if (!spotMarketAccount || !oracle) {
            return undefined;
        }
        if (!spotMarketAccount.data.oracle.equals(oracle)) {
            // If the oracle has changed, we need to update the oracle map in background
            this.setSpotOracleMap();
        }
        return this.getOraclePriceDataAndSlot(oracleId);
    }
    updateAccountLoaderPollingFrequency(pollingFrequency) {
        this.accountLoader.updatePollingFrequency(pollingFrequency);
    }
}
exports.PollingDriftClientAccountSubscriber = PollingDriftClientAccountSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/pollingOracleAccountSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PollingOracleAccountSubscriber = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/types.js [app-route] (ecmascript)");
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
class PollingOracleAccountSubscriber {
    constructor(publicKey, oracleClient, accountLoader){
        this.isSubscribed = false;
        this.publicKey = publicKey;
        this.oracleClient = oracleClient;
        this.accountLoader = accountLoader;
        this.eventEmitter = new events_1.EventEmitter();
    }
    async subscribe() {
        if (this.isSubscribed) {
            return true;
        }
        await this.addToAccountLoader();
        let subscriptionSucceeded = false;
        let retries = 0;
        while(!subscriptionSucceeded && retries < 5){
            await this.fetch();
            subscriptionSucceeded = this.didSubscriptionSucceed();
            retries++;
        }
        if (subscriptionSucceeded) {
            this.eventEmitter.emit('update');
        }
        this.isSubscribed = subscriptionSucceeded;
        return subscriptionSucceeded;
    }
    async addToAccountLoader() {
        if (this.callbackId) {
            return;
        }
        this.callbackId = await this.accountLoader.addAccount(this.publicKey, async (buffer, slot)=>{
            const oraclePriceData = await this.oracleClient.getOraclePriceDataFromBuffer(buffer);
            this.oraclePriceData = {
                data: oraclePriceData,
                slot
            };
            // @ts-ignore
            this.eventEmitter.emit('oracleUpdate', oraclePriceData);
            this.eventEmitter.emit('update');
        });
        this.errorCallbackId = this.accountLoader.addErrorCallbacks((error)=>{
            this.eventEmitter.emit('error', error);
        });
    }
    async fetch() {
        await this.accountLoader.load();
        const { buffer, slot } = this.accountLoader.getBufferAndSlot(this.publicKey);
        this.oraclePriceData = {
            data: await this.oracleClient.getOraclePriceDataFromBuffer(buffer),
            slot
        };
    }
    async unsubscribe() {
        if (!this.isSubscribed) {
            return;
        }
        this.accountLoader.removeAccount(this.publicKey, this.callbackId);
        this.callbackId = undefined;
        this.accountLoader.removeErrorCallbacks(this.errorCallbackId);
        this.errorCallbackId = undefined;
        this.isSubscribed = false;
    }
    assertIsSubscribed() {
        if (!this.isSubscribed) {
            throw new types_1.NotSubscribedError('You must call `subscribe` before using this function');
        }
    }
    getOraclePriceData() {
        this.assertIsSubscribed();
        return this.oraclePriceData;
    }
    didSubscriptionSucceed() {
        return !!this.oraclePriceData;
    }
}
exports.PollingOracleAccountSubscriber = PollingOracleAccountSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/pollingTokenAccountSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PollingTokenAccountSubscriber = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/types.js [app-route] (ecmascript)");
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
const token_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/token/index.js [app-route] (ecmascript)");
class PollingTokenAccountSubscriber {
    constructor(publicKey, accountLoader){
        this.isSubscribed = false;
        this.publicKey = publicKey;
        this.accountLoader = accountLoader;
        this.eventEmitter = new events_1.EventEmitter();
    }
    async subscribe() {
        if (this.isSubscribed) {
            return true;
        }
        await this.addToAccountLoader();
        let subscriptionSucceeded = false;
        let retries = 0;
        while(!subscriptionSucceeded && retries < 5){
            await this.fetch();
            subscriptionSucceeded = this.didSubscriptionSucceed();
            retries++;
        }
        if (subscriptionSucceeded) {
            this.eventEmitter.emit('update');
        }
        this.isSubscribed = subscriptionSucceeded;
        return subscriptionSucceeded;
    }
    async addToAccountLoader() {
        if (this.callbackId) {
            return;
        }
        this.callbackId = await this.accountLoader.addAccount(this.publicKey, (buffer, slot)=>{
            const tokenAccount = (0, token_1.parseTokenAccount)(buffer, this.publicKey);
            this.tokenAccountAndSlot = {
                data: tokenAccount,
                slot
            };
            // @ts-ignore
            this.eventEmitter.emit('tokenAccountUpdate', tokenAccount);
            this.eventEmitter.emit('update');
        });
        this.errorCallbackId = this.accountLoader.addErrorCallbacks((error)=>{
            this.eventEmitter.emit('error', error);
        });
    }
    async fetch() {
        await this.accountLoader.load();
        const { buffer, slot } = this.accountLoader.getBufferAndSlot(this.publicKey);
        this.tokenAccountAndSlot = {
            data: (0, token_1.parseTokenAccount)(buffer, this.publicKey),
            slot
        };
    }
    async unsubscribe() {
        if (!this.isSubscribed) {
            return;
        }
        this.accountLoader.removeAccount(this.publicKey, this.callbackId);
        this.callbackId = undefined;
        this.accountLoader.removeErrorCallbacks(this.errorCallbackId);
        this.errorCallbackId = undefined;
        this.isSubscribed = false;
    }
    assertIsSubscribed() {
        if (!this.isSubscribed) {
            throw new types_1.NotSubscribedError('You must call `subscribe` before using this function');
        }
    }
    getTokenAccountAndSlot() {
        this.assertIsSubscribed();
        return this.tokenAccountAndSlot;
    }
    didSubscriptionSucceed() {
        return !!this.tokenAccountAndSlot;
    }
}
exports.PollingTokenAccountSubscriber = PollingTokenAccountSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/pollingUserAccountSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PollingUserAccountSubscriber = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/types.js [app-route] (ecmascript)");
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
class PollingUserAccountSubscriber {
    constructor(connection, userAccountPublicKey, accountLoader, decode){
        this.isSubscribed = false;
        this.connection = connection;
        this.accountLoader = accountLoader;
        this.eventEmitter = new events_1.EventEmitter();
        this.userAccountPublicKey = userAccountPublicKey;
        this.decode = decode;
    }
    async subscribe(userAccount) {
        if (this.isSubscribed) {
            return true;
        }
        if (userAccount) {
            this.user = {
                data: userAccount,
                slot: undefined
            };
        }
        await this.addToAccountLoader();
        await this.fetchIfUnloaded();
        if (this.doesAccountExist()) {
            this.eventEmitter.emit('update');
        }
        this.isSubscribed = true;
        return true;
    }
    async addToAccountLoader() {
        if (this.callbackId) {
            return;
        }
        this.callbackId = await this.accountLoader.addAccount(this.userAccountPublicKey, (buffer, slot)=>{
            if (!buffer) {
                return;
            }
            if (this.user && this.user.slot > slot) {
                return;
            }
            const account = this.decode('User', buffer);
            this.user = {
                data: account,
                slot
            };
            this.eventEmitter.emit('userAccountUpdate', account);
            this.eventEmitter.emit('update');
        });
        this.errorCallbackId = this.accountLoader.addErrorCallbacks((error)=>{
            this.eventEmitter.emit('error', error);
        });
    }
    async fetchIfUnloaded() {
        if (this.user === undefined) {
            await this.fetch();
        }
    }
    async fetch() {
        var _a, _b;
        try {
            const dataAndContext = await this.connection.getAccountInfoAndContext(this.userAccountPublicKey, this.accountLoader.commitment);
            if (dataAndContext.context.slot > ((_b = (_a = this.user) === null || _a === void 0 ? void 0 : _a.slot) !== null && _b !== void 0 ? _b : 0)) {
                this.user = {
                    data: this.decode('User', dataAndContext.value.data),
                    slot: dataAndContext.context.slot
                };
            }
        } catch (e) {
            console.log(`PollingUserAccountSubscriber.fetch() UserAccount does not exist: ${e.message}-${e.stack}`);
        }
    }
    doesAccountExist() {
        return this.user !== undefined;
    }
    async unsubscribe() {
        if (!this.isSubscribed) {
            return;
        }
        this.accountLoader.removeAccount(this.userAccountPublicKey, this.callbackId);
        this.callbackId = undefined;
        this.accountLoader.removeErrorCallbacks(this.errorCallbackId);
        this.errorCallbackId = undefined;
        this.isSubscribed = false;
    }
    assertIsSubscribed() {
        if (!this.isSubscribed) {
            throw new types_1.NotSubscribedError('You must call `subscribe` before using this function');
        }
    }
    getUserAccountAndSlot() {
        if (!this.doesAccountExist()) {
            throw new types_1.NotSubscribedError('You must call `subscribe` or `fetch` before using this function');
        }
        return this.user;
    }
    updateData(userAccount, slot) {
        if (!this.user || this.user.slot < slot) {
            this.user = {
                data: userAccount,
                slot
            };
            this.eventEmitter.emit('userAccountUpdate', userAccount);
            this.eventEmitter.emit('update');
        }
    }
}
exports.PollingUserAccountSubscriber = PollingUserAccountSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/pollingUserStatsAccountSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PollingUserStatsAccountSubscriber = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/types.js [app-route] (ecmascript)");
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
class PollingUserStatsAccountSubscriber {
    constructor(program, userStatsAccountPublicKey, accountLoader){
        this.isSubscribed = false;
        this.program = program;
        this.accountLoader = accountLoader;
        this.eventEmitter = new events_1.EventEmitter();
        this.userStatsAccountPublicKey = userStatsAccountPublicKey;
    }
    async subscribe(userStatsAccount) {
        if (this.isSubscribed) {
            return true;
        }
        if (userStatsAccount) {
            this.userStats = {
                data: userStatsAccount,
                slot: undefined
            };
        }
        await this.addToAccountLoader();
        await this.fetchIfUnloaded();
        if (this.doesAccountExist()) {
            this.eventEmitter.emit('update');
        }
        this.isSubscribed = true;
        return true;
    }
    async addToAccountLoader() {
        if (this.callbackId !== undefined) {
            return;
        }
        this.callbackId = await this.accountLoader.addAccount(this.userStatsAccountPublicKey, (buffer, slot)=>{
            if (!buffer) {
                return;
            }
            if (this.userStats && this.userStats.slot > slot) {
                return;
            }
            const account = this.program.account.userStats.coder.accounts.decodeUnchecked('UserStats', buffer);
            this.userStats = {
                data: account,
                slot
            };
            this.eventEmitter.emit('userStatsAccountUpdate', account);
            this.eventEmitter.emit('update');
        });
        this.errorCallbackId = this.accountLoader.addErrorCallbacks((error)=>{
            this.eventEmitter.emit('error', error);
        });
    }
    async fetchIfUnloaded() {
        if (this.userStats === undefined) {
            await this.fetch();
        }
    }
    async fetch() {
        var _a, _b;
        try {
            const dataAndContext = await this.program.account.userStats.fetchAndContext(this.userStatsAccountPublicKey, this.accountLoader.commitment);
            if (dataAndContext.context.slot > ((_b = (_a = this.userStats) === null || _a === void 0 ? void 0 : _a.slot) !== null && _b !== void 0 ? _b : 0)) {
                this.userStats = {
                    data: dataAndContext.data,
                    slot: dataAndContext.context.slot
                };
            }
        } catch (e) {
            console.log(`PollingUserStatsAccountSubscriber.fetch() UserStatsAccount does not exist: ${e.message}`);
        }
    }
    doesAccountExist() {
        return this.userStats !== undefined;
    }
    async unsubscribe() {
        if (!this.isSubscribed) {
            return;
        }
        this.accountLoader.removeAccount(this.userStatsAccountPublicKey, this.callbackId);
        this.callbackId = undefined;
        this.accountLoader.removeErrorCallbacks(this.errorCallbackId);
        this.errorCallbackId = undefined;
        this.isSubscribed = false;
    }
    assertIsSubscribed() {
        if (!this.isSubscribed) {
            throw new types_1.NotSubscribedError('You must call `subscribe` before using this function');
        }
    }
    getUserStatsAccountAndSlot() {
        if (!this.doesAccountExist()) {
            throw new types_1.NotSubscribedError('You must call `subscribe` or `fetch` before using this function');
        }
        return this.userStats;
    }
}
exports.PollingUserStatsAccountSubscriber = PollingUserStatsAccountSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/pollingInsuranceFundStakeAccountSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PollingInsuranceFundStakeAccountSubscriber = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/types.js [app-route] (ecmascript)");
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
class PollingInsuranceFundStakeAccountSubscriber {
    constructor(program, publicKey, accountLoader){
        this.isSubscribed = false;
        this.program = program;
        this.insuranceFundStakeAccountPublicKey = publicKey;
        this.accountLoader = accountLoader;
        this.eventEmitter = new events_1.EventEmitter();
    }
    async subscribe(insuranceFundStake) {
        if (this.isSubscribed) {
            return true;
        }
        if (insuranceFundStake) {
            this.insuranceFundStakeAccountAndSlot = {
                data: insuranceFundStake,
                slot: undefined
            };
        }
        await this.addToAccountLoader();
        if (this.doesAccountExist()) {
            this.eventEmitter.emit('update');
        }
        this.isSubscribed = true;
        return true;
    }
    async addToAccountLoader() {
        if (this.callbackId) {
            return;
        }
        this.callbackId = await this.accountLoader.addAccount(this.insuranceFundStakeAccountPublicKey, (buffer, slot)=>{
            if (!buffer) {
                return;
            }
            if (this.insuranceFundStakeAccountAndSlot && this.insuranceFundStakeAccountAndSlot.slot > slot) {
                return;
            }
            const account = this.program.account.user.coder.accounts.decode('InsuranceFundStake', buffer);
            this.insuranceFundStakeAccountAndSlot = {
                data: account,
                slot
            };
            this.eventEmitter.emit('insuranceFundStakeAccountUpdate', account);
            this.eventEmitter.emit('update');
        });
        this.errorCallbackId = this.accountLoader.addErrorCallbacks((error)=>{
            this.eventEmitter.emit('error', error);
        });
    }
    async fetchIfUnloaded() {
        if (this.insuranceFundStakeAccountAndSlot === undefined) {
            await this.fetch();
        }
    }
    async fetch() {
        var _a, _b;
        try {
            const dataAndContext = await this.program.account.insuranceFundStake.fetchAndContext(this.insuranceFundStakeAccountPublicKey, this.accountLoader.commitment);
            if (dataAndContext.context.slot > ((_b = (_a = this.insuranceFundStakeAccountAndSlot) === null || _a === void 0 ? void 0 : _a.slot) !== null && _b !== void 0 ? _b : 0)) {
                this.insuranceFundStakeAccountAndSlot = {
                    data: dataAndContext.data,
                    slot: dataAndContext.context.slot
                };
            }
        } catch (e) {
            console.log(`PollingInsuranceFundStakeAccountSubscriber.fetch() InsuranceFundStake does not exist: ${e.message}`);
        }
    }
    doesAccountExist() {
        return this.insuranceFundStakeAccountAndSlot !== undefined;
    }
    async unsubscribe() {
        if (!this.isSubscribed) {
            return;
        }
        this.accountLoader.removeAccount(this.insuranceFundStakeAccountPublicKey, this.callbackId);
        this.callbackId = undefined;
        this.accountLoader.removeErrorCallbacks(this.errorCallbackId);
        this.errorCallbackId = undefined;
        this.isSubscribed = false;
    }
    assertIsSubscribed() {
        if (!this.isSubscribed) {
            throw new types_1.NotSubscribedError('You must call `subscribe` before using this function');
        }
    }
    getInsuranceFundStakeAccountAndSlot() {
        this.assertIsSubscribed();
        return this.insuranceFundStakeAccountAndSlot;
    }
    didSubscriptionSucceed() {
        return !!this.insuranceFundStakeAccountAndSlot;
    }
    updateData(insuranceFundStake, slot) {
        if (!this.insuranceFundStakeAccountAndSlot || this.insuranceFundStakeAccountAndSlot.slot < slot) {
            this.insuranceFundStakeAccountAndSlot = {
                data: insuranceFundStake,
                slot
            };
            this.eventEmitter.emit('insuranceFundStakeAccountUpdate', insuranceFundStake);
            this.eventEmitter.emit('update');
        }
    }
}
exports.PollingInsuranceFundStakeAccountSubscriber = PollingInsuranceFundStakeAccountSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/pollingHighLeverageModeConfigAccountSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PollingHighLeverageModeConfigAccountSubscriber = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/types.js [app-route] (ecmascript)");
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
class PollingHighLeverageModeConfigAccountSubscriber {
    constructor(program, publicKey, accountLoader){
        this.isSubscribed = false;
        this.program = program;
        this.highLeverageModeConfigAccountPublicKey = publicKey;
        this.accountLoader = accountLoader;
        this.eventEmitter = new events_1.EventEmitter();
    }
    async subscribe(highLeverageModeConfig) {
        if (this.isSubscribed) {
            return true;
        }
        if (highLeverageModeConfig) {
            this.highLeverageModeConfigAccountAndSlot = {
                data: highLeverageModeConfig,
                slot: undefined
            };
        }
        await this.addToAccountLoader();
        await this.fetchIfUnloaded();
        if (this.doesAccountExist()) {
            this.eventEmitter.emit('update');
        }
        this.isSubscribed = true;
        return true;
    }
    async addToAccountLoader() {
        if (this.callbackId) {
            return;
        }
        this.callbackId = await this.accountLoader.addAccount(this.highLeverageModeConfigAccountPublicKey, (buffer, slot)=>{
            if (!buffer) {
                return;
            }
            if (this.highLeverageModeConfigAccountAndSlot && this.highLeverageModeConfigAccountAndSlot.slot > slot) {
                return;
            }
            const account = this.program.account.user.coder.accounts.decode('HighLeverageModeConfig', buffer);
            this.highLeverageModeConfigAccountAndSlot = {
                data: account,
                slot
            };
            this.eventEmitter.emit('highLeverageModeConfigAccountUpdate', account);
            this.eventEmitter.emit('update');
        });
        this.errorCallbackId = this.accountLoader.addErrorCallbacks((error)=>{
            this.eventEmitter.emit('error', error);
        });
    }
    async fetchIfUnloaded() {
        if (this.highLeverageModeConfigAccountAndSlot === undefined) {
            await this.fetch();
        }
    }
    async fetch() {
        var _a, _b;
        try {
            const dataAndContext = await this.program.account.highLeverageModeConfig.fetchAndContext(this.highLeverageModeConfigAccountPublicKey, this.accountLoader.commitment);
            if (dataAndContext.context.slot > ((_b = (_a = this.highLeverageModeConfigAccountAndSlot) === null || _a === void 0 ? void 0 : _a.slot) !== null && _b !== void 0 ? _b : 0)) {
                this.highLeverageModeConfigAccountAndSlot = {
                    data: dataAndContext.data,
                    slot: dataAndContext.context.slot
                };
            }
        } catch (e) {
            console.log(`PollingHighLeverageModeConfigAccountSubscriber.fetch() HighLeverageModeConfig does not exist: ${e.message}`);
        }
    }
    doesAccountExist() {
        return this.highLeverageModeConfigAccountAndSlot !== undefined;
    }
    async unsubscribe() {
        if (!this.isSubscribed) {
            return;
        }
        this.accountLoader.removeAccount(this.highLeverageModeConfigAccountPublicKey, this.callbackId);
        this.callbackId = undefined;
        this.accountLoader.removeErrorCallbacks(this.errorCallbackId);
        this.errorCallbackId = undefined;
        this.isSubscribed = false;
    }
    assertIsSubscribed() {
        if (!this.isSubscribed) {
            throw new types_1.NotSubscribedError('You must call `subscribe` before using this function');
        }
    }
    getHighLeverageModeConfigAccountAndSlot() {
        this.assertIsSubscribed();
        return this.highLeverageModeConfigAccountAndSlot;
    }
    didSubscriptionSucceed() {
        return !!this.highLeverageModeConfigAccountAndSlot;
    }
    updateData(highLeverageModeConfig, slot) {
        if (!this.highLeverageModeConfigAccountAndSlot || this.highLeverageModeConfigAccountAndSlot.slot < slot) {
            this.highLeverageModeConfigAccountAndSlot = {
                data: highLeverageModeConfig,
                slot
            };
            this.eventEmitter.emit('highLeverageModeConfigAccountUpdate', highLeverageModeConfig);
            this.eventEmitter.emit('update');
        }
    }
}
exports.PollingHighLeverageModeConfigAccountSubscriber = PollingHighLeverageModeConfigAccountSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/basicUserAccountSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BasicUserAccountSubscriber = void 0;
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
/**
 * Basic implementation of UserAccountSubscriber. It will only take in UserAccount
 * data during initialization and will not fetch or subscribe to updates.
 */ class BasicUserAccountSubscriber {
    constructor(userAccountPublicKey, data, slot){
        this.isSubscribed = true;
        this.eventEmitter = new events_1.EventEmitter();
        this.userAccountPublicKey = userAccountPublicKey;
        this.user = {
            data,
            slot
        };
    }
    async subscribe(_userAccount) {
        return true;
    }
    async addToAccountLoader() {}
    async fetch() {}
    doesAccountExist() {
        return this.user !== undefined;
    }
    async unsubscribe() {}
    assertIsSubscribed() {}
    getUserAccountAndSlot() {
        return this.user;
    }
    updateData(userAccount, slot) {
        var _a;
        if (!this.user || slot >= ((_a = this.user.slot) !== null && _a !== void 0 ? _a : 0)) {
            this.user = {
                data: userAccount,
                slot
            };
            this.eventEmitter.emit('userAccountUpdate', userAccount);
            this.eventEmitter.emit('update');
        }
    }
}
exports.BasicUserAccountSubscriber = BasicUserAccountSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/oneShotUserAccountSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OneShotUserAccountSubscriber = void 0;
const basicUserAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/basicUserAccountSubscriber.js [app-route] (ecmascript)");
/**
 * Simple implementation of UserAccountSubscriber. It will fetch the UserAccount
 * date on subscribe (or call to fetch) if no account data is provided on init.
 * Expect to use only 1 RPC call unless you call fetch repeatedly.
 */ class OneShotUserAccountSubscriber extends basicUserAccountSubscriber_1.BasicUserAccountSubscriber {
    constructor(program, userAccountPublicKey, data, slot, commitment){
        super(userAccountPublicKey, data, slot);
        this.program = program;
        this.commitment = commitment !== null && commitment !== void 0 ? commitment : 'confirmed';
    }
    async subscribe(userAccount) {
        if (userAccount) {
            this.user = {
                data: userAccount,
                slot: this.user.slot
            };
            return true;
        }
        await this.fetchIfUnloaded();
        if (this.doesAccountExist()) {
            this.eventEmitter.emit('update');
        }
        return true;
    }
    async fetchIfUnloaded() {
        if (this.user.data === undefined) {
            await this.fetch();
        }
    }
    async fetch() {
        var _a, _b;
        try {
            const dataAndContext = await this.program.account.user.fetchAndContext(this.userAccountPublicKey, this.commitment);
            if (dataAndContext.context.slot > ((_b = (_a = this.user) === null || _a === void 0 ? void 0 : _a.slot) !== null && _b !== void 0 ? _b : 0)) {
                this.user = {
                    data: dataAndContext.data,
                    slot: dataAndContext.context.slot
                };
            }
        } catch (e) {
            console.error(`OneShotUserAccountSubscriber.fetch() UserAccount does not exist: ${e.message}`);
        }
    }
}
exports.OneShotUserAccountSubscriber = OneShotUserAccountSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/basicUserStatsAccountSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BasicUserStatsAccountSubscriber = void 0;
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
/**
 * Basic implementation of UserStatsAccountSubscriber. It will only take in UserStatsAccount
 * data during initialization and will not fetch or subscribe to updates.
 */ class BasicUserStatsAccountSubscriber {
    constructor(userStatsAccountPublicKey, data, slot){
        this.isSubscribed = true;
        this.eventEmitter = new events_1.EventEmitter();
        this.userStatsAccountPublicKey = userStatsAccountPublicKey;
        this.userStats = {
            data,
            slot
        };
    }
    async subscribe(_userStatsAccount) {
        return true;
    }
    async addToAccountLoader() {}
    async fetch() {}
    doesAccountExist() {
        return this.userStats !== undefined;
    }
    async unsubscribe() {}
    assertIsSubscribed() {}
    getUserStatsAccountAndSlot() {
        return this.userStats;
    }
    updateData(userStatsAccount, slot) {
        var _a;
        if (!this.userStats || slot >= ((_a = this.userStats.slot) !== null && _a !== void 0 ? _a : 0)) {
            this.userStats = {
                data: userStatsAccount,
                slot
            };
            this.eventEmitter.emit('userStatsAccountUpdate', userStatsAccount);
            this.eventEmitter.emit('update');
        }
    }
}
exports.BasicUserStatsAccountSubscriber = BasicUserStatsAccountSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/oneShotUserStatsAccountSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OneShotUserStatsAccountSubscriber = void 0;
const basicUserStatsAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/basicUserStatsAccountSubscriber.js [app-route] (ecmascript)");
/**
 * Simple implementation of UserStatsAccountSubscriber. It will fetch the UserStatsAccount
 * data on subscribe (or call to fetch) if no account data is provided on init.
 * Expect to use only 1 RPC call unless you call fetch repeatedly.
 */ class OneShotUserStatsAccountSubscriber extends basicUserStatsAccountSubscriber_1.BasicUserStatsAccountSubscriber {
    constructor(program, userStatsAccountPublicKey, data, slot, commitment){
        super(userStatsAccountPublicKey, data, slot);
        this.program = program;
        this.commitment = commitment !== null && commitment !== void 0 ? commitment : 'confirmed';
    }
    async subscribe(userStatsAccount) {
        if (userStatsAccount) {
            this.userStats = {
                data: userStatsAccount,
                slot: this.userStats.slot
            };
            return true;
        }
        await this.fetchIfUnloaded();
        if (this.doesAccountExist()) {
            this.eventEmitter.emit('update');
        }
        return true;
    }
    async fetchIfUnloaded() {
        if (this.userStats.data === undefined) {
            await this.fetch();
        }
    }
    async fetch() {
        var _a, _b;
        try {
            const dataAndContext = await this.program.account.userStats.fetchAndContext(this.userStatsAccountPublicKey, this.commitment);
            if (dataAndContext.context.slot > ((_b = (_a = this.userStats) === null || _a === void 0 ? void 0 : _a.slot) !== null && _b !== void 0 ? _b : 0)) {
                this.userStats = {
                    data: dataAndContext.data,
                    slot: dataAndContext.context.slot
                };
            }
        } catch (e) {
            console.error(`OneShotUserStatsAccountSubscriber.fetch() UserStatsAccount does not exist: ${e.message}`);
        }
    }
}
exports.OneShotUserStatsAccountSubscriber = OneShotUserStatsAccountSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketUserAccountSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WebSocketUserAccountSubscriber = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/types.js [app-route] (ecmascript)");
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
const webSocketAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketAccountSubscriber.js [app-route] (ecmascript)");
class WebSocketUserAccountSubscriber {
    constructor(program, userAccountPublicKey, resubOpts, commitment){
        this.isSubscribed = false;
        this.program = program;
        this.resubOpts = resubOpts;
        this.userAccountPublicKey = userAccountPublicKey;
        this.eventEmitter = new events_1.EventEmitter();
        this.commitment = commitment;
    }
    async subscribe(userAccount) {
        if (this.isSubscribed) {
            return true;
        }
        this.userDataAccountSubscriber = new webSocketAccountSubscriber_1.WebSocketAccountSubscriber('user', this.program, this.userAccountPublicKey, undefined, this.resubOpts, this.commitment);
        if (userAccount) {
            this.userDataAccountSubscriber.setData(userAccount);
        }
        await this.userDataAccountSubscriber.subscribe((data)=>{
            this.eventEmitter.emit('userAccountUpdate', data);
            this.eventEmitter.emit('update');
        });
        this.eventEmitter.emit('update');
        this.isSubscribed = true;
        return true;
    }
    async fetch() {
        await Promise.all([
            this.userDataAccountSubscriber.fetch()
        ]);
    }
    async unsubscribe() {
        if (!this.isSubscribed) {
            return;
        }
        await Promise.all([
            this.userDataAccountSubscriber.unsubscribe()
        ]);
        this.isSubscribed = false;
    }
    assertIsSubscribed() {
        if (!this.isSubscribed) {
            throw new types_1.NotSubscribedError('You must call `subscribe` before using this function');
        }
    }
    getUserAccountAndSlot() {
        this.assertIsSubscribed();
        return this.userDataAccountSubscriber.dataAndSlot;
    }
    updateData(userAccount, slot) {
        var _a;
        const currentDataSlot = ((_a = this.userDataAccountSubscriber.dataAndSlot) === null || _a === void 0 ? void 0 : _a.slot) || 0;
        if (currentDataSlot <= slot) {
            this.userDataAccountSubscriber.setData(userAccount, slot);
            this.eventEmitter.emit('userAccountUpdate', userAccount);
            this.eventEmitter.emit('update');
        }
    }
}
exports.WebSocketUserAccountSubscriber = WebSocketUserAccountSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/grpcAccountSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
exports.grpcAccountSubscriber = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const Buffer = __importStar(__turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)"));
const webSocketAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketAccountSubscriber.js [app-route] (ecmascript)");
const grpc_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/isomorphic/grpc.js [app-route] (ecmascript)");
class grpcAccountSubscriber extends webSocketAccountSubscriber_1.WebSocketAccountSubscriber {
    constructor(client, commitmentLevel, accountName, program, accountPublicKey, decodeBuffer, resubOpts){
        super(accountName, program, accountPublicKey, decodeBuffer, resubOpts);
        this.client = client;
        this.commitmentLevel = commitmentLevel;
    }
    static async create(grpcConfigs, accountName, program, accountPublicKey, decodeBuffer, resubOpts, clientProp) {
        var _a, _b;
        const client = clientProp ? clientProp : await (0, grpc_1.createClient)(grpcConfigs.endpoint, grpcConfigs.token, (_a = grpcConfigs.channelOptions) !== null && _a !== void 0 ? _a : {});
        const commitmentLevel = // @ts-ignore :: isomorphic exported enum fails typescript but will work at runtime
        (_b = grpcConfigs.commitmentLevel) !== null && _b !== void 0 ? _b : grpc_1.CommitmentLevel.CONFIRMED;
        return new grpcAccountSubscriber(client, commitmentLevel, accountName, program, accountPublicKey, decodeBuffer, resubOpts);
    }
    async subscribe(onChange) {
        if (this.listenerId != null || this.isUnsubscribing) {
            return;
        }
        this.onChange = onChange;
        if (!this.dataAndSlot) {
            await this.fetch();
        }
        // Subscribe with grpc
        this.stream = await this.client.subscribe();
        const request = {
            slots: {},
            accounts: {
                account: {
                    account: [
                        this.accountPublicKey.toString()
                    ],
                    owner: [],
                    filters: []
                }
            },
            transactions: {},
            blocks: {},
            blocksMeta: {},
            accountsDataSlice: [],
            commitment: this.commitmentLevel,
            entry: {},
            transactionsStatus: {}
        };
        this.stream.on('data', (chunk)=>{
            var _a;
            if (!chunk.account) {
                return;
            }
            const slot = Number(chunk.account.slot);
            const accountInfo = {
                owner: new web3_js_1.PublicKey(chunk.account.account.owner),
                lamports: Number(chunk.account.account.lamports),
                data: Buffer.Buffer.from(chunk.account.account.data),
                executable: chunk.account.account.executable,
                rentEpoch: Number(chunk.account.account.rentEpoch)
            };
            if ((_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.resubTimeoutMs) {
                this.receivingData = true;
                clearTimeout(this.timeoutId);
                this.handleRpcResponse({
                    slot
                }, accountInfo);
                this.setTimeout();
            } else {
                this.handleRpcResponse({
                    slot
                }, accountInfo);
            }
        });
        return new Promise((resolve, reject)=>{
            this.stream.write(request, (err)=>{
                var _a;
                if (err === null || err === undefined) {
                    this.listenerId = 1;
                    if ((_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.resubTimeoutMs) {
                        this.receivingData = true;
                        this.setTimeout();
                    }
                    resolve();
                } else {
                    reject(err);
                }
            });
        }).catch((reason)=>{
            console.error(reason);
            throw reason;
        });
    }
    async unsubscribe(onResub = false) {
        if (!onResub && this.resubOpts) {
            this.resubOpts.resubTimeoutMs = undefined;
        }
        this.isUnsubscribing = true;
        clearTimeout(this.timeoutId);
        this.timeoutId = undefined;
        if (this.listenerId != null) {
            const promise = new Promise((resolve, reject)=>{
                const request = {
                    slots: {},
                    accounts: {},
                    transactions: {},
                    blocks: {},
                    blocksMeta: {},
                    accountsDataSlice: [],
                    entry: {},
                    transactionsStatus: {}
                };
                this.stream.write(request, (err)=>{
                    if (err === null || err === undefined) {
                        this.listenerId = undefined;
                        this.isUnsubscribing = false;
                        resolve();
                    } else {
                        reject(err);
                    }
                });
            }).catch((reason)=>{
                console.error(reason);
                throw reason;
            });
            return promise;
        } else {
            this.isUnsubscribing = false;
        }
    }
}
exports.grpcAccountSubscriber = grpcAccountSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/grpcUserAccountSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.grpcUserAccountSubscriber = void 0;
const webSocketUserAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketUserAccountSubscriber.js [app-route] (ecmascript)");
const grpcAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/grpcAccountSubscriber.js [app-route] (ecmascript)");
class grpcUserAccountSubscriber extends webSocketUserAccountSubscriber_1.WebSocketUserAccountSubscriber {
    constructor(grpcConfigs, program, userAccountPublicKey, resubOpts){
        super(program, userAccountPublicKey, resubOpts);
        this.grpcConfigs = grpcConfigs;
    }
    async subscribe(userAccount) {
        if (this.isSubscribed) {
            return true;
        }
        this.userDataAccountSubscriber = await grpcAccountSubscriber_1.grpcAccountSubscriber.create(this.grpcConfigs, 'user', this.program, this.userAccountPublicKey, undefined, this.resubOpts);
        if (userAccount) {
            this.userDataAccountSubscriber.setData(userAccount);
        }
        await this.userDataAccountSubscriber.subscribe((data)=>{
            this.eventEmitter.emit('userAccountUpdate', data);
            this.eventEmitter.emit('update');
        });
        this.eventEmitter.emit('update');
        this.isSubscribed = true;
        return true;
    }
}
exports.grpcUserAccountSubscriber = grpcUserAccountSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketUserStatsAccountSubsriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WebSocketUserStatsAccountSubscriber = void 0;
const types_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/types.js [app-route] (ecmascript)");
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
const webSocketAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketAccountSubscriber.js [app-route] (ecmascript)");
class WebSocketUserStatsAccountSubscriber {
    constructor(program, userStatsAccountPublicKey, resubOpts, commitment){
        this.isSubscribed = false;
        this.program = program;
        this.userStatsAccountPublicKey = userStatsAccountPublicKey;
        this.eventEmitter = new events_1.EventEmitter();
        this.resubOpts = resubOpts;
        this.commitment = commitment;
    }
    async subscribe(userStatsAccount) {
        if (this.isSubscribed) {
            return true;
        }
        this.userStatsAccountSubscriber = new webSocketAccountSubscriber_1.WebSocketAccountSubscriber('userStats', this.program, this.userStatsAccountPublicKey, undefined, this.resubOpts, this.commitment);
        if (userStatsAccount) {
            this.userStatsAccountSubscriber.setData(userStatsAccount);
        }
        await this.userStatsAccountSubscriber.subscribe((data)=>{
            this.eventEmitter.emit('userStatsAccountUpdate', data);
            this.eventEmitter.emit('update');
        });
        this.eventEmitter.emit('update');
        this.isSubscribed = true;
        return true;
    }
    async fetch() {
        await Promise.all([
            this.userStatsAccountSubscriber.fetch()
        ]);
    }
    async unsubscribe() {
        if (!this.isSubscribed) {
            return;
        }
        await Promise.all([
            this.userStatsAccountSubscriber.unsubscribe()
        ]);
        this.isSubscribed = false;
    }
    assertIsSubscribed() {
        if (!this.isSubscribed) {
            throw new types_1.NotSubscribedError('You must call `subscribe` before using this function');
        }
    }
    getUserStatsAccountAndSlot() {
        this.assertIsSubscribed();
        return this.userStatsAccountSubscriber.dataAndSlot;
    }
}
exports.WebSocketUserStatsAccountSubscriber = WebSocketUserStatsAccountSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/grpcUserStatsAccountSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.grpcUserStatsAccountSubscriber = void 0;
const webSocketUserStatsAccountSubsriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketUserStatsAccountSubsriber.js [app-route] (ecmascript)");
const grpcAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/grpcAccountSubscriber.js [app-route] (ecmascript)");
class grpcUserStatsAccountSubscriber extends webSocketUserStatsAccountSubsriber_1.WebSocketUserStatsAccountSubscriber {
    constructor(grpcConfigs, program, userStatsAccountPublicKey, resubOpts){
        super(program, userStatsAccountPublicKey, resubOpts);
        this.grpcConfigs = grpcConfigs;
    }
    async subscribe(userStatsAccount) {
        if (this.isSubscribed) {
            return true;
        }
        this.userStatsAccountSubscriber = await grpcAccountSubscriber_1.grpcAccountSubscriber.create(this.grpcConfigs, 'userStats', this.program, this.userStatsAccountPublicKey, undefined, this.resubOpts);
        if (userStatsAccount) {
            this.userStatsAccountSubscriber.setData(userStatsAccount);
        }
        await this.userStatsAccountSubscriber.subscribe((data)=>{
            this.eventEmitter.emit('userStatsAccountUpdate', data);
            this.eventEmitter.emit('update');
        });
        this.eventEmitter.emit('update');
        this.isSubscribed = true;
        return true;
    }
}
exports.grpcUserStatsAccountSubscriber = grpcUserStatsAccountSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/grpcDriftClientAccountSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.grpcDriftClientAccountSubscriber = void 0;
const webSocketDriftClientAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketDriftClientAccountSubscriber.js [app-route] (ecmascript)");
const config_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/config.js [app-route] (ecmascript)");
const pda_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/addresses/pda.js [app-route] (ecmascript)");
const grpcAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/grpcAccountSubscriber.js [app-route] (ecmascript)");
const oracleId_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/oracles/oracleId.js [app-route] (ecmascript)");
class grpcDriftClientAccountSubscriber extends webSocketDriftClientAccountSubscriber_1.WebSocketDriftClientAccountSubscriber {
    constructor(grpcConfigs, program, perpMarketIndexes, spotMarketIndexes, oracleInfos, shouldFindAllMarketsAndOracles, delistedMarketSetting, resubOpts){
        super(program, perpMarketIndexes, spotMarketIndexes, oracleInfos, shouldFindAllMarketsAndOracles, delistedMarketSetting, resubOpts);
        this.grpcConfigs = grpcConfigs;
    }
    async subscribe() {
        if (this.isSubscribed) {
            return true;
        }
        if (this.isSubscribing) {
            return await this.subscriptionPromise;
        }
        this.isSubscribing = true;
        this.subscriptionPromise = new Promise((res)=>{
            this.subscriptionPromiseResolver = res;
        });
        if (this.shouldFindAllMarketsAndOracles) {
            const { perpMarketIndexes, perpMarketAccounts, spotMarketIndexes, spotMarketAccounts, oracleInfos } = await (0, config_1.findAllMarketAndOracles)(this.program);
            this.perpMarketIndexes = perpMarketIndexes;
            this.spotMarketIndexes = spotMarketIndexes;
            this.oracleInfos = oracleInfos;
            // front run and set the initial data here to save extra gma call in set initial data
            this.initialPerpMarketAccountData = new Map(perpMarketAccounts.map((market)=>[
                    market.marketIndex,
                    market
                ]));
            this.initialSpotMarketAccountData = new Map(spotMarketAccounts.map((market)=>[
                    market.marketIndex,
                    market
                ]));
        }
        const statePublicKey = await (0, pda_1.getDriftStateAccountPublicKey)(this.program.programId);
        // create and activate main state account subscription
        this.stateAccountSubscriber = await grpcAccountSubscriber_1.grpcAccountSubscriber.create(this.grpcConfigs, 'state', this.program, statePublicKey, undefined, undefined);
        await this.stateAccountSubscriber.subscribe((data)=>{
            this.eventEmitter.emit('stateAccountUpdate', data);
            this.eventEmitter.emit('update');
        });
        // set initial data to avoid spamming getAccountInfo calls in webSocketAccountSubscriber
        await this.setInitialData();
        await Promise.all([
            // subscribe to market accounts
            this.subscribeToPerpMarketAccounts(),
            // subscribe to spot market accounts
            this.subscribeToSpotMarketAccounts(),
            // subscribe to oracles
            this.subscribeToOracles()
        ]);
        this.eventEmitter.emit('update');
        await this.handleDelistedMarkets();
        await Promise.all([
            this.setPerpOracleMap(),
            this.setSpotOracleMap()
        ]);
        this.subscriptionPromiseResolver(true);
        this.isSubscribing = false;
        this.isSubscribed = true;
        // delete initial data
        this.removeInitialData();
        return true;
    }
    async subscribeToSpotMarketAccount(marketIndex) {
        const marketPublicKey = await (0, pda_1.getSpotMarketPublicKey)(this.program.programId, marketIndex);
        const accountSubscriber = await grpcAccountSubscriber_1.grpcAccountSubscriber.create(this.grpcConfigs, 'spotMarket', this.program, marketPublicKey, undefined, this.resubOpts);
        accountSubscriber.setData(this.initialSpotMarketAccountData.get(marketIndex));
        await accountSubscriber.subscribe((data)=>{
            this.eventEmitter.emit('spotMarketAccountUpdate', data);
            this.eventEmitter.emit('update');
        });
        this.spotMarketAccountSubscribers.set(marketIndex, accountSubscriber);
        return true;
    }
    async subscribeToPerpMarketAccount(marketIndex) {
        const perpMarketPublicKey = await (0, pda_1.getPerpMarketPublicKey)(this.program.programId, marketIndex);
        const accountSubscriber = await grpcAccountSubscriber_1.grpcAccountSubscriber.create(this.grpcConfigs, 'perpMarket', this.program, perpMarketPublicKey, undefined, this.resubOpts);
        accountSubscriber.setData(this.initialPerpMarketAccountData.get(marketIndex));
        await accountSubscriber.subscribe((data)=>{
            this.eventEmitter.emit('perpMarketAccountUpdate', data);
            this.eventEmitter.emit('update');
        });
        this.perpMarketAccountSubscribers.set(marketIndex, accountSubscriber);
        return true;
    }
    async subscribeToOracle(oracleInfo) {
        const oracleId = (0, oracleId_1.getOracleId)(oracleInfo.publicKey, oracleInfo.source);
        const client = this.oracleClientCache.get(oracleInfo.source, this.program.provider.connection, this.program);
        const accountSubscriber = await grpcAccountSubscriber_1.grpcAccountSubscriber.create(this.grpcConfigs, 'oracle', this.program, oracleInfo.publicKey, (buffer)=>{
            return client.getOraclePriceDataFromBuffer(buffer);
        }, this.resubOpts);
        accountSubscriber.setData(this.initialOraclePriceData.get(oracleId));
        await accountSubscriber.subscribe((data)=>{
            this.eventEmitter.emit('oraclePriceUpdate', oracleInfo.publicKey, oracleInfo.source, data);
            this.eventEmitter.emit('update');
        });
        this.oracleSubscribers.set(oracleId, accountSubscriber);
        return true;
    }
}
exports.grpcDriftClientAccountSubscriber = grpcDriftClientAccountSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/grpcProgramAccountSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
exports.grpcProgramAccountSubscriber = void 0;
const bs58_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/bs58@4.0.1/node_modules/bs58/index.js [app-route] (ecmascript)"));
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const Buffer = __importStar(__turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)"));
const webSocketProgramAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketProgramAccountSubscriber.js [app-route] (ecmascript)");
const grpc_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/isomorphic/grpc.js [app-route] (ecmascript)");
class grpcProgramAccountSubscriber extends webSocketProgramAccountSubscriber_1.WebSocketProgramAccountSubscriber {
    constructor(client, commitmentLevel, subscriptionName, accountDiscriminator, program, decodeBufferFn, options = {
        filters: []
    }, resubOpts){
        super(subscriptionName, accountDiscriminator, program, decodeBufferFn, options, resubOpts);
        this.client = client;
        this.commitmentLevel = commitmentLevel;
    }
    static async create(grpcConfigs, subscriptionName, accountDiscriminator, program, decodeBufferFn, options = {
        filters: []
    }, resubOpts) {
        var _a, _b;
        const client = await (0, grpc_1.createClient)(grpcConfigs.endpoint, grpcConfigs.token, (_a = grpcConfigs.channelOptions) !== null && _a !== void 0 ? _a : {});
        const commitmentLevel = // @ts-ignore :: isomorphic exported enum fails typescript but will work at runtime
        (_b = grpcConfigs.commitmentLevel) !== null && _b !== void 0 ? _b : grpc_1.CommitmentLevel.CONFIRMED;
        return new grpcProgramAccountSubscriber(client, commitmentLevel, subscriptionName, accountDiscriminator, program, decodeBufferFn, options, resubOpts);
    }
    async subscribe(onChange) {
        if (this.listenerId != null || this.isUnsubscribing) {
            return;
        }
        this.onChange = onChange;
        // Subscribe with grpc
        this.stream = await this.client.subscribe();
        const filters = this.options.filters.map((filter)=>{
            return {
                memcmp: {
                    offset: filter.memcmp.offset.toString(),
                    bytes: bs58_1.default.decode(filter.memcmp.bytes)
                }
            };
        });
        const request = {
            slots: {},
            accounts: {
                drift: {
                    account: [],
                    owner: [
                        this.program.programId.toBase58()
                    ],
                    filters
                }
            },
            transactions: {},
            blocks: {},
            blocksMeta: {},
            accountsDataSlice: [],
            commitment: this.commitmentLevel,
            entry: {},
            transactionsStatus: {}
        };
        this.stream.on('data', (chunk)=>{
            var _a;
            if (!chunk.account) {
                return;
            }
            const slot = Number(chunk.account.slot);
            const accountInfo = {
                owner: new web3_js_1.PublicKey(chunk.account.account.owner),
                lamports: Number(chunk.account.account.lamports),
                data: Buffer.Buffer.from(chunk.account.account.data),
                executable: chunk.account.account.executable,
                rentEpoch: Number(chunk.account.account.rentEpoch)
            };
            if ((_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.resubTimeoutMs) {
                this.receivingData = true;
                clearTimeout(this.timeoutId);
                this.handleRpcResponse({
                    slot
                }, {
                    accountId: new web3_js_1.PublicKey(chunk.account.account.pubkey),
                    accountInfo
                });
                this.setTimeout();
            } else {
                this.handleRpcResponse({
                    slot
                }, {
                    accountId: new web3_js_1.PublicKey(chunk.account.account.pubkey),
                    accountInfo
                });
            }
        });
        return new Promise((resolve, reject)=>{
            this.stream.write(request, (err)=>{
                var _a;
                if (err === null || err === undefined) {
                    this.listenerId = 1;
                    if ((_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.resubTimeoutMs) {
                        this.receivingData = true;
                        this.setTimeout();
                    }
                    resolve();
                } else {
                    reject(err);
                }
            });
        }).catch((reason)=>{
            console.error(reason);
            throw reason;
        });
    }
    async unsubscribe(onResub = false) {
        if (!onResub && this.resubOpts) {
            this.resubOpts.resubTimeoutMs = undefined;
        }
        this.isUnsubscribing = true;
        clearTimeout(this.timeoutId);
        this.timeoutId = undefined;
        if (this.listenerId != null) {
            const promise = new Promise((resolve, reject)=>{
                const request = {
                    slots: {},
                    accounts: {},
                    transactions: {},
                    blocks: {},
                    blocksMeta: {},
                    accountsDataSlice: [],
                    entry: {},
                    transactionsStatus: {}
                };
                this.stream.write(request, (err)=>{
                    if (err === null || err === undefined) {
                        this.listenerId = undefined;
                        this.isUnsubscribing = false;
                        resolve();
                    } else {
                        reject(err);
                    }
                });
            }).catch((reason)=>{
                console.error(reason);
                throw reason;
            });
            return promise;
        } else {
            this.isUnsubscribing = false;
        }
    }
}
exports.grpcProgramAccountSubscriber = grpcProgramAccountSubscriber;
}),
"[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/laserProgramAccountSubscriber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
exports.LaserstreamProgramAccountSubscriber = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const Buffer = __importStar(__turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)"));
const webSocketProgramAccountSubscriber_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/accounts/webSocketProgramAccountSubscriber.js [app-route] (ecmascript)");
const grpc_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@drift-labs+sdk@2.149.0-beta.0_@solana+sysvars@2.3.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3_ws@8.18.3/node_modules/@drift-labs/sdk/lib/browser/isomorphic/grpc.js [app-route] (ecmascript)");
class LaserstreamProgramAccountSubscriber extends webSocketProgramAccountSubscriber_1.WebSocketProgramAccountSubscriber {
    constructor(laserConfig, commitmentLevel, subscriptionName, accountDiscriminator, program, decodeBufferFn, options = {
        filters: []
    }, resubOpts){
        super(subscriptionName, accountDiscriminator, program, decodeBufferFn, options, resubOpts);
        this.laserConfig = laserConfig;
        this.commitmentLevel = this.toLaserCommitment(commitmentLevel);
    }
    static async create(grpcConfigs, subscriptionName, accountDiscriminator, program, decodeBufferFn, options = {
        filters: []
    }, resubOpts) {
        var _a;
        const laserConfig = {
            apiKey: grpcConfigs.token,
            endpoint: grpcConfigs.endpoint,
            maxReconnectAttempts: grpcConfigs.enableReconnect ? 10 : 0,
            channelOptions: {
                'grpc.default_compression_algorithm': grpc_1.CompressionAlgorithms.zstd,
                'grpc.max_receive_message_length': 1000000000
            }
        };
        const commitmentLevel = (_a = grpcConfigs.commitmentLevel) !== null && _a !== void 0 ? _a : grpc_1.CommitmentLevel.CONFIRMED;
        return new LaserstreamProgramAccountSubscriber(laserConfig, commitmentLevel, subscriptionName, accountDiscriminator, program, decodeBufferFn, options, resubOpts);
    }
    async subscribe(onChange) {
        var _a;
        if (this.listenerId != null || this.isUnsubscribing) return;
        this.onChange = onChange;
        const filters = this.options.filters.map((filter)=>{
            return {
                memcmp: {
                    offset: filter.memcmp.offset,
                    base58: filter.memcmp.bytes
                }
            };
        });
        const request = {
            slots: {},
            accounts: {
                drift: {
                    account: [],
                    owner: [
                        this.program.programId.toBase58()
                    ],
                    filters
                }
            },
            transactions: {},
            blocks: {},
            blocksMeta: {},
            accountsDataSlice: [],
            commitment: this.commitmentLevel,
            entry: {},
            transactionsStatus: {}
        };
        try {
            const stream = await (0, grpc_1.LaserSubscribe)(this.laserConfig, request, async (update)=>{
                var _a;
                if (update.account) {
                    const slot = Number(update.account.slot);
                    const acc = update.account.account;
                    const accountInfo = {
                        owner: new web3_js_1.PublicKey(acc.owner),
                        lamports: Number(acc.lamports),
                        data: Buffer.Buffer.from(acc.data),
                        executable: acc.executable,
                        rentEpoch: Number(acc.rentEpoch)
                    };
                    const payload = {
                        accountId: new web3_js_1.PublicKey(acc.pubkey),
                        accountInfo
                    };
                    if ((_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.resubTimeoutMs) {
                        this.receivingData = true;
                        clearTimeout(this.timeoutId);
                        this.handleRpcResponse({
                            slot
                        }, payload);
                        this.setTimeout();
                    } else {
                        this.handleRpcResponse({
                            slot
                        }, payload);
                    }
                }
            }, async (error)=>{
                console.error('LaserStream client error:', error);
                throw error;
            });
            this.stream = stream;
            this.listenerId = 1;
            if ((_a = this.resubOpts) === null || _a === void 0 ? void 0 : _a.resubTimeoutMs) {
                this.receivingData = true;
                this.setTimeout();
            }
        } catch (err) {
            console.error('Failed to start LaserStream client:', err);
            throw err;
        }
    }
    async unsubscribe(onResub = false) {
        if (!onResub && this.resubOpts) {
            this.resubOpts.resubTimeoutMs = undefined;
        }
        this.isUnsubscribing = true;
        clearTimeout(this.timeoutId);
        this.timeoutId = undefined;
        if (this.listenerId != null && this.stream) {
            try {
                this.stream.cancel();
            } finally{
                this.listenerId = undefined;
                this.isUnsubscribing = false;
            }
        } else {
            this.isUnsubscribing = false;
        }
    }
    toLaserCommitment(level) {
        var _a, _b;
        if (typeof level === 'string') {
            return (_a = grpc_1.LaserCommitmentLevel[level.toUpperCase()]) !== null && _a !== void 0 ? _a : grpc_1.LaserCommitmentLevel.CONFIRMED;
        }
        return (_b = level) !== null && _b !== void 0 ? _b : grpc_1.LaserCommitmentLevel.CONFIRMED;
    }
}
exports.LaserstreamProgramAccountSubscriber = LaserstreamProgramAccountSubscriber;
}),
];

//# sourceMappingURL=df7f8_%40drift-labs_sdk_lib_browser_accounts_06d410c3._.js.map