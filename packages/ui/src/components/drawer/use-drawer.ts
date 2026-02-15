'use client';

import { useCallback, useEffect, useRef } from 'react';
//import { UseDrawerProps, UseDrawerReturn } from './drawer';

export interface DrawerProps {
  children?: React.ReactNode;
  title?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: DrawerPlacement;
  width?: number | string;
  height?: number | string;
  closable?: boolean;
  maskClosable?: boolean;
  destroyOnClose?: boolean;
  footer?: React.ReactNode;
  extra?: React.ReactNode;
  className?: string;
  injectStyles?: boolean;
}

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

export interface UseDrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  maskClosable?: boolean;
}

export interface UseDrawerReturn {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleMaskClick: (e: React.MouseEvent) => void;
}

export function useDrawer({
  open,
  onOpenChange,
  maskClosable = true,
}: UseDrawerProps): UseDrawerReturn {
  const isControlled = open !== undefined;
  const onOpenChangeRef = useRef(onOpenChange);

  // onOpenChange를 항상 최신으로 유지
  useEffect(() => {
    onOpenChangeRef.current = onOpenChange;
  }, [onOpenChange]);

  const handleOpen = useCallback(() => {
    if (!isControlled) {
      onOpenChangeRef.current?.(true);
    }
  }, [isControlled]);

  const handleClose = useCallback(() => {
    onOpenChangeRef.current?.(false);
  }, []);

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

  // ESC 키 핸들링 및 body 스크롤 방지
  useEffect(() => {
    // open이 명시적으로 false이거나 undefined일 때는 아무것도 하지 않음
    if (!open) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChangeRef.current?.(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // body 스크롤 방지 (이전 overflow 값 저장)
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // 스크롤바 너비 계산 (스크롤바가 있을 때 레이아웃 시프트 방지)
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
  }, [open]);

  // open이 undefined일 때는 false로 처리
  const isOpen = open === true;

  return {
    isOpen,
    handleOpen,
    handleClose,
    handleMaskClick,
  };
}
