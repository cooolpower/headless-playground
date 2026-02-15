import { style } from '@vanilla-extract/css';

export const footer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem',
  backgroundColor: 'var(--background)',
  borderTop: '1px solid var(--border-color)',
});
