const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const HTML_DIR = path.resolve(__dirname, '..', 'html');

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

async function testAllMermaid() {
  const files = fs.readdirSync(HTML_DIR).filter(f => f.endsWith('.html') && f !== 'index.html');
  const executablePath = findSystemBrowser();
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
  });
  const page = await browser.newPage();

  let totalErrors = 0;

  for (const file of files) {
    const filePath = `file://${path.join(HTML_DIR, file).replace(/\\/g, '/')}`;
    
    await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 30000 });
    
    // Wait for mermaid rendering
    await new Promise(r => setTimeout(r, 2000));

    const result = await page.evaluate(() => {
      const errorDetails = [];
      
      document.querySelectorAll('.mermaid').forEach((m, idx) => {
        const text = m.innerText || '';
        const svg = m.querySelector('svg');
        const isError = text.includes('Syntax error') || 
                        text.includes('Parse error') || 
                        (svg && (svg.getAttribute('aria-roledescription') === 'error' || 
                                 svg.innerHTML.includes('Syntax error') || 
                                 svg.innerHTML.includes('error-icon') ||
                                 svg.classList.contains('error')));
        if (isError) {
          errorDetails.push({ 
            index: idx + 1, 
            snippet: m.getAttribute('data-original-code') || text.substring(0, 150) 
          });
        }
      });

      return { total: document.querySelectorAll('.mermaid').length, errors: errorDetails };
    });

    if (result.errors.length > 0) {
      console.error(`\n❌ [${file}] Total diagrams: ${result.total}, ERRORS: ${result.errors.length}`);
      result.errors.forEach(e => console.error(`   - Diagram #${e.index}: ${e.snippet.replace(/\n/g, ' ')}`));
      totalErrors += result.errors.length;
    } else {
      console.log(`✅ [${file}] All ${result.total} diagrams rendered cleanly.`);
    }
  }

  await browser.close();
  console.log(`\n🏁 Check finished with ${totalErrors} total error(s).`);
}

testAllMermaid().catch(err => {
  console.error(err);
  process.exit(1);
});
