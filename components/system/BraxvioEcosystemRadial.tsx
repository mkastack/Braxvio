'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface RadialNode {
  id: string;
  name: string;
  category: string;
  slug?: string;
  angle: number; // in degrees, 270 is top
  status: string;
}

const NODES: RadialNode[] = [
  {
    id: 'kampus',
    name: 'KAMPUS',
    category: 'EDUCATION',
    slug: '/products/kampus',
    angle: 270, // Top / North (matching the active top node in see.jpeg)
    status: 'PUBLIC BETA',
  },
  {
    id: 'pharmora',
    name: 'PHARMORA',
    category: 'HEALTHCARE',
    slug: '/products/pharmora',
    angle: 330, // Top Right
    status: 'IN DEVELOPMENT',
  },
  {
    id: 'devpay',
    name: 'DEVPAY',
    category: 'DIGITAL WORK',
    slug: '/products/devpay-africa',
    angle: 30, // Bottom Right
    status: 'PRIVATE BETA',
  },
  {
    id: 'ecolift',
    name: 'ECOLIFT',
    category: 'SUSTAINABILITY',
    slug: '/products/ecolift',
    angle: 90, // Bottom
    status: 'IN DEVELOPMENT',
  },
  {
    id: 'labs',
    name: 'BRAXVIO LABS',
    category: 'APPLIED R&D',
    slug: '/labs',
    angle: 150, // Bottom Left
    status: 'ACTIVE PIPELINE',
  },
  {
    id: 'stewardship',
    name: 'STEWARDSHIP',
    category: 'GOVERNANCE',
    slug: '/company',
    angle: 210, // Top Left
    status: 'CORE SOVEREIGNTY',
  },
];

