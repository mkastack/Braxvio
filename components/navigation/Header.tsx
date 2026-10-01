'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Search,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Building2,
  Pill,
  Truck,
  Landmark,
  BookOpen,
  Cpu,
  Users,
  Phone,
  ArrowUpRight,
  Layers,
  Globe2,
  Handshake,
} from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
}

const products = [
  {
    id: 'kampus',
    name: 'Kampus',
    tagline: 'University life, one connected experience',
    category: 'Education',
    status: 'PUBLIC BETA',
    statusColor: '#11AFC1',
    Icon: Building2,
    href: '/products/kampus',
    color: 'from-[#003E72] to-[#11AFC1]',
  },
  {
    id: 'pharmora',
    name: 'Pharmora',
    tagline: 'Licensed pharmacy & medicine access network',
    category: 'Healthcare',
    status: 'IN DEVELOPMENT',
    statusColor: '#008FC4',
    Icon: Pill,
    href: '/products/pharmora',
    color: 'from-[#006EAA] to-[#008FC4]',
  },
  {
    id: 'ecolift',
    name: 'Ecolift',
    tagline: 'Intelligent municipal waste routing',
    category: 'Sustainability',
    status: 'IN DEVELOPMENT',
    statusColor: '#42D6C5',
    Icon: Truck,
    href: '/products/ecolift',
    color: 'from-[#11AFC1] to-[#42D6C5]',
  },
  {
    id: 'devpay',
    name: 'DevPay Africa',
    tagline: 'Cross-border escrow & developer payouts',
    category: 'Digital Economy',
    status: 'PRIVATE BETA',
    statusColor: '#006EAA',
    Icon: Landmark,
    href: '/products/devpay-africa',
    color: 'from-[#002F5B] to-[#006EAA]',
  },
];

const navLinks = [
  { label: 'Company', href: '/company' },
  { label: 'Products', href: '/products', hasMenu: true },
  { label: 'Technology', href: '/technology' },
  { label: 'Impact', href: '/impact' },
  { label: 'Insights', href: '/insights' },
  { label: 'Partners', href: '/partners' },
];

