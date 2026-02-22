import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/vars.css';

export const preWrapper = style({
  position: 'relative',
  marginTop: vars.spacing.lg,
  marginBottom: vars.spacing.lg,

  // Hover 시에만 복사 버튼이 보이게 하려면 이 그룹을 활용할 수 있습니다.
  // 모바일 환경을 위해 기본적으로 표시하되 투명도를 조절하는 방식을 썼습니다.
});

export const pre = style({
  // 기존 prose.css.ts 의 스타일을 이어받습니다
  margin: '0 !important', // wrapper가 대신 마진을 가짐
});

export const copyButtonWrapper = style({
  position: 'absolute',
  top: vars.spacing.sm,
  right: vars.spacing.sm,
  opacity: 0.3,
  transition: 'opacity 0.2s ease',

  selectors: {
    [`${preWrapper}:hover &`]: {
      opacity: 1,
    },
    // Focus 시 접근성 보장
    [`&:focus-within`]: {
      opacity: 1,
    }
  },

  // 모바일에서는 항상 선명하게 표시
  '@media': {
    '(hover: none)': {
      opacity: 0.9,
    }
  }
});
