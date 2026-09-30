import React, { useState } from 'react';
import { GateData, ActData } from '../types/cosmology';
import { BookOpen, Sparkles, X, Loader2, Compass, Sun, Moon } from 'lucide-react';

interface CosmicOracleModalProps {
  gate: GateData;
  act: ActData;
  isOpen: boolean;
  onClose: () => void;
}

export const CosmicOracleModal: React.FC<CosmicOracleModalProps> = ({
  gate,
  act,
  isOpen,
  onClose,
}) => {
  const [oracleResponse, setOracleResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [queryType, setQueryType] = useState<'meditation' | 'hermetic_analysis' | 'polarity_ritual'>('hermetic_analysis');

  if (!isOpen) return null;

  const handleConsultOracle = async (type: 'meditation' | 'hermetic_analysis' | 'polarity_ritual') => {
    setQueryType(type);
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/oracle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gateId: gate.id,
          angelName: gate.angel.name,
          demonName: gate.demon.name,
          actSign: act.sign,
          element: act.element,
          queryType: type,
        }),
      });

      if (!res.ok) {
        throw new Error('Oracle consultation failed');
      }

      const data = await res.json();
      setOracleResponse(data.commentary);
    } catch (err: any) {
      console.error(err);
      setOracleResponse(
        `At Gate ${gate.id} (${gate.startDegree}°–${gate.endDegree}° ${gate.sign}), the celestial radiance of ${gate.angel.name} (${gate.angel.frequencyHz}Hz) is locked in sacred equilibrium with the chthonic embers of ${gate.demon.name} (${gate.demon.frequencyHz}Hz). In this quinance node of ${act.element}, light does not extinguish shadow; rather, both cohere in a dynamic tensegrity.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#090c14] border border-[#232d42] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-[#0e1422] px-6 py-4 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-sacred text-white flex items-center space-x-2">
                <span>COSMIC ORACLE • GATE {gate.id}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 font-blueprint">
                  {act.sign} ({gate.startDegree}°–{gate.endDegree}°)
                </span>
              </h3>
              <p className="text-xs text-stone-400 font-blueprint">
                Harmonic Hermetic Commentary for {gate.angel.name} & {gate.demon.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Query Type Buttons */}
        <div className="px-6 py-3 bg-[#0c101a] border-b border-stone-800/80 flex items-center space-x-2 overflow-x-auto">
          <button
            onClick={() => handleConsultOracle('hermetic_analysis')}
            className={`px-3 py-1.5 rounded-xl text-xs font-blueprint transition-all flex items-center space-x-1.5 ${
              queryType === 'hermetic_analysis'
                ? 'bg-amber-500/20 border border-amber-500/50 text-amber-300 font-bold'
                : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Hermetic Analysis</span>
          </button>

          <button
            onClick={() => handleConsultOracle('meditation')}
            className={`px-3 py-1.5 rounded-xl text-xs font-blueprint transition-all flex items-center space-x-1.5 ${
              queryType === 'meditation'
                ? 'bg-amber-500/20 border border-amber-500/50 text-amber-300 font-bold'
                : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Gate Meditation</span>
          </button>

          <button
            onClick={() => handleConsultOracle('polarity_ritual')}
            className={`px-3 py-1.5 rounded-xl text-xs font-blueprint transition-all flex items-center space-x-1.5 ${
              queryType === 'polarity_ritual'
                ? 'bg-amber-500/20 border border-amber-500/50 text-amber-300 font-bold'
                : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>Polarity Invocation</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center space-y-3 text-center">
              <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
              <div className="text-sm font-blueprint text-stone-300">
                Channeling cosmological resonance for Gate {gate.id}...
              </div>
              <p className="text-xs text-stone-500 italic">
                Querying the Shem HaMephorash & Ars Goetia dual polarity coordinate space
              </p>
            </div>
          ) : oracleResponse ? (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#0e1320] border border-amber-500/20 shadow-inner">
                <div className="text-xs font-blueprint text-amber-400 font-bold mb-2 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="uppercase">{queryType.replace('_', ' ')} REVELATION</span>
                </div>
                <div className="text-sm text-stone-200 leading-relaxed font-sans whitespace-pre-line">
                  {oracleResponse}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800 text-xs font-blueprint text-stone-400 flex items-center justify-between">
                <span>Shem Angel: <strong className="text-sky-300">{gate.angel.name}</strong> ({gate.angel.frequencyHz}Hz)</span>
                <span>Goetia Demon: <strong className="text-rose-400">{gate.demon.name}</strong> ({gate.demon.frequencyHz}Hz)</span>
              </div>
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
              <BookOpen className="w-12 h-12 text-stone-600" />
              <div className="max-w-md">
                <h4 className="text-base font-bold text-white mb-1">
                  Consult the Celestial Oracle
                </h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  In The Mirror of Spheres, each of the 72 decan gates unites celestial light and chthonic shadow. Consult Gemini to reveal the deeper metaphysical mystery of Gate {gate.id}.
                </p>
              </div>
              <button
                onClick={() => handleConsultOracle('hermetic_analysis')}
                className="px-5 py-2.5 rounded-xl bg-[#f2633a] hover:bg-[#ff724a] text-white font-blueprint text-xs font-bold transition-all shadow-lg shadow-[#f2633a]/25"
              >
                Reveal Hermetic Commentary
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
