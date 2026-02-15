import { style, globalStyle } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
  padding: 'var(--spacing-base)',
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

export const colorPickerWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-sm)',
  padding: 'var(--spacing-sm)',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--color-surface)',
  width: 'fit-content',
});

export const colorPreviewWrapper = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

export const colorInputNative = style({
  position: 'absolute',
  opacity: 0,
  width: 0,
  height: 0,
  pointerEvents: 'none',
});

export const colorPreview = style({
  width: '40px',
  height: '40px',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--color-divider)',
  cursor: 'pointer',
  transition: 'transform 0.2s ease',
  flexShrink: 0,
  ':hover': {
    transform: 'scale(1.05)',
  },
});

export const colorInput = style({
  padding: 'var(--spacing-xs) var(--spacing-sm)',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-sm)',
  fontSize: 'var(--font-size-sm)',
  //fontFamily: 'var(--font-family-nanumGothic)',
  width: '100px',
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text)',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  ':focus': {
    borderColor: 'var(--color-brand-primary)',
    boxShadow: '0 0 0 2px var(--color-focus-ring)',
  },
});

export const formatSelector = style({
  display: 'flex',
  gap: 'var(--spacing-xs)',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-sm)',
  padding: '2px',
  backgroundColor: 'var(--color-background)',
});

export const formatButton = style({
  padding: 'var(--spacing-xs) var(--spacing-sm)',
  border: 'none',
  borderRadius: 'var(--radius-xs)',
  fontSize: 'var(--font-size-xs)',
  fontWeight: '500',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  color: 'var(--color-text-secondary)',
  transition: 'all 0.2s ease',
  ':hover': {
    backgroundColor: 'var(--color-surface-hover)',
    color: 'var(--color-text)',
  },
});

export const formatButtonActive = style({
  backgroundColor: 'var(--color-brand-primary)',
  color: 'var(--color-text-on-primary)',
  ':hover': {
    backgroundColor: 'var(--color-brand-primary-hover)',
    color: 'var(--color-text-on-primary)',
  },
});

export const presetGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
  gap: 'var(--spacing-sm)',
  marginTop: 'var(--spacing-base)',
});

export const presetSwatch = style({
  width: '100%',
  aspectRatio: '1',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-sm)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  padding: 0,
  ':hover': {
    transform: 'scale(1.1)',
    boxShadow: 'var(--shadow-md)',
    zIndex: 1,
    position: 'relative',
  },
});

export const alphaSlider = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-xs)',
  marginTop: 'var(--spacing-base)',
});

export const alphaLabel = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
  fontWeight: '500',
});

export const alphaInput = style({
  width: '100%',
  height: '6px',
  borderRadius: '3px',
  outline: 'none',
  cursor: 'pointer',
  appearance: 'none',
  backgroundColor: 'var(--color-divider)',
  '::-webkit-slider-thumb': {
    appearance: 'none',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-brand-primary)',
    cursor: 'pointer',
    border: '2px solid var(--color-surface)',
  },
  '::-moz-range-thumb': {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-brand-primary)',
    cursor: 'pointer',
    border: '2px solid var(--color-surface)',
  },
});

export const colorInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-xs)',
  marginTop: 'var(--spacing-base)',
  padding: 'var(--spacing-sm)',
  backgroundColor: 'var(--color-surface)',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--color-divider)',
});

export const colorValue = style({
  fontSize: 'var(--font-size-sm)',
  fontFamily: 'var(--font-family-nanumGothic)',
  color: 'var(--color-text-secondary)',
});

export const livePreview = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
  marginTop: 'var(--spacing-base)',
});

export const previewSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-sm)',
  padding: 'var(--spacing-base)',
  backgroundColor: 'var(--color-surface)',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--color-divider)',
});

export const previewLabel = style({
  fontSize: 'var(--font-size-sm)',
  fontWeight: '600',
  color: 'var(--color-text-secondary)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: 'var(--spacing-xs)',
});

export const previewBox = style({
  padding: 'var(--spacing-base)',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--color-surface)',
  textAlign: 'center',
  fontWeight: '500',
  minHeight: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid var(--color-divider)',
});

export const buttonPreviewGroup = style({
  display: 'flex',
  gap: 'var(--spacing-sm)',
  flexWrap: 'wrap',
});

export const previewButton = style({
  padding: 'var(--spacing-sm) var(--spacing-base)',
  borderRadius: 'var(--radius-md)',
  border: 'none',
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  minWidth: '80px',
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: 'var(--shadow-md)',
  },
  ':active': {
    transform: 'translateY(0)',
  },
});

export const linkPreviewGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-sm)',
});

export const previewLink = style({
  fontSize: 'var(--font-size-base)',
  textDecoration: 'none',
  fontWeight: '500',
  transition: 'opacity 0.2s ease',
  ':hover': {
    textDecoration: 'underline',
    opacity: 0.8,
  },
  ':visited': {
    opacity: 0.7,
  },
});

// ColorPicker 커스텀 스타일 (injectStyles=false일 때 사용)
const colorPickerCustomWrapper = style({});

globalStyle(`${colorPickerCustomWrapper} .hcColorPicker`, {
  display: 'inline-flex',
  flexDirection: 'column',
  gap: '0.5rem',
  width: 'max-content',
  padding: 'var(--spacing-base)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${colorPickerCustomWrapper} .hcColorPickerSwatch`, {
  width: '2rem',
  height: '2rem',
  borderRadius: 'var(--radius-md)',
  border: '2px dashed var(--color-border)',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
});

globalStyle(`${colorPickerCustomWrapper} .hcColorPickerInput`, {
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-md)',
  background: 'var(--color-surface)',
  color: 'var(--color-text)',
  padding: '0.5rem 0.75rem',
  minWidth: '12rem',
});

export const colorPickerWrapperClass = colorPickerCustomWrapper;