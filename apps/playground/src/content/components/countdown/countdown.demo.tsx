'use client';

import {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import { Countdown } from '@repo/ui';
import { Button } from '@repo/ui';
import { Input } from '@repo/ui';
import { Select } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { DatePicker } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import { Icon } from '@repo/ui';
import {
  CheckCircle,
  X,
  Check,
  XCircle,
  AlertCircle,
  Info,
  Star,
  Heart,
  Trophy,
  Sparkles,
} from 'lucide-react';
import type { SelectOption } from '@repo/ui';
import type { CountdownFormatType } from '@repo/ui';
import * as styles from './countdown.demo.css';
import {
  CountdownInteractiveControls,
  CountdownInteractivePreview,
  CountdownInteractiveProvider,
} from '@/content/recipes/countdown';

function DemoCountdownBasicProviderLegacy({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CountdownInteractiveProvider>{children}</CountdownInteractiveProvider>
  );
}

function DemoCountdownBasicWithControlsLegacy() {
  return <CountdownInteractivePreview />;
}

function DemoCountdownBasicControlsLegacy() {
  return <CountdownInteractiveControls />;
}

// Countdown Controls Context
interface CountdownControlsContextType {
  seconds: number;
  setSeconds: (seconds: number) => void;
  active: boolean;
  setActive: (active: boolean) => void;
  runId: number;
  restart: () => void;
  targetMode: 'duration' | 'time' | 'date';
  setTargetMode: (mode: 'duration' | 'time' | 'date') => void;
  targetTimeOfDay: string; // HH:mm
  setTargetTimeOfDay: (value: string) => void;
  targetDate: Date | null;
  setTargetDate: (date: Date | null) => void;
  format: string;
  setFormat: (format: string) => void;
  formatType: CountdownFormatType;
  setFormatType: (formatType: CountdownFormatType) => void;
  layout: 'default' | 'custom' | 'circular' | 'flip';
  setLayout: (layout: 'default' | 'custom' | 'circular' | 'flip') => void;
  flipDigitSize: 'sm' | 'md' | 'lg' | 'xl';
  setFlipDigitSize: (size: 'sm' | 'md' | 'lg' | 'xl') => void;
  showFinishedContent: boolean;
  setShowFinishedContent: (show: boolean) => void;
  useIcon: boolean;
  setUseIcon: (use: boolean) => void;
  finishedText: string;
  setFinishedText: (text: string) => void;
  finishedTextColor: string;
  setFinishedTextColor: (color: string) => void;
  finishedIconColor: string;
  setFinishedIconColor: (color: string) => void;
  finishedIcon: string;
  setFinishedIcon: (icon: string) => void;
}

const CountdownControlsContext =
  createContext<CountdownControlsContextType | null>(null);

// 아이콘 매핑
const iconMap: Record<string, typeof CheckCircle> = {
  checkCircle: CheckCircle,
  check: Check,
  x: X,
  xCircle: XCircle,
  alertCircle: AlertCircle,
  info: Info,
  star: Star,
  heart: Heart,
  trophy: Trophy,
  sparkles: Sparkles,
};

// SVG 원형 진행 표시를 위한 유틸리티 함수들
function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  const d = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(' ');
  return d;
}

function mapNumber(
  number: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

// SVG 원형 진행 표시 컴포넌트
function SVGCircle({ radius }: { radius: number }) {
  return (
    <svg
      className={styles.countdownSvg}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100px',
        height: '100px',
      }}
    >
      <path
        fill="none"
        stroke="var(--color-brand-primary)"
        strokeWidth="4"
        d={describeArc(50, 50, 48, 0, radius)}
      />
    </svg>
  );
}

