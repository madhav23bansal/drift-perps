module.exports = [
"[project]/dashboard/node_modules/.pnpm/@pythnetwork+pyth-solana-receiver@0.7.0_typescript@5.9.3/node_modules/@pythnetwork/pyth-solana-receiver/lib/idl/pyth_solana_receiver.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IDL = void 0;
exports.IDL = {
    version: "0.1.0",
    name: "pyth_solana_receiver",
    instructions: [
        {
            name: "initialize",
            accounts: [
                {
                    name: "payer",
                    isMut: true,
                    isSigner: true
                },
                {
                    name: "config",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: "initialConfig",
                    type: {
                        defined: "Config"
                    }
                }
            ]
        },
        {
            name: "requestGovernanceAuthorityTransfer",
            accounts: [
                {
                    name: "payer",
                    isMut: false,
                    isSigner: true
                },
                {
                    name: "config",
                    isMut: true,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: "targetGovernanceAuthority",
                    type: "publicKey"
                }
            ]
        },
        {
            name: "acceptGovernanceAuthorityTransfer",
            accounts: [
                {
                    name: "payer",
                    isMut: false,
                    isSigner: true
                },
                {
                    name: "config",
                    isMut: true,
                    isSigner: false
                }
            ],
            args: []
        },
        {
            name: "setDataSources",
            accounts: [
                {
                    name: "payer",
                    isMut: false,
                    isSigner: true
                },
                {
                    name: "config",
                    isMut: true,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: "validDataSources",
                    type: {
                        vec: {
                            defined: "DataSource"
                        }
                    }
                }
            ]
        },
        {
            name: "setFee",
            accounts: [
                {
                    name: "payer",
                    isMut: false,
                    isSigner: true
                },
                {
                    name: "config",
                    isMut: true,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: "singleUpdateFeeInLamports",
                    type: "u64"
                }
            ]
        },
        {
            name: "setWormholeAddress",
            accounts: [
                {
                    name: "payer",
                    isMut: false,
                    isSigner: true
                },
                {
                    name: "config",
                    isMut: true,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: "wormhole",
                    type: "publicKey"
                }
            ]
        },
        {
            name: "setMinimumSignatures",
            accounts: [
                {
                    name: "payer",
                    isMut: false,
                    isSigner: true
                },
                {
                    name: "config",
                    isMut: true,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: "minimumSignatures",
                    type: "u8"
                }
            ]
        },
        {
            name: "postUpdateAtomic",
            docs: [
                "Post a price update using a VAA and a MerklePriceUpdate.",
                "This function allows you to post a price update in a single transaction.",
                "Compared to post_update, it is less secure since you won't be able to verify all guardian signatures if you use this function because of transaction size limitations.",
                "Typically, you can fit 5 guardian signatures in a transaction that uses this."
            ],
            accounts: [
                {
                    name: "payer",
                    isMut: true,
                    isSigner: true
                },
                {
                    name: "guardianSet",
                    isMut: false,
                    isSigner: false,
                    docs: [
                        "Instead we do the same steps in deserialize_guardian_set_checked."
                    ]
                },
                {
                    name: "config",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "treasury",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "priceUpdateAccount",
                    isMut: true,
                    isSigner: true,
                    docs: [
                        "The contraint is such that either the price_update_account is uninitialized or the payer is the write_authority.",
                        "Pubkey::default() is the SystemProgram on Solana and it can't sign so it's impossible that price_update_account.write_authority == Pubkey::default() once the account is initialized"
                    ]
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "writeAuthority",
                    isMut: false,
                    isSigner: true
                }
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: "PostUpdateAtomicParams"
                    }
                }
            ]
        },
        {
            name: "postUpdate",
            docs: [
                "Post a price update using an encoded_vaa account and a MerklePriceUpdate calldata.",
                "This should be called after the client has already verified the Vaa via the Wormhole contract.",
                "Check out target_chains/solana/cli/src/main.rs for an example of how to do this."
            ],
            accounts: [
                {
                    name: "payer",
                    isMut: true,
                    isSigner: true
                },
                {
                    name: "encodedVaa",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "config",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "treasury",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "priceUpdateAccount",
                    isMut: true,
                    isSigner: true,
                    docs: [
                        "The contraint is such that either the price_update_account is uninitialized or the payer is the write_authority.",
                        "Pubkey::default() is the SystemProgram on Solana and it can't sign so it's impossible that price_update_account.write_authority == Pubkey::default() once the account is initialized"
                    ]
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "writeAuthority",
                    isMut: false,
                    isSigner: true
                }
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: "PostUpdateParams"
                    }
                }
            ]
        },
        {
            name: "reclaimRent",
            accounts: [
                {
                    name: "payer",
                    isMut: true,
                    isSigner: true
                },
                {
                    name: "priceUpdateAccount",
                    isMut: true,
                    isSigner: false
                }
            ],
            args: []
        }
    ],
    accounts: [
        {
            name: "Config",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "governanceAuthority",
                        type: "publicKey"
                    },
                    {
                        name: "targetGovernanceAuthority",
                        type: {
                            option: "publicKey"
                        }
                    },
                    {
                        name: "wormhole",
                        type: "publicKey"
                    },
                    {
                        name: "validDataSources",
                        type: {
                            vec: {
                                defined: "DataSource"
                            }
                        }
                    },
                    {
                        name: "singleUpdateFeeInLamports",
                        type: "u64"
                    },
                    {
                        name: "minimumSignatures",
                        type: "u8"
                    }
                ]
            }
        },
        {
            name: "priceUpdateV2",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "writeAuthority",
                        type: "publicKey"
                    },
                    {
                        name: "verificationLevel",
                        type: {
                            defined: "VerificationLevel"
                        }
                    },
                    {
                        name: "priceMessage",
                        type: {
                            defined: "PriceFeedMessage"
                        }
                    },
                    {
                        name: "postedSlot",
                        type: "u64"
                    }
                ]
            }
        }
    ],
    types: [
        {
            name: "PriceFeedMessage",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "feedId",
                        type: {
                            array: [
                                "u8",
                                32
                            ]
                        }
                    },
                    {
                        name: "price",
                        type: "i64"
                    },
                    {
                        name: "conf",
                        type: "u64"
                    },
                    {
                        name: "exponent",
                        type: "i32"
                    },
                    {
                        name: "publishTime",
                        type: "i64"
                    },
                    {
                        name: "prevPublishTime",
                        type: "i64"
                    },
                    {
                        name: "emaPrice",
                        type: "i64"
                    },
                    {
                        name: "emaConf",
                        type: "u64"
                    }
                ]
            }
        },
        {
            name: "MerklePriceUpdate",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "message",
                        type: "bytes"
                    },
                    {
                        name: "proof",
                        type: {
                            vec: {
                                array: [
                                    "u8",
                                    20
                                ]
                            }
                        }
                    }
                ]
            }
        },
        {
            name: "DataSource",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "chain",
                        type: "u16"
                    },
                    {
                        name: "emitter",
                        type: "publicKey"
                    }
                ]
            }
        },
        {
            name: "PostUpdateAtomicParams",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "vaa",
                        type: "bytes"
                    },
                    {
                        name: "merklePriceUpdate",
                        type: {
                            defined: "MerklePriceUpdate"
                        }
                    },
                    {
                        name: "treasuryId",
                        type: "u8"
                    }
                ]
            }
        },
        {
            name: "PostUpdateParams",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "merklePriceUpdate",
                        type: {
                            defined: "MerklePriceUpdate"
                        }
                    },
                    {
                        name: "treasuryId",
                        type: "u8"
                    }
                ]
            }
        },
        {
            name: "VerificationLevel",
            docs: [
                "* This enum represents how many guardian signatures were checked for a Pythnet price update\n * If full, guardian quorum has been attained\n * If partial, at least config.minimum signatures have been verified, but in the case config.minimum_signatures changes in the future we also include the number of signatures that were checked"
            ],
            type: {
                kind: "enum",
                variants: [
                    {
                        name: "Partial",
                        fields: [
                            {
                                name: "numSignatures",
                                type: "u8"
                            }
                        ]
                    },
                    {
                        name: "Full"
                    }
                ]
            }
        }
    ],
    errors: [
        {
            code: 6000,
            name: "InvalidWormholeMessage",
            msg: "Received an invalid wormhole message"
        },
        {
            code: 6001,
            name: "DeserializeMessageFailed",
            msg: "An error occurred when deserializing the message"
        },
        {
            code: 6002,
            name: "InvalidPriceUpdate",
            msg: "Received an invalid price update"
        },
        {
            code: 6003,
            name: "UnsupportedMessageType",
            msg: "This type of message is not supported currently"
        },
        {
            code: 6004,
            name: "InvalidDataSource",
            msg: "The tuple emitter chain, emitter doesn't match one of the valid data sources."
        },
        {
            code: 6005,
            name: "InsufficientFunds",
            msg: "Funds are insufficient to pay the receiving fee"
        },
        {
            code: 6006,
            name: "WrongWriteAuthority",
            msg: "This signer can't write to price update account"
        },
        {
            code: 6007,
            name: "WrongVaaOwner",
            msg: "The posted VAA account has the wrong owner."
        },
        {
            code: 6008,
            name: "DeserializeVaaFailed",
            msg: "An error occurred when deserializing the VAA."
        },
        {
            code: 6009,
            name: "InsufficientGuardianSignatures",
            msg: "The number of guardian signatures is below the minimum"
        },
        {
            code: 6010,
            name: "InvalidVaaVersion",
            msg: "Invalid VAA version"
        },
        {
            code: 6011,
            name: "GuardianSetMismatch",
            msg: "Guardian set version in the VAA doesn't match the guardian set passed"
        },
        {
            code: 6012,
            name: "InvalidGuardianOrder",
            msg: "Guardian signature indices must be increasing"
        },
        {
            code: 6013,
            name: "InvalidGuardianIndex",
            msg: "Guardian index exceeds the number of guardians in the set"
        },
        {
            code: 6014,
            name: "InvalidSignature",
            msg: "A VAA signature is invalid"
        },
        {
            code: 6015,
            name: "InvalidGuardianKeyRecovery",
            msg: "The recovered guardian public key doesn't match the guardian set"
        },
        {
            code: 6016,
            name: "WrongGuardianSetOwner",
            msg: "The guardian set account is owned by the wrong program"
        },
        {
            code: 6017,
            name: "InvalidGuardianSetPda",
            msg: "The Guardian Set account doesn't match the PDA derivation"
        },
        {
            code: 6018,
            name: "GuardianSetExpired",
            msg: "The Guardian Set is expired"
        },
        {
            code: 6019,
            name: "GovernanceAuthorityMismatch",
            msg: "The signer is not authorized to perform this governance action"
        },
        {
            code: 6020,
            name: "TargetGovernanceAuthorityMismatch",
            msg: "The signer is not authorized to accept the governance authority"
        },
        {
            code: 6021,
            name: "NonexistentGovernanceAuthorityTransferRequest",
            msg: "The governance authority needs to request a transfer first"
        }
    ]
};
}),
"[project]/dashboard/node_modules/.pnpm/@pythnetwork+pyth-solana-receiver@0.7.0_typescript@5.9.3/node_modules/@pythnetwork/pyth-solana-receiver/lib/idl/wormhole_core_bridge_solana.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IDL = void 0;
exports.IDL = {
    version: "0.0.1-alpha.5",
    name: "wormhole_core_bridge_solana",
    constants: [
        {
            name: "SOLANA_CHAIN",
            type: "u16",
            value: "1"
        },
        {
            name: "FEE_COLLECTOR_SEED_PREFIX",
            type: "bytes",
            value: "[102, 101, 101, 95, 99, 111, 108, 108, 101, 99, 116, 111, 114]"
        },
        {
            name: "UPGRADE_SEED_PREFIX",
            type: "bytes",
            value: "[117, 112, 103, 114, 97, 100, 101]"
        },
        {
            name: "PROGRAM_EMITTER_SEED_PREFIX",
            type: "bytes",
            value: "[101, 109, 105, 116, 116, 101, 114]"
        },
        {
            name: "MAX_MESSAGE_PAYLOAD_SIZE",
            type: {
                defined: "usize"
            },
            value: "30 * 1_024"
        }
    ],
    instructions: [
        {
            name: "initMessageV1",
            docs: [
                "Processor for initializing a new draft [PostedMessageV1](crate::state::PostedMessageV1)",
                "account for writing. The emitter authority is established at this point and the payload size",
                "is inferred from the size of the created account. This instruction handler also allows an",
                "integrator to publish Wormhole messages using his program's ID as the emitter address",
                "(by passing `Some(crate::ID)` to the [cpi_program_id](InitMessageV1Args::cpi_program_id)",
                'argument). **Be aware that the emitter authority\'s seeds must only be \\[b"emitter"\\] in this',
                "case.**",
                "",
                "This instruction should be followed up with `write_message_v1` and `finalize_message_v1` to",
                "write and indicate that the message is ready for publishing respectively (to prepare it for",
                "publishing via the",
                "[post message instruction](crate::legacy::instruction::LegacyInstruction::PostMessage)).",
                "",
                "NOTE: If you wish to publish a small message (one where the data does not overflow the",
                "Solana transaction size), it is recommended that you use an [sdk](crate::sdk::cpi) method to",
                "either prepare your message or post a message as a program ID emitter."
            ],
            accounts: [
                {
                    name: "emitterAuthority",
                    isMut: false,
                    isSigner: true,
                    docs: [
                        "This authority is the only one who can write to the draft message account."
                    ]
                },
                {
                    name: "draftMessage",
                    isMut: true,
                    isSigner: false,
                    docs: [
                        "Bridge."
                    ]
                }
            ],
            args: [
                {
                    name: "args",
                    type: {
                        defined: "InitMessageV1Args"
                    }
                }
            ]
        },
        {
            name: "writeMessageV1",
            docs: [
                "Processor used to write to a draft [PostedMessageV1](crate::state::PostedMessageV1) account.",
                "This instruction requires an authority (the emitter authority) to interact with the message",
                "account."
            ],
            accounts: [
                {
                    name: "emitterAuthority",
                    isMut: false,
                    isSigner: true
                },
                {
                    name: "draftMessage",
                    isMut: true,
                    isSigner: false,
                    docs: [
                        "only be published when the message is finalized."
                    ]
                }
            ],
            args: [
                {
                    name: "args",
                    type: {
                        defined: "WriteMessageV1Args"
                    }
                }
            ]
        },
        {
            name: "finalizeMessageV1",
            docs: [
                "Processor used to finalize a draft [PostedMessageV1](crate::state::PostedMessageV1) account.",
                "Once finalized, this message account cannot be written to again. A finalized message is the",
                "only state the legacy post message instruction can accept before publishing. This",
                "instruction requires an authority (the emitter authority) to interact with the message",
                "account."
            ],
            accounts: [
                {
                    name: "emitterAuthority",
                    isMut: false,
                    isSigner: true
                },
                {
                    name: "draftMessage",
                    isMut: true,
                    isSigner: false,
                    docs: [
                        "only be published when the message is finalized."
                    ]
                }
            ],
            args: []
        },
        {
            name: "closeMessageV1",
            docs: [
                "Processor used to process a draft [PostedMessageV1](crate::state::PostedMessageV1) account.",
                "This instruction requires an authority (the emitter authority) to interact with the message",
                "account."
            ],
            accounts: [
                {
                    name: "emitterAuthority",
                    isMut: false,
                    isSigner: true
                },
                {
                    name: "draftMessage",
                    isMut: true,
                    isSigner: false,
                    docs: [
                        "only be published when the message is finalized."
                    ]
                },
                {
                    name: "closeAccountDestination",
                    isMut: true,
                    isSigner: false
                }
            ],
            args: []
        },
        {
            name: "initEncodedVaa",
            docs: [
                "Processor used to intialize a created account as [EncodedVaa](crate::state::EncodedVaa). An",
                "authority (the write authority) is established with this instruction."
            ],
            accounts: [
                {
                    name: "writeAuthority",
                    isMut: false,
                    isSigner: true,
                    docs: [
                        "The authority who can write to the VAA account when it is being processed."
                    ]
                },
                {
                    name: "encodedVaa",
                    isMut: true,
                    isSigner: false,
                    docs: [
                        "Bridge."
                    ]
                }
            ],
            args: []
        },
        {
            name: "closeEncodedVaa",
            docs: [
                "Processor used to close an [EncodedVaa](crate::state::EncodedVaa). This instruction requires",
                "an authority (the write authority) to interact witht he encoded VAA account."
            ],
            accounts: [
                {
                    name: "writeAuthority",
                    isMut: true,
                    isSigner: true,
                    docs: [
                        "This account is only required to be mutable for the `CloseVaaAccount` directive. This",
                        "authority is the same signer that originally created the VAA accounts, so he is the one that",
                        "will receive the lamports back for the closed accounts."
                    ]
                },
                {
                    name: "encodedVaa",
                    isMut: true,
                    isSigner: false,
                    docs: [
                        "written to and then verified."
                    ]
                }
            ],
            args: []
        },
        {
            name: "writeEncodedVaa",
            docs: [
                "Processor used to write to an [EncodedVaa](crate::state::EncodedVaa) account. This",
                "instruction requires an authority (the write authority) to interact with the encoded VAA",
                "account."
            ],
            accounts: [
                {
                    name: "writeAuthority",
                    isMut: false,
                    isSigner: true,
                    docs: [
                        "The only authority that can write to the encoded VAA account."
                    ]
                },
                {
                    name: "draftVaa",
                    isMut: true,
                    isSigner: false,
                    docs: [
                        "written to and then verified."
                    ]
                }
            ],
            args: [
                {
                    name: "args",
                    type: {
                        defined: "WriteEncodedVaaArgs"
                    }
                }
            ]
        },
        {
            name: "verifyEncodedVaaV1",
            docs: [
                "Processor used to verify an [EncodedVaa](crate::state::EncodedVaa) account as a version 1",
                "VAA (guardian signatures attesting to this observation). This instruction requires an",
                "authority (the write authority) to interact with the encoded VAA account."
            ],
            accounts: [
                {
                    name: "writeAuthority",
                    isMut: false,
                    isSigner: true
                },
                {
                    name: "draftVaa",
                    isMut: true,
                    isSigner: false,
                    docs: [
                        "written to and then verified."
                    ]
                },
                {
                    name: "guardianSet",
                    isMut: false,
                    isSigner: false,
                    docs: [
                        "Guardian set account, which should be the same one that was used to attest for the VAA. The",
                        "signatures in the encoded VAA are verified against this guardian set."
                    ]
                }
            ],
            args: []
        },
        {
            name: "postVaaV1",
            docs: [
                "Processor used to close an [EncodedVaa](crate::state::EncodedVaa) account to create a",
                "[PostedMessageV1](crate::state::PostedMessageV1) account in its place.",
                "",
                "NOTE: Because the legacy verify signatures instruction was not required for the Posted VAA",
                "account to exist, the encoded [SignatureSet](crate::state::SignatureSet) is the default",
                "[Pubkey]."
            ],
            accounts: [
                {
                    name: "payer",
                    isMut: true,
                    isSigner: true,
                    docs: [
                        "Payer to create the posted VAA account. This instruction allows anyone with an encoded VAA",
                        "to create a posted VAA account."
                    ]
                },
                {
                    name: "encodedVaa",
                    isMut: false,
                    isSigner: false,
                    docs: [
                        "Encoded VAA, whose body will be serialized into the posted VAA account.",
                        "",
                        "NOTE: This instruction handler only exists to support integrators that still rely on posted",
                        "VAA accounts. While we encourage integrators to use the encoded VAA account instead, we",
                        "allow a pathway to convert the encoded VAA into a posted VAA. However, the payload is",
                        "restricted to 9.5KB, which is much larger than what was possible with the old implementation",
                        "using the legacy post vaa instruction. The Core Bridge program will not support posting VAAs",
                        "larger than this payload size."
                    ]
                },
                {
                    name: "postedVaa",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false
                }
            ],
            args: []
        },
        {
            name: "closeSignatureSet",
            docs: [
                "Processor used to close a [SignatureSet](crate::state::SignatureSet), which was used to",
                "verify the VAA using the legacy parse and verify procedure."
            ],
            accounts: [
                {
                    name: "solDestination",
                    isMut: true,
                    isSigner: true
                },
                {
                    name: "postedVaa",
                    isMut: false,
                    isSigner: false,
                    docs: [
                        "Posted VAA."
                    ]
                },
                {
                    name: "signatureSet",
                    isMut: true,
                    isSigner: false,
                    docs: [
                        "Signature set that may have been used to create the posted VAA account. If the `post_vaa_v1`",
                        "instruction were used to create the posted VAA account, then the encoded signature set",
                        "pubkey would be all zeroes."
                    ]
                }
            ],
            args: []
        }
    ],
    accounts: [
        {
            name: "guardianSet",
            docs: [
                "Account used to store a guardian set. The keys encoded in this account are Ethereum pubkeys.",
                "Its expiration time is determined at the time a guardian set is updated to a new set, where the",
                "current network clock time is used with",
                "[guardian_set_ttl](crate::state::Config::guardian_set_ttl).",
                "",
                "NOTE: The account schema is the same as legacy guardian sets, but this account now has a",
                "discriminator generated by Anchor's [account] macro. When the Core Bridge program performs a",
                "guardian set update with this implementation, guardian sets will now have this Anchor-generated",
                "discriminator."
            ],
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "index",
                        docs: [
                            "Index representing an incrementing version number for this guardian set."
                        ],
                        type: "u32"
                    },
                    {
                        name: "keys",
                        docs: [
                            "Ethereum-style public keys."
                        ],
                        type: {
                            vec: {
                                array: [
                                    "u8",
                                    20
                                ]
                            }
                        }
                    },
                    {
                        name: "creationTime",
                        docs: [
                            "Timestamp representing the time this guardian became active."
                        ],
                        type: {
                            defined: "Timestamp"
                        }
                    },
                    {
                        name: "expirationTime",
                        docs: [
                            "Expiration time when VAAs issued by this set are no longer valid."
                        ],
                        type: {
                            defined: "Timestamp"
                        }
                    }
                ]
            }
        },
        {
            name: "signatureSet",
            docs: [
                "Account used to store information about a guardian set used to sign a VAA. There is only one",
                "signature set for each verified VAA (associated with a",
                "[PostedVaaV1](crate::legacy::state::PostedVaaV1) account). This account is created using the",
                "verify signatures legacy instruction.",
                "",
                "NOTE: The account schema is the same as legacy signature sets, but this account now has a",
                "discriminator generated by Anchor's [account] macro. When the Core Bridge program upgrades to",
                "this implementation from the old one, integrators in the middle of verifying signatures will",
                "have to use a new keypair for this account and try again."
            ],
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "sigVerifySuccesses",
                        docs: [
                            "Signatures of validators"
                        ],
                        type: {
                            vec: "bool"
                        }
                    },
                    {
                        name: "messageHash",
                        docs: [
                            "Hash of the VAA message body."
                        ],
                        type: {
                            defined: "MessageHash"
                        }
                    },
                    {
                        name: "guardianSetIndex",
                        docs: [
                            "Index of the guardian set"
                        ],
                        type: "u32"
                    }
                ]
            }
        },
        {
            name: "encodedVaa",
            docs: [
                "Account used to warehouse VAA buffer.",
                "",
                "NOTE: This account should not be used by an external application unless the header's status is",
                "`Verified`. It is encouraged to use the `EncodedVaa` zero-copy account struct instead."
            ],
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "header",
                        docs: [
                            "Status, write authority and VAA version."
                        ],
                        type: {
                            defined: "Header"
                        }
                    },
                    {
                        name: "buf",
                        docs: [
                            "VAA buffer."
                        ],
                        type: "bytes"
                    }
                ]
            }
        }
    ],
    types: [
        {
            name: "InitializeArgs",
            docs: [
                "Arguments used to initialize the Core Bridge program."
            ],
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "guardianSetTtlSeconds",
                        type: "u32"
                    },
                    {
                        name: "feeLamports",
                        type: "u64"
                    },
                    {
                        name: "initialGuardians",
                        type: {
                            vec: {
                                array: [
                                    "u8",
                                    20
                                ]
                            }
                        }
                    }
                ]
            }
        },
        {
            name: "PostMessageArgs",
            docs: [
                "Arguments used to post a new Wormhole (Core Bridge) message either using",
                "[post_message](crate::legacy::instruction::post_message) or",
                "[post_message_unreliable](crate::legacy::instruction::post_message_unreliable)."
            ],
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "nonce",
                        docs: [
                            "Unique id for this message."
                        ],
                        type: "u32"
                    },
                    {
                        name: "payload",
                        docs: [
                            "Encoded message."
                        ],
                        type: "bytes"
                    },
                    {
                        name: "commitment",
                        docs: [
                            "Solana commitment level for Guardian observation."
                        ],
                        type: {
                            defined: "Commitment"
                        }
                    }
                ]
            }
        },
        {
            name: "PostVaaArgs",
            docs: [
                "Arguments to post new VAA data after signature verification.",
                "",
                "NOTE: It is preferred to use the new process of verifying a VAA using the new Core Bridge Anchor",
                "instructions. See [init_encoded_vaa](crate::wormhole_core_bridge_solana::init_encoded_vaa) and",
                "[write_encoded_vaa](crate::wormhole_core_bridge_solana::write_encoded_vaa) for more info."
            ],
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "gap0",
                        docs: [
                            "Unused data."
                        ],
                        type: {
                            array: [
                                "u8",
                                5
                            ]
                        }
                    },
                    {
                        name: "timestamp",
                        docs: [
                            "Time the message was submitted."
                        ],
                        type: "u32"
                    },
                    {
                        name: "nonce",
                        docs: [
                            "Unique ID for this message."
                        ],
                        type: "u32"
                    },
                    {
                        name: "emitterChain",
                        docs: [
                            "The Wormhole chain ID denoting the origin of this message."
                        ],
                        type: "u16"
                    },
                    {
                        name: "emitterAddress",
                        docs: [
                            "Emitter of the message."
                        ],
                        type: {
                            array: [
                                "u8",
                                32
                            ]
                        }
                    },
                    {
                        name: "sequence",
                        docs: [
                            "Sequence number of this message."
                        ],
                        type: "u64"
                    },
                    {
                        name: "consistencyLevel",
                        docs: [
                            "Level of consistency requested by the emitter."
                        ],
                        type: "u8"
                    },
                    {
                        name: "payload",
                        docs: [
                            "Message payload."
                        ],
                        type: "bytes"
                    }
                ]
            }
        },
        {
            name: "VerifySignaturesArgs",
            docs: [
                "Arguments to verify specific guardian indices.",
                "",
                "NOTE: It is preferred to use the new process of verifying a VAA using the new Core Bridge Anchor",
                "instructions. See [init_encoded_vaa](crate::wormhole_core_bridge_solana::init_encoded_vaa) and",
                "[write_encoded_vaa](crate::wormhole_core_bridge_solana::write_encoded_vaa) for more info."
            ],
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "signerIndices",
                        docs: [
                            "Indices of verified guardian signatures, where -1 indicates a missing value. There is a",
                            "missing value if the guardian at this index is not expected to have its signature verfied by",
                            "the Sig Verify native program in the instruction invoked prior).",
                            "",
                            "NOTE: In the legacy implementation, this argument being a fixed-sized array of 19 only",
                            "allows the first 19 guardians of any size guardian set to be verified. Because of this, it",
                            "is absolutely important to use the new process of verifying a VAA."
                        ],
                        type: {
                            array: [
                                "i8",
                                19
                            ]
                        }
                    }
                ]
            }
        },
        {
            name: "EmptyArgs",
            docs: [
                "Unit struct used to represent an empty instruction argument."
            ],
            type: {
                kind: "struct",
                fields: []
            }
        },
        {
            name: "Config",
            docs: [
                "Account used to store the current configuration of the bridge, including tracking Wormhole fee",
                "payments. For governance decrees, the guardian set index is used to determine whether a decree",
                "was attested for using the latest guardian set."
            ],
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "guardianSetIndex",
                        docs: [
                            "The current guardian set index, used to decide which signature sets to accept."
                        ],
                        type: "u32"
                    },
                    {
                        name: "gap0",
                        docs: [
                            "Gap. In the old implementation, this was an amount that kept track of message fees that",
                            "were paid to the program's fee collector."
                        ],
                        type: {
                            array: [
                                "u8",
                                8
                            ]
                        }
                    },
                    {
                        name: "guardianSetTtl",
                        docs: [
                            "Period for how long a guardian set is valid after it has been replaced by a new one.  This",
                            "guarantees that VAAs issued by that set can still be submitted for a certain period.  In",
                            "this period we still trust the old guardian set."
                        ],
                        type: {
                            defined: "Duration"
                        }
                    },
                    {
                        name: "feeLamports",
                        docs: [
                            "Amount of lamports that needs to be paid to the protocol to post a message"
                        ],
                        type: "u64"
                    }
                ]
            }
        },
        {
            name: "LegacyEmitterSequence",
            docs: [
                "Account used to store the current sequence number for a given emitter."
            ],
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "value",
                        docs: [
                            "Current sequence number, which will be used the next time this emitter publishes a message."
                        ],
                        type: "u64"
                    }
                ]
            }
        },
        {
            name: "EmitterSequence",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "legacy",
                        type: {
                            defined: "LegacyEmitterSequence"
                        }
                    },
                    {
                        name: "bump",
                        type: "u8"
                    },
                    {
                        name: "emitterType",
                        type: {
                            defined: "EmitterType"
                        }
                    }
                ]
            }
        },
        {
            name: "PostedMessageV1Unreliable",
            docs: [
                "Account used to store a published (reusable) Wormhole message."
            ],
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "data",
                        type: {
                            defined: "PostedMessageV1Data"
                        }
                    }
                ]
            }
        },
        {
            name: "PostedMessageV1Info",
            docs: [
                "Message metadata defining information about a published Wormhole message."
            ],
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "consistencyLevel",
                        docs: [
                            "Level of consistency requested by the emitter."
                        ],
                        type: "u8"
                    },
                    {
                        name: "emitterAuthority",
                        docs: [
                            "Authority used to write the message. This field is set to default when the message is",
                            "posted."
                        ],
                        type: "publicKey"
                    },
                    {
                        name: "status",
                        docs: [
                            "If a message is being written to, this status is used to determine which state this",
                            "account is in (e.g. [MessageStatus::Writing] indicates that the emitter authority is still",
                            "writing its message to this account). When this message is posted, this value will be",
                            "set to [MessageStatus::Published]."
                        ],
                        type: {
                            defined: "MessageStatus"
                        }
                    },
                    {
                        name: "gap0",
                        docs: [
                            "No data is stored here."
                        ],
                        type: {
                            array: [
                                "u8",
                                3
                            ]
                        }
                    },
                    {
                        name: "postedTimestamp",
                        docs: [
                            "Time the posted message was created."
                        ],
                        type: {
                            defined: "Timestamp"
                        }
                    },
                    {
                        name: "nonce",
                        docs: [
                            "Unique id for this message."
                        ],
                        type: "u32"
                    },
                    {
                        name: "sequence",
                        docs: [
                            "Sequence number of this message."
                        ],
                        type: "u64"
                    },
                    {
                        name: "solanaChainId",
                        docs: [
                            "Always `1`.",
                            "",
                            "NOTE: Saving this value is silly, but we are keeping it to be consistent with how the posted",
                            "message account is written."
                        ],
                        type: {
                            defined: "ChainIdSolanaOnly"
                        }
                    },
                    {
                        name: "emitter",
                        docs: [
                            "Emitter of the message. This may either be the emitter authority or a program ID."
                        ],
                        type: "publicKey"
                    }
                ]
            }
        },
        {
            name: "PostedMessageV1Data",
            docs: [
                "Underlying data for either [PostedMessageV1](crate::legacy::state::PostedMessageV1) or",
                "[PostedMessageV1Unreliable](crate::legacy::state::PostedMessageV1Unreliable)."
            ],
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "info",
                        docs: [
                            "Message metadata."
                        ],
                        type: {
                            defined: "PostedMessageV1Info"
                        }
                    },
                    {
                        name: "payload",
                        docs: [
                            "Encoded message."
                        ],
                        type: "bytes"
                    }
                ]
            }
        },
        {
            name: "PostedMessageV1",
            docs: [
                "Account used to store a published Wormhole message.",
                "",
                "NOTE: If your integration requires reusable message accounts, please see",
                "[PostedMessageV1Unreliable](crate::legacy::state::PostedMessageV1Unreliable)."
            ],
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "data",
                        docs: [
                            "Message data."
                        ],
                        type: {
                            defined: "PostedMessageV1Data"
                        }
                    }
                ]
            }
        },
        {
            name: "PostedVaaV1Info",
            docs: [
                "VAA metadata defining information about a Wormhole message attested for by an active guardian",
                "set."
            ],
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "consistencyLevel",
                        docs: [
                            "Level of consistency requested by the emitter."
                        ],
                        type: "u8"
                    },
                    {
                        name: "timestamp",
                        docs: [
                            "Time the message was submitted."
                        ],
                        type: {
                            defined: "Timestamp"
                        }
                    },
                    {
                        name: "signatureSet",
                        docs: [
                            "Pubkey of [SignatureSet](crate::state::SignatureSet) account that represents this VAA's",
                            "signature verification."
                        ],
                        type: "publicKey"
                    },
                    {
                        name: "guardianSetIndex",
                        docs: [
                            "Guardian set index used to verify signatures for [SignatureSet](crate::state::SignatureSet).",
                            "",
                            'NOTE: In the previous implementation, this member was referred to as the "posted timestamp",',
                            "which is zero for VAA data (posted messages and VAAs resemble the same account schema). By",
                            "changing this to the guardian set index, we patch a bug with verifying governance VAAs for",
                            "the Core Bridge (other Core Bridge implementations require that the guardian set that",
                            "attested for the governance VAA is the current one)."
                        ],
                        type: "u32"
                    },
                    {
                        name: "nonce",
                        docs: [
                            "Unique ID for this message."
                        ],
                        type: "u32"
                    },
                    {
                        name: "sequence",
                        docs: [
                            "Sequence number of this message."
                        ],
                        type: "u64"
                    },
                    {
                        name: "emitterChain",
                        docs: [
                            "The Wormhole chain ID denoting the origin of this message."
                        ],
                        type: "u16"
                    },
                    {
                        name: "emitterAddress",
                        docs: [
                            "Emitter of the message."
                        ],
                        type: {
                            array: [
                                "u8",
                                32
                            ]
                        }
                    }
                ]
            }
        },
        {
            name: "PostedVaaV1",
            docs: [
                "Account used to store a verified VAA."
            ],
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "info",
                        docs: [
                            "VAA metadata."
                        ],
                        type: {
                            defined: "PostedVaaV1Info"
                        }
                    },
                    {
                        name: "payload",
                        docs: [
                            "Message payload."
                        ],
                        type: "bytes"
                    }
                ]
            }
        },
        {
            name: "WriteEncodedVaaArgs",
            docs: [
                "Arguments for the [write_encoded_vaa](crate::wormhole_core_bridge_solana::write_encoded_vaa)",
                "instruction."
            ],
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "index",
                        docs: [
                            "Index of VAA buffer."
                        ],
                        type: "u32"
                    },
                    {
                        name: "data",
                        docs: [
                            "Data representing subset of VAA buffer starting at specified index."
                        ],
                        type: "bytes"
                    }
                ]
            }
        },
        {
            name: "InitMessageV1Args",
            docs: [
                "Arguments for the [init_message_v1](crate::wormhole_core_bridge_solana::init_message_v1)",
                "instruction."
            ],
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "nonce",
                        docs: [
                            "Unique id for this message."
                        ],
                        type: "u32"
                    },
                    {
                        name: "commitment",
                        docs: [
                            "Solana commitment level for Guardian observation."
                        ],
                        type: {
                            defined: "Commitment"
                        }
                    },
                    {
                        name: "cpiProgramId",
                        docs: [
                            "Optional program ID if the emitter address will be your program ID.",
                            "",
                            'NOTE: If `Some(program_id)`, your emitter authority seeds to be \\[b"emitter\\].'
                        ],
                        type: {
                            option: "publicKey"
                        }
                    }
                ]
            }
        },
        {
            name: "WriteMessageV1Args",
            docs: [
                "Arguments for the [write_message_v1](crate::wormhole_core_bridge_solana::write_message_v1)",
                "instruction."
            ],
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "index",
                        docs: [
                            "Index of message buffer."
                        ],
                        type: "u32"
                    },
                    {
                        name: "data",
                        docs: [
                            "Data representing subset of message buffer starting at specified index."
                        ],
                        type: "bytes"
                    }
                ]
            }
        },
        {
            name: "Header",
            docs: [
                "`EncodedVaa` account header."
            ],
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "status",
                        docs: [
                            "Processing status. **This encoded VAA is only considered usable when this status is set",
                            "to [Verified](ProcessingStatus::Verified).**"
                        ],
                        type: {
                            defined: "ProcessingStatus"
                        }
                    },
                    {
                        name: "writeAuthority",
                        docs: [
                            "The authority that has write privilege to this account."
                        ],
                        type: "publicKey"
                    },
                    {
                        name: "version",
                        docs: [
                            "VAA version. Only when the VAA is verified is this version set to a value."
                        ],
                        type: "u8"
                    }
                ]
            }
        },
        {
            name: "Timestamp",
            docs: [
                "This struct defines unix timestamp as u32 (as opposed to more modern systems that have adopted",
                "i64). Methods for this struct are meant to convert Solana's clock type to this type assuming we",
                "are far from year 2038."
            ],
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "value",
                        type: "u32"
                    }
                ]
            }
        },
        {
            name: "Duration",
            docs: [
                "To be used with the [Timestamp] type, this struct defines a duration in seconds."
            ],
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "seconds",
                        type: "u32"
                    }
                ]
            }
        },
        {
            name: "MessageHash",
            docs: [
                "This type is used to represent a message hash (keccak)."
            ],
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "bytes",
                        type: {
                            array: [
                                "u8",
                                32
                            ]
                        }
                    }
                ]
            }
        },
        {
            name: "ChainIdSolanaOnly",
            docs: [
                "This type is kind of silly. But because [PostedMessageV1](crate::state::PostedMessageV1) has the",
                "emitter chain ID as a field, which is unnecessary since it is always Solana's chain ID, we use",
                "this type to guarantee that the encoded chain ID is always `1`."
            ],
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "chainId",
                        type: "u16"
                    }
                ]
            }
        },
        {
            name: "EmitterInfo",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "chain",
                        type: "u16"
                    },
                    {
                        name: "address",
                        type: {
                            array: [
                                "u8",
                                32
                            ]
                        }
                    },
                    {
                        name: "sequence",
                        type: "u64"
                    }
                ]
            }
        },
        {
            name: "LegacyInstruction",
            docs: [
                "Legacy instruction selector.",
                "",
                "NOTE: No more instructions should be added to this enum. Instead, add them as Anchor instruction",
                "handlers, which will inevitably live in",
                "[wormhole_core_bridge_solana](crate::wormhole_core_bridge_solana)."
            ],
            type: {
                kind: "enum",
                variants: [
                    {
                        name: "Initialize"
                    },
                    {
                        name: "PostMessage"
                    },
                    {
                        name: "PostVaa"
                    },
                    {
                        name: "SetMessageFee"
                    },
                    {
                        name: "TransferFees"
                    },
                    {
                        name: "UpgradeContract"
                    },
                    {
                        name: "GuardianSetUpdate"
                    },
                    {
                        name: "VerifySignatures"
                    },
                    {
                        name: "PostMessageUnreliable"
                    }
                ]
            }
        },
        {
            name: "EmitterType",
            type: {
                kind: "enum",
                variants: [
                    {
                        name: "Unset"
                    },
                    {
                        name: "Legacy"
                    },
                    {
                        name: "Executable"
                    }
                ]
            }
        },
        {
            name: "MessageStatus",
            docs: [
                "Status of a message. When a message is posted, its status is",
                "[Published](MessageStatus::Published)."
            ],
            type: {
                kind: "enum",
                variants: [
                    {
                        name: "Published"
                    },
                    {
                        name: "Writing"
                    },
                    {
                        name: "ReadyForPublishing"
                    }
                ]
            }
        },
        {
            name: "PublishMessageDirective",
            docs: [
                "Directive used to determine how to post a Core Bridge message."
            ],
            type: {
                kind: "enum",
                variants: [
                    {
                        name: "Message",
                        fields: [
                            {
                                name: "nonce",
                                type: "u32"
                            },
                            {
                                name: "payload",
                                type: "bytes"
                            },
                            {
                                name: "commitment",
                                type: {
                                    defined: "Commitment"
                                }
                            }
                        ]
                    },
                    {
                        name: "ProgramMessage",
                        fields: [
                            {
                                name: "programId",
                                type: "publicKey"
                            },
                            {
                                name: "nonce",
                                type: "u32"
                            },
                            {
                                name: "payload",
                                type: "bytes"
                            },
                            {
                                name: "commitment",
                                type: {
                                    defined: "Commitment"
                                }
                            }
                        ]
                    },
                    {
                        name: "PreparedMessage"
                    }
                ]
            }
        },
        {
            name: "ProcessingStatus",
            docs: [
                "Encoded VAA's processing status."
            ],
            type: {
                kind: "enum",
                variants: [
                    {
                        name: "Unset"
                    },
                    {
                        name: "Writing"
                    },
                    {
                        name: "Verified"
                    }
                ]
            }
        },
        {
            name: "Commitment",
            docs: [
                "Representation of Solana's commitment levels. This enum is not exhaustive because Wormhole only",
                "considers these two commitment levels in its Guardian observation.",
                "",
                "See <https://docs.solana.com/cluster/commitments> for more info."
            ],
            type: {
                kind: "enum",
                variants: [
                    {
                        name: "Confirmed"
                    },
                    {
                        name: "Finalized"
                    }
                ]
            }
        }
    ],
    errors: [
        {
            code: 6002,
            name: "InvalidInstructionArgument",
            msg: "InvalidInstructionArgument"
        },
        {
            code: 6003,
            name: "AccountNotZeroed",
            msg: "AccountNotZeroed"
        },
        {
            code: 6004,
            name: "InvalidDataConversion",
            msg: "InvalidDataConversion"
        },
        {
            code: 6006,
            name: "U64Overflow",
            msg: "U64Overflow"
        },
        {
            code: 6008,
            name: "InvalidComputeSize",
            msg: "InvalidComputeSize"
        },
        {
            code: 6016,
            name: "InvalidChain",
            msg: "InvalidChain"
        },
        {
            code: 6032,
            name: "InvalidGovernanceEmitter",
            msg: "InvalidGovernanceEmitter"
        },
        {
            code: 6034,
            name: "InvalidGovernanceAction",
            msg: "InvalidGovernanceAction"
        },
        {
            code: 6036,
            name: "LatestGuardianSetRequired",
            msg: "LatestGuardianSetRequired"
        },
        {
            code: 6038,
            name: "GovernanceForAnotherChain",
            msg: "GovernanceForAnotherChain"
        },
        {
            code: 6040,
            name: "InvalidGovernanceVaa",
            msg: "InvalidGovernanceVaa"
        },
        {
            code: 6256,
            name: "InsufficientFees",
            msg: "InsufficientFees"
        },
        {
            code: 6258,
            name: "EmitterMismatch",
            msg: "EmitterMismatch"
        },
        {
            code: 6260,
            name: "NotReadyForPublishing",
            msg: "NotReadyForPublishing"
        },
        {
            code: 6262,
            name: "InvalidPreparedMessage",
            msg: "InvalidPreparedMessage"
        },
        {
            code: 6264,
            name: "ExecutableEmitter",
            msg: "ExecutableEmitter"
        },
        {
            code: 6266,
            name: "LegacyEmitter",
            msg: "LegacyEmitter"
        },
        {
            code: 6512,
            name: "InvalidSignatureSet",
            msg: "InvalidSignatureSet"
        },
        {
            code: 6514,
            name: "InvalidMessageHash",
            msg: "InvalidMessageHash"
        },
        {
            code: 6515,
            name: "NoQuorum",
            msg: "NoQuorum"
        },
        {
            code: 6516,
            name: "MessageMismatch",
            msg: "MessageMismatch"
        },
        {
            code: 7024,
            name: "NotEnoughLamports",
            msg: "NotEnoughLamports"
        },
        {
            code: 7026,
            name: "InvalidFeeRecipient",
            msg: "InvalidFeeRecipient"
        },
        {
            code: 7280,
            name: "ImplementationMismatch",
            msg: "ImplementationMismatch"
        },
        {
            code: 7536,
            name: "InvalidGuardianSetIndex",
            msg: "InvalidGuardianSetIndex"
        },
        {
            code: 7792,
            name: "GuardianSetMismatch",
            msg: "GuardianSetMismatch"
        },
        {
            code: 7794,
            name: "InstructionAtWrongIndex",
            msg: "InstructionAtWrongIndex"
        },
        {
            code: 7795,
            name: "EmptySigVerifyInstruction",
            msg: "EmptySigVerifyInstruction"
        },
        {
            code: 7796,
            name: "InvalidSigVerifyInstruction",
            msg: "InvalidSigVerifyInstruction"
        },
        {
            code: 7798,
            name: "GuardianSetExpired",
            msg: "GuardianSetExpired"
        },
        {
            code: 7800,
            name: "InvalidGuardianKeyRecovery",
            msg: "InvalidGuardianKeyRecovery"
        },
        {
            code: 7802,
            name: "SignerIndicesMismatch",
            msg: "SignerIndicesMismatch"
        },
        {
            code: 8048,
            name: "PayloadSizeMismatch",
            msg: "PayloadSizeMismatch"
        },
        {
            code: 10112,
            name: "ZeroGuardians",
            msg: "ZeroGuardians"
        },
        {
            code: 10128,
            name: "GuardianZeroAddress",
            msg: "GuardianZeroAddress"
        },
        {
            code: 10144,
            name: "DuplicateGuardianAddress",
            msg: "DuplicateGuardianAddress"
        },
        {
            code: 10160,
            name: "MessageAlreadyPublished",
            msg: "MessageAlreadyPublished"
        },
        {
            code: 10176,
            name: "VaaWritingDisallowed",
            msg: "VaaWritingDisallowed"
        },
        {
            code: 10192,
            name: "VaaAlreadyVerified",
            msg: "VaaAlreadyVerified"
        },
        {
            code: 10208,
            name: "InvalidGuardianIndex",
            msg: "InvalidGuardianIndex"
        },
        {
            code: 10224,
            name: "InvalidSignature",
            msg: "InvalidSignature"
        },
        {
            code: 10256,
            name: "UnverifiedVaa",
            msg: "UnverifiedVaa"
        },
        {
            code: 10258,
            name: "VaaStillProcessing",
            msg: "VaaStillProcessing"
        },
        {
            code: 10260,
            name: "InWritingStatus",
            msg: "InWritingStatus"
        },
        {
            code: 10262,
            name: "NotInWritingStatus",
            msg: "NotInWritingStatus"
        },
        {
            code: 10264,
            name: "InvalidMessageStatus",
            msg: "InvalidMessageStatus"
        },
        {
            code: 10266,
            name: "HashNotComputed",
            msg: "HashNotComputed"
        },
        {
            code: 10268,
            name: "InvalidVaaVersion",
            msg: "InvalidVaaVersion"
        },
        {
            code: 10270,
            name: "InvalidCreatedAccountSize",
            msg: "InvalidCreatedAccountSize"
        },
        {
            code: 10272,
            name: "DataOverflow",
            msg: "DataOverflow"
        },
        {
            code: 10274,
            name: "ExceedsMaxPayloadSize",
            msg: "ExceedsMaxPayloadSize (30KB)"
        },
        {
            code: 10276,
            name: "CannotParseVaa",
            msg: "CannotParseVaa"
        },
        {
            code: 10278,
            name: "EmitterAuthorityMismatch",
            msg: "EmitterAuthorityMismatch"
        },
        {
            code: 10280,
            name: "InvalidProgramEmitter",
            msg: "InvalidProgramEmitter"
        },
        {
            code: 10282,
            name: "WriteAuthorityMismatch",
            msg: "WriteAuthorityMismatch"
        },
        {
            code: 10284,
            name: "PostedVaaPayloadTooLarge",
            msg: "PostedVaaPayloadTooLarge"
        },
        {
            code: 10286,
            name: "ExecutableDisallowed",
            msg: "ExecutableDisallowed"
        }
    ]
};
}),
"[project]/dashboard/node_modules/.pnpm/@pythnetwork+pyth-solana-receiver@0.7.0_typescript@5.9.3/node_modules/@pythnetwork/pyth-solana-receiver/lib/address.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getConfigPda = exports.getTreasuryPda = exports.getRandomTreasuryId = exports.getGuardianSetPda = exports.DEFAULT_PUSH_ORACLE_PROGRAM_ID = exports.DEFAULT_WORMHOLE_PROGRAM_ID = exports.DEFAULT_RECEIVER_PROGRAM_ID = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
/**
 * The default Pyth Solana Receiver program ID.
 * The program is deployed at this address on all SVM networks.
 */ exports.DEFAULT_RECEIVER_PROGRAM_ID = new web3_js_1.PublicKey("rec5EKMGg6MxZYaMdyBfgwp4d5rB9T1VQH5pJv5LtFJ");
