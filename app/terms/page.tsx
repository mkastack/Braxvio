import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service — Braxvio Technologies',
  description: 'Terms governing the access and use of Braxvio products and platforms.'
};

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-xs font-mono text-[#687A86]">
            EFFECTIVE AS OF FEBRUARY 2025
          </p>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-[#06131D] leading-relaxed">
          <h2 className="text-xl font-bold text-[#002F5B]">1. Scope of Agreement</h2>
          <p>
            By accessing or interacting with Braxvio Technologies websites, applications, and digital platforms, you agree to these Terms of Service. These terms apply across all parent company properties and subsidiary product ecosystems.
          </p>

          <h2 className="text-xl font-bold text-[#002F5B]">2. Product-Specific Terms & Regulatory Adherence</h2>
          <p>
            Individual products within the Braxvio ecosystem (such as Pharmora for clinical medication access or DevPay Africa for cross-border financial transactions) may operate under additional regulatory disclosures complying with applicable sovereign laws, including pharmacy licensing and central banking remittances.
          </p>

          <h2 className="text-xl font-bold text-[#002F5B]">3. Intellectual Property</h2>
          <p>
            The Braxvio System architecture, visual identity, proprietary brand tokens, product software codebases, and digital assets are the exclusive intellectual property of Braxvio Technologies.
          </p>
        </div>
      </div>
    </div>
  );
}
