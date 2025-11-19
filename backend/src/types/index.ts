export interface Creator {
  id: string;
  name: string;
  bio?: string;
  avatarUrl?: string;
  walletAddress: string;
  followers: number;
  createdAt: string;
}

export interface Coin {
  id: string;
  creatorId: string;
  name: string;
  symbol: string;
  description?: string;
  price: number;
  marketCap: number;
  volume24h: number;
  change24h: number;
  totalSupply: number;
  createdAt: string;
}

export interface Transaction {
  id: string;
  walletAddress: string;
  coinId: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  totalValue: number;
  transactionHash?: string;
  status: 'pending' | 'confirmed' | 'failed';
  createdAt: string;
}

export interface Holding {
  id: string;
  walletAddress: string;
  coinId: string;
  amount: number;
  averagePurchasePrice: number;
  updatedAt: string;
}

export interface Portfolio {
  walletAddress: string;
  holdings: Holding[];
  totalValue: number;
  gainLoss: number;
}
