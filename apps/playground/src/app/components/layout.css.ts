import { style } from '@vanilla-extract/css';

export const mainContent = style({
  width: '100%',
  height: 'calc(100dvh - 80px)', // 헤더 높이만큼 빼기
  display: 'flex',
  position: 'fixed',
  top: '80px',
  left: 0,
  right: 0,
  bottom: 0,
});

export const mainContentInner = style({
  flex: 1,
  overflowY: 'auto',
});
