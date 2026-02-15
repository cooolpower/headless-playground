import { style, globalStyle } from '@vanilla-extract/css';

export const section = style({
  padding: '2rem',
  width: '100%',
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
});

export const checkboxWrapper = style({
  display: 'flex',
  alignItems: 'center',
});

export const checkboxGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
});

export const status = style({
  marginTop: '1rem',
  padding: '0.5rem',
  backgroundColor: 'var(--color-surface-hover)',
  borderRadius: 'var(--radius-sm)',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
});

// Checkbox 커스텀 스타일 (injectStyles=false일 때 사용)
const checkboxCustomWrapper = style({});

globalStyle(`${checkboxCustomWrapper} .hcCheckbox`, {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--spacing-tight)',
  cursor: 'pointer',
});

globalStyle(`${checkboxCustomWrapper} .hcCheckbox[data-disabled="true"]`, {
  cursor: 'not-allowed',
});

globalStyle(`${checkboxCustomWrapper} .hcCheckboxBox`, {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-md)',
  background: 'var(--color-surface)',
  transition: 'all 0.2s',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${checkboxCustomWrapper} .hcCheckbox[data-size="small"] .hcCheckboxBox`, {
  width: '1rem',
  height: '1rem',
});

globalStyle(`${checkboxCustomWrapper} .hcCheckbox[data-size="medium"] .hcCheckboxBox`, {
  width: '1.25rem',
  height: '1.25rem',
});

globalStyle(`${checkboxCustomWrapper} .hcCheckbox[data-size="large"] .hcCheckboxBox`, {
  width: '1.5rem',
  height: '1.5rem',
});

globalStyle(`${checkboxCustomWrapper} .hcCheckbox[data-checked="true"] .hcCheckboxBox, ${checkboxCustomWrapper} .hcCheckbox[data-indeterminate="true"] .hcCheckboxBox`, {
  borderColor: 'var(--color-brand-primary)',
  background: 'var(--color-brand-primary)',
  borderStyle: 'solid',
});

globalStyle(`${checkboxCustomWrapper} .hcCheckbox[data-disabled="true"] .hcCheckboxBox`, {
  background: 'var(--color-background-disabled)',
  borderColor: 'var(--color-border)',
});

globalStyle(`${checkboxCustomWrapper} .hcCheckboxMark`, {
  color: 'var(--color-text-on-primary)',
  fontWeight: 700,
  lineHeight: 1,
});

globalStyle(`${checkboxCustomWrapper} .hcCheckbox[data-size="small"] .hcCheckboxMark`, {
  fontSize: 'var(--font-size-xs)',
});

globalStyle(`${checkboxCustomWrapper} .hcCheckbox[data-size="medium"] .hcCheckboxMark`, {
  fontSize: 'var(--font-size-sm)',
});

globalStyle(`${checkboxCustomWrapper} .hcCheckbox[data-size="large"] .hcCheckboxMark`, {
  fontSize: 'var(--font-size-md)',
});

globalStyle(`${checkboxCustomWrapper} .hcCheckboxText`, {
  userSelect: 'none',
  color: 'var(--color-text)',
  fontSize: 'var(--font-size-sm)',
});

globalStyle(`${checkboxCustomWrapper} .hcCheckbox[data-disabled="true"] .hcCheckboxText`, {
  color: 'var(--color-text-disabled)',
});

export const checkboxWrapperClass = checkboxCustomWrapper;
