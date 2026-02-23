'use client';

import {
  useState,
  useRef,
  useEffect,
  useTransition,
  createContext,
  useContext,
  useMemo,
} from 'react';
import { Select } from '@cooolpower/headless-ui';
import type { SelectOption, SelectValue } from '@cooolpower/headless-ui';
import { Tag } from '@cooolpower/headless-ui';
import { Icon } from '@cooolpower/headless-ui';
import { Check, Loader2, Star } from 'lucide-react';
import { Toast } from '@cooolpower/headless-ui';
import { Controls } from '@/components/playground/controls';
import { Checkbox } from '@cooolpower/headless-ui';
import * as styles from './select.demo.css';

// Select Controls Context
interface SelectControlsContextType {
  size: 'small' | 'medium' | 'large';
  setSize: (size: 'small' | 'medium' | 'large') => void;
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
  clearable: boolean;
  setClearable: (clearable: boolean) => void;
  searchable: boolean;
  setSearchable: (searchable: boolean) => void;
  useLoading: boolean;
  setUseLoading: (loading: boolean) => void;
  injectStyles: boolean;
  setInjectStyles: (inject: boolean) => void;
}

const SelectControlsContext = createContext<SelectControlsContextType | null>(
  null,
);

const options: SelectOption[] = [
  { label: '옵션 1', value: '1' },
  { label: '옵션 2', value: '2' },
  { label: '옵션 3', value: '3' },
  { label: '옵션 4', value: '4' },
  { label: '옵션 5', value: '5' },
];

const longOptions: SelectOption[] = Array.from({ length: 20 }, (_, i) => ({
  label: `옵션 ${i + 1}`,
  value: `${i + 1}`,
}));

const groupedOptions: SelectOption[] = [
  { label: '그룹 1 - 옵션 1', value: 'g1-1', group: '그룹 1' },
  { label: '그룹 1 - 옵션 2', value: 'g1-2', group: '그룹 1' },
  { label: '그룹 2 - 옵션 1', value: 'g2-1', group: '그룹 2' },
  { label: '그룹 2 - 옵션 2', value: 'g2-2', group: '그룹 2' },
  { label: '그룹 2 - 옵션 3', value: 'g2-3', group: '그룹 2' },
];

const customOptions: SelectOption[] = [
  { label: '옵션 1', value: '1', description: '설명 1' },
  { label: '옵션 2', value: '2', description: '설명 2' },
  { label: '옵션 3', value: '3', description: '설명 3' },
];

