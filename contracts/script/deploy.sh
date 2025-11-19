#!/bin/bash

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '#' | xargs)
fi

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Creator Coin Deployment ===${NC}"
echo "Network: Base Mainnet"
echo "RPC: $BASE_RPC_URL"

# Build contracts
echo -e "${BLUE}Building contracts...${NC}"
forge build
if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed${NC}"
    exit 1
fi

# Deploy Factory
echo -e "${BLUE}Deploying CreatorCoinFactory...${NC}"
forge create src/CreatorCoinFactory.sol:CreatorCoinFactory \
    --rpc-url "$BASE_RPC_URL" \
    --private-key "$PRIVATE_KEY" \
    --broadcast

if [ $? -ne 0 ]; then
    echo -e "${RED}Deployment failed${NC}"
    exit 1
fi

echo -e "${GREEN}Deployment successful!${NC}"
