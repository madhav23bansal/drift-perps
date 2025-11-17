module.exports = [
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/common.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isBrowser",
    ()=>isBrowser
]);
var _a;
const isBrowser = ("TURBOPACK compile-time value", "undefined") !== "undefined" && !((_a = window.process) === null || _a === void 0 ? void 0 : _a.hasOwnProperty("type")); //# sourceMappingURL=common.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/provider.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NodeWallet",
    ()=>NodeWallet,
    "default",
    ()=>Provider,
    "getProvider",
    ()=>getProvider,
    "setProvider",
    ()=>setProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/common.js [app-route] (ecmascript)");
;
;
class Provider {
    /**
     * @param connection The cluster connection where the program is deployed.
     * @param wallet     The wallet used to pay for and sign all transactions.
     * @param opts       Transaction confirmation options to use by default.
     */ constructor(connection, wallet, opts){
        this.connection = connection;
        this.wallet = wallet;
        this.opts = opts;
    }
    static defaultOptions() {
        return {
            preflightCommitment: "recent",
            commitment: "recent"
        };
    }
    /**
     * Returns a `Provider` with a wallet read from the local filesystem.
     *
     * @param url  The network cluster url.
     * @param opts The default transaction confirmation options.
     *
     * (This api is for Node only.)
     */ static local(url, opts) {
        opts = opts !== null && opts !== void 0 ? opts : Provider.defaultOptions();
        const connection = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Connection"](url !== null && url !== void 0 ? url : "http://localhost:8899", opts.preflightCommitment);
        const wallet = NodeWallet.local();
        return new Provider(connection, wallet, opts);
    }
    /**
     * Returns a `Provider` read from the `ANCHOR_PROVIDER_URL` environment
     * variable
     *
     * (This api is for Node only.)
     */ static env() {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isBrowser"]) return;
        const process = __turbopack_context__.r("[externals]/process [external] (process, cjs)");
        const url = process.env.ANCHOR_PROVIDER_URL;
        if (url === undefined) {
            throw new Error("ANCHOR_PROVIDER_URL is not defined");
        }
        const options = Provider.defaultOptions();
        const connection = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Connection"](url, options.commitment);
        const wallet = NodeWallet.local();
        return new Provider(connection, wallet, options);
    }
    /**
     * Sends the given transaction, paid for and signed by the provider's wallet.
     *
     * @param tx      The transaction to send.
     * @param signers The set of signers in addition to the provdier wallet that
     *                will sign the transaction.
     * @param opts    Transaction confirmation options.
     */ async send(tx, signers, opts) {
        if (signers === undefined) {
            signers = [];
        }
        if (opts === undefined) {
            opts = this.opts;
        }
        tx.feePayer = this.wallet.publicKey;
        tx.recentBlockhash = (await this.connection.getRecentBlockhash(opts.preflightCommitment)).blockhash;
        await this.wallet.signTransaction(tx);
        signers.filter((s)=>s !== undefined).forEach((kp)=>{
            tx.partialSign(kp);
        });
        const rawTx = tx.serialize();
        const txId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendAndConfirmRawTransaction"])(this.connection, rawTx, opts);
        return txId;
    }
    /**
     * Similar to `send`, but for an array of transactions and signers.
     */ async sendAll(reqs, opts) {
        if (opts === undefined) {
            opts = this.opts;
        }
        const blockhash = await this.connection.getRecentBlockhash(opts.preflightCommitment);
        let txs = reqs.map((r)=>{
            let tx = r.tx;
            let signers = r.signers;
            if (signers === undefined) {
                signers = [];
            }
            tx.feePayer = this.wallet.publicKey;
            tx.recentBlockhash = blockhash.blockhash;
            signers.filter((s)=>s !== undefined).forEach((kp)=>{
                tx.partialSign(kp);
            });
            return tx;
        });
        const signedTxs = await this.wallet.signAllTransactions(txs);
        const sigs = [];
        for(let k = 0; k < txs.length; k += 1){
            const tx = signedTxs[k];
            const rawTx = tx.serialize();
            sigs.push(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendAndConfirmRawTransaction"])(this.connection, rawTx, opts));
        }
        return sigs;
    }
    /**
     * Simulates the given transaction, returning emitted logs from execution.
     *
     * @param tx      The transaction to send.
     * @param signers The set of signers in addition to the provdier wallet that
     *                will sign the transaction.
     * @param opts    Transaction confirmation options.
     */ async simulate(tx, signers, opts) {
        var _a, _b;
        if (signers === undefined) {
            signers = [];
        }
        if (opts === undefined) {
            opts = this.opts;
        }
        tx.feePayer = this.wallet.publicKey;
        tx.recentBlockhash = (await this.connection.getRecentBlockhash((_a = opts.preflightCommitment) !== null && _a !== void 0 ? _a : this.opts.preflightCommitment)).blockhash;
        await this.wallet.signTransaction(tx);
        signers.filter((s)=>s !== undefined).forEach((kp)=>{
            tx.partialSign(kp);
        });
        return await simulateTransaction(this.connection, tx, (_b = opts.commitment) !== null && _b !== void 0 ? _b : this.opts.commitment);
    }
}
class NodeWallet {
    constructor(payer){
        this.payer = payer;
    }
    static local() {
        const payer = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Keypair"].fromSecretKey(Buffer.from(JSON.parse(__turbopack_context__.r("[externals]/fs [external] (fs, cjs)").readFileSync(__turbopack_context__.r("[externals]/os [external] (os, cjs)").homedir() + "/.config/solana/id.json", {
            encoding: "utf-8"
        }))));
        return new NodeWallet(payer);
    }
    async signTransaction(tx) {
        tx.partialSign(this.payer);
        return tx;
    }
    async signAllTransactions(txs) {
        return txs.map((t)=>{
            t.partialSign(this.payer);
            return t;
        });
    }
    get publicKey() {
        return this.payer.publicKey;
    }
}
// Copy of Connection.simulateTransaction that takes a commitment parameter.
async function simulateTransaction(connection, transaction, commitment) {
    // @ts-ignore
    transaction.recentBlockhash = await connection._recentBlockhash(// @ts-ignore
    connection._disableBlockhashCaching);
    const signData = transaction.serializeMessage();
    // @ts-ignore
    const wireTransaction = transaction._serialize(signData);
    const encodedTransaction = wireTransaction.toString("base64");
    const config = {
        encoding: "base64",
        commitment
    };
    const args = [
        encodedTransaction,
        config
    ];
    // @ts-ignore
    const res = await connection._rpcRequest("simulateTransaction", args);
    if (res.error) {
        throw new Error("failed to simulate transaction: " + res.error.message);
    }
    return res.result;
}
function setProvider(provider) {
    _provider = provider;
}
function getProvider() {
    if (_provider === null) {
        return Provider.local();
    }
    return _provider;
}
// Global provider used as the default when a provider is not given.
let _provider = null; //# sourceMappingURL=provider.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/error.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IdlError",
    ()=>IdlError,
    "ProgramError",
    ()=>ProgramError
]);
class IdlError extends Error {
}
class ProgramError extends Error {
    constructor(code, msg, ...params){
        super(...params);
        this.code = code;
        this.msg = msg;
    }
    static parse(err, idlErrors) {
        // TODO: don't rely on the error string. web3.js should preserve the error
        //       code information instead of giving us an untyped string.
        let components = err.toString().split("custom program error: ");
        if (components.length !== 2) {
            return null;
        }
        let errorCode;
        try {
            errorCode = parseInt(components[1]);
        } catch (parseErr) {
            return null;
        }
        // Parse user error.
        let errorMsg = idlErrors.get(errorCode);
        if (errorMsg !== undefined) {
            return new ProgramError(errorCode, errorMsg);
        }
        // Parse framework internal error.
        errorMsg = LangErrorMessage.get(errorCode);
        if (errorMsg !== undefined) {
            return new ProgramError(errorCode, errorMsg);
        }
        // Unable to parse the error. Just return the untranslated error.
        return null;
    }
    toString() {
        return this.msg;
    }
}
const LangErrorCode = {
    // Instructions.
    InstructionMissing: 100,
    InstructionFallbackNotFound: 101,
    InstructionDidNotDeserialize: 102,
    InstructionDidNotSerialize: 103,
    // IDL instructions.
    IdlInstructionStub: 120,
    IdlInstructionInvalidProgram: 121,
    // Constraints.
    ConstraintMut: 140,
    ConstraintHasOne: 141,
    ConstraintSigner: 142,
    ConstraintRaw: 143,
    ConstraintOwner: 144,
    ConstraintRentExempt: 145,
    ConstraintSeeds: 146,
    ConstraintExecutable: 147,
    ConstraintState: 148,
    ConstraintAssociated: 149,
    ConstraintAssociatedInit: 150,
    ConstraintClose: 151,
    ConstraintAddress: 152,
    // Accounts.
    AccountDiscriminatorAlreadySet: 160,
    AccountDiscriminatorNotFound: 161,
    AccountDiscriminatorMismatch: 162,
    AccountDidNotDeserialize: 163,
    AccountDidNotSerialize: 164,
    AccountNotEnoughKeys: 165,
    AccountNotMutable: 166,
    AccountNotProgramOwned: 167,
    // State.
    StateInvalidAddress: 180,
    // Used for APIs that shouldn't be used anymore.
    Deprecated: 299
};
const LangErrorMessage = new Map([
    // Instructions.
    [
        LangErrorCode.InstructionMissing,
        "8 byte instruction identifier not provided"
    ],
    [
        LangErrorCode.InstructionFallbackNotFound,
        "Fallback functions are not supported"
    ],
    [
        LangErrorCode.InstructionDidNotDeserialize,
        "The program could not deserialize the given instruction"
    ],
    [
        LangErrorCode.InstructionDidNotSerialize,
        "The program could not serialize the given instruction"
    ],
    // Idl instructions.
    [
        LangErrorCode.IdlInstructionStub,
        "The program was compiled without idl instructions"
    ],
    [
        LangErrorCode.IdlInstructionInvalidProgram,
        "The transaction was given an invalid program for the IDL instruction"
    ],
    // Constraints.
    [
        LangErrorCode.ConstraintMut,
        "A mut constraint was violated"
    ],
    [
        LangErrorCode.ConstraintHasOne,
        "A has_one constraint was violated"
    ],
    [
        LangErrorCode.ConstraintSigner,
        "A signer constraint was violated"
    ],
    [
        LangErrorCode.ConstraintRaw,
        "A raw constraint as violated"
    ],
    [
        LangErrorCode.ConstraintOwner,
        "An owner constraint was violated"
    ],
    [
        LangErrorCode.ConstraintRentExempt,
        "A rent exempt constraint was violated"
    ],
    [
        LangErrorCode.ConstraintSeeds,
        "A seeds constraint was violated"
    ],
    [
        LangErrorCode.ConstraintExecutable,
        "An executable constraint was violated"
    ],
    [
        LangErrorCode.ConstraintState,
        "A state constraint was violated"
    ],
    [
        LangErrorCode.ConstraintAssociated,
        "An associated constraint was violated"
    ],
    [
        LangErrorCode.ConstraintAssociatedInit,
        "An associated init constraint was violated"
    ],
    [
        LangErrorCode.ConstraintClose,
        "A close constraint was violated"
    ],
    [
        LangErrorCode.ConstraintAddress,
        "An address constraint was violated"
    ],
    // Accounts.
    [
        LangErrorCode.AccountDiscriminatorAlreadySet,
        "The account discriminator was already set on this account"
    ],
    [
        LangErrorCode.AccountDiscriminatorNotFound,
        "No 8 byte discriminator was found on the account"
    ],
    [
        LangErrorCode.AccountDiscriminatorMismatch,
        "8 byte discriminator did not match what was expected"
    ],
    [
        LangErrorCode.AccountDidNotDeserialize,
        "Failed to deserialize the account"
    ],
    [
        LangErrorCode.AccountDidNotSerialize,
        "Failed to serialize the account"
    ],
    [
        LangErrorCode.AccountNotEnoughKeys,
        "Not enough account keys given to the instruction"
    ],
    [
        LangErrorCode.AccountNotMutable,
        "The given account is not mutable"
    ],
    [
        LangErrorCode.AccountNotProgramOwned,
        "The given account is not owned by the executing program"
    ],
    // State.
    [
        LangErrorCode.StateInvalidAddress,
        "The given state account does not have the correct address"
    ],
    // Misc.
    [
        LangErrorCode.Deprecated,
        "The API being used is deprecated and should no longer be used"
    ]
]); //# sourceMappingURL=error.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/idl.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IdlCoder",
    ()=>IdlCoder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$camelcase$40$5$2e$3$2e$1$2f$node_modules$2f$camelcase$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/camelcase@5.3.1/node_modules/camelcase/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+borsh@0.2.5_@solana+web3.js@1.98.4/node_modules/@project-serum/borsh/dist/lib/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/error.js [app-route] (ecmascript)");
