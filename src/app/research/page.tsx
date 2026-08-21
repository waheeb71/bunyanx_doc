import React from 'react';
import Link from 'next/link';
import { Award, BookOpen, BrainCircuit, Shield, Zap, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'الأبحاث الأكاديمية والابتكارات | BunyanX Enterprise NGFW',
  description: 'المساهمات والابتكارات العلمية والأكاديمية لمشروع التخرج BunyanX.',
};

export default function ResearchPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="glass-panel p-8 space-y-4 text-center max-w-3xl mx-auto">
        <span className="cyber-badge">Academic Research Contributions</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          الأبحاث العلمية والابتكارات الأكاديمية
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          استعراض أهم الابتكارات والمساهمات البحثية الهندسية الصادرة عن مشروع تخرج منصة BunyanX Enterprise NGFW في مجالات أمن الشبكات والذكاء الاصطناعي التنبؤي وتفتيش الحركة المشفرة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: 'خوارزمية AEGIS v3 التنبؤية للتهديدات المستقبلية',
            desc: 'المساهمة في بناء محرك تجميع للأحداث الأمنية (Clustering) يعتمد على السلاسل الزمنية والتنبؤ بمسارات التسلل قبل وقوعها بنسبة دقة تتجاوز 98.4%.',
            category: 'Predictive AI',
            icon: BrainCircuit,
            docLink: '/docs/predictive-ai',
          },
          {
            title: 'تقنية التخفيف المبكر eBPF/XDP في النواة',
            desc: 'ابتكار آلية توجيه وإسقاط الحزم الخبيثة بنمط Zero-Copy على مستوى كرت الشبكة لتحقيق أداء قسوة بسرعة السلك (Wire-Speed Processing).',
            category: 'Kernel Security',
            icon: Zap,
            docLink: '/docs/acceleration',
          },
          {
            title: 'محرك DART لمكافحة أنفاق نظام أسماء النطاقات (DNS Tunneling)',
            desc: 'تطوير تقنيات اكتشاف الترسيم والعناوين المشبوهة واستجابات DNS Exfiltration مع تقنية Sinkholing اللحظية.',
            category: 'DNS Security',
            icon: Shield,
            docLink: '/docs/dns-security',
          },
          {
            title: 'نظام UEBA لبناء الملف السلوكي الديناميكي',
            desc: 'نمذجة سلوك المستخدمين والانحرافات التشغيلية وحساب درجات المخاطر التكيُّفية لتقليل التنبيهات الخاطئة (False Positives).',
            category: 'Behavior Analytics',
            icon: Award,
            docLink: '/docs/ueba',
          },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="glass-panel-hover p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 p-2 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="cyber-badge">{item.category}</span>
                </div>
                <h3 className="font-bold text-base text-slate-100">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-4 border-t border-dark-border">
                <Link href={item.docLink} className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1">
                  <span>قراءة التوثيق البحثي</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
