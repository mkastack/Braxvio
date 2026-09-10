import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Radio } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-28 bg-[#071C2B] text-white relative overflow-hidden">
      {/* Background System Grid */}
      <div className="absolute inset-0 braxvio-grid-dark opacity-35 pointer-events-none" />

      {/* Center Glow */}
      <div className="absolute w-96 h-96 rounded-full bg-[#11AFC1]/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#002F5B] border border-[#11AFC1]/40 text-[#42D6C5] text-xs font-mono">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>DIAGNOSTIC ERROR 404</span>
        </div>

        <div className="space-y-3">
          <div className="text-7xl sm:text-9xl font-extrabold font-mono tracking-tighter text-[#11AFC1]">
            404
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            SIGNAL LOST.
          </h1>
          <p className="text-base text-slate-300 leading-relaxed max-w-md mx-auto">
            We couldn&apos;t find the part of the Braxvio system you&apos;re looking for. The node may have relocated or been retired.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-xs font-mono uppercase tracking-wider font-semibold">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#003E72] via-[#006EAA] to-[#11AFC1] text-white hover:opacity-95 transition-opacity inline-flex items-center gap-2 shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN HOME</span>
          </Link>

          <Link
            href="/products"
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors inline-flex items-center gap-2"
          >
            <span>EXPLORE PRODUCTS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
