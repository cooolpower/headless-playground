'use client';

import { useState, useCallback, useEffect } from 'react';
import { UseTimePickerProps, UseTimePickerReturn } from './type-time-picker';

export function useTimePicker({
  value,
  defaultValue,
  onChange,
  onSelect,
  format = 'HH:mm:ss',
  use12Hours = false,
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  disabledHours,
  disabledMinutes,
  disabledSeconds,
}: UseTimePickerProps): UseTimePickerReturn {
  const [selectedTime, setSelectedTime] = useState<Date | null>(
    defaultValue || null
  );
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const isControlled = value !== undefined;
  const currentTime = isControlled ? value : selectedTime;

  // 시간 포맷팅
  const formatTime = useCallback(
    (time: Date | null): string => {
      if (!time) return '';

      const hours = time.getHours();
      const minutes = time.getMinutes();
      const seconds = time.getSeconds();

      if (use12Hours) {
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
        return format
          .replace(/HH/g, displayHours.toString().padStart(2, '0'))
          .replace(/hh/g, displayHours.toString().padStart(2, '0'))
          .replace(/mm/g, minutes.toString().padStart(2, '0'))
          .replace(/ss/g, seconds.toString().padStart(2, '0'))
          .replace(/A/g, period);
      }

      return format
        .replace(/HH/g, hours.toString().padStart(2, '0'))
        .replace(/hh/g, hours.toString().padStart(2, '0'))
        .replace(/mm/g, minutes.toString().padStart(2, '0'))
        .replace(/ss/g, seconds.toString().padStart(2, '0'));
    },
    [format, use12Hours]
  );

  // 시간 파싱
  const parseTime = useCallback(
    (timeString: string): Date | null => {
      if (!timeString.trim()) return null;

      const time = new Date();
      let hours: number;
      let minutes = 0;
      let seconds = 0;
      let period: string | undefined;

      if (use12Hours) {
        // 12시간 형식 파싱
        const match = timeString.match(
          /^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?$/i
        );
        if (!match) return null;

        hours = parseInt(match[1], 10);
        minutes = parseInt(match[2], 10);
        seconds = match[3] ? parseInt(match[3], 10) : 0;
        period = match[4]?.toUpperCase();

        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
      } else {
        // 24시간 형식 파싱
        const match = timeString.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
        if (!match) return null;

        hours = parseInt(match[1], 10);
        minutes = parseInt(match[2], 10);
        seconds = match[3] ? parseInt(match[3], 10) : 0;
      }

      // 유효성 검사
      if (
        hours < 0 ||
        hours > 23 ||
        minutes < 0 ||
        minutes > 59 ||
        seconds < 0 ||
        seconds > 59
      ) {
        return null;
      }

      // 비활성화된 시간 확인
      if (disabledHours && disabledHours().includes(hours)) return null;
      if (disabledMinutes && disabledMinutes(hours).includes(minutes))
        return null;
      if (disabledSeconds && disabledSeconds(hours, minutes).includes(seconds))
        return null;

      time.setHours(hours, minutes, seconds, 0);
      return time;
    },
    [use12Hours, disabledHours, disabledMinutes, disabledSeconds]
  );

  // 입력 변경 핸들러
  const handleInputChange = useCallback(
    (value: string) => {
      setInputValue(value);

      const parsedTime = parseTime(value);
      if (parsedTime) {
        if (!isControlled) {
          setSelectedTime(parsedTime);
        }
        onChange?.(parsedTime, value);
        onSelect?.(parsedTime);
      } else if (value === '') {
        if (!isControlled) {
          setSelectedTime(null);
        }
        onChange?.(null, '');
      }
    },
    [parseTime, isControlled, onChange, onSelect]
  );

  // 시간 선택 핸들러
  const handleTimeSelect = useCallback(
    (time: Date) => {
      if (!isControlled) {
        setSelectedTime(time);
      }

      const timeString = formatTime(time);
      setInputValue(timeString);
      setIsOpen(false);

      onChange?.(time, timeString);
      onSelect?.(time);
    },
    [isControlled, formatTime, onChange, onSelect]
  );

  // 클리어 핸들러
  const handleClear = useCallback(() => {
    if (!isControlled) {
      setSelectedTime(null);
    }
    setInputValue('');
    onChange?.(null, '');
  }, [isControlled, onChange]);

  // 초기 값 설정
  useEffect(() => {
    if (currentTime) {
      setInputValue(formatTime(currentTime));
    } else {
      setInputValue('');
    }
  }, [currentTime, formatTime]);

  // controlled value가 변경되면 input value 업데이트
  useEffect(() => {
    if (isControlled) {
      setInputValue(formatTime(value || null));
    }
  }, [value, isControlled, formatTime]);

  return {
    selectedTime: currentTime,
    isOpen,
    inputValue,
    setIsOpen,
    handleInputChange,
    handleTimeSelect,
    handleClear,
    formatTime,
    parseTime,
  };
}
