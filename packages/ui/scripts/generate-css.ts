import * as fs from 'fs';
import * as path from 'path';

const STYLES_DIR = path.resolve(__dirname, '../src/components');
const THEME_FILE = path.resolve(__dirname, '../src/styles/theme.styles.ts');
const OUTPUT_FILE = path.resolve(__dirname, '../dist/styles.css');

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

function main(): void {
  const styleFiles = findAllStyleFiles(STYLES_DIR);
  const cssChunks: string[] = [];

  // 1. 테마 CSS (최상단)
  const themeCss = extractThemeCss(THEME_FILE);
  if (themeCss) {
    cssChunks.push(`/* ========== Theme Variables ========== */\n${themeCss}`);
  }

  // 2. 컴포넌트 CSS
  for (const file of styleFiles) {
    const componentName = path.basename(path.dirname(file));
    const css = extractCssFromFile(file);
    if (css) {
      cssChunks.push(`/* ========== ${componentName} ========== */\n${css}`);
    }
  }

  // dist 디렉토리 확인
  const distDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  const header = `/**
 * @cooolpower/headless-ui - Unified Styles
 * Auto-generated. Do not edit manually.
 * Import this file to apply all component styles without FOUC.
 *
 * Usage:
 *   import '@cooolpower/headless-ui/styles.css';
 */\n\n`;

  fs.writeFileSync(OUTPUT_FILE, header + cssChunks.join('\n\n'), 'utf-8');

  const sizeKB = (fs.statSync(OUTPUT_FILE).size / 1024).toFixed(1);
  console.log(`✅ Generated styles.css (${sizeKB} KB) with ${cssChunks.length} sections`);
}

main();
