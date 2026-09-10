'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Users, Briefcase, Sparkles } from 'lucide-react';

export default function CareersPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    discipline: 'Engineering',
    portfolio: '',
    linkedin: '',
    github: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const culturePillars = [
    {
      number: '01',
      title: 'Extreme Craft & Rigor',
      description: 'We care about the invisible details: database query plans, typography leading, cache invalidation, and edge-case fault recovery.'
    },
    {
      number: '02',
      title: 'Radical Ownership',
      description: 'You will never encounter layers of bureaucracy. Engineers, designers, and operators own problem domains from initial field research to production telemetry.'
    },
    {
      number: '03',
      title: 'Curiosity over Dogma',
      description: 'We test our assumptions in real Ghanaian and African marketplaces. When empirical reality contradicts software theory, reality wins.'
    },
    {
      number: '04',
      title: 'Human Responsibility',
      description: 'Our software touches healthcare dispensing and student livelihood. We take privacy, security, and algorithmic fairness seriously.'
    }
  ];

  return (
    <div className="pt-28 pb-36 px-6 sm:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto space-y-28">
        {/* Page Hero */}
        <div className="max-w-4xl space-y-6 border-b border-[#DDE8EC] pb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#006EAA] font-semibold">
            <Users className="w-4 h-4" />
            <span>CAREERS & CULTURE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#002F5B] tracking-tight">
            BUILD WHAT <br />
            <span className="braxvio-gradient-text">SHOULD EXIST.</span>
          </h1>

          <p className="text-xl sm:text-2xl text-[#687A86] leading-relaxed font-normal">
            Join engineers, researchers, and systems thinkers building technology designed around meaningful human problems.
          </p>
        </div>

        {/* Culture Section */}
        <div className="space-y-12">
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest uppercase text-[#006EAA] font-semibold">
              OUR WORK CULTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002F5B] tracking-tight">
              Principles of our Workspace
            </h2>
            <p className="text-sm text-[#687A86] max-w-xl">
              We do not promote corporate clichés. We optimize for autonomy, craftsmanship, deep work, and long-term societal impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {culturePillars.map((pillar) => (
              <div
                key={pillar.number}
                className="p-8 rounded-2xl border border-[#DDE8EC] bg-[#F7FAFC] space-y-3"
              >
                <div className="text-xs font-mono font-bold text-[#11AFC1]">
                  DISCIPLINE {pillar.number}
                </div>
                <h3 className="text-xl font-bold text-[#002F5B]">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#687A86] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions / Authentic Transparency */}
        <div className="rounded-3xl p-10 sm:p-14 bg-[#F2FAFC] border border-[#11AFC1]/30 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#006EAA] font-semibold">
            <Briefcase className="w-4 h-4" />
            <span>ROLE STATUS / AUTHENTIC TRANSPARENCY</span>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold text-[#002F5B] tracking-tight">
              NO OPEN ROLES RIGHT NOW.
            </h2>
            <p className="text-sm sm:text-base text-[#687A86] max-w-2xl leading-relaxed">
              We do not fabricate job postings to artificially inflate company size. However, we are always eager to meet disciplined engineers, systems designers, and domain specialists who care deeply about technological craft.
            </p>
          </div>
        </div>

        {/* Join Talent Network Interactive Form */}
        <div className="rounded-3xl p-8 sm:p-12 border border-[#DDE8EC] bg-white shadow-xl max-w-3xl mx-auto space-y-8">
          <div className="space-y-2 border-b border-[#DDE8EC] pb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#006EAA] font-semibold">
              EXPRESS INTEREST
            </span>
            <h3 className="text-2xl font-bold text-[#002F5B]">
              Join the Braxvio Talent Network
            </h3>
            <p className="text-xs text-[#687A86]">
              Submit your portfolio and links. Our engineering leads review submissions directly.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-lg font-bold text-emerald-900">Submission Received</h4>
              <p className="text-xs text-emerald-700 max-w-md mx-auto">
                Thank you for your interest in Braxvio. Your profile has been logged in our talent archive. If a matching architectural need emerges, we will reach out directly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#06131D] font-medium">FULL NAME *</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#DDE8EC] text-xs focus:border-[#11AFC1] outline-none"
                    placeholder="e.g. Kwame Mensah"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#06131D] font-medium">EMAIL ADDRESS *</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#DDE8EC] text-xs focus:border-[#11AFC1] outline-none"
                    placeholder="kwame@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#06131D] font-medium">LOCATION *</label>
                  <input
                    required
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#DDE8EC] text-xs focus:border-[#11AFC1] outline-none"
                    placeholder="e.g. Accra, Ghana or Remote"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#06131D] font-medium">PRIMARY DISCIPLINE *</label>
                  <select
                    value={formData.discipline}
                    onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#DDE8EC] text-xs focus:border-[#11AFC1] outline-none bg-white"
                  >
                    <option value="Engineering">Software Systems & Engineering</option>
                    <option value="Product">Product Architecture & Design</option>
                    <option value="Healthcare">Health Informatics & Regulatory</option>
                    <option value="Operations">Logistics & Field Operations</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#06131D] font-medium">PORTFOLIO / WEBSITE</label>
                  <input
                    type="url"
                    value={formData.portfolio}
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#DDE8EC] text-xs focus:border-[#11AFC1] outline-none"
                    placeholder="https://"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#06131D] font-medium">LINKEDIN</label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#DDE8EC] text-xs focus:border-[#11AFC1] outline-none"
                    placeholder="https://linkedin.com/in/"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#06131D] font-medium">GITHUB</label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#DDE8EC] text-xs focus:border-[#11AFC1] outline-none"
                    placeholder="https://github.com/"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#06131D] font-medium">MESSAGE / WHAT WOULD YOU LIKE TO BUILD? *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDE8EC] text-xs focus:border-[#11AFC1] outline-none"
                  placeholder="Tell us about the problems you are drawn to and past systems you have engineered..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#002F5B] hover:bg-[#003E72] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-md"
              >
                Submit to Talent Network →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