// 기본 Select
export function DemoSelectBasic({
  size: controlledSize,
  disabled: controlledDisabled,
  clearable: controlledClearable,
  searchable: controlledSearchable,
  loading: controlledLoading,
  injectStyles: controlledInjectStyles,
}: {
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  clearable?: boolean;
  searchable?: boolean;
  loading?: boolean;
  injectStyles?: boolean;
} = {}) {
  const [value, setValue] = useState<string | number | undefined>(undefined);

  // Props가 제공되면 props를 직접 사용 (controlled), 없으면 로컬 state 사용 (uncontrolled)
  const [internalSize, setInternalSize] = useState<
    'small' | 'medium' | 'large'
  >('medium');
  const [internalDisabled, setInternalDisabled] = useState(false);
  const [internalClearable, setInternalClearable] = useState(false);
  const [internalSearchable, setInternalSearchable] = useState(false);

  // Props가 변경되면 로컬 state도 동기화 (uncontrolled 모드에서도 동작하도록)
  useEffect(() => {
    if (controlledSize !== undefined) {
      setInternalSize(controlledSize);
    }
  }, [controlledSize]);

  useEffect(() => {
    if (controlledDisabled !== undefined) {
      setInternalDisabled(controlledDisabled);
    }
  }, [controlledDisabled]);

  useEffect(() => {
    if (controlledClearable !== undefined) {
      setInternalClearable(controlledClearable);
    }
  }, [controlledClearable]);

  useEffect(() => {
    if (controlledSearchable !== undefined) {
      setInternalSearchable(controlledSearchable);
    }
  }, [controlledSearchable]);

  // Props가 있으면 props 사용, 없으면 로컬 state 사용
  const size = controlledSize !== undefined ? controlledSize : internalSize;
  const disabled =
    controlledDisabled !== undefined ? controlledDisabled : internalDisabled;
  const clearable =
    controlledClearable !== undefined ? controlledClearable : internalClearable;
  const searchable =
    controlledSearchable !== undefined
      ? controlledSearchable
      : internalSearchable;
  const [toasts, setToasts] = useState<
    Array<{
      id: string;
      color: 'success' | 'info' | 'warning' | 'error';
      message: string;
      duration?: number;
      showProgress?: boolean;
    }>
  >([]);
  const maxCount = 5;
  const toastIdCounterRef = useRef(0);

  const showToast = (
    color: 'success' | 'info' | 'warning' | 'error',
    message: string,
    options?: { duration?: number; showProgress?: boolean },
  ) => {
    const id = `${Date.now()}-${toastIdCounterRef.current++}-${Math.random().toString(36).slice(2, 11)}`;
    setToasts((prev) =>
      [
        ...prev,
        {
          id,
          color,
          message,
          duration: options?.duration,
          showProgress: options?.showProgress,
        },
      ].slice(-maxCount),
    );
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const prevValueRef = useRef<string | number | undefined>(undefined);
  useEffect(() => {
    if (prevValueRef.current !== value && value !== undefined) {
      const label =
        options.find((o) => o.value === value)?.label ?? String(value);
      showToast('success', `${label} 선택됨`, {
        duration: 1000,
        showProgress: false,
      });
    }
    prevValueRef.current = value;
  }, [value]);

  return (
    <div
      className={`${styles.section} ${!controlledInjectStyles ? styles.selectWrapperClass : ''}`}
    >
      <div className={styles.content}>
        <div className={styles.selectWrapper}>
          <Select
            options={options}
            value={value}
            onChange={(val) => {
              if (!Array.isArray(val)) {
                setValue(val);
              }
            }}
            placeholder="옵션을 선택하세요"
            size={size}
            disabled={disabled}
            clearable={clearable}
            searchable={searchable}
            loading={controlledLoading}
            injectStyles={controlledInjectStyles}
          />
        </div>
        <p className={styles.status}>선택된 값: {value || '없음'}</p>
        {toasts.map((toast, index) => (
          <Toast
            key={toast.id}
            message={toast.message}
            //type={toast.type}
            color={toast.color}
            onClose={() => removeToast(toast.id)}
            duration={toast.duration ?? 2500}
            index={index}
            maxCount={maxCount}
            showProgress={toast.showProgress ?? true}
          />
        ))}
      </div>
    </div>
  );
}

// 기본 Select with Controls - Provider 래퍼
export function DemoSelectBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [disabled, setDisabled] = useState(false);
  const [clearable, setClearable] = useState(false);
  const [searchable, setSearchable] = useState(false);
  const [useLoading, setUseLoading] = useState(false);
  const [injectStyles, setInjectStyles] = useState(true);

  // 로딩 상태가 true로 변경되면 2초 후 자동으로 false로 변경
  useEffect(() => {
    if (useLoading) {
      const timer = setTimeout(() => {
        setUseLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [useLoading]);

  const contextValue = useMemo(
    () => ({
      size,
      setSize,
      disabled,
      setDisabled,
      clearable,
      setClearable,
      searchable,
      setSearchable,
      useLoading,
      setUseLoading,
      injectStyles,
      setInjectStyles,
    }),
    [size, disabled, clearable, searchable, useLoading, injectStyles],
  );

  return (
    <SelectControlsContext.Provider value={contextValue}>
      {children}
    </SelectControlsContext.Provider>
  );
}

// 기본 Select with Controls - Preview 부분
export function DemoSelectBasicWithControls() {
  const context = useContext(SelectControlsContext);
  if (!context) {
    return <DemoSelectBasic />;
  }

  const { size, disabled, clearable, searchable, useLoading, injectStyles } =
    context;

  return (
    <DemoSelectBasic
      size={size}
      disabled={disabled}
      clearable={clearable}
      searchable={searchable}
      loading={useLoading}
      injectStyles={injectStyles}
    />
  );
}

// 기본 Select with Controls - Controls 부분
export function DemoSelectBasicControls() {
  const context = useContext(SelectControlsContext);

  if (!context) {
    return (
      <div
        style={{
          padding: '16px',
          color: 'oklch(55.1% 0.023 264.4)',
          fontSize: '14px',
        }}
      >
        컨트롤러를 사용하려면 DemoSelectBasicProvider로 감싸야 합니다.
      </div>
    );
  }

  const {
    size,
    setSize,
    disabled,
    setDisabled,
    clearable,
    setClearable,
    searchable,
    setSearchable,
    useLoading,
    setUseLoading,
    injectStyles,
    setInjectStyles,
  } = context;

  const sizeOptions: SelectOption[] = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
  ];

  return (
    <Controls
      items={[
        {
          label: 'Size',
          control: (
            <Select
              options={sizeOptions}
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
        {
          label: 'Disabled',
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
          label: 'Clearable',
          control: (
            <Checkbox
              checked={clearable}
              onChange={(checked) => setClearable(checked)}
              size="small"
            >
              지우기 버튼 표시
            </Checkbox>
          ),
        },
        {
          label: 'Searchable',
          control: (
            <Checkbox
              checked={searchable}
              onChange={(checked) => setSearchable(checked)}
              size="small"
            >
              검색 가능
            </Checkbox>
          ),
        },
        {
          label: 'Inject Styles',
          control: (
            <Checkbox
              checked={injectStyles}
              onChange={(checked) => setInjectStyles(checked)}
              size="small"
            >
              기본 스타일 주입
            </Checkbox>
          ),
        },
        {
          label: '로딩 상태',
          control: (
            <Checkbox
              checked={useLoading}
              onChange={(checked) => setUseLoading(checked)}
              size="small"
            >
              로딩 중
            </Checkbox>
          ),
        },
      ]}
    />
  );
}

// With Default Value
export function DemoSelectDefaultValue() {
  const [value, setValue] = useState<string | number | undefined>('2');
  const [toasts, setToasts] = useState<
    Array<{
      id: string;
      color: 'success' | 'info' | 'warning' | 'error';
      message: string;
      duration?: number;
      showProgress?: boolean;
    }>
  >([]);
  const maxCount = 5;
  const toastIdCounterRef = useRef(0);

  const showToast = (
    color: 'success' | 'info' | 'warning' | 'error',
    message: string,
    options?: { duration?: number; showProgress?: boolean },
  ) => {
    const id = `${Date.now()}-${toastIdCounterRef.current++}-${Math.random().toString(36).slice(2, 11)}`;
    setToasts((prev) =>
      [
        ...prev,
        {
          id,
          color,
          message,
          duration: options?.duration,
          showProgress: options?.showProgress,
        },
      ].slice(-maxCount),
    );
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const prevValueRef = useRef<string | number | undefined>('2');
  useEffect(() => {
    if (prevValueRef.current !== value && value !== undefined) {
      const label =
        options.find((o) => o.value === value)?.label ?? String(value);
      showToast('success', `${label} 선택됨`);
    }
    prevValueRef.current = value;
  }, [value]);

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.selectWrapper}>
          <Select
            options={options}
            value={value}
            onChange={(val) => {
              if (!Array.isArray(val)) {
                setValue(val);
              }
            }}
            placeholder="옵션을 선택하세요"
          />
        </div>
        <p className={styles.status}>선택된 값: {value || '없음'}</p>
        {toasts.map((toast, index) => (
          <Toast
            key={toast.id}
            message={toast.message}
            //type={toast.type}
            color={toast.color}
            onClose={() => removeToast(toast.id)}
            duration={toast.duration ?? 2500}
            index={index}
            maxCount={maxCount}
            showProgress={toast.showProgress ?? true}
          />
        ))}
      </div>
    </div>
  );
}

// Disabled
export function DemoSelectDisabled() {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.selectWrapper}>
          <Select options={options} disabled placeholder="비활성화됨" />
        </div>
        <div className={styles.selectWrapper}>
          <Select
            options={options}
            defaultValue="2"
            disabled
            placeholder="비활성화됨"
          />
        </div>
      </div>
    </div>
  );
}

// Clearable
export function DemoSelectClearable() {
  const [value, setValue] = useState<string | number | undefined>('2');
  const [toasts, setToasts] = useState<
    Array<{
      id: string;
      color: 'success' | 'info' | 'warning' | 'error';
      message: string;
      duration?: number;
      showProgress?: boolean;
    }>
  >([]);
  const maxCount = 5;
  const toastIdCounterRef = useRef(0);

  const showToast = (
    color: 'success' | 'info' | 'warning' | 'error',
    message: string,
    options?: { duration?: number; showProgress?: boolean },
  ) => {
    const id = `${Date.now()}-${toastIdCounterRef.current++}-${Math.random().toString(36).slice(2, 11)}`;
    setToasts((prev) =>
      [
        ...prev,
        {
          id,
          color,
          message,
          duration: options?.duration,
          showProgress: options?.showProgress,
        },
      ].slice(-maxCount),
    );
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const prevValueRef = useRef<string | number | undefined>('2');
  useEffect(() => {
    if (prevValueRef.current !== value) {
      if (value === undefined) {
        showToast('info', '선택 해제됨');
      } else {
        const label =
          options.find((o) => o.value === value)?.label ?? String(value);
        showToast('success', `${label} 선택됨`);
      }
    }
    prevValueRef.current = value;
  }, [value]);

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.selectWrapper}>
          <Select
            options={options}
            value={value}
            onChange={(val) => {
              if (!Array.isArray(val)) {
                setValue(val);
              }
            }}
            clearable
            placeholder="옵션을 선택하세요"
          />
        </div>
        <p className={styles.status}>선택된 값: {value || '없음'}</p>
        {toasts.map((toast, index) => (
          <Toast
            key={toast.id}
            message={toast.message}
            color={toast.color}
            onClose={() => removeToast(toast.id)}
            duration={toast.duration ?? 2500}
            index={index}
            maxCount={maxCount}
            showProgress={toast.showProgress ?? true}
          />
        ))}
      </div>
    </div>
  );
}

// Searchable
export function DemoSelectSearchable() {
  const [value, setValue] = useState<string | number | undefined>(undefined);
  const [toasts, setToasts] = useState<
    Array<{
      id: string;
      color: 'success' | 'info' | 'warning' | 'error';
      message: string;
      duration?: number;
      showProgress?: boolean;
    }>
  >([]);
  const maxCount = 5;
  const toastIdCounterRef = useRef(0);

  const showToast = (
    color: 'success' | 'info' | 'warning' | 'error',
    message: string,
    options?: { duration?: number; showProgress?: boolean },
  ) => {
    const id = `${Date.now()}-${toastIdCounterRef.current++}-${Math.random().toString(36).slice(2, 11)}`;
    setToasts((prev) =>
      [
        ...prev,
        {
          id,
          color,
          message,
          duration: options?.duration,
          showProgress: options?.showProgress,
        },
      ].slice(-maxCount),
    );
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const prevValueRef = useRef<string | number | undefined>(undefined);
  useEffect(() => {
    if (prevValueRef.current !== value && value !== undefined) {
      const label =
        longOptions.find((o) => o.value === value)?.label ?? String(value);
      showToast('success', `${label} 선택됨`);
    }
    prevValueRef.current = value;
  }, [value]);

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.selectWrapper}>
          <Select
            options={longOptions}
            value={value}
            onChange={(val) => {
              if (!Array.isArray(val)) {
                setValue(val);
              }
            }}
            searchable
            placeholder="검색하여 선택하세요"
          />
        </div>
        <p className={styles.status}>선택된 값: {value || '없음'}</p>
        {toasts.map((toast, index) => (
          <Toast
            key={toast.id}
            message={toast.message}
            color={toast.color}
            onClose={() => removeToast(toast.id)}
            duration={toast.duration ?? 2500}
            index={index}
            maxCount={maxCount}
            showProgress={toast.showProgress ?? true}
          />
        ))}
      </div>
    </div>
  );
}

