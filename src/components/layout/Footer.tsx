'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { BookOpen, Github, Cpu, Layers, PlayCircle, CheckCircle2, Users, FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t border-dark-border bg-[#050D18] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Academic Affiliation */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-dark-surface border border-dark-border p-1.5 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="BunyanX Official Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-base sm:text-lg text-slate-100">
                  BUNYAN<span className="text-cyan-400">X</span> 
                </span>
                <span className="text-[10px] font-mono text-cyan-400 block -mt-1 font-semibold">
                  Cybersecurity Graduation Project — 2026
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              منظومة جدار ناري مؤسسية متعددة الطبقات تجمع بين تسريع النواة eBPF/XDP، محركات الفحص الدقيق، ونماذج الذكاء الاصطناعي التنبؤي والسلوكي.
            </p>
            <div className="p-3 rounded-lg bg-dark-surface border border-dark-border/80 text-xs text-slate-300 font-mono space-y-1">
              <div className="text-cyan-400 font-semibold">{t('footer.university')}</div>
              <div className="text-slate-400 text-[11px]">تحت إشراف: المهندس يحيى الصبري</div>
            </div>
          </div>

          {/* Col 2: System Sections */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/architecture" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>معمارية النظام وخط السير</span>
                </Link>
              </li>
              <li>
                <Link href="/modules" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>الوحدات الأمنية الـ 17</span>
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <PlayCircle className="w-3.5 h-3.5 text-cyan-400" />
                  <span>العروض التجريبية والوسائط</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Documentation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
              {t('footer.resources')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/docs" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  <span>التوثيق الأكاديمي الشامل (18 وثيقة)</span>
                </Link>
              </li>
              <li>
                <Link href="/docs/master-thesis" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>رسالة مشروع التخرج الماستر</span>
                </Link>
              </li>
               <li>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                 <span>التواصل </span>
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <span>فريق العمل الأكاديمي</span>
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/waheeb71/bunyanx_doc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2"
                >
                  <Github className="w-3.5 h-3.5 text-cyan-400" />
                  <span>مستودع GitHub المصدري</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>{t('footer.copyright')}</p>
          <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
            <span>Next-Gen Architecture</span>
            <span>•</span>
            <span>Zero Trust & eBPF</span>
            <span>•</span>
            <span>Academic Release v1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
