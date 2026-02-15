'use client';

import { useState, createContext, useContext, useMemo, useEffect } from 'react';
import { Slider } from '@repo/ui';
import type { SliderMark } from '@repo/ui';
import { Input } from '@repo/ui';
import { Select } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Icon } from '@repo/ui';
import type { SelectOption } from '@repo/ui';
import {
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Cloud,
  Gauge,
  Minus,
  Plus,
  Thermometer,
  Droplets,
  Flame,
} from 'lucide-react';
import { Controls } from '@/components/playground/controls';
import * as styles from './slider.demo.css';

// Slider Controls Context - 모든 기능을 제어할 수 있는 컨텍스트
interface SliderControlsContextType {
  // 기본 props
  size: 'small' | 'medium' | 'large';
  setSize: (size: 'small' | 'medium' | 'large') => void;
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
  vertical: boolean;
  setVertical: (vertical: boolean) => void;
  range: boolean;
  setRange: (range: boolean) => void;
  showTooltip: boolean | 'always' | 'onDrag' | 'never';
  setShowTooltip: (
    showTooltip: boolean | 'always' | 'onDrag' | 'never',
  ) => void;
  // 고급 기능
  useRailColor: boolean;
  setUseRailColor: (useRailColor: boolean) => void;
  useHandleIcon: boolean;
  setUseHandleIcon: (useHandleIcon: boolean) => void;
  useMarks: boolean;
  setUseMarks: (useMarks: boolean) => void;
  useInputControls: boolean;
  setUseInputControls: (useInputControls: boolean) => void;
  injectStyles: boolean;
  setInjectStyles: (inject: boolean) => void;
}

const SliderControlsContext = createContext<SliderControlsContextType | null>(
  null,
);

