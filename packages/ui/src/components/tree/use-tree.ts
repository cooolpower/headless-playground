'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { UseTreeProps, UseTreeReturn, TreeNodeData } from './type-tree';

// 트리 노드의 모든 자식 키들을 가져오는 함수
function getAllChildKeys(node: TreeNodeData, keys: string[] = []): string[] {
  if (node.children) {
    node.children.forEach((child) => {
      keys.push(String(child.key));
      getAllChildKeys(child, keys);
    });
  }
  return keys;
}

// 트리 노드의 모든 부모 키들을 가져오는 함수
function getAllParentKeys(
  treeData: TreeNodeData[],
  targetKey: string
): string[] {
  const parents: string[] = [];

  function findParents(
    nodes: TreeNodeData[],
    target: string,
    currentParents: string[] = []
  ): boolean {
    for (const node of nodes) {
      if (String(node.key) === target) {
        parents.push(...currentParents);
        return true;
      }
      if (node.children) {
        const found = findParents(node.children, target, [
          ...currentParents,
          String(node.key),
        ]);
        if (found) return true;
      }
    }
    return false;
  }

  findParents(treeData, targetKey);
  return parents;
}

// 트리에서 노드를 찾는 함수
function findNode(treeData: TreeNodeData[], key: string): TreeNodeData | null {
  for (const node of treeData) {
    if (String(node.key) === key) return node;
    if (node.children) {
      const found = findNode(node.children, key);
      if (found) return found;
    }
  }
  return null;
}

