import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Lock, 
  Key, 
  Server, 
  Cpu, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  Clock, 
  Mail, 
  Terminal, 
  Building2, 
  Eye, 
  RefreshCw,
  HardDriveDownload,
  Activity,
  FileCode2,
  ShieldAlert
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Security Standards & Infrastructure — Braxvio Technologies',
  description: 'Technical whitepaper on Braxvio institutional security, zero-trust architecture, cryptographic safeguards, and vulnerability disclosure.',
};

export default function SecurityPage() {
  const lastUpdated = 'October 2026';

  return (
    <div className="pt-24 sm:pt-28 lg:pt-32 pb-24 sm:pb-36 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] dark:bg-[#06131D] min-h-screen text-[#06131D] dark:text-slate-100">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Navigation Breadcrumb & Legal Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DDE8EC] dark:border-white/10 pb-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-mono text-[#687A86] hover:text-[#002F5B] dark:hover:text-[#42D6C5] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN HOME</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono">
            <Link 
              href="/privacy" 
              className="px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-[#DDE8EC] dark:border-white/10 text-[#687A86] dark:text-slate-300 hover:text-[#002F5B] dark:hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link 
              href="/terms" 
              className="px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-[#DDE8EC] dark:border-white/10 text-[#687A86] dark:text-slate-300 hover:text-[#002F5B] dark:hover:text-white transition-colors"
            >
              Terms
            </Link>
            <span className="px-3 py-1 rounded-full bg-[#002F5B] text-white font-semibold">
              Security
            </span>
          </div>
        </div>

        {/* Hero Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#42D6C5]/10 border border-[#42D6C5]/30 text-[#006EAA] dark:text-[#42D6C5] text-[11px] font-mono uppercase tracking-widest font-bold">
            <Lock className="w-3.5 h-3.5" />
            <span>INSTITUTIONAL DEFENSE & CRYPTOGRAPHIC STANDARDS</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-[#002F5B] dark:text-white tracking-tight">
            Security Architecture
          </h1>
          
          <p className="text-sm sm:text-base text-[#687A86] dark:text-slate-300 max-w-3xl leading-relaxed">
            Braxvio engineering operates on a defense-in-depth model with zero-trust network access, end-to-end encryption, multi-tenant database isolation, and continuous third-party vulnerability auditing.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-[#687A86] dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#11AFC1]" />
              <span>STANDARDS AUDITED: {lastUpdated}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#42D6C5]" />
              <span>24/7/365 ACTIVE SOC & TELEMETRY</span>
            </span>
          </div>
        </div>

        {/* 3 Core Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#071F33] border border-[#DDE8EC] dark:border-white/10 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#11AFC1]/15 text-[#11AFC1] flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#002F5B] dark:text-white">TLS 1.3 & AES-256-GCM</h3>
            <p className="text-xs text-[#687A86] dark:text-slate-400 leading-relaxed">
              All network communications are strictly enforced over TLS 1.3 with Perfect Forward Secrecy. Data at rest is encrypted with AES-256 via Cloud Hardware Security Modules (HSM).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#071F33] border border-[#DDE8EC] dark:border-white/10 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#008FC4]/15 text-[#008FC4] flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#002F5B] dark:text-white">Zero-Trust & FIDO2 MFA</h3>
            <p className="text-xs text-[#687A86] dark:text-slate-400 leading-relaxed">
              Internal engineering systems enforce mandatory FIDO2 hardware keys, role-based access control (RBAC), and least-privilege scoping across all database queries.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#071F33] border border-[#DDE8EC] dark:border-white/10 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#42D6C5]/15 text-[#006EAA] dark:text-[#42D6C5] flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#002F5B] dark:text-white">Immutable Audit Ledgers</h3>
            <p className="text-xs text-[#687A86] dark:text-slate-400 leading-relaxed">
              Critical administrative mutations, financial transitions, and health record accesses generate tamper-evident, append-only cryptographic audit trails.
            </p>
          </div>
        </div>

        {/* Detailed Technical Whitepaper Sections */}
        <div className="bg-white dark:bg-[#071F33] rounded-3xl border border-[#DDE8EC] dark:border-white/10 p-6 sm:p-10 shadow-sm space-y-12">
          
          {/* Section 1 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#002F5B] text-white text-xs font-mono font-bold flex items-center justify-center">
                01
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#002F5B] dark:text-white">
                Data Protection & Cryptographic Protocols
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#33475B] dark:text-slate-300 leading-relaxed pl-10">
              <p>
                Braxvio enforces strict cryptographic standards across all transmission channels and persistent storage layers:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-white/5 border border-[#DDE8EC] dark:border-white/10 space-y-1.5">
                  <span className="font-bold text-[#002F5B] dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#11AFC1]" />
                    In-Transit Cryptography
                  </span>
                  <p className="text-xs text-[#687A86] dark:text-slate-400">
                    Enforced HTTPS with mandatory HTTP Strict Transport Security (HSTS, max-age 31536000 with preloading). We reject legacy protocols (TLS 1.0, 1.1, 1.2 deprecated) in favor of modern ECDHE-RSA/ECDHE-ECDSA cipher suites.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-white/5 border border-[#DDE8EC] dark:border-white/10 space-y-1.5">
                  <span className="font-bold text-[#002F5B] dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#11AFC1]" />
                    At-Rest Encryption
                  </span>
                  <p className="text-xs text-[#687A86] dark:text-slate-400">
                    Primary PostgreSQL databases, Redis cache layers, and object storage volumes are encrypted with AES-256. Cryptographic keys are managed via AWS KMS / Google Cloud KMS with automated annual rotation cycles.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#002F5B] text-white text-xs font-mono font-bold flex items-center justify-center">
                02
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#002F5B] dark:text-white">
                Venture-Specific Security Partitions
              </h2>
            </div>
            <div className="space-y-4 text-sm text-[#33475B] dark:text-slate-300 leading-relaxed pl-10">
              <p>
                Braxvio products maintain segregated Virtual Private Clouds (VPCs) and tenant databases to eliminate any possibility of unauthorized cross-application data leakage:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl border border-[#DDE8EC] dark:border-white/10 bg-[#F8FAFC] dark:bg-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#002F5B] dark:text-white">Pharmora Healthcare Security</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#008FC4]/20 text-[#006EAA] dark:text-[#42D6C5]">HIPAA-ALIGNED</span>
                  </div>
                  <p className="text-xs text-[#687A86] dark:text-slate-400">
                    Prescription data and medication histories are segregated inside a clinical VPC with zero public internet ingress. Direct pharmacist queries are bound to licensed professional credentials with granular audit logging.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-[#DDE8EC] dark:border-white/10 bg-[#F8FAFC] dark:bg-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#002F5B] dark:text-white">DevPay Africa Financial Vault</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#11AFC1]/20 text-[#006EAA] dark:text-[#42D6C5]">PCI-DSS LEVEL 1</span>
                  </div>
                  <p className="text-xs text-[#687A86] dark:text-slate-400">
                    Payment details are tokenized prior to reaching Braxvio application servers. Financial state transitions operate on an immutable double-entry ledger with real-time heuristic AML anomaly detection.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-[#DDE8EC] dark:border-white/10 bg-[#F8FAFC] dark:bg-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#002F5B] dark:text-white">Kampus Identity Verification</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#42D6C5]/20 text-[#006EAA] dark:text-[#42D6C5]">ANTI-IMPERSONATION</span>
                  </div>
                  <p className="text-xs text-[#687A86] dark:text-slate-400">
                    Student identity checks are verified via cryptographic institutional domain challenges and document hashing, preventing identity spoofing without exposing unnecessary personal documents to peers.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-[#DDE8EC] dark:border-white/10 bg-[#F8FAFC] dark:bg-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#002F5B] dark:text-white">Ecolift Logistics Integrity</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#002F5B]/20 dark:bg-white/20 text-[#006EAA] dark:text-[#42D6C5]">TAMPER-PROOF GPS</span>
                  </div>
                  <p className="text-xs text-[#687A86] dark:text-slate-400">
                    Municipal waste manifests and driver pickups are cryptographically signed and cross-referenced with geofenced location telemetry to prevent fake disposal receipts.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#002F5B] text-white text-xs font-mono font-bold flex items-center justify-center">
                03
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#002F5B] dark:text-white">
                DevSecOps & Software Supply Chain
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#33475B] dark:text-slate-300 leading-relaxed pl-10">
              <p>
                Security is embedded directly into our Continuous Integration and Continuous Deployment (CI/CD) pipelines:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li><strong>Static Application Security Testing (SAST):</strong> Every pull request undergoes automated static code analysis scanning for SQL injection, cross-site scripting (XSS), and insecure dependencies.</li>
                <li><strong>Supply Chain Verification:</strong> Automated dependency monitoring tools (Dependabot, Snyk) track software bill of materials (SBOM) and block vulnerable npm/cargo packages prior to build approval.</li>
                <li><strong>Mandatory Dual Peer Review:</strong> No engineer can push code directly to production. Every code change requires documented approval from at least two senior software engineers.</li>
                <li><strong>Third-Party Penetration Testing:</strong> We engage independent CREST-accredited cybersecurity firms annually to conduct rigorous black-box and white-box penetration tests across all public endpoints and APIs.</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#002F5B] text-white text-xs font-mono font-bold flex items-center justify-center">
                04
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#002F5B] dark:text-white">
                Incident Response Framework & SLAs
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#33475B] dark:text-slate-300 leading-relaxed pl-10">
              <p>
                Our dedicated Security Operations Center (SOC) operates 24/7/365 to triage alerts and mitigate anomalies under disciplined Service Level Agreements:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-[#DDE8EC] dark:border-white/10 rounded-xl overflow-hidden">
                  <thead className="bg-[#F8FAFC] dark:bg-white/5 text-[#002F5B] dark:text-white font-mono uppercase">
                    <tr>
                      <th className="p-3 border-b border-[#DDE8EC] dark:border-white/10">Severity</th>
                      <th className="p-3 border-b border-[#DDE8EC] dark:border-white/10">Definition</th>
                      <th className="p-3 border-b border-[#DDE8EC] dark:border-white/10">Response SLA</th>
                      <th className="p-3 border-b border-[#DDE8EC] dark:border-white/10">Resolution Target</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DDE8EC] dark:divide-white/10">
                    <tr>
                      <td className="p-3 font-bold text-red-600 dark:text-red-400">P1 — Critical</td>
                      <td className="p-3">Active data breach, total service outage, or cryptographic key compromise.</td>
                      <td className="p-3 font-mono font-bold">&lt; 15 Minutes</td>
                      <td className="p-3 font-mono">&lt; 4 Hours</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-amber-600 dark:text-amber-400">P2 — High</td>
                      <td className="p-3">Significant service degradation, high-risk vulnerability without confirmed exploit.</td>
                      <td className="p-3 font-mono font-bold">&lt; 1 Hour</td>
                      <td className="p-3 font-mono">&lt; 12 Hours</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#006EAA] dark:text-[#42D6C5]">P3 — Medium</td>
                      <td className="p-3">Isolated non-critical bug, configuration flaw with low exploitability.</td>
                      <td className="p-3 font-mono font-bold">&lt; 6 Hours</td>
                      <td className="p-3 font-mono">&lt; 48 Hours</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-[#687A86] dark:text-slate-400">P4 — Low</td>
                      <td className="p-3">Informational finding, minor security header recommendation.</td>
                      <td className="p-3 font-mono font-bold">&lt; 24 Hours</td>
                      <td className="p-3 font-mono">Next Sprint Cycle</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#002F5B] text-white text-xs font-mono font-bold flex items-center justify-center">
                05
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#002F5B] dark:text-white">
                Business Continuity & High Availability
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#33475B] dark:text-slate-300 leading-relaxed pl-10">
              <p>
                Our infrastructure is engineered for resilience against localized physical disasters, power grid disruptions, and fiber cuts:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-white/5 border border-[#DDE8EC] dark:border-white/10">
                  <span className="text-2xl font-black text-[#006EAA] dark:text-[#42D6C5] font-mono">99.9%</span>
                  <p className="text-xs text-[#687A86] dark:text-slate-400 mt-1">Uptime Service Level Objective</p>
                </div>
                <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-white/5 border border-[#DDE8EC] dark:border-white/10">
                  <span className="text-2xl font-black text-[#006EAA] dark:text-[#42D6C5] font-mono">&lt; 15 min</span>
                  <p className="text-xs text-[#687A86] dark:text-slate-400 mt-1">Recovery Point Objective (RPO)</p>
                </div>
                <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-white/5 border border-[#DDE8EC] dark:border-white/10">
                  <span className="text-2xl font-black text-[#006EAA] dark:text-[#42D6C5] font-mono">&lt; 1 hr</span>
                  <p className="text-xs text-[#687A86] dark:text-slate-400 mt-1">Recovery Time Objective (RTO)</p>
                </div>
              </div>
              <p className="text-xs text-[#687A86] dark:text-slate-400 pt-1">
                Continuous point-in-time database backups (PITR) are mirrored geographically to secure off-site secondary regions with automated failover testing conducted on a bi-monthly schedule.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#002F5B] text-white text-xs font-mono font-bold flex items-center justify-center">
                06
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#002F5B] dark:text-white">
                Coordinated Vulnerability Disclosure & Safe Harbor
              </h2>
            </div>
            <div className="space-y-4 text-sm text-[#33475B] dark:text-slate-300 leading-relaxed pl-10">
              <p>
                Braxvio welcomes responsible security disclosures from independent cybersecurity researchers, white-hat ethical hackers, and academic institutions.
              </p>
              
              <div className="p-4 rounded-xl bg-[#11AFC1]/10 border border-[#11AFC1]/25 text-[#002F5B] dark:text-white space-y-1.5">
                <span className="font-bold text-sm flex items-center gap-2 text-[#006EAA] dark:text-[#42D6C5]">
                  <ShieldCheck className="w-4 h-4" />
                  Our Safe Harbor Commitment
                </span>
                <p className="text-xs sm:text-sm">
                  If you conduct vulnerability research in good faith compliance with these principles—without disrupting user services, degrading production availability, or accessing customer personal data—Braxvio will not pursue legal action against you or request law enforcement investigation.
                </p>
              </div>

              <div className="space-y-2 text-xs sm:text-sm">
                <h4 className="font-bold text-[#002F5B] dark:text-white">Reporting Guidelines:</h4>
                <ul className="list-disc pl-5 space-y-1 text-[#687A86] dark:text-slate-300">
                  <li>Email your report directly to <a href="mailto:security@braxvio.com" className="text-[#006EAA] dark:text-[#42D6C5] underline font-semibold">security@braxvio.com</a>.</li>
                  <li>Include detailed, reproducible step-by-step instructions or proof-of-concept (PoC) code.</li>
                  <li>Provide us a reasonable timeline of at least 90 days to remediate the vulnerability before public disclosure.</li>
                  <li>Do not execute automated DDoS attacks, social engineering (phishing) targeting Braxvio personnel, or physical facility intrusions.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#002F5B] text-white text-xs font-mono font-bold flex items-center justify-center">
                07
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#002F5B] dark:text-white">
                Contact Security Operations
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#33475B] dark:text-slate-300 leading-relaxed pl-10">
              <p>
                To communicate with our security response team or transmit sensitive vulnerability disclosures:
              </p>
              <div className="p-5 rounded-2xl bg-[#F8FAFC] dark:bg-white/5 border border-[#DDE8EC] dark:border-white/10 space-y-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-[#002F5B] dark:text-white font-bold">
                  <Terminal className="w-4 h-4 text-[#11AFC1]" />
                  <span>Braxvio Security Operations & Computer Incident Response Team (CIRT)</span>
                </div>
                <div className="space-y-1 text-[#687A86] dark:text-slate-300">
                  <p><strong>Primary Vulnerability Ingestion:</strong> <a href="mailto:security@braxvio.com" className="text-[#006EAA] dark:text-[#42D6C5] underline font-semibold">security@braxvio.com</a></p>
                  <p><strong>PGP Key Fingerprint:</strong> <code className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono text-[11px]">8F4B 29C1 E7A4 509D 31F6 820C 7BE3 410A</code></p>
                  <p><strong>Corporate Escalations:</strong> Legal & Compliance, Braxvio HQ, Accra, Ghana</p>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Footer links to Privacy and Terms */}
        <div className="p-8 rounded-3xl bg-[#002F5B] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold">Comprehensive Trust & Compliance</h4>
            <p className="text-xs text-slate-300">
              Read our full Privacy Policy and governing Terms of Service.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/privacy"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono font-bold tracking-wider uppercase transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms"
              className="px-5 py-2.5 rounded-xl bg-[#42D6C5] text-[#002F5B] hover:bg-white text-xs font-mono font-bold tracking-wider uppercase transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
