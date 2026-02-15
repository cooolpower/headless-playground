'use client';

// components/headless/flex/flex.tsx
import { useFlex } from './use-flex';
import { FlexProps } from './type-flex';
import { flexCss as _flexCss } from './flex.styles';

export const FlexCss = _flexCss;

function cx(...parts: Array<string | undefined | null | false>) {
  return parts.filter(Boolean).join(' ');
}

export function Flex(props: FlexProps) {
  const { containerProps } = useFlex(props);
  const { className, children, injectStyles = true } = props;

  return (
    <div {...containerProps} className={injectStyles ? cx('hcFlex', className) : className}>
      {injectStyles && <style suppressHydrationWarning>{_flexCss}</style>}
      {children}
    </div>
  );
}
