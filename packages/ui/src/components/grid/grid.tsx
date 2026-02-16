'use client';

// components/headless/grid/grid.tsx
import { useGrid } from './use-grid';
import { GridProps } from './type-grid';
import { gridCss as _gridCss } from './grid.styles';

export const GridCss = _gridCss;

import { cx } from '../../utils';

export function Grid(props: GridProps) {
  const { containerProps } = useGrid(props);
  const { className, children, injectStyles = true } = props;

  return (
    <div {...containerProps} className={cx('hcGrid', className)}>
      {injectStyles && <style suppressHydrationWarning>{_gridCss}</style>}
      {children}
    </div>
  );
}
