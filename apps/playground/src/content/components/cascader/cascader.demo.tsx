'use client';

import { useState, createContext, useContext, useMemo } from 'react';
import { Cascader } from '@repo/ui';
import type { CascaderOption } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import { Input } from '@repo/ui';
import { Select } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import type { SelectOption } from '@repo/ui';
import * as styles from './cascader.demo.css';

// 샘플 데이터
const sampleOptions: CascaderOption[] = [
  {
    label: '프론트엔드',
    value: 'frontend',
    children: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
      { label: 'Angular', value: 'angular' },
    ],
  },
  {
    label: '백엔드',
    value: 'backend',
    children: [
      { label: 'Node.js', value: 'nodejs' },
      { label: 'Python', value: 'python' },
      { label: 'Java', value: 'java' },
    ],
  },
  {
    label: '데이터베이스',
    value: 'database',
    children: [
      { label: 'MySQL', value: 'mysql' },
      { label: 'PostgreSQL', value: 'postgresql' },
      { label: 'MongoDB', value: 'mongodb' },
    ],
  },
];

// Cascader Controls Context
interface CascaderControlsContextType {
  value: string[];
  setValue: (value: string[]) => void;
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
  size: 'small' | 'medium' | 'large';
  setSize: (size: 'small' | 'medium' | 'large') => void;
  placeholder: string;
  setPlaceholder: (placeholder: string) => void;
  separator: string;
  setSeparator: (separator: string) => void;
  injectStyles: boolean;
  setInjectStyles: (inject: boolean) => void;
}

const CascaderControlsContext =
  createContext<CascaderControlsContextType | null>(null);

// Provider
export function DemoCascaderBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [value, setValue] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [placeholder, setPlaceholder] = useState('선택하세요...');
  const [separator, setSeparator] = useState(' / ');
  const [injectStyles, setInjectStyles] = useState(true);

  const contextValue = useMemo(
    () => ({
      value,
      setValue,
      disabled,
      setDisabled,
      size,
      setSize,
      placeholder,
      setPlaceholder,
      separator,
      setSeparator,
      injectStyles,
      setInjectStyles,
    }),
    [value, disabled, size, placeholder, separator, injectStyles],
  );

  return (
    <CascaderControlsContext.Provider value={contextValue}>
      {children}
    </CascaderControlsContext.Provider>
  );
}

// 기본 Cascader (컨트롤러와 함께 사용될 컴포넌트)
export function DemoCascaderBasicWithControls() {
  const context = useContext(CascaderControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    value,
    setValue,
    disabled,
    size,
    placeholder,
    separator,
    injectStyles,
  } = context;

  return (
    <div
      className={`${styles.section} ${!injectStyles ? styles.cascaderWrapperClass : ''}`}
    >
      <div className={styles.content}>
        <div className={styles.cascaderWrapper}>
          <Cascader
            options={sampleOptions}
            value={value}
            onChange={setValue}
            disabled={disabled}
            size={size}
            placeholder={placeholder}
            separator={separator}
            injectStyles={injectStyles}
          />
        </div>
        <p className={styles.status}>
          선택된 값: {value.length > 0 ? value.join(separator) : '없음'}
        </p>
      </div>
    </div>
  );
}

// Cascader Controls
export function DemoCascaderBasicControls() {
  const context = useContext(CascaderControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    value,
    setValue,
    disabled,
    setDisabled,
    size,
    setSize,
    placeholder,
    setPlaceholder,
    separator,
    setSeparator,
    injectStyles,
    setInjectStyles,
  } = context;

  const sizeOptions: SelectOption[] = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
  ];

  const separatorOptions: SelectOption[] = [
    { label: ' / ', value: ' / ' },
    { label: ' > ', value: ' > ' },
    { label: ' | ', value: ' | ' },
    { label: ' - ', value: ' - ' },
    { label: ' → ', value: ' → ' },
  ];

  return (
    <Controls
      items={[
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
          label: '크기 (Size)',
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
          label: '구분자 (Separator)',
          control: (
            <Select
              options={separatorOptions}
              value={separator}
              onChange={(val) => {
                if (!Array.isArray(val) && val !== undefined) {
                  setSeparator(String(val));
                }
              }}
              placeholder="구분자 선택"
              size="small"
            />
          ),
        },
        {
          label: '구분자 직접 입력',
          control: (
            <Input
              type="text"
              value={separator}
              onChange={setSeparator}
              placeholder="예: /, >, |, - 등"
              size="small"
            />
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
      ]}
    />
  );
}

