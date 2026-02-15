'use client';

// components/headless/ellipsis/ellipsis.tsx
import type { ReactNode } from 'react';
import { useEllipsis, type UseEllipsisProps } from './use-ellipsis';
import { ellipsisCss as _ellipsisCss } from './ellipsis.styles';

export const EllipsisCss = _ellipsisCss;

export function Ellipsis(props: UseEllipsisProps & { children: ReactNode }) {
  const { injectStyles = true } = props;
  const ellipsis = useEllipsis(props);
  return (
    <div {...ellipsis}>
      {injectStyles && <style suppressHydrationWarning>{_ellipsisCss}</style>}
      {props.children}
    </div>
  );
}
