'use client'

import { useState } from 'react'
import { useWallet } from '@/lib/wallet-context'

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { balance } = useWallet()

  if (!isOpen) return null

  const walletOptions = [
    { name: 'MetaMask', icon: '🦊' },
    { name: 'WalletConnect', icon: '🌐' },
    { name: 'Coinbase Wallet', icon: '💎' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative card-base max-w-md w-full mx-4 p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Connect Wallet</h2>
          <button
            onClick={onClose}
            style={{ color: 'var(--color-text-secondary)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
          >
            ✕
          </button>
        </div>

        {/* Balance display */}
        {balance > 0 && (
          <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--color-surface-light)' }}>
            <div className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>Wallet Balance</div>
            <div className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>
              {balance.toFixed(4)} ETH
            </div>
          </div>
        )}

        {/* Wallet options */}
        <div className="space-y-3">
          {walletOptions.map((wallet) => (
            <button
              key={wallet.name}
              onClick={onClose}
              className="card-base card-hover w-full p-4 flex items-center gap-4 transition-all"
            >
              <span className="text-3xl">{wallet.icon}</span>
              <span className="font-semibold">{wallet.name}</span>
              <svg className="ml-auto w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-text-tertiary)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>

        <p className="text-xs text-center" style={{ color: 'var(--color-text-tertiary)' }}>
          By connecting, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
