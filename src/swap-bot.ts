import * as dotenv from 'dotenv';
dotenv.config();
import {
    AnchorProvider,
    Wallet,
    Provider,
    Program,
    BN,
    web3,
    setProvider,
} from '@coral-xyz/anchor';
import {
    TOKEN_PROGRAM_ID,
    TOKEN_2022_PROGRAM_ID,
    NATIVE_MINT,
    createAssociatedTokenAccountIdempotentInstruction,
    getAssociatedTokenAddressSync,
    ASSOCIATED_TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import {
    PublicKey,
    Transaction,
    sendAndConfirmTransaction,
    Keypair,
} from '@solana/web3.js';
import { getDarklakeProgram, DarklakeType } from './darklake';
import { Token, BotConfig } from './types';
import { generatePoseidonCommitment, generateProof } from './proof';
import { to32ByteBuffer } from './utils';
import { Buffer } from 'buffer';
import * as fs from 'fs';

console.log('Found TOKEN_Y_MINT', process.env.TOKEN_Y_MINT);
console.log('Found TOKEN_X_MINT', process.env.TOKEN_X_MINT);

// TODO: improve token definitions to accept arguments
// Token definitions - these should be configured for your specific tokens
const TOKEN_Y: Token = {
    mint: new PublicKey(process.env.TOKEN_Y_MINT || 'Missing token Y'), // Replace with actual token mint
    programId: TOKEN_PROGRAM_ID,
    name: 'TokenYYY',
    symbol: 'TKY',
};

const TOKEN_X: Token = {
    mint: new PublicKey(process.env.TOKEN_X_MINT || 'Missing token X'), // Replace with actual token mint
    programId: TOKEN_2022_PROGRAM_ID,
    name: 'TokenXXX',
    symbol: 'TKX',
};

const TOKEN_WSOL: Token = {
    mint: NATIVE_MINT,
    programId: TOKEN_PROGRAM_ID,
    name: 'Wrapped SOL',
    symbol: 'WSOL',
};

export class SwapBot {
    private config: BotConfig;
    private wallet: Wallet;
    private provider: AnchorProvider;
    private program: Program<DarklakeType>;

    constructor(
        config: BotConfig,
        wallet: Wallet,
        provider: AnchorProvider,
        program: Program<DarklakeType>
    ) {
        this.config = config;
        this.wallet = wallet;
        this.provider = provider;
        this.program = program;
    }

    async initialize(): Promise<void> {
        console.log('Initializing SwapBot...');
        
        // Load private key from file
        const privateKeyData = fs.readFileSync(this.config.privateKeyPath, 'utf8');
        const privateKeyArray = JSON.parse(privateKeyData);
        const keypair = Keypair.fromSecretKey(new Uint8Array(privateKeyArray));
        
        // Create wallet
        this.wallet = new Wallet(keypair);
        
        // Create connection
        const connection = new web3.Connection(this.config.rpcUrl, 'confirmed');
        
        // Create provider
        this.provider = new AnchorProvider(connection, this.wallet, {
            commitment: 'confirmed',
            preflightCommitment: 'confirmed',
        });
        
        // Set provider
        setProvider(this.provider);
        
        // Initialize program
        this.program = getDarklakeProgram(this.provider);
        
        console.log('SwapBot initialized successfully');
        console.log('Wallet address:', this.wallet.publicKey.toString());
    }

    /**
     * Creates associated token accounts for the user if they don't exist
     */
    private async ensureTokenAccounts(
        tokens: Token[],
    ): Promise<PublicKey[]> {
        console.log('Ensuring token accounts exist...');

        const accounts: PublicKey[] = [];

        for (const token of tokens) {
            const ata = getAssociatedTokenAddressSync(
                token.mint,
                this.wallet.publicKey,
                false,
                token.programId,
            );

            // Check if account exists
            const accountInfo = await this.provider.connection.getAccountInfo(ata);

            if (!accountInfo) {
                console.log(`Creating ATA for ${token.symbol}: ${ata.toString()}`);

                const createAtaIx =
                    createAssociatedTokenAccountIdempotentInstruction(
                        this.wallet.publicKey,
                        ata,
                        this.wallet.publicKey,
                        token.mint,
                        token.programId,
                    );

                const tx = new Transaction().add(createAtaIx);
                await sendAndConfirmTransaction(this.provider.connection, tx, [
                    this.wallet.payer,
                ]);
            } else {
                console.log(
                    `ATA for ${token.symbol} already exists: ${ata.toString()}`,
                );
            }

            accounts.push(ata);
        }

        return accounts;
    }

    /**
     * Performs a swap from X to Y tokens
     */
    private async performSwap(
        poolPubkey: PublicKey,
        inputAmount: number,
        minOut: number,
        salt: number,
        isSwapXtoY: boolean,
    ): Promise<void> {
        console.log(
            isSwapXtoY
                ? `Performing swap: ${inputAmount} ${TOKEN_X.symbol} -> ${TOKEN_Y.symbol}`
                : `Performing swap: ${inputAmount} ${TOKEN_Y.symbol} -> ${TOKEN_X.symbol}`,
        );
        console.log(`Min output: ${minOut} ${isSwapXtoY ? TOKEN_Y.symbol : TOKEN_X.symbol}`);
        console.log(`Salt: ${salt}`);

        // Get token accounts
        const [userTokenAccountX] = PublicKey.findProgramAddressSync(
            [
                this.wallet.publicKey.toBuffer(),
                TOKEN_X.programId.toBuffer(),
                TOKEN_X.mint.toBuffer(),
            ],
            ASSOCIATED_TOKEN_PROGRAM_ID,
        );

        const [userTokenAccountY] = PublicKey.findProgramAddressSync(
            [
                this.wallet.publicKey.toBuffer(),
                TOKEN_Y.programId.toBuffer(),
                TOKEN_Y.mint.toBuffer(),
            ],
            ASSOCIATED_TOKEN_PROGRAM_ID,
        );

        const [userTokenAccountWsol] = PublicKey.findProgramAddressSync(
            [
                this.wallet.publicKey.toBuffer(),
                TOKEN_WSOL.programId.toBuffer(),
                TOKEN_WSOL.mint.toBuffer(),
            ],
            ASSOCIATED_TOKEN_PROGRAM_ID,
        );

        // Get pool reserve accounts
        const [poolTokenAccountX] = PublicKey.findProgramAddressSync(
            [
                Buffer.from('pool_reserve'),
                poolPubkey.toBuffer(),
                TOKEN_X.mint.toBuffer(),
            ],
            this.program.programId,
        );

        const [poolTokenAccountY] = PublicKey.findProgramAddressSync(
            [
                Buffer.from('pool_reserve'),
                poolPubkey.toBuffer(),
                TOKEN_Y.mint.toBuffer(),
            ],
            this.program.programId,
        );

        // Generate Poseidon commitment
        const poseidonHash = await generatePoseidonCommitment(minOut, salt);
        console.log(`Generated Poseidon commitment: ${poseidonHash}`);

        // Create swap transaction
        const tx = await this.program.methods
            .swap(
                new BN(inputAmount),
                isSwapXtoY, // isSwapXtoY
                Array.from(to32ByteBuffer(poseidonHash)),
            )
            .accountsPartial({
                tokenMintX: TOKEN_X.mint,
                tokenMintY: TOKEN_Y.mint,
                tokenMintWsol: TOKEN_WSOL.mint,
                tokenMintXProgram: TOKEN_X.programId,
                tokenMintYProgram: TOKEN_Y.programId,
                tokenMintWsolProgram: TOKEN_WSOL.programId,
                pool: poolPubkey,
                userTokenAccountX: userTokenAccountX,
                userTokenAccountY: userTokenAccountY,
                userTokenAccountWsol: userTokenAccountWsol,
                poolTokenReserveX: poolTokenAccountX,
                poolTokenReserveY: poolTokenAccountY,
                user: this.wallet.publicKey,
            })
            .transaction();

        // Add compute budget instruction
        const modifyComputeUnits = web3.ComputeBudgetProgram.setComputeUnitLimit({
            units: 250_000,
        });
        tx.add(modifyComputeUnits);

        // Send transaction
        await sendAndConfirmTransaction(this.provider.connection, tx, [
            this.wallet.payer,
        ]);
        console.log('Swap transaction completed successfully!');
    }

    /**
     * Fetches order account to get actual output
     */
    private async fetchOrderAccount(
        poolPubkey: PublicKey,
    ): Promise<{ dOut: number; cMin: number[] }> {
        const [orderPubkey] = PublicKey.findProgramAddressSync(
            [
                Buffer.from('order'),
                poolPubkey.toBuffer(),
                this.wallet.publicKey.toBuffer(),
            ],
            this.program.programId,
        );

        const orderAccount = await this.program.account.order.fetch(orderPubkey);

        console.log('Order account:', orderAccount);
        return {
            dOut: orderAccount.dOut.toNumber(),
            cMin: orderAccount.cMin,
        };
    }

    /**
     * Settles the swap with actual output
     */
    private async settleSwap(
        poolPubkey: PublicKey,
        minOut: number,
        salt: number,
        output: number,
    ): Promise<void> {
        console.log(`Settling swap with output: ${output} ${TOKEN_Y.symbol}`);

        // Get token accounts
        const [userTokenAccountX] = PublicKey.findProgramAddressSync(
            [
                this.wallet.publicKey.toBuffer(),
                TOKEN_X.programId.toBuffer(),
                TOKEN_X.mint.toBuffer(),
            ],
            ASSOCIATED_TOKEN_PROGRAM_ID,
        );

        const [userTokenAccountY] = PublicKey.findProgramAddressSync(
            [
                this.wallet.publicKey.toBuffer(),
                TOKEN_Y.programId.toBuffer(),
                TOKEN_Y.mint.toBuffer(),
            ],
            ASSOCIATED_TOKEN_PROGRAM_ID,
        );

        const [userTokenAccountWsol] = PublicKey.findProgramAddressSync(
            [
                this.wallet.publicKey.toBuffer(),
                TOKEN_WSOL.programId.toBuffer(),
                TOKEN_WSOL.mint.toBuffer(),
            ],
            ASSOCIATED_TOKEN_PROGRAM_ID,
        );

        const [callerTokenAccountWsol] = PublicKey.findProgramAddressSync(
            [
                this.wallet.publicKey.toBuffer(),
                TOKEN_WSOL.programId.toBuffer(),
                TOKEN_WSOL.mint.toBuffer(),
            ],
            ASSOCIATED_TOKEN_PROGRAM_ID,
        );

        // Get order account
        const [orderPubkey] = PublicKey.findProgramAddressSync(
            [
                Buffer.from('order'),
                poolPubkey.toBuffer(),
                this.wallet.publicKey.toBuffer(),
            ],
            this.program.programId,
        );

        // Get pool reserve accounts
        const [poolTokenAccountX] = PublicKey.findProgramAddressSync(
            [
                Buffer.from('pool_reserve'),
                poolPubkey.toBuffer(),
                TOKEN_X.mint.toBuffer(),
            ],
            this.program.programId,
        );

        const [poolTokenAccountY] = PublicKey.findProgramAddressSync(
            [
                Buffer.from('pool_reserve'),
                poolPubkey.toBuffer(),
                TOKEN_Y.mint.toBuffer(),
            ],
            this.program.programId,
        );

        // Generate proof
        console.log('Generating Groth16 proof...');
        const privateInputs = {
            minOut: minOut.toString(),
            salt: salt.toString(),
        };
        const publicInputs = {
            realOut: output.toString(),
            commitment: await generatePoseidonCommitment(minOut, salt),
        };

        const { proofA, proofB, proofC, publicSignals } = await generateProof(
            privateInputs,
            publicInputs,
        );
        console.log('Proof generated successfully!');

        // Create settle transaction
        const tx = await this.program.methods
            .settle(
                Array.from(proofA),
                Array.from(proofB),
                Array.from(proofC),
                publicSignals.map((signal) => Array.from(signal)),
            )
            .accountsPartial({
                tokenMintX: TOKEN_X.mint,
                tokenMintY: TOKEN_Y.mint,
                tokenMintWsol: TOKEN_WSOL.mint,
                tokenMintXProgram: TOKEN_X.programId,
                tokenMintYProgram: TOKEN_Y.programId,
                tokenMintWsolProgram: TOKEN_WSOL.programId,
                userTokenAccountX: userTokenAccountX,
                userTokenAccountY: userTokenAccountY,
                userTokenAccountWsol: userTokenAccountWsol,
                callerTokenAccountWsol: callerTokenAccountWsol,
                order: orderPubkey,
                orderOwner: this.wallet.publicKey,
                caller: this.wallet.publicKey,
                pool: poolPubkey,
                poolTokenReserveX: poolTokenAccountX,
                poolTokenReserveY: poolTokenAccountY,
            })
            .transaction();

        // Add compute budget instruction
        const modifyComputeUnits = web3.ComputeBudgetProgram.setComputeUnitLimit({
            units: 500_000,
        });
        tx.add(modifyComputeUnits);

        // Send transaction
        await sendAndConfirmTransaction(this.provider.connection, tx, [
            this.wallet.payer,
        ]);
        console.log('Settle transaction completed successfully!');
    }

    /**
     * Main trading function
     */
    async executeTrade(isSwapXtoY: boolean = true): Promise<void> {
        console.log(`Starting ${isSwapXtoY ? 'X to Y' : 'Y to X'} trade...`);
        console.log(`Input amount: ${this.config.inputAmount} ${TOKEN_X.symbol}`);
        console.log(`Min output: ${this.config.minOut} ${TOKEN_Y.symbol}`);

        try {
            // Ensure token accounts exist
            await this.ensureTokenAccounts([TOKEN_X, TOKEN_Y, TOKEN_WSOL]);

            // Find AMM config
            const [ammConfig] = PublicKey.findProgramAddressSync(
                [Buffer.from('amm_config'), new BN(0).toArrayLike(Buffer, 'le', 4)],
                this.program.programId,
            );

            console.log('AMM Config:', ammConfig.toString());

            // Find pool
            const [poolPubkey] = PublicKey.findProgramAddressSync(
                [
                    Buffer.from('pool'),
                    ammConfig.toBuffer(),
                    TOKEN_X.mint.toBuffer(),
                    TOKEN_Y.mint.toBuffer(),
                ],
                this.program.programId,
            );

            console.log('Pool:', poolPubkey.toString());

            // Generate a random salt for this trade
            const salt = Math.floor(Math.random() * 1000000);
            console.log(`Using salt: ${salt}`);

            // Step 1: Perform the swap
            console.log('\n=== Step 1: Performing Swap ===');
            await this.performSwap(
                poolPubkey,
                this.config.inputAmount,
                this.config.minOut,
                salt,
                isSwapXtoY,
            );

            // Step 2: Fetch order account to get actual output
            console.log('\n=== Step 2: Fetching Order Account ===');
            const { dOut: output } = await this.fetchOrderAccount(poolPubkey);

            // Step 3: Settle the swap with actual output
            console.log('\n=== Step 3: Settling Swap ===');
            await this.settleSwap(
                poolPubkey,
                this.config.minOut,
                salt,
                output,
            );

            console.log('\n=== Trade Complete ===');
            console.log(
                `Successfully traded ${this.config.inputAmount} 
                ${isSwapXtoY ? TOKEN_X.symbol : TOKEN_Y.symbol} for ${output} ${isSwapXtoY ? TOKEN_Y.symbol : TOKEN_X.symbol}`,
            );
        } catch (error) {
            console.error('Error during trade:', error);
            throw error;
        }
    }
} 