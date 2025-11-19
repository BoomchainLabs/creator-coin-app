#!/bin/bash

# Deploy to Kubernetes cluster
# Usage: ./deploy-k8s.sh <cluster-context>

CONTEXT=${1:-docker-desktop}

echo "Switching to context: $CONTEXT"
kubectl config use-context $CONTEXT

echo "Creating namespace and applying configs..."
kubectl apply -f kubernetes/deployment.yaml

echo "Waiting for deployments to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/backend -n creator-coin
kubectl wait --for=condition=available --timeout=300s deployment/frontend -n creator-coin

echo "Getting service endpoints..."
kubectl get svc -n creator-coin

echo "Kubernetes deployment complete!"
