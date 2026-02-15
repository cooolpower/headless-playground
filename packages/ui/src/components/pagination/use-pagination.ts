'use client';

import { useState, useCallback, useMemo } from 'react';
import { UsePaginationProps, UsePaginationReturn } from './type-pagination';

export function usePagination({
  current: controlledCurrent,
  defaultCurrent = 1,
  total = 0,
  pageSize: controlledPageSize,
  defaultPageSize = 10,
  onChange,
  onShowSizeChange,
}: UsePaginationProps): UsePaginationReturn {
  const [internalCurrent, setInternalCurrent] = useState(defaultCurrent);
  const [internalPageSize, setInternalPageSize] = useState(defaultPageSize);

  const isCurrentControlled = controlledCurrent !== undefined;
  const isPageSizeControlled = controlledPageSize !== undefined;

  const current = isCurrentControlled ? controlledCurrent : internalCurrent;
  const pageSize = isPageSizeControlled ? controlledPageSize : internalPageSize;

  const totalPages = useMemo(
    () => Math.ceil(total / pageSize),
    [total, pageSize]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages || page === current) return;

      if (!isCurrentControlled) {
        setInternalCurrent(page);
      }

      onChange?.(page, pageSize);
    },
    [current, totalPages, pageSize, isCurrentControlled, onChange]
  );

  const handleSizeChange = useCallback(
    (size: number) => {
      if (!isPageSizeControlled) {
        setInternalPageSize(size);
      }

      // 페이지 크기가 변경되면 첫 페이지로 이동
      const newCurrent = 1;
      if (!isCurrentControlled) {
        setInternalCurrent(newCurrent);
      }

      onChange?.(newCurrent, size);
      onShowSizeChange?.(newCurrent, size);
    },
    [isPageSizeControlled, isCurrentControlled, onChange, onShowSizeChange]
  );

  const getPageRange = useCallback(() => {
    const start = (current - 1) * pageSize + 1;
    const end = Math.min(current * pageSize, total);
    return { start, end };
  }, [current, pageSize, total]);

  const canGoPrev = useCallback(() => current > 1, [current]);
  const canGoNext = useCallback(
    () => current < totalPages,
    [current, totalPages]
  );

  const goToPrev = useCallback(() => {
    if (canGoPrev()) handlePageChange(current - 1);
  }, [canGoPrev, handlePageChange, current]);

  const goToNext = useCallback(() => {
    if (canGoNext()) handlePageChange(current + 1);
  }, [canGoNext, handlePageChange, current]);

  const goToFirst = useCallback(() => handlePageChange(1), [handlePageChange]);
  const goToLast = useCallback(
    () => handlePageChange(totalPages),
    [handlePageChange, totalPages]
  );

  return {
    current,
    pageSize,
    total,
    totalPages,
    handlePageChange,
    handleSizeChange,
    getPageRange,
    canGoPrev,
    canGoNext,
    goToPrev,
    goToNext,
    goToFirst,
    goToLast,
  };
}
