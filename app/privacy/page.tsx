import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Lock, 
  EyeOff, 
  Database, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Scale, 
  Globe, 
  UserCheck, 
  Mail, 
  Layers, 
  Clock, 
  Building2 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — Braxvio Technologies',
  description: 'Comprehensive data privacy policy, regulatory adherence, and sovereign user rights across all Braxvio platforms and products.',
};

export default function PrivacyPage() {
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
            <span className="px-3 py-1 rounded-full bg-[#002F5B] text-white font-semibold">
              Privacy
            </span>
            <Link 
              href="/terms" 
              className="px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-[#DDE8EC] dark:border-white/10 text-[#687A86] dark:text-slate-300 hover:text-[#002F5B] dark:hover:text-white transition-colors"
            >
              Terms
            </Link>
            <Link 
              href="/security" 
              className="px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-[#DDE8EC] dark:border-white/10 text-[#687A86] dark:text-slate-300 hover:text-[#002F5B] dark:hover:text-white transition-colors"
            >
              Security
            </Link>
          </div>
        </div>

        {/* Hero Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11AFC1]/10 border border-[#11AFC1]/30 text-[#006EAA] dark:text-[#42D6C5] text-[11px] font-mono uppercase tracking-widest font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DATA GOVERNANCE & PRIVACY ARCHITECTURE</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-[#002F5B] dark:text-white tracking-tight">
            Privacy Policy
          </h1>
          
          <p className="text-sm sm:text-base text-[#687A86] dark:text-slate-300 max-w-3xl leading-relaxed">
            This Privacy Policy articulates how Braxvio Technologies Limited and its subsidiaries collect, use, process, segregate, and protect personal data across our entire ecosystem of digital products, enterprise services, and platforms.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-[#687A86] dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#11AFC1]" />
              <span>EFFECTIVE DATE: {lastUpdated}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-[#42D6C5]" />
              <span>COMPLIANT WITH GHANA DATA PROTECTION ACT (ACT 843) & GDPR</span>
            </span>
          </div>
        </div>

        {/* Core Commitments Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#071F33] border border-[#DDE8EC] dark:border-white/10 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#11AFC1]/15 text-[#11AFC1] flex items-center justify-center">
              <EyeOff className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-[#002F5B] dark:text-white">Zero Behavioral Ads</h3>
            <p className="text-xs text-[#687A86] dark:text-slate-400 leading-relaxed">
              We never monetize personal data, deploy invasive third-party ad pixels, or sell user records to advertisers.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#071F33] border border-[#DDE8EC] dark:border-white/10 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#008FC4]/15 text-[#008FC4] flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-[#002F5B] dark:text-white">Platform Partitioning</h3>
            <p className="text-xs text-[#687A86] dark:text-slate-400 leading-relaxed">
              Each product (Kampus, Pharmora, Ecolift, DevPay) maintains isolated cryptographic databases and data boundaries.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#071F33] border border-[#DDE8EC] dark:border-white/10 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#42D6C5]/15 text-[#006EAA] dark:text-[#42D6C5] flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-[#002F5B] dark:text-white">Sovereign Data Rights</h3>
            <p className="text-xs text-[#687A86] dark:text-slate-400 leading-relaxed">
              Complete user sovereignty to export, rectify, or cryptographically erase personal records at any time.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="bg-white dark:bg-[#071F33] rounded-3xl border border-[#DDE8EC] dark:border-white/10 p-6 sm:p-10 shadow-sm space-y-12">
          
          {/* Section 1 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#002F5B] text-white text-xs font-mono font-bold flex items-center justify-center">
                01
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#002F5B] dark:text-white">
                Controller Identity & Scope
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#33475B] dark:text-slate-300 leading-relaxed pl-10">
              <p>
                This Privacy Policy is issued by <strong>Braxvio Technologies Limited</strong> (&ldquo;Braxvio&rdquo;, &ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), registered in the Republic of Ghana, operating across Africa and internationally. Braxvio acts as the Data Controller under the <em>Data Protection Act, 2012 (Act 843)</em> and the European Union General Data Protection Regulation (GDPR, Regulation EU 2016/679) where applicable.
              </p>
              <p>
                This policy governs all personal data collected through:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li>Our primary corporate website (<strong>braxvio.com</strong>) and subdomains;</li>
                <li>Our flagship digital products: <strong>Kampus</strong>, <strong>Pharmora</strong>, <strong>Ecolift</strong>, and <strong>DevPay Africa</strong>;</li>
                <li>Braxvio Labs, APIs, developer portals, research initiatives, and partnership portals;</li>
                <li>Offline engagements, institutional partnership inquiries, investor interactions, and customer support communications.</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#002F5B] text-white text-xs font-mono font-bold flex items-center justify-center">
                02
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#002F5B] dark:text-white">
                Information We Collect & Collection Methods
              </h2>
            </div>
            <div className="space-y-4 text-sm text-[#33475B] dark:text-slate-300 leading-relaxed pl-10">
              <p>
                We adhere to strict data minimization principles. We only collect information that is strictly necessary to deliver specific functional, contractual, and regulatory outcomes.
              </p>

              {/* Subsection: Account & General Data */}
              <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-white/5 border border-[#DDE8EC] dark:border-white/10 space-y-2">
                <h4 className="font-bold text-sm text-[#002F5B] dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#11AFC1]" />
                  A. Common Account & Profile Data
                </h4>
                <p className="text-xs sm:text-sm text-[#687A86] dark:text-slate-300">
                  When you register for any Braxvio service, we may collect your legal name, email address, telephone number, verified institution or business affiliation, role title, country of residence, and cryptographically hashed passwords. We never store plain-text passwords.
                </p>
              </div>

              {/* Subsection: Product-Specific Data */}
              <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-white/5 border border-[#DDE8EC] dark:border-white/10 space-y-3">
                <h4 className="font-bold text-sm text-[#002F5B] dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#008FC4]" />
                  B. Product-Specific Data Collections
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-3 rounded-lg bg-white dark:bg-[#061826] border border-[#DDE8EC] dark:border-white/10">
                    <span className="font-bold text-[#006EAA] dark:text-[#42D6C5] block mb-1">Kampus (Higher Education):</span>
                    <p className="text-xs text-[#687A86] dark:text-slate-400">
                      Student institutional email domain, student ID badge verification hashes, hostel reservation requests, verified campus landlord interactions, and peer marketplace communication transcripts.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white dark:bg-[#061826] border border-[#DDE8EC] dark:border-white/10">
                    <span className="font-bold text-[#006EAA] dark:text-[#42D6C5] block mb-1">Pharmora (Healthcare & Pharmacy):</span>
                    <p className="text-xs text-[#687A86] dark:text-slate-400">
                      Prescription documentation, licensed dispensary selections, delivery coordinates, and regulated medication dispensing timestamps. <em>Special category clinical data is subject to hardware-level AES-256 encryption.</em>
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white dark:bg-[#061826] border border-[#DDE8EC] dark:border-white/10">
                    <span className="font-bold text-[#006EAA] dark:text-[#42D6C5] block mb-1">Ecolift (Urban Waste Logistics):</span>
                    <p className="text-xs text-[#687A86] dark:text-slate-400">
                      Pickup location coordinates, waste category classification (recyclables, organic, e-waste), pickup frequency preferences, and digital municipal collection verification receipts.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white dark:bg-[#061826] border border-[#DDE8EC] dark:border-white/10">
                    <span className="font-bold text-[#006EAA] dark:text-[#42D6C5] block mb-1">DevPay Africa (Cross-Border Payouts):</span>
                    <p className="text-xs text-[#687A86] dark:text-slate-400">
                      Bank account routing codes, Mobile Money (MoMo) account identifiers, government-issued identity documents for statutory KYC/AML compliance, tax identification tokens, and transactional settlement ledgers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Subsection: Technical Data */}
              <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-white/5 border border-[#DDE8EC] dark:border-white/10 space-y-2">
                <h4 className="font-bold text-sm text-[#002F5B] dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#42D6C5]" />
                  C. Technical & Diagnostic Telemetry
                </h4>
                <p className="text-xs sm:text-sm text-[#687A86] dark:text-slate-300">
                  When you access our network, our servers automatically collect IP addresses, device identifiers, browser types, operating systems, session authorization tokens, and timestamped error logs for intrusion prevention, DDoS mitigation, and system health monitoring.
                </p>
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
                Legal Basis for Processing
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#33475B] dark:text-slate-300 leading-relaxed pl-10">
              <p>
                We only process personal data when permitted by lawful grounds under statutory data protection frameworks:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl border border-[#DDE8EC] dark:border-white/10">
                  <strong className="text-[#002F5B] dark:text-white block mb-1">1. Contractual Performance</strong>
                  <span>Processing required to execute user agreements, deliver product functionality, process payments, and verify bookings.</span>
                </div>
                <div className="p-3.5 rounded-xl border border-[#DDE8EC] dark:border-white/10">
                  <strong className="text-[#002F5B] dark:text-white block mb-1">2. Statutory Compliance</strong>
                  <span>Fulfilling legal obligations, anti-money laundering (AML) audits, pharmacy regulations, and tax reporting.</span>
                </div>
                <div className="p-3.5 rounded-xl border border-[#DDE8EC] dark:border-white/10">
                  <strong className="text-[#002F5B] dark:text-white block mb-1">3. Legitimate Interests</strong>
                  <span>Protecting network integrity, defending against cybersecurity threats, mitigating fraud, and maintaining auditability.</span>
                </div>
                <div className="p-3.5 rounded-xl border border-[#DDE8EC] dark:border-white/10">
                  <strong className="text-[#002F5B] dark:text-white block mb-1">4. Explicit Consent</strong>
                  <span>Obtained for specialized processing such as sensitive health prescription verification and optional notification channels.</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#002F5B] text-white text-xs font-mono font-bold flex items-center justify-center">
                04
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#002F5B] dark:text-white">
                Platform Partitioning & Strict Non-Sale
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#33475B] dark:text-slate-300 leading-relaxed pl-10">
              <div className="p-4 rounded-2xl bg-[#11AFC1]/10 border border-[#11AFC1]/25 text-[#002F5B] dark:text-white">
                <h4 className="font-bold text-sm mb-1 flex items-center gap-2 text-[#006EAA] dark:text-[#42D6C5]">
                  <Lock className="w-4 h-4" />
                  Our Non-Monetization Pledge
                </h4>
                <p className="text-xs sm:text-sm">
                  Braxvio has never sold, rented, or brokered personal data, and we never will. We do not participate in behavioral ad networks, data brokers, or cross-app tracking alliances.
                </p>
              </div>
              <p>
                Each Braxvio platform operates with isolated database boundaries. Information submitted on Kampus is not cross-referenced or combined with prescription orders on Pharmora or financial transactions on DevPay Africa without your affirmative, explicit consent.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#002F5B] text-white text-xs font-mono font-bold flex items-center justify-center">
                05
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#002F5B] dark:text-white">
                Sub-processors & Third-Party Sharing
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#33475B] dark:text-slate-300 leading-relaxed pl-10">
              <p>
                We only disclose data to third-party sub-processors when strictly required to provide our services under binding Data Processing Agreements (DPAs) requiring equivalent security controls:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li><strong>Cloud Infrastructure Providers:</strong> ISO 27001, SOC 2 Type II certified cloud hosting facilities (AWS, Google Cloud Platform) with physical and logical tenant isolation.</li>
                <li><strong>Licensed Payment Switches:</strong> PCI-DSS Level 1 compliant financial institutions, mobile network operators (MTN, Telecel, AirtelTigo), and central bank-regulated remittance gateways. Braxvio does not store full credit card numbers or banking PINs.</li>
                <li><strong>Telecommunications Gateways:</strong> Enterprise SMS and email dispatch providers (Twilio, SendGrid) used strictly for transactional one-time authentication codes (OTPs) and account notices.</li>
                <li><strong>Regulatory & Law Enforcement Authorities:</strong> Disclosed only upon receipt of a legally binding subpoena, warrant, or statutory court order complying with Ghanaian and international sovereign treaties.</li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#002F5B] text-white text-xs font-mono font-bold flex items-center justify-center">
                06
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#002F5B] dark:text-white">
                Data Retention & Cryptographic Deletion
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#33475B] dark:text-slate-300 leading-relaxed pl-10">
              <p>
                Personal data is retained only for as long as necessary to fulfill the primary purposes for which it was obtained:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li><strong>Active User Accounts:</strong> Maintained for the duration of the account lifetime.</li>
                <li><strong>Financial & Payment Records:</strong> Retained for seven (7) years to comply with statutory banking, tax audit, and anti-money laundering (AML) laws.</li>
                <li><strong>Clinical & Pharmacy Records:</strong> Maintained in compliance with national pharmacy council regulations and healthcare storage directives.</li>
                <li><strong>Diagnostic & Security Telemetry:</strong> Automatically purged on a rolling 30 to 90-day retention cycle.</li>
              </ul>
              <p>
                Upon verified request for account termination, non-statutory records undergo permanent cryptographic deletion from active production databases within 30 days.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#002F5B] text-white text-xs font-mono font-bold flex items-center justify-center">
                07
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#002F5B] dark:text-white">
                Your Sovereign Rights & How to Exercise Them
              </h2>
            </div>
            <div className="space-y-4 text-sm text-[#33475B] dark:text-slate-300 leading-relaxed pl-10">
              <p>
                Under the Data Protection Act (Act 843) and international data privacy statutes, you hold enforceable rights regarding your personal information:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-white/5 border border-[#DDE8EC] dark:border-white/10">
                  <strong className="text-[#002F5B] dark:text-white block mb-0.5">Right to Access</strong>
                  <span>Request an official copy of all personal records and processing activities tied to your account.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-white/5 border border-[#DDE8EC] dark:border-white/10">
                  <strong className="text-[#002F5B] dark:text-white block mb-0.5">Right to Rectification</strong>
                  <span>Update incomplete, outdated, or inaccurate personal information directly or via support.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-white/5 border border-[#DDE8EC] dark:border-white/10">
                  <strong className="text-[#002F5B] dark:text-white block mb-0.5">Right to Erasure (&ldquo;To Be Forgotten&rdquo;)</strong>
                  <span>Request permanent deletion of your data when no statutory justification for retention persists.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-white/5 border border-[#DDE8EC] dark:border-white/10">
                  <strong className="text-[#002F5B] dark:text-white block mb-0.5">Right to Data Portability</strong>
                  <span>Export your transactional and profile data in structured, machine-readable formats (JSON or CSV).</span>
                </div>
              </div>
              <p>
                To exercise any of these rights, contact our Data Protection Officer at <a href="mailto:privacy@braxvio.com" className="text-[#006EAA] dark:text-[#42D6C5] font-semibold underline">privacy@braxvio.com</a>. We acknowledge all requests within 48 hours and resolve verified requests within 30 calendar days.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#002F5B] text-white text-xs font-mono font-bold flex items-center justify-center">
                08
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#002F5B] dark:text-white">
                Cookies & Local Storage Policy
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#33475B] dark:text-slate-300 leading-relaxed pl-10">
              <p>
                Braxvio utilizes cookies and browser local storage strictly for functional, security, and authentication purposes.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li><strong>Essential Cookies:</strong> Encrypted JSON Web Tokens (JWT) and session identifiers required to keep you securely signed in.</li>
                <li><strong>Preference Storage:</strong> Local browser storage used to remember interface preferences such as dark mode or regional language selection.</li>
                <li><strong>No Advertising Cookies:</strong> We do not deploy third-party advertising cookies or cross-site tracking pixels.</li>
              </ul>
            </div>
          </section>

          {/* Section 9 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#002F5B] text-white text-xs font-mono font-bold flex items-center justify-center">
                09
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#002F5B] dark:text-white">
                Protection of Minors
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#33475B] dark:text-slate-300 leading-relaxed pl-10">
              <p>
                Our platforms are not directed to individuals under the age of 16 (or under 18 for financial services on DevPay Africa). We do not knowingly collect personal data from minors. If you believe a minor has provided personal information without verifiable parental consent, please contact us immediately for prompt deletion.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#002F5B] text-white text-xs font-mono font-bold flex items-center justify-center">
                10
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#002F5B] dark:text-white">
                Data Protection Officer & Inquiries
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#33475B] dark:text-slate-300 leading-relaxed pl-10">
              <p>
                For questions, clarifications, data access requests, or regulatory filings, contact our designated Data Protection Officer:
              </p>
              <div className="p-5 rounded-2xl bg-[#F8FAFC] dark:bg-white/5 border border-[#DDE8EC] dark:border-white/10 space-y-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-[#002F5B] dark:text-white font-bold">
                  <Building2 className="w-4 h-4 text-[#11AFC1]" />
                  <span>Braxvio Technologies Limited — Legal & Compliance Office</span>
                </div>
                <div className="space-y-1 text-[#687A86] dark:text-slate-300">
                  <p><strong>Attention:</strong> Data Protection Officer (DPO)</p>
                  <p><strong>Email:</strong> <a href="mailto:privacy@braxvio.com" className="text-[#006EAA] dark:text-[#42D6C5] underline">privacy@braxvio.com</a></p>
                  <p><strong>Physical Address:</strong> Braxvio HQ, Accra, Greater Accra, Republic of Ghana</p>
                  <p><strong>Supervisory Body:</strong> Data Protection Commission (DPC), Ghana</p>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Footer links to Terms and Security */}
        <div className="p-8 rounded-3xl bg-[#002F5B] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold">Explore Our Governance Architecture</h4>
            <p className="text-xs text-slate-300">
              Review our binding terms of service and institutional security standards.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/terms"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono font-bold tracking-wider uppercase transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              href="/security"
              className="px-5 py-2.5 rounded-xl bg-[#42D6C5] text-[#002F5B] hover:bg-white text-xs font-mono font-bold tracking-wider uppercase transition-colors"
            >
              Security Standards
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
