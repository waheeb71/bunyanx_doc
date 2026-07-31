'use client';

import React, { useState } from 'react';
import { Printer, Download, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const PDFExportButton: React.FC<{ docTitle: string }> = ({ docTitle }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handlePrint}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-card border border-dark-border text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 text-xs font-medium transition-all"
        title={t('docTools.printPage')}
      >
        <Printer className="w-3.5 h-3.5 text-cyan-400" />
        <span>{t('docTools.printPage')}</span>
      </button>

      <button
        onClick={handleCopyLink}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-card border border-dark-border text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 text-xs font-medium transition-all"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400">{t('docTools.copied')}</span>
          </>
        ) : (
          <>
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('docTools.copyLink')}</span>
          </>
        )}
      </button>
    </div>
  );
};
