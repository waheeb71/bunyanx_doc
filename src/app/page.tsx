import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllDocs } from '@/lib/docs';
import { PipelineVisualizer } from '@/components/home/PipelineVisualizer';
import {
  Shield,
  BookOpen,
  Layers,
  Cpu,
  Zap,
  BrainCircuit,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  PlayCircle,
  Activity,
  Award,
  Terminal,
  Lock,
  Eye,
  Globe,
  Database,
  Users,
  FileText,
  ExternalLink,
} from 'lucide-react';

export const metadata = {
  title: 'BUNYANX| Cybersecurity Graduation Project',
  description: 'منظومة جدار ناري مؤسسية تجمع بين حماية الشبكة، تحليل التهديدات، وفحص حركة البيانات ضمن بنية أمنية متعددة الطبقات. مشروع التخرج الأكاديمي 2026.',
};

export default async function HomePage() {
  const docs = await getAllDocs();
  const moduleDocs = docs.filter((d) => d.moduleId);

  return (
    <div className="relative overflow-hidden space-y-16 sm:space-y-24 pb-20">
      {/* Subtle Background Cyber Grid */}
      <div className="absolute inset-0 bg-cyber-grid bg-[size:30px_30px] pointer-events-none opacity-60" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 bg-hero-gradient pointer-events-none" />

      {/* 1. HERO SECTION (Compact & Mobile First) */}
      <section className="relative pt-8 sm:pt-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-5 sm:space-y-6">
        {/* Brand Logo & Academic Tag */}
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-dark-surface border border-cyan-500/40 p-2 flex items-center justify-center shadow-neon-subtle">
            <Image
              src="/logo.png"
              alt="BunyanX Official Logo"
              width={64}
              height={64}
              className="w-full h-full object-contain"
              priority
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-surface border border-cyan-500/30 text-cyan-400 text-xs font-semibold font-mono">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>Cybersecurity Graduation Project — 2026</span>

            
          </div>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-surface border border-cyan-500/30 text-cyan-400 text-xs font-semibold font-mono">
  <Globe className="w-3.5 h-3.5 text-cyan-400" />
  
  <span>تعز، الجمهورية اليمنية — 2026</span>
</div>

        {/* Hero Headings */}
        <div className="space-y-3 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 font-sans">
            BUNYAN<span className="text-cyan-400">X</span>
          </h1>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-200">
            نظام الاستجابة الذكي للهجمات السيبرانية
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            منظومة أمن سيبراني متقدمة متعددة الطبقات لتحليل التهديدات، كشف الهجمات،
            والاستجابة الذكية لها، مع دمج تقنيات الذكاء الاصطناعي وحماية الشبكات
            وفحص حركة البيانات ضمن بنية دفاعية متكاملة.
          </p>
        </div>

        {/* Prominent Large Button: Short Documentation */}
        <div className="pt-2 flex flex-col items-center justify-center gap-2">
          <a
            href="https://bunyanx.netlify.app/short-documentation.html"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base sm:text-xl font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 rounded-2xl shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 border border-cyan-200/50 cursor-pointer w-full sm:w-auto min-w-[280px]"
          >
            <FileText className="w-6 h-6 text-slate-950 group-hover:scale-110 transition-transform" />
            <span>توثيق المشروع المختصر</span>
            <ExternalLink className="w-5 h-5 text-slate-950 group-hover:-translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Hero Quick Action Buttons (Thumb-friendly touch targets) */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="#about-summary"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 text-black font-bold text-xs sm:text-sm hover:bg-cyan-400 active:scale-95 transition-all shadow-sm min-h-[44px] min-w-[140px]"
          >
            <span>استكشف المنظومة</span>
            <ArrowLeft className="w-4 h-4" />
          </a>

          <Link
            href="/architecture"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-dark-surface border border-cyan-500/40 text-slate-100 hover:text-cyan-400 hover:border-cyan-400 active:scale-95 transition-all text-xs sm:text-sm font-semibold min-h-[44px] min-w-[140px]"
          >
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>المعمارية الهندسية</span>
          </Link>

          <Link
            href="/docs"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-dark-surface border border-dark-border text-slate-300 hover:text-slate-100 hover:border-slate-500 active:scale-95 transition-all text-xs sm:text-sm font-medium min-h-[44px] min-w-[130px]"
          >
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span>التوثيقات</span>
          </Link>
        </div>

        {/* Quick Technical Highlights Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-6 max-w-4xl mx-auto text-center font-mono">
          <div className="p-3 rounded-xl bg-dark-surface/90 border border-dark-border">
            <div className="text-xl sm:text-2xl font-bold text-cyan-400">17</div>
            <div className="text-[11px] text-slate-400">وحدة أمنية متكاملة</div>
          </div>
          <div className="p-3 rounded-xl bg-dark-surface/90 border border-dark-border">
            <div className="text-xl sm:text-2xl font-bold text-blue-400">&lt; 10 µs</div>
            <div className="text-[11px] text-slate-400">تسريع النواة eBPF</div>
          </div>
          <div className="p-3 rounded-xl bg-dark-surface/90 border border-dark-border">
            <div className="text-xl sm:text-2xl font-bold text-emerald-400">AEGIS v3</div>
            <div className="text-[11px] text-slate-400">ذكاء اصطناعي تنبؤي</div>
          </div>
          <div className="p-3 rounded-xl bg-dark-surface/90 border border-dark-border">
            <div className="text-xl sm:text-2xl font-bold text-indigo-400">18</div>
            <div className="text-[11px] text-slate-400">ملف توثيق أكاديمي</div>
          </div>
        </div>
      </section>

      {/* 2. SECTION: WHAT IS BUNYANX? (Problem → Approach → Result) */}
      <section id="about-summary" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-6 sm:p-10 space-y-8 bg-[#091424] border-dark-border">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="cyber-badge">Core Concept & Value</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
              ما هو مشروع BUNYANX؟
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              منهجية هندسية واضحة لمعالجة تحديات الأمن السيبراني في الشبكات المؤسسية الحديثة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Problem */}
            <div className="p-5 sm:p-6 rounded-xl bg-dark-surface border border-rose-500/30 space-y-3 relative">
              <div className="w-8 h-8 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-400 flex items-center justify-center font-bold text-xs font-mono">
                01
              </div>
              <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>المشكلة الأمنية</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                التهديدات السيبرانية الحديثة لا تحدث عبر نقطة واحدة فقط، بل تنتقل عبر الشبكة والتطبيقات والبريد والملفات وسلوك المستخدمين، مع تشفير معظم حركة البيانات وصعوبة كشف التسلل البطيء.
              </p>
            </div>

            {/* Approach */}
            <div className="p-5 sm:p-6 rounded-xl bg-dark-surface border border-cyan-500/30 space-y-3 relative">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold text-xs font-mono">
                02
              </div>
              <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>النهج الهندسي</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                يعتمد BUNYANX على طبقات دفاع مترابطة تبدأ من معالجة النواة الفائقة السرعة عبر eBPF/XDP، مروراً بمحركات الفحص الدقيق والتحليل السلوكي، وصولاً للذكاء الاصطناعي التنبؤي.
              </p>
            </div>

            {/* Result */}
            <div className="p-5 sm:p-6 rounded-xl bg-dark-surface border border-emerald-500/30 space-y-3 relative">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-xs font-mono">
                03
              </div>
              <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>النتيجة المتحققة</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                بيئة أمنية مؤسسية موحدة تجمع 17 آلية دفاع ومحرك فحص داخل منظومة واحدة تحقق زمن استجابة متناهي الصغر وتتخذ قرارات استجابة استباقية وتكيفية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION: HOW DOES IT WORK? (Packet Processing Pipeline) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="cyber-badge">Packet Processing Flow</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
              كيف تعمل المنظومة؟ (خط سير الحزمة)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              اضغط على أي مرحلة لاستعراض آلية المعالجة وزمن الاستجابة والوحدة المعنية.
            </p>
          </div>

          <Link
            href="/architecture"
            className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:underline"
          >
            <span>استعراض المعمارية الكاملة</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Interactive Pipeline Visualizer Component */}
        <PipelineVisualizer />
      </section>

      {/* 4. SECTION: THREE-TIER ARCHITECTURE SHOWCASE */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="cyber-badge">3-Tier System Architecture</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            طبقات المعمارية الهندسية
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            معمارية ثلاثية الطبقات تدمج سرعة العتاد مع دقة الفحص وذكاء التنبؤ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tier 1 */}
          <div className="glass-panel p-6 space-y-4 border-t-2 border-t-cyan-400 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold block">TIER 1 — FAST PATH</span>
                  <h3 className="font-bold text-slate-100 text-sm sm:text-base">تسريع النواة (eBPF/XDP)</h3>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                معالجة وتصفية الحزم على مستوى كرت الشبكة (Driver Level) بسرعة السلك (Wire-Speed) بزمن يقل عن 10 ميكروثانية لصد هجمات الـ DDoS والحظر اللحظي.
              </p>
            </div>
            <Link
              href="/docs/acceleration"
              className="text-xs font-semibold text-cyan-400 hover:underline inline-flex items-center gap-1 pt-2"
            >
              <span>توثيق وحدة التسريع</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Tier 2 */}
          <div className="glass-panel p-6 space-y-4 border-t-2 border-t-blue-400 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-950/60 border border-blue-500/40 text-blue-400">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-blue-400 font-bold block">TIER 2 — INSPECTION</span>
                  <h3 className="font-bold text-slate-100 text-sm sm:text-base">محركات الفحص الـ 17</h3>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                تكامل شامل يشمل الجدار الناري الذكي، كشف ومنع التسلل PHANTOM، جدار حماية الويب WAF، فحص SSL، تصفية DNS، منع تسريب البيانات DLP، ومكافحة البرمجيات.
              </p>
            </div>
            <Link
              href="/modules"
              className="text-xs font-semibold text-blue-400 hover:underline inline-flex items-center gap-1 pt-2"
            >
              <span>استعراض الوحدات الـ 17</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Tier 3 */}
          <div className="glass-panel p-6 space-y-4 border-t-2 border-t-emerald-400 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold block">TIER 3 — INTELLIGENCE</span>
                  <h3 className="font-bold text-slate-100 text-sm sm:text-base">الذكاء التنبؤي والسلوكي</h3>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                محرك AEGIS v3 المبني على نظرية الألعاب لتوقع خطوات المهاجم، ونظام UEBA لتحليل سلوك المستخدمين والكيانات لتقليل الإنذارات الكاذبة.
              </p>
            </div>
            <Link
              href="/docs/predictive-ai"
              className="text-xs font-semibold text-emerald-400 hover:underline inline-flex items-center gap-1 pt-2"
            >
              <span>توثيق الذكاء الاصطناعي</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. SECTION: SELECTED MODULES PREVIEW */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="cyber-badge">Modules Overview</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
              الوحدات الأمنية المتكاملة
            </h2>
          </div>
          <Link
            href="/modules"
            className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>استعراض جميع الوحدات الـ 17</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              slug: 'firewall',
              title: 'الجدار الناري الذكي Stateful Firewall',
              category: 'حماية الشبكة',
              icon: Shield,
              desc: 'تتبع حالة جلسات الاتصال ومطابقة قواعد ACL المترجمة لأعداد صحيحة O(1) مع دعم التصفية الجغرافية GeoIP.',
            },
            {
              slug: 'ids-ips',
              title: 'كشف ومنع التسلل PHANTOM IDS/IPS',
              category: 'الفحص وكشف التسلل',
              icon: Eye,
              desc: 'تحليل طيفي للحزم (Spectral Byte FFT) والرسوم البيانية السببية لرصد الاختراق الأفقي (APT Pivoting).',
            },
            {
              slug: 'waf',
              title: 'جدار حماية تطبيقات الويب WAF/WAAP',
              category: 'حماية التطبيقات',
              icon: Globe,
              desc: 'تفتيش بروتوكولات HTTP ضد هجمات OWASP Top-10 مثل SQLi و XSS و Command Injection.',
            },
            {
              slug: 'dns-security',
              title: 'أمان أسماء النطاقات DART DNS',
              category: 'التصفية والويب',
              icon: Activity,
              desc: 'كشف أنفاق تهريب البيانات (DNS Tunneling) ونطاقات الـ DGA وتحويل العناوين المشبوهة إلى Sinkhole.',
            },
            {
              slug: 'dlp',
              title: 'منع تسريب البيانات DLP Engine',
              category: 'حماية البيانات',
              icon: Database,
              desc: 'مراقبة وخوارزميات MSEM Lite لمطابقة الإنتروبيا ورصد تسريب الأرقام والبيانات الحساسة.',
            },
            {
              slug: 'predictive-ai',
              title: 'الذكاء الاصطناعي التنبؤي AEGIS v3',
              category: 'الذكاء والتحليل',
              icon: BrainCircuit,
              desc: 'تجميع التهديدات المعقدة ونظرية الألعاب لاتخاذ قرارات استجابة استباقية تحجم تصعيد المهاجم.',
            },
          ].map((mod) => {
            const Icon = mod.icon;
            return (
              <Link
                key={mod.slug}
                href={`/docs/${mod.slug}`}
                className="glass-panel-hover p-5 space-y-3 flex flex-col justify-between group active:scale-95 transition-all"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-dark-bg border border-dark-border flex items-center justify-center group-hover:border-cyan-500/40 transition-colors">
                      <Icon className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="cyber-tag">{mod.category}</span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {mod.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-dark-border/80 flex items-center justify-between text-xs text-cyan-400 font-semibold">
                  <span>التوثيق التفصيلي</span>
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 6. SECTION: DEMO & MEDIA GALLERY PREVIEW */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-6 sm:p-8 bg-[#0B1528] border-cyan-500/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="cyber-badge">Demonstrations & Media Gallery</div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
                معرض العروض التجريبية والوسائط
              </h2>
              <p className="text-xs text-slate-400">
                استعراض مرئي للتجارب الحية، لقطات الشاشة، ومقاطع الفيديو التوضيحية لمنظومة BUNYANX.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/demo"
                className="px-4 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
              >
                <PlayCircle className="w-4 h-4" />
                <span>فتح معرض الوسائط والعروض</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-dark-bg/80 border border-dark-border space-y-2">
              <div className="flex items-center justify-between text-slate-300 font-semibold">
                <span>SYN Flood DDoS</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] border border-emerald-500/30">BLOCKED in Kernel</span>
              </div>
              <div className="text-[11px] text-slate-400 font-sans">
                إسقاط فوري في مسار eBPF/XDP بزمن 8.4µs بدون أي تأثير على استقرار معالج النظام.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-dark-bg/80 border border-dark-border space-y-2">
              <div className="flex items-center justify-between text-slate-300 font-semibold">
                <span>SQL Injection (WAF)</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] border border-emerald-500/30">DETECTED (HTTP 403)</span>
              </div>
              <div className="text-[11px] text-slate-400 font-sans">
                كشف وتطابق نمط استعلامات SQL الخبيثة وحظر الاتصال مع توليد تنبيه أمني فوري.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-dark-bg/80 border border-dark-border space-y-2">
              <div className="flex items-center justify-between text-slate-300 font-semibold">
                <span>DNS Tunneling Exfiltration</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] border border-emerald-500/30">SINKHOLED (Entropy: 4.8)</span>
              </div>
              <div className="text-[11px] text-slate-400 font-sans">
                قياس إنتروبيا أسماء النطاقات وعزل النطاق المشبوه وتحويله إلى Sinkhole أمني.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SECTION: PROJECT ACADEMIC JOURNEY */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="cyber-badge">Project Engineering Journey</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            مسار تطوير وتوثيق المشروع
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            مراحل التطوير الهندسي المتسلسلة من الأبحاث النظرية إلى رسالة التخرج المعتمدة.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
          {[
            { step: '01', title: 'الأبحاث ومراجعة الأدبيات', sub: 'Literature Review' },
            { step: '02', title: 'نمذجة التهديدات والمعمارية', sub: 'Threat Modeling' },
            { step: '03', title: 'تطوير النواة eBPF/XDP', sub: 'Kernel Fast Path' },
            { step: '04', title: 'تطوير محركات الفحص الـ 17', sub: 'Engines Integration' },
            { step: '05', title: 'تكامل الذكاء الاصطناعي AEGIS', sub: 'AI & Behavior' },
            { step: '06', title: 'الاختبارات والرسالة الماستر', sub: 'Final Verification' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-dark-surface border border-dark-border space-y-2">
              <div className="font-mono text-xs font-bold text-cyan-400">{item.step}</div>
              <div className="font-bold text-xs text-slate-200">{item.title}</div>
              <div className="text-[10px] font-mono text-slate-400">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
