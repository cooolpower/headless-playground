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

export const tabsWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
});

export const status = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
  marginTop: 'var(--spacing-sm)',
});

// Tabs 커스텀 스타일 (injectStyles=false일 때 사용)
const tabsCustomWrapper = style({});

globalStyle(`${tabsCustomWrapper} .hcTabs`, {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--spacing-base)',
  background: 'var(--color-surface)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${tabsCustomWrapper} .hcTabsBar`, {
  display: 'flex',
  gap: 'var(--spacing-xs)',
  borderBottom: '2px dashed var(--color-border)',
  paddingBottom: 'var(--spacing-sm)',
});

globalStyle(`${tabsCustomWrapper} .hcTabsTab`, {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--spacing-tight)',
  color: 'var(--color-text-heading)',
  cursor: 'pointer',
  userSelect: 'none',
  padding: 'var(--spacing-sm) var(--spacing-base)',
  borderRadius: 'var(--radius-sm)',
  transition: 'all 0.2s',
});

globalStyle(`${tabsCustomWrapper} .hcTabsTab:hover`, {
  background: 'var(--color-surface-hover)',
});

globalStyle(`${tabsCustomWrapper} .hcTabsTab[data-disabled="true"]`, {
  cursor: 'not-allowed',
  opacity: 0.5,
});

globalStyle(`${tabsCustomWrapper} .hcTabsContent`, {
  flex: 1,
  minWidth: 0,
  padding: 'var(--spacing-base)',
});

export const tabsWrapperClass = tabsCustomWrapper;
