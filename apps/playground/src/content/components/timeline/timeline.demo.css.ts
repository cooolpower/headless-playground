import { style, styleVariants, globalStyle } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
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
  color: 'var(--color-section-title)',
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

// Timeline component styles (moved from headless component)
export const timeline = style({
  position: 'relative',
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

// 모드 variants
export const mode = styleVariants({
  left: {
    // 기본 왼쪽 정렬
  },

  alternate: {
    // 번갈아 정렬 (필요시 구현)
  },

  right: {
    // 오른쪽 정렬 (필요시 구현)
  },
});

// 아이템
export const item = style({
  position: 'relative',
  margin: 0,
  paddingBottom: '20px',
  fontSize: 'var(--font-size-sm)',
  listStyle: 'none',
});

// 아이템 꼬리 (선)
export const itemTail = style({
  position: 'absolute',
  left: '4px',
  top: '10px',
  height: '100%',
  borderLeft: '2px solid var(--color-divider)',
});

// 꼬리 선
export const tailLine = style({
  position: 'absolute',
  left: 0,
  top: 0,
  height: '100%',
  borderLeft: '2px solid var(--color-divider)',
});

// 아이템 헤드 (점)
export const itemHead = style({
  position: 'absolute',
  width: '10px',
  height: '10px',
  backgroundColor: 'var(--color-surface)',
  border: '2px solid transparent',
  borderRadius: '100px',
});

// 점
export const dot = style({
  width: 'var(--spacing-sm)',
  height: 'var(--spacing-sm)',
  borderRadius: '50%',
  display: 'block',
  position: 'absolute',
  top: '2px',
  left: '2px',
});

// 점 색상 variants
export const dotColor = styleVariants({
  blue: {
    backgroundColor: 'var(--color-semantic-info)',
  },

  red: {
    backgroundColor: 'var(--color-semantic-error)',
  },

  green: {
    backgroundColor: 'var(--color-semantic-success)',
  },

  gray: {
    backgroundColor: 'var(--color-text-secondary)',
  },
});

// pending 점
export const dotPending = style({
  backgroundColor: 'var(--color-divider)',
  animation: 'timeline-pending 1.2s ease-in-out infinite',
});

// 아이템 콘텐츠
export const itemContent = style({
  position: 'relative',
  top: '-6px',
  margin: '0 0 0 26px',
  wordBreak: 'break-word',
});

// 아이템 라벨
export const itemLabel = style({
  color: 'var(--color-text-secondary)',
  fontSize: 'var(--font-size-xs)',
  lineHeight: '1.5',
  marginBottom: '4px',
});

// 아이템 설명
export const itemDescription = style({
  color: 'var(--color-text-heading)',
  fontSize: 'var(--font-size-sm)',
  lineHeight: '1.6',
});

// 애니메이션
export const timelineAnimation = `
  @keyframes timeline-pending {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.5;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

// 크기 variants
export const sizeVariants = {
  small: {
    item: {
      fontSize: 'var(--font-size-xs)',
      paddingBottom: '16px',
    },
    itemContent: {
      marginLeft: '22px',
    },
    itemHead: {
      width: 'var(--spacing-sm)',
      height: 'var(--spacing-sm)',
    },
    dot: {
      width: '6px',
      height: '6px',
      top: '1px',
      left: '1px',
    },
  },

  medium: {
    item: {
      fontSize: 'var(--font-size-sm)',
      paddingBottom: '20px',
    },
    itemContent: {
      marginLeft: '26px',
    },
    itemHead: {
      width: '10px',
      height: '10px',
    },
    dot: {
      width: 'var(--spacing-sm)',
      height: 'var(--spacing-sm)',
      top: '1px',
      left: '1px',
    },
  },

  large: {
    item: {
      fontSize: 'var(--font-size-base)',
      paddingBottom: '24px',
    },
    itemContent: {
      marginLeft: '30px',
    },
    itemHead: {
      width: '12px',
      height: '12px',
    },
    dot: {
      width: '10px',
      height: '10px',
      top: '1px',
      left: '1px',
    },
  },
};

// Timeline 커스텀 스타일 (injectStyles=false일 때 사용)
const timelineCustomWrapper = style({});

globalStyle(`${timelineCustomWrapper} .hcTimeline`, {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: 'var(--spacing-base)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${timelineCustomWrapper} .hcTimelineDot`, {
  width: '0.625rem',
  height: '0.625rem',
  borderRadius: '9999px',
  background: 'var(--color-brand-primary)',
  border: '2px dashed var(--color-border)',
});

export const timelineWrapperClass = timelineCustomWrapper;
