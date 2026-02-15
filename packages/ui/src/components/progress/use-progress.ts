'use client';

// components/headless/progress/use-progress.ts

export interface UseProgressProps {
  percent?: number;
  type?: 'line' | 'circle';
  size?: 'small' | 'medium' | 'large';
  status?: 'normal' | 'success' | 'error' | 'warning';
  strokeWidth?: number;
  strokeColor?: string;
  trailColor?: string;
  showInfo?: boolean;
  format?: (percent: number) => React.ReactNode;
  width?: number;
}

export function useProgress({
  percent = 0,
  type = 'line',
  size = 'small',
  status = 'normal',
  strokeWidth = 6,
  strokeColor,
  trailColor = 'var(--color-surface)',
  showInfo = true,
  format,
  width = 120,
}: UseProgressProps) {
  // 진행률을 0-100 범위로 제한
  const clampedPercent = Math.min(Math.max(percent, 0), 100);

  // 상태에 따른 색상 결정
  const getStatusColor = () => {
    if (strokeColor) return strokeColor;

    switch (status) {
      case 'success':
        return 'var(--color-semantic-success)';
      case 'error':
        return 'var(--color-semantic-error)';
      case 'warning':
        return 'var(--color-semantic-warning)';
      case 'normal':
      default:
        return 'var(--color-semantic-info)';
    }
  };

  const currentColor = getStatusColor();

  if (type === 'line') {
    return {
      type: 'line' as const,
      clampedPercent,
      showInfo,
      displayText: format ? format(clampedPercent) : `${clampedPercent}%`,
      strokeColor: currentColor,

      containerProps: {
        className: 'hcProgress',
        'data-type': 'line',
        'data-size': size,
        style: {
          width: '100%',
          position: 'relative' as const,
          ['--hc-progress-stroke' as any]: currentColor,
          ['--hc-progress-trail' as any]: trailColor,
        },
      },

      outerProps: {
        className: 'hcProgressLineOuter',
      },

      innerProps: {
        className: 'hcProgressLineInner',
        style: {
          width: `${clampedPercent}%`,
        },
      },

      textProps: showInfo
        ? {
          className: 'hcProgressLineText',
        }
        : null,
    };
  } else {
    // 원형 프로그레스
    const radius = (width - strokeWidth * 2) / 2;
    const circumference = radius * 2 * Math.PI;

    return {
      type: 'circle' as const,
      clampedPercent,
      showInfo,
      displayText: format ? format(clampedPercent) : `${clampedPercent}%`,
      strokeColor: currentColor,

      containerProps: {
        className: 'hcProgress',
        'data-type': 'circle',
        'data-size': size,
        style: {
          position: 'relative' as const,
          width: width,
          height: width,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          ['--hc-progress-stroke' as any]: currentColor,
          ['--hc-progress-trail' as any]: trailColor,
        },
      },

      svgProps: {
        width,
        height: width,
        className: 'hcProgressCircleSvg',
      },

      trailProps: {
        className: 'hcProgressCircleTrail',
        cx: width / 2,
        cy: width / 2,
        r: radius,
        strokeWidth,
      },

      // Circle 요소를 사용하여 정확한 원형 progress 구현
      circleProps: {
        className: 'hcProgressCircleBar',
        cx: width / 2,
        cy: width / 2,
        r: radius,
        strokeWidth,
        strokeDasharray: circumference,
        strokeDashoffset:
          circumference - (clampedPercent / 100) * circumference,
      },

      textProps: showInfo
        ? {
          className: 'hcProgressCircleText',
          x: width / 2,
          y: width / 2,
          textAnchor: 'middle' as const,
          dominantBaseline: 'middle' as const,
          fontSize:
            size === 'small' ? '12px' : size === 'large' ? '16px' : '14px',
          style: {
            transform: 'rotate(90deg)',
            transformOrigin: 'center center',
          },
        }
        : null,
    };
  }
}
