# 🎯 Finara Frontend to Backend Feature Mapping

## Overview
This document maps each frontend page/feature to the corresponding backend API endpoints and provides integration examples.

---

## 1️⃣ **Bank Admin Dashboard** (`BankAdmin.jsx`)

### Features to Implement:

#### A. Deploy New Bank
**Frontend:** Bank setup/configuration section
**Backend API:** `POST /api/deployBank`
**Integration:**
```jsx
import api from '../services/api';

const handleDeployBank = async () => {
  const result = await api.deployBank(
    '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65', // Bank wallet address
    'HDFC Bank',
    'Gold Asset Token',
    'GOLD',
    '10000000',
    15000
  );
  
  if (result.success) {
    // Save tokenAddress and lendingAddress for future use
    console.log('Token:', result.data.tokenAddress);
    console.log('Lending:', result.data.lendingAddress);
  }
};
```

#### B. View Portfolio Analytics
**Frontend:** Charts showing TVL, loans, tokens
**Backend API:** `GET /api/bank/{bankAddress}`
**Integration:**
```jsx
const [bankData, setBankData] = useState(null);

useEffect(() => {
  const fetchBankData = async () => {
    const result = await api.getBankDetails('0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65');
    if (result.success) {
      setBankData(result.data);
      // Update charts with real data
    }
  };
  fetchBankData();
}, []);
```

#### C. Recent Activity Feed
**Frontend:** Activity list showing transactions
**Backend:** No specific endpoint yet - needs to be created
**TODO:** Create `GET /api/bank/{bankAddress}/activity` endpoint

---

## 2️⃣ **Customer Onboarding** (`AddCustomer.jsx`)

### Features to Implement:

#### A. Add New Customer with KYC
**Frontend:** Customer form with KYC details
**Backend API:** `POST /api/uploadCustomers`
**Integration:**
```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const result = await api.uploadCustomers(
    '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65', // Bank address
    [{
      name: formData.name,
      accountId: formData.kycId,
      walletAddress: formData.walletAddress // Need to add this field to form
    }]
  );
  
  if (result.success) {
    alert('Customer added and verified on blockchain!');
    navigate('/customers');
  }
};
```

**Required Form Updates:**
- Add `walletAddress` field (Ethereum address)
- Remove PAN/Aadhaar (not needed for blockchain)
- Keep: name, accountId/kycId

---

## 3️⃣ **Customer Management** (`CustomersList.jsx`, `CustomerProfile.jsx`)

### Features to Implement:

#### A. View All Customers
**Frontend:** Customer list table
**Backend API:** `GET /api/customers/{bankAddress}`
**Integration:**
```jsx
const [customers, setCustomers] = useState([]);

useEffect(() => {
  const fetchCustomers = async () => {
    const result = await api.getCustomers('0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65');
    if (result.success) {
      setCustomers(result.data);
    }
  };
  fetchCustomers();
}, []);
```

#### B. Mint Tokens to Customer
**Frontend:** Token minting section in CustomerProfile
**Backend API:** `POST /api/mintToken`
**Integration:**
```jsx
const handleMintTokens = async () => {
  const result = await api.mintTokens(
    tokenAddress,        // From bank deployment
    customer.wallet_address,
    assetQuantity       // From form
  );
  
  if (result.success) {
    alert('Tokens minted successfully!');
    // Refresh customer balance
  }
};
```

**Update CustomerProfile.jsx:**
- Add token minting button
- Display token balance (needs new backend endpoint)

---

## 4️⃣ **Loan Creation** (`CreateLoan.jsx`)

### Features to Implement:

#### A. Create Collateralized Loan
**Frontend:** Loan creation form
**Backend API:** `POST /api/createLoan`
**Integration:**
```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const result = await api.createLoan(
    lendingAddress,           // From bank deployment
    customerWalletAddress,    // Borrower's address
    formData.collateralAmount,
    calculateLoanAmount(),    // Calculated loan amount
    formData.interestRate * 100, // Convert to basis points (12% = 1200)
    formData.tenure * 30      // Convert months to days
  );
  
  if (result.success) {
    alert(`Loan created! ID: ${result.data.loanId}`);
    navigate(`/loans`);
  }
};
```

**Required Updates:**
- Calculate LTV correctly based on collateralization ratio (150%)
- Use blockchain collateral tokens instead of asset types

---

## 5️⃣ **Loan Management** (`LoansList.jsx`)

### Features to Implement:

#### A. View All Loans
**Frontend:** Loans list table
**Backend API:** `GET /api/loans/{borrowerAddress}`
**Integration:**
```jsx
const [loans, setLoans] = useState([]);

useEffect(() => {
  const fetchLoans = async () => {
    const result = await api.getLoans(borrowerAddress);
    if (result.success) {
      setLoans(result.data);
    }
  };
  fetchLoans();
}, []);
```

#### B. Repay Loan
**Frontend:** Repay button in loans table
**Backend API:** `POST /api/repayLoan`
**Integration:**
```jsx
const handleRepayLoan = async (loanId) => {
  const result = await api.repayLoan(
    lendingAddress,
    loanId
  );
  
  if (result.success) {
    alert('Loan repaid successfully!');
    // Refresh loans list
  }
};
```

---

## 6️⃣ **Customer Portal** (`CustomerPortal.jsx`)

