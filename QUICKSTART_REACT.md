# FAIRMEDIA React Frontend - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies

```bash
cd frontend-react
npm install
```

### Step 2: Start Backend (Terminal 1)

```bash
# From project root
python -m uvicorn backend.main:app --reload --host localhost --port 8000
```

Backend will run at: http://localhost:8000

### Step 3: Start Frontend (Terminal 2)

```bash
# From frontend-react directory
npm run dev
```

Frontend will open at: http://localhost:3000

## ✅ What You Get

- ✨ Modern React UI matching the design mockup exactly
- 🎨 Tailwind CSS styling with custom colors
- 📊 Interactive donut charts for bias visualization
- 🔍 Content audit with highlighted bias spans
- 💡 AI explanations and recommendations
- ⚖️ Fairness metrics display
- 📱 Responsive design

## 📁 Project Structure

```
frontend-react/
├── src/
│   ├── components/       # UI components
│   ├── pages/           # Page views
│   ├── services/        # API integration
│   └── App.tsx          # Main app
├── package.json         # Dependencies
└── vite.config.ts       # Vite config
```

## 🎯 Key Features

### Sidebar Navigation
- Dashboard
- Bias Analysis (main page)
- Fairness Metrics
- Audit History
- Settings

### Bias Analysis Page
- Overall bias score with donut chart
- Individual bias breakdowns (Gender, Stereotypes, Linguistic)
- Content audit with highlighted problematic text
- Color-coded severity (yellow/orange/red)
- AI explanations for each bias type
- Actionable recommendations
- Detailed metrics

## 🛠️ Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Lint code
```

## 🔧 Configuration

Create `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

## 🎨 Design System

### Colors
- Primary: `#2563eb` (blue)
- Low Bias: `#22c55e` (green)
- Medium Bias: `#f59e0b` (amber)
- High Bias: `#f43f5e` (rose)

### Typography
- Font: Inter (Google Fonts)
- Icons: Material Symbols Outlined

## 📡 API Integration

The frontend connects to your FastAPI backend:

- `POST /api/v1/analyze` - Analyze content
- `GET /health` - Health check
- `GET /api/v1/analysis/:id` - Get stored analysis

## 🐛 Troubleshooting

### Port already in use
```bash
npm run dev -- --port 3001
```

### Cannot connect to backend
1. Check backend is running: http://localhost:8000/health
2. Verify `.env` has correct `VITE_API_URL`
3. Check browser console for errors

### Module not found
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📦 Tech Stack

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS
- Axios (HTTP client)
- Material Symbols (icons)

## 🚢 Deployment

### Build for production
```bash
npm run build
```

Output will be in `dist/` folder.

### Deploy to Netlify/Vercel
1. Connect your Git repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variable: `VITE_API_URL=https://your-api.com`

## 📝 Next Steps

1. Customize the example data in `BiasAnalysis.tsx`
2. Connect to real API endpoints in `services/api.ts`
3. Add authentication if needed
4. Implement file upload for content analysis
5. Add export functionality for reports

## 💡 Tips

- Hot reload is enabled - changes appear instantly
- TypeScript provides autocomplete and type checking
- Tailwind classes are purged in production for smaller bundle
- All components are modular and reusable

## 🎉 You're Ready!

Your React frontend is now running with the exact UI from the design mockup. Start analyzing content for bias!
