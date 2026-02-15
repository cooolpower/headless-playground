'use client';

import React, { useState, createContext, useContext } from 'react';
import { DatePicker } from '@repo/ui';
import { DateRangePicker } from '@repo/ui';
import { Input } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import * as styles from './date-picker.demo.css';

// DatePicker Controls Context
interface DatePickerControlsContextType {
  value: Date | null;
  setValue: (value: Date | null) => void;
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
  placeholder: string;
  setPlaceholder: (placeholder: string) => void;
  injectStyles: boolean;
  setInjectStyles: (value: boolean) => void;
}

const DatePickerControlsContext =
  createContext<DatePickerControlsContextType | null>(null);

// Provider
export function DemoDatePickerBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [value, setValue] = useState<Date | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [placeholder, setPlaceholder] = useState('날짜를 선택하세요');
  const [injectStyles, setInjectStyles] = useState(true);

  return (
    <DatePickerControlsContext.Provider
      value={{
        value,
        setValue,
        disabled,
        setDisabled,
        placeholder,
        setPlaceholder,
        injectStyles,
        setInjectStyles,
      }}
    >
      {children}
    </DatePickerControlsContext.Provider>
  );
}

// 기본 DatePicker (컨트롤러와 함께 사용될 컴포넌트)
export function DemoDatePickerBasicWithControls() {
  const context = useContext(DatePickerControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { value, setValue, disabled, placeholder, injectStyles } = context;

  return (
    <div className={styles.container}>
      <DatePicker
        value={value}
        onChange={setValue}
        disabled={disabled}
        placeholder={placeholder}
        injectStyles={injectStyles}
        className={injectStyles ? undefined : styles.datepicker}
        inputWrapperClassName={injectStyles ? undefined : styles.inputWrapper}
        calendarIconButtonClassName={
          injectStyles ? undefined : styles.calendarIconButton
        }
        panelWrapperClassName={injectStyles ? undefined : styles.panelWrapper}
        calendarClassName={injectStyles ? undefined : styles.calendar}
        dateCellClassName={injectStyles ? undefined : styles.dateCell}
        dateCellTodayClassName={injectStyles ? undefined : styles.dateCellToday}
        dateCellSelectedClassName={
          injectStyles ? undefined : styles.dateCellSelected
        }
      />
      <div className={styles.rangeInfo}>
        <div className={styles.rangeValue}>
          선택된 날짜: {value ? value.toLocaleDateString('ko-KR') : '없음'}
        </div>
      </div>
    </div>
  );
}

// DatePicker Controls
export function DemoDatePickerBasicControls() {
  const context = useContext(DatePickerControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    value,
    setValue,
    disabled,
    setDisabled,
    placeholder,
    setPlaceholder,
    injectStyles,
    setInjectStyles,
  } = context;

  return (
    <Controls
      items={[
        {
          label: 'Inject Styles',
          control: (
            <Checkbox
              checked={injectStyles}
              onChange={setInjectStyles}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '선택된 날짜 (Value)',
          control: (
            <Input
              type="date"
              value={value ? value.toISOString().split('T')[0] : ''}
              onChange={(val) => setValue(val ? new Date(val) : null)}
              placeholder="날짜 선택"
              size="small"
            />
          ),
        },
        {
          label: '비활성화 (Disabled)',
          control: (
            <Checkbox
              checked={disabled}
              onChange={(checked) => setDisabled(checked)}
              size="small"
            >
              비활성화
            </Checkbox>
          ),
        },
        {
          label: 'Placeholder',
          control: (
            <Input
              type="text"
              value={placeholder}
              onChange={setPlaceholder}
              placeholder="Placeholder 텍스트"
              size="small"
            />
          ),
        },
      ]}
    />
  );
}

// 기존 예제들 (props 조합으로만 차별화)
export function DemoDatePickerBasic() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div className={styles.container}>
      <DatePicker
        value={date}
        onChange={setDate}
        placeholder="날짜를 선택하세요"
        className={styles.datepicker}
        inputWrapperClassName={styles.inputWrapper}
        calendarIconButtonClassName={styles.calendarIconButton}
        panelWrapperClassName={styles.panelWrapper}
        calendarClassName={styles.calendar}
        calendarHeaderClassName={undefined}
        navButtonClassName={undefined}
        monthYearClassName={undefined}
        weekHeaderClassName={undefined}
        weekDayClassName={styles.weekDay}
        dateGridClassName={undefined}
        dateCellClassName={styles.dateCell}
        dateCellTodayClassName={styles.dateCellToday}
        dateCellSelectedClassName={styles.dateCellSelected}
      />
      <div className={styles.rangeInfo}>
        <div className={styles.rangeValue}>
          선택된 날짜: {date ? date.toLocaleDateString('ko-KR') : '없음'}
        </div>
      </div>
    </div>
  );
}

