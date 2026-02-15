'use client';

// components/headless/progress/progress.tsx
import { useProgress } from './use-progress';
import { ProgressProps } from './type-progress';
import { progressCss as _progressCss } from './progress.styles';

export const ProgressCss = _progressCss;

export function Progress(props: ProgressProps) {
  const { injectStyles = true, className } = props;
  const progress = useProgress(props);

  if (progress.type === 'line') {
    return (
      <div
        {...progress.containerProps}
        className={[progress.containerProps.className, className]
          .filter(Boolean)
          .join(' ')}
      >
        {injectStyles && <style suppressHydrationWarning>{_progressCss}</style>}
        <div {...progress.outerProps}>
          <div {...progress.innerProps} />
          {progress.textProps && (
            <div {...progress.textProps}>{progress.displayText}</div>
          )}
        </div>
      </div>
    );
  } else {
    // Circle progress
    return (
      <div
        {...progress.containerProps}
        className={[progress.containerProps.className, className]
          .filter(Boolean)
          .join(' ')}
      >
        {injectStyles && <style suppressHydrationWarning>{_progressCss}</style>}
        <svg {...progress.svgProps}>
          <circle {...progress.trailProps} />
          <circle {...progress.circleProps} />
          {progress.textProps && (
            <text {...progress.textProps}>{progress.displayText}</text>
          )}
        </svg>
      </div>
    );
  }
}
