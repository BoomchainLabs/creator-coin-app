'use client'

import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { useState } from 'react'
import CoinCard from '@/components/coin-card'

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', 'trending', 'tech', 'music', 'art', 'sports']

  const coins = [
    {
      id: 1,
      creator: '@sophia_ai',
      name: 'Sophia AI',
      category: 'tech',
      price: 1850,
      change: 8.2,
      volume: 450000,
      marketCap: 92500000,
      holders: 1245,
      description: 'AI & Tech Content Creator'
    },
    {
      id: 2,
      creator: '@crypto_dev',
      name: 'Crypto Dev',
      category: 'tech',
      price: 2100,
      change: 15.3,
      volume: 720000,
      marketCap: 105000000,
      holders: 2340,
      description: 'Blockchain Developer & Educator'
    },
    {
      id: 3,
      creator: '@music_legend',
      name: 'Music Legend',
      category: 'music',
      price: 3200,
      change: 22.1,
      volume: 1200000,
      marketCap: 160000000,
      holders: 3100,
      description: 'Grammy-winning Music Producer'
    },
    {
      id: 4,
      creator: '@art_master',
      name: 'Art Master',
      category: 'art',
      price: 1560,
      change: 5.7,
      volume: 380000,
      marketCap: 78000000,
      holders: 892,
      description: 'Digital Artist & NFT Creator'
    },
    {
      id: 5,
      creator: '@fitness_guru',
      name: 'Fitness Guru',
      category: 'sports',
      price: 1200,
      change: 12.5,
      volume: 560000,
      marketCap: 60000000,
      holders: 1567,
      description: 'Fitness Coach & Wellness Expert'
    },
    {
      id: 6,
      creator: '@game_pro',
      name: 'Game Pro',
      category: 'tech',
      price: 2800,
      change: 18.9,
      volume: 890000,
      marketCap: 140000000,
      holders: 2900,
      description: 'Professional Esports Player'
    },
  ]

  const filteredCoins = coins.filter(coin => {
    const matchesSearch = coin.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         coin.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'trending' && coin.change > 10) ||
                           coin.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <main className="w-full">
      <Navigation />
      
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold">Marketplace</h1>
            <p className="text-xl" style={{ color: 'var(--color-text-secondary)' }}>
              Discover and trade creator coins from thousands of creators worldwide
            </p>
          </div>

          {/* Search and filters */}
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none"
                style={{
                  backgroundColor: 'var(--color-surface-light)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-primary)',
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
              />
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-text-tertiary)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedCategory === category
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Coins grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCoins.map(coin => (
              <CoinCard key={coin.id} coin={coin} />
            ))}
          </div>

          {filteredCoins.length === 0 && (
            <div className="text-center py-12">
              <p style={{ color: 'var(--color-text-secondary)' }}>No creators found matching your search</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