;
;
;
class IdlCoder {
    static fieldLayout(field, types) {
        const fieldName = field.name !== undefined ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$camelcase$40$5$2e$3$2e$1$2f$node_modules$2f$camelcase$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(field.name) : undefined;
        switch(field.type){
            case "bool":
                {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bool"](fieldName);
                }
            case "u8":
                {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["u8"](fieldName);
                }
            case "i8":
                {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["i8"](fieldName);
                }
            case "u16":
                {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["u16"](fieldName);
                }
            case "i16":
                {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["i16"](fieldName);
                }
            case "u32":
                {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["u32"](fieldName);
                }
            case "i32":
                {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["i32"](fieldName);
                }
            case "u64":
                {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["u64"](fieldName);
                }
            case "i64":
                {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["i64"](fieldName);
                }
            case "u128":
                {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["u128"](fieldName);
                }
            case "i128":
                {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["i128"](fieldName);
                }
            case "bytes":
                {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["vecU8"](fieldName);
                }
            case "string":
                {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["str"](fieldName);
                }
            case "publicKey":
                {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicKey"](fieldName);
                }
            default:
                {
                    // @ts-ignore
                    if (field.type.vec) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["vec"](IdlCoder.fieldLayout({
                            name: undefined,
                            // @ts-ignore
                            type: field.type.vec
                        }, types), fieldName);
                    // @ts-ignore
                    } else if (field.type.option) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["option"](IdlCoder.fieldLayout({
                            name: undefined,
                            // @ts-ignore
                            type: field.type.option
                        }, types), fieldName);
                    // @ts-ignore
                    } else if (field.type.defined) {
                        // User defined type.
                        if (types === undefined) {
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IdlError"]("User defined types not provided");
                        }
                        // @ts-ignore
                        const filtered = types.filter((t)=>t.name === field.type.defined);
                        if (filtered.length !== 1) {
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IdlError"](`Type not found: ${JSON.stringify(field)}`);
                        }
                        return IdlCoder.typeDefLayout(filtered[0], types, fieldName);
                    // @ts-ignore
                    } else if (field.type.array) {
                        // @ts-ignore
                        let arrayTy = field.type.array[0];
                        // @ts-ignore
                        let arrayLen = field.type.array[1];
                        let innerLayout = IdlCoder.fieldLayout({
                            name: undefined,
                            type: arrayTy
                        }, types);
                        return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["array"](innerLayout, arrayLen, fieldName);
                    } else {
                        throw new Error(`Not yet implemented: ${field}`);
                    }
                }
        }
    }
    static typeDefLayout(typeDef, types, name) {
        if (typeDef.type.kind === "struct") {
            const fieldLayouts = typeDef.type.fields.map((field)=>{
                const x = IdlCoder.fieldLayout(field, types);
                return x;
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["struct"](fieldLayouts, name);
        } else if (typeDef.type.kind === "enum") {
            let variants = typeDef.type.variants.map((variant)=>{
                const name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$camelcase$40$5$2e$3$2e$1$2f$node_modules$2f$camelcase$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(variant.name);
                if (variant.fields === undefined) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["struct"]([], name);
                }
                // @ts-ignore
                const fieldLayouts = variant.fields.map((f)=>{
                    // @ts-ignore
                    if (f.name === undefined) {
                        throw new Error("Tuple enum variants not yet implemented.");
                    }
                    // @ts-ignore
                    return IdlCoder.fieldLayout(f, types);
                });
                return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["struct"](fieldLayouts, name);
            });
            if (name !== undefined) {
                // Buffer-layout lib requires the name to be null (on construction)
                // when used as a field.
                return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["rustEnum"](variants).replicate(name);
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["rustEnum"](variants, name);
        } else {
            throw new Error(`Unknown type kint: ${typeDef}`);
        }
    }
} //# sourceMappingURL=idl.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/common.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "accountSize",
    ()=>accountSize,
    "sighash",
    ()=>sighash
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$snake$2d$case$40$3$2e$0$2e$4$2f$node_modules$2f$snake$2d$case$2f$dist$2e$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/snake-case@3.0.4/node_modules/snake-case/dist.es2015/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$js$2d$sha256$40$0$2e$9$2e$0$2f$node_modules$2f$js$2d$sha256$2f$src$2f$sha256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/js-sha256@0.9.0/node_modules/js-sha256/src/sha256.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/error.js [app-route] (ecmascript)");
;
;
;
function accountSize(idl, idlAccount) {
    if (idlAccount.type.kind === "enum") {
        let variantSizes = idlAccount.type.variants.map((variant)=>{
            if (variant.fields === undefined) {
                return 0;
            }
            return variant.fields// @ts-ignore
            .map((f)=>{
                // @ts-ignore
                if (f.name === undefined) {
                    throw new Error("Tuple enum variants not yet implemented.");
                }
                // @ts-ignore
                return typeSize(idl, f.type);
            }).reduce((a, b)=>a + b);
        });
        return Math.max(...variantSizes) + 1;
    }
    if (idlAccount.type.fields === undefined) {
        return 0;
    }
    return idlAccount.type.fields.map((f)=>typeSize(idl, f.type)).reduce((a, b)=>a + b);
}
// Returns the size of the type in bytes. For variable length types, just return
// 1. Users should override this value in such cases.
function typeSize(idl, ty) {
    switch(ty){
        case "bool":
            return 1;
        case "u8":
            return 1;
        case "i8":
            return 1;
        case "i16":
            return 2;
        case "u16":
            return 2;
        case "u32":
            return 4;
        case "i32":
            return 4;
        case "u64":
            return 8;
        case "i64":
            return 8;
        case "u128":
            return 16;
        case "i128":
            return 16;
        case "bytes":
            return 1;
        case "string":
            return 1;
        case "publicKey":
            return 32;
        default:
            // @ts-ignore
            if (ty.vec !== undefined) {
                return 1;
            }
            // @ts-ignore
            if (ty.option !== undefined) {
                // @ts-ignore
                return 1 + typeSize(idl, ty.option);
            }
            // @ts-ignore
            if (ty.defined !== undefined) {
                // @ts-ignore
                const filtered = idl.types.filter((t)=>t.name === ty.defined);
                if (filtered.length !== 1) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IdlError"](`Type not found: ${JSON.stringify(ty)}`);
                }
                let typeDef = filtered[0];
                return accountSize(idl, typeDef);
            }
            // @ts-ignore
            if (ty.array !== undefined) {
                // @ts-ignore
                let arrayTy = ty.array[0];
                // @ts-ignore
                let arraySize = ty.array[1];
                // @ts-ignore
                return typeSize(idl, arrayTy) * arraySize;
            }
            throw new Error(`Invalid type ${JSON.stringify(ty)}`);
    }
}
function sighash(nameSpace, ixName) {
    let name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$snake$2d$case$40$3$2e$0$2e$4$2f$node_modules$2f$snake$2d$case$2f$dist$2e$es2015$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["snakeCase"])(ixName);
    let preimage = `${nameSpace}:${name}`;
    return Buffer.from(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$js$2d$sha256$40$0$2e$9$2e$0$2f$node_modules$2f$js$2d$sha256$2f$src$2f$sha256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha256"].digest(preimage)).slice(0, 8);
} //# sourceMappingURL=common.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/instruction.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InstructionCoder",
    ()=>InstructionCoder,
    "SIGHASH_GLOBAL_NAMESPACE",
    ()=>SIGHASH_GLOBAL_NAMESPACE,
    "SIGHASH_STATE_NAMESPACE",
    ()=>SIGHASH_STATE_NAMESPACE
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$camelcase$40$5$2e$3$2e$1$2f$node_modules$2f$camelcase$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/camelcase@5.3.1/node_modules/camelcase/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+borsh@0.2.5_@solana+web3.js@1.98.4/node_modules/@project-serum/borsh/dist/lib/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$4$2e$0$2e$1$2f$node_modules$2f$bs58$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bs58@4.0.1/node_modules/bs58/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$idl$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/idl.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/common.js [app-route] (ecmascript)");
;
;
;
;
;
const SIGHASH_STATE_NAMESPACE = "state";
const SIGHASH_GLOBAL_NAMESPACE = "global";
class InstructionCoder {
    constructor(idl){
        this.idl = idl;
        this.ixLayout = InstructionCoder.parseIxLayout(idl);
        const sighashLayouts = new Map();
        idl.instructions.forEach((ix)=>{
            const sh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sighash"])(SIGHASH_GLOBAL_NAMESPACE, ix.name);
            sighashLayouts.set(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$4$2e$0$2e$1$2f$node_modules$2f$bs58$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encode"](sh), {
                layout: this.ixLayout.get(ix.name),
                name: ix.name
            });
        });
        if (idl.state) {
            idl.state.methods.map((ix)=>{
                const sh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sighash"])(SIGHASH_STATE_NAMESPACE, ix.name);
                sighashLayouts.set(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$4$2e$0$2e$1$2f$node_modules$2f$bs58$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encode"](sh), {
                    layout: this.ixLayout.get(ix.name),
                    name: ix.name
                });
            });
        }
        this.sighashLayouts = sighashLayouts;
    }
    /**
     * Encodes a program instruction.
     */ encode(ixName, ix) {
        return this._encode(SIGHASH_GLOBAL_NAMESPACE, ixName, ix);
    }
    /**
     * Encodes a program state instruction.
     */ encodeState(ixName, ix) {
        return this._encode(SIGHASH_STATE_NAMESPACE, ixName, ix);
    }
    _encode(nameSpace, ixName, ix) {
        const buffer = Buffer.alloc(1000); // TODO: use a tighter buffer.
        const methodName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$camelcase$40$5$2e$3$2e$1$2f$node_modules$2f$camelcase$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(ixName);
        const len = this.ixLayout.get(methodName).encode(ix, buffer);
        const data = buffer.slice(0, len);
        return Buffer.concat([
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sighash"])(nameSpace, ixName),
            data
        ]);
    }
    static parseIxLayout(idl) {
        const stateMethods = idl.state ? idl.state.methods : [];
        const ixLayouts = stateMethods.map((m)=>{
            let fieldLayouts = m.args.map((arg)=>{
                return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$idl$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IdlCoder"].fieldLayout(arg, idl.types);
            });
            const name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$camelcase$40$5$2e$3$2e$1$2f$node_modules$2f$camelcase$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(m.name);
            return [
                name,
                __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["struct"](fieldLayouts, name)
            ];
        }).concat(idl.instructions.map((ix)=>{
            let fieldLayouts = ix.args.map((arg)=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$idl$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IdlCoder"].fieldLayout(arg, idl.types));
            const name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$camelcase$40$5$2e$3$2e$1$2f$node_modules$2f$camelcase$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(ix.name);
            return [
                name,
                __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["struct"](fieldLayouts, name)
            ];
        }));
        // @ts-ignore
        return new Map(ixLayouts);
    }
    /**
     * Dewcodes a program instruction.
     */ decode(ix) {
        if (typeof ix === "string") {
            ix = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$4$2e$0$2e$1$2f$node_modules$2f$bs58$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decode"](ix);
        }
        let sighash = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$4$2e$0$2e$1$2f$node_modules$2f$bs58$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encode"](ix.slice(0, 8));
        let data = ix.slice(8);
        const decoder = this.sighashLayouts.get(sighash);
        if (!decoder) {
            return null;
        }
        return {
            data: decoder.layout.decode(data),
            name: decoder.name
        };
    }
    /**
     * Returns a formatted table of all the fields in the given instruction data.
     */ format(ix, accountMetas) {
        return InstructionFormatter.format(ix, accountMetas, this.idl);
    }
}
class InstructionFormatter {
    static format(ix, accountMetas, idl) {
        const idlIx = idl.instructions.filter((i)=>ix.name === i.name)[0];
        if (idlIx === undefined) {
            console.error("Invalid instruction given");
            return null;
        }
        const args = idlIx.args.map((idlField)=>{
            return {
                name: idlField.name,
                type: InstructionFormatter.formatIdlType(idlField.type),
                data: InstructionFormatter.formatIdlData(idlField, ix.data[idlField.name], idl.types)
            };
        });
        const flatIdlAccounts = InstructionFormatter.flattenIdlAccounts(idlIx.accounts);
        const accounts = accountMetas.map((meta, idx)=>{
            if (idx < flatIdlAccounts.length) {
                return {
                    name: flatIdlAccounts[idx].name,
                    ...meta
                };
            } else {
                return {
                    name: undefined,
                    ...meta
                };
            }
        });
        return {
            args,
            accounts
        };
    }
    static formatIdlType(idlType) {
        if (typeof idlType === "string") {
            return idlType;
        }
        // @ts-ignore
        if (idlType.vec) {
            // @ts-ignore
            return `Vec<${this.formatIdlType(idlType.vec)}>`;
        }
        // @ts-ignore
        if (idlType.option) {
            // @ts-ignore
            return `Option<${this.formatIdlType(idlType.option)}>`;
        }
        // @ts-ignore
        if (idlType.defined) {
            // @ts-ignore
            return idlType.defined;
        }
    }
    static formatIdlData(idlField, data, types) {
        if (typeof idlField.type === "string") {
            return data.toString();
        }
        // @ts-ignore
        if (idlField.type.vec) {
            // @ts-ignore
            return "[" + data// @ts-ignore
            .map((d)=>this.formatIdlData(// @ts-ignore
                {
                    name: "",
                    type: idlField.type.vec
                }, d)).join(", ") + "]";
        }
        // @ts-ignore
        if (idlField.type.option) {
            // @ts-ignore
            return data === null ? "null" : this.formatIdlData(// @ts-ignore
            {
                name: "",
                type: idlField.type.option
            }, data);
        }
        // @ts-ignore
        if (idlField.type.defined) {
            if (types === undefined) {
                throw new Error("User defined types not provided");
            }
            // @ts-ignore
            const filtered = types.filter((t)=>t.name === idlField.type.defined);
            if (filtered.length !== 1) {
                // @ts-ignore
                throw new Error(`Type not found: ${idlField.type.defined}`);
            }
            return InstructionFormatter.formatIdlDataDefined(filtered[0], data, types);
        }
        return "unknown";
    }
    static formatIdlDataDefined(typeDef, data, types) {
        if (typeDef.type.kind === "struct") {
            const fields = Object.keys(data).map((k)=>{
                const f = typeDef.type.fields.filter((f)=>f.name === k)[0];
                if (f === undefined) {
                    throw new Error("Unable to find type");
                }
                return k + ": " + InstructionFormatter.formatIdlData(f, data[k], types);
            }).join(", ");
            return "{ " + fields + " }";
        } else {
            if (typeDef.type.variants.length === 0) {
                return "{}";
            }
            // Struct enum.
            if (typeDef.type.variants[0].name) {
                const variant = Object.keys(data)[0];
                const enumType = data[variant];
                const namedFields = Object.keys(enumType).map((f)=>{
                    var _a;
                    const fieldData = enumType[f];
                    const idlField = (_a = typeDef.type.variants[variant]) === null || _a === void 0 ? void 0 : _a.filter((v)=>v.name === f)[0];
                    if (idlField === undefined) {
                        throw new Error("Unable to find variant");
                    }
                    return f + ": " + InstructionFormatter.formatIdlData(idlField, fieldData, types);
                }).join(", ");
                const variantName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$camelcase$40$5$2e$3$2e$1$2f$node_modules$2f$camelcase$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(variant, {
                    pascalCase: true
                });
                if (namedFields.length === 0) {
                    return variantName;
                }
                return `${variantName} { ${namedFields} }`;
            } else {
                // TODO.
                return "Tuple formatting not yet implemented";
            }
        }
    }
    static flattenIdlAccounts(accounts, prefix) {
        // @ts-ignore
        return accounts.map((account)=>{
            const accName = sentenceCase(account.name);
            // @ts-ignore
            if (account.accounts) {
                const newPrefix = prefix ? `${prefix} > ${accName}` : accName;
                // @ts-ignore
                return InstructionFormatter.flattenIdlAccounts(// @ts-ignore
                account.accounts, newPrefix);
            } else {
                return {
                    ...account,
                    name: prefix ? `${prefix} > ${accName}` : accName
                };
            }
        }).flat();
    }
}
function sentenceCase(field) {
    const result = field.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
} //# sourceMappingURL=instruction.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/accounts.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ACCOUNT_DISCRIMINATOR_SIZE",
    ()=>ACCOUNT_DISCRIMINATOR_SIZE,
    "AccountsCoder",
    ()=>AccountsCoder,
    "accountDiscriminator",
    ()=>accountDiscriminator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$idl$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/idl.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$js$2d$sha256$40$0$2e$9$2e$0$2f$node_modules$2f$js$2d$sha256$2f$src$2f$sha256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/js-sha256@0.9.0/node_modules/js-sha256/src/sha256.js [app-route] (ecmascript)");
