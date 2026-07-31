import React from 'react';
import Link from 'next/link';
import { getAllDocs } from '@/lib/docs';
import { BookOpen, FileText, ArrowLeft, Clock, FileCheck } from 'lucide-react';
import { Sidebar } from '@/components/docs/Sidebar';

export const metadata = {
  title: 'التوثيق الأكاديمي الشامل | BunyanX Enterprise NGFW',
  description: 'فهرس كافة ملفات التوثيق الأكاديمي الـ 18 لمنصة BunyanX Enterprise NGFW.',
};

export default async function DocsLandingPage() {
  const docs = await getAllDocs();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="glass-panel p-8 space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-cyan-400" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            مركز التوثيق الأكاديمي الشامل
          </h1>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
          يحتوي هذا المركز على جميع وثائق مشروع التخرج الأكاديمي الـ 18 المعتمدة لمنصة BunyanX Enterprise NGFW. يتم قراءة وتحليل كافة الملفات أوتوماتيكياً وتحويلها لصفحات تفاعلية مفهرسة بالكامل.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <Sidebar docs={docs} />

        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {docs.map((doc) => (
              <Link
                key={doc.slug}
                href={`/docs/${doc.slug}`}
                className="glass-panel-hover p-5 space-y-3 flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="cyber-badge">{doc.categoryAr}</span>
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {doc.readingTime} دقائق
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {doc.titleAr}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {doc.summaryAr}
                  </p>
                </div>

                <div className="pt-3 border-t border-dark-border/60 flex items-center justify-between text-xs text-cyan-400 font-semibold">
                  <span>قراءة التوثيق التفصيلي</span>
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
