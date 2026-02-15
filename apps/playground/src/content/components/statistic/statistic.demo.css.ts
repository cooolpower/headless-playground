import { style, keyframes, globalStyle } from '@vanilla-extract/css';

// Demo-specific styles
export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
});

// Statistic component styles (moved from headless component)
export const statistic = style({
  display: 'inline-block',
});

export const title = style({
  color: 'var(--color-text-secondary)',
  fontSize: 'var(--font-size-sm)',
  lineHeight: '1.5',
  marginBottom: '4px',
});

export const content = style({
  display: 'flex',
  alignItems: 'baseline',
  fontSize: 'var(--font-size-2xl)',
  fontWeight: '600',
  color: 'var(--color-text-heading)',
  lineHeight: '1.2',
});

export const prefix = style({
  marginRight: '4px',
  color: 'var(--color-text-secondary)',
  fontSize: 'var(--font-size-base)',
});

export const value = style({
  flex: 1,
});

export const suffix = style({
  marginLeft: '4px',
  color: 'var(--color-text-secondary)',
  fontSize: 'var(--font-size-base)',
  fontWeight: 'normal',
});

export const loading = style({
  // 로딩 상태
});

const loadingAnimation = keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 0.5 },
  '100%': { opacity: 1 },
});

export const loadingSkeleton = style({
  height: 'var(--spacing-xl)',
  width: '200px',
  backgroundColor: 'var(--color-surface-hover)',
  borderRadius: '4px',
  animation: `${loadingAnimation} 1.4s ease-in-out infinite`,
});

// 크기 variants
export const sizeVariants = {
  small: {
    title: { fontSize: 'var(--font-size-xs)' },
    content: { fontSize: 'var(--font-size-lg)' },
    prefix: { fontSize: 'var(--font-size-sm)' },
    suffix: { fontSize: 'var(--font-size-sm)' },
  },

  medium: {
    title: { fontSize: 'var(--font-size-sm)' },
    content: { fontSize: 'var(--font-size-2xl)' },
    prefix: { fontSize: 'var(--font-size-base)' },
    suffix: { fontSize: 'var(--font-size-base)' },
  },

  large: {
    title: { fontSize: 'var(--font-size-base)' },
    content: { fontSize: '32px' },
    prefix: { fontSize: 'var(--font-size-xl)' },
    suffix: { fontSize: 'var(--font-size-xl)' },
  },
};

// 테마 variants
export const themeVariants = {
  default: {
    titleColor: 'var(--color-text-secondary)',
    valueColor: 'var(--color-text-heading)',
    prefixColor: 'var(--color-text-secondary)',
    suffixColor: 'var(--color-text-secondary)',
    loadingBackground: 'var(--color-surface-hover)',
  },

  primary: {
    titleColor: 'var(--color-text-secondary)',
    valueColor: 'var(--color-semantic-info)',
    prefixColor: 'var(--color-text-secondary)',
    suffixColor: 'var(--color-text-secondary)',
    loadingBackground: 'var(--color-surface-hover)',
  },

  success: {
    titleColor: 'var(--color-text-secondary)',
    valueColor: 'var(--color-semantic-success)',
    prefixColor: 'var(--color-text-secondary)',
    suffixColor: 'var(--color-text-secondary)',
    loadingBackground: 'var(--color-surface-hover)',
  },

  danger: {
    titleColor: 'var(--color-text-secondary)',
    valueColor: 'var(--color-semantic-error)',
    prefixColor: 'var(--color-text-secondary)',
    suffixColor: 'var(--color-text-secondary)',
    loadingBackground: 'var(--color-surface-hover)',
  },
};

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

// Statistic 커스텀 스타일 (injectStyles=false일 때 사용)
const statisticCustomWrapper = style({});

globalStyle(`${statisticCustomWrapper} .hcStatistic`, {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-sm)',
  padding: 'var(--spacing-base)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${statisticCustomWrapper} .hcStatisticTitle`, {
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
});

globalStyle(`${statisticCustomWrapper} .hcStatisticValue`, {
  fontSize: 'var(--font-size-2xl)',
  fontWeight: 'var(--font-weight-semibold)',
  color: 'var(--color-text)',
});

export const statisticWrapperClass = statisticCustomWrapper;
