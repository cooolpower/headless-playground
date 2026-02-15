import { style, globalStyle } from '@vanilla-extract/css';

// Demo-specific styles
export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
});

// Empty component styles (moved from headless component)
export const empty = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 16px',
  textAlign: 'center',
});

export const imageContainer = style({
  marginBottom: '16px',
  opacity: 0.5,
});

export const image = style({
  width: '64px',
  height: '41px',
});

export const description = style({
  color: 'var(--color-text-secondary)',
  fontSize: 'var(--font-size-sm)',
  lineHeight: '1.5',
  marginBottom: '16px',
});

export const footer = style({
  display: 'flex',
  gap: 'var(--spacing-sm)',
  justifyContent: 'center',
});

// 크기 variants
export const sizeVariants = {
  small: {
    padding: '24px 12px',
    image: {
      width: '48px',
      height: '31px',
    },
    description: {
      fontSize: 'var(--font-size-xs)',
    },
  },

  medium: {
    padding: '40px 16px',
    image: {
      width: '64px',
      height: '41px',
    },
    description: {
      fontSize: 'var(--font-size-sm)',
    },
  },

  large: {
    padding: '64px 24px',
    image: {
      width: '80px',
      height: '51px',
    },
    description: {
      fontSize: 'var(--font-size-base)',
    },
  },
};

// 테마 variants
export const themeVariants = {
  default: {
    descriptionColor: 'var(--color-text-secondary)',
  },

  light: {
    descriptionColor: 'var(--color-text-secondary)',
  },

  dark: {
    descriptionColor: 'var(--color-text-secondary)',
  },
};

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

// Empty 커스텀 스타일 (injectStyles=false일 때 사용)
const emptyCustomWrapper = style({});

globalStyle(`${emptyCustomWrapper} .hcEmpty`, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: 'var(--spacing-base)',
  color: 'var(--color-text-secondary)',
  padding: 'var(--spacing-2xl)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${emptyCustomWrapper} .hcEmptyDesc`, {
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
});

export const emptyWrapperClass = emptyCustomWrapper;
