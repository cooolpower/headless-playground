import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/vars.css';

export const tableWrapper = style({
  width: '100%',
  overflowX: 'auto',
  WebkitOverflowScrolling: 'touch',
  marginTop: vars.spacing.lg,
  marginBottom: vars.spacing.lg,
  borderRadius: vars.radius.xl,
  border: `1px solid ${vars.color.border}`,
  
  selectors: {
    '&::-webkit-scrollbar': {
      height: '6px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: vars.color.border,
      borderRadius: '3px',
    },
  },
});

export const table = style({
  width: '100%',
  margin: '0 !important', // wrapper가 여백을 담당
  border: 'none !important', // wrapper가 보더를 담당
  boxShadow: 'none !important',
});
