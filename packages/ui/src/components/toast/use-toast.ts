'use client';

export interface UseToastProps {
  message?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  type?: 'primary' | 'secondary' | 'tertiary' | 'dashed' | 'quaternary';
  color?: 'success' | 'info' | 'warning' | 'error';
  duration?: number; // milliseconds, 0 means never auto-close
  onClose?: () => void;
  placement?: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right';
  showIcon?: boolean;
  showProgress?: boolean; // 프로그레스 바 표시 여부
  showClose?: boolean; // 닫기 버튼 표시 여부
}

export function useToast({
  message,
  title,
  description,
  type = 'primary',
  color = 'info',
  duration = 3000,
  onClose,
  placement = 'top',
  showIcon = false,
  showProgress = false,
  showClose = false,
  index = 0,
  maxCount = Infinity,
}: UseToastProps & { index?: number; maxCount?: number }) {
  // 아이콘 결정
  const getIcon = () => {
    if (!showIcon) return null;

    switch (color) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  // 스타일 결정
  const getStyles = () => {
    const baseStyles = {
      success: {
        backgroundColor: 'var(--color-semantic-success)',
        borderColor: 'var(--color-semantic-success-hover)',
        color: 'var(--color-text-on-success)',
      },
      error: {
        backgroundColor: 'var(--color-semantic-error)',
        borderColor: 'var(--color-semantic-error-hover)',
        color: 'var(--color-text-on-error)',
      },
      warning: {
        backgroundColor: 'var(--color-semantic-warning)',
        borderColor: 'var(--color-semantic-warning-hover)',
        color: 'var(--color-text-on-warning)',
      },
      info: {
        backgroundColor: 'var(--color-semantic-info)',
        borderColor: 'var(--color-semantic-info-hover)',
        color: 'var(--color-text-on-info)',
      },
    };

    return baseStyles[color];
  };

  const getPlacementStyles = () => {
    return {};
  };

  const styles = getStyles();
  const icon = getIcon();
  const placementStyles = getPlacementStyles();

  return {
    icon,
    styles,
    placementStyles,
    duration,
    onClose,
    message,
    title,
    description,
    showProgress: duration === 0 ? false : showProgress,
    showClose,
  };
}
