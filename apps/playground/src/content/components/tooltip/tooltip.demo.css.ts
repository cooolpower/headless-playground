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

// Tooltip component styles (moved from headless component)
export const tooltip = style({
  position: 'fixed',
  zIndex: 9999,
  pointerEvents: 'none',
  opacity: 0,
  animation: 'tooltip-fade-in 0.2s ease-out forwards',
});

export const content = style({
  backgroundColor: 'var(--color-neutral-1000)',
  opacity: 0.85,
  color: 'var(--color-text-on-primary)',
  padding: 'var(--spacing-sm) var(--spacing-base)',
  borderRadius: 'var(--radius-md)',
  fontSize: 'var(--font-size-sm)',
  lineHeight: '1.4',
  maxWidth: '300px',
  wordWrap: 'break-word',
  boxShadow: 'var(--shadow-md)',
  border: '1px solid var(--color-divider)',
});

export const arrow = style({
  position: 'absolute',
  width: 'var(--spacing-sm)',
  height: 'var(--spacing-sm)',
  backgroundColor: 'var(--color-neutral-1000)',
  opacity: 0.85,
  border: '1px solid var(--color-divider)',
  transform: 'rotate(45deg)',
});

// 화살표 위치 variants
export const arrowPosition = styleVariants({
  top: {
    bottom: '-5px',
    left: '50%',
    transform: 'translateX(-50%) rotate(45deg)',
  },
  'top-start': {
    bottom: '-5px',
    left: '16px',
    transform: 'rotate(45deg)',
  },
  'top-end': {
    bottom: '-5px',
    right: '16px',
    transform: 'rotate(45deg)',
  },
  bottom: {
    top: '-5px',
    left: '50%',
    transform: 'translateX(-50%) rotate(45deg)',
  },
  'bottom-start': {
    top: '-5px',
    left: '16px',
    transform: 'rotate(45deg)',
  },
  'bottom-end': {
    top: '-5px',
    right: '16px',
    transform: 'rotate(45deg)',
  },
  left: {
    right: '-5px',
    top: '50%',
    transform: 'translateY(-50%) rotate(45deg)',
  },
  'left-start': {
    right: '-5px',
    top: '16px',
    transform: 'rotate(45deg)',
  },
  'left-end': {
    right: '-5px',
    bottom: '16px',
    transform: 'rotate(45deg)',
  },
  right: {
    left: '-5px',
    top: '50%',
    transform: 'translateY(-50%) rotate(45deg)',
  },
  'right-start': {
    left: '-5px',
    top: '16px',
    transform: 'rotate(45deg)',
  },
  'right-end': {
    left: '-5px',
    bottom: '16px',
    transform: 'rotate(45deg)',
  },
});

// 애니메이션 keyframes (CSS-in-JS에서는 직접 정의)
export const fadeInAnimation = `
  @keyframes tooltip-fade-in {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// 툴팁 컨테이너 (화살표와 콘텐츠를 포함)
export const tooltipContainer = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// 트리거 요소 스타일
export const trigger = style({
  display: 'inline-block',
  cursor: 'pointer',
});

// 크기 variants
export const sizeVariants = styleVariants({
  small: {
    fontSize: 'var(--font-size-xs)',
    padding: '4px 8px',
  },
  medium: {
    fontSize: 'var(--font-size-sm)',
    padding: '8px 12px',
  },
  large: {
    fontSize: 'var(--font-size-base)',
    padding: '12px 16px',
  },
});

// 색상 variants
export const colorVariants = styleVariants({
  default: {
    backgroundColor: 'var(--color-neutral-1000)',
    opacity: 0.85,
    color: 'var(--color-text-on-primary)',
  },
  light: {
    backgroundColor: 'var(--color-surface)',
    opacity: 0.95,
    color: 'var(--color-text)',
    border: '1px solid var(--color-border)',
    boxShadow: 'var(--shadow-sm)',
  },
  primary: {
    backgroundColor: 'var(--color-brand-primary)',
    color: 'var(--color-text-on-primary)',
  },
  danger: {
    backgroundColor: 'var(--color-semantic-error)',
    color: 'var(--color-text-on-error)',
  },
});

// Tooltip 커스텀 스타일 (injectStyles=false일 때 사용)
const tooltipCustomWrapper = style({});

globalStyle(`${tooltipCustomWrapper} .hcTooltipCard`, {
  background: 'var(--color-surface)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-md)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  color: 'var(--color-text)',
  padding: 'var(--spacing-sm) var(--spacing-base)',
  fontSize: 'var(--font-size-sm)',
  lineHeight: 1.4,
  maxWidth: '300px',
  wordWrap: 'break-word',
});

export const tooltipWrapperClass = tooltipCustomWrapper;
