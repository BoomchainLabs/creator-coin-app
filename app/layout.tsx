import { Inter } from 'next/font/google'
import './globals.css'
import { WalletProvider } from '@/lib/wallet-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Creator Coin - Trade Creator Assets',
  description: 'Buy, sell, and trade creator coins in a decentralized marketplace',
  icons: {
    icon: '/favicon.ico',
  },
    generator: 'v0.app'
}

export const viewport = {
  themeColor: '#3B82F6',
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`} style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text-primary)' }}>
        <WalletProvider>
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
        </WalletProvider>
      </body>
    </html>
  )
}
