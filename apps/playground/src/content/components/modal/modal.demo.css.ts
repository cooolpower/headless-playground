import { style, globalStyle } from '@vanilla-extract/css';

// UI Color Design System - Following Cursor Rules
// 모든 색상은 globals.css의 CSS 변수를 사용합니다

export const container = style({
  margin: '1rem 0',
});

export const button = style({
  padding: 'var(--spacing-button-paddingY) var(--spacing-button-padding-x)',
  backgroundColor: 'var(--color-brand-primary)',
  color: 'var(--color-text-on-primary)',
  borderRadius: 'var(--radius-md)',
  border: 'none',
  cursor: 'pointer',
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  transition: 'var(--transition-button)',
  ':hover': {
    backgroundColor: 'var(--color-brand-primary-hover)',
  },
  ':focus': {
    outline: '2px solid var(--color-brand-primary)',
    outlineOffset: '2px',
  },
});

export const buttonDanger = style({
  padding: 'var(--spacing-button-paddingY) var(--spacing-button-padding-x)',
  backgroundColor: 'var(--color-semantic-error)',
  color: 'var(--color-text-on-error)',
  borderRadius: 'var(--radius-md)',
  border: 'none',
  cursor: 'pointer',
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  transition: 'var(--transition-button)',
  ':hover': {
    backgroundColor: 'var(--color-semantic-error-hover)',
  },
  ':focus': {
    outline: '2px solid var(--color-semantic-error)',
    outlineOffset: '2px',
  },
});

export const buttonSecondary = style({
  padding: 'var(--spacing-button-paddingY) var(--spacing-button-padding-x)',
  backgroundColor: 'transparent',
  color: 'var(--color-text)',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-md)',
  cursor: 'pointer',
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  transition: 'var(--transition-button)',
  ':hover': {
    backgroundColor: 'var(--color-surface-hover)',
  },
  ':focus': {
    outline: '2px solid var(--color-border)',
    outlineOffset: '2px',
  },
});

export const content = style({
  marginBottom: '1rem',
});

export const actions = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 'var(--spacing-sm)',
});

export const formGroup = style({
  marginBottom: '1rem',
});

export const label = style({
  display: 'block',
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  color: 'var(--color-text)',
  marginBottom: 'var(--spacing-sm)',
});

export const input = style({
  width: '100%',
  padding: '0.5rem 0.75rem',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-md)',
  fontSize: 'var(--font-size-sm)',
  ':focus': {
    outline: 'none',
    borderColor: 'var(--color-brand-primary)',
    boxShadow: '0 0 0 3px var(--color-focus-ring)',
  },
});

export const textarea = style({
  width: '100%',
  padding: 'var(--spacing-sm) var(--spacing-md)',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-md)',
  fontSize: 'var(--font-size-sm)',
  minHeight: '80px',
  resize: 'vertical',
  ':focus': {
    outline: 'none',
    borderColor: 'var(--color-brand-primary)',
    boxShadow: '0 0 0 3px var(--color-focus-ring)',
  },
});

export const checkboxGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-sm)',
  marginBottom: 'var(--spacing-sm)',
});

export const checkbox = style({
  width: '1rem',
  height: '1rem',
  accentColor: 'var(--color-brand-primary)',
});

export const radioGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-sm)',
  marginBottom: 'var(--spacing-sm)',
});

export const radio = style({
  width: '1rem',
  height: '1rem',
  accentColor: 'var(--color-brand-primary)',
});

export const select = style({
  width: '100%',
  padding: 'var(--spacing-sm) var(--spacing-md)',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-md)',
  fontSize: 'var(--font-size-sm)',
  backgroundColor: 'var(--color-surface)',
  ':focus': {
    outline: 'none',
    borderColor: 'var(--color-brand-primary)',
    boxShadow: '0 0 0 3px var(--color-focus-ring)',
  },
});

export const alert = style({
  padding: '0.75rem 1rem',
  borderRadius: '0.375rem',
  fontSize: 'var(--font-size-sm)',
  marginBottom: '1rem',
});

export const alertInfo = style([
  alert,
  {
    backgroundColor: 'var(--color-semantic-info)',
    border: '1px solid var(--color-semantic-info)',
    color: 'var(--color-text-on-info)',
  },
]);

export const alertWarning = style([
  alert,
  {
    backgroundColor: 'var(--color-semantic-warning)',
    border: '1px solid var(--color-semantic-warning)',
    color: 'var(--color-text-on-warning)',
  },
]);

export const alertSuccess = style([
  alert,
  {
    backgroundColor: 'var(--color-semantic-success)',
    border: '1px solid var(--color-semantic-success)',
    color: 'var(--color-text-on-success)',
  },
]);

export const card = style({
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-xl)',
  padding: 'var(--spacing-card-padding)',
  boxShadow: 'var(--shadow-sm)',
});

