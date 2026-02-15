'use client';

// components/headless/space/use-space.ts
import type { CSSProperties } from 'react';

export interface UseSpaceProps {
  direction?: 'horizontal' | 'vertical';
  size?: 'small' | 'medium' | 'large' | number;
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  justify?:
    | 'start'
    | 'center'
    | 'end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  wrap?: boolean;
}

export function useSpace({
  direction = 'horizontal',
  size = 'medium',
  align = 'center',
  justify = 'start',
  wrap = false,
}: UseSpaceProps) {
  const sizeMap: Record<'small' | 'medium' | 'large', string> = {
    small: 'var(--spacing-sm)',
    medium: 'var(--spacing-base)',
    large: 'var(--spacing-lg)',
  };

  const gap = typeof size === 'number' ? `${size}px` : sizeMap[size];

  return {
    gap,
    containerProps: {
      style: {
        ['--hc-space-gap' as any]: gap,
      } as CSSProperties,
      'data-direction': direction === 'vertical' ? 'vertical' : 'horizontal',
      'data-align': align,
      'data-justify': justify,
      'data-wrap': wrap ? 'true' : 'false',
    },
  };
}
