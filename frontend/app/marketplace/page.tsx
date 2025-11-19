'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { apiClient } from '@/lib/api-client'
import { useWeb3 } from '@/lib/web3-context'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface Coin {
  id: string
  name: string
  symbol: string
  address: string
  price: number
  marketCap: number
  volume24h: number
  change24h: number
  creators: string[]
}

export default function MarketplacePage() {
  const { isConnected, address } = useWeb3()
  const [coins, setCoins] = useState<Coin[]>([])
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true)
      try {
        const data = await apiClient.coins.getAll()
        setCoins(data)
        setFilteredCoins(data)
      } catch (error) {
        console.error('[v0] Failed to fetch coins:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCoins()
  }, [])

  useEffect(() => {
    const filtered = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.creators.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    setFilteredCoins(filtered)
  }, [searchTerm, coins])

  return (
    <main className="flex-1 space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Creator Coin Marketplace</h1>
        <p className="text-muted-foreground">
          Discover and invest in creator tokens on the Base network
        </p>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Search coins, creators..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      {loading ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Loading creator coins...</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCoins.map((coin) => (
            <Card key={coin.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{coin.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{coin.creators.join(', ')}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Price</p>
                    <p className="text-2xl font-bold">${coin.price.toFixed(4)}</p>
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded ${
                      coin.change24h >= 0
                        ? 'bg-green-500/10 text-green-600'
                        : 'bg-red-500/10 text-red-600'
                    }`}
                  >
                    {coin.change24h >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span className="text-sm font-semibold">{coin.change24h.toFixed(2)}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Market Cap</p>
                    <p className="font-semibold">${(coin.marketCap / 1000000).toFixed(2)}M</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">24h Volume</p>
                    <p className="font-semibold">${(coin.volume24h / 1000).toFixed(1)}K</p>
                  </div>
                </div>

                {isConnected && address ? (
                  <Button className="w-full">
                    Buy {coin.symbol}
                  </Button>
                ) : (
                  <Button disabled className="w-full">
                    Connect wallet to trade
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredCoins.length === 0 && !loading && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No coins found matching your search</p>
          </CardContent>
        </Card>
      )}
    </main>
  )
}
