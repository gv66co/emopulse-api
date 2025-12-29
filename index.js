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
// --- Emopulse API: /api/summary ---
app.post("/api/summary", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder summary logic — AI will replace this later
  const words = text.split(/\s+/);
  const summary = words.length > 20
    ? words.slice(0, 20).join(" ") + "..."
    : text;

  res.json({ summary });
});
// --- Emopulse API: /api/score ---
app.post("/api/score", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Missing 'text' field" });

  const score = Math.floor(Math.random() * 101); // 0–100 placeholder
  res.json({ score });
});

// --- Emopulse API: /api/context ---
app.post("/api/context", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Missing 'text' field" });

  const context = {
    topic: "general",
    subtext: "neutral underlying meaning",
    impliedEmotion: "neutral"
  };

  res.json({ context });
});

// --- Emopulse API: /api/profile ---
app.post("/api/profile", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Missing 'text' field" });

  const profile = {
    personality: "balanced",
    emotionalStability: 0.7,
    expressiveness: 0.6,
    empathy: 0.65
  };

  res.json({ profile });
});

// --- Emopulse API: /api/detect ---
app.post("/api/detect", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Missing 'text' field" });

  const detection = {
    language: "en",
    containsEmotion: true,
    containsStress: false,
    containsUrgency: false
  };

  res.json({ detection });
});

// --- Emopulse API: /api/intent ---
app.post("/api/intent", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Missing 'text' field" });

  const intent = {
    type: "inform",
    confidence: 0.82
  };

  res.json({ intent });
});

// --- Emopulse API: /api/keywords ---
app.post("/api/keywords", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Missing 'text' field" });

  const words = text.split(/\s+/);
  const keywords = words.slice(0, 5);

  res.json({ keywords });
});

// --- Emopulse API: /api/tones ---
app.post("/api/tones", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Missing 'text' field" });

  const tones = {
    confidence: 0.6,
    politeness: 0.7,
    formality: 0.5,
    positivity: 0.55
  };

  res.json({ tones });
});

// --- Emopulse API: /api/summary-advanced ---
app.post("/api/summary-advanced", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Missing 'text' field" });

  const summary = text.length > 100
    ? text.substring(0, 100) + "..."
    : text;

  res.json({ summary });
});

// --- Emopulse API: /api/emotion-advanced ---
app.post("/api/emotion-advanced", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Missing 'text' field" });

  const emotions = {
    primary: "neutral",
    secondary: ["calm", "balanced"],
    spectrum: {
      joy: 0.4,
      sadness: 0.2,
      anger: 0.1,
      fear: 0.05,
      surprise: 0.25
    }
  };

  res.json({ emotions });
});

// --- Emopulse API: /api/insights-advanced ---
app.post("/api/insights-advanced", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Missing 'text' field" });

  const insights = {
    emotionalDrivers: ["connection", "clarity"],
    behavioralPatterns: ["direct communication"],
    recommendedResponse: "Acknowledge and clarify."
  };

  res.json({ insights });
});
// --- Emopulse API: /api/energy ---
app.post("/api/energy", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const energy = {
    level: Math.random().toFixed(2), // 0.00–1.00
    direction: Math.random() > 0.5 ? "rising" : "falling",
    tension: Math.random().toFixed(2),
    activation: Math.random().toFixed(2)
  };

  res.json({ energy });
});
// --- Emopulse API: /api/stress ---
app.post("/api/stress", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const stress = {
    level: Math.random().toFixed(2), // 0.00–1.00
    type: Math.random() > 0.5 ? "emotional" : "cognitive",
    tension: Math.random().toFixed(2),
    overloadRisk: Math.random().toFixed(2)
  };

  res.json({ stress });
});
// --- Emopulse API: /api/relationship ---
app.post("/api/relationship", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const relationship = {
    tone: "neutral",
    connectionStrength: Math.random().toFixed(2),
    trustLevel: Math.random().toFixed(2),
    tensionLevel: Math.random().toFixed(2),
    dynamic: Math.random() > 0.5 ? "stable" : "shifting"
  };

  res.json({ relationship });
});
// --- Emopulse API: /api/compatibility ---
app.post("/api/compatibility", (req, res) => {
  const { textA, textB } = req.body;

  if (!textA || !textB) {
    return res.status(400).json({ error: "Missing 'textA' or 'textB' field" });
  }

  // Placeholder logic — AI will replace this later
  const compatibility = {
    score: Math.floor(Math.random() * 101), // 0–100
    harmony: Math.random().toFixed(2),
    communicationFit: Math.random().toFixed(2),
    riskZones: ["misalignment", "tone mismatch"],
    dynamic: Math.random() > 0.5 ? "balanced" : "volatile"
  };

  res.json({ compatibility });
});
// --- Emopulse API: /api/needs ---
app.post("/api/needs", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const needs = {
    primary: "clarity",
    secondary: "reassurance",
    unmetLevel: Math.random().toFixed(2),
    priority: Math.random() > 0.5 ? "high" : "medium",
    hiddenNeeds: ["validation", "understanding"]
  };

  res.json({ needs });
});
// --- Emopulse API: /api/motivation ---
app.post("/api/motivation", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const motivation = {
    type: Math.random() > 0.5 ? "intrinsic" : "extrinsic",
    direction: Math.random() > 0.5 ? "forward" : "avoidance",
    driveLevel: Math.random().toFixed(2),
    stability: Math.random().toFixed(2),
    source: Math.random() > 0.5 ? "emotion" : "logic"
  };

  res.json({ motivation });
});
// --- Emopulse API: /api/attachment ---
app.post("/api/attachment", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const attachment = {
    style: ["secure", "anxious", "avoidant", "disorganized"][
      Math.floor(Math.random() * 4)
    ],
    securityLevel: Math.random().toFixed(2),
    closenessTolerance: Math.random().toFixed(2),
    distanceNeed: Math.random().toFixed(2),
    reactionPattern: Math.random() > 0.5 ? "approach" : "withdraw"
  };

  res.json({ attachment });
});

// --- Emopulse API: /api/values ---
app.post("/api/values", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const values = {
    core: ["growth", "connection", "clarity"][Math.floor(Math.random() * 3)],
    direction: Math.random() > 0.5 ? "self-oriented" : "other-oriented",
    stability: Math.random().toFixed(2),
    conflicts: ["comfort vs progress", "logic vs emotion"],
    priority: Math.random() > 0.5 ? "high" : "medium"
  };

  res.json({ values });
});

// --- Emopulse API: /api/archetype ---
app.post("/api/archetype", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const archetypes = ["visionary", "caregiver", "analyst", "rebel", "mentor"];
  const archetype = archetypes[Math.floor(Math.random() * archetypes.length)];

  const result = {
    archetype,
    dominantEnergy: Math.random() > 0.5 ? "emotional" : "cognitive",
    shadowSide: Math.random() > 0.5 ? "overthinking" : "overgiving",
    stability: Math.random().toFixed(2),
    direction: Math.random() > 0.5 ? "expanding" : "contracting"
  };

  res.json({ archetype: result });
});

// --- Emopulse API: /api/behavior ---
app.post("/api/behavior", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const behavior = {
    type: ["assertive", "avoidant", "adaptive", "reactive"][
      Math.floor(Math.random() * 4)
    ],
    recurringPattern: Math.random() > 0.5 ? "looping" : "shifting",
    strategy: Math.random() > 0.5 ? "problem-solving" : "emotion-driven",
    riskZone: Math.random() > 0.5 ? "overreaction" : "withdrawal",
    stability: Math.random().toFixed(2)
  };

  res.json({ behavior });
});

