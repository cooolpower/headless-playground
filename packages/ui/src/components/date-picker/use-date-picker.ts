'use client';

import { useState, useCallback } from 'react';
import { UsedatepickerProps, UsedatepickerReturn } from './type-date-picker';

export function usedatepicker({
  value,
  defaultValue,
  onChange,
  disabled = false,
}: UsedatepickerProps): UsedatepickerReturn {
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
