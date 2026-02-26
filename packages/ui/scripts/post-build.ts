import * as fs from 'fs';
import * as path from 'path';

// --- CSS Generator Logic ---

const STYLES_DIR = path.resolve(__dirname, '../src/components');
const THEME_FILE = path.resolve(__dirname, '../src/styles/theme.styles.ts');
const OUTPUT_CSS = path.resolve(__dirname, '../dist/styles.css');

function sanitizeCss(raw: string): string {
  return raw
    .split('\n')
    .filter((line) => !line.trim().startsWith('//'))
    .join('\n');
}

function extractCssFromFile(filePath: string): string {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/export const \w+Css = `([\s\S]*?)`;/);
  if (!match) return '';
  return sanitizeCss(match[1]).trim();
}

function extractThemeCss(filePath: string): string {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/export const defaultThemeCss = `([\s\S]*?)`;/);
  if (!match) return '';
  return sanitizeCss(match[1]).trim();
}

function findAllStyleFiles(dir: string): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findAllStyleFiles(fullPath));
    } else if (entry.name.endsWith('.styles.ts')) {
      results.push(fullPath);
    }
  }

  return results.sort();
}

function generateUnifiedCss(): void {
  const styleFiles = findAllStyleFiles(STYLES_DIR);
  const cssChunks: string[] = [];

  // 1. Theme CSS
  const themeCss = extractThemeCss(THEME_FILE);
  if (themeCss) {
    cssChunks.push(`/* ========== Theme Variables ========== */\n${themeCss}`);
  }

  // 2. Component CSS
  for (const file of styleFiles) {
    const componentName = path.basename(path.dirname(file));
    const css = extractCssFromFile(file);
    if (css) {
      cssChunks.push(`/* ========== ${componentName} ========== */\n${css}`);
    }
  }

  const distDir = path.dirname(OUTPUT_CSS);
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  const header = `/**
 * @cooolpower/headless-ui - Unified Styles
 * Auto-generated. Do not edit manually.
 */\n\n`;

  fs.writeFileSync(OUTPUT_CSS, header + cssChunks.join('\n\n'), 'utf-8');
  const sizeKB = (fs.statSync(OUTPUT_CSS).size / 1024).toFixed(1);
  console.log(`✅ Generated styles.css (${sizeKB} KB)`);
}

// --- Directive Injection Logic ---

function injectUseClient(filePath: string): void {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Warning: ${filePath} not found, skipping 'use client' injection.`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  if (!content.startsWith("'use client';")) {
    fs.writeFileSync(filePath, `'use client';\n${content}`, 'utf-8');
    console.log(`✅ Prepended 'use client' to ${path.basename(filePath)}`);
  }
}

// --- Run ---

function main(): void {
  try {
    generateUnifiedCss();
    
    const distPath = path.resolve(__dirname, '../dist');
    injectUseClient(path.join(distPath, 'index.js'));
    injectUseClient(path.join(distPath, 'index.mjs'));
    
    console.log('🚀 Post-build processing completed successfully.');
  } catch (error) {
    console.error('❌ Post-build processing failed:', error);
    process.exit(1);
  }
}

main();
