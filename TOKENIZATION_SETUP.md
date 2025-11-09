# 🔧 Quick Setup - Asset Tokenization

## Step 1: Update Supabase Database

You need to add new columns to your existing Supabase tables. Follow these steps:

### Option A: Run Migration Script (Recommended)

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: **gcyfogjmdabbyreethsn**
3. Click "SQL Editor" in the left sidebar
4. Click "New Query"
5. Copy and paste the entire content from `database/migration-add-tokenization.sql`
6. Click "Run" button
7. You should see "Migration completed successfully!"

### Option B: Run Commands Manually

If you prefer to run commands one by one:

```sql
-- Add columns to assets table
ALTER TABLE assets 
ADD COLUMN IF NOT EXISTS customer_wallet TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- Add column to token_mints table
ALTER TABLE token_mints 
ADD COLUMN IF NOT EXISTS asset_id TEXT;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_assets_customer_wallet ON assets(customer_wallet);
CREATE INDEX IF NOT EXISTS idx_assets_asset_id ON assets(asset_id);
CREATE INDEX IF NOT EXISTS idx_assets_status ON assets(status);
CREATE INDEX IF NOT EXISTS idx_token_mints_asset_id ON token_mints(asset_id);
```

---

## Step 2: Verify Backend is Running

Backend should be running on port 3000. Check with:

```bash
curl http://localhost:3000/health
```

Expected response:
```json
{"status":"ok","timestamp":"...","service":"Finara Backend API"}
```

---

## Step 3: Verify Hardhat is Running

Hardhat should be running on port 8545. Check with:

```bash
curl -X POST -H "Content-Type: application/json" --data "{\"jsonrpc\":\"2.0\",\"method\":\"eth_blockNumber\",\"params\":[],\"id\":1}" http://127.0.0.1:8545
```

---

## Step 4: Run Test

After updating Supabase schema:

```bash
node test-tokenization.js
```

Expected output:
```
✅ Bank deployed successfully
✅ Customer KYC completed
✅ Asset tokenized successfully!
💎 Asset Details:
   Asset ID: ASSET-...
   Tokens Issued: 150,000 GOLD
```

---

## Step 5: View Tokens in MetaMask

1. Open MetaMask
2. Make sure you're on "Localhost 8545" network
3. Import the test account:
   - Private Key: `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d`
   - Or use Account #1 from Hardhat (0x7099...79C8)
4. Click "Import Tokens"
5. Use the token address from test output
6. You should see: **150,000 GOLD** tokens!

---

## Step 6: Test API Endpoints

### Tokenize Asset
```bash
curl -X POST http://localhost:3000/api/tokenize \
  -H "Content-Type: application/json" \
  -d '{
    "bankAddress": "0x...",
    "customerWallet": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "assetType": "gold",
    "assetDescription": "24K Gold - 100g",
    "assetValue": 300000
  }'
```

### Get Customer Assets
```bash
curl http://localhost:3000/api/tokenize/customer/0x70997970C51812dc3A010C7d01b50e0d17dc79C8
```

---

## Troubleshooting

### "Could not find the 'customer_wallet' column"
- **Solution**: Run the migration SQL in Supabase (Step 1)

### "Customer not found or not KYC verified"
- **Solution**: Upload customer first using `/api/uploadCustomers`

### "Backend not responding"
- **Solution**: Restart backend: `node backend/server.js`

### "Hardhat not running"
- **Solution**: In new terminal: `npx hardhat node`

---

## What You Get

After successful tokenization:

✅ Customer receives ERC20 tokens in their wallet  
✅ Tokens visible in MetaMask, Trust Wallet, etc.  
✅ Can be used as collateral for loans  
✅ Can be transferred between verified customers  
✅ Immutable record on blockchain  
✅ Full audit trail in database  

---

## Quick Start Commands

```bash
# Terminal 1: Start Hardhat
npx hardhat node

# Terminal 2: Deploy contracts
npx hardhat run scripts/deploy.js --network localhost
npx hardhat run scripts/transfer-factory-ownership.js --network localhost

# Terminal 3: Start Backend
node backend/server.js

# Terminal 4: Run Test
node test-tokenization.js
```

---

## Need Help?

1. Check backend logs in terminal
2. Check Hardhat logs
3. Verify Supabase schema was updated
4. Run `node smoke-test.js` to verify all endpoints