// Sizes
export function DemoSelectSizes() {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.selectWrapper}>
          <Select options={options} size="small" placeholder="Small" />
        </div>
        <div className={styles.selectWrapper}>
          <Select options={options} size="medium" placeholder="Medium" />
        </div>
        <div className={styles.selectWrapper}>
          <Select options={options} size="large" placeholder="Large" />
        </div>
      </div>
    </div>
  );
}

// With Disabled Options
export function DemoSelectDisabledOptions() {
  const disabledOptions: SelectOption[] = [
    { label: '옵션 1', value: '1' },
    { label: '옵션 2 (비활성화)', value: '2', disabled: true },
    { label: '옵션 3', value: '3' },
    { label: '옵션 4 (비활성화)', value: '4', disabled: true },
    { label: '옵션 5', value: '5' },
  ];

  const [value, setValue] = useState<string | number | undefined>(undefined);
  const [toasts, setToasts] = useState<
    Array<{
      id: string;
      color: 'success' | 'info' | 'warning' | 'error';
      message: string;
      duration?: number;
      showProgress?: boolean;
    }>
  >([]);
  const maxCount = 5;
  const toastIdCounterRef = useRef(0);

  const showToast = (
    color: 'success' | 'info' | 'warning' | 'error',
    message: string,
    options?: { duration?: number; showProgress?: boolean },
  ) => {
    const id = `${Date.now()}-${toastIdCounterRef.current++}-${Math.random().toString(36).slice(2, 11)}`;
    setToasts((prev) =>
      [
        ...prev,
        {
          id,
          color,
          message,
          duration: options?.duration,
          showProgress: options?.showProgress,
        },
      ].slice(-maxCount),
    );
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const prevValueRef = useRef<string | number | undefined>(undefined);
  useEffect(() => {
    if (prevValueRef.current !== value && value !== undefined) {
      const label =
        disabledOptions.find((o) => o.value === value)?.label ?? String(value);
      showToast('success', `${label} 선택됨`);
    }
    prevValueRef.current = value;
  }, [value]);

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.selectWrapper}>
          <Select
            options={disabledOptions}
            value={value}
            onChange={(val) => {
              if (!Array.isArray(val)) {
                setValue(val);
              }
            }}
            placeholder="옵션을 선택하세요"
          />
        </div>
        <p className={styles.status}>선택된 값: {value || '없음'}</p>
        {toasts.map((toast, index) => (
          <Toast
            key={toast.id}
            message={toast.message}
            color={toast.color}
            onClose={() => removeToast(toast.id)}
            duration={toast.duration ?? 2500}
            index={index}
            maxCount={maxCount}
            showProgress={toast.showProgress ?? true}
          />
        ))}
      </div>
    </div>
  );
}

