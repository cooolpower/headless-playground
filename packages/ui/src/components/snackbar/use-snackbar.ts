'use client';

export interface UseSnackbarProps {
  message: React.ReactNode;
  action?: React.ReactNode;
  duration?: number; // milliseconds, 0 means never auto-close
  onClose?: () => void;
  placement?: 'bottom' | 'bottom-left' | 'bottom-right';
  closable?: boolean;
  showProgress?: boolean; // 프로그레스 바 표시 여부
}

export function useSnackbar({
  message,
  action,
  duration = 4000,
  onClose,
  placement = 'bottom',
  closable = false,
  showProgress = false,
  index = 0,
  maxCount = Infinity,
}: UseSnackbarProps & { index?: number; maxCount?: number }) {
  const getPlacementStyles = (index: number = 0, maxCount: number = Infinity) => {
    const SNACKBAR_HEIGHT = 60; // Snackbar 높이 + 간격
    const baseOffset = 20;
    
    // maxCount를 초과하면 표시하지 않음
    if (index >= maxCount) {
      return {
        display: 'none' as const,
      };
    }

    const offset = index * SNACKBAR_HEIGHT;

    const placements = {
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

  const placementStyles = getPlacementStyles(index, maxCount);

  return {
    placementStyles,
    duration,
    onClose,
    message,
    action,
    closable,
    showProgress,
  };
}
