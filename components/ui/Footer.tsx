'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight, Zap } from 'lucide-react';
import { BRAXVIO_PRODUCTS } from '@/data/ecosystem';

export default function Footer() {
  return (
    <footer className="relative bg-[#071C2B] text-white border-t border-[#11AFC1]/15 overflow-hidden pt-20 pb-10">
      {/* Background Layers */}
      <div className="absolute inset-0 braxvio-grid-dark opacity-30 pointer-events-none" />
      <div className="absolute -bottom-48 -right-48 w-[700px] h-[700px] rounded-full border border-[#11AFC1]/8 pointer-events-none" />
      <div className="absolute -bottom-72 -right-72 w-[1000px] h-[1000px] rounded-full border border-[#11AFC1]/4 pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-[#002F5B]/40 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

        {/* Upper Brand + Nav Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-white/8 pb-14">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-5">
            {/* Logo using actual image */}
            <Link href="/" className="inline-flex items-center gap-3.5 group">
              <div className="relative w-11 h-14 shrink-0 transition-transform duration-300 group-hover:scale-105 drop-shadow-md">
                <Image
                  src="/braxvio-mark.png"
                  alt="Braxvio"
                  fill
                  className="object-contain object-left"
                  sizes="48px"
                />
              </div>
              <div className="flex flex-col leading-none select-none">
                <span
                  className="font-black text-white text-2xl sm:text-3xl tracking-tight leading-[1] group-hover:text-[#42D6C5] transition-colors"
                  style={{ fontFamily: 'var(--font-manrope), sans-serif' }}
                >
                  Braxvio
                </span>
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#42D6C5] mt-1">
                  Build. Innovate. Elevate.
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              Braxvio is the parent technology company building digital products, platforms, and infrastructure designed around meaningful human needs across Africa and the world.
            </p>

            {/* Live status indicator */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#42D6C5] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#42D6C5]" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#42D6C5]">
                4 Product Nodes Active
              </span>
              <Zap className="w-3 h-3 text-[#11AFC1]" />
            </div>

            <div className="text-[10px] font-mono text-slate-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500 inline-block" />
              HEADQUARTERS: ACCRA, GHANA
            </div>
          </div>

          {/* Nav Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs">
            {/* Products */}
            <div className="space-y-4">
              <div className="font-mono uppercase text-[10px] tracking-widest text-[#11AFC1] font-bold border-b border-white/8 pb-2">
                PRODUCTS
              </div>
              <ul className="space-y-2.5 text-slate-300">
                {BRAXVIO_PRODUCTS.map((prod) => (
                  <li key={prod.id}>
                    <Link
                      href={`/products/${prod.slug}`}
                      className="hover:text-[#42D6C5] transition-colors flex items-center gap-1 group text-[13px]"
                    >
                      <span>{prod.name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/products"
                    className="text-[#42D6C5] hover:text-white transition-colors pt-1 inline-flex items-center gap-1 text-[12px] font-semibold"
                  >
                    <span>View All Systems</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <div className="font-mono uppercase text-[10px] tracking-widest text-[#11AFC1] font-bold border-b border-white/8 pb-2">
                COMPANY
              </div>
              <ul className="space-y-2.5 text-slate-300 text-[13px]">
                {[
                  { label: 'About Braxvio', href: '/company' },
                  { label: 'Leadership', href: '/company/leadership' },
                  { label: 'Authentic Impact', href: '/impact' },
                  { label: 'Careers & Culture', href: '/careers' },
                  { label: 'Contact & Media', href: '/contact' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <div className="font-mono uppercase text-[10px] tracking-widest text-[#11AFC1] font-bold border-b border-white/8 pb-2">
                RESOURCES
              </div>
              <ul className="space-y-2.5 text-slate-300 text-[13px]">
                {[
                  { label: 'Engineering Architecture', href: '/technology' },
                  { label: 'Insights Publication', href: '/insights' },
                  { label: 'Braxvio Labs', href: '/labs' },
                  { label: 'Privacy Policy', href: '/privacy' },
                  { label: 'Terms of Service', href: '/terms' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="space-y-4">
              <div className="font-mono uppercase text-[10px] tracking-widest text-[#11AFC1] font-bold border-b border-white/8 pb-2">
                CONNECT
              </div>
              <ul className="space-y-2.5 text-slate-300 font-mono text-[12px]">
                {[
                  { label: 'LinkedIn', href: 'https://linkedin.com/company/braxvio' },
                  { label: 'X / Twitter', href: 'https://x.com/braxvio' },
                  { label: 'GitHub', href: 'https://github.com/braxvio' },
                  { label: 'Instagram', href: 'https://instagram.com/braxvio' },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1 group"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>© {new Date().getFullYear()} Braxvio Technologies. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span>Accra, Ghana.</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <div className="flex items-center gap-3">
              <Link href="/privacy" className="hover:text-slate-300 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-slate-300 transition-colors">
                Terms
              </Link>
              <Link href="/security" className="hover:text-slate-300 transition-colors">
                Security
              </Link>
            </div>
          </div>

          <div className="text-[10px] font-mono text-[#42D6C5]/70 shrink-0">
            DIGITAL HQ • V1.0 PRODUCTION
          </div>
        </div>
      </div>
    </footer>
  );
}
