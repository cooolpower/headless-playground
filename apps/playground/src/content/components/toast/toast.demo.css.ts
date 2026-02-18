import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
  minHeight: '400px',
  position: 'relative',
});

export const buttonGroup = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--spacing-sm)',
});

export const primaryButton = style({
  background: 'var(--color-brand-primary)',
  color: '#fff',
  padding: '8px 16px',
  borderRadius: 'var(--radius-md)',
  border: 'none',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: 'var(--font-size-sm)',
  transition: 'all 0.2s',
  ':hover': {
    filter: 'brightness(1.1)',
  },
  ':active': {
    transform: 'scale(0.98)',
  },
});

export const controlButton = style({
  padding: '4px 8px',
  fontSize: '11px',
  borderRadius: '4px',
  border: '1px solid var(--color-divider)',
  background: 'transparent',
  color: 'var(--color-text)',
  cursor: 'pointer',
  transition: 'all 0.2s',
  ':hover': {
    backgroundColor: 'var(--color-surface-hover)',
  },
});

export const activeControlButton = style([
  controlButton,
  {
    background: 'var(--color-brand-primary)',
    color: '#fff',
    borderColor: 'var(--color-brand-primary)',
  },
]);