export function DemoDatePickerDefaultValue() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <div className={styles.container}>
      <DatePicker
        value={date}
        onChange={setDate}
        className={styles.datepicker}
        inputWrapperClassName={styles.inputWrapper}
        calendarIconButtonClassName={styles.calendarIconButton}
        panelWrapperClassName={styles.panelWrapper}
        calendarClassName={styles.calendar}
        dateCellTodayClassName={styles.dateCellToday}
        dateCellSelectedClassName={styles.dateCellSelected}
        dateCellClassName={styles.dateCell}
      />
      <div className={styles.rangeInfo}>
        <div className={styles.rangeValue}>
          선택된 날짜: {date ? date.toLocaleDateString('ko-KR') : '없음'}
        </div>
      </div>
    </div>
  );
}

export function DemoDatePickerDisabled() {
  return (
    <div className={styles.container}>
      <DatePicker
        value={new Date()}
        disabled
        className={styles.datepicker}
        inputWrapperClassName={styles.inputWrapper}
        calendarIconButtonClassName={styles.calendarIconButton}
        panelWrapperClassName={styles.panelWrapper}
        calendarClassName={styles.calendar}
        dateCellTodayClassName={styles.dateCellToday}
        dateCellSelectedClassName={styles.dateCellSelected}
      />
    </div>
  );
}

export function DemoDatePickerRange() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const formatRange = () => {
    if (!startDate && !endDate) return '없음';
    if (startDate && !endDate) {
      return `${startDate.toLocaleDateString('ko-KR')} ~`;
    }
    if (!startDate && endDate) {
      return `~ ${endDate.toLocaleDateString('ko-KR')}`;
    }
    if (startDate && endDate) {
      return `${startDate.toLocaleDateString('ko-KR')} ~ ${endDate.toLocaleDateString('ko-KR')}`;
    }
    return '없음';
  };

  const getDaysDifference = () => {
    if (!startDate || !endDate) return null;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysDiff = getDaysDifference();

  return (
    <div className={styles.container}>
      <div className={styles.rangePickerWrapper}>
        <div className={styles.rangePickerItem}>
          <label className={styles.rangeLabel}>시작일</label>
          <DatePicker
            value={startDate}
            onChange={(date) => {
              setStartDate(date);
              if (date && endDate && date > endDate) {
                setEndDate(null);
              }
            }}
            placeholder="시작일 선택"
            className={styles.datepicker}
            inputWrapperClassName={styles.inputWrapper}
            calendarIconButtonClassName={styles.calendarIconButton}
            panelWrapperClassName={styles.panelWrapper}
            calendarClassName={styles.calendar}
            dateCellTodayClassName={styles.dateCellToday}
            dateCellSelectedClassName={styles.dateCellSelected}
            dateCellClassName={styles.dateCell}
          />
        </div>
        <div className={styles.rangeSeparator}>~</div>
        <div className={styles.rangePickerItem}>
          <label className={styles.rangeLabel}>종료일</label>
          <DatePicker
            value={endDate}
            onChange={(date) => {
              setEndDate(date);
              if (date && startDate && date < startDate) {
                setStartDate(null);
              }
            }}
            placeholder="종료일 선택"
            className={styles.datepicker}
            inputWrapperClassName={styles.inputWrapper}
            calendarIconButtonClassName={styles.calendarIconButton}
            panelWrapperClassName={styles.panelWrapper}
            calendarClassName={styles.calendar}
            dateCellTodayClassName={styles.dateCellToday}
            dateCellSelectedClassName={styles.dateCellSelected}
            dateCellClassName={styles.dateCell}
          />
        </div>
      </div>
      <div className={styles.rangeInfo}>
        <div className={styles.rangeValue}>선택된 기간: {formatRange()}</div>
        {daysDiff !== null && (
          <div className={styles.rangeDays}>기간: {daysDiff}일</div>
        )}
      </div>
    </div>
  );
}

export function DemoDateRangePickerSingle() {
  const [range, setRange] = useState<[Date | null, Date | null] | null>(null);

  const formatRange = () => {
    if (!range || !range[0] || !range[1]) return '';
    return `${range[0].toLocaleDateString('ko-KR')} ~ ${range[1].toLocaleDateString('ko-KR')}`;
  };

  const getDaysDifference = () => {
    if (!range || !range[0] || !range[1]) return null;
    const diffTime = Math.abs(range[1].getTime() - range[0].getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysDiff = getDaysDifference();

  return (
    <div className={styles.container}>
      <DateRangePicker
        value={range}
        onChange={setRange}
        placeholder="날짜 범위를 선택하세요"
        className={styles.datepicker}
        inputWrapperClassName={styles.inputWrapper}
        calendarIconButtonClassName={styles.calendarIconButton}
        panelWrapperClassName={styles.rangePanelWrapper}
        calendarClassName={styles.calendar}
        dateCellTodayClassName={styles.dateCellToday}
        dateCellSelectedClassName={styles.dateCellSelected}
        dateCellInRangeClassName={styles.dateCellInRange}
        dateCellRangeStartClassName={styles.dateCellRangeStart}
        dateCellRangeEndClassName={styles.dateCellRangeEnd}
        dateCellClassName={styles.dateCell}
      />
      <div className={styles.rangeInfo}>
        <div className={styles.rangeValue}>
          선택된 기간: {formatRange() || '없음'}
        </div>
        {daysDiff !== null && (
          <div className={styles.rangeDays}>기간: {daysDiff}일</div>
        )}
      </div>
    </div>
  );
}
