#!/bin/bash

set -e

echo "🚀 Creator Coin App - Production Deployment"
echo "=========================================="

# Check required environment variables
required_vars=("DATABASE_URL" "POSTGRES_URL" "QUIKNODE_RPC_URL" "PRIVATE_KEY" "API_URL" "FRONTEND_URL" "DOMAIN")
for var in "${required_vars[@]}"; do
  if [ -z "${!var}" ]; then
    echo "❌ Error: $var is not set"
    exit 1
  fi
done

# Export environment variables for docker-compose
export DATABASE_URL
export POSTGRES_URL
export QUIKNODE_RPC_URL
export PRIVATE_KEY
export API_URL
export FRONTEND_URL
export DOMAIN

echo "✅ All required environment variables are set"
echo "🔨 Building images..."

cd "$(dirname "$0")/.."

# Build and push images
docker-compose -f docker-compose.prod.yml build

echo "📦 Starting services..."

# Start services
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be healthy..."
sleep 10

# Check health
if curl -f http://localhost:3001/api/health > /dev/null 2>&1; then
  echo "✅ Backend is healthy"
else
  echo "❌ Backend health check failed"
  docker-compose logs backend
  exit 1
fi

echo ""
echo "🎉 Deployment successful!"
echo "=========================================="
echo "Frontend: https://${DOMAIN}"
echo "API: https://api.${DOMAIN}"
echo "=========================================="
