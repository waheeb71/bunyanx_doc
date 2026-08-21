import React from 'react';
import { getAllDocs } from '@/lib/docs';
import { ModulesCatalog } from '@/components/modules/ModulesCatalog';
import { Layers } from 'lucide-react';

export const metadata = {
  title: 'منظومة الوحدات الأمنية الـ 17',
  description: 'استعراض المحركات والوحدات الأمنية الـ 17 المكونة لمنظومة BUNYANX Enterprise NGFW مع تفاصيل المعالجة والتقنيات والأدلة.',
};

export default async function ModulesPage() {
  const docs = await getAllDocs();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-10 space-y-4 text-center max-w-3xl mx-auto bg-[#091424]">
        <div className="cyber-badge">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>17 Security Modules</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100">
          منظومة الوحدات الأمنية الـ 17
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          استعراض شامل لكافة المحركات الأمنية ووحدات الفحص والذكاء الاصطناعي في منظومة BUNYANX، مع تفاصيل أهداف كل وحدة، تقنياتها، وأدلة الاختبار.
        </p>
      </div>

      {/* Modules Interactive Catalog */}
      <ModulesCatalog docs={docs} />
    </div>
  );
}
