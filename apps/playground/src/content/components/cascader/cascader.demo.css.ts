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

export const cascaderWrapper = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  maxWidth: '400px',
});

export const status = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
  marginTop: 'var(--spacing-sm)',
});

export const sectionTitle = style({
  fontSize: 'var(--font-size-sm)',
  fontWeight: '600',
  color: 'var(--color-text)',
  marginBottom: 'var(--spacing-xs)',
});

// Cascader 커스텀 스타일 (injectStyles=false일 때 사용)
const cascaderCustomWrapper = style({});

globalStyle(`${cascaderCustomWrapper} .hcCascader`, {
  position: 'relative',
  width: '100%',
});

globalStyle(`${cascaderCustomWrapper} .hcCascaderTrigger`, {
  position: 'relative',
  width: '100%',
  cursor: 'pointer',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  padding: 'var(--spacing-sm) var(--spacing-base)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${cascaderCustomWrapper} .hcCascader[data-disabled="true"] .hcCascaderTrigger`, {
  cursor: 'not-allowed',
  opacity: 0.6,
});

globalStyle(`${cascaderCustomWrapper} .hcCascaderPanels`, {
  position: 'absolute',
  left: 0,
  zIndex: 1000,
  display: 'flex',
  background: 'var(--color-surface)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  minWidth: '12.5rem',
  maxHeight: '25rem',
  overflow: 'hidden',
});

globalStyle(`${cascaderCustomWrapper} .hcCascaderOption`, {
  padding: 'var(--spacing-sm) var(--spacing-base)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 'var(--spacing-sm)',
  cursor: 'pointer',
  background: 'transparent',
  color: 'var(--color-text)',
  transition: 'background-color 0.2s ease',
});

globalStyle(`${cascaderCustomWrapper} .hcCascaderOption[data-selected="true"]`, {
  background: 'var(--color-surface-hover)',
});

globalStyle(`${cascaderCustomWrapper} .hcCascaderOption[data-disabled="true"]`, {
  cursor: 'not-allowed',
  color: 'var(--color-text-disabled)',
  opacity: 0.5,
});

globalStyle(`${cascaderCustomWrapper} .hcCascaderOption[data-disabled="false"]:not([data-selected="true"]):hover`, {
  background: 'var(--color-surface-hover)',
});

export const cascaderWrapperClass = cascaderCustomWrapper;
