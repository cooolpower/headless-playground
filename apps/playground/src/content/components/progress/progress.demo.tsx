'use client';

import { useState, createContext, useContext } from 'react';
import { Progress } from '@repo/ui';
import { Input } from '@repo/ui';
import { Select } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import type { SelectOption } from '@repo/ui';
import * as styles from './progress.demo.css';

// Progress Controls Context
interface ProgressControlsContextType {
  injectStyles: boolean;
  setInjectStyles: (injectStyles: boolean) => void;
  percent: number;
  setPercent: (percent: number) => void;
  type: 'line' | 'circle';
  setType: (type: 'line' | 'circle') => void;
  status: 'normal' | 'success' | 'warning' | 'error' | undefined;
  setStatus: (
    status: 'normal' | 'success' | 'warning' | 'error' | undefined,
  ) => void;
  showInfo: boolean;
  setShowInfo: (showInfo: boolean) => void;
  width: number;
  setWidth: (width: number) => void;
}

const ProgressControlsContext =
  createContext<ProgressControlsContextType | null>(null);

// Provider
export function DemoProgressBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [injectStyles, setInjectStyles] = useState(true);
  const [percent, setPercent] = useState(50);
  const [type, setType] = useState<'line' | 'circle'>('line');
  const [status, setStatus] = useState<
    'normal' | 'success' | 'warning' | 'error' | undefined
  >(undefined);
  const [showInfo, setShowInfo] = useState(true);
  const [width, setWidth] = useState(80);

  return (
    <ProgressControlsContext.Provider
      value={{
        injectStyles,
        setInjectStyles,
        percent,
        setPercent,
        type,
        setType,
        status,
        setStatus,
        showInfo,
        setShowInfo,
        width,
        setWidth,
      }}
    >
      {children}
    </ProgressControlsContext.Provider>
  );
}

// 기본 Progress (컨트롤러와 함께 사용될 컴포넌트)
export function DemoProgressBasicWithControls() {
  const context = useContext(ProgressControlsContext);
  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const { injectStyles, percent, type, status, showInfo, width } = context;

  return (
    <div
      className={`${styles.container} ${!injectStyles ? styles.progressWrapperClass : ''}`}
    >
      <div
        className={type === 'line' ? styles.progressItem : styles.circleCenter}
      >
        {type === 'line' ? (
          <>
            <div className={styles.header}>
              <span className={styles.label}>Progress</span>
              {showInfo && (
                <span className={styles.percentageDefault}>{percent}%</span>
              )}
            </div>
            <Progress
              injectStyles={injectStyles}
              percent={percent}
              type="line"
              status={status}
              showInfo={showInfo}
            />
          </>
        ) : (
          <>
            <Progress
              injectStyles={injectStyles}
              percent={percent}
              type="circle"
              width={width}
              status={status}
              showInfo={showInfo}
            />
            <p className={styles.circleText}>Progress</p>
          </>
        )}
      </div>
    </div>
  );
}

// Progress Controls
export function DemoProgressBasicControls() {
  const context = useContext(ProgressControlsContext);

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    injectStyles,
    setInjectStyles,
    percent,
    setPercent,
    type,
    setType,
    status,
    setStatus,
    showInfo,
    setShowInfo,
    width,
    setWidth,
  } = context;

  return (
    <Controls
      items={[
        {
          label: 'Inject Styles',
          control: (
            <Checkbox
              checked={injectStyles}
              onChange={(checked) => setInjectStyles(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '진행률 (Percent)',
          control: (
            <Input
              type="range"
              min={0}
              max={100}
              value={percent.toString()}
              onChange={(val) => setPercent(Number(val) || 0)}
              size="small"
              inputStyle={{ width: '100%' }}
            />
          ),
        },
        {
          label: 'Percent 값',
          control: (
            <Input
              type="number"
              value={percent.toString()}
              onChange={(val) =>
                setPercent(Math.min(100, Math.max(0, Number(val) || 0)))
              }
              placeholder="0-100"
              size="small"
            />
          ),
        },
        {
          label: '타입 (Type)',
          control: (
            <Select
              options={[
                { label: 'Line', value: 'line' },
                { label: 'Circle', value: 'circle' },
              ]}
              value={type}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  setType(val as typeof type);
                }
              }}
              placeholder="타입 선택"
              size="small"
            />
          ),
        },
        {
          label: '상태 (Status)',
          control: (
            <Select
              options={[
                { label: 'Normal', value: 'normal' },
                { label: 'Success', value: 'success' },
                { label: 'Warning', value: 'warning' },
                { label: 'Error', value: 'error' },
              ]}
              value={status || 'normal'}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  setStatus(
                    val === 'normal'
                      ? undefined
                      : (val as 'success' | 'warning' | 'error'),
                  );
                }
              }}
              placeholder="상태 선택"
              size="small"
            />
          ),
        },
        {
          label: '정보 표시 (Show Info)',
          control: (
            <Checkbox
              checked={showInfo}
              onChange={(checked) => setShowInfo(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '너비 (Width) - Circle만 적용',
          control: (
            <Input
              type="number"
              value={width.toString()}
              onChange={(val) =>
                setWidth(Math.min(200, Math.max(20, Number(val) || 20)))
              }
              placeholder="20-200"
              disabled={type === 'line'}
              size="small"
            />
          ),
        },
      ]}
    />
  );
}

