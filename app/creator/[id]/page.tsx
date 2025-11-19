'use client'

import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

interface CreatorPageProps {
  params: {
    id: string
  }
}

export default function CreatorPage({ params }: CreatorPageProps) {
  const creatorData = {
    id: params.id,
    name: 'Sophia AI',
    handle: '@sophia_ai',
    bio: 'AI researcher, content creator, and tech educator with a passion for making artificial intelligence accessible to everyone.',
    followers: 125400,
    coinPrice: 1850,
    marketCap: 92500000,
    volume24h: 450000,
    holders: 1245,
    imageUrl: '/creator-avatar.png',
    links: [
      { platform: 'Twitter', url: '#' },
      { platform: 'YouTube', url: '#' },
      { platform: 'Discord', url: '#' },
    ]
  }

  return (
    <main className="w-full">
      <Navigation />

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Creator header */}
          <div className="card-base p-8 space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end">
              <div className="w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center">
                <span className="text-4xl font-bold text-white">{creatorData.name.charAt(0)}</span>
              </div>
              <div className="flex-1 space-y-2">
                <h1 className="text-4xl font-bold">{creatorData.name}</h1>
                <p className="text-[color:var(--color-text-secondary)]">{creatorData.handle}</p>
                <p className="text-[color:var(--color-text-tertiary)] leading-relaxed">{creatorData.bio}</p>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3 flex-wrap">
              {creatorData.links.map(link => (
                <a
                  key={link.platform}
                  href={link.url}
                  className="btn-secondary text-sm"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Followers', value: creatorData.followers.toLocaleString() },
              { label: 'Coin Price', value: '$' + creatorData.coinPrice.toLocaleString() },
              { label: 'Market Cap', value: '$' + (creatorData.marketCap / 1000000).toFixed(1) + 'M' },
              { label: 'Coin Holders', value: creatorData.holders.toLocaleString() },
            ].map((stat, idx) => (
              <div key={idx} className="card-base p-6 space-y-2">
                <div className="text-sm text-[color:var(--color-text-tertiary)]">{stat.label}</div>
                <div className="text-2xl font-bold text-gradient">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Info sections */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-base p-8 space-y-6">
              <h3 className="text-xl font-bold">About This Creator</h3>
              <div className="space-y-4 text-[color:var(--color-text-secondary)]">
                <p>
                  Sophia is a leading voice in AI technology education, producing high-quality content that makes complex topics accessible.
                </p>
                <p>
                  With over 125K followers across platforms, she's built a strong community of AI enthusiasts and professionals.
                </p>
              </div>
            </div>

            <div className="card-base p-8 space-y-6">
              <h3 className="text-xl font-bold">Token Information</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-[color:var(--color-text-tertiary)]">24h Volume</span>
                  <span className="font-semibold">${(creatorData.volume24h / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[color:var(--color-text-tertiary)]">Market Cap</span>
                  <span className="font-semibold">${(creatorData.marketCap / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[color:var(--color-text-tertiary)]">Total Holders</span>
                  <span className="font-semibold">{creatorData.holders.toLocaleString()}</span>
                </div>
              </div>

              <button className="btn-primary w-full">
                Buy Creator Token
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
