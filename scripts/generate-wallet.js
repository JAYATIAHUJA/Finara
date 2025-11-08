const { ethers } = require('ethers');

console.log('\n╔════════════════════════════════════════════════════════╗');
console.log('║       🔐 Finara Wallet Generator (Sepolia)           ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

// Generate a new random wallet
const wallet = ethers.Wallet.createRandom();

console.log('✅ New Wallet Generated!\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('📝 SAVE THESE DETAILS SECURELY:\n');
console.log('Address:');
console.log(`   ${wallet.address}\n`);

console.log('Private Key (with 0x):');
console.log(`   ${wallet.privateKey}\n`);

console.log('Private Key (without 0x):');
console.log(`   ${wallet.privateKey.slice(2)}\n`);

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('⚠️  SECURITY WARNINGS:\n');
console.log('   1. NEVER share your private key with anyone');
console.log('   2. NEVER commit it to git or upload online');
console.log('   3. Store it in a password manager or secure vault');
console.log('   4. This is a NEW wallet - it has 0 balance\n');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('📋 NEXT STEPS:\n');
console.log('   1. Copy the private key (with 0x)');
console.log('   2. Add it to your .env file:');
console.log(`      RELAYER_PRIVATE_KEY=${wallet.privateKey}\n`);
console.log('   3. Get Sepolia ETH from faucets:');
console.log('      • https://sepoliafaucet.com/');
console.log('      • https://faucet.sepolia.dev/');
console.log('      • https://www.infura.io/faucet/sepolia\n');
console.log('   4. Send at least 0.5 Sepolia ETH to:');
console.log(`      ${wallet.address}\n`);

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('💡 TIP: Generate 2 wallets:\n');
console.log('   • PRIVATE_KEY = Deployer wallet (deploys contracts)');
console.log('   • RELAYER_PRIVATE_KEY = Relayer wallet (sends transactions)\n');

console.log('╚════════════════════════════════════════════════════════╝\n');
