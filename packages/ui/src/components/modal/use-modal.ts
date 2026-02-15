'use client';

// components/headless/modal/use-modal.ts
import { useCallback, useEffect, useRef } from 'react';

export interface UseModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  closable?: boolean;
  maskClosable?: boolean;
  centered?: boolean;
  width?: number | string;
  zIndex?: number;
  destroyOnClose?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export function useModal({
  open: controlledOpen,
  onOpenChange,
  closable = true,
  maskClosable = true,
  centered = false,
  width = 520,
  zIndex = 1000,
  destroyOnClose = false,
  onCancel,
  onConfirm,
}: UseModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closable) {
        handleClose();
      }
    };

    if (controlledOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // 포커스 관리
      previousFocusRef.current = document.activeElement as HTMLElement;
      setTimeout(() => {
        modalRef.current?.focus();
      }, 100);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      // 포커스 복원
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [controlledOpen, closable]);

  const handleClose = useCallback(() => {
    onOpenChange?.(false);
    onCancel?.();
  }, [onOpenChange, onCancel]);

  const handleConfirm = useCallback(() => {
    onConfirm?.();
  }, [onConfirm]);

  const handleMaskClick = useCallback(
    (event: React.MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const isBackdrop = target?.dataset?.backdrop === 'true';
      if ((event.target === event.currentTarget || isBackdrop) && maskClosable) {
        handleClose();
      }
    },
    [maskClosable, handleClose]
  );

  return {
    modalRef,
    handleClose,
    handleConfirm,
    handleMaskClick,

    maskProps: controlledOpen
      ? {
          'data-centered': centered ? 'true' : 'false',
          style: { zIndex },
          onClick: handleMaskClick,
        }
      : null,

    modalProps: controlledOpen
      ? {
          ref: modalRef,
          role: 'dialog',
          'aria-modal': true,
          tabIndex: -1,
          style: {
            // CSS 문자열에서 width는 CSS 변수로 처리
            '--hc-modal-width':
              typeof width === 'number' ? `${width}px` : String(width),
          } as React.CSSProperties,
        }
      : null,

    closeButtonProps: closable
      ? {
          onClick: handleClose,
          'aria-label': 'Close modal',
        }
      : null,
  };
}
