import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import blockchainRoutes from './routes/blockchain';
import contractsRoutes from './routes/contracts';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Blockchain routes
app.use('/api/blockchain', blockchainRoutes);

app.use('/api/contracts', contractsRoutes);

// Creator Coins endpoints
app.get('/api/coins', (req: Request, res: Response) => {
  // Mock data - replace with database queries
  const coins = [
    {
      id: '1',
      name: 'Artist Token',
      symbol: 'ART',
      price: 0.42,
      marketCap: 420000,
      volume24h: 125000,
      change24h: 12.5,
    },
    {
      id: '2',
      name: 'Creator Pro',
      symbol: 'CPR',
      price: 1.25,
      marketCap: 1250000,
      volume24h: 350000,
      change24h: -5.2,
    },
  ];
  res.json(coins);
});

app.get('/api/coins/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Creator Token',
    symbol: 'CRT',
    price: 0.75,
    marketCap: 750000,
    volume24h: 200000,
    change24h: 8.3,
    description: 'A token representing a creator',
    creatorName: 'John Creator',
    followers: 25000,
  });
});

// Trading endpoints
app.post('/api/trade', (req: Request, res: Response) => {
  const { walletAddress, coinId, amount, type } = req.body;
  
  if (!walletAddress || !coinId || !amount || !type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Mock response - replace with actual transaction logic
  res.json({
    success: true,
    transactionId: `0x${Math.random().toString(16).slice(2)}`,
    type,
    amount,
    coinId,
    timestamp: new Date().toISOString(),
  });
});

// Portfolio endpoints
app.get('/api/portfolio/:walletAddress', (req: Request, res: Response) => {
  const { walletAddress } = req.params;
  
  res.json({
    walletAddress,
    holdings: [
      { coinId: '1', amount: 100, purchasePrice: 0.35 },
      { coinId: '2', amount: 50, purchasePrice: 1.10 },
    ],
    totalValue: 145.5,
    gainLoss: 12.5,
  });
});

// Leaderboard endpoints
app.get('/api/leaderboard', (req: Request, res: Response) => {
  const creators = [
    { rank: 1, name: 'John Creator', followers: 125000, volume: 5000000 },
    { rank: 2, name: 'Jane Artist', followers: 98000, volume: 3500000 },
    { rank: 3, name: 'Mike Musician', followers: 75000, volume: 2800000 },
  ];
  res.json(creators);
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
