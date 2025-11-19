# Deployment Guide

## Overview

This guide covers deploying the Creator Coin App using Docker, Docker Compose, or Kubernetes.

## Prerequisites

- Docker & Docker Compose (for containerized deployment)
- Kubernetes cluster (for K8s deployment)
- Domain name with DNS configured
- SSH access to deployment server (for manual deployment)

## Quick Start with Docker Compose

### Development

\`\`\`bash
cd ..
docker-compose up
\`\`\`

### Production

\`\`\`bash
# Update Caddyfile with your domain
vi Caddyfile

# Deploy
docker-compose -f docker-compose.prod.yml up -d

# Check status
docker-compose -f docker-compose.prod.yml ps
\`\`\`

## Docker Compose Configuration

The `docker-compose.prod.yml` includes:
- **Backend**: Express API running on port 3001
- **Frontend**: Next.js app running on port 3000
- **Caddy**: Reverse proxy and SSL certificate management
- **Data volumes**: Persistent database storage

### Environment Variables

Update in `docker-compose.prod.yml`:
- `API_URL`: Backend API URL (e.g., https://api.yourdomain.com)
- `FRONTEND_URL`: Frontend URL (e.g., https://yourdomain.com)
- `NEXT_PUBLIC_API_URL`: Frontend environment variable

## Deployment Scripts

### Build and Push Images

\`\`\`bash
./scripts/build-and-push.sh docker.io/yourusername v1.0.0
\`\`\`

### Deploy with Docker Compose

\`\`\`bash
./scripts/deploy-docker.sh
\`\`\`

## Kubernetes Deployment

### Prerequisites

- kubectl configured
- Container images pushed to registry
- PersistentVolume provisioner available

### Deploy to Kubernetes

\`\`\`bash
./scripts/deploy-k8s.sh docker-desktop
\`\`\`

### Verify Deployment

\`\`\`bash
kubectl get deployments -n creator-coin
kubectl get services -n creator-coin
kubectl logs -n creator-coin -l app=backend
\`\`\`

### Scale Services

\`\`\`bash
kubectl scale deployment backend --replicas=3 -n creator-coin
\`\`\`

## SSL/TLS Configuration

### Caddy Auto SSL

Caddy automatically handles SSL certificates via Let's Encrypt. Ensure:
1. Domain DNS points to server IP
2. Ports 80 and 443 are open
3. Caddyfile contains correct domain

### Manual Certificate

If using manual certificates:

\`\`\`caddyfile
yourdomain.com {
  tls /etc/caddy/certs/cert.pem /etc/caddy/certs/key.pem
  reverse_proxy frontend:3000
}
\`\`\`

## Monitoring

### Docker Compose

\`\`\`bash
# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Health check
curl http://localhost:3001/api/health
\`\`\`

### Kubernetes

\`\`\`bash
# View pod status
kubectl get pods -n creator-coin

# Check resource usage
kubectl top pods -n creator-coin

# View events
kubectl get events -n creator-coin
\`\`\`

## Troubleshooting

### Backend won't start
\`\`\`bash
docker-compose logs backend
# Check DATABASE_URL environment variable
# Ensure port 3001 is available
\`\`\`

### Frontend can't connect to API
\`\`\`bash
# Check NEXT_PUBLIC_API_URL
# Verify backend is running
# Check CORS configuration
\`\`\`

### Database issues
\`\`\`bash
# Reset database
rm creator-coins.db
docker-compose restart backend
\`\`\`

## Backup and Recovery

### Backup Database

\`\`\`bash
docker cp creator-coin-backend-1:/data/creator-coins.db ./backup/creator-coins.db
\`\`\`

### Restore Database

\`\`\`bash
docker cp ./backup/creator-coins.db creator-coin-backend-1:/data/creator-coins.db
docker-compose restart backend
\`\`\`

## Security Best Practices

1. Use environment variables for secrets
2. Enable HTTPS/TLS
3. Implement rate limiting
4. Keep dependencies updated
5. Use least privilege for container users
6. Enable audit logging
7. Regular security scanning

## Performance Optimization

1. Enable caching headers
2. Use CDN for static assets
3. Implement database indexing
4. Use horizontal scaling with K8s
5. Monitor and optimize slow queries
6. Enable GZIP compression
\`\`\`
