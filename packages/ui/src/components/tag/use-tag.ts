'use client';

// components/headless/tag/use-tag.ts
import { useCallback } from 'react';

export interface UseTagProps {
  onClose?: () => void;
  closable?: boolean;
  disabled?: boolean;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
  /** 기본 스타일(CSS) 주입 여부 */
  injectStyles?: boolean;
  className?: string;
}

export function useTag({
  onClose,
  closable,
  disabled,
  variant = 'default',
  size = 'medium',
  className,
}: UseTagProps) {
  const handleClose = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      if (disabled) return;
      onClose?.();
    },
    [onClose, disabled]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Backspace' || event.key === 'Delete') {
        event.preventDefault();
        if (disabled) return;
        onClose?.();
      }
    },
    [onClose, disabled]
  );

  return {
    role: 'tag',
    tabIndex: closable ? 0 : undefined,
    onKeyDown: closable ? handleKeyDown : undefined,
    className,
    'data-variant': variant,
    'data-size': size,
    'data-disabled': disabled ? 'true' : 'false',
  };
}
