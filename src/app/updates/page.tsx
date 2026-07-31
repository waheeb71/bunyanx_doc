import React from 'react';
import { GitBranch, Clock, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'سجل التحديثات والإصدارات | BunyanX Enterprise NGFW',
  description: 'سجل إصدارات وتحديثات مشروع التخرج الأكاديمي.',
};

export default function UpdatesPage() {
  const releases = [
    {
      version: 'v1.0.0 (Academic Master Release)',
      date: '2026-07-31',
      title: 'الإطلاق الرسمي لبوابة التوثيق الأكاديمي الموحدة',
      changes: [
        'تجميع وتوثيق الـ 17 وحدة أمنية كاملة برسم بياني تفاعلي.',
        'إضافة قارئ التوثيق التلقائي لملفات الماركداون الـ 18.',
        'إدراج محرك البحث الفوري ودعم التدويل ثنائي اللغة (العربية/الإنجليزية).',
        'ضبط معايير SEO الكاملة وبيانات Schema.org المنظمة.',
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="glass-panel p-8 space-y-4 text-center">
        <span className="cyber-badge">Changelog & Version History</span>
        <h1 className="text-3xl font-extrabold text-slate-100">
          سجل الإصدارات والتحديثات الأكاديمية
        </h1>
        <p className="text-sm text-slate-400">
          تتبع المحطات والتطويرات المستمرة لمنصة BunyanX Enterprise NGFW.
        </p>
      </div>

      <div className="space-y-6">
        {releases.map((rel, idx) => (
          <div key={idx} className="glass-panel p-6 space-y-4 border-l-4 border-l-cyan-400">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-cyan-400">
                <GitBranch className="w-4 h-4 text-cyan-400" />
                <span>{rel.version}</span>
              </div>
              <div className="text-xs text-slate-400 font-mono flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>{rel.date}</span>
              </div>
            </div>

            <h3 className="font-bold text-base text-slate-100">{rel.title}</h3>

            <ul className="space-y-2 text-xs text-slate-300">
              {rel.changes.map((change, cIdx) => (
                <li key={cIdx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{change}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
