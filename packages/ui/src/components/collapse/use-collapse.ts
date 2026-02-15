'use client';

import { useState, useCallback, useEffect } from 'react';
import { UseCollapseProps, UseCollapseReturn } from './type-collapse';

export function useCollapse({
  accordion = false,
  activeKey,
  defaultActiveKey = [],
  onChange,
}: UseCollapseProps): UseCollapseReturn {
  const [internalActiveKeys, setInternalActiveKeys] = useState<string[]>(() => {
    if (defaultActiveKey) {
      return Array.isArray(defaultActiveKey)
        ? defaultActiveKey
        : [defaultActiveKey];
    }
    return [];
  });

  // controlled vs uncontrolled logic
  const isControlled = activeKey !== undefined;
  const activeKeys = isControlled
    ? Array.isArray(activeKey)
      ? activeKey
      : activeKey
        ? [activeKey]
        : []
    : internalActiveKeys;

  const onPanelChange = useCallback(
    (key: string, isActive: boolean) => {
      let newActiveKeys: string[];

      if (accordion) {
        // accordion 모드: 하나의 패널만 활성화
        newActiveKeys = isActive ? [key] : [];
      } else {
        // 일반 모드: 여러 패널 활성화 가능
        if (isActive) {
          newActiveKeys = [...activeKeys, key];
        } else {
          newActiveKeys = activeKeys.filter((k) => k !== key);
        }
      }

      if (!isControlled) {
        setInternalActiveKeys(newActiveKeys);
      }

      onChange?.(
        accordion && newActiveKeys.length === 1
          ? newActiveKeys[0]
          : newActiveKeys
      );
    },
    [accordion, activeKeys, isControlled, onChange]
  );

  const isActive = useCallback(
    (key: string) => {
      return activeKeys.includes(key);
    },
    [activeKeys]
  );

  // controlled prop이 변경될 때 internal state 업데이트
  useEffect(() => {
    if (isControlled) {
      const newActiveKeys = Array.isArray(activeKey)
        ? activeKey
        : activeKey
          ? [activeKey]
          : [];
      setInternalActiveKeys(newActiveKeys);
    }
  }, [activeKey, isControlled]);

  return {
    activeKeys,
    onPanelChange,
    isActive,
  };
}
