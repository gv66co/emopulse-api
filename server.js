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

// NOTE: demo proxy disabled until demo service has a reachable URL
// When you have a real demo URL, re-enable like:
// app.use("/demo", createProxyMiddleware({ target: "https://ppg-demo.example.com", changeOrigin: true, pathRewrite: { "^/demo": "/" } }));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Emopulse API running on port ${PORT}`);
});
