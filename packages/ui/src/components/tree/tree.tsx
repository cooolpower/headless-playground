'use client';

import React, { useCallback } from 'react';
import { ChevronRight, Folder, File, Image as ImageIcon } from 'lucide-react';
import { Icon } from '../icon/icon';
import { Checkbox } from '../checkbox/checkbox';
import { TreeProps, TreeNodeData, TreeClassNames } from './type-tree';
import { useTree } from './use-tree';
import { treeCss as _treeCss } from './tree.styles';
import { cx } from '../../utils';

interface TreeNodeProps {
  node: TreeNodeData;
  level: number;
  expandedKeys: string[];
  selectedKeys: string[];
  checkedKeys: string[];
  onExpand: (key: string, expanded: boolean) => void;
  onSelect: (key: string, selected: boolean) => void;
  onCheck: (key: string, checked: boolean) => void;
  showLine?: boolean;
  showIcon?: boolean;
  checkable?: boolean;
  selectable?: boolean;
  disabled?: boolean;
  titleRender?: (node: TreeNodeData) => React.ReactNode;
  classNames?: TreeClassNames;
}

function TreeNode({
  node,
  level,
  expandedKeys,
  selectedKeys,
  checkedKeys,
  onExpand,
  onSelect,
  onCheck,
  showLine = false,
  showIcon = false,
  checkable = false,
  selectable = true,
  disabled = false,
  titleRender,
  classNames,
}: TreeNodeProps) {
  const key = String(node.key);
  const isExpanded = expandedKeys.includes(key);
  const isSelected = selectedKeys.includes(key);
  const isChecked = checkedKeys.includes(key);
  const hasChildren = node.children && node.children.length > 0;
  const isDisabled = disabled || node.disabled;
  const isSelectable = selectable && node.selectable !== false;
  const isCheckable = checkable && node.checkable !== false;

  const handleExpand = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (hasChildren) {
        onExpand(key, !isExpanded);
      }
    },
    [hasChildren, key, isExpanded, onExpand],
  );

  const handleSelect = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isSelectable && !isDisabled) {
        onSelect(key, !isSelected);
      }
    },
    [isSelectable, isDisabled, key, isSelected, onSelect],
  );

  const handleCheck = useCallback(
    (checked: boolean) => {
      if (isCheckable && !isDisabled) {
        onCheck(key, checked);
      }
    },
    [isCheckable, isDisabled, key, onCheck],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (isSelectable && !isDisabled) {
          onSelect(key, !isSelected);
        }
      } else if (e.key === 'ArrowRight' && hasChildren && !isExpanded) {
        onExpand(key, true);
      } else if (e.key === 'ArrowLeft' && hasChildren && isExpanded) {
        onExpand(key, false);
      }
    },
    [
      isSelectable,
      isDisabled,
      key,
      isSelected,
      onSelect,
      hasChildren,
      isExpanded,
      onExpand,
    ],
  );

  // Determine default icon based on node type
  const getDefaultIcon = () => {
    if (hasChildren) {
      return <Icon icon={Folder} size="small" />;
    }
    // Check if node.title or node.key suggests it's an image
    const titleStr = String(node.title || node.key || '');
    if (
      titleStr.toLowerCase().includes('image') ||
      titleStr.toLowerCase().includes('img')
    ) {
      return <Icon icon={ImageIcon} size="small" />;
    }
    return <Icon icon={File} size="small" />;
  };

  return (
    <li className={cx(classNames?.treeNode, 'hcTreeNode')}>
      <div
        className={cx(
          classNames?.treeNodeContent,
          'hcTreeNodeContent',
          isSelected && (classNames?.treeNodeSelected ?? 'hcTreeNodeSelected'),
          isDisabled && (classNames?.treeNodeDisabled ?? 'hcTreeNodeDisabled'),
        )}
        onClick={handleSelect}
        onKeyDown={handleKeyDown}
        tabIndex={isSelectable ? 0 : -1}
        role="treeitem"
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-selected={isSelected}
        aria-disabled={isDisabled}
        style={{ paddingLeft: `${level * 20}px` }}
      >
        {/* 인덴테이션 라인 */}
        {showLine && level > 0 && (
          <span className={classNames?.treeIndent}>
            {Array.from({ length: level }, (_, i) => (
              <span key={i} className={classNames?.treeIndentLine} />
            ))}
          </span>
        )}

        {/* 확장/축소 아이콘 */}
        <span className={cx(classNames?.treeSwitcher, 'hcTreeSwitcher')}>
          {hasChildren ? (
            <button
              type="button"
              onClick={handleExpand}
              aria-label={isExpanded ? '축소' : '확장'}
              className={cx(
                classNames?.treeSwitcherButton,
                'hcTreeSwitcherButton',
                isExpanded &&
                  (classNames?.treeSwitcherExpanded ??
                    'hcTreeSwitcherExpanded'),
              )}
            >
              <Icon icon={ChevronRight} size="small" />
            </button>
          ) : showLine ? (
            <span
              className={cx(classNames?.treeSwitcherLeaf, 'hcTreeSwitcherLeaf')}
            />
          ) : null}
        </span>

        {/* 체크박스 */}
        {isCheckable && (
          <span className={cx(classNames?.treeCheckbox, 'hcTreeCheckbox')}>
            <Checkbox
              checked={isChecked}
              onChange={handleCheck}
              disabled={isDisabled}
            />
          </span>
        )}

        {/* 아이콘 */}
        {showIcon && (
          <span className={cx(classNames?.treeIcon, 'hcTreeIcon')}>
            {node.icon || getDefaultIcon()}
          </span>
        )}

        {/* 타이틀 */}
        <span className={cx(classNames?.treeTitle, 'hcTreeTitle')}>
          {titleRender ? titleRender(node) : node.title}
        </span>
      </div>

      {/* 자식 노드들 */}
      {hasChildren && isExpanded && (
        <ul
          role="group"
          className={cx(classNames?.treeNodeChildren, 'hcTreeNodeChildren')}
        >
          {node.children!.map((child) => (
            <TreeNode
              key={child.key}
              node={child}
              level={level + 1}
              expandedKeys={expandedKeys}
              selectedKeys={selectedKeys}
              checkedKeys={checkedKeys}
              onExpand={onExpand}
              onSelect={onSelect}
              onCheck={onCheck}
              showLine={showLine}
              showIcon={showIcon}
              checkable={checkable}
              selectable={selectable}
              disabled={disabled}
              titleRender={titleRender}
              classNames={classNames}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export const TreeComponent = React.forwardRef<HTMLUListElement, TreeProps>(
  (
    {
      injectStyles = true,
      treeData = [],
      showLine = false,
      showIcon = false,
      checkable = false,
      selectable = true,
      multiple = false,
      disabled = false,
      titleRender,
      className,
      classNames,
      ...treeProps
    },
    ref,
  ) => {
    const {
      expandedKeys,
      selectedKeys,
      checkedKeys,
      handleExpand,
      handleSelect,
      handleCheck,
    } = useTree({
      treeData,
      checkable,
      selectable,
      multiple,
      ...treeProps,
    });

    const handleNodeExpand = useCallback(
      (key: string, expanded: boolean) => {
        const newExpandedKeys = expanded
          ? [...expandedKeys, key]
          : expandedKeys.filter((k) => k !== key);
        handleExpand(newExpandedKeys, {
          node: findNode(treeData, key),
          expanded,
        });
      },
      [expandedKeys, handleExpand, treeData],
    );

    const handleNodeSelect = useCallback(
      (key: string, selected: boolean) => {
        const newSelectedKeys = selected
          ? multiple
            ? [...selectedKeys, key]
            : [key]
          : selectedKeys.filter((k) => k !== key);
        const node = findNode(treeData, key);
        handleSelect(newSelectedKeys, { node, selected });
      },
      [multiple, selectedKeys, handleSelect, treeData],
    );

    const handleNodeCheck = useCallback(
      (key: string, checked: boolean) => {
        const newCheckedKeys = checked
          ? [...checkedKeys, key]
          : checkedKeys.filter((k) => k !== key);
        const node = findNode(treeData, key);
        handleCheck(newCheckedKeys, { node, checked });
      },
      [checkedKeys, handleCheck, treeData],
    );

    return (
      <ul
        ref={ref}
        className={cx('hcTree', className, classNames?.tree)}
        role="tree"
        aria-multiselectable={multiple}
      >
        {injectStyles ? (
          <style suppressHydrationWarning>{_treeCss}</style>
        ) : null}
        {treeData.map((node) => (
          <TreeNode
            key={node.key}
            node={node}
            level={0}
            expandedKeys={expandedKeys}
            selectedKeys={selectedKeys}
            checkedKeys={checkedKeys}
            onExpand={handleNodeExpand}
            onSelect={handleNodeSelect}
            onCheck={handleNodeCheck}
            showLine={showLine}
            showIcon={showIcon}
            checkable={checkable}
            selectable={selectable}
            disabled={disabled}
            titleRender={titleRender}
            classNames={classNames}
          />
        ))}
      </ul>
    );
  },
);

// 헬퍼 함수
function findNode(
  treeData: TreeNodeData[],
  key: string,
): TreeNodeData | undefined {
  for (const node of treeData) {
    if (String(node.key) === key) return node;
    if (node.children) {
      const found = findNode(node.children, key);
      if (found) return found;
    }
  }
  return undefined;
}

TreeComponent.displayName = 'Tree';
export const Tree = TreeComponent;
Tree.displayName = 'Tree';

export const TreeCss = _treeCss;
