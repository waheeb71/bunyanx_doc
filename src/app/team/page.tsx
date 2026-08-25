import React from 'react';
import Link from 'next/link';
import {
  Users,
  UserCheck,
  GraduationCap,
  Shield,
  MapPin,
  Send,
  ExternalLink,
} from 'lucide-react';

export const metadata = {
  title: 'فريق العمل والمشرف الأكاديمي',
  description: 'فريق مشروع تخرج نظام الاستجابة الذكي للهجمات السيبرانية BUNYANX والمشرف الهندسي — كلية الهندسة، قسم الأمن السيبراني، دفعة 2026.',
};

export default function TeamPage() {
  const teamMembers = [
    {
      name: 'وهيب مهبوب علي',
      telegramHandle: '@run_kernel',
      telegramUrl: 'https://t.me/run_kernel',
    },
    {
      name: 'أسد الدين علي علي',
      telegramHandle: '@XXKUU',
      telegramUrl: 'https://t.me/XXKUU',
    },
    {
      name: 'عمرو عبده الله علي',
      telegramHandle: '@XXHGX',
      telegramUrl: 'https://t.me/XXXHGX',
    },
    {
      name: 'موسى محمد عبد الله',
      telegramHandle: '@mousa_mohammed',
      telegramUrl: 'https://t.me/mousa_mohammed',
    },
    {
      name: 'اسامة يوسف سعيد',
      telegramHandle: '@G6GGM',
      telegramUrl: 'https://t.me/G6GGM',
    },
  ];

  const supervisor = {
    name: 'المهندس يحيى الصبري',
    role: 'المشرف الهندسي والأكاديمي على مشروع التخرج',
    department: 'كلية الهندسة — قسم أمن المعلومات وهندسة الشبكات',
    desc: 'الإشراف الهندسي المباشر، التوجيه الأكاديمي، والمراجعة الفنية لمعمارية منظومة BUNYANX Intelligent Response System to Cyberattacks ونتائج الاختبارات والتوثيق المعتمد.',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-10 space-y-4 text-center max-w-3xl mx-auto bg-[#091424]">
        <div className="cyber-badge">
          <Users className="w-3.5 h-3.5 text-cyan-400" />
          <span>Graduation Project Team — Class of 2026</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100">
          فريق العمل والمشرف الأكاديمي
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          نخبة مهندسي مشروع تخرج منظومة BUNYANX
          Intelligent Response System to Cyberattacks تحت الإشراف الأكاديمي المباشر في كلية الهندسة.
        </p>
      </div>

      {/* Academic Supervisor Card Highlight */}
      <section className="max-w-3xl mx-auto">
        <div className="glass-panel p-6 sm:p-8 bg-dark-surface/95 border-cyan-500/40 shadow-neon-subtle space-y-4 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-right">
            <div className="w-16 h-16 rounded-2xl bg-dark-bg border border-cyan-500/50 p-3 flex items-center justify-center shrink-0">
              <UserCheck className="w-8 h-8 text-cyan-400" />
            </div>

            <div className="space-y-1 min-w-0">
              <span className="cyber-tag mb-1">المشرف الهندسي والأكاديمي</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100">{supervisor.name}</h2>
              <div className="text-xs font-semibold text-cyan-400">{supervisor.role}</div>
              <div className="text-xs text-slate-400 font-mono flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{supervisor.department}</span>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-3 border-t border-dark-border/80">
            {supervisor.desc}
          </p>
        </div>
      </section>

      {/* Engineering Students Team Grid (Name & Telegram Only) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-dark-border">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">مهندسو المشروع (5 طلاب)</h2>
          </div>
          <span className="text-xs font-mono text-cyan-400">Class of 2026</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="glass-panel p-5 bg-dark-surface/90 border-dark-border hover:border-cyan-500/40 transition-all group flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-dark-bg border border-cyan-500/40 text-cyan-400 font-mono font-bold flex items-center justify-center text-sm shrink-0 group-hover:border-cyan-400 transition-colors">
                  0{idx + 1}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-base text-slate-100 group-hover:text-cyan-400 transition-colors truncate">
                    {member.name}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">مهندس أمن سيبراني وشبكات</span>
                </div>
              </div>

              <a
                href={member.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-dark-bg border border-[#2CA5E0]/40 text-[#2CA5E0] hover:bg-[#2CA5E0]/15 hover:border-[#2CA5E0] active:scale-95 transition-all text-xs font-mono font-semibold min-h-[44px]"
              >
                <div className="flex items-center gap-2">
                  <Send className="w-3.5 h-3.5" />
                  <span dir="ltr">{member.telegramHandle}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* University & Academic Department Information */}
      <section className="glass-panel p-6 sm:p-8 bg-[#091424] space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold">
          <Shield className="w-4 h-4" />
          <span>المعلومات الأكاديمية والاعتماد</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300 font-mono">
          <div className="p-3.5 rounded-lg bg-dark-bg border border-dark-border">
            <span className="text-slate-500 block text-[10px]">المؤسسة الأكاديمية:</span>
            <span className="font-bold text-slate-200">كلية الهندسة</span>
          </div>
          <div className="p-3.5 rounded-lg bg-dark-bg border border-dark-border">
            <span className="text-slate-500 block text-[10px]">القسم التخصصي:</span>
            <span className="font-bold text-slate-200">قسم أمن المعلومات وهندسة الشبكات</span>
          </div>
          <div className="p-3.5 rounded-lg bg-dark-bg border border-dark-border">
            <span className="text-slate-500 block text-[10px]">سنة التخرج والتسليم:</span>
            <span className="font-bold text-cyan-400">2026 م</span>
          </div>
        </div>
      </section>
    </div>
  );
}