// Multiple (다중 선택)
export function DemoSelectMultiple() {
  const [value, setValue] = useState<SelectValue[]>([]);
  const [toasts, setToasts] = useState<
    Array<{
      id: string;
      color: 'success' | 'info' | 'warning' | 'error';
      message: string;
      duration?: number;
      showProgress?: boolean;
    }>
  >([]);
  const maxCount = 5;
  const toastIdCounterRef = useRef(0);

  const showToast = (
    color: 'success' | 'info' | 'warning' | 'error',
    message: string,
    options?: { duration?: number; showProgress?: boolean },
  ) => {
    // 고유한 ID 생성: 타임스탬프 + 카운터 + 랜덤
    const id = `${Date.now()}-${toastIdCounterRef.current++}-${Math.random().toString(36).slice(2, 11)}`;
    setToasts((prev) =>
      [
        ...prev,
        {
          id,
          color,
          message,
          duration: options?.duration,
          showProgress: options?.showProgress,
        },
      ].slice(-maxCount),
    );
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // value 변경 감지하여 Toast 표시
  const prevValueRef = useRef<SelectValue[]>([]);
  useEffect(() => {
    const prev = prevValueRef.current;
    const added = value.filter((v) => !prev.includes(v));
    const removed = prev.filter((v) => !value.includes(v));

    if (added.length > 0) {
      const last = added[added.length - 1];
      const label =
        options.find((o) => o.value === last)?.label ?? String(last);
      showToast('success', `${label} 선택됨`);
    } else if (removed.length > 0) {
      const last = removed[removed.length - 1];
      const label =
        options.find((o) => o.value === last)?.label ?? String(last);
      showToast('info', `${label} 해제됨`);
    }

    prevValueRef.current = value;
  }, [value]);

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.selectWrapper}>
          <Select
            options={options}
            value={value}
            onChange={(val) => {
              const next = Array.isArray(val) ? (val as SelectValue[]) : [];
              setValue(next);
            }}
            multiple
            placeholder="여러 옵션을 선택하세요"
            clearable
          />
        </div>
        <p className={styles.status}>
          선택된 값: {value.length > 0 ? value.join(', ') : '없음'}
        </p>
        {value.length > 0 && (
          <div className={styles.tagContainer}>
            {value.map((val) => {
              const option = options.find((opt) => opt.value === val);
              return <Tag key={val}>{option?.label}</Tag>;
            })}
          </div>
        )}

        {toasts.map((toast, index) => (
          <Toast
            key={toast.id}
            message={toast.message}
            color={toast.color}
            onClose={() => removeToast(toast.id)}
            duration={toast.duration ?? 2500}
            index={index}
            maxCount={maxCount}
            showProgress={toast.showProgress ?? true}
          />
        ))}
      </div>
    </div>
  );
}

