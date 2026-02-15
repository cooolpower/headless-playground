import { style, styleVariants, globalStyle } from '@vanilla-extract/css';

// Demo-specific styles
export const container = style({
  display: 'flex',
  gap: 'var(--spacing-base)',
  alignItems: 'center',
  padding: 'var(--spacing-2xl)',
});

export const flexContainer = style({
  display: 'flex',
  gap: 'var(--spacing-base)',
  alignItems: 'center',
  flexWrap: 'wrap',
  padding: 'var(--spacing-2xl)',
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
  marginBottom: 'var(--spacing-title-content)', // 타이틀과 콘텐츠 간격
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

export const span = style({
  display: 'inline-block',
  padding: 'var(--spacing-sm) var(--spacing-base)',
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderRadius: '0.375rem',
});

export const resetButton = style({
  padding: 'var(--spacing-xs) var(--spacing-sm)',
  backgroundColor: 'var(--color-semantic-error)',
  color: 'var(--color-text-on-primary)',
  border: 'none',
  borderRadius: '0.375rem',
  cursor: 'pointer',
  fontSize: 'var(--font-size-xs)',
  fontWeight: '500',
  transition: 'background-color 0.2s ease',
  ':hover': {
    backgroundColor: 'var(--color-semantic-error-hover)',
  },
});

// Badge component styles (moved from headless component)
// 컨테이너 스타일 (children이 있는 경우)
export const badgeContainer = style({
  position: 'relative',
  display: 'inline-block',
});

// 색상 variants
export const badge = styleVariants({
  default: {
    backgroundColor: 'var(--color-surface-hover)',
    color: 'var(--color-text-secondary)',
    border: '1px solid var(--color-divider)',
  },

  primary: {
    backgroundColor: 'var(--color-brand-primary)',
    color: 'var(--color-text-on-primary)',
    border: '1px solid var(--color-brand-primary)',
  },

  success: {
    backgroundColor: 'var(--color-semantic-success)',
    color: 'var(--color-text-on-success)',
    border: '1px solid var(--color-semantic-success)',
  },

  warning: {
    backgroundColor: 'var(--color-semantic-warning)',
    color: 'var(--color-text-on-warning)',
    border: '1px solid var(--color-semantic-warning)',
  },

  danger: {
    backgroundColor: 'var(--color-semantic-error)',
    color: 'var(--color-text-on-error)',
    border: '1px solid var(--color-semantic-error)',
  },

  info: {
    backgroundColor: 'var(--color-semantic-info)',
    color: 'var(--color-text-on-info)',
    border: '1px solid var(--color-semantic-info)',
  },
});

// 크기 variants
export const sizeVariants = styleVariants({
  small: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    fontSize: '0.625rem',
    fontWeight: '500',
    lineHeight: '1',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s ease-in-out',
    minWidth: 'var(--spacing-base)',
    height: 'var(--spacing-base)',
    padding: '0 var(--spacing-xs)',
  },

  medium: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    fontSize: 'var(--font-size-xs)',
    fontWeight: '500',
    lineHeight: '1',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s ease-in-out',
    minWidth: 'var(--spacing-lg)',
    height: 'var(--spacing-lg)',
    padding: '0 var(--spacing-md)',
  },

  large: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    fontSize: 'var(--font-size-sm)',
    fontWeight: '500',
    lineHeight: '1',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s ease-in-out',
    minWidth: 'var(--spacing-xl)',
    height: 'var(--spacing-xl)',
    padding: '0 var(--spacing-sm)',
  },
});

// 점(dot) 스타일
export const dotVariants = styleVariants({
  true: {
    width: 'var(--spacing-sm)',
    height: 'var(--spacing-sm)',
    minWidth: '8px',
    padding: '0',
    borderRadius: '50%',
  },

  false: {
    minWidth: 'auto',
  },
});

// children이 있는 경우의 뱃지 위치
export const badgeWithChildren = styleVariants({
  true: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    zIndex: 10,
  },

  false: {
    position: 'static',
  },
});

