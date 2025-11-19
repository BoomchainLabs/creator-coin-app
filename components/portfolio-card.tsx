interface PortfolioCardProps {
  coin: {
    id: number
    creator: string
    name: string
    amount: number
    avgPrice: number
    currentPrice: number
    totalValue: number
  }
}

export default function PortfolioCard({ coin }: PortfolioCardProps) {
  const gain = (coin.currentPrice - coin.avgPrice) * coin.amount
  const gainPercentage = ((coin.currentPrice - coin.avgPrice) / coin.avgPrice * 100).toFixed(2)

  return (
    <div className="card-base p-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Left section */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold">{coin.name.charAt(0)}</span>
          </div>
          <div className="min-w-0">
            <div className="font-semibold">{coin.creator}</div>
            <div className="text-sm text-[color:var(--color-text-tertiary)]">{coin.amount} coins</div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-8 text-right text-sm">
          <div>
            <div className="text-[color:var(--color-text-tertiary)]">Avg Price</div>
            <div className="font-semibold">${coin.avgPrice.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-[color:var(--color-text-tertiary)]">Current Price</div>
            <div className="font-semibold">${coin.currentPrice.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-[color:var(--color-text-tertiary)]">Total Value</div>
            <div className="font-semibold">${coin.totalValue.toLocaleString()}</div>
          </div>
          <div className={gainPercentage > 0 ? 'text-[color:var(--color-accent)]' : 'text-red-500'}>
            <div className="text-[color:var(--color-text-tertiary)]">Gain</div>
            <div className="font-semibold">{gainPercentage > 0 ? '+' : ''}{gainPercentage}%</div>
          </div>
        </div>

        {/* Action button */}
        <div className="flex gap-2">
          <button className="btn-primary text-sm py-2 px-4">Sell</button>
          <button className="btn-secondary text-sm py-2 px-4">Details</button>
        </div>
      </div>
    </div>
  )
}
