'use client';

// components/headless/watermark/use-watermark.ts
export interface UseWatermarkProps {
  text?: string;
  opacity?: number;
  className?: string;
  injectStyles?: boolean;
}

export function useWatermark({
  text = 'DRAFT',
  opacity = 0.1,
  className,
}: UseWatermarkProps) {
  return {
    containerProps: {
      className: ['hcWatermarkContainer', className].filter(Boolean).join(' '),
    },

    watermarkProps: {
      className: 'hcWatermark',
      style: {
        ['--hc-watermark-opacity' as any]: String(opacity),
      } as any,
    },
  };
}
