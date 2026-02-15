'use client';

import { useState, useCallback, useEffect } from 'react';
import { UseInputNumberProps, UseInputNumberReturn } from './type-input-number';

export function useInputNumber({
  value,
  defaultValue = undefined,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  precision = 0,
  controls = true,
  keyboard = true,
  stringMode = false,
}: UseInputNumberProps): UseInputNumberReturn {
  const [internalValue, setInternalValue] = useState<number | undefined>(
    defaultValue
  );
  const [inputValue, setInputValue] = useState<string>('');

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  // 값 검증
  const isValidValue = useCallback(
    (val: number): boolean => {
      return !isNaN(val) && val >= min && val <= max;
    },
    [min, max]
  );

  // 값 클램핑
  const clampValue = useCallback(
    (val: number): number => {
      return Math.min(Math.max(val, min), max);
    },
    [min, max]
  );

  // 값 포맷팅
  const formatValue = useCallback(
    (val: number): string => {
      if (stringMode) return val.toString();

      // 정밀도에 따라 소수점 자르기
      const rounded = Number(val.toFixed(precision));

      // 한국어 로케일로 포맷팅 (천 단위 구분자 포함)
      return new Intl.NumberFormat('ko-KR', {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      }).format(rounded);
    },
    [precision, stringMode]
  );

  // 값 업데이트
  const updateValue = useCallback(
    (newValue: number | undefined) => {
      if (newValue === undefined) {
        if (!isControlled) {
          setInternalValue(undefined);
          setInputValue('');
        }
        onChange?.(undefined);
        return;
      }

      const clampedValue = clampValue(newValue);

      if (isValidValue(clampedValue)) {
        if (!isControlled) {
          setInternalValue(clampedValue);
        }
        setInputValue(formatValue(clampedValue));
        onChange?.(clampedValue);
      }
    },
    [isControlled, clampValue, isValidValue, formatValue, onChange]
  );

  // 입력 변경 핸들러
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputStr = e.target.value;

      // 빈 값 허용
      if (inputStr === '') {
        setInputValue('');
        updateValue(undefined);
        return;
      }

      // 숫자만 허용 (쉼표, 마이너스, 소수점)
      const sanitized = inputStr.replace(/[^\d.,-]/g, '');
      setInputValue(sanitized);

      // 숫자로 변환 시도
      const numValue = parseFloat(sanitized.replace(/,/g, ''));
      if (!isNaN(numValue)) {
        updateValue(numValue);
      }
    },
    [updateValue]
  );

  // 증감 핸들러
  const handleIncrement = useCallback(() => {
    const newValue = (currentValue ?? 0) + step;
    updateValue(newValue);
  }, [currentValue, step, updateValue]);

  const handleDecrement = useCallback(() => {
    const newValue = (currentValue ?? 0) - step;
    updateValue(newValue);
  }, [currentValue, step, updateValue]);

  // 포커스 핸들러
  const handleFocus = useCallback(
    (e: React.FocusEvent) => {
      // 포커스 시 포맷팅된 값 표시
      if (currentValue !== undefined) {
        setInputValue(currentValue.toString());
      }
    },
    [currentValue]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent) => {
      // 블러 시 다시 포맷팅
      if (currentValue !== undefined) {
        setInputValue(formatValue(currentValue));
      }
    },
    [currentValue, formatValue]
  );

  // 키보드 핸들러
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!keyboard) return;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          handleIncrement();
          break;
        case 'ArrowDown':
          e.preventDefault();
          handleDecrement();
          break;
        case 'Enter':
          e.preventDefault();
          if (inputValue !== '') {
            const numValue = parseFloat(inputValue.replace(/,/g, ''));
            if (!isNaN(numValue)) {
              updateValue(numValue);
            }
          }
          break;
        case 'Escape':
          e.preventDefault();
          if (currentValue !== undefined) {
            setInputValue(formatValue(currentValue));
          }
          break;
      }
    },
    [
      keyboard,
      handleIncrement,
      handleDecrement,
      inputValue,
      currentValue,
      updateValue,
      formatValue,
    ]
  );

  // controlled value가 변경되면 input value 업데이트
  useEffect(() => {
    if (isControlled) {
      if (value === undefined) {
        setInputValue('');
      } else {
        setInputValue(formatValue(value));
      }
    }
  }, [value, isControlled, formatValue]);

  // 초기 값 설정
  useEffect(() => {
    if (currentValue !== undefined) {
      setInputValue(formatValue(currentValue));
    } else {
      setInputValue('');
    }
  }, [currentValue, formatValue]);

  return {
    currentValue,
    displayValue: inputValue,
    handleInputChange,
    handleIncrement,
    handleDecrement,
    handleFocus,
    handleBlur,
    handleKeyDown,
    isValidValue,
    clampValue,
    formatValue,
  };
}
