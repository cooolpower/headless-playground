'use client';

import { useState, createContext, useContext, useMemo } from 'react';
import { Switch } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import { Input } from '@repo/ui';
import { Select } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Check, X, Moon, Sun, Wifi, WifiOff } from 'lucide-react';
import type { SelectOption } from '@repo/ui';
import * as styles from './switch.demo.css';

// Switch Controls Context
interface SwitchControlsContextType {
  checked: boolean;
  setChecked: (checked: boolean) => void;
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
  size: 'small' | 'medium' | 'large';
  setSize: (size: 'small' | 'medium' | 'large') => void;
  label: string;
  setLabel: (label: string) => void;
  enableLoading: boolean;
  setEnableLoading: (enable: boolean) => void;
  round: boolean;
  setRound: (round: boolean) => void;
  railColor: string;
  setRailColor: (color: string) => void;
  railColorActive: string;
  setRailColorActive: (color: string) => void;
  checkedIcon: string;
  setCheckedIcon: (icon: string) => void;
  uncheckedIcon: string;
  setUncheckedIcon: (icon: string) => void;
  injectStyles: boolean;
  setInjectStyles: (inject: boolean) => void;
}

const SwitchControlsContext = createContext<SwitchControlsContextType | null>(
  null,
);

// Provider
export function DemoSwitchBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [label, setLabel] = useState('스위치');
  const [enableLoading, setEnableLoading] = useState(false);
  const [round, setRound] = useState(true);
  const [railColor, setRailColor] = useState('');
  const [railColorActive, setRailColorActive] = useState('');
  const [checkedIcon, setCheckedIcon] = useState('none');
  const [uncheckedIcon, setUncheckedIcon] = useState('none');
  const [injectStyles, setInjectStyles] = useState(true);

  const contextValue = useMemo(
    () => ({
      checked,
      setChecked,
      disabled,
      setDisabled,
      size,
      setSize,
      label,
      setLabel,
      enableLoading,
      setEnableLoading,
      round,
      setRound,
      railColor,
      setRailColor,
      railColorActive,
      setRailColorActive,
      checkedIcon,
      setCheckedIcon,
      uncheckedIcon,
      setUncheckedIcon,
      injectStyles,
      setInjectStyles,
    }),
    [
      checked,
      disabled,
      size,
      label,
      enableLoading,
      round,
      railColor,
      railColorActive,
      checkedIcon,
      uncheckedIcon,
      injectStyles,
    ],
  );

  return (
    <SwitchControlsContext.Provider value={contextValue}>
      {children}
    </SwitchControlsContext.Provider>
  );
}

// 아이콘 매핑
const iconMap: Record<string, typeof Check | null> = {
  none: null,
  check: Check,
  x: X,
  moon: Moon,
  sun: Sun,
  wifi: Wifi,
  wifiOff: WifiOff,
};

