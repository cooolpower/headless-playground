'use client';

import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Icon } from '../icon/icon';
import { datePickerCss as _datePickerCss } from './date-picker.styles';

export const DateRangePickerCss = _datePickerCss;

function cx(...parts: Array<string | undefined | null | false>) {
  return parts.filter(Boolean).join(' ');
}

export interface DateRangePickerProps {
  value?: [Date | null, Date | null] | null;
  defaultValue?: [Date | null, Date | null] | null;
  onChange?: (value: [Date | null, Date | null] | null) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  injectStyles?: boolean;
  inputWrapperClassName?: string;
  calendarIconButtonClassName?: string;
  panelWrapperClassName?: string;
  calendarClassName?: string;
  calendarHeaderClassName?: string;
  navButtonClassName?: string;
  monthYearClassName?: string;
  weekHeaderClassName?: string;
  weekDayClassName?: string;
  dateGridClassName?: string;
  dateCellClassName?: string;
  dateCellTodayClassName?: string;
  dateCellSelectedClassName?: string;
  dateCellInRangeClassName?: string;
  dateCellRangeStartClassName?: string;
  dateCellRangeEndClassName?: string;
  size?: 'small' | 'medium' | 'large';
  brandColor?: string;
  minDate?: Date;
  maxDate?: Date;
}

