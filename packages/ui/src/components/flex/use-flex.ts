'use client';

// components/headless/flex/use-flex.ts
import type { CSSProperties } from 'react';

export interface UseFlexProps {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justify?:
    | 'start'
    | 'center'
    | 'end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  gap?: number | string;
  inline?: boolean;
}

export function useFlex({
  direction = 'row',
  wrap = 'nowrap',
  justify = 'start',
  align = 'stretch',
  gap = 0,
  inline = false,
}: UseFlexProps) {
  // 정렬 매핑
  const justifyMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    'space-between': 'space-between',
    'space-around': 'space-around',
    'space-evenly': 'space-evenly',
  };

  const alignMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
    baseline: 'baseline',
  };

  return {
    containerProps: {
      style: {
        ['--hc-flex-direction' as any]: direction,
        ['--hc-flex-wrap' as any]: wrap,
        ['--hc-flex-justify' as any]: justifyMap[justify],
        ['--hc-flex-align' as any]: alignMap[align],
        ['--hc-flex-gap' as any]: typeof gap === 'number' ? `${gap}px` : gap,
      } as CSSProperties,
      'data-inline': inline ? 'true' : 'false',
    },
  };
}
