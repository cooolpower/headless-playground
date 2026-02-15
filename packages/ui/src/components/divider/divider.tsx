'use client';

// components/headless/divider/divider.tsx
import { useDivider, type UseDividerProps } from './use-divider';
import { dividerCss as _dividerCss } from './divider.styles';

export const DividerCss = _dividerCss;

export function Divider(props: UseDividerProps) {
  const { injectStyles = true, className } = props;
  const divider = useDivider(props);
  return (
    <>
      {injectStyles && <style suppressHydrationWarning>{_dividerCss}</style>}
      <hr
        {...divider}
        className={['hcDivider', className].filter(Boolean).join(' ')}
      />
    </>
  );
}
