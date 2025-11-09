const express = require('express');
const router = express.Router();
const relayer = require('../services/relayer');
const supabase = require('../config/supabase');

/**
 * POST /api/tokenize
 * Tokenize a customer's asset and mint ERC20 tokens
 * 
 * Flow:
 * 1. Customer submits asset (gold, property, etc.)
 * 2. Bank verifies the asset
 * 3. System calculates token amount based on asset value
 * 4. Mints ERC20 tokens to customer's wallet
 * 5. Customer can see tokens in MetaMask/any Ethereum wallet
 */
router.post('/tokenize', async (req, res) => {
  try {
    const {
      bankAddress,
      customerWallet,
      assetType,          // e.g., 'gold', 'property', 'vehicle'
      assetDescription,   // e.g., '24K Gold Jewelry - 50g'
      assetValue,         // Monetary value in currency (e.g., 100000 INR)
      tokenizationRatio   // How many tokens per currency unit (default: 1 token = 1 currency unit)
    } = req.body;

    // Validation
    if (!bankAddress || !customerWallet || !assetType || !assetValue) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: bankAddress, customerWallet, assetType, assetValue'
      });
    }

    if (assetValue <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Asset value must be greater than 0'
      });
    }

    // Get bank details
    const { data: bank } = await supabase
      .from('banks')
      .select('token_address, token_name, token_symbol')
      .eq('bank_address', bankAddress.toLowerCase())
      .single();

    if (!bank) {
      return res.status(404).json({
        success: false,
        error: 'Bank not found'
      });
    }

    // Verify customer is KYC verified
    const { data: customer } = await supabase
      .from('customers')
      .select('*')
      .eq('bank_address', bankAddress.toLowerCase())
      .eq('wallet_address', customerWallet.toLowerCase())
      .eq('kyc_verified', true)
      .single();

    if (!customer) {
      return res.status(403).json({
        success: false,
        error: 'Customer not found or not KYC verified. Please complete KYC first.'
      });
    }

    // Calculate token amount (default: 1 token = 1 currency unit)
    const ratio = tokenizationRatio || 1;
    const tokenAmount = Math.floor(assetValue * ratio);

    // Generate unique asset ID
    const assetId = `ASSET-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Save asset to database FIRST (before minting)
    const { data: assetData, error: assetError } = await supabase
      .from('assets')
      .insert({
        bank_address: bankAddress.toLowerCase(),
        customer_wallet: customerWallet.toLowerCase(),
        asset_id: assetId,
        asset_type: assetType,
        description: assetDescription || `${assetType} asset`,
        value: assetValue,
        tokenized_amount: tokenAmount.toString(),
        status: 'verified',
        metadata: {
          tokenizationRatio: ratio,
          tokenSymbol: bank.token_symbol,
          tokenizedAt: new Date().toISOString()
        }
      })
      .select()
      .single();

    if (assetError) {
      console.error('Database error:', assetError);
      return res.status(500).json({
        success: false,
        error: 'Failed to save asset: ' + assetError.message
      });
    }

    // Mint tokens to customer's wallet
    console.log(`Minting ${tokenAmount} tokens to ${customerWallet} for asset ${assetId}`);
    
    const mintResult = await relayer.mintTokens(
      bank.token_address,
      customerWallet,
      tokenAmount
    );

    if (!mintResult.success) {
      // Rollback: Update asset status to failed
      await supabase
        .from('assets')
        .update({ status: 'failed', metadata: { ...assetData.metadata, error: mintResult.error } })
        .eq('id', assetData.id);

      return res.status(500).json({
        success: false,
        error: 'Failed to mint tokens: ' + mintResult.error
      });
    }

    // Record the token mint transaction
    await supabase
      .from('token_mints')
      .insert({
        bank_address: bankAddress.toLowerCase(),
        wallet_address: customerWallet.toLowerCase(),
        amount: tokenAmount,
        transaction_hash: mintResult.transactionHash,
        block_number: mintResult.blockNumber,
        asset_id: assetId
      });

    // Update asset with transaction details
    await supabase
      .from('assets')
      .update({
        status: 'tokenized',
        metadata: {
          ...assetData.metadata,
          transactionHash: mintResult.transactionHash,
          blockNumber: mintResult.blockNumber
        }
      })
      .eq('id', assetData.id);

    res.json({
      success: true,
      message: `Successfully tokenized ${assetType} asset`,
      data: {
        assetId: assetId,
        assetValue: assetValue,
        tokensIssued: tokenAmount,
        tokenSymbol: bank.token_symbol,
        tokenAddress: bank.token_address,
        customerWallet: customerWallet,
        transactionHash: mintResult.transactionHash,
        blockNumber: mintResult.blockNumber,
        viewInWallet: {
          instructions: 'Add this token to MetaMask',
          tokenAddress: bank.token_address,
          symbol: bank.token_symbol,
          decimals: 18
        }
      }
    });

  } catch (error) {
    console.error('Error tokenizing asset:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/tokenize/customer/:walletAddress
 * Get all tokenized assets for a customer
 */
router.get('/tokenize/customer/:walletAddress', async (req, res) => {
  try {
    const { walletAddress } = req.params;

    const { data: assets, error } = await supabase
      .from('assets')
      .select('*')
      .eq('customer_wallet', walletAddress.toLowerCase())
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }

    // Get total tokenized value
    const totalValue = assets.reduce((sum, asset) => sum + parseFloat(asset.value || 0), 0);
    const totalTokens = assets.reduce((sum, asset) => sum + parseFloat(asset.tokenized_amount || 0), 0);

    res.json({
      success: true,
      data: {
        assets: assets || [],
        summary: {
          totalAssets: assets?.length || 0,
          totalValue: totalValue,
          totalTokensIssued: totalTokens,
          assetTypes: [...new Set(assets.map(a => a.asset_type))]
        }
      }
    });

  } catch (error) {
    console.error('Error getting customer assets:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/tokenize/asset/:assetId
 * Get details of a specific tokenized asset
 */
router.get('/tokenize/asset/:assetId', async (req, res) => {
  try {
    const { assetId } = req.params;

    const { data: asset, error } = await supabase
      .from('assets')
      .select('*')
      .eq('asset_id', assetId)
      .single();

    if (error || !asset) {
      return res.status(404).json({
        success: false,
        error: 'Asset not found'
      });
    }

    res.json({
      success: true,
      data: asset
    });

  } catch (error) {
    console.error('Error getting asset details:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
