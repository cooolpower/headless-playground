'use client';

import React, { forwardRef, useRef, useEffect } from 'react';
//import { DrawerProps } from './drawer';
import { useDrawer, type DrawerProps } from './use-drawer';
import { drawerCss as _drawerCss } from './drawer.styles';
import { cx } from '../../utils';

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      children,
      title,
      open,
      onOpenChange,
      placement = 'right',
      width = 378,
      height = 378,
      closable = true,
      maskClosable = true,
      destroyOnClose = false,
      footer,
      extra,
      className,
      injectStyles = true,
      ...props
    },
    ref,
  ) => {
    const drawerRef = useRef<HTMLDivElement>(null);
    const { isOpen, handleClose, handleMaskClick } = useDrawer({
      open,
      onOpenChange,
      maskClosable,
    });

    // 포커스 트랩을 위한 refs
    const firstFocusableRef = useRef<HTMLElement | null>(null);
    const lastFocusableRef = useRef<HTMLElement | null>(null);

    // 포커스 트랩 설정
    useEffect(() => {
      if (!isOpen) return;

      // DOM이 완전히 렌더링된 후 포커스 설정
      const timeoutId = setTimeout(() => {
        const focusableElements = drawerRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const firstElement = focusableElements?.[0] as HTMLElement;
        const lastElement = focusableElements?.[
          focusableElements.length - 1
        ] as HTMLElement;

        if (firstElement) {
          firstFocusableRef.current = firstElement;
          // 포커스 설정을 안전하게 처리
          try {
            firstElement.focus();
          } catch (e) {
            // 포커스 실패 시 무시
          }
        }

        if (lastElement) {
          lastFocusableRef.current = lastElement;
        }
      }, 0);

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          const currentFirst = firstFocusableRef.current;
          const currentLast = lastFocusableRef.current;

          if (e.shiftKey) {
            if (document.activeElement === currentFirst) {
              currentLast?.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === currentLast) {
              currentFirst?.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('keydown', handleTabKey);
      };
    }, [isOpen]);

    // drawer가 닫혀있으면 아무것도 렌더링하지 않음
    if (!isOpen) {
      return null;
    }

    const drawerStyle: React.CSSProperties = {
      ['--hc-drawer-width' as any]:
        placement === 'left' || placement === 'right' ? width : undefined,
      ['--hc-drawer-height' as any]:
        placement === 'top' || placement === 'bottom' ? height : undefined,
    };

    return (
      <>
        {/* Mask */}
        <div
          className="hcDrawerMask"
          onClick={handleMaskClick}
          data-backdrop="true"
        >
          {injectStyles ? (
            <style suppressHydrationWarning>{_drawerCss}</style>
          ) : null}
          <div
            className="hcDrawerBackdrop"
            aria-hidden="true"
            data-backdrop="true"
          />
          <div className="hcDrawerWrap" data-placement={placement}>
            {/* Drawer */}
            <div
              ref={drawerRef}
              className={cx('hcDrawer', className)}
              data-placement={placement}
              style={drawerStyle}
              role="dialog"
              aria-modal="true"
              aria-labelledby={!!title ? 'drawer-title' : undefined}
              {...props}
            >
              {/* Header */}
              {!!(title || closable || extra) && (
                <div className="hcDrawerHeader">
                  {!!title && (
                    <div id="drawer-title" className="hcDrawerTitle">
                      {title as any}
                    </div>
                  )}
                  <div className="hcDrawerHeaderRight">
                    {extra as any}
                    {closable && (
                      <button
                        type="button"
                        className="hcDrawerClose"
                        onClick={handleClose}
                        aria-label="닫기"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Body */}
              <div className="hcDrawerBody">{children as any}</div>

              {/* Footer */}
              {!!footer && (
                <div className="hcDrawerFooter">{footer as any}</div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  },
);

Drawer.displayName = 'Drawer';

export const DrawerCss = _drawerCss;
