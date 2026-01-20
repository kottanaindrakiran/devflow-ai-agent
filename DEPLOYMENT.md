# DevFlow AI Deployment Guide

This guide describes how to deploy the DevFlow AI application. The system consists of two parts that should be deployed separately:
1.  **Backend (Python/FastAPI)**: Recommended host is **Render** (Free Tier).
2.  **Frontend (React/Vite)**: Recommended host is **Vercel** (Free Tier).

---

## 1. Backend Deployment (Render)

### Prerequisites
- A GitHub repository containing this project code.
- An [OpenRouter API Key](https://openrouter.ai/).

### Steps
1.  **Create a Web Service on Render**:
    - Go to [dashboard.render.com](https://dashboard.render.com/).
    - Click **New +** -> **Web Service**.
    - Connect your GitHub repository.

2.  **Configuration**:
    - **Name**: `devflow-backend` (or similar)
    - **Region**: Closest to you (e.g., Singapore, Frankfurt)
    - **Branch**: `main`
    - **Root Directory**: `backend` (Important! The python code is in this folder)
    - **Runtime**: `Python 3`
    - **Build Command**: `pip install -r requirements.txt`
    - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

3.  **Environment Variables**:
    - Scroll down to "Environment Variables" and add:
        - `OPENROUTER_API_KEY`: `your_key_here` (Copy from your local .env)
        - `PYTHON_VERSION`: `3.11.0` (Recommended)

4.  **Deploy**:
    - Click **Create Web Service**.
    - Wait for the deployment to finish. Render will provide a URL (e.g., `https://devflow-backend.onrender.com`). **Copy this URL.**

---

## 2. Frontend Deployment (Vercel)

### Steps
1.  **Import Project to Vercel**:
    - Go to [vercel.com/new](https://vercel.com/new).
    - Import the same GitHub repository.

2.  **Configuration**:
    - **Framework Preset**: Vite (detected automatically)
    - **Root Directory**: `.` (Root) - *Leave default*
    - **Build Command**: `npm run build` - *Leave default*
    - **Output Directory**: `dist` - *Leave default*

3.  **Environment Variables**:
    - Expand the "Environment Variables" section.
    - Add the following variable:
        - `VITE_API_URL`: Paste the **Backend URL** from Render (e.g., `https://devflow-backend.onrender.com`).
          *Note: Do not add a trailing slash.*

4.  **Deploy**:
    - Click **Deploy**.
    - Vercel will build and deploy the site.

---

## 3. Final Verification

1.  Open your Vercel URL (e.g., `https://devflow-ai.vercel.app`).
2.  Enter a prompt (e.g., "Explain this code").
3.  If successful, the AI response will appear.
    *   *Note: The free tier on Render spins down after inactivity. The first request might take 50+ seconds to wake it up. The frontend timeout was set to 90s to accommodate this.*
