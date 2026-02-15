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

// Pagination component styles (moved from headless component)
export const pagination = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-sm)',
  fontSize: 'var(--font-size-sm)',
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

// 심플 모드
export const simple = style({
  justifyContent: 'center',
});

export const simpleText = style({
  margin: '0 8px',
  fontWeight: '500',
});

// 총 개수 표시
export const total = style({
  marginRight: 'auto',
  color: 'var(--color-text-secondary)',
});

// 페이지 버튼들 컨테이너
export const pages = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

// 페이지 버튼
export const pageButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '32px',
  height: 'var(--spacing-2xl)',
  padding: '4px 8px',
  border: '1px solid var(--color-divider)',
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text)',
  cursor: 'pointer',
  borderRadius: 'var(--radius-sm)',
  transition: 'all 0.2s ease-in-out',
  fontSize: 'var(--font-size-sm)',
  fontWeight: '400',

  ':hover': {
    backgroundColor: 'var(--color-surface-hover)',
    borderColor: 'var(--color-brand-primary)',
  },

  ':focus': {
    outline: '2px solid var(--color-brand-primary)',
    outlineOffset: '2px',
  },
});

// 활성화된 페이지 버튼
export const active = style({
  backgroundColor: 'var(--color-brand-primary)',
  borderColor: 'var(--color-brand-primary)',
  color: 'var(--color-text-on-primary)',

  ':hover': {
    backgroundColor: 'var(--color-brand-primary-hover)',
    borderColor: 'var(--color-brand-primary-hover)',
  },
});

// 비활성화된 버튼
export const disabled = style({
  cursor: 'not-allowed',
  opacity: 0.5,

  ':hover': {
    backgroundColor: 'var(--color-surface)',
    borderColor: 'var(--color-divider)',
  },
});

// 페이지 크기 변경
export const sizeChanger = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  marginLeft: '16px',
});

export const sizeSelect = style({
  padding: '4px 8px',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-sm)',
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text)',
  cursor: 'pointer',
  fontSize: 'var(--font-size-sm)',

  ':focus': {
    outline: '2px solid var(--color-brand-primary)',
    outlineOffset: '2px',
  },
});

// 빠른 점프
export const quickJumper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  marginLeft: '16px',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text)',
});

export const quickInput = style({
  width: '60px',
  padding: '4px 8px',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-sm)',
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text)',
  textAlign: 'center',
  fontSize: 'var(--font-size-sm)',

  ':focus': {
    outline: '2px solid var(--color-brand-primary)',
    outlineOffset: '2px',
  },
});

// 크기 variants
export const sizeVariants = {
  small: {
    pageButton: {
      minWidth: 'var(--spacing-xl)',
      height: 'var(--spacing-xl)',
      fontSize: 'var(--font-size-xs)',
    },
    sizeSelect: {
      fontSize: 'var(--font-size-xs)',
    },
    quickInput: {
      width: '50px',
      fontSize: 'var(--font-size-xs)',
    },
  },

  medium: {
    pageButton: {
      minWidth: '32px',
      height: 'var(--spacing-2xl)',
      fontSize: 'var(--font-size-sm)',
    },
    sizeSelect: {
      fontSize: 'var(--font-size-sm)',
    },
    quickInput: {
      width: '60px',
      fontSize: 'var(--font-size-sm)',
    },
  },

  large: {
    pageButton: {
      minWidth: '40px',
      height: '40px',
      fontSize: 'var(--font-size-base)',
    },
    sizeSelect: {
      fontSize: 'var(--font-size-base)',
    },
    quickInput: {
      width: '70px',
      fontSize: 'var(--font-size-base)',
    },
  },
};

// Pagination 커스텀 스타일 (injectStyles=false일 때 사용)
const paginationCustomWrapper = style({});

globalStyle(`${paginationCustomWrapper} .hcPagination`, {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-tight)',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text)',
  padding: 'var(--spacing-sm)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${paginationCustomWrapper} .hcPaginationBtn`, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '2rem',
  height: '2rem',
  padding: '0 var(--spacing-tight)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-md)',
  background: 'var(--color-surface)',
  color: 'var(--color-text)',
  userSelect: 'none',
  transition: 'all 0.2s',
});

globalStyle(`${paginationCustomWrapper} .hcPaginationBtn[aria-disabled="true"]`, {
  opacity: 0.5,
  cursor: 'not-allowed',
});

globalStyle(`${paginationCustomWrapper} .hcPaginationBtn[data-active="true"]`, {
  borderColor: 'var(--color-brand-primary)',
  borderStyle: 'solid',
  color: 'var(--color-brand-primary)',
});

export const paginationWrapperClass = paginationCustomWrapper;
