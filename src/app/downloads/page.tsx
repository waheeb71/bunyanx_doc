import React from 'react';
import { getAllDocs } from '@/lib/docs';
import { Download, FileText, GraduationCap, ArrowLeft, FileCode, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'مركز التحميلات والمصادر الأكاديمية',
  description: 'تحميل الرسالة الماستر الموحدة وملفات التوثيق الأكاديمي المنفردة لمنظومة BUNYANX Intelligent Response System to Cyberattacks.',
};

export default async function DownloadsPage() {
  const docs = await getAllDocs();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-10 space-y-4 text-center max-w-3xl mx-auto bg-[#091424]">
        <div className="cyber-badge">
          <Download className="w-3.5 h-3.5 text-cyan-400" />
          <span>Academic Downloads & Resources</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100">
          مركز التحميلات والمصادر الأكاديمية
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          تحميل الرسالة الأكاديمية الموحدة الشاملة، ملفات التوثيق المنفردة لكل وحدة أمنية، والمراجع الهندسية المعتمدة.
        </p>
      </div>

      {/* Primary Download: Master Thesis */}
      <div className="glass-panel p-6 sm:p-8 bg-dark-surface/95 border-cyan-500/40 shadow-neon-subtle flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl text-center sm:text-right">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-cyan-400 font-mono text-xs font-bold">
            <GraduationCap className="w-4 h-4" />
            <span>الرسالة الماستر الموحدة (Complete Academic Thesis)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
            تقرير مشروع التخرج الشامل — 8 فصول موثقة
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            يحتوي على التحليل الكامل، مراجعة الأدبيات، المعمارية الهندسية، تفاصيل الـ 17 وحدة أمنية، 27 مساهمة بحثية، ومصفوفات الاختبار والتحقق.
          </p>
          <div className="text-xs font-mono text-slate-400 pt-1">
            صيغة الملف: Markdown / Document | حجم الملف: 124.5 KB | أسطر التوثيق: +2,380 سطر
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <a
            href="/final_master_documentation.md"
            download
            className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-bold text-xs sm:text-sm hover:bg-cyan-400 active:scale-95 transition-all shadow-sm flex items-center gap-2 min-h-[44px]"
          >
            <Download className="w-4 h-4" />
            <span>تحميل الرسالة الماستر</span>
          </a>
          <Link
            href="/docs/master-thesis"
            className="px-5 py-3 rounded-xl bg-dark-bg border border-dark-border text-slate-200 hover:text-cyan-400 active:scale-95 transition-all text-xs sm:text-sm font-semibold min-h-[44px]"
          >
            <span>قراءة مباشرة</span>
          </Link>
        </div>
      </div>

      {/* Individual Documentation Files Download Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-dark-border">
          <h3 className="text-lg sm:text-xl font-bold text-slate-100">
            تحميل ملفات التوثيق المنفردة (18 وثيقة)
          </h3>
          <span className="text-xs font-mono text-cyan-400">Direct Download (.md)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {docs.map((doc) => (
            <div
              key={doc.slug}
              className="glass-panel p-4 flex items-center justify-between gap-3 bg-dark-surface/90 border-dark-border hover:border-cyan-500/30 transition-all"
            >
              <div className="space-y-1 min-w-0">
                <h4 className="font-bold text-xs text-slate-200 truncate">{doc.titleAr}</h4>
                <div className="text-[10px] font-mono text-slate-400 truncate">{doc.filename}</div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <Link
                  href={`/docs/${doc.slug}`}
                  className="p-2 rounded-lg bg-dark-bg border border-dark-border text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                  title="قراءة في المتصفح"
                >
                  <FileText className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={`/${doc.filename}`}
                  download
                  className="p-2 rounded-lg bg-dark-bg border border-dark-border text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all"
                  title="تحميل الملف"
                >
                  <Download className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
