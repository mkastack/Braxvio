'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
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
  GraduationCap,
  HeartPulse,
  Leaf,
} from 'lucide-react';
import BraxvioEcosystemRadial from '@/components/system/BraxvioEcosystemRadial';
import KampusMockup from '@/components/mockups/KampusMockup';
import PharmoraMockup from '@/components/mockups/PharmoraMockup';
import EcoliftMockup from '@/components/mockups/EcoliftMockup';
import DevPayMockup from '@/components/mockups/DevPayMockup';
import BraxvioEcosystemVisual from '@/components/partners/BraxvioEcosystemVisual';
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

const products = [
  {
    id: 'kampus',
    num: '01',
    name: 'Kampus',
    category: 'Education & Student Life',
    tagline: 'University life, simplified.',
    description:
      'Unifies verified off-campus student accommodation, peer-to-peer textbook and gadget trade, and digital student identity verification.',
    metrics: [
      { label: 'Hostel Beds', value: '1,400+' },
      { label: 'Broker Fee', value: '0%' },
      { label: 'Campuses', value: 'Legon & KNUST' },
    ],
    highlights: [
      { title: 'Direct Manager Booking', desc: 'Connect straight to verified hostel managers with no agent commission fees.' },
      { title: 'Deposit Escrow Protection', desc: 'Reservation funds remain locked safely until you inspect your room in person.' },
      { title: 'Campus Trade Network', desc: 'Buy and sell textbooks, calculators, and essentials within verified student handoff zones.' },
    ],
    status: 'Public Beta',
    statusColor: '#11AFC1',
    Icon: Building2,
    href: '/products/kampus',
    accentColor: '#11AFC1',
    badge: 'Higher Education',
    bgClass: 'bg-white',
    borderClass: 'border-[#E2E8F0]',
    mockup: KampusMockup,
    dark: false,
  },
  {
    id: 'pharmora',
    num: '02',
    name: 'Pharmora',
    category: 'Healthcare & Pharmaceuticals',
    tagline: 'Authentic medication, closer than ever.',
    description:
      'A digital dispensary network connecting patients directly to verified local pharmacies, guaranteeing genuine medication batches and temperature-monitored courier transit.',
    metrics: [
      { label: 'Partner Dispensaries', value: '42 Active' },
      { label: 'Avg Dispatch', value: '24 mins' },
      { label: 'Batch Counterfeits', value: 'Zero' },
    ],
    highlights: [
      { title: 'Live Stock Visibility', desc: 'Instant inventory queries across licensed community dispensaries in Accra.' },
      { title: 'Monitored Cold-Chain', desc: 'Real-time temperature logging (2°C – 8°C) for insulin, vaccines, and biologics.' },
      { title: 'Clinical Prescription Sync', desc: 'Prescriptions reviewed and digitally signed by licensed pharmacists before dispatch.' },
    ],
    status: 'In Development',
    statusColor: '#008FC4',
    Icon: Pill,
    href: '/products/pharmora',
    accentColor: '#008FC4',
    badge: 'Dispensary Infrastructure',
    bgClass: 'bg-white',
    borderClass: 'border-[#E2E8F0]',
    mockup: PharmoraMockup,
    dark: false,
  },
  {
    id: 'ecolift',
    num: '03',
    name: 'Ecolift',
    category: 'Sustainability & Civic Logistics',
    tagline: 'Smarter collection for cleaner communities.',
    description:
      'Turnkey route optimization for municipal and private waste operators, real-time collection tracking, and direct Mobile Money cashback for sorted household recyclables.',
    metrics: [
      { label: 'Transit Idle Cut', value: '-34%' },
      { label: 'Weekly Tonnage', value: '28+ Tons' },
      { label: 'Citizen Cashback', value: 'Instant MoMo' },
    ],
    highlights: [
      { title: 'Dynamic Hauler Routing', desc: 'GPS waypoint clustering eliminates redundant transit runs and cuts fuel consumption.' },
      { title: 'Smart Bin Telemetry', desc: 'Sensor-driven threshold alerts dispatch haulers before public commercial bins overflow.' },
      { title: 'Household Plastic Incentives', desc: 'Weighed PET plastics trigger automated micro-cashback directly to residents’ mobile wallets.' },
    ],
    status: 'In Development',
    statusColor: '#42D6C5',
    Icon: Truck,
    href: '/products/ecolift',
    accentColor: '#42D6C5',
    badge: 'Civic Telematics',
    bgClass: 'bg-[#061826]',
    borderClass: 'border-white/10',
    mockup: EcoliftMockup,
    dark: true,
  },
  {
    id: 'devpay',
    num: '04',
    name: 'DevPay Africa',
    category: 'Fintech & Digital Economy',
    tagline: 'African tech talent, paid without boundaries.',
    description:
      'Cross-border invoicing and milestone-gated escrow built for African software developers, agency teams, and digital creators billing international clients with zero predatory currency spreads.',
    metrics: [
      { label: 'Settlement Speed', value: '< 60 sec' },
      { label: 'FX Mark-up', value: '0% Mid-rate' },
      { label: 'Payout Rails', value: 'MoMo & Banks' },
    ],
    highlights: [
      { title: 'Multi-Currency Treasury', desc: 'Hold and convert USD, EUR, GBP, GHS, NGN, and KES in verified accounts.' },
      { title: 'Milestone Escrow Protection', desc: 'Clients lock payments in escrow upfront; funds release automatically on deliverable sign-off.' },
      { title: 'Direct Mobile Money Rails', desc: 'Instant one-click withdrawals to MTN MoMo, AirtelTigo, Vodafone Cash, or bank accounts.' },
    ],
    status: 'Private Beta',
    statusColor: '#006EAA',
    Icon: Landmark,
    href: '/products/devpay-africa',
    accentColor: '#006EAA',
    badge: 'Developer Financial Rails',
    bgClass: 'bg-white',
    borderClass: 'border-[#E2E8F0]',
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
      {/* ============================================================ */}
      {/* 01 — HERO */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex flex-col justify-between pt-28 lg:pt-24 pb-0 overflow-hidden bg-white">
        {/* Subtle Background Layer */}
        <div className="absolute inset-0 braxvio-grid-light opacity-50 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-16 flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

            {/* Left — Hero Copy & Actions */}
            <div className="lg:col-span-6 space-y-7 text-left">
              {/* Grounded Location Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0F7FA] border border-[#D2E7EE] shadow-xs">
                <div className="relative w-4 h-5 shrink-0">
                  <Image
                    src="/braxvio-mark.png"
                    alt="Braxvio Logo"
                    fill
                    className="object-contain"
                    priority
                    sizes="20px"
                  />
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-[#11AFC1]" />
                <span className="text-xs font-semibold text-[#005B8C]">
                  Parent Technology Company • Accra, Ghana
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl lg:text-[66px] font-black text-[#002F5B] tracking-tight leading-[1.06]">
                  Software built for <br />
                  <span className="braxvio-gradient-text">real life</span> in Africa.
                </h1>
              </div>

              {/* Supporting Narrative */}
              <p className="text-base sm:text-lg text-[#687A86] max-w-xl leading-relaxed">
                Braxvio creates focused digital products that remove daily friction — from university campus life and pharmacy access to smart city logistics and cross-border developer payments.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#003E72] via-[#006EAA] to-[#11AFC1] text-white text-sm font-semibold shadow-md hover:shadow-lg hover:shadow-[#11AFC1]/20 hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
                <Link
                  href="/company"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#DDE8EC] bg-white hover:bg-[#F7FAFC] hover:border-[#11AFC1] text-sm font-semibold text-[#002F5B] transition-all duration-300 hover:-translate-y-0.5 shadow-xs"
                >
                  Our Story
                </Link>
              </div>

              {/* Grounded Micro Stats */}
              <div className="pt-6 border-t border-[#DDE8EC] grid grid-cols-3 gap-4">
                {[
                  { label: 'HEADQUARTERS', value: 'Accra', sub: 'Ghana, West Africa' },
                  { label: 'CORE SECTORS', value: '4', sub: 'Campus, Health, Logistics, Pay' },
                  { label: 'FLAGSHIP IN BETA', value: 'Kampus', sub: 'Higher Education Ecosystem' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-[10px] font-semibold tracking-wider text-[#687A86] uppercase mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sm font-extrabold text-[#002F5B] tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-[11px] text-[#687A86] leading-tight mt-0.5">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Radial Parent Ecosystem Visualizer (Maintained as requested) */}
            <div className="lg:col-span-6 flex items-center justify-center animate-fade-in-scale">
              <BraxvioEcosystemRadial />
            </div>
          </div>
        </div>

        {/* Bottom Proof Strip */}
        <div className="relative z-10 mt-auto border-t border-[#DDE8EC] bg-[#F7FAFC] py-3.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 text-xs text-[#687A86]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[#002F5B] font-semibold">Active Product Lines:</span>
              <span className="text-[#485B67]">Kampus (Education) • Pharmora (Healthcare) • Ecolift (Sustainability) • DevPay Africa (Digital Work)</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[11px]">
              <span>Engineered in Accra</span>
              <span>•</span>
              <Link href="/products" className="text-[#006EAA] font-semibold hover:underline">
                View Product Roadmap →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 02 — OPENING STATEMENT */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#DDE8EC] overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#006EAA]">
            Our Core Directive
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal text-[#687A86] tracking-tight leading-tight">
              We don&apos;t build technology{' '}
              <span className="font-extrabold text-[#002F5B]">for the sake of technology.</span>
            </h2>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal text-[#687A86] tracking-tight leading-tight">
              We build it to make{' '}
              <span className="braxvio-gradient-text font-extrabold">daily life work better.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#DDE8EC]">
            {[
              {
                Icon: GraduationCap,
                label: 'Education',
                text: 'Higher education students deserve safe housing and connected campus tools.',
                color: '#11AFC1',
              },
              {
                Icon: HeartPulse,
                label: 'Healthcare',
                text: 'Checking authentic medication stock should take seconds, not hours of physical travel.',
                color: '#008FC4',
              },
              {
                Icon: Leaf,
                label: 'Sustainability',
                text: 'Modern cities need predictable sanitation logistics and practical recycling incentives.',
                color: '#42D6C5',
              },
            ].map(({ Icon, label, text, color }) => (
              <div key={label} className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#DDE8EC] flex items-center justify-center shadow-xs">
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#002F5B] mb-1">
                    {label}
                  </div>
                  <p className="text-xs sm:text-sm text-[#687A86] leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 03 — PRODUCT ECOSYSTEM SHOWCASE */}
      {/* ============================================================ */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Section Header */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#11AFC1]">
              <Layers className="w-4 h-4" />
              <span>The Product Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#002F5B] tracking-tight">
              One Company. <br />
              Focused Everyday Systems.
            </h2>
            <p className="text-base sm:text-lg text-[#687A86]">
              Each Braxvio platform operates with focused autonomy while sharing our unified commitment to dependable engineering.
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
                  className={`rounded-3xl p-6 sm:p-10 lg:p-12 ${product.bgClass} border ${product.borderClass} grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative overflow-hidden transition-all duration-300 ${
                    product.dark
                      ? 'shadow-[0_20px_50px_rgba(6,24,38,0.5)]'
                      : 'shadow-[0_8px_30px_rgba(0,47,91,0.04)] hover:shadow-[0_16px_40px_rgba(0,47,91,0.08)]'
                  }`}
                >
                  {/* Info Column */}
                  <div
                    className={`relative z-10 lg:col-span-5 space-y-6 ${
                      isReversed ? 'order-1 lg:order-2' : ''
                    }`}
                  >
                    {/* Header Pill & Index */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                            product.dark ? 'bg-white/10 text-white' : 'bg-[#002F5B]/8 text-[#002F5B]'
                          }`}
                        >
                          {product.category}
                        </span>
                        <span
                          className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg"
                          style={{
                            color: product.accentColor,
                            backgroundColor: `${product.accentColor}18`,
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full animate-pulse"
                            style={{ backgroundColor: product.accentColor }}
                          />
                          {product.status}
                        </span>
                      </div>
                      <span className={`font-mono text-xs font-bold ${product.dark ? 'text-slate-400' : 'text-[#687A86]'}`}>
                        {product.num} / 04
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div className="space-y-1">
                      <h3
                        className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                          product.dark ? 'text-white' : 'text-[#002F5B]'
                        }`}
                      >
                        {product.name}
                      </h3>
                      <div
                        className="text-sm sm:text-base font-semibold"
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

                    {/* Operational Proof Metrics Strip */}
                    <div
                      className={`grid grid-cols-3 gap-3 py-3 px-4 rounded-xl border ${
                        product.dark
                          ? 'bg-black/30 border-white/10'
                          : 'bg-[#F8FAFC] border-[#E2E8F0]'
                      }`}
                    >
                      {product.metrics.map((m) => (
                        <div key={m.label} className="space-y-0.5">
                          <div
                            className={`text-base font-extrabold font-mono tracking-tight ${
                              product.dark ? 'text-white' : 'text-[#002F5B]'
                            }`}
                          >
                            {m.value}
                          </div>
                          <div
                            className={`text-[10px] font-medium uppercase tracking-wider ${
                              product.dark ? 'text-slate-400' : 'text-[#687A86]'
                            }`}
                          >
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Capability Highlights */}
                    <div className="space-y-2.5">
                      {product.highlights.map((h) => (
                        <div key={h.title} className="flex items-start gap-2.5 text-xs">
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                            style={{
                              backgroundColor: `${product.accentColor}20`,
                              color: product.accentColor,
                            }}
                          >
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <p
                            className={`leading-snug ${
                              product.dark ? 'text-slate-300' : 'text-[#687A86]'
                            }`}
                          >
                            <strong
                              className={`font-semibold ${
                                product.dark ? 'text-white' : 'text-[#002F5B]'
                              }`}
                            >
                              {h.title}:
                            </strong>{' '}
                            {h.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Action CTA */}
                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <Link
                        href={product.href}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs group ${
                          product.dark
                            ? 'bg-[#42D6C5] text-[#061826] hover:bg-white'
                            : 'bg-[#002F5B] hover:bg-[#006EAA] text-white'
                        }`}
                      >
                        <span>Explore {product.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <span
                        className={`text-xs ${
                          product.dark ? 'text-slate-400' : 'text-[#687A86]'
                        }`}
                      >
                        Interactive preview →
                      </span>
                    </div>
                  </div>

                  {/* Mockup Column — hidden on mobile, visible on desktop */}
                  <div
                    className={`relative z-10 lg:col-span-7 hidden lg:block ${
                      isReversed ? 'order-2 lg:order-1' : ''
                    }`}
                  >
                    <MockupComponent />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 04 — WHAT WE BUILD (SECTOR MATRIX) */}
      {/* ============================================================ */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#DDE8EC]">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#11AFC1]">
                Core Focus Areas
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#002F5B] tracking-tight">
                What We Build
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
                      ? 'bg-[#002F5B] text-white border-[#11AFC1] shadow-xl scale-[1.02]'
                      : 'bg-[#F7FAFC] text-[#06131D] border-[#DDE8EC] hover:bg-white hover:border-[#11AFC1]/50'
                  }`}
                >
                  <div className="space-y-3">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        isSelected ? 'text-[#42D6C5]' : 'text-[#006EAA]'
                      }`}
                    >
                      {sector.name}
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight">{sector.name}</h3>
                    <div
                      className={`text-xs font-medium ${
                        isSelected ? 'text-slate-200' : 'text-[#687A86]'
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
                    <span className="text-xs font-semibold">Product: {sector.productName}</span>
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
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#06131D] text-white overflow-hidden">
        <div className="absolute inset-0 braxvio-grid-dark opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto space-y-14">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#42D6C5]">
              Origin &amp; Reach
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Built from Africa. <br />
              Designed without borders.
            </h2>
            <p className="text-base text-slate-300 leading-relaxed max-w-lg">
              Our perspective begins in Ghana, but the problems we solve and the standards we build toward are global.
            </p>
          </div>

          {/* Location Grid */}
          <div className="relative rounded-3xl p-6 sm:p-10 bg-[#071C2B] border border-white/10 overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  coord: 'Headquarters',
                  city: 'Accra, Ghana',
                  role: 'Engineering, Systems Architecture & Core Operations',
                  color: '#11AFC1',
                },
                {
                  coord: 'Primary Deployments',
                  city: 'West Africa',
                  role: 'Kampus university network & Pharmora pharmacy pilots',
                  color: '#008FC4',
                },
                {
                  coord: 'Roadmap Corridors',
                  city: 'East & Southern Africa',
                  role: 'DevPay Africa developer liquidity corridors',
                  color: '#42D6C5',
                },
                {
                  coord: 'Global Rails',
                  city: 'International Settlement',
                  role: 'Multi-currency USD, GBP, EUR banking partnerships',
                  color: '#006EAA',
                },
              ].map((loc) => (
                <div
                  key={loc.city}
                  className="space-y-2 pl-4 border-l-2 transition-all duration-300 hover:pl-5"
                  style={{ borderColor: loc.color }}
                >
                  <div className="text-xs font-semibold text-slate-400">{loc.coord}</div>
                  <div className="text-base font-bold text-white">{loc.city}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{loc.role}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#42D6C5]" />
                <span>Headquartered in Accra with distributed engineering talent across Africa</span>
              </div>
              <Link href="/company" className="text-[#42D6C5] hover:text-white transition-colors flex items-center gap-1 font-medium">
                <span>Read our company story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 06 — ENGINEERING RIGOR */}
      {/* ============================================================ */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#DDE8EC]">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#006EAA]">
              Engineering Discipline
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#002F5B] tracking-tight leading-tight">
              We don&apos;t pick tools for hype.{' '}
              <span className="braxvio-gradient-text">We build for dependability.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techPillars.map(({ Icon, title, color, description }) => (
              <div
                key={title}
                className="p-8 rounded-2xl bg-[#F7FAFC] border border-[#DDE8EC] space-y-4 card-premium group hover:bg-white hover:border-[#DDE8EC]"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
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
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#002F5B] text-white text-xs font-semibold tracking-wide uppercase hover:bg-[#003E72] transition-colors shadow-xs"
            >
              <span>Explore Technology Architecture</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 07 — PHILOSOPHY STATEMENT */}
      {/* ============================================================ */}
      <section className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#002F5B] text-white text-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#42D6C5]">
            Our Conviction
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            The best technology <br />
            <span className="braxvio-gradient-text-light">disappears</span> into life.
          </h2>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            It works quietly, naturally, and reliably enough that people can focus on what actually matters.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 08 — WHAT'S NEXT (R&D HORIZON) */}
      {/* ============================================================ */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#071C2B] text-white border-t border-[#11AFC1]/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#42D6C5]">
              Future Explorations
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Studying where everyday systems break down next.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              We continuously research changing consumer behaviors, emerging African infrastructure, and overlooked operational bottlenecks to understand what deserves to be built next.
            </p>
            <Link
              href="/labs"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#42D6C5] hover:text-white transition-colors"
            >
              <span>Explore Braxvio Labs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                stage: 'Active R&D',
                title: 'Applied AI for Micro-Enterprises',
                desc: 'Context-aware inventory assistance for independent neighborhood retailers.',
                color: '#42D6C5',
              },
              {
                stage: 'Prototype',
                title: 'Cold-Chain Telemetry',
                desc: 'Low-cost temperature logging sensors for last-mile pharmaceutical distribution.',
                color: '#11AFC1',
              },
              {
                stage: 'Exploration',
                title: 'Verifiable Student Credentials',
                desc: 'Portable academic verification for inter-campus activities.',
                color: '#008FC4',
              },
              {
                stage: 'Research',
                title: 'Community Recycling Incentives',
                desc: 'Local tokenized rewards for pre-sorted household plastic collection.',
                color: '#006EAA',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2 card-premium-dark hover:bg-white/8 hover:border-white/20 transition-all duration-300"
              >
                <span className="text-xs font-bold tracking-wide" style={{ color: item.color }}>
                  {item.stage}
                </span>
                <div className="font-bold text-white text-sm">{item.title}</div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 09 — HONEST COMMITMENTS */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#F7FAFC] border-y border-[#DDE8EC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#11AFC1]">
              Operational Pillars
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#002F5B] tracking-tight mt-2">
              How We Build &amp; Operate
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Accra, Ghana', label: 'Engineering Hub', sub: 'Home base for core architecture & research', color: '#11AFC1' },
              { title: '4 Focus Domains', label: 'Everyday Systems', sub: 'Campus, Health, Sanitation, Freelance Rails', color: '#008FC4' },
              { title: 'Zero Data Reselling', label: 'Strict Privacy', sub: 'Student and patient records remain private', color: '#006EAA' },
              { title: 'Offline Resilience', label: 'Network-Aware', sub: 'Engineered for intermittent connectivity & low data overhead', color: '#42D6C5' },
            ].map((item) => (
              <div
                key={item.label}
                className="p-6 rounded-2xl bg-white border border-[#DDE8EC] text-center space-y-2 card-premium"
              >
                <div
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                  style={{ color: item.color }}
                >
                  {item.title}
                </div>
                <div className="text-sm font-bold text-[#002F5B]">{item.label}</div>
                <div className="text-xs text-[#687A86] leading-relaxed">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10 — LATEST INSIGHTS */}
      {/* ============================================================ */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#DDE8EC]">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#006EAA]">
                Perspective &amp; Research
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#002F5B] tracking-tight">
                Latest Insights
              </h2>
            </div>
            <Link
              href="/insights"
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#006EAA] hover:text-[#002F5B] transition-colors"
            >
              <span>View Publication</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {INSIGHTS_ARTICLES.map((article, idx) => (
              <article
                key={article.id}
                className={`p-7 rounded-2xl bg-white border border-[#DDE8EC] hover:border-[#11AFC1] shadow-xs transition-all duration-300 flex flex-col justify-between space-y-6 group card-premium ${
                  idx === 0 ? 'lg:col-span-2' : ''
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#687A86]">
                    <span className="text-[#006EAA] uppercase font-bold tracking-wider">{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3
                    className={`font-bold text-[#06131D] group-hover:text-[#006EAA] transition-colors leading-snug ${
                      idx === 0 ? 'text-2xl sm:text-3xl' : 'text-xl'
                    }`}
                  >
                    {article.title}
                  </h3>
                  <p className="text-sm text-[#687A86] leading-relaxed">{article.excerpt}</p>
                </div>

                <div className="pt-4 border-t border-[#DDE8EC] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#003E72] to-[#11AFC1] flex items-center justify-center text-white text-[9px] font-bold">
                      {article.author.name.charAt(0)}
                    </div>
                    <span className="text-[#687A86] font-medium">{article.author.name}</span>
                  </div>
                  <Link
                    href={`/insights/${article.slug}`}
                    className="inline-flex items-center gap-1 font-semibold text-[#002F5B] group-hover:text-[#11AFC1] transition-colors"
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
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-br from-[#002F5B] via-[#003E72] to-[#071C2B] text-white shadow-xl relative overflow-hidden space-y-8">
            <div className="absolute inset-0 braxvio-grid-dark opacity-20 pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-5">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#42D6C5]">
                Partner With Braxvio
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Great technology <br />
                <span className="text-[#42D6C5]">isn&apos;t built in isolation.</span>
              </h2>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
                We work directly with higher education institutions, healthcare distributors, municipal assemblies, and technology infrastructure partners to build durable solutions.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/partners"
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#11AFC1] to-[#42D6C5] text-[#002F5B] text-xs font-bold tracking-wider uppercase hover:opacity-95 shadow-md transition-all flex items-center gap-2 group"
                >
                  <span>Explore Partnerships</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/partners/investment-interest"
                  className="px-7 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-semibold tracking-wider uppercase hover:bg-white/20 transition-all flex items-center gap-2 group"
                >
                  <span>Investment Inquiries</span>
                  <ArrowRight className="w-4 h-4 text-[#42D6C5] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Embedded Braxvio ecosystem network visual */}
            <div className="relative z-10 pt-4">
              <BraxvioEcosystemVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 12 — FINAL HOMEPAGE CTA */}
      {/* ============================================================ */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#DDE8EC]">
        <div className="max-w-5xl mx-auto text-center space-y-7">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F2FAFC] border border-[#DDE8EC]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#11AFC1]" />
            <span className="text-xs font-semibold tracking-wide text-[#006EAA]">
              Building What Matters
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold text-[#002F5B] tracking-tight">
            Building what comes <span className="braxvio-gradient-text">next.</span>
          </h2>

          <p className="text-base text-[#687A86] max-w-lg mx-auto leading-relaxed">
            Whether you&apos;re a university student, a licensed pharmacy operator, or an African software engineer — we build tools designed around your reality.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2 text-xs font-semibold uppercase tracking-wider">
            <Link
              href="/products"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#003E72] via-[#006EAA] to-[#11AFC1] text-white hover:opacity-95 transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl bg-[#F7FAFC] border border-[#DDE8EC] text-[#002F5B] hover:bg-white hover:border-[#11AFC1]/50 transition-all inline-flex items-center gap-2 shadow-xs"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/careers"
              className="px-6 py-3.5 rounded-xl bg-[#F7FAFC] border border-[#DDE8EC] text-[#002F5B] hover:bg-white hover:border-[#11AFC1]/50 transition-all inline-flex items-center gap-2 shadow-xs"
            >
              <span>Join the Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
