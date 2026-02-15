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
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-sm)',
});

export const radioWrapper = style({
  display: 'flex',
  alignItems: 'center',
});

export const radioGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-sm)',
});

export const status = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
  marginTop: 'var(--spacing-sm)',
});

// Radio 커스텀 스타일 (injectStyles=false일 때 사용)
const radioCustomWrapper = style({});

globalStyle(`${radioCustomWrapper} .hcRadioGroup`, {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
});

globalStyle(`${radioCustomWrapper} .hcRadioLabel`, {
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  gap: 'var(--spacing-base)',
});

globalStyle(`${radioCustomWrapper} .hcRadioLabel[data-disabled="true"]`, {
  cursor: 'not-allowed',
  opacity: 0.6,
});

globalStyle(`${radioCustomWrapper} .hcRadioCircle`, {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '9999px',
  background: 'var(--color-surface)',
  transition: 'border-color 0.2s, background-color 0.2s',
  flexShrink: 0,
  border: '2px dashed var(--color-border)',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${radioCustomWrapper} .hcRadioCircle[data-size="small"]`, {
  width: '1rem',
  height: '1rem',
});

globalStyle(`${radioCustomWrapper} .hcRadioCircle[data-size="medium"]`, {
  width: '1.25rem',
  height: '1.25rem',
});

globalStyle(`${radioCustomWrapper} .hcRadioCircle[data-size="large"]`, {
  width: '1.5rem',
  height: '1.5rem',
});

globalStyle(`${radioCustomWrapper} .hcRadioCircle[data-checked="true"]`, {
  borderColor: 'var(--color-brand-primary)',
  borderStyle: 'solid',
});

globalStyle(`${radioCustomWrapper} .hcRadioCircle[data-disabled="true"]`, {
  background: 'var(--color-background-disabled)',
});

globalStyle(`${radioCustomWrapper} .hcRadioDot`, {
  borderRadius: '9999px',
  background: 'var(--color-brand-primary)',
});

globalStyle(`${radioCustomWrapper} .hcRadioDot[data-size="small"]`, {
  width: '0.375rem',
  height: '0.375rem',
});

globalStyle(`${radioCustomWrapper} .hcRadioDot[data-size="medium"]`, {
  width: '0.5rem',
  height: '0.5rem',
});

globalStyle(`${radioCustomWrapper} .hcRadioDot[data-size="large"]`, {
  width: '0.625rem',
  height: '0.625rem',
});

globalStyle(`${radioCustomWrapper} .hcRadioText`, {
  userSelect: 'none',
});

export const radioWrapperClass = radioCustomWrapper;
