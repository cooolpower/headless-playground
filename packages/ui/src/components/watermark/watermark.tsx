'use client';

// components/headless/watermark/watermark.tsx
import type { ReactNode } from 'react';
import { useWatermark, type UseWatermarkProps } from './use-watermark';
import { watermarkCss as _watermarkCss } from './watermark.styles';

export const WatermarkCss = _watermarkCss;

export function Watermark(props: UseWatermarkProps & { children: ReactNode }) {
  const { injectStyles = true } = props;
  const watermark = useWatermark(props);
  return (
    <div {...watermark.containerProps}>
      {injectStyles && <style suppressHydrationWarning>{_watermarkCss}</style>}
      {props.children}
      <div {...watermark.watermarkProps}>{props.text || 'DRAFT'}</div>
    </div>
  );
}
