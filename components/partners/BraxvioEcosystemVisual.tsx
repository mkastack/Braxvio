'use client';

import React, { useState } from 'react';
import {
  Coins,
  Cpu,
  Landmark,
  Users2,
  Boxes,
  HeartHandshake,
  TrendingUp,
  Network,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface BranchNode {
  id: string;
  code: string;
  name: string;
  category: string;
  tier: 'input' | 'output';
  description: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent: string;
  metrics: string;
}

const INPUT_NODES: BranchNode[] = [
  {
    id: 'capital',
    code: 'IN-01',
    name: 'Capital & Balance Sheets',
    category: 'Growth & Allocation',
    tier: 'input',
    description: 'Patient institutional capital, balance sheet resilience, and disciplined long-term reinvestment.',
    Icon: Coins,
    accent: '#008FC4',
    metrics: 'Patient Capital',
  },
  {
    id: 'technology',
    code: 'IN-02',
    name: 'Core Technology Rails',
    category: 'Architecture & APIs',
    tier: 'input',
    description: 'High-throughput cloud backbones, proprietary telecommunications APIs, and enterprise AI engines.',
    Icon: Cpu,
    accent: '#11AFC1',
    metrics: 'Unified APIs',
  },
  {
    id: 'talent',
    code: 'IN-03',
    name: 'Engineering & Craft',
    category: 'Human Capital',
    tier: 'input',
    description: 'Elite African software engineers, distributed systems architects, and specialized domain operators.',
    Icon: Users2,
    accent: '#42D6C5',
    metrics: 'Senior Talent',
  },
];

const OUTPUT_NODES: BranchNode[] = [
  {
    id: 'products',
    code: 'OUT-01',
    name: 'Ecosystem Platforms',
    category: 'Commercial Ventures',
    tier: 'output',
    description: 'Kampus, Pharmora, Ecolift, DevPay Africa, and continuous internal venture incubation.',
    Icon: Boxes,
    accent: '#11AFC1',
    metrics: '4 Live Ventures',
  },
  {
    id: 'institutions',
    code: 'OUT-02',
    name: 'Civic & Enterprise Partners',
    category: 'Institutional Fabric',
    tier: 'output',
    description: 'Accredited universities, hospital groups, commercial banks, and municipal authorities.',
    Icon: Landmark,
    accent: '#006EAA',
    metrics: 'Civic Alliances',
  },
  {
    id: 'markets',
    code: 'OUT-03',
    name: 'Pan-African Distribution',
    category: 'Liquidity & Trade',
    tier: 'output',
    description: 'Regional cross-border commerce rails, local currency settlement, and expanding trade routes.',
    Icon: TrendingUp,
    accent: '#003E72',
    metrics: 'Cross-Border',
  },
  {
    id: 'communities',
    code: 'OUT-04',
    name: 'Everyday Communities',
    category: 'Social Impact',
    tier: 'output',
    description: 'Students, patients, logistics contractors, and independent creators whose daily lives we advance.',
    Icon: HeartHandshake,
    accent: '#42D6C5',
    metrics: 'Daily Utility',
  },
];

export default function BraxvioEcosystemVisual() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const isInputActive = INPUT_NODES.some((n) => n.id === activeNode);
  const isOutputActive = OUTPUT_NODES.some((n) => n.id === activeNode);

  return (
    <div className="relative w-full max-w-6xl mx-auto select-none">
      {/* Top Architecture Schematic Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-4 border-b border-[#DDE8EC] dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#11AFC1] animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#006EAA] dark:text-[#42D6C5]">
            SYSTEM ARCHITECTURE // CONVERGENCE PIPELINE
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-mono text-[#687A86] dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#42D6C5]" />
            7 Operational Branches
          </span>
          <span>•</span>
          <span>Zero Radial Gimmicks</span>
          <span>•</span>
          <span className="text-[#006EAA] dark:text-[#11AFC1] font-semibold">Active Topology</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* DESKTOP VIEW: Branching Systems Circuit (lg and above) */}
      {/* ============================================================ */}
      <div className="hidden lg:block relative p-8 rounded-3xl bg-white/90 dark:bg-[#061826]/90 backdrop-blur-xl border border-[#DDE8EC] dark:border-white/10 shadow-xl overflow-hidden">
        {/* Subtle Blueprint Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#006EAA08_1px,transparent_1px),linear-gradient(to_bottom,#006EAA08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* Ambient background glows */}
        <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-[#11AFC1]/5 blur-[90px] pointer-events-none" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 rounded-full bg-[#006EAA]/5 blur-[90px] pointer-events-none" />

        {/* Corner blueprint crosshairs */}
        <div className="absolute top-3 left-3 text-[10px] font-mono text-[#DDE8EC] dark:text-white/20 select-none">
          + 01.SYS.IN
        </div>
        <div className="absolute top-3 right-3 text-[10px] font-mono text-[#DDE8EC] dark:text-white/20 select-none">
          + 02.SYS.OUT
        </div>
        <div className="absolute bottom-3 left-3 text-[10px] font-mono text-[#DDE8EC] dark:text-white/20 select-none">
          + BRAXVIO.ENG
        </div>
        <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#DDE8EC] dark:text-white/20 select-none">
          + VERIFIED.RAILS
        </div>

        {/* 3-Column Branch Architecture */}
        <div className="relative z-10 grid grid-cols-12 gap-6 items-center min-h-[520px]">
          {/* ----------------- COLUMN 1: INPUT BRANCHES ----------------- */}
          <div className="col-span-4 flex flex-col justify-between h-full py-2 space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-[#DDE8EC] dark:border-white/10">
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#006EAA] dark:text-[#42D6C5]">
                Stage 01 // Foundation Inputs
              </span>
              <span className="text-[9px] font-mono text-[#687A86] dark:text-slate-400">
                3 Vectors
              </span>
            </div>

            {INPUT_NODES.map((node) => {
              const isActive = activeNode === node.id;
              const NodeIcon = node.Icon;

              return (
                <div
                  key={node.id}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                  className={`group relative p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#002F5B] text-white border-[#11AFC1] shadow-[0_8px_30px_rgba(17,175,193,0.25)] translate-x-1.5'
                      : 'bg-white dark:bg-[#071F33] text-[#002F5B] dark:text-white border-[#DDE8EC] dark:border-white/10 hover:border-[#11AFC1]/50 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? 'bg-[#11AFC1]/25 ring-1 ring-[#42D6C5]'
                          : 'bg-[#F2FAFC] dark:bg-white/5 text-[#006EAA] group-hover:bg-[#E8F7FA]'
                      }`}
                    >
                      <NodeIcon
                        className="w-5 h-5"
                        style={{ color: isActive ? '#42D6C5' : node.accent }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#11AFC1]">
                          {node.code}
                        </span>
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                            isActive
                              ? 'bg-white/10 text-[#42D6C5]'
                              : 'bg-[#EEF3F6] dark:bg-white/5 text-[#687A86] dark:text-slate-400'
                          }`}
                        >
                          {node.metrics}
                        </span>
                      </div>
                      <h4
                        className={`text-sm font-bold leading-tight ${
                          isActive ? 'text-white' : 'text-[#002F5B] dark:text-white'
                        }`}
                      >
                        {node.name}
                      </h4>
                      <p
                        className={`text-xs mt-1.5 leading-relaxed ${
                          isActive ? 'text-slate-200' : 'text-[#687A86] dark:text-slate-400'
                        }`}
                      >
                        {node.description}
                      </p>
                    </div>
                  </div>

                  {/* Branch terminal connection anchor */}
                  <div
                    className={`absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? 'bg-[#42D6C5] border-[#002F5B] scale-125 shadow-[0_0_8px_#42D6C5]'
                        : 'bg-white dark:bg-[#071F33] border-[#DDE8EC] dark:border-white/20'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* ----------------- COLUMN 2: CENTRAL CORE HUB ----------------- */}
          <div className="col-span-4 flex flex-col items-center justify-center px-2 py-4 relative">
            {/* SVG Branch Bus Cables (Behind Center Card) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <defs>
                <linearGradient id="busGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#11AFC1" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#42D6C5" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="busGradRight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#42D6C5" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#11AFC1" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Left Branch Bus Lines connecting Inputs to Center */}
              <path
                d="M 0 22 C 18 22, 22 50, 32 50"
                fill="none"
                stroke={isInputActive ? '#42D6C5' : '#DDE8EC'}
                strokeWidth={isInputActive ? '2' : '1.2'}
                className="transition-all duration-300 dark:stroke-white/20"
              />
              <path
                d="M 0 50 L 32 50"
                fill="none"
                stroke={isInputActive ? '#42D6C5' : '#DDE8EC'}
                strokeWidth={isInputActive ? '2' : '1.2'}
                className="transition-all duration-300 dark:stroke-white/20"
              />
              <path
                d="M 0 78 C 18 78, 22 50, 32 50"
                fill="none"
                stroke={isInputActive ? '#42D6C5' : '#DDE8EC'}
                strokeWidth={isInputActive ? '2' : '1.2'}
                className="transition-all duration-300 dark:stroke-white/20"
              />

              {/* Right Branch Bus Lines connecting Center to Outputs */}
              <path
                d="M 68 50 C 78 50, 82 15, 100 15"
                fill="none"
                stroke={isOutputActive ? '#42D6C5' : '#DDE8EC'}
                strokeWidth={isOutputActive ? '2' : '1.2'}
                className="transition-all duration-300 dark:stroke-white/20"
              />
              <path
                d="M 68 50 C 78 50, 82 38, 100 38"
                fill="none"
                stroke={isOutputActive ? '#42D6C5' : '#DDE8EC'}
                strokeWidth={isOutputActive ? '2' : '1.2'}
                className="transition-all duration-300 dark:stroke-white/20"
              />
              <path
                d="M 68 50 C 78 50, 82 62, 100 62"
                fill="none"
                stroke={isOutputActive ? '#42D6C5' : '#DDE8EC'}
                strokeWidth={isOutputActive ? '2' : '1.2'}
                className="transition-all duration-300 dark:stroke-white/20"
              />
              <path
                d="M 68 50 C 78 50, 82 85, 100 85"
                fill="none"
                stroke={isOutputActive ? '#42D6C5' : '#DDE8EC'}
                strokeWidth={isOutputActive ? '2' : '1.2'}
                className="transition-all duration-300 dark:stroke-white/20"
              />
            </svg>

            {/* Central Platform Engine Card */}
            <div className="relative w-full max-w-[280px] p-6 rounded-2xl bg-gradient-to-br from-[#002F5B] via-[#003B6D] to-[#071C2B] text-white border-2 border-[#11AFC1]/50 shadow-[0_12px_45px_rgba(0,47,91,0.35)] z-20 group">
              {/* Pulsing Core Ring */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#11AFC1] to-[#42D6C5] opacity-20 blur-sm group-hover:opacity-40 transition-opacity" />

              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#42D6C5] font-bold">
                    CORE KERNEL
                  </span>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#11AFC1]/20 border border-[#11AFC1]/40 text-[9px] font-mono text-[#42D6C5]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#42D6C5] animate-pulse" />
                    SYNCED
                  </div>
                </div>

                <div>
                  <h3
                    className="text-2xl font-black tracking-tight text-white flex items-center gap-2"
                    style={{ fontFamily: 'var(--font-manrope), sans-serif' }}
                  >
                    BRAXVIO
                  </h3>
                  <p className="text-[11px] font-mono text-[#11AFC1] mt-0.5">
                    Platform & Capital Orchestrator
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
                  <div className="flex items-center gap-2 text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#42D6C5] shrink-0" />
                    <span>Shared Authentication Rails</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#42D6C5] shrink-0" />
                    <span>Institutional Compliance</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#42D6C5] shrink-0" />
                    <span>Cross-Venture Capital Engine</span>
                  </div>
                </div>

                <div className="pt-2 text-[10px] font-mono text-slate-300 bg-white/5 rounded-lg p-2 border border-white/10 flex items-center justify-between">
                  <span>DEPLOYED NODES</span>
                  <span className="text-[#42D6C5] font-bold">4 PLATFORMS</span>
                </div>
              </div>
            </div>
          </div>

          {/* ----------------- COLUMN 3: OUTPUT BRANCHES ----------------- */}
          <div className="col-span-4 flex flex-col justify-between h-full py-2 space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-[#DDE8EC] dark:border-white/10">
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#006EAA] dark:text-[#42D6C5]">
                Stage 02 // Deployment Verticals
              </span>
              <span className="text-[9px] font-mono text-[#687A86] dark:text-slate-400">
                4 Verticals
              </span>
            </div>

            {OUTPUT_NODES.map((node) => {
              const isActive = activeNode === node.id;
              const NodeIcon = node.Icon;

              return (
                <div
                  key={node.id}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                  className={`group relative p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#002F5B] text-white border-[#11AFC1] shadow-[0_8px_30px_rgba(17,175,193,0.25)] -translate-x-1.5'
                      : 'bg-white dark:bg-[#071F33] text-[#002F5B] dark:text-white border-[#DDE8EC] dark:border-white/10 hover:border-[#11AFC1]/50 hover:shadow-md'
                  }`}
                >
                  {/* Branch terminal connection anchor */}
                  <div
                    className={`absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? 'bg-[#42D6C5] border-[#002F5B] scale-125 shadow-[0_0_8px_#42D6C5]'
                        : 'bg-white dark:bg-[#071F33] border-[#DDE8EC] dark:border-white/20'
                    }`}
                  />

                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? 'bg-[#11AFC1]/25 ring-1 ring-[#42D6C5]'
                          : 'bg-[#F2FAFC] dark:bg-white/5 text-[#006EAA] group-hover:bg-[#E8F7FA]'
                      }`}
                    >
                      <NodeIcon
                        className="w-4 h-4"
                        style={{ color: isActive ? '#42D6C5' : node.accent }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#11AFC1]">
                          {node.code}
                        </span>
                        <span
                          className={`text-[9px] font-mono px-2 py-0.2 rounded-full ${
                            isActive
                              ? 'bg-white/10 text-[#42D6C5]'
                              : 'bg-[#EEF3F6] dark:bg-white/5 text-[#687A86] dark:text-slate-400'
                          }`}
                        >
                          {node.metrics}
                        </span>
                      </div>
                      <h4
                        className={`text-xs font-bold leading-tight ${
                          isActive ? 'text-white' : 'text-[#002F5B] dark:text-white'
                        }`}
                      >
                        {node.name}
                      </h4>
                      <p
                        className={`text-[11px] mt-1 leading-snug ${
                          isActive ? 'text-slate-200' : 'text-[#687A86] dark:text-slate-400'
                        }`}
                      >
                        {node.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MOBILE / TABLET VIEW: Sequential Branch Pipeline (< lg) */}
      {/* ============================================================ */}
      <div className="lg:hidden space-y-6">
        {/* Tier 01: Foundational Inputs */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-1 border-b border-[#DDE8EC] dark:border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#11AFC1]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#006EAA] dark:text-[#42D6C5]">
              01 // Foundation Inputs
            </span>
          </div>

          <div className="space-y-2.5">
            {INPUT_NODES.map((node) => {
              const isSelected = activeNode === node.id;
              const NodeIcon = node.Icon;

              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(isSelected ? null : node.id)}
                  className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#002F5B] text-white border-[#11AFC1] shadow-lg ring-1 ring-[#11AFC1]/50'
                      : 'bg-white dark:bg-[#071F33] text-[#002F5B] dark:text-white border-[#DDE8EC] dark:border-white/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'bg-[#11AFC1]/25 ring-1 ring-[#42D6C5]' : 'bg-[#F2FAFC] dark:bg-white/5'
                      }`}
                    >
                      <NodeIcon
                        className="w-4 h-4"
                        style={{ color: isSelected ? '#42D6C5' : node.accent }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold truncate">{node.name}</span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-[#EEF3F6] dark:bg-white/10 text-[#006EAA] dark:text-[#42D6C5]">
                          {node.code}
                        </span>
                      </div>
                      <p className={`text-xs mt-1 leading-relaxed ${isSelected ? 'text-slate-200' : 'text-[#687A86] dark:text-slate-400'}`}>
                        {node.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Central Core Bridge */}
        <div className="relative py-2 flex flex-col items-center">
          <div className="w-0.5 h-6 bg-gradient-to-b from-[#11AFC1] to-[#42D6C5]" />
          <div className="w-full max-w-sm p-4 rounded-2xl bg-gradient-to-br from-[#002F5B] to-[#071C2B] text-white border border-[#11AFC1]/40 text-center shadow-md">
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#42D6C5] font-bold">
              ORCHESTRATION KERNEL
            </span>
            <h4 className="text-lg font-black text-white mt-0.5">BRAXVIO CORE</h4>
            <p className="text-xs text-slate-300 mt-1">
              Unifying capital allocation, compliance rails, and enterprise APIs.
            </p>
          </div>
          <div className="w-0.5 h-6 bg-gradient-to-b from-[#42D6C5] to-[#11AFC1]" />
        </div>

        {/* Tier 02: Deployment Verticals */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-1 border-b border-[#DDE8EC] dark:border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#42D6C5]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#006EAA] dark:text-[#42D6C5]">
              02 // Deployment Verticals
            </span>
          </div>

          <div className="space-y-2.5">
            {OUTPUT_NODES.map((node) => {
              const isSelected = activeNode === node.id;
              const NodeIcon = node.Icon;

              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(isSelected ? null : node.id)}
                  className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#002F5B] text-white border-[#11AFC1] shadow-lg ring-1 ring-[#11AFC1]/50'
                      : 'bg-white dark:bg-[#071F33] text-[#002F5B] dark:text-white border-[#DDE8EC] dark:border-white/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'bg-[#11AFC1]/25 ring-1 ring-[#42D6C5]' : 'bg-[#F2FAFC] dark:bg-white/5'
                      }`}
                    >
                      <NodeIcon
                        className="w-4 h-4"
                        style={{ color: isSelected ? '#42D6C5' : node.accent }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold truncate">{node.name}</span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-[#EEF3F6] dark:bg-white/10 text-[#006EAA] dark:text-[#42D6C5]">
                          {node.code}
                        </span>
                      </div>
                      <p className={`text-xs mt-1 leading-relaxed ${isSelected ? 'text-slate-200' : 'text-[#687A86] dark:text-slate-400'}`}>
                        {node.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
