import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Copy, 
  Check, 
  Download, 
  Terminal, 
  Film, 
  AlertTriangle, 
  Compass, 
  Layers, 
  Sparkles, 
  Play, 
  Loader2, 
  X,
  FileJson,
  Cpu,
  Eye,
  Camera
} from 'lucide-react';
import rawMatrixData from '../data/72_shem_goetia_matrix.json';

interface ApiStructuralStudioProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchVeoWithPrompt?: (prompt: string, gateId: number) => void;
}

export const ApiStructuralStudio: React.FC<ApiStructuralStudioProps> = ({
  isOpen,
  onClose,
  onLaunchVeoWithPrompt,
}) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'gate48' | 'python' | 'layers'>('matrix');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [pythonCode, setPythonCode] = useState<string>('');
  const [isGeneratingGate48, setIsGeneratingGate48] = useState<boolean>(false);
  const [gate48Result, setGate48Result] = useState<any>(null);

  // Fetch Python script on load
  useEffect(() => {
    fetch('/api/matrix/python-template')
      .then((r) => r.text())
      .then((code) => setPythonCode(code))
      .catch((err) => console.error('Failed to load python template', err));
  }, []);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(rawMatrixData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', '72_shem_goetia_matrix.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDownloadPython = () => {
    const dataStr = 'data:text/x-python;charset=utf-8,' + encodeURIComponent(pythonCode);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'mirror_engine_generator.py');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Filter 72 gates
  const filteredGates = rawMatrixData.filter((g: any) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      g.GateId.toString().includes(q) ||
      g.Sign.toLowerCase().includes(q) ||
      g.Element.toLowerCase().includes(q) ||
      g.Angel.Name.toLowerCase().includes(q) ||
      g.Demon.Name.toLowerCase().includes(q)
    );
  });

  // Canonical System Directive
  const systemDirectivePayload = {
    AestheticProfile: "Dark-Gothic Sumerian Futurism. High-contrast chiaroscuro, cosmic voids, mirror-polished basalt megaliths, glowing crimson energy veins.",
    TemporalAxiom: {
      TotalDurationSeconds: 600,
      ZodiacPhaseDurationSeconds: 50,
      GateNodeIntervalSeconds: 8.33
    },
    CoreExecutionRules: [
      "RECURSIVE_CONTINUITY: Enforce pixel-level optical flow consistency. Ensure Frame_Start(k) perfectly anchors to Frame_End(k-1). Zero micro-cuts.",
      "DUAL_ENTITY_ANCHORING: Dynamically embed subtle Shem wing motifs and Goetia horn motifs into the environment geometry during each 8.33s node loop.",
      "AXIS_OPPOSITION: Force absolute structural and acoustic inversion at exactly 300 seconds (5:00 / Gate 37 Libra) relative to 0 seconds (0:00 / Gate 1 Aries)."
    ]
  };

  // Gate 48 Lateral Dolly Payload
  const gate48Prompt = "Cinematic 16:9 widescreen master shot, Dark-Gothic Sumerian Futurism. Scorpio 25°–30° Gate 48 at 06:40 (400.0s). The camera travels along a circular basalt rail before violently breaking tangential tracking into a dynamic lateral dolly-out along the 108° Zen Shield vector. Bioluminescent aqua currents from angel Mihael collide with Haagenti's abyssal metallic ink. At the 240° seam, the circular boundary fractures open, revealing a cosmic portal into the Ophiuchus Void with glowing crimson runic monoliths. High-contrast chiaroscuro, volumetric mist, continuous fluid optical flow, photorealistic cinematic lighting.";

  const handleGenerateGate48Dolly = async () => {
    setIsGeneratingGate48(true);
    try {
      const res = await fetch('/api/matrix/generate-gate48-dolly-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aspectRatio: '16:9' }),
      });
      const data = await res.json();
      setGate48Result(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingGate48(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-6xl bg-[#080b12] border-2 border-[#1f293d] rounded-3xl shadow-[0_0_90px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-[#0b101c] px-6 py-4 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#f2633a]/20 border border-[#f2633a]/40 flex items-center justify-center text-[#f2633a]">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold font-sacred text-white">
                  API-LEVEL STRUCTURAL MODEL & MATRIX STUDIO
                </h3>
                <span className="text-[10px] font-blueprint px-2 py-0.5 rounded-full bg-orange-950 border border-orange-600 text-orange-400 font-bold">
                  AI STUDIO SYSTEM WRAPPER
                </span>
              </div>
              <p className="text-xs text-stone-400 font-blueprint">
                Automated 72-Gate Traversal Matrix • Gate 48 Lateral Dolly Event • Master Python Template
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 py-2.5 bg-[#090d17] border-b border-stone-800 flex items-center space-x-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3.5 py-2 rounded-xl text-xs font-blueprint flex items-center space-x-2 transition-all whitespace-nowrap ${
              activeTab === 'matrix'
                ? 'bg-[#f2633a] text-white font-bold shadow'
                : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-white'
            }`}
          >
            <FileJson className="w-4 h-4" />
            <span>72 Shem-Goetia Clean JSON Array</span>
          </button>

          <button
            onClick={() => setActiveTab('gate48')}
            className={`px-3.5 py-2 rounded-xl text-xs font-blueprint flex items-center space-x-2 transition-all whitespace-nowrap ${
              activeTab === 'gate48'
                ? 'bg-rose-600 text-white font-bold shadow'
                : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Gate 48 (6:40) Lateral Dolly Event</span>
          </button>

          <button
            onClick={() => setActiveTab('python')}
            className={`px-3.5 py-2 rounded-xl text-xs font-blueprint flex items-center space-x-2 transition-all whitespace-nowrap ${
              activeTab === 'python'
                ? 'bg-sky-600 text-white font-bold shadow'
                : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-white'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Master Python Context Injection Script</span>
          </button>

          <button
            onClick={() => setActiveTab('layers')}
            className={`px-3.5 py-2 rounded-xl text-xs font-blueprint flex items-center space-x-2 transition-all whitespace-nowrap ${
              activeTab === 'layers'
                ? 'bg-purple-600 text-white font-bold shadow'
                : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>3-Layer System Prompt Directives</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#06080e]">
          {/* TAB 1: 72 SHEM-GOETIA CLEAN JSON RAW ARRAY */}
          {activeTab === 'matrix' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#0d121f] border border-stone-800">
                <div className="flex items-center space-x-3">
                  <div className="text-xs font-blueprint text-stone-300">
                    Showing <strong className="text-[#f2633a]">{filteredGates.length}</strong> of 72 Decan Gates
                  </div>
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Search gate, angel, demon, sign..."
                    className="w-56 h-8 bg-[#07090f] border border-stone-700 rounded-lg px-2.5 text-xs font-blueprint text-white focus:outline-none focus:border-[#f2633a]"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleCopy(JSON.stringify(rawMatrixData, null, 2), 'raw-json')}
                    className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-700 hover:bg-stone-800 text-xs font-blueprint text-stone-200 flex items-center space-x-1.5 transition-all"
                  >
                    {copiedKey === 'raw-json' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'raw-json' ? 'Copied Entire JSON!' : 'Copy Clean JSON'}</span>
                  </button>

                  <button
                    onClick={handleDownloadJson}
                    className="px-3 py-1.5 rounded-xl bg-[#f2633a] hover:bg-[#ff724a] text-xs font-blueprint font-bold text-white flex items-center space-x-1.5 transition-all shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download JSON File</span>
                  </button>
                </div>
              </div>

              {/* JSON Visual Code Viewer */}
              <div className="rounded-2xl border border-stone-800 bg-[#07090f] p-4 max-h-[500px] overflow-y-auto">
                <pre className="text-[11px] font-blueprint text-sky-300 leading-relaxed overflow-x-auto">
                  {JSON.stringify(filteredGates, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 2: GATE 48 (6:40) LATERAL DOLLY EVENT */}
          {activeTab === 'gate48' && (
            <div className="space-y-6">
              {/* Event Architecture Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1c0a12] via-[#0b0e18] to-black border-2 border-rose-500/50 shadow-2xl">
                <div className="flex items-center justify-between border-b border-rose-950 pb-3 mb-4">
                  <div className="flex items-center space-x-2.5 text-rose-300">
                    <AlertTriangle className="w-5 h-5 text-rose-400 animate-bounce" />
                    <span className="text-xs font-blueprint font-bold uppercase tracking-widest">
                      GATE 48 (240° SCORPIO) • 06:40 (400.0s) LATERAL DOLLY VECTOR EVENT
                    </span>
                  </div>
                  <span className="text-[10px] font-blueprint px-2 py-0.5 rounded bg-rose-950 border border-rose-700 text-rose-300 font-bold">
                    108° ZEN SHIELD ESCAPE
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3 text-xs">
                    <h4 className="text-sm font-bold text-white font-sacred">
                      Deterministic Rail Disruption Mechanics
                    </h4>
                    <p className="text-stone-300 leading-relaxed font-sans">
                      Throughout Gates 1–47, the camera maintains a continuous tangential arc along the closed 360-degree basalt rail. At exactly <strong className="text-rose-400">400.0 seconds (06:40)</strong>, the transmutative frequency of demon <strong>Haagenti</strong> breaches the boundary.
                    </p>
                    <p className="text-stone-300 leading-relaxed font-sans">
                      The camera breaks tangential velocity and executes an aggressive outward lateral dolly along the <strong className="text-emerald-400">108° Zen Shield Phi ray</strong>, leaving the circular rail behind and penetrating the basalt threshold into the <strong className="text-purple-300">Ophiuchus Void</strong>.
                    </p>

                    {/* Vector Coordinates Breakdown */}
                    <div className="p-3 rounded-xl bg-black/60 border border-stone-800 space-y-1.5 font-blueprint text-[11px]">
                      <div className="text-stone-400 flex justify-between">
                        <span>Start Vector XYZ:</span>
                        <span className="text-sky-300 font-bold">[0.0, 0.0, -1.0]</span>
                      </div>
                      <div className="text-stone-400 flex justify-between">
                        <span>Breach Vector XYZ:</span>
                        <span className="text-rose-400 font-bold">[1.618, 0.618, 2.618]</span>
                      </div>
                      <div className="text-stone-400 flex justify-between">
                        <span>Focal Shift:</span>
                        <span className="text-amber-300 font-bold">35mm Anamorphic → 14mm Ultrawide</span>
                      </div>
                      <div className="text-stone-400 flex justify-between">
                        <span>Zen Shield Angle:</span>
                        <span className="text-emerald-400 font-bold">108.0°</span>
                      </div>
                    </div>
                  </div>

                  {/* Camera Path Diagram Preview */}
                  <div className="rounded-xl border border-rose-950 bg-[#07090e] p-3 flex flex-col items-center justify-center">
                    <svg viewBox="0 0 300 240" className="w-full h-auto max-h-[200px]">
                      {/* Circular rail */}
                      <circle cx="150" cy="120" r="85" fill="none" stroke="#232d3f" strokeWidth="2" strokeDasharray="3,3" />
                      {/* Arc of Scorpio Gate 48 */}
                      <path d="M 90 180 A 85 85 0 0 1 65 120" fill="none" stroke="#f43f5e" strokeWidth="3" />
                      {/* Tangential arrow before breach */}
                      <line x1="105" y1="195" x2="85" y2="175" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#arrow)" />
                      {/* Lateral Dolly Outward Ray (108° Zen angle) */}
                      <line x1="75" y1="150" x2="15" y2="210" stroke="#f43f5e" strokeWidth="3.5" strokeDasharray="4,2" className="animate-pulse" />
                      <circle cx="15" cy="210" r="5" fill="#f43f5e" />
                      <text x="25" y="230" fill="#f43f5e" fontSize="9" fontFamily="monospace" fontWeight="bold">
                        OPHIUCHUS VOID (240°)
                      </text>
                      {/* 108° Zen Shield Indicator */}
                      <line x1="150" y1="120" x2="75" y2="150" stroke="#10b981" strokeWidth="1" strokeDasharray="2,2" />
                      <text x="110" y="115" fill="#10b981" fontSize="8" fontFamily="monospace">
                        108° ZEN RAY
                      </text>
                      <circle cx="150" cy="120" r="4" fill="#64748b" />
                    </svg>

                    <div className="text-[10px] font-blueprint text-stone-500 text-center mt-1">
                      Camera Trajectory: 360° Circular Rail → Lateral Vector Egress
                    </div>
                  </div>
                </div>

                {/* Veo 3 Injected Prompt for Gate 48 */}
                <div className="mt-5 pt-4 border-t border-rose-950 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-blueprint text-stone-300 font-semibold uppercase tracking-wider">
                      Veo 3 Prompt-Inject String for Gate 48
                    </span>
                    <button
                      onClick={() => handleCopy(gate48Prompt, 'gate48-prompt')}
                      className="px-2.5 py-1 rounded bg-stone-900 border border-stone-700 text-[11px] font-blueprint text-stone-300 hover:text-white flex items-center space-x-1"
                    >
                      {copiedKey === 'gate48-prompt' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>Copy Prompt</span>
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-black/80 border border-stone-800 text-xs font-sans text-stone-300 leading-relaxed">
                    {gate48Prompt}
                  </div>

                  <div className="pt-2 flex items-center justify-end">
                    <button
                      onClick={handleGenerateGate48Dolly}
                      disabled={isGeneratingGate48}
                      className="px-4 py-2 rounded-xl bg-[#f2633a] hover:bg-[#ff724a] text-white text-xs font-blueprint font-bold flex items-center space-x-2 shadow-lg shadow-[#f2633a]/25 transition-all"
                    >
                      {isGeneratingGate48 ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-white" />}
                      <span>{isGeneratingGate48 ? 'Initiating Gate 48 Lateral Dolly...' : 'Execute Gate 48 Veo 3 Video'}</span>
                    </button>
                  </div>

                  {gate48Result && (
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-600/40 text-xs font-blueprint text-emerald-300">
                      Operation initiated: <strong>{gate48Result.operationName}</strong>. Tracking via Veo Video Studio.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MASTER PYTHON CONTEXT INJECTION TEMPLATE */}
          {activeTab === 'python' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#0d121f] border border-stone-800">
                <div>
                  <h4 className="text-xs font-blueprint font-bold text-white uppercase tracking-wider">
                    Master Python Context Injection Script (scripts/mirror_engine_generator.py)
                  </h4>
                  <p className="text-[11px] text-stone-400 font-blueprint">
                    Executable CLI script using Google GenAI SDK to batch-render the 72 gates with recursive frame continuity.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleCopy(pythonCode, 'python-code')}
                    className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-700 hover:bg-stone-800 text-xs font-blueprint text-stone-200 flex items-center space-x-1.5 transition-all"
                  >
                    {copiedKey === 'python-code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'python-code' ? 'Copied Python Script!' : 'Copy Script'}</span>
                  </button>

                  <button
                    onClick={handleDownloadPython}
                    className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-xs font-blueprint font-bold text-white flex items-center space-x-1.5 transition-all shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .py</span>
                  </button>
                </div>
              </div>

              {/* CLI Command Cheat-sheet */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-[11px] font-blueprint">
                <div className="p-2.5 rounded-xl bg-[#090c14] border border-stone-800 text-stone-300">
                  <span className="text-[#f2633a] font-bold block mb-1">Dry Run Gate 48:</span>
                  <code>python3 scripts/mirror_engine_generator.py --dry-run --gate 48</code>
                </div>
                <div className="p-2.5 rounded-xl bg-[#090c14] border border-stone-800 text-stone-300">
                  <span className="text-rose-400 font-bold block mb-1">Inspect Lateral Dolly:</span>
                  <code>python3 scripts/mirror_engine_generator.py --gate48-dolly --dry-run</code>
                </div>
                <div className="p-2.5 rounded-xl bg-[#090c14] border border-stone-800 text-stone-300">
                  <span className="text-emerald-400 font-bold block mb-1">Dump Clean Matrix:</span>
                  <code>python3 scripts/mirror_engine_generator.py --dump-matrix</code>
                </div>
              </div>

              {/* Python Code Viewer */}
              <div className="rounded-2xl border border-stone-800 bg-[#07090f] p-4 max-h-[460px] overflow-y-auto">
                <pre className="text-[11px] font-blueprint text-emerald-400 leading-relaxed overflow-x-auto">
                  {pythonCode || '# Loading mirror_engine_generator.py script...'}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: 3-LAYER SYSTEM PROMPT DIRECTIVES */}
          {activeTab === 'layers' && (
            <div className="space-y-6">
              {/* Structural Diagram */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#0d121f] border border-purple-500/30 space-y-2">
                  <div className="text-xs font-blueprint text-purple-400 font-bold uppercase">
                    Layer 1: System-Level Instruction
                  </div>
                  <h5 className="text-sm font-bold text-white font-sacred">
                    Dark-Gothic Sumerian Futurism
                  </h5>
                  <p className="text-xs text-stone-400 leading-relaxed font-sans">
                    Hardcodes optical flow continuity across all 72 nodes. Frame_Start(k) anchors Frame_End(k-1). Eliminates micro-cuts and hallucinatory jumps.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0d121f] border border-cyan-500/30 space-y-2">
                  <div className="text-xs font-blueprint text-cyan-400 font-bold uppercase">
                    Layer 2: Procedural Context Array
                  </div>
                  <h5 className="text-sm font-bold text-white font-sacred">
                    12 Signs / 72 Gates Matrix
                  </h5>
                  <p className="text-xs text-stone-400 leading-relaxed font-sans">
                    Loops mathematical variables (5° increments, 8.33s per gate) binding paired Shem angels & Goetic demons directly into the spatial coordinates.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0d121f] border border-amber-500/30 space-y-2">
                  <div className="text-xs font-blueprint text-amber-400 font-bold uppercase">
                    Layer 3: Multimodal Boundary Code
                  </div>
                  <h5 className="text-sm font-bold text-white font-sacred">
                    40Hz Sub-Bass & Phi 1.618 Audio Sync
                  </h5>
                  <p className="text-xs text-stone-400 leading-relaxed font-sans">
                    Couples the procedural audio synthesizer harmonics directly with visual plasma flare vectors and camera focal length modulations.
                  </p>
                </div>
              </div>

              {/* JSON System Directive Payload */}
              <div className="p-5 rounded-2xl bg-[#0c101a] border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-blueprint text-stone-300 font-bold uppercase tracking-wider">
                    Canonical System Directive (Google AI Studio Prompt-Inject Payload)
                  </div>
                  <button
                    onClick={() => handleCopy(JSON.stringify(systemDirectivePayload, null, 2), 'system-directive')}
                    className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-700 hover:bg-stone-800 text-xs font-blueprint text-stone-200 flex items-center space-x-1.5 transition-all"
                  >
                    {copiedKey === 'system-directive' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'system-directive' ? 'Copied Directive JSON!' : 'Copy Directive JSON'}</span>
                  </button>
                </div>

                <div className="rounded-xl border border-stone-800 bg-[#07090f] p-4">
                  <pre className="text-xs font-blueprint text-amber-300 leading-relaxed overflow-x-auto">
                    {JSON.stringify(systemDirectivePayload, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
