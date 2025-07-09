# Darklake Wallet Emulator

A simple TypeScript wallet emulator that executes a single swap operation on the Darklake DEX through a gateway API.

## Features

- Load wallet from private key bytes
- Make HTTP request to gateway for unsigned transaction
- Sign transaction with loaded wallet
- Submit signed transaction to gateway
- Single execution with automatic exit
- Support for devnet and mainnet networks

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Solana CLI tools (optional, for key generation)

## Installation

1. Install dependencies:
```bash
pnpm install
```

2. Build the project:
```bash
pnpm run build
```

## Configuration

1. Create a `.env` file with your configuration:
```env
# Wallet Configuration
PRIVATE_KEY_BYTES="[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]"

# Gateway URLs
GATEWAY_SWAP_URL="https://your-gateway.com/api/swap"
GATEWAY_SIGNED_TX_URL="https://your-gateway.com/api/submit-signed-tx"

# Swap Parameters
TOKEN_X_MINT="So11111111111111111111111111111111111111112"  # SOL
TOKEN_Y_MINT="EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"  # USDC
INPUT_AMOUNT=1000
SLIPPAGE=100 # % 
NETWORK=devnet
```

2. Create a private key:
```bash
# Generate a new keypair (optional)
solana-keygen new --outfile key.json

# Copy the array of bytes to PRIVATE_KEY_BYTES
```

## Usage

### Development Mode
```bash
pnpm run dev
```

### Production Mode
```bash
pnpm start
```

### Build Only
```bash
pnpm run build
```

## How It Works

1. **Load Wallet**: The emulator loads a Solana keypair from the `PRIVATE_KEY_BYTES` environment variable
2. **Request Swap**: Makes an HTTP POST request to `GATEWAY_SWAP_URL` with swap parameters
3. **Receive Transaction**: Gets an unsigned Solana transaction from the gateway response
4. **Sign Transaction**: Signs the transaction using the loaded wallet
5. **Submit Transaction**: Sends the signed transaction to `GATEWAY_SIGNED_TX_URL`
6. **Exit**: The program exits after completion

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PRIVATE_KEY_BYTES` | JSON array of private key bytes | Yes | - |
| `GATEWAY_SWAP_URL` | Gateway endpoint for swap requests | Yes | - |
| `GATEWAY_SIGNED_TX_URL` | Gateway endpoint for submitting signed transactions | Yes | - |
| `TOKEN_X_MINT` | Token X mint address | Yes | - |
| `TOKEN_Y_MINT` | Token Y mint address | Yes | - |
| `INPUT_AMOUNT` | Amount of token X to swap | Yes | 1000 |
| `SLIPPAGE` | Slippage tolerance in basis points | Yes | 100 |
| `NETWORK` | Solana network (devnet, mainnet) | Yes | devnet |

## API Interface

### Swap Request (POST to GATEWAY_SWAP_URL)
```json
{
  "user_address": "string",
  "token_mint_x": "string",
  "token_mint_y": "string", 
  "amount_in": "number",
  "slippage": "number",
  "network": "devnet" | "mainnet"
}
```

### Swap Response
```json
{
  "unsigned_transaction": "base64-encoded-transaction"
}
```

### Signed Transaction Request (POST to GATEWAY_SIGNED_TX_URL)
```json
{
  "signed_transaction": "base64-encoded-signed-transaction"
}
```

### Signed Transaction Response
```json
{
  "success": "boolean",
  "message": "string",
  "txHash": "string"
}
```

## Project Structure

```
gateway-wallet/
├── src/
│   ├── index.ts          # Main entry point
│   └── types.ts          # TypeScript type definitions
├── package.json
├── tsconfig.json
└── README.md
```

## Security Notes

- Keep your private key secure and never commit it to version control
- Use environment variables for sensitive configuration
- Consider using a dedicated wallet for testing operations
- Verify gateway URLs before use

## Troubleshooting

### Common Issues

1. **Private key format error**: Ensure `PRIVATE_KEY_BYTES` is a valid JSON array of numbers
2. **Gateway connection failed**: Check your gateway URLs and network connectivity
3. **Transaction signing failed**: Verify the private key is correct and has sufficient funds
4. **Invalid response format**: Check that the gateway returns the expected JSON structure
5. **Network mismatch**: Ensure the `NETWORK` parameter matches your gateway configuration

### Logs

The emulator provides detailed logging:
- Wallet loading confirmation
- Request parameters
- Transaction signing status
- Gateway response details
- Success/failure status

## License

MIT 