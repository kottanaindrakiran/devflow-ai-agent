# DevFlow AI

**DevFlow AI** is an intelligent coding assistant designed to help developers understand, debug, and review code efficiently. Built with modern web technologies and powered by advanced LLMs via OpenRouter.

![DevFlow AI](https://github.com/user-attachments/assets/placeholder-image)

> **© 2026 DevFlow AI · Designed & developed by Indra Kiran**

## 🚀 Features

-   **🔍 Code Explanation**: Get clear, concise explanations of complex code snippets.
-   **🐞 Intelligent Debugging**: Identify errors and receive actionable fixes for your code.
-   **✅ Code Review**: Analyze code for best practices, security, and performance optimizations.
-   **⚡ Real-time Streaming**: Experience fast, natural language responses.
-   **🎨 Modern UI**: Beautiful, dark-themed interface built with Tailwind CSS and Framer Motion.

## 🛠️ Tech Stack

### Frontend
-   **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Language**: TypeScript

### Backend
-   **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
-   **AI Engine**: [Pydantic AI](https://github.com/pydantic/pydantic-ai)
-   **LLM Provider**: [OpenRouter](https://openrouter.ai/)
-   **Model**: `meta-llama/llama-3-8b-instruct` (Free Tier)

## 🏁 Getting Started

### Prerequisites
-   Node.js (v18+)
-   Python (v3.11+)

### 1. Backend Setup
Navigate to the backend directory and install dependencies:

```bash
cd backend
python -m venv venv
# Windows
.\venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory:
```env
OPENROUTER_API_KEY=your_api_key_here
```

Run the backend server:
```bash
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### 2. Frontend Setup
Navigate to the root directory (if not already there) and install dependencies:

```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) to view the app.

## 🌍 Deployment

This project is optimized for deployment on **Vercel** (Frontend) and **Render** (Backend).

Please refer to [DEPLOYMENT.md](./DEPLOYMENT.md) for a detailed, step-by-step deployment guide.

## 📄 License

This project is licensed under the MIT License.

---
*Built with ❤️ for developers.*
