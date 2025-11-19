#!/bin/bash

# Deploy using Docker Compose
cd "$(dirname "$0")/.."

echo "Pulling latest images..."
docker-compose -f docker-compose.prod.yml pull

echo "Starting services..."
docker-compose -f docker-compose.prod.yml up -d

echo "Deployment complete!"
docker-compose -f docker-compose.prod.yml ps
