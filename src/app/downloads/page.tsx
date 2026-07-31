import React from 'react';
import { getAllDocs } from '@/lib/docs';
import { Download, FileText, FileCode, Image as ImageIcon, GraduationCap } from 'lucide-react';

export const metadata = {
  title: 'مركز التحميلات والمصادر | BunyanX Enterprise NGFW',
  description: 'تحميل الرسالة الماستر والتوثيقات المنفردة ومخططات المعمارية.',
};

export default async function DownloadsPage() {
  const docs = await getAllDocs();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="glass-panel p-8 space-y-4 text-center max-w-3xl mx-auto">
        <span className="cyber-badge">Download Center & Resources</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          مركز التحميلات والمصادر الأكاديمية
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          تحميل الرسالة الأكاديمية التجميعية الشاملة، ملفات التوثيق المنفردة لكل وحدة أمنية، ومخططات المعمارية الهندسية الشاملة.
        </p>
      </div>

      {/* Primary Download: Master Thesis */}
      <div className="glass-panel p-8 border-2 border-cyan-500/40 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-slate-100">الرسالة الماستر الأكاديمية الموحدة (Complete Thesis)</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            تحتوي على التقرير الموحد الكامل المكون من 8 فصول و2,380 سطر أكاديمي يغطي كافة التفاصيل النظرية والتنفيذية والنتائج.
          </p>
          <div className="text-[11px] font-mono text-cyan-400">حجم الملف: 124.5 KB | صيغة Markdown / PDF</div>
        </div>

        <a
          href="/final_master_documentation.md"
          download
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 text-black font-bold text-sm hover:bg-cyan-400 shadow-neon-glow transition-all shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>تحميل الرسالة الماستر</span>
        </a>
      </div>

      {/* Individual Documentation Files Download Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-100">تحميل التوثيقات المنفردة الـ 18</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {docs.map((doc) => (
            <div key={doc.slug} className="glass-panel p-4 flex items-center justify-between gap-3">
              <div className="space-y-1 min-w-0">
                <h4 className="font-bold text-xs text-slate-200 truncate">{doc.titleAr}</h4>
                <div className="text-[10px] font-mono text-slate-400">{doc.filename}</div>
              </div>
              <a
                href={`/${doc.filename}`}
                download
                className="p-2 rounded-lg bg-dark-bg border border-dark-border text-cyan-400 hover:bg-cyan-950/60 transition-all shrink-0"
                title="تحميل الملف"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