// Grouped Options
export function DemoSelectGrouped() {
  const [value, setValue] = useState<string | number | undefined>(undefined);

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.selectWrapper}>
          <Select
            options={groupedOptions}
            value={value}
            onChange={(val) => {
              if (!Array.isArray(val)) {
                setValue(val);
              }
            }}
            placeholder="그룹 옵션을 선택하세요"
          />
        </div>
        <p className={styles.status}>선택된 값: {value || '없음'}</p>
      </div>
    </div>
  );
}

// Loading State
export function DemoSelectLoading() {
  const [value, setValue] = useState<string | number | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleOpen = () => {
    startTransition(() => {
      setLoading(true);
      // API 호출 시뮬레이션
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });
  };

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.selectWrapper}>
          <Select
            options={options}
            value={value}
            onChange={(val) => {
              if (!Array.isArray(val)) {
                setValue(val);
              }
            }}
            onOpen={handleOpen}
            loading={loading}
            placeholder="옵션을 선택하세요"
          />
        </div>
        <p className={styles.status}>선택된 값: {value || '없음'}</p>
      </div>
    </div>
  );
}

// Custom Option Render (커스텀 옵션 렌더링)
export function DemoSelectCustomOption() {
  const [value, setValue] = useState<string | number | undefined>(undefined);
  const [toasts, setToasts] = useState<
    Array<{
      id: string;
      color: 'success' | 'info' | 'warning' | 'error';
      message: string;
      duration?: number;
      showProgress?: boolean;
    }>
  >([]);
  const maxCount = 5;
  const toastIdCounterRef = useRef(0);

  const showToast = (
    color: 'success' | 'info' | 'warning' | 'error',
    message: string,
    options?: { duration?: number; showProgress?: boolean },
  ) => {
    const id = `${Date.now()}-${toastIdCounterRef.current++}-${Math.random().toString(36).slice(2, 11)}`;
    setToasts((prev) =>
      [
        ...prev,
        {
          id,
          color,
          message,
          duration: options?.duration,
          showProgress: options?.showProgress,
        },
      ].slice(-maxCount),
    );
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const prevValueRef = useRef<string | number | undefined>(undefined);
  useEffect(() => {
    if (prevValueRef.current !== value && value !== undefined) {
      const label =
        customOptions.find((o) => o.value === value)?.label ?? String(value);
      showToast('success', `${label} 선택됨`);
    }
    prevValueRef.current = value;
  }, [value]);

  // Note: 실제로는 Select 컴포넌트에 renderOption prop이 필요하지만,
  // 현재는 데모만 표시
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.selectWrapper}>
          <Select
            options={customOptions}
            value={value}
            onChange={(val) => {
              if (!Array.isArray(val)) {
                setValue(val);
              }
            }}
            placeholder="커스텀 옵션을 선택하세요"
          />
        </div>
        <p className={styles.status}>선택된 값: {value || '없음'}</p>
        <div className={styles.note}>
          <p>
            참고: 실제 커스텀 렌더링은 Select 컴포넌트에 renderOption prop이
            필요합니다.
          </p>
        </div>
        {toasts.map((toast, index) => (
          <Toast
            key={toast.id}
            message={toast.message}
            color={toast.color}
            onClose={() => removeToast(toast.id)}
            duration={toast.duration ?? 2500}
            index={index}
            maxCount={maxCount}
            showProgress={toast.showProgress ?? true}
          />
        ))}
      </div>
    </div>
  );
}

