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

// Drawer component styles (moved from headless component)
// Mask
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

// Drawer 본체
export const drawer = style({
  position: 'fixed',
  zIndex: 1001,
  backgroundColor: 'var(--color-surface)',
  boxShadow: 'var(--shadow-md)',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
});

// Placement variants
export const placement = styleVariants({
  left: {
    top: 0,
    left: 0,
    bottom: 0,
    width: '378px',
    transform: 'translateX(-100%)',
    boxShadow: 'var(--shadow-md)',
  },

  right: {
    top: 0,
    right: 0,
    bottom: 0,
    width: '378px',
    transform: 'translateX(100%)',
    boxShadow: 'var(--shadow-md)',
  },

  top: {
    top: 0,
    left: 0,
    right: 0,
    height: '378px',
    transform: 'translateY(-100%)',
    boxShadow: 'var(--shadow-md)',
  },

  bottom: {
    bottom: 0,
    left: 0,
    right: 0,
    height: '378px',
    transform: 'translateY(100%)',
    boxShadow: 'var(--shadow-md)',
  },
});

// 열린 상태
export const drawerOpen = style({
  transform: 'translateX(0) translateY(0) !important',
});

// Header
export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 24px',
  borderBottom: '1px solid var(--color-divider)',
  flexShrink: 0,
});

export const title = style({
  fontSize: 'var(--font-size-base)',
  fontWeight: '600',
  color: 'var(--color-text-heading)',
  margin: 0,
});

export const headerActions = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-sm)',
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
  flex: 1,
  padding: '24px',
  overflow: 'auto',
  color: 'var(--color-text)',
  fontSize: 'var(--font-size-sm)',
  lineHeight: '1.6',
});

// Footer
export const footer = style({
  padding: '16px 24px',
  borderTop: '1px solid var(--color-divider)',
  backgroundColor: 'var(--color-surface-hover)',
  flexShrink: 0,
});

// 크기 variants
export const sizeVariants = styleVariants({
  small: {
    width: '256px',
  },

  medium: {
    width: '378px',
  },

  large: {
    width: '736px',
  },

  full: {
    width: '100vw',
  },
});

// 높이 variants (top/bottom용)
export const heightVariants = styleVariants({
  small: {
    height: '256px',
  },

  medium: {
    height: '378px',
  },

  large: {
    height: '736px',
  },

  full: {
    height: '100vh',
  },
});

// 애니메이션
export const drawerAnimation = `
  @keyframes drawer-slide-in-left {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes drawer-slide-in-right {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes drawer-slide-in-top {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes drawer-slide-in-bottom {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

// Drawer 커스텀 스타일 (injectStyles=false일 때 사용)
const drawerCustomWrapper = style({});

globalStyle(`${drawerCustomWrapper} .hcDrawer`, {
  background: 'var(--color-surface)',
  border: '2px dashed var(--color-border)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  display: 'flex',
  flexDirection: 'column',
  minWidth: '12.5rem',
  maxWidth: '100vw',
  maxHeight: '100vh',
});

globalStyle(`${drawerCustomWrapper} .hcDrawerHeader`, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 'var(--spacing-base)',
  padding: 'var(--spacing-base)',
  borderBottom: '2px dashed var(--color-border)',
  background: 'var(--color-surface-hover)',
});

globalStyle(`${drawerCustomWrapper} .hcDrawerBody`, {
  padding: 'var(--spacing-base)',
  overflow: 'auto',
  flex: 1,
});

globalStyle(`${drawerCustomWrapper} .hcDrawerFooter`, {
  padding: 'var(--spacing-base)',
  borderTop: '2px dashed var(--color-border)',
  background: 'var(--color-surface-hover)',
});

export const drawerWrapperClass = drawerCustomWrapper;
