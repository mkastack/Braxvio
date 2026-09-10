import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight, Sparkles, Users, Award, Code2 } from 'lucide-react';
import { LEADERSHIP_PROFILES } from '@/data/ecosystem';

export const metadata: Metadata = {
  title: 'Leadership — Governance & Stewardship | Braxvio',
  description: 'Meet Michael Kwesi Annor and the engineers, clinicians, and systems architects steering Braxvio Technologies.'
};

export default function LeadershipPage() {
  const founder = LEADERSHIP_PROFILES[0];
  const directorate = LEADERSHIP_PROFILES.slice(1);

  return (
    <div className="pt-28 pb-36 px-6 sm:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/company"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#687A86] hover:text-[#002F5B] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO COMPANY</span>
          </Link>
        </div>

        {/* Header */}
        <div className="max-w-3xl space-y-4 border-b border-[#DDE8EC] pb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#006EAA] font-semibold">
            <Users className="w-4 h-4" />
            <span>GOVERNANCE & STEWARDSHIP</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#002F5B] tracking-tight">
            LEADERSHIP.
          </h1>
          <p className="text-lg text-[#687A86] leading-relaxed">
            Braxvio is steered by builders, fullstack engineers, and operators committed to long-term technology craftsmanship, ethical stewardship, and enduring digital infrastructure.
          </p>
        </div>

        {/* ── Featured Founder & CEO Spotlight Card ── */}
        {founder && (
          <div className="relative rounded-3xl p-8 sm:p-12 border border-[#11AFC1]/30 bg-gradient-to-br from-[#001D38] via-[#002F5B] to-[#004A7F] text-white overflow-hidden shadow-xl">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#11AFC1]/15 blur-[90px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#006EAA]/20 blur-[80px] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#11AFC1]/20 border border-[#11AFC1]/40 text-[#42D6C5] text-xs font-mono font-bold tracking-wider uppercase">
                    <Sparkles className="w-3 h-3" />
                    FOUNDER & CHIEF EXECUTIVE OFFICER
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-mono">
                    <Code2 className="w-3 h-3 text-[#42D6C5]" />
                    Fullstack Developer & Entrepreneur
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                    {founder.name}
                  </h2>
                  <p className="text-sm sm:text-base text-[#42D6C5] font-semibold mt-1">
                    {founder.role} • Braxvio Technologies
                  </p>
                </div>

                <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
                  {founder.bio}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
                  <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                    FOCUS: <span className="text-white font-semibold">{founder.focus}</span>
                  </div>
                  {founder.linkedin && (
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#006EAA] hover:bg-[#11AFC1] text-white font-semibold transition-all shadow-sm"
                    >
                      <span>Connect on LinkedIn</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Founder Monogram Badge */}
              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-br from-[#11AFC1] to-[#003E72] p-1 shadow-2xl">
                  <div className="w-full h-full rounded-[22px] bg-[#001D38] flex flex-col items-center justify-center text-center p-4">
                    <span className="text-3xl sm:text-4xl font-black font-mono text-white tracking-widest">
                      MKA
                    </span>
                    <span className="text-[10px] font-mono text-[#42D6C5] uppercase tracking-wider mt-1">
                      Braxvio Founder
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Directorate Grid ── */}
        <div className="space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-[#006EAA] font-bold">
            SENIOR DIRECTORATE & ADVISORY
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {directorate.map((leader) => (
              <div
                key={leader.id}
                className="p-8 rounded-3xl border border-[#DDE8EC] bg-[#F7FAFC] hover:bg-white hover:border-[#11AFC1] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Monogram / Abstract Profile Block */}
                  <div className="w-16 h-16 rounded-2xl bg-[#002F5B] text-white flex items-center justify-center font-extrabold text-xl font-mono shadow-sm">
                    {leader.name.split(' ').map((n) => n[0]).join('')}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#06131D]">
                      {leader.name}
                    </h3>
                    <div className="text-xs font-semibold text-[#006EAA] mt-0.5">
                      {leader.role}
                    </div>
                  </div>

                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#11AFC1] font-semibold">
                    FOCUS: {leader.focus}
                  </div>

                  <p className="text-xs sm:text-sm text-[#687A86] leading-relaxed">
                    {leader.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#DDE8EC] flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400">Braxvio Directorate</span>
                  <a
                    href={leader.linkedin || 'https://linkedin.com/company/braxvio'}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#002F5B] hover:text-[#11AFC1] font-mono flex items-center gap-1 font-semibold"
                  >
                    LinkedIn <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
