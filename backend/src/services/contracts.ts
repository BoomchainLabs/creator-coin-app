import axios from 'axios';
import { ethers } from 'ethers';

const RPC_URL = process.env.BASE_RPC_URL || 'https://sparkling-wispy-owl.base-mainnet.quiknode.pro/ea71080fa444effed8eec4c8424a2c636b89c554/';
const FACTORY_ADDRESS = process.env.FACTORY_CONTRACT_ADDRESS || '';

// CreatorCoinFactory ABI
const FACTORY_ABI = [
  {
    type: 'function',
    name: 'createCreatorCoin',
    inputs: [
      { name: 'name', type: 'string' },
      { name: 'symbol', type: 'string' },
      { name: 'creatorName', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'creatorWallet', type: 'address' },
      { name: 'initialSupply', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'getAllCoins',
    inputs: [],
    outputs: [{ name: '', type: 'address[]' }],
    stateMutability: 'view'
  }
];

// CreatorCoin ABI
const COIN_ABI = [
  {
    type: 'function',
    name: 'buyTokens',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'payable'
  },
  {
    type: 'function',
    name: 'sellTokens',
    inputs: [{ name: 'amount', type: 'uint256' }],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'balanceOf',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'tokenPrice',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'creatorName',
    inputs: [],
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view'
  }
];

const provider = new ethers.JsonRpcProvider(RPC_URL);

/**
 * Get contract instance for reading data
 */
export function getContractInstance(contractAddress: string) {
  return new ethers.Contract(contractAddress, COIN_ABI, provider);
}

/**
 * Get factory contract instance
 */
export function getFactoryInstance() {
  return new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, provider);
}

/**
 * Query all creator coins from factory
 */
export async function getAllCreatorCoins(): Promise<string[]> {
  if (!FACTORY_ADDRESS) {
    throw new Error('Factory contract address not configured');
  }
  
  try {
    const factory = getFactoryInstance();
    const coins = await factory.getAllCoins();
    return coins;
  } catch (error) {
    console.error('[v0] Error fetching creator coins:', error);
    throw error;
  }
}

/**
 * Get coin details from contract
 */
export async function getCoinDetails(contractAddress: string) {
  try {
    const contract = getContractInstance(contractAddress);
    
    const [name, symbol, creatorName, totalSupply, tokenPrice] = await Promise.all([
      contract.name ? contract.name() : 'Unknown',
      contract.symbol ? contract.symbol() : 'UNKNOWN',
      contract.creatorName ? contract.creatorName() : 'Unknown Creator',
      contract.totalSupply ? contract.totalSupply() : '0',
      contract.tokenPrice()
    ]);

    return {
      address: contractAddress,
      name,
      symbol,
      creatorName,
      totalSupply: totalSupply.toString(),
      tokenPrice: ethers.formatEther(tokenPrice),
      priceInWei: tokenPrice.toString()
    };
  } catch (error) {
    console.error('[v0] Error fetching coin details:', error);
    throw error;
  }
}

/**
 * Get user's token balance
 */
export async function getTokenBalance(contractAddress: string, walletAddress: string) {
  try {
    const contract = getContractInstance(contractAddress);
    const balance = await contract.balanceOf(walletAddress);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error('[v0] Error fetching token balance:', error);
    throw error;
  }
}

/**
 * Get account ETH balance
 */
export async function getEthBalance(walletAddress: string) {
  try {
    const balance = await provider.getBalance(walletAddress);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error('[v0] Error fetching ETH balance:', error);
    throw error;
  }
}

/**
 * Get transaction receipt
 */
export async function getTransactionStatus(txHash: string) {
  try {
    const receipt = await provider.getTransactionReceipt(txHash);
    if (!receipt) {
      return { status: 'pending' };
    }
    return {
      status: receipt.status === 1 ? 'success' : 'failed',
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed.toString()
    };
  } catch (error) {
    console.error('[v0] Error fetching transaction status:', error);
    throw error;
  }
}

/**
 * Estimate gas for token purchase
 */
export async function estimateBuyGas(contractAddress: string, ethAmount: string) {
  try {
    const contract = getContractInstance(contractAddress);
    const tx = await contract.buyTokens.estimateGas({
      value: ethers.parseEther(ethAmount)
    });
    return ethers.formatEther(ethers.BigNumberish(tx) * BigInt(1e9)); // Convert to gwei
  } catch (error) {
    console.error('[v0] Error estimating gas:', error);
    throw error;
  }
}
