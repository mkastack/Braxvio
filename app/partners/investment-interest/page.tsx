'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Upload,
  Building,
  FileText,
  AlertCircle,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { BRAXVIO_PRODUCTS } from '@/data/ecosystem';
import {
  INVESTOR_TYPES,
  INDICATIVE_CAPITAL_RANGES,
  INVESTMENT_HORIZONS,
  INVESTMENT_AREAS,
  PartnershipDocument,
} from '@/data/partnerships';
import { trackPartnershipEvent } from '@/lib/analytics';
import { WhatsAppIcon, BRAXVIO_WHATSAPP_LINK } from '@/components/ui/WhatsAppIcon';

export default function InvestmentInterestPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ reference: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [documents, setDocuments] = useState<PartnershipDocument[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    investorType: 'Angel Investor',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    jobTitle: '',
    country: '',
    website: '',
    interestType: 'Braxvio Parent Company',
    productId: '',
    indicativeRange: '$50K–$250K',
    timeline: 'Exploring',
    message: '',
    consentAgreed: false,
    _hp_check: '', // Honeypot
  });

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackPartnershipEvent('investment_interest_started');
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('File size exceeds 10MB limit.');
      return;
    }

    setUploadingDoc(true);
    setErrorMessage('');

    try {
      const data = new FormData();
      data.append('file', file);
      data.append('inquiryType', 'INVESTMENT');

      const res = await fetch('/api/partnerships/upload', {
        method: 'POST',
        body: data,
      });

      const json = await res.json();
      if (res.ok && json.document) {
        setDocuments((prev) => [...prev, json.document]);
      } else {
        setErrorMessage(json.error || 'Failed to upload document');
      }
    } catch {
      setErrorMessage('Network error while uploading document.');
    } finally {
      setUploadingDoc(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.consentAgreed) {
      setErrorMessage('You must confirm the expression of interest agreement to submit.');
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/partnerships/investments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          documents,
        }),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setSubmittedData({ reference: json.reference });
        trackPartnershipEvent('investment_interest_submitted', { reference: json.reference });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setErrorMessage(json.error || 'Failed to submit expression of interest.');
      }
    } catch {
      setErrorMessage('An unexpected connection error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pt-24 pb-36 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto space-y-16">

        {/* Top Back Navigation */}
        <div>
          <Link
            href="/partners"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#687A86] hover:text-[#002F5B] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO PARTNERSHIPS HUB</span>
          </Link>
        </div>

        {/* ============================================================ */}
        {/* 11 — HERO SECTION */}
        {/* ============================================================ */}
        <div className="space-y-6 border-b border-[#DDE8EC] pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2FAFC] border border-[#11AFC1]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#11AFC1]" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#006EAA] font-bold">
              INVESTMENT DIALOGUE
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#002F5B] tracking-tight leading-[1.05]">
            CAPITAL FOR <br />
            <span className="braxvio-gradient-text">WHAT COMES NEXT.</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#687A86] leading-relaxed max-w-2xl font-normal">
            Interested in exploring future investment opportunities with Braxvio?
            Tell us about yourself or your organization and our team can determine
            whether there is a suitable basis for further discussion.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={scrollToForm}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#003E72] to-[#11AFC1] text-white text-xs font-mono font-bold tracking-wider uppercase hover:opacity-95 shadow-sm transition-all inline-flex items-center gap-2"
            >
              <span>EXPRESS INTEREST</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a
              href={BRAXVIO_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-sm inline-flex items-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>DIRECT WHATSAPP INQUIRY</span>
            </a>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 54 — PROMINENT FINANCIAL DISCLAIMER */}
        {/* ============================================================ */}
        <div className="p-5 rounded-2xl bg-[#F7FAFC] border border-[#DDE8EC] text-xs text-[#687A86] flex items-start gap-3 leading-relaxed">
          <Lock className="w-4 h-4 text-[#006EAA] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#002F5B] block font-mono uppercase text-[10px] tracking-wider mb-0.5">
              REGULATORY NOTICE & DISCLAIMER
            </span>
            Information on this page is provided for general informational purposes.
            Nothing on this page constitutes an offer to sell, or a solicitation of an
            offer to purchase, securities or any other financial instrument. Submitting
            an expression of interest does not create an investment agreement or
            commitment.
          </div>
        </div>

        {/* ============================================================ */}
        {/* 12 — WHY BRAXVIO (FACTUAL INFORMATION ONLY) */}
        {/* ============================================================ */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[#006EAA] font-bold">
              THE BRAXVIO THESIS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#002F5B]">
              Why Braxvio
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-[#DDE8EC] bg-[#F7FAFC] space-y-2">
              <span className="text-xs font-mono font-bold text-[#11AFC1]">01 / SYSTEM ARCHITECTURE</span>
              <h3 className="text-lg font-bold text-[#002F5B]">Multi-Product Approach</h3>
              <p className="text-xs text-[#687A86] leading-relaxed">
                Rather than isolated consumer apps, Braxvio develops interconnected platforms across education, healthcare, logistics, and labor rails that share unified cryptographic identity and banking infrastructure.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-[#DDE8EC] bg-[#F7FAFC] space-y-2">
              <span className="text-xs font-mono font-bold text-[#11AFC1]">02 / GEOGRAPHIC ADVANTAGE</span>
              <h3 className="text-lg font-bold text-[#002F5B]">African-Born Perspective</h3>
              <p className="text-xs text-[#687A86] leading-relaxed">
                Founded in Accra, Ghana, building for high-growth emerging economies with internationally benchmarked software standards, zero bloat, and global export ambition.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-[#DDE8EC] bg-[#F7FAFC] space-y-2">
              <span className="text-xs font-mono font-bold text-[#11AFC1]">03 / EMPIRICAL CRAFT</span>
              <h3 className="text-lg font-bold text-[#002F5B]">Product Development</h3>
              <p className="text-xs text-[#687A86] leading-relaxed">
                Engineering strictly grounded in concrete human bottlenecks: students seeking safe housing, patients locating authenticated medicines, cities routing municipal waste, and engineers contracting across borders.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-[#DDE8EC] bg-[#F7FAFC] space-y-2">
              <span className="text-xs font-mono font-bold text-[#11AFC1]">04 / SUSTAINABLE HORIZON</span>
              <h3 className="text-lg font-bold text-[#002F5B]">Long-Term Thinking</h3>
              <p className="text-xs text-[#687A86] leading-relaxed">
                A disciplined focus on enduring unit economics, institutional governance, and durable technology utility over short-term vanity hype or speculative trends.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 13–21 — MULTI-STEP INVESTMENT INTEREST FORM */}
        {/* ============================================================ */}
        <div ref={formRef} className="pt-4">
          {submittedData ? (
            /* Submission Success Screen (Item 21) */
            <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-[#F2FAFC] to-white border border-[#11AFC1]/30 shadow-xl text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-3 max-w-lg mx-auto">
                <span className="text-xs font-mono uppercase tracking-widest text-[#006EAA] font-bold">
                  EXPRESSION RECORDED
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#002F5B] tracking-tight">
                  THANK YOU FOR YOUR INTEREST IN BRAXVIO.
                </h2>
                <p className="text-sm text-[#687A86] leading-relaxed">
                  We&apos;ve received your information. If there appears to be a relevant opportunity
                  for discussion, a member of the Braxvio team may contact you.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#DDE8EC] inline-block font-mono text-xs text-[#002F5B]">
                <span className="text-[#687A86]">Reference Code: </span>
                <span className="font-bold text-[#006EAA]">{submittedData.reference}</span>
              </div>

              {/* Direct WhatsApp Investor Dialogue Card */}
              <div className="p-5 rounded-2xl bg-white border border-[#25D366]/40 shadow-sm max-w-lg mx-auto space-y-3 text-center">
                <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-[#002F5B] uppercase tracking-wider">
                  <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
                  <span>Direct WhatsApp Investor Desk</span>
                </div>
                <p className="text-xs text-[#687A86] leading-relaxed">
                  For immediate, confidential follow-up with executive leadership, message us on WhatsApp with reference <strong className="text-[#002F5B] font-mono">#{submittedData.reference}</strong>.
                </p>
                <a
                  href={`${BRAXVIO_WHATSAPP_LINK}?text=${encodeURIComponent(
                    `Hello Braxvio Executive Team,\n\nI submitted an investment expression of interest.\nName: ${formData.firstName} ${formData.lastName}\nOrganization: ${formData.organization || 'Individual'}\nReference: ${submittedData.reference}\nInterest: ${formData.interestType}\n\nI would like to initiate direct discussion.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-sm"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>Connect with Founders on WhatsApp</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href="/"
                  className="px-6 py-3 rounded-xl bg-[#002F5B] text-white text-xs font-mono font-bold hover:bg-[#003E72] transition-colors"
                >
                  RETURN TO BRAXVIO
                </Link>
                <Link
                  href="/products"
                  className="px-6 py-3 rounded-xl bg-white border border-[#DDE8EC] text-[#002F5B] text-xs font-mono font-bold hover:bg-[#F7FAFC] transition-colors"
                >
                  EXPLORE OUR PRODUCTS
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-12 rounded-3xl border border-[#DDE8EC] bg-[#F7FAFC] shadow-lg space-y-8">
              {/* Form Step Indicator */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#687A86]">
                  <span className="text-[#006EAA] font-bold">STEP {currentStep} OF 4</span>
                  <span>
                    {currentStep === 1 && 'WHO YOU ARE'}
                    {currentStep === 2 && 'YOUR CONTACT DETAILS'}
                    {currentStep === 3 && 'AREA OF INTEREST & RANGE'}
                    {currentStep === 4 && 'PROPOSAL & CONSENT'}
                  </span>
                </div>
                <div className="w-full bg-[#DDE8EC] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#003E72] via-[#006EAA] to-[#11AFC1] h-full transition-all duration-300"
                    style={{ width: `${(currentStep / 4) * 100}%` }}
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Hidden Honeypot Field */}
                <input
                  type="text"
                  name="_hp_check"
                  value={formData._hp_check}
                  onChange={(e) => setFormData({ ...formData, _hp_check: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* STEP 1: WHO ARE YOU */}
                {currentStep === 1 && (
                  <div className="space-y-5 animate-fade-in-scale">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-[#002F5B]">
                        Who are you or your organization?
                      </h3>
                      <p className="text-xs text-[#687A86]">
                        Select the profile that best characterizes your investment activity.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {INVESTOR_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, investorType: type })}
                          className={`p-4 rounded-xl text-left text-xs font-mono transition-all border ${
                            formData.investorType === type
                              ? 'bg-[#002F5B] text-white border-[#002F5B] shadow-sm font-bold'
                              : 'bg-white border-[#DDE8EC] text-[#3D5066] hover:border-[#11AFC1]'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="px-6 py-3 rounded-xl bg-[#002F5B] text-white text-xs font-mono font-bold hover:bg-[#003E72] transition-colors inline-flex items-center gap-2"
                      >
                        <span>NEXT: DETAILS</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: INVESTOR DETAILS */}
                {currentStep === 2 && (
                  <div className="space-y-5 animate-fade-in-scale">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-[#002F5B]">
                        Contact Details
                      </h3>
                      <p className="text-xs text-[#687A86]">
                        Provide your primary business and communication credentials.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-[#06131D] font-medium">FIRST NAME *</label>
                        <input
                          required
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                          placeholder="e.g. Ama"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-[#06131D] font-medium">LAST NAME *</label>
                        <input
                          required
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                          placeholder="e.g. Mensah"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-[#06131D] font-medium">BUSINESS EMAIL *</label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                          placeholder="name@fund or firm.com"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-[#06131D] font-medium">PHONE (OPTIONAL)</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                          placeholder="+233 ... or +1 ..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-[#06131D] font-medium">ORGANIZATION / FIRM</label>
                        <input
                          type="text"
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                          placeholder="e.g. Horizon Partners"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-[#06131D] font-medium">JOB TITLE</label>
                        <input
                          type="text"
                          value={formData.jobTitle}
                          onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                          placeholder="Managing Partner"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-[#06131D] font-medium">COUNTRY *</label>
                        <input
                          required
                          type="text"
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                          placeholder="Ghana, UK, US, Nigeria..."
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#06131D] font-medium">WEBSITE OR LINKEDIN (OPTIONAL)</label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                        placeholder="https://..."
                      />
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="px-5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs font-mono text-[#687A86] hover:text-[#002F5B]"
                      >
                        ← Back
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (!formData.firstName || !formData.lastName || !formData.email) {
                            setErrorMessage('Please fill in First Name, Last Name, and Work Email.');
                            return;
                          }
                          setErrorMessage('');
                          setCurrentStep(3);
                        }}
                        className="px-6 py-3 rounded-xl bg-[#002F5B] text-white text-xs font-mono font-bold hover:bg-[#003E72] transition-colors inline-flex items-center gap-2"
                      >
                        <span>NEXT: AREA OF INTEREST</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: AREA OF INTEREST & INDICATIVE RANGE */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-fade-in-scale">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-[#002F5B]">
                        Area of Interest & Capacity
                      </h3>
                      <p className="text-xs text-[#687A86]">
                        Indicative parameters to help route your inquiry appropriately.
                      </p>
                    </div>

                    {/* What are you interested in */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-[#06131D] font-medium">WHAT ARE YOU INTERESTED IN?</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {INVESTMENT_AREAS.map((area) => (
                          <button
                            key={area}
                            type="button"
                            onClick={() => setFormData({ ...formData, interestType: area })}
                            className={`p-3 rounded-xl text-left text-xs font-mono transition-all border ${
                              formData.interestType === area
                                ? 'bg-[#002F5B] text-white border-[#002F5B] font-bold'
                                : 'bg-white border-[#DDE8EC] text-[#3D5066] hover:border-[#11AFC1]'
                            }`}
                          >
                            {area}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dynamic Product Selector if Specific Product */}
                    {formData.interestType === 'Specific Braxvio Product' && (
                      <div className="space-y-1.5 p-4 rounded-xl bg-white border border-[#11AFC1]/40">
                        <label className="text-xs font-mono text-[#006EAA] font-bold">SELECT PRODUCT</label>
                        <select
                          value={formData.productId}
                          onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                        >
                          <option value="">Select a Braxvio product...</option>
                          {BRAXVIO_PRODUCTS.map((prod) => (
                            <option key={prod.id} value={prod.id}>
                              {prod.name} — {prod.category}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Indicative Range */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono text-[#06131D] font-medium">INDICATIVE CAPITAL RANGE</label>
                        <span className="text-[10px] font-mono text-[#687A86]">(Indication only, not an offer)</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {INDICATIVE_CAPITAL_RANGES.map((range) => (
                          <button
                            key={range}
                            type="button"
                            onClick={() => setFormData({ ...formData, indicativeRange: range })}
                            className={`py-2 px-3 rounded-xl text-xs font-mono transition-all border text-center ${
                              formData.indicativeRange === range
                                ? 'bg-[#002F5B] text-white border-[#002F5B] font-bold'
                                : 'bg-white border-[#DDE8EC] text-[#3D5066] hover:border-[#11AFC1]'
                            }`}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Investment Horizon */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-[#06131D] font-medium">INVESTMENT HORIZON</label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {INVESTMENT_HORIZONS.map((hz) => (
                          <button
                            key={hz}
                            type="button"
                            onClick={() => setFormData({ ...formData, timeline: hz })}
                            className={`py-2 px-2.5 rounded-xl text-[11px] font-mono transition-all border text-center ${
                              formData.timeline === hz
                                ? 'bg-[#002F5B] text-white border-[#002F5B] font-bold'
                                : 'bg-white border-[#DDE8EC] text-[#3D5066] hover:border-[#11AFC1]'
                            }`}
                          >
                            {hz}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="px-5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs font-mono text-[#687A86] hover:text-[#002F5B]"
                      >
                        ← Back
                      </button>

                      <button
                        type="button"
                        onClick={() => setCurrentStep(4)}
                        className="px-6 py-3 rounded-xl bg-[#002F5B] text-white text-xs font-mono font-bold hover:bg-[#003E72] transition-colors inline-flex items-center gap-2"
                      >
                        <span>NEXT: MESSAGE & CONSENT</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: MESSAGE, DOCUMENTS & CONSENT */}
                {currentStep === 4 && (
                  <div className="space-y-6 animate-fade-in-scale">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-[#002F5B]">
                        Message & Verification
                      </h3>
                      <p className="text-xs text-[#687A86]">
                        Share the context of your interest and upload any optional introductory material.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#06131D] font-medium">TELL US ABOUT YOUR INTEREST *</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                        placeholder="What interests you about Braxvio, and what kind of opportunity would you like to discuss?"
                      />
                    </div>

                    {/* Optional Document Upload (Item 19) */}
                    <div className="space-y-2 p-4 rounded-2xl bg-white border border-[#DDE8EC]">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[#06131D] font-medium">OPTIONAL SUPPORTING DOCUMENT</span>
                        <span className="text-[#687A86]">PDF or DOCX (Max 10MB)</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <label className="cursor-pointer px-4 py-2 rounded-xl bg-[#F7FAFC] border border-[#DDE8EC] text-xs font-mono text-[#002F5B] hover:border-[#11AFC1] transition-all flex items-center gap-2">
                          <Upload className="w-3.5 h-3.5 text-[#11AFC1]" />
                          <span>{uploadingDoc ? 'Uploading...' : 'Upload Document'}</span>
                          <input
                            type="file"
                            accept=".pdf,.docx,.doc"
                            className="hidden"
                            onChange={handleFileUpload}
                            disabled={uploadingDoc}
                          />
                        </label>

                        {documents.length > 0 && (
                          <span className="text-xs font-mono text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{documents.map((d) => d.fileName).join(', ')}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Mandatory Consent Checkbox (Item 20) */}
                    <div className="p-4 rounded-2xl bg-[#F2FAFC] border border-[#11AFC1]/30 space-y-3">
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          required
                          checked={formData.consentAgreed}
                          onChange={(e) => setFormData({ ...formData, consentAgreed: e.target.checked })}
                          className="mt-1 w-4 h-4 rounded text-[#006EAA] focus:ring-0"
                        />
                        <span className="text-xs text-[#06131D] leading-relaxed">
                          <strong>Required:</strong> I understand that submitting this form is an expression of interest and does not constitute an offer, commitment or agreement to invest.
                        </span>
                      </label>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="px-5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs font-mono text-[#687A86] hover:text-[#002F5B]"
                      >
                        ← Back
                      </button>

                      <button
                        type="submit"
                        disabled={submitting || !formData.consentAgreed}
                        className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#003E72] via-[#006EAA] to-[#11AFC1] text-white text-xs font-mono font-bold tracking-wider uppercase hover:opacity-95 shadow-md transition-all disabled:opacity-50 inline-flex items-center gap-2"
                      >
                        <span>{submitting ? 'RECORDING...' : 'EXPRESS INTEREST'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Direct WhatsApp Channel for Investors */}
                    <div className="pt-4 border-t border-[#DDE8EC] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                      <span className="text-[#687A86] font-mono text-center sm:text-left">
                        Prefer confidential direct dialogue with Braxvio leadership?
                      </span>
                      <a
                        href={`${BRAXVIO_WHATSAPP_LINK}?text=${encodeURIComponent(
                          `Hello Braxvio Team,\n\nI am interested in learning more about investment opportunities with Braxvio (${formData.interestType}).\nName: ${formData.firstName || ''} ${formData.lastName || ''}\nOrganization: ${formData.organization || 'Individual'}\n\nLooking forward to a confidential conversation.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#25D366] text-[#128C7E] hover:bg-[#25D366]/10 font-mono text-xs font-bold transition-all shrink-0"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
                        <span>Discuss via WhatsApp</span>
                      </a>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
