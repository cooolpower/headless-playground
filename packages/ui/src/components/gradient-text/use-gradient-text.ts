'use client';

// components/headless/gradient-text/use-gradient-text.ts
import type { CSSProperties } from 'react';

export interface UseGradientTextProps {
  type?: 'linear' | 'radial';
  className?: string;
  style?: CSSProperties;
  injectStyles?: boolean;
}

export function useGradientText({
  type = 'linear',
  className,
  style,
}: UseGradientTextProps) {
  return {
    className: ['hcGradientText', className].filter(Boolean).join(' '),
    'data-type': type,
    style,
  };
}
