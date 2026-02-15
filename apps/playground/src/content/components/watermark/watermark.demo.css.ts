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
});

export const sectionTitle = style({
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  color: 'var(--foreground)',
  margin: 0,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const watermarkWrapper = style({
  position: 'relative',
  border: '1px solid var(--border-color)',
  borderRadius: '8px',
  overflow: 'hidden',
});

export const watermarkGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 'var(--spacing-md)',
});

export const contentArea = style({
  position: 'relative',
  padding: 'var(--spacing-lg)',
  backgroundColor: 'var(--background)',
  minHeight: '150px',
});

// Watermark background - 실제로는 JavaScript로 동적으로 생성되어야 함
export const watermarkBackground = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '48px',
  fontWeight: 'bold',
  color: 'var(--color-border)',
  opacity: 0.1,
  transform: 'rotate(-45deg)',
  zIndex: 0,
});

export const content = style({
  position: 'relative',
  zIndex: 1,
  maxWidth: '600px',
});

export const miniContent = style({
  fontSize: 'var(--font-size-sm)',
});

export const customContent = style({
  display: 'flex',
  gap: '20px',
  alignItems: 'flex-start',
});

export const imagePlaceholder = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '120px',
  height: '80px',
  backgroundColor: 'var(--background)',
  borderRadius: '4px',
  border: '1px solid var(--border-color)',
});

export const imagePlaceholderIcon = style({
  fontSize: 'var(--font-size-2xl)',
});

export const imagePlaceholderText = style({
  fontSize: '0.625rem',
  color: 'var(--foreground)',
  margin: '4px 0 0 0',
});

export const textBlock = style({
  flex: 1,
});

export const textBlockTitle = style({
  fontSize: 'var(--font-size-base)',
  fontWeight: '600',
  color: 'var(--foreground)',
  margin: '0 0 8px 0',
});

export const textBlockParagraph = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--foreground)',
  lineHeight: '1.5',
  margin: '0 0 12px 0',
});

export const textBlockList = style({
  margin: 0,
  paddingLeft: '20px',
});

export const textBlockListItem = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--foreground)',
  lineHeight: '1.4',
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

// Watermark 커스텀 스타일 (injectStyles=false일 때 사용)
const watermarkCustomWrapper = style({});

globalStyle(`${watermarkCustomWrapper} .hcWatermarkContainer`, {
  position: 'relative',
  overflow: 'hidden',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${watermarkCustomWrapper} .hcWatermark`, {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) rotate(-45deg)',
  fontSize: '3rem',
  fontWeight: 700,
  color: 'var(--color-text-heading)',
  opacity: 'var(--hc-watermark-opacity, 0.1)',
  pointerEvents: 'none',
  zIndex: 0,
  whiteSpace: 'nowrap',
  border: '1px dashed var(--color-border)',
});

export const watermarkWrapperClass = watermarkCustomWrapper;
