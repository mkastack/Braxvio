'use client';

import React, { useState } from 'react';
import {
  Truck,
  Navigation,
  Recycle,
  MapPin,
  Check,
  ArrowRight,
  ShieldCheck,
  Clock,
  Banknote,
} from 'lucide-react';

export default function EcoliftMockup() {
  const [claimed, setClaimed] = useState(false);
  const [activeStop, setActiveStop] = useState(1);

  const stops = [
    { name: 'Cantonments Transfer Station', time: '08:30 AM', status: 'Completed', done: true },
    { name: 'Oxford Street Commercial Bins', time: '09:15 AM', status: 'In Progress (85% Fill)', done: false, current: true },
    { name: 'Ring Road Commercial Hub', time: '10:00 AM', status: 'Scheduled Next', done: false },
  ];

  return (
    <div className="relative w-full max-w-xl mx-auto rounded-2xl bg-[#071C2B] border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.3)] overflow-hidden text-white transition-all duration-300 hover:border-[#42D6C5]/40">
      {/* App Window Chrome */}
      <div className="bg-[#051420] border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white">ecolift.city</span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">/ Osu &amp; Cantonments Route</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#42D6C5]/10 border border-[#42D6C5]/20 text-[#42D6C5] text-[11px] font-medium">
          <span className="w-2 h-2 rounded-full bg-[#42D6C5] animate-pulse" />
          <span>Active Route #409</span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Fleet Route Metrics */}
        <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#42D6C5]" />
              <span className="text-xs font-bold text-white">Hauler Unit #EL-409 • Osu District</span>
            </div>
            <span className="text-[11px] font-mono text-[#42D6C5] bg-[#42D6C5]/15 px-2 py-0.5 rounded">
              Route 82% Completed
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
              <div className="text-[10px] text-slate-400">Total Tonnage</div>
              <div className="text-sm font-bold text-white mt-0.5">4.2 Tons</div>
            </div>
            <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
              <div className="text-[10px] text-slate-400">Transit Idle Cut</div>
              <div className="text-sm font-bold text-[#42D6C5] mt-0.5">-34% Fuel</div>
            </div>
            <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
              <div className="text-[10px] text-slate-400">Pickups Remaining</div>
              <div className="text-sm font-bold text-white mt-0.5">4 of 22</div>
            </div>
          </div>
        </div>

        {/* Dynamic Route Waypoints */}
        <div className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-2.5">
          <div className="text-xs font-semibold text-slate-300">Live Collection Waypoints</div>
          <div className="space-y-2">
            {stops.map((stop, i) => (
              <div
                key={stop.name}
                onClick={() => setActiveStop(i)}
                className={`p-2.5 rounded-lg border text-xs flex items-center justify-between transition-all cursor-pointer ${
                  stop.current
                    ? 'bg-[#11AFC1]/15 border-[#11AFC1]/50 text-white'
                    : stop.done
                    ? 'bg-white/5 border-white/5 text-slate-300'
                    : 'bg-white/5 border-white/5 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    stop.done ? 'bg-emerald-500/20 text-emerald-400' : stop.current ? 'bg-[#42D6C5] text-[#071C2B]' : 'bg-white/10 text-slate-400'
                  }`}>
                    {stop.done ? <Check className="w-3 h-3" /> : i + 1}
                  </div>
                  <div>
                    <div className="font-medium text-white">{stop.name}</div>
                    <div className="text-[10px] text-slate-400">{stop.status}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="w-3 h-3 text-[#42D6C5]" />
                  <span>{stop.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Citizen Recycling Reward Payout */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/60 to-[#071C2B] border border-emerald-500/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Recycle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Household Recycling Cashback</div>
              <div className="text-[11px] text-slate-300">14.2 kg sorted plastics collected today</div>
            </div>
          </div>

          <button
            onClick={() => setClaimed(!claimed)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 shadow-xs ${
              claimed
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-500 hover:bg-emerald-400 text-[#071C2B]'
            }`}
          >
            {claimed ? 'GH₵ 42.50 Sent to MoMo' : 'Claim GH₵ 42.50 to MoMo'}
          </button>
        </div>
      </div>
    </div>
  );
}
