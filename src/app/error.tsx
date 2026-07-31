'use client';

import React from 'react';
import Link from 'next/link';
import { AlertOctagon, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-rose-950/80 border border-rose-500/40 p-3 mx-auto flex items-center justify-center">
        <AlertOctagon className="w-8 h-8 text-rose-400" />
      </div>

      <div className="space-y-2">
        <h1 className="text-xl font-bold text-slate-100">حدث خطأ غير متوقع</h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          تعذر تحميل الصفحة المطلوبة. يرجى محاولة إعادة التحميل.
        </p>
      </div>

      <button
        onClick={() => reset()}
        className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition-all inline-flex items-center gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        <span>إعادة التحميل</span>
      </button>
    </div>
  );
}
