'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, Phone, MapPin, Building, MessageSquare, ArrowRight } from 'lucide-react';
import { COMPANY_FACTS } from '@/data/ecosystem';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState('Partnerships');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
                <li className="flex items-center justify-between p-3 rounded-xl bg-[#F7FAFC] border border-[#DDE8EC]">
                  <span className="text-[#687A86]">PARTNERSHIPS:</span>
                  <span className="font-bold">partnerships@braxvio.com</span>
                </li>
                <li className="flex items-center justify-between p-3 rounded-xl bg-[#F7FAFC] border border-[#DDE8EC]">
                  <span className="text-[#687A86]">PRESS & MEDIA:</span>
                  <span className="font-bold">press@braxvio.com</span>
                </li>
                <li className="flex items-center justify-between p-3 rounded-xl bg-[#F7FAFC] border border-[#DDE8EC]">
                  <span className="text-[#687A86]">GENERAL:</span>
                  <span className="font-bold">hello@braxvio.com</span>
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

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-900">Message Dispatched</h3>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  Thank you for reaching out. Your inquiry has been routed to the {category} team. We will review and respond promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
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

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#002F5B] hover:bg-[#003E72] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-md"
                >
                  Transmit Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
