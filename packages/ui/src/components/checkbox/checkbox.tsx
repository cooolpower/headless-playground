'use client';

// components/headless/checkbox/checkbox.tsx
import { useCheckbox } from './use-checkbox';
import { CheckboxProps } from './type-checkbox';
import { checkboxCss as _checkboxCss } from './checkbox.styles';
import { Check, Minus } from 'lucide-react';
import { Icon } from '../icon/icon';
import { cx } from '../../utils';
import { useStyles } from '../../hooks/use-styles';

export function Checkbox(props: CheckboxProps) {
  const { inputProps, checkboxProps, checkmarkProps, checked, indeterminate } =
    useCheckbox(props);

  const {
    className,
    children,
    disabled,
    size = 'medium',
    injectStyles = true,
  } = props;

  const inputRest = { ...(inputProps as any), style: undefined };
  const boxRest = { ...(checkboxProps as any), style: undefined };
  const markRest = checkmarkProps
    ? { ...(checkmarkProps as any), style: undefined }
    : null;

  // useStyles 훅을 통해 테마 및 컴포넌트 스타일 주입
  useStyles('hc-checkbox-styles', _checkboxCss, injectStyles);

  return (
    <label
      className={cx('hcCheckbox', className)}
      data-disabled={disabled ? 'true' : 'false'}
      data-checked={checked ? 'true' : 'false'}
      data-indeterminate={indeterminate ? 'true' : 'false'}
      data-size={size}
      onClick={props.onClick}
    >
      <input {...inputRest} className="hcCheckboxInput" />
      <span {...boxRest} className="hcCheckboxBox">
        {markRest && (
          <span {...markRest} className="hcCheckboxMark">
            {/* {indeterminate ? '−' : '✓'} */}
            <Icon icon={indeterminate ? Minus : Check} size="xSmall" />
          </span>
        )}
      </span>
      {children && <span className="hcCheckboxText">{children}</span>}
    </label>
  );
}

export const CheckboxCss = _checkboxCss;
