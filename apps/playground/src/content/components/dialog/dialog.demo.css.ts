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

// Dialog component styles (moved from headless component)
// Mask (배경)
export const mask = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'var(--color-neutral-1000)',
  zIndex: 1000,
  opacity: 0,
  transition: 'opacity 0.3s ease-in-out',
});

export const maskVisible = style({
  opacity: 1,
});

// Dialog wrapper
export const dialogWrapper = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1001,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
});

export const centered = style({
  alignItems: 'center',
  justifyContent: 'center',
});

// Dialog 본체
export const dialog = style({
  backgroundColor: 'var(--color-surface)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--shadow-md)',
  maxWidth: '90vw',
  maxHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  animation: 'dialog-fade-in 0.3s ease-out',
});

// Header
export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 24px',
  borderBottom: '1px solid var(--color-divider)',
  borderRadius: '8px 8px 0 0',
});

export const title = style({
  fontSize: 'var(--font-size-base)',
  fontWeight: '600',
  color: 'var(--color-text-heading)',
  margin: 0,
});

export const closeButton = style({
  background: 'none',
  border: 'none',
  fontSize: 'var(--font-size-2xl)',
  lineHeight: '1',
  color: 'var(--color-text-secondary)',
  cursor: 'pointer',
  padding: '0',
  width: '32px',
  height: 'var(--spacing-2xl)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  transition: 'all 0.2s ease-in-out',

  ':hover': {
    backgroundColor: 'var(--color-surface-hover)',
    color: 'var(--color-text)',
  },

  ':focus': {
    outline: '2px solid var(--color-brand-primary)',
    outlineOffset: '2px',
  },
});

// Body
export const body = style({
  padding: '24px',
  flex: 1,
  overflow: 'auto',
  color: 'var(--color-text)',
  fontSize: 'var(--font-size-sm)',
  lineHeight: '1.6',
});

// Footer
export const footer = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 'var(--spacing-sm)',
  padding: '16px 24px',
  borderTop: '1px solid var(--color-divider)',
  borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
  backgroundColor: 'var(--color-surface-hover)',
});

export const cancelButton = style({
  padding: '6px 16px',
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-sm)',
  color: 'var(--color-text)',
  cursor: 'pointer',
  fontSize: 'var(--font-size-sm)',
  transition: 'all 0.2s ease-in-out',

  ':hover': {
    backgroundColor: 'var(--color-surface-hover)',
  },

  ':focus': {
    outline: '2px solid var(--color-brand-primary)',
    outlineOffset: '2px',
  },

  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

export const okButton = style({
  padding: '6px 16px',
  backgroundColor: 'var(--color-brand-primary)',
  border: '1px solid var(--color-brand-primary)',
  borderRadius: 'var(--radius-sm)',
  color: 'var(--color-text-on-primary)',
  cursor: 'pointer',
  fontSize: 'var(--font-size-sm)',
  transition: 'all 0.2s ease-in-out',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',

  ':hover': {
    backgroundColor: 'var(--color-brand-primary-hover)',
    borderColor: 'var(--color-brand-primary-hover)',
  },

  ':focus': {
    outline: '2px solid var(--color-brand-primary)',
    outlineOffset: '2px',
  },

  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

export const loadingSpinner = style({
  display: 'inline-block',
  animation: 'spin 1s linear infinite',
  fontSize: 'var(--font-size-xs)',
});

// 애니메이션
export const dialogAnimation = `
  @keyframes dialog-fade-in {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(-20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

// 크기 variants
export const sizeVariants = {
  small: {
    width: '416px',
  },

  medium: {
    width: '520px',
  },

  large: {
    width: '800px',
  },

  full: {
    width: 'calc(100vw - 48px)',
    height: 'calc(100vh - 48px)',
  },
};

// 테마 variants
export const themeVariants = {
  default: {
    background: 'var(--color-surface)',
    border: 'var(--color-divider)',
    titleColor: 'var(--color-text-heading)',
    contentColor: 'var(--color-text)',
    footerBackground: 'var(--color-surface-hover)',
  },

  dark: {
    background: 'var(--color-neutral-200)',
    border: 'var(--color-divider)',
    titleColor: 'var(--color-text)',
    contentColor: 'var(--color-text-secondary)',
    footerBackground: 'var(--color-neutral-300)',
  },
};

// Dialog 커스텀 스타일 (injectStyles=false일 때 사용)
const dialogCustomWrapper = style({});

globalStyle(`${dialogCustomWrapper} .hcDialog`, {
  width: 'var(--hc-dialog-width, 32.5rem)',
  maxWidth: '90vw',
  maxHeight: '90vh',
  background: 'var(--color-surface)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});

globalStyle(`${dialogCustomWrapper} .hcDialogHeader`, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 'var(--spacing-base)',
  padding: 'var(--spacing-base) var(--spacing-2xl)',
  borderBottom: '2px dashed var(--color-border)',
  background: 'var(--color-surface-hover)',
});

globalStyle(`${dialogCustomWrapper} .hcDialogBody`, {
  padding: 'var(--spacing-2xl)',
  overflow: 'auto',
  flex: 1,
  color: 'var(--color-text)',
  fontSize: 'var(--font-size-sm)',
  lineHeight: 1.6,
});

globalStyle(`${dialogCustomWrapper} .hcDialogFooter`, {
  padding: 'var(--spacing-base) var(--spacing-2xl)',
  borderTop: '2px dashed var(--color-border)',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 'var(--spacing-sm)',
  background: 'var(--color-surface-hover)',
});

export const dialogWrapperClass = dialogCustomWrapper;
