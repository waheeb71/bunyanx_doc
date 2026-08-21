import React from 'react';
import Link from 'next/link';
import { getAllDocs, DocItem } from '@/lib/docs';
import {
  BookOpen,
  FileText,
  ArrowLeft,
  Clock,
  FileCheck,
  Shield,
  Zap,
  Globe,
  Database,
  BrainCircuit,
  Eye,
  GraduationCap,
  ChevronLeft,
} from 'lucide-react';

export const metadata = {
  title: 'مركز التوثيق الأكاديمي الشامل',
  description: 'فهرس ملفات التوثيق الأكاديمي الـ 18 لمنظومة BUNYANX Enterprise NGFW مقسمة حسب التخصصات والمحركات الأمنية.',
};

const DOC_CATEGORIES = [
  {
    id: 'master',
    titleAr: 'الرسالة الماستر والتقرير الشامل',
    titleEn: 'Master Graduation Thesis',
    icon: GraduationCap,
    slugs: ['master-thesis'],
  },
  {
    id: 'core',
    titleAr: 'معمارية النظام وتسريع النواة',
    titleEn: 'Core Architecture & Kernel Fast Path',
    icon: Zap,
    slugs: ['system-engine', 'acceleration'],
  },
  {
    id: 'network',
    titleAr: 'حماية الشبكة والمحيط',
    titleEn: 'Network & Perimeter Security',
    icon: Shield,
    slugs: ['firewall', 'vpn', 'qos'],
  },
  {
    id: 'inspection',
    titleAr: 'محركات الفحص العميق وكشف التسلل',
    titleEn: 'Deep Inspection & IDS/IPS',
    icon: Eye,
    slugs: ['ids-ips', 'waf', 'ssl-inspection', 'http-inspection'],
  },
  {
    id: 'web',
    titleAr: 'أمان الويب والخدمات الوسيطة',
    titleEn: 'Web & Proxy Defense',
    icon: Globe,
    slugs: ['proxy', 'web-filter', 'dns-security'],
  },
  {
    id: 'data',
    titleAr: 'حماية البيانات ومكافحة البرمجيات والبريد',
    titleEn: 'Data Protection, Malware & Email',
    icon: Database,
    slugs: ['dlp', 'anti-malware', 'email-security'],
  },
  {
    id: 'ai',
    titleAr: 'الذكاء الاصطناعي والتحليل السلوكي',
    titleEn: 'Predictive AI & Behavioral Analytics',
    icon: BrainCircuit,
    slugs: ['predictive-ai', 'ueba'],
  },
];

export default async function DocsLandingPage() {
  const docs = await getAllDocs();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-10 space-y-4 text-center max-w-3xl mx-auto bg-[#091424]">
        <div className="cyber-badge">
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span>Academic Documentation Portal</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100">
          مركز التوثيق الأكاديمي الشامل
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          بوابة التوثيق التقني والأكاديمي المعتمدة لمشروع التخرج. تضم 18 وثيقة مفصلة تشمل التحليل الرياضي، المعمارية البرمجية، وسيناريوهات الاختبار لكل محرك أمني.
        </p>
      </div>

      {/* Featured Master Thesis Highlight Card */}
      {docs.find((d) => d.slug === 'master-thesis') && (
        <div className="glass-panel p-6 sm:p-8 bg-dark-surface/95 border-cyan-500/40 shadow-neon-subtle flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl text-center sm:text-right">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400">
              <GraduationCap className="w-4 h-4" />
              <span>الوثيقة الشاملة الرئيسية</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
              رسالة مشروع التخرج الأكاديمية الموحدة
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              تحتوي على التقرير الأكاديمي الموحد المكون من 8 فصول كاملة، مراجعة الأدبيات، التصميم الهندسي، 27 مساهمة بحثية، ومصفوفات الاختبار والتحقق.
            </p>
            <div className="text-xs font-mono text-slate-400 pt-1">
              حجم التوثيق: +2,380 سطر أكاديمي | وقت القراءة: 45 دقيقة
            </div>
          </div>

          <Link
            href="/docs/master-thesis"
            className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-bold text-xs sm:text-sm hover:bg-cyan-400 active:scale-95 transition-all shadow-sm flex items-center gap-2 shrink-0"
          >
            <span>قراءة الرسالة الماستر</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Categorized Documentation Sections */}
      <div className="space-y-10">
        {DOC_CATEGORIES.map((category) => {
          const categoryDocs = docs.filter((d) => category.slugs.includes(d.slug));
          if (categoryDocs.length === 0) return null;
          const Icon = category.icon;

          return (
            <div key={category.id} className="space-y-4">
              {/* Category Header */}
              <div className="flex items-center justify-between pb-2 border-b border-dark-border">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-dark-surface border border-cyan-500/30 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-slate-100">
                      {category.titleAr}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400 block -mt-0.5">
                      {category.titleEn}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-cyan-400">
                  {categoryDocs.length} {categoryDocs.length === 1 ? 'وثيقة' : 'وثائق'}
                </span>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryDocs.map((doc) => (
                  <Link
                    key={doc.slug}
                    href={`/docs/${doc.slug}`}
                    className="glass-panel p-5 flex flex-col justify-between space-y-3 bg-dark-surface/90 border-dark-border hover:border-cyan-500/40 hover:bg-[#0E1B33] transition-all group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="cyber-tag">{doc.categoryAr}</span>
                        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-cyan-400" />
                          {doc.readingTime} دقائق
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-slate-100 group-hover:text-cyan-400 transition-colors">
                        {doc.titleAr}
                      </h4>
                      <span className="text-[10px] font-mono text-cyan-400/80 block -mt-1">
                        {doc.titleEn}
                      </span>

                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {doc.summaryAr}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-dark-border/80 flex items-center justify-between text-xs text-cyan-400 font-semibold">
                      <span>عرض التوثيق</span>
                      <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
