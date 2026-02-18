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

// DatePicker wrapper
export const datepicker = style({
  position: 'relative',
  display: 'inline-block',
  width: '100%',
  maxWidth: '300px',
  // border: '1px solid var(--color-divider)',
  // borderRadius: 'var(--radius-sm)',
  //padding: 'var(--spacing-sm)',
});

// Input wrapper
export const inputWrapper = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: '4px',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--color-surface)',
  borderColor: 'var(--color-divider)',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  paddingRight: '0.5rem',

  selectors: {
    '&[data-disabled="true"]': {
      opacity: 0.6,
      cursor: 'not-allowed',
      backgroundColor: 'var(--color-background-disabled)',
      borderColor: 'var(--color-divider)',
    },
  },
});

// Calendar icon button
export const calendarIconButton = style({
  background: 'none',
  border: 'none',
  fontSize: 'var(--font-size-lg)',
  cursor: 'pointer',
  padding: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--color-text-secondary)',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  borderRadius: '3px',
  flexShrink: 0,

  // ':hover': {
  //   backgroundColor: 'var(--color-surface-hover)',
  //   color: 'var(--color-text)',
  // },

  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.4,
  },
});

// Calendar panel wrapper
export const panelWrapper = style({
  position: 'absolute',
  top: 'calc(100% + 4px)',
  left: 0,
  zIndex: 1001,
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-md)',
  boxShadow: 'var(--shadow-lg)',
  //padding: 'var(--spacing-sm)',
  minWidth: '300px',
});

// DateRangePicker panel wrapper (two calendars side by side)
export const rangePanelWrapper = style({
  position: 'absolute',
  top: 'calc(100% + 4px)',
  left: 0,
  zIndex: 1001,
  display: 'flex',
  //gap: 'var(--spacing-base)',
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-md)',
  boxShadow: 'var(--shadow-lg)',
  // padding: 'var(--spacing-md)',
});

// Calendar panel - Naive UI style
export const calendar = style({
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-sm)',
  boxShadow: 'var(--shadow-md)',
  overflow: 'hidden',
  padding: 'var(--spacing-md)',
  minWidth: '300px',
});

// RangePanelWrapper 내부의 calendar는 boxShadow 제거
globalStyle(`${rangePanelWrapper} ${calendar}`, {
  boxShadow: 'none',
});

// Calendar header
const calendarHeaderSelector = `${calendar} > div:first-child`;
globalStyle(calendarHeaderSelector, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '12px',
});

// Navigation buttons
const navButtonSelector = `${calendarHeaderSelector} > button`;
globalStyle(navButtonSelector, {
  background: 'none',
  border: 'none',
  fontSize: 'var(--font-size-lg)',
  fontWeight: '500',
  color: 'var(--color-text)',
  cursor: 'pointer',
  padding: '4px 8px',
  borderRadius: '3px',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '28px',
  height: '1.75rem',
});

globalStyle(`${navButtonSelector}:hover`, {
  backgroundColor: 'var(--color-surface-hover)',
});

globalStyle(`${navButtonSelector}:active`, {
  backgroundColor: 'var(--color-surface-hover)',
  transform: 'scale(0.95)',
});

// Month/Year display
const monthYearSelector = `${calendarHeaderSelector} > span`;
globalStyle(monthYearSelector, {
  fontSize: '0.9375rem',
  fontWeight: '500',
  color: 'var(--color-text)',
  userSelect: 'none',
});

// Week header
const weekHeaderSelector = `${calendar} > div:nth-child(2)`;
globalStyle(weekHeaderSelector, {
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '4px',
  marginBottom: '8px',
});

// Week day labels
const weekDaySelector = `${weekHeaderSelector} > div`;
globalStyle(weekDaySelector, {
  textAlign: 'center',
  fontSize: 'var(--font-size-xs)',
  fontWeight: '400',
  color: 'var(--color-text-secondary)',
  padding: '6px 0',
  userSelect: 'none',
});

// Date grid
const dateGridSelector = `${calendar} > div:last-child`;
globalStyle(dateGridSelector, {
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  //gap: '4px',
});

// Date cell buttons - base styles applied via globalStyle
const dateCellSelector = `${dateGridSelector} > button`;
globalStyle(dateCellSelector, {
  aspectRatio: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  background: 'transparent', // 기본 배경색 제거 - dateCell이나 다른 클래스에서 설정
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text)',
  cursor: 'pointer',
  borderRadius: '3px',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  padding: 0,
  fontFamily: 'inherit',
  minHeight: '32px',
});

// Hover styles는 각 스타일에서 개별적으로 정의됨
// dateCellToday, dateCellSelected, dateCellInRange는 각자의 :hover를 가짐
// 기본 hover는 dateCell 스타일의 :hover에서 처리됨

globalStyle(`${dateCellSelector}:active`, {
  transform: 'scale(0.95)',
});

// Date cell - other month (disabled)
globalStyle(`${dateCellSelector}:disabled`, {
  color: 'var(--color-text-disabled)',
  cursor: 'not-allowed',
  opacity: 0.4,
});

globalStyle(`${dateCellSelector}:disabled:hover`, {
  backgroundColor: 'transparent',
});

