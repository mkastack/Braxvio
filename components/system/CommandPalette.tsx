'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  ArrowRight,
  X,
  Sparkles,
  Building2,
  Pill,
  Truck,
  Landmark,
  BookOpen,
  Cpu,
  Users,
  Phone,
  Home,
  Globe2,
  Zap,
} from 'lucide-react';
import Image from 'next/image';

interface CommandItem {
  id: string;
  label: string;
  sub?: string;
  href: string;
  category: string;
  icon: React.ReactNode;
  keywords?: string[];
}

const ALL_COMMANDS: CommandItem[] = [
  // Navigation
  {
    id: 'home',
    label: 'Home',
    sub: 'Braxvio Digital Headquarters',
    href: '/',
    category: 'Navigation',
    icon: <Home className="w-4 h-4" />,
    keywords: ['home', 'start', 'main'],
  },
  {
    id: 'company',
    label: 'Company',
    sub: 'About Braxvio',
    href: '/company',
    category: 'Navigation',
    icon: <Building2 className="w-4 h-4" />,
    keywords: ['about', 'who we are'],
  },
  {
    id: 'technology',
    label: 'Technology',
    sub: 'Engineering Architecture',
    href: '/technology',
    category: 'Navigation',
    icon: <Cpu className="w-4 h-4" />,
    keywords: ['engineering', 'stack', 'infra'],
  },
  {
    id: 'impact',
    label: 'Impact',
    sub: 'Authentic Impact',
    href: '/impact',
    category: 'Navigation',
    icon: <Globe2 className="w-4 h-4" />,
    keywords: ['mission', 'social', 'africa'],
  },
  {
    id: 'insights',
    label: 'Insights',
    sub: 'Braxvio Publication',
    href: '/insights',
    category: 'Navigation',
    icon: <BookOpen className="w-4 h-4" />,
    keywords: ['blog', 'articles', 'research'],
  },
  {
    id: 'careers',
    label: 'Careers',
    sub: 'Join Braxvio',
    href: '/careers',
    category: 'Navigation',
    icon: <Users className="w-4 h-4" />,
    keywords: ['jobs', 'work', 'hire'],
  },
  {
    id: 'contact',
    label: 'Contact',
    sub: 'Start a Conversation',
    href: '/contact',
    category: 'Navigation',
    icon: <Phone className="w-4 h-4" />,
    keywords: ['get in touch', 'reach out'],
  },
  // Products
  {
    id: 'kampus',
    label: 'Kampus',
    sub: 'University life ecosystem',
    href: '/products/kampus',
    category: 'Products',
    icon: <Building2 className="w-4 h-4 text-[#11AFC1]" />,
    keywords: ['university', 'students', 'campus', 'housing', 'education'],
  },
  {
    id: 'pharmora',
    label: 'Pharmora',
    sub: 'Healthcare access network',
    href: '/products/pharmora',
    category: 'Products',
    icon: <Pill className="w-4 h-4 text-[#008FC4]" />,
    keywords: ['pharmacy', 'medicine', 'health', 'drugs'],
  },
  {
    id: 'ecolift',
    label: 'Ecolift',
    sub: 'Smart waste logistics',
    href: '/products/ecolift',
    category: 'Products',
    icon: <Truck className="w-4 h-4 text-[#42D6C5]" />,
    keywords: ['waste', 'eco', 'recycling', 'municipal', 'green'],
  },
  {
    id: 'devpay',
    label: 'DevPay Africa',
    sub: 'Developer payment rails',
    href: '/products/devpay-africa',
    category: 'Products',
    icon: <Landmark className="w-4 h-4 text-[#006EAA]" />,
    keywords: ['payments', 'developers', 'freelance', 'africa', 'escrow'],
  },
];

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const filtered = query.trim()
    ? ALL_COMMANDS.filter((cmd) => {
        const q = query.toLowerCase();
        return (
          cmd.label.toLowerCase().includes(q) ||
          cmd.sub?.toLowerCase().includes(q) ||
          cmd.keywords?.some((k) => k.includes(q))
        );
      })
    : ALL_COMMANDS;

  // Group by category
  const grouped: Record<string, CommandItem[]> = {};
  for (const cmd of filtered) {
    if (!grouped[cmd.category]) grouped[cmd.category] = [];
    grouped[cmd.category].push(cmd);
  }

  const navigate = (href: string) => {
    router.push(href);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[12vh] px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Palette */}
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-[0_32px_80px_rgba(0,47,91,0.25)] border border-[#DDE8EC] overflow-hidden animate-fade-in-scale">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-[#DDE8EC]">
          <div className="relative w-5 h-6 shrink-0">
            <Image src="/braxvio-mark.png" alt="Braxvio Logo" fill className="object-contain" sizes="24px" />
          </div>
          <Search className="w-4 h-4 text-[#687A86] shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Braxvio — products, pages, insights..."
            className="flex-1 bg-transparent text-sm text-[#06131D] placeholder:text-[#687A86] outline-none"
          />
          <div className="flex items-center gap-1.5 shrink-0">
            <kbd className="px-1.5 py-0.5 rounded bg-[#F7FAFC] border border-[#DDE8EC] text-[10px] font-mono text-[#687A86]">
              ESC
            </kbd>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-[#F2FAFC] text-[#687A86] hover:text-[#002F5B] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto py-2">
          {Object.entries(grouped).length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-[#687A86]">
              No results for &ldquo;{query}&rdquo;
            </div>
          ) : (
            Object.entries(grouped).map(([category, items]) => (
              <div key={category} className="mb-1">
                <div className="px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest text-[#687A86] font-bold">
                  {category}
                </div>
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.href)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#F2FAFC] transition-all group text-left"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#F7FAFC] border border-[#DDE8EC] flex items-center justify-center text-[#687A86] group-hover:bg-[#E8F6FA] group-hover:border-[#11AFC1]/30 group-hover:text-[#006EAA] transition-all shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-[#002F5B] group-hover:text-[#006EAA] transition-colors">
                        {item.label}
                      </div>
                      {item.sub && (
                        <div className="text-xs text-[#687A86] truncate">{item.sub}</div>
                      )}
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#DDE8EC] group-hover:text-[#11AFC1] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-[#DDE8EC] bg-[#F7FAFC] flex items-center justify-between text-[10px] font-mono text-[#687A86]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-white border border-[#DDE8EC]">↑↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-white border border-[#DDE8EC]">↵</kbd>
              Open
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[#11AFC1]">
            <Zap className="w-3 h-3" />
            <span>BRAXVIO SEARCH</span>
          </div>
        </div>
      </div>
    </div>
  );
}
