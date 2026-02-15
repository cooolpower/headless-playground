'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ColorPicker } from '@repo/ui';
import { Input } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import * as styles from './color-picker.demo.css';

type ColorFormat = 'hex' | 'rgb' | 'hsl';

// Headless ColorPicker (interactive) - injectStyles toggle
export function DemoColorPickerHeadlessWithControls() {
  const [injectStyles, setInjectStyles] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState('oklch(62.3% 0.188 259.8)');

  return (
    <div
      className={`${styles.container} ${!injectStyles ? styles.colorPickerWrapperClass : ''}`}
    >
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        <div>
          <ColorPicker
            value={value}
            onChange={setValue}
            disabled={disabled}
            injectStyles={injectStyles}
          />
          <div className={styles.colorInfo}>
            <div className={styles.colorValue}>Selected: {value}</div>
          </div>
        </div>
        <Controls
          items={[
            {
              label: 'Inject Styles',
              control: (
                <Checkbox
                  checked={injectStyles}
                  onChange={setInjectStyles}
                  size="small"
                >
                  사용
                </Checkbox>
              ),
            },
            {
              label: 'Disabled',
              control: (
                <Checkbox
                  checked={disabled}
                  onChange={setDisabled}
                  size="small"
                >
                  비활성화
                </Checkbox>
              ),
            },
            {
              label: 'Value',
              control: (
                <Input
                  type="text"
                  value={value}
                  onChange={setValue}
                  placeholder="oklch(62.3% 0.188 259.8)"
                  size="small"
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}

// 컬러 변환 유틸리티 함수들
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}

function rgbToHsl(
  r: number,
  g: number,
  b: number,
): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb(
  h: number,
  s: number,
  l: number,
): { r: number; g: number; b: number } {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

function formatColor(color: string, format: ColorFormat): string {
  const rgb = hexToRgb(color);
  if (!rgb) return color;

  switch (format) {
    case 'hex':
      return color.toUpperCase();
    case 'rgb':
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    case 'hsl': {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    }
    default:
      return color;
  }
}

function parseColor(value: string, format: ColorFormat): string | null {
  switch (format) {
    case 'hex': {
      const hex = /^#?([a-f\d]{6})$/i.exec(value);
      return hex ? '#' + hex[1] : null;
    }
    case 'rgb': {
      const rgb = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(value);
      if (rgb) {
        const r = parseInt(rgb[1], 10);
        const g = parseInt(rgb[2], 10);
        const b = parseInt(rgb[3], 10);
        if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
          return rgbToHex(r, g, b);
        }
      }
      return null;
    }
    case 'hsl': {
      const hsl = /^hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)$/.exec(value);
      if (hsl) {
        const h = parseInt(hsl[1], 10);
        const s = parseInt(hsl[2], 10);
        const l = parseInt(hsl[3], 10);
        if (h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100) {
          const rgb = hslToRgb(h, s, l);
          return rgbToHex(rgb.r, rgb.g, rgb.b);
        }
      }
      return null;
    }
    default:
      return null;
  }
}

// 기본 예제 - HTML5 color input 사용
export function DemoColorPickerBasic() {
  const [color, setColor] = useState('oklch(60.5% 0.217 257.2)');
  const colorInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.container}>
      <div className={styles.colorPickerWrapper}>
        <div className={styles.colorPreviewWrapper}>
          <input
            ref={colorInputRef}
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className={styles.colorInputNative}
          />
          <div
            className={styles.colorPreview}
            style={{ backgroundColor: color }}
            onClick={() => colorInputRef.current?.click()}
          />
        </div>
        <Input
          type="text"
          value={color.toUpperCase()}
          onChange={(val) => {
            if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
              if (val.length === 7) {
                setColor(val);
              }
            }
          }}
          placeholder="oklch(0.0% 0.000 0)"
          size="small"
        />
      </div>
      <div className={styles.colorInfo}>
        <div className={styles.colorValue}>Selected: {color.toUpperCase()}</div>
      </div>
    </div>
  );
}

