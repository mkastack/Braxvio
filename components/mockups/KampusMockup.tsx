'use client';

import React, { useState } from 'react';
import {
  Building2,
  ShoppingBag,
  ShieldCheck,
  MapPin,
  Search,
  ArrowRight,
  Check,
  Star,
  Zap,
  Wifi,
  Lock,
  Sparkles,
  QrCode,
  UserCheck,
} from 'lucide-react';

export default function KampusMockup() {
  const [activeTab, setActiveTab] = useState<'housing' | 'marketplace' | 'pass'>('housing');
  const [reserved, setReserved] = useState(false);

  return (
    <div className="relative w-full max-w-xl mx-auto rounded-2xl bg-white border border-[#DDE8EC] shadow-[0_12px_40px_rgba(0,47,91,0.06)] overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(17,175,193,0.12)]">
      {/* App Window Chrome */}
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
          </div>
          <div className="h-4 w-px bg-[#CBD5E1]" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#002F5B]">kampus.app</span>
            <span className="text-[11px] text-[#687A86] hidden sm:inline">/ Legon Campus</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Verified Student Housing</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-[#F0F7FA] px-4 pt-2 flex items-center gap-1 border-b border-[#E2E8F0]">
        <button
          onClick={() => setActiveTab('housing')}
          className={`pb-2.5 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'housing'
              ? 'border-[#006EAA] text-[#002F5B]'
              : 'border-transparent text-[#687A86] hover:text-[#002F5B]'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Hostel Search</span>
        </button>
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`pb-2.5 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'marketplace'
              ? 'border-[#006EAA] text-[#002F5B]'
              : 'border-transparent text-[#687A86] hover:text-[#002F5B]'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Peer Trade</span>
        </button>
        <button
          onClick={() => setActiveTab('pass')}
          className={`pb-2.5 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'pass'
              ? 'border-[#006EAA] text-[#002F5B]'
              : 'border-transparent text-[#687A86] hover:text-[#002F5B]'
          }`}
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>Digital Student Pass</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="p-5 space-y-4">
        {activeTab === 'housing' && (
          <div className="space-y-3.5 animate-in fade-in duration-200">
            {/* Search Input Bar */}
            <div className="flex items-center gap-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2.5 text-xs text-[#687A86]">
              <Search className="w-4 h-4 text-[#006EAA] shrink-0" />
              <span className="flex-1 truncate">Filter by distance to lecture halls, AC, private bath...</span>
              <span className="text-[11px] font-semibold text-[#002F5B] bg-white px-2 py-0.5 rounded border border-[#E2E8F0] shrink-0">
                Main Campus
              </span>
            </div>

            {/* Featured Listing Card */}
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 space-y-3 shadow-xs">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-bold text-[#002F5B]">Bani Hall Suites • Block C</h4>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                      <ShieldCheck className="w-3 h-3 text-sky-600" />
                      Direct Manager
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#687A86]">
                    <MapPin className="w-3.5 h-3.5 text-[#006EAA] shrink-0" />
                    <span>300m to Law Faculty &amp; Balme Library</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-base font-extrabold text-[#002F5B]">GH₵ 2,800</div>
                  <div className="text-[10px] text-[#687A86]">per semester</div>
                </div>
              </div>

              {/* Amenities */}
              <div className="grid grid-cols-3 gap-2 text-xs text-[#002F5B]">
                <div className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-1.5 text-[11px]">
                  <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="truncate">24/7 Generator</span>
                </div>
                <div className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-1.5 text-[11px]">
                  <Wifi className="w-3.5 h-3.5 text-[#006EAA] shrink-0" />
                  <span className="truncate">Fiber Wi-Fi</span>
                </div>
                <div className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-1.5 text-[11px]">
                  <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">Biometric Entry</span>
                </div>
              </div>

              {/* Student Review & Action */}
              <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between gap-3">
                <div className="flex items-center gap-1 text-xs text-[#687A86]">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-[#002F5B]">4.9</span>
                  <span className="text-[11px]">(142 verified student stays)</span>
                </div>

                <button
                  onClick={() => setReserved(!reserved)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs ${
                    reserved
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#002F5B] hover:bg-[#003E72] text-white'
                  }`}
                >
                  {reserved ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Reserved • Escrow Active</span>
                    </>
                  ) : (
                    <>
                      <span>Check Room Availability</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Anti-Scam Protection Guarantee */}
            <div className="p-3 rounded-xl bg-[#F0F7FA] border border-[#D2E7EE] flex items-start gap-2.5 text-xs text-[#005B8C]">
              <ShieldCheck className="w-4 h-4 text-[#006EAA] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-[#002F5B]">Zero Middleman Extortion:</strong> Connect directly with vetted managers. Your reservation deposit is held safely in escrow until you verify your room in person.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'marketplace' && (
          <div className="space-y-3 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl border border-[#E2E8F0] bg-white space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-[#006EAA]">Textbook Exchange</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">ID Verified</span>
                </div>
                <div className="text-xs font-bold text-[#002F5B]">Organic Chemistry (4th Edition)</div>
                <div className="text-[11px] text-[#687A86] flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-[#006EAA]" /> By Kwame M. (Level 300)
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0] text-xs">
                  <span className="font-bold text-[#002F5B]">GH₵ 140</span>
                  <span className="text-[11px] text-[#006EAA] font-medium hover:underline cursor-pointer">Request Item →</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-[#E2E8F0] bg-white space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-[#006EAA]">Campus Gadgets</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">ID Verified</span>
                </div>
                <div className="text-xs font-bold text-[#002F5B]">TI-84 Plus Graphing Calculator</div>
                <div className="text-[11px] text-[#687A86] flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-[#006EAA]" /> By Sarah D. (Level 200)
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0] text-xs">
                  <span className="font-bold text-[#002F5B]">GH₵ 320</span>
                  <span className="text-[11px] text-[#006EAA] font-medium hover:underline cursor-pointer">Request Item →</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#687A86] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#006EAA] shrink-0" />
              <span>Campus trades are restricted to verified university emails with on-campus handoff zones.</span>
            </div>
          </div>
        )}

        {activeTab === 'pass' && (
          <div className="p-5 rounded-xl bg-gradient-to-br from-[#002F5B] to-[#003E72] text-white space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-xs font-semibold text-[#42D6C5]">Digital Student Credential</span>
                <div className="text-sm font-bold mt-0.5">University of Ghana, Legon</div>
              </div>
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-[#42D6C5]">
                <QrCode className="w-5 h-5" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-300 block text-[11px]">Student</span>
                <span className="text-white font-bold">Kwame Mensah</span>
              </div>
              <div>
                <span className="text-slate-300 block text-[11px]">Department</span>
                <span className="text-white font-bold">BSc Computer Engineering</span>
              </div>
              <div>
                <span className="text-slate-300 block text-[11px]">Academic Year</span>
                <span className="text-slate-200">2025 / 2026</span>
              </div>
              <div>
                <span className="text-slate-300 block text-[11px]">Status</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3" /> Active &amp; Verified
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
