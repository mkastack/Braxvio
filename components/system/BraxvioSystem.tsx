'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowUpRight,
  Activity,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  Server,
  Globe2,
  CheckCircle2,
  Lock,
  Boxes,
  Database,
  RefreshCw,
  Terminal,
  Pause,
  Play
} from 'lucide-react';

interface SubsidiaryProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  status: string;
  label: string;
  accent: string;
  gradient: string;
  tagline: string;
  headline: string;
  description: string;
  metrics: { label: string; value: string }[];
  sharedPrimitives: string[];
  liveEvent: string;
  badgeBg: string;
}

const SUBSIDIARIES: SubsidiaryProduct[] = [
  {
    id: 'kampus',
    name: 'Kampus',
    slug: 'kampus',
    category: 'Higher Education Ecosystem',
    status: 'PUBLIC BETA',
    label: '01',
    accent: '#11AFC1',
    gradient: 'from-[#003E72] via-[#006EAA] to-[#11AFC1]',
    tagline: 'University Life & Campus Infrastructure',
    headline: 'Unified Campus Operating Layer',
    description:
      'Harmonizing verified student housing, academic verification, decentralized peer exchange, and campus commerce into a singular trusted student identity.',
    metrics: [
      { label: 'Connected Campuses', value: '18+' },
      { label: 'Verified Beds', value: '4,200+' },
      { label: 'Active Identity Tokens', value: '24.8k' },
    ],
    sharedPrimitives: ['Universal Braxvio ID', 'Escrow Settlement', 'Decentralized Peer Mesh'],
    liveEvent: 'Kampus Auth: 142 student identity verifications cleared in Legon Cluster',
    badgeBg: 'bg-[#11AFC1]/15 text-[#11AFC1] border-[#11AFC1]/30',
  },
  {
    id: 'pharmora',
    name: 'Pharmora',
    slug: 'pharmora',
    category: 'Healthcare & Pharmaceutical Mesh',
    status: 'IN DEVELOPMENT',
    label: '02',
    accent: '#008FC4',
    gradient: 'from-[#002F5B] via-[#006EAA] to-[#008FC4]',
    tagline: 'Distributed Pharmacy Inventory & Rx Access',
    headline: 'Regulated Healthcare Fulfillment Network',
    description:
      'Connecting licensed community pharmacies, distributors, and patients with real-time stock routing, counterfeit prevention, and temperature-verified supply chains.',
    metrics: [
      { label: 'Dispensary Nodes', value: '2,400+' },
      { label: 'Cold-Chain Telemetry', value: '99.98%' },
      { label: 'Batch Verifications', value: '110k/mo' },
    ],
    sharedPrimitives: ['Cryptographic Audit Trail', 'Zero-Trust Regulatory Sandbox', 'Real-Time Edge Sync'],
    liveEvent: 'Pharmora Mesh: Cold-chain batch #4811 confirmed at Greater Accra Hub',
    badgeBg: 'bg-[#008FC4]/15 text-[#008FC4] border-[#008FC4]/30',
  },
  {
    id: 'ecolift',
    name: 'Ecolift',
    slug: 'ecolift',
    category: 'Logistics & Urban Sustainability',
    status: 'IN DEVELOPMENT',
    label: '03',
    accent: '#42D6C5',
    gradient: 'from-[#003E72] via-[#11AFC1] to-[#42D6C5]',
    tagline: 'Intelligent Municipal Waste Routing',
    headline: 'Circular Reverse-Logistics Grid',
    description:
      'Replacing erratic municipal collection with dynamic algorithmic dispatch, sensor-enabled depot routing, and circular recycling token incentives.',
    metrics: [
      { label: 'Diverted Material', value: '142 MT' },
      { label: 'Route Efficiency', value: '+38%' },
      { label: 'Monitored Depots', value: '86' },
    ],
    sharedPrimitives: ['Real-Time Geo-Routing', 'Circular Incentive Ledger', 'IoT Edge Ingestion'],
    liveEvent: 'Ecolift Logistics: Fleet dispatch optimized for Accra Central Route #07',
    badgeBg: 'bg-[#42D6C5]/15 text-[#42D6C5] border-[#42D6C5]/30',
  },
  {
    id: 'devpay',
    name: 'DevPay Africa',
    slug: 'devpay-africa',
    category: 'Digital Economy & Global Rails',
    status: 'PRIVATE BETA',
    label: '04',
    accent: '#006EAA',
    gradient: 'from-[#001D38] via-[#002F5B] to-[#006EAA]',
    tagline: 'Developer Escrow & Cross-Border Treasury',
    headline: 'Borderless Software Compensation Engine',
    description:
      'Enabling global companies to hire African developers with compliant multi-currency escrow, automated tax compliance, and instant local banking/MoMo payouts.',
    metrics: [
      { label: 'Currencies Supported', value: '32' },
      { label: 'Settlement Speed', value: '< 90s' },
      { label: 'Escrow Volume', value: '$1.8M+' },
    ],
    sharedPrimitives: ['Multi-Currency Escrow', 'Compliance & AML Engine', 'Treasury Liquidity Layer'],
    liveEvent: 'DevPay Core: Instant USD-to-GHS escrow release verified for 28 contributors',
    badgeBg: 'bg-[#006EAA]/15 text-[#006EAA] border-[#006EAA]/30',
  },
];