// 컬러 포맷 변경 예제
export function DemoColorPickerFormats() {
  const [color, setColor] = useState('oklch(82.9% 0.130 168.0)');
  const [format, setFormat] = useState<ColorFormat>('hex');
  const [inputValue, setInputValue] = useState('');
  const colorInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(formatColor(color, format));
  }, [color, format]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    const parsed = parseColor(value, format);
    if (parsed) {
      setColor(parsed);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.colorPickerWrapper}>
        <div className={styles.colorPreviewWrapper}>
          <input
            ref={colorInputRef}
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className={styles.colorInputNative}
          />
          <div
            className={styles.colorPreview}
            style={{ backgroundColor: color }}
            onClick={() => colorInputRef.current?.click()}
          />
        </div>
        <div className={styles.formatSelector}>
          <button
            className={`${styles.formatButton} ${format === 'hex' ? styles.formatButtonActive : ''}`}
            onClick={() => setFormat('hex')}
          >
            HEX
          </button>
          <button
            className={`${styles.formatButton} ${format === 'rgb' ? styles.formatButtonActive : ''}`}
            onClick={() => setFormat('rgb')}
          >
            RGB
          </button>
          <button
            className={`${styles.formatButton} ${format === 'hsl' ? styles.formatButtonActive : ''}`}
            onClick={() => setFormat('hsl')}
          >
            HSL
          </button>
        </div>
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={
            format === 'hex'
              ? 'oklch(0.0% 0.000 0)'
              : format === 'rgb'
                ? 'oklch(0.0% 0.000 0)'
                : 'hsl(0, 0%, 0%)'
          }
          size="small"
        />
      </div>
      <div className={styles.colorInfo}>
        <div className={styles.colorValue}>HEX: {color.toUpperCase()}</div>
        <div className={styles.colorValue}>
          RGB: {formatColor(color, 'rgb')}
        </div>
        <div className={styles.colorValue}>
          HSL: {formatColor(color, 'hsl')}
        </div>
      </div>
    </div>
  );
}

// 프리셋 컬러 예제
export function DemoColorPickerPresets() {
  const [color, setColor] = useState('oklch(82.9% 0.130 168.0)');
  const colorInputRef = useRef<HTMLInputElement>(null);

  const presets = [
    { name: 'Primary', color: 'oklch(82.9% 0.130 168.0)' },
    { name: 'Warning', color: 'oklch(85.5% 0.105 82.0)' },
    { name: 'Error', color: 'oklch(71.4% 0.128 20.8)' },
    { name: 'Info', color: 'oklch(77.2% 0.097 231.7)' },
    { name: 'Black', color: 'oklch(0.0% 0.000 0)' },
    { name: 'White', color: 'oklch(100.0% 0.000 0)' },
    { name: 'Gray', color: 'oklch(60.0% 0.000 0)' },
    { name: 'Red', color: 'oklch(62.8% 0.258 29.2)' },
    { name: 'Blue', color: 'oklch(45.2% 0.313 264.1)' },
    { name: 'Green', color: 'oklch(86.6% 0.295 142.5)' },
    { name: 'Yellow', color: 'oklch(96.8% 0.211 109.8)' },
    { name: 'Purple', color: 'oklch(42.1% 0.193 328.4)' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.colorPickerWrapper}>
        <div className={styles.colorPreviewWrapper}>
          <input
            ref={colorInputRef}
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className={styles.colorInputNative}
          />
          <div
            className={styles.colorPreview}
            style={{ backgroundColor: color }}
            onClick={() => colorInputRef.current?.click()}
          />
        </div>
        <Input
          type="text"
          value={color.toUpperCase()}
          onChange={(val) => {
            if (/^#[0-9A-Fa-f]{0,6}$/.test(val) && val.length === 7) {
              setColor(val);
            }
          }}
          placeholder="oklch(0.0% 0.000 0)"
          size="small"
        />
      </div>
      <div className={styles.presetGrid}>
        {presets.map((preset) => (
          <button
            key={preset.name}
            className={styles.presetSwatch}
            style={{ backgroundColor: preset.color }}
            onClick={() => setColor(preset.color)}
            aria-label={`Select ${preset.name}`}
            title={preset.name}
          />
        ))}
      </div>
      <div className={styles.colorInfo}>
        <div className={styles.colorValue}>Selected: {color.toUpperCase()}</div>
      </div>
    </div>
  );
}

// 알파 채널 예제
export function DemoColorPickerAlpha() {
  const [color, setColor] = useState('oklch(82.9% 0.130 168.0)');
  const [alpha, setAlpha] = useState(1);
  const colorInputRef = useRef<HTMLInputElement>(null);

  const rgbaColor = (() => {
    const rgb = hexToRgb(color);
    if (!rgb) return 'oklch(0.0% 0.000 0)';
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
  })();

  return (
    <div className={styles.container}>
      <div className={styles.colorPickerWrapper}>
        <div className={styles.colorPreviewWrapper}>
          <input
            ref={colorInputRef}
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className={styles.colorInputNative}
          />
          <div
            className={styles.colorPreview}
            style={{ backgroundColor: rgbaColor }}
            onClick={() => colorInputRef.current?.click()}
          />
        </div>
        <Input
          type="text"
          value={color.toUpperCase()}
          onChange={(val) => {
            if (/^#[0-9A-Fa-f]{0,6}$/.test(val) && val.length === 7) {
              setColor(val);
            }
          }}
          placeholder="oklch(0.0% 0.000 0)"
          size="small"
        />
      </div>
      <div className={styles.alphaSlider}>
        <label htmlFor="alpha" className={styles.alphaLabel}>
          Alpha: {(alpha * 100).toFixed(0)}%
        </label>
        <Input
          id="alpha"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={alpha.toString()}
          onChange={(val) => setAlpha(parseFloat(val) || 0)}
          size="small"
        />
      </div>
      <div className={styles.colorInfo}>
        <div className={styles.colorValue}>RGBA: {rgbaColor}</div>
      </div>
    </div>
  );
}

