'use client';

import React, { forwardRef, useCallback, useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { Icon } from '../icon/icon';
import { Tree } from '../tree/tree';
import type { TreeNodeData } from '../tree/type-tree';
import { MenuProps, MenuItem, MenuInfo } from './type-menu';
import { useMenu } from './use-menu';
import { menuCss as _menuCss } from './menu.styles';

// MenuItem을 TreeNodeData로 변환
function menuItemToTreeNode(item: MenuItem): TreeNodeData {
  return {
    key: item.key,
    title: item.label,
    icon: item.icon,
    children: item.children?.map(menuItemToTreeNode),
    disabled: item.disabled,
    selectable: !item.disabled && item.type !== 'divider',
    danger: item.danger,
  };
}

export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      items = [],
      mode = 'vertical',
      theme = 'light',
      selectedKeys,
      defaultSelectedKeys,
      openKeys,
      defaultOpenKeys,
      onSelect,
      onOpenChange,
      onClick,
      inlineCollapsed = false,
      className,
      classNames,
      injectStyles = true,
      ...props
    },
    ref
  ) => {
    const { handleSelect, handleOpenChange, isSelected, isOpen } = useMenu({
      selectedKeys,
      defaultSelectedKeys,
      openKeys,
      defaultOpenKeys,
      mode,
      onSelect,
      onOpenChange,
      onClick,
    });

    // MenuItem을 TreeNodeData로 변환
    const treeData = useMemo(
      () => items.map(menuItemToTreeNode),
      [items]
    );

    // Tree의 onSelect를 Menu의 onSelect로 변환
    const handleTreeSelect = useCallback(
      (selectedKeys: string[], info: { node: TreeNodeData; selected: boolean }) => {
        if (!info.selected) return;

        const { node } = info;
        const menuItem = items.find((item) => String(item.key) === String(node.key));
        if (!menuItem) return;

        // keyPath 구축 (부모에서 자식으로)
        const findKeyPath = (
          items: MenuItem[],
          targetKey: string,
          path: string[] = []
        ): string[] => {
          for (const item of items) {
            const currentPath = [...path, String(item.key)];
            if (String(item.key) === targetKey) {
              return currentPath;
            }
            if (item.children) {
              const found = findKeyPath(item.children, targetKey, currentPath);
              if (found.length > 0) return found;
            }
          }
          return [];
        };

        const keyPath = findKeyPath(items, String(node.key));

        const menuInfo: MenuInfo = {
          key: String(node.key),
          keyPath,
          item: menuItem,
          domEvent: {} as React.MouseEvent, // Tree에서 제공하지 않음
        };

        handleSelect(menuInfo);
      },
      [items, handleSelect]
    );

    // Tree의 onExpand를 Menu의 onOpenChange로 변환
    const handleTreeExpand = useCallback(
      (expandedKeys: string[], info: { node: TreeNodeData; expanded: boolean }) => {
        // Tree의 expandedKeys를 Menu의 onOpenChange에 전달
        // Menu의 onOpenChange는 전체 openKeys 배열을 받음
        onOpenChange?.(expandedKeys);
      },
      [onOpenChange]
    );

    // titleRender: 아이콘과 label을 표시하고 danger 스타일 적용
    const titleRender = useCallback(
      (node: TreeNodeData) => {
        const menuItem = items.find((item) => String(item.key) === String(node.key));
        const danger = menuItem?.danger || (node as any).danger;

        return (
          <span className="hcMenuTitle" data-danger={danger ? 'true' : 'false'}>
            {node.title}
          </span>
        );
      },
      [items]
    );

    return (
      <div
        ref={ref}
        className={className || classNames?.menu}
        role="menu"
        {...props}
      >
        {injectStyles ? <style suppressHydrationWarning>{_menuCss}</style> : null}
        <Tree
          treeData={treeData}
          selectable
          injectStyles={false}
          selectedKeys={selectedKeys || defaultSelectedKeys || []}
          expandedKeys={openKeys}
          defaultExpandedKeys={defaultOpenKeys}
          onSelect={handleTreeSelect}
          onExpand={handleTreeExpand}
          showIcon
          titleRender={titleRender}
          classNames={classNames}
        />
      </div>
    );
  }
);

Menu.displayName = 'Menu';

export const MenuCss = _menuCss;
