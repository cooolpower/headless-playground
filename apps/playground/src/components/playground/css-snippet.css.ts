import { style } from '@vanilla-extract/css';

export const root = style({
  border: 'var(--border-width-thin) solid var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  overflow: 'hidden',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 'var(--spacing-tight) var(--spacing-base)',
  borderBottom: 'var(--border-width-thin) solid var(--color-border)',
});

export const title = style({
  margin: 0,
  fontSize: 'var(--font-size-sm)',
  fontWeight: 600,
  color: 'var(--color-text-heading)',
});

export const pre = style({
  margin: 0,
  padding: 'var(--spacing-base)',
  //fontFamily: 'var(--font-family-nanumGothic)',
  fontSize: 'var(--font-size-xs)',
  lineHeight: 'var(--line-height-relaxed)',
  color: 'var(--color-text)',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  background: 'var(--color-background)',
});

