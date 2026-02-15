import { style, globalStyle } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
  marginTop: 'var(--spacing-2xl)',
});

export const sectionTitle = style({
  fontSize: 'var(--font-size-lg)',
  fontWeight: '600',
  color: 'var(--color-section-title)',
  marginBottom: 'var(--spacing-sm)',
});

export const button = style({
  padding: 'var(--spacing-sm) var(--spacing-base)',
  backgroundColor: 'var(--color-brand-primary)',
  color: 'var(--color-text-on-primary)',
  border: 'none',
  borderRadius: '0.375rem',
  cursor: 'pointer',
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  transition: 'background-color 0.2s ease',
  width: 'fit-content',
  ':hover': {
    backgroundColor: 'var(--color-brand-primary-hover)',
  },
});

// TreeSelect component styles
export const treeSelectWrapper = style({
  position: 'relative',
  width: '100%',
  maxWidth: '400px',
});

export const trigger = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 'var(--spacing-sm) var(--spacing-base)',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text)',
  fontSize: 'var(--font-size-sm)',
  cursor: 'pointer',
  transition: 'border-color 0.2s ease, background-color 0.2s ease',
  ':hover': {
    borderColor: 'var(--color-brand-primary)',
    backgroundColor: 'var(--color-surface-hover)',
  },
  ':focus': {
    outline: '2px solid var(--color-brand-primary)',
    outlineOffset: '2px',
  },
  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

export const triggerText = style({
  flex: 1,
  textAlign: 'left',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const selectedCount = style({
  color: 'var(--color-text-secondary)',
  marginLeft: 'var(--spacing-xs)',
});

export const dropdown = style({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  marginTop: 'var(--spacing-xs)',
  padding: 'var(--spacing-sm)',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--color-surface)',
  boxShadow: 'var(--shadow-lg)',
  zIndex: 1000,
  maxHeight: '300px',
  overflowY: 'auto',
});

export const selectedInfo = style({
  marginTop: 'var(--spacing-sm)',
  padding: 'var(--spacing-sm)',
  backgroundColor: 'var(--color-surface-hover)',
  borderRadius: 'var(--radius-sm)',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
});

// TreeSelect component styles (kept for backward compatibility)
export const treeselect = style({
  padding: 'var(--spacing-base)',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text)',
  fontSize: 'var(--font-size-sm)',
});

export const content = style({
  color: 'var(--color-text)',
});

// TreeSelect 커스텀 스타일 (injectStyles=false일 때 사용)
const treeSelectCustomWrapper = style({});

globalStyle(`${treeSelectCustomWrapper} .hcTreeSelect`, {
  position: 'relative',
  width: '100%',
  maxWidth: '25rem',
});

globalStyle(`${treeSelectCustomWrapper} .hcTreeSelectTrigger`, {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 'var(--spacing-sm)',
  padding: 'var(--spacing-sm) var(--spacing-base)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  color: 'var(--color-text)',
  fontSize: 'var(--font-size-sm)',
  cursor: 'pointer',
  userSelect: 'none',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${treeSelectCustomWrapper} .hcTreeSelectTrigger:disabled`, {
  opacity: 0.6,
  cursor: 'not-allowed',
});

globalStyle(`${treeSelectCustomWrapper} .hcTreeSelectDropdown`, {
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  marginTop: 'var(--spacing-xs)',
  padding: 'var(--spacing-sm)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  zIndex: 1000,
  maxHeight: '18.75rem',
  overflow: 'auto',
});

export const treeSelectWrapperClass = treeSelectCustomWrapper;
