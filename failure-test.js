// Test the 2 failing endpoints

async function testFailures() {
  // Use a deployed bank from previous test
  const bankAddress = '0xe2cfb7427d1c97bb000000000000000000000000';
  const testWallet = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
  
  console.log('=== Testing Create Loan ===\n');
  try {
    const loanResponse = await fetch('http://localhost:3000/api/lend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bankAddress: bankAddress,
        borrowerAddress: testWallet,
        collateralAmount: 200,
        loanAmount: 500000,
        interestRate: 800,
        duration: 31536000
      })
    });
    const loanData = await loanResponse.json();
    console.log('Loan Status:', loanResponse.status);
    console.log('Loan Response:', JSON.stringify(loanData, null, 2), '\n');
  } catch (e) {
    console.log('Loan Error:', e.message, '\n');
  }
  
  console.log('=== Testing Get Customer Details ===\n');
  try {
    const custResponse = await fetch(`http://localhost:3000/api/customer/${bankAddress}/${testWallet}`);
    const custData = await custResponse.json();
    console.log('Customer Status:', custResponse.status);
    console.log('Customer Response:', JSON.stringify(custData, null, 2));
  } catch (e) {
    console.log('Customer Error:', e.message);
  }
}

testFailures();
