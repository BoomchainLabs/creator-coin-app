# Architecture Overview

## System Design

### Frontend (Next.js)
- Server-side rendering with App Router
- React components with TypeScript
- Tailwind CSS for styling
- Context API for state management (wallet connection)
- SWR for data fetching and caching

### Backend (Express.js)
- RESTful API with TypeScript
- SQLite database for data persistence
- Modular route handlers
- Database query abstraction layer
- CORS enabled for frontend integration

### Database Schema
- **creators**: Creator profiles and metadata
- **coins**: Creator token information
- **transactions**: Trade history
- **holdings**: User portfolio tracking

## Data Flow

### User Wallet Connection
1. User clicks "Connect Wallet" button
2. WalletContext handles connection logic
3. Wallet address stored in localStorage
4. Navigation updates to show connected wallet

### Trading Flow
1. User selects coin and amount
2. Frontend validates input
3. POST request to /api/trade endpoint
4. Backend creates transaction record
5. Backend updates user holdings
6. Frontend updates portfolio display

### Portfolio View
1. Frontend fetches user holdings via /api/portfolio/:walletAddress
2. Backend queries holdings and current prices
3. Calculates gain/loss and total value
4. Returns computed portfolio data
5. Frontend displays with charts and analytics

## API Endpoints

### Coins
- \`GET /api/coins\` - List all creator coins
- \`GET /api/coins/:id\` - Get specific coin details

### Trading
- \`POST /api/trade\` - Execute buy/sell transaction

### Portfolio
- \`GET /api/portfolio/:walletAddress\` - Get user holdings and portfolio

### Leaderboard
- \`GET /api/leaderboard\` - Get trending creators

## Deployment Architecture

### Docker Compose
- Containerized services for development and production
- Caddy reverse proxy with automatic SSL
- Named volumes for data persistence
- Network isolation between services

### Kubernetes
- Horizontal pod autoscaling capability
- LoadBalancer service for frontend access
- StatefulSets for database persistence (future)
- ConfigMaps for environment configuration

## Security Considerations

- Environment variables for sensitive data
- CORS configuration for API access
- Input validation on all endpoints
- SQL injection prevention via parameterized queries
- Rate limiting (recommended for production)
- Authentication middleware (recommended)

## Performance Optimizations

- Frontend component code splitting
- Image optimization with Next.js Image
- Database query optimization with indexes
- Caching headers configuration
- Gzip compression via Caddy

## Future Enhancements

- Web3 wallet integration (MetaMask, WalletConnect)
- Blockchain transaction verification
- Real-time price updates via WebSockets
- Advanced analytics and charting
- User authentication and profiles
- Notification system
- Mobile app development
