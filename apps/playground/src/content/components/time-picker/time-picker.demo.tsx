'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { TimePicker } from '@repo/ui';
import { Input } from '@repo/ui';
import { Select } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import type { SelectOption } from '@repo/ui';
import * as styles from './time-picker.demo.css';

// TimePicker Controls Context
interface TimePickerControlsContextType {
  value: Date | undefined;
  setValue: (value: Date | undefined) => void;
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
  placeholder: string;
  setPlaceholder: (placeholder: string) => void;
  format: string;
  setFormat: (format: string) => void;
  use12Hours: boolean;
  setUse12Hours: (use12Hours: boolean) => void;
  allowClear: boolean;
  setAllowClear: (allowClear: boolean) => void;
  size: 'small' | 'medium' | 'large';
  setSize: (size: 'small' | 'medium' | 'large') => void;
  injectStyles: boolean;
  setInjectStyles: (value: boolean) => void;
}

const TimePickerControlsContext =
  createContext<TimePickerControlsContextType | null>(null);

// Provider
export function DemoTimePickerBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [value, setValue] = useState<Date | undefined>(undefined);
  const [disabled, setDisabled] = useState(false);
  const [placeholder, setPlaceholder] = useState('시간을 선택하세요');
  const [format, setFormat] = useState('HH:mm:ss');
  const [use12Hours, setUse12Hours] = useState(false);
  const [allowClear, setAllowClear] = useState(true);
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [injectStyles, setInjectStyles] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <TimePickerControlsContext.Provider
      value={{
        value,
        setValue,
        disabled,
        setDisabled,
        placeholder,
        setPlaceholder,
        format,
        setFormat,
        use12Hours,
        setUse12Hours,
        allowClear,
        setAllowClear,
        size,
        setSize,
        injectStyles,
        setInjectStyles,
      }}
    >
      {children}
    </TimePickerControlsContext.Provider>
  );
}

// 기본 TimePicker (컨트롤러와 함께 사용될 컴포넌트)
export function DemoTimePickerBasicWithControls() {
  const context = useContext(TimePickerControlsContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    value,
    setValue,
    disabled,
    placeholder,
    format,
    use12Hours,
    allowClear,
    size,
    injectStyles,
  } = context;

  return (
    <div style={{ padding: '2rem' }}>
      <TimePicker
        value={value}
        onChange={(newTime) => setValue(newTime ?? undefined)}
        disabled={disabled}
        placeholder={placeholder}
        format={format}
        use12Hours={use12Hours}
        allowClear={allowClear}
        size={size}
        injectStyles={injectStyles}
        className={injectStyles ? undefined : styles.timePicker}
        inputWrapperClassName={injectStyles ? undefined : styles.inputWrapper}
        inputClassName={injectStyles ? undefined : styles.input}
        inputActionsClassName={injectStyles ? undefined : styles.inputActions}
        clearButtonClassName={injectStyles ? undefined : styles.clearButton}
        dropdownButtonClassName={
          injectStyles ? undefined : styles.dropdownButton
        }
        backdropClassName={injectStyles ? undefined : styles.backdrop}
        panelWrapperClassName={injectStyles ? undefined : styles.panelWrapper}
        panelClassName={injectStyles ? undefined : styles.panel}
      />
      <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>
        선택된 시간:{' '}
        {mounted && value
          ? value.toLocaleTimeString('ko-KR')
          : value
            ? '로딩 중...'
            : '없음'}
      </p>
    </div>
  );
}

