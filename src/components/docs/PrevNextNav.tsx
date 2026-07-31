'use client';

import React from 'react';
import Link from 'next/link';
import { DocItem } from '@/lib/docs';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PrevNextNavProps {
  prevDoc?: DocItem | null;
  nextDoc?: DocItem | null;
}

export const PrevNextNav: React.FC<PrevNextNavProps> = ({ prevDoc, nextDoc }) => {
  const { language, t, dir } = useLanguage();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8 pt-6 border-t border-dark-border">
      {prevDoc ? (
        <Link
          href={`/docs/${prevDoc.slug}`}
          className="p-4 rounded-xl glass-panel-hover flex flex-col space-y-1 group"
        >
          <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
            <ArrowRight className={`w-3 h-3 text-cyan-400 ${dir === 'rtl' ? '' : 'rotate-180'}`} />
            {t('docTools.previous')}
          </span>
          <span className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">
            {language === 'ar' ? prevDoc.titleAr : prevDoc.titleEn}
          </span>
        </Link>
      ) : <div />}

      {nextDoc ? (
        <Link
          href={`/docs/${nextDoc.slug}`}
          className="p-4 rounded-xl glass-panel-hover flex flex-col space-y-1 sm:items-end sm:text-right group"
        >
          <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
            {t('docTools.next')}
            <ArrowLeft className={`w-3 h-3 text-cyan-400 ${dir === 'rtl' ? '' : 'rotate-180'}`} />
          </span>
          <span className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">
            {language === 'ar' ? nextDoc.titleAr : nextDoc.titleEn}
          </span>
        </Link>
      ) : <div />}
    </div>
  );
};
