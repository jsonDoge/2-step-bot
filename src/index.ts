import * as cron from 'cron';
import * as dotenv from 'dotenv';
import { SwapBot } from './swap-bot';
import { BotConfig } from './types';
import { AnchorProvider, Wallet } from '@coral-xyz/anchor';
import { Connection, Keypair } from '@solana/web3.js';
import * as fs from 'fs';
import { getDarklakeProgram } from './darklake';

// Load environment variables
dotenv.config();

console.log('Loading config...');

// Bot configuration
const config: BotConfig = {
    network: process.env.NETWORK || 'devnet',
    inputAmount: parseInt(process.env.INPUT_AMOUNT || '1000'),
    minOut: parseInt(process.env.MIN_OUT || '100'),
    privateKeyPath: process.env.PRIVATE_KEY_PATH || './key.json',
    rpcUrl: process.env.RPC_URL || 'https://api.devnet.solana.com',
    cronSchedule: process.env.CRON_SCHEDULE || '* * * * *', // Every minute by default
};

console.log('Loading keypair...');
const keypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync(config.privateKeyPath, 'utf8'))));
const wallet = new Wallet(keypair);

console.log('Loaded keypair with public key:', keypair.publicKey.toBase58());

console.log('Loading connection...');
const connection = new Connection(config.rpcUrl);
const provider = new AnchorProvider(
    connection,
    wallet,
    {
        commitment: 'confirmed',
    }
);

console.log('Loading program...');
const program = getDarklakeProgram(provider);

console.log('Creating bot instance...');
// Create bot instance
const bot = new SwapBot(config, wallet, provider, program);

// State to track the parameter value
let isSwapXtoY = false;

// Initialize bot
async function initializeBot() {
    try {
        await bot.initialize();
        console.log('Bot initialized successfully');
    } catch (error) {
        console.error('Failed to initialize bot:', error);
        process.exit(1);
    }
}

// Execute trade function
async function executeTrade() {
    try {
        console.log(`\n[${new Date().toISOString()}] Starting scheduled trade with isSwapXtoY: ${isSwapXtoY}...`);
        await bot.executeTrade(isSwapXtoY);
        console.log(`[${new Date().toISOString()}] Trade completed successfully`);
        
        // Toggle the parameter for next execution
        isSwapXtoY = !isSwapXtoY;
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Trade failed:`, error);
    }
}

// Main function
async function main() {
    console.log('Starting Darklake Swap Bot...');
    console.log('Configuration:', {
        network: config.network,
        inputAmount: config.inputAmount,
        minOut: config.minOut,
        privateKeyPath: config.privateKeyPath,
        rpcUrl: config.rpcUrl,
        cronSchedule: config.cronSchedule,
    });

    // Initialize the bot
    await initializeBot();

    // Create cron job
    const cronJob = new cron.CronJob(
        config.cronSchedule,
        executeTrade,
        null,
        false, // Don't start immediately
        'UTC'
    );

    // Start the cron job
    cronJob.start();
    console.log(`Cron job started with schedule: ${config.cronSchedule}`);

    // Handle graceful shutdown
    process.on('SIGINT', () => {
        console.log('\nReceived SIGINT, shutting down gracefully...');
        cronJob.stop();
        process.exit(0);
    });

    process.on('SIGTERM', () => {
        console.log('\nReceived SIGTERM, shutting down gracefully...');
        cronJob.stop();
        process.exit(0);
    });

    // Keep the process alive
    console.log('Bot is running. Press Ctrl+C to stop.');
}

// Start the bot
main().catch((error) => {
    console.error('Failed to start bot:', error);
    process.exit(1);
}); 