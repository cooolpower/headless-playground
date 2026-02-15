import { style, globalStyle } from '@vanilla-extract/css';

export const demoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-xl)',
  padding: 'var(--spacing-lg)',
});

export const demoTitle = style({
  fontSize: 'var(--font-size-lg)',
  fontWeight: '600',
  color: 'var(--color-demo-title)',
  margin: 0,
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-md)',
});

export const sectionTitle = style({
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  color: 'var(--color-text-secondary)',
  margin: 0,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const avatarGroup = style({
  display: 'flex',
  gap: 'var(--spacing-md)',
  alignItems: 'center',
  flexWrap: 'wrap',
});

export const avatarWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  backgroundColor: 'var(--color-surface-hover)',
  color: 'var(--color-text-secondary)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  border: '2px solid var(--color-surface)',
  boxShadow: 'var(--shadow-sm)',
  overflow: 'hidden',
});

// Size variants
export const small = style({
  width: '32px',
  height: 'var(--spacing-2xl)',
  fontSize: 'var(--font-size-xs)',
});

export const medium = style({
  width: '40px',
  height: '40px',
  fontSize: 'var(--font-size-sm)',
});

export const large = style({
  width: '56px',
  height: '56px',
  fontSize: 'var(--font-size-lg)',
});

// Special variants
export const overlapping = style({
  marginLeft: '-8px',
  border: '2px solid var(--color-surface)',
});

export const controls = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-md)',
  padding: 'var(--spacing-card-padding)',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-lg)',
  backgroundColor: 'var(--color-surface)',
});

export const controlDescription = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
  lineHeight: '1.5',
  margin: 0,
});

// Avatar 커스텀 스타일 (injectStyles=false일 때 사용)
const avatarCustomWrapper = style({});

globalStyle(`${avatarCustomWrapper} .hcAvatar`, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '9999px',
  overflow: 'hidden',
  background: 'var(--color-surface)',
  border: '2px dashed var(--color-border)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${avatarCustomWrapper} .hcAvatarFallback`, {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'var(--color-surface-hover)',
  color: 'var(--color-text-secondary)',
  fontWeight: 'var(--font-weight-medium)',
});

export const avatarWrapperClass = avatarCustomWrapper;
