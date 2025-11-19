# Deployment Checklist

## Pre-Deployment

- [ ] All environment variables configured
- [ ] Database migrations applied
- [ ] Smart contracts compiled and tested
- [ ] Frontend environment variables set (.env.local)
- [ ] Backend environment variables set (.env)
- [ ] DNS records configured for custom domain
- [ ] SSL certificates ready (or auto-provisioned)

## GitHub Setup

- [ ] Repository forked/created
- [ ] GitHub Secrets configured:
  - [ ] RAILWAY_TOKEN
  - [ ] RAILWAY_PROJECT_ID
  - [ ] VERCEL_TOKEN
  - [ ] VERCEL_ORG_ID
  - [ ] VERCEL_PROJECT_ID
  - [ ] DATABASE_URL
  - [ ] POSTGRES_URL
  - [ ] QUIKNODE_RPC_URL
  - [ ] PRIVATE_KEY
  - [ ] FRONTEND_DOMAIN
  - [ ] API_DOMAIN

## Vercel Setup (Frontend)

- [ ] Create Vercel project
- [ ] Connect GitHub repository
- [ ] Configure environment variables
- [ ] Set custom domain
- [ ] Enable analytics

## Railway Setup (Backend)

- [ ] Create Railway project
- [ ] Connect GitHub repository
- [ ] Configure environment variables
- [ ] Set custom domain (API)
- [ ] Enable monitoring

## Neon Setup (Database)

- [ ] Create Neon project
- [ ] Create database
- [ ] Get connection string
- [ ] Add to GitHub Secrets

## Deployment

- [ ] Push to main branch
- [ ] Monitor GitHub Actions
- [ ] Wait for all checks to pass
- [ ] Verify deployment status

## Post-Deployment Testing

- [ ] Frontend loads without errors
- [ ] API responds to health check
- [ ] Wallet connection works
- [ ] Can view creator coins
- [ ] Can view marketplace
- [ ] Dashboard displays correctly
- [ ] Smart contracts accessible
- [ ] Database queries working

## Production Verification

- [ ] SSL certificate valid
- [ ] Custom domain resolves
- [ ] Performance acceptable
- [ ] Error logging working
- [ ] Monitoring configured
- [ ] Backups scheduled

## Go Live

- [ ] Announce on social media
- [ ] Update documentation
- [ ] Setup customer support
- [ ] Monitor for issues
- [ ] Collect user feedback