export const cardTitle = style({
  fontSize: 'var(--font-size-lg)',
  fontWeight: '600',
  color: 'var(--color-section-title)',
  marginBottom: '1rem',
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: 'var(--spacing-base)',
  marginTop: '1rem',
});

export const statusIndicator = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.25rem',
  padding: 'var(--spacing-xs) var(--spacing-sm)',
  borderRadius: '0.25rem',
  fontSize: '0.75rem',
  fontWeight: '500',
});

export const statusActive = style([
  statusIndicator,
  {
    backgroundColor: 'var(--color-semantic-success)',
    color: 'var(--color-text-on-success)',
  },
]);

export const statusInactive = style([
  statusIndicator,
  {
    backgroundColor: 'var(--color-semantic-warning)',
    color: 'var(--color-text-on-warning)',
  },
]);

export const buttonSuccess = style({
  padding: 'var(--spacing-button-paddingY) var(--spacing-button-padding-x)',
  backgroundColor: 'var(--color-semantic-success)',
  color: 'var(--color-text-on-success)',
  borderRadius: 'var(--radius-md)',
  border: 'none',
  cursor: 'pointer',
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  transition: 'var(--transition-button)',
  ':hover': {
    backgroundColor: 'var(--color-semantic-success-hover)',
  },
  ':focus': {
    outline: '2px solid var(--color-semantic-success)',
    outlineOffset: '2px',
  },
});

export const buttonWarning = style({
  padding: 'var(--spacing-button-paddingY) var(--spacing-button-padding-x)',
  backgroundColor: 'var(--color-semantic-warning)',
  color: 'var(--color-text-on-warning)',
  borderRadius: 'var(--radius-md)',
  border: 'none',
  cursor: 'pointer',
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  transition: 'var(--transition-button)',
  ':hover': {
    backgroundColor: 'var(--color-semantic-warning-hover)',
  },
  ':focus': {
    outline: '2px solid var(--color-semantic-warning)',
    outlineOffset: '2px',
  },
});

export const buttonPrimary = style({
  padding: 'var(--spacing-button-paddingY) var(--spacing-button-padding-x)',
  backgroundColor: 'var(--color-brand-primary)',
  color: 'var(--color-text-on-primary)',
  borderRadius: 'var(--radius-md)',
  border: 'none',
  cursor: 'pointer',
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  transition: 'var(--transition-button)',
  ':hover': {
    backgroundColor: 'var(--color-brand-primary-hover)',
  },
  ':focus': {
    outline: '2px solid var(--color-brand-primary)',
    outlineOffset: '2px',
  },
});

export const footerBetween = style({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

export const footerEnd = style({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
});

export const buttonIndigo = style({
  padding: 'var(--spacing-button-paddingY) var(--spacing-button-padding-x)',
  backgroundColor: 'var(--color-semantic-info)',
  color: 'var(--color-text-on-info)',
  borderRadius: 'var(--radius-md)',
  border: 'none',
  cursor: 'pointer',
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  transition: 'var(--transition-button)',
  ':hover': {
    backgroundColor: 'var(--color-semantic-info-hover)',
  },
  ':focus': {
    outline: '2px solid var(--color-semantic-info)',
    outlineOffset: '2px',
  },
});

export const buttonTeal = style({
  padding: 'var(--spacing-button-paddingY) var(--spacing-button-padding-x)',
  backgroundColor: 'var(--color-brand-primary)',
  color: 'var(--color-text-on-primary)',
  borderRadius: 'var(--radius-md)',
  border: 'none',
  cursor: 'pointer',
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  transition: 'var(--transition-button)',
  ':hover': {
    backgroundColor: 'var(--color-brand-primary-hover)',
  },
  ':focus': {
    outline: '2px solid var(--color-brand-primary)',
    outlineOffset: '2px',
  },
});

export const buttonOrange = style({
  padding: 'var(--spacing-button-paddingY) var(--spacing-button-padding-x)',
  backgroundColor: 'var(--color-semantic-warning)',
  color: 'var(--color-text-on-warning)',
  borderRadius: 'var(--radius-md)',
  border: 'none',
  cursor: 'pointer',
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  transition: 'var(--transition-button)',
  ':hover': {
    backgroundColor: 'var(--color-semantic-warning-hover)',
  },
  ':focus': {
    outline: '2px solid var(--color-semantic-warning)',
    outlineOffset: '2px',
  },
});

export const buttonPink = style({
  padding: 'var(--spacing-button-paddingY) var(--spacing-button-padding-x)',
  backgroundColor: 'var(--color-semantic-error)',
  color: 'var(--color-text-on-error)',
  borderRadius: 'var(--radius-md)',
  border: 'none',
  cursor: 'pointer',
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  transition: 'var(--transition-button)',
  ':hover': {
    backgroundColor: 'var(--color-semantic-error-hover)',
  },
  ':focus': {
    outline: '2px solid var(--color-semantic-error)',
    outlineOffset: '2px',
  },
});

export const flexEnd = style({
  display: 'flex',
  justifyContent: 'flex-end',
});

export const flexGap = style({
  display: 'flex',
  gap: 'var(--spacing-base)',
});

export const flexEndGap = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 'var(--spacing-sm)',
});

