'use client';

import { useState, useCallback } from 'react';
import {
  UseAutocompleteProps,
  UseAutocompleteReturn,
} from './type-auto-complete';

export function useAutocomplete({
  value,
  defaultValue,
  onChange,
  disabled = false,
}: UseAutocompleteProps): UseAutocompleteReturn {
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
