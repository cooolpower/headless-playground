'use client';

// components/headless/button/button.tsx
import type { ReactNode } from 'react';
import { type UseButtonProps } from './type-buttons';
import { useButton } from './use-button';
import { buttonCss as _buttonCss } from './button.styles';
import { useStyles } from '../../hooks/use-styles';

export const ButtonCss = _buttonCss;

export function Button(props: UseButtonProps & { children: ReactNode }) {
  const { injectStyles = true } = props;
  const button = useButton(props);

  // useStyles 훅을 통해 테마 및 컴포넌트 스타일 주입
  useStyles('hc-button-styles', _buttonCss, injectStyles);

  return <div {...button}>{props.children}</div>;
}
