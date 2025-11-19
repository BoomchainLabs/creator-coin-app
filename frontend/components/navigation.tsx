'use client'

import Link from 'next/link'
import { useWeb3 } from '@/lib/web3-context'
import { WalletButton } from './wallet-button'
import { BaseNetworkIndicator } from './base-network-indicator'

export function Navigation() {
  const { isConnected } = useWeb3()

  return (
    <nav className="border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500" />
          Creator Coins
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/marketplace"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Marketplace
          </Link>
          {isConnected && (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/trade"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Trade
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isConnected && <BaseNetworkIndicator />}
          <WalletButton />
        </div>
      </div>
    </nav>
  )
}
