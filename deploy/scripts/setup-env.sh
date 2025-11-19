#!/bin/bash

set -e

echo "🔧 Creator Coin App - Environment Setup"
echo "========================================"

# Create .env file if it doesn't exist
ENV_FILE=".env.prod"

echo "Please enter the following information:"
echo ""

read -p "Enter your domain (e.g., creatorcoins.io): " DOMAIN
read -p "Enter Neon Database URL: " DATABASE_URL
read -p "Enter Postgres URL: " POSTGRES_URL
read -p "Enter QuikNode RPC URL: " QUIKNODE_RPC_URL
read -sp "Enter your private key (will not be echoed): " PRIVATE_KEY
echo ""
read -p "Enter backend API URL (e.g., https://api.$DOMAIN): " API_URL
read -p "Enter frontend URL (e.g., https://$DOMAIN): " FRONTEND_URL

# Create .env file
cat > "$ENV_FILE" << EOF
# Creator Coin App - Production Environment
DOMAIN=$DOMAIN
DATABASE_URL=$DATABASE_URL
POSTGRES_URL=$POSTGRES_URL
QUIKNODE_RPC_URL=$QUIKNODE_RPC_URL
PRIVATE_KEY=$PRIVATE_KEY
API_URL=$API_URL
FRONTEND_URL=$FRONTEND_URL
NODE_ENV=production
EOF

chmod 600 "$ENV_FILE"

echo ""
echo "✅ Environment file created: $ENV_FILE"
echo ""
echo "Next steps:"
echo "1. Review the .env.prod file"
echo "2. Update Caddyfile with your domain"
echo "3. Run: source .env.prod && bash deploy/scripts/deploy-prod.sh"
