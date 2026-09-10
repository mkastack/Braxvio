'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Layers,
  ShieldCheck,
  Globe2,
  Activity,
  Cpu,
  Terminal,
  ChevronRight,
  Building2,
  Pill,
  Truck,
  Landmark,
  Zap,
  BarChart3,
  Check,
  BookOpen,
} from 'lucide-react';
import BraxvioSystem from '@/components/system/BraxvioSystem';
import KampusMockup from '@/components/mockups/KampusMockup';
import PharmoraMockup from '@/components/mockups/PharmoraMockup';
import EcoliftMockup from '@/components/mockups/EcoliftMockup';
import DevPayMockup from '@/components/mockups/DevPayMockup';
import EcosystemSimulator from '@/components/system/EcosystemSimulator';
import { BRAXVIO_PRODUCTS, SECTORS, INSIGHTS_ARTICLES } from '@/data/ecosystem';

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── Ticker Bar ───────────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  '⬡ KAMPUS — University Ecosystem',
  '◆ PHARMORA — Healthcare Access',
  '◈ ECOLIFT — Smart Waste Logistics',
  '◉ DEVPAY AFRICA — Digital Economy',
  '◇ BRAXVIO LABS — R&D Horizon',
  '▣ BUILT IN AFRICA. BUILT FOR THE WORLD.',
  '⬡ KAMPUS — University Ecosystem',
  '◆ PHARMORA — Healthcare Access',
  '◈ ECOLIFT — Smart Waste Logistics',
  '◉ DEVPAY AFRICA — Digital Economy',
  '◇ BRAXVIO LABS — R&D Horizon',
  '▣ BUILT IN AFRICA. BUILT FOR THE WORLD.',
];

const products = [
  {
    id: 'kampus',
    num: '01',
    name: 'KAMPUS',
    category: 'Education',
    tagline: 'University life. One connected experience.',
    description:
      'A digital ecosystem around university students — unifying verified student housing, peer marketplaces, and essential campus life tools.',
    features: ['Verified Housing', 'Peer Marketplace', 'Student ID Rails', 'Academic Feeds'],
    status: 'PUBLIC BETA',
    statusColor: '#11AFC1',
    Icon: Building2,
    href: '/products/kampus',
    accentColor: '#11AFC1',
    bgClass: 'bg-[#F2FAFC]',
    borderClass: 'border-[#DDE8EC]',
    mockup: KampusMockup,
    dark: false,
  },
  {
    id: 'pharmora',
    num: '02',
    name: 'PHARMORA',
    category: 'Healthcare',
    tagline: 'Making healthcare access feel closer.',
    description:
      'A technology-enabled marketplace connecting patients directly with licensed community pharmacies, with live inventory and cold-chain dispatch.',
    features: ['Live Stock Queries', 'Clinical Audit', 'Cold-Chain Guard', 'Prescription Sync'],
    status: 'IN DEVELOPMENT',
    statusColor: '#008FC4',
    Icon: Pill,
    href: '/products/pharmora',
    accentColor: '#008FC4',
    bgClass: 'bg-white',
    borderClass: 'border-[#DDE8EC]',
    mockup: PharmoraMockup,
    dark: false,
  },
  {
    id: 'ecolift',
    num: '03',
    name: 'ECOLIFT',
    category: 'Sustainability',
    tagline: 'Smarter movement. Cleaner communities.',
    description:
      'Algorithmic logistics dispatching for municipal sanitation, real-time IoT bin monitoring, and circular economy rewards for household waste segregation.',
    features: ['Route Optimization', 'Telemetry Tracking', 'Circular Credits', 'Carbon Diversion'],
    status: 'IN DEVELOPMENT',
    statusColor: '#42D6C5',
    Icon: Truck,
    href: '/products/ecolift',
    accentColor: '#42D6C5',
    bgClass: 'bg-[#071C2B]',
    borderClass: 'border-[#11AFC1]/30',
    mockup: EcoliftMockup,
    dark: true,
  },
  {
    id: 'devpay',
    num: '04',
    name: 'DEVPAY AFRICA',
    category: 'Digital Economy',
    tagline: 'African talent. Global opportunity.',
    description:
      'A unified contract escrow and treasury rail allowing African engineers, designers, and creators to invoice global employers and receive instant multi-currency payouts.',
    features: ['Virtual ACH / IBAN', 'Milestone Escrow', 'Instant Settlement', 'Auto Compliance'],
    status: 'PRIVATE BETA',
    statusColor: '#006EAA',
    Icon: Landmark,
    href: '/products/devpay-africa',
    accentColor: '#006EAA',
    bgClass: 'bg-white',
    borderClass: 'border-[#DDE8EC]',
    mockup: DevPayMockup,
    dark: false,
  },
];

