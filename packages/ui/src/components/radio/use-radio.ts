'use client';

// components/headless/radio/use-radio.ts
import { useCallback, useState, useContext, createContext } from 'react';

export interface UseRadioProps {
  value?: string | number;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  name?: string;
  onChange?: (value: string | number) => void;
  size?: 'small' | 'medium' | 'large';
}

// Radio Group Context
interface RadioGroupContextValue {
  value: string | number | undefined;
  onChange: (value: string | number) => void;
  name?: string;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface UseRadioGroupProps {
  value?: string | number;
  defaultValue?: string | number;
  disabled?: boolean;
  name?: string;
  onChange?: (value: string | number) => void;
  size?: 'small' | 'medium' | 'large';
}

export function useRadioGroup({
  value: controlledValue,
  defaultValue,
  disabled = false,
  name,
  onChange,
  size = 'medium',
}: UseRadioGroupProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = useCallback(
    (newValue: string | number) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange]
  );

  const contextValue: RadioGroupContextValue = {
    value,
    onChange: handleChange,
    name,
    disabled,
    size,
  };

  return {
    value,
    contextValue,
  };
}

export function useRadio({
  value,
  checked: controlledChecked,
  defaultChecked = false,
  disabled = false,
  name,
  onChange,
  size = 'medium',
}: UseRadioProps) {
  const groupContext = useContext(RadioGroupContext);

  // Group context가 있으면 그것을 사용
  const isInGroup = !!groupContext;
  const groupValue = groupContext?.value;
  const groupOnChange = groupContext?.onChange;
  const groupName = groupContext?.name;
  const groupDisabled = groupContext?.disabled;
  const groupSize = groupContext?.size || size;

  // RadioGroup 밖에서 사용될 때는 checked/defaultChecked를 사용
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const standaloneChecked = isControlled ? controlledChecked : internalChecked;

  // Group 안에서는 groupValue와 비교, 밖에서는 standaloneChecked 사용
  const isChecked = isInGroup
    ? groupValue === value
    : standaloneChecked;
  
  const finalDisabled = disabled || groupDisabled || false;
  const finalSize = groupSize;
  const finalName = name || groupName;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isInGroup) {
        // Group 안에서는 groupOnChange 사용
        if (value !== undefined && groupOnChange) {
          groupOnChange(value);
        }
      } else {
        // Group 밖에서는 내부 상태 업데이트
        if (!isControlled) {
          setInternalChecked(event.target.checked);
        }
      }
      onChange?.(value!);
    },
    [isInGroup, value, groupOnChange, onChange, isControlled]
  );

  return {
    isChecked,
    finalDisabled,
    finalSize,
    finalName,

    inputProps: {
      type: 'radio',
      checked: isChecked,
      disabled: finalDisabled,
      name: finalName,
      value: value,
      onChange: handleChange,
      className: 'hcRadioInput',
    },

    radioProps: {
      className: 'hcRadioCircle',
      'data-size': finalSize,
      'data-disabled': finalDisabled ? 'true' : 'false',
      'data-checked': isChecked ? 'true' : 'false',
    },

    dotProps: isChecked
      ? {
          className: 'hcRadioDot',
          'data-size': finalSize,
        }
      : null,
  };
}

export { RadioGroupContext };
