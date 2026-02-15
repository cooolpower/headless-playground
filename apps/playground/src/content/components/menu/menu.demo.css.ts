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

// Menu component styles (moved from headless component)
export const menu = style({
  margin: 0,
  padding: 0,
  listStyle: 'none', // 리스트 스타일 블릿 제거
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-divider)',
  borderRadius: '6px',
  width: '100%',
  maxWidth: '300px',
});

// 모드 variants
export const mode = styleVariants({
  vertical: {
    width: '200px',
  },

  horizontal: {
    display: 'flex',
    flexDirection: 'row',
    width: 'auto',
    border: 'none',
    borderRadius: 0,
  },

  inline: {
    width: '200px',
  },
});

// 테마 variants
export const theme = styleVariants({
  light: {
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-text)',
  },

  dark: {
    backgroundColor: 'var(--color-neutral-200)',
    color: 'var(--color-text)',
  },
});

// 축소 상태
export const collapsed = style({
  width: '80px',
});

// 메뉴 아이템 그룹
export const menuItemGroup = style({
  listStyle: 'none',
});

// 메뉴 아이템 래퍼
export const menuItemWrapper = style({
  listStyle: 'none',
});

// 메뉴 아이템
export const menuItem = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  padding: 'var(--spacing-sm) var(--spacing-base)',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  userSelect: 'none',

  ':hover': {
    backgroundColor: 'var(--color-surface-hover)',
  },

  ':focus': {
    outline: '2px solid var(--color-brand-primary)',
    outlineOffset: '-2px',
  },
});

// 선택된 아이템
export const selected = style({
  backgroundColor: 'var(--color-brand-primary)',
  color: 'var(--color-text-on-primary)',

  ':hover': {
    backgroundColor: 'var(--color-brand-primary-hover)',
  },
});

// 비활성화된 아이템
export const disabled = style({
  cursor: 'not-allowed',
  opacity: 0.5,

  ':hover': {
    backgroundColor: 'transparent',
  },
});

// 위험 아이템
export const danger = style({
  color: 'var(--color-semantic-error)',
});

// 메뉴 아이콘
export const menuIcon = style({
  marginRight: '8px',
  fontSize: 'var(--font-size-base)',
  display: 'flex',
  alignItems: 'center',
});

// 메뉴 타이틀
export const menuTitle = style({
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

// 서브메뉴 타이틀
export const subMenuTitle = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  padding: 'var(--spacing-sm) var(--spacing-base)',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',

  ':hover': {
    backgroundColor: 'var(--color-surface-hover)',
  },
});

export const subMenuTitleOpen = style({
  backgroundColor: 'var(--color-surface-hover)',
});

// 서브메뉴 화살표
export const subMenuArrow = style({
  marginLeft: 'auto',
  fontSize: 'var(--font-size-xs)',
  transition: 'transform 0.2s ease-in-out',
});

export const subMenuArrowOpen = style({
  transform: 'rotate(90deg)',
});

// 서브메뉴
export const subMenu = style({
  margin: 0,
  padding: 0,
  listStyle: 'none',
  backgroundColor: 'var(--color-surface)',
});

// 크기 variants
export const sizeVariants = {
  small: {
    menuItem: {
      padding: '4px 12px',
      fontSize: 'var(--font-size-xs)',
    },
    subMenuTitle: {
      padding: '4px 12px',
      fontSize: 'var(--font-size-xs)',
    },
  },

  medium: {
    menuItem: {
      padding: 'var(--spacing-sm) var(--spacing-base)',
      fontSize: 'var(--font-size-sm)',
    },
    subMenuTitle: {
      padding: 'var(--spacing-sm) var(--spacing-base)',
      fontSize: 'var(--font-size-sm)',
    },
  },

  large: {
    menuItem: {
      padding: '12px 20px',
      fontSize: 'var(--font-size-base)',
    },
    subMenuTitle: {
      padding: '12px 20px',
      fontSize: 'var(--font-size-base)',
    },
  },
};

// 테마별 색상 - CSS 변수 사용
export const lightTheme = {
  background: 'var(--color-surface)',
  border: 'var(--color-divider)',
  itemHover: 'var(--color-surface-hover)',
  itemSelected: 'var(--color-brand-primary)',
  itemSelectedHover: 'var(--color-brand-primary-hover)',
  itemSelectedColor: 'var(--color-text-on-primary)',
  subMenuBackground: 'var(--color-surface)',
  subMenuOpenBackground: 'var(--color-surface-hover)',
};

export const darkTheme = {
  background: 'var(--color-neutral-200)',
  border: 'var(--color-divider)',
  itemHover: 'var(--color-surface-hover)',
  itemSelected: 'var(--color-brand-primary)',
  itemSelectedHover: 'var(--color-brand-primary-hover)',
  itemSelectedColor: 'var(--color-text-on-primary)',
  subMenuBackground: 'var(--color-surface)',
  subMenuOpenBackground: 'var(--color-surface-hover)',
};

// Menu 커스텀 스타일 (injectStyles=false일 때 사용)
const menuCustomWrapper = style({});

globalStyle(`${menuCustomWrapper} .hcMenuTitle`, {
  display: 'inline',
});

globalStyle(`${menuCustomWrapper} .hcMenuTitle[data-danger="true"]`, {
  color: 'var(--color-semantic-error)',
});

export const menuWrapperClass = menuCustomWrapper;
