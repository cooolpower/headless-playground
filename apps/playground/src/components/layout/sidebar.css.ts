import { style } from '@vanilla-extract/css';

export const sidebar = style({
  width: '200px',
  height: '100%',
  overflowY: 'auto',
  borderRight: '1px solid var(--border-color)',
  backgroundColor: 'var(--background)',

  // Firefox용 스크롤바 스타일링
  scrollbarWidth: 'thin',
  scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent',
});

export const sidebarNav = style({
  //padding: '1rem'
  paddingBottom: '1rem',
});

export const sidebarNavContent = style({});

export const sidebarNavList = style({
  textIndent: '20px',
  listStyleType: 'none',
});

export const sidebarNavListTitle = style({
  fontSize: 'var(--fontSizeSideBarTitle)',
  color: 'var(--fontSizeSideBarTitleColor)',
  fontWeight: 400,
  padding: '16px 0 10px',
  textIndent: '20px',
  position: 'sticky',
  top: '0px',
  backgroundColor: 'var(--background)',
});

export const sidebarNavListItem = style({
  fontSize: 'var(--fontSizeSideBarItem)',
  color: 'var(--fontSizeSideBarItemColor)',
  fontWeight: 600,
  padding: '10px 0',
  textIndent: '20px',
  textTransform: 'capitalize',
});
