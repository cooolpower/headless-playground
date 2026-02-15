'use client';

import { useState, useCallback } from 'react';
import { UseColorPickerProps, UseColorPickerReturn } from './type-color-picker';

export function useColorPicker({
  value,
  defaultValue = 'var(--color-neutral-0)',
  onChange,
}: UseColorPickerProps): UseColorPickerReturn {
  const [internalColor, setInternalColor] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  const isControlled = value !== undefined;
  const color = isControlled ? value : internalColor;

  const handleColorChange = useCallback(
    (newColor: string) => {
      if (!isControlled) {
        setInternalColor(newColor);
      }
      onChange?.(newColor);
    },
    [isControlled, onChange]
  );

  return {
    color,
    isOpen,
    setIsOpen,
    handleColorChange,
  };
}
