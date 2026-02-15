import { style, styleVariants } from '@vanilla-extract/css';

export const themeToggler = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem 0.75rem',
  border: '1px solid var(--color-gray-300)',
  borderRadius: 'var(--border-radius-md)',
  backgroundColor: 'var(--color-white)',
  color: 'var(--color-gray-700)',
  cursor: 'pointer',
  fontSize: 'var(--font-size-sm)',
  transition: 'all 0.2s ease-in-out',

  ':hover': {
    borderColor: 'var(--color-primary)',
    backgroundColor: 'var(--color-gray-50)',
  },

  ':focus': {
    outline: '2px solid var(--color-primary)',
    outlineOffset: '2px',
  },
});

export const size = styleVariants({
  small: {
    padding: '0.25rem 0.5rem',
    fontSize: 'var(--font-size-xs)',
  },
  medium: {
    padding: '0.5rem 0.75rem',
    fontSize: 'var(--font-size-sm)',
  },
  large: {
    padding: '0.75rem 1rem',
    fontSize: 'var(--font-size-base)',
  },
});

export const icon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.2em',
});

export const label = style({
  fontWeight: 'var(--font-weight-medium)',
});

export const themeSelector = style({
  padding: '0.5rem',
  border: '1px solid var(--color-gray-300)',
  borderRadius: 'var(--border-radius-md)',
  backgroundColor: 'var(--color-white)',
  color: 'var(--color-gray-700)',
  fontSize: 'var(--font-size-sm)',
  cursor: 'pointer',

  ':focus': {
    outline: '2px solid var(--color-primary)',
    outlineOffset: '2px',
  },

  ':hover': {
    borderColor: 'var(--color-primary)',
  },
});