/**
 * The default Wormhole program ID.
 * The program is deployed at this address on all SVM networks.
 */ exports.DEFAULT_WORMHOLE_PROGRAM_ID = new web3_js_1.PublicKey("HDwcJBJXjL9FpJ7UBsYBtaDjsBUhuLCUYoz3zr8SWWaQ");
exports.DEFAULT_PUSH_ORACLE_PROGRAM_ID = new web3_js_1.PublicKey("pythWSnswVUd12oZpeFP8e9CVaEqJg25g1Vtc2biRsT");
/**
 * Returns the address of a guardian set account from the Wormhole program.
 */ const getGuardianSetPda = (guardianSetIndex, wormholeProgramId)=>{
    const guardianSetIndexBuf = Buffer.alloc(4);
    guardianSetIndexBuf.writeUInt32BE(guardianSetIndex, 0);
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from("GuardianSet"),
        guardianSetIndexBuf
    ], wormholeProgramId)[0];
};
exports.getGuardianSetPda = getGuardianSetPda;
/**
 * The Pyth Solana Receiver has one treasury account for each u8 `treasuryId`.
 * This is meant to avoid write-locks on the treasury account by load-balancing the writes across multiple accounts.
 */ function getRandomTreasuryId() {
    return Math.floor(Math.random() * 256);
}
exports.getRandomTreasuryId = getRandomTreasuryId;
/**
 * Returns the address of a treasury account from the Pyth Solana Receiver program.
 */ const getTreasuryPda = (treasuryId, receiverProgramId)=>{
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from("treasury"),
        Buffer.from([
            treasuryId
        ])
    ], receiverProgramId)[0];
};
exports.getTreasuryPda = getTreasuryPda;
/**
 * Returns the address of the config account from the Pyth Solana Receiver program.
 */ const getConfigPda = (receiverProgramId)=>{
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from("config")
    ], receiverProgramId)[0];
};
exports.getConfigPda = getConfigPda;
}),
"[project]/dashboard/node_modules/.pnpm/@pythnetwork+pyth-solana-receiver@0.7.0_typescript@5.9.3/node_modules/@pythnetwork/pyth-solana-receiver/lib/compute_budget.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CLOSE_ENCODED_VAA_COMPUTE_BUDGET = exports.WRITE_ENCODED_VAA_COMPUTE_BUDGET = exports.INIT_ENCODED_VAA_COMPUTE_BUDGET = exports.UPDATE_PRICE_FEED_COMPUTE_BUDGET = exports.POST_UPDATE_COMPUTE_BUDGET = exports.POST_UPDATE_ATOMIC_COMPUTE_BUDGET = exports.VERIFY_ENCODED_VAA_COMPUTE_BUDGET = void 0;
/**
 * A hard-coded budget for the compute units required for the `verifyEncodedVaa` instruction in the Wormhole program.
 */ exports.VERIFY_ENCODED_VAA_COMPUTE_BUDGET = 350000;
