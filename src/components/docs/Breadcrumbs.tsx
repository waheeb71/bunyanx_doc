'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, FileText } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface BreadcrumbsProps {
  items: { label: string; href?: string }[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const { dir } = useLanguage();

  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6 flex-wrap">
      <Link href="/" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
        <Home className="w-3.5 h-3.5 text-cyan-400" />
        <span>الرئيسية</span>
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className={`w-3 h-3 text-slate-600 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
          {item.href ? (
            <Link href={item.href} className="hover:text-cyan-400 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-200 font-semibold truncate max-w-xs">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
