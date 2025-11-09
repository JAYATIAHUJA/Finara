const { ethers } = require('ethers');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

/**
 * Relayer service for handling blockchain transactions
 * This service uses a private key to sign and send transactions
 * without requiring MetaMask or user gas fees
 */
class RelayerService {
  constructor() {
    this.provider = new ethers.JsonRpcProvider(
      process.env.SEPOLIA_RPC_URL || 'https://rpc.sepolia.org'
    );
    
    if (!process.env.RELAYER_PRIVATE_KEY || process.env.RELAYER_PRIVATE_KEY === '0x0000000000000000000000000000000000000000000000000000000000000000') {
      console.warn('⚠️  Warning: RELAYER_PRIVATE_KEY not configured or using placeholder');
      console.warn('   Blockchain transactions will not work until you set a valid private key');
      console.warn('   Server will run in demo mode');
      this.demoMode = true;
      return;
    }
    
    this.wallet = new ethers.Wallet(process.env.RELAYER_PRIVATE_KEY, this.provider);
    this.factoryAddress = process.env.FACTORY_ADDRESS;
    
    try {
      // Load contract ABIs
      this.factoryABI = require('../../artifacts/contracts/BankFactory.sol/BankFactory.json').abi;
      this.tokenABI = require('../../artifacts/contracts/CompliantToken.sol/CompliantToken.json').abi;
      this.lendingABI = require('../../artifacts/contracts/LendingContract.sol/LendingContract.json').abi;
      
      if (this.factoryAddress && this.factoryAddress !== '0x0000000000000000000000000000000000000000') {
        this.factoryContract = new ethers.Contract(
          this.factoryAddress,
          this.factoryABI,
          this.wallet
        );
      }
    } catch (error) {
      console.warn('⚠️  Warning: Contract artifacts not found. Run "npm run compile" first');
      this.demoMode = true;
    }
  }
  
  /**
   * Get the relayer wallet address
   */
  getRelayerAddress() {
    if (this.demoMode) {
      return '0x0000000000000000000000000000000000000000';
    }
    return this.wallet.address;
  }
  
  /**
   * Get the current balance of the relayer wallet
   */
  async getBalance() {
    if (this.demoMode) {
      return ethers.parseEther('0');
    }
    return await this.provider.getBalance(this.wallet.address);
  }
  
  /**
   * Deploy a new bank setup
   */
  async deployBank(bankAddress, bankName, tokenName, tokenSymbol, maxSupply, collateralizationRatio) {
    if (this.demoMode) {
      return {
        success: false,
        error: 'Relayer service is in demo mode. Please configure RELAYER_PRIVATE_KEY and deploy contracts.'
      };
    }
    
    try {
      const tx = await this.factoryContract.deployBank(
        bankAddress,
        bankName,
        tokenName,
        tokenSymbol,
        ethers.parseEther(maxSupply.toString()),
        collateralizationRatio
      );
      
      const receipt = await tx.wait();
      
      // Extract token and lending addresses from events
      const event = receipt.logs.find(
        log => {
          try {
            const parsed = this.factoryContract.interface.parseLog(log);
            return parsed && parsed.name === 'BankDeployed';
          } catch {
            return false;
          }
        }
      );
      
      if (event) {
        const parsed = this.factoryContract.interface.parseLog(event);
        return {
          success: true,
          transactionHash: receipt.hash,
          tokenAddress: parsed.args.tokenAddress,
          lendingAddress: parsed.args.lendingAddress,
          blockNumber: receipt.blockNumber
        };
      }
      
      // Fallback: query the factory
      const deployment = await this.factoryContract.getBankDeployment(bankAddress);
      return {
        success: true,
        transactionHash: receipt.hash,
        tokenAddress: deployment.tokenAddress,
        lendingAddress: deployment.lendingAddress,
        blockNumber: receipt.blockNumber
      };
    } catch (error) {
      console.error('Error deploying bank:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  /**
   * Authorize relayer on a token contract
   */
  async authorizeRelayer(tokenAddress) {
    if (this.demoMode) {
      return {
        success: false,
        error: 'Relayer service is in demo mode'
      };
    }
    
    try {
      const tokenContract = new ethers.Contract(tokenAddress, this.tokenABI, this.wallet);
      
      const tx = await tokenContract.addAuthorizedVerifier(this.wallet.address);
      const receipt = await tx.wait();
      
      return {
        success: true,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber
      };
    } catch (error) {
      console.error('Error authorizing relayer:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  /**
   * Verify customer addresses on the token contract
   */
  async verifyCustomers(tokenAddress, addresses) {
    if (this.demoMode) {
      return {
        success: false,
        error: 'Relayer service is in demo mode'
      };
    }
    
    try {
      const tokenContract = new ethers.Contract(tokenAddress, this.tokenABI, this.wallet);
      
      const tx = await tokenContract.batchVerifyAddresses(addresses);
      const receipt = await tx.wait();
      
      return {
        success: true,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        verifiedCount: addresses.length
      };
    } catch (error) {
      console.error('Error verifying customers:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  /**
   * Mint tokens to a verified address
   */
  async mintToken(tokenAddress, toAddress, amount) {
    if (this.demoMode) {
      return {
        success: false,
        error: 'Relayer service is in demo mode'
      };
    }
    
    try {
      const tokenContract = new ethers.Contract(tokenAddress, this.tokenABI, this.wallet);
      
      const tx = await tokenContract.mint(
        toAddress,
        ethers.parseEther(amount.toString())
      );
      const receipt = await tx.wait();
      
      return {
        success: true,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        amount: amount,
        recipient: toAddress
      };
    } catch (error) {
      console.error('Error minting token:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  /**
   * Create a loan
   */
  async createLoan(lendingAddress, borrower, collateralAmount, loanAmount, interestRate, duration) {
    if (this.demoMode) {
      return {
        success: false,
        error: 'Relayer service is in demo mode'
      };
    }
    
    try {
      const lendingContract = new ethers.Contract(lendingAddress, this.lendingABI, this.wallet);
      
      const tx = await lendingContract.createLoan(
        borrower,
        ethers.parseEther(collateralAmount.toString()),
        ethers.parseEther(loanAmount.toString()),
        interestRate, // in basis points
        duration // in seconds
      );
      const receipt = await tx.wait();
      
      // Extract loan ID from events
      const event = receipt.logs.find(
        log => {
          try {
            const parsed = lendingContract.interface.parseLog(log);
            return parsed && parsed.name === 'LoanCreated';
          } catch {
            return false;
          }
        }
      );
      
      let loanId = null;
      if (event) {
        const parsed = lendingContract.interface.parseLog(event);
        loanId = parsed.args.loanId.toString();
      }
      
      return {
        success: true,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        loanId: loanId
      };
    } catch (error) {
      console.error('Error creating loan:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  /**
   * Get token contract instance
   */
  getTokenContract(tokenAddress) {
    if (this.demoMode) {
      return null;
    }
    return new ethers.Contract(tokenAddress, this.tokenABI, this.provider);
  }
  
  /**
   * Get lending contract instance
   */
  getLendingContract(lendingAddress) {
    if (this.demoMode) {
      return null;
    }
    return new ethers.Contract(lendingAddress, this.lendingABI, this.provider);
  }
  
  /**
   * Get factory contract instance
   */
  getFactoryContract() {
    if (this.demoMode) {
      return null;
    }
    return this.factoryContract;
  }
}

module.exports = new RelayerService();