/**
 * A hard-coded budget for the compute units required for the `postUpdateAtomic` instruction in the Pyth Solana Receiver program.
 */ exports.POST_UPDATE_ATOMIC_COMPUTE_BUDGET = 170000;
/**
 * A hard-coded budget for the compute units required for the `postUpdate` instruction in the Pyth Solana Receiver program.
 */ exports.POST_UPDATE_COMPUTE_BUDGET = 35000;
/**
 * A hard-coded budget for the compute units required for the `updatePriceFeed` instruction in the Pyth Push Oracle program.
 */ exports.UPDATE_PRICE_FEED_COMPUTE_BUDGET = 55000;
/**
 * A hard-coded budget for the compute units required for the `initEncodedVaa` instruction in the Wormhole program.
 */ exports.INIT_ENCODED_VAA_COMPUTE_BUDGET = 3000;
/**
 * A hard-coded budget for the compute units required for the `writeEncodedVaa` instruction in the Wormhole program.
 */ exports.WRITE_ENCODED_VAA_COMPUTE_BUDGET = 3000;
/**
 * A hard-coded budget for the compute units required for the `closeEncodedVaa` instruction in the Wormhole program.
 */ exports.CLOSE_ENCODED_VAA_COMPUTE_BUDGET = 30000;
}),
"[project]/dashboard/node_modules/.pnpm/@pythnetwork+pyth-solana-receiver@0.7.0_typescript@5.9.3/node_modules/@pythnetwork/pyth-solana-receiver/lib/vaa.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findEncodedVaaAccountsByWriteAuthority = exports.buildWriteEncodedVaaWithSplitInstructions = exports.VAA_SPLIT_INDEX = exports.buildEncodedVaaCreateInstruction = exports.VAA_START = exports.trimSignatures = exports.VAA_SIGNATURE_SIZE = exports.DEFAULT_REDUCED_GUARDIAN_SET_SIZE = exports.getGuardianSetIndex = void 0;
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const compute_budget_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@pythnetwork+pyth-solana-receiver@0.7.0_typescript@5.9.3/node_modules/@pythnetwork/pyth-solana-receiver/lib/compute_budget.js [app-route] (ecmascript)");
const sha256_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@noble+hashes@1.8.0/node_modules/@noble/hashes/sha256.js [app-route] (ecmascript)");
const bytes_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/cjs/utils/bytes/index.js [app-route] (ecmascript)");
/**
 * Get the index of the guardian set that signed a VAA
 */ function getGuardianSetIndex(vaa) {
    return vaa.readUInt32BE(1);
}
exports.getGuardianSetIndex = getGuardianSetIndex;
/**
 * The default number of signatures to keep in a VAA when using `trimSignatures`.
 * This number was chosen as the maximum number of signatures so that the VAA's contents can be posted in a single Solana transaction.
 */ exports.DEFAULT_REDUCED_GUARDIAN_SET_SIZE = 5;
