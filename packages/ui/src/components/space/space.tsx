'use client';

// components/headless/space/space.tsx
import { useSpace } from './use-space';
import { SpaceProps } from './type-space';
import { spaceCss as _spaceCss } from './space.styles';

export const SpaceCss = _spaceCss;

import { cx } from '../../utils';

export function Space(props: SpaceProps) {
  const { containerProps } = useSpace(props);
  const { className, children, injectStyles = true } = props;

  return (
    <div {...containerProps} className={cx('hcSpace', className)}>
      {injectStyles && <style suppressHydrationWarning>{_spaceCss}</style>}
      {children}
    </div>
  );
}
