'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  UseCalendarProps,
  UseCalendarReturn,
  CalendarMode,
} from './type-calendar';

export function useCalendar({
  value,
  defaultValue = new Date(),
  onChange,
  onSelect,
  onPanelChange,
  mode = 'month',
  disabledDate,
}: UseCalendarProps): UseCalendarReturn {
  const [internalCurrentDate, setInternalCurrentDate] = useState(defaultValue);
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(
    value || null
  );
  const [internalMode, setInternalMode] = useState<CalendarMode>(mode);

  const isControlled = value !== undefined;
  const currentDate = isControlled ? value || new Date() : internalCurrentDate;
  const selectedDate = isControlled ? value : internalSelectedDate;
  const currentMode = mode;

  // 날짜 선택
  const handleDateSelect = useCallback(
    (date: Date) => {
      if (!isControlled) {
        setInternalSelectedDate(date);
      }

      onSelect?.(date);
      onChange?.(date);
    },
    [isControlled, onSelect, onChange]
  );

  // 월 변경
  const handleMonthChange = useCallback(
    (month: number) => {
      const newDate = new Date(currentDate);
      newDate.setMonth(month);
      setInternalCurrentDate(newDate);
      onPanelChange?.(newDate, currentMode);
    },
    [currentDate, currentMode, onPanelChange]
  );

  // 년 변경
  const handleYearChange = useCallback(
    (year: number) => {
      const newDate = new Date(currentDate);
      newDate.setFullYear(year);
      setInternalCurrentDate(newDate);
      onPanelChange?.(newDate, currentMode);
    },
    [currentDate, currentMode, onPanelChange]
  );

  // 모드 변경
  const handleModeChange = useCallback(
    (newMode: CalendarMode) => {
      setInternalMode(newMode);
      onPanelChange?.(currentDate, newMode);
    },
    [currentDate, onPanelChange]
  );

  // 오늘로 이동
  const goToToday = useCallback(() => {
    const today = new Date();
    setInternalCurrentDate(today);
    onPanelChange?.(today, currentMode);
  }, [currentMode, onPanelChange]);

  // 이전 달로 이동
  const goToPrevMonth = useCallback(() => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setInternalCurrentDate(newDate);
    onPanelChange?.(newDate, currentMode);
  }, [currentDate, currentMode, onPanelChange]);

  // 다음 달로 이동
  const goToNextMonth = useCallback(() => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setInternalCurrentDate(newDate);
    onPanelChange?.(newDate, currentMode);
  }, [currentDate, currentMode, onPanelChange]);

  // 이전 년도로 이동
  const goToPrevYear = useCallback(() => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(newDate.getFullYear() - 1);
    setInternalCurrentDate(newDate);
    onPanelChange?.(newDate, currentMode);
  }, [currentDate, currentMode, onPanelChange]);

  // 다음 년도로 이동
  const goToNextYear = useCallback(() => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(newDate.getFullYear() + 1);
    setInternalCurrentDate(newDate);
    onPanelChange?.(newDate, currentMode);
  }, [currentDate, currentMode, onPanelChange]);

  // 날짜 비활성화 확인
  const isDateDisabled = useCallback(
    (date: Date) => {
      return disabledDate ? disabledDate(date) : false;
    },
    [disabledDate]
  );

  // 날짜 선택 확인
  const isDateSelected = useCallback(
    (date: Date) => {
      if (!selectedDate) return false;
      return date.toDateString() === selectedDate.toDateString();
    },
    [selectedDate]
  );

  // 오늘 날짜 확인
  const isDateToday = useCallback((date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }, []);

  // 해당 월의 모든 날짜 가져오기 (달력 그리드용)
  const getDaysInMonth = useCallback((year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    // 이전 달의 날짜들 (달력의 첫 주를 채우기 위해)
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, 1 - i);
      days.push(prevDate);
    }

    // 현재 달의 날짜들
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    // 다음 달의 날짜들 (달력의 마지막 주를 채우기 위해)
    const remainingDays = 42 - days.length; // 6주 * 7일 = 42일
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  }, []);

  // 요일 이름들 가져오기
  const getWeekDays = useCallback(() => {
    return ['일', '월', '화', '수', '목', '금', '토'];
  }, []);

  // controlled value가 변경되면 내부 상태 업데이트
  useEffect(() => {
    if (isControlled && value) {
      setInternalSelectedDate(value);
    }
  }, [value, isControlled]);

  return {
    currentDate,
    selectedDate,
    mode: currentMode,
    handleDateSelect,
    handleMonthChange,
    handleYearChange,
    handleModeChange,
    goToToday,
    goToPrevMonth,
    goToNextMonth,
    goToPrevYear,
    goToNextYear,
    isDateDisabled,
    isDateSelected,
    isDateToday,
    getDaysInMonth,
    getWeekDays,
  };
}
