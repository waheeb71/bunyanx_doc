import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface DocMetadata {
  slug: string;
  filename: string;
  titleAr: string;
  titleEn: string;
  categoryAr: string;
  categoryEn: string;
  moduleId?: string;
  icon: string;
  order: number;
  wordCount: number;
  readingTime: number;
  headings: TocItem[];
  summaryAr: string;
  summaryEn: string;
  keywords: string[];
  lastUpdated: string;
}

export interface DocItem extends DocMetadata {
  content: string;
  htmlContent: string;
  rawMarkdown: string;
}

const SLUG_MAP: Record<string, {
  slug: string;
  titleAr: string;
  titleEn: string;
  categoryAr: string;
  categoryEn: string;
  moduleId?: string;
  icon: string;
  order: number;
}> = {
  'final_master_documentation.md': {
    slug: 'master-thesis',
    titleAr: 'رسالة مشروع التخرج الماستر',
    titleEn: 'BunyanX Master Graduation Thesis',
    categoryAr: 'التقرير الشامل',
    categoryEn: 'Master Document',
    icon: 'GraduationCap',
    order: 1,
  },
  'system_academic_documentation.md': {
    slug: 'system-engine',
    titleAr: 'وحدة النظام المركزي والأدوات الأساسية',
    titleEn: 'System Engine & Core Framework',
    categoryAr: 'معمارية النظام',
    categoryEn: 'Core Architecture',
    moduleId: 'system',
    icon: 'Cpu',
    order: 2,
  },
  'acceleration_academic_documentation.md': {
    slug: 'acceleration',
    titleAr: 'وحدة التسريع بالـ eBPF / XDP',
    titleEn: 'Kernel Acceleration (eBPF/XDP)',
    categoryAr: 'معمارية النظام',
    categoryEn: 'Core Architecture',
    moduleId: 'acceleration',
    icon: 'Zap',
    order: 3,
  },
  'firewall_academic_documentation.md': {
    slug: 'firewall',
    titleAr: 'وحدة الجدار الناري الذكي Stateful Firewall',
    titleEn: 'Stateful Packet Firewall',
    categoryAr: 'حماية الشبكة',
    categoryEn: 'Network Security',
    moduleId: 'firewall',
    icon: 'Shield',
    order: 4,
  },
  'vpn_module_academic_documentation.md': {
    slug: 'vpn',
    titleAr: 'وحدة الشبكات الافتراضية الخاصة VPN',
    titleEn: 'VPN Gateway (IPsec/WireGuard/OpenVPN)',
    categoryAr: 'حماية الشبكة',
    categoryEn: 'Network Security',
    moduleId: 'vpn',
    icon: 'Lock',
    order: 5,
  },
  'QoSModule_Documentation.md': {
    slug: 'qos',
    titleAr: 'وحدة إدارة جودة الخدمة QoS',
    titleEn: 'Quality of Service (QoS Engine)',
    categoryAr: 'حماية الشبكة',
    categoryEn: 'Network Security',
    moduleId: 'qos',
    icon: 'Activity',
    order: 6,
  },
  'ids_ips_system_documentation.md': {
    slug: 'ids-ips',
    titleAr: 'وحدة PHANTOM — كشف ومنع التسلل IDS/IPS',
    titleEn: 'PHANTOM IDS/IPS System',
    categoryAr: 'الكشف والفحص',
    categoryEn: 'Detection & Inspection',
    moduleId: 'ids-ips',
    icon: 'Eye',
    order: 7,
  },
  'waf_enterprise_documentation.md': {
    slug: 'waf',
    titleAr: 'وحدة جدار حماية تطبيقات الويب WAF/WAAP',
    titleEn: 'Enterprise Web Application Firewall (WAF)',
    categoryAr: 'الكشف والفحص',
    categoryEn: 'Detection & Inspection',
    moduleId: 'waf',
    icon: 'Globe',
    order: 8,
  },
  'ssl_inspection_academic_documentation.md': {
    slug: 'ssl-inspection',
    titleAr: 'وحدة فحص حركة المرور المشفرة SSL/TLS',
    titleEn: 'SSL/TLS Deep Packet Inspection',
    categoryAr: 'الكشف والفحص',
    categoryEn: 'Detection & Inspection',
    moduleId: 'ssl',
    icon: 'Key',
    order: 9,
  },
  'http_inspection_academic_doc.md': {
    slug: 'http-inspection',
    titleAr: 'وحدة فحص بروتوكول الويب HTTP/HTTP2',
    titleEn: 'HTTP/HTTP2 Protocol Inspection',
    categoryAr: 'الكشف والفحص',
    categoryEn: 'Detection & Inspection',
    moduleId: 'http',
    icon: 'FileCode',
    order: 10,
  },
  'proxy_module_documentation.md': {
    slug: 'proxy',
    titleAr: 'وحدة خادم الوكيل Proxy Engine',
    titleEn: 'Proxy Engine (Forward/Reverse)',
    categoryAr: 'التصفية والوكيل',
    categoryEn: 'Web & Proxy',
    moduleId: 'proxy',
    icon: 'Server',
    order: 11,
  },
  'web_filter_system_documentation.md': {
    slug: 'web-filter',
    titleAr: 'وحدة تصفية الويب HoloFilter',
    titleEn: 'HoloFilter Web Filtering System',
    categoryAr: 'التصفية والوكيل',
    categoryEn: 'Web & Proxy',
    moduleId: 'webfilter',
    icon: 'Filter',
    order: 12,
  },
  'dns_security_academic_documentation.md': {
    slug: 'dns-security',
    titleAr: 'وحدة أمان أسماء النطاقات DART DNS Security',
    titleEn: 'DART DNS Security Engine',
    categoryAr: 'التصفية والوكيل',
    categoryEn: 'Web & Proxy',
    moduleId: 'dns',
    icon: 'Network',
    order: 13,
  },
  'dlp_module_documentation.md': {
    slug: 'dlp',
    titleAr: 'وحدة منع تسريب البيانات DLP Engine',
    titleEn: 'Data Loss Prevention (DLP)',
    categoryAr: 'حماية البيانات والملفات',
    categoryEn: 'Data & File Protection',
    moduleId: 'dlp',
    icon: 'Database',
    order: 14,
  },
  'malware_av_documentation.md': {
    slug: 'anti-malware',
    titleAr: 'وحدة مكافحة البرمجيات الخبيثة NM-MDE',
    titleEn: 'NM-MDE FlowSpec Anti-Malware',
    categoryAr: 'حماية البيانات والملفات',
    categoryEn: 'Data & File Protection',
    moduleId: 'malware',
    icon: 'Bug',
    order: 15,
  },
  'email_security_documentation.md': {
    slug: 'email-security',
    titleAr: 'وحدة أمان البريد الإلكتروني Email Security',
    titleEn: 'Enterprise Email Security Gateway',
    categoryAr: 'حماية البيانات والملفات',
    categoryEn: 'Data & File Protection',
    moduleId: 'email',
    icon: 'Mail',
    order: 16,
  },
  'predictive_ai_documentation.md': {
    slug: 'predictive-ai',
    titleAr: 'وحدة الذكاء الاصطناعي التنبؤي ORACLE v3',
    titleEn: 'ORACLE v3 Predictive AI Security',
    categoryAr: 'الذكاء الاصطناعي والتحليل',
    categoryEn: 'AI & Behavioral Analytics',
    moduleId: 'ai',
    icon: 'BrainCircuit',
    order: 17,
  },
  'uba_graduation_documentation.md': {
    slug: 'ueba',
    titleAr: 'وحدة تحليل سلوك المستخدم والكيانات UEBA',
    titleEn: 'User & Entity Behavior Analytics (UEBA)',
    categoryAr: 'الذكاء الاصطناعي والتحليل',
    categoryEn: 'AI & Behavioral Analytics',
    moduleId: 'ueba',
    icon: 'Users',
    order: 18,
  },
};

