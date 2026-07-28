import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// API Routes - match both /api/chat and /chat for Vercel rewrite compatibility
app.get(["/api/health", "/health"], (_req, res) => {
  res.json({ status: "ok" });
});

app.post(["/api/chat", "/chat"], async (req, res) => {
  try {
    const { chatHistory = [], message, systemInstruction } = req.body || {};
    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Message string is required." });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(500).json({
        error: "GEMINI_API_KEY environment variable is not configured. Please add GEMINI_API_KEY in your Vercel Project Settings under Environment Variables.",
      });
      return;
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const formattedHistory = chatHistory.map((msg: { role: string; text: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text || "" }],
    }));

    const contents = [
      ...formattedHistory,
      { role: "user", parts: [{ text: message }] },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: systemInstruction ? { systemInstruction } : undefined,
    });

    res.json({ text: response.text || "" });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      error: error.message || "An error occurred while generating a response from Gemini.",
    });
  }
});

// Setup dev/prod static serving when running locally or in standalone container mode
async function setupApp() {
  // Do not run Vite server or app.listen on Vercel serverless environment
  if (process.env.VERCEL) {
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

setupApp().catch((err) => {
  console.error("Failed to setup local server:", err);
});

export default app;
