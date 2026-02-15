'use client';

import { useState, useCallback } from 'react';
import { UsemapProps, UsemapReturn } from './type-map';

export function usemap({
  value,
  defaultValue,
  onChange,
  disabled = false,
}: UsemapProps): UsemapReturn {
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
