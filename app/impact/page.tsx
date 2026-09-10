import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Globe2, HeartPulse, GraduationCap, Leaf, Banknote, ShieldAlert, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Impact — Technology That Leaves Something Better',
  description: 'How Braxvio products intend to create meaningful, durable value across education, health, sustainability, and the digital economy.'
};

export default function ImpactPage() {
  const impactDomains = [
    {
      icon: <GraduationCap className="w-6 h-6 text-[#11AFC1]" />,
      sector: 'EDUCATION',
      platform: 'Kampus',
      headline: 'Dismantling campus living extortion',
      statement: 'University students frequently lose weeks and tuition savings to predatory housing cartels and unverified middlemen. By anchoring campus accommodation to vetted institutional reviews and verified leases, Kampus protects student well-being and academic focus.'
    },
    {
      icon: <HeartPulse className="w-6 h-6 text-[#008FC4]" />,
      sector: 'HEALTHCARE',
      platform: 'Pharmora',
      headline: 'Securing the pharmaceutical chain of custody',
      statement: 'Counterfeit drugs and unpredictable pharmacy stockouts endanger lives daily. Pharmora connects regulated pharmacies to digital live queries and monitored cold-chain dispatches, turning medication access from an arduous physical search into an audited, predictable delivery.'
    },
    {
      icon: <Leaf className="w-6 h-6 text-[#42D6C5]" />,
      sector: 'SUSTAINABILITY',
      platform: 'Ecolift',
      headline: 'Optimizing urban municipal metabolism',
      statement: 'Rapid urban sprawl leads to uncollected refuse and overburdened transfer sites. Ecolift uses algorithmic fleet telemetry and citizen recycling credits to reduce transit emissions and make municipal sanitation an efficient public utility.'
    },
    {
      icon: <Banknote className="w-6 h-6 text-[#006EAA]" />,
      sector: 'DIGITAL ECONOMY',
      platform: 'DevPay Africa',
      headline: 'Ending geographic financial penalties',
      statement: 'African engineers and creators should never be penalized by exorbitant foreign exchange spreads or delayed SWIFT wires when contracting globally. DevPay Africa establishes direct banking bridges that settle earnings into local accounts at fair market rates.'
    }
  ];

  return (
    <div className="pt-28 pb-36 px-6 sm:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto space-y-28">
        {/* Page Hero */}
        <div className="max-w-4xl space-y-6 border-b border-[#DDE8EC] pb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#006EAA] font-semibold">
            <Globe2 className="w-4 h-4" />
            <span>MEASURED VALUE CREATION</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#002F5B] tracking-tight">
            TECHNOLOGY SHOULD <br />
            <span className="braxvio-gradient-text">LEAVE SOMETHING BETTER.</span>
          </h1>

          <p className="text-xl sm:text-2xl text-[#687A86] leading-relaxed font-normal">
            We do not evaluate technology by speculative valuation multiples. We measure it by the practical friction it removes from everyday human life.
          </p>
        </div>

        {/* Impact Integrity Principle */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#F7FAFC] border border-[#DDE8EC] max-w-3xl space-y-3">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#006EAA]">
            OUR COMMITMENT TO TRANSPARENCY
          </div>
          <p className="text-sm sm:text-base text-[#06131D] leading-relaxed">
            Braxvio will never display fabricated user counters, vanity transaction numbers, or unverified environmental claims. As our platforms graduate through public beta and deployment milestones, all reported metrics will be backed by cryptographically auditable, third-party verified operational telemetry.
          </p>
        </div>

        {/* Four Sector Breakdowns */}
        <div className="space-y-12">
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest uppercase text-[#006EAA] font-semibold">
              SECTOR OBJECTIVES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002F5B] tracking-tight">
              Four Dimensions of Systemic Impact
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {impactDomains.map((domain) => (
              <div
                key={domain.sector}
                className="p-8 sm:p-10 rounded-3xl border border-[#DDE8EC] bg-white hover:border-[#11AFC1] shadow-sm hover:shadow-lg transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-[#F2FAFC] border border-[#DDE8EC]">
                    {domain.icon}
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#F7FAFC] border border-[#DDE8EC] text-[#002F5B]">
                    {domain.platform}
                  </span>
                </div>

                <div className="text-xs font-mono font-bold tracking-widest text-[#11AFC1] uppercase">
                  {domain.sector}
                </div>

                <h3 className="text-2xl font-bold text-[#002F5B]">
                  {domain.headline}
                </h3>

                <p className="text-sm sm:text-base text-[#687A86] leading-relaxed">
                  {domain.statement}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Partner */}
        <div className="rounded-3xl p-8 sm:p-12 bg-[#002F5B] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-bold text-white">
              Institutional Partnerships
            </h3>
            <p className="text-sm text-slate-300">
              Are you an NGO, university administrator, or municipal body looking to collaborate on verified public infrastructure?
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#11AFC1] to-[#42D6C5] text-[#002F5B] text-xs font-mono font-bold uppercase tracking-wider hover:opacity-95 shadow-md transition-all shrink-0"
          >
            Start a Conversation →
          </Link>
        </div>
      </div>
    </div>
  );
}
