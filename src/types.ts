export type Network = 'devnet' | 'mainnet';

export interface WalletEmulatorConfig {
    privateKeyBytes: string;
    gatewaySwapUrl: string;
    gatewaySignedTxUrl: string;
    tokenX: string;
    tokenY: string;
    inputAmount: number;
    slippage: number;
    network: Network;
}

export interface SwapRequest {
    user_address: string;
    token_mint_x: string;
    token_mint_y: string;
    amount_in: number;
    slippage: number;
    network: Network;
}

export interface SwapResponse {
    unsigned_transaction: string; // Base64 encoded transaction
}

export interface SignedTransactionRequest {
    signed_transaction: string; // Base64 encoded signed transaction
}

export interface SignedTransactionResponse {
    success: boolean;
    message?: string;
    txHash?: string;
}
