# FAIRMEDIA System Overview

## ✅ Fully Working System

Your FAIRMEDIA bias audit system is now **fully functional** with all components integrated and working together.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend (Port 3000)                │
│  - Sidebar Navigation                                        │
│  - Bias Analysis Dashboard                                   │
│  - Interactive Charts & Visualizations                       │
│  - Real-time API Integration                                 │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/REST API
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              FastAPI Backend (Port 8000)                     │
│  - REST API Endpoints                                        │
│  - Request Validation                                        │
│  - Pipeline Orchestration                                    │
│  - Error Handling & Logging                                  │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        ▼                         ▼
┌──────────────────┐    ┌──────────────────┐
│  AI Service      │    │ Fairness Engine  │
│  - Gender Bias   │    │  - Risk Calc     │
│  - Stereotypes   │    │  - Fairness Score│
│  - Exclusionary  │    │  - Recommendations│
│  - Age Bias      │    │  - Mitigation    │
└────────┬─────────┘    └────────┬─────────┘
         │                       │
         └───────────┬───────────┘
                     ▼
         ┌──────────────────────┐
         │  Storage Service     │
         │  - Local JSON Files  │
         │  - Audit Logs        │
         │  - Analysis History  │
         └──────────────────────┘
```

---

## 📦 Components

### 1. Frontend (React + TypeScript)
**Location**: `frontend-react/`

**Features**:
- Modern, responsive UI matching the design mockup
- Real-time bias analysis visualization
- Interactive donut charts for bias scores
- Color-coded text highlighting
- Sidebar navigation
- API integration with error handling

**Tech Stack**:
- React 18
- TypeScript
- Vite (build tool)
- Tailwind CSS
- Axios (HTTP client)

### 2. Backend API (FastAPI)
**Location**: `backend/`

**Features**:
- RESTful API endpoints
- Request/response validation with Pydantic
- Pipeline orchestration
- Service integration
- Comprehensive logging
- Auto-generated API documentation

**Key Files**:
- `main.py` - Application entry point
- `routes/analyze.py` - Analysis endpoints
- `controller/pipeline_controller.py` - Orchestration logic
- `integration/` - Service adapters

### 3. AI Bias Detection Service
**Location**: `services/ai_engine/`

**Features**:
- Pattern-based bias detection
- Gender bias analysis
- Stereotype identification
- Exclusionary language detection
- Age bias recognition
- Highlighted span generation
- Confidence scoring

**Detection Categories**:
- **Gender Bias**: Gendered pronouns, role associations
- **Stereotypes**: "Rockstar", "ninja", age-related terms
- **Exclusionary**: "Top-tier", "elite", "culture fit"
- **Age Bias**: "Older", "young", "veteran", "fresh"

### 4. Fairness Engine
**Location**: `services/fairness_engine/`

**Features**:
- Risk level calculation (low/medium/high/critical)
- Fairness score computation
- Mitigation weight calculation
- Actionable recommendations
- Detailed metrics (inclusion index, semantic neutrality)

**Algorithms**:
- Weighted bias scoring
- Content re-ranking weights
- Fairness metric aggregation
- Recommendation generation

### 5. Storage Service
**Location**: `services/storage/`

**Features**:
- Local JSON file storage
- Audit log persistence
- Analysis retrieval
- History tracking
- Extensible to AWS (DynamoDB + S3)

**Storage Structure**:
```
data/audit_logs/
  ├── {uuid-1}.json
  ├── {uuid-2}.json
  └── {uuid-3}.json
