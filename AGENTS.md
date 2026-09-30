# AGENTS.md — Autonomous Agent Operating Manual

This document provides operational rules, runtime constraints, and programmatic patterns for AI agents (coding engines, sub-agents, and automated CI workers) modifying or extending **The Mirror of Spheres**.

---

## ⚡ Agent Mission Statement

Your primary objective is to maintain mathematical rigor, strict type safety, zero context drift, and aesthetic consistency across the 360° Zodiac wheel, the 72 Decan Gates, the procedural audio synthesis engine, and the Veo 3 generative pipeline.

---

## 🔒 Security & Environment Boundaries

1. **API Keys**:
   - `GEMINI_API_KEY` is injected server-side.
   - Never expose API keys in client-side code, `window` objects, or client-side fetch headers.
   - All external Google GenAI calls must originate from `server.ts` or `scripts/mirror_engine_generator.py`.
2. **Server-Side Proxy**:
   - Web frontend communicates with backend routes via `/api/*`.
   - Never create client UI for entering API keys.
3. **Port & Runtime**:
   - Dev server runs on port `3000` via `tsx server.ts`.
   - Avoid `window.alert` or `window.open` in preview environments.

---

## 🧠 System Prompt Injection Protocol

When an agent needs to prompt Veo 3 or Gemini for cosmological operations, the prompt MUST follow the **3-Layer Structure**:

### 1. Injected System Directive
```json
{
  "AestheticProfile": "Dark-Gothic Sumerian Futurism. High-contrast chiaroscuro, cosmic voids, mirror-polished basalt megaliths, glowing crimson energy veins.",
  "TemporalAxiom": {
    "TotalDurationSeconds": 600,
    "ZodiacPhaseDurationSeconds": 50,
    "GateNodeIntervalSeconds": 8.33
  },
  "CoreExecutionRules": [
    "RECURSIVE_CONTINUITY: Enforce pixel-level optical flow consistency. Ensure Frame_Start(k) perfectly anchors to Frame_End(k-1). Zero micro-cuts.",
    "DUAL_ENTITY_ANCHORING: Dynamically embed subtle Shem wing motifs and Goetia horn motifs into the environment geometry during each 8.33s node loop.",
    "AXIS_OPPOSITION: Force absolute structural and acoustic inversion at exactly 300 seconds (5:00 / Gate 37 Libra) relative to 0 seconds (0:00 / Gate 1 Aries)."
  ]
}
```

### 2. Zero-Hallucination Entity Validation
All 72 gate nodes are canonically fixed:
- **Gate 1**: Vehuiah & Bael
- **Gate 37**: Aniel & Phenex (Axis Opposition at 180° / 300s)
- **Gate 48**: Mihael & Haagenti (240° Seam Breach at 6:40 / 400s)
- **Gate 72**: Mumiah & Andromalius (Loop closure at 360° / 600s)

Never invent angel names, demon names, or arbitrary frequencies. If modifying gate data, cross-check against `src/data/cosmologyData.ts` and `scripts/mirror_engine_generator.py`.

---

## 📹 Veo 3 Implementation Rules

- **Target Model**: `veo-3.1-fast-generate-preview`.
- **Supported Aspect Ratios**: Strictly `'16:9'` or `'9:16'`.
- **Resolution**: `'720p'`.
- **Flow Pattern**:
  ```
  POST /api/generate-video -> { operationName }
  POST /api/video-status   -> { done, error }
  POST /api/video-download -> binary MP4 stream
  ```
- **Timeouts**: Video rendering typically takes 60–120 seconds. Poll with exponential or 10-second intervals for up to 600 seconds.

---

## 🎵 Audio Synthesizer Discipline

1. **Web Audio API Lifecycle**:
   - `AudioContext` must only be initialized or resumed upon user interaction (`soundEngine.init()`).
   - All active oscillators and interval timers must be safely stopped and disposed in `stopCurrentActNodes()`.
2. **Frequency Locking**:
   - Gate frequencies must respect the dual polarity: Angelic Solfeggio / high harmonic ($285\text{Hz}–1023\text{Hz}$) and Chthonic sub-harmonic ($40\text{Hz}–180\text{Hz}$).

---

## 🛠️ Validation Checklist for Agents

When creating, editing, or validating features:

1. [ ] Run `npm run lint` (`tsc --noEmit`) to verify zero TypeScript errors.
2. [ ] Run `npm run build` (`vite build`) to verify clean production bundle output.
3. [ ] Verify `/api/health` returns `200 OK`.
4. [ ] Verify `python3 scripts/mirror_engine_generator.py --dry-run --gate 48` executes cleanly.
5. [ ] Ensure all 72 gates are present in JSON export and interactive components.
