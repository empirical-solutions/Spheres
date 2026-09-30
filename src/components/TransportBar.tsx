import React, { useEffect, useRef } from 'react';
import { ACTS_DATA, GATES_DATA, TOTAL_DURATION_SECONDS } from '../data/cosmologyData';
import { ActData, GateData } from '../types/cosmology';
import { soundEngine } from '../audio/HarmonicAudioEngine';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  SkipBack, 
  SkipForward, 
  Flame, 
  Layers, 
  Wind, 
  Droplet,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';

interface TransportBarProps {
  currentTime: number;
  isPlaying: boolean;
  playbackSpeed: number;
  currentAct: ActData;
  currentGate: GateData;
  onTogglePlay: () => void;
  onSeek: (timeInSeconds: number) => void;
  onChangeSpeed: (speed: number) => void;
  onReset: () => void;
  polarityBalance: number;
  onChangePolarity: (val: number) => void;
}

export const TransportBar: React.FC<TransportBarProps> = ({
  currentTime,
  isPlaying,
  playbackSpeed,
  currentAct,
  currentGate,
  onTogglePlay,
  onSeek,
  onChangeSpeed,
  onReset,
  polarityBalance,
  onChangePolarity,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isMuted, setIsMuted] = React.useState<boolean>(soundEngine.getIsMuted());
  const [volume, setVolume] = React.useState<number>(0.7);

  // Format time as MM:SS
  const formatTime = (secs: number) => {
    const clamped = Math.max(0, Math.min(TOTAL_DURATION_SECONDS, secs));
    const m = Math.floor(clamped / 60);
    const s = Math.floor(clamped % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Real-time audio waveform animation loop
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const { frequencies, waveform } = soundEngine.getAnalyserData();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background line
      ctx.strokeStyle = '#1a2233';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Draw dynamic waveform
      ctx.beginPath();
      ctx.lineWidth = 2;
      // Gradient based on element
      const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grad.addColorStop(0, '#38bdf8');
      grad.addColorStop(0.5, currentAct.colorPalette.primary);
      grad.addColorStop(1, '#f43f5e');
      ctx.strokeStyle = grad;

      const sliceWidth = canvas.width / waveform.length;
      let x = 0;
      for (let i = 0; i < waveform.length; i++) {
        const v = waveform[i] / 128.0; // 0 to 2
        const y = (v * canvas.height) / 2;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [currentAct.colorPalette.primary]);

  const handleMuteToggle = () => {
    soundEngine.init();
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundEngine.setVolume(val);
  };

  const getElementIcon = (elem: string) => {
    switch (elem) {
      case 'Fire':
        return <Flame className="w-3.5 h-3.5 text-orange-400" />;
      case 'Earth':
        return <Layers className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Air':
        return <Wind className="w-3.5 h-3.5 text-sky-400" />;
      case 'Water':
        return <Droplet className="w-3.5 h-3.5 text-cyan-400" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  return (
    <div className="w-full bg-[#0a0d15] border border-[#1e2538] rounded-2xl p-4 shadow-2xl flex flex-col space-y-4">
      {/* Upper row: Current Act / Gate status + Waveform visualizer */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Active Node Metadata */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-[#111726] border border-[#232d42] flex items-center justify-center text-2xl font-bold shadow-inner">
            <span>{currentAct.symbol}</span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-blueprint font-bold text-[#f2633a]">
                ACT {currentAct.actNumber} • {currentAct.sign.toUpperCase()}
              </span>
              <span className="text-xs font-blueprint px-2 py-0.5 rounded-full bg-stone-900 border border-stone-800 text-stone-300 flex items-center space-x-1">
                {getElementIcon(currentAct.element)}
                <span>{currentAct.element}</span>
              </span>
              <span className="text-xs font-blueprint text-stone-500">
                ({currentAct.startDegree}° – {currentAct.endDegree}°)
              </span>
            </div>

            <div className="text-sm font-semibold text-white tracking-wide">
              {currentAct.subtitle}:{' '}
              <span className="text-sky-300 font-normal">
                Gate {currentGate.id} ({currentGate.angel.name} & {currentGate.demon.name})
              </span>
            </div>

            <div className="text-[11px] text-stone-400 font-blueprint flex items-center space-x-2">
              <span>Profile:</span>
              <span className="text-amber-400/90">{currentAct.audioEngineProfile}</span>
            </div>
          </div>
        </div>

        {/* Live Audio Synth Waveform & Frequency Canvas */}
        <div className="flex items-center space-x-3 bg-[#07090f] px-3 py-2 rounded-xl border border-[#1c2333]">
          <div className="text-right">
            <div className="text-[10px] font-blueprint text-stone-500 uppercase tracking-wider">Cymatic Resonance</div>
            <div className="text-xs font-blueprint text-[#f2633a] font-bold">
              {currentGate.angel.frequencyHz}Hz / {currentGate.demon.frequencyHz}Hz
            </div>
          </div>
          <canvas
            ref={canvasRef}
            width={160}
            height={36}
            className="w-36 h-9 rounded bg-[#090c14] border border-[#1b2230]"
          />
        </div>

        {/* Audio Mute & Volume & Polarity */}
        <div className="flex items-center space-x-4 pl-2 border-l border-stone-800/80">
          {/* Polarity Slider (Angelic Light vs Chthonic Shadow) */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-between w-28 text-[9px] font-blueprint text-stone-400 mb-1">
              <span className="flex items-center text-sky-400"><Sun className="w-2.5 h-2.5 mr-0.5" /> Light</span>
              <span className="flex items-center text-rose-400">Dark <Moon className="w-2.5 h-2.5 ml-0.5" /></span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={polarityBalance}
              onChange={(e) => onChangePolarity(parseFloat(e.target.value))}
              className="w-28 h-1.5 bg-gradient-to-r from-sky-400 via-amber-300 to-rose-500 rounded-lg appearance-none cursor-pointer accent-[#f2633a]"
              title={`Polarity Balance: ${( (1 - polarityBalance) * 100 ).toFixed(0)}% Celestial / ${(polarityBalance * 100).toFixed(0)}% Chthonic`}
            />
          </div>

          {/* Sound Mute & Volume */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleMuteToggle}
              className={`p-2 rounded-lg border transition-all ${
                isMuted
                  ? 'bg-rose-950/40 border-rose-800/60 text-rose-400'
                  : 'bg-stone-900 border-stone-800 text-stone-300 hover:text-white'
              }`}
              title={isMuted ? 'Unmute Audio Synthesizer' : 'Mute Audio Synthesizer'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#f2633a]"
              title={`Master Synth Volume: ${(volume * 100).toFixed(0)}%`}
            />
          </div>
        </div>
      </div>

      {/* Scrub Bar (0:00 to 10:00 | 0° to 360°) */}
      <div className="space-y-1.5">
        <div className="relative w-full h-7 bg-[#07090e] rounded-lg border border-[#1d2538] overflow-hidden flex items-center group cursor-pointer">
          {/* 12 Color-coded Act segments */}
          {ACTS_DATA.map((act) => {
            const widthPct = (50 / TOTAL_DURATION_SECONDS) * 100;
            const leftPct = (act.startTime / TOTAL_DURATION_SECONDS) * 100;
            const isActActive = currentAct.actNumber === act.actNumber;
            return (
              <div
                key={act.actNumber}
                onClick={(e) => {
                  e.stopPropagation();
                  onSeek(act.startTime);
                }}
                style={{ width: `${widthPct}%`, left: `${leftPct}%` }}
                className={`absolute top-0 bottom-0 border-r border-[#192130] transition-colors flex items-center justify-center text-[10px] font-blueprint select-none ${
                  isActActive
                    ? 'bg-[#f2633a]/20 text-[#f2633a] font-bold'
                    : 'hover:bg-stone-800/40 text-stone-500'
                }`}
                title={`Act ${act.actNumber}: ${act.sign} (${act.startDegree}° - ${act.endDegree}°)`}
              >
                <span className="hidden sm:inline">{act.symbol}</span>
              </div>
            );
          })}

          {/* Gate 48 Breached Seam Marker (Scorpio 30° / 240° / 400s) */}
          <div
            style={{ left: `${(400 / TOTAL_DURATION_SECONDS) * 100}%` }}
            className="absolute top-0 bottom-0 w-1 bg-rose-500 z-10 animate-pulse shadow-[0_0_8px_#f43f5e]"
            title="Gate 48: 240° Seam Breach (Ophiuchus Void)"
          />

          {/* Progress fill */}
          <div
            style={{ width: `${(currentTime / TOTAL_DURATION_SECONDS) * 100}%` }}
            className="absolute top-0 bottom-0 bg-gradient-to-r from-transparent via-[#f2633a]/30 to-[#f2633a]/50 pointer-events-none border-r-2 border-[#f2633a]"
          />

          {/* Native clickable range input overlay */}
          <input
            type="range"
            min="0"
            max={TOTAL_DURATION_SECONDS}
            step="0.25"
            value={currentTime}
            onChange={(e) => onSeek(parseFloat(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          />
        </div>

        {/* Timecode markers & Gate tracker */}
        <div className="flex items-center justify-between text-[11px] font-blueprint text-stone-400 px-1">
          <div className="flex items-center space-x-2">
            <span className="text-white font-bold">{formatTime(currentTime)}</span>
            <span className="text-stone-600">/</span>
            <span className="text-stone-500">10:00 (600s)</span>
          </div>

          <div className="text-center font-bold text-[#f2633a]">
            {((currentTime / TOTAL_DURATION_SECONDS) * 360).toFixed(1)}°
          </div>

          <div className="flex items-center space-x-2">
            <span>Gate {currentGate.id} of 72</span>
            <span className="text-stone-600">•</span>
            <span>~8.33s / gate</span>
          </div>
        </div>
      </div>

      {/* Lower Row: Playback Controls & Speed Multipliers & Act Jump Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-stone-800/60">
        {/* Play / Pause / Step Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onSeek(Math.max(0, currentTime - 50 / 6))}
            className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-white transition-all"
            title="Previous Decan Gate (-8.33s)"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={onTogglePlay}
            className="px-5 py-2 rounded-xl bg-[#f2633a] hover:bg-[#ff724a] text-white font-semibold flex items-center space-x-2 shadow-lg shadow-[#f2633a]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span className="text-xs font-blueprint">PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span className="text-xs font-blueprint">START TRAVERSAL</span>
              </>
            )}
          </button>

          <button
            onClick={() => onSeek(Math.min(TOTAL_DURATION_SECONDS, currentTime + 50 / 6))}
            className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-white transition-all"
            title="Next Decan Gate (+8.33s)"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={onReset}
            className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-white transition-all"
            title="Reset Traversal to Gate 1 (0:00)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Speed multiplier selector */}
        <div className="flex items-center space-x-1 bg-[#07090f] p-1 rounded-xl border border-stone-800">
          <span className="text-[10px] font-blueprint text-stone-500 px-2 uppercase">Speed:</span>
          {[0.5, 1, 2, 5, 10].map((spd) => (
            <button
              key={spd}
              onClick={() => onChangeSpeed(spd)}
              className={`px-2 py-1 text-[11px] font-blueprint rounded-lg transition-all ${
                playbackSpeed === spd
                  ? 'bg-[#f2633a] text-white font-bold shadow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>

        {/* 12 Acts Quick Jump Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto py-1">
          {ACTS_DATA.map((act) => {
            const isCurrent = currentAct.actNumber === act.actNumber;
            return (
              <button
                key={act.actNumber}
                onClick={() => onSeek(act.startTime)}
                className={`px-2 py-1 text-[10px] font-blueprint rounded border transition-all ${
                  isCurrent
                    ? 'bg-[#f2633a]/20 border-[#f2633a] text-[#f2633a] font-bold'
                    : 'bg-[#090c14] border-[#1b2230] text-stone-400 hover:text-stone-200'
                }`}
                title={`Jump to Act ${act.actNumber}: ${act.sign} (${act.subtitle})`}
              >
                {act.symbol} {act.sign.substring(0, 3)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
