'use client';

// components/headless/radio/radio.tsx
import { useContext } from 'react';
import { useRadio, useRadioGroup, RadioGroupContext } from './use-radio';
import { RadioProps, RadioGroupProps } from './type-radio';
import { radioCss as _radioCss } from './radio.styles';
import { cx } from '../../utils';

export const RadioCss = _radioCss;

export function Radio(props: RadioProps) {
  const { inputProps, radioProps, dotProps } = useRadio(props);

  const ctx = useContext(RadioGroupContext);
  const isInGroup = !!ctx;
  const injectStyles = props.injectStyles ?? !isInGroup;
  const { className, children, disabled } = props;

  return (
    <label
      className={cx('hcRadioLabel', className)}
      data-disabled={disabled || ctx?.disabled ? 'true' : 'false'}
    >
      {injectStyles && <style suppressHydrationWarning>{_radioCss}</style>}
      <input {...inputProps} />
      <span {...radioProps}>{dotProps && <span {...dotProps} />}</span>
      {children && <span className="hcRadioText">{children}</span>}
    </label>
  );
}

export function RadioGroup(props: RadioGroupProps) {
  const { contextValue } = useRadioGroup(props);
  const { className, children, injectStyles = true } = props;

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div className={cx('hcRadioGroup', className)} role="radiogroup">
        {injectStyles && <style suppressHydrationWarning>{_radioCss}</style>}
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}
