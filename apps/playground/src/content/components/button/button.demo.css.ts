import { style, globalStyle, createVar } from '@vanilla-extract/css';

// UI Color Design System - Following Cursor Rules
// 모든 색상은 globals.css의 CSS 변수를 사용합니다 (하드코딩된 색상 값 사용 금지)

export const demoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-xl)',
});

export const demoTitle = style({
  fontSize: 'var(--font-size-lg)',
  fontWeight: '600',
  color: 'var(--color-demo-title)',
  margin: 0,
  marginBottom: 'var(--spacing-title-content)', // 타이틀과 콘텐츠 간격
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-xs)',
});

export const sectionTitle = style({
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  color: 'var(--color-text-secondary)',
  margin: 0,
  marginBottom: 'var(--spacing-title-content)', // 타이틀과 콘텐츠 간격
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const buttonGroup = style({
  display: 'flex',
  gap: 'var(--spacing-button-group)', // 같은 성격의 버튼 그룹 간격
  flexWrap: 'wrap',
  alignItems: 'center',
});

export const discription = style({
  fontSize: 'var(--font-size-md)',
  color: 'var(--color-text-secondary)',
  marginTop: 'var(--spacing-button-paddingY)'
});

export const buttonBg = createVar();
export const buttonBgHover = createVar();
export const buttonBgActive = createVar();
export const buttonText = createVar();
export const buttonBorder = createVar();
export const buttonBorderHover = createVar();
export const buttonBorderActive = createVar();

export const buttonSuccess = createVar();
export const buttonWarn = createVar();
export const buttonInfo = createVar();
export const buttonError = createVar();

export const buttonHue = createVar();



// Base button style - Naive UI inspired
export const demoButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--spacing-button-icon-text)', // 버튼 내부 아이콘-텍스트 간격
  borderRadius: '3px', // Naive UI uses smaller radius
  cursor: 'pointer',
  fontSize: 'var(--font-size-sm)',
  fontWeight: '400', // Naive UI uses normal weight
  transition: 'var(--transition-button)', // Naive UI transition
  userSelect: 'none',
  padding: 'var(--spacing-button-paddingY) var(--spacing-button-padding-x)', // 광학적 균형: 상하보다 좌우가 2.5배
  height: 'var(--spacing-2xl)', // Naive UI medium height
  lineHeight: '1',
  whiteSpace: 'nowrap',
  outline: 'none',
  vars: {
    [buttonBg]: 'transparent',
    [buttonBgHover]: 'transparent',
    [buttonBgActive]: 'transparent',
    [buttonText]: 'inherit',
    [buttonBorder]: 'none',
    [buttonBorderHover]: 'none',
    [buttonBorderActive]: 'none',
  },
  backgroundColor: buttonBg,
  border: buttonBorder,
  color: buttonText,

  ':hover': {
    backgroundColor: buttonBgHover,
    border: buttonBorderHover,
  },

  ':active': {
    backgroundColor: buttonBgActive,
    border: buttonBorderActive,
    transform: 'scale(0.98)',
  },

  ':focus-visible': {
    outline: buttonBorderHover,
    outlineOffset: '2px',
  },

  selectors: {
    '&[data-disabled="true"]': {
      backgroundColor: 'var(--color-background-disabled)',
      color: 'var(--color-text-disabled)',
      borderColor: 'var(--color-divider)',
      cursor: 'not-allowed',
      transform: 'none',
    },
  },
});

globalStyle(`[data-button-color="success"]`, {
  vars: {
    [buttonHue]: 'var(--color-success)',
  }
});

globalStyle(`[data-button-color="warn"]`, {
  vars: {
    [buttonHue]: 'var(--color-warn)',
  }
});

globalStyle(`[data-button-color="info"]`, {
  vars: {
    [buttonHue]: 'var(--color-info)',
  }
});

globalStyle(`[data-button-color="error"]`, {
  vars: {
    [buttonHue]: 'var(--color-error)',
  }
});

globalStyle(`${demoButton}[data-button-type="primary"]`, {
  vars: {
    [buttonBg]: `oklch(0.83 0.13 calc(${buttonHue}))`,
    [buttonBgHover]: `oklch(0.86 0.11 calc(${buttonHue} + 1.67))`,
    [buttonBgActive]: `oklch(0.77 0.12 calc(${buttonHue} + 1.19))`,
    [buttonText]: `oklch(0.1 0.12 ${buttonHue})`,
    [buttonBorder]: `1px solid calc(${buttonHue})`,
    [buttonBorderHover]: `1px solid calc(${buttonHue})`,
    [buttonBorderActive]: `1px solid calc(${buttonHue})`
  }
});



