'use client';

import React, { forwardRef } from 'react';
import { AutocompleteProps } from './type-auto-complete';
import { useAutocomplete } from './use-auto-complete';
import { autoCompleteCss as _autoCompleteCss } from './auto-complete.styles';

export const AutocompleteCss = _autoCompleteCss;

function cx(...parts: Array<string | undefined | null | false>) {
  return parts.filter(Boolean).join(' ');
}

const AutocompleteComponent = forwardRef<HTMLDivElement, AutocompleteProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      disabled = false,
      className,
      injectStyles = true,
      children,
      ...props
    },
    ref
  ) => {
    const { currentValue, handleChange } = useAutocomplete({
      value,
      defaultValue,
      onChange,
      disabled,
    });

    return (
      <div
        ref={ref}
        className={injectStyles ? cx('hcAutocomplete', className) : className}
        data-disabled={disabled ? 'true' : 'false'}
        {...props}
      >
        {injectStyles && <style suppressHydrationWarning>{_autoCompleteCss}</style>}
        {children || (
          <div>
            Autocomplete Component - Value: {JSON.stringify(currentValue)}
          </div>
        )}
      </div>
    );
  }
);

AutocompleteComponent.displayName = 'Autocomplete';

export const Autocomplete = AutocompleteComponent;

Autocomplete.displayName = 'Autocomplete';
