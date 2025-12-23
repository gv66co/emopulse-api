import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

// Root endpoint to prevent 404 on GET /
app.get("/", (req, res) => {
  res.status(200).send("Emopulse API is running");
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    version: "0.1.0"
  });
});

// ❌ DEMO PROXY IŠJUNGTA, NES JI SUKELIA 502
// Kai turėsi tikrą demo URL, įdėsim atgal.

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Emopulse API running on port ${PORT}`);
});
