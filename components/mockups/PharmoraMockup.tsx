'use client';

import React, { useState } from 'react';
import {
  Pill,
  ThermometerSnowflake,
  CheckCircle2,
  Truck,
  FileCheck,
  Search,
  ShieldCheck,
  MapPin,
  Check,
  ArrowRight,
} from 'lucide-react';

const MEDICATIONS = [
  {
    id: 'insulin',
    name: 'Insulin Glargine (100 IU/mL)',
    specs: 'Sanofi • 10mL Vial • Cold-Chain (2°C – 8°C)',
    pharmacy: 'Ridge Community Pharmacy',
    license: 'Licensed Dispensary #PH-402',
    distance: '1.2 km away',
    eta: '20 min delivery',
    price: 'GH₵ 185.00',
    temp: '4.1°C',
    batch: 'BATCH-2025-091A',
    inStock: true,
  },
  {
    id: 'amox',
    name: 'Amoxicillin / Clavulanate (625mg)',
    specs: 'GlaxoSmithKline • 14 Tablets • Room Temp',
    pharmacy: 'Osu Licensed Care Dispensary',
    license: 'Licensed Dispensary #PH-188',
    distance: '2.4 km away',
    eta: '30 min delivery',
    price: 'GH₵ 95.00',
    temp: '20.5°C',
    batch: 'BATCH-2025-412C',
    inStock: true,
  },
  {
    id: 'ventolin',
    name: 'Ventolin Inhaler (100mcg)',
    specs: 'GSK • 200 Metered Actuations',
    pharmacy: 'Airport Residential Pharmacy',
    license: 'Licensed Dispensary #PH-077',
    distance: '3.1 km away',
    eta: '35 min delivery',
    price: 'GH₵ 65.00',
    temp: '19.8°C',
    batch: 'BATCH-2025-881E',
    inStock: true,
  },
];

export default function PharmoraMockup() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [dispatched, setDispatched] = useState(false);

  const med = MEDICATIONS[selectedIdx];

  return (
    <div className="relative w-full max-w-xl mx-auto rounded-2xl bg-white border border-[#DDE8EC] shadow-[0_12px_40px_rgba(0,110,170,0.06)] overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,143,196,0.12)]">
      {/* App Window Chrome */}
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
          </div>
          <div className="h-4 w-px bg-[#CBD5E1]" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#002F5B]">pharmora.health</span>
            <span className="text-[11px] text-[#687A86] hidden sm:inline">/ Accra Network</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-[11px] font-medium">
          <FileCheck className="w-3.5 h-3.5 text-[#008FC4] shrink-0" />
          <span>42 Licensed Pharmacies Active</span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Medication Selector */}
        <div className="space-y-1.5">
          <div className="text-xs font-semibold text-[#687A86]">Quick Stock Search</div>
          <div className="grid grid-cols-3 gap-2">
            {MEDICATIONS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedIdx(idx);
                  setDispatched(false);
                }}
                className={`p-2.5 rounded-xl text-left border transition-all text-xs ${
                  selectedIdx === idx
                    ? 'bg-[#002F5B] text-white border-[#002F5B] shadow-xs'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#002F5B] hover:bg-white hover:border-[#008FC4]'
                }`}
              >
                <div className="font-bold truncate text-[11px]">{item.name.split(' ')[0]}</div>
                <div className={`text-[10px] mt-0.5 ${selectedIdx === idx ? 'text-[#42D6C5]' : 'text-emerald-700'}`}>
                  In Stock Nearby
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Medication Card */}
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 space-y-3 shadow-xs">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-sm font-bold text-[#002F5B]">{med.name}</h4>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Verified Batch
                </span>
              </div>
              <div className="text-xs text-[#687A86]">{med.specs}</div>
              <div className="flex items-center gap-2 text-xs text-[#006EAA] pt-1">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span className="font-medium text-[#002F5B]">{med.pharmacy}</span>
                <span className="text-[#687A86]">({med.distance})</span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="text-base font-extrabold text-[#002F5B]">{med.price}</div>
              <div className="text-[10px] text-emerald-600 font-medium">Standard Regulated Price</div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between gap-3">
            <div className="text-xs text-[#687A86]">
              ETA: <span className="font-semibold text-[#002F5B]">{med.eta}</span>
            </div>

            <button
              onClick={() => setDispatched(!dispatched)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs ${
                dispatched
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#002F5B] hover:bg-[#003E72] text-white'
              }`}
            >
              {dispatched ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Dispatched • Courier Assigned</span>
                </>
              ) : (
                <>
                  <span>Order for Verified Dispatch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Cold-Chain & Pharmacist Verification Telemetry */}
        <div className="p-3.5 rounded-xl bg-[#F0F7FA] border border-[#D2E7EE] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <ThermometerSnowflake className="w-4 h-4 text-[#008FC4]" />
              <span className="font-bold text-[#002F5B]">Cold-Chain Monitored Transit</span>
            </div>
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
              {med.temp} Controlled
            </span>
          </div>
          <p className="text-xs text-[#005B8C] leading-relaxed">
            Every temperature-sensitive delivery is tracked in insulated carrier boxes. Prescriptions are checked by licensed pharmacists before dispatch.
          </p>
        </div>
      </div>
    </div>
  );
}
