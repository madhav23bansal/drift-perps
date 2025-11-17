module.exports = [
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/instruction-utils/InstructionUtils.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InstructionUtils",
    ()=>InstructionUtils
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$30$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.30.1_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript) <export * as web3>");
var __awaiter = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
class InstructionUtils {
    /**
     *  Disable instantiation of the InstructionUtils class
     */ constructor(){}
    /**
     * Function to convert transaction instructions to a versioned transaction.
     *
     * @param {object} params - The parameters object.
     * @param {web3.Connection} params.connection - The connection to use.
     * @param {web3.TransactionInstruction[]} params.ixs - The transaction instructions.
     * @param {web3.PublicKey} [params.payer] - The payer for the transaction.
     * @param {number} [params.computeUnitLimitMultiple] - The compute units to cap the transaction as a multiple of the simulated units consumed (e.g., 1.25x).
     * @param {number} [params.computeUnitPrice] - The price per compute unit in microlamports.
     * @param {web3.AddressLookupTableAccount[]} [params.lookupTables] - The address lookup tables.
     * @param {web3.Signer[]} [params.signers] - The signers for the transaction.
     * @returns {Promise<web3.VersionedTransaction>} A promise that resolves to the versioned transaction.
     */ static asV0TxWithComputeIxs(params) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f;
            let payer = params.payer;
            if (!payer) {
                if (!((_a = params.signers) === null || _a === void 0 ? void 0 : _a.length)) {
                    throw new Error('Payer not provided');
                }
                payer = params.signers[0].publicKey;
            }
            const priorityFeeIx = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].ComputeBudgetProgram.setComputeUnitPrice({
                microLamports: (_b = params.computeUnitPrice) !== null && _b !== void 0 ? _b : 0
            });
            const simulationComputeLimitIx = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].ComputeBudgetProgram.setComputeUnitLimit({
                units: 1400000
            });
            const recentBlockhash = (yield params.connection.getLatestBlockhash()).blockhash;
            const simulateMessageV0 = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].TransactionMessage({
                recentBlockhash,
                instructions: [
                    ...params.ixs,
                    priorityFeeIx,
                    simulationComputeLimitIx
                ],
                payerKey: payer
            }).compileToV0Message((_c = params.lookupTables) !== null && _c !== void 0 ? _c : []);
            const simulateTx = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].VersionedTransaction(simulateMessageV0);
            try {
                simulateTx.serialize();
            } catch (e) {
                if (e instanceof RangeError) {
                    throw new Error('Transaction failed to serialize: Transaction too large');
                }
                throw e;
            }
            const simulationResult = yield params.connection.simulateTransaction(simulateTx, {
                commitment: 'processed',
                sigVerify: false
            });
            const simulationUnitsConsumed = simulationResult.value.unitsConsumed;
            const computeLimitIx = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].ComputeBudgetProgram.setComputeUnitLimit({
                units: Math.floor(simulationUnitsConsumed * ((_d = params.computeUnitLimitMultiple) !== null && _d !== void 0 ? _d : 1))
            });
            const messageV0 = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].TransactionMessage({
                recentBlockhash,
                instructions: [
                    ...params.ixs,
                    priorityFeeIx,
                    computeLimitIx
                ],
                payerKey: payer
            }).compileToV0Message((_e = params.lookupTables) !== null && _e !== void 0 ? _e : []);
            const tx = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].VersionedTransaction(messageV0);
            tx.sign((_f = params.signers) !== null && _f !== void 0 ? _f : []);
            return tx;
        });
    }
} //# sourceMappingURL=InstructionUtils.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/instruction-utils/Secp256k1InstructionUtils.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Secp256k1InstructionUtils",
    ()=>Secp256k1InstructionUtils
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$30$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.30.1_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript) <export * as web3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/index.js [app-route] (ecmascript)");
;
;
// The serialized size of a secp256k1 signature
const SIGNATURE_SERIALIZED_SIZE = 64;
// The serialized size of a hashed pubkey
const HASHED_PUBKEY_SERIALIZED_SIZE = 20;
// The serialized size of the signature offsets
const SIGNATURE_OFFSETS_SERIALIZED_SIZE = 11;
class Secp256k1InstructionUtils {
    /**
     *  Disable instantiation of the InstructionUtils class
     */ constructor(){}
    static buildSecp256k1Instruction(signatures, instructionIndex) {
        // Ensure that the `instructionIndex` is both a valid finite number and non-negative
        if (!Number.isFinite(instructionIndex) || instructionIndex < 0) {
            throw new Error('Invalid instruction index');
        }
        // Ensure that the `signatures` array is non-empty and that all signatures share the same
        // common message
        __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NonEmptyArrayUtils"].validate(signatures);
        const diffIdx = signatures.findIndex((sig)=>!sig.message.equals(signatures[0].message));
        if (diffIdx !== -1) {
            const expectedMessage = signatures[0].message.toString('base64');
            const differentMessage = signatures[diffIdx].message.toString('base64');
            throw new Error(`
        All signatures must share the same message. The signed message at #${diffIdx}
        (${differentMessage}) does not match the expected message (${expectedMessage})
      `);
        }
        // We've validated that all signatures share the same message, so we can use the first
        // signature's message as the common message.
        const commonMessage = signatures[0].message;
        const commonMessageSize = commonMessage.length;
        const signatureBlockSize = SIGNATURE_SERIALIZED_SIZE + 1 + HASHED_PUBKEY_SERIALIZED_SIZE;
        const numSignatures = signatures.length;
        const offsetsAreaSize = 1 + numSignatures * SIGNATURE_OFFSETS_SERIALIZED_SIZE;
        const messageOffset = offsetsAreaSize + numSignatures * signatureBlockSize;
        const signatureOffsets = [];
        const signatureBuffer = [];
        for (const sig of signatures){
            // Calculate the offset of the current signature block
            const currentOffset = offsetsAreaSize + signatureBuffer.length;
            // Create a new Uint8Array to store the signature offsets
            const offsetsBytes = new Uint8Array(SIGNATURE_OFFSETS_SERIALIZED_SIZE);
            let position = 0;
            // Write signature offset (2 bytes LE)
            const signatureOffset = currentOffset;
            offsetsBytes.set(writeUInt16LE(signatureOffset), position);
            position += 2;
            // 1. Write signature instruction index (1 byte)
            offsetsBytes[position] = instructionIndex;
            position += 1;
            // 2. Write eth address offset (2 bytes LE)
            const ethAddressOffset = currentOffset + SIGNATURE_SERIALIZED_SIZE + 1;
            offsetsBytes.set(writeUInt16LE(ethAddressOffset), position);
            position += 2;
            // 3. Write eth address instruction index (1 byte)
            offsetsBytes[position] = instructionIndex;
            position += 1;
            // 4. Write message offset (2 bytes LE)
            const messageDataOffset = messageOffset;
            offsetsBytes.set(writeUInt16LE(messageDataOffset), position);
            position += 2;
            // 5. Write message size (2 bytes LE)
            offsetsBytes.set(writeUInt16LE(commonMessageSize), position);
            position += 2;
            // 6. Write message instruction index (1 byte)
            offsetsBytes[position] = instructionIndex;
            // Append the signature offsets to the list of signature offsets
            signatureOffsets.push(offsetsBytes);
            // Append the signature block to the signature buffer
            signatureBuffer.push(...Array.from(sig.signature));
            signatureBuffer.push(sig.recoveryId);
            signatureBuffer.push(...Array.from(sig.ethAddress));
        }
        // Build final instruction data
        let position = 0;
        const instrData = new Uint8Array(1 + // count byte
        signatureOffsets.length * SIGNATURE_OFFSETS_SERIALIZED_SIZE + // offsets area
        signatureBuffer.length + // signature blocks
        commonMessage.length // common message
        );
        // 1. Write count byte
        instrData[position] = numSignatures;
        position += 1;
        // 2. Write offsets area
        for (const offs of signatureOffsets){
            instrData.set(offs, position);
            position += SIGNATURE_OFFSETS_SERIALIZED_SIZE;
        }
        // 3. Write signature blocks
        instrData.set(new Uint8Array(signatureBuffer), position);
        position += signatureBuffer.length;
        // 4. Write common message
        instrData.set(commonMessage, position);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].TransactionInstruction({
            programId: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].Secp256k1Program.programId,
            data: Buffer.from(instrData),
            keys: []
        });
    }
}
function writeUInt16LE(value) {
    const buf = Buffer.alloc(2);
    buf.writeUInt16LE(value, 0);
    return new Uint8Array(buf);
} //# sourceMappingURL=Secp256k1InstructionUtils.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/instruction-utils/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$instruction$2d$utils$2f$InstructionUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/instruction-utils/InstructionUtils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$instruction$2d$utils$2f$Secp256k1InstructionUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/instruction-utils/Secp256k1InstructionUtils.js [app-route] (ecmascript)"); //# sourceMappingURL=index.js.map
;
;
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/constants.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SOL_NATIVE_MINT",
    ()=>SOL_NATIVE_MINT,
    "SOL_NATIVE_MINT_2022",
    ()=>SOL_NATIVE_MINT_2022,
    "SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID",
    ()=>SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    "SPL_SYSVAR_INSTRUCTIONS_ID",
    ()=>SPL_SYSVAR_INSTRUCTIONS_ID,
    "SPL_SYSVAR_SLOT_HASHES_ID",
    ()=>SPL_SYSVAR_SLOT_HASHES_ID,
    "SPL_TOKEN_2022_PROGRAM_ID",
    ()=>SPL_TOKEN_2022_PROGRAM_ID,
    "SPL_TOKEN_PROGRAM_ID",
    ()=>SPL_TOKEN_PROGRAM_ID
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$30$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.30.1_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript) <export * as web3>");
;
const SPL_TOKEN_PROGRAM_ID = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
const SPL_SYSVAR_SLOT_HASHES_ID = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey('SysvarS1otHashes111111111111111111111111111');
const SPL_SYSVAR_INSTRUCTIONS_ID = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey('Sysvar1nstructions1111111111111111111111111');
const SPL_TOKEN_2022_PROGRAM_ID = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey('TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb');
const SOL_NATIVE_MINT = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey('So11111111111111111111111111111111111111112');
const SOL_NATIVE_MINT_2022 = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey('9pan9bMn5HatX4EJdBwg9VgCa7Uz5HL8N1m5D3NdXejP'); //# sourceMappingURL=constants.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/utils/lookupTable.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getLutKey",
    ()=>getLutKey,
    "getLutSigner",
    ()=>getLutSigner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$30$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.30.1_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript) <export * as web3>");
;
function getLutSigner(programId, pubkey) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.findProgramAddressSync([
        Buffer.from('LutSigner'),
        pubkey.toBuffer()
    ], programId)[0];
}
function getLutKey(lutSigner, lutSlot) {
    const lutKey = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].AddressLookupTableProgram.createLookupTable({
        authority: lutSigner,
        payer: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.default,
        recentSlot: BigInt(lutSlot.toString())
    })[1];
    return lutKey;
} //# sourceMappingURL=lookupTable.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/utils/cache.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GATEWAY_PING_CACHE",
    ()=>GATEWAY_PING_CACHE
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$isaacs$2b$ttlcache$40$1$2e$4$2e$1$2f$node_modules$2f40$isaacs$2f$ttlcache$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@isaacs+ttlcache@1.4.1/node_modules/@isaacs/ttlcache/index.js [app-route] (ecmascript)");
;
const GATEWAY_PING_CACHE = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$isaacs$2b$ttlcache$40$1$2e$4$2e$1$2f$node_modules$2f40$isaacs$2f$ttlcache$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]({
    ttl: 1000 * 60
}); //# sourceMappingURL=cache.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/oracle-interfaces/gateway.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Gateway",
    ()=>Gateway
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/utils/cache.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/axios@1.13.2/node_modules/axios/lib/axios.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$6$2e$0$2e$0$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bs58@6.0.0/node_modules/bs58/src/esm/index.js [app-route] (ecmascript)");
var __awaiter = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
;
;
;
// const httpsAgent = new HttpsAgent({
//   rejectUnauthorized: false, // WARNING: This disables SSL/TLS certificate verification.
// });
const TIMEOUT = 10000;
const axiosClient = (()=>{
    let instance;
    return ()=>instance !== null && instance !== void 0 ? instance : instance = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create();
})();
/**
 *  `base64` encodes an array of oracle jobs. to send to a gateway
 */ function encodeJobs(jobArray) {
    return jobArray.map((job)=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OracleJobUtils"].serializeOracleJob(job).toString('base64'));
}
class Gateway {
    /**
     *  Constructs a `Gateway` instance.
     *
     *  @param program The Anchor program instance.
     *  @param gatewayUrl The URL of the switchboard gateway.
     */ constructor(program, gatewayUrl, oracleKey){
        this.program = program;
        this.gatewayUrl = gatewayUrl;
        this.oracleKey = oracleKey;
    }
    /**
     *  Fetches signatures from the gateway.
     *
     *  REST API endpoint: /api/v1/fetch_signatures
     *
     *  @param recentHash The chain metadata to sign with. Blockhash or slothash.
     *  @param encodedJobs The base64 encoded oracle jobs.
     *  @param numSignatures The number of oracles to fetch signatures from.
     *  @returns A promise that resolves to the feed evaluation responses.
     *  @throws if the request fails.
     */ fetchSignaturesFromEncoded(params) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a;
            // TODO: have total NumOracles count against rate limit per IP
            const { recentHash, encodedJobs, numSignatures } = params;
            const url = `${this.gatewayUrl}/gateway/api/v1/fetch_signatures`;
            const headers = {
                'Content-Type': 'application/json'
            };
            const maxVariance = params.maxVariance * 1e9;
            const body = JSON.stringify({
                api_version: '1.0.0',
                jobs_b64_encoded: encodedJobs,
                recent_chainhash: recentHash !== null && recentHash !== void 0 ? recentHash : __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$6$2e$0$2e$0$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].encode(Buffer.alloc(32, 0)),
                signature_scheme: 'Secp256k1',
                hash_scheme: 'Sha256',
                num_oracles: numSignatures,
                max_variance: maxVariance,
                min_responses: params.minResponses,
                use_timestamp: (_a = params.useTimestamp) !== null && _a !== void 0 ? _a : false
            });
            return axiosClient().post(url, body, {
                headers,
                timeout: TIMEOUT
            }).then((r)=>r.data);
        });
    }
    ping() {
        return __awaiter(this, void 0, void 0, function*() {
            const url = `${this.gatewayUrl}/gateway/api/v1/ping`;
            const method = 'POST';
            const headers = {
                'Content-Type': 'application/json'
            };
            const body = JSON.stringify({
                api_version: '1.0.0'
            });
            return axiosClient().post(url, body, {
                method,
                headers,
                timeout: TIMEOUT
            }).then((r)=>r.data);
        });
    }
    /**
     *
     * Fetches signatures from the gateway.
     * REST API endpoint: /api/v1/gateway_attest_enclave
     * @param timestamp The timestamp of the attestation
     * @param quote The quote of the attestation
     * @param oracle_pubkey The oracle's public key
     * @param oracle_reward_wallet The oracle's reward wallet
     * @param oracle_ed25519_enclave_signer The oracle's ed25519 enclave signer
     * @param oracle_secp256k1_enclave_signer The oracle's secp256k1 enclave signer
     * @param recentHash The chain metadata to sign with. Blockhash or slothash.
     * @returns A promise that resolves to the attestation response.
     * @throws if the request fails.
     */ fetchAttestation(params) {
        return __awaiter(this, void 0, void 0, function*() {
            const url = `${this.gatewayUrl}/gateway/api/v1/gateway_attest_enclave`;
            const method = 'POST';
            const headers = {
                'Content-Type': 'application/json'
            };
            const body = JSON.stringify({
                api_version: '1.0.0',
                timestamp: params.timestamp,
                quote: params.quote,
                oracle_pubkey: params.oracle_pubkey,
                oracle_reward_wallet: params.oracle_reward_wallet,
                oracle_ed25519_enclave_signer: params.oracle_ed25519_enclave_signer,
                oracle_secp256k1_enclave_signer: params.oracle_secp256k1_enclave_signer,
                chain_hash: params.recentHash
            });
            return axiosClient().post(url, {
                method,
                headers,
                data: body,
                timeout: TIMEOUT
            }).then((r)=>r.data);
        });
    }
    /**
     * Fetches a quote from the gateway.
     *
     * REST API endpoint: /api/v1/gateway_fetch_quote
     *
     *
     * @param blockhash The blockhash to fetch the quote for.
     * @param get_for_oracle Whether to fetch the quote for the oracle.
     * @param get_for_guardian Whether to fetch the quote for the guardian.
     * @returns A promise that resolves to the quote response.
     * @throws if the request fails.
     */ fetchQuote(params) {
        return __awaiter(this, void 0, void 0, function*() {
            const url = `${this.endpoint()}/gateway/api/v1/gateway_fetch_quote`;
            const method = 'POST';
            const headers = {
                'Content-Type': 'application/json'
            };
            const body = JSON.stringify({
                api_version: '1.0.0',
                blockhash: params.blockhash,
                get_for_oracle: params.get_for_oracle,
                get_for_guardian: params.get_for_guardian
            });
            return axiosClient().post(url, {
                method,
                headers,
                data: body,
                timeout: TIMEOUT
            }).then((r)=>r.data);
        });
    }
    // alberthermida@Switchboard ts % curl -X POST \
    // -H "Content-Type: application/json" \
    // -d '{
    //   "api_version": "1.0.0",
    //   "blockhash": "0000000000000000000000000000000000000000000000000000000000000000",
    //   "get_for_oracle": true,
    //   "get_for_guardian": false
    // }' \
    // https://vu-ams-02.switchboard-oracles.xyz/gateway/api/v1/gateway_fetch_quote
    /**
     *  Fetches signatures from the gateway.
     *
     *  REST API endpoint: /api/v1/fetch_signatures
     *
     *  @param recentHash The chain metadata to sign with. Blockhash or slothash.
     *  @param jobs The oracle jobs to perform.
     *  @param numSignatures The number of oracles to fetch signatures from.
     *  @param maxVariance The maximum variance allowed in the feed values.
     *  @param minResponses The minimum number of responses of jobs to succeed.
     *  @param useTimestamp Whether to use the timestamp in the response & to encode update signature.
     *  @returns A promise that resolves to the feed evaluation responses.
     *  @throws if the request fails.
     */ fetchSignatures(params) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c;
            params.numSignatures = (_a = params.numSignatures) !== null && _a !== void 0 ? _a : 1;
            params.maxVariance = (_b = params.maxVariance) !== null && _b !== void 0 ? _b : 1;
            params.minResponses = (_c = params.minResponses) !== null && _c !== void 0 ? _c : 1;
            const { recentHash, jobs, numSignatures, maxVariance, minResponses, useTimestamp } = params;
            const encodedJobs = encodeJobs(jobs);
            const res = yield this.fetchSignaturesFromEncoded({
                recentHash,
                encodedJobs,
                numSignatures,
                maxVariance,
                minResponses,
                useTimestamp
            });
            return res;
        });
    }
    fetchSignaturesMulti(params) {
        return __awaiter(this, void 0, void 0, function*() {
            const { recentHash, feedConfigs, useTimestamp, numSignatures } = params;
            const encodedConfigs = feedConfigs.map((config)=>{
                var _a, _b;
                return {
                    encodedJobs: encodeJobs(config.jobs),
                    maxVariance: (_a = config.maxVariance) !== null && _a !== void 0 ? _a : 1,
                    minResponses: (_b = config.minResponses) !== null && _b !== void 0 ? _b : 1
                };
            });
            const res = yield this.fetchSignaturesFromEncodedMulti({
                recentHash,
                encodedConfigs,
                numSignatures: numSignatures !== null && numSignatures !== void 0 ? numSignatures : 1,
                useTimestamp
            });
            return res;
        });
    }
    fetchSignaturesFromEncodedMulti(params) {
        return __awaiter(this, void 0, void 0, function*() {
            // TODO: have total NumOracles count against rate limit per IP
            const { recentHash, encodedConfigs, numSignatures } = params;
            if (numSignatures <= 0) {
                throw new Error('numSignatures must be greater than 0');
            }
            const url = `${this.gatewayUrl}/gateway/api/v1/fetch_signatures_multi`;
            const method = 'POST';
            const headers = {
                'Content-Type': 'application/json'
            };
            const body = {
                api_version: '1.0.0',
                num_oracles: numSignatures,
                recent_hash: recentHash !== null && recentHash !== void 0 ? recentHash : __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$6$2e$0$2e$0$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].encode(Buffer.alloc(32, 0)),
                signature_scheme: 'Secp256k1',
                hash_scheme: 'Sha256',
                feed_requests: encodedConfigs.map((config)=>{
                    var _a, _b, _c;
                    return {
                        jobs_b64_encoded: config.encodedJobs,
                        max_variance: Math.floor(Number((_a = config.maxVariance) !== null && _a !== void 0 ? _a : 1) * 1e9),
                        min_responses: (_b = config.minResponses) !== null && _b !== void 0 ? _b : 1,
                        use_timestamp: (_c = params.useTimestamp) !== null && _c !== void 0 ? _c : false
                    };
                })
            };
            const data = JSON.stringify(body);
            try {
                const resp = yield axiosClient()(url, {
                    method,
                    headers,
                    data
                });
                return resp.data;
            } catch (err) {
                console.error('fetchSignaturesFromEncodedMulti error', err);
                throw err;
            }
        });
    }
    /**
     * Fetches signatures from the gateway without pre-encoded jobs
     * REST API endpoint: /api/v1/fetch_signatures_batch
     *
     * @param recentHash The chain metadata to sign with. Blockhash or slothash.
     * @param feedConfigs The feed configurations to fetch signatures for.
     * @param numSignatures The number of oracles to fetch signatures from.
     * @param useTimestamp Whether to use the timestamp in the response & to encode update signature.
     * @returns A promise that resolves to the feed evaluation responses.
     * @throws if the request fails.
     */ fetchSignaturesBatch(params) {
        return __awaiter(this, void 0, void 0, function*() {
            const { recentHash, feedConfigs, useTimestamp, numSignatures } = params;
            const encodedConfigs = feedConfigs.map((config)=>{
                var _a, _b;
                const encodedJobs = encodeJobs(config.jobs);
                return {
                    encodedJobs,
                    maxVariance: (_a = config.maxVariance) !== null && _a !== void 0 ? _a : 1,
                    minResponses: (_b = config.minResponses) !== null && _b !== void 0 ? _b : 1
                };
            });
            const res = yield this.fetchSignaturesFromEncodedBatch({
                recentHash,
                encodedConfigs,
                numSignatures: numSignatures !== null && numSignatures !== void 0 ? numSignatures : 1,
                useTimestamp
            });
            return res;
        });
    }
    /**
     * Fetches signatures from the gateway.
     * REST API endpoint: /api/v1/fetch_signatures_batch
     *
     * @param recentHash The chain metadata to sign with. Blockhash or slothash.
     * @param encodedConfigs The encoded feed configurations to fetch signatures for.
     * @param numSignatures The number of oracles to fetch signatures from.
     * @param useTimestamp Whether to use the timestamp in the response & to encode update signature.
     * @returns A promise that resolves to the feed evaluation responses.
     * @throws if the request fails.
     */ fetchSignaturesFromEncodedBatch(params) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c;
            const { recentHash, encodedConfigs, numSignatures } = params;
            const url = `${this.gatewayUrl}/gateway/api/v1/fetch_signatures_batch`;
            const method = 'POST';
            const headers = {
                'Content-Type': 'application/json'
            };
            const body = {
                api_version: '1.0.0',
                num_oracles: numSignatures,
                recent_hash: recentHash !== null && recentHash !== void 0 ? recentHash : __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$6$2e$0$2e$0$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].encode(Buffer.alloc(32, 0)),
                signature_scheme: 'Secp256k1',
                hash_scheme: 'Sha256',
                feed_requests: []
            };
            for (const config of encodedConfigs){
                const maxVariance = Math.floor(Number((_a = config.maxVariance) !== null && _a !== void 0 ? _a : 1) * 1e9);
                body.feed_requests.push({
                    jobs_b64_encoded: config.encodedJobs,
                    max_variance: maxVariance,
                    min_responses: (_b = config.minResponses) !== null && _b !== void 0 ? _b : 1,
                    use_timestamp: (_c = params.useTimestamp) !== null && _c !== void 0 ? _c : false
                });
            }
            const data = JSON.stringify(body);
            // get size of data
            try {
                const resp = yield axiosClient()(url, {
                    method,
                    headers,
                    data
                });
                return resp.data;
            } catch (err) {
                console.error('fetchSignaturesFromEncodedBatch error', err);
                throw err;
            }
        });
    }
    fetchSignaturesConsensus(params) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a;
            const { recentHash, feedConfigs } = params;
            const feedRequests = feedConfigs.map((config)=>{
                var _a, _b;
                return {
                    jobs_b64_encoded: encodeJobs(config.jobs),
                    max_variance: Math.floor(Number((_a = config.maxVariance) !== null && _a !== void 0 ? _a : 1) * 1e9),
                    min_responses: (_b = config.minResponses) !== null && _b !== void 0 ? _b : 1
                };
            });
            const url = `${this.gatewayUrl}/gateway/api/v1/fetch_signatures_consensus`;
            const method = 'POST';
            const headers = {
                'Content-Type': 'application/json'
            };
            const data = JSON.stringify({
                api_version: '1.0.0',
                recent_hash: recentHash !== null && recentHash !== void 0 ? recentHash : __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$6$2e$0$2e$0$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].encode(Buffer.alloc(32, 0)),
                signature_scheme: 'Secp256k1',
                hash_scheme: 'Sha256',
                feed_requests: feedRequests,
                num_oracles: (_a = params.numSignatures) !== null && _a !== void 0 ? _a : 1
            });
            try {
                const resp = yield axiosClient()(url, {
                    method,
                    headers,
                    data
                });
                return resp.data;
            } catch (err) {
                console.error('fetchSignaturesConsensus error', err);
                throw err;
            }
        });
    }
    /**
     * Sends a request to the gateway bridge enclave.
     *
     * REST API endpoint: /api/v1/gateway_bridge_enclave
     *
     * @param chainHash The chain hash to include in the request.
     * @param oraclePubkey The public key of the oracle.
     * @param queuePubkey The public key of the queue.
     * @returns A promise that resolves to the response.
     * @throws if the request fails.
     */ fetchBridgingMessage(params) {
        return __awaiter(this, void 0, void 0, function*() {
            const url = `${this.gatewayUrl}/gateway/api/v1/gateway_bridge_enclave`;
            const method = 'POST';
            const headers = {
                'Content-Type': 'application/json'
            };
            const body = {
                api_version: '1.0.0',
                chain_hash: params.chainHash,
                oracle_pubkey: params.oraclePubkey,
                queue_pubkey: params.queuePubkey
            };
            const data = JSON.stringify(body);
            const resp = yield axiosClient()(url, {
                method,
                headers,
                data
            });
            return resp.data;
        });
    }
    /**
     * Fetches the randomness reveal from the gateway.
     * @param params The parameters for the randomness reveal.
     * @returns The randomness reveal response.
     */ fetchRandomnessReveal(params) {
        return __awaiter(this, void 0, void 0, function*() {
            const url = `${this.gatewayUrl}/gateway/api/v1/randomness_reveal`;
            const method = 'POST';
            const responseType = 'text';
            const headers = {
                'Content-Type': 'application/json'
            };
            // Handle Solana and Cross-Chain Randomness
            let data;
            if ('slot' in params) {
                // Solana Randomness
                data = JSON.stringify({
                    slothash: [
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$6$2e$0$2e$0$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].decode(params.slothash)
                    ],
                    randomness_key: params.randomnessAccount.toBuffer().toString('hex'),
                    slot: params.slot,
                    rpc: params.rpc
                });
            } else {
                // Cross-chain randomness
                data = JSON.stringify({
                    timestamp: params.timestamp,
                    min_staleness_seconds: params.minStalenessSeconds,
                    randomness_key: params.randomnessId
                });
            }
            try {
                const txtResponse = yield axiosClient()(url, {
                    method,
                    headers,
                    data,
                    responseType
                });
                return JSON.parse(txtResponse.data);
            } catch (err) {
                console.error('fetchRandomnessReveal error', err);
                throw err;
            }
        });
    }
    test() {
        return __awaiter(this, void 0, void 0, function*() {
            const url = `${this.gatewayUrl}/gateway/api/v1/test`;
            const cachedResponse = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GATEWAY_PING_CACHE"].get(this.gatewayUrl);
            if (cachedResponse !== undefined) return cachedResponse;
            try {
                const txt = yield axiosClient()(url);
                if (txt.data.length !== 0) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GATEWAY_PING_CACHE"].set(this.gatewayUrl, true);
                    return true;
                }
            } catch (_a) {} // eslint-disable-line no-empty
            __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GATEWAY_PING_CACHE"].set(this.gatewayUrl, false);
            return false;
        });
    }
    endpoint() {
        return this.gatewayUrl;
    }
    toString() {
        return JSON.stringify({
            gatewayUrl: this.gatewayUrl,
            programId: this.program.programId.toBase58()
        });
    }
    [Symbol.toPrimitive](hint) {
        return hint === 'string' ? `Gateway: ${this.toString()}` : null;
    }
} //# sourceMappingURL=gateway.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/permission.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Permission",
    ()=>Permission,
    "SwitchboardPermission",
    ()=>SwitchboardPermission
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/utils/index.js [app-route] (ecmascript)");
var __awaiter = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
var SwitchboardPermission;
(function(SwitchboardPermission) {
    SwitchboardPermission[SwitchboardPermission["PermitOracleHeartbeat"] = 1] = "PermitOracleHeartbeat";
    SwitchboardPermission[SwitchboardPermission["PermitOracleQueueUsage"] = 2] = "PermitOracleQueueUsage";
})(SwitchboardPermission || (SwitchboardPermission = {}));
class Permission {
    /**
     *  Set the permission for a given granter and grantee.
     *
     *  @param program - The program that owns the permission account.
     *  @param params - The parameters for setting the permission.
     *  @returns A promise that resolves to the transaction instruction.
     */ static setIx(program, params) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a;
            const payer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getNodePayer"])(program);
            const ix = yield program.instruction.permissionSet({
                enable: (_a = params.enable) !== null && _a !== void 0 ? _a : false,
                permission: params.permission
            }, {
                accounts: {
                    granter: params.granter,
                    authority: params.authority
                },
                remainingAccounts: [
                    {
                        pubkey: params.grantee,
                        isSigner: false,
                        isWritable: true
                    }
                ],
                signers: [
                    payer
                ]
            });
            return ix;
        });
    }
    /**
     *  Disable object instantiation.
     */ constructor(){}
} //# sourceMappingURL=permission.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/queue.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Queue",
    ()=>Queue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/constants.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$oracle$2d$interfaces$2f$gateway$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/oracle-interfaces/gateway.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/utils/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$lookupTable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/utils/lookupTable.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$oracle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/oracle.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$permission$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/permission.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/state.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$30$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.30.1_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bn.js@5.2.2/node_modules/bn.js/lib/bn.js [app-route] (ecmascript) <export default as BN>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript) <export * as web3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/string.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/buffer [external] (buffer, cjs)");
