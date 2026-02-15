'use client';

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { UseTreeSelectProps, UseTreeSelectReturn } from './type-tree-select';
import type { TreeNodeData } from '../tree/type-tree';

function findNode(data: TreeNodeData[], key: string): TreeNodeData | null {
  for (const node of data) {
    if (String(node.key) === key) return node;
    if (node.children) {
      const found = findNode(node.children, key);
      if (found) return found;
    }
  }
  return null;
}

export function useTreeSelect({
  value,
  defaultValue,
  onChange,
  open,
  defaultOpen = false,
  onOpenChange,
  multiple = false,
  disabled = false,
  placeholder = '선택해주세요',
  treeData,
}: UseTreeSelectProps): UseTreeSelectReturn {
  const [internalValue, setInternalValue] = useState<string[]>(
    defaultValue ?? [],
  );
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const wrapperRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  const isValueControlled = value !== undefined;
  const selectedKeys = isValueControlled ? value! : internalValue;

  const isOpenControlled = open !== undefined;
  const isOpen = isOpenControlled ? open! : internalOpen;

  const setIsOpen = useCallback(
    (next: boolean) => {
      if (!isOpenControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isOpenControlled, onOpenChange],
  );

  const setSelectedKeys = useCallback(
    (keys: string[]) => {
      if (disabled) return;
      if (!isValueControlled) setInternalValue(keys);
      onChange?.(keys);
    },
    [disabled, isValueControlled, onChange],
  );

  const toggleOpen = useCallback(() => {
    if (disabled) return;
    setIsOpen(!isOpen);
  }, [disabled, isOpen, setIsOpen]);

  const close = useCallback(() => setIsOpen(false), [setIsOpen]);

  // close on outside click when open
  useEffect(() => {
    if (!isOpen) return;
    const onMouseDown = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [isOpen, close]);

  const displayText = useMemo(() => {
    if (!selectedKeys || selectedKeys.length === 0) return placeholder;
    if (multiple) {
      const titles = selectedKeys
        .map((k) => {
          const node = findNode(treeData, k);
          return node ? String(node.title) : null;
        })
        .filter((t): t is string => t !== null);
      if (titles.length === 0) return placeholder;
      return `${titles.join(', ')} (${selectedKeys.length})`;
    }
    const node = findNode(treeData, selectedKeys[0]);
    return node ? String(node.title) : placeholder;
  }, [selectedKeys, placeholder, multiple, treeData]);

  return {
    selectedKeys,
    setSelectedKeys,
    isOpen,
    setIsOpen,
    toggleOpen,
    close,
    wrapperRef,
    displayText,
  };
}