```

---

## 🔄 Data Flow

### Analysis Request Flow

1. **User Input** (Frontend)
   - User enters text content
   - Optional metadata (source, author, tags)
   - Clicks "Analyze Bias"

2. **API Request** (Frontend → Backend)
   ```
   POST /api/v1/analyze
   {
     "content": "text to analyze",
     "language": "en",
     "metadata": {...}
   }
   ```

3. **Pipeline Execution** (Backend)
   - Generate unique analysis ID
   - Call AI Service for bias detection
   - Call Fairness Engine for metrics
   - Store audit log
   - Build response

4. **AI Analysis** (AI Service)
   - Tokenize and analyze content
   - Detect bias patterns
   - Calculate bias scores
   - Generate explanations
   - Highlight problematic spans

5. **Fairness Calculation** (Fairness Engine)
   - Calculate risk level
   - Compute fairness score
   - Generate recommendations
   - Calculate mitigation weights
   - Compute detailed metrics

6. **Storage** (Storage Service)
   - Save complete analysis
   - Generate storage location
   - Return confirmation

7. **Response** (Backend → Frontend)
   ```json
   {
     "analysis_id": "uuid",
     "timestamp": "ISO-8601",
     "bias_detection": {...},
     "fairness_metrics": {...},
     "storage_location": "path",
     "status": "completed",
     "processing_time_ms": 1250
   }
   ```

8. **Visualization** (Frontend)
   - Display overall bias score (donut chart)
   - Show individual bias breakdowns
   - Highlight problematic text
   - List recommendations
   - Show fairness metrics

---

## 🎯 Key Metrics

### Bias Scores (0.0 - 1.0)
- **0.0 - 0.3**: Low bias (green)
- **0.3 - 0.6**: Medium bias (amber)
- **0.6 - 0.8**: High bias (rose)
- **0.8 - 1.0**: Critical bias (red)

### Risk Levels
- **Low**: Overall bias < 0.3
- **Medium**: Overall bias 0.3 - 0.6
- **High**: Overall bias 0.6 - 0.8
- **Critical**: Overall bias > 0.8

### Fairness Score (0.0 - 1.0)
- Inverse of bias score
- Higher = more fair
- Weighted combination of all dimensions

### Mitigation Weights (0.1 - 1.0)
- Used for content re-ranking
- Higher bias = lower weight
- Minimum weight: 0.1 (never fully suppress)

---

## 🔌 API Endpoints

### POST /api/v1/analyze
Analyze content for bias

**Request Body**:
```typescript
{
  content: string (required, 1-10000 chars)
  language?: string (ISO 639-1 code)
  metadata?: {
    source?: string
    author?: string
    tags?: string[]
    url?: string
    timestamp?: string (ISO 8601)
  }
}
```

**Response**: `AnalyzeResponse` (see schemas)

### GET /api/v1/analyze/{analysis_id}
Retrieve stored analysis

**Parameters**: `analysis_id` (UUID)

**Response**: Stored analysis data

### GET /health
Health check endpoint

**Response**:
```json
{
  "status": "healthy",
  "service": "fairmedia-backend",
  "version": "1.0.0",
  "storage_mode": "local"
}
```

### GET /docs
Interactive API documentation (Swagger UI)

### GET /redoc
Alternative API documentation (ReDoc)

---

## 📊 Data Models

### Request Schema
- `AnalyzeRequest`: Main analysis request
- `AnalyzeRequestMetadata`: Optional metadata

### Response Schema
- `AnalyzeResponse`: Complete analysis result
- `ErrorResponse`: Error details

### AI Schema
- `BiasScores`: All bias type scores
- `HighlightedSpan`: Problematic text span
- `AIAnalysisResult`: Complete AI analysis

### Fairness Schema
- `MitigationWeights`: Content re-ranking weights
- `FairnessResult`: Complete fairness analysis

---

## 🚀 Running the System

### Development Mode

**Terminal 1 - Backend**:
```bash
python -m uvicorn backend.main:app --reload --host localhost --port 8000
```

**Terminal 2 - Frontend**:
```bash
cd frontend-react
npm run dev
```

### Production Mode

**Backend**:
```bash
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --workers 4
```

**Frontend**:
```bash
cd frontend-react
npm run build
# Serve dist/ folder with nginx or similar
```

---

## 🧪 Testing

### Manual Testing
1. Start both backend and frontend
2. Navigate to http://localhost:3000
3. Enter test content
4. Verify bias detection
5. Check recommendations
6. Review stored audit logs

### Example Test Content
```
In the competitive landscape of software engineering, we often find that 
older developers might struggle to keep up with the fast-paced agile 
environment that modern startups demand. When searching for the next 
"rockstar" candidate, companies tend to prioritize graduates from top-tier 
universities.
```

**Expected Results**:
- Overall bias: ~30-40% (medium)
- Age bias detected
- Stereotype: "rockstar"
- Exclusionary: "top-tier universities"
- 4-6 recommendations

### Automated Testing
```bash
# Run backend tests
pytest tests/

