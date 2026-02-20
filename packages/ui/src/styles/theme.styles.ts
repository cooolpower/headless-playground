export const defaultThemeCss = `
:root {
  /* Sizes & Spacing */
  --spacing-xs: 0.75rem;
  --spacing-sm: 0.85rem;
  --spacing-md: 0.9rem;
  --spacing-base: 1rem;
  --spacing-lg: 1.25rem;
  --spacing-xl: 1.5rem;
  --spacing-2xl: 2rem;

  /* Radius */
  --radius-sm: 0.125rem;
  --radius-md: 0.25rem;
  --radius-lg: 0.375rem;
  --radius-base: 0.375rem;
  --radius-xl: 0.5rem;

  /* Typography */
  /* 폰트 (Typography) */
  --font-family-nanumGothic: 'Nanum Gothic', sans-serif;
  --font-family-nanumGothicCoding: 'Nanum Gothic Coding', sans-serif;
  --font-family-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
  --font-family-mono: 'Geist Mono', 'SF Mono', monospace;

  --font-size-xs: 0.75rem;
  --font-size-sm: 0.85rem;
  --font-size-md: 0.9rem;
  --font-size-base: 1rem;
  --line-height-none: 1;
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;

  /* 컬러 - 기본 색조 (Base Hues) */
  --color-primary: 168;
  --color-success: 168;
  --color-warning: 82;
  --color-error: 20;
  --color-info: 231;
  --color-default: 0;
  --color-white: 245;

  /* 컬러 - 시맨틱 (Semantic) */
  --color-semantic-success: oklch(0.83 0.13 168);
  --color-semantic-success-hover: oklch(0.86 0.11 169.67);
  --color-semantic-info: oklch(0.77 0.1 231.66);
  --color-semantic-info-hover: oklch(0.81 0.08 231.12);
  --color-semantic-warning: oklch(0.83 0.13 var(--color-warning));
  --color-semantic-warning-hover: oklch(0.86 0.11 calc(var(--color-warning) + 1.67));
  --color-semantic-error: oklch(0.71 0.13 20.77);
  --color-semantic-error-hover: oklch(0.74 0.12 20.21);

  /* 컬러 - 바탕 및 텍스트 */
  --color-background: oklch(5% 0 0);
  --color-surface: oklch(15% 0 0);
  --color-text: oklch(65% 0 0);
  --color-text-heading: oklch(90% 0 0);
  --color-border: oklch(100% 0 0 / 0.1);
  --color-divider: oklch(100% 0 0 / 0.08);

  /* 컬러 - 상태별 텍스트 */
  --color-text-on-success: oklch(0% 0 0);
  --color-text-on-info: oklch(0% 0 0);
  --color-text-on-warning: oklch(0% 0 0);
  --color-text-on-error: oklch(0% 0 0);

  /* 브랜드 컬러 */
  --color-brand-primary: oklch(0.83 0.13 var(--color-primary));
  --color-brand-primary-hover: oklch(0.86 0.11 calc(var(--color-primary) + 1.67));
  --color-brand-primary-active: oklch(0.77 0.12 calc(var(--color-primary) + 1.19));

  /* 전환 효과 (Transitions) */
  --transition-bezier: cubic-bezier(0.4, 0, 0.2, 1);
  --transition-button: color 0.3s var(--transition-bezier), background-color 0.3s var(--transition-bezier), opacity 0.3s var(--transition-bezier), border-color 0.3s var(--transition-bezier);

  /* 그림자 (Shadows) */
  --shadow-sm: 0 1px 3px oklch(0% 0 0 / 0.1), 0 1px 2px oklch(0% 0 0 / 0.06);
  --shadow-lg: 0 10px 15px oklch(0% 0 0 / 0.1), 0 4px 6px oklch(0% 0 0 / 0.05);

  /* 버튼 및 기타 세부 변수 */
  --spacing-button-icon-text: 0.5rem;
  --color-background-disabled: oklch(30% 0 0);
  --color-text-disabled: oklch(50% 0 0);
  --color-defaultActive: 0; /* 기본 활성 상태 색조 */
}

[data-theme="light"] {
  --color-background: oklch(100% 0 0);
  --color-surface: oklch(100% 0 0);
  --color-text: oklch(32% 0 0);
  --color-text-heading: oklch(22% 0 0);
  --color-border: oklch(0% 0 0 / 0.1);
  --color-divider: oklch(0% 0 0 / 0.08);
  --color-text-on-success: oklch(100% 0 0);
  --color-text-on-info: oklch(100% 0 0);
  --color-text-on-warning: oklch(100% 0 0);
  --color-text-on-error: oklch(100% 0 0);
  --color-background-disabled: oklch(96% 0 0);
  --color-text-disabled: oklch(68% 0 0);
}
`;
