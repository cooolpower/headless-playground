import { style } from '@vanilla-extract/css';

export const demoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-2xl)',
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
  gap: 'var(--spacing-base)',
});

export const sectionTitle = style({
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  color: 'var(--foreground)',
  margin: 0,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-md)',
});

export const titleWrapper = style({
  border: '1px solid var(--border-color)',
  borderRadius: '6px',
  padding: 'var(--spacing-md)',
  backgroundColor: 'var(--background-body)',
});

export const textWrapper = style({
  border: '1px solid var(--border-color)',
  borderRadius: '6px',
  padding: 'var(--spacing-md)',
  backgroundColor: 'var(--background-body)',
});

export const article = style({
  border: '1px solid var(--background-body)',
  borderRadius: '8px',
  padding: '24px',
  backgroundColor: 'var(--background-body)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
});

export const controls = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-md)',
  padding: 'var(--spacing-base)',
  border: '1px solid var(--background-body)',
  borderRadius: '8px',
  backgroundColor: 'var(--background-body)',
});

export const controlDescription = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
  lineHeight: '1.5',
  margin: 0,
});
