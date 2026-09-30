import React, { useState } from 'react';
import { Shield, Compass, X, Image as ImageIcon, Sparkles, Check, Key } from 'lucide-react';

interface GuardianArtifactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuardianArtifactModal: React.FC<GuardianArtifactModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'schematic' | 'magus'>('schematic');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#090b14] border border-[#232f48] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#0e1424] px-6 py-4 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#f2633a]/20 border border-[#f2633a]/40 flex items-center justify-center text-[#f2633a]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-sacred text-white flex items-center space-x-2">
                <span>SACRED COSMOLOGICAL ARTIFACTS</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 font-blueprint">
                  CANONICAL ARCHIVES
                </span>
              </h3>
              <p className="text-xs text-stone-400 font-blueprint">
                Review Master Technical Blueprint & Sentinel Magus of the Obsidian Staff
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

        {/* Tab Switcher */}
        <div className="px-6 py-3 bg-[#0a0d18] border-b border-stone-800 flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('schematic')}
            className={`px-4 py-2 rounded-xl text-xs font-blueprint flex items-center space-x-2 transition-all ${
              activeTab === 'schematic'
                ? 'bg-[#f2633a] text-white font-bold shadow'
                : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Master Schematic: 72-Gate Engine</span>
          </button>

          <button
            onClick={() => setActiveTab('magus')}
            className={`px-4 py-2 rounded-xl text-xs font-blueprint flex items-center space-x-2 transition-all ${
              activeTab === 'magus'
                ? 'bg-rose-600 text-white font-bold shadow'
                : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>The Guardian: Arch-Magus of the Staff</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 md:p-8 overflow-y-auto">
          {activeTab === 'schematic' ? (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-black/60 border border-cyan-500/30 flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/2 rounded-xl overflow-hidden border border-stone-800 bg-[#07090e] p-2 flex items-center justify-center">
                  {/* Schematic Vector Preview */}
                  <svg viewBox="0 0 400 400" className="w-full h-auto max-h-[300px]">
                    <circle cx="200" cy="200" r="170" fill="none" stroke="#253248" strokeWidth="2" />
                    <circle cx="200" cy="200" r="150" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3,3" />
                    <circle cx="200" cy="200" r="130" fill="none" stroke="#f2633a" strokeWidth="1" />
                    <circle cx="200" cy="200" r="40" fill="#0d111a" stroke="#facc15" strokeWidth="1.5" />
                    {/* Golden ratio pentagram */}
                    <polygon
                      points="200,60 295,129 259,241 141,241 105,129"
                      fill="none"
                      stroke="#facc15"
                      strokeWidth="1.5"
                    />
                    <polygon
                      points="200,60 259,241 105,129 295,129 141,241"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="1.2"
                    />
                    {/* 108° Zen Shield Indicator */}
                    <path d="M 120 280 A 130 130 0 0 1 280 280" fill="none" stroke="#10b981" strokeWidth="3" />
                    <text x="200" y="320" fill="#10b981" fontSize="10" fontFamily="monospace" textAnchor="middle">
                      108° ZEN SHIELD
                    </text>
                    <text x="200" y="205" fill="#f2633a" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                      360° ENGINE
                    </text>
                  </svg>
                </div>

                <div className="w-full md:w-1/2 space-y-3">
                  <div className="text-xs font-blueprint text-cyan-400 font-bold uppercase tracking-wider">
                    MASTER SCHEMATIC BLUEPRINT
                  </div>
                  <h4 className="text-lg font-bold font-sacred text-white">
                    360° Celestial Mirror Engine & 72 Decan Gates
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed font-sans">
                    The master architectural blueprint encodes the closed 12-act elemental progression with 72 quinance sectors (5° each). Sacred geometry overlays include the Golden Ratio (Phi 1.618), the 108° Zen Shield arc, and the 240° seam breach vector.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-blueprint text-stone-400 pt-2 border-t border-stone-800">
                    <div>
                      <span className="text-stone-500 block">Degrees:</span>
                      <span className="text-white">360° Closed Circle</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Decan Gates:</span>
                      <span className="text-white">72 (5° increments)</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Zodiac Acts:</span>
                      <span className="text-white">12 (30° / 50s each)</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Breach Vector:</span>
                      <span className="text-rose-400">Gate 48 (240.0°)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-black/60 border border-rose-500/30 flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/2 rounded-xl overflow-hidden border border-rose-950 bg-[#090a10] p-4 flex items-center justify-center">
                  {/* Detailed Sentinel Magus SVG from uploaded image */}
                  <svg viewBox="0 0 240 320" className="w-full h-auto max-h-[320px] drop-shadow-[0_0_20px_rgba(225,29,72,0.4)]">
                    {/* Background obsidian pillar blocks */}
                    <rect x="15" y="10" width="70" height="300" fill="#0d0e14" stroke="#1f2433" strokeWidth="1" />
                    <rect x="155" y="10" width="70" height="300" fill="#0d0e14" stroke="#1f2433" strokeWidth="1" />

                    {/* Dark Robe */}
                    <path d="M 60 170 Q 120 70 180 170 L 210 320 L 30 320 Z" fill="#13141a" stroke="#252733" strokeWidth="1.5" />
                    {/* Hood with crimson lining */}
                    <path d="M 75 130 C 75 50, 165 50, 165 130 C 150 170, 90 170, 75 130 Z" fill="#090a0f" stroke="#e11d48" strokeWidth="2.5" />
                    <path d="M 88 130 C 88 70, 152 70, 152 130 Z" fill="#2d0a14" />

                    {/* Glowing crimson eyes */}
                    <circle cx="110" cy="115" r="4" fill="#ff2255" />
                    <circle cx="130" cy="115" r="4" fill="#ff2255" />
                    {/* Beard */}
                    <path d="M 98 135 Q 120 210 142 135 Q 120 180 98 135" fill="#e2e8f0" opacity="0.9" />

                    {/* Carved Obsidian Staff with pulsating runes */}
                    <polygon points="76,10 88,10 65,320 53,320" fill="#17181f" stroke="#e11d48" strokeWidth="2" />
                    <text x="77" y="55" fill="#ff2255" fontSize="13" fontFamily="monospace" fontWeight="bold">ᛗ</text>
                    <text x="73" y="100" fill="#ff2255" fontSize="14" fontFamily="monospace" fontWeight="bold">ᛏ</text>
                    <text x="69" y="145" fill="#ff2255" fontSize="13" fontFamily="monospace" fontWeight="bold">ᚲ</text>
                    <text x="66" y="190" fill="#ff2255" fontSize="14" fontFamily="monospace" fontWeight="bold">ᚱ</text>
                    <text x="62" y="240" fill="#ff2255" fontSize="13" fontFamily="monospace" fontWeight="bold">ᛉ</text>
                    <text x="58" y="290" fill="#ff2255" fontSize="14" fontFamily="monospace" fontWeight="bold">ᛟ</text>

                    {/* Clasping hands with tattooed runes */}
                    <circle cx="78" cy="155" r="9" fill="#78350f" opacity="0.8" />
                    <circle cx="71" cy="220" r="9" fill="#78350f" opacity="0.8" />
                  </svg>
                </div>

                <div className="w-full md:w-1/2 space-y-3">
                  <div className="text-xs font-blueprint text-rose-400 font-bold uppercase tracking-wider">
                    SENTINEL OF THE SPHERES
                  </div>
                  <h4 className="text-lg font-bold font-sacred text-white">
                    The Arch-Magus of the Runic Staff
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed font-sans">
                    The eternal watcher who safeguards the threshold between the 360° celestial wheel and the unmanifest Ophiuchus Void. Clad in heavy dark wool with crimson velvet cowl, holding the faceted obsidian staff carved with glowing primordial runes.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-blueprint text-stone-400 pt-2 border-t border-stone-800">
                    <div>
                      <span className="text-stone-500 block">Sphere Order:</span>
                      <span className="text-white">Void Sentinel</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Relic:</span>
                      <span className="text-rose-400">Runic Obsidian Staff</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Resonance:</span>
                      <span className="text-amber-400">108Hz Zen Sub-Harmonic</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Ripley Audit:</span>
                      <span className="text-emerald-400">Verified & Intact</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
