module.exports = [
"[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/layout.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// @ts-nocheck
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setLayoutEncoder = exports.setLayoutDecoder = exports.accountFlagsLayout = exports.selfTradeBehaviorLayout = exports.orderTypeLayout = exports.sideLayout = exports.VersionedLayout = exports.WideBits = exports.u128 = exports.i64 = exports.u64 = exports.publicKeyLayout = exports.zeros = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/buffer-layout@1.2.2/node_modules/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const bn_js_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/bn.js@5.2.2/node_modules/bn.js/lib/bn.js [app-route] (ecmascript)"));
class Zeros extends buffer_layout_1.Blob {
    decode(b, offset) {
        const slice = super.decode(b, offset);
        if (!slice.every((v)=>v === 0)) {
            throw new Error('nonzero padding bytes');
        }
        return slice;
    }
}
function zeros(length) {
    return new Zeros(length);
}
exports.zeros = zeros;
class PublicKeyLayout extends buffer_layout_1.Blob {
    constructor(property){
        super(32, property);
    }
    decode(b, offset) {
        return new web3_js_1.PublicKey(super.decode(b, offset));
    }
    encode(src, b, offset) {
        return super.encode(src.toBuffer(), b, offset);
    }
}
function publicKeyLayout(property) {
    return new PublicKeyLayout(property);
}
exports.publicKeyLayout = publicKeyLayout;
class BNLayout extends buffer_layout_1.Blob {
    decode(b, offset) {
        return new bn_js_1.default(super.decode(b, offset), 10, 'le');
    }
    encode(src, b, offset) {
        return super.encode(src.toArrayLike(Buffer, 'le', this.span), b, offset);
    }
}
function u64(property) {
    return new BNLayout(8, property);
}
exports.u64 = u64;
function i64(property) {
    return new BNLayout(8, property);
}
exports.i64 = i64;
function u128(property) {
    return new BNLayout(16, property);
}
exports.u128 = u128;
class WideBits extends buffer_layout_1.Layout {
    constructor(property){
        super(8, property);
        this._lower = buffer_layout_1.bits(buffer_layout_1.u32(), false);
        this._upper = buffer_layout_1.bits(buffer_layout_1.u32(), false);
    }
    addBoolean(property) {
        if (this._lower.fields.length < 32) {
            this._lower.addBoolean(property);
        } else {
            this._upper.addBoolean(property);
        }
    }
    decode(b, offset = 0) {
        const lowerDecoded = this._lower.decode(b, offset);
        const upperDecoded = this._upper.decode(b, offset + this._lower.span);
        return {
            ...lowerDecoded,
            ...upperDecoded
        };
    }
    encode(src, b, offset = 0) {
        return this._lower.encode(src, b, offset) + this._upper.encode(src, b, offset + this._lower.span);
    }
}
exports.WideBits = WideBits;
class VersionedLayout extends buffer_layout_1.Layout {
    constructor(version, inner, property){
        super(inner.span > 0 ? inner.span + 1 : inner.span, property);
        this.version = version;
        this.inner = inner;
    }
    decode(b, offset = 0) {
        // if (b.readUInt8(offset) !== this._version) {
        //   throw new Error('invalid version');
        // }
        return this.inner.decode(b, offset + 1);
    }
    encode(src, b, offset = 0) {
        b.writeUInt8(this.version, offset);
        return 1 + this.inner.encode(src, b, offset + 1);
    }
    getSpan(b, offset = 0) {
        return 1 + this.inner.getSpan(b, offset + 1);
    }
}
exports.VersionedLayout = VersionedLayout;
class EnumLayout extends buffer_layout_1.UInt {
    constructor(values, span, property){
        super(span, property);
        this.values = values;
    }
    encode(src, b, offset) {
        if (this.values[src] !== undefined) {
            return super.encode(this.values[src], b, offset);
        }
        throw new Error('Invalid ' + this.property);
    }
    decode(b, offset) {
        const decodedValue = super.decode(b, offset);
        const entry = Object.entries(this.values).find(([, value])=>value === decodedValue);
        if (entry) {
            return entry[0];
        }
        throw new Error('Invalid ' + this.property);
    }
}
function sideLayout(property) {
    return new EnumLayout({
        buy: 0,
        sell: 1
    }, 4, property);
}
exports.sideLayout = sideLayout;
function orderTypeLayout(property) {
    return new EnumLayout({
        limit: 0,
        ioc: 1,
        postOnly: 2
    }, 4, property);
}
exports.orderTypeLayout = orderTypeLayout;
function selfTradeBehaviorLayout(property) {
    return new EnumLayout({
        decrementTake: 0,
        cancelProvide: 1,
        abortTransaction: 2
    }, 4, property);
}
exports.selfTradeBehaviorLayout = selfTradeBehaviorLayout;
const ACCOUNT_FLAGS_LAYOUT = new WideBits();
ACCOUNT_FLAGS_LAYOUT.addBoolean('initialized');
ACCOUNT_FLAGS_LAYOUT.addBoolean('market');
ACCOUNT_FLAGS_LAYOUT.addBoolean('openOrders');
ACCOUNT_FLAGS_LAYOUT.addBoolean('requestQueue');
ACCOUNT_FLAGS_LAYOUT.addBoolean('eventQueue');
ACCOUNT_FLAGS_LAYOUT.addBoolean('bids');
ACCOUNT_FLAGS_LAYOUT.addBoolean('asks');
function accountFlagsLayout(property = 'accountFlags') {
    return ACCOUNT_FLAGS_LAYOUT.replicate(property);
}
exports.accountFlagsLayout = accountFlagsLayout;
function setLayoutDecoder(layout, decoder) {
    const originalDecode = layout.decode;
    layout.decode = function decode(b, offset = 0) {
        return decoder(originalDecode.call(this, b, offset));
    };
}
exports.setLayoutDecoder = setLayoutDecoder;
function setLayoutEncoder(layout, encoder) {
    const originalEncode = layout.encode;
    layout.encode = function encode(src, b, offset) {
        return originalEncode.call(this, encoder(src), b, offset);
    };
    return layout;
}
exports.setLayoutEncoder = setLayoutEncoder; //# sourceMappingURL=layout.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/slab.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Slab = exports.SLAB_LAYOUT = void 0;
const bn_js_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/bn.js@5.2.2/node_modules/bn.js/lib/bn.js [app-route] (ecmascript)"));
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/buffer-layout@1.2.2/node_modules/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/layout.js [app-route] (ecmascript)");
const SLAB_HEADER_LAYOUT = buffer_layout_1.struct([
    // Number of modified slab nodes
    buffer_layout_1.u32('bumpIndex'),
    layout_1.zeros(4),
    // Linked list of unused nodes
    buffer_layout_1.u32('freeListLen'),
    layout_1.zeros(4),
    buffer_layout_1.u32('freeListHead'),
    buffer_layout_1.u32('root'),
    buffer_layout_1.u32('leafCount'),
    layout_1.zeros(4)
], 'header');
const SLAB_NODE_LAYOUT = buffer_layout_1.union(buffer_layout_1.u32('tag'), buffer_layout_1.blob(68), 'node');
SLAB_NODE_LAYOUT.addVariant(0, buffer_layout_1.struct([]), 'uninitialized');
SLAB_NODE_LAYOUT.addVariant(1, buffer_layout_1.struct([
    // Only the first prefixLen high-order bits of key are meaningful
    buffer_layout_1.u32('prefixLen'),
    layout_1.u128('key'),
    buffer_layout_1.seq(buffer_layout_1.u32(), 2, 'children')
]), 'innerNode');
SLAB_NODE_LAYOUT.addVariant(2, buffer_layout_1.struct([
    buffer_layout_1.u8('ownerSlot'),
    buffer_layout_1.u8('feeTier'),
    buffer_layout_1.blob(2),
    layout_1.u128('key'),
    layout_1.publicKeyLayout('owner'),
    layout_1.u64('quantity'),
    layout_1.u64('clientOrderId')
]), 'leafNode');
SLAB_NODE_LAYOUT.addVariant(3, buffer_layout_1.struct([
    buffer_layout_1.u32('next')
]), 'freeNode');
SLAB_NODE_LAYOUT.addVariant(4, buffer_layout_1.struct([]), 'lastFreeNode');
exports.SLAB_LAYOUT = buffer_layout_1.struct([
    SLAB_HEADER_LAYOUT,
    buffer_layout_1.seq(SLAB_NODE_LAYOUT, buffer_layout_1.offset(SLAB_HEADER_LAYOUT.layoutFor('bumpIndex'), SLAB_HEADER_LAYOUT.offsetOf('bumpIndex') - SLAB_HEADER_LAYOUT.span), 'nodes')
]);
class Slab {
    constructor(header, nodes){
        this.header = header;
        this.nodes = nodes;
    }
    static decode(buffer) {
        return exports.SLAB_LAYOUT.decode(buffer);
    }
    get(searchKey) {
        if (this.header.leafCount === 0) {
            return null;
        }
        if (!(searchKey instanceof bn_js_1.default)) {
            searchKey = new bn_js_1.default(searchKey);
        }
        let index = this.header.root;
        while(true){
            const { leafNode, innerNode } = this.nodes[index];
            if (leafNode) {
                if (leafNode.key.eq(searchKey)) {
                    return leafNode;
                }
                return null;
            } else if (innerNode) {
                if (!innerNode.key.xor(searchKey).iushrn(128 - innerNode.prefixLen).isZero()) {
                    return null;
                }
                index = innerNode.children[searchKey.testn(128 - innerNode.prefixLen - 1) ? 1 : 0];
            } else {
                throw new Error('Invalid slab');
            }
        }
    }
    [Symbol.iterator]() {
        return this.items(false);
    }
    *items(descending = false) {
        if (this.header.leafCount === 0) {
            return;
        }
        const stack = [
            this.header.root
        ];
        while(stack.length > 0){
            const index = stack.pop();
            const { leafNode, innerNode } = this.nodes[index];
            if (leafNode) {
                yield leafNode;
            } else if (innerNode) {
                if (descending) {
                    stack.push(innerNode.children[0], innerNode.children[1]);
                } else {
                    stack.push(innerNode.children[1], innerNode.children[0]);
                }
            }
        }
    }
}
exports.Slab = Slab;
layout_1.setLayoutDecoder(exports.SLAB_LAYOUT, ({ header, nodes })=>new Slab(header, nodes)); //# sourceMappingURL=slab.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/token-instructions.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
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
exports.closeAccount = exports.mintTo = exports.setAuthority = exports.revoke = exports.approve = exports.transfer = exports.initializeAccount = exports.initializeMint = exports.decodeTokenInstructionData = exports.SRM_DECIMALS = exports.SRM_MINT = exports.MSRM_DECIMALS = exports.MSRM_MINT = exports.WRAPPED_SOL_MINT = exports.TOKEN_PROGRAM_ID = exports.CLOSE_ACCOUNT_OWNER_INDEX = exports.CLOSE_ACCOUNT_DESTINATION_INDEX = exports.CLOSE_ACCOUNT_SOURCE_INDEX = exports.TRANSFER_OWNER_INDEX = exports.TRANSFER_DESTINATION_INDEX = exports.TRANSFER_SOURCE_INDEX = exports.INITIALIZE_ACCOUNT_OWNER_INDEX = exports.INITIALIZE_ACCOUNT_MINT_INDEX = exports.INITIALIZE_ACCOUNT_ACCOUNT_INDEX = void 0;
const BufferLayout = __importStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/buffer-layout@1.2.2/node_modules/buffer-layout/lib/Layout.js [app-route] (ecmascript)"));
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/layout.js [app-route] (ecmascript)");
// NOTE: Update these if the position of arguments for the initializeAccount instruction changes
exports.INITIALIZE_ACCOUNT_ACCOUNT_INDEX = 0;
exports.INITIALIZE_ACCOUNT_MINT_INDEX = 1;
exports.INITIALIZE_ACCOUNT_OWNER_INDEX = 2;
// NOTE: Update these if the position of arguments for the transfer instruction changes
exports.TRANSFER_SOURCE_INDEX = 0;
exports.TRANSFER_DESTINATION_INDEX = 1;
exports.TRANSFER_OWNER_INDEX = 2;
// NOTE: Update these if the position of arguments for the closeAccount instruction changes
exports.CLOSE_ACCOUNT_SOURCE_INDEX = 0;
exports.CLOSE_ACCOUNT_DESTINATION_INDEX = 1;
exports.CLOSE_ACCOUNT_OWNER_INDEX = 2;
exports.TOKEN_PROGRAM_ID = new web3_js_1.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
exports.WRAPPED_SOL_MINT = new web3_js_1.PublicKey('So11111111111111111111111111111111111111112');
exports.MSRM_MINT = new web3_js_1.PublicKey('MSRMcoVyrFxnSgo5uXwone5SKcGhT1KEJMFEkMEWf9L');
exports.MSRM_DECIMALS = 0;
exports.SRM_MINT = new web3_js_1.PublicKey('SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt');
exports.SRM_DECIMALS = 6;
const LAYOUT = BufferLayout.union(BufferLayout.u8('instruction'));
LAYOUT.addVariant(0, BufferLayout.struct([
    BufferLayout.u8('decimals'),
    layout_1.publicKeyLayout('mintAuthority'),
    BufferLayout.u8('freezeAuthorityOption'),
    layout_1.publicKeyLayout('freezeAuthority')
]), 'initializeMint');
LAYOUT.addVariant(1, BufferLayout.struct([]), 'initializeAccount');
LAYOUT.addVariant(3, BufferLayout.struct([
    BufferLayout.nu64('amount')
]), 'transfer');
LAYOUT.addVariant(4, BufferLayout.struct([
    BufferLayout.nu64('amount')
]), 'approve');
LAYOUT.addVariant(5, BufferLayout.struct([]), 'revoke');
LAYOUT.addVariant(6, BufferLayout.struct([
    BufferLayout.u8('authorityType'),
    BufferLayout.u8('newAuthorityOption'),
    layout_1.publicKeyLayout('newAuthority')
]), 'setAuthority');
LAYOUT.addVariant(7, BufferLayout.struct([
    BufferLayout.nu64('amount')
]), 'mintTo');
LAYOUT.addVariant(8, BufferLayout.struct([
    BufferLayout.nu64('amount')
]), 'burn');
LAYOUT.addVariant(9, BufferLayout.struct([]), 'closeAccount');
const instructionMaxSpan = Math.max(...Object.values(LAYOUT.registry).map((r)=>r.span));
function encodeTokenInstructionData(instruction) {
    const b = Buffer.alloc(instructionMaxSpan);
    const span = LAYOUT.encode(instruction, b);
    return b.slice(0, span);
}
function decodeTokenInstructionData(instruction) {
    return LAYOUT.decode(instruction);
}
exports.decodeTokenInstructionData = decodeTokenInstructionData;
function initializeMint({ mint, decimals, mintAuthority, freezeAuthority = null }) {
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
    return new web3_js_1.TransactionInstruction({
        keys,
        data: encodeTokenInstructionData({
            initializeMint: {
                decimals,
                mintAuthority,
                freezeAuthorityOption: !!freezeAuthority,
                freezeAuthority: freezeAuthority || new web3_js_1.PublicKey(0)
            }
        }),
        programId: exports.TOKEN_PROGRAM_ID
    });
}
exports.initializeMint = initializeMint;
function initializeAccount({ account, mint, owner }) {
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
    return new web3_js_1.TransactionInstruction({
        keys,
        data: encodeTokenInstructionData({
            initializeAccount: {}
        }),
        programId: exports.TOKEN_PROGRAM_ID
    });
}
exports.initializeAccount = initializeAccount;
function transfer({ source, destination, amount, owner }) {
    const keys = [
        {
            pubkey: source,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: destination,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: owner,
            isSigner: true,
            isWritable: false
        }
    ];
    return new web3_js_1.TransactionInstruction({
        keys,
        data: encodeTokenInstructionData({
            transfer: {
                amount
            }
        }),
        programId: exports.TOKEN_PROGRAM_ID
    });
}
exports.transfer = transfer;
function approve({ source, delegate, amount, owner }) {
    const keys = [
        {
            pubkey: source,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: delegate,
            isSigner: false,
            isWritable: false
        },
        {
            pubkey: owner,
            isSigner: true,
            isWritable: false
        }
    ];
    return new web3_js_1.TransactionInstruction({
        keys,
        data: encodeTokenInstructionData({
            approve: {
                amount
            }
        }),
        programId: exports.TOKEN_PROGRAM_ID
    });
}
exports.approve = approve;
function revoke({ source, owner }) {
    const keys = [
        {
            pubkey: source,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: owner,
            isSigner: true,
            isWritable: false
        }
    ];
    return new web3_js_1.TransactionInstruction({
        keys,
        data: encodeTokenInstructionData({
            revoke: {}
        }),
        programId: exports.TOKEN_PROGRAM_ID
    });
}
exports.revoke = revoke;
function setAuthority({ target, currentAuthority, newAuthority, authorityType }) {
    const keys = [
        {
            pubkey: target,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: currentAuthority,
            isSigner: true,
            isWritable: false
        }
    ];
    return new web3_js_1.TransactionInstruction({
        keys,
        data: encodeTokenInstructionData({
            setAuthority: {
                authorityType,
                newAuthorityOption: !!newAuthority,
                newAuthority
            }
        }),
        programId: exports.TOKEN_PROGRAM_ID
    });
}
exports.setAuthority = setAuthority;
function mintTo({ mint, destination, amount, mintAuthority }) {
    const keys = [
        {
            pubkey: mint,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: destination,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: mintAuthority,
            isSigner: true,
            isWritable: false
        }
    ];
    return new web3_js_1.TransactionInstruction({
        keys,
        data: encodeTokenInstructionData({
            mintTo: {
                amount
            }
        }),
        programId: exports.TOKEN_PROGRAM_ID
    });
}
exports.mintTo = mintTo;
function closeAccount({ source, destination, owner }) {
    const keys = [
        {
            pubkey: source,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: destination,
            isSigner: false,
            isWritable: true
        },
        {
            pubkey: owner,
            isSigner: true,
            isWritable: false
        }
    ];
    return new web3_js_1.TransactionInstruction({
        keys,
        data: encodeTokenInstructionData({
            closeAccount: {}
        }),
        programId: exports.TOKEN_PROGRAM_ID
    });
}
exports.closeAccount = closeAccount; //# sourceMappingURL=token-instructions.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/instructions.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DexInstructions = exports.decodeInstructionV2 = exports.decodeInstruction = exports.encodeInstructionV2 = exports.encodeInstruction = exports.INSTRUCTION_LAYOUT_V2 = exports.INSTRUCTION_LAYOUT = exports.NEW_ORDER_V3_OWNER_INDEX = exports.NEW_ORDER_V3_OPEN_ORDERS_INDEX = exports.NEW_ORDER_OWNER_INDEX = exports.NEW_ORDER_OPEN_ORDERS_INDEX = exports.SETTLE_FUNDS_QUOTE_WALLET_INDEX = exports.SETTLE_FUNDS_BASE_WALLET_INDEX = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/buffer-layout@1.2.2/node_modules/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/layout.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const token_instructions_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/token-instructions.js [app-route] (ecmascript)");
const bn_js_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/bn.js@5.2.2/node_modules/bn.js/lib/bn.js [app-route] (ecmascript)"));
// NOTE: Update these if the position of arguments for the settleFunds instruction changes
exports.SETTLE_FUNDS_BASE_WALLET_INDEX = 5;
exports.SETTLE_FUNDS_QUOTE_WALLET_INDEX = 6;
// NOTE: Update these if the position of arguments for the newOrder instruction changes
exports.NEW_ORDER_OPEN_ORDERS_INDEX = 1;
exports.NEW_ORDER_OWNER_INDEX = 4;
// NOTE: Update these if the position of arguments for the newOrder instruction changes
exports.NEW_ORDER_V3_OPEN_ORDERS_INDEX = 1;
exports.NEW_ORDER_V3_OWNER_INDEX = 7;
exports.INSTRUCTION_LAYOUT = new layout_1.VersionedLayout(0, buffer_layout_1.union(buffer_layout_1.u32('instruction')));
exports.INSTRUCTION_LAYOUT.inner.addVariant(0, buffer_layout_1.struct([
    layout_1.u64('baseLotSize'),
    layout_1.u64('quoteLotSize'),
    buffer_layout_1.u16('feeRateBps'),
    layout_1.u64('vaultSignerNonce'),
    layout_1.u64('quoteDustThreshold')
]), 'initializeMarket');
exports.INSTRUCTION_LAYOUT.inner.addVariant(1, buffer_layout_1.struct([
    layout_1.sideLayout('side'),
    layout_1.u64('limitPrice'),
    layout_1.u64('maxQuantity'),
    layout_1.orderTypeLayout('orderType'),
    layout_1.u64('clientId')
]), 'newOrder');
exports.INSTRUCTION_LAYOUT.inner.addVariant(2, buffer_layout_1.struct([
    buffer_layout_1.u16('limit')
]), 'matchOrders');
exports.INSTRUCTION_LAYOUT.inner.addVariant(3, buffer_layout_1.struct([
    buffer_layout_1.u16('limit')
]), 'consumeEvents');
exports.INSTRUCTION_LAYOUT.inner.addVariant(4, buffer_layout_1.struct([
    layout_1.sideLayout('side'),
    layout_1.u128('orderId'),
    layout_1.publicKeyLayout('openOrders'),
    buffer_layout_1.u8('openOrdersSlot')
]), 'cancelOrder');
exports.INSTRUCTION_LAYOUT.inner.addVariant(5, buffer_layout_1.struct([]), 'settleFunds');
exports.INSTRUCTION_LAYOUT.inner.addVariant(6, buffer_layout_1.struct([
    layout_1.u64('clientId')
]), 'cancelOrderByClientId');
exports.INSTRUCTION_LAYOUT.inner.addVariant(10, buffer_layout_1.struct([
    layout_1.sideLayout('side'),
    layout_1.u64('limitPrice'),
    layout_1.u64('maxBaseQuantity'),
    layout_1.u64('maxQuoteQuantity'),
    layout_1.selfTradeBehaviorLayout('selfTradeBehavior'),
    layout_1.orderTypeLayout('orderType'),
    layout_1.u64('clientId'),
    buffer_layout_1.u16('limit')
]), 'newOrderV3');
exports.INSTRUCTION_LAYOUT.inner.addVariant(11, buffer_layout_1.struct([
    layout_1.sideLayout('side'),
    layout_1.u128('orderId')
]), 'cancelOrderV2');
exports.INSTRUCTION_LAYOUT.inner.addVariant(12, buffer_layout_1.struct([
    layout_1.u64('clientId')
]), 'cancelOrderByClientIdV2');
exports.INSTRUCTION_LAYOUT.inner.addVariant(14, buffer_layout_1.struct([]), 'closeOpenOrders');
exports.INSTRUCTION_LAYOUT.inner.addVariant(15, buffer_layout_1.struct([]), 'initOpenOrders');
exports.INSTRUCTION_LAYOUT.inner.addVariant(16, buffer_layout_1.struct([
    buffer_layout_1.u16('limit')
]), 'prune');
exports.INSTRUCTION_LAYOUT.inner.addVariant(17, buffer_layout_1.struct([
    buffer_layout_1.u16('limit')
]), 'consumeEventsPermissioned');
exports.INSTRUCTION_LAYOUT.inner.addVariant(18, buffer_layout_1.struct([
    buffer_layout_1.seq(layout_1.u64(), 8, 'clientIds')
]), 'cancelOrdersByClientIds');
const orderStruct = ()=>buffer_layout_1.struct([
        layout_1.sideLayout('side'),
        layout_1.u64('limitPrice'),
        layout_1.u64('maxBaseQuantity'),
        layout_1.u64('maxQuoteQuantity'),
        layout_1.selfTradeBehaviorLayout('selfTradeBehavior'),
        layout_1.orderTypeLayout('orderType'),
        layout_1.u64('clientId'),
        buffer_layout_1.u16('limit'),
        layout_1.i64('maxTs')
    ]);
exports.INSTRUCTION_LAYOUT.inner.addVariant(19, orderStruct(), 'replaceOrderByClientId');
exports.INSTRUCTION_LAYOUT.inner.addVariant(20, buffer_layout_1.struct([
    layout_1.u64('orderAmount'),
    buffer_layout_1.seq(orderStruct(), 8, 'orders')
]), 'replaceOrdersByClientIds');
exports.INSTRUCTION_LAYOUT_V2 = new layout_1.VersionedLayout(0, buffer_layout_1.union(buffer_layout_1.u32('instruction')));
exports.INSTRUCTION_LAYOUT_V2.inner.addVariant(10, orderStruct(), 'newOrderV3');
function encodeInstruction(instruction, maxLength = 100) {
    const b = Buffer.alloc(maxLength);
    return b.slice(0, exports.INSTRUCTION_LAYOUT.encode(instruction, b));
}
exports.encodeInstruction = encodeInstruction;
function encodeInstructionV2(instruction) {
    const b = Buffer.alloc(100);
    return b.slice(0, exports.INSTRUCTION_LAYOUT_V2.encode(instruction, b));
}
exports.encodeInstructionV2 = encodeInstructionV2;
function decodeInstruction(message) {
    return exports.INSTRUCTION_LAYOUT.decode(message);
}
exports.decodeInstruction = decodeInstruction;
function decodeInstructionV2(message) {
    return exports.INSTRUCTION_LAYOUT_V2.decode(message);
}
exports.decodeInstructionV2 = decodeInstructionV2;
class DexInstructions {
    static initializeMarket({ market, requestQueue, eventQueue, bids, asks, baseVault, quoteVault, baseMint, quoteMint, baseLotSize, quoteLotSize, feeRateBps, vaultSignerNonce, quoteDustThreshold, programId, authority = undefined, pruneAuthority = undefined, crankAuthority = undefined }) {
        let rentSysvar = new web3_js_1.PublicKey('SysvarRent111111111111111111111111111111111');
        return new web3_js_1.TransactionInstruction({
            keys: [
                {
                    pubkey: market,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: requestQueue,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: eventQueue,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: bids,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: asks,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: baseVault,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: quoteVault,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: baseMint,
                    isSigner: false,
                    isWritable: false
                },
                {
                    pubkey: quoteMint,
                    isSigner: false,
                    isWritable: false
                },
                // Use a dummy address if using the new dex upgrade to save tx space.
                {
                    pubkey: authority ? quoteMint : web3_js_1.SYSVAR_RENT_PUBKEY,
                    isSigner: false,
                    isWritable: false
                }
            ].concat(authority ? {
                pubkey: authority,
                isSigner: false,
                isWritable: false
            } : []).concat(authority && pruneAuthority ? {
                pubkey: pruneAuthority,
                isSigner: false,
                isWritable: false
            } : []).concat(authority && pruneAuthority && crankAuthority ? {
                pubkey: crankAuthority,
                isSigner: false,
                isWritable: false
            } : []),
            programId,
            data: encodeInstruction({
                initializeMarket: {
                    baseLotSize,
                    quoteLotSize,
                    feeRateBps,
                    vaultSignerNonce,
                    quoteDustThreshold
                }
            })
        });
    }
    static newOrder({ market, openOrders, payer, owner, requestQueue, baseVault, quoteVault, side, limitPrice, maxQuantity, orderType, clientId, programId, feeDiscountPubkey = null }) {
        const keys = [
            {
                pubkey: market,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: openOrders,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: requestQueue,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: payer,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: owner,
                isSigner: true,
                isWritable: false
            },
            {
                pubkey: baseVault,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: quoteVault,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: token_instructions_1.TOKEN_PROGRAM_ID,
                isSigner: false,
                isWritable: false
            },
            {
                pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
                isSigner: false,
                isWritable: false
            }
        ];
        if (feeDiscountPubkey) {
            keys.push({
                pubkey: feeDiscountPubkey,
                isSigner: false,
                isWritable: false
            });
        }
        return new web3_js_1.TransactionInstruction({
            keys,
            programId,
            data: encodeInstruction({
                newOrder: clientId ? {
                    side,
                    limitPrice,
                    maxQuantity,
                    orderType,
                    clientId
                } : {
                    side,
                    limitPrice,
                    maxQuantity,
                    orderType
                }
            })
        });
    }
    static newOrderV3({ market, openOrders, payer, owner, requestQueue, eventQueue, bids, asks, baseVault, quoteVault, side, limitPrice, maxBaseQuantity, maxQuoteQuantity, orderType, clientId, programId, selfTradeBehavior, feeDiscountPubkey = null, maxTs = null, replaceIfExists = false }) {
        const keys = [
            {
                pubkey: market,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: openOrders,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: requestQueue,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: eventQueue,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: bids,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: asks,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: payer,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: owner,
                isSigner: true,
                isWritable: false
            },
            {
                pubkey: baseVault,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: quoteVault,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: token_instructions_1.TOKEN_PROGRAM_ID,
                isSigner: false,
                isWritable: false
            },
            {
                pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
                isSigner: false,
                isWritable: false
            }
        ];
        if (feeDiscountPubkey) {
            keys.push({
                pubkey: feeDiscountPubkey,
                isSigner: false,
                isWritable: false
            });
        }
        let instructionName, encoder;
        if (replaceIfExists) {
            instructionName = 'replaceOrderByClientId';
            encoder = encodeInstruction;
        } else {
            instructionName = 'newOrderV3';
            encoder = maxTs ? encodeInstructionV2 : encodeInstruction;
        }
        return new web3_js_1.TransactionInstruction({
            keys,
            programId,
            data: encoder({
                [instructionName]: {
                    side,
                    limitPrice,
                    maxBaseQuantity,
                    maxQuoteQuantity,
                    selfTradeBehavior,
                    orderType,
                    clientId,
                    limit: 65535,
                    maxTs: new bn_js_1.default(maxTs !== null && maxTs !== void 0 ? maxTs : '9223372036854775807')
                }
            })
        });
    }
    static replaceOrdersByClientIds({ market, openOrders, payer, owner, requestQueue, eventQueue, bids, asks, baseVault, quoteVault, feeDiscountPubkey = null, programId, orders }) {
        const keys = [
            {
                pubkey: market,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: openOrders,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: requestQueue,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: eventQueue,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: bids,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: asks,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: payer,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: owner,
                isSigner: true,
                isWritable: false
            },
            {
                pubkey: baseVault,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: quoteVault,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: token_instructions_1.TOKEN_PROGRAM_ID,
                isSigner: false,
                isWritable: false
            },
            {
                pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
                isSigner: false,
                isWritable: false
            }
        ];
        if (feeDiscountPubkey) {
            keys.push({
                pubkey: feeDiscountPubkey,
                isSigner: false,
                isWritable: false
            });
        }
        return new web3_js_1.TransactionInstruction({
            keys,
            programId,
            data: encodeInstruction({
                replaceOrdersByClientIds: {
                    orderAmount: new bn_js_1.default(orders.length),
                    orders: orders.map((order)=>{
                        var _a;
                        return {
                            ...order,
                            maxTs: new bn_js_1.default((_a = order.maxTs) !== null && _a !== void 0 ? _a : '9223372036854775807'),
                            limit: 65535
                        };
                    })
                }
            }, 15 + orders.length * 60).slice(0, 13 + orders.length * 54)
        });
    }
    static matchOrders({ market, requestQueue, eventQueue, bids, asks, baseVault, quoteVault, limit, programId }) {
        return new web3_js_1.TransactionInstruction({
            keys: [
                {
                    pubkey: market,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: requestQueue,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: eventQueue,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: bids,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: asks,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: baseVault,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: quoteVault,
                    isSigner: false,
                    isWritable: true
                }
            ],
            programId,
            data: encodeInstruction({
                matchOrders: {
                    limit
                }
            })
        });
    }
    static consumeEvents({ market, eventQueue, coinFee, pcFee, openOrdersAccounts, limit, programId }) {
        return new web3_js_1.TransactionInstruction({
            keys: [
                ...openOrdersAccounts.map((account)=>({
                        pubkey: account,
                        isSigner: false,
                        isWritable: true
                    })),
                {
                    pubkey: market,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: eventQueue,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: coinFee,
                    isSigner: false,
                    isWriteable: true
                },
                {
                    pubkey: pcFee,
                    isSigner: false,
                    isWritable: true
                }
            ],
            programId,
            data: encodeInstruction({
                consumeEvents: {
                    limit
                }
            })
        });
    }
    static consumeEventsPermissioned({ market, eventQueue, crankAuthority, openOrdersAccounts, limit, programId }) {
        return new web3_js_1.TransactionInstruction({
            keys: [
                ...openOrdersAccounts.map((account)=>({
                        pubkey: account,
                        isSigner: false,
                        isWritable: true
                    })),
                {
                    pubkey: market,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: eventQueue,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: crankAuthority,
                    isSigner: true,
                    isWritable: false
                }
            ],
            programId,
            data: encodeInstruction({
                consumeEventsPermissioned: {
                    limit
                }
            })
        });
    }
    static cancelOrder({ market, openOrders, owner, requestQueue, side, orderId, openOrdersSlot, programId }) {
        return new web3_js_1.TransactionInstruction({
            keys: [
                {
                    pubkey: market,
                    isSigner: false,
                    isWritable: false
                },
                {
                    pubkey: openOrders,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: requestQueue,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: owner,
                    isSigner: true,
                    isWritable: false
                }
            ],
            programId,
            data: encodeInstruction({
                cancelOrder: {
                    side,
                    orderId,
                    openOrders,
                    openOrdersSlot
                }
            })
        });
    }
    static cancelOrderV2(order) {
        const { market, bids, asks, eventQueue, openOrders, owner, side, orderId, programId } = order;
        return new web3_js_1.TransactionInstruction({
            keys: [
                {
                    pubkey: market,
                    isSigner: false,
                    isWritable: false
                },
                {
                    pubkey: bids,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: asks,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: openOrders,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: owner,
                    isSigner: true,
                    isWritable: false
                },
                {
                    pubkey: eventQueue,
                    isSigner: false,
                    isWritable: true
                }
            ],
            programId,
            data: encodeInstruction({
                cancelOrderV2: {
                    side,
                    orderId
                }
            })
        });
    }
    static cancelOrderByClientId({ market, openOrders, owner, requestQueue, clientId, programId }) {
        return new web3_js_1.TransactionInstruction({
            keys: [
                {
                    pubkey: market,
                    isSigner: false,
                    isWritable: false
                },
                {
                    pubkey: openOrders,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: requestQueue,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: owner,
                    isSigner: true,
                    isWritable: false
                }
            ],
            programId,
            data: encodeInstruction({
                cancelOrderByClientId: {
                    clientId
                }
            })
        });
    }
    static cancelOrderByClientIdV2({ market, openOrders, owner, bids, asks, eventQueue, clientId, programId }) {
        return new web3_js_1.TransactionInstruction({
            keys: [
                {
                    pubkey: market,
                    isSigner: false,
                    isWritable: false
                },
                {
                    pubkey: bids,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: asks,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: openOrders,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: owner,
                    isSigner: true,
                    isWritable: false
                },
                {
                    pubkey: eventQueue,
                    isSigner: false,
                    isWritable: true
                }
            ],
            programId,
            data: encodeInstruction({
                cancelOrderByClientIdV2: {
                    clientId
                }
            })
        });
    }
    static cancelOrdersByClientIds({ market, openOrders, owner, bids, asks, eventQueue, clientIds, programId }) {
        if (clientIds.length > 8) {
            throw new Error("Number of client ids cannot exceed 8!");
        }
        while(clientIds.length < 8){
            clientIds.push(new bn_js_1.default(0));
        }
        return new web3_js_1.TransactionInstruction({
            keys: [
                {
                    pubkey: market,
                    isSigner: false,
                    isWritable: false
                },
                {
                    pubkey: bids,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: asks,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: openOrders,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: owner,
                    isSigner: true,
                    isWritable: false
                },
                {
                    pubkey: eventQueue,
                    isSigner: false,
                    isWritable: true
                }
            ],
            programId,
            data: encodeInstruction({
                cancelOrdersByClientIds: {
                    clientIds
                }
            })
        });
    }
    static settleFunds({ market, openOrders, owner, baseVault, quoteVault, baseWallet, quoteWallet, vaultSigner, programId, referrerQuoteWallet = null }) {
        const keys = [
            {
                pubkey: market,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: openOrders,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: owner,
                isSigner: true,
                isWritable: false
            },
            {
                pubkey: baseVault,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: quoteVault,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: baseWallet,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: quoteWallet,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: vaultSigner,
                isSigner: false,
                isWritable: false
            },
            {
                pubkey: token_instructions_1.TOKEN_PROGRAM_ID,
                isSigner: false,
                isWritable: false
            }
        ];
        if (referrerQuoteWallet) {
            keys.push({
                pubkey: referrerQuoteWallet,
                isSigner: false,
                isWritable: true
            });
        }
        return new web3_js_1.TransactionInstruction({
            keys,
            programId,
            data: encodeInstruction({
                settleFunds: {}
            })
        });
    }
    static closeOpenOrders({ market, openOrders, owner, solWallet, programId }) {
        const keys = [
            {
                pubkey: openOrders,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: owner,
                isSigner: true,
                isWritable: false
            },
            {
                pubkey: solWallet,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: market,
                isSigner: false,
                isWritable: false
            }
        ];
        return new web3_js_1.TransactionInstruction({
            keys,
            programId,
            data: encodeInstruction({
                closeOpenOrders: {}
            })
        });
    }
    static initOpenOrders({ market, openOrders, owner, programId, marketAuthority }) {
        const keys = [
            {
                pubkey: openOrders,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: owner,
                isSigner: true,
                isWritable: false
            },
            {
                pubkey: market,
                isSigner: false,
                isWritable: false
            },
            {
                pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
                isSigner: false,
                isWritable: false
            }
        ].concat(marketAuthority ? {
            pubkey: marketAuthority,
            isSigner: false,
            isWritable: false
        } : []);
        return new web3_js_1.TransactionInstruction({
            keys,
            programId,
            data: encodeInstruction({
                initOpenOrders: {}
            })
        });
    }
    static prune({ market, bids, asks, eventQueue, pruneAuthority, openOrders, openOrdersOwner, programId, limit }) {
        const keys = [
            {
                pubkey: market,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: bids,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: asks,
                isSigner: false,
                isWritable: true
            },
            // Keep signer false so that one can use a PDA.
            {
                pubkey: pruneAuthority,
                isSigner: false,
                isWritable: false
            },
            {
                pubkey: openOrders,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: openOrdersOwner,
                isSigner: false,
                isWritable: false
            },
            {
                pubkey: eventQueue,
                isSigner: false,
                isWritable: true
            }
        ];
        return new web3_js_1.TransactionInstruction({
            keys,
            programId,
            data: encodeInstruction({
                prune: {
                    limit
                }
            })
        });
    }
}
exports.DexInstructions = DexInstructions; //# sourceMappingURL=instructions.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/queue.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EVENT_QUEUE_LAYOUT = exports.REQUEST_QUEUE_LAYOUT = exports.decodeEventQueue = exports.decodeRequestQueue = exports.decodeEventsSince = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/buffer-layout@1.2.2/node_modules/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/layout.js [app-route] (ecmascript)");
const REQUEST_QUEUE_HEADER = buffer_layout_1.struct([
    buffer_layout_1.blob(5),
    layout_1.accountFlagsLayout('accountFlags'),
    buffer_layout_1.u32('head'),
    layout_1.zeros(4),
    buffer_layout_1.u32('count'),
    layout_1.zeros(4),
    buffer_layout_1.u32('nextSeqNum'),
    layout_1.zeros(4)
]);
const REQUEST_FLAGS = buffer_layout_1.bits(buffer_layout_1.u8(), false, 'requestFlags');
REQUEST_FLAGS.addBoolean('newOrder');
REQUEST_FLAGS.addBoolean('cancelOrder');
REQUEST_FLAGS.addBoolean('bid');
REQUEST_FLAGS.addBoolean('postOnly');
REQUEST_FLAGS.addBoolean('ioc');
const REQUEST = buffer_layout_1.struct([
    REQUEST_FLAGS,
    buffer_layout_1.u8('openOrdersSlot'),
    buffer_layout_1.u8('feeTier'),
    buffer_layout_1.blob(5),
    layout_1.u64('maxBaseSizeOrCancelId'),
    layout_1.u64('nativeQuoteQuantityLocked'),
    layout_1.u128('orderId'),
    layout_1.publicKeyLayout('openOrders'),
    layout_1.u64('clientOrderId')
]);
const EVENT_QUEUE_HEADER = buffer_layout_1.struct([
    buffer_layout_1.blob(5),
    layout_1.accountFlagsLayout('accountFlags'),
    buffer_layout_1.u32('head'),
    layout_1.zeros(4),
    buffer_layout_1.u32('count'),
    layout_1.zeros(4),
    buffer_layout_1.u32('seqNum'),
    layout_1.zeros(4)
]);
const EVENT_FLAGS = buffer_layout_1.bits(buffer_layout_1.u8(), false, 'eventFlags');
EVENT_FLAGS.addBoolean('fill');
EVENT_FLAGS.addBoolean('out');
EVENT_FLAGS.addBoolean('bid');
EVENT_FLAGS.addBoolean('maker');
const EVENT = buffer_layout_1.struct([
    EVENT_FLAGS,
    buffer_layout_1.u8('openOrdersSlot'),
    buffer_layout_1.u8('feeTier'),
    buffer_layout_1.blob(5),
    layout_1.u64('nativeQuantityReleased'),
    layout_1.u64('nativeQuantityPaid'),
    layout_1.u64('nativeFeeOrRebate'),
    layout_1.u128('orderId'),
    layout_1.publicKeyLayout('openOrders'),
    layout_1.u64('clientOrderId')
]);
function decodeQueueItem(headerLayout, nodeLayout, buffer, nodeIndex) {
    return nodeLayout.decode(buffer, headerLayout.span + nodeIndex * nodeLayout.span);
}
function decodeQueue(headerLayout, nodeLayout, buffer, history) {
    const header = headerLayout.decode(buffer);
    const allocLen = Math.floor((buffer.length - headerLayout.span) / nodeLayout.span);
    const nodes = [];
    if (history) {
        for(let i = 0; i < Math.min(history, allocLen); ++i){
            const nodeIndex = (header.head + header.count + allocLen - 1 - i) % allocLen;
            nodes.push(decodeQueueItem(headerLayout, nodeLayout, buffer, nodeIndex));
        }
    } else {
        for(let i = 0; i < header.count; ++i){
            const nodeIndex = (header.head + i) % allocLen;
            nodes.push(decodeQueueItem(headerLayout, nodeLayout, buffer, nodeIndex));
        }
    }
    return {
        header,
        nodes
    };
}
function decodeEventsSince(buffer, lastSeqNum) {
    const header = EVENT_QUEUE_HEADER.decode(buffer);
    const allocLen = Math.floor((buffer.length - EVENT_QUEUE_HEADER.span) / EVENT.span);
    // calculate number of missed events
    // account for u32 & ringbuffer overflows
    const modulo32Uint = 0x100000000;
    let missedEvents = (header.seqNum - lastSeqNum + modulo32Uint) % modulo32Uint;
    if (missedEvents > allocLen) {
        missedEvents = allocLen - 1;
    }
    const startSeq = (header.seqNum - missedEvents + modulo32Uint) % modulo32Uint;
    // define boundary indexes in ring buffer [start;end)
    const endIndex = (header.head + header.count) % allocLen;
    const startIndex = (endIndex - missedEvents + allocLen) % allocLen;
    const results = [];
    for(let i = 0; i < missedEvents; ++i){
        const nodeIndex = (startIndex + i) % allocLen;
        const event = decodeQueueItem(EVENT_QUEUE_HEADER, EVENT, buffer, nodeIndex);
        event.seqNum = (startSeq + i) % modulo32Uint;
        results.push(event);
    }
    return results;
}
exports.decodeEventsSince = decodeEventsSince;
function decodeRequestQueue(buffer, history) {
    const { header, nodes } = decodeQueue(REQUEST_QUEUE_HEADER, REQUEST, buffer, history);
    if (!header.accountFlags.initialized || !header.accountFlags.requestQueue) {
        throw new Error('Invalid requests queue');
    }
    return nodes;
}
exports.decodeRequestQueue = decodeRequestQueue;
function decodeEventQueue(buffer, history) {
    const { header, nodes } = decodeQueue(EVENT_QUEUE_HEADER, EVENT, buffer, history);
    if (!header.accountFlags.initialized || !header.accountFlags.eventQueue) {
        throw new Error('Invalid events queue');
    }
    return nodes;
}
exports.decodeEventQueue = decodeEventQueue;
exports.REQUEST_QUEUE_LAYOUT = {
    HEADER: REQUEST_QUEUE_HEADER,
    NODE: REQUEST
};
exports.EVENT_QUEUE_LAYOUT = {
    HEADER: EVENT_QUEUE_HEADER,
    NODE: EVENT
}; //# sourceMappingURL=queue.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/markets.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("[{\"address\":\"B37pZmwrwXHjpgvd9hHDAx1yeDsNevTnbbrN9W12BoGK\",\"deprecated\":true,\"name\":\"soALEPH/soUSDC\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"CAgAeMD7quTdnr6RPa7JySQpjf3irAmefYNdTb6anemq\",\"deprecated\":true,\"name\":\"BTC/soUSDC\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"ASKiV944nKg1W9vsf7hf3fTsjawK6DwLwrnB2LH9n61c\",\"deprecated\":true,\"name\":\"soETH/soUSDC\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"Cdp72gDcYMCLLk3aDkPxjeiirKoFqK38ECm8Ywvk94Wi\",\"deprecated\":true,\"name\":\"SOL/soUSDC\",\"programId\":\"BJ3jrUzddfuSrZHXSCxMUUQsjKEyLmuuyZebkcaFp2fg\"},{\"address\":\"68J6nkWToik6oM9rTatKSR5ibVSykAtzftBUEAvpRsys\",\"deprecated\":true,\"name\":\"SRM/soUSDC\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"8Jzed8Fafu1RU1CQDWdiETSrqAJy1ukZ5JL6Pma3p3a2\",\"deprecated\":true,\"name\":\"SRM/SOL\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"9wDmxsfwaDb2ysmZpBLzxKzoWrF1zHzBN7PV5EmJe19R\",\"deprecated\":true,\"name\":\"soSUSHI/soUSDC\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"GbQSffne1NcJbS4jsewZEpRGYVR4RNnuVUN8Ht6vAGb6\",\"deprecated\":true,\"name\":\"soSXP/soUSDC\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"7kgkDyW7dmyMeP8KFXzbcUZz1R2WHsovDZ7n3ihZuNDS\",\"deprecated\":true,\"name\":\"MSRM/soUSDC\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"FZqrBXz7ADGsmDf1TM9YgysPUfvtG8rJiNUrqDpHc9Au\",\"deprecated\":true,\"name\":\"soFTT/soUSDC\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"FJg9FUtbN3fg3YFbMCFiZKjGh5Bn4gtzxZmtxFzmz9kT\",\"deprecated\":true,\"name\":\"soYFI/soUSDC\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"7GZ59DMgJ7D6dfoJTpszPayTRyua9jwcaGJXaRMMF1my\",\"deprecated\":true,\"name\":\"soLINK/soUSDC\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"uPNcBgFhrLW3FtvyYYbBUi53BBEQf9e4NPgwxaLu5Hn\",\"deprecated\":true,\"name\":\"soHGET/soUSDC\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"3puWJFZyCso14EdxhywjD7xqyTarpsULx483mzvqxQRW\",\"deprecated\":true,\"name\":\"soCREAM/soUSDC\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"8Ae7Uhigx8k4fKdJG7irdPCVDZLvWsJfeTH2t5fr3TVD\",\"deprecated\":true,\"name\":\"soUBXT/soUSDC\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"Hze5AUX4Qp1cTujiJ4CsAMRGn4g6ZpgXsmptFn3xxhWg\",\"deprecated\":true,\"name\":\"soHNT/soUSDC\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"FJq4HX3bUSgF3yQZ8ADALtJYfAyr9fz36SNG18hc3dgF\",\"deprecated\":true,\"name\":\"soFRONT/soUSDC\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"BZMuoQ2i2noNUXMdrRDivc7MwjGspNJTCfZkdHMwK18T\",\"deprecated\":true,\"name\":\"soALEPH/soUSDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"5LgJphS6D5zXwUVPU7eCryDBkyta3AidrJ5vjNU6BcGW\",\"deprecated\":true,\"name\":\"BTC/soUSDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"DmEDKZPXXkWgaYiKgWws2ZXWWKCh41eryDPRVD4zKnD9\",\"deprecated\":true,\"name\":\"soETH/soUSDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"EBFTQNg2QjyxV7WDDenoLbfLLXLcbSz6w1YrdTCGPWT5\",\"deprecated\":true,\"name\":\"SOL/soUSDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"8YmQZRXGizZXYPCDmxgjwB8X8XN4PZG7MMwNg76iAmPZ\",\"deprecated\":true,\"name\":\"SRM/soUSDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"9vFuX2BizwinWjkZLQTmThDcNMFEcY3wVXYuqnRQtcD\",\"deprecated\":true,\"name\":\"soSUSHI/soUSDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"C5NReXAeQhfjiDCGPFj1UUmDxDqF8v2CUVKoYuQqb4eW\",\"deprecated\":true,\"name\":\"soSXP/soUSDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"58H7ZRmiyWtsrz2sQGz1qQCMW6n7447xhNNehUSQGPj5\",\"deprecated\":true,\"name\":\"MSRM/soUSDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"ES8skmkEeyH1BYFThd2FtyaFKhkqtwH7XWp8mXptv3vg\",\"deprecated\":true,\"name\":\"soFTT/soUSDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"Gw78CYLLFbgmmn4rps9KoPAnNtBQ2S1foL2Mn6Z5ZHYB\",\"deprecated\":true,\"name\":\"soYFI/soUSDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"WjfsTPyrvUUrhGJ9hVQFubMnKDcnQS8VxSXU7L2gLcA\",\"deprecated\":true,\"name\":\"soLINK/soUSDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"2ZmB255T4FVUugpeXTFxD6Yz5GE47yTByYvqSTDUbk3G\",\"deprecated\":true,\"name\":\"soHGET/soUSDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"FGJtCDXoHLHjagP5Ht6xcUFt2rW3z8MJPe87rFKP2ZW6\",\"deprecated\":true,\"name\":\"soCREAM/soUSDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"7K6MPog6LskZmyaYwqtLvRUuedoiE68nirbQ9tK3LasE\",\"deprecated\":true,\"name\":\"soUBXT/soUSDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"9RyozJe3bkAFfH3jmoiKHjkWCoLTxn7aBQSi6YfaV6ab\",\"deprecated\":true,\"name\":\"soHNT/soUSDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"AGtBbGuJZiv3Ko3dfT4v6g4kCqnNc9DXfoGLe5HpjmWx\",\"deprecated\":true,\"name\":\"soFRONT/soUSDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"AA1HSrsMcRNzjaQfRMTNarHR9B7e4U79LJ2319UtiqPF\",\"deprecated\":true,\"name\":\"soAKRO/soUSDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"AUAobJdffexcoJBMeyLorpShu3ZtG9VvPEPjoeTN4u5Z\",\"deprecated\":true,\"name\":\"soHXRO/soUSDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"GpdYLFbKHeSeDGqsnQ4jnP7D1294iBpQcsN1VPwhoaFS\",\"deprecated\":true,\"name\":\"soUNI/soUSDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"sxS9EdTx1UPe4j2c6Au9f1GKZXrFj5pTgNKgjGGtGdY\",\"deprecated\":true,\"name\":\"soKEEP/soUSDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"CfnnU38ACScF6pcurxSB3FLXeZmfFYunVKExeUyosu5P\",\"deprecated\":true,\"name\":\"soMATH/soUSDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"7NR5GDouQYkkfppVkNhpa4HfJ2LwqUQymE3b4CYQiYHa\",\"deprecated\":true,\"name\":\"soALEPH/USDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"CVfYa8RGXnuDBeGmniCcdkBwoLqVxh92xB1JqgRQx3F\",\"deprecated\":true,\"name\":\"BTC/USDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"H5uzEytiByuXt964KampmuNCurNDwkVVypkym75J2DQW\",\"deprecated\":true,\"name\":\"soETH/USDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"7xMDbYTCqQEcK2aM9LbetGtNFJpzKdfXzLL5juaLh4GJ\",\"deprecated\":true,\"name\":\"SOL/USDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"CDdR97S8y96v3To93aKvi3nCnjUrbuVSuumw8FLvbVeg\",\"deprecated\":true,\"name\":\"SRM/USDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"7LVJtqSrF6RudMaz5rKGTmR3F3V5TKoDcN6bnk68biYZ\",\"deprecated\":true,\"name\":\"soSUSHI/USDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"13vjJ8pxDMmzen26bQ5UrouX8dkXYPW1p3VLVDjxXrKR\",\"deprecated\":true,\"name\":\"soSXP/USDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"AwvPwwSprfDZ86beBJDNH5vocFvuw4ZbVQ6upJDbSCXZ\",\"deprecated\":true,\"name\":\"MSRM/USDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"FfDb3QZUdMW2R2aqJQgzeieys4ETb3rPrFFfPSemzq7R\",\"deprecated\":true,\"name\":\"soFTT/USDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"4QL5AQvXdMSCVZmnKXiuMMU83Kq3LCwVfU8CyznqZELG\",\"deprecated\":true,\"name\":\"soYFI/USDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"7JCG9TsCx3AErSV3pvhxiW4AbkKRcJ6ZAveRmJwrgQ16\",\"deprecated\":true,\"name\":\"soLINK/USDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"3otQFkeQ7GNUKT3i2p3aGTQKS2SAw6NLYPE5qxh3PoqZ\",\"deprecated\":true,\"name\":\"soHGET/USDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"2M8EBxFbLANnCoHydypL1jupnRHG782RofnvkatuKyLL\",\"deprecated\":true,\"name\":\"soCREAM/USDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"3UqXdFtNBZsFrFtRGAWGvy9R8H6GJR2hAyGRdYT9BgG3\",\"deprecated\":true,\"name\":\"soUBXT/USDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"9jiasgdYGGh34fAbBQSwkKe1dYSapXbjy2sLsYpetqFp\",\"deprecated\":true,\"name\":\"soHNT/USDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"7oKqJhnz9b8af8Mw47dieTiuxeaHnRYYGBiqCrRpzTRD\",\"deprecated\":true,\"name\":\"soFRONT/USDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"F1rxD8Ns5w4WzVcTRdaJ96LG7YKaA5a25BBmM32yFP4b\",\"deprecated\":true,\"name\":\"soAKRO/USDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"6ToedDwjRCvrcKX7fnHSTA9uABQe1dcLK6YgS5B9M3wo\",\"deprecated\":true,\"name\":\"soHXRO/USDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"FURvCsDUiuUaxZ13pZqQbbfktFGWmQVTHz7tL992LQVZ\",\"deprecated\":true,\"name\":\"soUNI/USDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"EcfDRMrEJ3yW4SgrRyyxTPoKqAZDNSBV8EerigT7BNSS\",\"deprecated\":true,\"name\":\"soKEEP/USDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"2bPsJ6bZ9KDLfJ8QgSN1Eb4mRsbAiaGyHN6cJkoVLpwd\",\"deprecated\":true,\"name\":\"soMATH/USDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"B1GypajMh7S8zJVp6M1xMfu6zGsMgvYrt3cSn9wG7Dd6\",\"deprecated\":true,\"name\":\"soTOMO/USDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"rPTGvVrNFYzBeTEcYnHiaWGNnkSXsWNNjUgk771LkwJ\",\"deprecated\":true,\"name\":\"soLUA/USDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"FrDavxi4QawYnQY259PVfYUjUvuyPNfqSXbLBqMnbfWJ\",\"deprecated\":true,\"name\":\"FIDA/USDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"CVn1nJ5Utuseyy2qqwrpYoJz9Y7jjYonVL4UYvcCepDH\",\"deprecated\":true,\"name\":\"KIN/USDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"BqjGW7ousAizgs8VrHo5SR1LxTksAQPtb8cKZZiNvX5D\",\"deprecated\":true,\"name\":\"MAPS/USDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"GcoKtAmTy5QyuijXSmJKBtFdt99e6Buza18Js7j9AJ6e\",\"deprecated\":false,\"name\":\"soALEPH/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"A8YFbxQYFVqKZaoYJLLUVcQiWP7G2MeEgW5wsAQgMvFw\",\"deprecated\":false,\"name\":\"BTC/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"4tSvZvnbyzHXLMTiFonMyxZoHmFqau1XArcRCVHLZ5gX\",\"deprecated\":false,\"name\":\"soETH/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"ByRys5tuUWDgL73G8JBAEfkdFf8JWBzPBDHsBVQ5vbQA\",\"deprecated\":false,\"name\":\"SRM/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"A1Q9iJDVVS8Wsswr9ajeZugmj64bQVCYLZQLra2TMBMo\",\"deprecated\":false,\"name\":\"soSUSHI/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"4LUro5jaPaTurXK737QAxgJywdhABnFAMQkXX4ZyqqaZ\",\"deprecated\":false,\"name\":\"soSXP/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"4VKLSYdvrQ5ngQrt1d2VS8o4ewvb2MMUZLiejbnGPV33\",\"deprecated\":false,\"name\":\"MSRM/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"2Pbh1CvRVku1TgewMfycemghf6sU9EyuFDcNXqvRmSxc\",\"deprecated\":false,\"name\":\"soFTT/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"7qcCo8jqepnjjvB5swP4Afsr3keVBs6gNpBTNubd1Kr2\",\"deprecated\":false,\"name\":\"soYFI/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"3hwH1txjJVS8qv588tWrjHfRxdqNjBykM1kMcit484up\",\"deprecated\":false,\"name\":\"soLINK/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"88vztw7RTN6yJQchVvxrs6oXUDryvpv9iJaFa1EEmg87\",\"deprecated\":false,\"name\":\"soHGET/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"7nZP6feE94eAz9jmfakNJWPwEKaeezuKKC5D1vrnqyo2\",\"deprecated\":false,\"name\":\"soCREAM/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"2wr3Ab29KNwGhtzr5HaPCyfU1qGJzTUAN4amCLZWaD1H\",\"deprecated\":false,\"name\":\"soUBXT/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"CnUV42ZykoKUnMDdyefv5kP6nDSJf7jFd7WXAecC6LYr\",\"deprecated\":false,\"name\":\"soHNT/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"9Zx1CvxSVdroKMMWf2z8RwrnrLiQZ9VkQ7Ex3syQqdSH\",\"deprecated\":false,\"name\":\"soFRONT/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"5CZXTTgVZKSzgSA3AFMN5a2f3hmwmmJ6hU8BHTEJ3PX8\",\"deprecated\":false,\"name\":\"soAKRO/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"6Pn1cSiRos3qhBf54uBP9ZQg8x3JTardm1dL3n4p29tA\",\"deprecated\":false,\"name\":\"soHXRO/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"6JYHjaQBx6AtKSSsizDMwozAEDEZ5KBsSUzH7kRjGJon\",\"deprecated\":false,\"name\":\"soUNI/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"J7cPYBrXVy8Qeki2crZkZavcojf2sMRyQU7nx438Mf8t\",\"deprecated\":false,\"name\":\"soMATH/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"8BdpjpSD5n3nk8DQLqPUyTZvVqFu6kcff5bzUX5dqDpy\",\"deprecated\":false,\"name\":\"soTOMO/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"4xyWjQ74Eifq17vbue5Ut9xfFNfuVB116tZLEpiZuAn8\",\"deprecated\":false,\"name\":\"soLUA/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"jyei9Fpj2GtHLDDGgcuhDacxYLLiSyxU4TY7KxB2xai\",\"deprecated\":false,\"name\":\"SRM/SOL\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"9wFFyRfZBsuAha4YcuxcXLKwMxJR43S7fPfQLusDBzvT\",\"deprecated\":false,\"name\":\"SOL/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"E14BKBhDWD4EuTkWj1ooZezesGxMW8LPCps4W5PuzZJo\",\"deprecated\":false,\"name\":\"FIDA/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"Bn6NPyr6UzrFAwC4WmvPvDr2Vm8XSUnFykM2aQroedgn\",\"deprecated\":false,\"name\":\"KIN/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"3A8XQRWXC7BjLpgLDDBhQJLT5yPCzS16cGYRKHkKxvYo\",\"deprecated\":false,\"name\":\"MAPS/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"3rgacody9SvM88QR83GHaNdEEx4Fe2V2ed5GJp2oeKDr\",\"deprecated\":false,\"name\":\"soKEEP/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"EmCzMQfXMgNHcnRoFwAdPe1i2SuiSzMj1mx6wu3KN2uA\",\"deprecated\":true,\"name\":\"soALEPH/soUSDT\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"8AcVjMG2LTbpkjNoyq8RwysokqZunkjy3d5JDzxC6BJa\",\"deprecated\":true,\"name\":\"BTC/soUSDT\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"HfCZdJ1wfsWKfYP2qyWdXTT5PWAGWFctzFjLH48U1Hsd\",\"deprecated\":true,\"name\":\"soETH/soUSDT\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"8mDuvJJSgoodovMRYArtVVYBbixWYdGzR47GPrRT65YJ\",\"deprecated\":true,\"name\":\"SOL/soUSDT\",\"programId\":\"BJ3jrUzddfuSrZHXSCxMUUQsjKEyLmuuyZebkcaFp2fg\"},{\"address\":\"HARFLhSq8nECZk4DVFKvzqXMNMA9a3hjvridGMFizeLa\",\"deprecated\":true,\"name\":\"SRM/soUSDT\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"DzFjazak6EKHnaB2w6qSsArnj28CV1TKd2Smcj9fqtHW\",\"deprecated\":true,\"name\":\"soSUSHI/soUSDT\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"GuvWMATdEV6DExWnXncPYEzn4ePWYkvGdC8pu8gsn7m7\",\"deprecated\":true,\"name\":\"soSXP/soUSDT\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"H4snTKK9adiU15gP22ErfZYtro3aqR9BTMXiH3AwiUTQ\",\"deprecated\":true,\"name\":\"MSRM/soUSDT\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"DHDdghmkBhEpReno3tbzBPtsxCt6P3KrMzZvxavTktJt\",\"deprecated\":true,\"name\":\"soFTT/soUSDT\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"5zu5bTZZvqESAAgFsr12CUMxdQvMrvU9CgvC1GW8vJdf\",\"deprecated\":true,\"name\":\"soYFI/soUSDT\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"F5xschQBMpu1gD2q1babYEAVJHR1buj1YazLiXyQNqSW\",\"deprecated\":true,\"name\":\"soLINK/soUSDT\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"BAbc9baz4hV1hnYjWSJ6cZDRjfvziWbYGQu9UFkcdUmx\",\"deprecated\":true,\"name\":\"soHGET/soUSDT\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"EBxJWA2nLV57ZntbjizxH527ZjPNLT5cpUHMnY5k3oq\",\"deprecated\":true,\"name\":\"soCREAM/soUSDT\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"46VdEkj4MJwZinwVb3Y7DUDpVXLNb9YW7P2waKU3vCqr\",\"deprecated\":true,\"name\":\"soUBXT/soUSDT\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"Hc22rHKrhbrZBaQMmhJvPTkp1yDr31PDusU8wKoqFSZV\",\"deprecated\":true,\"name\":\"soHNT/soUSDT\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"HFoca5HKwiTPpw9iUY5iXWqzkXdu88dS7YrpSvt2uhyF\",\"deprecated\":true,\"name\":\"soFRONT/soUSDT\",\"programId\":\"4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn\"},{\"address\":\"5xnYnWca2bFwC6cPufpdsCbDJhMjYCC59YgwoZHEfiee\",\"deprecated\":true,\"name\":\"soALEPH/soUSDT\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"EXnGBBSamqzd3uxEdRLUiYzjJkTwQyorAaFXdfteuGXe\",\"deprecated\":true,\"name\":\"BTC/soUSDT\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"5abZGhrELnUnfM9ZUnvK6XJPoBU5eShZwfFPkdhAC7o\",\"deprecated\":true,\"name\":\"soETH/soUSDT\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"7xLk17EQQ5KLDLDe44wCmupJKJjTGd8hs3eSVVhCx932\",\"deprecated\":true,\"name\":\"SOL/soUSDT\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"H3APNWA8bZW2gLMSq5sRL41JSMmEJ648AqoEdDgLcdvB\",\"deprecated\":true,\"name\":\"SRM/soUSDT\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"4uZTPc72sCDcVRfKKii67dTPm2Xe4ri3TYnGcUQrtnU9\",\"deprecated\":true,\"name\":\"soSUSHI/soUSDT\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"33GHmwG9woY95JuWNi74Aa8uKvysSXxif9P1EwwkrCRz\",\"deprecated\":true,\"name\":\"soSXP/soUSDT\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"FUaF58sDrgbqakHTR8RUwRLauSofRTjqyCsqThFPh6YM\",\"deprecated\":true,\"name\":\"MSRM/soUSDT\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"5NqjQVXLuLSDnsnQMfWp3rF9gbWDusWG4B1Xwtk3rZ5S\",\"deprecated\":true,\"name\":\"soFTT/soUSDT\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"97NiXHUNkpYd1eb2HthSDGhaPfepuqMAV3QsZhAgb1wm\",\"deprecated\":true,\"name\":\"soYFI/soUSDT\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"hBswhpNyz4m5nt4KwtCA7jYXvh7VmyZ4TuuPmpaKQb1\",\"deprecated\":true,\"name\":\"soLINK/soUSDT\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"GaeUpY7CT8rjoeVGjY1t3mJJDd1bdXxYWtrGSpsVFors\",\"deprecated\":true,\"name\":\"soHGET/soUSDT\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"7qq9BABQvTWKZuJ5fX2PeTKX6XVtduEs9zW9WS21fSzN\",\"deprecated\":true,\"name\":\"soCREAM/soUSDT\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"DCHvVahuLTNWBGUtEzF5GrTdx5FRpxqEJiS6Ru1hrDfD\",\"deprecated\":true,\"name\":\"soUBXT/soUSDT\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"DWjJ8VHdGYBxDQYdrRBVDWkHswrgjuBFEv5pBhiRoPBz\",\"deprecated\":true,\"name\":\"soHNT/soUSDT\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"56eqxJYzPigm4FkigiBdsfebjMgAbKNh24E7oiKLBtye\",\"deprecated\":true,\"name\":\"soFRONT/soUSDT\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"FQbCNSVH3RgosCPB4CJRstkLh5hXkvuXzAjQzT11oMYo\",\"deprecated\":true,\"name\":\"soAKRO/soUSDT\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"Fs5xtGUmJTYo8Ao75M3R3m3mVX53KMUhzfXCmyRLnp2P\",\"deprecated\":true,\"name\":\"soHXRO/soUSDT\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"ChKV7mxecPqFPGYJjhzowPHDiLKFWXXVujUiE3EWxFcg\",\"deprecated\":true,\"name\":\"soUNI/soUSDT\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"6N3oU7ALvn2RPwdpYVzPBgQJ8njT29inBbS2tSrwx8fh\",\"deprecated\":true,\"name\":\"soKEEP/soUSDT\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"5P6dJbyKySFXMYNWiEcNQu8xPRYsehYzCeVpae9Ueqrg\",\"deprecated\":true,\"name\":\"soMATH/soUSDT\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"H7c8FcQPJ2E5tJmpWBPSi7xCAbk8immdtUxKFRUyE4Ro\",\"deprecated\":true,\"name\":\"soTOMO/soUSDT\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"7PSeX1AEtBY9KvgegF5rUh452VemMh7oDzFtJgH7sxMG\",\"deprecated\":true,\"name\":\"soLUA/soUSDT\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"AF2oQQaLtcrTnQyVs3EPTdyw57TPaK6njKYDq2Qw7LqP\",\"deprecated\":true,\"name\":\"soSWAG/soUSDT\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"9TE15E5h61zJ5VmQAAHkGrAuQdFTth33aBbKdcrppZBp\",\"deprecated\":true,\"name\":\"FIDA/soUSDT\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"8HEaA1vSA5mGQoHcvRPNibnuZvnUpSjJJru9HJNH3SqM\",\"deprecated\":true,\"name\":\"KIN/soUSDT\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"8EuuEwULFM7n7zthPjC7kA64LPRzYkpAyuLFiLuVg7D4\",\"deprecated\":true,\"name\":\"soUSDT/USDC\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"8grUs4WZoTs4KJ8LfRNUBs6SNkMTp5BnVRzJgQ2ranDT\",\"deprecated\":true,\"name\":\"MAPS/soUSDT\",\"programId\":\"EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o\"},{\"address\":\"FoCuWt4KboucUg2PwmQ3dbkvLqYPLnAo1Rsm8p7QPyf\",\"deprecated\":true,\"name\":\"soALEPH/soUSDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"5r8FfnbNYcQbS1m4CYmoHYGjBtu6bxfo6UJHNRfzPiYH\",\"deprecated\":true,\"name\":\"BTC/soUSDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"71CtEComq2XdhGNbXBuYPmosAjMCPSedcgbNi5jDaGbR\",\"deprecated\":true,\"name\":\"soETH/soUSDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"EZyQ9zyqQsw3QcsLksoWyd1UFVjHZkzRx8N4ZMnZQrS2\",\"deprecated\":true,\"name\":\"SRM/soUSDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"6ERBjj692XHLWwWSRAUpiKenXshcwmPqhMy7RMapeoKa\",\"deprecated\":true,\"name\":\"soSUSHI/soUSDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"CQ3kAGxPmpBbak2RSHWyMeRhyLYbH6oVZHJxgjzDLpLW\",\"deprecated\":true,\"name\":\"soSXP/soUSDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"2Hqn46jhwaQMQ3zEnHtxrWxQZom6qwLXAgdsFJM1Srwh\",\"deprecated\":true,\"name\":\"MSRM/soUSDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"G5jqZNo2UVCTnJxgEhKCYvqFRs3MxsnH8Bervq3rfLoL\",\"deprecated\":true,\"name\":\"soFTT/soUSDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"CbwtTHEpfTnCyLw4GoTbKk7WyrXkuATLfLadY2odBSsY\",\"deprecated\":true,\"name\":\"soYFI/soUSDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"5GjhBAYx8pYeCeUQt7rt93KQZnoQFuDq9Jx4iqq97Mip\",\"deprecated\":true,\"name\":\"soLINK/soUSDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"9jMPV9E23pTirMjC7vz5suRNkd25311G3Httg7jTib8R\",\"deprecated\":true,\"name\":\"soCREAM/soUSDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"DsSz9KWT97T4RewRTqTNDpNFQyxMPcuYNAJw2xHAzSiZ\",\"deprecated\":true,\"name\":\"soUBXT/soUSDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"3k1sURztjxhjYczjyioQ7y2UkMB6K5Ksi3SWvLeLx6Ex\",\"deprecated\":true,\"name\":\"soHNT/soUSDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"B791G8UCahfmABVcR2wPAMK6LJnuqxSAqiG6wX3mmVVM\",\"deprecated\":true,\"name\":\"soFRONT/soUSDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"95f7fxfUh8WqUTrdjorHRXm6rTfkWqr23ioGMmKMjedP\",\"deprecated\":true,\"name\":\"soAKRO/soUSDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"H4RxtmQ4P3TYPt78G3DuHgaGzyFct6MfaeYneLB5PyeG\",\"deprecated\":true,\"name\":\"soHXRO/soUSDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"7myaZEGZf9m72T1Mqm8GTx5MnmSFS5NCXSwRP18W4EA3\",\"deprecated\":true,\"name\":\"soUNI/soUSDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"7cRKzNoqjF9VtzvdnP129VYP3izivk9iY3jMJBMzREVT\",\"deprecated\":true,\"name\":\"soHGET/soUSDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"GV9fYzdwipoaagXFxe5tzDMPcmSVQati5CUvBPsEZThH\",\"deprecated\":true,\"name\":\"soMATH/soUSDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"AaMLXcwYYi5fA41JNCB2ukAmQyKHitYx5NnpsiWWev6R\",\"deprecated\":true,\"name\":\"soTOMO/soUSDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"5ZeNLrduGi3WkH9CPwv2Zpbkh38MH8v63aSi2aBUW23g\",\"deprecated\":true,\"name\":\"soLUA/soUSDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"Ec1aq54XKH9o5fe169cU2sCcxxTP54eeQCe77SpizKuc\",\"deprecated\":true,\"name\":\"soUSDT/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"G3uhFg2rBFunHUXtCera13vyQ5KCS8Hx3d4HohLoZbT5\",\"deprecated\":true,\"name\":\"SOL/soUSDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"2NMTG7tFZidRpQk9Sf4dgQyJb9HxKCyXjQdiuXww3sKm\",\"deprecated\":true,\"name\":\"soSWAG/soUSDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"7QpJAiwGmqY1SiucjfPXvgeWwCobyV6hZSgzMysZX6Ww\",\"deprecated\":true,\"name\":\"FIDA/soUSDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"CmLhvXARncLncE1949XBfQWeJh6Zvw3FE5A3Z5ecPYQH\",\"deprecated\":true,\"name\":\"KIN/soUSDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"FhP3X2ptdi7L1RtWK9Vfow5dyzD92gfXiA57e8eqxvka\",\"deprecated\":true,\"name\":\"MAPS/soUSDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"DE7xJE2EkaV81wLabDMuhBzUwFhhwfURLdz1aXBBQZQ1\",\"deprecated\":true,\"name\":\"soKEEP/soUSDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"5nLJ22h1DUfeCfwbFxPYK8zbfbri7nA9bXoDcR8AcJjs\",\"deprecated\":false,\"name\":\"MSRM/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"7dLVkUfBVfCGkFhSXDCq1ukM9usathSgS716t643iFGF\",\"deprecated\":false,\"name\":\"soETH/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"8afKwzHR3wJE7W7Y5hvQkngXh6iTepSZuutRMMy96MjR\",\"deprecated\":false,\"name\":\"soSXP/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"cgani53cMZgYfRMgSrNekJTMaLmccRfspsfTbXWRg7u\",\"deprecated\":false,\"name\":\"soCEL/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"Gyp1UGRgbrb6z8t7fpssxEKQgEmcJ4pVnWW3ds2p6ZPY\",\"deprecated\":false,\"name\":\"soALEPH/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"4ztJEvQyryoYagj2uieep3dyPwG2pyEwb2dKXTwmXe82\",\"deprecated\":false,\"name\":\"soCREAM/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"HEGnaVL5i48ubPBqWAhodnZo8VsSLzEM3Gfc451DnFj9\",\"deprecated\":false,\"name\":\"soKEEP/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"8FpuMGLtMZ7Wt9ZvyTGuTVwTwwzLYfS5NZWcHxbP1Wuh\",\"deprecated\":false,\"name\":\"soHNT/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"5GAPymgnnWieGcRrcghZdA3aanefqa4cZx1ZSE8UTyMV\",\"deprecated\":false,\"name\":\"soMAPS/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"AADohBGxvf7bvixs2HKC3dG2RuU3xpZDwaTzYFJThM8U\",\"deprecated\":false,\"name\":\"TRYB/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"EbV7pPpEvheLizuYX3gUCvWM8iySbSRAhu2mQ5Vz2Mxf\",\"deprecated\":false,\"name\":\"FIDA/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"FcPet5fz9NLdbXwVM6kw2WTHzRAD7mT78UjwTpawd7hJ\",\"deprecated\":false,\"name\":\"soRSR/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"AtNnsY1AyRERWJ8xCskfz38YdvruWVJQUVXgScC1iPb\",\"deprecated\":false,\"name\":\"SRM/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"teE55QrL4a4QSfydR9dnHF97jgCfptpuigbb53Lo95g\",\"deprecated\":false,\"name\":\"RAY/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"C1EuT9VokAKLiW7i2ASnZUvxDoKuKkCpDDeNxAptuNe4\",\"deprecated\":false,\"name\":\"BTC/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"Hr3wzG8mZXNHV7TuL6YqtgfVUesCqMxGYCEyP3otywZE\",\"deprecated\":false,\"name\":\"soFTT/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"HLvRdctRB48F9yLnu9E24LUTRt89D48Z35yi1HcxayDf\",\"deprecated\":false,\"name\":\"soAKRO/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"2SSnWNrc83otLpfRo792P6P3PESZpdr8cu2r8zCE6bMD\",\"deprecated\":false,\"name\":\"soUNI/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"F1T7b6pnR8Pge3qmfNUfW6ZipRDiGpMww6TKTrRU4NiL\",\"deprecated\":false,\"name\":\"soUBXT/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"HWHvQhFmJB3NUcu1aihKmrKegfVxBEHzwVX6yZCKEsi1\",\"deprecated\":false,\"name\":\"SOL/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"35tV8UsHH8FnSAi3YFRrgCu4K9tb883wKnAXpnihot5r\",\"deprecated\":false,\"name\":\"soLUA/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"6DgQRTpJTnAYBSShngAVZZDq7j9ogRN1GfSQ3cq9tubW\",\"deprecated\":false,\"name\":\"soSUSHI/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"2WghiBkDL2yRhHdvm8CpprrkmfguuQGJTCDfPSudKBAZ\",\"deprecated\":false,\"name\":\"soMATH/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"ErQXxiNfJgd4fqQ58PuEw5xY35TZG84tHT6FXf5s4UxY\",\"deprecated\":false,\"name\":\"soHGET/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"CGC4UgWwqA9PET6Tfx6o6dLv94EK2coVkPtxgNHuBtxj\",\"deprecated\":false,\"name\":\"soFRONT/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"GnKPri4thaGipzTbp8hhSGSrHgG4F8MFiZVrbRn16iG2\",\"deprecated\":false,\"name\":\"soTOMO/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"6bxuB5N3bt3qW8UnPNLgMMzDq5sEH8pFmYJYGgzvE11V\",\"deprecated\":false,\"name\":\"soAAVE/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"7cknqHAuGpfVXPtFoJpFvUjJ8wkmyEfbFusmwMfNy3FE\",\"deprecated\":false,\"name\":\"MAPS/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"4absuMsgemvdjfkgdLQq1zKEjw3dHBoCWkzKoctndyqd\",\"deprecated\":false,\"name\":\"soHXRO/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"4nCFQr8sahhhL4XJ7kngGFBmpkmyf3xLzemuMhn6mWTm\",\"deprecated\":false,\"name\":\"KIN/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"3Xg9Q4VtZhD4bVYJbTfgGWFV5zjE3U7ztSHa938zizte\",\"deprecated\":false,\"name\":\"soYFI/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"3yEZ9ZpXSQapmKjLAGKZEzUNA1rcupJtsDp5mPBWmGZR\",\"deprecated\":false,\"name\":\"soLINK/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"J2XSt77XWim5HwtUM8RUwQvmRXNZsbMKpp5GTKpHafvf\",\"deprecated\":false,\"name\":\"soSWAG/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"77quYg4MGneUdjgXCunt9GgM1usmrxKY31twEy3WHwcS\",\"deprecated\":false,\"name\":\"USDT/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"GKLev6UHeX1KSDCyo2bzyG6wqhByEzDBkmYTxEdmYJgB\",\"deprecated\":false,\"name\":\"OXY/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"address\":\"HdBhZrnrxpje39ggXnTb6WuTWVvj5YKcSHwYGQCRsVj\",\"deprecated\":false,\"name\":\"OXY/soUSDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"name\":\"OXY/USDC\",\"address\":\"GZ3WBFsqntmERPwumFEYgrX2B7J7G11MzNZAy7Hje27X\",\"deprecated\":false,\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"name\":\"xCOPE/USDC\",\"address\":\"7MpMwArporUHEGW7quUpkPZp5L5cHPs9eKUfKCdaPHq2\",\"deprecated\":false,\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"name\":\"COPE/USDC\",\"address\":\"6fc7v3PmjZG9Lk2XTot6BywGyYLkBQuzuFKd4FpCsPxk\",\"deprecated\":false,\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"name\":\"MER/USDC\",\"address\":\"HhvDWug3ftYNx5148ZmrQxzvEmohN2pKVNiRT4TVoekF\",\"deprecated\":true,\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"name\":\"MER/USDT\",\"address\":\"6HwcY27nbeb933UkEcxqJejtjWLfNQFWkGCjAVNes6g7\",\"deprecated\":false,\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"name\":\"MER/USDC\",\"address\":\"G4LcexdCzzJUKZfqyVDQFzpkjhB1JoCNL8Kooxi9nJz5\",\"deprecated\":false,\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"name\":\"SNY/USDC\",\"address\":\"DPfj2jYwPaezkCmUNm5SSYfkrkz8WFqwGLcxDDUsN3gA\",\"deprecated\":false,\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"name\":\"SLRS/USDC\",\"address\":\"2Gx3UfV831BAh8uQv1FKSPKS9yajfeeD8GJ4ZNb2o2YP\",\"deprecated\":false,\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\"},{\"name\":\"ETHV/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"HrgkuJryyKRserkoz7LBFYkASzhXHWp9XA6fRYCA6PHb\"},{\"name\":\"IETHV/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"5aoLj1bySDhhWjo7cLfT3pF2gqNGd63uEJ9HMSfASESL\"},{\"name\":\"SBR/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"HXBi8YBwbh4TXF6PjVw81m8Z3Cc4WBofvauj5SBFdgUs\"},{\"name\":\"renBTC/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"74Ciu5yRzhe8TFTHvQuEVbFZJrbnCMRoohBK33NNiPtv\"},{\"name\":\"renDOGE/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"5FpKCWYXgHWZ9CdDMHjwxAfqxJLdw2PRXuAmtECkzADk\"},{\"name\":\"DXL/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"DYfigimKWc5VhavR4moPBibx9sMcWYVSjVdWvPztBPTa\"},{\"name\":\"MNGO/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"3d4rzwpy9iGdCZvgxcu7B1YocYffVLsQXPXkBZKt2zLc\"},{\"name\":\"CYS/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"6V6y6QFi17QZC9qNRpVp7SaPiHpCTp2skbRQkUyZZXPW\"},{\"name\":\"POLIS/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"HxFLKUAmAMLz1jtT3hbvCMELwH5H9tpM2QugP8sKyfhW\"},{\"name\":\"ATLAS/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"Di66GTLsV64JgCCYGVcY21RZ173BHkjJVgPyezNN7P1K\"},{\"name\":\"LIKE/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"3WptgZZu34aiDrLMUiPntTYZGNZ72yT1yxHYxSdbTArX\"},{\"name\":\"MSOL/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"6oGsL2puUgySccKzn9XA9afqF217LfxP5ocq4B3LWsjy\"},{\"name\":\"MSOL/SOL\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"5cLrMai1DsLRYc1Nio9qMTicsWtvzjzZfJPXyAoF4t1Z\"},{\"name\":\"AAVE/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"8WZrmdpLckptiVKd2fPHPjewRVYQGQkjxi9vzRYG1sfs\"},{\"name\":\"AAVE/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"LghsMERQWQFK3zWMTrUkoyAJARQw2wSmcYZjexeN3zy\"},{\"name\":\"AKRO/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"G3h8NZgJozk9crme2me6sKDJuSQ12mNCtvC9NbSWqGuk\"},{\"name\":\"AKRO/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"DvbiPxKzuXZPcmUcYDqBz1tvUrXYPsNrRAjSeuwHtmEA\"},{\"name\":\"ALEPH/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"Fw4mvuE7KZmTjQPxP2sRpHwPDfRMWnKBupFZGyW9CAQH\"},{\"name\":\"ALEPH/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"GZeHR8uCTVoHVDZFRVXTgm386DK1EKehy9yMS3BFChcL\"},{\"name\":\"CEL/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"79ESpYSb2hM14KTRXPZUwDkxUGC5irE2esd1vxdXfnZz\"},{\"name\":\"CEL/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"J9ww1yufRNDDbUbDXmew2mW2ozkx7cme7dMvKjMQVHrL\"},{\"name\":\"CREAM/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"4pdQ2D4gehMhGu4z9jeQbEPUFbTxB5qcPr3zCynjJGyp\"},{\"name\":\"CREAM/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"6fspxMfBmYFTGFBDN5MU33A55i2MkGr7eSjBLPCAU6y9\"},{\"name\":\"ETH/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"8Gmi2HhZmwQPVdCwzS7CM66MGstMXPcTVHA7jF19cLZz\"},{\"name\":\"ETH/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"ch7kmPrtoQUSEPBggcNAvLGiMQkJagVwd3gDYfd8m7Q\"},{\"name\":\"FRONT/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"B95oZN5HCLGmFAhbzReWBA9cuSGPFQAXeuhm2FfpdrML\"},{\"name\":\"FRONT/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"DZTYyy1L5Pr6DmTtYY5bEuU9g3LQ4XGvuYiN3zS25yG7\"},{\"name\":\"FTT/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"2wteg25ch227n4Rh1CN4WNrDZXBpRBpWJ48mEC2K7f4r\"},{\"name\":\"FTT/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"BoHojHESAv4McZx9gXd1bWTZMq25JYyGz4qL1m5C3nvk\"},{\"name\":\"HGET/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"27e1mB6UoPohbc3MmwMXu5QM7b2E3k5Mbhwv6JguwyXg\"},{\"name\":\"HGET/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"BdRzTEKb7Qdu4tWts5zXjwcpQErZxEzvShKZ5QcthMag\"},{\"name\":\"HXRO/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"CBb5zXwNRB73WVjs2m21P5prcEZa6SWmej74Vzxh8dRm\"},{\"name\":\"HXRO/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"3BScwNxtMrEcQ5VTHyXHYQR98dTaxfyXGaLkuSjBY1dW\"},{\"name\":\"LINK/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"FJMjxMCiDKn16TLhXUdEbVDH5wC6k9EHYJTcrH6NcbDE\"},{\"name\":\"LINK/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"Gr2KmhK7Upr4uW56B1QQrJuhhgmot6zAHJeZALTMStiX\"},{\"name\":\"LUA/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"J9imTcEeahZqKuaoQaPcCeSGCMWL8qSACpK4B7bC8NN4\"},{\"name\":\"LUA/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"BMJ3CvQZ57cNnuc3Lz5Pb6cW6Sr9kZGz3qz2bJQTE24A\"},{\"name\":\"MATH/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"G8L1YLrktaG1t8YBMJs3CwV96nExvJJCSpw3DARPDjE2\"},{\"name\":\"MATH/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"CkvNfATB7nky8zPLuwS9bgcFbVRkQdkd5zuKEovyo9rs\"},{\"name\":\"RAY/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"2xiv8A5xrJ7RnGdxXB42uFEkYHJjszEhaJyKKt4WaLep\"},{\"name\":\"RSR/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"GqgkxEswUwHBntmzb5GpUhKrVpJhzreSruZycuJwdNwB\"},{\"name\":\"RSR/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"2j2or38X2FUbpkK4gkgvjDtqN3ibkKw3v5yn7o2gHqPc\"},{\"name\":\"SUSHI/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"3uWVMWu7cwMnYMAAdtsZNwaaqeeeZHARGZwcExnQiFay\"},{\"name\":\"SUSHI/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"T3aC6qcPAJtX1gqkckfSxBPdPWziz5fLYRt5Dz3Nafq\"},{\"name\":\"SWAG/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"wSkeLMv3ktJyLm51bvQWxY2saGKqGxbnUFimPxbgEvQ\"},{\"name\":\"SWAG/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"6URQ4zFWvPm1fhJCKKWorrh8X3mmTFiDDyXEUmSf8Rb2\"},{\"name\":\"SXP/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"G5F84rfqmWqzZv5GBpSn8mMwW8zJ2B4Y1GpGupiwjHNM\"},{\"name\":\"SXP/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"2FQbPW1ticJz2SMMbEXxbKWJKmw1wLc6ggSP2HyzdMen\"},{\"name\":\"UBXT/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"Hh4p7tJpqkGW6xsHM2LiPPMpJg43fwn5TbmVmfrURdLY\"},{\"name\":\"UBXT/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"5xhjc3ZtAwnBK3qsaro28VChL7WrxY9N4SG6UZpYxpGc\"},{\"name\":\"UNI/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"B7b5rjQuqQCuGqmUBWmcCTqaL3Z1462mo4NArqty6QFR\"},{\"name\":\"UNI/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"FrKM6kJtAjXknHPEpkrQtJSXZwUxV5dq26wDpc4YjQST\"},{\"name\":\"YFI/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"BiJXGFc1c4gyPpv9HLRJoKbZewWQrTCHGuxYKjYMQJpC\"},{\"name\":\"YFI/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"9sue9TZAeUhNtNAPPGb9dke7rkJeXktGD3u8ZC37GWnQ\"},{\"name\":\"AVAX/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"E8JQstcwjuqN5kdMyUJLNuaectymnhffkvfg1j286UCr\"},{\"name\":\"AXSet/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"HZCheduA4nsSuQpVww1TiyKZpXSAitqaXxjBD2ymg22X\"},{\"name\":\"BNB/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"4UPUurKveNEJgBqJzqHPyi8DhedvpYsMXi7d43CjAg2f\"},{\"name\":\"BNB/USDT\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"FjbKNZME5yVSC1R3HJM99kB3yir3q3frS5MteMFD72sV\"},{\"name\":\"GALA/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"F7WJsoxTWQRmAwAyFe9APmuVv4HqmhchFtdbR9dvAUDm\"},{\"name\":\"MATICpo/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"5WRoQxE59966N2XfD2wYy1uhuyKeoVJ9NBMH6r6RNYEF\"},{\"name\":\"ROSE/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"EybAYkmRKCyD4w8AErTG1bqmnvT85LFuPQPMCc8J3yD\"},{\"name\":\"SAND/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"3FE2g3cadTJjN3C7gNRavwnv7Yh9Midq7h9KgTVUE7tR\"},{\"name\":\"LUNA/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"HBTu8hNaoT3VyiSSzJYa8jwt9sDGKtJviSwFa11iXdmE\"},{\"name\":\"SHIB/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"Er7Jp4PADPVHifykFwbVoHdkL1RtZSsx9zGJrPJTrCgW\"},{\"name\":\"UST/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"8WmckvEoVGZvtN8knjdzFGbWJ3Sr4BcWdyzSYuCrD4YK\"},{\"name\":\"FAB/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"Cud48DK2qoxsWNzQeTL5D8sAiHsGwG8Ev1VMNcYLayxt\"},{\"name\":\"JET/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"6pQMoHDC2o8eeFxyTKtfnsr8d48hKFWsRpLHAqVHH2ZP\"},{\"name\":\"scnSOL/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"D52sefGCWho2nd5UGxWd7wCftAzeNEMNYZkdEPGEdQTb\"},{\"name\":\"stSOL/USDC\",\"programId\":\"9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\",\"deprecated\":false,\"address\":\"5F7LGsP1LPtaRV7vVKgxwNYX4Vf22xvuzyXjyar7jJqp\"}]"));}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/token-mints.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v([{"address":"9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E","name":"BTC"},{"address":"2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk","name":"ETH"},{"address":"AGFEad2et2ZJif9jaGpdMixQqvW5i81aBdvKe7PHNfz3","name":"FTT"},{"address":"3JSf5tPeuscJGtaCp5giEiDhv51gQ4v3zWg8DGgyLfAB","name":"YFI"},{"address":"CWE8jPTUYhdCTZYWPTe1o5DFqfdjzWKc9WKz6rSjQUdG","name":"LINK"},{"address":"Ga2AXHpfAF6mv2ekZwcsJFqu7wB4NV331qNH7fW9Nst8","name":"XRP"},{"address":"Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB","name":"USDT"},{"address":"BQcdHdAQW1hczDbBi9hiegXAR7A98Q9jx3X3iBBBDiq4","name":"WUSDT"},{"address":"BXXkv6z8ykpG1yuvUDPgh732wzVHB69RnB9YgSYh3itW","name":"WUSDC"},{"address":"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v","name":"USDC"},{"address":"MSRMcoVyrFxnSgo5uXwone5SKcGhT1KEJMFEkMEWf9L","name":"MSRM"},{"address":"SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt","name":"SRM"},{"address":"AR1Mtgh7zAtxuxGd2XPovXPVjcSdY3i4rQYisNadjfKy","name":"SUSHI"},{"address":"SF3oTvfWzEP3DTwGSvUXRrGTvr75pdZNnBLAH9bzMuX","name":"SXP"},{"address":"CsZ5LZkDS7h9TDKjrbL7VAwQZ9nsRu8vJLhRYfmGaN8K","name":"ALEPH"},{"address":"BtZQfWqDGbk9Wf2rXEiWyQBdBY1etnUUn6zEphvVS7yN","name":"HGET"},{"address":"5Fu5UUgbjpUvdBveb3a1JTNirL8rXtiYeSMWvKjtUNQv","name":"CREAM"},{"address":"873KLxCbz7s9Kc4ZzgYRtNmhfkQrhfyWGZJBmyCbC3ei","name":"UBXT"},{"address":"HqB7uswoVg4suaQiDP3wjxob1G5WdZ144zhdStwMCq7e","name":"HNT"},{"address":"9S4t2NEAiJVMvPdRYKVrfJpBafPBLtvbvyS3DecojQHw","name":"FRONT"},{"address":"6WNVCuxCGJzNjmMZoKyhZJwvJ5tYpsLyAtagzYASqBoF","name":"AKRO"},{"address":"DJafV9qemGp7mLMEn5wrfqaFwxsbLgUsGVS16zKRk9kc","name":"HXRO"},{"address":"DEhAasscXF4kEGxFgJ3bq4PpVGp5wyUxMRvn6TzGVHaw","name":"UNI"},{"address":"GUohe4DJUA5FKPWo3joiPgsB7yzer7LpDmt1Vhzy3Zht","name":"KEEP"},{"address":"GeDS162t9yGJuLEHPWXXGrb1zwkzinCgRwnT8vHYjKza","name":"MATH"},{"address":"So11111111111111111111111111111111111111112","name":"SOL"},{"address":"GXMvfY2jpQctDqZ9RoU3oWPhufKiCcFEfchvYumtX7jd","name":"TOMO"},{"address":"EqWCKXfs3x47uVosDpTRgFniThL9Y8iCztJaapxbEaVX","name":"LUA"},{"address":"9F9fNTT6qwjsu4X4yWYKZpsbw5qT7o6yR2i57JF2jagy","name":"SWAG"},{"address":"EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp","name":"FIDA"},{"address":"kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6","name":"KIN"},{"address":"MAPS41MDahZ9QdKXhVa4dWB9RuyfV4XqhyAZ8XcYepb","name":"MAPS"},{"address":"z3dn17yLaGMKffVogeFHQ9zWVcXgqgf3PQnDsNs2g6M","name":"OXY"},{"address":"4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R","name":"RAY"},{"address":"3K6rftdAaQYMPunrtNRHgnK2UAtjm2JwyT2oCiTDouYE","name":"xCOPE"},{"address":"dK83wTVypEpa1pqiBbHY3MNuUnT3ADUZM4wk9VZXZEc","name":"AAVE"},{"address":"DgHK9mfhMtUwwv54GChRrU54T2Em5cuszq2uMuen1ZVE","name":"CEL"},{"address":"7ncCLJpP3MNww17LW8bRvx8odQQnubNtfNZBL5BgAEHW","name":"RSR"},{"address":"6ry4WBDvAwAnrYJVv6MCog4J8zx6S3cPgSqnTsDZ73AR","name":"TRYB"},{"address":"8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh","name":"COPE"},{"address":"MERt85fc5boKw3BW1eYdxonEuJNvXbiMbs6hvheau5K","name":"MER"},{"address":"4dmKkXNHdgYsXqBHCuMikNQWwVomZURhYvkkX5c4pQ7y","name":"SNY"},{"address":"SLRSSpSLUTP7okbCUBYStWCo1vUgyt775faPqz8HUMr","name":"SLRS"},{"address":"CDJWUqTcYTVAKXAVXoQZFes5JUFc7owSeq7eMQcDSbo5","name":"renBTC"},{"address":"ArUkYE2XDKzqy77PRRGjo4wREWwqk6RXTfM9NeqzPvjU","name":"renDOGE"},{"address":"GsNzxJfFn6zQdJGeYsupJWzUAm57Ba7335mfhWvFiE9Z","name":"DXL"}]);}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/tokens_and_markets.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MARKETS = exports.TOKEN_MINTS = exports.getLayoutVersion = exports.PROGRAM_LAYOUT_VERSIONS = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const markets_json_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/markets.json (json)"));
const token_mints_json_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/token-mints.json (json)"));
exports.PROGRAM_LAYOUT_VERSIONS = {
    '4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn': 1,
    BJ3jrUzddfuSrZHXSCxMUUQsjKEyLmuuyZebkcaFp2fg: 1,
    EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o: 2,
    '9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin': 3
};
function getLayoutVersion(programId) {
    return exports.PROGRAM_LAYOUT_VERSIONS[programId.toString()] || 3;
}
exports.getLayoutVersion = getLayoutVersion;
exports.TOKEN_MINTS = token_mints_json_1.default.map((mint)=>{
    return {
        address: new web3_js_1.PublicKey(mint.address),
        name: mint.name
    };
});
exports.MARKETS = markets_json_1.default.map((market)=>{
    return {
        address: new web3_js_1.PublicKey(market.address),
        name: market.name,
        programId: new web3_js_1.PublicKey(market.programId),
        deprecated: market.deprecated
    };
}); //# sourceMappingURL=tokens_and_markets.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/fees.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFeeTier = exports.getFeeRates = exports.supportsSrmFeeDiscounts = void 0;
const tokens_and_markets_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/tokens_and_markets.js [app-route] (ecmascript)");
function supportsSrmFeeDiscounts(programId) {
    return tokens_and_markets_1.getLayoutVersion(programId) > 1;
}
exports.supportsSrmFeeDiscounts = supportsSrmFeeDiscounts;
function getFeeRates(feeTier) {
    if (feeTier === 1) {
        // SRM2
        return {
            taker: 0.002,
            maker: -0.0003
        };
    } else if (feeTier === 2) {
        // SRM3
        return {
            taker: 0.0018,
            maker: -0.0003
        };
    } else if (feeTier === 3) {
        // SRM4
        return {
            taker: 0.0016,
            maker: -0.0003
        };
    } else if (feeTier === 4) {
        // SRM5
        return {
            taker: 0.0014,
            maker: -0.0003
        };
    } else if (feeTier === 5) {
        // SRM6
        return {
            taker: 0.0012,
            maker: -0.0003
        };
    } else if (feeTier === 6) {
        // MSRM
        return {
            taker: 0.001,
            maker: -0.0005
        };
    }
    // Base
    return {
        taker: 0.0022,
        maker: -0.0003
    };
}
exports.getFeeRates = getFeeRates;
function getFeeTier(msrmBalance, srmBalance) {
    if (msrmBalance >= 1) {
        return 6;
    } else if (srmBalance >= 1000000) {
        return 5;
    } else if (srmBalance >= 100000) {
        return 4;
    } else if (srmBalance >= 10000) {
        return 3;
    } else if (srmBalance >= 1000) {
        return 2;
    } else if (srmBalance >= 100) {
        return 1;
    } else {
        return 0;
    }
}
exports.getFeeTier = getFeeTier; //# sourceMappingURL=fees.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/market.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMintDecimals = exports.Orderbook = exports.ORDERBOOK_LAYOUT = exports.OpenOrders = exports._OPEN_ORDERS_LAYOUT_V2 = exports._OPEN_ORDERS_LAYOUT_V1 = exports.Market = exports.MARKET_STATE_LAYOUT_V3 = exports.MARKET_STATE_LAYOUT_V2 = exports._MARKET_STAT_LAYOUT_V1 = void 0;
const buffer_layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/buffer-layout@1.2.2/node_modules/buffer-layout/lib/Layout.js [app-route] (ecmascript)");
const layout_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/layout.js [app-route] (ecmascript)");
const slab_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/slab.js [app-route] (ecmascript)");
const instructions_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/instructions.js [app-route] (ecmascript)");
const bn_js_1 = __importDefault(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/bn.js@5.2.2/node_modules/bn.js/lib/bn.js [app-route] (ecmascript)"));
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const queue_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/queue.js [app-route] (ecmascript)");
const buffer_1 = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)");
const fees_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/fees.js [app-route] (ecmascript)");
const token_instructions_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/token-instructions.js [app-route] (ecmascript)");
const tokens_and_markets_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/tokens_and_markets.js [app-route] (ecmascript)");
exports._MARKET_STAT_LAYOUT_V1 = buffer_layout_1.struct([
    buffer_layout_1.blob(5),
    layout_1.accountFlagsLayout('accountFlags'),
    layout_1.publicKeyLayout('ownAddress'),
    layout_1.u64('vaultSignerNonce'),
    layout_1.publicKeyLayout('baseMint'),
    layout_1.publicKeyLayout('quoteMint'),
    layout_1.publicKeyLayout('baseVault'),
    layout_1.u64('baseDepositsTotal'),
    layout_1.u64('baseFeesAccrued'),
    layout_1.publicKeyLayout('quoteVault'),
    layout_1.u64('quoteDepositsTotal'),
    layout_1.u64('quoteFeesAccrued'),
    layout_1.u64('quoteDustThreshold'),
    layout_1.publicKeyLayout('requestQueue'),
    layout_1.publicKeyLayout('eventQueue'),
    layout_1.publicKeyLayout('bids'),
    layout_1.publicKeyLayout('asks'),
    layout_1.u64('baseLotSize'),
    layout_1.u64('quoteLotSize'),
    layout_1.u64('feeRateBps'),
    buffer_layout_1.blob(7)
]);
exports.MARKET_STATE_LAYOUT_V2 = buffer_layout_1.struct([
    buffer_layout_1.blob(5),
    layout_1.accountFlagsLayout('accountFlags'),
    layout_1.publicKeyLayout('ownAddress'),
    layout_1.u64('vaultSignerNonce'),
    layout_1.publicKeyLayout('baseMint'),
    layout_1.publicKeyLayout('quoteMint'),
    layout_1.publicKeyLayout('baseVault'),
    layout_1.u64('baseDepositsTotal'),
    layout_1.u64('baseFeesAccrued'),
    layout_1.publicKeyLayout('quoteVault'),
    layout_1.u64('quoteDepositsTotal'),
    layout_1.u64('quoteFeesAccrued'),
    layout_1.u64('quoteDustThreshold'),
    layout_1.publicKeyLayout('requestQueue'),
    layout_1.publicKeyLayout('eventQueue'),
    layout_1.publicKeyLayout('bids'),
    layout_1.publicKeyLayout('asks'),
    layout_1.u64('baseLotSize'),
    layout_1.u64('quoteLotSize'),
    layout_1.u64('feeRateBps'),
    layout_1.u64('referrerRebatesAccrued'),
    buffer_layout_1.blob(7)
]);
exports.MARKET_STATE_LAYOUT_V3 = buffer_layout_1.struct([
    buffer_layout_1.blob(5),
    layout_1.accountFlagsLayout('accountFlags'),
    layout_1.publicKeyLayout('ownAddress'),
    layout_1.u64('vaultSignerNonce'),
    layout_1.publicKeyLayout('baseMint'),
    layout_1.publicKeyLayout('quoteMint'),
    layout_1.publicKeyLayout('baseVault'),
    layout_1.u64('baseDepositsTotal'),
    layout_1.u64('baseFeesAccrued'),
    layout_1.publicKeyLayout('quoteVault'),
    layout_1.u64('quoteDepositsTotal'),
    layout_1.u64('quoteFeesAccrued'),
    layout_1.u64('quoteDustThreshold'),
    layout_1.publicKeyLayout('requestQueue'),
    layout_1.publicKeyLayout('eventQueue'),
    layout_1.publicKeyLayout('bids'),
    layout_1.publicKeyLayout('asks'),
    layout_1.u64('baseLotSize'),
    layout_1.u64('quoteLotSize'),
    layout_1.u64('feeRateBps'),
    layout_1.u64('referrerRebatesAccrued'),
    layout_1.publicKeyLayout('authority'),
    layout_1.publicKeyLayout('pruneAuthority'),
    layout_1.publicKeyLayout('consumeEventsAuthority'),
    buffer_layout_1.blob(992),
    buffer_layout_1.blob(7)
]);
class Market {
    constructor(decoded, baseMintDecimals, quoteMintDecimals, options = {}, programId, layoutOverride){
        const { skipPreflight = false, commitment = 'recent' } = options;
        if (!decoded.accountFlags.initialized || !decoded.accountFlags.market) {
            throw new Error('Invalid market state');
        }
        this._decoded = decoded;
        this._baseSplTokenDecimals = baseMintDecimals;
        this._quoteSplTokenDecimals = quoteMintDecimals;
        this._skipPreflight = skipPreflight;
        this._commitment = commitment;
        this._programId = programId;
        this._openOrdersAccountsCache = {};
        this._feeDiscountKeysCache = {};
        this._layoutOverride = layoutOverride;
    }
    static getLayout(programId) {
        if (tokens_and_markets_1.getLayoutVersion(programId) === 1) {
            return exports._MARKET_STAT_LAYOUT_V1;
        }
        return exports.MARKET_STATE_LAYOUT_V2;
    }
    static async findAccountsByMints(connection, baseMintAddress, quoteMintAddress, programId) {
        const filters = [
            {
                memcmp: {
                    offset: this.getLayout(programId).offsetOf('baseMint'),
                    bytes: baseMintAddress.toBase58()
                }
            },
            {
                memcmp: {
                    offset: Market.getLayout(programId).offsetOf('quoteMint'),
                    bytes: quoteMintAddress.toBase58()
                }
            }
        ];
        return getFilteredProgramAccounts(connection, programId, filters);
    }
    static async load(connection, address, options = {}, programId, layoutOverride) {
        const { owner, data } = throwIfNull(await connection.getAccountInfo(address), 'Market not found');
        if (!owner.equals(programId)) {
            throw new Error('Address not owned by program: ' + owner.toBase58());
        }
        const decoded = (layoutOverride !== null && layoutOverride !== void 0 ? layoutOverride : this.getLayout(programId)).decode(data);
        if (!decoded.accountFlags.initialized || !decoded.accountFlags.market || !decoded.ownAddress.equals(address)) {
            throw new Error('Invalid market');
        }
        const [baseMintDecimals, quoteMintDecimals] = await Promise.all([
            getMintDecimals(connection, decoded.baseMint),
            getMintDecimals(connection, decoded.quoteMint)
        ]);
        return new Market(decoded, baseMintDecimals, quoteMintDecimals, options, programId, layoutOverride);
    }
    get programId() {
        return this._programId;
    }
    get address() {
        return this._decoded.ownAddress;
    }
    get publicKey() {
        return this.address;
    }
    get baseMintAddress() {
        return this._decoded.baseMint;
    }
    get quoteMintAddress() {
        return this._decoded.quoteMint;
    }
    get bidsAddress() {
        return this._decoded.bids;
    }
    get asksAddress() {
        return this._decoded.asks;
    }
    get decoded() {
        return this._decoded;
    }
    async loadBids(connection) {
        const { data } = throwIfNull(await connection.getAccountInfo(this._decoded.bids));
        return Orderbook.decode(this, data);
    }
    async loadAsks(connection) {
        const { data } = throwIfNull(await connection.getAccountInfo(this._decoded.asks));
        return Orderbook.decode(this, data);
    }
    async loadOrdersForOwner(connection, ownerAddress, cacheDurationMs = 0) {
        const [bids, asks, openOrdersAccounts] = await Promise.all([
            this.loadBids(connection),
            this.loadAsks(connection),
            this.findOpenOrdersAccountsForOwner(connection, ownerAddress, cacheDurationMs)
        ]);
        return this.filterForOpenOrders(bids, asks, openOrdersAccounts);
    }
    filterForOpenOrders(bids, asks, openOrdersAccounts) {
        return [
            ...bids,
            ...asks
        ].filter((order)=>openOrdersAccounts.some((openOrders)=>order.openOrdersAddress.equals(openOrders.address)));
    }
    async findBaseTokenAccountsForOwner(connection, ownerAddress, includeUnwrappedSol = false) {
        if (this.baseMintAddress.equals(token_instructions_1.WRAPPED_SOL_MINT) && includeUnwrappedSol) {
            const [wrapped, unwrapped] = await Promise.all([
                this.findBaseTokenAccountsForOwner(connection, ownerAddress, false),
                connection.getAccountInfo(ownerAddress)
            ]);
            if (unwrapped !== null) {
                return [
                    {
                        pubkey: ownerAddress,
                        account: unwrapped
                    },
                    ...wrapped
                ];
            }
            return wrapped;
        }
        return await this.getTokenAccountsByOwnerForMint(connection, ownerAddress, this.baseMintAddress);
    }
    async getTokenAccountsByOwnerForMint(connection, ownerAddress, mintAddress) {
        return (await connection.getTokenAccountsByOwner(ownerAddress, {
            mint: mintAddress
        })).value;
    }
    async findQuoteTokenAccountsForOwner(connection, ownerAddress, includeUnwrappedSol = false) {
        if (this.quoteMintAddress.equals(token_instructions_1.WRAPPED_SOL_MINT) && includeUnwrappedSol) {
            const [wrapped, unwrapped] = await Promise.all([
                this.findQuoteTokenAccountsForOwner(connection, ownerAddress, false),
                connection.getAccountInfo(ownerAddress)
            ]);
            if (unwrapped !== null) {
                return [
                    {
                        pubkey: ownerAddress,
                        account: unwrapped
                    },
                    ...wrapped
                ];
            }
            return wrapped;
        }
        return await this.getTokenAccountsByOwnerForMint(connection, ownerAddress, this.quoteMintAddress);
    }
    async findOpenOrdersAccountsForOwner(connection, ownerAddress, cacheDurationMs = 0) {
        const strOwner = ownerAddress.toBase58();
        const now = new Date().getTime();
        if (strOwner in this._openOrdersAccountsCache && now - this._openOrdersAccountsCache[strOwner].ts < cacheDurationMs) {
            return this._openOrdersAccountsCache[strOwner].accounts;
        }
        const openOrdersAccountsForOwner = await OpenOrders.findForMarketAndOwner(connection, this.address, ownerAddress, this._programId);
        this._openOrdersAccountsCache[strOwner] = {
            accounts: openOrdersAccountsForOwner,
            ts: now
        };
        return openOrdersAccountsForOwner;
    }
    async replaceOrders(connection, accounts, orders, cacheDurationMs = 0) {
        var _a;
        if (!accounts.openOrdersAccount && !accounts.openOrdersAddressKey) {
            const ownerAddress = (_a = accounts.owner.publicKey) !== null && _a !== void 0 ? _a : accounts.owner;
            const openOrdersAccounts = await this.findOpenOrdersAccountsForOwner(connection, ownerAddress, cacheDurationMs);
            accounts.openOrdersAddressKey = openOrdersAccounts[0].address;
        }
        const transaction = new web3_js_1.Transaction();
        transaction.add(this.makeReplaceOrdersByClientIdsInstruction(accounts, orders));
        return await this._sendTransaction(connection, transaction, [
            accounts.owner
        ]);
    }
    async placeOrder(connection, { owner, payer, side, price, size, orderType = 'limit', clientId, openOrdersAddressKey, openOrdersAccount, feeDiscountPubkey, maxTs, replaceIfExists = false }) {
        const { transaction, signers } = await this.makePlaceOrderTransaction(connection, {
            owner,
            payer,
            side,
            price,
            size,
            orderType,
            clientId,
            openOrdersAddressKey,
            openOrdersAccount,
            feeDiscountPubkey,
            maxTs,
            replaceIfExists
        });
        return await this._sendTransaction(connection, transaction, [
            owner,
            ...signers
        ]);
    }
    getSplTokenBalanceFromAccountInfo(accountInfo, decimals) {
        return divideBnToNumber(new bn_js_1.default(accountInfo.data.slice(64, 72), 10, 'le'), new bn_js_1.default(10).pow(new bn_js_1.default(decimals)));
    }
    get supportsSrmFeeDiscounts() {
        return fees_1.supportsSrmFeeDiscounts(this._programId);
    }
    get supportsReferralFees() {
        return tokens_and_markets_1.getLayoutVersion(this._programId) > 1;
    }
    get usesRequestQueue() {
        return tokens_and_markets_1.getLayoutVersion(this._programId) <= 2;
    }
    async findFeeDiscountKeys(connection, ownerAddress, cacheDurationMs = 0) {
        let sortedAccounts = [];
        const now = new Date().getTime();
        const strOwner = ownerAddress.toBase58();
        if (strOwner in this._feeDiscountKeysCache && now - this._feeDiscountKeysCache[strOwner].ts < cacheDurationMs) {
            return this._feeDiscountKeysCache[strOwner].accounts;
        }
        if (this.supportsSrmFeeDiscounts) {
            // Fee discounts based on (M)SRM holdings supported in newer versions
            const msrmAccounts = (await this.getTokenAccountsByOwnerForMint(connection, ownerAddress, token_instructions_1.MSRM_MINT)).map(({ pubkey, account })=>{
                const balance = this.getSplTokenBalanceFromAccountInfo(account, token_instructions_1.MSRM_DECIMALS);
                return {
                    pubkey,
                    mint: token_instructions_1.MSRM_MINT,
                    balance,
                    feeTier: fees_1.getFeeTier(balance, 0)
                };
            });
            const srmAccounts = (await this.getTokenAccountsByOwnerForMint(connection, ownerAddress, token_instructions_1.SRM_MINT)).map(({ pubkey, account })=>{
                const balance = this.getSplTokenBalanceFromAccountInfo(account, token_instructions_1.SRM_DECIMALS);
                return {
                    pubkey,
                    mint: token_instructions_1.SRM_MINT,
                    balance,
                    feeTier: fees_1.getFeeTier(0, balance)
                };
            });
            sortedAccounts = msrmAccounts.concat(srmAccounts).sort((a, b)=>{
                if (a.feeTier > b.feeTier) {
                    return -1;
                } else if (a.feeTier < b.feeTier) {
                    return 1;
                } else {
                    if (a.balance > b.balance) {
                        return -1;
                    } else if (a.balance < b.balance) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            });
        }
        this._feeDiscountKeysCache[strOwner] = {
            accounts: sortedAccounts,
            ts: now
        };
        return sortedAccounts;
    }
    async findBestFeeDiscountKey(connection, ownerAddress, cacheDurationMs = 30000) {
        const accounts = await this.findFeeDiscountKeys(connection, ownerAddress, cacheDurationMs);
        if (accounts.length > 0) {
            return {
                pubkey: accounts[0].pubkey,
                feeTier: accounts[0].feeTier
            };
        }
        return {
            pubkey: null,
            feeTier: 0
        };
    }
    async makePlaceOrderTransaction(connection, { owner, payer, side, price, size, orderType = 'limit', clientId, openOrdersAddressKey, openOrdersAccount, feeDiscountPubkey = undefined, selfTradeBehavior = 'decrementTake', maxTs, replaceIfExists = false }, cacheDurationMs = 0, feeDiscountPubkeyCacheDurationMs = 0) {
        var _a, _b;
        // @ts-ignore
        const ownerAddress = (_a = owner.publicKey) !== null && _a !== void 0 ? _a : owner;
        const openOrdersAccounts = await this.findOpenOrdersAccountsForOwner(connection, ownerAddress, cacheDurationMs);
        const transaction = new web3_js_1.Transaction();
        const signers = [];
        // Fetch an SRM fee discount key if the market supports discounts and it is not supplied
        let useFeeDiscountPubkey;
        if (feeDiscountPubkey) {
            useFeeDiscountPubkey = feeDiscountPubkey;
        } else if (feeDiscountPubkey === undefined && this.supportsSrmFeeDiscounts) {
            useFeeDiscountPubkey = (await this.findBestFeeDiscountKey(connection, ownerAddress, feeDiscountPubkeyCacheDurationMs)).pubkey;
        } else {
            useFeeDiscountPubkey = null;
        }
        let openOrdersAddress;
        if (openOrdersAccounts.length === 0) {
            let account;
            if (openOrdersAccount) {
                account = openOrdersAccount;
            } else {
                account = new web3_js_1.Account();
            }
            transaction.add(await OpenOrders.makeCreateAccountTransaction(connection, this.address, ownerAddress, account.publicKey, this._programId));
            openOrdersAddress = account.publicKey;
            signers.push(account);
            // refresh the cache of open order accounts on next fetch
            this._openOrdersAccountsCache[ownerAddress.toBase58()].ts = 0;
        } else if (openOrdersAccount) {
            openOrdersAddress = openOrdersAccount.publicKey;
        } else if (openOrdersAddressKey) {
            openOrdersAddress = openOrdersAddressKey;
        } else {
            openOrdersAddress = openOrdersAccounts[0].address;
        }
        let wrappedSolAccount = null;
        if (payer.equals(ownerAddress)) {
            if (side === 'buy' && this.quoteMintAddress.equals(token_instructions_1.WRAPPED_SOL_MINT) || side === 'sell' && this.baseMintAddress.equals(token_instructions_1.WRAPPED_SOL_MINT)) {
                wrappedSolAccount = new web3_js_1.Account();
                let lamports;
                if (side === 'buy') {
                    lamports = Math.round(price * size * 1.01 * web3_js_1.LAMPORTS_PER_SOL);
                    if (openOrdersAccounts.length > 0) {
                        lamports -= openOrdersAccounts[0].quoteTokenFree.toNumber();
                    }
                } else {
                    lamports = Math.round(size * web3_js_1.LAMPORTS_PER_SOL);
                    if (openOrdersAccounts.length > 0) {
                        lamports -= openOrdersAccounts[0].baseTokenFree.toNumber();
                    }
                }
                lamports = Math.max(lamports, 0) + 1e7;
                transaction.add(web3_js_1.SystemProgram.createAccount({
                    fromPubkey: ownerAddress,
                    newAccountPubkey: wrappedSolAccount.publicKey,
                    lamports,
                    space: 165,
                    programId: token_instructions_1.TOKEN_PROGRAM_ID
                }));
                transaction.add(token_instructions_1.initializeAccount({
                    account: wrappedSolAccount.publicKey,
                    mint: token_instructions_1.WRAPPED_SOL_MINT,
                    owner: ownerAddress
                }));
                signers.push(wrappedSolAccount);
            } else {
                throw new Error('Invalid payer account');
            }
        }
        const placeOrderInstruction = this.makePlaceOrderInstruction(connection, {
            owner,
            payer: (_b = wrappedSolAccount === null || wrappedSolAccount === void 0 ? void 0 : wrappedSolAccount.publicKey) !== null && _b !== void 0 ? _b : payer,
            side,
            price,
            size,
            orderType,
            clientId,
            openOrdersAddressKey: openOrdersAddress,
            feeDiscountPubkey: useFeeDiscountPubkey,
            selfTradeBehavior,
            maxTs,
            replaceIfExists
        });
        transaction.add(placeOrderInstruction);
        if (wrappedSolAccount) {
            transaction.add(token_instructions_1.closeAccount({
                source: wrappedSolAccount.publicKey,
                destination: ownerAddress,
                owner: ownerAddress
            }));
        }
        return {
            transaction,
            signers,
            payer: owner
        };
    }
    makePlaceOrderInstruction(connection, params) {
        var _a;
        const { owner, payer, side, price, size, orderType = 'limit', clientId, openOrdersAddressKey, openOrdersAccount, feeDiscountPubkey = null } = params;
        // @ts-ignore
        const ownerAddress = (_a = owner.publicKey) !== null && _a !== void 0 ? _a : owner;
        if (this.baseSizeNumberToLots(size).lte(new bn_js_1.default(0))) {
            throw new Error('size too small');
        }
        if (this.priceNumberToLots(price).lte(new bn_js_1.default(0))) {
            throw new Error('invalid price');
        }
        if (this.usesRequestQueue) {
            return instructions_1.DexInstructions.newOrder({
                market: this.address,
                requestQueue: this._decoded.requestQueue,
                baseVault: this._decoded.baseVault,
                quoteVault: this._decoded.quoteVault,
                openOrders: openOrdersAccount ? openOrdersAccount.publicKey : openOrdersAddressKey,
                owner: ownerAddress,
                payer,
                side,
                limitPrice: this.priceNumberToLots(price),
                maxQuantity: this.baseSizeNumberToLots(size),
                orderType,
                clientId,
                programId: this._programId,
                // @ts-ignore
                feeDiscountPubkey: this.supportsSrmFeeDiscounts ? feeDiscountPubkey : null
            });
        } else {
            return this.makeNewOrderV3Instruction(params);
        }
    }
    makeNewOrderV3Instruction(params) {
        var _a;
        const { owner, payer, side, price, size, orderType = 'limit', clientId, openOrdersAddressKey, openOrdersAccount, feeDiscountPubkey = null, selfTradeBehavior = 'decrementTake', programId, maxTs, replaceIfExists } = params;
        // @ts-ignore
        const ownerAddress = (_a = owner.publicKey) !== null && _a !== void 0 ? _a : owner;
        return instructions_1.DexInstructions.newOrderV3({
            market: this.address,
            bids: this._decoded.bids,
            asks: this._decoded.asks,
            requestQueue: this._decoded.requestQueue,
            eventQueue: this._decoded.eventQueue,
            baseVault: this._decoded.baseVault,
            quoteVault: this._decoded.quoteVault,
            openOrders: openOrdersAccount ? openOrdersAccount.publicKey : openOrdersAddressKey,
            owner: ownerAddress,
            payer,
            side,
            limitPrice: this.priceNumberToLots(price),
            maxBaseQuantity: this.baseSizeNumberToLots(size),
            maxQuoteQuantity: new bn_js_1.default(this._decoded.quoteLotSize.toNumber()).mul(this.baseSizeNumberToLots(size).mul(this.priceNumberToLots(price))),
            orderType,
            clientId,
            programId: programId !== null && programId !== void 0 ? programId : this._programId,
            selfTradeBehavior,
            // @ts-ignore
            feeDiscountPubkey: this.supportsSrmFeeDiscounts ? feeDiscountPubkey : null,
            // @ts-ignore
            maxTs,
            replaceIfExists
        });
    }
    makeReplaceOrdersByClientIdsInstruction(accounts, orders) {
        var _a, _b;
        // @ts-ignore
        const ownerAddress = (_a = accounts.owner.publicKey) !== null && _a !== void 0 ? _a : accounts.owner;
        return instructions_1.DexInstructions.replaceOrdersByClientIds({
            market: this.address,
            bids: this._decoded.bids,
            asks: this._decoded.asks,
            requestQueue: this._decoded.requestQueue,
            eventQueue: this._decoded.eventQueue,
            baseVault: this._decoded.baseVault,
            quoteVault: this._decoded.quoteVault,
            openOrders: accounts.openOrdersAccount ? accounts.openOrdersAccount.publicKey : accounts.openOrdersAddressKey,
            owner: ownerAddress,
            payer: accounts.payer,
            programId: (_b = accounts.programId) !== null && _b !== void 0 ? _b : this._programId,
            // @ts-ignore
            feeDiscountPubkey: this.supportsSrmFeeDiscounts ? accounts.feeDiscountPubkey : null,
            orders: orders.map((order)=>{
                var _a;
                return {
                    side: order.side,
                    limitPrice: this.priceNumberToLots(order.price),
                    maxBaseQuantity: this.baseSizeNumberToLots(order.size),
                    maxQuoteQuantity: new bn_js_1.default(this._decoded.quoteLotSize.toNumber()).mul(this.baseSizeNumberToLots(order.size).mul(this.priceNumberToLots(order.price))),
                    orderType: order.orderType,
                    clientId: order.clientId,
                    programId: (_a = accounts.programId) !== null && _a !== void 0 ? _a : this._programId,
                    selfTradeBehavior: order.selfTradeBehavior,
                    // @ts-ignore
                    maxTs: order.maxTs
                };
            })
        });
    }
    async _sendTransaction(connection, transaction, signers) {
        const signature = await connection.sendTransaction(transaction, signers, {
            skipPreflight: this._skipPreflight
        });
        const { value } = await connection.confirmTransaction(signature, this._commitment);
        if (value === null || value === void 0 ? void 0 : value.err) {
            throw new Error(JSON.stringify(value.err));
        }
        return signature;
    }
    async cancelOrderByClientId(connection, owner, openOrders, clientId) {
        const transaction = await this.makeCancelOrderByClientIdTransaction(connection, owner.publicKey, openOrders, clientId);
        return await this._sendTransaction(connection, transaction, [
            owner
        ]);
    }
    async cancelOrdersByClientIds(connection, owner, openOrders, clientIds) {
        const transaction = await this.makeCancelOrdersByClientIdsTransaction(connection, owner.publicKey, openOrders, clientIds);
        return await this._sendTransaction(connection, transaction, [
            owner
        ]);
    }
    async makeCancelOrderByClientIdTransaction(connection, owner, openOrders, clientId) {
        const transaction = new web3_js_1.Transaction();
        if (this.usesRequestQueue) {
            transaction.add(instructions_1.DexInstructions.cancelOrderByClientId({
                market: this.address,
                owner,
                openOrders,
                requestQueue: this._decoded.requestQueue,
                clientId,
                programId: this._programId
            }));
        } else {
            transaction.add(instructions_1.DexInstructions.cancelOrderByClientIdV2({
                market: this.address,
                openOrders,
                owner,
                bids: this._decoded.bids,
                asks: this._decoded.asks,
                eventQueue: this._decoded.eventQueue,
                clientId,
                programId: this._programId
            }));
        }
        return transaction;
    }
    async makeCancelOrdersByClientIdsTransaction(connection, owner, openOrders, clientIds) {
        const transaction = new web3_js_1.Transaction();
        transaction.add(instructions_1.DexInstructions.cancelOrdersByClientIds({
            market: this.address,
            openOrders,
            owner,
            bids: this._decoded.bids,
            asks: this._decoded.asks,
            eventQueue: this._decoded.eventQueue,
            clientIds,
            programId: this._programId
        }));
        return transaction;
    }
    async cancelOrder(connection, owner, order) {
        const transaction = await this.makeCancelOrderTransaction(connection, owner.publicKey, order);
        return await this._sendTransaction(connection, transaction, [
            owner
        ]);
    }
    async makeCancelOrderTransaction(connection, owner, order) {
        const transaction = new web3_js_1.Transaction();
        transaction.add(this.makeCancelOrderInstruction(connection, owner, order));
        return transaction;
    }
    makeCancelOrderInstruction(connection, owner, order) {
        if (this.usesRequestQueue) {
            return instructions_1.DexInstructions.cancelOrder({
                market: this.address,
                owner,
                openOrders: order.openOrdersAddress,
                requestQueue: this._decoded.requestQueue,
                side: order.side,
                orderId: order.orderId,
                openOrdersSlot: order.openOrdersSlot,
                programId: this._programId
            });
        } else {
            return instructions_1.DexInstructions.cancelOrderV2({
                market: this.address,
                owner,
                openOrders: order.openOrdersAddress,
                bids: this._decoded.bids,
                asks: this._decoded.asks,
                eventQueue: this._decoded.eventQueue,
                side: order.side,
                orderId: order.orderId,
                openOrdersSlot: order.openOrdersSlot,
                programId: this._programId
            });
        }
    }
    makeConsumeEventsInstruction(openOrdersAccounts, limit) {
        return instructions_1.DexInstructions.consumeEvents({
            market: this.address,
            eventQueue: this._decoded.eventQueue,
            coinFee: this._decoded.eventQueue,
            pcFee: this._decoded.eventQueue,
            openOrdersAccounts,
            limit,
            programId: this._programId
        });
    }
    makeConsumeEventsPermissionedInstruction(openOrdersAccounts, limit) {
        return instructions_1.DexInstructions.consumeEventsPermissioned({
            market: this.address,
            eventQueue: this._decoded.eventQueue,
            crankAuthority: this._decoded.consumeEventsAuthority,
            openOrdersAccounts,
            limit,
            programId: this._programId
        });
    }
    async settleFunds(connection, owner, openOrders, baseWallet, quoteWallet, referrerQuoteWallet = null) {
        if (!openOrders.owner.equals(owner.publicKey)) {
            throw new Error('Invalid open orders account');
        }
        if (referrerQuoteWallet && !this.supportsReferralFees) {
            throw new Error('This program ID does not support referrerQuoteWallet');
        }
        const { transaction, signers } = await this.makeSettleFundsTransaction(connection, openOrders, baseWallet, quoteWallet, referrerQuoteWallet);
        return await this._sendTransaction(connection, transaction, [
            owner,
            ...signers
        ]);
    }
    async makeSettleFundsTransaction(connection, openOrders, baseWallet, quoteWallet, referrerQuoteWallet = null) {
        // @ts-ignore
        const vaultSigner = await web3_js_1.PublicKey.createProgramAddress([
            this.address.toBuffer(),
            this._decoded.vaultSignerNonce.toArrayLike(buffer_1.Buffer, 'le', 8)
        ], this._programId);
        const transaction = new web3_js_1.Transaction();
        const signers = [];
        let wrappedSolAccount = null;
        if (this.baseMintAddress.equals(token_instructions_1.WRAPPED_SOL_MINT) && baseWallet.equals(openOrders.owner) || this.quoteMintAddress.equals(token_instructions_1.WRAPPED_SOL_MINT) && quoteWallet.equals(openOrders.owner)) {
            wrappedSolAccount = new web3_js_1.Account();
            transaction.add(web3_js_1.SystemProgram.createAccount({
                fromPubkey: openOrders.owner,
                newAccountPubkey: wrappedSolAccount.publicKey,
                lamports: await connection.getMinimumBalanceForRentExemption(165),
                space: 165,
                programId: token_instructions_1.TOKEN_PROGRAM_ID
            }));
            transaction.add(token_instructions_1.initializeAccount({
                account: wrappedSolAccount.publicKey,
                mint: token_instructions_1.WRAPPED_SOL_MINT,
                owner: openOrders.owner
            }));
            signers.push(wrappedSolAccount);
        }
        transaction.add(instructions_1.DexInstructions.settleFunds({
            market: this.address,
            openOrders: openOrders.address,
            owner: openOrders.owner,
            baseVault: this._decoded.baseVault,
            quoteVault: this._decoded.quoteVault,
            baseWallet: baseWallet.equals(openOrders.owner) && wrappedSolAccount ? wrappedSolAccount.publicKey : baseWallet,
            quoteWallet: quoteWallet.equals(openOrders.owner) && wrappedSolAccount ? wrappedSolAccount.publicKey : quoteWallet,
            vaultSigner,
            programId: this._programId,
            referrerQuoteWallet
        }));
        if (wrappedSolAccount) {
            transaction.add(token_instructions_1.closeAccount({
                source: wrappedSolAccount.publicKey,
                destination: openOrders.owner,
                owner: openOrders.owner
            }));
        }
        return {
            transaction,
            signers,
            payer: openOrders.owner
        };
    }
    async matchOrders(connection, feePayer, limit) {
        const tx = this.makeMatchOrdersTransaction(limit);
        return await this._sendTransaction(connection, tx, [
            feePayer
        ]);
    }
    makeMatchOrdersTransaction(limit) {
        const tx = new web3_js_1.Transaction();
        tx.add(instructions_1.DexInstructions.matchOrders({
            market: this.address,
            requestQueue: this._decoded.requestQueue,
            eventQueue: this._decoded.eventQueue,
            bids: this._decoded.bids,
            asks: this._decoded.asks,
            baseVault: this._decoded.baseVault,
            quoteVault: this._decoded.quoteVault,
            limit,
            programId: this._programId
        }));
        return tx;
    }
    async loadRequestQueue(connection) {
        const { data } = throwIfNull(await connection.getAccountInfo(this._decoded.requestQueue));
        return queue_1.decodeRequestQueue(data);
    }
    async loadEventQueue(connection) {
        const { data } = throwIfNull(await connection.getAccountInfo(this._decoded.eventQueue));
        return queue_1.decodeEventQueue(data);
    }
    async loadFills(connection, limit = 100) {
        // TODO: once there's a separate source of fills use that instead
        const { data } = throwIfNull(await connection.getAccountInfo(this._decoded.eventQueue));
        const events = queue_1.decodeEventQueue(data, limit);
        return events.filter((event)=>event.eventFlags.fill && event.nativeQuantityPaid.gtn(0)).map(this.parseFillEvent.bind(this));
    }
    parseFillEvent(event) {
        let size, price, side, priceBeforeFees;
        if (event.eventFlags.bid) {
            side = 'buy';
            priceBeforeFees = event.eventFlags.maker ? event.nativeQuantityPaid.add(event.nativeFeeOrRebate) : event.nativeQuantityPaid.sub(event.nativeFeeOrRebate);
            price = divideBnToNumber(priceBeforeFees.mul(this._baseSplTokenMultiplier), this._quoteSplTokenMultiplier.mul(event.nativeQuantityReleased));
            size = divideBnToNumber(event.nativeQuantityReleased, this._baseSplTokenMultiplier);
        } else {
            side = 'sell';
            priceBeforeFees = event.eventFlags.maker ? event.nativeQuantityReleased.sub(event.nativeFeeOrRebate) : event.nativeQuantityReleased.add(event.nativeFeeOrRebate);
            price = divideBnToNumber(priceBeforeFees.mul(this._baseSplTokenMultiplier), this._quoteSplTokenMultiplier.mul(event.nativeQuantityPaid));
            size = divideBnToNumber(event.nativeQuantityPaid, this._baseSplTokenMultiplier);
        }
        return {
            ...event,
            side,
            price,
            feeCost: this.quoteSplSizeToNumber(event.nativeFeeOrRebate) * (event.eventFlags.maker ? -1 : 1),
            size
        };
    }
    get _baseSplTokenMultiplier() {
        return new bn_js_1.default(10).pow(new bn_js_1.default(this._baseSplTokenDecimals));
    }
    get _quoteSplTokenMultiplier() {
        return new bn_js_1.default(10).pow(new bn_js_1.default(this._quoteSplTokenDecimals));
    }
    priceLotsToNumber(price) {
        return divideBnToNumber(price.mul(this._decoded.quoteLotSize).mul(this._baseSplTokenMultiplier), this._decoded.baseLotSize.mul(this._quoteSplTokenMultiplier));
    }
    priceNumberToLots(price) {
        return new bn_js_1.default(Math.round(price * Math.pow(10, this._quoteSplTokenDecimals) * this._decoded.baseLotSize.toNumber() / (Math.pow(10, this._baseSplTokenDecimals) * this._decoded.quoteLotSize.toNumber())));
    }
    baseSplSizeToNumber(size) {
        return divideBnToNumber(size, this._baseSplTokenMultiplier);
    }
    quoteSplSizeToNumber(size) {
        return divideBnToNumber(size, this._quoteSplTokenMultiplier);
    }
    baseSizeLotsToNumber(size) {
        return divideBnToNumber(size.mul(this._decoded.baseLotSize), this._baseSplTokenMultiplier);
    }
    baseSizeNumberToLots(size) {
        const native = new bn_js_1.default(Math.round(size * Math.pow(10, this._baseSplTokenDecimals)));
        // rounds down to the nearest lot size
        return native.div(this._decoded.baseLotSize);
    }
    quoteSizeLotsToNumber(size) {
        return divideBnToNumber(size.mul(this._decoded.quoteLotSize), this._quoteSplTokenMultiplier);
    }
    quoteSizeNumberToLots(size) {
        const native = new bn_js_1.default(Math.round(size * Math.pow(10, this._quoteSplTokenDecimals)));
        // rounds down to the nearest lot size
        return native.div(this._decoded.quoteLotSize);
    }
    get minOrderSize() {
        return this.baseSizeLotsToNumber(new bn_js_1.default(1));
    }
    get tickSize() {
        return this.priceLotsToNumber(new bn_js_1.default(1));
    }
}
exports.Market = Market;
exports._OPEN_ORDERS_LAYOUT_V1 = buffer_layout_1.struct([
    buffer_layout_1.blob(5),
    layout_1.accountFlagsLayout('accountFlags'),
    layout_1.publicKeyLayout('market'),
    layout_1.publicKeyLayout('owner'),
    // These are in spl-token (i.e. not lot) units
    layout_1.u64('baseTokenFree'),
    layout_1.u64('baseTokenTotal'),
    layout_1.u64('quoteTokenFree'),
    layout_1.u64('quoteTokenTotal'),
    layout_1.u128('freeSlotBits'),
    layout_1.u128('isBidBits'),
    buffer_layout_1.seq(layout_1.u128(), 128, 'orders'),
    buffer_layout_1.seq(layout_1.u64(), 128, 'clientIds'),
    buffer_layout_1.blob(7)
]);
exports._OPEN_ORDERS_LAYOUT_V2 = buffer_layout_1.struct([
    buffer_layout_1.blob(5),
    layout_1.accountFlagsLayout('accountFlags'),
    layout_1.publicKeyLayout('market'),
    layout_1.publicKeyLayout('owner'),
    // These are in spl-token (i.e. not lot) units
    layout_1.u64('baseTokenFree'),
    layout_1.u64('baseTokenTotal'),
    layout_1.u64('quoteTokenFree'),
    layout_1.u64('quoteTokenTotal'),
    layout_1.u128('freeSlotBits'),
    layout_1.u128('isBidBits'),
    buffer_layout_1.seq(layout_1.u128(), 128, 'orders'),
    buffer_layout_1.seq(layout_1.u64(), 128, 'clientIds'),
    layout_1.u64('referrerRebatesAccrued'),
    buffer_layout_1.blob(7)
]);
class OpenOrders {
    constructor(address, decoded, programId){
        this.address = address;
        this._programId = programId;
        Object.assign(this, decoded);
    }
    static getLayout(programId) {
        if (tokens_and_markets_1.getLayoutVersion(programId) === 1) {
            return exports._OPEN_ORDERS_LAYOUT_V1;
        }
        return exports._OPEN_ORDERS_LAYOUT_V2;
    }
    static async findForOwner(connection, ownerAddress, programId) {
        const filters = [
            {
                memcmp: {
                    offset: this.getLayout(programId).offsetOf('owner'),
                    bytes: ownerAddress.toBase58()
                }
            },
            {
                dataSize: this.getLayout(programId).span
            }
        ];
        const accounts = await getFilteredProgramAccounts(connection, programId, filters);
        return accounts.map(({ publicKey, accountInfo })=>OpenOrders.fromAccountInfo(publicKey, accountInfo, programId));
    }
    static async findForMarketAndOwner(connection, marketAddress, ownerAddress, programId) {
        const filters = [
            {
                memcmp: {
                    offset: this.getLayout(programId).offsetOf('market'),
                    bytes: marketAddress.toBase58()
                }
            },
            {
                memcmp: {
                    offset: this.getLayout(programId).offsetOf('owner'),
                    bytes: ownerAddress.toBase58()
                }
            },
            {
                dataSize: this.getLayout(programId).span
            }
        ];
        const accounts = await getFilteredProgramAccounts(connection, programId, filters);
        return accounts.map(({ publicKey, accountInfo })=>OpenOrders.fromAccountInfo(publicKey, accountInfo, programId));
    }
    static async load(connection, address, programId) {
        const accountInfo = await connection.getAccountInfo(address);
        if (accountInfo === null) {
            throw new Error('Open orders account not found');
        }
        return OpenOrders.fromAccountInfo(address, accountInfo, programId);
    }
    static fromAccountInfo(address, accountInfo, programId) {
        const { owner, data } = accountInfo;
        if (!owner.equals(programId)) {
            throw new Error('Address not owned by program');
        }
        const decoded = this.getLayout(programId).decode(data);
        if (!decoded.accountFlags.initialized || !decoded.accountFlags.openOrders) {
            throw new Error('Invalid open orders account');
        }
        return new OpenOrders(address, decoded, programId);
    }
    static async makeCreateAccountTransaction(connection, marketAddress, ownerAddress, newAccountAddress, programId) {
        return web3_js_1.SystemProgram.createAccount({
            fromPubkey: ownerAddress,
            newAccountPubkey: newAccountAddress,
            lamports: await connection.getMinimumBalanceForRentExemption(this.getLayout(programId).span),
            space: this.getLayout(programId).span,
            programId
        });
    }
    get publicKey() {
        return this.address;
    }
}
exports.OpenOrders = OpenOrders;
exports.ORDERBOOK_LAYOUT = buffer_layout_1.struct([
    buffer_layout_1.blob(5),
    layout_1.accountFlagsLayout('accountFlags'),
    slab_1.SLAB_LAYOUT.replicate('slab'),
    buffer_layout_1.blob(7)
]);
class Orderbook {
    constructor(market, accountFlags, slab){
        if (!accountFlags.initialized || !(accountFlags.bids ^ accountFlags.asks)) {
            throw new Error('Invalid orderbook');
        }
        this.market = market;
        this.isBids = accountFlags.bids;
        this.slab = slab;
    }
    static get LAYOUT() {
        return exports.ORDERBOOK_LAYOUT;
    }
    static decode(market, buffer) {
        const { accountFlags, slab } = exports.ORDERBOOK_LAYOUT.decode(buffer);
        return new Orderbook(market, accountFlags, slab);
    }
    getL2(depth) {
        const descending = this.isBids;
        const levels = []; // (price, size)
        for (const { key, quantity } of this.slab.items(descending)){
            const price = getPriceFromKey(key);
            if (levels.length > 0 && levels[levels.length - 1][0].eq(price)) {
                levels[levels.length - 1][1] = levels[levels.length - 1][1].add(quantity);
            } else if (levels.length === depth) {
                break;
            } else {
                levels.push([
                    price,
                    quantity
                ]);
            }
        }
        return levels.map(([priceLots, sizeLots])=>[
                this.market.priceLotsToNumber(priceLots),
                this.market.baseSizeLotsToNumber(sizeLots),
                priceLots,
                sizeLots
            ]);
    }
    [Symbol.iterator]() {
        return this.items(false);
    }
    *items(descending = false) {
        for (const { key, ownerSlot, owner, quantity, feeTier, clientOrderId } of this.slab.items(descending)){
            const price = getPriceFromKey(key);
            yield {
                orderId: key,
                clientId: clientOrderId,
                openOrdersAddress: owner,
                openOrdersSlot: ownerSlot,
                feeTier,
                price: this.market.priceLotsToNumber(price),
                priceLots: price,
                size: this.market.baseSizeLotsToNumber(quantity),
                sizeLots: quantity,
                side: this.isBids ? 'buy' : 'sell'
            };
        }
    }
}
exports.Orderbook = Orderbook;
function getPriceFromKey(key) {
    return key.ushrn(64);
}
function divideBnToNumber(numerator, denominator) {
    const quotient = numerator.div(denominator).toNumber();
    const rem = numerator.umod(denominator);
    const gcd = rem.gcd(denominator);
    return quotient + rem.div(gcd).toNumber() / denominator.div(gcd).toNumber();
}
const MINT_LAYOUT = buffer_layout_1.struct([
    buffer_layout_1.blob(44),
    buffer_layout_1.u8('decimals'),
    buffer_layout_1.blob(37)
]);
async function getMintDecimals(connection, mint) {
    if (mint.equals(token_instructions_1.WRAPPED_SOL_MINT)) {
        return 9;
    }
    const { data } = throwIfNull(await connection.getAccountInfo(mint), 'mint not found');
    const { decimals } = MINT_LAYOUT.decode(data);
    return decimals;
}
exports.getMintDecimals = getMintDecimals;
async function getFilteredProgramAccounts(connection, programId, filters) {
    // @ts-ignore
    const resp = await connection._rpcRequest('getProgramAccounts', [
        programId.toBase58(),
        {
            commitment: connection.commitment,
            filters,
            encoding: 'base64'
        }
    ]);
    if (resp.error) {
        throw new Error(resp.error.message);
    }
    return resp.result.map(({ pubkey, account: { data, executable, owner, lamports } })=>({
            publicKey: new web3_js_1.PublicKey(pubkey),
            accountInfo: {
                data: buffer_1.Buffer.from(data[0], 'base64'),
                executable,
                owner: new web3_js_1.PublicKey(owner),
                lamports
            }
        }));
}
function throwIfNull(value, message = 'account not found') {
    if (value === null) {
        throw new Error(message);
    }
    return value;
} //# sourceMappingURL=market.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/error.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseInstructionErrorResponse = exports.KNOWN_PROGRAMS = exports.DexError = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const tokens_and_markets_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/tokens_and_markets.js [app-route] (ecmascript)");
const token_instructions_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/token-instructions.js [app-route] (ecmascript)");
var DexError;
(function(DexError) {
    DexError[DexError["InvalidMarketFlags"] = 0] = "InvalidMarketFlags";
    DexError[DexError["InvalidAskFlags"] = 1] = "InvalidAskFlags";
    DexError[DexError["InvalidBidFlags"] = 2] = "InvalidBidFlags";
    DexError[DexError["InvalidQueueLength"] = 3] = "InvalidQueueLength";
    DexError[DexError["OwnerAccountNotProvided"] = 4] = "OwnerAccountNotProvided";
    DexError[DexError["ConsumeEventsQueueFailure"] = 5] = "ConsumeEventsQueueFailure";
    DexError[DexError["WrongCoinVault"] = 6] = "WrongCoinVault";
    DexError[DexError["WrongPcVault"] = 7] = "WrongPcVault";
    DexError[DexError["WrongCoinMint"] = 8] = "WrongCoinMint";
    DexError[DexError["WrongPcMint"] = 9] = "WrongPcMint";
    DexError[DexError["CoinVaultProgramId"] = 10] = "CoinVaultProgramId";
    DexError[DexError["PcVaultProgramId"] = 11] = "PcVaultProgramId";
    DexError[DexError["CoinMintProgramId"] = 12] = "CoinMintProgramId";
    DexError[DexError["PcMintProgramId"] = 13] = "PcMintProgramId";
    DexError[DexError["WrongCoinMintSize"] = 14] = "WrongCoinMintSize";
    DexError[DexError["WrongPcMintSize"] = 15] = "WrongPcMintSize";
    DexError[DexError["WrongCoinVaultSize"] = 16] = "WrongCoinVaultSize";
    DexError[DexError["WrongPcVaultSize"] = 17] = "WrongPcVaultSize";
    DexError[DexError["UninitializedVault"] = 18] = "UninitializedVault";
    DexError[DexError["UninitializedMint"] = 19] = "UninitializedMint";
    DexError[DexError["CoinMintUninitialized"] = 20] = "CoinMintUninitialized";
    DexError[DexError["PcMintUninitialized"] = 21] = "PcMintUninitialized";
    DexError[DexError["WrongMint"] = 22] = "WrongMint";
    DexError[DexError["WrongVaultOwner"] = 23] = "WrongVaultOwner";
    DexError[DexError["VaultHasDelegate"] = 24] = "VaultHasDelegate";
    DexError[DexError["AlreadyInitialized"] = 25] = "AlreadyInitialized";
    DexError[DexError["WrongAccountDataAlignment"] = 26] = "WrongAccountDataAlignment";
    DexError[DexError["WrongAccountDataPaddingLength"] = 27] = "WrongAccountDataPaddingLength";
    DexError[DexError["WrongAccountHeadPadding"] = 28] = "WrongAccountHeadPadding";
    DexError[DexError["WrongAccountTailPadding"] = 29] = "WrongAccountTailPadding";
    DexError[DexError["RequestQueueEmpty"] = 30] = "RequestQueueEmpty";
    DexError[DexError["EventQueueTooSmall"] = 31] = "EventQueueTooSmall";
    DexError[DexError["SlabTooSmall"] = 32] = "SlabTooSmall";
    DexError[DexError["BadVaultSignerNonce"] = 33] = "BadVaultSignerNonce";
    DexError[DexError["InsufficientFunds"] = 34] = "InsufficientFunds";
    DexError[DexError["SplAccountProgramId"] = 35] = "SplAccountProgramId";
    DexError[DexError["SplAccountLen"] = 36] = "SplAccountLen";
    DexError[DexError["WrongFeeDiscountAccountOwner"] = 37] = "WrongFeeDiscountAccountOwner";
    DexError[DexError["WrongFeeDiscountMint"] = 38] = "WrongFeeDiscountMint";
    DexError[DexError["CoinPayerProgramId"] = 39] = "CoinPayerProgramId";
    DexError[DexError["PcPayerProgramId"] = 40] = "PcPayerProgramId";
    DexError[DexError["ClientIdNotFound"] = 41] = "ClientIdNotFound";
    DexError[DexError["TooManyOpenOrders"] = 42] = "TooManyOpenOrders";
    DexError[DexError["FakeErrorSoWeDontChangeNumbers"] = 43] = "FakeErrorSoWeDontChangeNumbers";
    DexError[DexError["BorrowError"] = 44] = "BorrowError";
    DexError[DexError["WrongOrdersAccount"] = 45] = "WrongOrdersAccount";
    DexError[DexError["WrongBidsAccount"] = 46] = "WrongBidsAccount";
    DexError[DexError["WrongAsksAccount"] = 47] = "WrongAsksAccount";
    DexError[DexError["WrongRequestQueueAccount"] = 48] = "WrongRequestQueueAccount";
    DexError[DexError["WrongEventQueueAccount"] = 49] = "WrongEventQueueAccount";
    DexError[DexError["RequestQueueFull"] = 50] = "RequestQueueFull";
    DexError[DexError["EventQueueFull"] = 51] = "EventQueueFull";
    DexError[DexError["MarketIsDisabled"] = 52] = "MarketIsDisabled";
    DexError[DexError["WrongSigner"] = 53] = "WrongSigner";
    DexError[DexError["TransferFailed"] = 54] = "TransferFailed";
    DexError[DexError["ClientOrderIdIsZero"] = 55] = "ClientOrderIdIsZero";
    DexError[DexError["WrongRentSysvarAccount"] = 56] = "WrongRentSysvarAccount";
    DexError[DexError["RentNotProvided"] = 57] = "RentNotProvided";
    DexError[DexError["OrdersNotRentExempt"] = 58] = "OrdersNotRentExempt";
    DexError[DexError["OrderNotFound"] = 59] = "OrderNotFound";
    DexError[DexError["OrderNotYours"] = 60] = "OrderNotYours";
    DexError[DexError["WouldSelfTrade"] = 61] = "WouldSelfTrade";
    DexError[DexError["Unknown"] = 1000] = "Unknown";
})(DexError = exports.DexError || (exports.DexError = {}));
exports.KNOWN_PROGRAMS = {
    [token_instructions_1.TOKEN_PROGRAM_ID.toString()]: 'Token program',
    [web3_js_1.SystemProgram.programId.toString()]: 'System program'
};
function parseInstructionErrorResponse(transaction, errorResponse) {
    const [failedInstructionIndex, customError] = errorResponse;
    const failedInstruction = transaction.instructions[failedInstructionIndex];
    let parsedError;
    if (failedInstruction.programId.toString() in tokens_and_markets_1.PROGRAM_LAYOUT_VERSIONS) {
        parsedError = DexError[customError['Custom']];
    } else if (failedInstruction.programId.toString() in exports.KNOWN_PROGRAMS) {
        const program = exports.KNOWN_PROGRAMS[failedInstruction.programId.toString()];
        parsedError = `${program} error ${customError['Custom']}`;
    } else {
        parsedError = `Unknown program ${failedInstruction.programId.toString()} custom error: ${customError['Custom']}`;
    }
    return {
        failedInstructionIndex,
        error: parsedError,
        failedProgram: failedInstruction.programId.toString()
    };
}
exports.parseInstructionErrorResponse = parseInstructionErrorResponse; //# sourceMappingURL=error.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/market-proxy/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MarketProxyBuilder = exports.MarketProxyInstruction = exports.MarketProxy = void 0;
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/index.js [app-route] (ecmascript)");
const market_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/market.js [app-route] (ecmascript)");
const instructions_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/instructions.js [app-route] (ecmascript)");
// MarketProxy provides an API for constructing transactions to an on-chain
// DEX proxy, which relays all instructions to the orderbook. Minimally, this
// requires two modifications for DEX instructions.
//
// 1. Transasctions are sent to the proxy program--not the DEX.
// 2. The DEX program ID must be inserted as the first account in instructions
//    using the proxy relay, so that the proxy can use the account for CPI.
//    The program is responsible for removing this account before relaying to
//    the dex.
//
// Additionally, a middleware abstraction is provided so that one can configure
// both the client and the smart contract with the ability to send and processs
// arbitrary accounts and instruction data *in addition* to what the Serum DEX
// expects.
//
// Similar to the layers of an onion, each middleware wraps a transaction
// request with additional accounts and instruction data before sending it to
// the program. Upon receiving the request, the program--with its own set of
// middleware-- unwraps and processes each layer. The process ends with all
// layers being unwrapped and the proxy relaying the transaction to the DEX.
//
// As a result, the order of the middleware matters and the client should
// process middleware in the *reverse* order of the proxy smart contract.
class MarketProxy {
    // Ctor.
    constructor(market, instruction){
        this._market = market;
        this._instruction = instruction;
    }
    // DEX market being proxied.
    get market() {
        return this._market;
    }
    // Instruction namespace.
    get instruction() {
        return this._instruction;
    }
    // Serum DEX program ID.
    get dexProgramId() {
        return this._market.programId;
    }
    // Proxy program ID.
    get proxyProgramId() {
        return this._instruction.proxyProgramId;
    }
}
exports.MarketProxy = MarketProxy;
// Instruction builder for the market proxy.
class MarketProxyInstruction {
    constructor(proxyProgramId, dexProgramId, market, middlewares){
        this._proxyProgramId = proxyProgramId;
        this._dexProgramId = dexProgramId;
        this._market = market;
        this._middlewares = middlewares;
    }
    // Program ID of the permissioning proxy program.
    get proxyProgramId() {
        return this._proxyProgramId;
    }
    newOrderV3(params) {
        const tradeIx = this._market.makeNewOrderV3Instruction({
            ...params,
            programId: this._proxyProgramId
        });
        this._middlewares.forEach((mw)=>mw.newOrderV3(tradeIx));
        return this.proxy(tradeIx);
    }
    initOpenOrders(owner, market, openOrders, marketAuthority) {
        const ix = instructions_1.DexInstructions.initOpenOrders({
            market,
            openOrders,
            owner,
            programId: this._proxyProgramId,
            marketAuthority
        });
        this._middlewares.forEach((mw)=>mw.initOpenOrders(ix));
        return this.proxy(ix);
    }
    cancelOrder(owner, order) {
        const ix = instructions_1.DexInstructions.cancelOrderV2({
            market: this._market.address,
            owner,
            openOrders: order.openOrdersAddress,
            bids: this._market.decoded.bids,
            asks: this._market.decoded.asks,
            eventQueue: this._market.decoded.eventQueue,
            side: order.side,
            orderId: order.orderId,
            openOrdersSlot: order.openOrdersSlot,
            programId: this._proxyProgramId
        });
        this._middlewares.forEach((mw)=>mw.cancelOrderV2(ix));
        return this.proxy(ix);
    }
    cancelOrderByClientId(owner, openOrders, clientId) {
        const ix = instructions_1.DexInstructions.cancelOrderByClientIdV2({
            market: this._market.address,
            openOrders,
            owner,
            bids: this._market.decoded.bids,
            asks: this._market.decoded.asks,
            eventQueue: this._market.decoded.eventQueue,
            clientId,
            programId: this._proxyProgramId
        });
        this._middlewares.forEach((mw)=>mw.cancelOrderByClientIdV2(ix));
        return this.proxy(ix);
    }
    settleFunds(openOrders, owner, baseWallet, quoteWallet, referrerQuoteWallet) {
        const ix = instructions_1.DexInstructions.settleFunds({
            market: this._market.address,
            openOrders,
            owner,
            baseVault: this._market.decoded.baseVault,
            quoteVault: this._market.decoded.quoteVault,
            baseWallet,
            quoteWallet,
            vaultSigner: anchor_1.utils.publicKey.createProgramAddressSync([
                this._market.address.toBuffer(),
                this._market.decoded.vaultSignerNonce.toArrayLike(Buffer, 'le', 8)
            ], this._dexProgramId),
            programId: this._proxyProgramId,
            referrerQuoteWallet
        });
        this._middlewares.forEach((mw)=>mw.settleFunds(ix));
        return this.proxy(ix);
    }
    closeOpenOrders(openOrders, owner, solWallet) {
        const ix = instructions_1.DexInstructions.closeOpenOrders({
            market: this._market.address,
            openOrders,
            owner,
            solWallet,
            programId: this._proxyProgramId
        });
        this._middlewares.forEach((mw)=>mw.closeOpenOrders(ix));
        return this.proxy(ix);
    }
    prune(openOrders, openOrdersOwner, limit) {
        if (!limit) {
            limit = 65535;
        }
        const ix = instructions_1.DexInstructions.prune({
            market: this._market.address,
            bids: this._market.decoded.bids,
            asks: this._market.decoded.asks,
            eventQueue: this._market.decoded.eventQueue,
            pruneAuthority: this._market.decoded.pruneAuthority,
            openOrders,
            openOrdersOwner,
            programId: this._proxyProgramId,
            limit
        });
        this._middlewares.forEach((mw)=>mw.prune(ix));
        return this.proxy(ix);
    }
    consumeEvents(openOrdersAccounts, limit) {
        const ix = instructions_1.DexInstructions.consumeEvents({
            market: this._market.address,
            eventQueue: this._market.decoded.eventQueue,
            coinFee: this._market.decoded.eventQueue,
            pcFee: this._market.decoded.eventQueue,
            openOrdersAccounts,
            limit,
            programId: this._proxyProgramId
        });
        this._middlewares.forEach((mw)=>mw.consumeEvents(ix));
        return this.proxy(ix);
    }
    consumeEventsPermissioned(openOrdersAccounts, limit) {
        const ix = instructions_1.DexInstructions.consumeEventsPermissioned({
            market: this._market.address,
            eventQueue: this._market.decoded.eventQueue,
            crankAuthority: this._market.decoded.consumeEventsAuthority,
            openOrdersAccounts,
            limit,
            programId: this._proxyProgramId
        });
        this._middlewares.forEach((mw)=>mw.consumeEventsPermissioned(ix));
        return this.proxy(ix);
    }
    // Adds the serum dex account to the instruction so that proxies can
    // relay (CPI requires the executable account).
    proxy(ix) {
        ix.keys = [
            {
                pubkey: this._dexProgramId,
                isWritable: false,
                isSigner: false
            },
            ...ix.keys
        ];
        return ix;
    }
}
exports.MarketProxyInstruction = MarketProxyInstruction;
class MarketProxyBuilder {
    constructor(){
        this._middlewares = [];
    }
    middleware(mw) {
        this._middlewares.push(mw);
        return this;
    }
    async load({ connection, market, options = {}, dexProgramId, proxyProgramId }) {
        const marketClient = await market_1.Market.load(connection, market, options, dexProgramId, market_1.MARKET_STATE_LAYOUT_V3);
        const instruction = new MarketProxyInstruction(proxyProgramId, dexProgramId, marketClient, this._middlewares);
        return new MarketProxy(marketClient, instruction);
    }
}
exports.MarketProxyBuilder = MarketProxyBuilder; //# sourceMappingURL=index.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/market-proxy/middleware.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Logger = exports.PermissionedCrank = exports.ReferralFees = exports.OpenOrdersPda = void 0;
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+anchor@0.11.1_typescript@5.9.3/node_modules/@project-serum/anchor/dist/esm/index.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
class OpenOrdersPda {
    constructor({ proxyProgramId, dexProgramId }){
        this._proxyProgramId = proxyProgramId;
        this._dexProgramId = dexProgramId;
    }
    // PDA authorized to create open orders accounts.
    static async marketAuthority(market, dexProgramId, proxyProgramId) {
        // b"open-orders-init"
        const openOrdersStr = Buffer.from([
            111,
            112,
            101,
            110,
            45,
            111,
            114,
            100,
            101,
            114,
            115,
            45,
            105,
            110,
            105,
            116
        ]);
        const [addr] = await web3_js_1.PublicKey.findProgramAddress([
            openOrdersStr,
            dexProgramId.toBuffer(),
            market.toBuffer()
        ], proxyProgramId);
        return addr;
    }
    static async openOrdersAddress(market, owner, dexProgramId, proxyProgramId) {
        // b"open-orders".
        const openOrdersStr = Buffer.from([
            111,
            112,
            101,
            110,
            45,
            111,
            114,
            100,
            101,
            114,
            115
        ]);
        const [addr] = await web3_js_1.PublicKey.findProgramAddress([
            openOrdersStr,
            dexProgramId.toBuffer(),
            market.toBuffer(),
            owner.toBuffer()
        ], proxyProgramId);
        return addr;
    }
    initOpenOrders(ix) {
        const market = ix.keys[2].pubkey;
        const owner = ix.keys[1].pubkey;
        // b"open-orders"
        const openOrdersSeed = Buffer.from([
            111,
            112,
            101,
            110,
            45,
            111,
            114,
            100,
            101,
            114,
            115
        ]);
        // b"open-orders-init"
        const openOrdersInitSeed = Buffer.from([
            111,
            112,
            101,
            110,
            45,
            111,
            114,
            100,
            101,
            114,
            115,
            45,
            105,
            110,
            105,
            116
        ]);
        const [openOrders, bump] = anchor_1.utils.publicKey.findProgramAddressSync([
            openOrdersSeed,
            this._dexProgramId.toBuffer(),
            market.toBuffer(),
            owner.toBuffer()
        ], this._proxyProgramId);
        const [marketAuthority, bumpInit] = anchor_1.utils.publicKey.findProgramAddressSync([
            openOrdersInitSeed,
            this._dexProgramId.toBuffer(),
            market.toBuffer()
        ], this._proxyProgramId);
        // Override the open orders account and market authority.
        ix.keys[0].pubkey = openOrders;
        ix.keys[4].pubkey = marketAuthority;
        // Writable because it must pay for the PDA initialization.
        ix.keys[1].isWritable = true;
        // Prepend to the account list extra accounts needed for PDA initialization.
        ix.keys = [
            {
                pubkey: this._dexProgramId,
                isSigner: false,
                isWritable: false
            },
            {
                pubkey: web3_js_1.SystemProgram.programId,
                isSigner: false,
                isWritable: false
            },
            ...ix.keys
        ];
        // Prepend the ix discriminator, bump, and bumpInit to the instruction data,
        // which saves the program compute by avoiding recalculating them in the
        // program.
        ix.data = Buffer.concat([
            Buffer.from([
                0,
                bump,
                bumpInit
            ]),
            ix.data
        ]);
    }
    newOrderV3(ix) {
        ix.data = Buffer.concat([
            Buffer.from([
                1
            ]),
            ix.data
        ]);
    }
    cancelOrderV2(ix) {
        ix.data = Buffer.concat([
            Buffer.from([
                2
            ]),
            ix.data
        ]);
    }
    cancelOrderByClientIdV2(ix) {
        ix.data = Buffer.concat([
            Buffer.from([
                3
            ]),
            ix.data
        ]);
    }
    settleFunds(ix) {
        ix.data = Buffer.concat([
            Buffer.from([
                4
            ]),
            ix.data
        ]);
    }
    closeOpenOrders(ix) {
        ix.data = Buffer.concat([
            Buffer.from([
                5
            ]),
            ix.data
        ]);
    }
    prune(ix) {
        ix.data = Buffer.concat([
            Buffer.from([
                6
            ]),
            ix.data
        ]);
    }
    consumeEvents(ix) {
        ix.data = Buffer.concat([
            Buffer.from([
                7
            ]),
            ix.data
        ]);
    }
    consumeEventsPermissioned(ix) {
        ix.data = Buffer.concat([
            Buffer.from([
                8
            ]),
            ix.data
        ]);
    }
}
exports.OpenOrdersPda = OpenOrdersPda;
class ReferralFees {
    // eslint-disable-next-line
    initOpenOrders(_ix) {}
    // eslint-disable-next-line
    newOrderV3(_ix) {}
    // eslint-disable-next-line
    cancelOrderV2(_ix) {}
    // eslint-disable-next-line
    cancelOrderByClientIdV2(_ix) {}
    // eslint-disable-next-line
    settleFunds(_ix) {}
    // eslint-disable-next-line
    closeOpenOrders(_ix) {}
    // eslint-disable-next-line
    prune(_ix) {}
    // eslint-disable-next-line
    consumeEvents(_ix) {}
    // eslint-disable-next-line
    consumeEventsPermissioned(_ix) {}
}
exports.ReferralFees = ReferralFees;
class PermissionedCrank {
    // eslint-disable-next-line
    initOpenOrders(_ix) {}
    // eslint-disable-next-line
    newOrderV3(_ix) {}
    // eslint-disable-next-line
    cancelOrderV2(_ix) {}
    // eslint-disable-next-line
    cancelOrderByClientIdV2(_ix) {}
    // eslint-disable-next-line
    settleFunds(_ix) {}
    // eslint-disable-next-line
    closeOpenOrders(_ix) {}
    // eslint-disable-next-line
    prune(_ix) {}
    // eslint-disable-next-line
    consumeEvents(_ix) {}
    // eslint-disable-next-line
    consumeEventsPermissioned(ix) {
        ix.keys[ix.keys.length - 1].isSigner = false;
    }
}
exports.PermissionedCrank = PermissionedCrank;
class Logger {
    initOpenOrders(ix) {
        console.log('Proxying initOpenOrders', this.ixToDisplay(ix));
    }
    newOrderV3(ix) {
        console.log('Proxying newOrderV3', this.ixToDisplay(ix));
    }
    cancelOrderV2(ix) {
        console.log('Proxying cancelOrderV2', this.ixToDisplay(ix));
    }
    cancelOrderByClientIdV2(ix) {
        console.log('Proxying cancelOrderByClientIdV2', this.ixToDisplay(ix));
    }
    settleFunds(ix) {
        console.log('Proxying settleFunds', this.ixToDisplay(ix));
    }
    closeOpenOrders(ix) {
        console.log('Proxying closeOpenOrders', this.ixToDisplay(ix));
    }
    prune(ix) {
        console.log('Proxying prune', this.ixToDisplay(ix));
    }
    consumeEvents(ix) {
        console.log('Proxying consumeEvents', this.ixToDisplay(ix));
    }
    consumeEventsPermissioned(ix) {
        console.log('Proxying consumeEventsPermissioned', this.ixToDisplay(ix));
    }
    ixToDisplay(ix) {
        const keys = ix.keys.map((i)=>{
            return {
                ...i,
                pubkey: i.pubkey.toString()
            };
        });
        const programId = ix.programId.toString();
        const data = new Uint8Array(ix.data);
        return {
            keys,
            programId,
            data
        };
    }
}
exports.Logger = Logger; //# sourceMappingURL=middleware.js.map
}),
"[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
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
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Logger = exports.PermissionedCrank = exports.ReferralFees = exports.OpenOrdersPda = exports.MarketProxyBuilder = exports.MarketProxy = exports.TokenInstructions = exports.EVENT_QUEUE_LAYOUT = exports.REQUEST_QUEUE_LAYOUT = exports.decodeRequestQueue = exports.decodeEventQueue = exports.getLayoutVersion = exports.MARKETS = exports.TOKEN_MINTS = exports.supportsSrmFeeDiscounts = exports.getFeeRates = exports.getFeeTier = exports.NEW_ORDER_V3_OWNER_INDEX = exports.NEW_ORDER_V3_OPEN_ORDERS_INDEX = exports.NEW_ORDER_OWNER_INDEX = exports.NEW_ORDER_OPEN_ORDERS_INDEX = exports.SETTLE_FUNDS_QUOTE_WALLET_INDEX = exports.SETTLE_FUNDS_BASE_WALLET_INDEX = exports.decodeInstructionV2 = exports.decodeInstruction = exports.DexInstructions = exports.MARKET_STATE_LAYOUT_V2 = exports.MARKET_STATE_LAYOUT_V3 = exports.OpenOrders = exports.Orderbook = exports.Market = void 0;
var market_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/market.js [app-route] (ecmascript)");
Object.defineProperty(exports, "Market", {
    enumerable: true,
    get: function() {
        return market_1.Market;
    }
});
Object.defineProperty(exports, "Orderbook", {
    enumerable: true,
    get: function() {
        return market_1.Orderbook;
    }
});
Object.defineProperty(exports, "OpenOrders", {
    enumerable: true,
    get: function() {
        return market_1.OpenOrders;
    }
});
Object.defineProperty(exports, "MARKET_STATE_LAYOUT_V3", {
    enumerable: true,
    get: function() {
        return market_1.MARKET_STATE_LAYOUT_V3;
    }
});
Object.defineProperty(exports, "MARKET_STATE_LAYOUT_V2", {
    enumerable: true,
    get: function() {
        return market_1.MARKET_STATE_LAYOUT_V2;
    }
});
var instructions_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/instructions.js [app-route] (ecmascript)");
Object.defineProperty(exports, "DexInstructions", {
    enumerable: true,
    get: function() {
        return instructions_1.DexInstructions;
    }
});
Object.defineProperty(exports, "decodeInstruction", {
    enumerable: true,
    get: function() {
        return instructions_1.decodeInstruction;
    }
});
Object.defineProperty(exports, "decodeInstructionV2", {
    enumerable: true,
    get: function() {
        return instructions_1.decodeInstructionV2;
    }
});
Object.defineProperty(exports, "SETTLE_FUNDS_BASE_WALLET_INDEX", {
    enumerable: true,
    get: function() {
        return instructions_1.SETTLE_FUNDS_BASE_WALLET_INDEX;
    }
});
Object.defineProperty(exports, "SETTLE_FUNDS_QUOTE_WALLET_INDEX", {
    enumerable: true,
    get: function() {
        return instructions_1.SETTLE_FUNDS_QUOTE_WALLET_INDEX;
    }
});
Object.defineProperty(exports, "NEW_ORDER_OPEN_ORDERS_INDEX", {
    enumerable: true,
    get: function() {
        return instructions_1.NEW_ORDER_OPEN_ORDERS_INDEX;
    }
});
Object.defineProperty(exports, "NEW_ORDER_OWNER_INDEX", {
    enumerable: true,
    get: function() {
        return instructions_1.NEW_ORDER_OWNER_INDEX;
    }
});
Object.defineProperty(exports, "NEW_ORDER_V3_OPEN_ORDERS_INDEX", {
    enumerable: true,
    get: function() {
        return instructions_1.NEW_ORDER_V3_OPEN_ORDERS_INDEX;
    }
});
Object.defineProperty(exports, "NEW_ORDER_V3_OWNER_INDEX", {
    enumerable: true,
    get: function() {
        return instructions_1.NEW_ORDER_V3_OWNER_INDEX;
    }
});
var fees_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/fees.js [app-route] (ecmascript)");
Object.defineProperty(exports, "getFeeTier", {
    enumerable: true,
    get: function() {
        return fees_1.getFeeTier;
    }
});
Object.defineProperty(exports, "getFeeRates", {
    enumerable: true,
    get: function() {
        return fees_1.getFeeRates;
    }
});
Object.defineProperty(exports, "supportsSrmFeeDiscounts", {
    enumerable: true,
    get: function() {
        return fees_1.supportsSrmFeeDiscounts;
    }
});
var tokens_and_markets_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/tokens_and_markets.js [app-route] (ecmascript)");
Object.defineProperty(exports, "TOKEN_MINTS", {
    enumerable: true,
    get: function() {
        return tokens_and_markets_1.TOKEN_MINTS;
    }
});
Object.defineProperty(exports, "MARKETS", {
    enumerable: true,
    get: function() {
        return tokens_and_markets_1.MARKETS;
    }
});
Object.defineProperty(exports, "getLayoutVersion", {
    enumerable: true,
    get: function() {
        return tokens_and_markets_1.getLayoutVersion;
    }
});
var queue_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/queue.js [app-route] (ecmascript)");
Object.defineProperty(exports, "decodeEventQueue", {
    enumerable: true,
    get: function() {
        return queue_1.decodeEventQueue;
    }
});
Object.defineProperty(exports, "decodeRequestQueue", {
    enumerable: true,
    get: function() {
        return queue_1.decodeRequestQueue;
    }
});
Object.defineProperty(exports, "REQUEST_QUEUE_LAYOUT", {
    enumerable: true,
    get: function() {
        return queue_1.REQUEST_QUEUE_LAYOUT;
    }
});
Object.defineProperty(exports, "EVENT_QUEUE_LAYOUT", {
    enumerable: true,
    get: function() {
        return queue_1.EVENT_QUEUE_LAYOUT;
    }
});
exports.TokenInstructions = __importStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/token-instructions.js [app-route] (ecmascript)"));
__exportStar(__turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/error.js [app-route] (ecmascript)"), exports);
var market_proxy_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/market-proxy/index.js [app-route] (ecmascript)");
Object.defineProperty(exports, "MarketProxy", {
    enumerable: true,
    get: function() {
        return market_proxy_1.MarketProxy;
    }
});
Object.defineProperty(exports, "MarketProxyBuilder", {
    enumerable: true,
    get: function() {
        return market_proxy_1.MarketProxyBuilder;
    }
});
var middleware_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@project-serum+serum@0.13.65_typescript@5.9.3/node_modules/@project-serum/serum/lib/market-proxy/middleware.js [app-route] (ecmascript)");
Object.defineProperty(exports, "OpenOrdersPda", {
    enumerable: true,
    get: function() {
        return middleware_1.OpenOrdersPda;
    }
});
Object.defineProperty(exports, "ReferralFees", {
    enumerable: true,
    get: function() {
        return middleware_1.ReferralFees;
    }
});
Object.defineProperty(exports, "PermissionedCrank", {
    enumerable: true,
    get: function() {
        return middleware_1.PermissionedCrank;
    }
});
Object.defineProperty(exports, "Logger", {
    enumerable: true,
    get: function() {
        return middleware_1.Logger;
    }
}); //# sourceMappingURL=index.js.map
}),
];

//# sourceMappingURL=2a948_%40project-serum_serum_lib_cd76bca6._.js.map