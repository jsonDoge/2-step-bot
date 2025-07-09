# Darklake Wallet Emulator

A simple TypeScript wallet emulator that executes a single swap operation on the Darklake DEX through a gRPC gateway API.

## Features

- Load wallet from private key bytes
- Make gRPC request to gateway for unsigned transaction
- Sign transaction with loaded wallet
- Submit signed transaction to gateway via gRPC
- Single execution with automatic exit
- Support for devnet and mainnet networks
- Modern gRPC-js implementation

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Solana CLI tools (optional, for key generation)
- gRPC server implementing the gateway.proto interface

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

# gRPC Gateway Configuration
GATEWAY_HOST=localhost
GATEWAY_PORT=50051

# Swap Parameters
TOKEN_X_MINT="So11111111111111111111111111111111111111112"  # SOL
TOKEN_Y_MINT="EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"  # USDC
INPUT_AMOUNT=1000
SLIPPAGE=100
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
2. **Connect to gRPC Gateway**: Establishes a gRPC connection to the gateway server
3. **Request Swap**: Makes a gRPC call to the `Swap` service with swap parameters
4. **Receive Transaction**: Gets an unsigned Solana transaction from the gateway response
5. **Sign Transaction**: Signs the transaction using the loaded wallet
6. **Submit Transaction**: Sends the signed transaction via gRPC to the `SubmitSignedTransaction` service
7. **Exit**: The program exits after completion

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PRIVATE_KEY_BYTES` | JSON array of private key bytes | Yes | - |
| `GATEWAY_HOST` | gRPC gateway host address | Yes | localhost |
| `GATEWAY_PORT` | gRPC gateway port | Yes | 50051 |
| `TOKEN_X_MINT` | Token X mint address | Yes | - |
| `TOKEN_Y_MINT` | Token Y mint address | Yes | - |
| `INPUT_AMOUNT` | Amount of token X to swap | Yes | 1000 |
| `SLIPPAGE` | Slippage tolerance in basis points | Yes | 100 |
| `NETWORK` | Solana network (devnet, mainnet) | Yes | devnet |

## gRPC Service Interface

The emulator expects a gRPC server implementing the following service (defined in `proto/gateway.proto`):

### GatewayService
```protobuf
service GatewayService {
  rpc Swap(SwapRequest) returns (SwapResponse);
  rpc SubmitSignedTransaction(SignedTransactionRequest) returns (SignedTransactionResponse);
}
```

### SwapRequest
```protobuf
message SwapRequest {
  string user_address = 1;
  string token_mint_x = 2;
  string token_mint_y = 3;
  uint64 amount_in = 4;
  uint32 slippage = 5;
  string network = 6;
}
```

### SwapResponse
```protobuf
message SwapResponse {
  string unsigned_transaction = 1; // Base64 encoded transaction
}
```

### SignedTransactionRequest
```protobuf
message SignedTransactionRequest {
  string signed_transaction = 1; // Base64 encoded signed transaction
}
```

### SignedTransactionResponse
```protobuf
message SignedTransactionResponse {
  bool success = 1;
  string message = 2;
  string tx_hash = 3;
}
```

## Project Structure

```
gateway-wallet/
├── src/
│   ├── index.ts          # Main entry point
│   ├── darklake.ts       # Darklake program interface
│   ├── types.ts          # TypeScript type definitions
│   ├── utils.ts          # Utility functions
│   └── darklake-idl.json # Program IDL
├── proto/
│   └── gateway.proto     # gRPC service definition
├── package.json
├── tsconfig.json
└── README.md
```

## Dependencies

- **@grpc/grpc-js**: Modern gRPC implementation for Node.js
- **@grpc/proto-loader**: Dynamic proto loading for gRPC services
- **@solana/web3.js**: Solana blockchain interaction
- **dotenv**: Environment variable management

## Security Notes

- Keep your private key secure and never commit it to version control
- Use environment variables for sensitive configuration
- Consider using a dedicated wallet for testing operations
- Verify gRPC server endpoints before use
- Use TLS/SSL for production gRPC connections

## Troubleshooting

### Common Issues

1. **Private key format error**: Ensure `PRIVATE_KEY_BYTES` is a valid JSON array of numbers
2. **gRPC connection failed**: Check your gateway host/port and ensure the gRPC server is running
3. **Transaction signing failed**: Verify the private key is correct and has sufficient funds
4. **Invalid response format**: Check that the gRPC server returns the expected message structure
5. **Network mismatch**: Ensure the `NETWORK` parameter matches your gateway configuration
6. **Proto file not found**: Ensure `proto/gateway.proto` exists and is accessible

### Logs

The emulator provides detailed logging:
- Wallet loading confirmation
- gRPC connection status
- Request parameters
- Transaction signing status
- Gateway response details
- Success/failure status

## License

MIT 