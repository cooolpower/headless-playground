'use client';

import { useCountdown } from './use-countdown';
import { CountdownProps } from './type-countdown';
import { countdownCss as _countdownCss } from './countdown.styles';

export const CountdownCss = _countdownCss;

function cx(...parts: Array<string | undefined | null | false>) {
  return parts.filter(Boolean).join(' ');
}

export function Countdown(props: CountdownProps) {
  const { timeLeft, formatted, isFinished, finishedContent } =
    useCountdown(props);
  const { className, children, injectStyles = true } = props;
  const resolvedClassName = injectStyles
    ? cx('hcCountdown', className)
    : className;

  // 완료되었고 finishedContent가 있으면 표시
  if (isFinished && finishedContent) {
    return (
      <div className={resolvedClassName} suppressHydrationWarning>
        {injectStyles && (
          <style suppressHydrationWarning>{_countdownCss}</style>
        )}
        {finishedContent}
      </div>
    );
  }

  if (children) {
    return (
      <div className={resolvedClassName} suppressHydrationWarning>
        {injectStyles && (
          <style suppressHydrationWarning>{_countdownCss}</style>
        )}
        {children(timeLeft)}
      </div>
    );
  }

  return (
    <div className={resolvedClassName} suppressHydrationWarning>
      {injectStyles && <style suppressHydrationWarning>{_countdownCss}</style>}
      {formatted}
    </div>
  );
}