// 기본 Slider - 모든 기능을 props로 받을 수 있음
export function DemoSliderBasic({
  size: controlledSize,
  disabled: controlledDisabled,
  vertical: controlledVertical,
  range: controlledRange,
  showTooltip: controlledShowTooltip,
  useRailColor: controlledUseRailColor,
  useHandleIcon: controlledUseHandleIcon,
  useMarks: controlledUseMarks,
  useInputControls: controlledUseInputControls,
  injectStyles: controlledInjectStyles,
}: {
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  vertical?: boolean;
  range?: boolean;
  showTooltip?: boolean | 'always' | 'onDrag' | 'never';
  useRailColor?: boolean;
  useHandleIcon?: boolean;
  useMarks?: boolean;
  useInputControls?: boolean;
  injectStyles?: boolean;
} = {}) {
  const [value, setValue] = useState<number | [number, number]>(20);
  const [inputValue, setInputValue] = useState('20');
  const [inputValue1, setInputValue1] = useState('20');
  const [inputValue2, setInputValue2] = useState('80');

  // 기본값
  const size = controlledSize ?? 'medium';
  const disabled = controlledDisabled ?? false;
  const vertical = controlledVertical ?? false;
  const range = controlledRange ?? false;
  const showTooltip = controlledShowTooltip ?? false;
  const useRailColor = controlledUseRailColor ?? false;
  const useHandleIcon = controlledUseHandleIcon ?? false;
  const useMarks = controlledUseMarks ?? false;
  const useInputControls = controlledUseInputControls ?? false;
  const injectStyles = controlledInjectStyles ?? true;

  // 동적 색상 함수
  const getRailColor = (val: number) => {
    if (val < 25) return 'var(--color-semantic-success)';
    if (val < 50) return 'var(--color-semantic-info)';
    if (val < 75) return 'var(--color-semantic-warning)';
    return 'var(--color-semantic-error)';
  };

  // Marks
  const marks: SliderMark[] | undefined = useMarks
    ? [
        { value: 0, icon: VolumeX },
        { value: 25, icon: Volume2 },
        { value: 50, icon: Sun },
        { value: 75, icon: Cloud },
        { value: 100, icon: Moon },
      ]
    : undefined;

  // Input controls 핸들러
  const handleInputChange = (val: string) => {
    setInputValue(val);
    const numVal = parseInt(val, 10);
    if (!isNaN(numVal) && numVal >= 0 && numVal <= 100) {
      setValue(numVal);
    }
  };

  const handleInputBlur = () => {
    const numVal = parseInt(inputValue, 10);
    if (isNaN(numVal) || numVal < 0) {
      setValue(0);
      setInputValue('0');
    } else if (numVal > 100) {
      setValue(100);
      setInputValue('100');
    } else {
      setValue(numVal);
      setInputValue(String(numVal));
    }
  };

  const handleDecrement = () => {
    if (typeof value === 'number') {
      const newValue = Math.max(0, value - 5);
      setValue(newValue);
      setInputValue(String(newValue));
    }
  };

  const handleIncrement = () => {
    if (typeof value === 'number') {
      const newValue = Math.min(100, value + 5);
      setValue(newValue);
      setInputValue(String(newValue));
    }
  };

  // Range 슬라이더용 핸들러
  const handleInput1Change = (val: string) => {
    setInputValue1(val);
    const numVal = parseInt(val, 10);
    if (!isNaN(numVal) && numVal >= 0 && numVal <= 100) {
      const currentValue = Array.isArray(value) ? value : [20, 80];
      if (numVal < currentValue[1]) {
        setValue([numVal, currentValue[1]]);
      }
    }
  };

  const handleInput2Change = (val: string) => {
    setInputValue2(val);
    const numVal = parseInt(val, 10);
    if (!isNaN(numVal) && numVal >= 0 && numVal <= 100) {
      const currentValue = Array.isArray(value) ? value : [20, 80];
      if (numVal > currentValue[0]) {
        setValue([currentValue[0], numVal]);
      }
    }
  };

  const handleInput1Blur = () => {
    const numVal = parseInt(inputValue1, 10);
    const currentValue = Array.isArray(value) ? value : [20, 80];
    if (isNaN(numVal) || numVal < 0) {
      setValue([0, currentValue[1]]);
      setInputValue1('0');
    } else if (numVal >= currentValue[1]) {
      setValue([currentValue[1] - 1, currentValue[1]]);
      setInputValue1(String(currentValue[1] - 1));
    } else {
      setValue([numVal, currentValue[1]]);
      setInputValue1(String(numVal));
    }
  };

  const handleInput2Blur = () => {
    const numVal = parseInt(inputValue2, 10);
    const currentValue = Array.isArray(value) ? value : [20, 80];
    if (isNaN(numVal) || numVal > 100) {
      setValue([currentValue[0], 100]);
      setInputValue2('100');
    } else if (numVal <= currentValue[0]) {
      setValue([currentValue[0], currentValue[0] + 1]);
      setInputValue2(String(currentValue[0] + 1));
    } else {
      setValue([currentValue[0], numVal]);
      setInputValue2(String(numVal));
    }
  };

  const handleDecrement1 = () => {
    if (Array.isArray(value)) {
      const newValue = Math.max(0, value[0] - 5);
      if (newValue < value[1]) {
        setValue([newValue, value[1]]);
        setInputValue1(String(newValue));
      }
    }
  };

  const handleIncrement1 = () => {
    if (Array.isArray(value)) {
      const newValue = Math.min(value[1] - 1, value[0] + 5);
      setValue([newValue, value[1]]);
      setInputValue1(String(newValue));
    }
  };

  const handleDecrement2 = () => {
    if (Array.isArray(value)) {
      const newValue = Math.max(value[0] + 1, value[1] - 5);
      setValue([value[0], newValue]);
      setInputValue2(String(newValue));
    }
  };

  const handleIncrement2 = () => {
    if (Array.isArray(value)) {
      const newValue = Math.min(100, value[1] + 5);
      setValue([value[0], newValue]);
      setInputValue2(String(newValue));
    }
  };

  // Range 슬라이더로 변경 시 값 초기화
  useEffect(() => {
    if (range && typeof value === 'number') {
      setValue([20, 80]);
      setInputValue1('20');
      setInputValue2('80');
    }
    if (!range && Array.isArray(value)) {
      setValue(value[0]);
      setInputValue(String(value[0]));
    }
  }, [range]);

  const displayValue = Array.isArray(value)
    ? `${value[0]} ~ ${value[1]}`
    : String(value);

  return (
    <div
      className={`${styles.section} ${!injectStyles ? styles.sliderWrapperClass : ''}`}
    >
      <div className={styles.content}>
        {/* Input Controls */}
        {useInputControls && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '16px',
              flexDirection: vertical ? 'column' : 'row',
              flexWrap: 'wrap',
            }}
          >
            {range ? (
              <>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <span style={{ fontSize: '14px', minWidth: '60px' }}>
                    최소값:
                  </span>
                  <button
                    onClick={handleDecrement1}
                    disabled={Array.isArray(value) && value[0] <= 0}
                    style={{
                      padding: '8px',
                      border: '1px solid oklch(90.0% 0.003 264.5)',
                      borderRadius: '4px',
                      backgroundColor: 'white',
                      cursor:
                        Array.isArray(value) && value[0] <= 0
                          ? 'not-allowed'
                          : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon icon={Minus} size="small" />
                  </button>
                  <Input
                    value={inputValue1}
                    onChange={handleInput1Change}
                    onBlur={handleInput1Blur}
                    style={{ width: '80px', textAlign: 'center' }}
                  />
                  <button
                    onClick={handleIncrement1}
                    disabled={
                      Array.isArray(value) && value[0] >= (value[1] ?? 100) - 1
                    }
                    style={{
                      padding: '8px',
                      border: '1px solid oklch(90.0% 0.003 264.5)',
                      borderRadius: '4px',
                      backgroundColor: 'white',
                      cursor:
                        Array.isArray(value) &&
                        value[0] >= (value[1] ?? 100) - 1
                          ? 'not-allowed'
                          : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon icon={Plus} size="small" />
                  </button>
                </div>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <span style={{ fontSize: '14px', minWidth: '60px' }}>
                    최대값:
                  </span>
                  <button
                    onClick={handleDecrement2}
                    disabled={
                      Array.isArray(value) && value[1] <= (value[0] ?? 0) + 1
                    }
                    style={{
                      padding: '8px',
                      border: '1px solid oklch(90.0% 0.003 264.5)',
                      borderRadius: '4px',
                      backgroundColor: 'white',
                      cursor:
                        Array.isArray(value) && value[1] <= (value[0] ?? 0) + 1
                          ? 'not-allowed'
                          : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon icon={Minus} size="small" />
                  </button>
                  <Input
                    value={inputValue2}
                    onChange={handleInput2Change}
                    onBlur={handleInput2Blur}
                    style={{ width: '80px', textAlign: 'center' }}
                  />
                  <button
                    onClick={handleIncrement2}
                    disabled={Array.isArray(value) && value[1] >= 100}
                    style={{
                      padding: '8px',
                      border: '1px solid oklch(90.0% 0.003 264.5)',
                      borderRadius: '4px',
                      backgroundColor: 'white',
                      cursor:
                        Array.isArray(value) && value[1] >= 100
                          ? 'not-allowed'
                          : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon icon={Plus} size="small" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={handleDecrement}
                  disabled={typeof value === 'number' && value <= 0}
                  style={{
                    padding: '8px',
                    border: '1px solid oklch(90.0% 0.003 264.5)',
                    borderRadius: '4px',
                    backgroundColor: 'white',
                    cursor:
                      typeof value === 'number' && value <= 0
                        ? 'not-allowed'
                        : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon icon={Minus} size="small" />
                </button>
                <Input
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  style={{ width: '80px', textAlign: 'center' }}
                />
                <button
                  onClick={handleIncrement}
                  disabled={typeof value === 'number' && value >= 100}
                  style={{
                    padding: '8px',
                    border: '1px solid oklch(90.0% 0.003 264.5)',
                    borderRadius: '4px',
                    backgroundColor: 'white',
                    cursor:
                      typeof value === 'number' && value >= 100
                        ? 'not-allowed'
                        : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon icon={Plus} size="small" />
                </button>
              </>
            )}
          </div>
        )}

        {/* Slider */}
        <div style={vertical ? { height: '200px', width: '40px' } : undefined}>
          <Slider
            value={value}
            onChange={(val) => {
              setValue(val);
              if (typeof val === 'number') {
                setInputValue(String(val));
              } else {
                setInputValue1(String(val[0]));
                setInputValue2(String(val[1]));
              }
            }}
            min={0}
            max={100}
            step={1}
            size={size}
            disabled={disabled}
            vertical={vertical}
            range={range}
            showTooltip={showTooltip}
            railColor={useRailColor ? getRailColor : undefined}
            handleIcon={useHandleIcon ? Gauge : undefined}
            marks={marks}
          />
        </div>
        <p className={styles.status}>값: {displayValue}</p>
      </div>
    </div>
  );
}

// Provider 컴포넌트
export function DemoSliderBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [disabled, setDisabled] = useState(false);
  const [vertical, setVertical] = useState(false);
  const [range, setRange] = useState(false);
  const [showTooltip, setShowTooltip] = useState<
    boolean | 'always' | 'onDrag' | 'never'
  >(false);
  const [useRailColor, setUseRailColor] = useState(false);
  const [useHandleIcon, setUseHandleIcon] = useState(false);
  const [useMarks, setUseMarks] = useState(false);
  const [useInputControls, setUseInputControls] = useState(false);
  const [injectStyles, setInjectStyles] = useState(true);

  const contextValue = useMemo(
    () => ({
      size,
      setSize,
      disabled,
      setDisabled,
      vertical,
      setVertical,
      range,
      setRange,
      showTooltip,
      setShowTooltip,
      useRailColor,
      setUseRailColor,
      useHandleIcon,
      setUseHandleIcon,
      useMarks,
      setUseMarks,
      useInputControls,
      setUseInputControls,
      injectStyles,
      setInjectStyles,
    }),
    [
      size,
      disabled,
      vertical,
      range,
      showTooltip,
      useRailColor,
      useHandleIcon,
      useMarks,
      useInputControls,
      injectStyles,
    ],
  );

  return (
    <SliderControlsContext.Provider value={contextValue}>
      {children}
    </SliderControlsContext.Provider>
  );
}

// Preview 컴포넌트
export function DemoSliderBasicWithControls() {
  const context = useContext(SliderControlsContext);
  if (!context) {
    return <DemoSliderBasic />;
  }

  const {
    size,
    disabled,
    vertical,
    range,
    showTooltip,
    useRailColor,
    useHandleIcon,
    useMarks,
    useInputControls,
    injectStyles,
  } = context;

  return (
    <DemoSliderBasic
      size={size}
      disabled={disabled}
      vertical={vertical}
      range={range}
      showTooltip={showTooltip}
      useRailColor={useRailColor}
      useHandleIcon={useHandleIcon}
      useMarks={useMarks}
      useInputControls={useInputControls}
      injectStyles={injectStyles}
    />
  );
}

// Controls 컴포넌트
export function DemoSliderBasicControls() {
  const context = useContext(SliderControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    size,
    setSize,
    disabled,
    setDisabled,
    vertical,
    setVertical,
    range,
    setRange,
    showTooltip,
    setShowTooltip,
    useRailColor,
    setUseRailColor,
    useHandleIcon,
    setUseHandleIcon,
    useMarks,
    setUseMarks,
    useInputControls,
    setUseInputControls,
    injectStyles,
    setInjectStyles,
  } = context;

  return (
    <Controls
      items={[
        {
          label: 'Size',
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
                  setSize(val as 'small' | 'medium' | 'large');
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
          label: 'Vertical',
          control: (
            <Checkbox
              checked={vertical}
              onChange={(checked) => setVertical(checked)}
              size="small"
            >
              세로 슬라이더
            </Checkbox>
          ),
        },
        {
          label: 'Range',
          control: (
            <Checkbox
              checked={range}
              onChange={(checked) => setRange(checked)}
              size="small"
            >
              범위 슬라이더
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
          label: 'Show Tooltip',
          control: (
            <Select
              options={[
                { label: 'Never', value: 'never' },
                { label: 'On Drag', value: 'onDrag' },
                { label: 'Always', value: 'always' },
              ]}
              value={
                showTooltip === true
                  ? 'onDrag'
                  : showTooltip === 'always'
                    ? 'always'
                    : showTooltip === 'onDrag'
                      ? 'onDrag'
                      : 'never'
              }
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  if (val === 'always') setShowTooltip('always');
                  else if (val === 'onDrag') setShowTooltip('onDrag');
                  else setShowTooltip('never');
                }
              }}
              placeholder="Tooltip 표시 옵션"
              size="small"
            />
          ),
        },
        {
          label: 'Rail Color',
          control: (
            <Checkbox
              checked={useRailColor}
              onChange={(checked) => setUseRailColor(checked)}
              size="small"
            >
              동적 색상
            </Checkbox>
          ),
        },
        {
          label: 'Handle Icon',
          control: (
            <Checkbox
              checked={useHandleIcon}
              onChange={(checked) => setUseHandleIcon(checked)}
              size="small"
            >
              핸들 아이콘
            </Checkbox>
          ),
        },
        {
          label: 'Marks',
          control: (
            <Checkbox
              checked={useMarks}
              onChange={(checked) => setUseMarks(checked)}
              size="small"
            >
              마크 표시
            </Checkbox>
          ),
        },
        {
          label: 'Input Controls',
          control: (
            <Checkbox
              checked={useInputControls}
              onChange={(checked) => setUseInputControls(checked)}
              size="small"
            >
              입력/버튼 조절
            </Checkbox>
          ),
        },
      ]}
    />
  );
}

// 기존 예제들은 props 조합으로만 차별화
// With Default Value
export function DemoSliderDefaultValue() {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <Slider defaultValue={50} min={0} max={100} step={1} />
        <p className={styles.status}>기본값: 50</p>
      </div>
    </div>
  );
}

// Step
export function DemoSliderStep() {
  const [value, setValue] = useState(0);

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <Slider
          value={value}
          onChange={(val) => {
            if (typeof val === 'number') {
              setValue(val);
            }
          }}
          min={0}
          max={100}
          step={10}
        />
        <p className={styles.status}>값: {value} (step: 10)</p>
      </div>
    </div>
  );
}

// Disabled
export function DemoSliderDisabled() {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <Slider value={50} min={0} max={100} step={1} disabled />
        <p className={styles.status}>비활성화됨</p>
      </div>
    </div>
  );
}

// Sizes
export function DemoSliderSizes() {
  const [smallValue, setSmallValue] = useState(30);
  const [mediumValue, setMediumValue] = useState(50);
  const [largeValue, setLargeValue] = useState(70);

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.sizeGroup}>
          <div className={styles.sizeItem}>
            <p className={styles.sizeLabel}>Small</p>
            <Slider
              value={smallValue}
              onChange={(val) => {
                if (typeof val === 'number') {
                  setSmallValue(val);
                }
              }}
              min={0}
              max={100}
              step={1}
              size="small"
            />
            <p className={styles.status}>값: {smallValue}</p>
          </div>
          <div className={styles.sizeItem}>
            <p className={styles.sizeLabel}>Medium</p>
            <Slider
              value={mediumValue}
              onChange={(val) => {
                if (typeof val === 'number') {
                  setMediumValue(val);
                }
              }}
              min={0}
              max={100}
              step={1}
              size="medium"
            />
            <p className={styles.status}>값: {mediumValue}</p>
          </div>
          <div className={styles.sizeItem}>
            <p className={styles.sizeLabel}>Large</p>
            <Slider
              value={largeValue}
              onChange={(val) => {
                if (typeof val === 'number') {
                  setLargeValue(val);
                }
              }}
              min={0}
              max={100}
              step={1}
              size="large"
            />
            <p className={styles.status}>값: {largeValue}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Min/Max
export function DemoSliderMinMax() {
  const [value, setValue] = useState(25);

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <Slider
          value={value}
          onChange={(val) => {
            if (typeof val === 'number') {
              setValue(val);
            }
          }}
          min={10}
          max={50}
          step={1}
        />
        <p className={styles.status}>값: {value} (범위: 10 ~ 50)</p>
      </div>
    </div>
  );
}

// Controlled
export function DemoSliderControlled() {
  const [value, setValue] = useState(30);

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <Slider
          value={value}
          onChange={(val) => {
            if (typeof val === 'number') {
              setValue(val);
            }
          }}
          min={0}
          max={100}
          step={1}
        />
        <div className={styles.controlGroup}>
          <button
            className={styles.button}
            onClick={() => setValue(Math.max(0, value - 10))}
          >
            -10
          </button>
          <button
            className={styles.button}
            onClick={() => setValue(Math.min(100, value + 10))}
          >
            +10
          </button>
          <button className={styles.button} onClick={() => setValue(0)}>
            Reset
          </button>
        </div>
        <p className={styles.status}>값: {value}</p>
      </div>
    </div>
  );
}

// onChangeComplete
export function DemoSliderOnChangeComplete() {
  const [value, setValue] = useState(20);
  const [completedValue, setCompletedValue] = useState<number | null>(null);

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <p
          style={{
            marginBottom: '16px',
            fontSize: '14px',
            color: 'oklch(55.1% 0.023 264.4)',
          }}
        >
          드래그 중에는 "현재 값"이 계속 업데이트되고, 마우스를 놓으면 "드래그
          완료 시 값"이 업데이트됩니다.
        </p>
        <Slider
          value={value}
          onChange={(val) => {
            if (typeof val === 'number') {
              setValue(val);
            }
          }}
          onChangeComplete={(val) => {
            if (typeof val === 'number') {
              setCompletedValue(val);
            }
          }}
          min={0}
          max={100}
          step={1}
        />
        <p className={styles.status}>현재 값 (드래그 중 계속 변경): {value}</p>
        {completedValue !== null && (
          <p className={styles.completed}>
            드래그 완료 시 값 (마우스를 놓았을 때): {completedValue}
          </p>
        )}
      </div>
    </div>
  );
}

