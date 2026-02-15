import { style, globalStyle } from '@vanilla-extract/css';
import { demoButton } from '../button/button.demo.css';

export const demoButtons = style([
  demoButton
]);

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
  marginTop: 'var(--spacing-2xl)',
});

// UI Color Design System - Following Cursor Rules
// 모든 색상은 globals.css의 CSS 변수를 사용합니다

export const sectionTitle = style({
  fontSize: 'var(--font-size-lg)',
  fontWeight: '600',
  color: 'var(--color-text)',
  marginBottom: 'var(--spacing-sm)',
});

export const button = style({
  padding: 'var(--spacing-sm) var(--spacing-base)',
  backgroundColor: 'var(--color-brand-primary)',
  color: 'var(--color-text-on-primary)',
  border: 'none',
  borderRadius: '0.375rem',
  cursor: 'pointer',
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  transition: 'background-color 0.2s ease',
  width: 'fit-content',
  ':hover': {
    backgroundColor: 'var(--color-brand-primary-hover)',
  },
});

// Alert 커스텀 스타일 (injectStyles=false일 때 사용)
// 전역 스타일로 hcAlert 클래스들을 스타일링
const alertWrapper = style({});

// injectStyles=false일 때 적용되는 커스텀 스타일 (명확한 차이를 위해 완전히 다른 스타일 적용)
// 기본 스타일: 컬러풀한 배경 + solid border
// 커스텀 스타일: 회색 배경 + dashed border + 왼쪽 강조선
globalStyle(`${alertWrapper} .hcAlert`, {
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-start',
  gap: 'var(--spacing-base)',
  lineHeight: 1.5,
  background: 'var(--color-surface)',
  color: 'var(--color-text)',
  border: '2px dashed var(--color-border)',
  borderLeft: '4px solid var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--spacing-lg) var(--spacing-xl)',
  fontSize: 'var(--font-size-base)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
});

// 타입별로 왼쪽 강조선 색상만 다르게 적용
globalStyle(`${alertWrapper} .hcAlert[data-type="success"]`, {
  borderLeftColor: 'var(--color-semantic-success)',
});

globalStyle(`${alertWrapper} .hcAlert[data-type="error"]`, {
  borderLeftColor: 'var(--color-semantic-error)',
});

globalStyle(`${alertWrapper} .hcAlert[data-type="warning"]`, {
  borderLeftColor: 'var(--color-semantic-warning)',
});

globalStyle(`${alertWrapper} .hcAlert[data-type="info"]`, {
  borderLeftColor: 'var(--color-semantic-info)',
});

globalStyle(`${alertWrapper} .hcAlertIcon`, {
  flexShrink: 0,
  lineHeight: 1,
  fontSize: '1.25rem',
  position: 'relative',
  top: '5px'
});

globalStyle(`${alertWrapper} .hcAlertContent`, {
  flex: 1,
  minWidth: 0,
});

globalStyle(`${alertWrapper} .hcAlertTitle`, {
  fontSize: 'var(--font-size-base)',
  fontWeight: 'var(--font-weight-semibold)',
  margin: 0,
});

globalStyle(`${alertWrapper} .hcAlertDesc`, {
  fontSize: 'var(--font-size-md)',
  margin: 0,
  opacity: 0.9,
});

globalStyle(`${alertWrapper} .hcAlertClose`, {
  position: 'absolute',
  top: '0.75rem',
  right: '0.75rem',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '1.5rem',
  height: '1.5rem',
  padding: 0,
  background: 'none',
  border: 'none',
  color: 'inherit',
  borderRadius: 'var(--radius-sm)',
  cursor: 'pointer',
  opacity: 0.7,
  transition: 'opacity 0.2s, background-color 0.2s',
});

globalStyle(`${alertWrapper} .hcAlertClose:hover`, {
  opacity: 1,
  backgroundColor: 'color-mix(in oklch, currentColor 10%, transparent)',
});

export const alertWrapperClass = alertWrapper;
