# 🗄️ Supabase Database Setup Guide

## Step 1: Create Tables in Supabase

1. Go to your Supabase project: https://supabase.com/dashboard/project/gcyfogjmdabbyreethsn
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the entire content from `database/schema.sql`
5. Click **Run** to execute the SQL

This will create 5 tables:
- ✅ `banks` - Stores deployed bank contracts
- ✅ `customers` - Stores KYC verified customers
- ✅ `token_mints` - Tracks all token minting events
- ✅ `loans` - Stores loan records
- ✅ `assets` - Stores asset metadata

## Step 2: Verify Tables Created

1. Go to **Table Editor** in Supabase dashboard
2. You should see all 5 tables listed
3. Click on each to verify the schema

## Step 3: Test Database Connection

Run this test to verify backend can connect to Supabase:

```bash
cd backend
node -e "const supabase = require('./config/supabase'); supabase.from('banks').select('*').then(r => console.log('✅ Connected!', r))"
```

## Step 4: Current Status

Your `.env` file already has Supabase configured:
- ✅ `SUPABASE_URL`: https://gcyfogjmdabbyreethsn.supabase.co
- ✅ `SUPABASE_ANON_KEY`: Configured

## Step 5: Backend Routes Already Using Supabase

The following routes already have Supabase integration:

### ✅ Bank Routes (`routes/bank.js`)
- `POST /api/deployBank` - Saves bank to database after deployment
- `GET /api/bank/:bankAddress` - Gets bank details

### ✅ Customer Routes (`routes/customers.js`)
- `POST /api/uploadCustomers` - Saves customers to database and verifies on blockchain
- `GET /api/customers/:bankAddress` - Gets all customers for a bank

### ✅ Token Routes (`routes/tokens.js`)
- `POST /api/mintToken` - Mints tokens and records in database

### ✅ Lending Routes (`routes/lending.js`)
- `POST /api/createLoan` - Creates loan and saves to database
- `GET /api/loans/:borrowerAddress` - Gets loans for borrower

### ✅ Assets Routes (`routes/assets.js`)
- `POST /api/createAsset` - Creates asset record
- `GET /api/assets/:bankAddress` - Gets assets for bank

## Step 6: Additional Endpoints Needed

I'll create these new endpoints for better frontend integration:

1. **Dashboard Analytics**
   - `GET /api/bank/:bankAddress/analytics` - Returns TVL, total loans, customers count
   
2. **Token Balance**
   - `GET /api/token/:tokenAddress/balance/:walletAddress` - Get token balance from blockchain

3. **Activity Feed**
   - `GET /api/bank/:bankAddress/activity` - Recent transactions and events

4. **Customer Details**
   - `GET /api/customer/:walletAddress` - Get single customer details with balances

## Step 7: Data Flow

```
Frontend (React) 
    ↓
API Service (api.js)
    ↓
Backend (Express)
    ↓
├─→ Supabase (Database) - Store & retrieve data
└─→ Blockchain (Hardhat) - Execute transactions & verify
```

## Step 8: Testing the Full Stack

1. **Start Hardhat Node** (Terminal 1):
   ```bash
   cd c:\Users\OSHI SHARMA\Finara
   npx hardhat node
   ```

2. **Start Backend** (Terminal 2):
   ```bash
   cd backend
   node server.js
   ```

3. **Start Frontend** (Terminal 3):
   ```bash
   cd Finara
   npm run dev
   ```

4. **Test Flow**:
   - Deploy bank → Saves to Supabase `banks` table
   - Upload customers → Saves to Supabase `customers` table + blockchain verification
   - Mint tokens → Saves to Supabase `token_mints` table + mints on blockchain
   - Create loan → Saves to Supabase `loans` table + creates on blockchain

## Step 9: View Your Data

Go to Supabase dashboard → **Table Editor** to see:
- Banks you've deployed
- Customers you've added
- Tokens you've minted
- Loans you've created

All data is synced between Supabase (database) and Hardhat (blockchain)! ✨