var __awaiter = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
class Queue {
    static createIx(program, params) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g;
            const queue = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].Keypair.generate();
            const allowAuthorityOverrideAfter = (_a = params.allowAuthorityOverrideAfter) !== null && _a !== void 0 ? _a : 60 * 60;
            const requireAuthorityHeartbeatPermission = (_b = params.requireAuthorityHeartbeatPermission) !== null && _b !== void 0 ? _b : true;
            const requireUsagePermission = (_c = params.requireUsagePermission) !== null && _c !== void 0 ? _c : false;
            const maxQuoteVerificationAge = (_d = params.maxQuoteVerificationAge) !== null && _d !== void 0 ? _d : 60 * 60 * 24 * 7;
            const reward = (_e = params.reward) !== null && _e !== void 0 ? _e : 1000000;
            const nodeTimeout = (_f = params.nodeTimeout) !== null && _f !== void 0 ? _f : 300;
            const payer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getNodePayer"])(program);
            // Prepare accounts for the transaction
            const lutSigner = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$lookupTable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLutSigner"])(program.programId, queue.publicKey);
            const recentSlot = (_g = params.lutSlot) !== null && _g !== void 0 ? _g : yield program.provider.connection.getSlot('finalized');
            const lutKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$lookupTable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLutKey"])(lutSigner, recentSlot);
            const ix = yield program.instruction.queueInit({
                allowAuthorityOverrideAfter,
                requireAuthorityHeartbeatPermission,
                requireUsagePermission,
                maxQuoteVerificationAge,
                reward,
                nodeTimeout,
                recentSlot: new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](recentSlot)
            }, {
                accounts: {
                    queue: queue.publicKey,
                    queueEscrow: yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssociatedTokenAddress"])(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SOL_NATIVE_MINT"], queue.publicKey),
                    authority: payer.publicKey,
                    payer: payer.publicKey,
                    systemProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].SystemProgram.programId,
                    tokenProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_TOKEN_PROGRAM_ID"],
                    nativeMint: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SOL_NATIVE_MINT"],
                    programState: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["State"].keyFromSeed(program),
                    lutSigner: lutSigner,
                    lut: lutKey,
                    addressLookupTableProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].AddressLookupTableProgram.programId,
                    associatedTokenProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID"]
                },
                signers: [
                    payer,
                    queue
                ]
            });
            return [
                new Queue(program, queue.publicKey),
                queue,
                ix
            ];
        });
    }
    /**
     * Creates a new instance of the `Queue` account with a PDA for SVM (non-solana) chains.
     * @param program The anchor program instance.
     * @param params The initialization parameters for the queue.
     * @returns
     */ static createIxSVM(program, params) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g;
            // Generate the queue PDA for the given source queue key
            const [queue] = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.findProgramAddressSync([
                __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from('Queue'),
                params.sourceQueueKey.toBuffer()
            ], program.programId);
            const allowAuthorityOverrideAfter = (_a = params.allowAuthorityOverrideAfter) !== null && _a !== void 0 ? _a : 60 * 60;
            const requireAuthorityHeartbeatPermission = (_b = params.requireAuthorityHeartbeatPermission) !== null && _b !== void 0 ? _b : true;
            const requireUsagePermission = (_c = params.requireUsagePermission) !== null && _c !== void 0 ? _c : false;
            const maxQuoteVerificationAge = (_d = params.maxQuoteVerificationAge) !== null && _d !== void 0 ? _d : 60 * 60 * 24 * 7;
            const reward = (_e = params.reward) !== null && _e !== void 0 ? _e : 1000000;
            const nodeTimeout = (_f = params.nodeTimeout) !== null && _f !== void 0 ? _f : 300;
            const payer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getNodePayer"])(program);
            // Prepare accounts for the transaction
            const lutSigner = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$lookupTable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLutSigner"])(program.programId, queue);
            const recentSlot = (_g = params.lutSlot) !== null && _g !== void 0 ? _g : yield program.provider.connection.getSlot('finalized');
            const lutKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$lookupTable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLutKey"])(lutSigner, recentSlot);
            const ix = program.instruction.queueInitSvm({
                allowAuthorityOverrideAfter,
                requireAuthorityHeartbeatPermission,
                requireUsagePermission,
                maxQuoteVerificationAge,
                reward,
                nodeTimeout,
                recentSlot: new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](recentSlot),
                sourceQueueKey: params.sourceQueueKey
            }, {
                accounts: {
                    queue: queue,
                    queueEscrow: yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssociatedTokenAddress"])(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SOL_NATIVE_MINT"], queue, true),
                    authority: payer.publicKey,
                    payer: payer.publicKey,
                    systemProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].SystemProgram.programId,
                    tokenProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_TOKEN_PROGRAM_ID"],
                    nativeMint: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SOL_NATIVE_MINT"],
                    programState: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["State"].keyFromSeed(program),
                    lutSigner: lutSigner,
                    lut: lutKey,
                    addressLookupTableProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].AddressLookupTableProgram.programId,
                    associatedTokenProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID"]
                },
                signers: [
                    payer
                ]
            });
            return [
                new Queue(program, queue),
                ix
            ];
        });
    }
    /**
     * Add an Oracle to a queue and set permissions
     * @param program
     * @param params
     */ overrideSVM(params) {
        return __awaiter(this, void 0, void 0, function*() {
            const stateKey = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["State"].keyFromSeed(this.program);
            const { authority } = yield this.loadData();
            const ix = this.program.instruction.queueOverrideSvm({
                secp256K1Signer: Array.from(params.secp256k1Signer),
                maxQuoteVerificationAge: new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](params.maxQuoteVerificationAge),
                mrEnclave: params.mrEnclave,
                slot: new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](params.slot)
            }, {
                accounts: {
                    queue: this.pubkey,
                    oracle: params.oracle,
                    authority,
                    state: stateKey
                }
            });
            return ix;
        });
    }
    /**
     *  Fetches signatures from a random gateway on the queue.
     *
     *  REST API endpoint: /api/v1/fetch_signatures
     *
     *  @param recentHash The chain metadata to sign with. Blockhash or slothash.
     *  @param jobs The oracle jobs to perform.
     *  @param numSignatures The number of oracles to fetch signatures from.
     *  @returns A promise that resolves to the feed evaluation responses.
     *  @throws if the request fails.
     */ static fetchSignatures(program, params) {
        return __awaiter(this, void 0, void 0, function*() {
            const queueAccount = new Queue(program, params.queue);
            return queueAccount.fetchSignatures(params);
        });
    }
    static fetchSignaturesMulti(program, params) {
        return __awaiter(this, void 0, void 0, function*() {
            const queueAccount = new Queue(program, params.queue);
            return queueAccount.fetchSignaturesMulti(params);
        });
    }
    static fetchSignaturesBatch(program, params) {
        return __awaiter(this, void 0, void 0, function*() {
            const queueAccount = new Queue(program, params.queue);
            return queueAccount.fetchSignaturesBatch(params);
        });
    }
    static fetchSignaturesConsensus(program, params) {
        return __awaiter(this, void 0, void 0, function*() {
            const queueAccount = new Queue(program, params.queue);
            return queueAccount.fetchSignaturesConsensus({
                gateway: params.gateway,
                recentHash: params.recentHash,
                feedConfigs: params.feedConfigs,
                useTimestamp: params.useTimestamp,
                numSignatures: params.numSignatures
            });
        });
    }
    /**
     * @deprecated
     * Deprecated. Use {@linkcode @switchboard-xyz/common#FeedHash.compute} instead.
     */ static fetchFeedHash(program, params) {
        return __awaiter(this, void 0, void 0, function*() {
            const queueAccount = new Queue(program, params.queue);
            const oracleSigs = yield queueAccount.fetchSignatures(params);
            return __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(oracleSigs[0].feed_hash, 'hex');
        });
    }
    /**
     *  Constructs a `OnDemandQueue` instance.
     *
     *  @param program The Anchor program instance.
     *  @param pubkey The public key of the queue account.
     */ constructor(program, pubkey){
        this.program = program;
        this.pubkey = pubkey;
        if (this.pubkey === undefined) {
            throw new Error('NoPubkeyProvided');
        }
    }
    /**
     *  Loads the queue data from on chain and returns the listed oracle keys.
     *
     *  @returns A promise that resolves to an array of oracle public keys.
     */ fetchOracleKeys() {
        return __awaiter(this, void 0, void 0, function*() {
            const data = yield this.loadData();
            const oracles = data.oracleKeys.slice(0, data.oracleKeysLen);
            return oracles;
        });
    }
    /**
     *  Loads the queue data from on chain and returns the listed gateways.
     *
     *  @returns A promise that resolves to an array of gateway URIs.
     */ fetchAllGateways() {
        return __awaiter(this, void 0, void 0, function*() {
            const program = this.program;
            const oracles = yield this.fetchOracleKeys();
            const oracleAccounts = yield __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$oracle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Oracle"].loadMany(program, oracles);
            const gatewayUris = oracleAccounts.map((oracleAccount)=>oracleAccount ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toUtf8"])(oracleAccount.gatewayUri) : '').filter((gatewayUri)=>gatewayUri.length > 0).filter((gatewayUri)=>!gatewayUri.includes('infstones'));
            const tests = [];
            for(const i in gatewayUris){
                const gw = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$oracle$2d$interfaces$2f$gateway$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Gateway"](program, gatewayUris[i], oracles[i]);
                tests.push({
                    gateway: gw,
                    promise: gw.test()
                });
            }
            let gateways = [];
            for (const test of tests){
                try {
                    const { gateway, promise } = test;
                    // Test gateways to see if they are good. Timeout after 2 seconds.
                    const isGood = yield __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsyncUtils"].promiseWithTimeout(2000, promise);
                    if (!isGood) continue;
                    // If the gateway is good, add it to the list
                    gateways.push(gateway);
                } catch (e) {
                    console.log('Timeout', e);
                }
            }
            gateways = gateways.sort(()=>Math.random() - 0.5);
            return gateways;
        });
    }
    /**
     * Fetches a gateway interface for interacting with oracle nodes.
     *
     * @param gatewayUrl - Optional URL of a specific gateway to use. If not provided,
     *                     a random gateway will be selected from the queue's available gateways.
     * @returns Gateway - A Gateway instance for making oracle requests
     * @throws {Error} If no gateways are available on the queue when selecting randomly
     */ fetchGateway(gatewayUrl) {
        return __awaiter(this, void 0, void 0, function*() {
            if (gatewayUrl) return new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$oracle$2d$interfaces$2f$gateway$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Gateway"](this.program, gatewayUrl);
            const gateways = yield this.fetchAllGateways();
            if (gateways.length === 0) throw new Error('NoGatewayAvailable');
            return gateways[Math.floor(Math.random() * gateways.length)];
        });
    }
    /**
     *  Fetches signatures from a random gateway on the queue.
     *
     *  REST API endpoint: /api/v1/fetch_signatures
     *
     *  @param gateway The gateway to fetch signatures from. If not provided, a gateway will be automatically selected.
     *  @param recentHash The chain metadata to sign with. Blockhash or slothash.
     *  @param jobs The oracle jobs to perform.
     *  @param numSignatures The number of oracles to fetch signatures from.
     *  @param maxVariance The maximum variance allowed in the responses.
     *  @param minResponses The minimum number of responses to attempt to fetch.
     *  @returns A promise that resolves to the feed evaluation responses.
     *  @throws if the request fails.
     */ fetchSignatures(params) {
        return __awaiter(this, void 0, void 0, function*() {
            const gateway = yield this.fetchGateway(params.gateway);
            return yield gateway.fetchSignatures({
                recentHash: params.recentHash,
                jobs: params.jobs,
                numSignatures: params.numSignatures,
                maxVariance: params.maxVariance,
                minResponses: params.minResponses,
                useTimestamp: params.useTimestamp
            });
        });
    }
    fetchSignaturesMulti(params) {
        return __awaiter(this, void 0, void 0, function*() {
            const gateway = yield this.fetchGateway(params.gateway);
            return yield gateway.fetchSignaturesMulti({
                recentHash: params.recentHash,
                feedConfigs: params.feedConfigs,
                numSignatures: params.numSignatures,
                useTimestamp: params.useTimestamp
            });
        });
    }
    fetchSignaturesConsensus(params) {
        return __awaiter(this, void 0, void 0, function*() {
            const gateway = yield this.fetchGateway(params.gateway);
            return yield gateway.fetchSignaturesConsensus({
                recentHash: params.recentHash,
                feedConfigs: params.feedConfigs,
                useTimestamp: params.useTimestamp,
                numSignatures: params.numSignatures
            });
        });
    }
    fetchSignaturesBatch(params) {
        return __awaiter(this, void 0, void 0, function*() {
            const gateway = yield this.fetchGateway(params.gateway);
            return yield gateway.fetchSignaturesBatch({
                recentHash: params.recentHash,
                feedConfigs: params.feedConfigs,
                numSignatures: params.numSignatures,
                useTimestamp: params.useTimestamp
            });
        });
    }
    /**
     *  Loads the queue data for this {@linkcode Queue} account from on chain.
     *
     *  @returns A promise that resolves to the queue data.
     *  @throws if the queue account does not exist.
     */ static loadData(program, pubkey) {
        return program.account['queueAccountData'].fetch(pubkey);
    }
    /**
     *  Loads the queue data for this {@linkcode Queue} account from on chain.
     *
     *  @returns A promise that resolves to the queue data.
     *  @throws if the queue account does not exist.
     */ loadData() {
        return __awaiter(this, void 0, void 0, function*() {
            return yield Queue.loadData(this.program, this.pubkey);
        });
    }
    /**
     *  Adds a new MR enclave to the queue.
     *  This will allow the queue to accept signatures from the given MR enclave.
     *  @param mrEnclave The MR enclave to add.
     *  @returns A promise that resolves to the transaction instruction.
     *  @throws if the request fails.
     *  @throws if the MR enclave is already added.
     *  @throws if the MR enclave is invalid.
     *  @throws if the MR enclave is not a valid length.
     */ addMrEnclaveIx(params) {
        return __awaiter(this, void 0, void 0, function*() {
            const stateKey = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["State"].keyFromSeed(this.program);
            const state = yield __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["State"].loadData(this.program);
            const programAuthority = state.authority;
            const { authority } = yield this.loadData();
            const ix = yield this.program.instruction.queueAddMrEnclave({
                mrEnclave: params.mrEnclave
            }, {
                accounts: {
                    queue: this.pubkey,
                    authority,
                    programAuthority,
                    state: stateKey
                }
            });
            return ix;
        });
    }
    /**
     *  Removes an MR enclave from the queue.
     *  This will prevent the queue from accepting signatures from the given MR enclave.
     *  @param mrEnclave The MR enclave to remove.
     *  @returns A promise that resolves to the transaction instruction.
     *  @throws if the request fails.
     *  @throws if the MR enclave is not present.
     */ rmMrEnclaveIx(params) {
        return __awaiter(this, void 0, void 0, function*() {
            const stateKey = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["State"].keyFromSeed(this.program);
            const state = yield __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["State"].loadData(this.program);
            const programAuthority = state.authority;
            const { authority } = yield this.loadData();
            const ix = yield this.program.instruction.queueRemoveMrEnclave({
                mrEnclave: params.mrEnclave
            }, {
                accounts: {
                    queue: this.pubkey,
                    authority,
                    programAuthority,
                    state: stateKey
                }
            });
            return ix;
        });
    }
    /**
     * Sets the queue configurations.
     * @param params.authority The new authority for the queue.
     * @param params.reward The new reward for the queue.
     * @param params.nodeTimeout The new node timeout for the queue.
     * @returns A promise that resolves to the transaction instruction.
     */ setConfigsIx(params) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b;
            const data = yield this.loadData();
            const stateKey = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["State"].keyFromSeed(this.program);
            const nodeTimeout = params.nodeTimeout ? new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](params.nodeTimeout) : null;
            const ix = yield this.program.instruction.queueSetConfigs({
                authority: (_a = params.authority) !== null && _a !== void 0 ? _a : null,
                reward: (_b = params.reward) !== null && _b !== void 0 ? _b : null,
                nodeTimeout: nodeTimeout
            }, {
                accounts: {
                    queue: this.pubkey,
                    authority: data.authority,
                    state: stateKey
                }
            });
            return ix;
        });
    }
    setNcnIx(params) {
        return __awaiter(this, void 0, void 0, function*() {
            const data = yield this.loadData();
            const authority = data.authority;
            const state = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["State"].keyFromSeed(this.program);
            return this.program.instruction.queueSetNcn({}, {
                accounts: {
                    queue: this.pubkey,
                    authority,
                    state,
                    ncn: params.ncn
                }
            });
        });
    }
    setVaultIx(params) {
        return __awaiter(this, void 0, void 0, function*() {
            const data = yield this.loadData();
            const authority = data.authority;
            const state = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["State"].keyFromSeed(this.program);
            const ncn = data.ncn;
            return this.program.instruction.queueSetVault({
                enable: params.enable
            }, {
                accounts: {
                    queue: this.pubkey,
                    authority,
                    state,
                    ncn,
                    vault: params.vault
                }
            });
        });
    }
    allowSubsidyIx(params) {
        return __awaiter(this, void 0, void 0, function*() {
            const data = yield this.loadData();
            const authority = data.authority;
            const state = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["State"].keyFromSeed(this.program);
            return this.program.instruction.queueAllowSubsidies({
                allowSubsidies: params.enable
            }, {
                accounts: {
                    queue: this.pubkey,
                    authority,
                    state
                }
            });
        });
    }
    /**
     * Sets the oracle permission on the queue.
     * @param params.oracle The oracle to set the permission for.
     * @param params.permission The permission to set.
     * @param params.enabled Whether the permission is enabled.
     * @returns A promise that resolves to the transaction instruction   */ setOraclePermissionIx(params) {
        return __awaiter(this, void 0, void 0, function*() {
            const data = yield this.loadData();
            return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$permission$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Permission"].setIx(this.program, {
                authority: data.authority,
                grantee: params.oracle,
                granter: this.pubkey,
                permission: params.permission,
                enable: params.enable
            });
        });
    }
    /**
     *  Removes all MR enclaves from the queue.
     *  @returns A promise that resolves to an array of transaction instructions.
     *  @throws if the request fails.
     */ rmAllMrEnclaveIxs() {
        return __awaiter(this, void 0, void 0, function*() {
            const { mrEnclaves, mrEnclavesLen } = yield this.loadData();
            const activeEnclaves = mrEnclaves.slice(0, mrEnclavesLen);
            const ixs = [];
            for (const mrEnclave of activeEnclaves){
                ixs.push((yield this.rmMrEnclaveIx({
                    mrEnclave
                })));
            }
            return ixs;
        });
    }
    /**
     *  Fetches most recently added and verified Oracle Key.
     *  @returns A promise that resolves to an oracle public key.
     *  @throws if the request fails.
     */ fetchFreshOracle() {
        return __awaiter(this, void 0, void 0, function*() {
            const now = Math.floor(+new Date() / 1000);
            const oracles = yield this.fetchOracleKeys();
            const oracleAccounts = yield __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$oracle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Oracle"].loadMany(this.program, oracles);
            const oracleUris = oracleAccounts.map((data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$string$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toUtf8"])(data.gatewayUri)).filter((gatewayUri)=>gatewayUri.length);
            const tests = [];
            for(const i in oracleUris){
                const gw = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$oracle$2d$interfaces$2f$gateway$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Gateway"](this.program, oracleUris[i], oracles[i]);
                tests.push(gw.test());
            }
            const zip = [];
            for(let i = 0; i < oracles.length; i++){
                try {
                    // Test gateways to see if they are good. Timeout after 2 seconds.
                    const isGood = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AsyncUtils"].promiseWithTimeout(2000, tests[i]);
                    if (!isGood) continue;
                } catch (e) {
                    console.log('Gateway Timeout', e);
                }
                zip.push({
                    data: oracleAccounts[i],
                    key: oracles[i]
                });
            }
            const validOracles = zip.filter((x)=>x.data.enclave.verificationStatus === 4) // value 4 is for verified
            .filter((x)=>x.data.enclave.validUntil.gt(new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](now + 3600))); // valid for 1 hour at least
            if (validOracles.length === 0) throw new Error('NoValidOracles');
            const chosen = validOracles[Math.floor(Math.random() * validOracles.length)];
            return chosen.key;
        });
    }
    /**
     * Get the PDA for the queue (SVM chains that are not solana)
     * @returns Queue PDA Pubkey
     */ queuePDA() {
        return Queue.queuePDA(this.program, this.pubkey);
    }
    /**
     * Get the PDA for the queue (SVM chains that are not solana)
     * @param program Anchor program
     * @param pubkey Queue pubkey
     * @returns Queue PDA Pubkey
     */ static queuePDA(program, pubkey) {
        const [queuePDA] = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.findProgramAddressSync([
            __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from('Queue'),
            pubkey.toBuffer()
        ], program.programId);
        return queuePDA;
    }
    loadLookupTable() {
        return __awaiter(this, void 0, void 0, function*() {
            const data = yield this.loadData();
            const lutSigner = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$lookupTable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLutSigner"])(this.program.programId, this.pubkey);
            const lutKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$lookupTable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLutKey"])(lutSigner, data.lutSlot);
            const accnt = yield this.program.provider.connection.getAddressLookupTable(lutKey);
            return accnt.value;
        });
    }
} //# sourceMappingURL=queue.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/state.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "State",
    ()=>State
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/utils/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$queue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/queue.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$30$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.30.1_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript) <export * as web3>");
var __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/buffer [external] (buffer, cjs)");
var __awaiter = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
;
;
;
class State {
    /**
     * Derives a state PDA (Program Derived Address) from the program.
     *
     * @param {Program} program - The Anchor program instance.
     * @returns {web3.PublicKey} The derived state account's public key.
     */ static keyFromSeed(program) {
        const [state] = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.findProgramAddressSync([
            __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from('STATE')
        ], program.programId);
        return state;
    }
    /**
     * Initializes the state account.
     *
     * @param {Program} program - The Anchor program instance.
     * @returns {Promise<[State, string]>} A promise that resolves to the state account and the transaction signature.
     */ static create(program) {
        return __awaiter(this, void 0, void 0, function*() {
            const payer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getNodePayer"])(program);
            const sig = yield program.rpc.stateInit({}, {
                accounts: {
                    state: State.keyFromSeed(program),
                    payer: payer.publicKey,
                    systemProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].SystemProgram.programId
                },
                signers: [
                    payer
                ]
            });
            return [
                new State(program),
                sig
            ];
        });
    }
    /**
     * Constructs a `State` instance.
     *
     * @param {Program} program - The Anchor program instance.
     */ constructor(program){
        this.program = program;
        const pubkey = State.keyFromSeed(program);
        this.pubkey = pubkey;
    }
    /**
     * Set program-wide configurations.
     *
     * @param {object} params - The configuration parameters.
     * @param {web3.PublicKey} [params.guardianQueue] - The guardian queue account.
     * @param {web3.PublicKey} [params.newAuthority] - The new authority account.
     * @param {BN} [params.minQuoteVerifyVotes] - The minimum number of votes required to verify a quote.
     * @param {number} [params.permitAdvisory] - The permit advisory value.
     * @param {number} [params.denyAdvisory] - The deny advisory value.
     * @param {boolean} [params.testOnlyDisableMrEnclaveCheck] - A flag to disable MrEnclave check for testing purposes.
     * @param {web3.PublicKey} [params.switchMint] - The switch mint account.
     * @returns {Promise<web3.TransactionInstruction>} A promise that resolves to the transaction instruction.
     */ setConfigsIx(params) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const state = yield this.loadData();
            const queue = (_a = params.guardianQueue) !== null && _a !== void 0 ? _a : state.guardianQueue;
            const payer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getNodePayer"])(this.program);
            const testOnlyDisableMrEnclaveCheck = (_b = params.testOnlyDisableMrEnclaveCheck) !== null && _b !== void 0 ? _b : state.testOnlyDisableMrEnclaveCheck;
            const ix = yield this.program.instruction.stateSetConfigs({
                newAuthority: (_c = params.newAuthority) !== null && _c !== void 0 ? _c : state.authority,
                testOnlyDisableMrEnclaveCheck: testOnlyDisableMrEnclaveCheck ? 1 : 0,
                addAdvisory: params.permitAdvisory,
                rmAdvisory: params.denyAdvisory,
                lutSlot: state.lutSlot,
                subsidyAmount: (_d = params.subsidyAmount) !== null && _d !== void 0 ? _d : state.subsidyAmount,
                switchMint: (_e = params.switchMint) !== null && _e !== void 0 ? _e : state.switchMint,
                authority: (_f = params.newAuthority) !== null && _f !== void 0 ? _f : state.authority,
                addCostWl: (_g = params.addCostWl) !== null && _g !== void 0 ? _g : __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.default,
                rmCostWl: (_h = params.rmCostWl) !== null && _h !== void 0 ? _h : __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.default
            }, {
                accounts: {
                    state: this.pubkey,
                    authority: state.authority,
                    queue,
                    payer: payer.publicKey,
                    systemProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].SystemProgram.programId
                }
            });
            return ix;
        });
    }
    /**
     * Register a guardian with the global guardian queue.
     *
     * @param {object} params - The parameters object.
     * @param {PublicKey} params.guardian - The guardian account.
     * @returns {Promise<TransactionInstruction>} A promise that resolves to the transaction instruction.
     */ registerGuardianIx(params) {
        return __awaiter(this, void 0, void 0, function*() {
            const state = yield this.loadData();
            const payer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getNodePayer"])(this.program);
            const ix = yield this.program.instruction.guardianRegister({}, {
                accounts: {
                    oracle: params.guardian,
                    state: this.pubkey,
                    guardianQueue: state.guardianQueue,
                    authority: state.authority
                },
                signers: [
                    payer
                ]
            });
            return ix;
        });
    }
    /**
     * Unregister a guardian from the global guardian queue.
     *
     * @param {object} params - The parameters object.
     * @param {web3.PublicKey} params.guardian - The guardian account.
     * @returns {Promise<web3.TransactionInstruction>} A promise that resolves to the transaction instruction.
     */ unregisterGuardianIx(params) {
        return __awaiter(this, void 0, void 0, function*() {
            const state = yield this.loadData();
            const guardianQueue = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$queue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Queue"](this.program, state.guardianQueue);
            const queueData = yield guardianQueue.loadData();
            const idx = queueData.oracleKeys.findIndex((key)=>key.equals(params.guardian));
            const payer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getNodePayer"])(this.program);
            const ix = yield this.program.instruction.guardianUnregister({
                idx
            }, {
                accounts: {
                    oracle: params.guardian,
                    state: this.pubkey,
                    guardianQueue: state.guardianQueue,
                    authority: state.authority
                },
                signers: [
                    payer
                ]
            });
            return ix;
        });
    }
    /**
     *  Loads the state data from on chain.
     *
     *  @returns A promise that resolves to the state data.
     *  @throws if the state account does not exist.
     */ loadData() {
        return __awaiter(this, void 0, void 0, function*() {
            return yield this.program.account['state'].fetch(this.pubkey);
        });
    }
    /**
     *  Loads the state data from on chain.
     *
     *  @returns A promise that resolves to the state data.
     *  @throws if the state account does not exist.
     */ static loadData(program) {
        return __awaiter(this, void 0, void 0, function*() {
            return yield new State(program).loadData();
        });
    }
} //# sourceMappingURL=state.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/oracle.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Oracle",
    ()=>Oracle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/constants.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/utils/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$lookupTable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/utils/lookupTable.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/state.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$30$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.30.1_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bn.js@5.2.2/node_modules/bn.js/lib/bn.js [app-route] (ecmascript) <export default as BN>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript) <export * as web3>");