globalStyle(`${demoButton}[data-button-type="secondary"]`, {
  vars: {
    [buttonBg]: `oklch(0.83 0.13 calc(${buttonHue}) / 0.16)`,
    [buttonBgHover]: `oklch(0.86 0.11 calc(${buttonHue} + 0.67) / 0.07)`,
    [buttonBgActive]: `oklch(0.77 0.12 calc(${buttonHue} + 1.19))`,
    [buttonText]: `oklch(0.7 0.13 calc(${buttonHue}))`,
    [buttonBorder]: `1px solid calc(${buttonHue})`,//`1px solid oklch(0.83 0.13 ${buttonHue}) / 0.16)`,
    [buttonBorderHover]: `1px solid oklch(0.86 0.11 calc(${buttonHue} + 0.67))`,
    [buttonBorderActive]: `1px solid oklch(0.77 0.12 calc(${buttonHue} + 1.19))`
  }
});

globalStyle(`${demoButton}[data-button-type="tertiary"]`, {
  vars: {
    [buttonBg]: `transparent`,
    [buttonBgHover]: `oklch(0.86 0.11 calc(${buttonHue} + 0.67) / 0.17)`,
    [buttonBgActive]: `oklch(0.77 0.12 calc(${buttonHue} + 1.19))`,
    [buttonText]: `oklch(0.83 0.13 ${buttonHue})`,
    [buttonBorder]: `1px solid transparent`,
    [buttonBorderHover]: `1px solid oklch(0.86 0.11 calc(${buttonHue} + 0.67) / 0.17)`,
    [buttonBorderActive]: `1px solid oklch(0.77 0.12 calc(${buttonHue} + 1.19))`
  }
});

globalStyle(`${demoButton}[data-button-type="dashed"]`, {
  vars: {
    [buttonBg]: `transparent`,
    [buttonBgHover]: `oklch(0.86 0.11 calc(${buttonHue} + 0.67) / 0.07)`,
    [buttonBgActive]: `oklch(0.77 0.12 calc(${buttonHue} + 1.19))`,
    [buttonText]: `oklch(0.83 0.13 calc(${buttonHue}))`,
    [buttonBorder]: `1px dashed oklch(0.83 0.13 ${buttonHue})`,
    [buttonBorderHover]: `1px dashed oklch(0.86 0.11 ${buttonHue} / 0.9)`,
    [buttonBorderActive]: `1px dashed oklch(1 0 calc(${buttonHue} + 1.19))`
  }
});

globalStyle(`${demoButton}[data-button-type="quaternary"]`, {
  vars: {
    [buttonBg]: `transparent`,
    [buttonBgHover]: `oklch(1 0 calc(${buttonHue} + 0.67) / 0.10)`,
    [buttonBgActive]: `oklch(0.77 0.12 calc(${buttonHue} + 1.19))`,
    [buttonText]: `oklch(0.83 0.13 calc(${buttonHue}))`,
    [buttonBorder]: `transparent`,
    [buttonBorderHover]: `transparent`,
    [buttonBorderActive]: `transparent`
  }
});

globalStyle(`[data-theme="light"] ${demoButton}[data-button-type="primary"]`, {
  vars: {
    [buttonText]: `oklch(1 0 calc(${buttonHue}))`,
  },
});

// Size variants - Naive UI sizes
export const tiny = style({
  height: '22px',
  padding: '0 var(--spacing-sm)',
  fontSize: 'var(--font-size-xs)',
  borderRadius: '2px',
});

export const small = style({
  height: '1.75rem',
  padding: '0 12px',
  fontSize: '0.8125rem',
  borderRadius: '3px',
});

export const medium = style({
  height: 'var(--spacing-2xl)',
  padding: '0 14px',
  fontSize: 'var(--font-size-sm)',
  borderRadius: '3px',
});

export const large = style({
  height: '2.25rem',
  padding: '0 16px',
  fontSize: 'var(--font-size-sm)',
  borderRadius: '4px',
});

export const huge = style({
  height: '40px',
  padding: '0 20px',
  fontSize: '0.9375rem',
  borderRadius: '4px',
});


// Color variants - 밝은 배경에 검정색 텍스트 (Naive UI)
const infoVariant = style({
  backgroundColor: 'var(--color-semantic-info)',
  borderColor: 'var(--color-semantic-info)',
  border: '1px solid var(--color-semantic-info)',
  color: 'var(--color-text-on-info)', // 검정색 텍스트

  ':hover': {
    backgroundColor: 'var(--color-semantic-info-hover)',
    borderColor: 'var(--color-semantic-info-hover)',
  },

  ':active': {
    backgroundColor: 'var(--color-semantic-info-active)',
    borderColor: 'var(--color-semantic-info-active)',
  },
});

export const info = style([demoButton, infoVariant]);

const successVariant = style({
  backgroundColor: 'var(--color-semantic-success)',
  borderColor: 'var(--color-semantic-success)',
  border: '1px solid var(--color-semantic-success)',
  color: 'var(--color-text-on-success)', // 검정색 텍스트

  ':hover': {
    backgroundColor: 'var(--color-semantic-success-hover)',
    borderColor: 'var(--color-semantic-success-hover)',
  },

  ':active': {
    backgroundColor: 'var(--color-semantic-success-active)',
    borderColor: 'var(--color-semantic-success-active)',
  },
});

