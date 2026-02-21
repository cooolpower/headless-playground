'use client';

import React from 'react';
import { Countdown } from '../countdown/countdown';
import { RollingCountdownProps } from './type-rolling-countdown';
import { rollingCountdownCss as _rollingCountdownCss } from './rolling-countdown.styles';
import { useStyles } from '../../hooks/use-styles';

export const RollingCountdownCss = _rollingCountdownCss;

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

function RollingDigit({ value }: { value: number }) {
  return (
    <div className="hcRollingDigitContainer">
      <div
        className="hcRollingDigitList"
        style={{ transform: `translateY(${-value}em)` }}
      >
        {DIGITS.map((d) => (
          <div key={d} className="hcRollingDigit">
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}

function RollingGroup({
  value,
  minDigits = 2,
}: {
  value: number;
  minDigits?: number;
}) {
  const digits = String(value).padStart(minDigits, '0').split('').map(Number);

  return (
    <>
      {digits.map((digit, idx) => (
        <RollingDigit key={idx} value={digit} />
      ))}
    </>
  );
}

export function RollingCountdown(props: RollingCountdownProps) {
  const {
    targetTime,
    active = true,
    size = 'md',
    injectStyles = true,
    className,
    format = 'HH:mm:ss',
    precision,
    onFinish,
    formatType,
    finishedContent,
  } = props;

  useStyles('hc-rolling-countdown-styles', _rollingCountdownCss, injectStyles);

  const showDays = format.includes('DD');
  const showHours = format.includes('HH');
  const showMinutes = format.includes('mm');
  const showSeconds = format.includes('ss');

  return (
    <div className={className}>
      <Countdown
        targetTime={targetTime}
        active={active}
        injectStyles={false}
        format={format}
        formatType={formatType}
        precision={precision}
        onFinish={onFinish}
        finishedContent={finishedContent}
      >
        {({ days, hours, minutes, seconds, milliseconds }) => {
          const msStr =
            precision && precision > 0
              ? String(milliseconds).padStart(3, '0').slice(0, precision)
              : '';

          return (
            <div className="hcRollingRoot" data-size={size}>
              {showDays && (
                <>
                  <RollingGroup value={days} minDigits={2} />
                  <span className="hcRollingSeparator">:</span>
                </>
              )}
              {showHours && (
                <>
                  <RollingGroup value={hours} />
                  <span className="hcRollingSeparator">:</span>
                </>
              )}
              {showMinutes && (
                <>
                  <RollingGroup value={minutes} />
                  <span className="hcRollingSeparator">:</span>
                </>
              )}
              {showSeconds && <RollingGroup value={seconds} />}
              {precision && precision > 0 && (
                <>
                  <span className="hcRollingSeparator">.</span>
                  <RollingGroup value={Number(msStr)} minDigits={precision} />
                </>
              )}
            </div>
          );
        }}
      </Countdown>
    </div>
  );
}
