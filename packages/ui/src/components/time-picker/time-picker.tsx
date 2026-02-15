'use client';

import React, { forwardRef, useRef, useState } from 'react';
import { X, Clock } from 'lucide-react';
import { Icon } from '../icon/icon';
import { TimePickerProps } from './type-time-picker';
import { useTimePicker } from './use-time-picker';
import { TimePickerPanel } from './time-picker-panel';
import { timePickerCss as _timePickerCss } from './time-picker.styles';

export const TimePickerCss = _timePickerCss;

function cx(...parts: Array<string | undefined | null | false>) {
  return parts.filter(Boolean).join(' ');
}

export const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      onSelect,
      format = 'HH:mm:ss',
      placeholder = '시간 선택',
      disabled = false,
      allowClear = true,
      showNow = true,
      size = 'medium',
      use12Hours = false,
      hourStep = 1,
      minuteStep = 1,
      secondStep = 1,
      disabledHours,
      disabledMinutes,
      disabledSeconds,
      className,
      panelClassName,
      inputWrapperClassName,
      inputClassName,
      inputActionsClassName,
      clearButtonClassName,
      dropdownButtonClassName,
      backdropClassName,
      panelWrapperClassName,
      injectStyles = true,
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const {
      selectedTime,
      isOpen,
      inputValue,
      setIsOpen,
      handleInputChange,
      handleTimeSelect,
      handleClear,
      formatTime,
    } = useTimePicker({
      value,
      defaultValue,
      onChange,
      onSelect,
      format,
      use12Hours,
      hourStep,
      minuteStep,
      secondStep,
      disabledHours,
      disabledMinutes,
      disabledSeconds,
    });

    const handleInputClick = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };

    const handleInputKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        setIsOpen(!isOpen);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handlePanelSelect = (time: Date | null) => {
      if (time) {
        handleTimeSelect(time);
      }
    };

    const rootClassName = injectStyles ? cx('hcTimePicker', className) : className;
    const resolvedInputWrapperClassName = injectStyles
      ? cx('hcTimePickerInputWrapper', inputWrapperClassName)
      : inputWrapperClassName;
    const resolvedInputClassName = injectStyles
      ? cx('hcTimePickerInput', inputClassName)
      : inputClassName;
    const resolvedActionsClassName = injectStyles
      ? cx('hcTimePickerActions', inputActionsClassName)
      : inputActionsClassName;
    const resolvedClearButtonClassName = injectStyles
      ? cx('hcTimePickerIconButton', clearButtonClassName)
      : clearButtonClassName;
    const resolvedDropdownButtonClassName = injectStyles
      ? cx('hcTimePickerIconButton', dropdownButtonClassName)
      : dropdownButtonClassName;
    const resolvedBackdropClassName = injectStyles
      ? cx('hcTimePickerBackdrop', backdropClassName)
      : backdropClassName;
    const resolvedPanelWrapperClassName = injectStyles
      ? cx('hcTimePickerPanelWrapper', panelWrapperClassName)
      : panelWrapperClassName;
    const resolvedPanelClassName = injectStyles
      ? cx('hcTimePickerPanel', panelClassName)
      : panelClassName;

    return (
      <div ref={containerRef} className={rootClassName}>
        {injectStyles && (
          <style suppressHydrationWarning>{_timePickerCss}</style>
        )}

        <div className={resolvedInputWrapperClassName}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onClick={handleInputClick}
            onKeyDown={handleInputKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            readOnly
            className={resolvedInputClassName}
          />

          <div className={resolvedActionsClassName}>
            {allowClear && selectedTime && inputValue && !disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                aria-label="시간 초기화"
                className={resolvedClearButtonClassName}
              >
                <Icon icon={X} size="small" />
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              disabled={disabled}
              aria-label="시간 선택 패널 토글"
              className={resolvedDropdownButtonClassName}
            >
              <Icon icon={Clock} size="small" />
            </button>
          </div>
        </div>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              onClick={() => setIsOpen(false)}
              className={resolvedBackdropClassName}
            />

            {/* Panel */}
            <div className={resolvedPanelWrapperClassName}>
              <TimePickerPanel
                value={selectedTime || undefined}
                onChange={handlePanelSelect}
                format={format}
                use12Hours={use12Hours}
                hourStep={hourStep}
                minuteStep={minuteStep}
                secondStep={secondStep}
                disabledHours={disabledHours}
                disabledMinutes={disabledMinutes}
                disabledSeconds={disabledSeconds}
                className={resolvedPanelClassName}
              />
            </div>
          </>
        )}
      </div>
    );
  },
);

TimePicker.displayName = 'TimePicker';
