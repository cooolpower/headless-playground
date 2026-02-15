'use client';

import { useMemo, useCallback } from 'react';
import {
  UseTransferProps,
  UseTransferReturn,
  TransferItem,
} from './type-transfer';

export function useTransfer({
  dataSource,
  targetKeys,
  selectedKeys,
  onChange,
  onSelectChange,
  disabled = false,
}: UseTransferProps): UseTransferReturn {
  // 데이터 분리
  const { sourceData, targetData } = useMemo(() => {
    const source: TransferItem[] = [];
    const target: TransferItem[] = [];

    dataSource.forEach((item) => {
      if (targetKeys.includes(String(item.key))) {
        target.push(item);
      } else {
        source.push(item);
      }
    });

    return { sourceData: source, targetData: target };
  }, [dataSource, targetKeys]);

  // 선택된 키들 분리
  const { sourceSelectedKeys, targetSelectedKeys } = useMemo(() => {
    const sourceSelected: string[] = [];
    const targetSelected: string[] = [];

    selectedKeys.forEach((key) => {
      if (targetKeys.includes(key)) {
        targetSelected.push(key);
      } else {
        sourceSelected.push(key);
      }
    });

    return {
      sourceSelectedKeys: sourceSelected,
      targetSelectedKeys: targetSelected,
    };
  }, [selectedKeys, targetKeys]);

  // 선택 변경 핸들러
  const handleSelectChange = useCallback(
    (direction: 'left' | 'right', selectedKeys: string[]) => {
      let newSourceSelectedKeys = sourceSelectedKeys;
      let newTargetSelectedKeys = targetSelectedKeys;

      if (direction === 'left') {
        newSourceSelectedKeys = selectedKeys;
      } else {
        newTargetSelectedKeys = selectedKeys;
      }

      const allSelectedKeys = [
        ...newSourceSelectedKeys,
        ...newTargetSelectedKeys,
      ];
      onSelectChange?.(newSourceSelectedKeys, newTargetSelectedKeys);
    },
    [sourceSelectedKeys, targetSelectedKeys, onSelectChange]
  );

  // 항목 이동 핸들러
  const handleTransfer = useCallback(
    (direction: 'left' | 'right') => {
      if (disabled) return;

      const moveKeys =
        direction === 'right' ? sourceSelectedKeys : targetSelectedKeys;
      if (moveKeys.length === 0) return;

      let newTargetKeys: string[];
      if (direction === 'right') {
        // 왼쪽에서 오른쪽으로 이동
        newTargetKeys = [...targetKeys, ...moveKeys];
      } else {
        // 오른쪽에서 왼쪽으로 이동
        newTargetKeys = targetKeys.filter((key) => !moveKeys.includes(key));
      }

      onChange?.(newTargetKeys, direction, moveKeys);

      // 선택 해제
      handleSelectChange(direction === 'right' ? 'left' : 'right', []);
    },
    [
      disabled,
      sourceSelectedKeys,
      targetSelectedKeys,
      targetKeys,
      onChange,
      handleSelectChange,
    ]
  );

  // 전체 선택/해제 핸들러
  const handleSelectAll = useCallback(
    (direction: 'left' | 'right', selected: boolean) => {
      const data = direction === 'left' ? sourceData : targetData;
      const selectableKeys = data
        .filter((item) => !item.disabled)
        .map((item) => String(item.key));

      handleSelectChange(direction, selected ? selectableKeys : []);
    },
    [sourceData, targetData, handleSelectChange]
  );

  // 이동 가능 여부 확인
  const canTransfer = useCallback(
    (direction: 'left' | 'right') => {
      if (disabled) return false;

      const selectedKeys =
        direction === 'left' ? targetSelectedKeys : sourceSelectedKeys;
      return selectedKeys.length > 0;
    },
    [disabled, targetSelectedKeys, sourceSelectedKeys]
  );

  return {
    sourceData,
    targetData,
    sourceSelectedKeys,
    targetSelectedKeys,
    handleSelectChange,
    handleTransfer,
    handleSelectAll,
    canTransfer,
  };
}
