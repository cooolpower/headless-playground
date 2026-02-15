'use client';

// components/headless/button/button.tsx
import type { ReactNode } from 'react';
import { type UseButtonProps } from './type-buttons';
import { useButton } from './use-button';
import { buttonCss as _buttonCss } from './button.styles';

export const ButtonCss = _buttonCss;

export function Button(props: UseButtonProps & { children: ReactNode }) {
  const { injectStyles = true } = props;
  const button = useButton(props);

  return (
    <div {...button}>
      {injectStyles && <style suppressHydrationWarning>{_buttonCss}</style>}
      {props.children}
    </div>
  );
}
