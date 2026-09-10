import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Compass, ShieldCheck, Target, Users } from 'lucide-react';
import { BRAXVIO_PRINCIPLES, COMPANY_FACTS } from '@/data/ecosystem';

export const metadata: Metadata = {
  title: 'Company — Why Braxvio Exists',
  description: 'Braxvio is a technology company creating digital products and infrastructure around the evolving needs of people, businesses and communities.'
};

export default function CompanyPage() {
  return (
    <div className="pt-28 pb-36 px-6 sm:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto space-y-28">
        {/* 01: BOLD OPENING HERO */}
        <section className="max-w-4xl space-y-6 border-b border-[#DDE8EC] pb-16">
          <div className="text-xs font-mono tracking-widest uppercase text-[#006EAA] font-semibold">
            ABOUT BRAXVIO TECHNOLOGIES
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#002F5B] tracking-tight leading-[1.05]">
            TECHNOLOGY SHOULD <br />
            <span className="braxvio-gradient-text">MOVE LIFE FORWARD.</span>
          </h1>

          <p className="text-xl sm:text-2xl text-[#687A86] leading-relaxed font-normal">
            Braxvio is a parent technology company creating digital products, platforms, and infrastructure around the evolving needs of people, businesses, and communities.
          </p>

          <div className="pt-4 flex items-center gap-6 text-xs font-mono text-[#002F5B]">
            <span>FOUNDED: {COMPANY_FACTS.founded}</span>
            <span>•</span>
            <span>HQ: {COMPANY_FACTS.hq}</span>
            <span>•</span>
            <span>STATUS: PARENT TECHNOLOGY CO</span>
          </div>
        </section>

        {/* 02: EDITORIAL STORYTELLING: WHY BRAXVIO EXISTS */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-[#DDE8EC] pb-24">
          <div className="lg:col-span-4 space-y-3 sticky top-28">
            <span className="text-xs font-mono tracking-widest uppercase text-[#006EAA] font-semibold">
              ORIGIN & RATIONALE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002F5B] tracking-tight">
              WHY BRAXVIO EXISTS.
            </h2>
            <p className="text-sm text-[#687A86]">
              Sub-Saharan Africa is experiencing unprecedented technological acceleration—yet essential everyday infrastructure remains deeply fractured.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-6 text-base sm:text-lg text-[#06131D] leading-relaxed">
            <p>
              In many emerging economies, smartphones have arrived before reliable postal addressing, predictable public transit, or connected pharmacy inventory systems. Millions of students attend universities where finding safe housing still involves exploitative physical middlemen. Patients travel between five pharmacies to locate verified medication. Talented developers face punitive international banking barriers just to receive payments for their work.
            </p>
            <p className="text-[#687A86]">
              Most technology initiatives attempt to solve these issues by building quick, disposable consumer apps—spending capital on superficial user acquisition while leaving root infrastructural friction untouched.
            </p>
            <div className="p-6 rounded-2xl bg-[#F2FAFC] border border-[#11AFC1]/30 my-6">
              <p className="font-semibold text-[#002F5B] text-lg">
                Braxvio exists to identify these structural fractures and engineer focused, durable technology platforms around them.
              </p>
            </div>
            <p>
              We do not invent artificial problems to fit speculative tech trends. We observe where people lose hours of productive time, where scams persist, and where essential utilities break down. Then we engineer systems that make life work quietly, reliably, and with dignity.
            </p>
          </div>
        </section>

        {/* 03: MISSION & VISION */}
        <section className="space-y-12 border-b border-[#DDE8EC] pb-24">
          <div className="text-xs font-mono tracking-widest uppercase text-[#006EAA] font-semibold">
            CORE DIRECTIVE
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="p-10 rounded-3xl bg-[#F7FAFC] border border-[#DDE8EC] space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#11AFC1] font-bold">
                MISSION
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#002F5B] tracking-tight leading-snug">
                BUILD TECHNOLOGY THAT MAKES EVERYDAY SYSTEMS WORK BETTER.
              </h3>
              <p className="text-sm text-[#687A86] leading-relaxed">
                We engineer scalable, secure, and intuitive platforms that remove operational friction from education, healthcare, logistics, and digital work.
              </p>
            </div>

            {/* Vision */}
            <div className="p-10 rounded-3xl bg-[#002F5B] text-white space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#42D6C5] font-bold">
                VISION
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                A FUTURE WHERE TECHNOLOGY EXPANDS WHAT PEOPLE CAN DO.
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                An interconnected digital ecosystem where location, currency, and systemic fragmentation never restrict human potential and daily dignity.
              </p>
            </div>
          </div>
        </section>

        {/* 04: PRINCIPLES (HOW WE THINK) */}
        <section className="space-y-16 border-b border-[#DDE8EC] pb-24">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono tracking-widest uppercase text-[#006EAA] font-semibold">
              OPERATIONAL DOCTRINE
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#002F5B] tracking-tight">
              HOW WE THINK.
            </h2>
            <p className="text-sm sm:text-base text-[#687A86]">
              Six uncompromising principles guide every line of code, product roadmap, and operational decision at Braxvio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BRAXVIO_PRINCIPLES.map((principle) => (
              <div
                key={principle.number}
                className="p-8 rounded-2xl border border-[#DDE8EC] bg-white hover:border-[#11AFC1] transition-all duration-300 space-y-4 group"
              >
                <div className="text-4xl font-extrabold font-mono text-[#DDE8EC] group-hover:text-[#11AFC1] transition-colors">
                  {principle.number}
                </div>
                <h3 className="text-xl font-bold text-[#002F5B]">
                  {principle.title}
                </h3>
                <p className="text-sm text-[#687A86] leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 05: LEADERSHIP LINK & TALENT BANNER */}
        <section className="rounded-3xl p-8 sm:p-12 bg-[#F7FAFC] border border-[#DDE8EC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-[#002F5B]">
              Meet the Stewards of Braxvio
            </h3>
            <p className="text-sm text-[#687A86]">
              Learn about our leadership team, governance principles, and engineering stewardship.
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              href="/company/leadership"
              className="px-6 py-3 rounded-xl bg-[#002F5B] text-white text-xs font-mono font-bold tracking-wider uppercase hover:bg-[#003E72] transition-colors"
            >
              View Leadership →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
