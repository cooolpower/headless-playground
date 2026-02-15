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

// Popover component styles (moved from headless component)
export const popover = style({
  position: 'fixed',
  zIndex: 9999,
  pointerEvents: 'none',
  opacity: 0,
  animation: 'popover-fade-in 0.2s ease-out forwards',
});

export const content = style({
  backgroundColor: 'var(--color-surface)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--shadow-md)',
  border: '1px solid var(--color-divider)',
  minWidth: '200px',
  maxWidth: '400px',
});

export const arrow = style({
  position: 'absolute',
  width: 'var(--spacing-sm)',
  height: 'var(--spacing-sm)',
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-divider)',
  transform: 'rotate(45deg)',
});

// 화살표 위치 (CSS 변수로 동적 설정)
export const arrowPosition = {
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
};

export const title = style({
  padding: '12px 16px 8px 16px',
  fontSize: 'var(--font-size-sm)',
  fontWeight: '600',
  color: 'var(--color-text-heading)',
  borderBottom: '1px solid var(--color-divider)',
  margin: 0,
});

export const body = style({
  padding: '8px 16px 12px 16px',
  color: 'var(--color-text)',
  fontSize: 'var(--font-size-sm)',
  lineHeight: '1.5',
});

// 애니메이션
export const popoverAnimation = `
  @keyframes popover-fade-in {
    from {
      opacity: 0;
      transform: translateY(4px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

// 크기 variants
export const sizeVariants = {
  small: {
    minWidth: '150px',
    maxWidth: '250px',
  },
  medium: {
    minWidth: '200px',
    maxWidth: '400px',
  },
  large: {
    minWidth: '300px',
    maxWidth: '600px',
  },
};

// 색상 테마
export const colorThemes = {
  default: {
    background: 'var(--color-surface)',
    border: 'var(--color-divider)',
    titleColor: 'var(--color-text-heading)',
    contentColor: 'var(--color-text)',
    divider: 'var(--color-divider)',
  },
  dark: {
    background: 'var(--color-neutral-200)',
    border: 'var(--color-divider)',
    titleColor: 'var(--color-text)',
    contentColor: 'var(--color-text-secondary)',
    divider: 'var(--color-divider)',
  },
  primary: {
    background: 'var(--color-surface)',
    border: 'var(--color-brand-primary)',
    titleColor: 'var(--color-brand-primary)',
    contentColor: 'var(--color-text)',
    divider: 'var(--color-divider)',
  },
};

// Popover 커스텀 스타일 (injectStyles=false일 때 사용)
const popoverCustomWrapper = style({});

globalStyle(`${popoverCustomWrapper} .hcPopoverCard`, {
  background: 'var(--color-surface)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  color: 'var(--color-text)',
  overflow: 'hidden',
});

globalStyle(`${popoverCustomWrapper} .hcPopoverTitle`, {
  padding: 'var(--spacing-tight) var(--spacing-base)',
  fontWeight: 600,
  color: 'var(--color-text-heading)',
  borderBottom: '2px dashed var(--color-border)',
  fontSize: 'var(--font-size-sm)',
  background: 'var(--color-surface-hover)',
});

globalStyle(`${popoverCustomWrapper} .hcPopoverContent`, {
  padding: 'var(--spacing-base)',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text)',
});

export const popoverWrapperClass = popoverCustomWrapper;
