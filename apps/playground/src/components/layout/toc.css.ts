import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/vars.css.ts';

export const tocWrapper = style({
  width: '240px',
  position: 'sticky',
  top: '81px',
  height: 'calc(100vh - 81px)',
  padding: `${vars.spacing.xl} ${vars.spacing.lg}`,
  display: 'none', // 기본적으로 숨김 (모바일 등)
  flexDirection: 'column',
  gap: vars.spacing.md,
  borderLeft: `1px solid ${vars.color.divider}`,
  backgroundColor: 'transparent',
  zIndex: 10,

  '@media': {
    'screen and (min-width: 1200px)': {
      display: 'flex',
    },
  },
});

export const tocTitle = style({
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.bold,
  color: vars.color['text-heading'],
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: vars.spacing.sm,
});

export const tocList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xs,
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

export const tocItem = style({
  fontSize: vars.fontSize.sm,
  lineHeight: vars.lineHeight.tight,
  transition: 'all 0.2s ease',
});

export const tocLink = style({
  color: vars.color['text-secondary'],
  textDecoration: 'none',
  display: 'block',
  padding: '4px 0',
  borderLeft: '2px solid transparent',
  paddingLeft: vars.spacing.md,
  marginLeft: '-2px',
  transition: 'all 0.2s ease',

  ':hover': {
    color: vars.color.text,
  },
});

export const activeLink = style({
  color: vars.color.primary,
  fontWeight: vars.fontWeight.medium,
  borderLeftColor: vars.color.primary,
});

export const subItem = style({
  paddingLeft: vars.spacing.xl,
});
