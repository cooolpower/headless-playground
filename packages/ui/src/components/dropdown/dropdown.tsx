'use client';

// components/headless/dropdown/dropdown.tsx
import React, { createContext, useContext } from 'react';
import { useDropdown } from './use-dropdown';
import {
  DropdownProps,
  DropdownTriggerProps,
  DropdownMenuProps,
  DropdownItemProps,
} from './type-dropdown';
import { dropdownCss as _dropdownCss } from './dropdown.styles';
import { useStyles } from '../../hooks/use-styles';

type DropdownContextValue = ReturnType<typeof useDropdown>;
const DropdownContext = createContext<DropdownContextValue | null>(null);

export function Dropdown({
  children,
  injectStyles = true,
  className,
  ...props
}: DropdownProps) {
  const dropdown = useDropdown({ ...props, children });

  // useStyles 훅을 통해 테마 및 컴포넌트 스타일 주입
  useStyles('hc-dropdown-styles', _dropdownCss, injectStyles);

  return (
    <DropdownContext.Provider value={dropdown}>
      <div
        {...dropdown.containerProps}
        className={
          className
            ? `${dropdown.containerProps.className} ${className}`
            : dropdown.containerProps.className
        }
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function DropdownTrigger({
  children,
  className,
  disabled,
}: DropdownTriggerProps) {
  const ctx = useContext(DropdownContext);
  if (!ctx) return <button type="button">{children}</button>;

  return (
    <button
      {...ctx.triggerProps}
      type="button"
      aria-disabled={disabled ? 'true' : undefined}
      className={
        className ? `hcDropdownTrigger ${className}` : 'hcDropdownTrigger'
      }
      onClick={disabled ? undefined : ctx.triggerProps.onClick}
    >
      {children}
    </button>
  );
}

export function DropdownMenu({ children, className }: DropdownMenuProps) {
  const ctx = useContext(DropdownContext);
  if (!ctx) return null;

  return (
    <div
      {...ctx.menuProps}
      className={
        className
          ? `${ctx.menuProps.className} ${className}`
          : ctx.menuProps.className
      }
    >
      {children}
    </div>
  );
}

export function DropdownItem({
  children,
  value,
  disabled,
  onClick,
  className,
}: DropdownItemProps) {
  const ctx = useContext(DropdownContext);
  const props = ctx?.itemProps(disabled);

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
    ctx?.close();
  };

  return (
    <div
      {...props}
      className={
        props?.className
          ? className
            ? `${props.className} ${className}`
            : props.className
          : className
      }
      onClick={handleClick}
      data-value={value}
    >
      {children}
    </div>
  );
}

export const DropdownCss = _dropdownCss;
