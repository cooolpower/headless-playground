import { globalStyle, style } from '@vanilla-extract/css';

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

// Upload component styles
export const upload = style({
  display: 'inline-block',
});

export const uploadTrigger = style({
  display: 'inline-block',
  cursor: 'pointer',
});

export const uploadArea = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 'var(--spacing-2xl)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--color-surface)',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  minHeight: '200px',

  ':hover': {
    borderColor: 'var(--color-brand-primary)',
    backgroundColor: 'var(--color-surface-hover)',
  },
});

export const uploadAreaDragging = style({
  borderColor: 'var(--color-brand-primary)',
  backgroundColor: 'var(--color-surface-hover)',
});

export const uploadIcon = style({
  color: 'var(--color-text-secondary)',
  marginBottom: 'var(--spacing-sm)',
});

export const uploadText = style({
  color: 'var(--color-text)',
  fontSize: 'var(--font-size-base)',
  fontWeight: '500',
  marginBottom: 'var(--spacing-xs)',
});

export const uploadHint = style({
  color: 'var(--color-text-muted)',
  fontSize: 'var(--font-size-sm)',
  marginTop: 'var(--spacing-xs)',
});

export const fileList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-sm)',
  marginTop: 'var(--spacing-base)',
});

export const fileItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-sm)',
  padding: 'var(--spacing-sm) var(--spacing-md)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-sm)',
  backgroundColor: 'var(--color-surface)',
  transition: 'all 0.2s ease',

  ':hover': {
    backgroundColor: 'var(--color-surface-hover)',
    borderColor: 'var(--color-border-hover)',
  },
});

export const fileIcon = style({
  color: 'var(--color-text-secondary)',
  flexShrink: 0,
});

export const fileName = style({
  flex: 1,
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const fileSize = style({
  fontSize: 'var(--font-size-xs)',
  color: 'var(--color-text-muted)',
  flexShrink: 0,
});

export const removeButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  border: 'none',
  color: 'var(--color-text-secondary)',
  cursor: 'pointer',
  padding: 'var(--spacing-xs)',
  borderRadius: 'var(--radius-sm)',
  transition: 'all 0.2s ease',
  flexShrink: 0,

  ':hover': {
    color: 'var(--color-semantic-error)',
    backgroundColor: 'var(--color-surface-hover)',
  },
});

export const imageList = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
  gap: 'var(--spacing-md)',
  marginTop: 'var(--spacing-base)',
});

export const imageItem = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-sm)',
  overflow: 'hidden',
  backgroundColor: 'var(--color-surface)',
  transition: 'all 0.2s ease',

  ':hover': {
    borderColor: 'var(--color-border-hover)',
  },
});

export const imagePreview = style({
  width: '100%',
  height: '120px',
  objectFit: 'cover',
  display: 'block',
});

export const imageInfo = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 'var(--spacing-xs) var(--spacing-sm)',
  gap: 'var(--spacing-xs)',
});

export const fileLimit = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-semantic-warning)',
  marginTop: 'var(--spacing-xs)',
});

export const errorMessage = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-semantic-error)',
  marginTop: 'var(--spacing-xs)',
});

export const customTrigger = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--spacing-sm)',
  padding: 'var(--spacing-sm) var(--spacing-md)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-sm)',
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',

  ':hover': {
    borderColor: 'var(--color-brand-primary)',
    backgroundColor: 'var(--color-surface-hover)',
  },
});

export const thumbnail = style({
  width: '48px',
  height: '48px',
  objectFit: 'cover',
  borderRadius: 'var(--radius-sm)',
  flexShrink: 0,
});

export const pictureCard = style({
  position: 'relative',
  width: '104px',
  height: '104px',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-sm)',
  overflow: 'hidden',
  backgroundColor: 'var(--color-surface)',
  transition: 'all 0.2s ease',

  ':hover': {
    borderColor: 'var(--color-border-hover)',
  },
});

// Upload 커스텀 스타일 (injectStyles=false일 때 사용)
const uploadCustomWrapper = style({});

globalStyle(`${uploadCustomWrapper} .hcUpload`, {
  width: '100%',
});

globalStyle(`${uploadCustomWrapper} .hcUploadTrigger`, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--spacing-sm)',
  minHeight: 'unset',
  padding: '0',
  border: 'none',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  cursor: 'pointer',
  userSelect: 'none',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${uploadCustomWrapper} .hcUpload[data-disabled="true"] .hcUploadTrigger`, {
  opacity: 0.6,
  cursor: 'not-allowed',
});

export const uploadWrapperClass = uploadCustomWrapper;
