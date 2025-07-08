import { PublicKey } from '@solana/web3.js';

export interface Token {
    mint: PublicKey;
    programId: PublicKey;
    name: string;
    symbol: string;
}

export interface BotConfig {
    network: string;
    inputAmount: number;
    minOut: number;
    privateKeyBytes: string;
    rpcUrl: string;
    cronSchedule: string;
}

export interface ProofResult {
    proofA: Uint8Array;
    proofB: Uint8Array;
    proofC: Uint8Array;
    publicSignals: Uint8Array[];
} 