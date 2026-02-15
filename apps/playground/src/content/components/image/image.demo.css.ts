import { style, globalStyle } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
});

export const row = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-lg)',
  flexWrap: 'wrap',
});

export const previewBox = style({
  padding: 'var(--spacing-lg)',
  border: 'var(--border-width-thin) solid var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
});

export const helper = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
});

// Image 커스텀 스타일 (injectStyles=false일 때 사용)
const imageCustomWrapper = style({});

globalStyle(`${imageCustomWrapper} .hcImageContainer`, {
  position: 'relative',
  display: 'inline-block',
  width: 'var(--hc-image-w, auto)',
  height: 'var(--hc-image-h, auto)',
  overflow: 'hidden',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${imageCustomWrapper} .hcImageImg`, {
  width: '100%',
  height: '100%',
  objectFit: 'var(--hc-image-fit, cover)',
  display: 'block',
});

export const imageWrapperClass = imageCustomWrapper;

