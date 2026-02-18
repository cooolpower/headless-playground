import type { ReactNode } from 'react';
export interface datepickerProps {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  placeholder?: string;
  inputWrapperClassName?: string;
  calendarIconButtonClassName?: string;
  panelWrapperClassName?: string;
  calendarClassName?: string;
  calendarHeaderClassName?: string;
  navButtonClassName?: string;
  monthYearClassName?: string;
  weekHeaderClassName?: string;
  weekDayClassName?: string;
  dateGridClassName?: string;
  dateCellClassName?: string;
  dateCellTodayClassName?: string;
  dateCellSelectedClassName?: string;
  size?: 'small' | 'medium' | 'large';
  brandColor?: string;
  injectStyles?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export interface UsedatepickerProps {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  disabled?: boolean;
}

export interface UsedatepickerReturn {
  currentValue: any;
  handleChange: (value: any) => void;
}
