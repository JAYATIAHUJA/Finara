// Detailed test for failing endpoints

async function testAll() {
  const bankAddress = '0x572bac10cc11cbd800000000000000000000000'; // Use from last test
  const tokenAddress = '0x9CfA6D15D9667D2AA7387500F09D426f93D0F75f';
  const testWallet = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
  
  console.log('Testing Upload Customers...\n');
  try {
    const uploadResponse = await fetch('http://localhost:3000/api/uploadCustomers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bankAddress: bankAddress,
        customers: [
          {
            name: 'Test User',
            walletAddress: testWallet,
            pan: 'ABCDE1234F',
            aadhaar: '123456789012'
          }
        ]
      })
    });
    const uploadData = await uploadResponse.json();
    console.log('Upload Status:', uploadResponse.status);
    console.log('Upload Response:', JSON.stringify(uploadData, null, 2));
  } catch (e) {
    console.log('Upload Error:', e.message);
  }
  
  console.log('\n\nTesting Mint Tokens...\n');
  try {
    const mintResponse = await fetch('http://localhost:3000/api/mintToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tokenAddress: tokenAddress,
        toAddress: testWallet,
        amount: 1000
      })
    });
    const mintData = await mintResponse.json();
    console.log('Mint Status:', mintResponse.status);
    console.log('Mint Response:', JSON.stringify(mintData, null, 2));
  } catch (e) {
    console.log('Mint Error:', e.message);
  }
  
  console.log('\n\nTesting Create Loan...\n');
  try {
    const loanResponse = await fetch('http://localhost:3000/api/lend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lendingAddress: '0x86337dDaF2661A069D0DcB5D160585acC2d15E9a', // Use from last deployment
        borrower: testWallet,
        collateralAmount: 500,
        loanAmount: 5000,
        interestRate: 5,
        durationDays: 30
      })
    });
    const loanData = await loanResponse.json();
    console.log('Loan Status:', loanResponse.status);
    console.log('Loan Response:', JSON.stringify(loanData, null, 2));
  } catch (e) {
    console.log('Loan Error:', e.message);
  }
}

testAll();
