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

export const ellipsisWrapper = style({
  border: '1px solid var(--border-color)',
  borderRadius: '6px',
  padding: 'var(--spacing-md)',
  backgroundColor: 'var(--background)',
});

export const singleLine = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: 'var(--font-size-sm)',
  lineHeight: '1.5',
  color: 'var(--foreground)',
});

export const multiLine = style({
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  fontSize: 'var(--font-size-sm)',
  lineHeight: '1.5',
  color: 'var(--foreground)',
});

export const fixedWidthContainer = style({
  width: '250px',
  border: '1px solid var(--border-color)',
  borderRadius: '4px',
  padding: '8px',
  backgroundColor: 'var(--background)',
});

export const sizeComparison = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-md)',
});

export const sizeContainer = style({
  border: '1px solid var(--border-color)',
  borderRadius: '4px',
  padding: '8px',
  backgroundColor: 'var(--background)',
});

export const controls = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-md)',
  padding: 'var(--spacing-base)',
  border: '1px solid var(--border-color)',
  borderRadius: '8px',
  backgroundColor: 'var(--background)',
});

export const controlDescription = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--foreground)',
  lineHeight: '1.5',
  margin: 0,
});

// Ellipsis 커스텀 스타일 (injectStyles=false일 때 사용)
const ellipsisCustomWrapper = style({});

globalStyle(`${ellipsisCustomWrapper} .hcEllipsisSingle`, {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  padding: 'var(--spacing-sm)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-md)',
  background: 'var(--color-surface)',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${ellipsisCustomWrapper} .hcEllipsisMulti`, {
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  padding: 'var(--spacing-sm)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-md)',
  background: 'var(--color-surface)',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
});

export const ellipsisWrapperClass = ellipsisCustomWrapper;
