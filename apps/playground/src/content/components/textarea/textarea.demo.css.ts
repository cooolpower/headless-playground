import { style, globalStyle } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
});

export const sectionTitle = style({
  fontSize: 'var(--font-size-lg)',
  fontWeight: '600',
  color: 'var(--color-text)',
  marginBottom: 'var(--spacing-sm)',
});

export const valueDisplay = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
  marginTop: 'var(--spacing-sm)',
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: 'var(--spacing-base)',
  marginTop: 'var(--spacing-base)',
});

export const sizesContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-sm)',
});

export const statusContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-sm)',
});

export const textareaWrapper = style({
  position: 'relative',
  width: '100%',

  selectors: {
    '&[data-disabled="true"]': {
      opacity: 0.6,
      cursor: 'not-allowed',
      backgroundColor: 'var(--color-background-disabled)',
    },
  },
});

export const clearButton = style({
  position: 'absolute',
  right: 'var(--spacing-sm)',
  top: 'var(--spacing-sm)',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: 'var(--color-text-secondary)',
  padding: 'var(--spacing-xs)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'color 0.2s ease',
  zIndex: 1,
  ':hover': {
    color: 'var(--color-text)',
    backgroundColor: 'var(--color-surface-hover)',
  },
});

// Textarea 커스텀 스타일 (injectStyles=false일 때 사용)
const textareaCustomWrapper = style({});

globalStyle(`${textareaCustomWrapper} .hcTextareaWrap`, {
  position: 'relative',
  width: '100%',
});

globalStyle(`${textareaCustomWrapper} .hcTextarea`, {
  width: '100%',
  borderWidth: '2px',
  borderStyle: 'dashed',
  borderColor: 'var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  color: 'var(--color-text)',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  //fontFamily: 'var(--font-family-sans)',
  lineHeight: 'var(--line-height-normal)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${textareaCustomWrapper} .hcTextarea[data-disabled="true"]`, {
  background: 'transparent',
  color: 'var(--color-text-disabled)',
  cursor: 'not-allowed',
});

globalStyle(`${textareaCustomWrapper} .hcTextarea[data-size="small"]`, {
  padding: 'var(--spacing-sm) var(--spacing-base)',
  fontSize: 'var(--font-size-sm)',
  minHeight: '5rem',
});

globalStyle(`${textareaCustomWrapper} .hcTextarea[data-size="medium"]`, {
  padding: 'var(--spacing-base) var(--spacing-lg)',
  fontSize: 'var(--font-size-base)',
  minHeight: '6.25rem',
});

globalStyle(`${textareaCustomWrapper} .hcTextarea[data-size="large"]`, {
  padding: 'var(--spacing-lg) var(--spacing-xl)',
  fontSize: 'var(--font-size-lg)',
  minHeight: '7.5rem',
});

globalStyle(`${textareaCustomWrapper} .hcTextareaClear`, {
  position: 'absolute',
  top: 'var(--spacing-sm)',
  right: 'var(--spacing-sm)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '1.25rem',
  height: '1.25rem',
  padding: 0,
  border: 'none',
  borderRadius: 'var(--radius-sm)',
  background: 'transparent',
  color: 'var(--color-text-secondary)',
  cursor: 'pointer',
  transition: 'background-color 0.2s, color 0.2s',
});

globalStyle(`${textareaCustomWrapper} .hcTextareaClear:hover`, {
  background: 'var(--color-surface-hover)',
  color: 'var(--color-text)',
});

export const textareaWrapperClass = textareaCustomWrapper;
