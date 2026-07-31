'use client';

import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const PageFeedback: React.FC = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="my-8 p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center gap-2 text-xs font-semibold">
        <CheckCircle2 className="w-4 h-4" />
        <span>شكراً لتقييمك لمحتوى التوثيق الأكاديمي!</span>
      </div>
    );
  }

  return (
    <div className="my-8 p-4 rounded-xl glass-panel flex flex-col sm:flex-row items-center justify-between gap-4">
      <span className="text-xs font-semibold text-slate-300">
        {t('docTools.feedback')}
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setSubmitted(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-bg border border-dark-border hover:border-emerald-500/50 hover:text-emerald-400 text-xs font-medium text-slate-300 transition-all"
        >
          <ThumbsUp className="w-3.5 h-3.5" />
          <span>{t('docTools.yes')}</span>
        </button>
        <button
          onClick={() => setSubmitted(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-bg border border-dark-border hover:border-rose-500/50 hover:text-rose-400 text-xs font-medium text-slate-300 transition-all"
        >
          <ThumbsDown className="w-3.5 h-3.5" />
          <span>{t('docTools.no')}</span>
        </button>
      </div>
    </div>
  );
};
