'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'ما هو نظام BUNYANX للاستجابة الذكية للهجمات السيبرانية؟',
      a: 'BUNYANX هو نظام أمن سيبراني متقدم متعدد الطبقات مصمم لتحليل التهديدات السيبرانية واكتشاف الهجمات والاستجابة لها بشكل ذكي. يضم النظام مجموعة من المكونات الأمنية المتكاملة، من بينها مكوّن جدار الحماية من الجيل القادم (NGFW)، ومحرك كشف ومنع التسلل PHANTOM IDS/IPS، وحماية تطبيقات الويب WAF/WAAP، ومنع تسريب البيانات DLP، ومحركات الذكاء الاصطناعي للتحليل والتنبؤ بالتهديدات.',
    },
    {
      q: 'كيف يتم تحقيق تسريع معالجة حركة الشبكة؟',
      a: 'يعتمد BUNYANX على تقنيات eBPF وXDP (eXpress Data Path) لمعالجة وتحليل وتصفية حزم الشبكة في مستويات منخفضة من نواة لينكس، مما يقلل من زمن المعالجة ويسهم في رفع كفاءة التعامل مع حركة الشبكة. ويُقاس الأداء الفعلي وفق بيئة الاختبار ومواصفات العتاد وسيناريو الحمل المستخدم.',
    },
    {
      q: 'ما دور محرك الذكاء الاصطناعي AEGIS v3؟',
      a: 'يعمل AEGIS v3 ضمن منظومة التحليل الذكي في BUNYANX على معالجة مؤشرات التهديد وتحليل الأنماط والسلوكيات واستخلاص العلاقات بين الأحداث الأمنية، بما يدعم اكتشاف التهديدات وتقييمها والمساعدة في اتخاذ قرارات الاستجابة الأمنية.',
    },
    {
      q: 'ما دور المكونات الأمنية داخل نظام BUNYANX؟',
      a: 'تعمل مكونات BUNYANX بصورة تكاملية ضمن بنية دفاعية متعددة الطبقات؛ حيث تتولى مكونات مثل NGFW وIDS/IPS وWAF/WAAP وDLP وظائف مختلفة في الحماية والتحليل والمنع، بينما تضيف محركات الذكاء الاصطناعي والتحليل السلوكي قدرات متقدمة لفهم التهديدات ودعم الاستجابة الذكية لها.',
    },
    {
      q: 'هل يدعم الموقع قراءة ملفات التوثيق أوتوماتيكياً؟',
      a: 'نعم. عند إضافة ملف توثيق جديد بصيغة Markdown (.md) ضمن مجلد التوثيق في المشروع، يمكن للنظام قراءته وتحويل محتواه إلى صفحة توثيق منظمة ومفهرسة وفق آلية بناء الموقع.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="glass-panel p-8 space-y-4 text-center">
        <span className="cyber-badge">FAQ & Knowledge Base</span>
        <h1 className="text-3xl font-extrabold text-slate-100">
          الأسئلة الشائعة حول المنظومة والتوثيق
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
