'use client';

import { useState, useCallback } from 'react';
import { UseRateProps, UseRateReturn } from './type-rate';

export function useRate({
  value,
  defaultValue = 0,
  onChange,
  count = 5,
  allowHalf = false,
  disabled = false,
}: UseRateProps): UseRateReturn {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleClick = useCallback(
    (index: number, isHalf: boolean) => {
      if (disabled) return;

      const newValue = index + (isHalf && allowHalf ? 0.5 : 1);

      if (!isControlled) {
        setInternalValue(newValue);
      }

      onChange?.(newValue);
    },
    [disabled, allowHalf, isControlled, onChange]
  );

  const handleHover = useCallback(
    (index: number, isHalf: boolean) => {
      if (disabled) return;

      const newHoverValue = index + (isHalf && allowHalf ? 0.5 : 1);
      setHoverValue(newHoverValue);
    },
    [disabled, allowHalf]
  );

  const handleLeave = useCallback(() => {
    setHoverValue(null);
  }, []);

  return {
    currentValue,
    handleClick,
    handleHover,
    handleLeave,
    hoverValue,
  };
}