export default function BraxvioEcosystemRadial() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-cycle through nodes every 3.5s unless hovered
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % NODES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isHovered]);

  const activeNode = NODES[activeIdx];

  // SVG Geometry (520x520 coordinate space)
  const cx = 260;
  const cy = 260;
  const orbitRadius = 180;
  const innerRadius = 115;
  const centerRadius = 55;

  // Compute (x,y) for active node
  const activeRad = (activeNode.angle * Math.PI) / 180;
  const activeX = cx + orbitRadius * Math.cos(activeRad);
  const activeY = cy + orbitRadius * Math.sin(activeRad);

  return (
    <div
      className="relative w-full max-w-[480px] sm:max-w-[540px] aspect-square mx-auto flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Soft Ethereal Radial Blue/Cyan Haze (Exact match to see.jpeg background) ── */}
      <div className="absolute inset-8 sm:inset-12 rounded-full bg-gradient-radial from-[#11AFC1]/15 via-[#008FC4]/8 to-transparent blur-3xl pointer-events-none" />

      {/* ── SVG Radar / Rings & Spoke Connectors ── */}
      <svg
        viewBox="0 0 520 520"
        className="w-full h-full absolute inset-0 pointer-events-none"
      >
        <defs>
          {/* Active Beam Gradient */}
          <linearGradient id="activeBeam" x1={cx} y1={cy} x2={activeX} y2={activeY} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#11AFC1" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#006EAA" stopOpacity="1" />
          </linearGradient>

          {/* Central Glow */}
          <radialGradient id="centerAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E0F7FA" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#E0F7FA" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#E0F7FA" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Center Circle Shade (see.jpeg) */}
        <circle cx={cx} cy={cy} r={innerRadius + 30} fill="url(#centerAura)" />

        {/* Outer Orbit Circle */}
        <circle
          cx={cx}
          cy={cy}
          r={orbitRadius}
          fill="none"
          stroke="#D0E3E8"
          strokeWidth="1.5"
          className="opacity-70"
        />

        {/* Middle Dashed Circle (see.jpeg) */}
        <circle
          cx={cx}
          cy={cy}
          r={innerRadius}
          fill="none"
          stroke="#97CCD6"
          strokeWidth="1.5"
          strokeDasharray="5 5"
          className="opacity-60"
        />

        {/* Dashed Spoke Lines connecting Center to all Nodes */}
        {NODES.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const x2 = cx + orbitRadius * Math.cos(rad);
          const y2 = cy + orbitRadius * Math.sin(rad);
          const isActive = i === activeIdx;

          if (isActive) return null; // Drawn as solid beam below

          return (
            <line
              key={node.id}
              x1={cx}
              y1={cy}
              x2={x2}
              y2={y2}
              stroke="#B2D8DF"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="opacity-75 transition-all duration-500"
            />
          );
        })}

        {/* ── Active Solid Connecting Beam (Matching the vibrant cyan beam in see.jpeg) ── */}
        <line
          x1={cx}
          y1={cy}
          x2={activeX}
          y2={activeY}
          stroke="url(#activeBeam)"
          strokeWidth="4.5"
          strokeLinecap="round"
          className="transition-all duration-500 drop-shadow-[0_0_8px_rgba(17,175,193,0.5)]"
        />
      </svg>

      {/* ── Central Parent Company Node (Matching the white center circle in see.jpeg) ── */}
      <div
        className="absolute z-20 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white border-2 border-[#11AFC1]/50 shadow-[0_10px_35px_rgba(0,47,91,0.12)] flex flex-col items-center justify-center text-center p-2 transition-all duration-300 hover:scale-105"
      >
        <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-[#11AFC1] mb-1">
          CENTRAL
        </span>
        <div className="relative w-7 h-8 my-0.5">
          <Image
            src="/braxvio-mark.png"
            alt="Braxvio"
            fill
            className="object-contain"
            sizes="32px"
          />
        </div>
        <span
          className="text-xs sm:text-sm font-black text-[#002F5B] tracking-tight leading-none"
          style={{ fontFamily: 'var(--font-manrope), sans-serif' }}
        >
          BRAXVIO
        </span>
        <span className="text-[7.5px] font-mono text-[#687A86] tracking-wider uppercase mt-0.5">
          HOLDING CORE
        </span>
      </div>

      {/* ── Surrounding Satellite Product Nodes (Matching the 6 circular buttons in see.jpeg) ── */}
      {NODES.map((node, i) => {
        const rad = (node.angle * Math.PI) / 180;
        // Map 0-520 coordinate to percentage (0% to 100%)
        const xPct = ((cx + orbitRadius * Math.cos(rad)) / 520) * 100;
        const yPct = ((cy + orbitRadius * Math.sin(rad)) / 520) * 100;
        const isActive = i === activeIdx;

        return (
          <button
            key={node.id}
            onClick={() => setActiveIdx(i)}
            style={{
              left: `${xPct}%`,
              top: `${yPct}%`,
              transform: 'translate(-50%, -50%)',
            }}
            className={`absolute z-30 transition-all duration-500 group focus:outline-none ${
              isActive ? 'scale-105 z-40' : 'hover:scale-105'
            }`}
          >
            {/* Satellite Node Badge */}
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center text-center p-2 cursor-pointer transition-all duration-500 ${
                isActive
                  ? 'bg-gradient-to-b from-[#002F5B] to-[#001D38] text-white shadow-[0_8px_30px_rgba(0,47,91,0.35)] ring-4 ring-[#11AFC1]'
                  : 'bg-white text-[#002F5B] border border-[#DDE8EC] shadow-[0_8px_20px_rgba(0,47,91,0.06)] hover:border-[#11AFC1] hover:shadow-[0_8px_25px_rgba(17,175,193,0.15)]'
              }`}
            >
              <span
                className={`text-[10px] sm:text-xs font-black tracking-tight leading-none mb-1 ${
                  isActive ? 'text-white' : 'text-[#002F5B] group-hover:text-[#006EAA]'
                }`}
                style={{ fontFamily: 'var(--font-manrope), sans-serif' }}
              >
                {node.name}
              </span>
              <span
                className={`text-[8px] sm:text-[9px] font-mono tracking-wider uppercase font-semibold leading-tight ${
                  isActive ? 'text-[#42D6C5]' : 'text-[#687A86]'
                }`}
              >
                {node.category}
              </span>
            </div>
          </button>
        );
      })}

      {/* ── Active Node Information Pill (Bottom Center) ── */}
      <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap z-30">
        <Link
          href={activeNode.slug || '/products'}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#DDE8EC] shadow-sm hover:border-[#11AFC1] hover:shadow-md text-[#002F5B] text-xs font-mono font-semibold transition-all group"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#11AFC1] animate-pulse" />
          <span>{activeNode.name}</span>
          <span className="text-[#687A86]">/ {activeNode.status}</span>
          <span className="text-[#11AFC1] group-hover:translate-x-0.5 transition-transform">→</span>
        </Link>
      </div>
    </div>
  );
}
