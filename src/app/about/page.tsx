import React from 'react';
import { Shield, Sparkles, Target, Award, Rocket, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'عن مشروع BunyanX | BunyanX Enterprise NGFW',
  description: 'الرؤية والأهداف والابتكار والأبحاث المستقبلية لمشروع التخرج BunyanX.',
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="glass-panel p-8 space-y-4 text-center max-w-3xl mx-auto">
        <span className="cyber-badge">About Graduation Project</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          عن منصة BunyanX Enterprise NGFW
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          منصة أمنية متكاملة للمؤسسات تجمع بين الجدار الناري الذكي، كشف ومنع التسلل، جدار حماية تطبيقات الويب، محرك منع تسريب البيانات، والذكاء الاصطناعي التنبؤي.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-8 space-y-4">
          <div className="flex items-center gap-2">
            <Target className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-slate-100">رؤية المشروع وأهدافه الأساسية</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            تقديم حل سيبراني وطني ومؤسسي سيادي فائق السرعة يعالج قصور الحلول التقليدية، عبر توفير حماية شاملة لكافة طبقات الشبكة (Layer 2 إلى Layer 7) مع تقليل الاعتماد على البرمجيات المستوردة وتحقيق أعلى درجات الاستجابة.
          </p>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>معالجة السلك بالسرعة الفائقة Wire-Speed عبر eBPF/XDP.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>فحص ودفاع متكامل ضد ثغرات OWASP وتهديدات Zero-Day.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>تحليل سلوكي واستخباري متقدم عبر ORACLE v3 و UEBA.</span>
            </li>
          </ul>
        </div>

        <div className="glass-panel p-8 space-y-4">
          <div className="flex items-center gap-2">
            <Rocket className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-bold text-slate-100">الابتكار والتطلعات المستقبلية</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            يتطلع المشروع للتوسع نحو بيئات الحوسبة السحابية الموزعة (Cloud-Native SASE) وتدريب نماذج التعلم العميق على معالجات الحزم الكمومية والمساهمة في بناء منظومة أمن سحابي وطنية متطورة.
          </p>
        </div>
      </div>
    </div>
  );
}
