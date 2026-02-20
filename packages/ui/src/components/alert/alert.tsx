'use client';

// components/headless/alert/alert.tsx
import React from 'react';
import { useAlert } from './use-alert';
import { AlertProps } from './type-alert';
import { alertCss as _alertCss } from './alert.styles';
import { useStyles } from '../../hooks/use-styles';

import { cx } from '../../utils';

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

  // useStyles 훅을 통해 테마 및 컴포넌트 스타일 주입
  useStyles('hc-alert-styles', _alertCss, injectStyles);

  return (
    <div
      {...containerProps}
      className={cx(containerProps.className, className)}
    >
      {iconProps && icon && (
        <div {...iconProps} className={iconProps.className}>
          {icon}
        </div>
      )}

      <div {...contentProps} className={contentProps.className}>
        {!!titleProps && !!title && (
          <div {...titleProps} className={titleProps.className}>
            {title as any}
          </div>
        )}

        {!!descriptionProps && !!description && (
          <div {...descriptionProps} className={descriptionProps.className}>
            {description as any}
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