;
;
const ACCOUNT_DISCRIMINATOR_SIZE = 8;
class AccountsCoder {
    constructor(idl){
        if (idl.accounts === undefined) {
            this.accountLayouts = new Map();
            return;
        }
        const layouts = idl.accounts.map((acc)=>{
            return [
                acc.name,
                __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$idl$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IdlCoder"].typeDefLayout(acc, idl.types)
            ];
        });
        this.accountLayouts = new Map(layouts);
    }
    async encode(accountName, account) {
        const buffer = Buffer.alloc(1000); // TODO: use a tighter buffer.
        const layout = this.accountLayouts.get(accountName);
        const len = layout.encode(account, buffer);
        let accountData = buffer.slice(0, len);
        let discriminator = await accountDiscriminator(accountName);
        return Buffer.concat([
            discriminator,
            accountData
        ]);
    }
    decode(accountName, ix) {
        // Chop off the discriminator before decoding.
        const data = ix.slice(8);
        const layout = this.accountLayouts.get(accountName);
        return layout.decode(data);
    }
}
async function accountDiscriminator(name) {
    return Buffer.from(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$js$2d$sha256$40$0$2e$9$2e$0$2f$node_modules$2f$js$2d$sha256$2f$src$2f$sha256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha256"].digest(`account:${name}`)).slice(0, 8);
} //# sourceMappingURL=accounts.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/types.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TypesCoder",
    ()=>TypesCoder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$idl$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/idl.js [app-route] (ecmascript)");
;
class TypesCoder {
    constructor(idl){
        if (idl.types === undefined) {
            this.layouts = new Map();
            return;
        }
        const layouts = idl.types.map((acc)=>{
            return [
                acc.name,
                __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$idl$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IdlCoder"].typeDefLayout(acc, idl.types)
            ];
        });
        // @ts-ignore
        this.layouts = new Map(layouts);
    }
    encode(accountName, account) {
        const buffer = Buffer.alloc(1000); // TODO: use a tighter buffer.
        const layout = this.layouts.get(accountName);
        const len = layout.encode(account, buffer);
        return buffer.slice(0, len);
    }
    decode(accountName, ix) {
        const layout = this.layouts.get(accountName);
        return layout.decode(ix);
    }
} //# sourceMappingURL=types.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/event.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EventCoder",
    ()=>EventCoder,
    "eventDiscriminator",
    ()=>eventDiscriminator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$base64$2d$js$40$1$2e$5$2e$1$2f$node_modules$2f$base64$2d$js$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/base64-js@1.5.1/node_modules/base64-js/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$js$2d$sha256$40$0$2e$9$2e$0$2f$node_modules$2f$js$2d$sha256$2f$src$2f$sha256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/js-sha256@0.9.0/node_modules/js-sha256/src/sha256.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$idl$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/idl.js [app-route] (ecmascript)");
;
;
;
class EventCoder {
    constructor(idl){
        if (idl.events === undefined) {
            this.layouts = new Map();
            return;
        }
        const layouts = idl.events.map((event)=>{
            let eventTypeDef = {
                name: event.name,
                type: {
                    kind: "struct",
                    fields: event.fields.map((f)=>{
                        return {
                            name: f.name,
                            type: f.type
                        };
                    })
                }
            };
            return [
                event.name,
                __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$idl$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IdlCoder"].typeDefLayout(eventTypeDef, idl.types)
            ];
        });
        // @ts-ignore
        this.layouts = new Map(layouts);
        this.discriminators = new Map(idl.events === undefined ? [] : idl.events.map((e)=>[
                __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$base64$2d$js$40$1$2e$5$2e$1$2f$node_modules$2f$base64$2d$js$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromByteArray"](eventDiscriminator(e.name)),
                e.name
            ]));
    }
    decode(log) {
        let logArr;
        // This will throw if log length is not a multiple of 4.
        try {
            logArr = Buffer.from(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$base64$2d$js$40$1$2e$5$2e$1$2f$node_modules$2f$base64$2d$js$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toByteArray"](log));
        } catch (e) {
            return null;
        }
        const disc = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$base64$2d$js$40$1$2e$5$2e$1$2f$node_modules$2f$base64$2d$js$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromByteArray"](logArr.slice(0, 8));
        // Only deserialize if the discriminator implies a proper event.
        const eventName = this.discriminators.get(disc);
        if (eventName === undefined) {
            return null;
        }
        const layout = this.layouts.get(eventName);
        const data = layout.decode(logArr.slice(8));
        return {
            data,
            name: eventName
        };
    }
}
function eventDiscriminator(name) {
    return Buffer.from(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$js$2d$sha256$40$0$2e$9$2e$0$2f$node_modules$2f$js$2d$sha256$2f$src$2f$sha256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha256"].digest(`event:${name}`)).slice(0, 8);
} //# sourceMappingURL=event.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/features.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isSet",
    ()=>isSet,
    "set",
    ()=>set
]);
const _AVAILABLE_FEATURES = new Set([
    "anchor-deprecated-state"
]);
const _FEATURES = new Map();
function set(key) {
    if (!_AVAILABLE_FEATURES.has(key)) {
        throw new Error("Invalid feature");
    }
    _FEATURES.set(key, true);
}
function isSet(key) {
    return _FEATURES.get(key) !== undefined;
} //# sourceMappingURL=features.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/state.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StateCoder",
    ()=>StateCoder,
    "stateDiscriminator",
    ()=>stateDiscriminator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$js$2d$sha256$40$0$2e$9$2e$0$2f$node_modules$2f$js$2d$sha256$2f$src$2f$sha256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/js-sha256@0.9.0/node_modules/js-sha256/src/sha256.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$idl$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/idl.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$features$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/features.js [app-route] (ecmascript)");
;
;
;
class StateCoder {
    constructor(idl){
        if (idl.state === undefined) {
            throw new Error("Idl state not defined.");
        }
        this.layout = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$idl$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IdlCoder"].typeDefLayout(idl.state.struct, idl.types);
    }
    async encode(name, account) {
        const buffer = Buffer.alloc(1000); // TODO: use a tighter buffer.
        const len = this.layout.encode(account, buffer);
        const disc = await stateDiscriminator(name);
        const accData = buffer.slice(0, len);
        return Buffer.concat([
            disc,
            accData
        ]);
    }
    decode(ix) {
        // Chop off discriminator.
        const data = ix.slice(8);
        return this.layout.decode(data);
    }
}
async function stateDiscriminator(name) {
    let ns = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$features$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSet"]("anchor-deprecated-state") ? "account" : "state";
    return Buffer.from(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$js$2d$sha256$40$0$2e$9$2e$0$2f$node_modules$2f$js$2d$sha256$2f$src$2f$sha256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha256"].digest(`${ns}:${name}`)).slice(0, 8);
} //# sourceMappingURL=state.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Coder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$instruction$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/instruction.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$accounts$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/accounts.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/types.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$event$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/event.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/state.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/common.js [app-route] (ecmascript)");
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
class Coder {
    constructor(idl){
        this.instruction = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$instruction$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InstructionCoder"](idl);
        this.accounts = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$accounts$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AccountsCoder"](idl);
        this.types = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TypesCoder"](idl);
        this.events = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$event$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EventCoder"](idl);
        if (idl.state) {
            this.state = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StateCoder"](idl);
        }
    }
    sighash(nameSpace, ixName) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sighash"])(nameSpace, ixName);
    }
} //# sourceMappingURL=index.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/idl.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decodeIdlAccount",
    ()=>decodeIdlAccount,
    "encodeIdlAccount",
    ()=>encodeIdlAccount,
    "idlAddress",
    ()=>idlAddress,
    "seed",
    ()=>seed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+borsh@0.2.5_@solana+web3.js@1.98.4/node_modules/@project-serum/borsh/dist/lib/index.js [app-route] (ecmascript)");
;
;
async function idlAddress(programId) {
    const base = (await __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"].findProgramAddress([], programId))[0];
    return await __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"].createWithSeed(base, seed(), programId);
}
function seed() {
    return "anchor:idl";
}
const IDL_ACCOUNT_LAYOUT = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["struct"]([
    __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicKey"]("authority"),
    __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$borsh$40$0$2e$2$2e$5_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4$2f$node_modules$2f40$project$2d$serum$2f$borsh$2f$dist$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["vecU8"]("data")
]);
function decodeIdlAccount(data) {
    return IDL_ACCOUNT_LAYOUT.decode(data);
}
function encodeIdlAccount(acc) {
    const buffer = Buffer.alloc(1000); // TODO: use a tighter buffer.
    const len = IDL_ACCOUNT_LAYOUT.encode(acc, buffer);
    return buffer.slice(0, len);
} //# sourceMappingURL=idl.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/common.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseIdlErrors",
    ()=>parseIdlErrors,
    "toInstruction",
    ()=>toInstruction,
    "translateAddress",
    ()=>translateAddress,
    "validateAccounts",
    ()=>validateAccounts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
;
function parseIdlErrors(idl) {
    const errors = new Map();
    if (idl.errors) {
        idl.errors.forEach((e)=>{
            var _a;
            let msg = (_a = e.msg) !== null && _a !== void 0 ? _a : e.name;
            errors.set(e.code, msg);
        });
    }
    return errors;
}
function toInstruction(idlIx, ...args) {
    if (idlIx.args.length != args.length) {
        throw new Error("Invalid argument length");
    }
    const ix = {};
    let idx = 0;
    idlIx.args.forEach((ixArg)=>{
        ix[ixArg.name] = args[idx];
        idx += 1;
    });
    return ix;
}
function validateAccounts(ixAccounts, accounts) {
    ixAccounts.forEach((acc)=>{
        // @ts-ignore
        if (acc.accounts !== undefined) {
            // @ts-ignore
            validateAccounts(acc.accounts, accounts[acc.name]);
        } else {
            if (accounts[acc.name] === undefined) {
                throw new Error(`Invalid arguments: ${acc.name} not provided.`);
            }
        }
    });
}
function translateAddress(address) {
    if (typeof address === "string") {
        const pk = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"](address);
        return pk;
    } else {
        return address;
    }
} //# sourceMappingURL=common.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/pubkey.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "associated",
    ()=>associated,
    "createProgramAddressSync",
    ()=>createProgramAddressSync,
    "createWithSeedSync",
    ()=>createWithSeedSync,
    "findProgramAddressSync",
    ()=>findProgramAddressSync
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bn.js@5.2.2/node_modules/bn.js/lib/bn.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$js$2d$sha256$40$0$2e$9$2e$0$2f$node_modules$2f$js$2d$sha256$2f$src$2f$sha256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/js-sha256@0.9.0/node_modules/js-sha256/src/sha256.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/common.js [app-route] (ecmascript)");
;
;
;
;
function createWithSeedSync(fromPublicKey, seed, programId) {
    const buffer = Buffer.concat([
        fromPublicKey.toBuffer(),
        Buffer.from(seed),
        programId.toBuffer()
    ]);
    const hash = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$js$2d$sha256$40$0$2e$9$2e$0$2f$node_modules$2f$js$2d$sha256$2f$src$2f$sha256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha256"].digest(buffer);
    return new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"](Buffer.from(hash));
}
function createProgramAddressSync(seeds, programId) {
    const MAX_SEED_LENGTH = 32;
    let buffer = Buffer.alloc(0);
    seeds.forEach(function(seed) {
        if (seed.length > MAX_SEED_LENGTH) {
            throw new TypeError(`Max seed length exceeded`);
        }
        buffer = Buffer.concat([
            buffer,
            toBuffer(seed)
        ]);
    });
    buffer = Buffer.concat([
        buffer,
        programId.toBuffer(),
        Buffer.from("ProgramDerivedAddress")
    ]);
    let hash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$js$2d$sha256$40$0$2e$9$2e$0$2f$node_modules$2f$js$2d$sha256$2f$src$2f$sha256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha256"])(new Uint8Array(buffer));
    let publicKeyBytes = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](hash, 16).toArray(undefined, 32);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"].isOnCurve(new Uint8Array(publicKeyBytes))) {
        throw new Error(`Invalid seeds, address must fall off the curve`);
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"](publicKeyBytes);
}
function findProgramAddressSync(seeds, programId) {
    let nonce = 255;
    let address;
    while(nonce != 0){
        try {
            const seedsWithNonce = seeds.concat(Buffer.from([
                nonce
            ]));
            address = createProgramAddressSync(seedsWithNonce, programId);
        } catch (err) {
            if (err instanceof TypeError) {
                throw err;
            }
            nonce--;
            continue;
        }
        return [
            address,
            nonce
        ];
    }
    throw new Error(`Unable to find a viable program address nonce`);
}
const toBuffer = (arr)=>{
    if (arr instanceof Buffer) {
        return arr;
    } else if (arr instanceof Uint8Array) {
        return Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength);
    } else {
        return Buffer.from(arr);
    }
};
async function associated(programId, ...args) {
    let seeds = [
        Buffer.from([
            97,
            110,
            99,
            104,
            111,
            114
        ])
    ]; // b"anchor".
    args.forEach((arg)=>{
        seeds.push(// @ts-ignore
        arg.buffer !== undefined ? arg : (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["translateAddress"])(arg).toBuffer());
    });
    const [assoc] = await __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"].findProgramAddress(seeds, (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["translateAddress"])(programId));
    return assoc;
} //# sourceMappingURL=pubkey.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/context.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "splitArgsAndCtx",
    ()=>splitArgsAndCtx
]);
function splitArgsAndCtx(idlIx, args) {
    let options = {};
    const inputLen = idlIx.args ? idlIx.args.length : 0;
    if (args.length > inputLen) {
        if (args.length !== inputLen + 1) {
            throw new Error("provided too many arguments ${args}");
        }
        options = args.pop();
    }
    return [
        args,
        options
    ];
} //# sourceMappingURL=context.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/namespace/instruction.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InstructionNamespaceFactory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/error.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/common.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$context$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/context.js [app-route] (ecmascript)");
;
;
;
;
class InstructionNamespaceFactory {
    static build(idlIx, encodeFn, programId) {
        if (idlIx.name === "_inner") {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IdlError"]("the _inner name is reserved");
        }
        const ix = (...args)=>{
            const [ixArgs, ctx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$context$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["splitArgsAndCtx"])(idlIx, [
                ...args
            ]);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAccounts"])(idlIx.accounts, ctx.accounts);
            validateInstruction(idlIx, ...args);
            const keys = ix.accounts(ctx.accounts);
            if (ctx.remainingAccounts !== undefined) {
                keys.push(...ctx.remainingAccounts);
            }
            if (ctx.__private && ctx.__private.logAccounts) {
                console.log("Outgoing account metas:", keys);
            }
            return new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TransactionInstruction"]({
                keys,
                programId,
                data: encodeFn(idlIx.name, (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toInstruction"])(idlIx, ...ixArgs))
            });
        };
        // Utility fn for ordering the accounts for this instruction.
        ix["accounts"] = (accs)=>{
            return InstructionNamespaceFactory.accountsArray(accs, idlIx.accounts);
        };
        return ix;
    }
    static accountsArray(ctx, accounts) {
        return accounts.map((acc)=>{
            // Nested accounts.
            // @ts-ignore
            const nestedAccounts = acc.accounts;
            if (nestedAccounts !== undefined) {
                const rpcAccs = ctx[acc.name];
                return InstructionNamespaceFactory.accountsArray(rpcAccs, nestedAccounts).flat();
            } else {
                const account = acc;
                return {
                    pubkey: (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["translateAddress"])(ctx[acc.name]),
                    isWritable: account.isMut,
                    isSigner: account.isSigner
                };
            }
        }).flat();
    }
}
// Throws error if any argument required for the `ix` is not given.
function validateInstruction(ix, ...args) {
// todo
} //# sourceMappingURL=instruction.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/namespace/rpc.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RpcFactory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$context$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/context.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/error.js [app-route] (ecmascript)");
;
;
class RpcFactory {
    static build(idlIx, txFn, idlErrors, provider) {
        const rpc = async (...args)=>{
            const tx = txFn(...args);
            const [, ctx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$context$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["splitArgsAndCtx"])(idlIx, [
                ...args
            ]);
            try {
                const txSig = await provider.send(tx, ctx.signers, ctx.options);
                return txSig;
            } catch (err) {
                console.log("Translating error", err);
                let translatedErr = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ProgramError"].parse(err, idlErrors);
                if (translatedErr === null) {
                    throw err;
                }
                throw translatedErr;
            }
        };
        return rpc;
    }
} //# sourceMappingURL=rpc.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/namespace/transaction.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TransactionFactory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$context$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/context.js [app-route] (ecmascript)");
;
;
class TransactionFactory {
    static build(idlIx, ixFn) {
        const txFn = (...args)=>{
            const [, ctx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$context$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["splitArgsAndCtx"])(idlIx, [
                ...args
            ]);
            const tx = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Transaction"]();
            if (ctx.instructions !== undefined) {
                tx.add(...ctx.instructions);
            }
            tx.add(ixFn(...args));
            return tx;
        };
        return txFn;
    }
} //# sourceMappingURL=transaction.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/namespace/state.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StateClient",
    ()=>StateClient,
    "default",
    ()=>StateFactory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$eventemitter3$40$4$2e$0$2e$7$2f$node_modules$2f$eventemitter3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/eventemitter3@4.0.7/node_modules/eventemitter3/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$camelcase$40$5$2e$3$2e$1$2f$node_modules$2f$camelcase$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/camelcase@5.3.1/node_modules/camelcase/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/state.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/provider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/common.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$pubkey$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/pubkey.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$namespace$2f$instruction$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/namespace/instruction.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$namespace$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/namespace/rpc.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$namespace$2f$transaction$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/namespace/transaction.js [app-route] (ecmascript)");
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
class StateFactory {
    static build(idl, coder, programId, provider) {
        if (idl.state === undefined) {
            return undefined;
        }
        return new StateClient(idl, programId, provider, coder);
    }
}
class StateClient {
    constructor(idl, programId, provider, coder){
        this._idl = idl;
        this._programId = programId;
        this._address = programStateAddress(programId);
        this._provider = provider !== null && provider !== void 0 ? provider : (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getProvider"])();
        this._coder = coder !== null && coder !== void 0 ? coder : new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"](idl);
        this._sub = null;
        // Build namespaces.
        const [instruction, transaction, rpc] = (()=>{
            let instruction = {};
            let transaction = {};
            let rpc = {};
            idl.state.methods.forEach((m)=>{
                // Build instruction method.
                const ixItem = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$namespace$2f$instruction$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].build(m, (ixName, ix)=>coder.instruction.encodeState(ixName, ix), programId);
                ixItem["accounts"] = (accounts)=>{
                    const keys = stateInstructionKeys(programId, provider, m, accounts);
                    return keys.concat(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$namespace$2f$instruction$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].accountsArray(accounts, m.accounts));
                };
                // Build transaction method.
                const txItem = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$namespace$2f$transaction$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].build(m, ixItem);
                // Build RPC method.
                const rpcItem = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$namespace$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].build(m, txItem, (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseIdlErrors"])(idl), provider);
                // Attach them all to their respective namespaces.
                const name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$camelcase$40$5$2e$3$2e$1$2f$node_modules$2f$camelcase$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(m.name);
                instruction[name] = ixItem;
                transaction[name] = txItem;
                rpc[name] = rpcItem;
            });
            return [
                instruction,
                transaction,
                rpc
            ];
        })();
        this.instruction = instruction;
        this.transaction = transaction;
        this.rpc = rpc;
    }
    /**
     * Returns the program ID owning the state.
     */ get programId() {
        return this._programId;
    }
    /**
     * Returns the client's wallet and network provider.
     */ get provider() {
        return this._provider;
    }
    /**
     * Returns the coder.
     */ get coder() {
        return this._coder;
    }
    /**
     * Returns the deserialized state account.
     */ async fetch() {
        const addr = this.address();
        const accountInfo = await this.provider.connection.getAccountInfo(addr);
        if (accountInfo === null) {
            throw new Error(`Account does not exist ${addr.toString()}`);
        }
        // Assert the account discriminator is correct.
        const expectedDiscriminator = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stateDiscriminator"])(this._idl.state.struct.name);
        if (expectedDiscriminator.compare(accountInfo.data.slice(0, 8))) {
            throw new Error("Invalid account discriminator");
        }
        return this.coder.state.decode(accountInfo.data);
    }
    /**
     * Returns the state address.
     */ address() {
        return this._address;
    }
    /**
     * Returns an `EventEmitter` with a `"change"` event that's fired whenever
     * the state account cahnges.
     */ subscribe(commitment) {
        if (this._sub !== null) {
            return this._sub.ee;
        }
        const ee = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$eventemitter3$40$4$2e$0$2e$7$2f$node_modules$2f$eventemitter3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]();
        const listener = this.provider.connection.onAccountChange(this.address(), (acc)=>{
            const account = this.coder.state.decode(acc.data);
            ee.emit("change", account);
        }, commitment);
        this._sub = {
            ee,
            listener
        };
        return ee;
    }
    /**
     * Unsubscribes to state changes.
     */ unsubscribe() {
        if (this._sub !== null) {
            this.provider.connection.removeAccountChangeListener(this._sub.listener).then(async ()=>{
                this._sub = null;
            }).catch(console.error);
        }
    }
}
// Calculates the deterministic address of the program's "state" account.
function programStateAddress(programId) {
    let [registrySigner] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$pubkey$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findProgramAddressSync"])([], programId);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$pubkey$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createWithSeedSync"])(registrySigner, "unversioned", programId);
}
// Returns the common keys that are prepended to all instructions targeting
// the "state" of a program.
function stateInstructionKeys(programId, provider, m, accounts) {
    if (m.name === "new") {
        // Ctor `new` method.
        const [programSigner] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$pubkey$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findProgramAddressSync"])([], programId);
        return [
            {
                pubkey: provider.wallet.publicKey,
                isWritable: false,
                isSigner: true
            },
            {
                pubkey: programStateAddress(programId),
                isWritable: true,
                isSigner: false
            },
            {
                pubkey: programSigner,
                isWritable: false,
                isSigner: false
            },
            {
                pubkey: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SystemProgram"].programId,
                isWritable: false,
                isSigner: false
            },
            {
                pubkey: programId,
                isWritable: false,
                isSigner: false
            },
            {
                pubkey: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SYSVAR_RENT_PUBKEY"],
                isWritable: false,
                isSigner: false
            }
        ];
    } else {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAccounts"])(m.accounts, accounts);
        return [
            {
                pubkey: programStateAddress(programId),
                isWritable: true,
                isSigner: false
            }
        ];
    }
} //# sourceMappingURL=state.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/namespace/account.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AccountClient",
    ()=>AccountClient,
    "default",
    ()=>AccountFactory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$camelcase$40$5$2e$3$2e$1$2f$node_modules$2f$camelcase$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/camelcase@5.3.1/node_modules/camelcase/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$eventemitter3$40$4$2e$0$2e$7$2f$node_modules$2f$eventemitter3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/eventemitter3@4.0.7/node_modules/eventemitter3/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$4$2e$0$2e$1$2f$node_modules$2f$bs58$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bs58@4.0.1/node_modules/bs58/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$accounts$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/accounts.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/common.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/common.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/provider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$pubkey$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/pubkey.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
