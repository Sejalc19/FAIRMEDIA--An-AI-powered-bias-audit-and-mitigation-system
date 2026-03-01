# FAIRMEDIA React Frontend

Modern React + TypeScript frontend for the FAIRMEDIA bias audit system.

## Features

- 🎨 Pixel-perfect UI matching the design mockup
- ⚡ Built with Vite for fast development
- 🎯 TypeScript for type safety
- 💅 Tailwind CSS for styling
- 📊 Interactive donut charts and visualizations
- 🔄 Real-time API integration with FastAPI backend
- 📱 Responsive design

## Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Backend API running at http://localhost:8000

### Installation

```bash
cd frontend-react

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

The app will open at: **http://localhost:3000**

## Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Project Structure

```
frontend-react/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   ├── Header.tsx       # Top header bar
│   │   ├── DonutChart.tsx   # Circular progress chart
│   │   ├── BiasCard.tsx     # Individual bias metric card
│   │   ├── ContentAudit.tsx # Highlighted content display
│   │   ├── ExplanationCard.tsx
│   │   └── RecommendationCard.tsx
│   ├── pages/               # Page components
│   │   ├── BiasAnalysis.tsx # Main analysis page
│   │   ├── Dashboard.tsx    # Dashboard page
│   │   └── FairnessMetrics.tsx
│   ├── services/            # API services
│   │   └── api.ts           # Backend API client
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── tailwind.config.js       # Tailwind config
└── vite.config.ts           # Vite config
```

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **Google Material Symbols** - Additional icons

## Configuration

### Backend URL

Edit `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

### Proxy Setup

The Vite config includes a proxy for `/api` requests to avoid CORS issues during development.

## Design System

### Colors

- Primary Blue: `#2563eb`
- Low Bias: `#22c55e` (green)
- Medium Bias: `#f59e0b` (amber)
- High Bias: `#f43f5e` (rose)

### Typography

- Font: Inter (Google Fonts)
- Icons: Material Symbols Outlined

### Components

All components follow the design mockup with:
- Rounded corners (12px-24px)
- Subtle shadows
- Smooth transitions
- Hover states

## API Integration

The app connects to the FastAPI backend at `http://localhost:8000`:

- `GET /health` - Health check
- `POST /api/v1/analyze` - Analyze content
- `GET /api/v1/analysis/:id` - Get stored analysis

See `src/services/api.ts` for full API documentation.

## Building for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

The build output will be in the `dist/` directory.

## Deployment

### Static Hosting (Netlify, Vercel, etc.)

1. Build the app: `npm run build`
2. Deploy the `dist/` folder
3. Set environment variable: `VITE_API_URL=https://your-api-url.com`

### Docker

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Troubleshooting

### Port already in use

```bash
# Use different port
npm run dev -- --port 3001
```

### API connection errors

1. Ensure backend is running: `python -m uvicorn backend.main:app --reload`
2. Check `.env` file has correct `VITE_API_URL`
3. Check browser console for CORS errors

### Build errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## License

Part of the FAIRMEDIA project.
