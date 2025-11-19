# Contributing to Creator Coin App

## Project Structure

\`\`\`
creator-coin-app/
├── frontend/           # Next.js React application
├── backend/            # Express.js API server
├── deploy/             # Docker & deployment configs
└── README.md
\`\`\`

## Development Setup

### Prerequisites
- Node.js 18+
- npm or pnpm
- Git

### Installation

\`\`\`bash
# Clone repository
git clone https://github.com/BoomchainLabs/creator-coin-app.git
cd creator-coin-app

# Install dependencies
pnpm install

# Setup environment files
cp frontend/.env.local.example frontend/.env.local
cp backend/.env.example backend/.env
\`\`\`

### Running Development Servers

\`\`\`bash
# Run both frontend and backend
pnpm dev

# Or run individually
pnpm frontend:dev
pnpm backend:dev
\`\`\`

## Code Standards

### TypeScript
- Use strict mode enabled
- Add type annotations for function parameters
- Use interfaces for object shapes
- Avoid \`any\` types

### React/Components
- Use functional components with hooks
- Keep components small and focused
- Use descriptive names
- Add PropTypes or TypeScript interfaces

### API Routes
- RESTful conventions
- Consistent error handling
- Request validation
- Proper HTTP status codes

## Git Workflow

1. Create feature branch: \`git checkout -b feature/my-feature\`
2. Make changes and commit: \`git commit -m "Add my feature"\`
3. Push to branch: \`git push origin feature/my-feature\`
4. Open Pull Request with description

## Testing

\`\`\`bash
# Run linting
pnpm lint

# Run tests (when available)
pnpm test
\`\`\`

## Common Tasks

### Add Dependencies

\`\`\`bash
# Frontend
pnpm add -F frontend <package-name>

# Backend
pnpm add -F backend <package-name>
\`\`\`

### Add Environment Variables

1. Add to appropriate \`.env.example\` file
2. Document in README
3. Update deployment configs

### Create New API Endpoint

1. Create route handler in \`backend/src/routes/\`
2. Add TypeScript types
3. Add database queries if needed
4. Update API documentation

## Performance Tips

- Use React.memo for expensive components
- Implement code splitting with dynamic imports
- Optimize database queries
- Use SWR for data fetching
- Lazy load images

## Debugging

### Frontend
\`\`\`bash
# Use React DevTools browser extension
# Use browser DevTools Network tab
# Check console for errors
\`\`\`

### Backend
\`\`\`bash
# View logs
docker-compose logs -f backend

# Debug with node inspector
node --inspect-brk src/index.ts
\`\`\`

## Need Help?

- Check existing GitHub issues
- Read documentation in deploy/ folder
- Ask questions in Pull Requests
- Contact maintainers

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help other contributors
- Report issues appropriately
\`\`\`
