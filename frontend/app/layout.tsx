import { Web3Provider } from '@/lib/web3-context'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from '@/lib/web3-config'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={wagmiConfig}>
          <Web3Provider>
            {children}
          </Web3Provider>
        </WagmiProvider>
      </body>
    </html>
  )
}
