'use client';

// components/headless/icon/icon.tsx
import type { ReactNode, ComponentType } from 'react';
import { useIcon, type UseIconProps } from './use-icon';
import type { LucideIcon } from 'lucide-react';
import { iconCss as _iconCss } from './icon.styles';

export interface IconProps extends UseIconProps {
  children?: ReactNode;
  /** Lucide icon component (e.g., from lucide-react) */
  icon?:
    | LucideIcon
    | ComponentType<{ size?: number | string; className?: string }>;
  /** Icon name for display purposes */
  name?: string;
  className?: string;
  injectStyles?: boolean;
}

export const IconCss = _iconCss;

function cx(...parts: Array<string | undefined | null | false>) {
  return parts.filter(Boolean).join(' ');
}

export function Icon({
  children,
  icon: IconComponent,
  name,
  className,
  injectStyles = true,
  ...props
}: IconProps) {
  const iconStyles = useIcon(props);

  // If Lucide icon component is provided, use it
  if (IconComponent) {
    const sizeMap = {
      xSmall: 10,
      small: 16,
      medium: 24,
      large: 32,
      xLarge: 36,
    };
    const iconSize = sizeMap[props.size || 'medium'];

    return (
      <span
        {...iconStyles}
        className={injectStyles ? cx('hcIcon', className) : className}
      >
        {injectStyles && <style suppressHydrationWarning>{_iconCss}</style>}
        {/* Type cast to fix React 18/19 compatibility */}
        {(() => {
          const Component = IconComponent as React.ElementType;
          return <Component size={iconSize} className={className} />;
        })()}
      </span>
    );
  }

  // Otherwise, render children
  return (
    <span
      {...iconStyles}
      className={injectStyles ? cx('hcIcon', className) : className}
    >
      {injectStyles && <style suppressHydrationWarning>{_iconCss}</style>}
      {children}
    </span>
  );
}
