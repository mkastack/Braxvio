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
  Zap,
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
  { label: 'Company', href: '/company', Icon: Building2 },
  { label: 'Products', href: '/products', hasMenu: true },
  { label: 'Technology', href: '/technology', Icon: Cpu },
  { label: 'Impact', href: '/impact', Icon: Globe2 },
  { label: 'Insights', href: '/insights', Icon: BookOpen },
];

export default function Header({ onOpenSearch }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const productsMenuRef = useRef<HTMLDivElement>(null);
  const productsButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Close products menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        productsMenuRef.current &&
        !productsMenuRef.current.contains(e.target as Node) &&
        productsButtonRef.current &&
        !productsButtonRef.current.contains(e.target as Node)
      ) {
        setProductsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-light border-b border-[#DDE8EC]/60 shadow-[0_4px_32px_rgba(0,47,91,0.08)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[68px]">

            {/* ── Logo ── */}
            <Link
              href="/"
              className="hidden sm:flex items-center gap-2.5 shrink-0 group py-1"
              aria-label="Braxvio Home"
            >
              <div className="relative w-7 h-9 sm:w-8 sm:h-10 shrink-0 transition-transform duration-300 group-hover:scale-105 drop-shadow-sm">
                <Image
                  src="/braxvio-mark.png"
                  alt="Braxvio Logo"
                  fill
                  className="object-contain object-left"
                  priority
                  sizes="(max-width: 640px) 28px, 32px"
                />
              </div>
              <div className="flex flex-col justify-center select-none">
                <span
                  className="font-black text-[#002F5B] text-lg sm:text-xl tracking-tight leading-none transition-colors duration-200 group-hover:text-[#006EAA]"
                  style={{ fontFamily: 'var(--font-manrope), sans-serif' }}
                >
                  Braxvio
                </span>
                <span className="text-[7.5px] sm:text-[8.5px] font-mono uppercase tracking-[0.16em] font-bold text-[#006EAA] mt-0.5">
                  Build. Innovate. Elevate.
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.hasMenu ? (
                  <div key={link.label} className="relative">
                    <button
                      ref={productsButtonRef}
                      onClick={() => setProductsOpen((v) => !v)}
                      className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        productsOpen || pathname.startsWith('/products')
                          ? 'text-[#006EAA] bg-[#F2FAFC]'
                          : 'text-[#3D5066] hover:text-[#002F5B] hover:bg-[#F7FAFC]'
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          productsOpen ? 'rotate-180 text-[#11AFC1]' : ''
                        }`}
                      />
                    </button>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      pathname === link.href || pathname.startsWith(link.href + '/')
                        ? 'text-[#006EAA] bg-[#F2FAFC]'
                        : 'text-[#3D5066] hover:text-[#002F5B] hover:bg-[#F7FAFC]'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* ── Desktop Actions ── */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={onOpenSearch}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-[#687A86] hover:text-[#002F5B] hover:bg-[#F2FAFC] transition-all duration-200 text-sm"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
                <span className="text-xs font-mono text-[#687A86]">⌘K</span>
              </button>

              <Link
                href="/careers"
                className="px-3.5 py-2 rounded-xl text-sm font-medium text-[#3D5066] hover:text-[#002F5B] hover:bg-[#F7FAFC] transition-all duration-200"
              >
                Careers
              </Link>

              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#003E72] via-[#006EAA] to-[#11AFC1] text-white text-sm font-semibold shadow-sm hover:shadow-md hover:opacity-95 transition-all duration-300 group"
              >
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* ── Mobile Actions ── */}
            <div className="flex lg:hidden items-center gap-2 ml-auto">
              <button
                onClick={onOpenSearch}
                className="p-2 rounded-xl text-[#687A86] hover:text-[#002F5B] hover:bg-[#F2FAFC] transition-all"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="p-2 rounded-xl text-[#002F5B] hover:bg-[#F2FAFC] transition-all"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Products Mega Menu ── */}
        {productsOpen && (
          <div
            ref={productsMenuRef}
            className="absolute top-full left-0 right-0 animate-fade-in-scale"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-5 pt-2">
              <div className="bg-white/95 backdrop-blur-xl border border-[#DDE8EC] rounded-2xl shadow-[0_20px_60px_rgba(0,47,91,0.12)] overflow-hidden">
                {/* Mega menu header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#DDE8EC] bg-[#F7FAFC]">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#11AFC1] font-bold mb-0.5">
                      THE BRAXVIO PRODUCT SYSTEM
                    </div>
                    <p className="text-xs text-[#687A86]">
                      Four platforms. One mission — technology that improves everyday life.
                    </p>
                  </div>
                  <Link
                    href="/products"
                    onClick={() => setProductsOpen(false)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#006EAA] hover:text-[#11AFC1] transition-colors"
                  >
                    <span>View all products</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Product grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#DDE8EC]">
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      href={product.href}
                      onClick={() => setProductsOpen(false)}
                      className="group bg-white p-5 hover:bg-[#F2FAFC] transition-all duration-200 flex flex-col gap-3"
                    >
                      <div className="flex items-start justify-between">
                        <div
                          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200`}
                        >
                          <product.Icon className="w-5 h-5 text-white" />
                        </div>
                        <span
                          className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider"
                          style={{
                            color: product.statusColor,
                            borderColor: `${product.statusColor}40`,
                            backgroundColor: `${product.statusColor}12`,
                          }}
                        >
                          {product.status}
                        </span>
                      </div>

                      <div>
                        <div className="text-sm font-extrabold text-[#002F5B] tracking-tight group-hover:text-[#006EAA] transition-colors">
                          {product.name}
                        </div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[#11AFC1] mt-0.5">
                          {product.category}
                        </div>
                        <p className="text-xs text-[#687A86] mt-1.5 leading-relaxed">
                          {product.tagline}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-semibold text-[#006EAA] group-hover:text-[#11AFC1] transition-colors mt-auto">
                        <span>Explore</span>
                        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── Mobile Menu Overlay ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white flex flex-col shadow-2xl mobile-menu-in">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#DDE8EC]">
              <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5">
                <div className="relative w-7 h-9 shrink-0">
                  <Image src="/braxvio-mark.png" alt="Braxvio Logo" fill className="object-contain" sizes="30px" />
                </div>
                <div className="flex flex-col select-none">
                  <span
                    className="font-black text-[#002F5B] text-lg tracking-tight leading-none"
                    style={{ fontFamily: 'var(--font-manrope), sans-serif' }}
                  >
                    Braxvio
                  </span>
                  <span className="text-[7.5px] font-mono uppercase tracking-[0.16em] font-bold text-[#006EAA] mt-0.5">
                    Build. Innovate. Elevate.
                  </span>
                </div>
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-xl bg-[#F7FAFC] text-[#687A86] hover:bg-[#F2FAFC] transition-all"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto py-4">
              {/* Main nav */}
              <div className="px-3 space-y-0.5">
                <Link
                  href="/company"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[#002F5B] hover:bg-[#F2FAFC] transition-all"
                >
                  <Building2 className="w-4.5 h-4.5 text-[#11AFC1]" />
                  Company
                </Link>

                {/* Products accordion */}
                <div>
                  <button
                    onClick={() => setMobileProductsOpen((v) => !v)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[#002F5B] hover:bg-[#F2FAFC] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Layers className="w-4.5 h-4.5 text-[#11AFC1]" />
                      Products
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#687A86] transition-transform duration-300 ${
                        mobileProductsOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {mobileProductsOpen && (
                    <div className="mt-1 space-y-0.5 pl-4">
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
                            <div className="font-semibold text-[#002F5B] text-[13px]">{product.name}</div>
                            <div className="text-[10px] font-mono text-[#11AFC1] uppercase tracking-wider">
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
                  <Cpu className="w-4.5 h-4.5 text-[#11AFC1]" />
                  Technology
                </Link>

                <Link
                  href="/impact"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[#002F5B] hover:bg-[#F2FAFC] transition-all"
                >
                  <Globe2 className="w-4.5 h-4.5 text-[#11AFC1]" />
                  Impact
                </Link>

                <Link
                  href="/insights"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[#002F5B] hover:bg-[#F2FAFC] transition-all"
                >
                  <BookOpen className="w-4.5 h-4.5 text-[#11AFC1]" />
                  Insights
                </Link>
              </div>

              {/* Divider */}
              <div className="my-4 px-3">
                <div className="h-px bg-[#DDE8EC]" />
              </div>

              {/* Secondary links */}
              <div className="px-3 space-y-0.5">
                <Link
                  href="/careers"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#687A86] hover:bg-[#F7FAFC] hover:text-[#002F5B] transition-all"
                >
                  <Users className="w-4.5 h-4.5 text-[#DDE8EC]" />
                  Careers
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#687A86] hover:bg-[#F7FAFC] hover:text-[#002F5B] transition-all"
                >
                  <Phone className="w-4.5 h-4.5 text-[#DDE8EC]" />
                  Contact
                </Link>
              </div>
            </div>

            {/* Drawer Footer CTA */}
            <div className="p-4 border-t border-[#DDE8EC] space-y-2.5">
              {/* Live system status */}
              <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#071C2B] text-white">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#42D6C5] animate-pulse" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#42D6C5]">
                    4 Products Active
                  </span>
                </div>
                <Zap className="w-3.5 h-3.5 text-[#11AFC1]" />
              </div>

              <Link
                href="/products"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#003E72] via-[#006EAA] to-[#11AFC1] text-white text-sm font-bold shadow-md transition-all hover:opacity-95"
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
