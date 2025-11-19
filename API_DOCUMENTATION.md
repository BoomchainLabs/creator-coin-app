# API Documentation

## Base URL

Development: \`http://localhost:3001\`
Production: \`https://api.yourdomain.com\`

## Endpoints

### Health Check
\`\`\`
GET /api/health
\`\`\`

Response:
\`\`\`json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00Z"
}
\`\`\`

### Get All Coins
\`\`\`
GET /api/coins
\`\`\`

Response:
\`\`\`json
[
  {
    "id": "coin1",
    "creatorId": "creator1",
    "name": "Artist Token",
    "symbol": "ART",
    "price": 0.42,
    "marketCap": 420000,
    "volume24h": 125000,
    "change24h": 12.5,
    "totalSupply": 1000000
  }
]
\`\`\`

### Get Coin Details
\`\`\`
GET /api/coins/:id
\`\`\`

Response:
\`\`\`json
{
  "id": "coin1",
  "creatorId": "creator1",
  "name": "Artist Token",
  "symbol": "ART",
  "description": "Token for artist support",
  "price": 0.42,
  "marketCap": 420000,
  "volume24h": 125000,
  "change24h": 12.5,
  "totalSupply": 1000000,
  "createdAt": "2024-01-01T00:00:00Z"
}
\`\`\`

### Execute Trade
\`\`\`
POST /api/trade
Content-Type: application/json

{
  "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
  "coinId": "coin1",
  "amount": 100,
  "type": "buy"
}
\`\`\`

Response:
\`\`\`json
{
  "success": true,
  "transactionId": "0xabcd1234...",
  "type": "buy",
  "amount": 100,
  "coinId": "coin1",
  "timestamp": "2024-01-15T10:30:00Z"
}
\`\`\`

### Get Portfolio
\`\`\`
GET /api/portfolio/:walletAddress
\`\`\`

Response:
\`\`\`json
{
  "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
  "holdings": [
    {
      "id": "holding1",
      "coinId": "coin1",
      "amount": 100,
      "averagePurchasePrice": 0.35,
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "totalValue": 145.5,
  "gainLoss": 12.5
}
\`\`\`

### Get Leaderboard
\`\`\`
GET /api/leaderboard
\`\`\`

Response:
\`\`\`json
[
  {
    "rank": 1,
    "name": "John Creator",
    "followers": 125000,
    "volume": 5000000
  },
  {
    "rank": 2,
    "name": "Jane Artist",
    "followers": 98000,
    "volume": 3500000
  }
]
\`\`\`

## Error Responses

\`\`\`json
{
  "error": "Error message here",
  "status": 400
}
\`\`\`

## Status Codes

- 200: Success
- 400: Bad Request
- 404: Not Found
- 500: Server Error
\`\`\`
