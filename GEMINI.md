# GEMINI.md — Canonical Developer Context & Architectural Guidelines

This is the canonical configuration and instructional mandate for **Gemini models, autonomous coding agents, and developers** working within the **Mirror of Spheres** codebase.

---

## 🏛️ Project Identity & Core Cosmological Mandate

**The Mirror of Spheres** is a 360° cosmological generative engine that maps the closed 12-act elemental progression of the Zodiac wheel across **72 decan gates (5° quinance increments)**. Each 5° gate houses a paired **Shem HaMephorash Angel** (celestial light) and **Ars Goetia Demon** (chthonic shadow) occupying the exact same coordinate space.

### 📐 Foundational Axioms

1. **Deterministic Circular Geometry**: The wheel is $360.0^\circ$ and spans $600.0\text{ seconds}$ ($10\text{ minutes}$).
2. **Act Division**: 12 Acts of $30.0^\circ$ each ($50.0\text{ seconds}$ per Act).
3. **Gate Division**: 72 Gates of $5.0^\circ$ each ($\sim 8.333\text{ seconds}$ per gate).
4. **Dual Polarity Co-Presence**: Celestial light and chthonic shadow are not opposing forces in conflict; they are counter-rotating polarities whose tensegrity powers the universal engine.
5. **Axis Opposition (180° / 300.0s)**: At Gate 37 (Libra 0°–5° | 5:00), an absolute acoustic and structural inversion occurs relative to Gate 1 (Aries 0°–5° | 0:00).
6. **The 240° Seam Breach (6:40 / 400.0s)**: At Gate 48 (Scorpio 25°–30°), the **108° Zen Shield** angle initiates a lateral camera dolly vector, escaping the closed circle into the unmanifest **Ophiuchus Void**.

---

## 🧠 The 3-Layer API-Level Structural Model

When developing or executing code for this system, all generative pipelines (text, video, audio) must follow the **3-Layer API-Level Structural Model**:

```
┌──────────────────────────────────────────────────────────┐
│              1. SYSTEM-LEVEL INSTRUCTION                 │
│    (Recursive Continuity / Dark-Gothic Sumerian)         │
└────────────────────────────┬─────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────┐
│              2. PROCEDURAL CONTEXT ARRAY                 │
│ (12 Signs / 72 Gates Matrix / 8.33s Temporal Cadence)    │
└────────────────────────────┬─────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────┐
│              3. MULTIMODAL BOUNDARY CODE                 │
│     (Audio Sync: 40Hz → 1.618 Phi / Visual Flows)        │
└────────────────────────────┬─────────────────────────────┘
```

### Layer 1: System-Level Instruction
Hardcoded into the API context window to avoid context degradation across repeated video generation calls.
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

### Layer 2: Procedural Context Array
Maps all 72 gates programmatically as typed array variables:
- Exact degree span: $[(k-1) \times 5^\circ, k \times 5^\circ]$.
- Exact timestamp window: $[(k-1) \times 8.33\text{s}, k \times 8.33\text{s}]$.
- Paired entities: Shem angel name + Hebrew letters + Choir + Sphere + Frequency; Goetia demon name + Seal number + Rank + Legions + Metal + Frequency.
- Exact harmonic interaction verbatim from canonical specification.

### Layer 3: Multimodal Boundary Code
- Couples audio frequencies (40Hz sub-bass, 55Hz drone, 108Hz Zen shield, 432Hz sine) with camera trajectory vectors and sacred geometry overlays (Golden Ratio Phi 1.618).
- For Veo 3 video generation (`gemini-omni-1.1-flash`), enforces strict aspect ratio (`16:9` or `9:16`), continuous camera glide, and volumetric chiaroscuro lighting.

---

## 🎨 Design System & Aesthetic Mandate

### Color Palette

| Token | Hex | UI Role |
| :--- | :--- | :--- |
| **Rorange** | `#F2633A` | Primary accent, CTAs, active gate reticle, laser vectors |
| **Basalt Black** | `#07090E` | Main blueprint canvas background, void spaces |
| **Obsidian** | `#0E121E` | Card backings, container surfaces, blueprint borders |
| **Cyan Ray** | `#38BDF8` | Angelic light orbitals, technical schematics, degree callouts |
| **Crimson Flare** | `#F43F5E` | Goetic chthonic beads, 240° seam breach vector, rune glows |
| **Zen Emerald** | `#10B981` | 108° Zen Shield arc and lateral egress indicators |
| **Golden Phi** | `#FBBF24` | Golden Ratio ($\Phi = 1.618$) sacred geometry rays |

### Typography
- **Headlines & Sacred Title**: `'Cinzel', serif` (font-sacred).
- **Blueprint Data & Code**: `'JetBrains Mono', monospace` (font-blueprint).
- **Body & Inputs**: `'Plus Jakarta Sans', system-ui, sans-serif`.

---

## 📹 Veo 3 Video Generation API Protocol

All video generation must utilize the official 3-step operation pattern provided by `@google/genai`:

1. **Step 1: Start Operation**
   - Model: `gemini-omni-1.1-flash`.
   - Mandatory Aspect Ratio: `16:9` (landscape) or `9:16` (portrait).
   - Target Resolution: `720p`.
   - Output: `operation.name`.

2. **Step 2: Polling**
   - Use `ai.operations.getVideosOperation({ operation })`.
   - Poll interval: 10 seconds. Check `updated.done` and `updated.error`.

3. **Step 3: Download & Stream**
   - Extract `videoUri = updated.response.generatedVideos[0].video.uri`.
   - Fetch using `headers: { 'x-goog-api-key': apiKey }`.
   - Stream binary stream directly to client as `video/mp4`.

---

## 🌀 Gate 48 (6:40) Lateral Dolly Backend Architecture

When processing Gate 48 ($240.0^\circ$ Scorpio seam), the camera breakdown logic must strictly enforce:
- **Baseline Motion**: Circular travel along the $R=1.0$ rail.
- **Trigger**: $t = 400.0\text{ seconds}$ ($6:40$).
- **Vector Shift**: Lateral dolly-out along the $108^\circ$ Zen Shield ray from $[0.0, 0.0, -1.0]$ to $[1.618, 0.618, 2.618]$.
- **Focal Shift**: 35mm anamorphic compression expands into 14mm ultrawide dimensional tear, exposing the **Ophiuchus Void**.

---

## 🧪 Testing & Verification Directives

Before completing any task, ensure:
1. `npm run build` succeeds without bundle or worker errors.
2. `npm run lint` (`tsc --noEmit`) passes with zero type errors.
3. The server starts cleanly on port 3000 (`/api/health` returns status `ok`).
4. All 72 gates maintain identical indexing in `cosmologyData.ts`, `server.ts`, and `mirror_engine_generator.py`.
