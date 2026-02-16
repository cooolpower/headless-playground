'use client';

// components/headless/button/use-button.ts
import { useCallback } from 'react';
import { type UseButtonProps } from './type-buttons';

export function useButton({
  disabled,
  onClick,
  className,
  style,
  title,
  type,
  color,
  size,
  loading
}: UseButtonProps) {
  const handleClick = useCallback(() => {
    if (disabled) return;
    onClick?.();
  }, [disabled, onClick]);

  return {
    role: 'button',
    tabIndex: disabled ? -1 : 0,
    'aria-disabled': disabled,
    'data-disabled': disabled ? 'true' : 'false',
    'data-button-type': type,
    'data-button-color': color,
    'data-button-size': size,
    'data-loading': loading ? 'true' : 'false',
    onClick: handleClick,
    className: ['hcButton', loading && 'loading', className].filter(Boolean).join(' '),
    style,
    title,
  };
}
