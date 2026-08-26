/**
 * ==============================================================================
 * BUNYANX DOCUMENTATION PUBLISHING SYSTEM — PDF BUILDER
 * Converts HTML documents into High-Quality Vector A4 PDFs via Headless Chromium
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.resolve(__dirname, '..');
const HTML_DIR = path.join(ROOT_DIR, 'html');
const PDF_DIR = path.join(ROOT_DIR, 'pdf');

if (!fs.existsSync(PDF_DIR)) {
  fs.mkdirSync(PDF_DIR, { recursive: true });
}

// Locate System Chrome / Edge if available as fallback
function findSystemBrowser() {
  const commonPaths = [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  ];

  for (const p of commonPaths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }
  return undefined;
}

const FILES_TO_RENDER = [
  { html: '00_front_matter.html', pdf: '00_front_matter.pdf', title: 'الصفحات التمهيدية للأطروحة' },
  { html: '01_introduction.html', pdf: '01_introduction.pdf', title: 'الفصل الأول: المقدمة' },
  { html: '02_previous_studies.html', pdf: '02_previous_studies.pdf', title: 'الفصل الثاني: الدراسات السابقة' },
  { html: '03_analysis.html', pdf: '03_analysis.pdf', title: 'الفصل الثالث: تحليل النظام' },
  { html: '04_design.html', pdf: '04_design.pdf', title: 'الفصل الرابع: تصميم النظام' },
  { html: '05_implementation.html', pdf: '05_implementation.pdf', title: 'الفصل الخامس: التنفيذ البرمجي' },
  { html: '06_testing.html', pdf: '06_testing.pdf', title: 'الفصل السادس: الاختبارات والتقييم' },
  { html: '07_conclusion.html', pdf: '07_conclusion.pdf', title: 'الفصل السابع: الخاتمة والتوصيات' },
  { html: '08_references.html', pdf: '08_references.pdf', title: 'الفصل الثامن: قائمة المراجع' },
  { html: '09_appendices.html', pdf: '09_appendices.pdf', title: 'الفصل التاسع: الملاحق' },
  { html: 'documentation_audit.html', pdf: 'documentation_audit.pdf', title: 'تقرير التدقيق الشامل' },
  { html: 'full_thesis.html', pdf: 'BUNYANX_Full_Thesis.pdf', title: 'الأطروحة الجامعية الكاملة' }
];

async function buildAllPdfs() {
  console.log('🚀 Launching PDF Generation Engine...');
  const executablePath = findSystemBrowser();
  if (executablePath) {
    console.log(`ℹ️ Using Browser: ${executablePath}`);
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: executablePath,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--font-render-hinting=none',
      '--allow-file-access-from-files'
    ]
  });

  const summary = [];

  for (const item of FILES_TO_RENDER) {
    const htmlPath = path.join(HTML_DIR, item.html);
    const pdfPath = path.join(PDF_DIR, item.pdf);

    if (!fs.existsSync(htmlPath)) {
      console.warn(`⚠️ Warning: ${htmlPath} does not exist. Skipping.`);
      continue;
    }

    console.log(`⏳ Converting ${item.html} ➜ ${item.pdf}...`);
    const page = await browser.newPage();

    // Set high resolution viewport matching A4 ratio
    await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

    // Navigate to local file
    const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
    await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 60000 });

    // Wait for fonts and mermaid diagrams to render
    await page.evaluate(async () => {
      if (document.fonts) {
        await document.fonts.ready;
      }
      // Wait for any mermaid svg rendering
      await new Promise(resolve => setTimeout(resolve, 1500));
    });

    page.setDefaultTimeout(120000);
    page.setDefaultNavigationTimeout(120000);

    // Generate PDF with strict CSS page geometry and zero duplicate margins
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      timeout: 120000,
      margin: {
        top: '0px',
        bottom: '0px',
        left: '0px',
        right: '0px'
      },
      displayHeaderFooter: false
    });

    const stats = fs.statSync(pdfPath);
    const sizeKb = (stats.size / 1024).toFixed(1);
    console.log(`✅ Success: ${item.pdf} (${sizeKb} KB)`);

    summary.push({
      chapter: item.title,
      file: item.pdf,
      size: `${sizeKb} KB`
    });

    await page.close();
  }

  await browser.close();
  console.log('\n🎉 =========================================================');
  console.log('🎉 ALL PDF CHAPTERS & FULL THESIS SUCCESSFULLY GENERATED!');
  console.log('🎉 =========================================================');
  console.table(summary);
}

buildAllPdfs().catch(err => {
  console.error('❌ Error during PDF Generation:', err);
  process.exit(1);
});
