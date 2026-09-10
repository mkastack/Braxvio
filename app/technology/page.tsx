import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Cpu, ShieldCheck, Database, Layers, Radio, Sparkles, Terminal, Activity, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Technology — Engineering Architecture & Philosophy',
  description: 'Learn about the engineering philosophy, infrastructure, applied AI, and security standards powering Braxvio systems.'
};

export default function TechnologyPage() {
  const techPillars = [
    {
      icon: <Terminal className="w-6 h-6 text-[#11AFC1]" />,
      title: 'Product Engineering',
      tagline: 'Modern, modular, high-velocity codebases',
      description: 'We prioritize typed contract boundaries with TypeScript, Next.js App Router, Go, and Rust. Micro-frontends and cleanly bounded contexts prevent monolithic cascading failures.'
    },
    {
      icon: <Database className="w-6 h-6 text-[#008FC4]" />,
      title: 'Data & Telemetry Systems',
      tagline: 'Event-driven state and geographic indexing',
      description: 'Using PostgreSQL, TimescaleDB, and ClickHouse for high-throughput sensor telemetry, cold-chain temperature logs, and geospatial routing algorithms.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#42D6C5]" />,
      title: 'Applied Artificial Intelligence',
      tagline: 'Pragmatic, problem-specific intelligence',
      description: 'We reject speculative AI hype. Our models focus on concrete mathematical optimizations: dynamic vehicle routing for Ecolift, optical prescription parsing for Pharmora, and fraud anomaly detection for DevPay.'
    },
    {
      icon: <Radio className="w-6 h-6 text-[#006EAA]" />,
      title: 'Distributed Infrastructure',
      tagline: 'Edge networks with offline-first resilience',
      description: 'Distributed Kubernetes clusters and edge-caching nodes situated close to regional telecommunication gateways, ensuring reliable operations despite cellular packet drop.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#11AFC1]" />,
      title: 'Institutional Security & Cryptography',
      tagline: 'Defense-in-depth and encrypted vaults',
      description: 'End-to-end field encryption for patient health records, zero-knowledge verification proofs for student credentials, and SOC2/PCI-grade multi-signature financial escrow.'
    },
    {
      icon: <Layers className="w-6 h-6 text-[#008FC4]" />,
      title: 'Unified Design System',
      tagline: 'Consistent, accessible human interfaces',
      description: 'Our proprietary design tokens ensure that every Braxvio interface satisfies WCAG AA accessibility, maintains sub-second interactive response, and feels coherent across devices.'
    }
  ];

  return (
    <div className="pt-28 pb-36 px-6 sm:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto space-y-28">
        {/* Hero Section */}
        <div className="max-w-4xl space-y-6 border-b border-[#DDE8EC] pb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#006EAA] font-semibold">
            <Cpu className="w-4 h-4" />
            <span>ARCHITECTURAL SPECIFICATION</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#002F5B] tracking-tight">
            THE TECHNOLOGY <br />
            <span className="braxvio-gradient-text">BEHIND BRAXVIO.</span>
          </h1>

          <p className="text-xl sm:text-2xl text-[#687A86] leading-relaxed font-normal">
            Engineering digital infrastructure designed for reliability, sub-second latency, and resilience under real-world operational constraints.
          </p>
        </div>

        {/* Engineering Philosophy Banner */}
        <div className="rounded-3xl p-10 sm:p-14 bg-[#071C2B] text-white border border-[#11AFC1]/25 relative overflow-hidden space-y-6">
          <div className="absolute inset-0 braxvio-grid-dark opacity-25 pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#42D6C5] font-semibold">
              CORE PHILOSOPHY
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              WE DON&apos;T CHOOSE TECHNOLOGY <br />
              BECAUSE IT&apos;S TRENDING. <br />
              <span className="text-[#42D6C5]">WE CHOOSE IT BECAUSE IT FITS THE PROBLEM.</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Every architectural decision is evaluated against six non-negotiable vectors: fault tolerance, latency under congested networks, verifiable data privacy, maintainability over decades, economic efficiency, and human clarity.
            </p>
          </div>
        </div>

        {/* 6 Technology Pillars */}
        <div className="space-y-12">
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest uppercase text-[#006EAA] font-semibold">
              FOUNDATIONAL PILLARS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002F5B] tracking-tight">
              Six Disciplines of the Braxvio Stack
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="p-8 rounded-2xl border border-[#DDE8EC] bg-[#F7FAFC] hover:bg-white hover:border-[#11AFC1] shadow-sm hover:shadow-lg transition-all duration-300 space-y-4"
              >
                <div className="p-3 rounded-xl bg-white border border-[#DDE8EC] w-fit shadow-xs">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-[#002F5B]">
                  {pillar.title}
                </h3>
                <div className="text-xs font-mono text-[#11AFC1] font-semibold">
                  {pillar.tagline}
                </div>
                <p className="text-sm text-[#687A86] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Callout to Careers */}
        <div className="rounded-3xl p-8 sm:p-12 bg-[#F2FAFC] border border-[#11AFC1]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-[#002F5B]">
              Engineered with High Craft
            </h3>
            <p className="text-sm text-[#687A86]">
              Interested in contributing to our distributed systems, design tokens, or cryptographic primitives?
            </p>
          </div>
          <Link
            href="/careers"
            className="px-6 py-3 rounded-xl bg-[#002F5B] text-white text-xs font-mono font-bold tracking-wider uppercase hover:bg-[#003E72] transition-colors shrink-0"
          >
            Explore Careers →
          </Link>
        </div>
      </div>
    </div>
  );
}