// 플립 카운트다운 단일 자리수 컴포넌트 (CodePen 스타일)
function FlipDigit({ digit }: { digit: number }) {
  const [currentDigit, setCurrentDigit] = useState(digit);
  const [nextDigit, setNextDigit] = useState(digit);
  const [isFlipping, setIsFlipping] = useState(false);
  const [phase, setPhase] = useState<'top' | 'bottom'>('top');
  const pendingDigitRef = useRef<number | null>(null);

  const maybeStartPendingFlip = useCallback((completedToDigit: number) => {
    const pending = pendingDigitRef.current;
    pendingDigitRef.current = null;
    if (typeof pending === 'number' && pending !== completedToDigit) {
      setNextDigit(pending);
      setPhase('top');
      setIsFlipping(true);
    }
  }, []);

  const finishBottomFlip = useCallback(() => {
    // bottom phase가 끝났을 때만 숫자 확정
    setIsFlipping(false);
    setPhase('top');
    setCurrentDigit(nextDigit);
    maybeStartPendingFlip(nextDigit);
  }, [maybeStartPendingFlip, nextDigit]);

  useEffect(() => {
    if (digit === currentDigit) return;

    if (isFlipping) {
      pendingDigitRef.current = digit;
      return;
    }

    setNextDigit(digit);
    setPhase('top');
    setIsFlipping(true);
  }, [digit, currentDigit, isFlipping]);

  // size는 DemoCountdownBasicWithControls에서 내려줍니다 (flip 레이아웃 전용)
  const context = useContext(CountdownControlsContext);
  const digitSize = context?.flipDigitSize ?? 'md';
  const digitSizeClassName =
    digitSize === 'sm'
      ? styles.flipDigitSizeSm
      : digitSize === 'lg'
        ? styles.flipDigitSizeLg
        : digitSize === 'xl'
          ? styles.flipDigitSizeXl
          : styles.flipDigitSizeMd;

  return (
    <div className={`${styles.flipDigitContainer} ${digitSizeClassName}`}>
      <div className={styles.flipDigit}>
        <div className={styles.flipDigitDivider} />

        {/* CodePen 구조: 정적 top / bottom */}
        <div className={styles.flipFigureTop}>
          <span className={styles.flipTopDigitValue}>
            {isFlipping && phase === 'bottom' ? nextDigit : currentDigit}
          </span>
        </div>
        <div className={styles.flipFigureBottom}>
          <span className={styles.flipBottomDigitValue}>{currentDigit}</span>
        </div>

        {/* 플립 오버레이: 2단계(top → bottom)로 "끝까지 접히는" 느낌 */}
        {isFlipping && (
          <>
            {phase === 'top' && (
              <div
                className={`${styles.flipFigureTopFlip} ${styles.flipFigureTopFlipFlipping}`}
                aria-hidden="true"
                onAnimationEnd={() => setPhase('bottom')}
              >
                <span className={styles.flipTopDigitValue}>{currentDigit}</span>
              </div>
            )}
            {phase === 'bottom' && (
              <div
                className={`${styles.flipFigureBottomFlip} ${styles.flipFigureBottomFlipFlipping}`}
                aria-hidden="true"
                onAnimationEnd={finishBottomFlip}
              >
                <span className={styles.flipBottomDigitValue}>{nextDigit}</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// 플립 카운트다운 카드 컴포넌트 (2자리 숫자, 각 자리수별 플립)
function FlipCard({ value, label }: { value: number; label: string }) {
  // 2자리 숫자로 변환
  const valueStr = String(value).padStart(2, '0');
  const tens = parseInt(valueStr[0], 10);
  const ones = parseInt(valueStr[1], 10);

  return (
    <div className={styles.flipCardWrapper}>
      <div className={styles.flipCardLabel}>{label}</div>
      <div className={styles.flipCardGroup}>
        {/* 10의 자리 */}
        <FlipDigit digit={tens} />
        {/* 1의 자리 */}
        <FlipDigit digit={ones} />
      </div>
    </div>
  );
}

// Provider
export function DemoCountdownBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CountdownInteractiveProvider>{children}</CountdownInteractiveProvider>
  );
}

// 기본 Countdown (컨트롤러 없이)
export function DemoCountdownBasic() {
  const [mounted, setMounted] = useState(false);
  const [targetTime, setTargetTime] = useState(0);

  useEffect(() => {
    setMounted(true);
    setTargetTime(Date.now() + 10 * 1000); // 10초 후
  }, []);

  if (!mounted) {
    return (
      <div className={styles.section}>
        <div className={styles.content}>
          <div style={{ fontVariantNumeric: 'tabular-nums' }}>00:00:10</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <Countdown targetTime={targetTime} />
      </div>
    </div>
  );
}

// 기본 Countdown (컨트롤러와 함께)
export function DemoCountdownBasicWithControls() {
  return <CountdownInteractivePreview />;
}

// Countdown Controls
export function DemoCountdownBasicControls() {
  return <CountdownInteractiveControls />;

  const context = useContext(
    CountdownControlsContext,
  ) as CountdownControlsContextType;

  if (!context) {
    return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  }

  const {
    seconds,
    setSeconds,
    active,
    setActive,
    restart,
    targetMode,
    setTargetMode,
    targetTimeOfDay,
    setTargetTimeOfDay,
    targetDate,
    setTargetDate,
    format,
    setFormat,
    formatType,
    setFormatType,
    layout,
    setLayout,
    flipDigitSize,
    setFlipDigitSize,
    showFinishedContent,
    setShowFinishedContent,
    useIcon,
    setUseIcon,
    finishedText,
    setFinishedText,
    finishedTextColor,
    setFinishedTextColor,
    finishedIconColor,
    setFinishedIconColor,
    finishedIcon,
    setFinishedIcon,
  } = context;

  const formatOptions: SelectOption[] = [
    { label: 'HH:mm:ss (시:분:초)', value: 'HH:mm:ss' },
    { label: 'mm:ss (분:초)', value: 'mm:ss' },
    { label: 'ss (초)', value: 'ss' },
    { label: 'DD:HH:mm:ss (일:시:분:초)', value: 'DD:HH:mm:ss' },
  ];

  const formatTypeOptions: SelectOption[] = [
    { label: '시간 (Time)', value: 'time' },
    { label: '숫자 (Number)', value: 'number' },
    { label: '온도 (Temperature)', value: 'temperature' },
    { label: '커스텀 (Custom)', value: 'custom' },
  ];

  const layoutOptions: SelectOption[] = [
    { label: '기본 (Default)', value: 'default' },
    { label: '커스텀 렌더 (Custom Render)', value: 'custom' },
    { label: '원형 진행 표시 (Circular)', value: 'circular' },
    { label: '플립 카운트다운 (Flip)', value: 'flip' },
  ];

  const flipDigitSizeOptions: SelectOption[] = [
    { label: '작게 (sm)', value: 'sm' },
    { label: '기본 (md)', value: 'md' },
    { label: '크게 (lg)', value: 'lg' },
    { label: '매우 크게 (xl)', value: 'xl' },
  ];

  const targetModeOptions: SelectOption[] = [
    { label: '초 (Duration)', value: 'duration' },
    { label: '시간 (Time)', value: 'time' },
    { label: '날짜 (Date)', value: 'date' },
  ];

  return (
    <Controls
      items={[
        {
          label: '초 (Seconds)',
          control: (
            <Input
              type="number"
              value={String(seconds)}
              onChange={(value) => {
                const numValue = parseInt(value, 10);
                if (!isNaN(numValue) && numValue >= 0) {
                  setSeconds(numValue);
                }
              }}
              placeholder="초 입력"
              size="small"
              min={0}
              disabled={targetMode !== 'duration'}
            />
          ),
        },
        {
          label: '타겟 타입 (Target Type)',
          control: (
            <Select
              options={targetModeOptions}
              value={targetMode}
              onChange={(val) => {
                if (!Array.isArray(val) && typeof val === 'string') {
                  const nextMode = val as 'duration' | 'time' | 'date';
                  setTargetMode(nextMode);
                  // 날짜 모드에서는 format 설정이 사실상 고정(DD 포함)이라 컨트롤을 숨기/비활성화합니다.
                  if (nextMode === 'date') {
                    setFormatType('time');
                    setFormat('DD:HH:mm:ss');
                  } else if (format === 'DD:HH:mm:ss') {
                    setFormat('HH:mm:ss');
                  }
                }
              }}
              placeholder="타겟 타입 선택"
              size="small"
            />
          ),
        },
        {
          label: '시간 선택 (Time)',
          control: (
            <Input
              type="time"
              value={targetTimeOfDay}
              onChange={(value) => setTargetTimeOfDay(value)}
              size="small"
              disabled={targetMode !== 'time'}
            />
          ),
        },
        {
          label: '날짜 선택 (Date)',
          control: (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <DatePicker
                value={targetDate ?? undefined}
                onChange={(date) => setTargetDate(date ?? null)}
                disabled={targetMode !== 'date'}
                className={styles.datePickerControl}
                inputWrapperClassName={styles.datePickerInputWrapper}
                calendarIconButtonClassName={styles.datePickerIconButton}
                panelWrapperClassName={styles.datePickerPanelWrapper}
                calendarClassName={styles.datePickerCalendar}
                calendarHeaderClassName={styles.datePickerCalendarHeader}
                navButtonClassName={styles.datePickerNavButton}
                monthYearClassName={styles.datePickerMonthYear}
                weekHeaderClassName={styles.datePickerWeekHeader}
                weekDayClassName={styles.datePickerWeekDay}
                dateGridClassName={styles.datePickerDateGrid}
                dateCellClassName={styles.datePickerDateCell}
                dateCellTodayClassName={styles.datePickerDateCellToday}
                dateCellSelectedClassName={styles.datePickerDateCellSelected}
              />
              {targetMode === 'date' && !targetDate && (
                <div
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  날짜를 선택한 뒤 시작을 누르세요.
                </div>
              )}
            </div>
          ),
        },
        {
          label: '포맷 타입 (Format Type)',
          control: (
            <Select
              options={formatTypeOptions}
              value={formatType}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  setFormatType(val as CountdownFormatType);
                }
              }}
              placeholder="포맷 타입 선택"
              size="small"
              disabled={targetMode === 'date'}
            />
          ),
        },
        {
          label: '포맷 (Format)',
          control: (
            <Select
              options={formatOptions}
              value={format}
              onChange={(val) => {
                if (!Array.isArray(val) && typeof val === 'string') {
                  setFormat(val);
                }
              }}
              placeholder="포맷 선택"
              size="small"
              disabled={targetMode === 'date' || formatType !== 'time'}
            />
          ),
        },
        {
          label: '레이아웃 (Layout)',
          control: (
            <Select
              options={layoutOptions}
              value={layout}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  setLayout(val as 'default' | 'custom' | 'circular' | 'flip');
                }
              }}
              placeholder="레이아웃 선택"
              size="small"
            />
          ),
        },
        {
          label: '플립 숫자 크기 (Flip Digit Size)',
          control: (
            <Select
              options={flipDigitSizeOptions}
              value={flipDigitSize}
              onChange={(val) => {
                if (!Array.isArray(val) && typeof val === 'string') {
                  setFlipDigitSize(val as 'sm' | 'md' | 'lg' | 'xl');
                }
              }}
              placeholder="플립 숫자 크기"
              size="small"
              disabled={layout !== 'flip'}
            />
          ),
        },
        {
          label: '활성화 (Active)',
          control: (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button
                onClick={restart}
                disabled={targetMode === 'date' && !targetDate}
                style={{
                  padding:
                    'var(--spacing-button-paddingY) var(--spacing-button-padding-x)',
                  borderRadius: 'var(--radius-md)',
                  border: 'var(--border-width-thin) solid var(--color-border)',
                  backgroundColor: active
                    ? 'var(--color-brand-primary)'
                    : 'var(--color-surface)',
                  color: active
                    ? 'var(--color-text-on-primary)'
                    : 'var(--color-text)',
                  cursor:
                    targetMode === 'date' && !targetDate
                      ? 'not-allowed'
                      : 'pointer',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  transition: 'all 0.2s',
                  opacity: targetMode === 'date' && !targetDate ? 0.5 : 1,
                }}
              >
                시작
              </Button>
              <Button
                onClick={() => setActive(false)}
                disabled={!active}
                style={{
                  padding:
                    'var(--spacing-button-paddingY) var(--spacing-button-padding-x)',
                  borderRadius: 'var(--radius-md)',
                  border: 'var(--border-width-thin) solid var(--color-border)',
                  backgroundColor: !active
                    ? 'var(--color-brand-primary)'
                    : 'var(--color-surface)',
                  color: !active
                    ? 'var(--color-text-on-primary)'
                    : 'var(--color-text)',
                  cursor: !active ? 'pointer' : 'not-allowed',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  transition: 'all 0.2s',
                  opacity: !active ? 1 : 0.5,
                }}
              >
                일시정지
              </Button>
            </div>
          ),
        },
        {
          label: '완료 시 텍스트 사용 (Show Finished Content)',
          control: (
            <Checkbox
              checked={showFinishedContent}
              onChange={(checked) => setShowFinishedContent(checked)}
              size="small"
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '아이콘 사용 (Use Icon)',
          control: (
            <Checkbox
              checked={useIcon}
              onChange={(checked) => setUseIcon(checked)}
              size="small"
              disabled={!showFinishedContent}
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '아이콘 선택 (Icon)',
          control: (
            <Select
              options={[
                {
                  label: 'Check Circle',
                  value: 'checkCircle',
                  iconPreview: <Icon icon={CheckCircle} size="small" />,
                },
                {
                  label: 'Check',
                  value: 'check',
                  iconPreview: <Icon icon={Check} size="small" />,
                },
                {
                  label: 'X',
                  value: 'x',
                  iconPreview: <Icon icon={X} size="small" />,
                },
                {
                  label: 'X Circle',
                  value: 'xCircle',
                  iconPreview: <Icon icon={XCircle} size="small" />,
                },
                {
                  label: 'Alert Circle',
                  value: 'alertCircle',
                  iconPreview: <Icon icon={AlertCircle} size="small" />,
                },
                {
                  label: 'Info',
                  value: 'info',
                  iconPreview: <Icon icon={Info} size="small" />,
                },
                {
                  label: 'Star',
                  value: 'star',
                  iconPreview: <Icon icon={Star} size="small" />,
                },
                {
                  label: 'Heart',
                  value: 'heart',
                  iconPreview: <Icon icon={Heart} size="small" />,
                },
                {
                  label: 'Trophy',
                  value: 'trophy',
                  iconPreview: <Icon icon={Trophy} size="small" />,
                },
                {
                  label: 'Sparkles',
                  value: 'sparkles',
                  iconPreview: <Icon icon={Sparkles} size="small" />,
                },
              ]}
              value={finishedIcon}
              onChange={(val) => {
                if (!Array.isArray(val) && typeof val === 'string') {
                  setFinishedIcon(val);
                }
              }}
              placeholder="아이콘 선택"
              size="small"
              disabled={!showFinishedContent || !useIcon}
            />
          ),
        },
        {
          label: '텍스트 표시 (Show Text)',
          control: (
            <Checkbox
              checked={finishedText.trim() !== ''}
              onChange={(checked) => {
                if (!checked) {
                  setFinishedText('');
                } else if (finishedText.trim() === '') {
                  setFinishedText('완료!');
                }
              }}
              size="small"
              disabled={!showFinishedContent}
            >
              사용
            </Checkbox>
          ),
        },
        {
          label: '완료 텍스트 (Finished Text)',
          control: (
            <Input
              type="text"
              value={finishedText}
              onChange={(value) => setFinishedText(value)}
              placeholder="완료 텍스트"
              size="small"
              disabled={!showFinishedContent}
            />
          ),
        },
        {
          label: '완료 텍스트 색상 (Finished Text Color)',
          control: (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <Select
                options={[
                  {
                    label: '기본값',
                    value: '',
                    colorPreview: 'var(--color-semantic-success)',
                  },
                  {
                    label: 'var(--color-semantic-success)',
                    value: 'var(--color-semantic-success)',
                    colorPreview: 'var(--color-semantic-success)',
                  },
                  {
                    label: 'var(--color-semantic-warning)',
                    value: 'var(--color-semantic-warning)',
                    colorPreview: 'var(--color-semantic-warning)',
                  },
                  {
                    label: 'var(--color-semantic-error)',
                    value: 'var(--color-semantic-error)',
                    colorPreview: 'var(--color-semantic-error)',
                  },
                  {
                    label: 'var(--color-semantic-info)',
                    value: 'var(--color-semantic-info)',
                    colorPreview: 'var(--color-semantic-info)',
                  },
                  {
                    label: 'var(--color-text)',
                    value: 'var(--color-text)',
                    colorPreview: 'var(--color-text)',
                  },
                  {
                    label: 'var(--color-text-secondary)',
                    value: 'var(--color-text-secondary)',
                    colorPreview: 'var(--color-text-secondary)',
                  },
                  { label: '커스텀 입력', value: 'custom' },
                ]}
                value={
                  !finishedTextColor ||
                  [
                    'var(--color-semantic-success)',
                    'var(--color-semantic-warning)',
                    'var(--color-semantic-error)',
                    'var(--color-semantic-info)',
                    'var(--color-text)',
                    'var(--color-text-secondary)',
                  ].includes(finishedTextColor)
                    ? finishedTextColor || ''
                    : 'custom'
                }
                onChange={(val) => {
                  if (!Array.isArray(val) && typeof val === 'string') {
                    setFinishedTextColor(val === 'custom' ? '' : val);
                  }
                }}
                placeholder="텍스트 색상 선택"
                size="small"
                disabled={!showFinishedContent}
              />
              {finishedTextColor &&
                finishedTextColor !== '' &&
                ![
                  'var(--color-semantic-success)',
                  'var(--color-semantic-warning)',
                  'var(--color-semantic-error)',
                  'var(--color-semantic-info)',
                  'var(--color-text)',
                  'var(--color-text-secondary)',
                ].includes(finishedTextColor) && (
                  <Input
                    type="text"
                    value={finishedTextColor}
                    onChange={(value) => setFinishedTextColor(value)}
                    placeholder="커스텀 텍스트 색상"
                    size="small"
                    disabled={!showFinishedContent}
                  />
                )}
            </div>
          ),
        },
        {
          label: '아이콘 색상 (Icon Color)',
          control: (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <Select
                options={[
                  {
                    label: '기본값',
                    value: '',
                    colorPreview: 'var(--color-semantic-success)',
                  },
                  {
                    label: 'var(--color-semantic-success)',
                    value: 'var(--color-semantic-success)',
                    colorPreview: 'var(--color-semantic-success)',
                  },
                  {
                    label: 'var(--color-semantic-warning)',
                    value: 'var(--color-semantic-warning)',
                    colorPreview: 'var(--color-semantic-warning)',
                  },
                  {
                    label: 'var(--color-semantic-error)',
                    value: 'var(--color-semantic-error)',
                    colorPreview: 'var(--color-semantic-error)',
                  },
                  {
                    label: 'var(--color-semantic-info)',
                    value: 'var(--color-semantic-info)',
                    colorPreview: 'var(--color-semantic-info)',
                  },
                  {
                    label: 'var(--color-text)',
                    value: 'var(--color-text)',
                    colorPreview: 'var(--color-text)',
                  },
                  {
                    label: 'var(--color-text-secondary)',
                    value: 'var(--color-text-secondary)',
                    colorPreview: 'var(--color-text-secondary)',
                  },
                  { label: '커스텀 입력', value: 'custom' },
                ]}
                value={
                  !finishedIconColor ||
                  [
                    'var(--color-semantic-success)',
                    'var(--color-semantic-warning)',
                    'var(--color-semantic-error)',
                    'var(--color-semantic-info)',
                    'var(--color-text)',
                    'var(--color-text-secondary)',
                  ].includes(finishedIconColor)
                    ? finishedIconColor || ''
                    : 'custom'
                }
                onChange={(val) => {
                  if (!Array.isArray(val) && typeof val === 'string') {
                    const colorValue = val === 'custom' ? '' : val;
                    setFinishedIconColor(colorValue);
                  }
                }}
                placeholder="아이콘 색상 선택"
                size="small"
                disabled={!showFinishedContent || !useIcon}
              />
              {finishedIconColor &&
                finishedIconColor !== '' &&
                ![
                  'var(--color-semantic-success)',
                  'var(--color-semantic-warning)',
                  'var(--color-semantic-error)',
                  'var(--color-semantic-info)',
                  'var(--color-text)',
                  'var(--color-text-secondary)',
                ].includes(finishedIconColor) && (
                  <Input
                    type="text"
                    value={finishedIconColor}
                    onChange={(value) => setFinishedIconColor(value)}
                    placeholder="커스텀 아이콘 색상"
                    size="small"
                    disabled={!showFinishedContent || !useIcon}
                  />
                )}
            </div>
          ),
        },
      ]}
    />
  );
}

// Format
export function DemoCountdownFormat() {
  const [mounted, setMounted] = useState(false);
  const [targetTime1, setTargetTime1] = useState(0);
  const [targetTime2, setTargetTime2] = useState(0);
  const [targetTime3, setTargetTime3] = useState(0);

  useEffect(() => {
    setMounted(true);
    const now = Date.now();
    setTargetTime1(now + 3661000); // 1시간 1분 1초 후
    setTargetTime2(now + 61000); // 1분 1초 후
    setTargetTime3(now + 10000); // 10초 후
  }, []);

  if (!mounted) {
    return (
      <div className={styles.section}>
        <div className={styles.content}>
          <div style={{ fontVariantNumeric: 'tabular-nums' }}>01:01:01</div>
          <div style={{ fontVariantNumeric: 'tabular-nums' }}>01:01</div>
          <div style={{ fontVariantNumeric: 'tabular-nums' }}>10</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <Countdown targetTime={targetTime1} format="HH:mm:ss" />
        <Countdown targetTime={targetTime2} format="mm:ss" />
        <Countdown targetTime={targetTime3} format="ss" />
      </div>
    </div>
  );
}

// Active
export function DemoCountdownActive() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(true);
  const [targetTime, setTargetTime] = useState(0);

  useEffect(() => {
    setMounted(true);
    setTargetTime(Date.now() + 10 * 1000); // 10초 후
  }, []);

  if (!mounted) {
    return (
      <div className={styles.section}>
        <div className={styles.content}>
          <div style={{ fontVariantNumeric: 'tabular-nums' }}>00:00:10</div>
          <div className={styles.buttonGroup}>
            <Button onClick={() => setActive(!active)}>일시정지</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <Countdown targetTime={targetTime} active={active} />
        <div className={styles.buttonGroup}>
          <Button onClick={() => setActive(!active)}>
            {active ? '일시정지' : '재개'}
          </Button>
        </div>
      </div>
    </div>
  );
}

// On Finish
export function DemoCountdownOnFinish() {
  const [mounted, setMounted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [targetTime, setTargetTime] = useState(0);

  useEffect(() => {
    setMounted(true);
    setTargetTime(Date.now() + 5 * 1000); // 5초 후
  }, []);

  if (!mounted) {
    return (
      <div className={styles.section}>
        <div className={styles.content}>
          <div style={{ fontVariantNumeric: 'tabular-nums' }}>00:00:05</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        {finished ? (
          <div
            style={{ fontSize: '18px', color: 'var(--color-semantic-success)' }}
          >
            카운트다운이 완료되었습니다!
          </div>
        ) : (
          <Countdown
            targetTime={targetTime}
            onFinish={() => setFinished(true)}
          />
        )}
      </div>
    </div>
  );
}

// Custom Render
export function DemoCountdownCustomRender() {
  const [mounted, setMounted] = useState(false);
  const [targetTime, setTargetTime] = useState(0);

  useEffect(() => {
    setMounted(true);
    setTargetTime(Date.now() + 86400 * 1000); // 1일 후
  }, []);

  if (!mounted) {
    return (
      <div className={styles.section}>
        <div className={styles.content}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className={styles.countdownCard}>
              <div className={styles.countdownValue}>1</div>
              <div className={styles.countdownLabel}>일</div>
            </div>
            <div className={styles.countdownCard}>
              <div className={styles.countdownValue}>0</div>
              <div className={styles.countdownLabel}>시</div>
            </div>
            <div className={styles.countdownCard}>
              <div className={styles.countdownValue}>0</div>
              <div className={styles.countdownLabel}>분</div>
            </div>
            <div className={styles.countdownCard}>
              <div className={styles.countdownValue}>0</div>
              <div className={styles.countdownLabel}>초</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Countdown targetTime={targetTime}>
            {({ days, hours, minutes, seconds }) => (
              <>
                <div className={styles.countdownCard}>
                  <div className={styles.countdownValue}>{days}</div>
                  <div className={styles.countdownLabel}>일</div>
                </div>
                <div className={styles.countdownCard}>
                  <div className={styles.countdownValue}>{hours}</div>
                  <div className={styles.countdownLabel}>시</div>
                </div>
                <div className={styles.countdownCard}>
                  <div className={styles.countdownValue}>{minutes}</div>
                  <div className={styles.countdownLabel}>분</div>
                </div>
                <div className={styles.countdownCard}>
                  <div className={styles.countdownValue}>{seconds}</div>
                  <div className={styles.countdownLabel}>초</div>
                </div>
              </>
            )}
          </Countdown>
        </div>
      </div>
    </div>
  );
}

// Custom Format with Days
export function DemoCountdownWithDays() {
  const [mounted, setMounted] = useState(false);
  const [targetTime, setTargetTime] = useState(0);

  useEffect(() => {
    setMounted(true);
    setTargetTime(Date.now() + 2 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000); // 2일 3시간 후
  }, []);

  if (!mounted) {
    return (
      <div className={styles.section}>
        <div className={styles.content}>
          <div style={{ fontVariantNumeric: 'tabular-nums' }}>02:03:00:00</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <Countdown targetTime={targetTime} format="DD:HH:mm:ss" />
      </div>
    </div>
  );
}
