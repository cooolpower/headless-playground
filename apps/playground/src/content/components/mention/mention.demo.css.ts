import { style } from '@vanilla-extract/css';

export const mention = style({
  width: '100%',
  maxWidth: '400px',
});

export const inputWrapper = style({
  position: 'relative',
  width: '100%',
});

export const input = style({
  width: '100%',
});

export const dropdown = style({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-sm)',
  backgroundColor: 'var(--color-surface)',
  zIndex: 1000,
  marginTop: '4px',
  maxHeight: '200px',
  overflowY: 'auto',
  boxShadow: 'var(--shadow-md)',
});

export const option = style({
  padding: '8px 12px',
  cursor: 'pointer',
  borderBottom: '1px solid var(--color-divider)',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: 'var(--color-surface-hover)',
  },
  ':last-child': {
    borderBottom: 'none',
  },
});
