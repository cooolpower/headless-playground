'use client';

import { useCallback, useEffect, useRef } from 'react';
import {
  UseTooltipProps,
  UseTooltipReturn,
  TooltipPlacement,
} from './type-tooltip';

export function useTooltip({
  visible,
  onVisibleChange,
  trigger,
  placement,
  triggerRef,
  tooltipRef,
  mouseEnterDelay = 100,
  mouseLeaveDelay = 100,
}: UseTooltipProps): UseTooltipReturn {
  const showTimeoutRef = useRef<any>(undefined);
  const hideTimeoutRef = useRef<any>(undefined);
  const isHoveringRef = useRef(false);

  // 툴팁 위치 계산
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollX = window.pageXOffset;
    const scrollY = window.pageYOffset;

    let top = 0;
    let left = 0;

    switch (placement) {
      case 'top':
        top = triggerRect.top + scrollY - tooltipRect.height - 8;
        left =
          triggerRect.left +
          scrollX +
          (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'top-start':
        top = triggerRect.top + scrollY - tooltipRect.height - 8;
        left = triggerRect.left + scrollX;
        break;
      case 'top-end':
        top = triggerRect.top + scrollY - tooltipRect.height - 8;
        left = triggerRect.right + scrollX - tooltipRect.width;
        break;
      case 'bottom':
        top = triggerRect.bottom + scrollY + 8;
        left =
          triggerRect.left +
          scrollX +
          (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom-start':
        top = triggerRect.bottom + scrollY + 8;
        left = triggerRect.left + scrollX;
        break;
      case 'bottom-end':
        top = triggerRect.bottom + scrollY + 8;
        left = triggerRect.right + scrollX - tooltipRect.width;
        break;
      case 'left':
        top =
          triggerRect.top +
          scrollY +
          (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left + scrollX - tooltipRect.width - 8;
        break;
      case 'left-start':
        top = triggerRect.top + scrollY;
        left = triggerRect.left + scrollX - tooltipRect.width - 8;
        break;
      case 'left-end':
        top = triggerRect.bottom + scrollY - tooltipRect.height;
        left = triggerRect.left + scrollX - tooltipRect.width - 8;
        break;
      case 'right':
        top =
          triggerRect.top +
          scrollY +
          (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + scrollX + 8;
        break;
      case 'right-start':
        top = triggerRect.top + scrollY;
        left = triggerRect.right + scrollX + 8;
        break;
      case 'right-end':
        top = triggerRect.bottom + scrollY - tooltipRect.height;
        left = triggerRect.right + scrollX + 8;
        break;
    }

    // 화면 밖으로 나가지 않도록 조정
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < 0) left = 8;
    if (left + tooltipRect.width > viewportWidth)
      left = viewportWidth - tooltipRect.width - 8;
    if (top < 0) top = 8;
    if (top + tooltipRect.height > viewportHeight)
      top = viewportHeight - tooltipRect.height - 8;

    tooltipRef.current.style.top = `${top}px`;
    tooltipRef.current.style.left = `${left}px`;
  }, [placement]);

  // 툴팁 표시
  const showTooltip = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = undefined;
    }

    if (!visible) {
      showTimeoutRef.current = setTimeout(() => {
        onVisibleChange(true);
      }, mouseEnterDelay);
    }
  }, [visible, onVisibleChange, mouseEnterDelay]);

  // 툴팁 숨기기
  const hideTooltip = useCallback(() => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = undefined;
    }

    if (visible) {
      hideTimeoutRef.current = setTimeout(() => {
        onVisibleChange(false);
      }, mouseLeaveDelay);
    }
  }, [visible, onVisibleChange, mouseLeaveDelay]);

  // 이벤트 핸들러들
  const handleMouseEnter = useCallback(() => {
    isHoveringRef.current = true;
    showTooltip();
  }, [showTooltip]);

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
    hideTooltip();
  }, [hideTooltip]);

  const handleClick = useCallback(() => {
    if (trigger === 'click') {
      onVisibleChange(!visible);
    }
  }, [trigger, visible, onVisibleChange]);

  const handleFocus = useCallback(() => {
    if (trigger === 'focus') {
      showTooltip();
    }
  }, [trigger, showTooltip]);

  const handleBlur = useCallback(() => {
    if (trigger === 'focus') {
      hideTooltip();
    }
  }, [trigger, hideTooltip]);

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      if (trigger === 'context-menu') {
        e.preventDefault();
        onVisibleChange(!visible);
      }
    },
    [trigger, visible, onVisibleChange]
  );

  // visible이 변경될 때 위치 계산
  useEffect(() => {
    if (visible) {
      // DOM 업데이트를 위해 약간의 지연
      setTimeout(calculatePosition, 0);
    }
  }, [visible, calculatePosition]);

  // cleanup
  useEffect(() => {
    return () => {
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  // 트리거별 이벤트 속성
  const triggerProps: Record<string, any> = {};

  if (trigger === 'hover') {
    triggerProps.onMouseEnter = handleMouseEnter;
    triggerProps.onMouseLeave = handleMouseLeave;
  }

  if (trigger === 'click') {
    triggerProps.onClick = handleClick;
  }

  if (trigger === 'focus') {
    triggerProps.onFocus = handleFocus;
    triggerProps.onBlur = handleBlur;
    triggerProps.tabIndex = 0;
  }

  if (trigger === 'context-menu') {
    triggerProps.onContextMenu = handleContextMenu;
  }

  return {
    triggerProps,
    tooltipProps: {
      onMouseEnter: trigger === 'hover' ? handleMouseEnter : undefined,
      onMouseLeave: trigger === 'hover' ? handleMouseLeave : undefined,
    },
  };
}
