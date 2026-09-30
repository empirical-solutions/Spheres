import express, { Request, Response } from 'express';
import { GoogleGenAI, GenerateVideosOperation } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google GenAI SDK (server-side only)
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// 1. Veo 3 Video Generation: Start Operation
app.post('/api/generate-video', async (req: Request, res: Response) => {
  try {
    const { prompt, aspectRatio } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const validRatio = aspectRatio === '9:16' ? '9:16' : '16:9';

    // Model explicitly mandated by user: gemini-omni-1.1-flash
    const operation = await ai.models.generateVideos({
      model: 'gemini-omni-1.1-flash',
      prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: validRatio,
      },
    });

    return res.json({ operationName: operation.name });
  } catch (error: any) {
    console.error('Error starting Veo video generation:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to initiate Veo video generation',
    });
  }
});

// 2. Veo 3 Video Generation: Poll Operation Status
app.post('/api/video-status', async (req: Request, res: Response) => {
  try {
    const { operationName } = req.body;
    if (!operationName) {
      return res.status(400).json({ error: 'operationName is required' });
    }

    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });

    return res.json({
      done: updated.done,
      error: updated.error ? updated.error.message : undefined,
    });
  } catch (error: any) {
    console.error('Error checking video operation status:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to check operation status',
    });
  }
});

// 3. Veo 3 Video Generation: Download & Stream Video File
app.post('/api/video-download', async (req: Request, res: Response) => {
  try {
    const { operationName } = req.body;
    if (!operationName) {
      return res.status(400).json({ error: 'operationName is required' });
    }

    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });

    const uri = updated.response?.generatedVideos?.[0]?.video?.uri;
    if (!uri) {
      return res.status(404).json({ error: 'Generated video URI not found or video not ready' });
    }

    const videoRes = await fetch(uri, {
      headers: {
        'x-goog-api-key': apiKey,
      },
    });

    if (!videoRes.ok) {
      return res.status(videoRes.status).json({ error: 'Failed to download video from storage' });
    }

    res.setHeader('Content-Type', 'video/mp4');
    const arrayBuffer = await videoRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    res.setHeader('Content-Length', buffer.length);
    return res.send(buffer);
  } catch (error: any) {
    console.error('Error downloading video:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to download video stream',
    });
  }
});

