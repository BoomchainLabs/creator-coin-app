import { Router } from 'express';
import * as contractService from '../services/contracts';

const router = Router();

/**
 * GET /api/contracts/coins
 * Get all creator coins
 */
router.get('/coins', async (req, res) => {
  try {
    const coins = await contractService.getAllCreatorCoins();
    
    // Fetch details for each coin
    const coinDetails = await Promise.all(
      coins.map(async (address) => {
        try {
          return await contractService.getCoinDetails(address);
        } catch (error) {
          console.error(`Error fetching details for ${address}:`, error);
          return null;
        }
      })
    );

    res.json(coinDetails.filter(coin => coin !== null));
  } catch (error) {
    console.error('Error fetching coins:', error);
    res.status(500).json({ error: 'Failed to fetch coins' });
  }
});

/**
 * GET /api/contracts/coins/:address
 * Get specific coin details
 */
router.get('/coins/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const details = await contractService.getCoinDetails(address);
    res.json(details);
  } catch (error) {
    console.error('Error fetching coin details:', error);
    res.status(500).json({ error: 'Failed to fetch coin details' });
  }
});

/**
 * GET /api/contracts/balance/:coinAddress/:walletAddress
 * Get user's token balance
 */
router.get('/balance/:coinAddress/:walletAddress', async (req, res) => {
  try {
    const { coinAddress, walletAddress } = req.params;
    const balance = await contractService.getTokenBalance(coinAddress, walletAddress);
    res.json({ balance });
  } catch (error) {
    console.error('Error fetching balance:', error);
    res.status(500).json({ error: 'Failed to fetch balance' });
  }
});

/**
 * GET /api/contracts/eth-balance/:walletAddress
 * Get user's ETH balance
 */
router.get('/eth-balance/:walletAddress', async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const balance = await contractService.getEthBalance(walletAddress);
    res.json({ ethBalance: balance });
  } catch (error) {
    console.error('Error fetching ETH balance:', error);
    res.status(500).json({ error: 'Failed to fetch ETH balance' });
  }
});

/**
 * GET /api/contracts/tx-status/:txHash
 * Get transaction status
 */
router.get('/tx-status/:txHash', async (req, res) => {
  try {
    const { txHash } = req.params;
    const status = await contractService.getTransactionStatus(txHash);
    res.json(status);
  } catch (error) {
    console.error('Error fetching transaction status:', error);
    res.status(500).json({ error: 'Failed to fetch transaction status' });
  }
});

export default router;
