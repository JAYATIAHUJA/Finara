# Finara - Blockchain-Based Tokenization and Lending Platform

Finara is a comprehensive blockchain infrastructure that enables banks to tokenize verified real-world assets and issue on-chain loans to KYC-verified customers. Built on Ethereum Sepolia testnet with ERC-3643 compliant tokens, the platform combines blockchain automation with secure bank-verified data management.

## 🌟 Features

### For Banks
- **One-Click Deployment**: Deploy Token and Lending contracts through a user-friendly admin dashboard
- **Customer Management**: Upload and verify KYC customers with blockchain wallet addresses
- **Asset Tokenization**: Convert real-world assets into ERC-3643 compliant tokens
- **Loan Management**: Create collateralized loans with customizable interest rates and terms
- **Compliance Dashboard**: Monitor KYC status, audit trails, and regulatory compliance
- **Analytics**: Real-time portfolio tracking, loan performance metrics, and customer insights

### For Customers
- **Self-Service Portal**: Secure login with account number and password
- **Asset Management**: View all tokenized assets and their current values
- **Asset Marketplace**: List assets for sale and see interested buyers
- **Loan Dashboard**: Track active loans, EMI payments, and interest rates
- **KYC Profile**: View verification status and wallet details
- **Blockchain History**: Complete transaction history with blockchain proof

### For Investors
- **Investment Dashboard**: Portfolio overview with real-time analytics
- **Asset Marketplace**: Browse and purchase tokenized assets
- **Order Management**: Track buy/sell orders and transaction history
- **Blockchain Verification**: Every transaction recorded on-chain with TX hash
- **Performance Tracking**: Monitor ROI and asset performance

### Blockchain Features
- **ERC-3643 Compliant Tokens**: Only verified KYC customers can hold or trade tokens
- **On-Chain Lending**: Automated loan disbursement, interest calculation, and collateral management
- **Relayer Service**: Gasless transactions - no MetaMask required for users
- **Transaction Recording**: All asset trades recorded on blockchain with full transparency
- **Smart Contract Security**: Audited contracts with multi-sig wallet support

## 🏗️ Architecture

### Smart Contracts (Solidity ^0.8.20)

1. **BankFactory.sol**: Deploys Token and Lending contracts for each bank
2. **CompliantToken.sol**: ERC-3643 inspired token with KYC verification and compliance features
3. **LendingContract.sol**: Manages collateralized loans with automated liquidation

### Backend (Node.js + Express)

- **RESTful API**: Complete backend for all operations
- **Relayer Service**: Handles blockchain transactions using Ethers.js
- **Supabase Integration**: PostgreSQL database for banks, customers, assets, and loans
- **Middleware**: Authentication, validation, and error handling

### Frontend (React + Vite)

- **Landing Page**: Modern marketing page with Lottie animations
- **Bank Admin Dashboard**: Complete management console with SideNav
- **Customer Portal**: Self-service portal with blockchain transaction tracking
- **Investor Dashboard**: Asset marketplace with portfolio analytics
- **Responsive Design**: Glassmorphism UI with smooth animations

### Data Storage

- **Blockchain**: Smart contract state, token balances, loan records
- **Supabase**: Bank info, customer KYC, asset metadata, transaction logs
- **localStorage**: Client-side demo data, auth tokens, blockchain transactions

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account and project
- Ethereum Sepolia testnet account with ETH for gas
- Hardhat for contract deployment

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/JAYATIAHUJA/Finara.git
cd Finara
```

### 2. Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd Finara
npm install
cd ..
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Ethereum Network Configuration
SEPOLIA_RPC_URL=https://rpc.sepolia.org
PRIVATE_KEY=your_deployer_private_key_here
RELAYER_PRIVATE_KEY=your_relayer_private_key_here

# Factory Contract Address (update after deployment)
FACTORY_ADDRESS=your_factory_address_after_deployment

# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Server Configuration
PORT=3000
```

### 4. Set Up Supabase Database

