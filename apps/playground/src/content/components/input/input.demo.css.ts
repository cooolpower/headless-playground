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

// UI Color Design System - Following Cursor Rules
// 모든 색상은 globals.css의 CSS 변수를 사용합니다

export const sectionTitle = style({
  fontSize: 'var(--font-size-lg)',
  fontWeight: '600',
  color: 'var(--color-text)',
  marginBottom: 'var(--spacing-sm)',
});

export const valueDisplay = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
  marginTop: '0.5rem',
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: 'var(--spacing-base)',
  marginTop: '1rem',
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

// 모든 색상은 globals.css의 CSS 변수를 사용합니다

export const button = style({
  padding: 'var(--spacing-sm) var(--spacing-base)',
  backgroundColor: 'var(--color-brand-primary)',
  color: 'var(--color-text-on-primary)',
  border: 'none',
  borderRadius: '0.375rem',
  cursor: 'pointer',
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  transition: 'background-color 0.2s ease',
  width: 'fit-content',
  ':hover': {
    backgroundColor: 'var(--color-brand-primary-hover)',
  },
});

// Input wrapper (position: relative for absolute positioned buttons)
export const inputWrapper = style({
  position: 'relative',
  width: '100%',

  selectors: {
    // Input wrapper가 disabled일 때 스타일 (data-disabled 속성 사용)
    '&[data-disabled="true"]': {
      opacity: 0.6,
      cursor: 'not-allowed',
      backgroundColor: 'var(--color-background-disabled)',
    },
  },
});

// Clear button
export const clearButton = style({
  position: 'absolute',
  right: 'var(--spacing-base)',
  top: '50%',
  transform: 'translateY(-50%)',
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
  },
});

// Password toggle button
export const passwordToggleButton = style({
  position: 'absolute',
  right: 'var(--spacing-base)',
  top: '50%',
  transform: 'translateY(-50%)',
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
  },
});

// When both clear and password toggle buttons exist, adjust clear button position
// This selector targets clearButton when passwordToggleButton also exists as a sibling
globalStyle(`${inputWrapper}:has(${passwordToggleButton}) ${clearButton}`, {
  right: 'calc(var(--spacing-base) + 24px)',
});
