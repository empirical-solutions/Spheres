import React from 'react';
import { OPHIUCHUS_DATA, GATES_DATA } from '../data/cosmologyData';
import { GateData } from '../types/cosmology';
import { 
  Shield, 
  AlertTriangle, 
  X, 
  Sparkles, 
  Compass, 
  Radio, 
  Flame, 
  Eye, 
  Video,
  Key
} from 'lucide-react';

interface OphiuchusBreachModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEngageBreachAudio: () => void;
  onOpenVeoForBreach: () => void;
}

export const OphiuchusBreachModal: React.FC<OphiuchusBreachModalProps> = ({
  isOpen,
  onClose,
  onEngageBreachAudio,
  onOpenVeoForBreach,
}) => {
  if (!isOpen) return null;

  const gate48 = GATES_DATA.find((g) => g.id === 48)!;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#090b12] border-2 border-rose-500/60 rounded-3xl shadow-[0_0_80px_rgba(244,63,94,0.3)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Warning Banner */}
        <div className="bg-gradient-to-r from-rose-950 via-red-900 to-black px-6 py-3 border-b border-rose-500/40 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 text-rose-300">
            <AlertTriangle className="w-5 h-5 text-rose-400 animate-bounce" />
            <span className="text-xs font-blueprint font-bold tracking-widest uppercase">
              CRITICAL COSMOLOGICAL ANOMALY • 240° SEAM BREACH DETECTED
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-rose-400 hover:text-white hover:bg-rose-900/40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          {/* Hero Section with Magus Sentinel & Sacred Coordinates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Guardian of the Spheres (Runic Magus Illustration) */}
            <div className="md:col-span-1 flex flex-col items-center justify-center">
              <div className="relative w-48 h-64 rounded-2xl overflow-hidden border-2 border-rose-500/50 shadow-2xl bg-gradient-to-b from-[#180911] via-[#090b14] to-black p-3 flex flex-col items-center justify-between text-center group">
                {/* Visual depiction of the Hooded Magus holding Runic Staff from user's uploaded image */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-950/40 via-transparent to-black" />
                
                {/* SVG of Guardian Magus with Runic Staff */}
                <svg viewBox="0 0 200 260" className="w-full h-full relative z-10 drop-shadow-[0_0_12px_rgba(244,63,94,0.6)]">
                  {/* Obsidian Monoliths in Background */}
                  <polygon points="10,260 25,20 65,10 50,260" fill="#0d111a" stroke="#252f44" strokeWidth="1" />
                  <polygon points="140,260 160,30 190,40 180,260" fill="#0d111a" stroke="#252f44" strokeWidth="1" />

                  {/* Dark Hooded Robe */}
                  <path d="M 50 160 Q 100 80 150 160 L 170 260 L 30 260 Z" fill="#121318" stroke="#1f222b" strokeWidth="1.5" />
                  {/* Deep Hood with Crimson Velvet Lining */}
                  <path d="M 60 130 C 60 60, 140 60, 140 130 C 130 160, 70 160, 60 130 Z" fill="#08090d" stroke="#e11d48" strokeWidth="2" />
                  <path d="M 72 130 C 72 80, 128 80, 128 130 Z" fill="#2a0812" />

                  {/* Elder Face with Glowing Crimson Eyes */}
                  <circle cx="92" cy="115" r="3.5" fill="#ff2255" className="animate-ping opacity-75" />
                  <circle cx="92" cy="115" r="2.5" fill="#ff4466" />
                  <circle cx="108" cy="115" r="3.5" fill="#ff2255" className="animate-ping opacity-75" />
                  <circle cx="108" cy="115" r="2.5" fill="#ff4466" />
                  {/* Full White Beard */}
                  <path d="M 80 135 Q 100 190 120 135 Q 100 170 80 135" fill="#d1d5db" opacity="0.9" />

                  {/* Carved Obsidian Staff Pulsing with Crimson Runes */}
                  <polygon points="62,10 74,10 52,260 42,260" fill="#1b1c22" stroke="#e11d48" strokeWidth="1.5" />
                  {/* Glowing Runes on Staff */}
                  <text x="63" y="45" fill="#ff2255" fontSize="11" fontFamily="monospace" fontWeight="bold">ᛗ</text>
                  <text x="59" y="80" fill="#ff2255" fontSize="12" fontFamily="monospace" fontWeight="bold">ᛏ</text>
                  <text x="56" y="115" fill="#ff2255" fontSize="11" fontFamily="monospace" fontWeight="bold">ᚲ</text>
                  <text x="53" y="150" fill="#ff2255" fontSize="12" fontFamily="monospace" fontWeight="bold">ᚱ</text>
                  <text x="49" y="195" fill="#ff2255" fontSize="11" fontFamily="monospace" fontWeight="bold">ᛉ</text>
                  <text x="46" y="235" fill="#ff2255" fontSize="12" fontFamily="monospace" fontWeight="bold">ᛟ</text>

                  {/* Hand clasping staff with runic tattoos */}
                  <ellipse cx="64" cy="138" rx="8" ry="6" fill="#78350f" opacity="0.8" />
                  <ellipse cx="58" cy="190" rx="8" ry="6" fill="#78350f" opacity="0.8" />
                </svg>

                <div className="relative z-10 w-full pt-1 border-t border-rose-950">
                  <div className="text-[10px] font-blueprint font-bold text-rose-300">
                    GUARDIAN SENTINEL
                  </div>
                  <div className="text-[9px] text-stone-400 font-blueprint">
                    Arch-Magus of the Obsidian Staff
                  </div>
                </div>
              </div>
            </div>

            {/* Description & Technical Breakdown */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <span className="text-xs font-blueprint text-rose-400 font-bold tracking-widest uppercase">
                  THE 13TH COORDINATE: THE OPHIUCHUS VOID
                </span>
                <h2 className="text-2xl font-bold font-sacred text-white flex items-center space-x-2 mt-0.5">
                  <span>{OPHIUCHUS_DATA.name}</span>
                  <span className="text-rose-400">{OPHIUCHUS_DATA.symbol}</span>
                </h2>
                <div className="text-xs font-blueprint text-amber-300 mt-1">
                  Breach Coordinate: 240.0° (Gate 48: Mihael & Haagenti) • Zen Angle: 108.0°
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-stone-800 space-y-2 text-xs text-stone-300 leading-relaxed font-sans">
                <p>
                  In the canonical <strong>Mirror of Spheres</strong> cosmology, the deterministic 360° circuit is bounded by 12 Zodiac Acts. However, at <strong className="text-rose-400">Gate 48 (25°–30° Scorpio | 240°)</strong>, the demon <strong className="text-white">Haagenti</strong> transmutates the abyssal waters.
                </p>
                <p>
                  At this precise boundary, the <strong className="text-emerald-400">108° Zen Shield</strong> initiates a lateral vector breach, disrupting the closed loop and opening the gateway into the <strong className="text-purple-300">Ophiuchus Void</strong>.
                </p>
              </div>

              {/* Technical Specifications Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-blueprint">
                <div className="p-2.5 rounded-lg bg-[#0e121e] border border-stone-800">
                  <span className="text-stone-500 text-[10px] block">BREACH DEGREE</span>
                  <span className="text-rose-400 font-bold">240° SCORPIO</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0e121e] border border-stone-800">
                  <span className="text-stone-500 text-[10px] block">PHI RAY VECTOR</span>
                  <span className="text-amber-400 font-bold">108° ZEN SHIELD</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0e121e] border border-stone-800">
                  <span className="text-stone-500 text-[10px] block">RESONANT TONE</span>
                  <span className="text-sky-400 font-bold">108Hz SUB-DRONE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2 text-xs font-blueprint text-stone-400">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Lateral Vector Status: <strong className="text-white">ARMED</strong></span>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={onEngageBreachAudio}
                className="px-4 py-2 rounded-xl bg-emerald-950 border border-emerald-600 text-emerald-300 hover:bg-emerald-900 text-xs font-blueprint font-semibold flex items-center space-x-1.5 transition-all shadow-lg shadow-emerald-950/60"
              >
                <Radio className="w-4 h-4 text-emerald-400" />
                <span>Synthesize 108Hz Zen Drone</span>
              </button>

              <button
                onClick={onOpenVeoForBreach}
                className="px-4 py-2 rounded-xl bg-[#f2633a] hover:bg-[#ff724a] text-white text-xs font-blueprint font-semibold flex items-center space-x-1.5 transition-all shadow-lg shadow-[#f2633a]/25 hover:scale-[1.02]"
              >
                <Video className="w-4 h-4" />
                <span>Generate Veo 3 Void Video</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
