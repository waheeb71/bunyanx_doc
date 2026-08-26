/**
 * ==============================================================================
 * BUNYANX DOCUMENTATION PUBLISHING SYSTEM — VALIDATOR & QA AUDITOR
 * Automated quality assurance testing across HTML, RTL, Typography & Geometry
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const HTML_DIR = path.join(ROOT_DIR, 'html');

function runValidation() {
  console.log('🔍 Starting Automated Quality Assurance Validation...\n');

  if (!fs.existsSync(HTML_DIR)) {
    console.error('❌ HTML directory not found.');
    process.exit(1);
  }

  const files = fs.readdirSync(HTML_DIR).filter(f => f.endsWith('.html'));
  let totalErrors = 0;
  let totalWarnings = 0;

  console.log(`📁 Found ${files.length} HTML files to validate.\n`);

  files.forEach(file => {
    const filePath = path.join(HTML_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const errors = [];
    const warnings = [];

    // 1. Check Project Name (Exclude audit report explanatory references)
    if (file !== 'documentation_audit.html') {
      const legacyMatches = content.match(/CyberNexus/gi);
      if (legacyMatches && legacyMatches.length > 0) {
        errors.push(`Found ${legacyMatches.length} legacy 'CyberNexus' occurrences.`);
      }
    }

    // 2. Check Unclosed LaTeX Math Delimiters
    const openDisplayMath = (content.match(/\$\$/g) || []).length;
    if (openDisplayMath % 2 !== 0) {
      errors.push('Unbalanced display math ($$) delimiters detected.');
    }

    // 3. Check for Empty Headers or Empty Content
    if (content.includes('<h1></h1>') || content.includes('<h2></h2>') || content.includes('<p></p>')) {
      warnings.push('Empty header or paragraph tag detected.');
    }

    // 4. Check Tables Structure
    if (content.includes('<table>') && !content.includes('<thead>')) {
      warnings.push('Table missing <thead> header group.');
    }

    // 5. Check Direction Attributes
    if (!content.includes('dir="rtl"')) {
      errors.push('Missing root dir="rtl" attribute.');
    }

    // 6. Check Code Blocks Isolation
    const codeBlocks = content.match(/<pre[^>]*>/g) || [];
    codeBlocks.forEach(cb => {
      if (!cb.includes('dir="ltr"')) {
        warnings.push('Code block missing explicit dir="ltr".');
      }
    });

    // 7. Check A4 Container
    if (!content.includes('continuous-document') && !content.includes('document-container')) {
      errors.push('Missing A4 document layout wrapper.');
    }

    if (errors.length === 0 && warnings.length === 0) {
      console.log(`✅ ${file}: PASS (All QA checks passed cleanly)`);
    } else {
      if (errors.length > 0) {
        console.log(`❌ ${file}: FAILED with ${errors.length} errors:`);
        errors.forEach(e => console.log(`   - Error: ${e}`));
        totalErrors += errors.length;
      }
      if (warnings.length > 0) {
        console.log(`⚠️ ${file}: WARNINGS (${warnings.length}):`);
        warnings.forEach(w => console.log(`   - Warning: ${w}`));
        totalWarnings += warnings.length;
      }
    }
  });

  console.log('\n=========================================================');
  console.log(`📊 QA AUDIT RESULT: ${totalErrors === 0 ? 'PASSED ✅' : 'FAILED ❌'}`);
  console.log(`Total Files Checked: ${files.length}`);
  console.log(`Total Critical Errors: ${totalErrors}`);
  console.log(`Total Warnings: ${totalWarnings}`);
  console.log('=========================================================\n');

  if (totalErrors > 0) {
    process.exit(1);
  }
}

runValidation();
