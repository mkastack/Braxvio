import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  ArrowRight,
  ArrowUpRight,
  Layers,
  Building2,
  Pill,
  Truck,
  Landmark,
  Check,
} from 'lucide-react';
import { BRAXVIO_PRODUCTS } from '@/data/ecosystem';

export const metadata: Metadata = {
  title: 'Products — The Braxvio Product System',
  description:
    'Independent products. Shared technology. One vision. Explore the digital products and infrastructure built by Braxvio.',
};

const PRODUCT_ICONS: Record<string, React.ReactNode> = {
  kampus: <Building2 className="w-5 h-5 text-white" />,
  pharmora: <Pill className="w-5 h-5 text-white" />,
  ecolift: <Truck className="w-5 h-5 text-white" />,
  'devpay-africa': <Landmark className="w-5 h-5 text-white" />,
};

const PRODUCT_GRADIENTS: Record<string, string> = {
  kampus: 'from-[#003E72] to-[#11AFC1]',
  pharmora: 'from-[#006EAA] to-[#008FC4]',
  ecolift: 'from-[#11AFC1] to-[#42D6C5]',
  'devpay-africa': 'from-[#002F5B] to-[#006EAA]',
};

const STATUS_STYLES: Record<string, string> = {
  LIVE: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'PUBLIC BETA': 'bg-sky-50 text-sky-700 border-sky-200',
  'PRIVATE BETA': 'bg-violet-50 text-violet-700 border-violet-200',
  'IN DEVELOPMENT': 'bg-slate-100 text-slate-600 border-slate-200',
  RESEARCH: 'bg-amber-50 text-amber-700 border-amber-200',
};

export default function ProductsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#DDE8EC] overflow-hidden">
        <div className="absolute inset-0 braxvio-grid-light opacity-50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#11AFC1]/5 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F2FAFC] border border-[#DDE8EC]">
              <Layers className="w-3.5 h-3.5 text-[#11AFC1]" />
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#006EAA]">
                ECOSYSTEM DIRECTORY
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#002F5B] tracking-tight leading-[1.02]">
              THE BRAXVIO <br />
              <span className="braxvio-gradient-text">PRODUCT SYSTEM.</span>
            </h1>

            <p className="text-lg text-[#687A86] leading-relaxed max-w-2xl">
              Independent products. Shared technology. One vision. Each platform addresses a vital part of everyday life while sharing core Braxvio infrastructure.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-8 pt-4 border-t border-[#DDE8EC] text-xs font-mono">
              {[
                { label: 'ACTIVE PRODUCTS', value: `${BRAXVIO_PRODUCTS.length}` },
                { label: 'SECTORS COVERED', value: '4' },
                { label: 'SHARED INFRA LAYER', value: 'YES' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-[9px] uppercase tracking-widest text-[#687A86] mb-1">
                    {s.label}
                  </div>
                  <div className="text-xl font-extrabold text-[#002F5B]">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Products Grid ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {BRAXVIO_PRODUCTS.map((product) => {
              const gradient = PRODUCT_GRADIENTS[product.slug] ?? 'from-[#003E72] to-[#11AFC1]';
              const iconEl = PRODUCT_ICONS[product.slug] ?? <Layers className="w-5 h-5 text-white" />;
              const statusClass = STATUS_STYLES[product.status] ?? STATUS_STYLES['IN DEVELOPMENT'];

              return (
                <div
                  key={product.id}
                  className="group rounded-3xl border border-[#DDE8EC] bg-[#F7FAFC] hover:bg-white hover:border-[#11AFC1]/60 shadow-sm hover:shadow-xl transition-all duration-400 flex flex-col overflow-hidden"
                >
                  {/* Card Top Gradient Bar */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />

                  <div className="p-7 sm:p-9 flex flex-col gap-6 flex-1">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0`}
                      >
                        {iconEl}
                      </div>
                      <span
                        className={`text-[10px] font-mono px-2.5 py-1 rounded-full border font-bold uppercase tracking-wider ${statusClass}`}
                      >
                        {product.status}
                      </span>
                    </div>

                    {/* Title & category */}
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[#11AFC1] font-bold mb-1">
                        {product.label}
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002F5B] group-hover:text-[#006EAA] transition-colors tracking-tight">
                        {product.name}
                      </h2>
                      <div className="text-sm font-semibold text-[#006EAA] mt-1">
                        {product.tagline}
                      </div>
                    </div>

                    <p className="text-sm text-[#687A86] leading-relaxed">{product.description}</p>

                    {/* Feature checklist */}
                    <div className="space-y-2 pt-1 border-t border-[#DDE8EC]">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                        CORE CAPABILITIES
                      </div>
                      <ul className="space-y-1.5">
                        {product.features.slice(0, 3).map((feat) => (
                          <li key={feat.title} className="flex items-start gap-2 text-xs text-[#3D5066]">
                            <Check className="w-3.5 h-3.5 text-[#11AFC1] mt-0.5 shrink-0" />
                            <span>
                              <strong className="font-semibold text-[#002F5B]">{feat.title}:</strong>{' '}
                              {feat.description}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom row */}
                    <div className="mt-auto pt-4 border-t border-[#DDE8EC] flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-[#687A86]">PLATFORMS:</span>
                        <div className="flex gap-1">
                          {product.platforms.map((plat) => (
                            <span
                              key={plat}
                              className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-[#DDE8EC] text-[#002F5B] font-medium"
                            >
                              {plat}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Link
                        href={`/products/${product.slug}`}
                        className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-wider uppercase text-[#002F5B] group-hover:text-[#11AFC1] transition-colors"
                      >
                        <span>EXPLORE PLATFORM</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Shared Infrastructure Banner ── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#002F5B] via-[#003E72] to-[#071C2B] text-white relative overflow-hidden">
          <div className="absolute inset-0 braxvio-grid-dark opacity-25 pointer-events-none" />
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#11AFC1]/10 blur-[60px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#42D6C5] font-bold">
                SHARED FOUNDATION
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                ONE CORE. FOUR PLATFORMS.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                All Braxvio products share a unified infrastructure layer — identity verification, payment rails, telemetry, and security protocols — so each platform launches faster with proven stability.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Identity Layer', 'Payment Rails', 'Telemetry', 'Security Vault', 'Analytics Core'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href="/technology"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#11AFC1] to-[#42D6C5] text-[#002F5B] text-xs font-mono font-bold tracking-wider uppercase shrink-0 flex items-center gap-2 hover:opacity-95 transition-all shadow-lg"
            >
              <span>EXPLORE ARCHITECTURE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
