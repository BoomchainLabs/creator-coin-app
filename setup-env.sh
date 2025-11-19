#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}Creator Coin App - Environment Setup${NC}\n"

# Create backend .env
echo -e "${YELLOW}Setting up backend/.env...${NC}"
cat > backend/.env << 'EOF'
PORT=3001
NODE_ENV=production
DATABASE_URL=
API_URL=
FRONTEND_URL=
BASE_RPC_URL=https://sparkling-wispy-owl.base-mainnet.quiknode.pro/ea71080fa444effed8eec4c8424a2c636b89c554/
BASE_CHAIN_ID=8453
FACTORY_CONTRACT_ADDRESS=
EOF
echo -e "${GREEN}✓ Created backend/.env${NC}"

# Create frontend .env.local
echo -e "${YELLOW}Setting up frontend/.env.local...${NC}"
cat > frontend/.env.local << 'EOF'
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_APP_NAME=Creator Coin
NEXT_PUBLIC_RPC_URL=https://sparkling-wispy-owl.base-mainnet.quiknode.pro/ea71080fa444effed8eec4c8424a2c636b89c554/
EOF
echo -e "${GREEN}✓ Created frontend/.env.local${NC}"

# Create contracts .env
echo -e "${YELLOW}Setting up contracts/.env...${NC}"
cat > contracts/.env << 'EOF'
BASE_RPC_URL=https://sparkling-wispy-owl.base-mainnet.quiknode.pro/ea71080fa444effed8eec4c8424a2c636b89c554/
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
PRIVATE_KEY=
DEPLOYER_ADDRESS=
INITIAL_SUPPLY=1000000
TOKEN_PRICE=1000000000000000
BASESCAN_API_KEY=
VERIFIER_URL=https://api.basescan.org/api
EOF
echo -e "${GREEN}✓ Created contracts/.env${NC}"

echo -e "\n${BLUE}Next steps:${NC}"
echo "1. Edit backend/.env and add DATABASE_URL"
echo "2. Edit frontend/.env.local and add NEXT_PUBLIC_API_URL"
echo "3. Edit contracts/.env and add PRIVATE_KEY, DEPLOYER_ADDRESS, BASESCAN_API_KEY"
echo "4. Run: npm run dev"
