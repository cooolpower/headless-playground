'use client';

import { useState, useCallback, useEffect } from 'react';
import QRCode from 'qrcode';
import { UseqrcodeProps, UseqrcodeReturn } from './type-qr-code';

export function useqrcode({
  value,
  defaultValue = '',
  onChange,
  disabled = false,
  ...options
}: UseqrcodeProps): UseqrcodeReturn {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [svgData, setSvgData] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const {
    width,
    margin,
    color,
    errorCorrectionLevel,
    ...restOptions
  } = options;

  const generateQRCode = useCallback(async (text: string) => {
    if (!text) {
      setSvgData('');
      return;
    }

    try {
      setIsLoading(true);
      const svg = await QRCode.toString(text, {
        type: 'svg',
        width,
        margin,
        color,
        errorCorrectionLevel,
        ...restOptions,
      });
      setSvgData(svg);
    } catch (err) {
      console.error('Failed to generate QR Code:', err);
    } finally {
      setIsLoading(false);
    }
  }, [width, margin, color, errorCorrectionLevel, JSON.stringify(restOptions)]);

  useEffect(() => {
    generateQRCode(currentValue);
  }, [currentValue, generateQRCode]);

  const handleChange = useCallback(
    (newValue: string) => {
      if (disabled) return;

      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [disabled, isControlled, onChange]
  );

  return {
    currentValue,
    handleChange,
    svgData,
    isLoading,
  };
}
