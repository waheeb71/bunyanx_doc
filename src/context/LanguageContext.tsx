'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, getDictionary } from '@/lib/i18n';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: 'rtl' | 'ltr';
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: 'ar',
  setLanguage: () => {},
  dir: 'rtl',
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar');

  useEffect(() => {
    const saved = localStorage.getItem('bunyanx_lang') as Language;
    if (saved && (saved === 'ar' || saved === 'en')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bunyanx_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';
  const dict = getDictionary(language);

  // Helper for nested keys like 'nav.home'
  const t = (key: string): string => {
    const keys = key.split('.');
    let current: any = dict;
    for (const k of keys) {
      if (current && current[k] !== undefined) {
        current = current[k];
      } else {
        return key;
      }
    }
    return typeof current === 'string' ? current : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
