# 🪙 Asset Tokenization Guide - Finara Platform

## Overview

Customers can now tokenize their physical assets (gold, property, vehicles, etc.) and receive ERC20 tokens that appear in their Ethereum wallet (MetaMask, Trust Wallet, etc.).

## How It Works

### 1. Customer Flow

```
Customer → Submits Asset → Bank Verifies → Tokens Minted → Appears in Wallet
```

### 2. What Happens Behind the Scenes

1. Customer provides asset details (type, value, description)
2. Bank verifies the asset authenticity
3. System calculates token amount based on asset value
4. Smart contract mints ERC20 tokens to customer's wallet
5. Customer can now see and use these tokens

### 3. Token Standards

- **Token Standard**: ERC20 (Ethereum standard)
- **Decimals**: 18 (same as ETH)
- **Transferable**: Yes, between verified customers only
- **Viewable**: In any Ethereum wallet (MetaMask, Etherscan, etc.)

---

## API Usage

### Tokenize an Asset

**Endpoint**: `POST /api/tokenize`

**Request Body**:
```json
{
  "bankAddress": "0x...",
  "customerWallet": "0x...",
  "assetType": "gold",
  "assetDescription": "24K Gold Jewelry - 50 grams",
  "assetValue": 150000,
  "tokenizationRatio": 1
}
```

**Response**:
```json
{
  "success": true,
  "message": "Successfully tokenized gold asset",
  "data": {
    "assetId": "ASSET-1699500000-ABC123",
    "assetValue": 150000,
    "tokensIssued": 150000,
    "tokenSymbol": "GOLD",
    "tokenAddress": "0x...",
    "customerWallet": "0x...",
    "transactionHash": "0x...",
    "blockNumber": 123,
    "viewInWallet": {
      "instructions": "Add this token to MetaMask",
      "tokenAddress": "0x...",
      "symbol": "GOLD",
      "decimals": 18
    }
  }
}
```

---

## Frontend Integration

### Example: Tokenize Gold

```javascript
import api from '../services/api';

async function tokenizeGold() {
  const result = await fetch('http://localhost:3000/api/tokenize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bankAddress: '0xYourBankAddress',
      customerWallet: '0xCustomerWalletAddress',
      assetType: 'gold',
      assetDescription: '24K Gold Jewelry - 50 grams',
      assetValue: 150000,  // ₹150,000
      tokenizationRatio: 1  // 1 token = ₹1
    })
  });

  const data = await result.json();
  
  if (data.success) {
    alert(`✅ ${data.data.tokensIssued} tokens minted!`);
    console.log('Transaction:', data.data.transactionHash);
    console.log('Add to MetaMask:', data.data.viewInWallet);
  }
}
```

---

## How Customers View Their Tokens

### Option 1: MetaMask (Most Common)

1. Open MetaMask
2. Click "Import Tokens"
3. Enter Token Address from API response
4. Token Symbol will auto-populate
5. Click "Add"
6. Tokens appear in wallet balance

### Option 2: Etherscan

- Visit: `https://etherscan.io/token/{tokenAddress}?a={customerWallet}`
- See all token transfers and balance

### Option 3: Trust Wallet / Coinbase Wallet

- Same process as MetaMask
- Use "Add Custom Token" feature

---

## Asset Types Supported

| Asset Type | Example | Typical Tokenization Ratio |
|-----------|---------|---------------------------|
| Gold | 24K jewelry, bars | 1 token = ₹1 |
| Property | House, land | 1 token = ₹1,000 |
| Vehicle | Car, bike | 1 token = ₹1 |
| Bonds | Government bonds | 1 token = ₹1 |
| Stocks | Equity shares | 1 token = ₹1 |

---

## Get Customer's Tokenized Assets

**Endpoint**: `GET /api/tokenize/customer/:walletAddress`

**Response**:
```json
{
  "success": true,
  "data": {
    "assets": [
      {
        "asset_id": "ASSET-1699500000-ABC123",
        "asset_type": "gold",
        "description": "24K Gold Jewelry - 50 grams",
        "value": 150000,
        "tokenized_amount": 150000,
        "status": "tokenized",
        "created_at": "2025-11-09T..."
      }
    ],
    "summary": {
      "totalAssets": 1,
      "totalValue": 150000,
      "totalTokensIssued": 150000,
      "assetTypes": ["gold"]
    }
  }
}
```

