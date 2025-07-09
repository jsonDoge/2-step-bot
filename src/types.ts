export type Network = 'devnet' | 'mainnet';

export interface WalletEmulatorConfig {
    privateKeyBytes: string;
    gatewayHost: string;
    gatewayPort: number;
    tokenX: string;
    tokenY: string;
    inputAmount: number;
    slippage: number;
    network: Network;
}

// gRPC client types
export interface GrpcClient {
    swap: (request: SwapRequest) => Promise<SwapResponse>;
    submitSignedTransaction: (request: SignedTransactionRequest) => Promise<SignedTransactionResponse>;
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
