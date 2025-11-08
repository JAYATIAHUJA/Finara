const { ethers } = require('ethers');

console.log('\n╔════════════════════════════════════════════════════════╗');
console.log('║          🔍 Ethereum Address Validator               ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

// Your relayer address
const address = '0x0998701675810FEE6aabb8679b6663A8baa91700';

console.log('Testing Address:', address);
console.log('Length:', address.length, '(should be 42)');
console.log('');

// Validate address
if (ethers.isAddress(address)) {
  console.log('✅ VALID Ethereum address!\n');
  
  // Get checksummed version
  const checksummed = ethers.getAddress(address);
  console.log('Checksummed Address:');
  console.log(checksummed);
  console.log('');
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📋 COPY THIS FOR FAUCETS:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log(checksummed);
  console.log('');
  
} else {
  console.log('❌ INVALID Ethereum address!');
  console.log('   Address must be 42 characters (including 0x)');
}

console.log('╚════════════════════════════════════════════════════════╝\n');
