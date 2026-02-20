import {
  createGlobalThemeContract,
  createGlobalTheme,
  globalStyle,
  assignVars,
} from '@vanilla-extract/css';

// 1. Contract 정의 (변수명 매핑)
// 구조를 Flat하게 유지하거나(충돌 방지), 그룹화 가능한 건 그룹화
export const vars = createGlobalThemeContract(
  {
    size: {
      xs: 'size-xs',
      sm: 'size-sm',
      md: 'size-md',
      base: 'size-base',
      lg: 'size-lg',
      xl: 'size-xl',
      '2xl': 'size-2xl',
      '3xl': 'size-3xl',
      '4xl': 'size-4xl',
      '5xl': 'size-5xl',
      '6xl': 'size-6xl',
      '7xl': 'size-7xl',
    },
    spacing: {
      none: 'spacing-none',
      xs: 'spacing-xs',
      sm: 'spacing-sm',
      md: 'spacing-md',
      base: 'spacing-base',
      lg: 'spacing-lg',
      xl: 'spacing-xl',
      '2xl': 'spacing-2xl',
      '3xl': 'spacing-3xl',
      '4xl': 'spacing-4xl',
      '5xl': 'spacing-5xl',
      '6xl': 'spacing-6xl',
      '7xl': 'spacing-7xl',
      // Semantic Spacing
      'title-description': 'spacing-title-description',
      'title-content': 'spacing-title-content',
      'title-content-large': 'spacing-title-content-large',
      'button-padding-y': 'spacing-button-padding-y',
      'button-padding-x': 'spacing-button-padding-x',
      'button-icon-text': 'spacing-button-icon-text',
      'button-group': 'spacing-button-group',
      'card-padding': 'spacing-card-padding',
      'card-padding-large': 'spacing-card-padding-large',
      'card-gap': 'spacing-card-gap',
      'card-gap-large': 'spacing-card-gap-large',
      'card-internal': 'spacing-card-internal',
      'card-section': 'spacing-card-section',
      tight: 'spacing-tight',
      normal: 'spacing-normal',
      relaxed: 'spacing-relaxed',
      loose: 'spacing-loose',
    },
    fontSize: {
      xs: 'font-size-xs',
      sm: 'font-size-sm',
      md: 'font-size-md',
      base: 'font-size-base',
      lg: 'font-size-lg',
      xl: 'font-size-xl',
      '2xl': 'font-size-2xl',
      '3xl': 'font-size-3xl',
      '4xl': 'font-size-4xl',
      '5xl': 'font-size-5xl',
      '6xl': 'font-size-6xl',
      '7xl': 'font-size-7xl',
      // Component specific
      sideBarTitle: 'fontSizeSideBarTitle',
      sideBarItem: 'fontSizeSideBarItem',
    },
    fontWeight: {
      light: 'font-weight-light',
      normal: 'font-weight-normal',
      medium: 'font-weight-medium',
      semibold: 'font-weight-semibold',
      bold: 'font-weight-bold',
    },
    lineHeight: {
      none: 'line-height-none',
      tight: 'line-height-tight',
      snug: 'line-height-snug',
      normal: 'line-height-normal',
      relaxed: 'line-height-relaxed',
      loose: 'line-height-loose',
    },
    radius: {
      none: 'radius-none',
      sm: 'radius-sm',
      md: 'radius-md',
      lg: 'radius-lg',
      base: 'radius-base',
      xl: 'radius-xl',
      '2xl': 'radius-2xl',
      '3xl': 'radius-3xl',
      full: 'radius-full',
    },
    borderWidth: {
      none: 'border-width-none',
      thin: 'border-width-thin',
      medium: 'border-width-medium',
      thick: 'border-width-thick',
    },
    transition: {
      bezier: 'transition-bezier',
      button: 'transition-button',
    },
    n: {
      bezier: 'n-bezier',
    },
    shadow: {
      xs: 'shadow-xs',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
      '2xl': 'shadow-2xl',
      inner: 'shadow-inner',
      none: 'shadow-none',
    },
    color: {
      // Neutral
      'neutral-0': 'color-neutral-0',
      'neutral-50': 'color-neutral-50',
      'neutral-100': 'color-neutral-100',
      'neutral-200': 'color-neutral-200',
      'neutral-300': 'color-neutral-300',
      'neutral-400': 'color-neutral-400',
      'neutral-500': 'color-neutral-500',
      'neutral-600': 'color-neutral-600',
      'neutral-700': 'color-neutral-700',
      'neutral-800': 'color-neutral-800',
      'neutral-900': 'color-neutral-900',
      'neutral-950': 'color-neutral-950',
      'neutral-1000': 'color-neutral-1000',

      // Semantic
      background: 'color-background',
      'background-hover': 'color-background-hover',
      'background-disabled': 'color-background-disabled',
      surface: 'color-surface',
      'surface-hover': 'color-surface-hover',

      text: 'color-text',
      'text-secondary': 'color-text-secondary',
      'text-muted': 'color-text-muted',
      'text-disabled': 'color-text-disabled',
      'text-heading': 'color-text-heading',
      'text-on-default': 'color-text-on-default',
      'text-on-primary': 'color-text-on-primary',
      'text-on-success': 'color-text-on-success',
      'text-on-info': 'color-text-on-info',
      'text-on-warning': 'color-text-on-warning',
      'text-on-error': 'color-text-on-error',
      'text-on-primary-dark': 'color-text-on-primary-dark',

      'section-title': 'color-section-title',
      'demo-title': 'color-demo-title',

      border: 'color-border',
      'border-hover': 'color-border-hover',
      'border-focus': 'color-border-focus',
      divider: 'color-divider',
      'button-border': 'color-button-border',

      // Base Hues
      default: 'color-default',
      primary: 'color-primary',
      secondary: 'color-secondary',
      tertiary: 'color-tertiary',
      success: 'color-success',
      warning: 'color-warning',
      error: 'color-error',
      info: 'color-info',
      white: 'color-white',

      // Brand
      'brand-primary-text': 'color-brand-primary-text',
      'brand-primary': 'color-brand-primary',
      'brand-primary-hover': 'color-brand-primary-hover',
      'brand-primary-active': 'color-brand-primary-active',
      'brand-primary-disabled': 'color-brand-primary-disabled',

      'brand-secondary-text': 'color-brand-secondary-text',
      'brand-secondary': 'color-brand-secondary',
      'brand-secondary-hover': 'color-brand-secondary-hover',
      'brand-secondary-active': 'color-brand-secondary-active',
      'brand-secondary-disabled': 'color-brand-secondary-disabled',

      'brand-tertiary-text': 'color-brand-tertiary-text',
      'brand-tertiary': 'color-brand-tertiary',
      'brand-tertiary-hover': 'color-brand-tertiary-hover',
      'brand-tertiary-active': 'color-brand-tertiary-active',
      'brand-tertiary-disabled': 'color-brand-tertiary-disabled',

      'brand-dashed-text': 'color-brand-dashed-text',
      'brand-dashed': 'color-brand-dashed',
      'brand-dashed-hover': 'color-brand-dashed-hover',
      'brand-dashed-active': 'color-brand-dashed-active',
      'brand-dashed-disabled': 'color-brand-dashed-disabled',

      'brand-quaternary-text': 'color-brand-quaternary-text',
      'brand-quaternary': 'color-brand-quaternary',
      'brand-quaternary-hover': 'color-brand-quaternary-hover',
      'brand-quaternary-active': 'color-brand-quaternary-active',
      'brand-quaternary-disabled': 'color-brand-quaternary-disabled',

      'focus-ring': 'color-focus-ring',

      // Semantic (Success/Warning/Error/Info)
      'semantic-default': 'color-semantic-default',
      'semantic-default-hover': 'color-semantic-default-hover',
      'semantic-default-active': 'color-semantic-default-active',
      'semantic-default-disabled': 'color-semantic-default-disabled',

      'semantic-defaultActive': 'color-semantic-defaultActive',
      'semantic-defaultActive-hover': 'color-semantic-defaultActive-hover',
      'semantic-defaultActive-active': 'color-semantic-defaultActive-active',
      'semantic-defaultActive-disabled': 'color-semantic-defaultActive-disabled',

      'semantic-success': 'color-semantic-success',
      'semantic-success-hover': 'color-semantic-success-hover',
      'semantic-success-active': 'color-semantic-success-active',
      'semantic-success-disabled': 'color-semantic-success-disabled',

      'semantic-warning': 'color-semantic-warning',
      'semantic-warning-hover': 'color-semantic-warning-hover',
      'semantic-warning-active': 'color-semantic-warning-active',
      'semantic-warning-disabled': 'color-semantic-success-disabled', // Note: Warning uses warning color, this key seems specific

      'semantic-error': 'color-semantic-error',
      'semantic-error-hover': 'color-semantic-error-hover',
      'semantic-error-active': 'color-semantic-error-active',
      'semantic-error-disabled': 'color-semantic-error-disabled',

      'semantic-info': 'color-semantic-info',
      'semantic-info-hover': 'color-semantic-info-hover',
      'semantic-info-active': 'color-semantic-info-active',
      'semantic-info-disabled': 'color-semantic-info-disabled',

      // Legacy
      // These map to vars, handle via alias in values? No, need explicit var definition
    },
    // Font families (in root, not under color)
    fontFamily: {
      nanumGothic: 'font-family-nanumGothic',
      nanumGothicCoding: 'font-family-nanumGothicCoding',
      sans: 'font-family-sans',
      mono: 'font-family-mono',
    },
    // Component specific colors (legacy?)
    sideBarTitleColor: 'fontSizeSideBarTitleColor',
    sideBarItemColor: 'fontSizeSideBarItemColor',
    hrColor: 'hrColor',
    logoInvert: 'logoInvert',
  },
  (value) => value as string// Contract 값이 곧 변수명 (-- prefix는 자동 추가되므로, -- 없이 정의해야 함? 아니면 -- 포함?)
  // Vanilla Extract는 value가 'color-background'면 '--color-background'로 생성합니다.
);