export const success = style([demoButton, successVariant]);

const warningVariant = style({
  backgroundColor: 'var(--color-semantic-warning)',
  borderColor: 'var(--color-semantic-warning)',
  border: '1px solid var(--color-semantic-warning)',
  color: 'var(--color-text-on-warning)', // 검정색 텍스트

  ':hover': {
    backgroundColor: 'var(--color-semantic-warning-hover)',
    borderColor: 'var(--color-semantic-warning-hover)',
  },

  ':active': {
    backgroundColor: 'var(--color-semantic-warning-active)',
    borderColor: 'var(--color-semantic-warning-active)',
  },
});

export const warning = style([demoButton, warningVariant]);

const errorVariant = style({
  backgroundColor: 'var(--color-semantic-error)',
  borderColor: 'var(--color-semantic-error)',
  border: '1px solid var(--color-semantic-error)',
  color: 'var(--color-text-on-error)', // 검정색 텍스트

  ':hover': {
    backgroundColor: 'var(--color-semantic-error-hover)',
    borderColor: 'var(--color-semantic-error-hover)',
  },

  ':active': {
    backgroundColor: 'var(--color-semantic-error-active)',
    borderColor: 'var(--color-semantic-error-active)',
  },
});

export const error = style([demoButton, errorVariant]);

export const destructive = error;

export const loading = style({
  opacity: 0.7,
  cursor: 'not-allowed',
  pointerEvents: 'none',
  position: 'relative',

  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '16px',
      height: '16px',
      margin: 'auto',
      border: '2px solid transparent',
      borderTopColor: 'currentColor',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      transform: 'translate(-50%, -50%)',
    },
  },
});

export const icon = style({
  width: '32px',
  height: 'var(--spacing-2xl)',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const controls = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-md)',
  padding: 'var(--spacing-base)',
  border: '1px solid var(--color-divider)',
  borderRadius: '4px',
  backgroundColor: 'var(--color-surface-hover)',
});

export const controlItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-sm)',
  fontSize: 'var(--font-size-base)',
  color: 'var(--color-text)',
  cursor: 'pointer',

  ':hover': {
    color: 'var(--color-text)',
  },
});

export const controlDescription = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
  lineHeight: '1.5',
  margin: 0,
});

export const withIcon = style({
  gap: 'var(--spacing-sm)',
});

export const rounded = style({
  borderRadius: '16px', // More rounded for icon buttons
});

export const example = style({
  padding: 'var(--spacing-base)',
  border: '1px solid var(--color-divider)',
  borderRadius: '4px',
  backgroundColor: 'var(--color-surface)',
});

export const buttonRow = style({
  display: 'flex',
  gap: 'var(--spacing-sm)',
  alignItems: 'center',
  flexWrap: 'wrap',
});

export const codeBlock = style({
  marginTop: '16px',
  position: 'relative',
});

export const code = style({
  backgroundColor: 'var(--color-surface)',
  borderRadius: '4px',
  padding: 'var(--spacing-base)',
  fontSize: 'var(--font-size-sm)',
  lineHeight: '1.5',
  overflowX: 'auto',
  fontFamily:
    'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  color: 'var(--color-text)',
  border: '1px solid var(--color-divider)',
  margin: 0,
});

// Button 커스텀 스타일 (injectStyles=false일 때 사용)
// 전역 스타일로 hcButton 클래스를 스타일링
const buttonWrapper = style({});

export const currentPageNumber = style({
  padding: '0 var(--spacing-sm)',
  color: 'var(--color-text-secondary)',
  fontSize: 'var(--font-size-sm)',
});

// injectStyles=false일 때 적용되는 커스텀 스타일 (명확한 차이를 위해 완전히 다른 스타일 적용)
// 기본 스타일: 일반적인 버튼 스타일
// 커스텀 스타일: 더 두꺼운 테두리 + 그림자 + 다른 패딩
globalStyle(`${buttonWrapper} .hcButton`, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  userSelect: 'none',
  cursor: 'pointer',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  color: 'var(--color-text)',
  padding: 'var(--spacing-base) var(--spacing-xl)',
  fontSize: 'var(--font-size-base)',
  lineHeight: 1,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.2s ease',
});

globalStyle(`${buttonWrapper} .hcButton:hover`, {
  background: 'var(--color-surface-hover)',
  borderColor: 'var(--color-brand-primary)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  transform: 'translateY(-1px)',
});

globalStyle(`${buttonWrapper} .hcButton:focus-visible`, {
  outline: '2px solid var(--color-semantic-info)',
  outlineOffset: '2px',
});

globalStyle(`${buttonWrapper} .hcButton[data-disabled="true"]`, {
  background: 'var(--color-background-disabled)',
  color: 'var(--color-text-disabled)',
  borderColor: 'var(--color-divider)',
  cursor: 'not-allowed',
  boxShadow: 'none',
  transform: 'none',
});

export const buttonWrapperClass = buttonWrapper;
