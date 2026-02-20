'use client';

// components/headless/progress/progress.tsx
import { useProgress } from './use-progress';
import { ProgressProps } from './type-progress';
import { progressCss as _progressCss } from './progress.styles';
import { useStyles } from '../../hooks/use-styles';

export const ProgressCss = _progressCss;

export function Progress(props: ProgressProps) {
  const { injectStyles = true, className } = props;
  const progress = useProgress(props);

  // useStyles 훅을 통해 테마 및 컴포넌트 스타일 주입
  useStyles('hc-progress-styles', _progressCss, injectStyles);

  if (progress.type === 'line') {
    return (
      <div
        {...progress.containerProps}
        className={[progress.containerProps.className, className]
          .filter(Boolean)
          .join(' ')}
      >
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
