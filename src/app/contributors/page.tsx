import React from 'react';
import { Users, UserCheck, Shield, GraduationCap, Github, Linkedin, Mail, Award, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'فريق العمل والمشرف الأكاديمي | BunyanX Enterprise NGFW',
  description: 'أسماء طلاب فريق عمل مشروع التخرج والمشرف الهندسي لمنصة BunyanX Enterprise NGFW.',
};

export default function ContributorsPage() {
  const teamMembers = [
    {
      name: 'وهيب مهبوب علي',
      role: 'مهندس أمن شبكات ونظم متقدمة',
      university: 'كلية الهندسة — قسم أمن المعلومات وهندسة الشبكات',
      specialty: 'تطوير وتوثيق المعمارية العامة والوحدات الأمنية',
      initials: 'وهـ',
    },
    {
      name: 'أسد الدين علي علي',
      role: 'مهندس أمن سيبراني وتكامل الأنظمة',
      university: 'كلية الهندسة — قسم أمن المعلومات وهندسة الشبكات',
      specialty: 'تطوير وتوثيق وحدات الفحص والـ IDS/IPS و WAF',
      initials: 'أسـ',
    },
    {
      name: 'عمرو عبده الله علي',
      role: 'مهندس برمجيات ونظم تشغيل النواة',
      university: 'كلية الهندسة — قسم أمن المعلومات وهندسة الشبكات',
      specialty: 'تطوير وتوثيق محرك التسريع eBPF/XDP والجدار الناري',
      initials: 'عمـ',
    },
    {
      name: 'موسى محمد عبد الله',
      role: 'مهندس ذكاء اصطناعي وتحليل سلوكي',
      university: 'كلية الهندسة — قسم أمن المعلومات وهندسة الشبكات',
      specialty: 'تطوير وتوثيق محرك ORACLE v3 للذكاء الاصطناعي و UEBA',
      initials: 'موـ',
    },
    {
      name: 'اسامة يوسف سعيد',
      role: 'مهندس حماية بيانات واستخبارات أمنية',
      university: 'كلية الهندسة — قسم أمن المعلومات وهندسة الشبكات',
      specialty: 'تطوير وتوثيق وحدات DLP و DART DNS واختبارات الأداء',
      initials: 'أسـ',
    },
  ];

  const supervisor = {
    name: 'المهندس يحيى الصبري',
    role: 'المشرف الهندسي والأكاديمي على مشروع التخرج',
    department: 'كلية الهندسة — قسم أمن المعلومات وهندسة الشبكات',
    desc: 'الإشراف الهندسي المباشر والمتابعة الأكاديمية والتوجيه التقني لتنفيذ وتوثيق منصة BunyanX Enterprise NGFW.',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Section */}
      <div className="glass-panel p-8 space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-semibold shadow-neon-glow">
          <Users className="w-4 h-4" />
          <span>BunyanX Engineering & Research Team</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          فريق العمل والمشرف الأكاديمي
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          نخبة المهندسين والباحثين الطلاب القائمين على تصميم وتطوير وتوثيق منصة BunyanX Enterprise NGFW تحت الإشراف الأكاديمي المباشر.
        </p>
      </div>

      {/* Supervisor Card Highlight */}
      <section className="max-w-4xl mx-auto">
        <div className="glass-panel p-8 relative overflow-hidden border-2 border-cyan-500/50 shadow-neon-glow space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-right">
            <div className="w-20 h-20 rounded-2xl bg-cyan-950/90 border border-cyan-400 p-4 flex items-center justify-center shrink-0 shadow-neon-glow">
              <UserCheck className="w-10 h-10 text-cyan-400" />
            </div>

            <div className="space-y-1.5 min-w-0">
              <div className="cyber-badge mb-1">تحت إشراف</div>
              <h2 className="text-2xl font-extrabold text-slate-100">{supervisor.name}</h2>
              <div className="text-xs font-semibold text-cyan-400">{supervisor.role}</div>
              <div className="text-xs text-slate-400 font-mono">{supervisor.department}</div>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed pt-3 border-t border-dark-border">
            {supervisor.desc}
          </p>
        </div>
      </section>

      {/* Students Team Cards Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-bold text-slate-100">مهندسو مشروع التخرج (5 طلاب)</h2>
          </div>
          <span className="cyber-badge">Class of 2026</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="glass-panel-hover p-6 flex flex-col justify-between space-y-4 relative overflow-hidden group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 font-bold text-cyan-400 flex items-center justify-center text-sm font-mono group-hover:scale-110 transition-transform">
                    {member.initials}
                  </div>
                  <span className="cyber-badge">عضو فريق</span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-extrabold text-base text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {member.name}
                  </h3>
                  <div className="text-xs font-semibold text-cyan-400/90">{member.role}</div>
                </div>

                <div className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-dark-border">
                  <div className="font-semibold text-slate-300 mb-1">التركيز البحثي والهندسي:</div>
                  <p>{member.specialty}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-dark-border text-[11px] font-mono text-slate-500 truncate">
                {member.university}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
