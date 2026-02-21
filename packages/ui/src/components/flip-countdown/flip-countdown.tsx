'use client';

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Countdown } from '../countdown/countdown';
import { FlipCountdownProps, FlipCountdownLabels } from './type-flip-countdown';
import { flipCountdownCss as _flipCountdownCss } from './flip-countdown.styles';
import { useStyles } from '../../hooks/use-styles';

export const FlipCountdownCss = _flipCountdownCss;
export const flipCountdownCss = _flipCountdownCss;

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
    precision = 0,
  } = props;

  // useStyles 훅을 통해 테마 및 컴포넌트 스타일 주입
  useStyles('hc-flip-countdown-styles', _flipCountdownCss, injectStyles);

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
      milliseconds: safeLabel(labels, 'milliseconds', '.'),
      number: safeLabel(labels, 'number', '초'),
    }),
    [labels],
  );

  return (
    <div className={className}>
      <div className="hcFlipRoot">
        <Countdown
          targetTime={targetTime}
          active={active}
          injectStyles={injectStyles}
          precision={precision}
        >
          {({ days, hours, minutes, seconds, milliseconds, total }) => {
            const msStr =
              precision > 0
                ? String(milliseconds).padStart(3, '0').slice(0, precision)
                : '';

            if (mode === 'number') {
              const totalSeconds = Math.max(0, Math.floor(total / 1000));
              return (
                <>
                  <FlipNumber
                    label={resolvedLabels.number}
                    value={totalSeconds}
                    minDigits={Math.max(1, minDigits)}
                    digitSize={digitSize}
                  />
                  {precision > 0 && (
                    <>
                      <div
                        className="hcFlipSeparator"
                        style={{ alignSelf: 'flex-end', marginBottom: '8px' }}
                      >
                        {resolvedLabels.milliseconds}
                      </div>
                      <FlipNumber
                        label=""
                        value={Number(msStr)}
                        minDigits={precision}
                        digitSize={digitSize}
                      />
                    </>
                  )}
                </>
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
                {precision > 0 && (
                  <>
                    <div
                      className="hcFlipSeparator"
                      style={{ alignSelf: 'flex-end', marginBottom: '8px' }}
                    >
                      {resolvedLabels.milliseconds}
                    </div>
                    <FlipNumber
                      label=""
                      value={Number(msStr)}
                      minDigits={precision}
                      digitSize={digitSize}
                    />
                  </>
                )}
              </>
            );
          }}
        </Countdown>
      </div>
    </div>
  );
}
