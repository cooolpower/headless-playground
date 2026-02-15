import { style, globalStyle } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
});

export const itemTitle = style({
  fontWeight: '600',
  color: 'var(--color-text)',
});

export const itemDesc = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
});

// List 커스텀 스타일 (injectStyles=false일 때 사용)
const listCustomWrapper = style({});

globalStyle(`${listCustomWrapper} .hcList`, {
  background: 'var(--color-neutral-1000)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--spacing-base)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${listCustomWrapper} .hcListHeader`, {
  padding: 'var(--spacing-base) var(--spacing-lg)',
  fontSize: 'var(--font-size-base)',
  fontWeight: 'var(--font-weight-semibold)',
  color: 'var(--color-text)',
  borderBottom: '2px dashed var(--color-border)',
  background: 'var(--color-surface-hover)',
});

globalStyle(`${listCustomWrapper} .hcListItem`, {
  padding: 'var(--spacing-base) var(--spacing-lg)',
  fontSize: 'var(--font-size-base)',
  borderBottom: '1px dashed var(--color-divider)',
});

export const listWrapperClass = listCustomWrapper;