// --- Emopulse API: /api/patterns ---
app.post("/api/patterns", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const patterns = {
    recurring: Math.random() > 0.5 ? "emotional loop" : "communication loop",
    cycleType: Math.random() > 0.5 ? "escalation" : "avoidance",
    cycleLength: Math.floor(Math.random() * 5) + 1, // 1–5 steps
    riskZone: Math.random() > 0.5 ? "misinterpretation" : "overreaction",
    intervention: Math.random() > 0.5 ? "pause-and-clarify" : "reframe-intent"
  };

  res.json({ patterns });
});

// --- Emopulse API: /api/trajectory ---
app.post("/api/trajectory", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const trajectory = {
    direction: Math.random() > 0.5 ? "upward" : "downward",
    changeRate: Math.random().toFixed(2),
    stability: Math.random().toFixed(2),
    riskZone: Math.random() > 0.5 ? "emotional dip" : "overactivation",
    predictedState: Math.random() > 0.5 ? "calmer" : "tenser"
  };

  res.json({ trajectory });
});

// --- Emopulse API: /api/forecast ---
app.post("/api/forecast", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const forecast = {
    predictedEmotions: {
      joy: Math.random().toFixed(2),
      sadness: Math.random().toFixed(2),
      anger: Math.random().toFixed(2),
      fear: Math.random().toFixed(2),
      surprise: Math.random().toFixed(2)
    },
    dominantNextEmotion: ["joy", "sadness", "anger", "fear", "surprise"][
      Math.floor(Math.random() * 5)
    ],
    direction: Math.random() > 0.5 ? "improving" : "declining",
    riskIndicator: Math.random().toFixed(2),
    projection: Math.random() > 0.5 ? "stable" : "volatile"
  };

  res.json({ forecast });
});

// --- Emopulse API: /api/state ---
app.post("/api/state", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const states = ["calm", "tense", "focused", "uncertain", "energized"];
  const state = states[Math.floor(Math.random() * states.length)];

  const result = {
    state,
    intensity: Math.random().toFixed(2),
    valence: Math.random() > 0.5 ? "positive" : "negative",
    activation: Math.random().toFixed(2),
    direction: Math.random() > 0.5 ? "rising" : "falling"
  };

  res.json({ state: result });
});

// --- Emopulse API: /api/clarity ---
app.post("/api/clarity", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const clarity = {
    clarityLevel: Math.random().toFixed(2),
    ambiguityIndex: Math.random().toFixed(2),
    riskyPhrases: ["maybe", "I guess", "not sure"],
    impliedMeaning: Math.random() > 0.5 ? "seeking clarity" : "softening message",
    recommendation: Math.random() > 0.5 ? "add specifics" : "state intent directly"
  };

  res.json({ clarity });
});

// --- Emopulse API: /api/sentiment-advanced ---
app.post("/api/sentiment-advanced", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const sentiment = {
    polarity: Math.random() > 0.5 ? "positive" : "negative",
    intensity: Math.random().toFixed(2),
    subjectivity: Math.random().toFixed(2),
    toneStability: Math.random().toFixed(2),
    direction: Math.random() > 0.5 ? "strengthening" : "weakening"
  };

  res.json({ sentiment });
});

// --- Emopulse API: /api/intent-advanced ---
app.post("/api/intent-advanced", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const intent = {
    surface: Math.random() > 0.5 ? "inform" : "express",
    hidden: Math.random() > 0.5 ? "seek reassurance" : "test reaction",
    direction: Math.random() > 0.5 ? "toward" : "away",
    clarity: Math.random().toFixed(2),
    confidence: Math.random().toFixed(2)
  };

  res.json({ intent });
});

// --- Emopulse API: /api/meaning ---
app.post("/api/meaning", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const meaning = {
    literal: "direct message interpretation",
    subtext: Math.random() > 0.5 ? "seeking connection" : "expressing uncertainty",
    implied: Math.random() > 0.5 ? "request for clarity" : "emotional signaling",
    emotionalContext: ["neutral", "warm", "tense"][Math.floor(Math.random() * 3)],
    misinterpretationRisk: Math.random().toFixed(2)
  };

  res.json({ meaning });
});

// --- Emopulse API: /api/cognition ---
app.post("/api/cognition", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const cognition = {
    thinkingStyle: ["analytical", "intuitive", "mixed"][Math.floor(Math.random() * 3)],
    bias: ["confirmation", "negativity", "optimism"][Math.floor(Math.random() * 3)],
    processing: Math.random() > 0.5 ? "fast" : "slow",
    rationalEmotionalBalance: Math.random().toFixed(2),
    stability: Math.random().toFixed(2)
  };

  res.json({ cognition });
});

// --- Emopulse API: /api/flow ---
app.post("/api/flow", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const flow = {
    direction: Math.random() > 0.5 ? "forward" : "scattered",
    intensity: Math.random().toFixed(2),
    smoothness: Math.random().toFixed(2),
    energyDistribution: ["balanced", "spiky", "low-density"][Math.floor(Math.random() * 3)],
    stability: Math.random().toFixed(2)
  };

  res.json({ flow });
});

// --- Emopulse API: /api/impact ---
app.post("/api/impact", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const impact = {
    immediate: Math.random() > 0.5 ? "soothing" : "activating",
    longTerm: Math.random() > 0.5 ? "positive drift" : "negative drift",
    intensity: Math.random().toFixed(2),
    riskZone: Math.random() > 0.5 ? "overload" : "under-response",
    stability: Math.random().toFixed(2)
  };

  res.json({ impact });
});

// --- Emopulse API: /api/processing ---
app.post("/api/processing", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const processing = {
    speed: Math.random() > 0.5 ? "fast" : "slow",
    depth: Math.random() > 0.5 ? "deep" : "surface-level",
    detailLevel: Math.random().toFixed(2),
    filter: ["emotional", "logical", "mixed"][Math.floor(Math.random() * 3)],
    cognitiveLoad: Math.random().toFixed(2)
  };

  res.json({ processing });
});

// --- Emopulse API: /api/energy ---
app.post("/api/energy", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const energy = {
    level: Math.random().toFixed(2),
    direction: Math.random() > 0.5 ? "rising" : "draining",
    source: ["emotion", "cognition", "external"][Math.floor(Math.random() * 3)],
    stability: Math.random().toFixed(2),
    distribution: ["focused", "scattered", "balanced"][Math.floor(Math.random() * 3)]
  };

  res.json({ energy });
});

// --- Emopulse API: /api/tempo ---
app.post("/api/tempo", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const tempo = {
    speed: ["slow", "moderate", "fast"][Math.floor(Math.random() * 3)],
    direction: Math.random() > 0.5 ? "accelerating" : "decelerating",
    variation: Math.random().toFixed(2),
    rhythmicStability: Math.random().toFixed(2),
    impulse: Math.random().toFixed(2)
  };

  res.json({ tempo });
});

// --- Emopulse API: /api/resonance ---
app.post("/api/resonance", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const resonance = {
    level: Math.random().toFixed(2),
    direction: Math.random() > 0.5 ? "converging" : "diverging",
    compatibility: Math.random().toFixed(2),
    stability: Math.random().toFixed(2),
    type: ["emotional", "cognitive", "mixed"][Math.floor(Math.random() * 3)]
  };

  res.json({ resonance });
});

// --- Emopulse API: /api/thresholds ---
app.post("/api/thresholds", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const thresholds = {
    reactionThreshold: Math.random().toFixed(2),
    sensitivity: Math.random().toFixed(2),
    toleranceZone: ["narrow", "medium", "wide"][Math.floor(Math.random() * 3)],
    burnoutRisk: Math.random().toFixed(2),
    stability: Math.random().toFixed(2)
  };

  res.json({ thresholds });
});

// --- Emopulse API: /api/volatility ---
app.post("/api/volatility", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const volatility = {
    level: Math.random().toFixed(2),
    amplitude: Math.random().toFixed(2),
    frequency: Math.random().toFixed(2),
    riskZone: Math.random() > 0.5 ? "instability" : "overreaction",
    stabilizationForecast: Math.random() > 0.5 ? "improving" : "worsening"
  };

  res.json({ volatility });
});

