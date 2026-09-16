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
  Sparkles,
} from 'lucide-react';

interface NodeInfo {
  id: string;
  name: string;
  category: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
  x: number; // percentage in viewBox
  y: number;
  accent: string;
}

const NODES: NodeInfo[] = [
  {
    id: 'capital',
    name: 'CAPITAL',
    category: 'Growth & Stature',
    description: 'Long-term strategic financial participation and institutional balance sheets.',
    Icon: Coins,
    x: 20,
    y: 22,
    accent: '#008FC4',
  },
  {
    id: 'technology',
    name: 'TECHNOLOGY',
    category: 'Architecture',
    description: 'Cloud infrastructure, AI intelligence, banking rails, and telecommunications APIs.',
    Icon: Cpu,
    x: 50,
    y: 12,
    accent: '#11AFC1',
  },
  {
    id: 'institutions',
    name: 'INSTITUTIONS',
    category: 'Governance & Civic',
    description: 'Universities, hospital networks, municipal assemblies, and research councils.',
    Icon: Landmark,
    x: 80,
    y: 22,
    accent: '#006EAA',
  },
  {
    id: 'talent',
    name: 'TALENT',
    category: 'Engineering & Craft',
    description: 'World-class African software engineers, designers, and domain specialists.',
    Icon: Users2,
    x: 85,
    y: 62,
    accent: '#42D6C5',
  },
  {
    id: 'products',
    name: 'PRODUCTS',
    category: 'Ecosystem Platforms',
    description: 'Kampus, Pharmora, Ecolift, DevPay Africa, and future R&D initiatives.',
    Icon: Boxes,
    x: 65,
    y: 86,
    accent: '#11AFC1',
  },
  {
    id: 'communities',
    name: 'COMMUNITIES',
    category: 'Everyday Life',
    description: 'Students, patients, waste workers, and creators whose daily workflows we elevate.',
    Icon: HeartHandshake,
    x: 35,
    y: 86,
    accent: '#42D6C5',
  },
  {
    id: 'markets',
    name: 'MARKETS',
    category: 'Regional Distribution',
    description: 'Pan-African distribution channels and global cross-border market penetration.',
    Icon: TrendingUp,
    x: 15,
    y: 62,
    accent: '#003E72',
  },
];

export default function BraxvioEcosystemVisual() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const center = { x: 50, y: 50 };

  return (
    <div className="relative w-full max-w-4xl mx-auto py-8 select-none">
      {/* Visual Background Container */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-3xl border border-[#DDE8EC] bg-gradient-to-b from-[#F2FAFC] via-white to-[#F7FAFC] shadow-xl overflow-hidden p-4 sm:p-8">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 braxvio-grid-light opacity-60 pointer-events-none" />

        {/* Ambient glow in center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br from-[#11AFC1]/15 to-[#003E72]/10 blur-[60px] pointer-events-none" />

        {/* Dynamic SVG Connection Network */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#006EAA" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#11AFC1" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#42D6C5" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#002F5B" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#11AFC1" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Concentric orbital guide rings around Braxvio */}
          <circle
            cx="50"
            cy="50"
            r="22"
            fill="none"
            stroke="#DDE8EC"
            strokeWidth="0.5"
            strokeDasharray="1.5 2.5"
          />
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="#DDE8EC"
            strokeWidth="0.4"
            strokeDasharray="2 3"
          />

          {/* Connection lines from center to nodes */}
          {NODES.map((node) => {
            const isHovered = activeNode === node.id;
            return (
              <g key={node.id}>
                {/* Static / Base Connection Path */}
                <line
                  x1={center.x}
                  y1={center.y}
                  x2={node.x}
                  y2={node.y}
                  stroke={isHovered ? 'url(#activeGrad)' : 'url(#lineGrad)'}
                  strokeWidth={isHovered ? '0.8' : '0.4'}
                  className="transition-all duration-300"
                />

                {/* Animated traveling signal along path */}
                <line
                  x1={center.x}
                  y1={center.y}
                  x2={node.x}
                  y2={node.y}
                  stroke={node.accent}
                  strokeWidth={isHovered ? '1.2' : '0.6'}
                  strokeDasharray="2 8"
                  style={{
                    animation: isHovered
                      ? 'signalFlow 1.8s linear infinite'
                      : 'signalFlow 4s linear infinite',
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* Center Node: BRAXVIO */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center">
          <div className="relative group">
            {/* Outer pulsating ring */}
            <div className="absolute -inset-2.5 rounded-2xl bg-gradient-to-r from-[#003E72] via-[#006EAA] to-[#11AFC1] opacity-20 blur-sm group-hover:opacity-40 transition-opacity" />

            <div className="relative px-5 py-3.5 sm:px-7 sm:py-4 rounded-2xl bg-[#002F5B] text-white shadow-xl border border-[#11AFC1]/40 flex flex-col items-center">
              <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-[#42D6C5] font-bold uppercase">
                CORE SYSTEM
              </span>
              <span
                className="text-base sm:text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5"
                style={{ fontFamily: 'var(--font-manrope), sans-serif' }}
              >
                BRAXVIO
                <span className="w-1.5 h-1.5 rounded-full bg-[#42D6C5] animate-pulse" />
              </span>
            </div>
          </div>
        </div>

        {/* Orbiting Ecosystem Nodes */}
        {NODES.map((node) => {
          const isActive = activeNode === node.id;
          const NodeIcon = node.Icon;

          return (
            <div
              key={node.id}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute z-30 transition-all duration-300"
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              onClick={() => setActiveNode(isActive ? null : node.id)}
            >
              <button
                type="button"
                className={`group flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-[#002F5B] text-white shadow-lg border-2 border-[#11AFC1] scale-105'
                    : 'bg-white/90 backdrop-blur-sm text-[#002F5B] shadow-sm border border-[#DDE8EC] hover:border-[#11AFC1] hover:shadow-md hover:bg-white'
                }`}
                aria-label={`Node: ${node.name}`}
              >
                <div
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center transition-colors ${
                    isActive
                      ? 'bg-[#11AFC1] text-white'
                      : 'bg-[#F2FAFC] text-[#006EAA] group-hover:bg-[#11AFC1] group-hover:text-white'
                  }`}
                >
                  <NodeIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] sm:text-xs font-bold tracking-wider font-mono">
                    {node.name}
                  </div>
                  <div
                    className={`text-[8px] sm:text-[9px] leading-none hidden sm:block ${
                      isActive ? 'text-slate-200' : 'text-[#687A86]'
                    }`}
                  >
                    {node.category}
                  </div>
                </div>
              </button>

              {/* Detail Tooltip upon Hover/Active */}
              {isActive && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 sm:w-60 p-3 rounded-xl bg-[#06131D]/95 backdrop-blur-md text-white border border-[#11AFC1]/30 shadow-2xl z-40 text-[11px] leading-relaxed animate-fade-in-scale pointer-events-none">
                  <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-[#42D6C5] uppercase mb-1">
                    <Sparkles className="w-3 h-3 text-[#11AFC1]" />
                    <span>{node.category}</span>
                  </div>
                  <p className="text-slate-300">{node.description}</p>
                </div>
              )}
            </div>
          );
        })}

        {/* Technical overlay metadata */}
        <div className="absolute bottom-3 left-4 text-[9px] font-mono text-[#687A86] hidden sm:flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#11AFC1] inline-block" />
            7 STRATEGIC NODES CONNECTED
          </span>
          <span>•</span>
          <span>SYSTEM ARCHITECTURE: RESILIENT / MULTI-PRODUCT</span>
        </div>
      </div>
    </div>
  );
}
