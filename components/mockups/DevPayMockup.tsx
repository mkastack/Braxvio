'use client';

import React, { useState } from 'react';
import {
  Landmark,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Wallet,
  ArrowDownLeft,
  Check,
  RefreshCw,
  Smartphone,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';

export default function DevPayMockup() {
  const [currency, setCurrency] = useState<'USD' | 'GHS' | 'NGN' | 'KES'>('USD');
  const [milestoneReleased, setMilestoneReleased] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'treasury' | 'escrow' | 'payouts'>('treasury');

  const rates = {
    USD: { symbol: '$', rate: 1, label: 'US Dollar', total: '4,850.00' },
    GHS: { symbol: 'GH₵', rate: 15.2, label: 'Ghana Cedi', total: '73,720.00' },
    NGN: { symbol: '₦', rate: 1480, label: 'Nigerian Naira', total: '7,178,000.00' },
    KES: { symbol: 'KSh', rate: 129, label: 'Kenyan Shilling', total: '625,650.00' },
  };

  const handleReleaseEscrow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setMilestoneReleased(true);
    }, 600);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto rounded-2xl bg-white border border-[#DDE8EC] shadow-[0_12px_40px_rgba(0,47,91,0.06)] overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,110,170,0.12)]">
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
            <span className="text-xs font-bold text-[#002F5B]">devpay.africa</span>
            <span className="text-[11px] text-[#687A86] hidden sm:inline">/ treasury &amp; contracts</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Regulated Escrow Rails</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-[#F0F7FA] px-4 pt-2 flex items-center gap-1 border-b border-[#E2E8F0]">
        <button
          onClick={() => setActiveTab('treasury')}
          className={`pb-2.5 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'treasury'
              ? 'border-[#006EAA] text-[#002F5B]'
              : 'border-transparent text-[#687A86] hover:text-[#002F5B]'
          }`}
        >
          <Wallet className="w-3.5 h-3.5" />
          <span>Multi-Currency Treasury</span>
        </button>
        <button
          onClick={() => setActiveTab('escrow')}
          className={`pb-2.5 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'escrow'
              ? 'border-[#006EAA] text-[#002F5B]'
              : 'border-transparent text-[#687A86] hover:text-[#002F5B]'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Active Escrow</span>
          <span className="text-[10px] bg-[#006EAA]/10 text-[#006EAA] font-bold px-1.5 py-0.2 rounded-full">1</span>
        </button>
        <button
          onClick={() => setActiveTab('payouts')}
          className={`pb-2.5 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'payouts'
              ? 'border-[#006EAA] text-[#002F5B]'
              : 'border-transparent text-[#687A86] hover:text-[#002F5B]'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>MoMo Payouts</span>
        </button>
      </div>

      <div className="p-5 space-y-4">
        {/* Treasury Card */}
        <div className="rounded-xl p-4 sm:p-5 bg-gradient-to-br from-[#002F5B] to-[#00477D] text-white space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-300">Total Liquid Treasury</span>
            {/* Currency Pill Switcher */}
            <div className="flex gap-1 bg-black/25 p-1 rounded-lg border border-white/10 text-[11px]">
              {(['USD', 'GHS', 'NGN', 'KES'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-2.5 py-0.5 rounded font-medium transition-all ${
                    currency === curr
                      ? 'bg-white text-[#002F5B] font-bold shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {rates[currency].symbol} {rates[currency].total}
              </div>
              <div className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                <span>Equivalent at official interbank mid-rate</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-emerald-300 font-medium">Real-time sync</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-1 rounded-lg">
                0% FX Mark-up
              </span>
            </div>
          </div>
        </div>

        {/* Milestone Escrow Status */}
        <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white space-y-3 shadow-xs">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#002F5B]">
                  Deliverable: Full-Stack React &amp; API Integration
                </span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    milestoneReleased
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-sky-50 text-[#006EAA] border-sky-200'
                  }`}
                >
                  {milestoneReleased ? 'Released & Settled' : 'Client Approved • Locked'}
                </span>
              </div>
              <div className="text-xs text-[#687A86] mt-0.5">
                Client: <strong>Horizon Media Ltd (London, UK)</strong> • Milestone 2 of 3
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="text-sm font-extrabold text-[#002F5B]">$2,400.00</div>
              <div className="text-[10px] text-[#687A86]">≈ GH₵ 36,480.00</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-[#687A86]">
              <span>Milestone Progress (2/3 Signed off)</span>
              <span className="font-semibold text-[#002F5B]">{milestoneReleased ? '100% Cleared' : '66% Completed'}</span>
            </div>
            <div className="w-full bg-[#F1F5F9] h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  milestoneReleased ? 'bg-emerald-600 w-full' : 'bg-[#006EAA] w-2/3'
                }`}
              />
            </div>
          </div>

          {/* Release Action */}
          <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between gap-3">
            <div className="text-xs text-[#687A86]">
              {milestoneReleased ? (
                <span className="text-emerald-700 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Funds available in your wallet for immediate local payout
                </span>
              ) : (
                <span>Client verified GitHub PR #42 &amp; released escrow</span>
              )}
            </div>

            <button
              onClick={handleReleaseEscrow}
              disabled={milestoneReleased || isProcessing}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs shrink-0 ${
                milestoneReleased
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 cursor-default'
                  : 'bg-[#002F5B] hover:bg-[#003E72] text-white'
              }`}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>Settling...</span>
                </>
              ) : milestoneReleased ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Settled to Wallet</span>
                </>
              ) : (
                <>
                  <span>Withdraw Escrow</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Local Settlement Rails */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center text-[#006EAA] shrink-0">
                <Smartphone className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <div className="font-bold text-[#002F5B]">MTN Mobile Money / M-Pesa</div>
                <div className="text-[11px] text-[#687A86]">Instant settlement • 0s delay</div>
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Active
            </span>
          </div>

          <div className="p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center text-[#006EAA] shrink-0">
                <Landmark className="w-4 h-4 text-[#002F5B]" />
              </div>
              <div>
                <div className="font-bold text-[#002F5B]">Commercial Bank Transfer</div>
                <div className="text-[11px] text-[#687A86]">Ecobank, Standard Chartered, GTCO</div>
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
