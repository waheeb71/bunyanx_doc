import React from 'react';
import Link from 'next/link';
import { getAllDocs } from '@/lib/docs';
import {
  Cpu,
  Zap,
  Shield,
  Lock,
  Activity,
  Eye,
  Globe,
  Key,
  FileCode,
  Server,
  Filter,
  Network,
  Database,
  Bug,
  Mail,
  BrainCircuit,
  Users,
  ArrowLeft,
  Layers,
} from 'lucide-react';

export const metadata = {
  title: 'الوحدات الأمنية الـ 17 | BunyanX Enterprise NGFW',
  description: 'استعراض الـ 17 وحدة أمنية ومحركات الفحص والذكاء الاصطناعي لمنصة BunyanX.',
};

const MODULE_ICONS: Record<string, any> = {
  'system': Cpu,
  'acceleration': Zap,
  'firewall': Shield,
  'vpn': Lock,
  'qos': Activity,
  'ids-ips': Eye,
  'waf': Globe,
  'ssl': Key,
  'http': FileCode,
  'proxy': Server,
  'webfilter': Filter,
  'dns': Network,
  'dlp': Database,
  'malware': Bug,
  'email': Mail,
  'ai': BrainCircuit,
  'ueba': Users,
};

export default async function ModulesPage() {
  const docs = await getAllDocs();
  const moduleDocs = docs.filter((d) => d.moduleId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="glass-panel p-8 space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
          <Layers className="w-4 h-4" />
          <span>Integrated Security Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          منظومة الوحدات الأمنية الـ 17
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          استعراض شامل لكافة المحركات والوحدات الوظيفية المكونة لمنصة BunyanX Enterprise NGFW مع روابط مباشرة إلى التوثيق الأكاديمي التفصيلي لكل وحدة.
        </p>
      </div>

      {/* Grid of 17 Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {moduleDocs.map((doc) => {
          const IconComponent = (doc.moduleId && MODULE_ICONS[doc.moduleId]) || Shield;

          return (
            <div
              key={doc.slug}
              className="glass-panel-hover p-6 flex flex-col justify-between space-y-4 group relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 p-2 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="cyber-badge">{doc.categoryAr}</span>
                </div>

                <div>
                  <h3 className="font-extrabold text-base text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {doc.titleAr}
                  </h3>
                  <span className="text-[11px] font-mono text-cyan-400/80 block">
                    {doc.titleEn}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {doc.summaryAr}
                </p>
              </div>

              <div className="pt-4 border-t border-dark-border flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">{doc.wordCount} كلمة توثيق</span>
                <Link
                  href={`/docs/${doc.slug}`}
                  className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:underline"
                >
                  <span>عرض التوثيق الأكاديمي</span>
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
