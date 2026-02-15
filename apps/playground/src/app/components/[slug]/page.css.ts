import { style } from '@vanilla-extract/css';

export const main = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

export const mainDoc = style({
  padding: 'var(--spacing-base) var(--spacing-2xl)',
  flex: 1,
});
