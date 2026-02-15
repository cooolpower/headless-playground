import { style, globalStyle } from '@vanilla-extract/css';

export const demoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-2xl)',
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
  gap: 'var(--spacing-base)',
});

export const sectionTitle = style({
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  color: 'var(--color-text-secondary)',
  margin: 0,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const contentBlock = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
  padding: 'var(--spacing-lg)',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-lg)',
  backgroundColor: 'var(--color-surface)',
});

export const contentText = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-muted)',
  margin: 0,
});

export const dividerWrapper = style({
  height: '1px',
  backgroundColor: 'var(--color-divider)',
  marginTop: '0',
});

export const dividerWithText = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-xs)',
  margin: '0',
});

export const dividerText = style({
  fontSize: 'var(--font-size-xs)',
  color: 'var(--color-text-secondary)',
  backgroundColor: 'var(--color-surface)',
  padding: '0',
  fontWeight: '500',
  display: 'flex',
  flex: '0 0 auto',
  whiteSpace: 'nowrap',
});

export const verticalContainer = style({
  display: 'flex',
  alignItems: 'stretch',
  height: '120px',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-lg)',
  overflow: 'hidden',
});

export const verticalContent = style({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 'var(--spacing-lg)',
});

export const verticalDivider = style({
  width: '1px',
  backgroundColor: 'var(--color-divider)',
});

export const controls = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-md)',
  padding: 'var(--spacing-card-padding)',
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

// Divider 커스텀 스타일 (injectStyles=false일 때 사용)
const dividerCustomWrapper = style({});

globalStyle(`${dividerCustomWrapper} .hcDivider`, {
  border: 'none',
  margin: 0,
  padding: 0,
  flexShrink: 0,
  background: 'var(--hc-divider-color)',
  borderTop: '2px dashed var(--color-border)',
  borderBottom: 'none',
  borderLeft: 'none',
  borderRight: 'none',
});

globalStyle(`${dividerCustomWrapper} .hcDivider[data-orientation="horizontal"]`, {
  height: '2px',
  width: '100%',
  borderTop: '2px dashed var(--color-border)',
});

globalStyle(`${dividerCustomWrapper} .hcDivider[data-orientation="vertical"]`, {
  width: '2px',
  height: '100%',
  borderLeft: '2px dashed var(--color-border)',
  borderTop: 'none',
});

export const dividerWrapperClass = dividerCustomWrapper;
