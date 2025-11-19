import { makeRPCCall } from './blockchain';

// ERC20 ABI for balance queries (encoded functions)
const ERC20_BALANCE_OF = '0x70a08231'; // balanceOf(address)

export interface TokenInfo {
  symbol: string;
  name: string;
  decimals: number;
  totalSupply: string;
}

export interface TokenBalance {
  token: string;
  balance: string;
  decimals: number;
}

// Get ERC20 token balance for an address
export async function getTokenBalance(tokenAddress: string, userAddress: string, decimals: number = 18): Promise<string> {
  const paddedAddress = userAddress.slice(2).padStart(64, '0');
  const data = ERC20_BALANCE_OF + paddedAddress;

  const result = await makeRPCCall('eth_call', [
    {
      to: tokenAddress,
      data,
    },
    'latest',
  ]);

  return result;
}

// Decode token balance from hex
export function decodeTokenBalance(hexResult: string, decimals: number): number {
  const balance = BigInt(hexResult);
  return Number(balance) / Math.pow(10, decimals);
}
