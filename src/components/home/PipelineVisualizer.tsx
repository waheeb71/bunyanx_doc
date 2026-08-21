'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Zap,
  Shield,
  Eye,
  Globe,
  Bug,
  Database,
  BrainCircuit,
  ArrowDown,
  ArrowLeft,
  ChevronRight,
  Activity,
  Layers,
} from 'lucide-react';

interface PipelineStep {
  id: string;
  stepNumber: string;
  titleAr: string;
  titleEn: string;
  layer: string;
  speed: string;
  icon: React.ComponentType<{ className?: string }>;
  descriptionAr: string;
  details: string[];
  docSlug: string;
  color: string;
  badgeColor: string;
}

const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: 'ebpf',
    stepNumber: '01',
    titleAr: 'تسريع النواة والتقاط الحزم',
    titleEn: 'eBPF / XDP Ingress Filter',
    layer: 'Kernel Driver (L2/L3)',
    speed: '< 10 µs',
    icon: Zap,
    descriptionAr: 'التقاط الحزم فور وصولها لبطاقة الشبكة (NIC) وتصفية هجمات الحرمان من الخدمة (SYN Flood / DDoS) وإسقاط الحزم المشبوهة بدون أي استهلاك لمعالج المستخدم.',
    details: [
      'معالجة الحزم بنمط Zero-Copy مباشرة في النواة',
      'إسقاط فوري لعناوين الـ IP المدرجة في القائمة السوداء',
      'سرعة معالجة تفوق 10+ Gbps مع الحفاظ على زمن استجابة متناهي الصغر',
    ],
    docSlug: 'acceleration',
    color: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-400',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  },
  {
    id: 'network',
    stepNumber: '02',
    titleAr: 'تتبع الحالة والجدار الناري',
    titleEn: 'Stateful Firewall & Conntrack',
    layer: 'Network & Transport (L3/L4)',
    speed: '< 0.5 ms',
    icon: Shield,
    descriptionAr: 'تتبع حالة جلسات الاتصال (TCP State Machine) وتطبيق قواعد الجدار الناري المترجمة لأعداد صحيحة O(1) وفحص التصفية الجغرافية GeoIP.',
    details: [
      'فحص نطاقات العناوين والقواعد المجمعة بسرعة فائقة O(1)',
      'تتبع دورة حياة اتصالات TCP/UDP/ICMP حتى 100,000 اتصال',
      'نظام قاطع الدائرة (Circuit Breaker) للعزل التلقائي وحماية النظام',
    ],
    docSlug: 'firewall',
    color: 'border-blue-500/40 bg-blue-950/20 text-blue-400',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  },
  {
    id: 'dpi',
    stepNumber: '03',
    titleAr: 'الفحص العميق وكشف التسلل',
    titleEn: 'PHANTOM IDS/IPS & SSL DPI',
    layer: 'Deep Inspection (L4–L7)',
    speed: '< 2.5 ms',
    icon: Eye,
    descriptionAr: 'فحص الحزم بالترميز الطيفي (Spectral Byte FFT) والرسوم البيانية السببية للتدفقات لرصد محاولات التسلل البطيئة والاختراق الأفقي (APT Pivoting).',
    details: [
      'مطابقة تواقيع الهجمات المتطابقة مع قواعد Snort/Suricata',
      'تحليل المحتوى المشفر SSL/TLS دون كسر الخصوصية عبر البصمة الطيفية',
      'رصد محاولات التحرك الجانبي داخل الشبكة المؤسسية',
    ],
    docSlug: 'ids-ips',
    color: 'border-indigo-500/40 bg-indigo-950/20 text-indigo-400',
    badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
  },
  {
    id: 'web',
    stepNumber: '04',
    titleAr: 'حماية التطبيقات وتصفية الويب',
    titleEn: 'WAF / WAAP & DART DNS',
    layer: 'Application Layer (L7)',
    speed: '< 3.0 ms',
    icon: Globe,
    descriptionAr: 'فحص ترويسات وجسم بروتوكولات الويب ضد ثغرات OWASP Top-10، ورصد أنفاق تهريب البيانات عبر DNS واستجابات DGA الخبيثة.',
    details: [
      'كشف هجمات SQL Injection و Cross-Site Scripting (XSS) و Path Traversal',
      'تحليل إنتروبيا أسماء النطاقات (Shannon Entropy) لمنع برمجيات الـ Botnets',
      'تحويل النطاقات المشبوهة إلى Sinkhole أمني تلقائياً',
    ],
    docSlug: 'waf',
    color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-400',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  },
  {
    id: 'malware',
    stepNumber: '05',
    titleAr: 'كشف البرمجيات وأمان البريد',
    titleEn: 'NM-MDE Malware & Email Gateway',
    layer: 'Content & Payload (L7)',
    speed: '< 4.0 ms',
    icon: Bug,
    descriptionAr: 'تحليل سلوك تدفق الملفات وحركة البيانات المشفرة (Zero-Decryption ETA) وتطبيق نماذج BERT اللغوية لكشف رسائل الاحتيال المالي الموجهة (BEC).',
    details: [
      'فحص الترويسات الثنائية (PE Header) للملفات المشبوهة',
      'تحليل نفسي-لغوي لنصوص البريد الإلكتروني لكشف الهندسة الاجتماعية',
      'فحص روابط التصيد وسجلات SPF/DKIM/DMARC',
    ],
    docSlug: 'anti-malware',
    color: 'border-rose-500/40 bg-rose-950/20 text-rose-400',
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
  },
  {
    id: 'dlp-ueba',
    stepNumber: '06',
    titleAr: 'منع تسريب البيانات والتحليل السلوكي',
    titleEn: 'DLP Engine & UEBA Analytics',
    layer: 'Data & Behavior (L7)',
    speed: '< 3.5 ms',
    icon: Database,
    descriptionAr: 'مراقبة نقل البيانات الحساسة لمنع التسريب ومطابقة الإنتروبيا (MSEM Lite)، مع بناء الملف السلوكي الديناميكي للمستخدمين عبر 21 متغيراً إحصائياً.',
    details: [
      'رصد بطاقات الائتمان، أرقام الهويات، والبيانات السرية عبر Regex والإنتروبيا',
      'حساب درجات المخاطر التكيّفية (Adaptive Risk Scoring) لتقليل الإنذارات الكاذبة',
      'عزل تلقائي للمستخدمين أو الأجهزة عند حدوث انحراف سلوكي حاد',
    ],
    docSlug: 'dlp',
    color: 'border-amber-500/40 bg-amber-950/20 text-amber-400',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  },
  {
    id: 'aegis',
    stepNumber: '07',
    titleAr: 'محرك الذكاء التنبؤي والاستجابة',
    titleEn: 'AEGIS v3 AI & Adaptive Enforcement',
    layer: 'Intelligence & Decision Core',
    speed: '< 1.0 ms',
    icon: BrainCircuit,
    descriptionAr: 'محرك اتخاذ القرار المبني على نظرية الألعاب (Game Theory) لتقييم مسار المهاجم وتحديد الاستجابة المثلى (Allow / Drop / Quarantine / Dynamic Blocklist) وتصدير البيانات لـ SOC.',
    details: [
      'توقع الخطوات الهجومية القادمة قبل اكتمالها',
      'تحديث القوائم السوداء الديناميكية في النواة فوريّاً',
      'تسجيل غير متزامن للبيانات القياسية (Async JSON Telemetry)',
    ],
    docSlug: 'predictive-ai',
    color: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-400',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  },
];

export const PipelineVisualizer: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<PipelineStep>(PIPELINE_STEPS[0]);

  return (
    <div className="space-y-6">
      {/* Pipeline Navigation / Step Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {PIPELINE_STEPS.map((step) => {
          const Icon = step.icon;
          const isSelected = selectedStep.id === step.id;

          return (
            <button
              key={step.id}
              onClick={() => setSelectedStep(step)}
              className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between min-h-[95px] relative group ${
                isSelected
                  ? 'border-cyan-400 bg-[#11223E] shadow-neon-subtle ring-1 ring-cyan-400/50'
                  : 'border-dark-border bg-dark-surface/80 hover:border-cyan-500/40 hover:bg-[#0D192D]'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-mono text-xs font-bold text-cyan-400">{step.stepNumber}</span>
                <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-400'}`} />
              </div>
              <div>
                <div className={`font-bold text-xs leading-tight line-clamp-2 ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                  {step.titleAr}
                </div>
                <div className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
                  {step.speed}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Step Active Detail Box */}
      <div className="glass-panel p-5 sm:p-7 border border-cyan-500/30 bg-[#0A1628] space-y-5 animate-fadeIn">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-dark-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-dark-bg border border-cyan-500/40 flex items-center justify-center shrink-0">
              <selectedStep.icon className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-cyan-400">المرحلة {selectedStep.stepNumber}</span>
                <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${selectedStep.badgeColor}`}>
                  {selectedStep.layer}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-dark-bg border border-dark-border text-slate-300">
                  زمن المعالجة: {selectedStep.speed}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-100 mt-1">
                {selectedStep.titleAr} <span className="text-xs font-mono text-cyan-400/80 font-normal">({selectedStep.titleEn})</span>
              </h3>
            </div>
          </div>

          <Link
            href={`/docs/${selectedStep.docSlug}`}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 active:scale-95 text-xs font-bold transition-all shrink-0"
          >
            <span>التوثيق التقني للوحدة</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {selectedStep.descriptionAr}
        </p>

        {/* Detailed Inspection Checklist */}
        <div className="space-y-2 pt-1">
          <div className="text-xs font-bold text-slate-200 font-mono flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>الآليات المنفذة في هذه الطبقة:</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {selectedStep.details.map((detail, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-dark-bg/60 border border-dark-border/80 text-xs text-slate-300 flex items-start gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                <span className="leading-relaxed">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
