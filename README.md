# Darklake Swap Bot

A standalone TypeScript bot that automatically executes swap and settle operations on the Darklake DEX using cron scheduling.

## Features

- Automated swap and settle operations
- Cron-based scheduling (runs every minute by default)
- Private key loading from JSON file
- Configurable trading parameters
- Error handling and logging
- Graceful shutdown handling

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Solana CLI tools (optional, for key generation)

## Installation

1. Navigate to the bot directory:
```bash
cd bot
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Configuration

1. Copy the example environment file:
```bash
cp env.example .env
```

2. Edit the `.env` file with your configuration:
```env
# Network configuration
NETWORK=devnet

# Trading parameters
INPUT_AMOUNT=1000
MIN_OUT=100

# Wallet configuration
PRIVATE_KEY_PATH=./key.json

# RPC configuration
RPC_URL=https://api.devnet.solana.com

# Cron schedule (every minute by default)
CRON_SCHEDULE=0 * * * * *
```

3. Create a private key file:
```bash
# Generate a new keypair (optional)
solana-keygen new --outfile key.json

# Or copy an existing keypair
cp /path/to/your/keypair.json key.json
```

4. Update token configurations in `src/swap-bot.ts`:
```typescript
const TOKEN_Y: Token = {
    mint: new PublicKey('YOUR_TOKEN_Y_MINT_ADDRESS'),
    programId: TOKEN_PROGRAM_ID,
    name: 'TokenYYY',
    symbol: 'TKY',
};

const TOKEN_X: Token = {
    mint: new PublicKey('YOUR_TOKEN_X_MINT_ADDRESS'),
    programId: TOKEN_2022_PROGRAM_ID,
    name: 'TokenXXX',
    symbol: 'TKX',
};
```

## Usage

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Build Only
```bash
npm run build
```

## Cron Schedule Format

The bot uses standard cron format: `* * * * *`

- First `*`: Minute (0-59)
- Second `*`: Hour (0-23)
- Third `*`: Day of month (1-31)
- Fourth `*`: Month (1-12)
- Fifth `*`: Day of week (0-7, where 0 and 7 are Sunday)

Examples:
- `* * * * *` - Every minute
- `*/5 * * * *` - Every 5 minutes
- `0 */2 * * *` - Every 2 hours
- `0 9 * * *` - Every day at 9 AM

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NETWORK` | Solana network (devnet, testnet, mainnet-beta) | `devnet` |
| `INPUT_AMOUNT` | Amount of token X to swap | `1000` |
| `MIN_OUT` | Minimum amount of token Y to receive | `100` |
| `PRIVATE_KEY_PATH` | Path to private key JSON file | `./private-key.json` |
| `RPC_URL` | Solana RPC endpoint | `https://api.devnet.solana.com` |
| `CRON_SCHEDULE` | Cron schedule for bot execution | `* * * * *` |

## Project Structure

```
bot/
├── src/
│   ├── index.ts          # Main entry point
│   ├── swap-bot.ts       # Core bot logic
│   ├── darklake.ts       # Darklake program interface
│   ├── proof.ts          # Zero-knowledge proof generation
│   ├── types.ts          # TypeScript type definitions
│   ├── utils.ts          # Utility functions
│   └── darklake.json     # Program IDL
├── settle-circuits/      # Zero-knowledge proof circuits
├── snarkjs/             # SNARK proof generation library
├── package.json
├── tsconfig.json
├── env.example
└── README.md
```

## Security Notes

- Keep your private key file secure and never commit it to version control
- Use environment variables for sensitive configuration
- Consider using a dedicated wallet for bot operations
- Monitor bot activity regularly

## Troubleshooting

### Common Issues

1. **Private key not found**: Ensure the private key file exists and is readable
2. **RPC connection failed**: Check your RPC URL and network connectivity
3. **Insufficient funds**: Ensure your wallet has enough SOL for transaction fees
4. **Token accounts not found**: The bot will automatically create associated token accounts

### Logs

The bot provides detailed logging for debugging:
- Initialization logs
- Transaction execution logs
- Error logs with stack traces
- Timestamped trade execution logs

## License

MIT 