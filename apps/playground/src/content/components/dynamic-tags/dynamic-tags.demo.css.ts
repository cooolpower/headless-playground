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

export const dynamicTags = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--spacing-sm)',
  alignItems: 'center',
});

export const tag = style({
  display: 'inline-flex',
  border: '1px solid var(--color-button-border)',
  borderRadius: 'var(--radius-md)',
  padding: 'var(--spacing-xs) var(--spacing-sm)',
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  lineHeight: '1',
  height: 'fit-content',
});

export const renderTag = style({
  display: 'inline-flex',
  //border: '1px solid var(--color-button-border)',
  borderRadius: 'var(--radius-md)',
  //padding: 'var(--spacing-xs) var(--spacing-sm)',
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  lineHeight: '1',
  height: 'fit-content',
});

export const tagInput = style({
  display: 'inline-flex',
  minWidth: '120px',
});

globalStyle(`${tagInput} input`, {
  height: '34px',
  padding: '0 var(--spacing-sm)',
});

export const addButton = style({
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

export const dynamicTagsWrapperClass = style({

});

export const dynamicTagsWrapper = style({

});

export const dynamicTagsText = style({

});
