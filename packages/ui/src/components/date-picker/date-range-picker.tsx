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
      if (startDate && !endDate) {
        return startDate.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
      }
      if (!startDate && endDate) {
        return endDate.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
      }
      if (startDate && endDate) {
      }
      return '';
    };

    // 날짜 선택 핸들러
    const handleDateSelect = (date: Date) => {
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
      return date >= startDate && date <= endDate;
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

              let cellClassName = cx('hcDatePickerDateCell', dateCellClassName);

              // 시작일 또는 종료일인 경우 포인트 색상 적용
              if (isStart || isEnd) {
                if (dateCellSelectedClassName) {
                  cellClassName = cx(cellClassName, dateCellSelectedClassName);
                }
                if (isStart && dateCellRangeStartClassName) {
                  cellClassName = cx(
                    cellClassName,
                    dateCellRangeStartClassName,
                  );
                }
                if (isEnd && dateCellRangeEndClassName) {
                  cellClassName = cx(cellClassName, dateCellRangeEndClassName);
                }
              } else if (inRange && dateCellInRangeClassName) {
                // 범위 내 날짜 (시작일/종료일 제외)는 연한 배경색 적용
                cellClassName = cx(cellClassName, dateCellInRangeClassName);
              }

              // 오늘 날짜 스타일 (시작일/종료일이 아닌 경우에만)
              if (isToday && !isStart && !isEnd && dateCellTodayClassName) {
                cellClassName = cx(cellClassName, dateCellTodayClassName);
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
            className={cx('hcDatePickerInput')}
            type="text"
            value={formatRange()}
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