/**
 * The size of a guardian signature in a VAA.
 *
 * It is 66 bytes long, the first byte is the guardian index and the next 65 bytes are the signature (including a recovery id).
 */ exports.VAA_SIGNATURE_SIZE = 66;
/**
 * Trim the number of signatures of a VAA.
 *
 * @returns the same VAA as the input, but with `n` signatures instead of the original number of signatures.
 *
 * A Wormhole VAA typically has a number of signatures equal to two thirds of the number of guardians. However,
 * this function is useful to make VAAs smaller to post their contents in a single Solana transaction.
 */ function trimSignatures(vaa, n = exports.DEFAULT_REDUCED_GUARDIAN_SET_SIZE) {
    const currentNumSignatures = vaa[5];
    if (n > currentNumSignatures) {
        throw new Error("Resulting VAA can't have more signatures than the original VAA");
    }
    const trimmedVaa = Buffer.concat([
        vaa.subarray(0, 6 + n * exports.VAA_SIGNATURE_SIZE),
        vaa.subarray(6 + currentNumSignatures * exports.VAA_SIGNATURE_SIZE)
    ]);
    trimmedVaa[5] = n;
    return trimmedVaa;
}
exports.trimSignatures = trimSignatures;
/**
 * The start of the VAA bytes in an encoded VAA account. Before this offset, the account contains a header.
 */ exports.VAA_START = 46;
