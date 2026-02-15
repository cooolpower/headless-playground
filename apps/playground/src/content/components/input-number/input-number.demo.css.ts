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

// InputNumber component styles (moved from headless component)

// InputNumber 컴포넌트 스타일
// 최상위 컨테이너에 적용하고, globalStyle로 내부 요소 스타일링
export const inputNumber = style({
  display: 'inline-flex',
  alignItems: 'center',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--color-surface)',
  transition: 'all 0.2s ease-in-out',
  overflow: 'hidden',
});

// 내부 input 스타일 (globalStyle 사용)
globalStyle(`${inputNumber} > input`, {
  flex: 1,
  border: 'none',
  backgroundColor: 'transparent',
  padding: 'var(--spacing-xs) var(--spacing-sm)',
  textAlign: 'center',
  fontSize: 'inherit',
  fontFamily: 'inherit',
  color: 'var(--color-text)',
  outline: 'none',
  minWidth: '60px',
});

// 내부 button 기본 스타일 (아이콘만 있는 버튼이므로 정사각형 - width = height)
globalStyle(`${inputNumber} > button`, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.5rem',
  backgroundColor: 'var(--color-surface)',
  border: 'none',
  borderRadius: 0,
  color: 'var(--color-text)',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  userSelect: 'none',
  flexShrink: 0,
  // width와 height는 각 size에 맞게 별도로 설정
});

// 증가 버튼 (마지막 button)
globalStyle(`${inputNumber} > button:last-child`, {
  borderLeft: '1px solid var(--color-divider)',
});

// 감소 버튼 (첫 번째 button)
globalStyle(`${inputNumber} > button:first-child`, {
  borderRight: '1px solid var(--color-divider)',
});

// 버튼 disabled 상태
globalStyle(`${inputNumber} > button:disabled`, {
  opacity: 0.5,
  cursor: 'not-allowed',
});

// 버튼 hover 상태 (disabled가 아닐 때) - Progress 데모와 동일
globalStyle(`${inputNumber} > button:not(:disabled):hover`, {
  backgroundColor: 'var(--color-surface-hover)',
});

// 버튼 active 상태 - Progress 데모와 동일
globalStyle(`${inputNumber} > button:not(:disabled):active`, {
  backgroundColor: 'var(--color-surface-active)',
});

export const size = styleVariants({
  small: {
    height: '1.75rem',
    fontSize: 'var(--font-size-xs)',
  },
  medium: {
    height: 'var(--spacing-2xl)',
    fontSize: 'var(--font-size-sm)',
  },
  large: {
    height: '40px',
    fontSize: 'var(--font-size-base)',
  },
});

// 버튼 기본 스타일 (별도로 사용 가능) - 아이콘만 있는 버튼이므로 정사각형 (width = height)
export const controlButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.5rem',
  backgroundColor: 'var(--color-surface)',
  border: 'none',
  borderRadius: 0,
  color: 'var(--color-text)',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  userSelect: 'none',
  flexShrink: 0,

  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },

  ':hover': {
    backgroundColor: 'var(--color-surface-hover)',
  },

  ':active': {
    backgroundColor: 'var(--color-surface-active)',
  },

  selectors: {
    '&:disabled:hover': {
      backgroundColor: 'var(--color-surface)',
    },
  },
});

// 각 size에 맞는 버튼 스타일 (정사각형 유지: width = height)
export const buttonSmall = style([
  controlButton,
  {
    width: '1.75rem',
    height: '1.75rem',
    minWidth: '1.75rem',
    minHeight: '1.75rem',
    maxWidth: '1.75rem',
    maxHeight: '1.75rem',
  },
]);

export const buttonMedium = style([
  controlButton,
  {
    width: 'var(--spacing-2xl)',
    height: 'var(--spacing-2xl)',
    minWidth: 'var(--spacing-2xl)',
    minHeight: 'var(--spacing-2xl)',
    maxWidth: 'var(--spacing-2xl)',
    maxHeight: 'var(--spacing-2xl)',
  },
]);

export const buttonLarge = style([
  controlButton,
  {
    width: '40px',
    height: '40px',
    minWidth: '40px',
    minHeight: '40px',
    maxWidth: '40px',
    maxHeight: '40px',
  },
]);

// Size별 increment/decrement 버튼 스타일
export const incrementButtonSmall = style([
  buttonSmall,
  {
    borderLeft: '1px solid var(--color-divider)',
  },
]);

export const decrementButtonSmall = style([
  buttonSmall,
  {
    borderRight: '1px solid var(--color-divider)',
  },
]);

export const incrementButtonMedium = style([
  buttonMedium,
  {
    borderLeft: '1px solid var(--color-divider)',
  },
]);

export const decrementButtonMedium = style([
  buttonMedium,
  {
    borderRight: '1px solid var(--color-divider)',
  },
]);

export const incrementButtonLarge = style([
  buttonLarge,
  {
    borderLeft: '1px solid var(--color-divider)',
  },
]);

export const decrementButtonLarge = style([
  buttonLarge,
  {
    borderRight: '1px solid var(--color-divider)',
  },
]);

// 기존 호환성을 위한 스타일 (medium이 기본값)
export const incrementButton = incrementButtonMedium;
export const decrementButton = decrementButtonMedium;

// Input 스타일 (별도로 사용 가능)
export const input = style({
  flex: 1,
  border: 'none',
  backgroundColor: 'transparent',
  padding: 'var(--spacing-xs) var(--spacing-sm)',
  textAlign: 'center',
  fontSize: 'inherit',
  fontFamily: 'inherit',
  color: 'var(--color-text)',
  outline: 'none',
  minWidth: '60px',
});

// InputNumber 커스텀 스타일 (injectStyles=false일 때 사용)
const inputNumberCustomWrapper = style({});

globalStyle(`${inputNumberCustomWrapper} .hcInputNumber`, {
  display: 'inline-flex',
  alignItems: 'stretch',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  overflow: 'hidden',
  background: 'var(--color-surface)',
  color: 'var(--color-text)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${inputNumberCustomWrapper} .hcInputNumber[data-disabled="true"]`, {
  opacity: 0.6,
});

export const inputNumberWrapperClass = inputNumberCustomWrapper;
