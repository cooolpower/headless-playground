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
      // 1. 카드가 클릭 가능하지 않으면(onClick이 없으면) 키보드 이벤트를 처리하지 않음
      if (!onClick || disabled) return;

      // 2. 입력창(input, textarea) 내부에서의 입력은 가로채지 않음
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleClick();
      }
    },
    [handleClick, onClick, disabled]
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
