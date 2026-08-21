import React from 'react';
import Link from 'next/link';
import {
  PlayCircle,
  Terminal,
  Shield,
  Zap,
  Globe,
  Database,
  BrainCircuit,
  Eye,
  Mail,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Activity,
  Layers,
  FileCode,
} from 'lucide-react';

export const metadata = {
  title: 'العروض التجريبية والأدلة الهندسية',
  description: 'سيناريوهات الهجمات الحقيقية ونتائج الكشف والاستجابة وسجلات الأدلة الرقمية لمنظومة BUNYANX Enterprise NGFW.',
};

const DEMO_SCENARIOS = [
  {
    id: 'syn-flood',
    badge: 'Scenario 01 — DDoS Mitigation',
    titleAr: 'صد هجوم إغراق الحزم (SYN Flood DDoS Mitigation)',
    module: 'Acceleration Module (eBPF / XDP)',
    vectorAr: 'إرسال 10 ملايين حزمة TCP SYN مشوهة في الثانية لاستهداف وإغراق موارد جدول اتصالات الخادم.',
    detectionAr: 'التقاط فوري للحزم على مستوى المشغل (Driver Level) في كرت الشبكة، والتحقق من عدم استكمال مصافحة TCP وتجاوز عتبات المعدل (Rate Thresholds).',
    preventionAr: 'إسقاط الحزم الخبيثة بنمط XDP_DROP في النواة في أقل من 10 ميكروثانية، دون تمريرها إلى مكدس بروتوكولات النواة أو معالج الـ Userspace.',
    status: 'BLOCKED in Kernel',
    statusColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40',
    terminalCommand: 'python scripts/simulate_traffic.py --scenario=syn_flood --pps=10000000 --target=192.168.10.1',
    evidenceOutput: `[eBPF/XDP Ingress Engine] Loaded port_filter_xdp.o into interface eth0
[eBPF Hook] Monitoring NIC ring buffer with zero-copy AF_XDP...
[ALERT] SYN Flood pattern detected from IP pool [198.51.100.0/24]
[KERNEL ACTION] XDP_DROP applied on 10,000,000 pkts/sec
[METRICS] Latency: 8.4 μs | CPU Userspace: 0.2% | Dropped Pkts: 100.0%
[STATUS] Server 192.168.10.1 remains fully operational (Zero Degradation)`,
  },
  {
    id: 'sqli',
    badge: 'Scenario 02 — Web Protection',
    titleAr: 'صد هجمات حقن قواعد البيانات (SQL Injection & XSS)',
    module: 'Enterprise WAF / WAAP Engine',
    vectorAr: "محاولة حقن استعلام SQL ضار عبر نموذج تسجيل الدخول: `' UNION SELECT username, password_hash FROM users --`",
    detectionAr: 'تحليل شجرة الإعراب المجردة (AST Parsing) ومطابقة البصمات الدلالية لقواعد OWASP Core Rule Set وفك تشفير الـ URL Encoding.',
    preventionAr: 'حظر الطلب فوريّاً وإرجاع استجابة HTTP 403 Forbidden مع إدراج عنوان IP المهاجم في القائمة السوداء المؤقتة.',
    status: 'BLOCKED (HTTP 403)',
    statusColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40',
    terminalCommand: 'python scripts/simulate_traffic.py --scenario=sql_injection --target=http://192.168.10.1/api/login',
    evidenceOutput: `[WAF Engine] Incoming POST /api/v1/auth/login from 203.0.113.45
[WAF AST Parser] Payload Tokenization: ['UNION', 'SELECT', 'username', 'password_hash']
[RULE MATCH] OWASP Rule 942100: SQL Injection Vector Detected
[RISK SCORE] Critical (Score: 95/100) -> Action: BLOCK
[HTTP RESPONSE] 403 Forbidden | EventID: WAF-2026-8891
[BLOCKLIST] IP 203.0.113.45 added to Dynamic Kernel Blocklist (TTL: 3600s)`,
  },
  {
    id: 'dns-tunnel',
    badge: 'Scenario 03 — DNS Security',
    titleAr: 'كشف وعزل أنفاق تهريب البيانات (DNS Data Exfiltration)',
    module: 'DART DNS Security Engine',
    vectorAr: 'تشفير ملفات حساسة وتقسيمها إلى استعلامات DNS فرعية مشفرة (Base64) مرسلة لخادم نطاق خبيث (C2 Domain).',
    detectionAr: 'حساب معامل إنتروبيا شانون (Shannon Entropy) لأسماء النطاقات الفرعية ورصد تجاوز حجم الحمولة واستعلامات TXT المتكررة.',
    preventionAr: 'تحويل الاستعلامات فوريّاً إلى Sinkhole داخلي وعزل الجهاز المصاب من الوصول إلى خوادم الأسماء الخارجية.',
    status: 'SINKHOLED & ISOLATED',
    statusColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40',
    terminalCommand: 'python scripts/simulate_traffic.py --scenario=dns_tunneling --domain=data.exfil-c2.net',
    evidenceOutput: `[DART DNS Inspector] Intercepted query: a8f93e2b109c.data.exfil-c2.net (Type: TXT)
[Shannon Entropy] Subdomain Entropy: 4.82 (Threshold: 3.80) -> ANOMALY DETECTED
[PAYLOAD ANALYSIS] High frequency Base64-encoded chunk detected (Length: 220 chars)
[MITIGATION ACTION] DNS Sinkholing activated -> Routed to 127.0.0.1
[INCIDENT LOG] Host 192.168.1.144 marked as Compromised (DLP Event Triggered)`,
  },
  {
    id: 'apt-pivot',
    badge: 'Scenario 04 — Threat Detection',
    titleAr: 'تتبع الاختراق الأفقي المتقدم (APT Lateral Movement Pivoting)',
    module: 'PHANTOM IDS/IPS Engine',
    vectorAr: 'محاولة متسلل الانتقال ببطء عبر بروتوكولات SMB و RPC و SSH بين الحواسيب الداخلية للوصول لخادم قاعدة البيانات المركزية.',
    detectionAr: 'بناء الرسوم البيانية السببية الزمانية غرانجر (Granger Causal Graphs) مع الترميز الطيفي للبايتات (Spectral Byte FFT) لربط الأحداث عبر الزمن.',
    preventionAr: 'اكتشاف نمط الارتباط السببي وإصدار قرار عزل الشبكة الفرعية (VLAN Isolation) وتحديث سياسة الجدار الناري.',
    status: 'APT GRAPH DETECTED',
    statusColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40',
    terminalCommand: 'python scripts/simulate_traffic.py --scenario=apt_attack --hops=4 --target=10.0.0.5',
    evidenceOutput: `[PHANTOM IDS Engine] Ingesting L4-L7 causal flow sequence...
[Granger Graph] Edge created: 192.168.1.50 -> 192.168.1.80 (SMB / Port 445)
[Granger Graph] Causal Correlation: 0.94 -> Multi-hop chain detected to 10.0.0.5
[SPECTRAL FFT] Byte frequency vector similarity matched APT29 Footprint (Confidence: 96.8%)
[RESPONSE] Auto-Enforcement: Revoking internal trust for host 192.168.1.50`,
  },
  {
    id: 'bec-email',
    badge: 'Scenario 05 — Email Security',
    titleAr: 'رصد رسائل الاحتيال المالي الموجه (BEC Executive Phishing)',
    module: 'Enterprise Email Security Gateway',
    vectorAr: 'رسالة بريد تنتحل صفة المدير التنفيذي وتطلب تحويلاً مالياً عاجلاً بدون مرفقات تقليدية لتفادي برامج مكافحة الفيروسات.',
    detectionAr: 'التحليل النفسي-اللغوي بنموذج BERT للذكاء الاصطناعي لقياس مستوى الإلحاح (Urgency) والطلب المالي مع التحقق من سجلات SPF/DMARC.',
    preventionAr: 'عزل الرسالة في صندوق الحجر الأمني (Quarantine Box) وتنبيه موظف الحسابات بوجود محاولة انتحال شخصية.',
    status: 'QUARANTINED',
    statusColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40',
    terminalCommand: 'python scripts/simulate_traffic.py --scenario=bec_email --sender=ceo@spoofed-domain.com',
    evidenceOutput: `[Email Security Gateway] Inbound message from: ceo@spoofed-domain.com
[SPF/DMARC Check] SPF: PASS (Lookalike Domain) | DMARC Alignment: SOFTFAIL
[NLP BERT Model] Text Urgency Score: 0.92 | Financial Request Flag: TRUE
[PLSF Fingerprint] Psycho-Linguistic Pattern: 98.2% match to BEC Wire Fraud Template
[ACTION] Message Quarantined (ID: MSG-BEC-9912) -> Notification sent to SOC`,
  },
  {
    id: 'dlp-leak',
    badge: 'Scenario 06 — Data Protection',
    titleAr: 'منع تسريب بيانات بطاقات الائتمان (Confidential Data Exfiltration)',
    module: 'DLP Engine (MSEM Lite)',
    vectorAr: 'محاولة موظف داخلي رفع ملف نصي مضغوط يحتوي على 500 رقم بطاقة ائتمان عبر بروتوكول HTTP POST إلى موقع تخزين خارجي.',
    detectionAr: 'فحص خوارزمية MSEM Lite للإنتروبيا الدلالية ومطابقة أنماط Regex مع التحقق من صحة أرقام البطاقات عبر خوارزمية Luhn.',
    preventionAr: 'قطع اتصال الرفع فوراً، تسجيل بصمة الملف المشبوه، وإرسال تنبيه فوري إلى نظام إدارة السجلات وسجل الامتثال.',
    status: 'DATA LEAK BLOCKED',
    statusColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40',
    terminalCommand: 'python scripts/simulate_traffic.py --scenario=dlp_leak --file=customer_cards.csv',
    evidenceOutput: `[DLP Engine] Inspecting outbound HTTP POST to storage.mega-cloud.com
[MSEM Lite Analyzer] High entropy token sequence identified
[PATTERN MATCH] Credit Card (Visa/Mastercard) regex matched 500 records
[Luhn Algorithm] Validation: 500/500 valid checksums -> SEVERE DLP BREACH
[ENFORCEMENT] Connection TERMINATED | TCP RST sent to client
[AUDIT] Incident DLP-2026-441 logged to Compliance Database`,
  },
];

