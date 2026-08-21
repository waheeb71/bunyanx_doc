import React from 'react';
import { PlayCircle, Video, Image as ImageIcon, Sparkles, UploadCloud } from 'lucide-react';

export const metadata = {
  title: 'العروض التجريبية والوسائط',
  description: 'معرض الفيديوهات والصور والعروض الحية لمنظومة BUNYANX Enterprise NGFW.',
};

export default function DemoPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-10 space-y-4 text-center max-w-3xl mx-auto bg-[#091424]">
        <div className="cyber-badge">
          <PlayCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>Demonstrations & Media Gallery</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100">
          العروض التجريبية ومعرض الوسائط
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          قسم مخصص لعرض الفيديوهات التوضيحية، لقطات الشاشة، وتجارب الاختراق الحية لمنظومة BUNYANX.
        </p>
      </div>

      {/* Clean Ready-to-Add Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Video Placeholder Container */}
        <div className="glass-panel p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-4 bg-dark-surface/80 border-dashed border-2 border-cyan-500/30 hover:border-cyan-500/60 transition-all rounded-2xl min-h-[280px]">
          <div className="w-16 h-16 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Video className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-base text-slate-100">قسم الفيديوهات والعروض الحية</h3>
            <p className="text-xs text-slate-400 max-w-xs">
              مساحة مخصصة لإدراج فيديوهات التجارب العملية وتسجيلات الشاشة لمحركات المنظومة.
            </p>
          </div>
        </div>

        {/* Screenshot / Gallery Placeholder Container */}
        <div className="glass-panel p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-4 bg-dark-surface/80 border-dashed border-2 border-blue-500/30 hover:border-blue-500/60 transition-all rounded-2xl min-h-[280px]">
          <div className="w-16 h-16 rounded-2xl bg-blue-950/40 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <ImageIcon className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-base text-slate-100">معرض الصور ولقطات الأدلة</h3>
            <p className="text-xs text-slate-400 max-w-xs">
              مساحة مخصصة لإدراج صور لوحة التحكم وسجلات التحقق ونتائج الفحص.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
