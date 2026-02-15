'use client';

// components/headless/checkbox/use-checkbox.ts
import { useCallback, useState } from 'react';

export interface UseCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  onChange?: (
    checked: boolean,
    event?: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string;
  id?: string;
  required?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function useCheckbox({
  checked: controlledChecked,
  defaultChecked = false,
  disabled = false,
  indeterminate = false,
  onChange,
  onFocus,
  onBlur,
  name,
  value,
  id,
  required,
  size = 'medium',
}: UseCheckboxProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked;

      if (!isControlled) {
        setInternalChecked(newChecked);
      }

      onChange?.(newChecked, event);
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

  const sizeStyles = {
    small: { width: '16px', height: '16px' },
    medium: { width: '20px', height: '20px' },
    large: { width: '24px', height: '24px' },
  };

  return {
    checked,
    indeterminate,

    inputProps: {
      type: 'checkbox',
      checked,
      disabled,
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      name,
      value,
      id,
      required,
      style: {
        position: 'absolute' as const,
        opacity: 0,
        width: '1px',
        height: '1px',
        margin: '-1px',
        padding: 0,
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0,
      },
    },

    checkboxProps: {
      'aria-checked': indeterminate ? ('mixed' as const) : checked,
      'aria-disabled': disabled,
      style: {
        position: 'relative' as const,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sizeStyles[size],
        border:
          checked || indeterminate ? 'var(--border-width-medium) solid var(--color-semantic-info)' : 'var(--border-width-medium) solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        backgroundColor: disabled
          ? 'var(--color-background-disabled)'
          : checked || indeterminate
            ? 'var(--color-semantic-info)'
            : 'var(--color-surface)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s',
      },
    },

    checkmarkProps:
      checked || indeterminate
        ? {
            style: {
              color: 'white',
              fontSize:
                size === 'small' ? '12px' : size === 'large' ? '16px' : '14px',
              fontWeight: 'bold',
              lineHeight: 1,
            },
          }
        : null,
  };
}