### Features for Customers:

#### A. View Token Balance
**Frontend:** Token balance display
**Backend:** Needs new endpoint
**TODO:** Create `GET /api/token/{tokenAddress}/balance/{walletAddress}`

#### B. View My Loans
**Frontend:** Customer's loan list
**Backend API:** `GET /api/loans/{borrowerAddress}`
(Same as admin, but filtered to customer's wallet)

#### C. Request Loan
**Frontend:** Loan request form
**Backend API:** `POST /api/createLoan`
(Same as admin creates, but customer initiates)

---

## 7️⃣ **Compliance Reports** (`ComplianceReports.jsx`)

### Features to Implement:

#### A. Export Transaction History
**Frontend:** Download reports button
**Backend:** Needs new endpoint
**TODO:** Create `GET /api/bank/{bankAddress}/transactions`

#### B. Audit Trail
**Frontend:** Transaction timeline
**Backend:** Query blockchain events
**TODO:** Create `GET /api/bank/{bankAddress}/audit-trail`

---

## 8️⃣ **Investor Dashboard** (`InvestorDashboard.jsx`)

### Features to Implement:

#### A. View Investment Opportunities
**Frontend:** Available loans/assets
**Backend:** Needs new endpoint
**TODO:** Create `GET /api/investments/opportunities`

#### B. Track Returns
**Frontend:** ROI charts
**Backend:** Calculate from loan data
**TODO:** Create `GET /api/investments/{investorAddress}/returns`

---

## 🔧 Implementation Priority

### Phase 1 - Core Banking (Do First):
1. ✅ Bank deployment
2. ✅ Customer onboarding (upload customers)
3. ✅ Token minting
4. ✅ Loan creation
5. ✅ Loan repayment

### Phase 2 - Data Display:
6. Get bank details
7. Get customers list
8. Get loans list
9. Get token balances

### Phase 3 - Advanced Features:
10. Activity feed
11. Compliance reports
12. Investor portal
13. Analytics dashboards

---

## 📝 Next Steps for Each Page

### **BankAdmin.jsx**
```jsx
// Add at the top
import api from '../services/api';
import DeployBankForm from '../components/DeployBankForm';

// Add in the render
{section === 'setup' && <DeployBankForm />}

// Replace mock data with real API calls
useEffect(() => {
  api.getBankDetails(bankAddress).then(result => {
    // Update portfolioData, recentActivity, etc.
  });
}, []);
```

### **AddCustomer.jsx**
```jsx
// Update form to include wallet address
<input
  type="text"
  value={formData.walletAddress}
  onChange={(e) => setFormData({...formData, walletAddress: e.target.value})}
  placeholder="0x..."
  className="form-input"
  required
/>

// Update submit handler
const handleSubmit = async (e) => {
  e.preventDefault();
  const result = await api.uploadCustomers(bankAddress, [{
    name: formData.name,
    accountId: formData.kycId,
    walletAddress: formData.walletAddress
  }]);
  // Handle result
};
```

### **CreateLoan.jsx**
```jsx
// Update submit to use real API
const handleSubmit = async (e) => {
  e.preventDefault();
  const result = await api.createLoan(
    lendingAddress,
    customerWalletAddress,
    formData.collateralAmount,
    calculateLoanAmount().toString(),
    parseInt(formData.interestRate) * 100,
    parseInt(formData.tenure) * 30
  );
  // Handle result
};
```

---

## 🎯 Quick Integration Checklist

For each page, follow these steps:

1. **Import API service**
   ```jsx
   import api from '../services/api';
   ```

2. **Add state for data**
   ```jsx
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   ```

3. **Fetch data on mount**
   ```jsx
   useEffect(() => {
     const fetchData = async () => {
       setLoading(true);
       const result = await api.methodName(...);
       if (result.success) setData(result.data);
       setLoading(false);
     };
     fetchData();
   }, []);
   ```

4. **Handle form submissions**
   ```jsx
   const handleSubmit = async (e) => {
     e.preventDefault();
     setLoading(true);
     const result = await api.methodName(...);
     if (result.success) {
       alert('Success!');
       // Update UI
     } else {
       alert('Error: ' + result.error);
     }
     setLoading(false);
   };
   ```

5. **Show loading states**
   ```jsx
   {loading && <div>Loading...</div>}
   ```

---

## 📚 Available API Methods

```javascript
// Bank Operations
api.deployBank(bankAddress, bankName, tokenName, tokenSymbol, maxSupply, collateralizationRatio)
api.getBankDetails(bankAddress)

// Customer Operations
api.uploadCustomers(bankAddress, customers)
api.getCustomers(bankAddress)

// Token Operations
api.mintTokens(tokenAddress, toAddress, amount)

// Loan Operations
api.createLoan(lendingAddress, borrower, collateralAmount, loanAmount, interestRate, durationDays)
api.getLoans(borrowerAddress)
api.repayLoan(lendingAddress, loanId)

// System
api.healthCheck()
```

---

## ✅ Testing Each Feature

1. Start backend: `cd backend && node server.js`
2. Start frontend: `cd Finara && npm run dev`
3. Open browser: `http://localhost:5173`
4. Test each feature step by step
5. Check console for errors
6. Verify blockchain transactions in Hardhat node logs

---

**Ready to start integrating! Which page should we implement first?**
