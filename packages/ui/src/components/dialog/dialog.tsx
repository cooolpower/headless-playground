'use client';

import React, { forwardRef, useRef, useEffect } from 'react';
import { DialogProps } from './type-dialog';
import { useDialog } from './use-dialog';
import { dialogCss as _dialogCss } from './dialog.styles';

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      children,
      title,
      content,
      open,
      onOpenChange,
      width = 520,
      height,
      centered = false,
      closable = true,
      maskClosable = true,
      destroyOnClose = false,
      footer,
      okText = '확인',
      cancelText = '취소',
      onOk,
      onCancel,
      confirmLoading = false,
      className,
      injectStyles = true,
      ...props
    },
    ref,
  ) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const { isOpen, handleClose, handleMaskClick } = useDialog({
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

      const focusableElements = dialogRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements?.[0] as HTMLElement;
      const lastElement = focusableElements?.[
        focusableElements.length - 1
      ] as HTMLElement;

      if (firstElement) {
        firstFocusableRef.current = firstElement;
        firstElement.focus();
      }

      if (lastElement) {
        lastFocusableRef.current = lastElement;
      }

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement?.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement?.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      return () => document.removeEventListener('keydown', handleTabKey);
    }, [isOpen]);

    const handleOk = () => {
      // Button's onClick doesn't provide event, so we call onOk without it
      onOk?.({} as React.MouseEvent);
    };

    const handleCancel = () => {
      // Button's onClick doesn't provide event, so we call onCancel without it
      onCancel?.({} as React.MouseEvent);
      handleClose();
    };

    // 기본 footer 렌더링
    const renderFooter = () => {
      if (footer === null) return null;

      if (footer) return footer;

      return (
        <div className="hcDialogFooter">
          <button
            type="button"
            className="hcDialogFooterBtn"
            onClick={handleCancel}
            aria-disabled={confirmLoading ? 'true' : undefined}
            disabled={confirmLoading}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className="hcDialogFooterBtn"
            onClick={handleOk}
            aria-disabled={confirmLoading ? 'true' : undefined}
            disabled={confirmLoading}
          >
            {confirmLoading && <span className="hcDialogSpinner">⟳</span>}
            {okText}
          </button>
        </div>
      );
    };

    if (!isOpen) return null;

    const dialogStyle: React.CSSProperties = {
      ['--hc-dialog-width' as any]:
        typeof width === 'number' ? `${width}px` : width,
      ['--hc-dialog-height' as any]: height
        ? typeof height === 'number'
          ? `${height}px`
          : height
        : undefined,
      height: height
        ? typeof height === 'number'
          ? `${height}px`
          : height
        : undefined,
    };

    return (
      <>
        <div
          className="hcDialogMask"
          onClick={handleMaskClick}
          data-backdrop="true"
        >
          {injectStyles ? (
            <style suppressHydrationWarning>{_dialogCss}</style>
          ) : null}
          <div
            className="hcDialogBackdrop"
            aria-hidden="true"
            data-backdrop="true"
          />
          <div
            className="hcDialogWrap"
            data-centered={centered ? 'true' : 'false'}
          >
            <div
              ref={dialogRef}
              className={className ? `hcDialog ${className}` : 'hcDialog'}
              style={dialogStyle}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? 'dialog-title' : undefined}
              {...props}
            >
              {/* Header */}
              {(title || closable) && (
                <div className="hcDialogHeader">
                  {title && (
                    <div id="dialog-title" className="hcDialogTitle">
                      {title}
                    </div>
                  )}
                  {closable && (
                    <button
                      type="button"
                      className="hcDialogClose"
                      onClick={handleClose}
                      aria-label="닫기"
                    >
                      ×
                    </button>
                  )}
                </div>
              )}

              {/* Body */}
              <div className="hcDialogBody">
                {content}
                {children}
              </div>

              {/* Footer */}
              {renderFooter()}
            </div>
          </div>
        </div>
      </>
    );
  },
);

Dialog.displayName = 'Dialog';

export const DialogCss = _dialogCss;
