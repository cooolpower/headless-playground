'use client';

import React, { forwardRef } from 'react';
import { CalendarProps } from './type-calendar';
import { useCalendar } from './use-calendar';
import { calendarCss as _calendarCss } from './calendar.styles';

export const CalendarCss = _calendarCss;

const MONTH_NAMES = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      onSelect,
      onPanelChange,
      mode = 'month',
      disabledDate,
      dateFullCellRender,
      dateCellRender,
      monthCellRender,
      headerRender,
      fullscreen = true,
      className,
      children,
      injectStyles = true,
      ...props
    },
    ref
  ) => {
    const {
      currentDate,
      selectedDate,
      handleDateSelect,
      handleMonthChange,
      handleYearChange,
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
    } = useCalendar({
      value,
      defaultValue,
      onChange,
      onSelect,
      onPanelChange,
      mode,
      disabledDate,
    });

    // 기본 헤더 렌더링
    const renderDefaultHeader = () => (
      <div className="hcCalendarHeader">
        <div className="hcCalendarNav">
          <button
            type="button"
            className="hcCalendarNavButton"
            onClick={goToPrevYear}
            aria-label="이전 년도"
          >
            ‹‹
          </button>
          <button
            type="button"
            className="hcCalendarNavButton"
            onClick={goToPrevMonth}
            aria-label="이전 달"
          >
            ‹
          </button>
        </div>

        <div className="hcCalendarHeaderLabel">
          <span>
            {currentDate.getFullYear()}년 {MONTH_NAMES[currentDate.getMonth()]}
          </span>
        </div>

        <div className="hcCalendarNav">
          <button
            type="button"
            className="hcCalendarNavButton"
            onClick={goToNextMonth}
            aria-label="다음 달"
          >
            ›
          </button>
          <button
            type="button"
            className="hcCalendarNavButton"
            onClick={goToNextYear}
            aria-label="다음 년도"
          >
            ››
          </button>
        </div>
      </div>
    );

    // 날짜 셀 렌더링
    const renderDateCell = (date: Date, index: number) => {
      const isCurrentMonth = date.getMonth() === currentDate.getMonth();
      const isSelected = isDateSelected(date);
      const isToday = isDateToday(date);
      const isDisabled = isDateDisabled(date);

      const cellContent = dateCellRender?.(date) || date.getDate();

      return (
        <div
          key={index}
          className="hcCalendarCell"
          data-current-month={isCurrentMonth ? 'true' : 'false'}
          data-selected={isSelected ? 'true' : 'false'}
          data-today={isToday ? 'true' : 'false'}
          data-disabled={isDisabled ? 'true' : 'false'}
          aria-label={`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`}
          aria-selected={isSelected}
        >
          <button
            type="button"
            className="hcCalendarCellButton"
            onClick={() => !isDisabled && handleDateSelect(date)}
            disabled={isDisabled}
          >
            {dateFullCellRender ? dateFullCellRender(date) : cellContent}
          </button>
        </div>
      );
    };

    // 월별 보기 렌더링
    const renderMonthView = () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const days = getDaysInMonth(year, month);
      const weekDays = getWeekDays();

      return (
        <div className="hcCalendarBody">
          {/* 요일 헤더 */}
          <div className="hcCalendarWeekdays">
            {weekDays.map((day, index) => (
              <div key={day} className="hcCalendarWeekday">
                {day}
              </div>
            ))}
          </div>

          {/* 날짜 그리드 */}
          <div className="hcCalendarGrid">
            {days.map((date, index) => renderDateCell(date, index))}
          </div>
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={['hcCalendar', className].filter(Boolean).join(' ')}
        data-mode={mode}
        data-fullscreen={fullscreen ? 'true' : 'false'}
        {...props}
      >
        {injectStyles && <style suppressHydrationWarning>{_calendarCss}</style>}
        {children || (
          <>
            {headerRender
              ? headerRender({
                  value: currentDate,
                  type: mode,
                  onChange: (date) => {
                    handleMonthChange(date.getMonth());
                    handleYearChange(date.getFullYear());
                  },
                  onTypeChange: () => {}, // 간단한 구현을 위해 빈 함수
                })
              : renderDefaultHeader()}

            <div>{mode === 'month' && renderMonthView()}</div>
          </>
        )}
      </div>
    );
  }
);

Calendar.displayName = 'Calendar';

export { Calendar };
