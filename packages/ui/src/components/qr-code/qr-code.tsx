'use client';

import React, { forwardRef } from 'react';
import { qrcodeProps } from './type-qr-code';
import { useqrcode } from './use-qr-code';
import { qrCodeCss as _qrCodeCss } from './qr-code.styles';

export const QrCodeCss = _qrCodeCss;

function cx(...parts: Array<string | undefined | null | false>) {
  return parts.filter(Boolean).join(' ');
}

export const QrCode = forwardRef<HTMLDivElement, qrcodeProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      disabled = false,
      className,
      injectStyles = true,
      children,
      ...props
    },
    ref
  ) => {
    const { currentValue, handleChange } = useqrcode({
      value,
      defaultValue,
      onChange,
      disabled,
    });

    return (
      <div
        ref={ref}
        className={injectStyles ? cx('hcQrCode', className) : className}
        data-disabled={disabled ? 'true' : 'false'}
        {...props}
      >
        {injectStyles && <style suppressHydrationWarning>{_qrCodeCss}</style>}
        {children ?? <div>QrCode Component - Value: {JSON.stringify(currentValue)}</div>}
      </div>
    );
  }
);

QrCode.displayName = 'QrCode';
