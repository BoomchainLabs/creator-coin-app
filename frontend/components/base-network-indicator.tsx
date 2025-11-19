'use client'

import { useWeb3 } from '@/lib/web3-context'
import { Badge } from '@/components/ui/badge'

export function BaseNetworkIndicator() {
  const { chain, isConnected } = useWeb3()

  if (!isConnected) {
    return null
  }

  const isCorrectNetwork = chain?.id === 8453
  
  return (
    <Badge
      variant={isCorrectNetwork ? 'default' : 'destructive'}
      className="gap-2"
    >
      <div className="w-2 h-2 rounded-full bg-current" />
      {chain?.name || 'Unknown Network'}
    </Badge>
  )
}
