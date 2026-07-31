import React from 'react';
import Link from 'next/link';
import { Cpu, Zap, Shield, Eye, Globe, Database, BrainCircuit, ArrowLeft, CheckCircle2, Server } from 'lucide-react';

export const metadata = {
  title: 'معمارية النظام وخط سير الحزم | BunyanX Enterprise NGFW',
  description: 'شرح تفاعلي لمعمارية منصة BunyanX وخط سير الحزم الشبكية Packet Processing Pipeline.',
};

export default function ArchitecturePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="glass-panel p-8 space-y-4 text-center max-w-3xl mx-auto">
        <span className="cyber-badge">System Architecture & Packet Flow</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          معمارية النظام وخط سير الحزمة التفاعلي
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          توضيح تفاعلي لكيفية تدفق المعالجة للحزم الشبكية من كرت الشبكة مروراً بتسريع eBPF/XDP، محرك الفحص الدقيق PHANTOM IDS/IPS، الجدار الناري الذكي، وصولاً إلى محرك الذكاء الاصطناعي التنبؤي ORACLE v3.
        </p>
      </div>

      {/* Packet Processing Pipeline Visualizer */}
      <section className="glass-panel p-8 space-y-8">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Zap className="w-5 h-5 text-cyan-400" />
          <span>خط سير الحزمة الشبكية (Packet Processing Pipeline Step-by-Step)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              step: '01',
              title: 'eBPF / XDP Ingress',
              desc: 'التقاط وتصفية الحزم على مستوى كرت الشبكة (Driver Level) بسرعة السلك وتصفية DDoS.',
              icon: Zap,
              color: 'border-cyan-500/50 bg-cyan-950/30 text-cyan-400',
            },
            {
              step: '02',
              title: 'Stateful Conntrack',
              desc: 'تتبع حالة جلسات TCP/UDP والتفتيش عن القواعد الأساسية للجدار الناري.',
              icon: Shield,
              color: 'border-blue-500/50 bg-blue-950/30 text-blue-400',
            },
            {
              step: '03',
              title: 'DPI & SSL Inspection',
              desc: 'فك التشفير وتفتيش ترويسات وجسم البروتوكولات (HTTP/DNS/Proxy).',
              icon: Eye,
              color: 'border-indigo-500/50 bg-indigo-950/30 text-indigo-400',
            },
            {
              step: '04',
              title: 'WAF & DLP Inspection',
              desc: 'اكتشاف ثغرات OWASP ومطابقة البصمات لمنع تسريب البيانات الحساسة.',
              icon: Database,
              color: 'border-emerald-500/50 bg-emerald-950/30 text-emerald-400',
            },
            {
              step: '05',
              title: 'AI ORACLE v3 & Action',
              desc: 'تقييم المخاطر السلوكية وانحرافات UEBA واتخاذ القرار النهائي (Allow/Drop/Log).',
              icon: BrainCircuit,
              color: 'border-amber-500/50 bg-amber-950/30 text-amber-400',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className={`p-5 rounded-xl border ${item.color} backdrop-blur-md space-y-3 relative group`}>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black font-mono opacity-60">{item.step}</span>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-100">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive System Layers Breakdown */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-100">طبقات المعمارية الهندسية الثلاث</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 space-y-4 border-l-4 border-l-cyan-400">
            <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              <span>1. Kernel Fast Path Layer</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              تتضمن eBPF/XDP و State Conntrack و Hardware Offload لضمان زمن استجابة متناهي الصغر وتأمين الشبكة ضد أعنف الهجمات الموزعة.
            </p>
            <Link href="/docs/acceleration" className="text-xs font-semibold text-cyan-400 hover:underline inline-flex items-center gap-1">
              <span>توثيق وحدة التسريع</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="glass-panel p-6 space-y-4 border-l-4 border-l-blue-400">
            <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
              <Server className="w-5 h-5 text-blue-400" />
              <span>2. Userspace Inspection Engines</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              محركات الفحص العميق PHANTOM IDS/IPS, WAF, SSL Inspection, DLP Engine, Proxy, DART DNS Security, و HoloFilter Web Filter.
            </p>
            <Link href="/docs/ids-ips" className="text-xs font-semibold text-blue-400 hover:underline inline-flex items-center gap-1">
              <span>توثيق محركات الفحص</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="glass-panel p-6 space-y-4 border-l-4 border-l-emerald-400">
            <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-emerald-400" />
              <span>3. AI & Analytics Core</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              محرك ORACLE v3 للذكاء الاصطناعي التنبؤي، نظام تحليل سلوك المستخدمين UEBA، ومركز السجلات والاستخبارات التهديدية المركزي.
            </p>
            <Link href="/docs/predictive-ai" className="text-xs font-semibold text-emerald-400 hover:underline inline-flex items-center gap-1">
              <span>توثيق الذكاء الاصطناعي</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
