import React, { useState } from 'react';
import { ACTS_DATA, GATES_DATA } from '../data/cosmologyData';
import { ActData, GateData, VideoGenerationJob } from '../types/cosmology';
import { 
  Video, 
  Sparkles, 
  Play, 
  Download, 
  Maximize2, 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  X,
  Sliders,
  Layers,
  Film
} from 'lucide-react';

interface VeoVideoStudioProps {
  initialGate?: GateData;
  initialAct?: ActData;
  onClose?: () => void;
}

export const VeoVideoStudio: React.FC<VeoVideoStudioProps> = ({
  initialGate,
  initialAct,
  onClose,
}) => {
  const [selectedGateId, setSelectedGateId] = useState<number>(initialGate?.id || 1);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState<number>(0);
  const [jobs, setJobs] = useState<VideoGenerationJob[]>([]);
  const [activeJob, setActiveJob] = useState<VideoGenerationJob | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const activeGate = GATES_DATA.find((g) => g.id === selectedGateId) || GATES_DATA[0];
  const activeAct = ACTS_DATA.find((a) => a.actNumber === activeGate.actNumber) || ACTS_DATA[0];

  // Reassuring loading step messages during Veo 3 generation
  const loadingSteps = [
    'Initializing Veo 3 (veo-3.1-fast-generate-preview) neural canvas...',
    `Synthesizing ${activeAct.element} elemental environment: "${activeAct.globalVisualEnvironment}"...`,
    `Weaving polarized harmonics: ${activeGate.angel.name} (celestial light) & ${activeGate.demon.name} (chthonic embers)...`,
    'Calculating 40Hz cymatic wave physics & golden ratio geometry...',
    'Rendering high-fidelity volumetric lighting & camera parallax...',
    'Encoding final MP4 video stream...',
  ];

  // Set prompt automatically when gate changes if customPrompt is empty or reset
  const generateSuggestedPrompt = (gate: GateData, act: ActData) => {
    return `Cinematic, hyper-detailed cosmic visualization in ${aspectRatio === '16:9' ? '16:9 landscape' : '9:16 portrait'}: ${act.globalVisualEnvironment} Within this space, Gate ${gate.id} of the 360° Zodiac wheel materializes: ${gate.angel.name} radiates blinding celestial light and sacred geometry, while ${gate.demon.name} grounds it with deep chthonic embers and liquid shadows. ${gate.harmonicInteraction} Volumetric light beams, cymatic particles, slow motion 4K camera glide.`;
  };

  const handleGateSelect = (id: number) => {
    setSelectedGateId(id);
    const g = GATES_DATA.find((item) => item.id === id);
    if (g) {
      const a = ACTS_DATA.find((item) => item.actNumber === g.actNumber) || ACTS_DATA[0];
      setCustomPrompt(generateSuggestedPrompt(g, a));
    }
  };

  const handleUseActPreset = (act: ActData) => {
    const firstGate = GATES_DATA.find((g) => g.id === act.gateIds[0]) || activeGate;
    setSelectedGateId(firstGate.id);
    setCustomPrompt(
      `Cinematic ${aspectRatio === '16:9' ? '16:9 widescreen' : '9:16 vertical'} cosmic journey through Act ${act.actNumber} (${act.sign}): ${act.globalVisualEnvironment} Harmonic frequencies visible as glowing light fractals, slow motion volumetric camera motion, hyperrealistic cinematography.`
    );
  };

  // Start Video Generation using 3-step pattern
  const handleStartGeneration = async () => {
    const promptToSend = customPrompt.trim() || generateSuggestedPrompt(activeGate, activeAct);
    setIsGenerating(true);
    setErrorMessage(null);
    setLoadingMessageIndex(0);

    const stepInterval = setInterval(() => {
      setLoadingMessageIndex((prev) => (prev + 1) % loadingSteps.length);
    }, 12000);

    try {
      // Step 1: Start operation
      const res = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToSend,
          aspectRatio,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to initiate Veo 3 video generation');
      }

      const { operationName } = await res.json();

      const newJob: VideoGenerationJob = {
        operationName,
        prompt: promptToSend,
        aspectRatio,
        status: 'polling',
        createdAt: Date.now(),
        gateId: activeGate.id,
        actNumber: activeAct.actNumber,
      };

      setJobs((prev) => [newJob, ...prev]);
      setActiveJob(newJob);

      // Step 2: Poll operation
      let isDone = false;
      let attempts = 0;
      const maxAttempts = 60; // Up to 10 minutes polling

      while (!isDone && attempts < maxAttempts) {
        await new Promise((r) => setTimeout(r, 10000)); // Poll every 10s
        attempts++;

        const statusRes = await fetch('/api/video-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ operationName }),
        });

        if (statusRes.ok) {
          const statusData = await statusRes.json();
          if (statusData.error) {
            throw new Error(statusData.error);
          }
          if (statusData.done) {
            isDone = true;
            break;
          }
        }
      }

      if (!isDone) {
        throw new Error('Video generation timed out. Please try again or inspect status later.');
      }

      // Step 3: Download video
      const downloadRes = await fetch('/api/video-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operationName }),
      });

      if (!downloadRes.ok) {
        throw new Error('Failed to retrieve finalized video file');
      }

      const blob = await downloadRes.blob();
      const videoUrl = URL.createObjectURL(blob);

      const completedJob: VideoGenerationJob = {
        ...newJob,
        status: 'completed',
        videoUrl,
      };

      setJobs((prev) => prev.map((j) => (j.operationName === operationName ? completedJob : j)));
      setActiveJob(completedJob);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'An error occurred during Veo 3 generation');
      if (activeJob) {
        setJobs((prev) =>
          prev.map((j) =>
            j.operationName === activeJob.operationName
              ? { ...j, status: 'failed', error: err.message }
              : j
          )
        );
      }
    } finally {
      clearInterval(stepInterval);
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full bg-[#080b12] border border-[#1e2538] rounded-2xl p-6 shadow-2xl flex flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#f2633a]/20 border border-[#f2633a]/40 flex items-center justify-center text-[#f2633a]">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold font-sacred text-white flex items-center space-x-2">
              <span>VEO 3 VIDEO STUDIO</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-950 border border-orange-600 text-orange-400 font-blueprint">
                veo-3.1-fast-generate-preview
              </span>
            </h3>
            <p className="text-xs text-stone-400 font-blueprint">
              Render cinematic high-fidelity celestial video representations of the 12 Zodiac Acts & 72 Decan Gates
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-stone-900 text-stone-400 hover:text-white border border-stone-800"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Studio Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Gate & Act Preset Selector */}
        <div className="lg:col-span-1 space-y-4">
          <div>
            <label className="text-xs font-blueprint text-stone-400 font-semibold mb-2 block uppercase tracking-wider">
              1. Select Decan Gate (1 – 72)
            </label>
            <select
              value={selectedGateId}
              onChange={(e) => handleGateSelect(parseInt(e.target.value))}
              className="w-full h-11 bg-[#0c101a] border border-[#222b3d] rounded-xl px-3 text-xs font-blueprint text-stone-200 focus:outline-none focus:border-[#f2633a]"
            >
              {GATES_DATA.map((g) => (
                <option key={g.id} value={g.id}>
                  Gate {g.id}: {g.sign} ({g.startDegree}°–{g.endDegree}°) — {g.angel.name} & {g.demon.name}
                </option>
              ))}
            </select>
          </div>

          {/* Aspect Ratio Selector (Mandatory: 16:9 or 9:16) */}
          <div>
            <label className="text-xs font-blueprint text-stone-400 font-semibold mb-2 block uppercase tracking-wider">
              2. Aspect Ratio (Veo 3 Required)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAspectRatio('16:9')}
                className={`py-2 px-3 rounded-xl border text-xs font-blueprint flex items-center justify-center space-x-2 transition-all ${
                  aspectRatio === '16:9'
                    ? 'bg-[#f2633a] border-[#f2633a] text-white font-bold shadow-md shadow-[#f2633a]/25'
                    : 'bg-[#0c101a] border-[#222b3d] text-stone-400 hover:text-white'
                }`}
              >
                <span>16:9 Landscape</span>
              </button>
              <button
                type="button"
                onClick={() => setAspectRatio('9:16')}
                className={`py-2 px-3 rounded-xl border text-xs font-blueprint flex items-center justify-center space-x-2 transition-all ${
                  aspectRatio === '9:16'
                    ? 'bg-[#f2633a] border-[#f2633a] text-white font-bold shadow-md shadow-[#f2633a]/25'
                    : 'bg-[#0c101a] border-[#222b3d] text-stone-400 hover:text-white'
                }`}
              >
                <span>9:16 Portrait</span>
              </button>
            </div>
          </div>

          {/* Quick Act Presets */}
          <div>
            <label className="text-xs font-blueprint text-stone-400 font-semibold mb-2 block uppercase tracking-wider">
              Act Elemental Environments
            </label>
            <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
              {ACTS_DATA.map((act) => (
                <button
                  key={act.actNumber}
                  type="button"
                  onClick={() => handleUseActPreset(act)}
                  className="px-2.5 py-1.5 rounded-lg bg-[#0c101a] hover:bg-[#151c2e] border border-stone-800 text-[11px] font-blueprint text-left text-stone-300 hover:text-white flex items-center justify-between transition-colors"
                >
                  <span>{act.symbol} {act.sign}</span>
                  <span className="text-[9px] text-stone-500 uppercase">{act.element}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Prompt Editor, Video Preview, or Generation Progress */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-blueprint text-stone-400 font-semibold uppercase tracking-wider">
                3. Video Generation Prompt
              </label>
              <button
                type="button"
                onClick={() => setCustomPrompt(generateSuggestedPrompt(activeGate, activeAct))}
                className="text-[11px] font-blueprint text-[#f2633a] hover:underline"
              >
                Reset to Gate Specification
              </button>
            </div>
            <textarea
              rows={4}
              value={customPrompt || generateSuggestedPrompt(activeGate, activeAct)}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="w-full bg-[#0c101a] border border-[#222b3d] rounded-xl p-3 text-xs font-sans text-stone-200 focus:outline-none focus:border-[#f2633a] leading-relaxed"
              placeholder="Describe the celestial cinematic scene..."
            />
          </div>

          {/* Generate Button or Loading State */}
          <div>
            {isGenerating ? (
              <div className="w-full rounded-xl bg-orange-950/40 border border-orange-500/50 p-6 flex flex-col items-center justify-center space-y-3 shadow-inner">
                <Loader2 className="w-8 h-8 text-[#f2633a] animate-spin" />
                <div className="text-center">
                  <div className="text-sm font-semibold text-white">Generating Veo 3 Video</div>
                  <div className="text-xs text-orange-300 font-blueprint mt-1 max-w-md">
                    {loadingSteps[loadingMessageIndex]}
                  </div>
                </div>
                <div className="w-48 h-1.5 bg-stone-900 rounded-full overflow-hidden">
                  <div className="h-full bg-[#f2633a] animate-pulse w-3/4 rounded-full" />
                </div>
                <p className="text-[11px] text-stone-400 italic">
                  Veo 3 video generation requires a short queue to synthesize 3D fluid and cymatic light physics.
                </p>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleStartGeneration}
                className="w-full py-3.5 rounded-xl bg-[#f2633a] hover:bg-[#ff724a] text-white font-semibold font-blueprint text-sm flex items-center justify-center space-x-2 shadow-xl shadow-[#f2633a]/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <Sparkles className="w-4 h-4 fill-white" />
                <span>GENERATE VEO 3 VIDEO ({aspectRatio})</span>
              </button>
            )}
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs font-blueprint flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Active / Latest Video Player Display */}
          {activeJob?.videoUrl && (
            <div className="mt-4 rounded-xl overflow-hidden border border-[#252f44] bg-[#05070c] shadow-2xl">
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#0a0e17] border-b border-stone-800">
                <div className="flex items-center space-x-2 text-xs font-blueprint">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-white font-bold">Veo 3 Render Completed</span>
                  <span className="text-stone-500">({activeJob.aspectRatio})</span>
                </div>
                <a
                  href={activeJob.videoUrl}
                  download={`mirror_of_spheres_gate_${activeJob.gateId}.mp4`}
                  className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-blueprint flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download MP4</span>
                </a>
              </div>

              <div className="flex justify-center p-2 bg-black">
                <video
                  src={activeJob.videoUrl}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className={`rounded-lg ${
                    activeJob.aspectRatio === '9:16' ? 'max-h-[460px] w-auto' : 'w-full max-h-[420px]'
                  }`}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Previously Generated Gallery */}
      {jobs.length > 0 && (
        <div className="pt-4 border-t border-stone-800">
          <h4 className="text-xs font-blueprint text-stone-400 font-bold uppercase tracking-wider mb-3">
            Generated Traversal Archive ({jobs.length})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {jobs.map((j, idx) => (
              <div
                key={idx}
                onClick={() => setActiveJob(j)}
                className={`p-2 rounded-xl border cursor-pointer transition-all ${
                  activeJob?.operationName === j.operationName
                    ? 'border-[#f2633a] bg-[#121724]'
                    : 'border-stone-800 bg-[#0c101a] hover:border-stone-700'
                }`}
              >
                <div className="text-[11px] font-blueprint font-bold text-white flex items-center justify-between">
                  <span>Gate {j.gateId}</span>
                  <span className="text-[9px] px-1 py-0.5 rounded bg-stone-800 text-stone-400">
                    {j.aspectRatio}
                  </span>
                </div>
                <p className="text-[10px] text-stone-400 line-clamp-2 mt-1">
                  {j.prompt}
                </p>
                <div className="mt-2 flex items-center space-x-1 text-[10px] font-blueprint text-[#f2633a]">
                  <Play className="w-3 h-3 fill-current" />
                  <span>View Video</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
