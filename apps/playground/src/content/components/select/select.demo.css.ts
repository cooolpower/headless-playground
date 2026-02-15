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
  padding: '2rem',
  width: '100%',
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
});

export const selectWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-base)',
});

export const status = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
  marginTop: 'var(--spacing-sm)',
});

export const tagContainer = style({
  display: 'flex',
  gap: 'var(--spacing-sm)',
  flexWrap: 'wrap',
  marginTop: 'var(--spacing-sm)',
});

export const loadingContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-sm)',
  marginTop: 'var(--spacing-sm)',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
});

export const note = style({
  marginTop: 'var(--spacing-sm)',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
});

// Select 커스텀 스타일 (injectStyles=false일 때 사용)
const selectCustomWrapper = style({});

globalStyle(`${selectCustomWrapper} .hcSelect`, {
  position: 'relative',
  width: '100%',
});

globalStyle(`${selectCustomWrapper} .hcSelectTrigger`, {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 'var(--spacing-tight)',
  padding: '0 var(--spacing-base)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  cursor: 'pointer',
  outline: 'none',
  userSelect: 'none',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${selectCustomWrapper} .hcSelect[data-disabled="true"] .hcSelectTrigger`, {
  background: 'var(--color-background-disabled)',
  cursor: 'not-allowed',
});

globalStyle(`${selectCustomWrapper} .hcSelect[data-size="small"] .hcSelectTrigger`, {
  height: '2rem',
  fontSize: 'var(--font-size-sm)',
});

globalStyle(`${selectCustomWrapper} .hcSelect[data-size="medium"] .hcSelectTrigger`, {
  height: '2.5rem',
  fontSize: 'var(--font-size-md)',
});

globalStyle(`${selectCustomWrapper} .hcSelect[data-size="large"] .hcSelectTrigger`, {
  height: '3rem',
  fontSize: 'var(--font-size-lg)',
});

globalStyle(`${selectCustomWrapper} .hcSelectDropdown`, {
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  zIndex: 1000,
  marginTop: 'var(--spacing-xs)',
  padding: 'var(--spacing-xs) 0',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  maxHeight: '12.5rem',
  overflow: 'auto',
  display: 'none',
});

globalStyle(`${selectCustomWrapper} .hcSelect[data-open="true"] .hcSelectDropdown`, {
  display: 'block',
});

globalStyle(`${selectCustomWrapper} .hcSelectOption`, {
  padding: 'var(--spacing-xs) var(--spacing-base)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 'var(--spacing-base)',
  cursor: 'pointer',
  background: 'transparent',
  color: 'var(--color-text)',
});

globalStyle(`${selectCustomWrapper} .hcSelectOption:hover`, {
  background: 'var(--color-surface-hover)',
});

export const selectWrapperClass = selectCustomWrapper;
