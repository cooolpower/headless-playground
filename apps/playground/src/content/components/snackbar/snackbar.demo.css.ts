import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
  minHeight: '400px',
});

export const buttonGroup = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--spacing-sm)',
});
