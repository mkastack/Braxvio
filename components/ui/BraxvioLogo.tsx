'use client';

import React from 'react';
import Image from 'next/image';

interface BraxvioLogoProps {
  variant?: 'full' | 'mark' | 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export default function BraxvioLogo({
  variant = 'full',
  size = 'md',
  showTagline = false,
  className = ''
}: BraxvioLogoProps) {
  const dimensions = {
    sm: { imgW: 30, imgH: 38, text: 'text-lg', tagline: 'text-[9px]' },
    md: { imgW: 42, imgH: 53, text: 'text-2xl', tagline: 'text-[10px]' },
    lg: { imgW: 58, imgH: 73, text: 'text-3xl', tagline: 'text-xs' },
    xl: { imgW: 84, imgH: 106, text: 'text-5xl', tagline: 'text-sm' }
  }[size];

  const isLight = variant === 'light';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* The authentic BRAXVIO logo mark — pixel-perfect crop from source asset */}
      <div
        className="relative shrink-0 transition-transform duration-200 hover:scale-105 drop-shadow-sm"
        style={{ width: dimensions.imgW, height: dimensions.imgH }}
      >
        <Image
          src="/braxvio-mark.png"
          alt="Braxvio Logo"
          fill
          className="object-contain object-left"
          priority
          sizes={`${dimensions.imgW * 2}px`}
        />
      </div>

      {variant !== 'mark' && (
        <div className="flex flex-col leading-none justify-center">
          <span
            className={`font-black tracking-tight leading-[1] ${dimensions.text} ${
              isLight ? 'text-white' : 'text-[#002F5B]'
            }`}
            style={{ fontFamily: 'var(--font-manrope), sans-serif' }}
          >
            Braxvio
          </span>
          {showTagline && (
            <span
              className={`font-semibold tracking-[0.16em] uppercase mt-1 ${dimensions.tagline} ${
                isLight ? 'text-[#42D6C5]' : 'text-[#006EAA]'
              }`}
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              Build. Innovate. Elevate.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
