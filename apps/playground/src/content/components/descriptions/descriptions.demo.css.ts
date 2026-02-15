import { style, styleVariants, globalStyle } from '@vanilla-extract/css';

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

export const sectionTitle = style({
  fontSize: 'var(--font-size-lg)',
  fontWeight: '600',
  color: 'var(--color-section-title)',
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

// Descriptions component styles (moved from headless component)
export const descriptions = style({
  backgroundColor: 'var(--color-surface)',
});

export const bordered = style({
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-md)',
});

export const title = style({
  padding: '16px 24px 8px 24px',
  fontSize: 'var(--font-size-base)',
  fontWeight: '600',
  color: 'var(--color-text-heading)',
  borderBottom: '1px solid var(--color-divider)',
  marginBottom: '8px',
});

export const content = style({
  display: 'grid',
  gap: '16px 24px',
  padding: '16px 24px',
});

// 크기 variants
export const size = styleVariants({
  small: {
    fontSize: 'var(--font-size-xs)',
  },

  medium: {
    fontSize: 'var(--font-size-sm)',
  },

  large: {
    fontSize: 'var(--font-size-base)',
  },
});

// 레이아웃 variants
export const layout = styleVariants({
  horizontal: {
    // 기본 horizontal 레이아웃
  },

  vertical: {
    // vertical 레이아웃 (필요시 구현)
  },
});

// 아이템 스타일
export const item = style({
  display: 'contents', // grid 레이아웃을 위해
});

export const label = style({
  fontWeight: '500',
  color: 'var(--color-text-secondary)',
  padding: '8px 0',
  minHeight: '32px',
  display: 'flex',
  alignItems: 'center',
});

export const content_ = style({
  color: 'var(--color-text-heading)',
  padding: '8px 0',
  minHeight: '32px',
  display: 'flex',
  alignItems: 'center',
  wordBreak: 'break-word',
});

// 테마 variants
export const themeVariants = {
  default: {
    background: 'var(--color-surface)',
    border: 'var(--color-divider)',
    titleColor: 'var(--color-text-heading)',
    labelColor: 'var(--color-text-secondary)',
    contentColor: 'var(--color-text-heading)',
  },

  bordered: {
    background: 'var(--color-surface)',
    border: 'var(--color-divider)',
    titleColor: 'var(--color-text-heading)',
    labelColor: 'var(--color-text-secondary)',
    contentColor: 'var(--color-text-heading)',
  },

  ghost: {
    background: 'transparent',
    border: 'transparent',
    titleColor: 'var(--color-text-heading)',
    labelColor: 'var(--color-text-secondary)',
    contentColor: 'var(--color-text-heading)',
  },
};

// Descriptions 커스텀 스타일 (injectStyles=false일 때 사용)
const descriptionsCustomWrapper = style({});

globalStyle(`${descriptionsCustomWrapper} .hcDescriptions`, {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  color: 'var(--color-text)',
  padding: 'var(--spacing-base)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${descriptionsCustomWrapper} .hcDescriptionsTitle`, {
  fontWeight: 700,
  color: 'var(--color-text-heading)',
  borderBottom: '2px dashed var(--color-border)',
  paddingBottom: 'var(--spacing-sm)',
});

globalStyle(`${descriptionsCustomWrapper} .hcDescriptionsItem`, {
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'flex-start',
  padding: 'var(--spacing-sm)',
  borderBottom: '1px dashed var(--color-divider)',
});

export const descriptionsWrapperClass = descriptionsCustomWrapper;
