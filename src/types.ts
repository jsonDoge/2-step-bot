import { PublicKey } from '@solana/web3.js';

export interface Token {
    mint: PublicKey;
    programId: PublicKey;
    name: string;
    symbol: string;
}

export interface SlashConfig {
    network: string;
    orderOwner: PublicKey;
    privateKeyBytes: string;
    rpcUrl: string;
}

export interface Config {
    network: string;
    inputAmount: number;
    minOut: number;
    privateKeyBytes: string;
    rpcUrl: string;
}

export interface BotConfig extends Config {
    cronSchedule: string;
}

export interface ProofResult {
    proofA: Uint8Array;
    proofB: Uint8Array;
    proofC: Uint8Array;
    publicSignals: Uint8Array[];
} 