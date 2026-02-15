'use client';

import { useState, useCallback, useMemo } from 'react';
import { DynamicInputProps } from './type-dynamic-input';

export interface UseDynamicInputProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  min?: number;
  max?: number;
  onCreate?: () => void | boolean | Promise<void | boolean>;
  onRemove?: (index: number) => void | boolean | Promise<void | boolean>;
  disabled?: boolean;
}

export interface UseDynamicInputReturn {
  inputs: string[];
  handleAddInput: () => Promise<void>;
  handleRemoveInput: (index: number) => Promise<void>;
  handleInputChange: (index: number, value: string) => void;
  canAdd: boolean;
  canRemove: (index: number) => boolean;
}

export function useDynamicInput({
  value,
  defaultValue = [''],
  onChange,
  min = 0,
  max,
  onCreate,
  onRemove,
  disabled = false,
}: UseDynamicInputProps): UseDynamicInputReturn {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);

  const inputs = isControlled ? value : internalValue;

  const canAdd = useMemo(() => {
    if (disabled) return false;
    if (max !== undefined && inputs.length >= max) return false;
    return true;
  }, [disabled, max, inputs.length]);

  const canRemove = useCallback(
    (index: number) => {
      if (disabled) return false;
      if (min !== undefined && inputs.length <= min) return false;
      return true;
    },
    [disabled, min, inputs.length],
  );

  const handleAddInput = useCallback(async () => {
    if (!canAdd) return;

    const shouldAdd = onCreate ? await onCreate() : true;
    if (shouldAdd === false) return;

    const newInputs = [...inputs, ''];
    if (!isControlled) {
      setInternalValue(newInputs);
    }
    onChange?.(newInputs);
  }, [inputs, canAdd, onCreate, isControlled, onChange]);

  const handleRemoveInput = useCallback(
    async (index: number) => {
      if (!canRemove(index)) return;

      const shouldRemove = onRemove ? await onRemove(index) : true;
      if (shouldRemove === false) return;

      const newInputs = inputs.filter((_, i) => i !== index);
      if (!isControlled) {
        setInternalValue(newInputs);
      }
      onChange?.(newInputs);
    },
    [inputs, canRemove, onRemove, isControlled, onChange],
  );

  const handleInputChange = useCallback(
    (index: number, value: string) => {
      const newInputs = [...inputs];
      newInputs[index] = value;
      if (!isControlled) {
        setInternalValue(newInputs);
      }
      onChange?.(newInputs);
    },
    [inputs, isControlled, onChange],
  );

  return {
    inputs,
    handleAddInput,
    handleRemoveInput,
    handleInputChange,
    canAdd,
    canRemove,
  };
}
