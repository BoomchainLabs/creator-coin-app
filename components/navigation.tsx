'use client'

import Link from 'next/link'
import { useState } from 'react'
import WalletButton from './wallet-button'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-sm" style={{ backgroundColor: 'var(--color-background)', borderBottomColor: 'var(--color-border)' }}>
      <div className="border-b max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-shadow" style={{ backgroundColor: 'var(--color-primary)' }}>
              <span className="text-white font-bold text-lg">CC</span>
            </div>
            <span className="text-xl font-bold text-gradient hidden sm:inline">Creator Coin</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/marketplace" className="transition-colors" style={{ color: 'var(--color-text-secondary)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
              Marketplace
            </Link>
            <Link href="/dashboard" className="transition-colors" style={{ color: 'var(--color-text-secondary)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
              Dashboard
            </Link>
            <Link href="/" className="transition-colors" style={{ color: 'var(--color-text-secondary)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
              About
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <button className="btn-secondary hidden sm:inline-block text-sm">
              Sign In
            </button>
            <WalletButton />
          </div>
        </div>
      </div>
    </nav>
  )
}
