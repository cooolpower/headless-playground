'use client';

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Countdown } from '../countdown/countdown';
import type {
  FlipCountdownProps,
  FlipCountdownLabels,
} from './type-flip-countdown';
import { flipCountdownCss as _flipCountdownCss } from './flip-countdown.styles';

// SDK/사용자에게도 기본 스타일을 노출하기 위해 re-export 합니다.
// - injectStyles=true(default)면 컴포넌트가 내부에서 주입
// - injectStyles=false면 사용자가 원하는 위치에서 한 번만 주입 가능
export const flipCountdownCss = _flipCountdownCss;
// sdk/src/index.ts 자동 생성 로직이 PascalCase export만 수집하는 규칙을 가지고 있어,
// SDK 루트 export에서도 접근 가능하도록 PascalCase alias를 추가합니다.
export const FlipCountdownCss = _flipCountdownCss;

function safeLabel(
  labels: FlipCountdownLabels | undefined,
  key: keyof FlipCountdownLabels,
  fallback: string,
) {
  const v = labels?.[key];
  return typeof v === 'string' && v.trim() !== '' ? v : fallback;
}

function FlipDigit({
  digit,
  digitSize,
}: {
  digit: number;
  digitSize: NonNullable<FlipCountdownProps['digitSize']>;
}) {
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

  return (
    <div className="hcFlipDigitContainer" data-size={digitSize}>
      <div className="hcFlipDigit">
        <div className="hcFlipDivider" />

        <div className="hcFlipTop">
          <span className="hcFlipValTop">
            {isFlipping && phase === 'bottom' ? nextDigit : currentDigit}
          </span>
        </div>
        <div className="hcFlipBottom">
          <span className="hcFlipValBottom">{currentDigit}</span>
        </div>

        {isFlipping && (
          <>
            {phase === 'top' && (
              <div
                className="hcFlipTopFlip hcFlipTopFlipping"
                aria-hidden="true"
                onAnimationEnd={() => setPhase('bottom')}
              >
                <span className="hcFlipValTop">{currentDigit}</span>
              </div>
            )}
            {phase === 'bottom' && (
              <div
                className="hcFlipBottomFlip hcFlipBottomFlipping"
                aria-hidden="true"
                onAnimationEnd={finishBottomFlip}
              >
                <span className="hcFlipValBottom">{nextDigit}</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function FlipUnit({
  label,
  value,
  digitSize,
}: {
  label: string;
  value: number;
  digitSize: NonNullable<FlipCountdownProps['digitSize']>;
}) {
  const valueStr = String(value).padStart(2, '0');
  const digits = valueStr.split('').map((ch) => Number(ch));

  return (
    <div className="hcFlipUnit">
      <div className="hcFlipLabel">{label}</div>
      <div className="hcFlipDigits">
        {digits.map((d, idx) => (
          <FlipDigit key={idx} digit={d} digitSize={digitSize} />
        ))}
      </div>
    </div>
  );
}

function FlipNumber({
  label,
  value,
  minDigits,
  digitSize,
}: {
  label: string;
  value: number;
  minDigits: number;
  digitSize: NonNullable<FlipCountdownProps['digitSize']>;
}) {
  const valueStr = String(value).padStart(minDigits, '0');
  const digits = valueStr.split('').map((ch) => Number(ch));

  return (
    <div className="hcFlipUnit">
      <div className="hcFlipLabel">{label}</div>
      <div className="hcFlipDigits">
        {digits.map((d, idx) => (
          <FlipDigit key={idx} digit={d} digitSize={digitSize} />
        ))}
      </div>
    </div>
  );
}

export function FlipCountdown(props: FlipCountdownProps) {
  const {
    targetTime,
    active = true,
    mode = 'time',
    format = 'HH:mm:ss',
    minDigits = 1,
    labels,
    digitSize = 'md',
    injectStyles = true,
    className,
  } = props;

  const showDays = mode === 'time' && format.includes('DD');
  const showHours = mode === 'time' && format.includes('HH');
  const showMinutes = mode === 'time' && format.includes('mm');
  const showSeconds = mode === 'time' && format.includes('ss');

  const resolvedLabels = useMemo(
    () => ({
      days: safeLabel(labels, 'days', '일'),
      hours: safeLabel(labels, 'hours', '시'),
      minutes: safeLabel(labels, 'minutes', '분'),
      seconds: safeLabel(labels, 'seconds', '초'),
      number: safeLabel(labels, 'number', '초'),
    }),
    [labels],
  );

  return (
    <div className={className}>
      {injectStyles && (
        <style suppressHydrationWarning>{flipCountdownCss}</style>
      )}

      <div className="hcFlipRoot">
        <Countdown targetTime={targetTime} active={active}>
          {({ days, hours, minutes, seconds, total }) => {
            if (mode === 'number') {
              const totalSeconds = Math.max(0, Math.floor(total / 1000));
              return (
                <FlipNumber
                  label={resolvedLabels.number}
                  value={totalSeconds}
                  minDigits={Math.max(1, minDigits)}
                  digitSize={digitSize}
                />
              );
            }

            return (
              <>
                {showDays && (
                  <FlipUnit
                    label={resolvedLabels.days}
                    value={days}
                    digitSize={digitSize}
                  />
                )}
                {showHours && (
                  <FlipUnit
                    label={resolvedLabels.hours}
                    value={hours}
                    digitSize={digitSize}
                  />
                )}
                {showMinutes && (
                  <FlipUnit
                    label={resolvedLabels.minutes}
                    value={minutes}
                    digitSize={digitSize}
                  />
                )}
                {showSeconds && (
                  <FlipUnit
                    label={resolvedLabels.seconds}
                    value={seconds}
                    digitSize={digitSize}
                  />
                )}
              </>
            );
          }}
        </Countdown>
      </div>
    </div>
  );
}
