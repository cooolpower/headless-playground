'use client';

// components/headless/divider/divider.tsx
import { useDivider, type UseDividerProps } from './use-divider';
import { dividerCss as _dividerCss } from './divider.styles';
import { useStyles } from '../../hooks/use-styles';

export const DividerCss = _dividerCss;

export function Divider(props: UseDividerProps) {
  const { injectStyles = true, className } = props;
  const divider = useDivider(props);

  // useStyles 훅을 통해 테마 및 컴포넌트 스타일 주입
  useStyles('hc-divider-styles', _dividerCss, injectStyles);

  return (
    <>
      <hr
        {...divider}
        className={['hcDivider', className].filter(Boolean).join(' ')}
      />
    </>
  );
}
