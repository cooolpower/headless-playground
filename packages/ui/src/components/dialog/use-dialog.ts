'use client';

import { useCallback, useEffect } from 'react';
import { UseDialogProps, UseDialogReturn } from './type-dialog';

export function useDialog({
  open,
  onOpenChange,
  maskClosable = true,
}: UseDialogProps): UseDialogReturn {
  const isControlled = open !== undefined;

  const handleOpen = useCallback(() => {
    if (!isControlled) {
      onOpenChange?.(true);
    }
  }, [isControlled, onOpenChange]);

  const handleClose = useCallback(() => {
    if (!isControlled) {
      onOpenChange?.(false);
    } else {
      onOpenChange?.(false);
    }
  }, [isControlled, onOpenChange]);

  const handleMaskClick = useCallback(
    (e: React.MouseEvent) => {
      if (maskClosable) {
        const target = e.target as HTMLElement | null;
        if (target?.dataset?.backdrop === 'true') {
          handleClose();
        }
      }
    },
    [maskClosable, handleClose]
  );

  // ESC 키 핸들링
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        handleClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      // body 스크롤 방지
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // no-op when not open
    };
  }, [open, handleClose]);

  return {
    isOpen: open || false,
    handleOpen,
    handleClose,
    handleMaskClick,
  };
}
