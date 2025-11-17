module.exports = [
"[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/openbook_v2.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IDL",
    ()=>IDL
]);
const IDL = {
    version: '0.1.0',
    name: 'openbook_v2',
    instructions: [
        {
            name: 'createMarket',
            docs: [
                'Create a [`Market`](crate::state::Market) for a given token pair.'
            ],
            accounts: [
                {
                    name: 'market',
                    isMut: true,
                    isSigner: true
                },
                {
                    name: 'marketAuthority',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'bids',
                    isMut: true,
                    isSigner: false,
                    docs: [
                        'Accounts are initialized by client,',
                        'anchor discriminator is set first when ix exits,'
                    ]
                },
                {
                    name: 'asks',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'eventHeap',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'payer',
                    isMut: true,
                    isSigner: true
                },
                {
                    name: 'marketBaseVault',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'marketQuoteVault',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'baseMint',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'quoteMint',
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
                    name: 'associatedTokenProgram',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'oracleA',
                    isMut: false,
                    isSigner: false,
                    isOptional: true
                },
                {
                    name: 'oracleB',
                    isMut: false,
                    isSigner: false,
                    isOptional: true
                },
                {
                    name: 'collectFeeAdmin',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'openOrdersAdmin',
                    isMut: false,
                    isSigner: false,
                    isOptional: true
                },
                {
                    name: 'consumeEventsAdmin',
                    isMut: false,
                    isSigner: false,
                    isOptional: true
                },
                {
                    name: 'closeMarketAdmin',
                    isMut: false,
                    isSigner: false,
                    isOptional: true
                },
                {
                    name: 'eventAuthority',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'program',
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'name',
                    type: 'string'
                },
                {
                    name: 'oracleConfig',
                    type: {
                        defined: 'OracleConfigParams'
                    }
                },
                {
                    name: 'quoteLotSize',
                    type: 'i64'
                },
                {
                    name: 'baseLotSize',
                    type: 'i64'
                },
                {
                    name: 'makerFee',
                    type: 'i64'
                },
                {
                    name: 'takerFee',
                    type: 'i64'
                },
                {
                    name: 'timeExpiry',
                    type: 'i64'
                }
            ]
        },
        {
            name: 'closeMarket',
            docs: [
                'Close a [`Market`](crate::state::Market) (only',
                '[`close_market_admin`](crate::state::Market::close_market_admin)).'
            ],
            accounts: [
                {
                    name: 'closeMarketAdmin',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'market',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'bids',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'asks',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'eventHeap',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'solDestination',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false
                }
            ],
            args: []
        },
        {
            name: 'createOpenOrdersIndexer',
            docs: [
                'Create an [`OpenOrdersIndexer`](crate::state::OpenOrdersIndexer) account.'
            ],
            accounts: [
                {
                    name: 'payer',
                    isMut: true,
                    isSigner: true
                },
                {
                    name: 'owner',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'openOrdersIndexer',
                    isMut: true,
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
            name: 'closeOpenOrdersIndexer',
            docs: [
                'Close an [`OpenOrdersIndexer`](crate::state::OpenOrdersIndexer) account.'
            ],
            accounts: [
                {
                    name: 'owner',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'openOrdersIndexer',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'solDestination',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false
                }
            ],
            args: []
        },
        {
            name: 'createOpenOrdersAccount',
            docs: [
                'Create an [`OpenOrdersAccount`](crate::state::OpenOrdersAccount).'
            ],
            accounts: [
                {
                    name: 'payer',
                    isMut: true,
                    isSigner: true
                },
                {
                    name: 'owner',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'delegateAccount',
                    isMut: false,
                    isSigner: false,
                    isOptional: true
                },
                {
                    name: 'openOrdersIndexer',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'openOrdersAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'market',
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
                    name: 'name',
                    type: 'string'
                }
            ]
        },
        {
            name: 'closeOpenOrdersAccount',
            docs: [
                'Close an [`OpenOrdersAccount`](crate::state::OpenOrdersAccount).'
            ],
            accounts: [
                {
                    name: 'owner',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'openOrdersIndexer',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'openOrdersAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'solDestination',
                    isMut: true,
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
            name: 'placeOrder',
            docs: [
                'Place an order.',
                '',
                'Different types of orders have different effects on the order book,',
                'as described in [`PlaceOrderType`](crate::state::PlaceOrderType).',
                '',
                '`price_lots` refers to the price in lots: the number of quote lots',
                'per base lot. It is ignored for `PlaceOrderType::Market` orders.',
                '',
                '`expiry_timestamp` is a unix timestamp for when this order should',
                'expire. If 0 is passed in, the order will never expire. If the time',
                'is in the past, the instruction is skipped. Timestamps in the future',
                'are reduced to now + 65,535s.',
                '',
                '`limit` determines the maximum number of orders from the book to fill,',
                'and can be used to limit CU spent. When the limit is reached, processing',
                'stops and the instruction succeeds.'
            ],
            accounts: [
                {
                    name: 'signer',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'openOrdersAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'openOrdersAdmin',
                    isMut: false,
                    isSigner: true,
                    isOptional: true
                },
                {
                    name: 'userTokenAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'market',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'bids',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'asks',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'eventHeap',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'marketVault',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'oracleA',
                    isMut: false,
                    isSigner: false,
                    isOptional: true
                },
                {
                    name: 'oracleB',
                    isMut: false,
                    isSigner: false,
                    isOptional: true
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'args',
                    type: {
                        defined: 'PlaceOrderArgs'
                    }
                }
            ],
            returns: {
                option: 'u128'
            }
        },
        {
            name: 'editOrder',
            docs: [
                'Edit an order.'
            ],
            accounts: [
                {
                    name: 'signer',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'openOrdersAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'openOrdersAdmin',
                    isMut: false,
                    isSigner: true,
                    isOptional: true
                },
                {
                    name: 'userTokenAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'market',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'bids',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'asks',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'eventHeap',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'marketVault',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'oracleA',
                    isMut: false,
                    isSigner: false,
                    isOptional: true
                },
                {
                    name: 'oracleB',
                    isMut: false,
                    isSigner: false,
                    isOptional: true
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'clientOrderId',
                    type: 'u64'
                },
                {
                    name: 'expectedCancelSize',
                    type: 'i64'
                },
                {
                    name: 'placeOrder',
                    type: {
                        defined: 'PlaceOrderArgs'
                    }
                }
            ],
            returns: {
                option: 'u128'
            }
        },
        {
            name: 'editOrderPegged',
            docs: [
                'Edit an order pegged.'
            ],
            accounts: [
                {
                    name: 'signer',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'openOrdersAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'openOrdersAdmin',
                    isMut: false,
                    isSigner: true,
                    isOptional: true
                },
                {
                    name: 'userTokenAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'market',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'bids',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'asks',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'eventHeap',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'marketVault',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'oracleA',
                    isMut: false,
                    isSigner: false,
                    isOptional: true
                },
                {
                    name: 'oracleB',
                    isMut: false,
                    isSigner: false,
                    isOptional: true
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'clientOrderId',
                    type: 'u64'
                },
                {
                    name: 'expectedCancelSize',
                    type: 'i64'
                },
                {
                    name: 'placeOrder',
                    type: {
                        defined: 'PlaceOrderPeggedArgs'
                    }
                }
            ],
            returns: {
                option: 'u128'
            }
        },
        {
            name: 'placeOrders',
            docs: [
                'Place multiple orders'
            ],
            accounts: [
                {
                    name: 'signer',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'openOrdersAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'openOrdersAdmin',
                    isMut: false,
                    isSigner: true,
                    isOptional: true
                },
                {
                    name: 'userQuoteAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'userBaseAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'market',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'bids',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'asks',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'eventHeap',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'marketQuoteVault',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'marketBaseVault',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'oracleA',
                    isMut: false,
                    isSigner: false,
                    isOptional: true
                },
                {
                    name: 'oracleB',
                    isMut: false,
                    isSigner: false,
                    isOptional: true
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'ordersType',
                    type: {
                        defined: 'PlaceOrderType'
                    }
                },
                {
                    name: 'bids',
                    type: {
                        vec: {
                            defined: 'PlaceMultipleOrdersArgs'
                        }
                    }
                },
                {
                    name: 'asks',
                    type: {
                        vec: {
                            defined: 'PlaceMultipleOrdersArgs'
                        }
                    }
                },
                {
                    name: 'limit',
                    type: 'u8'
                }
            ],
            returns: {
                vec: {
                    option: 'u128'
                }
            }
        },
        {
            name: 'cancelAllAndPlaceOrders',
            docs: [
                'Cancel orders and place multiple orders.'
            ],
            accounts: [
                {
                    name: 'signer',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'openOrdersAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'openOrdersAdmin',
                    isMut: false,
                    isSigner: true,
                    isOptional: true
                },
                {
                    name: 'userQuoteAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'userBaseAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'market',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'bids',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'asks',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'eventHeap',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'marketQuoteVault',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'marketBaseVault',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'oracleA',
                    isMut: false,
                    isSigner: false,
                    isOptional: true
                },
                {
                    name: 'oracleB',
                    isMut: false,
                    isSigner: false,
                    isOptional: true
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'ordersType',
                    type: {
                        defined: 'PlaceOrderType'
                    }
                },
                {
                    name: 'bids',
                    type: {
                        vec: {
                            defined: 'PlaceMultipleOrdersArgs'
                        }
                    }
                },
                {
                    name: 'asks',
                    type: {
                        vec: {
                            defined: 'PlaceMultipleOrdersArgs'
                        }
                    }
                },
                {
                    name: 'limit',
                    type: 'u8'
                }
            ],
            returns: {
                vec: {
                    option: 'u128'
                }
            }
        },
        {
            name: 'placeOrderPegged',
            docs: [
                'Place an oracle-peg order.'
            ],
            accounts: [
                {
                    name: 'signer',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'openOrdersAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'openOrdersAdmin',
                    isMut: false,
                    isSigner: true,
                    isOptional: true
                },
                {
                    name: 'userTokenAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'market',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'bids',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'asks',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'eventHeap',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'marketVault',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'oracleA',
                    isMut: false,
                    isSigner: false,
                    isOptional: true
                },
                {
                    name: 'oracleB',
                    isMut: false,
                    isSigner: false,
                    isOptional: true
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'args',
                    type: {
                        defined: 'PlaceOrderPeggedArgs'
                    }
                }
            ],
            returns: {
                option: 'u128'
            }
        },
        {
            name: 'placeTakeOrder',
            docs: [
                'Place an order that shall take existing liquidity off of the book, not',
                'add a new order off the book.',
                '',
                'This type of order allows for instant token settlement for the taker.'
            ],
            accounts: [
                {
                    name: 'signer',
                    isMut: true,
                    isSigner: true
                },
                {
                    name: 'penaltyPayer',
                    isMut: true,
                    isSigner: true
                },
                {
                    name: 'market',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'marketAuthority',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'bids',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'asks',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'marketBaseVault',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'marketQuoteVault',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'eventHeap',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'userBaseAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'userQuoteAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'oracleA',
                    isMut: false,
                    isSigner: false,
                    isOptional: true
                },
                {
                    name: 'oracleB',
                    isMut: false,
                    isSigner: false,
                    isOptional: true
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'openOrdersAdmin',
                    isMut: false,
                    isSigner: true,
                    isOptional: true
                }
            ],
            args: [
                {
                    name: 'args',
                    type: {
                        defined: 'PlaceTakeOrderArgs'
                    }
                }
            ]
        },
        {
            name: 'consumeEvents',
            docs: [
                'Process up to `limit` [events](crate::state::AnyEvent).',
                '',
                "When a user places a 'take' order, they do not know beforehand which",
                "market maker will have placed the 'make' order that they get executed",
                "against. This prevents them from passing in a market maker's",
                '[`OpenOrdersAccount`](crate::state::OpenOrdersAccount), which is needed',
                'to credit/debit the relevant tokens to/from the maker. As such, Openbook',
                "uses a 'crank' system, where `place_order` only emits events, and",
                '`consume_events` handles token settlement.',
                '',
                'Currently, there are two types of events: [`FillEvent`](crate::state::FillEvent)s',
                'and [`OutEvent`](crate::state::OutEvent)s.',
                '',
                'A `FillEvent` is emitted when an order is filled, and it is handled by',
                'debiting whatever the taker is selling from the taker and crediting',
                'it to the maker, and debiting whatever the taker is buying from the',
                'maker and crediting it to the taker. Note that *no tokens are moved*,',
                "these are just debits and credits to each party's [`Position`](crate::state::Position).",
                '',
                'An `OutEvent` is emitted when a limit order needs to be removed from',
                'the book during a `place_order` invocation, and it is handled by',
                'crediting whatever the maker would have sold (quote token in a bid,',
                'base token in an ask) back to the maker.'
            ],
            accounts: [
                {
                    name: 'consumeEventsAdmin',
                    isMut: false,
                    isSigner: true,
                    isOptional: true
                },
                {
                    name: 'market',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'eventHeap',
                    isMut: true,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'limit',
                    type: 'u64'
                }
            ]
        },
        {
            name: 'consumeGivenEvents',
            docs: [
                'Process the [events](crate::state::AnyEvent) at the given positions.'
            ],
            accounts: [
                {
                    name: 'consumeEventsAdmin',
                    isMut: false,
                    isSigner: true,
                    isOptional: true
                },
                {
                    name: 'market',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'eventHeap',
                    isMut: true,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'slots',
                    type: {
                        vec: 'u64'
                    }
                }
            ]
        },
        {
            name: 'cancelOrder',
            docs: [
                'Cancel an order by its `order_id`.',
                '',
                "Note that this doesn't emit an [`OutEvent`](crate::state::OutEvent) because a",
                'maker knows that they will be passing in their own [`OpenOrdersAccount`](crate::state::OpenOrdersAccount).'
            ],
            accounts: [
                {
                    name: 'signer',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'openOrdersAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'market',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'bids',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'asks',
                    isMut: true,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'orderId',
                    type: 'u128'
                }
            ]
        },
        {
            name: 'cancelOrderByClientOrderId',
            docs: [
                'Cancel an order by its `client_order_id`.',
                '',
                "Note that this doesn't emit an [`OutEvent`](crate::state::OutEvent) because a",
                'maker knows that they will be passing in their own [`OpenOrdersAccount`](crate::state::OpenOrdersAccount).'
            ],
            accounts: [
                {
                    name: 'signer',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'openOrdersAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'market',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'bids',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'asks',
                    isMut: true,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'clientOrderId',
                    type: 'u64'
                }
            ],
            returns: 'i64'
        },
        {
            name: 'cancelAllOrders',
            docs: [
                'Cancel up to `limit` orders, optionally filtering by side'
            ],
            accounts: [
                {
                    name: 'signer',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'openOrdersAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'market',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'bids',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'asks',
                    isMut: true,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'sideOption',
                    type: {
                        option: {
                            defined: 'Side'
                        }
                    }
                },
                {
                    name: 'limit',
                    type: 'u8'
                }
            ]
        },
        {
            name: 'deposit',
            docs: [
                "Deposit a certain amount of `base` and `quote` lamports into one's",
                '[`Position`](crate::state::Position).',
                '',
                'Makers might wish to `deposit`, rather than have actual tokens moved for',
                'each trade, in order to reduce CUs.'
            ],
            accounts: [
                {
                    name: 'owner',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'userBaseAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'userQuoteAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'openOrdersAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'market',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'marketBaseVault',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'marketQuoteVault',
                    isMut: true,
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
                    name: 'baseAmount',
                    type: 'u64'
                },
                {
                    name: 'quoteAmount',
                    type: 'u64'
                }
            ]
        },
        {
            name: 'refill',
            docs: [
                'Refill a certain amount of `base` and `quote` lamports. The amount being passed is the',
                'total lamports that the [`Position`](crate::state::Position) will have.',
                '',
                'Makers might wish to `refill`, rather than have actual tokens moved for',
                'each trade, in order to reduce CUs.'
            ],
            accounts: [
                {
                    name: 'owner',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'userBaseAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'userQuoteAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'openOrdersAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'market',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'marketBaseVault',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'marketQuoteVault',
                    isMut: true,
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
                    name: 'baseAmount',
                    type: 'u64'
                },
                {
                    name: 'quoteAmount',
                    type: 'u64'
                }
            ]
        },
        {
            name: 'settleFunds',
            docs: [
                'Withdraw any available tokens.'
            ],
            accounts: [
                {
                    name: 'owner',
                    isMut: true,
                    isSigner: true
                },
                {
                    name: 'penaltyPayer',
                    isMut: true,
                    isSigner: true
                },
                {
                    name: 'openOrdersAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'market',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'marketAuthority',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'marketBaseVault',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'marketQuoteVault',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'userBaseAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'userQuoteAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'referrerAccount',
                    isMut: true,
                    isSigner: false,
                    isOptional: true
                },
                {
                    name: 'tokenProgram',
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
            name: 'settleFundsExpired',
            docs: [
                'Withdraw any available tokens when the market is expired (only',
                '[`close_market_admin`](crate::state::Market::close_market_admin)).'
            ],
            accounts: [
                {
                    name: 'closeMarketAdmin',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'owner',
                    isMut: true,
                    isSigner: true
                },
                {
                    name: 'penaltyPayer',
                    isMut: true,
                    isSigner: true
                },
                {
                    name: 'openOrdersAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'market',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'marketAuthority',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'marketBaseVault',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'marketQuoteVault',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'userBaseAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'userQuoteAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'referrerAccount',
                    isMut: true,
                    isSigner: false,
                    isOptional: true
                },
                {
                    name: 'tokenProgram',
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
            name: 'sweepFees',
            docs: [
                "Sweep fees, as a [`Market`](crate::state::Market)'s admin."
            ],
            accounts: [
                {
                    name: 'collectFeeAdmin',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'market',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'marketAuthority',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'marketQuoteVault',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'tokenReceiverAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false
                }
            ],
            args: []
        },
        {
            name: 'setDelegate',
            docs: [
                'Update the [`delegate`](crate::state::OpenOrdersAccount::delegate) of an open orders account.'
            ],
            accounts: [
                {
                    name: 'owner',
                    isMut: true,
                    isSigner: true
                },
                {
                    name: 'openOrdersAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'delegateAccount',
                    isMut: false,
                    isSigner: false,
                    isOptional: true
                }
            ],
            args: []
        },
        {
            name: 'setMarketExpired',
            docs: [
                'Set market to expired before pruning orders and closing the market (only',
                '[`close_market_admin`](crate::state::Market::close_market_admin)).'
            ],
            accounts: [
                {
                    name: 'closeMarketAdmin',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'market',
                    isMut: true,
                    isSigner: false
                }
            ],
            args: []
        },
        {
            name: 'pruneOrders',
            docs: [
                'Remove orders from the book when the market is expired (only',
                '[`close_market_admin`](crate::state::Market::close_market_admin)).'
            ],
            accounts: [
                {
                    name: 'closeMarketAdmin',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'openOrdersAccount',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'market',
                    isMut: false,
                    isSigner: false
                },
                {
                    name: 'bids',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'asks',
                    isMut: true,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'limit',
                    type: 'u8'
                }
            ]
        },
        {
            name: 'stubOracleCreate',
            accounts: [
                {
                    name: 'payer',
                    isMut: true,
                    isSigner: true
                },
                {
                    name: 'owner',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'oracle',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'mint',
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
                    name: 'price',
                    type: 'f64'
                }
            ]
        },
        {
            name: 'stubOracleClose',
            accounts: [
                {
                    name: 'owner',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'oracle',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'solDestination',
                    isMut: true,
                    isSigner: false
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false
                }
            ],
            args: []
        },
        {
            name: 'stubOracleSet',
            accounts: [
                {
                    name: 'owner',
                    isMut: false,
                    isSigner: true
                },
                {
                    name: 'oracle',
                    isMut: true,
                    isSigner: false
                }
            ],
            args: [
                {
                    name: 'price',
                    type: 'f64'
                }
            ]
        }
    ],
    accounts: [
        {
            name: 'market',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'bump',
                        docs: [
                            'PDA bump'
                        ],
                        type: 'u8'
                    },
                    {
                        name: 'baseDecimals',
                        docs: [
                            'Number of decimals used for the base token.',
                            '',
                            "Used to convert the oracle's price into a native/native price."
                        ],
                        type: 'u8'
                    },
                    {
                        name: 'quoteDecimals',
                        type: 'u8'
                    },
                    {
                        name: 'padding1',
                        type: {
                            array: [
                                'u8',
                                5
                            ]
                        }
                    },
                    {
                        name: 'marketAuthority',
                        type: 'publicKey'
                    },
                    {
                        name: 'timeExpiry',
                        docs: [
                            'No expiry = 0. Market will expire and no trading allowed after time_expiry'
                        ],
                        type: 'i64'
                    },
                    {
                        name: 'collectFeeAdmin',
                        docs: [
                            'Admin who can collect fees from the market'
                        ],
                        type: 'publicKey'
                    },
                    {
                        name: 'openOrdersAdmin',
                        docs: [
                            'Admin who must sign off on all order creations'
                        ],
                        type: {
                            defined: 'NonZeroPubkeyOption'
                        }
                    },
                    {
                        name: 'consumeEventsAdmin',
                        docs: [
                            'Admin who must sign off on all event consumptions'
                        ],
                        type: {
                            defined: 'NonZeroPubkeyOption'
                        }
                    },
                    {
                        name: 'closeMarketAdmin',
                        docs: [
                            'Admin who can set market expired, prune orders and close the market'
                        ],
                        type: {
                            defined: 'NonZeroPubkeyOption'
                        }
                    },
                    {
                        name: 'name',
                        docs: [
                            'Name. Trailing zero bytes are ignored.'
                        ],
                        type: {
                            array: [
                                'u8',
                                16
                            ]
                        }
                    },
                    {
                        name: 'bids',
                        docs: [
                            'Address of the BookSide account for bids'
                        ],
                        type: 'publicKey'
                    },
                    {
                        name: 'asks',
                        docs: [
                            'Address of the BookSide account for asks'
                        ],
                        type: 'publicKey'
                    },
                    {
                        name: 'eventHeap',
                        docs: [
                            'Address of the EventHeap account'
                        ],
                        type: 'publicKey'
                    },
                    {
                        name: 'oracleA',
                        docs: [
                            'Oracles account address'
                        ],
                        type: {
                            defined: 'NonZeroPubkeyOption'
                        }
                    },
                    {
                        name: 'oracleB',
                        type: {
                            defined: 'NonZeroPubkeyOption'
                        }
                    },
                    {
                        name: 'oracleConfig',
                        docs: [
                            'Oracle configuration'
                        ],
                        type: {
                            defined: 'OracleConfig'
                        }
                    },
                    {
                        name: 'quoteLotSize',
                        docs: [
                            'Number of quote native in a quote lot. Must be a power of 10.',
                            '',
                            'Primarily useful for increasing the tick size on the market: A lot price',
                            'of 1 becomes a native price of quote_lot_size/base_lot_size becomes a',
                            'ui price of quote_lot_size*base_decimals/base_lot_size/quote_decimals.'
                        ],
                        type: 'i64'
                    },
                    {
                        name: 'baseLotSize',
                        docs: [
                            'Number of base native in a base lot. Must be a power of 10.',
                            '',
                            'Example: If base decimals for the underlying asset is 6, base lot size',
                            'is 100 and and base position lots is 10_000 then base position native is',
                            '1_000_000 and base position ui is 1.'
                        ],
                        type: 'i64'
                    },
                    {
                        name: 'seqNum',
                        docs: [
                            'Total number of orders seen'
                        ],
                        type: 'u64'
                    },
                    {
                        name: 'registrationTime',
                        docs: [
                            'Timestamp in seconds that the market was registered at.'
                        ],
                        type: 'i64'
                    },
                    {
                        name: 'makerFee',
                        docs: [
                            'Fees',
                            '',
                            'Fee (in 10^-6) when matching maker orders.',
                            'maker_fee < 0 it means some of the taker_fees goes to the maker',
                            'maker_fee > 0, it means no taker_fee to the maker, and maker fee goes to the referral'
                        ],
                        type: 'i64'
                    },
                    {
                        name: 'takerFee',
                        docs: [
                            'Fee (in 10^-6) for taker orders, always >= 0.'
                        ],
                        type: 'i64'
                    },
                    {
                        name: 'feesAccrued',
                        docs: [
                            'Total fees accrued in native quote'
                        ],
                        type: 'u128'
                    },
                    {
                        name: 'feesToReferrers',
                        docs: [
                            'Total fees settled in native quote'
                        ],
                        type: 'u128'
                    },
                    {
                        name: 'referrerRebatesAccrued',
                        docs: [
                            'Referrer rebates to be distributed'
                        ],
                        type: 'u64'
                    },
                    {
                        name: 'feesAvailable',
                        docs: [
                            'Fees generated and available to withdraw via sweep_fees'
                        ],
                        type: 'u64'
                    },
                    {
                        name: 'makerVolume',
                        docs: [
                            'Cumulative maker volume (same as taker volume) in quote native units'
                        ],
                        type: 'u128'
                    },
                    {
                        name: 'takerVolumeWoOo',
                        docs: [
                            'Cumulative taker volume in quote native units due to place take orders'
                        ],
                        type: 'u128'
                    },
                    {
                        name: 'baseMint',
                        type: 'publicKey'
                    },
                    {
                        name: 'quoteMint',
                        type: 'publicKey'
                    },
                    {
                        name: 'marketBaseVault',
                        type: 'publicKey'
                    },
                    {
                        name: 'baseDepositTotal',
                        type: 'u64'
                    },
                    {
                        name: 'marketQuoteVault',
                        type: 'publicKey'
                    },
                    {
                        name: 'quoteDepositTotal',
                        type: 'u64'
                    },
                    {
                        name: 'reserved',
                        type: {
                            array: [
                                'u8',
                                128
                            ]
                        }
                    }
                ]
            }
        },
        {
            name: 'openOrdersAccount',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'owner',
                        type: 'publicKey'
                    },
                    {
                        name: 'market',
                        type: 'publicKey'
                    },
                    {
                        name: 'name',
                        type: {
                            array: [
                                'u8',
                                32
                            ]
                        }
                    },
                    {
                        name: 'delegate',
                        type: {
                            defined: 'NonZeroPubkeyOption'
                        }
                    },
                    {
                        name: 'accountNum',
                        type: 'u32'
                    },
                    {
                        name: 'bump',
                        type: 'u8'
                    },
                    {
                        name: 'version',
                        type: 'u8'
                    },
                    {
                        name: 'padding',
                        type: {
                            array: [
                                'u8',
                                2
                            ]
                        }
                    },
                    {
                        name: 'position',
                        type: {
                            defined: 'Position'
                        }
                    },
                    {
                        name: 'openOrders',
                        type: {
                            array: [
                                {
                                    defined: 'OpenOrder'
                                },
                                24
                            ]
                        }
                    }
                ]
            }
        },
        {
            name: 'openOrdersIndexer',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'bump',
                        type: 'u8'
                    },
                    {
                        name: 'createdCounter',
                        type: 'u32'
                    },
                    {
                        name: 'addresses',
                        type: {
                            vec: 'publicKey'
                        }
                    }
                ]
            }
        },
        {
            name: 'stubOracle',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'owner',
                        type: 'publicKey'
                    },
                    {
                        name: 'mint',
                        type: 'publicKey'
                    },
                    {
                        name: 'price',
                        type: 'f64'
                    },
                    {
                        name: 'lastUpdateTs',
                        type: 'i64'
                    },
                    {
                        name: 'lastUpdateSlot',
                        type: 'u64'
                    },
                    {
                        name: 'deviation',
                        type: 'f64'
                    },
                    {
                        name: 'reserved',
                        type: {
                            array: [
                                'u8',
                                104
                            ]
                        }
                    }
                ]
            }
        },
        {
            name: 'bookSide',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'roots',
                        type: {
                            array: [
                                {
                                    defined: 'OrderTreeRoot'
                                },
                                2
                            ]
                        }
                    },
                    {
                        name: 'reservedRoots',
                        type: {
                            array: [
                                {
                                    defined: 'OrderTreeRoot'
                                },
                                4
                            ]
                        }
                    },
                    {
                        name: 'reserved',
                        type: {
                            array: [
                                'u8',
                                256
                            ]
                        }
                    },
                    {
                        name: 'nodes',
                        type: {
                            defined: 'OrderTreeNodes'
                        }
                    }
                ]
            }
        },
        {
            name: 'eventHeap',
            docs: [
                'Container for the different EventTypes.',
                '',
                'Events are stored in a fixed-array of nodes. Free nodes are connected by a single-linked list',
                'starting at free_head while used nodes form a circular doubly-linked list starting at',
                'used_head.'
            ],
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'header',
                        type: {
                            defined: 'EventHeapHeader'
                        }
                    },
                    {
                        name: 'nodes',
                        type: {
                            array: [
                                {
                                    defined: 'EventNode'
                                },
                                600
                            ]
                        }
                    },
                    {
                        name: 'reserved',
                        type: {
                            array: [
                                'u8',
                                64
                            ]
                        }
                    }
                ]
            }
        }
    ],
    types: [
        {
            name: 'NonZeroPubkeyOption',
            docs: [
                'Like `Option`, but implemented for `Pubkey` to be used with `zero_copy`'
            ],
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'key',
                        type: 'publicKey'
                    }
                ]
            }
        },
        {
            name: 'Position',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'bidsBaseLots',
                        docs: [
                            'Base lots in open bids'
                        ],
                        type: 'i64'
                    },
                    {
                        name: 'asksBaseLots',
                        docs: [
                            'Base lots in open asks'
                        ],
                        type: 'i64'
                    },
                    {
                        name: 'baseFreeNative',
                        type: 'u64'
                    },
                    {
                        name: 'quoteFreeNative',
                        type: 'u64'
                    },
                    {
                        name: 'lockedMakerFees',
                        type: 'u64'
                    },
                    {
                        name: 'referrerRebatesAvailable',
                        type: 'u64'
                    },
                    {
                        name: 'penaltyHeapCount',
                        docs: [
                            'Count of ixs when events are added to the heap',
                            'To avoid this, send remaining accounts in order to process the events'
                        ],
                        type: 'u64'
                    },
                    {
                        name: 'makerVolume',
                        docs: [
                            'Cumulative maker volume in quote native units (display only)'
                        ],
                        type: 'u128'
                    },
                    {
                        name: 'takerVolume',
                        docs: [
                            'Cumulative taker volume in quote native units (display only)'
                        ],
                        type: 'u128'
                    },
                    {
                        name: 'bidsQuoteLots',
                        docs: [
                            'Quote lots in open bids'
                        ],
                        type: 'i64'
                    },
                    {
                        name: 'reserved',
                        type: {
                            array: [
                                'u8',
                                64
                            ]
                        }
                    }
                ]
            }
        },
        {
            name: 'OpenOrder',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'id',
                        type: 'u128'
                    },
                    {
                        name: 'clientId',
                        type: 'u64'
                    },
                    {
                        name: 'lockedPrice',
                        docs: [
                            "Price at which user's assets were locked"
                        ],
                        type: 'i64'
                    },
                    {
                        name: 'isFree',
                        type: 'u8'
                    },
                    {
                        name: 'sideAndTree',
                        type: 'u8'
                    },
                    {
                        name: 'padding',
                        type: {
                            array: [
                                'u8',
                                6
                            ]
                        }
                    }
                ]
            }
        },
        {
            name: 'OracleConfig',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'confFilter',
                        type: 'f64'
                    },
                    {
                        name: 'maxStalenessSlots',
                        type: 'i64'
                    },
                    {
                        name: 'reserved',
                        type: {
                            array: [
                                'u8',
                                72
                            ]
                        }
                    }
                ]
            }
        },
        {
            name: 'OracleConfigParams',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'confFilter',
                        type: 'f32'
                    },
                    {
                        name: 'maxStalenessSlots',
                        type: {
                            option: 'u32'
                        }
                    }
                ]
            }
        },
        {
            name: 'EventHeapHeader',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'freeHead',
                        type: 'u16'
                    },
                    {
                        name: 'usedHead',
                        type: 'u16'
                    },
                    {
                        name: 'count',
                        type: 'u16'
                    },
                    {
                        name: 'padd',
                        type: 'u16'
                    },
                    {
                        name: 'seqNum',
                        type: 'u64'
                    }
                ]
            }
        },
        {
            name: 'EventNode',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'next',
                        type: 'u16'
                    },
                    {
                        name: 'prev',
                        type: 'u16'
                    },
                    {
                        name: 'pad',
                        type: {
                            array: [
                                'u8',
                                4
                            ]
                        }
                    },
                    {
                        name: 'event',
                        type: {
                            defined: 'AnyEvent'
                        }
                    }
                ]
            }
        },
        {
            name: 'AnyEvent',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'eventType',
                        type: 'u8'
                    },
                    {
                        name: 'padding',
                        type: {
                            array: [
                                'u8',
                                143
                            ]
                        }
                    }
                ]
            }
        },
        {
            name: 'FillEvent',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'eventType',
                        type: 'u8'
                    },
                    {
                        name: 'takerSide',
                        type: 'u8'
                    },
                    {
                        name: 'makerOut',
                        type: 'u8'
                    },
                    {
                        name: 'makerSlot',
                        type: 'u8'
                    },
                    {
                        name: 'padding',
                        type: {
                            array: [
                                'u8',
                                4
                            ]
                        }
                    },
                    {
                        name: 'timestamp',
                        type: 'u64'
                    },
                    {
                        name: 'seqNum',
                        type: 'u64'
                    },
                    {
                        name: 'maker',
                        type: 'publicKey'
                    },
                    {
                        name: 'makerTimestamp',
                        type: 'u64'
                    },
                    {
                        name: 'taker',
                        type: 'publicKey'
                    },
                    {
                        name: 'takerClientOrderId',
                        type: 'u64'
                    },
                    {
                        name: 'price',
                        type: 'i64'
                    },
                    {
                        name: 'pegLimit',
                        type: 'i64'
                    },
                    {
                        name: 'quantity',
                        type: 'i64'
                    },
                    {
                        name: 'makerClientOrderId',
                        type: 'u64'
                    },
                    {
                        name: 'reserved',
                        type: {
                            array: [
                                'u8',
                                8
                            ]
                        }
                    }
                ]
            }
        },
        {
            name: 'OutEvent',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'eventType',
                        type: 'u8'
                    },
                    {
                        name: 'side',
                        type: 'u8'
                    },
                    {
                        name: 'ownerSlot',
                        type: 'u8'
                    },
                    {
                        name: 'padding0',
                        type: {
                            array: [
                                'u8',
                                5
                            ]
                        }
                    },
                    {
                        name: 'timestamp',
                        type: 'u64'
                    },
                    {
                        name: 'seqNum',
                        type: 'u64'
                    },
                    {
                        name: 'owner',
                        type: 'publicKey'
                    },
                    {
                        name: 'quantity',
                        type: 'i64'
                    },
                    {
                        name: 'padding1',
                        type: {
                            array: [
                                'u8',
                                80
                            ]
                        }
                    }
                ]
            }
        },
        {
            name: 'InnerNode',
            docs: [
                'InnerNodes and LeafNodes compose the binary tree of orders.',
                '',
                'Each InnerNode has exactly two children, which are either InnerNodes themselves,',
                'or LeafNodes. The children share the top `prefix_len` bits of `key`. The left',
                'child has a 0 in the next bit, and the right a 1.'
            ],
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'tag',
                        type: 'u8'
                    },
                    {
                        name: 'padding',
                        type: {
                            array: [
                                'u8',
                                3
                            ]
                        }
                    },
                    {
                        name: 'prefixLen',
                        docs: [
                            'number of highest `key` bits that all children share',
                            "e.g. if it's 2, the two highest bits of `key` will be the same on all children"
                        ],
                        type: 'u32'
                    },
                    {
                        name: 'key',
                        docs: [
                            'only the top `prefix_len` bits of `key` are relevant'
                        ],
                        type: 'u128'
                    },
                    {
                        name: 'children',
                        docs: [
                            'indexes into `BookSide::nodes`'
                        ],
                        type: {
                            array: [
                                'u32',
                                2
                            ]
                        }
                    },
                    {
                        name: 'childEarliestExpiry',
                        docs: [
                            'The earliest expiry timestamp for the left and right subtrees.',
                            '',
                            'Needed to be able to find and remove expired orders without having to',
                            'iterate through the whole bookside.'
                        ],
                        type: {
                            array: [
                                'u64',
                                2
                            ]
                        }
                    },
                    {
                        name: 'reserved',
                        type: {
                            array: [
                                'u8',
                                40
                            ]
                        }
                    }
                ]
            }
        },
        {
            name: 'LeafNode',
            docs: [
                'LeafNodes represent an order in the binary tree'
            ],
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'tag',
                        docs: [
                            'NodeTag'
                        ],
                        type: 'u8'
                    },
                    {
                        name: 'ownerSlot',
                        docs: [
                            "Index into the owning OpenOrdersAccount's OpenOrders"
                        ],
                        type: 'u8'
                    },
                    {
                        name: 'timeInForce',
                        docs: [
                            'Time in seconds after `timestamp` at which the order expires.',
                            'A value of 0 means no expiry.'
                        ],
                        type: 'u16'
                    },
                    {
                        name: 'padding',
                        type: {
                            array: [
                                'u8',
                                4
                            ]
                        }
                    },
                    {
                        name: 'key',
                        docs: [
                            'The binary tree key, see new_node_key()'
                        ],
                        type: 'u128'
                    },
                    {
                        name: 'owner',
                        docs: [
                            'Address of the owning OpenOrdersAccount'
                        ],
                        type: 'publicKey'
                    },
                    {
                        name: 'quantity',
                        docs: [
                            'Number of base lots to buy or sell, always >=1'
                        ],
                        type: 'i64'
                    },
                    {
                        name: 'timestamp',
                        docs: [
                            'The time the order was placed'
                        ],
                        type: 'u64'
                    },
                    {
                        name: 'pegLimit',
                        docs: [
                            'If the effective price of an oracle pegged order exceeds this limit,',
                            'it will be considered invalid and may be removed.',
                            '',
                            'Only applicable in the oracle_pegged OrderTree'
                        ],
                        type: 'i64'
                    },
                    {
                        name: 'clientOrderId',
                        docs: [
                            'User defined id for this order, used in FillEvents'
                        ],
                        type: 'u64'
                    }
                ]
            }
        },
        {
            name: 'AnyNode',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'tag',
                        type: 'u8'
                    },
                    {
                        name: 'data',
                        type: {
                            array: [
                                'u8',
                                87
                            ]
                        }
                    }
                ]
            }
        },
        {
            name: 'OrderTreeRoot',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'maybeNode',
                        type: 'u32'
                    },
                    {
                        name: 'leafCount',
                        type: 'u32'
                    }
                ]
            }
        },
        {
            name: 'OrderTreeNodes',
            docs: [
                'A binary tree on AnyNode::key()',
                '',
                'The key encodes the price in the top 64 bits.'
            ],
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'orderTreeType',
                        type: 'u8'
                    },
                    {
                        name: 'padding',
                        type: {
                            array: [
                                'u8',
                                3
                            ]
                        }
                    },
                    {
                        name: 'bumpIndex',
                        type: 'u32'
                    },
                    {
                        name: 'freeListLen',
                        type: 'u32'
                    },
                    {
                        name: 'freeListHead',
                        type: 'u32'
                    },
                    {
                        name: 'reserved',
                        type: {
                            array: [
                                'u8',
                                512
                            ]
                        }
                    },
                    {
                        name: 'nodes',
                        type: {
                            array: [
                                {
                                    defined: 'AnyNode'
                                },
                                1024
                            ]
                        }
                    }
                ]
            }
        },
        {
            name: 'I80F48',
            docs: [
                'Nothing in Rust shall use these types. They only exist so that the Anchor IDL',
                'knows about them and typescript can deserialize it.'
            ],
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'val',
                        type: 'i128'
                    }
                ]
            }
        },
        {
            name: 'PlaceOrderArgs',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'side',
                        type: {
                            defined: 'Side'
                        }
                    },
                    {
                        name: 'priceLots',
                        type: 'i64'
                    },
                    {
                        name: 'maxBaseLots',
                        type: 'i64'
                    },
                    {
                        name: 'maxQuoteLotsIncludingFees',
                        type: 'i64'
                    },
                    {
                        name: 'clientOrderId',
                        type: 'u64'
                    },
                    {
                        name: 'orderType',
                        type: {
                            defined: 'PlaceOrderType'
                        }
                    },
                    {
                        name: 'expiryTimestamp',
                        type: 'u64'
                    },
                    {
                        name: 'selfTradeBehavior',
                        type: {
                            defined: 'SelfTradeBehavior'
                        }
                    },
                    {
                        name: 'limit',
                        type: 'u8'
                    }
                ]
            }
        },
        {
            name: 'PlaceMultipleOrdersArgs',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'priceLots',
                        type: 'i64'
                    },
                    {
                        name: 'maxQuoteLotsIncludingFees',
                        type: 'i64'
                    },
                    {
                        name: 'expiryTimestamp',
                        type: 'u64'
                    }
                ]
            }
        },
        {
            name: 'PlaceOrderPeggedArgs',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'side',
                        type: {
                            defined: 'Side'
                        }
                    },
                    {
                        name: 'priceOffsetLots',
                        type: 'i64'
                    },
                    {
                        name: 'pegLimit',
                        type: 'i64'
                    },
                    {
                        name: 'maxBaseLots',
                        type: 'i64'
                    },
                    {
                        name: 'maxQuoteLotsIncludingFees',
                        type: 'i64'
                    },
                    {
                        name: 'clientOrderId',
                        type: 'u64'
                    },
                    {
                        name: 'orderType',
                        type: {
                            defined: 'PlaceOrderType'
                        }
                    },
                    {
                        name: 'expiryTimestamp',
                        type: 'u64'
                    },
                    {
                        name: 'selfTradeBehavior',
                        type: {
                            defined: 'SelfTradeBehavior'
                        }
                    },
                    {
                        name: 'limit',
                        type: 'u8'
                    }
                ]
            }
        },
        {
            name: 'PlaceTakeOrderArgs',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'side',
                        type: {
                            defined: 'Side'
                        }
                    },
                    {
                        name: 'priceLots',
                        type: 'i64'
                    },
                    {
                        name: 'maxBaseLots',
                        type: 'i64'
                    },
                    {
                        name: 'maxQuoteLotsIncludingFees',
                        type: 'i64'
                    },
                    {
                        name: 'orderType',
                        type: {
                            defined: 'PlaceOrderType'
                        }
                    },
                    {
                        name: 'limit',
                        type: 'u8'
                    }
                ]
            }
        },
        {
            name: 'OracleType',
            type: {
                kind: 'enum',
                variants: [
                    {
                        name: 'Pyth'
                    },
                    {
                        name: 'Stub'
                    },
                    {
                        name: 'SwitchboardV1'
                    },
                    {
                        name: 'SwitchboardV2'
                    },
                    {
                        name: 'RaydiumCLMM'
                    }
                ]
            }
        },
        {
            name: 'OrderState',
            type: {
                kind: 'enum',
                variants: [
                    {
                        name: 'Valid'
                    },
                    {
                        name: 'Invalid'
                    },
                    {
                        name: 'Skipped'
                    }
                ]
            }
        },
        {
            name: 'BookSideOrderTree',
            type: {
                kind: 'enum',
                variants: [
                    {
                        name: 'Fixed'
                    },
                    {
                        name: 'OraclePegged'
                    }
                ]
            }
        },
        {
            name: 'EventType',
            type: {
                kind: 'enum',
                variants: [
                    {
                        name: 'Fill'
                    },
                    {
                        name: 'Out'
                    }
                ]
            }
        },
        {
            name: 'NodeTag',
            type: {
                kind: 'enum',
                variants: [
                    {
                        name: 'Uninitialized'
                    },
                    {
                        name: 'InnerNode'
                    },
                    {
                        name: 'LeafNode'
                    },
                    {
                        name: 'FreeNode'
                    },
                    {
                        name: 'LastFreeNode'
                    }
                ]
            }
        },
        {
            name: 'PlaceOrderType',
            type: {
                kind: 'enum',
                variants: [
                    {
                        name: 'Limit'
                    },
                    {
                        name: 'ImmediateOrCancel'
                    },
                    {
                        name: 'PostOnly'
                    },
                    {
                        name: 'Market'
                    },
                    {
                        name: 'PostOnlySlide'
                    },
                    {
                        name: 'FillOrKill'
                    }
                ]
            }
        },
        {
            name: 'PostOrderType',
            type: {
                kind: 'enum',
                variants: [
                    {
                        name: 'Limit'
                    },
                    {
                        name: 'PostOnly'
                    },
                    {
                        name: 'PostOnlySlide'
                    }
                ]
            }
        },
        {
            name: 'SelfTradeBehavior',
            docs: [
                'Self trade behavior controls how taker orders interact with resting limit orders of the same account.',
                'This setting has no influence on placing a resting or oracle pegged limit order that does not match',
                "immediately, instead it's the responsibility of the user to correctly configure his taker orders."
            ],
            type: {
                kind: 'enum',
                variants: [
                    {
                        name: 'DecrementTake'
                    },
                    {
                        name: 'CancelProvide'
                    },
                    {
                        name: 'AbortTransaction'
                    }
                ]
            }
        },
        {
            name: 'Side',
            type: {
                kind: 'enum',
                variants: [
                    {
                        name: 'Bid'
                    },
                    {
                        name: 'Ask'
                    }
                ]
            }
        },
        {
            name: 'SideAndOrderTree',
            docs: [
                "SideAndOrderTree is a storage optimization, so we don't need two bytes for the data"
            ],
            type: {
                kind: 'enum',
                variants: [
                    {
                        name: 'BidFixed'
                    },
                    {
                        name: 'AskFixed'
                    },
                    {
                        name: 'BidOraclePegged'
                    },
                    {
                        name: 'AskOraclePegged'
                    }
                ]
            }
        },
        {
            name: 'OrderParams',
            type: {
                kind: 'enum',
                variants: [
                    {
                        name: 'Market'
                    },
                    {
                        name: 'ImmediateOrCancel',
                        fields: [
                            {
                                name: 'price_lots',
                                type: 'i64'
                            }
                        ]
                    },
                    {
                        name: 'Fixed',
                        fields: [
                            {
                                name: 'price_lots',
                                type: 'i64'
                            },
                            {
                                name: 'order_type',
                                type: {
                                    defined: 'PostOrderType'
                                }
                            }
                        ]
                    },
                    {
                        name: 'OraclePegged',
                        fields: [
                            {
                                name: 'price_offset_lots',
                                type: 'i64'
                            },
                            {
                                name: 'order_type',
                                type: {
                                    defined: 'PostOrderType'
                                }
                            },
                            {
                                name: 'peg_limit',
                                type: 'i64'
                            }
                        ]
                    },
                    {
                        name: 'FillOrKill',
                        fields: [
                            {
                                name: 'price_lots',
                                type: 'i64'
                            }
                        ]
                    }
                ]
            }
        },
        {
            name: 'OrderTreeType',
            type: {
                kind: 'enum',
                variants: [
                    {
                        name: 'Bids'
                    },
                    {
                        name: 'Asks'
                    }
                ]
            }
        }
    ],
    events: [
        {
            name: 'DepositLog',
            fields: [
                {
                    name: 'openOrdersAccount',
                    type: 'publicKey',
                    index: false
                },
                {
                    name: 'signer',
                    type: 'publicKey',
                    index: false
                },
                {
                    name: 'baseAmount',
                    type: 'u64',
                    index: false
                },
                {
                    name: 'quoteAmount',
                    type: 'u64',
                    index: false
                }
            ]
        },
        {
            name: 'FillLog',
            fields: [
                {
                    name: 'market',
                    type: 'publicKey',
                    index: false
                },
                {
                    name: 'takerSide',
                    type: 'u8',
                    index: false
                },
                {
                    name: 'makerSlot',
                    type: 'u8',
                    index: false
                },
                {
                    name: 'makerOut',
                    type: 'bool',
                    index: false
                },
                {
                    name: 'timestamp',
                    type: 'u64',
                    index: false
                },
                {
                    name: 'seqNum',
                    type: 'u64',
                    index: false
                },
                {
                    name: 'maker',
                    type: 'publicKey',
                    index: false
                },
                {
                    name: 'makerClientOrderId',
                    type: 'u64',
                    index: false
                },
                {
                    name: 'makerFee',
                    type: 'u64',
                    index: false
                },
                {
                    name: 'makerTimestamp',
                    type: 'u64',
                    index: false
                },
                {
                    name: 'taker',
                    type: 'publicKey',
                    index: false
                },
                {
                    name: 'takerClientOrderId',
                    type: 'u64',
                    index: false
                },
                {
                    name: 'takerFeeCeil',
                    type: 'u64',
                    index: false
                },
                {
                    name: 'price',
                    type: 'i64',
                    index: false
                },
                {
                    name: 'quantity',
                    type: 'i64',
                    index: false
                }
            ]
        },
        {
            name: 'MarketMetaDataLog',
            fields: [
                {
                    name: 'market',
                    type: 'publicKey',
                    index: false
                },
                {
                    name: 'name',
                    type: 'string',
                    index: false
                },
                {
                    name: 'baseMint',
                    type: 'publicKey',
                    index: false
                },
                {
                    name: 'quoteMint',
                    type: 'publicKey',
                    index: false
                },
                {
                    name: 'baseDecimals',
                    type: 'u8',
                    index: false
                },
                {
                    name: 'quoteDecimals',
                    type: 'u8',
                    index: false
                },
                {
                    name: 'baseLotSize',
                    type: 'i64',
                    index: false
                },
                {
                    name: 'quoteLotSize',
                    type: 'i64',
                    index: false
                }
            ]
        },
        {
            name: 'TotalOrderFillEvent',
            fields: [
                {
                    name: 'side',
                    type: 'u8',
                    index: false
                },
                {
                    name: 'taker',
                    type: 'publicKey',
                    index: false
                },
                {
                    name: 'totalQuantityPaid',
                    type: 'u64',
                    index: false
                },
                {
                    name: 'totalQuantityReceived',
                    type: 'u64',
                    index: false
                },
                {
                    name: 'fees',
                    type: 'u64',
                    index: false
                }
            ]
        },
        {
            name: 'SetDelegateLog',
            fields: [
                {
                    name: 'openOrdersAccount',
                    type: 'publicKey',
                    index: false
                },
                {
                    name: 'delegate',
                    type: {
                        option: 'publicKey'
                    },
                    index: false
                }
            ]
        },
        {
            name: 'SettleFundsLog',
            fields: [
                {
                    name: 'openOrdersAccount',
                    type: 'publicKey',
                    index: false
                },
                {
                    name: 'baseNative',
                    type: 'u64',
                    index: false
                },
                {
                    name: 'quoteNative',
                    type: 'u64',
                    index: false
                },
                {
                    name: 'referrerRebate',
                    type: 'u64',
                    index: false
                },
                {
                    name: 'referrer',
                    type: {
                        option: 'publicKey'
                    },
                    index: false
                }
            ]
        },
        {
            name: 'SweepFeesLog',
            fields: [
                {
                    name: 'market',
                    type: 'publicKey',
                    index: false
                },
                {
                    name: 'amount',
                    type: 'u64',
                    index: false
                },
                {
                    name: 'receiver',
                    type: 'publicKey',
                    index: false
                }
            ]
        },
        {
            name: 'OpenOrdersPositionLog',
            fields: [
                {
                    name: 'owner',
                    type: 'publicKey',
                    index: false
                },
                {
                    name: 'openOrdersAccountNum',
                    type: 'u32',
                    index: false
                },
                {
                    name: 'market',
                    type: 'publicKey',
                    index: false
                },
                {
                    name: 'bidsBaseLots',
                    type: 'i64',
                    index: false
                },
                {
                    name: 'bidsQuoteLots',
                    type: 'i64',
                    index: false
                },
                {
                    name: 'asksBaseLots',
                    type: 'i64',
                    index: false
                },
                {
                    name: 'baseFreeNative',
                    type: 'u64',
                    index: false
                },
                {
                    name: 'quoteFreeNative',
                    type: 'u64',
                    index: false
                },
                {
                    name: 'lockedMakerFees',
                    type: 'u64',
                    index: false
                },
                {
                    name: 'referrerRebatesAvailable',
                    type: 'u64',
                    index: false
                },
                {
                    name: 'makerVolume',
                    type: 'u128',
                    index: false
                },
                {
                    name: 'takerVolume',
                    type: 'u128',
                    index: false
                }
            ]
        }
    ],
    errors: [
        {
            code: 6000,
            name: 'SomeError',
            msg: ''
        },
        {
            code: 6001,
            name: 'InvalidInputNameLength',
            msg: 'Name lenght above limit'
        },
        {
            code: 6002,
            name: 'InvalidInputMarketExpired',
            msg: 'Market cannot be created as expired'
        },
        {
            code: 6003,
            name: 'InvalidInputMarketFees',
            msg: 'Taker fees should be positive and if maker fees are negative, greater or equal to their abs value'
        },
        {
            code: 6004,
            name: 'InvalidInputLots',
            msg: 'Lots cannot be negative'
        },
        {
            code: 6005,
            name: 'InvalidInputLotsSize',
            msg: 'Lots size above market limits'
        },
        {
            code: 6006,
            name: 'InvalidInputOrdersAmounts',
            msg: 'Input amounts above limits'
        },
        {
            code: 6007,
            name: 'InvalidInputCancelSize',
            msg: 'Price lots should be greater than zero'
        },
        {
            code: 6008,
            name: 'InvalidInputPriceLots',
            msg: 'Expected cancel size should be greater than zero'
        },
        {
            code: 6009,
            name: 'InvalidInputPegLimit',
            msg: 'Peg limit should be greater than zero'
        },
        {
            code: 6010,
            name: 'InvalidInputOrderType',
            msg: 'The order type is invalid. A taker order must be Market or ImmediateOrCancel'
        },
        {
            code: 6011,
            name: 'InvalidInputOrderId',
            msg: 'Order id cannot be zero'
        },
        {
            code: 6012,
            name: 'InvalidInputHeapSlots',
            msg: 'Slot above heap limit'
        },
        {
            code: 6013,
            name: 'InvalidOracleTypes',
            msg: 'Cannot combine two oracles of different providers'
        },
        {
            code: 6014,
            name: 'InvalidSecondOracle',
            msg: 'Cannot configure secondary oracle without primary'
        },
        {
            code: 6015,
            name: 'NoCloseMarketAdmin',
            msg: 'This market does not have a `close_market_admin` and thus cannot be closed.'
        },
        {
            code: 6016,
            name: 'InvalidCloseMarketAdmin',
            msg: "The signer of this transaction is not this market's `close_market_admin`."
        },
        {
            code: 6017,
            name: 'InvalidOpenOrdersAdmin',
            msg: 'The `open_orders_admin` required by this market to sign all instructions that creates orders is missing or is not valid'
        },
        {
            code: 6018,
            name: 'InvalidConsumeEventsAdmin',
            msg: 'The `consume_events_admin` required by this market to sign all instructions that consume events is missing or is not valid'
        },
        {
            code: 6019,
            name: 'InvalidMarketVault',
            msg: 'Provided `market_vault` is invalid'
        },
        {
            code: 6020,
            name: 'IndexerActiveOO',
            msg: 'Cannot be closed due to the existence of open orders accounts'
        },
        {
            code: 6021,
            name: 'OraclePegInvalidOracleState',
            msg: 'Cannot place a peg order due to invalid oracle state'
        },
        {
            code: 6022,
            name: 'UnknownOracleType',
            msg: 'oracle type cannot be determined'
        },
        {
            code: 6023,
            name: 'OracleConfidence',
            msg: 'an oracle does not reach the confidence threshold'
        },
        {
            code: 6024,
            name: 'OracleStale',
            msg: 'an oracle is stale'
        },
        {
            code: 6025,
            name: 'OrderIdNotFound',
            msg: 'Order id not found on the orderbook'
        },
        {
            code: 6026,
            name: 'EventHeapContainsElements',
            msg: "Event heap contains elements and market can't be closed"
        },
        {
            code: 6027,
            name: 'InvalidOrderPostIOC',
            msg: 'ImmediateOrCancel is not a PostOrderType'
        },
        {
            code: 6028,
            name: 'InvalidOrderPostMarket',
            msg: 'Market is not a PostOrderType'
        },
        {
            code: 6029,
            name: 'WouldSelfTrade',
            msg: 'would self trade'
        },
        {
            code: 6030,
            name: 'MarketHasExpired',
            msg: 'The Market has already expired.'
        },
        {
            code: 6031,
            name: 'InvalidPriceLots',
            msg: 'Price lots should be greater than zero'
        },
        {
            code: 6032,
            name: 'InvalidOraclePrice',
            msg: 'Oracle price above market limits'
        },
        {
            code: 6033,
            name: 'MarketHasNotExpired',
            msg: 'The Market has not expired yet.'
        },
        {
            code: 6034,
            name: 'NoOwnerOrDelegate',
            msg: 'No correct owner or delegate.'
        },
        {
            code: 6035,
            name: 'NoOwner',
            msg: 'No correct owner'
        },
        {
            code: 6036,
            name: 'OpenOrdersFull',
            msg: 'No free order index in open orders account'
        },
        {
            code: 6037,
            name: 'BookContainsElements',
            msg: 'Book contains elements'
        },
        {
            code: 6038,
            name: 'OpenOrdersOrderNotFound',
            msg: 'Could not find order in user account'
        },
        {
            code: 6039,
            name: 'InvalidPostAmount',
            msg: 'Amount to post above book limits'
        },
        {
            code: 6040,
            name: 'DisabledOraclePeg',
            msg: 'Oracle peg orders are not enabled for this market'
        },
        {
            code: 6041,
            name: 'NonEmptyMarket',
            msg: 'Cannot close a non-empty market'
        },
        {
            code: 6042,
            name: 'NonEmptyOpenOrdersPosition',
            msg: 'Cannot close a non-empty open orders account'
        },
        {
            code: 6043,
            name: 'WouldExecutePartially',
            msg: 'Fill-Or-Kill order would generate a partial execution'
        }
    ]
};
}),
"[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$openbook_v2$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/openbook_v2.js [app-route] (ecmascript)");
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
}),
"[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/utils/rpc.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createComputeBudgetIx",
    ()=>createComputeBudgetIx,
    "sendTransaction",
    ()=>sendTransaction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$29$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$cjs$2f$nodewallet$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/cjs/nodewallet.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
