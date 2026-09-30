/**
 * The Mirror of Spheres — 360° Celestial Mirror Engine & 72 Decan Gates
 * @license Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ACTS_DATA, GATES_DATA, TOTAL_DURATION_SECONDS, OPHIUCHUS_DATA } from './data/cosmologyData';
import { ActData, GateData } from './types/cosmology';
import { soundEngine } from './audio/HarmonicAudioEngine';
import { CelestialWheelSchematic } from './components/CelestialWheelSchematic';
import { TransportBar } from './components/TransportBar';
import { GateInspector } from './components/GateInspector';
import { VeoVideoStudio } from './components/VeoVideoStudio';
import { OphiuchusBreachModal } from './components/OphiuchusBreachModal';
import { CosmicOracleModal } from './components/CosmicOracleModal';
import { GuardianArtifactModal } from './components/GuardianArtifactModal';
import { ApiStructuralStudio } from './components/ApiStructuralStudio';
import { 
  Compass, 
  Video, 
  Shield, 
  AlertTriangle, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Layers, 
  Flame, 
  Wind, 
  Droplet,
  Info,
  Maximize2,
  Code2
} from 'lucide-react';

export default function App() {
  // Traversal timeline state: 0 to 600 seconds (10 minutes)
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [polarityBalance, setPolarityBalance] = useState<number>(0.5); // 0 = Light, 0.5 = Balanced, 1 = Dark

  // Modals state
  const [isVeoStudioOpen, setIsVeoStudioOpen] = useState<boolean>(false);
  const [isBreachModalOpen, setIsBreachModalOpen] = useState<boolean>(false);
  const [isOracleModalOpen, setIsOracleModalOpen] = useState<boolean>(false);
  const [isArtifactModalOpen, setIsArtifactModalOpen] = useState<boolean>(false);
  const [isApiStudioOpen, setIsApiStudioOpen] = useState<boolean>(false);
  const [selectedGateForAction, setSelectedGateForAction] = useState<GateData>(GATES_DATA[0]);
  const [isBreachModeActive, setIsBreachModeActive] = useState<boolean>(false);

  // Derive current degree (0 to 360)
  const currentDegree = (currentTime / TOTAL_DURATION_SECONDS) * 360;

  // Derive current Act (1 - 12)
  const currentAct: ActData = ACTS_DATA.find(
    (act) => currentTime >= act.startTime && (currentTime < act.endTime || (act.actNumber === 12 && currentTime <= act.endTime))
  ) || ACTS_DATA[0];

  // Derive current Gate (1 - 72)
  const currentGate: GateData = GATES_DATA.find(
    (gate) => currentTime >= gate.startTime && (currentTime < gate.endTime || (gate.id === 72 && currentTime <= gate.endTime))
  ) || GATES_DATA[0];

  const prevActRef = useRef<number>(currentAct.actNumber);
  const prevGateRef = useRef<number>(currentGate.id);

  // Synchronize audio engine with active Act & Gate changes
  useEffect(() => {
    if (prevActRef.current !== currentAct.actNumber || prevGateRef.current !== currentGate.id) {
      prevActRef.current = currentAct.actNumber;
      prevGateRef.current = currentGate.id;
      if (isPlaying) {
        soundEngine.init();
        soundEngine.setAct(currentAct.actNumber, currentGate.id, isBreachModeActive);
      }
    }
  }, [currentAct.actNumber, currentGate.id, isPlaying, isBreachModeActive]);

  // Update sound polarity
  useEffect(() => {
    soundEngine.setPolarity(polarityBalance);
  }, [polarityBalance]);

  // Main playback timer loop (requestAnimationFrame with delta time)
  useEffect(() => {
    if (!isPlaying) return;

    let lastTime = performance.now();
    let animId: number;

    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      setCurrentTime((prev) => {
        let next = prev + dt * playbackSpeed;
        // Seamless loop closure at 600s (10:00) into Gate 1
        if (next >= TOTAL_DURATION_SECONDS) {
          next = 0;
        }
        return next;
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, playbackSpeed]);

  const handleTogglePlay = () => {
    soundEngine.init();
    if (!isPlaying) {
      soundEngine.setAct(currentAct.actNumber, currentGate.id, isBreachModeActive);
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (timeInSecs: number) => {
    const clamped = Math.max(0, Math.min(TOTAL_DURATION_SECONDS, timeInSecs));
    setCurrentTime(clamped);
    if (isPlaying) {
      soundEngine.init();
      const targetAct = ACTS_DATA.find((a) => clamped >= a.startTime && clamped < a.endTime) || ACTS_DATA[0];
      const targetGate = GATES_DATA.find((g) => clamped >= g.startTime && clamped < g.endTime) || GATES_DATA[0];
      soundEngine.setAct(targetAct.actNumber, targetGate.id, isBreachModeActive);
    }
  };

  const handleSelectGate = (gate: GateData) => {
    handleSeek(gate.startTime + 0.1);
  };

  const handleReset = () => {
    setCurrentTime(0);
    setIsBreachModeActive(false);
    if (isPlaying) {
      soundEngine.setAct(1, 1, false);
    }
  };

  // Open Veo 3 Video Studio targeting a specific gate
  const handleOpenVeoStudio = (gate?: GateData) => {
    setSelectedGateForAction(gate || currentGate);
    setIsVeoStudioOpen(true);
  };

  // Open Cosmic Oracle targeting a specific gate
  const handleOpenOracle = (gate?: GateData) => {
    setSelectedGateForAction(gate || currentGate);
    setIsOracleModalOpen(true);
  };

  // Open 240° Seam Breach modal
  const handleOpenBreach = () => {
    setIsBreachModalOpen(true);
  };

  // Engage Ophiuchus Breach audio drone
  const handleEngageBreachAudio = () => {
    soundEngine.init();
    setIsBreachModeActive(true);
    soundEngine.setAct(currentAct.actNumber, currentGate.id, true);
    setIsBreachModalOpen(false);
  };

  const getElementBadge = (elem: string) => {
    switch (elem) {
      case 'Fire':
        return (
          <span className="flex items-center space-x-1 text-orange-400 bg-orange-950/40 border border-orange-600/30 px-2 py-0.5 rounded-full text-xs font-blueprint">
            <Flame className="w-3 h-3 text-orange-400" />
            <span>Fire</span>
          </span>
        );
      case 'Earth':
        return (
          <span className="flex items-center space-x-1 text-emerald-400 bg-emerald-950/40 border border-emerald-600/30 px-2 py-0.5 rounded-full text-xs font-blueprint">
            <Layers className="w-3 h-3 text-emerald-400" />
            <span>Earth</span>
          </span>
        );
      case 'Air':
        return (
          <span className="flex items-center space-x-1 text-sky-400 bg-sky-950/40 border border-sky-600/30 px-2 py-0.5 rounded-full text-xs font-blueprint">
            <Wind className="w-3 h-3 text-sky-400" />
            <span>Air</span>
          </span>
        );
      case 'Water':
        return (
          <span className="flex items-center space-x-1 text-cyan-400 bg-cyan-950/40 border border-cyan-600/30 px-2 py-0.5 rounded-full text-xs font-blueprint">
            <Droplet className="w-3 h-3 text-cyan-400" />
            <span>Water</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#06070a] text-[#f2f4f8] flex flex-col font-sans selection:bg-[#f2633a]/30">
      {/* Top Universal Celestial Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#090b12]/95 backdrop-blur-xl border-b border-[#1c2436] px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Logo & Subtitle */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f2633a] to-[#992211] p-0.5 flex items-center justify-center shadow-lg shadow-[#f2633a]/25">
              <div className="w-full h-full bg-[#090b12] rounded-[10px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-[#f2633a] animate-spin-slow" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base md:text-lg font-bold font-sacred tracking-wider text-white">
                  THE MIRROR OF SPHERES
                </h1>
                <span className="text-[10px] font-blueprint px-2 py-0.5 rounded-full bg-[#f2633a]/20 border border-[#f2633a]/40 text-[#f2633a] font-bold">
                  360° ENGINE
                </span>
              </div>
              <p className="text-xs text-stone-400 font-blueprint">
                72 Decan Gates • 12 Zodiac Acts • Shem & Goetia Counter-Polarity
              </p>
            </div>
          </div>

          {/* Current Traversal Telemetry */}
          <div className="hidden lg:flex items-center space-x-3 bg-[#0d121f] px-3.5 py-1.5 rounded-xl border border-stone-800">
            <div className="text-right">
              <div className="text-[10px] font-blueprint text-stone-500 uppercase">Act Coordinate</div>
              <div className="text-xs font-blueprint text-[#f2633a] font-bold">
                Act {currentAct.actNumber}: {currentAct.sign} ({currentDegree.toFixed(1)}°)
              </div>
            </div>
            <div className="w-px h-6 bg-stone-800" />
            <div className="text-left">
              <div className="text-[10px] font-blueprint text-stone-500 uppercase">Decan Gate</div>
              <div className="text-xs font-blueprint text-sky-400 font-bold">
                Gate {currentGate.id}/72 ({currentGate.angel.name} & {currentGate.demon.name})
              </div>
            </div>
          </div>

          {/* Action Modals Triggers */}
          <div className="flex items-center space-x-2.5">
            {/* API Matrix & Structural Studio Trigger */}
            <button
              onClick={() => setIsApiStudioOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-orange-950/60 border border-orange-500/50 text-orange-300 hover:text-white hover:bg-orange-900/60 text-xs font-blueprint flex items-center space-x-1.5 transition-all shadow-md shadow-orange-950/40"
              title="Open API-Level Structural Model, 72-Gate Raw Array, and Python Scripts"
            >
              <Code2 className="w-3.5 h-3.5 text-orange-400" />
              <span>API Matrix & Studio</span>
            </button>

            {/* Artifacts Viewer */}
            <button
              onClick={() => setIsArtifactModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white hover:bg-stone-800 text-xs font-blueprint flex items-center space-x-1.5 transition-all"
              title="View Master Blueprint & Guardian Magus Artifacts"
            >
              <Shield className="w-3.5 h-3.5 text-stone-400" />
              <span className="hidden sm:inline">Master Schematic</span>
            </button>

            {/* Ophiuchus 240° Seam Breach Trigger */}
            <button
              onClick={handleOpenBreach}
              className={`px-3 py-1.5 rounded-xl border text-xs font-blueprint flex items-center space-x-1.5 transition-all ${
                isBreachModeActive
                  ? 'bg-rose-950 border-rose-500 text-rose-300 shadow-lg shadow-rose-950 animate-pulse'
                  : 'bg-stone-900 border-stone-800 text-stone-300 hover:text-white'
              }`}
              title="Trigger Gate 48 (240°) Seam Breach into the Ophiuchus Void"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">240° Breach</span>
            </button>

            {/* Veo 3 Video Studio Launcher (Mandated Feature) */}
            <button
              onClick={() => handleOpenVeoStudio(currentGate)}
              className="px-3.5 py-1.5 rounded-xl bg-[#f2633a] hover:bg-[#ff724a] text-white text-xs font-blueprint font-semibold flex items-center space-x-1.5 shadow-lg shadow-[#f2633a]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Veo 3 Studio</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Traversal Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {/* Top Split: Interactive Master Schematic (Center) & Gate Polarized Inspector (Side) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left/Center Column: 360° Master Schematic Wheel */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col space-y-4">
            <CelestialWheelSchematic
              currentDegree={currentDegree}
              currentGate={currentGate}
              onSelectGate={handleSelectGate}
              onOpenOphiuchusBreach={handleOpenBreach}
              polarityBalance={polarityBalance}
              isBreachActive={isBreachModeActive}
            />
          </div>

          {/* Right Column: Gate Inspector & Current Act Environment Details */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col space-y-4">
            {/* Act Overview Card */}
            <div className="bg-[#0a0d15] border border-[#1e2538] rounded-2xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold font-sacred text-white">
                    {currentAct.symbol} {currentAct.sign.toUpperCase()}
                  </span>
                  {getElementBadge(currentAct.element)}
                </div>
                <span className="text-xs font-blueprint text-[#f2633a] font-bold">
                  ACT {currentAct.actNumber} OF 12
                </span>
              </div>

              <div>
                <div className="text-xs font-blueprint text-stone-400 font-semibold mb-1 uppercase tracking-wider">
                  Visual Environment
                </div>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  {currentAct.globalVisualEnvironment}
                </p>
              </div>

              <div>
                <div className="text-xs font-blueprint text-amber-400 font-semibold mb-1 uppercase tracking-wider">
                  Audio Engine Profile
                </div>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  {currentAct.audioDescription}
                </p>
              </div>
            </div>

            {/* Gate Inspector & Dual Polarized Mirror */}
            <GateInspector
              gate={currentGate}
              act={currentAct}
              polarityBalance={polarityBalance}
              onOpenVeoStudioForGate={handleOpenVeoStudio}
              onOpenOracleForGate={handleOpenOracle}
              onOpenBreachModal={handleOpenBreach}
            />
          </div>
        </div>

        {/* 10-Minute Timeline Transport Bar (Fixed to bottom or docked) */}
        <TransportBar
          currentTime={currentTime}
          isPlaying={isPlaying}
          playbackSpeed={playbackSpeed}
          currentAct={currentAct}
          currentGate={currentGate}
          onTogglePlay={handleTogglePlay}
          onSeek={handleSeek}
          onChangeSpeed={setPlaybackSpeed}
          onReset={handleReset}
          polarityBalance={polarityBalance}
          onChangePolarity={setPolarityBalance}
        />

        {/* 72 Decan Gates Quick Navigator Grid */}
        <div className="bg-[#090b14] border border-[#1d2538] rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-stone-800 pb-2">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-[#f2633a]" />
              <h3 className="text-xs font-blueprint font-bold uppercase tracking-wider text-white">
                All 72 Decan Quinance Gates (5° Increments)
              </h3>
            </div>
            <span className="text-xs font-blueprint text-stone-500">
              Click any gate node to jump traversal
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-1.5 max-h-56 overflow-y-auto pr-1">
            {GATES_DATA.map((g) => {
              const isCurrent = currentGate.id === g.id;
              const isBreach = g.isBreachPoint;

              return (
                <button
                  key={g.id}
                  onClick={() => handleSelectGate(g)}
                  className={`p-1.5 rounded-lg border text-left transition-all flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-[#f2633a] border-[#f2633a] text-white shadow-md font-bold'
                      : isBreach
                      ? 'bg-rose-950/40 border-rose-600 text-rose-300 hover:bg-rose-900/60'
                      : 'bg-[#0c101a] border-stone-800/80 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                  }`}
                  title={`Gate ${g.id}: ${g.startDegree}°–${g.endDegree}° ${g.sign} | Angel: ${g.angel.name} & Demon: ${g.demon.name}`}
                >
                  <div className="flex items-center justify-between text-[9px] font-blueprint">
                    <span>G{g.id}</span>
                    <span className="text-[8px] opacity-75">{g.sign.substring(0, 2)}</span>
                  </div>
                  <div className="text-[9px] truncate font-sans mt-0.5">
                    {g.angel.name}
                  </div>
                  <div className="text-[8px] truncate opacity-75">
                    {g.demon.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer with Cosmological Citations */}
      <footer className="border-t border-[#1a2130] bg-[#07080d] py-6 px-4 md:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-blueprint text-stone-500">
          <div className="flex items-center space-x-2">
            <span>The Mirror of Spheres</span>
            <span>•</span>
            <span>72 Shem HaMephorash Angels</span>
            <span>•</span>
            <span>72 Ars Goetia Demons</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsArtifactModalOpen(true)}
              className="hover:text-stone-300 transition-colors"
            >
              Master Blueprint Archive
            </button>
            <span>•</span>
            <button
              onClick={() => setIsApiStudioOpen(true)}
              className="text-orange-400 hover:text-orange-300 transition-colors"
            >
              API Structural Model & Python Script
            </button>
            <span>•</span>
            <button
              onClick={handleOpenBreach}
              className="text-rose-400 hover:text-rose-300 transition-colors"
            >
              108° Zen Shield (Gate 48)
            </button>
            <span>•</span>
            <button
              onClick={() => handleOpenVeoStudio(currentGate)}
              className="text-[#f2633a] hover:text-[#ff724a] transition-colors"
            >
              Veo 3 Fast Generator
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {isApiStudioOpen && (
        <ApiStructuralStudio
          isOpen={isApiStudioOpen}
          onClose={() => setIsApiStudioOpen(false)}
        />
      )}

      {isVeoStudioOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto">
            <VeoVideoStudio
              initialGate={selectedGateForAction}
              initialAct={currentAct}
              onClose={() => setIsVeoStudioOpen(false)}
            />
          </div>
        </div>
      )}

      {isBreachModalOpen && (
        <OphiuchusBreachModal
          isOpen={isBreachModalOpen}
          onClose={() => setIsBreachModalOpen(false)}
          onEngageBreachAudio={handleEngageBreachAudio}
          onOpenVeoForBreach={() => {
            setIsBreachModalOpen(false);
            handleOpenVeoStudio(GATES_DATA.find((g) => g.id === 48));
          }}
        />
      )}

      {isOracleModalOpen && (
        <CosmicOracleModal
          gate={selectedGateForAction}
          act={ACTS_DATA.find((a) => a.actNumber === selectedGateForAction.actNumber) || currentAct}
          isOpen={isOracleModalOpen}
          onClose={() => setIsOracleModalOpen(false)}
        />
      )}

      {isArtifactModalOpen && (
        <GuardianArtifactModal
          isOpen={isArtifactModalOpen}
          onClose={() => setIsArtifactModalOpen(false)}
        />
      )}
    </div>
  );
}
