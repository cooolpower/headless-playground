'use client';

import { useState, useCallback } from 'react';
import { UseCarouselProps, UseCarouselReturn } from './type-carousel';

export function useCarousel({
  value,
  defaultValue,
  onChange,
  disabled = false,
}: UseCarouselProps): UseCarouselReturn {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = useCallback(
    (newValue: any) => {
      if (disabled) return;

      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [disabled, isControlled, onChange]
  );

  return {
    currentValue,
    handleChange,
  };
}
