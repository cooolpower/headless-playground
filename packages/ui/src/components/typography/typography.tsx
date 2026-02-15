'use client';

// components/headless/typography/typography.tsx
import type { ReactNode } from 'react';
import { useTypography, type UseTypographyProps } from './use-typography';
import { typographyCss as _typographyCss } from './typography.styles';

export const TypographyCss = _typographyCss;

export function Title(props: UseTypographyProps & { children: ReactNode }) {
  const { className, injectStyles = true, ...typographyProps } = props;
  const typography = useTypography({
    ...typographyProps,
    variant: 'title',
  });
  return (
    <div
      className={[typography.className, className].filter(Boolean).join(' ')}
      data-level={typography['data-level']}
    >
      {injectStyles && <style suppressHydrationWarning>{_typographyCss}</style>}
      {props.children}
    </div>
  );
}

export function Text(props: UseTypographyProps & { children: ReactNode }) {
  const { className, injectStyles = true, ...typographyProps } = props;
  const typography = useTypography({
    ...typographyProps,
    variant: 'text',
  });
  return (
    <span className={[typography.className, className].filter(Boolean).join(' ')}>
      {injectStyles && <style suppressHydrationWarning>{_typographyCss}</style>}
      {props.children}
    </span>
  );
}

export function Paragraph(props: UseTypographyProps & { children: ReactNode }) {
  const { className, injectStyles = true, ...typographyProps } = props;
  const typography = useTypography({
    ...typographyProps,
    variant: 'paragraph',
  });
  return (
    <p className={[typography.className, className].filter(Boolean).join(' ')}>
      {injectStyles && <style suppressHydrationWarning>{_typographyCss}</style>}
      {props.children}
    </p>
  );
}

export function Caption(props: UseTypographyProps & { children: ReactNode }) {
  const { className, injectStyles = true, ...typographyProps } = props;
  const typography = useTypography({
    ...typographyProps,
    variant: 'caption',
  });
  return (
    <span className={[typography.className, className].filter(Boolean).join(' ')}>
      {injectStyles && <style suppressHydrationWarning>{_typographyCss}</style>}
      {props.children}
    </span>
  );
}
