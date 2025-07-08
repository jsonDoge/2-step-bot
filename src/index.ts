import * as cron from 'cron';
import * as dotenv from 'dotenv';
import { SwapBot } from './swap-bot';
import { BotConfig } from './types';

// Load environment variables
dotenv.config();

console.log('Loading config...');

// Bot configuration
const config: BotConfig = {
    network: process.env.NETWORK || 'devnet',
    inputAmount: parseInt(process.env.INPUT_AMOUNT || '1000'),
    minOut: parseInt(process.env.MIN_OUT || '100'),
    privateKeyBytes: process.env.PRIVATE_KEY_BYTES || '',
    rpcUrl: process.env.RPC_URL || 'https://api.devnet.solana.com',
    cronSchedule: process.env.CRON_SCHEDULE || '* * * * *', // Every minute by default
};


console.log('Creating bot instance...');
// Create bot instance
const bot = new SwapBot(config);

// State to track the parameter value
let isSwapXtoY = false;


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
        rpcUrl: config.rpcUrl,
        cronSchedule: config.cronSchedule,
    });

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