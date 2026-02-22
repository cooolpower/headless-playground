import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/vars.css.ts';

export const mainContent = style({
  width: '100%',
  minHeight: 'calc(100dvh - 80px)', // 헤더 높이만큼 빼기
  display: 'flex',
  marginTop: '0px',
  position: 'relative',
});

export const mainContentInner = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: `var(--spacing-xl) var(--spacing-4xl) var(--spacing-4xl) calc(var(--spacing-4xl))`,
  maxWidth: '1200px',
  margin: '0 auto',
  animation: 'fadeIn 0.5s ease-out',
});
