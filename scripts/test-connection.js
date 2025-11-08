const { ethers } = require('ethers');

async function testConnection() {
  console.log('\n🔍 Testing Hardhat Network Connection...\n');
  
  try {
    const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
    
    console.log('Connecting to http://127.0.0.1:8545...');
    const network = await provider.getNetwork();
    console.log('✅ Connected successfully!');
    console.log('Chain ID:', network.chainId.toString());
    
    const blockNumber = await provider.getBlockNumber();
    console.log('Current Block:', blockNumber);
    
    const accounts = await provider.listAccounts();
    console.log('Accounts available:', accounts.length);
    
    if (accounts.length > 0) {
      const balance = await provider.getBalance(accounts[0]);
      console.log('Account 0 Balance:', ethers.formatEther(balance), 'ETH');
    }
    
    console.log('\n✅ Network is ready for deployment!\n');
  } catch (error) {
    console.error('\n❌ Connection failed:', error.message);
    console.log('\n📋 Troubleshooting:');
    console.log('1. Make sure Hardhat node is running: npx hardhat node');
    console.log('2. Check if port 8545 is available: netstat -ano | findstr :8545');
    console.log('3. Try restarting the Hardhat node\n');
  }
}

testConnection();
