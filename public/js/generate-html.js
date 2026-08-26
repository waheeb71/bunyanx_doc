/**
 * ==============================================================================
 * BUNYANX DOCUMENTATION PUBLISHING SYSTEM — HTML GENERATOR (ROBUST PARSER)
 * Clean Placeholder-based Markdown Parser for Tables, Math (KaTeX) & Mermaid
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
let katex;
try {
  katex = require('katex');
} catch (e) {
  katex = null;
}
const Prism = require('prismjs');
require('prismjs/components/prism-python');
require('prismjs/components/prism-c');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-json');
require('prismjs/components/prism-yaml');

const ROOT_DIR = path.resolve(__dirname, '..');
const HTML_DIR = path.join(ROOT_DIR, 'html');

if (!fs.existsSync(HTML_DIR)) {
  fs.mkdirSync(HTML_DIR, { recursive: true });
}

// Chapter definitions
const CHAPTERS = [
  {
    id: '00_front_matter',
    file: '00_front_matter.md',
    outFile: '00_front_matter.html',
    title: 'الصفحات التمهيدية: البسملة، الإهداء، الشكر، الملخص، والفهرس',
    enTitle: 'Thesis Front Matter & Preliminary Pages',
    number: 'تمهيد'
  },
  {
    id: '01_introduction',
    file: '01_introduction.md',
    outFile: '01_introduction.html',
    title: 'الفصل الأول: المقدمة العامة والخلفية البحثية',
    enTitle: 'Chapter 1: Introduction & Research Background',
    number: '1'
  },
  {
    id: '02_previous_studies',
    file: '02_previous_studies.md',
    outFile: '02_previous_studies.html',
    title: 'الفصل الثاني: الدراسات السابقة والفجوة البحثية',
    enTitle: 'Chapter 2: Literature Review & Research Gap',
    number: '2'
  },
  {
    id: '03_analysis',
    file: '03_analysis.md',
    outFile: '03_analysis.html',
    title: 'الفصل الثالث: تحليل النظام والمتطلبات الهندسية',
    enTitle: 'Chapter 3: System Requirements & Engineering Analysis',
    number: '3'
  },
  {
    id: '04_design',
    file: '04_design.md',
    outFile: '04_design.html',
    title: 'الفصل الرابع: تصميم النظام والمعمارية الهندسية',
    enTitle: 'Chapter 4: System Architecture & UML Design',
    number: '4'
  },
  {
    id: '05_implementation',
    file: '05_implementation.md',
    outFile: '05_implementation.html',
    title: 'الفصل الخامس: التنفيذ البرمجي والهندسي المفصل',
    enTitle: 'Chapter 5: System Implementation & Codebase',
    number: '5'
  },
  {
    id: '06_testing',
    file: '06_testing.md',
    outFile: '06_testing.html',
    title: 'الفصل السادس: الاختبارات والتقييم المعملي',
    enTitle: 'Chapter 6: Testing & Empirical Evaluation',
    number: '6'
  },
  {
    id: '07_conclusion',
    file: '07_conclusion.md',
    outFile: '07_conclusion.html',
    title: 'الفصل السابع: الخاتمة والتوصيات والأعمال المستقبلية',
    enTitle: 'Chapter 7: Conclusion & Future Horizons',
    number: '7'
  },
  {
    id: '08_references',
    file: '08_references.md',
    outFile: '08_references.html',
    title: 'الفصل الثامن: قائمة المراجع والمصادر الشاملة',
    enTitle: 'Chapter 8: Master References List (IEEE)',
    number: '8'
  },
  {
    id: '09_appendix',
    file: '09_appendix.md',
    outFile: '09_appendices.html',
    title: 'الفصل التاسع: الملاحق والوثائق الفنية',
    enTitle: 'Chapter 9: Appendices & Deployment Manual',
    number: '9'
  },
  {
    id: 'documentation_audit',
    file: 'DOCUMENTATION_AUDIT.md',
    outFile: 'documentation_audit.html',
    title: 'وثيقة تقرير التدقيق الأكاديمي واللغوي الشامل',
    enTitle: 'Comprehensive Academic & Language Audit Report',
    number: 'Audit'
  }
];

function escapeHtml(string) {
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Robust Two-Pass Markdown to HTML compiler
 */
