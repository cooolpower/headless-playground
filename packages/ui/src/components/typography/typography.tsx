'use client';

// components/headless/typography/typography.tsx
import type { ReactNode } from 'react';
import { useTypography, type UseTypographyProps } from './use-typography';
import { typographyCss as _typographyCss } from './typography.styles';
import { useStyles } from '../../hooks/use-styles';

export const TypographyCss = _typographyCss;

export function Title(props: UseTypographyProps & { children: ReactNode }) {
  const { className, injectStyles = true, ...typographyProps } = props;
  const typography = useTypography({
    ...typographyProps,
    variant: 'title',
  });

  // useStyles 훅을 통해 테마 및 컴포넌트 스타일 주입
  useStyles('hc-typography-styles', _typographyCss, injectStyles);

  return (
    <div
      className={[typography.className, className].filter(Boolean).join(' ')}
      data-level={typography['data-level']}
    >
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

  // useStyles 훅을 통해 테마 및 컴포넌트 스타일 주입
  useStyles('hc-typography-styles', _typographyCss, injectStyles);

  return (
    <span
      className={[typography.className, className].filter(Boolean).join(' ')}
    >
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

  // useStyles 훅을 통해 테마 및 컴포넌트 스타일 주입
  useStyles('hc-typography-styles', _typographyCss, injectStyles);

  return (
    <p className={[typography.className, className].filter(Boolean).join(' ')}>
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

  // useStyles 훅을 통해 테마 및 컴포넌트 스타일 주입
  useStyles('hc-typography-styles', _typographyCss, injectStyles);

  return (
    <span
      className={[typography.className, className].filter(Boolean).join(' ')}
    >
      {props.children}
    </span>
  );
}
