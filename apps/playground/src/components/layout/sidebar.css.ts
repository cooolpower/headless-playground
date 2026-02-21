import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '../../styles/vars.css.ts';

export const sidebar = style({
  position: 'sticky',
  top: '81px', // 헤더 높이(padding 1rem * 2 + logo 등)에 맞춤
  height: 'calc(100vh - 81px)',
  overflowY: 'auto',
  borderRight: '1px solid var(--color-border)',
  backgroundColor: 'var(--color-background)',
  padding: `${vars.spacing.xl} ${vars.spacing.lg}`,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xl,
  zIndex: 10,

  // Glassmorphism effect in dark mode
  selectors: {
    '[data-theme="dark"] &': {
      backgroundColor: 'rgba(9, 9, 11, 0.8)',
      backdropFilter: 'blur(12px)',
    },
  },

  // Scrollbar customization
  '::-webkit-scrollbar': {
    width: '4px',
  },
  '::-webkit-scrollbar-thumb': {
    background: 'var(--color-border)',
    borderRadius: '10px',
  },
});

export const navGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xs,
});

export const categoryTitle = style({
  fontSize: vars.fontSize.xs,
  fontWeight: 700,
  color: 'var(--color-text-secondary)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginTop: vars.spacing.lg,
  marginBottom: vars.spacing.xs,
  paddingLeft: vars.spacing.sm,
});

export const navList = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

export const navItem = style({
  marginBottom: '2px',
});

export const navLink = style({
  display: 'flex',
  alignItems: 'center',
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  borderRadius: vars.radius.md,
  fontSize: vars.fontSize.sm,
  fontWeight: 500,
  color: 'var(--color-text-secondary)',
  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
  textDecoration: 'none',
  ':hover': {
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-text-heading)',
    transform: 'translateX(4px)',
  },
});

export const activeNavLink = style([
  navLink,
  {
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-brand-primary)',
    fontWeight: 600,
    boxShadow: `inset 0 0 0 1px var(--color-brand-primary), ${vars.shadow.sm}`,
    ':hover': {
      transform: 'none',
    },
  },
]);

export const activeDot = style({
  width: '4px',
  height: '4px',
  borderRadius: '50%',
  backgroundColor: 'var(--color-brand-primary)',
  marginRight: vars.spacing.sm,
  boxShadow: '0 0 8px var(--color-brand-primary)',
});
