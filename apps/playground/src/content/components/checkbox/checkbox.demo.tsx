'use client';

import { useState, createContext, useContext } from 'react';
import { Checkbox } from '@repo/ui';
import { Select } from '@repo/ui';
import { Input } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import type { SelectOption } from '@repo/ui';
import * as styles from './checkbox.demo.css';

// Checkbox Controls Context
interface CheckboxControlsContextType {
  checked: boolean;
  setChecked: (checked: boolean) => void;
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
  indeterminate: boolean;
  setIndeterminate: (indeterminate: boolean) => void;
  size: 'small' | 'medium' | 'large';
  setSize: (size: 'small' | 'medium' | 'large') => void;
  label: string;
  setLabel: (label: string) => void;
  injectStyles: boolean;
  setInjectStyles: (inject: boolean) => void;
}

const CheckboxControlsContext =
  createContext<CheckboxControlsContextType | null>(null);

// Provider
export function DemoCheckboxBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [label, setLabel] = useState('체크박스');
  const [injectStyles, setInjectStyles] = useState(true);

  return (
    <CheckboxControlsContext.Provider
      value={{
        checked,
        setChecked,
        disabled,
        setDisabled,
        indeterminate,
        setIndeterminate,
        size,
        setSize,
        label,
        setLabel,
        injectStyles,
        setInjectStyles,
      }}
    >
      {children}
    </CheckboxControlsContext.Provider>
  );
}

// 기본 Checkbox (컨트롤러와 함께 사용될 컴포넌트)
export function DemoCheckboxBasicWithControls() {
  const context = useContext(CheckboxControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { checked, setChecked, disabled, indeterminate, size, label } = context;
  const { injectStyles } = context;

  return (
    <div
      className={`${styles.section} ${!injectStyles ? styles.checkboxWrapperClass : ''}`}
    >
      <div className={styles.content}>
        <div className={styles.checkboxWrapper}>
          <Checkbox
            checked={checked}
            onChange={setChecked}
            disabled={disabled}
            indeterminate={indeterminate}
            size={size}
            injectStyles={injectStyles}
          >
            {label}
          </Checkbox>
        </div>
        <p className={styles.status}>
          상태:{' '}
          {indeterminate ? 'Indeterminate' : checked ? 'Checked' : 'Unchecked'}
        </p>
      </div>
    </div>
  );
}

// Checkbox Controls
export function DemoCheckboxBasicControls() {
  const context = useContext(CheckboxControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    checked,
    setChecked,
    disabled,
    setDisabled,
    indeterminate,
    setIndeterminate,
    size,
    setSize,
    label,
    setLabel,
    injectStyles,
    setInjectStyles,
  } = context;

  return (
    <Controls
      items={[
        {
          label: '체크 상태 (Checked)',
          control: (
            <Checkbox
              checked={checked}
              onChange={(checked) => setChecked(checked)}
              size="small"
            >
              체크됨
            </Checkbox>
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
          label: 'Indeterminate',
          control: (
            <Checkbox
              checked={indeterminate}
              onChange={(checked) => setIndeterminate(checked)}
              size="small"
            >
              사용
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
        {
          label: '라벨 (Label)',
          control: (
            <Input
              type="text"
              value={label}
              onChange={setLabel}
              placeholder="라벨 텍스트"
              size="small"
            />
          ),
        },
      ]}
    />
  );
}

// 기존 예제들 (props 조합으로만 차별화)
export function DemoCheckboxBasic() {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.checkboxWrapper}>
          <Checkbox>Basic checkbox</Checkbox>
        </div>
        <div className={styles.checkboxWrapper}>
          <Checkbox defaultChecked>Checked by default</Checkbox>
        </div>
      </div>
    </div>
  );
}

export function DemoCheckboxControlled() {
  const [checked, setChecked] = useState(false);

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.checkboxWrapper}>
          <Checkbox checked={checked} onChange={setChecked}>
            Controlled checkbox
          </Checkbox>
        </div>
        <p className={styles.status}>
          Status: {checked ? 'Checked' : 'Unchecked'}
        </p>
      </div>
    </div>
  );
}

