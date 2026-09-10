import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck, Cpu, Layers, Activity } from 'lucide-react';
import { BRAXVIO_PRODUCTS } from '@/data/ecosystem';
import KampusMockup from '@/components/mockups/KampusMockup';
import PharmoraMockup from '@/components/mockups/PharmoraMockup';
import EcoliftMockup from '@/components/mockups/EcoliftMockup';
import DevPayMockup from '@/components/mockups/DevPayMockup';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BRAXVIO_PRODUCTS.map((prod) => ({
    slug: prod.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = BRAXVIO_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: 'Product Not Found | Braxvio' };

  return {
    title: `${product.name} — ${product.tagline}`,
    description: product.description
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = BRAXVIO_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const renderMockup = () => {
    switch (product.id) {
      case 'kampus':
        return <KampusMockup />;
      case 'pharmora':
        return <PharmoraMockup />;
      case 'ecolift':
        return <EcoliftMockup />;
      case 'devpay-africa':
      default:
        return <DevPayMockup />;
    }
  };

  const otherProducts = BRAXVIO_PRODUCTS.filter((p) => p.slug !== slug);

  return (
    <div className="pt-28 pb-36 px-6 sm:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Back Link */}
        <div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#687A86] hover:text-[#002F5B] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO ALL PRODUCTS</span>
          </Link>
        </div>

        {/* 01: PRODUCT HERO */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-[#DDE8EC] pb-20">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#006EAA]">
                {product.label}
              </span>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-[#11AFC1]/30 bg-[#F2FAFC] text-[#006EAA] font-semibold">
                {product.status}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#002F5B] tracking-tight">
              {product.name}
            </h1>

            <div className="text-xl font-medium text-[#008FC4]">
              {product.tagline}
            </div>

            <p className="text-base sm:text-lg text-[#687A86] leading-relaxed">
              {product.description}
            </p>

            {/* Platform Badges */}
            <div className="flex items-center gap-3 pt-2 text-xs font-mono text-[#687A86]">
              <span>AVAILABLE ON:</span>
              <div className="flex gap-2">
                {product.platforms.map((plat) => (
                  <span key={plat} className="px-2.5 py-1 rounded-md bg-[#F7FAFC] border border-[#DDE8EC] text-[#002F5B] font-medium">
                    {plat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            {renderMockup()}
          </div>
        </section>

        {/* 02: THE PROBLEM & BRAXVIO APPROACH */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-[#DDE8EC] pb-20">
          <div className="space-y-4 p-8 rounded-2xl bg-[#F7FAFC] border border-[#DDE8EC]">
            <span className="text-xs font-mono uppercase tracking-widest text-[#687A86] font-semibold">
              THE REAL-WORLD PROBLEM
            </span>
            <h2 className="text-2xl font-bold text-[#002F5B]">
              Why this system is fractured
            </h2>
            <p className="text-sm sm:text-base text-[#687A86] leading-relaxed">
              {product.problem}
            </p>
          </div>

          <div className="space-y-4 p-8 rounded-2xl bg-[#F2FAFC] border border-[#11AFC1]/30">
            <span className="text-xs font-mono uppercase tracking-widest text-[#006EAA] font-semibold">
              THE BRAXVIO APPROACH
            </span>
            <h2 className="text-2xl font-bold text-[#002F5B]">
              How we engineer the solution
            </h2>
            <p className="text-sm sm:text-base text-[#06131D] leading-relaxed">
              {product.approach}
            </p>
          </div>
        </section>

        {/* 03: PRODUCT EXPERIENCE & CORE CAPABILITIES */}
        <section className="space-y-12 border-b border-[#DDE8EC] pb-20">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono tracking-widest uppercase text-[#006EAA] font-semibold">
              SYSTEM CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002F5B] tracking-tight">
              Designed around everyday workflow.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {product.features.map((feat, idx) => (
              <div
                key={feat.title}
                className="p-8 rounded-2xl border border-[#DDE8EC] bg-white hover:border-[#11AFC1] transition-colors space-y-3"
              >
                <div className="text-xs font-mono font-bold text-[#11AFC1]">
                  CAPABILITY 0{idx + 1}
                </div>
                <h3 className="text-xl font-bold text-[#002F5B]">
                  {feat.title}
                </h3>
                <p className="text-sm text-[#687A86] leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 04: TECHNOLOGY & IMPACT */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#DDE8EC] pb-20">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#006EAA] font-semibold">
              <Cpu className="w-4 h-4" />
              <span>ENGINEERING FOUNDATION</span>
            </div>
            <h2 className="text-3xl font-bold text-[#002F5B]">
              Architectural Stack
            </h2>
            <div className="flex flex-wrap gap-2 pt-2">
              {product.technologyStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-[#F7FAFC] border border-[#DDE8EC] text-xs font-mono font-semibold text-[#002F5B]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 p-8 rounded-2xl bg-gradient-to-br from-[#002F5B] to-[#003E72] text-white space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#42D6C5]">
              MEASURABLE INTENT
            </span>
            <h3 className="text-2xl font-bold">
              Impact Statement
            </h3>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {product.impactStatement}
            </p>
          </div>
        </section>

        {/* 05: RELATED BRAXVIO PRODUCTS */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono uppercase tracking-widest text-[#687A86] font-semibold">
              OTHER BRAXVIO ECOSYSTEM SYSTEMS
            </div>
            <Link href="/products" className="text-xs font-mono text-[#006EAA] hover:underline">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherProducts.slice(0, 3).map((rel) => (
              <Link
                key={rel.id}
                href={`/products/${rel.slug}`}
                className="p-6 rounded-2xl border border-[#DDE8EC] bg-[#F7FAFC] hover:bg-white hover:border-[#11AFC1] transition-all group space-y-3"
              >
                <span className="text-[10px] font-mono text-[#006EAA] uppercase">{rel.category}</span>
                <div className="text-lg font-bold text-[#002F5B] group-hover:text-[#006EAA] transition-colors">
                  {rel.name}
                </div>
                <p className="text-xs text-[#687A86] line-clamp-2">
                  {rel.tagline}
                </p>
                <div className="pt-2 text-xs font-mono text-[#11AFC1] flex items-center gap-1">
                  <span>Explore system</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
