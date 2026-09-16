'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  UserCheck,
  CheckCircle2,
  Clock,
  FileText,
  MessageSquare,
  AlertCircle,
  ExternalLink,
  Shield,
  Activity,
  Send,
} from 'lucide-react';
import {
  PIPELINE_STAGES,
  AUTHORIZED_STAFF,
  PipelineStage,
  PartnershipInquiry,
  InvestmentInterest,
  ProjectProposal,
} from '@/data/partnerships';

interface Props {
  params: Promise<{ type: string; id: string }>;
}

export default function EnquiryDetailPage({ params }: Props) {
  const { type, id } = use(params);

  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [submittingNote, setSubmittingNote] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/partnerships/${type}/${id}`);
      const json = await res.json();
      if (res.ok && json.success) {
        setItem(json.item);
      } else {
        setError(json.error || 'Failed to load enquiry details');
      }
    } catch {
      setError('Connection error while fetching details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [type, id]);

  const handleStatusChange = async (newStatus: PipelineStage) => {
    try {
      setUpdatingStatus(true);
      const res = await fetch(`/api/admin/partnerships/${type}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          actorName: 'Authorized Admin',
        }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setItem(json.item);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleAssignmentChange = async (newAssigned: string) => {
    try {
      const res = await fetch(`/api/admin/partnerships/${type}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assignedTo: newAssigned,
          actorName: 'Executive Admin',
        }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setItem(json.item);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFollowUpChange = async (newDate: string) => {
    try {
      const res = await fetch(`/api/admin/partnerships/${type}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          followUpDate: newDate,
          actorName: 'Executive Admin',
        }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setItem(json.item);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    try {
      setSubmittingNote(true);
      const res = await fetch(`/api/admin/partnerships/${type}/${id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: noteContent.trim(),
          authorName: 'Staff Member',
          authorRole: 'Reviewer',
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setItem(json.item);
        setNoteContent('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingNote(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-36 px-4 text-center text-xs font-mono text-[#687A86]">
        Loading enquiry documentation...
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="pt-32 pb-36 px-4 max-w-xl mx-auto text-center space-y-4">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-[#002F5B]">Unable to Load Enquiry</h2>
        <p className="text-xs text-[#687A86]">{error || 'Record not found.'}</p>
        <Link
          href="/admin/partnerships"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#002F5B] text-white text-xs font-mono"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    );
  }

  const title =
    item.proposalTitle || item.projectName || `${item.firstName} ${item.lastName} (Investment)`;
  const orgName = item.organization || 'Independent';
  const contact = item.contactName || `${item.firstName} ${item.lastName}`;

  return (
    <div className="pt-24 pb-36 px-4 sm:px-6 lg:px-8 bg-[#F7FAFC] min-h-screen text-[#06131D]">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Back Link */}
        <div>
          <Link
            href="/admin/partnerships"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#687A86] hover:text-[#002F5B] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO ALL ENQUIRIES</span>
          </Link>
        </div>

        {/* Top Header Card */}
        <div className="p-8 rounded-3xl bg-white border border-[#DDE8EC] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold text-[#006EAA]">
                  {item.reference}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#DDE8EC] bg-[#F7FAFC] text-[#687A86] uppercase font-semibold">
                  {type.toUpperCase()}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002F5B] tracking-tight">
                {title}
              </h1>
              <div className="text-xs font-mono text-[#687A86]">
                Organization: <strong>{orgName}</strong> • Submitted: {item.createdAt.slice(0, 10)}
              </div>
            </div>

            {/* Quick Status Pill */}
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full border text-xs font-mono font-bold bg-blue-50 text-blue-700 border-blue-200">
                {item.status.replace(/_/g, ' ')}
              </span>
            </div>
          </div>

          {/* Quick Action Controls: Status & Assignment */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#DDE8EC]">
            {/* Status Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#687A86] font-medium">PIPELINE STAGE</label>
              <select
                disabled={updatingStatus}
                value={item.status}
                onChange={(e) => handleStatusChange(e.target.value as PipelineStage)}
                className="w-full px-3 py-2 rounded-xl border border-[#DDE8EC] bg-[#F7FAFC] text-xs font-mono outline-none focus:border-[#11AFC1]"
              >
                {PIPELINE_STAGES.map((st) => (
                  <option key={st.key} value={st.key}>
                    {st.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Assignment Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#687A86] font-medium">ASSIGNED TEAM MEMBER</label>
              <select
                value={item.assignedTo || ''}
                onChange={(e) => handleAssignmentChange(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#DDE8EC] bg-[#F7FAFC] text-xs font-mono outline-none focus:border-[#11AFC1]"
              >
                <option value="">Unassigned</option>
                {AUTHORIZED_STAFF.map((staff) => (
                  <option key={staff.id} value={staff.name}>
                    {staff.name} ({staff.role})
                  </option>
                ))}
              </select>
            </div>

            {/* Follow-up Date Picker */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#687A86] font-medium">NEXT FOLLOW-UP DATE</label>
              <input
                type="date"
                value={item.followUpDate || ''}
                onChange={(e) => handleFollowUpChange(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#DDE8EC] bg-[#F7FAFC] text-xs font-mono outline-none focus:border-[#11AFC1]"
              />
            </div>
          </div>
        </div>

        {/* Two-Column Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Info & Proposal Body */}
          <div className="lg:col-span-7 space-y-8">
            {/* Contact Details */}
            <div className="p-6 rounded-3xl bg-white border border-[#DDE8EC] shadow-sm space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#006EAA] font-bold">
                CONTACT & ENTITY CREDENTIALS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#687A86] block font-mono text-[10px]">NAME</span>
                  <span className="font-semibold text-[#002F5B] text-sm">{contact}</span>
                  {item.jobTitle && <span className="text-[#687A86] block">{item.jobTitle}</span>}
                </div>

                <div>
                  <span className="text-[#687A86] block font-mono text-[10px]">EMAIL</span>
                  <a href={`mailto:${item.email}`} className="font-mono text-[#006EAA] hover:underline">
                    {item.email}
                  </a>
                </div>

                {item.phone && (
                  <div>
                    <span className="text-[#687A86] block font-mono text-[10px]">PHONE</span>
                    <span className="font-mono">{item.phone}</span>
                  </div>
                )}

                <div>
                  <span className="text-[#687A86] block font-mono text-[10px]">COUNTRY / LOCATION</span>
                  <span>{item.country || 'Unspecified'}</span>
                </div>

                {item.website && (
                  <div className="sm:col-span-2">
                    <span className="text-[#687A86] block font-mono text-[10px]">WEBSITE / PROFILE</span>
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-[#006EAA] hover:underline inline-flex items-center gap-1"
                    >
                      <span>{item.website}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Proposal Content */}
            <div className="p-6 rounded-3xl bg-white border border-[#DDE8EC] shadow-sm space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#006EAA] font-bold">
                PROPOSAL & SCOPE
              </span>

              {/* Proposal text or Message */}
              <div className="space-y-3 text-xs leading-relaxed text-[#3D5066]">
                {item.proposal && (
                  <div>
                    <span className="font-mono font-bold text-[#002F5B] block mb-1">PROPOSAL BODY:</span>
                    <p className="p-4 rounded-2xl bg-[#F7FAFC] border border-[#DDE8EC] whitespace-pre-wrap">
                      {item.proposal}
                    </p>
                  </div>
                )}

                {item.description && (
                  <div>
                    <span className="font-mono font-bold text-[#002F5B] block mb-1">PROJECT OVERVIEW:</span>
                    <p className="p-4 rounded-2xl bg-[#F7FAFC] border border-[#DDE8EC] whitespace-pre-wrap">
                      {item.description}
                    </p>
                  </div>
                )}

                {item.problem && (
                  <div>
                    <span className="font-mono font-bold text-[#002F5B] block mb-1">PROBLEM BEING SOLVED:</span>
                    <p className="p-4 rounded-2xl bg-[#F7FAFC] border border-[#DDE8EC] whitespace-pre-wrap">
                      {item.problem}
                    </p>
                  </div>
                )}

                {item.message && (
                  <div>
                    <span className="font-mono font-bold text-[#002F5B] block mb-1">INVESTOR INTRODUCTORY MESSAGE:</span>
                    <p className="p-4 rounded-2xl bg-[#F7FAFC] border border-[#DDE8EC] whitespace-pre-wrap">
                      {item.message}
                    </p>
                  </div>
                )}

                {/* Specifics */}
                {item.indicativeRange && (
                  <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 font-mono text-xs flex items-center justify-between">
                    <span>INDICATIVE CAPITAL CAPACITY:</span>
                    <span className="font-bold">{item.indicativeRange}</span>
                  </div>
                )}

                {item.targetProductId && (
                  <div className="flex items-center gap-2 pt-2">
                    <span className="font-mono text-[#687A86]">Target Platform:</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#F2FAFC] border border-[#11AFC1]/30 font-mono font-bold text-[#002F5B] uppercase">
                      {item.targetProductId}
                    </span>
                  </div>
                )}

                {/* Contribution Types */}
                {item.contributionTypes && item.contributionTypes.length > 0 && (
                  <div className="pt-2 space-y-1.5">
                    <span className="font-mono text-[#687A86] block text-[11px]">CONTRIBUTION DISCIPLINES:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.contributionTypes.map((c: string) => (
                        <span
                          key={c}
                          className="px-2.5 py-1 rounded-md bg-[#F2FAFC] border border-[#DDE8EC] font-mono text-[11px] text-[#002F5B]"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Uploaded Documents */}
              {item.documents && item.documents.length > 0 && (
                <div className="pt-4 border-t border-[#DDE8EC] space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#006EAA] font-bold block">
                    SUBMITTED DOCUMENTS
                  </span>
                  <div className="space-y-2">
                    {item.documents.map((doc: any) => (
                      <div
                        key={doc.id}
                        className="p-3 rounded-xl bg-[#F7FAFC] border border-[#DDE8EC] flex items-center justify-between text-xs font-mono"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#11AFC1]" />
                          <span>{doc.fileName}</span>
                        </div>
                        <a
                          href={doc.storageKey}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#006EAA] hover:underline flex items-center gap-1 font-bold"
                        >
                          <span>Open</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Private Internal Notes & Audit Activities */}
          <div className="lg:col-span-5 space-y-8">
            {/* Private Internal Notes (Item 43) */}
            <div className="p-6 rounded-3xl bg-white border border-[#DDE8EC] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-[#006EAA] font-bold flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-amber-600" />
                  <span>INTERNAL NOTES</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">Strictly Private</span>
              </div>

              <form onSubmit={handleAddNote} className="space-y-3">
                <textarea
                  rows={3}
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Add private staff note (e.g. 'Strong potential distribution partner. Schedule demo.')..."
                  className="w-full p-3 rounded-xl border border-[#DDE8EC] bg-[#F7FAFC] text-xs outline-none focus:border-[#11AFC1]"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submittingNote || !noteContent.trim()}
                    className="px-4 py-2 rounded-xl bg-[#002F5B] text-white text-xs font-mono font-bold hover:bg-[#003E72] disabled:opacity-50 transition-all flex items-center gap-1.5"
                  >
                    <Send className="w-3 h-3" />
                    <span>Post Note</span>
                  </button>
                </div>
              </form>

              {/* Notes Thread */}
              <div className="space-y-3 pt-2">
                {(!item.notes || item.notes.length === 0) ? (
                  <p className="text-xs font-mono text-[#687A86] py-2">No internal notes yet.</p>
                ) : (
                  item.notes.map((n: any) => (
                    <div
                      key={n.id}
                      className="p-3.5 rounded-xl bg-[#F7FAFC] border border-[#DDE8EC] space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#687A86]">
                        <span className="font-bold text-[#002F5B]">{n.authorName} ({n.authorRole})</span>
                        <span>{n.createdAt.slice(0, 10)}</span>
                      </div>
                      <p className="text-[#3D5066] leading-relaxed">{n.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Audit Activity Trail */}
            <div className="p-6 rounded-3xl bg-white border border-[#DDE8EC] shadow-sm space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#006EAA] font-bold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#11AFC1]" />
                <span>ACTIVITY AUDIT LOG</span>
              </span>

              <div className="space-y-3">
                {(!item.activities || item.activities.length === 0) ? (
                  <p className="text-xs font-mono text-[#687A86]">No recorded activities.</p>
                ) : (
                  item.activities.map((act: any) => (
                    <div
                      key={act.id}
                      className="flex items-start gap-2.5 text-xs text-[#3D5066] border-l-2 border-[#11AFC1] pl-3 py-1"
                    >
                      <div className="space-y-0.5">
                        <div className="font-mono text-[10px] text-[#687A86]">
                          {act.timestamp.slice(0, 16).replace('T', ' ')} • {act.actor}
                        </div>
                        <div className="font-medium text-[#002F5B]">{act.details || act.action}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
