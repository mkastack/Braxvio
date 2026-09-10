import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — Braxvio Technologies',
  description: 'Our uncompromising commitment to user data privacy and zero behavioral surveillance.'
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-36 px-6 sm:px-8 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto space-y-12">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-[#687A86] hover:text-[#002F5B]">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN HOME</span>
        </Link>

        <div className="space-y-4 border-b border-[#DDE8EC] pb-8">
          <span className="text-xs font-mono tracking-widest uppercase text-[#006EAA] font-semibold">
            LEGAL ARCHITECTURE
          </span>
          <h1 className="text-4xl font-extrabold text-[#002F5B]">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-[#687A86]">
            LAST UPDATED: FEBRUARY 2025 • COMPLIANT WITH DATA PROTECTION ACT 2012 (ACT 843)
          </p>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-[#06131D] leading-relaxed">
          <h2 className="text-xl font-bold text-[#002F5B]">1. Fundamental Privacy Philosophy</h2>
          <p>
            Braxvio Technologies builds digital products for essential everyday systems: higher education, healthcare fulfillment, waste management, and financial payouts. We believe human data is not a corporate monetizable asset. We do not sell, rent, or trade personal data, nor do we run behavioral advertising trackers.
          </p>

          <h2 className="text-xl font-bold text-[#002F5B]">2. Product-Specific Data Partitioning</h2>
          <p>
            Each Braxvio platform (Kampus, Pharmora, Ecolift, DevPay Africa) maintains isolated cryptographic data boundaries. Healthcare records inside Pharmora are encrypted in transit and at rest, accessible exclusively to authorized dispensing clinical staff. Student verification records inside Kampus are strictly used for verified housing and fraud prevention.
          </p>

          <h2 className="text-xl font-bold text-[#002F5B]">3. Data Retention & Deletion Rights</h2>
          <p>
            Users retain sovereign rights over their data. You can request a complete export or permanent cryptographic deletion of your account records at any time by contacting privacy@braxvio.com.
          </p>
        </div>
      </div>
    </div>
  );
}
