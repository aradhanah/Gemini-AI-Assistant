# Gemini AI Assistant

A fast, responsive, and beautifully designed AI chatbot application powered by **Google Gemini 3.6 Flash**. Built with **React 19**, **Express**, **Tailwind CSS v4**, and the **@google/genai** SDK.

![Gemini AI Assistant](https://img.shields.io/badge/Gemini-3.6%20Flash-indigo?style=for-the-badge&logo=google)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=for-the-badge&logo=typescript)

---

## ✨ Features

- ⚡ **Gemini 3.6 Flash Integration**: Fast responses with full conversation context memory.
- 🎨 **Modular Utility Design System**: Complete custom design system defined in `/src/styles/theme.css` without messy inline utilities in JSX components.
- 🌙 **Dark & Light Mode**: Seamless dark/light theme toggle with persistent user preference stored in `localStorage`.
- ⚙️ **Custom Persona & System Instructions**: Configure Gemini's behavior, tone, or role (e.g., Senior Engineer, Creative Writer, Concise Tutor) on the fly.
- 📝 **Markdown & Code Formatting**: Full support for formatted code blocks, headers, bullet points, and inline styling.
- 📋 **One-Click Copy**: Copy responses with instantaneous UI feedback.
- 💬 **Conversation Persistence**: Chat history persists across page refreshes via `localStorage`.
- 🚀 **Full-Stack Express + Vite Server**: Built-in backend server proxy ensuring your `GEMINI_API_KEY` remains safe and server-side only.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React Icons, React Markdown
- **Backend**: Node.js, Express 4, `tsx`, `esbuild`
- **AI Engine**: `@google/genai` (Official Google Gen AI SDK)
- **Build Tooling**: Vite 6

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or `yarn` / `pnpm`
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/gemini-ai-assistant.git
   cd gemini-ai-assistant
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## 📦 Building & Deployment

### Local / Standalone Server
To create a production build and launch the bundled server locally or on Docker/Cloud Run:

```bash
# Build Vite client assets & bundle backend server with esbuild
npm run build

# Start production server
npm run start
```

### 🔺 Deploying to Vercel

This repository is pre-configured for seamless deployment to **Vercel**:

1. **Push your code to GitHub** (or connect your repo in Vercel Dashboard).
2. **Import Project in Vercel**:
   - Vercel automatically detects Vite and the `/api/index.ts` serverless function.
3. **Set Environment Variable**:
   - In your Vercel Project Settings -> **Environment Variables**, add:
     - `GEMINI_API_KEY` = `your_gemini_api_key_here`
4. **Deploy!**
   - The API routes in `api/index.ts` will run as Vercel Serverless Functions and frontend assets will be served automatically.

---

## 📁 Project Structure

```text
├── api/
│   └── index.ts            # Serverless Express API & Vite dev server
├── src/
│   ├── components/         # Clean React UI components
│   │   ├── ChatInput.tsx
│   │   ├── ChatWindow.tsx
│   │   ├── MessageBubble.tsx
│   │   └── TypingIndicator.tsx
│   ├── services/           # Gemini API client requests
│   │   └── gemini.ts
│   ├── styles/             # Design system & theme styles
│   │   └── theme.css
│   ├── App.tsx             # Main application shell & state
│   ├── main.tsx            # Entry point
│   └── types.ts            # Shared TypeScript definitions
├── .env.example            # Environment variables template
├── vercel.json             # Vercel configuration & rewrites
├── package.json
└── README.md
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
