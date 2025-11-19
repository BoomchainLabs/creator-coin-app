'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface WalletContextType {
  isConnected: boolean
  address: string | null
  balance: number
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState(0)

  // Simulate wallet connection (in production, use ethers.js or wagmi)
  const connect = async () => {
    // Mock connection - replace with real Web3 integration
    const mockAddress = '0x' + Math.random().toString(16).slice(2, 42)
    const mockBalance = Math.random() * 100

    setIsConnected(true)
    setAddress(mockAddress)
    setBalance(mockBalance)

    // Store in localStorage
    localStorage.setItem('walletConnected', JSON.stringify({
      address: mockAddress,
      balance: mockBalance,
      timestamp: Date.now()
    }))
  }

  const disconnect = () => {
    setIsConnected(false)
    setAddress(null)
    setBalance(0)
    localStorage.removeItem('walletConnected')
  }

  // Check for existing connection on mount
  useEffect(() => {
    const stored = localStorage.getItem('walletConnected')
    if (stored) {
      try {
        const { address, balance } = JSON.parse(stored)
        setIsConnected(true)
        setAddress(address)
        setBalance(balance)
      } catch (error) {
        console.error('Failed to restore wallet connection:', error)
      }
    }
  }, [])

  return (
    <WalletContext.Provider value={{ isConnected, address, balance, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider')
  }
  return context
}
