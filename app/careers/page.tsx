'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Users, Briefcase, Mail, Loader2 } from 'lucide-react';

export default function CareersPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    discipline: 'Engineering',
    portfolio: '',
    linkedin: '',
    github: '',
    message: '',
    _hp_check: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedData, setSubmittedData] = useState<{ reference: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim() || !formData.location.trim()) {
      setErrorMessage('Please fill in all required fields (Name, Email, Location, Message).');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          location: formData.location.trim(),
          discipline: formData.discipline,
          portfolio: formData.portfolio.trim(),
          linkedin: formData.linkedin.trim(),
          github: formData.github.trim(),
          message: formData.message.trim(),
          _hp_check: formData._hp_check,
        }),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        const refCode = json.reference || ('BX-TLT-2026-' + Math.random().toString(36).substring(2, 8).toUpperCase());
        setSubmittedData({ reference: refCode });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setErrorMessage(json.error || 'Failed to submit talent application. Please try again.');
      }
    } catch {
      setErrorMessage('An unexpected connection error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
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
          <div className="space-y-4 border-b border-[#DDE8EC] pb-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#006EAA] font-semibold">
                EXPRESS INTEREST
              </span>
              <a
                href="mailto:admin@braxvio.com?subject=Braxvio%20Talent%20Inquiry"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#006EAA] hover:text-[#002F5B] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#006EAA]" />
                <span className="font-bold">admin@braxvio.com</span>
              </a>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-[#002F5B]">
                Join the Braxvio Talent Network
              </h3>
              <p className="text-xs text-[#687A86]">
                Submit your portfolio and background. Our engineering leads review candidate submissions directly through our secure email processing desk.
              </p>
            </div>

            {/* Direct Email Talent Desk Banner */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-[#002F5B]/5 border border-[#002F5B]/15">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#002F5B] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-[#002F5B] uppercase tracking-wider">
                    Official Talent Desk · Verified Email
                  </div>
                  <p className="text-xs text-[#687A86]">
                    Applications are processed via secure email pipeline and reviewed directly by Braxvio leadership.
                  </p>
                </div>
              </div>
              <a
                href="mailto:admin@braxvio.com?subject=Braxvio%20Talent%20Inquiry"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#002F5B] hover:bg-[#003E72] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-sm shrink-0"
              >
                <Mail className="w-3.5 h-3.5 text-white" />
                <span>admin@braxvio.com</span>
              </a>
            </div>
          </div>

          {submittedData ? (
            /* Post-submit confirmation screen */
            <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-[#F2FAFC] to-white border border-[#11AFC1]/30 text-center space-y-6">
              <div className="space-y-3 max-w-lg mx-auto">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002F5B] tracking-tight">
                  APPLICATION RECEIVED
                </h2>
                <p className="text-sm text-[#687A86] leading-relaxed">
                  Thank you for expressing your interest in joining the Braxvio Talent Network. Your profile has been submitted directly to our engineering leadership.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#DDE8EC] inline-block font-mono text-xs text-[#002F5B]">
                <span className="text-[#687A86]">Application Reference: </span>
                <span className="font-bold text-[#006EAA]">#{submittedData.reference}</span>
              </div>

              {/* Email Confirmation & Dispatch Card */}
              <div className="p-6 rounded-2xl bg-white border border-[#006EAA]/30 shadow-lg max-w-lg mx-auto space-y-4 text-center">
                <p className="text-sm font-semibold text-[#002F5B]">Email Confirmation Dispatched</p>
                <p className="text-xs sm:text-sm text-[#687A86] leading-relaxed">
                  An acknowledgment receipt and candidate reference <strong className="text-[#002F5B] font-mono">#{submittedData.reference}</strong> have been sent to <strong className="text-[#002F5B]">{formData.email}</strong>.
                </p>
                <div className="p-4 rounded-xl bg-[#F7FAFC] border border-[#DDE8EC] text-left text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#687A86] font-medium">To Candidate:</span>
                    <span className="text-[#002F5B] font-semibold">{formData.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#687A86] font-medium">Talent Review Desk:</span>
                    <span className="text-[#002F5B] font-semibold">admin@braxvio.com</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#687A86] font-medium">Expected Turnaround:</span>
                    <span className="text-emerald-700 font-bold">2–3 Business Days</span>
                  </div>
                </div>
                <a
                  href={`mailto:admin@braxvio.com?subject=Talent%20Application%20-%20Reference%20${submittedData.reference}`}
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#002F5B] hover:bg-[#003E72] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5 text-white" />
                  <span>Contact Talent Team via Email</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedData(null);
                    setFormData({
                      name: '',
                      email: '',
                      location: '',
                      discipline: 'Engineering',
                      portfolio: '',
                      linkedin: '',
                      github: '',
                      message: '',
                      _hp_check: '',
                    });
                  }}
                  className="px-6 py-3 rounded-xl bg-white border border-[#DDE8EC] text-[#002F5B] text-xs font-mono font-bold hover:bg-[#F7FAFC] transition-colors"
                >
                  SUBMIT ANOTHER PROFILE
                </button>
                <Link
                  href="/"
                  className="px-6 py-3 rounded-xl bg-[#002F5B] text-white text-xs font-mono font-bold hover:bg-[#003E72] transition-colors"
                >
                  RETURN TO BRAXVIO
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot field */}
              <input
                type="text"
                name="_hp_check"
                value={formData._hp_check}
                onChange={(e) => setFormData({ ...formData, _hp_check: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

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

              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl bg-[#002F5B] hover:bg-[#003E72] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>TRANSMITTING PROFILE...</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 text-white" />
                    <span>SUBMIT PROFILE VIA EMAIL →</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