export function DemoCheckboxGroup() {
  const [options, setOptions] = useState({
    option1: false,
    option2: true,
    option3: false,
  });

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.checkboxGroup}>
          <Checkbox
            checked={options.option1}
            onChange={(checked) => setOptions({ ...options, option1: checked })}
          >
            Option 1
          </Checkbox>
          <Checkbox
            checked={options.option2}
            onChange={(checked) => setOptions({ ...options, option2: checked })}
          >
            Option 2
          </Checkbox>
          <Checkbox
            checked={options.option3}
            onChange={(checked) => setOptions({ ...options, option3: checked })}
          >
            Option 3
          </Checkbox>
        </div>
        <p className={styles.status}>
          Selected:{' '}
          {Object.entries(options)
            .filter(([_, v]) => v)
            .map(([k]) => k)
            .join(', ') || 'None'}
        </p>
      </div>
    </div>
  );
}

export function DemoCheckboxIndeterminate() {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.checkboxWrapper}>
          <Checkbox indeterminate>Indeterminate checkbox</Checkbox>
        </div>
        <div className={styles.checkboxWrapper}>
          <Checkbox checked indeterminate>
            Checked and indeterminate
          </Checkbox>
        </div>
      </div>
    </div>
  );
}

export function DemoCheckboxDisabled() {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.checkboxWrapper}>
          <Checkbox disabled>Disabled checkbox</Checkbox>
        </div>
        <div className={styles.checkboxWrapper}>
          <Checkbox disabled defaultChecked>
            Disabled and checked
          </Checkbox>
        </div>
        <div className={styles.checkboxWrapper}>
          <Checkbox disabled indeterminate>
            Disabled and indeterminate
          </Checkbox>
        </div>
      </div>
    </div>
  );
}

export function DemoCheckboxCustomLabel() {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.checkboxWrapper}>
          <Checkbox>
            <span style={{ fontWeight: 'bold' }}>Bold label</span>
          </Checkbox>
        </div>
        <div className={styles.checkboxWrapper}>
          <Checkbox>
            <div>
              <div>Multi-line</div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                }}
              >
                Description text
              </div>
            </div>
          </Checkbox>
        </div>
      </div>
    </div>
  );
}

export function DemoCheckboxGroupWithSelectAll() {
  const [options, setOptions] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  });

  const allChecked = Object.values(options).every((v) => v);
  const someChecked = Object.values(options).some((v) => v);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setOptions({
        option1: true,
        option2: true,
        option3: true,
        option4: true,
      });
    } else {
      setOptions({
        option1: false,
        option2: false,
        option3: false,
        option4: false,
      });
    }
  };

  const handleOptionChange = (key: keyof typeof options, checked: boolean) => {
    if (allChecked && checked) {
      setOptions({
        ...options,
        [key]: false,
      });
    } else {
      setOptions({
        ...options,
        [key]: checked,
      });
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.checkboxGroup}>
          <Checkbox
            checked={allChecked}
            indeterminate={someChecked && !allChecked}
            onChange={handleSelectAll}
          >
            전체 선택
          </Checkbox>
          <div
            style={{
              marginLeft: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <Checkbox
              checked={options.option1}
              onChange={(checked) => handleOptionChange('option1', checked)}
            >
              Option 1
            </Checkbox>
            <Checkbox
              checked={options.option2}
              onChange={(checked) => handleOptionChange('option2', checked)}
            >
              Option 2
            </Checkbox>
            <Checkbox
              checked={options.option3}
              onChange={(checked) => handleOptionChange('option3', checked)}
            >
              Option 3
            </Checkbox>
            <Checkbox
              checked={options.option4}
              onChange={(checked) => handleOptionChange('option4', checked)}
            >
              Option 4
            </Checkbox>
          </div>
        </div>
        <p className={styles.status}>
          Selected:{' '}
          {Object.entries(options)
            .filter(([_, v]) => v)
            .map(([k]) => k)
            .join(', ') || 'None'}
        </p>
      </div>
    </div>
  );
}
