const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export const apiClient = {
  blockchain: {
    getBlock: async () => {
      const res = await fetch(`${API_BASE_URL}/api/blockchain/block`)
      return res.json()
    },
    getBalance: async (address: string) => {
      const res = await fetch(`${API_BASE_URL}/api/blockchain/balance/${address}`)
      return res.json()
    },
    getTokenBalance: async (tokenAddress: string, userAddress: string) => {
      const res = await fetch(
        `${API_BASE_URL}/api/blockchain/token-balance/${tokenAddress}/${userAddress}`
      )
      return res.json()
    },
  },

  coins: {
    getAll: async () => {
      const res = await fetch(`${API_BASE_URL}/api/coins`)
      return res.json()
    },
    getById: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/api/coins/${id}`)
      return res.json()
    },
    getHoldings: async (coinId: string, walletAddress: string) => {
      const res = await fetch(
        `${API_BASE_URL}/api/coins/${coinId}/holdings/${walletAddress}`
      )
      return res.json()
    },
  },

  portfolio: {
    getByAddress: async (walletAddress: string) => {
      const res = await fetch(`${API_BASE_URL}/api/portfolio/${walletAddress}`)
      return res.json()
    },
  },
}
