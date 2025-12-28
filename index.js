cat > index.js <<'JS'
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
JS