// Clean Markdown strings and extract TOC Headings
function extractHeadings(markdown: string): TocItem[] {
  const headingLines = markdown.split('\n').filter((line) => line.match(/^#{1,4}\s+/));
  return headingLines.map((line, idx) => {
    const match = line.match(/^(#{1,4})\s+(.+)$/);
    if (!match) return { id: `heading-${idx}`, text: line, level: 2 };
    const level = match[1].length;
    let text = match[2].replace(/[*_~`]/g, '').trim();
    // remove Markdown links inside heading
    text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    const id = text
      .toLowerCase()
      .replace(/[^\w\u0600-\u06FF\s-]/g, '')
      .replace(/\s+/g, '-');
    return { id: id || `heading-${idx}`, text, level };
  });
}

// Generate simple auto keywords
function extractKeywords(markdown: string): string[] {
  const commonKeywords = [
    'BunyanX', 'NGFW', 'Firewall', 'eBPF', 'XDP', 'PHANTOM', 'IDS', 'IPS', 'WAF',
    'DLP', 'UEBA', 'UBA', 'ORACLE', 'DART', 'SSL', 'TLS', 'Proxy', 'QoS', 'VPN',
    'Email Security', 'Zero Trust', 'Anti-Malware', 'DNS Security', 'Kernel',
    'الجدار الناري', 'الذكاء الاصطناعي', 'الأمن السيبراني', 'مشروع التخرج'
  ];
  return commonKeywords.filter((kw) =>
    new RegExp(kw, 'i').test(markdown)
  ).slice(0, 8);
}

function slugifyFilename(filename: string): string {
  return filename
    .toLowerCase()
    .replace(/\.md$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getDocsDirectoryPath(): string {
  return process.cwd();
}

export function getAllDocFiles(): string[] {
  const dir = getDocsDirectoryPath();
  const files = fs.readdirSync(dir);
  return files.filter((f) => f.endsWith('.md'));
}

export async function getAllDocs(): Promise<DocItem[]> {
  const files = getAllDocFiles();
  const docs: DocItem[] = [];

  for (const filename of files) {
    const filePath = path.join(getDocsDirectoryPath(), filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);

    const mapping = SLUG_MAP[filename] || {
      slug: slugifyFilename(filename),
      titleAr: filename.replace('.md', '').replace(/_/g, ' '),
      titleEn: filename.replace('.md', '').replace(/_/g, ' '),
      categoryAr: 'وثائق عامة',
      categoryEn: 'General Docs',
      icon: 'FileText',
      order: 99,
    };

    const words = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / 200);
    const headings = extractHeadings(content);
    const keywords = extractKeywords(content);

    // Render markdown to HTML
    const processedContent = await remark()
      .use(gfm)
      .use(html, { sanitize: false })
      .process(content);

    const htmlContent = processedContent.toString();

    // Clean summary
    const plainText = content.replace(/[#*`_~>\-]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    const firstParagraph = plainText.split('\n\n').find((p) => p.trim().length > 30) || plainText.slice(0, 200);
    const summaryAr = frontmatter.summaryAr || firstParagraph.slice(0, 220) + '...';
    const summaryEn = frontmatter.summaryEn || firstParagraph.slice(0, 220) + '...';

    docs.push({
      ...mapping,
      filename,
      wordCount: words,
      readingTime,
      headings,
      summaryAr,
      summaryEn,
      keywords,
      content,
      htmlContent,
      rawMarkdown: fileContent,
      lastUpdated: new Date().toISOString().split('T')[0],
    });
  }

  return docs.sort((a, b) => a.order - b.order);
}

export async function getDocBySlug(slug: string): Promise<DocItem | null> {
  const docs = await getAllDocs();
  return docs.find((d) => d.slug === slug) || null;
}
