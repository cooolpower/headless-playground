#!/usr/bin/env node

/**
 * RGB/HEX/RGBA 색상을 oklch로 변환하는 스크립트
 * 
 * 사용법:
 *   pnpm convert-colors
 *   또는
 *   node scripts/convert-colors-to-oklch.mjs
 * 
 * 주의: culori 패키지가 필요합니다 (devDependencies에 추가 필요)
 */

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// culori를 사용한 정확한 변환 (설치 필요: pnpm add -D culori)
let culoriModule;
let hasCulori = false;
try {
  culoriModule = await import('culori');
  hasCulori = true;
} catch (error) {
  console.warn('culori가 설치되지 않았습니다. 기본 변환 함수를 사용합니다.');
  console.warn('더 정확한 변환을 위해 다음 명령어를 실행하세요: pnpm add -D culori');
}

// 색상 값을 oklch로 변환 (culori 사용)
function convertColorToOklch(colorValue) {
  if (culoriModule && hasCulori) {
    try {
      const { parse, converter, formatCss } = culoriModule;
      const color = parse(colorValue);
      if (color) {
        const toOklch = converter('oklch');
        const oklch = toOklch(color);
        if (oklch && !isNaN(oklch.l)) {
          // 직접 포맷팅 (0-100% 범위 사용)
          const l = (oklch.l * 100).toFixed(1);
          const c = oklch.c !== undefined ? oklch.c.toFixed(3) : '0';
          const h = oklch.h !== undefined ? oklch.h.toFixed(1) : '0';
          const alpha = oklch.alpha !== undefined && oklch.alpha < 1 ? ` / ${oklch.alpha}` : '';
          return `oklch(${l}% ${c} ${h}${alpha})`;
        }
      }
    } catch (error) {
      // 변환 실패 시 기본 함수 사용
      // console.warn(`변환 실패: ${colorValue} - ${error.message}`);
    }
  }

  // 기본 변환 함수 (culori가 없을 때 사용)
  return convertColorToOklchBasic(colorValue);
}

// 기본 변환 함수 (간단한 근사치)
function convertColorToOklchBasic(colorValue) {
  // HEX 색상 (#ffffff, #fff)
  if (/^#?[0-9a-fA-F]{3,6}$/.test(colorValue)) {
    const hex = expandHex(colorValue);
    const rgb = hexToRgb(hex);
    if (rgb) {
      return rgbToOklchBasic(rgb.r, rgb.g, rgb.b);
    }
  }

  // RGB 색상 (rgb(255, 255, 255))
  const rgbMatch = colorValue.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1]);
    const g = parseInt(rgbMatch[2]);
    const b = parseInt(rgbMatch[3]);
    return rgbToOklchBasic(r, g, b);
  }

  // RGBA 색상 (rgba(255, 255, 255, 0.5))
  const rgbaMatch = colorValue.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
  if (rgbaMatch) {
    const r = parseInt(rgbaMatch[1]);
    const g = parseInt(rgbaMatch[2]);
    const b = parseInt(rgbaMatch[3]);
    const alpha = parseFloat(rgbaMatch[4]);
    return rgbToOklchBasic(r, g, b, alpha);
  }

  return null;
}

// HEX를 RGB로 변환
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// 짧은 HEX (#abc)를 긴 HEX로 변환
function expandHex(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  return hex.replace(shorthandRegex, (m, r, g, b) => {
    return `#${r}${r}${g}${g}${b}${b}`;
  });
}

// RGB를 oklch로 변환 (기본 근사치 - culori가 없을 때 사용)
function rgbToOklchBasic(r, g, b, alpha = 1) {
  // 간단한 근사치 변환
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  // Linear RGB 변환
  const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const rLinear = toLinear(rNorm);
  const gLinear = toLinear(gNorm);
  const bLinear = toLinear(bNorm);

  // XYZ 변환 (D65)
  const x = rLinear * 0.4124564 + gLinear * 0.3575761 + bLinear * 0.1804375;
  const y = rLinear * 0.2126729 + gLinear * 0.7151522 + bLinear * 0.072175;
  const z = rLinear * 0.0193339 + gLinear * 0.119192 + bLinear * 0.9503041;

  // OKLab 변환 (근사치)
  const l = Math.cbrt(0.4122214708 * rNorm + 0.5363325363 * gNorm + 0.0514459929 * bNorm);
  const m = Math.cbrt(0.2119034982 * rNorm + 0.6806995451 * gNorm + 0.1073969566 * bNorm);
  const s = Math.cbrt(0.0883024619 * rNorm + 0.2817188376 * gNorm + 0.6299787005 * bNorm);

  const okL = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s;
  const okA = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s;
  const okB = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;

  const c = Math.sqrt(okA * okA + okB * okB);
  const h = Math.atan2(okB, okA) * (180 / Math.PI);
  const hNormalized = h < 0 ? h + 360 : h;

  const lPercent = (okL * 100).toFixed(1);
  const cValue = c.toFixed(3);
  const hValue = hNormalized.toFixed(1);
  const alphaStr = alpha < 1 ? ` / ${alpha}` : '';

  return `oklch(${lPercent}% ${cValue} ${hValue}${alphaStr})`;
}

