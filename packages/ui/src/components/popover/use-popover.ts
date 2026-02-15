'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  UsePopoverProps,
  UsePopoverReturn,
  PopoverPlacement,
} from './type-popover';

export function usePopover({
  visible,
  onVisibleChange,
  trigger,
  placement,
  mouseEnterDelay = 100,
  mouseLeaveDelay = 100,
}: UsePopoverProps): UsePopoverReturn {
  const [internalVisible, setInternalVisible] = useState(false);
  const showTimeoutRef = useRef<any>(undefined);
  const hideTimeoutRef = useRef<any>(undefined);
  const triggerRef = useRef<HTMLElement>(null);
  const popoverRef = useRef<HTMLElement>(null);

  const isControlled = visible !== undefined;
  const isVisible = isControlled ? visible : internalVisible;

  // Popover 위치 계산
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !popoverRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const scrollX = window.pageXOffset;
    const scrollY = window.pageYOffset;

    let top = 0;
    let left = 0;

    switch (placement) {
      case 'top':
        top = triggerRect.top + scrollY - popoverRect.height - 8;
        left =
          triggerRect.left +
          scrollX +
          (triggerRect.width - popoverRect.width) / 2;
        break;
      case 'top-start':
        top = triggerRect.top + scrollY - popoverRect.height - 8;
        left = triggerRect.left + scrollX;
        break;
      case 'top-end':
        top = triggerRect.top + scrollY - popoverRect.height - 8;
        left = triggerRect.right + scrollX - popoverRect.width;
        break;
      case 'bottom':
        top = triggerRect.bottom + scrollY + 8;
        left =
          triggerRect.left +
          scrollX +
          (triggerRect.width - popoverRect.width) / 2;
        break;
      case 'bottom-start':
        top = triggerRect.bottom + scrollY + 8;
        left = triggerRect.left + scrollX;
        break;
      case 'bottom-end':
        top = triggerRect.bottom + scrollY + 8;
        left = triggerRect.right + scrollX - popoverRect.width;
        break;
      case 'left':
        top =
          triggerRect.top +
          scrollY +
          (triggerRect.height - popoverRect.height) / 2;
        left = triggerRect.left + scrollX - popoverRect.width - 8;
        break;
      case 'left-start':
        top = triggerRect.top + scrollY;
        left = triggerRect.left + scrollX - popoverRect.width - 8;
        break;
      case 'left-end':
        top = triggerRect.bottom + scrollY - popoverRect.height;
        left = triggerRect.left + scrollX - popoverRect.width - 8;
        break;
      case 'right':
        top =
          triggerRect.top +
          scrollY +
          (triggerRect.height - popoverRect.height) / 2;
        left = triggerRect.right + scrollX + 8;
        break;
      case 'right-start':
        top = triggerRect.top + scrollY;
        left = triggerRect.right + scrollX + 8;
        break;
      case 'right-end':
        top = triggerRect.bottom + scrollY - popoverRect.height;
        left = triggerRect.right + scrollX + 8;
        break;
    }

    // 화면 밖으로 나가지 않도록 조정
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < 0) left = 8;
    if (left + popoverRect.width > viewportWidth)
      left = viewportWidth - popoverRect.width - 8;
    if (top < 0) top = 8;
    if (top + popoverRect.height > viewportHeight)
      top = viewportHeight - popoverRect.height - 8;

    if (popoverRef.current) {
      popoverRef.current.style.top = `${top}px`;
      popoverRef.current.style.left = `${left}px`;
    }
  }, [placement]);

  // Popover 표시
  const showPopover = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = undefined;
    }

    if (!isVisible) {
      showTimeoutRef.current = setTimeout(() => {
        if (isControlled) {
          onVisibleChange?.(true);
        } else {
          setInternalVisible(true);
        }
      }, mouseEnterDelay);
    }
  }, [isVisible, isControlled, onVisibleChange, mouseEnterDelay]);

  // Popover 숨기기
  const hidePopover = useCallback(() => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = undefined;
    }

    if (isVisible) {
      hideTimeoutRef.current = setTimeout(() => {
        if (isControlled) {
          onVisibleChange?.(false);
        } else {
          setInternalVisible(false);
        }
      }, mouseLeaveDelay);
    }
  }, [isVisible, isControlled, onVisibleChange, mouseLeaveDelay]);

  // 이벤트 핸들러들
  const handleMouseEnter = useCallback(() => {
    showPopover();
  }, [showPopover]);

  const handleMouseLeave = useCallback(() => {
    hidePopover();
  }, [hidePopover]);

  const handleClick = useCallback(() => {
    if (trigger === 'click') {
      if (isControlled) {
        onVisibleChange?.(!isVisible);
      } else {
        setInternalVisible(!isVisible);
      }
    }
  }, [trigger, isVisible, isControlled, onVisibleChange]);

  const handleFocus = useCallback(() => {
    if (trigger === 'focus') {
      showPopover();
    }
  }, [trigger, showPopover]);

  const handleBlur = useCallback(() => {
    if (trigger === 'focus') {
      hidePopover();
    }
  }, [trigger, hidePopover]);

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      if (trigger === 'context-menu') {
        e.preventDefault();
        if (isControlled) {
          onVisibleChange?.(!isVisible);
        } else {
          setInternalVisible(!isVisible);
        }
      }
    },
    [trigger, isVisible, isControlled, onVisibleChange]
  );

  // visible이 변경될 때 위치 계산
  useEffect(() => {
    if (isVisible) {
      // DOM 업데이트를 위해 약간의 지연
      setTimeout(calculatePosition, 0);
    }
  }, [isVisible, calculatePosition]);

  // cleanup
  useEffect(() => {
    return () => {
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  // 트리거별 이벤트 속성
  const triggerProps: Record<string, any> = {
    ref: triggerRef,
  };

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

  const popoverProps: Record<string, any> = {
    ref: popoverRef,
    onMouseEnter: trigger === 'hover' ? handleMouseEnter : undefined,
    onMouseLeave: trigger === 'hover' ? handleMouseLeave : undefined,
  };

  return {
    isVisible,
    triggerProps,
    popoverProps,
  };
}
