import { createConfig, http } from 'wagmi'
import { base } from 'wagmi/chains'

export const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(process.env.NEXT_PUBLIC_RPC_URL || 'https://sparkling-wispy-owl.base-mainnet.quiknode.pro/ea71080fa444effed8eec4c8424a2c636b89c554/'),
  },
})
