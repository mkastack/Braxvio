import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ShieldCheck, ArrowLeft, Lock, Key, Server } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Security Standards — Braxvio Technologies',
  description: 'Our security architecture, vulnerability reporting, and cryptographic data safeguards.'
};

export default function SecurityPage() {
  return (
    <div className="pt-28 pb-36 px-6 sm:px-8 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto space-y-12">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-[#687A86] hover:text-[#002F5B]">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN HOME</span>
        </Link>

        <div className="space-y-4 border-b border-[#DDE8EC] pb-8">
          <span className="text-xs font-mono tracking-widest uppercase text-[#006EAA] font-semibold">
            INFRASTRUCTURAL DEFENSE
          </span>
          <h1 className="text-4xl font-extrabold text-[#002F5B]">
            Security Standards
          </h1>
          <p className="text-xs font-mono text-[#687A86]">
            INSTITUTIONAL GRADE • CONTINUOUS VULNERABILITY AUDITS
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#F7FAFC] border border-[#DDE8EC] space-y-3">
            <Lock className="w-5 h-5 text-[#11AFC1]" />
            <h3 className="font-bold text-[#002F5B] text-sm">TLS 1.3 & AES-256</h3>
            <p className="text-xs text-[#687A86]">
              All communication channels are encrypted with modern cipher suites and perfect forward secrecy.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F7FAFC] border border-[#DDE8EC] space-y-3">
            <Key className="w-5 h-5 text-[#008FC4]" />
            <h3 className="font-bold text-[#002F5B] text-sm">Role-Based Vaults</h3>
            <p className="text-xs text-[#687A86]">
              Principle of least privilege enforced strictly via hardware security modules and multi-factor auth.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F7FAFC] border border-[#DDE8EC] space-y-3">
            <Server className="w-5 h-5 text-[#42D6C5]" />
            <h3 className="font-bold text-[#002F5B] text-sm">Immutable Audit Logs</h3>
            <p className="text-xs text-[#687A86]">
              Tamper-evident operational audit logs ensuring complete tracing of any state modification.
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-[#06131D] leading-relaxed pt-4">
          <h2 className="text-xl font-bold text-[#002F5B]">Coordinated Vulnerability Disclosure</h2>
          <p>
            We welcome responsible security disclosures from independent researchers. If you identify a potential security vulnerability across any Braxvio domain, please report it immediately to security@braxvio.com with reproduction steps and PGP key encryption where applicable.
          </p>
        </div>
      </div>
    </div>
  );
}
