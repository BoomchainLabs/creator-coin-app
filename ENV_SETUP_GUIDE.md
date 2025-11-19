# Environment Variables Setup Guide

## Quick Summary

Your Creator Coin App requires environment variables across 3 components: Frontend, Backend, and Smart Contracts.

### Variables You Already Have (from Neon Integration)
✅ DATABASE_URL
✅ POSTGRES_URL
✅ POSTGRES_PRISMA_URL

### Variables You Need to Get

#### 1. Backend Environment Variables

**Create `backend/.env`:**

\`\`\`bash
PORT=3001
NODE_ENV=production
DATABASE_URL=<FROM_NEON_INTEGRATION>
API_URL=https://your-backend-domain.vercel.app
FRONTEND_URL=https://your-frontend-domain.vercel.app
BASE_RPC_URL=https://sparkling-wispy-owl.base-mainnet.quiknode.pro/ea71080fa444effed8eec4c8424a2c636b89c554/
BASE_CHAIN_ID=8453
FACTORY_CONTRACT_ADDRESS=0x... (deploy contracts first)
\`\`\`

#### 2. Frontend Environment Variables

**Create `frontend/.env.local`:**

\`\`\`bash
NEXT_PUBLIC_API_URL=https://your-backend-domain.vercel.app
NEXT_PUBLIC_APP_NAME=Creator Coin
NEXT_PUBLIC_RPC_URL=https://sparkling-wispy-owl.base-mainnet.quiknode.pro/ea71080fa444effed8eec4c8424a2c636b89c554/
\`\`\`

#### 3. Smart Contracts Variables

**Create `contracts/.env`:**

\`\`\`bash
BASE_RPC_URL=https://sparkling-wispy-owl.base-mainnet.quiknode.pro/ea71080fa444effed8eec4c8424a2c636b89c554/
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
PRIVATE_KEY=your_wallet_private_key (from MetaMask)
DEPLOYER_ADDRESS=your_wallet_address (from MetaMask)
INITIAL_SUPPLY=1000000
TOKEN_PRICE=1000000000000000
BASESCAN_API_KEY=your_basescan_api_key (from BaseScan)
\`\`\`

## How to Get Each Variable

### MetaMask Private Key & Address
1. Open MetaMask extension
2. Click account avatar → Settings
3. Security & Privacy → Show Private Key
4. Copy PRIVATE_KEY and DEPLOYER_ADDRESS

### BaseScan API Key
1. Go to https://basescan.org/apis
2. Sign up/Login
3. Create new API key
4. Copy the API key

### Vercel URLs (After First Deployment)
1. Deploy frontend to Vercel → Copy deployment URL
2. Deploy backend to Vercel → Copy deployment URL
3. Update both env files with these URLs

## Deployment Order

1. **Deploy Smart Contracts First**
   \`\`\bash
   cd contracts
   bash script/deploy.sh
   \`\`\`

2. **Get FACTORY_CONTRACT_ADDRESS** from deployment output

3. **Add to backend/.env** the FACTORY_CONTRACT_ADDRESS

4. **Deploy Backend** to Vercel

5. **Get backend URL** from Vercel

6. **Update frontend/.env.local** with backend URL

7. **Deploy Frontend** to Vercel

## Verification Checklist

- [ ] DATABASE_URL working (test connection)
- [ ] PRIVATE_KEY is valid (can deploy contracts)
- [ ] BASESCAN_API_KEY is valid
- [ ] All URLs are correct (http vs https)
- [ ] RPC URL is accessible
- [ ] Smart contracts deployed on Base mainnet
- [ ] FACTORY_CONTRACT_ADDRESS in backend env
- [ ] Vercel deployments successful
