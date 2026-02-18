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
  rangeValue: [Date | null, Date | null] | null;
  setRangeValue: (value: [Date | null, Date | null] | null) => void;
  type: 'single' | 'range';
  setType: (type: 'single' | 'range') => void;
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
  placeholder: string;
  setPlaceholder: (placeholder: string) => void;
  size: 'small' | 'medium' | 'large';
  setSize: (size: 'small' | 'medium' | 'large') => void;
  brandColor: string;
  setBrandColor: (color: string) => void;
  injectStyles: boolean;
  setInjectStyles: (value: boolean) => void;
  minDate: Date | null;
  setMinDate: (date: Date | null) => void;
  maxDate: Date | null;
  setMaxDate: (date: Date | null) => void;
}

const DatePickerControlsContext =
  createContext<DatePickerControlsContextType | null>(null);

const STORAGE_KEY = 'headless-date-picker-demo-state';

// Provider
export function DemoDatePickerBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [value, setValue] = useState<Date | null>(null);
  const [rangeValue, setRangeValue] = useState<
    [Date | null, Date | null] | null
  >(null);
  const [type, setType] = useState<'single' | 'range'>('single');
  const [disabled, setDisabled] = useState(false);
  const [placeholder, setPlaceholder] = useState('날짜를 선택하세요');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [brandColor, setBrandColor] = useState('#eab308'); // Default yellow
  const [injectStyles, setInjectStyles] = useState(true);
  const [minDate, setMinDate] = useState<Date | null>(null);
  const [maxDate, setMaxDate] = useState<Date | null>(null);

  // Load from LocalStorage
  React.useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setDisabled(parsed.disabled ?? false);
        setPlaceholder(parsed.placeholder ?? '날짜를 선택하세요');
        setSize(parsed.size ?? 'medium');
        setBrandColor(parsed.brandColor ?? '#eab308');
        setInjectStyles(parsed.injectStyles ?? true);
        setType(parsed.type ?? 'single');
        setMinDate(parsed.minDate ? new Date(parsed.minDate) : null);
        setMaxDate(parsed.maxDate ? new Date(parsed.maxDate) : null);
      } catch (e) {
        console.error('Failed to parse saved state', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage
  React.useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          disabled,
          placeholder,
          size,
          brandColor,
          injectStyles,
          type,
          minDate: minDate ? minDate.toISOString() : null,
          maxDate: maxDate ? maxDate.toISOString() : null,
        }),
      );
    }
  }, [
    disabled,
    placeholder,
    size,
    brandColor,
    injectStyles,
    type,
    isLoaded,
    minDate,
    maxDate,
  ]);

  return (
    <DatePickerControlsContext.Provider
      value={{
        value,
        setValue,
        rangeValue,
        setRangeValue,
        type,
        setType,
        disabled,
        setDisabled,
        placeholder,
        setPlaceholder,
        size,
        setSize,
        brandColor,
        setBrandColor,
        injectStyles,
        setInjectStyles,
        minDate,
        setMinDate,
        maxDate,
        setMaxDate,
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

  const {
    value,
    setValue,
    rangeValue,
    setRangeValue,
    type,
    disabled,
    placeholder,
    size,
    brandColor,
    injectStyles,
    minDate,
    maxDate,
  } = context;

  const commonProps = {
    disabled,
    placeholder:
      type === 'range' ? '날짜 범위를 선택하세요' : '날짜를 선택하세요',
    size,
    brandColor,
    injectStyles,
    minDate: minDate || undefined,
    maxDate: maxDate || undefined,
    className: injectStyles ? undefined : styles.datepicker,
    inputWrapperClassName: injectStyles ? undefined : styles.inputWrapper,
    calendarIconButtonClassName: injectStyles
      ? undefined
      : styles.calendarIconButton,
    panelWrapperClassName: injectStyles ? undefined : styles.panelWrapper,
    calendarClassName: injectStyles ? undefined : styles.calendar,
    dateCellClassName: injectStyles ? undefined : styles.dateCell,
    dateCellTodayClassName: injectStyles ? undefined : styles.dateCellToday,
    dateCellSelectedClassName: injectStyles
      ? undefined
      : styles.dateCellSelected,
  };

  return (
    <div className={styles.container}>
      {type === 'single' ? (
        <DatePicker value={value} onChange={setValue} {...commonProps} />
      ) : (
        <DateRangePicker
          value={rangeValue}
          onChange={setRangeValue}
          {...(commonProps as any)}
          dateCellInRangeClassName={
            injectStyles ? undefined : styles.dateCellInRange
          }
          dateCellRangeStartClassName={
            injectStyles ? undefined : styles.dateCellRangeStart
          }
          dateCellRangeEndClassName={
            injectStyles ? undefined : styles.dateCellRangeEnd
          }
        />
      )}
      <div className={styles.rangeInfo}>
        <div className={styles.rangeValue}>
          {type === 'single' ? (
            <>
              선택된 날짜: {value ? value.toLocaleDateString('ko-KR') : '없음'}
            </>
          ) : (
            <>
              선택된 기간:{' '}
              {rangeValue?.[0] && rangeValue?.[1]
                ? `${rangeValue[0].toLocaleDateString('ko-KR')} ~ ${rangeValue[1].toLocaleDateString('ko-KR')}`
                : '없음'}
            </>
          )}
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
    type,
    setType,
    disabled,
    setDisabled,
    placeholder,
    setPlaceholder,
    size,
    setSize,
    brandColor,
    setBrandColor,
    injectStyles,
    setInjectStyles,
    minDate,
    setMinDate,
    maxDate,
    setMaxDate,
  } = context;

  return (
    <Controls
      items={[
        {
          label: 'Type (타입)',
          control: (
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['single', 'range'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  style={{
                    padding: '4px 8px',
                    fontSize: '12px',
                    borderRadius: '4px',
                    border: '1px solid var(--color-divider)',
                    background:
                      type === t ? 'var(--color-brand-primary)' : 'transparent',
                    color: type === t ? 'white' : 'inherit',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          ),
        },
        {
          label: '크기 (Size)',
          control: (
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['small', 'medium', 'large'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  style={{
                    padding: '4px 8px',
                    fontSize: '12px',
                    borderRadius: '4px',
                    border: '1px solid var(--color-divider)',
                    background:
                      size === s ? 'var(--color-brand-primary)' : 'transparent',
                    color: size === s ? 'white' : 'inherit',
                    cursor: 'pointer',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          ),
        },
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
          label: '포인트 컬러 (Brand)',
          control: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="color"
                value={brandColor}
                onChange={(e) => setBrandColor(e.target.value)}
                style={{
                  width: '32px',
                  height: '32px',
                  padding: '0',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              />
              <span style={{ fontSize: '12px', opacity: 0.7 }}>
                {brandColor.toUpperCase()}
              </span>
            </div>
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
          label: '선택 제한 (Range Limit)',
          control: (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { label: '제한 없음', min: null, max: null },
                  {
                    label: '오늘부터 가능',
                    min: new Date(),
                    max: null,
                  },
                  {
                    label: '최대 3개월',
                    min: null,
                    max: new Date(
                      new Date().setMonth(new Date().getMonth() + 3),
                    ),
                  },
                ].map((p, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setMinDate(p.min);
                      setMaxDate(p.max);
                    }}
                    style={{
                      padding: '4px 8px',
                      fontSize: '11px',
                      borderRadius: '4px',
                      border: '1px solid var(--color-divider)',
                      background: 'transparent',
                      cursor: 'pointer',
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '4px', fontSize: '11px' }}>
                <div style={{ flex: 1 }}>
                  <span>Min:</span>
                  <input
                    type="date"
                    value={minDate ? minDate.toISOString().split('T')[0] : ''}
                    onChange={(e) =>
                      setMinDate(
                        e.target.value ? new Date(e.target.value) : null,
                      )
                    }
                    style={{ width: '100%', padding: '2px' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <span>Max:</span>
                  <input
                    type="date"
                    value={maxDate ? maxDate.toISOString().split('T')[0] : ''}
                    onChange={(e) =>
                      setMaxDate(
                        e.target.value ? new Date(e.target.value) : null,
                      )
                    }
                    style={{ width: '100%', padding: '2px' }}
                  />
                </div>
              </div>
            </div>
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
