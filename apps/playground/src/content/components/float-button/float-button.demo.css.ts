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
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-md)',
  position: 'relative',
});

export const sectionTitle = style({
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  color: 'var(--color-text-secondary)',
  margin: 0,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const demoArea = style({
  height: '300px',
  border: '1px solid var(--background)',
  borderRadius: '8px',
  padding: 'var(--spacing-lg)',
  backgroundColor: 'var(--background)',
  overflowY: 'auto',
});

export const demoAreaText = style({
  margin: '0 0 12px 0',
  color: 'var(--color-text-secondary)',
});

// Button base styles
export const floatButton = style({
  position: 'fixed',
  border: 'none',
  borderRadius: '50%',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: 'var(--shadow-md)',
  transition: 'all 0.2s ease',
  zIndex: 1000,

  ':hover': {
    transform: 'scale(1.1)',
    boxShadow: 'var(--shadow-lg)',
  },

  ':active': {
    transform: 'scale(0.95)',
  },
});

// Position variants
export const bottomRight = style({
  bottom: '20px',
  right: '20px',
});

export const bottomLeft = style({
  bottom: '20px',
  left: '20px',
});

export const topRight = style({
  top: '20px',
  right: '20px',
});

export const topLeft = style({
  top: '20px',
  left: '20px',
});

// Size variants
export const small = style({
  width: '40px',
  height: '40px',
  fontSize: 'var(--font-size-base)',
});

export const medium = style({
  width: '56px',
  height: '56px',
  fontSize: 'var(--font-size-xl)',
});

export const large = style({
  width: '72px',
  height: '72px',
  fontSize: 'var(--font-size-2xl)',
});

export const buttonIcon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1,
});

export const buttonIconSmall = style({
  fontSize: 'var(--font-size-sm)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1,
});

export const buttonIconLarge = style({
  fontSize: '22px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1,
});

// Style variants
export const primary = style({
  backgroundColor: 'var(--color-brand-primary)',
  color: 'var(--color-text-on-primary)',
});

export const secondary = style({
  backgroundColor: 'var(--color-text-secondary)',
  color: 'var(--color-text-on-primary)',
});

export const danger = style({
  backgroundColor: 'var(--color-semantic-error)',
  color: 'var(--color-text-on-error)',
});

export const success = style({
  backgroundColor: 'var(--color-semantic-success)',
  color: 'var(--color-text-on-success)',
});

// Demo layouts
export const sizeDemo = style({
  display: 'flex',
  gap: 'var(--spacing-3xl)',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 'var(--spacing-2xl)',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-lg)',
  backgroundColor: 'var(--color-surface)',
  flexWrap: 'wrap',
});

export const sizeItem = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 'var(--spacing-sm)',
  position: 'relative',
});

export const sizeLabel = style({
  fontSize: 'var(--font-size-xs)',
  color: 'var(--color-text-secondary)',
  fontWeight: '500',
});

export const styleDemo = style({
  position: 'relative',
  height: '120px',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-lg)',
  backgroundColor: 'var(--color-surface)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--spacing-base)',
});

export const groupDemo = style({
  position: 'relative',
  height: '120px',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-lg)',
  backgroundColor: 'var(--color-surface)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'center',
  padding: 'var(--spacing-lg)',
  gap: 'var(--spacing-md)',
});

export const controls = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-md)',
  padding: 'var(--spacing-base)',
  border: '1px solid var(--border-color)',
  borderRadius: '8px',
  backgroundColor: 'var(--background)',
  color: 'var(--background)',
});

export const controlDescription = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--foreground)',
  lineHeight: '1.5',
  margin: 0,
});

// FloatButton 커스텀 스타일 (injectStyles=false일 때 사용)
const floatButtonCustomWrapper = style({});

globalStyle(`${floatButtonCustomWrapper} .hcFloatButton`, {
  position: 'absolute',
  border: '2px dashed var(--color-border)',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  transition: 'transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  background: 'var(--color-surface)',
});

globalStyle(`${floatButtonCustomWrapper} .hcFloatButton[data-disabled="true"]`, {
  cursor: 'not-allowed',
});

export const floatButtonWrapperClass = floatButtonCustomWrapper;
