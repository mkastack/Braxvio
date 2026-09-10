'use client';

import React, { useState } from 'react';
import { Truck, Navigation, Recycle, Activity, MapPin, Gauge, Play, CheckCircle2 } from 'lucide-react';

export default function EcoliftMockup() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [fuelSaved, setFuelSaved] = useState('34.8%');
  const [tokens, setTokens] = useState(52);
  const [claimed, setClaimed] = useState(false);

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      setFuelSaved((prev) => (prev === '34.8%' ? '41.2%' : '34.8%'));
    }, 700);
  };

  const handleClaimReward = () => {
    if (!claimed) {
      setTokens((prev) => prev + 25);
      setClaimed(true);
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto rounded-3xl bg-[#071C2B] border border-[#11AFC1]/30 shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden text-white transition-all duration-500 hover:border-[#42D6C5]/60 group">
      {/* Background System Grid */}
      <div className="absolute inset-0 braxvio-grid-dark opacity-30 pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 bg-[#06131D]/90 border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#42D6C5] animate-pulse" />
          <span className="text-xs font-bold tracking-tight text-white">ECOLIFT</span>
          <span className="text-[10px] font-mono text-[#42D6C5]">/ MUNICIPAL LOGISTICS MESH</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
          <Activity className="w-3.5 h-3.5 text-[#42D6C5]" />
          <span>ROUTE OPTIMIZER V2.4</span>
        </div>
      </div>

      <div className="relative z-10 p-5 space-y-4">
        {/* Dynamic Route Telemetry Panel with live recalculate trigger */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#42D6C5]" />
              <span className="text-xs font-bold text-white">Fleet Unit #EL-409 • Osu Sector</span>
            </div>
            <button
              onClick={handleOptimize}
              disabled={isOptimizing}
              className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-[#42D6C5]/20 text-[#42D6C5] border border-[#42D6C5]/30 hover:bg-[#42D6C5]/30 transition-all flex items-center gap-1.5"
            >
              <Navigation className={`w-3 h-3 ${isOptimizing ? 'animate-spin' : ''}`} />
              <span>{isOptimizing ? 'Recalculating...' : 'Optimize Waypoints'}</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <div className="text-[10px] font-mono text-slate-400">Fuel Saved</div>
              <div className="text-sm font-extrabold text-[#42D6C5] font-mono transition-all">
                -{fuelSaved}
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <div className="text-[10px] font-mono text-slate-400">Payload Vol</div>
              <div className="text-sm font-bold text-white">4.2 Tons</div>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <div className="text-[10px] font-mono text-slate-400">Waypoints</div>
              <div className="text-sm font-bold text-white">18/22 Cleared</div>
            </div>
          </div>
        </div>

        {/* Dynamic Simulated Map / Waypoints */}
        <div className="rounded-2xl border border-white/10 bg-black/50 p-4 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-[11px] text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#11AFC1]" /> Next: Ring Road Commercial Hub
            </span>
            <span className="text-[10px] font-mono text-[#42D6C5] bg-[#42D6C5]/10 px-2 py-0.5 rounded border border-[#42D6C5]/20">
              Bin Telemetry: 94% Full
            </span>
          </div>

          {/* Graphical Path Visualizer with Animated Pulse */}
          <div className="relative h-14 w-full flex items-center px-4 rounded-xl bg-white/5 border border-white/5 overflow-hidden">
            <div className="absolute inset-x-4 h-1 bg-slate-800 rounded-full">
              <div className="h-full bg-gradient-to-r from-[#008FC4] via-[#11AFC1] to-[#42D6C5] w-[78%] rounded-full transition-all duration-700" />
            </div>
            <div className="relative flex justify-between w-full z-10">
              <div className="w-3.5 h-3.5 rounded-full bg-[#11AFC1] ring-4 ring-[#071C2B] shadow-md" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#11AFC1] ring-4 ring-[#071C2B] shadow-md" />
              <div className="w-5 h-5 rounded-full bg-[#42D6C5] ring-4 ring-[#071C2B] animate-pulse flex items-center justify-center shadow-lg">
                <div className="w-2 h-2 rounded-full bg-[#071C2B]" />
              </div>
              <div className="w-3.5 h-3.5 rounded-full bg-slate-600 ring-4 ring-[#071C2B]" />
            </div>
          </div>
        </div>

        {/* Citizen Circular Reward Tokenization with Interactive Claim */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-[#002F5B] to-[#071C2B] border border-[#11AFC1]/30 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#42D6C5]/20 flex items-center justify-center text-[#42D6C5]">
              <Recycle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Household Recyclable Credits</div>
              <div className="text-[10px] text-slate-300">14.2 kg sorted PET plastics validated</div>
            </div>
          </div>
          <button
            onClick={handleClaimReward}
            className="text-xs font-mono font-bold text-[#42D6C5] bg-[#42D6C5]/15 hover:bg-[#42D6C5]/25 px-3 py-1.5 rounded-lg border border-[#42D6C5]/30 transition-all cursor-pointer shadow-xs"
          >
            {claimed ? '✓ Claimed' : `+${tokens} EcoTokens`}
          </button>
        </div>
      </div>
    </div>
  );
}
