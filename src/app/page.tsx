import React from 'react';
import Link from 'next/link';
import { getAllDocs } from '@/lib/docs';
import {
  Shield,
  BookOpen,
  Layers,
  Cpu,
  Download,
  Github,
  Zap,
  BrainCircuit,
  Award,
  Lock,
  ArrowLeft,
  CheckCircle2,
  Activity,
  Server,
  Globe,
} from 'lucide-react';

export default async function HomePage() {
  const docs = await getAllDocs();

  return (
    <div className="relative overflow-hidden space-y-20 pb-20">
      {/* Background Animated Cyber Grid */}
      <div className="absolute inset-0 bg-cyber-grid bg-[size:35px_35px] pointer-events-none opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-hero-gradient pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
        {/* Version Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-semibold shadow-neon-glow animate-pulse">
          <Shield className="w-4 h-4" />
          <span>BunyanX Enterprise NGFW — Academic Release v1.0</span>
        </div>

        {/* Hero Headings */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100">
            Bunyan<span className="text-cyan-400 cyber-glow-text">X</span> Enterprise NGFW
          </h1>
          <p className="text-xl sm:text-2xl font-semibold text-cyan-400/90 font-mono">
            AI-Powered Next Generation Firewall Platform
          </p>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mx-auto pt-2">
            الموقع الرسمي لتوثيق مشروع التخرج الأكاديمي لمنصة BunyanX Enterprise NGFW. يضم المعمارية الهندسية، وحدات الحماية الـ 17 المبتكرة، محرك الذكاء الاصطناعي التنبؤي ORACLE v3، الأبحاث والمساهمات العلمية، واختبارات الجودة والأداء.
          </p>
        </div>

        {/* Hero CTA Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/docs"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 text-black font-bold text-sm hover:bg-cyan-400 shadow-neon-glow hover:shadow-neon-strong transition-all transform hover:-translate-y-0.5"
          >
            <BookOpen className="w-4 h-4" />
            <span>قراءة التوثيق الأكاديمي</span>
          </Link>

          <Link
            href="/modules"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl glass-panel-hover text-slate-100 font-semibold text-sm hover:text-cyan-400"
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>استعراض الوحدات الـ 17</span>
          </Link>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-dark-card border border-dark-border text-slate-300 font-medium text-sm hover:text-white hover:border-slate-500 transition-all"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Repository</span>
          </a>

          <Link
            href="/downloads"
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-dark-card border border-cyan-500/30 text-cyan-400 font-medium text-sm hover:bg-cyan-950/40 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>تحميل الرسالة الماستر (PDF)</span>
          </Link>
        </div>

        {/* Project Statistics Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-12 max-w-6xl mx-auto">
          {[
            { label: 'وحدة أمنية متكاملة', value: '17', sub: 'Security Modules', icon: Layers, color: 'text-cyan-400' },
            { label: 'ملف توثيق أكاديمي', value: '18', sub: 'Documentation Files', icon: BookOpen, color: 'text-blue-400' },
            { label: 'سطر توثيقي', value: '+2300', sub: 'Technical Lines', icon: Cpu, color: 'text-indigo-400' },
            { label: 'ذكاء اصطناعي تنبؤي', value: 'ORACLE', sub: 'Predictive AI v3', icon: BrainCircuit, color: 'text-emerald-400' },
            { label: 'أبحاث وابتكارات', value: 'Academic', sub: 'Research Papers', icon: Award, color: 'text-amber-400' },
            { label: 'تسريع النواة', value: 'eBPF/XDP', sub: 'Wire-Speed Engine', icon: Zap, color: 'text-rose-400' },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="glass-panel p-4 text-center space-y-2 hover:border-cyan-500/40 transition-all group">
                <div className="flex justify-center">
                  <div className="w-8 h-8 rounded-lg bg-dark-bg border border-dark-border flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </div>
                <div className={`text-2xl font-black font-mono ${stat.color}`}>{stat.value}</div>
                <div className="text-xs font-bold text-slate-200">{stat.label}</div>
                <div className="text-[10px] font-mono text-slate-500">{stat.sub}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Architecture Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 relative overflow-hidden space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-dark-border">
            <div className="space-y-2 max-w-2xl">
              <span className="cyber-badge">Architecture & Innovations</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
                معمارية منصة BunyanX وخط سير الحزم الشبكية
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                تعتمد منصة BunyanX على معمارية هجينة تدمج بين معالجة النواة الفائقة السرعة عبر تقنيات eBPF/XDP وبين وحدات الفحص الدقيق والدفاع السلوكي والذكاء الاصطناعي التنبؤي ORACLE v3.
              </p>
            </div>
            <Link
              href="/architecture"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold hover:bg-cyan-500/20 transition-all shrink-0"
            >
              <span>استكشاف المعمارية التفاعلية</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Module Grid Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-5 space-y-3 hover:border-cyan-500/40 transition-all">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-slate-100 text-sm">طبقة التسريع النواية (eBPF/XDP)</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                معالجة وإسقاط الحزم على مستوى كرت الشبكة مباشرة بدقة الميكروثانية لصد هجمات DDoS الحادة.
              </p>
            </div>

            <div className="glass-panel p-5 space-y-3 hover:border-cyan-500/40 transition-all">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-slate-100 text-sm">محرك الذكاء الاصطناعي ORACLE v3</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                كشف الأنماط المعقدة وتجميع التهديدات التنبؤية والتصدي السلوكي الشاذ لحظياً عبر UEBA.
              </p>
            </div>

            <div className="glass-panel p-5 space-y-3 hover:border-cyan-500/40 transition-all">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-slate-100 text-sm">محركات الفحص والتنفيذ الـ 17</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                منظومة كاملة تغطي Firewall, WAF, IDS/IPS PHANTOM, DLP, SSL Inspection, DART DNS, VPN.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Documentation Navigation Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-100">فهرس ملفات التوثيق الأكاديمي</h2>
            <p className="text-xs text-slate-400">تصفح أقسام التوثيق الـ 18 المتاحة في البوابة</p>
          </div>
          <Link href="/docs" className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1">
            <span>عرض الجميع</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {docs.slice(0, 6).map((doc) => (
            <Link
              key={doc.slug}
              href={`/docs/${doc.slug}`}
              className="glass-panel-hover p-5 space-y-3 block group"
            >
              <div className="flex items-center justify-between">
                <span className="cyber-badge">{doc.categoryAr}</span>
                <span className="text-[11px] font-mono text-slate-400">{doc.readingTime} دقائق قراءة</span>
              </div>
              <h3 className="font-bold text-sm text-slate-100 group-hover:text-cyan-400 transition-colors">
                {doc.titleAr}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {doc.summaryAr}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