export const spaceY = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
});

export const spaceYLarge = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
});

export const buttonGroup = style({
  display: 'flex',
  gap: 'var(--spacing-sm)',
});

export const list = style({
  listStyleType: 'disc',
  listStylePosition: 'inside',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
});

export const code = style({
  backgroundColor: 'var(--color-surface-hover)',
  padding: 'var(--spacing-xs) var(--spacing-sm)',
  borderRadius: 'var(--radius-sm)',
});

export const textMuted = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
});

export const gridTwoColumns = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 'var(--spacing-base)',
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
});

export const formRow = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 'var(--spacing-base)',
});

export const formRowSingle = style({
  display: 'flex',
  flexDirection: 'column',
});

export const textArea = style({
  width: '100%',
  padding: 'var(--spacing-sm) var(--spacing-md)',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-md)',
  fontSize: 'var(--font-size-sm)',
  minHeight: '80px',
  resize: 'vertical',
  ':focus': {
    outline: 'none',
    borderColor: 'var(--color-brand-primary)',
    boxShadow: '0 0 0 3px var(--color-focus-ring)',
  },
});

export const submitButton = style({
  padding: 'var(--spacing-button-paddingY) var(--spacing-button-padding-x)',
  backgroundColor: 'var(--color-brand-primary)',
  color: 'var(--color-text-on-primary)',
  border: 'none',
  borderRadius: 'var(--radius-md)',
  cursor: 'pointer',
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  transition: 'var(--transition-button)',
  marginTop: 'var(--spacing-base)',
  ':hover': {
    backgroundColor: 'var(--color-brand-primary-hover)',
  },
  ':focus': {
    outline: '2px solid var(--color-brand-primary)',
    outlineOffset: '2px',
  },
});

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '1rem',
});

export const tableHeader = style({
  backgroundColor: 'var(--color-surface-hover)',
  padding: 'var(--spacing-md) var(--spacing-base)',
  textAlign: 'left',
  fontWeight: '600',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text)',
  borderBottom: '1px solid var(--color-divider)',
});

export const tableCell = style({
  padding: 'var(--spacing-md) var(--spacing-base)',
  borderBottom: '1px solid var(--color-divider)',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text)',
});

export const tableRowEven = style({
  backgroundColor: 'var(--color-surface-hover)',
});

export const badge = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: 'var(--spacing-xs) var(--spacing-sm)',
  borderRadius: '0.25rem',
  fontSize: '0.75rem',
  fontWeight: '500',
});

export const badgeActive = style([
  badge,
  {
    backgroundColor: 'var(--color-semantic-success)',
    color: 'var(--color-text-on-success)',
  },
]);

export const badgeInactive = style([
  badge,
  {
    backgroundColor: 'var(--color-semantic-warning)',
    color: 'var(--color-text-on-warning)',
  },
]);

// Modal 커스텀 스타일 (injectStyles=false일 때 사용)
const modalCustomWrapper = style({});

globalStyle(`${modalCustomWrapper} .hcModal`, {
  position: 'relative',
  width: 'var(--hc-modal-width)',
  maxWidth: '90vw',
  maxHeight: '90vh',
  background: 'var(--color-surface)',
  borderRadius: 'var(--radius-xl)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  outline: 'none',
  overflow: 'hidden',
  border: '2px dashed var(--color-border)',
});

globalStyle(`${modalCustomWrapper} .hcModalHeader`, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 'var(--spacing-loose)',
  borderBottom: '2px dashed var(--color-border)',
  background: 'var(--color-surface-hover)',
});

globalStyle(`${modalCustomWrapper} .hcModalTitle`, {
  margin: 0,
  fontSize: 'var(--font-size-lg)',
  fontWeight: 600,
  color: 'var(--color-text-heading)',
});

globalStyle(`${modalCustomWrapper} .hcModalBody`, {
  padding: 'var(--spacing-loose)',
  maxHeight: '60vh',
  overflow: 'auto',
  color: 'var(--color-text)',
});

globalStyle(`${modalCustomWrapper} .hcModalFooter`, {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 'var(--spacing-tight)',
  padding: 'var(--spacing-loose)',
  borderTop: '2px dashed var(--color-border)',
  background: 'var(--color-surface-hover)',
});

export const modalWrapperClass = modalCustomWrapper;