- Create a new Supabase project at [supabase.com](https://supabase.com)
- Go to the SQL Editor
- Run the schema from `database/schema.sql`
- Configure Row Level Security policies as needed
- Copy your project URL and anon key to `.env`

### 5. Deploy Smart Contracts

```bash
# Compile contracts
npm run compile

# Deploy to Sepolia testnet
npm run deploy

# Update FACTORY_ADDRESS in .env with the deployed address
```

## 🎮 Usage

### Start the Backend Server

```bash
npm run dev
# or for production
npm start
```

The server will start on `http://localhost:3000`

**Server Status:**
- ✅ Running in demo mode if credentials not configured
- ⚠️ Database disabled if Supabase not configured
- ⚠️ Blockchain features disabled if relayer not configured

### Start the Frontend

```bash
cd Finara
npm run dev
```

The frontend will start on `http://localhost:5173`

### Access the Application

- **Landing Page**: `http://localhost:5173/`
- **Bank Admin Login**: `http://localhost:5173/login`
- **Customer Portal**: `http://localhost:5173/customer-portal`
- **Investor Dashboard**: `http://localhost:5173/investor`

### Demo Credentials

#### Bank Admin
- Email: Any email
- Password: Any password

#### Customer Portal
- Account Number: Any number
- Password: `demo123`

#### Investor Portal
- Email: Any email
- Password: `demo123`

## 📚 API Documentation

### Health Check
```http
GET /health
```

### Deploy Bank
```http
POST /api/deployBank
Content-Type: application/json

{
  "bankAddress": "0x...",
  "bankName": "Example Bank",
  "tokenName": "Bank Token",
  "tokenSymbol": "BANK",
  "maxSupply": 1000000,
  "collateralizationRatio": 15000
}
```

### Upload Customers
```http
POST /api/uploadCustomers
Content-Type: application/json

{
  "bankAddress": "0x...",
  "customers": [
    {
      "name": "John Doe",
      "accountId": "ACC001",
      "walletAddress": "0x..."
    }
  ]
}
```

### Mint Tokens
```http
POST /api/mintToken
Content-Type: application/json

{
  "bankAddress": "0x...",
  "walletAddress": "0x...",
  "amount": 1000
}
```

### Create Loan
```http
POST /api/lend
Content-Type: application/json

{
  "bankAddress": "0x...",
  "borrowerAddress": "0x...",
  "collateralAmount": 1500,
  "loanAmount": 1000,
  "interestRate": 500,
  "duration": 2592000
}
```

For complete API documentation, visit `http://localhost:3000/` after starting the server.

## 📁 Project Structure

```
Finara/
├── contracts/              # Smart contracts
│   ├── BankFactory.sol
│   ├── CompliantToken.sol
│   └── LendingContract.sol
├── backend/
│   ├── server.js          # Express server
│   ├── config/
│   │   └── supabase.js    # Database config
│   ├── routes/            # API routes
│   ├── services/
│   │   └── relayer.js     # Blockchain service
│   └── middleware/        # Auth & validation
├── database/
│   └── schema.sql         # Supabase schema
├── scripts/
│   └── deploy.js          # Deployment script
├── Finara/                # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Route pages
│   │   ├── services/      # API & blockchain services
│   │   └── styles/        # CSS themes
│   └── public/            # Static assets
├── hardhat.config.js      # Hardhat configuration
├── package.json
├── .env.example
└── README.md
```

## 🔐 Security Features

- **KYC Verification**: Only verified addresses can hold tokens
- **Transfer Restrictions**: Compliance-enforced token transfers
- **Relayer Pattern**: No user private keys exposed to frontend
- **Row Level Security**: Supabase RLS policies
- **Input Validation**: Server-side validation on all endpoints
- **Environment Variables**: Sensitive data in .env (never committed)

## 🧪 Testing

```bash
# Run Hardhat tests
npm test

# Test on local network
npx hardhat node
npm run deploy:local
```

## 🛠️ Tech Stack

### Blockchain
- Solidity ^0.8.20
- Hardhat
- Ethers.js v6
- OpenZeppelin Contracts
- Ethereum Sepolia Testnet

### Backend
- Node.js
- Express.js
- Supabase (PostgreSQL)
- dotenv

### Frontend
- React 18
- Vite
- React Router
- Framer Motion
- Lottie Animations
- Three.js (GridScan)

## 📊 Features Implemented

✅ Bank deployment with factory pattern  
✅ ERC-3643 compliant token with KYC  
✅ Collateralized lending system  
✅ Customer onboarding and verification  
✅ Asset tokenization and management  
✅ Asset marketplace (Customer ↔ Investor)  
✅ Blockchain transaction recording  
✅ Transaction history with TX hashes  
✅ Loan creation and tracking  
✅ Compliance dashboard  
✅ Real-time analytics  
✅ Responsive UI with glassmorphism  
✅ Lottie animations  
✅ Demo mode for easy testing  

## 🚧 Roadmap

- [ ] Real authentication with JWT
- [ ] Payment gateway integration
- [ ] Advanced analytics dashboard
- [ ] Mobile responsive improvements
- [ ] Real-time notifications
- [ ] Multi-language support
- [ ] Advanced loan features (partial repayment, refinancing)
- [ ] NFT integration for unique assets
- [ ] Decentralized identity (DID)
- [ ] Cross-chain support

## 📖 Documentation

- [Architecture Overview](ARCHITECTURE.md)
- [Flow Diagram](FLOW_DIAGRAM.md)
- [Supabase Setup](SUPABASE_SETUP.md)
- [Tokenization Guide](TOKENIZATION_SETUP.md)
- [Postman Collection](Finara_API.postman_collection.json)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👥 Team

**Team Hacka Noodles** - Built in 2025

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- OpenZeppelin for secure smart contract libraries
- Supabase for backend infrastructure
- Ethereum community for blockchain standards
- Lottie Files for animations
- Vite and React teams for amazing developer experience

## 📞 Support

For issues and questions:
- Open an issue in the repository
- Check the documentation in the `docs/` folder
- Review the flow diagram for architecture understanding

## 🔗 Links

- **Repository**: [https://github.com/JAYATIAHUJA/Finara](https://github.com/JAYATIAHUJA/Finara)
- **Live Demo**: Coming soon
- **Documentation**: See `/docs` folder

---

**Built with ❤️ by Team Hacka Noodles**

*Transforming traditional banking with blockchain technology*