;
;
async function sendTransaction(provider, ixs, alts, opts = {}) {
    const connection = provider.connection;
    const additionalSigners = opts?.additionalSigners || [];
    if (connection.banksClient !== undefined) {
        const tx = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Transaction"]();
        for (const ix of ixs){
            tx.add(ix);
        }
        tx.feePayer = provider.wallet.publicKey;
        [tx.recentBlockhash] = await connection.banksClient.getLatestBlockhash();
        for (const signer of additionalSigners){
            tx.partialSign(signer);
        }
        await connection.banksClient.processTransaction(tx);
        return '';
    }
    const latestBlockhash = opts?.latestBlockhash ?? await connection.getLatestBlockhash(opts?.preflightCommitment ?? provider.opts.preflightCommitment ?? 'finalized');
    const payer = provider.wallet;
    if (opts?.prioritizationFee !== null && opts.prioritizationFee !== 0) {
        ixs = [
            createComputeBudgetIx(opts.prioritizationFee),
            ...ixs
        ];
    }
    const message = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MessageV0"].compile({
        payerKey: payer.publicKey,
        instructions: ixs,
        recentBlockhash: latestBlockhash.blockhash,
        addressLookupTableAccounts: alts
    });
    let vtx = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["VersionedTransaction"](message);
    if (additionalSigners !== undefined && additionalSigners.length !== 0) {
        vtx.sign([
            ...additionalSigners
        ]);
    }
    if (typeof payer.signTransaction === 'function' && !(payer instanceof __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$29$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$cjs$2f$nodewallet$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"] || payer.constructor.name === 'NodeWallet')) {
        vtx = await payer.signTransaction(vtx);
    } else {
        // Maybe this path is only correct for NodeWallet?
        vtx.sign([
            payer.payer
        ]);
    }
    const signature = await connection.sendRawTransaction(vtx.serialize(), {
        skipPreflight: true
    });
    // console.log(`sent tx base64=${Buffer.from(vtx.serialize()).toString('base64')}`);
    if (opts?.postSendTxCallback !== undefined && opts?.postSendTxCallback !== null) {
        try {
            opts.postSendTxCallback({
                txid: signature
            });
        } catch (e) {
            console.warn(`postSendTxCallback error`, e);
        }
    }
    const txConfirmationCommitment = opts?.txConfirmationCommitment ?? 'processed';
    let result;
    if (latestBlockhash.blockhash != null && latestBlockhash.lastValidBlockHeight != null) {
        result = (await connection.confirmTransaction({
            signature: signature,
            blockhash: latestBlockhash.blockhash,
            lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
        }, txConfirmationCommitment)).value;
    } else {
        result = (await connection.confirmTransaction(signature, txConfirmationCommitment)).value;
    }
    if (result.err !== '' && result.err !== null) {
        console.warn('Tx failed result: ', result);
        throw new OpenBookError({
            txid: signature,
            message: `${JSON.stringify(result)}`
        });
    }
    return signature;
}
const createComputeBudgetIx = (microLamports)=>{
    const computeBudgetIx = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ComputeBudgetProgram"].setComputeUnitPrice({
        microLamports
    });
    return computeBudgetIx;
};
class OpenBookError extends Error {
    message;
    txid;
    constructor({ txid, message }){
        super();
        this.message = message;
        this.txid = txid;
    }
}
}),
"[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/client.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OPENBOOK_PROGRAM_ID",
    ()=>OPENBOOK_PROGRAM_ID,
    "OpenBookV2Client",
    ()=>OpenBookV2Client,
    "getFilteredProgramAccounts",
    ()=>getFilteredProgramAccounts,
    "nameToString",
    ()=>nameToString
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$29$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bn.js@5.2.2/node_modules/bn.js/lib/bn.js [app-route] (ecmascript) <export default as BN>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$29$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$program$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/program/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$29$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$cjs$2f$utils$2f$bytes$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/cjs/utils/bytes/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.4.13_@solana+web3.js@1.98.4_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/esm/constants.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$instructions$2f$closeAccount$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.4.13_@solana+web3.js@1.98.4_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/esm/instructions/closeAccount.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$instructions$2f$initializeAccount3$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.4.13_@solana+web3.js@1.98.4_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/esm/instructions/initializeAccount3.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$state$2f$mint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.4.13_@solana+web3.js@1.98.4_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/esm/state/mint.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$openbook_v2$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/openbook_v2.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/utils/rpc.js [app-route] (ecmascript)");
;
;
;
;
;
;
function nameToString(name) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$29$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$cjs$2f$utils$2f$bytes$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["utf8"].decode(new Uint8Array(name)).split('\x00')[0];
}
const BooksideSpace = 90944 + 8;
const EventHeapSpace = 91280 + 8;
const OPENBOOK_PROGRAM_ID = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"]('opnb2LAfJYbRMAHHvqjCwQxanZn7ReEHp1k81EohpZb');
class OpenBookV2Client {
    provider;
    programId;
    opts;
    program;
    referrerWallet;
    idsSource;
    postSendTxCallback;
    prioritizationFee;
    txConfirmationCommitment;
    constructor(provider, programId = OPENBOOK_PROGRAM_ID, opts = {}){
        this.provider = provider;
        this.programId = programId;
        this.opts = opts;
        this.program = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$29$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$program$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Program"](__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$openbook_v2$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IDL"], programId, provider);
        this.idsSource = opts.idsSource ?? 'get-program-accounts';
        this.prioritizationFee = opts?.prioritizationFee ?? 0;
        this.postSendTxCallback = opts?.postSendTxCallback;
        this.txConfirmationCommitment = opts?.txConfirmationCommitment ?? (this.program.provider.opts !== undefined ? this.program.provider.opts.commitment : undefined) ?? 'processed';
        this.referrerWallet = opts.referrerWallet;
        // TODO: evil side effect, but limited backtraces are a nightmare
        Error.stackTraceLimit = 1000;
    }
    /// Convenience accessors
    get connection() {
        return this.program.provider.connection;
    }
    get walletPk() {
        return this.program.provider.wallet.publicKey;
    }
    setProvider(provider) {
        this.program = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$29$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$program$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Program"](__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$openbook_v2$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IDL"], this.programId, provider);
    }
    /// Transactions
    async sendAndConfirmTransaction(ixs, opts = {}) {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$rpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendTransaction"])(this.program.provider, ixs, opts.alts ?? [], {
            postSendTxCallback: this.postSendTxCallback,
            prioritizationFee: this.prioritizationFee,
            txConfirmationCommitment: this.txConfirmationCommitment,
            ...opts
        });
    }
    async createProgramAccount(authority, size) {
        const lamports = await this.connection.getMinimumBalanceForRentExemption(size);
        const address = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Keypair"].generate();
        const tx = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Transaction"]().add(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SystemProgram"].createAccount({
            fromPubkey: authority.publicKey,
            newAccountPubkey: address.publicKey,
            lamports,
            space: size,
            programId: this.programId
        })).instructions;
        await this.sendAndConfirmTransaction(tx, {
            additionalSigners: [
                authority,
                address
            ]
        });
        return address.publicKey;
    }
    async createProgramAccountIx(authority, size) {
        const lamports = await this.connection.getMinimumBalanceForRentExemption(size);
        const address = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Keypair"].generate();
        const ix = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SystemProgram"].createAccount({
            fromPubkey: authority,
            newAccountPubkey: address.publicKey,
            lamports,
            space: size,
            programId: this.programId
        });
        return [
            ix,
            address
        ];
    }
    async deserializeOpenOrderAccount(publicKey) {
        try {
            return await this.program.account.openOrdersAccount.fetch(publicKey);
        } catch  {
            return null;
        }
    }
    async deserializeOpenOrdersIndexerAccount(publicKey) {
        try {
            return await this.program.account.openOrdersIndexer.fetch(publicKey);
        } catch  {
            return null;
        }
    }
    async deserializeEventHeapAccount(publicKey) {
        try {
            return await this.program.account.eventHeap.fetch(publicKey);
        } catch  {
            return null;
        }
    }
    async createMarketIx(payer, name, quoteMint, baseMint, quoteLotSize, baseLotSize, makerFee, takerFee, timeExpiry, oracleA, oracleB, openOrdersAdmin, consumeEventsAdmin, closeMarketAdmin, oracleConfigParams = {
        confFilter: 0.1,
        maxStalenessSlots: 100
    }, market = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Keypair"].generate(), collectFeeAdmin) {
        const [bidIx, bidsKeypair] = await this.createProgramAccountIx(payer, BooksideSpace);
        const [askIx, askKeypair] = await this.createProgramAccountIx(payer, BooksideSpace);
        const [eventHeapIx, eventHeapKeypair] = await this.createProgramAccountIx(payer, EventHeapSpace);
        const [marketAuthority] = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"].findProgramAddressSync([
            Buffer.from('Market'),
            market.publicKey.toBuffer()
        ], this.program.programId);
        const baseVault = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$state$2f$mint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssociatedTokenAddressSync"])(baseMint, marketAuthority, true);
        const quoteVault = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$state$2f$mint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssociatedTokenAddressSync"])(quoteMint, marketAuthority, true);
        const [eventAuthority] = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"].findProgramAddressSync([
            Buffer.from('__event_authority')
        ], this.program.programId);
        const ix = await this.program.methods.createMarket(name, oracleConfigParams, quoteLotSize, baseLotSize, makerFee, takerFee, timeExpiry).accounts({
            market: market.publicKey,
            marketAuthority,
            bids: bidsKeypair.publicKey,
            asks: askKeypair.publicKey,
            eventHeap: eventHeapKeypair.publicKey,
            payer,
            marketBaseVault: baseVault,
            marketQuoteVault: quoteVault,
            baseMint,
            quoteMint,
            systemProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SystemProgram"].programId,
            tokenProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TOKEN_PROGRAM_ID"],
            associatedTokenProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ASSOCIATED_TOKEN_PROGRAM_ID"],
            oracleA,
            oracleB,
            collectFeeAdmin: collectFeeAdmin != null ? collectFeeAdmin : payer,
            openOrdersAdmin,
            consumeEventsAdmin,
            closeMarketAdmin,
            eventAuthority,
            program: this.programId
        }).instruction();
        return [
            [
                bidIx,
                askIx,
                eventHeapIx,
                ix
            ],
            [
                market,
                bidsKeypair,
                askKeypair,
                eventHeapKeypair
            ]
        ];
    }
    // Book and EventHeap must be empty before closing a market.
    // Make sure to call consumeEvents and pruneOrders before closing the market.
    async closeMarketIx(marketPublicKey, market, solDestination, closeMarketAdmin = null) {
        const ix = await this.program.methods.closeMarket().accounts({
            closeMarketAdmin: market.closeMarketAdmin.key,
            market: marketPublicKey,
            asks: market.asks,
            bids: market.bids,
            eventHeap: market.eventHeap,
            solDestination: solDestination,
            tokenProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TOKEN_PROGRAM_ID"]
        }).instruction();
        const signers = [];
        if (this.walletPk !== market.closeMarketAdmin.key && closeMarketAdmin !== null) {
            signers.push(closeMarketAdmin);
        }
        return [
            ix,
            signers
        ];
    }
    // Each owner has one open order indexer
    findOpenOrdersIndexer(owner = this.walletPk) {
        const [openOrdersIndexer] = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"].findProgramAddressSync([
            Buffer.from('OpenOrdersIndexer'),
            owner.toBuffer()
        ], this.programId);
        return openOrdersIndexer;
    }
    async createOpenOrdersIndexer(openOrdersIndexer) {
        const ix = await this.program.methods.createOpenOrdersIndexer().accounts({
            openOrdersIndexer,
            owner: this.walletPk,
            payer: this.walletPk,
            systemProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SystemProgram"].programId
        }).instruction();
        return await this.sendAndConfirmTransaction([
            ix
        ]);
    }
    async createOpenOrdersIndexerIx(openOrdersIndexer, owner = this.walletPk) {
        return await this.program.methods.createOpenOrdersIndexer().accounts({
            openOrdersIndexer,
            owner,
            payer: this.walletPk
        }).instruction();
    }
    async findAllOpenOrders(owner = this.walletPk) {
        const indexer = this.findOpenOrdersIndexer(owner);
        const indexerAccount = await this.deserializeOpenOrdersIndexerAccount(indexer);
        return indexerAccount?.addresses ?? [];
    }
    findOpenOrderAtIndex(owner = this.walletPk, accountIndex) {
        const [openOrders] = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"].findProgramAddressSync([
            Buffer.from('OpenOrders'),
            owner.toBuffer(),
            accountIndex.toArrayLike(Buffer, 'le', 4)
        ], this.programId);
        return openOrders;
    }
    async findOpenOrdersForMarket(owner = this.walletPk, market) {
        const openOrdersForMarket = [];
        const allOpenOrders = await this.findAllOpenOrders(owner);
        for await (const openOrders of allOpenOrders){
            const openOrdersAccount = await this.deserializeOpenOrderAccount(openOrders);
            if (openOrdersAccount?.market.toString() === market.toString()) {
                openOrdersForMarket.push(openOrders);
            }
        }
        return openOrdersForMarket;
    }
    // If the owner doesn't have an open order indexer, this ix will also add the creation of it.
    // An open order indexer is needed before creating an open orders account.
    async createOpenOrdersIx(market, name, owner = this.walletPk, delegateAccount, openOrdersIndexer) {
        const ixs = [];
        let accountIndex = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](1);
        if (openOrdersIndexer == null) openOrdersIndexer = this.findOpenOrdersIndexer(owner);
        try {
            const storedIndexer = await this.deserializeOpenOrdersIndexerAccount(openOrdersIndexer);
            if (storedIndexer == null) {
                ixs.push(await this.createOpenOrdersIndexerIx(openOrdersIndexer, owner));
            } else {
                accountIndex = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](storedIndexer.createdCounter + 1);
            }
        } catch  {
            ixs.push(await this.createOpenOrdersIndexerIx(openOrdersIndexer, owner));
        }
        const openOrdersAccount = this.findOpenOrderAtIndex(owner, accountIndex);
        ixs.push(await this.program.methods.createOpenOrdersAccount(name).accounts({
            openOrdersIndexer,
            openOrdersAccount,
            market,
            owner,
            delegateAccount,
            payer: this.walletPk
        }).instruction());
        return [
            ixs,
            openOrdersAccount
        ];
    }
    async createOpenOrders(payer, market, name, owner = payer, delegateAccount = null) {
        const [ixs, openOrdersAccount] = await this.createOpenOrdersIx(market, name, owner.publicKey, delegateAccount);
        const additionalSigners = [
            payer
        ];
        if (owner !== payer) {
            additionalSigners.push(owner);
        }
        await this.sendAndConfirmTransaction(ixs, {
            additionalSigners
        });
        return openOrdersAccount;
    }
    async depositIx(openOrdersPublicKey, openOrdersAccount, market, userBaseAccount, userQuoteAccount, baseAmount, quoteAmount) {
        const ix = await this.program.methods.deposit(baseAmount, quoteAmount).accounts({
            owner: openOrdersAccount.owner,
            market: openOrdersAccount.market,
            openOrdersAccount: openOrdersPublicKey,
            userBaseAccount,
            userQuoteAccount,
            marketBaseVault: market.marketBaseVault,
            marketQuoteVault: market.marketQuoteVault,
            tokenProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TOKEN_PROGRAM_ID"]
        }).instruction();
        return ix;
    }
    async depositNativeIx(openOrdersPublicKey, openOrdersAccount, market, userBaseAccount, userQuoteAccount, baseAmount, quoteAmount) {
        const wrappedSolAccount = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Keypair"]();
        let preInstructions = [];
        let postInstructions = [];
        const additionalSigners = [];
        const lamports = baseAmount.add(new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](1e7));
        preInstructions = [
            __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SystemProgram"].createAccount({
                fromPubkey: openOrdersAccount.owner,
                newAccountPubkey: wrappedSolAccount.publicKey,
                lamports: lamports.toNumber(),
                space: 165,
                programId: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TOKEN_PROGRAM_ID"]
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$instructions$2f$initializeAccount3$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createInitializeAccount3Instruction"])(wrappedSolAccount.publicKey, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NATIVE_MINT"], openOrdersAccount.owner)
        ];
        postInstructions = [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$instructions$2f$closeAccount$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createCloseAccountInstruction"])(wrappedSolAccount.publicKey, openOrdersAccount.owner, openOrdersAccount.owner)
        ];
        additionalSigners.push(wrappedSolAccount);
        const ix = await this.program.methods.deposit(baseAmount, quoteAmount).accounts({
            owner: openOrdersAccount.owner,
            market: openOrdersAccount.market,
            openOrdersAccount: openOrdersPublicKey,
            userBaseAccount,
            userQuoteAccount,
            marketBaseVault: market.marketBaseVault,
            marketQuoteVault: market.marketQuoteVault,
            tokenProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TOKEN_PROGRAM_ID"]
        }).instruction();
        return [
            [
                ...preInstructions,
                ix,
                ...postInstructions
            ],
            additionalSigners
        ];
    }
    decodeMarket(data) {
        return this.program.coder.accounts.decode('market', data);
    }
    async placeOrderIx(openOrdersPublicKey, marketPublicKey, market, userTokenAccount, args, remainingAccounts, openOrdersDelegate) {
        const marketVault = args.side.bid ? market.marketQuoteVault : market.marketBaseVault;
        const accountsMeta = remainingAccounts.map((remaining)=>({
                pubkey: remaining,
                isSigner: false,
                isWritable: true
            }));
        const openOrdersAdmin = market.openOrdersAdmin.key.equals(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"].default) ? null : market.openOrdersAdmin.key;
        const ix = await this.program.methods.placeOrder(args).accounts({
            signer: openOrdersDelegate?.publicKey ?? this.walletPk,
            asks: market.asks,
            bids: market.bids,
            marketVault,
            eventHeap: market.eventHeap,
            market: marketPublicKey,
            openOrdersAccount: openOrdersPublicKey,
            oracleA: market.oracleA.key,
            oracleB: market.oracleB.key,
            userTokenAccount,
            tokenProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TOKEN_PROGRAM_ID"],
            openOrdersAdmin
        }).remainingAccounts(accountsMeta).instruction();
        const signers = [];
        if (openOrdersDelegate != null) {
            signers.push(openOrdersDelegate);
        }
        return [
            ix,
            signers
        ];
    }
    async placeOrderPeggedIx(openOrdersPublicKey, marketPublicKey, market, userTokenAccount, openOrdersAdmin, args, remainingAccounts, openOrdersDelegate) {
        const marketVault = args.side.bid ? market.marketQuoteVault : market.marketBaseVault;
        const accountsMeta = remainingAccounts.map((remaining)=>({
                pubkey: remaining,
                isSigner: false,
                isWritable: true
            }));
        const ix = await this.program.methods.placeOrderPegged(args).accounts({
            signer: openOrdersDelegate != null ? openOrdersDelegate.publicKey : this.walletPk,
            asks: market.asks,
            bids: market.bids,
            marketVault,
            eventHeap: market.eventHeap,
            market: marketPublicKey,
            openOrdersAccount: openOrdersPublicKey,
            oracleA: market.oracleA.key,
            oracleB: market.oracleB.key,
            userTokenAccount,
            tokenProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TOKEN_PROGRAM_ID"],
            openOrdersAdmin
        }).remainingAccounts(accountsMeta).instruction();
        const signers = [];
        if (openOrdersDelegate != null) {
            signers.push(openOrdersDelegate);
        }
        return [
            ix,
            signers
        ];
    }
    async placeTakeOrderIx(marketPublicKey, market, userBaseAccount, userQuoteAccount, openOrdersAdmin, args, remainingAccounts, openOrdersDelegate) {
        const accountsMeta = remainingAccounts.map((remaining)=>({
                pubkey: remaining,
                isSigner: false,
                isWritable: true
            }));
        const ix = await this.program.methods.placeTakeOrder(args).accounts({
            signer: openOrdersDelegate != null ? openOrdersDelegate.publicKey : this.walletPk,
            penaltyPayer: this.walletPk,
            asks: market.asks,
            bids: market.bids,
            eventHeap: market.eventHeap,
            market: marketPublicKey,
            oracleA: market.oracleA.key,
            oracleB: market.oracleB.key,
            userBaseAccount,
            userQuoteAccount,
            marketBaseVault: market.marketBaseVault,
            marketQuoteVault: market.marketQuoteVault,
            marketAuthority: market.marketAuthority,
            tokenProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TOKEN_PROGRAM_ID"],
            openOrdersAdmin,
            systemProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SystemProgram"].programId
        }).remainingAccounts(accountsMeta).instruction();
        const signers = [];
        if (openOrdersDelegate != null) {
            signers.push(openOrdersDelegate);
        }
        return [
            ix,
            signers
        ];
    }
    // Use OrderType from './utils/utils' for orderType
    async cancelAllAndPlaceOrdersIx(openOrdersPublicKey, marketPublicKey, market, userBaseAccount, userQuoteAccount, openOrdersAdmin, orderType, bids, asks, limit = 12, openOrdersDelegate) {
        const ix = await this.program.methods.cancelAllAndPlaceOrders(orderType, bids, asks, limit).accounts({
            signer: openOrdersDelegate != null ? openOrdersDelegate.publicKey : this.walletPk,
            asks: market.asks,
            bids: market.bids,
            marketQuoteVault: market.marketQuoteVault,
            marketBaseVault: market.marketBaseVault,
            eventHeap: market.eventHeap,
            market: marketPublicKey,
            openOrdersAccount: openOrdersPublicKey,
            oracleA: market.oracleA.key,
            oracleB: market.oracleB.key,
            userBaseAccount,
            userQuoteAccount,
            tokenProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TOKEN_PROGRAM_ID"],
            openOrdersAdmin
        }).instruction();
        const signers = [];
        if (openOrdersDelegate != null) {
            signers.push(openOrdersDelegate);
        }
        return [
            ix,
            signers
        ];
    }
    // Use OrderType from './utils/utils' for orderType
    async placeOrdersIx(openOrdersPublicKey, marketPublicKey, market, userBaseAccount, userQuoteAccount, openOrdersAdmin, orderType, bids, asks, limit = 12, openOrdersDelegate) {
        const ix = await this.program.methods.placeOrders(orderType, bids, asks, limit).accounts({
            signer: openOrdersDelegate != null ? openOrdersDelegate.publicKey : this.walletPk,
            asks: market.asks,
            bids: market.bids,
            marketQuoteVault: market.marketQuoteVault,
            marketBaseVault: market.marketBaseVault,
            eventHeap: market.eventHeap,
            market: marketPublicKey,
            openOrdersAccount: openOrdersPublicKey,
            oracleA: market.oracleA.key,
            oracleB: market.oracleB.key,
            userBaseAccount,
            userQuoteAccount,
            tokenProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TOKEN_PROGRAM_ID"],
            openOrdersAdmin
        }).instruction();
        const signers = [];
        if (openOrdersDelegate != null) {
            signers.push(openOrdersDelegate);
        }
        return [
            ix,
            signers
        ];
    }
    async cancelOrderByIdIx(openOrdersPublicKey, openOrdersAccount, market, orderId, openOrdersDelegate) {
        const ix = await this.program.methods.cancelOrder(orderId).accounts({
            signer: openOrdersAccount.owner,
            asks: market.asks,
            bids: market.bids,
            market: openOrdersAccount.market,
            openOrdersAccount: openOrdersPublicKey
        }).instruction();
        const signers = [];
        if (openOrdersDelegate != null) {
            signers.push(openOrdersDelegate);
        }
        return [
            ix,
            signers
        ];
    }
    async cancelOrderByClientIdIx(openOrdersPublicKey, openOrdersAccount, market, clientOrderId, openOrdersDelegate) {
        const ix = await this.program.methods.cancelOrderByClientOrderId(clientOrderId).accounts({
            signer: openOrdersAccount.owner,
            asks: market.asks,
            bids: market.bids,
            market: openOrdersAccount.market,
            openOrdersAccount: openOrdersPublicKey
        }).instruction();
        const signers = [];
        if (openOrdersDelegate != null) {
            signers.push(openOrdersDelegate);
        }
        return [
            ix,
            signers
        ];
    }
    async cancelAllOrdersIx(openOrdersPublicKey, openOrdersAccount, market, limit, side, openOrdersDelegate) {
        const ix = await this.program.methods.cancelAllOrders(side, limit).accounts({
            signer: openOrdersAccount.owner,
            asks: market.asks,
            bids: market.bids,
            market: openOrdersAccount.market,
            openOrdersAccount: openOrdersPublicKey
        }).instruction();
        const signers = [];
        if (openOrdersDelegate != null) {
            signers.push(openOrdersDelegate);
        }
        return [
            ix,
            signers
        ];
    }
    async closeOpenOrdersIndexerIx(owner, market, openOrdersIndexer) {
        if (openOrdersIndexer == null) {
            openOrdersIndexer = this.findOpenOrdersIndexer(owner.publicKey);
        }
        if (openOrdersIndexer !== null) {
            const ix = await this.program.methods.closeOpenOrdersIndexer().accounts({
                owner: owner.publicKey,
                openOrdersIndexer: market.asks,
                solDestination: market.bids,
                tokenProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TOKEN_PROGRAM_ID"]
            }).instruction();
            const additionalSigners = [];
            if (owner.publicKey !== this.walletPk) {
                additionalSigners.push(owner);
            }
            return [
                ix,
                additionalSigners
            ];
        }
        throw new Error('No open order indexer for the specified owner');
    }
    async settleFundsIx(openOrdersPublicKey, openOrdersAccount, marketPublicKey, market, userBaseAccount, userQuoteAccount, referrerAccount, penaltyPayer, openOrdersDelegate) {
        const ix = await this.program.methods.settleFunds().accounts({
            owner: openOrdersDelegate?.publicKey ?? openOrdersAccount.owner,
            market: marketPublicKey,
            openOrdersAccount: openOrdersPublicKey,
            marketAuthority: market.marketAuthority,
            marketBaseVault: market.marketBaseVault,
            marketQuoteVault: market.marketQuoteVault,
            tokenProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TOKEN_PROGRAM_ID"],
            systemProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SystemProgram"].programId,
            userBaseAccount: userBaseAccount,
            userQuoteAccount: userQuoteAccount,
            referrerAccount: referrerAccount,
            penaltyPayer: penaltyPayer
        }).instruction();
        const signers = [];
        if (openOrdersDelegate != null) {
            signers.push(openOrdersDelegate);
        }
        return [
            ix,
            signers
        ];
    }
    async closeOpenOrdersAccountIx(owner, openOrdersPublicKey, solDestination = this.walletPk, openOrdersIndexer) {
        if (openOrdersIndexer == null) {
            openOrdersIndexer = this.findOpenOrdersIndexer(owner.publicKey);
        }
        if (openOrdersIndexer !== null) {
            const ix = await this.program.methods.closeOpenOrdersAccount().accounts({
                owner: owner.publicKey,
                openOrdersIndexer,
                openOrdersAccount: openOrdersPublicKey,
                solDestination,
                systemProgram: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SystemProgram"].programId
            }).instruction();
            const additionalSigners = [];
            if (owner.publicKey !== this.walletPk) {
                additionalSigners.push(owner);
            }
            return [
                ix,
                additionalSigners
            ];
        }
        throw new Error('No open order indexer for the specified owner');
    }
    // Use getAccountsToConsume as a helper
    async consumeEventsIx(marketPublicKey, market, limit, remainingAccounts) {
        const accountsMeta = remainingAccounts.map((remaining)=>({
                pubkey: remaining,
                isSigner: false,
                isWritable: true
            }));
        const eventAdminBs58 = market.consumeEventsAdmin.key.toBase58();
        const consumeEventsAdmin = eventAdminBs58 === __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"].default.toBase58() ? null : market.consumeEventsAdmin.key;
        const ix = await this.program.methods.consumeEvents(limit).accounts({
            eventHeap: market.eventHeap,
            market: marketPublicKey,
            consumeEventsAdmin
        }).remainingAccounts(accountsMeta).instruction();
        return ix;
    }
    // Consume events for one specific account. Add other extra accounts as it's "free".
    async consumeEventsForAccountIx(marketPublicKey, market, openOrdersAccount) {
        const slots = await this.getSlotsToConsume(openOrdersAccount, market);
        const allAccounts = await this.getAccountsToConsume(market);
        // Create a set to remove duplicates
        const uniqueAccounts = new Set([
            openOrdersAccount,
            ...allAccounts
        ]);
        // Limit extra accounts to 10 due tx limit and add openOrdersAccount
        const remainingAccounts = [
            ...uniqueAccounts
        ].slice(0, 10);
        const accountsMeta = remainingAccounts.map((remaining)=>({
                pubkey: remaining,
                isSigner: false,
                isWritable: true
            }));
        const ix = await this.program.methods.consumeGivenEvents(slots).accounts({
            eventHeap: market.eventHeap,
            market: marketPublicKey,
            consumeEventsAdmin: market.consumeEventsAdmin.key
        }).remainingAccounts(accountsMeta).instruction();
        return ix;
    }
    // In order to get slots for certain key use getSlotsToConsume and include the key in the remainingAccounts
    async consumeGivenEventsIx(marketPublicKey, market, slots, remainingAccounts) {
        const accountsMeta = remainingAccounts.map((remaining)=>({
                pubkey: remaining,
                isSigner: false,
                isWritable: true
            }));
        const ix = await this.program.methods.consumeGivenEvents(slots).accounts({
            eventHeap: market.eventHeap,
            market: marketPublicKey,
            consumeEventsAdmin: market.consumeEventsAdmin.key
        }).remainingAccounts(accountsMeta).instruction();
        return ix;
    }
    async pruneOrdersIx(marketPublicKey, market, openOrdersPublicKey, limit, closeMarketAdmin = null) {
        const ix = await this.program.methods.pruneOrders(limit).accounts({
            closeMarketAdmin: market.closeMarketAdmin.key,
            openOrdersAccount: openOrdersPublicKey,
            market: marketPublicKey,
            bids: market.bids,
            asks: market.asks
        }).instruction();
        const signers = [];
        if (this.walletPk !== market.closeMarketAdmin.key && closeMarketAdmin !== null) {
            signers.push(closeMarketAdmin);
        }
        return [
            ix,
            signers
        ];
    }
    async getAccountsToConsume(market) {
        let accounts = new Array();
        const eventHeap = await this.deserializeEventHeapAccount(market.eventHeap);
        if (eventHeap != null) {
            for (const node of eventHeap.nodes){
                if (node.event.eventType === 0) {
                    const fillEvent = this.program.coder.types.decode('FillEvent', Buffer.from([
                        0,
                        ...node.event.padding
                    ]));
                    accounts = accounts.filter((a)=>a !== fillEvent.maker).concat([
                        fillEvent.maker
                    ]);
                } else {
                    const outEvent = this.program.coder.types.decode('OutEvent', Buffer.from([
                        0,
                        ...node.event.padding
                    ]));
                    accounts = accounts.filter((a)=>a !== outEvent.owner).concat([
                        outEvent.owner
                    ]);
                }
                // Tx would be too big, do not add more accounts
                if (accounts.length > 20) return accounts;
            }
        }
        return accounts;
    }
    async getSlotsToConsume(key, market) {
        const slots = new Array();
        const eventHeap = await this.deserializeEventHeapAccount(market.eventHeap);
        if (eventHeap != null) {
            for (const [i, node] of eventHeap.nodes.entries()){
                if (node.event.eventType === 0) {
                    const fillEvent = this.program.coder.types.decode('FillEvent', Buffer.from([
                        0,
                        ...node.event.padding
                    ]));
                    if (key === fillEvent.maker) slots.push(new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](i));
                } else {
                    const outEvent = this.program.coder.types.decode('OutEvent', Buffer.from([
                        0,
                        ...node.event.padding
                    ]));
                    if (key === outEvent.owner) slots.push(new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](i));
                }
            }
        }
        return slots;
    }
}
async function getFilteredProgramAccounts(connection, programId, filters) {
    // @ts-expect-error not need check
    const resp = await connection._rpcRequest('getProgramAccounts', [
        programId.toBase58(),
        {
            commitment: connection.commitment,
            filters,
            encoding: 'base64'
        }
    ]);
    if (resp.error !== null) {
        throw new Error(resp.error.message);
    }
    return resp.result.map(({ pubkey, account: { data, executable, owner, lamports } })=>({
            publicKey: new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"](pubkey),
            accountInfo: {
                data: Buffer.from(data[0], 'base64'),
                executable,
                owner: new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"](owner),
                lamports
            }
        }));
}
}),
"[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/utils/utils.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "I64_MAX_BN",
    ()=>I64_MAX_BN,
    "ORDER_FEE_UNIT",
    ()=>ORDER_FEE_UNIT,
    "PlaceOrderTypeUtils",
    ()=>PlaceOrderTypeUtils,
    "SelfTradeBehaviorUtils",
    ()=>SelfTradeBehaviorUtils,
    "SideUtils",
    ()=>SideUtils,
    "U64_MAX_BN",
    ()=>U64_MAX_BN,
    "bpsToDecimal",
    ()=>bpsToDecimal,
    "createAssociatedTokenAccountIdempotentInstruction",
    ()=>createAssociatedTokenAccountIdempotentInstruction,
    "getAssociatedTokenAddress",
    ()=>getAssociatedTokenAddress,
    "percentageToDecimal",
    ()=>percentageToDecimal,
    "sleep",
    ()=>sleep,
    "toNative",
    ()=>toNative,
    "toUiDecimals",
    ()=>toUiDecimals
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bn.js@5.2.2/node_modules/bn.js/lib/bn.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.4.13_@solana+web3.js@1.98.4_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/esm/constants.js [app-route] (ecmascript)");
;
;
;
const SideUtils = {
    Bid: {
        bid: {}
    },
    Ask: {
        ask: {}
    }
};
const PlaceOrderTypeUtils = {
    Limit: {
        limit: {}
    },
    ImmediateOrCancel: {
        immediateOrCancel: {}
    },
    FillOrKill: {
        fillOrKill: {}
    },
    PostOnly: {
        postOnly: {}
    },
    Market: {
        market: {}
    },
    PostOnlySlide: {
        postOnlySlide: {}
    }
};
const SelfTradeBehaviorUtils = {
    DecrementTake: {
        decrementTake: {}
    },
    CancelProvide: {
        cancelProvide: {}
    },
    AbortTransaction: {
        abortTransaction: {}
    }
};
const U64_MAX_BN = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]('18446744073709551615');
const I64_MAX_BN = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]('9223372036854775807').toTwos(64);
const ORDER_FEE_UNIT = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](1e6);
function bpsToDecimal(bps) {
    return bps / 10000;
}
function percentageToDecimal(percentage) {
    return percentage / 100;
}
function toNative(uiAmount, decimals) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]((uiAmount * Math.pow(10, decimals)).toFixed(0));
}
function toUiDecimals(nativeAmount, decimals) {
    return nativeAmount / Math.pow(10, decimals);
}
async function getAssociatedTokenAddress(mint, owner, allowOwnerOffCurve = true, programId = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TOKEN_PROGRAM_ID"], associatedTokenProgramId = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ASSOCIATED_TOKEN_PROGRAM_ID"]) {
    if (!allowOwnerOffCurve && !__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"].isOnCurve(owner.toBuffer())) throw new Error('TokenOwnerOffCurve!');
    const [address] = await __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"].findProgramAddress([
        owner.toBuffer(),
        programId.toBuffer(),
        mint.toBuffer()
    ], associatedTokenProgramId);
    return address;
}
async function createAssociatedTokenAccountIdempotentInstruction(payer, owner, mint) {
    const account = await getAssociatedTokenAddress(mint, owner);
    return new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TransactionInstruction"]({
        keys: [
            {
                pubkey: payer,
                isSigner: true,
                isWritable: true
            },
            {
                pubkey: account,
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
                pubkey: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SystemProgram"].programId,
                isSigner: false,
                isWritable: false
            },
            {
                pubkey: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TOKEN_PROGRAM_ID"],
                isSigner: false,
                isWritable: false
            }
        ],
        programId: __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ASSOCIATED_TOKEN_PROGRAM_ID"],
        data: Buffer.from([
            0x1
        ])
    });
}
function sleep(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms));
}
}),
"[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/structs/order.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Order",
    ()=>Order
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$29$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bn.js@5.2.2/node_modules/bn.js/lib/bn.js [app-route] (ecmascript) <export default as BN>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/utils/utils.js [app-route] (ecmascript)");
;
;
class Order {
    market;
    leafNode;
    side;
    isExpired;
    isOraclePegged;
    seqNum;
    priceLots;
    constructor(market, leafNode, side, isExpired = false, isOraclePegged = false){
        this.market = market;
        this.leafNode = leafNode;
        this.side = side;
        this.isExpired = isExpired;
        this.isOraclePegged = isOraclePegged;
        this.seqNum = this.side.bid ? __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["U64_MAX_BN"].sub(this.leafNode.key.maskn(64)) : this.leafNode.key.maskn(64);
        const priceData = this.leafNode.key.ushrn(64);
        if (this.isOraclePegged) {
            const priceOffset = priceData.sub(new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](1).ushln(63));
            throw new Error('Not implemented yet');
        // TODO: add oracle price logic to Market
        } else {
            this.priceLots = priceData;
        }
    }
    get price() {
        return this.market.priceLotsToUi(this.priceLots);
    }
    get size() {
        return this.market.baseLotsToUi(this.leafNode.quantity);
    }
    get sizeLots() {
        return this.leafNode.quantity;
    }
    toPrettyString() {
        return `side:${this.side.bid ? 'bid' : 'ask'} price:${this.price} size:${this.size} seqNum:${this.seqNum.toString()} expired:${this.isExpired}`;
    }
}
}),
"[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/accounts/bookSide.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BookSide",
    ()=>BookSide
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/utils/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$29$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bn.js@5.2.2/node_modules/bn.js/lib/bn.js [app-route] (ecmascript) <export default as BN>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$structs$2f$order$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/structs/order.js [app-route] (ecmascript)");
;
;
;
function decodeOrderTreeRootStruct(data) {
    const maybeNode = data.readUInt32LE(0);
    const leafCount = data.readUInt32LE(4);
    return {
        maybeNode,
        leafCount
    };
}
class BookSide {
    market;
    pubkey;
    account;
    side;
    clusterTime;
    constructor(market, pubkey, account, side){
        this.market = market;
        this.pubkey = pubkey;
        this.account = account;
        this.side = side;
        this.clusterTime = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](0);
    }
    static decodeAccountfromBuffer(data) {
        // TODO: add discriminator parsing & check
        const roots = [
            decodeOrderTreeRootStruct(data.subarray(8)),
            decodeOrderTreeRootStruct(data.subarray(16))
        ];
        // skip reserved
        let offset = 56 + 256;
        const orderTreeType = data.readUInt8(offset);
        const bumpIndex = data.readUInt32LE(offset + 4);
        const freeListLen = data.readUInt32LE(offset + 8);
        const freeListHead = data.readUInt32LE(offset + 12);
        // skip more reserved data
        offset += 16 + 512;
        const nodes = [];
        for(let i = 0; i < 1024; ++i){
            const tag = data.readUInt8(offset);
            const nodeData = data.subarray(offset, offset + 88);
            nodes.push({
                tag,
                nodeData
            });
            offset += 88;
        }
        // this result has a slightly different layout than the regular account
        // it doesn't include reserved data and it's AnyNodes don't have the field
        // data: number[] (excluding the tag prefix byte)
        // but nodeData: Buffer (including the tag prefix byte)
        const result = {
            roots,
            nodes: {
                orderTreeType,
                bumpIndex,
                freeListLen,
                freeListHead,
                nodes
            }
        };
        return result;
    }
    *items() {
        const fGen = this.fixedItems();
        const oPegGen = this.oraclePeggedItems();
        let fOrderRes = fGen.next();
        let oPegOrderRes = oPegGen.next();
        while(true){
            if (fOrderRes.value && oPegOrderRes.value) {
                if (this.compareOrders(fOrderRes.value, oPegOrderRes.value)) {
                    yield fOrderRes.value;
                    fOrderRes = fGen.next();
                } else {
                    yield oPegOrderRes.value;
                    oPegOrderRes = oPegGen.next();
                }
            } else if (fOrderRes.value && !oPegOrderRes.value) {
                yield fOrderRes.value;
                fOrderRes = fGen.next();
            } else if (!fOrderRes.value && oPegOrderRes.value) {
                yield oPegOrderRes.value;
                oPegOrderRes = oPegGen.next();
            } else if (!fOrderRes.value && !oPegOrderRes.value) {
                break;
            }
        }
    }
    get rootFixed() {
        return this.account.roots[0];
    }
    get rootOraclePegged() {
        return this.account.roots[1];
    }
    *fixedItems() {
        if (this.rootFixed.leafCount === 0) {
            return;
        }
        const stack = [
            this.rootFixed.maybeNode
        ];
        const [left, right] = this.side.bid ? [
            1,
            0
        ] : [
            0,
            1
        ];
        while(stack.length > 0){
            const index = stack.pop();
            const node = this.account.nodes.nodes[index];
            if (node.tag === BookSide.INNER_NODE_TAG) {
                const innerNode = this.toInnerNode(node);
                stack.push(innerNode.children[right], innerNode.children[left]);
            } else if (node.tag === BookSide.LEAF_NODE_TAG) {
                const leafNode = this.toLeafNode(node);
                const expiryTimestamp = leafNode.timeInForce ? leafNode.timestamp.add(new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](leafNode.timeInForce)) : __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["U64_MAX_BN"];
                yield new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$structs$2f$order$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Order"](this.market, leafNode, this.side, this.clusterTime.gt(expiryTimestamp));
            }
        }
    }
    *oraclePeggedItems() {
        if (this.rootOraclePegged.leafCount === 0) {
            return;
        }
        const stack = [
            this.rootOraclePegged.maybeNode
        ];
        const [left, right] = this.side.bid ? [
            1,
            0
        ] : [
            0,
            1
        ];
        while(stack.length > 0){
            const index = stack.pop();
            const node = this.account.nodes.nodes[index];
            if (node.tag === BookSide.INNER_NODE_TAG) {
                const innerNode = this.toInnerNode(node);
                stack.push(innerNode.children[right], innerNode.children[left]);
            } else if (node.tag === BookSide.LEAF_NODE_TAG) {
                const leafNode = this.toLeafNode(node);
                const expiryTimestamp = leafNode.timeInForce ? leafNode.timestamp.add(new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](leafNode.timeInForce)) : __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["U64_MAX_BN"];
                yield new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$structs$2f$order$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Order"](this.market, leafNode, this.side, this.clusterTime.gt(expiryTimestamp), true);
            }
        }
    }
    compareOrders(a, b) {
        return a.priceLots.eq(b.priceLots) ? a.seqNum.lt(b.seqNum) // if prices are equal prefer orders in the order they are placed
         : this.side.bid // else compare the actual prices
         ? a.priceLots.gt(b.priceLots) : b.priceLots.gt(a.priceLots);
    }
    best() {
        return this.items().next().value;
    }
    getL2(depth) {
        const levels = [];
        for (const { priceLots, sizeLots } of this.items()){
            if (levels.length > 0 && levels[levels.length - 1][0].eq(priceLots)) {
                levels[levels.length - 1][1].iadd(sizeLots);
            } else if (levels.length === depth) {
                break;
            } else {
                levels.push([
                    priceLots,
                    sizeLots
                ]);
            }
        }
        return levels.map(([priceLots, sizeLots])=>[
                this.market.priceLotsToUi(priceLots),
                this.market.baseLotsToUi(sizeLots),
                priceLots,
                sizeLots
            ]);
    }
    static INNER_NODE_TAG = 1;
    static LEAF_NODE_TAG = 2;
    toInnerNode(node) {
        const layout = this.market.client.program._coder.types.typeLayouts.get('InnerNode');
        // need to differentiate between accounts loaded via anchor and decodeAccountfromBuffer
        if ('nodeData' in node) {
            return layout.decode(node['nodeData']);
        } else {
            return layout.decode(Buffer.from([
                BookSide.INNER_NODE_TAG
            ].concat(node.data)));
        }
    }
    toLeafNode(node) {
        const layout = this.market.client.program._coder.types.typeLayouts.get('LeafNode');
        // need to differentiate between accounts loaded via anchor and decodeAccountfromBuffer
        if ('nodeData' in node) {
            return layout.decode(node['nodeData']);
        } else {
            return layout.decode(Buffer.from([
                BookSide.LEAF_NODE_TAG
            ].concat(node.data)));
        }
    }
}
}),
"[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/accounts/eventHeap.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EventHeap",
    ()=>EventHeap,
    "EventType",
    ()=>EventType
]);
var EventType;
(function(EventType) {
    EventType[EventType["Fill"] = 0] = "Fill";
    EventType[EventType["Out"] = 1] = "Out";
})(EventType || (EventType = {}));
class EventHeap {
    pubkey;
    account;
    market;
    constructor(pubkey, account, market){
        this.pubkey = pubkey;
        this.account = account;
        this.market = market;
    }
    *rawEvents() {
        let currentIndex = this.account.header.usedHead;
        for(let i = 0; i < this.account.header.count; ++i){
            const { event, next } = this.account.nodes[currentIndex];
            yield event;
            currentIndex = next;
        }
    }
    *parsedEvents() {
        const { decode } = this.market.client.program.coder.types;
        for (const event of this.rawEvents()){
            // TODO find out how not to re-allocate
            const buffer = Buffer.from([
                event.eventType
            ].concat(event.padding));
            switch(event.eventType){
                case EventType.Fill:
                    {
                        yield decode('FillEvent', buffer);
                        continue;
                    }
                case EventType.Out:
                    {
                        yield decode('OutEvent', buffer);
                        continue;
                    }
            }
        }
    }
}
}),
"[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/accounts/market.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Market",
    ()=>Market
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/big.js@6.2.2/node_modules/big.js/big.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$29$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bn.js@5.2.2/node_modules/bn.js/lib/bn.js [app-route] (ecmascript) <export default as BN>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/utils/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$bookSide$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/accounts/bookSide.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/client.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$eventHeap$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/accounts/eventHeap.js [app-route] (ecmascript)");
;
;
;
;
const FEES_SCALE_FACTOR = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](1_000_000);
class Market {
    client;
    pubkey;
    account;
    minOrderSize;
    tickSize;
    quoteLotFactor;
    baseNativeFactor;
    quoteNativeFactor;
    /**
     * use async loadBids() or loadOrderBook() to populate bids
     */ bids;
    /**
     * use async loadAsks() or loadOrderBook() to populate asks
     */ asks;
    eventHeap;
    constructor(client, pubkey, account){
        this.client = client;
        this.pubkey = pubkey;
        this.account = account;
        this.baseNativeFactor = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](10).pow(-account.baseDecimals);
        this.quoteNativeFactor = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](10).pow(-account.quoteDecimals);
        this.minOrderSize = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](account.baseLotSize.toString()).mul(this.baseNativeFactor);
        this.quoteLotFactor = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](account.quoteLotSize.toString()).mul(this.quoteNativeFactor);
        this.tickSize = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](10).pow(account.baseDecimals - account.quoteDecimals).mul(new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](account.quoteLotSize.toString())).div(new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](account.baseLotSize.toString()));
    }
    static async load(client, pubkey) {
        const account = await client.program.account.market.fetch(pubkey);
        return new Market(client, pubkey, account);
    }
    baseLotsToUi(lots) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](lots.toString()).mul(this.minOrderSize).toNumber();
    }
    baseNativeToUi(native) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](native.toString()).mul(this.baseNativeFactor).toNumber();
    }
    quoteLotsToUi(lots) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](lots.toString()).mul(this.quoteLotFactor).toNumber();
    }
    quoteNativeToUi(native) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](native.toString()).mul(this.quoteNativeFactor).toNumber();
    }
    priceLotsToUi(lots) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](lots.toString()).mul(this.tickSize).toNumber();
    }
    baseUiToLots(uiAmount) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toNative"])(uiAmount, this.account.baseDecimals).div(this.account.baseLotSize);
    }
    quoteUiToLots(uiAmount) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toNative"])(uiAmount, this.account.quoteDecimals).div(this.account.quoteLotSize);
    }
    priceUiToLots(uiAmount) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toNative"])(uiAmount * Number(this.account.baseLotSize.toString()), this.account.quoteDecimals).div(new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](Math.pow(10, this.account.baseDecimals)).imul(this.account.quoteLotSize));
    }
    makerFeeFloor(quoteNative) {
        return quoteNative.mul(this.account.makerFee).div(FEES_SCALE_FACTOR);
    }
    async loadBids() {
        const bidsAi = await this.client.connection.getAccountInfo(this.account.bids);
        this.bids = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$bookSide$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BookSide"](this, this.account.bids, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$bookSide$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BookSide"].decodeAccountfromBuffer(bidsAi.data), __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SideUtils"].Bid);
        return this.bids;
    }
    async loadAsks() {
        const asksAi = await this.client.connection.getAccountInfo(this.account.asks);
        this.asks = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$bookSide$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BookSide"](this, this.account.asks, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$bookSide$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BookSide"].decodeAccountfromBuffer(asksAi.data), __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SideUtils"].Ask);
        return this.asks;
    }
    async loadEventHeap() {
        const eventHeap = await this.client.program.account.eventHeap.fetch(this.account.eventHeap);
        this.eventHeap = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$eventHeap$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EventHeap"](this.account.eventHeap, eventHeap, this);
        return this.eventHeap;
    }
    async loadOrderBook() {
        await Promise.all([
            this.loadBids(),
            this.loadAsks()
        ]);
        return this;
    }
    toPrettyString() {
        const mkt = this.account;
        let debug = `Market: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["nameToString"])(mkt.name)}\n`;
        debug += ` authority: ${mkt.marketAuthority.toBase58()}\n`;
        debug += ` collectFeeAdmin: ${mkt.collectFeeAdmin.toBase58()}\n`;
        if (!mkt.openOrdersAdmin.key.equals(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"].default)) debug += ` openOrdersAdmin: ${mkt.openOrdersAdmin.key.toBase58()}\n`;
        if (!mkt.consumeEventsAdmin.key.equals(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"].default)) debug += ` consumeEventsAdmin: ${mkt.consumeEventsAdmin.key.toBase58()}\n`;
        if (!mkt.closeMarketAdmin.key.equals(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"].default)) debug += ` closeMarketAdmin: ${mkt.closeMarketAdmin.key.toBase58()}\n`;
        debug += ` baseMint: ${mkt.baseMint.toBase58()}\n`;
        debug += ` quoteMint: ${mkt.quoteMint.toBase58()}\n`;
        debug += ` marketBaseVault: ${mkt.marketBaseVault.toBase58()}\n`;
        debug += ` marketQuoteVault: ${mkt.marketQuoteVault.toBase58()}\n`;
        if (!mkt.oracleA.key.equals(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"].default)) {
            debug += ` oracleConfig: { confFilter: ${mkt.oracleConfig.confFilter}, maxStalenessSlots: ${mkt.oracleConfig.maxStalenessSlots.toString()} }\n`;
            debug += ` oracleA: ${mkt.oracleA.key.toBase58()}\n`;
        }
        if (!mkt.oracleB.key.equals(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"].default)) debug += ` oracleB: ${mkt.oracleB.key.toBase58()}\n`;
        debug += ` bids: ${mkt.bids.toBase58()}\n`;
        const bb = this.bids?.best();
        if (bb) {
            debug += `  best: ${bb.price} ${bb.size} ${bb.leafNode.owner.toBase58()}\n`;
        }
        debug += ` asks: ${mkt.asks.toBase58()}\n`;
        const ba = this.asks?.best();
        if (ba) {
            debug += `  best: ${ba.price} ${ba.size} ${ba.leafNode.owner.toBase58()}\n`;
        }
        debug += ` eventHeap: ${mkt.eventHeap.toBase58()}\n`;
        if (this.eventHeap) {
            let fillEvents = 0;
            let outEvents = 0;
            for (const event of this.eventHeap.parsedEvents()){
                switch(event.eventType){
                    case __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$eventHeap$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EventType"].Fill:
                        {
                            fillEvents += 1;
                            continue;
                        }
                    case __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$eventHeap$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EventType"].Out:
                        {
                            outEvents += 1;
                            continue;
                        }
                }
            }
            debug += `  fillEvents: ${fillEvents}\n`;
            debug += `  outEvents: ${outEvents}\n`;
        } else {
            debug += `  loaded: false\n`;
        }
        debug += ` minOrderSize: ${this.minOrderSize}\n`;
        debug += ` tickSize: ${this.tickSize}\n`;
        return debug;
    }
}
}),
"[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/accounts/openOrdersIndexer.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OpenOrdersIndexer",
    ()=>OpenOrdersIndexer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$openOrders$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/accounts/openOrders.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$market$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/accounts/market.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$bookSide$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/accounts/bookSide.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/utils/utils.js [app-route] (ecmascript)");
;
class OpenOrdersIndexer {
    client;
    pubkey;
    account;
    constructor(client, pubkey, account){
        this.client = client;
        this.pubkey = pubkey;
        this.account = account;
    }
    static async load(client, owner) {
        const pubkey = client.findOpenOrdersIndexer(owner);
        const account = await client.program.account.openOrdersIndexer.fetch(pubkey);
        return new OpenOrdersIndexer(client, pubkey, account);
    }
    static async loadNullable(client, owner) {
        const pubkey = client.findOpenOrdersIndexer(owner);
        const account = await client.program.account.openOrdersIndexer.fetchNullable(pubkey);
        return account && new OpenOrdersIndexer(client, pubkey, account);
    }
    async loadAllOpenOrders() {
        const ooPks = this.account.addresses;
        const oos = await this.client.program.account.openOrdersAccount.fetchMultiple(ooPks);
        const marketPks = oos.map((oo)=>oo.market);
        const markets = await this.client.program.account.market.fetchMultiple(marketPks);
        const bookSidePks = markets.flatMap((m)=>[
                m.bids,
                m.asks
            ]);
        const bookSideAis = await this.client.connection.getMultipleAccountsInfo(bookSidePks);
        return oos.map((oo, i)=>{
            const mkt = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$market$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Market"](this.client, marketPks[i], markets[i]);
            mkt.bids = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$bookSide$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BookSide"](mkt, bookSidePks[2 * i], __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$bookSide$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BookSide"].decodeAccountfromBuffer(bookSideAis[2 * i].data), __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SideUtils"].Bid);
            mkt.asks = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$bookSide$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BookSide"](mkt, bookSidePks[2 * i + 1], __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$bookSide$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BookSide"].decodeAccountfromBuffer(bookSideAis[2 * i + 1].data), __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SideUtils"].Ask);
            return new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$openOrders$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenOrders"](ooPks[i], oo, mkt);
        });
    }
}
}),
"[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/accounts/openOrders.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OpenOrders",
    ()=>OpenOrders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$29$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bn.js@5.2.2/node_modules/bn.js/lib/bn.js [app-route] (ecmascript) <export default as BN>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$instructions$2f$associatedTokenAccount$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+spl-token@0.4.13_@solana+web3.js@1.98.4_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@solana/spl-token/lib/esm/instructions/associatedTokenAccount.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/client.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/utils/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$eventHeap$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/accounts/eventHeap.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$openOrdersIndexer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/accounts/openOrdersIndexer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$market$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/accounts/market.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$bookSide$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/accounts/bookSide.js [app-route] (ecmascript)");
;
;
;
;
class OpenOrders {
    pubkey;
    account;
    market;
    delegate;
    constructor(pubkey, account, market){
        this.pubkey = pubkey;
        this.account = account;
        this.market = market;
    }
    /// high-level API
    static async load(pubkey, market, client) {
        client ??= market?.client;
        if (!client) throw new Error('provide either market or client');
        const account = await client.program.account.openOrdersAccount.fetch(pubkey);
        if (!market) {
            market = await __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$market$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Market"].load(client, account.market);
        }
        return new OpenOrders(pubkey, account, market);
    }
    /**
     * Try loading the OpenOrders account associated with a Market
     * @param market
     * @param owner optional if configured already on the Market's client
     * @param indexer optional, pass in to speed up fetch
     * @returns null if the user does not have an OpenOrders account for this market
     */ static async loadNullableForMarketAndOwner(market, owner, indexer) {
        indexer ??= await __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$openOrdersIndexer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenOrdersIndexer"].loadNullable(market.client, owner);
        if (!indexer) return null;
        const ooPks = indexer.account.addresses;
        const ooAccs = await market.client.program.account.openOrdersAccount.fetchMultiple(ooPks);
        const ooIndex = ooAccs.findIndex((o)=>o?.market.equals(market.pubkey));
        if (ooIndex == -1) return null;
        const ooPk = ooPks[ooIndex];
        const ooAcc = ooAccs[ooIndex];
        // note: ooPk & ooAcc most certainly will always be defined here, due to the index check
        return ooPk && ooAcc && new OpenOrders(ooPk, ooAcc, market);
    }
    async reload() {
        // Need to reload orderbooks because not all information about orders, like
        // size, is stored on the open orders account. Do all fetches together to
        // ensure they are synced to the same slot.
        const [bidsAi, asksAi, ooAi] = await this.market.client.connection.getMultipleAccountsInfo([
            this.market.account.bids,
            this.market.account.asks,
            this.pubkey
        ]);
        this.market.bids = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$bookSide$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BookSide"](this.market, this.market.account.bids, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$bookSide$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BookSide"].decodeAccountfromBuffer(bidsAi.data), __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SideUtils"].Bid);
        this.market.asks = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$bookSide$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BookSide"](this.market, this.market.account.asks, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$bookSide$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BookSide"].decodeAccountfromBuffer(asksAi.data), __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SideUtils"].Ask);
        this.account = this.market.client.program.coder.accounts.decode('openOrdersAccount', ooAi.data);
        return this;
    }
    getBalanceNative() {
        const { asksBaseLots, bidsQuoteLots, baseFreeNative, quoteFreeNative, lockedMakerFees } = this.account.position;
        const { baseLotSize, quoteLotSize } = this.market.account;
        // TODO count in lots to save compute
        const base = asksBaseLots.mul(baseLotSize).iadd(baseFreeNative);
        const quote = bidsQuoteLots.mul(quoteLotSize).iadd(quoteFreeNative).iadd(lockedMakerFees);
        if (this.market.eventHeap) {
            for (const event of this.market.eventHeap.parsedEvents()){
                switch(event.eventType){
                    case __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$eventHeap$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EventType"].Fill:
                        {
                            const { maker, quantity, price, takerSide } = event;
                            if (maker.equals(this.account.owner)) {
                                const baseNative = quantity.mul(baseLotSize);
                                const quoteNative = quantity.mul(price).imul(quoteLotSize);
                                const quoteFeesNative = this.market.makerFeeFloor(quoteNative);
                                if (takerSide === 1) {
                                    // buy
                                    base.iadd(baseNative);
                                    quote.isub(quoteNative.iadd(quoteFeesNative));
                                } else {
                                    // sell
                                    base.isub(baseNative);
                                    quote.iadd(quoteNative.isub(quoteFeesNative));
                                }
                            }
                            continue;
                        }
                    case __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$eventHeap$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EventType"].Out:
                        {
                            continue;
                        }
                }
            }
        }
        return [
            base,
            quote
        ];
    }
    setDelegate(delegate) {
        this.delegate = delegate;
        return this;
    }
    async placeOrder(order) {
        // derive token account
        const mint = order.side.bid ? this.market.account.quoteMint : this.market.account.baseMint;
        const userTokenAccount = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssociatedTokenAddress"])(mint, this.market.client.walletPk);
        // TODO: derive wrap sol instruction
        const remainingAccounts = new Set();
        const bookSide = order.side.bid ? this.market.asks : this.market.bids;
        if (bookSide && !order.orderType?.postOnly && !order.orderType?.postOnlySlide) {
            for (const order of bookSide.items()){
                remainingAccounts.add(order.leafNode.owner.toBase58());
                if (remainingAccounts.size >= 3) break;
            }
        }
        const [placeIx] = await this.placeOrderIx(order, userTokenAccount, [
            ...remainingAccounts
        ].map((a)=>new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"](a)));
        const additionalSigners = this.delegate ? [
            this.delegate
        ] : [];
        return this.market.client.sendAndConfirmTransaction([
            placeIx
        ], {
            additionalSigners
        });
    }
    async cancelOrder(order) {
        const ixs = [];
        if ('clientOrderId' in order) {
            const id = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](order.clientOrderId);
            const [ix] = await this.cancelOrderByClientIdIx(id);
            ixs.push(ix);
        } else {
            const id = order.leafNode.key;
            const [ix] = await this.cancelOrderByIdIx(id);
            ixs.push(ix);
        }
        const additionalSigners = this.delegate ? [
            this.delegate
        ] : [];
        return this.market.client.sendAndConfirmTransaction(ixs, {
            additionalSigners
        });
    }
    async cancelAllOrders(side) {
        const [cancelIx] = await this.cancelAllOrdersIx(side);
        const { baseMint, quoteMint } = this.market.account;
        const owner = this.market.client.walletPk;
        const payer = this.delegate?.publicKey ?? owner;
        const ataIxs = [];
        const baseATA = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssociatedTokenAddress"])(baseMint, owner);
        ataIxs.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$instructions$2f$associatedTokenAccount$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAssociatedTokenAccountIdempotentInstruction"])(payer, baseATA, owner, baseMint));
        const quoteATA = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssociatedTokenAddress"])(quoteMint, owner);
        ataIxs.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$instructions$2f$associatedTokenAccount$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAssociatedTokenAccountIdempotentInstruction"])(payer, quoteATA, owner, quoteMint));
        const referrer = this.market.client.referrerWallet;
        let referrerATA = null;
        if (referrer) {
            referrerATA = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssociatedTokenAddress"])(quoteMint, referrer);
            ataIxs.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$spl$2d$token$40$0$2e$4$2e$13_$40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$instructions$2f$associatedTokenAccount$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAssociatedTokenAccountIdempotentInstruction"])(payer, referrerATA, referrer, quoteMint));
        }
        const [settleIx] = await this.settleFundsIx(baseATA, quoteATA, referrerATA, payer);
        // TODO: derive unwrap sol instruction
        const additionalSigners = this.delegate ? [
            this.delegate
        ] : [];
        return this.market.client.sendAndConfirmTransaction([
            cancelIx,
            ...ataIxs,
            settleIx
        ], {
            additionalSigners
        });
    }
    *items() {
        const { bids, asks } = this.market;
        if (!bids || !asks) throw new Error('requires OrderBook of Market to be loaded');
        for (const slot of this.account.openOrders){
            if (slot.isFree) continue;
            let gen;
            switch(slot.sideAndTree){
                case 0:
                    gen = bids.fixedItems();
                    break;
                case 1:
                    gen = asks.fixedItems();
                    break;
                case 2:
                    gen = bids.oraclePeggedItems();
                    break;
                case 3:
                    gen = asks.oraclePeggedItems();
                    break;
            }
            inner: for (const order of gen){
                if (order.leafNode.key.eq(slot.id)) {
                    yield order;
                    break inner;
                }
            }
        }
    }
    toPrettyString() {
        const oo = this.account;
        let debug = `OO: ${this.pubkey.toBase58()}\n`;
        debug += ` owner: ${oo.owner.toBase58()}\n`;
        debug += ` market: ${oo.market.toBase58()} (${(0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["nameToString"])(this.market.account.name)})\n`;
        if (!oo.delegate.key.equals(__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"].default)) debug += ` delegate: ${oo.delegate.key.toBase58()}\n`;
        debug += ` accountNum: ${oo.accountNum}\n`;
        debug += ` version: ${oo.version}\n`;
        debug += ` bidsBaseLots: ${oo.position.bidsBaseLots.toString()}\n`;
        debug += ` bidsQuoteLots: ${oo.position.bidsQuoteLots.toString()}\n`;
        debug += ` asksBaseLots: ${oo.position.asksBaseLots.toString()}\n`;
        debug += ` baseFreeNative: ${oo.position.baseFreeNative.toString()}\n`;
        debug += ` quoteFreeNative: ${oo.position.quoteFreeNative.toString()}\n`;
        debug += ` lockedMakerFees: ${oo.position.lockedMakerFees.toString()}\n`;
        debug += ` referrerRebatesAvailable: ${oo.position.referrerRebatesAvailable.toString()}\n`;
        debug += ` penaltyHeapCount: ${oo.position.penaltyHeapCount.toString()}\n`;
        debug += ` makerVolume: ${oo.position.makerVolume.toString()}\n`;
        debug += ` takerVolume: ${oo.position.takerVolume.toString()}\n`;
        debug += ` orders:\n`;
        for (const order of this.items()){
            debug += `  ${order.toPrettyString()}\n`;
        }
        if (this.market.eventHeap) {
            debug += ` events:\n`;
            for (const event of this.market.eventHeap.parsedEvents()){
                switch(event.eventType){
                    case __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$eventHeap$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EventType"].Fill:
                        {
                            const { maker, quantity, price, takerSide } = event;
                            if (maker.equals(this.pubkey)) {
                                const fillBase = this.market.baseLotsToUi(quantity);
                                const fillPrice = this.market.priceLotsToUi(price);
                                debug += `  fill side=${takerSide === 1 ? 'Bid' : 'Ask'} qty=${fillBase} price=${fillPrice}\n`;
                            }
                            continue;
                        }
                    case __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$eventHeap$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EventType"].Out:
                        {
                            const { owner } = event;
                            if (owner.equals(this.pubkey)) debug += `  out ${JSON.stringify(event)}\n`;
                            continue;
                        }
                }
            }
            debug += ` balance:\n`;
            const [base, quote] = this.getBalanceNative();
            debug += `  base: ${this.market.baseNativeToUi(base)}\n`;
            debug += `  quote: ${this.market.quoteNativeToUi(quote)}\n`;
        }
        return debug;
    }
    getBaseBalanceNative() {
        return this.account.position.asksBaseLots.mul(this.market.account.baseLotSize).iadd(this.account.position.baseFreeNative);
    }
    getQuoteBalanceNative() {
        return this.account.position.bidsQuoteLots.mul(this.market.account.quoteLotSize).iadd(this.account.position.quoteFreeNative).iadd(this.account.position.lockedMakerFees);
    }
    getBaseBalanceUi() {
        return Number(this.getBaseBalanceNative().toString()) / 10 ** this.market.account.baseDecimals;
    }
    getQuoteBalanceUi() {
        return Number(this.getQuoteBalanceNative().toString()) / 10 ** this.market.account.quoteDecimals;
    }
    /// low-level API
    async placeOrderIx(order, userTokenAccount, remainingAccounts = []) {
        const priceLots = this.market.priceUiToLots(order.price);
        const maxBaseLots = this.market.baseUiToLots(order.size);
        const maxQuoteLotsIncludingFees = order.quoteLimit ? new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](order.quoteLimit) : __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["I64_MAX_BN"];
        const clientOrderId = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](order.clientOrderId || Date.now());
        const orderType = order.orderType ?? __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PlaceOrderTypeUtils"].Limit;
        const expiryTimestamp = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](order.expiryTimestamp ?? 0);
        const selfTradeBehavior = order.selfTradeBehavior ?? __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelfTradeBehaviorUtils"].DecrementTake;
        const limit = order.matchLoopLimit ?? 16;
        const args = {
            side: order.side,
            priceLots,
            maxBaseLots,
            maxQuoteLotsIncludingFees,
            clientOrderId,
            orderType,
            expiryTimestamp,
            selfTradeBehavior,
            limit
        };
        return await this.market.client.placeOrderIx(this.pubkey, this.market.pubkey, this.market.account, userTokenAccount, args, remainingAccounts, this.delegate);
    }
    async cancelAllOrdersIx(side) {
        return this.market.client.cancelAllOrdersIx(this.pubkey, this.account, this.market.account, 24, side, this.delegate);
    }
    async cancelOrderByIdIx(id) {
        return this.market.client.cancelOrderByIdIx(this.pubkey, this.account, this.market.account, id, this.delegate);
    }
    async cancelOrderByClientIdIx(id) {
        return this.market.client.cancelOrderByClientIdIx(this.pubkey, this.account, this.market.account, id, this.delegate);
    }
    async settleFundsIx(userBaseAccount, userQuoteAccount, referrerAccount, penaltyPayer) {
        return this.market.client.settleFundsIx(this.pubkey, this.account, this.market.pubkey, this.market.account, userBaseAccount, userQuoteAccount, referrerAccount, penaltyPayer, this.delegate);
    }
}
}),
"[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/market.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "baseLotsToUi",
    ()=>baseLotsToUi,
    "findAccountsByMints",
    ()=>findAccountsByMints,
    "findAllMarkets",
    ()=>findAllMarkets,
    "priceLotsToNative",
    ()=>priceLotsToNative,
    "priceLotsToUi",
    ()=>priceLotsToUi,
    "priceNativeToUi",
    ()=>priceNativeToUi,
    "quantityToUiBase",
    ()=>quantityToUiBase,
    "quoteLotsToUi",
    ()=>quoteLotsToUi,
    "uiBaseToLots",
    ()=>uiBaseToLots,
    "uiPriceToLots",
    ()=>uiPriceToLots,
    "uiQuoteToLots",
    ()=>uiQuoteToLots
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@solana+web3.js@1.98.4_typescript@5.9.3/node_modules/@solana/web3.js/lib/index.esm.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/client.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$29$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$29$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__utils$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/utils/index.js [app-route] (ecmascript) <export * as utils>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$29$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$program$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/program/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$29$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@coral-xyz+anchor@0.29.0_typescript@5.9.3/node_modules/@coral-xyz/anchor/dist/esm/provider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/bn.js@5.2.2/node_modules/bn.js/lib/bn.js [app-route] (ecmascript) <export default as BN>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/utils/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/big.js@6.2.2/node_modules/big.js/big.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$openbook_v2$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/openbook_v2.js [app-route] (ecmascript)");
;
;
;
;
;
;
const BATCH_TX_SIZE = 50;
async function findAccountsByMints(connection, baseMintAddress, quoteMintAddress, programId) {
    const filters = [
        {
            memcmp: {
                offset: 792,
                bytes: baseMintAddress.toBase58()
            }
        },
        {
            memcmp: {
                offset: 824,
                bytes: quoteMintAddress.toBase58()
            }
        }
    ];
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFilteredProgramAccounts"])(connection, programId, filters);
}
async function findAllMarkets(connection, programId = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OPENBOOK_PROGRAM_ID"], provider) {
    if (provider == null) {
        provider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$29$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getProvider"])();
    }
    const program = new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$29$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$program$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Program"](__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$openbook_v2$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IDL"], programId, provider);
    const [eventAuthority] = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$solana$2b$web3$2e$js$40$1$2e$98$2e$4_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublicKey"].findProgramAddressSync([
        Buffer.from('__event_authority')
    ], programId);
    const marketsAll = [];
    const signatures = (await connection.getSignaturesForAddress(eventAuthority)).map((x)=>x.signature);
    const batchSignatures = [
        []
    ];
    for(let i = 0; i < signatures.length; i += BATCH_TX_SIZE){
        batchSignatures.push(signatures.slice(0, BATCH_TX_SIZE));
    }
    for (const batch of batchSignatures){
        const allTxs = await connection.getTransactions(batch, {
            commitment: 'confirmed',
            maxSupportedTransactionVersion: 0
        });
        for (const tx of allTxs){
            if (tx?.meta?.innerInstructions !== null && tx?.meta?.innerInstructions !== undefined) {
                for (const innerIns of tx.meta.innerInstructions){
                    const innerIx = innerIns.instructions?.[11];
                    if (innerIx?.accounts?.[0] !== undefined) {
                        // validate key and program key
                        const eventAuthorityKey = innerIx.accounts[0];
                        const programKey = innerIx.programIdIndex;
                        if (tx.transaction.message.staticAccountKeys[eventAuthorityKey].toString() !== eventAuthority.toString() || tx.transaction.message.staticAccountKeys[programKey].toString() !== programId.toString()) {
                            continue;
                        } else {
                            const ixData = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$29$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__utils$3e$__["utils"].bytes.bs58.decode(innerIx.data);
                            const eventData = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$coral$2d$xyz$2b$anchor$40$0$2e$29$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__utils$3e$__["utils"].bytes.base64.encode(ixData.slice(8));
                            const event = program.coder.events.decode(eventData);
                            if (event != null) {
                                const market = {
                                    market: event.data.market.toString(),
                                    baseMint: event.data.baseMint.toString(),
                                    quoteMint: event.data.quoteMint.toString(),
                                    name: event.data.name,
                                    timestamp: tx.blockTime
                                };
                                marketsAll.push(market);
                            }
                        }
                    }
                }
            }
        }
    }
    return marketsAll;
}
function priceLotsToUiConverter(market) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](10).pow(market.baseDecimals - market.quoteDecimals).mul(new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](market.quoteLotSize.toString())).div(new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](market.baseLotSize.toString())).toNumber();
}
function baseLotsToUiConverter(market) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](market.baseLotSize.toString()).div(new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](10).pow(market.baseDecimals)).toNumber();
}
function quoteLotsToUiConverter(market) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](market.quoteLotSize.toString()).div(new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$big$2e$js$40$6$2e$2$2e$2$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](10).pow(market.quoteDecimals)).toNumber();
}
function uiPriceToLots(market, price) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toNative"])(price, market.quoteDecimals).mul(market.baseLotSize).div(market.quoteLotSize.mul(new __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f$bn$2e$js$40$5$2e$2$2e$2$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](Math.pow(10, market.baseDecimals))));
}
function uiBaseToLots(market, quantity) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toNative"])(quantity, market.baseDecimals).div(market.baseLotSize);
}
function uiQuoteToLots(market, uiQuote) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toNative"])(uiQuote, market.quoteDecimals).div(market.quoteLotSize);
}
function priceLotsToNative(market, price) {
    return price.mul(market.quoteLotSize).div(market.baseLotSize);
}
function priceLotsToUi(market, price) {
    return parseFloat(price.toString()) * priceLotsToUiConverter(market);
}
function priceNativeToUi(market, price) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toUiDecimals"])(price, market.quoteDecimals - market.baseDecimals);
}
function baseLotsToUi(market, quantity) {
    return parseFloat(quantity.toString()) * baseLotsToUiConverter(market);
}
function quoteLotsToUi(market, quantity) {
    return parseFloat(quantity.toString()) * quoteLotsToUiConverter(market);
}
function quantityToUiBase(market, quantity, decimals) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toUiDecimals"])(quantity.mul(market.baseLotSize).toNumber(), decimals);
}
}),
"[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/utils/watcher.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Watcher",
    ()=>Watcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$bookSide$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/accounts/bookSide.js [app-route] (ecmascript)");
