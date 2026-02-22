import { style, globalStyle } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-xl)',
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
  color: 'var(--color-text-heading)',
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

export const timeline = style({
  position: 'relative',
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const mode = {};

export const item = style({
  position: 'relative',
  margin: 0,
  paddingBottom: '20px',
  fontSize: 'var(--font-size-sm)',
  listStyle: 'none',
});

export const itemTail = style({
  position: 'absolute',
  left: '4px',
  top: '10px',
  height: '100%',
  borderLeft: '2px solid var(--color-divider)',
});

export const tailLine = style({
  position: 'absolute',
  left: 0,
  top: 0,
  height: '100%',
  borderLeft: '2px solid var(--color-divider)',
});

export const itemHead = style({
  position: 'absolute',
  width: '10px',
  height: '10px',
  backgroundColor: 'var(--color-surface)',
  border: '2px solid transparent',
  borderRadius: '100px',
});

export const dot = style({
  width: 'var(--spacing-sm)',
  height: 'var(--spacing-sm)',
  borderRadius: '50%',
  display: 'block',
  position: 'absolute',
  top: '2px',
  left: '2px',
});

export const dotColor = {};
export const dotPending = style({
  backgroundColor: 'var(--color-divider)',
});

export const itemContent = style({
  position: 'relative',
  top: '-6px',
  margin: '0 0 0 26px',
  wordBreak: 'break-word',
});

export const itemLabel = style({
  color: 'var(--color-text-secondary)',
  fontSize: 'var(--font-size-xs)',
  lineHeight: '1.5',
  marginBottom: '4px',
});

export const itemDescription = style({
  color: 'var(--color-text-heading)',
  fontSize: 'var(--font-size-sm)',
  lineHeight: '1.6',
});

const timelineCustomWrapper = style({});

globalStyle(`${timelineCustomWrapper} .hcTimeline`, {
  display: 'flex',
  flexDirection: 'column',
  padding: 'var(--spacing-base)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
});

globalStyle(`${timelineCustomWrapper} .hcTimelineDot`, {
  width: '0.75rem',
  height: '0.75rem',
  borderRadius: '9999px',
  background: 'var(--color-brand-primary)',
  border: '2px dashed var(--color-border)',
});

export const timelineWrapperClass = timelineCustomWrapper;
