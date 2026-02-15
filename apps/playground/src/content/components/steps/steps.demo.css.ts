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

// Steps component styles (moved from headless component)
export const steps = style({
  display: 'flex',
  width: '100%',
});

// 방향 variants
export const direction = styleVariants({
  horizontal: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  vertical: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
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

// 개별 스텝
export const step = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-start',
  flex: 1,
});

export const stepContainer = style({
  display: 'flex',
  alignItems: 'flex-start',
  position: 'relative',
});

// 스텝 아이콘
export const stepIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: 'var(--spacing-2xl)',
  borderRadius: '50%',
  backgroundColor: 'var(--color-surface-hover)',
  color: 'var(--color-text-secondary)',
  border: '2px solid var(--color-divider)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  marginRight: '12px',
  transition: 'all 0.3s ease-in-out',
  flexShrink: 0,
});

export const clickable = style({
  cursor: 'pointer',

  ':hover': {
    borderColor: 'var(--color-brand-primary)',
  },
});

// 상태별 스타일
export const status = styleVariants({
  wait: {
    backgroundColor: 'var(--color-surface-hover)',
    color: 'var(--color-text-secondary)',
    borderColor: 'var(--color-divider)',
  },

  process: {
    backgroundColor: 'var(--color-brand-primary)',
    color: 'var(--color-text-on-primary)',
    borderColor: 'var(--color-brand-primary)',
  },

  finish: {
    backgroundColor: 'var(--color-semantic-success)',
    color: 'var(--color-text-on-success)',
    borderColor: 'var(--color-semantic-success)',
  },

  error: {
    backgroundColor: 'var(--color-semantic-error)',
    color: 'var(--color-text-on-error)',
    borderColor: 'var(--color-semantic-error)',
  },
});

export const disabled = style({
  cursor: 'not-allowed',
  opacity: 0.5,
});

// 스텝 콘텐츠
export const stepContent = style({
  flex: 1,
  minWidth: 0,
});

export const stepTitle = style({
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  lineHeight: '1.5',
  marginBottom: '4px',
  color: 'var(--color-text-heading)',
});

export const stepDescription = style({
  fontSize: 'var(--font-size-xs)',
  color: 'var(--color-text-secondary)',
  lineHeight: '1.4',
});

// 스텝 꼬리 (연결선)
export const stepTail = style({
  position: 'absolute',
  top: '16px',
  left: '32px',
  width: '100%',
  height: '1px',
  backgroundColor: 'var(--color-divider)',
});

// 수직 방향 연결선
export const stepTailVertical = style({
  position: 'absolute',
  left: '16px',
  top: '32px',
  width: '1px',
  height: '100%',
  backgroundColor: 'var(--color-divider)',
});

// 크기별 스타일
export const sizeVariants = {
  small: {
    stepIcon: {
      width: '24px',
      height: 'var(--spacing-xl)',
      fontSize: 'var(--font-size-xs)',
      marginRight: '8px',
    },
    stepTitle: {
      fontSize: 'var(--font-size-xs)',
    },
    stepDescription: {
      fontSize: '11px',
    },
  },

  medium: {
    stepIcon: {
      width: '32px',
      height: 'var(--spacing-2xl)',
      fontSize: 'var(--font-size-sm)',
      marginRight: '12px',
    },
    stepTitle: {
      fontSize: 'var(--font-size-sm)',
    },
    stepDescription: {
      fontSize: 'var(--font-size-xs)',
    },
  },

  large: {
    stepIcon: {
      width: '40px',
      height: '40px',
      fontSize: 'var(--font-size-base)',
      marginRight: '16px',
    },
    stepTitle: {
      fontSize: 'var(--font-size-base)',
    },
    stepDescription: {
      fontSize: 'var(--font-size-sm)',
    },
  },
};

// Steps 커스텀 스타일 (injectStyles=false일 때 사용)
const stepsCustomWrapper = style({});

globalStyle(`${stepsCustomWrapper} .hcSteps`, {
  display: 'flex',
  gap: '1rem',
  width: '100%',
  padding: 'var(--spacing-base)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${stepsCustomWrapper} .hcStepIcon`, {
  flex: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '9999px',
  border: '2px dashed var(--color-border)',
  background: 'var(--color-surface)',
  color: 'var(--color-text)',
  fontWeight: 700,
  lineHeight: 1,
  padding: 0,
});

export const stepsWrapperClass = stepsCustomWrapper;
