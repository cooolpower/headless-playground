import { style, globalStyle } from '@vanilla-extract/css';

export const badge = style({
  padding: 'var(--spacing-xs) var(--spacing-sm)',
  borderRadius: '0.25rem',
  fontSize: '0.75rem',
  fontWeight: '500',
});

export const badgeActive = style([
  badge,
  {
    backgroundColor: 'var(--color-semantic-success)',
    color: 'var(--color-text-on-success)',
  },
]);

export const badgeInactive = style([
  badge,
  {
    backgroundColor: 'var(--color-surface-hover)',
    color: 'var(--color-text-muted)',
  },
]);

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-2xl)',
  marginTop: '1rem',
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
});

export const sectionTitle = style({
  fontSize: 'var(--font-size-lg)',
  fontWeight: '600',
  color: 'var(--color-section-title)',
  marginBottom: 'var(--spacing-sm)',
});

// Table 커스텀 스타일 (injectStyles=false일 때 사용)
const tableCustomWrapper = style({});

globalStyle(`${tableCustomWrapper} .hcTableWrap`, {
  position: 'relative',
  width: '100%',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--spacing-base)',
  background: 'var(--color-surface)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${tableCustomWrapper} .hcTable`, {
  width: '100%',
  borderCollapse: 'collapse',
  border: 'none',
});

globalStyle(`${tableCustomWrapper} .hcTable thead`, {
  background: 'var(--color-surface-hover)',
});

globalStyle(`${tableCustomWrapper} .hcTable th`, {
  fontWeight: 'var(--font-weight-semibold)',
  color: 'var(--color-text-heading)',
  background: 'var(--color-surface-hover)',
  borderBottom: '2px dashed var(--color-border)',
});

globalStyle(`${tableCustomWrapper} .hcTable td`, {
  borderBottom: '1px dashed var(--color-divider)',
  color: 'var(--color-text)',
});

export const tableWrapperClass = tableCustomWrapper;
