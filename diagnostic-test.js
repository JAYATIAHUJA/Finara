// Simple deployBank test

async function testDeployBank() {
  console.log('Testing deployBank endpoint...\n');
  
  const payload = {
    bankAddress: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    bankName: 'DiagnosticBank',
    tokenName: 'DiagnosticToken',
    tokenSymbol: 'DIAG',
    maxSupply: 1000000
  };
  
  console.log('Payload:', JSON.stringify(payload, null, 2));
  console.log('\nSending request to http://localhost:3000/api/deployBank...\n');
  
  try {
    const response = await fetch('http://localhost:3000/api/deployBank', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const text = await response.text();
    console.log('Status:', response.status);
    console.log('Response:', text);
    
    try {
      const json = JSON.parse(text);
      console.log('\nParsed:', JSON.stringify(json, null, 2));
    } catch {
      // Already printed as text
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testDeployBank();
