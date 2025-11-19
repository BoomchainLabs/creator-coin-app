import { Router, Request, Response } from 'express'
import { getBlockNumber, getBalance, weiToEther, isValidAddress } from '../services/blockchain'
import { getTokenBalance, decodeTokenBalance } from '../services/token'

const router = Router()

router.get('/block', async (req: Request, res: Response) => {
  try {
    const blockNumber = await getBlockNumber()
    res.json({ blockNumber, chainId: 8453, network: 'Base Mainnet' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch block number' })
  }
})

router.get('/balance/:address', async (req: Request, res: Response) => {
  try {
    const { address } = req.params

    if (!isValidAddress(address)) {
      return res.status(400).json({ error: 'Invalid Ethereum address' })
    }

    const balanceWei = await getBalance(address)
    const balanceEther = weiToEther(balanceWei)

    res.json({
      address,
      balance: {
        wei: balanceWei,
        ether: balanceEther,
      },
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch balance' })
  }
})

router.get('/token-balance/:tokenAddress/:userAddress', async (req: Request, res: Response) => {
  try {
    const { tokenAddress, userAddress } = req.params
    const { decimals = '18' } = req.query

    if (!isValidAddress(tokenAddress) || !isValidAddress(userAddress)) {
      return res.status(400).json({ error: 'Invalid Ethereum address' })
    }

    const decimalsNum = parseInt(decimals as string, 10)
    const hexBalance = await getTokenBalance(tokenAddress, userAddress, decimalsNum)
    const balance = decodeTokenBalance(hexBalance, decimalsNum)

    res.json({
      tokenAddress,
      userAddress,
      balance,
      decimals: decimalsNum,
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch token balance' })
  }
})

export default router
