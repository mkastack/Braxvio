'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Shield,
  Lock,
  Download,
  ArrowUpRight,
  Search,
  AlertCircle,
  Building2,
  Layers,
} from 'lucide-react';
import {
  AdminRole,
  InvestmentInterest,
  PIPELINE_STAGES,
} from '@/data/partnerships';

export default function InvestmentInterestAdminPage() {
  const [currentRole, setCurrentRole] = useState<AdminRole>('SUPER_ADMIN');
  const [investments, setInvestments] = useState<InvestmentInterest[]>([]);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const fetchInvestments = async () => {
    try {
      setLoading(true);
      setAccessDenied(false);

      const res = await fetch(
        `/api/admin/partnerships?role=${currentRole}&type=investments&status=${statusFilter}&search=${encodeURIComponent(
          searchQuery
        )}`
      );
      const json = await res.json();

      if (res.status === 403 || !json.stats?.canSeeInvestments) {
        setAccessDenied(true);
        setInvestments([]);
      } else if (json.success) {
        setInvestments(json.data.investments || []);
      }
    } catch {
      setAccessDenied(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, [currentRole, statusFilter]);

  const handleExportCSV = () => {
    const headers = [
      'Reference',
      'Investor',
      'Organization',
      'Investor Type',
      'Area of Interest',
      'Product',
      'Indicative Range',
      'Country',
      'Status',
      'Assigned To',
      'Submitted At',
    ];
    const rows = investments.map((i) => [
      i.reference,
      `"${i.firstName} ${i.lastName}"`,
      `"${(i.organization || '').replace(/"/g, '""')}"`,
      `"${i.investorType}"`,
      `"${i.interestType}"`,
      i.productId || 'Parent',
      `"${i.indicativeRange || ''}"`,
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
    link.setAttribute('download', `braxvio_investments_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-24 pb-36 px-4 sm:px-6 lg:px-8 bg-[#F7FAFC] min-h-screen text-[#06131D]">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Top Header & Role Switcher */}
        <div className="p-6 rounded-3xl bg-white border border-[#DDE8EC] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-xs font-mono font-bold tracking-widest text-[#006EAA] uppercase">
                RESTRICTED CAPITAL REGISTRY
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002F5B] tracking-tight">
              Investment Interest Enquiries
            </h1>
          </div>

          {/* Role selector for demo / access verification */}
          <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-[#F2FAFC] border border-[#DDE8EC]">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#002F5B] font-bold px-2">
              <Shield className="w-3.5 h-3.5 text-[#11AFC1]" />
              <span>ROLE:</span>
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

        {/* Sub Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#DDE8EC] pb-4">
          <Link
            href="/admin/partnerships"
            className="px-4 py-2 rounded-xl bg-white border border-[#DDE8EC] text-[#3D5066] hover:text-[#002F5B] text-xs font-mono font-medium hover:border-[#11AFC1] transition-all flex items-center gap-2"
          >
            <Building2 className="w-3.5 h-3.5 text-[#006EAA]" />
            <span>All Partnerships</span>
          </Link>

          <Link
            href="/admin/partnerships/investment"
            className="px-4 py-2 rounded-xl bg-[#002F5B] text-white text-xs font-mono font-bold shadow-xs flex items-center gap-2"
          >
            <TrendingUp className="w-3.5 h-3.5" />
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

        {/* Access Restriction Check (Item 52) */}
        {accessDenied ? (
          <div className="p-10 rounded-3xl bg-white border border-rose-200 text-center space-y-4 max-w-2xl mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-[#002F5B]">
              Access Restricted to Authorized Capital Roles
            </h2>
            <p className="text-xs text-[#687A86] leading-relaxed">
              Investment indications and capital capacity are commercially sensitive. Access is strictly limited to <strong>Super Admin</strong>, <strong>CEO</strong>, <strong>Finance</strong>, and authorized <strong>Partnership Leads</strong>.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setCurrentRole('CEO')}
                className="px-4 py-2 rounded-xl bg-[#002F5B] text-white text-xs font-mono font-bold"
              >
                Switch to CEO Role to View
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-3xl bg-white border border-[#DDE8EC] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#006EAA] font-bold">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>Authorized Capital Portal: {currentRole}</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
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
                    <th className="py-3 px-3">Investor</th>
                    <th className="py-3 px-3">Organization</th>
                    <th className="py-3 px-3">Investor Type</th>
                    <th className="py-3 px-3">Area of Interest</th>
                    <th className="py-3 px-3">Indicative Range</th>
                    <th className="py-3 px-3">Country</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Assigned Member</th>
                    <th className="py-3 px-3">Submitted</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDE8EC]/60">
                  {investments.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="py-8 text-center text-[#687A86] font-mono">
                        No investment interests registered under this criteria.
                      </td>
                    </tr>
                  ) : (
                    investments.map((row) => (
                      <tr key={row.id} className="hover:bg-[#F2FAFC] transition-colors group">
                        <td className="py-3 px-3 font-mono font-bold text-purple-700">
                          {row.reference}
                        </td>
                        <td className="py-3 px-3 font-semibold text-[#002F5B]">
                          <div>{row.firstName} {row.lastName}</div>
                          <div className="text-[10px] text-[#687A86] font-mono">{row.email}</div>
                        </td>
                        <td className="py-3 px-3 text-[#3D5066]">
                          {row.organization || 'Individual'}
                        </td>
                        <td className="py-3 px-3 font-mono text-[11px] text-[#006EAA]">
                          {row.investorType}
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-md bg-[#F2FAFC] border border-[#11AFC1]/20 font-mono text-[10px] text-[#002F5B] uppercase font-semibold">
                            {row.interestType}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-[#002F5B]">
                          {row.indicativeRange || 'N/A'}
                        </td>
                        <td className="py-3 px-3 text-[#687A86]">
                          {row.country}
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full border text-[10px] font-mono font-bold bg-purple-50 text-purple-700 border-purple-200">
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
                            href={`/admin/partnerships/investment/${row.id}`}
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
        )}

      </div>
    </div>
  );
}