// --- Emopulse API: /api/attachment ---
app.post("/api/attachment", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const attachment = {
    type: ["secure", "anxious", "avoidant", "mixed"][Math.floor(Math.random() * 4)],
    closenessTolerance: Math.random().toFixed(2),
    distanceTolerance: Math.random().toFixed(2),
    stability: Math.random().toFixed(2),
    dynamic: Math.random() > 0.5 ? "approaching" : "withdrawing"
  };

  res.json({ attachment });
});

// --- Emopulse API: /api/grounding ---
app.post("/api/grounding", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const grounding = {
    stabilityLevel: Math.random().toFixed(2),
    centerShift: ["none", "slight", "strong"][Math.floor(Math.random() * 3)],
    recoverySpeed: Math.random().toFixed(2),
    anchorType: ["emotional", "cognitive", "external"][Math.floor(Math.random() * 3)],
    forecast: Math.random() > 0.5 ? "stabilizing" : "destabilizing"
  };

  res.json({ grounding });
});

// --- Emopulse API: /api/attunement ---
app.post("/api/attunement", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const attunement = {
    level: Math.random().toFixed(2),
    direction: Math.random() > 0.5 ? "aligning" : "misaligning",
    matchIndex: Math.random().toFixed(2),
    stability: Math.random().toFixed(2),
    type: ["emotional", "cognitive", "behavioral"][Math.floor(Math.random() * 3)]
  };

  res.json({ attunement });
});

// --- Emopulse API: /api/identity ---
app.post("/api/identity", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const identity = {
    type: ["stable", "fluid", "emerging", "fragmented"][Math.floor(Math.random() * 4)],
    stability: Math.random().toFixed(2),
    direction: Math.random() > 0.5 ? "integrating" : "shifting",
    maturity: Math.random().toFixed(2),
    consistency: Math.random().toFixed(2)
  };

  res.json({ identity });
});

// --- Emopulse API: /api/agency ---
app.post("/api/agency", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const agency = {
    level: Math.random().toFixed(2),
    senseOfControl: Math.random().toFixed(2),
    directionStrength: Math.random().toFixed(2),
    willStability: Math.random().toFixed(2),
    readiness: Math.random() > 0.5 ? "engaged" : "hesitant"
  };

  res.json({ agency });
});

// --- Emopulse API: /api/trajectory ---
app.post("/api/trajectory", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const trajectory = {
    direction: Math.random() > 0.5 ? "upward" : "downward",
    curve: ["linear", "exponential", "oscillating"][Math.floor(Math.random() * 3)],
    changeRate: Math.random().toFixed(2),
    stabilityForecast: Math.random() > 0.5 ? "stable" : "volatile",
    type: ["growth", "decline", "transition"][Math.floor(Math.random() * 3)]
  };

  res.json({ trajectory });
});

// --- Emopulse API: /api/echo ---
app.post("/api/echo", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const echo = {
    strength: Math.random().toFixed(2),
    direction: Math.random() > 0.5 ? "inward" : "outward",
    reflectionType: ["emotional", "cognitive", "mixed"][Math.floor(Math.random() * 3)],
    rebound: Math.random().toFixed(2),
    stability: Math.random().toFixed(2)
  };

  res.json({ echo });
});

// --- Emopulse API: /api/inner-voice ---
app.post("/api/inner-voice", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const innerVoice = {
    tone: ["gentle", "neutral", "harsh"][Math.floor(Math.random() * 3)],
    direction: Math.random() > 0.5 ? "supportive" : "critical",
    selfCriticism: Math.random().toFixed(2),
    selfSupport: Math.random().toFixed(2),
    stability: Math.random().toFixed(2)
  };

  res.json({ innerVoice });
});

// --- Emopulse API: /api/meta ---
app.post("/api/meta", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const meta = {
    clarity: Math.random().toFixed(2),
    selfMonitoring: Math.random().toFixed(2),
    separationSkill: Math.random().toFixed(2),
    stability: Math.random().toFixed(2),
    direction: Math.random() > 0.5 ? "expanding" : "contracting"
  };

  res.json({ meta });
});

// --- Emopulse API: /api/archetype ---
app.post("/api/archetype", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const archetype = {
    primary: ["warrior", "creator", "caregiver", "wanderer", "visionary", "shadow"][Math.floor(Math.random() * 6)],
    shadow: ["innocent", "saboteur", "critic", "rebel"][Math.floor(Math.random() * 4)],
    direction: Math.random() > 0.5 ? "ascending" : "descending",
    tension: Math.random().toFixed(2),
    dynamic: ["stable", "shifting", "emerging"][Math.floor(Math.random() * 3)]
  };

  res.json({ archetype });
});

// --- Emopulse API: /api/pulse ---
app.post("/api/pulse", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const pulse = {
    rhythm: ["steady", "irregular", "surging"][Math.floor(Math.random() * 3)],
    amplitude: Math.random().toFixed(2),
    stability: Math.random().toFixed(2),
    direction: Math.random() > 0.5 ? "rising" : "falling",
    intensity: Math.random().toFixed(2)
  };

  res.json({ pulse });
});

// --- Emopulse API: /api/field ---
app.post("/api/field", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const field = {
    intensity: Math.random().toFixed(2),
    direction: ["expanding", "contracting", "oscillating"][Math.floor(Math.random() * 3)],
    structure: ["coherent", "fragmented", "layered"][Math.floor(Math.random() * 3)],
    tension: Math.random().toFixed(2),
    dynamic: ["stable", "shifting", "volatile"][Math.floor(Math.random() * 3)]
  };

  res.json({ field });
});

// --- Emopulse API: /api/entropy ---
app.post("/api/entropy", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const entropy = {
    level: Math.random().toFixed(2),
    balance: ["order", "chaos", "mixed"][Math.floor(Math.random() * 3)],
    direction: Math.random() > 0.5 ? "increasing" : "decreasing",
    dispersion: Math.random().toFixed(2),
    stability: Math.random().toFixed(2)
  };

  res.json({ entropy });
});

// --- Emopulse API: /api/phase ---
app.post("/api/phase", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const phase = {
    type: ["activation", "processing", "integration", "release"][Math.floor(Math.random() * 4)],
    maturity: Math.random().toFixed(2),
    direction: Math.random() > 0.5 ? "advancing" : "regressing",
    intensity: Math.random().toFixed(2),
    stability: Math.random().toFixed(2)
  };

  res.json({ phase });
});

// --- Emopulse API: /api/charge ---
app.post("/api/charge", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const charge = {
    level: Math.random().toFixed(2),
    type: ["positive", "negative", "neutral"][Math.floor(Math.random() * 3)],
    direction: Math.random() > 0.5 ? "charging" : "discharging",
    density: Math.random().toFixed(2),
    stability: Math.random().toFixed(2)
  };

  res.json({ charge });
});

// --- Emopulse API: /api/charge ---
app.post("/api/charge", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const charge = {
    level: Math.random().toFixed(2),
    type: ["positive", "negative", "neutral"][Math.floor(Math.random() * 3)],
    direction: Math.random() > 0.5 ? "charging" : "discharging",
    density: Math.random().toFixed(2),
    stability: Math.random().toFixed(2)
  };

  res.json({ charge });
});

// --- Emopulse API: /api/vibration ---
app.post("/api/vibration", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const vibration = {
    frequency: Math.random().toFixed(2),
    amplitude: Math.random().toFixed(2),
    quality: ["smooth", "rough", "pulsing"][Math.floor(Math.random() * 3)],
    direction: Math.random() > 0.5 ? "ascending" : "descending",
    stability: Math.random().toFixed(2)
  };

  res.json({ vibration });
});

