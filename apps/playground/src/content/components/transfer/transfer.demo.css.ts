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

// Transfer component styles (moved from headless component)
export const transfer = style({
  display: 'flex',
  alignItems: 'stretch',
  gap: 'var(--spacing-sm)',
});

// Transfer 리스트
export const transferList = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--color-surface)',
  minHeight: '200px',
  maxHeight: '300px',
});

export const transferListHeader = style({
  padding: '12px 16px',
  borderBottom: '1px solid var(--color-divider)',
  backgroundColor: 'var(--color-surface-hover)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
});

export const transferListTitle = style({
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  color: 'var(--color-text-heading)',
});

export const transferListSearch = style({
  padding: 'var(--spacing-sm) var(--spacing-base)',
  borderBottom: '1px solid var(--color-divider)',
});

export const searchInput = style({
  width: '100%',
  padding: '6px 12px',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-sm)',
  fontSize: 'var(--font-size-sm)',
  outline: 'none',

  ':focus': {
    borderColor: 'var(--color-brand-primary)',
    boxShadow: '0 0 0 2px var(--color-focus-ring)',
  },

  '::placeholder': {
    color: 'var(--color-text-muted)',
  },
});

export const transferListBody = style({
  flex: 1,
  overflow: 'auto',
});

export const transferListContent = style({
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const transferListItem = style({
  padding: 'var(--spacing-sm) var(--spacing-base)',
  borderBottom: '1px solid var(--color-divider)',

  ':last-child': {
    borderBottom: 'none',
  },

  ':hover': {
    backgroundColor: 'var(--color-surface-hover)',
  },
});

// 체크박스 레이블
export const checkboxLabel = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-sm)',
  cursor: 'pointer',
  fontSize: 'var(--font-size-sm)',
  width: '100%',
});

export const itemLabel = style({
  width: '100%',
  cursor: 'pointer',
});

export const itemContent = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
});

export const itemDescription = style({
  fontSize: 'var(--font-size-xs)',
  color: 'var(--color-text-secondary)',
});

export const count = style({
  color: 'var(--color-semantic-info)',
  fontSize: 'var(--font-size-xs)',
});

// 이동 버튼들
export const transferOperations = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--spacing-sm)',
  padding: '0 16px',
});

export const operationButton = style({
  padding: '12px',
  border: '1px solid var(--color-divider)',
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text)',
  cursor: 'pointer',
  borderRadius: 'var(--radius-sm)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'bold',
  minWidth: '40px',
  transition: 'all 0.2s ease-in-out',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  ':disabled': {
    backgroundColor: 'var(--color-surface-hover)',
    color: 'var(--color-text-disabled)',
    cursor: 'not-allowed',
    borderColor: 'var(--color-divider)',
  },
});

export const operationButtonEnabled = style({
  backgroundColor: 'var(--color-brand-primary)',
  color: 'var(--color-text-on-primary)',
  borderColor: 'var(--color-brand-primary)',
});

// 반응형 디자인
export const transferResponsive = style({
  '@media': {
    '(max-width: 768px)': {
      flexDirection: 'column',
      gap: 'var(--spacing-base)',

      [transferOperations]: {
        flexDirection: 'row',
        padding: '16px 0',
      },
    },
  },
});

// 테마 variants
export const themeVariants = {
  default: {
    border: 'var(--color-divider)',
    background: 'var(--color-surface)',
    headerBackground: 'var(--color-surface-hover)',
    titleColor: 'var(--color-text-heading)',
    itemBorder: 'var(--color-divider)',
    itemHoverBackground: 'var(--color-surface-hover)',
    descriptionColor: 'var(--color-text-secondary)',
    countColor: 'var(--color-semantic-info)',
    buttonBorder: 'var(--color-divider)',
    buttonBackground: 'var(--color-surface)',
    buttonColor: 'var(--color-text)',
    buttonHoverBorder: 'var(--color-brand-primary)',
    buttonHoverColor: 'var(--color-brand-primary)',
    buttonActiveBackground: 'var(--color-brand-primary)',
    buttonActiveColor: 'var(--color-text-on-primary)',
  },

  dark: {
    border: 'var(--color-divider)',
    background: 'var(--color-neutral-200)',
    headerBackground: 'var(--color-neutral-300)',
    titleColor: 'var(--color-text)',
    itemBorder: 'var(--color-divider)',
    itemHoverBackground: 'var(--color-neutral-300)',
    descriptionColor: 'var(--color-text-secondary)',
    countColor: 'var(--color-semantic-info)',
    buttonBorder: 'var(--color-divider)',
    buttonBackground: 'var(--color-neutral-200)',
    buttonColor: 'var(--color-text-secondary)',
    buttonHoverBorder: 'var(--color-brand-primary)',
    buttonHoverColor: 'var(--color-brand-primary)',
    buttonActiveBackground: 'var(--color-brand-primary)',
    buttonActiveColor: 'var(--color-text-on-primary)',
  },
};

// Transfer 커스텀 스타일 (injectStyles=false일 때 사용)
const transferCustomWrapper = style({});

globalStyle(`${transferCustomWrapper} .hcTransfer`, {
  display: 'flex',
  alignItems: 'stretch',
  gap: 'var(--spacing-base)',
  width: '100%',
  padding: 'var(--spacing-base)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${transferCustomWrapper} .hcTransferList`, {
  flex: 1,
  minWidth: 0,
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
});

globalStyle(`${transferCustomWrapper} .hcTransferListHeader`, {
  padding: 'var(--spacing-sm) var(--spacing-base)',
  borderBottom: '2px dashed var(--color-border)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 'var(--spacing-sm)',
  background: 'var(--color-surface-hover)',
});

export const transferWrapperClass = transferCustomWrapper;
