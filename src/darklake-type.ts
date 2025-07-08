/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/darklake.json`.
 */
export type Darklake = {
  "address": "EPzCHzLHoLp2RqQiTi2jwr5qNSSjwZ9eBZqQFe6xMJtV",
  "metadata": {
    "name": "darklake",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "darklake"
  },
  "instructions": [
    {
      "name": "addLiquidity",
      "discriminator": [
        181,
        157,
        89,
        67,
        143,
        182,
        52,
        72
      ],
      "accounts": [
        {
          "name": "tokenMintX"
        },
        {
          "name": "tokenMintY"
        },
        {
          "name": "tokenMintXProgram"
        },
        {
          "name": "tokenMintYProgram"
        },
        {
          "name": "tokenMintLp",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  112
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "tokenMintLpProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "pool",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "ammConfig"
              },
              {
                "kind": "account",
                "path": "tokenMintX"
              },
              {
                "kind": "account",
                "path": "tokenMintY"
              }
            ]
          }
        },
        {
          "name": "ammConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  109,
                  109,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "const",
                "value": [
                  0,
                  0,
                  0,
                  0
                ]
              }
            ]
          }
        },
        {
          "name": "authority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "userTokenAccountX",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "account",
                "path": "tokenMintXProgram"
              },
              {
                "kind": "account",
                "path": "tokenMintX"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "userTokenAccountY",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "account",
                "path": "tokenMintYProgram"
              },
              {
                "kind": "account",
                "path": "tokenMintY"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "userTokenAccountLp",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "account",
                "path": "tokenMintLpProgram"
              },
              {
                "kind": "account",
                "path": "tokenMintLp"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "poolTokenReserveX",
          "writable": true
        },
        {
          "name": "poolTokenReserveY",
          "writable": true
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amountLp",
          "type": "u64"
        },
        {
          "name": "maxAmountX",
          "type": "u64"
        },
        {
          "name": "maxAmountY",
          "type": "u64"
        }
      ]
    },
    {
      "name": "cancel",
      "discriminator": [
        232,
        219,
        223,
        41,
        219,
        236,
        220,
        190
      ],
      "accounts": [
        {
          "name": "caller",
          "writable": true,
          "signer": true
        },
        {
          "name": "orderOwner",
          "writable": true
        },
        {
          "name": "tokenMintX",
          "writable": true
        },
        {
          "name": "tokenMintY",
          "writable": true
        },
        {
          "name": "tokenMintWsol"
        },
        {
          "name": "tokenMintXProgram"
        },
        {
          "name": "tokenMintYProgram"
        },
        {
          "name": "tokenMintWsolProgram"
        },
        {
          "name": "pool",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "ammConfig"
              },
              {
                "kind": "account",
                "path": "tokenMintX"
              },
              {
                "kind": "account",
                "path": "tokenMintY"
              }
            ]
          }
        },
        {
          "name": "authority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "poolTokenReserveX",
          "writable": true
        },
        {
          "name": "poolTokenReserveY",
          "writable": true
        },
        {
          "name": "poolWsolReserve",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108,
                  95,
                  119,
                  115,
                  111,
                  108,
                  95,
                  114,
                  101,
                  115,
                  101,
                  114,
                  118,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "ammConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  109,
                  109,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "const",
                "value": [
                  0,
                  0,
                  0,
                  0
                ]
              }
            ]
          }
        },
        {
          "name": "userTokenAccountX",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "orderOwner"
              },
              {
                "kind": "account",
                "path": "tokenMintXProgram"
              },
              {
                "kind": "account",
                "path": "tokenMintX"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "userTokenAccountY",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "orderOwner"
              },
              {
                "kind": "account",
                "path": "tokenMintYProgram"
              },
              {
                "kind": "account",
                "path": "tokenMintY"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "userTokenAccountWsol",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "orderOwner"
              },
              {
                "kind": "account",
                "path": "tokenMintWsolProgram"
              },
              {
                "kind": "account",
                "path": "tokenMintWsol"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "callerTokenAccountWsol",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "caller"
              },
              {
                "kind": "account",
                "path": "tokenMintWsolProgram"
              },
              {
                "kind": "account",
                "path": "tokenMintWsol"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "order",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  100,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              },
              {
                "kind": "account",
                "path": "orderOwner"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "proofA",
          "type": {
            "array": [
              "u8",
              64
            ]
          }
        },
        {
          "name": "proofB",
          "type": {
            "array": [
              "u8",
              128
            ]
          }
        },
        {
          "name": "proofC",
          "type": {
            "array": [
              "u8",
              64
            ]
          }
        },
        {
          "name": "publicInputs",
          "type": {
            "array": [
              {
                "array": [
                  "u8",
                  32
                ]
              },
              2
            ]
          }
        }
      ]
    },
    {
      "name": "collectProtocolFees",
      "discriminator": [
        22,
        67,
        23,
        98,
        150,
        178,
        70,
        220
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "Only admin or owner can collect fee now"
          ],
          "signer": true
        },
        {
          "name": "authority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "pool",
          "docs": [
            "Pool state stores accumulated protocol fee amount"
          ],
          "writable": true
        },
        {
          "name": "ammConfig",
          "docs": [
            "Amm config account stores owner"
          ]
        },
        {
          "name": "poolTokenReserveX",
          "docs": [
            "The address that holds pool tokens for token_x"
          ],
          "writable": true
        },
        {
          "name": "poolTokenReserveY",
          "docs": [
            "The address that holds pool tokens for token_y"
          ],
          "writable": true
        },
        {
          "name": "tokenMintX",
          "docs": [
            "The mint of token_x vault"
          ]
        },
        {
          "name": "tokenMintY",
          "docs": [
            "The mint of token_y vault"
          ]
        },
        {
          "name": "toTokenX",
          "docs": [
            "The address that receives the collected token_x protocol fees"
          ],
          "writable": true
        },
        {
          "name": "toTokenY",
          "docs": [
            "The address that receives the collected token_y protocol fees"
          ],
          "writable": true
        },
        {
          "name": "tokenProgram",
          "docs": [
            "The SPL program to perform token transfers"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "tokenProgram2022",
          "docs": [
            "The SPL program 2022 to perform token transfers"
          ],
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        }
      ],
      "args": [
        {
          "name": "amountXRequested",
          "type": "u64"
        },
        {
          "name": "amountYRequested",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createAmmConfig",
      "discriminator": [
        137,
        52,
        237,
        212,
        215,
        117,
        108,
        104
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "Address to be set as protocol owner."
          ],
          "writable": true,
          "signer": true,
          "address": "5hHsEaTXVNhsYT7TgkrPB3GwZ7ZYrtzC5t3KTLNuwJkB"
        },
        {
          "name": "ammConfig",
          "docs": [
            "Initialize config state account to store protocol owner address and fee rates."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  109,
                  109,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "const",
                "value": [
                  0,
                  0,
                  0,
                  0
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "tradeFeeRate",
          "type": "u64"
        },
        {
          "name": "protocolFeeRate",
          "type": "u64"
        },
        {
          "name": "createPoolFee",
          "type": "u64"
        },
        {
          "name": "createPoolFeeVault",
          "type": "pubkey"
        },
        {
          "name": "wsolTradeDeposit",
          "type": "u64"
        },
        {
          "name": "deadlineSlotDuration",
          "type": "u64"
        },
        {
          "name": "halted",
          "type": "bool"
        }
      ]
    },
    {
      "name": "initializePool",
      "discriminator": [
        95,
        180,
        10,
        172,
        84,
        174,
        232,
        40
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "pool",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "ammConfig"
              },
              {
                "kind": "account",
                "path": "tokenMintX"
              },
              {
                "kind": "account",
                "path": "tokenMintY"
              }
            ]
          }
        },
        {
          "name": "authority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "ammConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  109,
                  109,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "const",
                "value": [
                  0,
                  0,
                  0,
                  0
                ]
              }
            ]
          }
        },
        {
          "name": "tokenMintX"
        },
        {
          "name": "tokenMintY"
        },
        {
          "name": "tokenMintWsol"
        },
        {
          "name": "tokenMintLp",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  112
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "metadataAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  11,
                  112,
                  101,
                  177,
                  227,
                  209,
                  124,
                  69,
                  56,
                  157,
                  82,
                  127,
                  107,
                  4,
                  195,
                  205,
                  88,
                  184,
                  108,
                  115,
                  26,
                  160,
                  253,
                  181,
                  73,
                  182,
                  209,
                  188,
                  3,
                  248,
                  41,
                  70
                ]
              },
              {
                "kind": "account",
                "path": "tokenMintLp"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                11,
                112,
                101,
                177,
                227,
                209,
                124,
                69,
                56,
                157,
                82,
                127,
                107,
                4,
                195,
                205,
                88,
                184,
                108,
                115,
                26,
                160,
                253,
                181,
                73,
                182,
                209,
                188,
                3,
                248,
                41,
                70
              ]
            }
          }
        },
        {
          "name": "metadataAccountX",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  11,
                  112,
                  101,
                  177,
                  227,
                  209,
                  124,
                  69,
                  56,
                  157,
                  82,
                  127,
                  107,
                  4,
                  195,
                  205,
                  88,
                  184,
                  108,
                  115,
                  26,
                  160,
                  253,
                  181,
                  73,
                  182,
                  209,
                  188,
                  3,
                  248,
                  41,
                  70
                ]
              },
              {
                "kind": "account",
                "path": "tokenMintX"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                11,
                112,
                101,
                177,
                227,
                209,
                124,
                69,
                56,
                157,
                82,
                127,
                107,
                4,
                195,
                205,
                88,
                184,
                108,
                115,
                26,
                160,
                253,
                181,
                73,
                182,
                209,
                188,
                3,
                248,
                41,
                70
              ]
            }
          }
        },
        {
          "name": "metadataAccountY",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  11,
                  112,
                  101,
                  177,
                  227,
                  209,
                  124,
                  69,
                  56,
                  157,
                  82,
                  127,
                  107,
                  4,
                  195,
                  205,
                  88,
                  184,
                  108,
                  115,
                  26,
                  160,
                  253,
                  181,
                  73,
                  182,
                  209,
                  188,
                  3,
                  248,
                  41,
                  70
                ]
              },
              {
                "kind": "account",
                "path": "tokenMintY"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                11,
                112,
                101,
                177,
                227,
                209,
                124,
                69,
                56,
                157,
                82,
                127,
                107,
                4,
                195,
                205,
                88,
                184,
                108,
                115,
                26,
                160,
                253,
                181,
                73,
                182,
                209,
                188,
                3,
                248,
                41,
                70
              ]
            }
          }
        },
        {
          "name": "userTokenAccountX",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "account",
                "path": "tokenMintXProgram"
              },
              {
                "kind": "account",
                "path": "tokenMintX"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "userTokenAccountY",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "account",
                "path": "tokenMintYProgram"
              },
              {
                "kind": "account",
                "path": "tokenMintY"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "userTokenAccountLp",
          "writable": true
        },
        {
          "name": "poolTokenReserveX",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108,
                  95,
                  114,
                  101,
                  115,
                  101,
                  114,
                  118,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              },
              {
                "kind": "account",
                "path": "tokenMintX"
              }
            ]
          }
        },
        {
          "name": "poolTokenReserveY",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108,
                  95,
                  114,
                  101,
                  115,
                  101,
                  114,
                  118,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              },
              {
                "kind": "account",
                "path": "tokenMintY"
              }
            ]
          }
        },
        {
          "name": "poolWsolReserve",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108,
                  95,
                  119,
                  115,
                  111,
                  108,
                  95,
                  114,
                  101,
                  115,
                  101,
                  114,
                  118,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "createPoolFeeVault",
          "writable": true
        },
        {
          "name": "mplProgram",
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "tokenMintLpProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "tokenMintXProgram"
        },
        {
          "name": "tokenMintYProgram"
        }
      ],
      "args": [
        {
          "name": "amountX",
          "type": "u64"
        },
        {
          "name": "amountY",
          "type": "u64"
        }
      ]
    },
    {
      "name": "removeLiquidity",
      "discriminator": [
        80,
        85,
        209,
        72,
        24,
        206,
        177,
        108
      ],
      "accounts": [
        {
          "name": "tokenMintX"
        },
        {
          "name": "tokenMintY"
        },
        {
          "name": "tokenMintXProgram"
        },
        {
          "name": "tokenMintYProgram"
        },
        {
          "name": "ammConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  109,
                  109,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "const",
                "value": [
                  0,
                  0,
                  0,
                  0
                ]
              }
            ]
          }
        },
        {
          "name": "tokenMintLp",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  112
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "tokenMintLpProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "pool",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "ammConfig"
              },
              {
                "kind": "account",
                "path": "tokenMintX"
              },
              {
                "kind": "account",
                "path": "tokenMintY"
              }
            ]
          }
        },
        {
          "name": "authority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "userTokenAccountX",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "account",
                "path": "tokenMintXProgram"
              },
              {
                "kind": "account",
                "path": "tokenMintX"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "userTokenAccountY",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "account",
                "path": "tokenMintYProgram"
              },
              {
                "kind": "account",
                "path": "tokenMintY"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "userTokenAccountLp",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "account",
                "path": "tokenMintLpProgram"
              },
              {
                "kind": "account",
                "path": "tokenMintLp"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "poolTokenReserveX",
          "writable": true
        },
        {
          "name": "poolTokenReserveY",
          "writable": true
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amountLp",
          "type": "u64"
        },
        {
          "name": "minReceiveX",
          "type": "u64"
        },
        {
          "name": "minReceiveY",
          "type": "u64"
        }
      ]
    },
    {
      "name": "settle",
      "discriminator": [
        175,
        42,
        185,
        87,
        144,
        131,
        102,
        212
      ],
      "accounts": [
        {
          "name": "caller",
          "writable": true,
          "signer": true
        },
        {
          "name": "orderOwner",
          "writable": true
        },
        {
          "name": "tokenMintX",
          "writable": true
        },
        {
          "name": "tokenMintY",
          "writable": true
        },
        {
          "name": "tokenMintWsol"
        },
        {
          "name": "tokenMintXProgram"
        },
        {
          "name": "tokenMintYProgram"
        },
        {
          "name": "tokenMintWsolProgram"
        },
        {
          "name": "pool",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "ammConfig"
              },
              {
                "kind": "account",
                "path": "tokenMintX"
              },
              {
                "kind": "account",
                "path": "tokenMintY"
              }
            ]
          }
        },
        {
          "name": "authority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "poolTokenReserveX",
          "writable": true
        },
        {
          "name": "poolTokenReserveY",
          "writable": true
        },
        {
          "name": "poolWsolReserve",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108,
                  95,
                  119,
                  115,
                  111,
                  108,
                  95,
                  114,
                  101,
                  115,
                  101,
                  114,
                  118,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "ammConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  109,
                  109,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "const",
                "value": [
                  0,
                  0,
                  0,
                  0
                ]
              }
            ]
          }
        },
        {
          "name": "userTokenAccountX",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "orderOwner"
              },
              {
                "kind": "account",
                "path": "tokenMintXProgram"
              },
              {
                "kind": "account",
                "path": "tokenMintX"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "userTokenAccountY",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "orderOwner"
              },
              {
                "kind": "account",
                "path": "tokenMintYProgram"
              },
              {
                "kind": "account",
                "path": "tokenMintY"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "userTokenAccountWsol",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "orderOwner"
              },
              {
                "kind": "account",
                "path": "tokenMintWsolProgram"
              },
              {
                "kind": "account",
                "path": "tokenMintWsol"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "callerTokenAccountWsol",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "caller"
              },
              {
                "kind": "account",
                "path": "tokenMintWsolProgram"
              },
              {
                "kind": "account",
                "path": "tokenMintWsol"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "order",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  100,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              },
              {
                "kind": "account",
                "path": "orderOwner"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": [
        {
          "name": "proofA",
          "type": {
            "array": [
              "u8",
              64
            ]
          }
        },
        {
          "name": "proofB",
          "type": {
            "array": [
              "u8",
              128
            ]
          }
        },
        {
          "name": "proofC",
          "type": {
            "array": [
              "u8",
              64
            ]
          }
        },
        {
          "name": "publicInputs",
          "type": {
            "array": [
              {
                "array": [
                  "u8",
                  32
                ]
              },
              2
            ]
          }
        }
      ]
    },
    {
      "name": "slash",
      "discriminator": [
        204,
        141,
        18,
        161,
        8,
        177,
        92,
        142
      ],
      "accounts": [
        {
          "name": "caller",
          "writable": true,
          "signer": true
        },
        {
          "name": "orderOwner",
          "writable": true
        },
        {
          "name": "tokenMintX",
          "writable": true
        },
        {
          "name": "tokenMintY",
          "writable": true
        },
        {
          "name": "tokenMintWsol"
        },
        {
          "name": "tokenMintXProgram"
        },
        {
          "name": "tokenMintYProgram"
        },
        {
          "name": "tokenMintWsolProgram"
        },
        {
          "name": "pool",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "ammConfig"
              },
              {
                "kind": "account",
                "path": "tokenMintX"
              },
              {
                "kind": "account",
                "path": "tokenMintY"
              }
            ]
          }
        },
        {
          "name": "authority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "poolTokenReserveX",
          "writable": true
        },
        {
          "name": "poolTokenReserveY",
          "writable": true
        },
        {
          "name": "poolWsolReserve",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108,
                  95,
                  119,
                  115,
                  111,
                  108,
                  95,
                  114,
                  101,
                  115,
                  101,
                  114,
                  118,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "ammConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  109,
                  109,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "const",
                "value": [
                  0,
                  0,
                  0,
                  0
                ]
              }
            ]
          }
        },
        {
          "name": "userTokenAccountX",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "orderOwner"
              },
              {
                "kind": "account",
                "path": "tokenMintXProgram"
              },
              {
                "kind": "account",
                "path": "tokenMintX"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "userTokenAccountY",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "orderOwner"
              },
              {
                "kind": "account",
                "path": "tokenMintYProgram"
              },
              {
                "kind": "account",
                "path": "tokenMintY"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "callerTokenAccountWsol",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "caller"
              },
              {
                "kind": "account",
                "path": "tokenMintWsolProgram"
              },
              {
                "kind": "account",
                "path": "tokenMintWsol"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "order",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  100,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              },
              {
                "kind": "account",
                "path": "orderOwner"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": []
    },
    {
      "name": "swap",
      "discriminator": [
        248,
        198,
        158,
        145,
        225,
        117,
        135,
        200
      ],
      "accounts": [
        {
          "name": "tokenMintX",
          "writable": true
        },
        {
          "name": "tokenMintY",
          "writable": true
        },
        {
          "name": "tokenMintWsol"
        },
        {
          "name": "tokenMintXProgram"
        },
        {
          "name": "tokenMintYProgram"
        },
        {
          "name": "tokenMintWsolProgram"
        },
        {
          "name": "pool",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "ammConfig"
              },
              {
                "kind": "account",
                "path": "tokenMintX"
              },
              {
                "kind": "account",
                "path": "tokenMintY"
              }
            ]
          }
        },
        {
          "name": "authority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "ammConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  109,
                  109,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "const",
                "value": [
                  0,
                  0,
                  0,
                  0
                ]
              }
            ]
          }
        },
        {
          "name": "userTokenAccountX",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "account",
                "path": "tokenMintXProgram"
              },
              {
                "kind": "account",
                "path": "tokenMintX"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "userTokenAccountY",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "account",
                "path": "tokenMintYProgram"
              },
              {
                "kind": "account",
                "path": "tokenMintY"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "userTokenAccountWsol",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "account",
                "path": "tokenMintWsolProgram"
              },
              {
                "kind": "account",
                "path": "tokenMintWsol"
              }
            ],
            "program": {
              "kind": "account",
              "path": "associatedTokenProgram"
            }
          }
        },
        {
          "name": "poolTokenReserveX",
          "writable": true
        },
        {
          "name": "poolTokenReserveY",
          "writable": true
        },
        {
          "name": "poolWsolReserve",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108,
                  95,
                  119,
                  115,
                  111,
                  108,
                  95,
                  114,
                  101,
                  115,
                  101,
                  114,
                  118,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "order",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  100,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amountIn",
          "type": "u64"
        },
        {
          "name": "isSwapXToY",
          "type": "bool"
        },
        {
          "name": "cMin",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    },
    {
      "name": "updateAmmConfig",
      "discriminator": [
        49,
        60,
        174,
        136,
        154,
        28,
        116,
        200
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "The config admin"
          ],
          "signer": true,
          "address": "5hHsEaTXVNhsYT7TgkrPB3GwZ7ZYrtzC5t3KTLNuwJkB"
        },
        {
          "name": "ammConfig",
          "docs": [
            "Config account to be changed"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  109,
                  109,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "const",
                "value": [
                  0,
                  0,
                  0,
                  0
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "param",
          "type": "u8"
        },
        {
          "name": "value",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "ammConfig",
      "discriminator": [
        218,
        244,
        33,
        104,
        203,
        203,
        43,
        111
      ]
    },
    {
      "name": "order",
      "discriminator": [
        134,
        173,
        223,
        185,
        77,
        86,
        28,
        51
      ]
    },
    {
      "name": "pool",
      "discriminator": [
        241,
        154,
        109,
        4,
        17,
        177,
        109,
        188
      ]
    }
  ],
  "events": [
    {
      "name": "addLiquidity",
      "discriminator": [
        31,
        94,
        125,
        90,
        227,
        52,
        61,
        186
      ]
    },
    {
      "name": "cancel",
      "discriminator": [
        196,
        40,
        17,
        225,
        87,
        58,
        126,
        44
      ]
    },
    {
      "name": "initializePool",
      "discriminator": [
        145,
        104,
        208,
        79,
        8,
        159,
        145,
        240
      ]
    },
    {
      "name": "removeLiquidity",
      "discriminator": [
        116,
        244,
        97,
        232,
        103,
        31,
        152,
        58
      ]
    },
    {
      "name": "settle",
      "discriminator": [
        172,
        88,
        86,
        73,
        227,
        209,
        204,
        56
      ]
    },
    {
      "name": "slash",
      "discriminator": [
        157,
        91,
        23,
        33,
        129,
        182,
        68,
        120
      ]
    },
    {
      "name": "swap",
      "discriminator": [
        81,
        108,
        227,
        190,
        205,
        208,
        10,
        196
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidInput",
      "msg": "Invalid input"
    },
    {
      "code": 6001,
      "name": "invalidProof",
      "msg": "Invalid proof"
    },
    {
      "code": 6002,
      "name": "invalidTokenMint",
      "msg": "Invalid token mint"
    },
    {
      "code": 6003,
      "name": "tooFewTokensSupplied",
      "msg": "Invalid deposit, too few tokens"
    },
    {
      "code": 6004,
      "name": "receivedZeroTokens",
      "msg": "Pool received X or Y token quantity is 0"
    },
    {
      "code": 6005,
      "name": "slippageExceeded",
      "msg": "Slippage tolerance exceeded"
    },
    {
      "code": 6006,
      "name": "mathOverflow",
      "msg": "Math overflow"
    },
    {
      "code": 6007,
      "name": "mathUnderflow",
      "msg": "Math underflow"
    },
    {
      "code": 6008,
      "name": "invalidGroth16Verifier",
      "msg": "Unable to create Groth16Verifier"
    },
    {
      "code": 6009,
      "name": "invalidTokenOrder",
      "msg": "Invalid token order"
    },
    {
      "code": 6010,
      "name": "invalidSwapAmount",
      "msg": "Invalid swap amount"
    },
    {
      "code": 6011,
      "name": "invalidLpMint",
      "msg": "Invalid LP mint"
    },
    {
      "code": 6012,
      "name": "invalidMetadataAccount",
      "msg": "Invalid metadata account"
    },
    {
      "code": 6013,
      "name": "publicSignalAndPoolReserveMismatch",
      "msg": "Pool reserve and public signals mismatch"
    },
    {
      "code": 6014,
      "name": "poolInputAmountMismatch",
      "msg": "Proof input not equal to pool input"
    },
    {
      "code": 6015,
      "name": "poolOutputAmountTooLow",
      "msg": "Proof amount received exceeds pool output"
    },
    {
      "code": 6016,
      "name": "invalidPublicSignals",
      "msg": "Unable to parse public signals"
    },
    {
      "code": 6017,
      "name": "lpMintAlreadyInitialized",
      "msg": "LP mint already initialized"
    },
    {
      "code": 6018,
      "name": "liquidityTooLow",
      "msg": "Liquidity too low"
    },
    {
      "code": 6019,
      "name": "transferFeeCalculateNotMatch",
      "msg": "Invalid transfer calculation"
    },
    {
      "code": 6020,
      "name": "configAlreadyExists",
      "msg": "Config is already initialized"
    },
    {
      "code": 6021,
      "name": "invalidAdmin",
      "msg": "Invalid admin address"
    },
    {
      "code": 6022,
      "name": "insufficientSolBalance",
      "msg": "Insufficient SOL balance for WSOL deposit"
    },
    {
      "code": 6023,
      "name": "orderExpired",
      "msg": "Order expired"
    },
    {
      "code": 6024,
      "name": "orderStillValid",
      "msg": "Order still valid"
    },
    {
      "code": 6025,
      "name": "ammHalted",
      "msg": "AMM is halted"
    },
    {
      "code": 6026,
      "name": "orderDataMismatch",
      "msg": "Order data doesn't match"
    },
    {
      "code": 6027,
      "name": "zeroTokenOutput",
      "msg": "Liquidity tokens did not yield any pair tokens"
    }
  ],
  "types": [
    {
      "name": "addLiquidity",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "supplier",
            "type": "pubkey"
          },
          {
            "name": "maxAmountX",
            "type": "u64"
          },
          {
            "name": "maxAmountY",
            "type": "u64"
          },
          {
            "name": "transferInX",
            "type": "u64"
          },
          {
            "name": "transferInY",
            "type": "u64"
          },
          {
            "name": "liquidityMinted",
            "type": "u64"
          },
          {
            "name": "newReserveX",
            "type": "u64"
          },
          {
            "name": "newReserveY",
            "type": "u64"
          },
          {
            "name": "availableReserveX",
            "type": "u64"
          },
          {
            "name": "availableReserveY",
            "type": "u64"
          },
          {
            "name": "tokenMintLp",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "ammConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tradeFeeRate",
            "type": "u64"
          },
          {
            "name": "createPoolFee",
            "type": "u64"
          },
          {
            "name": "protocolFeeRate",
            "type": "u64"
          },
          {
            "name": "createPoolFeeVault",
            "type": "pubkey"
          },
          {
            "name": "wsolTradeDeposit",
            "type": "u64"
          },
          {
            "name": "deadlineSlotDuration",
            "type": "u64"
          },
          {
            "name": "halted",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "cancel",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "caller",
            "type": "pubkey"
          },
          {
            "name": "trader",
            "type": "pubkey"
          },
          {
            "name": "direction",
            "type": "u8"
          },
          {
            "name": "deadline",
            "type": "u64"
          },
          {
            "name": "protocolFee",
            "type": "u64"
          },
          {
            "name": "amountIn",
            "type": "u64"
          },
          {
            "name": "amountOut",
            "type": "u64"
          },
          {
            "name": "wsolToOrderOwner",
            "type": "u64"
          },
          {
            "name": "wsolToCaller",
            "type": "u64"
          },
          {
            "name": "solToCaller",
            "type": "u64"
          },
          {
            "name": "actualAmountIn",
            "type": "u64"
          },
          {
            "name": "newReserveX",
            "type": "u64"
          },
          {
            "name": "newReserveY",
            "type": "u64"
          },
          {
            "name": "availableReserveX",
            "type": "u64"
          },
          {
            "name": "availableReserveY",
            "type": "u64"
          },
          {
            "name": "lockedX",
            "type": "u64"
          },
          {
            "name": "lockedY",
            "type": "u64"
          },
          {
            "name": "userLockedX",
            "type": "u64"
          },
          {
            "name": "userLockedY",
            "type": "u64"
          },
          {
            "name": "protocolFeeX",
            "type": "u64"
          },
          {
            "name": "protocolFeeY",
            "type": "u64"
          },
          {
            "name": "userTokenAccountX",
            "type": "pubkey"
          },
          {
            "name": "userTokenAccountY",
            "type": "pubkey"
          },
          {
            "name": "tokenMintLp",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "initializePool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "trader",
            "type": "pubkey"
          },
          {
            "name": "liquidityMinted",
            "type": "u64"
          },
          {
            "name": "solCreatePoolFee",
            "type": "u64"
          },
          {
            "name": "newReserveX",
            "type": "u64"
          },
          {
            "name": "newReserveY",
            "type": "u64"
          },
          {
            "name": "tokenMintX",
            "type": "pubkey"
          },
          {
            "name": "tokenMintY",
            "type": "pubkey"
          },
          {
            "name": "tokenMintLp",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "order",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "trader",
            "type": "pubkey"
          },
          {
            "name": "actualIn",
            "type": "u64"
          },
          {
            "name": "exchangeIn",
            "type": "u64"
          },
          {
            "name": "actualOut",
            "type": "u64"
          },
          {
            "name": "dIn",
            "type": "u64"
          },
          {
            "name": "dOut",
            "type": "u64"
          },
          {
            "name": "cMin",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "deadline",
            "type": "u64"
          },
          {
            "name": "isXToY",
            "type": "bool"
          },
          {
            "name": "protocolFee",
            "type": "u64"
          },
          {
            "name": "wsolDeposit",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "pool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "ammConfig",
            "type": "pubkey"
          },
          {
            "name": "tokenMintX",
            "type": "pubkey"
          },
          {
            "name": "tokenMintY",
            "type": "pubkey"
          },
          {
            "name": "reserveX",
            "type": "pubkey"
          },
          {
            "name": "reserveY",
            "type": "pubkey"
          },
          {
            "name": "tokenLpSupply",
            "type": "u64"
          },
          {
            "name": "protocolFeeX",
            "type": "u64"
          },
          {
            "name": "protocolFeeY",
            "type": "u64"
          },
          {
            "name": "lockedX",
            "type": "u64"
          },
          {
            "name": "lockedY",
            "type": "u64"
          },
          {
            "name": "userLockedX",
            "type": "u64"
          },
          {
            "name": "userLockedY",
            "type": "u64"
          },
          {
            "name": "pendingTrades",
            "type": "u32"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "removeLiquidity",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "supplier",
            "type": "pubkey"
          },
          {
            "name": "minAmountX",
            "type": "u64"
          },
          {
            "name": "minAmountY",
            "type": "u64"
          },
          {
            "name": "transferOutX",
            "type": "u64"
          },
          {
            "name": "transferOutY",
            "type": "u64"
          },
          {
            "name": "liquidityBurned",
            "type": "u64"
          },
          {
            "name": "newReserveX",
            "type": "u64"
          },
          {
            "name": "newReserveY",
            "type": "u64"
          },
          {
            "name": "availableReserveX",
            "type": "u64"
          },
          {
            "name": "availableReserveY",
            "type": "u64"
          },
          {
            "name": "tokenMintLp",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "settle",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "caller",
            "type": "pubkey"
          },
          {
            "name": "trader",
            "type": "pubkey"
          },
          {
            "name": "direction",
            "type": "u8"
          },
          {
            "name": "deadline",
            "type": "u64"
          },
          {
            "name": "protocolFee",
            "type": "u64"
          },
          {
            "name": "amountIn",
            "type": "u64"
          },
          {
            "name": "amountOut",
            "type": "u64"
          },
          {
            "name": "actualAmountIn",
            "type": "u64"
          },
          {
            "name": "wsolToTrader",
            "type": "u64"
          },
          {
            "name": "wsolToCaller",
            "type": "u64"
          },
          {
            "name": "solToTrader",
            "type": "u64"
          },
          {
            "name": "actualAmountOut",
            "type": "u64"
          },
          {
            "name": "newReserveX",
            "type": "u64"
          },
          {
            "name": "newReserveY",
            "type": "u64"
          },
          {
            "name": "availableReserveX",
            "type": "u64"
          },
          {
            "name": "availableReserveY",
            "type": "u64"
          },
          {
            "name": "lockedX",
            "type": "u64"
          },
          {
            "name": "lockedY",
            "type": "u64"
          },
          {
            "name": "userLockedX",
            "type": "u64"
          },
          {
            "name": "userLockedY",
            "type": "u64"
          },
          {
            "name": "protocolFeeX",
            "type": "u64"
          },
          {
            "name": "protocolFeeY",
            "type": "u64"
          },
          {
            "name": "userTokenAccountX",
            "type": "pubkey"
          },
          {
            "name": "userTokenAccountY",
            "type": "pubkey"
          },
          {
            "name": "tokenMintLp",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "slash",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "caller",
            "type": "pubkey"
          },
          {
            "name": "trader",
            "type": "pubkey"
          },
          {
            "name": "direction",
            "type": "u8"
          },
          {
            "name": "deadline",
            "type": "u64"
          },
          {
            "name": "protocolFee",
            "type": "u64"
          },
          {
            "name": "amountIn",
            "type": "u64"
          },
          {
            "name": "amountOut",
            "type": "u64"
          },
          {
            "name": "wsolToTrader",
            "type": "u64"
          },
          {
            "name": "wsolToCaller",
            "type": "u64"
          },
          {
            "name": "solToCaller",
            "type": "u64"
          },
          {
            "name": "actualAmountIn",
            "type": "u64"
          },
          {
            "name": "newReserveX",
            "type": "u64"
          },
          {
            "name": "newReserveY",
            "type": "u64"
          },
          {
            "name": "availableReserveX",
            "type": "u64"
          },
          {
            "name": "availableReserveY",
            "type": "u64"
          },
          {
            "name": "lockedX",
            "type": "u64"
          },
          {
            "name": "lockedY",
            "type": "u64"
          },
          {
            "name": "userLockedX",
            "type": "u64"
          },
          {
            "name": "userLockedY",
            "type": "u64"
          },
          {
            "name": "protocolFeeX",
            "type": "u64"
          },
          {
            "name": "protocolFeeY",
            "type": "u64"
          },
          {
            "name": "userTokenAccountX",
            "type": "pubkey"
          },
          {
            "name": "userTokenAccountY",
            "type": "pubkey"
          },
          {
            "name": "tokenMintLp",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "swap",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "trader",
            "type": "pubkey"
          },
          {
            "name": "direction",
            "type": "u8"
          },
          {
            "name": "deadline",
            "type": "u64"
          },
          {
            "name": "tradeFee",
            "type": "u64"
          },
          {
            "name": "protocolFee",
            "type": "u64"
          },
          {
            "name": "amountIn",
            "type": "u64"
          },
          {
            "name": "amountOut",
            "type": "u64"
          },
          {
            "name": "actualAmountIn",
            "type": "u64"
          },
          {
            "name": "wsolDeposit",
            "type": "u64"
          },
          {
            "name": "actualAmountOut",
            "type": "u64"
          },
          {
            "name": "newReserveX",
            "type": "u64"
          },
          {
            "name": "newReserveY",
            "type": "u64"
          },
          {
            "name": "availableReserveX",
            "type": "u64"
          },
          {
            "name": "availableReserveY",
            "type": "u64"
          },
          {
            "name": "lockedX",
            "type": "u64"
          },
          {
            "name": "lockedY",
            "type": "u64"
          },
          {
            "name": "userLockedX",
            "type": "u64"
          },
          {
            "name": "userLockedY",
            "type": "u64"
          },
          {
            "name": "protocolFeeX",
            "type": "u64"
          },
          {
            "name": "protocolFeeY",
            "type": "u64"
          },
          {
            "name": "userTokenAccountX",
            "type": "pubkey"
          },
          {
            "name": "userTokenAccountY",
            "type": "pubkey"
          },
          {
            "name": "tokenMintLp",
            "type": "pubkey"
          }
        ]
      }
    }
  ]
};
