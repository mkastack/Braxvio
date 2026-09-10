import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Terminal, Activity, ArrowRight, Cpu, Radio, Network } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Braxvio Labs — Emerging Research & Explorations',
  description: 'Prototyping future systems, distributed protocols, and human-computer interactions.'
};

export default function LabsPage() {
  const explorations = [
    {
      status: 'EXPLORING',
      title: 'Contextual AI in African Informal Commerce',
      tag: 'Machine Intelligence',
      description: 'Investigating how lightweight edge-run models can parse speech and unstructured ledger photos to assist community kiosk merchants in automated stock reconciliation.'
    },
    {
      status: 'EXPERIMENTING',
      title: 'Decentralized Micro-Logistics Relays',
      tag: 'Distributed Telemetry',
      description: 'Testing peer-to-peer relay handoffs for temperature-controlled parcel dispatches without centralized transit hubs.'
    },
    {
      status: 'THINKING ABOUT',
      title: 'Sovereign Digital Educational Badging',
      tag: 'Identity Rails',
      description: 'Prototyping cryptographically provable student portfolios and academic credentials that students own outright across pan-African institutions.'
    },
    {
      status: 'EXPLORING',
      title: 'Automated Municipal Routing under Ephemeral Obstacles',
      tag: 'Applied Optimization',
      description: 'Developing resilient dynamic graph algorithms that recalculate sanitation truck routes in real time based on informal road closures and market congestion.'
    }
  ];

  return (
    <div className="pt-28 pb-36 px-6 sm:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto space-y-28">
        {/* Hero */}
        <div className="max-w-4xl space-y-6 border-b border-[#DDE8EC] pb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#006EAA] font-semibold">
            <Cpu className="w-4 h-4" />
            <span>R&D HORIZON & EXPERIMENTS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#002F5B] tracking-tight">
            WHAT ARE WE <br />
            <span className="braxvio-gradient-text">EXPLORING NEXT?</span>
          </h1>

          <p className="text-xl sm:text-2xl text-[#687A86] leading-relaxed font-normal">
            Braxvio Labs is our applied research practice. We build prototypes and conduct field studies around systemic problems that deserve solutions in the coming decade.
          </p>
        </div>

        {/* Explorations Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-[#006EAA] font-semibold">
              ACTIVE EXPLORATORY TRACKS
            </span>
            <span className="text-xs font-mono text-[#687A86]">
              4 TRACKS IN INCUBATION
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {explorations.map((item) => (
              <div
                key={item.title}
                className="p-8 rounded-3xl border border-[#DDE8EC] bg-[#F7FAFC] hover:bg-white hover:border-[#11AFC1] shadow-sm hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-[#11AFC1] px-2.5 py-1 rounded bg-[#F2FAFC] border border-[#11AFC1]/30">
                      {item.status}
                    </span>
                    <span className="text-[#687A86]">{item.tag}</span>
                  </div>

                  <h2 className="text-2xl font-bold text-[#002F5B]">
                    {item.title}
                  </h2>

                  <p className="text-sm text-[#687A86] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#DDE8EC] text-[11px] font-mono text-slate-400">
                  BRAXVIO R&D LABS • ACCRA
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Labs Ethics Note */}
        <div className="rounded-3xl p-8 sm:p-10 bg-[#071C2B] text-white border border-[#11AFC1]/30 space-y-4">
          <div className="text-xs font-mono text-[#42D6C5] uppercase font-bold">
            RESEARCH RIGOR & ETHICS
          </div>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            We never announce speculative science or paperware as finished commercial products. A prototype only leaves Braxvio Labs when it has proven its reliability, security, and real-world necessity.
          </p>
        </div>
      </div>
    </div>
  );
}
