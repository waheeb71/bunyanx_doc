import React from 'react';
import Link from 'next/link';
import {
  Cpu,
  Zap,
  Shield,
  Eye,
  Globe,
  Database,
  BrainCircuit,
  ArrowLeft,
  CheckCircle2,
  Server,
  Activity,
  Layers,
  Lock,
  Bug,
  Mail,
  Network,
  Filter,
  Flame,
  Terminal,
} from 'lucide-react';

export const metadata = {
  title: 'معمارية المنظومة وخط سير الحزم',
  description: 'معمارية منظومة BUNYANX متعددة الطبقات من تسريع النواة eBPF/XDP إلى محركات الفحص والذكاء الاصطناعي التنبؤي AEGIS v3.',
};

export default function ArchitecturePage() {
  const ARCHITECTURE_LAYERS = [
    {
      id: 'core',
      layerNumber: '01',
      titleAr: 'طبقة تسريع النواة والمسار السريع (Kernel Fast Path)',
      titleEn: 'eBPF / XDP Wire-Speed Layer',
      badge: 'Kernel Space (L2/L3)',
      icon: Zap,
      accentColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/20',
      descriptionAr: 'المسار السريع لمعالجة وإسقاط الحزم عند مستوى كرت الشبكة مباشرة (Driver Level) بنمط Zero-Copy قبل وصولها إلى مكدس بروتوكولات النواة، مما يتيح معالجة تفوق 10+ Gbps وتخفيف هجمات DDoS بزمن انتقال يقل عن 10 ميكروثانية.',
      technologies: ['eBPF', 'XDP (eXpress Data Path)', 'BCC', 'AF_XDP Sockets', 'C / Clang'],
      keyFunctions: [
        'إسقاط فوري لحزم SYN Flood و UDP Floods في النواة',
        'تصفية وفحص ترويسات L3/L4 وتطبيق القوائم السوداء',
        'توجيه الحزم المشروعة إلى محركات الفحص في فضاء المستخدم بسرعة قصوى',
      ],
      docLink: '/docs/acceleration',
    },
    {
      id: 'network',
      layerNumber: '02',
      titleAr: 'طبقة حماية الشبكة وتتبع الجلسات (Network & Session Layer)',
      titleEn: 'Stateful Firewall, VPN & QoS',
      badge: 'Network & Transport (L3/L4)',
      icon: Shield,
      accentColor: 'text-blue-400 border-blue-500/40 bg-blue-950/20',
      descriptionAr: 'محرك الجدار الناري الذكي القائم على تتبع دورة حياة اتصالات TCP/UDP/ICMP، ومطابقة قواعد ACL المجمعة بسرعة O(1)، وإدارة الأنفاق المشفرة الآمنة (WireGuard/IPsec)، وتنظيم جودة الخدمة (QoS).',
      technologies: ['Stateful Conntrack', 'Integer Boundary Checking', 'WireGuard', 'IPsec', 'HTB Token Bucket'],
      keyFunctions: [
        'تتبع دورة حياة 100,000+ اتصال متزامن مع إدارة الذاكرة بـ LRU',
        'تصفية العناوين والمناطق الجغرافية المعادية عبر GeoIP Filtering',
        'توفير أنفاق VPN فائقة التشفير مع تحديد الأولويات عبر QoS',
      ],
      docLink: '/docs/firewall',
    },
    {
      id: 'dpi',
      layerNumber: '03',
      titleAr: 'طبقة الفحص العميق وكشف التسلل (Deep Packet Inspection)',
      titleEn: 'PHANTOM IDS/IPS & SSL/TLS Inspection',
      badge: 'Deep Inspection (L4–L7)',
      icon: Eye,
      accentColor: 'text-indigo-400 border-indigo-500/40 bg-indigo-950/20',
      descriptionAr: 'منظومة كشف ومنع التسلل PHANTOM المبتكرة، التي تدمج مطابقة تواقيع الهجمات الكلاسيكية مع التمثيل الطيفي للبايتات (Spectral Byte FFT) والرسوم البيانية السببية الزمانية (Granger Causal Graphs) لرصد الاختراق الأفقي البطيء (APT).',
      technologies: ['Spectral Byte FFT', 'Granger Causality', 'Snort/Suricata Signatures', 'TLS Fingerprinting (JA3/JA4)'],
      keyFunctions: [
        'رصد البرمجيات الخبيثة المهربة داخل حركة المرور المشفرة دون فك التشفير',
        'تتبع مسارات التحرك الجانبي داخل الشبكة وربط الأحداث عبر الزمن',
        'إصدار أحكام أمنية بالغة الدقة مع عزل تلقائي للمصادر المخترقة',
      ],
      docLink: '/docs/ids-ips',
    },
    {
      id: 'app-web',
      layerNumber: '04',
      titleAr: 'طبقة حماية التطبيقات والويب (Application Security & Web Defense)',
      titleEn: 'WAF/WAAP, DART DNS & HoloFilter',
      badge: 'Application Layer (L7)',
      icon: Globe,
      accentColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20',
      descriptionAr: 'منظومة حماية متكاملة لتطبيقات الويب وواجهات البرمجة (API)، وتصفية المحتوى والخدمات الوسيطة، مع محرك DART المخصص لتأمين بروتوكول DNS ضد محاولات الاستنزاف وتوليد النطاقات العشوائية (DGA).',
      technologies: ['WAF AST Parser', 'Shannon Entropy DGA', 'DNS Sinkholing', 'Forward/Reverse Proxy', 'HoloFilter'],
      keyFunctions: [
        'حماية شاملة ضد ثغرات OWASP Top-10 (SQLi, XSS, CSRF, SSRF, RCE)',
        'كشف أنفاق تهريب البيانات عبر استعلامات DNS وفحص الإنتروبيا اللحظي',
        'تصفية وتصنيف محتوى مواقع الويب عبر 90+ تصنيف أمني',
      ],
      docLink: '/docs/waf',
    },
    {
      id: 'data-malware',
      layerNumber: '05',
      titleAr: 'طبقة حماية البيانات والبرمجيات الخبيثة (Data & Malware Protection)',
      titleEn: 'NM-MDE Anti-Malware, DLP & Email Security',
      badge: 'Payload & Data Security (L7)',
      icon: Database,
      accentColor: 'text-rose-400 border-rose-500/40 bg-rose-950/20',
      descriptionAr: 'حماية متقدمة للبيانات والملفات والبريد الإلكتروني، تشمل محرك NM-MDE لتحليل حركة البرمجيات الخبيثة، ومحرك DLP المزود بخوارزمية MSEM Lite لمطابقة الإنتروبيا الدلالية لمنع التسريب، ونماذج BERT لكشف رسائل الاحتيال المالي الموجهة (BEC).',
      technologies: ['Zero-Decryption ETA', 'MSEM Lite Semantic Entropy', 'BERT NLP Models', 'PE Binary Inspector'],
      keyFunctions: [
        'منع تسريب البيانات الحساسة (أرقام البطاقات، الهويات، المفاتيح السرية)',
        'تحليل نفسي-لغوي لنصوص الرسائل لكشف الهندسة الاجتماعية والتصيد المالي',
        'كشف قنوات التحكم والسيطرة (C2 Beacons) وسلوك البرمجيات الخبيثة',
      ],
      docLink: '/docs/dlp',
    },
    {
      id: 'intelligence',
      layerNumber: '06',
      titleAr: 'طبقة الذكاء الاصطناعي والتحليل السلوكي (Intelligence & Analytics Core)',
      titleEn: 'AEGIS v3 Predictive AI & UEBA Engine',
      badge: 'Behavioral AI Core',
      icon: BrainCircuit,
      accentColor: 'text-amber-400 border-amber-500/40 bg-amber-950/20',
      descriptionAr: 'العقل الذكي للمنظومة: يدمج محرك AEGIS v3 المعتمد على نظرية الألعاب (Game Theory) للتنبؤ بالخطوات الهجومية المستقبلية، مع محرك UEBA لتحليل سلوك المستخدمين والكيانات استناداً إلى 21 متغيراً إحصائياً للحد من التنبيهات الزائفة.',
      technologies: ['Game-Theoretic Response', 'Isolation Forest', 'XGBoost', 'ADWIN Concept Drift', 'Time-Series Clustering'],
      keyFunctions: [
        'التنبؤ بمسارات الهجوم قبل اكتمالها وصياغة استجابة استباقية تحجم التصعيد',
        'نمذجة السلوك الطبيعي للمستخدمين وكشف الانحرافات التشغيلية اللحظية',
        'التعلم المستمر في بيئة الإنتاج والتكيف مع تغير أنماط حركة الشبكة',
      ],
      docLink: '/docs/predictive-ai',
    },
    {
      id: 'orchestration',
      layerNumber: '07',
      titleAr: 'طبقة التنسيق والاستجابة والتسجيل (Orchestration & Enforcement)',
      titleEn: 'Dynamic Blocklist, Circuit Breaker & Telemetry',
      badge: 'Enforcement & SOC Telemetry',
      icon: Activity,
      accentColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/20',
      descriptionAr: 'المحور التنفيذي للقرارات الأمنية: يدير القوائم السوداء الديناميكية في النواة، قواطع الدائرة (Circuit Breakers) لمنع الانهيار التتابعي، وتسجيل البيانات والمقاييس غير المتزامنة وتصديرها لواجهات REST API ولوحات مراكز العمليات (SOC).',
      technologies: ['Dynamic Kernel Blocklist', 'Fail-Closed Circuit Breakers', 'Async JSON Queue', 'FastAPI', 'Next.js UI'],
      keyFunctions: [
        'تحديث قواعد الحظر في النواة خلال أجزاء من الملي ثانية',
        'ضمان مبدأ الفشل الآمن (Fail-Closed) عند حدوث أي استثناء برمجي',
        'تصدير سجلات القياس عن بُعد (Telemetry) بدقة متناهية لمسؤولي الأمن',
      ],
      docLink: '/docs/system-engine',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-10 space-y-4 text-center max-w-3xl mx-auto bg-[#091424]">
        <div className="cyber-badge">Complete Multi-Layer Architecture</div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100">
          معمارية المنظومة وخط سير الحزم
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          تصميم معماري متكامل يربط بين معالجة النواة الفائقة السرعة ومحركات الفحص المتعددة والذكاء الاصطناعي التنبؤي لضمان حماية شاملة لكافة طبقات الشبكة.
        </p>
      </div>

      {/* Interactive Vertical Layer Flow (Optimized for Mobile & Desktop) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-dark-border">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
              الطبقات الهندسية السبع (من كرت الشبكة إلى الذكاء التنبؤي)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              استعراض مفصل لكل طبقة، تقنياتها ومسؤولياتها في مسار الحزمة.
            </p>
          </div>
          <span className="cyber-badge hidden sm:inline-flex">L2 → L7 Defense In-Depth</span>
        </div>

        <div className="space-y-5">
          {ARCHITECTURE_LAYERS.map((layer) => {
            const Icon = layer.icon;

            return (
              <div
                key={layer.id}
                className="glass-panel p-5 sm:p-7 space-y-5 bg-dark-surface/90 border-dark-border hover:border-cyan-500/40 transition-all group"
              >
                {/* Layer Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-dark-border/80">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-dark-bg border border-cyan-500/30 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-cyan-400">LAYER {layer.layerNumber}</span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-dark-bg border border-dark-border text-slate-300">
                          {layer.badge}
                        </span>
                      </div>
                      <h3 className="font-bold text-base sm:text-lg text-slate-100 mt-0.5">
                        {layer.titleAr}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-400 block -mt-0.5">
                        {layer.titleEn}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={layer.docLink}
                    className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 active:scale-95 text-xs font-bold transition-all shrink-0"
                  >
                    <span>التوثيق التقني</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {layer.descriptionAr}
                </p>

                {/* Responsibilities and Technologies Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  {/* Key Functions */}
                  <div className="p-3.5 rounded-lg bg-dark-bg/70 border border-dark-border space-y-2">
                    <div className="text-xs font-bold text-cyan-400 font-mono flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" />
                      <span>الوظائف الأمنية الأساسية:</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {layer.keyFunctions.map((fn, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                          <span className="leading-relaxed">{fn}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies Used */}
                  <div className="p-3.5 rounded-lg bg-dark-bg/70 border border-dark-border space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-blue-400 font-mono flex items-center gap-1.5 mb-2">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>التقنيات والمكتبات المستخدمة:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {layer.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-dark-surface border border-dark-border text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-dark-border/60">
                      حالة التكامل: تم البناء والتحقق البرمجي الكامل ✓
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Hardware & Fast Path Performance Matrix */}
      <section className="glass-panel p-6 sm:p-8 bg-[#091424] space-y-6">
        <div className="space-y-1">
          <div className="cyber-badge">Performance Benchmark Summary</div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
            مؤشرات الأداء الهندسية لمنظومة BUNYANX
          </h2>
          <p className="text-xs text-slate-400">
            النتائج المعيارية المسجلة أثناء اختبارات مسار الحزم في بيئة الإنتاج المعزولة.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-center">
          <div className="p-4 rounded-xl bg-dark-surface border border-dark-border space-y-1">
            <div className="text-xs text-slate-400">إنتاجية تسريع eBPF</div>
            <div className="text-xl sm:text-2xl font-bold text-cyan-400">10+ Gbps</div>
            <div className="text-[10px] text-slate-500">Wire-Speed Throughput</div>
          </div>

          <div className="p-4 rounded-xl bg-dark-surface border border-dark-border space-y-1">
            <div className="text-xs text-slate-400">زمن استجابة النواة</div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-400">&lt; 10 µs</div>
            <div className="text-[10px] text-slate-500">Sub-10 Microseconds</div>
          </div>

          <div className="p-4 rounded-xl bg-dark-surface border border-dark-border space-y-1">
            <div className="text-xs text-slate-400">سعة الجلسات المتتبعة</div>
            <div className="text-xl sm:text-2xl font-bold text-blue-400">100,000+</div>
            <div className="text-[10px] text-slate-500">Active Conntrack Sessions</div>
          </div>

          <div className="p-4 rounded-xl bg-dark-surface border border-dark-border space-y-1">
            <div className="text-xs text-slate-400">سياسة الفشل عند الخطأ</div>
            <div className="text-xl sm:text-2xl font-bold text-rose-400">Fail-Closed</div>
            <div className="text-[10px] text-slate-500">Zero-Trust Default Deny</div>
          </div>
        </div>
      </section>
    </div>
  );
}
