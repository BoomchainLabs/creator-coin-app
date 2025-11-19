'use client'

import { useWeb3 } from '@/lib/web3-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/api-client'

interface PortfolioData {
  totalValue: number
  gainLoss: number
  gainLossPercent: number
  holdings: any[]
}

export function WalletStats() {
  const { address, balance, isConnected } = useWeb3()
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isConnected || !address) return

    const fetchPortfolio = async () => {
      setLoading(true)
      try {
        const data = await apiClient.portfolio.getByAddress(address)
        setPortfolio(data)
      } catch (error) {
        console.error('[v0] Failed to fetch portfolio:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolio()
  }, [address, isConnected])

  if (!isConnected) {
    return null
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Wallet Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <p className="text-xs text-muted-foreground">Address</p>
            <p className="text-sm font-mono break-all">{address}</p>
          </div>
          {balance && (
            <div>
              <p className="text-xs text-muted-foreground">Base Balance</p>
              <p className="text-sm font-semibold">
                {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {portfolio && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Portfolio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-xs text-muted-foreground">Total Value</p>
              <p className="text-lg font-semibold">${portfolio.totalValue.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Gain/Loss</p>
              <p className={`text-sm font-semibold ${portfolio.gainLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                ${portfolio.gainLoss.toFixed(2)} ({portfolio.gainLossPercent.toFixed(2)}%)
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Holdings</p>
              <p className="text-sm">{portfolio.holdings.length} coins</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
