'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { SearchModal } from '../search/SearchModal';
import { DocItem } from '@/lib/docs';
import {
  Shield,
  Search,
  Menu,
  X,
  BookOpen,
  Layers,
  Cpu,
  Download,
  Users,
  Mail,
  Award,
  Sparkles,
} from 'lucide-react';

interface HeaderProps {
  docs?: DocItem[];
}

export const Header: React.FC<HeaderProps> = ({ docs = [] }) => {
  const { language, t } = useLanguage();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('nav.home'), icon: Shield },
    { href: '/docs', label: t('nav.documentation'), icon: BookOpen },
    { href: '/modules', label: t('nav.modules'), icon: Layers },
    { href: '/architecture', label: t('nav.architecture'), icon: Cpu },
    { href: '/research', label: t('nav.research'), icon: Award },
    { href: '/downloads', label: t('nav.downloads'), icon: Download },
    { href: '/about', label: t('nav.about'), icon: Sparkles },
    { href: '/contributors', label: t('nav.contributors'), icon: Users },
    { href: '/contact', label: t('nav.contact'), icon: Mail },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-dark-border bg-dark-bg/85 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo with Official logo.png */}
          <Link href="/" className="flex items-center gap-3 group active:scale-95 transition-transform">
            <div className="relative w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-500/40 p-1 flex items-center justify-center group-hover:border-cyan-400 group-hover:shadow-neon-glow transition-all">
              <Image
                src="/logo.png"
                alt="BunyanX Logo"
                width={36}
                height={36}
                className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]"
                priority
              />
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-100 tracking-wider group-hover:text-cyan-400 transition-colors">
                Bunyan<span className="text-cyan-400">X</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono text-cyan-400/80 block -mt-1">
                ENTERPRISE NGFW
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.slice(0, 6).map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-dark-card active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <Icon className="w-3.5 h-3.5 text-slate-400" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Bar (Search Trigger, Language, Theme, Mobile Menu) */}
          <div className="flex items-center gap-2">
            {/* Instant Search Trigger Button with Visual Pulse */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-card border border-cyan-500/30 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 active:scale-95 transition-all text-xs font-semibold shadow-sm hover:shadow-neon-glow"
              title="Open Search Modal (Ctrl + K)"
            >
              <Search className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="hidden md:inline">{t('searchPlaceholder')}</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] rounded bg-dark-bg border border-dark-border text-cyan-400 font-mono">
                Ctrl K
              </kbd>
            </button>

            <LanguageSwitcher />
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg bg-dark-card border border-dark-border text-slate-300 hover:text-cyan-400 active:scale-95 transition-all"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-dark-border bg-dark-card/95 backdrop-blur-2xl p-4 space-y-2 animate-fadeIn">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-200 hover:text-cyan-400 hover:bg-dark-hover active:scale-95 transition-all"
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Global Instant Search Modal */}
      <SearchModal
        docs={docs}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};
