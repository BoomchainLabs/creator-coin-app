# Creator Coin App - Monorepo

A comprehensive Web3 platform for managing creator tokens and building creator economies.

## Project Structure

- **frontend/** - Next.js application with React components
- **backend/** - Node.js/Express API server
- **deploy/** - Docker and deployment configuration

## Quick Start

### Prerequisites
- Node.js 18+
- npm or pnpm
- Docker (for containerized deployment)

### Development

\`\`\`bash
# Install dependencies
pnpm install

# Run frontend and backend concurrently
pnpm dev

# Or run individually
pnpm frontend:dev
pnpm backend:dev
\`\`\`

### Production Build

\`\`\`bash
pnpm build
\`\`\`

### Docker Deployment

\`\`\`bash
docker-compose up -d
\`\`\`

## Environment Variables

### Backend (.env)
- `PORT` - Backend server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `DATABASE_URL` - Database connection string
- `API_URL` - Backend API URL
- `FRONTEND_URL` - Frontend URL

### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL` - Backend API URL

## API Endpoints

### Coins
- `GET /api/coins` - List all creator coins
- `GET /api/coins/:id` - Get coin details

### Trading
- `POST /api/trade` - Execute a trade

### Portfolio
- `GET /api/portfolio/:walletAddress` - Get user portfolio

### Leaderboard
- `GET /api/leaderboard` - Get trending creators

## Development

The project uses:
- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Express, TypeScript, SQLite
- **DevOps**: Docker, Docker Compose

## License

MIT