class AccountFactory {
    static build(idl, coder, programId, provider) {
        const accountFns = {};
        idl.accounts.forEach((idlAccount)=>{
            const name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$camelcase$40$5$2e$3$2e$1$2f$node_modules$2f$camelcase$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(idlAccount.name);
            accountFns[name] = new AccountClient(idl, idlAccount, programId, provider, coder);
        });
        return accountFns;
    }
}
class AccountClient {
    constructor(idl, idlAccount, programId, provider, coder){
        this._idlAccount = idlAccount;
        this._programId = programId;
        this._provider = provider !== null && provider !== void 0 ? provider : (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getProvider"])();
        this._coder = coder !== null && coder !== void 0 ? coder : new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"](idl);
        this._size = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$accounts$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ACCOUNT_DISCRIMINATOR_SIZE"] + (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["accountSize"])(idl, idlAccount);
    }
    /**
     * Returns the number of bytes in this account.
     */ get size() {
        return this._size;
    }
    /**
     * Returns the program ID owning all accounts.
     */ get programId() {
        return this._programId;
    }
    /**
     * Returns the client's wallet and network provider.
     */ get provider() {
        return this._provider;
    }
    /**
     * Returns the coder.
     */ get coder() {
        return this._coder;
    }
    /**
     * Returns a deserialized account.
     *
     * @param address The address of the account to fetch.
     */ async fetch(address) {
        const accountInfo = await this._provider.connection.getAccountInfo((0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["translateAddress"])(address));
        if (accountInfo === null) {
            throw new Error(`Account does not exist ${address.toString()}`);
        }
        // Assert the account discriminator is correct.
        const discriminator = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$accounts$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["accountDiscriminator"])(this._idlAccount.name);
        if (discriminator.compare(accountInfo.data.slice(0, 8))) {
            throw new Error("Invalid account discriminator");
        }
        return this._coder.accounts.decode(this._idlAccount.name, accountInfo.data);
    }
    /**
     * Returns all instances of this account type for the program.
     */ async all(filter) {
        let bytes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$accounts$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["accountDiscriminator"])(this._idlAccount.name);
        if (filter !== undefined) {
            bytes = Buffer.concat([
                bytes,
                filter
            ]);
        }
        let resp = await this._provider.connection.getProgramAccounts(this._programId, {
            commitment: this._provider.connection.commitment,
            filters: [
                {
                    memcmp: {
                        offset: 0,
                        bytes: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$4$2e$0$2e$1$2f$node_modules$2f$bs58$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encode"](bytes)
                    }
                }
            ]
        });
        return resp.map(({ pubkey, account })=>{
            return {
                publicKey: pubkey,
                account: this._coder.accounts.decode(this._idlAccount.name, account.data)
            };
        });
    }
    /**
     * Returns an `EventEmitter` emitting a "change" event whenever the account
     * changes.
     */ subscribe(address, commitment) {
        if (subscriptions.get(address.toString())) {
            return subscriptions.get(address.toString()).ee;
        }
        const ee = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$eventemitter3$40$4$2e$0$2e$7$2f$node_modules$2f$eventemitter3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]();
        address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["translateAddress"])(address);
        const listener = this._provider.connection.onAccountChange(address, (acc)=>{
            const account = this._coder.accounts.decode(this._idlAccount.name, acc.data);
            ee.emit("change", account);
        }, commitment);
        subscriptions.set(address.toString(), {
            ee,
            listener
        });
        return ee;
    }
    /**
     * Unsubscribes from the account at the given address.
     */ unsubscribe(address) {
        let sub = subscriptions.get(address.toString());
        if (!sub) {
            console.warn("Address is not subscribed");
            return;
        }
        if (subscriptions) {
            this._provider.connection.removeAccountChangeListener(sub.listener).then(()=>{
                subscriptions.delete(address.toString());
            }).catch(console.error);
        }
    }
    /**
     * Returns an instruction for creating this account.
     */ async createInstruction(signer, sizeOverride) {
        const size = this.size;
        return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SystemProgram"].createAccount({
            fromPubkey: this._provider.wallet.publicKey,
            newAccountPubkey: signer.publicKey,
            space: sizeOverride !== null && sizeOverride !== void 0 ? sizeOverride : size,
            lamports: await this._provider.connection.getMinimumBalanceForRentExemption(sizeOverride !== null && sizeOverride !== void 0 ? sizeOverride : size),
            programId: this._programId
        });
    }
    /**
     * Function returning the associated account. Args are keys to associate.
     * Order matters.
     */ async associated(...args) {
        const addr = await this.associatedAddress(...args);
        return await this.fetch(addr);
    }
    /**
     * Function returning the associated address. Args are keys to associate.
     * Order matters.
     */ async associatedAddress(...args) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$pubkey$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["associated"](this._programId, ...args);
    }
}
// Tracks all subscriptions.
const subscriptions = new Map(); //# sourceMappingURL=account.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/event.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EventParser",
    ()=>EventParser
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$assert__$5b$external$5d$__$28$assert$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/assert [external] (assert, cjs)");
;
const LOG_START_INDEX = "Program log: ".length;
class EventParser {
    constructor(coder, programId){
        this.coder = coder;
        this.programId = programId;
    }
    // Each log given, represents an array of messages emitted by
    // a single transaction, which can execute many different programs across
    // CPI boundaries. However, the subscription is only interested in the
    // events emitted by *this* program. In achieving this, we keep track of the
    // program execution context by parsing each log and looking for a CPI
    // `invoke` call. If one exists, we know a new program is executing. So we
    // push the programId onto a stack and switch the program context. This
    // allows us to track, for a given log, which program was executing during
    // its emission, thereby allowing us to know if a given log event was
    // emitted by *this* program. If it was, then we parse the raw string and
    // emit the event if the string matches the event being subscribed to.
    parseLogs(logs, callback) {
        const logScanner = new LogScanner(logs);
        const execution = new ExecutionContext(logScanner.next());
        let log = logScanner.next();
        while(log !== null){
            let [event, newProgram, didPop] = this.handleLog(execution, log);
            if (event) {
                callback(event);
            }
            if (newProgram) {
                execution.push(newProgram);
            }
            if (didPop) {
                execution.pop();
            }
            log = logScanner.next();
        }
    }
    // Main log handler. Returns a three element array of the event, the
    // next program that was invoked for CPI, and a boolean indicating if
    // a program has completed execution (and thus should be popped off the
    // execution stack).
    handleLog(execution, log) {
        // Executing program is this program.
        if (execution.program() === this.programId.toString()) {
            return this.handleProgramLog(log);
        } else {
            return [
                null,
                ...this.handleSystemLog(log)
            ];
        }
    }
    // Handles logs from *this* program.
    handleProgramLog(log) {
        // This is a `msg!` log.
        if (log.startsWith("Program log:")) {
            const logStr = log.slice(LOG_START_INDEX);
            const event = this.coder.events.decode(logStr);
            return [
                event,
                null,
                false
            ];
        } else {
            return [
                null,
                ...this.handleSystemLog(log)
            ];
        }
    }
    // Handles logs when the current program being executing is *not* this.
    handleSystemLog(log) {
        // System component.
        const logStart = log.split(":")[0];
        // Did the program finish executing?
        if (logStart.match(/^Program (.*) success/g) !== null) {
            return [
                null,
                true
            ];
        // Recursive call.
        } else if (logStart.startsWith(`Program ${this.programId.toString()} invoke`)) {
            return [
                this.programId.toString(),
                false
            ];
        } else if (logStart.includes("invoke")) {
            return [
                "cpi",
                false
            ]; // Any string will do.
        } else {
            return [
                null,
                false
            ];
        }
    }
}
// Stack frame execution context, allowing one to track what program is
// executing for a given log.
class ExecutionContext {
    constructor(log){
        // Assumes the first log in every transaction is an `invoke` log from the
        // runtime.
        const program = /^Program (.*) invoke.*$/g.exec(log)[1];
        this.stack = [
            program
        ];
    }
    program() {
        __TURBOPACK__imported__module__$5b$externals$5d2f$assert__$5b$external$5d$__$28$assert$2c$__cjs$29$__["ok"](this.stack.length > 0);
        return this.stack[this.stack.length - 1];
    }
    push(newProgram) {
        this.stack.push(newProgram);
    }
    pop() {
        __TURBOPACK__imported__module__$5b$externals$5d2f$assert__$5b$external$5d$__$28$assert$2c$__cjs$29$__["ok"](this.stack.length > 0);
        this.stack.pop();
    }
}
class LogScanner {
    constructor(logs){
        this.logs = logs;
    }
    next() {
        if (this.logs.length === 0) {
            return null;
        }
        let l = this.logs[0];
        this.logs = this.logs.slice(1);
        return l;
    }
} //# sourceMappingURL=event.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/namespace/simulate.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SimulateFactory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$context$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/context.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$event$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/event.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/error.js [app-route] (ecmascript)");
;
;
;
class SimulateFactory {
    static build(idlIx, txFn, idlErrors, provider, coder, programId, idl) {
        const simulate = async (...args)=>{
            const tx = txFn(...args);
            const [, ctx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$context$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["splitArgsAndCtx"])(idlIx, [
                ...args
            ]);
            let resp = undefined;
            try {
                resp = await provider.simulate(tx, ctx.signers, ctx.options);
            } catch (err) {
                console.log("Translating error", err);
                let translatedErr = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ProgramError"].parse(err, idlErrors);
                if (translatedErr === null) {
                    throw err;
                }
                throw translatedErr;
            }
            if (resp === undefined) {
                throw new Error("Unable to simulate transaction");
            }
            if (resp.value.err) {
                throw new Error(`Simulate error: ${resp.value.err.toString()}`);
            }
            const logs = resp.value.logs;
            if (!logs) {
                throw new Error("Simulated logs not found");
            }
            const events = [];
            if (idl.events) {
                let parser = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$event$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EventParser"](coder, programId);
                parser.parseLogs(logs, (event)=>{
                    events.push(event);
                });
            }
            return {
                events,
                raw: logs
            };
        };
        return simulate;
    }
} //# sourceMappingURL=simulate.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/namespace/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NamespaceFactory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$camelcase$40$5$2e$3$2e$1$2f$node_modules$2f$camelcase$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/camelcase@5.3.1/node_modules/camelcase/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$namespace$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/namespace/state.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$namespace$2f$instruction$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/namespace/instruction.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$namespace$2f$transaction$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/namespace/transaction.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$namespace$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/namespace/rpc.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$namespace$2f$account$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/namespace/account.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$namespace$2f$simulate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/namespace/simulate.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/common.js [app-route] (ecmascript)");
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
class NamespaceFactory {
    /**
     * Generates all namespaces for a given program.
     */ static build(idl, coder, programId, provider) {
        const rpc = {};
        const instruction = {};
        const transaction = {};
        const simulate = {};
        const idlErrors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseIdlErrors"])(idl);
        const state = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$namespace$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].build(idl, coder, programId, provider);
        idl.instructions.forEach((idlIx)=>{
            const ixItem = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$namespace$2f$instruction$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].build(idlIx, (ixName, ix)=>coder.instruction.encode(ixName, ix), programId);
            const txItem = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$namespace$2f$transaction$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].build(idlIx, ixItem);
            const rpcItem = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$namespace$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].build(idlIx, txItem, idlErrors, provider);
            const simulateItem = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$namespace$2f$simulate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].build(idlIx, txItem, idlErrors, provider, coder, programId, idl);
            const name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$camelcase$40$5$2e$3$2e$1$2f$node_modules$2f$camelcase$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(idlIx.name);
            instruction[name] = ixItem;
            transaction[name] = txItem;
            rpc[name] = rpcItem;
            simulate[name] = simulateItem;
        });
        const account = idl.accounts ? __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$namespace$2f$account$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].build(idl, coder, programId, provider) : {};
        return [
            rpc,
            instruction,
            transaction,
            account,
            simulate,
            state
        ];
    }
} //# sourceMappingURL=index.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/bytes/hex.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decode",
    ()=>decode,
    "encode",
    ()=>encode
]);
function encode(data) {
    return data.reduce((str, byte)=>str + byte.toString(16).padStart(2, "0"), "0x");
}
function decode(data) {
    if (data.indexOf("0x") === 0) {
        data = data.substr(2);
    }
    if (data.length % 2 === 1) {
        data = "0" + data;
    }
    let key = data.match(/.{2}/g);
    if (key === null) {
        return Buffer.from([]);
    }
    return Buffer.from(key.map((byte)=>parseInt(byte, 16)));
} //# sourceMappingURL=hex.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/bytes/utf8.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decode",
    ()=>decode,
    "encode",
    ()=>encode
]);
function decode(array) {
    const decoder = typeof TextDecoder === "undefined" ? new (__turbopack_context__.r("[externals]/util [external] (util, cjs)")).TextDecoder("utf-8") // Node.
     : new TextDecoder("utf-8"); // Browser.
    return decoder.decode(array);
}
function encode(input) {
    const encoder = typeof TextEncoder === "undefined" ? new (__turbopack_context__.r("[externals]/util [external] (util, cjs)")).TextEncoder("utf-8") // Node.
     : new TextEncoder(); // Browser.
    return encoder.encode(input);
} //# sourceMappingURL=utf8.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/bytes/bs58.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decode",
    ()=>decode,
    "encode",
    ()=>encode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$4$2e$0$2e$1$2f$node_modules$2f$bs58$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bs58@4.0.1/node_modules/bs58/index.js [app-route] (ecmascript)");
