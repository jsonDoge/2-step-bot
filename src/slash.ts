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
import { Token, BotConfig, Config, SlashConfig } from './types';
import { to32ByteBuffer } from './utils';
import { Buffer } from 'buffer';

console.log('Found TOKEN_Y_MINT', process.env.TOKEN_Y_MINT);
console.log('Found TOKEN_X_MINT', process.env.TOKEN_X_MINT);

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

/**
 * Creates associated token accounts for the user if they don't exist
 */
async function ensureTokenAccounts(
    provider: AnchorProvider,
    owner: PublicKey,
    wallet: Wallet,
    tokens: Token[],
): Promise<PublicKey[]> {
    console.log('Ensuring token accounts exist...');

    const accounts: PublicKey[] = [];

    for (const token of tokens) {
        const ata = getAssociatedTokenAddressSync(
            token.mint,
            owner,
            false,
            token.programId,
        );

        // Check if account exists
        const accountInfo = await provider.connection.getAccountInfo(ata);

        if (!accountInfo) {
            console.log(`Creating ATA for ${token.symbol}: ${ata.toString()}`);

            const createAtaIx =
                createAssociatedTokenAccountIdempotentInstruction(
                    wallet.publicKey,
                    ata,
                    owner,
                    token.mint,
                    token.programId,
                );

            const tx = new Transaction().add(createAtaIx);
            await sendAndConfirmTransaction(provider.connection, tx, [
                wallet.payer,
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
 * Slashes the swap after deadline has passed
 */
async function slashSwap(
    provider: AnchorProvider,
    program: Program<DarklakeType>,
    orderOwner: PublicKey,
    wallet: Wallet,
    poolPubkey: PublicKey,
): Promise<void> {
    console.log(
        `Slashing swap for order owner: ${orderOwner.toString()}`,
    );

    // Get token accounts for order owner
    const [userTokenAccountX, userTokenAccountY] = await ensureTokenAccounts(
        provider,
        orderOwner,
        wallet,
        [TOKEN_X, TOKEN_Y],
    );

    // Get caller WSOL account
    const [callerTokenAccountWsol] = await ensureTokenAccounts(
        provider,
        wallet.publicKey,
        wallet,
        [TOKEN_WSOL],
    );

    // Get order account
    const [orderPubkey] = PublicKey.findProgramAddressSync(
        [
            Buffer.from('order'),
            poolPubkey.toBuffer(),
            orderOwner.toBuffer(),
        ],
        program.programId,
    );

    // Get pool reserve accounts
    const [poolTokenAccountX] = PublicKey.findProgramAddressSync(
        [
            Buffer.from('pool_reserve'),
            poolPubkey.toBuffer(),
            TOKEN_X.mint.toBuffer(),
        ],
        program.programId,
    );

    const [poolTokenAccountY] = PublicKey.findProgramAddressSync(
        [
            Buffer.from('pool_reserve'),
            poolPubkey.toBuffer(),
            TOKEN_Y.mint.toBuffer(),
        ],
        program.programId,
    );

    // Create slash transaction
    const tx = await program.methods
        .slash()
        .accountsPartial({
            tokenMintX: TOKEN_X.mint,
            tokenMintY: TOKEN_Y.mint,
            tokenMintWsol: TOKEN_WSOL.mint,
            tokenMintXProgram: TOKEN_X.programId,
            tokenMintYProgram: TOKEN_Y.programId,
            tokenMintWsolProgram: TOKEN_WSOL.programId,
            userTokenAccountX: userTokenAccountX,
            userTokenAccountY: userTokenAccountY,
            callerTokenAccountWsol: callerTokenAccountWsol,
            order: orderPubkey,
            orderOwner,
            caller: wallet.publicKey,
            pool: poolPubkey,
            poolTokenReserveX: poolTokenAccountX,
            poolTokenReserveY: poolTokenAccountY,
        })
        .transaction();

    // Add compute budget instruction
    const modifyComputeUnits = web3.ComputeBudgetProgram.setComputeUnitLimit({
        units: 250_000,
    });
    tx.add(modifyComputeUnits);

    // Send transaction
    await sendAndConfirmTransaction(provider.connection, tx, [
        wallet.payer,
    ]);
    console.log('Slash transaction completed successfully!');
}

/**
 * Main slash function - slashes an existing trade
 */
async function executeSlash(
    provider: AnchorProvider,
    program: Program<DarklakeType>,
    orderOwner: PublicKey,
    wallet: Wallet,
): Promise<void> {
    console.log('Starting slash of existing trade...');

    try {
        const [ammConfig] = PublicKey.findProgramAddressSync(
            [Buffer.from('amm_config'), new BN(0).toArrayLike(Buffer, 'le', 4)],
            program.programId,
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
            program.programId,
        );

        console.log('Pool:', poolPubkey.toString());

        // Slash the existing swap
        console.log('\n=== Slashing Existing Swap ===');
        await slashSwap(provider, program, orderOwner, wallet, poolPubkey);

        console.log('\n=== Trade Slashed ===');
        console.log('Successfully slashed existing trade');
        console.log(
            'Caller should receive WSOL deposit and SOL from order closing',
        );
        console.log('Order owner loses their input tokens and WSOL deposit');
    } catch (error) {
        console.error('Error during slash:', error);
        throw error;
    }
}

async function main() {
    console.log('Starting Darklake Slash Bot...');

    // Bot configuration
    const config: SlashConfig = {
        network: process.env.NETWORK || 'devnet',
        privateKeyBytes: process.env.PRIVATE_KEY_BYTES || '',
        rpcUrl: process.env.RPC_URL || 'https://api.devnet.solana.com',
        orderOwner: new PublicKey(process.env.ORDER_OWNER || ''),
    };

    console.log('Configuration:', {
        network: config.network,
        rpcUrl: config.rpcUrl,
        orderOwner: config.orderOwner.toString(),
    });

    console.log('Loading keypair...');
    const privateKeyArray = JSON.parse(config.privateKeyBytes);

    const keypair = Keypair.fromSecretKey(new Uint8Array(privateKeyArray));
    console.log('Loaded keypair with public key:', keypair.publicKey.toBase58());
    
    // Create wallet
    const wallet = new Wallet(keypair);
    
    console.log('Loading connection...');

    // Create connection
    const connection = new web3.Connection(config.rpcUrl, 'confirmed');

    console.log('RPC URL:', config.rpcUrl);
    
    // Create provider
    const provider = new AnchorProvider(connection, wallet, {
        commitment: 'confirmed',
        preflightCommitment: 'confirmed',
    });   

    setProvider(provider);

    console.log('Loading program...');
    const program = getDarklakeProgram(provider);

    try {
        console.log('\n=== Executing Slash ===');
        await executeSlash(provider, program, config.orderOwner, wallet);
        console.log('\n=== Slash Completed Successfully ===');
    } catch (error) {
        console.error('Slash failed:', error);
        process.exit(1);
    }
}

main().catch((error) => {
    console.error('Failed to start slash bot:', error);
    process.exit(1);
});
