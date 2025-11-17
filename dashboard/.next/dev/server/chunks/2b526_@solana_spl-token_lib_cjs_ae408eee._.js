module.exports = [
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.programSupportsExtensions = exports.NATIVE_MINT_2022 = exports.NATIVE_MINT = exports.ASSOCIATED_TOKEN_PROGRAM_ID = exports.TOKEN_2022_PROGRAM_ID = exports.TOKEN_PROGRAM_ID = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
/** Address of the SPL Token program */ exports.TOKEN_PROGRAM_ID = new web3_js_1.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
/** Address of the SPL Token 2022 program */ exports.TOKEN_2022_PROGRAM_ID = new web3_js_1.PublicKey('TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb');
/** Address of the SPL Associated Token Account program */ exports.ASSOCIATED_TOKEN_PROGRAM_ID = new web3_js_1.PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
/** Address of the special mint for wrapped native SOL in spl-token */ exports.NATIVE_MINT = new web3_js_1.PublicKey('So11111111111111111111111111111111111111112');
/** Address of the special mint for wrapped native SOL in spl-token-2022 */ exports.NATIVE_MINT_2022 = new web3_js_1.PublicKey('9pan9bMn5HatX4EJdBwg9VgCa7Uz5HL8N1m5D3NdXejP');
/** Check that the token program provided is not `Tokenkeg...`, useful when using extensions */ function programSupportsExtensions(programId) {
    if (programId === exports.TOKEN_PROGRAM_ID) {
        return false;
    } else {
        return true;
    }
}
exports.programSupportsExtensions = programSupportsExtensions; //# sourceMappingURL=constants.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TokenTransferHookAccountDataNotFound = exports.TokenTransferHookInvalidSeed = exports.TokenTransferHookAccountNotFound = exports.TokenUnsupportedInstructionError = exports.TokenInvalidInstructionTypeError = exports.TokenInvalidInstructionDataError = exports.TokenInvalidInstructionKeysError = exports.TokenInvalidInstructionProgramError = exports.TokenOwnerOffCurveError = exports.TokenInvalidOwnerError = exports.TokenInvalidMintError = exports.TokenInvalidAccountSizeError = exports.TokenInvalidAccountOwnerError = exports.TokenInvalidAccountDataError = exports.TokenInvalidAccountError = exports.TokenAccountNotFoundError = exports.TokenError = void 0;
/** Base class for errors */ class TokenError extends Error {
    constructor(message){
        super(message);
    }
}
exports.TokenError = TokenError;
/** Thrown if an account is not found at the expected address */ class TokenAccountNotFoundError extends TokenError {
    constructor(){
        super(...arguments);
        this.name = 'TokenAccountNotFoundError';
    }
}
exports.TokenAccountNotFoundError = TokenAccountNotFoundError;
/** Thrown if a program state account is not a valid Account */ class TokenInvalidAccountError extends TokenError {
    constructor(){
        super(...arguments);
        this.name = 'TokenInvalidAccountError';
    }
}
exports.TokenInvalidAccountError = TokenInvalidAccountError;
/** Thrown if a program state account does not contain valid data */ class TokenInvalidAccountDataError extends TokenError {
    constructor(){
        super(...arguments);
        this.name = 'TokenInvalidAccountDataError';
    }
}
exports.TokenInvalidAccountDataError = TokenInvalidAccountDataError;
/** Thrown if a program state account is not owned by the expected token program */ class TokenInvalidAccountOwnerError extends TokenError {
    constructor(){
        super(...arguments);
        this.name = 'TokenInvalidAccountOwnerError';
    }
}
exports.TokenInvalidAccountOwnerError = TokenInvalidAccountOwnerError;
/** Thrown if the byte length of an program state account doesn't match the expected size */ class TokenInvalidAccountSizeError extends TokenError {
    constructor(){
        super(...arguments);
        this.name = 'TokenInvalidAccountSizeError';
    }
}
exports.TokenInvalidAccountSizeError = TokenInvalidAccountSizeError;
/** Thrown if the mint of a token account doesn't match the expected mint */ class TokenInvalidMintError extends TokenError {
    constructor(){
        super(...arguments);
        this.name = 'TokenInvalidMintError';
    }
}
exports.TokenInvalidMintError = TokenInvalidMintError;
/** Thrown if the owner of a token account doesn't match the expected owner */ class TokenInvalidOwnerError extends TokenError {
    constructor(){
        super(...arguments);
        this.name = 'TokenInvalidOwnerError';
    }
}
exports.TokenInvalidOwnerError = TokenInvalidOwnerError;
/** Thrown if the owner of a token account is a PDA (Program Derived Address) */ class TokenOwnerOffCurveError extends TokenError {
    constructor(){
        super(...arguments);
        this.name = 'TokenOwnerOffCurveError';
    }
}
exports.TokenOwnerOffCurveError = TokenOwnerOffCurveError;
/** Thrown if an instruction's program is invalid */ class TokenInvalidInstructionProgramError extends TokenError {
    constructor(){
        super(...arguments);
        this.name = 'TokenInvalidInstructionProgramError';
    }
}
exports.TokenInvalidInstructionProgramError = TokenInvalidInstructionProgramError;
/** Thrown if an instruction's keys are invalid */ class TokenInvalidInstructionKeysError extends TokenError {
    constructor(){
        super(...arguments);
        this.name = 'TokenInvalidInstructionKeysError';
    }
}
exports.TokenInvalidInstructionKeysError = TokenInvalidInstructionKeysError;
/** Thrown if an instruction's data is invalid */ class TokenInvalidInstructionDataError extends TokenError {
    constructor(){
        super(...arguments);
        this.name = 'TokenInvalidInstructionDataError';
    }
}
exports.TokenInvalidInstructionDataError = TokenInvalidInstructionDataError;
/** Thrown if an instruction's type is invalid */ class TokenInvalidInstructionTypeError extends TokenError {
    constructor(){
        super(...arguments);
        this.name = 'TokenInvalidInstructionTypeError';
    }
}
exports.TokenInvalidInstructionTypeError = TokenInvalidInstructionTypeError;
/** Thrown if the program does not support the desired instruction */ class TokenUnsupportedInstructionError extends TokenError {
    constructor(){
        super(...arguments);
        this.name = 'TokenUnsupportedInstructionError';
    }
}
exports.TokenUnsupportedInstructionError = TokenUnsupportedInstructionError;
/** Thrown if the transfer hook extra accounts contains an invalid account index */ class TokenTransferHookAccountNotFound extends TokenError {
    constructor(){
        super(...arguments);
        this.name = 'TokenTransferHookAccountNotFound';
    }
}
exports.TokenTransferHookAccountNotFound = TokenTransferHookAccountNotFound;
/** Thrown if the transfer hook extra accounts contains an invalid seed */ class TokenTransferHookInvalidSeed extends TokenError {
    constructor(){
        super(...arguments);
        this.name = 'TokenTransferHookInvalidSeed';
    }
}
exports.TokenTransferHookInvalidSeed = TokenTransferHookInvalidSeed;
/** Thrown if account data required by an extra account meta seed config could not be fetched */ class TokenTransferHookAccountDataNotFound extends TokenError {
    constructor(){
        super(...arguments);
        this.name = 'TokenTransferHookAccountDataNotFound';
    }
}
exports.TokenTransferHookAccountDataNotFound = TokenTransferHookAccountDataNotFound; //# sourceMappingURL=errors.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TokenInstruction = void 0;
/** Instructions defined by the program */ var TokenInstruction;
(function(TokenInstruction) {
    TokenInstruction[TokenInstruction["InitializeMint"] = 0] = "InitializeMint";
    TokenInstruction[TokenInstruction["InitializeAccount"] = 1] = "InitializeAccount";
    TokenInstruction[TokenInstruction["InitializeMultisig"] = 2] = "InitializeMultisig";
    TokenInstruction[TokenInstruction["Transfer"] = 3] = "Transfer";
    TokenInstruction[TokenInstruction["Approve"] = 4] = "Approve";
    TokenInstruction[TokenInstruction["Revoke"] = 5] = "Revoke";
    TokenInstruction[TokenInstruction["SetAuthority"] = 6] = "SetAuthority";
    TokenInstruction[TokenInstruction["MintTo"] = 7] = "MintTo";
    TokenInstruction[TokenInstruction["Burn"] = 8] = "Burn";
    TokenInstruction[TokenInstruction["CloseAccount"] = 9] = "CloseAccount";
    TokenInstruction[TokenInstruction["FreezeAccount"] = 10] = "FreezeAccount";
    TokenInstruction[TokenInstruction["ThawAccount"] = 11] = "ThawAccount";
    TokenInstruction[TokenInstruction["TransferChecked"] = 12] = "TransferChecked";
    TokenInstruction[TokenInstruction["ApproveChecked"] = 13] = "ApproveChecked";
    TokenInstruction[TokenInstruction["MintToChecked"] = 14] = "MintToChecked";
    TokenInstruction[TokenInstruction["BurnChecked"] = 15] = "BurnChecked";
    TokenInstruction[TokenInstruction["InitializeAccount2"] = 16] = "InitializeAccount2";
    TokenInstruction[TokenInstruction["SyncNative"] = 17] = "SyncNative";
    TokenInstruction[TokenInstruction["InitializeAccount3"] = 18] = "InitializeAccount3";
    TokenInstruction[TokenInstruction["InitializeMultisig2"] = 19] = "InitializeMultisig2";
    TokenInstruction[TokenInstruction["InitializeMint2"] = 20] = "InitializeMint2";
    TokenInstruction[TokenInstruction["GetAccountDataSize"] = 21] = "GetAccountDataSize";
    TokenInstruction[TokenInstruction["InitializeImmutableOwner"] = 22] = "InitializeImmutableOwner";
    TokenInstruction[TokenInstruction["AmountToUiAmount"] = 23] = "AmountToUiAmount";
    TokenInstruction[TokenInstruction["UiAmountToAmount"] = 24] = "UiAmountToAmount";
    TokenInstruction[TokenInstruction["InitializeMintCloseAuthority"] = 25] = "InitializeMintCloseAuthority";
    TokenInstruction[TokenInstruction["TransferFeeExtension"] = 26] = "TransferFeeExtension";
    TokenInstruction[TokenInstruction["ConfidentialTransferExtension"] = 27] = "ConfidentialTransferExtension";
    TokenInstruction[TokenInstruction["DefaultAccountStateExtension"] = 28] = "DefaultAccountStateExtension";
    TokenInstruction[TokenInstruction["Reallocate"] = 29] = "Reallocate";
    TokenInstruction[TokenInstruction["MemoTransferExtension"] = 30] = "MemoTransferExtension";
    TokenInstruction[TokenInstruction["CreateNativeMint"] = 31] = "CreateNativeMint";
    TokenInstruction[TokenInstruction["InitializeNonTransferableMint"] = 32] = "InitializeNonTransferableMint";
    TokenInstruction[TokenInstruction["InterestBearingMintExtension"] = 33] = "InterestBearingMintExtension";
    TokenInstruction[TokenInstruction["CpiGuardExtension"] = 34] = "CpiGuardExtension";
    TokenInstruction[TokenInstruction["InitializePermanentDelegate"] = 35] = "InitializePermanentDelegate";
    TokenInstruction[TokenInstruction["TransferHookExtension"] = 36] = "TransferHookExtension";
    // ConfidentialTransferFeeExtension = 37,
    // WithdrawalExcessLamports = 38,
    TokenInstruction[TokenInstruction["MetadataPointerExtension"] = 39] = "MetadataPointerExtension";
})(TokenInstruction || (exports.TokenInstruction = TokenInstruction = {})); //# sourceMappingURL=types.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/amountToUiAmount.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeAmountToUiAmountInstructionUnchecked = exports.decodeAmountToUiAmountInstruction = exports.createAmountToUiAmountInstruction = exports.amountToUiAmountInstructionData = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
/** TODO: docs */ exports.amountToUiAmountInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_utils_1.u64)('amount')
]);
/**
 * Construct a AmountToUiAmount instruction
 *
 * @param mint         Public key of the mint
 * @param amount       Amount of tokens to be converted to UiAmount
 * @param programId    SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createAmountToUiAmountInstruction(mint, amount, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    const keys = [
        {
            pubkey: mint,
            isSigner: false,
            isWritable: false
        }
    ];
    const data = Buffer.alloc(exports.amountToUiAmountInstructionData.span);
    exports.amountToUiAmountInstructionData.encode({
        instruction: types_js_1.TokenInstruction.AmountToUiAmount,
        amount: BigInt(amount)
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createAmountToUiAmountInstruction = createAmountToUiAmountInstruction;
/**
 * Decode a AmountToUiAmount instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeAmountToUiAmountInstruction(instruction, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.amountToUiAmountInstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { mint }, data } = decodeAmountToUiAmountInstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.AmountToUiAmount) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!mint) throw new errors_js_1.TokenInvalidInstructionKeysError();
    return {
        programId,
        keys: {
            mint
        },
        data
    };
}
exports.decodeAmountToUiAmountInstruction = decodeAmountToUiAmountInstruction;
/**
 * Decode a AmountToUiAmount instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeAmountToUiAmountInstructionUnchecked({ programId, keys: [mint], data }) {
    return {
        programId,
        keys: {
            mint
        },
        data: exports.amountToUiAmountInstructionData.decode(data)
    };
}
exports.decodeAmountToUiAmountInstructionUnchecked = decodeAmountToUiAmountInstructionUnchecked; //# sourceMappingURL=amountToUiAmount.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/amountToUiAmount.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.amountToUiAmount = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const amountToUiAmount_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/amountToUiAmount.js [app-route] (ecmascript)");
/**
 * Amount as a string using mint-prescribed decimals
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction fees
 * @param mint           Mint for the account
 * @param amount         Amount of tokens to be converted to Ui Amount
 * @param programId      SPL Token program account
 *
 * @return Ui Amount generated
 */ function amountToUiAmount(connection, payer, mint, amount, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const transaction = new web3_js_1.Transaction().add((0, amountToUiAmount_js_1.createAmountToUiAmountInstruction)(mint, amount, programId));
        const { returnData, err } = (yield connection.simulateTransaction(transaction, [
            payer
        ], false)).value;
        if (returnData === null || returnData === void 0 ? void 0 : returnData.data) {
            return Buffer.from(returnData.data[0], returnData.data[1]).toString('utf-8');
        }
        return err;
    });
}
exports.amountToUiAmount = amountToUiAmount; //# sourceMappingURL=amountToUiAmount.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/internal.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addSigners = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
/** @internal */ function addSigners(keys, ownerOrAuthority, multiSigners) {
    if (multiSigners.length) {
        keys.push({
            pubkey: ownerOrAuthority,
            isSigner: false,
            isWritable: false
        });
        for (const signer of multiSigners){
            keys.push({
                pubkey: signer instanceof web3_js_1.PublicKey ? signer : signer.publicKey,
                isSigner: true,
                isWritable: false
            });
        }
    } else {
        keys.push({
            pubkey: ownerOrAuthority,
            isSigner: true,
            isWritable: false
        });
    }
    return keys;
}
exports.addSigners = addSigners; //# sourceMappingURL=internal.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/approve.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeApproveInstructionUnchecked = exports.decodeApproveInstruction = exports.createApproveInstruction = exports.approveInstructionData = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/internal.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
/** TODO: docs */ exports.approveInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_utils_1.u64)('amount')
]);
/**
 * Construct an Approve instruction
 *
 * @param account      Account to set the delegate for
 * @param delegate     Account authorized to transfer tokens from the account
 * @param owner        Owner of the account
 * @param amount       Maximum number of tokens the delegate may transfer
 * @param multiSigners Signing accounts if `owner` is a multisig
 * @param programId    SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createApproveInstruction(account, delegate, owner, amount, multiSigners = [], programId = constants_js_1.TOKEN_PROGRAM_ID) {
    const keys = (0, internal_js_1.addSigners)([
        {
            pubkey: account,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: delegate,
            isSigner: false,
            isWritable: false
        }
    ], owner, multiSigners);
    const data = Buffer.alloc(exports.approveInstructionData.span);
    exports.approveInstructionData.encode({
        instruction: types_js_1.TokenInstruction.Approve,
        amount: BigInt(amount)
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createApproveInstruction = createApproveInstruction;
/**
 * Decode an Approve instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeApproveInstruction(instruction, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.approveInstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { account, delegate, owner, multiSigners }, data } = decodeApproveInstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.Approve) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!account || !delegate || !owner) throw new errors_js_1.TokenInvalidInstructionKeysError();
    // TODO: key checks?
    return {
        programId,
        keys: {
            account,
            delegate,
            owner,
            multiSigners
        },
        data
    };
}
exports.decodeApproveInstruction = decodeApproveInstruction;
/**
 * Decode an Approve instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeApproveInstructionUnchecked({ programId, keys: [account, delegate, owner, ...multiSigners], data }) {
    return {
        programId,
        keys: {
            account,
            delegate,
            owner,
            multiSigners
        },
        data: exports.approveInstructionData.decode(data)
    };
}
exports.decodeApproveInstructionUnchecked = decodeApproveInstructionUnchecked; //# sourceMappingURL=approve.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/internal.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSigners = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
/** @internal */ function getSigners(signerOrMultisig, multiSigners) {
    return signerOrMultisig instanceof web3_js_1.PublicKey ? [
        signerOrMultisig,
        multiSigners
    ] : [
        signerOrMultisig.publicKey,
        [
            signerOrMultisig
        ]
    ];
}
exports.getSigners = getSigners; //# sourceMappingURL=internal.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/approve.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.approve = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const approve_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/approve.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/internal.js [app-route] (ecmascript)");
/**
 * Approve a delegate to transfer up to a maximum number of tokens from an account
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction fees
 * @param account        Address of the token account
 * @param delegate       Account authorized to transfer tokens from the account
 * @param owner          Owner of the account
 * @param amount         Maximum number of tokens the delegate may transfer
 * @param multiSigners   Signing accounts if `owner` is a multisig
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function approve(connection, payer, account, delegate, owner, amount, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [ownerPublicKey, signers] = (0, internal_js_1.getSigners)(owner, multiSigners);
        const transaction = new web3_js_1.Transaction().add((0, approve_js_1.createApproveInstruction)(account, delegate, ownerPublicKey, amount, multiSigners, programId));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.approve = approve; //# sourceMappingURL=approve.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/approveChecked.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeApproveCheckedInstructionUnchecked = exports.decodeApproveCheckedInstruction = exports.createApproveCheckedInstruction = exports.approveCheckedInstructionData = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/internal.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
/** TODO: docs */ exports.approveCheckedInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_utils_1.u64)('amount'),
    (0, buffer_layout_1.u8)('decimals')
]);
/**
 * Construct an ApproveChecked instruction
 *
 * @param account      Account to set the delegate for
 * @param mint         Mint account
 * @param delegate     Account authorized to transfer of tokens from the account
 * @param owner        Owner of the account
 * @param amount       Maximum number of tokens the delegate may transfer
 * @param decimals     Number of decimals in approve amount
 * @param multiSigners Signing accounts if `owner` is a multisig
 * @param programId    SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createApproveCheckedInstruction(account, mint, delegate, owner, amount, decimals, multiSigners = [], programId = constants_js_1.TOKEN_PROGRAM_ID) {
    const keys = (0, internal_js_1.addSigners)([
        {
            pubkey: account,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: mint,
            isSigner: false,
            isWritable: false
        },
        {
            pubkey: delegate,
            isSigner: false,
            isWritable: false
        }
    ], owner, multiSigners);
    const data = Buffer.alloc(exports.approveCheckedInstructionData.span);
    exports.approveCheckedInstructionData.encode({
        instruction: types_js_1.TokenInstruction.ApproveChecked,
        amount: BigInt(amount),
        decimals
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createApproveCheckedInstruction = createApproveCheckedInstruction;
/**
 * Decode an ApproveChecked instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeApproveCheckedInstruction(instruction, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.approveCheckedInstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { account, mint, delegate, owner, multiSigners }, data } = decodeApproveCheckedInstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.ApproveChecked) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!account || !mint || !delegate || !owner) throw new errors_js_1.TokenInvalidInstructionKeysError();
    // TODO: key checks?
    return {
        programId,
        keys: {
            account,
            mint,
            delegate,
            owner,
            multiSigners
        },
        data
    };
}
exports.decodeApproveCheckedInstruction = decodeApproveCheckedInstruction;
/**
 * Decode an ApproveChecked instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeApproveCheckedInstructionUnchecked({ programId, keys: [account, mint, delegate, owner, ...multiSigners], data }) {
    return {
        programId,
        keys: {
            account,
            mint,
            delegate,
            owner,
            multiSigners
        },
        data: exports.approveCheckedInstructionData.decode(data)
    };
}
exports.decodeApproveCheckedInstructionUnchecked = decodeApproveCheckedInstructionUnchecked; //# sourceMappingURL=approveChecked.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/approveChecked.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.approveChecked = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const approveChecked_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/approveChecked.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/internal.js [app-route] (ecmascript)");
/**
 * Approve a delegate to transfer up to a maximum number of tokens from an account, asserting the token mint and
 * decimals
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction fees
 * @param account        Address of the account
 * @param delegate       Account authorized to perform a transfer tokens from the source account
 * @param owner          Owner of the source account
 * @param amount         Maximum number of tokens the delegate may transfer
 * @param decimals       Number of decimals in approve amount
 * @param multiSigners   Signing accounts if `owner` is a multisig
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function approveChecked(connection, payer, mint, account, delegate, owner, amount, decimals, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [ownerPublicKey, signers] = (0, internal_js_1.getSigners)(owner, multiSigners);
        const transaction = new web3_js_1.Transaction().add((0, approveChecked_js_1.createApproveCheckedInstruction)(account, mint, delegate, ownerPublicKey, amount, decimals, multiSigners, programId));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.approveChecked = approveChecked; //# sourceMappingURL=approveChecked.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/burn.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeBurnInstructionUnchecked = exports.decodeBurnInstruction = exports.createBurnInstruction = exports.burnInstructionData = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/internal.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
/** TODO: docs */ exports.burnInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_utils_1.u64)('amount')
]);
/**
 * Construct a Burn instruction
 *
 * @param account      Account to burn tokens from
 * @param mint         Mint for the account
 * @param owner        Owner of the account
 * @param amount       Number of tokens to burn
 * @param multiSigners Signing accounts if `owner` is a multisig
 * @param programId    SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createBurnInstruction(account, mint, owner, amount, multiSigners = [], programId = constants_js_1.TOKEN_PROGRAM_ID) {
    const keys = (0, internal_js_1.addSigners)([
        {
            pubkey: account,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: mint,
            isSigner: false,
            isWritable: true
        }
    ], owner, multiSigners);
    const data = Buffer.alloc(exports.burnInstructionData.span);
    exports.burnInstructionData.encode({
        instruction: types_js_1.TokenInstruction.Burn,
        amount: BigInt(amount)
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createBurnInstruction = createBurnInstruction;
/**
 * Decode a Burn instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeBurnInstruction(instruction, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.burnInstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { account, mint, owner, multiSigners }, data } = decodeBurnInstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.Burn) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!account || !mint || !owner) throw new errors_js_1.TokenInvalidInstructionKeysError();
    // TODO: key checks?
    return {
        programId,
        keys: {
            account,
            mint,
            owner,
            multiSigners
        },
        data
    };
}
exports.decodeBurnInstruction = decodeBurnInstruction;
/**
 * Decode a Burn instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeBurnInstructionUnchecked({ programId, keys: [account, mint, owner, ...multiSigners], data }) {
    return {
        programId,
        keys: {
            account,
            mint,
            owner,
            multiSigners
        },
        data: exports.burnInstructionData.decode(data)
    };
}
exports.decodeBurnInstructionUnchecked = decodeBurnInstructionUnchecked; //# sourceMappingURL=burn.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/burn.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.burn = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const burn_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/burn.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/internal.js [app-route] (ecmascript)");
/**
 * Burn tokens from an account
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction fees
 * @param account        Account to burn tokens from
 * @param mint           Mint for the account
 * @param owner          Account owner
 * @param amount         Amount to burn
 * @param multiSigners   Signing accounts if `owner` is a multisig
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function burn(connection, payer, account, mint, owner, amount, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [ownerPublicKey, signers] = (0, internal_js_1.getSigners)(owner, multiSigners);
        const transaction = new web3_js_1.Transaction().add((0, burn_js_1.createBurnInstruction)(account, mint, ownerPublicKey, amount, multiSigners, programId));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.burn = burn; //# sourceMappingURL=burn.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/burnChecked.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeBurnCheckedInstructionUnchecked = exports.decodeBurnCheckedInstruction = exports.createBurnCheckedInstruction = exports.burnCheckedInstructionData = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/internal.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
/** TODO: docs */ exports.burnCheckedInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_utils_1.u64)('amount'),
    (0, buffer_layout_1.u8)('decimals')
]);
/**
 * Construct a BurnChecked instruction
 *
 * @param mint         Mint for the account
 * @param account      Account to burn tokens from
 * @param owner        Owner of the account
 * @param amount       Number of tokens to burn
 * @param decimals     Number of decimals in burn amount
 * @param multiSigners Signing accounts if `owner` is a multisig
 * @param programId    SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createBurnCheckedInstruction(account, mint, owner, amount, decimals, multiSigners = [], programId = constants_js_1.TOKEN_PROGRAM_ID) {
    const keys = (0, internal_js_1.addSigners)([
        {
            pubkey: account,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: mint,
            isSigner: false,
            isWritable: true
        }
    ], owner, multiSigners);
    const data = Buffer.alloc(exports.burnCheckedInstructionData.span);
    exports.burnCheckedInstructionData.encode({
        instruction: types_js_1.TokenInstruction.BurnChecked,
        amount: BigInt(amount),
        decimals
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createBurnCheckedInstruction = createBurnCheckedInstruction;
/**
 * Decode a BurnChecked instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeBurnCheckedInstruction(instruction, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.burnCheckedInstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { account, mint, owner, multiSigners }, data } = decodeBurnCheckedInstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.BurnChecked) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!account || !mint || !owner) throw new errors_js_1.TokenInvalidInstructionKeysError();
    // TODO: key checks?
    return {
        programId,
        keys: {
            account,
            mint,
            owner,
            multiSigners
        },
        data
    };
}
exports.decodeBurnCheckedInstruction = decodeBurnCheckedInstruction;
/**
 * Decode a BurnChecked instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeBurnCheckedInstructionUnchecked({ programId, keys: [account, mint, owner, ...multiSigners], data }) {
    return {
        programId,
        keys: {
            account,
            mint,
            owner,
            multiSigners
        },
        data: exports.burnCheckedInstructionData.decode(data)
    };
}
exports.decodeBurnCheckedInstructionUnchecked = decodeBurnCheckedInstructionUnchecked; //# sourceMappingURL=burnChecked.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/burnChecked.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.burnChecked = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const burnChecked_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/burnChecked.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/internal.js [app-route] (ecmascript)");
/**
 * Burn tokens from an account, asserting the token mint and decimals
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction fees
 * @param account        Account to burn tokens from
 * @param mint           Mint for the account
 * @param owner          Account owner
 * @param amount         Amount to burn
 * @param decimals       Number of decimals in amount to burn
 * @param multiSigners   Signing accounts if `owner` is a multisig
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function burnChecked(connection, payer, account, mint, owner, amount, decimals, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [ownerPublicKey, signers] = (0, internal_js_1.getSigners)(owner, multiSigners);
        const transaction = new web3_js_1.Transaction().add((0, burnChecked_js_1.createBurnCheckedInstruction)(account, mint, ownerPublicKey, amount, decimals, multiSigners, programId));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.burnChecked = burnChecked; //# sourceMappingURL=burnChecked.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/closeAccount.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeCloseAccountInstructionUnchecked = exports.decodeCloseAccountInstruction = exports.createCloseAccountInstruction = exports.closeAccountInstructionData = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/internal.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
/** TODO: docs */ exports.closeAccountInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction')
]);
/**
 * Construct a CloseAccount instruction
 *
 * @param account      Account to close
 * @param destination  Account to receive the remaining balance of the closed account
 * @param authority    Account close authority
 * @param multiSigners Signing accounts if `authority` is a multisig
 * @param programId    SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createCloseAccountInstruction(account, destination, authority, multiSigners = [], programId = constants_js_1.TOKEN_PROGRAM_ID) {
    const keys = (0, internal_js_1.addSigners)([
        {
            pubkey: account,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: destination,
            isSigner: false,
            isWritable: true
        }
    ], authority, multiSigners);
    const data = Buffer.alloc(exports.closeAccountInstructionData.span);
    exports.closeAccountInstructionData.encode({
        instruction: types_js_1.TokenInstruction.CloseAccount
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createCloseAccountInstruction = createCloseAccountInstruction;
/**
 * Decode a CloseAccount instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeCloseAccountInstruction(instruction, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.closeAccountInstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { account, destination, authority, multiSigners }, data } = decodeCloseAccountInstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.CloseAccount) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!account || !destination || !authority) throw new errors_js_1.TokenInvalidInstructionKeysError();
    // TODO: key checks?
    return {
        programId,
        keys: {
            account,
            destination,
            authority,
            multiSigners
        },
        data
    };
}
exports.decodeCloseAccountInstruction = decodeCloseAccountInstruction;
/**
 * Decode a CloseAccount instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeCloseAccountInstructionUnchecked({ programId, keys: [account, destination, authority, ...multiSigners], data }) {
    return {
        programId,
        keys: {
            account,
            destination,
            authority,
            multiSigners
        },
        data: exports.closeAccountInstructionData.decode(data)
    };
}
exports.decodeCloseAccountInstructionUnchecked = decodeCloseAccountInstructionUnchecked; //# sourceMappingURL=closeAccount.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/closeAccount.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.closeAccount = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const closeAccount_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/closeAccount.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/internal.js [app-route] (ecmascript)");
/**
 * Close a token account
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction fees
 * @param account        Account to close
 * @param destination    Account to receive the remaining balance of the closed account
 * @param authority      Authority which is allowed to close the account
 * @param multiSigners   Signing accounts if `authority` is a multisig
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function closeAccount(connection, payer, account, destination, authority, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [authorityPublicKey, signers] = (0, internal_js_1.getSigners)(authority, multiSigners);
        const transaction = new web3_js_1.Transaction().add((0, closeAccount_js_1.createCloseAccountInstruction)(account, destination, authorityPublicKey, multiSigners, programId));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.closeAccount = closeAccount; //# sourceMappingURL=closeAccount.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/accountType.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ACCOUNT_TYPE_SIZE = exports.AccountType = void 0;
var AccountType;
(function(AccountType) {
    AccountType[AccountType["Uninitialized"] = 0] = "Uninitialized";
    AccountType[AccountType["Mint"] = 1] = "Mint";
    AccountType[AccountType["Account"] = 2] = "Account";
})(AccountType || (exports.AccountType = AccountType = {}));
exports.ACCOUNT_TYPE_SIZE = 1; //# sourceMappingURL=accountType.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/state/multisig.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMinimumBalanceForRentExemptMultisig = exports.unpackMultisig = exports.getMultisig = exports.MULTISIG_SIZE = exports.MultisigLayout = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
/** Buffer layout for de/serializing a multisig */ exports.MultisigLayout = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('m'),
    (0, buffer_layout_1.u8)('n'),
    (0, buffer_layout_utils_1.bool)('isInitialized'),
    (0, buffer_layout_utils_1.publicKey)('signer1'),
    (0, buffer_layout_utils_1.publicKey)('signer2'),
    (0, buffer_layout_utils_1.publicKey)('signer3'),
    (0, buffer_layout_utils_1.publicKey)('signer4'),
    (0, buffer_layout_utils_1.publicKey)('signer5'),
    (0, buffer_layout_utils_1.publicKey)('signer6'),
    (0, buffer_layout_utils_1.publicKey)('signer7'),
    (0, buffer_layout_utils_1.publicKey)('signer8'),
    (0, buffer_layout_utils_1.publicKey)('signer9'),
    (0, buffer_layout_utils_1.publicKey)('signer10'),
    (0, buffer_layout_utils_1.publicKey)('signer11')
]);
/** Byte length of a multisig */ exports.MULTISIG_SIZE = exports.MultisigLayout.span;
/**
 * Retrieve information about a multisig
 *
 * @param connection Connection to use
 * @param address    Multisig account
 * @param commitment Desired level of commitment for querying the state
 * @param programId  SPL Token program account
 *
 * @return Multisig information
 */ function getMultisig(connection, address, commitment, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const info = yield connection.getAccountInfo(address, commitment);
        return unpackMultisig(address, info, programId);
    });
}
exports.getMultisig = getMultisig;
/**
 * Unpack a multisig
 *
 * @param address   Multisig account
 * @param info      Multisig account data
 * @param programId SPL Token program account
 *
 * @return Unpacked multisig
 */ function unpackMultisig(address, info, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    if (!info) throw new errors_js_1.TokenAccountNotFoundError();
    if (!info.owner.equals(programId)) throw new errors_js_1.TokenInvalidAccountOwnerError();
    if (info.data.length != exports.MULTISIG_SIZE) throw new errors_js_1.TokenInvalidAccountSizeError();
    const multisig = exports.MultisigLayout.decode(info.data);
    return Object.assign({
        address
    }, multisig);
}
exports.unpackMultisig = unpackMultisig;
/** Get the minimum lamport balance for a multisig to be rent exempt
 *
 * @param connection Connection to use
 * @param commitment Desired level of commitment for querying the state
 *
 * @return Amount of lamports required
 */ function getMinimumBalanceForRentExemptMultisig(connection, commitment) {
    return __awaiter(this, void 0, void 0, function*() {
        return yield connection.getMinimumBalanceForRentExemption(exports.MULTISIG_SIZE, commitment);
    });
}
exports.getMinimumBalanceForRentExemptMultisig = getMinimumBalanceForRentExemptMultisig; //# sourceMappingURL=multisig.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/state/account.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.unpackAccount = exports.getMinimumBalanceForRentExemptAccountWithExtensions = exports.getMinimumBalanceForRentExemptAccount = exports.getMultipleAccounts = exports.getAccount = exports.ACCOUNT_SIZE = exports.AccountLayout = exports.AccountState = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const accountType_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/accountType.js [app-route] (ecmascript)");
const extensionType_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/extensionType.js [app-route] (ecmascript)");
const multisig_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/state/multisig.js [app-route] (ecmascript)");
/** Token account state as stored by the program */ var AccountState;
(function(AccountState) {
    AccountState[AccountState["Uninitialized"] = 0] = "Uninitialized";
    AccountState[AccountState["Initialized"] = 1] = "Initialized";
    AccountState[AccountState["Frozen"] = 2] = "Frozen";
})(AccountState || (exports.AccountState = AccountState = {}));
/** Buffer layout for de/serializing a token account */ exports.AccountLayout = (0, buffer_layout_1.struct)([
    (0, buffer_layout_utils_1.publicKey)('mint'),
    (0, buffer_layout_utils_1.publicKey)('owner'),
    (0, buffer_layout_utils_1.u64)('amount'),
    (0, buffer_layout_1.u32)('delegateOption'),
    (0, buffer_layout_utils_1.publicKey)('delegate'),
    (0, buffer_layout_1.u8)('state'),
    (0, buffer_layout_1.u32)('isNativeOption'),
    (0, buffer_layout_utils_1.u64)('isNative'),
    (0, buffer_layout_utils_1.u64)('delegatedAmount'),
    (0, buffer_layout_1.u32)('closeAuthorityOption'),
    (0, buffer_layout_utils_1.publicKey)('closeAuthority')
]);
/** Byte length of a token account */ exports.ACCOUNT_SIZE = exports.AccountLayout.span;
/**
 * Retrieve information about a token account
 *
 * @param connection Connection to use
 * @param address    Token account
 * @param commitment Desired level of commitment for querying the state
 * @param programId  SPL Token program account
 *
 * @return Token account information
 */ function getAccount(connection, address, commitment, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const info = yield connection.getAccountInfo(address, commitment);
        return unpackAccount(address, info, programId);
    });
}
exports.getAccount = getAccount;
/**
 * Retrieve information about multiple token accounts in a single RPC call
 *
 * @param connection Connection to use
 * @param addresses  Token accounts
 * @param commitment Desired level of commitment for querying the state
 * @param programId  SPL Token program account
 *
 * @return Token account information
 */ function getMultipleAccounts(connection, addresses, commitment, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const infos = yield connection.getMultipleAccountsInfo(addresses, commitment);
        return addresses.map((address, i)=>unpackAccount(address, infos[i], programId));
    });
}
exports.getMultipleAccounts = getMultipleAccounts;
/** Get the minimum lamport balance for a base token account to be rent exempt
 *
 * @param connection Connection to use
 * @param commitment Desired level of commitment for querying the state
 *
 * @return Amount of lamports required
 */ function getMinimumBalanceForRentExemptAccount(connection, commitment) {
    return __awaiter(this, void 0, void 0, function*() {
        return yield getMinimumBalanceForRentExemptAccountWithExtensions(connection, [], commitment);
    });
}
exports.getMinimumBalanceForRentExemptAccount = getMinimumBalanceForRentExemptAccount;
/** Get the minimum lamport balance for a rent-exempt token account with extensions
 *
 * @param connection Connection to use
 * @param commitment Desired level of commitment for querying the state
 *
 * @return Amount of lamports required
 */ function getMinimumBalanceForRentExemptAccountWithExtensions(connection, extensions, commitment) {
    return __awaiter(this, void 0, void 0, function*() {
        const accountLen = (0, extensionType_js_1.getAccountLen)(extensions);
        return yield connection.getMinimumBalanceForRentExemption(accountLen, commitment);
    });
}
exports.getMinimumBalanceForRentExemptAccountWithExtensions = getMinimumBalanceForRentExemptAccountWithExtensions;
/**
 * Unpack a token account
 *
 * @param address   Token account
 * @param info      Token account data
 * @param programId SPL Token program account
 *
 * @return Unpacked token account
 */ function unpackAccount(address, info, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    if (!info) throw new errors_js_1.TokenAccountNotFoundError();
    if (!info.owner.equals(programId)) throw new errors_js_1.TokenInvalidAccountOwnerError();
    if (info.data.length < exports.ACCOUNT_SIZE) throw new errors_js_1.TokenInvalidAccountSizeError();
    const rawAccount = exports.AccountLayout.decode(info.data.slice(0, exports.ACCOUNT_SIZE));
    let tlvData = Buffer.alloc(0);
    if (info.data.length > exports.ACCOUNT_SIZE) {
        if (info.data.length === multisig_js_1.MULTISIG_SIZE) throw new errors_js_1.TokenInvalidAccountSizeError();
        if (info.data[exports.ACCOUNT_SIZE] != accountType_js_1.AccountType.Account) throw new errors_js_1.TokenInvalidAccountError();
        tlvData = info.data.slice(exports.ACCOUNT_SIZE + accountType_js_1.ACCOUNT_TYPE_SIZE);
    }
    return {
        address,
        mint: rawAccount.mint,
        owner: rawAccount.owner,
        amount: rawAccount.amount,
        delegate: rawAccount.delegateOption ? rawAccount.delegate : null,
        delegatedAmount: rawAccount.delegatedAmount,
        isInitialized: rawAccount.state !== AccountState.Uninitialized,
        isFrozen: rawAccount.state === AccountState.Frozen,
        isNative: !!rawAccount.isNativeOption,
        rentExemptReserve: rawAccount.isNativeOption ? rawAccount.isNative : null,
        closeAuthority: rawAccount.closeAuthorityOption ? rawAccount.closeAuthority : null,
        tlvData
    };
}
exports.unpackAccount = unpackAccount; //# sourceMappingURL=account.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/state/mint.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAssociatedTokenAddressSync = exports.getAssociatedTokenAddress = exports.getMinimumBalanceForRentExemptMintWithExtensions = exports.getMinimumBalanceForRentExemptMint = exports.unpackMint = exports.getMint = exports.MINT_SIZE = exports.MintLayout = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const accountType_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/accountType.js [app-route] (ecmascript)");
const extensionType_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/extensionType.js [app-route] (ecmascript)");
const account_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/state/account.js [app-route] (ecmascript)");
const multisig_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/state/multisig.js [app-route] (ecmascript)");
/** Buffer layout for de/serializing a mint */ exports.MintLayout = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u32)('mintAuthorityOption'),
    (0, buffer_layout_utils_1.publicKey)('mintAuthority'),
    (0, buffer_layout_utils_1.u64)('supply'),
    (0, buffer_layout_1.u8)('decimals'),
    (0, buffer_layout_utils_1.bool)('isInitialized'),
    (0, buffer_layout_1.u32)('freezeAuthorityOption'),
    (0, buffer_layout_utils_1.publicKey)('freezeAuthority')
]);
/** Byte length of a mint */ exports.MINT_SIZE = exports.MintLayout.span;
/**
 * Retrieve information about a mint
 *
 * @param connection Connection to use
 * @param address    Mint account
 * @param commitment Desired level of commitment for querying the state
 * @param programId  SPL Token program account
 *
 * @return Mint information
 */ function getMint(connection, address, commitment, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const info = yield connection.getAccountInfo(address, commitment);
        return unpackMint(address, info, programId);
    });
}
exports.getMint = getMint;
/**
 * Unpack a mint
 *
 * @param address   Mint account
 * @param info      Mint account data
 * @param programId SPL Token program account
 *
 * @return Unpacked mint
 */ function unpackMint(address, info, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    if (!info) throw new errors_js_1.TokenAccountNotFoundError();
    if (!info.owner.equals(programId)) throw new errors_js_1.TokenInvalidAccountOwnerError();
    if (info.data.length < exports.MINT_SIZE) throw new errors_js_1.TokenInvalidAccountSizeError();
    const rawMint = exports.MintLayout.decode(info.data.slice(0, exports.MINT_SIZE));
    let tlvData = Buffer.alloc(0);
    if (info.data.length > exports.MINT_SIZE) {
        if (info.data.length <= account_js_1.ACCOUNT_SIZE) throw new errors_js_1.TokenInvalidAccountSizeError();
        if (info.data.length === multisig_js_1.MULTISIG_SIZE) throw new errors_js_1.TokenInvalidAccountSizeError();
        if (info.data[account_js_1.ACCOUNT_SIZE] != accountType_js_1.AccountType.Mint) throw new errors_js_1.TokenInvalidMintError();
        tlvData = info.data.slice(account_js_1.ACCOUNT_SIZE + accountType_js_1.ACCOUNT_TYPE_SIZE);
    }
    return {
        address,
        mintAuthority: rawMint.mintAuthorityOption ? rawMint.mintAuthority : null,
        supply: rawMint.supply,
        decimals: rawMint.decimals,
        isInitialized: rawMint.isInitialized,
        freezeAuthority: rawMint.freezeAuthorityOption ? rawMint.freezeAuthority : null,
        tlvData
    };
}
exports.unpackMint = unpackMint;
/** Get the minimum lamport balance for a mint to be rent exempt
 *
 * @param connection Connection to use
 * @param commitment Desired level of commitment for querying the state
 *
 * @return Amount of lamports required
 */ function getMinimumBalanceForRentExemptMint(connection, commitment) {
    return __awaiter(this, void 0, void 0, function*() {
        return yield getMinimumBalanceForRentExemptMintWithExtensions(connection, [], commitment);
    });
}
exports.getMinimumBalanceForRentExemptMint = getMinimumBalanceForRentExemptMint;
/** Get the minimum lamport balance for a rent-exempt mint with extensions
 *
 * @param connection Connection to use
 * @param extensions Extension types included in the mint
 * @param commitment Desired level of commitment for querying the state
 *
 * @return Amount of lamports required
 */ function getMinimumBalanceForRentExemptMintWithExtensions(connection, extensions, commitment) {
    return __awaiter(this, void 0, void 0, function*() {
        const mintLen = (0, extensionType_js_1.getMintLen)(extensions);
        return yield connection.getMinimumBalanceForRentExemption(mintLen, commitment);
    });
}
exports.getMinimumBalanceForRentExemptMintWithExtensions = getMinimumBalanceForRentExemptMintWithExtensions;
/**
 * Async version of getAssociatedTokenAddressSync
 * For backwards compatibility
 *
 * @param mint                     Token mint account
 * @param owner                    Owner of the new account
 * @param allowOwnerOffCurve       Allow the owner account to be a PDA (Program Derived Address)
 * @param programId                SPL Token program account
 * @param associatedTokenProgramId SPL Associated Token program account
 *
 * @return Promise containing the address of the associated token account
 */ function getAssociatedTokenAddress(mint, owner, allowOwnerOffCurve = false, programId = constants_js_1.TOKEN_PROGRAM_ID, associatedTokenProgramId = constants_js_1.ASSOCIATED_TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        if (!allowOwnerOffCurve && !web3_js_1.PublicKey.isOnCurve(owner.toBuffer())) throw new errors_js_1.TokenOwnerOffCurveError();
        const [address] = yield web3_js_1.PublicKey.findProgramAddress([
            owner.toBuffer(),
            programId.toBuffer(),
            mint.toBuffer()
        ], associatedTokenProgramId);
        return address;
    });
}
exports.getAssociatedTokenAddress = getAssociatedTokenAddress;
/**
 * Get the address of the associated token account for a given mint and owner
 *
 * @param mint                     Token mint account
 * @param owner                    Owner of the new account
 * @param allowOwnerOffCurve       Allow the owner account to be a PDA (Program Derived Address)
 * @param programId                SPL Token program account
 * @param associatedTokenProgramId SPL Associated Token program account
 *
 * @return Address of the associated token account
 */ function getAssociatedTokenAddressSync(mint, owner, allowOwnerOffCurve = false, programId = constants_js_1.TOKEN_PROGRAM_ID, associatedTokenProgramId = constants_js_1.ASSOCIATED_TOKEN_PROGRAM_ID) {
    if (!allowOwnerOffCurve && !web3_js_1.PublicKey.isOnCurve(owner.toBuffer())) throw new errors_js_1.TokenOwnerOffCurveError();
    const [address] = web3_js_1.PublicKey.findProgramAddressSync([
        owner.toBuffer(),
        programId.toBuffer(),
        mint.toBuffer()
    ], associatedTokenProgramId);
    return address;
}
exports.getAssociatedTokenAddressSync = getAssociatedTokenAddressSync; //# sourceMappingURL=mint.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/cpiGuard/instructions.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createDisableCpiGuardInstruction = exports.createEnableCpiGuardInstruction = exports.cpiGuardInstructionData = exports.CpiGuardInstruction = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/internal.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
var CpiGuardInstruction;
(function(CpiGuardInstruction) {
    CpiGuardInstruction[CpiGuardInstruction["Enable"] = 0] = "Enable";
    CpiGuardInstruction[CpiGuardInstruction["Disable"] = 1] = "Disable";
})(CpiGuardInstruction || (exports.CpiGuardInstruction = CpiGuardInstruction = {}));
/** TODO: docs */ exports.cpiGuardInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_1.u8)('cpiGuardInstruction')
]);
/**
 * Construct an EnableCpiGuard instruction
 *
 * @param account         Token account to update
 * @param authority       The account's owner/delegate
 * @param signers         The signer account(s)
 * @param programId       SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createEnableCpiGuardInstruction(account, authority, multiSigners = [], programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    return createCpiGuardInstruction(CpiGuardInstruction.Enable, account, authority, multiSigners, programId);
}
exports.createEnableCpiGuardInstruction = createEnableCpiGuardInstruction;
/**
 * Construct a DisableCpiGuard instruction
 *
 * @param account         Token account to update
 * @param authority       The account's owner/delegate
 * @param signers         The signer account(s)
 * @param programId       SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createDisableCpiGuardInstruction(account, authority, multiSigners = [], programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    return createCpiGuardInstruction(CpiGuardInstruction.Disable, account, authority, multiSigners, programId);
}
exports.createDisableCpiGuardInstruction = createDisableCpiGuardInstruction;
function createCpiGuardInstruction(cpiGuardInstruction, account, authority, multiSigners, programId) {
    if (!(0, constants_js_1.programSupportsExtensions)(programId)) {
        throw new errors_js_1.TokenUnsupportedInstructionError();
    }
    const keys = (0, internal_js_1.addSigners)([
        {
            pubkey: account,
            isSigner: false,
            isWritable: true
        }
    ], authority, multiSigners);
    const data = Buffer.alloc(exports.cpiGuardInstructionData.span);
    exports.cpiGuardInstructionData.encode({
        instruction: types_js_1.TokenInstruction.CpiGuardExtension,
        cpiGuardInstruction
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
} //# sourceMappingURL=instructions.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/cpiGuard/actions.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.disableCpiGuard = exports.enableCpiGuard = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/internal.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const instructions_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/cpiGuard/instructions.js [app-route] (ecmascript)");
/**
 * Enable CPI Guard on the given account
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction fees
 * @param account        Account to modify
 * @param owner          Owner of the account
 * @param multiSigners   Signing accounts if `owner` is a multisig
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function enableCpiGuard(connection, payer, account, owner, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [ownerPublicKey, signers] = (0, internal_js_1.getSigners)(owner, multiSigners);
        const transaction = new web3_js_1.Transaction().add((0, instructions_js_1.createEnableCpiGuardInstruction)(account, ownerPublicKey, signers, programId));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.enableCpiGuard = enableCpiGuard;
/**
 * Disable CPI Guard on the given account
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction fees
 * @param account        Account to modify
 * @param owner          Owner of the account
 * @param multiSigners   Signing accounts if `owner` is a multisig
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function disableCpiGuard(connection, payer, account, owner, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [ownerPublicKey, signers] = (0, internal_js_1.getSigners)(owner, multiSigners);
        const transaction = new web3_js_1.Transaction().add((0, instructions_js_1.createDisableCpiGuardInstruction)(account, ownerPublicKey, signers, programId));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.disableCpiGuard = disableCpiGuard; //# sourceMappingURL=actions.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/cpiGuard/state.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCpiGuard = exports.CPI_GUARD_SIZE = exports.CpiGuardLayout = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const extensionType_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/extensionType.js [app-route] (ecmascript)");
/** Buffer layout for de/serializing a CPI Guard extension */ exports.CpiGuardLayout = (0, buffer_layout_1.struct)([
    (0, buffer_layout_utils_1.bool)('lockCpi')
]);
exports.CPI_GUARD_SIZE = exports.CpiGuardLayout.span;
function getCpiGuard(account) {
    const extensionData = (0, extensionType_js_1.getExtensionData)(extensionType_js_1.ExtensionType.CpiGuard, account.tlvData);
    if (extensionData !== null) {
        return exports.CpiGuardLayout.decode(extensionData);
    } else {
        return null;
    }
}
exports.getCpiGuard = getCpiGuard; //# sourceMappingURL=state.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/cpiGuard/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/cpiGuard/actions.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/cpiGuard/instructions.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/cpiGuard/state.js [app-route] (ecmascript)"), exports); //# sourceMappingURL=index.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/defaultAccountState/instructions.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createUpdateDefaultAccountStateInstruction = exports.createInitializeDefaultAccountStateInstruction = exports.defaultAccountStateInstructionData = exports.DefaultAccountStateInstruction = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/internal.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
var DefaultAccountStateInstruction;
(function(DefaultAccountStateInstruction) {
    DefaultAccountStateInstruction[DefaultAccountStateInstruction["Initialize"] = 0] = "Initialize";
    DefaultAccountStateInstruction[DefaultAccountStateInstruction["Update"] = 1] = "Update";
})(DefaultAccountStateInstruction || (exports.DefaultAccountStateInstruction = DefaultAccountStateInstruction = {}));
/** TODO: docs */ exports.defaultAccountStateInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_1.u8)('defaultAccountStateInstruction'),
    (0, buffer_layout_1.u8)('accountState')
]);
/**
 * Construct an InitializeDefaultAccountState instruction
 *
 * @param mint         Mint to initialize
 * @param accountState Default account state to set on all new accounts
 * @param programId    SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createInitializeDefaultAccountStateInstruction(mint, accountState, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    if (!(0, constants_js_1.programSupportsExtensions)(programId)) {
        throw new errors_js_1.TokenUnsupportedInstructionError();
    }
    const keys = [
        {
            pubkey: mint,
            isSigner: false,
            isWritable: true
        }
    ];
    const data = Buffer.alloc(exports.defaultAccountStateInstructionData.span);
    exports.defaultAccountStateInstructionData.encode({
        instruction: types_js_1.TokenInstruction.DefaultAccountStateExtension,
        defaultAccountStateInstruction: DefaultAccountStateInstruction.Initialize,
        accountState
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createInitializeDefaultAccountStateInstruction = createInitializeDefaultAccountStateInstruction;
/**
 * Construct an UpdateDefaultAccountState instruction
 *
 * @param mint         Mint to update
 * @param accountState    Default account state to set on all accounts
 * @param freezeAuthority       The mint's freeze authority
 * @param signers         The signer account(s) for a multisig
 * @param programId       SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createUpdateDefaultAccountStateInstruction(mint, accountState, freezeAuthority, multiSigners = [], programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    if (!(0, constants_js_1.programSupportsExtensions)(programId)) {
        throw new errors_js_1.TokenUnsupportedInstructionError();
    }
    const keys = (0, internal_js_1.addSigners)([
        {
            pubkey: mint,
            isSigner: false,
            isWritable: true
        }
    ], freezeAuthority, multiSigners);
    const data = Buffer.alloc(exports.defaultAccountStateInstructionData.span);
    exports.defaultAccountStateInstructionData.encode({
        instruction: types_js_1.TokenInstruction.DefaultAccountStateExtension,
        defaultAccountStateInstruction: DefaultAccountStateInstruction.Update,
        accountState
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createUpdateDefaultAccountStateInstruction = createUpdateDefaultAccountStateInstruction; //# sourceMappingURL=instructions.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/defaultAccountState/actions.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateDefaultAccountState = exports.initializeDefaultAccountState = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/internal.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const instructions_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/defaultAccountState/instructions.js [app-route] (ecmascript)");
/**
 * Initialize a default account state on a mint
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction fees
 * @param mint        Mint to initialize with extension
 * @param state        Account state with which to initialize new accounts
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function initializeDefaultAccountState(connection, payer, mint, state, confirmOptions, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const transaction = new web3_js_1.Transaction().add((0, instructions_js_1.createInitializeDefaultAccountStateInstruction)(mint, state, programId));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer
        ], confirmOptions);
    });
}
exports.initializeDefaultAccountState = initializeDefaultAccountState;
/**
 * Update the default account state on a mint
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction fees
 * @param mint        Mint to modify
 * @param state        New account state to set on created accounts
 * @param freezeAuthority          Freeze authority of the mint
 * @param multiSigners   Signing accounts if `freezeAuthority` is a multisig
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function updateDefaultAccountState(connection, payer, mint, state, freezeAuthority, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [freezeAuthorityPublicKey, signers] = (0, internal_js_1.getSigners)(freezeAuthority, multiSigners);
        const transaction = new web3_js_1.Transaction().add((0, instructions_js_1.createUpdateDefaultAccountStateInstruction)(mint, state, freezeAuthorityPublicKey, signers, programId));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.updateDefaultAccountState = updateDefaultAccountState; //# sourceMappingURL=actions.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/defaultAccountState/state.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getDefaultAccountState = exports.DEFAULT_ACCOUNT_STATE_SIZE = exports.DefaultAccountStateLayout = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const extensionType_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/extensionType.js [app-route] (ecmascript)");
/** Buffer layout for de/serializing a transfer fee config extension */ exports.DefaultAccountStateLayout = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('state')
]);
exports.DEFAULT_ACCOUNT_STATE_SIZE = exports.DefaultAccountStateLayout.span;
function getDefaultAccountState(mint) {
    const extensionData = (0, extensionType_js_1.getExtensionData)(extensionType_js_1.ExtensionType.DefaultAccountState, mint.tlvData);
    if (extensionData !== null) {
        return exports.DefaultAccountStateLayout.decode(extensionData);
    } else {
        return null;
    }
}
exports.getDefaultAccountState = getDefaultAccountState; //# sourceMappingURL=state.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/defaultAccountState/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/defaultAccountState/actions.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/defaultAccountState/instructions.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/defaultAccountState/state.js [app-route] (ecmascript)"), exports); //# sourceMappingURL=index.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/immutableOwner.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getImmutableOwner = exports.IMMUTABLE_OWNER_SIZE = exports.ImmutableOwnerLayout = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const extensionType_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/extensionType.js [app-route] (ecmascript)");
/** Buffer layout for de/serializing an account */ exports.ImmutableOwnerLayout = (0, buffer_layout_1.struct)([]);
exports.IMMUTABLE_OWNER_SIZE = exports.ImmutableOwnerLayout.span;
function getImmutableOwner(account) {
    const extensionData = (0, extensionType_js_1.getExtensionData)(extensionType_js_1.ExtensionType.ImmutableOwner, account.tlvData);
    if (extensionData !== null) {
        return exports.ImmutableOwnerLayout.decode(extensionData);
    } else {
        return null;
    }
}
exports.getImmutableOwner = getImmutableOwner; //# sourceMappingURL=immutableOwner.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/interestBearingMint/state.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getInterestBearingMintConfigState = exports.INTEREST_BEARING_MINT_CONFIG_STATE_SIZE = exports.InterestBearingMintConfigStateLayout = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const extensionType_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/extensionType.js [app-route] (ecmascript)");
exports.InterestBearingMintConfigStateLayout = (0, buffer_layout_1.struct)([
    (0, buffer_layout_utils_1.publicKey)('rateAuthority'),
    (0, buffer_layout_1.ns64)('initializationTimestamp'),
    (0, buffer_layout_1.s16)('preUpdateAverageRate'),
    (0, buffer_layout_1.ns64)('lastUpdateTimestamp'),
    (0, buffer_layout_1.s16)('currentRate')
]);
exports.INTEREST_BEARING_MINT_CONFIG_STATE_SIZE = exports.InterestBearingMintConfigStateLayout.span;
function getInterestBearingMintConfigState(mint) {
    const extensionData = (0, extensionType_js_1.getExtensionData)(extensionType_js_1.ExtensionType.InterestBearingConfig, mint.tlvData);
    if (extensionData !== null) {
        return exports.InterestBearingMintConfigStateLayout.decode(extensionData);
    }
    return null;
}
exports.getInterestBearingMintConfigState = getInterestBearingMintConfigState; //# sourceMappingURL=state.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/memoTransfer/instructions.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createDisableRequiredMemoTransfersInstruction = exports.createEnableRequiredMemoTransfersInstruction = exports.memoTransferInstructionData = exports.MemoTransferInstruction = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/internal.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
var MemoTransferInstruction;
(function(MemoTransferInstruction) {
    MemoTransferInstruction[MemoTransferInstruction["Enable"] = 0] = "Enable";
    MemoTransferInstruction[MemoTransferInstruction["Disable"] = 1] = "Disable";
})(MemoTransferInstruction || (exports.MemoTransferInstruction = MemoTransferInstruction = {}));
/** TODO: docs */ exports.memoTransferInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_1.u8)('memoTransferInstruction')
]);
/**
 * Construct an EnableRequiredMemoTransfers instruction
 *
 * @param account         Token account to update
 * @param authority       The account's owner/delegate
 * @param signers         The signer account(s)
 * @param programId       SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createEnableRequiredMemoTransfersInstruction(account, authority, multiSigners = [], programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    return createMemoTransferInstruction(MemoTransferInstruction.Enable, account, authority, multiSigners, programId);
}
exports.createEnableRequiredMemoTransfersInstruction = createEnableRequiredMemoTransfersInstruction;
/**
 * Construct a DisableMemoTransfer instruction
 *
 * @param account         Token account to update
 * @param authority       The account's owner/delegate
 * @param signers         The signer account(s)
 * @param programId       SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createDisableRequiredMemoTransfersInstruction(account, authority, multiSigners = [], programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    return createMemoTransferInstruction(MemoTransferInstruction.Disable, account, authority, multiSigners, programId);
}
exports.createDisableRequiredMemoTransfersInstruction = createDisableRequiredMemoTransfersInstruction;
function createMemoTransferInstruction(memoTransferInstruction, account, authority, multiSigners, programId) {
    if (!(0, constants_js_1.programSupportsExtensions)(programId)) {
        throw new errors_js_1.TokenUnsupportedInstructionError();
    }
    const keys = (0, internal_js_1.addSigners)([
        {
            pubkey: account,
            isSigner: false,
            isWritable: true
        }
    ], authority, multiSigners);
    const data = Buffer.alloc(exports.memoTransferInstructionData.span);
    exports.memoTransferInstructionData.encode({
        instruction: types_js_1.TokenInstruction.MemoTransferExtension,
        memoTransferInstruction
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
} //# sourceMappingURL=instructions.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/memoTransfer/actions.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.disableRequiredMemoTransfers = exports.enableRequiredMemoTransfers = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/internal.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const instructions_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/memoTransfer/instructions.js [app-route] (ecmascript)");
/**
 * Enable memo transfers on the given account
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction fees
 * @param account        Account to modify
 * @param owner          Owner of the account
 * @param multiSigners   Signing accounts if `owner` is a multisig
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function enableRequiredMemoTransfers(connection, payer, account, owner, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [ownerPublicKey, signers] = (0, internal_js_1.getSigners)(owner, multiSigners);
        const transaction = new web3_js_1.Transaction().add((0, instructions_js_1.createEnableRequiredMemoTransfersInstruction)(account, ownerPublicKey, signers, programId));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.enableRequiredMemoTransfers = enableRequiredMemoTransfers;
/**
 * Disable memo transfers on the given account
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction fees
 * @param account        Account to modify
 * @param owner          Owner of the account
 * @param multiSigners   Signing accounts if `owner` is a multisig
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function disableRequiredMemoTransfers(connection, payer, account, owner, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [ownerPublicKey, signers] = (0, internal_js_1.getSigners)(owner, multiSigners);
        const transaction = new web3_js_1.Transaction().add((0, instructions_js_1.createDisableRequiredMemoTransfersInstruction)(account, ownerPublicKey, signers, programId));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.disableRequiredMemoTransfers = disableRequiredMemoTransfers; //# sourceMappingURL=actions.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/memoTransfer/state.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMemoTransfer = exports.MEMO_TRANSFER_SIZE = exports.MemoTransferLayout = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const extensionType_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/extensionType.js [app-route] (ecmascript)");
/** Buffer layout for de/serializing a memo transfer extension */ exports.MemoTransferLayout = (0, buffer_layout_1.struct)([
    (0, buffer_layout_utils_1.bool)('requireIncomingTransferMemos')
]);
exports.MEMO_TRANSFER_SIZE = exports.MemoTransferLayout.span;
function getMemoTransfer(account) {
    const extensionData = (0, extensionType_js_1.getExtensionData)(extensionType_js_1.ExtensionType.MemoTransfer, account.tlvData);
    if (extensionData !== null) {
        return exports.MemoTransferLayout.decode(extensionData);
    } else {
        return null;
    }
}
exports.getMemoTransfer = getMemoTransfer; //# sourceMappingURL=state.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/memoTransfer/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/memoTransfer/actions.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/memoTransfer/instructions.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/memoTransfer/state.js [app-route] (ecmascript)"), exports); //# sourceMappingURL=index.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/metadataPointer/state.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMetadataPointerState = exports.METADATA_POINTER_SIZE = exports.MetadataPointerLayout = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const extensionType_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/extensionType.js [app-route] (ecmascript)");
/** Buffer layout for de/serializing a Metadata Pointer extension */ exports.MetadataPointerLayout = (0, buffer_layout_1.struct)([
    (0, buffer_layout_utils_1.publicKey)('authority'),
    (0, buffer_layout_utils_1.publicKey)('metadataAddress')
]);
exports.METADATA_POINTER_SIZE = exports.MetadataPointerLayout.span;
function getMetadataPointerState(mint) {
    const extensionData = (0, extensionType_js_1.getExtensionData)(extensionType_js_1.ExtensionType.MetadataPointer, mint.tlvData);
    if (extensionData !== null) {
        const { authority, metadataAddress } = exports.MetadataPointerLayout.decode(extensionData);
        // Explicity set None/Zero keys to null
        return {
            authority: authority.equals(web3_js_1.PublicKey.default) ? null : authority,
            metadataAddress: metadataAddress.equals(web3_js_1.PublicKey.default) ? null : metadataAddress
        };
    } else {
        return null;
    }
}
exports.getMetadataPointerState = getMetadataPointerState; //# sourceMappingURL=state.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/mintCloseAuthority.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMintCloseAuthority = exports.MINT_CLOSE_AUTHORITY_SIZE = exports.MintCloseAuthorityLayout = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const extensionType_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/extensionType.js [app-route] (ecmascript)");
/** Buffer layout for de/serializing a mint */ exports.MintCloseAuthorityLayout = (0, buffer_layout_1.struct)([
    (0, buffer_layout_utils_1.publicKey)('closeAuthority')
]);
exports.MINT_CLOSE_AUTHORITY_SIZE = exports.MintCloseAuthorityLayout.span;
function getMintCloseAuthority(mint) {
    const extensionData = (0, extensionType_js_1.getExtensionData)(extensionType_js_1.ExtensionType.MintCloseAuthority, mint.tlvData);
    if (extensionData !== null) {
        return exports.MintCloseAuthorityLayout.decode(extensionData);
    } else {
        return null;
    }
}
exports.getMintCloseAuthority = getMintCloseAuthority; //# sourceMappingURL=mintCloseAuthority.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/nonTransferable.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getNonTransferableAccount = exports.getNonTransferable = exports.NON_TRANSFERABLE_ACCOUNT_SIZE = exports.NON_TRANSFERABLE_SIZE = exports.NonTransferableLayout = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const extensionType_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/extensionType.js [app-route] (ecmascript)");
/** Buffer layout for de/serializing an account */ exports.NonTransferableLayout = (0, buffer_layout_1.struct)([]);
exports.NON_TRANSFERABLE_SIZE = exports.NonTransferableLayout.span;
exports.NON_TRANSFERABLE_ACCOUNT_SIZE = exports.NonTransferableLayout.span;
function getNonTransferable(mint) {
    const extensionData = (0, extensionType_js_1.getExtensionData)(extensionType_js_1.ExtensionType.NonTransferable, mint.tlvData);
    if (extensionData !== null) {
        return exports.NonTransferableLayout.decode(extensionData);
    } else {
        return null;
    }
}
exports.getNonTransferable = getNonTransferable;
function getNonTransferableAccount(account) {
    const extensionData = (0, extensionType_js_1.getExtensionData)(extensionType_js_1.ExtensionType.NonTransferableAccount, account.tlvData);
    if (extensionData !== null) {
        return exports.NonTransferableLayout.decode(extensionData);
    } else {
        return null;
    }
}
exports.getNonTransferableAccount = getNonTransferableAccount; //# sourceMappingURL=nonTransferable.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/permanentDelegate.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPermanentDelegate = exports.PERMANENT_DELEGATE_SIZE = exports.PermanentDelegateLayout = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const extensionType_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/extensionType.js [app-route] (ecmascript)");
/** Buffer layout for de/serializing a mint */ exports.PermanentDelegateLayout = (0, buffer_layout_1.struct)([
    (0, buffer_layout_utils_1.publicKey)('delegate')
]);
exports.PERMANENT_DELEGATE_SIZE = exports.PermanentDelegateLayout.span;
function getPermanentDelegate(mint) {
    const extensionData = (0, extensionType_js_1.getExtensionData)(extensionType_js_1.ExtensionType.PermanentDelegate, mint.tlvData);
    if (extensionData !== null) {
        return exports.PermanentDelegateLayout.decode(extensionData);
    } else {
        return null;
    }
}
exports.getPermanentDelegate = getPermanentDelegate; //# sourceMappingURL=permanentDelegate.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/transferFee/instructions.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeHarvestWithheldTokensToMintInstructionUnchecked = exports.decodeHarvestWithheldTokensToMintInstruction = exports.createHarvestWithheldTokensToMintInstruction = exports.harvestWithheldTokensToMintInstructionData = exports.decodeWithdrawWithheldTokensFromAccountsInstructionUnchecked = exports.decodeWithdrawWithheldTokensFromAccountsInstruction = exports.createWithdrawWithheldTokensFromAccountsInstruction = exports.withdrawWithheldTokensFromAccountsInstructionData = exports.decodeWithdrawWithheldTokensFromMintInstructionUnchecked = exports.decodeWithdrawWithheldTokensFromMintInstruction = exports.createWithdrawWithheldTokensFromMintInstruction = exports.withdrawWithheldTokensFromMintInstructionData = exports.decodeTransferCheckedWithFeeInstructionUnchecked = exports.decodeTransferCheckedWithFeeInstruction = exports.createTransferCheckedWithFeeInstruction = exports.transferCheckedWithFeeInstructionData = exports.decodeInitializeTransferFeeConfigInstructionUnchecked = exports.decodeInitializeTransferFeeConfigInstruction = exports.createInitializeTransferFeeConfigInstruction = exports.initializeTransferFeeConfigInstructionData = exports.TransferFeeInstruction = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/internal.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
var TransferFeeInstruction;
(function(TransferFeeInstruction) {
    TransferFeeInstruction[TransferFeeInstruction["InitializeTransferFeeConfig"] = 0] = "InitializeTransferFeeConfig";
    TransferFeeInstruction[TransferFeeInstruction["TransferCheckedWithFee"] = 1] = "TransferCheckedWithFee";
    TransferFeeInstruction[TransferFeeInstruction["WithdrawWithheldTokensFromMint"] = 2] = "WithdrawWithheldTokensFromMint";
    TransferFeeInstruction[TransferFeeInstruction["WithdrawWithheldTokensFromAccounts"] = 3] = "WithdrawWithheldTokensFromAccounts";
    TransferFeeInstruction[TransferFeeInstruction["HarvestWithheldTokensToMint"] = 4] = "HarvestWithheldTokensToMint";
    TransferFeeInstruction[TransferFeeInstruction["SetTransferFee"] = 5] = "SetTransferFee";
})(TransferFeeInstruction || (exports.TransferFeeInstruction = TransferFeeInstruction = {}));
/** TODO: docs */ exports.initializeTransferFeeConfigInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_1.u8)('transferFeeInstruction'),
    (0, buffer_layout_1.u8)('transferFeeConfigAuthorityOption'),
    (0, buffer_layout_utils_1.publicKey)('transferFeeConfigAuthority'),
    (0, buffer_layout_1.u8)('withdrawWithheldAuthorityOption'),
    (0, buffer_layout_utils_1.publicKey)('withdrawWithheldAuthority'),
    (0, buffer_layout_1.u16)('transferFeeBasisPoints'),
    (0, buffer_layout_utils_1.u64)('maximumFee')
]);
/**
 * Construct an InitializeTransferFeeConfig instruction
 *
 * @param mint            Token mint account
 * @param transferFeeConfigAuthority  Optional authority that can update the fees
 * @param withdrawWithheldAuthority Optional authority that can withdraw fees
 * @param transferFeeBasisPoints Amount of transfer collected as fees, expressed as basis points of the transfer amount
 * @param maximumFee        Maximum fee assessed on transfers
 * @param programId       SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createInitializeTransferFeeConfigInstruction(mint, transferFeeConfigAuthority, withdrawWithheldAuthority, transferFeeBasisPoints, maximumFee, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    if (!(0, constants_js_1.programSupportsExtensions)(programId)) {
        throw new errors_js_1.TokenUnsupportedInstructionError();
    }
    const keys = [
        {
            pubkey: mint,
            isSigner: false,
            isWritable: true
        }
    ];
    const data = Buffer.alloc(exports.initializeTransferFeeConfigInstructionData.span);
    exports.initializeTransferFeeConfigInstructionData.encode({
        instruction: types_js_1.TokenInstruction.TransferFeeExtension,
        transferFeeInstruction: TransferFeeInstruction.InitializeTransferFeeConfig,
        transferFeeConfigAuthorityOption: transferFeeConfigAuthority ? 1 : 0,
        transferFeeConfigAuthority: transferFeeConfigAuthority || new web3_js_1.PublicKey(0),
        withdrawWithheldAuthorityOption: withdrawWithheldAuthority ? 1 : 0,
        withdrawWithheldAuthority: withdrawWithheldAuthority || new web3_js_1.PublicKey(0),
        transferFeeBasisPoints: transferFeeBasisPoints,
        maximumFee: maximumFee
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createInitializeTransferFeeConfigInstruction = createInitializeTransferFeeConfigInstruction;
/**
 * Decode an InitializeTransferFeeConfig instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeInitializeTransferFeeConfigInstruction(instruction, programId) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.initializeTransferFeeConfigInstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { mint }, data } = decodeInitializeTransferFeeConfigInstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.TransferFeeExtension || data.transferFeeInstruction !== TransferFeeInstruction.InitializeTransferFeeConfig) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!mint) throw new errors_js_1.TokenInvalidInstructionKeysError();
    return {
        programId,
        keys: {
            mint
        },
        data
    };
}
exports.decodeInitializeTransferFeeConfigInstruction = decodeInitializeTransferFeeConfigInstruction;
/**
 * Decode an InitializeTransferFeeConfig instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeInitializeTransferFeeConfigInstructionUnchecked({ programId, keys: [mint], data }) {
    const { instruction, transferFeeInstruction, transferFeeConfigAuthorityOption, transferFeeConfigAuthority, withdrawWithheldAuthorityOption, withdrawWithheldAuthority, transferFeeBasisPoints, maximumFee } = exports.initializeTransferFeeConfigInstructionData.decode(data);
    return {
        programId,
        keys: {
            mint
        },
        data: {
            instruction,
            transferFeeInstruction,
            transferFeeConfigAuthority: transferFeeConfigAuthorityOption ? transferFeeConfigAuthority : null,
            withdrawWithheldAuthority: withdrawWithheldAuthorityOption ? withdrawWithheldAuthority : null,
            transferFeeBasisPoints,
            maximumFee
        }
    };
}
exports.decodeInitializeTransferFeeConfigInstructionUnchecked = decodeInitializeTransferFeeConfigInstructionUnchecked;
exports.transferCheckedWithFeeInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_1.u8)('transferFeeInstruction'),
    (0, buffer_layout_utils_1.u64)('amount'),
    (0, buffer_layout_1.u8)('decimals'),
    (0, buffer_layout_utils_1.u64)('fee')
]);
/**
 * Construct an TransferCheckedWithFee instruction
 *
 * @param source          The source account
 * @param mint            The token mint
 * @param destination     The destination account
 * @param authority       The source account's owner/delegate
 * @param signers         The signer account(s)
 * @param amount          The amount of tokens to transfer
 * @param decimals        The expected number of base 10 digits to the right of the decimal place
 * @param fee             The expected fee assesed on this transfer, calculated off-chain based on the transferFeeBasisPoints and maximumFee of the mint.
 * @param programId       SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createTransferCheckedWithFeeInstruction(source, mint, destination, authority, amount, decimals, fee, multiSigners = [], programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    if (!(0, constants_js_1.programSupportsExtensions)(programId)) {
        throw new errors_js_1.TokenUnsupportedInstructionError();
    }
    const data = Buffer.alloc(exports.transferCheckedWithFeeInstructionData.span);
    exports.transferCheckedWithFeeInstructionData.encode({
        instruction: types_js_1.TokenInstruction.TransferFeeExtension,
        transferFeeInstruction: TransferFeeInstruction.TransferCheckedWithFee,
        amount,
        decimals,
        fee
    }, data);
    const keys = (0, internal_js_1.addSigners)([
        {
            pubkey: source,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: mint,
            isSigner: false,
            isWritable: false
        },
        {
            pubkey: destination,
            isSigner: false,
            isWritable: true
        }
    ], authority, multiSigners);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createTransferCheckedWithFeeInstruction = createTransferCheckedWithFeeInstruction;
/**
 * Decode a TransferCheckedWithFee instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeTransferCheckedWithFeeInstruction(instruction, programId) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.transferCheckedWithFeeInstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { source, mint, destination, authority, signers }, data } = decodeTransferCheckedWithFeeInstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.TransferFeeExtension || data.transferFeeInstruction !== TransferFeeInstruction.TransferCheckedWithFee) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!mint) throw new errors_js_1.TokenInvalidInstructionKeysError();
    return {
        programId,
        keys: {
            source,
            mint,
            destination,
            authority,
            signers: signers ? signers : null
        },
        data
    };
}
exports.decodeTransferCheckedWithFeeInstruction = decodeTransferCheckedWithFeeInstruction;
/**
 * Decode a TransferCheckedWithFees instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeTransferCheckedWithFeeInstructionUnchecked({ programId, keys: [source, mint, destination, authority, ...signers], data }) {
    const { instruction, transferFeeInstruction, amount, decimals, fee } = exports.transferCheckedWithFeeInstructionData.decode(data);
    return {
        programId,
        keys: {
            source,
            mint,
            destination,
            authority,
            signers
        },
        data: {
            instruction,
            transferFeeInstruction,
            amount,
            decimals,
            fee
        }
    };
}
exports.decodeTransferCheckedWithFeeInstructionUnchecked = decodeTransferCheckedWithFeeInstructionUnchecked;
exports.withdrawWithheldTokensFromMintInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_1.u8)('transferFeeInstruction')
]);
/**
 * Construct a WithdrawWithheldTokensFromMint instruction
 *
 * @param mint              The token mint
 * @param destination       The destination account
 * @param authority         The source account's owner/delegate
 * @param signers           The signer account(s)
 * @param programID         SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createWithdrawWithheldTokensFromMintInstruction(mint, destination, authority, signers = [], programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    if (!(0, constants_js_1.programSupportsExtensions)(programId)) {
        throw new errors_js_1.TokenUnsupportedInstructionError();
    }
    const data = Buffer.alloc(exports.withdrawWithheldTokensFromMintInstructionData.span);
    exports.withdrawWithheldTokensFromMintInstructionData.encode({
        instruction: types_js_1.TokenInstruction.TransferFeeExtension,
        transferFeeInstruction: TransferFeeInstruction.WithdrawWithheldTokensFromMint
    }, data);
    const keys = (0, internal_js_1.addSigners)([
        {
            pubkey: mint,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: destination,
            isSigner: false,
            isWritable: true
        }
    ], authority, signers);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createWithdrawWithheldTokensFromMintInstruction = createWithdrawWithheldTokensFromMintInstruction;
/**
 * Decode a WithdrawWithheldTokensFromMint instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeWithdrawWithheldTokensFromMintInstruction(instruction, programId) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.withdrawWithheldTokensFromMintInstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { mint, destination, authority, signers }, data } = decodeWithdrawWithheldTokensFromMintInstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.TransferFeeExtension || data.transferFeeInstruction !== TransferFeeInstruction.WithdrawWithheldTokensFromMint) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!mint) throw new errors_js_1.TokenInvalidInstructionKeysError();
    return {
        programId,
        keys: {
            mint,
            destination,
            authority,
            signers: signers ? signers : null
        },
        data
    };
}
exports.decodeWithdrawWithheldTokensFromMintInstruction = decodeWithdrawWithheldTokensFromMintInstruction;
/**
 * Decode a WithdrawWithheldTokensFromMint instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeWithdrawWithheldTokensFromMintInstructionUnchecked({ programId, keys: [mint, destination, authority, ...signers], data }) {
    const { instruction, transferFeeInstruction } = exports.withdrawWithheldTokensFromMintInstructionData.decode(data);
    return {
        programId,
        keys: {
            mint,
            destination,
            authority,
            signers
        },
        data: {
            instruction,
            transferFeeInstruction
        }
    };
}
exports.decodeWithdrawWithheldTokensFromMintInstructionUnchecked = decodeWithdrawWithheldTokensFromMintInstructionUnchecked;
exports.withdrawWithheldTokensFromAccountsInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_1.u8)('transferFeeInstruction'),
    (0, buffer_layout_1.u8)('numTokenAccounts')
]);
/**
 * Construct a WithdrawWithheldTokensFromAccounts instruction
 *
 * @param mint              The token mint
 * @param destination       The destination account
 * @param authority         The source account's owner/delegate
 * @param signers           The signer account(s)
 * @param sources           The source accounts to withdraw from
 * @param programID         SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createWithdrawWithheldTokensFromAccountsInstruction(mint, destination, authority, signers, sources, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    if (!(0, constants_js_1.programSupportsExtensions)(programId)) {
        throw new errors_js_1.TokenUnsupportedInstructionError();
    }
    const data = Buffer.alloc(exports.withdrawWithheldTokensFromAccountsInstructionData.span);
    exports.withdrawWithheldTokensFromAccountsInstructionData.encode({
        instruction: types_js_1.TokenInstruction.TransferFeeExtension,
        transferFeeInstruction: TransferFeeInstruction.WithdrawWithheldTokensFromAccounts,
        numTokenAccounts: sources.length
    }, data);
    const keys = (0, internal_js_1.addSigners)([
        {
            pubkey: mint,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: destination,
            isSigner: false,
            isWritable: true
        }
    ], authority, signers);
    for (const source of sources){
        keys.push({
            pubkey: source,
            isSigner: false,
            isWritable: true
        });
    }
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createWithdrawWithheldTokensFromAccountsInstruction = createWithdrawWithheldTokensFromAccountsInstruction;
/**
 * Decode a WithdrawWithheldTokensFromAccounts instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeWithdrawWithheldTokensFromAccountsInstruction(instruction, programId) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.withdrawWithheldTokensFromAccountsInstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { mint, destination, authority, signers, sources }, data } = decodeWithdrawWithheldTokensFromAccountsInstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.TransferFeeExtension || data.transferFeeInstruction !== TransferFeeInstruction.WithdrawWithheldTokensFromAccounts) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!mint) throw new errors_js_1.TokenInvalidInstructionKeysError();
    return {
        programId,
        keys: {
            mint,
            destination,
            authority,
            signers: signers ? signers : null,
            sources: sources ? sources : null
        },
        data
    };
}
exports.decodeWithdrawWithheldTokensFromAccountsInstruction = decodeWithdrawWithheldTokensFromAccountsInstruction;
/**
 * Decode a WithdrawWithheldTokensFromAccount instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeWithdrawWithheldTokensFromAccountsInstructionUnchecked({ programId, keys, data }) {
    const { instruction, transferFeeInstruction, numTokenAccounts } = exports.withdrawWithheldTokensFromAccountsInstructionData.decode(data);
    const [mint, destination, authority, signers, sources] = [
        keys[0],
        keys[1],
        keys[2],
        keys.slice(3, 3 + numTokenAccounts),
        keys.slice(-1 * numTokenAccounts)
    ];
    return {
        programId,
        keys: {
            mint,
            destination,
            authority,
            signers,
            sources
        },
        data: {
            instruction,
            transferFeeInstruction,
            numTokenAccounts
        }
    };
}
exports.decodeWithdrawWithheldTokensFromAccountsInstructionUnchecked = decodeWithdrawWithheldTokensFromAccountsInstructionUnchecked;
exports.harvestWithheldTokensToMintInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_1.u8)('transferFeeInstruction')
]);
/**
 * Construct a HarvestWithheldTokensToMint instruction
 *
 * @param mint              The token mint
 * @param sources           The source accounts to withdraw from
 * @param programID         SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createHarvestWithheldTokensToMintInstruction(mint, sources, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    if (!(0, constants_js_1.programSupportsExtensions)(programId)) {
        throw new errors_js_1.TokenUnsupportedInstructionError();
    }
    const data = Buffer.alloc(exports.harvestWithheldTokensToMintInstructionData.span);
    exports.harvestWithheldTokensToMintInstructionData.encode({
        instruction: types_js_1.TokenInstruction.TransferFeeExtension,
        transferFeeInstruction: TransferFeeInstruction.HarvestWithheldTokensToMint
    }, data);
    const keys = [];
    keys.push({
        pubkey: mint,
        isSigner: false,
        isWritable: true
    });
    for (const source of sources){
        keys.push({
            pubkey: source,
            isSigner: false,
            isWritable: true
        });
    }
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createHarvestWithheldTokensToMintInstruction = createHarvestWithheldTokensToMintInstruction;
/**
 * Decode a HarvestWithheldTokensToMint instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeHarvestWithheldTokensToMintInstruction(instruction, programId) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.harvestWithheldTokensToMintInstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { mint, sources }, data } = decodeHarvestWithheldTokensToMintInstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.TransferFeeExtension || data.transferFeeInstruction !== TransferFeeInstruction.HarvestWithheldTokensToMint) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!mint) throw new errors_js_1.TokenInvalidInstructionKeysError();
    return {
        programId,
        keys: {
            mint,
            sources
        },
        data
    };
}
exports.decodeHarvestWithheldTokensToMintInstruction = decodeHarvestWithheldTokensToMintInstruction;
/**
 * Decode a HarvestWithheldTokensToMint instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeHarvestWithheldTokensToMintInstructionUnchecked({ programId, keys: [mint, ...sources], data }) {
    const { instruction, transferFeeInstruction } = exports.harvestWithheldTokensToMintInstructionData.decode(data);
    return {
        programId,
        keys: {
            mint,
            sources
        },
        data: {
            instruction,
            transferFeeInstruction
        }
    };
}
exports.decodeHarvestWithheldTokensToMintInstructionUnchecked = decodeHarvestWithheldTokensToMintInstructionUnchecked; //# sourceMappingURL=instructions.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/transferFee/actions.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.harvestWithheldTokensToMint = exports.withdrawWithheldTokensFromAccounts = exports.withdrawWithheldTokensFromMint = exports.transferCheckedWithFee = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/internal.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const instructions_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/transferFee/instructions.js [app-route] (ecmascript)");
/**
 * Transfer tokens from one account to another, asserting the transfer fee, token mint, and decimals
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction fees
 * @param source         Source account
 * @param mint           Mint for the account
 * @param destination    Destination account
 * @param owner          Owner of the source account
 * @param amount         Number of tokens to transfer
 * @param decimals       Number of decimals in transfer amount
 * @param multiSigners   Signing accounts if `owner` is a multisig
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function transferCheckedWithFee(connection, payer, source, mint, destination, owner, amount, decimals, fee, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [ownerPublicKey, signers] = (0, internal_js_1.getSigners)(owner, multiSigners);
        const transaction = new web3_js_1.Transaction().add((0, instructions_js_1.createTransferCheckedWithFeeInstruction)(source, mint, destination, ownerPublicKey, amount, decimals, fee, multiSigners, programId));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.transferCheckedWithFee = transferCheckedWithFee;
/**
 * Withdraw withheld tokens from mint
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction fees
 * @param mint           The token mint
 * @param destination    The destination account
 * @param authority      The mint's withdraw withheld tokens authority
 * @param multiSigners   Signing accounts if `owner` is a multisig
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function withdrawWithheldTokensFromMint(connection, payer, mint, destination, authority, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [authorityPublicKey, signers] = (0, internal_js_1.getSigners)(authority, multiSigners);
        const transaction = new web3_js_1.Transaction().add((0, instructions_js_1.createWithdrawWithheldTokensFromMintInstruction)(mint, destination, authorityPublicKey, signers, programId));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.withdrawWithheldTokensFromMint = withdrawWithheldTokensFromMint;
/**
 * Withdraw withheld tokens from accounts
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction fees
 * @param mint           The token mint
 * @param destination    The destination account
 * @param authority      The mint's withdraw withheld tokens authority
 * @param multiSigners   Signing accounts if `owner` is a multisig
 * @param sources        Source accounts from which to withdraw withheld fees
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function withdrawWithheldTokensFromAccounts(connection, payer, mint, destination, authority, multiSigners, sources, confirmOptions, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [authorityPublicKey, signers] = (0, internal_js_1.getSigners)(authority, multiSigners);
        const transaction = new web3_js_1.Transaction().add((0, instructions_js_1.createWithdrawWithheldTokensFromAccountsInstruction)(mint, destination, authorityPublicKey, signers, sources, programId));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.withdrawWithheldTokensFromAccounts = withdrawWithheldTokensFromAccounts;
/**
 * Harvest withheld tokens from accounts to the mint
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction fees
 * @param mint           The token mint
 * @param sources        Source accounts from which to withdraw withheld fees
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function harvestWithheldTokensToMint(connection, payer, mint, sources, confirmOptions, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const transaction = new web3_js_1.Transaction().add((0, instructions_js_1.createHarvestWithheldTokensToMintInstruction)(mint, sources, programId));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer
        ], confirmOptions);
    });
}
exports.harvestWithheldTokensToMint = harvestWithheldTokensToMint; //# sourceMappingURL=actions.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/transferFee/state.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getTransferFeeAmount = exports.getTransferFeeConfig = exports.TRANSFER_FEE_AMOUNT_SIZE = exports.TransferFeeAmountLayout = exports.calculateEpochFee = exports.getEpochFee = exports.TRANSFER_FEE_CONFIG_SIZE = exports.TransferFeeConfigLayout = exports.calculateFee = exports.transferFeeLayout = exports.ONE_IN_BASIS_POINTS = exports.MAX_FEE_BASIS_POINTS = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const extensionType_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/extensionType.js [app-route] (ecmascript)");
exports.MAX_FEE_BASIS_POINTS = 10000;
exports.ONE_IN_BASIS_POINTS = BigInt(exports.MAX_FEE_BASIS_POINTS);
/** Buffer layout for de/serializing a transfer fee */ function transferFeeLayout(property) {
    return (0, buffer_layout_1.struct)([
        (0, buffer_layout_utils_1.u64)('epoch'),
        (0, buffer_layout_utils_1.u64)('maximumFee'),
        (0, buffer_layout_1.u16)('transferFeeBasisPoints')
    ], property);
}
exports.transferFeeLayout = transferFeeLayout;
/** Calculate the transfer fee */ function calculateFee(transferFee, preFeeAmount) {
    const transferFeeBasisPoints = transferFee.transferFeeBasisPoints;
    if (transferFeeBasisPoints === 0 || preFeeAmount === BigInt(0)) {
        return BigInt(0);
    } else {
        const numerator = preFeeAmount * BigInt(transferFeeBasisPoints);
        const rawFee = (numerator + exports.ONE_IN_BASIS_POINTS - BigInt(1)) / exports.ONE_IN_BASIS_POINTS;
        const fee = rawFee > transferFee.maximumFee ? transferFee.maximumFee : rawFee;
        return BigInt(fee);
    }
}
exports.calculateFee = calculateFee;
/** Buffer layout for de/serializing a transfer fee config extension */ exports.TransferFeeConfigLayout = (0, buffer_layout_1.struct)([
    (0, buffer_layout_utils_1.publicKey)('transferFeeConfigAuthority'),
    (0, buffer_layout_utils_1.publicKey)('withdrawWithheldAuthority'),
    (0, buffer_layout_utils_1.u64)('withheldAmount'),
    transferFeeLayout('olderTransferFee'),
    transferFeeLayout('newerTransferFee')
]);
exports.TRANSFER_FEE_CONFIG_SIZE = exports.TransferFeeConfigLayout.span;
/** Get the fee for given epoch */ function getEpochFee(transferFeeConfig, epoch) {
    if (epoch >= transferFeeConfig.newerTransferFee.epoch) {
        return transferFeeConfig.newerTransferFee;
    } else {
        return transferFeeConfig.olderTransferFee;
    }
}
exports.getEpochFee = getEpochFee;
/** Calculate the fee for the given epoch and input amount */ function calculateEpochFee(transferFeeConfig, epoch, preFeeAmount) {
    const transferFee = getEpochFee(transferFeeConfig, epoch);
    return calculateFee(transferFee, preFeeAmount);
}
exports.calculateEpochFee = calculateEpochFee;
/** Buffer layout for de/serializing */ exports.TransferFeeAmountLayout = (0, buffer_layout_1.struct)([
    (0, buffer_layout_utils_1.u64)('withheldAmount')
]);
exports.TRANSFER_FEE_AMOUNT_SIZE = exports.TransferFeeAmountLayout.span;
function getTransferFeeConfig(mint) {
    const extensionData = (0, extensionType_js_1.getExtensionData)(extensionType_js_1.ExtensionType.TransferFeeConfig, mint.tlvData);
    if (extensionData !== null) {
        return exports.TransferFeeConfigLayout.decode(extensionData);
    } else {
        return null;
    }
}
exports.getTransferFeeConfig = getTransferFeeConfig;
function getTransferFeeAmount(account) {
    const extensionData = (0, extensionType_js_1.getExtensionData)(extensionType_js_1.ExtensionType.TransferFeeAmount, account.tlvData);
    if (extensionData !== null) {
        return exports.TransferFeeAmountLayout.decode(extensionData);
    } else {
        return null;
    }
}
exports.getTransferFeeAmount = getTransferFeeAmount; //# sourceMappingURL=state.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/transferFee/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/transferFee/actions.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/transferFee/instructions.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/transferFee/state.js [app-route] (ecmascript)"), exports); //# sourceMappingURL=index.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/transferChecked.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeTransferCheckedInstructionUnchecked = exports.decodeTransferCheckedInstruction = exports.createTransferCheckedInstruction = exports.transferCheckedInstructionData = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/internal.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
/** TODO: docs */ exports.transferCheckedInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_utils_1.u64)('amount'),
    (0, buffer_layout_1.u8)('decimals')
]);
/**
 * Construct a TransferChecked instruction
 *
 * @param source       Source account
 * @param mint         Mint account
 * @param destination  Destination account
 * @param owner        Owner of the source account
 * @param amount       Number of tokens to transfer
 * @param decimals     Number of decimals in transfer amount
 * @param multiSigners Signing accounts if `owner` is a multisig
 * @param programId    SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createTransferCheckedInstruction(source, mint, destination, owner, amount, decimals, multiSigners = [], programId = constants_js_1.TOKEN_PROGRAM_ID) {
    const keys = (0, internal_js_1.addSigners)([
        {
            pubkey: source,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: mint,
            isSigner: false,
            isWritable: false
        },
        {
            pubkey: destination,
            isSigner: false,
            isWritable: true
        }
    ], owner, multiSigners);
    const data = Buffer.alloc(exports.transferCheckedInstructionData.span);
    exports.transferCheckedInstructionData.encode({
        instruction: types_js_1.TokenInstruction.TransferChecked,
        amount: BigInt(amount),
        decimals
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createTransferCheckedInstruction = createTransferCheckedInstruction;
/**
 * Decode a TransferChecked instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeTransferCheckedInstruction(instruction, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.transferCheckedInstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { source, mint, destination, owner, multiSigners }, data } = decodeTransferCheckedInstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.TransferChecked) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!source || !mint || !destination || !owner) throw new errors_js_1.TokenInvalidInstructionKeysError();
    // TODO: key checks?
    return {
        programId,
        keys: {
            source,
            mint,
            destination,
            owner,
            multiSigners
        },
        data
    };
}
exports.decodeTransferCheckedInstruction = decodeTransferCheckedInstruction;
/**
 * Decode a TransferChecked instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeTransferCheckedInstructionUnchecked({ programId, keys: [source, mint, destination, owner, ...multiSigners], data }) {
    return {
        programId,
        keys: {
            source,
            mint,
            destination,
            owner,
            multiSigners
        },
        data: exports.transferCheckedInstructionData.decode(data)
    };
}
exports.decodeTransferCheckedInstructionUnchecked = decodeTransferCheckedInstructionUnchecked; //# sourceMappingURL=transferChecked.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/transferHook/seeds.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.unpackSeeds = void 0;
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const DISCRIMINATOR_SPAN = 1;
const LITERAL_LENGTH_SPAN = 1;
const INSTRUCTION_ARG_OFFSET_SPAN = 1;
const INSTRUCTION_ARG_LENGTH_SPAN = 1;
const ACCOUNT_KEY_INDEX_SPAN = 1;
const ACCOUNT_DATA_ACCOUNT_INDEX_SPAN = 1;
const ACCOUNT_DATA_OFFSET_SPAN = 1;
const ACCOUNT_DATA_LENGTH_SPAN = 1;
function unpackSeedLiteral(seeds) {
    if (seeds.length < 1) {
        throw new errors_js_1.TokenTransferHookInvalidSeed();
    }
    const [length, ...rest] = seeds;
    if (rest.length < length) {
        throw new errors_js_1.TokenTransferHookInvalidSeed();
    }
    return {
        data: Buffer.from(rest.slice(0, length)),
        packedLength: DISCRIMINATOR_SPAN + LITERAL_LENGTH_SPAN + length
    };
}
function unpackSeedInstructionArg(seeds, instructionData) {
    if (seeds.length < 2) {
        throw new errors_js_1.TokenTransferHookInvalidSeed();
    }
    const [index, length] = seeds;
    if (instructionData.length < length + index) {
        throw new errors_js_1.TokenTransferHookInvalidSeed();
    }
    return {
        data: instructionData.subarray(index, index + length),
        packedLength: DISCRIMINATOR_SPAN + INSTRUCTION_ARG_OFFSET_SPAN + INSTRUCTION_ARG_LENGTH_SPAN
    };
}
function unpackSeedAccountKey(seeds, previousMetas) {
    if (seeds.length < 1) {
        throw new errors_js_1.TokenTransferHookInvalidSeed();
    }
    const [index] = seeds;
    if (previousMetas.length <= index) {
        throw new errors_js_1.TokenTransferHookInvalidSeed();
    }
    return {
        data: previousMetas[index].pubkey.toBuffer(),
        packedLength: DISCRIMINATOR_SPAN + ACCOUNT_KEY_INDEX_SPAN
    };
}
function unpackSeedAccountData(seeds, previousMetas, connection) {
    return __awaiter(this, void 0, void 0, function*() {
        if (seeds.length < 3) {
            throw new errors_js_1.TokenTransferHookInvalidSeed();
        }
        const [accountIndex, dataIndex, length] = seeds;
        if (previousMetas.length <= accountIndex) {
            throw new errors_js_1.TokenTransferHookInvalidSeed();
        }
        const accountInfo = yield connection.getAccountInfo(previousMetas[accountIndex].pubkey);
        if (accountInfo == null) {
            throw new errors_js_1.TokenTransferHookAccountDataNotFound();
        }
        if (accountInfo.data.length < dataIndex + length) {
            throw new errors_js_1.TokenTransferHookInvalidSeed();
        }
        return {
            data: accountInfo.data.subarray(dataIndex, dataIndex + length),
            packedLength: DISCRIMINATOR_SPAN + ACCOUNT_DATA_ACCOUNT_INDEX_SPAN + ACCOUNT_DATA_OFFSET_SPAN + ACCOUNT_DATA_LENGTH_SPAN
        };
    });
}
function unpackFirstSeed(seeds, previousMetas, instructionData, connection) {
    return __awaiter(this, void 0, void 0, function*() {
        const [discriminator, ...rest] = seeds;
        const remaining = new Uint8Array(rest);
        switch(discriminator){
            case 0:
                return null;
            case 1:
                return unpackSeedLiteral(remaining);
            case 2:
                return unpackSeedInstructionArg(remaining, instructionData);
            case 3:
                return unpackSeedAccountKey(remaining, previousMetas);
            case 4:
                return unpackSeedAccountData(remaining, previousMetas, connection);
            default:
                throw new errors_js_1.TokenTransferHookInvalidSeed();
        }
    });
}
function unpackSeeds(seeds, previousMetas, instructionData, connection) {
    return __awaiter(this, void 0, void 0, function*() {
        const unpackedSeeds = [];
        let i = 0;
        while(i < 32){
            const seed = yield unpackFirstSeed(seeds.slice(i), previousMetas, instructionData, connection);
            if (seed == null) {
                break;
            }
            unpackedSeeds.push(seed.data);
            i += seed.packedLength;
        }
        return unpackedSeeds;
    });
}
exports.unpackSeeds = unpackSeeds; //# sourceMappingURL=seeds.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/transferHook/state.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveExtraAccountMeta = exports.getExtraAccountMetas = exports.ExtraAccountMetaAccountDataLayout = exports.ExtraAccountMetaListLayout = exports.ExtraAccountMetaLayout = exports.getExtraAccountMetaAddress = exports.getTransferHookAccount = exports.TRANSFER_HOOK_ACCOUNT_SIZE = exports.TransferHookAccountLayout = exports.getTransferHook = exports.TRANSFER_HOOK_SIZE = exports.TransferHookLayout = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const extensionType_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/extensionType.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const seeds_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/transferHook/seeds.js [app-route] (ecmascript)");
/** Buffer layout for de/serializing a transfer hook extension */ exports.TransferHookLayout = (0, buffer_layout_1.struct)([
    (0, buffer_layout_utils_1.publicKey)('authority'),
    (0, buffer_layout_utils_1.publicKey)('programId')
]);
exports.TRANSFER_HOOK_SIZE = exports.TransferHookLayout.span;
function getTransferHook(mint) {
    const extensionData = (0, extensionType_js_1.getExtensionData)(extensionType_js_1.ExtensionType.TransferHook, mint.tlvData);
    if (extensionData !== null) {
        return exports.TransferHookLayout.decode(extensionData);
    } else {
        return null;
    }
}
exports.getTransferHook = getTransferHook;
/** Buffer layout for de/serializing a transfer hook account extension */ exports.TransferHookAccountLayout = (0, buffer_layout_1.struct)([
    (0, buffer_layout_utils_1.bool)('transferring')
]);
exports.TRANSFER_HOOK_ACCOUNT_SIZE = exports.TransferHookAccountLayout.span;
function getTransferHookAccount(account) {
    const extensionData = (0, extensionType_js_1.getExtensionData)(extensionType_js_1.ExtensionType.TransferHookAccount, account.tlvData);
    if (extensionData !== null) {
        return exports.TransferHookAccountLayout.decode(extensionData);
    } else {
        return null;
    }
}
exports.getTransferHookAccount = getTransferHookAccount;
function getExtraAccountMetaAddress(mint, programId) {
    const seeds = [
        Buffer.from('extra-account-metas'),
        mint.toBuffer()
    ];
    return web3_js_1.PublicKey.findProgramAddressSync(seeds, programId)[0];
}
exports.getExtraAccountMetaAddress = getExtraAccountMetaAddress;
/** Buffer layout for de/serializing an ExtraAccountMeta */ exports.ExtraAccountMetaLayout = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('discriminator'),
    (0, buffer_layout_1.blob)(32, 'addressConfig'),
    (0, buffer_layout_utils_1.bool)('isSigner'),
    (0, buffer_layout_utils_1.bool)('isWritable')
]);
/** Buffer layout for de/serializing a list of ExtraAccountMeta prefixed by a u32 length */ exports.ExtraAccountMetaListLayout = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u32)('count'),
    (0, buffer_layout_1.seq)(exports.ExtraAccountMetaLayout, (0, buffer_layout_1.greedy)(exports.ExtraAccountMetaLayout.span), 'extraAccounts')
]);
/** Buffer layout for de/serializing an ExtraAccountMetaAccountData */ exports.ExtraAccountMetaAccountDataLayout = (0, buffer_layout_1.struct)([
    (0, buffer_layout_utils_1.u64)('instructionDiscriminator'),
    (0, buffer_layout_1.u32)('length'),
    exports.ExtraAccountMetaListLayout.replicate('extraAccountsList')
]);
/** Unpack an extra account metas account and parse the data into a list of ExtraAccountMetas */ function getExtraAccountMetas(account) {
    const extraAccountsList = exports.ExtraAccountMetaAccountDataLayout.decode(account.data).extraAccountsList;
    return extraAccountsList.extraAccounts.slice(0, extraAccountsList.count);
}
exports.getExtraAccountMetas = getExtraAccountMetas;
/** Take an ExtraAccountMeta and construct that into an acutal AccountMeta */ function resolveExtraAccountMeta(connection, extraMeta, previousMetas, instructionData, transferHookProgramId) {
    return __awaiter(this, void 0, void 0, function*() {
        if (extraMeta.discriminator === 0) {
            return {
                pubkey: new web3_js_1.PublicKey(extraMeta.addressConfig),
                isSigner: extraMeta.isSigner,
                isWritable: extraMeta.isWritable
            };
        }
        let programId = web3_js_1.PublicKey.default;
        if (extraMeta.discriminator === 1) {
            programId = transferHookProgramId;
        } else {
            const accountIndex = extraMeta.discriminator - (1 << 7);
            if (previousMetas.length <= accountIndex) {
                throw new errors_js_1.TokenTransferHookAccountNotFound();
            }
            programId = previousMetas[accountIndex].pubkey;
        }
        const seeds = yield (0, seeds_js_1.unpackSeeds)(extraMeta.addressConfig, previousMetas, instructionData, connection);
        const pubkey = web3_js_1.PublicKey.findProgramAddressSync(seeds, programId)[0];
        return {
            pubkey,
            isSigner: extraMeta.isSigner,
            isWritable: extraMeta.isWritable
        };
    });
}
exports.resolveExtraAccountMeta = resolveExtraAccountMeta; //# sourceMappingURL=state.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/transferHook/instructions.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createTransferCheckedWithFeeAndTransferHookInstruction = exports.createTransferCheckedWithTransferHookInstruction = exports.addExtraAccountsToInstruction = exports.createUpdateTransferHookInstruction = exports.updateTransferHookInstructionData = exports.createInitializeTransferHookInstruction = exports.initializeTransferHookInstructionData = exports.TransferHookInstruction = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/internal.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const transferChecked_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/transferChecked.js [app-route] (ecmascript)");
const instructions_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/transferFee/instructions.js [app-route] (ecmascript)");
const mint_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/state/mint.js [app-route] (ecmascript)");
const state_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/transferHook/state.js [app-route] (ecmascript)");
var TransferHookInstruction;
(function(TransferHookInstruction) {
    TransferHookInstruction[TransferHookInstruction["Initialize"] = 0] = "Initialize";
    TransferHookInstruction[TransferHookInstruction["Update"] = 1] = "Update";
})(TransferHookInstruction || (exports.TransferHookInstruction = TransferHookInstruction = {}));
/** The struct that represents the instruction data as it is read by the program */ exports.initializeTransferHookInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_1.u8)('transferHookInstruction'),
    (0, buffer_layout_utils_1.publicKey)('authority'),
    (0, buffer_layout_utils_1.publicKey)('transferHookProgramId')
]);
/**
 * Construct an InitializeTransferHook instruction
 *
 * @param mint                  Token mint account
 * @param authority             Transfer hook authority account
 * @param transferHookProgramId Transfer hook program account
 * @param programId             SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createInitializeTransferHookInstruction(mint, authority, transferHookProgramId, programId) {
    if (!(0, constants_js_1.programSupportsExtensions)(programId)) {
        throw new errors_js_1.TokenUnsupportedInstructionError();
    }
    const keys = [
        {
            pubkey: mint,
            isSigner: false,
            isWritable: true
        }
    ];
    const data = Buffer.alloc(exports.initializeTransferHookInstructionData.span);
    exports.initializeTransferHookInstructionData.encode({
        instruction: types_js_1.TokenInstruction.TransferHookExtension,
        transferHookInstruction: TransferHookInstruction.Initialize,
        authority,
        transferHookProgramId
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createInitializeTransferHookInstruction = createInitializeTransferHookInstruction;
/** The struct that represents the instruction data as it is read by the program */ exports.updateTransferHookInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_1.u8)('transferHookInstruction'),
    (0, buffer_layout_utils_1.publicKey)('transferHookProgramId')
]);
/**
 * Construct an UpdateTransferHook instruction
 *
 * @param mint                  Mint to update
 * @param authority             The mint's transfer hook authority
 * @param transferHookProgramId The new transfer hook program account
 * @param signers               The signer account(s) for a multisig
 * @param tokenProgramId        SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createUpdateTransferHookInstruction(mint, authority, transferHookProgramId, multiSigners = [], programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    if (!(0, constants_js_1.programSupportsExtensions)(programId)) {
        throw new errors_js_1.TokenUnsupportedInstructionError();
    }
    const keys = (0, internal_js_1.addSigners)([
        {
            pubkey: mint,
            isSigner: false,
            isWritable: true
        }
    ], authority, multiSigners);
    const data = Buffer.alloc(exports.updateTransferHookInstructionData.span);
    exports.updateTransferHookInstructionData.encode({
        instruction: types_js_1.TokenInstruction.TransferHookExtension,
        transferHookInstruction: TransferHookInstruction.Update,
        transferHookProgramId
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createUpdateTransferHookInstruction = createUpdateTransferHookInstruction;
function deEscalateAccountMeta(accountMeta, accountMetas) {
    const maybeHighestPrivileges = accountMetas.filter((x)=>x.pubkey === accountMeta.pubkey).reduce((acc, x)=>{
        if (!acc) return {
            isSigner: x.isSigner,
            isWritable: x.isWritable
        };
        return {
            isSigner: acc.isSigner || x.isSigner,
            isWritable: acc.isWritable || x.isWritable
        };
    }, undefined);
    if (maybeHighestPrivileges) {
        const { isSigner, isWritable } = maybeHighestPrivileges;
        if (!isSigner && isSigner !== accountMeta.isSigner) {
            accountMeta.isSigner = false;
        }
        if (!isWritable && isWritable !== accountMeta.isWritable) {
            accountMeta.isWritable = false;
        }
    }
    return accountMeta;
}
/**
 * Add extra accounts needed for transfer hook to an instruction
 *
 * @param connection      Connection to use
 * @param instruction     The transferChecked instruction to add accounts to
 * @param commitment      Commitment to use
 * @param programId       SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function addExtraAccountsToInstruction(connection, instruction, mint, commitment, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        if (!(0, constants_js_1.programSupportsExtensions)(programId)) {
            throw new errors_js_1.TokenUnsupportedInstructionError();
        }
        const mintInfo = yield (0, mint_js_1.getMint)(connection, mint, commitment, programId);
        const transferHook = (0, state_js_1.getTransferHook)(mintInfo);
        if (transferHook == null) {
            return instruction;
        }
        const extraAccountsAccount = (0, state_js_1.getExtraAccountMetaAddress)(mint, transferHook.programId);
        const extraAccountsInfo = yield connection.getAccountInfo(extraAccountsAccount, commitment);
        if (extraAccountsInfo == null) {
            return instruction;
        }
        const extraAccountMetas = (0, state_js_1.getExtraAccountMetas)(extraAccountsInfo);
        const accountMetas = instruction.keys;
        for (const extraAccountMeta of extraAccountMetas){
            const accountMetaUnchecked = yield (0, state_js_1.resolveExtraAccountMeta)(connection, extraAccountMeta, accountMetas, instruction.data, transferHook.programId);
            const accountMeta = deEscalateAccountMeta(accountMetaUnchecked, accountMetas);
            accountMetas.push(accountMeta);
        }
        accountMetas.push({
            pubkey: transferHook.programId,
            isSigner: false,
            isWritable: false
        });
        accountMetas.push({
            pubkey: extraAccountsAccount,
            isSigner: false,
            isWritable: false
        });
        return new web3_js_1.TransactionInstruction({
            keys: accountMetas,
            programId,
            data: instruction.data
        });
    });
}
exports.addExtraAccountsToInstruction = addExtraAccountsToInstruction;
/**
 * Construct an transferChecked instruction with extra accounts for transfer hook
 *
 * @param connection            Connection to use
 * @param source                Source account
 * @param mint                  Mint to update
 * @param destination           Destination account
 * @param authority             The mint's transfer hook authority
 * @param amount                The amount of tokens to transfer
 * @param decimals              Number of decimals in transfer amount
 * @param multiSigners          The signer account(s) for a multisig
 * @param commitment            Commitment to use
 * @param programId             SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createTransferCheckedWithTransferHookInstruction(connection, source, mint, destination, authority, amount, decimals, multiSigners = [], commitment, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const rawInstruction = (0, transferChecked_js_1.createTransferCheckedInstruction)(source, mint, destination, authority, amount, decimals, multiSigners, programId);
        const hydratedInstruction = yield addExtraAccountsToInstruction(connection, rawInstruction, mint, commitment, programId);
        return hydratedInstruction;
    });
}
exports.createTransferCheckedWithTransferHookInstruction = createTransferCheckedWithTransferHookInstruction;
/**
 * Construct an transferChecked instruction with extra accounts for transfer hook
 *
 * @param connection            Connection to use
 * @param source                Source account
 * @param mint                  Mint to update
 * @param destination           Destination account
 * @param authority             The mint's transfer hook authority
 * @param amount                The amount of tokens to transfer
 * @param decimals              Number of decimals in transfer amount
 * @param fee                   The calculated fee for the transfer fee extension
 * @param multiSigners          The signer account(s) for a multisig
 * @param commitment            Commitment to use
 * @param programId             SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createTransferCheckedWithFeeAndTransferHookInstruction(connection, source, mint, destination, authority, amount, decimals, fee, multiSigners = [], commitment, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const rawInstruction = (0, instructions_js_1.createTransferCheckedWithFeeInstruction)(source, mint, destination, authority, amount, decimals, fee, multiSigners, programId);
        const hydratedInstruction = yield addExtraAccountsToInstruction(connection, rawInstruction, mint, commitment, programId);
        return hydratedInstruction;
    });
}
exports.createTransferCheckedWithFeeAndTransferHookInstruction = createTransferCheckedWithFeeAndTransferHookInstruction; //# sourceMappingURL=instructions.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/transferHook/actions.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.transferCheckedWithFeeAndTransferHook = exports.transferCheckedWithTransferHook = exports.updateTransferHook = exports.initializeTransferHook = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/internal.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const instructions_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/transferHook/instructions.js [app-route] (ecmascript)");
/**
 * Initialize a transfer hook on a mint
 *
 * @param connection            Connection to use
 * @param payer                 Payer of the transaction fees
 * @param mint                  Mint to initialize with extension
 * @param authority             Transfer hook authority account
 * @param transferHookProgramId The transfer hook program account
 * @param confirmOptions        Options for confirming the transaction
 * @param programId             SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function initializeTransferHook(connection, payer, mint, authority, transferHookProgramId, confirmOptions, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const transaction = new web3_js_1.Transaction().add((0, instructions_js_1.createInitializeTransferHookInstruction)(mint, authority, transferHookProgramId, programId));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer
        ], confirmOptions);
    });
}
exports.initializeTransferHook = initializeTransferHook;
/**
 * Update the transfer hook program on a mint
 *
 * @param connection            Connection to use
 * @param payer                 Payer of the transaction fees
 * @param mint                  Mint to modify
 * @param transferHookProgramId New transfer hook program account
 * @param authority             Transfer hook update authority
 * @param multiSigners          Signing accounts if `freezeAuthority` is a multisig
 * @param confirmOptions        Options for confirming the transaction
 * @param programId             SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function updateTransferHook(connection, payer, mint, transferHookProgramId, authority, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [authorityPublicKey, signers] = (0, internal_js_1.getSigners)(authority, multiSigners);
        const transaction = new web3_js_1.Transaction().add((0, instructions_js_1.createUpdateTransferHookInstruction)(mint, authorityPublicKey, transferHookProgramId, signers, programId));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.updateTransferHook = updateTransferHook;
/**
 * Transfer tokens from one account to another, asserting the token mint, and decimals
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction fees
 * @param source         Source account
 * @param mint           Mint for the account
 * @param destination    Destination account
 * @param authority      Authority of the source account
 * @param amount         Number of tokens to transfer
 * @param decimals       Number of decimals in transfer amount
 * @param multiSigners   Signing accounts if `owner` is a multisig
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function transferCheckedWithTransferHook(connection, payer, source, mint, destination, authority, amount, decimals, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [authorityPublicKey, signers] = (0, internal_js_1.getSigners)(authority, multiSigners);
        const transaction = new web3_js_1.Transaction().add((yield (0, instructions_js_1.createTransferCheckedWithTransferHookInstruction)(connection, source, mint, destination, authorityPublicKey, amount, decimals, signers, confirmOptions === null || confirmOptions === void 0 ? void 0 : confirmOptions.commitment, programId)));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.transferCheckedWithTransferHook = transferCheckedWithTransferHook;
/**
 * Transfer tokens from one account to another, asserting the transfer fee, token mint, and decimals
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction fees
 * @param source         Source account
 * @param mint           Mint for the account
 * @param destination    Destination account
 * @param authority      Authority of the source account
 * @param amount         Number of tokens to transfer
 * @param decimals       Number of decimals in transfer amount
 * @param fee            The calculated fee for the transfer fee extension
 * @param multiSigners   Signing accounts if `owner` is a multisig
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function transferCheckedWithFeeAndTransferHook(connection, payer, source, mint, destination, authority, amount, decimals, fee, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [authorityPublicKey, signers] = (0, internal_js_1.getSigners)(authority, multiSigners);
        const transaction = new web3_js_1.Transaction().add((yield (0, instructions_js_1.createTransferCheckedWithFeeAndTransferHookInstruction)(connection, source, mint, destination, authorityPublicKey, amount, decimals, fee, signers, confirmOptions === null || confirmOptions === void 0 ? void 0 : confirmOptions.commitment, programId)));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.transferCheckedWithFeeAndTransferHook = transferCheckedWithFeeAndTransferHook; //# sourceMappingURL=actions.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/transferHook/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/transferHook/actions.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/transferHook/instructions.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/transferHook/seeds.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/transferHook/state.js [app-route] (ecmascript)"), exports); //# sourceMappingURL=index.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/extensionType.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getNewAccountLenForExtensionLen = exports.getAccountLenForMint = exports.getExtensionTypes = exports.getExtensionData = exports.getAccountLen = exports.getMintLen = exports.getAccountTypeOfMintType = exports.isAccountExtension = exports.isMintExtension = exports.getTypeLen = exports.LENGTH_SIZE = exports.TYPE_SIZE = exports.ExtensionType = void 0;
const account_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/state/account.js [app-route] (ecmascript)");
const mint_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/state/mint.js [app-route] (ecmascript)");
const multisig_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/state/multisig.js [app-route] (ecmascript)");
const accountType_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/accountType.js [app-route] (ecmascript)");
const index_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/cpiGuard/index.js [app-route] (ecmascript)");
const index_js_2 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/defaultAccountState/index.js [app-route] (ecmascript)");
const immutableOwner_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/immutableOwner.js [app-route] (ecmascript)");
const state_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/interestBearingMint/state.js [app-route] (ecmascript)");
const index_js_3 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/memoTransfer/index.js [app-route] (ecmascript)");
const state_js_2 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/metadataPointer/state.js [app-route] (ecmascript)");
const mintCloseAuthority_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/mintCloseAuthority.js [app-route] (ecmascript)");
const nonTransferable_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/nonTransferable.js [app-route] (ecmascript)");
const permanentDelegate_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/permanentDelegate.js [app-route] (ecmascript)");
const index_js_4 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/transferFee/index.js [app-route] (ecmascript)");
const index_js_5 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/transferHook/index.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
// Sequence from https://github.com/solana-labs/solana-program-library/blob/master/token/program-2022/src/extension/mod.rs#L903
var ExtensionType;
(function(ExtensionType) {
    ExtensionType[ExtensionType["Uninitialized"] = 0] = "Uninitialized";
    ExtensionType[ExtensionType["TransferFeeConfig"] = 1] = "TransferFeeConfig";
    ExtensionType[ExtensionType["TransferFeeAmount"] = 2] = "TransferFeeAmount";
    ExtensionType[ExtensionType["MintCloseAuthority"] = 3] = "MintCloseAuthority";
    ExtensionType[ExtensionType["ConfidentialTransferMint"] = 4] = "ConfidentialTransferMint";
    ExtensionType[ExtensionType["ConfidentialTransferAccount"] = 5] = "ConfidentialTransferAccount";
    ExtensionType[ExtensionType["DefaultAccountState"] = 6] = "DefaultAccountState";
    ExtensionType[ExtensionType["ImmutableOwner"] = 7] = "ImmutableOwner";
    ExtensionType[ExtensionType["MemoTransfer"] = 8] = "MemoTransfer";
    ExtensionType[ExtensionType["NonTransferable"] = 9] = "NonTransferable";
    ExtensionType[ExtensionType["InterestBearingConfig"] = 10] = "InterestBearingConfig";
    ExtensionType[ExtensionType["CpiGuard"] = 11] = "CpiGuard";
    ExtensionType[ExtensionType["PermanentDelegate"] = 12] = "PermanentDelegate";
    ExtensionType[ExtensionType["NonTransferableAccount"] = 13] = "NonTransferableAccount";
    ExtensionType[ExtensionType["TransferHook"] = 14] = "TransferHook";
    ExtensionType[ExtensionType["TransferHookAccount"] = 15] = "TransferHookAccount";
    // ConfidentialTransferFee, // Not implemented yet
    // ConfidentialTransferFeeAmount, // Not implemented yet
    ExtensionType[ExtensionType["MetadataPointer"] = 18] = "MetadataPointer";
    ExtensionType[ExtensionType["TokenMetadata"] = 19] = "TokenMetadata";
})(ExtensionType || (exports.ExtensionType = ExtensionType = {}));
exports.TYPE_SIZE = 2;
exports.LENGTH_SIZE = 2;
function addTypeAndLengthToLen(len) {
    return len + exports.TYPE_SIZE + exports.LENGTH_SIZE;
}
function isVariableLengthExtension(e) {
    switch(e){
        case ExtensionType.TokenMetadata:
            return true;
        default:
            return false;
    }
}
// NOTE: All of these should eventually use their type's Span instead of these
// constants.  This is provided for at least creation to work.
function getTypeLen(e) {
    switch(e){
        case ExtensionType.Uninitialized:
            return 0;
        case ExtensionType.TransferFeeConfig:
            return index_js_4.TRANSFER_FEE_CONFIG_SIZE;
        case ExtensionType.TransferFeeAmount:
            return index_js_4.TRANSFER_FEE_AMOUNT_SIZE;
        case ExtensionType.MintCloseAuthority:
            return mintCloseAuthority_js_1.MINT_CLOSE_AUTHORITY_SIZE;
        case ExtensionType.ConfidentialTransferMint:
            return 97;
        case ExtensionType.ConfidentialTransferAccount:
            return 286;
        case ExtensionType.CpiGuard:
            return index_js_1.CPI_GUARD_SIZE;
        case ExtensionType.DefaultAccountState:
            return index_js_2.DEFAULT_ACCOUNT_STATE_SIZE;
        case ExtensionType.ImmutableOwner:
            return immutableOwner_js_1.IMMUTABLE_OWNER_SIZE;
        case ExtensionType.MemoTransfer:
            return index_js_3.MEMO_TRANSFER_SIZE;
        case ExtensionType.MetadataPointer:
            return state_js_2.METADATA_POINTER_SIZE;
        case ExtensionType.NonTransferable:
            return nonTransferable_js_1.NON_TRANSFERABLE_SIZE;
        case ExtensionType.InterestBearingConfig:
            return state_js_1.INTEREST_BEARING_MINT_CONFIG_STATE_SIZE;
        case ExtensionType.PermanentDelegate:
            return permanentDelegate_js_1.PERMANENT_DELEGATE_SIZE;
        case ExtensionType.NonTransferableAccount:
            return nonTransferable_js_1.NON_TRANSFERABLE_ACCOUNT_SIZE;
        case ExtensionType.TransferHook:
            return index_js_5.TRANSFER_HOOK_SIZE;
        case ExtensionType.TransferHookAccount:
            return index_js_5.TRANSFER_HOOK_ACCOUNT_SIZE;
        case ExtensionType.TokenMetadata:
            throw Error(`Cannot get type length for variable extension type: ${e}`);
        default:
            throw Error(`Unknown extension type: ${e}`);
    }
}
exports.getTypeLen = getTypeLen;
function isMintExtension(e) {
    switch(e){
        case ExtensionType.TransferFeeConfig:
        case ExtensionType.MintCloseAuthority:
        case ExtensionType.ConfidentialTransferMint:
        case ExtensionType.DefaultAccountState:
        case ExtensionType.NonTransferable:
        case ExtensionType.InterestBearingConfig:
        case ExtensionType.PermanentDelegate:
        case ExtensionType.TransferHook:
        case ExtensionType.MetadataPointer:
        case ExtensionType.TokenMetadata:
            return true;
        case ExtensionType.Uninitialized:
        case ExtensionType.TransferFeeAmount:
        case ExtensionType.ConfidentialTransferAccount:
        case ExtensionType.ImmutableOwner:
        case ExtensionType.MemoTransfer:
        case ExtensionType.CpiGuard:
        case ExtensionType.NonTransferableAccount:
        case ExtensionType.TransferHookAccount:
            return false;
        default:
            throw Error(`Unknown extension type: ${e}`);
    }
}
exports.isMintExtension = isMintExtension;
function isAccountExtension(e) {
    switch(e){
        case ExtensionType.TransferFeeAmount:
        case ExtensionType.ConfidentialTransferAccount:
        case ExtensionType.ImmutableOwner:
        case ExtensionType.MemoTransfer:
        case ExtensionType.CpiGuard:
        case ExtensionType.NonTransferableAccount:
        case ExtensionType.TransferHookAccount:
            return true;
        case ExtensionType.Uninitialized:
        case ExtensionType.TransferFeeConfig:
        case ExtensionType.MintCloseAuthority:
        case ExtensionType.ConfidentialTransferMint:
        case ExtensionType.DefaultAccountState:
        case ExtensionType.NonTransferable:
        case ExtensionType.InterestBearingConfig:
        case ExtensionType.PermanentDelegate:
        case ExtensionType.TransferHook:
        case ExtensionType.MetadataPointer:
        case ExtensionType.TokenMetadata:
            return false;
        default:
            throw Error(`Unknown extension type: ${e}`);
    }
}
exports.isAccountExtension = isAccountExtension;
function getAccountTypeOfMintType(e) {
    switch(e){
        case ExtensionType.TransferFeeConfig:
            return ExtensionType.TransferFeeAmount;
        case ExtensionType.ConfidentialTransferMint:
            return ExtensionType.ConfidentialTransferAccount;
        case ExtensionType.NonTransferable:
            return ExtensionType.NonTransferableAccount;
        case ExtensionType.TransferHook:
            return ExtensionType.TransferHookAccount;
        case ExtensionType.TransferFeeAmount:
        case ExtensionType.ConfidentialTransferAccount:
        case ExtensionType.CpiGuard:
        case ExtensionType.DefaultAccountState:
        case ExtensionType.ImmutableOwner:
        case ExtensionType.MemoTransfer:
        case ExtensionType.MintCloseAuthority:
        case ExtensionType.MetadataPointer:
        case ExtensionType.TokenMetadata:
        case ExtensionType.Uninitialized:
        case ExtensionType.InterestBearingConfig:
        case ExtensionType.PermanentDelegate:
        case ExtensionType.NonTransferableAccount:
        case ExtensionType.TransferHookAccount:
            return ExtensionType.Uninitialized;
    }
}
exports.getAccountTypeOfMintType = getAccountTypeOfMintType;
function getLen(extensionTypes, baseSize, variableLengthExtensions = {}) {
    if (extensionTypes.length === 0 && Object.keys(variableLengthExtensions).length === 0) {
        return baseSize;
    } else {
        const accountLength = account_js_1.ACCOUNT_SIZE + accountType_js_1.ACCOUNT_TYPE_SIZE + extensionTypes.filter((element, i)=>i === extensionTypes.indexOf(element)).map((element)=>addTypeAndLengthToLen(getTypeLen(element))).reduce((a, b)=>a + b, 0) + Object.entries(variableLengthExtensions).map(([extension, len])=>{
            if (!isVariableLengthExtension(Number(extension))) {
                throw Error(`Extension ${extension} is not variable length`);
            }
            return addTypeAndLengthToLen(len);
        }).reduce((a, b)=>a + b, 0);
        if (accountLength === multisig_js_1.MULTISIG_SIZE) {
            return accountLength + exports.TYPE_SIZE;
        } else {
            return accountLength;
        }
    }
}
function getMintLen(extensionTypes, variableLengthExtensions = {}) {
    return getLen(extensionTypes, mint_js_1.MINT_SIZE, variableLengthExtensions);
}
exports.getMintLen = getMintLen;
function getAccountLen(extensionTypes) {
    // There are currently no variable length extensions for accounts
    return getLen(extensionTypes, account_js_1.ACCOUNT_SIZE);
}
exports.getAccountLen = getAccountLen;
function getExtensionData(extension, tlvData) {
    let extensionTypeIndex = 0;
    while(addTypeAndLengthToLen(extensionTypeIndex) <= tlvData.length){
        const entryType = tlvData.readUInt16LE(extensionTypeIndex);
        const entryLength = tlvData.readUInt16LE(extensionTypeIndex + exports.TYPE_SIZE);
        const typeIndex = addTypeAndLengthToLen(extensionTypeIndex);
        if (entryType == extension) {
            return tlvData.slice(typeIndex, typeIndex + entryLength);
        }
        extensionTypeIndex = typeIndex + entryLength;
    }
    return null;
}
exports.getExtensionData = getExtensionData;
function getExtensionTypes(tlvData) {
    const extensionTypes = [];
    let extensionTypeIndex = 0;
    while(extensionTypeIndex < tlvData.length){
        const entryType = tlvData.readUInt16LE(extensionTypeIndex);
        extensionTypes.push(entryType);
        const entryLength = tlvData.readUInt16LE(extensionTypeIndex + exports.TYPE_SIZE);
        extensionTypeIndex += addTypeAndLengthToLen(entryLength);
    }
    return extensionTypes;
}
exports.getExtensionTypes = getExtensionTypes;
function getAccountLenForMint(mint) {
    const extensionTypes = getExtensionTypes(mint.tlvData);
    const accountExtensions = extensionTypes.map(getAccountTypeOfMintType);
    return getAccountLen(accountExtensions);
}
exports.getAccountLenForMint = getAccountLenForMint;
function getNewAccountLenForExtensionLen(info, address, extensionType, extensionLen, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    const mint = (0, mint_js_1.unpackMint)(address, info, programId);
    const extensionData = getExtensionData(extensionType, mint.tlvData);
    const currentExtensionLen = extensionData ? addTypeAndLengthToLen(extensionData.length) : 0;
    const newExtensionLen = addTypeAndLengthToLen(extensionLen);
    return info.data.length + newExtensionLen - currentExtensionLen;
}
exports.getNewAccountLenForExtensionLen = getNewAccountLenForExtensionLen; //# sourceMappingURL=extensionType.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeAccount.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeInitializeAccountInstructionUnchecked = exports.decodeInitializeAccountInstruction = exports.createInitializeAccountInstruction = exports.initializeAccountInstructionData = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
/** TODO: docs */ exports.initializeAccountInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction')
]);
/**
 * Construct an InitializeAccount instruction
 *
 * @param account   New token account
 * @param mint      Mint account
 * @param owner     Owner of the new account
 * @param programId SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createInitializeAccountInstruction(account, mint, owner, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    const keys = [
        {
            pubkey: account,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: mint,
            isSigner: false,
            isWritable: false
        },
        {
            pubkey: owner,
            isSigner: false,
            isWritable: false
        },
        {
            pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false
        }
    ];
    const data = Buffer.alloc(exports.initializeAccountInstructionData.span);
    exports.initializeAccountInstructionData.encode({
        instruction: types_js_1.TokenInstruction.InitializeAccount
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createInitializeAccountInstruction = createInitializeAccountInstruction;
/**
 * Decode an InitializeAccount instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeInitializeAccountInstruction(instruction, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.initializeAccountInstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { account, mint, owner, rent }, data } = decodeInitializeAccountInstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.InitializeAccount) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!account || !mint || !owner || !rent) throw new errors_js_1.TokenInvalidInstructionKeysError();
    // TODO: key checks?
    return {
        programId,
        keys: {
            account,
            mint,
            owner,
            rent
        },
        data
    };
}
exports.decodeInitializeAccountInstruction = decodeInitializeAccountInstruction;
/**
 * Decode an InitializeAccount instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeInitializeAccountInstructionUnchecked({ programId, keys: [account, mint, owner, rent], data }) {
    return {
        programId,
        keys: {
            account,
            mint,
            owner,
            rent
        },
        data: exports.initializeAccountInstructionData.decode(data)
    };
}
exports.decodeInitializeAccountInstructionUnchecked = decodeInitializeAccountInstructionUnchecked; //# sourceMappingURL=initializeAccount.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/associatedTokenAccount.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createRecoverNestedInstruction = exports.createAssociatedTokenAccountIdempotentInstruction = exports.createAssociatedTokenAccountInstruction = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
/**
 * Construct a CreateAssociatedTokenAccount instruction
 *
 * @param payer                    Payer of the initialization fees
 * @param associatedToken          New associated token account
 * @param owner                    Owner of the new account
 * @param mint                     Token mint account
 * @param programId                SPL Token program account
 * @param associatedTokenProgramId SPL Associated Token program account
 *
 * @return Instruction to add to a transaction
 */ function createAssociatedTokenAccountInstruction(payer, associatedToken, owner, mint, programId = constants_js_1.TOKEN_PROGRAM_ID, associatedTokenProgramId = constants_js_1.ASSOCIATED_TOKEN_PROGRAM_ID) {
    return buildAssociatedTokenAccountInstruction(payer, associatedToken, owner, mint, Buffer.alloc(0), programId, associatedTokenProgramId);
}
exports.createAssociatedTokenAccountInstruction = createAssociatedTokenAccountInstruction;
/**
 * Construct a CreateAssociatedTokenAccountIdempotent instruction
 *
 * @param payer                    Payer of the initialization fees
 * @param associatedToken          New associated token account
 * @param owner                    Owner of the new account
 * @param mint                     Token mint account
 * @param programId                SPL Token program account
 * @param associatedTokenProgramId SPL Associated Token program account
 *
 * @return Instruction to add to a transaction
 */ function createAssociatedTokenAccountIdempotentInstruction(payer, associatedToken, owner, mint, programId = constants_js_1.TOKEN_PROGRAM_ID, associatedTokenProgramId = constants_js_1.ASSOCIATED_TOKEN_PROGRAM_ID) {
    return buildAssociatedTokenAccountInstruction(payer, associatedToken, owner, mint, Buffer.from([
        1
    ]), programId, associatedTokenProgramId);
}
exports.createAssociatedTokenAccountIdempotentInstruction = createAssociatedTokenAccountIdempotentInstruction;
function buildAssociatedTokenAccountInstruction(payer, associatedToken, owner, mint, instructionData, programId = constants_js_1.TOKEN_PROGRAM_ID, associatedTokenProgramId = constants_js_1.ASSOCIATED_TOKEN_PROGRAM_ID) {
    const keys = [
        {
            pubkey: payer,
            isSigner: true,
            isWritable: true
        },
        {
            pubkey: associatedToken,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: owner,
            isSigner: false,
            isWritable: false
        },
        {
            pubkey: mint,
            isSigner: false,
            isWritable: false
        },
        {
            pubkey: web3_js_1.SystemProgram.programId,
            isSigner: false,
            isWritable: false
        },
        {
            pubkey: programId,
            isSigner: false,
            isWritable: false
        }
    ];
    return new web3_js_1.TransactionInstruction({
        keys,
        programId: associatedTokenProgramId,
        data: instructionData
    });
}
/**
 * Construct a RecoverNested instruction
 *
 * @param nestedAssociatedToken             Nested associated token account (must be owned by `ownerAssociatedToken`)
 * @param nestedMint                        Token mint for the nested associated token account
 * @param destinationAssociatedToken        Wallet's associated token account
 * @param ownerAssociatedToken              Owner associated token account address (must be owned by `owner`)
 * @param ownerMint                         Token mint for the owner associated token account
 * @param owner                             Wallet address for the owner associated token account
 * @param programId                         SPL Token program account
 * @param associatedTokenProgramId          SPL Associated Token program account
 *
 * @return Instruction to add to a transaction
 */ function createRecoverNestedInstruction(nestedAssociatedToken, nestedMint, destinationAssociatedToken, ownerAssociatedToken, ownerMint, owner, programId = constants_js_1.TOKEN_PROGRAM_ID, associatedTokenProgramId = constants_js_1.ASSOCIATED_TOKEN_PROGRAM_ID) {
    const keys = [
        {
            pubkey: nestedAssociatedToken,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: nestedMint,
            isSigner: false,
            isWritable: false
        },
        {
            pubkey: destinationAssociatedToken,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: ownerAssociatedToken,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: ownerMint,
            isSigner: false,
            isWritable: false
        },
        {
            pubkey: owner,
            isSigner: true,
            isWritable: true
        },
        {
            pubkey: programId,
            isSigner: false,
            isWritable: false
        }
    ];
    return new web3_js_1.TransactionInstruction({
        keys,
        programId: associatedTokenProgramId,
        data: Buffer.from([
            2
        ])
    });
}
exports.createRecoverNestedInstruction = createRecoverNestedInstruction; //# sourceMappingURL=associatedTokenAccount.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/createAssociatedTokenAccount.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createAssociatedTokenAccount = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const associatedTokenAccount_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/associatedTokenAccount.js [app-route] (ecmascript)");
const mint_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/state/mint.js [app-route] (ecmascript)");
/**
 * Create and initialize a new associated token account
 *
 * @param connection               Connection to use
 * @param payer                    Payer of the transaction and initialization fees
 * @param mint                     Mint for the account
 * @param owner                    Owner of the new account
 * @param confirmOptions           Options for confirming the transaction
 * @param programId                SPL Token program account
 * @param associatedTokenProgramId SPL Associated Token program account
 *
 * @return Address of the new associated token account
 */ function createAssociatedTokenAccount(connection, payer, mint, owner, confirmOptions, programId = constants_js_1.TOKEN_PROGRAM_ID, associatedTokenProgramId = constants_js_1.ASSOCIATED_TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const associatedToken = (0, mint_js_1.getAssociatedTokenAddressSync)(mint, owner, false, programId, associatedTokenProgramId);
        const transaction = new web3_js_1.Transaction().add((0, associatedTokenAccount_js_1.createAssociatedTokenAccountInstruction)(payer.publicKey, associatedToken, owner, mint, programId, associatedTokenProgramId));
        yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer
        ], confirmOptions);
        return associatedToken;
    });
}
exports.createAssociatedTokenAccount = createAssociatedTokenAccount; //# sourceMappingURL=createAssociatedTokenAccount.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/createAccount.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createAccount = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const extensionType_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/extensionType.js [app-route] (ecmascript)");
const initializeAccount_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeAccount.js [app-route] (ecmascript)");
const mint_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/state/mint.js [app-route] (ecmascript)");
const createAssociatedTokenAccount_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/createAssociatedTokenAccount.js [app-route] (ecmascript)");
/**
 * Create and initialize a new token account
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction and initialization fees
 * @param mint           Mint for the account
 * @param owner          Owner of the new account
 * @param keypair        Optional keypair, defaulting to the associated token account for the `mint` and `owner`
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Address of the new token account
 */ function createAccount(connection, payer, mint, owner, keypair, confirmOptions, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        // If a keypair isn't provided, create the associated token account and return its address
        if (!keypair) return yield (0, createAssociatedTokenAccount_js_1.createAssociatedTokenAccount)(connection, payer, mint, owner, confirmOptions, programId);
        // Otherwise, create the account with the provided keypair and return its public key
        const mintState = yield (0, mint_js_1.getMint)(connection, mint, confirmOptions === null || confirmOptions === void 0 ? void 0 : confirmOptions.commitment, programId);
        const space = (0, extensionType_js_1.getAccountLenForMint)(mintState);
        const lamports = yield connection.getMinimumBalanceForRentExemption(space);
        const transaction = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: keypair.publicKey,
            space,
            lamports,
            programId
        }), (0, initializeAccount_js_1.createInitializeAccountInstruction)(keypair.publicKey, mint, owner, programId));
        yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            keypair
        ], confirmOptions);
        return keypair.publicKey;
    });
}
exports.createAccount = createAccount; //# sourceMappingURL=createAccount.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/createAssociatedTokenAccountIdempotent.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createAssociatedTokenAccountIdempotent = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const associatedTokenAccount_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/associatedTokenAccount.js [app-route] (ecmascript)");
const mint_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/state/mint.js [app-route] (ecmascript)");
/**
 * Create and initialize a new associated token account
 * The instruction will succeed even if the associated token account already exists
 *
 * @param connection               Connection to use
 * @param payer                    Payer of the transaction and initialization fees
 * @param mint                     Mint for the account
 * @param owner                    Owner of the new account
 * @param confirmOptions           Options for confirming the transaction
 * @param programId                SPL Token program account
 * @param associatedTokenProgramId SPL Associated Token program account
 *
 * @return Address of the new or existing associated token account
 */ function createAssociatedTokenAccountIdempotent(connection, payer, mint, owner, confirmOptions, programId = constants_js_1.TOKEN_PROGRAM_ID, associatedTokenProgramId = constants_js_1.ASSOCIATED_TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const associatedToken = (0, mint_js_1.getAssociatedTokenAddressSync)(mint, owner, false, programId, associatedTokenProgramId);
        const transaction = new web3_js_1.Transaction().add((0, associatedTokenAccount_js_1.createAssociatedTokenAccountIdempotentInstruction)(payer.publicKey, associatedToken, owner, mint, programId, associatedTokenProgramId));
        yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer
        ], confirmOptions);
        return associatedToken;
    });
}
exports.createAssociatedTokenAccountIdempotent = createAssociatedTokenAccountIdempotent; //# sourceMappingURL=createAssociatedTokenAccountIdempotent.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeMint2.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeInitializeMint2InstructionUnchecked = exports.decodeInitializeMint2Instruction = exports.createInitializeMint2Instruction = exports.initializeMint2InstructionData = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
/** TODO: docs */ exports.initializeMint2InstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_1.u8)('decimals'),
    (0, buffer_layout_utils_1.publicKey)('mintAuthority'),
    (0, buffer_layout_1.u8)('freezeAuthorityOption'),
    (0, buffer_layout_utils_1.publicKey)('freezeAuthority')
]);
/**
 * Construct an InitializeMint2 instruction
 *
 * @param mint            Token mint account
 * @param decimals        Number of decimals in token account amounts
 * @param mintAuthority   Minting authority
 * @param freezeAuthority Optional authority that can freeze token accounts
 * @param programId       SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createInitializeMint2Instruction(mint, decimals, mintAuthority, freezeAuthority, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    const keys = [
        {
            pubkey: mint,
            isSigner: false,
            isWritable: true
        }
    ];
    const data = Buffer.alloc(exports.initializeMint2InstructionData.span);
    exports.initializeMint2InstructionData.encode({
        instruction: types_js_1.TokenInstruction.InitializeMint2,
        decimals,
        mintAuthority,
        freezeAuthorityOption: freezeAuthority ? 1 : 0,
        freezeAuthority: freezeAuthority || new web3_js_1.PublicKey(0)
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createInitializeMint2Instruction = createInitializeMint2Instruction;
/**
 * Decode an InitializeMint2 instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeInitializeMint2Instruction(instruction, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.initializeMint2InstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { mint }, data } = decodeInitializeMint2InstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.InitializeMint2) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!mint) throw new errors_js_1.TokenInvalidInstructionKeysError();
    return {
        programId,
        keys: {
            mint
        },
        data
    };
}
exports.decodeInitializeMint2Instruction = decodeInitializeMint2Instruction;
/**
 * Decode an InitializeMint2 instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeInitializeMint2InstructionUnchecked({ programId, keys: [mint], data }) {
    const { instruction, decimals, mintAuthority, freezeAuthorityOption, freezeAuthority } = exports.initializeMint2InstructionData.decode(data);
    return {
        programId,
        keys: {
            mint
        },
        data: {
            instruction,
            decimals,
            mintAuthority,
            freezeAuthority: freezeAuthorityOption ? freezeAuthority : null
        }
    };
}
exports.decodeInitializeMint2InstructionUnchecked = decodeInitializeMint2InstructionUnchecked; //# sourceMappingURL=initializeMint2.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/createMint.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createMint = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const initializeMint2_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeMint2.js [app-route] (ecmascript)");
const mint_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/state/mint.js [app-route] (ecmascript)");
/**
 * Create and initialize a new mint
 *
 * @param connection      Connection to use
 * @param payer           Payer of the transaction and initialization fees
 * @param mintAuthority   Account or multisig that will control minting
 * @param freezeAuthority Optional account or multisig that can freeze token accounts
 * @param decimals        Location of the decimal place
 * @param keypair         Optional keypair, defaulting to a new random one
 * @param confirmOptions  Options for confirming the transaction
 * @param programId       SPL Token program account
 *
 * @return Address of the new mint
 */ function createMint(connection, payer, mintAuthority, freezeAuthority, decimals, keypair = web3_js_1.Keypair.generate(), confirmOptions, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const lamports = yield (0, mint_js_1.getMinimumBalanceForRentExemptMint)(connection);
        const transaction = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: keypair.publicKey,
            space: mint_js_1.MINT_SIZE,
            lamports,
            programId
        }), (0, initializeMint2_js_1.createInitializeMint2Instruction)(keypair.publicKey, decimals, mintAuthority, freezeAuthority, programId));
        yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            keypair
        ], confirmOptions);
        return keypair.publicKey;
    });
}
exports.createMint = createMint; //# sourceMappingURL=createMint.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeMultisig.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeInitializeMultisigInstructionUnchecked = exports.decodeInitializeMultisigInstruction = exports.createInitializeMultisigInstruction = exports.initializeMultisigInstructionData = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
/** TODO: docs */ exports.initializeMultisigInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_1.u8)('m')
]);
/**
 * Construct an InitializeMultisig instruction
 *
 * @param account   Multisig account
 * @param signers   Full set of signers
 * @param m         Number of required signatures
 * @param programId SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createInitializeMultisigInstruction(account, signers, m, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    const keys = [
        {
            pubkey: account,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false
        }
    ];
    for (const signer of signers){
        keys.push({
            pubkey: signer instanceof web3_js_1.PublicKey ? signer : signer.publicKey,
            isSigner: false,
            isWritable: false
        });
    }
    const data = Buffer.alloc(exports.initializeMultisigInstructionData.span);
    exports.initializeMultisigInstructionData.encode({
        instruction: types_js_1.TokenInstruction.InitializeMultisig,
        m
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createInitializeMultisigInstruction = createInitializeMultisigInstruction;
/**
 * Decode an InitializeMultisig instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeInitializeMultisigInstruction(instruction, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.initializeMultisigInstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { account, rent, signers }, data } = decodeInitializeMultisigInstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.InitializeMultisig) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!account || !rent || !signers.length) throw new errors_js_1.TokenInvalidInstructionKeysError();
    // TODO: key checks?
    return {
        programId,
        keys: {
            account,
            rent,
            signers
        },
        data
    };
}
exports.decodeInitializeMultisigInstruction = decodeInitializeMultisigInstruction;
/**
 * Decode an InitializeMultisig instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeInitializeMultisigInstructionUnchecked({ programId, keys: [account, rent, ...signers], data }) {
    return {
        programId,
        keys: {
            account,
            rent,
            signers
        },
        data: exports.initializeMultisigInstructionData.decode(data)
    };
}
exports.decodeInitializeMultisigInstructionUnchecked = decodeInitializeMultisigInstructionUnchecked; //# sourceMappingURL=initializeMultisig.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/createMultisig.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createMultisig = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const initializeMultisig_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeMultisig.js [app-route] (ecmascript)");
const multisig_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/state/multisig.js [app-route] (ecmascript)");
/**
 * Create and initialize a new multisig
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction and initialization fees
 * @param signers        Full set of signers
 * @param m              Number of required signatures
 * @param keypair        Optional keypair, defaulting to a new random one
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Address of the new multisig
 */ function createMultisig(connection, payer, signers, m, keypair = web3_js_1.Keypair.generate(), confirmOptions, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const lamports = yield (0, multisig_js_1.getMinimumBalanceForRentExemptMultisig)(connection);
        const transaction = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: keypair.publicKey,
            space: multisig_js_1.MULTISIG_SIZE,
            lamports,
            programId
        }), (0, initializeMultisig_js_1.createInitializeMultisigInstruction)(keypair.publicKey, signers, m, programId));
        yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            keypair
        ], confirmOptions);
        return keypair.publicKey;
    });
}
exports.createMultisig = createMultisig; //# sourceMappingURL=createMultisig.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/createNativeMint.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createCreateNativeMintInstruction = exports.createNativeMintInstructionData = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
/** TODO: docs */ exports.createNativeMintInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction')
]);
/**
 * Construct a CreateNativeMint instruction
 *
 * @param account   New token account
 * @param mint      Mint account
 * @param owner     Owner of the new account
 * @param programId SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createCreateNativeMintInstruction(payer, nativeMintId = constants_js_1.NATIVE_MINT_2022, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    if (!(0, constants_js_1.programSupportsExtensions)(programId)) {
        throw new errors_js_1.TokenUnsupportedInstructionError();
    }
    const keys = [
        {
            pubkey: payer,
            isSigner: true,
            isWritable: true
        },
        {
            pubkey: nativeMintId,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: web3_js_1.SystemProgram.programId,
            isSigner: false,
            isWritable: false
        }
    ];
    const data = Buffer.alloc(exports.createNativeMintInstructionData.span);
    exports.createNativeMintInstructionData.encode({
        instruction: types_js_1.TokenInstruction.CreateNativeMint
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createCreateNativeMintInstruction = createCreateNativeMintInstruction; //# sourceMappingURL=createNativeMint.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/createNativeMint.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createNativeMint = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const createNativeMint_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/createNativeMint.js [app-route] (ecmascript)");
/**
 * Create native mint
 *
 * @param connection               Connection to use
 * @param payer                    Payer of the transaction and initialization fees
 * @param confirmOptions           Options for confirming the transaction
 * @param programId                SPL Token program account
 * @param nativeMint               Native mint id associated with program
 */ function createNativeMint(connection, payer, confirmOptions, nativeMint = constants_js_1.NATIVE_MINT_2022, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const transaction = new web3_js_1.Transaction().add((0, createNativeMint_js_1.createCreateNativeMintInstruction)(payer.publicKey, nativeMint, programId));
        yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer
        ], confirmOptions);
    });
}
exports.createNativeMint = createNativeMint; //# sourceMappingURL=createNativeMint.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/syncNative.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeSyncNativeInstructionUnchecked = exports.decodeSyncNativeInstruction = exports.createSyncNativeInstruction = exports.syncNativeInstructionData = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
/** TODO: docs */ exports.syncNativeInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction')
]);
/**
 * Construct a SyncNative instruction
 *
 * @param account   Native account to sync lamports from
 * @param programId SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createSyncNativeInstruction(account, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    const keys = [
        {
            pubkey: account,
            isSigner: false,
            isWritable: true
        }
    ];
    const data = Buffer.alloc(exports.syncNativeInstructionData.span);
    exports.syncNativeInstructionData.encode({
        instruction: types_js_1.TokenInstruction.SyncNative
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createSyncNativeInstruction = createSyncNativeInstruction;
/**
 * Decode a SyncNative instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeSyncNativeInstruction(instruction, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.syncNativeInstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { account }, data } = decodeSyncNativeInstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.SyncNative) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!account) throw new errors_js_1.TokenInvalidInstructionKeysError();
    // TODO: key checks?
    return {
        programId,
        keys: {
            account
        },
        data
    };
}
exports.decodeSyncNativeInstruction = decodeSyncNativeInstruction;
/**
 * Decode a SyncNative instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeSyncNativeInstructionUnchecked({ programId, keys: [account], data }) {
    return {
        programId,
        keys: {
            account
        },
        data: exports.syncNativeInstructionData.decode(data)
    };
}
exports.decodeSyncNativeInstructionUnchecked = decodeSyncNativeInstructionUnchecked; //# sourceMappingURL=syncNative.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/createWrappedNativeAccount.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createWrappedNativeAccount = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const associatedTokenAccount_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/associatedTokenAccount.js [app-route] (ecmascript)");
const initializeAccount_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeAccount.js [app-route] (ecmascript)");
const syncNative_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/syncNative.js [app-route] (ecmascript)");
const account_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/state/account.js [app-route] (ecmascript)");
const mint_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/state/mint.js [app-route] (ecmascript)");
const createAccount_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/createAccount.js [app-route] (ecmascript)");
/**
 * Create, initialize, and fund a new wrapped native SOL account
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction and initialization fees
 * @param owner          Owner of the new token account
 * @param amount         Number of lamports to wrap
 * @param keypair        Optional keypair, defaulting to the associated token account for the native mint and `owner`
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Address of the new wrapped native SOL account
 */ function createWrappedNativeAccount(connection, payer, owner, amount, keypair, confirmOptions, programId = constants_js_1.TOKEN_PROGRAM_ID, nativeMint = constants_js_1.NATIVE_MINT) {
    return __awaiter(this, void 0, void 0, function*() {
        // If the amount provided is explicitly 0 or NaN, just create the account without funding it
        if (!amount) return yield (0, createAccount_js_1.createAccount)(connection, payer, nativeMint, owner, keypair, confirmOptions, programId);
        // If a keypair isn't provided, create the account at the owner's ATA for the native mint and return its address
        if (!keypair) {
            const associatedToken = (0, mint_js_1.getAssociatedTokenAddressSync)(nativeMint, owner, false, programId, constants_js_1.ASSOCIATED_TOKEN_PROGRAM_ID);
            const transaction = new web3_js_1.Transaction().add((0, associatedTokenAccount_js_1.createAssociatedTokenAccountInstruction)(payer.publicKey, associatedToken, owner, nativeMint, programId, constants_js_1.ASSOCIATED_TOKEN_PROGRAM_ID), web3_js_1.SystemProgram.transfer({
                fromPubkey: payer.publicKey,
                toPubkey: associatedToken,
                lamports: amount
            }), (0, syncNative_js_1.createSyncNativeInstruction)(associatedToken, programId));
            yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
                payer
            ], confirmOptions);
            return associatedToken;
        }
        // Otherwise, create the account with the provided keypair and return its public key
        const lamports = yield (0, account_js_1.getMinimumBalanceForRentExemptAccount)(connection);
        const transaction = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: keypair.publicKey,
            space: account_js_1.ACCOUNT_SIZE,
            lamports,
            programId
        }), web3_js_1.SystemProgram.transfer({
            fromPubkey: payer.publicKey,
            toPubkey: keypair.publicKey,
            lamports: amount
        }), (0, initializeAccount_js_1.createInitializeAccountInstruction)(keypair.publicKey, nativeMint, owner, programId));
        yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            keypair
        ], confirmOptions);
        return keypair.publicKey;
    });
}
exports.createWrappedNativeAccount = createWrappedNativeAccount; //# sourceMappingURL=createWrappedNativeAccount.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/freezeAccount.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeFreezeAccountInstructionUnchecked = exports.decodeFreezeAccountInstruction = exports.createFreezeAccountInstruction = exports.freezeAccountInstructionData = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/internal.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
/** TODO: docs */ exports.freezeAccountInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction')
]);
/**
 * Construct a FreezeAccount instruction
 *
 * @param account      Account to freeze
 * @param mint         Mint account
 * @param authority    Mint freeze authority
 * @param multiSigners Signing accounts if `authority` is a multisig
 * @param programId    SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createFreezeAccountInstruction(account, mint, authority, multiSigners = [], programId = constants_js_1.TOKEN_PROGRAM_ID) {
    const keys = (0, internal_js_1.addSigners)([
        {
            pubkey: account,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: mint,
            isSigner: false,
            isWritable: false
        }
    ], authority, multiSigners);
    const data = Buffer.alloc(exports.freezeAccountInstructionData.span);
    exports.freezeAccountInstructionData.encode({
        instruction: types_js_1.TokenInstruction.FreezeAccount
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createFreezeAccountInstruction = createFreezeAccountInstruction;
/**
 * Decode a FreezeAccount instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeFreezeAccountInstruction(instruction, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.freezeAccountInstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { account, mint, authority, multiSigners }, data } = decodeFreezeAccountInstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.FreezeAccount) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!account || !mint || !authority) throw new errors_js_1.TokenInvalidInstructionKeysError();
    // TODO: key checks?
    return {
        programId,
        keys: {
            account,
            mint,
            authority,
            multiSigners
        },
        data
    };
}
exports.decodeFreezeAccountInstruction = decodeFreezeAccountInstruction;
/**
 * Decode a FreezeAccount instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeFreezeAccountInstructionUnchecked({ programId, keys: [account, mint, authority, ...multiSigners], data }) {
    return {
        programId,
        keys: {
            account,
            mint,
            authority,
            multiSigners
        },
        data: exports.freezeAccountInstructionData.decode(data)
    };
}
exports.decodeFreezeAccountInstructionUnchecked = decodeFreezeAccountInstructionUnchecked; //# sourceMappingURL=freezeAccount.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/freezeAccount.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.freezeAccount = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const freezeAccount_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/freezeAccount.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/internal.js [app-route] (ecmascript)");
/**
 * Freeze a token account
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction fees
 * @param account        Account to freeze
 * @param mint           Mint for the account
 * @param authority      Mint freeze authority
 * @param multiSigners   Signing accounts if `authority` is a multisig
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function freezeAccount(connection, payer, account, mint, authority, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [authorityPublicKey, signers] = (0, internal_js_1.getSigners)(authority, multiSigners);
        const transaction = new web3_js_1.Transaction().add((0, freezeAccount_js_1.createFreezeAccountInstruction)(account, mint, authorityPublicKey, multiSigners, programId));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.freezeAccount = freezeAccount; //# sourceMappingURL=freezeAccount.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/getOrCreateAssociatedTokenAccount.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getOrCreateAssociatedTokenAccount = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const associatedTokenAccount_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/associatedTokenAccount.js [app-route] (ecmascript)");
const account_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/state/account.js [app-route] (ecmascript)");
const mint_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/state/mint.js [app-route] (ecmascript)");
/**
 * Retrieve the associated token account, or create it if it doesn't exist
 *
 * @param connection               Connection to use
 * @param payer                    Payer of the transaction and initialization fees
 * @param mint                     Mint associated with the account to set or verify
 * @param owner                    Owner of the account to set or verify
 * @param allowOwnerOffCurve       Allow the owner account to be a PDA (Program Derived Address)
 * @param commitment               Desired level of commitment for querying the state
 * @param confirmOptions           Options for confirming the transaction
 * @param programId                SPL Token program account
 * @param associatedTokenProgramId SPL Associated Token program account
 *
 * @return Address of the new associated token account
 */ function getOrCreateAssociatedTokenAccount(connection, payer, mint, owner, allowOwnerOffCurve = false, commitment, confirmOptions, programId = constants_js_1.TOKEN_PROGRAM_ID, associatedTokenProgramId = constants_js_1.ASSOCIATED_TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const associatedToken = (0, mint_js_1.getAssociatedTokenAddressSync)(mint, owner, allowOwnerOffCurve, programId, associatedTokenProgramId);
        // This is the optimal logic, considering TX fee, client-side computation, RPC roundtrips and guaranteed idempotent.
        // Sadly we can't do this atomically.
        let account;
        try {
            account = yield (0, account_js_1.getAccount)(connection, associatedToken, commitment, programId);
        } catch (error) {
            // TokenAccountNotFoundError can be possible if the associated address has already received some lamports,
            // becoming a system account. Assuming program derived addressing is safe, this is the only case for the
            // TokenInvalidAccountOwnerError in this code path.
            if (error instanceof errors_js_1.TokenAccountNotFoundError || error instanceof errors_js_1.TokenInvalidAccountOwnerError) {
                // As this isn't atomic, it's possible others can create associated accounts meanwhile.
                try {
                    const transaction = new web3_js_1.Transaction().add((0, associatedTokenAccount_js_1.createAssociatedTokenAccountInstruction)(payer.publicKey, associatedToken, owner, mint, programId, associatedTokenProgramId));
                    yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
                        payer
                    ], confirmOptions);
                } catch (error) {
                // Ignore all errors; for now there is no API-compatible way to selectively ignore the expected
                // instruction error if the associated account exists already.
                }
                // Now this should always succeed
                account = yield (0, account_js_1.getAccount)(connection, associatedToken, commitment, programId);
            } else {
                throw error;
            }
        }
        if (!account.mint.equals(mint)) throw new errors_js_1.TokenInvalidMintError();
        if (!account.owner.equals(owner)) throw new errors_js_1.TokenInvalidOwnerError();
        return account;
    });
}
exports.getOrCreateAssociatedTokenAccount = getOrCreateAssociatedTokenAccount; //# sourceMappingURL=getOrCreateAssociatedTokenAccount.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/mintTo.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeMintToInstructionUnchecked = exports.decodeMintToInstruction = exports.createMintToInstruction = exports.mintToInstructionData = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/internal.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
/** TODO: docs */ exports.mintToInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_utils_1.u64)('amount')
]);
/**
 * Construct a MintTo instruction
 *
 * @param mint         Public key of the mint
 * @param destination  Address of the token account to mint to
 * @param authority    The mint authority
 * @param amount       Amount to mint
 * @param multiSigners Signing accounts if `authority` is a multisig
 * @param programId    SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createMintToInstruction(mint, destination, authority, amount, multiSigners = [], programId = constants_js_1.TOKEN_PROGRAM_ID) {
    const keys = (0, internal_js_1.addSigners)([
        {
            pubkey: mint,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: destination,
            isSigner: false,
            isWritable: true
        }
    ], authority, multiSigners);
    const data = Buffer.alloc(exports.mintToInstructionData.span);
    exports.mintToInstructionData.encode({
        instruction: types_js_1.TokenInstruction.MintTo,
        amount: BigInt(amount)
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createMintToInstruction = createMintToInstruction;
/**
 * Decode a MintTo instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeMintToInstruction(instruction, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.mintToInstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { mint, destination, authority, multiSigners }, data } = decodeMintToInstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.MintTo) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!mint || !destination || !authority) throw new errors_js_1.TokenInvalidInstructionKeysError();
    // TODO: key checks?
    return {
        programId,
        keys: {
            mint,
            destination,
            authority,
            multiSigners
        },
        data
    };
}
exports.decodeMintToInstruction = decodeMintToInstruction;
/**
 * Decode a MintTo instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeMintToInstructionUnchecked({ programId, keys: [mint, destination, authority, ...multiSigners], data }) {
    return {
        programId,
        keys: {
            mint,
            destination,
            authority,
            multiSigners
        },
        data: exports.mintToInstructionData.decode(data)
    };
}
exports.decodeMintToInstructionUnchecked = decodeMintToInstructionUnchecked; //# sourceMappingURL=mintTo.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/mintTo.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mintTo = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const mintTo_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/mintTo.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/internal.js [app-route] (ecmascript)");
/**
 * Mint tokens to an account
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction fees
 * @param mint           Mint for the account
 * @param destination    Address of the account to mint to
 * @param authority      Minting authority
 * @param amount         Amount to mint
 * @param multiSigners   Signing accounts if `authority` is a multisig
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function mintTo(connection, payer, mint, destination, authority, amount, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [authorityPublicKey, signers] = (0, internal_js_1.getSigners)(authority, multiSigners);
        const transaction = new web3_js_1.Transaction().add((0, mintTo_js_1.createMintToInstruction)(mint, destination, authorityPublicKey, amount, multiSigners, programId));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.mintTo = mintTo; //# sourceMappingURL=mintTo.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/mintToChecked.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeMintToCheckedInstructionUnchecked = exports.decodeMintToCheckedInstruction = exports.createMintToCheckedInstruction = exports.mintToCheckedInstructionData = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/internal.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
/** TODO: docs */ exports.mintToCheckedInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_utils_1.u64)('amount'),
    (0, buffer_layout_1.u8)('decimals')
]);
/**
 * Construct a MintToChecked instruction
 *
 * @param mint         Public key of the mint
 * @param destination  Address of the token account to mint to
 * @param authority    The mint authority
 * @param amount       Amount to mint
 * @param decimals     Number of decimals in amount to mint
 * @param multiSigners Signing accounts if `authority` is a multisig
 * @param programId    SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createMintToCheckedInstruction(mint, destination, authority, amount, decimals, multiSigners = [], programId = constants_js_1.TOKEN_PROGRAM_ID) {
    const keys = (0, internal_js_1.addSigners)([
        {
            pubkey: mint,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: destination,
            isSigner: false,
            isWritable: true
        }
    ], authority, multiSigners);
    const data = Buffer.alloc(exports.mintToCheckedInstructionData.span);
    exports.mintToCheckedInstructionData.encode({
        instruction: types_js_1.TokenInstruction.MintToChecked,
        amount: BigInt(amount),
        decimals
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createMintToCheckedInstruction = createMintToCheckedInstruction;
/**
 * Decode a MintToChecked instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeMintToCheckedInstruction(instruction, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.mintToCheckedInstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { mint, destination, authority, multiSigners }, data } = decodeMintToCheckedInstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.MintToChecked) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!mint || !destination || !authority) throw new errors_js_1.TokenInvalidInstructionKeysError();
    // TODO: key checks?
    return {
        programId,
        keys: {
            mint,
            destination,
            authority,
            multiSigners
        },
        data
    };
}
exports.decodeMintToCheckedInstruction = decodeMintToCheckedInstruction;
/**
 * Decode a MintToChecked instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeMintToCheckedInstructionUnchecked({ programId, keys: [mint, destination, authority, ...multiSigners], data }) {
    return {
        programId,
        keys: {
            mint,
            destination,
            authority,
            multiSigners
        },
        data: exports.mintToCheckedInstructionData.decode(data)
    };
}
exports.decodeMintToCheckedInstructionUnchecked = decodeMintToCheckedInstructionUnchecked; //# sourceMappingURL=mintToChecked.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/mintToChecked.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mintToChecked = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const mintToChecked_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/mintToChecked.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/internal.js [app-route] (ecmascript)");
/**
 * Mint tokens to an account, asserting the token mint and decimals
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction fees
 * @param mint           Mint for the account
 * @param destination    Address of the account to mint to
 * @param authority      Minting authority
 * @param amount         Amount to mint
 * @param decimals       Number of decimals in amount to mint
 * @param multiSigners   Signing accounts if `authority` is a multisig
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function mintToChecked(connection, payer, mint, destination, authority, amount, decimals, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [authorityPublicKey, signers] = (0, internal_js_1.getSigners)(authority, multiSigners);
        const transaction = new web3_js_1.Transaction().add((0, mintToChecked_js_1.createMintToCheckedInstruction)(mint, destination, authorityPublicKey, amount, decimals, multiSigners, programId));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.mintToChecked = mintToChecked; //# sourceMappingURL=mintToChecked.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/recoverNested.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.recoverNested = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const associatedTokenAccount_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/associatedTokenAccount.js [app-route] (ecmascript)");
const mint_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/state/mint.js [app-route] (ecmascript)");
/**
 * Recover funds funds in an associated token account which is owned by an associated token account
 *
 * @param connection               Connection to use
 * @param payer                    Payer of the transaction and initialization fees
 * @param owner                    Owner of original ATA
 * @param mint                     Mint for the original ATA
 * @param nestedMint               Mint for the nested ATA
 * @param confirmOptions           Options for confirming the transaction
 * @param programId                SPL Token program account
 * @param associatedTokenProgramId SPL Associated Token program account
 *
 * @return Signature of the confirmed transaction
 */ function recoverNested(connection, payer, owner, mint, nestedMint, confirmOptions, programId = constants_js_1.TOKEN_PROGRAM_ID, associatedTokenProgramId = constants_js_1.ASSOCIATED_TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const ownerAssociatedToken = (0, mint_js_1.getAssociatedTokenAddressSync)(mint, owner.publicKey, false, programId, associatedTokenProgramId);
        const destinationAssociatedToken = (0, mint_js_1.getAssociatedTokenAddressSync)(nestedMint, owner.publicKey, false, programId, associatedTokenProgramId);
        const nestedAssociatedToken = (0, mint_js_1.getAssociatedTokenAddressSync)(nestedMint, ownerAssociatedToken, true, programId, associatedTokenProgramId);
        const transaction = new web3_js_1.Transaction().add((0, associatedTokenAccount_js_1.createRecoverNestedInstruction)(nestedAssociatedToken, nestedMint, destinationAssociatedToken, ownerAssociatedToken, mint, owner.publicKey, programId, associatedTokenProgramId));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            owner
        ], confirmOptions);
    });
}
exports.recoverNested = recoverNested; //# sourceMappingURL=recoverNested.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/revoke.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeRevokeInstructionUnchecked = exports.decodeRevokeInstruction = exports.createRevokeInstruction = exports.revokeInstructionData = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/internal.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
/** TODO: docs */ exports.revokeInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction')
]);
/**
 * Construct a Revoke instruction
 *
 * @param account      Address of the token account
 * @param owner        Owner of the account
 * @param multiSigners Signing accounts if `owner` is a multisig
 * @param programId    SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createRevokeInstruction(account, owner, multiSigners = [], programId = constants_js_1.TOKEN_PROGRAM_ID) {
    const keys = (0, internal_js_1.addSigners)([
        {
            pubkey: account,
            isSigner: false,
            isWritable: true
        }
    ], owner, multiSigners);
    const data = Buffer.alloc(exports.revokeInstructionData.span);
    exports.revokeInstructionData.encode({
        instruction: types_js_1.TokenInstruction.Revoke
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createRevokeInstruction = createRevokeInstruction;
/**
 * Decode a Revoke instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeRevokeInstruction(instruction, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.revokeInstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { account, owner, multiSigners }, data } = decodeRevokeInstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.Revoke) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!account || !owner) throw new errors_js_1.TokenInvalidInstructionKeysError();
    // TODO: key checks?
    return {
        programId,
        keys: {
            account,
            owner,
            multiSigners
        },
        data
    };
}
exports.decodeRevokeInstruction = decodeRevokeInstruction;
/**
 * Decode a Revoke instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeRevokeInstructionUnchecked({ programId, keys: [account, owner, ...multiSigners], data }) {
    return {
        programId,
        keys: {
            account,
            owner,
            multiSigners
        },
        data: exports.revokeInstructionData.decode(data)
    };
}
exports.decodeRevokeInstructionUnchecked = decodeRevokeInstructionUnchecked; //# sourceMappingURL=revoke.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/revoke.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.revoke = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const revoke_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/revoke.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/internal.js [app-route] (ecmascript)");
/**
 * Revoke approval for the transfer of tokens from an account
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction fees
 * @param account        Address of the token account
 * @param owner          Owner of the account
 * @param multiSigners   Signing accounts if `owner` is a multisig
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function revoke(connection, payer, account, owner, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [ownerPublicKey, signers] = (0, internal_js_1.getSigners)(owner, multiSigners);
        const transaction = new web3_js_1.Transaction().add((0, revoke_js_1.createRevokeInstruction)(account, ownerPublicKey, multiSigners, programId));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.revoke = revoke; //# sourceMappingURL=revoke.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/setAuthority.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeSetAuthorityInstructionUnchecked = exports.decodeSetAuthorityInstruction = exports.createSetAuthorityInstruction = exports.setAuthorityInstructionData = exports.AuthorityType = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/internal.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
/** Authority types defined by the program */ var AuthorityType;
(function(AuthorityType) {
    AuthorityType[AuthorityType["MintTokens"] = 0] = "MintTokens";
    AuthorityType[AuthorityType["FreezeAccount"] = 1] = "FreezeAccount";
    AuthorityType[AuthorityType["AccountOwner"] = 2] = "AccountOwner";
    AuthorityType[AuthorityType["CloseAccount"] = 3] = "CloseAccount";
    AuthorityType[AuthorityType["TransferFeeConfig"] = 4] = "TransferFeeConfig";
    AuthorityType[AuthorityType["WithheldWithdraw"] = 5] = "WithheldWithdraw";
    AuthorityType[AuthorityType["CloseMint"] = 6] = "CloseMint";
    AuthorityType[AuthorityType["InterestRate"] = 7] = "InterestRate";
    AuthorityType[AuthorityType["PermanentDelegate"] = 8] = "PermanentDelegate";
    AuthorityType[AuthorityType["ConfidentialTransferMint"] = 9] = "ConfidentialTransferMint";
    AuthorityType[AuthorityType["TransferHookProgramId"] = 10] = "TransferHookProgramId";
    AuthorityType[AuthorityType["ConfidentialTransferFeeConfig"] = 11] = "ConfidentialTransferFeeConfig";
    AuthorityType[AuthorityType["MetadataPointer"] = 12] = "MetadataPointer";
})(AuthorityType || (exports.AuthorityType = AuthorityType = {}));
/** TODO: docs */ exports.setAuthorityInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_1.u8)('authorityType'),
    (0, buffer_layout_1.u8)('newAuthorityOption'),
    (0, buffer_layout_utils_1.publicKey)('newAuthority')
]);
/**
 * Construct a SetAuthority instruction
 *
 * @param account          Address of the token account
 * @param currentAuthority Current authority of the specified type
 * @param authorityType    Type of authority to set
 * @param newAuthority     New authority of the account
 * @param multiSigners     Signing accounts if `currentAuthority` is a multisig
 * @param programId        SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createSetAuthorityInstruction(account, currentAuthority, authorityType, newAuthority, multiSigners = [], programId = constants_js_1.TOKEN_PROGRAM_ID) {
    const keys = (0, internal_js_1.addSigners)([
        {
            pubkey: account,
            isSigner: false,
            isWritable: true
        }
    ], currentAuthority, multiSigners);
    const data = Buffer.alloc(exports.setAuthorityInstructionData.span);
    exports.setAuthorityInstructionData.encode({
        instruction: types_js_1.TokenInstruction.SetAuthority,
        authorityType,
        newAuthorityOption: newAuthority ? 1 : 0,
        newAuthority: newAuthority || new web3_js_1.PublicKey(0)
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createSetAuthorityInstruction = createSetAuthorityInstruction;
/**
 * Decode a SetAuthority instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeSetAuthorityInstruction(instruction, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.setAuthorityInstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { account, currentAuthority, multiSigners }, data } = decodeSetAuthorityInstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.SetAuthority) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!account || !currentAuthority) throw new errors_js_1.TokenInvalidInstructionKeysError();
    // TODO: key checks?
    return {
        programId,
        keys: {
            account,
            currentAuthority,
            multiSigners
        },
        data
    };
}
exports.decodeSetAuthorityInstruction = decodeSetAuthorityInstruction;
/**
 * Decode a SetAuthority instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeSetAuthorityInstructionUnchecked({ programId, keys: [account, currentAuthority, ...multiSigners], data }) {
    const { instruction, authorityType, newAuthorityOption, newAuthority } = exports.setAuthorityInstructionData.decode(data);
    return {
        programId,
        keys: {
            account,
            currentAuthority,
            multiSigners
        },
        data: {
            instruction,
            authorityType,
            newAuthority: newAuthorityOption ? newAuthority : null
        }
    };
}
exports.decodeSetAuthorityInstructionUnchecked = decodeSetAuthorityInstructionUnchecked; //# sourceMappingURL=setAuthority.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/setAuthority.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setAuthority = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const setAuthority_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/setAuthority.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/internal.js [app-route] (ecmascript)");
/**
 * Assign a new authority to the account
 *
 * @param connection       Connection to use
 * @param payer            Payer of the transaction fees
 * @param account          Address of the account
 * @param currentAuthority Current authority of the specified type
 * @param authorityType    Type of authority to set
 * @param newAuthority     New authority of the account
 * @param multiSigners     Signing accounts if `currentAuthority` is a multisig
 * @param confirmOptions   Options for confirming the transaction
 * @param programId        SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function setAuthority(connection, payer, account, currentAuthority, authorityType, newAuthority, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [currentAuthorityPublicKey, signers] = (0, internal_js_1.getSigners)(currentAuthority, multiSigners);
        const transaction = new web3_js_1.Transaction().add((0, setAuthority_js_1.createSetAuthorityInstruction)(account, currentAuthorityPublicKey, authorityType, newAuthority, multiSigners, programId));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.setAuthority = setAuthority; //# sourceMappingURL=setAuthority.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/syncNative.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.syncNative = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const syncNative_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/syncNative.js [app-route] (ecmascript)");
/**
 * Sync the balance of a native SPL token account to the underlying system account's lamports
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction fees
 * @param account        Native account to sync
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function syncNative(connection, payer, account, confirmOptions, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const transaction = new web3_js_1.Transaction().add((0, syncNative_js_1.createSyncNativeInstruction)(account, programId));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer
        ], confirmOptions);
    });
}
exports.syncNative = syncNative; //# sourceMappingURL=syncNative.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/thawAccount.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeThawAccountInstructionUnchecked = exports.decodeThawAccountInstruction = exports.createThawAccountInstruction = exports.thawAccountInstructionData = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/internal.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
/** TODO: docs */ exports.thawAccountInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction')
]);
/**
 * Construct a ThawAccount instruction
 *
 * @param account      Account to thaw
 * @param mint         Mint account
 * @param authority    Mint freeze authority
 * @param multiSigners Signing accounts if `authority` is a multisig
 * @param programId    SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createThawAccountInstruction(account, mint, authority, multiSigners = [], programId = constants_js_1.TOKEN_PROGRAM_ID) {
    const keys = (0, internal_js_1.addSigners)([
        {
            pubkey: account,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: mint,
            isSigner: false,
            isWritable: false
        }
    ], authority, multiSigners);
    const data = Buffer.alloc(exports.thawAccountInstructionData.span);
    exports.thawAccountInstructionData.encode({
        instruction: types_js_1.TokenInstruction.ThawAccount
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createThawAccountInstruction = createThawAccountInstruction;
/**
 * Decode a ThawAccount instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeThawAccountInstruction(instruction, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.thawAccountInstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { account, mint, authority, multiSigners }, data } = decodeThawAccountInstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.ThawAccount) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!account || !mint || !authority) throw new errors_js_1.TokenInvalidInstructionKeysError();
    // TODO: key checks?
    return {
        programId,
        keys: {
            account,
            mint,
            authority,
            multiSigners
        },
        data
    };
}
exports.decodeThawAccountInstruction = decodeThawAccountInstruction;
/**
 * Decode a ThawAccount instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeThawAccountInstructionUnchecked({ programId, keys: [account, mint, authority, ...multiSigners], data }) {
    return {
        programId,
        keys: {
            account,
            mint,
            authority,
            multiSigners
        },
        data: exports.thawAccountInstructionData.decode(data)
    };
}
exports.decodeThawAccountInstructionUnchecked = decodeThawAccountInstructionUnchecked; //# sourceMappingURL=thawAccount.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/thawAccount.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.thawAccount = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const thawAccount_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/thawAccount.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/internal.js [app-route] (ecmascript)");
/**
 * Thaw (unfreeze) a token account
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction fees
 * @param account        Account to thaw
 * @param mint           Mint for the account
 * @param authority      Mint freeze authority
 * @param multiSigners   Signing accounts if `authority` is a multisig
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function thawAccount(connection, payer, account, mint, authority, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [authorityPublicKey, signers] = (0, internal_js_1.getSigners)(authority, multiSigners);
        const transaction = new web3_js_1.Transaction().add((0, thawAccount_js_1.createThawAccountInstruction)(account, mint, authorityPublicKey, multiSigners, programId));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.thawAccount = thawAccount; //# sourceMappingURL=thawAccount.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/transfer.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeTransferInstructionUnchecked = exports.decodeTransferInstruction = exports.createTransferInstruction = exports.transferInstructionData = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/internal.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
/** TODO: docs */ exports.transferInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_utils_1.u64)('amount')
]);
/**
 * Construct a Transfer instruction
 *
 * @param source       Source account
 * @param destination  Destination account
 * @param owner        Owner of the source account
 * @param amount       Number of tokens to transfer
 * @param multiSigners Signing accounts if `owner` is a multisig
 * @param programId    SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createTransferInstruction(source, destination, owner, amount, multiSigners = [], programId = constants_js_1.TOKEN_PROGRAM_ID) {
    const keys = (0, internal_js_1.addSigners)([
        {
            pubkey: source,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: destination,
            isSigner: false,
            isWritable: true
        }
    ], owner, multiSigners);
    const data = Buffer.alloc(exports.transferInstructionData.span);
    exports.transferInstructionData.encode({
        instruction: types_js_1.TokenInstruction.Transfer,
        amount: BigInt(amount)
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createTransferInstruction = createTransferInstruction;
/**
 * Decode a Transfer instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeTransferInstruction(instruction, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.transferInstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { source, destination, owner, multiSigners }, data } = decodeTransferInstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.Transfer) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!source || !destination || !owner) throw new errors_js_1.TokenInvalidInstructionKeysError();
    // TODO: key checks?
    return {
        programId,
        keys: {
            source,
            destination,
            owner,
            multiSigners
        },
        data
    };
}
exports.decodeTransferInstruction = decodeTransferInstruction;
/**
 * Decode a Transfer instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeTransferInstructionUnchecked({ programId, keys: [source, destination, owner, ...multiSigners], data }) {
    return {
        programId,
        keys: {
            source,
            destination,
            owner,
            multiSigners
        },
        data: exports.transferInstructionData.decode(data)
    };
}
exports.decodeTransferInstructionUnchecked = decodeTransferInstructionUnchecked; //# sourceMappingURL=transfer.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/transfer.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.transfer = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const transfer_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/transfer.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/internal.js [app-route] (ecmascript)");
/**
 * Transfer tokens from one account to another
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction fees
 * @param source         Source account
 * @param destination    Destination account
 * @param owner          Owner of the source account
 * @param amount         Number of tokens to transfer
 * @param multiSigners   Signing accounts if `owner` is a multisig
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function transfer(connection, payer, source, destination, owner, amount, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [ownerPublicKey, signers] = (0, internal_js_1.getSigners)(owner, multiSigners);
        const transaction = new web3_js_1.Transaction().add((0, transfer_js_1.createTransferInstruction)(source, destination, ownerPublicKey, amount, multiSigners, programId));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.transfer = transfer; //# sourceMappingURL=transfer.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/transferChecked.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.transferChecked = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const transferChecked_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/transferChecked.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/internal.js [app-route] (ecmascript)");
/**
 * Transfer tokens from one account to another, asserting the token mint and decimals
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction fees
 * @param source         Source account
 * @param mint           Mint for the account
 * @param destination    Destination account
 * @param owner          Owner of the source account
 * @param amount         Number of tokens to transfer
 * @param decimals       Number of decimals in transfer amount
 * @param multiSigners   Signing accounts if `owner` is a multisig
 * @param confirmOptions Options for confirming the transaction
 * @param programId      SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function transferChecked(connection, payer, source, mint, destination, owner, amount, decimals, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [ownerPublicKey, signers] = (0, internal_js_1.getSigners)(owner, multiSigners);
        const transaction = new web3_js_1.Transaction().add((0, transferChecked_js_1.createTransferCheckedInstruction)(source, mint, destination, ownerPublicKey, amount, decimals, multiSigners, programId));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.transferChecked = transferChecked; //# sourceMappingURL=transferChecked.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/uiAmountToAmount.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeUiAmountToAmountInstructionUnchecked = exports.decodeUiAmountToAmountInstruction = exports.createUiAmountToAmountInstruction = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
/** TODO: docs */ /**
 * Construct a UiAmountToAmount instruction
 *
 * @param mint         Public key of the mint
 * @param amount       UiAmount of tokens to be converted to Amount
 * @param programId    SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createUiAmountToAmountInstruction(mint, amount, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    const keys = [
        {
            pubkey: mint,
            isSigner: false,
            isWritable: false
        }
    ];
    const buf = Buffer.from(amount, 'utf8');
    const uiAmountToAmountInstructionData = (0, buffer_layout_1.struct)([
        (0, buffer_layout_1.u8)('instruction'),
        (0, buffer_layout_1.blob)(buf.length, 'amount')
    ]);
    const data = Buffer.alloc(uiAmountToAmountInstructionData.span);
    uiAmountToAmountInstructionData.encode({
        instruction: types_js_1.TokenInstruction.UiAmountToAmount,
        amount: buf
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createUiAmountToAmountInstruction = createUiAmountToAmountInstruction;
/**
 * Decode a UiAmountToAmount instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeUiAmountToAmountInstruction(instruction, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    const uiAmountToAmountInstructionData = (0, buffer_layout_1.struct)([
        (0, buffer_layout_1.u8)('instruction'),
        (0, buffer_layout_1.blob)(instruction.data.length - 1, 'amount')
    ]);
    if (instruction.data.length !== uiAmountToAmountInstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { mint }, data } = decodeUiAmountToAmountInstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.UiAmountToAmount) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!mint) throw new errors_js_1.TokenInvalidInstructionKeysError();
    return {
        programId,
        keys: {
            mint
        },
        data
    };
}
exports.decodeUiAmountToAmountInstruction = decodeUiAmountToAmountInstruction;
/**
 * Decode a UiAmountToAmount instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeUiAmountToAmountInstructionUnchecked({ programId, keys: [mint], data }) {
    const uiAmountToAmountInstructionData = (0, buffer_layout_1.struct)([
        (0, buffer_layout_1.u8)('instruction'),
        (0, buffer_layout_1.blob)(data.length - 1, 'amount')
    ]);
    return {
        programId,
        keys: {
            mint
        },
        data: uiAmountToAmountInstructionData.decode(data)
    };
}
exports.decodeUiAmountToAmountInstructionUnchecked = decodeUiAmountToAmountInstructionUnchecked; //# sourceMappingURL=uiAmountToAmount.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/uiAmountToAmount.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.uiAmountToAmount = void 0;
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const uiAmountToAmount_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/uiAmountToAmount.js [app-route] (ecmascript)");
/**
 * Amount as a string using mint-prescribed decimals
 *
 * @param connection     Connection to use
 * @param payer          Payer of the transaction fees
 * @param mint           Mint for the account
 * @param amount         Ui Amount of tokens to be converted to Amount
 * @param programId      SPL Token program account
 *
 * @return Ui Amount generated
 */ function uiAmountToAmount(connection, payer, mint, amount, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const transaction = new web3_js_1.Transaction().add((0, uiAmountToAmount_js_1.createUiAmountToAmountInstruction)(mint, amount, programId));
        const { returnData, err } = (yield connection.simulateTransaction(transaction, [
            payer
        ], false)).value;
        if (returnData) {
            const data = Buffer.from(returnData.data[0], returnData.data[1]);
            return (0, buffer_layout_utils_1.u64)().decode(data);
        }
        return err;
    });
}
exports.uiAmountToAmount = uiAmountToAmount; //# sourceMappingURL=uiAmountToAmount.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/amountToUiAmount.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/approve.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/approveChecked.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/burn.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/burnChecked.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/closeAccount.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/createAccount.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/createAssociatedTokenAccount.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/createAssociatedTokenAccountIdempotent.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/createMint.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/createMultisig.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/createNativeMint.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/createWrappedNativeAccount.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/freezeAccount.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/getOrCreateAssociatedTokenAccount.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/mintTo.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/mintToChecked.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/recoverNested.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/revoke.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/setAuthority.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/syncNative.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/thawAccount.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/transfer.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/transferChecked.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/uiAmountToAmount.js [app-route] (ecmascript)"), exports); //# sourceMappingURL=index.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeMint.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeInitializeMintInstructionUnchecked = exports.decodeInitializeMintInstruction = exports.createInitializeMintInstruction = exports.initializeMintInstructionData = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
/** TODO: docs */ exports.initializeMintInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_1.u8)('decimals'),
    (0, buffer_layout_utils_1.publicKey)('mintAuthority'),
    (0, buffer_layout_1.u8)('freezeAuthorityOption'),
    (0, buffer_layout_utils_1.publicKey)('freezeAuthority')
]);
/**
 * Construct an InitializeMint instruction
 *
 * @param mint            Token mint account
 * @param decimals        Number of decimals in token account amounts
 * @param mintAuthority   Minting authority
 * @param freezeAuthority Optional authority that can freeze token accounts
 * @param programId       SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createInitializeMintInstruction(mint, decimals, mintAuthority, freezeAuthority, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    const keys = [
        {
            pubkey: mint,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false
        }
    ];
    const data = Buffer.alloc(exports.initializeMintInstructionData.span);
    exports.initializeMintInstructionData.encode({
        instruction: types_js_1.TokenInstruction.InitializeMint,
        decimals,
        mintAuthority,
        freezeAuthorityOption: freezeAuthority ? 1 : 0,
        freezeAuthority: freezeAuthority || new web3_js_1.PublicKey(0)
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createInitializeMintInstruction = createInitializeMintInstruction;
/**
 * Decode an InitializeMint instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeInitializeMintInstruction(instruction, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.initializeMintInstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { mint, rent }, data } = decodeInitializeMintInstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.InitializeMint) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!mint || !rent) throw new errors_js_1.TokenInvalidInstructionKeysError();
    // TODO: key checks?
    return {
        programId,
        keys: {
            mint,
            rent
        },
        data
    };
}
exports.decodeInitializeMintInstruction = decodeInitializeMintInstruction;
/**
 * Decode an InitializeMint instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeInitializeMintInstructionUnchecked({ programId, keys: [mint, rent], data }) {
    const { instruction, decimals, mintAuthority, freezeAuthorityOption, freezeAuthority } = exports.initializeMintInstructionData.decode(data);
    return {
        programId,
        keys: {
            mint,
            rent
        },
        data: {
            instruction,
            decimals,
            mintAuthority,
            freezeAuthority: freezeAuthorityOption ? freezeAuthority : null
        }
    };
}
exports.decodeInitializeMintInstructionUnchecked = decodeInitializeMintInstructionUnchecked; //# sourceMappingURL=initializeMint.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/interestBearingMint/instructions.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createUpdateRateInterestBearingMintInstruction = exports.createInitializeInterestBearingMintInstruction = exports.interestBearingMintUpdateRateInstructionData = exports.interestBearingMintInitializeInstructionData = exports.InterestBearingMintInstruction = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/internal.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
var InterestBearingMintInstruction;
(function(InterestBearingMintInstruction) {
    InterestBearingMintInstruction[InterestBearingMintInstruction["Initialize"] = 0] = "Initialize";
    InterestBearingMintInstruction[InterestBearingMintInstruction["UpdateRate"] = 1] = "UpdateRate";
})(InterestBearingMintInstruction || (exports.InterestBearingMintInstruction = InterestBearingMintInstruction = {}));
exports.interestBearingMintInitializeInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_1.u8)('interestBearingMintInstruction'),
    // TODO: Make this an optional public key
    (0, buffer_layout_utils_1.publicKey)('rateAuthority'),
    (0, buffer_layout_1.s16)('rate')
]);
exports.interestBearingMintUpdateRateInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_1.u8)('interestBearingMintInstruction'),
    (0, buffer_layout_1.s16)('rate')
]);
/**
 * Construct an InitializeInterestBearingMint instruction
 *
 * @param mint           Mint to initialize
 * @param rateAuthority  The public key for the account that can update the rate
 * @param rate           The initial interest rate
 * @param programId      SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createInitializeInterestBearingMintInstruction(mint, rateAuthority, rate, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    const keys = [
        {
            pubkey: mint,
            isSigner: false,
            isWritable: true
        }
    ];
    const data = Buffer.alloc(exports.interestBearingMintInitializeInstructionData.span);
    exports.interestBearingMintInitializeInstructionData.encode({
        instruction: types_js_1.TokenInstruction.InterestBearingMintExtension,
        interestBearingMintInstruction: InterestBearingMintInstruction.Initialize,
        rateAuthority,
        rate
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createInitializeInterestBearingMintInstruction = createInitializeInterestBearingMintInstruction;
/**
 * Construct an UpdateRateInterestBearingMint instruction
 *
 * @param mint           Mint to initialize
 * @param rateAuthority  The public key for the account that can update the rate
 * @param rate           The updated interest rate
 * @param multiSigners   Signing accounts if `rateAuthority` is a multisig
 * @param programId      SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createUpdateRateInterestBearingMintInstruction(mint, rateAuthority, rate, multiSigners = [], programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    const keys = (0, internal_js_1.addSigners)([
        {
            pubkey: mint,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: rateAuthority,
            isSigner: !multiSigners.length,
            isWritable: false
        }
    ], rateAuthority, multiSigners);
    const data = Buffer.alloc(exports.interestBearingMintUpdateRateInstructionData.span);
    exports.interestBearingMintUpdateRateInstructionData.encode({
        instruction: types_js_1.TokenInstruction.InterestBearingMintExtension,
        interestBearingMintInstruction: InterestBearingMintInstruction.UpdateRate,
        rate
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createUpdateRateInterestBearingMintInstruction = createUpdateRateInterestBearingMintInstruction; //# sourceMappingURL=instructions.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/interestBearingMint/actions.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateRateInterestBearingMint = exports.createInterestBearingMint = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/internal.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const initializeMint_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeMint.js [app-route] (ecmascript)");
const extensionType_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/extensionType.js [app-route] (ecmascript)");
const instructions_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/interestBearingMint/instructions.js [app-route] (ecmascript)");
/**
 * Initialize an interest bearing account on a mint
 *
 * @param connection      Connection to use
 * @param payer           Payer of the transaction fees
 * @param mintAuthority   Account or multisig that will control minting
 * @param freezeAuthority Optional account or multisig that can freeze token accounts
 * @param rateAuthority   The public key for the account that can update the rate
 * @param rate            The initial interest rate
 * @param decimals        Location of the decimal place
 * @param keypair         Optional keypair, defaulting to a new random one
 * @param confirmOptions  Options for confirming the transaction
 * @param programId       SPL Token program account
 *
 * @return Public key of the mint
 */ function createInterestBearingMint(connection, payer, mintAuthority, freezeAuthority, rateAuthority, rate, decimals, keypair = web3_js_1.Keypair.generate(), confirmOptions, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const mintLen = (0, extensionType_js_1.getMintLen)([
            extensionType_js_1.ExtensionType.InterestBearingConfig
        ]);
        const lamports = yield connection.getMinimumBalanceForRentExemption(mintLen);
        const transaction = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: keypair.publicKey,
            space: mintLen,
            lamports,
            programId
        }), (0, instructions_js_1.createInitializeInterestBearingMintInstruction)(keypair.publicKey, rateAuthority, rate, programId), (0, initializeMint_js_1.createInitializeMintInstruction)(keypair.publicKey, decimals, mintAuthority, freezeAuthority, programId));
        yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            keypair
        ], confirmOptions);
        return keypair.publicKey;
    });
}
exports.createInterestBearingMint = createInterestBearingMint;
/**
 * Update the interest rate of an interest bearing account
 *
 * @param connection      Connection to use
 * @param payer           Payer of the transaction fees
 * @param mint            Public key of the mint
 * @param rateAuthority   The public key for the account that can update the rate
 * @param rate            The initial interest rate
 * @param multiSigners    Signing accounts if `owner` is a multisig
 * @param confirmOptions  Options for confirming the transaction
 * @param programId       SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function updateRateInterestBearingMint(connection, payer, mint, rateAuthority, rate, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [rateAuthorityPublicKey, signers] = (0, internal_js_1.getSigners)(rateAuthority, multiSigners);
        const transaction = new web3_js_1.Transaction().add((0, instructions_js_1.createUpdateRateInterestBearingMintInstruction)(mint, rateAuthorityPublicKey, rate, signers, programId));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            rateAuthority,
            ...signers
        ], confirmOptions);
    });
}
exports.updateRateInterestBearingMint = updateRateInterestBearingMint; //# sourceMappingURL=actions.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/interestBearingMint/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/interestBearingMint/actions.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/interestBearingMint/instructions.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/interestBearingMint/state.js [app-route] (ecmascript)"), exports); //# sourceMappingURL=index.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/metadataPointer/instructions.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createUpdateMetadataPointerInstruction = exports.updateMetadataPointerData = exports.createInitializeMetadataPointerInstruction = exports.initializeMetadataPointerData = exports.MetadataPointerInstruction = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/internal.js [app-route] (ecmascript)");
var MetadataPointerInstruction;
(function(MetadataPointerInstruction) {
    MetadataPointerInstruction[MetadataPointerInstruction["Initialize"] = 0] = "Initialize";
    MetadataPointerInstruction[MetadataPointerInstruction["Update"] = 1] = "Update";
})(MetadataPointerInstruction || (exports.MetadataPointerInstruction = MetadataPointerInstruction = {}));
exports.initializeMetadataPointerData = (0, buffer_layout_1.struct)([
    // prettier-ignore
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_1.u8)('metadataPointerInstruction'),
    (0, buffer_layout_utils_1.publicKey)('authority'),
    (0, buffer_layout_utils_1.publicKey)('metadataAddress')
]);
/**
 * Construct an Initialize MetadataPointer instruction
 *
 * @param mint            Token mint account
 * @param authority       Optional Authority that can set the metadata address
 * @param metadataAddress Optional Account address that holds the metadata
 * @param programId       SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createInitializeMetadataPointerInstruction(mint, authority, metadataAddress, programId) {
    if (!(0, constants_js_1.programSupportsExtensions)(programId)) {
        throw new errors_js_1.TokenUnsupportedInstructionError();
    }
    const keys = [
        {
            pubkey: mint,
            isSigner: false,
            isWritable: true
        }
    ];
    const data = Buffer.alloc(exports.initializeMetadataPointerData.span);
    exports.initializeMetadataPointerData.encode({
        instruction: types_js_1.TokenInstruction.MetadataPointerExtension,
        metadataPointerInstruction: MetadataPointerInstruction.Initialize,
        authority: authority !== null && authority !== void 0 ? authority : web3_js_1.PublicKey.default,
        metadataAddress: metadataAddress !== null && metadataAddress !== void 0 ? metadataAddress : web3_js_1.PublicKey.default
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data: data
    });
}
exports.createInitializeMetadataPointerInstruction = createInitializeMetadataPointerInstruction;
exports.updateMetadataPointerData = (0, buffer_layout_1.struct)([
    // prettier-ignore
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_1.u8)('metadataPointerInstruction'),
    (0, buffer_layout_utils_1.publicKey)('metadataAddress')
]);
function createUpdateMetadataPointerInstruction(mint, authority, metadataAddress, multiSigners = [], programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    if (!(0, constants_js_1.programSupportsExtensions)(programId)) {
        throw new errors_js_1.TokenUnsupportedInstructionError();
    }
    const keys = (0, internal_js_1.addSigners)([
        {
            pubkey: mint,
            isSigner: false,
            isWritable: true
        }
    ], authority, multiSigners);
    const data = Buffer.alloc(exports.updateMetadataPointerData.span);
    exports.updateMetadataPointerData.encode({
        instruction: types_js_1.TokenInstruction.MetadataPointerExtension,
        metadataPointerInstruction: MetadataPointerInstruction.Update,
        metadataAddress: metadataAddress !== null && metadataAddress !== void 0 ? metadataAddress : web3_js_1.PublicKey.default
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data: data
    });
}
exports.createUpdateMetadataPointerInstruction = createUpdateMetadataPointerInstruction; //# sourceMappingURL=instructions.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/metadataPointer/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/metadataPointer/instructions.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/metadataPointer/state.js [app-route] (ecmascript)"), exports); //# sourceMappingURL=index.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/tokenMetadata/state.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getTokenMetadata = exports.updateTokenMetadata = void 0;
const spl_token_metadata_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token-metadata@0.1.6_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token-metadata/lib/cjs/index.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const extensionType_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/extensionType.js [app-route] (ecmascript)");
const mint_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/state/mint.js [app-route] (ecmascript)");
const getNormalizedTokenMetadataField = (field)=>{
    if (field === spl_token_metadata_1.Field.Name || field === 'Name' || field === 'name') {
        return 'name';
    }
    if (field === spl_token_metadata_1.Field.Symbol || field === 'Symbol' || field === 'symbol') {
        return 'symbol';
    }
    if (field === spl_token_metadata_1.Field.Uri || field === 'Uri' || field === 'uri') {
        return 'uri';
    }
    return field;
};
function updateTokenMetadata(current, key, value) {
    const field = getNormalizedTokenMetadataField(key);
    if (field === 'mint' || field === 'updateAuthority') {
        throw new Error(`Cannot update ${field} via this instruction`);
    }
    // Handle updates to default keys
    if ([
        'name',
        'symbol',
        'uri'
    ].includes(field)) {
        return Object.assign(Object.assign({}, current), {
            [field]: value
        });
    }
    // Avoid mutating input, make a shallow copy
    const additionalMetadata = [
        ...current.additionalMetadata
    ];
    const i = current.additionalMetadata.findIndex((x)=>x[0] === field);
    if (i === -1) {
        // Key was not found, add it
        additionalMetadata.push([
            field,
            value
        ]);
    } else {
        // Key was found, change value
        additionalMetadata[i] = [
            field,
            value
        ];
    }
    return Object.assign(Object.assign({}, current), {
        additionalMetadata
    });
}
exports.updateTokenMetadata = updateTokenMetadata;
/**
 * Retrieve Token Metadata Information
 *
 * @param connection Connection to use
 * @param address    Mint account
 * @param commitment Desired level of commitment for querying the state
 * @param programId  SPL Token program account
 *
 * @return Token Metadata information
 */ function getTokenMetadata(connection, address, commitment, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const mintInfo = yield (0, mint_js_1.getMint)(connection, address, commitment, programId);
        const data = (0, extensionType_js_1.getExtensionData)(extensionType_js_1.ExtensionType.TokenMetadata, mintInfo.tlvData);
        if (data === null) {
            return null;
        }
        return (0, spl_token_metadata_1.unpack)(data);
    });
}
exports.getTokenMetadata = getTokenMetadata; //# sourceMappingURL=state.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/state/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/state/account.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/state/mint.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/state/multisig.js [app-route] (ecmascript)"), exports); //# sourceMappingURL=index.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/tokenMetadata/actions.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tokenMetadataUpdateAuthority = exports.tokenMetadataRemoveKey = exports.tokenMetadataUpdateFieldWithRentTransfer = exports.tokenMetadataUpdateField = exports.tokenMetadataInitializeWithRentTransfer = exports.tokenMetadataInitialize = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const spl_token_metadata_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token-metadata@0.1.6_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token-metadata/lib/cjs/index.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/internal.js [app-route] (ecmascript)");
const extensionType_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/extensionType.js [app-route] (ecmascript)");
const state_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/tokenMetadata/state.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const index_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/state/index.js [app-route] (ecmascript)");
function getAdditionalRentForNewMetadata(connection, address, tokenMetadata, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const info = yield connection.getAccountInfo(address);
        if (!info) {
            throw new errors_js_1.TokenAccountNotFoundError();
        }
        const extensionLen = (0, spl_token_metadata_1.pack)(tokenMetadata).length;
        const newAccountLen = (0, extensionType_js_1.getNewAccountLenForExtensionLen)(info, address, extensionType_js_1.ExtensionType.TokenMetadata, extensionLen, programId);
        if (newAccountLen <= info.data.length) {
            return 0;
        }
        const newRentExemptMinimum = yield connection.getMinimumBalanceForRentExemption(newAccountLen);
        return newRentExemptMinimum - info.lamports;
    });
}
function getAdditionalRentForUpdatedMetadata(connection, address, field, value, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const info = yield connection.getAccountInfo(address);
        if (!info) {
            throw new errors_js_1.TokenAccountNotFoundError();
        }
        const mint = (0, index_js_1.unpackMint)(address, info, programId);
        const extensionData = (0, extensionType_js_1.getExtensionData)(extensionType_js_1.ExtensionType.TokenMetadata, mint.tlvData);
        if (extensionData === null) {
            throw new Error('TokenMetadata extension not initialized');
        }
        const updatedTokenMetadata = (0, state_js_1.updateTokenMetadata)((0, spl_token_metadata_1.unpack)(extensionData), field, value);
        const extensionLen = (0, spl_token_metadata_1.pack)(updatedTokenMetadata).length;
        const newAccountLen = (0, extensionType_js_1.getNewAccountLenForExtensionLen)(info, address, extensionType_js_1.ExtensionType.TokenMetadata, extensionLen, programId);
        if (newAccountLen <= info.data.length) {
            return 0;
        }
        const newRentExemptMinimum = yield connection.getMinimumBalanceForRentExemption(newAccountLen);
        return newRentExemptMinimum - info.lamports;
    });
}
/**
 * Initializes a TLV entry with the basic token-metadata fields.
 *
 * @param connection       Connection to use
 * @param payer            Payer of the transaction fees
 * @param mint             Mint Account
 * @param updateAuthority  Update Authority
 * @param mintAuthority    Mint Authority
 * @param name             Longer name of token
 * @param symbol           Shortened symbol of token
 * @param uri              URI pointing to more metadata (image, video, etc)
 * @param multiSigners     Signing accounts if `authority` is a multisig
 * @param confirmOptions   Options for confirming the transaction
 * @param programId        SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function tokenMetadataInitialize(connection, payer, mint, updateAuthority, mintAuthority, name, symbol, uri, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [mintAuthorityPublicKey, signers] = (0, internal_js_1.getSigners)(mintAuthority, multiSigners);
        const transaction = new web3_js_1.Transaction().add((0, spl_token_metadata_1.createInitializeInstruction)({
            programId,
            metadata: mint,
            updateAuthority,
            mint,
            mintAuthority: mintAuthorityPublicKey,
            name,
            symbol,
            uri
        }));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.tokenMetadataInitialize = tokenMetadataInitialize;
/**
 * Initializes a TLV entry with the basic token-metadata fields,
 * Includes a transfer for any additional rent-exempt SOL if required.
 *
 * @param connection       Connection to use
 * @param payer            Payer of the transaction fees
 * @param mint             Mint Account
 * @param updateAuthority  Update Authority
 * @param mintAuthority    Mint Authority
 * @param name             Longer name of token
 * @param symbol           Shortened symbol of token
 * @param uri              URI pointing to more metadata (image, video, etc)
 * @param multiSigners     Signing accounts if `authority` is a multisig
 * @param confirmOptions   Options for confirming the transaction
 * @param programId        SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function tokenMetadataInitializeWithRentTransfer(connection, payer, mint, updateAuthority, mintAuthority, name, symbol, uri, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [mintAuthorityPublicKey, signers] = (0, internal_js_1.getSigners)(mintAuthority, multiSigners);
        const transaction = new web3_js_1.Transaction();
        const lamports = yield getAdditionalRentForNewMetadata(connection, mint, {
            updateAuthority,
            mint,
            name,
            symbol,
            uri,
            additionalMetadata: []
        }, programId);
        if (lamports > 0) {
            transaction.add(web3_js_1.SystemProgram.transfer({
                fromPubkey: payer.publicKey,
                toPubkey: mint,
                lamports: lamports
            }));
        }
        transaction.add((0, spl_token_metadata_1.createInitializeInstruction)({
            programId,
            metadata: mint,
            updateAuthority,
            mint,
            mintAuthority: mintAuthorityPublicKey,
            name,
            symbol,
            uri
        }));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.tokenMetadataInitializeWithRentTransfer = tokenMetadataInitializeWithRentTransfer;
/**
 * Updates a field in a token-metadata account.
 * If the field does not exist on the account, it will be created.
 * If the field does exist, it will be overwritten.
 *
 * The field can be one of the required fields (name, symbol, URI), or a
 * totally new field denoted by a "key" string.
 * @param connection       Connection to use
 * @param payer            Payer of the transaction fees
 * @param mint             Mint Account
 * @param updateAuthority  Update Authority
 * @param field            Field to update in the metadata
 * @param value            Value to write for the field
 * @param multiSigners     Signing accounts if `authority` is a multisig
 * @param confirmOptions   Options for confirming the transaction
 * @param programId        SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function tokenMetadataUpdateField(connection, payer, mint, updateAuthority, field, value, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [updateAuthorityPublicKey, signers] = (0, internal_js_1.getSigners)(updateAuthority, multiSigners);
        const transaction = new web3_js_1.Transaction().add((0, spl_token_metadata_1.createUpdateFieldInstruction)({
            programId,
            metadata: mint,
            updateAuthority: updateAuthorityPublicKey,
            field,
            value
        }));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.tokenMetadataUpdateField = tokenMetadataUpdateField;
/**
 * Updates a field in a token-metadata account.
 * If the field does not exist on the account, it will be created.
 * If the field does exist, it will be overwritten.
 * Includes a transfer for any additional rent-exempt SOL if required.
 *
 * The field can be one of the required fields (name, symbol, URI), or a
 * totally new field denoted by a "key" string.
 * @param connection       Connection to use
 * @param payer            Payer of the transaction fees
 * @param mint             Mint Account
 * @param updateAuthority  Update Authority
 * @param field            Field to update in the metadata
 * @param value            Value to write for the field
 * @param multiSigners     Signing accounts if `authority` is a multisig
 * @param confirmOptions   Options for confirming the transaction
 * @param programId        SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function tokenMetadataUpdateFieldWithRentTransfer(connection, payer, mint, updateAuthority, field, value, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [updateAuthorityPublicKey, signers] = (0, internal_js_1.getSigners)(updateAuthority, multiSigners);
        const transaction = new web3_js_1.Transaction();
        const lamports = yield getAdditionalRentForUpdatedMetadata(connection, mint, field, value, programId);
        if (lamports > 0) {
            transaction.add(web3_js_1.SystemProgram.transfer({
                fromPubkey: payer.publicKey,
                toPubkey: mint,
                lamports: lamports
            }));
        }
        transaction.add((0, spl_token_metadata_1.createUpdateFieldInstruction)({
            programId,
            metadata: mint,
            updateAuthority: updateAuthorityPublicKey,
            field,
            value
        }));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.tokenMetadataUpdateFieldWithRentTransfer = tokenMetadataUpdateFieldWithRentTransfer;
/**
 * Remove a field in a token-metadata account.
 *
 * The field can be one of the required fields (name, symbol, URI), or a
 * totally new field denoted by a "key" string.
 * @param connection       Connection to use
 * @param payer            Payer of the transaction fees
 * @param mint             Mint Account
 * @param updateAuthority  Update Authority
 * @param key              Key to remove in the additional metadata portion
 * @param idempotent       When true, instruction will not error if the key does not exist
 * @param multiSigners     Signing accounts if `authority` is a multisig
 * @param confirmOptions   Options for confirming the transaction
 * @param programId        SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function tokenMetadataRemoveKey(connection, payer, mint, updateAuthority, key, idempotent, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [updateAuthorityPublicKey, signers] = (0, internal_js_1.getSigners)(updateAuthority, multiSigners);
        const transaction = new web3_js_1.Transaction().add((0, spl_token_metadata_1.createRemoveKeyInstruction)({
            programId,
            metadata: mint,
            updateAuthority: updateAuthorityPublicKey,
            key,
            idempotent
        }));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.tokenMetadataRemoveKey = tokenMetadataRemoveKey;
/**
 *  Update authority
 *
 * @param connection       Connection to use
 * @param payer            Payer of the transaction fees
 * @param mint             Mint Account
 * @param updateAuthority  Update Authority
 * @param newAuthority     New authority for the token metadata, or unset
 * @param multiSigners     Signing accounts if `authority` is a multisig
 * @param confirmOptions   Options for confirming the transaction
 * @param programId        SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */ function tokenMetadataUpdateAuthority(connection, payer, mint, updateAuthority, newAuthority, multiSigners = [], confirmOptions, programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    return __awaiter(this, void 0, void 0, function*() {
        const [updateAuthorityPublicKey, signers] = (0, internal_js_1.getSigners)(updateAuthority, multiSigners);
        const transaction = new web3_js_1.Transaction().add((0, spl_token_metadata_1.createUpdateAuthorityInstruction)({
            programId,
            metadata: mint,
            oldAuthority: updateAuthorityPublicKey,
            newAuthority
        }));
        return yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            payer,
            ...signers
        ], confirmOptions);
    });
}
exports.tokenMetadataUpdateAuthority = tokenMetadataUpdateAuthority; //# sourceMappingURL=actions.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/tokenMetadata/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/tokenMetadata/actions.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/tokenMetadata/state.js [app-route] (ecmascript)"), exports); //# sourceMappingURL=index.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/accountType.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/cpiGuard/index.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/defaultAccountState/index.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/extensionType.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/immutableOwner.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/interestBearingMint/index.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/memoTransfer/index.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/metadataPointer/index.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/tokenMetadata/index.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/mintCloseAuthority.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/nonTransferable.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/transferFee/index.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/permanentDelegate.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/transferHook/index.js [app-route] (ecmascript)"), exports); //# sourceMappingURL=index.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeAccount2.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeInitializeAccount2InstructionUnchecked = exports.decodeInitializeAccount2Instruction = exports.createInitializeAccount2Instruction = exports.initializeAccount2InstructionData = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
exports.initializeAccount2InstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_utils_1.publicKey)('owner')
]);
/**
 * Construct an InitializeAccount2 instruction
 *
 * @param account   New token account
 * @param mint      Mint account
 * @param owner     New account's owner/multisignature
 * @param programId SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createInitializeAccount2Instruction(account, mint, owner, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    const keys = [
        {
            pubkey: account,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: mint,
            isSigner: false,
            isWritable: false
        },
        {
            pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false
        }
    ];
    const data = Buffer.alloc(exports.initializeAccount2InstructionData.span);
    exports.initializeAccount2InstructionData.encode({
        instruction: types_js_1.TokenInstruction.InitializeAccount2,
        owner
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createInitializeAccount2Instruction = createInitializeAccount2Instruction;
/**
 * Decode an InitializeAccount2 instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeInitializeAccount2Instruction(instruction, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.initializeAccount2InstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { account, mint, rent }, data } = decodeInitializeAccount2InstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.InitializeAccount2) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!account || !mint || !rent) throw new errors_js_1.TokenInvalidInstructionKeysError();
    // TODO: key checks?
    return {
        programId,
        keys: {
            account,
            mint,
            rent
        },
        data
    };
}
exports.decodeInitializeAccount2Instruction = decodeInitializeAccount2Instruction;
/**
 * Decode an InitializeAccount2 instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeInitializeAccount2InstructionUnchecked({ programId, keys: [account, mint, rent], data }) {
    return {
        programId,
        keys: {
            account,
            mint,
            rent
        },
        data: exports.initializeAccount2InstructionData.decode(data)
    };
}
exports.decodeInitializeAccount2InstructionUnchecked = decodeInitializeAccount2InstructionUnchecked; //# sourceMappingURL=initializeAccount2.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeAccount3.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeInitializeAccount3InstructionUnchecked = exports.decodeInitializeAccount3Instruction = exports.createInitializeAccount3Instruction = exports.initializeAccount3InstructionData = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
exports.initializeAccount3InstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_utils_1.publicKey)('owner')
]);
/**
 * Construct an InitializeAccount3 instruction
 *
 * @param account   New token account
 * @param mint      Mint account
 * @param owner     New account's owner/multisignature
 * @param programId SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createInitializeAccount3Instruction(account, mint, owner, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    const keys = [
        {
            pubkey: account,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: mint,
            isSigner: false,
            isWritable: false
        }
    ];
    const data = Buffer.alloc(exports.initializeAccount3InstructionData.span);
    exports.initializeAccount3InstructionData.encode({
        instruction: types_js_1.TokenInstruction.InitializeAccount3,
        owner
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createInitializeAccount3Instruction = createInitializeAccount3Instruction;
/**
 * Decode an InitializeAccount3 instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeInitializeAccount3Instruction(instruction, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.initializeAccount3InstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { account, mint }, data } = decodeInitializeAccount3InstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.InitializeAccount3) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!account || !mint) throw new errors_js_1.TokenInvalidInstructionKeysError();
    // TODO: key checks?
    return {
        programId,
        keys: {
            account,
            mint
        },
        data
    };
}
exports.decodeInitializeAccount3Instruction = decodeInitializeAccount3Instruction;
/**
 * Decode an InitializeAccount3 instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeInitializeAccount3InstructionUnchecked({ programId, keys: [account, mint], data }) {
    return {
        programId,
        keys: {
            account,
            mint
        },
        data: exports.initializeAccount3InstructionData.decode(data)
    };
}
exports.decodeInitializeAccount3InstructionUnchecked = decodeInitializeAccount3InstructionUnchecked; //# sourceMappingURL=initializeAccount3.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/decode.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isUiamountToAmountInstruction = exports.isAmountToUiAmountInstruction = exports.isInitializeMint2Instruction = exports.isInitializeAccount3Instruction = exports.isSyncNativeInstruction = exports.isInitializeAccount2Instruction = exports.isBurnCheckedInstruction = exports.isMintToCheckedInstruction = exports.isApproveCheckedInstruction = exports.isTransferCheckedInstruction = exports.isThawAccountInstruction = exports.isFreezeAccountInstruction = exports.isCloseAccountInstruction = exports.isBurnInstruction = exports.isMintToInstruction = exports.isSetAuthorityInstruction = exports.isRevokeInstruction = exports.isApproveInstruction = exports.isTransferInstruction = exports.isInitializeMultisigInstruction = exports.isInitializeAccountInstruction = exports.isInitializeMintInstruction = exports.decodeInstruction = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const amountToUiAmount_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/amountToUiAmount.js [app-route] (ecmascript)");
const approve_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/approve.js [app-route] (ecmascript)");
const approveChecked_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/approveChecked.js [app-route] (ecmascript)");
const burn_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/burn.js [app-route] (ecmascript)");
const burnChecked_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/burnChecked.js [app-route] (ecmascript)");
const closeAccount_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/closeAccount.js [app-route] (ecmascript)");
const freezeAccount_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/freezeAccount.js [app-route] (ecmascript)");
const initializeAccount_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeAccount.js [app-route] (ecmascript)");
const initializeAccount2_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeAccount2.js [app-route] (ecmascript)");
const initializeAccount3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeAccount3.js [app-route] (ecmascript)");
const initializeMint_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeMint.js [app-route] (ecmascript)");
const initializeMint2_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeMint2.js [app-route] (ecmascript)");
const initializeMultisig_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeMultisig.js [app-route] (ecmascript)");
const mintTo_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/mintTo.js [app-route] (ecmascript)");
const mintToChecked_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/mintToChecked.js [app-route] (ecmascript)");
const revoke_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/revoke.js [app-route] (ecmascript)");
const setAuthority_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/setAuthority.js [app-route] (ecmascript)");
const syncNative_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/syncNative.js [app-route] (ecmascript)");
const thawAccount_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/thawAccount.js [app-route] (ecmascript)");
const transfer_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/transfer.js [app-route] (ecmascript)");
const transferChecked_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/transferChecked.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
const uiAmountToAmount_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/uiAmountToAmount.js [app-route] (ecmascript)");
/** TODO: docs */ function decodeInstruction(instruction, programId = constants_js_1.TOKEN_PROGRAM_ID) {
    if (!instruction.data.length) throw new errors_js_1.TokenInvalidInstructionDataError();
    const type = (0, buffer_layout_1.u8)().decode(instruction.data);
    if (type === types_js_1.TokenInstruction.InitializeMint) return (0, initializeMint_js_1.decodeInitializeMintInstruction)(instruction, programId);
    if (type === types_js_1.TokenInstruction.InitializeAccount) return (0, initializeAccount_js_1.decodeInitializeAccountInstruction)(instruction, programId);
    if (type === types_js_1.TokenInstruction.InitializeMultisig) return (0, initializeMultisig_js_1.decodeInitializeMultisigInstruction)(instruction, programId);
    if (type === types_js_1.TokenInstruction.Transfer) return (0, transfer_js_1.decodeTransferInstruction)(instruction, programId);
    if (type === types_js_1.TokenInstruction.Approve) return (0, approve_js_1.decodeApproveInstruction)(instruction, programId);
    if (type === types_js_1.TokenInstruction.Revoke) return (0, revoke_js_1.decodeRevokeInstruction)(instruction, programId);
    if (type === types_js_1.TokenInstruction.SetAuthority) return (0, setAuthority_js_1.decodeSetAuthorityInstruction)(instruction, programId);
    if (type === types_js_1.TokenInstruction.MintTo) return (0, mintTo_js_1.decodeMintToInstruction)(instruction, programId);
    if (type === types_js_1.TokenInstruction.Burn) return (0, burn_js_1.decodeBurnInstruction)(instruction, programId);
    if (type === types_js_1.TokenInstruction.CloseAccount) return (0, closeAccount_js_1.decodeCloseAccountInstruction)(instruction, programId);
    if (type === types_js_1.TokenInstruction.FreezeAccount) return (0, freezeAccount_js_1.decodeFreezeAccountInstruction)(instruction, programId);
    if (type === types_js_1.TokenInstruction.ThawAccount) return (0, thawAccount_js_1.decodeThawAccountInstruction)(instruction, programId);
    if (type === types_js_1.TokenInstruction.TransferChecked) return (0, transferChecked_js_1.decodeTransferCheckedInstruction)(instruction, programId);
    if (type === types_js_1.TokenInstruction.ApproveChecked) return (0, approveChecked_js_1.decodeApproveCheckedInstruction)(instruction, programId);
    if (type === types_js_1.TokenInstruction.MintToChecked) return (0, mintToChecked_js_1.decodeMintToCheckedInstruction)(instruction, programId);
    if (type === types_js_1.TokenInstruction.BurnChecked) return (0, burnChecked_js_1.decodeBurnCheckedInstruction)(instruction, programId);
    if (type === types_js_1.TokenInstruction.InitializeAccount2) return (0, initializeAccount2_js_1.decodeInitializeAccount2Instruction)(instruction, programId);
    if (type === types_js_1.TokenInstruction.SyncNative) return (0, syncNative_js_1.decodeSyncNativeInstruction)(instruction, programId);
    if (type === types_js_1.TokenInstruction.InitializeAccount3) return (0, initializeAccount3_js_1.decodeInitializeAccount3Instruction)(instruction, programId);
    if (type === types_js_1.TokenInstruction.InitializeMint2) return (0, initializeMint2_js_1.decodeInitializeMint2Instruction)(instruction, programId);
    if (type === types_js_1.TokenInstruction.AmountToUiAmount) return (0, amountToUiAmount_js_1.decodeAmountToUiAmountInstruction)(instruction, programId);
    if (type === types_js_1.TokenInstruction.UiAmountToAmount) return (0, uiAmountToAmount_js_1.decodeUiAmountToAmountInstruction)(instruction, programId);
    // TODO: implement
    if (type === types_js_1.TokenInstruction.InitializeMultisig2) throw new errors_js_1.TokenInvalidInstructionTypeError();
    throw new errors_js_1.TokenInvalidInstructionTypeError();
}
exports.decodeInstruction = decodeInstruction;
/** TODO: docs */ function isInitializeMintInstruction(decoded) {
    return decoded.data.instruction === types_js_1.TokenInstruction.InitializeMint;
}
exports.isInitializeMintInstruction = isInitializeMintInstruction;
/** TODO: docs */ function isInitializeAccountInstruction(decoded) {
    return decoded.data.instruction === types_js_1.TokenInstruction.InitializeAccount;
}
exports.isInitializeAccountInstruction = isInitializeAccountInstruction;
/** TODO: docs */ function isInitializeMultisigInstruction(decoded) {
    return decoded.data.instruction === types_js_1.TokenInstruction.InitializeMultisig;
}
exports.isInitializeMultisigInstruction = isInitializeMultisigInstruction;
/** TODO: docs */ function isTransferInstruction(decoded) {
    return decoded.data.instruction === types_js_1.TokenInstruction.Transfer;
}
exports.isTransferInstruction = isTransferInstruction;
/** TODO: docs */ function isApproveInstruction(decoded) {
    return decoded.data.instruction === types_js_1.TokenInstruction.Approve;
}
exports.isApproveInstruction = isApproveInstruction;
/** TODO: docs */ function isRevokeInstruction(decoded) {
    return decoded.data.instruction === types_js_1.TokenInstruction.Revoke;
}
exports.isRevokeInstruction = isRevokeInstruction;
/** TODO: docs */ function isSetAuthorityInstruction(decoded) {
    return decoded.data.instruction === types_js_1.TokenInstruction.SetAuthority;
}
exports.isSetAuthorityInstruction = isSetAuthorityInstruction;
/** TODO: docs */ function isMintToInstruction(decoded) {
    return decoded.data.instruction === types_js_1.TokenInstruction.MintTo;
}
exports.isMintToInstruction = isMintToInstruction;
/** TODO: docs */ function isBurnInstruction(decoded) {
    return decoded.data.instruction === types_js_1.TokenInstruction.Burn;
}
exports.isBurnInstruction = isBurnInstruction;
/** TODO: docs */ function isCloseAccountInstruction(decoded) {
    return decoded.data.instruction === types_js_1.TokenInstruction.CloseAccount;
}
exports.isCloseAccountInstruction = isCloseAccountInstruction;
/** TODO: docs */ function isFreezeAccountInstruction(decoded) {
    return decoded.data.instruction === types_js_1.TokenInstruction.FreezeAccount;
}
exports.isFreezeAccountInstruction = isFreezeAccountInstruction;
/** TODO: docs */ function isThawAccountInstruction(decoded) {
    return decoded.data.instruction === types_js_1.TokenInstruction.ThawAccount;
}
exports.isThawAccountInstruction = isThawAccountInstruction;
/** TODO: docs */ function isTransferCheckedInstruction(decoded) {
    return decoded.data.instruction === types_js_1.TokenInstruction.TransferChecked;
}
exports.isTransferCheckedInstruction = isTransferCheckedInstruction;
/** TODO: docs */ function isApproveCheckedInstruction(decoded) {
    return decoded.data.instruction === types_js_1.TokenInstruction.ApproveChecked;
}
exports.isApproveCheckedInstruction = isApproveCheckedInstruction;
/** TODO: docs */ function isMintToCheckedInstruction(decoded) {
    return decoded.data.instruction === types_js_1.TokenInstruction.MintToChecked;
}
exports.isMintToCheckedInstruction = isMintToCheckedInstruction;
/** TODO: docs */ function isBurnCheckedInstruction(decoded) {
    return decoded.data.instruction === types_js_1.TokenInstruction.BurnChecked;
}
exports.isBurnCheckedInstruction = isBurnCheckedInstruction;
/** TODO: docs */ function isInitializeAccount2Instruction(decoded) {
    return decoded.data.instruction === types_js_1.TokenInstruction.InitializeAccount2;
}
exports.isInitializeAccount2Instruction = isInitializeAccount2Instruction;
/** TODO: docs */ function isSyncNativeInstruction(decoded) {
    return decoded.data.instruction === types_js_1.TokenInstruction.SyncNative;
}
exports.isSyncNativeInstruction = isSyncNativeInstruction;
/** TODO: docs */ function isInitializeAccount3Instruction(decoded) {
    return decoded.data.instruction === types_js_1.TokenInstruction.InitializeAccount3;
}
exports.isInitializeAccount3Instruction = isInitializeAccount3Instruction;
/** TODO: docs, implement */ // export function isInitializeMultisig2Instruction(
//     decoded: DecodedInstruction
// ): decoded is DecodedInitializeMultisig2Instruction {
//     return decoded.data.instruction === TokenInstruction.InitializeMultisig2;
// }
/** TODO: docs */ function isInitializeMint2Instruction(decoded) {
    return decoded.data.instruction === types_js_1.TokenInstruction.InitializeMint2;
}
exports.isInitializeMint2Instruction = isInitializeMint2Instruction;
/** TODO: docs */ function isAmountToUiAmountInstruction(decoded) {
    return decoded.data.instruction === types_js_1.TokenInstruction.AmountToUiAmount;
}
exports.isAmountToUiAmountInstruction = isAmountToUiAmountInstruction;
/** TODO: docs */ function isUiamountToAmountInstruction(decoded) {
    return decoded.data.instruction === types_js_1.TokenInstruction.UiAmountToAmount;
}
exports.isUiamountToAmountInstruction = isUiamountToAmountInstruction; //# sourceMappingURL=decode.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeMultisig2.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
}); //# sourceMappingURL=initializeMultisig2.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeImmutableOwner.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeInitializeImmutableOwnerInstructionUnchecked = exports.decodeInitializeImmutableOwnerInstruction = exports.createInitializeImmutableOwnerInstruction = exports.initializeImmutableOwnerInstructionData = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
/** The struct that represents the instruction data as it is read by the program */ exports.initializeImmutableOwnerInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction')
]);
/**
 * Construct an InitializeImmutableOwner instruction
 *
 * @param account           Immutable Owner Account
 * @param programId         SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createInitializeImmutableOwnerInstruction(account, programId) {
    const keys = [
        {
            pubkey: account,
            isSigner: false,
            isWritable: true
        }
    ];
    const data = Buffer.alloc(exports.initializeImmutableOwnerInstructionData.span);
    exports.initializeImmutableOwnerInstructionData.encode({
        instruction: types_js_1.TokenInstruction.InitializeImmutableOwner
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createInitializeImmutableOwnerInstruction = createInitializeImmutableOwnerInstruction;
/**
 * Decode an InitializeImmutableOwner instruction and validate it
 *
 * @param instruction InitializeImmutableOwner instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeInitializeImmutableOwnerInstruction(instruction, programId) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.initializeImmutableOwnerInstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { account }, data } = decodeInitializeImmutableOwnerInstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.InitializeImmutableOwner) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!account) throw new errors_js_1.TokenInvalidInstructionKeysError();
    return {
        programId,
        keys: {
            account
        },
        data
    };
}
exports.decodeInitializeImmutableOwnerInstruction = decodeInitializeImmutableOwnerInstruction;
/**
 * Decode an InitializeImmutableOwner instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeInitializeImmutableOwnerInstructionUnchecked({ programId, keys: [account], data }) {
    const { instruction } = exports.initializeImmutableOwnerInstructionData.decode(data);
    return {
        programId,
        keys: {
            account: account
        },
        data: {
            instruction
        }
    };
}
exports.decodeInitializeImmutableOwnerInstructionUnchecked = decodeInitializeImmutableOwnerInstructionUnchecked; //# sourceMappingURL=initializeImmutableOwner.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeMintCloseAuthority.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeInitializeMintCloseAuthorityInstructionUnchecked = exports.decodeInitializeMintCloseAuthorityInstruction = exports.createInitializeMintCloseAuthorityInstruction = exports.initializeMintCloseAuthorityInstructionData = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
/** TODO: docs */ exports.initializeMintCloseAuthorityInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_1.u8)('closeAuthorityOption'),
    (0, buffer_layout_utils_1.publicKey)('closeAuthority')
]);
/**
 * Construct an InitializeMintCloseAuthority instruction
 *
 * @param mint            Token mint account
 * @param closeAuthority  Optional authority that can close the mint
 * @param programId       SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createInitializeMintCloseAuthorityInstruction(mint, closeAuthority, programId) {
    if (!(0, constants_js_1.programSupportsExtensions)(programId)) {
        throw new errors_js_1.TokenUnsupportedInstructionError();
    }
    const keys = [
        {
            pubkey: mint,
            isSigner: false,
            isWritable: true
        }
    ];
    const data = Buffer.alloc(exports.initializeMintCloseAuthorityInstructionData.span);
    exports.initializeMintCloseAuthorityInstructionData.encode({
        instruction: types_js_1.TokenInstruction.InitializeMintCloseAuthority,
        closeAuthorityOption: closeAuthority ? 1 : 0,
        closeAuthority: closeAuthority || new web3_js_1.PublicKey(0)
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createInitializeMintCloseAuthorityInstruction = createInitializeMintCloseAuthorityInstruction;
/**
 * Decode an InitializeMintCloseAuthority instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeInitializeMintCloseAuthorityInstruction(instruction, programId) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.initializeMintCloseAuthorityInstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { mint }, data } = decodeInitializeMintCloseAuthorityInstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.InitializeMintCloseAuthority) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!mint) throw new errors_js_1.TokenInvalidInstructionKeysError();
    return {
        programId,
        keys: {
            mint
        },
        data
    };
}
exports.decodeInitializeMintCloseAuthorityInstruction = decodeInitializeMintCloseAuthorityInstruction;
/**
 * Decode an InitializeMintCloseAuthority instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeInitializeMintCloseAuthorityInstructionUnchecked({ programId, keys: [mint], data }) {
    const { instruction, closeAuthorityOption, closeAuthority } = exports.initializeMintCloseAuthorityInstructionData.decode(data);
    return {
        programId,
        keys: {
            mint
        },
        data: {
            instruction,
            closeAuthority: closeAuthorityOption ? closeAuthority : null
        }
    };
}
exports.decodeInitializeMintCloseAuthorityInstructionUnchecked = decodeInitializeMintCloseAuthorityInstructionUnchecked; //# sourceMappingURL=initializeMintCloseAuthority.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/reallocate.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createReallocateInstruction = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const internal_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/internal.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
/**
 * Construct a Reallocate instruction
 *
 * @param account        Address of the token account
 * @param payer          Address paying for the reallocation
 * @param extensionTypes Extensions to reallocate for
 * @param owner          Owner of the account
 * @param multiSigners   Signing accounts if `owner` is a multisig
 * @param programId      SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createReallocateInstruction(account, payer, extensionTypes, owner, multiSigners = [], programId = constants_js_1.TOKEN_2022_PROGRAM_ID) {
    if (!(0, constants_js_1.programSupportsExtensions)(programId)) {
        throw new errors_js_1.TokenUnsupportedInstructionError();
    }
    const baseKeys = [
        {
            pubkey: account,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: payer,
            isSigner: true,
            isWritable: true
        },
        {
            pubkey: web3_js_1.SystemProgram.programId,
            isSigner: false,
            isWritable: false
        }
    ];
    const keys = (0, internal_js_1.addSigners)(baseKeys, owner, multiSigners);
    const reallocateInstructionData = (0, buffer_layout_1.struct)([
        (0, buffer_layout_1.u8)('instruction'),
        (0, buffer_layout_1.seq)((0, buffer_layout_1.u16)(), extensionTypes.length, 'extensionTypes')
    ]);
    const data = Buffer.alloc(reallocateInstructionData.span);
    reallocateInstructionData.encode({
        instruction: types_js_1.TokenInstruction.Reallocate,
        extensionTypes
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createReallocateInstruction = createReallocateInstruction; //# sourceMappingURL=reallocate.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeNonTransferableMint.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createInitializeNonTransferableMintInstruction = exports.initializeNonTransferableMintInstructionData = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
/** The struct that represents the instruction data as it is read by the program */ exports.initializeNonTransferableMintInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction')
]);
/**
 * Construct an InitializeNonTransferableMint instruction
 *
 * @param mint           Mint Account to make non-transferable
 * @param programId         SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createInitializeNonTransferableMintInstruction(mint, programId) {
    if (!(0, constants_js_1.programSupportsExtensions)(programId)) {
        throw new errors_js_1.TokenUnsupportedInstructionError();
    }
    const keys = [
        {
            pubkey: mint,
            isSigner: false,
            isWritable: true
        }
    ];
    const data = Buffer.alloc(exports.initializeNonTransferableMintInstructionData.span);
    exports.initializeNonTransferableMintInstructionData.encode({
        instruction: types_js_1.TokenInstruction.InitializeNonTransferableMint
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createInitializeNonTransferableMintInstruction = createInitializeNonTransferableMintInstruction; //# sourceMappingURL=initializeNonTransferableMint.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializePermanentDelegate.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeInitializePermanentDelegateInstructionUnchecked = exports.decodeInitializePermanentDelegateInstruction = exports.createInitializePermanentDelegateInstruction = exports.initializePermanentDelegateInstructionData = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout@4.0.1/node_modules/@solana/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const buffer_layout_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+buffer-layout-utils@0.2.0_typescript@5.9.3/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const web3_js_2 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.0/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const constants_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)");
const errors_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)");
const types_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)");
/** TODO: docs */ exports.initializePermanentDelegateInstructionData = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u8)('instruction'),
    (0, buffer_layout_utils_1.publicKey)('delegate')
]);
/**
 * Construct an InitializePermanentDelegate instruction
 *
 * @param mint               Token mint account
 * @param permanentDelegate  Authority that may sign for `Transfer`s and `Burn`s on any account
 * @param programId          SPL Token program account
 *
 * @return Instruction to add to a transaction
 */ function createInitializePermanentDelegateInstruction(mint, permanentDelegate, programId) {
    if (!(0, constants_js_1.programSupportsExtensions)(programId)) {
        throw new errors_js_1.TokenUnsupportedInstructionError();
    }
    const keys = [
        {
            pubkey: mint,
            isSigner: false,
            isWritable: true
        }
    ];
    const data = Buffer.alloc(exports.initializePermanentDelegateInstructionData.span);
    exports.initializePermanentDelegateInstructionData.encode({
        instruction: types_js_1.TokenInstruction.InitializePermanentDelegate,
        delegate: permanentDelegate || new web3_js_1.PublicKey(0)
    }, data);
    return new web3_js_2.TransactionInstruction({
        keys,
        programId,
        data
    });
}
exports.createInitializePermanentDelegateInstruction = createInitializePermanentDelegateInstruction;
/**
 * Decode an InitializePermanentDelegate instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */ function decodeInitializePermanentDelegateInstruction(instruction, programId) {
    if (!instruction.programId.equals(programId)) throw new errors_js_1.TokenInvalidInstructionProgramError();
    if (instruction.data.length !== exports.initializePermanentDelegateInstructionData.span) throw new errors_js_1.TokenInvalidInstructionDataError();
    const { keys: { mint }, data } = decodeInitializePermanentDelegateInstructionUnchecked(instruction);
    if (data.instruction !== types_js_1.TokenInstruction.InitializePermanentDelegate) throw new errors_js_1.TokenInvalidInstructionTypeError();
    if (!mint) throw new errors_js_1.TokenInvalidInstructionKeysError();
    return {
        programId,
        keys: {
            mint
        },
        data
    };
}
exports.decodeInitializePermanentDelegateInstruction = decodeInitializePermanentDelegateInstruction;
/**
 * Decode an InitializePermanentDelegate instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */ function decodeInitializePermanentDelegateInstructionUnchecked({ programId, keys: [mint], data }) {
    const { instruction, delegate } = exports.initializePermanentDelegateInstructionData.decode(data);
    return {
        programId,
        keys: {
            mint
        },
        data: {
            instruction,
            delegate
        }
    };
}
exports.decodeInitializePermanentDelegateInstructionUnchecked = decodeInitializePermanentDelegateInstructionUnchecked; //# sourceMappingURL=initializePermanentDelegate.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
exports.createEmitInstruction = exports.createUpdateAuthorityInstruction = exports.createRemoveKeyInstruction = exports.createUpdateFieldInstruction = exports.createInitializeInstruction = void 0;
var spl_token_metadata_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token-metadata@0.1.6_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token-metadata/lib/cjs/index.js [app-route] (ecmascript)");
Object.defineProperty(exports, "createInitializeInstruction", {
    enumerable: true,
    get: function() {
        return spl_token_metadata_1.createInitializeInstruction;
    }
});
Object.defineProperty(exports, "createUpdateFieldInstruction", {
    enumerable: true,
    get: function() {
        return spl_token_metadata_1.createUpdateFieldInstruction;
    }
});
Object.defineProperty(exports, "createRemoveKeyInstruction", {
    enumerable: true,
    get: function() {
        return spl_token_metadata_1.createRemoveKeyInstruction;
    }
});
Object.defineProperty(exports, "createUpdateAuthorityInstruction", {
    enumerable: true,
    get: function() {
        return spl_token_metadata_1.createUpdateAuthorityInstruction;
    }
});
Object.defineProperty(exports, "createEmitInstruction", {
    enumerable: true,
    get: function() {
        return spl_token_metadata_1.createEmitInstruction;
    }
});
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/associatedTokenAccount.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/decode.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/types.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeMint.js [app-route] (ecmascript)"), exports); //                 0
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeAccount.js [app-route] (ecmascript)"), exports); //              1
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeMultisig.js [app-route] (ecmascript)"), exports); //             2
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/transfer.js [app-route] (ecmascript)"), exports); //                       3
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/approve.js [app-route] (ecmascript)"), exports); //                        4
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/revoke.js [app-route] (ecmascript)"), exports); //                         5
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/setAuthority.js [app-route] (ecmascript)"), exports); //                   6
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/mintTo.js [app-route] (ecmascript)"), exports); //                         7
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/burn.js [app-route] (ecmascript)"), exports); //                           8
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/closeAccount.js [app-route] (ecmascript)"), exports); //                   9
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/freezeAccount.js [app-route] (ecmascript)"), exports); //                 10
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/thawAccount.js [app-route] (ecmascript)"), exports); //                   11
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/transferChecked.js [app-route] (ecmascript)"), exports); //               12
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/approveChecked.js [app-route] (ecmascript)"), exports); //                13
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/mintToChecked.js [app-route] (ecmascript)"), exports); //                 14
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/burnChecked.js [app-route] (ecmascript)"), exports); //                   15
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeAccount2.js [app-route] (ecmascript)"), exports); //            16
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/syncNative.js [app-route] (ecmascript)"), exports); //                    17
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeAccount3.js [app-route] (ecmascript)"), exports); //            18
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeMultisig2.js [app-route] (ecmascript)"), exports); //           19
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeMint2.js [app-route] (ecmascript)"), exports); //               20
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeImmutableOwner.js [app-route] (ecmascript)"), exports); //      22
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/amountToUiAmount.js [app-route] (ecmascript)"), exports); //              23
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/uiAmountToAmount.js [app-route] (ecmascript)"), exports); //              24
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeMintCloseAuthority.js [app-route] (ecmascript)"), exports); //  25
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/reallocate.js [app-route] (ecmascript)"), exports); //                    29
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/createNativeMint.js [app-route] (ecmascript)"), exports); //              31
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializeNonTransferableMint.js [app-route] (ecmascript)"), exports); // 32
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/initializePermanentDelegate.js [app-route] (ecmascript)"), exports); //   35
 //# sourceMappingURL=index.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/actions/index.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/constants.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/errors.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/extensions/index.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/instructions/index.js [app-route] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.3.11_@solana+web3.js@1.98.0_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/cjs/state/index.js [app-route] (ecmascript)"), exports); //# sourceMappingURL=index.js.map
}),
];

//# sourceMappingURL=2b526_%40solana_spl-token_lib_cjs_ae408eee._.js.map