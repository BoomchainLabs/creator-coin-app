import { Router, Request, Response } from 'express'
import { isValidAddress } from '../services/blockchain'

const router = Router()

router.get('/:walletAddress', async (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.params

    if (!isValidAddress(walletAddress)) {
      return res.status(400).json({ error: 'Invalid wallet address' })
    }

    // Mock portfolio data
    res.json({
      walletAddress,
      holdings: [
        { coinId: '1', symbol: 'ART', amount: 100, currentPrice: 0.42, value: 42 },
        { coinId: '2', symbol: 'CPR', amount: 50, currentPrice: 1.25, value: 62.5 },
      ],
      totalValue: 104.5,
      gainLoss: 12.5,
      gainLossPercent: 13.6,
      baseBalance: 0.5,
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolio' })
  }
})

export default router
