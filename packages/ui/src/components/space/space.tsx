'use client';

// components/headless/space/space.tsx
import { useSpace } from './use-space';
import { SpaceProps } from './type-space';
import { spaceCss as _spaceCss } from './space.styles';

export const SpaceCss = _spaceCss;

function cx(...parts: Array<string | undefined | null | false>) {
  return parts.filter(Boolean).join(' ');
}

export function Space(props: SpaceProps) {
  const { containerProps } = useSpace(props);
  const { className, children, injectStyles = true } = props;

  return (
    <div
      {...containerProps}
      className={injectStyles ? cx('hcSpace', className) : className}
    >
      {injectStyles && <style suppressHydrationWarning>{_spaceCss}</style>}
      {children}
    </div>
  );
}
