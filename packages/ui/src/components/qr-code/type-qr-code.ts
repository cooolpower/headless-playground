import type { ReactNode } from 'react';
import type { QRCodeRenderersOptions } from 'qrcode';

export interface qrcodeProps extends QRCodeRenderersOptions {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  injectStyles?: boolean;
  children?: ReactNode;
  size?: number;
  level?: 'L' | 'M' | 'Q' | 'H';
  margin?: number;
  color?: {
    dark?: string;
    light?: string;
  };
}

export interface UseqrcodeProps extends QRCodeRenderersOptions {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  size?: number;
}

export interface UseqrcodeReturn {
  currentValue: string;
  handleChange: (value: string) => void;
  svgData: string;
  isLoading: boolean;
}
