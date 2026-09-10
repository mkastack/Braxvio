'use client';

import React, { useState } from 'react';
import { Landmark, ArrowUpRight, ShieldCheck, CheckCircle2, DollarSign, Wallet, FileCode, Check, RefreshCw } from 'lucide-react';

export default function DevPayMockup() {
  const [currency, setCurrency] = useState<'GHS' | 'NGN' | 'KES'>('GHS');
  const [milestoneReleased, setMilestoneReleased] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const rates = {
    GHS: { symbol: 'GH₵', rate: 15.2, label: 'Ghana Cedi' },
    NGN: { symbol: '₦', rate: 1480, label: 'Nigerian Naira' },
    KES: { symbol: 'KSh', rate: 129, label: 'Kenyan Shilling' }
  };

  const usdAmount = 8450;
  const converted = (usdAmount * rates[currency].rate).toLocaleString();

  const handleReleaseEscrow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setMilestoneReleased(true);
    }, 700);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto rounded-3xl bg-white border border-[#DDE8EC] shadow-[0_20px_50px_rgba(0,47,91,0.08)] overflow-hidden transition-all duration-500 hover:shadow-[0_25px_60px_rgba(0,110,170,0.18)] group">
      {/* Top Header */}
      <div className="bg-[#F7FAFC] border-b border-[#DDE8EC] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#006EAA] animate-pulse" />
          <span className="text-xs font-bold tracking-tight text-[#002F5B]">DEVPAY AFRICA</span>
          <span className="text-[10px] font-mono text-[#687A86]">/ FINANCIAL INFRASTRUCTURE</span>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 shadow-xs">
          <ShieldCheck className="w-3 h-3 text-[#006EAA]" />
          Regulated Escrow Rails
        </span>
      </div>

      <div className="p-5 space-y-4">
        {/* Multi-Currency Balances Card */}
        <div className="rounded-2xl p-5 bg-gradient-to-br from-[#002F5B] to-[#003E72] text-white space-y-3 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#42D6C5]">Multi-Currency Treasury</span>
            {/* Currency Switcher */}
            <div className="flex gap-1 bg-black/30 p-1 rounded-lg border border-white/10 text-[10px] font-mono">
              {(['GHS', 'NGN', 'KES'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    currency === curr ? 'bg-[#11AFC1] text-[#002F5B] font-bold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <div className="text-3xl font-extrabold font-mono tracking-tight">$8,450.00 <span className="text-xs font-sans text-slate-300 font-normal">USD virtual</span></div>
              <div className="text-xs text-slate-200 mt-0.5 font-mono">
                ≈ {rates[currency].symbol} {converted} ({rates[currency].label})
              </div>
            </div>
            <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-md border border-emerald-400/30 w-fit">
              LIVE INTERBANK FX RATE
            </span>
          </div>
        </div>

        {/* Milestone Contract Escrow Status with Interactive Release */}
        <div className="p-4 rounded-2xl border border-[#DDE8EC] bg-[#F2FAFC] space-y-3 shadow-xs">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-[#006EAA]" />
              <span className="font-extrabold text-[#06131D]">Escrow Contract: Distributed Kafka Engine</span>
            </div>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
              milestoneReleased ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {milestoneReleased ? 'RELEASED TO WALLET ($3,200)' : 'LOCKED IN ESCROW ($3,200)'}
            </span>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#687A86]">Client: Fintech Partners (London, UK) • PR #84 Approved</span>
              <span className="font-mono text-[#002F5B] font-bold">Milestone 2 of 3</span>
            </div>
            <div className="w-full bg-white h-2 rounded-full border border-[#DDE8EC] overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  milestoneReleased ? 'bg-emerald-600 w-full' : 'bg-[#006EAA] w-[66%]'
                }`}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-[#DDE8EC] flex items-center justify-between">
            <span className="text-[11px] text-[#687A86]">
              {milestoneReleased ? 'Payment cleared instantly via local rails' : 'Client signed off on deliverable'}
            </span>
            <button
              onClick={handleReleaseEscrow}
              disabled={milestoneReleased || isProcessing}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-xs ${
                milestoneReleased
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-[#002F5B] hover:bg-[#003E72] text-white'
              }`}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>Clearing...</span>
                </>
              ) : milestoneReleased ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Settled</span>
                </>
              ) : (
                <>
                  <span>Unlock Funds</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Local Settlement Destinations */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 rounded-xl border border-[#DDE8EC] bg-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-[#687A86]" />
              <span className="text-[#06131D] font-medium">Domestic Commercial Bank</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-600 font-bold">Instant</span>
          </div>
          <div className="p-3 rounded-xl border border-[#DDE8EC] bg-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#687A86]" />
              <span className="text-[#06131D] font-medium">Mobile Money (MTN / M-Pesa)</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-600 font-bold">0% FX Spread</span>
          </div>
        </div>
      </div>
    </div>
  );
}
