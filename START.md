# 🚀 FAIRMEDIA - Quick Start Guide

## Get Your System Running in 3 Minutes

### Step 1: Install Dependencies (First Time Only)

```bash
# Install Python dependencies
pip install -r requirements.txt

# Install frontend dependencies
cd frontend-react
npm install
cd ..
```

### Step 2: Start Backend

Open **Terminal 1** (Command Prompt or PowerShell):

```bash
# Windows
python -m uvicorn backend.main:app --reload --host localhost --port 8000

# Linux/Mac
python3 -m uvicorn backend.main:app --reload --host localhost --port 8000
```

✅ Backend running at: **http://localhost:8000**

Check it's working: http://localhost:8000/health

### Step 3: Start Frontend

Open **Terminal 2** (Command Prompt or PowerShell):

```bash
cd frontend-react
npm run dev
```

✅ Frontend running at: **http://localhost:3000**

Your browser should open automatically!

---

## 🎉 You're Ready!

1. Open http://localhost:3000 in your browser
2. Navigate to "Bias Analysis" in the sidebar
3. Enter some text content to analyze
4. Click "Analyze Bias"
5. View the results with bias scores, highlights, and recommendations

---

## 📊 What You'll See

- **Overall Bias Score**: Circular chart showing bias percentage
- **Individual Scores**: Gender, Stereotypes, Linguistic bias
- **Highlighted Text**: Color-coded problematic spans
- **AI Explanations**: Why bias was detected
- **Recommendations**: How to improve the content
- **Fairness Metrics**: Risk level and mitigation weights

---

## 🛠️ Troubleshooting

### Backend won't start

**Error: "Address already in use"**
```bash
# Use different port
python -m uvicorn backend.main:app --reload --port 8001
```

**Error: "Module not found"**
```bash
# Reinstall dependencies
pip install -r requirements.txt
```

### Frontend won't start

**Error: "Port 3000 already in use"**
```bash
# Use different port
npm run dev -- --port 3001
```

**Error: "Cannot find module"**
```bash
# Reinstall dependencies
cd frontend-react
rm -rf node_modules package-lock.json
npm install
```

### Cannot connect to backend

1. Check backend is running: http://localhost:8000/health
2. Check `frontend-react/.env` has correct URL:
   ```env
   VITE_API_URL=http://localhost:8000
   ```
3. Restart frontend after changing .env

---

## 📝 Example Content to Test

Try analyzing this text:

```
In the competitive landscape of software engineering, we often find that 
older developers might struggle to keep up with the fast-paced agile 
environment that modern startups demand. When searching for the next 
"rockstar" candidate, companies tend to prioritize graduates from top-tier 
universities, often overlooking the massive potential of self-taught 
veterans from diverse backgrounds.
```

Expected results:
- Medium overall bias (~30-40%)
- Age bias detected
- Stereotypical language ("rockstar")
- Exclusionary terms ("top-tier universities")

---

## 🎯 Next Steps

1. **Explore the UI**: Navigate through different pages
2. **Test Different Content**: Try various text samples
3. **Check Audit Logs**: View stored analyses in `data/audit_logs/`
4. **Review API Docs**: Visit http://localhost:8000/docs
5. **Customize**: Modify bias detection rules in `services/ai_engine/ai_service.py`

---

## 📚 Documentation

- **Full README**: See `README.md` for complete documentation
- **API Reference**: http://localhost:8000/docs (when backend is running)
- **Frontend Guide**: See `frontend-react/README.md`
- **Architecture**: See project structure in main README

---

## 💡 Tips

- Keep both terminals open while using the app
- Backend auto-reloads on code changes (--reload flag)
- Frontend has hot module replacement (instant updates)
- Check browser console for any errors
- All analyses are saved in `data/audit_logs/` as JSON files

---

## 🆘 Still Having Issues?

1. Make sure you're in the correct directory
2. Check Python version: `python --version` (need 3.10+)
3. Check Node version: `node --version` (need 18+)
4. Try restarting both servers
5. Check firewall isn't blocking ports 3000 or 8000

---

## ✅ System Check

Run these commands to verify everything is working:

```bash
# Check backend health
curl http://localhost:8000/health

# Check frontend is serving
curl http://localhost:3000

# View stored analyses
ls data/audit_logs/
```

---

**Happy Analyzing! 🌍**

FAIRMEDIA - Making AI fair, transparent, and accountable.
