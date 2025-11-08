const hre = require("hardhat");

async function main() {
  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║      🔧 Hardhat Local Network Information            ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  const accounts = await hre.ethers.getSigners();

  console.log('📍 Network: Hardhat Local Network');
  console.log('🌐 RPC URL: http://127.0.0.1:8545');
  console.log('⛓️  Chain ID: 31337\n');

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('💰 Available Test Accounts (Each has 10,000 ETH):\n');

  for (let i = 0; i < 5; i++) {
    const balance = await hre.ethers.provider.getBalance(accounts[i].address);
    console.log(`Account #${i}:`);
    console.log(`  Address: ${accounts[i].address}`);
    console.log(`  Balance: ${hre.ethers.formatEther(balance)} ETH\n`);
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔑 Your .env Configuration:\n');
  console.log('SEPOLIA_RPC_URL=http://127.0.0.1:8545');
  console.log('PRIVATE_KEY=' + await accounts[0].getAddress());
  console.log('RELAYER_PRIVATE_KEY=' + await accounts[1].getAddress());
  console.log('');

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📋 Usage:\n');
  console.log('1. Keep this terminal running');
  console.log('2. Deploy contracts: npx hardhat run scripts/deploy.js --network localhost');
  console.log('3. Start backend: npm start');
  console.log('');
  console.log('⚠️  Note: All data resets when you stop this network\n');
  console.log('╚════════════════════════════════════════════════════════╝\n');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
