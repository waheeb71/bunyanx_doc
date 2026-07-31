'use client';

import React, { useState, useEffect } from 'react';
import { DocItem } from '@/lib/docs';
import { searchDocs, SearchResult } from '@/lib/search';
import { useLanguage } from '@/context/LanguageContext';
import { Search, X, FileText, ArrowRight, CornerDownLeft } from 'lucide-react';
import Link from 'next/link';

interface SearchModalProps {
  docs: DocItem[];
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ docs, isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (query.trim()) {
      setResults(searchDocs(docs, query));
    } else {
      setResults([]);
    }
  }, [query, docs]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-dark-card border border-cyan-500/30 rounded-2xl shadow-neon-glow overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-dark-border bg-dark-bg/60">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            autoFocus
            className="w-full mx-3 bg-transparent text-slate-100 placeholder-slate-400 focus:outline-none text-sm"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-dark-hover"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-2">
          {query.trim() && results.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-sm">
              {language === 'ar' ? 'لم يتم العثور على نتائج تطابق بحثك' : 'No documentation results found'}
            </div>
          )}

          {results.map(({ doc, matches }) => {
            const title = language === 'ar' ? doc.titleAr : doc.titleEn;
            const category = language === 'ar' ? doc.categoryAr : doc.categoryEn;
            return (
              <Link
                key={doc.slug}
                href={`/docs/${doc.slug}`}
                onClick={onClose}
                className="block p-3 rounded-xl bg-dark-bg/50 border border-dark-border hover:border-cyan-500/40 hover:bg-dark-hover transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors">
                      {title}
                    </span>
                  </div>
                  <span className="cyber-badge">{category}</span>
                </div>
                <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                  {language === 'ar' ? doc.summaryAr : doc.summaryEn}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Footer shortcuts info */}
        <div className="px-4 py-2 border-t border-dark-border bg-dark-bg/80 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-dark-card border border-dark-border text-slate-300">Esc</kbd>
              {language === 'ar' ? 'إغلاق' : 'Close'}
            </span>
          </div>
          <span className="text-cyan-400 font-mono text-[10px]">BunyanX Instant Search v1.0</span>
        </div>
      </div>
    </div>
  );
};
