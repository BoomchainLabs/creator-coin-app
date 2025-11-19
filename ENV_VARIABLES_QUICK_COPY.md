# Environment Variables - Quick Copy & Paste Guide

## 📋 Copy These Exactly As-Is (No Changes Needed)

### QuikNode RPC (Already Provided)
\`\`\`
BASE_RPC_URL=https://sparkling-wispy-owl.base-mainnet.quiknode.pro/ea71080fa444effed8eec4c8424a2c636b89c554/
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
BASE_CHAIN_ID=8453
\`\`\`

### Local Development Defaults
\`\`\`
PORT=3001
NODE_ENV=development
NEXT_PUBLIC_APP_NAME=Creator Coin
INITIAL_SUPPLY=1000000
TOKEN_PRICE=1000000000000000
\`\`\`

---

## 🔑 Variables You Need to Customize

### 1. Database URL (Get from Neon)
\`\`\`
DATABASE_URL=postgresql://user:password@ep-xxx.neon.tech/dbname
\`\`\`
**How to get it:**
- Go to Neon Console
- Click your project
- Copy connection string from "Quick Connect"
- Paste it in `backend/.env` as `DATABASE_URL`

### 2. Private Key (Get from MetaMask)
\`\`\`
PRIVATE_KEY=0x...your_private_key_here
DEPLOYER_ADDRESS=0x...your_wallet_address
\`\`\`
**How to get it:**
- Open MetaMask
- Click your account name → Settings → Security & Privacy
- Scroll to "Show Private Key" → confirm password
- Copy the hex string (starts with 0x)
- Paste in `contracts/.env`

**⚠️ NEVER share your private key!**

### 3. BaseScan API Key (Get from BaseScan)
\`\`\`
BASESCAN_API_KEY=your_basescan_api_key_here
\`\`\`
**How to get it:**
- Go to https://basescan.org/apis
- Sign up / log in
- Create new API key
- Copy and paste in `contracts/.env`

### 4. URLs After Deployment
\`\`\`
# After deploying backend to Vercel:
API_URL=https://your-backend-name.vercel.app
NEXT_PUBLIC_API_URL=https://your-backend-name.vercel.app
FRONTEND_URL=https://your-frontend-name.vercel.app

# After deploying factory contract:
FACTORY_CONTRACT_ADDRESS=0x...contract_address_deployed
\`\`\`

---

## 📁 File Setup

### `backend/.env` (Copy & Paste)
\`\`\`env
PORT=3001
NODE_ENV=production
DATABASE_URL=postgresql://user:password@ep-xxx.neon.tech/dbname
API_URL=https://your-backend-name.vercel.app
FRONTEND_URL=https://your-frontend-name.vercel.app
BASE_RPC_URL=https://sparkling-wispy-owl.base-mainnet.quiknode.pro/ea71080fa444effed8eec4c8424a2c636b89c554/
BASE_CHAIN_ID=8453
FACTORY_CONTRACT_ADDRESS=0x...contract_address_here
\`\`\`

### `frontend/.env.local` (Copy & Paste)
\`\`\`env
NEXT_PUBLIC_API_URL=https://your-backend-name.vercel.app
NEXT_PUBLIC_APP_NAME=Creator Coin
NEXT_PUBLIC_RPC_URL=https://sparkling-wispy-owl.base-mainnet.quiknode.pro/ea71080fa444effed8eec4c8424a2c636b89c554/
\`\`\`

### `contracts/.env` (Copy & Paste)
\`\`\`env
BASE_RPC_URL=https://sparkling-wispy-owl.base-mainnet.quiknode.pro/ea71080fa444effed8eec4c8424a2c636b89c554/
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
PRIVATE_KEY=0x...your_private_key
DEPLOYER_ADDRESS=0x...your_wallet_address
INITIAL_SUPPLY=1000000
TOKEN_PRICE=1000000000000000
BASESCAN_API_KEY=your_basescan_api_key
VERIFIER_URL=https://api.basescan.org/api
\`\`\`

---

## 🚀 Quick Setup Checklist

- [ ] Copy `BASE_RPC_URL` (already provided)
- [ ] Get `DATABASE_URL` from Neon
- [ ] Get `PRIVATE_KEY` from MetaMask
- [ ] Get `DEPLOYER_ADDRESS` from MetaMask
- [ ] Get `BASESCAN_API_KEY` from BaseScan
- [ ] Create `backend/.env` with database URL
- [ ] Create `frontend/.env.local`
- [ ] Create `contracts/.env` with private key
- [ ] Deploy contracts and get `FACTORY_CONTRACT_ADDRESS`
- [ ] Update all files with deployment URLs