// --- Emopulse API: /api/flow ---
app.post("/api/flow", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const flow = {
    level: Math.random().toFixed(2),
    direction: ["forward", "backward", "cyclical"][Math.floor(Math.random() * 3)],
    resistance: Math.random().toFixed(2),
    smoothness: Math.random().toFixed(2),
    stability: Math.random().toFixed(2)
  };

  res.json({ flow });
});

// --- Emopulse API: /api/coherence ---
app.post("/api/coherence", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const coherence = {
    level: Math.random().toFixed(2),
    type: ["emotional", "cognitive", "integrated"][Math.floor(Math.random() * 3)],
    alignmentIndex: Math.random().toFixed(2),
    direction: Math.random() > 0.5 ? "strengthening" : "weakening",
    stability: Math.random().toFixed(2)
  };

  res.json({ coherence });
});

// --- Emopulse API: /api/resonance ---
app.post("/api/resonance", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const resonance = {
    strength: Math.random().toFixed(2),
    frequency: Math.random().toFixed(2),
    direction: ["inward", "outward", "cyclical"][Math.floor(Math.random() * 3)],
    quality: ["harmonic", "dissonant", "neutral"][Math.floor(Math.random() * 3)],
    stability: Math.random().toFixed(2)
  };

  res.json({ resonance });
});

// --- Emopulse API: /api/threshold ---
app.post("/api/threshold", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const threshold = {
    level: Math.random().toFixed(2),
    type: ["emotional", "cognitive", "behavioral"][Math.floor(Math.random() * 3)],
    transitionRisk: Math.random().toFixed(2),
    sensitivity: Math.random().toFixed(2),
    stability: Math.random().toFixed(2)
  };

  res.json({ threshold });
});

// --- Emopulse API: /api/activation ---
app.post("/api/activation", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const activation = {
    level: Math.random().toFixed(2),
    type: ["emotional", "cognitive", "somatic"][Math.floor(Math.random() * 3)],
    direction: Math.random() > 0.5 ? "increasing" : "decreasing",
    speed: Math.random().toFixed(2),
    stability: Math.random().toFixed(2)
  };

  res.json({ activation });
});

// --- Emopulse API: /api/pressure ---
app.post("/api/pressure", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const pressure = {
    level: Math.random().toFixed(2),
    type: ["emotional", "cognitive", "situational"][Math.floor(Math.random() * 3)],
    direction: Math.random() > 0.5 ? "increasing" : "decreasing",
    accumulationSpeed: Math.random().toFixed(2),
    stability: Math.random().toFixed(2)
  };

  res.json({ pressure });
});

// --- Emopulse API: /api/load ---
app.post("/api/load", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const load = {
    level: Math.random().toFixed(2),
    type: ["emotional", "cognitive", "situational"][Math.floor(Math.random() * 3)],
    distribution: ["balanced", "skewed-high", "skewed-low"][Math.floor(Math.random() * 3)],
    direction: Math.random() > 0.5 ? "increasing" : "decreasing",
    stability: Math.random().toFixed(2)
  };

  res.json({ load });
});

// --- Emopulse API: /api/volatility ---
app.post("/api/volatility", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const volatility = {
    level: Math.random().toFixed(2),
    type: ["emotional", "cognitive", "mixed"][Math.floor(Math.random() * 3)],
    amplitude: Math.random().toFixed(2),
    frequency: Math.random().toFixed(2),
    stability: Math.random().toFixed(2)
  };

  res.json({ volatility });
});

// --- Emopulse API: /api/fragmentation ---
app.post("/api/fragmentation", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const fragmentation = {
    level: Math.random().toFixed(2),
    type: ["emotional", "cognitive", "identity"][Math.floor(Math.random() * 3)],
    fragments: Math.floor(Math.random() * 5) + 1, // 1–5 fragmentai
    direction: Math.random() > 0.5 ? "increasing" : "decreasing",
    stability: Math.random().toFixed(2)
  };

  res.json({ fragmentation });
});

// --- Emopulse API: /api/grounding ---
app.post("/api/grounding", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const grounding = {
    level: Math.random().toFixed(2),
    type: ["somatic", "emotional", "cognitive"][Math.floor(Math.random() * 3)],
    bodyMindConnection: Math.random().toFixed(2),
    orientation: ["present", "dissociated", "drifting"][Math.floor(Math.random() * 3)],
    stability: Math.random().toFixed(2)
  };

  res.json({ grounding });
});

// --- Emopulse API: /api/clarity ---
app.post("/api/clarity", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const clarity = {
    level: Math.random().toFixed(2),
    type: ["emotional", "cognitive", "integrated"][Math.floor(Math.random() * 3)],
    sharpness: Math.random().toFixed(2),
    direction: Math.random() > 0.5 ? "increasing" : "decreasing",
    stability: Math.random().toFixed(2)
  };

  res.json({ clarity });
});

// --- Emopulse API: /api/intuition ---
app.post("/api/intuition", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const intuition = {
    level: Math.random().toFixed(2),
    type: ["emotional", "somatic", "cognitive"][Math.floor(Math.random() * 3)],
    signalClarity: Math.random().toFixed(2),
    direction: ["forward", "inward", "outward"][Math.floor(Math.random() * 3)],
    stability: Math.random().toFixed(2)
  };

  res.json({ intuition });
});

// --- Emopulse API: /api/instinct ---
app.post("/api/instinct", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const instinct = {
    level: Math.random().toFixed(2),
    type: ["fight", "flight", "freeze", "fawn"][Math.floor(Math.random() * 4)],
    direction: ["toward", "away", "neutral"][Math.floor(Math.random() * 3)],
    intensity: Math.random().toFixed(2),
    stability: Math.random().toFixed(2)
  };

  res.json({ instinct });
});

// --- Emopulse API: /api/drive ---
app.post("/api/drive", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const drive = {
    level: Math.random().toFixed(2),
    type: ["intrinsic", "extrinsic", "mixed"][Math.floor(Math.random() * 3)],
    direction: ["forward", "upward", "inward"][Math.floor(Math.random() * 3)],
    intensity: Math.random().toFixed(2),
    stability: Math.random().toFixed(2)
  };

  res.json({ drive });
});

// --- Emopulse API: /api/impulse ---
app.post("/api/impulse", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const impulse = {
    level: Math.random().toFixed(2),
    type: ["emotional", "behavioral", "somatic"][Math.floor(Math.random() * 3)],
    direction: ["toward", "away", "neutral"][Math.floor(Math.random() * 3)],
    speed: Math.random().toFixed(2),
    stability: Math.random().toFixed(2)
  };

  res.json({ impulse });
});

// --- Emopulse API: /api/urge ---
app.post("/api/urge", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const urge = {
    level: Math.random().toFixed(2),
    type: ["emotional", "instinctive", "habitual", "motivational"][Math.floor(Math.random() * 4)],
    direction: ["toward", "away", "neutral"][Math.floor(Math.random() * 3)],
    intensity: Math.random().toFixed(2),
    stability: Math.random().toFixed(2)
  };

  res.json({ urge });
});

// --- Emopulse API: /api/tension ---
app.post("/api/tension", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const tension = {
    level: Math.random().toFixed(2),
    type: ["emotional", "cognitive", "somatic"][Math.floor(Math.random() * 3)],
    source: ["internal", "external", "mixed"][Math.floor(Math.random() * 3)],
    direction: Math.random() > 0.5 ? "increasing" : "decreasing",
    stability: Math.random().toFixed(2)
  };

  res.json({ tension });
});

// --- Emopulse API: /api/stress ---
app.post("/api/stress", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field" });
  }

  // Placeholder logic — AI will replace this later
  const stress = {
    level: Math.random().toFixed(2),
    type: ["acute", "chronic", "ambient"][Math.floor(Math.random() * 3)],
    source: ["internal", "external", "mixed"][Math.floor(Math.random() * 3)],
    direction: Math.random() > 0.5 ? "increasing" : "decreasing",
    stability: Math.random().toFixed(2)
  };

  res.json({ stress });
});

