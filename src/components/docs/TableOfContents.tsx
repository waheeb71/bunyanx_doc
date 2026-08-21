'use client';

import React, { useState, useEffect } from 'react';
import { TocItem } from '@/lib/docs';
import { useLanguage } from '@/context/LanguageContext';
import { List, AlignLeft, ChevronDown } from 'lucide-react';

interface TableOfContentsProps {
  headings: TocItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  const { language, t } = useLanguage();
  const [activeId, setActiveId] = useState<string>('');
  const [isMobileTocOpen, setIsMobileTocOpen] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -70% 0px' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  return (
    <>
      {/* Mobile Sticky Quick Jump Dropdown */}
      <div className="lg:hidden w-full glass-panel p-3 my-2">
        <button
          onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
          className="w-full flex items-center justify-between text-xs font-bold text-slate-200 py-1"
        >
          <div className="flex items-center gap-2">
            <List className="w-4 h-4 text-cyan-400" />
            <span>{t('docTools.toc')} ({headings.length} أقسام)</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-cyan-400 transition-transform ${isMobileTocOpen ? 'rotate-180' : ''}`} />
        </button>

        {isMobileTocOpen && (
          <nav className="pt-2 mt-2 border-t border-dark-border space-y-1 max-h-64 overflow-y-auto">
            {headings.map((item) => {
              const isActive = activeId === item.id;
              const indent = item.level === 3 ? 'pl-4' : item.level === 4 ? 'pl-6' : '';

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileTocOpen(false);
                    const target = document.getElementById(item.id);
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth' });
                      setActiveId(item.id);
                    }
                  }}
                  className={`block py-1.5 px-2 rounded-md text-xs truncate ${indent} ${
                    isActive
                      ? 'text-cyan-400 font-bold bg-cyan-950/60'
                      : 'text-slate-300 hover:text-cyan-400'
                  }`}
                >
                  {item.text}
                </a>
              );
            })}
          </nav>
        )}
      </div>

      {/* Desktop Sticky Table of Contents */}
      <div className="hidden lg:block w-64 shrink-0 space-y-4">
        <div className="glass-panel p-4 sticky top-20 bg-dark-surface/90 border-dark-border">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 pb-2 border-b border-dark-border font-mono">
            <List className="w-4 h-4 text-cyan-400" />
            <span>{t('docTools.toc')}</span>
          </div>

          <nav className="space-y-1 text-xs max-h-[calc(100vh-140px)] overflow-y-auto pr-1">
            {headings.map((item) => {
              const isActive = activeId === item.id;
              const indent = item.level === 3 ? 'pl-4' : item.level === 4 ? 'pl-6' : '';

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById(item.id);
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth' });
                      setActiveId(item.id);
                    }
                  }}
                  className={`block py-1 px-2 rounded-md transition-all text-[11px] truncate ${indent} ${
                    isActive
                      ? 'text-cyan-400 font-bold bg-cyan-950/60 border-l-2 border-cyan-400'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#11223E]'
                  }`}
                >
                  {item.text}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};
