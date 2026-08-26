/**
 * ==============================================================================
 * BUNYANX DOCUMENTATION PUBLISHING SYSTEM — CLIENT SCRIPT
 * Interactive Academic Reader, Math & Diagram Rendering, Bidi Isolation
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initBidiIsolation();
  initMermaid();
  initMathRendering();
  initNavigation();
  initReadingProgressBar();
  initCodeCopyButtons();
});

/**
 * Ensures mixed English words, file paths, endpoints, brackets, and code
 * never flip in RTL context.
 */
function initBidiIsolation() {
  // Isolate file paths and Windows drive letters
  const textNodes = [];
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let n;
  while (n = walk.nextNode()) {
    // Skip script, style, pre, code tags
    if (['SCRIPT', 'STYLE', 'PRE', 'CODE', 'SVG'].includes(n.parentNode.nodeName)) continue;
    if (n.nodeValue.match(/[a-zA-Z0-9_\-\.\:\/\\]{3,}/)) {
      // Node contains tech strings or paths
    }
  }

  // Ensure all inline code elements have strict LTR
  document.querySelectorAll('code, pre, kbd, samp, .file-path, .tech-term').forEach(el => {
    el.setAttribute('dir', 'ltr');
    el.classList.add('bidi-isolate');
  });
}

/**
 * Initialize Mermaid diagram renderer with high-contrast, crisp typography
 */
function initMermaid() {
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'Cairo, sans-serif',
      fontSize: 14,
      themeVariables: {
        fontFamily: 'Cairo, sans-serif',
        fontSize: '13px',
        primaryColor: '#e0f2fe',
        primaryTextColor: '#0f2b48',
        primaryBorderColor: '#0284c7',
        lineColor: '#0284c7',
        secondaryColor: '#f8fafc',
        tertiaryColor: '#ffffff',
        mainBkg: '#ffffff',
        nodeBorder: '#0284c7',
        clusterBkg: '#f8fafc',
        clusterBorder: '#94a3b8',
        titleColor: '#0f2b48',
        edgeLabelBackground: '#ffffff',
        actorBkg: '#f0f9ff',
        actorBorder: '#0284c7',
        actorTextColor: '#0c4a6e',
        actorLineColor: '#0284c7',
        signalColor: '#0284c7',
        signalTextColor: '#0f2b48',
        labelBoxBkgColor: '#ffffff',
        labelBoxBorderColor: '#0284c7',
        labelTextColor: '#0f2b48',
        loopTextColor: '#0f2b48',
        noteBorderColor: '#f59e0b',
        noteBkgColor: '#fef3c7',
        noteTextColor: '#78350f'
      },
      sequence: {
        useMaxWidth: true,     // يتسع بالضبط داخل حدود صفحة A4
        diagramMarginX: 10,
        diagramMarginY: 10,
        actorMargin: 15,       // تباعد ذكي يمنع خروج الأطراف عن الصفحة
        width: 105,            // عرض مثالي للمربعات العلوية
        height: 42,
        boxMargin: 6,
        boxTextMargin: 4,
        noteMargin: 10,
        messageMargin: 32,
        mirrorActors: false,
        bottomMarginAdj: 5
      },
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis',
        nodeSpacing: 18,
        rankSpacing: 22,
        padding: 6
      }
    });
  }
}



/**
 * Renders any KaTeX mathematical equations dynamically if KaTeX is loaded
 */
function initMathRendering() {
  if (typeof renderMathInElement !== 'undefined') {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ],
      throwOnError: false
    });
  }
}

/**
 * Navigation, Print & Utility Controls
 */
function initNavigation() {
  const printBtn = document.getElementById('btnPrint');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  const chapterSelect = document.getElementById('chapterSelect');
  if (chapterSelect) {
    chapterSelect.addEventListener('change', (e) => {
      if (e.target.value) {
        window.location.href = e.target.value;
      }
    });
  }
}

/**
 * Reading progress bar
 */
function initReadingProgressBar() {
  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress-bar no-print';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(to left, #c59b27, #0d7377);
    z-index: 9999;
    width: 0%;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

/**
 * Code Block Copy Buttons
 */
function initCodeCopyButtons() {
  document.querySelectorAll('.code-editor-window, .code-block-wrapper').forEach(wrapper => {
    const actions = wrapper.querySelector('.editor-actions') || wrapper.querySelector('.editor-titlebar') || wrapper.querySelector('.code-header');
    const code = wrapper.querySelector('code') || wrapper.querySelector('pre');
    
    if (actions && code && !actions.querySelector('.copy-code-btn')) {
      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-code-btn no-print';
      copyBtn.innerHTML = '📋 نسخ';
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(code.innerText).then(() => {
          copyBtn.innerHTML = '✅ تم النسخ!';
          setTimeout(() => copyBtn.innerHTML = '📋 نسخ', 2000);
        });
      });
      actions.appendChild(copyBtn);
    }
  });
}
