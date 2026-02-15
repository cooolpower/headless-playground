import { style, styleVariants, globalStyle } from '@vanilla-extract/css';

// Demo-specific styles
export const section = style({
  display: 'flex',
  flexDirection: 'column',
  //gap: 'var(--spacing-md)',
  padding: '2rem',
  maxWidth: '600px',
});

// UI Color Design System - Following Cursor Rules
// 모든 색상은 globals.css의 CSS 변수를 사용합니다

export const sectionTitle = style({
  fontSize: 'var(--font-size-base)',
  fontWeight: '600',
  color: 'var(--color-text-heading)',
  margin: '0 0 1rem 0',
});

export const buttonGroup = style({
  display: 'flex',
  gap: 'var(--spacing-sm)',
  marginTop: '8px',
});

export const result = style({
  marginTop: '1.5rem',
  padding: '1rem',
  backgroundColor: 'var(--color-surface-hover)',
  borderRadius: 'var(--radius-lg)',
  border: '1px solid var(--color-divider)',
});

export const resultTitle = style({
  fontSize: 'var(--font-size-sm)',
  fontWeight: '600',
  margin: '0 0 0.5rem 0',
  color: 'var(--color-text-heading)',
});

// Form component styles (moved from headless component)
export const form = style({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '14px',
});

// 레이아웃 variants
export const layout = styleVariants({
  horizontal: {
    // 기본 horizontal 레이아웃
  },

  vertical: {
    // vertical 레이아웃
  },

  inline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    gap: 'var(--spacing-sm)',
  },
});

// 크기 variants
export const size = styleVariants({
  small: {
    fontSize: 'var(--font-size-sm)',
  },

  medium: {
    fontSize: 'var(--font-size-base)',
  },

  large: {
    fontSize: 'var(--font-size-lg)',
  },
});

// Form Item
export const formItem = style({
  display: 'flex',
  flexDirection: 'column',

  selectors: {
    '&:last-child': {
      marginBottom: 0,
    },
  },
});

// Form Item Label
export const formItemLabel = style({
  display: 'flex',
  fontWeight: '500',
  color: 'var(--color-text-heading)',
});

export const label = style({
  marginTop: '11px',
  marginRight: '8px',
  width: '90px',
  textAlign: 'right',
  fontSize: 'var(--font-size-sm)',
});

export const requiredMark = style({
  color: 'var(--color-semantic-error)',
  marginRight: '4px',
});

export const tooltip = style({
  color: 'var(--color-text-secondary)',
  cursor: 'help',
});

// Form Item Control
export const formItemControl = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
});

export const formItemControlInput = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: 'calc(100% - 21px)',
  minWidth: 0, // flex item이 부모보다 작아질 수 있도록
});

// Status에 따른 Input border 색상 (input 요소에 직접 적용)
export const statusInput = styleVariants({
  success: {
    borderColor: 'var(--color-semantic-success)',
  },
  warning: {
    borderColor: 'var(--color-semantic-warning)',
  },
  error: {
    borderColor: 'var(--color-semantic-error)',
  },
  validating: {
    borderColor: 'var(--color-semantic-info)',
  },
});

// Input 기본 border 색상 (statusInput이 없을 때 사용)
export const inputBase = style({
  borderColor: 'var(--color-divider, #d1d5db)',
});

export const formItemControlStatus = style({
  marginLeft: '8px',
  fontSize: 'var(--font-size-sm)',
});

export const inputWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-xs)',
  selectors: {
    // formItemLabel 다음에 inputWrapper가 올 때의 스타일
    [`${formItemLabel} + &`]: {
      //marginTop: 'var(--spacing-sm)',
    },
  },
});

export const status = styleVariants({
  success: {
    borderColor: 'var(--color-semantic-success)',
  },

  warning: {
    borderColor: 'var(--color-semantic-warning)',
  },

  error: {
    borderColor: 'var(--color-semantic-error)',
    borderWidth: '1px',
    borderStyle: 'solid',
  },

  validating: {
    borderColor: 'var(--color-semantic-info)',
  },
});

export const feedbackIcon = style({
  marginLeft: '8px',
  fontSize: 'var(--font-size-sm)',
});

// Form Item Help
export const formItemHelp = style({
  //marginTop: '6px',
  fontSize: 'var(--font-size-xs)',
  lineHeight: '1.5',
  color: 'var(--color-text-secondary)',
});

export const textSemanticError = style({
  color: 'var(--color-semantic-error)',
});

export const textSemanticSuccess = style({
  color: 'var(--color-semantic-success)',
});

export const textSemanticWarning = style({
  color: 'var(--color-semantic-warning)',
});

export const textSemanticValidating = style({
  color: 'var(--color-semantic-info)',
});

export const helpMessage = style({
  color: 'var(--color-text-secondary)',
});

export const errorMessage = style({
  color: 'var(--color-semantic-error)',
});

// Inline 레이아웃용 스타일
export const inlineItem = style({
  display: 'flex',
  //alignItems: 'center',
  marginBottom: '0',
});

export const inlineLabel = style({
  marginRight: '8px',
  marginBottom: '0',
});

// Form 커스텀 스타일 (injectStyles=false일 때 사용)
const formCustomWrapper = style({});

globalStyle(`${formCustomWrapper} .hcForm`, {
  display: 'flex',
  flexDirection: 'column',
  rowGap: 'var(--spacing-base)',
  fontSize: 'var(--font-size-base)',
  color: 'var(--color-text)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--spacing-lg)',
  background: 'var(--color-surface)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${formCustomWrapper} .hcFormItem`, {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-xs)',
});

globalStyle(`${formCustomWrapper} .hcFormItemLabel`, {
  display: 'flex',
  fontWeight: 500,
  color: 'var(--color-text-heading)',
});

globalStyle(`${formCustomWrapper} .hcFormItemRequiredMark`, {
  color: 'var(--color-semantic-error)',
  marginRight: '4px',
});

export const formWrapperClass = formCustomWrapper;
