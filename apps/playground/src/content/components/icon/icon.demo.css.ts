import { style, globalStyle } from '@vanilla-extract/css';

export const demoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-xl)',
  padding: 'var(--spacing-lg)',
});

export const demoTitle = style({
  fontSize: 'var(--font-size-lg)',
  fontWeight: '600',
  color: 'var(--color-demo-title)',
  margin: 0,
  marginBottom: 'var(--spacing-title-content)', // 타이틀과 콘텐츠 간격
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-md)',
});

export const sectionTitle = style({
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  color: 'var(--color-text-secondary)',
  margin: 0,
  marginBottom: 'var(--spacing-title-content)', // 타이틀과 콘텐츠 간격
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const iconGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 100px))',
  gap: 'var(--spacing-base)',
  justifyContent: 'start',

  '@media': {
    '(min-width: 640px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 120px))',
    },
    '(min-width: 1024px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 140px))',
    },
  },
});

export const iconItem = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 'var(--spacing-sm)',
  padding: 'var(--spacing-md)',
  borderRadius: '8px',
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-divider)',
  transition: 'all 0.2s ease',

  ':hover': {
    backgroundColor: 'var(--color-surface-hover)',
    borderColor: 'var(--color-border-hover)',
  },
});

export const icon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
});

// Size variants
export const small = style({
  fontSize: 'var(--font-size-base)',
  width: 'var(--spacing-base)',
  height: 'var(--spacing-base)',
});

export const medium = style({
  fontSize: 'var(--font-size-2xl)',
  width: '24px',
  height: 'var(--spacing-xl)',
});

export const large = style({
  fontSize: '32px',
  width: '32px',
  height: 'var(--spacing-2xl)',
});

// Color variants
export const primary = style({
  color: 'var(--color-brand-primary)',
});

export const success = style({
  color: 'var(--color-semantic-success)',
});

export const warning = style({
  color: 'var(--color-semantic-warning)',
});

export const error = style({
  color: 'var(--color-semantic-error)',
});

export const iconLabel = style({
  fontSize: 'var(--font-size-xs)',
  color: 'var(--color-text-secondary)',
  textAlign: 'center',
});

export const textWithIcon = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-md)',
});

export const textItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-sm)',
  padding: 'var(--spacing-sm) var(--spacing-md)',
  borderRadius: '6px',
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-divider)',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
});

export const controls = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-md)',
  padding: 'var(--spacing-base)',
  border: '1px solid var(--border-color)',
  borderRadius: '8px',
  backgroundColor: 'var(--background)',
});

export const controlDescription = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--foreground)',
  lineHeight: '1.5',
  margin: 0,
});

// Icon Gallery Styles
export const galleryContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-xl)',
  padding: 'var(--spacing-xl)',
});

export const galleryControls = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-md)',
});

export const searchInput = style({
  padding: 'var(--spacing-sm) var(--spacing-md)',
  border: '1px solid var(--color-divider)',
  borderRadius: '6px',
  fontSize: 'var(--font-size-sm)',
  backgroundColor: 'var(--color-background)',
  color: 'var(--color-text)',
  outline: 'none',
  transition: 'all 0.2s ease',

  ':focus': {
    borderColor: 'var(--color-brand-primary)',
    boxShadow: '0 0 0 3px var(--color-focus-ring)',
  },

  '::placeholder': {
    color: 'var(--color-text-secondary)',
  },
});

export const categoryTabs = style({
  display: 'flex',
  gap: 'var(--spacing-xs)',
  flexWrap: 'wrap',
});

export const categoryTab = style({
  padding: 'var(--spacing-xs) var(--spacing-md)',
  border: '1px solid var(--color-divider)',
  borderRadius: '6px',
  backgroundColor: 'var(--color-background)',
  color: 'var(--color-text-secondary)',
  fontSize: 'var(--font-size-xs)',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  ':hover': {
    backgroundColor: 'var(--color-background-hover)',
    borderColor: 'var(--color-divider)',
  },
});

export const active = style({
  backgroundColor: 'var(--color-brand-primary)',
  color: 'var(--color-text-on-primary)',
  borderColor: 'var(--color-brand-primary)',

  ':hover': {
    backgroundColor: 'var(--color-brand-primary-hover)',
    borderColor: 'var(--color-brand-primary-hover)',
  },
});

export const selected = style({
  backgroundColor: 'var(--color-brand-primary)',
  borderColor: 'var(--color-brand-primary)',
});

// Use globalStyle to target iconLabel inside selected
globalStyle(`${selected} ${iconLabel}`, {
  color: 'var(--color-text-on-primary)',
});

export const selectedIconInfo = style({
  padding: 'var(--spacing-lg)',
  backgroundColor: 'var(--color-background)',
  border: '1px solid var(--color-divider)',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-md)',
});

export const selectedIconPreview = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-md)',
});

export const selectedIconName = style({
  fontSize: 'var(--font-size-lg)',
  fontWeight: '600',
  color: 'var(--color-text-heading)',
});

export const codeBlock = style({
  position: 'relative',
  padding: 'var(--spacing-md)',
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-divider)',
  borderRadius: '6px',
  fontFamily:
    'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: 'var(--font-size-xs)',
  color: 'var(--color-text)',
  overflowX: 'auto',
});

export const copyButton = style({
  position: 'absolute',
  top: 'var(--spacing-sm)',
  right: 'var(--spacing-sm)',
  padding: 'var(--spacing-xs) var(--spacing-sm)',
  backgroundColor: 'var(--color-brand-primary)',
  color: 'var(--color-text-on-primary)',
  border: 'none',
  borderRadius: '4px',
  fontSize: 'var(--font-size-xs)',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',

  ':hover': {
    backgroundColor: 'var(--color-brand-primary-hover)',
  },
});

export const emptyState = style({
  padding: 'var(--spacing-2xl)',
  textAlign: 'center',
  color: 'var(--color-text-secondary)',
  fontSize: 'var(--font-size-sm)',
});

// Icon 커스텀 스타일 (injectStyles=false일 때 사용)
const iconCustomWrapper = style({});

globalStyle(`${iconCustomWrapper} .hcIcon`, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1,
  width: 'var(--hc-icon-size, var(--spacing-xl))',
  height: 'var(--hc-icon-size, var(--spacing-xl))',
  fontSize: 'var(--hc-icon-size, var(--spacing-xl))',
  padding: 'var(--spacing-xs)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-md)',
  background: 'var(--color-surface)',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
});

export const iconWrapperClass = iconCustomWrapper;