// 파일 내용에서 색상을 찾아서 변환
function convertColorsInContent(content, filePath) {
  let modified = false;
  let newContent = content;
  const replacements = [];

  // HEX 색상 찾기 (#ffffff, #fff) - 문자열 내부
  const hexPattern = /(['"`])(#[0-9a-fA-F]{3,6})\1/g;
  newContent = newContent.replace(hexPattern, (match, quote, hex) => {
    const oklch = convertColorToOklch(hex);
    if (oklch) {
      replacements.push({ from: hex, to: oklch });
      modified = true;
      return `${quote}${oklch}${quote}`;
    }
    return match;
  });

  // RGB/RGBA 색상 찾기 - 문자열 내부
  const rgbPattern = /(['"`])(rgb\([^)]+\)|rgba\([^)]+\))\1/g;
  newContent = newContent.replace(rgbPattern, (match, quote, rgb) => {
    const oklch = convertColorToOklch(rgb);
    if (oklch) {
      replacements.push({ from: rgb, to: oklch });
      modified = true;
      return `${quote}${oklch}${quote}`;
    }
    return match;
  });

  // CSS 파일에서도 찾기 (따옴표 없이) - CSS 변수, 속성 값 모두
  // CSS 변수: --variable: #fff;
  const cssVarHexPattern = /(--[a-zA-Z0-9-]+):\s*(#[0-9a-fA-F]{3,6})(?![^;]*\/\*)/gi;
  newContent = newContent.replace(cssVarHexPattern, (match, varName, hex) => {
    const oklch = convertColorToOklch(hex);
    if (oklch) {
      replacements.push({ from: `${varName}: ${hex}`, to: `${varName}: ${oklch}` });
      modified = true;
      return `${varName}: ${oklch}`;
    }
    return match;
  });

  const cssVarRgbPattern = /(--[a-zA-Z0-9-]+):\s*(rgb\([^)]+\)|rgba\([^)]+\))(?![^;]*\/\*)/gi;
  newContent = newContent.replace(cssVarRgbPattern, (match, varName, rgb) => {
    const oklch = convertColorToOklch(rgb);
    if (oklch) {
      replacements.push({ from: `${varName}: ${rgb}`, to: `${varName}: ${oklch}` });
      modified = true;
      return `${varName}: ${oklch}`;
    }
    return match;
  });

  // CSS 속성: color: #fff;
  const cssHexPattern = /(color|background|border[^:]*):\s*(#[0-9a-fA-F]{3,6})(?![^;]*\/\*)/gi;
  newContent = newContent.replace(cssHexPattern, (match, prop, hex) => {
    const oklch = convertColorToOklch(hex);
    if (oklch) {
      replacements.push({ from: `${prop}: ${hex}`, to: `${prop}: ${oklch}` });
      modified = true;
      return `${prop}: ${oklch}`;
    }
    return match;
  });

  const cssRgbPattern = /(color|background|border[^:]*):\s*(rgb\([^)]+\)|rgba\([^)]+\))(?![^;]*\/\*)/gi;
  newContent = newContent.replace(cssRgbPattern, (match, prop, rgb) => {
    const oklch = convertColorToOklch(rgb);
    if (oklch) {
      replacements.push({ from: `${prop}: ${rgb}`, to: `${prop}: ${oklch}` });
      modified = true;
      return `${prop}: ${oklch}`;
    }
    return match;
  });

  return { content: newContent, modified, replacements };
}

// 메인 함수
async function main() {
  console.log('색상 변환 시작...\n');
  console.log('참고: 더 정확한 변환을 위해 culori를 설치하세요: pnpm add -D culori\n');

  // 변환할 파일 패턴
  const patterns = [
    'src/**/*.{ts,tsx,js,jsx}',
    'src/**/*.css.ts',
    'src/**/*.css',
  ];

  let totalFiles = 0;
  let modifiedFiles = 0;
  const allReplacements = [];

  for (const pattern of patterns) {
    const files = await glob(pattern, {
      cwd: projectRoot,
      ignore: ['**/node_modules/**', '**/dist/**', '**/.next/**', '**/sdk/**'],
    });

    for (const file of files) {
      const filePath = join(projectRoot, file);
      try {
        const content = readFileSync(filePath, 'utf-8');
        const { content: newContent, modified, replacements } = convertColorsInContent(content, filePath);

        if (modified) {
          writeFileSync(filePath, newContent, 'utf-8');
          console.log(`✓ ${file}`);
          replacements.forEach(({ from, to }) => {
            console.log(`    ${from} → ${to}`);
          });
          modifiedFiles++;
          allReplacements.push(...replacements);
        }
        totalFiles++;
      } catch (error) {
        console.error(`✗ ${file}: ${error.message}`);
      }
    }
  }

  console.log(`\n완료! ${totalFiles}개 파일 중 ${modifiedFiles}개 파일이 수정되었습니다.`);
  console.log(`총 ${allReplacements.length}개의 색상이 변환되었습니다.`);
  
  if (!hasCulori) {
    console.log('\n⚠️  culori가 설치되지 않아 기본 변환 함수를 사용했습니다.');
    console.log('   더 정확한 변환을 위해 다음 명령어를 실행하세요:');
    console.log('   pnpm add -D culori');
  }
}

main().catch(console.error);
