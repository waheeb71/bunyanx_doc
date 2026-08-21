'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MapPin, Globe, MessageSquare, Shield } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const socialLinks = [
    {
      name: 'Gmail',
      href: 'mailto:rhybmhywb9@gmail.com',
      badgeImg: 'https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white',
    },
    {
      name: 'Telegram',
      href: 'https://t.me/run_kernel',
      badgeImg: 'https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white',
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/wa__cys',
      badgeImg: 'https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white',
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/waheebalsharabi',
      badgeImg: 'https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white',
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@cyber_code1/',
      badgeImg: 'https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-10 space-y-4 text-center max-w-3xl mx-auto bg-[#091424]">
        <div className="cyber-badge">
          <Mail className="w-3.5 h-3.5 text-cyan-400" />
          <span>Contact & Official Channels</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100">
          الاتصال والتواصل الأكاديمي المباشر
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          تواصل معنا مباشرة عبر البريد الإلكتروني الرسمي، قنوات التواصل للمشروع، أو إرسال استفسار أكاديمي أو تقني.
        </p>

        {/* Social Badges Grid */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-2.5">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 active:scale-95 transition-all shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={link.badgeImg} alt={link.name} className="h-8 rounded-md" />
            </a>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Contact Form */}
        <div className="glass-panel p-6 sm:p-8 space-y-5 bg-dark-surface/90 border-dark-border">
          <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span>إرسال استفسار مباشر</span>
          </h2>

          {submitted ? (
            <div className="p-6 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-cyan-400 text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 mx-auto text-cyan-400" />
              <div className="font-bold text-sm">تم استلام رسالتك بنجاح!</div>
              <p className="text-xs text-slate-300">سنتواصل معك عبر البريد المذكور في أقرب فرصة.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">الاسم الكامل</label>
                <input
                  type="text"
                  required
                  placeholder="أدخل اسمك الكريم"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-dark-bg border border-dark-border text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 min-h-[44px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-dark-bg border border-dark-border text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 min-h-[44px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">موضوع الرسالة</label>
                <input
                  type="text"
                  required
                  placeholder="استفسار أكاديمي / تقييم مشروع"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-dark-bg border border-dark-border text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 min-h-[44px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">محتوى الرسالة</label>
                <textarea
                  rows={4}
                  required
                  placeholder="اكتب تفاصيل استفسارك هنا..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-dark-bg border border-dark-border text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-cyan-500 text-black font-bold text-xs sm:text-sm hover:bg-cyan-400 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Send className="w-4 h-4" />
                <span>إرسال الرسالة</span>
              </button>
            </form>
          )}
        </div>

        {/* Official Channels Details */}
        <div className="glass-panel p-6 sm:p-8 space-y-6 bg-dark-surface/90 border-dark-border flex flex-col justify-between">
          <div className="space-y-5">
            <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>قنوات التواصل المعتمدة</span>
            </h2>

            <div className="space-y-3 text-xs">
              <a
                href="mailto:rhybmhywb9@gmail.com"
                className="flex items-center gap-3 p-3 rounded-xl bg-dark-bg border border-dark-border hover:border-cyan-500/40 hover:bg-[#0E1B33] transition-all group"
              >
                <Mail className="w-5 h-5 text-rose-400 shrink-0" />
                <div>
                  <div className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                    البريد الإلكتروني المباشر
                  </div>
                  <div className="text-slate-400 font-mono mt-0.5 text-[11px]">rhybmhywb9@gmail.com</div>
                </div>
              </a>

              <a
                href="https://t.me/run_kernel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-dark-bg border border-dark-border hover:border-cyan-500/40 hover:bg-[#0E1B33] transition-all group"
              >
                <Globe className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <div className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                    قناة التليجرام التقنية
                  </div>
                  <div className="text-slate-400 font-mono mt-0.5 text-[11px]">t.me/run_kernel</div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/waheebalsharabi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-dark-bg border border-dark-border hover:border-blue-500/40 hover:bg-[#0E1B33] transition-all group"
              >
                <Globe className="w-5 h-5 text-blue-400 shrink-0" />
                <div>
                  <div className="font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                    حساب LinkedIn الرسمي
                  </div>
                  <div className="text-slate-400 font-mono mt-0.5 text-[11px]">linkedin.com/in/waheebalsharabi</div>
                </div>
              </a>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-dark-bg border border-dark-border">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-100">المقر الأكاديمي:</div>
                  <div className="text-slate-400 text-[11px] mt-0.5 font-mono">
                    كلية الهندسة — قسم الامن السيبراني — 2026
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300 leading-relaxed font-mono">
            💡 يتم استقبال استفسارات لجان التحكيم والزوار والرد عليها مباشرة عبر القنوات الرسمية أعلاه.
          </div>
        </div>
      </div>
    </div>
  );
}
