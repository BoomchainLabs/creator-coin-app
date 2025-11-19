# 🚀 Creator Coin App - Quick Deployment Guide

## One-Click Deployment

### Prerequisites
- GitHub account
- Vercel account (for frontend)
- Railway account (for backend)
- Neon database (already integrated)

### Step 1: Fork and Setup Secrets

1. Fork the repository on GitHub
2. Go to **Settings → Secrets and variables → Actions**
3. Add these secrets:

\`\`\`
RAILWAY_TOKEN=<your-railway-token>
RAILWAY_PROJECT_ID=<your-railway-project-id>

VERCEL_TOKEN=<your-vercel-token>
VERCEL_ORG_ID=<your-vercel-org-id>
VERCEL_PROJECT_ID=<your-vercel-project-id>

DATABASE_URL=<your-neon-database-url>
POSTGRES_URL=<your-neon-postgres-url>
QUIKNODE_RPC_URL=<your-quiknode-rpc-url>
PRIVATE_KEY=<your-wallet-private-key>

FRONTEND_DOMAIN=app.yourdomain.com
API_DOMAIN=api.yourdomain.com
\`\`\`

### Step 2: Deploy

Push to main branch - deployment happens automatically:

\`\`\`bash
git push origin main
\`\`\`

### Step 3: Monitor

Watch deployment progress in **Actions** tab on GitHub.

---

## Manual Deployment with Docker Compose

### Setup Environment

\`\`\`bash
source deploy/scripts/setup-env.sh
\`\`\`

### Deploy

\`\`\`bash
source .env.prod
bash deploy/scripts/deploy-prod.sh
\`\`\`

---

## Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Neon PostgreSQL connection | `postgresql://user:pass@neon.tech/db` |
| `QUIKNODE_RPC_URL` | Base network RPC endpoint | Your QuikNode URL |
| `PRIVATE_KEY` | Wallet key for deployments | `0x...` |
| `FACTORY_CONTRACT_ADDRESS` | Deployed contract address | `0x...` |
| `NEXT_PUBLIC_API_URL` | Backend API URL (public) | `https://api.yourdomain.com` |
| `NEXT_PUBLIC_QUIKNODE_RPC_URL` | RPC URL (public) | Your QuikNode URL |

---

## Deployment Platforms Supported

### Frontend
- **Vercel** (recommended, free tier available)
- **Netlify**
- **GitHub Pages**

### Backend
- **Railway** (recommended)
- **Render**
- **Fly.io**
- **Self-hosted (Docker)**

### Database
- **Neon** (PostgreSQL, already integrated)
- **Supabase**
- **PlanetScale**

---

## Troubleshooting

### Deployment fails with "environment variables not found"
- Check all secrets are added in GitHub Settings
- Ensure secret names match exactly

### Frontend can't connect to API
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check CORS is enabled in backend
- Ensure backend is deployed first

### Database connection errors
- Test database URL: `psql <DATABASE_URL>`
- Check Neon dashboard for connection limits
- Verify IP whitelist settings

---

## Post-Deployment

1. ✅ Verify frontend loads: https://your-domain.com
2. ✅ Check API health: https://api.your-domain.com/api/health
3. ✅ Deploy smart contracts: `bash contracts/script/deploy.sh`
4. ✅ Update factory address in environment variables
5. ✅ Test wallet connection and trading

---

## Scaling & Monitoring

### View Logs

**Vercel Frontend:**
\`\`\`bash
vercel logs --prod
\`\`\`

**Railway Backend:**
\`\`\`bash
railway logs
\`\`\`

### Enable Monitoring

- **Sentry** for error tracking
- **DataDog** for performance monitoring
- **LogRocket** for session replay

---

## Next Steps

- 🔐 Setup SSL certificates (automatic with Caddy/Vercel)
- 📊 Enable analytics
- 🎯 Configure domain DNS
- 💳 Setup payment processing (if needed)
- 🤖 Deploy smart contracts