// With Tooltip
export function DemoSliderWithTooltip() {
  const [value, setValue] = useState(30);

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <Slider
          value={value}
          onChange={(val) => {
            if (typeof val === 'number') {
              setValue(val);
            }
          }}
          min={0}
          max={100}
          step={1}
          showTooltip
        />
        <p className={styles.status}>값: {value} (드래그 시 툴팁 표시)</p>
      </div>
    </div>
  );
}

// With Marks
export function DemoSliderWithMarks() {
  const [value, setValue] = useState(50);

  const marks: SliderMark[] = [
    { value: 0, label: '0' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 75, label: '75' },
    { value: 100, label: '100' },
  ];

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <Slider
          value={value}
          onChange={(val) => {
            if (typeof val === 'number') {
              setValue(val);
            }
          }}
          min={0}
          max={100}
          step={1}
          marks={marks}
        />
        <p className={styles.status}>값: {value}</p>
      </div>
    </div>
  );
}

// With Marks and Tooltip
export function DemoSliderWithMarksAndTooltip() {
  const [value, setValue] = useState(50);

  const marks: SliderMark[] = [
    { value: 0, label: '0%' },
    { value: 50, label: '50%' },
    { value: 100, label: '100%' },
  ];

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <Slider
          value={value}
          onChange={(val) => {
            if (typeof val === 'number') {
              setValue(val);
            }
          }}
          min={0}
          max={100}
          step={1}
          marks={marks}
          showTooltip
          tooltipFormatter={(val) => `${val}%`}
        />
        <p className={styles.status}>값: {value}%</p>
      </div>
    </div>
  );
}

