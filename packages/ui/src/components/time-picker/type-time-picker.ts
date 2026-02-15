import type { ReactNode } from 'react';
export interface TimePickerProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (time: Date | null, timeString: string) => void;
  onSelect?: (time: Date) => void;
  format?: string;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  showNow?: boolean;
  size?: 'small' | 'medium' | 'large';
  use12Hours?: boolean;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  disabledHours?: () => number[];
  disabledMinutes?: (selectedHour: number) => number[];
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
  className?: string;
  panelClassName?: string;
  inputWrapperClassName?: string;
  inputClassName?: string;
  inputActionsClassName?: string;
  clearButtonClassName?: string;
  dropdownButtonClassName?: string;
  backdropClassName?: string;
  panelWrapperClassName?: string;
  children?: ReactNode;
  injectStyles?: boolean;
}

export interface TimePickerPanelProps {
  value?: Date;
  onChange?: (time: Date | null) => void;
  format?: string;
  use12Hours?: boolean;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  disabledHours?: () => number[];
  disabledMinutes?: (selectedHour: number) => number[];
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
  className?: string;
}

export interface UseTimePickerProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (time: Date | null, timeString: string) => void;
  onSelect?: (time: Date) => void;
  format?: string;
  use12Hours?: boolean;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  disabledHours?: () => number[];
  disabledMinutes?: (selectedHour: number) => number[];
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
}

export interface UseTimePickerReturn {
  selectedTime: Date | null;
  isOpen: boolean;
  inputValue: string;
  setIsOpen: (open: boolean) => void;
  handleInputChange: (value: string) => void;
  handleTimeSelect: (time: Date) => void;
  handleClear: () => void;
  formatTime: (time: Date | null) => string;
  parseTime: (timeString: string) => Date | null;
}