;
function encode(data) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$4$2e$0$2e$1$2f$node_modules$2f$bs58$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encode"](data);
}
function decode(data) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$4$2e$0$2e$1$2f$node_modules$2f$bs58$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decode"](data);
} //# sourceMappingURL=bs58.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/bytes/base64.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decode",
    ()=>decode,
    "encode",
    ()=>encode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$base64$2d$js$40$1$2e$5$2e$1$2f$node_modules$2f$base64$2d$js$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/base64-js@1.5.1/node_modules/base64-js/index.js [app-route] (ecmascript)");
;
function encode(data) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$base64$2d$js$40$1$2e$5$2e$1$2f$node_modules$2f$base64$2d$js$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromByteArray"](data);
}
function decode(data) {
    return Buffer.from(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$base64$2d$js$40$1$2e$5$2e$1$2f$node_modules$2f$base64$2d$js$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toByteArray"](data));
} //# sourceMappingURL=base64.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/bytes/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$bytes$2f$hex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/bytes/hex.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$bytes$2f$utf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/bytes/utf8.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$bytes$2f$bs58$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/bytes/bs58.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$bytes$2f$base64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/bytes/base64.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
 //# sourceMappingURL=index.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/bytes/utf8.js [app-route] (ecmascript) <export * as utf8>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "utf8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$bytes$2f$utf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$bytes$2f$utf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/bytes/utf8.js [app-route] (ecmascript)");
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Program",
    ()=>Program
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$pako$40$2$2e$1$2e$0$2f$node_modules$2f$pako$2f$dist$2f$pako$2e$esm$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/pako@2.1.0/node_modules/pako/dist/pako.esm.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$idl$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/idl.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$namespace$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/namespace/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/provider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$bytes$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/bytes/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$bytes$2f$utf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__utf8$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/bytes/utf8.js [app-route] (ecmascript) <export * as utf8>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$event$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/event.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/common.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
class Program {
    /**
     * @param idl       The interface definition.
     * @param programId The on-chain address of the program.
     * @param provider  The network and wallet context to use. If not provided
     *                  then uses [[getProvider]].
     */ constructor(idl, programId, provider){
        programId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["translateAddress"])(programId);
        // Fields.
        this._idl = idl;
        this._programId = programId;
        this._provider = provider !== null && provider !== void 0 ? provider : (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getProvider"])();
        this._coder = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"](idl);
        // Dynamic namespaces.
        const [rpc, instruction, transaction, account, simulate, state] = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$namespace$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].build(idl, this._coder, programId, this._provider);
        this.rpc = rpc;
        this.instruction = instruction;
        this.transaction = transaction;
        this.account = account;
        this.simulate = simulate;
        this.state = state;
    }
    /**
     * Address of the program.
     */ get programId() {
        return this._programId;
    }
    /**
     * IDL defining the program's interface.
     */ get idl() {
        return this._idl;
    }
    /**
     * Coder for serializing requests.
     */ get coder() {
        return this._coder;
    }
    /**
     * Wallet and network provider.
     */ get provider() {
        return this._provider;
    }
    /**
     * Generates a Program client by fetching the IDL from the network.
     *
     * In order to use this method, an IDL must have been previously initialized
     * via the anchor CLI's `anchor idl init` command.
     *
     * @param programId The on-chain address of the program.
     * @param provider  The network and wallet context.
     */ static async at(address, provider) {
        const programId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["translateAddress"])(address);
        const idl = await Program.fetchIdl(programId, provider);
        return new Program(idl, programId, provider);
    }
    /**
     * Fetches an idl from the blockchain.
     *
     * In order to use this method, an IDL must have been previously initialized
     * via the anchor CLI's `anchor idl init` command.
     *
     * @param programId The on-chain address of the program.
     * @param provider  The network and wallet context.
     */ static async fetchIdl(address, provider) {
        provider = provider !== null && provider !== void 0 ? provider : (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getProvider"])();
        const programId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["translateAddress"])(address);
        const idlAddr = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$idl$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["idlAddress"])(programId);
        const accountInfo = await provider.connection.getAccountInfo(idlAddr);
        // Chop off account discriminator.
        let idlAccount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$idl$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeIdlAccount"])(accountInfo.data.slice(8));
        const inflatedIdl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$pako$40$2$2e$1$2e$0$2f$node_modules$2f$pako$2f$dist$2f$pako$2e$esm$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["inflate"])(idlAccount.data);
        return JSON.parse(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$bytes$2f$utf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__utf8$3e$__["utf8"].decode(inflatedIdl));
    }
    /**
     * Invokes the given callback every time the given event is emitted.
     *
     * @param eventName The PascalCase name of the event, provided by the IDL.
     * @param callback  The function to invoke whenever the event is emitted from
     *                  program logs.
     */ addEventListener(eventName, callback) {
        const eventParser = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$event$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EventParser"](this._coder, this._programId);
        return this._provider.connection.onLogs(this._programId, (logs, ctx)=>{
            if (logs.err) {
                console.error(logs);
                return;
            }
            eventParser.parseLogs(logs.logs, (event)=>{
                if (event.name === eventName) {
                    callback(event.data, ctx.slot);
                }
            });
        });
    }
    /**
     * Unsubscribes from the given event listener.
     */ async removeEventListener(listener) {
        return this._provider.connection.removeOnLogsListener(listener);
    }
} //# sourceMappingURL=index.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/workspace.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$camelcase$40$5$2e$3$2e$1$2f$node_modules$2f$camelcase$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/camelcase@5.3.1/node_modules/camelcase/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$toml$40$3$2e$0$2e$0$2f$node_modules$2f$toml$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/toml@3.0.0/node_modules/toml/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/common.js [app-route] (ecmascript)");
;
;
;
;
;
let _populatedWorkspace = false;
/**
 * The `workspace` namespace provides a convenience API to automatically
 * search for and deserialize [[Program]] objects defined by compiled IDLs
 * in an Anchor workspace.
 *
 * This API is for Node only.
 */ const workspace = new Proxy({}, {
    get (workspaceCache, programName) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isBrowser"]) {
            console.log("Workspaces aren't available in the browser");
            return undefined;
        }
        const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
        const process = __turbopack_context__.r("[externals]/process [external] (process, cjs)");
        if (!_populatedWorkspace) {
            const path = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
            let projectRoot = process.cwd();
            while(!fs.existsSync(path.join(projectRoot, "Anchor.toml"))){
                const parentDir = path.dirname(projectRoot);
                if (parentDir === projectRoot) {
                    projectRoot = undefined;
                }
                projectRoot = parentDir;
            }
            if (projectRoot === undefined) {
                throw new Error("Could not find workspace root.");
            }
            const idlFolder = `${projectRoot}/target/idl`;
            if (!fs.existsSync(idlFolder)) {
                throw new Error(`${idlFolder} doesn't exist. Did you use "anchor build"?`);
            }
            const idlMap = new Map();
            fs.readdirSync(idlFolder).forEach((file)=>{
                const filePath = `${idlFolder}/${file}`;
                const idlStr = fs.readFileSync(filePath);
                const idl = JSON.parse(idlStr);
                idlMap.set(idl.name, idl);
                const name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$camelcase$40$5$2e$3$2e$1$2f$node_modules$2f$camelcase$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(idl.name, {
                    pascalCase: true
                });
                if (idl.metadata && idl.metadata.address) {
                    workspaceCache[name] = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Program"](idl, new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"](idl.metadata.address));
                }
            });
            // Override the workspace programs if the user put them in the config.
            const anchorToml = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$toml$40$3$2e$0$2e$0$2f$node_modules$2f$toml$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parse"](fs.readFileSync(path.join(projectRoot, "Anchor.toml"), "utf-8"));
            const clusterId = anchorToml.provider.cluster;
            if (anchorToml.clusters && anchorToml.clusters[clusterId]) {
                attachWorkspaceOverride(workspaceCache, anchorToml.clusters[clusterId], idlMap);
            }
            _populatedWorkspace = true;
        }
        return workspaceCache[programName];
    }
});
function attachWorkspaceOverride(workspaceCache, overrideConfig, idlMap) {
    Object.keys(overrideConfig).forEach((programName)=>{
        const wsProgramName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$camelcase$40$5$2e$3$2e$1$2f$node_modules$2f$camelcase$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(programName, {
            pascalCase: true
        });
        const entry = overrideConfig[programName];
        const overrideAddress = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"](typeof entry === "string" ? entry : entry.address);
        let idl = idlMap.get(programName);
        if (typeof entry !== "string" && entry.idl) {
            idl = JSON.parse(__turbopack_context__.r("[externals]/fs [external] (fs, cjs)").readFileSync(entry.idl, "utf-8"));
        }
        workspaceCache[wsProgramName] = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Program"](idl, overrideAddress);
    });
}
const __TURBOPACK__default__export__ = workspace;
 //# sourceMappingURL=workspace.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/sha256.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hash",
    ()=>hash
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$js$2d$sha256$40$0$2e$9$2e$0$2f$node_modules$2f$js$2d$sha256$2f$src$2f$sha256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/js-sha256@0.9.0/node_modules/js-sha256/src/sha256.js [app-route] (ecmascript)");
;
function hash(data) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$js$2d$sha256$40$0$2e$9$2e$0$2f$node_modules$2f$js$2d$sha256$2f$src$2f$sha256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha256"])(data);
} //# sourceMappingURL=sha256.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/rpc.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMultipleAccounts",
    ()=>getMultipleAccounts,
    "invoke",
    ()=>invoke
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$assert__$5b$external$5d$__$28$assert$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/assert [external] (assert, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/common.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/provider.js [app-route] (ecmascript)");
;
;
;
;
async function invoke(programId, accounts, data, provider) {
    programId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["translateAddress"])(programId);
    if (!provider) {
        provider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getProvider"])();
    }
    const tx = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Transaction"]();
    tx.add(new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TransactionInstruction"]({
        programId,
        keys: accounts !== null && accounts !== void 0 ? accounts : [],
        data
    }));
    return await provider.send(tx);
}
async function getMultipleAccounts(connection, publicKeys) {
    const args = [
        publicKeys.map((k)=>k.toBase58()),
        {
            commitment: "recent"
        }
    ];
    // @ts-ignore
    const res = await connection._rpcRequest("getMultipleAccounts", args);
    if (res.error) {
        throw new Error("failed to get info about accounts " + publicKeys.map((k)=>k.toBase58()).join(", ") + ": " + res.error.message);
    }
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$assert__$5b$external$5d$__$28$assert$2c$__cjs$29$__["default"])(typeof res.result !== "undefined");
    const accounts = [];
    for (const account of res.result.value){
        let value = null;
        if (account === null) {
            accounts.push(null);
            continue;
        }
        if (res.result.value) {
            const { executable, owner, lamports, data } = account;
            (0, __TURBOPACK__imported__module__$5b$externals$5d2f$assert__$5b$external$5d$__$28$assert$2c$__cjs$29$__["default"])(data[1] === "base64");
            value = {
                executable,
                owner: new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"](owner),
                lamports,
                data: Buffer.from(data[0], "base64")
            };
        }
        if (value === null) {
            throw new Error("Invalid response");
        }
        accounts.push(value);
    }
    return accounts.map((account, idx)=>{
        if (account === null) {
            return null;
        }
        return {
            publicKey: publicKeys[idx],
            account
        };
    });
} //# sourceMappingURL=rpc.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/bytes/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "base64",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$bytes$2f$base64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    "bs58",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$bytes$2f$bs58$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    "hex",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$bytes$2f$hex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    "utf8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$bytes$2f$utf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$bytes$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/bytes/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$bytes$2f$hex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/bytes/hex.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$bytes$2f$utf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/bytes/utf8.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$bytes$2f$bs58$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/bytes/bs58.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$bytes$2f$base64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/bytes/base64.js [app-route] (ecmascript)");
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/token.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "associatedAddress",
    ()=>associatedAddress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