var __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/buffer [external] (buffer, cjs)");
var __awaiter = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
;
;
;
;
;
class Oracle {
    constructor(program, pubkey){
        this.program = program;
        this.pubkey = pubkey;
        this.lut = null;
    }
    /**
     * Creates a new oracle account. linked to the specified queue.
     * After creation the oracle still must receive run approval and verify their
     * enclave measurement.
     * @param program - The program that owns the oracle account.
     * @param params.queue - The queue that the oracle will be linked to.
     * @returns A promise that resolves to a tuple containing the oracle account
     * and the transaction signature.
     *
     */ static create(program, params) {
        return __awaiter(this, void 0, void 0, function*() {
            const stateKey = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["State"].keyFromSeed(program);
            const state = yield __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["State"].loadData(program);
            const payer = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getNodePayer"](program);
            const oracle = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].Keypair.generate();
            const oracleStats = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.findProgramAddressSync([
                __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from('OracleStats'),
                oracle.publicKey.toBuffer()
            ], program.programId)[0];
            const lutSigner = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$lookupTable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLutSigner"])(program.programId, oracle.publicKey);
            const recentSlot = yield program.provider.connection.getSlot('finalized');
            const lutKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$lookupTable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLutKey"])(lutSigner, recentSlot);
            const ix = yield program.instruction.oracleInit({
                recentSlot: new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](recentSlot.toString()),
                authority: payer.publicKey,
                queue: params.queue,
                secpAuthority: null
            }, {
                accounts: {
                    oracle: oracle.publicKey,
                    oracleStats,
                    authority: payer.publicKey,
                    programState: stateKey,
                    payer: payer.publicKey,
                    systemProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].SystemProgram.programId,
                    tokenProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_TOKEN_PROGRAM_ID"],
                    tokenMint: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SOL_NATIVE_MINT"],
                    lutSigner: lutSigner,
                    lut: lutKey,
                    addressLookupTableProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].AddressLookupTableProgram.programId,
                    switchMint: state.switchMint,
                    wsolVault: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssociatedTokenAddressSync"](__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SOL_NATIVE_MINT"], oracle.publicKey),
                    switchVault: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssociatedTokenAddressSync"](state.switchMint, oracle.publicKey)
                }
            });
            return [
                new Oracle(program, oracle.publicKey),
                [
                    ix
                ],
                oracle
            ];
        });
    }
    /**
     * Creates a new oracle account for SVM chains (non-solana). linked to the specified queue.
     * After creation the oracle still must receive run approval and verify their
     * enclave measurement.
     * @param program - The program that owns the oracle account.
     * @param params.queue - The queue that the oracle will be linked to.
     * @returns A promise that resolves to a tuple containing the oracle account
     * and the transaction signature.
     *
     */ static createSVM(program, params) {
        return __awaiter(this, void 0, void 0, function*() {
            const stateKey = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["State"].keyFromSeed(program);
            const state = yield __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["State"].loadData(program);
            const payer = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getNodePayer"](program);
            // Generate the queue PDA for the given source queue key
            const [oracle] = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.findProgramAddressSync([
                __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from('Oracle'),
                params.queue.toBuffer(),
                params.sourceOracleKey.toBuffer()
            ], program.programId);
            const oracleStats = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.findProgramAddressSync([
                __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from('OracleStats'),
                oracle.toBuffer()
            ], program.programId)[0];
            const lutSigner = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$lookupTable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLutSigner"])(program.programId, oracle);
            const recentSlot = yield program.provider.connection.getSlot('finalized');
            const lutKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$lookupTable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLutKey"])(lutSigner, recentSlot);
            const ix = program.instruction.oracleInitSvm({
                recentSlot: new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](recentSlot.toString()),
                authority: payer.publicKey,
                queue: params.queue,
                secpAuthority: null,
                sourceOracleKey: params.sourceOracleKey
            }, {
                accounts: {
                    oracle: oracle,
                    oracleStats,
                    authority: payer.publicKey,
                    programState: stateKey,
                    payer: payer.publicKey,
                    systemProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].SystemProgram.programId,
                    tokenProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_TOKEN_PROGRAM_ID"],
                    tokenMint: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SOL_NATIVE_MINT"],
                    lutSigner: lutSigner,
                    lut: lutKey,
                    addressLookupTableProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].AddressLookupTableProgram.programId,
                    switchMint: state.switchMint,
                    wsolVault: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssociatedTokenAddressSync"](__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SOL_NATIVE_MINT"], oracle, true),
                    switchVault: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssociatedTokenAddressSync"](state.switchMint, oracle, true)
                }
            });
            return [
                new Oracle(program, oracle),
                [
                    ix
                ]
            ];
        });
    }
    /**
     * TODO: wrap this one up with the gateway bridge oracle fn
     * @param params
     * @returns
     */ // static async quoteVerifySvmIx(
    //   program: Program,
    //   params: {
    //     chain?: string; // Unused atm
    //     network?: 'mainnet' | 'mainnet-beta' | 'testnet' | 'devnet';
    //     queue: web3.PublicKey; // Solana queue
    //     attestee: web3.PublicKey; // Solana attestee
    //     attester: web3.PublicKey; // Solana attester guardian we're requesting from
    //   }
    // ): Promise<web3.TransactionInstruction> {
    // const [queuePDA, queueBump] = PublicKey.findProgramAddressSync(
    //   [Buffer.from("Queue"), params.queue.toBuffer()],
    //   program.programId
    // );
    // timestamp handled by bridge fn
    // mrEnclave handled by bridge fn
    // secp256k1Key handled by bridge fn
    // slot has to be handled by us I think
    // signature has to be handled by bridge fn
    // recoveryId has to be handled by bridge fn
    // guardian key & oracle key
    // source oracle key handled by us:
    // source oracle queue key handled by us:
    // source guardian queue key handled by us:
    // const ix = await program.instruction.guardianQuoteVerifySvm(
    //   {
    //     timestamp: new anchor.BN(params.timestamp),
    //     mrEnclave: params.mrEnclave, // 32-byte array
    //     _reserved1: params._reserved1, // 32-bit unsigned integer
    //     secp256k1Key: params.secp256k1Key, // 64-byte array
    //     slot: new anchor.BN(params.slot), // Slot as u64
    //     signature: params.signature, // 64-byte array
    //     recoveryId: params.recoveryId, // u8
    //     sourceOracleKey: params.sourceOracleKey, // Pubkey of source oracle
    //     sourceOracleQueueKey: params.sourceOracleQueueKey, // Pubkey of oracle queue
    //     sourceGuardianQueueKey: params.sourceGuardianQueueKey, // Pubkey of guardian queue
    //     oracleBump: params.oracleBump, // Bump for oracle PDA
    //     oracleQueueBump: params.oracleQueueBump, // Bump for oracle queue PDA
    //     guardianQueueBump: params.guardianQueueBump, // Bump for guardian queue PDA
    //   },
    //   {
    //     accounts: {
    //       guardian: guardianAccountLoader, // AccountLoader for OracleAccountData
    //       oracle: oracleAccountLoader, // AccountLoader for OracleAccountData
    //       oracleStats: oracleStatsAccountLoader, // AccountLoader for OracleStatsAccountData
    //       payer: payer.publicKey, // Signer for transaction
    //       systemProgram: SystemProgram.programId, // System program ID
    //       oracleQueue: oracleQueueAccountLoader, // AccountLoader for QueueAccountData
    //       guardianQueue: guardianQueueAccountLoader, // AccountLoader for QueueAccountData
    //       state: stateAccountLoader, // AccountLoader for State
    //       recentSlothashes: anchor.web3.SYSVAR_SLOT_HASHES_PUBKEY, // Sysvar slot hashes
    //       lutSigner: lutSignerAccount, // AccountInfo for lut signer
    //       lut: lutAccount, // AccountInfo for lut (lookup table)
    //       programState: programStateAccountLoader, // AccountLoader for State
    //     },
    //     signers: [payer], // Add payer as the signer for the instruction
    //   }
    // );
    //   throw new Error('Quote verify SVM not implemented yet.');
    // }
    findSolanaOracleFromPDA() {
        return __awaiter(this, void 0, void 0, function*() {
            const oracleData = yield this.loadData();
            const isMainnet = oracleData.queue.equals(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ON_DEMAND_MAINNET_QUEUE_PDA"]);
            const queue = yield __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getQueue"]({
                program: this.program,
                queueAddress: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDefaultQueueAddress"](isMainnet)
            });
            const solanaOracles = yield queue.fetchOracleKeys();
            for (const oracle of solanaOracles){
                const [oraclePDA] = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.findProgramAddressSync([
                    __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from('Oracle'),
                    oracleData.queue.toBuffer(),
                    oracle.toBuffer()
                ], this.program.programId);
                if (oraclePDA.equals(this.pubkey)) {
                    return {
                        oracleData: yield new Oracle(queue.program, oracle).loadData(),
                        oracle
                    };
                }
            }
            throw new Error(`Solana Oracle not found for ${this.pubkey.toBase58()}`);
        });
    }
    setConfigsIx(params) {
        return __awaiter(this, void 0, void 0, function*() {
            const ix = yield this.program.instruction.oracleSetConfigs({
                authority: params.authority,
                newSecpAuthority: null
            }, {
                accounts: {
                    oracle: this.pubkey,
                    authority: params.authority
                }
            });
            return ix;
        });
    }
    /**
     *  Loads the oracle data for this {@linkcode Oracle} account from on chain.
     *
     *  @returns A promise that resolves to the oracle data.
     *  @throws if the oracle account does not exist.
     */ loadData() {
        return __awaiter(this, void 0, void 0, function*() {
            return yield Oracle.loadData(this.program, this.pubkey);
        });
    }
    fetchGateway() {
        return __awaiter(this, void 0, void 0, function*() {
            const data = yield this.loadData();
            const gw = __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(data.gatewayUri).toString();
            return gw.replace(/\0+$/, '');
        });
    }
    /**
     *  Loads the oracle data for this {@linkcode Oracle} account from on chain.
     *
     *  @returns A promise that resolves to the oracle data.
     *  @throws if the oracle account does not exist.
     */ static loadData(program, pubkey) {
        return __awaiter(this, void 0, void 0, function*() {
            return yield program.account['oracleAccountData'].fetch(pubkey);
        });
    }
    /**
     * Loads the oracle data for a list of {@linkcode Oracle} accounts from on chain.
     *
     * @param program - The program that owns the oracle accounts.
     * @param keys - The public keys of the oracle accounts to load.
     * @returns A promise that resolves to an array of oracle data.
     * @throws if any of the oracle accounts do not exist.
     */ static loadMany(program, keys) {
        return __awaiter(this, void 0, void 0, function*() {
            return yield program.account['oracleAccountData'].fetchMultiple(keys);
        });
    }
    /**
     * Loads the oracle data and checks if the oracle is verified.
     *
     * @returns A promise that resolves to a tuple containing a boolean indicating
     * if the oracle is verified and the expiration time of the verification.
     * @throws if the oracle account does not exist.
     */ verificationStatus() {
        return __awaiter(this, void 0, void 0, function*() {
            const data = yield this.loadData();
            const now = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](Date.now() / 1000);
            const status = data.enclave.verificationStatus;
            const expiration = data.enclave.validUntil;
            return [
                status === 4 && now.lt(expiration),
                expiration.toNumber()
            ];
        });
    }
    /**
     * Get the pubkey of the stats account for this oracle.
     * @returns A promise that resolves to the pubkey of the stats account.
     */ statsKey() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.findProgramAddressSync([
            __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from('OracleStats'),
            this.pubkey.toBuffer()
        ], this.program.programId)[0];
    }
    loadLookupTableKey() {
        return __awaiter(this, void 0, void 0, function*() {
            const data = yield this.loadData();
            return this.lookupTableKey(data);
        });
    }
    lookupTableKey(data) {
        const lutSigner = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$lookupTable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLutSigner"])(this.program.programId, this.pubkey);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$lookupTable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLutKey"])(lutSigner, data.lutSlot);
    }
    loadLookupTable() {
        return __awaiter(this, void 0, void 0, function*() {
            if (this.lut !== null && this.lut !== undefined) return this.lut;
            const lutKey = yield this.loadLookupTableKey();
            const accnt = yield this.program.provider.connection.getAddressLookupTable(lutKey);
            this.lut = accnt.value;
            return this.lut;
        });
    }
    setOperatorIx(params) {
        return __awaiter(this, void 0, void 0, function*() {
            const data = yield this.loadData();
            const ix = yield this.program.instruction.oracleSetOperator({}, {
                accounts: {
                    oracle: this.pubkey,
                    operator: params.operator,
                    authority: data.authority
                }
            });
            return ix;
        });
    }
} //# sourceMappingURL=oracle.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/utils/fs.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getFs",
    ()=>getFs
]);
const getFs = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
    } catch (error) {
        console.error(error);
        throw new Error('Failed to load file system module');
    }
}; //# sourceMappingURL=fs.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/anchor-utils/AnchorUtils.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnchorUtils",
    ()=>AnchorUtils
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/utils/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$fs$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/utils/fs.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$30$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.30.1_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$30$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.30.1_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/provider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$30$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$coder$2f$borsh$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.30.1_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/coder/borsh/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$30$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$program$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.30.1_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/program/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript) <export * as web3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$js$2d$yaml$40$4$2e$1$2e$1$2f$node_modules$2f$js$2d$yaml$2f$dist$2f$js$2d$yaml$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/js-yaml@4.1.1/node_modules/js-yaml/dist/js-yaml.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$os__$5b$external$5d$__$28$os$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/os [external] (os, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __awaiter = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
;
;
;
;
;
const readonlyWallet = {
    publicKey: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.default,
    signTransaction: ()=>{
        throw new Error('Program is in `readonly` mode.');
    },
    signAllTransactions: ()=>{
        throw new Error('Program is in `readonly` mode.');
    }
};
class AnchorUtils {
    static initWalletFromKeypair(keypair) {
        return __awaiter(this, void 0, void 0, function*() {
            const { default: NodeWallet } = yield __turbopack_context__.A("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.30.1_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/cjs/nodewallet.js [app-route] (ecmascript, async loader)");
            return new NodeWallet(keypair);
        });
    }
    /**
     * Initializes a wallet from a file.
     *
     * @param {string} filePath - The path to the file containing the wallet's secret key.
     * @returns {Promise<[Wallet, web3.Keypair]>} A promise that resolves to a tuple containing the wallet and the keypair.
     */ static initWalletFromFile(filePath) {
        return __awaiter(this, void 0, void 0, function*() {
            const keypair = yield AnchorUtils.initKeypairFromFile(filePath);
            const wallet = yield AnchorUtils.initWalletFromKeypair(keypair);
            return [
                wallet,
                keypair
            ];
        });
    }
    /**
     * Initializes a keypair from a file.
     *
     * @param {string} filePath - The path to the file containing the keypair's secret key.
     * @returns {Promise<web3.Keypair>} A promise that resolves to the keypair.
     */ static initKeypairFromFile(filePath) {
        return __awaiter(this, void 0, void 0, function*() {
            const secretKeyString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$fs$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFs"])().readFileSync(filePath, {
                encoding: 'utf8'
            });
            const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
            const keypair = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].Keypair.fromSecretKey(secretKey);
            return keypair;
        });
    }
    /**
     * Loads an Anchor program from a connection.
     *
     * @param {web3.Connection} connection - The connection to load the program from.
     * @param {Wallet} wallet - An optional wallet to load the program from.
     * @param {web3.PublicKey} programId - An optional program ID to load the program from.
     * @returns {Promise<Program>} A promise that resolves to the loaded Anchor program.
     */ static loadProgramFromConnection(connection, wallet, programId) {
        return __awaiter(this, void 0, void 0, function*() {
            const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$30$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AnchorProvider"](connection, wallet !== null && wallet !== void 0 ? wallet : readonlyWallet);
            return yield AnchorUtils.loadProgramFromProvider(provider, programId);
        });
    }
    /**
     * Loads an Anchor program from a provider.
     *
     * @param {Provider} provider - The provider to load the program from.
     * @param {web3.PublicKey} programId - An optional program ID to load the program from.
     * @returns {Promise<Program>} A promise that resolves to the loaded Anchor program.
     */ static loadProgramFromProvider(provider, programId) {
        return __awaiter(this, void 0, void 0, function*() {
            const pid = yield (()=>__awaiter(this, void 0, void 0, function*() {
                    if (programId) return programId;
                    const isSolanaDevnet = yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDevnetConnection"])(provider.connection);
                    return isSolanaDevnet ? __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ON_DEMAND_DEVNET_PID"] : __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ON_DEMAND_MAINNET_PID"];
                }))();
            return yield __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$30$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$program$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Program"].at(pid, provider);
        });
    }
    /**
     * Loads an Anchor program from the environment.
     *
     * @returns {Promise<Program>} A promise that resolves to the loaded Anchor program.
     */ static loadProgramFromEnv() {
        return __awaiter(this, void 0, void 0, function*() {
            const config = yield AnchorUtils.loadEnv();
            const isDevnet = yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDevnetConnection"])(config.connection);
            const pid = isDevnet ? __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ON_DEMAND_DEVNET_PID"] : __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ON_DEMAND_MAINNET_PID"];
            return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$30$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$program$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Program"].at(pid, config.provider);
        });
    }
    /**
     * Loads the same environment set for the Solana CLI.
     *
     * @returns {Promise<SolanaConfig>} A promise that resolves to the Solana configuration.
     */ static loadEnv() {
        return __awaiter(this, void 0, void 0, function*() {
            var _a;
            const configPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(__TURBOPACK__imported__module__$5b$externals$5d2f$os__$5b$external$5d$__$28$os$2c$__cjs$29$__["default"].homedir(), '.config/solana/cli/config.yml');
            const fileContents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$fs$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFs"])().readFileSync(configPath, 'utf8');
            const data = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$js$2d$yaml$40$4$2e$1$2e$1$2f$node_modules$2f$js$2d$yaml$2f$dist$2f$js$2d$yaml$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].load(fileContents);
            const commitment = data.commitment;
            const connection = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].Connection(data.json_rpc_url, {
                commitment,
                wsEndpoint: data.websocket_url
            });
            const keypairPath = data.keypair_path;
            const keypair = (yield AnchorUtils.initWalletFromFile(keypairPath))[1];
            const wallet = yield this.initWalletFromKeypair(keypair);
            const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$30$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AnchorProvider"](connection, wallet);
            const isMainnet = yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isMainnetConnection"])(connection);
            const pid = isMainnet ? __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ON_DEMAND_MAINNET_PID"] : __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ON_DEMAND_DEVNET_PID"];
            const program = yield __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$30$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$program$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Program"].at(pid, provider);
            return {
                rpcUrl: connection.rpcEndpoint,
                webSocketUrl: data.websocket_url,
                connection: connection,
                commitment: (_a = connection.commitment) !== null && _a !== void 0 ? _a : 'confirmed',
                keypairPath: keypairPath,
                keypair: keypair,
                provider: provider,
                wallet: wallet,
                program: program
            };
        });
    }
    /**
     * Parse out anchor events from the logs present in the program IDL.
     *
     * @param {Program} program - The Anchor program instance.
     * @param {string[]} logs - The array of logs to parse.
     * @returns {any[]} An array of parsed events.
     */ static loggedEvents(program, logs) {
        const coder = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$30$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$coder$2f$borsh$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BorshEventCoder"](program.idl);
        const out = [];
        logs.forEach((log)=>{
            if (log.startsWith('Program data: ')) {
                const strings = log.split(' ');
                if (strings.length !== 3) return;
                try {
                    out.push(coder.decode(strings[2]));
                } catch (_a) {} // eslint-disable-line no-empty
            }
        });
        return out;
    }
} //# sourceMappingURL=AnchorUtils.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/utils/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ON_DEMAND_DEVNET_GUARDIAN_QUEUE",
    ()=>ON_DEMAND_DEVNET_GUARDIAN_QUEUE,
    "ON_DEMAND_DEVNET_PID",
    ()=>ON_DEMAND_DEVNET_PID,
    "ON_DEMAND_DEVNET_QUEUE",
    ()=>ON_DEMAND_DEVNET_QUEUE,
    "ON_DEMAND_DEVNET_QUEUE_PDA",
    ()=>ON_DEMAND_DEVNET_QUEUE_PDA,
    "ON_DEMAND_MAINNET_GUARDIAN_QUEUE",
    ()=>ON_DEMAND_MAINNET_GUARDIAN_QUEUE,
    "ON_DEMAND_MAINNET_PID",
    ()=>ON_DEMAND_MAINNET_PID,
    "ON_DEMAND_MAINNET_QUEUE",
    ()=>ON_DEMAND_MAINNET_QUEUE,
    "ON_DEMAND_MAINNET_QUEUE_PDA",
    ()=>ON_DEMAND_MAINNET_QUEUE_PDA,
    "createLoadLookupTables",
    ()=>createLoadLookupTables,
    "fetchAllLutKeys",
    ()=>fetchAllLutKeys,
    "getAssociatedTokenAddress",
    ()=>getAssociatedTokenAddress,
    "getAssociatedTokenAddressSync",
    ()=>getAssociatedTokenAddressSync,
    "getDefaultDevnetGuardianQueue",
    ()=>getDefaultDevnetGuardianQueue,
    "getDefaultDevnetQueue",
    ()=>getDefaultDevnetQueue,
    "getDefaultGuardianQueue",
    ()=>getDefaultGuardianQueue,
    "getDefaultQueue",
    ()=>getDefaultQueue,
    "getDefaultQueueAddress",
    ()=>getDefaultQueueAddress,
    "getNodePayer",
    ()=>getNodePayer,
    "getProgramId",
    ()=>getProgramId,
    "getQueue",
    ()=>getQueue,
    "isDevnetConnection",
    ()=>isDevnetConnection,
    "isMainnetConnection",
    ()=>isMainnetConnection,
    "loadLookupTables",
    ()=>loadLookupTables,
    "storeFeed",
    ()=>storeFeed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$oracle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/oracle.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$queue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/queue.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$anchor$2d$utils$2f$AnchorUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/anchor-utils/AnchorUtils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/constants.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$30$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.30.1_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript) <export * as web3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$CrossbarClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/CrossbarClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/buffer [external] (buffer, cjs)");
