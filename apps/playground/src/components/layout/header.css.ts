import { style } from '@vanilla-extract/css';

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
  backgroundColor: 'var(--background)',
  borderBottom: '1px solid var(--border-color)',
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
});

export const headerLogoImage = style({
  filter: 'var(--logoInvert)',
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
