'use client';

// components/headless/textarea/use-textarea.ts
import { useCallback, useState, useRef, useEffect } from 'react';

export interface UseTextareaProps {
  size?: 'custom' | 'small' | 'medium' | 'large';
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (
    value: string,
    event?: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLTextAreaElement>) => void;
  clearable?: boolean;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
  name?: string;
  id?: string;
  rows?: number;
  cols?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  autoResize?: boolean;
  /** Textarea 요소에 직접 적용할 style */
  textareaStyle?: React.CSSProperties;
}

export function useTextarea({
  size = 'medium',
  disabled = false,
  readonly = false,
  placeholder,
  value: controlledValue,
  defaultValue = '',
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  onClick,
  clearable = false,
  maxLength,
  minLength,
  required,
  autoComplete,
  autoFocus,
  name,
  id,
  rows,
  cols,
  resize = 'vertical',
  autoResize = false,
  textareaClassName,
  textareaStyle,
}: UseTextareaProps & { textareaClassName?: string }): {
  value: string;
  isFocused: boolean;
  textareaRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  textareaProps: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  wrapperProps: { style: undefined };
  clearButtonProps: { onClick: () => void } | null;
} {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  // Auto-resize 기능: 텍스트가 입력되면 자동으로 높이 조정
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea || !autoResize) return;

    // 높이를 초기화하여 정확한 scrollHeight 측정
    textarea.style.height = 'auto';
    // scrollHeight를 사용하여 필요한 높이 계산
    const newHeight = textarea.scrollHeight;
    textarea.style.height = `${newHeight}px`;
  }, [autoResize]);

  // value가 변경될 때마다 높이 조정
  useEffect(() => {
    if (autoResize) {
      adjustHeight();
    }
  }, [value, autoResize, adjustHeight]);

  // autoResize가 활성화되면 초기 마운트 시에도 높이 조정
  useEffect(() => {
    if (autoResize && textareaRef.current) {
      // 다음 프레임에서 높이 조정 (DOM이 완전히 렌더링된 후)
      requestAnimationFrame(() => {
        adjustHeight();
      });
    }
  }, [autoResize, adjustHeight]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value;

      if (!isControlled) {
        setInternalValue(newValue);
      }

      onChange?.(newValue, event);

      // autoResize가 활성화되어 있으면 높이 조정
      if (autoResize) {
        // 다음 프레임에서 높이 조정 (DOM 업데이트 후)
        requestAnimationFrame(() => {
          adjustHeight();
        });
      }
    },
    [isControlled, onChange, autoResize, adjustHeight]
  );

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    },
    [onBlur]
  );

  const handleClear = useCallback(() => {
    const emptyValue = '';

    if (!isControlled) {
      setInternalValue(emptyValue);
    }

    onChange?.(emptyValue);
  }, [isControlled, onChange]);

  // autoResize가 활성화되면 resize를 'none'으로 강제 설정
  const effectiveResize = autoResize ? 'none' : resize;
  const effectiveOverflow = autoResize ? 'hidden' : (effectiveResize === 'none' ? 'hidden' : 'auto');

  return {
    value,
    isFocused,
    textareaRef,

    textareaProps: {
      disabled,
      readOnly: readonly,
      placeholder,
      value,
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onKeyDown,
      onClick,
      maxLength,
      minLength,
      required,
      autoComplete,
      autoFocus,
      name,
      id,
      rows: autoResize ? undefined : rows, // autoResize일 때는 rows 무시
      cols,
      className: textareaClassName,
      style: {
        resize: effectiveResize,
        overflow: effectiveOverflow,
        ...(textareaStyle || {}),
      },
    },

    wrapperProps: {
      style: undefined,
    },

    clearButtonProps:
      clearable && value
        ? {
            onClick: handleClear,
          }
        : null,
  };
}

