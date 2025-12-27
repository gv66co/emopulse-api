import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

// --- Middleware ---
app.use(express.json());          // Built-in JSON parser
app.use(cors());                  // Allow frontend access
app.use(morgan("tiny"));          // Lightweight request logging

// --- Root endpoint ---
app.get("/", (req, res) => {
  res.status(200).send("Emopulse API is running");
});

// --- Health check ---
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    version: "0.1.0",
    timestamp: new Date().toISOString()
  });
});

// --- Error handler (production-safe) ---
app.use((err, req, res, next) => {
  console.error("API Error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: err.message
  });
});

// --- Export for Cloud Functions ---
export const rotateHandler = app;
