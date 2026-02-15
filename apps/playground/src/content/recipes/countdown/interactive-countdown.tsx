'use client';

import type { ReactNode } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Countdown } from '@repo/ui';
import { Button } from '@repo/ui';
import { Input } from '@repo/ui';
import { Select } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { DatePicker } from '@repo/ui';
import { Controls } from '@/components/playground/controls';
import { Icon } from '@repo/ui';
import type { SelectOption } from '@repo/ui';
import type { CountdownFormatType } from '@repo/ui';
import { FlipCountdown } from '@repo/ui';
import {
  AlertCircle,
  Check,
  CheckCircle,
  Heart,
  Info,
  Sparkles,
  Star,
  Trophy,
  X,
  XCircle,
} from 'lucide-react';

// NOTE:
// - 레시피 성격상, 기존 데모에서 사용하던 스타일을 그대로 재사용합니다.
// - (추후 필요 시 recipes 폴더로 스타일을 완전히 이동할 수 있습니다.)
import * as styles from '@/content/components/countdown/countdown.demo.css';

// 아이콘 매핑 (완료 UI 옵션)
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

// SVG 원형 진행 표시를 위한 유틸리티 함수들 (circular 레이아웃)
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
  return [
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

interface CountdownInteractiveContextType {
  seconds: number;
  setSeconds: (seconds: number) => void;
  active: boolean;
  setActive: (active: boolean) => void;
  runId: number;
  restart: () => void;
  preset: CountdownPreset;
  setPreset: (preset: CountdownPreset) => void;
  targetTimeOfDay: string;
  setTargetTimeOfDay: (value: string) => void;
  targetDate: Date | null;
  setTargetDate: (date: Date | null) => void;
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

const CountdownInteractiveContext =
  createContext<CountdownInteractiveContextType | null>(null);

type CountdownPreset =
  | 'duration_time'
  | 'duration_number'
  | 'time_time'
  | 'date_time';

function getPresetConfig(preset: CountdownPreset): {
  targetMode: 'duration' | 'time' | 'date';
  formatType: CountdownFormatType;
  format: string;
} {
  switch (preset) {
    case 'duration_number':
      return {
        targetMode: 'duration',
        formatType: 'number',
        format: 'HH:mm:ss',
      };
    case 'time_time':
      return { targetMode: 'time', formatType: 'time', format: 'HH:mm:ss' };
    case 'date_time':
      return { targetMode: 'date', formatType: 'time', format: 'DD:HH:mm:ss' };
    case 'duration_time':
    default:
      return { targetMode: 'duration', formatType: 'time', format: 'HH:mm:ss' };
  }
}

function isValidTimeOfDay(value: string): boolean {
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  if (!match) return false;
  const hh = Number(match[1]);
  const mm = Number(match[2]);
  return (
    Number.isFinite(hh) &&
    Number.isFinite(mm) &&
    hh >= 0 &&
    hh <= 23 &&
    mm >= 0 &&
    mm <= 59
  );
}

export function CountdownInteractiveProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [seconds, setSeconds] = useState(10);
  const [active, setActive] = useState(false);
  const [runId, setRunId] = useState(0);
  const [preset, setPreset] = useState<CountdownPreset>('duration_time');
  const [targetTimeOfDay, setTargetTimeOfDay] = useState('12:00');
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [layout, setLayout] = useState<
    'default' | 'custom' | 'circular' | 'flip'
  >('default');
  const [flipDigitSize, setFlipDigitSize] = useState<'sm' | 'md' | 'lg' | 'xl'>(
    'md',
  );

  const [showFinishedContent, setShowFinishedContent] = useState(false);
  const [useIcon, setUseIcon] = useState(true);
  const [finishedText, setFinishedText] = useState('완료!');
  const [finishedTextColor, setFinishedTextColor] = useState(
    'var(--color-semantic-success)',
  );
  const [finishedIconColor, setFinishedIconColor] = useState(
    'var(--color-semantic-success)',
  );
  const [finishedIcon, setFinishedIcon] = useState('checkCircle');

  const restart = useCallback(() => {
    setRunId((prev) => prev + 1);
    setActive(true);
  }, []);

  const value = useMemo(
    () => ({
      seconds,
      setSeconds,
      active,
      setActive,
      runId,
      restart,
      preset,
      setPreset,
      targetTimeOfDay,
      setTargetTimeOfDay,
      targetDate,
      setTargetDate,
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
    }),
    [
      seconds,
      active,
      runId,
      restart,
      preset,
      targetTimeOfDay,
      targetDate,
      layout,
      flipDigitSize,
      showFinishedContent,
      useIcon,
      finishedText,
      finishedTextColor,
      finishedIconColor,
      finishedIcon,
    ],
  );

  return (
    <CountdownInteractiveContext.Provider value={value}>
      {children}
    </CountdownInteractiveContext.Provider>
  );
}

export function CountdownInteractivePreview() {
  const context = useContext(CountdownInteractiveContext);
  const [mounted, setMounted] = useState(false);
  const [targetTime, setTargetTime] = useState(0);

  useEffect(() => setMounted(true), []);

  if (!context) {
    return null;
  }

  const {
    seconds,
    active,
    runId,
    preset,
    targetTimeOfDay,
    targetDate,
    layout,
    flipDigitSize,
    showFinishedContent,
    useIcon,
    finishedText,
    finishedTextColor,
    finishedIconColor,
    finishedIcon,
  } = context;

  const { targetMode, formatType, format } = getPresetConfig(preset);

  useEffect(() => {
    if (!mounted) return;
    if (!active) return;

    const now = new Date();

    if (targetMode === 'duration') {
      // 남은 초 계산이 floor 기반이라, 렌더링 지연(ms)로 인해 바로 99로 보일 수 있습니다.
      // duration은 UX 상 "입력한 초부터 시작"하는 게 자연스러워서 1초 범위로 보정합니다.
      setTargetTime(now.getTime() + seconds * 1000 + 999);
      return;
    }

    if (targetMode === 'time') {
      if (!isValidTimeOfDay(targetTimeOfDay)) {
        setTargetTime(now.getTime() + seconds * 1000 + 999);
        return;
      }
      const [hhStr, mmStr] = targetTimeOfDay.split(':');
      const hh = Number(hhStr);
      const mm = Number(mmStr);

      const candidate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hh,
        mm,
        0,
        0,
      );
      if (candidate.getTime() <= now.getTime()) {
        candidate.setDate(candidate.getDate() + 1);
      }
      setTargetTime(candidate.getTime());
      return;
    }

    // date
    if (!targetDate) {
      setTargetTime(now.getTime());
      return;
    }

    const dateTarget = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      targetDate.getDate(),
      23,
      59,
      59,
      999,
    );
    if (dateTarget.getTime() <= now.getTime()) {
      setTargetTime(now.getTime());
      return;
    }

    setTargetTime(dateTarget.getTime());
  }, [
    active,
    seconds,
    runId,
    mounted,
    targetMode,
    targetTimeOfDay,
    targetDate,
  ]);

  if (!mounted) {
    return (
      <div className={styles.section}>
        <div className={styles.content}>
          <div style={{ fontVariantNumeric: 'tabular-nums' }}>00:00:00</div>
        </div>
      </div>
    );
  }

  const finishedContent = showFinishedContent ? (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '18px',
        color: finishedTextColor || 'var(--color-semantic-success)',
      }}
    >
      {useIcon && iconMap[finishedIcon] && (
        <div
          style={{
            color:
              finishedIconColor ||
              finishedTextColor ||
              'var(--color-semantic-success)',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          <Icon icon={iconMap[finishedIcon]} size="small" />
        </div>
      )}
      {finishedText && finishedText.trim() !== '' && finishedText}
    </div>
  ) : undefined;

  const countdownProps = {
    targetTime,
    active,
    format,
    formatType,
    finishedContent,
  };

  const targetInfo =
    targetMode === 'date' ? (
      <div
        style={{
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-secondary)',
        }}
      >
        {targetDate
          ? `선택한 날짜: ${targetDate.toLocaleDateString('ko-KR')}`
          : '선택한 날짜: 없음'}
      </div>
    ) : targetMode === 'time' ? (
      <div
        style={{
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-secondary)',
        }}
      >
        선택한 시간: {targetTimeOfDay || '없음'}
      </div>
    ) : null;

  if (layout === 'custom') {
    return (
      <div className={styles.section}>
        <div className={styles.content}>
          {targetInfo}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Countdown {...countdownProps}>
              {({ days, hours, minutes, seconds: secs }) => (
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
                    <div className={styles.countdownValue}>{secs}</div>
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

  if (layout === 'circular') {
    return (
      <div className={styles.section}>
        <div className={styles.content}>
          {targetInfo}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Countdown {...countdownProps}>
              {({ days, hours, minutes, seconds: secs }) => {
                const daysRadius = mapNumber(days, 30, 0, 0, 360);
                const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
                const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
                const secondsRadius = mapNumber(secs, 60, 0, 0, 360);

                return (
                  <>
                    <div className={styles.countdownCircularItem}>
                      <SVGCircle radius={daysRadius} />
                      <div className={styles.countdownValue}>{days}</div>
                      <div className={styles.countdownLabel}>일</div>
                    </div>
                    <div className={styles.countdownCircularItem}>
                      <SVGCircle radius={hoursRadius} />
                      <div className={styles.countdownValue}>{hours}</div>
                      <div className={styles.countdownLabel}>시</div>
                    </div>
                    <div className={styles.countdownCircularItem}>
                      <SVGCircle radius={minutesRadius} />
                      <div className={styles.countdownValue}>{minutes}</div>
                      <div className={styles.countdownLabel}>분</div>
                    </div>
                    <div className={styles.countdownCircularItem}>
                      <SVGCircle radius={secondsRadius} />
                      <div className={styles.countdownValue}>{secs}</div>
                      <div className={styles.countdownLabel}>초</div>
                    </div>
                  </>
                );
              }}
            </Countdown>
          </div>
        </div>
      </div>
    );
  }

  if (layout === 'flip') {
    if (formatType !== 'time' && formatType !== 'number') {
      return (
        <div className={styles.section}>
          <div className={styles.content}>
            {targetInfo}
            <div className={styles.countdownDisplay}>
              <Countdown {...countdownProps} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.section}>
        <div className={styles.content}>
          {targetInfo}
          <FlipCountdown
            targetTime={targetTime}
            active={active}
            mode={formatType === 'number' ? 'number' : 'time'}
            format={format}
            minDigits={Math.max(2, String(seconds).length)}
            digitSize={flipDigitSize}
            labels={{
              days: '일',
              hours: '시',
              minutes: '분',
              seconds: '초',
              number: '초',
            }}
          />
        </div>
      </div>
    );
  }

  // default
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        {targetInfo}
        <Countdown {...countdownProps} />
      </div>
    </div>
  );
}

export function CountdownInteractiveControls() {
  const context = useContext(CountdownInteractiveContext);
  if (!context) return null;

  const {
    seconds,
    setSeconds,
    active,
    setActive,
    restart,
    preset,
    setPreset,
    targetTimeOfDay,
    setTargetTimeOfDay,
    targetDate,
    setTargetDate,
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

  const { targetMode } = getPresetConfig(preset);
  const canStart =
    targetMode === 'date'
      ? !!targetDate
      : targetMode === 'time'
        ? isValidTimeOfDay(targetTimeOfDay)
        : true;

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

  const presetOptions: SelectOption[] = [
    { label: 'Duration · HH:mm:ss', value: 'duration_time' },
    { label: 'Duration · total seconds', value: 'duration_number' },
    { label: 'Next time (HH:mm) · HH:mm:ss', value: 'time_time' },
    { label: 'Date (end of day) · DD:HH:mm:ss', value: 'date_time' },
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
          label: '프리셋 (Preset)',
          control: (
            <Select
              options={presetOptions}
              value={preset}
              onChange={(val) => {
                if (!Array.isArray(val) && typeof val === 'string') {
                  setPreset(val as CountdownPreset);
                }
              }}
              placeholder="프리셋 선택"
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
                disabled={!canStart}
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
                  cursor: !canStart ? 'not-allowed' : 'pointer',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  transition: 'all 0.2s',
                  opacity: !canStart ? 0.5 : 1,
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
          label: '텍스트 색상 (Text Color)',
          control: (
            <Input
              type="text"
              value={finishedTextColor}
              onChange={(value) => setFinishedTextColor(value)}
              placeholder="var(--color-semantic-success)"
              size="small"
              disabled={!showFinishedContent}
            />
          ),
        },
        {
          label: '아이콘 색상 (Icon Color)',
          control: (
            <Input
              type="text"
              value={finishedIconColor}
              onChange={(value) => setFinishedIconColor(value)}
              placeholder="var(--color-semantic-success)"
              size="small"
              disabled={!showFinishedContent || !useIcon}
            />
          ),
        },
      ]}
    />
  );
}
