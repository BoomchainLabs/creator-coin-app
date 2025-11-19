'use client'

import { useWeb3 } from '@/lib/web3-context'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { apiClient } from '@/lib/api-client'
import { WalletStats } from '@/components/wallet-stats'
import { BaseNetworkIndicator } from '@/components/base-network-indicator'

export default function DashboardPage() {
  const { isConnected, address } = useWeb3()
  const [portfolio, setPortfolio] = useState<any>(null)
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-lg font-semibold mb-4">Connect Your Wallet</p>
            <p className="text-muted-foreground">
              Please connect your wallet to view your dashboard
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <main className="flex-1 space-y-8 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <BaseNetworkIndicator />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <WalletStats />
      </div>

      {loading && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Loading portfolio...</p>
          </CardContent>
        </Card>
      )}

      {portfolio && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Holdings</h2>
          <div className="grid gap-4">
            {portfolio.holdings.map((holding: any) => (
              <Card key={holding.coinId}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{holding.symbol}</p>
                      <p className="text-sm text-muted-foreground">{holding.amount} tokens</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${holding.value.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">
                        ${holding.currentPrice.toFixed(4)} each
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
