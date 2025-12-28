const express = require("express");
const app = express();
app.use(express.json());

app.post("/", (req, res) => {
  const text = req.body.text || "";
  const rotated = text.split("").reverse().join("");
  res.json({ rotated });
});

exports.rotateHandler = app;
