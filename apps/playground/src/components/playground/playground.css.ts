import { style, globalStyle, createVar } from '@vanilla-extract/css';

export const sectionBg = createVar();
export const sectionBorder = createVar();

export const grid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 300px',
  gap: '24px',
  marginTop: '24px',
});

export const interactionSection = style({
  backgroundColor: sectionBg,
  border: `1px solid ${sectionBorder}`,
  borderRadius: '8px',
  padding: '16px',
});

globalStyle('[data-theme="dark"]', {
  vars: {
    [sectionBg]: 'oklch(0.2 0.0 0)',
    [sectionBorder]: 'oklch(1 0 0 / 0.2)',
  },
});

globalStyle('[data-theme="light"]', {
  vars: {
    [sectionBg]: 'oklch(0.98 0 0)',
    [sectionBorder]: 'oklch(0.2 0.0 0 / 0.15)',
  },
});