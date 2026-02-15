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

// Collapse component styles (moved from headless component)
export const collapse = style({
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--color-surface)',
});

export const collapsePanel = style({
  borderBottom: '1px solid var(--color-divider)',

  ':last-child': {
    borderBottom: 'none',
  },
});

export const collapsePanelActive = style({
  // 활성화된 패널에 대한 추가 스타일
});

export const collapseHeader = style({
  display: 'flex',
  alignItems: 'center',
  padding: '12px 16px',
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'all 0.2s ease-in-out',
  backgroundColor: 'var(--color-surface-hover)',

  ':hover': {
    backgroundColor: 'var(--color-surface)',
  },

  ':focus': {
    outline: '2px solid var(--color-brand-primary)',
    outlineOffset: '2px',
  },
});

export const collapseHeaderDisabled = style({
  cursor: 'not-allowed',
  opacity: 0.5,

  ':hover': {
    backgroundColor: 'var(--color-surface-hover)',
  },
});

export const expandIconWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'var(--spacing-base)',
  height: 'var(--spacing-base)',
  marginRight: '8px',
  transition: 'transform 0.2s ease-in-out',
});

export const expandIcon = style({
  display: 'inline-block',
  fontSize: 'var(--font-size-xs)',
  lineHeight: '16px',
  color: 'var(--color-text-secondary)',
  transition: 'transform 0.2s ease-in-out',
});

export const expandIconActive = style({
  transform: 'rotate(90deg)',
});

export const collapseHeaderContent = style({
  flex: 1,
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  color: 'var(--color-text-heading)',
});

export const collapseExtra = style({
  marginLeft: 'auto',
  marginRight: '16px',
});

export const collapseContent = style({
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
  backgroundColor: 'var(--color-surface)',
});

export const collapseContentActive = style({
  // 활성화된 콘텐츠에 대한 추가 스타일
});

export const collapseContentBox = style({
  padding: '0 16px 16px 16px',
  color: 'var(--color-text)',
  fontSize: 'var(--font-size-sm)',
  lineHeight: '1.6',
});

// 애니메이션 keyframes
export const collapseAnimation = `
  @keyframes collapse-slide-down {
    from {
      height: 0;
      opacity: 0;
    }
    to {
      height: var(--collapse-panel-height);
      opacity: 1;
    }
  }

  @keyframes collapse-slide-up {
    from {
      height: var(--collapse-panel-height);
      opacity: 1;
    }
    to {
      height: 0;
      opacity: 0;
    }
  }
`;

// 크기 variants
export const sizeVariants = {
  small: {
    header: {
      padding: '8px 12px',
      fontSize: '0.8125rem',
    },
    content: {
      padding: '0 12px 12px 12px',
      fontSize: '0.8125rem',
    },
  },

  medium: {
    header: {
      padding: '12px 16px',
      fontSize: 'var(--font-size-sm)',
    },
    content: {
      padding: '0 16px 16px 16px',
      fontSize: 'var(--font-size-sm)',
    },
  },

  large: {
    header: {
      padding: '16px 20px',
      fontSize: 'var(--font-size-base)',
    },
    content: {
      padding: '0 20px 20px 20px',
      fontSize: 'var(--font-size-base)',
    },
  },
};

// 테마 variants
export const themeVariants = {
  default: {
    border: 'var(--color-divider)',
    headerBg: 'var(--color-surface-hover)',
    headerHoverBg: 'var(--color-surface)',
    contentBg: 'var(--color-surface)',
    headerColor: 'var(--color-text-heading)',
    contentColor: 'var(--color-text)',
    iconColor: 'var(--color-text-secondary)',
  },

  bordered: {
    border: 'var(--color-divider)',
    headerBg: 'var(--color-surface)',
    headerHoverBg: 'var(--color-surface-hover)',
    contentBg: 'var(--color-surface)',
    headerColor: 'var(--color-text-heading)',
    contentColor: 'var(--color-text)',
    iconColor: 'var(--color-text-secondary)',
  },

  ghost: {
    border: 'transparent',
    headerBg: 'transparent',
    headerHoverBg: 'var(--color-surface-hover)',
    contentBg: 'transparent',
    headerColor: 'var(--color-text-heading)',
    contentColor: 'var(--color-text)',
    iconColor: 'var(--color-text-secondary)',
  },
};

// Collapse 커스텀 스타일 (injectStyles=false일 때 사용)
const collapseCustomWrapper = style({});

globalStyle(`${collapseCustomWrapper} .hcCollapse`, {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

globalStyle(`${collapseCustomWrapper} .hcCollapsePanel`, {
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  overflow: 'hidden',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${collapseCustomWrapper} .hcCollapseHeader`, {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.75rem 0.875rem',
  cursor: 'pointer',
  userSelect: 'none',
  background: 'var(--color-surface-hover)',
});

globalStyle(`${collapseCustomWrapper} .hcCollapseHeader:hover`, {
  background: 'var(--color-surface)',
});

globalStyle(`${collapseCustomWrapper} .hcCollapsePanel[data-disabled="true"] .hcCollapseHeader`, {
  cursor: 'not-allowed',
  opacity: 0.6,
});

globalStyle(`${collapseCustomWrapper} .hcCollapseHeaderMain`, {
  flex: '1 1 auto',
  minWidth: 0,
  fontWeight: 600,
  color: 'var(--color-text-heading)',
});

globalStyle(`${collapseCustomWrapper} .hcCollapseExtra`, {
  flex: 'none',
  color: 'var(--color-text-secondary)',
});

globalStyle(`${collapseCustomWrapper} .hcCollapseArrow`, {
  flex: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '1rem',
  height: '1rem',
  color: 'var(--color-text-secondary)',
  transition: 'transform 0.2s ease',
});

globalStyle(`${collapseCustomWrapper} .hcCollapsePanel[data-active="true"] .hcCollapseArrow`, {
  transform: 'rotate(90deg)',
});

globalStyle(`${collapseCustomWrapper} .hcCollapseContent`, {
  padding: '0.75rem 0.875rem',
  borderTop: '2px dashed var(--color-divider)',
  color: 'var(--color-text)',
});

export const collapseWrapperClass = collapseCustomWrapper;
