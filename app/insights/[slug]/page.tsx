import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Share2 } from 'lucide-react';
import { INSIGHTS_ARTICLES } from '@/data/ecosystem';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INSIGHTS_ARTICLES.map((article) => ({
    slug: article.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = INSIGHTS_ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: 'Article Not Found | Braxvio' };

  return {
    title: `${article.title} — Braxvio Insights`,
    description: article.excerpt
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = INSIGHTS_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const moreArticles = INSIGHTS_ARTICLES.filter((a) => a.slug !== slug);

  return (
    <div className="pt-28 pb-36 px-6 sm:px-8 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#687A86] hover:text-[#002F5B] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO INSIGHTS</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-6 border-b border-[#DDE8EC] pb-12">
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-[#006EAA] font-bold uppercase tracking-wider">
              {article.category}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-[#687A86]">{article.readTime}</span>
            <span className="text-slate-300">•</span>
            <span className="text-[#687A86]">{article.publishedDate}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#002F5B] tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#002F5B] text-white flex items-center justify-center font-bold text-sm">
                B
              </div>
              <div>
                <div className="text-sm font-bold text-[#06131D]">{article.author.name}</div>
                <div className="text-xs text-[#687A86]">{article.author.role}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Long-Form Reading Body (680–760px optimized readability) */}
        <main className="max-w-[740px] mx-auto space-y-8 text-base sm:text-lg text-[#06131D] leading-relaxed font-normal">
          <p className="text-xl sm:text-2xl text-[#006EAA] font-medium leading-relaxed">
            {article.excerpt}
          </p>

          <div className="h-px w-24 bg-[#11AFC1] my-8" />

          {article.content.map((paragraph, index) => {
            // Add an editorial pull quote on the third paragraph
            if (index === 2) {
              return (
                <React.Fragment key={index}>
                  <blockquote className="my-10 pl-6 border-l-4 border-[#11AFC1] italic text-xl sm:text-2xl font-normal text-[#002F5B]">
                    &ldquo;{paragraph}&rdquo;
                  </blockquote>
                </React.Fragment>
              );
            }
            return (
              <p key={index} className="text-[#06131D]">
                {paragraph}
              </p>
            );
          })}
        </main>

        {/* More from Braxvio */}
        <div className="pt-16 border-t border-[#DDE8EC] space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#687A86] font-semibold">
              MORE ESSAYS FROM BRAXVIO
            </h3>
            <Link href="/insights" className="text-xs font-mono text-[#006EAA] hover:underline">
              View All Dispatches →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {moreArticles.map((rel) => (
              <Link
                key={rel.id}
                href={`/insights/${rel.slug}`}
                className="p-6 rounded-2xl border border-[#DDE8EC] bg-[#F7FAFC] hover:bg-white hover:border-[#11AFC1] transition-all space-y-3 group"
              >
                <div className="text-[10px] font-mono uppercase text-[#006EAA] font-bold">
                  {rel.category} • {rel.readTime}
                </div>
                <div className="text-lg font-bold text-[#06131D] group-hover:text-[#006EAA] transition-colors">
                  {rel.title}
                </div>
                <p className="text-xs text-[#687A86] line-clamp-2">
                  {rel.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
