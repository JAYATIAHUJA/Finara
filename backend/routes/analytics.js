const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const relayer = require('../services/relayer');
const { ethers } = require('ethers');

/**
 * GET /analytics/:bankAddress
 * Get dashboard analytics for a bank
 */
router.get('/analytics/:bankAddress', async (req, res) => {
  try {
    const { bankAddress } = req.params;

    // Get bank info
    const { data: bank } = await supabase
      .from('banks')
      .select('*')
      .eq('bank_address', bankAddress)
      .single();

    if (!bank) {
      return res.status(404).json({
        success: false,
        error: 'Bank not found'
      });
    }

    // Get customers count
    const { count: customersCount } = await supabase
      .from('customers')
      .select('*', { count: 'exact', head: true })
      .eq('bank_address', bankAddress);

    // Get loans count and total
    const { data: loans } = await supabase
      .from('loans')
      .select('loan_amount, collateral_amount')
      .eq('bank_address', bankAddress);

    const totalLoans = loans?.length || 0;
    const totalLoanAmount = loans?.reduce((sum, loan) => sum + parseFloat(loan.loan_amount), 0) || 0;
    const totalCollateral = loans?.reduce((sum, loan) => sum + parseFloat(loan.collateral_amount), 0) || 0;

    // Get token mints
    const { data: mints } = await supabase
      .from('token_mints')
      .select('amount')
      .eq('bank_address', bankAddress);

    const totalTokensMinted = mints?.reduce((sum, mint) => sum + parseFloat(mint.amount), 0) || 0;

    // Get recent activity
    const { data: recentMints } = await supabase
      .from('token_mints')
      .select('wallet_address, amount, minted_at')
      .eq('bank_address', bankAddress)
      .order('minted_at', { ascending: false })
      .limit(5);

    const { data: recentLoans } = await supabase
      .from('loans')
      .select('borrower_address, loan_amount, created_at')
      .eq('bank_address', bankAddress)
      .order('created_at', { ascending: false })
      .limit(5);

    const { data: recentCustomers } = await supabase
      .from('customers')
      .select('name, wallet_address, verified_at')
      .eq('bank_address', bankAddress)
      .order('verified_at', { ascending: false })
      .limit(5);

    res.json({
      success: true,
      data: {
        bank: {
          name: bank.bank_name,
          tokenAddress: bank.token_address,
          lendingAddress: bank.lending_address,
          tokenSymbol: bank.token_symbol,
          deployedAt: bank.deployed_at
        },
        stats: {
          customersCount: customersCount || 0,
          totalLoans,
          totalLoanAmount: totalLoanAmount.toString(),
          totalCollateral: totalCollateral.toString(),
          totalTokensMinted: totalTokensMinted.toString(),
          avgCollateralizationRatio: totalLoanAmount > 0 
            ? ((totalCollateral / totalLoanAmount) * 100).toFixed(2) 
            : '0'
        },
        recentActivity: {
          mints: recentMints || [],
          loans: recentLoans || [],
          customers: recentCustomers || []
        }
      }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /token/:tokenAddress/balance/:walletAddress
 * Get token balance for a wallet
 */
router.get('/token/:tokenAddress/balance/:walletAddress', async (req, res) => {
  try {
    const { tokenAddress, walletAddress } = req.params;

    const tokenABI = require('../../artifacts/contracts/CompliantToken.sol/CompliantToken.json').abi;
    const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
    const tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);

    const balance = await tokenContract.balanceOf(walletAddress);
    const decimals = await tokenContract.decimals();
    const symbol = await tokenContract.symbol();

    res.json({
      success: true,
      data: {
        balance: ethers.formatUnits(balance, decimals),
        balanceRaw: balance.toString(),
        decimals: Number(decimals),
        symbol,
        tokenAddress,
        walletAddress
      }
    });
  } catch (error) {
    console.error('Error fetching token balance:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /customer/:walletAddress
 * Get customer details with token balances
 */
router.get('/customer/:walletAddress', async (req, res) => {
  try {
    const { walletAddress } = req.params;

    // Get customer info (normalize to lowercase)
    const { data: customer } = await supabase
      .from('customers')
      .select('*')
      .eq('wallet_address', walletAddress.toLowerCase())
      .single();

    if (!customer) {
      return res.status(404).json({
        success: false,
        error: 'Customer not found'
      });
    }

    // Get bank info to get token address
    const { data: bank } = await supabase
      .from('banks')
      .select('token_address, token_symbol, lending_address')
      .eq('bank_address', customer.bank_address)
      .single();

    // Get token balance
    let tokenBalance = '0';
    if (bank?.token_address) {
      try {
        const tokenABI = require('../../artifacts/contracts/CompliantToken.sol/CompliantToken.json').abi;
        const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
        const tokenContract = new ethers.Contract(bank.token_address, tokenABI, provider);
        const balance = await tokenContract.balanceOf(walletAddress);
        tokenBalance = ethers.formatEther(balance);
      } catch (err) {
        console.error('Error fetching balance:', err);
      }
    }

    // Get customer's loans
    const { data: loans } = await supabase
      .from('loans')
      .select('*')
      .eq('borrower_address', walletAddress);

    // Get customer's token mints
    const { data: mints } = await supabase
      .from('token_mints')
      .select('*')
      .eq('wallet_address', walletAddress)
      .order('minted_at', { ascending: false });

    res.json({
      success: true,
      data: {
        customer,
        bank: {
          tokenAddress: bank?.token_address,
          tokenSymbol: bank?.token_symbol,
          lendingAddress: bank?.lending_address
        },
        tokenBalance,
        loans: loans || [],
        mints: mints || [],
        stats: {
          totalLoans: loans?.length || 0,
          totalBorrowed: loans?.reduce((sum, l) => sum + parseFloat(l.loan_amount), 0) || 0,
          totalMinted: mints?.reduce((sum, m) => sum + parseFloat(m.amount), 0) || 0
        }
      }
    });
  } catch (error) {
    console.error('Error fetching customer details:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /activity/:bankAddress
 * Get recent activity feed for a bank
 */
router.get('/activity/:bankAddress', async (req, res) => {
  try {
    const { bankAddress } = req.params;
    const limit = parseInt(req.query.limit) || 20;

    // Get recent mints
    const { data: mints } = await supabase
      .from('token_mints')
      .select('*, customers!inner(name)')
      .eq('bank_address', bankAddress)
      .order('minted_at', { ascending: false })
      .limit(limit);

    // Get recent loans
    const { data: loans } = await supabase
      .from('loans')
      .select('*, customers!inner(name)')
      .eq('bank_address', bankAddress)
      .order('created_at', { ascending: false })
      .limit(limit);

    // Get recent customers
    const { data: customers } = await supabase
      .from('customers')
      .select('*')
      .eq('bank_address', bankAddress)
      .order('verified_at', { ascending: false })
      .limit(limit);

    // Combine and sort by timestamp
    const activities = [
      ...(mints || []).map(m => ({
        type: 'mint',
        event: '🪙 Token Minted',
        customer: m.customers?.name || 'Unknown',
        wallet: m.wallet_address,
        amount: m.amount,
        timestamp: m.minted_at,
        txHash: m.transaction_hash
      })),
      ...(loans || []).map(l => ({
        type: 'loan',
        event: '💰 Loan Created',
        customer: l.customers?.name || 'Unknown',
        wallet: l.borrower_address,
        amount: l.loan_amount,
        collateral: l.collateral_amount,
        timestamp: l.created_at,
        txHash: l.transaction_hash
      })),
      ...(customers || []).map(c => ({
        type: 'kyc',
        event: '✓ KYC Approved',
        customer: c.name,
        wallet: c.wallet_address,
        timestamp: c.verified_at
      }))
    ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
     .slice(0, limit);

    res.json({
      success: true,
      data: activities
    });
  } catch (error) {
    console.error('Error fetching activity:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