// 기본 Switch (컨트롤러와 함께 사용될 컴포넌트)
export function DemoSwitchBasicWithControls() {
  const context = useContext(SwitchControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    checked,
    setChecked,
    disabled,
    size,
    label,
    enableLoading,
    round,
    railColor,
    railColorActive,
    checkedIcon,
    uncheckedIcon,
    injectStyles,
  } = context;

  const [loading, setLoading] = useState(false);

  const handleChange = (newChecked: boolean) => {
    if (!enableLoading) {
      // 로딩이 비활성화되어 있으면 즉시 반영
      setChecked(newChecked);
      return;
    }

    if (!newChecked) {
      // 꺼지는 것은 즉시 반영
      setChecked(false);
      return;
    }
    // 켜지는 것은 로딩 후 반영
    setLoading(true);
    setTimeout(() => {
      setChecked(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div
      className={`${styles.section} ${!injectStyles ? styles.switchWrapperClass : ''}`}
    >
      <div className={styles.content}>
        <div className={styles.switchWrapper}>
          <Switch
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            size={size}
            loading={loading}
            round={round}
            railColor={railColor || undefined}
            railColorActive={railColorActive || undefined}
            checkedIcon={
              checkedIcon !== 'none'
                ? iconMap[checkedIcon] || undefined
                : undefined
            }
            uncheckedIcon={
              uncheckedIcon !== 'none'
                ? iconMap[uncheckedIcon] || undefined
                : undefined
            }
            injectStyles={injectStyles}
          >
            {label}
          </Switch>
        </div>
        <p className={styles.status}>
          상태: {loading ? '로딩 중...' : checked ? '켜짐' : '꺼짐'}
        </p>
      </div>
    </div>
  );
}

// Switch Controls
export function DemoSwitchBasicControls() {
  const context = useContext(SwitchControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    checked,
    setChecked,
    disabled,
    setDisabled,
    size,
    setSize,
    label,
    setLabel,
    enableLoading,
    setEnableLoading,
    round,
    setRound,
    railColor,
    setRailColor,
    railColorActive,
    setRailColorActive,
    checkedIcon,
    setCheckedIcon,
    uncheckedIcon,
    setUncheckedIcon,
    injectStyles,
    setInjectStyles,
  } = context;

  const sizeOptions: SelectOption[] = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
  ];

  const iconOptions: SelectOption[] = [
    { label: '없음', value: 'none' },
    { label: 'Check', value: 'check' },
    { label: 'X', value: 'x' },
    { label: 'Moon', value: 'moon' },
    { label: 'Sun', value: 'sun' },
    { label: 'Wifi', value: 'wifi' },
    { label: 'WifiOff', value: 'wifiOff' },
  ];

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
              켜짐
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
          label: '로딩 사용 (Enable Loading)',
          control: (
            <Checkbox
              checked={enableLoading}
              onChange={(checked) => setEnableLoading(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '둥근 모양 (Round)',
          control: (
            <Checkbox
              checked={round}
              onChange={(checked) => setRound(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: 'Rail 색상 (비활성)',
          control: (
            <Input
              type="text"
              value={railColor}
              onChange={setRailColor}
              placeholder="예: var(--color-border)"
              size="small"
            />
          ),
        },
        {
          label: 'Rail 색상 (활성)',
          control: (
            <Input
              type="text"
              value={railColorActive}
              onChange={setRailColorActive}
              placeholder="예: var(--color-brand-primary)"
              size="small"
            />
          ),
        },
        {
          label: 'Checked 아이콘',
          control: (
            <Select
              options={iconOptions}
              value={checkedIcon}
              onChange={(val) => {
                if (!Array.isArray(val) && val !== undefined) {
                  setCheckedIcon(String(val));
                }
              }}
              placeholder="아이콘 선택"
              size="small"
            />
          ),
        },
        {
          label: 'Unchecked 아이콘',
          control: (
            <Select
              options={iconOptions}
              value={uncheckedIcon}
              onChange={(val) => {
                if (!Array.isArray(val) && val !== undefined) {
                  setUncheckedIcon(String(val));
                }
              }}
              placeholder="아이콘 선택"
              size="small"
            />
          ),
        },
      ]}
    />
  );
}

// 기존 예제들 (props 조합으로만 차별화)
export function DemoSwitchBasic() {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.switchWrapper}>
          <Switch />
        </div>
        <div className={styles.switchWrapper}>
          <Switch defaultChecked />
        </div>
      </div>
    </div>
  );
}

export function DemoSwitchControlled() {
  const [checked, setChecked] = useState(false);

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.switchWrapper}>
          <Switch checked={checked} onChange={setChecked} />
        </div>
        <p className={styles.status}>상태: {checked ? '켜짐' : '꺼짐'}</p>
      </div>
    </div>
  );
}

export function DemoSwitchDisabled() {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.switchWrapper}>
          <Switch disabled />
        </div>
        <div className={styles.switchWrapper}>
          <Switch disabled defaultChecked />
        </div>
      </div>
    </div>
  );
}

export function DemoSwitchSizes() {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.switchWrapper}>
          <Switch size="small" />
        </div>
        <div className={styles.switchWrapper}>
          <Switch size="medium" />
        </div>
        <div className={styles.switchWrapper}>
          <Switch size="large" />
        </div>
      </div>
    </div>
  );
}

export function DemoSwitchWithLabel() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.switchWrapper}>
          <Switch checked={checked1} onChange={setChecked1}>
            알림 받기
          </Switch>
        </div>
        <div className={styles.switchWrapper}>
          <Switch checked={checked2} onChange={setChecked2}>
            자동 저장
          </Switch>
        </div>
      </div>
    </div>
  );
}

