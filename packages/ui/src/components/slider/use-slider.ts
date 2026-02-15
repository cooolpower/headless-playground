'use client';

// components/headless/slider/use-slider.ts
import { useCallback, useState, useRef } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface SliderMark {
  value: number;
  label?: string;
  icon?: LucideIcon;
}

export interface UseSliderProps {
  value?: number | [number, number]; // Range 슬라이더를 위해 배열 지원
  defaultValue?: number | [number, number];
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  vertical?: boolean; // 세로 슬라이더
  range?: boolean; // Range 슬라이더 (두 개의 핸들)
  showTooltip?: boolean | 'always' | 'onDrag' | 'never'; // 툴팁 표시 옵션
  tooltipFormatter?: (value: number) => string;
  marks?: SliderMark[];
  handleIcon?: LucideIcon; // 핸들에 표시할 아이콘
  railColor?: (value: number) => string; // 수치에 따른 레일 색상 함수
  onChange?: (value: number | [number, number]) => void;
  onChangeComplete?: (value: number | [number, number]) => void;
}

export function useSlider({
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  size = 'medium',
  vertical = false,
  range = false,
  showTooltip = false,
  tooltipFormatter,
  marks,
  handleIcon,
  railColor,
  onChange,
  onChangeComplete,
}: UseSliderProps) {
  // Range 슬라이더인지 확인
  const isRange = range || Array.isArray(controlledValue) || Array.isArray(defaultValue);
  
  // 초기값 설정
  const getInitialValue = () => {
    if (isRange) {
      if (Array.isArray(defaultValue)) return defaultValue;
      if (Array.isArray(controlledValue)) return controlledValue;
      return [min, max] as [number, number];
    }
    return Array.isArray(defaultValue) ? defaultValue[0] : defaultValue;
  };

  const [internalValue, setInternalValue] = useState<number | [number, number]>(getInitialValue());
  const [isDragging, setIsDragging] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null); // Range 슬라이더에서 어떤 핸들을 드래그 중인지
  const [showTooltipState, setShowTooltipState] = useState(false);
  const [hoveredHandle, setHoveredHandle] = useState<number | null>(null); // 호버된 핸들 인덱스

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // 값 정규화 (범위 내로 제한)
  const normalizeValue = useCallback(
    (val: number): number => {
      return Math.min(Math.max(val, min), max);
    },
    [min, max]
  );

  // 현재 값 가져오기 (단일 또는 Range)
  const getCurrentValues = useCallback((): [number, number] => {
    if (isRange) {
      if (Array.isArray(value)) {
        const [v1, v2] = value;
        return [normalizeValue(v1), normalizeValue(v2)].sort((a, b) => a - b) as [number, number];
      }
      return [min, max];
    }
    const singleValue = Array.isArray(value) ? value[0] : value;
    return [normalizeValue(singleValue), normalizeValue(singleValue)];
  }, [value, isRange, min, max, normalizeValue]);

  const [value1, value2] = getCurrentValues();
  const isRangeMode = isRange && value1 !== value2;

  // 백분율 계산
  const percentage1 = ((value1 - min) / (max - min)) * 100;
  const percentage2 = isRangeMode ? ((value2 - min) / (max - min)) * 100 : percentage1;

  // 이벤트에서 값 계산 (수평/수직 모두 지원)
  const getValueFromEvent = useCallback(
    (event: MouseEvent | React.MouseEvent): number => {
      if (!trackRef.current) return value1;

      const rect = trackRef.current.getBoundingClientRect();
      let percentage: number;

      if (vertical) {
        const y = event.clientY - rect.top;
        percentage = 1 - Math.min(Math.max(y / rect.height, 0), 1); // 세로는 위에서 아래로
      } else {
        const x = event.clientX - rect.left;
        percentage = Math.min(Math.max(x / rect.width, 0), 1);
      }

      const rawValue = percentage * (max - min) + min;
      return Math.round(rawValue / step) * step;
    },
    [min, max, step, vertical, value1]
  );

  // Range 슬라이더에서 어떤 핸들에 가까운지 판단
  const getClosestHandleIndex = useCallback(
    (newValue: number): number => {
      if (!isRangeMode) return 0;
      const dist1 = Math.abs(newValue - value1);
      const dist2 = Math.abs(newValue - value2);
      return dist1 <= dist2 ? 0 : 1;
    },
    [isRangeMode, value1, value2]
  );

  // 값 업데이트
  const updateValue = useCallback(
    (newValue: number, handleIndex?: number) => {
      if (isRange) {
        const [v1, v2] = getCurrentValues();
        let newValues: [number, number];

        if (handleIndex !== undefined) {
          // 특정 핸들 업데이트
          if (handleIndex === 0) {
            newValues = [normalizeValue(newValue), v2].sort((a, b) => a - b) as [number, number];
          } else {
            newValues = [v1, normalizeValue(newValue)].sort((a, b) => a - b) as [number, number];
          }
        } else {
          // 가장 가까운 핸들 업데이트
          const closestIndex = getClosestHandleIndex(newValue);
          if (closestIndex === 0) {
            newValues = [normalizeValue(newValue), v2].sort((a, b) => a - b) as [number, number];
          } else {
            newValues = [v1, normalizeValue(newValue)].sort((a, b) => a - b) as [number, number];
          }
        }

        // 두 핸들이 겹치지 않도록
        if (newValues[0] >= newValues[1]) {
          if (handleIndex === 0 || (handleIndex === undefined && getClosestHandleIndex(newValue) === 0)) {
            newValues = [Math.max(min, newValues[1] - step), newValues[1]];
          } else {
            newValues = [newValues[0], Math.min(max, newValues[0] + step)];
          }
        }

        if (!isControlled) {
          setInternalValue(newValues);
        }
        onChange?.(newValues);
        return newValues;
      } else {
        const normalized = normalizeValue(newValue);
        if (!isControlled) {
          setInternalValue(normalized);
        }
        onChange?.(normalized);
        return normalized;
      }
    },
    [isRange, isControlled, getCurrentValues, normalizeValue, getClosestHandleIndex, min, max, step, onChange]
  );

  const handleMouseDown = useCallback(
    (event: React.MouseEvent, handleIndex?: number) => {
      if (disabled) return;

      const newValue = getValueFromEvent(event);
      const index = handleIndex !== undefined ? handleIndex : (isRange ? getClosestHandleIndex(newValue) : 0);

      setIsDragging(true);
      setDraggingIndex(index);
      if (showTooltip === 'onDrag' || showTooltip === true) {
        setShowTooltipState(true);
      }
      updateValue(newValue, index);

      let lastUpdatedValue: number | [number, number] | null = null;

      const handleMouseMove = (e: MouseEvent) => {
        const val = getValueFromEvent(e);
        const updated = updateValue(val, index);
        lastUpdatedValue = updated;
      };

      const handleMouseUp = (e: MouseEvent) => {
        setIsDragging(false);
        setDraggingIndex(null);
        if (showTooltip === 'onDrag') {
          setShowTooltipState(false);
        }
        
        // 마우스 업 이벤트의 위치를 기반으로 최종 값을 계산
        const finalVal = getValueFromEvent(e);
        const finalValue = updateValue(finalVal, index);
        
        onChangeComplete?.(finalValue);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [disabled, getValueFromEvent, updateValue, isRange, getClosestHandleIndex, showTooltip, getCurrentValues, onChangeComplete]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, handleIndex: number = 0) => {
      if (disabled) return;

      const currentValues = getCurrentValues();
      let currentVal = isRange ? currentValues[handleIndex] : currentValues[0];
      let newValue = currentVal;

      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          newValue = Math.max(currentVal - step, min);
          break;
        case 'ArrowRight':
        case 'ArrowUp':
          newValue = Math.min(currentVal + step, max);
          break;
        case 'Home':
          newValue = min;
          break;
        case 'End':
          newValue = max;
          break;
        default:
          return;
      }

      event.preventDefault();
      updateValue(newValue, isRange ? handleIndex : undefined);
      onChangeComplete?.(isRange ? getCurrentValues() : newValue);
    },
    [disabled, step, min, max, isRange, getCurrentValues, updateValue, onChangeComplete]
  );

  const sizeStyles = {
    small: { height: '4px', width: '4px', handleSize: '16px' },
    medium: { height: '6px', width: '6px', handleSize: '20px' },
    large: { height: '8px', width: '8px', handleSize: '24px' },
  };

  const currentSize = sizeStyles[size];

  const formatTooltip = (val: number) => {
    if (tooltipFormatter) {
      return tooltipFormatter(val);
    }
    return String(val);
  };

  // 툴팁 표시 여부 결정
  const shouldShowTooltip = (handleIndex: number = 0) => {
    if (showTooltip === 'never') return false;
    if (showTooltip === 'always') return true;
    if (showTooltip === 'onDrag') return isDragging && draggingIndex === handleIndex;
    if (showTooltip === true) return isDragging || showTooltipState || hoveredHandle === handleIndex;
    return false;
  };

  // 레일 색상 계산
  const getRailColor = () => {
    if (railColor) {
      // 범위 슬라이더일 때는 범위의 크기(최대값 - 최소값)를 사용
      if (isRangeMode) {
        const rangeSize = value2 - value1;
        return railColor(rangeSize);
      }
      // 단일 슬라이더일 때는 현재 값 사용
      const singleValue = Array.isArray(value) ? value[0] : value;
      return railColor(singleValue);
    }
    return disabled ? 'var(--color-text-disabled)' : 'var(--color-semantic-info)';
  };

  return {
    value: isRange ? [value1, value2] : value1,
    values: [value1, value2],
    percentage1,
    percentage2,
    isDragging,
    draggingIndex,
    isRange: isRangeMode,
    tooltipVisible1: shouldShowTooltip(0),
    tooltipVisible2: shouldShowTooltip(1),
    tooltipText1: formatTooltip(value1),
    tooltipText2: formatTooltip(value2),
    marks,
    handleIcon,
    railColor: getRailColor(),
    vertical,
    currentSize,

    containerProps: {
      ref: sliderRef,
      style: {
        position: 'relative' as const,
        width: vertical ? 'auto' : '100%',
        height: vertical ? '100%' : 'auto',
        padding: vertical
          ? `0 ${currentSize.handleSize}`
          : `${currentSize.handleSize} 0`,
      },
    },

    trackProps: {
      ref: trackRef,
      onMouseDown: (e: React.MouseEvent) => handleMouseDown(e),
      style: {
        position: 'relative' as const,
        width: vertical ? currentSize.width : '100%',
        height: vertical ? '100%' : currentSize.height,
        backgroundColor: 'var(--color-surface)',
        borderRadius: '9999px',
        cursor: disabled ? 'not-allowed' : 'pointer',
      },
    },

    fillProps: {
      style: {
        position: 'absolute' as const,
        ...(vertical
          ? {
              bottom: 0,
              left: 0,
              width: '100%',
              height: isRangeMode
                ? `${percentage2 - percentage1}%`
                : `${percentage1}%`,
            }
          : {
              left: 0,
              top: 0,
              height: '100%',
              width: isRangeMode
                ? `${percentage2 - percentage1}%`
                : `${percentage1}%`,
            }),
        ...(isRangeMode && vertical
          ? { bottom: `${percentage1}%` }
          : isRangeMode
            ? { left: `${percentage1}%` }
            : {}),
        backgroundColor: getRailColor(),
        borderRadius: '9999px',
        transition: isDragging ? 'none' : 'all 0.1s',
      },
    },

    handle1Props: {
      onKeyDown: (e: React.KeyboardEvent) => handleKeyDown(e, 0),
      onMouseEnter: () => setHoveredHandle(0),
      onMouseLeave: () => setHoveredHandle(null),
      onMouseDown: (e: React.MouseEvent) => {
        e.stopPropagation();
        handleMouseDown(e, 0);
      },
      tabIndex: disabled ? -1 : 0,
      'aria-valuemin': min,
      'aria-valuemax': max,
      'aria-valuenow': value1,
      'aria-disabled': disabled,
      style: {
        position: 'absolute' as const,
        ...(vertical
          ? {
              left: '50%',
              bottom: `${percentage1}%`,
              transform: 'translate(-50%, 50%)',
            }
          : {
              left: `${percentage1}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }),
        width: currentSize.handleSize,
        height: currentSize.handleSize,
        backgroundColor: 'var(--color-neutral-0)',
        border: disabled ? 'var(--border-width-medium) solid var(--color-text-disabled)' : 'var(--border-width-medium) solid var(--color-semantic-info)',
        borderRadius: '50%',
        cursor: disabled ? 'not-allowed' : 'grab',
        boxShadow: 'var(--shadow-sm)',
        outline: 'none',
        transition: 'box-shadow 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(isDragging && draggingIndex === 0 && {
          cursor: 'grabbing',
          boxShadow: 'var(--shadow-lg)',
        }),
      },
    },

    handle2Props: isRangeMode
      ? {
          onKeyDown: (e: React.KeyboardEvent) => handleKeyDown(e, 1),
          onMouseEnter: () => setHoveredHandle(1),
          onMouseLeave: () => setHoveredHandle(null),
          onMouseDown: (e: React.MouseEvent) => {
            e.stopPropagation();
            handleMouseDown(e, 1);
          },
          tabIndex: disabled ? -1 : 0,
          'aria-valuemin': min,
          'aria-valuemax': max,
          'aria-valuenow': value2,
          'aria-disabled': disabled,
          style: {
            position: 'absolute' as const,
            ...(vertical
              ? {
                  left: '50%',
                  bottom: `${percentage2}%`,
                  transform: 'translate(-50%, 50%)',
                }
              : {
                  left: `${percentage2}%`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }),
            width: currentSize.handleSize,
            height: currentSize.handleSize,
            backgroundColor: 'var(--color-neutral-0)',
            border: disabled ? 'var(--border-width-medium) solid var(--color-text-disabled)' : 'var(--border-width-medium) solid var(--color-semantic-info)',
            borderRadius: '50%',
            cursor: disabled ? 'not-allowed' : 'grab',
            boxShadow: 'var(--shadow-sm)',
            outline: 'none',
            transition: 'box-shadow 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...(isDragging && draggingIndex === 1 && {
              cursor: 'grabbing',
              boxShadow: 'var(--shadow-lg)',
            }),
          },
        }
      : null,
  };
}