var __awaiter = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
;
;
;
;
;
;
function createLoadLookupTables() {
    const promiseMap = new Map();
    function loadLookupTables(accounts) {
        return __awaiter(this, void 0, void 0, function*() {
            for (const account of accounts){
                const pubkey = account.pubkey.toString();
                if (pubkey && account.loadLookupTable) {
                    if (!promiseMap.has(pubkey)) {
                        promiseMap.set(pubkey, account.loadLookupTable());
                    }
                }
            }
            const out = [];
            for (const account of accounts){
                const promise = promiseMap.get(account.pubkey.toString());
                if (promise) out.push(promise);
            }
            return Promise.all(out).then((arr)=>{
                return arr.filter((x)=>Boolean(x));
            });
        });
    }
    return loadLookupTables;
}
const loadLookupTables = createLoadLookupTables();
const ON_DEMAND_MAINNET_PID = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey('SBondMDrcV3K4kxZR1HNVT7osZxAHVHgYXL5Ze1oMUv');
const ON_DEMAND_MAINNET_GUARDIAN_QUEUE = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey('B7WgdyAgzK7yGoxfsBaNnY6d41bTybTzEh4ZuQosnvLK');
const ON_DEMAND_MAINNET_QUEUE = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey('A43DyUGA7s8eXPxqEjJY6EBu1KKbNgfxF8h17VAHn13w');
const ON_DEMAND_MAINNET_QUEUE_PDA = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.findProgramAddressSync([
    __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from('Queue'),
    ON_DEMAND_MAINNET_QUEUE.toBuffer()
], ON_DEMAND_MAINNET_PID)[0];
const ON_DEMAND_DEVNET_PID = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey('Aio4gaXjXzJNVLtzwtNVmSqGKpANtXhybbkhtAC94ji2');
const ON_DEMAND_DEVNET_GUARDIAN_QUEUE = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey('BeZ4tU4HNe2fGQGUzJmNS2UU2TcZdMUUgnCH6RPg4Dpi');
const ON_DEMAND_DEVNET_QUEUE = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey('EYiAmGSdsQTuCw413V5BzaruWuCCSDgTPtBGvLkXHbe7');
const ON_DEMAND_DEVNET_QUEUE_PDA = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.findProgramAddressSync([
    __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from('Queue'),
    ON_DEMAND_DEVNET_QUEUE.toBuffer()
], ON_DEMAND_MAINNET_PID // SVM Devnet networks should be launched with SBond... as PID
)[0];
function isMainnetConnection(connection) {
    return __awaiter(this, void 0, void 0, function*() {
        try {
            const genesisHash = yield connection.getGenesisHash();
            return genesisHash === '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d';
        } catch (_a) {
            return false;
        }
    });
}
function isDevnetConnection(connection) {
    return __awaiter(this, void 0, void 0, function*() {
        try {
            const genesisHash = yield connection.getGenesisHash();
            return genesisHash === 'EtWTRABZaYq6iMfeYKouRu166VU2xqa1wcaWoxPkrZBG';
        } catch (_a) {
            return false;
        }
    });
}
function getProgramId(connection) {
    return __awaiter(this, void 0, void 0, function*() {
        const isDevnet = connection.rpcEndpoint.includes('devnet');
        return isDevnet ? ON_DEMAND_DEVNET_PID : ON_DEMAND_MAINNET_PID;
    });
}
function getDefaultDevnetQueue() {
    return __awaiter(this, arguments, void 0, function*(solanaRPCUrl = 'https://api.devnet.solana.com') {
        return getQueue({
            solanaRPCUrl,
            queueAddress: ON_DEMAND_DEVNET_QUEUE.toString()
        });
    });
}
function getDefaultDevnetGuardianQueue() {
    return __awaiter(this, arguments, void 0, function*(solanaRPCUrl = 'https://api.devnet.solana.com') {
        return getQueue({
            solanaRPCUrl,
            queueAddress: ON_DEMAND_DEVNET_GUARDIAN_QUEUE.toString()
        });
    });
}
function getDefaultQueueAddress(isMainnet) {
    return isMainnet ? ON_DEMAND_MAINNET_QUEUE : ON_DEMAND_DEVNET_QUEUE;
}
function getDefaultQueue() {
    return __awaiter(this, arguments, void 0, function*(solanaRPCUrl = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].clusterApiUrl('mainnet-beta')) {
        const connection = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].Connection(solanaRPCUrl, 'confirmed');
        const isMainnet = yield isMainnetConnection(connection);
        const queueAddress = getDefaultQueueAddress(isMainnet);
        return getQueue({
            solanaRPCUrl,
            queueAddress
        });
    });
}
function getDefaultGuardianQueue() {
    return __awaiter(this, arguments, void 0, function*(solanaRPCUrl = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].clusterApiUrl('mainnet-beta')) {
        return getQueue({
            solanaRPCUrl,
            queueAddress: ON_DEMAND_MAINNET_GUARDIAN_QUEUE.toString()
        });
    });
}
function getQueue(params) {
    return __awaiter(this, void 0, void 0, function*() {
        const queue = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey(params.queueAddress);
        const program = 'program' in params ? params.program : yield __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$anchor$2d$utils$2f$AnchorUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AnchorUtils"].loadProgramFromConnection(new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].Connection(params.solanaRPCUrl, 'confirmed'));
        return new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$queue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Queue"](program, queue);
    });
}
function fetchAllLutKeys(queue, feeds) {
    return __awaiter(this, void 0, void 0, function*() {
        const oracles = yield queue.fetchOracleKeys();
        const lutOwners = [];
        lutOwners.push(queue);
        feeds.forEach((feed)=>lutOwners.push(feed));
        oracles.forEach((oracle)=>lutOwners.push(new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$oracle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Oracle"](queue.program, oracle)));
        const lutPromises = lutOwners.map((lutOwner)=>lutOwner.loadLookupTable());
        const luts = yield Promise.all(lutPromises);
        const keyset = new Set();
        luts.forEach((lut)=>lut.state.addresses.forEach(keyset.add));
        return Array.from(keyset).map((key)=>new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey(key));
    });
}
function storeFeed(queue_1, jobs_1) {
    return __awaiter(this, arguments, void 0, function*(queue, jobs, crossbarUrl = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$CrossbarClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CrossbarClient"].default().crossbarUrl) {
        const crossbar = crossbarUrl.endsWith('/') ? crossbarUrl.slice(0, -1) : crossbarUrl;
        const x = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$CrossbarClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CrossbarClient"](crossbar);
        return yield x.store(queue, jobs);
    });
}
function getAssociatedTokenAddress(mint_1, owner_1) {
    return __awaiter(this, arguments, void 0, function*(mint, owner, allowOwnerOffCurve = false, programId = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_TOKEN_PROGRAM_ID"], associatedTokenProgramId = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID"]) {
        if (!allowOwnerOffCurve && !__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.isOnCurve(owner.toBuffer())) {
            throw new Error('TokenOwnerOffCurveError');
        }
        const [address] = yield __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.findProgramAddress([
            owner.toBuffer(),
            programId.toBuffer(),
            mint.toBuffer()
        ], associatedTokenProgramId);
        return address;
    });
}
function getAssociatedTokenAddressSync(mint, owner, allowOwnerOffCurve = false, programId = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_TOKEN_PROGRAM_ID"], associatedTokenProgramId = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID"]) {
    if (!allowOwnerOffCurve && !__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.isOnCurve(owner.toBuffer())) {
        throw new Error('TokenOwnerOffCurveError');
    }
    const [address] = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.findProgramAddressSync([
        owner.toBuffer(),
        programId.toBuffer(),
        mint.toBuffer()
    ], associatedTokenProgramId);
    return address;
}
function getNodePayer(program) {
    return program.provider.wallet.payer; // eslint-disable-line @typescript-eslint/no-explicit-any
} //# sourceMappingURL=index.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/lutMap.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LutMap",
    ()=>LutMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/constants.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/utils/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$lookupTable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/utils/lookupTable.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$queue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/queue.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/state.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$30$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.30.1_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript) <export * as web3>");
