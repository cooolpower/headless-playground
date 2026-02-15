'use client';

// components/headless/select/use-select.ts
import { useCallback, useState, useRef, useEffect } from 'react';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  group?: string;
  description?: string;
  colorPreview?: string; // 색상 미리보기를 위한 CSS 색상 값
  iconPreview?: React.ReactNode; // 아이콘 미리보기
}

export type SelectValue = string | number;
export type SelectValueOrValues = SelectValue | SelectValue[];

export interface UseSelectProps {
  options?: SelectOption[];
  value?: SelectValueOrValues;
  defaultValue?: SelectValueOrValues;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  tag?: boolean; // Tag 모드: 검색 결과가 없을 때 새 옵션 생성 가능
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  onChange?: (value: SelectValueOrValues | undefined) => void;
  onCreate?: (label: string) => void; // 새 옵션 생성 콜백
  onOpen?: () => void;
  onClose?: () => void;
}

export function useSelect({
  options = [],
  value: controlledValue,
  defaultValue,
  placeholder = 'Select...',
  disabled = false,
  multiple = false,
  searchable = false,
  clearable = false,
  tag = false,
  size = 'medium',
  loading = false,
  onChange,
  onCreate,
  onOpen,
  onClose,
}: UseSelectProps) {
  const [internalValue, setInternalValue] = useState<SelectValueOrValues | undefined>(
    defaultValue
  );
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const selectRef = useRef<HTMLDivElement>(null);

  const selectedValues: SelectValue[] = multiple
    ? Array.isArray(value)
      ? value
      : value !== undefined
        ? [value]
        : []
    : value !== undefined && !Array.isArray(value)
      ? [value]
      : [];

  const selectedOptions = options.filter((option) =>
    selectedValues.includes(option.value)
  );

  const selectedLabel = multiple
    ? selectedOptions.length > 0
      ? `${selectedOptions.length}개 선택됨`
      : placeholder
    : selectedOptions[0]?.label || placeholder;

  const handleToggle = useCallback(() => {
    if (disabled) return;

    if (isOpen) {
      setIsOpen(false);
      onClose?.();
      setSearchValue('');
    } else {
      setIsOpen(true);
      onOpen?.();
    }
  }, [disabled, isOpen, onClose, onOpen]);

  const handleSelect = useCallback(
    (option: SelectOption) => {
      if (option.disabled) return;

      // Tag 모드: 새 옵션 생성
      if (option.value.toString().startsWith('__create__')) {
        const newLabel = searchValue.trim();
        if (newLabel && onCreate) {
          onCreate(newLabel);
          // 새 옵션 생성 후 검색어 초기화
          setSearchValue('');
          return;
        }
        return;
      }

      const optionValue = option.value;

      if (multiple) {
        const prev = Array.isArray(value)
          ? value
          : value !== undefined
            ? [value]
            : [];

        const exists = prev.includes(optionValue);
        const next = exists
          ? prev.filter((v) => v !== optionValue)
          : [...prev, optionValue];

        if (!isControlled) {
          setInternalValue(next);
        }
        onChange?.(next);

        // multiple에서는 드롭다운을 닫지 않고 계속 선택하도록 유지
        return;
      }

      if (!isControlled) {
        setInternalValue(optionValue);
      }

      onChange?.(optionValue);
      setIsOpen(false);
      onClose?.();
      setSearchValue('');
    },
    [isControlled, multiple, onChange, onClose, value, onCreate, searchValue]
  );

  const handleClear = useCallback(() => {
    const emptyValue: SelectValueOrValues | undefined = multiple ? [] : undefined;

    if (!isControlled) {
      setInternalValue(emptyValue);
    }

    onChange?.(emptyValue);
  }, [multiple, isControlled, onChange]);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        onClose?.();
        setSearchValue('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // 필터링된 옵션들
  const filteredOptions =
    searchable && searchValue
      ? options.filter((option) =>
          option.label.toLowerCase().includes(searchValue.toLowerCase())
        )
      : options;

  // Tag 모드: 검색 결과가 없고 검색어가 있을 때 새 옵션 생성 옵션 추가
  const shouldShowCreateOption =
    tag &&
    searchable &&
    searchValue &&
    searchValue.trim() !== '' &&
    filteredOptions.length === 0 &&
    !options.some(
      (opt) => opt.label.toLowerCase() === searchValue.toLowerCase()
    );

  const createOption: SelectOption | null = shouldShowCreateOption
    ? {
        label: `새 항목 생성: "${searchValue}"`,
        value: `__create__${searchValue}`,
      }
    : null;

  const displayOptions = createOption
    ? [createOption, ...filteredOptions]
    : filteredOptions;

  const sizeStyles = {
    small: { height: '32px', fontSize: '14px' },
    medium: { height: '40px', fontSize: '16px' },
    large: { height: '48px', fontSize: '18px' },
  };

  return {
    value,
    isOpen,
    selectedLabel,
    searchValue,
    filteredOptions: displayOptions,
    handleSelect,
    selectedValues,
    selectedOptions,
    multiple,
    loading,
    createOption,

    containerProps: {
      ref: selectRef,
      style: {
        position: 'relative' as const,
        width: '100%',
      },
    },

    triggerProps: {
      onClick: handleToggle,
      disabled,
      style: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        border: 'var(--border-width-thin) solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        backgroundColor: disabled ? 'var(--color-background-disabled)' : 'var(--color-surface)',
        color: disabled
          ? 'var(--color-text-disabled)'
          : selectedOptions.length > 0
            ? 'var(--color-text-heading)'
            : 'var(--color-text-secondary)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        outline: 'none',
        transition: 'border-color 0.2s',
        ...sizeStyles[size],
      },
    },

    dropdownProps: {
      style: {
        position: 'absolute' as const,
        top: '100%',
        left: 0,
        right: 0,
        zIndex: 1000,
        marginTop: '4px',
        padding: '4px 0',
        border: 'var(--border-width-thin) solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        backgroundColor: 'var(--color-surface)',
        boxShadow: 'var(--shadow-lg)',
        maxHeight: '200px',
        overflowY: 'auto' as any,
        display: isOpen ? 'block' : 'none',
      },
    },

    searchInputProps: searchable
      ? {
          value: searchValue,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value),
          placeholder: 'Search...',
          style: {
            width: '100%',
            padding: '8px 12px',
            border: 'none',
            outline: 'none',
            fontSize: '14px',
          },
        }
      : null,

    clearButtonProps:
      clearable && (multiple ? selectedValues.length > 0 : value !== undefined)
        ? {
            onClick: (e: React.MouseEvent) => {
              e.stopPropagation();
              handleClear();
            },
            style: {
              marginLeft: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-disabled)',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
            },
          }
        : null,
  };
}
