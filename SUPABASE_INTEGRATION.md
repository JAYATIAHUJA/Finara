# 🔗 Complete Supabase + Backend + Frontend Integration

## ✅ What's Now Connected:

### 1. Database (Supabase)
- ✅ 5 tables created: `banks`, `customers`, `token_mints`, `loans`, `assets`
- ✅ Indexes for performance
- ✅ Row Level Security policies

### 2. Backend API (Express + Supabase)
All routes now save to Supabase AND interact with blockchain:

#### **Bank Operations**
- `POST /api/deployBank` → Saves to `banks` table + deploys contracts
- `GET /api/bank/:bankAddress` → Fetches from `banks` table

#### **Customer Operations**
- `POST /api/uploadCustomers` → Saves to `customers` table + verifies on blockchain
- `GET /api/customers/:bankAddress` → Fetches from `customers` table

#### **Token Operations**
- `POST /api/mintToken` → Saves to `token_mints` table + mints on blockchain
- `GET /api/token/:tokenAddress/balance/:walletAddress` → Reads from blockchain

#### **Loan Operations**
- `POST /api/createLoan` → Saves to `loans` table + creates on blockchain
- `GET /api/loans/:borrowerAddress` → Fetches from `loans` table
- `POST /api/repayLoan` → Updates blockchain only

#### **Analytics & Reporting (NEW!)**
- `GET /api/analytics/:bankAddress` → Dashboard stats from Supabase
- `GET /api/customer/:walletAddress` → Customer profile with balances
- `GET /api/activity/:bankAddress` → Recent activity feed

### 3. Frontend (React + API Service)
All methods available in `api.js`:

```javascript
// Use in any component
import api from '../services/api';

// Get dashboard analytics
const analytics = await api.getBankAnalytics(bankAddress);

// Get customer with balances
const customer = await api.getCustomerDetails(walletAddress);

// Get activity feed
const activity = await api.getBankActivity(bankAddress);

// Get token balance
const balance = await api.getTokenBalance(tokenAddress, walletAddress);
```

---

## 🚀 Complete Flow Example

### Step 1: Deploy Bank
```jsx
// Frontend
const result = await api.deployBank(
  '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
  'HDFC Bank',
  'Gold Token',
  'GOLD',
  '10000000',
  15000
);

// What happens:
// 1. Backend deploys contracts to blockchain
// 2. Backend saves to Supabase `banks` table:
//    {
//      bank_address: '0x15d34...',
//      bank_name: 'HDFC Bank',
//      token_address: '0xabc...',
//      lending_address: '0xdef...',
//      ...
//    }
```

### Step 2: Add Customers
```jsx
// Frontend
const result = await api.uploadCustomers(bankAddress, [
  {
    name: 'Rajesh Kumar',
    accountId: 'ACC-001',
    walletAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906'
  }
]);

// What happens:
// 1. Backend saves to Supabase `customers` table
// 2. Backend calls blockchain to verify customer address
// 3. Customer can now receive/transfer tokens
```

### Step 3: Mint Tokens
```jsx
// Frontend
const result = await api.mintTokens(
  tokenAddress,
  customerWallet,
  '1000'
);

// What happens:
// 1. Backend mints tokens on blockchain
// 2. Backend saves to Supabase `token_mints` table:
//    {
//      bank_address,
//      wallet_address,
//      amount: '1000',
//      transaction_hash,
//      ...
//    }
```

### Step 4: Create Loan
```jsx
// Frontend
const result = await api.createLoan(
  lendingAddress,
  borrowerAddress,
  '500',  // collateral
  '300',  // loan amount
  1200,   // 12% interest
  30      // 30 days
);

// What happens:
// 1. Backend creates loan on blockchain
// 2. Backend saves to Supabase `loans` table
// 3. Collateral is locked on blockchain
```

### Step 5: View Dashboard
```jsx
// Frontend
const analytics = await api.getBankAnalytics(bankAddress);

// Returns:
// {
//   bank: { name, tokenAddress, lendingAddress },
//   stats: {
//     customersCount: 15,
//     totalLoans: 8,
//     totalLoanAmount: '25000',
//     totalCollateral: '40000',
//     totalTokensMinted: '100000',
//     avgCollateralizationRatio: '160%'
//   },
//   recentActivity: { mints, loans, customers }
// }
```

