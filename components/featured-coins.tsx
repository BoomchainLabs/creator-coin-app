'use client'

export default function FeaturedCoins() {
  const coins = [
    {
      id: 1,
      creator: '@sophia_ai',
      name: 'Sophia AI',
      price: '$1,850',
      change: '+8.2%',
      volume: '$450K',
      image: '/creator-avatar.png'
    },
    {
      id: 2,
      creator: '@crypto_dev',
      name: 'Crypto Dev',
      price: '$2,100',
      change: '+15.3%',
      volume: '$720K',
      image: '/developer-avatar.png'
    },
    {
      id: 3,
      creator: '@music_legend',
      name: 'Music Legend',
      price: '$3,200',
      change: '+22.1%',
      volume: '$1.2M',
      image: '/musician-avatar.png'
    },
    {
      id: 4,
      creator: '@art_master',
      name: 'Art Master',
      price: '$1,560',
      change: '+5.7%',
      volume: '$380K',
      image: '/artist-avatar.png'
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[color:var(--color-surface)]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-2">Featured Creators</h2>
          <p className="text-[color:var(--color-text-secondary)]">Trending creator coins this week</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {coins.map((coin) => (
            <div
              key={coin.id}
              className="card-base card-hover p-6 space-y-4 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">CC</span>
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm">{coin.creator}</div>
                  <div className="text-xs text-[color:var(--color-text-tertiary)]">{coin.name}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-bold">{coin.price}</span>
                  <span className={`text-sm font-semibold ${coin.change.startsWith('+') ? 'text-[color:var(--color-accent)]' : 'text-red-500'}`}>
                    {coin.change}
                  </span>
                </div>
                <div className="h-1 bg-[color:var(--color-surface-light)] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-accent" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div className="pt-2 border-t border-[color:var(--color-border)]">
                <div className="text-xs text-[color:var(--color-text-tertiary)] mb-3">24h Volume</div>
                <button className="btn-primary w-full text-sm py-2">
                  Trade
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
