'use client';

// components/headless/gradient-text/gradient-text.tsx
import type { ReactNode } from 'react';
import {
  useGradientText,
  type UseGradientTextProps,
} from './use-gradient-text';
import { gradientTextCss as _gradientTextCss } from './gradient-text.styles';

export const GradientTextCss = _gradientTextCss;

export function GradientText(
  props: UseGradientTextProps & { children: ReactNode }
) {
  const {
    children,
    injectStyles = true,
    className,
    style,
    type,
    ...rest
  } = props;

  const gradientText = useGradientText({ type, className, style });

  return (
    <span {...rest} {...gradientText}>
      {injectStyles && (
        <style suppressHydrationWarning>{_gradientTextCss}</style>
      )}
      {children}
    </span>
  );
}