export default function Header({ onOpenSearch }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const productsWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  // Close products dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (productsWrapperRef.current && !productsWrapperRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Main Header ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-white/97 backdrop-blur-2xl border-[#DDE8EC] shadow-[0_2px_24px_rgba(0,47,91,0.10)]'
            : 'bg-white/90 backdrop-blur-xl border-[#E2E8F0]/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[68px]">

            {/* ── Logo ── */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-2.5 shrink-0 group py-1"
              aria-label="Braxvio Home"
            >
              <div className="relative w-7 h-9 sm:w-8 sm:h-10 shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/braxvio-mark.png"
                  alt="Braxvio"
                  fill
                  className="object-contain object-left"
                  priority
                  sizes="(max-width: 640px) 28px, 32px"
                />
              </div>
              <span
                className="font-black text-[#002F5B] text-lg sm:text-xl tracking-tight leading-none group-hover:text-[#006EAA] transition-colors duration-200 select-none"
                style={{ fontFamily: 'var(--font-manrope), sans-serif' }}
              >
                Braxvio
              </span>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) =>
                link.hasMenu ? (
                  /* Products with dropdown */
                  <div key={link.label} className="relative" ref={productsWrapperRef}>
                    <button
                      type="button"
                      onClick={() => setProductsOpen((v) => !v)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium transition-colors duration-200 relative group ${
                        productsOpen || pathname.startsWith('/products')
                          ? 'text-[#002F5B]'
                          : 'text-[#687A86] hover:text-[#002F5B]'
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          productsOpen ? 'rotate-180 text-[#11AFC1]' : ''
                        }`}
                      />
                      {/* Active underline */}
                      <span
                        className={`absolute bottom-0 left-2 right-2 h-px bg-[#11AFC1] transition-transform duration-200 origin-left ${
                          productsOpen || pathname.startsWith('/products')
                            ? 'scale-x-100'
                            : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </button>

                    {/* Products Dropdown */}
                    {productsOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-white border border-[#E2E8F0] rounded-2xl shadow-[0_20px_60px_rgba(0,47,91,0.12)] overflow-hidden z-50">
                        {/* Dropdown header */}
                        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#EEF3F6] bg-[#F8FAFC]">
                          <div>
                            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#11AFC1] mb-0.5">
                              Product Ecosystem
                            </div>
                            <p className="text-xs text-[#687A86]">
                              Four platforms built around real African needs.
                            </p>
                          </div>
                          <Link
                            href="/products"
                            onClick={() => setProductsOpen(false)}
                            className="flex items-center gap-1 text-xs font-semibold text-[#006EAA] hover:text-[#11AFC1] transition-colors"
                          >
                            View all
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>

                        {/* Product grid */}
                        <div className="grid grid-cols-2 gap-px bg-[#EEF3F6]">
                          {products.map((product) => (
                            <Link
                              key={product.id}
                              href={product.href}
                              onClick={() => setProductsOpen(false)}
                              className="group bg-white px-5 py-4 hover:bg-[#F2FAFC] transition-all duration-200 flex items-start gap-3.5"
                            >
                              <div
                                className={`w-9 h-9 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform duration-200`}
                              >
                                <product.Icon className="w-4.5 h-4.5 text-white" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-sm font-bold text-[#002F5B] group-hover:text-[#006EAA] transition-colors truncate">
                                    {product.name}
                                  </span>
                                  <span
                                    className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase tracking-wide shrink-0"
                                    style={{
                                      color: product.statusColor,
                                      borderColor: `${product.statusColor}35`,
                                      backgroundColor: `${product.statusColor}10`,
                                    }}
                                  >
                                    {product.status}
                                  </span>
                                </div>
                                <p className="text-[11px] text-[#687A86] mt-0.5 leading-snug">
                                  {product.tagline}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-3.5 py-2 text-sm font-medium transition-colors duration-200 relative group ${
                      pathname === link.href || pathname.startsWith(link.href + '/')
                        ? 'text-[#002F5B]'
                        : 'text-[#687A86] hover:text-[#002F5B]'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-2 right-2 h-px bg-[#11AFC1] transition-transform duration-200 origin-left ${
                        pathname === link.href || pathname.startsWith(link.href + '/')
                          ? 'scale-x-100'
                          : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                )
              )}
            </nav>

            {/* ── Desktop Actions ── */}
            <div className="hidden lg:flex items-center gap-1">
              <button
                onClick={onOpenSearch}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#687A86] hover:text-[#002F5B] hover:bg-[#F2FAFC] transition-all duration-200"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
                <span className="text-[11px] font-mono text-[#A0AEB7] bg-[#F4F7F9] border border-[#E2E8F0] px-1.5 py-0.5 rounded">
                  ⌘K
                </span>
              </button>

              <Link
                href="/careers"
                className="px-3.5 py-2 text-sm font-medium text-[#687A86] hover:text-[#002F5B] transition-colors duration-200"
              >
                Careers
              </Link>

              <div className="w-px h-5 bg-[#E2E8F0] mx-1.5" />

              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#002F5B] hover:bg-[#003E72] text-white text-sm font-semibold shadow-sm hover:shadow-[0_4px_16px_rgba(0,47,91,0.25)] transition-all duration-200 group"
              >
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* ── Mobile Actions ── */}
            <div className="flex lg:hidden items-center gap-1.5 ml-auto">
              <button
                onClick={onOpenSearch}
                className="p-2.5 rounded-xl text-[#687A86] hover:text-[#002F5B] hover:bg-[#F2FAFC] transition-all"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="p-2.5 rounded-xl text-[#002F5B] hover:bg-[#F2FAFC] transition-all"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ── rendered OUTSIDE header so z-index doesn't conflict ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer panel */}
          <div className="absolute top-0 right-0 bottom-0 w-[80vw] max-w-[320px] bg-white flex flex-col shadow-[0_0_60px_rgba(0,0,0,0.3)] overflow-hidden">

            {/* Drawer top bar — just a close button, no logo */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#EEF3F6]">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.18em] text-[#687A86]">
                Navigation
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-xl bg-[#F7FAFC] text-[#687A86] hover:bg-[#F2FAFC] hover:text-[#002F5B] transition-all"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer nav body */}
            <div className="flex-1 overflow-y-auto py-3">
              <div className="px-3 space-y-0.5">
                <Link
                  href="/company"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[#002F5B] hover:bg-[#F2FAFC] transition-all"
                >
                  <Building2 className="w-4 h-4 text-[#11AFC1] shrink-0" />
                  Company
                </Link>

                {/* Products accordion */}
                <div>
                  <button
                    type="button"
                    onClick={() => setMobileProductsOpen((v) => !v)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[#002F5B] hover:bg-[#F2FAFC] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Layers className="w-4 h-4 text-[#11AFC1] shrink-0" />
                      Products
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#687A86] transition-transform duration-200 ${
                        mobileProductsOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {mobileProductsOpen && (
                    <div className="mt-1 space-y-0.5 pl-3 pb-1">
                      {products.map((product) => (
                        <Link
                          key={product.id}
                          href={product.href}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-[#3D5066] hover:bg-[#F2FAFC] hover:text-[#002F5B] transition-all"
                        >
                          <div
                            className={`w-7 h-7 rounded-lg bg-gradient-to-br ${product.color} flex items-center justify-center shrink-0`}
                          >
                            <product.Icon className="w-3.5 h-3.5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-[#002F5B] text-[13px]">
                              {product.name}
                            </div>
                            <div className="text-[10px] font-mono text-[#11AFC1] uppercase tracking-wide">
                              {product.category}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/technology"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[#002F5B] hover:bg-[#F2FAFC] transition-all"
                >
                  <Cpu className="w-4 h-4 text-[#11AFC1] shrink-0" />
                  Technology
                </Link>

                <Link
                  href="/impact"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[#002F5B] hover:bg-[#F2FAFC] transition-all"
                >
                  <Globe2 className="w-4 h-4 text-[#11AFC1] shrink-0" />
                  Impact
                </Link>

                <Link
                  href="/insights"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[#002F5B] hover:bg-[#F2FAFC] transition-all"
                >
                  <BookOpen className="w-4 h-4 text-[#11AFC1] shrink-0" />
                  Insights
                </Link>

                <Link
                  href="/partners"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[#002F5B] hover:bg-[#F2FAFC] transition-all"
                >
                  <Handshake className="w-4 h-4 text-[#11AFC1] shrink-0" />
                  Partners
                </Link>
              </div>

              {/* Divider */}
              <div className="my-3 px-5">
                <div className="h-px bg-[#EEF3F6]" />
              </div>

              {/* Secondary links */}
              <div className="px-3 space-y-0.5">
                <Link
                  href="/careers"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#687A86] hover:bg-[#F7FAFC] hover:text-[#002F5B] transition-all"
                >
                  <Users className="w-4 h-4 text-[#C5D0D8] shrink-0" />
                  Careers
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#687A86] hover:bg-[#F7FAFC] hover:text-[#002F5B] transition-all"
                >
                  <Phone className="w-4 h-4 text-[#C5D0D8] shrink-0" />
                  Contact
                </Link>
              </div>
            </div>

            {/* Drawer footer CTA */}
            <div className="p-4 border-t border-[#EEF3F6]">
              <Link
                href="/products"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-[#002F5B] hover:bg-[#003E72] text-white text-sm font-bold shadow-sm transition-all"
              >
                <span>Explore Braxvio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