// 2. 기본 테마 (Dark) & Scale 값 정의
// :root에 적용
createGlobalTheme(':root', vars, {
  size: {
    xs: '0.75rem',
    sm: '0.85rem',
    md: '0.9rem',
    base: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '2.5rem',
    '4xl': '3rem',
    '5xl': '4rem',
    '6xl': '4rem',
    '7xl': '4rem',
  },
  spacing: {
    none: '0',
    xs: '0.75rem',
    sm: '0.85rem',
    md: '0.9rem',
    base: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '2.5rem',
    '4xl': '3rem',
    '5xl': '4rem',
    '6xl': '4rem',
    '7xl': '4rem',
    'title-description': '0.5rem',
    'title-content': '1rem',
    'title-content-large': '1.5rem',
    'button-padding-y': '0.5rem',
    'button-padding-x': '1.25rem',
    'button-icon-text': '0.5rem',
    'button-group': '1rem',
    'card-padding': '1.5rem',
    'card-padding-large': '2rem',
    'card-gap': '1.5rem',
    'card-gap-large': '2rem',
    'card-internal': '0.5rem',
    'card-section': '1.5rem',
    tight: '0.5rem',
    normal: '1rem',
    relaxed: '1.5rem',
    loose: '2rem',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.85rem',
    md: '0.9rem',
    base: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '2.5rem',
    '4xl': '3rem',
    '5xl': '4rem',
    '6xl': '4rem',
    '7xl': '4rem',
    sideBarTitle: 'calc(1rem - 0.07rem)',
    sideBarItem: 'calc(1rem - 0.1rem)',
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  radius: {
    none: '0',
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.375rem',
    base: '0.375rem',
    xl: '0.5rem',
    '2xl': '0.75rem',
    '3xl': '1rem',
    full: '9999px',
  },
  borderWidth: {
    none: '0',
    thin: '1px',
    medium: '2px',
    thick: '4px',
  },
  transition: {
    bezier: 'cubic-bezier(0.4, 0, 0.2, 1)',
    button:
      'color 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  n: {
    bezier: 'var(--transition-bezier)',
  },
  shadow: {
    xs: '0 1px 2px oklch(0% 0 0 / 0.05)',
    sm: '0 1px 3px oklch(0% 0 0 / 0.1), 0 1px 2px oklch(0% 0 0 / 0.06)',
    md: '0 4px 6px oklch(0% 0 0 / 0.1), 0 2px 4px oklch(0% 0 0 / 0.06)',
    lg: '0 10px 15px oklch(0% 0 0 / 0.1), 0 4px 6px oklch(0% 0 0 / 0.05)',
    xl: '0 20px 25px oklch(0% 0 0 / 0.1), 0 10px 10px oklch(0% 0 0 / 0.04)',
    '2xl': '0 25px 50px oklch(0% 0 0 / 0.25)',
    inner: 'inset 0 2px 4px oklch(0% 0 0 / 0.06)',
    none: 'none',
  },
  color: {
    // Dark Theme (Default)
    'neutral-0': 'oklch(0% 0 0)',
    'neutral-50': 'oklch(5% 0 0)',
    'neutral-100': 'oklch(10% 0 0)',
    'neutral-200': 'oklch(15% 0 0)',
    'neutral-300': 'oklch(20% 0 0)',
    'neutral-400': 'oklch(30% 0 0)',
    'neutral-500': 'oklch(40% 0 0)',
    'neutral-600': 'oklch(50% 0 0)',
    'neutral-700': 'oklch(65% 0 0)',
    'neutral-800': 'oklch(80% 0 0)',
    'neutral-900': 'oklch(90% 0 0)',
    'neutral-950': 'oklch(95% 0 0)',
    'neutral-1000': 'oklch(100% 0 0)',

    background: 'oklch(5% 0 0)',
    'background-hover': 'oklch(10% 0 0)',
    'background-disabled': 'oklch(30% 0 0)',
    surface: 'oklch(15% 0 0)',
    'surface-hover': 'oklch(15% 0 0)',

    text: 'oklch(65% 0 0)',
    'text-secondary': 'oklch(50% 0 0)',
    'text-muted': 'oklch(100% 0 0 / 0.3)',
    'text-disabled': 'oklch(50% 0 0)',
    'text-heading': 'oklch(90% 0 0)',
    'text-on-default': 'oklch(100% 0 0)',
    'text-on-primary': 'oklch(0% 0 0)',
    'text-on-success': 'oklch(0% 0 0)',
    'text-on-info': 'oklch(0% 0 0)',
    'text-on-warning': 'oklch(0% 0 0)',
    'text-on-error': 'oklch(0% 0 0)',
    'text-on-primary-dark': 'oklch(45% 0.15 255)',

    'section-title': 'oklch(27.81% 0 0)',
    'demo-title': 'oklch(30% 0 0)',

    border: 'oklch(100% 0 0 / 0.1)',
    'border-hover': 'oklch(100% 0 0 / 0.15)',
    'border-focus': 'oklch(100% 0 0 / 0.2)',
    divider: 'oklch(100% 0 0 / 0.08)',
    'button-border': 'oklch(0.463 0 0)',

    primary: '168',
    secondary: '168',
    tertiary: '168',
    default: '0',
    success: '168',
    warning: '82',
    error: '20',
    info: '231',
    white: '245',

    // Calculated Colors need 'calc' and 'var' strings
    'brand-primary-text': 'oklch(1 0 calc(var(--color-primary)))',
    'brand-primary': 'oklch(0.83 0.13 calc(var(--color-primary)))',
    'brand-primary-hover': 'oklch(0.86 0.11 calc(var(--color-primary) + 1.67))',
    'brand-primary-active': 'oklch(0.77 0.12 calc(var(--color-primary) + 1.19))',
    'brand-primary-disabled': 'oklch(0.83 0.13 calc(var(--color-primary)) / 0.4)',

    'brand-secondary-text': 'oklch(0.83 0.13 calc(var(--color-secondary)))',
    'brand-secondary': 'oklch(0.83 0.13 calc(var(--color-secondary)) / 0.16)',
    'brand-secondary-hover': 'oklch(0.86 0.11 calc(var(--color-secondary) + 0.67) / 0.07)',
    'brand-secondary-active': 'oklch(0.77 0.12 calc(var(--color-secondary) + 1.19))',
    'brand-secondary-disabled': 'oklch(0.83 0.13 calc(var(--color-secondary)) / 0.4)',

    'brand-tertiary-text': 'oklch(0.83 0.13 calc(var(--color-tertiary)))',
    'brand-tertiary': 'oklch(0.83 0.13 calc(var(--color-tertiary)) / 0.16)',
    'brand-tertiary-hover': 'oklch(0.86 0.11 calc(var(--color-tertiary) + 0.67) / 0.17)',
    'brand-tertiary-active': 'oklch(0.77 0.12 calc(var(--color-tertiary) + 1.19))',
    'brand-tertiary-disabled': 'oklch(0.83 0.13 calc(var(--color-tertiary)) / 0.4)',

    'brand-dashed-text': 'oklch(0.83 0.13 calc(var(--color-white)))',
    'brand-dashed': 'oklch(0.83 0.13 calc(var(--color-white)) / 0.16)',
    'brand-dashed-hover': 'oklch(1 0 calc(var(--color-white) + 0.67) / 0.10)',
    'brand-dashed-active': 'oklch(0.77 0.12 calc(var(--color-white) + 1.19))',
    'brand-dashed-disabled': 'oklch(0.83 0.13 calc(var(--color-white)) / 0.4)',

    'brand-quaternary-text': 'oklch(0.83 0.13 calc(var(--color-white)))',
    'brand-quaternary': 'oklch(0.83 0.13 calc(var(--color-white)) / 0.16)',
    'brand-quaternary-hover': 'oklch(1 0 calc(var(--color-white) + 0.67) / 0.10)',
    'brand-quaternary-active': 'oklch(0.77 0.12 calc(var(--color-white) + 1.19))',
    'brand-quaternary-disabled': 'oklch(0.83 0.13 calc(var(--color-white)) / 0.4)',

    'focus-ring': 'oklch(0.83 0.13 168 / 0.2)',

    'semantic-default': 'oklch(1 0 0)',
    'semantic-default-hover': 'oklch(0.97 0 0)',
    'semantic-default-active': 'oklch(1 0 0)',
    'semantic-default-disabled': 'oklch(0.97 0 0)',

    'semantic-defaultActive': 'oklch(1 0 0)',
    'semantic-defaultActive-hover': 'oklch(0.97 0 0)',
    'semantic-defaultActive-active': 'oklch(1 0 0)',
    'semantic-defaultActive-disabled': 'oklch(0.97 0 0)',

    'semantic-success': 'oklch(0.83 0.13 168)',
    'semantic-success-hover': 'oklch(0.86 0.11 169.67)',
    'semantic-success-active': 'oklch(0.77 0.12 168.19)',
    'semantic-success-disabled': 'oklch(0.83 0.13 calc(var(--color-success)) / 0.4)',

    'semantic-warning': 'oklch(0.83 0.13 calc(var(--color-warning)))',
    'semantic-warning-hover': 'oklch(0.86 0.11 calc(var(--color-warning) + 1.67))',
    'semantic-warning-active': 'oklch(0.77 0.12 calc(var(--color-warning) + 1.19))',
    'semantic-warning-disabled': 'oklch(0.83 0.13 calc(var(--color-warning)) / 0.4)',

    'semantic-error': 'oklch(0.71 0.13 20.77)',
    'semantic-error-hover': 'oklch(0.74 0.12 20.21)',
    'semantic-error-active': 'oklch(0.69 0.14 21.52)',
    'semantic-error-disabled': 'oklch(0.83 0.13 calc(var(--color-error)) / 0.4)',

    'semantic-info': 'oklch(0.77 0.1 231.66)',
    'semantic-info-hover': 'oklch(0.81 0.08 231.12)',
    'semantic-info-active': 'oklch(0.72 0.09 231.27)',
    'semantic-info-disabled': 'oklch(0.83 0.13 calc(var(--color-info)) / 0.4)',
  },
  fontFamily: {
    nanumGothic: "'Nanum Gothic', sans-serif",
    nanumGothicCoding: "'Nanum Gothic Coding', sans-serif",
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
    mono: "'Geist Mono', 'SF Mono', monospace",
  },
  sideBarTitleColor: 'var(--color-text-muted)',
  sideBarItemColor: 'var(--color-text-secondary)',
  hrColor: 'var(--color-divider)',
  logoInvert: 'invert(1)',
});

// 3. 라이트 테마 값 정의
const lightColors = {
  // Neutral Colors (Inverted)
  'neutral-0': 'oklch(100% 0 0)',
  'neutral-50': 'oklch(98% 0 0)',
  'neutral-100': 'oklch(96% 0 0)',
  'neutral-200': 'oklch(93% 0 0)',
  'neutral-300': 'oklch(91% 0 0)',
  'neutral-400': 'oklch(85% 0 0)',
  'neutral-500': 'oklch(68% 0 0)',
  'neutral-600': 'oklch(55% 0 0)',
  'neutral-700': 'oklch(42% 0 0)',
  'neutral-800': 'oklch(32% 0 0)',
  'neutral-900': 'oklch(22% 0 0)',
  'neutral-950': 'oklch(15% 0 0)',
  'neutral-1000': 'oklch(0% 0 0)',

  background: 'oklch(100% 0 0)',
  'background-hover': 'oklch(96% 0 0)',
  'background-disabled': 'oklch(96% 0 0)',
  surface: 'oklch(100% 0 0)',
  'surface-hover': 'oklch(96% 0 0)',

  text: 'oklch(32% 0 0)',
  'text-secondary': 'oklch(42% 0 0)',
  'text-muted': 'oklch(0% 0 0 / 0.3)',
  'text-disabled': 'oklch(68% 0 0)',
  'text-heading': 'oklch(22% 0 0)',
  'text-on-primary': 'oklch(100% 0 0)',
  'text-on-success': 'oklch(100% 0 0)',
  'text-on-info': 'oklch(100% 0 0)',
  'text-on-warning': 'oklch(100% 0 0)',
  'text-on-error': 'oklch(100% 0 0)',

  border: 'oklch(0% 0 0 / 0.1)',
  'border-hover': 'oklch(0% 0 0 / 0.15)',
  'border-focus': 'oklch(0% 0 0 / 0.2)',
  divider: 'oklch(0% 0 0 / 0.08)',

  'brand-dashed-hover': 'oklch(0 0 calc(var(--color-white) + 0.67) / 0.03)',
  'brand-quaternary-hover': 'oklch(0 0 calc(var(--color-white) + 0.67) / 0.03)',
};

const lightExtras = {
  sideBarTitleColor: 'var(--color-text-muted)',
  sideBarItemColor: 'var(--color-text-secondary)',
  hrColor: 'var(--color-divider)',
  logoInvert: 'invert(0)',
};

// 4. 라이트 테마 적용 (Data Attribute & Media Query)
// assignVars를 사용하여 vars.color 일부만 덮어씀

// Helper to assign colors
function partialAssign(contract: any, values: any) {
  const styles: Record<string, string> = {};
  for (const key in values) {
    if (contract[key]) {
      styles[contract[key]] = values[key];
    }
  }
  return styles;
}

const assignLightVars = {
  vars: {
    ...partialAssign(vars.color, lightColors),
    ...assignVars(
      {
        sideBarTitleColor: vars.sideBarTitleColor,
        sideBarItemColor: vars.sideBarItemColor,
        hrColor: vars.hrColor,
        logoInvert: vars.logoInvert,
      },
      lightExtras
    ),
  },
};

globalStyle(':root[data-theme="light"]', assignLightVars);

globalStyle('@media (prefers-color-scheme: light)', {
  vars: {
    // Media Query 내부에서는 selector가 없으므로 vars만 정의하면 안되고,
    // :root 스코프가 필요할 수 있음. 하지만 globalStyle의 두번째 인자는 StyleObject.
    // Media query 내에서 root 변수를 덮어쓰려면?
    // Vanilla Extract 문법상:
    // '@media (prefers-color-scheme: light)': {
    //   ':root': assignLightVars
    // }
    // 하지만 globalStyle은 단순 selector 하나만 받음.
  },
});

// Correct way for media query global override:
globalStyle(':root', {
  '@media': {
    '(prefers-color-scheme: light)': {
      vars: assignLightVars.vars, // data-theme='dark'가 아닐 때만?
                                  // :root:not([data-theme='dark']) 였음.
    },
  },
});

// 근데 data-theme='dark'가 있으면 media query보다 우선해야 함.
// :root[data-theme='dark']가 선언되면 media query보다 명시도가 높을까?
// 클래스가 붙으면 높음. 속성 선택자도 높음.
// Media query 내의 :root는 그냥 태그 선택자 수준.
// 따라서 [data-theme='dark']가 더 높은 명시도를 가지므로,
// Media query로 light가 되더라도 data-theme='dark'가 이김.
// 반대로 data-theme='light'도 명시도가 높아서 이김.
// 즉, 문제 없음.

// Legacy Variables (globals.css에서 --background 사용 등)
// createGlobalThemeContract의 매핑으로 이미 --background 변수가 생성됨.
// 따라서 별도 조치 불필요.
