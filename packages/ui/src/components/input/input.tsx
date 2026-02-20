'use client';

// components/headless/input/input.tsx
import React from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { Icon } from '../icon/icon';
import { useInput } from './use-input';
import { InputProps } from './type-input';
import { inputCss as _inputCss } from './input.styles';
import { cx } from '../../utils';
import { useStyles } from '../../hooks/use-styles';

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
  const inputRest = {
    ...(inputProps as any),
    style: undefined,
    className: undefined,
  };

  // useStyles 훅을 통해 테마 및 컴포넌트 스타일 주입
  useStyles('hc-input-styles', _inputCss, injectStyles);

  return (
    <div
      {...wrapperRest}
      className={cx('hcInputRoot', className)}
      data-disabled={disabled ? 'true' : undefined}
      data-size={size}
      data-focused={isFocused ? 'true' : 'false'}
    >
      <input
        {...inputRest}
        className={cx('hcInput', props.inputClassName)}
        style={inputStyle}
      />

      {clearButtonProps && (
        <button
          {...clearButtonProps}
          type="button"
          className={cx('hcInputClearButton', clearButtonClassName)}
          aria-label="Clear input"
        >
          <Icon icon={X} size="small" />
        </button>
      )}

      {passwordToggleProps && (
        <button
          {...passwordToggleProps}
          type="button"
          className={cx('hcInputPasswordToggle', passwordToggleClassName)}
          aria-label={showPasswordText ? 'Hide password' : 'Show password'}
        >
          <Icon icon={showPasswordText ? EyeOff : Eye} size="small" />
        </button>
      )}
    </div>
  );
}

export const InputCss = _inputCss;
