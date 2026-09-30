import React, { useState, useMemo } from 'react';
import { GATES_DATA, ACTS_DATA } from '../data/cosmologyData';
import { GateData } from '../types/cosmology';
import { Eye, ZoomIn, ZoomOut, RotateCcw, AlertTriangle, Shield, Compass } from 'lucide-react';

interface CelestialWheelSchematicProps {
  currentDegree: number;
  currentGate: GateData;
  onSelectGate: (gate: GateData) => void;
  onOpenOphiuchusBreach: () => void;
  polarityBalance: number; // 0 (Angel) to 1 (Demon)
  isBreachActive?: boolean;
}

export const CelestialWheelSchematic: React.FC<CelestialWheelSchematicProps> = ({
  currentDegree,
  currentGate,
  onSelectGate,
  onOpenOphiuchusBreach,
  polarityBalance,
  isBreachActive = false,
}) => {
  const [hoveredGate, setHoveredGate] = useState<GateData | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showTechnicalCallouts, setShowTechnicalCallouts] = useState<boolean>(true);
  const [showPhiGeometry, setShowPhiGeometry] = useState<boolean>(true);
  const [showDualPolarityBeads, setShowDualPolarityBeads] = useState<boolean>(true);

  // Center coordinate for SVG (1000 x 1000 canvas)
  const cx = 500;
  const cy = 500;
  const outerR = 430;
  const signRingOuterR = 405;
  const signRingInnerR = 365;
  const decanRingOuterR = 365;
  const decanRingInnerR = 330;
  const gateRingOuterR = 330;
  const gateRingInnerR = 270;
  const hubOuterR = 90;
  const hubInnerR = 36;

  // Polar to Cartesian conversion
  const polarToCart = (r: number, deg: number) => {
    // 0 deg at top (12 o'clock), rotating clockwise
    const rad = ((deg - 90) * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  // Generate 72 gate spokes & tick paths
  const gateSectors = useMemo(() => {
    return GATES_DATA.map((gate) => {
      const midDeg = gate.startDegree + 2.5;
      const p1 = polarToCart(gateRingInnerR, gate.startDegree);
      const p2 = polarToCart(gateRingOuterR, gate.startDegree);
      const p3 = polarToCart(gateRingOuterR, gate.endDegree);
      const p4 = polarToCart(gateRingInnerR, gate.endDegree);
      const textPos = polarToCart((gateRingInnerR + gateRingOuterR) / 2, midDeg);
      const outerTick = polarToCart(outerR + 12, gate.startDegree);
      const innerTick = polarToCart(outerR, gate.startDegree);

      // Arc path
      const largeArc = 0;
      const pathD = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} A ${gateRingOuterR} ${gateRingOuterR} 0 ${largeArc} 1 ${p3.x} ${p3.y} L ${p4.x} ${p4.y} A ${gateRingInnerR} ${gateRingInnerR} 0 ${largeArc} 0 ${p1.x} ${p1.y} Z`;

      const isActive = currentGate.id === gate.id;
      const isHovered = hoveredGate?.id === gate.id;

      return {
        gate,
        pathD,
        textPos,
        midDeg,
        outerTick,
        innerTick,
        isActive,
        isHovered,
      };
    });
  }, [currentGate.id, hoveredGate?.id]);

  // Generate 12 Zodiac sign sectors
  const signSectors = useMemo(() => {
    return ACTS_DATA.map((act) => {
      const midDeg = act.startDegree + 15;
      const p1 = polarToCart(signRingInnerR, act.startDegree);
      const p2 = polarToCart(signRingOuterR, act.startDegree);
      const p3 = polarToCart(signRingOuterR, act.endDegree);
      const p4 = polarToCart(signRingInnerR, act.endDegree);
      const glyphPos = polarToCart((signRingInnerR + signRingOuterR) / 2, midDeg);

      const pathD = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} A ${signRingOuterR} ${signRingOuterR} 0 0 1 ${p3.x} ${p3.y} L ${p4.x} ${p4.y} A ${signRingInnerR} ${signRingInnerR} 0 0 0 ${p1.x} ${p1.y} Z`;

      const isCurrentAct = currentGate.actNumber === act.actNumber;

      return {
        act,
        pathD,
        glyphPos,
        midDeg,
        isCurrentAct,
      };
    });
  }, [currentGate.actNumber]);

  // Golden Ratio Pentagram & Decagram vertices
  const phiStarPoints = useMemo(() => {
    const starRadius = 265;
    // 5-point star (72° increments: 0, 72, 144, 216, 288)
    const pts = [0, 72, 144, 216, 288].map((deg) => polarToCart(starRadius, deg));
    // Order for drawing star: 0 -> 144 -> 288 -> 72 -> 216 -> 0
    return `${pts[0].x},${pts[0].y} ${pts[2].x},${pts[2].y} ${pts[4].x},${pts[4].y} ${pts[1].x},${pts[1].y} ${pts[3].x},${pts[3].y} ${pts[0].x},${pts[0].y}`;
  }, []);

  const phiDecagramPoints = useMemo(() => {
    const r = 265;
    const pts = Array.from({ length: 10 }).map((_, i) => polarToCart(r, i * 36));
    // Alternate 10-star
    const order = [0, 3, 6, 9, 2, 5, 8, 1, 4, 7, 0];
    return order.map((idx) => `${pts[idx].x},${pts[idx].y}`).join(' ');
  }, []);

  // 108° Zen Shield Arc and Ray
  const zenShieldArc = useMemo(() => {
    // 108° angle reference from 240° seam breach back to 132°
    const startAngle = 132;
    const endAngle = 240;
    const r = 295;
    const pStart = polarToCart(r, startAngle);
    const pEnd = polarToCart(r, endAngle);
    return `M ${pStart.x} ${pStart.y} A ${r} ${r} 0 0 1 ${pEnd.x} ${pEnd.y}`;
  }, []);

  // Active cursor vector coordinates
  const activeCursorPos = polarToCart(outerR + 25, currentDegree);
  const activeInnerCursorPos = polarToCart(gateRingInnerR - 15, currentDegree);

  // Dual Polarity Beads (Angel bead + Demon bead orbiting active gate)
  const angelBeadPos = polarToCart(gateRingOuterR - 12, currentDegree - 1.2);
  const demonBeadPos = polarToCart(gateRingInnerR + 12, currentDegree + 1.2);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none overflow-hidden bg-[#07090e] border border-[#1e2433] rounded-2xl shadow-2xl">
      {/* Top HUD Header bar mirroring schematic title */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-3 bg-[#0a0d14]/90 backdrop-blur-md border-b border-[#1f2637]">
        <div className="flex items-center space-x-3">
          <Compass className="w-5 h-5 text-[#f2633a] animate-pulse" />
          <div>
            <h2 className="text-xs md:text-sm font-blueprint font-bold tracking-widest text-[#f2f4f8] uppercase flex items-center space-x-2">
              <span>360° CELESTIAL MIRROR ENGINE</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#f2633a]/20 text-[#f2633a] border border-[#f2633a]/30">SACRED GEOMETRY</span>
            </h2>
            <p className="text-[10px] font-blueprint text-[#696a6d]">
              MASTER SCHEMATIC • 72 DECAN GATES • DUAL POLARITY CELESTIAL ARCHITECTURE
            </p>
          </div>
        </div>

        {/* Viewport & Blueprint Layer Toggles */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowPhiGeometry(!showPhiGeometry)}
            className={`px-2.5 py-1 text-[11px] font-blueprint rounded border transition-all flex items-center space-x-1.5 ${
              showPhiGeometry
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                : 'bg-stone-900 border-stone-800 text-stone-500 hover:text-stone-400'
            }`}
            title="Toggle Golden Ratio Phi (1.618) Sacred Geometry Rays"
          >
            <span>Φ 1.618</span>
          </button>

          <button
            onClick={() => setShowTechnicalCallouts(!showTechnicalCallouts)}
            className={`px-2.5 py-1 text-[11px] font-blueprint rounded border transition-all flex items-center space-x-1.5 ${
              showTechnicalCallouts
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400'
                : 'bg-stone-900 border-stone-800 text-stone-500 hover:text-stone-400'
            }`}
            title="Toggle Technical Engineering Schematics & Callouts"
          >
            <span>HUD Schematics</span>
          </button>

          <button
            onClick={onOpenOphiuchusBreach}
            className="px-2.5 py-1 text-[11px] font-blueprint rounded border border-rose-500/50 bg-rose-950/40 text-rose-300 hover:bg-rose-900/60 hover:text-white transition-all flex items-center space-x-1 shadow-lg shadow-rose-950/50"
            title="Breach the 360° Seam at Gate 48 (240°) into the Ophiuchus Void"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
            <span>240° Seam Breach</span>
          </button>

          <div className="flex items-center space-x-1 pl-2 border-l border-stone-800">
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.6, z + 0.15))}
              className="p-1 rounded bg-stone-900 border border-stone-800 text-stone-400 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.15))}
              className="p-1 rounded bg-stone-900 border border-stone-800 text-stone-400 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1 rounded bg-stone-900 border border-stone-800 text-stone-400 hover:text-white"
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative w-full h-[620px] md:h-[700px] flex items-center justify-center p-2 pt-14 pb-8 overflow-hidden bg-blueprint-grid">
        <svg
          viewBox="0 0 1000 1000"
          className="w-full h-full max-w-[860px] max-h-[860px] transition-transform duration-300 ease-out drop-shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <defs>
            {/* Ambient Celestial Glows */}
            <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f2633a" stopOpacity="0.3" />
              <stop offset="60%" stopColor="#1e2433" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#07090e" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="angelGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#facc15" />
            </linearGradient>

            <linearGradient id="demonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>

            <pattern id="hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="#252d3d" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Background Technical Grid Circles */}
          <circle cx={cx} cy={cy} r={outerR + 50} fill="none" stroke="#161b26" strokeWidth="1" strokeDasharray="3,3" />
          <circle cx={cx} cy={cy} r={outerR + 30} fill="none" stroke="#1d2433" strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r={outerR} fill="none" stroke="#2a3449" strokeWidth="2" />
          <circle cx={cx} cy={cy} r={hubOuterR} fill="url(#hubGlow)" stroke="#2a3449" strokeWidth="1.5" />

          {/* 4 Corner Engineering Technical Diagrams (Matching Master Schematic image) */}
          {showTechnicalCallouts && (
            <g className="text-cyan-400/70 select-none">
              {/* TOP LEFT: Scientific Coordinates & Cursor Reference */}
              <g transform="translate(30, 40)">
                <rect x="0" y="0" width="180" height="110" fill="#080b12" fillOpacity="0.8" stroke="#1f293d" strokeWidth="1" />
                <path d="M 10 25 L 70 25 L 70 75 L 10 75 Z" fill="url(#hatch)" stroke="#38bdf8" strokeWidth="1" />
                <path d="M 70 35 L 140 35 L 140 65 L 70 65" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2,2" />
                <line x1="10" y1="85" x2="140" y2="85" stroke="#475569" strokeWidth="0.8" />
                <text x="10" y="16" fill="#94a3b8" fontSize="8" fontFamily="monospace">SCIENTIFIC COORDINATES</text>
                <text x="10" y="100" fill="#64748b" fontSize="7" fontFamily="monospace">TOL: 0.005 • RADIAL POLARITY</text>
              </g>

              {/* TOP RIGHT: Radial Structural Spoke Slicing */}
              <g transform="translate(790, 40)">
                <rect x="0" y="0" width="180" height="110" fill="#080b12" fillOpacity="0.8" stroke="#1f293d" strokeWidth="1" />
                <path d="M 30 30 L 70 30 L 70 80 L 30 80 Z" fill="url(#hatch)" stroke="#38bdf8" strokeWidth="1" />
                <circle cx="120" cy="55" r="22" fill="none" stroke="#38bdf8" strokeWidth="1" />
                <circle cx="120" cy="55" r="8" fill="none" stroke="#f2633a" strokeWidth="1" />
                <line x1="120" y1="20" x2="120" y2="90" stroke="#475569" strokeWidth="0.8" strokeDasharray="3,2" />
                <text x="10" y="16" fill="#94a3b8" fontSize="8" fontFamily="monospace">RADIAL SPOKE SLICING</text>
                <text x="10" y="100" fill="#64748b" fontSize="7" fontFamily="monospace">BEARING COLLAR: 108° ARC</text>
              </g>

              {/* BOTTOM LEFT: Decan Realignment & Micro-Feeders */}
              <g transform="translate(30, 850)">
                <rect x="0" y="0" width="180" height="110" fill="#080b12" fillOpacity="0.8" stroke="#1f293d" strokeWidth="1" />
                <path d="M 20 70 L 60 70 L 60 30 L 100 30 L 100 70 L 140 70" fill="none" stroke="#38bdf8" strokeWidth="1.2" />
                <circle cx="80" cy="50" r="4" fill="#f2633a" />
                <text x="10" y="16" fill="#94a3b8" fontSize="8" fontFamily="monospace">72 DECAN REALIGNMENT</text>
                <text x="10" y="100" fill="#64748b" fontSize="7" fontFamily="monospace">QUINANCE FEEDERS (5° INC)</text>
              </g>

              {/* BOTTOM RIGHT: Split Axis Hub & Title Block */}
              <g transform="translate(790, 850)">
                <rect x="0" y="0" width="180" height="110" fill="#080b12" fillOpacity="0.8" stroke="#1f293d" strokeWidth="1" />
                <circle cx="60" cy="55" r="25" fill="none" stroke="#38bdf8" strokeWidth="1" />
                <circle cx="60" cy="55" r="14" fill="none" stroke="#22d3ee" strokeWidth="0.8" strokeDasharray="2,2" />
                <circle cx="60" cy="55" r="4" fill="#38bdf8" />
                <text x="10" y="16" fill="#94a3b8" fontSize="8" fontFamily="monospace">SPLIT AXIS BUSHING</text>
                <text x="10" y="100" fill="#64748b" fontSize="7" fontFamily="monospace">RESONANCE: 40Hz SUB-BASS</text>
              </g>

              {/* Center Bottom Blueprint Signature Plaque */}
              <g transform="translate(310, 935)">
                <rect x="0" y="0" width="380" height="42" fill="#0b0e17" stroke="#253044" strokeWidth="1.2" />
                <text x="190" y="18" fill="#e2e8f0" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  MASTER SCHEMATIC: CELESTIAL MIRROR ENGINE
                </text>
                <text x="190" y="32" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  72-GATE ZODIAC WHEEL • GEMINI NOTEBOOK COSMOLOGY
                </text>
              </g>
            </g>
          )}

          {/* 12 Zodiac Sign Segments (Outer Layer) */}
          <g id="zodiac-signs">
            {signSectors.map(({ act, pathD, glyphPos, midDeg, isCurrentAct }) => (
              <g
                key={act.actNumber}
                className="cursor-pointer transition-all duration-200"
                onClick={() => {
                  const firstGateInAct = GATES_DATA.find((g) => g.id === act.gateIds[0]);
                  if (firstGateInAct) onSelectGate(firstGateInAct);
                }}
              >
                <path
                  d={pathD}
                  fill={isCurrentAct ? act.colorPalette.primary : '#0c101a'}
                  fillOpacity={isCurrentAct ? 0.25 : 0.4}
                  stroke={isCurrentAct ? act.colorPalette.primary : '#1f293d'}
                  strokeWidth={isCurrentAct ? 2 : 1}
                  className="hover:fill-opacity-50 transition-all"
                />
                {/* Zodiac Sign Glyph */}
                <text
                  x={glyphPos.x}
                  y={glyphPos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={isCurrentAct ? '#ffffff' : '#94a3b8'}
                  fontSize={isCurrentAct ? 20 : 16}
                  fontWeight="bold"
                  className="pointer-events-none transition-all"
                >
                  {act.symbol}
                </text>
                {/* Degree indicator at boundary */}
                {(() => {
                  const pos = polarToCart(signRingOuterR + 14, act.startDegree);
                  return (
                    <text
                      x={pos.x}
                      y={pos.y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#64748b"
                      fontSize="9"
                      fontFamily="monospace"
                      className="pointer-events-none"
                    >
                      {act.startDegree}°
                    </text>
                  );
                })()}
              </g>
            ))}
          </g>

          {/* 72 Decan Quinance Gates (Inner Interactive Ring) */}
          <g id="decan-gates">
            {gateSectors.map(({ gate, pathD, textPos, isActive, isHovered }) => {
              const strokeColor = isActive
                ? '#f2633a'
                : isHovered
                ? '#38bdf8'
                : gate.isBreachPoint
                ? '#f43f5e'
                : '#1f283a';

              const fillColor = isActive
                ? '#f2633a'
                : gate.isBreachPoint
                ? '#e11d48'
                : isHovered
                ? '#0284c7'
                : '#090d16';

              const fillOpacity = isActive ? 0.35 : gate.isBreachPoint ? 0.45 : isHovered ? 0.3 : 0.2;

              return (
                <g
                  key={gate.id}
                  onClick={() => onSelectGate(gate)}
                  onMouseEnter={() => setHoveredGate(gate)}
                  onMouseLeave={() => setHoveredGate(null)}
                  className="cursor-pointer transition-all duration-150 group"
                >
                  <path
                    d={pathD}
                    fill={fillColor}
                    fillOpacity={fillOpacity}
                    stroke={strokeColor}
                    strokeWidth={isActive ? 2.5 : isHovered ? 2 : 0.8}
                    className="transition-all"
                  />
                  {/* Gate Number Label */}
                  <text
                    x={textPos.x}
                    y={textPos.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={isActive ? '#ffffff' : isHovered ? '#38bdf8' : '#64748b'}
                    fontSize={isActive ? '11' : '8'}
                    fontFamily="monospace"
                    fontWeight={isActive ? 'bold' : 'normal'}
                    className="pointer-events-none"
                  >
                    {gate.id}
                  </text>
                </g>
              );
            })}
          </g>

          {/* Inscribed Sacred Geometry: Golden Ratio Pentagram & Decagram (Phi 1.618) */}
          {showPhiGeometry && (
            <g id="sacred-geometry" className="pointer-events-none opacity-60">
              {/* Outer Decagram Star */}
              <polygon
                points={phiDecagramPoints}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="0.8"
                strokeDasharray="4,4"
              />
              {/* Inner Pentagram Star */}
              <polygon
                points={phiStarPoints}
                fill="none"
                stroke="#facc15"
                strokeWidth="1.2"
                strokeOpacity="0.8"
              />
              {/* Concentric Golden Ratio Circles */}
              <circle cx={cx} cy={cy} r={265} fill="none" stroke="#facc15" strokeWidth="0.6" strokeDasharray="6,3" />
              <circle cx={cx} cy={cy} r={265 / 1.618} fill="none" stroke="#38bdf8" strokeWidth="0.6" strokeDasharray="3,3" />
              <circle cx={cx} cy={cy} r={265 / (1.618 * 1.618)} fill="none" stroke="#f2633a" strokeWidth="0.6" strokeDasharray="2,2" />

              {/* Text Callouts for Phi (1.618) as shown in master blueprint */}
              <text x="590" y="380" fill="#facc15" fontSize="9" fontFamily="monospace" transform="rotate(-36 590 380)">
                Phi (1.618)
              </text>
              <text x="390" y="660" fill="#facc15" fontSize="9" fontFamily="monospace" transform="rotate(-36 390 660)">
                Phi (1.618)
              </text>
            </g>
          )}

          {/* THE 108° ZEN SHIELD & 240° SEAM BREACH (Scorpio Gate 48) */}
          <g id="zen-shield-breach">
            {/* 108° Zen Shield Arc */}
            <path
              d={zenShieldArc}
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
              strokeDasharray="4,2"
              className="animate-pulse"
            />
            {/* 108° Arc Label */}
            {(() => {
              const labelPos = polarToCart(315, 186);
              return (
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  fill="#10b981"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="select-none"
                >
                  108° ZEN SHIELD
                </text>
              );
            })()}

            {/* Gate 48: 240° Seam Breach Vector to Ophiuchus Void */}
            {(() => {
              const breachOrigin = polarToCart(gateRingOuterR, 240);
              const breachTarget = polarToCart(outerR + 55, 240);
              return (
                <g className="cursor-pointer" onClick={onOpenOphiuchusBreach}>
                  <line
                    x1={breachOrigin.x}
                    y1={breachOrigin.y}
                    x2={breachTarget.x}
                    y2={breachTarget.y}
                    stroke="#f43f5e"
                    strokeWidth="3.5"
                    strokeDasharray="6,3"
                    className="animate-pulse"
                  />
                  <polygon
                    points={`${breachTarget.x},${breachTarget.y - 6} ${breachTarget.x + 8},${breachTarget.y + 6} ${breachTarget.x - 8},${breachTarget.y + 6}`}
                    fill="#f43f5e"
                    transform={`rotate(150 ${breachTarget.x} ${breachTarget.y})`}
                  />
                  <text
                    x={breachTarget.x - 15}
                    y={breachTarget.y + 18}
                    fill="#f43f5e"
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    240° BREACH [OPHIUCHUS VOID]
                  </text>
                </g>
              );
            })()}
          </g>

          {/* Central Core & Axis Crosshairs */}
          <g id="center-core">
            {/* Axis Lines */}
            <line x1={cx - outerR - 40} y1={cy} x2={cx + outerR + 40} y2={cy} stroke="#1e293b" strokeWidth="1" strokeDasharray="6,4" />
            <line x1={cx} y1={cy - outerR - 40} x2={cx} y2={cy + outerR + 40} stroke="#1e293b" strokeWidth="1" strokeDasharray="6,4" />

            {/* Inner Hub Assembly */}
            <circle cx={cx} cy={cy} r={hubOuterR} fill="#0d111a" stroke="#334155" strokeWidth="2" />
            <circle cx={cx} cy={cy} r={hubOuterR - 15} fill="#090d16" stroke="#f2633a" strokeWidth="1.2" strokeDasharray="4,2" />
            <circle cx={cx} cy={cy} r={hubInnerR} fill="#07090e" stroke="#38bdf8" strokeWidth="2" />
            <circle cx={cx} cy={cy} r="6" fill="#f2633a" className="animate-ping opacity-75" />
            <circle cx={cx} cy={cy} r="3" fill="#ffffff" />

            {/* Active Degree & Gate Readout in Center Hub */}
            <text x={cx} y={cy - 12} textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">
              GATE {currentGate.id}/72
            </text>
            <text x={cx} y={cy + 18} textAnchor="middle" fill="#f2633a" fontSize="12" fontWeight="bold" fontFamily="monospace">
              {currentDegree.toFixed(1)}°
            </text>
          </g>

          {/* REAL-TIME DUAL POLARITY RETICLE & ACTIVE TRACKING INDICATOR */}
          <g id="active-cursor">
            {/* Main Laser Pointer Ray */}
            <line
              x1={cx}
              y1={cy}
              x2={activeCursorPos.x}
              y2={activeCursorPos.y}
              stroke="#f2633a"
              strokeWidth="2"
              strokeOpacity="0.8"
            />
            {/* Target Reticle at active gate */}
            <circle
              cx={activeCursorPos.x}
              cy={activeCursorPos.y}
              r="6"
              fill="none"
              stroke="#f2633a"
              strokeWidth="2"
              className="animate-ping"
            />
            <circle cx={activeCursorPos.x} cy={activeCursorPos.y} r="3" fill="#f2633a" />

            {/* Dual Polarity Beads (Angel: Cyan/Gold, Demon: Rose/Violet) */}
            {showDualPolarityBeads && (
              <g className="transition-all duration-300">
                {/* Angel Celestial Light Bead */}
                <circle
                  cx={angelBeadPos.x}
                  cy={angelBeadPos.y}
                  r={5 * (1 - polarityBalance * 0.4)}
                  fill="url(#angelGlow)"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  className="filter drop-shadow-[0_0_8px_#38bdf8]"
                />
                {/* Demon Chthonic Shadow Bead */}
                <circle
                  cx={demonBeadPos.x}
                  cy={demonBeadPos.y}
                  r={5 * (0.6 + polarityBalance * 0.6)}
                  fill="url(#demonGlow)"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  className="filter drop-shadow-[0_0_8px_#f43f5e]"
                />
              </g>
            )}
          </g>
        </svg>

        {/* Hover / Active Gate Floating HUD Tooltip */}
        {(hoveredGate || currentGate) && (
          <div className="absolute bottom-4 left-6 z-20 pointer-events-none max-w-sm bg-[#0a0d16]/95 border border-[#252f42] rounded-xl p-3 shadow-2xl backdrop-blur-md">
            {(() => {
              const g = hoveredGate || currentGate;
              return (
                <div>
                  <div className="flex items-center justify-between border-b border-stone-800 pb-1.5 mb-1.5">
                    <span className="text-xs font-blueprint font-bold text-[#f2633a]">
                      GATE {g.id}: {g.startDegree}° – {g.endDegree}° {g.sign.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-blueprint px-1.5 py-0.5 rounded bg-stone-800 text-stone-300">
                      QUINANCE {g.quinanceIndex} • ACT {g.actNumber}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-blueprint mb-1.5">
                    <div className="text-sky-300 flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-sky-400 inline-block"></span>
                      <span>{g.angel.name} ({g.angel.hebrew})</span>
                    </div>
                    <div className="text-rose-400 flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
                      <span>{g.demon.name} (Seal #{g.demon.goetiaNumber})</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-stone-400 line-clamp-2 italic">
                    "{g.harmonicInteraction}"
                  </p>
                </div>
              );
            })()}
          </div>
        )}

        {/* Legend / Status Telemetry in Bottom-Right */}
        <div className="absolute bottom-4 right-6 z-20 hidden md:flex items-center space-x-3 text-[10px] font-blueprint text-stone-400 bg-[#0a0d16]/80 px-3 py-1.5 rounded-lg border border-stone-800">
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-sky-400"></span>
            <span>Shem Angel (Light)</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span>Ars Goetia (Shadow)</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>108° Zen Shield</span>
          </div>
        </div>
      </div>
    </div>
  );
};
