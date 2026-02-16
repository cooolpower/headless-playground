'use client';

import React, { forwardRef } from 'react';
import { qrcodeProps } from './type-qr-code';
import { useqrcode } from './use-qr-code';
import { qrCodeCss as _qrCodeCss } from './qr-code.styles';

export const QrCodeCss = _qrCodeCss;

import { cx } from '../../utils';
import { Watermark } from '../watermark/watermark';

export const QRCode = forwardRef<HTMLDivElement, qrcodeProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      disabled = false,
      className,
      children,
      injectStyles = true,
      size,
      level,
      margin,
      color,
      ...props
    },
    ref,
  ) => {
    const { currentValue, svgData, isLoading } = useqrcode({
      value,
      defaultValue,
      onChange,
      disabled,
      width: size,
      errorCorrectionLevel: level,
      margin,
      color,
    });

    return (
      <div
        ref={ref}
        className={cx('hcQrCode', className)}
        data-disabled={disabled ? 'true' : 'false'}
        data-loading={isLoading ? 'true' : 'false'}
        {...props}
      >
        {injectStyles && <style suppressHydrationWarning>{_qrCodeCss}</style>}
        {children || (
          <div className="hcQrCodeContent">
            {disabled ? (
              <Watermark text="DISABLED">
                <div
                  dangerouslySetInnerHTML={{ __html: svgData }}
                  className="hcQrCodeSvg"
                />
              </Watermark>
            ) : svgData ? (
              <div
                dangerouslySetInnerHTML={{ __html: svgData }}
                className="hcQrCodeSvg"
              />
            ) : (
              <div className="hcQrCodePlaceholder">
                {currentValue ? 'Generating...' : 'No Value'}
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

QRCode.displayName = 'QRCode';
