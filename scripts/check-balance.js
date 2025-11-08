const { ethers } = require('ethers');
require('dotenv').config();

async function checkBalance() {
  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║           💰 Check Wallet Balance                     ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL || 'https://rpc.sepolia.org');
  const address = '0x0998701675810FEE6aabb8679b6663A8baa91700';

  try {
    console.log('Checking balance for:');
    console.log(address);
    console.log('\nFetching from Sepolia...\n');

    const balance = await provider.getBalance(address);
    const balanceInEth = ethers.formatEther(balance);

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n💰 Balance:', balanceInEth, 'ETH');
    console.log('   Balance (Wei):', balance.toString());
    console.log('');

    if (parseFloat(balanceInEth) === 0) {
      console.log('⚠️  Status: NO BALANCE');
      console.log('   Action: Get testnet ETH from faucets\n');
    } else if (parseFloat(balanceInEth) < 0.1) {
      console.log('⚠️  Status: LOW BALANCE');
      console.log('   Action: Get more ETH for transactions\n');
    } else {
      console.log('✅ Status: FUNDED');
      console.log('   You can start deploying!\n');
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('🔍 View on Etherscan:');
    console.log(`https://sepolia.etherscan.io/address/${address}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkBalance();