// 애니메이션 variants
export const processingVariants = styleVariants({
  true: {
    animation: 'badge-processing 1.4s ease-in-out infinite both',
  },

  false: {},
});

// 애니메이션 keyframes (전역 스타일로 추가해야 함)
export const processingAnimation = `
  @keyframes badge-processing {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

// Badge 커스텀 스타일 (injectStyles=false일 때 사용)
// 전역 스타일로 badge 클래스들을 스타일링
const badgeWrapper = style({});

// injectStyles=false일 때 적용되는 커스텀 스타일 (명확한 차이를 위해 완전히 다른 스타일 적용)
// 기본 스타일: 컬러풀한 배경
// 커스텀 스타일: 회색 배경 + dashed border + 그림자
globalStyle(`${badgeWrapper} .badge-container`, {
  position: 'relative',
  display: 'inline-flex',
});

globalStyle(`${badgeWrapper} .badge-count, ${badgeWrapper} .badge-dot`, {
  position: 'absolute',
  top: 0,
  right: 0,
  transform: 'translate(50%, -50%)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  whiteSpace: 'nowrap',
  borderRadius: 'var(--radius-full)',
  fontWeight: 'var(--font-weight-medium)',
  fontSize: 'var(--font-size-xs)',
  lineHeight: 1,
  boxSizing: 'border-box',
  background: 'var(--color-surface)',
  color: 'var(--color-text)',
  border: '2px dashed var(--color-border)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${badgeWrapper} .badge-count.badge-small`, {
  height: '1rem',
  minWidth: '1rem',
  padding: '0 var(--spacing-2xs)',
});

globalStyle(`${badgeWrapper} .badge-count.badge-medium`, {
  height: '1.125rem',
  minWidth: '1.125rem',
  padding: '0 var(--spacing-xs)',
});

globalStyle(`${badgeWrapper} .badge-count.badge-large`, {
  height: '1.25rem',
  minWidth: '1.25rem',
  padding: '0 var(--spacing-sm)',
});

globalStyle(`${badgeWrapper} .badge-dot`, {
  width: '0.5rem',
  height: '0.5rem',
  padding: 0,
  minWidth: 0,
});

globalStyle(`${badgeWrapper} .badge-dot.badge-small`, {
  width: '0.375rem',
  height: '0.375rem',
});

globalStyle(`${badgeWrapper} .badge-dot.badge-medium`, {
  width: '0.5rem',
  height: '0.5rem',
});

globalStyle(`${badgeWrapper} .badge-dot.badge-large`, {
  width: '0.625rem',
  height: '0.625rem',
});

// 타입별로 왼쪽 강조선 색상만 다르게 적용
globalStyle(`${badgeWrapper} .badge-default`, {
  borderLeftColor: 'var(--color-text-secondary)',
  borderLeftWidth: '3px',
  borderLeftStyle: 'solid',
});

globalStyle(`${badgeWrapper} .badge-primary`, {
  borderLeftColor: 'var(--color-brand-primary)',
  borderLeftWidth: '3px',
  borderLeftStyle: 'solid',
});

globalStyle(`${badgeWrapper} .badge-success`, {
  borderLeftColor: 'var(--color-semantic-success)',
  borderLeftWidth: '3px',
  borderLeftStyle: 'solid',
});

globalStyle(`${badgeWrapper} .badge-warning`, {
  borderLeftColor: 'var(--color-semantic-warning)',
  borderLeftWidth: '3px',
  borderLeftStyle: 'solid',
});

globalStyle(`${badgeWrapper} .badge-danger`, {
  borderLeftColor: 'var(--color-semantic-error)',
  borderLeftWidth: '3px',
  borderLeftStyle: 'solid',
});

globalStyle(`${badgeWrapper} .badge-info`, {
  borderLeftColor: 'var(--color-semantic-info)',
  borderLeftWidth: '3px',
  borderLeftStyle: 'solid',
});

export const badgeWrapperClass = badgeWrapper;
