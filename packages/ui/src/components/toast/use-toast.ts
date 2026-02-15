'use client';

export interface UseToastProps {
  message: React.ReactNode;
  type?: 'success' | 'info' | 'warning' | 'error';
  duration?: number; // milliseconds, 0 means never auto-close
  onClose?: () => void;
  placement?: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right';
  showIcon?: boolean;
  showProgress?: boolean; // 프로그레스 바 표시 여부
}

export function useToast({
  message,
  type = 'info',
  duration = 3000,
  onClose,
  placement = 'top',
  showIcon = false,
  showProgress = false,
  index = 0,
  maxCount = Infinity,
}: UseToastProps & { index?: number; maxCount?: number }) {
  // 아이콘 결정
  const getIcon = () => {
    if (!showIcon) return null;

    switch (type) {
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

    return baseStyles[type];
  };

  const getPlacementStyles = (index: number = 0, maxCount: number = Infinity) => {
    const TOAST_HEIGHT = 60; // Toast 높이 + 간격
    const baseOffset = 20;
    
    // maxCount를 초과하면 표시하지 않음
    if (index >= maxCount) {
      return {
        display: 'none' as const,
      };
    }

    const offset = index * TOAST_HEIGHT;

    const placements = {
      top: {
        top: `${baseOffset + offset}px`,
        left: '50%',
        transform: 'translateX(-50%)',
      },
      'top-left': {
        top: `${baseOffset + offset}px`,
        left: '20px',
      },
      'top-right': {
        top: `${baseOffset + offset}px`,
        right: '20px',
      },
      bottom: {
        bottom: `${baseOffset + offset}px`,
        left: '50%',
        transform: 'translateX(-50%)',
      },
      'bottom-left': {
        bottom: `${baseOffset + offset}px`,
        left: '20px',
      },
      'bottom-right': {
        bottom: `${baseOffset + offset}px`,
        right: '20px',
      },
    };

    return placements[placement];
  };

  const styles = getStyles();
  const icon = getIcon();
  const placementStyles = getPlacementStyles(index, maxCount);

  return {
    icon,
    styles,
    placementStyles,
    duration,
    onClose,
    message,
    showProgress,
  };
}
