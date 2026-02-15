'use client';

// components/headless/checkbox/checkbox.tsx
import { useCheckbox } from './use-checkbox';
import { CheckboxProps } from './type-checkbox';
import { checkboxCss as _checkboxCss } from './checkbox.styles';
import { Check, Minus } from 'lucide-react';
import { Icon } from '../icon/icon';

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

  return (
    <label
      className={className ? `hcCheckbox ${className}` : 'hcCheckbox'}
      data-disabled={disabled ? 'true' : 'false'}
      data-checked={checked ? 'true' : 'false'}
      data-indeterminate={indeterminate ? 'true' : 'false'}
      data-size={size}
    >
      {injectStyles ? (
        <style suppressHydrationWarning>{_checkboxCss}</style>
      ) : null}
      <input {...inputRest} className="hcCheckboxInput" />
      <span {...boxRest} className="hcCheckboxBox">
        {markRest && (
          <span {...markRest} className="hcCheckboxMark">
            {/* {indeterminate ? '−' : '✓'} */}
            <Icon icon={indeterminate ? Minus : Check} size="xSmall"  />
          </span>
        )}
      </span>
      {children && <span className="hcCheckboxText">{children}</span>}
    </label>
  );
}

export const CheckboxCss = _checkboxCss;