<!DOCTYPE html> <html lang="en" class="emopulse-theme"> <head> <meta charset="UTF-8"> <title>Emopulse – Emotional AI Demo</title> <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- CSS: update path if filename differs --> <link rel="stylesheet" href="styles.css"> <link rel="icon" type="image/png" href="favicon.png"> <link rel="apple-touch-icon" href="favicon.png"> <meta name="theme-color" content="#0b0f1c"> </head> <body class="emopulse-theme"> <header class="emo-page-header"> <div class="emo-header-inner"> <div class="emo-logo-block"> <div class="emo-logo-mark"></div> <div class="emo-logo-text"> <span class="emo-logo-title">Emopulse</span> <span class="emo-logo-sub">Emotional AI that sees, feels, understands</span> </div> </div> <button class="ai-coach-button"> <div class="ai-coach-pulse"></div> <span>Ask Natasha</span> </button> </div> </header>

<main class="emo-main"> <!-- HERO / LIVE DEMO BAND --> <section class="hero-section"> <div class="hero-grid"> <!-- Left: Aura + Drift --> <div class="hero-visual"> <div class="emo-card"> <div class="emo-card-header"> <div class="emo-card-title">Live emotional radar</div> <span class="emo-pill emo-tag-soft">Demo mode</span> </div> <div class="emo-hero-visual-row"> <!-- Aura --> <div class="emo-aura-wrapper calm"> <div class="emo-aura-ring"></div> <div class="emo-aura-ring"></div> <div class="emo-aura-ring"></div> <div class="emo-aura-core"></div> </div> <!-- Drift spiral --> <div class="drift-core"> <div class="drift-spiral-shell"> <div class="drift-layer"></div> <div class="drift-layer"></div> <div class="drift-layer"></div> <div class="drift-spiral calm strong"></div> <div class="drift-spiral-orbit"> <div class="drift-spiral-dot"></div> </div> </div> <div> <div class="drift-label">Emotional drift</div> <div class="drift-value positive">+12%</div> <div class="drift-caption">Calmness increasing</div> </div> </div> </div> <div class="scenario-buttons"> <button class="scenario-button">Smile</button> <button class="scenario-button">Neutral</button> <button class="scenario-button">Stress</button> <button class="scenario-button">High stress</button> <button class="scenario-button">Calm mode</button> <button class="scenario-button">Focus mode</button> </div> </div> </div>

    <!-- Right: Copy + Score + Weather -->
    <div class="hero-copy">
      <div class="emo-card">
        <div class="emo-card-header">
          <div class="emo-card-title">Emotional AI demo</div>
          <span class="emo-pill emo-tag-soft">Prototype ● LLM + signals</span>
        </div>
        <h1 class="hero-title">
          Real-time emotional intelligence<br>
          from your camera & micro-signals
        </h1>
        <p class="hero-subtitle">
          Emopulse transforms pulse, micro-signals, and context into a living emotional dashboard: drift, stability, risk, and narrative – in seconds.
        </p>
        <div class="hero-cta-row">
          <button class="ai-coach-button">
            <div class="ai-coach-pulse"></div>
            <span>Try live demo</span>
          </button>
          <div class="emotional-signature-pill">
            <div class="emotional-signature-dot"></div>
            <span>Today’s emotional signature: Calm Focused Energy</span>
          </div>
        </div>
      </div>

      <div class="hero-metrics-row">
        <div class="emopulse-score-card">
          <div class="emopulse-score-label">Emopulse Score</div>
          <div class="emopulse-score-value">78 / 100</div>
          <div class="emopulse-score-bar">
            <div class="emopulse-score-bar-fill"></div>
          </div>
        </div>

        <div class="emotional-weather-card">
          <div class="emo-card-header">
            <div class="emo-card-title">Emotional weather</div>
          </div>
          <div class="emo-flex emo-flex-between">
            <div>
              <div class="emotional-weather-main">Clear with a chance of focus</div>
              <div class="emotional-weather-tag">short-term outlook: low stress, rising clarity</div>
            </div>
            <div class="emotional-weather-icon calm">
              <!-- icon can be added later -->
            </div>
          </div>
        </div>
      </div>

      <div class="privacy-banner">
        We never store your data. All processing is real-time. You stay in control.
      </div>
    </div>
  </div>
</section>

<!-- MINI DASHBOARD LAYER -->
<section class="section-block" id="mini-dashboard">
  <h2>Mini dashboard</h2>
  <div class="mini-dashboard">
    <div class="mini-metric-card">
      <div class="mini-metric-label">Pulse</div>
      <div class="mini-metric-value">74 bpm</div>
      <div class="mini-metric-pill">Signal quality: high</div>
    </div>
    <div class="mini-metric-card">
      <div class="mini-metric-label">Emotion</div>
      <div class="mini-metric-value">Calm</div>
      <div class="mini-metric-pill">Valence: positive</div>
    </div>
    <div class="mini-metric-card">
      <div class="mini-metric-label">Confidence</div>
      <div class="mini-metric-value">91%</div>
      <div class="mini-metric-pill">Stable pattern</div>
    </div>
    <div class="mini-metric-card">
      <div class="mini-metric-label">Stress risk</div>
      <div class="mini-metric-value">18 / 100</div>
      <div class="mini-metric-pill">Low & contained</div>
    </div>
  </div>
</section>

<!-- MOOD MAP + TIMELINE -->
<section class="section-block" id="mood-map-timeline">
  <h2>Emotional map & timeline</h2>
  <div class="emo-grid emo-grid-2">
    <!-- Mood Map -->
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Mood map</div>
        <span class="emo-pill emo-tag-soft">Valence / arousal</span>
      </div>
      <div class="mood-map">
        <div class="mood-map-grid"></div>
        <div class="mood-map-axis-label top">High arousal</div>
        <div class="mood-map-axis-label bottom">Low arousal</div>
        <div class="mood-map-axis-label left">Negative</div>
        <div class="mood-map-axis-label right">Positive</div>
        <div class="mood-map-dot" style="left: 65%; top: 42%;"></div>
      </div>
    </div>

    <!-- Timeline -->
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Emotion timeline</div>
        <span class="emo-pill emo-tag-soft">Last 60 seconds</span>
      </div>
      <div class="emotion-timeline">
        <div class="emotion-timeline-track">
          <div class="emotion-timeline-progress" style="transform: scaleX(1);"></div>
          <div class="emotion-timeline-emotion-dot calm" style="left: 10%;"></div>
          <div class="emotion-timeline-emotion-dot focus" style="left: 35%;"></div>
          <div class="emotion-timeline-emotion-dot stress" style="left: 58%;"></div>
          <div class="emotion-timeline-emotion-dot calm" style="left: 82%;"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- EMOTION RINGS + HEATMAP -->
<section class="section-block" id="rings-heatmap">
  <h2>Rings & heatmap</h2>
  <div class="emo-grid emo-grid-2">
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Emotion rings</div>
        <span class="emo-pill emo-tag-soft">Calm / Focus / Stress</span>
      </div>
      <div class="emotion-rings animate">
        <div class="emotion-ring calm"></div>
        <div class="emotion-ring focus"></div>
        <div class="emotion-ring stress"></div>
        <div class="emotion-ring joy"></div>
      </div>
    </div>

    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Emotion heatmap</div>
        <span class="emo-pill emo-tag-soft">Intensity over time</span>
      </div>
      <div class="emotion-heatmap">
        <!-- fake pattern -->
        <div class="emotion-heatmap-cell low"></div>
        <div class="emotion-heatmap-cell low"></div>
        <div class="emotion-heatmap-cell medium"></div>
        <div class="emotion-heatmap-cell high"></div>
        <div class="emotion-heatmap-cell medium"></div>
        <div class="emotion-heatmap-cell low"></div>
        <div class="emotion-heatmap-cell low"></div>
        <div class="emotion-heatmap-cell medium"></div>
        <div class="emotion-heatmap-cell high"></div>
        <div class="emotion-heatmap-cell high"></div>
        <div class="emotion-heatmap-cell medium"></div>
        <div class="emotion-heatmap-cell low"></div>
        <!-- more small cells can be duplicated -->
      </div>
    </div>
  </div>
