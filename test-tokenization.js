// Test Asset Tokenization Flow
// This demonstrates the complete customer journey from KYC to tokenization

const API_BASE = 'http://localhost:3000/api';

async function testCompleteTokenizationFlow() {
  console.log('🚀 Starting Complete Asset Tokenization Test\n');
  console.log('=' .repeat(60));

  // Step 1: Deploy Bank
  console.log('\n📋 Step 1: Deploying Bank...');
  const bankAddress = '0x' + Math.random().toString(16).slice(2, 42).padEnd(40, '0');
  
  const deployResult = await fetch(`${API_BASE}/deployBank`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bankAddress: bankAddress,
      bankName: 'Gold Asset Bank',
      tokenName: 'Gold Token',
      tokenSymbol: 'GOLD',
      maxSupply: 10000000
    })
  });
  
  const deployData = await deployResult.json();
  
  if (!deployData.success) {
    console.error('❌ Bank deployment failed:', deployData.error);
    return;
  }
  
  const tokenAddress = deployData.data.tokenAddress;
  console.log(`✅ Bank deployed successfully`);
  console.log(`   Bank Address: ${bankAddress}`);
  console.log(`   Token Address: ${tokenAddress}`);
  
  // Step 2: Upload Customer (KYC)
  console.log('\n📋 Step 2: Uploading Customer (KYC)...');
  const customerWallet = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'; // Hardhat test account
  
  const kycResult = await fetch(`${API_BASE}/uploadCustomers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bankAddress: bankAddress,
      customers: [{
        name: 'Rajesh Kumar',
        accountId: 'ACC001',
        walletAddress: customerWallet
      }]
    })
  });
  
  const kycData = await kycResult.json();
  
  if (!kycData.success) {
    console.error('❌ Customer KYC failed:', kycData.error);
    return;
  }
  
  console.log(`✅ Customer KYC completed`);
  console.log(`   Customer: Rajesh Kumar`);
  console.log(`   Wallet: ${customerWallet}`);
  
  // Step 3: Tokenize Gold Asset
  console.log('\n📋 Step 3: Tokenizing Gold Asset...');
  
  const tokenizeResult = await fetch(`${API_BASE}/tokenize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bankAddress: bankAddress,
      customerWallet: customerWallet,
      assetType: 'gold',
      assetDescription: '24K Gold Jewelry - 50 grams',
      assetValue: 150000,  // ₹150,000
      tokenizationRatio: 1  // 1 token = ₹1
    })
  });
  
  const tokenizeData = await tokenizeResult.json();
  
  if (!tokenizeData.success) {
    console.error('❌ Asset tokenization failed:', tokenizeData.error);
    return;
  }
  
  console.log(`✅ Asset tokenized successfully!`);
  console.log(`\n💎 Asset Details:`);
  console.log(`   Asset ID: ${tokenizeData.data.assetId}`);
  console.log(`   Asset Type: gold`);
  console.log(`   Asset Value: ₹${tokenizeData.data.assetValue.toLocaleString()}`);
  console.log(`   Tokens Issued: ${tokenizeData.data.tokensIssued.toLocaleString()} ${tokenizeData.data.tokenSymbol}`);
  console.log(`\n🔗 Blockchain:`);
  console.log(`   Transaction: ${tokenizeData.data.transactionHash}`);
  console.log(`   Block: ${tokenizeData.data.blockNumber}`);
  
  console.log(`\n🦊 MetaMask Instructions:`);
  console.log(`   1. Open MetaMask`);
  console.log(`   2. Click "Import Tokens"`);
  console.log(`   3. Token Address: ${tokenizeData.data.tokenAddress}`);
  console.log(`   4. Symbol: ${tokenizeData.data.tokenSymbol}`);
  console.log(`   5. Decimals: 18`);
  
  // Step 4: Get Customer's Assets
  console.log('\n📋 Step 4: Fetching Customer Assets...');
  
  await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for DB sync
  
  const assetsResult = await fetch(`${API_BASE}/tokenize/customer/${customerWallet}`);
  const assetsData = await assetsResult.json();
  
  if (assetsData.success) {
    console.log(`✅ Customer has ${assetsData.data.summary.totalAssets} tokenized asset(s)`);
    console.log(`\n📊 Summary:`);
    console.log(`   Total Assets: ${assetsData.data.summary.totalAssets}`);
    console.log(`   Total Value: ₹${assetsData.data.summary.totalValue.toLocaleString()}`);
    console.log(`   Total Tokens: ${assetsData.data.summary.totalTokensIssued.toLocaleString()}`);
    console.log(`   Asset Types: ${assetsData.data.summary.assetTypes.join(', ')}`);
  }
  
  // Step 5: Get Token Balance
  console.log('\n📋 Step 5: Checking Token Balance...');
  
  const balanceResult = await fetch(`${API_BASE}/token/${tokenAddress}/balance/${customerWallet}`);
  const balanceData = await balanceResult.json();
  
  if (balanceData.success) {
    console.log(`✅ Customer's token balance: ${balanceData.data.balance} ${tokenizeData.data.tokenSymbol}`);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✨ TEST COMPLETED SUCCESSFULLY! ✨');
  console.log('='.repeat(60));
  
  console.log('\n📝 What Just Happened:');
  console.log('  1. Bank was deployed with GOLD token contract');
  console.log('  2. Customer completed KYC verification');
  console.log('  3. Customer submitted 50g gold worth ₹150,000');
  console.log('  4. System minted 150,000 GOLD tokens to customer wallet');
  console.log('  5. Customer can now see tokens in MetaMask!');
  
  console.log('\n🎯 Next Steps:');
  console.log('  • Customer can use tokens as loan collateral');
  console.log('  • Customer can transfer tokens to other verified users');
  console.log('  • Bank can track all tokenized assets');
  console.log('  • Assets are recorded on blockchain (transparent & immutable)');
}

// Run the test
testCompleteTokenizationFlow().catch(console.error);
