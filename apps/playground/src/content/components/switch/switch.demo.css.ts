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

export const switchWrapper = style({
  display: 'flex',
  alignItems: 'center',
});

export const status = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
  marginTop: 'var(--spacing-sm)',
});

export const sectionTitle = style({
  fontSize: 'var(--font-size-sm)',
  fontWeight: '600',
  color: 'var(--color-text)',
  marginBottom: 'var(--spacing-xs)',
});

// Switch 커스텀 스타일 (injectStyles=false일 때 사용)
const switchCustomWrapper = style({});

globalStyle(`${switchCustomWrapper} .hcSwitch`, {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--spacing-tight)',
  cursor: 'pointer',
});

globalStyle(`${switchCustomWrapper} .hcSwitch[data-disabled="true"]`, {
  cursor: 'not-allowed',
});

globalStyle(`${switchCustomWrapper} .hcSwitchRail`, {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: '9999px',
  background: 'var(--color-surface)',
  border: '2px dashed var(--color-border)',
  transition: 'background-color 0.2s, border-color 0.2s',
  opacity: 1,
  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${switchCustomWrapper} .hcSwitch[data-checked="true"] .hcSwitchRail`, {
  background: 'var(--color-brand-primary)',
  borderColor: 'var(--color-brand-primary)',
  borderStyle: 'solid',
});

globalStyle(`${switchCustomWrapper} .hcSwitch[data-disabled="true"] .hcSwitchRail`, {
  opacity: 0.5,
});

globalStyle(`${switchCustomWrapper} .hcSwitch[data-size="small"]`, {
  vars: {
    '--hc-switch-w': '2rem',
    '--hc-switch-h': '1.25rem',
    '--hc-switch-handle': '1rem',
    '--hc-switch-tx': '0.75rem',
  },
});

globalStyle(`${switchCustomWrapper} .hcSwitch[data-size="medium"]`, {
  vars: {
    '--hc-switch-w': '2.75rem',
    '--hc-switch-h': '1.5rem',
    '--hc-switch-handle': '1.25rem',
    '--hc-switch-tx': '1.25rem',
  },
});

globalStyle(`${switchCustomWrapper} .hcSwitch[data-size="large"]`, {
  vars: {
    '--hc-switch-w': '3.5rem',
    '--hc-switch-h': '2rem',
    '--hc-switch-handle': '1.75rem',
    '--hc-switch-tx': '1.5rem',
  },
});

globalStyle(`${switchCustomWrapper} .hcSwitchRail`, {
  width: 'var(--hc-switch-w)',
  height: 'var(--hc-switch-h)',
});

globalStyle(`${switchCustomWrapper} .hcSwitchHandle`, {
  position: 'absolute',
  left: '0.125rem',
  width: 'var(--hc-switch-handle)',
  height: 'var(--hc-switch-handle)',
  borderRadius: '50%',
  background: 'var(--color-surface)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transform: 'translateX(0)',
  transition: 'transform 0.2s',
});

globalStyle(`${switchCustomWrapper} .hcSwitch[data-checked="true"] .hcSwitchHandle`, {
  transform: 'translateX(var(--hc-switch-tx))',
});

globalStyle(`${switchCustomWrapper} .hcSwitchText`, {
  userSelect: 'none',
});

export const switchWrapperClass = switchCustomWrapper;
