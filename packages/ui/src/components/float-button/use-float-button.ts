'use client';

// components/headless/float-button/use-float-button.ts
import { useCallback } from 'react';

export interface UseFloatButtonProps {
  onClick?: () => void;
  position?:
    | 'bottom-right'
    | 'bottom-center'
    | 'bottom-left'
    | 'top-right'
    | 'top-left';
  size?: 'small' | 'medium' | 'large';
  shape?: 'circle' | 'square';
  type?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';
  disabled?: boolean;
  loading?: boolean;
  tooltip?: string;
  show?: boolean;
  inGroup?: boolean;
  className?: string;
  injectStyles?: boolean;
}

export function useFloatButton({
  onClick,
  position = 'bottom-right',
  size = 'medium',
  shape = 'circle',
  type = 'primary',
  disabled = false,
  loading = false,
  tooltip,
  show = true,
  inGroup = false,
  className,
}: UseFloatButtonProps) {
  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (disabled || loading) return;
      onClick?.();
    },
    [onClick, disabled, loading]
  );

  const positionX = 20;
  const positionY = 20;

  const positionStyles = {
    'bottom-right': { bottom: `${positionX}px`, right: `${positionY}px` },
    'bottom-center': { bottom: `${positionX}px`, left: `50%` },
    'bottom-left': { bottom: `${positionX}px`, left: `${positionY}px` },
    'top-right': { top: `${positionX}px`, right: `${positionY}px` },
    'top-left': { top: `${positionX}px`, left: `${positionY}px` },
  };

  return {
    onClick: handleClick,
    disabled,
    className: ['hcFloatButton', className].filter(Boolean).join(' '),
    'data-position': position,
    'data-size': size,
    'data-shape': shape,
    'data-type': type,
    'data-disabled': disabled ? 'true' : 'false',
    'data-loading': loading ? 'true' : 'false',
    'data-show': show ? 'true' : 'false',
    'data-in-group': inGroup ? 'true' : 'false',
    style: {
      ...(inGroup ? {} : positionStyles[position]),
    } as any,
    'aria-label': tooltip,
    title: tooltip,
  };
}
