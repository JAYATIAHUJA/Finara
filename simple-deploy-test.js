// Simple test to see exact response from deployBank

async function test() {
  const uniqueAddress = '0x' + Math.random().toString(16).slice(2, 42).padEnd(40, '0');
  
  console.log('Testing deployBank with unique address:', uniqueAddress);
  
  try {
    const response = await fetch('http://localhost:3000/api/deployBank', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bankAddress: uniqueAddress,
        bankName: 'Test Bank ' + Date.now(),
        tokenName: 'Test Token',
        tokenSymbol: 'TEST',
        maxSupply: 1000000
      })
    });
    
    const text = await response.text();
    console.log('\nStatus:', response.status);
    console.log('Response text:', text);
    
    try {
      const json = JSON.parse(text);
      console.log('\nParsed JSON:', JSON.stringify(json, null, 2));
    } catch (e) {
      console.log('Could not parse as JSON');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

test();
