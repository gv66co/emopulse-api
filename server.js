const express = require("express");
const app = express();
app.use(express.json());

app.post("/rotate", (req, res) => {
  const text = req.body.text || "";
  const rotated = text.split("").reverse().join("");
  res.json({ rotated });
});

// Cloud Functions 2nd gen entrypoint:
exports.rotateHandler = app;
