'use client'

import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[color:var(--color-primary)] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[color:var(--color-accent)] opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-[color:var(--color-surface-light)] border border-[color:var(--color-primary)] rounded-full">
                <span className="text-[color:var(--color-primary)] text-sm font-semibold">Launch your creator economy</span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
                Trade Creator
                <span className="text-gradient block">Assets</span>
              </h1>
              <p className="text-xl text-[color:var(--color-text-secondary)] leading-relaxed">
                Buy, sell, and trade digital assets from your favorite creators. Join the decentralized creator economy.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/marketplace" className="btn-primary text-center">
                Start Trading
              </Link>
              <button className="btn-secondary text-center">
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[color:var(--color-border)]">
              <div>
                <div className="text-2xl font-bold text-gradient">$2.4M</div>
                <div className="text-sm text-[color:var(--color-text-tertiary)]">Total Volume</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gradient">15K+</div>
                <div className="text-sm text-[color:var(--color-text-tertiary)]">Active Traders</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gradient">1200+</div>
                <div className="text-sm text-[color:var(--color-text-tertiary)]">Creators</div>
              </div>
            </div>
          </div>

          {/* Right side - Feature visual */}
          <div className="hidden md:block">
            <div className="card-base p-8 space-y-6">
              <div className="space-y-2">
                <div className="text-sm text-[color:var(--color-text-tertiary)]">Top Creator</div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full"></div>
                  <div>
                    <div className="font-semibold">@alexkray</div>
                    <div className="text-sm text-[color:var(--color-text-tertiary)]">AI & Tech Creator</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[color:var(--color-text-secondary)]">Token Price</span>
                  <span className="font-semibold text-[color:var(--color-accent)]">$2,450</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[color:var(--color-text-secondary)]">24h Change</span>
                  <span className="font-semibold text-[color:var(--color-accent)]">+12.5%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[color:var(--color-text-secondary)]">Market Cap</span>
                  <span className="font-semibold">$122.5M</span>
                </div>
              </div>

              <button className="btn-primary w-full">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