</section>

<!-- EXPERIENCE LAYER: STORY, CHALLENGE, STREAKS, MILESTONES -->
<section class="section-block" id="experience-layer">
  <h2>Experience layer</h2>
  <div class="emo-grid emo-grid-2">
    <!-- Emotion Story -->
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Emotion story</div>
      </div>
      <div class="emotion-challenge">
        <div class="emotion-challenge-label">Session narrative</div>
        <p>Your emotional journey today began in calmness.</p>
        <p>You transitioned into focused clarity.</p>
        <p>A brief stress spike appeared but resolved quickly.</p>
      </div>
    </div>

    <!-- Emotion Challenge -->
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Emotion challenge</div>
      </div>
      <div class="emotion-challenge">
        <div class="emotion-challenge-label">Challenge</div>
        <p>Hold calmness for 60 seconds.</p>
        <button class="scenario-button">Start challenge</button>
      </div>
    </div>
  </div>

  <div class="emo-grid emo-grid-2" style="margin-top: 16px;">
    <!-- Emotion streaks -->
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Emotion streaks</div>
      </div>
      <div class="emotion-streaks">
        <div class="streak-item">
          <span class="streak-label">Calm streak</span>
          <span class="streak-value">3 days</span>
        </div>
        <div class="streak-item">
          <span class="streak-label">Focus streak</span>
          <span class="streak-value">1 day</span>
        </div>
      </div>
    </div>

    <!-- Emotional milestones -->
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Emotional milestones</div>
      </div>
      <div class="emotion-badges">
        <div class="emotion-badge calm">Calm Master</div>
        <div class="emotion-badge focus">Focus Achiever</div>
        <div class="emotion-badge stress">Stress Recovery</div>
      </div>
    </div>
  </div>
</section>

<!-- AI COACH + INSIGHTS -->
<section class="section-block" id="ai-coach-layer">
  <h2>AI insights & coach</h2>
  <div class="emo-grid emo-grid-2">
    <!-- AI Reflection -->
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">AI reflection</div>
      </div>
      <div class="emotion-challenge">
        <p>“Your emotional flow today shows resilience.”</p>
        <p>“You adapted well to stress fluctuations.”</p>
      </div>
    </div>

    <!-- AI Mood Coach -->
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">AI mood coach</div>
      </div>
      <p class="hero-subtitle" style="margin-bottom: 12px;">
        Ask: <em>“What should I do now?”</em> and get a short, emotionally precise suggestion.
      </p>
      <button class="ai-coach-button">
        <div class="ai-coach-pulse"></div>
        <span>What should I do now?</span>
      </button>
    </div>
  </div>
</section>

<!-- EMOTIONAL COMPASS & TAGS & MINI REPORT -->
<section class="section-block" id="compass-tags-report">
  <h2>Compass, tags & mini report</h2>
  <div class="emo-grid emo-grid-3">
    <!-- Compass -->
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Emotional compass</div>
      </div>
      <div class="focus-mode-overlay">
        <div class="session-tags">
          <span class="session-tag">Calm</span>
          <span class="session-tag">Joy</span>
          <span class="session-tag">Focus</span>
          <span class="session-tag">Stress</span>
        </div>
        <p style="margin-top: 10px; font-size: 13px;">
          Current heading: calm + focus, low stress, high stability.
        </p>
      </div>
    </div>

    <!-- Session tags -->
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Session tags</div>
      </div>
      <div class="session-tags">
        <span class="session-tag">calm</span>
        <span class="session-tag">focused</span>
        <span class="session-tag">stable</span>
        <span class="session-tag">low stress</span>
      </div>
    </div>

    <!-- Mini report -->
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Mini emotional report</div>
      </div>
      <div class="mini-report">
        <div class="report-item">
          <span class="label">Peak calm</span>
          <span class="value">82%</span>
        </div>
        <div class="report-item">
          <span class="label">Focus duration</span>
          <span class="value">14 min</span>
        </div>
        <div class="report-item">
          <span class="label">Stress recovery</span>
          <span class="value">Fast</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- EMOTIONAL AURA / DNA / TRAIL / BREATH -->
<section class="section-block" id="visual-layer">
  <h2>Visual emotional layer</h2>
  <div class="emo-grid emo-grid-2">
    <!-- Aura + DNA -->
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Emotional aura & DNA</div>
      </div>
      <div class="emo-flex" style="gap: 18px; align-items: center;">
        <div class="emo-aura-wrapper calm">
          <div class="emo-aura-ring"></div>
          <div class="emo-aura-ring"></div>
          <div class="emo-aura-ring"></div>
          <div class="emo-aura-core"></div>
        </div>
        <div class="emotion-dna">
          <div class="dna-strand">A — Calm</div>
          <div class="dna-strand">T — Focus</div>
          <div class="dna-strand">G — Stability</div>
          <div class="dna-strand">C — Recovery</div>
        </div>
      </div>
    </div>

    <!-- Trail + Calm Breath -->
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Trail & calm breath</div>
      </div>
      <div class="emotion-trail">
        <div class="trail-step">Calm → Focus</div>
        <div class="trail-step">Focus → Stress</div>
        <div class="trail-step">Stress → Calm</div>
      </div>
      <div class="calm-breath" style="margin-top: 14px;">
        <div class="breath-circle"></div>
        <p class="breath-instruction">Inhale… Exhale…</p>
      </div>
    </div>
  </div>
</section>

<!-- NATASHA SIGNATURE + HORIZON -->
<section class="section-block" id="natasha-layer">
  <h2>Natasha layer</h2>
  <div class="emo-grid emo-grid-2">
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Natasha signature</div>
      </div>
      <div class="emotion-challenge">
        <p>Soft intuition. Deep clarity. Emotional precision.</p>
        <p>Your companion’s unique emotional fingerprint.</p>
      </div>
    </div>
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Emotional horizon</div>
      </div>
      <div class="emotion-challenge">
        <p>Your emotional trajectory is expanding toward clarity.</p>
        <p>Long-term trend: steady growth in calmness and focus.</p>
      </div>
    </div>
  </div>
</section>

<!-- ROADMAP -->
<section class="section-block" id="roadmap">
  <h2>Roadmap</h2>
  <div class="emo-card">
    <div class="emo-card-header">
      <div class="emo-card-title">From demo to platform</div>
    </div>
    <div class="emo-grid">
      <div class="roadmap-phase">
        <div class="roadmap-phase-dot"></div>
        <span>Phase 1: PPG + LLM (done)</span>
      </div>
      <div class="roadmap-phase">
        <div class="roadmap-phase-dot"></div>
        <span>Phase 2: Face + Voice</span>
      </div>
      <div class="roadmap-phase">
        <div class="roadmap-phase-dot"></div>
        <span>Phase 3: Multimodal fusion</span>
      </div>
      <div class="roadmap-phase">
        <div class="roadmap-phase-dot"></div>
        <span>Phase 4: AI Coach</span>
      </div>
      <div class="roadmap-phase">
        <div class="roadmap-phase-dot"></div>
        <span>Phase 5: Emotional OS platform</span>
      </div>
    </div>
  </div>
</section>

</main>

