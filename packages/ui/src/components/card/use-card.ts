'use client';

// components/headless/card/use-card.ts
import { useCallback } from 'react';

export interface UseCardProps {
  onClick?: () => void;
  disabled?: boolean;
}

export function useCard({ onClick, disabled }: UseCardProps) {
  const handleClick = useCallback(() => {
    if (disabled) return;
    onClick?.();
  }, [disabled, onClick]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  return {
    onClick: disabled ? undefined : handleClick,
    onKeyDown: disabled ? undefined : handleKeyDown,
    role: onClick ? 'button' : undefined,
    tabIndex: onClick ? 0 : undefined,
    'aria-disabled': disabled,
    style: {
      cursor: disabled ? 'not-allowed' : onClick ? 'pointer' : 'default',
    },
  };
}
