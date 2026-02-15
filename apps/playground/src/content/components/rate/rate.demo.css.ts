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

// Rate component styles (moved from headless component)
export const rate = style({
  display: 'inline-flex',
  alignItems: 'center',
  fontSize: 'var(--font-size-xl)',
  cursor: 'pointer',
  userSelect: 'none',
});

export const disabled = style({
  cursor: 'not-allowed',
  opacity: 0.5,
});

export const starWrapper = style({
  position: 'relative',
  display: 'inline-block',
});

export const star = style({
  display: 'inline-block',
  color: 'var(--color-divider)',
  transition: 'color 0.2s ease-in-out',
  position: 'relative',
  zIndex: 1,
});

export const active = style({
  color: 'var(--color-semantic-warning)',
});

export const starHalf = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '50%',
  overflow: 'hidden',
  color: 'var(--color-semantic-warning)',
  zIndex: 2,
  opacity: 0,
  transition: 'opacity 0.2s ease-in-out',
});

export const starHalfActive = style({
  opacity: 1,
});

// 크기 variants
export const sizeVariants = {
  small: {
    fontSize: 'var(--font-size-sm)',
  },
  medium: {
    fontSize: 'var(--font-size-xl)',
  },
  large: {
    fontSize: '1.75rem',
  },
};

// 테마 variants
export const themeVariants = {
  default: {
    activeColor: 'var(--color-semantic-warning)',
    inactiveColor: 'var(--color-divider)',
  },
  primary: {
    activeColor: 'var(--color-semantic-info)',
    inactiveColor: 'var(--color-divider)',
  },
  danger: {
    activeColor: 'var(--color-semantic-error)',
    inactiveColor: 'var(--color-divider)',
  },
};

// Rate 커스텀 스타일 (injectStyles=false일 때 사용)
const rateCustomWrapper = style({});

globalStyle(`${rateCustomWrapper} .hcRate`, {
  display: 'inline-flex',
  alignItems: 'center',
  fontSize: 'var(--font-size-xl)',
  cursor: 'pointer',
  userSelect: 'none',
  padding: 'var(--spacing-sm)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${rateCustomWrapper} .hcRate[data-disabled="true"]`, {
  cursor: 'not-allowed',
  opacity: 0.5,
});

globalStyle(`${rateCustomWrapper} .hcRateStarWrapper`, {
  position: 'relative',
  display: 'inline-block',
  lineHeight: 1,
  cursor: 'pointer',
});

globalStyle(`${rateCustomWrapper} .hcRateStar`, {
  display: 'inline-block',
  color: 'var(--color-divider)',
  transition: 'color 0.2s ease-in-out',
  position: 'relative',
  zIndex: 1,
});

globalStyle(`${rateCustomWrapper} .hcRateStar[data-active="true"]`, {
  color: 'var(--color-semantic-warning)',
});

export const rateWrapperClass = rateCustomWrapper;
