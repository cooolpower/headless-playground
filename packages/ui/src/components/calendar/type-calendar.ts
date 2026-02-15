import type { ReactNode } from 'react';
export interface CalendarProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  onSelect?: (date: Date) => void;
  onPanelChange?: (date: Date, mode: CalendarMode) => void;
  mode?: CalendarMode;
  disabledDate?: (date: Date) => boolean;
  dateFullCellRender?: (date: Date) => ReactNode;
  dateCellRender?: (date: Date) => ReactNode;
  monthCellRender?: (date: Date) => ReactNode;
  headerRender?: (config: CalendarHeaderRenderConfig) => ReactNode;
  fullscreen?: boolean;
  className?: string;
  children?: ReactNode;
  injectStyles?: boolean;
}

export type CalendarMode = 'month' | 'year';

export interface CalendarHeaderRenderConfig {
  value: Date;
  type: CalendarMode;
  onChange: (date: Date) => void;
  onTypeChange: (type: CalendarMode) => void;
}

export interface UseCalendarProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  onSelect?: (date: Date) => void;
  onPanelChange?: (date: Date, mode: CalendarMode) => void;
  mode?: CalendarMode;
  disabledDate?: (date: Date) => boolean;
}

export interface UseCalendarReturn {
  currentDate: Date;
  selectedDate: Date | null;
  mode: CalendarMode;
  handleDateSelect: (date: Date) => void;
  handleMonthChange: (month: number) => void;
  handleYearChange: (year: number) => void;
  handleModeChange: (mode: CalendarMode) => void;
  goToToday: () => void;
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
  goToPrevYear: () => void;
  goToNextYear: () => void;
  isDateDisabled: (date: Date) => boolean;
  isDateSelected: (date: Date) => boolean;
  isDateToday: (date: Date) => boolean;
  getDaysInMonth: (year: number, month: number) => Date[];
  getWeekDays: () => string[];
}
