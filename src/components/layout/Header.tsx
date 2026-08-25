'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
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
  Users,
  PlayCircle,
  CheckCircle2,
  Info,
} from 'lucide-react';

interface HeaderProps {
  docs?: DocItem[];
}

export const Header: React.FC<HeaderProps> = ({ docs = [] }) => {
  const { language, t } = useLanguage();
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('nav.home'), icon: Shield },
    { href: '/about', label: t('nav.overview'), icon: Info },
    { href: '/architecture', label: t('nav.architecture'), icon: Cpu },
    { href: '/modules', label: t('nav.modules'), icon: Layers },
    { href: '/demo', label: t('nav.demo'), icon: PlayCircle },
    { href: '/docs', label: t('nav.documentation'), icon: BookOpen },
    { href: '/team', label: t('nav.team'), icon: Users },
  ];

  const isActive = (href: string) => {
    if (!pathname) return href === '/';
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-dark-border bg-dark-bg/90 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group active:scale-95 transition-transform shrink-0">
            <div className="relative w-9 h-9 rounded-xl bg-dark-surface border border-dark-border p-1.5 flex items-center justify-center group-hover:border-cyan-500/60 transition-all">
              <Image
                src="/logo.png"
                alt="BunyanX Official Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div>
              <div className="font-extrabold text-base sm:text-lg tracking-wider text-slate-100 group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                <span>BUNYAN<span className="text-cyan-400">X</span></span>
              </div>
             
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    active
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-300 hover:text-cyan-400 hover:bg-dark-surface'
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Compact Tablet Navigation (Top 4) */}
          <nav className="hidden lg:flex xl:hidden items-center gap-1">
            {navLinks.slice(0, 5).map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    active
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-300 hover:text-cyan-400 hover:bg-dark-surface'
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Actions: Search, Language, Theme, Mobile Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-dark-surface border border-dark-border text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 active:scale-95 transition-all text-xs font-medium"
              title="Search (Ctrl + K)"
            >
              <Search className="w-4 h-4 text-cyan-400" />
              <span className="hidden md:inline text-slate-400">{t('searchPlaceholder').split('...')[0]}</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] rounded bg-dark-bg border border-dark-border text-cyan-400/80 font-mono">
                Ctrl K
              </kbd>
            </button>

       {  /*  <LanguageSwitcher />*/}
            <ThemeToggle />

            {/* Mobile Menu Toggle Button (minimum 44px touch target) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-lg bg-dark-surface border border-dark-border text-slate-300 hover:text-cyan-400 active:scale-95 transition-all"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-dark-border bg-[#07111F]/98 backdrop-blur-2xl px-4 py-4 space-y-1.5 animate-fadeIn shadow-2xl">
            <div className="pb-2 mb-2 border-b border-dark-border flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-cyan-400 font-semibold">قائمة التصفح السريعة</span>
              <span>دفعة 2026</span>
            </div>
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all min-h-[44px] ${
                    active
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 font-bold'
                      : 'text-slate-200 hover:text-cyan-400 hover:bg-dark-surface'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal
        docs={docs}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};
