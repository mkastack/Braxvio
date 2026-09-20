'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, MapPin, Loader2 } from 'lucide-react';
import { COMPANY_FACTS } from '@/data/ecosystem';

export default function ContactPage() {
  const [category, setCategory] = useState('Partnerships');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: '',
    message: '',
    _hp_check: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedData, setSubmittedData] = useState<{ reference: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields (Name, Work Email, Subject, Message).');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          organization: formData.organization.trim(),
          category,
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          _hp_check: formData._hp_check,
        }),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        const refCode = json.reference || ('BX-CNT-2026-' + Math.random().toString(36).substring(2, 8).toUpperCase());
        setSubmittedData({ reference: refCode });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setErrorMessage(json.error || 'Failed to transmit inquiry. Please try again.');
      }
    } catch {
      setErrorMessage('An unexpected connection error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-36 px-6 sm:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Page Hero */}
        <div className="max-w-4xl space-y-6 border-b border-[#DDE8EC] pb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#006EAA] font-semibold">
            <Mail className="w-4 h-4" />
            <span>COMMUNICATION CHANNELS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#002F5B] tracking-tight">
            LET&apos;S BUILD THE FUTURE <br />
            <span className="braxvio-gradient-text">THOUGHTFULLY.</span>
          </h1>

          <p className="text-xl sm:text-2xl text-[#687A86] leading-relaxed font-normal">
            Whether exploring ecosystem partnerships, press inquiries, or institutional collaboration, our team is at your disposal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details & Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#006EAA] font-semibold">
                HEADQUARTERS
              </span>
              <div className="space-y-2 text-sm text-[#06131D]">
                <div className="font-bold text-lg text-[#002F5B]">{COMPANY_FACTS.name}</div>
                <div className="flex items-center gap-2 text-[#687A86]">
                  <MapPin className="w-4 h-4 text-[#11AFC1]" />
                  <span>Accra, Greater Accra Region, Ghana</span>
                </div>
                <div className="text-xs font-mono text-[#687A86] pt-1">
                  Latitude: 5.6037° N • Longitude: 0.1870° W
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t border-[#DDE8EC] pt-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#006EAA] font-semibold">
                DIRECT INBOXES
              </span>
              <ul className="space-y-3 text-xs font-mono text-[#002F5B]">
                <li>
                  <a
                    href="mailto:partnerships@braxvio.com"
                    className="flex items-center justify-between p-3 rounded-xl bg-[#F7FAFC] border border-[#DDE8EC] hover:border-[#11AFC1] transition-colors"
                  >
                    <span className="text-[#687A86]">PARTNERSHIPS:</span>
                    <span className="font-bold text-[#002F5B]">partnerships@braxvio.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:press@braxvio.com"
                    className="flex items-center justify-between p-3 rounded-xl bg-[#F7FAFC] border border-[#DDE8EC] hover:border-[#11AFC1] transition-colors"
                  >
                    <span className="text-[#687A86]">PRESS & MEDIA:</span>
                    <span className="font-bold text-[#002F5B]">press@braxvio.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@braxvio.com"
                    className="flex items-center justify-between p-3 rounded-xl bg-[#F7FAFC] border border-[#DDE8EC] hover:border-[#11AFC1] transition-colors"
                  >
                    <span className="text-[#687A86]">GENERAL:</span>
                    <span className="font-bold text-[#002F5B]">hello@braxvio.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:admin@braxvio.com"
                    className="flex items-center justify-between p-3 rounded-xl bg-[#002F5B]/5 border border-[#002F5B]/20 hover:border-[#002F5B] transition-colors"
                  >
                    <span className="text-[#002F5B] font-semibold">VERIFIED DESK:</span>
                    <span className="font-bold text-[#002F5B]">admin@braxvio.com</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Dynamic Category Contact Form */}
          <div className="lg:col-span-7 rounded-3xl p-8 sm:p-12 border border-[#DDE8EC] bg-[#F7FAFC] shadow-lg space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#006EAA] font-semibold">
                SEND AN INQUIRY
              </span>
              <h2 className="text-2xl font-bold text-[#002F5B]">
                Start a Conversation
              </h2>
            </div>

            {/* Direct Email Contact Desk Banner */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#002F5B]/15">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#002F5B] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-[#002F5B] uppercase tracking-wider">
                    Official Communications Desk · Verified Email
                  </div>
                  <p className="text-xs text-[#687A86]">
                    Inquiries are processed via secure email pipeline and reviewed directly by Braxvio leadership.
                  </p>
                </div>
              </div>
              <a
                href="mailto:admin@braxvio.com?subject=Braxvio%20Direct%20Inquiry"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#002F5B] hover:bg-[#003E72] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-sm shrink-0"
              >
                <Mail className="w-3.5 h-3.5 text-white" />
                <span>admin@braxvio.com</span>
              </a>
            </div>

            {submittedData ? (
              /* Success Screen */
              <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-[#F2FAFC] to-white border border-[#11AFC1]/30 text-center space-y-6">
                <div className="space-y-3 max-w-lg mx-auto">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002F5B] tracking-tight">
                    MESSAGE DISPATCHED
                  </h2>
                  <p className="text-sm text-[#687A86] leading-relaxed">
                    Thank you for reaching out. Your inquiry has been routed to our communications desk and queued for leadership review.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DDE8EC] inline-block font-mono text-xs text-[#002F5B]">
                  <span className="text-[#687A86]">Inquiry Reference: </span>
                  <span className="font-bold text-[#006EAA]">#{submittedData.reference}</span>
                </div>

                {/* Email Confirmation & Dispatch Card */}
                <div className="p-6 rounded-2xl bg-white border border-[#006EAA]/30 shadow-lg max-w-lg mx-auto space-y-4 text-center">
                  <p className="text-sm font-semibold text-[#002F5B]">Email Confirmation Dispatched</p>
                  <p className="text-xs sm:text-sm text-[#687A86] leading-relaxed">
                    An acknowledgment receipt and tracking reference <strong className="text-[#002F5B] font-mono">#{submittedData.reference}</strong> have been sent to <strong className="text-[#002F5B]">{formData.email}</strong>.
                  </p>
                  <div className="p-4 rounded-xl bg-[#F7FAFC] border border-[#DDE8EC] text-left text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[#687A86] font-medium">To Sender:</span>
                      <span className="text-[#002F5B] font-semibold">{formData.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#687A86] font-medium">Category:</span>
                      <span className="text-[#002F5B] font-semibold">{category}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#687A86] font-medium">Communications Desk:</span>
                      <span className="text-[#002F5B] font-semibold">admin@braxvio.com</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#687A86] font-medium">Expected Response:</span>
                      <span className="text-emerald-700 font-bold">2–3 Business Days</span>
                    </div>
                  </div>
                  <a
                    href={`mailto:admin@braxvio.com?subject=Inquiry%20Update%20-%20Reference%20${submittedData.reference}`}
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#002F5B] hover:bg-[#003E72] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-sm"
                  >
                    <Mail className="w-3.5 h-3.5 text-white" />
                    <span>Contact Communications Desk via Email</span>
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
                        organization: '',
                        subject: '',
                        message: '',
                        _hp_check: '',
                      });
                    }}
                    className="px-6 py-3 rounded-xl bg-white border border-[#DDE8EC] text-[#002F5B] text-xs font-mono font-bold hover:bg-[#F7FAFC] transition-colors"
                  >
                    SEND ANOTHER INQUIRY
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

                {/* Category Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-[#06131D] font-medium">INQUIRY CATEGORY</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['Partnerships', 'General', 'Press', 'Product Support'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-mono transition-all text-center ${
                          category === cat
                            ? 'bg-[#002F5B] text-white font-bold shadow-xs'
                            : 'bg-white border border-[#DDE8EC] text-[#687A86] hover:text-[#002F5B]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#06131D] font-medium">YOUR NAME *</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                      placeholder="e.g. Dr. Ama Serwaa"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#06131D] font-medium">WORK EMAIL *</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                      placeholder="ama@organization.org"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#06131D] font-medium">ORGANIZATION / INSTITUTION</label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                      placeholder="University, Hospital, Municipal Body..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#06131D] font-medium">SUBJECT *</label>
                    <input
                      required
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                      placeholder="Regarding ecosystem collaboration"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#06131D] font-medium">MESSAGE *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                    placeholder="Provide context regarding your inquiry or technical requirements..."
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
                      <span>TRANSMITTING MESSAGE...</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 text-white" />
                      <span>TRANSMIT MESSAGE VIA EMAIL →</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
