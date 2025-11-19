import { Router, Request, Response } from 'express'
import { getBalance, weiToEther, isValidAddress } from '../services/blockchain'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const coins = [
      {
        id: '1',
        name: 'Artist Token',
        symbol: 'ART',
        address: '0x1234567890123456789012345678901234567890',
        price: 0.42,
        marketCap: 420000,
        volume24h: 125000,
        change24h: 12.5,
        creators: ['Alice'],
      },
      {
        id: '2',
        name: 'Creator Pro',
        symbol: 'CPR',
        address: '0x0987654321098765432109876543210987654321',
        price: 1.25,
        marketCap: 1250000,
        volume24h: 350000,
        change24h: -5.2,
        creators: ['Bob'],
      },
    ]
    res.json(coins)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch coins' })
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    
    // Mock coin details (replace with database lookup)
    const coins: { [key: string]: any } = {
      '1': {
        id: '1',
        name: 'Artist Token',
        symbol: 'ART',
        address: '0x1234567890123456789012345678901234567890',
        price: 0.42,
        marketCap: 420000,
        volume24h: 125000,
        change24h: 12.5,
        description: 'Token for digital artists',
        creatorName: 'Alice',
        creatorAddress: '0x1111111111111111111111111111111111111111',
        followers: 25000,
        totalSupply: '1000000',
      },
    }

    const coin = coins[id]
    if (!coin) {
      return res.status(404).json({ error: 'Coin not found' })
    }

    res.json(coin)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch coin details' })
  }
})

router.get('/:coinId/holdings/:walletAddress', async (req: Request, res: Response) => {
  try {
    const { coinId, walletAddress } = req.params

    if (!isValidAddress(walletAddress)) {
      return res.status(400).json({ error: 'Invalid wallet address' })
    }

    // Mock holdings data (replace with blockchain token balance query)
    res.json({
      coinId,
      walletAddress,
      balance: 150,
      valueUSD: 63,
      percentageOfTotal: 0.015,
      purchaseHistory: [
        { date: '2024-01-15', amount: 100, price: 0.35 },
        { date: '2024-01-20', amount: 50, price: 0.42 },
      ],
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch holdings' })
  }
})

export default router
