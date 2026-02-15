'use client';

import React, { useState, createContext, useContext } from 'react';
import { Calendar } from '@repo/ui';
import { Select } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import type { SelectOption } from '@repo/ui';
import * as styles from './calendar.demo.css';

// Calendar Controls Context
interface CalendarControlsContextType {
  fullscreen: boolean;
  setFullscreen: (fullscreen: boolean) => void;
  mode: 'month' | 'year';
  setMode: (mode: 'month' | 'year') => void;
  injectStyles: boolean;
  setInjectStyles: (value: boolean) => void;
}

const CalendarControlsContext =
  createContext<CalendarControlsContextType | null>(null);

// Provider
export function DemoCalendarBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fullscreen, setFullscreen] = useState(true);
  const [mode, setMode] = useState<'month' | 'year'>('month');
  const [injectStyles, setInjectStyles] = useState(true);

  return (
    <CalendarControlsContext.Provider
      value={{
        fullscreen,
        setFullscreen,
        mode,
        setMode,
        injectStyles,
        setInjectStyles,
      }}
    >
      {children}
    </CalendarControlsContext.Provider>
  );
}

// 기본 Calendar (컨트롤러와 함께 사용될 컴포넌트)
export function DemoCalendarBasicWithControls() {
  const context = useContext(CalendarControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { fullscreen, mode, injectStyles } = context;
  const [date, setDate] = useState(new Date());

  return (
    <div
      className={!injectStyles ? styles.calendarWrapperClass : ''}
      style={{ padding: '2rem' }}
    >
      <Calendar
        value={date}
        onChange={setDate}
        fullscreen={fullscreen}
        mode={mode}
        injectStyles={injectStyles}
      />
      <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>
        선택된 날짜: {date.toLocaleDateString('ko-KR')}
      </p>
    </div>
  );
}

// Calendar Controls
export function DemoCalendarBasicControls() {
  const context = useContext(CalendarControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    fullscreen,
    setFullscreen,
    mode,
    setMode,
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
          label: '전체 화면 (Fullscreen)',
          control: (
            <Checkbox
              checked={fullscreen}
              onChange={(checked) => setFullscreen(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '모드 (Mode)',
          control: (
            <Select
              options={[
                { label: 'Month', value: 'month' },
                { label: 'Year', value: 'year' },
              ]}
              value={mode}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  setMode(val as typeof mode);
                }
              }}
              placeholder="모드 선택"
              size="small"
            />
          ),
        },
      ]}
    />
  );
}

export function DemoCalendarBasic() {
  const [date, setDate] = useState(new Date());

  return (
    <div style={{ padding: '2rem' }}>
      <Calendar value={date} onChange={setDate} />
      <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>
        선택된 날짜: {date.toLocaleDateString('ko-KR')}
      </p>
    </div>
  );
}

export function DemoCalendarDisabledDates() {
  const [date, setDate] = useState(new Date());

  return (
    <div style={{ padding: '2rem' }}>
      <Calendar
        value={date}
        onChange={setDate}
        disabledDate={(date) => {
          // 주말 비활성화
          const day = date.getDay();
          return day === 0 || day === 6;
        }}
      />
      <p
        style={{
          marginTop: '1rem',
          color: 'oklch(51.0% 0.000 0)',
          fontSize: '14px',
        }}
      >
        주말은 선택할 수 없습니다.
      </p>
    </div>
  );
}

export function DemoCalendarCustomCell() {
  const [date, setDate] = useState(new Date());

  return (
    <div style={{ padding: '2rem' }}>
      <Calendar
        value={date}
        onChange={setDate}
        dateCellRender={(date) => {
          // 15일과 25일에 표시
          if (date.getDate() === 15 || date.getDate() === 25) {
            return (
              <span
                style={{
                  color: 'var(--color-semantic-error)',
                  fontSize: '10px',
                }}
              >
                ●
              </span>
            );
          }
          return null;
        }}
      />
      <p
        style={{
          marginTop: '1rem',
          color: 'oklch(51.0% 0.000 0)',
          fontSize: '14px',
        }}
      >
        빨간 점이 있는 날짜는 특별한 날입니다.
      </p>
    </div>
  );
}
