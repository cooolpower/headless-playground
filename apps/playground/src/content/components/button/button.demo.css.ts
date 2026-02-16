import { style, globalStyle, createVar } from '@vanilla-extract/css';

export const demoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-xl)',
});

export const demoTitle = style({
  fontSize: 'var(--font-size-lg)',
  fontWeight: '600',
  color: 'var(--color-demo-title)',
  margin: 0,
  marginBottom: 'var(--spacing-title-content)',
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-xs)',
});

export const sectionTitle = style({
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  color: 'var(--color-text-secondary)',
  margin: 0,
  marginBottom: 'var(--spacing-title-content)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const buttonGroup = style({
  display: 'flex',
  gap: 'var(--spacing-button-group)',
  flexWrap: 'wrap',
  alignItems: 'center',
});

export const discription = style({
  fontSize: 'var(--font-size-md)',
  color: 'var(--color-text-secondary)',
  marginTop: 'var(--spacing-button-paddingY)'
});

export const controls = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-md)',
  padding: 'var(--spacing-base)',
  border: '1px solid var(--color-divider)',
  borderRadius: '4px',
  backgroundColor: 'var(--color-surface-hover)',
});

export const controlItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-sm)',
  fontSize: 'var(--font-size-base)',
  color: 'var(--color-text)',
  cursor: 'pointer',

  ':hover': {
    color: 'var(--color-text)',
  },
});

export const controlDescription = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
  lineHeight: '1.5',
  margin: 0,
});

export const withIcon = style({
  gap: 'var(--spacing-sm)',
});

export const rounded = style({
  borderRadius: '16px',
});

export const example = style({
  padding: 'var(--spacing-base)',
  border: '1px solid var(--color-divider)',
  borderRadius: '4px',
  backgroundColor: 'var(--color-surface)',
});

export const buttonRow = style({
  display: 'flex',
  gap: 'var(--spacing-sm)',
  alignItems: 'center',
  flexWrap: 'wrap',
});

export const codeBlock = style({
  marginTop: '16px',
  position: 'relative',
});

export const code = style({
  backgroundColor: 'var(--color-surface)',
  borderRadius: '4px',
  padding: 'var(--spacing-base)',
  fontSize: 'var(--font-size-sm)',
  lineHeight: '1.5',
  overflowX: 'auto',
  fontFamily:
    'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  color: 'var(--color-text)',
  border: '1px solid var(--color-divider)',
  margin: 0,
});

export const currentPageNumber = style({
  padding: '0 var(--spacing-sm)',
  color: 'var(--color-text-secondary)',
  fontSize: 'var(--font-size-sm)',
});

export const buttonWrapperClass = style({});

globalStyle(`${buttonWrapperClass} .hcButton`, {
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--spacing-base) var(--spacing-xl)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${buttonWrapperClass} .hcButton:hover`, {
  borderColor: 'var(--color-brand-primary)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  transform: 'translateY(-1px)',
});