// Tag Mode (태그 모드 - 사용자가 새 옵션 추가 가능)
export function DemoSelectTag() {
  const [value, setValue] = useState<string | number | undefined>(undefined);
  const [customOptions, setCustomOptions] = useState<SelectOption[]>(options);
  const [toasts, setToasts] = useState<
    Array<{
      id: string;
      color: 'success' | 'info' | 'warning' | 'error';
      message: string;
      duration?: number;
      showProgress?: boolean;
    }>
  >([]);
  const maxCount = 5;
  const toastIdCounterRef = useRef(0);

  const showToast = (
    color: 'success' | 'info' | 'warning' | 'error',
    message: string,
    options?: { duration?: number; showProgress?: boolean },
  ) => {
    const id = `${Date.now()}-${toastIdCounterRef.current++}-${Math.random().toString(36).slice(2, 11)}`;
    setToasts((prev) =>
      [
        ...prev,
        {
          id,
          color,
          message,
          duration: options?.duration,
          showProgress: options?.showProgress,
        },
      ].slice(-maxCount),
    );
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleCreate = (label: string) => {
    // 새 옵션 생성
    const newOption: SelectOption = {
      label,
      value: label, // 간단하게 label을 value로 사용
    };
    setCustomOptions((prev) => [...prev, newOption]);
    setValue(newOption.value);
    showToast('success', `새 항목 "${label}" 생성됨`);
  };

  const prevValueRef = useRef<string | number | undefined>(undefined);
  useEffect(() => {
    if (prevValueRef.current !== value && value !== undefined) {
      const label =
        customOptions.find((o) => o.value === value)?.label ?? String(value);
      // onCreate에서 이미 토스트를 표시하므로 중복 방지
      if (!label.startsWith('새 항목')) {
        showToast('success', `${label} 선택됨`);
      }
    }
    prevValueRef.current = value;
  }, [value, customOptions]);

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.selectWrapper}>
          <Select
            options={customOptions}
            value={value}
            onChange={(val) => {
              if (!Array.isArray(val)) {
                setValue(val);
              }
            }}
            placeholder="옵션을 선택하거나 새로 추가하세요"
            searchable
            tag
            onCreate={handleCreate}
          />
        </div>
        <p className={styles.status}>선택된 값: {value || '없음'}</p>
        <div className={styles.note}>
          <p>
            💡 검색 결과가 없을 때 "새 항목 생성" 옵션이 나타납니다. 클릭하면 새
            옵션이 추가됩니다.
          </p>
        </div>
        {toasts.map((toast, index) => (
          <Toast
            key={toast.id}
            message={toast.message}
            color={toast.color}
            onClose={() => removeToast(toast.id)}
            duration={toast.duration ?? 2500}
            index={index}
            maxCount={maxCount}
            showProgress={toast.showProgress ?? true}
          />
        ))}
      </div>
    </div>
  );
}
