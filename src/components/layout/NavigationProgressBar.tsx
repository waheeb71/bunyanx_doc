'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

function NavigationLoadingSpinnerContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  // Stop spinner when route change completes
  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams]);

  // Trigger spinner instantly when clicking internal links
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target) {
        const href = target.getAttribute('href');
        if (href && href.startsWith('/') && !href.startsWith('#') && href !== pathname) {
          setIsLoading(true);
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md animate-fadeIn">
      {/* Centered Elegant Cyber Spinner Box */}
      <div className="glass-panel p-8 rounded-2xl border border-cyan-500/40 shadow-neon-strong flex flex-col items-center gap-4 text-center max-w-xs w-full mx-4">
        {/* Animated Cyber Spinning Ring with Central Logo */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Outer Fast Spinning Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 border-r-blue-500 animate-spin" />
          {/* Inner Reverse Slow Spinning Ring */}
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-indigo-400 border-l-cyan-300 animate-[spin_2s_linear_infinite_reverse]" />

          {/* Center Logo */}
          <div className="relative w-9 h-9 rounded-xl overflow-hidden p-1 flex items-center justify-center bg-cyan-950/90 shadow-neon-glow">
            <Image
              src="/logo.png"
              alt="BunyanX Loading Logo"
              width={36}
              height={36}
              className="w-full h-full object-contain animate-pulse"
              priority
            />
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-1">
          <div className="text-sm font-bold text-slate-100 tracking-wide">
            {language === 'ar' ? 'جاري فتح الوثيقة...' : 'Loading Document...'}
          </div>
          <div className="text-[11px] font-mono text-cyan-400/90">
            BUNYANX
            Intelligent Response System to Cyberattacks
          </div>
        </div>
      </div>
    </div>
  );
}

export const NavigationProgressBar: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <NavigationLoadingSpinnerContent />
    </Suspense>
  );
};