export const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      disabled = false,
      className,
      placeholder = '날짜 범위를 선택하세요',
      injectStyles = true,
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
      dateCellInRangeClassName,
      dateCellRangeStartClassName,
      dateCellRangeEndClassName,
      size = 'medium',
      brandColor,
      minDate,
      maxDate,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState<
      [Date | null, Date | null] | null
    >(defaultValue || null);
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const [isOpen, setIsOpen] = useState(false);
    const [selectingStart, setSelectingStart] = useState(true);
    const [startDate, setStartDate] = useState<Date | null>(
      currentValue?.[0] || null,
    );
    const [endDate, setEndDate] = useState<Date | null>(
      currentValue?.[1] || null,
    );
    const [leftCalendarDate, setLeftCalendarDate] = useState<Date>(
      startDate || new Date(),
    );
    const [rightCalendarDate, setRightCalendarDate] = useState<Date>(() => {
      const date = startDate || new Date();
      return new Date(date.getFullYear(), date.getMonth() + 1, 1);
    });
    const containerRef = useRef<HTMLDivElement>(null);

    const rootClassName = cx('hcDatePicker', className);
    const resolvedInputWrapperClassName = cx(
      'hcDatePickerInputWrapper',
      inputWrapperClassName,
    );
    const resolvedIconButtonClassName = cx(
      'hcDatePickerIconButton',
      calendarIconButtonClassName,
    );
    const resolvedPanelWrapperClassName = cx(
      'hcDatePickerPanelWrapper',
      panelWrapperClassName,
    );
    const resolvedCalendarClassName = cx(
      'hcDatePickerCalendar',
      calendarClassName,
    );
    const resolvedCalendarHeaderClassName = cx(
      'hcDatePickerCalendarHeader',
      calendarHeaderClassName,
    );
    const resolvedNavButtonClassName = cx(
      'hcDatePickerNavButton',
      navButtonClassName,
    );
    const resolvedMonthYearClassName = cx(
      'hcDatePickerMonthYear',
      monthYearClassName,
    );
    const resolvedWeekHeaderClassName = cx(
      'hcDatePickerWeekHeader',
      weekHeaderClassName,
    );
    const resolvedWeekDayClassName = cx(
      'hcDatePickerWeekDay',
      weekDayClassName,
    );
    const resolvedDateGridClassName = cx(
      'hcDatePickerDateGrid',
      dateGridClassName,
    );

    // value가 변경되면 내부 상태 업데이트
    useEffect(() => {
      if (isControlled) {
        if (value) {
          setStartDate(value[0]);
          setEndDate(value[1]);
          if (value[0]) {
            setLeftCalendarDate(value[0]);
            setRightCalendarDate(
              new Date(value[0].getFullYear(), value[0].getMonth() + 1, 1),
            );
          }
        } else {
          setStartDate(null);
          setEndDate(null);
        }
      }
    }, [value, isControlled]);

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

    // 날짜 범위 포맷팅
    const formatRange = (): string => {
      if (!startDate && !endDate) return '';
      const start = startDate
        ? startDate.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
        : '';
      const end = endDate
        ? endDate.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
        : '';

      if (start && end) return `${start} ~ ${end}`;
      if (start) return `${start} ~`;
      if (end) return `~ ${end}`;
      return '';
    };

    const isDateDisabled = (date: Date) => {
      if (!date) return false;
      const d = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
      ).getTime();

      // Ensure minDate/maxDate are Date objects
      const _minDate =
        minDate instanceof Date ? minDate : minDate ? new Date(minDate) : null;
      const _maxDate =
        maxDate instanceof Date ? maxDate : maxDate ? new Date(maxDate) : null;

      if (_minDate && !isNaN(_minDate.getTime())) {
        const min = new Date(
          _minDate.getFullYear(),
          _minDate.getMonth(),
          _minDate.getDate(),
        ).getTime();
        if (d < min) return true;
      }

      if (_maxDate && !isNaN(_maxDate.getTime())) {
        const max = new Date(
          _maxDate.getFullYear(),
          _maxDate.getMonth(),
          _maxDate.getDate(),
        ).getTime();
        if (d > max) return true;
      }

      return false;
    };

    // 날짜 선택 핸들러
    const handleDateSelect = (date: Date) => {
      if (isDateDisabled(date)) return;
      if (selectingStart || !startDate) {
        // 시작일 선택
        const newStartDate = date;
        setStartDate(newStartDate);
        setSelectingStart(false);
        // 종료일이 시작일보다 이르면 초기화
        if (endDate && newStartDate > endDate) {
          setEndDate(null);
        }
        // 달력 위치 조정
        setLeftCalendarDate(newStartDate);
        setRightCalendarDate(
          new Date(newStartDate.getFullYear(), newStartDate.getMonth() + 1, 1),
        );
      } else {
        // 종료일 선택
        const newEndDate = date;
        if (newEndDate < startDate!) {
          // 종료일이 시작일보다 이르면 시작일로 변경하고 종료일 초기화
          setStartDate(newEndDate);
          setEndDate(null);
          setSelectingStart(false);
          setLeftCalendarDate(newEndDate);
          setRightCalendarDate(
            new Date(newEndDate.getFullYear(), newEndDate.getMonth() + 1, 1),
          );
        } else {
          setEndDate(newEndDate);
          const newValue: [Date | null, Date | null] = [startDate, newEndDate];
          if (!isControlled) {
            setInternalValue(newValue);
          }
          onChange?.(newValue);
          setIsOpen(false);
          setSelectingStart(true);
        }
      }
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

    // 날짜가 범위 내에 있는지 확인
    const isInRange = (date: Date): boolean => {
      if (!startDate || !endDate) return false;
      const d = new Date(date.toDateString()).getTime();
      const s = new Date(startDate.toDateString()).getTime();
      const e = new Date(endDate.toDateString()).getTime();
      return d > s && d < e;
    };

    const isRangeStart = (date: Date): boolean => {
      if (!startDate) return false;
      return date.toDateString() === startDate.toDateString();
    };

    const isRangeEnd = (date: Date): boolean => {
      if (!endDate) return false;
      return date.toDateString() === endDate.toDateString();
    };

    // 달력 렌더링 함수
    const renderCalendar = (
      calendarDate: Date,
      onPrevMonth: () => void,
      onNextMonth: () => void,
    ) => {
      const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
      const days = getDaysInMonth(
        calendarDate.getFullYear(),
        calendarDate.getMonth(),
      );

      return (
        <div className={resolvedCalendarClassName}>
          <div className={resolvedCalendarHeaderClassName}>
            <button
              type="button"
              onClick={onPrevMonth}
              aria-label="이전 달"
              className={resolvedNavButtonClassName}
            >
              <Icon icon={ChevronLeft} size="small" />
            </button>
            <span className={resolvedMonthYearClassName}>
              {calendarDate.getFullYear()}년 {calendarDate.getMonth() + 1}월
            </span>
            <button
              type="button"
              onClick={onNextMonth}
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
                date.getMonth() === calendarDate.getMonth();
              const isToday = date.toDateString() === new Date().toDateString();
              const inRange = isInRange(date);
              const isStart = isRangeStart(date);
              const isEnd = isRangeEnd(date);

              const isDisabled = isDateDisabled(date);

              const cellClassName = cx(
                'hcDatePickerDateCell',
                isToday && 'hcDatePickerDateCellToday',
                (isStart || isEnd) && 'hcDatePickerDateCellSelected',
                inRange && 'hcDatePickerDateCellInRange',
                isStart && 'hcDatePickerDateCellRangeStart',
                isEnd && 'hcDatePickerDateCellRangeEnd',
                (!isCurrentMonth || isDisabled) &&
                  'hcDatePickerDateCellDisabled',
                dateCellClassName,
                isToday && dateCellTodayClassName,
                (isStart || isEnd) && dateCellSelectedClassName,
                inRange && dateCellInRangeClassName,
                isStart && dateCellRangeStartClassName,
                isEnd && dateCellRangeEndClassName,
              );

              return (
                <button
                  type="button"
                  key={index}
                  onClick={() => handleDateSelect(date)}
                  disabled={!isCurrentMonth || isDisabled}
                  className={cellClassName}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      );
    };

    // 이전/다음 달 이동
    const goToLeftPrevMonth = () => {
      const newDate = new Date(
        leftCalendarDate.getFullYear(),
        leftCalendarDate.getMonth() - 1,
        1,
      );
      setLeftCalendarDate(newDate);
      // 오른쪽 달력도 함께 이동
      setRightCalendarDate(
        new Date(newDate.getFullYear(), newDate.getMonth() + 1, 1),
      );
    };

    const goToLeftNextMonth = () => {
      const newDate = new Date(
        leftCalendarDate.getFullYear(),
        leftCalendarDate.getMonth() + 1,
        1,
      );
      setLeftCalendarDate(newDate);
      // 오른쪽 달력도 함께 이동
      setRightCalendarDate(
        new Date(newDate.getFullYear(), newDate.getMonth() + 1, 1),
      );
    };

    const goToRightPrevMonth = () => {
      const newDate = new Date(
        rightCalendarDate.getFullYear(),
        rightCalendarDate.getMonth() - 1,
        1,
      );
      setRightCalendarDate(newDate);
      // 왼쪽 달력도 함께 이동
      setLeftCalendarDate(
        new Date(newDate.getFullYear(), newDate.getMonth() - 1, 1),
      );
    };

    const goToRightNextMonth = () => {
      const newDate = new Date(
        rightCalendarDate.getFullYear(),
        rightCalendarDate.getMonth() + 1,
        1,
      );
      setRightCalendarDate(newDate);
      // 왼쪽 달력도 함께 이동
      setLeftCalendarDate(
        new Date(newDate.getFullYear(), newDate.getMonth() - 1, 1),
      );
    };

    const brandStyles = brandColor
      ? ({ '--hc-date-picker-brand': brandColor } as React.CSSProperties)
      : undefined;

    return (
      <div
        ref={containerRef}
        className={rootClassName}
        data-size={size}
        style={brandStyles}
        {...props}
      >
        {injectStyles && (
          <style suppressHydrationWarning>{_datePickerCss}</style>
        )}

        <div
          className={resolvedInputWrapperClassName}
          data-disabled={disabled ? 'true' : undefined}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <input
            className={cx('hcDatePickerInput')}
            type="text"
            value={formatRange()}
            placeholder={placeholder}
            readOnly
            disabled={disabled}
          />
          <button
            type="button"
            disabled={disabled}
            aria-label="달력 열기"
            className={resolvedIconButtonClassName}
          >
            <Icon icon={Calendar} size="small" />
          </button>
        </div>

        {isOpen && !disabled && (
          <div className={resolvedPanelWrapperClassName}>
            <div className={cx('hcDatePickerRangePanel')}>
              {renderCalendar(
                leftCalendarDate,
                goToLeftPrevMonth,
                goToLeftNextMonth,
              )}
              {renderCalendar(
                rightCalendarDate,
                goToRightPrevMonth,
                goToRightNextMonth,
              )}
            </div>
          </div>
        )}
      </div>
    );
  },
);

DateRangePicker.displayName = 'DateRangePicker';
