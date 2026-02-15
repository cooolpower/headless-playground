'use client';

import { useState, useCallback } from 'react';
import { UseqrcodeProps, UseqrcodeReturn } from './type-qr-code';

export function useqrcode({
  value,
  defaultValue,
  onChange,
  disabled = false,
}: UseqrcodeProps): UseqrcodeReturn {
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
