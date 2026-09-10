'use client';

import React, { useState, useEffect } from 'react';
import { Pill, ThermometerSnowflake, CheckCircle2, Truck, FileCheck, ShieldAlert, Search, RefreshCw } from 'lucide-react';

const MEDICINES = [
  {
    name: 'Insulin Glargine (100 units/mL)',
    pharmacy: 'Apex Care Pharmacy • Ridge Branch',
    distance: '1.2 km away',
    temp: '3.4°C',
    batch: 'BATCH-2025-091A',
    units: 14,
    status: 'IN STOCK'
  },
  {
    name: 'Amoxicillin / Clavulanate (625mg)',
    pharmacy: 'Osu Community Licensed Dispensary',
    distance: '2.8 km away',
    temp: '21.0°C',
    batch: 'BATCH-2025-412C',
    units: 32,
    status: 'IN STOCK'
  },
  {
    name: 'Ventolin Inhaler (100mcg)',
    pharmacy: 'Airport City Health Vault',
    distance: '3.4 km away',
    temp: '19.5°C',
    batch: 'BATCH-2025-881E',
    units: 8,
    status: 'CRITICAL STOCK'
  }
];

export default function PharmoraMockup() {
  const [selectedMed, setSelectedMed] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(true);

  const med = MEDICINES[selectedMed];

  const handleAuditToggle = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerified(!verified);
    }, 600);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto rounded-3xl bg-white border border-[#DDE8EC] shadow-[0_20px_50px_rgba(0,110,170,0.08)] overflow-hidden transition-all duration-500 hover:shadow-[0_25px_60px_rgba(0,143,196,0.18)] group">
      {/* App Bar */}
      <div className="bg-[#F2FAFC] border-b border-[#DDE8EC] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#008FC4] animate-pulse" />
          <span className="text-xs font-bold tracking-tight text-[#002F5B]">PHARMORA</span>
          <span className="text-[10px] font-mono text-[#687A86]">/ REGULATED PHARMACY MESH</span>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
          <FileCheck className="w-3 h-3 text-[#008FC4]" />
          FDA Regulated Dispensary Network
        </span>
      </div>

      <div className="p-5 space-y-4">
        {/* Medicine Selector Carousel Buttons */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#687A86]">
            LIVE PHARMACY INVENTORY QUERY
          </div>
          <div className="grid grid-cols-3 gap-2">
            {MEDICINES.map((item, idx) => (
              <button
                key={item.name}
                onClick={() => setSelectedMed(idx)}
                className={`p-2 rounded-xl text-left border transition-all text-xs ${
                  selectedMed === idx
                    ? 'bg-[#002F5B] text-white border-[#002F5B] shadow-xs'
                    : 'bg-[#F7FAFC] border-[#DDE8EC] text-[#06131D] hover:bg-white hover:border-[#008FC4]'
                }`}
              >
                <div className="font-bold truncate text-[11px]">{item.name.split(' ')[0]}</div>
                <div className={`text-[9px] font-mono mt-0.5 ${selectedMed === idx ? 'text-[#42D6C5]' : 'text-emerald-600'}`}>
                  {item.units} available
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Medicine Live Card */}
        <div className="p-4 rounded-2xl border border-[#DDE8EC] bg-white space-y-3 shadow-xs">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h4 className="text-sm font-extrabold text-[#002F5B]">{med.name}</h4>
              <p className="text-xs text-[#687A86]">{med.pharmacy}</p>
              <div className="flex items-center gap-2 text-[10px] font-mono text-[#008FC4]">
                <span>📍 {med.distance}</span>
                <span>•</span>
                <span>Batch: {med.batch}</span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
              {med.status}
            </span>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#008FC4] to-[#42D6C5] h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (med.units / 35) * 100)}%` }}
            />
          </div>
        </div>

        {/* Prescription Verification Status Bar with Interactive Audit Trigger */}
        <div className="p-3.5 rounded-xl bg-[#F7FAFC] border border-[#DDE8EC] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-100 flex items-center justify-center text-[#006EAA]">
              <Pill className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#06131D]">Clinical Prescription Audit Protocol</div>
              <div className="text-[11px] text-[#687A86]">
                {verified ? 'Audited & digitally signed by certified pharmacist' : 'Pending clinical review'}
              </div>
            </div>
          </div>
          <button
            onClick={handleAuditToggle}
            disabled={isVerifying}
            className="px-2.5 py-1.5 rounded-lg bg-white border border-[#DDE8EC] hover:border-[#008FC4] text-xs font-mono text-[#002F5B] flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${isVerifying ? 'animate-spin text-[#008FC4]' : ''}`} />
            <span>{verified ? 'Re-verify' : 'Verify'}</span>
          </button>
        </div>

        {/* Cold-Chain Dispatch Live Tracking */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#071C2B] to-[#002F5B] text-white space-y-3 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ThermometerSnowflake className="w-4 h-4 text-[#42D6C5]" />
              <span className="text-xs font-bold">Monitored Cold-Chain Courier</span>
            </div>
            <span className="text-[10px] font-mono text-[#42D6C5] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#42D6C5] animate-ping" />
              IN TRANSIT • 18 MIN ETA
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/10 text-center">
            <div className="p-2 rounded-xl bg-white/5">
              <div className="text-[10px] text-slate-300 font-mono">Sensors</div>
              <div className="text-xs font-bold text-[#42D6C5]">{med.temp} Normal</div>
            </div>
            <div className="p-2 rounded-xl bg-white/5">
              <div className="text-[10px] text-slate-300 font-mono">Courier</div>
              <div className="text-xs font-bold text-white">PX-882 (Vetted)</div>
            </div>
            <div className="p-2 rounded-xl bg-white/5">
              <div className="text-[10px] text-slate-300 font-mono">Seal Status</div>
              <div className="text-xs font-bold text-emerald-400">Cryptolocked</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
