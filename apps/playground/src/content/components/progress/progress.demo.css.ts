import { style, globalStyle } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
});

export const progressItem = style({
  display: 'flex',
  flexDirection: 'column',
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 'var(--spacing-sm)',
});

export const label = style({
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  color: 'var(--color-text-muted)',
});

export const percentage = style({
  fontSize: 'var(--font-size-sm)',
});

export const percentageDefault = style([
  percentage,
  {
    color: 'var(--color-text-secondary)',
  },
]);

export const percentageSuccess = style([
  percentage,
  {
    color: 'var(--color-semantic-success)',
  },
]);

export const percentageWarning = style([
  percentage,
  {
    color: 'var(--color-semantic-warning)',
  },
]);

export const percentageError = style([
  percentage,
  {
    color: 'var(--color-semantic-error)',
  },
]);

// Circle progress styles
export const circleContainer = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
  gap: 'var(--spacing-2xl)',
  marginTop: 'var(--spacing-2xl)',
});

export const circleItem = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 'var(--spacing-base)',
});

export const circleLabel = style({
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  color: 'var(--color-text-muted)',
  textAlign: 'center',
});

export const circleValue = style({
  fontSize: '1.5rem',
  fontWeight: '600',
  color: 'var(--color-text-muted)',
});

// Size variants
export const sizeContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
  marginTop: 'var(--spacing-2xl)',
});

export const sizeItem = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-sm)',
});

// Custom stroke width
export const customContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
  marginTop: 'var(--spacing-2xl)',
});

export const customItem = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-sm)',
});

// Interactive demo
export const interactiveContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  marginTop: 'var(--spacing-2xl)',
});

export const controls = style({
  display: 'flex',
  gap: 'var(--spacing-base)',
  alignItems: 'center',
  flexWrap: 'wrap',
});

export const controlGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-sm)',
});

export const controlLabel = style({
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  color: 'var(--color-text-muted)',
});

export const slider = style({
  width: '200px',
  accentColor: 'var(--color-brand-primary)',
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
  ':hover': {
    backgroundColor: 'var(--color-brand-primary-hover)',
  },
  ':disabled': {
    backgroundColor: 'var(--color-text-secondary)',
    cursor: 'not-allowed',
  },
});

export const circleRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--spacing-2xl)',
});

export const circleCenter = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 'var(--spacing-base)',
});

export const circleText = style({
  fontSize: '0.75rem',
  marginTop: '0.5rem',
  color: 'var(--color-text-secondary)',
  textAlign: 'center',
});

export const spaceY = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-2xl)',
});

export const flexBetween = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '1rem',
});

export const controlRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-sm)',
});

export const controlButton = style({
  padding: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-sm)',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease, border-color 0.2s ease',
  color: 'var(--color-text)',
  ':hover': {
    backgroundColor: 'var(--color-surface-hover)',
    borderColor: 'var(--color-brand-primary)',
  },
  ':active': {
    backgroundColor: 'var(--color-surface-active)',
  },
});

export const progressText = style({
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  width: '3rem',
  textAlign: 'center',
  color: 'var(--color-text-muted)',
});

export const circleRowSmall = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.5rem',
});

export const circleItemSmall = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-sm)',
  marginBottom: 'var(--spacing-sm)',
});

export const circleItemText = style({
  fontSize: '0.75rem',
  color: 'var(--color-text-secondary)',
});

export const circleRowMedium = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.5rem',
});

export const circleProgressText = style({
  fontSize: '0.75rem',
  fontWeight: '500',
});

// Progress 커스텀 스타일 (injectStyles=false일 때 사용)
const progressCustomWrapper = style({});

globalStyle(`${progressCustomWrapper} .hcProgress`, {
  vars: {
    '--hc-progress-stroke': 'var(--color-semantic-info)',
    '--hc-progress-trail': 'var(--color-surface)',
  },
  color: 'var(--hc-progress-stroke)',
  padding: 'var(--spacing-sm)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${progressCustomWrapper} .hcProgressLineOuter`, {
  width: '100%',
  borderRadius: '9999px',
  overflow: 'hidden',
  background: 'var(--hc-progress-trail)',
  position: 'relative',
  border: '1px dashed var(--color-border)',
});

globalStyle(`${progressCustomWrapper} .hcProgressLineInner`, {
  //height: '100%',
  height: '10px',
  background: 'var(--hc-progress-stroke)',
  borderRadius: '9999px',
  transition: 'width 0.3s ease',
  border: '1px solid var(--color-brand-primary)',
});

export const progressWrapperClass = progressCustomWrapper;