export function useTree({
  treeData = [],
  expandedKeys: controlledExpandedKeys,
  selectedKeys: controlledSelectedKeys,
  checkedKeys: controlledCheckedKeys,
  defaultExpandedKeys = [],
  defaultSelectedKeys = [],
  defaultCheckedKeys = [],
  onExpand,
  onSelect,
  onCheck,
  checkable = false,
  selectable = true,
  multiple = false,
  checkStrictly = false,
  autoExpandParent = true,
  defaultExpandAll = false,
}: UseTreeProps): UseTreeReturn {
  const [internalExpandedKeys, setInternalExpandedKeys] =
    useState<string[]>(defaultExpandedKeys);
  const [internalSelectedKeys, setInternalSelectedKeys] =
    useState<string[]>(defaultSelectedKeys);
  const [internalCheckedKeys, setInternalCheckedKeys] =
    useState<string[]>(defaultCheckedKeys);

  const isControlled = {
    expanded: controlledExpandedKeys !== undefined,
    selected: controlledSelectedKeys !== undefined,
    checked: controlledCheckedKeys !== undefined,
  };

  const expandedKeys = isControlled.expanded
    ? controlledExpandedKeys!
    : internalExpandedKeys;
  const selectedKeys = isControlled.selected
    ? controlledSelectedKeys!
    : internalSelectedKeys;
  const checkedKeys = isControlled.checked
    ? controlledCheckedKeys!
    : internalCheckedKeys;

  // 초기 확장 상태 설정
  useEffect(() => {
    if (defaultExpandAll && treeData.length > 0) {
      const allKeys: string[] = [];
      function collectKeys(nodes: TreeNodeData[]) {
        nodes.forEach((node) => {
          if (node.children && node.children.length > 0) {
            allKeys.push(String(node.key));
            collectKeys(node.children);
          }
        });
      }
      collectKeys(treeData);
      if (!isControlled.expanded) {
        setInternalExpandedKeys(allKeys);
      }
    }
  }, [defaultExpandAll, treeData, isControlled.expanded]);

  // 확장 핸들러
  const handleExpand = useCallback(
    (keys: string[], info: any) => {
      if (!isControlled.expanded) {
        setInternalExpandedKeys(keys);
      }
      onExpand?.(keys, info);
    },
    [isControlled.expanded, onExpand]
  );

  // 선택 핸들러
  const handleSelect = useCallback(
    (keys: string[], info: any) => {
      let newKeys = keys;
      if (!multiple && keys.length > 1) {
        // 단일 선택 모드에서는 마지막 선택만 유지
        newKeys = [keys[keys.length - 1]];
      }

      if (!isControlled.selected) {
        setInternalSelectedKeys(newKeys);
      }
      onSelect?.(newKeys, info);
    },
    [multiple, isControlled.selected, onSelect]
  );

  // 체크 핸들러 (엄격 모드와 비엄격 모드 지원)
  const handleCheck = useCallback(
    (_keys: string[], info: { node?: TreeNodeData | null; checked?: boolean }) => {
      if (checkStrictly) {
        // 엄격 모드: 부모-자식 관계 무시
        if (!isControlled.checked) {
          setInternalCheckedKeys(_keys);
        }
        onCheck?.(_keys, info);
        return;
      }

      // 비엄격 모드: 부모-자식 관계 자동 처리
      const targetKey = info.node ? String(info.node.key) : null;
      const isChecking = info.checked ?? false;

      if (!targetKey) {
        if (!isControlled.checked) {
          setInternalCheckedKeys(_keys);
        }
        onCheck?.(_keys, info);
        return;
      }

      const newCheckedKeys = new Set(checkedKeys);
      const targetNode = findNode(treeData, targetKey);

      if (isChecking) {
        // 체크: 대상 노드 + 모든 자식 추가
        newCheckedKeys.add(targetKey);
        if (targetNode) {
          const childKeys = getAllChildKeys(targetNode);
          childKeys.forEach((k) => newCheckedKeys.add(k));
        }
      } else {
        // 언체크: 대상 노드 + 모든 자식 제거
        newCheckedKeys.delete(targetKey);
        if (targetNode) {
          const childKeys = getAllChildKeys(targetNode);
          childKeys.forEach((k) => newCheckedKeys.delete(k));
        }
      }

      // 부모 노드들 상태 업데이트 (아래에서 위로)
      const parentKeys = getAllParentKeys(treeData, targetKey);
      // 가장 가까운 부모부터 처리
      for (let i = parentKeys.length - 1; i >= 0; i--) {
        const parentKey = parentKeys[i];
        const parentNode = findNode(treeData, parentKey);
        if (parentNode && parentNode.children) {
          const allChildrenChecked = parentNode.children.every((child) =>
            newCheckedKeys.has(String(child.key))
          );
          if (allChildrenChecked) {
            newCheckedKeys.add(parentKey);
          } else {
            newCheckedKeys.delete(parentKey);
          }
        }
      }

      const finalKeys = Array.from(newCheckedKeys);
      if (!isControlled.checked) {
        setInternalCheckedKeys(finalKeys);
      }
      onCheck?.(finalKeys, info);
    },
    [checkStrictly, treeData, checkedKeys, isControlled.checked, onCheck]
  );

  // 상태 설정 함수들
  const setExpandedKeys = useCallback(
    (keys: string[]) => {
      if (!isControlled.expanded) {
        setInternalExpandedKeys(keys);
      }
    },
    [isControlled.expanded]
  );

  const setSelectedKeys = useCallback(
    (keys: string[]) => {
      if (!isControlled.selected) {
        setInternalSelectedKeys(keys);
      }
    },
    [isControlled.selected]
  );

  const setCheckedKeys = useCallback(
    (keys: string[]) => {
      if (!isControlled.checked) {
        setInternalCheckedKeys(keys);
      }
    },
    [isControlled.checked]
  );

  // 체크된 노드들 가져오기
  const getCheckedNodes = useCallback((): TreeNodeData[] => {
    const nodes: TreeNodeData[] = [];
    checkedKeys.forEach((key) => {
      const node = findNode(treeData, key);
      if (node) nodes.push(node);
    });
    return nodes;
  }, [checkedKeys, treeData]);

  // 확장된 노드들 가져오기
  const getExpandedNodes = useCallback((): TreeNodeData[] => {
    const nodes: TreeNodeData[] = [];
    expandedKeys.forEach((key) => {
      const node = findNode(treeData, key);
      if (node) nodes.push(node);
    });
    return nodes;
  }, [expandedKeys, treeData]);

  return {
    expandedKeys,
    selectedKeys,
    checkedKeys,
    setExpandedKeys,
    setSelectedKeys,
    setCheckedKeys,
    handleExpand,
    handleSelect,
    handleCheck,
    getCheckedNodes,
    getExpandedNodes,
  };
}
