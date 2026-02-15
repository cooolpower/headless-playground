'use client';

import { useState, useCallback } from 'react';
import { UseheatmapProps, UseheatmapReturn } from './type-heatmap';

export function useheatmap({
  value,
  defaultValue,
  onChange,
  disabled = false,
}: UseheatmapProps): UseheatmapReturn {
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