function compileMarkdown(md) {
  const mathBlocks = [];
  const mathInlines = [];
  const mermaidBlocks = [];

  // 1. Extract and protect Mermaid diagrams
  let processed = md.replace(/```mermaid\s*\n([\s\S]*?)\n```/g, (match, code) => {
    const placeholder = `%%BUNYANX_MERMAID_${mermaidBlocks.length}%%`;
    mermaidBlocks.push(code.trim());
    return placeholder;
  });

  // 2. Extract and protect Display Math ($$ ... $$)
  processed = processed.replace(/\$\$([\s\S]+?)\$\$/g, (match, eq) => {
    const placeholder = `%%BUNYANX_MATH_BLOCK_${mathBlocks.length}%%`;
    mathBlocks.push(eq.trim());
    return placeholder;
  });

  // 3. Extract and protect Inline Math ($ ... $)
  processed = processed.replace(/(^|[^\\])\$([^\$\n]+?)\$/g, (match, prefix, eq) => {
    if (eq.trim().length > 0 && !eq.match(/^[0-9\.\s]+ms$/)) {
      const placeholder = `%%BUNYANX_MATH_INLINE_${mathInlines.length}%%`;
      mathInlines.push(eq.trim());
      return `${prefix}${placeholder}`;
    }
    return match;
  });

  // 3.5. Ensure each Markdown image is on its own block and fix unencoded spaces
  processed = processed.replace(/!\[([^\]]*)\]\(([^)\n]+)\)/g, (match, alt, url) => {
    const cleanUrl = url.trim();
    return `\n\n![${alt}](${cleanUrl.replace(/ /g, '%20')})\n\n`;
  });

  // 4. Run Marked parsing (Default marked produces 100% correct HTML tables without [object Object])
  let html = marked.parse(processed);

  // 4.5. Wrap all images in academic figure containers
  html = html.replace(/<p>\s*(<img\s+[^>]+>)\s*<\/p>/gi, (match, imgTag) => {
    return `<figure class="figure-container">${imgTag}</figure>`;
  });
  html = html.replace(/<p>([\s\S]*?<img[\s\S]*?)<\/p>/gi, (match, content) => {
    if (!content.includes('<figure')) {
      return content.replace(/(<img\s+[^>]+>)/gi, '<figure class="figure-container">$1</figure>');
    }
    return match;
  });

  // 5. Restore Mermaid Blocks
  html = html.replace(/<p>%%BUNYANX_MERMAID_(\d+)%%<\/p>|%%BUNYANX_MERMAID_(\d+)%%/g, (match, id1, id2) => {
    const id = parseInt(id1 !== undefined ? id1 : id2, 10);
    const code = mermaidBlocks[id];
    return `<div class="mermaid-wrapper"><pre class="mermaid" dir="ltr">${escapeHtml(code)}</pre></div>`;
  });

  // 6. Restore & Render Display Math (KaTeX)
  html = html.replace(/<p>%%BUNYANX_MATH_BLOCK_(\d+)%%<\/p>|%%BUNYANX_MATH_BLOCK_(\d+)%%/g, (match, id1, id2) => {
    const id = parseInt(id1 !== undefined ? id1 : id2, 10);
    const eq = mathBlocks[id];
    if (katex) {
      try {
        const rendered = katex.renderToString(eq, { displayMode: true, throwOnError: false });
        return `<div class="math-block">${rendered}</div>`;
      } catch (e) {
        return `<div class="math-block">\\[${escapeHtml(eq)}\\]</div>`;
      }
    }
    return `<div class="math-block">\\[${escapeHtml(eq)}\\]</div>`;
  });

  // 7. Restore & Render Inline Math (KaTeX)
  html = html.replace(/%%BUNYANX_MATH_INLINE_(\d+)%%/g, (match, idStr) => {
    const id = parseInt(idStr, 10);
    const eq = mathInlines[id];
    if (katex) {
      try {
        return katex.renderToString(eq, { displayMode: false, throwOnError: false });
      } catch (e) {
        return `\\(${escapeHtml(eq)}\\)`;
      }
    }
    return `\\(${escapeHtml(eq)}\\)`;
  });

  // 8. Wrap Tables in responsive academic wrapper with repeater styling and smart Algorithm Column LTR Detection
  html = html.replace(/<table>([\s\S]*?)<\/table>/g, (match, tableInner) => {
    let algoColIndex = -1;
    const theadMatch = tableInner.match(/<thead>[\s\S]*?<\/thead>/i);
    if (theadMatch) {
      const ths = theadMatch[0].match(/<th[^>]*>[\s\S]*?<\/th>/gi) || [];
      ths.forEach((th, idx) => {
        if (/الخوارزم|المعالم الرياضية|الرياضي|Algorithm|Formula|Equation|Parameters/i.test(th)) {
          algoColIndex = idx;
        }
      });
    }

    if (algoColIndex !== -1) {
      let processedInner = tableInner.replace(/<tr>([\s\S]*?)<\/tr>/gi, (trMatch, trInner) => {
        let cellIdx = 0;
        return '<tr>' + trInner.replace(/<(td|th)([^>]*)>([\s\S]*?)<\/\1>/gi, (cellMatch, tag, attrs, content) => {
          const currentIdx = cellIdx++;
          if (tag.toLowerCase() === 'td' && currentIdx === algoColIndex) {
            return `<td${attrs} class="col-algo" dir="ltr"><div class="algo-cell-content" dir="ltr">${content}</div></td>`;
          }
          return cellMatch;
        }) + '</tr>';
      });
      return `<div class="table-wrapper"><table class="has-algo-col">${processedInner}</table></div>`;
    }

    return `<div class="table-wrapper"><table>${tableInner}</table></div>`;
  });

  // Helper: Smart File & Diagram Metadata Extractor
  function detectSmartFileInfo(rawCodeText, langName) {
    const normLang = (langName || '').toLowerCase().trim();
    const lines = rawCodeText.trim().split('\n');
    const firstLine = lines[0] ? lines[0].trim() : '';

    // 1. Extract explicit filename from first-line comment (Highest Priority for any code block)
    // Examples: "# aegis_engine.py – BUNYANX...", "# phantom_engine.py", "// filter_xdp.c", "# test_luhn.py"
    const commentMatch = firstLine.match(/^[#\/\*;\-]+\s*([a-zA-Z0-9_\-]+\.(py|c|h|sh|json|yaml|yml|rs|go|js|ts|cpp))\b/i);
    if (commentMatch && commentMatch[1]) {
      const detectedName = commentMatch[1];
      const ext = commentMatch[2].toLowerCase();
      const iconMap = { py: '🐍', c: '⚙️', h: '⚙️', cpp: '⚙️', sh: '💻', json: '📋', yaml: '⚙️', yml: '⚙️', js: '🟨', ts: '🟦', rs: '🦀', go: '🐹' };

      let badge = ext.toUpperCase();
      if (ext === 'py') {
        if (detectedName.includes('aegis')) badge = 'PYTHON (AEGIS AI)';
        else if (detectedName.includes('phantom')) badge = 'PYTHON (PHANTOM)';
        else if (detectedName.includes('dlp')) badge = 'PYTHON (DLP ENGINE)';
        else if (detectedName.includes('test')) badge = 'PYTHON (TEST SUITE)';
        else badge = 'PYTHON';
      } else if (ext === 'c' || ext === 'h') {
        badge = 'C (eBPF/XDP)';
      }

      return {
        fileName: detectedName,
        fileIcon: iconMap[ext] || '📄',
        badge: badge,
        isDiagram: false,
        lang: ext === 'py' ? 'python' : ext
      };
    }

    // 2. Detect Project Directory Tree
    const isDirectoryTree = lines.some(l => l.includes('├──') || l.includes('└──') || l.includes('enterprise_ngfw/'));
    if (isDirectoryTree) {
      return {
        fileName: 'project_structure.tree',
        fileIcon: '📁',
        badge: 'PROJECT TREE',
        isDiagram: false,
        lang: 'text'
      };
    }

    // 3. Detect ASCII Architecture / Pipeline diagrams (ONLY for text/ascii blocks without a programming language)
    const isCodeLang = ['python', 'py', 'c', 'cpp', 'bash', 'sh', 'json', 'yaml', 'yml', 'js', 'ts'].includes(normLang);
    if (!isCodeLang) {
      const isAsciiDiagram = lines.some(l =>
        l.includes('Raw Network Packets') ||
        l.trim() === '│' ||
        l.trim() === '▼' ||
        l.includes('+---+') ||
        (l.trim() === '|' && lines.some(l2 => l2.trim() === 'v'))
      );
      if (isAsciiDiagram) {
        return {
          fileName: 'architecture_pipeline.ascii',
          fileIcon: '📊',
          badge: 'ARCHITECTURE PIPELINE',
          isDiagram: true,
          lang: 'ascii'
        };
      }
    }

    // 4. Detect semantic file name based on Python classes/functions
    if (normLang === 'python' || normLang === 'py') {
      if (rawCodeText.includes('ThreatTransformer') || rawCodeText.includes('aegis')) {
        return { fileName: 'aegis_engine.py', fileIcon: '🐍', badge: 'PYTHON (AEGIS AI)', isDiagram: false, lang: 'python' };
      }
      if (rawCodeText.includes('OnlineContinualLearner') || rawCodeText.includes('ADWIN')) {
        return { fileName: 'continual_learner.py', fileIcon: '🐍', badge: 'PYTHON (DART AI)', isDiagram: false, lang: 'python' };
      }
      if (rawCodeText.includes('SpectralByteEncoder') || rawCodeText.includes('SBE')) {
        return { fileName: 'spectral_encoder.py', fileIcon: '🐍', badge: 'PYTHON (PHANTOM)', isDiagram: false, lang: 'python' };
      }
      if (rawCodeText.includes('HoloFilter') || rawCodeText.includes('Popcount')) {
        return { fileName: 'holofilter_hdc.py', fileIcon: '🐍', badge: 'PYTHON (HDC AI)', isDiagram: false, lang: 'python' };
      }
      if (rawCodeText.includes('validate_luhn') || rawCodeText.includes('test_dlp')) {
        return { fileName: 'test_dlp_validator.py', fileIcon: '🐍', badge: 'PYTHON (DLP UNIT)', isDiagram: false, lang: 'python' };
      }
      if (rawCodeText.includes('test_')) {
        return { fileName: 'test_suite.py', fileIcon: '🐍', badge: 'PYTHON (TEST)', isDiagram: false, lang: 'python' };
      }
      if (rawCodeText.includes('FlowSpec') || rawCodeText.includes('Wavelet')) {
        return { fileName: 'flowspec_wavelet.py', fileIcon: '🐍', badge: 'PYTHON (NM-MDE)', isDiagram: false, lang: 'python' };
      }
      return { fileName: 'bunyanx_engine.py', fileIcon: '🐍', badge: 'PYTHON', isDiagram: false, lang: 'python' };
    }

    if (normLang === 'c' || normLang === 'cpp') {
      return { fileName: 'xdp_fast_filter.c', fileIcon: '⚙️', badge: 'C (eBPF/XDP)', isDiagram: false, lang: 'c' };
    }

    if (normLang === 'bash' || normLang === 'sh') {
      if (rawCodeText.includes('main.py') || rawCodeText.includes('Starting BUNYANX') || rawCodeText.includes('StartupValidator') || rawCodeText.includes('root@bunyanx')) {
        return { fileName: 'system_boot_sequence.log', fileIcon: '🖥️', badge: 'LINUX BOOT LOGS', isDiagram: false, lang: 'bash' };
      }
      return { fileName: 'deploy_cluster.sh', fileIcon: '💻', badge: 'BASH SHELL', isDiagram: false, lang: 'bash' };
    }

    if (normLang === 'json') {
      return { fileName: 'security_policy.json', fileIcon: '📋', badge: 'JSON CONFIG', isDiagram: false, lang: 'json' };
    }

    if (normLang === 'yaml' || normLang === 'yml') {
      return { fileName: 'waf_rules.yaml', fileIcon: '⚙️', badge: 'YAML RULES', isDiagram: false, lang: 'yaml' };
    }

    return { fileName: 'data_snippet.txt', fileIcon: '📄', badge: normLang.toUpperCase() || 'TEXT', isDiagram: false, lang: normLang || 'text' };
  }

  // 9. Wrap Code Blocks with VS Code / Mac Window Editor & Prism Syntax Highlighting
  html = html.replace(/<pre><code class="language-([^"]+)">([\s\S]*?)<\/code><\/pre>/g, (m, lang, rawCode) => {
    const unescaped = rawCode
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    const info = detectSmartFileInfo(unescaped, lang);
    let highlighted = rawCode;
    const prismLang = Prism.languages[info.lang] || (info.lang === 'python' ? Prism.languages.python : (info.lang === 'bash' ? Prism.languages.bash : null));
    if (prismLang) {
      try {
        highlighted = Prism.highlight(unescaped, prismLang, info.lang);
      } catch (e) {
        highlighted = rawCode;
      }
    }

    const lines = unescaped.trim().split('\n');
    const lineCount = lines.length;
    let sizeClass = 'code-lines-short';
    if (lineCount > 100) {
      sizeClass = 'code-lines-mega';
    } else if (lineCount > 75) {
      sizeClass = 'code-lines-giant';
    } else if (lineCount > 55) {
      sizeClass = 'code-lines-huge';
    } else if (lineCount > 35) {
      sizeClass = 'code-lines-xlarge';
    } else if (lineCount > 20) {
      sizeClass = 'code-lines-long';
    } else if (lineCount > 10) {
      sizeClass = 'code-lines-medium';
    }

    const windowClass = `${info.isDiagram ? 'code-editor-window ascii-diagram-window' : 'code-editor-window'} ${sizeClass}`;

    return `<div class="${windowClass}" dir="ltr" data-lines="${lineCount}">
      <div class="editor-titlebar" dir="ltr">
        <div class="mac-dots">
          <span class="mac-dot close"></span>
          <span class="mac-dot minimize"></span>
          <span class="mac-dot maximize"></span>
        </div>
        <div class="editor-tab" dir="ltr">
          <span class="file-tab-icon">${info.fileIcon}</span>
          <span class="file-tab-name">${info.fileName}</span>
        </div>
        <div class="editor-actions" dir="ltr">
          <span class="editor-lang-badge">${info.badge}</span>
        </div>
      </div>
      <pre dir="ltr" class="bidi-isolate"><code class="language-${info.lang}" dir="ltr">${highlighted}</code></pre>
    </div>`;
  });

  html = html.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, (m, rawCode) => {
    const unescaped = rawCode
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    const info = detectSmartFileInfo(unescaped, 'text');
    const lines = unescaped.trim().split('\n');
    const lineCount = lines.length;
    let sizeClass = 'code-lines-short';
    if (lineCount > 100) {
      sizeClass = 'code-lines-mega';
    } else if (lineCount > 75) {
      sizeClass = 'code-lines-giant';
    } else if (lineCount > 55) {
      sizeClass = 'code-lines-huge';
    } else if (lineCount > 35) {
      sizeClass = 'code-lines-xlarge';
    } else if (lineCount > 20) {
      sizeClass = 'code-lines-long';
    } else if (lineCount > 10) {
      sizeClass = 'code-lines-medium';
    }

    const windowClass = `${info.isDiagram ? 'code-editor-window ascii-diagram-window' : 'code-editor-window'} ${sizeClass}`;

    return `<div class="${windowClass}" dir="ltr" data-lines="${lineCount}">
      <div class="editor-titlebar" dir="ltr">
        <div class="mac-dots">
          <span class="mac-dot close"></span>
          <span class="mac-dot minimize"></span>
          <span class="mac-dot maximize"></span>
        </div>
        <div class="editor-tab" dir="ltr">
          <span class="file-tab-icon">${info.fileIcon}</span>
          <span class="file-tab-name">${info.fileName}</span>
        </div>
        <div class="editor-actions" dir="ltr">
          <span class="editor-lang-badge">${info.badge}</span>
        </div>
      </div>
      <pre dir="ltr" class="bidi-isolate"><code dir="ltr">${rawCode}</code></pre>
    </div>`;
  });

  // 10. Process Screenshot Placeholders
  html = html.replace(/<p>\s*\[INSERT SCREENSHOT:\s*(.*?)\]\s*<\/p>|\[INSERT SCREENSHOT:\s*(.*?)\]/g, (match, desc1, desc2) => {
    const desc = desc1 !== undefined ? desc1 : desc2;
    return `<div class="screenshot-placeholder">
      <div class="icon">🖼️</div>
      <div class="placeholder-tag">مكان إدراج صورة الواجهة الفعلية (UI Screenshot Placement)</div>
      <div class="caption" dir="ltr">[INSERT SCREENSHOT: ${escapeHtml(desc)}]</div>
    </div>`;
  });

  // 11. Format IEEE References with strict LTR and Left Alignment (supports both [1] and [R-GT1] / [PA-DS])
  html = html.replace(/<p>\[([A-Za-z0-9_\-]+)\]\s+([\s\S]*?)<\/p>/g, (match, num, text) => {
    return `<div class="reference-item" dir="ltr"><span class="reference-number">[${num}]</span> <span class="reference-text" dir="ltr">${text}</span></div>`;
  });

  // 12. Fix English terms in Arabic Headings from line-wrap reversal and parenthesis flipping
  html = html.replace(/<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, level, attrs, content) => {
    const fixed = content.replace(/\(([a-zA-Z0-9\s_\-\/\.,:;&]+)\)/g, '<span dir="ltr" class="en-term">($1)</span>&lrm;');
    return `<h${level}${attrs}>${fixed}</h${level}>`;
  });

  return html;
}

