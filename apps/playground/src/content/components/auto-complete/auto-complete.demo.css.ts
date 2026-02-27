import { style, globalStyle } from '@vanilla-extract/css';

// Demo-specific styles
export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
});

// Autocomplete component styles (moved from headless component)
export const autocomplete = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '1.5rem',
  border: '2px dashed var(--color-brand-primary)',
  borderRadius: 'var(--radius-lg)',
  backgroundColor: 'var(--color-surface-hover)',
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

// Autocomplete 커스텀 스타일 (injectStyles=false일 때 사용)
const autocompleteCustomWrapper = style({});

globalStyle(`${autocompleteCustomWrapper} > div`, {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '1.5rem',
  border: '2px dashed var(--color-error)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
});

globalStyle(`${autocompleteCustomWrapper} [data-disabled="true"]`, {
  opacity: 0.5,
  cursor: 'not-allowed',
});

export const autocompleteWrapperClass = autocompleteCustomWrapper;
