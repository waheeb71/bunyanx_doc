'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DocItem } from '@/lib/docs';
import { useLanguage } from '@/context/LanguageContext';
import { FileText, ListFilter, ChevronDown } from 'lucide-react';

interface SidebarProps {
  docs: DocItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ docs }) => {
  const pathname = usePathname();
  const { language } = useLanguage();
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  // Group docs by category
  const categoriesMap: Record<string, DocItem[]> = {};
  docs.forEach((doc) => {
    const cat = language === 'ar' ? doc.categoryAr : doc.categoryEn;
    if (!categoriesMap[cat]) categoriesMap[cat] = [];
    categoriesMap[cat].push(doc);
  });

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-4">
      {/* Mobile Accordion Header */}
      <div className="lg:hidden glass-panel p-3">
        <button
          onClick={() => setIsMobileExpanded(!isMobileExpanded)}
          className="w-full flex items-center justify-between text-xs font-bold text-slate-200 py-1"
        >
          <div className="flex items-center gap-2">
            <ListFilter className="w-4 h-4 text-cyan-400" />
            <span>{language === 'ar' ? 'فهرس كافة ملفات التوثيق الـ 18' : 'All 18 Documentation Files'}</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-cyan-400 transition-transform ${isMobileExpanded ? 'rotate-180' : ''}`} />
        </button>

        {isMobileExpanded && (
          <div className="pt-3 border-t border-dark-border mt-2 space-y-3 max-h-80 overflow-y-auto">
            {Object.entries(categoriesMap).map(([category, categoryDocs]) => (
              <div key={category} className="space-y-1">
                <div className="text-[11px] font-bold text-cyan-400/90 px-2 py-0.5 bg-dark-bg rounded border border-cyan-500/20 font-mono">
                  {category}
                </div>
                <div className="space-y-0.5 pt-0.5">
                  {categoryDocs.map((doc) => {
                    const isActive = pathname === `/docs/${doc.slug}`;
                    const title = language === 'ar' ? doc.titleAr : doc.titleEn;

                    return (
                      <Link
                        key={doc.slug}
                        href={`/docs/${doc.slug}`}
                        onClick={() => setIsMobileExpanded(false)}
                        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                          isActive
                            ? 'bg-cyan-500/15 text-cyan-400 font-semibold border border-cyan-500/30'
                            : 'text-slate-300 hover:text-cyan-400'
                        }`}
                      >
                        <FileText className={`w-3 h-3 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                        <span className="truncate">{title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Sticky Sidebar */}
      <div className="hidden lg:block glass-panel p-4 sticky top-20 bg-dark-surface/90 border-dark-border">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2 font-mono">
          {language === 'ar' ? 'فهرس التوثيق الأكاديمي' : 'Academic Docs Index'}
        </h3>

        <div className="space-y-4 text-xs max-h-[calc(100vh-140px)] overflow-y-auto pr-1">
          {Object.entries(categoriesMap).map(([category, categoryDocs]) => (
            <div key={category} className="space-y-1">
              <div className="text-[11px] font-bold text-cyan-400 px-2 py-1 bg-dark-bg rounded-md border border-cyan-500/20 font-mono">
                {category}
              </div>
              <div className="space-y-0.5 pt-1">
                {categoryDocs.map((doc) => {
                  const isActive = pathname === `/docs/${doc.slug}`;
                  const title = language === 'ar' ? doc.titleAr : doc.titleEn;

                  return (
                    <Link
                      key={doc.slug}
                      href={`/docs/${doc.slug}`}
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all text-xs ${
                        isActive
                          ? 'bg-cyan-500/15 text-cyan-400 font-semibold border border-cyan-500/30'
                          : 'text-slate-300 hover:bg-[#11223E] hover:text-slate-100'
                      }`}
                    >
                      <FileText className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                      <span className="truncate">{title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
