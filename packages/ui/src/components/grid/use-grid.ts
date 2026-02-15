'use client';

// components/headless/grid/use-grid.ts
import type { CSSProperties } from 'react';
import { useEffect, useMemo, useState } from 'react';

export interface UseGridProps {
  cols?:
    | number
    | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  rows?: number | string;
  gap?: number | string | { row?: number | string; col?: number | string };
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyContent?:
    | 'start'
    | 'center'
    | 'end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignContent?:
    | 'start'
    | 'center'
    | 'end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  autoFlow?: 'row' | 'column' | 'row dense' | 'column dense';
  templateAreas?: string;
  minHeight?: number | string;
}

function resolveResponsiveCols(
  cols: { xs?: number; sm?: number; md?: number; lg?: number; xl?: number },
  width: number
) {
  const getFallback = () =>
    cols.xs ?? cols.sm ?? cols.md ?? cols.lg ?? cols.xl ?? 1;

  if (width >= 1280 && cols.xl) return cols.xl;
  if (width >= 1024 && cols.lg) return cols.lg;
  if (width >= 768 && cols.md) return cols.md;
  if (width >= 640 && cols.sm) return cols.sm;
  if (cols.xs) return cols.xs;
  return getFallback();
}

export function useGrid({
  cols = 1,
  rows,
  gap = 16,
  justifyItems = 'stretch',
  alignItems = 'stretch',
  justifyContent = 'start',
  alignContent = 'start',
  autoFlow = 'row',
  templateAreas,
  minHeight,
}: UseGridProps) {
  const isResponsiveCols = typeof cols !== 'number';
  const [responsiveCols, setResponsiveCols] = useState(() => {
    if (!isResponsiveCols) return 1;
    return resolveResponsiveCols(cols, typeof window === 'undefined' ? 1024 : window.innerWidth);
  });

  useEffect(() => {
    if (!isResponsiveCols) return;

    const onResize = () => {
      setResponsiveCols(resolveResponsiveCols(cols, window.innerWidth));
    };

    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isResponsiveCols, cols]);

  const gridTemplateColumns = useMemo(() => {
    if (typeof cols === 'number') return `repeat(${cols}, 1fr)`;
    return `repeat(${responsiveCols}, 1fr)`;
  }, [cols, responsiveCols]);

  const gridTemplateRows = useMemo(() => {
    if (!rows) return undefined;
    return typeof rows === 'number' ? `repeat(${rows}, 1fr)` : rows;
  }, [rows]);

  const computedGap = useMemo(() => {
    if (typeof gap === 'string') return gap;
    if (typeof gap === 'number') return `${gap}px`;
    const row = gap.row ?? 0;
    const col = gap.col ?? 0;
    const rowValue = typeof row === 'number' ? `${row}px` : row;
    const colValue = typeof col === 'number' ? `${col}px` : col;
    return `${rowValue} ${colValue}`;
  }, [gap]);

  const computedMinHeight = useMemo(() => {
    if (!minHeight) return undefined;
    return typeof minHeight === 'number' ? `${minHeight}px` : minHeight;
  }, [minHeight]);

  return {
    containerProps: {
      style: {
        ['--hc-grid-template-columns' as any]: gridTemplateColumns,
        ['--hc-grid-template-rows' as any]: gridTemplateRows,
        ['--hc-grid-gap' as any]: computedGap,
        ['--hc-grid-auto-flow' as any]: autoFlow,
        ['--hc-grid-template-areas' as any]: templateAreas,
        ['--hc-grid-min-height' as any]: computedMinHeight,
      } as CSSProperties,
      'data-justify-items': justifyItems,
      'data-align-items': alignItems,
      'data-justify-content': justifyContent,
      'data-align-content': alignContent,
    },
  };
}
