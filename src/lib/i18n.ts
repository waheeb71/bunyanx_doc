import ar from '@/locales/ar.json';
import en from '@/locales/en.json';

export type Language = 'ar' | 'en';

export const dictionaries = { ar, en };

export function getDictionary(lang: Language) {
  return dictionaries[lang] || dictionaries.ar;
}
