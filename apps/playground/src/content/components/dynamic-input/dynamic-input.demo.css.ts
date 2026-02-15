import { globalStyle, style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-sm)',
});

export const sectionTitle = style({
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  color: 'var(--color-text-secondary)',
  marginBottom: 'var(--spacing-xs)',
});

export const valueDisplay = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
  marginTop: 'var(--spacing-sm)',
  padding: 'var(--spacing-sm)',
  backgroundColor: 'var(--color-surface)',
  borderRadius: 'var(--radius-sm)',
});

export const dynamicInput = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-sm)',
});

export const inputItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-sm)',
});

export const input = style({
  flex: 1,
});

export const removeButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: 'var(--color-text-secondary)',
  borderRadius: 'var(--radius-sm)',
  transition: 'all 0.2s ease',

  ':hover': {
    backgroundColor: 'var(--color-surface-hover)',
    color: 'var(--color-text)',
  },

  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
});

export const addButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  padding: '8px',
  background: 'none',
  cursor: 'pointer',
  color: 'var(--color-text-secondary)',
  borderRadius: 'var(--radius-md)',
  transition: 'all 0.2s ease',
  width: 'fit-content',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'var(--color-button-border)',

  ':hover': {
    backgroundColor: 'var(--color-surface-hover)',
    color: 'var(--color-text)',
  },

  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
});

globalStyle(`${addButton} span`, {
  lineHeight: '1',
})
