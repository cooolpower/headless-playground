'use client';

import { useState, useCallback } from 'react';
import { UseChartProps, UseChartReturn } from './type-chart';

export function useChart({
  value,
  defaultValue,
  onChange,
  disabled = false,
}: UseChartProps): UseChartReturn {
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
