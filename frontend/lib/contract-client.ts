import { ethers } from 'ethers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const contractClient = {
  /**
   * Get all creator coins from backend
   */
  async getAllCoins() {
    const response = await fetch(`${API_BASE_URL}/api/contracts/coins`);
    if (!response.ok) throw new Error('Failed to fetch coins');
    return response.json();
  },

  /**
   * Get specific coin details
   */
  async getCoinDetails(address: string) {
    const response = await fetch(`${API_BASE_URL}/api/contracts/coins/${address}`);
    if (!response.ok) throw new Error('Failed to fetch coin details');
    return response.json();
  },

  /**
   * Get user's token balance
   */
  async getTokenBalance(coinAddress: string, walletAddress: string) {
    const response = await fetch(
      `${API_BASE_URL}/api/contracts/balance/${coinAddress}/${walletAddress}`
    );
    if (!response.ok) throw new Error('Failed to fetch balance');
    return response.json();
  },

  /**
   * Get user's ETH balance
   */
  async getEthBalance(walletAddress: string) {
    const response = await fetch(
      `${API_BASE_URL}/api/contracts/eth-balance/${walletAddress}`
    );
    if (!response.ok) throw new Error('Failed to fetch ETH balance');
    return response.json();
  },

  /**
   * Check transaction status
   */
  async getTransactionStatus(txHash: string) {
    const response = await fetch(
      `${API_BASE_URL}/api/contracts/tx-status/${txHash}`
    );
    if (!response.ok) throw new Error('Failed to fetch transaction status');
    return response.json();
  }
};