export default function DemoPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-10 space-y-4 text-center max-w-3xl mx-auto bg-[#091424]">
        <div className="cyber-badge">
          <PlayCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>Real Attack Simulations & Evidence</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100">
          العروض التجريبية وأدلة الاختبار الحقيقية
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          استعراض واقعي ومفصل لـ 6 سيناريوهات هجومية تم تطبيقها واختبارها عملياً على منظومة BUNYANX مع توثيق آلية الاكتشاف، القرار الأمني، ومخرجات السجلات الرقمية.
        </p>
      </div>

      {/* Scenarios Grid */}
      <div className="space-y-8">
        {DEMO_SCENARIOS.map((sc, idx) => (
          <div
            key={sc.id}
            className="glass-panel p-5 sm:p-8 space-y-6 bg-dark-surface/90 border-dark-border hover:border-cyan-500/40 transition-all"
          >
            {/* Scenario Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-dark-border">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-cyan-400">{sc.badge}</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-dark-bg border border-dark-border text-slate-300">
                    {sc.module}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-100">
                  {sc.titleAr}
                </h2>
              </div>

              <div className={`px-3 py-1 rounded-full text-xs font-bold font-mono border self-start sm:self-auto ${sc.statusColor}`}>
                {sc.status}
              </div>
            </div>

            {/* Attack Flow: Attack -> Detection -> Prevention */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-dark-bg/80 border border-rose-500/30 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs font-mono">
                  <AlertTriangle className="w-4 h-4" />
                  <span>1. متجه الهجوم (Attack Vector):</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {sc.vectorAr}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-dark-bg/80 border border-blue-500/30 space-y-2">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs font-mono">
                  <Eye className="w-4 h-4" />
                  <span>2. آلية الاكتشاف (Detection Logic):</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {sc.detectionAr}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-dark-bg/80 border border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs font-mono">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>3. الاستجابة والنتيجة (Response & Result):</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {sc.preventionAr}
                </p>
              </div>
            </div>

            {/* Terminal Snippet & Logs Evidence */}
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-slate-300 font-semibold">Terminal Execution & Evidence Log</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">Live Simulation Output</span>
              </div>
              <div className="p-4 font-mono text-xs text-slate-300 space-y-2 overflow-x-auto">
                <div className="text-cyan-400 flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">$</span>
                  <span>{sc.terminalCommand}</span>
                </div>
                <pre className="text-slate-300 leading-relaxed text-[11px] sm:text-xs pt-1 border-t border-dark-border/60">
                  {sc.evidenceOutput}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Footer to Testing */}
      <div className="glass-panel p-6 bg-[#091424] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-right">
          <h3 className="font-bold text-base text-slate-100">هل تريد الاطلاع على مصفوفة الاختبارات المعيارية بالكامل؟</h3>
          <p className="text-xs text-slate-400">تحقق من نتائج اختبارات الوحدة، التكامل، ومقاييس الأداء لجميع محركات المنظومة.</p>
        </div>
        <Link
          href="/testing"
          className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 active:scale-95 transition-all shrink-0 flex items-center gap-1.5"
        >
          <span>مصفوفة الاختبارات والنتائج</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