/**
 * Build an instruction to create an encoded VAA account.
 *
 * This is the first step to post a VAA to the Wormhole program.
 */ async function buildEncodedVaaCreateInstruction(wormhole, vaa, encodedVaaKeypair) {
    const encodedVaaSize = vaa.length + exports.VAA_START;
    return {
        instruction: await wormhole.account.encodedVaa.createInstruction(encodedVaaKeypair, encodedVaaSize),
        signers: [
            encodedVaaKeypair
        ]
    };
}
exports.buildEncodedVaaCreateInstruction = buildEncodedVaaCreateInstruction;
/**
 * Writing the VAA to to an encoded VAA account is done in 2 instructions.
 *
 * The first one writes the first `VAA_SPLIT_INDEX` bytes and the second one writes the rest.
 *
 * This number was chosen as the biggest number such that one can still call `createInstruction`, `initEncodedVaa` and `writeEncodedVaa` in a single Solana transaction.
 * This way, the packing of the instructions to post an encoded vaa is more efficient.
 */ exports.VAA_SPLIT_INDEX = 755;
/**
 * Build a set of instructions to write a VAA to an encoded VAA account
 * This functions returns 2 instructions and splits the VAA in an opinionated way, so that the whole process of posting a VAA can be efficiently packed in the 2 transactions:
 *
 * TX 1 : `createInstruction` + `initEncodedVaa` + `writeEncodedVaa_1`
 *
 * TX 2 : `writeEncodedVaa_2` + `verifyEncodedVaaV1`
 */ async function buildWriteEncodedVaaWithSplitInstructions(wormhole, vaa, draftVaa) {
    return [
        {
            instruction: await wormhole.methods.writeEncodedVaa({
                index: 0,
                data: vaa.subarray(0, exports.VAA_SPLIT_INDEX)
            }).accounts({
                draftVaa
            }).instruction(),
            signers: [],
            computeUnits: compute_budget_1.WRITE_ENCODED_VAA_COMPUTE_BUDGET
        },
        {
            instruction: await wormhole.methods.writeEncodedVaa({
                index: exports.VAA_SPLIT_INDEX,
                data: vaa.subarray(exports.VAA_SPLIT_INDEX)
            }).accounts({
                draftVaa
            }).instruction(),
            signers: [],
            computeUnits: compute_budget_1.WRITE_ENCODED_VAA_COMPUTE_BUDGET
        }
    ];
}
exports.buildWriteEncodedVaaWithSplitInstructions = buildWriteEncodedVaaWithSplitInstructions;
/**
 * Find all the encoded VAA accounts that have a given write authority
 * @returns a list of the public keys of the encoded VAA accounts
 */ async function findEncodedVaaAccountsByWriteAuthority(connection, writeAuthority, wormholeProgramId) {
    const result = await connection.getProgramAccounts(wormholeProgramId, {
        filters: [
            {
                memcmp: {
                    offset: 0,
                    bytes: bytes_1.bs58.encode(Buffer.from((0, sha256_1.sha256)("account:EncodedVaa").slice(0, 8)))
                }
            },
            {
                memcmp: {
                    offset: 8 + 1,
                    bytes: bytes_1.bs58.encode(writeAuthority.toBuffer())
                }
            }
        ]
    });
    return result.map((account)=>new web3_js_1.PublicKey(account.pubkey));
}
exports.findEncodedVaaAccountsByWriteAuthority = findEncodedVaaAccountsByWriteAuthority;
}),
"[project]/dashboard/node_modules/.pnpm/@pythnetwork+pyth-solana-receiver@0.7.0_typescript@5.9.3/node_modules/@pythnetwork/pyth-solana-receiver/lib/idl/pyth_push_oracle.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IDL = void 0;
exports.IDL = {
    version: "0.1.0",
    name: "pyth_push_oracle",
    instructions: [
        {
            name: "updatePriceFeed",
            accounts: [
                {
                    name: "payer",
                    isMut: true,
                    isSigner: true
                },
                {
                    name: "pythSolanaReceiver",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "encodedVaa",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "config",
                    isMut: false,
                    isSigner: false
                },
                {
                    name: "treasury",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "priceFeedAccount",
                    isMut: true,
                    isSigner: false
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: "PostUpdateParams"
                    }
                },
                {
                    name: "shardId",
                    type: "u16"
                },
                {
                    name: "feedId",
                    type: {
                        array: [
                            "u8",
                            32
                        ]
                    }
                }
            ]
        }
    ],
    types: [
        {
            name: "PostUpdateParams",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "merklePriceUpdate",
                        type: {
                            defined: "MerklePriceUpdate"
                        }
                    },
                    {
                        name: "treasuryId",
                        type: "u8"
                    }
                ]
            }
        },
        {
            name: "MerklePriceUpdate",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "message",
                        type: "bytes"
                    },
                    {
                        name: "proof",
                        type: {
                            vec: {
                                array: [
                                    "u8",
                                    20
                                ]
                            }
                        }
                    }
                ]
            }
        }
    ],
    errors: [
        {
            code: 6000,
            name: "UpdatesNotMonotonic",
            msg: "Updates must be monotonically increasing"
        },
        {
            code: 6001,
            name: "PriceFeedMessageMismatch",
            msg: "Trying to update price feed with the wrong feed id"
        }
    ]
};
}),
"[project]/dashboard/node_modules/.pnpm/@pythnetwork+pyth-solana-receiver@0.7.0_typescript@5.9.3/node_modules/@pythnetwork/pyth-solana-receiver/lib/PythSolanaReceiver.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PythSolanaReceiver = exports.PythTransactionBuilder = void 0;
const anchor_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript)");
const pyth_solana_receiver_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@pythnetwork+pyth-solana-receiver@0.7.0_typescript@5.9.3/node_modules/@pythnetwork/pyth-solana-receiver/lib/idl/pyth_solana_receiver.js [app-route] (ecmascript)");
const wormhole_core_bridge_solana_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@pythnetwork+pyth-solana-receiver@0.7.0_typescript@5.9.3/node_modules/@pythnetwork/pyth-solana-receiver/lib/idl/wormhole_core_bridge_solana.js [app-route] (ecmascript)");
const address_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@pythnetwork+pyth-solana-receiver@0.7.0_typescript@5.9.3/node_modules/@pythnetwork/pyth-solana-receiver/lib/address.js [app-route] (ecmascript)");
const web3_js_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
const price_service_sdk_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@pythnetwork+price-service-sdk@1.7.1/node_modules/@pythnetwork/price-service-sdk/lib/index.js [app-route] (ecmascript)");
const compute_budget_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@pythnetwork+pyth-solana-receiver@0.7.0_typescript@5.9.3/node_modules/@pythnetwork/pyth-solana-receiver/lib/compute_budget.js [app-route] (ecmascript)");
const vaa_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@pythnetwork+pyth-solana-receiver@0.7.0_typescript@5.9.3/node_modules/@pythnetwork/pyth-solana-receiver/lib/vaa.js [app-route] (ecmascript)");
const solana_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@pythnetwork+solana-utils@0.6.0_typescript@5.9.3/node_modules/@pythnetwork/solana-utils/dist/cjs/index.cjs [app-route] (ecmascript)");
const pyth_push_oracle_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@pythnetwork+pyth-solana-receiver@0.7.0_typescript@5.9.3/node_modules/@pythnetwork/pyth-solana-receiver/lib/idl/pyth_push_oracle.js [app-route] (ecmascript)");
/**
 * A builder class to build transactions that:
 * - Post price updates (fully or partially verified) or update price feed accounts
 * - Consume price updates in a consumer program
 * - (Optionally) Close price update and encoded vaa accounts to recover the rent (`closeUpdateAccounts` in `PythTransactionBuilderConfig`)
 *
 * This class provides methods for working with both price update accounts and price feed accounts.
 * Price update accounts are ephemeral accounts containing a single price update, whereas price feed accounts are long-lived
 * accounts that always hold price data for a specific feed id. Price feed accounts can be updated to advance the current price.
 * Applications should choose which type of account to work with based on their needs. In general, applications that
 * want the price at a specific time (e.g., to settle a trade) should use price update accounts, while applications that want
 * any recent price should use price feed accounts.
 *
 * @example
 * ```typescript
 *
 * // Get the price feed ids from https://pyth.network/developers/price-feed-ids#pyth-evm-stable
 *  const priceUpdateData = await priceServiceConnection.getLatestVaas([
 *    SOL_PRICE_FEED_ID,
 *    ETH_PRICE_FEED_ID,
 *  ]);
 *
 * const transactionBuilder = pythSolanaReceiver.newTransactionBuilder({});
 * await transactionBuilder.addPostPriceUpdates(priceUpdateData);
 * console.log("The SOL/USD price update will get posted to:", transactionBuilder.getPriceUpdateAccount(SOL_PRICE_FEED_ID).toBase58())
 * await transactionBuilder.addPriceConsumerInstructions(...)
 *
 * await pythSolanaReceiver.provider.sendAll(await transactionBuilder.buildVersionedTransactions({computeUnitPriceMicroLamports:100000}))
 * ```
 */ class PythTransactionBuilder extends solana_utils_1.TransactionBuilder {
    pythSolanaReceiver;
    closeInstructions;
    priceFeedIdToPriceUpdateAccount;
    closeUpdateAccounts;
    constructor(pythSolanaReceiver, config){
        super(pythSolanaReceiver.wallet.publicKey, pythSolanaReceiver.connection);
        this.pythSolanaReceiver = pythSolanaReceiver;
        this.closeInstructions = [];
        this.priceFeedIdToPriceUpdateAccount = {};
        this.closeUpdateAccounts = config.closeUpdateAccounts ?? true;
    }
    /**
     * Add instructions to post price updates to the builder.
     * Use this function to post fully verified price updates from the present or from the past for your program to consume.
     *
     * @param priceUpdateDataArray the output of the `@pythnetwork/price-service-client`'s `PriceServiceConnection.getLatestVaas`. This is an array of verifiable price updates.
     *
     * @example
     * ```typescript
     * // Get the price feed ids from https://pyth.network/developers/price-feed-ids#pyth-evm-stable
     * const priceUpdateData = await priceServiceConnection.getLatestVaas([
     *    SOL_PRICE_FEED_ID,
     *    ETH_PRICE_FEED_ID,
     * ]);
     *
     * const transactionBuilder = pythSolanaReceiver.newTransactionBuilder({});
     * await transactionBuilder.addPostPriceUpdates(priceUpdateData);
     * console.log("The SOL/USD price update will get posted to:", transactionBuilder.getPriceUpdateAccount(SOL_PRICE_FEED_ID).toBase58())
     * await transactionBuilder.addPriceConsumerInstructions(...)
     * ```
     */ async addPostPriceUpdates(priceUpdateDataArray) {
        const { postInstructions, priceFeedIdToPriceUpdateAccount, closeInstructions } = await this.pythSolanaReceiver.buildPostPriceUpdateInstructions(priceUpdateDataArray);
        this.closeInstructions.push(...closeInstructions);
        Object.assign(this.priceFeedIdToPriceUpdateAccount, priceFeedIdToPriceUpdateAccount);
        this.addInstructions(postInstructions);
    }
    /**
     * Add instructions to post partially verified price updates to the builder.
     * Use this function to post partially verified price updates from the present or from the past for your program to consume.
     *
     * @param priceUpdateDataArray the output of the `@pythnetwork/price-service-client`'s `PriceServiceConnection.getLatestVaas`. This is an array of verifiable price updates.
     *
     * Partially verified price updates are price updates where not all the guardian signatures have been verified. By default this methods checks `DEFAULT_REDUCED_GUARDIAN_SET_SIZE` signatures when posting the VAA.
     * If you are a on-chain program developer, make sure you understand the risks of consuming partially verified price updates here: {@link https://github.com/pyth-network/pyth-crosschain/blob/main/target_chains/solana/pyth_solana_receiver_sdk/src/price_update.rs}.
     *
     * @example
     * ```typescript
     * // Get the price feed ids from https://pyth.network/developers/price-feed-ids#pyth-evm-stable
     * const priceUpdateData = await priceServiceConnection.getLatestVaas([
     *    SOL_PRICE_FEED_ID,
     *    ETH_PRICE_FEED_ID,
     * ]);
     *
     * const transactionBuilder = pythSolanaReceiver.newTransactionBuilder({});
     * await transactionBuilder.addPostPartiallyVerifiedPriceUpdates(priceUpdateData);
     * console.log("The SOL/USD price update will get posted to:", transactionBuilder.getPriceUpdateAccount(SOL_PRICE_FEED_ID).toBase58())
     * await transactionBuilder.addPriceConsumerInstructions(...)
     * ...
     * ```
     */ async addPostPartiallyVerifiedPriceUpdates(priceUpdateDataArray) {
        const { postInstructions, priceFeedIdToPriceUpdateAccount, closeInstructions } = await this.pythSolanaReceiver.buildPostPriceUpdateAtomicInstructions(priceUpdateDataArray);
        this.closeInstructions.push(...closeInstructions);
        Object.assign(this.priceFeedIdToPriceUpdateAccount, priceFeedIdToPriceUpdateAccount);
        this.addInstructions(postInstructions);
    }
    /**
     * Add instructions to update price feed accounts to the builder.
     * Price feed accounts are fixed accounts per price feed id that can only be updated with a more recent price.
     *
     * @param priceUpdateDataArray the output of the `@pythnetwork/price-service-client`'s `PriceServiceConnection.getLatestVaas`. This is an array of verifiable price updates.
     * @param shardId the shard ID of the set of price feed accounts. This shard ID allows for multiple price feed accounts for the same price feed id to exist.
     *
     * @example
     * ```typescript
     * // Get the price feed ids from https://pyth.network/developers/price-feed-ids#pyth-evm-stable
     * const priceUpdateData = await priceServiceConnection.getLatestVaas([
     *    SOL_PRICE_FEED_ID,
     *    ETH_PRICE_FEED_ID,
     * ]);
     *
     * const transactionBuilder = pythSolanaReceiver.newTransactionBuilder({});
     * await transactionBuilder.addUpdatePriceFeed(priceUpdateData);
     * await transactionBuilder.addPriceConsumerInstructions(...)
     * ...
     * ```
     */ async addUpdatePriceFeed(priceUpdateDataArray, shardId) {
        const { postInstructions, priceFeedIdToPriceUpdateAccount, closeInstructions } = await this.pythSolanaReceiver.buildUpdatePriceFeedInstructions(priceUpdateDataArray, shardId);
        this.closeInstructions.push(...closeInstructions);
        Object.assign(this.priceFeedIdToPriceUpdateAccount, priceFeedIdToPriceUpdateAccount);
        this.addInstructions(postInstructions);
    }
    /**
     * Add instructions that consume price updates to the builder.
     *
     * @param getInstructions a function that given a mapping of price feed IDs to price update accounts, generates a series of instructions. Price updates get posted to ephemeral accounts and this function allows the user to indicate which accounts in their instruction need to be "replaced" with each price update account.
     * If multiple price updates for the same price feed ID are posted with the same builder, the account corresponding to the last update to get posted will be used.
     *
     * @example
     * ```typescript
     * ...
     * await transactionBuilder.addPostPriceUpdates(priceUpdateData);
     * await transactionBuilder.addPriceConsumerInstructions(
     *   async (
     *     getPriceUpdateAccount: ( priceFeedId: string) => PublicKey
     *   ): Promise<InstructionWithEphemeralSigners[]> => {
     *     return [
     *       {
     *         instruction: await myFirstPythApp.methods
     *           .consume()
     *           .accounts({
     *              solPriceUpdate: getPriceUpdateAccount(SOL_PRICE_FEED_ID),
     *              ethPriceUpdate: getPriceUpdateAccount(ETH_PRICE_FEED_ID),
     *           })
     *           .instruction(),
     *         signers: [],
     *       },
     *     ];
     *   }
     * );
     * ```
     */ async addPriceConsumerInstructions(getInstructions) {
        this.addInstructions(await getInstructions(this.getPriceUpdateAccount.bind(this)));
    }
    /** Add instructions to close encoded VAA accounts from previous actions.
     * If you have previously used the PythTransactionBuilder with closeUpdateAccounts set to false or if you posted encoded VAAs but the transaction to close them did not land on-chain, your wallet might own many encoded VAA accounts.
     * The rent cost for these accounts is 0.008 SOL per encoded VAA account. You can recover this rent calling this function when building a set of transactions.
     */ async addClosePreviousEncodedVaasInstructions(maxInstructions = 40) {
        this.addInstructions(await this.pythSolanaReceiver.buildClosePreviousEncodedVaasInstructions(maxInstructions));
    }
    /**
     * Returns all the added instructions batched into versioned transactions, plus for each transaction the ephemeral signers that need to sign it
     */ async buildVersionedTransactions(args) {
        if (this.closeUpdateAccounts) {
            this.addInstructions(this.closeInstructions);
        }
        return super.buildVersionedTransactions(args);
    }
    /**
     * Returns all the added instructions batched into transactions, plus for each transaction the ephemeral signers that need to sign it
     */ buildLegacyTransactions(args) {
        if (this.closeUpdateAccounts) {
            this.addInstructions(this.closeInstructions);
        }
        return super.buildLegacyTransactions(args);
    }
    /**
     * This method is used to retrieve the address of the price update account where the price update for a given price feed ID will be posted.
     * If multiple price updates for the same price feed ID will be posted with the same builder, the address of the account corresponding to the last update to get posted will be returned.
     * */ getPriceUpdateAccount(priceFeedId) {
        const priceUpdateAccount = this.priceFeedIdToPriceUpdateAccount[priceFeedId];
        if (!priceUpdateAccount) {
            throw new Error(`No price update account found for the price feed ID ${priceFeedId}. Make sure to call addPostPriceUpdates or addPostPartiallyVerifiedPriceUpdates before calling this function.`);
        }
        return priceUpdateAccount;
    }
}
exports.PythTransactionBuilder = PythTransactionBuilder;
/**
 * A class to interact with the Pyth Solana Receiver program.
 *
 * This class provides helpful methods to build instructions to interact with the Pyth Solana Receiver program:
 * - Post price updates (fully or partially verified)
 * - Close price update and encoded vaa accounts to recover rent
 */ class PythSolanaReceiver {
    connection;
    wallet;
    provider;
    receiver;
    wormhole;
    pushOracle;
    constructor({ connection, wallet, wormholeProgramId = address_1.DEFAULT_WORMHOLE_PROGRAM_ID, receiverProgramId = address_1.DEFAULT_RECEIVER_PROGRAM_ID, pushOracleProgramId = address_1.DEFAULT_PUSH_ORACLE_PROGRAM_ID }){
        this.connection = connection;
        this.wallet = wallet;
        this.provider = new anchor_1.AnchorProvider(this.connection, this.wallet, {
            commitment: connection.commitment
        });
        this.receiver = new anchor_1.Program(pyth_solana_receiver_1.IDL, receiverProgramId, this.provider);
        this.wormhole = new anchor_1.Program(wormhole_core_bridge_solana_1.IDL, wormholeProgramId, this.provider);
        this.pushOracle = new anchor_1.Program(pyth_push_oracle_1.IDL, pushOracleProgramId, this.provider);
    }
    /**
     * Get a new transaction builder to build transactions that interact with the Pyth Solana Receiver program and consume price updates
     */ newTransactionBuilder(config) {
        return new PythTransactionBuilder(this, config);
    }
    /**
     * Build a series of helper instructions that post price updates to the Pyth Solana Receiver program and another series to close the price update accounts.
     *
     * This function uses partially verified price updates. Partially verified price updates are price updates where not all the guardian signatures have been verified. By default this methods checks `DEFAULT_REDUCED_GUARDIAN_SET_SIZE` signatures when posting the VAA.
     * If you are a on-chain program developer, make sure you understand the risks of consuming partially verified price updates here: {@link https://github.com/pyth-network/pyth-crosschain/blob/main/target_chains/solana/pyth_solana_receiver_sdk/src/price_update.rs}.
     *
     * @param priceUpdateDataArray the output of the `@pythnetwork/price-service-client`'s `PriceServiceConnection.getLatestVaas`. This is an array of verifiable price updates.
     * @returns `postInstructions`: the instructions to post the price updates, these should be called before consuming the price updates
     * @returns `priceFeedIdToPriceUpdateAccount`: this is a map of price feed IDs to Solana address. Given a price feed ID, you can use this map to find the account where `postInstructions` will post the price update.
     * @returns `closeInstructions`: the instructions to close the price update accounts, these should be called after consuming the price updates
     */ async buildPostPriceUpdateAtomicInstructions(priceUpdateDataArray) {
        const postInstructions = [];
        const priceFeedIdToPriceUpdateAccount = {};
        const closeInstructions = [];
        const treasuryId = (0, address_1.getRandomTreasuryId)();
        for (const priceUpdateData of priceUpdateDataArray){
            const accumulatorUpdateData = (0, price_service_sdk_1.parseAccumulatorUpdateData)(Buffer.from(priceUpdateData, "base64"));
            const guardianSetIndex = (0, vaa_1.getGuardianSetIndex)(accumulatorUpdateData.vaa);
            const trimmedVaa = (0, vaa_1.trimSignatures)(accumulatorUpdateData.vaa);
            for (const update of accumulatorUpdateData.updates){
                const priceUpdateKeypair = new web3_js_1.Keypair();
                postInstructions.push({
                    instruction: await this.receiver.methods.postUpdateAtomic({
                        vaa: trimmedVaa,
                        merklePriceUpdate: update,
                        treasuryId
                    }).accounts({
                        priceUpdateAccount: priceUpdateKeypair.publicKey,
                        treasury: (0, address_1.getTreasuryPda)(treasuryId, this.receiver.programId),
                        config: (0, address_1.getConfigPda)(this.receiver.programId),
                        guardianSet: (0, address_1.getGuardianSetPda)(guardianSetIndex, this.wormhole.programId)
                    }).instruction(),
                    signers: [
                        priceUpdateKeypair
                    ],
                    computeUnits: compute_budget_1.POST_UPDATE_ATOMIC_COMPUTE_BUDGET
                });
                priceFeedIdToPriceUpdateAccount["0x" + (0, price_service_sdk_1.parsePriceFeedMessage)(update.message).feedId.toString("hex")] = priceUpdateKeypair.publicKey;
                closeInstructions.push(await this.buildClosePriceUpdateInstruction(priceUpdateKeypair.publicKey));
            }
        }
        return {
            postInstructions,
            priceFeedIdToPriceUpdateAccount,
            closeInstructions
        };
    }
    /**
     * Build a series of helper instructions that post a VAA in an encoded VAA account. This function is bespoke for posting Pyth VAAs and might not work for other usecases.
     *
     * @param vaa a Wormhole VAA
     * @returns `postInstructions`: the instructions to post the VAA
     * @returns `encodedVaaAddress`: the address of the encoded VAA account where the VAA will be posted
     * @returns `closeInstructions`: the instructions to close the encoded VAA account
     */ async buildPostEncodedVaaInstructions(vaa) {
        const postInstructions = [];
        const closeInstructions = [];
        const encodedVaaKeypair = new web3_js_1.Keypair();
        const guardianSetIndex = (0, vaa_1.getGuardianSetIndex)(vaa);
        postInstructions.push(await (0, vaa_1.buildEncodedVaaCreateInstruction)(this.wormhole, vaa, encodedVaaKeypair));
        postInstructions.push({
            instruction: await this.wormhole.methods.initEncodedVaa().accounts({
                encodedVaa: encodedVaaKeypair.publicKey
            }).instruction(),
            signers: [],
            computeUnits: compute_budget_1.INIT_ENCODED_VAA_COMPUTE_BUDGET
        });
        postInstructions.push(...await (0, vaa_1.buildWriteEncodedVaaWithSplitInstructions)(this.wormhole, vaa, encodedVaaKeypair.publicKey));
        postInstructions.push({
            instruction: await this.wormhole.methods.verifyEncodedVaaV1().accounts({
                guardianSet: (0, address_1.getGuardianSetPda)(guardianSetIndex, this.wormhole.programId),
                draftVaa: encodedVaaKeypair.publicKey
            }).instruction(),
            signers: [],
            computeUnits: compute_budget_1.VERIFY_ENCODED_VAA_COMPUTE_BUDGET
        });
        closeInstructions.push(await this.buildCloseEncodedVaaInstruction(encodedVaaKeypair.publicKey));
        return {
            postInstructions,
            encodedVaaAddress: encodedVaaKeypair.publicKey,
            closeInstructions
        };
    }
    /**
     * Build a series of helper instructions that post price updates to the Pyth Solana Receiver program and another series to close the encoded vaa accounts and the price update accounts.
     *
     * @param priceUpdateDataArray the output of the `@pythnetwork/price-service-client`'s `PriceServiceConnection.getLatestVaas`. This is an array of verifiable price updates.
     * @returns `postInstructions`: the instructions to post the price updates, these should be called before consuming the price updates
     * @returns `priceFeedIdToPriceUpdateAccount`: this is a map of price feed IDs to Solana address. Given a price feed ID, you can use this map to find the account where `postInstructions` will post the price update.
     * @returns `closeInstructions`: the instructions to close the price update accounts, these should be called after consuming the price updates
     */ async buildPostPriceUpdateInstructions(priceUpdateDataArray) {
        const postInstructions = [];
        const priceFeedIdToPriceUpdateAccount = {};
        const closeInstructions = [];
        const treasuryId = (0, address_1.getRandomTreasuryId)();
        for (const priceUpdateData of priceUpdateDataArray){
            const accumulatorUpdateData = (0, price_service_sdk_1.parseAccumulatorUpdateData)(Buffer.from(priceUpdateData, "base64"));
            const { postInstructions: postEncodedVaaInstructions, encodedVaaAddress: encodedVaa, closeInstructions: postEncodedVaacloseInstructions } = await this.buildPostEncodedVaaInstructions(accumulatorUpdateData.vaa);
            postInstructions.push(...postEncodedVaaInstructions);
            closeInstructions.push(...postEncodedVaacloseInstructions);
            for (const update of accumulatorUpdateData.updates){
                const priceUpdateKeypair = new web3_js_1.Keypair();
                postInstructions.push({
                    instruction: await this.receiver.methods.postUpdate({
                        merklePriceUpdate: update,
                        treasuryId
                    }).accounts({
                        encodedVaa,
                        priceUpdateAccount: priceUpdateKeypair.publicKey,
                        treasury: (0, address_1.getTreasuryPda)(treasuryId, this.receiver.programId),
                        config: (0, address_1.getConfigPda)(this.receiver.programId)
                    }).instruction(),
                    signers: [
                        priceUpdateKeypair
                    ],
                    computeUnits: compute_budget_1.POST_UPDATE_COMPUTE_BUDGET
                });
                priceFeedIdToPriceUpdateAccount["0x" + (0, price_service_sdk_1.parsePriceFeedMessage)(update.message).feedId.toString("hex")] = priceUpdateKeypair.publicKey;
                closeInstructions.push(await this.buildClosePriceUpdateInstruction(priceUpdateKeypair.publicKey));
            }
        }
        return {
            postInstructions,
            priceFeedIdToPriceUpdateAccount,
            closeInstructions
        };
    }
    /**
     * Build a series of helper instructions that update one or many price feed accounts and another series to close the encoded vaa accounts used to update the price feed accounts.
     *
     * @param priceUpdateDataArray the output of the `@pythnetwork/price-service-client`'s `PriceServiceConnection.getLatestVaas`. This is an array of verifiable price updates.
     * @param shardId the shard ID of the set of price feed accounts. This shard ID allows for multiple price feed accounts for the same price feed id to exist.
     * @returns `postInstructions`: the instructions to update the price feed accounts. If the price feed accounts don't contain a recent update, these should be called before consuming the price updates.
     * @returns `priceFeedIdToPriceUpdateAccount`: this is a map of price feed IDs to Solana address. Given a price feed ID, you can use this map to find the account where `postInstructions` will post the price update. Note that since price feed accounts are PDAs, the address of the account can also be found with `getPriceFeedAccountAddress`.
     * @returns `closeInstructions`: the instructions to close the encoded VAA accounts that were used to update the price feed accounts.
     */ async buildUpdatePriceFeedInstructions(priceUpdateDataArray, shardId) {
        const postInstructions = [];
        const priceFeedIdToPriceUpdateAccount = {};
        const closeInstructions = [];
        const treasuryId = (0, address_1.getRandomTreasuryId)();
        for (const priceUpdateData of priceUpdateDataArray){
            const accumulatorUpdateData = (0, price_service_sdk_1.parseAccumulatorUpdateData)(Buffer.from(priceUpdateData, "base64"));
            const { postInstructions: postEncodedVaaInstructions, encodedVaaAddress: encodedVaa, closeInstructions: postEncodedVaacloseInstructions } = await this.buildPostEncodedVaaInstructions(accumulatorUpdateData.vaa);
            postInstructions.push(...postEncodedVaaInstructions);
            closeInstructions.push(...postEncodedVaacloseInstructions);
            for (const update of accumulatorUpdateData.updates){
                const feedId = (0, price_service_sdk_1.parsePriceFeedMessage)(update.message).feedId;
                postInstructions.push({
                    instruction: await this.pushOracle.methods.updatePriceFeed({
                        merklePriceUpdate: update,
                        treasuryId
                    }, shardId, Array.from(feedId)).accounts({
                        pythSolanaReceiver: this.receiver.programId,
                        encodedVaa,
                        priceFeedAccount: this.getPriceFeedAccountAddress(shardId, feedId),
                        treasury: (0, address_1.getTreasuryPda)(treasuryId, this.receiver.programId),
                        config: (0, address_1.getConfigPda)(this.receiver.programId)
                    }).instruction(),
                    signers: [],
                    computeUnits: compute_budget_1.UPDATE_PRICE_FEED_COMPUTE_BUDGET
                });
                priceFeedIdToPriceUpdateAccount["0x" + (0, price_service_sdk_1.parsePriceFeedMessage)(update.message).feedId.toString("hex")] = this.getPriceFeedAccountAddress(shardId, feedId);
            }
        }
        return {
            postInstructions,
            priceFeedIdToPriceUpdateAccount,
            closeInstructions
        };
    }
    /**
     * Build an instruction to close an encoded VAA account, recovering the rent.
     */ async buildCloseEncodedVaaInstruction(encodedVaa) {
        const instruction = await this.wormhole.methods.closeEncodedVaa().accounts({
            encodedVaa
        }).instruction();
        return {
            instruction,
            signers: [],
            computeUnits: compute_budget_1.CLOSE_ENCODED_VAA_COMPUTE_BUDGET
        };
    }
    /**
     * Build aset of instructions to close all the existing encoded VAA accounts owned by this PythSolanaReceiver's wallet
     */ async buildClosePreviousEncodedVaasInstructions(maxInstructions) {
        const encodedVaas = await this.findOwnedEncodedVaaAccounts();
        const instructions = [];
        for (const encodedVaa of encodedVaas){
            instructions.push(await this.buildCloseEncodedVaaInstruction(encodedVaa));
        }
        return instructions.slice(0, maxInstructions);
    }
    /**
     * Build an instruction to close a price update account, recovering the rent.
     */ async buildClosePriceUpdateInstruction(priceUpdateAccount) {
        const instruction = await this.receiver.methods.reclaimRent().accounts({
            priceUpdateAccount
        }).instruction();
        return {
            instruction,
            signers: []
        };
    }
    /**
     * Returns a set of versioned transactions that contain the provided instructions in the same order and with efficient batching
     */ async batchIntoVersionedTransactions(instructions, priorityFeeConfig) {
        return solana_utils_1.TransactionBuilder.batchIntoVersionedTransactions(this.wallet.publicKey, this.connection, instructions, priorityFeeConfig);
    }
    /**
     * Fetch the contents of a price update account
     * @param priceUpdateAccount The address of the price update account
     * @returns The contents of the deserialized price update account or `null` if the account doesn't exist
     */ async fetchPriceUpdateAccount(priceUpdateAccount) {
        return this.receiver.account.priceUpdateV2.fetchNullable(priceUpdateAccount);
    }
    /**
     * Fetch the contents of a price feed account
     * @param shardId The shard ID of the set of price feed accounts. This shard ID allows for multiple price feed accounts for the same price feed id to exist.
     * @param priceFeedId The price feed ID, as either a 32-byte buffer or hexadecimal string with or without a leading "0x" prefix.
     * @returns The contents of the deserialized price feed account or `null` if the account doesn't exist
     */ async fetchPriceFeedAccount(shardId, priceFeedId) {
        return this.receiver.account.priceUpdateV2.fetchNullable(this.getPriceFeedAccountAddress(shardId, priceFeedId));
    }
    /**
     * Derive the address of a price feed account
     * @param shardId The shard ID of the set of price feed accounts. This shard ID allows for multiple price feed accounts for the same price feed id to exist.
     * @param priceFeedId The price feed ID, as either a 32-byte buffer or hexadecimal string with or without a leading "0x" prefix.
     * @returns The address of the price feed account
     */ getPriceFeedAccountAddress(shardId, priceFeedId) {
        return getPriceFeedAccountForProgram(shardId, priceFeedId, this.pushOracle.programId);
    }
    /**
     * Find all the encoded VAA accounts owned by this PythSolanaReceiver's wallet
     * @returns a list of the public keys of the encoded VAA accounts
     */ async findOwnedEncodedVaaAccounts() {
        return await (0, vaa_1.findEncodedVaaAccountsByWriteAuthority)(this.receiver.provider.connection, this.wallet.publicKey, this.wormhole.programId);
    }
}
exports.PythSolanaReceiver = PythSolanaReceiver;
/**
 * Derive the address of a price feed account
 * @param shardId The shard ID of the set of price feed accounts. This shard ID allows for multiple price feed accounts for the same price feed id to exist.
 * @param priceFeedId The price feed ID, as either a 32-byte buffer or hexadecimal string with or without a leading "0x" prefix.
 * @param pushOracleProgramId The program ID of the Pyth Push Oracle program. If not provided, the default deployment will be used.
 * @returns The address of the price feed account
 */ function getPriceFeedAccountForProgram(shardId, priceFeedId, pushOracleProgramId) {
    if (typeof priceFeedId == "string") {
        if (priceFeedId.startsWith("0x")) {
            priceFeedId = Buffer.from(priceFeedId.slice(2), "hex");
        } else {
            priceFeedId = Buffer.from(priceFeedId, "hex");
        }
    }
    if (priceFeedId.length != 32) {
        throw new Error("Feed ID should be 32 bytes long");
    }
    const shardBuffer = Buffer.alloc(2);
    shardBuffer.writeUint16LE(shardId, 0);
    return web3_js_1.PublicKey.findProgramAddressSync([
        shardBuffer,
        priceFeedId
    ], pushOracleProgramId ?? address_1.DEFAULT_PUSH_ORACLE_PROGRAM_ID)[0];
}
}),
"[project]/dashboard/node_modules/.pnpm/@pythnetwork+pyth-solana-receiver@0.7.0_typescript@5.9.3/node_modules/@pythnetwork/pyth-solana-receiver/lib/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.wormholeCoreBridgeIdl = exports.pythSolanaReceiverIdl = exports.DEFAULT_WORMHOLE_PROGRAM_ID = exports.DEFAULT_RECEIVER_PROGRAM_ID = exports.getConfigPda = exports.TransactionBuilder = exports.PythTransactionBuilder = exports.PythSolanaReceiver = void 0;
var PythSolanaReceiver_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@pythnetwork+pyth-solana-receiver@0.7.0_typescript@5.9.3/node_modules/@pythnetwork/pyth-solana-receiver/lib/PythSolanaReceiver.js [app-route] (ecmascript)");
Object.defineProperty(exports, "PythSolanaReceiver", {
    enumerable: true,
    get: function() {
        return PythSolanaReceiver_1.PythSolanaReceiver;
    }
});
Object.defineProperty(exports, "PythTransactionBuilder", {
    enumerable: true,
    get: function() {
        return PythSolanaReceiver_1.PythTransactionBuilder;
    }
});
var solana_utils_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@pythnetwork+solana-utils@0.6.0_typescript@5.9.3/node_modules/@pythnetwork/solana-utils/dist/cjs/index.cjs [app-route] (ecmascript)");
Object.defineProperty(exports, "TransactionBuilder", {
    enumerable: true,
    get: function() {
        return solana_utils_1.TransactionBuilder;
    }
});
var address_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@pythnetwork+pyth-solana-receiver@0.7.0_typescript@5.9.3/node_modules/@pythnetwork/pyth-solana-receiver/lib/address.js [app-route] (ecmascript)");
Object.defineProperty(exports, "getConfigPda", {
    enumerable: true,
    get: function() {
        return address_1.getConfigPda;
    }
});
Object.defineProperty(exports, "DEFAULT_RECEIVER_PROGRAM_ID", {
    enumerable: true,
    get: function() {
        return address_1.DEFAULT_RECEIVER_PROGRAM_ID;
    }
});
Object.defineProperty(exports, "DEFAULT_WORMHOLE_PROGRAM_ID", {
    enumerable: true,
    get: function() {
        return address_1.DEFAULT_WORMHOLE_PROGRAM_ID;
    }
});
var pyth_solana_receiver_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@pythnetwork+pyth-solana-receiver@0.7.0_typescript@5.9.3/node_modules/@pythnetwork/pyth-solana-receiver/lib/idl/pyth_solana_receiver.js [app-route] (ecmascript)");
Object.defineProperty(exports, "pythSolanaReceiverIdl", {
    enumerable: true,
    get: function() {
        return pyth_solana_receiver_1.IDL;
    }
});
var wormhole_core_bridge_solana_1 = __turbopack_context__.r("[project]/dashboard/node_modules/.pnpm/@pythnetwork+pyth-solana-receiver@0.7.0_typescript@5.9.3/node_modules/@pythnetwork/pyth-solana-receiver/lib/idl/wormhole_core_bridge_solana.js [app-route] (ecmascript)");
Object.defineProperty(exports, "wormholeCoreBridgeIdl", {
    enumerable: true,
    get: function() {
        return wormhole_core_bridge_solana_1.IDL;
    }
});
}),
];

//# sourceMappingURL=f10e0_%40pythnetwork_pyth-solana-receiver_lib_185e52d8._.js.map