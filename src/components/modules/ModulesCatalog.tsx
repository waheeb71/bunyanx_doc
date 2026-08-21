'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DocItem } from '@/lib/docs';
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
  X,
  CheckCircle2,
  Terminal,
  Layers,
  BookOpen,
  ChevronLeft,
} from 'lucide-react';

interface ModulesCatalogProps {
  docs: DocItem[];
}

const MODULE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
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

// Rich technical metadata for each of the 17 modules
const MODULE_EXTENDED_INFO: Record<string, {
  layerAr: string;
  layerEn: string;
  protectionType: string;
  purposeAr: string;
  howItWorksAr: string;
  technologies: string[];
  testEvidenceAr: string;
}> = {
  'system': {
    layerAr: 'معمارية النظام المركزي',
    layerEn: 'Core Architecture',
    protectionType: 'إدارة وتكامل المنظومة',
    purposeAr: 'توفير الإطار المركزي لإدارة دورة حياة كافة الوحدات الأمنية، وتنسيق تدفق الحزم وسجلات القياس عن بُعد (Telemetry).',
    howItWorksAr: 'تسجيل الوحدات عبر BaseModule و PluginPriority، مع معمارية أحداث غير متزامنة وقاعدة بيانات موحدة SQLite/SQLAlchemy.',
    technologies: ['FastAPI', 'SQLAlchemy ORM', 'Pydantic v2', 'AsyncIO EventBus', 'Python 3.11+'],
    testEvidenceAr: 'اختبار إعادة التحميل الساخن للوحدات (Hot-Reload) وتحقيق زمن استجابة API أقل من 5 ملي ثانية.',
  },
  'acceleration': {
    layerAr: 'معمارية النواة',
    layerEn: 'Kernel Fast Path',
    protectionType: 'تخفيف DDoS والحظر الفوري',
    purposeAr: 'تصفية وإسقاط الحزم الخبيثة فور وصولها لبطاقة الشبكة (NIC) مباشرة في النواة بسرعة تفوق 10+ Gbps.',
    howItWorksAr: 'تحميل كود C في مسار XDP بنمط Zero-Copy، وتحديث جداول الـ BPF Maps للقوائم السوداء في النواة.',
    technologies: ['eBPF', 'XDP Driver Mode', 'BCC Compiler', 'AF_XDP Sockets', 'Clang/LLVM'],
    testEvidenceAr: 'صد هجوم SYN Flood بسرعة السلك (10M pps) بزمن تأخير 8.4µs بدون أي استهلاك لمعالج الـ Userspace.',
  },
  'firewall': {
    layerAr: 'حماية الشبكة',
    layerEn: 'Network Security',
    protectionType: 'تصفية L3/L4 والتصفية الجغرافية',
    purposeAr: 'تطبيق سياسات الجدار الناري الذكي وتتبع دورة حياة اتصالات TCP/UDP وتصفية المناطق الجغرافية المعادية.',
    howItWorksAr: 'تحويل قواعد ACL إلى نطاقات أعداد صحيحة O(1) عند التحميل، مع جدول حالة ثنائي الاتجاه وقاطع دائرة (Circuit Breaker).',
    technologies: ['Stateful Conntrack', 'Integer Boundary Checking', 'MaxMind GeoIP', 'LRU Cache (100K)'],
    testEvidenceAr: 'مطابقة قواعد 10,000 ACL في أقل من 0.4ms، وتفعيل سياسة Fail-Closed التلقائية عند تعطل المقيّم.',
  },
  'vpn': {
    layerAr: 'حماية الشبكة',
    layerEn: 'Network Security',
    protectionType: 'الاتصال المشفر الآمن',
    purposeAr: 'بناء بوابات اتصال مشفرة ومؤمنة للفروع والموظفين عن بُعد بدعم بروتوكولات WireGuard و IPsec الحديثة.',
    howItWorksAr: 'تبادل مفاتيح التشفير التلقائي وحساب التجزئة HMAC مع عزل حركة مرور الـ VPN في مسارات شبكية افتراضية.',
    technologies: ['WireGuard Kernel Module', 'IPsec strongSwan', 'Curve25519', 'ChaCha20-Poly1305'],
    testEvidenceAr: 'إنشاء 500 نفق مشفر متزامن بزمن استجابة أقل من 2ms وبدون فقدان للحزم.',
  },
  'qos': {
    layerAr: 'حماية الشبكة',
    layerEn: 'Network Security',
    protectionType: 'إدارة وتخصيص النطاق الترددي',
    purposeAr: 'ضمان جودة الخدمة لحركة المرور الحساسة (مثل الصوت والفيديو والبيانات المؤسسية) ومنع استنزاف النطاق الترددي.',
    howItWorksAr: 'تطبيق خوارزمية Hierarchical Token Bucket (HTB) لتصنيف وتحديد معدلات الحزم وعزل التطبيقات غير المصرح بها.',
    technologies: ['Linux Traffic Control (tc)', 'HTB Shaper', 'Fair Queueing', 'DSCP Marking'],
    testEvidenceAr: 'منع اختناق حركة المرور الحساسة عند وصول حركة البيانات الإجمالية إلى 95% من سعة الخط.',
  },
  'ids-ips': {
    layerAr: 'الكشف والفحص',
    layerEn: 'Detection & Inspection',
    protectionType: 'كشف ومنع التسلل المتقدم (PHANTOM)',
    purposeAr: 'رصد الهجمات المعقدة والتحرك الأفقي البطيء (APT Pivoting) داخل حركة المرور المشفرة دون فك التشفير.',
    howItWorksAr: 'دمج التمثيل الطيفي للبايتات (Spectral Byte FFT) مع الرسوم البيانية السببية الزمانية غرانجر والتعلم المستمر (OCL).',
    technologies: ['FFT Wavelet Encoding', 'Granger Causality Graphs', 'GNN / Transformer', 'ADWIN Drift Detection'],
    testEvidenceAr: 'كشف مسار اختراق متسلل أفقي عبر 4 أجهزة داخلية بنسبة ثقة 96.8% وتوليد تنبيه عالي الخطورة.',
  },
  'waf': {
    layerAr: 'الكشف والفحص',
    layerEn: 'Detection & Inspection',
    protectionType: 'حماية تطبيقات الويب وواجهات API',
    purposeAr: 'حماية خوادم الويب من ثغرات OWASP Top-10 (حقن SQL، XSS، CSRF، وحقن الأوامر RCE).',
    howItWorksAr: 'تحليل شجرة الإعراب المجردة (AST Parsing) لطلبات HTTP والتحقق من الترويسات ومطابقة أنماط الاستعلامات الخبيثة.',
    technologies: ['AST Request Parser', 'OWASP Core Rule Set', 'Regex Engine', 'JSON Body Inspector'],
    testEvidenceAr: 'حظر 1,200 محاولة حقن SQL و XSS مركبة مع استجابة HTTP 403 Forbidden فورية وبمعدل إيجابية كاذبة صفر.',
  },
  'ssl': {
    layerAr: 'الكشف والفحص',
    layerEn: 'Detection & Inspection',
    protectionType: 'فحص الحركة المشفرة SSL/TLS',
    purposeAr: 'تحليل وتفتيش شهادات وتدفقات TLS المشفرة لرصد الشهادات المزورة وقنوات الاتصال المشبوهة.',
    howItWorksAr: 'بصمة العميل (JA3/JA4 Fingerprinting)، فحص ترويسات SNI، وفحص مسارات الثقة مع حماية خصوصية المستخدمين.',
    technologies: ['JA3/JA4 TLS Fingerprinting', 'OpenSSL DPI', 'SNI Inspector', 'Certificate Transparency'],
    testEvidenceAr: 'كشف 45 شهادة اتصال ذاتية التوقيع وغير مطابقة تستخدمها برمجيات التسلل الخفية.',
  },
  'http': {
    layerAr: 'الكشف والفحص',
    layerEn: 'Detection & Inspection',
    protectionType: 'فحص بروتوكول HTTP/HTTP2',
    purposeAr: 'تفكيك وتحليل ترويسات وجسم بروتوكول HTTP والتحقق من التوافق الصارم مع معايير RFC.',
    howItWorksAr: 'فحص الطرق (GET/POST/PUT)، طول المحتوى، أنواع MIME، وتصفية هجمات HTTP Smuggling و Header Injection.',
    technologies: ['HTTP/1.1 & HTTP/2 Parser', 'MIME Sniffing', 'Chunked Transfer Inspector'],
    testEvidenceAr: 'حظر محاولات تلاعب بالترويسات (Header Injection) وتهريب الطلبات (Request Smuggling).',
  },
  'proxy': {
    layerAr: 'التصفية والوكيل',
    layerEn: 'Web & Proxy',
    protectionType: 'خادم وكيل أمامي وعكسي',
    purposeAr: 'توجيه وحجب وعزل طلبات تصفح الويب للمستخدمين وتوفير موازنة الأحمال وحماية الخوادم الداخلية.',
    howItWorksAr: 'معالجة اتصالات Forward/Reverse Proxy مع التخزين المؤقت (Caching) وتطبيق سياسات المصادقة الصارمة.',
    technologies: ['Python Async Proxy', 'HTTP Connect Tunneling', 'LRU Page Caching', 'ACL Validator'],
    testEvidenceAr: 'توجيه 10,000 طلب ويب متزامن مع تقليل استهلاك النطاق الترددي عبر التخزين المؤقت بنسبة 35%.',
  },
  'webfilter': {
    layerAr: 'التصفية والوكيل',
    layerEn: 'Web & Proxy',
    protectionType: 'تصفية المحتوى ومواقع الويب (HoloFilter)',
    purposeAr: 'حظر الوصول إلى المواقع الخطرة والمشبوهة ومواقع التصيد بناءً على 90+ تصنيف أمني معتمد.',
    howItWorksAr: 'مطابقة النطاقات عبر خوارزميات التجزئة الفائقة ومطابقة الكلمات المفتاحية مع تصنيف المخاطر التلقائي.',
    technologies: ['HoloFilter Engine', '90+ Categories Database', 'URL Classifier', 'Domain Trie Search'],
    testEvidenceAr: 'حظر الوصول إلى 15,000 موقع تصيد وبرمجيات خبيثة ومقامرة فور محاولة الدخول.',
  },
  'dns': {
    layerAr: 'التصفية والوكيل',
    layerEn: 'Web & Proxy',
    protectionType: 'أمان أسماء النطاقات (DART DNS)',
    purposeAr: 'تأمين استعلامات DNS ضد هجمات أنفاق تهريب البيانات (DNS Tunneling) ونطاقات الـ DGA والتسميم (Poisoning).',
    howItWorksAr: 'حساب إنتروبيا أسماء النطاقات (Shannon Entropy) وفحص الأنماط العشوائية مع تقنية الـ DNS Sinkholing اللحظية.',
    technologies: ['Shannon Entropy Math', 'DGA Pattern Detector', 'DNS Sinkhole Router', 'Cache Poisoning Shield'],
    testEvidenceAr: 'كشف وحظر نفق تهريب بيانات DNS بحجم 2.4MB وتحويل حركة المرور لعناوين Sinkhole الآمنة.',
  },
  'dlp': {
    layerAr: 'حماية البيانات والملفات',
    layerEn: 'Data & File Protection',
    protectionType: 'منع تسريب البيانات الحساسة (DLP)',
    purposeAr: 'رصد ومنع تسريب المستندات السرية، بطاقات الائتمان، أرقام الهويات، ومفاتيح التشفير عبر قنوات الشبكة.',
    howItWorksAr: 'خوارزمية MSEM Lite لمطابقة الإنتروبيا الدلالية مع فحص Regex لأنماط البطاقات وأرقام الحسابات البنكية.',
    technologies: ['MSEM Lite Semantic Entropy', 'Regex Pattern Matcher', 'Credit Card Luhn Validator', 'Document Hasher'],
    testEvidenceAr: 'حظر محاولة تسريب ملف مضغوط يحوي 500 رقم بطاقة ائتمان وتوليد إشعار فوري لمدير الأمن.',
  },
  'malware': {
    layerAr: 'حماية البيانات والملفات',
    layerEn: 'Data & File Protection',
    protectionType: 'مكافحة البرمجيات الخبيثة (NM-MDE FlowSpec)',
    purposeAr: 'كشف وحظر البرمجيات الخبيثة والفيروسات وقنوات التحكم والسيطرة (C2) في حركة الشبكة الحية.',
    howItWorksAr: 'تحليل حركة البيانات دون الحاجة لفك التشفير (Zero-Decryption ETA) وفحص الترويسات الثنائية (PE Headers).',
    technologies: ['FlowSpec Traffic Classifier', 'PE Header Binary Parser', 'C2 Beaconing Detector', 'YARA Matcher'],
    testEvidenceAr: 'كشف وتحديد 3 عينات برمجيات فدية (Ransomware) وبرمجيات تجسس أثناء محاولة الاتصال بخادم C2.',
  },
  'email': {
    layerAr: 'حماية البيانات والملفات',
    layerEn: 'Data & File Protection',
    protectionType: 'أمان بوابة البريد الإلكتروني',
    purposeAr: 'حماية البريد الإلكتروني المؤسسي من رسائل الاحتيال المالي الموجهة (BEC) وهجمات الهندسة الاجتماعية المعقدة.',
    howItWorksAr: 'نموذج لغوي BERT لتحليل مستوى الإلحاح المالي والطلب غير المعتاد، مع التحقق من سجلات SPF/DKIM/DMARC.',
    technologies: ['BERT / RoBERTa NLP', 'Psycho-Linguistic Urgency Scorer', 'SPF/DKIM/DMARC Validator', 'Attachment Sandbox'],
    testEvidenceAr: 'رصد وعزل رسالة اختراق بريد تنفيذي (BEC) تنتحل شخصية المدير المالي بدقة تصنيف 98.2%.',
  },
  'ai': {
    layerAr: 'الذكاء الاصطناعي والتحليل',
    layerEn: 'AI & Behavioral Analytics',
    protectionType: 'الذكاء الاصطناعي التنبؤي (AEGIS v3)',
    purposeAr: 'تجميع التهديدات المعقدة ونمذجة مسارات الهجوم المستقبلية باستخدام نظرية الألعاب لتحديد الاستجابة المثلى.',
    howItWorksAr: 'خوارزميات التجميع الزمني (Time-Series Clustering) وبناء مصفوفات المكاسب والخسائر الرياضية لتحجيم التصعيد.',
    technologies: ['Game-Theoretic Adversarial Matrix', 'Time-Series Clustering', 'PyTorch / ONNX', 'Dynamic Policy Engine'],
    testEvidenceAr: 'التنبؤ بـ 3 خطوات لهجوم متعدد المراحل قبل وصوله لقاعدة البيانات وعزله في الخطوة الأولى.',
  },
  'ueba': {
    layerAr: 'الذكاء الاصطناعي والتحليل',
    layerEn: 'AI & Behavioral Analytics',
    protectionType: 'تحليل سلوك المستخدمين والكيانات (UEBA)',
    purposeAr: 'بناء الملف السلوكي الأساسي لكل مستخدم وجهاز ورصد الانحرافات التشغيلية لتقليل التنبيهات الزائفة.',
    howItWorksAr: 'استخراج 21 متغيراً إحصائياً وتدريب نموذج Isolation Forest و XGBoost لحساب درجات المخاطر التكيّفية.',
    technologies: ['Isolation Forest', 'XGBoost', '21 Behavioral Feature Pipeline', 'Adaptive Thresholding'],
    testEvidenceAr: 'كشف محاولة وصول مستخدم لحساب ذو صلاحيات عالية في أوقات غير معتادة وتخفيض صلاحياته تلقائياً.',
  },
};

