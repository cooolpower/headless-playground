import { style } from '@vanilla-extract/css';

export const main = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  width: '100%',
});

export const contentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  flex: 1,

  '@media': {
    'screen and (min-width: 1200px)': {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
  },
});

export const mainDoc = style({
  padding: 'var(--spacing-base) var(--spacing-2xl)',
  flex: 1,
  minWidth: 0, // Prevent overflow
  maxWidth: '1000px', // Content max width for readability
  margin: '0 auto',

  '@media': {
    'screen and (min-width: 1200px)': {
      margin: '0',
    },
  },
});
