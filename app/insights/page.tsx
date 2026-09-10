import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { BookOpen, ArrowRight, ArrowUpRight } from 'lucide-react';
import { INSIGHTS_ARTICLES } from '@/data/ecosystem';

export const metadata: Metadata = {
  title: 'Insights — Braxvio Engineering & Systems Journal',
  description: 'Essays, systems architecture notes, and economic perspectives from Braxvio Technologies.'
};

export default function InsightsPage() {
  const featured = INSIGHTS_ARTICLES[0];
  const secondary = INSIGHTS_ARTICLES.slice(1);

  return (
    <div className="pt-28 pb-36 px-6 sm:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Header */}
        <div className="max-w-3xl space-y-4 border-b border-[#DDE8EC] pb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#006EAA] font-semibold">
            <BookOpen className="w-4 h-4" />
            <span>BRAXVIO PUBLICATION</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#002F5B] tracking-tight">
            INSIGHTS & <br />
            <span className="braxvio-gradient-text">PERSPECTIVES.</span>
          </h1>
          <p className="text-lg text-[#687A86] leading-relaxed">
            Long-form essays on systems architecture, emerging markets engineering, design philosophy, and the future of digital infrastructure.
          </p>
        </div>

        {/* Featured Editorial Article */}
        <article className="rounded-3xl p-8 sm:p-14 bg-[#F2FAFC] border border-[#11AFC1]/30 hover:border-[#11AFC1] shadow-sm hover:shadow-xl transition-all duration-300 space-y-6 group">
          <div className="flex items-center justify-between text-xs font-mono text-[#006EAA]">
            <span className="uppercase font-bold tracking-wider">FEATURED / {featured.category}</span>
            <span>{featured.readTime}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#002F5B] group-hover:text-[#006EAA] transition-colors leading-tight max-w-4xl">
            {featured.title}
          </h2>

          <p className="text-base sm:text-lg text-[#687A86] max-w-3xl leading-relaxed">
            {featured.excerpt}
          </p>

          <div className="pt-4 border-t border-[#DDE8EC] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="space-y-0.5">
              <span className="font-bold text-[#002F5B]">{featured.author.name}</span>
              <span className="text-[#687A86] block text-[11px]">{featured.author.role}</span>
            </div>

            <Link
              href={`/insights/${featured.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#002F5B] text-white font-semibold group-hover:bg-[#003E72] transition-colors"
            >
              <span>Read Essay</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </article>

        {/* Secondary Articles (Asymmetrical Layout) */}
        <div className="space-y-8">
          <div className="text-xs font-mono uppercase tracking-widest text-[#687A86] font-semibold">
            ALL DISPATCHES
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {secondary.map((article) => (
              <article
                key={article.id}
                className="p-8 rounded-2xl border border-[#DDE8EC] bg-[#F7FAFC] hover:bg-white hover:border-[#11AFC1] shadow-sm hover:shadow-md transition-all space-y-6 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[#687A86]">
                    <span className="text-[#006EAA] uppercase font-bold">{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#06131D] group-hover:text-[#006EAA] transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-sm text-[#687A86] leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#DDE8EC] flex items-center justify-between text-xs">
                  <span className="font-mono text-[#687A86]">{article.publishedDate}</span>
                  <Link
                    href={`/insights/${article.slug}`}
                    className="inline-flex items-center gap-1 font-bold text-[#002F5B] group-hover:text-[#11AFC1] transition-colors"
                  >
                    <span>Read article</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
