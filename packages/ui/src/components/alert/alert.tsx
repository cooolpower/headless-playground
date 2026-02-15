'use client';

// components/headless/alert/alert.tsx
import React from 'react';
import { useAlert } from './use-alert';
import { AlertProps } from './type-alert';
import { alertCss as _alertCss } from './alert.styles';

export const AlertCss = _alertCss;

export function Alert(props: AlertProps) {
  const {
    icon,
    containerProps,
    iconProps,
    contentProps,
    titleProps,
    descriptionProps,
    closeButtonProps,
  } = useAlert(props);

  const { className, title, description, injectStyles = true } = props;

  return (
    <div
      {...containerProps}
      className={[containerProps.className, className].filter(Boolean).join(' ')}
    >
      {injectStyles && <style suppressHydrationWarning>{_alertCss}</style>}
      {iconProps && icon && (
        <div {...iconProps} className={iconProps.className}>
          {icon}
        </div>
      )}

      <div {...contentProps} className={contentProps.className}>
        {titleProps && title && (
          <div {...titleProps} className={titleProps.className}>
            {title}
          </div>
        )}

        {descriptionProps && description && (
          <div {...descriptionProps} className={descriptionProps.className}>
            {description}
          </div>
        )}
      </div>

      {closeButtonProps && (
        <button type="button" {...closeButtonProps}>
          ✕
        </button>
      )}
    </div>
  );
}
