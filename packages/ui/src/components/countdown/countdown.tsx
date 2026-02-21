'use client';

import { useCountdown } from './use-countdown';
import { CountdownProps } from './type-countdown';
import { countdownCss as _countdownCss } from './countdown.styles';
import { useStyles } from '../../hooks/use-styles';

export const CountdownCss = _countdownCss;

export function Countdown(props: CountdownProps) {
  const { timeLeft, formatted, isFinished, finishedContent } =
    useCountdown(props);
  const { className, children, injectStyles = true } = props;

  // useStyles 훅을 통해 테마 및 컴포넌트 스타일 주입
  useStyles('hc-countdown-styles', _countdownCss, injectStyles);

  const resolvedClassName = injectStyles
    ? className
      ? `hcCountdown ${className}`
      : 'hcCountdown'
    : className;

  // 완료되었고 finishedContent가 있으면 표시
  if (isFinished && finishedContent) {
    return (
      <div className={resolvedClassName} suppressHydrationWarning>
        {finishedContent}
      </div>
    );
  }

  if (children) {
    return (
      <div className={resolvedClassName} suppressHydrationWarning>
        {children(timeLeft)}
      </div>
    );
  }

  return (
    <div className={resolvedClassName} suppressHydrationWarning>
      {formatted}
    </div>
  );
}
