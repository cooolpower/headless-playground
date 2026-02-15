'use client';

// components/headless/dropdown/use-dropdown.ts
import { useState, useCallback, useRef, useEffect } from 'react';

export interface UseDropdownProps {
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function useDropdown({
  defaultOpen = false,
  onOpenChange,
}: UseDropdownProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const open = useCallback(() => {
    setIsOpen(true);
    onOpenChange?.(true);
  }, [onOpenChange]);

  const close = useCallback(() => {
    setIsOpen(false);
    onOpenChange?.(false);
    triggerRef.current?.focus();
  }, [onOpenChange]);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, close]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, close]);

  return {
    isOpen,
    open,
    close,
    toggle,

    containerProps: {
      ref: containerRef,
      className: 'hcDropdown',
    },

    triggerProps: {
      ref: triggerRef,
      onClick: toggle,
      'aria-expanded': isOpen,
      'aria-haspopup': 'menu' as const,
      type: 'button' as const,
    },

    menuProps: {
      role: 'menu',
      'aria-hidden': !isOpen,
      className: 'hcDropdownMenu',
      'data-open': isOpen ? 'true' : 'false',
    },

    itemProps: (disabled?: boolean) => ({
      role: 'menuitem',
      tabIndex: -1,
      'aria-disabled': disabled,
      className: 'hcDropdownItem',
    }),
  };
}
