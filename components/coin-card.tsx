'use client'

import { useState } from 'react'

interface CoinCardProps {
  coin: {
    id: number
    creator: string
    name: string
    price: number
    change: number
    volume: number
    marketCap: number
    holders: number
    description: string
  }
}

export default function CoinCard({ coin }: CoinCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="card-base card-hover p-6 space-y-4 cursor-pointer" onClick={() => setShowDetails(!showDetails)}>
      {/* Creator info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">
              {coin.name.charAt(0)}
            </span>
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-sm truncate">{coin.creator}</div>
            <div className="text-xs text-[color:var(--color-text-tertiary)]">{coin.name}</div>
          </div>
        </div>
        <div className={`text-sm font-bold px-2 py-1 rounded-lg ${
          coin.change > 0
            ? 'bg-[color:var(--color-accent)] bg-opacity-20 text-[color:var(--color-accent)]'
            : 'bg-red-500 bg-opacity-20 text-red-400'
        }`}>
          {coin.change > 0 ? '+' : ''}{coin.change}%
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-[color:var(--color-text-tertiary)]">{coin.description}</p>

      {/* Price and chart */}
      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <span className="text-2xl font-bold">${coin.price.toLocaleString()}</span>
          <span className="text-sm text-[color:var(--color-text-tertiary)]">24h</span>
        </div>
        <div className="h-1 bg-[color:var(--color-surface-light)] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-accent" style={{ width: `${Math.min(100, 40 + coin.change * 3)}%` }}></div>
        </div>
      </div>

      {/* Detailed stats - shown on expanded view */}
      {showDetails && (
        <div className="space-y-2 pt-4 border-t border-[color:var(--color-border)]">
          <div className="flex justify-between text-sm">
            <span className="text-[color:var(--color-text-tertiary)]">24h Volume</span>
            <span className="font-semibold">${(coin.volume / 1000).toFixed(0)}K</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[color:var(--color-text-tertiary)]">Market Cap</span>
            <span className="font-semibold">${(coin.marketCap / 1000000).toFixed(1)}M</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[color:var(--color-text-tertiary)]">Holders</span>
            <span className="font-semibold">{coin.holders.toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-2 pt-2">
        <button className="btn-primary flex-1 text-sm py-2">
          Buy
        </button>
        <button className="btn-secondary flex-1 text-sm py-2">
          Sell
        </button>
      </div>
    </div>
  )
}