// 기존 예제들 (props 조합으로만 차별화)
export function DemoProgressLine() {
  return (
    <div className={styles.container}>
      <div className={styles.progressItem}>
        <div className={styles.header}>
          <span className={styles.label}>File Upload</span>
          <span className={styles.percentageDefault}>65%</span>
        </div>
        <Progress percent={65} type="line" />
      </div>

      <div className={styles.progressItem}>
        <div className={styles.header}>
          <span className={styles.label}>Processing</span>
          <span className={styles.percentageSuccess}>80%</span>
        </div>
        <Progress percent={80} type="line" status="success" />
      </div>

      <div className={styles.progressItem}>
        <div className={styles.header}>
          <span className={styles.label}>Transferring</span>
          <span className={styles.percentageWarning}>45%</span>
        </div>
        <Progress percent={45} type="line" status="warning" />
      </div>

      <div className={styles.progressItem}>
        <div className={styles.header}>
          <span className={styles.label}>Failed</span>
          <span className={styles.percentageError}>25%</span>
        </div>
        <Progress percent={25} type="line" status="error" />
      </div>
    </div>
  );
}

export function DemoProgressCircle() {
  return (
    <div className={styles.circleRow}>
      <div className={styles.circleCenter}>
        <Progress percent={75} type="circle" width={80} />
        <p className={styles.circleText}>Storage</p>
      </div>

      <div className={styles.circleCenter}>
        <Progress percent={90} type="circle" width={80} status="success" />
        <p className={styles.circleText}>Complete</p>
      </div>

      <div className={styles.circleCenter}>
        <Progress percent={60} type="circle" width={80} status="warning" />
        <p className={styles.circleText}>Warning</p>
      </div>

      <div className={styles.circleCenter}>
        <Progress percent={25} type="circle" width={80} status="error" />
        <p className={styles.circleText}>Error</p>
      </div>
    </div>
  );
}

export function DemoProgressFormat() {
  return (
    <div className={styles.circleRow}>
      <div className={styles.circleCenter}>
        <Progress
          percent={75}
          type="circle"
          width={100}
          format={(percent) => `${percent} Days`}
        />
        <p className={styles.circleText}>Remaining</p>
      </div>

      <div className={styles.circleCenter}>
        <Progress
          percent={85}
          type="circle"
          width={100}
          format={(percent) => `${percent}%`}
          status="success"
        />
        <p className={styles.circleText}>Completed</p>
      </div>
    </div>
  );
}

export function DemoProgressInteractive() {
  const [lineProgress, setLineProgress] = useState(50);
  const [circleProgress, setCircleProgress] = useState(70);

  return (
    <div className={styles.spaceY}>
      <div>
        <div className={styles.flexBetween}>
          <span className={styles.label}>Line Progress</span>
          <div className={styles.controlRow}>
            <button
              onClick={() => setLineProgress(Math.max(0, lineProgress - 10))}
              className={styles.controlButton}
              aria-label="Decrease by 10%"
            >
              -
            </button>
            <span className={styles.progressText}>{lineProgress}%</span>
            <button
              onClick={() => setLineProgress(Math.min(100, lineProgress + 10))}
              className={styles.controlButton}
              aria-label="Increase by 10%"
            >
              +
            </button>
          </div>
        </div>
        <Progress percent={lineProgress} type="line" showInfo={false} />
      </div>

      <div className={styles.circleRowMedium}>
        <div className={styles.circleCenter}>
          <div className={styles.circleItemSmall}>
            <button
              onClick={() => setCircleProgress(Math.max(0, circleProgress - 5))}
              className={styles.controlButton}
              aria-label="Decrease by 5%"
            >
              -
            </button>
            <span className={styles.circleProgressText}>{circleProgress}%</span>
            <button
              onClick={() =>
                setCircleProgress(Math.min(100, circleProgress + 5))
              }
              className={styles.controlButton}
              aria-label="Increase by 5%"
            >
              +
            </button>
          </div>
          <Progress percent={circleProgress} type="circle" width={60} />
        </div>
      </div>
    </div>
  );
}
