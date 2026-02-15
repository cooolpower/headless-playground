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

export const breadcrumbWrapper = style({
  display: 'flex',
  alignItems: 'center',
});

// Breadcrumb 커스텀 스타일 (injectStyles=false일 때 사용)
const breadcrumbCustomWrapper = style({});

globalStyle(`${breadcrumbCustomWrapper} .hcBreadcrumbNav`, {
  display: 'block',
  padding: 'var(--spacing-sm)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${breadcrumbCustomWrapper} .hcBreadcrumbList`, {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  color: 'var(--color-text-secondary)',
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

globalStyle(`${breadcrumbCustomWrapper} .hcBreadcrumbItem`, {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--spacing-xs)',
  textDecoration: 'none',
  borderRadius: 'var(--radius-sm)',
  transition: 'background-color 0.2s, color 0.2s',
  padding: 'var(--spacing-xs) var(--spacing-sm)',
});

export const breadcrumbWrapperClass = breadcrumbCustomWrapper;
