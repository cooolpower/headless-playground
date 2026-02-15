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
  marginTop: 'var(--spacing-2xl)',
});

export const sectionTitle = style({
  fontSize: 'var(--font-size-lg)',
  fontWeight: '600',
  color: 'var(--color-section-title)',
  marginBottom: 'var(--spacing-sm)',
});

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

// Chart component styles
export const chart = style({
  padding: '1rem',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--color-surface)',
  width: '100%',
  height: '100%',
});

export const chartWrapper = style({
  width: '100%',
  height: '400px',
  position: 'relative',
});

export const chartSelector = style({
  display: 'flex',
  gap: 'var(--spacing-sm)',
  flexWrap: 'wrap',
  marginBottom: 'var(--spacing-base)',
});

export const chartButton = style({
  padding: 'var(--spacing-xs) var(--spacing-sm)',
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text)',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-sm)',
  cursor: 'pointer',
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  transition: 'all 0.2s ease',
  ':hover': {
    backgroundColor: 'var(--color-surface-hover)',
    borderColor: 'var(--color-brand-primary)',
  },
});

export const chartButtonActive = style({
  backgroundColor: 'var(--color-brand-primary)',
  color: 'var(--color-text-on-primary)',
  borderColor: 'var(--color-brand-primary)',
  ':hover': {
    backgroundColor: 'var(--color-brand-primary-hover)',
    borderColor: 'var(--color-brand-primary-hover)',
  },
});

// Chart 커스텀 스타일 (injectStyles=false일 때 사용)
const chartCustomWrapper = style({});

globalStyle(`${chartCustomWrapper} .hcChart`, {
  padding: 'var(--spacing-base)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  width: '100%',
  height: '100%',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${chartCustomWrapper} .hcChart[data-disabled="true"]`, {
  opacity: 0.5,
});

export const chartWrapperClass = chartCustomWrapper;