const techPillars = [
  {
    Icon: Cpu,
    title: 'Resilience & Offline-First',
    color: '#11AFC1',
    description:
      'Networks drop, latency spikes, and hardware varies. We build state machines with optimistic updates, local storage sync, and zero bloat.',
  },
  {
    Icon: ShieldCheck,
    title: 'Institutional Trust & Security',
    color: '#008FC4',
    description:
      'Cryptographic verification, encrypted data vaults, and strict audit logs — whether routing chronic medication or processing contracts.',
  },
  {
    Icon: Layers,
    title: 'Systemic Reusability',
    color: '#006EAA',
    description:
      'Shared infrastructural primitives allow new Braxvio products to deploy rapidly on proven identity, payment, and telemetry layers.',
  },
];

export default function HomePage() {
  const [activeSector, setActiveSector] = useState(SECTORS[0].id);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full">

      {/* ============================================================ */}
      {/* 01 — CINEMATIC HERO */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-0 overflow-hidden bg-white">
        {/* Layered Background System */}
        <div className="absolute inset-0 braxvio-grid-light opacity-50 pointer-events-none" />

        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-radial from-[#11AFC1]/8 via-[#11AFC1]/3 to-transparent blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-radial from-[#003E72]/8 via-[#003E72]/3 to-transparent blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 lg:pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center min-h-[calc(100vh-80px)]">

            {/* Left — Hero Copy */}
            <div className="lg:col-span-6 space-y-7 py-12 lg:py-0">
              {/* Logo mark + Badge */}
              <div className="flex items-center gap-3 animate-fade-in-up">
                <div className="relative w-8 h-10 shrink-0 transition-transform duration-300 hover:scale-105 drop-shadow-sm">
                  <Image
                    src="/braxvio-mark.png"
                    alt="Braxvio Logo"
                    fill
                    className="object-contain"
                    priority
                    sizes="40px"
                  />
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F2FAFC] border border-[#DDE8EC]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#11AFC1] animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#006EAA]">
                    BRAXVIO / BUILD. INNOVATE. ELEVATE.
                  </span>
                </div>
              </div>

              {/* Main Headline */}
              <div className="space-y-1 animate-fade-in-up delay-100">
                <h1 className="text-5xl sm:text-6xl lg:text-[68px] xl:text-[76px] font-black tracking-tight text-[#002F5B] leading-[1.02]">
                  WE BUILD
                </h1>
                <h1 className="text-5xl sm:text-6xl lg:text-[68px] xl:text-[76px] font-black tracking-tight leading-[1.02] braxvio-gradient-text">
                  TECHNOLOGY
                </h1>
                <h1 className="text-5xl sm:text-6xl lg:text-[68px] xl:text-[76px] font-black tracking-tight text-[#002F5B] leading-[1.02]">
                  FOR LIFE.
                </h1>
              </div>

              {/* Sub */}
              <p className="text-base sm:text-lg text-[#687A86] max-w-lg leading-relaxed animate-fade-in-up delay-200">
                Braxvio is the parent technology company creating digital products across higher
                education, healthcare commerce, sustainable logistics, and the emerging digital economy.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-1 animate-fade-in-up delay-300">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#003E72] via-[#006EAA] to-[#11AFC1] text-white text-sm font-bold shadow-md hover:shadow-lg hover:opacity-96 transition-all duration-300 group"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>EXPLORE OUR PRODUCTS</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/company"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#DDE8EC] bg-white/60 hover:bg-white hover:border-[#11AFC1]/50 text-sm font-semibold text-[#002F5B] transition-all duration-300 backdrop-blur-sm"
                >
                  DISCOVER BRAXVIO
                </Link>
              </div>

              {/* Micro Stats */}
              <div className="pt-5 border-t border-[#DDE8EC] grid grid-cols-3 gap-4 animate-fade-in-up delay-400">
                {[
                  { label: 'ECOSYSTEM NODES', value: '4', suffix: '', sub: 'Active Platforms' },
                  { label: 'HQ', value: '', suffix: 'Accra', sub: 'Ghana, West Africa' },
                  { label: 'REACH', value: '', suffix: 'Global', sub: 'Pan-African & Beyond' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-[9px] font-mono uppercase tracking-widest text-[#687A86] mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sm font-extrabold text-[#002F5B] tracking-tight">
                      {stat.value && <AnimatedCounter target={parseInt(stat.value)} />}
                      {stat.suffix}
                    </div>
                    <div className="text-[10px] text-[#687A86]">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Braxvio System Visualizer */}
            <div className="lg:col-span-6 flex items-center justify-center animate-slide-in-right delay-200">
              <BraxvioSystem />
            </div>
          </div>
        </div>

        {/* Bottom Ticker */}
        <div className="relative z-10 mt-auto border-t border-[#DDE8EC] bg-[#F7FAFC]/80 backdrop-blur-sm py-3 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {TICKER_ITEMS.map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center text-[10px] font-mono font-bold uppercase tracking-widest text-[#006EAA] px-8"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 02 — OPENING STATEMENT */}
      {/* ============================================================ */}
      <section className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#DDE8EC] overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-[11px] font-mono tracking-widest uppercase text-[#006EAA] font-semibold animate-fade-in-up">
            THE BRAXVIO BELIEF
          </div>

          <div className="space-y-3 animate-fade-in-up delay-100">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal text-[#687A86] tracking-tight leading-tight">
              WE DON&apos;T BUILD TECHNOLOGY{' '}
              <span className="font-extrabold text-[#002F5B]">FOR THE SAKE OF TECHNOLOGY.</span>
            </h2>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal text-[#687A86] tracking-tight leading-tight">
              WE BUILD IT TO MAKE{' '}
              <span className="braxvio-gradient-text font-extrabold">LIFE WORK BETTER.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#DDE8EC] animate-fade-in-up delay-200">
            {[
              {
                icon: '🎓',
                label: 'Education',
                text: 'University students deserve seamless campus ecosystems',
              },
              {
                icon: '💊',
                label: 'Healthcare',
                text: 'Access to authentic medication should never be a barrier',
              },
              {
                icon: '♻️',
                label: 'Sustainability',
                text: 'Clean communities need intelligent, incentivized logistics',
              },
            ].map((item) => (
              <div key={item.label} className="flex gap-3">
                <span className="text-2xl mt-0.5 shrink-0">{item.icon}</span>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#11AFC1] font-bold mb-1">
                    {item.label}
                  </div>
                  <p className="text-sm text-[#687A86] leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 03 — PRODUCT ECOSYSTEM SHOWCASE */}
      {/* ============================================================ */}
      <section className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto space-y-20">
          {/* Section Header */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#11AFC1] font-semibold">
              <Layers className="w-4 h-4" />
              <span>THE BRAXVIO PRODUCT SYSTEM</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#002F5B] tracking-tight">
              ONE COMPANY. <br />
              MULTIPLE SYSTEMS.
            </h2>
            <p className="text-base sm:text-lg text-[#687A86]">
              Braxvio products operate independently while sharing one vision — technology that improves everyday life.
            </p>
          </div>

          {/* Products */}
          <div className="space-y-12">
            {products.map((product, idx) => {
              const MockupComponent = product.mockup;
              const isReversed = idx % 2 === 1 && !product.dark;
              return (
                <div
                  key={product.id}
                  className={`rounded-3xl p-6 sm:p-10 lg:p-14 ${product.bgClass} border ${product.borderClass} grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative overflow-hidden card-premium ${product.dark ? 'card-premium-dark shadow-2xl' : 'shadow-sm'}`}
                >
                  {product.dark && (
                    <>
                      <div className="absolute inset-0 braxvio-grid-dark opacity-20 pointer-events-none" />
                      <div
                        className="absolute -top-32 -right-32 w-72 h-72 rounded-full blur-[80px] pointer-events-none"
                        style={{ background: `radial-gradient(circle, ${product.accentColor}20 0%, transparent 70%)` }}
                      />
                    </>
                  )}

                  {/* Info Column */}
                  <div
                    className={`relative z-10 lg:col-span-5 space-y-5 ${
                      isReversed ? 'order-1 lg:order-2' : ''
                    }`}
                  >
                    <div
                      className="text-[10px] font-mono font-bold tracking-widest uppercase"
                      style={{ color: product.accentColor }}
                    >
                      {product.num} / {product.category}
                    </div>

                    <div>
                      <h3
                        className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                          product.dark ? 'text-white' : 'text-[#002F5B]'
                        }`}
                      >
                        {product.name}
                      </h3>
                      <div
                        className="text-base font-medium mt-1"
                        style={{ color: product.accentColor }}
                      >
                        {product.tagline}
                      </div>
                    </div>

                    <p
                      className={`text-sm leading-relaxed ${
                        product.dark ? 'text-slate-300' : 'text-[#687A86]'
                      }`}
                    >
                      {product.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      {product.features.map((f) => (
                        <div
                          key={f}
                          className={`flex items-center gap-2 text-xs font-mono ${
                            product.dark ? 'text-slate-200' : 'text-[#002F5B]'
                          }`}
                        >
                          <Check
                            className="w-3.5 h-3.5 shrink-0"
                            style={{ color: product.accentColor }}
                          />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3">
                      <Link
                        href={product.href}
                        className={`inline-flex items-center gap-2 text-xs font-bold font-mono tracking-wider uppercase transition-colors group ${
                          product.dark
                            ? 'text-[#42D6C5] hover:text-white'
                            : 'text-[#002F5B] hover:text-[#11AFC1]'
                        }`}
                      >
                        <span>EXPLORE {product.name}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <span
                        className="text-[9px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                        style={{
                          color: product.accentColor,
                          borderColor: `${product.accentColor}40`,
                          backgroundColor: `${product.accentColor}15`,
                          border: `1px solid ${product.accentColor}40`,
                        }}
                      >
                        {product.status}
                      </span>
                    </div>
                  </div>

                  {/* Mockup Column */}
                  <div
                    className={`relative z-10 lg:col-span-7 ${
                      isReversed ? 'order-2 lg:order-1' : ''
                    }`}
                  >
                    <MockupComponent />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Ecosystem Simulator */}
          <div className="pt-8">
            <EcosystemSimulator />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 04 — WHAT WE BUILD (SECTOR MATRIX) */}
      {/* ============================================================ */}
      <section className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#DDE8EC]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#11AFC1] font-semibold">
                SYSTEM ARCHITECTURE / CORE DOMAINS
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#002F5B] tracking-tight">
                WHAT WE BUILD
              </h2>
            </div>
            <p className="text-sm text-[#687A86] max-w-md">
              We focus our engineering on four essential pillars of daily human and economic activity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SECTORS.map((sector) => {
              const isSelected = activeSector === sector.id;
              return (
                <div
                  key={sector.id}
                  onMouseEnter={() => setActiveSector(sector.id)}
                  className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-8 cursor-pointer card-premium ${
                    isSelected
                      ? 'bg-[#002F5B] text-white border-[#11AFC1] shadow-xl scale-[1.02] glow-navy'
                      : 'bg-[#F7FAFC] text-[#06131D] border-[#DDE8EC] hover:bg-white hover:border-[#11AFC1]/50'
                  }`}
                >
                  <div className="space-y-4">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-widest ${
                        isSelected ? 'text-[#42D6C5]' : 'text-[#687A86]'
                      }`}
                    >
                      DOMAINS / {sector.name}
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight">{sector.name}</h3>
                    <div
                      className={`text-xs font-medium ${
                        isSelected ? 'text-slate-200' : 'text-[#006EAA]'
                      }`}
                    >
                      {sector.tagline}
                    </div>
                    <p
                      className={`text-xs leading-relaxed ${
                        isSelected ? 'text-slate-300' : 'text-[#687A86]'
                      }`}
                    >
                      {sector.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-current/10 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold">Platform: {sector.productName}</span>
                    <Link
                      href={`/products/${sector.productSlug}`}
                      className={`p-1.5 rounded-lg transition-all ${
                        isSelected
                          ? 'bg-white/10 hover:bg-white/20 text-white'
                          : 'bg-white border border-[#DDE8EC] text-[#002F5B] hover:text-[#11AFC1]'
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 05 — BUILT FROM AFRICA */}
      {/* ============================================================ */}
      <section className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#06131D] text-white overflow-hidden">
        <div className="absolute inset-0 braxvio-grid-dark opacity-35 pointer-events-none" />
        {/* Animated globe pulse */}
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] hidden lg:block pointer-events-none">
          <div className="absolute inset-0 rounded-full border border-[#11AFC1]/10 animate-halo" style={{ animationDelay: '0s' }} />
          <div className="absolute inset-8 rounded-full border border-[#11AFC1]/15 animate-halo" style={{ animationDelay: '0.8s' }} />
          <div className="absolute inset-16 rounded-full border border-[#11AFC1]/20 animate-halo" style={{ animationDelay: '1.6s' }} />
          <div className="absolute inset-24 rounded-full bg-[#11AFC1]/5 flex items-center justify-center">
            <Globe2 className="w-16 h-16 text-[#11AFC1]/40 animate-rotate-slow" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-5">
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#42D6C5] font-semibold">
              ORIGIN &amp; HORIZON
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              BUILT FROM AFRICA. <br />
              DESIGNED WITHOUT BORDERS.
            </h2>
            <p className="text-base text-slate-300 leading-relaxed max-w-lg">
              Our perspective begins in Africa, but the problems we solve and the standards we build toward are global.
            </p>
          </div>

          {/* Coordinate grid */}
          <div className="relative rounded-3xl p-6 sm:p-10 bg-[#071C2B] border border-[#11AFC1]/25 overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  coord: '5.6037° N, 0.1870° W',
                  city: 'Accra, Ghana',
                  role: 'Headquarters, Engineering & Systems Design',
                  color: '#11AFC1',
                },
                {
                  coord: 'REGIONAL HUB',
                  city: 'West Africa',
                  role: 'Kampus higher education & Pharmora network',
                  color: '#008FC4',
                },
                {
                  coord: 'EXPANSION VECTORS',
                  city: 'East & Southern Africa',
                  role: 'DevPay Africa cross-border developer liquidity',
                  color: '#42D6C5',
                },
                {
                  coord: 'GLOBAL SETTLEMENT',
                  city: 'International Rails',
                  role: 'Compliant USD, GBP, EUR banking bridges',
                  color: '#006EAA',
                },
              ].map((loc) => (
                <div
                  key={loc.city}
                  className="space-y-2 pl-4 border-l-2 transition-all duration-300 hover:pl-5"
                  style={{ borderColor: loc.color }}
                >
                  <div className="text-[10px] font-mono text-slate-400 uppercase">{loc.coord}</div>
                  <div className="text-base font-bold text-white">{loc.city}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{loc.role}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#42D6C5] animate-ping" />
                <span>ACTIVE INFRASTRUCTURE NODES ACROSS CONTINENTAL CORRIDORS</span>
              </div>
              <Link href="/company" className="text-[#42D6C5] hover:text-white transition-colors flex items-center gap-1">
                <span>Read the Braxvio Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 06 — ENGINEERING PHILOSOPHY */}
      {/* ============================================================ */}
      <section className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#DDE8EC]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-4">
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#006EAA] font-semibold">
              ENGINEERING RIGOR
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#002F5B] tracking-tight leading-tight">
              WE DON&apos;T CHOOSE TECHNOLOGY BECAUSE IT&apos;S TRENDING.{' '}
              <span className="braxvio-gradient-text">WE CHOOSE IT BECAUSE IT FITS THE PROBLEM.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techPillars.map(({ Icon, title, color, description }) => (
              <div
                key={title}
                className="p-8 rounded-2xl bg-[#F7FAFC] border border-[#DDE8EC] space-y-4 card-premium group hover:bg-white hover:border-[#DDE8EC]"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon className="w-5.5 h-5.5" style={{ color }} />
                </div>
                <h3 className="text-xl font-bold text-[#002F5B]">{title}</h3>
                <p className="text-sm text-[#687A86] leading-relaxed">{description}</p>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/technology"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#002F5B] text-white text-xs font-mono tracking-wider uppercase font-semibold hover:bg-[#003E72] transition-colors"
            >
              <span>EXPLORE TECHNOLOGY ARCHITECTURE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 07 — BRAXVIO PHILOSOPHY QUOTE MOMENT */}
      {/* ============================================================ */}
      <section className="relative py-32 sm:py-44 px-4 sm:px-6 lg:px-8 bg-[#002F5B] text-white text-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 braxvio-grid-dark opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#42D6C5]/40 to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#11AFC1]/8 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#11AFC1]/5 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="text-xs font-mono tracking-widest uppercase text-[#42D6C5]">
            BRAXVIO BELIEVES
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.04]">
            THE BEST TECHNOLOGY <br />
            <span className="braxvio-gradient-text-light">DISAPPEARS</span> INTO LIFE.
          </h2>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            It works quietly, naturally and reliably enough that people can focus on what matters.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 08 — WHAT'S NEXT (R&D HORIZON) */}
      {/* ============================================================ */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#071C2B] text-white border-t border-[#11AFC1]/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#42D6C5]">
              WHAT&apos;S NEXT
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              THE NEXT BRAXVIO PRODUCT <br />
              MAY SOLVE A PROBLEM <br />
              WE HAVEN&apos;T MET YET.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              We continuously study changing behaviors, emerging technologies, and overlooked systemic failures to understand what deserves to be built next.
            </p>
            <Link
              href="/labs"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#42D6C5] hover:text-white transition-colors"
            >
              <span>Explore Braxvio Labs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            {[
              {
                stage: 'EXPLORING',
                title: 'Applied Human-AI Workflows',
                desc: 'Contextual assistance for micro-enterprises',
                color: '#42D6C5',
              },
              {
                stage: 'EXPERIMENTING',
                title: 'Decentralized Logistics Relays',
                desc: 'Optimizing cold-chain last-mile telemetry',
                color: '#11AFC1',
              },
              {
                stage: 'STUDYING',
                title: 'Portable Digital Credentials',
                desc: 'Cross-institutional academic verifications',
                color: '#008FC4',
              },
              {
                stage: 'THINKING ABOUT',
                title: 'Circular Resource Networks',
                desc: 'Incentivizing community environmental stewardship',
                color: '#006EAA',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2 card-premium-dark hover:bg-white/8 hover:border-white/20 transition-all duration-300"
              >
                <span className="text-[9px] tracking-wider" style={{ color: item.color }}>
                  {item.stage}
                </span>
                <div className="font-bold text-white text-sm">{item.title}</div>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 09 — IMPACT METRICS */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#F7FAFC] border-y border-[#DDE8EC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#11AFC1] font-semibold">
              PLATFORM IMPACT
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#002F5B] tracking-tight mt-3">
              THE NUMBERS BEHIND THE SYSTEM
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { metric: 4, suffix: '', label: 'Active Platforms', sub: 'Across 4 sectors', color: '#11AFC1' },
              { metric: 0, suffix: 'Ghana', label: 'HQ Location', sub: 'Accra, West Africa', color: '#008FC4' },
              { metric: 1, suffix: ' Vision', label: 'Unified Mission', sub: 'Technology for life', color: '#006EAA' },
              { metric: 0, suffix: 'Global', label: 'Market Reach', sub: 'Pan-African & beyond', color: '#42D6C5' },
            ].map((item, i) => (
              <div
                key={item.label}
                className="p-6 rounded-2xl bg-white border border-[#DDE8EC] text-center space-y-2 card-premium"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div
                  className="text-4xl sm:text-5xl font-black tracking-tight"
                  style={{ color: item.color }}
                >
                  {item.metric > 0 ? (
                    <>
                      <AnimatedCounter target={item.metric} />
                      {item.suffix}
                    </>
                  ) : (
                    item.suffix
                  )}
                </div>
                <div className="text-sm font-bold text-[#002F5B]">{item.label}</div>
                <div className="text-xs text-[#687A86]">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10 — LATEST INSIGHTS */}
      {/* ============================================================ */}
      <section className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#DDE8EC]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#006EAA] font-semibold">
                PERSPECTIVE &amp; RESEARCH
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#002F5B] tracking-tight">
                LATEST INSIGHTS
              </h2>
            </div>
            <Link
              href="/insights"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-[#006EAA] hover:text-[#002F5B] transition-colors"
            >
              <span>VIEW PUBLICATION</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {INSIGHTS_ARTICLES.map((article, idx) => (
              <article
                key={article.id}
                className={`p-7 rounded-2xl bg-white border border-[#DDE8EC] hover:border-[#11AFC1] shadow-sm transition-all duration-300 flex flex-col justify-between space-y-6 group card-premium ${
                  idx === 0 ? 'lg:col-span-2' : ''
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[#687A86]">
                    <span className="text-[#006EAA] uppercase font-bold">{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3
                    className={`font-bold text-[#06131D] group-hover:text-[#006EAA] transition-colors ${
                      idx === 0 ? 'text-2xl sm:text-3xl' : 'text-xl'
                    }`}
                  >
                    {article.title}
                  </h3>
                  <p className="text-sm text-[#687A86] leading-relaxed">{article.excerpt}</p>
                </div>

                <div className="pt-4 border-t border-[#DDE8EC] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#003E72] to-[#11AFC1] flex items-center justify-center text-white text-[8px] font-bold">
                      {article.author.name.charAt(0)}
                    </div>
                    <span className="font-mono text-[#687A86]">{article.author.name}</span>
                  </div>
                  <Link
                    href={`/insights/${article.slug}`}
                    className="inline-flex items-center gap-1 font-bold text-[#002F5B] group-hover:text-[#11AFC1] transition-colors"
                  >
                    <span>Read article</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 11 — BUILD WITH BRAXVIO / PARTNERSHIPS */}
      {/* ============================================================ */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto rounded-3xl p-8 sm:p-14 bg-gradient-to-br from-[#002F5B] via-[#003E72] to-[#071C2B] text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 braxvio-grid-dark opacity-30 pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#11AFC1]/10 blur-[80px] pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-2xl">
            <span className="text-xs font-mono tracking-widest uppercase text-[#42D6C5]">
              STRATEGIC COLLABORATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              BUILD WITH BRAXVIO.
            </h2>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              We partner with academic universities, healthcare networks, municipal operators, and enterprise engineering teams to deploy technology that solves systemic challenges.
            </p>
          </div>

          <Link
            href="/contact"
            className="relative z-10 px-7 py-4 rounded-xl bg-gradient-to-r from-[#11AFC1] to-[#42D6C5] text-[#002F5B] text-xs font-mono font-bold tracking-wider uppercase hover:opacity-95 shadow-md transition-all shrink-0 flex items-center gap-2"
          >
            <span>START A CONVERSATION</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 12 — FINAL HOMEPAGE CTA */}
      {/* ============================================================ */}
      <section className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#DDE8EC]">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F2FAFC] border border-[#DDE8EC]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#11AFC1] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#006EAA]">
              ONE DIRECTION FORWARD
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold text-[#002F5B] tracking-tight">
            WE&apos;RE BUILDING <br />
            <span className="braxvio-gradient-text">WHAT COMES NEXT.</span>
          </h2>

          <p className="text-base text-[#687A86] max-w-lg mx-auto leading-relaxed">
            Whether you&apos;re a student, a healthcare professional, a city administrator, or a developer — there&apos;s a Braxvio product designed around your reality.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-xs font-mono uppercase tracking-wider font-semibold">
            <Link
              href="/products"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#003E72] via-[#006EAA] to-[#11AFC1] text-white hover:opacity-95 transition-all shadow-md inline-flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl bg-[#F7FAFC] border border-[#DDE8EC] text-[#002F5B] hover:bg-white hover:border-[#11AFC1]/50 transition-all inline-flex items-center gap-2"
            >
              <span>Work With Braxvio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/careers"
              className="px-6 py-3.5 rounded-xl bg-[#F7FAFC] border border-[#DDE8EC] text-[#002F5B] hover:bg-white hover:border-[#11AFC1]/50 transition-all inline-flex items-center gap-2"
            >
              <span>Join Braxvio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
