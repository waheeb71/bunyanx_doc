const puppeteer = require('puppeteer');

function findSystemBrowser() {
  const commonPaths = [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  ];

  for (const p of commonPaths) {
    if (require('fs').existsSync(p)) return p;
  }
  return undefined;
}

async function validateMermaidCode(code) {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: findSystemBrowser(),
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <script src="https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js"></script>
      <script>mermaid.initialize({ startOnLoad: false });</script>
    </head>
    <body>
    </body>
    </html>
  `;
  await page.setContent(html);

  const result = await page.evaluate(async (diagramCode) => {
    try {
      const valid = await mermaid.parse(diagramCode);
      return { valid: true };
    } catch (err) {
      return { valid: false, error: err.message || err.toString() };
    }
  }, code);

  await browser.close();
  return result;
}

// Test our candidate diagrams
async function runTests() {
  console.log("Testing candidate diagrams...");

  const diagComponent = `flowchart TD
    subgraph Tier1 ["🎨 1. طبقة واجهة المستخدم والتحكم (Web UI Tier)"]
        direction LR
        ReactUI["<b>React 18 SPA:</b> لوحة التحكم التفاعلية"]
        ThemeEngine["<b>Theme Engine:</b> إدارة المظهر والتنبيهات"]
    end

    subgraph Tier2 ["🔌 2. خادم واجهات التطبيقات (API & IPC Tier)"]
        direction LR
        AuthCtrl["<b>Auth & RBAC:</b> إدارة الهويات والمصادقة"]
        ConfigCtrl["<b>Policy Router:</b> إدارة السياسات"]
        MetricsCtrl["<b>Telemetry:</b> مقاييس الأداء"]
        WSCtrl["<b>WebSockets:</b> بث السجلات الحي"]
    end

    subgraph Tier3 ["⚙️ 3. نواة المعالجة وحاوية الخدمات (Core Engine Tier)"]
        direction LR
        AppController["<b>منسق التطبيق:</b> Application Engine"]
        ContainerComp["<b>حاوية الخدمات:</b> ServiceContainer DI"]
        InspectPipeComp["<b>خط الفحص:</b> Inspection Pipeline"]
        DBComp["<b>إدارة الحالة:</b> DB & State Manager"]
    end

    subgraph Tier4_Net ["🛡️ 4.أ. وحدات الشبكة والتطبيقات"]
        direction LR
        FWComp["<b>Firewall:</b> الجدار الناري L3/L4"]
        WAFComp["<b>WAAP/WAF:</b> تحليل AST"]
        SSLComp["<b>SSL/TLS:</b> ذاكرة MemoryBIO"]
        VPNComp["<b>WireGuard:</b> بوابة VPN"]
    end

    subgraph Tier4_AI ["🧠 4.ب. وحدات الذكاء والمحتوى"]
        direction LR
        IPSComp["<b>PHANTOM:</b> كشف التسلل SBE"]
        AIComp["<b>AEGIS AI:</b> محلل ناش"]
        DLPComp["<b>DLP:</b> منع التسريب"]
    end

    subgraph Tier5 ["⚡ 5. طبقة النواة والعتاد (Kernel & eBPF Tier)"]
        direction LR
        BPFTables["<b>جداول النواة الذرية:</b> eBPF Hash Maps"]
        XDPProg["<b>برامج التصفية:</b> XDP Packet Bouncer"]
    end

    Tier1 --> Tier2
    Tier2 --> Tier3
    Tier3 --> Tier4_Net
    Tier3 --> Tier4_AI
    Tier4_Net --> Tier5
    Tier4_AI --> Tier5
`;

  const res1 = await validateMermaidCode(diagComponent);
  console.log("Diag 1 (Component):", res1);

  const diagDeployment = `flowchart TD
    subgraph Client_Tier ["🖥️ 1. محطة إدارة ومراقبة الأمان (SOC Client Browser)"]
        direction LR
        AdminBrowser["<b>متصفح الويب (Chrome / Firefox):</b> لوحة التحكم التفاعلية React Dashboard"]
    end

    subgraph Runtime_Tier ["🌐 2. بيئة التطبيق والخوادم (Application Runtime)"]
        direction LR
        FastAPISrv["<b>خادم FastAPI / Uvicorn:</b> واجهات RESTful & WebSockets"]
        CoreService["<b>محرك التطبيق والنواة:</b> bunyanxApplication"]
        AIWorker["<b>عامل الاستدلال الذكي:</b> AI Worker"]
        NginxHost["<b>خادم الواجهة:</b> Vite / Nginx"]
    end

    subgraph Storage_Tier ["💾 3. وحدات التخزين والذاكرة (Storage & Memory)"]
        direction LR
        SQLiteDB[("<b>قاعدة البيانات:</b> SQLite / PostgreSQL")]
        CertPool["<b>ذاكرة الشهادات:</b> MemoryBIO"]
        ModelStore["<b>نماذج الذكاء الاصطناعي:</b> ml/models/"]
    end

    subgraph Kernel_Tier ["⚡ 4. فضاء النواة والعتاد (Kernel & Hardware Layer)"]
        direction LR
        eBPF_Driver["<b>سائق كارت الشبكة:</b> برامج eBPF/XDP"]
        eBPF_Maps["<b>جداول النواة الذرية:</b> BPF Maps"]
        NIC["<b>كروت الشبكة الفيزيائية:</b> Wire-Speed"]
    end

    Client_Tier --> Runtime_Tier
    Runtime_Tier --> Storage_Tier
    Runtime_Tier --> Kernel_Tier
`;

  const res2 = await validateMermaidCode(diagDeployment);
  console.log("Diag 2 (Deployment):", res2);

  const diagTech = `flowchart TD
    subgraph S1 ["⚙️ 1. تقنيات الواجهة الخلفية والنواة (Backend & Core)"]
        direction LR
        Py["<b>Python 3.11:</b> لغة المنظومة"]
        FastAPI["<b>FastAPI:</b> واجهات RESTful"]
        Uvicorn["<b>Uvicorn & AsyncIO:</b> تزامن غير متزامن"]
        SQLAlchemy["<b>SQLAlchemy:</b> إدارة قواعد البيانات"]
        Crypto["<b>pyOpenSSL:</b> فحص التشفير MemoryBIO"]
    end

    subgraph S2 ["🎨 2. تقنيات واجهة المستخدم والتحكم (Frontend & Dashboard)"]
        direction LR
        React["<b>React 18 SPA:</b> واجهة تفاعلية"]
        TS["<b>TypeScript:</b> تدقيق الأنواع"]
        Vite["<b>Vite:</b> بناء فائق السرعة"]
        Tailwind["<b>Tailwind CSS:</b> مظهر Dark Mode"]
        Recharts["<b>Recharts:</b> رسوم بيانية حية"]
    end

    subgraph S3 ["🧠 3. تقنيات الذكاء الاصطناعي وتسريع الشبكات (AI & Kernel)"]
        direction LR
        Torch["<b>PyTorch:</b> تدريب النماذج"]
        Sklearn["<b>Scikit-learn:</b> كشف الانحراف"]
        XGB["<b>XGBoost:</b> تصنيف الأنماط"]
        eBPF["<b>eBPF / XDP:</b> تصفية النواة"]
        WireGuard["<b>WireGuard:</b> أنفاق مشفرة"]
    end

    S1 --> S2
    S2 --> S3
`;

  const res3 = await validateMermaidCode(diagTech);
  console.log("Diag 3 (Tech):", res3);
}

runTests();
