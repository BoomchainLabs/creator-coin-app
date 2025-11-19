'use client'

import { useWeb3 } from '@/lib/web3-context'
import { Button } from '@/components/ui/button'
import { Wallet, LogOut } from 'lucide-react'

export function WalletButton() {
  const { address, isConnected, connect, disconnect, isLoading } = useWeb3()

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <div className="px-3 py-2 rounded-lg bg-background border border-border text-sm font-mono">
          {address.slice(0, 6)}...{address.slice(-4)}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => disconnect()}
          disabled={isLoading}
          className="gap-2"
        >
          <LogOut className="w-4 h-4" />
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <Button
      onClick={() => connect()}
      disabled={isLoading}
      className="gap-2"
    >
      <Wallet className="w-4 h-4" />
      {isLoading ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  )
}
