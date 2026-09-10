'use client';

import React, { useState } from 'react';
import { Building2, ShoppingBag, Calendar, ShieldCheck, MapPin, Search, ArrowRight, UserCheck, Check, QrCode } from 'lucide-react';

export default function KampusMockup() {
  const [activeTab, setActiveTab] = useState<'housing' | 'marketplace' | 'id'>('housing');
  const [booked, setBooked] = useState(false);

  return (
    <div className="relative w-full max-w-xl mx-auto rounded-3xl bg-white border border-[#DDE8EC] shadow-[0_20px_50px_rgba(0,47,91,0.08)] overflow-hidden transition-all duration-500 hover:shadow-[0_25px_60px_rgba(17,175,193,0.18)] group">
      {/* App Bar / Status */}
      <div className="bg-[#F7FAFC] border-b border-[#DDE8EC] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#11AFC1] animate-pulse" />
          <span className="text-xs font-bold tracking-tight text-[#002F5B]">KAMPUS</span>
          <span className="text-[10px] font-mono text-[#687A86]">/ UNIVERSITY ECOSYSTEM</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-xs">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            Verified Student ID #KMP-892
          </span>
        </div>
      </div>

      {/* Interactive Tabs Header */}
      <div className="bg-[#F2FAFC] px-4 pt-2.5 pb-0 flex gap-2 border-b border-[#DDE8EC]">
        <button
          onClick={() => setActiveTab('housing')}
          className={`pb-2.5 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all ${
            activeTab === 'housing'
              ? 'border-[#11AFC1] text-[#002F5B]'
              : 'border-transparent text-[#687A86] hover:text-[#002F5B]'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Verified Housing</span>
        </button>
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`pb-2.5 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all ${
            activeTab === 'marketplace'
              ? 'border-[#008FC4] text-[#002F5B]'
              : 'border-transparent text-[#687A86] hover:text-[#002F5B]'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Peer Trade</span>
        </button>
        <button
          onClick={() => setActiveTab('id')}
          className={`pb-2.5 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all ${
            activeTab === 'id'
              ? 'border-[#002F5B] text-[#002F5B]'
              : 'border-transparent text-[#687A86] hover:text-[#002F5B]'
          }`}
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>Digital Student Pass</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="p-5 space-y-4">
        {activeTab === 'housing' && (
          <div className="space-y-3 animate-in fade-in duration-300">
            {/* Search Bar */}
            <div className="flex items-center gap-2.5 bg-[#F7FAFC] border border-[#DDE8EC] rounded-xl px-3.5 py-2 text-xs text-[#687A86]">
              <Search className="w-4 h-4 text-[#11AFC1]" />
              <span className="flex-1">Filter by campus walking distance & air conditioning...</span>
              <span className="font-mono text-[10px] bg-white px-2 py-0.5 rounded border border-[#DDE8EC] text-[#002F5B]">Legon Campus</span>
            </div>

            {/* Featured Hostel Unit */}
            <div className="p-4 rounded-2xl border border-[#DDE8EC] bg-white hover:border-[#11AFC1] transition-all space-y-3 shadow-xs">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-[#002F5B]">Bani Hall Suites • Block C</span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Vetted Manager
                    </span>
                  </div>
                  <div className="text-[11px] text-[#687A86] flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-[#11AFC1]" /> 250m to Law Faculty & Main Library
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-extrabold text-[#002F5B]">GH₵ 2,800</div>
                  <div className="text-[10px] text-[#687A86]">per semester</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono py-1">
                <div className="p-1.5 rounded-lg bg-[#F7FAFC] border border-[#DDE8EC] text-[#002F5B]">⚡ 24/7 Generator</div>
                <div className="p-1.5 rounded-lg bg-[#F7FAFC] border border-[#DDE8EC] text-[#002F5B]">📶 High-speed Wi-Fi</div>
                <div className="p-1.5 rounded-lg bg-[#F7FAFC] border border-[#DDE8EC] text-[#002F5B]">🛡️ Biometric Gate</div>
              </div>

              <div className="pt-2 border-t border-[#DDE8EC] flex items-center justify-between">
                <span className="text-[11px] text-amber-700 font-medium">⚠️ Only 2 rooms remaining for Fall semester</span>
                <button
                  onClick={() => setBooked(!booked)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                    booked
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-[#003E72] to-[#11AFC1] text-white hover:opacity-95'
                  }`}
                >
                  {booked ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Reserved! Escrow Active</span>
                    </>
                  ) : (
                    <>
                      <span>Reserve with Escrow</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'marketplace' && (
          <div className="space-y-3 animate-in fade-in duration-300">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl border border-[#DDE8EC] bg-[#F7FAFC] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#008FC4] font-bold">Textbook Exchange</span>
                  <ShoppingBag className="w-4 h-4 text-[#008FC4]" />
                </div>
                <div className="text-xs font-bold text-[#06131D]">Organic Chemistry (4th Edition)</div>
                <div className="text-[11px] text-[#687A86] flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-emerald-600" /> By Kwame (Level 300)
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#DDE8EC] text-[11px]">
                  <span className="font-extrabold text-[#002F5B]">GH₵ 140</span>
                  <span className="text-[10px] font-medium text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">Escrow Hold</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl border border-[#DDE8EC] bg-[#F7FAFC] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#11AFC1] font-bold">Gadget Verified</span>
                  <ShoppingBag className="w-4 h-4 text-[#11AFC1]" />
                </div>
                <div className="text-xs font-bold text-[#06131D]">TI-84 Plus CE Graphing Calc</div>
                <div className="text-[11px] text-[#687A86] flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-emerald-600" /> By Sarah (Level 200)
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#DDE8EC] text-[11px]">
                  <span className="font-extrabold text-[#002F5B]">GH₵ 350</span>
                  <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Tested Working</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Zero stranger danger: buyers & sellers must verify student ID before meeting at designated campus trade points.</span>
            </div>
          </div>
        )}

        {activeTab === 'id' && (
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#002F5B] to-[#071C2B] text-white space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-[#42D6C5] uppercase tracking-widest">KAMPUS SOVEREIGN PASS</span>
                <div className="text-sm font-bold">University of Ghana, Legon</div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#42D6C5]">
                <QrCode className="w-5 h-5" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[10px]">STUDENT NAME</span>
                <span className="text-white font-bold text-sm">Kwame Mensah</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">PROGRAM</span>
                <span className="text-white font-bold text-sm">BSc Computer Engineering</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">VERIFICATION HASH</span>
                <span className="text-[#42D6C5] font-mono text-[11px]">0x89f...2d19</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">PERKS UNLOCKED</span>
                <span className="text-emerald-400 font-bold">Bus 40% Off • Gym Access</span>
              </div>
            </div>
          </div>
        )}

        {/* Live Campus Feed Micro-ticker */}
        <div className="rounded-xl p-3 bg-gradient-to-r from-[#002F5B] to-[#003E72] text-white flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#42D6C5] animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#42D6C5]">Campus Live Mesh</span>
            </div>
            <div className="text-xs font-semibold">Engineering Faculty Career Expo</div>
            <div className="text-[11px] text-slate-300">Great Hall Complex • Starts 14:00 GMT</div>
          </div>
          <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white text-[10px] font-mono">
            LIVE NOW
          </span>
        </div>
      </div>
    </div>
  );
}
