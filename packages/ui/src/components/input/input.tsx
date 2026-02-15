'use client';

// components/headless/input/input.tsx
import React from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { Icon } from '../icon/icon';
import { useInput } from './use-input';
import { InputProps } from './type-input';
import { inputCss as _inputCss } from './input.styles';

export function Input(props: InputProps) {
  const {
    inputProps,
    wrapperProps,
    clearButtonProps,
    passwordToggleProps,
    showPasswordText,
    isFocused,
  } = useInput(props);

  const {
    className,
    clearButtonClassName,
    passwordToggleClassName,
    disabled,
    inputStyle,
    size = 'medium',
    injectStyles = true,
  } = props;

  const wrapperRest = { ...(wrapperProps as any), style: undefined };
  const inputRest = { ...(inputProps as any), style: undefined, className: undefined };

  return (
    <div
      {...wrapperRest}
      className={className ? `hcInputRoot ${className}` : 'hcInputRoot'}
      data-disabled={disabled ? 'true' : undefined}
      data-size={size}
      data-focused={isFocused ? 'true' : 'false'}
    >
      {injectStyles ? <style suppressHydrationWarning>{_inputCss}</style> : null}
      <input
        {...inputRest}
        className={props.inputClassName ? `hcInput ${props.inputClassName}` : 'hcInput'}
        style={inputStyle}
      />

      {clearButtonProps && (
        <button
          {...clearButtonProps}
          type="button"
          className={
            clearButtonClassName
              ? `hcInputClearButton ${clearButtonClassName}`
              : 'hcInputClearButton'
          }
          aria-label="Clear input"
        >
          <Icon icon={X} size="small" />
        </button>
      )}

      {passwordToggleProps && (
        <button
          {...passwordToggleProps}
          type="button"
          className={
            passwordToggleClassName
              ? `hcInputPasswordToggle ${passwordToggleClassName}`
              : 'hcInputPasswordToggle'
          }
          aria-label={showPasswordText ? 'Hide password' : 'Show password'}
        >
          <Icon icon={showPasswordText ? EyeOff : Eye} size="small" />
        </button>
      )}
    </div>
  );
}

export const InputCss = _inputCss;
