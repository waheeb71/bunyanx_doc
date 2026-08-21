'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'ما هي منصة BunyanX Enterprise NGFW؟',
      a: 'منصة أمنية متقدمة للمؤسسات تجمع بين الجدار الناري الذكي (Stateful Firewall)، محرك كشف ومنع التسلل PHANTOM IDS/IPS، جدار حماية تطبيقات الويب WAF/WAAP، محرك منع تسريب البيانات DLP، والذكاء الاصطناعي التنبؤي AEGIS v3.',
    },
    {
      q: 'كيف يتم تحقيق تسريع الأداء بسرعة السلك (Wire-Speed Processing)؟',
      a: 'عبر الاستفادة من تقنيات النواة eBPF و XDP (eXpress Data Path) لالتقاط وتصفية وإسقاط الحزم الخبيثة مباشرة عند مستوى كرت الشبكة (Driver Level) بزمن انتقال بالميكروثانية.',
    },
    {
      q: 'ما المميزات الرئيسية لمحرك الذكاء الاصطناعي AEGIS v3؟',
      a: 'يتولى تجميع التهديدات المعقدة (Clustering)، التنبؤ بالهجمات المستقبلية قبل وقوعها عبر تحليل السلاسل الزمنية، ومكاملة تحليل سلوك الكيانات UEBA لتقليل التنبيهات الزائفة.',
    },
    {
      q: 'هل يدعم الموقع قراءة ملفات التوثيق أوتوماتيكياً؟',
      a: 'نعم! بمجرد إضافة أي ملف ماركداون جديد بصيغة .md داخل مجلد المشروع، يتم قراءته وتحليله وبنائه تلقائياً كصفحة توثيق كاملة ومفهرسة في محركات البحث.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="glass-panel p-8 space-y-4 text-center">
        <span className="cyber-badge">FAQ & Knowledge Base</span>
        <h1 className="text-3xl font-extrabold text-slate-100">
          الأسئلة الشائعة حول المنصة والتوثيق
        </h1>
        <p className="text-sm text-slate-400">
          إجابات عن أهم الأسئلة التقنية والأكاديمية المتعلقة بمعمارية BunyanX والتوثيق الأكاديمي.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="glass-panel overflow-hidden transition-all">
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full p-5 text-right flex items-center justify-between gap-4 font-bold text-sm text-slate-100 hover:text-cyan-400 transition-colors"
            >
              <span>{faq.q}</span>
              <ChevronDown className={`w-4 h-4 text-cyan-400 transition-transform ${openIdx === idx ? 'rotate-180' : ''}`} />
            </button>
            {openIdx === idx && (
              <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-dark-border/60">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
