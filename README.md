# Emopulse

Emopulse is a multi-modal emotional analysis engine designed to interpret and synthesize emotional signals across face, voice, text, and character inputs. Built for real-time feedback, expressive AI, and emotionally intelligent applications.

## Modules

### 🧠 Text Analysis
- Natural language emotion classification
- Sentiment scoring and tone detection
- Contextual nuance parsing (e.g. sarcasm, metaphor)

### 🎭 Character Engine
- Personality modeling from dialogue
- Emotional continuity tracking
- Bidirectional feedback simulation

### 🗣️ Voice Analysis
- Prosody and intonation mapping
- Emotion detection from vocal features
- Real-time audio stream support

### 👁️ Face Analysis
- Facial expression recognition
- Micro-expression tracking
- Multi-frame emotional synthesis

## Setup

### Cloud Run Deployment
1. Clone the repository:
   ```bash
   git clone https://github.com/gv66co/emopulse.git
   cd emopulse

   gcloud builds submit --tag gcr.io/[PROJECT-ID]/emopulse
gcloud run deploy emopulse --image gcr.io/[PROJECT-ID]/emopulse --platform managed

{
  "text": "I’m feeling optimistic about the future.",
  "voice_url": "https://example.com/audio.wav",
  "face_url": "https://example.com/frame.jpg",
  "character_context": "long-term dialogue memory"
}

{
  "emotion": "joy",
  "confidence": 0.92,
  "modalities": {
    "text": { "emotion": "joy", "confidence": 0.88 },
    "voice": { "emotion": "calm", "confidence": 0.81 },
    "face": { "emotion": "neutral", "confidence": 0.73 },
    "character": { "traits": ["warm", "optimistic"] }
  }
}

API Endpoints
POST /analyze
Runs multi-modal emotional analysis.
GET /health
Health check endpoint.
GET /version
Returns deployed model and build version.
License
MIT License. See the LICENSE file for details.