// TimePicker Controls
export function DemoTimePickerBasicControls() {
  const context = useContext(TimePickerControlsContext);

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
    format,
    setFormat,
    use12Hours,
    setUse12Hours,
    allowClear,
    setAllowClear,
    size,
    setSize,
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
          label: '선택된 시간 (Value)',
          control: (
            <Input
              type="time"
              value={
                value
                  ? `${String(value.getHours()).padStart(2, '0')}:${String(value.getMinutes()).padStart(2, '0')}`
                  : ''
              }
              onChange={(val) => {
                if (val) {
                  const [hours, minutes] = val.split(':');
                  const newTime = new Date();
                  newTime.setHours(Number(hours));
                  newTime.setMinutes(Number(minutes));
                  setValue(newTime);
                } else {
                  setValue(undefined);
                }
              }}
              placeholder="시간 선택"
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
        {
          label: 'Format',
          control: (
            <Select
              options={[
                { label: 'HH:mm:ss (24시간)', value: 'HH:mm:ss' },
                { label: 'hh:mm:ss A (12시간)', value: 'hh:mm:ss A' },
                { label: 'HH:mm (24시간, 초 없음)', value: 'HH:mm' },
                { label: 'hh:mm A (12시간, 초 없음)', value: 'hh:mm A' },
              ]}
              value={format}
              onChange={(val) => {
                if (!Array.isArray(val) && typeof val === 'string') {
                  setFormat(val);
                }
              }}
              placeholder="포맷 선택"
              size="small"
            />
          ),
        },
        {
          label: '12시간 형식 (Use 12 Hours)',
          control: (
            <Checkbox
              checked={use12Hours}
              onChange={(checked) => setUse12Hours(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '지우기 버튼 (Allow Clear)',
          control: (
            <Checkbox
              checked={allowClear}
              onChange={(checked) => setAllowClear(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '크기 (Size)',
          control: (
            <Select
              options={[
                { label: 'Small', value: 'small' },
                { label: 'Medium', value: 'medium' },
                { label: 'Large', value: 'large' },
              ]}
              value={size}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  setSize(val as typeof size);
                }
              }}
              placeholder="크기 선택"
              size="small"
            />
          ),
        },
      ]}
    />
  );
}

// 기존 예제들 (props 조합으로만 차별화)
export function DemoTimePickerBasic() {
  const [time, setTime] = useState<Date | undefined>(undefined);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <p
        style={{
          marginBottom: '1rem',
          fontSize: '14px',
          color: 'var(--color-text-secondary)',
        }}
      >
        기본 Time Picker - 빈 상태로 시작합니다
      </p>
      <TimePicker
        value={time}
        onChange={(newTime) => setTime(newTime ?? undefined)}
        placeholder="시간을 선택하세요"
        className={styles.timePicker}
        inputWrapperClassName={styles.inputWrapper}
        inputClassName={styles.input}
        inputActionsClassName={styles.inputActions}
        clearButtonClassName={styles.clearButton}
        dropdownButtonClassName={styles.dropdownButton}
        backdropClassName={styles.backdrop}
        panelWrapperClassName={styles.panelWrapper}
        panelClassName={styles.panel}
      />
      <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>
        선택된 시간:{' '}
        {mounted && time
          ? time.toLocaleTimeString('ko-KR')
          : time
            ? '로딩 중...'
            : '없음'}
      </p>
    </div>
  );
}

export function DemoTimePickerDefaultValue() {
  const [time, setTime] = useState<Date | undefined>(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <p
        style={{
          marginBottom: '1rem',
          fontSize: '14px',
          color: 'var(--color-text-secondary)',
        }}
      >
        With Default Value - 현재 시간이 초기값으로 설정되어 있습니다
      </p>
      <TimePicker
        value={time}
        onChange={(newTime) => setTime(newTime ?? undefined)}
        className={styles.timePicker}
        inputWrapperClassName={styles.inputWrapper}
        inputClassName={styles.input}
        inputActionsClassName={styles.inputActions}
        clearButtonClassName={styles.clearButton}
        dropdownButtonClassName={styles.dropdownButton}
        backdropClassName={styles.backdrop}
        panelWrapperClassName={styles.panelWrapper}
        panelClassName={styles.panel}
      />
      <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>
        선택된 시간:{' '}
        {mounted && time
          ? time.toLocaleTimeString('ko-KR')
          : time
            ? '로딩 중...'
            : '없음'}
      </p>
    </div>
  );
}

export function DemoTimePickerFormat() {
  const [time, setTime] = useState<Date | undefined>(undefined);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <p
        style={{
          marginBottom: '1rem',
          fontSize: '14px',
          color: 'var(--color-text-secondary)',
        }}
      >
        Format - 12시간 형식(AM/PM)을 사용합니다
      </p>
      <TimePicker
        value={time}
        onChange={(newTime) => setTime(newTime ?? undefined)}
        format="hh:mm:ss A"
        use12Hours={true}
        className={styles.timePicker}
        inputWrapperClassName={styles.inputWrapper}
        inputClassName={styles.input}
        inputActionsClassName={styles.inputActions}
        clearButtonClassName={styles.clearButton}
        dropdownButtonClassName={styles.dropdownButton}
        backdropClassName={styles.backdrop}
        panelWrapperClassName={styles.panelWrapper}
        panelClassName={styles.panel}
      />
      <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>
        선택된 시간:{' '}
        {mounted && time
          ? time.toLocaleTimeString('ko-KR')
          : time
            ? '로딩 중...'
            : '없음'}
      </p>
    </div>
  );
}

export function DemoTimePickerDisabled() {
  return (
    <div style={{ padding: '2rem' }}>
      <TimePicker
        value={new Date()}
        disabled
        className={styles.timePicker}
        inputWrapperClassName={styles.inputWrapper}
        inputClassName={styles.input}
        inputActionsClassName={styles.inputActions}
        clearButtonClassName={styles.clearButton}
        dropdownButtonClassName={styles.dropdownButton}
        backdropClassName={styles.backdrop}
        panelWrapperClassName={styles.panelWrapper}
        panelClassName={styles.panel}
      />
    </div>
  );
}