/**
 * Generate full HTML page layout
 */
function buildHtmlPage(chapter, contentHtml, prevChapter, nextChapter) {
  const chapterOptions = CHAPTERS.map(c =>
    `<option value="${c.outFile}" ${c.id === chapter.id ? 'selected' : ''}>${c.title}</option>`
  ).join('\n');

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${chapter.title} | توثيق منظومة BUNYANX</title>
  
  <!-- Stylesheets -->
  <link rel="stylesheet" href="../css/base.css">
  <link rel="stylesheet" href="../css/print.css" media="print">
  <link rel="stylesheet" href="../css/chapters.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
  
  <!-- Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
  <script defer src="../js/script.js"></script>
</head>
<body>

  <!-- Screen Navigation Bar -->
  <nav class="screen-nav-bar no-print">
    <a href="../index.html" class="nav-brand">
      🛡️ <span>BUNYANX Enterprise NGFW</span>
    </a>
    
    <div class="nav-controls">
      <select id="chapterSelect" class="chapter-select">
        ${chapterOptions}
      </select>
      
      ${prevChapter ? `<a href="${prevChapter.outFile}" class="nav-btn">◀ السابق</a>` : ''}
      ${nextChapter ? `<a href="${nextChapter.outFile}" class="nav-btn">التالي ▶</a>` : ''}
      
      <button id="btnPrint" class="nav-btn nav-btn-primary">🖨️ طباعة / تصدير PDF</button>
      <a href="../index.html" class="nav-btn">🏠 الفهرس العام</a>
    </div>
  </nav>

  <!-- Document Container -->
  <div class="document-container">
    <article class="continuous-document">
      
      <!-- Academic Running Header -->
      <header class="doc-header">
        <div class="univ-info">
          <span class="title-badge">الجامعة الوطنية - تعز |كلية الهندسة</span>
        </div>
        <div class="project-tag">
          <span>مشروع التخرج: <strong>BUNYANX NGFW</strong></span>
        </div>
      </header>

      <!-- Chapter Hero Banner -->
      <div class="chapter-hero">
        <div class="chapter-number-badge">${chapter.number.length > 2 ? chapter.number : `الفصل ${chapter.number}`}</div>
        <h1 class="chapter-title">${chapter.title}</h1>
        <div class="chapter-subtitle" dir="ltr">${chapter.enTitle}</div>
      </div>

      <!-- Main Body Content -->
      <div class="chapter-body-content">
        ${contentHtml}
      </div>

      <!-- Academic Running Footer -->
      <footer class="doc-footer">
        <div class="dept-info">
          <span>قسم أمن المعلومات وهندسة الشبكات — 2025/2026م</span>
        </div>
        <div class="page-number-box">
          <span class="page-number"></span>
        </div>
      </footer>

    </article>
  </div>

</body>
</html>`;
}

/**
 * Main Generation Routine
 */
function generateAllHtml() {
  console.log('🚀 Starting BUNYANX HTML Document Generation...');
  let fullBookContent = '';

  for (let i = 0; i < CHAPTERS.length; i++) {
    const chapter = CHAPTERS[i];
    const mdPath = path.join(ROOT_DIR, chapter.file);

    if (!fs.existsSync(mdPath)) {
      console.warn(`⚠️ Warning: ${chapter.file} not found. Skipping.`);
      continue;
    }

    const mdContent = fs.readFileSync(mdPath, 'utf-8');
    const parsedHtml = compileMarkdown(mdContent);

    const prevChapter = i > 0 ? CHAPTERS[i - 1] : null;
    const nextChapter = i < CHAPTERS.length - 1 ? CHAPTERS[i + 1] : null;

    const fullHtml = buildHtmlPage(chapter, parsedHtml, prevChapter, nextChapter);
    const outPath = path.join(HTML_DIR, chapter.outFile);
    fs.writeFileSync(outPath, fullHtml, 'utf-8');
    console.log(`✅ Generated: html/${chapter.outFile}`);

    if (chapter.id !== 'documentation_audit') {
      if (chapter.id === '00_front_matter') {
        fullBookContent += `
        <section class="front-matter-section" id="chap_front_matter">
          ${parsedHtml}
        </section>
        `;
      } else {
        fullBookContent += `
        <section class="chapter-break-section" id="chap_${chapter.id}">
          <div class="chapter-hero">
            <div class="chapter-number-badge">الفصل ${chapter.number}</div>
            <h1 class="chapter-title">${chapter.title}</h1>
            <div class="chapter-subtitle" dir="ltr">${chapter.enTitle}</div>
          </div>
          <div class="chapter-body-content">
            ${parsedHtml}
          </div>
        </section>
        `;
      }
    }
  }

  // Generate Full Thesis Single-Page Book
  const fullThesisChapter = {
    id: 'full_thesis',
    outFile: 'full_thesis.html',
    title: 'الأطروحة الجامعية الكاملة — BUNYANX Enterprise NGFW',
    enTitle: 'Complete Bachelor Thesis Monograph',
    number: 'كامل التوثيق'
  };

  const fullBookHtml = buildHtmlPage(fullThesisChapter, fullBookContent, null, null);
  fs.writeFileSync(path.join(HTML_DIR, 'full_thesis.html'), fullBookHtml, 'utf-8');
  console.log(`📚 Generated Full Thesis Monograph: html/full_thesis.html`);

  generateMasterIndex();
  console.log(`🎉 All HTML Documents successfully generated without [object Object] errors!`);
}

function generateMasterIndex() {
  const frontMatterCard = `
    <div class="portal-card" style="border-top-color: var(--accent); background: linear-gradient(180deg, #ffffff 0%, #fcfbf7 100%);">
      <div class="card-badge" style="background: #fef3c7; color: #92400e;">✨ الصفحات التمهيدية</div>
      <h2 class="card-title" style="color: var(--primary-dark);">الصفحات التمهيدية للأطروحة</h2>
      <div class="card-subtitle" dir="ltr">Bismillah, Epigraph, Dedication, Acknowledgments, Abstract & TOC</div>
      <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 15px;">
        تضم: صفحة البسملة الشريفة، الآية والحديث، الإهداء للوالدين والأساتذة، الشكر والتقدير للمشرف والجامعة وفريق العمل، الملخص الأكاديمي، والفهرس العام.
      </p>
      <div class="card-actions">
        <a href="html/00_front_matter.html" class="btn-read" style="background: var(--accent); color: var(--primary-dark); font-weight: 700;">📖 تصفح التمهيد</a>
        <a href="html/00_front_matter.html?print=1" class="btn-pdf">🖨️ طباعة A4</a>
      </div>
    </div>
  `;

  const chapterCards = CHAPTERS.filter(c => c.id !== '00_front_matter').map(c => `
    <div class="portal-card">
      <div class="card-badge">${c.number.length > 2 ? c.number : `الفصل ${c.number}`}</div>
      <h2 class="card-title">${c.title}</h2>
      <div class="card-subtitle" dir="ltr">${c.enTitle}</div>
      <div class="card-actions">
        <a href="html/${c.outFile}" class="btn-read">📖 قراءة الفصل</a>
        <a href="html/${c.outFile}?print=1" class="btn-pdf">🖨️ طباعة A4</a>
      </div>
    </div>
  `).join('\n');

  const indexHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>منظومة BUNYANX Enterprise NGFW | بوابة التوثيق الجامعي الشامل</title>
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/chapters.css">
  <style>
    .portal-hero {
      background: linear-gradient(135deg, #091b2e 0%, #0f2b48 50%, #0d7377 100%);
      color: #ffffff;
      padding: 50px 20px;
      text-align: center;
      border-radius: 8px;
      margin-bottom: 35px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    }
    .portal-hero h1 {
      color: #ffffff;
      font-size: 2.4rem;
      font-weight: 900;
      margin-bottom: 12px;
    }
    .portal-hero p {
      color: #cbd5e1;
      font-size: 1.15rem;
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }
    .portal-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 20px;
      margin-top: 25px;
    }
    .portal-card {
      background: #ffffff;
      border: 1px solid var(--border-medium);
      border-top: 4px solid var(--primary);
      border-radius: 8px;
      padding: 22px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.04);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .portal-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.08);
      border-top-color: var(--accent);
    }
    .card-badge {
      background: var(--bg-surface-alt);
      color: var(--primary);
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 4px;
      font-size: 0.82rem;
      width: fit-content;
      margin-bottom: 10px;
    }
    .card-title {
      font-size: 1.25rem;
      color: var(--primary);
      margin-bottom: 6px;
      border: none;
      padding: 0;
      background: none;
    }
    .card-subtitle {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-bottom: 18px;
    }
    .card-actions {
      display: flex;
      gap: 10px;
      margin-top: auto;
    }
    .btn-read {
      flex: 1;
      background: var(--primary);
      color: #ffffff;
      text-align: center;
      padding: 8px;
      border-radius: 4px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.88rem;
    }
    .btn-read:hover {
      background: var(--primary-light);
    }
    .btn-pdf {
      background: var(--bg-surface-alt);
      color: var(--primary-dark);
      border: 1px solid var(--border-medium);
      padding: 8px 12px;
      border-radius: 4px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.88rem;
    }
    .btn-pdf:hover {
      background: var(--accent);
      color: var(--primary-dark);
    }
    .full-book-banner {
      background: #ffffff;
      border: 2px solid var(--accent);
      border-radius: 8px;
      padding: 24px;
      margin: 30px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      box-shadow: 0 4px 15px rgba(197, 155, 39, 0.15);
    }
    .front-matter-strip {
      background: #ffffff;
      border-radius: 8px;
      padding: 20px 24px;
      margin-bottom: 25px;
      border: 1px solid var(--border-medium);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 15px;
    }
    .front-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .front-pill {
      background: var(--bg-surface-alt);
      color: var(--primary);
      border: 1px solid var(--border-light);
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      text-decoration: none;
    }
    .front-pill:hover {
      background: var(--accent);
      color: var(--primary-dark);
    }
  </style>
</head>
<body style="background: #f1f5f9; padding: 25px 15px;">

  <div style="max-width: 1100px; margin: 0 auto;">
    
    <!-- Portal Hero Header -->
    <header class="portal-hero">
      <div style="font-size: 1rem; color: #e5b945; font-weight: 700; margin-bottom: 8px;">الجامعة الوطنية - تعز |كلية الهندسة | قسم هندسة أمن المعلومات وهندسة الشبكات</div>
      <h1>منظومة BUNYANX Enterprise NGFW</h1>
      <p>بوابة النشر والتوثيق الأكاديمي الشاملة لمشروع تخرج الجدار الناري المتقدم للمؤسسات من الجيل القادم المدعوم بتسريع النواة eBPF/XDP ومحركات الذكاء الاصطناعي</p>
    </header>

    <!-- Master Book Action Banner -->
    <div class="full-book-banner">
      <div>
        <h2 style="margin: 0; font-size: 1.4rem; color: var(--primary); border: none; padding: 0; background: none;">📚 الأطروحة الجامعية الكاملة موحدة (Complete Monograph)</h2>
        <p style="margin: 4px 0 0 0; color: var(--text-muted);">فتح وتصفح كافة الصفحات التمهيدية وفصول التوثيق التسعة في مستند A4 موحد متصل جاهز للطباعة وتصدير الـ PDF بنقرة واحدة.</p>
      </div>
      <div style="display: flex; gap: 10px;">
        <a href="html/full_thesis.html" class="nav-btn nav-btn-primary" style="padding: 10px 20px; font-size: 1rem;">📖 فتح الأطروحة الكاملة</a>
        <a href="pdf/BUNYANX_Full_Thesis.pdf" class="nav-btn" style="padding: 10px 16px; font-size: 1rem; background: var(--bg-surface-alt); border: 1px solid var(--border-medium); color: var(--primary-dark);">📄 تحميل PDF الموحد</a>
      </div>
    </div>

    <!-- Quick Navigation Strip for Front Matter -->
    <div class="front-matter-strip">
      <div>
        <strong style="color: var(--primary); font-size: 1rem;">✨ الصفحات التمهيدية للرسالة:</strong>
      </div>
      <div class="front-pills">
        <a href="html/00_front_matter.html" class="front-pill">📜 البسملة والآية والحديث</a>
        <a href="html/00_front_matter.html" class="front-pill">🎓 الإهداء</a>
        <a href="html/00_front_matter.html" class="front-pill">🤝 الشكر والتقدير</a>
        <a href="html/00_front_matter.html" class="front-pill">📄 الملخص التنفيذي</a>
        <a href="html/00_front_matter.html" class="front-pill">📑 الفهرس العام</a>
      </div>
    </div>

    <!-- Main Grid -->
    <main class="portal-grid">
      ${frontMatterCard}
      ${chapterCards}
    </main>

    <!-- Footer -->
    <footer style="text-align: center; margin-top: 40px; color: var(--text-muted); font-size: 0.9rem;">
      <p>قسم هندسة أمن المعلومات وهندسة الشبكات — إشراف ومناقشة رسائل التخرج 2025/2026م</p>
      <p style="direction: ltr; font-family: var(--font-mono); font-size: 0.8rem; margin-top: 4px;">BUNYANX A4 Publishing Engine v2.0</p>
    </footer>

  </div>

</body>
</html>`;

  fs.writeFileSync(path.join(ROOT_DIR, 'index.html'), indexHtml, 'utf-8');
  console.log(`🌐 Generated Portal: index.html`);
}

generateAllHtml();
