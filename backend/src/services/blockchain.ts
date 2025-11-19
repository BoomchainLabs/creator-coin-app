import axios from 'axios';

const RPC_URL = process.env.BASE_RPC_URL || 'https://sparkling-wispy-owl.base-mainnet.quiknode.pro/ea71080fa444effed8eec4c8424a2c636b89c554/';

interface JSONRPCRequest {
  method: string;
  params: any[];
  id?: number;
  jsonrpc: string;
}

interface JSONRPCResponse {
  jsonrpc: string;
  id: number;
  result?: any;
  error?: { code: number; message: string };
}

export async function makeRPCCall(method: string, params: any[] = []): Promise<any> {
  try {
    const payload: JSONRPCRequest = {
      jsonrpc: '2.0',
      method,
      params,
      id: Math.floor(Math.random() * 10000),
    };

    const response = await axios.post<JSONRPCResponse>(RPC_URL, payload, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.data.error) {
      throw new Error(`RPC Error: ${response.data.error.message}`);
    }

    return response.data.result;
  } catch (error) {
    console.error('[blockchain] RPC call failed:', error);
    throw error;
  }
}

// Get current block number
export async function getBlockNumber(): Promise<number> {
  const result = await makeRPCCall('eth_blockNumber', []);
  return parseInt(result, 16);
}

// Get account balance in wei
export async function getBalance(address: string): Promise<string> {
  return makeRPCCall('eth_getBalance', [address, 'latest']);
}

// Convert wei to ether
export function weiToEther(wei: string): number {
  const weiNum = BigInt(wei);
  return Number(weiNum) / 1e18;
}

// Get transaction count (nonce)
export async function getTransactionCount(address: string): Promise<number> {
  const result = await makeRPCCall('eth_getTransactionCount', [address, 'latest']);
  return parseInt(result, 16);
}

// Check if address is valid
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}
