import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    version: "0.1.0"
  });
});

// Proxy to PPG demo service
app.use("/demo", createProxyMiddleware({
  target: "http://ppg_demo:8501",
  changeOrigin: true,
  pathRewrite: { "^/demo": "/" },
  onError: (err, req, res) => {
    console.error("Demo proxy error:", err.message);
    res.status(502).json({ error: "Demo proxy error" });
  }
}));

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Emopulse API running on port ${PORT}`);
});
