// Debug customer addition
async function debugCustomers() {
  // Deploy a bank first
  const bankAddress = '0x' + Math.random().toString(16).slice(2, 42).padEnd(40, '0');
  console.log('Deploying bank:', bankAddress);
  
  const deployResp = await fetch('http://localhost:3000/api/deployBank', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bankAddress: bankAddress,
      bankName: 'Debug Bank',
      tokenName: 'Debug Token',
      tokenSymbol: 'DBG',
      maxSupply: 1000000
    })
  });
  const deployData = await deployResp.json();
  console.log('Deploy result:', deployData.success ? 'SUCCESS' : 'FAILED');
  
  if (!deployData.success) return;
  
  // Add customer
  console.log('\nAdding customer...');
  const testWallet = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
  
  const custResp = await fetch('http://localhost:3000/api/uploadCustomers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bankAddress: bankAddress,
      customers: [{
        name: 'Debug User',
        accountId: 'DBG001',
        walletAddress: testWallet
      }]
    })
  });
  const custData = await custResp.json();
  console.log('Customer upload:', custData);
  
  // Try to get customer with both cases
  console.log('\n=== With mixed case ===');
  const resp1 = await fetch(`http://localhost:3000/api/customer/${testWallet}`);
  const data1 = await resp1.json();
  console.log('Status:', resp1.status);
  console.log('Result:', data1.success ? 'FOUND' : data1.error);
  
  console.log('\n=== With lowercase ===');
  const resp2 = await fetch(`http://localhost:3000/api/customer/${testWallet.toLowerCase()}`);
  const data2 = await resp2.json();
  console.log('Status:', resp2.status);
  console.log('Result:', data2.success ? 'FOUND' : data2.error);
  if (data2.success) {
    console.log('Customer name:', data2.data.customer.name);
  }
}

debugCustomers();