// Custom Tooltip Format
export function DemoSliderCustomTooltip() {
  const [value, setValue] = useState(30);

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <Slider
          value={value}
          onChange={(val) => {
            if (typeof val === 'number') {
              setValue(val);
            }
          }}
          min={0}
          max={100}
          step={1}
          showTooltip
          tooltipFormatter={(val) => `$${val}`}
        />
        <p className={styles.status}>값: ${value}</p>
      </div>
    </div>
  );
}

// Dynamic Rail Color (수치에 따라 레일 색상 변화) - props 조합 예제
export function DemoSliderDynamicRailColor() {
  const [value, setValue] = useState(50);

  const getRailColor = (val: number) => {
    if (val < 25) return 'oklch(70% 0.15 120)'; // 초록색
    if (val < 50) return 'oklch(75% 0.15 180)'; // 청록색
    if (val < 75) return 'oklch(70% 0.15 240)'; // 파란색
    return 'oklch(65% 0.20 30)'; // 주황색
  };

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <Slider
          value={value}
          onChange={(val) => {
            if (typeof val === 'number') {
              setValue(val);
            }
          }}
          min={0}
          max={100}
          step={1}
          railColor={getRailColor}
          showTooltip="always"
        />
        <p className={styles.status}>값: {value} (색상이 값에 따라 변화)</p>
      </div>
    </div>
  );
}

