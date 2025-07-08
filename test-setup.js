#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Testing Darklake Swap Bot Setup...\n');

// Check if package.json exists
if (fs.existsSync('package.json')) {
    console.log('✅ package.json found');
} else {
    console.log('❌ package.json not found');
    process.exit(1);
}

// Check if node_modules exists
if (fs.existsSync('node_modules')) {
    console.log('✅ node_modules found');
} else {
    console.log('❌ node_modules not found - run "npm install" first');
}

// Check if TypeScript config exists
if (fs.existsSync('tsconfig.json')) {
    console.log('✅ tsconfig.json found');
} else {
    console.log('❌ tsconfig.json not found');
}

// Check if source files exist
const srcFiles = [
    'src/index.ts',
    'src/swap-bot.ts',
    'src/darklake.ts',
    'src/proof.ts',
    'src/types.ts',
    'src/utils.ts',
    'src/darklake.json'
];

srcFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file} found`);
    } else {
        console.log(`❌ ${file} not found`);
    }
});

// Check if circuit files exist
if (fs.existsSync('settle-circuits')) {
    console.log('✅ settle-circuits directory found');
} else {
    console.log('❌ settle-circuits directory not found');
}

if (fs.existsSync('snarkjs')) {
    console.log('✅ snarkjs directory found');
} else {
    console.log('❌ snarkjs directory not found');
}

// Check if environment file exists
if (fs.existsSync('.env')) {
    console.log('✅ .env file found');
} else {
    console.log('⚠️  .env file not found - copy env.example to .env and configure');
}

// Check if private key exists
if (fs.existsSync('private-key.json')) {
    console.log('✅ private-key.json found');
} else {
    console.log('⚠️  private-key.json not found - create or copy your keypair file');
}

console.log('\n📋 Next Steps:');
console.log('1. Run "pnpm install" to install dependencies');
console.log('2. Copy env.example to .env and configure your settings');
console.log('3. Create or copy your private key to private-key.json');
console.log('4. Update token addresses in src/swap-bot.ts');
console.log('5. Run "npm run build" to compile');
console.log('6. Run "npm start" to start the bot');

console.log('\n🎯 Setup test completed!'); 