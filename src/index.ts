import * as dotenv from 'dotenv';
import { Keypair, Transaction } from '@solana/web3.js';
import fetch from 'node-fetch';
import { WalletEmulatorConfig, SwapRequest, SwapResponse, SignedTransactionRequest, SignedTransactionResponse, Network } from './types';

// Load environment variables
dotenv.config();

// Configuration
const config: WalletEmulatorConfig = {
    privateKeyBytes: process.env.PRIVATE_KEY_BYTES || '',
    gatewaySwapUrl: process.env.GATEWAY_SWAP_URL || '',
    gatewaySignedTxUrl: process.env.GATEWAY_SIGNED_TX_URL || '',
    tokenX: process.env.TOKEN_X_MINT || '',
    tokenY: process.env.TOKEN_Y_MINT || '',
    inputAmount: parseInt(process.env.INPUT_AMOUNT || '1000'),
    slippage: parseInt(process.env.SLIPPAGE || '100'),
    network: process.env.NETWORK as Network || 'devnet',
};

async function makeHttpRequest<T>(url: string, method: 'GET' | 'POST', data?: any): Promise<T> {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    } as any;

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${response.statusText}`);
    }

    return response.json() as Promise<T>;
}

async function executeWalletSwap(): Promise<void> {
    try {
        console.log('Starting wallet emulator...');
        
        // Load wallet from private key bytes
        console.log('Loading wallet from private key...');
        const privateKeyArray = JSON.parse(config.privateKeyBytes);
        const keypair = Keypair.fromSecretKey(new Uint8Array(privateKeyArray));
        const walletPublicKey = keypair.publicKey.toBase58();
        
        console.log('Wallet loaded with public key:', walletPublicKey);
        
        // Prepare swap request
        const swapRequest: SwapRequest = {
            user_address: walletPublicKey,
            token_mint_x: config.tokenX,
            token_mint_y: config.tokenY,
            amount_in: config.inputAmount,
            slippage: config.slippage,
            network: config.network,
        };
        
        console.log('Making swap request to gateway...');
        console.log('Request parameters:', swapRequest);
        
        // Make HTTP request to get unsigned transaction
        const swapResponse: SwapResponse = await makeHttpRequest<SwapResponse>(
            config.gatewaySwapUrl,
            'POST',
            swapRequest
        );
        
        console.log('Received unsigned transaction from gateway');
        
        // Decode and load the unsigned transaction
        // EXPECTS: { unsignedTransaction: string }; // Base64 encoded transaction
        const unsignedTransactionBuffer = Buffer.from(swapResponse.unsigned_transaction, 'base64');
        
        console.log('Signing transaction...');
        
        // Create transaction from buffer and sign it
        const transaction = Transaction.from(unsignedTransactionBuffer);
        transaction.sign(keypair);
        
        // Serialize the signed transaction
        const signedTransactionBase64 = transaction.serialize().toString('base64');
        
        console.log('Transaction signed successfully');
        
        // Prepare signed transaction request
        const signedTxRequest: SignedTransactionRequest = {
            signed_transaction: signedTransactionBase64,
        };
        
        console.log('Submitting signed transaction to gateway...');
        
        // Submit signed transaction
        const signedTxResponse: SignedTransactionResponse = await makeHttpRequest<SignedTransactionResponse>(
            config.gatewaySignedTxUrl,
            'POST',
            signedTxRequest
        );
        
        console.log('Transaction submitted successfully!');
        console.log('Response:', signedTxResponse);
        
        if (signedTxResponse.success) {
            console.log('✅ Swap completed successfully!');
            if (signedTxResponse.txHash) {
                console.log('Transaction hash:', signedTxResponse.txHash);
            }
        } else {
            console.log('❌ Swap failed:', signedTxResponse.message);
        }
        
    } catch (error) {
        console.error('❌ Error during wallet swap:', error);
        throw error;
    }
}

// Main function
async function main() {
    console.log('🚀 Darklake Wallet Emulator');
    console.log('Configuration:', {
        gatewaySwapUrl: config.gatewaySwapUrl,
        gatewaySignedTxUrl: config.gatewaySignedTxUrl,
        tokenX: config.tokenX,
        tokenY: config.tokenY,
        inputAmount: config.inputAmount,
        slippage: config.slippage,
        network: config.network
    });
    
    try {
        await executeWalletSwap();
        console.log('✅ Wallet emulator completed successfully');
    } catch (error) {
        console.error('❌ Wallet emulator failed:', error);
        process.exit(1);
    }
    
    // Exit the program
    console.log('👋 Exiting...');
    process.exit(0);
}

// Start the wallet emulator
main(); 