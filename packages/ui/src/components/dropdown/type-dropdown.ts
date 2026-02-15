import type { ReactNode } from 'react';

export interface DropdownProps {
  children: ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  injectStyles?: boolean;
  className?: string;
}

export interface DropdownTriggerProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

export interface DropdownMenuProps {
  children: ReactNode;
  className?: string;
}

export interface DropdownItemProps {
  children: ReactNode;
  value?: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

