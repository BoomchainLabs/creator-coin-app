#!/bin/bash

set -e

echo "🔄 Rolling back to previous deployment..."
echo ""

# Get previous deployment from Railway
if [ -z "$RAILWAY_TOKEN" ]; then
  echo "❌ RAILWAY_TOKEN not set"
  exit 1
fi

# Rollback backend
echo "⏮️ Rolling back backend..."
curl -X POST https://api.railway.app/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $RAILWAY_TOKEN" \
  -d '{
    "query": "mutation { deploymentRollback(input: {projectId: \"'$RAILWAY_PROJECT_ID'\"}) { deployment { id status } } }"
  }'

# Rollback frontend using Vercel
echo "⏮️ Rolling back frontend..."
vercel rollback --prod --confirm

echo "✅ Rollback complete"
