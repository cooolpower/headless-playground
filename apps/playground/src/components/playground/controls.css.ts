import { style, globalStyle, createVar } from '@vanilla-extract/css';

export const titleColor = createVar();
export const titleBorder = createVar();

export const title = style({
  fontSize: 'var(--font-size-md)',
  fontWeight: 600,
  color: `${titleColor}`,
  margin: 0,
  paddingBottom: '8px',
  borderBottom: `1px solid ${titleBorder}`,
});

globalStyle('[data-theme="dark"]', {
  vars: {
    [titleColor]: 'oklch(90.0% 0.003 264.5)',
    [titleBorder]: 'oklch(90.0% 0.003 264.5 / 0.17)'
  }
});
globalStyle('[data-theme="light"]', {
  vars: {
    [titleColor]: 'oklch(21.0% 0.032 264.7)',
    [titleBorder]: 'oklch(90.0% 0.003 264.5)'
  }
});