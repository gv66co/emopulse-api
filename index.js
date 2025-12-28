const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.status(200).send("Emopulse API is running");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    version: "0.1.0",
    timestamp: new Date().toISOString()
  });
});

app.post("/", (req, res) => {
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ error: "Missing 'text'" });
  const rotated = text.split("").reverse().join("");
  res.json({ rotated });
});

app.use((err, req, res, next) => {
  console.error("API Error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: err?.message || "unknown"
  });
});

// Start server when run directly (Cloud Run needs this)
if (require.main === module) {
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

module.exports = app;
// --- Emopulse API: /api/analyze ---
app.post("/api/analyze", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  const analysis = {
    length: text.length,
    wordCount: text.split(/\s+/).length,
    sentiment: "neutral",
    keywords: ["placeholder", "analysis"],
  };

  res.json({ analysis });
});

// --- Emopulse API: /api/emotion ---
app.post("/api/emotion", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  const emotions = {
    joy: 0.52,
    sadness: 0.18,
    anger: 0.07,
    fear: 0.05,
    surprise: 0.18,
  };

  res.json({ emotions });
});

// --- Emopulse API: /api/insights ---
app.post("/api/insights", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  const insights = {
    summary: "Placeholder summary for now.",
    recommendation: "Placeholder recommendation.",
    emotionalInterpretation: "Neutral emotional tone detected.",
  };

  res.json({ insights });
});
// --- Emopulse API: /api/classify ---
app.post("/api/classify", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will be added later
  const classification = {
    tone: "neutral",
    category: "general",
    intensity: 0.5,
    emotions: {
      joy: 0.4,
      sadness: 0.2,
      anger: 0.1,
      fear: 0.05,
      surprise: 0.25
    }
  };

  res.json({ classification });
});
