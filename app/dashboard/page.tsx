'use client'

import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import PortfolioCard from '@/components/portfolio-card'
import ChartComponent from '@/components/chart-component'
import Leaderboard from '@/components/leaderboard'
import { useWallet } from '@/lib/wallet-context'
import { useState } from 'react'
import Link from 'next/link'

export default function DashboardPage() {
  const { isConnected } = useWallet()
  const [portfolio] = useState([
    {
      id: 1,
      creator: '@sophia_ai',
      name: 'Sophia AI',
      amount: 5,
      avgPrice: 1650,
      currentPrice: 1850,
      totalValue: 9250
    },
    {
      id: 2,
      creator: '@music_legend',
      name: 'Music Legend',
      amount: 2,
      avgPrice: 3000,
      currentPrice: 3200,
      totalValue: 6400
    },
    {
      id: 3,
      creator: '@game_pro',
      name: 'Game Pro',
      amount: 3,
      avgPrice: 2500,
      currentPrice: 2800,
      totalValue: 8400
    },
  ])

  const totalValue = portfolio.reduce((sum, item) => sum + item.totalValue, 0)
  const totalGain = portfolio.reduce((sum, item) => sum + ((item.currentPrice - item.avgPrice) * item.amount), 0)
  const gainPercentage = ((totalGain / (totalValue - totalGain)) * 100).toFixed(2)

  if (!isConnected) {
    return (
      <main className="w-full">
        <Navigation />
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center space-y-6">
            <h1 className="text-4xl font-bold">Create Your Portfolio</h1>
            <p className="text-xl text-[color:var(--color-text-secondary)]">
              Connect your wallet to start building your creator coin portfolio
            </p>
            <div className="inline-block">
              <Link href="/" className="btn-primary">
                Connect Wallet
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="w-full">
      <Navigation />

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Portfolio</h1>
            <p className="text-[color:var(--color-text-secondary)]">Manage your creator coin investments</p>
          </div>

          {/* Portfolio summary */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="card-base p-6 space-y-2">
              <div className="text-sm text-[color:var(--color-text-tertiary)]">Total Value</div>
              <div className="text-3xl font-bold">${totalValue.toLocaleString()}</div>
              <div className="text-sm text-[color:var(--color-text-secondary)]">Across {portfolio.length} coins</div>
            </div>
            <div className="card-base p-6 space-y-2">
              <div className="text-sm text-[color:var(--color-text-tertiary)]">Total Gain</div>
              <div className={`text-3xl font-bold ${totalGain > 0 ? 'text-[color:var(--color-accent)]' : 'text-red-500'}`}>
                ${totalGain.toLocaleString()}
              </div>
              <div className="text-sm text-[color:var(--color-text-secondary)]">{gainPercentage}% return</div>
            </div>
            <div className="card-base p-6 space-y-2">
              <div className="text-sm text-[color:var(--color-text-tertiary)]">Portfolio Stats</div>
              <div className="flex gap-4 text-sm">
                <div>
                  <div className="text-[color:var(--color-accent)] font-bold">{portfolio.length}</div>
                  <div className="text-[color:var(--color-text-tertiary)]">Holdings</div>
                </div>
                <div>
                  <div className="text-[color:var(--color-primary)] font-bold">
                    {portfolio.reduce((sum, item) => sum + item.amount, 0)}
                  </div>
                  <div className="text-[color:var(--color-text-tertiary)]">Coins</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Chart */}
              <ChartComponent title="Portfolio Value" />

              {/* Holdings */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Your Holdings</h2>
                <div className="space-y-4">
                  {portfolio.map(coin => (
                    <PortfolioCard key={coin.id} coin={coin} />
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <Leaderboard />
              <Link href="/settings" className="block">
                <div className="card-base card-hover p-6 text-center space-y-2">
                  <div className="text-lg font-semibold">Manage Account</div>
                  <div className="text-sm text-[color:var(--color-text-tertiary)]">Settings & preferences</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