var __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/buffer [external] (buffer, cjs)");
var __awaiter = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
;
;
;
;
;
;
class LutMap {
    /**
     *  The public key of the LUT map account.
     */ static keyFromSeed(program, queue, authority) {
        return __awaiter(this, void 0, void 0, function*() {
            const [lut] = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.findProgramAddressSync([
                __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from('LutMapAccountData'),
                queue.toBuffer(),
                authority.toBuffer()
            ], program.programId);
            return lut;
        });
    }
    /**
     * Creating a LUT map account will allow a user or protocol to easy manage
     * and associate a common account grouping for their feeds to reduce the
     * total number of transaction bytes taken by Switchboard.
     * This will maximize the flexibility users have in their instructions.
     *
     * @param program - The program that owns the LUT map account.
     * @param queue - The queue account that the LUT map is associated with.
     * @param slot - The slot that the LUT map is associated with.
     * @returns A promise that resolves to the LUT map and the transaction signature.
     */ static create(program, queue, slot) {
        return __awaiter(this, void 0, void 0, function*() {
            const payer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getNodePayer"])(program);
            const lutKey = yield LutMap.keyFromSeed(program, queue, payer.publicKey);
            const sig = yield program.rpc.lutMapInit({
                slot
            }, {
                accounts: {
                    lutMap: lutKey,
                    queue: queue,
                    payer: payer.publicKey,
                    authority: payer.publicKey,
                    systemProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].SystemProgram.programId
                },
                signers: [
                    payer
                ]
            });
            return [
                new LutMap(program, lutKey),
                sig
            ];
        });
    }
    constructor(program, pubkey){
        this.program = program;
        this.pubkey = pubkey;
    }
    queueLutExtendIx(params) {
        return __awaiter(this, void 0, void 0, function*() {
            const payer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getNodePayer"])(this.program);
            const queueAccount = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$queue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Queue"](this.program, params.queue);
            const queueData = yield queueAccount.loadData();
            const lutKey = yield LutMap.keyFromSeed(this.program, params.queue, payer.publicKey);
            const lutSigner = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$lookupTable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLutSigner"])(this.program.programId, params.queue);
            const ix = yield this.program.instruction.queueLutExtend({
                newKey: params.newKey
            }, {
                accounts: {
                    queue: params.queue,
                    authority: queueData.authority,
                    lutSigner,
                    lut: lutKey,
                    addressLookupTableProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].AddressLookupTableProgram.programId,
                    payer: payer.publicKey,
                    systemProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].SystemProgram.programId
                }
            });
            return ix;
        });
    }
    /**
     *  Loads the data for this {@linkcode LutMap} account from on chain.
     *
     *  @returns A promise that resolves to the data.
     *  @throws if the account does not exist.
     */ loadData() {
        return __awaiter(this, void 0, void 0, function*() {
            return yield this.program.account['lutMapAccountData'].fetch(this.pubkey);
        });
    }
    loadLut() {
        return __awaiter(this, void 0, void 0, function*() {
            const data = yield this.loadData();
            const lutKey = data.lut;
            const lutAccountInfo = yield this.program.provider.connection.getAccountInfo(lutKey);
            const lutData = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].AddressLookupTableAccount.deserialize(lutAccountInfo.data);
            return [
                lutKey,
                lutData
            ];
        });
    }
    syncLut(feeds) {
        return __awaiter(this, void 0, void 0, function*() {
            const wrapperData = yield this.loadData();
            const queueKey = wrapperData.queue;
            const queue = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$queue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Queue"](this.program, queueKey);
            const queueData = yield queue.loadData();
            const oracles = queueData.oracleKeys.slice(0, queueData.oracleKeysLen);
            const neededLutAccounts = [];
            neededLutAccounts.push(queueKey);
            neededLutAccounts.push(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SOL_NATIVE_MINT"]);
            neededLutAccounts.push(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_TOKEN_PROGRAM_ID"]);
            neededLutAccounts.push(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID"]);
            neededLutAccounts.push(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["State"].keyFromSeed(this.program));
            for (const oracle of oracles){
                for (const feed of feeds){
                    const [statsKey] = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.findProgramAddressSync([
                        __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from('OracleFeedStats'),
                        feed.toBuffer(),
                        oracle.toBuffer()
                    ], this.program.programId);
                    const feedRewardEscrow = yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssociatedTokenAddress"])(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SOL_NATIVE_MINT"], feed);
                    neededLutAccounts.push(statsKey);
                    neededLutAccounts.push(feed);
                    neededLutAccounts.push(oracle);
                    neededLutAccounts.push(feedRewardEscrow);
                }
            }
        // TODO: do anneal here
        });
    }
} //# sourceMappingURL=lutMap.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/sysvars/recentSlothashes.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RecentSlotHashes",
    ()=>RecentSlotHashes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/constants.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$30$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.30.1_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bn.js@5.2.2/node_modules/bn.js/lib/bn.js [app-route] (ecmascript) <export default as BN>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$6$2e$0$2e$0$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bs58@6.0.0/node_modules/bs58/src/esm/index.js [app-route] (ecmascript)");
var __awaiter = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
;
;
class RecentSlotHashes {
    /**
     *  Disable object instantiation.
     */ constructor(){}
    /**
     * Fetches the latest slot hash from the sysvar.
     * @param connection The connection to use.
     * @returns A promise that resolves to the latest slot number and hash.
     */ static fetchLatest(connection) {
        return __awaiter(this, void 0, void 0, function*() {
            const defaultHash = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$6$2e$0$2e$0$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].encode(Array(32).fill(0));
            const accountInfo = yield connection.getAccountInfo(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_SYSVAR_SLOT_HASHES_ID"], {
                commitment: 'finalized',
                dataSlice: {
                    length: 40,
                    offset: 8
                }
            });
            if (!accountInfo) {
                return [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](0),
                    defaultHash
                ];
            }
            const buffer = accountInfo.data;
            const slotNumber = buffer.readBigUInt64LE(0);
            const encoded = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$6$2e$0$2e$0$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].encode(Uint8Array.prototype.slice.call(buffer, 8));
            return [
                new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](slotNumber.toString()),
                encoded
            ];
        });
    }
    static fetchLatestNSlothashes(connection, n) {
        return __awaiter(this, void 0, void 0, function*() {
            const defaultHash = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$6$2e$0$2e$0$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].encode(Array(32).fill(0));
            const accountInfo = yield connection.getAccountInfo(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_SYSVAR_SLOT_HASHES_ID"], {
                commitment: 'finalized',
                dataSlice: {
                    length: 40 * Math.floor(n),
                    offset: 8
                }
            });
            if (!accountInfo) {
                return Array.from({
                    length: n
                }, ()=>[
                        new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](0),
                        defaultHash
                    ]);
            }
            const out = [];
            const buffer = accountInfo.data;
            for(let i = 0; i < n; i++){
                const slotNumber = buffer.readBigUInt64LE(i * 40);
                const hashStart = i * 40 + 8;
                const hashEnd = hashStart + 32;
                const encoded = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$6$2e$0$2e$0$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].encode(Uint8Array.prototype.slice.call(buffer, hashStart, hashEnd));
                out.push([
                    new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](slotNumber.toString()),
                    encoded
                ]);
            }
            return out;
        });
    }
} //# sourceMappingURL=recentSlothashes.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/pullFeed.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OracleResponse",
    ()=>OracleResponse,
    "PullFeed",
    ()=>PullFeed,
    "toFeedValue",
    ()=>toFeedValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$anchor$2d$utils$2f$AnchorUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/anchor-utils/AnchorUtils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/constants.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$instruction$2d$utils$2f$InstructionUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/instruction-utils/InstructionUtils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$instruction$2d$utils$2f$Secp256k1InstructionUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/instruction-utils/Secp256k1InstructionUtils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$sysvars$2f$recentSlothashes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/sysvars/recentSlothashes.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/utils/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$lookupTable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/utils/lookupTable.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$oracle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/oracle.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$queue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/queue.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/state.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$30$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.30.1_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bn.js@5.2.2/node_modules/bn.js/lib/bn.js [app-route] (ecmascript) <export default as BN>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$30$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$coder$2f$borsh$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.30.1_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/coder/borsh/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript) <export * as web3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$CrossbarClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/CrossbarClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$FeedHash$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/FeedHash.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/utils/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/buffer [external] (buffer, cjs)");
