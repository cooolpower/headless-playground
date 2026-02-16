'use client';

// components/headless/flex/flex.tsx
import { useFlex } from './use-flex';
import { FlexProps } from './type-flex';
import { flexCss as _flexCss } from './flex.styles';

export const FlexCss = _flexCss;

import { cx } from '../../utils';

export function Flex(props: FlexProps) {
  const { containerProps } = useFlex(props);
  const { className, children, injectStyles = true } = props;

  return (
    <div {...containerProps} className={cx('hcFlex', className)}>
      {injectStyles && <style suppressHydrationWarning>{_flexCss}</style>}
      {children}
    </div>
  );
}
