'use client'

export default function Leaderboard() {
  const topCreators = [
    { rank: 1, name: 'Music Legend', gain: '+22.1%', volume: '$1.2M', holders: 3100 },
    { rank: 2, name: 'Game Pro', gain: '+18.9%', volume: '$890K', holders: 2900 },
    { rank: 3, name: 'Crypto Dev', gain: '+15.3%', volume: '$720K', holders: 2340 },
    { rank: 4, name: 'Fitness Guru', gain: '+12.5%', volume: '$560K', holders: 1567 },
    { rank: 5, name: 'Sophia AI', gain: '+8.2%', volume: '$450K', holders: 1245 },
  ]

  return (
    <div className="card-base p-6 space-y-4">
      <h2 className="text-xl font-bold">Trending Creators</h2>

      <div className="space-y-2">
        {topCreators.map(creator => (
          <div key={creator.rank} className="flex items-center gap-4 p-4 bg-[color:var(--color-surface-light)] rounded-lg hover:bg-[color:var(--color-surface)] transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center font-bold text-white">
              {creator.rank}
            </div>
            <div className="flex-1">
              <div className="font-semibold">{creator.name}</div>
              <div className="text-xs text-[color:var(--color-text-tertiary)]">{creator.holders.toLocaleString()} holders</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-[color:var(--color-accent)]">{creator.gain}</div>
              <div className="text-xs text-[color:var(--color-text-tertiary)]">{creator.volume}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
