'use client';

import React, { useState } from 'react';
import { Mail, Github, Linkedin, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="glass-panel p-8 space-y-4 text-center max-w-3xl mx-auto">
        <span className="cyber-badge">Contact & Collaboration</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          الاتصال والتعاون الأكاديمي
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          تواصل معنا للاستفسار حول البحث العلمي والتوثيق الأكاديمي أو تجربة اختبار منصة BunyanX Enterprise NGFW.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Contact Form */}
        <div className="glass-panel p-8 space-y-6">
          <h2 className="text-xl font-bold text-slate-100">إرسال رسالة مباشرة</h2>

          {submitted ? (
            <div className="p-6 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-cyan-400 text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 mx-auto" />
              <div className="font-bold text-sm">تم إرسال رسالتك بنجاح!</div>
              <p className="text-xs text-slate-300">سنتواصل معك في أقرب وقت ممكن.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">الاسم الكامل</label>
                <input
                  type="text"
                  required
                  placeholder="أدخل اسمك الكريم"
                  className="w-full px-3 py-2.5 rounded-lg bg-dark-bg border border-dark-border text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  className="w-full px-3 py-2.5 rounded-lg bg-dark-bg border border-dark-border text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">موضوع الرسالة</label>
                <input
                  type="text"
                  required
                  placeholder="استفسار أكاديمي / تعاون بحثي"
                  className="w-full px-3 py-2.5 rounded-lg bg-dark-bg border border-dark-border text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">محتوى الرسالة</label>
                <textarea
                  rows={4}
                  required
                  placeholder="اكتب رسالتك التفصيلية هنا..."
                  className="w-full px-3 py-2.5 rounded-lg bg-dark-bg border border-dark-border text-slate-100 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-cyan-500 text-black font-bold text-sm hover:bg-cyan-400 shadow-neon-glow transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>إرسال الرسالة</span>
              </button>
            </form>
          )}
        </div>

        {/* Info Box */}
        <div className="glass-panel p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-100">معلومات الاتصال والأكاديمية</h2>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <div className="font-bold text-slate-100">الكلية والقسم:</div>
                  <div className="text-slate-400 mt-0.5">كلية الهندسة — قسم أمن المعلومات وهندسة الشبكات</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <div className="font-bold text-slate-100">البريد الرسمي للمشروع:</div>
                  <div className="text-cyan-400 mt-0.5 font-mono">contact@bunyanx.enterprise-ngfw.org</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Github className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <div className="font-bold text-slate-100">مستودع المشروع:</div>
                  <div className="text-slate-400 mt-0.5 font-mono">github.com/bunyanx-ngfw/master-project</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300 leading-relaxed">
            💡 جميع استفسارات البحوث الأكاديمية والتوثيقات الفنية يتم الرد عليها من قبل فريق المهندسين المشرفين.
          </div>
        </div>
      </div>
    </div>
  );
}
