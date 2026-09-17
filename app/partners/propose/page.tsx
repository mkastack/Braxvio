'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Upload,
  AlertCircle,
  Building2,
  Sparkles,
  Layers,
} from 'lucide-react';
import { BRAXVIO_PRODUCTS } from '@/data/ecosystem';
import {
  CONTRIBUTION_TYPES,
  PartnershipDocument,
} from '@/data/partnerships';
import { trackPartnershipEvent } from '@/lib/analytics';
import { WhatsAppIcon, BRAXVIO_WHATSAPP_LINK, getWhatsAppSendUrl } from '@/components/ui/WhatsAppIcon';

const PARTNERSHIP_TYPES = [
  'Strategic Partnership',
  'Product Partnership',
  'Technology Partnership',
  'Institutional Partnership',
  'Distribution Partnership',
  'Research Partnership',
  'Media Partnership',
  'Sponsorship',
  'Other',
];

function ProposeFormContent() {
  const searchParams = useSearchParams();
  const initialTarget = searchParams.get('target') || 'braxvio-parent';
  const initialType = searchParams.get('type') || 'Strategic Partnership';

  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ reference: string } | null>(null);
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [documents, setDocuments] = useState<PartnershipDocument[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    type: initialType.includes('technology')
      ? 'Technology Partnership'
      : initialType.includes('institutional')
      ? 'Institutional Partnership'
      : initialType.includes('distribution')
      ? 'Distribution Partnership'
      : 'Strategic Partnership',
    organization: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    country: '',
    industry: '',
    organizationType: 'Corporation',
    targetProductId: initialTarget,
    proposalTitle: '',
    proposal: '',
    organizationContribution: '',
    braxvioContribution: '',
    targetMarket: '',
    timeline: '3–6 months',
    contributionTypes: [] as string[],
    _hp_check: '',
  });

  useEffect(() => {
    trackPartnershipEvent('partnership_started');
  }, []);

  const toggleContribution = (type: string) => {
    setFormData((prev) => {
      const exists = prev.contributionTypes.includes(type);
      return {
        ...prev,
        contributionTypes: exists
          ? prev.contributionTypes.filter((t) => t !== type)
          : [...prev.contributionTypes, type],
      };
    });
  };

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
      data.append('inquiryType', 'PARTNERSHIP');

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

    if (
      !formData.organization ||
      !formData.contactName ||
      !formData.email ||
      !formData.proposalTitle ||
      !formData.proposal
    ) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/partnerships/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          documents,
        }),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        const refCode = json.reference || 'PRT-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        setSubmittedData({ reference: refCode });
        trackPartnershipEvent('partnership_submitted', { reference: refCode });
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const targetProduct = BRAXVIO_PRODUCTS.find((p) => p.id === formData.targetProductId)?.name || 'Braxvio Parent Company';
        const partnerMessage = [
          '🤝 New Braxvio Partnership Proposal',
          '──────────────────────────────',
          `Reference: ${refCode}`,
          `Organization: ${formData.organization}`,
          `Contact Person: ${formData.contactName}`,
          `Email: ${formData.email}`,
          `Phone: ${formData.phone || 'Not provided'}`,
          `Country: ${formData.country || 'Not provided'}`,
          `Industry: ${formData.industry || 'Not provided'}`,
          `Partnership Discipline: ${formData.type}`,
          `Target: ${targetProduct}`,
          `Proposal Title: ${formData.proposalTitle}`,
          `Timeline: ${formData.timeline}`,
          '──────────────────────────────',
          'Proposal Summary:',
          formData.proposal,
          formData.organizationContribution ? `\nPartner Contribution: ${formData.organizationContribution}` : '',
          formData.braxvioContribution ? `\nBraxvio Role: ${formData.braxvioContribution}` : '',
        ].filter(Boolean).join('\n');

        const waUrl = getWhatsAppSendUrl(partnerMessage);
        setWhatsappRedirectUrl(waUrl);

        if (typeof navigator !== 'undefined' && navigator.clipboard) {
          navigator.clipboard.writeText(partnerMessage).catch(() => {});
        }

        // Reliably forward to WhatsApp
        if (typeof window !== 'undefined') {
          setTimeout(() => {
            window.location.href = waUrl;
          }, 400);
        }
      } else {
        setErrorMessage(json.error || 'Failed to submit partnership proposal.');
      }
    } catch {
      setErrorMessage('An unexpected connection error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
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

      {/* Hero Header */}
      <div className="space-y-4 border-b border-[#DDE8EC] pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2FAFC] border border-[#11AFC1]/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#11AFC1]" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#006EAA] font-bold">
            COLLABORATION PROPOSAL
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#002F5B] tracking-tight">
          LET&apos;S BUILD <br />
          <span className="braxvio-gradient-text">TOGETHER.</span>
        </h1>

        <p className="text-base sm:text-lg text-[#687A86] leading-relaxed max-w-2xl font-normal">
          Propose a strategic alliance, technical integration, distribution channel,
          or institutional deployment with Braxvio or an ecosystem product.
        </p>

        {/* Direct WhatsApp Partnerships Hotline */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
              <WhatsAppIcon className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-[#002F5B] uppercase tracking-wider flex items-center gap-2">
                <span>Direct Partnerships Line</span>
                <span className="px-2 py-0.5 rounded-full bg-[#25D366]/20 text-[#128C7E] text-[10px] font-bold">WHATSAPP</span>
              </div>
              <p className="text-xs text-[#687A86]">
                Prefer real-time dialogue with our leadership? Connect directly on WhatsApp.
              </p>
            </div>
          </div>
          <a
            href={BRAXVIO_WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-sm shrink-0"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      {submittedData ? (
        /* Success Screen */
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-[#F2FAFC] to-white border border-[#11AFC1]/30 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-3 max-w-lg mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-[#006EAA] font-bold">
              PROPOSAL RECEIVED
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#002F5B] tracking-tight">
              THANK YOU FOR REACHING OUT.
            </h2>
            <p className="text-sm text-[#687A86] leading-relaxed">
              Your proposal has been received and will be reviewed by our team. If there is a suitable basis for discussion, we&apos;ll contact you using the details provided.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#DDE8EC] inline-block font-mono text-xs text-[#002F5B]">
            <span className="text-[#687A86]">Reference Code: </span>
            <span className="font-bold text-[#006EAA]">{submittedData.reference}</span>
          </div>

          {/* Fast-Track Review via WhatsApp Card */}
          <div className="p-6 rounded-2xl bg-white border-2 border-[#25D366] shadow-lg max-w-lg mx-auto space-y-3 text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-[#002F5B] uppercase tracking-wider">
              <WhatsAppIcon className="w-5 h-5 fill-[#25D366]" />
              <span>Forwarding Proposal to WhatsApp</span>
            </div>
            <p className="text-xs text-[#687A86] leading-relaxed">
              We have recorded your proposal and are connecting you to Braxvio Leadership on WhatsApp with your details and reference <strong className="text-[#002F5B] font-mono">#{submittedData.reference}</strong>.
            </p>
            <a
              href={whatsappRedirectUrl || getWhatsAppSendUrl(`Hello Braxvio Team,\n\nI just submitted a partnership proposal on behalf of ${formData.organization || 'our organization'}.\nReference Code: ${submittedData.reference}\nPartnership Type: ${formData.type}\n\nWe look forward to connecting directly.`)}
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>Open in WhatsApp Now →</span>
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
        /* Multi-Step Form */
        <div className="p-6 sm:p-12 rounded-3xl border border-[#DDE8EC] bg-[#F7FAFC] shadow-lg space-y-8">
          {/* Step indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#687A86]">
              <span className="text-[#006EAA] font-bold">STEP {currentStep} OF 4</span>
              <span>
                {currentStep === 1 && 'PARTNERSHIP TYPE'}
                {currentStep === 2 && 'PARTNER INFORMATION'}
                {currentStep === 3 && 'TARGET & PROPOSAL'}
                {currentStep === 4 && 'CONTRIBUTIONS & SUBMIT'}
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
            <input
              type="text"
              name="_hp_check"
              value={formData._hp_check}
              onChange={(e) => setFormData({ ...formData, _hp_check: e.target.value })}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            {/* STEP 1: PARTNERSHIP TYPE */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-fade-in-scale">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[#002F5B]">
                    Select Partnership Discipline
                  </h3>
                  <p className="text-xs text-[#687A86]">
                    Choose the classification that best aligns with your proposed engagement.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PARTNERSHIP_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, type })}
                      className={`p-4 rounded-xl text-left text-xs font-mono transition-all border ${
                        formData.type === type
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
                    <span>NEXT: PARTNER DETAILS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: PARTNER INFORMATION */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-fade-in-scale">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[#002F5B]">
                    Organization & Contact
                  </h3>
                  <p className="text-xs text-[#687A86]">
                    Tell us about your organization and designated point of contact.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#06131D] font-medium">ORGANIZATION NAME *</label>
                    <input
                      required
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                      placeholder="e.g. Zenith Hospital Network"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#06131D] font-medium">CONTACT PERSON *</label>
                    <input
                      required
                      type="text"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                      placeholder="e.g. Kofi Mensah"
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
                      placeholder="kofi@zenith.org"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#06131D] font-medium">PHONE NUMBER</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                      placeholder="+233 ... or +44 ..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#06131D] font-medium">COUNTRY *</label>
                    <input
                      required
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                      placeholder="Ghana, Kenya, UK..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#06131D] font-medium">INDUSTRY</label>
                    <input
                      type="text"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                      placeholder="Healthcare, Higher Ed, Logistics..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#06131D] font-medium">ORGANIZATION TYPE</label>
                    <select
                      value={formData.organizationType}
                      onChange={(e) => setFormData({ ...formData, organizationType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                    >
                      <option value="Corporation">Corporation / Enterprise</option>
                      <option value="Technology Provider">Technology Provider</option>
                      <option value="University / Institution">University / Institution</option>
                      <option value="Government / Municipality">Government / Municipality</option>
                      <option value="NGO / Non-Profit">NGO / Non-Profit</option>
                      <option value="Distributor">Distributor / Retailer</option>
                      <option value="Startup">Startup / SME</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#06131D] font-medium">WEBSITE (OPTIONAL)</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                    placeholder="https://zenith.org"
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
                      if (!formData.organization || !formData.contactName || !formData.email) {
                        setErrorMessage('Please fill in Organization Name, Contact Person, and Email.');
                        return;
                      }
                      setErrorMessage('');
                      setCurrentStep(3);
                    }}
                    className="px-6 py-3 rounded-xl bg-[#002F5B] text-white text-xs font-mono font-bold hover:bg-[#003E72] transition-colors inline-flex items-center gap-2"
                  >
                    <span>NEXT: PROPOSAL</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PARTNERSHIP TARGET & PROPOSAL */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-fade-in-scale">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[#002F5B]">
                    Partnership Target & Proposal
                  </h3>
                  <p className="text-xs text-[#687A86]">
                    Identify which product or platform you seek to collaborate with and define the objective.
                  </p>
                </div>

                {/* Target Product */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#06131D] font-medium">WHAT WOULD YOU LIKE TO PARTNER ON?</label>
                  <select
                    value={formData.targetProductId}
                    onChange={(e) => setFormData({ ...formData, targetProductId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1] font-mono"
                  >
                    <option value="braxvio-parent">Braxvio Parent Company (Core Strategic)</option>
                    {BRAXVIO_PRODUCTS.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.name} ({prod.category} — {prod.status})
                      </option>
                    ))}
                    <option value="future-product">Future R&D Product / Labs</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#06131D] font-medium">PROPOSAL TITLE *</label>
                  <input
                    required
                    type="text"
                    value={formData.proposalTitle}
                    onChange={(e) => setFormData({ ...formData, proposalTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                    placeholder="e.g. Cross-Border Pharmacy Inventory Sync & Courier Dispatch"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#06131D] font-medium">WHAT ARE YOU PROPOSING? *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.proposal}
                    onChange={(e) => setFormData({ ...formData, proposal: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                    placeholder="Describe the initiative, scope, and why this collaboration creates shared value."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#06131D] font-medium">WHAT WOULD YOUR ORGANIZATION CONTRIBUTE?</label>
                    <textarea
                      rows={2}
                      value={formData.organizationContribution}
                      onChange={(e) => setFormData({ ...formData, organizationContribution: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                      placeholder="APIs, field operations, distribution channels, regulatory licenses..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#06131D] font-medium">WHAT WOULD YOU NEED FROM BRAXVIO?</label>
                    <textarea
                      rows={2}
                      value={formData.braxvioContribution}
                      onChange={(e) => setFormData({ ...formData, braxvioContribution: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                      placeholder="Software engineering, pilot deployment, identity rails, integration..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#06131D] font-medium">TARGET MARKET</label>
                    <input
                      type="text"
                      value={formData.targetMarket}
                      onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                      placeholder="e.g. Ghana, West Africa, Global Developers"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#06131D] font-medium">EXPECTED TIMELINE</label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                    >
                      <option value="Immediate / within 1 month">Immediate / within 1 month</option>
                      <option value="3–6 months">3–6 months</option>
                      <option value="6–12 months">6–12 months</option>
                      <option value="Exploring">Exploring / Future Horizon</option>
                    </select>
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
                    onClick={() => {
                      if (!formData.proposalTitle || !formData.proposal) {
                        setErrorMessage('Please provide a Proposal Title and Proposal description.');
                        return;
                      }
                      setErrorMessage('');
                      setCurrentStep(4);
                    }}
                    className="px-6 py-3 rounded-xl bg-[#002F5B] text-white text-xs font-mono font-bold hover:bg-[#003E72] transition-colors inline-flex items-center gap-2"
                  >
                    <span>NEXT: CONTRIBUTIONS & SUBMIT</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: CONTRIBUTIONS & SUBMIT */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in-scale">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[#002F5B]">
                    Contribution Types & Supporting Docs
                  </h3>
                  <p className="text-xs text-[#687A86]">
                    Select all resource categories your organization can contribute to this partnership.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CONTRIBUTION_TYPES.map((type) => {
                    const isSelected = formData.contributionTypes.includes(type);
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => toggleContribution(type)}
                        className={`py-2 px-3 rounded-xl text-xs font-mono transition-all border text-center ${
                          isSelected
                            ? 'bg-[#002F5B] text-white border-[#002F5B] font-bold'
                            : 'bg-white border-[#DDE8EC] text-[#3D5066] hover:border-[#11AFC1]'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>

                {/* Document Upload */}
                <div className="space-y-2 p-4 rounded-2xl bg-white border border-[#DDE8EC]">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#06131D] font-medium">OPTIONAL SUPPORTING PROPOSAL / BRIEF</span>
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
                    disabled={submitting}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#003E72] via-[#006EAA] to-[#11AFC1] text-white text-xs font-mono font-bold tracking-wider uppercase hover:opacity-95 shadow-md transition-all disabled:opacity-50 inline-flex items-center gap-2"
                  >
                    <span>{submitting ? 'DISPATCHING PROPOSAL...' : 'SUBMIT PROPOSAL'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Direct WhatsApp Proposal Channel */}
                <div className="pt-4 border-t border-[#DDE8EC] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-[#687A86] font-mono text-center sm:text-left">
                    Need instant executive consultation or want to send your proposal brief directly?
                  </span>
                  <a
                    href={getWhatsAppSendUrl(
                      `Hello Braxvio Partnerships Team,\n\nI am preparing a ${formData.type} proposal on behalf of ${formData.organization || 'my organization'}.\nProposal Title: ${formData.proposalTitle || 'Partnership Inquiry'}\nContact Name: ${formData.contactName || 'Representative'}\n\nWe would like to connect on WhatsApp.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#25D366] text-[#128C7E] hover:bg-[#25D366]/10 font-mono text-xs font-bold transition-all shrink-0"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
                    <span>Discuss Proposal on WhatsApp</span>
                  </a>
                </div>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

export default function ProposePage() {
  return (
    <div className="pt-24 pb-36 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
      <Suspense fallback={<div className="max-w-4xl mx-auto py-12 text-center text-xs font-mono text-[#687A86]">Loading proposal workflow...</div>}>
        <ProposeFormContent />
      </Suspense>
    </div>
  );
}
