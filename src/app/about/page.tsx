import React from 'react';
import Link from 'next/link';
import {
  Shield,
  Target,
  Rocket,
  CheckCircle2,
  Zap,
  BrainCircuit,
  Lock,
  ArrowLeft,
  Activity,
  Layers,
  Award,
  BookOpen,
  Eye,
} from 'lucide-react';

export const metadata = {
  title: 'عن مشروع BUNYANX',
  description: 'الرؤية الهندسية، المشكلة البحثية، والركائز الابتكارية لمنظومة BUNYANX Enterprise NGFW.',
};

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-10 space-y-4 text-center max-w-3xl mx-auto bg-[#091424]">
        <div className="cyber-badge">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          <span>Project Vision & Engineering Foundations</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100">
          عن منصة BUNYANX Enterprise NGFW
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          مشروع تخرج أكاديمي يهدف إلى بناء جدار ناري متطور للمؤسسات يجمع بين سرعة معالجة النواة وفحص الطبقات المتعددة والذكاء الاصطناعي التنبؤي.
        </p>
      </div>

      {/* Problem, Approach, Result (3 Core Cards) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-panel p-6 space-y-3 bg-dark-surface border-rose-500/30">
          <div className="text-xs font-mono text-rose-400 font-bold">01 — THE PROBLEM</div>
          <h3 className="font-bold text-base text-slate-100">المشكلة التي يعالجها المشروع</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            تعاني الجدران النارية التقليدية من ثغرات هيكلية مثل عجز فحص الحركة المشفرة بدون كسر الخصوصية، والتعامل التفاعلي مع الهجمات بعد وقوعها، والحجب الثنائي البسيط دون استراتيجيات احتواء ذكية لمنع تصعيد المهاجم.
          </p>
        </div>

        <div className="glass-panel p-6 space-y-3 bg-dark-surface border-cyan-500/30">
          <div className="text-xs font-mono text-cyan-400 font-bold">02 — THE APPROACH</div>
          <h3 className="font-bold text-base text-slate-100">النهج الهندسي في BUNYANX</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            تصميم معمارية دفاع متعددة الطبقات (Defense In-Depth) تدمج خط معالجة النواة (eBPF/XDP) بسرعة السلك مع 17 محرك فحص مستقل ونماذج الذكاء الاصطناعي التنبؤي المبنية على نظرية الألعاب.
          </p>
        </div>

        <div className="glass-panel p-6 space-y-3 bg-dark-surface border-emerald-500/30">
          <div className="text-xs font-mono text-emerald-400 font-bold">03 — THE OUTCOME</div>
          <h3 className="font-bold text-base text-slate-100">النتيجة والإنجاز الفعلي</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            منظومة أمنية متكاملة تحقق فحصاً عميقاً للشبكة والتطبيقات والبيانات، مع زمن استجابة متناهي الصغر (&lt;10µs في النواة) وتوثيق أكاديمي معتمد يضم 27 مساهمة بحثية وهندسية.
          </p>
        </div>
      </section>

      {/* Engineering Innovations & Architectural Pillars */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-dark-border">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">الركائز الهندسية الأربع للمنظومة</h2>
            <p className="text-xs text-slate-400 mt-0.5">أهم الابتكارات التقنية التي تميز BUNYANX</p>
          </div>
          <span className="cyber-badge hidden sm:inline-flex">Core Innovations</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="glass-panel p-6 space-y-3 bg-dark-surface/90 border-dark-border">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-base text-slate-100">1. معالجة النواة الفائقة (eBPF/XDP)</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              تصفية وإسقاط الحزم عند مستوى بطاقة الشبكة مباشرة بنمط Zero-Copy، مما يوفر حماية فورية ضد هجمات الـ DDoS بدون أي استهلاك لمعالج الـ Userspace.
            </p>
          </div>

          <div className="glass-panel p-6 space-y-3 bg-dark-surface/90 border-dark-border">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-base text-slate-100">2. كشف التسلل الطيفي والسببي (PHANTOM)</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              تحويل محتويات الحزم إلى متجهات ترددية فورية (Spectral Byte FFT) وبناء رسوم بيانية سببية (Granger Causal Graphs) لرصد الاختراق الأفقي البطيء داخل الشبكة.
            </p>
          </div>

          <div className="glass-panel p-6 space-y-3 bg-dark-surface/90 border-dark-border">
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-base text-slate-100">3. الاستجابة المبنية على نظرية الألعاب (AEGIS v3)</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              نمذجة التفاعل بين المنظومة والمهاجم كمصفوفة رياضية لتوقع الخطوات التالية واختيار الإجراء الأمني الذي يحجم المكاسب ويمنع التصعيد.
            </p>
          </div>

          <div className="glass-panel p-6 space-y-3 bg-dark-surface/90 border-dark-border">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-rose-400" />
              <h3 className="font-bold text-base text-slate-100">4. مبدأ الثقة المعدومة والفشل الآمن (Zero-Trust & Fail-Closed)</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              تطبيق سياسة الحظر الافتراضي (Default Deny) وقواطع الدائرة (Circuit Breakers) لعزل أي عطل برمجي ومنع أي تسريب للبيانات.
            </p>
          </div>
        </div>
      </section>

      {/* Academic Verification Strip */}
      <section className="glass-panel p-6 sm:p-8 bg-[#091424] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-right">
          <div className="text-xs font-mono text-cyan-400 font-bold">Academic Thesis & Defense</div>
          <h3 className="font-bold text-base sm:text-lg text-slate-100">الرسالة الماستر الأكاديمية والتوثيق المعتمد</h3>
          <p className="text-xs text-slate-400">توثيق شامل مكون من 8 فصول و 18 ملف وثائقي يغطي كافة النواحي الرياضية والهندسية.</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/docs/master-thesis"
            className="px-4 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" />
            <span>قراءة رسالة التخرج</span>
          </Link>
          <Link
            href="/team"
            className="px-4 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-slate-200 hover:text-cyan-400 active:scale-95 transition-all text-xs font-semibold"
          >
            <span>فريق العمل</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
