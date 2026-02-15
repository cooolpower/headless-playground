import { style, globalStyle } from '@vanilla-extract/css';

// Demo-specific styles
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

// Calendar component styles (moved from headless component)
export const calendar = style({
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-lg)',
  overflow: 'hidden',
  fontSize: 'var(--font-size-sm)',
  lineHeight: '1.5',
});

export const fullscreen = style({
  width: '100%',
  height: '100%',
});

// Header
export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 16px',
  backgroundColor: 'var(--color-surface-hover)',
  borderBottom: '1px solid var(--color-divider)',
});

export const headerLeft = style({
  display: 'flex',
  gap: '4px',
});

export const headerCenter = style({
  flex: 1,
  textAlign: 'center',
});

export const headerRight = style({
  display: 'flex',
  gap: '4px',
});

export const headerTitle = style({
  fontSize: 'var(--font-size-base)',
  fontWeight: '600',
  color: 'var(--color-text-heading)',
});

export const navButton = style({
  background: 'none',
  border: 'none',
  width: '28px',
  height: '1.75rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  cursor: 'pointer',
  color: 'var(--color-text-secondary)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'bold',
  transition: 'all 0.2s ease-in-out',

  ':hover': {
    backgroundColor: 'var(--color-surface-hover)',
    color: 'var(--color-text-heading)',
  },

  ':focus': {
    outline: '2px solid var(--color-brand-primary)',
    outlineOffset: '2px',
  },
});

// Body
export const body = style({
  padding: 'var(--spacing-base)',
});

// Month View
export const monthView = style({
  width: '100%',
});

// Week Header
export const weekHeader = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '1px',
  marginBottom: '8px',
});

export const weekDay = style({
  padding: '8px 4px',
  textAlign: 'center',
  fontSize: 'var(--font-size-xs)',
  fontWeight: '500',
  color: 'var(--color-text-secondary)',
  backgroundColor: 'var(--color-surface-hover)',
});

export const weekDaySunday = style({
  color: 'var(--color-semantic-error)',
});

// Date Grid
export const dateGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '1px',
  backgroundColor: 'var(--color-divider)',
  border: '1px solid var(--color-divider)',
});

// Date Cell
export const dateCell = style({
  position: 'relative',
  minHeight: '80px',
  padding: '4px',
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-divider)',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',

  ':hover': {
    backgroundColor: 'var(--color-surface-hover)',
  },

  ':focus': {
    outline: '2px solid var(--color-brand-primary)',
    outlineOffset: '-2px',
    zIndex: 1,
  },
});

export const dateCellOtherMonth = style({
  backgroundColor: 'var(--color-surface-hover)',
  color: 'var(--color-text-muted)',
});

export const dateCellSelected = style({
  backgroundColor: 'var(--color-brand-primary)',
  color: 'var(--color-text-on-primary)',

  ':hover': {
    backgroundColor: 'var(--color-brand-primary-hover)',
  },
});

export const dateCellToday = style({
  '::before': {
    content: '""',
    position: 'absolute',
    top: '2px',
    right: '2px',
    width: '6px',
    height: '6px',
    backgroundColor: 'var(--color-brand-primary)',
    borderRadius: '50%',
  },
});

export const dateCellDisabled = style({
  backgroundColor: 'var(--color-surface-hover)',
  color: 'var(--color-text-disabled)',
  cursor: 'not-allowed',

  ':hover': {
    backgroundColor: 'var(--color-surface-hover)',
  },
});

export const dateCellContent = style({
  flex: 1,
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  padding: '4px',
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
});

// 크기 variants
export const sizeVariants = {
  small: {
    calendar: {
      fontSize: 'var(--font-size-xs)',
    },
    header: {
      padding: '8px 12px',
    },
    dateCell: {
      minHeight: '60px',
    },
  },
  medium: {
    calendar: {
      fontSize: 'var(--font-size-sm)',
    },
    header: {
      padding: '12px 16px',
    },
    dateCell: {
      minHeight: '80px',
    },
  },
  large: {
    calendar: {
      fontSize: 'var(--font-size-base)',
    },
    header: {
      padding: '16px 20px',
    },
    dateCell: {
      minHeight: '100px',
    },
  },
};

// 테마 variants
export const themeVariants = {
  default: {
    background: 'var(--color-surface)',
    border: 'var(--color-divider)',
    headerBg: 'var(--color-surface-hover)',
    selectedBg: 'var(--color-brand-primary)',
    todayIndicator: 'var(--color-brand-primary)',
  },
  dark: {
    background: 'var(--color-neutral-200)',
    border: 'var(--color-divider)',
    headerBg: 'var(--color-neutral-300)',
    selectedBg: 'var(--color-brand-primary)',
    todayIndicator: 'var(--color-brand-primary)',
  },
};

// Calendar 커스텀 스타일 (injectStyles=false일 때 사용)
const calendarCustomWrapper = style({});

globalStyle(`${calendarCustomWrapper} .hcCalendar`, {
  width: '100%',
  color: 'var(--color-text)',
  padding: 'var(--spacing-base)',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
});

globalStyle(`${calendarCustomWrapper} .hcCalendarHeader`, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  padding: '0.75rem',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface-hover)',
});

globalStyle(`${calendarCustomWrapper} .hcCalendarBody`, {
  marginTop: '0.75rem',
  border: '2px dashed var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  overflow: 'hidden',
  background: 'var(--color-surface)',
});

export const calendarWrapperClass = calendarCustomWrapper;
