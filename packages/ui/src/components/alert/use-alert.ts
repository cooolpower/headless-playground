import React from 'react';

export interface UseAlertProps {
  type?: 'success' | 'info' | 'warning' | 'error';
  showIcon?: boolean;
  closable?: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  banner?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function useAlert({
  type = 'info',
  showIcon = false,
  closable = false,
  onClose,
  title,
  description,
  banner = false,
  size = 'medium',
}: UseAlertProps) {
  // 아이콘 결정
  const getIcon = () => {
    if (!showIcon) return null;

    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  const icon = getIcon();

  return {
    icon,
    banner,
    closable,

    containerProps: {
      role: 'alert',
      'aria-live': (type === 'error' ? 'assertive' : 'polite') as
        | 'assertive'
        | 'polite',
      className: 'hcAlert',
      'data-type': type,
      'data-size': size,
      'data-banner': banner ? 'true' : 'false',
    },

    iconProps: icon
      ? {
          className: 'hcAlertIcon',
        }
      : null,

    contentProps: {
      className: 'hcAlertContent',
    },

    titleProps: title
      ? {
          className: 'hcAlertTitle',
        }
      : null,

    descriptionProps: description
      ? {
          className: 'hcAlertDesc',
        }
      : null,

    closeButtonProps: closable
      ? {
          onClick: onClose,
          className: 'hcAlertClose',
          'aria-label': 'Close alert',
        }
      : null,
  };
}