---

## 📊 Example: Update BankAdmin Dashboard

```jsx
// src/pages/BankAdmin.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function BankAdmin() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const bankAddress = '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65'; // Store this in context/state

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      const result = await api.getBankAnalytics(bankAddress);
      if (result.success) {
        setAnalytics(result.data);
      }
      setLoading(false);
    };
    
    fetchAnalytics();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchAnalytics, 30000);
    return () => clearInterval(interval);
  }, [bankAddress]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{analytics.bank.name}</h1>
      
      {/* Stats Cards */}
      <div className="stats-grid">
        <Card title="Total Customers">
          <h2>{analytics.stats.customersCount}</h2>
        </Card>
        <Card title="Active Loans">
          <h2>{analytics.stats.totalLoans}</h2>
        </Card>
        <Card title="Tokens Minted">
          <h2>{analytics.stats.totalTokensMinted}</h2>
        </Card>
        <Card title="TVL">
          <h2>₹{analytics.stats.totalLoanAmount}</h2>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="activity-feed">
        <h3>Recent Activity</h3>
        {analytics.recentActivity.mints.map((mint, i) => (
          <div key={i} className="activity-item">
            🪙 Token Minted - {mint.amount} tokens to {mint.wallet_address.slice(0, 8)}...
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 🗄️ Supabase Data Examples

### After deploying bank:
**`banks` table:**
```
| id | bank_address   | bank_name  | token_address | lending_address |
|----|----------------|------------|---------------|-----------------|
| 1  | 0x15d34...     | HDFC Bank  | 0xabc123...   | 0xdef456...     |
```

### After adding customers:
**`customers` table:**
```
| id | bank_address | name          | account_id | wallet_address | kyc_verified |
|----|--------------|---------------|------------|----------------|--------------|
| 1  | 0x15d34...   | Rajesh Kumar  | ACC-001    | 0x90F79...     | true         |
| 2  | 0x15d34...   | Priya Sharma  | ACC-002    | 0x3C44C...     | true         |
```

### After minting tokens:
**`token_mints` table:**
```
| id | bank_address | wallet_address | amount | transaction_hash | minted_at           |
|----|--------------|----------------|--------|------------------|---------------------|
| 1  | 0x15d34...   | 0x90F79...     | 1000   | 0x123abc...      | 2025-11-09 10:30:00 |
| 2  | 0x15d34...   | 0x3C44C...     | 500    | 0x456def...      | 2025-11-09 11:15:00 |
```

### After creating loans:
**`loans` table:**
```
| id | bank_address | borrower_address | loan_id | collateral | loan_amount | interest_rate |
|----|--------------|------------------|---------|------------|-------------|---------------|
| 1  | 0x15d34...   | 0x90F79...       | 1       | 500        | 300         | 1200          |
```

---

## ✅ What Works Now:

1. ✅ **Deploy Bank** → Blockchain + Supabase
2. ✅ **Add Customers** → Blockchain verification + Supabase storage
3. ✅ **Mint Tokens** → Blockchain mint + Supabase record
4. ✅ **Create Loans** → Blockchain loan + Supabase record
5. ✅ **View Analytics** → Fetch from Supabase (fast!)
6. ✅ **Activity Feed** → Fetch from Supabase
7. ✅ **Customer Profile** → Supabase + Blockchain balance
8. ✅ **Token Balance** → Read from Blockchain

---

## 🎯 Next: Setup Supabase Tables

**Go to**: https://supabase.com/dashboard/project/gcyfogjmdabbyreethsn/editor

1. Click **SQL Editor**
2. Copy all SQL from `database/schema.sql`
3. Click **Run**
4. Verify tables in **Table Editor**

Then test the full flow:
1. Deploy bank in Postman
2. Check Supabase → `banks` table (data saved!)
3. Add customer in Postman
4. Check Supabase → `customers` table (data saved!)
5. Refresh frontend → See real data! ✨

Everything is connected! 🎉