const SHARED_CORE_PRIMITIVES = [
  {
    name: 'Universal Identity',
    icon: Lock,
    code: 'BRAX-ID',
    desc: 'Unified biometric & session security across all subsidiaries',
  },
  {
    name: 'Multi-Currency Escrow',
    icon: Boxes,
    code: 'BRAX-TREASURY',
    desc: 'Automated settlement, regulatory compliance, and FX rails',
  },
  {
    name: 'Real-Time Edge Mesh',
    icon: Cpu,
    code: 'BRAX-EDGE',
    desc: 'Sub-30ms distributed routing across West Africa & global edge',
  },
  {
    name: 'Zero-Trust Governance',
    icon: ShieldCheck,
    code: 'BRAX-AUDIT',
    desc: 'Tamper-proof compliance, data residency, and enterprise telemetry',
  },
];

export default function BraxvioSystem({ className = '' }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'stack' | 'telemetry' | 'primitives'>('stack');
  const [isPaused, setIsPaused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [tick, setTick] = useState(0);

  const activeSub = SUBSIDIARIES[activeTab];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-cycle through products every 5 seconds unless paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % SUBSIDIARIES.length);
      setTick((t) => t + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      className={`w-full max-w-xl mx-auto rounded-3xl border border-[#002F5B]/30 bg-[#001428] text-white shadow-[0_25px_70px_rgba(0,47,91,0.35)] overflow-hidden transition-all duration-300 relative select-none ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Ambience & Cyber Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#11AFC1_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none transition-all duration-700 opacity-25"
        style={{ backgroundColor: activeSub.accent }}
      />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#003E72]/30 blur-[90px] pointer-events-none" />

      {/* ── 01: Top Executive Ribbon ── */}
      <div className="relative z-10 px-5 sm:px-6 py-4 border-b border-white/10 bg-[#001D38]/80 backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
        {/* Left: Braxvio Holding Brand */}
        <div className="flex items-center gap-3">
          <div className="relative w-7 h-9 shrink-0">
            <Image
              src="/braxvio-mark.png"
              alt="Braxvio"
              fill
              className="object-contain"
              sizes="28px"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-white text-sm sm:text-base tracking-tight font-mono">
                BRAXVIO
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#42D6C5] font-bold">
                // ECOSYSTEM OS
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">
              Parent Architecture • 4 Operational Subsidiaries
            </p>
          </div>
        </div>

        {/* Right: Live Telemetry Pulse & Pause/Play */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono">
            <span className="w-2 h-2 rounded-full bg-[#42D6C5] animate-pulse" />
            <span className="text-slate-300">CORE HEALTH:</span>
            <span className="text-[#42D6C5] font-bold">99.98%</span>
          </div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? 'Resume auto-cycle' : 'Pause auto-cycle'}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all text-xs"
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* ── 02: Mode Switcher Tabs ── */}
      <div className="relative z-10 px-5 sm:px-6 pt-4 pb-2 flex items-center justify-between gap-2 border-b border-white/5 bg-[#00172E]/40">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/5 text-[11px] font-mono w-full sm:w-auto">
          <button
            onClick={() => setViewMode('stack')}
            className={`flex-1 sm:flex-initial px-3 py-1 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              viewMode === 'stack'
                ? 'bg-[#003E72] text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>SUBSIDIARY VIEW</span>
          </button>
          <button
            onClick={() => setViewMode('primitives')}
            className={`flex-1 sm:flex-initial px-3 py-1 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              viewMode === 'primitives'
                ? 'bg-[#003E72] text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>PARENT CORE</span>
          </button>
          <button
            onClick={() => setViewMode('telemetry')}
            className={`flex-1 sm:flex-initial px-3 py-1 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              viewMode === 'telemetry'
                ? 'bg-[#003E72] text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>LIVE FEED</span>
          </button>
        </div>

        <span className="hidden sm:inline-block text-[10px] font-mono text-slate-400">
          NODE {activeTab + 1}/4
        </span>
      </div>

      {/* ── 03: Interactive 4-Subsidiary Selector Bar ── */}
      <div className="relative z-10 p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-white/10 bg-[#001326]/60">
        {SUBSIDIARIES.map((sub, idx) => {
          const isActive = idx === activeTab;
          return (
            <button
              key={sub.id}
              onClick={() => setActiveTab(idx)}
              className={`p-3 rounded-2xl border text-left transition-all duration-300 relative group overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-b from-white/15 to-white/5 border-white/30 shadow-[0_0_20px_rgba(17,175,193,0.2)]'
                  : 'bg-white/[0.03] border-white/5 hover:border-white/20 hover:bg-white/[0.06]'
              }`}
            >
              {isActive && (
                <div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${sub.accent}, #42D6C5)`,
                  }}
                />
              )}
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-slate-400">{sub.label}</span>
                <span
                  className="w-2 h-2 rounded-full transition-transform duration-300"
                  style={{
                    backgroundColor: sub.accent,
                    transform: isActive ? 'scale(1.3)' : 'scale(1)',
                    boxShadow: isActive ? `0 0 8px ${sub.accent}` : 'none',
                  }}
                />
              </div>
              <div className="text-xs sm:text-sm font-bold text-white tracking-tight truncate">
                {sub.name}
              </div>
              <div className="text-[9px] font-mono text-slate-400 truncate mt-0.5">
                {sub.status}
              </div>
            </button>
          );
        })}
      </div>

      {/* ── 04: Main Visual Stage ── */}
      <div className="relative z-10 p-5 sm:p-7 min-h-[300px]">
        {viewMode === 'stack' && (
          <div className="space-y-6">
            {/* Active Subsidiary Card Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${activeSub.badgeBg}`}
                  >
                    {activeSub.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    STATUS: <span className="text-white font-semibold">{activeSub.status}</span>
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {activeSub.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#42D6C5] font-semibold mt-0.5">
                  {activeSub.headline}
                </p>
              </div>

              {/* Action Button */}
              <Link
                href={`/products/${activeSub.slug}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider text-white shadow-md hover:brightness-110 transition-all self-start sm:self-auto shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${activeSub.accent}, #002F5B)`,
                }}
              >
                <span>EXPLORE {activeSub.name.toUpperCase()}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeSub.description}
            </p>

            {/* Live Metrics Strip */}
            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-black/40 border border-white/5">
              {activeSub.metrics.map((metric) => (
                <div key={metric.label} className="space-y-0.5">
                  <div className="text-[9px] font-mono uppercase tracking-wider text-slate-400">
                    {metric.label}
                  </div>
                  <div className="text-base sm:text-lg font-black text-white font-mono tracking-tight">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Parent Infrastructure Linkage */}
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>INHERITED FROM BRAXVIO SHARED CORE:</span>
                <span className="text-[#42D6C5] font-bold">ACTIVE RAILS</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeSub.sharedPrimitives.map((primitive) => (
                  <span
                    key={primitive}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-slate-200"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#11AFC1]" />
                    {primitive}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {viewMode === 'primitives' && (
          <div className="space-y-5">
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-widest text-[#42D6C5] font-bold">
                BRAXVIO HOLDING FOUNDATION
              </div>
              <h3 className="text-xl font-black text-white">
                Shared Enterprise Primitives
              </h3>
              <p className="text-xs text-slate-400">
                Every Braxvio subsidiary inherits institutional security, liquidity, and edge routing out-of-the-box.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SHARED_CORE_PRIMITIVES.map((primitive) => {
                const IconComponent = primitive.icon;
                return (
                  <div
                    key={primitive.name}
                    className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#11AFC1]/50 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-[#002F5B]/80 text-[#42D6C5]">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-mono uppercase text-slate-400 px-2 py-0.5 rounded bg-black/40 border border-white/5">
                        {primitive.code}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-white">{primitive.name}</div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {primitive.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {viewMode === 'telemetry' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#42D6C5]" />
                <span className="text-xs font-mono font-bold uppercase text-white">
                  Live Braxvio Mesh Events
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#42D6C5] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#42D6C5] animate-ping" />
                STREAMING
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-black/70 border border-white/10 font-mono text-xs space-y-3">
              {SUBSIDIARIES.map((s, i) => (
                <div
                  key={s.id}
                  className={`p-2.5 rounded-xl border transition-all ${
                    i === activeTab
                      ? 'bg-white/10 border-[#11AFC1]/60 text-white'
                      : 'bg-transparent border-transparent text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span className="text-[#42D6C5]">[{s.name.toUpperCase()}]</span>
                    <span>TICK #{1042 + tick * 4 + i}</span>
                  </div>
                  <div className="text-[11px] leading-relaxed text-slate-200">{s.liveEvent}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── 05: Bottom Persistent Parent Company Foundation Bar ── */}
      <div className="relative z-10 px-5 sm:px-6 py-3.5 border-t border-white/10 bg-[#000E1C] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-[#11AFC1]" />
          <span>Parent Holding Layer:</span>
          <span className="text-white font-semibold">Braxvio Technologies Core</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <Link
            href="/company"
            className="text-[#42D6C5] hover:text-white transition-colors flex items-center gap-1"
          >
            <span>Parent Governance</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
          <span className="text-white/20">•</span>
          <Link
            href="/products"
            className="text-slate-300 hover:text-white transition-colors flex items-center gap-1"
          >
            <span>All 4 Products</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
