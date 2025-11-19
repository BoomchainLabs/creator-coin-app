'use client'

import { useWallet } from '@/lib/wallet-context'
import { useState } from 'react'

export default function WalletButton() {
  const { isConnected, address, connect, disconnect } = useWallet()
  const [isLoading, setIsLoading] = useState(false)

  const handleConnect = async () => {
    setIsLoading(true)
    try {
      await connect()
    } finally {
      setIsLoading(false)
    }
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="hidden sm:block px-4 py-2 bg-[color:var(--color-surface-light)] rounded-lg text-sm">
          <span className="text-[color:var(--color-text-secondary)]">Connected: </span>
          <span className="font-mono font-semibold">{address.slice(0, 6)}...{address.slice(-4)}</span>
        </div>
        <button
          onClick={disconnect}
          className="btn-secondary text-sm"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isLoading}
      className="btn-primary text-sm disabled:opacity-50"
    >
      {isLoading ? 'Connecting...' : 'Connect Wallet'}
    </button>
  )
}
