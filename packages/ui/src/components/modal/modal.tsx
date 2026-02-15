'use client';

// components/headless/modal/modal.tsx
import { useModal } from './use-modal';
import { Button } from '../button/buttons';
import { ModalProps } from './type-modal';
import { modalCss as _modalCss } from './modal.styles';

export function Modal(props: ModalProps) {
  const { maskProps, modalProps, closeButtonProps, handleConfirm } =
    useModal(props);

  const { title, children, footer, className, injectStyles = true } = props;

  if (!maskProps || !modalProps) return null;

  const defaultFooter = (
    <div className="hcModalFooter">
      <Button onClick={handleConfirm}>OK</Button>
    </div>
  );

  return (
    <div {...(maskProps as any)} className="hcModalMask">
      {injectStyles ? (
        <style suppressHydrationWarning>{_modalCss}</style>
      ) : null}
      <div
        className="hcModalBackdrop"
        data-backdrop="true"
        aria-hidden="true"
      />
      <div className="hcModalWrap">
        <div
          {...(modalProps as any)}
          className={className ? `hcModal ${className}` : 'hcModal'}
        >
          {/* Header */}
          {(title || closeButtonProps) && (
            <div className="hcModalHeader">
              {title && <h2 className="hcModalTitle">{title}</h2>}
              {closeButtonProps && (
                <button
                  type="button"
                  className="hcModalClose"
                  onClick={(closeButtonProps as any).onClick}
                  aria-label={(closeButtonProps as any)['aria-label'] ?? '닫기'}
                >
                  ✕
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className="hcModalBody">{children}</div>

          {/* Footer */}
          {footer !== null && (
            <div>{footer === undefined ? defaultFooter : footer}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export const ModalCss = _modalCss;
