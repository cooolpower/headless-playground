'use client';

import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Icon } from '../icon/icon';
import { datepickerProps } from './type-date-picker';
import { usedatepicker } from './use-date-picker';
import { datePickerCss as _datePickerCss } from './date-picker.styles';

export const DatePickerCss = _datePickerCss;

function cx(...parts: Array<string | undefined | null | false>) {
  return parts.filter(Boolean).join(' ');
}

export const DatePicker = forwardRef<HTMLDivElement, datepickerProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      disabled = false,
      className,
      placeholder = '날짜를 선택하세요',
      inputWrapperClassName,
      calendarIconButtonClassName,
      panelWrapperClassName,
      calendarClassName,
      calendarHeaderClassName,
      navButtonClassName,
      monthYearClassName,
      weekHeaderClassName,
      weekDayClassName,
      dateGridClassName,
      dateCellClassName,
      dateCellTodayClassName,
      dateCellSelectedClassName,
      injectStyles = true,
      ...props
    },
    ref,
  ) => {
    const { currentValue, handleChange } = usedatepicker({
      value,
      defaultValue,
      onChange,
      disabled,
    });

    const [isOpen, setIsOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState<Date>(
      currentValue instanceof Date ? currentValue : new Date(),
    );
    const containerRef = useRef<HTMLDivElement>(null);

    // currentValue가 변경되면 currentDate도 업데이트
    useEffect(() => {
      if (currentValue instanceof Date) {
        setCurrentDate(currentValue);
      }
    }, [currentValue]);

    // 외부 클릭 시 닫기
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
          document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen]);

    // 날짜 포맷팅
    const formatDate = (date: Date | null): string => {
      if (!date) return '';
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    };

    // 달력 날짜 선택
    const handleDateSelect = (date: Date) => {
      handleChange(date);
      setIsOpen(false);
    };

    // 이전/다음 달 이동
    const goToPrevMonth = () => {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
      );
    };

    const goToNextMonth = () => {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
      );
    };

    // 달력 날짜 생성
    const getDaysInMonth = (year: number, month: number): Date[] => {
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();

      const days: Date[] = [];

      // 이전 달의 마지막 날들
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const prevMonthLastDay = new Date(prevYear, prevMonth + 1, 0).getDate();

      for (let i = startingDayOfWeek - 1; i >= 0; i--) {
        days.push(new Date(prevYear, prevMonth, prevMonthLastDay - i));
      }

      // 현재 달의 날들
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(year, month, i));
      }

      // 다음 달의 첫 날들 (42개 셀 채우기)
      const remainingDays = 42 - days.length;
      for (let i = 1; i <= remainingDays; i++) {
        days.push(new Date(year, month + 1, i));
      }

      return days;
    };

    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    const days = getDaysInMonth(
      currentDate.getFullYear(),
      currentDate.getMonth(),
    );

    const rootClassName = injectStyles
      ? cx('hcDatePicker', className)
      : className;

    const resolvedInputWrapperClassName = injectStyles
      ? cx('hcDatePickerInputWrapper', inputWrapperClassName)
      : inputWrapperClassName;

    const resolvedIconButtonClassName = injectStyles
      ? cx('hcDatePickerIconButton', calendarIconButtonClassName)
      : calendarIconButtonClassName;

    const resolvedPanelWrapperClassName = injectStyles
      ? cx('hcDatePickerPanelWrapper', panelWrapperClassName)
      : panelWrapperClassName;

    const resolvedCalendarClassName = injectStyles
      ? cx('hcDatePickerCalendar', calendarClassName)
      : calendarClassName;

    const resolvedCalendarHeaderClassName = injectStyles
      ? cx('hcDatePickerCalendarHeader', calendarHeaderClassName)
      : calendarHeaderClassName;

    const resolvedNavButtonClassName = injectStyles
      ? cx('hcDatePickerNavButton', navButtonClassName)
      : navButtonClassName;

    const resolvedMonthYearClassName = injectStyles
      ? cx('hcDatePickerMonthYear', monthYearClassName)
      : monthYearClassName;

    const resolvedWeekHeaderClassName = injectStyles
      ? cx('hcDatePickerWeekHeader', weekHeaderClassName)
      : weekHeaderClassName;

    const resolvedWeekDayClassName = injectStyles
      ? cx('hcDatePickerWeekDay', weekDayClassName)
      : weekDayClassName;

    const resolvedDateGridClassName = injectStyles
      ? cx('hcDatePickerDateGrid', dateGridClassName)
      : dateGridClassName;

    return (
      <div ref={containerRef} className={rootClassName} {...props}>
        {injectStyles && (
          <style suppressHydrationWarning>{_datePickerCss}</style>
        )}
        <div
          className={resolvedInputWrapperClassName}
          data-disabled={disabled ? 'true' : undefined}
        >
          <input
            className={injectStyles ? cx('hcDatePickerInput') : undefined}
            type="text"
            value={formatDate(currentValue)}
            placeholder={placeholder}
            readOnly
            disabled={disabled}
            onClick={() => !disabled && setIsOpen(!isOpen)}
          />
          <button
            type="button"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            aria-label="달력 열기"
            className={resolvedIconButtonClassName}
          >
            <Icon icon={Calendar} size="small" />
          </button>
        </div>

        {isOpen && !disabled && (
          <div className={resolvedPanelWrapperClassName}>
            <div className={resolvedCalendarClassName}>
              <div className={resolvedCalendarHeaderClassName}>
                <button
                  type="button"
                  onClick={goToPrevMonth}
                  aria-label="이전 달"
                  className={resolvedNavButtonClassName}
                >
                  <Icon icon={ChevronLeft} size="small" />
                </button>
                <span className={resolvedMonthYearClassName}>
                  {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
                </span>
                <button
                  type="button"
                  onClick={goToNextMonth}
                  aria-label="다음 달"
                  className={resolvedNavButtonClassName}
                >
                  <Icon icon={ChevronRight} size="small" />
                </button>
              </div>

              <div className={resolvedWeekHeaderClassName}>
                {weekDays.map((day) => (
                  <div key={day} className={resolvedWeekDayClassName}>
                    {day}
                  </div>
                ))}
              </div>

              <div className={resolvedDateGridClassName}>
                {days.map((date, index) => {
                  const isCurrentMonth =
                    date.getMonth() === currentDate.getMonth();
                  const isSelected =
                    currentValue &&
                    date.toDateString() === currentValue.toDateString();
                  const isToday =
                    date.toDateString() === new Date().toDateString();

                  let cellClassName = injectStyles
                    ? 'hcDatePickerDateCell'
                    : dateCellClassName;

                  if (injectStyles && dateCellClassName) {
                    cellClassName = `${cellClassName} ${dateCellClassName}`.trim();
                  }

                  if (isToday && dateCellTodayClassName) {
                    cellClassName =
                      `${cellClassName || ''} ${dateCellTodayClassName}`.trim();
                  }
                  if (isSelected && dateCellSelectedClassName) {
                    cellClassName =
                      `${cellClassName || ''} ${dateCellSelectedClassName}`.trim();
                  }

                  return (
                    <button
                      type="button"
                      key={index}
                      onClick={() => handleDateSelect(date)}
                      disabled={!isCurrentMonth}
                      className={cellClassName}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
);

DatePicker.displayName = 'DatePicker';
