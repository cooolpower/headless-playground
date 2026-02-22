import { style } from '@vanilla-extract/css';

export const mainDoc = style({
  padding: 'var(--spacing-base) var(--spacing-2xl)',
  flex: 1,
  minWidth: 0, // Prevent overflow
  width: '100%',
  maxWidth: '1000px', // Content max width for readability
  margin: '0 auto',

  '@media': {
    'screen and (min-width: 1200px)': {
      margin: '0',
    },
  },
});
