'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Upload,
  AlertCircle,
  FolderGit2,
  Sparkles,
  Layers,
} from 'lucide-react';
import {
  PROJECT_STAGES,
  PROJECT_NEEDS,
  PartnershipDocument,
} from '@/data/partnerships';
import { trackPartnershipEvent } from '@/lib/analytics';

export default function ProjectCollaborationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ reference: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [documents, setDocuments] = useState<PartnershipDocument[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    projectName: '',
    organization: '',
    contactName: '',
    email: '',
    country: '',
    industry: '',
    description: '',
    problem: '',
    targetUsers: '',
    stage: 'MVP',
    needs: [] as string[],
    timeline: '3–6 months',
    budgetRange: 'Under $25K',
    _hp_check: '',
  });

  useEffect(() => {
    trackPartnershipEvent('project_proposal_started');
  }, []);

  const toggleNeed = (need: string) => {
    setFormData((prev) => {
      const exists = prev.needs.includes(need);
      return {
        ...prev,
        needs: exists
          ? prev.needs.filter((n) => n !== need)
          : [...prev.needs, need],
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
      data.append('inquiryType', 'PROJECT');

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
      !formData.projectName ||
      !formData.contactName ||
      !formData.email ||
      !formData.description ||
      !formData.problem
    ) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/partnerships/projects', {
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
        trackPartnershipEvent('project_proposal_submitted', { reference: json.reference });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setErrorMessage(json.error || 'Failed to submit project proposal.');
      }
    } catch {
      setErrorMessage('An unexpected connection error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-36 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
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
            <FolderGit2 className="w-3.5 h-3.5 text-[#006EAA]" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#006EAA] font-bold">
              ENGINEERING COLLABORATION
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#002F5B] tracking-tight">
            HAVE A PROJECT <br />
            <span className="braxvio-gradient-text">WE SHOULD BUILD TOGETHER?</span>
          </h1>

          <p className="text-base sm:text-lg text-[#687A86] leading-relaxed max-w-2xl font-normal">
            For companies, organizations, institutions, governments, NGOs, universities,
            and founders looking to collaborate with Braxvio on a technology project.
          </p>
        </div>

        {submittedData ? (
          /* Success Screen */
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-[#F2FAFC] to-white border border-[#11AFC1]/30 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-3 max-w-lg mx-auto">
              <span className="text-xs font-mono uppercase tracking-widest text-[#006EAA] font-bold">
                PROJECT RECORDED
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#002F5B] tracking-tight">
                THANK YOU FOR YOUR PROPOSAL.
              </h2>
              <p className="text-sm text-[#687A86] leading-relaxed">
                Your project collaboration proposal has been submitted to the Braxvio engineering and platform architecture team. We will review its technical scope and contact you if there is alignment.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#DDE8EC] inline-block font-mono text-xs text-[#002F5B]">
              <span className="text-[#687A86]">Reference Code: </span>
              <span className="font-bold text-[#006EAA]">{submittedData.reference}</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/"
                className="px-6 py-3 rounded-xl bg-[#002F5B] text-white text-xs font-mono font-bold hover:bg-[#003E72] transition-colors"
              >
                RETURN TO BRAXVIO
              </Link>
              <Link
                href="/partners"
                className="px-6 py-3 rounded-xl bg-white border border-[#DDE8EC] text-[#002F5B] text-xs font-mono font-bold hover:bg-[#F7FAFC] transition-colors"
              >
                PARTNERSHIP OVERVIEW
              </Link>
            </div>
          </div>
        ) : (
          /* Multi-Step Form */
          <div className="p-6 sm:p-12 rounded-3xl border border-[#DDE8EC] bg-[#F7FAFC] shadow-lg space-y-8">
            {/* Step indicator */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#687A86]">
                <span className="text-[#006EAA] font-bold">STEP {currentStep} OF 3</span>
                <span>
                  {currentStep === 1 && 'PROJECT & ENTITY'}
                  {currentStep === 2 && 'PROBLEM & TARGET USERS'}
                  {currentStep === 3 && 'STAGE & BRAXVIO NEEDS'}
                </span>
              </div>
              <div className="w-full bg-[#DDE8EC] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#003E72] via-[#006EAA] to-[#11AFC1] h-full transition-all duration-300"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
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

              {/* STEP 1: PROJECT & ENTITY */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-fade-in-scale">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-[#002F5B]">
                      Project & Organization Identity
                    </h3>
                    <p className="text-xs text-[#687A86]">
                      Basic credentials of the initiative and the collaborating entity.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#06131D] font-medium">PROJECT NAME *</label>
                    <input
                      required
                      type="text"
                      value={formData.projectName}
                      onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                      placeholder="e.g. Pan-African Health Inventory Bridge"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#06131D] font-medium">ORGANIZATION / FOUNDER NAME</label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                        placeholder="Organization or initiative name"
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
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#06131D] font-medium">BUSINESS EMAIL *</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                        placeholder="contact@entity.org"
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
                        placeholder="Ghana, Kenya, Nigeria..."
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#06131D] font-medium">INDUSTRY</label>
                      <input
                        type="text"
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                        placeholder="e.g. Healthcare, Fintech, GovTech"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (!formData.projectName || !formData.contactName || !formData.email) {
                          setErrorMessage('Please fill in Project Name, Contact Person, and Email.');
                          return;
                        }
                        setErrorMessage('');
                        setCurrentStep(2);
                      }}
                      className="px-6 py-3 rounded-xl bg-[#002F5B] text-white text-xs font-mono font-bold hover:bg-[#003E72] transition-colors inline-flex items-center gap-2"
                    >
                      <span>NEXT: PROBLEM & SCOPE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: PROBLEM & SCOPE */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-fade-in-scale">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-[#002F5B]">
                      Problem & Target Audience
                    </h3>
                    <p className="text-xs text-[#687A86]">
                      Articulate the structural friction you are solving and who benefits.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#06131D] font-medium">PROJECT DESCRIPTION *</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                      placeholder="Brief overview of the planned system or application."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#06131D] font-medium">PROBLEM BEING SOLVED *</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.problem}
                      onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                      placeholder="Why is the current approach broken, slow, or inaccessible?"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#06131D] font-medium">TARGET USERS</label>
                    <input
                      type="text"
                      value={formData.targetUsers}
                      onChange={(e) => setFormData({ ...formData, targetUsers: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                      placeholder="e.g. University students, independent pharmacists, freight dispatchers"
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
                        if (!formData.description || !formData.problem) {
                          setErrorMessage('Please fill in Project Description and Problem.');
                          return;
                        }
                        setErrorMessage('');
                        setCurrentStep(3);
                      }}
                      className="px-6 py-3 rounded-xl bg-[#002F5B] text-white text-xs font-mono font-bold hover:bg-[#003E72] transition-colors inline-flex items-center gap-2"
                    >
                      <span>NEXT: STAGE & NEEDS</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: STAGE & NEEDS */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in-scale">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-[#002F5B]">
                      Project Stage & Braxvio Needs
                    </h3>
                    <p className="text-xs text-[#687A86]">
                      Specify current progress and what capabilities you need from our engineering team.
                    </p>
                  </div>

                  {/* Project Stages */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-[#06131D] font-medium">CURRENT PROJECT STAGE</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {PROJECT_STAGES.map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setFormData({ ...formData, stage: st })}
                          className={`py-2 px-2.5 rounded-xl text-xs font-mono transition-all border text-center ${
                            formData.stage === st
                              ? 'bg-[#002F5B] text-white border-[#002F5B] font-bold'
                              : 'bg-white border-[#DDE8EC] text-[#3D5066] hover:border-[#11AFC1]'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Needs from Braxvio */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-[#06131D] font-medium">WHAT DO YOU NEED FROM BRAXVIO?</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {PROJECT_NEEDS.map((nd) => {
                        const isSelected = formData.needs.includes(nd);
                        return (
                          <button
                            key={nd}
                            type="button"
                            onClick={() => toggleNeed(nd)}
                            className={`py-2 px-2.5 rounded-xl text-[11px] font-mono transition-all border text-center ${
                              isSelected
                                ? 'bg-[#002F5B] text-white border-[#002F5B] font-bold'
                                : 'bg-white border-[#DDE8EC] text-[#3D5066] hover:border-[#11AFC1]'
                            }`}
                          >
                            {nd}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#06131D] font-medium">ESTIMATED TIMELINE</label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                      >
                        <option value="1–3 months">1–3 months</option>
                        <option value="3–6 months">3–6 months</option>
                        <option value="6–12 months">6–12 months</option>
                        <option value="Long-term roadmap">Long-term roadmap</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#06131D] font-medium">BUDGET RANGE (OPTIONAL)</label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs outline-none focus:border-[#11AFC1]"
                      >
                        <option value="Grant funded / Institutional">Grant funded / Institutional</option>
                        <option value="Under $25K">Under $25K</option>
                        <option value="$25K–$75K">$25K–$75K</option>
                        <option value="$75K–$200K">$75K–$200K</option>
                        <option value="$200K+">$200K+</option>
                        <option value="Joint Venture discussion">Joint Venture discussion</option>
                      </select>
                    </div>
                  </div>

                  {/* Document Upload */}
                  <div className="space-y-2 p-4 rounded-2xl bg-white border border-[#DDE8EC]">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#06131D] font-medium">SUPPORTING SPEC / DECK (OPTIONAL)</span>
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
                      onClick={() => setCurrentStep(2)}
                      className="px-5 py-2.5 rounded-xl border border-[#DDE8EC] bg-white text-xs font-mono text-[#687A86] hover:text-[#002F5B]"
                    >
                      ← Back
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#003E72] via-[#006EAA] to-[#11AFC1] text-white text-xs font-mono font-bold tracking-wider uppercase hover:opacity-95 shadow-md transition-all disabled:opacity-50 inline-flex items-center gap-2"
                    >
                      <span>{submitting ? 'RECORDING PROJECT...' : 'SUBMIT PROJECT COLLABORATION'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
