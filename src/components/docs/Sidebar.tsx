'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DocItem } from '@/lib/docs';
import { useLanguage } from '@/context/LanguageContext';
import {
  FileText,
  ChevronRight,
  GraduationCap,
  Shield,
  Zap,
  Eye,
  Globe,
  Filter,
  BrainCircuit,
  Lock,
  Cpu,
} from 'lucide-react';

interface SidebarProps {
  docs: DocItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ docs }) => {
  const pathname = usePathname();
  const { language } = useLanguage();

  // Group docs by category
  const categoriesMap: Record<string, DocItem[]> = {};
  docs.forEach((doc) => {
    const cat = language === 'ar' ? doc.categoryAr : doc.categoryEn;
    if (!categoriesMap[cat]) categoriesMap[cat] = [];
    categoriesMap[cat].push(doc);
  });

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-6">
      <div className="glass-panel p-4 sticky top-20">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
          {language === 'ar' ? 'فهرس التوثيق الأكاديمي' : 'Academic Docs Index'}
        </h3>

        <div className="space-y-4 text-xs">
          {Object.entries(categoriesMap).map(([category, categoryDocs]) => (
            <div key={category} className="space-y-1">
              <div className="text-[11px] font-bold text-cyan-400/90 px-2 py-1 bg-cyan-950/40 rounded-md border border-cyan-500/20">
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
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all ${
                        isActive
                          ? 'bg-cyan-500/15 text-cyan-400 font-semibold border border-cyan-500/30'
                          : 'text-slate-300 hover:bg-dark-hover hover:text-slate-100'
                      }`}
                    >
                      <FileText className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
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
