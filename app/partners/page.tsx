import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Lock,
  Boxes,
  Compass,
} from 'lucide-react';
import BraxvioEcosystemVisual from '@/components/partners/BraxvioEcosystemVisual';
import { BRAXVIO_PRODUCTS } from '@/data/ecosystem';
import {
  PARTNERSHIP_CATEGORIES,
  PARTNERSHIP_PROCESS_STEPS,
} from '@/data/partnerships';
import { WhatsAppIcon, BRAXVIO_WHATSAPP_LINK } from '@/components/ui/WhatsAppIcon';

export const metadata: Metadata = {
  title: 'Partner With Braxvio | Strategic Partnerships & Collaboration',
  description:
    'Explore opportunities to collaborate with Braxvio across technology, products, institutions, markets and future growth initiatives.',
};

export default function PartnersPage() {
  return (
    <div className="pt-24 pb-36 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto space-y-28 sm:space-y-36">

        {/* ============================================================ */}
        {/* 02 — HERO SECTION */}
        {/* ============================================================ */}
        <section className="pt-6 sm:pt-12 border-b border-[#DDE8EC] pb-20 space-y-12">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F2FAFC] border border-[#11AFC1]/30">
              <span className="w-2 h-2 rounded-full bg-[#11AFC1] animate-pulse" />
              <span className="text-xs font-mono tracking-widest uppercase text-[#006EAA] font-bold">
                PARTNER WITH BRAXVIO
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#002F5B] tracking-tight leading-[1.05]">
              BUILD WITH US. <br />
              <span className="braxvio-gradient-text">GROW WITH US.</span>
            </h1>

            <p className="text-lg sm:text-2xl text-[#687A86] leading-relaxed font-normal max-w-3xl">
              Braxvio works with organizations, institutions, technology partners and
              strategic collaborators who share our ambition to build useful technology
              for real-world problems.
            </p>

            <p className="text-sm sm:text-base text-[#3D5066] leading-relaxed max-w-3xl">
              Whether you&apos;re interested in collaborating with Braxvio, supporting one of
              our products, exploring a strategic relationship or discussing financial
              participation, we&apos;d like to hear from you.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#categories"
                className="px-7 py-4 rounded-xl bg-gradient-to-r from-[#003E72] via-[#006EAA] to-[#11AFC1] text-white text-xs font-mono font-bold tracking-wider uppercase hover:opacity-95 shadow-md hover:shadow-lg transition-all flex items-center gap-2 group"
              >
                <span>EXPLORE PARTNERSHIPS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <Link
                href="/partners/investment-interest"
                className="px-7 py-4 rounded-xl bg-[#F2FAFC] border border-[#11AFC1]/40 text-[#002F5B] text-xs font-mono font-bold tracking-wider uppercase hover:bg-white hover:border-[#11AFC1] shadow-xs transition-all flex items-center gap-2 group"
              >
                <span>EXPRESS INVESTMENT INTEREST</span>
                <ArrowRight className="w-4 h-4 text-[#11AFC1] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* 04 — HERO ECOSYSTEM VISUAL (NO GENERIC STOCK PHOTOS) */}
          <div className="pt-4">
            <BraxvioEcosystemVisual />
          </div>
        </section>

        {/* ============================================================ */}
        {/* 05 — PARTNERSHIP INTRODUCTION */}
        {/* ============================================================ */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start border-b border-[#DDE8EC] pb-24">
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-mono tracking-widest uppercase text-[#006EAA] font-semibold flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#11AFC1]" />
              <span>MORE THAN A PARTNERSHIP</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002F5B] tracking-tight">
              LET&apos;S BUILD SOMETHING THAT MOVES PEOPLE FORWARD.
            </h2>
          </div>

          <div className="lg:col-span-8 space-y-6 text-base sm:text-lg text-[#687A86] leading-relaxed">
            <p>
              Braxvio develops technology products across multiple areas of everyday life.
            </p>
            <p>
              We believe strong products are built not only through technology, but through
              the right combination of ideas, expertise, infrastructure, capital,
              distribution and collaboration.
            </p>
            <p className="text-[#002F5B] font-medium border-l-2 border-[#11AFC1] pl-4">
              We&apos;re open to meaningful partnerships that can accelerate products,
              expand their impact and create long-term value.
            </p>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 06 — SIX PREMIUM PARTNERSHIP CATEGORIES */}
        {/* ============================================================ */}
        <section id="categories" className="space-y-12 border-b border-[#DDE8EC] pb-24 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest uppercase text-[#006EAA] font-semibold">
                WAYS TO COLLABORATE
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#002F5B] tracking-tight">
                Partnership Disciplines.
              </h2>
            </div>
            <p className="text-sm text-[#687A86] max-w-md">
              Targeted pathways designed for corporations, investors, universities, and infrastructure providers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {PARTNERSHIP_CATEGORIES.map((category) => (
              <div
                key={category.id}
                className="p-8 rounded-3xl border border-[#DDE8EC] bg-[#F7FAFC] hover:bg-white hover:border-[#11AFC1] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group card-premium"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#11AFC1]">
                      {category.number}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#DDE8EC] group-hover:bg-[#11AFC1] transition-colors" />
                  </div>

                  <h3 className="text-xl font-bold text-[#002F5B] group-hover:text-[#006EAA] transition-colors">
                    {category.title}
                  </h3>

                  <p className="text-sm text-[#687A86] leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#DDE8EC]">
                  <Link
                    href={category.href}
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#002F5B] group-hover:text-[#11AFC1] transition-colors"
                  >
                    <span>{category.cta}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 07 & 08 — DYNAMIC BRAXVIO PRODUCTS PARTNERSHIP */}
        {/* ============================================================ */}
        <section id="products" className="space-y-12 border-b border-[#DDE8EC] pb-24 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest uppercase text-[#006EAA] font-semibold flex items-center gap-2">
                <Boxes className="w-4 h-4 text-[#11AFC1]" />
                <span>ECOSYSTEM INTEGRATIONS</span>
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#002F5B] tracking-tight">
                Partner With a Product.
              </h2>
            </div>
            <p className="text-sm text-[#687A86] max-w-md">
              Engage directly with an individual Braxvio platform to co-build features, expand distribution, or pilot municipal solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BRAXVIO_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="p-8 rounded-3xl border border-[#DDE8EC] bg-white hover:border-[#11AFC1] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold text-[#006EAA] uppercase">
                        {prod.label}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#DDE8EC] bg-[#F7FAFC] text-[#687A86] font-semibold">
                        {prod.category}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-[#11AFC1]/30 bg-[#F2FAFC] text-[#006EAA] font-bold">
                      {prod.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-extrabold text-[#002F5B]">
                      {prod.name}
                    </h3>
                    <p className="text-xs font-medium text-[#008FC4] mt-0.5">
                      {prod.tagline}
                    </p>
                  </div>

                  <p className="text-sm text-[#687A86] leading-relaxed">
                    {prod.description}
                  </p>

                  {/* Enabled Partnership Areas */}
                  {prod.partnershipAreas && prod.partnershipAreas.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#06131D] font-bold">
                        ACTIVE PARTNERSHIP AREAS:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {prod.partnershipAreas.map((area) => (
                          <span
                            key={area}
                            className="px-2.5 py-1 rounded-md bg-[#F2FAFC] border border-[#11AFC1]/20 text-[11px] font-mono text-[#002F5B] font-medium"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-[#DDE8EC] flex items-center justify-between">
                  <Link
                    href={`/products/${prod.slug}`}
                    className="text-xs font-mono text-[#687A86] hover:text-[#002F5B] transition-colors"
                  >
                    View Product Specs →
                  </Link>

                  <Link
                    href={`/partners/propose?target=${prod.slug}`}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#003E72] to-[#11AFC1] text-white text-xs font-mono font-bold hover:opacity-95 transition-all shadow-xs flex items-center gap-1.5"
                  >
                    <span>EXPLORE PARTNERSHIP</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 10 — FINANCIAL INTEREST / CAPITAL & GROWTH */}
        {/* ============================================================ */}
        <section className="rounded-3xl p-8 sm:p-14 bg-gradient-to-br from-[#002F5B] via-[#003E72] to-[#071C2B] text-white shadow-2xl relative overflow-hidden space-y-8">
          <div className="absolute inset-0 braxvio-grid-dark opacity-35 pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#11AFC1]/15 blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-5">
            <span className="text-xs font-mono tracking-widest uppercase text-[#42D6C5] font-bold">
              CAPITAL & GROWTH
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              INTERESTED IN THE FUTURE WE&apos;RE BUILDING?
            </h2>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              Braxvio welcomes conversations with qualified individuals and organizations
              interested in learning more about the company, its products and potential
              future financial opportunities.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/partners/investment-interest"
              className="px-7 py-4 rounded-xl bg-gradient-to-r from-[#11AFC1] to-[#42D6C5] text-[#002F5B] text-xs font-mono font-bold tracking-wider uppercase hover:opacity-95 shadow-md transition-all flex items-center gap-2 group"
            >
              <span>EXPRESS INVESTMENT INTEREST</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Strict Regulatory Notice (Item 10 & Item 54) */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-start gap-2.5 text-[11px] text-slate-400 max-w-3xl leading-normal">
            <Lock className="w-3.5 h-3.5 text-[#42D6C5] shrink-0 mt-0.5" />
            <p>
              Information on this page is provided for general informational purposes.
              Nothing on this page constitutes an offer to sell, or a solicitation of an
              offer to purchase, securities or any other financial instrument. Submitting
              an expression of interest does not create an investment agreement or
              commitment.
            </p>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 28 — PROJECT COLLABORATION TEASER */}
        {/* ============================================================ */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-b border-[#DDE8EC] pb-24">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-mono tracking-widest uppercase text-[#006EAA] font-bold">
              PROJECT COLLABORATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002F5B] tracking-tight">
              HAVE A PROJECT WE SHOULD BUILD TOGETHER?
            </h2>
            <p className="text-base text-[#687A86] leading-relaxed">
              Designed for companies, organizations, institutions, governments, NGOs,
              universities, and founders looking to partner on bespoke software architectures,
              AI models, or institutional pilots with Braxvio engineering.
            </p>
            <div className="pt-2">
              <Link
                href="/partners/projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#002F5B] text-white text-xs font-mono font-bold hover:bg-[#003E72] transition-colors shadow-sm"
              >
                <span>SUBMIT A PROJECT COLLABORATION</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#42D6C5]" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 p-8 rounded-3xl bg-[#F7FAFC] border border-[#DDE8EC] space-y-4">
            <span className="text-xs font-mono text-[#006EAA] uppercase font-bold">
              COLLABORATION PROFILE
            </span>
            <ul className="space-y-3 text-xs text-[#06131D]">
              {[
                'Product Strategy & Systems Architecture',
                'Custom AI & Machine Learning Integrations',
                'Municipal Telemetry & Field Routing Engines',
                'Enterprise Healthcare & FHIR Data Standards',
                'Cross-Border Financial Settlement APIs',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#11AFC1] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 32 — PARTNERSHIP PROCESS */}
        {/* ============================================================ */}
        <section className="space-y-12 border-b border-[#DDE8EC] pb-24">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono tracking-widest uppercase text-[#006EAA] font-semibold">
              TRANSPARENT COLLABORATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#002F5B] tracking-tight">
              How Partnerships Begin.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {PARTNERSHIP_PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl border border-[#DDE8EC] bg-white space-y-3 relative group hover:border-[#11AFC1] transition-all"
              >
                <div className="text-xs font-mono font-bold text-[#11AFC1]">
                  STEP {step.step}
                </div>
                <h3 className="text-lg font-bold text-[#002F5B]">
                  {step.title}
                </h3>
                <p className="text-xs text-[#687A86] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-[#F2FAFC] border border-[#DDE8EC] text-xs font-mono text-[#687A86] text-center">
            IMPORTANT: Submission does not guarantee partnership. Every proposal is evaluated on strategic synergy, technical rigor, and shared long-term value.
          </div>
        </section>

        {/* ============================================================ */}
        {/* FINAL SECTION CTA */}
        {/* ============================================================ */}
        <section className="text-center space-y-6 pt-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#002F5B] tracking-tight">
            Ready to Build With Braxvio?
          </h2>
          <p className="text-base text-[#687A86] max-w-lg mx-auto">
            Choose your engagement path or initiate a strategic conversation with our executive leadership team.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/partners/propose"
              className="px-7 py-4 rounded-xl bg-gradient-to-r from-[#003E72] via-[#006EAA] to-[#11AFC1] text-white text-xs font-mono font-bold tracking-wider uppercase hover:opacity-95 shadow-md transition-all flex items-center gap-2"
            >
              <span>PROPOSE A PARTNERSHIP</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/partners/investment-interest"
              className="px-7 py-4 rounded-xl bg-[#F7FAFC] border border-[#DDE8EC] text-[#002F5B] text-xs font-mono font-bold tracking-wider uppercase hover:bg-white transition-all flex items-center gap-2"
            >
              <span>INVESTMENT INTEREST</span>
              <ArrowRight className="w-4 h-4 text-[#11AFC1]" />
            </Link>
            <a
              href={BRAXVIO_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-md flex items-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>CHAT ON WHATSAPP</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
