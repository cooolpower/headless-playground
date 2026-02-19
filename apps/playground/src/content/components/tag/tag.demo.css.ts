import { style, globalStyle, createVar } from '@vanilla-extract/css';

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

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-md)',
});

export const sectionTitle = style({
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  color: 'var(--color-text-secondary)',
  margin: 0,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const tagGroup = style({
  display: 'flex',
  gap: 'var(--spacing-sm)',
  flexWrap: 'wrap',
  alignItems: 'center',
});

const tagBackgroundColor = createVar();



export const tagWrapper = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '4px 8px',
  borderRadius: '4px',
  backgroundColor: tagBackgroundColor,
  color: 'var(--color-text-muted)',
  fontSize: 'var(--font-size-xs)',
  fontWeight: '500',
  border: '1px solid var(--color-divider)',
  transition: 'all 0.2s ease',
});

globalStyle(tagWrapper, {
  vars: {
    [tagBackgroundColor]: 'var(--color-surface)',
  },
});

globalStyle(`${tagWrapper}:has(.hcTag[data-variant="default"])`, {
  vars: {
    [tagBackgroundColor]: 'var(--color-surface)',
  },
});

globalStyle(`${tagWrapper}:has(.hcTag[data-variant="primary"])`, {
  vars: {
    [tagBackgroundColor]: 'oklch(0.83 0.13 var(--color-info))',
  },
});

globalStyle(`${tagWrapper}:has(.hcTag[data-variant="success"])`, {
  vars: {
    [tagBackgroundColor]: `oklch(0.83 0.13 var(--color-success))`,
  },
});

globalStyle(`${tagWrapper}:has(.hcTag[data-variant="warning"])`, {
  vars: {
    [tagBackgroundColor]: `oklch(0.83 0.13 var(--color-warning))`,
  },
});

globalStyle(` ${tagWrapper}:has(.hcTag[data-variant="error"])`, {
  vars: {
    [tagBackgroundColor]: `oklch(0.83 0.13 var(--color-error))`,
  },
});


// Size variants
export const small = style({
  padding: '2px 6px',
  fontSize: '11px',
});

export const medium = style({
  padding: '4px 8px',
  fontSize: 'var(--font-size-xs)',
});

export const large = style({
  padding: '6px 12px',
  fontSize: 'var(--font-size-sm)',
});

// Type variants
export const basic = style({
  backgroundColor: 'var(--color-surface-hover)',
  borderColor: 'var(--color-divider)',
  color: 'var(--color-text-muted)',
});

export const primary = style({
  backgroundColor: 'var(--color-brand-primary)',
  borderColor: 'var(--color-brand-primary)',
  color: 'var(--color-text-on-primary)',
});

export const success = style({
  backgroundColor: 'var(--color-semantic-success)',
  borderColor: 'var(--color-semantic-success)',
  color: 'var(--color-text-on-success)',
});

export const warning = style({
  backgroundColor: 'var(--color-semantic-warning)',
  borderColor: 'var(--color-semantic-warning)',
  color: 'var(--color-text-on-warning)',
});

export const error = style({
  backgroundColor: 'var(--color-semantic-error)',
  borderColor: 'var(--color-semantic-error)',
  color: 'var(--color-text-on-error)',
});

// Special variants
export const closable = style({
  paddingRight: '4px',
});

export const withIcon = style({
  gap: '4px',
});

export const icon = style({
  fontSize: 'var(--font-size-xs)',
  lineHeight: 1,
});

export const closeButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'var(--spacing-base)',
  height: 'var(--spacing-base)',
  border: 'none',
  background: 'none',
  color: 'currentColor',
  cursor: 'pointer',
  borderRadius: '2px',
  fontSize: 'var(--font-size-sm)',
  lineHeight: 1,
  opacity: 0.6,
  transition: 'opacity 0.2s ease',

  ':hover': {
    opacity: 1,
    backgroundColor: 'var(--color-surface-hover)',
  },
});

export const addButton = style({
  padding: 'var(--spacing-button-paddingY) var(--spacing-button-padding-x)',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text-muted)',
  fontSize: 'var(--font-size-sm)',
  cursor: 'pointer',
  transition: 'var(--transition-button)',

  ':hover': {
    backgroundColor: 'var(--color-surface-hover)',
    borderColor: 'var(--color-border-hover)',
  },
});

export const controls = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-md)',
  padding: 'var(--spacing-card-padding)',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-lg)',
  backgroundColor: 'var(--color-surface)',
});

export const controlDescription = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
  lineHeight: '1.5',
  margin: 0,
});

// Tag 커스텀 스타일 (injectStyles=false일 때 사용)
const tagCustomWrapper = style({});

globalStyle(`${tagCustomWrapper} .hcTag`, {
  display: 'inline-flex',
  alignItems: 'center',
  fontWeight: 'var(--font-weight-medium)',
  borderRadius: 'var(--radius-md)',
  userSelect: 'none',
  border: '2px dashed var(--color-border)',
  background: 'var(--color-surface)',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${tagCustomWrapper} .hcTag[data-disabled="true"]`, {
  opacity: 0.5,
  cursor: 'not-allowed',
});

globalStyle(`${tagCustomWrapper} .hcTagClose`, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: '0.25rem',
  padding: 0,
  background: 'none',
  border: 'none',
  color: 'inherit',
  opacity: 0.7,
  cursor: 'pointer',
});

export const tagWrapperClass = tagCustomWrapper;
