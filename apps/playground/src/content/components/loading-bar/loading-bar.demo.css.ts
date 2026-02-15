import { style, keyframes, globalStyle } from '@vanilla-extract/css';

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

// LoadingBar component styles (moved from headless component)
export const loadingBar = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: 'var(--loading-bar-height, 3px)',
  zIndex: 9999,
  backgroundColor: 'transparent',
  overflow: 'hidden',
});

export const progress = style({
  height: '100%',
  backgroundColor: 'var(--color-brand-primary)',
  transition: 'width 0.3s ease-in-out',
  transformOrigin: 'left',
});

// 애니메이션 (필요시 추가)
export const shimmer = keyframes({
  '0%': {
    transform: 'translateX(-100%)',
  },
  '100%': {
    transform: 'translateX(100%)',
  },
});

export const shimmerOverlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background:
    'linear-gradient(90deg, transparent, var(--color-text-on-primary), transparent)',
  animation: `${shimmer} 1.5s infinite`,
});

// 색상 variants
export const colorVariants = {
  primary: {
    backgroundColor: 'var(--color-brand-primary)',
  },

  success: {
    backgroundColor: 'var(--color-semantic-success)',
  },

  warning: {
    backgroundColor: 'var(--color-semantic-warning)',
  },

  danger: {
    backgroundColor: 'var(--color-semantic-error)',
  },

  info: {
    backgroundColor: 'var(--color-semantic-info)',
  },
};

// 크기 variants
export const sizeVariants = {
  small: {
    height: '2px',
  },

  medium: {
    height: '3px',
  },

  large: {
    height: '4px',
  },
};

// LoadingBar 커스텀 스타일 (injectStyles=false일 때 사용)
const loadingBarCustomWrapper = style({});

globalStyle(`${loadingBarCustomWrapper} .hcLoadingBar`, {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: 'var(--loading-bar-height, 0.1875rem)',
  zIndex: 9999,
  background: 'transparent',
  overflow: 'hidden',
  borderBottom: '2px dashed var(--color-border)',
});

globalStyle(`${loadingBarCustomWrapper} .hcLoadingBarProgress`, {
  height: '100%',
  background: 'var(--loading-bar-color, var(--color-semantic-info))',
  transition: 'width 0.3s ease-in-out',
  transformOrigin: 'left',
  borderRight: '2px solid var(--color-brand-primary)',
});

export const loadingBarWrapperClass = loadingBarCustomWrapper;