<footer class="emo-page-footer"> <div class="emo-footer-inner"> <span>Emopulse · Emotional AI prototype</span> <span>Built around privacy, clarity and emotional resonance.</span> </div> </footer> </body> </html> <!DOCTYPE html> <html lang="en" class="emopulse-theme"> <head> <meta charset="UTF-8"> <title>Emopulse – Emotional AI Demo</title> <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- CSS: update path if filename differs --> <link rel="stylesheet" href="styles.css"> <link rel="icon" type="image/png" href="favicon.png"> <link rel="apple-touch-icon" href="favicon.png"> <meta name="theme-color" content="#0b0f1c"> </head> <body class="emopulse-theme"> <header class="emo-page-header"> <div class="emo-header-inner"> <div class="emo-logo-block"> <div class="emo-logo-mark"></div> <div class="emo-logo-text"> <span class="emo-logo-title">Emopulse</span> <span class="emo-logo-sub">Emotional AI that sees, feels, understands</span> </div> </div> <button class="ai-coach-button"> <div class="ai-coach-pulse"></div> <span>Ask Natasha</span> </button> </div> </header>

<main class="emo-main"> <!-- HERO / LIVE DEMO BAND --> <section class="hero-section"> <div class="hero-grid"> <!-- Left: Aura + Drift --> <div class="hero-visual"> <div class="emo-card"> <div class="emo-card-header"> <div class="emo-card-title">Live emotional radar</div> <span class="emo-pill emo-tag-soft">Demo mode</span> </div> <div class="emo-hero-visual-row"> <!-- Aura --> <div class="emo-aura-wrapper calm"> <div class="emo-aura-ring"></div> <div class="emo-aura-ring"></div> <div class="emo-aura-ring"></div> <div class="emo-aura-core"></div> </div> <!-- Drift spiral --> <div class="drift-core"> <div class="drift-spiral-shell"> <div class="drift-layer"></div> <div class="drift-layer"></div> <div class="drift-layer"></div> <div class="drift-spiral calm strong"></div> <div class="drift-spiral-orbit"> <div class="drift-spiral-dot"></div> </div> </div> <div> <div class="drift-label">Emotional drift</div> <div class="drift-value positive">+12%</div> <div class="drift-caption">Calmness increasing</div> </div> </div> </div> <div class="scenario-buttons"> <button class="scenario-button">Smile</button> <button class="scenario-button">Neutral</button> <button class="scenario-button">Stress</button> <button class="scenario-button">High stress</button> <button class="scenario-button">Calm mode</button> <button class="scenario-button">Focus mode</button> </div> </div> </div>

    <!-- Right: Copy + Score + Weather -->
    <div class="hero-copy">
      <div class="emo-card">
        <div class="emo-card-header">
          <div class="emo-card-title">Emotional AI demo</div>
          <span class="emo-pill emo-tag-soft">Prototype ● LLM + signals</span>
        </div>
        <h1 class="hero-title">
          Real-time emotional intelligence<br>
          from your camera & micro-signals
        </h1>
        <p class="hero-subtitle">
          Emopulse transforms pulse, micro-signals, and context into a living emotional dashboard: drift, stability, risk, and narrative – in seconds.
        </p>
        <div class="hero-cta-row">
          <button class="ai-coach-button">
            <div class="ai-coach-pulse"></div>
            <span>Try live demo</span>
          </button>
          <div class="emotional-signature-pill">
            <div class="emotional-signature-dot"></div>
            <span>Today’s emotional signature: Calm Focused Energy</span>
          </div>
        </div>
      </div>

      <div class="hero-metrics-row">
        <div class="emopulse-score-card">
          <div class="emopulse-score-label">Emopulse Score</div>
          <div class="emopulse-score-value">78 / 100</div>
          <div class="emopulse-score-bar">
            <div class="emopulse-score-bar-fill"></div>
          </div>
        </div>

        <div class="emotional-weather-card">
          <div class="emo-card-header">
            <div class="emo-card-title">Emotional weather</div>
          </div>
          <div class="emo-flex emo-flex-between">
            <div>
              <div class="emotional-weather-main">Clear with a chance of focus</div>
              <div class="emotional-weather-tag">short-term outlook: low stress, rising clarity</div>
            </div>
            <div class="emotional-weather-icon calm">
              <!-- icon can be added later -->
            </div>
          </div>
        </div>
      </div>

      <div class="privacy-banner">
        We never store your data. All processing is real-time. You stay in control.
      </div>
    </div>
  </div>
</section>

<!-- MINI DASHBOARD LAYER -->
<section class="section-block" id="mini-dashboard">
  <h2>Mini dashboard</h2>
  <div class="mini-dashboard">
    <div class="mini-metric-card">
      <div class="mini-metric-label">Pulse</div>
      <div class="mini-metric-value">74 bpm</div>
      <div class="mini-metric-pill">Signal quality: high</div>
    </div>
    <div class="mini-metric-card">
      <div class="mini-metric-label">Emotion</div>
      <div class="mini-metric-value">Calm</div>
      <div class="mini-metric-pill">Valence: positive</div>
    </div>
    <div class="mini-metric-card">
      <div class="mini-metric-label">Confidence</div>
      <div class="mini-metric-value">91%</div>
      <div class="mini-metric-pill">Stable pattern</div>
    </div>
    <div class="mini-metric-card">
      <div class="mini-metric-label">Stress risk</div>
      <div class="mini-metric-value">18 / 100</div>
      <div class="mini-metric-pill">Low & contained</div>
    </div>
  </div>
</section>

<!-- MOOD MAP + TIMELINE -->
<section class="section-block" id="mood-map-timeline">
  <h2>Emotional map & timeline</h2>
  <div class="emo-grid emo-grid-2">
    <!-- Mood Map -->
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Mood map</div>
        <span class="emo-pill emo-tag-soft">Valence / arousal</span>
      </div>
      <div class="mood-map">
        <div class="mood-map-grid"></div>
        <div class="mood-map-axis-label top">High arousal</div>
        <div class="mood-map-axis-label bottom">Low arousal</div>
        <div class="mood-map-axis-label left">Negative</div>
        <div class="mood-map-axis-label right">Positive</div>
        <div class="mood-map-dot" style="left: 65%; top: 42%;"></div>
      </div>
    </div>

    <!-- Timeline -->
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Emotion timeline</div>
        <span class="emo-pill emo-tag-soft">Last 60 seconds</span>
      </div>
      <div class="emotion-timeline">
        <div class="emotion-timeline-track">
          <div class="emotion-timeline-progress" style="transform: scaleX(1);"></div>
          <div class="emotion-timeline-emotion-dot calm" style="left: 10%;"></div>
          <div class="emotion-timeline-emotion-dot focus" style="left: 35%;"></div>
          <div class="emotion-timeline-emotion-dot stress" style="left: 58%;"></div>
          <div class="emotion-timeline-emotion-dot calm" style="left: 82%;"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- EMOTION RINGS + HEATMAP -->
<section class="section-block" id="rings-heatmap">
  <h2>Rings & heatmap</h2>
  <div class="emo-grid emo-grid-2">
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Emotion rings</div>
        <span class="emo-pill emo-tag-soft">Calm / Focus / Stress</span>
      </div>
      <div class="emotion-rings animate">
        <div class="emotion-ring calm"></div>
        <div class="emotion-ring focus"></div>
        <div class="emotion-ring stress"></div>
        <div class="emotion-ring joy"></div>
      </div>
    </div>

    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Emotion heatmap</div>
        <span class="emo-pill emo-tag-soft">Intensity over time</span>
      </div>
      <div class="emotion-heatmap">
        <!-- fake pattern -->
        <div class="emotion-heatmap-cell low"></div>
        <div class="emotion-heatmap-cell low"></div>
        <div class="emotion-heatmap-cell medium"></div>
        <div class="emotion-heatmap-cell high"></div>
        <div class="emotion-heatmap-cell medium"></div>
        <div class="emotion-heatmap-cell low"></div>
        <div class="emotion-heatmap-cell low"></div>
        <div class="emotion-heatmap-cell medium"></div>
        <div class="emotion-heatmap-cell high"></div>
        <div class="emotion-heatmap-cell high"></div>
        <div class="emotion-heatmap-cell medium"></div>
        <div class="emotion-heatmap-cell low"></div>
        <!-- more small cells can be duplicated -->
      </div>
    </div>
  </div>
