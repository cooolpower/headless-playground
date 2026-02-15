'use client';

// components/headless/switch/use-switch.ts
import { useCallback, useState } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface UseSwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  round?: boolean;
  railColor?: string;
  railColorActive?: string;
  checkedIcon?: LucideIcon | React.ComponentType;
  uncheckedIcon?: LucideIcon | React.ComponentType;
  onChange?: (checked: boolean) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string;
}

export function useSwitch({
  checked: controlledChecked,
  defaultChecked = false,
  disabled = false,
  size = 'medium',
  loading = false,
  round = true,
  railColor,
  railColorActive,
  checkedIcon,
  uncheckedIcon,
  onChange,
  onFocus,
  onBlur,
  name,
  value,
}: UseSwitchProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked;

      if (!isControlled) {
        setInternalChecked(newChecked);
      }

      onChange?.(newChecked);
    },
    [isControlled, onChange]
  );

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      onFocus?.(event);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(event);
    },
    [onBlur]
  );

  const effectiveDisabled = disabled || loading;

  return {
    checked,
    loading,
    checkedIcon,
    uncheckedIcon,
    size,
    round,
    disabled: effectiveDisabled,
    railColor,
    railColorActive,

    inputProps: {
      type: 'checkbox',
      checked,
      disabled: effectiveDisabled,
      name,
      value,
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
    },
  };
}
