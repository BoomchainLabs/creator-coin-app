#!/bin/bash

# Build and push Docker images to registry
# Usage: ./build-and-push.sh <registry-url> <tag>

REGISTRY=${1:-docker.io/yourusername}
TAG=${2:-latest}

echo "Building backend image..."
docker build -t $REGISTRY/creator-coin-backend:$TAG ../backend

echo "Building frontend image..."
docker build -t $REGISTRY/creator-coin-frontend:$TAG ../frontend

echo "Pushing backend image..."
docker push $REGISTRY/creator-coin-backend:$TAG

echo "Pushing frontend image..."
docker push $REGISTRY/creator-coin-frontend:$TAG

echo "Done! Images pushed to $REGISTRY with tag $TAG"
