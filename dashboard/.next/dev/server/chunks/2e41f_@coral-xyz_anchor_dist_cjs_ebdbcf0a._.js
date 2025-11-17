module.exports = [
"[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.30.1_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/cjs/utils/common.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isVersionedTransaction = exports.chunks = exports.isBrowser = void 0;
/**
 * Returns true if being run inside a web browser,
 * false if in a Node process or electron app.
 */ exports.isBrowser = process.env.ANCHOR_BROWSER || ("TURBOPACK compile-time value", "undefined") !== "undefined" && !((_a = window.process) === null || _a === void 0 ? void 0 : _a.hasOwnProperty("type"));
/**
 * Splits an array into chunks
 *
 * @param array Array of objects to chunk.
 * @param size The max size of a chunk.
 * @returns A two dimensional array where each T[] length is < the provided size.
 */ function chunks(array, size) {
    return Array.apply(0, new Array(Math.ceil(array.length / size))).map((_, index)=>array.slice(index * size, (index + 1) * size));
}
exports.chunks = chunks;
/**
 * Check if a transaction object is a VersionedTransaction or not
 *
 * @param tx
 * @returns bool
 */ const isVersionedTransaction = (tx)=>{
    return "version" in tx;
};
exports.isVersionedTransaction = isVersionedTransaction; //# sourceMappingURL=common.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.30.1_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/cjs/nodewallet.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const buffer_1 = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const common_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.30.1_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/cjs/utils/common.js [app-route] (ecmascript)");
/**
 * Node only wallet.
 */ class NodeWallet {
    constructor(payer){
        this.payer = payer;
    }
    static local() {
        const process = __turbopack_context__.r("[externals]/process [external] (process, cjs)");
        if (!process.env.ANCHOR_WALLET || process.env.ANCHOR_WALLET === "") {
            throw new Error("expected environment variable `ANCHOR_WALLET` is not set.");
        }
        const payer = web3_js_1.Keypair.fromSecretKey(buffer_1.Buffer.from(JSON.parse(__turbopack_context__.r("[externals]/fs [external] (fs, cjs)").readFileSync(process.env.ANCHOR_WALLET, {
            encoding: "utf-8"
        }))));
        return new NodeWallet(payer);
    }
    async signTransaction(tx) {
        if ((0, common_js_1.isVersionedTransaction)(tx)) {
            tx.sign([
                this.payer
            ]);
        } else {
            tx.partialSign(this.payer);
        }
        return tx;
    }
    async signAllTransactions(txs) {
        return txs.map((t)=>{
            if ((0, common_js_1.isVersionedTransaction)(t)) {
                t.sign([
                    this.payer
                ]);
            } else {
                t.partialSign(this.payer);
            }
            return t;
        });
    }
    get publicKey() {
        return this.payer.publicKey;
    }
}
exports.default = NodeWallet; //# sourceMappingURL=nodewallet.js.map
}),
];

//# sourceMappingURL=2e41f_%40coral-xyz_anchor_dist_cjs_ebdbcf0a._.js.map