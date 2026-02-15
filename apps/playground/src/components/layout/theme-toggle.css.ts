import { style } from '@vanilla-extract/css';

export const themeToggle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'var(--spacing-2xl)',
  height: 'var(--spacing-2xl)',
  padding: 0,
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text)',
  cursor: 'pointer',
  transition: 'var(--transition-button)',

  ':hover': {
    backgroundColor: 'var(--color-surface-hover)',
    borderColor: 'var(--color-border-hover)',
  },

  ':active': {
    transform: 'scale(0.95)',
  },

  ':focus-visible': {
    outline: '2px solid var(--color-brand-primary)',
    outlineOffset: '2px',
  },
});

export const themeIcon = style({
  color: 'var(--color-text)',
  transition: 'transform 0.3s var(--n-bezier)',

  selectors: {
    [`${themeToggle}:active &`]: {
      transform: 'rotate(180deg)',
    },
  },
});
