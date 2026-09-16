'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Layers,
  Search,
  Download,
  ArrowUpRight,
  FolderGit2,
  Building2,
  TrendingUp,
} from 'lucide-react';
import {
  ProjectProposal,
  PROJECT_STAGES,
  PIPELINE_STAGES,
} from '@/data/partnerships';

export default function ProjectProposalsAdminPage() {
  const [projects, setProjects] = useState<ProjectProposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/admin/partnerships?type=projects&status=${statusFilter}&search=${encodeURIComponent(
          searchQuery
        )}`
      );
      const json = await res.json();
      if (json.success) {
        let list = (json.data.projects || []) as ProjectProposal[];
        if (stageFilter !== 'ALL') {
          list = list.filter((p) => p.stage === stageFilter);
        }
        setProjects(list);
      }
    } catch (err) {
      console.error('Failed to fetch projects', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [stageFilter, statusFilter]);

  const handleExportCSV = () => {
    const headers = [
      'Reference',
      'Project',
      'Organization',
      'Contact',
      'Industry',
      'Stage',
      'Budget',
      'Status',
      'Submitted At',
    ];
    const rows = projects.map((p) => [
      p.reference,
      `"${p.projectName.replace(/"/g, '""')}"`,
      `"${p.organization.replace(/"/g, '""')}"`,
      `"${p.contactName.replace(/"/g, '""')}"`,
      `"${p.industry}"`,
      p.stage,
      `"${p.budgetRange || ''}"`,
      p.status,
      p.createdAt,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `braxvio_projects_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-24 pb-36 px-4 sm:px-6 lg:px-8 bg-[#F7FAFC] min-h-screen text-[#06131D]">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Top Header */}
        <div className="p-6 rounded-3xl bg-white border border-[#DDE8EC] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              <span className="text-xs font-mono font-bold tracking-widest text-[#006EAA] uppercase">
                ENGINEERING PROPOSALS
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002F5B] tracking-tight">
              Project Collaboration Submissions
            </h1>
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
            className="px-4 py-2 rounded-xl bg-white border border-[#DDE8EC] text-[#3D5066] hover:text-[#002F5B] text-xs font-mono font-medium hover:border-[#11AFC1] transition-all flex items-center gap-2"
          >
            <TrendingUp className="w-3.5 h-3.5 text-[#006EAA]" />
            <span>Investment Interest (Restricted)</span>
          </Link>

          <Link
            href="/admin/partnerships/projects"
            className="px-4 py-2 rounded-xl bg-[#002F5B] text-white text-xs font-mono font-bold shadow-xs flex items-center gap-2"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Project Proposals</span>
          </Link>
        </div>

        {/* Filters & Table */}
        <div className="p-6 rounded-3xl bg-white border border-[#DDE8EC] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#687A86] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchProjects()}
                placeholder="Search project name, organization, contact..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DDE8EC] bg-[#F7FAFC] text-xs outline-none focus:border-[#11AFC1]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-[#DDE8EC] bg-[#F7FAFC] text-xs font-mono outline-none"
              >
                <option value="ALL">All Project Stages</option>
                {PROJECT_STAGES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-[#DDE8EC] bg-[#F7FAFC] text-xs font-mono outline-none"
              >
                <option value="ALL">All Statuses</option>
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
                  <th className="py-3 px-3">Project</th>
                  <th className="py-3 px-3">Organization</th>
                  <th className="py-3 px-3">Industry</th>
                  <th className="py-3 px-3">Stage</th>
                  <th className="py-3 px-3">Budget</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Submitted</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDE8EC]/60">
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-[#687A86] font-mono">
                      No project collaboration proposals match criteria.
                    </td>
                  </tr>
                ) : (
                  projects.map((row) => (
                    <tr key={row.id} className="hover:bg-[#F2FAFC] transition-colors group">
                      <td className="py-3 px-3 font-mono font-bold text-teal-700">
                        {row.reference}
                      </td>
                      <td className="py-3 px-3 font-semibold text-[#002F5B]">
                        {row.projectName}
                      </td>
                      <td className="py-3 px-3 text-[#3D5066]">
                        <div>{row.organization}</div>
                        <div className="text-[10px] text-[#687A86] font-mono">{row.contactName}</div>
                      </td>
                      <td className="py-3 px-3 text-[#687A86]">
                        {row.industry}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-md bg-[#F2FAFC] border border-[#11AFC1]/20 font-mono text-[10px] text-[#002F5B] uppercase font-semibold">
                          {row.stage}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-[#002F5B]">
                        {row.budgetRange || 'Not specified'}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full border text-[10px] font-mono font-bold bg-teal-50 text-teal-700 border-teal-200">
                          {row.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-[10px] text-[#687A86]">
                        {row.createdAt.slice(0, 10)}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Link
                          href={`/admin/partnerships/project/${row.id}`}
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
