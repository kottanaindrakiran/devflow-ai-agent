# 🚀 **DevFlow AI**

**DevFlow AI** is a full-stack, agent-powered coding assistant that helps developers **understand, debug, review, and summarize code** through natural language interactions.
It is designed with a clean developer experience, reliable AI orchestration, and a modern UI.

> **© 2026 DevFlow AI · Designed & developed by Indra Kiran**

<img width="1848" height="979" alt="image" src="https://github.com/user-attachments/assets/0fb44bac-5a24-4c02-bc9d-609f28750208" />


## ✨ Features

* 🔍 **Code Explanation**
  Understand complex code logic in simple, human-readable language.

* 🐞 **Intelligent Debugging**
  Identify errors and receive actionable suggestions to fix them.

* ✅ **Code Review**
  Get best-practice recommendations for readability, performance, and maintainability.

* 🧠 **Multi-Agent AI System**
  Requests are routed through specialized AI agents for accurate task handling.

* 🎨 **Modern Developer UI**
  Clean, dark-themed interface inspired by modern developer tools.

---

## 🧠 How It Works

1. User selects a task (Explain / Debug / Review / Summarize)
2. Code is sent to the backend API
3. An **Intent Agent** routes the request to the correct task-specific agent
4. The AI agent generates a natural-language response using a **free OpenRouter model**
5. The response is displayed instantly in the UI

---

## 🛠️ Tech Stack

### Frontend

* **Framework**: React + Vite
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **Animations**: Framer Motion
* **Icons**: Lucide React

### Backend

* **Framework**: FastAPI (Python)
* **AI Orchestration**: Pydantic AI
* **LLM Provider**: OpenRouter
* **Model**: Free-tier OpenRouter model (provider-fallback enabled)

---

## 📂 Project Structure

```
devflow-ai/
├── frontend/        # React + Vite frontend
├── backend/         # FastAPI backend
│   ├── agents/      # AI agents (intent, explain, debug, review)
│   ├── schemas/     # Request/response models
│   ├── services/    # OpenRouter client
│   └── utils/       # Logging & retry utilities
└── README.md
```

---

## 🚀 Getting Started (Local Setup)

### Prerequisites

* Node.js v18+
* Python 3.11+
* OpenRouter API key (free tier)

---

### 🔧 Backend Setup

```bash
cd backend
python -m venv venv
```

Activate virtual environment:

**Windows**

```bash
.\venv\Scripts\activate
```

**macOS / Linux**

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create `.env` file:

```env
OPENROUTER_API_KEY=your_api_key_here
```

Run backend:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Health check:

```
http://localhost:8000/health
```

---

### 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open:

```
http://localhost:8080
```

---

## 🌍 Deployment

The project is designed for **separate frontend and backend deployment**.

* **Frontend**: Vercel
* **Backend**: Render / Railway

Environment variables are used for secure configuration.

👉 See **DEPLOYMENT.md** for step-by-step deployment instructions.

---

## 🔐 Security Notes

* API keys are **never committed**
* `.env` is git-ignored
* All secrets are loaded via environment variables

---

## 🎯 Assignment Alignment

This project satisfies all evaluation requirements:

* ✅ Full-stack deployed application
* ✅ Pydantic AI-based agent system
* ✅ Clean API design
* ✅ Robust error handling and fallback
* ✅ Modern UX with polished UI
* ✅ Free OpenRouter model usage