// 4. Cosmic Oracle: Hermetic Analysis & Gate Commentary via Gemini 3.8 Flash
app.post('/api/ai/oracle', async (req: Request, res: Response) => {
  try {
    const { gateId, angelName, demonName, actSign, element, queryType } = req.body;

    const systemPrompt = `You are the master hermetic archivist of "The Mirror of Spheres" cosmological framework.
In this system, the 360° Zodiac wheel is composed of 12 Zodiac Acts and 72 decan gates (5° each). Each quinance gate houses a paired Shem HaMephorash Angel (celestial light) and Ars Goetia Demon (chthonic shadow) occupying the exact same coordinate space.
Light and shadow are not adversaries; they are counter-rotating polarities generating the cosmic engine.
Deliver an evocative, concise, deeply poetic, and sacred commentary (under 120 words).`;

    const userPrompt = `Deliver a ${queryType || 'hermetic analysis'} for Gate ${gateId} in ${actSign} (${element}).
Paired Entities:
- Shem HaMephorash Angel: ${angelName} (Celestial Light)
- Ars Goetia Demon: ${demonName} (Chthonic Shadow)
Explain how their harmonic polarity manifests in the universe and what wisdom it confers upon the traveler traversing this gate.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.8,
      },
    });

    return res.json({ commentary: response.text });
  } catch (error: any) {
    console.error('Error consulting cosmic oracle:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to consult cosmic oracle',
    });
  }
});

// 5. Complete Clean JSON Raw Array of All 72 Shem-Goetia Pairs
app.get('/api/matrix/72-gates.json', async (_req: Request, res: Response) => {
  try {
    const matrixPath = path.resolve(__dirname, 'src', 'data', '72_shem_goetia_matrix.json');
    const fs = await import('fs');
    if (fs.existsSync(matrixPath)) {
      const data = fs.readFileSync(matrixPath, 'utf-8');
      res.setHeader('Content-Type', 'application/json');
      return res.send(data);
    }
    return res.status(404).json({ error: 'Matrix file not found' });
  } catch (error: any) {
    console.error('Error retrieving 72 gates matrix:', error);
    return res.status(500).json({ error: 'Failed to load 72-gate matrix' });
  }
});

// Alias endpoint for raw array
app.get('/api/matrix/raw-array', (_req: Request, res: Response) => {
  res.redirect('/api/matrix/72-gates.json');
});

// 6. System Directive & Canonical Mirror Engine Constraints JSON
app.get('/api/matrix/system-directive', (_req: Request, res: Response) => {
  const directive = {
    AestheticProfile: "Dark-Gothic Sumerian Futurism. High-contrast chiaroscuro, cosmic voids, mirror-polished basalt megaliths, glowing crimson energy veins.",
    TemporalAxiom: {
      TotalDurationSeconds: 600,
      ZodiacPhaseDurationSeconds: 50,
      GateNodeIntervalSeconds: 8.33,
      TotalGates: 72,
      DegreesPerGate: 5.0,
      TotalActs: 12,
      DegreesPerAct: 30.0
    },
    CoreExecutionRules: [
      "RECURSIVE_CONTINUITY: Enforce pixel-level optical flow consistency. Ensure Frame_Start(k) perfectly anchors to Frame_End(k-1). Zero micro-cuts.",
      "DUAL_ENTITY_ANCHORING: Dynamically embed subtle Shem wing motifs and Goetia horn motifs into the environment geometry during each 8.33s node loop.",
      "AXIS_OPPOSITION: Force absolute structural and acoustic inversion at exactly 300 seconds (5:00 / Gate 37 Libra) relative to 0 seconds (0:00 / Gate 1 Aries).",
      "CYMATIC_RESONANCE: Couple 40Hz sub-bass standing waves with Golden Ratio Phi (1.618) sacred geometry fractals across all visual transitions."
    ]
  };
  return res.json(directive);
});

// 7. Gate 48 (6:40 / 400.0s) Lateral Dolly Event & Camera Vector Specification
const GATE_48_DOLLY_SPEC = {
  Event: "240_SEAM_BREACH_LATERAL_DOLLY",
  TimestampSeconds: 400.0,
  Timecode: "06:40",
  Sign: "Scorpio",
  Degrees: "25°–30° Scorpio (235°–240° Total)",
  Entities: {
    Angel: "Mihael",
    Demon: "Haagenti",
    HarmonicRole: "Mihael unites spiritual essence; Haagenti transmutates the abyssal boundary."
  },
  CameraVectorBreakdown: {
    BaselineMotion: "Closed 360° circular trajectory along the circumference rail at radius R=1.0.",
    BreachVector: "At t=400.0s (6:40), the camera breaks tangential velocity and initiates a rapid lateral dolly-out along the 108° Zen Shield Phi ray.",
    StartVectorXYZ: [0.0, 0.0, -1.0],
    EndVectorXYZ: [1.618, 0.618, 2.618],
    FocalLengthShift: "From 35mm anamorphic compression to 14mm ultrawide dimensional tear.",
    OpticalPhenomenon: "Basalt walls fracture along crimson runic seams, exposing the unmanifest Ophiuchus Void and the Runic Staff of the Arch-Magus."
  },
  Veo3PromptInject: "Cinematic 16:9 widescreen master shot, Dark-Gothic Sumerian Futurism. Scorpio 25°–30° Gate 48 at 06:40 (400.0s). The camera travels along a circular basalt rail before violently breaking tangential tracking into a dynamic lateral dolly-out along the 108° Zen Shield vector. Bioluminescent aqua currents from angel Mihael collide with Haagenti's abyssal metallic ink. At the 240° seam, the circular boundary fractures open, revealing a cosmic portal into the Ophiuchus Void with glowing crimson runic monoliths. High-contrast chiaroscuro, volumetric mist, continuous fluid optical flow, photorealistic cinematic lighting."
};

app.get('/api/matrix/gate48-dolly-event', (_req: Request, res: Response) => {
  return res.json(GATE_48_DOLLY_SPEC);
});

// Direct generation of the Gate 48 Lateral Dolly Video via Veo 3
app.post('/api/matrix/generate-gate48-dolly-video', async (req: Request, res: Response) => {
  try {
    const { aspectRatio } = req.body;
    const validRatio = aspectRatio === '9:16' ? '9:16' : '16:9';

    const operation = await ai.models.generateVideos({
      model: 'gemini-omni-1.1-flash',
      prompt: GATE_48_DOLLY_SPEC.Veo3PromptInject,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: validRatio,
      },
    });

    return res.json({
      operationName: operation.name,
      event: GATE_48_DOLLY_SPEC.Event,
      prompt: GATE_48_DOLLY_SPEC.Veo3PromptInject
    });
  } catch (error: any) {
    console.error('Error starting Gate 48 lateral dolly video generation:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to initiate Gate 48 lateral dolly generation',
    });
  }
});

// 8. Python Template Retrieval
app.get('/api/matrix/python-template', async (_req: Request, res: Response) => {
  try {
    const scriptPath = path.resolve(__dirname, 'scripts', 'mirror_engine_generator.py');
    const fs = await import('fs');
    if (fs.existsSync(scriptPath)) {
      const code = fs.readFileSync(scriptPath, 'utf-8');
      res.setHeader('Content-Type', 'text/x-python');
      return res.send(code);
    }
    return res.status(404).json({ error: 'Python script template not found' });
  } catch (error: any) {
    console.error('Error loading python template:', error);
    return res.status(500).json({ error: 'Failed to retrieve Python script' });
  }
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', framework: 'The Mirror of Spheres' });
});

// Setup Vite in development or serve static in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`[The Mirror of Spheres] Engine listening on port ${PORT}`);
  });
}

startServer();
