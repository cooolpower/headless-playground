'use client';

import React, { useState, useEffect } from 'react';
import { TimePickerPanelProps } from './type-time-picker';

export function TimePickerPanel({
  value,
  onChange,
  format = 'HH:mm:ss',
  use12Hours = false,
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  disabledHours,
  disabledMinutes,
  disabledSeconds,
  className,
}: TimePickerPanelProps) {
  const [selectedTime, setSelectedTime] = useState<Date>(value || new Date());

  useEffect(() => {
    if (value) {
      setSelectedTime(value);
    }
  }, [value]);

  const hours = selectedTime.getHours();
  const minutes = selectedTime.getMinutes();
  const seconds = selectedTime.getSeconds();

  const handleHourChange = (newHour: number) => {
    const newTime = new Date(selectedTime);
    newTime.setHours(newHour);
    setSelectedTime(newTime);
    onChange?.(newTime);
  };

  const handleMinuteChange = (newMinute: number) => {
    const newTime = new Date(selectedTime);
    newTime.setMinutes(newMinute);
    setSelectedTime(newTime);
    onChange?.(newTime);
  };

  const handleSecondChange = (newSecond: number) => {
    const newTime = new Date(selectedTime);
    newTime.setSeconds(newSecond);
    setSelectedTime(newTime);
    onChange?.(newTime);
  };

  const generateOptions = (
    start: number,
    end: number,
    step: number,
    disabledFn?: () => number[]
  ) => {
    const options = [];
    for (let i = start; i <= end; i += step) {
      const isDisabled = disabledFn && disabledFn().includes(i);
      options.push(
        <option key={i} value={i} disabled={isDisabled}>
          {i.toString().padStart(2, '0')}
        </option>
      );
    }
    return options;
  };

  const getDisabledMinutes = () => {
    return disabledMinutes ? disabledMinutes(hours) : [];
  };

  const getDisabledSeconds = () => {
    return disabledSeconds ? disabledSeconds(hours, minutes) : [];
  };

  const hasSeconds = format.includes('ss');

  return (
    <div className={className}>
      <div className="hcTimePickerPanelHeader">
        <div>
          {hours.toString().padStart(2, '0')}:
          {minutes.toString().padStart(2, '0')}
          {hasSeconds && `:${seconds.toString().padStart(2, '0')}`}
          {use12Hours && <span>{hours >= 12 ? 'PM' : 'AM'}</span>}
        </div>
      </div>

      <div>
        <div className="hcTimePickerPanelBody">
          {/* Hours */}
          <div className="hcTimePickerField">
            <label className="hcTimePickerLabel">{use12Hours ? 'Hour' : '시'}</label>
            <select
              className="hcTimePickerSelect"
              value={
                use12Hours
                  ? hours === 0
                    ? 12
                    : hours > 12
                      ? hours - 12
                      : hours
                  : hours
              }
              onChange={(e) => {
                let hourValue = parseInt(e.target.value, 10);
                if (use12Hours) {
                  if (hours >= 12) {
                    // PM
                    hourValue = hourValue === 12 ? 12 : hourValue + 12;
                  } else {
                    // AM
                    hourValue = hourValue === 12 ? 0 : hourValue;
                  }
                }
                handleHourChange(hourValue);
              }}
            >
              {use12Hours
                ? generateOptions(1, 12, 1)
                : generateOptions(0, 23, hourStep, disabledHours)}
            </select>
          </div>

          {/* Minutes */}
          <div className="hcTimePickerField">
            <label className="hcTimePickerLabel">분</label>
            <select
              className="hcTimePickerSelect"
              value={minutes}
              onChange={(e) => handleMinuteChange(parseInt(e.target.value, 10))}
            >
              {generateOptions(0, 59, minuteStep, getDisabledMinutes)}
            </select>
          </div>

          {/* Seconds */}
          {hasSeconds && (
            <div className="hcTimePickerField">
              <label className="hcTimePickerLabel">초</label>
              <select
                className="hcTimePickerSelect"
                value={seconds}
                onChange={(e) =>
                  handleSecondChange(parseInt(e.target.value, 10))
                }
              >
                {generateOptions(0, 59, secondStep, getDisabledSeconds)}
              </select>
            </div>
          )}

          {/* AM/PM */}
          {use12Hours && (
            <div className="hcTimePickerField">
              <label className="hcTimePickerLabel">AM/PM</label>
              <select
                className="hcTimePickerSelect"
                value={hours >= 12 ? 'PM' : 'AM'}
                onChange={(e) => {
                  const isPM = e.target.value === 'PM';
                  const newHour = isPM ? (hours % 12) + 12 : hours % 12;
                  handleHourChange(newHour === 24 ? 12 : newHour);
                }}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          )}
        </div>

        <div className="hcTimePickerPanelFooter">
          <button
            type="button"
            className="hcTimePickerNowButton"
            onClick={() => {
              const now = new Date();
              setSelectedTime(now);
              onChange?.(now);
            }}
          >
            지금
          </button>
        </div>
      </div>
    </div>
  );
}
