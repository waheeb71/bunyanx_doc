import React from 'react';
import Link from 'next/link';
import { Shield, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 p-3 mx-auto flex items-center justify-center">
        <Shield className="w-8 h-8 text-cyan-400" />
      </div>

      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold text-slate-100 font-mono">404</h1>
        <h2 className="text-xl font-bold text-slate-200">عذراً، الصفحة غير موجودة</h2>
        <p className="text-xs text-slate-400">
          لم نتمكن من العثور على الوثيقة أو الصفحة المطلوبة. يمكنك العودة للصفحة الرئيسية أو البحث في التوثيق الأكاديمي.
        </p>
      </div>

      <div className="pt-4 flex justify-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>الصفحة الرئيسية</span>
        </Link>
        <Link
          href="/docs"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass-panel-hover text-slate-200 font-semibold text-xs"
        >
          <span>تصفح التوثيق</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
