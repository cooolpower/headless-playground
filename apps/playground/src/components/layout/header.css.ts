import { style } from '@vanilla-extract/css';

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
  backgroundColor: 'var(--background)',
  borderBottom: '1px solid var(--border-color)',
  position: 'sticky',
  top: 0,
  zIndex: 11,
});

export const headerLogo = style({
  fontSize: '1.0rem',
  fontWeight: 'bold',
  color: 'var(--foreground)',
});

export const headerLogoLink = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  paddingLeft: '1rem',
});

export const headerLogoImage = style({
  display: 'block',
});

export const logoLight = style({
  display: 'block',
  selectors: {
    '[data-theme="dark"] &': {
      display: 'none',
    },
  },
});

export const logoDark = style({
  display: 'none',
  selectors: {
    '[data-theme="dark"] &': {
      display: 'block',
    },
  },
});

export const headerLogoText = style({
  display: 'flex',
  flexDirection: 'column',
});

export const headerContent = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  margin: '0 auto',
  paddingRight: '1rem',
});

export const headerNav = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-base)',
  '@media': {
    'screen and (max-width: 1024px)': {
      display: 'none',
    },
  },
});

export const headerMobileNav = style({
  display: 'none',
  '@media': {
    'screen and (max-width: 1024px)': {
      display: 'flex',
    },
  },
});

export const menuButton = style({
  display: 'none',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '8px',
  color: 'var(--color-text)',
  borderRadius: '8px',
  transition: 'background-color 0.2s ease',
  ':hover': {
    backgroundColor: 'var(--color-surface)',
  },
  '@media': {
    'screen and (max-width: 1024px)': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
});

export const mobileNav = style({
  display: 'none',
  position: 'fixed',
  top: '81px',
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'var(--color-background)',
  zIndex: 100,
  padding: '24px',
  flexDirection: 'column',
  gap: '16px',
  overflowY: 'auto',
  selectors: {
    '&[data-open="true"]': {
      display: 'flex',
    },
    '[data-theme="dark"] &': {
      backgroundColor: 'rgba(9, 9, 11, 0.95)',
      backdropFilter: 'blur(12px)',
    },
  },
});

export const navLink = style({
  color: 'var(--color-text-secondary)',
  textDecoration: 'none',
  fontSize: 'var(--font-size-sm)',
  transition: 'color 0.2s ease',

  ':hover': {
    color: 'var(--color-text)',
  },
});

export const mobileNavLink = style([
  navLink,
  {
    fontSize: 'var(--font-size-lg)',
    padding: '12px 0',
    borderBottom: '1px solid var(--color-border)',
    width: '100%',
  },
]);
