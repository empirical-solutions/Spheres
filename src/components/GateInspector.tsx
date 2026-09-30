import React from 'react';
import { GateData, ActData } from '../types/cosmology';
import { Sun, Moon, Sparkles, Video, Flame, Shield, BookOpen, AlertOctagon } from 'lucide-react';

interface GateInspectorProps {
  gate: GateData;
  act: ActData;
  polarityBalance: number;
  onOpenVeoStudioForGate: (gate: GateData) => void;
  onOpenOracleForGate: (gate: GateData) => void;
  onOpenBreachModal?: () => void;
}

export const GateInspector: React.FC<GateInspectorProps> = ({
  gate,
  act,
  polarityBalance,
  onOpenVeoStudioForGate,
  onOpenOracleForGate,
  onOpenBreachModal,
}) => {
  return (
    <div className="w-full bg-[#0a0d15] border border-[#1e2538] rounded-2xl p-6 shadow-2xl flex flex-col space-y-5">
      {/* Header with Coordinates, Act, Quinance */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-blueprint px-2 py-0.5 rounded bg-[#f2633a]/20 border border-[#f2633a]/40 text-[#f2633a] font-bold">
              GATE {gate.id} OF 72
            </span>
            <span className="text-xs font-blueprint text-stone-400">
              {gate.startDegree}° – {gate.endDegree}° {gate.sign.toUpperCase()} (Quinance {gate.quinanceIndex}/6)
            </span>
            {gate.isBreachPoint && (
              <span className="text-xs font-blueprint px-2 py-0.5 rounded bg-rose-950 border border-rose-600 text-rose-300 font-bold flex items-center space-x-1 animate-pulse">
                <AlertOctagon className="w-3 h-3 text-rose-400" />
                <span>240° SEAM BREACH POINT</span>
              </span>
            )}
          </div>
          <h3 className="text-lg md:text-xl font-bold font-sacred text-white mt-1">
            {gate.angel.name} <span className="text-stone-500 font-normal">&</span> {gate.demon.name}
          </h3>
        </div>

        <div className="flex items-center space-x-2">
          {gate.isBreachPoint && onOpenBreachModal && (
            <button
              onClick={onOpenBreachModal}
              className="px-3 py-1.5 rounded-xl bg-rose-900/60 border border-rose-500 text-rose-200 text-xs font-blueprint font-semibold hover:bg-rose-800 flex items-center space-x-1.5 shadow-lg shadow-rose-950"
            >
              <Shield className="w-3.5 h-3.5 text-rose-400" />
              <span>Breach Ophiuchus Void</span>
            </button>
          )}

          <button
            onClick={() => onOpenOracleForGate(gate)}
            className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 text-xs font-blueprint hover:bg-stone-800 flex items-center space-x-1.5 transition-all"
            title="Channel Hermetic Oracle Commentary via Gemini"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Cosmic Oracle</span>
          </button>

          <button
            onClick={() => onOpenVeoStudioForGate(gate)}
            className="px-3.5 py-1.5 rounded-xl bg-[#f2633a] hover:bg-[#ff724a] text-white text-xs font-blueprint font-semibold flex items-center space-x-1.5 shadow-lg shadow-[#f2633a]/20 transition-all hover:scale-[1.02]"
            title="Generate Veo 3 Video Visualization for this Gate"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Generate Veo 3 Video</span>
          </button>
        </div>
      </div>

      {/* Dual Polarized Mirror: Angel (Celestial Light) vs Demon (Chthonic Shadow) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Shem HaMephorash Angel (Celestial Light) */}
        <div className="relative rounded-xl p-5 bg-gradient-to-br from-[#0c1322] to-[#080b12] border border-sky-500/30 shadow-lg overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Sun className="w-24 h-24 text-sky-400" />
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-sky-950/80 border border-sky-500/40 flex items-center justify-center text-sky-400">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-blueprint tracking-wider uppercase text-sky-400 font-bold block">
                  SHEM HAMEPHORASH ANGEL
                </span>
                <span className="text-xs text-stone-400 font-blueprint">
                  Celestial Light ({gate.angel.frequencyHz}Hz)
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xl font-bold font-sacred text-sky-300">
                {gate.angel.hebrew}
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="text-lg font-bold text-white tracking-wide">
              {gate.angel.name}
            </div>
            <div className="text-stone-300 italic">
              "{gate.angel.divineAttribute}"
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-sky-950 text-[11px] font-blueprint text-stone-400">
              <div>
                <span className="text-stone-500 block">Choir:</span>
                <span className="text-sky-300 font-medium">{gate.angel.choir}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Sphere:</span>
                <span className="text-sky-300 font-medium">{gate.angel.sphere}</span>
              </div>
            </div>

            <p className="text-[11px] text-stone-400 pt-1 leading-relaxed">
              {gate.angel.lightManifestation}
            </p>
          </div>
        </div>

        {/* Ars Goetia Demon (Chthonic Shadow) */}
        <div className="relative rounded-xl p-5 bg-gradient-to-br from-[#1b0d14] to-[#080b12] border border-rose-500/30 shadow-lg overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Moon className="w-24 h-24 text-rose-400" />
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-rose-950/80 border border-rose-500/40 flex items-center justify-center text-rose-400">
                <Moon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-blueprint tracking-wider uppercase text-rose-400 font-bold block">
                  ARS GOETIA DEMON
                </span>
                <span className="text-xs text-stone-400 font-blueprint">
                  Chthonic Shadow ({gate.demon.frequencyHz}Hz)
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-blueprint px-2 py-0.5 rounded bg-rose-950 border border-rose-800 text-rose-300 font-bold">
                SEAL #{gate.demon.goetiaNumber}
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="text-lg font-bold text-white tracking-wide">
              {gate.demon.name}
            </div>
            <div className="text-stone-300 italic">
              "{gate.demon.chthonicTitle}"
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-rose-950 text-[11px] font-blueprint text-stone-400">
              <div>
                <span className="text-stone-500 block">Rank:</span>
                <span className="text-rose-300 font-medium">{gate.demon.rank}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Legions:</span>
                <span className="text-rose-300 font-medium">{gate.demon.legions}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Metal:</span>
                <span className="text-rose-300 font-medium">{gate.demon.metal}</span>
              </div>
            </div>

            <p className="text-[11px] text-stone-400 pt-1 leading-relaxed">
              {gate.demon.shadowManifestation}
            </p>
          </div>
        </div>
      </div>

      {/* Harmonic Exchange Callout (Verbatim from specification) */}
      <div className="rounded-xl bg-[#080b12] border border-amber-500/20 p-4">
        <div className="flex items-center space-x-2 text-xs font-blueprint text-amber-400 font-bold mb-1">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>HARMONIC POLARITY EXCHANGE</span>
        </div>
        <p className="text-sm text-stone-200 leading-relaxed font-sans">
          {gate.harmonicInteraction}
        </p>

        <div className="mt-3 flex items-center justify-between text-xs font-blueprint text-stone-400 pt-2 border-t border-stone-800">
          <span>Element: <strong className="text-white">{gate.element}</strong></span>
          <span>Timecode Slot: <strong className="text-white">{(gate.startTime).toFixed(1)}s – {(gate.endTime).toFixed(1)}s</strong></span>
          <span>Duration: <strong className="text-white">~8.33s</strong></span>
        </div>
      </div>
    </div>
  );
};
