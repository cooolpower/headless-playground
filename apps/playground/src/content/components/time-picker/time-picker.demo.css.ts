import { style, styleVariants, globalStyle } from '@vanilla-extract/css';

// UI Color Design System - Following Cursor Rules
// 모든 색상은 globals.css의 CSS 변수를 사용합니다

// Container styles
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
  color: 'var(--color-text)',
  marginBottom: 'var(--spacing-sm)',
});

// TimePicker wrapper
export const timePicker = style({
  position: 'relative',
  display: 'inline-block',
  width: '100%',
  maxWidth: '200px',
});

// Input wrapper
export const inputWrapper = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
});

// Input field - Naive UI style
export const input = style({
  flex: 1,
  width: '100%',
  height: 'var(--spacing-2xl)', // Naive UI medium height
  padding: '0 12px',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-sm)',
  backgroundColor: 'var(--color-background)',
  color: 'var(--color-text)',
  fontSize: 'var(--font-size-sm)',
  fontFamily: 'inherit',
  lineHeight: '1',
  cursor: 'pointer',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', // Naive UI easing
  outline: 'none',

  '::placeholder': {
    color: 'var(--color-text-secondary)',
  },

  ':hover': {
    borderColor: 'var(--color-border-hover)',
  },

  ':focus': {
    borderColor: 'var(--color-brand-primary)',
    boxShadow: '0 0 0 2px var(--color-focus-ring)',
  },

  ':disabled': {
    backgroundColor: 'var(--color-background-disabled)',
    color: 'var(--color-text-disabled)',
    cursor: 'not-allowed',
    borderColor: 'var(--color-divider)',
  },
});

// Input actions (clear button, dropdown button)
export const inputActions = style({
  position: 'absolute',
  right: '8px',
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  zIndex: 1,
});

// Clear button
export const clearButton = style({
  background: 'none',
  border: 'none',
  width: 'var(--spacing-base)',
  height: 'var(--spacing-base)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--color-text-secondary)',
  cursor: 'pointer',
  fontSize: 'var(--font-size-xs)',
  padding: 0,
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

  ':hover': {
    backgroundColor: 'var(--color-surface-hover)',
    color: 'var(--color-text)',
  },
});

// Dropdown button
export const dropdownButton = style({
  background: 'none',
  border: 'none',
  width: 'var(--spacing-lg)',
  height: 'var(--spacing-lg)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--color-text-secondary)',
  cursor: 'pointer',
  padding: 0,
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

  ':hover': {
    color: 'var(--color-text)',
  },
});

export const dropdownButtonOpen = style({
  color: 'var(--color-brand-primary)',
});

// Backdrop
export const backdrop = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1000,
  backgroundColor: 'transparent',
});

// Panel wrapper
export const panelWrapper = style({
  position: 'absolute',
  top: 'calc(100% + 4px)',
  left: 0,
  zIndex: 1001,
  minWidth: '200px',
});

// Panel - Naive UI style
export const panel = style({
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-sm)',
  boxShadow: 'var(--shadow-md)',
  overflow: 'hidden',
  minWidth: '200px',
});

// Panel header
globalStyle(`${panel} > div:first-child`, {
  padding: '12px 16px',
  borderBottom: '1px solid var(--color-divider)',
  textAlign: 'center',
});

// Time display
globalStyle(`${panel} > div:first-child > div`, {
  fontSize: 'var(--font-size-lg)',
  fontWeight: '500',
  color: 'var(--color-text)',
  lineHeight: '1.5',
});

// Period (AM/PM)
globalStyle(`${panel} > div:first-child > div > span`, {
  marginLeft: '6px',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
  fontWeight: '400',
});

// Panel body
globalStyle(`${panel} > div:last-child`, {
  padding: 'var(--spacing-md)',
});

// Time selectors container
globalStyle(`${panel} > div:last-child > div:first-child`, {
  display: 'flex',
  gap: 'var(--spacing-sm)',
  justifyContent: 'center',
  alignItems: 'flex-start',
});

// Time selector (hour/minute/second)
globalStyle(`${panel} > div:last-child > div:first-child > div`, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '6px',
  flex: '1',
  minWidth: '0',
});

// Selector label
globalStyle(`${panel} > div:last-child > div:first-child > div > label`, {
  fontSize: 'var(--font-size-xs)',
  fontWeight: '400',
  color: 'var(--color-text-secondary)',
  textAlign: 'center',
  userSelect: 'none',
  width: '100%',
});

// Select element - Naive UI style
const selectSelector = `${panel} > div:last-child > div:first-child > div > select`;
globalStyle(selectSelector, {
  width: '100%',
  padding: '4px 8px',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-sm)',
  backgroundColor: 'var(--color-background)',
  color: 'var(--color-text)',
  fontSize: 'var(--font-size-sm)',
  fontFamily: 'inherit',
  cursor: 'pointer',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  outline: 'none',
  minHeight: '28px',
});

globalStyle(`${selectSelector}:hover`, {
  borderColor: 'var(--color-border-hover)',
});

globalStyle(`${selectSelector}:focus`, {
  borderColor: 'var(--color-brand-primary)',
  boxShadow: '0 0 0 2px var(--color-focus-ring)',
});

globalStyle(`${selectSelector}:disabled`, {
  backgroundColor: 'var(--color-background-disabled)',
  color: 'var(--color-text-disabled)',
  cursor: 'not-allowed',
  borderColor: 'var(--color-divider)',
});

// Panel footer
globalStyle(`${panel} > div:last-child > div:last-child`, {
  padding: '8px 12px',
  borderTop: '1px solid var(--color-divider)',
  display: 'flex',
  justifyContent: 'center',
  marginTop: '8px',
});

// Now button - Naive UI style
const buttonSelector = `${panel} > div:last-child > div:last-child > button`;
globalStyle(buttonSelector, {
  padding: '4px 12px',
  height: '1.75rem',
  backgroundColor: 'var(--color-brand-primary)',
  color: 'var(--color-text-on-primary)',
  border: 'none',
  borderRadius: 'var(--radius-sm)',
  cursor: 'pointer',
  fontSize: '0.8125rem',
  fontWeight: '400',
  fontFamily: 'inherit',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  outline: 'none',
});

globalStyle(`${buttonSelector}:hover`, {
  backgroundColor: 'var(--color-brand-primary-hover)',
});

globalStyle(`${buttonSelector}:active`, {
  backgroundColor: 'var(--color-brand-primary-active)',
  transform: 'scale(0.98)',
});

globalStyle(`${buttonSelector}:focus-visible`, {
  outline: '2px solid var(--color-brand-primary)',
  outlineOffset: '2px',
});

// Size variants
export const size = styleVariants({
  small: {
    height: '1.75rem',
    fontSize: '0.8125rem',
    padding: '0 10px',
  },
  medium: {
    height: 'var(--spacing-2xl)',
    fontSize: 'var(--font-size-sm)',
    padding: '0 12px',
  },
  large: {
    height: '2.25rem',
    fontSize: '0.9375rem',
    padding: '0 14px',
  },
});
