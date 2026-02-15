'use client';

import { useState, useCallback } from 'react';
import { UseMenuProps, UseMenuReturn, MenuInfo } from './type-menu';

export function useMenu({
  selectedKeys: controlledSelectedKeys,
  defaultSelectedKeys = [],
  openKeys: controlledOpenKeys,
  defaultOpenKeys = [],
  mode = 'vertical',
  onSelect,
  onOpenChange,
  onClick,
}: UseMenuProps): UseMenuReturn {
  const [internalSelectedKeys, setInternalSelectedKeys] =
    useState<string[]>(defaultSelectedKeys);
  const [internalOpenKeys, setInternalOpenKeys] =
    useState<string[]>(defaultOpenKeys);

  const isSelectedControlled = controlledSelectedKeys !== undefined;
  const isOpenControlled = controlledOpenKeys !== undefined;

  const selectedKeys = isSelectedControlled
    ? controlledSelectedKeys
    : internalSelectedKeys;
  const openKeys = isOpenControlled ? controlledOpenKeys : internalOpenKeys;

  const handleSelect = useCallback(
    (info: MenuInfo) => {
      const { key, keyPath } = info;

      // 선택된 키 업데이트
      if (!isSelectedControlled) {
        setInternalSelectedKeys([key]);
      }

      // inline 모드에서 부모 메뉴들을 열기
      if (mode === 'inline' && !isOpenControlled) {
        const parentKeys = keyPath.slice(1); // 현재 키를 제외한 부모 키들
        const newOpenKeys = [...new Set([...openKeys, ...parentKeys])];
        setInternalOpenKeys(newOpenKeys);
        onOpenChange?.(newOpenKeys);
      }

      onSelect?.(info);
      onClick?.(info);
    },
    [
      mode,
      openKeys,
      isSelectedControlled,
      isOpenControlled,
      onSelect,
      onOpenChange,
      onClick,
    ]
  );

  const handleOpenChange = useCallback(
    (key: string, isOpen: boolean) => {
      let newOpenKeys: string[];

      if (isOpen) {
        newOpenKeys = [...openKeys, key];
      } else {
        newOpenKeys = openKeys.filter((k) => k !== key);
      }

      if (!isOpenControlled) {
        setInternalOpenKeys(newOpenKeys);
      }

      onOpenChange?.(newOpenKeys);
    },
    [openKeys, isOpenControlled, onOpenChange]
  );

  const isSelected = useCallback(
    (key: string) => {
      return selectedKeys.includes(key);
    },
    [selectedKeys]
  );

  const isOpen = useCallback(
    (key: string) => {
      return openKeys.includes(key);
    },
    [openKeys]
  );

  return {
    selectedKeys,
    openKeys,
    handleSelect,
    handleOpenChange,
    isSelected,
    isOpen,
  };
}
