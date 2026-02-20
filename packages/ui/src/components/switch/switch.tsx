'use client';

// components/headless/switch/switch.tsx
import { Loader2, Check, X } from 'lucide-react';
import { Icon } from '../icon/icon';
import { useSwitch } from './use-switch';
import { SwitchProps } from './type-switch';
import { switchCss as _switchCss } from './switch.styles';

import { cx } from '../../utils';
import { useStyles } from '../../hooks/use-styles';

export function Switch(props: SwitchProps) {
  const {
    inputProps,
    checked,
    loading,
    checkedIcon,
    uncheckedIcon,
    size = 'medium',
    round = true,
    disabled,
    railColor,
    railColorActive,
  } = useSwitch(props);

  const { className, children, injectStyles = true } = props;

  // 아이콘 결정: loading > checkedIcon/uncheckedIcon > 기본값
  const iconToShow = loading
    ? Loader2
    : checked
      ? checkedIcon || null
      : uncheckedIcon || null;

  // useStyles 훅을 통해 테마 및 컴포넌트 스타일 주입
  useStyles('hc-switch-styles', _switchCss, injectStyles);

  return (
    <label
      className={cx('hcSwitch', className)}
      data-checked={checked ? 'true' : 'false'}
      data-disabled={disabled ? 'true' : 'false'}
      data-loading={loading ? 'true' : 'false'}
      data-size={size}
      data-round={round ? 'true' : 'false'}
      // railColor/railColorActive는 사용자 입력이므로 CSS 변수로 전달합니다.
      style={
        {
          ...(railColor ? { '--hc-switch-rail': railColor } : null),
          ...(railColorActive
            ? { '--hc-switch-rail-active': railColorActive }
            : null),
        } as React.CSSProperties
      }
    >
      <input {...inputProps} className="hcSwitchInput" />
      <span className="hcSwitchRail">
        <span className="hcSwitchHandle">
          {iconToShow && (
            <Icon
              icon={iconToShow as any}
              size="small"
              className="hcSwitchIcon"
            />
          )}
        </span>
      </span>
      {children && <span className="hcSwitchText">{children}</span>}
    </label>
  );
}

export const SwitchCss = _switchCss;