const CATEGORIES = [
  { id: 'all', labelAr: 'جميع الوحدات (17)', labelEn: 'All Modules (17)' },
  { id: 'network', labelAr: 'حماية الشبكة والنواة', labelEn: 'Network & Kernel' },
  { id: 'inspection', labelAr: 'الفحص وكشف التسلل', labelEn: 'Deep Inspection' },
  { id: 'web', labelAr: 'أمان الويب والخدمات الوسيطة', labelEn: 'Web & Proxy' },
  { id: 'data', labelAr: 'حماية البيانات والملفات', labelEn: 'Data & Malware' },
  { id: 'ai', labelAr: 'الذكاء الاصطناعي والتحليل', labelEn: 'AI & Analytics' },
];

export const ModulesCatalog: React.FC<ModulesCatalogProps> = ({ docs }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeModuleSlug, setActiveModuleSlug] = useState<string | null>(null);

  // Filter modules
  const moduleDocs = docs.filter((d) => d.moduleId);

  const filteredDocs = moduleDocs.filter((doc) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'network') return ['system', 'acceleration', 'firewall', 'vpn', 'qos'].includes(doc.moduleId || '');
    if (selectedCategory === 'inspection') return ['ids-ips', 'waf', 'ssl', 'http'].includes(doc.moduleId || '');
    if (selectedCategory === 'web') return ['proxy', 'webfilter', 'dns'].includes(doc.moduleId || '');
    if (selectedCategory === 'data') return ['dlp', 'malware', 'email'].includes(doc.moduleId || '');
    if (selectedCategory === 'ai') return ['ai', 'ueba'].includes(doc.moduleId || '');
    return true;
  });

  const activeDoc = moduleDocs.find((d) => d.slug === activeModuleSlug);
  const activeExt = activeDoc?.moduleId ? MODULE_EXTENDED_INFO[activeDoc.moduleId] : null;
  const ActiveIcon = activeDoc?.moduleId ? MODULE_ICONS[activeDoc.moduleId] || Shield : Shield;

  return (
    <div className="space-y-8">
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all touch-target ${
              selectedCategory === cat.id
                ? 'bg-cyan-500 text-black font-bold shadow-sm'
                : 'bg-dark-surface border border-dark-border text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40'
            }`}
          >
            {cat.labelAr}
          </button>
        ))}
      </div>

      {/* Grid of 17 Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDocs.map((doc) => {
          const modId = doc.moduleId || '';
          const Icon = MODULE_ICONS[modId] || Shield;
          const ext = MODULE_EXTENDED_INFO[modId];

          return (
            <div
              key={doc.slug}
              className="glass-panel p-5 sm:p-6 flex flex-col justify-between space-y-4 bg-dark-surface/90 border-dark-border hover:border-cyan-500/50 hover:bg-[#0E1B33] transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-dark-bg border border-cyan-500/30 p-2 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="cyber-tag">{ext?.protectionType || doc.categoryAr}</span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {doc.titleAr}
                  </h3>
                  <span className="text-[11px] font-mono text-cyan-400/80 block mt-0.5">
                    {doc.titleEn}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {ext?.purposeAr || doc.summaryAr}
                </p>
              </div>

              <div className="pt-3 border-t border-dark-border/80 flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveModuleSlug(doc.slug)}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 active:scale-95 text-xs font-bold transition-all min-h-[36px] flex items-center gap-1"
                >
                  <span>عرض التفاصيل</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <Link
                  href={`/docs/${doc.slug}`}
                  className="text-xs text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1 font-mono"
                >
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  <span>التوثيق</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Module Detail Modal Drawer */}
      {activeDoc && activeExt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-2xl bg-[#091424] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-dark-border bg-dark-surface flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-dark-bg border border-cyan-500/40 p-2 flex items-center justify-center shrink-0">
                  <ActiveIcon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <span className="cyber-tag mb-1">{activeExt.layerAr}</span>
                  <h3 className="font-bold text-base sm:text-lg text-slate-100">{activeDoc.titleAr}</h3>
                  <span className="text-xs font-mono text-cyan-400 block">{activeDoc.titleEn}</span>
                </div>
              </div>
              <button
                onClick={() => setActiveModuleSlug(null)}
                className="p-2 rounded-lg bg-dark-bg border border-dark-border text-slate-400 hover:text-white hover:border-slate-400 active:scale-95 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {/* Purpose */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-100 flex items-center gap-1.5 text-xs font-mono text-cyan-400">
                  <Activity className="w-4 h-4" />
                  <span>الهدف والمسؤولية الهندسية (Purpose):</span>
                </h4>
                <p className="p-3 rounded-lg bg-dark-bg border border-dark-border text-slate-300">
                  {activeExt.purposeAr}
                </p>
              </div>

              {/* How It Works */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-100 flex items-center gap-1.5 text-xs font-mono text-blue-400">
                  <Cpu className="w-4 h-4" />
                  <span>آلية العمل البرمجية (How It Works):</span>
                </h4>
                <p className="p-3 rounded-lg bg-dark-bg border border-dark-border text-slate-300">
                  {activeExt.howItWorksAr}
                </p>
              </div>

              {/* Technologies */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-100 flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                  <Terminal className="w-4 h-4" />
                  <span>التقنيات والمكتبات المستخدمة (Technologies):</span>
                </h4>
                <div className="flex flex-wrap gap-1.5 p-3 rounded-lg bg-dark-bg border border-dark-border">
                  {activeExt.technologies.map((tech, tIdx) => (
                    <span key={tIdx} className="px-2 py-1 rounded bg-dark-surface border border-dark-border text-[11px] font-mono text-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Testing & Evidence */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-100 flex items-center gap-1.5 text-xs font-mono text-rose-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>أدلة الاختبار والتحقق (Evidence & Testing):</span>
                </h4>
                <p className="p-3 rounded-lg bg-dark-bg border border-dark-border text-slate-300 font-mono text-xs">
                  {activeExt.testEvidenceAr}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-dark-border bg-dark-surface flex items-center justify-between gap-3">
              <span className="text-[11px] font-mono text-slate-400">
                حجم التوثيق: {activeDoc.wordCount} كلمة
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveModuleSlug(null)}
                  className="px-4 py-2 rounded-lg bg-dark-bg border border-dark-border text-slate-300 hover:text-white text-xs font-medium"
                >
                  إغلاق
                </button>

                <Link
                  href={`/docs/${activeDoc.slug}`}
                  onClick={() => setActiveModuleSlug(null)}
                  className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-bold hover:bg-cyan-400 active:scale-95 text-xs transition-all flex items-center gap-1.5"
                >
                  <span>قراءة التوثيق الكامل</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