var __awaiter = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
class OracleResponse {
    constructor(oracle, value, error){
        this.oracle = oracle;
        this.value = value;
        this.error = error;
    }
    shortError() {
        if (this.error === '[]') {
            return undefined;
        }
        const parts = this.error.split('\n');
        return parts[0];
    }
}
function padStringWithNullBytes(input, desiredLength = 32) {
    const nullByte = '\0';
    while(input.length < desiredLength){
        input += nullByte;
    }
    return input;
}
function toFeedValue(submissions, onlyAfter) {
    let values = submissions.filter((x)=>x.slot.gt(onlyAfter));
    if (values.length === 0) {
        return null;
    }
    values = values.sort((x, y)=>x.value.lt(y.value) ? -1 : 1);
    return values[Math.floor(values.length / 2)];
}
function getIsSolana(chain) {
    return chain === undefined || chain === 'solana';
}
function getIsMainnet(network) {
    return network === 'mainnet' || network === 'mainnet-beta';
}
/**
 *  Checks if the pull feed account needs to be initialized.
 *
 *  @param connection The connection to use.
 *  @param programId The program ID.
 *  @param pubkey The public key of the pull feed account.
 *  @returns A promise that resolves to a boolean indicating if the account needs to be initialized.
 */ function checkNeedsInit(connection, programId, pubkey) {
    return __awaiter(this, void 0, void 0, function*() {
        const accountInfo = yield connection.getAccountInfo(pubkey);
        if (accountInfo === null) return true;
        const owner = accountInfo.owner;
        if (!owner.equals(programId)) return true;
        return false;
    });
}
class PullFeed {
    /**
     * Constructs a `PullFeed` instance.
     *
     * @param program - The Anchor program instance.
     * @param pubkey - The public key of the pull feed account.
     */ constructor(program, pubkey){
        this.program = program;
        this.gatewayUrl = '';
        this.pubkey = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey(pubkey);
        this.configs = null;
        this.jobs = null;
    }
    static generate(program) {
        const keypair = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].Keypair.generate();
        const feed = new PullFeed(program, keypair.publicKey);
        return [
            feed,
            keypair
        ];
    }
    lookupTableKey(data) {
        return __awaiter(this, void 0, void 0, function*() {
            const lutSigner = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$lookupTable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLutSigner"])(this.program.programId, this.pubkey);
            const { lutSlot } = data !== null && data !== void 0 ? data : yield this.loadData();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$lookupTable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLutKey"])(lutSigner, lutSlot);
        });
    }
    /**
     * Prefetch all lookup tables needed for the feed and queue.
     * @returns A promise that resolves to an array of lookup tables.
     * @throws if the lookup tables cannot be loaded.
     */ preHeatLuts() {
        return __awaiter(this, void 0, void 0, function*() {
            const data = yield this.loadData();
            const queue = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$queue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Queue"](this.program, data.queue);
            const oracleKeys = yield queue.fetchOracleKeys();
            const oracles = oracleKeys.map((k)=>new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$oracle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Oracle"](this.program, k));
            const lutOwners = [
                ...oracles,
                queue,
                this
            ];
            const luts = yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadLookupTables"])(lutOwners);
            return luts;
        });
    }
    static initTx(program, params) {
        return __awaiter(this, void 0, void 0, function*() {
            const [pullFeed, keypair] = PullFeed.generate(program);
            const ix = yield pullFeed.initIx(params);
            const tx = yield __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$instruction$2d$utils$2f$InstructionUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InstructionUtils"].asV0TxWithComputeIxs({
                connection: program.provider.connection,
                ixs: [
                    ix
                ]
            });
            tx.sign([
                keypair
            ]);
            return [
                pullFeed,
                tx
            ];
        });
    }
    static getPayer(program, payer) {
        var _a;
        return (_a = payer !== null && payer !== void 0 ? payer : program.provider.publicKey) !== null && _a !== void 0 ? _a : __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.default;
    }
    getPayer(payer) {
        return PullFeed.getPayer(this.program, payer);
    }
    /**
     *  Calls to initialize a pull feed account and to update the configuration account need to
     *  compute the feed hash for the account (if one is not specified).
     */ static feedHashFromParams(params) {
        const hash = (()=>{
            var _a;
            if (params.feedHash) {
                // If the feed hash is provided, use it.
                return params.feedHash;
            } else if ((_a = params.jobs) === null || _a === void 0 ? void 0 : _a.length) {
                // Else if jobs are provided, compute the feed hash from the queue and jobs.
                return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$FeedHash$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FeedHash"].compute(params.queue.toBuffer(), params.jobs);
            }
            throw new Error('Either "feedHash" or "jobs" must be provided.');
        })();
        if (hash.byteLength === 32) return hash;
        throw new Error('Feed hash must be 32 bytes');
    }
    /**
     * Initializes a pull feed account.
     *
     * @param {Program} program - The Anchor program instance.
     * @param {PublicKey} queue - The queue account public key.
     * @param {Array<IOracleJob>} jobs - The oracle jobs to execute.
     * @param {number} maxVariance - The maximum variance allowed for the feed.
     * @param {number} minResponses - The minimum number of job responses required.
     * @param {number} minSampleSize - The minimum number of samples required for setting feed value.
     * @param {number} maxStaleness - The maximum number of slots that can pass before a feed value is considered stale.
     * @returns {Promise<web3.TransactionInstruction>} A promise that resolves to the transaction instruction.
     */ initIx(params) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a;
            const program = this.program;
            const feedHash = PullFeed.feedHashFromParams({
                queue: params.queue,
                feedHash: 'feedHash' in params ? params.feedHash : undefined,
                jobs: 'jobs' in params ? params.jobs : undefined
            });
            const payerPublicKey = this.getPayer(params.payer);
            const maxVariance = Math.floor(params.maxVariance * 1e9);
            const lutSigner = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$lookupTable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLutSigner"])(program.programId, this.pubkey);
            const recentSlot = yield program.provider.connection.getSlot('finalized');
            const lutKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$lookupTable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLutKey"])(lutSigner, recentSlot);
            const ix = program.instruction.pullFeedInit({
                feedHash: feedHash,
                maxVariance: new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](maxVariance),
                minResponses: params.minResponses,
                name: __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(padStringWithNullBytes(params.name)),
                recentSlot: new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](recentSlot),
                ipfsHash: new Uint8Array(32),
                minSampleSize: params.minSampleSize,
                maxStaleness: params.maxStaleness,
                permitWriteByAuthority: (_a = params.permitWriteByAuthority) !== null && _a !== void 0 ? _a : null
            }, {
                accounts: {
                    pullFeed: this.pubkey,
                    queue: params.queue,
                    authority: payerPublicKey,
                    payer: payerPublicKey,
                    systemProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].SystemProgram.programId,
                    programState: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["State"].keyFromSeed(program),
                    rewardEscrow: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssociatedTokenAddressSync"](__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SOL_NATIVE_MINT"], this.pubkey),
                    tokenProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_TOKEN_PROGRAM_ID"],
                    associatedTokenProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID"],
                    wrappedSolMint: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SOL_NATIVE_MINT"],
                    lutSigner: lutSigner,
                    lut: lutKey,
                    addressLookupTableProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].AddressLookupTableProgram.programId
                }
            });
            return ix;
        });
    }
    closeIx(params) {
        return __awaiter(this, void 0, void 0, function*() {
            const payerPublicKey = this.getPayer(params.payer);
            const lutSigner = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$lookupTable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLutSigner"])(this.program.programId, this.pubkey);
            const data = yield this.loadData();
            const lutKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$lookupTable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLutKey"])(lutSigner, data.lutSlot);
            const ix = this.program.instruction.pullFeedClose({}, {
                accounts: {
                    pullFeed: this.pubkey,
                    authority: data.authority,
                    payer: payerPublicKey,
                    rewardEscrow: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssociatedTokenAddressSync"](__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SOL_NATIVE_MINT"], this.pubkey),
                    lutSigner: lutSigner,
                    lut: lutKey,
                    state: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["State"].keyFromSeed(this.program),
                    tokenProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_TOKEN_PROGRAM_ID"],
                    associatedTokenProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID"],
                    systemProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].SystemProgram.programId,
                    addressLookupTableProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].AddressLookupTableProgram.programId
                }
            });
            return ix;
        });
    }
    /**
     * Set configurations for the feed.
     *
     * @param params
     * @param params.feedHash - The hash of the feed as a `Uint8Array` or hexadecimal `string`. Only results signed with this hash will be accepted.
     * @param params.authority - The authority of the feed.
     * @param params.maxVariance - The maximum variance allowed for the feed.
     * @param params.minResponses - The minimum number of responses required.
     * @param params.minSampleSize - The minimum number of samples required for setting feed value.
     * @param params.maxStaleness - The maximum number of slots that can pass before a feed value is considered stale.
     * @returns A promise that resolves to the transaction instruction to set feed configs.
     */ setConfigsIx(params) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b, _c, _d, _e;
            const data = yield this.loadData();
            const name = params.name !== undefined ? __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(padStringWithNullBytes(params.name)) : null;
            const feedHash = params.feedHash || params.jobs ? PullFeed.feedHashFromParams({
                queue: data.queue,
                feedHash: params.feedHash,
                jobs: params.jobs
            }) : null;
            const ix = this.program.instruction.pullFeedSetConfigs({
                name: name,
                feedHash: feedHash,
                authority: (_a = params.authority) !== null && _a !== void 0 ? _a : null,
                maxVariance: params.maxVariance !== undefined ? new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](Math.floor(params.maxVariance * 1e9)) : null,
                minResponses: (_b = params.minResponses) !== null && _b !== void 0 ? _b : null,
                minSampleSize: (_c = params.minSampleSize) !== null && _c !== void 0 ? _c : null,
                maxStaleness: (_d = params.maxStaleness) !== null && _d !== void 0 ? _d : null,
                permitWriteByAuthority: (_e = params.permitWriteByAuthority) !== null && _e !== void 0 ? _e : null,
                ipfsHash: null
            }, {
                accounts: {
                    pullFeed: this.pubkey,
                    authority: data.authority
                }
            });
            return ix;
        });
    }
    /**
     * Fetch updates for the feed.
     *
     * @param {object} params_ - The parameters object.
     * @param {string} [params_.gateway] - Optionally specify the gateway to use. If not specified, the gateway is automatically fetched.
     * @param {number} [params_.numSignatures] - Number of signatures to fetch.
     * @param {FeedRequest} [params_.feedConfigs] - Optionally specify the feed configs. If not specified, the feed configs are automatically fetched.
     * @param {IOracleJob[]} [params_.jobs] - An array of `IOracleJob` representing the jobs to be executed.
     * @param {CrossbarClient} [params_.crossbarClient] - Optionally specify the CrossbarClient to use.
     * @param {Array<[BN, string]>} [recentSlothashes] - An optional array of recent slothashes as `[BN, string]` tuples.
     * @param {FeedEvalResponse[]} [priceSignatures] - An optional array of `FeedEvalResponse` representing the price signatures.
     * @param {boolean} [debug=false] - A boolean flag to enable or disable debug mode. Defaults to `false`.
     * @returns {Promise<[TransactionInstruction | undefined, OracleResponse[], number, any[]]>} A promise that resolves to a tuple containing:
     * - The transaction instruction to fetch updates, or `undefined` if not applicable.
     * - An array of `OracleResponse` objects.
     * - A number representing the successful responses.
     * - An array containing usable lookup tables.
     */ fetchUpdateIx(params_1) {
        return __awaiter(this, arguments, void 0, function*(params, debug = false, payer) {
            var _a;
            const feedConfigs = yield this.loadConfigs();
            const numSignatures = (_a = params.numSignatures) !== null && _a !== void 0 ? _a : feedConfigs.minSampleSize + Math.ceil(feedConfigs.minSampleSize / 3);
            return yield PullFeed.fetchUpdateIx(/* params= */ {
                pullFeed: this,
                gateway: params.gateway,
                chain: params.chain,
                network: params.network,
                numSignatures: numSignatures,
                crossbarClient: params.crossbarClient,
                solanaRpcUrl: params.solanaRpcUrl,
                recentSlothashes: params.recentSlothashes
            }, debug, payer);
        });
    }
    /**
     * Loads the feed configurations (if not already cached) for this {@linkcode PullFeed} account from on chain.
     * @returns A promise that resolves to the feed configurations.
     * @throws if the feed account does not exist.
     */ loadConfigs(force) {
        return __awaiter(this, void 0, void 0, function*() {
            // If forcing a reload or configs are not already cached, load the configs.
            if (force || !this.configs) {
                this.configs = yield (()=>__awaiter(this, void 0, void 0, function*() {
                        const data = yield this.loadData();
                        const maxVariance = data.maxVariance.toNumber() / 1e9;
                        return {
                            queue: data.queue,
                            maxVariance: maxVariance,
                            minResponses: data.minResponses,
                            feedHash: __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(data.feedHash),
                            minSampleSize: data.minSampleSize
                        };
                    }))();
            }
            return this.configs;
        });
    }
    /**
     * Fetches updates for a feed, returning instructions that must be executed in order at the front
     * of the transaction.
     *
     * @param program - The Anchor program instance
     * @param params - The parameters object
     * @param params.feed - PullFeed address to fetch updates for
     * @param params.gateway - Optional gateway URL to use for fetching updates
     * @param params.chain - Optional chain identifier (defaults to "solana")
     * @param params.network - Optional network identifier ("mainnet", "mainnet-beta", "testnet", "devnet")
     * @param params.numSignatures - Number of signatures to fetch
     * @param params.crossbarClient - Optional CrossbarClient instance to use
     * @param recentSlothashes - Optional array of recent slothashes as [BN, string] tuples
     * @param debug - Enable debug logging (default: false)
     * @param payer - Optional transaction payer public key
     * @returns Promise resolving to:
     * - instructions: Array of instructions that must be executed in order:
     *   [0] = secp256k1 program verification instruction
     *   [1] = feed update instruction
     * - oracleResponses: Array of responses from oracles
     * - numSuccesses: Number of successful responses
     * - luts: Array of AddressLookupTableAccount to include
     * - failures: Array of errors that occurred during the fetch
     */ static fetchUpdateIx(params, debug, payer) {
        return __awaiter(this, void 0, void 0, function*() {
            const isSolana = getIsSolana(params.chain);
            const { queue } = yield params.pullFeed.loadConfigs(false);
            // SVM chains that arent solana should use the older `fetchUpdateIxSvm` function
            if (!isSolana) {
                return this.fetchUpdateIxSvm(params, debug, payer);
            }
            // Fetch the update using the `fetchUpdateManyIx` function
            const [ixns, luts, report] = yield PullFeed.fetchUpdateManyIx(params.pullFeed.program, {
                feeds: [
                    params.pullFeed.pubkey
                ],
                chain: params.chain,
                network: params.network,
                gateway: params.gateway,
                recentSlothashes: params.recentSlothashes,
                numSignatures: params.numSignatures,
                crossbarClient: params.crossbarClient,
                payer: payer
            }, debug);
            // Generate an OracleResponse for each oracle response in the returned report.
            const oracleResponses = report.oracle_responses.map((x)=>{
                // Because we only requested a single feed response, we can use the first one.
                const feedResponse = x.feed_responses[0];
                // The returned oracle_pubkey is a hex string, so we need to convert it to a PublicKey.
                const oraclePubkeyBytes = __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(x.oracle_pubkey, 'hex');
                const oraclePubkey = isSolana ? new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey(oraclePubkeyBytes) : __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.findProgramAddressSync([
                    __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from('Oracle'),
                    queue.toBuffer(),
                    oraclePubkeyBytes
                ], params.pullFeed.program.programId)[0];
                const oracle = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$oracle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Oracle"](params.pullFeed.program, oraclePubkey);
                const error = feedResponse.failure_error;
                const oldDP = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"].DP;
                __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"].DP = 40;
                const value = feedResponse.success_value ? new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"](feedResponse.success_value).div(1e18) : null;
                __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"].DP = oldDP;
                return new OracleResponse(oracle, value, error);
            });
            // Find the number of successful responses.
            const numSuccesses = oracleResponses.filter(({ value })=>value).length;
            return [
                /* instructions= */ numSuccesses ? ixns : undefined,
                /* oracleResponses= */ oracleResponses,
                /* numSuccesses= */ numSuccesses,
                /* luts= */ luts,
                /* failures= */ oracleResponses.map((x)=>x.error)
            ];
        });
    }
    static fetchUpdateIxSvm(params, debug, payer) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b;
            const isSolana = getIsSolana(params.chain);
            const isMainnet = getIsMainnet(params.network);
            // Get the feed data for this feed.
            const feed = params.pullFeed;
            const feedData = yield feed.loadData();
            // If we are using Solana, we can use the queue that the feed is on. Otherwise, we need to
            // load the default queue for the specified network.
            const solanaQueuePubkey = isSolana ? feedData.queue : __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDefaultQueueAddress"](isMainnet);
            if (debug) console.log(`Using queue ${solanaQueuePubkey.toBase58()}`);
            const solanaProgram = isSolana ? feed.program : yield (()=>__awaiter(this, void 0, void 0, function*() {
                    var _a;
                    const cluster = isMainnet ? 'mainnet-beta' : 'devnet';
                    const rpc = (_a = params.solanaRpcUrl) !== null && _a !== void 0 ? _a : __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].clusterApiUrl(cluster);
                    const connection = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].Connection(rpc);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$anchor$2d$utils$2f$AnchorUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AnchorUtils"].loadProgramFromConnection(connection);
                }))();
            const connection = feed.program.provider.connection;
            const slotHashes = (_a = params.recentSlothashes) !== null && _a !== void 0 ? _a : yield __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$sysvars$2f$recentSlothashes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RecentSlotHashes"].fetchLatestNSlothashes(connection, 30);
            const crossbarClient = (_b = params.crossbarClient) !== null && _b !== void 0 ? _b : __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$CrossbarClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CrossbarClient"].default();
            const jobs = yield crossbarClient.fetch(__TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(feedData.feedHash).toString('hex')).then((resp)=>resp.jobs);
            const { responses, failures } = yield __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$queue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Queue"].fetchSignatures(solanaProgram, {
                gateway: params.gateway,
                numSignatures: params.numSignatures,
                jobs: jobs,
                queue: solanaQueuePubkey,
                recentHash: slotHashes[0][1]
            });
            const oracleResponses = responses.map((resp)=>{
                // The returned oracle_pubkey is a hex string, so we need to convert it to a PublicKey.
                const oraclePubkeyBytes = __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(resp.oracle_pubkey, 'hex');
                const oraclePubkey = isSolana ? new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey(oraclePubkeyBytes) : __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.findProgramAddressSync([
                    __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from('Oracle'),
                    feedData.queue.toBuffer(),
                    oraclePubkeyBytes
                ], params.pullFeed.program.programId)[0];
                const oracle = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$oracle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Oracle"](params.pullFeed.program, oraclePubkey);
                const error = resp.failure_error;
                const oldDP = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"].DP;
                __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"].DP = 40;
                const value = resp.success_value ? new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"](resp.success_value).div(1e18) : null;
                __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"].DP = oldDP;
                return new OracleResponse(oracle, value, error);
            });
            // Find the number of successful responses.
            const numSuccesses = oracleResponses.filter(({ value })=>value).length;
            if (!numSuccesses) {
                throw new Error(`PullFeed.fetchUpdateIx Failure: ${oracleResponses.map((x)=>x.error)}`);
            }
            if (debug) console.log('responses', responses);
            const submitSignaturesIx = feed.getSolanaSubmitSignaturesIx({
                resps: responses,
                // NOTE: offsets are deprecated.
                offsets: Array(responses.length).fill(0),
                slot: slotHashes[0][0],
                payer,
                chain: params.chain
            });
            const loadLookupTables = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLoadLookupTables"]();
            const luts = yield loadLookupTables([
                feed,
                ...oracleResponses.map(({ oracle })=>oracle)
            ]);
            return [
                [
                    submitSignaturesIx
                ],
                oracleResponses,
                numSuccesses,
                luts,
                failures
            ];
        });
    }
    /**
     * Fetches updates for multiple feeds at once into a SINGLE tightly packed instruction.
     * Returns instructions that must be executed in order, with the secp256k1 verification
     * instruction placed at the front of the transaction.
     *
     * @param program - The Anchor program instance.
     * @param params_ - The parameters object.
     * @param params_.feeds - An array of PullFeed account public keys.
     * @param params_.gateway - The gateway URL to use. If not provided, the gateway is automatically fetched.
     * @param params_.recentSlothashes - The recent slothashes to use. If not provided, the latest 30 slothashes are fetched.
     * @param params_.numSignatures - The number of signatures to fetch.
     * @param params_.crossbarClient - Optionally specify the CrossbarClient to use.
     * @param params_.payer - The payer of the transaction. If not provided, the payer is automatically fetched.
     * @param debug - A boolean flag to enable or disable debug mode. Defaults to `false`.
     * @returns A promise that resolves to a tuple containing:
     * - An array of transaction instructions that must be executed in order:
     *   [0] = secp256k1 program verification instruction
     *   [1] = feed update instruction
     * - An array of `AddressLookupTableAccount` to use.
     * - The raw response data.
     */ static fetchUpdateManyIx(program_1, params_1) {
        return __awaiter(this, arguments, void 0, function*(program, params, debug = false) {
            var _a, _b, _c, _d;
            const isSolana = getIsSolana(params.chain);
            const isMainnet = getIsMainnet(params.network);
            const feeds = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NonEmptyArrayUtils"].validate(params.feeds);
            const crossbarClient = (_a = params.crossbarClient) !== null && _a !== void 0 ? _a : __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$CrossbarClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CrossbarClient"].default();
            // Validate that (1) all of the feeds specified exist and (2) all of the feeds are on the same
            // queue. Assuming that these conditions are met, we can map the feeds' data to their configs to
            // request signatures from a gateway.
            const feedDatas = yield PullFeed.loadMany(program, feeds);
            const queue = (_c = (_b = feedDatas[0]) === null || _b === void 0 ? void 0 : _b.queue) !== null && _c !== void 0 ? _c : __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.default;
            const feedConfigs = [];
            for(let idx = 0; idx < feedDatas.length; idx++){
                const data = feedDatas[idx];
                if (!data) {
                    const pubkey = feeds[idx];
                    throw new Error(`No feed found at ${pubkey.toBase58()}}`);
                } else if (!queue.equals(data.queue)) {
                    throw new Error('All feeds must be on the same queue');
                }
                feedConfigs.push({
                    maxVariance: data.maxVariance.toNumber() / 1e9,
                    minResponses: data.minResponses,
                    jobs: yield crossbarClient.fetch(__TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(data.feedHash).toString('hex')).then((resp)=>resp.jobs)
                });
            }
            // If we are using Solana, we can use the queue that the feeds are on. Otherwise, we need to
            // load the default queue for the specified network.
            const solanaQueue = isSolana ? queue : __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDefaultQueueAddress"](isMainnet);
            if (debug) console.log(`Using queue ${solanaQueue.toBase58()}`);
            const connection = program.provider.connection;
            const slotHashes = (_d = params.recentSlothashes) !== null && _d !== void 0 ? _d : yield __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$sysvars$2f$recentSlothashes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RecentSlotHashes"].fetchLatestNSlothashes(connection, 30);
            const response = yield __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$queue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Queue"].fetchSignaturesConsensus(/* program= */ program, /* params= */ {
                queue: solanaQueue,
                gateway: params.gateway,
                recentHash: slotHashes[0][1],
                feedConfigs,
                numSignatures: params.numSignatures
            });
            const secpSignatures = response.oracle_responses.map((oracleResponse)=>{
                return {
                    ethAddress: __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(oracleResponse.eth_address, 'hex'),
                    signature: __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(oracleResponse.signature, 'base64'),
                    message: __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(oracleResponse.checksum, 'base64'),
                    recoveryId: oracleResponse.recovery_id
                };
            });
            const secpInstruction = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$instruction$2d$utils$2f$Secp256k1InstructionUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Secp256k1InstructionUtils"].buildSecp256k1Instruction(secpSignatures, 0);
            // Prepare the instruction data for the `pullFeedSubmitResponseManySecp` instruction.
            const instructionData = {
                slot: new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](slotHashes[0][0]),
                values: response.median_responses.map(({ value })=>new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](value))
            };
            // Prepare the accounts for the `pullFeedSubmitResponseManySecp` instruction.
            const accounts = {
                queue: queue,
                programState: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["State"].keyFromSeed(program),
                recentSlothashes: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_SYSVAR_SLOT_HASHES_ID"],
                payer: PullFeed.getPayer(program, params.payer),
                systemProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].SystemProgram.programId,
                rewardVault: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssociatedTokenAddressSync"](__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SOL_NATIVE_MINT"], queue, !isSolana // TODO: Review this.
                ),
                tokenProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_TOKEN_PROGRAM_ID"],
                tokenMint: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SOL_NATIVE_MINT"],
                ixSysvar: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_SYSVAR_INSTRUCTIONS_ID"]
            };
            //
            // Prepare the remaining accounts for the `pullFeedSubmitResponseManySecp` instruction.
            //
            // We only want to include feeds that have succcessful responses returned.
            const feedPubkeys = response.median_responses.map((median_response)=>{
                // For each successful 'median' response, locate a feed that has the same corresponding feed hash.
                const feedIndex = feedDatas.findIndex((data)=>{
                    const feedHashHex = __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(data.feedHash).toString('hex');
                    return feedHashHex === median_response.feed_hash;
                });
                if (feedIndex >= 0) return feeds[feedIndex];
                if (debug) {
                    console.warn(`Feed not found for hash: ${median_response.feed_hash}`);
                }
                return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.default;
            });
            // For each oracle response, create the oracle and oracle stats accounts.
            const oraclePubkeys = response.oracle_responses.map((response)=>{
                return new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey(__TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(response.oracle_pubkey, 'hex'));
            });
            const oracleFeedStatsPubkeys = oraclePubkeys.map((oracle)=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.findProgramAddressSync([
                    __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from('OracleStats'),
                    oracle.toBuffer()
                ], program.programId)[0]);
            const remainingAccounts = [
                ...feedPubkeys.map((feedPubkey)=>({
                        pubkey: feedPubkey,
                        isSigner: false,
                        isWritable: true
                    })),
                ...oraclePubkeys.map((oraclePubkey)=>({
                        pubkey: oraclePubkey,
                        isSigner: false,
                        isWritable: false
                    })),
                ...oracleFeedStatsPubkeys.map((oracleFeedStatsPubkey)=>({
                        pubkey: oracleFeedStatsPubkey,
                        isSigner: false,
                        isWritable: true
                    }))
            ];
            const submitResponseIx = program.instruction.pullFeedSubmitResponseConsensus(instructionData, {
                accounts,
                remainingAccounts
            });
            // Load the lookup tables for the feeds and oracles.
            const loadLookupTables = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLoadLookupTables"]();
            const luts = yield loadLookupTables([
                ...feedPubkeys.map((pubkey)=>new PullFeed(program, pubkey)),
                ...oraclePubkeys.map((pubkey)=>new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$oracle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Oracle"](program, pubkey))
            ]);
            return [
                [
                    secpInstruction,
                    submitResponseIx
                ],
                luts,
                response
            ];
        });
    }
    static fetchUpdateManyLightIx(program_1, params_1) {
        return __awaiter(this, arguments, void 0, function*(program, params, debug = false) {
            var _a, _b, _c, _d;
            const isSolana = getIsSolana(params.chain);
            const isMainnet = getIsMainnet(params.network);
            const feeds = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NonEmptyArrayUtils"].validate(params.feeds);
            const crossbarClient = (_a = params.crossbarClient) !== null && _a !== void 0 ? _a : __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$CrossbarClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CrossbarClient"].default();
            // Validate that (1) all of the feeds specified exist and (2) all of the feeds are on the same
            // queue. Assuming that these conditions are met, we can map the feeds' data to their configs to
            // request signatures from a gateway.
            const feedDatas = yield PullFeed.loadMany(program, feeds);
            const queue = (_c = (_b = feedDatas[0]) === null || _b === void 0 ? void 0 : _b.queue) !== null && _c !== void 0 ? _c : __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.default;
            const feedConfigs = [];
            for(let idx = 0; idx < feedDatas.length; idx++){
                const data = feedDatas[idx];
                if (!data) {
                    const pubkey = feeds[idx];
                    throw new Error(`No feed found at ${pubkey.toBase58()}}`);
                } else if (!queue.equals(data.queue)) {
                    throw new Error('All feeds must be on the same queue');
                }
                feedConfigs.push({
                    maxVariance: data.maxVariance.toNumber() / 1e9,
                    minResponses: data.minResponses,
                    jobs: yield crossbarClient.fetch(__TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(data.feedHash).toString('hex')).then((resp)=>resp.jobs)
                });
            }
            // If we are using Solana, we can use the queue that the feeds are on. Otherwise, we need to
            // load the default queue for the specified network.
            const solanaQueue = isSolana ? queue : __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDefaultQueueAddress"](isMainnet);
            if (debug) console.log(`Using queue ${solanaQueue.toBase58()}`);
            const connection = program.provider.connection;
            const slotHashes = (_d = params.recentSlothashes) !== null && _d !== void 0 ? _d : yield __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$sysvars$2f$recentSlothashes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RecentSlotHashes"].fetchLatestNSlothashes(connection, 30);
            const response = yield __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$queue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Queue"].fetchSignaturesConsensus(/* program= */ program, /* params= */ {
                queue: solanaQueue,
                gateway: params.gateway,
                recentHash: slotHashes[0][1],
                feedConfigs,
                numSignatures: params.numSignatures
            });
            const secpSignatures = response.oracle_responses.map((oracleResponse)=>{
                return {
                    ethAddress: __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(oracleResponse.eth_address, 'hex'),
                    signature: __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(oracleResponse.signature, 'base64'),
                    message: __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(oracleResponse.checksum, 'base64'),
                    recoveryId: oracleResponse.recovery_id
                };
            });
            const secpInstruction = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$instruction$2d$utils$2f$Secp256k1InstructionUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Secp256k1InstructionUtils"].buildSecp256k1Instruction(secpSignatures, 0);
            // Prepare the instruction data for the `pullFeedSubmitResponseManySecp` instruction.
            const instructionData = {
                slot: new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](slotHashes[0][0]),
                values: response.median_responses.map(({ value })=>new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](value))
            };
            // Prepare the accounts for the `pullFeedSubmitResponseManySecp` instruction.
            const accounts = {
                queue: queue,
                programState: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["State"].keyFromSeed(program),
                recentSlothashes: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_SYSVAR_SLOT_HASHES_ID"],
                payer: PullFeed.getPayer(program, params.payer),
                systemProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].SystemProgram.programId,
                rewardVault: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssociatedTokenAddressSync"](__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SOL_NATIVE_MINT"], queue, !isSolana // TODO: Review this.
                ),
                tokenProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_TOKEN_PROGRAM_ID"],
                tokenMint: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SOL_NATIVE_MINT"],
                ixSysvar: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_SYSVAR_INSTRUCTIONS_ID"]
            };
            //
            // Prepare the remaining accounts for the `pullFeedSubmitResponseManySecp` instruction.
            //
            // We only want to include feeds that have succcessful responses returned.
            const feedPubkeys = response.median_responses.map((median_response)=>{
                // For each successful 'median' response, locate a feed that has the same corresponding feed hash.
                const feedIndex = feedDatas.findIndex((data)=>{
                    const feedHashHex = __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(data.feedHash).toString('hex');
                    return feedHashHex === median_response.feed_hash;
                });
                if (feedIndex >= 0) return feeds[feedIndex];
                if (debug) {
                    console.warn(`Feed not found for hash: ${median_response.feed_hash}`);
                }
                return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.default;
            });
            // For each oracle response, create the oracle and oracle stats accounts.
            const oraclePubkeys = response.oracle_responses.map((response)=>{
                return new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey(__TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(response.oracle_pubkey, 'hex'));
            });
            const remainingAccounts = [
                ...feedPubkeys.map((feedPubkey)=>({
                        pubkey: feedPubkey,
                        isSigner: false,
                        isWritable: true
                    })),
                ...oraclePubkeys.map((oraclePubkey)=>({
                        pubkey: oraclePubkey,
                        isSigner: false,
                        isWritable: false
                    }))
            ];
            const submitResponseIx = program.instruction.pullFeedSubmitResponseConsensusLight(instructionData, {
                accounts,
                remainingAccounts
            });
            // Load the lookup tables for the feeds and oracles.
            const loadLookupTables = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLoadLookupTables"]();
            const luts = yield loadLookupTables([
                ...feedPubkeys.map((pubkey)=>new PullFeed(program, pubkey)),
                ...oraclePubkeys.map((pubkey)=>new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$oracle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Oracle"](program, pubkey))
            ]);
            return [
                [
                    secpInstruction,
                    submitResponseIx
                ],
                luts,
                response
            ];
        });
    }
    /**
     *  Compiles a transaction instruction to submit oracle signatures for a given feed.
     *
     *  @param resps The oracle responses. This may be obtained from the `Gateway` class.
     *  @param slot The slot at which the oracles signed the feed with the current slothash.
     *  @returns A promise that resolves to the transaction instruction.
     */ getSolanaSubmitSignaturesIx(params) {
        const program = this.program;
        const payerPublicKey = PullFeed.getPayer(program, params.payer);
        const resps = params.resps.filter((x)=>{
            var _a;
            return ((_a = x.signature) !== null && _a !== void 0 ? _a : '').length > 0;
        });
        const isSolana = getIsSolana(params.chain);
        let queue = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey(__TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(resps[0].queue_pubkey.toString(), 'hex'));
        const sourceQueueKey = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey(__TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(resps[0].queue_pubkey.toString(), 'hex'));
        let queueBump = 0;
        if (!isSolana) {
            [queue, queueBump] = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.findProgramAddressSync([
                __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from('Queue'),
                queue.toBuffer()
            ], program.programId);
        }
        const oracles = resps.map((x)=>{
            const sourceOracleKey = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey(__TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(x.oracle_pubkey.toString(), 'hex'));
            if (isSolana) {
                return sourceOracleKey;
            } else {
                const [oraclePDA] = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.findProgramAddressSync([
                    __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from('Oracle'),
                    queue.toBuffer(),
                    sourceOracleKey.toBuffer()
                ], program.programId);
                return oraclePDA;
            }
        });
        const oracleFeedStats = oracles.map((oracle)=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.findProgramAddressSync([
                __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from('OracleStats'),
                oracle.toBuffer()
            ], program.programId)[0]);
        const submissions = resps.map((resp, idx)=>({
                value: new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](resp.success_value.toString()),
                signature: resp.signature,
                recoveryId: resp.recovery_id,
                // NOTE: offsets aren't used in the non-solana endpoint.
                slotOffset: isSolana ? params.offsets[idx] : undefined
            }));
        const instructionData = {
            slot: new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](params.slot),
            submissions: submissions.map((x)=>Object.assign(Object.assign({}, x), {
                    signature: __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(x.signature, 'base64')
                })),
            sourceQueueKey: isSolana ? undefined : sourceQueueKey,
            queueBump: isSolana ? undefined : queueBump
        };
        const accounts = {
            feed: this.pubkey,
            queue: queue,
            programState: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["State"].keyFromSeed(program),
            recentSlothashes: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_SYSVAR_SLOT_HASHES_ID"],
            payer: payerPublicKey,
            systemProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].SystemProgram.programId,
            rewardVault: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssociatedTokenAddressSync"](__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SOL_NATIVE_MINT"], queue, !isSolana),
            tokenProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_TOKEN_PROGRAM_ID"],
            tokenMint: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SOL_NATIVE_MINT"]
        };
        const remainingAccounts = [
            ...oracles.map((k)=>({
                    pubkey: k,
                    isSigner: false,
                    isWritable: false
                })),
            ...oracleFeedStats.map((k)=>({
                    pubkey: k,
                    isSigner: false,
                    isWritable: true
                }))
        ];
        if (isSolana) {
            return program.instruction.pullFeedSubmitResponse(instructionData, {
                accounts,
                remainingAccounts
            });
        } else {
            return program.instruction.pullFeedSubmitResponseSvm(instructionData, {
                accounts,
                remainingAccounts
            });
        }
    }
    /**
     *  Checks if the pull feed account has been initialized.
     *
     *  @returns A promise that resolves to a boolean indicating if the account has been initialized.
     */ isInitializedAsync() {
        return __awaiter(this, void 0, void 0, function*() {
            return !(yield checkNeedsInit(this.program.provider.connection, this.program.programId, this.pubkey));
        });
    }
    /**
     *  Loads the feed data for this {@linkcode PullFeed} account from on chain.
     *
     *  @returns A promise that resolves to the feed data.
     *  @throws if the feed account does not exist.
     */ loadData() {
        return __awaiter(this, void 0, void 0, function*() {
            return yield this.program.account['pullFeedAccountData'].fetch(this.pubkey);
        });
    }
    /**
     *  Loads the feed data for multiple feeds at once.
     *
     *  @param program The program instance.
     *  @param pubkeys The public keys of the feeds to load.
     *  @returns A promise that resolves to an array of feed data (or null if the feed account does not exist)
     */ static loadMany(program, pubkeys) {
        return __awaiter(this, void 0, void 0, function*() {
            return yield program.account['pullFeedAccountData'].fetchMultiple(pubkeys);
        });
    }
    /**
     *  Loads the feed data for this {@linkcode PullFeed} account from on chain.
     *
     *  @returns A promise that resolves to the values currently stored in the feed.
     *  @throws if the feed account does not exist.
     */ loadValues() {
        return __awaiter(this, void 0, void 0, function*() {
            const data = yield this.loadData();
            return PullFeed.mapFeedSubmissions(data);
        });
    }
    /**
     *  Loads the feed data for this {@linkcode PullFeed} account from on chain.
     *
     *  @param onlyAfter Call will ignore data signed before this slot.
     *  @returns A promise that resolves to the observed value as it would be
     *           seen on-chain.
     */ loadObservedValue(onlyAfter) {
        return __awaiter(this, void 0, void 0, function*() {
            const values = yield this.loadValues();
            return toFeedValue(values, onlyAfter);
        });
    }
    /**
     * Watches for any on-chain updates to the feed data.
     *
     * @param callback The callback to call when the feed data is updated.
     * @returns A promise that resolves to a subscription ID.
     */ subscribeToValueChanges(callback) {
        return __awaiter(this, void 0, void 0, function*() {
            const coder = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$30$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$coder$2f$borsh$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BorshAccountsCoder"](this.program.idl);
            const subscriptionId = this.program.provider.connection.onAccountChange(this.pubkey, (accountInfo)=>__awaiter(this, void 0, void 0, function*() {
                    const feed = coder.decode('pullFeedAccountData', accountInfo.data);
                    yield callback(PullFeed.mapFeedSubmissions(feed));
                }), {
                commitment: 'processed'
            });
            return subscriptionId;
        });
    }
    static mapFeedSubmissions(data) {
        const oldDP = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"].DP;
        __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"].DP = 40;
        const submissions = data.submissions.filter((x)=>!x.oracle.equals(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.default)).map((x)=>({
                value: new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"](x.value.toString()).div(1e18),
                slot: new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](x.slot.toString()),
                oracle: new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey(x.oracle)
            }));
        __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"].DP = oldDP;
        return submissions;
    }
    /**
     * Watches for any on-chain updates to any data feed.
     *
     * @param program The Anchor program instance.
     * @param callback The callback to call when the feed data is updated.
     * @returns A promise that resolves to a subscription ID.
     */ static subscribeToAllUpdates(program, callback) {
        return __awaiter(this, void 0, void 0, function*() {
            const coder = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$30$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$coder$2f$borsh$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BorshAccountsCoder"](program.idl);
            const subscriptionId = program.provider.connection.onProgramAccountChange(program.programId, (keyedAccountInfo, ctx)=>__awaiter(this, void 0, void 0, function*() {
                    const { accountId, accountInfo } = keyedAccountInfo;
                    try {
                        const feed = coder.decode('pullFeedAccountData', accountInfo.data);
                        yield callback([
                            ctx.slot,
                            {
                                pubkey: accountId,
                                submissions: feed.submissions.filter((x)=>!x.oracle.equals(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.default)).map((x)=>{
                                    __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"].DP = 40;
                                    return {
                                        value: new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"](x.value.toString()).div(1e18),
                                        slot: new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](x.slot.toString()),
                                        oracle: new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey(x.oracle)
                                    };
                                })
                            }
                        ]);
                    } catch (e) {
                        console.log(`ParseFailure: ${e}`);
                    }
                }), 'processed', [
                {
                    memcmp: {
                        bytes: 'ZoV7s83c7bd',
                        offset: 0
                    }
                }
            ]);
            return subscriptionId;
        });
    }
    loadLookupTable() {
        return __awaiter(this, void 0, void 0, function*() {
            // If the lookup table is already loaded, return it
            if (this.lut) return this.lut;
            const lutKey = yield this.lookupTableKey();
            const accnt = yield this.program.provider.connection.getAddressLookupTable(lutKey);
            this.lut = accnt.value;
            return this.lut;
        });
    }
    loadHistoricalValuesCompact(data_) {
        return __awaiter(this, void 0, void 0, function*() {
            const data = data_ !== null && data_ !== void 0 ? data_ : yield this.loadData();
            const values = data.historicalResults.filter((x)=>x.slot.gt(new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](0))).sort((a, b)=>a.slot.cmp(b.slot));
            return values;
        });
    }
} //# sourceMappingURL=pullFeed.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/randomness.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Randomness",
    ()=>Randomness
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/constants.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$instruction$2d$utils$2f$InstructionUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/instruction-utils/InstructionUtils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$oracle$2d$interfaces$2f$gateway$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/oracle-interfaces/gateway.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/utils/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$lookupTable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/utils/lookupTable.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$oracle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/oracle.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$queue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/queue.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/state.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$30$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.30.1_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bn.js@5.2.2/node_modules/bn.js/lib/bn.js [app-route] (ecmascript) <export default as BN>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript) <export * as web3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$6$2e$0$2e$0$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bs58@6.0.0/node_modules/bs58/src/esm/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/buffer [external] (buffer, cjs)");
var __awaiter = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function isNonSolana(queue) {
    return queue.equals(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ON_DEMAND_MAINNET_QUEUE_PDA"]) || queue.equals(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ON_DEMAND_DEVNET_QUEUE_PDA"]);
}
class Randomness {
    static getPayer(program, payer) {
        var _a;
        return (_a = payer !== null && payer !== void 0 ? payer : program.provider.publicKey) !== null && _a !== void 0 ? _a : __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.default;
    }
    /**
     * Constructs a `Randomness` instance.
     *
     * @param {Program} program - The Anchor program instance.
     * @param {web3.PublicKey} pubkey - The public key of the randomness account.
     */ constructor(program, pubkey){
        this.program = program;
        this.pubkey = pubkey;
    }
    /**
     * Loads the randomness data for this {@linkcode Randomness} account from on chain.
     *
     * @returns {Promise<any>} A promise that resolves to the randomness data.
     * @throws Will throw an error if the randomness account does not exist.
     */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loadData() {
        return __awaiter(this, void 0, void 0, function*() {
            return yield this.program.account['randomnessAccountData'].fetch(this.pubkey);
        });
    }
    /**
     * Creates a new `Randomness` account.
     *
     * @param {Program} program - The Anchor program instance.
     * @param {web3.Keypair} kp - The keypair of the new `Randomness` account.
     * @param {web3.PublicKey} queue - The queue account to associate with the new `Randomness` account.
     * @param {web3.PublicKey} [payer_] - The payer for the transaction. If not provided, the default payer from the program provider is used.
     * @returns {Promise<[Randomness, web3.TransactionInstruction]>} A promise that resolves to a tuple containing the new `Randomness` account and the transaction instruction.
     */ static create(program, kp, queue, payer_) {
        return __awaiter(this, void 0, void 0, function*() {
            const payer = Randomness.getPayer(program, payer_);
            const lutSigner = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$lookupTable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLutSigner"])(program.programId, kp.publicKey);
            const recentSlot = yield program.provider.connection.getSlot('finalized');
            const lutKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$lookupTable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLutKey"])(lutSigner, recentSlot);
            const ix = program.instruction.randomnessInit({
                recentSlot: new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](recentSlot.toString())
            }, {
                accounts: {
                    randomness: kp.publicKey,
                    queue,
                    authority: payer,
                    payer: payer,
                    rewardEscrow: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssociatedTokenAddressSync"](__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SOL_NATIVE_MINT"], kp.publicKey),
                    systemProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].SystemProgram.programId,
                    tokenProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_TOKEN_PROGRAM_ID"],
                    associatedTokenProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID"],
                    wrappedSolMint: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SOL_NATIVE_MINT"],
                    programState: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["State"].keyFromSeed(program),
                    lutSigner: lutSigner,
                    lut: lutKey,
                    addressLookupTableProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].AddressLookupTableProgram.programId
                }
            });
            return [
                new Randomness(program, kp.publicKey),
                ix
            ];
        });
    }
    /**
     * Generate a randomness `commit` solana transaction instruction.
     * This will commit the randomness account to use currentSlot + 1 slothash
     * as the non-repeating randomness seed.
     *
     * @param {PublicKey} queue - The queue public key for the commit instruction.
     * @param {PublicKey} [authority_] - The optional authority public key.
     * @returns {Promise<TransactionInstruction>} A promise that resolves to the transaction instruction.
     */ commitIx(queue, authority_) {
        return __awaiter(this, void 0, void 0, function*() {
            const queueAccount = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$queue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Queue"](this.program, queue);
            let oracle;
            // If we're on a non-Solana SVM network - we'll need the oracle address as a PDA on the target chain
            if (isNonSolana(queue)) {
                const isMainnet = queue.equals(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ON_DEMAND_MAINNET_QUEUE_PDA"]);
                const solanaQueue = yield __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getQueue"]({
                    program: this.program,
                    queueAddress: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDefaultQueueAddress"](isMainnet)
                });
                const solanaOracle = yield solanaQueue.fetchFreshOracle();
                [oracle] = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.findProgramAddressSync([
                    __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from('Oracle'),
                    queue.toBuffer(),
                    solanaOracle.toBuffer()
                ], __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ON_DEMAND_MAINNET_PID"]);
            } else {
                oracle = yield queueAccount.fetchFreshOracle();
            }
            const authority = authority_ !== null && authority_ !== void 0 ? authority_ : (yield this.loadData()).authority;
            const ix = this.program.instruction.randomnessCommit({}, {
                accounts: {
                    randomness: this.pubkey,
                    queue,
                    oracle,
                    recentSlothashes: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_SYSVAR_SLOT_HASHES_ID"],
                    authority
                }
            });
            return ix;
        });
    }
    /**
     * Generate a randomness `reveal` solana transaction instruction.
     * This will reveal the randomness using the assigned oracle.
     *
     * @returns {Promise<web3.TransactionInstruction>} A promise that resolves to the transaction instruction.
     */ revealIx(payer_) {
        return __awaiter(this, void 0, void 0, function*() {
            const payer = Randomness.getPayer(this.program, payer_);
            const data = yield this.loadData();
            let oracleData;
            // if non-Solana SVM network - we'll need to get the solana oracle address from the oracle PDA
            if (isNonSolana(data.queue)) {
                const solanaOracle = yield new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$oracle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Oracle"](this.program, data.oracle).findSolanaOracleFromPDA();
                oracleData = solanaOracle.oracleData;
            } else {
                const oracle = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$oracle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Oracle"](this.program, data.oracle);
                oracleData = yield oracle.loadData();
            }
            const gatewayUrl = String.fromCharCode(...oracleData.gatewayUri).replace(/\0+$/, '');
            const gateway = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$oracle$2d$interfaces$2f$gateway$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Gateway"](this.program, gatewayUrl);
            const gatewayRevealResponse = yield gateway.fetchRandomnessReveal({
                randomnessAccount: this.pubkey,
                slothash: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$6$2e$0$2e$0$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].encode(data.seedSlothash),
                slot: data.seedSlot.toNumber(),
                rpc: this.program.provider.connection.rpcEndpoint
            });
            const stats = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.findProgramAddressSync([
                __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from('OracleRandomnessStats'),
                data.oracle.toBuffer()
            ], this.program.programId)[0];
            const ix = this.program.instruction.randomnessReveal({
                signature: __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(gatewayRevealResponse.signature, 'base64'),
                recoveryId: gatewayRevealResponse.recovery_id,
                value: gatewayRevealResponse.value
            }, {
                accounts: {
                    randomness: this.pubkey,
                    oracle: data.oracle,
                    queue: data.queue,
                    stats,
                    authority: data.authority,
                    payer,
                    recentSlothashes: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_SYSVAR_SLOT_HASHES_ID"],
                    systemProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].SystemProgram.programId,
                    rewardEscrow: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssociatedTokenAddressSync"](__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SOL_NATIVE_MINT"], this.pubkey),
                    tokenProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_TOKEN_PROGRAM_ID"],
                    associatedTokenProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID"],
                    wrappedSolMint: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SOL_NATIVE_MINT"],
                    programState: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["State"].keyFromSeed(this.program)
                }
            });
            return ix;
        });
    }
    /**
     * Commit and reveal randomness in a single transaction.
     *
     * @param {TransactionInstruction[]} callback - The callback to execute after the reveal in the same transaction.
     * @param {Keypair[]} signers - The signers to sign the transaction.
     * @param {PublicKey} queue - The queue public key.
     * @param {object} [configs] - The configuration options.
     * @param {number} [configs.computeUnitPrice] - The price per compute unit in microlamports.
     * @param {number} [configs.computeUnitLimit] - The compute unit limit.
     * @returns {Promise<void>} A promise that resolves when the transaction is confirmed.
     */ commitAndReveal(callback, signers, queue, configs, debug) {
        return __awaiter(this, void 0, void 0, function*() {
            var _a, _b;
            // In this function (because its 2 back to back transactions) we need to use the payer from the
            // provider as the authority for the commit transaction.
            const authority = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getNodePayer"](this.program);
            const computeUnitPrice = (_a = configs === null || configs === void 0 ? void 0 : configs.computeUnitPrice) !== null && _a !== void 0 ? _a : 50000;
            const computeUnitLimit = (_b = configs === null || configs === void 0 ? void 0 : configs.computeUnitLimit) !== null && _b !== void 0 ? _b : 200000;
            const connection = this.program.provider.connection;
            for(;;){
                const data = yield this.loadData();
                if (data.seedSlot.toNumber() !== 0) {
                    if (debug) {
                        console.log('Randomness slot already committed. Jumping to reveal.');
                    }
                    break;
                }
                const tx = yield __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$instruction$2d$utils$2f$InstructionUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InstructionUtils"].asV0TxWithComputeIxs({
                    connection,
                    ixs: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].ComputeBudgetProgram.setComputeUnitPrice({
                            microLamports: computeUnitPrice
                        }),
                        (yield this.commitIx(queue, data.authority))
                    ]
                });
                tx.sign([
                    authority
                ]);
                const sim = yield connection.simulateTransaction(tx, {
                    commitment: 'processed'
                });
                if (sim.value.err !== null) {
                    if (debug) {
                        console.log('Logs', sim.value.logs);
                    }
                    throw new Error(`Failed to simulate commit transaction: ${JSON.stringify(sim.value.err)}`);
                }
                const sig = yield connection.sendTransaction(tx, {
                    maxRetries: 2,
                    skipPreflight: true
                });
                if (debug) {
                    console.log(`Commit transaction sent: ${sig}`);
                }
                try {
                    yield connection.confirmTransaction(sig);
                    if (debug) {
                        console.log(`Commit transaction confirmed: ${sig}`);
                    }
                    break;
                } catch (_c) {
                    if (debug) {
                        console.log('Failed to confirm commit transaction. Retrying...');
                    }
                    yield new Promise((f)=>setTimeout(f, 1000));
                    continue;
                }
            }
            yield new Promise((f)=>setTimeout(f, 1000));
            for(;;){
                const data = yield this.loadData();
                if (data.revealSlot.toNumber() !== 0) {
                    break;
                }
                let revealIx = undefined;
                try {
                    revealIx = yield this.revealIx(authority.publicKey);
                } catch (e) {
                    if (debug) {
                        console.log(e);
                        console.log('Failed to grab reveal signature. Retrying...');
                    }
                    yield new Promise((f)=>setTimeout(f, 1000));
                    continue;
                }
                const tx = yield __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$instruction$2d$utils$2f$InstructionUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InstructionUtils"].asV0TxWithComputeIxs({
                    connection: this.program.provider.connection,
                    ixs: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].ComputeBudgetProgram.setComputeUnitPrice({
                            microLamports: computeUnitPrice
                        }),
                        __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].ComputeBudgetProgram.setComputeUnitLimit({
                            units: computeUnitLimit
                        }),
                        revealIx,
                        ...callback
                    ]
                });
                tx.sign([
                    authority,
                    ...signers
                ]);
                const sim = yield connection.simulateTransaction(tx, {
                    commitment: 'processed'
                });
                if (sim.value.err !== null) {
                    if (debug) {
                        console.log('Logs', sim.value.logs);
                    }
                    throw new Error(`Failed to simulate commit transaction: ${JSON.stringify(sim.value.err)}`);
                }
                const sig = yield connection.sendTransaction(tx, {
                    maxRetries: 2,
                    skipPreflight: true
                });
                if (debug) {
                    console.log(`RevealAndCallback transaction sent: ${sig}`);
                }
                yield connection.confirmTransaction(sig);
                if (debug) {
                    console.log(`RevealAndCallback transaction confirmed: ${sig}`);
                }
            }
        });
    }
    /**
     * Creates a new `Randomness` account and prepares a commit transaction instruction.
     *
     * @param {Program} program - The Anchor program instance.
     * @param {web3.PublicKey} queue - The queue account to associate with the new `Randomness` account.
     * @returns {Promise<[Randomness, web3.Keypair, web3.TransactionInstruction[]]>} A promise that resolves to a tuple containing the new `Randomness` instance, the keypair, and an array of transaction instructions.
     */ static createAndCommitIxs(program, queue, payer_) {
        return __awaiter(this, void 0, void 0, function*() {
            const payer = Randomness.getPayer(program, payer_);
            const accountKeypair = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].Keypair.generate();
            const [account, creationIx] = yield Randomness.create(/* program= */ program, /* kp= */ accountKeypair, /* queue= */ queue, /* payer= */ payer);
            const commitIx = yield account.commitIx(/* queue= */ queue, /* authority= */ payer);
            // TODO: Why do we return the account keypair? The authority is already set to the payer right?
            return [
                account,
                accountKeypair,
                [
                    creationIx,
                    commitIx
                ]
            ];
        });
    }
} //# sourceMappingURL=randomness.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$lutMap$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/lutMap.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$oracle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/oracle.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$permission$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/permission.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$pullFeed$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/pullFeed.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$queue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/queue.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$randomness$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/randomness.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/state.js [app-route] (ecmascript)"); //# sourceMappingURL=index.js.map
;
;
;
;
;
;
;
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/anchor-utils/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$anchor$2d$utils$2f$AnchorUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/anchor-utils/AnchorUtils.js [app-route] (ecmascript)"); //# sourceMappingURL=index.js.map
;
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/event-utils/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PullFeedValueEvent",
    ()=>PullFeedValueEvent
]);
const I128MAX = '170141183460469231731687303715884105727';
function splitFromTail(input_, places) {
    const input = input_.padStart(18, '0');
    const splitIndex = input.length - places;
    if (splitIndex <= 0) {
        return [
            '',
            input
        ]; // if the string is shorter than N characters, the first part is empty
    }
    const firstPart = input.slice(0, splitIndex);
    const lastCharacters = input.slice(splitIndex);
    return [
        firstPart,
        lastCharacters
    ];
}
class PullFeedValueEvent {
    constructor(raw){
        this.raw = raw;
    }
    toRows() {
        var _a, _b;
        const out = [];
        if (!Array.isArray((_b = (_a = this.raw) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.feeds)) return out;
        for(const feedIdx in this.raw.data.feeds){
            const feed = this.raw.data.feeds[feedIdx];
            for(const oracleIdx in this.raw.data.oracles){
                const oracle = this.raw.data.oracles[oracleIdx];
                const value = this.raw.data.values[feedIdx][oracleIdx];
                const valueParts = splitFromTail(value.toString(), 18);
                if (value.toString() === I128MAX) {
                    out.push({
                        feed: feed.toString(),
                        oracle: oracle.toString(),
                        value: null
                    });
                } else {
                    out.push({
                        feed: feed.toString(),
                        oracle: oracle.toString(),
                        value: `${valueParts[0]}.${valueParts[1]}`
                    });
                }
            }
        }
        return out;
    }
} //# sourceMappingURL=index.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/evm/message.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Create an EVM-serializable update message
 * @param param0 - UpdateHexStringParams: Components for an EVM update message
 * @returns hex string
 */ __turbopack_context__.s([
    "createAttestationHexString",
    ()=>createAttestationHexString,
    "createRandomnessRevealHexString",
    ()=>createRandomnessRevealHexString,
    "createUpdateHexString",
    ()=>createUpdateHexString,
    "createV0AttestationHexString",
    ()=>createV0AttestationHexString
]);
function createUpdateHexString({ feedId, discriminator, result, blockNumber, r, s, v, timestamp }) {
    const discriminatorHex = discriminator.toString(16).padStart(2, '0');
    const resultHex = BigInt(result).toString(16).padStart(32, '0');
    const blockNumberHex = BigInt(blockNumber).toString(16).padStart(16, '0');
    const vHex = v.toString(16).padStart(2, '0');
    const timestampHex = timestamp ? BigInt(timestamp).toString(16).padStart(16, '0') : '';
    return `0x${discriminatorHex}${feedId}${resultHex}${r}${s}${vHex}${blockNumberHex}${timestampHex}`;
}
function createAttestationHexString({ discriminator, oracleId, queueId, timestamp, secp256k1Key, r, s, v, blockNumber, mrEnclave, guardianId }) {
    const discriminatorHex = discriminator.toString(16).padStart(2, '0');
    const blockNumberHex = BigInt(blockNumber).toString(16).padStart(16, '0');
    const timestampHex = BigInt(timestamp).toString(16).padStart(16, '0');
    const vHex = v.toString(16).padStart(2, '0');
    return `0x${discriminatorHex}${oracleId}${queueId}${mrEnclave}${secp256k1Key}${blockNumberHex}${r}${s}${vHex}${timestampHex}${guardianId}`;
}
function createV0AttestationHexString({ discriminator, oracleId, queueId, ed25519Key, secp256k1Key, r, s, v, blockNumber, mrEnclave }) {
    const discriminatorHex = discriminator.toString(16).padStart(2, '0');
    const blockNumberHex = BigInt(blockNumber).toString(16).padStart(16, '0');
    const vHex = v.toString(16).padStart(2, '0');
    return `0x${discriminatorHex}${oracleId}${queueId}${mrEnclave}${ed25519Key}${secp256k1Key}${blockNumberHex}${r}${s}${vHex}`;
}
function createRandomnessRevealHexString({ discriminator, randomnessId, result, r, s, v }) {
    const discriminatorHex = discriminator.toString(16).padStart(2, '0');
    const vHex = v.toString(16).padStart(2, '0');
    return `0x${discriminatorHex}${randomnessId}${result}${r}${s}${vHex}`;
} //# sourceMappingURL=message.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/evm/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createJob",
    ()=>createJob,
    "fetchRandomness",
    ()=>fetchRandomness,
    "fetchResult",
    ()=>fetchResult,
    "fetchResults",
    ()=>fetchResults,
    "getAttestation",
    ()=>getAttestation,
    "getFeedUpdateData",
    ()=>getFeedUpdateData,
    "getFeedUpdateWithContext",
    ()=>getFeedUpdateWithContext,
    "getUpdate",
    ()=>getUpdate,
    "simulateFeed",
    ()=>simulateFeed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$evm$2f$message$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/evm/message.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$CrossbarClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/common/lib/CrossbarClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/axios@1.13.2/node_modules/axios/lib/axios.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$6$2e$0$2e$0$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bs58@6.0.0/node_modules/bs58/src/esm/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/buffer [external] (buffer, cjs)");
var __awaiter = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
;
;
;
;
;
function createJob(params) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OracleJob"].fromObject(params);
}
function getCrossbarUrl(crossbarUrl) {
    return crossbarUrl !== null && crossbarUrl !== void 0 ? crossbarUrl : __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$CrossbarClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CrossbarClient"].default().crossbarUrl;
}
function simulateFeed(params, queue) {
    return __awaiter(this, void 0, void 0, function*() {
        var _a, _b;
        const gateway = (_a = params.gateway) !== null && _a !== void 0 ? _a : yield queue.fetchGateway();
        const result = (yield gateway.fetchSignatures(Object.assign(Object.assign({}, params), {
            useTimestamp: true,
            recentHash: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$6$2e$0$2e$0$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].encode(__TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from((_b = params.recentHash) !== null && _b !== void 0 ? _b : '0'.repeat(64), 'hex'))
        }))).responses[0];
        return {
            result: new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"](result.success_value).div(new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"](10).pow(18)).toNumber(),
            feedId: result.feed_hash,
            response: result
        };
    });
}
function getFeedUpdateData(params, queue) {
    return __awaiter(this, void 0, void 0, function*() {
        return (yield getFeedUpdateWithContext(params, queue)).responses.map((r)=>r.encoded);
    });
}
function getFeedUpdateWithContext(params, queue) {
    return __awaiter(this, void 0, void 0, function*() {
        var _a;
        // Set the blockhash
        const blockhash = (_a = params.recentHash) !== null && _a !== void 0 ? _a : '0'.repeat(64);
        // if we just want the time feed, return
        if (params.jobs.length === 0) {
            {
                return {
                    responses: [],
                    failures: []
                };
            }
        }
        // Get the Feed Update if the feed exists
        // Setup the updates array
        const updates = yield getUpdate(Object.assign(Object.assign({}, params), {
            recentHash: blockhash
        }), queue);
        return updates;
    });
}
function getUpdate(params, queue) {
    return __awaiter(this, void 0, void 0, function*() {
        var _a, _b, _c, _d, _e;
        if (!params.recentHash) {
            params.recentHash = '0'.repeat(64);
        }
        // slice if the recentHash starts with 0x
        if (params.recentHash.startsWith('0x')) {
            params.recentHash = params.recentHash.slice(2);
        }
        const gateway = (_a = params.gateway) !== null && _a !== void 0 ? _a : yield queue.fetchGateway();
        const { responses, failures } = yield gateway.fetchSignatures(Object.assign(Object.assign({}, params), {
            useTimestamp: true,
            recentHash: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bs58$40$6$2e$0$2e$0$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].encode(__TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(params.recentHash, 'hex'))
        }));
        const response = [];
        for (const result of responses){
            if (!result.success_value) {
                failures.push(result.failure_error.toString());
                continue;
            }
            // Decode from Base64 to a Buffer
            const signatureBuffer = new Uint8Array(__TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(result.signature, 'base64'));
            // Assuming each component (r and s) is 32 bytes long
            const r = __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(signatureBuffer.slice(0, 32)).toString('hex');
            const s = __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(signatureBuffer.slice(32, 64)).toString('hex');
            const v = result.recovery_id;
            // Create the upsert message
            const updateString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$evm$2f$message$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createUpdateHexString"])({
                discriminator: 1,
                feedId: (_b = params.aggregatorId) !== null && _b !== void 0 ? _b : result.feed_hash.toString(),
                result: result.success_value.toString(),
                blockNumber: (_d = (_c = params.blockNumber) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : '0',
                timestamp: (_e = result.timestamp) === null || _e === void 0 ? void 0 : _e.toString(),
                r,
                s,
                v
            });
            // Add the response to the array
            const res = {
                feedId: result.feed_hash,
                result: new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"](result.success_value).div(new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Big"](10).pow(18)).toNumber(),
                encoded: updateString,
                response: result
            };
            // Add the response to the array
            response.push(res);
        }
        // Sort the response by timestamp, ascending
        response.sort((a, b)=>{
            var _a, _b;
            return ((_a = a.response.timestamp) !== null && _a !== void 0 ? _a : 0) - ((_b = b.response.timestamp) !== null && _b !== void 0 ? _b : 0);
        });
        // Return the response
        return {
            responses: response,
            failures
        };
    });
}
function getAttestation(options) {
    return __awaiter(this, void 0, void 0, function*() {
        const { guardianQueue, recentHash, queueId, oracleId, gateway, blockNumber } = options;
        const gatewayAccount = gateway !== null && gateway !== void 0 ? gateway : yield guardianQueue.fetchGateway();
        const chainHash = recentHash.startsWith('0x') ? recentHash.slice(2) : recentHash;
        const attestation = yield gatewayAccount.fetchBridgingMessage({
            chainHash,
            queuePubkey: queueId,
            oraclePubkey: oracleId
        });
        if (!options.recentHash) {
            options.recentHash = '0'.repeat(64);
        }
        // slice if the recentHash starts with 0x
        if (options.recentHash.startsWith('0x')) {
            options.recentHash = options.recentHash.slice(2);
        }
        // Decode from Base64 to a Buffer
        const signatureBuffer = new Uint8Array(__TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(attestation.signature, 'base64'));
        // Assuming each component (r and s) is 32 bytes long
        const r = __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(signatureBuffer.slice(0, 32)).toString('hex');
        const s = __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(signatureBuffer.slice(32, 64)).toString('hex');
        const v = attestation.recovery_id;
        // Create the attestation bassed on message contents (it'll either be v0 or ordinary)
        if (attestation.oracle_ed25519_enclave_signer) {
            const hexString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$evm$2f$message$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createV0AttestationHexString"])({
                discriminator: 2,
                oracleId,
                queueId,
                ed25519Key: attestation.oracle_ed25519_enclave_signer,
                secp256k1Key: attestation.oracle_secp256k1_enclave_signer,
                r,
                s,
                v,
                mrEnclave: attestation.mr_enclave,
                blockNumber: blockNumber.toString()
            });
            return {
                oracleId,
                queueId,
                guardian: attestation.guardian,
                encoded: hexString,
                response: attestation
            };
        } else if (attestation.timestamp) {
            const hexString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$evm$2f$message$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAttestationHexString"])({
                discriminator: 2,
                oracleId,
                queueId,
                secp256k1Key: attestation.oracle_secp256k1_enclave_signer,
                timestamp: attestation.timestamp.toString(),
                mrEnclave: attestation.mr_enclave,
                r,
                s,
                v,
                blockNumber: blockNumber.toString(),
                guardianId: attestation.guardian
            });
            return {
                oracleId: attestation.oracle,
                queueId: attestation.queue,
                guardian: attestation.guardian,
                encoded: hexString,
                response: attestation
            };
        }
        throw new Error('Invalid attestation response');
    });
}
function fetchResult(_a) {
    return __awaiter(this, arguments, void 0, function*({ feedId, chainId, crossbarUrl, minResponses, maxVariance, numSignatures, syncOracles, syncGuardians }) {
        return Object.assign({
            feedId
        }, (yield fetchUpdateData(getCrossbarUrl(crossbarUrl), chainId.toString(), feedId, minResponses, maxVariance, numSignatures, syncOracles, syncGuardians)));
    });
}
function fetchResults(_a) {
    return __awaiter(this, arguments, void 0, function*({ feedIds, chainId, crossbarUrl, minResponses, maxVariance, numSignatures, syncOracles, syncGuardians }) {
        if (!crossbarUrl) crossbarUrl = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$common$2f$lib$2f$CrossbarClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CrossbarClient"].default().crossbarUrl;
        const responses = yield Promise.all(feedIds.map((feedId)=>{
            return fetchUpdateData(crossbarUrl, chainId.toString(), feedId, minResponses, maxVariance, numSignatures, syncOracles, syncGuardians);
        }));
        return responses.map((response, index)=>{
            return Object.assign({
                feedId: feedIds[index]
            }, response);
        });
    });
}
function fetchRandomness(_a) {
    return __awaiter(this, arguments, void 0, function*({ chainId, crossbarUrl, randomnessId, timestamp, minStalenessSeconds }) {
        if (!crossbarUrl) {
            crossbarUrl = 'https://crossbar.switchboard.xyz';
        }
        return fetchRandomnessData(crossbarUrl, chainId.toString(), randomnessId, timestamp, minStalenessSeconds);
    });
}
/**
 * Fetch update data from the Switchboard API
 * @param crossbarUrl The Crossbar URL
 * @param chainId The chain ID
 * @param feedId The feed ID
 * @param minResponses Minimum number of responses
 * @param maxVariance Maximum variance
 * @param numSignatures Number of signatures
 * @param syncOracles Sync oracles
 * @param syncGuardians Sync guardians
 * @param gateway Gateway
 * @returns
 */ function fetchUpdateData(crossbarUrl_1, chainId_1, feedId_1) {
    return __awaiter(this, arguments, void 0, function*(crossbarUrl, chainId, feedId, minResponses = 1, maxVariance = 1e9, numSignatures = 1, syncOracles = true, syncGuardians = true, gateway) {
        const cleanedCrossbarUrl = crossbarUrl.endsWith('/') ? crossbarUrl.slice(0, -1) : crossbarUrl;
        const url = new URL(`${cleanedCrossbarUrl}/updates/evm/${chainId}/${feedId}`);
        // Add query parameters to the URL
        if (minResponses !== undefined) {
            url.searchParams.append('minResponses', minResponses.toString());
        }
        if (maxVariance !== undefined) {
            url.searchParams.append('maxVariance', maxVariance.toString());
        }
        if (numSignatures !== undefined) {
            url.searchParams.append('numSignatures', numSignatures.toString());
        }
        if (syncOracles !== undefined) {
            url.searchParams.append('syncOracles', syncOracles.toString());
        }
        if (syncGuardians !== undefined) {
            url.searchParams.append('syncGuardians', syncGuardians.toString());
        }
        if (gateway !== undefined) {
            url.searchParams.append('gateway', gateway);
        }
        try {
            const response = yield __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].get(url.toString());
            if (response.status !== 200) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }
            return response.data;
        } catch (error) {
            console.error('Error fetching feed data:', error);
            throw error;
        }
    });
}
/**
 * Fetch randomness data from the Switchboard API
 * @param chainId The chain ID
 * @param randomnessId The randomness ID configured on-chain
 * @param timestamp The timestamp that the randomness was configured at
 * @param minStalenessSeconds The minimum staleness of the data in seconds
 * @returns
 */ function fetchRandomnessData(crossbarUrl, chainId, randomnessId, timestamp, minStalenessSeconds) {
    return __awaiter(this, void 0, void 0, function*() {
        const cleanedCrossbarUrl = crossbarUrl.endsWith('/') ? crossbarUrl.slice(0, -1) : crossbarUrl;
        const url = new URL(`${cleanedCrossbarUrl}/randomness/evm/${chainId}/${randomnessId}`);
        // Add query parameters to the URL
        if (timestamp !== undefined) {
            url.searchParams.append('timestamp', timestamp.toString());
        }
        if (minStalenessSeconds !== undefined) {
            url.searchParams.append('minStalenessSeconds', minStalenessSeconds.toString());
        }
        try {
            const response = yield __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].get(url.toString());
            if (response.status !== 200) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }
            return response.data;
        } catch (error) {
            console.error('Error fetching randomness data:', error);
            throw error;
        }
    });
} //# sourceMappingURL=index.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/oracle-interfaces/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$oracle$2d$interfaces$2f$gateway$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/oracle-interfaces/gateway.js [app-route] (ecmascript)"); //# sourceMappingURL=index.js.map
;
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/sysvars/associatedToken.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssociatedTokenProgram",
    ()=>AssociatedTokenProgram
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/constants.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$30$2e$1_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.30.1_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript) <export * as web3>");
;
;
class AssociatedTokenProgram {
    constructor(){}
    /**
     * Find the associated token address for the given wallet and token mint
     */ findAssociatedTokenAddress(walletAddress, tokenMintAddress) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__web3$3e$__["web3"].PublicKey.findProgramAddressSync([
            walletAddress.toBuffer(),
            __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_TOKEN_PROGRAM_ID"].toBuffer(),
            tokenMintAddress.toBuffer()
        ], __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID"]);
    }
} //# sourceMappingURL=associatedToken.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/sysvars/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$sysvars$2f$associatedToken$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/sysvars/associatedToken.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$sysvars$2f$recentSlothashes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/sysvars/recentSlothashes.js [app-route] (ecmascript)"); //# sourceMappingURL=index.js.map
;
;
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "asV0Tx",
    ()=>asV0Tx
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$instruction$2d$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/instruction-utils/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$instruction$2d$utils$2f$InstructionUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/instruction-utils/InstructionUtils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$anchor$2d$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/anchor-utils/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/constants.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$event$2d$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/event-utils/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$evm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/evm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$oracle$2d$interfaces$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/oracle-interfaces/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$sysvars$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/sysvars/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/utils/index.js [app-route] (ecmascript)");
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
const asV0Tx = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$instruction$2d$utils$2f$InstructionUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InstructionUtils"].asV0TxWithComputeIxs; //# sourceMappingURL=index.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LutMap",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$lutMap$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LutMap"],
    "Oracle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$oracle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Oracle"],
    "OracleResponse",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$pullFeed$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OracleResponse"],
    "Permission",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$permission$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Permission"],
    "PullFeed",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$pullFeed$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PullFeed"],
    "Queue",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$queue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Queue"],
    "Randomness",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$randomness$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Randomness"],
    "State",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["State"],
    "SwitchboardPermission",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$permission$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SwitchboardPermission"],
    "toFeedValue",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$pullFeed$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toFeedValue"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$lutMap$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/lutMap.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$oracle$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/oracle.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$permission$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/permission.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$pullFeed$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/pullFeed.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$queue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/queue.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$randomness$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/randomness.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$state$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/state.js [app-route] (ecmascript)");
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/anchor-utils/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnchorUtils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$anchor$2d$utils$2f$AnchorUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AnchorUtils"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$anchor$2d$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/anchor-utils/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$anchor$2d$utils$2f$AnchorUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/anchor-utils/AnchorUtils.js [app-route] (ecmascript)");
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/evm/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createJob",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$evm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createJob"],
    "fetchRandomness",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$evm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fetchRandomness"],
    "fetchResult",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$evm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fetchResult"],
    "fetchResults",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$evm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fetchResults"],
    "getAttestation",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$evm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getAttestation"],
    "getFeedUpdateData",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$evm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getFeedUpdateData"],
    "getFeedUpdateWithContext",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$evm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getFeedUpdateWithContext"],
    "getUpdate",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$evm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getUpdate"],
    "message",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$evm$2f$message$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    "simulateFeed",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$evm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["simulateFeed"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$evm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/evm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$evm$2f$message$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/evm/message.js [app-route] (ecmascript)");
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/instruction-utils/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InstructionUtils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$instruction$2d$utils$2f$InstructionUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InstructionUtils"],
    "Secp256k1InstructionUtils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$instruction$2d$utils$2f$Secp256k1InstructionUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Secp256k1InstructionUtils"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$instruction$2d$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/instruction-utils/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$instruction$2d$utils$2f$InstructionUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/instruction-utils/InstructionUtils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$instruction$2d$utils$2f$Secp256k1InstructionUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/instruction-utils/Secp256k1InstructionUtils.js [app-route] (ecmascript)");
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/oracle-interfaces/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Gateway",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$oracle$2d$interfaces$2f$gateway$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Gateway"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$oracle$2d$interfaces$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/oracle-interfaces/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$oracle$2d$interfaces$2f$gateway$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/oracle-interfaces/gateway.js [app-route] (ecmascript)");
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/sysvars/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssociatedTokenProgram",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$sysvars$2f$associatedToken$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AssociatedTokenProgram"],
    "RecentSlotHashes",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$sysvars$2f$recentSlothashes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RecentSlotHashes"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$sysvars$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/sysvars/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$sysvars$2f$associatedToken$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/sysvars/associatedToken.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$sysvars$2f$recentSlothashes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/sysvars/recentSlothashes.js [app-route] (ecmascript)");
}),
"[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnchorUtils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$anchor$2d$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AnchorUtils"],
    "AssociatedTokenProgram",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$sysvars$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AssociatedTokenProgram"],
    "EVM",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$evm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    "Gateway",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$oracle$2d$interfaces$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Gateway"],
    "InstructionUtils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$instruction$2d$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InstructionUtils"],
    "LutMap",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LutMap"],
    "ON_DEMAND_DEVNET_GUARDIAN_QUEUE",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ON_DEMAND_DEVNET_GUARDIAN_QUEUE"],
    "ON_DEMAND_DEVNET_PID",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ON_DEMAND_DEVNET_PID"],
    "ON_DEMAND_DEVNET_QUEUE",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ON_DEMAND_DEVNET_QUEUE"],
    "ON_DEMAND_DEVNET_QUEUE_PDA",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ON_DEMAND_DEVNET_QUEUE_PDA"],
    "ON_DEMAND_MAINNET_GUARDIAN_QUEUE",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ON_DEMAND_MAINNET_GUARDIAN_QUEUE"],
    "ON_DEMAND_MAINNET_PID",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ON_DEMAND_MAINNET_PID"],
    "ON_DEMAND_MAINNET_QUEUE",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ON_DEMAND_MAINNET_QUEUE"],
    "ON_DEMAND_MAINNET_QUEUE_PDA",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ON_DEMAND_MAINNET_QUEUE_PDA"],
    "Oracle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Oracle"],
    "OracleResponse",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OracleResponse"],
    "Permission",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Permission"],
    "PullFeed",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PullFeed"],
    "PullFeedValueEvent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$event$2d$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PullFeedValueEvent"],
    "Queue",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Queue"],
    "Randomness",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Randomness"],
    "RecentSlotHashes",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$sysvars$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RecentSlotHashes"],
    "SOL_NATIVE_MINT",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SOL_NATIVE_MINT"],
    "SOL_NATIVE_MINT_2022",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SOL_NATIVE_MINT_2022"],
    "SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID"],
    "SPL_SYSVAR_INSTRUCTIONS_ID",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_SYSVAR_INSTRUCTIONS_ID"],
    "SPL_SYSVAR_SLOT_HASHES_ID",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_SYSVAR_SLOT_HASHES_ID"],
    "SPL_TOKEN_2022_PROGRAM_ID",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_TOKEN_2022_PROGRAM_ID"],
    "SPL_TOKEN_PROGRAM_ID",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPL_TOKEN_PROGRAM_ID"],
    "Secp256k1InstructionUtils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$instruction$2d$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Secp256k1InstructionUtils"],
    "State",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["State"],
    "SwitchboardPermission",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SwitchboardPermission"],
    "asV0Tx",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["asV0Tx"],
    "createLoadLookupTables",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLoadLookupTables"],
    "fetchAllLutKeys",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchAllLutKeys"],
    "getAssociatedTokenAddress",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssociatedTokenAddress"],
    "getAssociatedTokenAddressSync",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssociatedTokenAddressSync"],
    "getDefaultDevnetGuardianQueue",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDefaultDevnetGuardianQueue"],
    "getDefaultDevnetQueue",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDefaultDevnetQueue"],
    "getDefaultGuardianQueue",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDefaultGuardianQueue"],
    "getDefaultQueue",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDefaultQueue"],
    "getDefaultQueueAddress",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDefaultQueueAddress"],
    "getNodePayer",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getNodePayer"],
    "getProgramId",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getProgramId"],
    "getQueue",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getQueue"],
    "isDevnetConnection",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDevnetConnection"],
    "isMainnetConnection",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isMainnetConnection"],
    "loadLookupTables",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadLookupTables"],
    "storeFeed",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["storeFeed"],
    "toFeedValue",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toFeedValue"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$accounts$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/accounts/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$anchor$2d$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/anchor-utils/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/constants.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$event$2d$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/event-utils/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$evm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/evm/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$instruction$2d$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/instruction-utils/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$oracle$2d$interfaces$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/oracle-interfaces/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$sysvars$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/sysvars/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$switchboard$2d$xyz$2b$on$2d$demand$40$2$2e$4$2e$1_$40$switchboard$2d$xyz$2b$common$40$3$2e$0$2e$14_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$switchboard$2d$xyz$2f$on$2d$demand$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@switchboard-xyz+on-demand@2.4.1_@switchboard-xyz+common@3.0.14_typescript@5.9.3/node_modules/@switchboard-xyz/on-demand/dist/esm/utils/index.js [app-route] (ecmascript)");
}),
];

//# sourceMappingURL=e1f36_%40switchboard-xyz_on-demand_dist_esm_b4e498c1._.js.map