'use client';

import React, { useState, useEffect } from 'react';
import { FileText, BookOpen, ExternalLink, X, Shield, ArrowLeft, Zap } from 'lucide-react';

export function DocChoiceModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal automatically on homepage load
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-[#091527] border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.25)] p-6 sm:p-8 space-y-6 overflow-hidden text-right font-sans transition-all transform scale-100"
        dir="rtl"
      >
        {/* Subtle Decorative Background Glow */}
        <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 p-2 rounded-xl bg-dark-surface border border-slate-700/60 text-slate-400 hover:text-slate-100 hover:border-slate-500 transition-colors cursor-pointer"
          aria-label="إغلاق النافذة"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-semibold font-mono">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>منظومة BUNYANX — دليل التوثيق</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 leading-snug">
            اختر نوع التوثيق المطلوب لاستعراض المشروع:
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            مرحباً بك! يمكنك اختيار استعراض أطروحة وتوثيق منظومة BUNYANX بالصيغة الفورية السريعة أو التوثيق التفاعلي المبوّب.
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {/* Option 1: Short Documentation */}
          <a
            href="https://bunyanx.netlify.app/short-documentation.html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="group relative p-5 rounded-xl bg-gradient-to-br from-cyan-950/90 via-emerald-950/60 to-dark-surface border-2 border-cyan-400/60 hover:border-cyan-400 shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 flex flex-col justify-between space-y-4 text-right cursor-pointer hover:-translate-y-1"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-cyan-500 text-slate-950 flex items-center justify-center font-bold shadow-md group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-400/40">
                  موصى به للعرض والطباعة
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-slate-100 group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <span>التوثيق المختصر السريع</span>
                  <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
                  صفحة توثيق واحدة شاملة للأطروحة كاملة، مصممة للعرض السريع، والطباعة، والتصفح المرن على الجوال.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-cyan-500/30 flex items-center justify-between text-xs font-extrabold text-cyan-400">
              <span className="flex items-center gap-1">
                <span>فتح التوثيق المختصر</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Option 2: Unified Documentation */}
          <a
            href="/docs"
            onClick={handleClose}
            className="group relative p-5 rounded-xl bg-dark-surface border border-slate-700/80 hover:border-cyan-500/50 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between space-y-4 text-right cursor-pointer hover:-translate-y-1"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 text-cyan-400 flex items-center justify-center font-bold group-hover:border-cyan-500/40 transition-colors">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-mono">
                  فصول مبوّبة
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-slate-100 group-hover:text-cyan-400 transition-colors">
                  التوثيق الموحد التفصيلي
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                  استعراض فصول الأطروحة التسعة والوحدات الـ 17 بالتفصيل عبر المنيو التفاعلي للمنظومة.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-slate-300 group-hover:text-cyan-400">
              <span>تصفح الفصول</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </a>
        </div>

        {/* Footer info & close text button */}
        <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-200 underline underline-offset-4 transition-colors cursor-pointer"
          >
            متابعة تصفح الواجهة الرئيسية مباشرة ←
          </button>
          <span className="font-mono text-[11px] text-slate-500">BUNYANX NGFW v1.0</span>
        </div>
      </div>
    </div>
  );
}
