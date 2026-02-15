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

// Tree component styles (moved from headless component)
export const tree = style({
  margin: 0,
  padding: 0,
  listStyle: 'none', // 리스트 스타일 블릿 제거
  fontSize: 'var(--font-size-sm)',
  lineHeight: '1.5',
});

export const treeNode = style({
  margin: 0,
  padding: 0,
  listStyle: 'none',
  position: 'relative',
});

export const treeNodeContent = style({
  display: 'flex',
  alignItems: 'center',
  padding: '4px 8px',
  cursor: 'pointer',
  borderRadius: '4px',
  transition: 'background-color 0.2s ease-in-out',
  position: 'relative',

  ':hover': {
    backgroundColor: 'var(--color-surface-hover)',
  },

  ':focus': {
    outline: '2px solid var(--color-brand-primary)',
    outlineOffset: '2px',
  },
});

export const treeNodeSelected = style({
  backgroundColor: 'var(--color-brand-primary-light)',
  color: 'var(--color-brand-primary)',

  ':hover': {
    backgroundColor: 'var(--color-brand-primary-light)',
  },
});

export const treeNodeDisabled = style({
  cursor: 'not-allowed',
  opacity: 0.5,
  color: 'var(--color-text-disabled)',
});

export const treeNodeChildren = style({
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const treeIndent = style({
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
});

export const treeIndentLine = style({
  position: 'absolute',
  left: '12px',
  top: 0,
  bottom: 0,
  borderLeft: '1px solid var(--color-divider)',
});

export const treeSwitcher = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'var(--spacing-lg)',
  height: 'var(--spacing-lg)',
  marginRight: '4px',
  flexShrink: 0,
});

export const treeSwitcherButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'var(--spacing-base)',
  height: 'var(--spacing-base)',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  color: 'var(--color-text-secondary)',
  fontSize: 'var(--font-size-xs)',
  borderRadius: '2px',
  transition: 'transform 0.2s ease-in-out',
});

export const treeSwitcherExpanded = style({
  transform: 'rotate(90deg)',
});

export const treeSwitcherLeaf = style({
  width: 'var(--spacing-base)',
  height: 'var(--spacing-base)',
});

export const treeCheckbox = style({
  display: 'inline-flex',
  alignItems: 'center',
  marginRight: '8px',
  flexShrink: 0,
});

export const treeIcon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'var(--spacing-base)',
  height: 'var(--spacing-base)',
  marginRight: '8px',
  flexShrink: 0,
  fontSize: 'var(--font-size-sm)',
});

export const treeTitle = style({
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  color: 'inherit',
});

export const statusContainer = style({
  marginTop: 'var(--spacing-base)',
  padding: 'var(--spacing-sm)',
  background: 'var(--color-surface-hover)',
  borderRadius: '4px',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text)',
});

// Tree 커스텀 스타일 (injectStyles=false일 때 사용)
const treeCustomWrapper = style({});

globalStyle(`${treeCustomWrapper} .hcTree`, {
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

globalStyle(`${treeCustomWrapper} .hcTreeNode`, {
  listStyle: 'none',
});

globalStyle(`${treeCustomWrapper} .hcTreeNodeContent`, {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-tight)',
  padding: '0.25rem 0.375rem',
  borderRadius: 'var(--radius-sm)',
  cursor: 'pointer',
  userSelect: 'none',
  border: '1px dashed transparent',
  transition: 'all 0.2s',
});

globalStyle(`${treeCustomWrapper} .hcTreeNodeContent:hover`, {
  background: 'var(--color-surface-hover)',
  borderColor: 'var(--color-border)',
});

globalStyle(`${treeCustomWrapper} .hcTreeNodeSelected`, {
  background: 'var(--color-background-hover)',
  borderColor: 'var(--color-brand-primary)',
  borderStyle: 'dashed',
});

globalStyle(`${treeCustomWrapper} .hcTreeNodeDisabled`, {
  opacity: 0.5,
  cursor: 'not-allowed',
});

globalStyle(`${treeCustomWrapper} .hcTreeSwitcherButton`, {
  background: 'none',
  border: '1px dashed var(--color-border)',
  padding: '0.125rem',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: 'var(--radius-sm)',
});

export const treeWrapperClass = treeCustomWrapper;
