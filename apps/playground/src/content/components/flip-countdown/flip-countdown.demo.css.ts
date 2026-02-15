import { style, globalStyle } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-loose)',
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-normal)',
  padding: 'var(--spacing-loose)',
  width: '100%',
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-normal)',
  alignItems: 'flex-start',
});

export const previewRow = style({
  display: 'flex',
  flexDirection: 'row',
  gap: 'var(--spacing-base)',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
});

export const placeholder = style({
  //fontFamily: 'var(--font-family-mono)',
  fontSize: 'var(--font-size-lg)',
  color: 'var(--color-text-secondary)',
  fontVariantNumeric: 'tabular-nums',
});

export const helperText = style({
  fontSize: 'var(--font-size-xs)',
  color: 'var(--color-text-secondary)',
});

// FlipCountdown 커스텀 스타일 (injectStyles=false일 때 사용)
const flipCountdownCustomWrapper = style({});

globalStyle(`${flipCountdownCustomWrapper} .hcFlipRoot`, {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--spacing-base)',
  alignItems: 'flex-start',
  padding: 'var(--spacing-base)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${flipCountdownCustomWrapper} .hcFlipDigit`, {
  position: 'relative',
  width: '100%',
  height: '100%',
  background: 'var(--color-surface)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  fontVariantNumeric: 'tabular-nums',
});

export const flipCountdownWrapperClass = flipCountdownCustomWrapper;