---

## Get Specific Asset Details

**Endpoint**: `GET /api/tokenize/asset/:assetId`

**Response**:
```json
{
  "success": true,
  "data": {
    "asset_id": "ASSET-1699500000-ABC123",
    "bank_address": "0x...",
    "customer_wallet": "0x...",
    "asset_type": "gold",
    "description": "24K Gold Jewelry - 50 grams",
    "value": 150000,
    "tokenized_amount": 150000,
    "status": "tokenized",
    "metadata": {
      "tokenizationRatio": 1,
      "tokenSymbol": "GOLD",
      "transactionHash": "0x...",
      "blockNumber": 123
    }
  }
}
```

---

## Database Schema Updates

### Updated `assets` Table

```sql
CREATE TABLE assets (
  id BIGSERIAL PRIMARY KEY,
  bank_address TEXT NOT NULL,
  customer_wallet TEXT NOT NULL,
  asset_id TEXT NOT NULL UNIQUE,
  asset_type TEXT NOT NULL,
  description TEXT,
  value NUMERIC NOT NULL,
  tokenized_amount NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'pending',  -- pending, verified, tokenized, failed
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Updated `token_mints` Table

```sql
CREATE TABLE token_mints (
  id BIGSERIAL PRIMARY KEY,
  bank_address TEXT NOT NULL,
  wallet_address TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  transaction_hash TEXT NOT NULL,
  block_number BIGINT,
  asset_id TEXT,  -- NEW: Links mint to specific asset
  minted_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Complete Example Flow

```javascript
// 1. Customer deploys bank
await api.deployBank(
  '0xBankAddress',
  'My Bank',
  'Gold Token',
  'GOLD',
  1000000
);

// 2. Customer completes KYC
await api.uploadCustomers('0xBankAddress', [{
  name: 'John Doe',
  accountId: 'ACC001',
  walletAddress: '0xCustomerWallet'
}]);

// 3. Customer tokenizes gold
const result = await fetch('http://localhost:3000/api/tokenize', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    bankAddress: '0xBankAddress',
    customerWallet: '0xCustomerWallet',
    assetType: 'gold',
    assetDescription: '24K Gold - 100g',
    assetValue: 300000
  })
});

// 4. Customer adds token to MetaMask
// Use tokenAddress from response

// 5. Customer can now:
// - See balance in MetaMask
// - Use tokens as collateral for loans
// - Transfer to other verified customers
// - Check balance on Etherscan
```

---

## Security & Compliance

### KYC Requirements

- ✅ Only KYC-verified customers can tokenize assets
- ✅ Only verified customers can receive/send tokens
- ✅ Bank can freeze accounts if needed

### Asset Verification

- ✅ Bank must verify asset authenticity before tokenization
- ✅ All assets stored in database with audit trail
- ✅ Transaction hashes recorded for transparency

### Token Compliance

- ✅ ERC-3643 inspired (compliant token standard)
- ✅ Transfer restrictions to verified addresses only
- ✅ Freeze functionality for regulatory compliance

---

## Troubleshooting

### "Customer not found or not KYC verified"

**Solution**: Ensure customer completed KYC via `/api/uploadCustomers` first

### "Failed to mint tokens"

**Solution**: Check Hardhat node is running and factory ownership is correct

### "Token not showing in MetaMask"

**Solution**: 
1. Verify transaction on Etherscan
2. Manually add token using contract address
3. Ensure MetaMask is on correct network (localhost/Hardhat)

---

## Next Steps

1. ✅ Update Supabase schema
2. ✅ Restart backend server
3. ✅ Test tokenization endpoint
4. 📱 Build frontend UI for asset submission
5. 🎨 Create asset gallery page
6. 📊 Add analytics dashboard for tokenized assets

---

## Support

For questions or issues, check:
- API documentation: `http://localhost:3000/`
- Logs: Backend terminal output
- Blockchain: `npx hardhat console --network localhost`
