export interface InputNumberProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number | undefined) => void;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large';
  controls?: boolean;
  keyboard?: boolean;
  stringMode?: boolean;
  className?: string;
  inputClassName?: string;
  incrementButtonClassName?: string;
  decrementButtonClassName?: string;
  injectStyles?: boolean;
}

export interface UseInputNumberProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number | undefined) => void;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  controls?: boolean;
  keyboard?: boolean;
  stringMode?: boolean;
}

export interface UseInputNumberReturn {
  currentValue: number | undefined;
  displayValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleIncrement: () => void;
  handleDecrement: () => void;
  handleFocus: (e: React.FocusEvent) => void;
  handleBlur: (e: React.FocusEvent) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  isValidValue: (value: number) => boolean;
  clampValue: (value: number) => number;
  formatValue: (value: number) => string;
}
