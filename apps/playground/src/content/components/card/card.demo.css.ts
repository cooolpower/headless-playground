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

export const cardGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: 'var(--spacing-card-gap)',
});

export const cardWrapper = style({
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-xl)',
  backgroundColor: 'var(--color-surface)',
  boxShadow: 'var(--shadow-sm)',
  transition: 'all 0.2s ease',
  padding: 'var(--spacing-card-padding)',

  ':hover': {
    boxShadow: 'var(--shadow-md)',
    transform: 'translateY(-2px)',
  },
});

export const cardTitle = style({
  fontSize: 'var(--font-size-base)',
  fontWeight: '600',
  color: 'var(--color-demo-title)',
  margin: '0',
});

export const cardText = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
  lineHeight: '1.5',
  margin: 0,
});

export const cardContentFlex = style({
  flex: 1,
});

export const cardActions = style({
  display: 'flex',
  gap: 'var(--spacing-md)',
  justifyContent: 'flex-end',
  //marginTop: 'var(--spacing-base)',
});

export const actionButton = style({
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

export const primaryButton = style({
  padding: 'var(--spacing-button-paddingY) var(--spacing-button-padding-x)',
  border: '1px solid var(--color-brand-primary)',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--color-brand-primary)',
  color: 'var(--color-text-on-primary)',
  fontSize: 'var(--font-size-sm)',
  cursor: 'pointer',
  transition: 'var(--transition-button)',

  ':hover': {
    backgroundColor: 'var(--color-brand-primary-hover)',
    borderColor: 'var(--color-brand-primary-hover)',
  },
});

export const clickHint = style({
  fontSize: 'var(--font-size-xs)',
  color: 'var(--color-text-secondary)',
  fontStyle: 'italic',
});

export const controls = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-md)',
  padding: 'var(--spacing-card-padding)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  backgroundColor: 'var(--color-background)',
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-md)',
});

export const controlDescription = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--foreground)',
  lineHeight: '1.5',
  margin: 0,
});

// Card 커스텀 스타일 (injectStyles=false일 때 사용)
const cardCustomWrapper = style({});

globalStyle(`${cardCustomWrapper} .hcCard`, {
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-xl)',
  background: 'var(--color-surface)',
  color: 'var(--color-text)',
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${cardCustomWrapper} .hcCard[data-clickable="true"]`, {
  cursor: 'pointer',
});

globalStyle(`${cardCustomWrapper} .hcCard[data-disabled="true"]`, {
  cursor: 'not-allowed',
  opacity: 0.7,
});

globalStyle(`${cardCustomWrapper} .hcCardHeader`, {
  padding: 'var(--spacing-lg)',
  borderBottom: '2px dashed var(--color-divider)',
  background: 'var(--color-surface-hover)',
});

globalStyle(`${cardCustomWrapper} .hcCardContent`, {
  padding: 'var(--spacing-lg)',
});

globalStyle(`${cardCustomWrapper} .hcCardFooter`, {
  padding: 'var(--spacing-lg)',
  borderTop: '2px dashed var(--color-divider)',
  background: 'var(--color-surface-hover)',
});

export const cardWrapperClass = cardCustomWrapper;
