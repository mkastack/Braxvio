'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Building2,
  Users,
  Search,
  Filter,
  Download,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar,
  Layers,
  ChevronRight,
  TrendingUp,
  Shield,
  FileText,
  Mail,
  UserCheck,
} from 'lucide-react';
import {
  AdminRole,
  ADMIN_USERS,
  PIPELINE_STAGES,
  PartnershipInquiry,
  PipelineStage,
} from '@/data/partnerships';

export default function AdminPartnershipsDashboard() {
  const [currentRole, setCurrentRole] = useState<AdminRole>('SUPER_ADMIN');
  const [stats, setStats] = useState<Record<string, number | boolean>>({});
  const [inquiries, setInquiries] = useState<PartnershipInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [productFilter, setProductFilter] = useState('ALL');

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/admin/partnerships?role=${currentRole}&status=${statusFilter}&search=${encodeURIComponent(
          searchQuery
        )}`
      );
      const json = await res.json();
      if (json.success) {
        setStats(json.stats);
        setInquiries(json.data.partnerships || []);
      }
    } catch (err) {
      console.error('Failed to fetch admin data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [currentRole, statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDashboardData();
  };

  const filteredInquiries = useMemo(() => {
    if (productFilter === 'ALL') return inquiries;
    return inquiries.filter((i) => i.targetProductId === productFilter);
  }, [inquiries, productFilter]);

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      'Reference',
      'Organization',
      'Contact',
      'Email',
      'Type',
      'Target Product',
      'Country',
      'Status',
      'Assigned To',
      'Submitted At',
    ];
    const rows = filteredInquiries.map((i) => [
      i.reference,
      `"${i.organization.replace(/"/g, '""')}"`,
      `"${i.contactName.replace(/"/g, '""')}"`,
      i.email,
      `"${i.type}"`,
      i.targetProductId || 'Parent',
      `"${i.country}"`,
      i.status,
      i.assignedTo || 'Unassigned',
      i.createdAt,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `braxvio_partnerships_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-24 pb-36 px-4 sm:px-6 lg:px-8 bg-[#F7FAFC] min-h-screen text-[#06131D]">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* ── Admin Header & Role Switcher Bar ── */}
        <div className="p-6 rounded-3xl bg-white border border-[#DDE8EC] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#11AFC1]" />
              <span className="text-xs font-mono font-bold tracking-widest text-[#006EAA] uppercase">
                BRAXVIO EXECUTIVE CMS
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002F5B] tracking-tight">
              Partnership & Growth Operations
            </h1>
          </div>

          {/* Role selector for demo / access verification */}
          <div className="flex flex-wrap items-center gap-3 p-2 rounded-2xl bg-[#F2FAFC] border border-[#DDE8EC]">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#002F5B] font-bold px-2">
              <Shield className="w-3.5 h-3.5 text-[#11AFC1]" />
              <span>ACTIVE ROLE:</span>
            </div>
            {(['SUPER_ADMIN', 'CEO', 'FINANCE', 'PARTNERSHIP_LEAD', 'PRODUCT_LEAD'] as AdminRole[]).map(
              (role) => (
                <button
                  key={role}
                  onClick={() => setCurrentRole(role)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                    currentRole === role
                      ? 'bg-[#002F5B] text-white font-bold shadow-xs'
                      : 'bg-white text-[#687A86] border border-[#DDE8EC] hover:text-[#002F5B]'
                  }`}
                >
                  {role}
                </button>
              )
            )}
          </div>
        </div>

        {/* ── Sub Navigation Tabs ── */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#DDE8EC] pb-4">
          <Link
            href="/admin/partnerships"
            className="px-4 py-2 rounded-xl bg-[#002F5B] text-white text-xs font-mono font-bold shadow-xs flex items-center gap-2"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>All Partnerships</span>
          </Link>

          <Link
            href="/admin/partnerships/investment"
            className="px-4 py-2 rounded-xl bg-white border border-[#DDE8EC] text-[#3D5066] hover:text-[#002F5B] text-xs font-mono font-medium hover:border-[#11AFC1] transition-all flex items-center gap-2"
          >
            <TrendingUp className="w-3.5 h-3.5 text-[#006EAA]" />
            <span>Investment Interest (Restricted)</span>
          </Link>

          <Link
            href="/admin/partnerships/projects"
            className="px-4 py-2 rounded-xl bg-white border border-[#DDE8EC] text-[#3D5066] hover:text-[#002F5B] text-xs font-mono font-medium hover:border-[#11AFC1] transition-all flex items-center gap-2"
          >
            <Layers className="w-3.5 h-3.5 text-[#11AFC1]" />
            <span>Project Proposals</span>
          </Link>
        </div>

        {/* ── Overview Metrics Grid (Item 37) ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { label: 'New Enquiries', val: stats.newEnquiries ?? 0, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Under Review', val: stats.underReview ?? 0, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Meetings Req.', val: stats.meetingsRequested ?? 0, color: 'text-cyan-600', bg: 'bg-cyan-50' },
            { label: 'Active Discuss.', val: stats.activeDiscussions ?? 0, color: 'text-orange-600', bg: 'bg-orange-50' },
            { label: 'Approved', val: stats.approved ?? 0, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Declined', val: stats.declined ?? 0, color: 'text-rose-600', bg: 'bg-rose-50' },
            {
              label: 'Invest. Interests',
              val: stats.canSeeInvestments ? stats.investmentInterests ?? 0 : 'Locked',
              color: 'text-purple-600',
              bg: 'bg-purple-50',
            },
            { label: 'Project Proposals', val: stats.projectProposals ?? 0, color: 'text-teal-600', bg: 'bg-teal-50' },
          ].map((m, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white border border-[#DDE8EC] shadow-2xs space-y-1"
            >
              <div className="text-[10px] font-mono text-[#687A86] truncate">{m.label}</div>
              <div className={`text-xl font-bold font-mono ${m.color}`}>{m.val}</div>
            </div>
          ))}
        </div>

        {/* ── Visual Pipeline Stages (Item 38) ── */}
        <div className="p-6 rounded-3xl bg-white border border-[#DDE8EC] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-[#006EAA] font-bold">
              PARTNERSHIP PIPELINE STAGES
            </span>
            <span className="text-[10px] font-mono text-[#687A86]">
              Interactive Stage Visualizer
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
            {PIPELINE_STAGES.map((st) => {
              const count = inquiries.filter((i) => i.status === st.key).length;
              const isSelected = statusFilter === st.key;
              return (
                <button
                  key={st.key}
                  onClick={() => setStatusFilter(isSelected ? 'ALL' : st.key)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-[#002F5B] bg-[#002F5B] text-white shadow-xs'
                      : 'border-[#DDE8EC] bg-[#F7FAFC] hover:border-[#11AFC1] text-[#06131D]'
                  }`}
                >
                  <div className="text-[9px] font-mono uppercase tracking-wider truncate mb-1 opacity-80">
                    {st.label}
                  </div>
                  <div className="text-base font-extrabold font-mono">
                    {count}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Filters, Search & Table (Item 39) ── */}
        <div className="p-6 rounded-3xl bg-white border border-[#DDE8EC] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#687A86] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search organization, contact, reference, country..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DDE8EC] bg-[#F7FAFC] text-xs outline-none focus:border-[#11AFC1]"
              />
            </form>

            <div className="flex flex-wrap items-center gap-3">
              {/* Product filter */}
              <select
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-[#DDE8EC] bg-[#F7FAFC] text-xs font-mono outline-none"
              >
                <option value="ALL">All Products</option>
                <option value="braxvio-parent">Braxvio Parent</option>
                <option value="kampus">Kampus</option>
                <option value="pharmora">Pharmora</option>
                <option value="ecolift">Ecolift</option>
                <option value="devpay-africa">DevPay Africa</option>
              </select>

              {/* Status filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-[#DDE8EC] bg-[#F7FAFC] text-xs font-mono outline-none"
              >
                <option value="ALL">All Stages</option>
                {PIPELINE_STAGES.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>

              <button
                onClick={handleExportCSV}
                className="px-4 py-2 rounded-xl bg-[#F2FAFC] border border-[#11AFC1]/30 text-[#006EAA] text-xs font-mono font-bold hover:bg-[#11AFC1] hover:text-white transition-all flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#DDE8EC] text-[#687A86] font-mono text-[10px] uppercase">
                  <th className="py-3 px-3">Reference</th>
                  <th className="py-3 px-3">Organization</th>
                  <th className="py-3 px-3">Contact</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">Target Product</th>
                  <th className="py-3 px-3">Country</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Assigned To</th>
                  <th className="py-3 px-3">Submitted</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDE8EC]/60">
                {filteredInquiries.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-8 text-center text-[#687A86] font-mono">
                      No partnership enquiries match the selected filters.
                    </td>
                  </tr>
                ) : (
                  filteredInquiries.map((row) => (
                    <tr key={row.id} className="hover:bg-[#F2FAFC] transition-colors group">
                      <td className="py-3 px-3 font-mono font-bold text-[#006EAA]">
                        {row.reference}
                      </td>
                      <td className="py-3 px-3 font-semibold text-[#002F5B]">
                        {row.organization}
                      </td>
                      <td className="py-3 px-3">
                        <div>{row.contactName}</div>
                        <div className="text-[10px] text-[#687A86] font-mono">{row.email}</div>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-[#3D5066]">
                        {row.type}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-md bg-[#F2FAFC] border border-[#11AFC1]/20 font-mono text-[10px] text-[#002F5B] uppercase font-semibold">
                          {row.targetProductId || 'Parent'}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[#687A86]">
                        {row.country}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full border text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border-blue-200">
                          {row.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-[#06131D]">
                        {row.assignedTo || 'Unassigned'}
                      </td>
                      <td className="py-3 px-3 font-mono text-[10px] text-[#687A86]">
                        {row.createdAt.slice(0, 10)}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Link
                          href={`/admin/partnerships/partnership/${row.id}`}
                          className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#006EAA] hover:text-[#11AFC1]"
                        >
                          <span>Review</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
