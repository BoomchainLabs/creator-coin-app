'use client'

import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { useState } from 'react'
import { useWallet } from '@/lib/wallet-context'

export default function TradePage() {
  const { isConnected, address } = useWallet()
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy')
  const [selectedCoin, setSelectedCoin] = useState('sophia_ai')
  const [amount, setAmount] = useState('')
  const [orderHistory] = useState([
    { id: 1, type: 'buy', coin: 'Sophia AI', amount: 5, price: 1850, total: 9250, date: '2025-01-15' },
    { id: 2, type: 'sell', coin: 'Music Legend', amount: 1, price: 3200, total: 3200, date: '2025-01-14' },
    { id: 3, type: 'buy', coin: 'Game Pro', amount: 3, price: 2800, total: 8400, date: '2025-01-13' },
  ])

  const coins = [
    { id: 'sophia_ai', name: 'Sophia AI', price: 1850 },
    { id: 'crypto_dev', name: 'Crypto Dev', price: 2100 },
    { id: 'music_legend', name: 'Music Legend', price: 3200 },
    { id: 'game_pro', name: 'Game Pro', price: 2800 },
  ]

  const selectedCoinData = coins.find(c => c.id === selectedCoin)
  const totalCost = amount ? (parseFloat(amount) * (selectedCoinData?.price || 0)) : 0

  if (!isConnected) {
    return (
      <main className="w-full">
        <Navigation />
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center space-y-6">
            <h1 className="text-4xl font-bold">Connect Your Wallet</h1>
            <p className="text-xl" style={{ color: 'var(--color-text-secondary)' }}>
              You need to connect a wallet to start trading creator coins
            </p>
            <div className="inline-block">
              <button className="btn-primary">
                Connect Wallet Now
              </button>
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
          <h1 className="text-4xl font-bold">Trade Creator Coins</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Trading panel */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card-base p-8 space-y-6">
                {/* Trade type tabs */}
                <div className="flex gap-4 pb-4" style={{ borderBottomColor: 'var(--color-border)', borderBottomWidth: '1px' }}>
                  {['buy', 'sell'].map(type => (
                    <button
                      key={type}
                      onClick={() => setTradeType(type as 'buy' | 'sell')}
                      className="pb-4 font-semibold transition-colors"
                      style={{ color: tradeType === type ? (type === 'buy' ? 'var(--color-accent)' : 'var(--color-primary)') : 'var(--color-text-tertiary)' }}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Coin selection */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                    Select Creator Coin
                  </label>
                  <select
                    value={selectedCoin}
                    onChange={(e) => setSelectedCoin(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none"
                    style={{
                      backgroundColor: 'var(--color-surface-light)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text-primary)',
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
                  >
                    {coins.map(coin => (
                      <option key={coin.id} value={coin.id}>
                        {coin.name} - ${coin.price}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Amount input */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                    Amount
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none"
                      style={{
                        backgroundColor: 'var(--color-surface-light)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text-primary)',
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                      onBlur={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
                      MAX
                    </button>
                  </div>
                </div>

                {/* Order summary */}
                <div className="rounded-lg p-4 space-y-3" style={{ backgroundColor: 'var(--color-surface-light)' }}>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--color-text-tertiary)' }}>Unit Price</span>
                    <span className="font-semibold">${selectedCoinData?.price || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--color-text-tertiary)' }}>Fee (2%)</span>
                    <span className="font-semibold">${(totalCost * 0.02).toFixed(2)}</span>
                  </div>
                  <div className="pt-3 flex justify-between" style={{ borderTopColor: 'var(--color-border)', borderTopWidth: '1px' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Total</span>
                    <span className="text-xl font-bold">${(totalCost * 1.02).toFixed(2)}</span>
                  </div>
                </div>

                {/* Action button */}
                <button className="w-full py-3 rounded-lg font-semibold text-white transition-all"
                style={{
                  backgroundColor: tradeType === 'buy' ? 'var(--color-accent)' : '#dc2626',
                  opacity: !amount || parseFloat(amount) <= 0 ? 0.5 : 1,
                }}
                disabled={!amount || parseFloat(amount) <= 0}
                >
                  {tradeType === 'buy' ? 'Buy' : 'Sell'} Now
                </button>
              </div>
            </div>

            {/* Order history */}
            <div className="card-base p-6 space-y-4 h-fit">
              <h3 className="text-lg font-semibold">Recent Orders</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {orderHistory.map(order => (
                  <div key={order.id} className="rounded-lg p-3 space-y-2" style={{ backgroundColor: 'var(--color-surface-light)' }}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-sm">{order.coin}</div>
                        <div className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>{order.date}</div>
                      </div>
                      <div className="px-2 py-1 rounded text-xs font-semibold"
                        style={{
                          backgroundColor: order.type === 'buy' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(220, 38, 38, 0.2)',
                          color: order.type === 'buy' ? 'var(--color-accent)' : '#f87171',
                        }}
                      >
                        {order.type.toUpperCase()}
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: 'var(--color-text-tertiary)' }}>{order.amount} × ${order.price}</span>
                      <span className="font-semibold">${order.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
