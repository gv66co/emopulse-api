import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

// --- Middleware ---
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

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

// --- Error handler ---
app.use((err, req, res, next) => {
  console.error("API Error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: err.message
  });
});

// --- Export for Cloud Functions 2nd gen ---
export const rotateHandler = app;
