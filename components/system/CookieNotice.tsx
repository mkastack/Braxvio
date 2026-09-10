'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, X, Check } from 'lucide-react';
import Image from 'next/image';

export default function CookieNotice() {
  const [dismissed, setDismissed] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('braxvio_consent');
    if (!consent) {
      setDismissed(false);
      // Small delay for entry animation
      setTimeout(() => setVisible(true), 800);
    }
  }, []);

  const handleChoice = (preference: string) => {
    localStorage.setItem('braxvio_consent', preference);
    setVisible(false);
    setTimeout(() => setDismissed(true), 400);
  };

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-5 left-4 right-4 md:left-auto md:right-6 md:max-w-[400px] z-50 transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-xl border border-[#DDE8EC] shadow-[0_16px_50px_rgba(0,47,91,0.14)] rounded-2xl overflow-hidden">
        {/* Gradient top strip */}
        <div className="h-0.5 w-full bg-gradient-to-r from-[#003E72] via-[#11AFC1] to-[#42D6C5]" />

        <div className="p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-[#F2FAFC] border border-[#11AFC1]/25 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4.5 h-4.5 text-[#11AFC1]" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="font-bold text-[#06131D] text-sm leading-tight">
                  Privacy &amp; System Diagnostics
                </div>
                <button
                  onClick={() => handleChoice('dismissed')}
                  className="p-0.5 rounded text-[#687A86] hover:text-[#002F5B] transition-colors shrink-0 -mt-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#687A86] leading-relaxed pl-12 -mt-2">
            We use essential local telemetry to ensure system security and optimize connection performance. We never trade or harvest personal behavioral data.
          </p>

          <div className="flex items-center gap-2 mt-4 pl-12">
            <button
              onClick={() => handleChoice('necessary')}
              className="flex-1 px-3 py-2 rounded-xl text-xs font-medium text-[#687A86] border border-[#DDE8EC] hover:border-[#11AFC1]/40 hover:text-[#002F5B] transition-all"
            >
              Necessary Only
            </button>
            <button
              onClick={() => handleChoice('accepted')}
              className="flex-1 px-3 py-2 rounded-xl bg-gradient-to-r from-[#003E72] to-[#006EAA] text-white text-xs font-semibold shadow-sm hover:opacity-95 transition-all flex items-center justify-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