// Date cell - today
export const dateCellToday = style({
  border: '1px solid var(--color-semantic-info)',
  backgroundColor: 'var(--color-semantic-info)',
  color: 'var(--color-text-on-primary)',
  fontWeight: '500',

  selectors: {
    '&:hover': {
      backgroundColor: 'var(--color-semantic-info)',
      color: 'var(--color-text-on-primary)',
    },
    '&:not(:disabled):hover': {
      backgroundColor: 'var(--color-semantic-info)',
      color: 'var(--color-text-on-primary)',
    },
  },
});

// Date cell - selected
export const dateCellSelected = style({
  backgroundColor: 'var(--color-brand-primary)',
  color: 'var(--color-text-on-primary)',
  fontWeight: '500',

  selectors: {
    '&:hover': {
      backgroundColor: 'var(--color-brand-primary-hover)',
      color: 'var(--color-text-on-primary)',
    },
    '&:not(:disabled):hover': {
      backgroundColor: 'var(--color-brand-primary-hover)',
      color: 'var(--color-text-on-primary)',
    },
  },
});

// dateCellSelected가 적용된 버튼에 대한 globalStyle로 hover 오버라이드
globalStyle(`${dateCellSelector}.${dateCellSelected}:hover`, {
  backgroundColor: 'var(--color-brand-primary-hover)',
  color: 'var(--color-text-on-primary)',
});

// Size variants
export const size = styleVariants({
  small: {
    fontSize: '0.8125rem',
  },
  medium: {
    fontSize: 'var(--font-size-sm)',
  },
  large: {
    fontSize: '0.9375rem',
  },
});

// Date Range styles
export const rangePickerWrapper = style({
  display: 'flex',
  alignItems: 'flex-end',
  gap: 'var(--spacing-base)',
  flexWrap: 'wrap',
});

export const rangePickerItem = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-xs)',
  //flex: 1,
  minWidth: '200px',
});

export const rangeLabel = style({
  fontSize: 'var(--font-size-sm)',
  fontWeight: '500',
  color: 'var(--color-text-secondary)',
  marginBottom: 'var(--spacing-xs)',
});

export const rangeSeparator = style({
  fontSize: 'var(--font-size-lg)',
  color: 'var(--color-text-secondary)',
  paddingBottom: 'var(--spacing-sm)',
  alignSelf: 'flex-end',
  fontWeight: '500',
});

export const rangeInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-xs)',
  marginTop: 'var(--spacing-base)',
  padding: 'var(--spacing-sm)',
  backgroundColor: 'var(--color-surface)',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--color-divider)',
});

export const rangeValue = style({
  fontSize: 'var(--font-size-sm)',
  //fontFamily: 'var(--font-family-nanumGothic)',
  color: 'var(--color-text)',
  fontWeight: '500',
});

export const rangeDays = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
});

// Date cell - in range (for DateRangePicker)
// 시작일과 종료일 사이의 날짜들에 적용되는 연한 배경색
// primary 색상의 20% 투명도 버전 사용 (--color-focus-ring과 유사하지만 배경색용)
export const dateCellInRange = style({
  backgroundColor: 'oklch(0.83 0.13 168 / 0.15)', // primary 색상의 15% 투명도
  color: 'var(--color-text)',
  borderRadius: 0,
  position: 'relative',

  selectors: {
    '&:hover': {
      backgroundColor: 'oklch(0.83 0.13 168 / 0.2)', // hover 시 20%로 약간 진하게
      color: 'var(--color-text)',
    },
    '&:not(:disabled):hover': {
      backgroundColor: 'oklch(0.83 0.13 168 / 0.2)',
      color: 'var(--color-text)',
    },
  },
});

// dateCellInRange가 적용된 버튼에 대한 globalStyle로 hover 오버라이드
globalStyle(`${dateCellSelector}.${dateCellInRange}:hover`, {
  backgroundColor: 'oklch(0.83 0.13 168 / 0.2)',
  color: 'var(--color-text)',
});

// 기본 hover 스타일 (dateCellToday, dateCellSelected, dateCellInRange가 없는 경우)
globalStyle(`${dateCellSelector}:hover:not(.${dateCellToday}):not(.${dateCellSelected}):not(.${dateCellInRange})`, {
  backgroundColor: 'var(--color-surface-hover)',
});

// Date cell - range start
// 시작일의 왼쪽 모서리를 둥글게
export const dateCellRangeStart = style({
  borderTopLeftRadius: 'var(--radius-sm)',
  borderBottomLeftRadius: 'var(--radius-sm)',
});

// Date cell - range end
// 종료일의 오른쪽 모서리를 둥글게
export const dateCellRangeEnd = style({
  borderTopRightRadius: 'var(--radius-sm)',
  borderBottomRightRadius: 'var(--radius-sm)',
});


export const weekDay = style({
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text)',
  fontWeight: '500',
  borderRadius: 'var(--radius-sm)',
  padding: 'var(--spacing-xs)',
});

export const dateCell = style({
  // backgroundColor: 'transparent', // 기본 배경색을 transparent로 설정하여 범위 스타일이 보이도록
  // color: 'var(--color-text)',
  fontWeight: '500',
  borderRadius: 'var(--radius-sm)',
  padding: 'var(--spacing-xs)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // width: 'var(--spacing-3xl)',
  // height: 'var(--spacing-3xl)',
  fontSize: 'var(--font-size-xs)',

  selectors: {
    '&:hover': {
      backgroundColor: 'var(--color-surface-hover)',
    },
  },
});
