import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  FileText, 
  ArrowLeft, 
  ShieldCheck, 
  AlertTriangle, 
  Scale, 
  Clock, 
  CheckCircle2, 
  Gavel, 
  Ban, 
  HelpCircle, 
  Building2, 
  CreditCard,
  Briefcase
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service — Braxvio Technologies',
  description: 'Legally binding terms governing access and use of Braxvio products, platforms, APIs, and digital infrastructure.',
};

export default function TermsPage() {
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
            <span className="px-3 py-1 rounded-full bg-[#002F5B] text-white font-semibold">
              Terms
            </span>
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#008FC4]/10 border border-[#008FC4]/30 text-[#006EAA] dark:text-[#42D6C5] text-[11px] font-mono uppercase tracking-widest font-bold">
            <Scale className="w-3.5 h-3.5" />
            <span>LEGAL ARCHITECTURE & USER AGREEMENT</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-[#002F5B] dark:text-white tracking-tight">
            Terms of Service
          </h1>
          
          <p className="text-sm sm:text-base text-[#687A86] dark:text-slate-300 max-w-3xl leading-relaxed">
            These Terms of Service constitute a legally binding agreement between you and Braxvio Technologies Limited governing your access to and use of all websites, platforms, applications, and APIs across the Braxvio ecosystem.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-[#687A86] dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#11AFC1]" />
              <span>EFFECTIVE DATE: {lastUpdated}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Gavel className="w-3.5 h-3.5 text-[#42D6C5]" />
              <span>GOVERNED BY THE LAWS OF GHANA & INTERNATIONAL COMMERCIAL STANDARDS</span>
            </span>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#071F33] border border-[#DDE8EC] dark:border-white/10 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#002F5B]/10 dark:bg-white/10 text-[#002F5B] dark:text-[#42D6C5] flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-[#002F5B] dark:text-white">Unified Scope</h3>
            <p className="text-xs text-[#687A86] dark:text-slate-400 leading-relaxed">
              These terms govern Braxvio parent properties and all subsidiary ventures: Kampus, Pharmora, Ecolift, and DevPay Africa.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#071F33] border border-[#DDE8EC] dark:border-white/10 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#11AFC1]/15 text-[#11AFC1] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-[#002F5B] dark:text-white">Verified Conduct</h3>
            <p className="text-xs text-[#687A86] dark:text-slate-400 leading-relaxed">
              Users must provide authentic verification. Fraudulent listings, malicious activity, and scams result in immediate termination.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#071F33] border border-[#DDE8EC] dark:border-white/10 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#42D6C5]/15 text-[#006EAA] dark:text-[#42D6C5] flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-[#002F5B] dark:text-white">Dispute Resolution</h3>
            <p className="text-xs text-[#687A86] dark:text-slate-400 leading-relaxed">
              Disputes are resolved through structured informal mediation followed by binding commercial arbitration in Accra, Ghana.
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
                Acceptance of Terms & Mutual Intent
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#33475B] dark:text-slate-300 leading-relaxed pl-10">
              <p>
                By creating an account, downloading our mobile applications, accessing our APIs, or browsing any digital property owned or operated by <strong>Braxvio Technologies Limited</strong> (&ldquo;Braxvio&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), you expressly agree to be bound by these Terms of Service, our Privacy Policy, and any supplemental product-specific rules incorporated herein by reference.
              </p>
              <p>
                If you are entering into these terms on behalf of a corporation, academic institution, healthcare facility, or governmental agency, you represent and warrant that you hold full legal authority to bind such entity. If you do not agree to these terms, you must immediately cease accessing and using all Braxvio services.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#002F5B] text-white text-xs font-mono font-bold flex items-center justify-center">
                02
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#002F5B] dark:text-white">
                Eligibility & Account Integrity
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#33475B] dark:text-slate-300 leading-relaxed pl-10">
              <p>
                To utilize Braxvio services, you must satisfy the following statutory conditions:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li>You must be at least 18 years of age (or the legal age of majority in your jurisdiction) to initiate financial contracts, conduct transactions, or rent accommodation. Minor students aged 16–17 accessing Kampus must have verifiable parental or guardian authorization.</li>
                <li>You must provide accurate, complete, and current registration and identity verification information.</li>
                <li>You are solely responsible for maintaining the confidentiality of your authentication credentials, session tokens, and passwords.</li>
                <li>You must immediately notify Braxvio at <a href="mailto:security@braxvio.com" className="text-[#006EAA] dark:text-[#42D6C5] font-semibold underline">security@braxvio.com</a> upon detecting any unauthorized access or security breach affecting your account.</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#002F5B] text-white text-xs font-mono font-bold flex items-center justify-center">
                03
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#002F5B] dark:text-white">
                Product-Specific Operating Charters
              </h2>
            </div>
            <div className="space-y-4 text-sm text-[#33475B] dark:text-slate-300 leading-relaxed pl-10">
              <p>
                Because Braxvio operates a diverse technology portfolio, the following venture-specific rules apply whenever you interact with each respective platform:
              </p>

              {/* Kampus */}
              <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-white/5 border border-[#DDE8EC] dark:border-white/10 space-y-2">
                <h4 className="font-bold text-sm text-[#002F5B] dark:text-white flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#11AFC1]/20 text-[#006EAA] dark:text-[#42D6C5]">01 / KAMPUS</span>
                  Higher Education & Student Living
                </h4>
                <p className="text-xs sm:text-sm text-[#687A86] dark:text-slate-300">
                  Kampus provides student verification, hostel listings, and campus marketplace channels. Hostel operators warrant that listings represent authentic, physically inspected properties complying with local zoning and sanitation standards. Subletting scams, fake deposit requests, or extortionate listing fees are strictly prohibited. Peer marketplace transactions are peer-to-peer; Braxvio does not manufacture or guarantee peer-traded items.
                </p>
              </div>

              {/* Pharmora */}
              <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-white/5 border border-[#DDE8EC] dark:border-white/10 space-y-2">
                <h4 className="font-bold text-sm text-[#002F5B] dark:text-white flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#008FC4]/20 text-[#006EAA] dark:text-[#42D6C5]">02 / PHARMORA</span>
                  Healthcare & Regulated Pharmacy Network
                </h4>
                <p className="text-xs sm:text-sm text-[#687A86] dark:text-slate-300">
                  <strong>Critical Medical Notice:</strong> Pharmora is a software logistics bridge connecting patients with certified, independent community pharmacies and licensed couriers. Pharmora is <em>not</em> a doctor, hospital, or prescribing clinical entity. All prescription orders are subject to independent validation and clinical discretion by licensed pharmacists. <strong>In the event of a medical emergency, do not rely on Pharmora; contact emergency medical services or visit the nearest hospital emergency department immediately.</strong>
                </p>
              </div>

              {/* Ecolift */}
              <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-white/5 border border-[#DDE8EC] dark:border-white/10 space-y-2">
                <h4 className="font-bold text-sm text-[#002F5B] dark:text-white flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#42D6C5]/20 text-[#006EAA] dark:text-[#42D6C5]">03 / ECOLIFT</span>
                  Urban Waste Logistics & Clean Technology
                </h4>
                <p className="text-xs sm:text-sm text-[#687A86] dark:text-slate-300">
                  Users scheduling waste collection warrant that declared waste streams match reality. The disposal of untreated biohazardous clinical waste, radioactive materials, industrial chemicals, or explosives via standard residential/commercial collection queues is strictly prohibited and subject to criminal reporting under Ghanaian and municipal environmental protection statutes.
                </p>
              </div>

              {/* DevPay Africa */}
              <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-white/5 border border-[#DDE8EC] dark:border-white/10 space-y-2">
                <h4 className="font-bold text-sm text-[#002F5B] dark:text-white flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#002F5B]/20 dark:bg-white/20 text-[#006EAA] dark:text-[#42D6C5]">04 / DEVPAY AFRICA</span>
                  Cross-Border Invoicing & Developer Payouts
                </h4>
                <p className="text-xs sm:text-sm text-[#687A86] dark:text-slate-300">
                  DevPay Africa enables African developers, designers, and software agencies to receive international payments. Users warrant that all processed funds represent legitimate remuneration for lawful technical or digital services. Users must comply with applicable anti-money laundering (AML) and sanctions laws. Braxvio reserves the right to freeze accounts or withhold payouts pending verification if suspicious transaction velocity or compliance flags occur. Users are solely responsible for filing their sovereign income and corporate tax declarations.
                </p>
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
                Prohibited Conduct & Acceptable Use
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#33475B] dark:text-slate-300 leading-relaxed pl-10">
              <p>
                You agree not to engage in any of the following prohibited activities across any Braxvio platform:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3 rounded-lg border border-red-200 dark:border-red-950/50 bg-red-50/50 dark:bg-red-950/10 space-y-1">
                  <strong className="text-red-700 dark:text-red-400 flex items-center gap-1.5">
                    <Ban className="w-3.5 h-3.5" />
                    Automated Scraping & Reverse Engineering
                  </strong>
                  <span className="text-[#687A86] dark:text-slate-400 text-xs">
                    Deploying unauthorized scrapers, spiders, bot networks, or attempting to reverse compile Braxvio source code, algorithms, or API endpoints.
                  </span>
                </div>

                <div className="p-3 rounded-lg border border-red-200 dark:border-red-950/50 bg-red-50/50 dark:bg-red-950/10 space-y-1">
                  <strong className="text-red-700 dark:text-red-400 flex items-center gap-1.5">
                    <Ban className="w-3.5 h-3.5" />
                    Identity Impersonation & Fraud
                  </strong>
                  <span className="text-[#687A86] dark:text-slate-400 text-xs">
                    Misrepresenting institutional affiliations, uploading counterfeit academic documents, forging prescriptions, or spoofing payment credentials.
                  </span>
                </div>

                <div className="p-3 rounded-lg border border-red-200 dark:border-red-950/50 bg-red-50/50 dark:bg-red-950/10 space-y-1">
                  <strong className="text-red-700 dark:text-red-400 flex items-center gap-1.5">
                    <Ban className="w-3.5 h-3.5" />
                    Network Disruption & Attacks
                  </strong>
                  <span className="text-[#687A86] dark:text-slate-400 text-xs">
                    Initiating denial-of-service (DDoS) attacks, injecting malicious payloads, probing production vulnerabilities without authorized coordination.
                  </span>
                </div>

                <div className="p-3 rounded-lg border border-red-200 dark:border-red-950/50 bg-red-50/50 dark:bg-red-950/10 space-y-1">
                  <strong className="text-red-700 dark:text-red-400 flex items-center gap-1.5">
                    <Ban className="w-3.5 h-3.5" />
                    Harassment & Abuse
                  </strong>
                  <span className="text-[#687A86] dark:text-slate-400 text-xs">
                    Engaging in defamatory, harassing, sexually explicit, abusive, or discriminatory behavior toward community members, drivers, couriers, or staff.
                  </span>
                </div>
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
                Intellectual Property & Proprietary Rights
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#33475B] dark:text-slate-300 leading-relaxed pl-10">
              <p>
                The entire Braxvio System architecture, visual designs, brand marks, logos, user interfaces, documentation, APIs, proprietary codebases, trade secrets, and patents are the exclusive intellectual property of <strong>Braxvio Technologies Limited</strong>.
              </p>
              <p>
                We grant you a limited, non-exclusive, non-transferable, revocable license to access and use our platforms strictly in compliance with these terms. You may not copy, reproduce, distribute, create derivative works from, or publicly display any Braxvio intellectual property without prior written permission.
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
                Fees, Invoicing, Currency & Refunds
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#33475B] dark:text-slate-300 leading-relaxed pl-10">
              <p>
                Certain services across the Braxvio ecosystem require payment of transaction fees, subscription fees, or service surcharges:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li><strong>Fee Transparency:</strong> All platform commission rates, payment gateway charges, and courier fulfillment fees are presented transparently before transaction confirmation.</li>
                <li><strong>Currency & FX:</strong> Transactions are billed in Ghanaian Cedi (GHS), US Dollars (USD), or regional sovereign currencies. Exchange rates for cross-border conversions are established dynamically by authorized banking liquidity providers.</li>
                <li><strong>Refund Policy:</strong> Due to the logistical nature of on-demand services (medication couriers, dispatch waste collection, completed contractor payouts), fees are generally non-refundable once fulfillment commences. Disputes regarding unfulfilled services or verified fraudulent charges may be escalated to <a href="mailto:support@braxvio.com" className="text-[#006EAA] dark:text-[#42D6C5] underline font-semibold">support@braxvio.com</a> for structured resolution.</li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#002F5B] text-white text-xs font-mono font-bold flex items-center justify-center">
                07
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#002F5B] dark:text-white">
                Disclaimer of Warranties (&ldquo;AS IS&rdquo;)
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#33475B] dark:text-slate-300 leading-relaxed pl-10">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[#002F5B] dark:text-amber-200">
                <p className="text-xs sm:text-sm font-medium">
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ALL BRAXVIO PLATFORMS, APIS, AND SERVICES ARE PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS, WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
                </p>
              </div>
              <p>
                We do not warrant that our services will operate completely uninterrupted, bug-free, or devoid of transient telecommunications downtime. Scheduled maintenance windows will be communicated in advance whenever feasible.
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
                Limitation of Liability
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#33475B] dark:text-slate-300 leading-relaxed pl-10">
              <p>
                IN NO EVENT SHALL BRAXVIO TECHNOLOGIES LIMITED, ITS DIRECTORS, OFFICERS, EMPLOYEES, AFFILIATES, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES (INCLUDING LOSS OF PROFITS, DATA, USE, GOODWILL, OR BUSINESS INTERRUPTION) ARISING OUT OF OR IN CONNECTION WITH YOUR USE OR INABILITY TO USE OUR SERVICES.
              </p>
              <p>
                OUR TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS ARISING UNDER THESE TERMS SHALL NOT EXCEED THE GREATER OF ONE HUNDRED US DOLLARS (USD $100) OR THE TOTAL FEES PAID BY YOU TO BRAXVIO IN THE SIX (6) MONTHS PRECEDING THE OCCURRENCE GIVING RISE TO LIABILITY.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#002F5B] text-white text-xs font-mono font-bold flex items-center justify-center">
                09
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#002F5B] dark:text-white">
                Governing Law & Dispute Resolution
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#33475B] dark:text-slate-300 leading-relaxed pl-10">
              <p>
                These Terms of Service and any non-contractual obligations arising out of or in connection with them shall be governed by and construed in accordance with the substantive laws of the <strong>Republic of Ghana</strong>, without regard to principles of conflicts of law.
              </p>
              <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-white/5 border border-[#DDE8EC] dark:border-white/10 space-y-2 text-xs sm:text-sm">
                <strong className="text-[#002F5B] dark:text-white block font-bold">Mandatory Dispute Resolution Procedure:</strong>
                <ol className="list-decimal pl-5 space-y-1.5 text-[#687A86] dark:text-slate-300">
                  <li><strong>Informal Negotiation:</strong> Parties agree to attempt in good faith to resolve any dispute through informal discussions for at least thirty (30) days from written notification.</li>
                  <li><strong>Binding Arbitration:</strong> If unresolved, the dispute shall be submitted to and finally resolved by commercial arbitration administered under the <em>Alternative Dispute Resolution Act, 2010 (Act 798)</em> of Ghana. The seat and venue of arbitration shall be Accra, Ghana, and proceedings shall be conducted in English by a single mutually agreed arbitrator.</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Section 10 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#002F5B] text-white text-xs font-mono font-bold flex items-center justify-center">
                10
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#002F5B] dark:text-white">
                Termination & Account Suspension
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#33475B] dark:text-slate-300 leading-relaxed pl-10">
              <p>
                You may terminate your account at any time by accessing account settings or contacting support. Braxvio reserves the right to suspend, restrict, or permanently terminate your access to any or all platforms without prior notice in the event of:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                <li>Material breach of these Terms or related policies;</li>
                <li>Fraudulent, abusive, or unlawful conduct;</li>
                <li>Statutory directive or legal obligation by sovereign regulatory authorities;</li>
                <li>Prolonged account inactivity posing security exposure.</li>
              </ul>
            </div>
          </section>

          {/* Section 11 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#002F5B] text-white text-xs font-mono font-bold flex items-center justify-center">
                11
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#002F5B] dark:text-white">
                Legal Notice & Corporate Contacts
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#33475B] dark:text-slate-300 leading-relaxed pl-10">
              <p>
                For legal inquiries, formal notices, or partnership agreements, reach out to our legal department:
              </p>
              <div className="p-5 rounded-2xl bg-[#F8FAFC] dark:bg-white/5 border border-[#DDE8EC] dark:border-white/10 space-y-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-[#002F5B] dark:text-white font-bold">
                  <Building2 className="w-4 h-4 text-[#11AFC1]" />
                  <span>Braxvio Technologies Limited — Legal Department</span>
                </div>
                <div className="space-y-1 text-[#687A86] dark:text-slate-300">
                  <p><strong>Email:</strong> <a href="mailto:legal@braxvio.com" className="text-[#006EAA] dark:text-[#42D6C5] underline font-semibold">legal@braxvio.com</a></p>
                  <p><strong>Corporate Registration:</strong> Republic of Ghana</p>
                  <p><strong>Physical Address:</strong> Braxvio Corporate Center, Accra, Greater Accra, Ghana</p>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Footer links to Privacy and Security */}
        <div className="p-8 rounded-3xl bg-[#002F5B] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold">Transparent Corporate Governance</h4>
            <p className="text-xs text-slate-300">
              Read our privacy pledge and examine our institutional security standards.
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