export function DemoSwitchLoading() {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (newChecked: boolean) => {
    if (!newChecked) {
      // 꺼지는 것은 즉시 반영
      setChecked(false);
      return;
    }
    // 켜지는 것은 로딩 후 반영
    setLoading(true);
    setTimeout(() => {
      setChecked(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.switchWrapper}>
          <Switch checked={checked} onChange={handleChange} loading={loading} />
        </div>
        <p className={styles.status}>
          {loading ? '처리 중...' : checked ? '켜짐' : '꺼짐'}
        </p>
      </div>
    </div>
  );
}

export function DemoSwitchEvent() {
  const [checked, setChecked] = useState(false);
  const [eventLog, setEventLog] = useState<string[]>([]);

  const handleChange = (newChecked: boolean) => {
    setChecked(newChecked);
    setEventLog((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Switch changed to: ${newChecked ? '켜짐' : '꺼짐'}`,
    ]);
  };

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.switchWrapper}>
          <Switch checked={checked} onChange={handleChange}>
            이벤트 테스트
          </Switch>
        </div>
        <p className={styles.status}>상태: {checked ? '켜짐' : '꺼짐'}</p>
        {eventLog.length > 0 && (
          <div
            style={{
              marginTop: 'var(--spacing-base)',
              padding: 'var(--spacing-base)',
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-md)',
              maxHeight: '200px',
              overflowY: 'auto',
            }}
          >
            <p
              style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: '600',
                marginBottom: 'var(--spacing-sm)',
              }}
            >
              이벤트 로그:
            </p>
            {eventLog.map((log, index) => (
              <p
                key={index}
                style={{
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-text-secondary)',
                  margin: 'var(--spacing-xs) 0',
                }}
              >
                {log}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function DemoSwitchShape() {
  const [roundChecked, setRoundChecked] = useState(true);
  const [squareChecked, setSquareChecked] = useState(false);

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
            <p className={styles.sectionTitle}>Round (기본값)</p>
            <div className={styles.switchWrapper}>
              <Switch checked={roundChecked} onChange={setRoundChecked} round />
            </div>
          </div>
          <div>
            <p className={styles.sectionTitle}>Square</p>
            <div className={styles.switchWrapper}>
              <Switch
                checked={squareChecked}
                onChange={setSquareChecked}
                round={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DemoSwitchCustomColors() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

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
            <p className={styles.sectionTitle}>기본 색상</p>
            <div className={styles.switchWrapper}>
              <Switch checked={checked1} onChange={setChecked1} />
            </div>
          </div>
          <div>
            <p className={styles.sectionTitle}>커스텀 색상 (Success)</p>
            <div className={styles.switchWrapper}>
              <Switch
                checked={checked2}
                onChange={setChecked2}
                railColor="var(--color-border)"
                railColorActive="var(--color-semantic-success)"
              />
            </div>
          </div>
          <div>
            <p className={styles.sectionTitle}>커스텀 색상 (Warning)</p>
            <div className={styles.switchWrapper}>
              <Switch
                checked={checked3}
                onChange={setChecked3}
                railColor="var(--color-border)"
                railColorActive="var(--color-semantic-warning)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DemoSwitchCustomIcon() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

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
            <p className={styles.sectionTitle}>Check / X 아이콘</p>
            <div className={styles.switchWrapper}>
              <Switch
                checked={checked1}
                onChange={setChecked1}
                checkedIcon={Check}
                uncheckedIcon={X}
              />
            </div>
          </div>
          <div>
            <p className={styles.sectionTitle}>Moon / Sun 아이콘</p>
            <div className={styles.switchWrapper}>
              <Switch
                checked={checked2}
                onChange={setChecked2}
                checkedIcon={Sun}
                uncheckedIcon={Moon}
              >
                다크 모드
              </Switch>
            </div>
          </div>
          <div>
            <p className={styles.sectionTitle}>Wifi / WifiOff 아이콘</p>
            <div className={styles.switchWrapper}>
              <Switch
                checked={checked3}
                onChange={setChecked3}
                checkedIcon={Wifi}
                uncheckedIcon={WifiOff}
              >
                Wi-Fi
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