</section>

<!-- EXPERIENCE LAYER: STORY, CHALLENGE, STREAKS, MILESTONES -->
<section class="section-block" id="experience-layer">
  <h2>Experience layer</h2>
  <div class="emo-grid emo-grid-2">
    <!-- Emotion Story -->
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Emotion story</div>
      </div>
      <div class="emotion-challenge">
        <div class="emotion-challenge-label">Session narrative</div>
        <p>Your emotional journey today began in calmness.</p>
        <p>You transitioned into focused clarity.</p>
        <p>A brief stress spike appeared but resolved quickly.</p>
      </div>
    </div>

    <!-- Emotion Challenge -->
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Emotion challenge</div>
      </div>
      <div class="emotion-challenge">
        <div class="emotion-challenge-label">Challenge</div>
        <p>Hold calmness for 60 seconds.</p>
        <button class="scenario-button">Start challenge</button>
      </div>
    </div>
  </div>

  <div class="emo-grid emo-grid-2" style="margin-top: 16px;">
    <!-- Emotion streaks -->
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Emotion streaks</div>
      </div>
      <div class="emotion-streaks">
        <div class="streak-item">
          <span class="streak-label">Calm streak</span>
          <span class="streak-value">3 days</span>
        </div>
        <div class="streak-item">
          <span class="streak-label">Focus streak</span>
          <span class="streak-value">1 day</span>
        </div>
      </div>
    </div>

    <!-- Emotional milestones -->
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Emotional milestones</div>
      </div>
      <div class="emotion-badges">
        <div class="emotion-badge calm">Calm Master</div>
        <div class="emotion-badge focus">Focus Achiever</div>
        <div class="emotion-badge stress">Stress Recovery</div>
      </div>
    </div>
  </div>
</section>

<!-- AI COACH + INSIGHTS -->
<section class="section-block" id="ai-coach-layer">
  <h2>AI insights & coach</h2>
  <div class="emo-grid emo-grid-2">
    <!-- AI Reflection -->
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">AI reflection</div>
      </div>
      <div class="emotion-challenge">
        <p>“Your emotional flow today shows resilience.”</p>
        <p>“You adapted well to stress fluctuations.”</p>
      </div>
    </div>

    <!-- AI Mood Coach -->
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">AI mood coach</div>
      </div>
      <p class="hero-subtitle" style="margin-bottom: 12px;">
        Ask: <em>“What should I do now?”</em> and get a short, emotionally precise suggestion.
      </p>
      <button class="ai-coach-button">
        <div class="ai-coach-pulse"></div>
        <span>What should I do now?</span>
      </button>
    </div>
  </div>
</section>

<!-- EMOTIONAL COMPASS & TAGS & MINI REPORT -->
<section class="section-block" id="compass-tags-report">
  <h2>Compass, tags & mini report</h2>
  <div class="emo-grid emo-grid-3">
    <!-- Compass -->
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Emotional compass</div>
      </div>
      <div class="focus-mode-overlay">
        <div class="session-tags">
          <span class="session-tag">Calm</span>
          <span class="session-tag">Joy</span>
          <span class="session-tag">Focus</span>
          <span class="session-tag">Stress</span>
        </div>
        <p style="margin-top: 10px; font-size: 13px;">
          Current heading: calm + focus, low stress, high stability.
        </p>
      </div>
    </div>

    <!-- Session tags -->
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Session tags</div>
      </div>
      <div class="session-tags">
        <span class="session-tag">calm</span>
        <span class="session-tag">focused</span>
        <span class="session-tag">stable</span>
        <span class="session-tag">low stress</span>
      </div>
    </div>

    <!-- Mini report -->
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Mini emotional report</div>
      </div>
      <div class="mini-report">
        <div class="report-item">
          <span class="label">Peak calm</span>
          <span class="value">82%</span>
        </div>
        <div class="report-item">
          <span class="label">Focus duration</span>
          <span class="value">14 min</span>
        </div>
        <div class="report-item">
          <span class="label">Stress recovery</span>
          <span class="value">Fast</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- EMOTIONAL AURA / DNA / TRAIL / BREATH -->
<section class="section-block" id="visual-layer">
  <h2>Visual emotional layer</h2>
  <div class="emo-grid emo-grid-2">
    <!-- Aura + DNA -->
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Emotional aura & DNA</div>
      </div>
      <div class="emo-flex" style="gap: 18px; align-items: center;">
        <div class="emo-aura-wrapper calm">
          <div class="emo-aura-ring"></div>
          <div class="emo-aura-ring"></div>
          <div class="emo-aura-ring"></div>
          <div class="emo-aura-core"></div>
        </div>
        <div class="emotion-dna">
          <div class="dna-strand">A — Calm</div>
          <div class="dna-strand">T — Focus</div>
          <div class="dna-strand">G — Stability</div>
          <div class="dna-strand">C — Recovery</div>
        </div>
      </div>
    </div>

    <!-- Trail + Calm Breath -->
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Trail & calm breath</div>
      </div>
      <div class="emotion-trail">
        <div class="trail-step">Calm → Focus</div>
        <div class="trail-step">Focus → Stress</div>
        <div class="trail-step">Stress → Calm</div>
      </div>
      <div class="calm-breath" style="margin-top: 14px;">
        <div class="breath-circle"></div>
        <p class="breath-instruction">Inhale… Exhale…</p>
      </div>
    </div>
  </div>
</section>

<!-- NATASHA SIGNATURE + HORIZON -->
<section class="section-block" id="natasha-layer">
  <h2>Natasha layer</h2>
  <div class="emo-grid emo-grid-2">
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Natasha signature</div>
      </div>
      <div class="emotion-challenge">
        <p>Soft intuition. Deep clarity. Emotional precision.</p>
        <p>Your companion’s unique emotional fingerprint.</p>
      </div>
    </div>
    <div class="emo-card">
      <div class="emo-card-header">
        <div class="emo-card-title">Emotional horizon</div>
      </div>
      <div class="emotion-challenge">
        <p>Your emotional trajectory is expanding toward clarity.</p>
        <p>Long-term trend: steady growth in calmness and focus.</p>
      </div>
    </div>
  </div>
</section>

<!-- ROADMAP -->
<section class="section-block" id="roadmap">
  <h2>Roadmap</h2>
  <div class="emo-card">
    <div class="emo-card-header">
      <div class="emo-card-title">From demo to platform</div>
    </div>
    <div class="emo-grid">
      <div class="roadmap-phase">
        <div class="roadmap-phase-dot"></div>
        <span>Phase 1: PPG + LLM (done)</span>
      </div>
      <div class="roadmap-phase">
        <div class="roadmap-phase-dot"></div>
        <span>Phase 2: Face + Voice</span>
      </div>
      <div class="roadmap-phase">
        <div class="roadmap-phase-dot"></div>
        <span>Phase 3: Multimodal fusion</span>
      </div>
      <div class="roadmap-phase">
        <div class="roadmap-phase-dot"></div>
        <span>Phase 4: AI Coach</span>
      </div>
      <div class="roadmap-phase">
        <div class="roadmap-phase-dot"></div>
        <span>Phase 5: Emotional OS platform</span>
      </div>
    </div>
  </div>
</section>

</main>

<footer class="emo-page-footer"> <div class="emo-footer-inner"> <span>Emopulse · Emotional AI prototype</span> <span>Built around privacy, clarity and emotional resonance.</span> </div> </footer> </body> </html>
