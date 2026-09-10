'use client';

import React, { useState } from 'react';
import Header from '@/components/navigation/Header';
import CommandPalette from '@/components/system/CommandPalette';
import CookieNotice from '@/components/system/CookieNotice';
import Footer from '@/components/ui/Footer';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#06131D] selection:bg-[#11AFC1]/20 selection:text-[#002F5B]">
      <Header onOpenSearch={() => setSearchOpen(true)} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <CookieNotice />
    </div>
  );
}
