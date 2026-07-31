'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { BookOpen, Download, Github, Mail, Globe, Cpu, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t border-dark-border bg-dark-bg/90 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand Logo & Academic Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-500/40 p-1 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="BunyanX Logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-extrabold text-lg text-slate-100">
                Bunyan<span className="text-cyan-400">X</span> Enterprise NGFW
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              {t('siteSubTitle')} — مشروع التخرج الأكاديمي الشامل لجامعة الهندسة وقسم أمن المعلومات وشبكات الاتصالات.
            </p>
            <div className="text-xs text-cyan-400/90 font-mono">
              {t('footer.university')}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/docs" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  {t('nav.documentation')}
                </Link>
              </li>
              <li>
                <Link href="/modules" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  {t('nav.modules')}
                </Link>
              </li>
              <li>
                <Link href="/architecture" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  {t('nav.architecture')}
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-cyan-400" />
                  {t('nav.research')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Social */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              {t('footer.resources')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/downloads" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  {t('nav.downloads')}
                </Link>
              </li>
              <li>
                <Link href="/contributors" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  {t('nav.contributors')}
                </Link>
              </li>
              <li>
                <a href="https://github.com/waheeb71/bunyanx_doc" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5 text-cyan-400" />
                  GitHub Repository
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>{t('footer.copyright')}</p>

        </div>
      </div>
    </footer>
  );
};
