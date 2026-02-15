'use client';

// components/headless/input/use-input.ts
import { useCallback, useState } from 'react';

export interface UseInputProps {
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'range' | 'color';
  size?: 'custom' | 'small' | 'medium' | 'large';
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (
    value: string,
    event?: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  clearable?: boolean;
  showPassword?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  required?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
  name?: string;
  id?: string;
  /** Input 요소에 직접 적용할 style */
  inputStyle?: React.CSSProperties;
  /** range, number 타입용 min 속성 */
  min?: string | number;
  /** range, number 타입용 max 속성 */
  max?: string | number;
  /** range, number 타입용 step 속성 */
  step?: string | number;
}

export function useInput({
  type = 'text',
  size = 'medium',
  disabled = false,
  readonly = false,
  placeholder,
  value: controlledValue,
  defaultValue = '',
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  onClick,
  clearable = false,
  showPassword = false,
  maxLength,
  minLength,
  pattern,
  required,
  autoComplete,
  autoFocus,
  name,
  id,
  inputClassName,
  inputStyle,
  min,
  max,
  step,
}: UseInputProps & { inputClassName?: string }): {
  value: string;
  isFocused: boolean;
  showPasswordText: boolean;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  wrapperProps: { style: React.CSSProperties };
  clearButtonProps: { onClick: () => void } | null;
  passwordToggleProps: { onClick: () => void } | null;
} {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [showPasswordText, setShowPasswordText] = useState(false);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;

      if (!isControlled) {
        setInternalValue(newValue);
      }

      onChange?.(newValue, event);
    },
    [isControlled, onChange]
  );

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    },
    [onBlur]
  );

  const handleClear = useCallback(() => {
    const emptyValue = '';

    if (!isControlled) {
      setInternalValue(emptyValue);
    }

    onChange?.(emptyValue);
  }, [isControlled, onChange]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPasswordText(!showPasswordText);
  }, [showPasswordText]);

  const sizeStyles = {
    custom: {},
    small: { height: '32px', padding: '0 12px', fontSize: '14px' },
    medium: { height: '40px', padding: '0 16px', fontSize: '16px' },
    large: { height: '48px', padding: '0 20px', fontSize: '18px' },
  };

  const inputType = type === 'password' && showPasswordText ? 'text' : type;

  return {
    value,
    isFocused,
    showPasswordText,

    inputProps: {
      type: inputType,
      disabled,
      readOnly: readonly,
      placeholder,
      value,
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onKeyDown,
      onClick,
      maxLength,
      minLength,
      pattern,
      required,
      autoComplete,
      autoFocus,
      name,
      id,
      min: min !== undefined ? String(min) : undefined,
      max: max !== undefined ? String(max) : undefined,
      step: step !== undefined ? String(step) : undefined,
      className: inputClassName,
      style: {
        width: '100%',
        borderWidth: '1px',
        borderStyle: 'solid',
        // borderColor는 CSS 클래스로 제어 (기본값은 CSS에서 설정)
        borderRadius: 'var(--radius-md)',
        // disabled일 때는 wrapper의 배경색을 사용하도록 transparent로 설정
        backgroundColor: disabled ? 'transparent' : 'var(--color-surface)',
        color: disabled
          ? 'var(--color-text-disabled)'
          : 'var(--color-text)',
        cursor: disabled ? 'not-allowed' : 'text',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        ...sizeStyles[size],
        // inputStyle이 전달되면 병합 (DatePicker 등에서 borderWidth: 0px 등을 오버라이드하기 위해)
        ...(inputStyle || {}),
      },
    },

    wrapperProps: {
      style: {
        position: 'relative' as const,
        width: '100%',
      },
    },

    clearButtonProps:
      clearable && value
        ? {
            onClick: handleClear,
          }
        : null,

    passwordToggleProps:
      type === 'password' && showPassword
        ? {
            onClick: togglePasswordVisibility,
          }
        : null,
  };
}

