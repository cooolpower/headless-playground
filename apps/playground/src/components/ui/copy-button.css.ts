import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/vars.css';

export const copyButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: 'var(--color-background)',
  color: vars.color.text,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  padding: 0,

  ':hover': {
    backgroundColor: vars.color.background,
    color: vars.color.text,
  },

  ':focus-visible': {
    outline: `2px solid ${vars.color['focus-ring']}`,
    outlineOffset: '2px',
  },
});

export const icon = style({
  width: '14px',
  height: '14px',
  transition: 'transform 0.2s ease',
});

export const iconSuccess = style({
  width: '14px',
  height: '14px',
  color: vars.color['semantic-success'],
  animation: 'popIn 0.3s ease-out',
});