;
class Watcher {
    connection;
    accountSubs = {};
    constructor(connection){
        this.connection = connection;
    }
    addMarket(market, includeBook = true, includeEvents = true) {
        const { client, asks, bids, eventHeap, pubkey } = market;
        this.accountSubs[pubkey.toBase58()] = this.connection.onAccountChange(pubkey, (ai)=>{
            market.account = client.program.coder.accounts.decode('market', ai.data);
        });
        if (includeBook && asks) {
            this.addBookSide(asks);
        }
        if (includeBook && bids) {
            this.addBookSide(bids);
        }
        if (includeEvents && eventHeap) {
            this.addEventHeap(eventHeap);
        }
        return this;
    }
    addBookSide(bookSide) {
        const { pubkey } = bookSide;
        this.accountSubs[pubkey.toBase58()] = this.connection.onAccountChange(pubkey, (ai)=>{
            bookSide.account = __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$bookSide$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BookSide"].decodeAccountfromBuffer(ai.data);
        });
        return this;
    }
    addEventHeap(eventHeap) {
        const { market, pubkey } = eventHeap;
        this.accountSubs[pubkey.toBase58()] = this.connection.onAccountChange(pubkey, (ai)=>{
            eventHeap.account = market.client.program.coder.accounts.decode('eventHeap', ai.data);
        });
        return this;
    }
    addOpenOrders(openOrders) {
        const { market, pubkey } = openOrders;
        this.accountSubs[pubkey.toBase58()] = this.connection.onAccountChange(pubkey, (ai)=>{
            openOrders.account = market.client.program.coder.accounts.decode('OpenOrders', ai.data);
        });
        return this;
    }
    clear() {
        for (const [_pk, sub] of Object.entries(this.accountSubs)){
            this.connection.removeAccountChangeListener(sub);
        }
        return this;
    }
}
}),
"[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BookSide",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$bookSide$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BookSide"],
    "EventHeap",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$eventHeap$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EventHeap"],
    "EventType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$eventHeap$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EventType"],
    "I64_MAX_BN",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["I64_MAX_BN"],
    "IDL",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$openbook_v2$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IDL"],
    "Market",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$market$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Market"],
    "OPENBOOK_PROGRAM_ID",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OPENBOOK_PROGRAM_ID"],
    "ORDER_FEE_UNIT",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ORDER_FEE_UNIT"],
    "OpenBookV2Client",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenBookV2Client"],
    "OpenOrders",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$openOrders$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenOrders"],
    "OpenOrdersIndexer",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$openOrdersIndexer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenOrdersIndexer"],
    "Order",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$structs$2f$order$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Order"],
    "PlaceOrderTypeUtils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PlaceOrderTypeUtils"],
    "SelfTradeBehaviorUtils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelfTradeBehaviorUtils"],
    "SideUtils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SideUtils"],
    "U64_MAX_BN",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["U64_MAX_BN"],
    "Watcher",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$watcher$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Watcher"],
    "baseLotsToUi",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$market$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["baseLotsToUi"],
    "bpsToDecimal",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bpsToDecimal"],
    "createAssociatedTokenAccountIdempotentInstruction",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAssociatedTokenAccountIdempotentInstruction"],
    "findAccountsByMints",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$market$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findAccountsByMints"],
    "findAllMarkets",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$market$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findAllMarkets"],
    "getAssociatedTokenAddress",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssociatedTokenAddress"],
    "getFilteredProgramAccounts",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFilteredProgramAccounts"],
    "nameToString",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["nameToString"],
    "percentageToDecimal",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["percentageToDecimal"],
    "priceLotsToNative",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$market$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["priceLotsToNative"],
    "priceLotsToUi",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$market$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["priceLotsToUi"],
    "priceNativeToUi",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$market$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["priceNativeToUi"],
    "quantityToUiBase",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$market$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["quantityToUiBase"],
    "quoteLotsToUi",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$market$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["quoteLotsToUi"],
    "sleep",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sleep"],
    "toNative",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toNative"],
    "toUiDecimals",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toUiDecimals"],
    "uiBaseToLots",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$market$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uiBaseToLots"],
    "uiPriceToLots",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$market$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uiPriceToLots"],
    "uiQuoteToLots",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$market$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uiQuoteToLots"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$openbook_v2$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/openbook_v2.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/client.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$bookSide$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/accounts/bookSide.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$eventHeap$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/accounts/eventHeap.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$market$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/accounts/market.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$openOrders$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/accounts/openOrders.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$accounts$2f$openOrdersIndexer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/accounts/openOrdersIndexer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$market$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/market.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$structs$2f$order$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/structs/order.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/utils/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$dashboard$2f$node_modules$2f2e$pnpm$2f40$openbook$2d$dex$2b$openbook$2d$v2$40$0$2e$2$2e$10_fastestsmallesttextencoderdecoder$40$1$2e$0$2e$22_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$openbook$2d$dex$2f$openbook$2d$v2$2f$dist$2f$esm$2f$utils$2f$watcher$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/dashboard/node_modules/.pnpm/@openbook-dex+openbook-v2@0.2.10_fastestsmallesttextencoderdecoder@1.0.22_typescript@5.9.3/node_modules/@openbook-dex/openbook-v2/dist/esm/utils/watcher.js [app-route] (ecmascript)");
}),
];

//# sourceMappingURL=a839e_%40openbook-dex_openbook-v2_dist_esm_9c806e46._.js.map