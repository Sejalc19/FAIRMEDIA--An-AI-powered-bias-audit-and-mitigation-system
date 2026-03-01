# 🌍 FAIRMEDIA  
## AI-Powered Bias Audit & Responsible Content Ranking System  

> **Reducing algorithmic bias without altering reality.**

---

## 🚨 Problem

Modern AI systems learn from biased internet data containing:

- Gender bias  
- Stereotypes  
- English language dominance  
- Under-representation of communities  

This leads to **algorithmic discrimination**, unfair ranking, and distorted digital visibility.

---

## 💡 Solution

**FAIRMEDIA** is a **Responsible AI system** that:

- Detects bias using **NLP + Machine Learning**
- Provides **Explainable AI (XAI) bias scores**
- Applies **Smart Re-weighting algorithms**
- Enables **Fairness-aware content ranking**
- Maintains **Human-in-the-Loop oversight**
- Supports **Multilingual & regional language inclusion**

⚠️ We do **NOT** edit or delete content.  
✅ We reduce bias at the **AI decision layer**, not the content layer.

---

## ⚙️ Core Modules

- **Bias Detection Engine** – NLP-based gender & language bias detection  
- **Explainable Bias Scoring** – Transparent word-level explanations  
- **Smart Re-weighting (ML-Based)** – Fair influence adjustment  
- **Fair Content Ranking** – Bias-aware re-ranking system  
- **Human Approval Layer** – Ethical control mechanism  

---

## 🧠 Tech Stack

### Backend
- **Python 3.10+**
- **FastAPI** - REST API framework
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

### AI/ML
- Pattern-based bias detection (extensible to BERT/spaCy)
- Fairness metrics calculation
- Content re-weighting algorithms

---

## 🚀 Quick Start

### Prerequisites

- Python 3.10 or higher
- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd FAIRMEDIA--An-AI-powered-bias-audit-and-mitigation-system

# Install Python dependencies
pip install -r requirements.txt

# Install frontend dependencies
cd frontend-react
npm install
cd ..
```

### Running the Application

You need **two terminals** - one for backend, one for frontend.

#### Terminal 1: Backend (FastAPI)

```bash
# From project root
python -m uvicorn backend.main:app --reload --host localhost --port 8000
```

Backend will run at: **http://localhost:8000**
- API docs: http://localhost:8000/docs
- Health check: http://localhost:8000/health

#### Terminal 2: Frontend (React)

```bash
# From project root
cd frontend-react
npm run dev
```

Frontend will open at: **http://localhost:3000**

---

## 📁 Project Structure

```
FAIRMEDIA/
├── backend/                    # FastAPI backend
│   ├── main.py                # Application entry point
│   ├── config.py              # Configuration settings
│   ├── routes/                # API endpoints
│   ├── controller/            # Pipeline orchestration
│   └── integration/           # Service adapters
├── frontend-react/            # React frontend
│   ├── src/
│   │   ├── components/        # UI components
│   │   ├── pages/            # Page views
│   │   └── services/         # API integration
│   └── package.json
├── services/                  # Core services
│   ├── ai_engine/            # Bias detection
│   ├── fairness_engine/      # Fairness metrics
│   └── storage/              # Data persistence
├── schemas/                   # Data models
│   ├── request_schema.py
│   ├── response_schema.py
│   ├── ai_schema.py
│   └── fairness_schema.py
├── data/                      # Local storage
│   └── audit_logs/           # Analysis results
└── requirements.txt           # Python dependencies
```

---

## 🎯 Key Features

### 1. Bias Detection
- Gender bias detection
- Stereotype identification
- Exclusionary language detection
- Age bias recognition

### 2. Visual Analysis
- Overall bias score with donut chart
- Individual bias breakdowns
- Highlighted problematic text spans
- Color-coded severity levels

### 3. Fairness Metrics
- Risk level assessment (low/medium/high/critical)
- Fairness score calculation
- Content re-weighting for fair ranking
- Detailed fairness metrics

### 4. Actionable Recommendations
- Specific suggestions for improvement
- Skills-based language alternatives
- Inclusive terminology guidance

### 5. Audit Trail
- Complete analysis history
- JSON export functionality
- Timestamp and metadata tracking

---

## 📡 API Endpoints

### POST /api/v1/analyze
Analyze content for bias

**Request:**
```json
{
  "content": "Your text content here",
  "language": "en",
  "metadata": {
    "source": "job_posting",
    "author": "HR Team"
  }
}
```

**Response:**
```json
{
  "analysis_id": "uuid",
  "timestamp": "2024-03-01T10:30:00Z",
  "bias_detection": {
    "bias_scores": {
      "gender_bias": 0.32,
      "stereotype": 0.48,
      "language_dominance": 0.15,
      "overall": 0.35
    },
    "explanations": {...},
    "highlighted_text": [...]
  },
  "fairness_metrics": {
    "risk_level": "medium",
    "fairness_score": 0.65,
    "recommendations": [...],
    "mitigation_weights": {...}
  },
  "status": "completed"
}
```

### GET /api/v1/analyze/{analysis_id}
Retrieve stored analysis

### GET /health
Health check endpoint

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# API Configuration
API_HOST=localhost
API_PORT=8000
API_RELOAD=True

# Storage
STORAGE_MODE=local
LOCAL_STORAGE_PATH=./data/audit_logs

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8000

# Services (for future microservice architecture)
AI_SERVICE_URL=http://localhost:8001
FAIRNESS_SERVICE_URL=http://localhost:8002
```

### Frontend Configuration

Create `frontend-react/.env`:

```env
VITE_API_URL=http://localhost:8000
```

---

## 🧪 Testing

```bash
# Run backend tests
pytest tests/

# Run specific test file
pytest tests/test_api.py

# Run with coverage
pytest --cov=backend --cov=services tests/
```

---

## 📦 Deployment

### Backend (Docker)

```dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Frontend (Docker)

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY frontend-react/package*.json ./
RUN npm install
COPY frontend-react/ .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 🎨 Design System

### Colors
- Primary Blue: `#2563eb`
- Low Bias: `#22c55e` (green)
- Medium Bias: `#f59e0b` (amber)
- High Bias: `#f43f5e` (rose)

### Typography
- Font: Inter (Google Fonts)
- Icons: Material Symbols Outlined

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is part of an educational initiative for responsible AI development.

---

## ⭐ Vision

**FAIRMEDIA — Making AI fair, transparent, and accountable.**

---

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check the documentation in `/docs`
- Review API docs at http://localhost:8000/docs

---

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by responsible AI principles
- Designed for real-world impact
