'use client'

import React, { createContext, useContext } from 'react'
import { useAccount, useBalance, useNetwork, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'

interface Web3ContextType {
  address: string | undefined
  isConnected: boolean
  balance: { value: bigint; decimals: number; symbol: string; formatted: string } | undefined
  chain: { id: number; name: string } | undefined
  connect: () => void
  disconnect: () => void
  isLoading: boolean
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined)

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })
  const { chain } = useNetwork()
  const { connect, isPending: isConnecting } = useConnect()
  const { disconnect, isPending: isDisconnecting } = useDisconnect()

  const handleConnect = () => {
    connect({ connector: injected() })
  }

  const contextValue: Web3ContextType = {
    address,
    isConnected,
    balance,
    chain: chain ? { id: chain.id, name: chain.name } : undefined,
    connect: handleConnect,
    disconnect,
    isLoading: isConnecting || isDisconnecting,
  }

  return (
    <Web3Context.Provider value={contextValue}>
      {children}
    </Web3Context.Provider>
  )
}

export function useWeb3() {
  const context = useContext(Web3Context)
  if (!context) {
    throw new Error('useWeb3 must be used within Web3Provider')
  }
  return context
}
