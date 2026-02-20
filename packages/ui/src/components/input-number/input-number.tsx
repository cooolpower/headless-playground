'use client';

import React, { forwardRef } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Icon } from '../icon/icon';
import { useInputNumber } from './use-input-number';
import { InputNumberProps } from './type-input-number';
import { inputNumberCss as _inputNumberCss } from './input-number.styles';
import { useStyles } from '../../hooks/use-styles';

export const InputNumberCss = _inputNumberCss;

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      min,
      max,
      step = 1,
      precision = 0,
      disabled = false,
      readonly = false,
      placeholder,
      size = 'medium',
      controls = true,
      keyboard = true,
      stringMode = false,
      className,
      inputClassName,
      incrementButtonClassName,
      decrementButtonClassName,
      injectStyles = true,
      ...props
    },
    ref,
  ) => {
    // useStyles 훅을 통해 테마 및 컴포넌트 스타일 주입
    useStyles('hc-input-number-styles', _inputNumberCss, injectStyles);
    // Remove children from props to prevent React error (input is a void element)
    const { children, ...inputProps } = props as any;
    const {
      displayValue,
      handleInputChange,
      handleIncrement,
      handleDecrement,
      handleFocus,
      handleBlur,
      handleKeyDown,
      currentValue,
    } = useInputNumber({
      value,
      defaultValue,
      onChange,
      min,
      max,
      step,
      precision,
      controls,
      keyboard,
      stringMode,
    });

    const handleFocusWrapper = (e: React.FocusEvent<HTMLInputElement>) => {
      handleFocus(e);
      onFocus?.(e);
    };

    const handleBlurWrapper = (e: React.FocusEvent<HTMLInputElement>) => {
      handleBlur(e);
      onBlur?.(e);
    };

    const canIncrement =
      !disabled &&
      !readonly &&
      (max === undefined || (currentValue ?? 0) < max);
    const canDecrement =
      !disabled &&
      !readonly &&
      (min === undefined || (currentValue ?? 0) > min);

    // 아이콘 크기는 Progress 데모와 동일하게 'small'로 고정
    const iconSize = 'small';

    const rootClassName = ['hcInputNumber', className]
      .filter(Boolean)
      .join(' ');

    const resolvedInputClassName = ['hcInputNumberInput', inputClassName]
      .filter(Boolean)
      .join(' ');

    const resolvedDecrementButtonClassName = [
      'hcInputNumberButton',
      decrementButtonClassName,
    ]
      .filter(Boolean)
      .join(' ');

    const resolvedIncrementButtonClassName = [
      'hcInputNumberButton',
      incrementButtonClassName,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        className={rootClassName}
        data-size={size}
        data-disabled={disabled ? 'true' : 'false'}
        data-readonly={readonly ? 'true' : 'false'}
      >
        {controls && (
          <button
            type="button"
            onClick={handleDecrement}
            disabled={!canDecrement}
            aria-label="감소"
            tabIndex={-1}
            className={resolvedDecrementButtonClassName}
          >
            <Icon icon={Minus} size={iconSize} />
          </button>
        )}

        <input
          ref={ref}
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleFocusWrapper}
          onBlur={handleBlurWrapper}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
          inputMode="numeric"
          pattern="[0-9.,-]*"
          className={resolvedInputClassName}
          {...inputProps}
        />

        {controls && (
          <button
            type="button"
            onClick={handleIncrement}
            disabled={!canIncrement}
            aria-label="증가"
            tabIndex={-1}
            className={resolvedIncrementButtonClassName}
          >
            <Icon icon={Plus} size={iconSize} />
          </button>
        )}
      </div>
    );
  },
);

InputNumber.displayName = 'InputNumber';
