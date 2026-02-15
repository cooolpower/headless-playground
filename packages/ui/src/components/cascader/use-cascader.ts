'use client';

// components/headless/cascader/use-cascader.ts
import { useCallback, useState, useRef, useEffect, useMemo } from 'react';

export interface CascaderOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  children?: CascaderOption[];
}

export interface UseCascaderProps {
  options?: CascaderOption[];
  value?: string[];
  defaultValue?: string[];
  placeholder?: string;
  disabled?: boolean;
  separator?: string; // 선택된 값들의 구분자 (기본값: ' / ')
  size?: 'small' | 'medium' | 'large';
  onChange?: (value: string[]) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

export function useCascader({
  options = [],
  value: controlledValue,
  defaultValue = [],
  placeholder = '선택하세요...',
  disabled = false,
  separator = ' / ',
  size = 'medium',
  onChange,
  onOpen,
  onClose,
}: UseCascaderProps) {
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [activePath, setActivePath] = useState<string[]>([]); // 현재 활성화된 경로 (예: ['option1', 'option2'])

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const cascaderRef = useRef<HTMLDivElement>(null);

  // 옵션을 경로로 찾기
  const findOptionByPath = useCallback(
    (path: string[], opts: CascaderOption[] = options): CascaderOption | null => {
      if (path.length === 0) return null;
      const [first, ...rest] = path;
      const option = opts.find((opt) => String(opt.value) === first);
      if (!option) return null;
      if (rest.length === 0) return option;
      if (!option.children || option.children.length === 0) return null;
      return findOptionByPath(rest, option.children);
    },
    [options],
  );

  // 경로의 모든 레이블 가져오기
  const getPathLabels = useCallback(
    (path: string[]): string[] => {
      const labels: string[] = [];
      let currentOptions = options;
      for (const pathValue of path) {
        const option = currentOptions.find((opt) => String(opt.value) === pathValue);
        if (!option) break;
        labels.push(option.label);
        if (option.children) {
          currentOptions = option.children;
        } else {
          break;
        }
      }
      return labels;
    },
    [options],
  );

  // 선택된 값들의 레이블을 구분자로 연결하여 표시
  // 서버와 클라이언트 간 일관성을 위해 useMemo 사용
  const displayValue = useMemo(() => {
    if (value.length === 0) return placeholder;
    try {
      const labels = getPathLabels(value);
      return labels.length > 0 ? labels.join(separator) : placeholder;
    } catch {
      // 에러 발생 시 placeholder 반환 (hydration 안정성)
      return placeholder;
    }
  }, [value, separator, placeholder, getPathLabels]);

  const handleToggle = useCallback(() => {
    if (disabled) return;

    if (isOpen) {
      setIsOpen(false);
      setActivePath([]);
      onClose?.();
    } else {
      setIsOpen(true);
      onOpen?.();
    }
  }, [disabled, isOpen, onClose, onOpen]);

  // 옵션 선택 핸들러
  const handleSelect = useCallback(
    (option: CascaderOption, depth: number) => {
      if (option.disabled) return;

      const newPath = activePath.slice(0, depth);
      newPath.push(String(option.value));

      // 자식이 있으면 다음 depth로 이동
      if (option.children && option.children.length > 0) {
        setActivePath(newPath);
      } else {
        // 리프 노드 선택 시 값 업데이트
        const newValue = [...newPath];
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
        setIsOpen(false);
        setActivePath([]);
        onClose?.();
      }
    },
    [activePath, isControlled, onChange, onClose],
  );

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cascaderRef.current && !cascaderRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActivePath([]);
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // 현재 depth의 옵션들 가져오기
  const getCurrentOptions = useCallback((): CascaderOption[] => {
    if (activePath.length === 0) {
      return options;
    }
    const option = findOptionByPath(activePath);
    return option?.children || [];
  }, [activePath, options, findOptionByPath]);

  return {
    value,
    displayValue,
    isOpen,
    activePath,
    separator,
    size,
    disabled,
    cascaderRef,
    handleToggle,
    handleSelect,
    getCurrentOptions,
    getPathLabels,
  };
}