# Run with coverage
pytest --cov=backend --cov=services tests/
```

---

## 📁 File Structure

```
FAIRMEDIA/
├── backend/                      # FastAPI backend
│   ├── main.py                  # Entry point
│   ├── config.py                # Configuration
│   ├── routes/
│   │   └── analyze.py           # API endpoints
│   ├── controller/
│   │   └── pipeline_controller.py  # Orchestration
│   └── integration/             # Service adapters
│       ├── ai_adapter.py
│       ├── fairness_adapter.py
│       └── storage_adapter.py
├── frontend-react/              # React frontend
│   ├── src/
│   │   ├── components/          # UI components
│   │   ├── pages/              # Page views
│   │   ├── services/           # API client
│   │   └── App.tsx             # Main app
│   └── package.json
├── services/                    # Core services
│   ├── ai_engine/
│   │   └── ai_service.py       # Bias detection
│   ├── fairness_engine/
│   │   └── fairness_engine.py  # Fairness metrics
│   └── storage/
│       └── local_storage.py    # Data persistence
├── schemas/                     # Data models
│   ├── request_schema.py
│   ├── response_schema.py
│   ├── ai_schema.py
│   └── fairness_schema.py
├── data/
│   └── audit_logs/             # Stored analyses
├── tests/                       # Test suite
├── requirements.txt             # Python deps
├── README.md                    # Main documentation
├── START.md                     # Quick start guide
└── SYSTEM_OVERVIEW.md          # This file
```

---

## 🔧 Configuration

### Backend (.env)
```env
API_HOST=localhost
API_PORT=8000
API_RELOAD=True
STORAGE_MODE=local
LOCAL_STORAGE_PATH=./data/audit_logs
ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
```

---

## 🎨 UI Components

### Sidebar
- Logo and branding
- Navigation menu
- System status
- Export button

### Bias Analysis Page
- Header with breadcrumbs
- Overall bias donut chart
- Individual bias cards
- Content audit with highlights
- AI explanations
- Recommendations
- Detailed metrics

### Color Coding
- **Green** (#22c55e): Low bias/severity
- **Amber** (#f59e0b): Medium bias/severity
- **Rose** (#f43f5e): High bias/severity
- **Blue** (#2563eb): Primary actions

---

## 🔐 Security Considerations

- Input validation on all endpoints
- Content length limits (10,000 chars)
- CORS configuration
- No sensitive data in logs
- Audit trail for compliance

---

## 📈 Future Enhancements

1. **ML Models**: Replace pattern matching with BERT/spaCy
2. **User Authentication**: Add login/signup
3. **Batch Processing**: Analyze multiple documents
4. **Export Formats**: PDF, CSV, Excel
5. **AWS Integration**: DynamoDB, S3, Lambda
6. **Real-time Collaboration**: Multi-user support
7. **Custom Rules**: User-defined bias patterns
8. **API Rate Limiting**: Prevent abuse
9. **Caching**: Redis for performance
10. **Analytics Dashboard**: Usage statistics

---

## ✅ System Status

- ✅ Backend API: Fully functional
- ✅ Frontend UI: Complete and responsive
- ✅ AI Service: Pattern-based detection working
- ✅ Fairness Engine: Metrics calculation working
- ✅ Storage: Local JSON persistence working
- ✅ Integration: All components connected
- ✅ Documentation: Complete
- ✅ Testing: Manual testing verified

---

## 🎉 Conclusion

Your FAIRMEDIA system is **production-ready** for bias detection and analysis. All components are integrated, tested, and working together seamlessly.

**Next Steps**:
1. Run the system using START.md
2. Test with various content types
3. Review stored audit logs
4. Customize bias detection rules
5. Deploy to production when ready

**FAIRMEDIA - Making AI fair, transparent, and accountable.** 🌍