// Vertical Slider (세로 슬라이더) - props 조합 예제
export function DemoSliderVertical() {
  const [value, setValue] = useState(50);

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <div>
            <p className={styles.status} style={{ marginBottom: '16px' }}>
              세로 슬라이더
            </p>
            <div style={{ height: '200px', width: '40px' }}>
              <Slider
                value={value}
                onChange={(val) => {
                  if (typeof val === 'number') {
                    setValue(val);
                  }
                }}
                min={0}
                max={100}
                step={1}
                vertical
                showTooltip="always"
              />
            </div>
            <p className={styles.status} style={{ marginTop: '16px' }}>
              값: {value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Vertical Slider with Dynamic Rail Color (세로 슬라이더 + 동적 색상) - props 조합 예제
export function DemoSliderVerticalDynamicColor() {
  const [value, setValue] = useState(50);

  const getRailColor = (val: number) => {
    if (val < 25) return 'oklch(70% 0.15 120)'; // 초록색
    if (val < 50) return 'oklch(75% 0.15 180)'; // 청록색
    if (val < 75) return 'oklch(70% 0.15 240)'; // 파란색
    return 'oklch(65% 0.20 30)'; // 주황색
  };

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <div>
            <p className={styles.status} style={{ marginBottom: '16px' }}>
              세로 슬라이더 (동적 색상)
            </p>
            <div style={{ height: '200px', width: '40px' }}>
              <Slider
                value={value}
                onChange={(val) => {
                  if (typeof val === 'number') {
                    setValue(val);
                  }
                }}
                min={0}
                max={100}
                step={1}
                vertical
                railColor={getRailColor}
                showTooltip="always"
              />
            </div>
            <p className={styles.status} style={{ marginTop: '16px' }}>
              값: {value} (색상이 값에 따라 변화)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Vertical Slider with Input and Buttons (세로 슬라이더 + 입력/버튼) - props 조합 예제
export function DemoSliderVerticalWithControls() {
  const [value, setValue] = useState(50);
  const [inputValue, setInputValue] = useState('50');

  const handleInputChange = (val: string) => {
    setInputValue(val);
    const numVal = parseInt(val, 10);
    if (!isNaN(numVal) && numVal >= 0 && numVal <= 100) {
      setValue(numVal);
    }
  };

  const handleInputBlur = () => {
    const numVal = parseInt(inputValue, 10);
    if (isNaN(numVal) || numVal < 0) {
      setValue(0);
      setInputValue('0');
    } else if (numVal > 100) {
      setValue(100);
      setInputValue('100');
    } else {
      setValue(numVal);
      setInputValue(String(numVal));
    }
  };

  const handleDecrement = () => {
    const newValue = Math.max(0, value - 5);
    setValue(newValue);
    setInputValue(String(newValue));
  };

  const handleIncrement = () => {
    const newValue = Math.min(100, value + 5);
    setValue(newValue);
    setInputValue(String(newValue));
  };

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div
          style={{
            display: 'flex',
            gap: '32px',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <p className={styles.status}>세로 슬라이더 (입력/버튼 조절)</p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <button
                onClick={handleIncrement}
                disabled={value >= 100}
                style={{
                  padding: '8px',
                  border: '1px solid oklch(90.0% 0.003 264.5)',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                  cursor: value >= 100 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon icon={Plus} size="small" />
              </button>
              <Input
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                style={{ width: '80px', textAlign: 'center' }}
              />
              <button
                onClick={handleDecrement}
                disabled={value <= 0}
                style={{
                  padding: '8px',
                  border: '1px solid oklch(90.0% 0.003 264.5)',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                  cursor: value <= 0 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon icon={Minus} size="small" />
              </button>
            </div>
            <div style={{ height: '200px', width: '40px' }}>
              <Slider
                value={value}
                onChange={(val) => {
                  if (typeof val === 'number') {
                    setValue(val);
                    setInputValue(String(val));
                  }
                }}
                min={0}
                max={100}
                step={1}
                vertical
                showTooltip="always"
              />
            </div>
            <p className={styles.status}>값: {value}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Marks with Icons (마커에 아이콘 사용) - props 조합 예제
export function DemoSliderMarksWithIcons() {
  const [value, setValue] = useState(50);

  const marks: SliderMark[] = [
    { value: 0, icon: VolumeX },
    { value: 25, icon: Volume2 },
    { value: 50, icon: Sun },
    { value: 75, icon: Cloud },
    { value: 100, icon: Moon },
  ];

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <Slider
          value={value}
          onChange={(val) => {
            if (typeof val === 'number') {
              setValue(val);
            }
          }}
          min={0}
          max={100}
          step={1}
          marks={marks}
          showTooltip="always"
        />
        <p className={styles.status}>값: {value}</p>
      </div>
    </div>
  );
}

// Handle with Icon (핸들에 아이콘 표시) - props 조합 예제
export function DemoSliderHandleWithIcon() {
  const [value, setValue] = useState(50);

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <Slider
          value={value}
          onChange={(val) => {
            if (typeof val === 'number') {
              setValue(val);
            }
          }}
          min={0}
          max={100}
          step={1}
          handleIcon={Gauge}
          showTooltip="always"
        />
        <p className={styles.status}>값: {value}</p>
      </div>
    </div>
  );
}

// Customize Handle with Input and Buttons (입력과 버튼으로 값 조절) - props 조합 예제
export function DemoSliderCustomizeHandle() {
  const [value, setValue] = useState(50);
  const [inputValue, setInputValue] = useState('50');

  const handleInputChange = (val: string) => {
    setInputValue(val);
    const numVal = parseInt(val, 10);
    if (!isNaN(numVal) && numVal >= 0 && numVal <= 100) {
      setValue(numVal);
    }
  };

  const handleInputBlur = () => {
    const numVal = parseInt(inputValue, 10);
    if (isNaN(numVal) || numVal < 0) {
      setValue(0);
      setInputValue('0');
    } else if (numVal > 100) {
      setValue(100);
      setInputValue('100');
    } else {
      setValue(numVal);
      setInputValue(String(numVal));
    }
  };

  const handleDecrement = () => {
    const newValue = Math.max(0, value - 5);
    setValue(newValue);
    setInputValue(String(newValue));
  };

  const handleIncrement = () => {
    const newValue = Math.min(100, value + 5);
    setValue(newValue);
    setInputValue(String(newValue));
  };

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '16px',
          }}
        >
          <button
            onClick={handleDecrement}
            disabled={value <= 0}
            style={{
              padding: '8px',
              border: '1px solid oklch(90.0% 0.003 264.5)',
              borderRadius: '4px',
              backgroundColor: 'white',
              cursor: value <= 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon icon={Minus} size="small" />
          </button>
          <Input
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            style={{ width: '80px', textAlign: 'center' }}
          />
          <button
            onClick={handleIncrement}
            disabled={value >= 100}
            style={{
              padding: '8px',
              border: '1px solid oklch(90.0% 0.003 264.5)',
              borderRadius: '4px',
              backgroundColor: 'white',
              cursor: value >= 100 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon icon={Plus} size="small" />
          </button>
        </div>
        <Slider
          value={value}
          onChange={(val) => {
            if (typeof val === 'number') {
              setValue(val);
              setInputValue(String(val));
            }
          }}
          min={0}
          max={100}
          step={1}
          showTooltip="always"
        />
        <p className={styles.status}>값: {value}</p>
      </div>
    </div>
  );
}

// Tooltip Options (툴팁 표시 옵션) - props 조합 예제
export function DemoSliderTooltipOptions() {
  const [value1, setValue1] = useState(30);
  const [value2, setValue2] = useState(50);
  const [value3, setValue3] = useState(70);

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div style={{ marginBottom: '32px' }}>
          <p className={styles.status} style={{ marginBottom: '8px' }}>
            always (항상 표시)
          </p>
          <Slider
            value={value1}
            onChange={(val) => {
              if (typeof val === 'number') {
                setValue1(val);
              }
            }}
            min={0}
            max={100}
            step={1}
            showTooltip="always"
          />
        </div>
        <div style={{ marginBottom: '32px' }}>
          <p className={styles.status} style={{ marginBottom: '8px' }}>
            onDrag (드래그 시만 표시)
          </p>
          <Slider
            value={value2}
            onChange={(val) => {
              if (typeof val === 'number') {
                setValue2(val);
              }
            }}
            min={0}
            max={100}
            step={1}
            showTooltip="onDrag"
          />
        </div>
        <div>
          <p className={styles.status} style={{ marginBottom: '8px' }}>
            never (표시 안 함)
          </p>
          <Slider
            value={value3}
            onChange={(val) => {
              if (typeof val === 'number') {
                setValue3(val);
              }
            }}
            min={0}
            max={100}
            step={1}
            showTooltip="never"
          />
        </div>
      </div>
    </div>
  );
}

// Range Slider (Range 슬라이더) - props 조합 예제
export function DemoSliderRange() {
  const [value, setValue] = useState<[number, number]>([20, 80]);

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <Slider
          value={value}
          onChange={(val) => {
            if (Array.isArray(val)) {
              setValue(val);
            }
          }}
          min={0}
          max={100}
          step={1}
          range
          showTooltip="always"
        />
        <p className={styles.status}>
          선택 범위: {value[0]} ~ {value[1]}
        </p>
      </div>
    </div>
  );
}

// Range Slider with Input and Buttons (Range 슬라이더 + 입력/버튼) - props 조합 예제
export function DemoSliderRangeWithControls() {
  const [value, setValue] = useState<[number, number]>([20, 80]);
  const [inputValue1, setInputValue1] = useState('20');
  const [inputValue2, setInputValue2] = useState('80');

  const handleInput1Change = (val: string) => {
    setInputValue1(val);
    const numVal = parseInt(val, 10);
    if (!isNaN(numVal) && numVal >= 0 && numVal <= 100 && numVal < value[1]) {
      setValue([numVal, value[1]]);
    }
  };

  const handleInput2Change = (val: string) => {
    setInputValue2(val);
    const numVal = parseInt(val, 10);
    if (!isNaN(numVal) && numVal >= 0 && numVal <= 100 && numVal > value[0]) {
      setValue([value[0], numVal]);
    }
  };

  const handleInput1Blur = () => {
    const numVal = parseInt(inputValue1, 10);
    if (isNaN(numVal) || numVal < 0) {
      setValue([0, value[1]]);
      setInputValue1('0');
    } else if (numVal >= value[1]) {
      setValue([value[1] - 1, value[1]]);
      setInputValue1(String(value[1] - 1));
    } else {
      setValue([numVal, value[1]]);
      setInputValue1(String(numVal));
    }
  };

  const handleInput2Blur = () => {
    const numVal = parseInt(inputValue2, 10);
    if (isNaN(numVal) || numVal > 100) {
      setValue([value[0], 100]);
      setInputValue2('100');
    } else if (numVal <= value[0]) {
      setValue([value[0], value[0] + 1]);
      setInputValue2(String(value[0] + 1));
    } else {
      setValue([value[0], numVal]);
      setInputValue2(String(numVal));
    }
  };

  const handleDecrement1 = () => {
    const newValue = Math.max(0, value[0] - 5);
    if (newValue < value[1]) {
      setValue([newValue, value[1]]);
      setInputValue1(String(newValue));
    }
  };

  const handleIncrement1 = () => {
    const newValue = Math.min(value[1] - 1, value[0] + 5);
    setValue([newValue, value[1]]);
    setInputValue1(String(newValue));
  };

  const handleDecrement2 = () => {
    const newValue = Math.max(value[0] + 1, value[1] - 5);
    setValue([value[0], newValue]);
    setInputValue2(String(newValue));
  };

  const handleIncrement2 = () => {
    const newValue = Math.min(100, value[1] + 5);
    setValue([value[0], newValue]);
    setInputValue2(String(newValue));
  };

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '16px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '14px', minWidth: '60px' }}>최소값:</span>
            <button
              onClick={handleDecrement1}
              disabled={value[0] <= 0}
              style={{
                padding: '8px',
                border: '1px solid oklch(90.0% 0.003 264.5)',
                borderRadius: '4px',
                backgroundColor: 'white',
                cursor: value[0] <= 0 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon icon={Minus} size="small" />
            </button>
            <Input
              value={inputValue1}
              onChange={handleInput1Change}
              onBlur={handleInput1Blur}
              style={{ width: '80px', textAlign: 'center' }}
            />
            <button
              onClick={handleIncrement1}
              disabled={value[0] >= value[1] - 1}
              style={{
                padding: '8px',
                border: '1px solid oklch(90.0% 0.003 264.5)',
                borderRadius: '4px',
                backgroundColor: 'white',
                cursor: value[0] >= value[1] - 1 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon icon={Plus} size="small" />
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '14px', minWidth: '60px' }}>최대값:</span>
            <button
              onClick={handleDecrement2}
              disabled={value[1] <= value[0] + 1}
              style={{
                padding: '8px',
                border: '1px solid oklch(90.0% 0.003 264.5)',
                borderRadius: '4px',
                backgroundColor: 'white',
                cursor: value[1] <= value[0] + 1 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon icon={Minus} size="small" />
            </button>
            <Input
              value={inputValue2}
              onChange={handleInput2Change}
              onBlur={handleInput2Blur}
              style={{ width: '80px', textAlign: 'center' }}
            />
            <button
              onClick={handleIncrement2}
              disabled={value[1] >= 100}
              style={{
                padding: '8px',
                border: '1px solid oklch(90.0% 0.003 264.5)',
                borderRadius: '4px',
                backgroundColor: 'white',
                cursor: value[1] >= 100 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon icon={Plus} size="small" />
            </button>
          </div>
        </div>
        <Slider
          value={value}
          onChange={(val) => {
            if (Array.isArray(val)) {
              setValue(val);
              setInputValue1(String(val[0]));
              setInputValue2(String(val[1]));
            }
          }}
          min={0}
          max={100}
          step={1}
          range
          showTooltip="always"
        />
        <p className={styles.status}>
          선택 범위: {value[0]} ~ {value[1]}
        </p>
      </div>
    </div>
  );
}

// Range Slider with Dynamic Rail Color (Range 슬라이더 + 동적 레일 색상) - props 조합 예제
export function DemoSliderRangeDynamicColor() {
  const [value, setValue] = useState<[number, number]>([30, 70]);

  const getRailColor = (val: number) => {
    if (val < 25) return 'oklch(70% 0.15 120)'; // 초록색
    if (val < 50) return 'oklch(75% 0.15 180)'; // 청록색
    if (val < 75) return 'oklch(70% 0.15 240)'; // 파란색
    return 'oklch(65% 0.20 30)'; // 주황색
  };

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <Slider
          value={value}
          onChange={(val) => {
            if (Array.isArray(val)) {
              setValue(val);
            }
          }}
          min={0}
          max={100}
          step={1}
          range
          railColor={getRailColor}
          showTooltip="always"
        />
        <p className={styles.status}>
          선택 범위: {value[0]} ~ {value[1]} (범위 내 색상 변화)
        </p>
      </div>
    </div>
  );
}

// Temperature Slider (온도 슬라이더 예제) - props 조합 예제
export function DemoSliderTemperature() {
  const [value, setValue] = useState(25);

  const marks: SliderMark[] = [
    { value: 0, icon: Thermometer },
    { value: 25, icon: Sun },
    { value: 50, icon: Cloud },
    { value: 75, icon: Droplets },
    { value: 100, icon: Flame },
  ];

  const getRailColor = (val: number) => {
    if (val < 20) return 'oklch(70% 0.15 240)'; // 파란색 (차가움)
    if (val < 40) return 'oklch(75% 0.15 180)'; // 청록색 (시원함)
    if (val < 60) return 'oklch(70% 0.15 120)'; // 초록색 (적당함)
    if (val < 80) return 'oklch(70% 0.20 60)'; // 노란색 (따뜻함)
    return 'oklch(65% 0.25 30)'; // 주황색 (뜨거움)
  };

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <Slider
          value={value}
          onChange={(val) => {
            if (typeof val === 'number') {
              setValue(val);
            }
          }}
          min={0}
          max={100}
          step={1}
          marks={marks}
          railColor={getRailColor}
          handleIcon={Thermometer}
          showTooltip="always"
          tooltipFormatter={(val) => `${val}°C`}
        />
        <p className={styles.status}>온도: {value}°C</p>
      </div>
    </div>
  );
}
