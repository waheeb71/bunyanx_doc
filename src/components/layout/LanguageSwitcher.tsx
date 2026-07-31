'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-card border border-dark-border text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all text-xs font-semibold"
      title="Switch Language / تغيير اللغة"
    >
      <Globe className="w-3.5 h-3.5 text-cyan-400" />
      <span>{language === 'ar' ? 'English' : 'العربية'}</span>
    </button>
  );
};
