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

export const headerWrapper = style({
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--spacing-lg)',
  backgroundColor: 'var(--color-surface)',
});

export const title = style({
  fontSize: '1.75rem',
  fontWeight: '700',
  color: 'var(--color-demo-title)',
  margin: 0,
  lineHeight: '1.2',
});

export const minimal = style({
  fontSize: 'var(--font-size-2xl)',
  fontWeight: '600',
});

export const subtitle = style({
  fontSize: 'var(--font-size-base)',
  color: 'var(--color-text-secondary)',
  margin: '8px 0 0 0',
  lineHeight: '1.5',
});

export const titleRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-md)',
  marginBottom: '4px',
});

export const subtitleRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '8px',
});

export const badge = style({
  padding: '4px 8px',
  backgroundColor: 'var(--color-semantic-success)',
  color: 'var(--color-text-on-success)',
  borderRadius: '4px',
  fontSize: 'var(--font-size-xs)',
  fontWeight: '500',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const meta = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
  fontWeight: '400',
});

export const actions = style({
  display: 'flex',
  gap: 'var(--spacing-sm)',
  alignItems: 'center',
});

export const button = style({
  padding: 'var(--spacing-sm) var(--spacing-base)',
  border: '1px solid var(--color-brand-primary)',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--color-brand-primary)',
  color: 'var(--color-text-on-primary)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  ':hover': {
    backgroundColor: 'var(--color-brand-primary-hover)',
    borderColor: 'var(--color-brand-primary-hover)',
  },
});

export const secondary = style({
  backgroundColor: 'transparent',
  color: 'var(--foreground)',
  borderColor: 'var(--border-color)',

  ':hover': {
    backgroundColor: 'var(--color-surface-hover)',
    color: 'var(--color-text-muted)',
  },
});

export const controls = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-md)',
  padding: 'var(--spacing-base)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  backgroundColor: 'var(--color-background)',
});

export const controlDescription = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--foreground)',
  lineHeight: '1.5',
  margin: 0,
});

// PageHeader 커스텀 스타일 (injectStyles=false일 때 사용)
const pageHeaderCustomWrapper = style({});

globalStyle(`${pageHeaderCustomWrapper} .hcPageHeader`, {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  padding: 'var(--spacing-lg)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${pageHeaderCustomWrapper} .hcPageHeaderTitle`, {
  fontSize: '1.75rem',
  fontWeight: 700,
  color: 'var(--color-text-heading)',
  margin: 0,
});

globalStyle(`${pageHeaderCustomWrapper} .hcPageHeaderSubtitle`, {
  fontSize: '1rem',
  color: 'var(--color-text-secondary)',
  margin: 0,
});

export const pageHeaderWrapperClass = pageHeaderCustomWrapper;