// 기존 예제들
export function DemoCascaderBasic() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.cascaderWrapper}>
          <Cascader
            options={sampleOptions}
            value={value}
            onChange={setValue}
            placeholder="선택하세요..."
          />
        </div>
        <p className={styles.status}>
          선택된 값: {value.length > 0 ? value.join(' / ') : '없음'}
        </p>
      </div>
    </div>
  );
}

export function DemoCascaderWithValue() {
  const [value, setValue] = useState<string[]>(['frontend', 'react']);

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.cascaderWrapper}>
          <Cascader
            options={sampleOptions}
            value={value}
            onChange={setValue}
            placeholder="선택하세요..."
          />
        </div>
        <p className={styles.status}>
          선택된 값: {value.length > 0 ? value.join(' / ') : '없음'}
        </p>
      </div>
    </div>
  );
}

export function DemoCascaderSizes() {
  const [value1, setValue1] = useState<string[]>([]);
  const [value2, setValue2] = useState<string[]>([]);
  const [value3, setValue3] = useState<string[]>([]);

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-base)',
          }}
        >
          <div>
            <p className={styles.sectionTitle}>Small</p>
            <div className={styles.cascaderWrapper}>
              <Cascader
                options={sampleOptions}
                value={value1}
                onChange={setValue1}
                size="small"
                placeholder="선택하세요..."
              />
            </div>
          </div>
          <div>
            <p className={styles.sectionTitle}>Medium</p>
            <div className={styles.cascaderWrapper}>
              <Cascader
                options={sampleOptions}
                value={value2}
                onChange={setValue2}
                size="medium"
                placeholder="선택하세요..."
              />
            </div>
          </div>
          <div>
            <p className={styles.sectionTitle}>Large</p>
            <div className={styles.cascaderWrapper}>
              <Cascader
                options={sampleOptions}
                value={value3}
                onChange={setValue3}
                size="large"
                placeholder="선택하세요..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DemoCascaderSeparators() {
  const [value1, setValue1] = useState<string[]>(['frontend', 'react']);
  const [value2, setValue2] = useState<string[]>(['backend', 'nodejs']);
  const [value3, setValue3] = useState<string[]>(['database', 'mysql']);

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-base)',
          }}
        >
          <div>
            <p className={styles.sectionTitle}>구분자: /</p>
            <div className={styles.cascaderWrapper}>
              <Cascader
                options={sampleOptions}
                value={value1}
                onChange={setValue1}
                separator=" / "
                placeholder="선택하세요..."
              />
            </div>
            <p className={styles.status}>
              선택된 값: {value1.length > 0 ? value1.join(' / ') : '없음'}
            </p>
          </div>
          <div>
            <p className={styles.sectionTitle}>구분자: &gt;</p>
            <div className={styles.cascaderWrapper}>
              <Cascader
                options={sampleOptions}
                value={value2}
                onChange={setValue2}
                separator=" > "
                placeholder="선택하세요..."
              />
            </div>
            <p className={styles.status}>
              선택된 값: {value2.length > 0 ? value2.join(' > ') : '없음'}
            </p>
          </div>
          <div>
            <p className={styles.sectionTitle}>구분자: →</p>
            <div className={styles.cascaderWrapper}>
              <Cascader
                options={sampleOptions}
                value={value3}
                onChange={setValue3}
                separator=" → "
                placeholder="선택하세요..."
              />
            </div>
            <p className={styles.status}>
              선택된 값: {value3.length > 0 ? value3.join(' → ') : '없음'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DemoCascaderDisabled() {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.cascaderWrapper}>
          <Cascader
            options={sampleOptions}
            value={[]}
            onChange={() => {}}
            disabled
            placeholder="선택하세요..."
          />
        </div>
      </div>
    </div>
  );
}