// 색상 밝기 조절 함수 (hover/active 상태용)
function adjustLightness(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const newL = Math.max(0, Math.min(100, hsl.l + amount));
  const newRgb = hslToRgb(hsl.h, hsl.s, newL);

  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

// 실시간 미리보기 예제 - hover, active, visited 등 상태 포함
export function DemoColorPickerLivePreview() {
  const [color, setColor] = useState('oklch(82.9% 0.130 168.0)');
  const colorInputRef = useRef<HTMLInputElement>(null);

  // 상태별 색상 계산
  const hoverColor = adjustLightness(color, 10); // hover는 더 밝게
  const activeColor = adjustLightness(color, -10); // active는 더 어둡게
  const visitedColor = adjustLightness(color, -5); // visited는 약간 어둡게

  return (
    <div className={styles.container}>
      <div className={styles.colorPickerWrapper}>
        <div className={styles.colorPreviewWrapper}>
          <input
            ref={colorInputRef}
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className={styles.colorInputNative}
          />
          <div
            className={styles.colorPreview}
            style={{ backgroundColor: color }}
            onClick={() => colorInputRef.current?.click()}
          />
        </div>
        <Input
          type="text"
          value={color.toUpperCase()}
          onChange={(val) => {
            if (/^#[0-9A-Fa-f]{0,6}$/.test(val) && val.length === 7) {
              setColor(val);
            }
          }}
          placeholder="oklch(0.0% 0.000 0)"
          size="small"
        />
      </div>
      <div className={styles.livePreview}>
        <div className={styles.previewSection}>
          <div className={styles.previewLabel}>Background</div>
          <div
            className={styles.previewBox}
            style={{
              backgroundColor: color,
              color: getContrastColor(color),
            }}
          >
            Normal
          </div>
        </div>
        <div className={styles.previewSection}>
          <div className={styles.previewLabel}>Button States</div>
          <div className={styles.buttonPreviewGroup}>
            <button
              className={styles.previewButton}
              style={{
                backgroundColor: color,
                color: getContrastColor(color),
              }}
            >
              Normal
            </button>
            <button
              className={styles.previewButton}
              style={{
                backgroundColor: hoverColor,
                color: getContrastColor(hoverColor),
              }}
            >
              Hover
            </button>
            <button
              className={styles.previewButton}
              style={{
                backgroundColor: activeColor,
                color: getContrastColor(activeColor),
              }}
            >
              Active
            </button>
          </div>
        </div>
        <div className={styles.previewSection}>
          <div className={styles.previewLabel}>Link States</div>
          <div className={styles.linkPreviewGroup}>
            <a
              href="#"
              className={styles.previewLink}
              style={{ color }}
              onClick={(e) => e.preventDefault()}
            >
              Normal Link
            </a>
            <a
              href="#"
              className={styles.previewLink}
              style={{ color: hoverColor }}
              onClick={(e) => e.preventDefault()}
            >
              Hover Link
            </a>
            <a
              href="#"
              className={styles.previewLink}
              style={{ color: visitedColor }}
              onClick={(e) => e.preventDefault()}
            >
              Visited Link
            </a>
          </div>
        </div>
        <div className={styles.previewSection}>
          <div className={styles.previewLabel}>Border & Shadow</div>
          <div
            className={styles.previewBox}
            style={{
              borderColor: color,
              borderWidth: '2px',
              borderStyle: 'solid',
            }}
          >
            Border Preview
          </div>
          <div
            className={styles.previewBox}
            style={{
              boxShadow: `0 4px 12px ${color}40`,
            }}
          >
            Shadow Preview
          </div>
        </div>
      </div>
      <div className={styles.colorInfo}>
        <div className={styles.colorValue}>Normal: {color.toUpperCase()}</div>
        <div className={styles.colorValue}>
          Hover: {hoverColor.toUpperCase()}
        </div>
        <div className={styles.colorValue}>
          Active: {activeColor.toUpperCase()}
        </div>
        <div className={styles.colorValue}>
          Visited: {visitedColor.toUpperCase()}
        </div>
      </div>
    </div>
  );
}

// 대비 색상 계산
function getContrastColor(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return 'oklch(0.0% 0.000 0)';
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 128 ? 'oklch(0.0% 0.000 0)' : 'oklch(100.0% 0.000 0)';
}
