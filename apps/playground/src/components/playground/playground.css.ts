import { style, globalStyle, createVar } from '@vanilla-extract/css';

export const sectionBg = createVar();
export const sectionBorder = createVar();

export const grid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 300px',
  gap: '24px',
  marginTop: '24px',
  '@media': {
    'screen and (max-width: 1024px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const singleColGrid = style([
  grid,
  {
    gridTemplateColumns: '1fr',
  },
]);

export const interactionSection = style({
  position: 'sticky',
  top: '82px',
  height: 'fit-content',
  backgroundColor: sectionBg,
  border: `1px solid ${sectionBorder}`,
  borderRadius: '8px',
  padding: '16px',
  zIndex: 1,
  transition: 'z-index 0s',
  minWidth: 0,
  width: '100%',
  boxSizing: 'border-box',
  overflow: 'hidden', // 내부 컨텐츠가 섹션을 강제로 늘리지 못하도록 방지
  selectors: {
    '&:focus-within': {
      zIndex: 100,
    },
  },
  '@media': {
    'screen and (max-width: 1024px)': {
      position: 'relative',
      top: '0',
    },
  },
});

globalStyle('[data-theme="dark"]', {
  vars: {
    [sectionBg]: 'oklch(0.2 0.0 0)',
    [sectionBorder]: 'oklch(1 0 0 / 0.2)',
  },
});

globalStyle('[data-theme="light"]', {
  vars: {
    [sectionBg]: 'oklch(1 0 0)',
    [sectionBorder]: 'oklch(0.92 0 0)',
  },
});
