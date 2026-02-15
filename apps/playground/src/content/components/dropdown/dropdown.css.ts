import { style, globalStyle } from '@vanilla-extract/css';

export const demoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-xl)',
  padding: 'var(--spacing-lg)',
});

export const demoTitle = style({
  fontSize: 'var(--font-size-lg)',
  fontWeight: '600',
  color: 'var(--color-demo-title)',
  margin: 0,
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-md)',
});

export const sectionTitle = style({
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  color: 'var(--color-text-secondary)',
  margin: 0,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const dropdownWrapper = style({
  position: 'relative',
  display: 'inline-block',
});

export const triggerButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-sm)',
  padding: 'var(--spacing-sm) var(--spacing-base)',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text-muted)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  minWidth: '150px',
  justifyContent: 'space-between',

  ':hover': {
    backgroundColor: 'var(--color-surface-hover)',
    borderColor: 'var(--color-text-secondary)',
  },

  ':focus': {
    outline: '2px solid var(--color-brand-primary)',
    outlineOffset: '2px',
  },
});

export const arrow = style({
  fontSize: 'var(--font-size-xs)',
  transition: 'transform 0.2s ease',
});

export const icon = style({
  fontSize: 'var(--font-size-base)',
  lineHeight: 1,
});

// Dropdown Menu - 복잡한 선택자는 별도 CSS로 처리
export const dropdownMenu = style({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  marginTop: '4px',
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-md)',
  boxShadow: 'var(--shadow-lg)',
  zIndex: 1000,
  overflow: 'hidden',
});

// Dropdown Items
export const dropdownItem = style({
  padding: 'var(--spacing-sm) var(--spacing-base)',
  cursor: 'pointer',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-muted)',
  transition: 'background-color 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-sm)',

  ':hover': {
    backgroundColor: 'var(--color-surface-hover)',
  },

  selectors: {
    '&[data-disabled="true"]': {
      color: 'var(--color-text-disabled)',
      cursor: 'not-allowed',
    },
    '&[data-disabled="true"]:hover': {
      backgroundColor: 'transparent',
    },
  },
});

export const selectionDisplay = style({
  padding: '12px 16px',
  backgroundColor: 'var(--color-brand-primary-light)',
  border: '1px solid var(--color-brand-primary)',
  borderRadius: 'var(--radius-md)',
  color: 'var(--color-text-on-primary-dark)',
  fontSize: 'var(--font-size-sm)',
});

export const controls = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-md)',
  padding: 'var(--spacing-base)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  backgroundColor: 'var(--color-background)',
});

export const controlDescription = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--foreground)',
  lineHeight: '1.5',
  margin: 0,
});

// Dropdown 커스텀 스타일 (injectStyles=false일 때 사용)
const dropdownCustomWrapper = style({});

globalStyle(`${dropdownCustomWrapper} .hcDropdown`, {
  position: 'relative',
  display: 'inline-block',
});

globalStyle(`${dropdownCustomWrapper} .hcDropdownTrigger`, {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--spacing-tight)',
  padding: 'var(--spacing-sm) var(--spacing-base)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  color: 'var(--color-text)',
  cursor: 'pointer',
  userSelect: 'none',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${dropdownCustomWrapper} .hcDropdownTrigger[aria-disabled="true"]`, {
  opacity: 0.5,
  cursor: 'not-allowed',
});

globalStyle(`${dropdownCustomWrapper} .hcDropdownMenu`, {
  position: 'absolute',
  top: '100%',
  left: 0,
  marginTop: '0.25rem',
  minWidth: '12.5rem',
  background: 'var(--color-surface)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  padding: '0.25rem',
  zIndex: 1000,
  display: 'none',
});

globalStyle(`${dropdownCustomWrapper} .hcDropdownMenu[data-open="true"]`, {
  display: 'block',
});

globalStyle(`${dropdownCustomWrapper} .hcDropdownItem`, {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-tight)',
  padding: 'var(--spacing-sm) var(--spacing-base)',
  borderRadius: 'var(--radius-sm)',
  color: 'var(--color-text)',
  background: 'transparent',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
});

globalStyle(`${dropdownCustomWrapper} .hcDropdownItem:hover`, {
  background: 'var(--color-surface-hover)',
});

globalStyle(`${dropdownCustomWrapper} .hcDropdownItem[aria-disabled="true"]`, {
  opacity: 0.5,
  cursor: 'not-allowed',
});

globalStyle(`${dropdownCustomWrapper} .hcDropdownItem[aria-disabled="true"]:hover`, {
  background: 'transparent',
});

export const dropdownWrapperClass = dropdownCustomWrapper;