;
const TOKEN_PROGRAM_ID = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"]("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
const ASSOCIATED_PROGRAM_ID = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"]("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");
async function associatedAddress({ mint, owner }) {
    return (await __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"].findProgramAddress([
        owner.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        mint.toBuffer()
    ], ASSOCIATED_PROGRAM_ID))[0];
} //# sourceMappingURL=token.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$sha256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/sha256.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/rpc.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$pubkey$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/pubkey.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$bytes$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/bytes/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$bytes$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/bytes/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$token$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/token.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$features$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/features.js [app-route] (ecmascript)");
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
 //# sourceMappingURL=index.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bytes",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$bytes$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    "features",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$features$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    "publicKey",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$pubkey$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    "rpc",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    "sha256",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$sha256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    "token",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$token$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$sha256$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/sha256.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/rpc.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$pubkey$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/pubkey.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$bytes$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/bytes/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$token$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/token.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$features$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/features.js [app-route] (ecmascript)");
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bn.js@5.2.2/node_modules/bn.js/lib/bn.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/provider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$instruction$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/instruction.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$event$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/event.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/state.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/types.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$accounts$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/accounts.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$workspace$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/workspace.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$namespace$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/namespace/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$namespace$2f$account$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/namespace/account.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$namespace$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/namespace/state.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
 //# sourceMappingURL=index.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AccountClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$namespace$2f$account$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AccountClient"],
    "AccountsCoder",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$accounts$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AccountsCoder"],
    "BN",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"],
    "Coder",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"],
    "EventCoder",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$event$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EventCoder"],
    "InstructionCoder",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$instruction$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InstructionCoder"],
    "Program",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Program"],
    "Provider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"],
    "StateClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$namespace$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StateClient"],
    "StateCoder",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StateCoder"],
    "TypesCoder",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TypesCoder"],
    "Wallet",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NodeWallet"],
    "getProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getProvider"],
    "setProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setProvider"],
    "utils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    "web3",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    "workspace",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$workspace$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bn.js@5.2.2/node_modules/bn.js/lib/bn.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/provider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$instruction$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/instruction.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$event$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/event.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/state.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/types.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$coder$2f$accounts$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/coder/accounts.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$workspace$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/workspace.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/utils/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$namespace$2f$account$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/namespace/account.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$project$2d$serum$2b$anchor$40$0$2e$11$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$project$2d$serum$2f$anchor$2f$dist$2f$esm$2f$program$2f$namespace$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/program/namespace/state.js [app-route] (ecmascript)");
}),
];

//# sourceMappingURL=c15ac_%40project-serum_anchor_dist_esm_dcd12d57._.js.map