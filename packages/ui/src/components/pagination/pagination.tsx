'use client';

import React, { forwardRef } from 'react';
import { PaginationProps } from './type-pagination';
import { usePagination } from './use-pagination';
import { Button } from '../button/buttons';
import { Input } from '../input/input';
import { Select } from '../select/select';
import { paginationCss as _paginationCss } from './pagination.styles';

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      injectStyles = true,
      current,
      defaultCurrent = 1,
      total = 0,
      pageSize = 10,
      defaultPageSize = 10,
      showSizeChanger = false,
      showQuickJumper = false,
      showTotal,
      onChange,
      onShowSizeChange,
      disabled = false,
      size = 'medium',
      simple = false,
      className,
      ...props
    },
    ref
  ) => {
    const {
      current: currentPage,
      pageSize: currentPageSize,
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
    } = usePagination({
      current,
      defaultCurrent,
      total,
      pageSize,
      defaultPageSize,
      onChange,
      onShowSizeChange,
    });

    if (totalPages <= 1) return null;

    const { start, end } = getPageRange();
    const pageNumbers = [];

    // 페이지 번호 계산 (현재 페이지를 중심으로 5개 표시)
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (simple) {
      return (
        <div ref={ref} className={className ? `hcPagination ${className}` : 'hcPagination'} {...props}>
          {injectStyles ? <style suppressHydrationWarning>{_paginationCss}</style> : null}
          <Button
            onClick={goToPrev}
            disabled={!canGoPrev() || disabled}
            className="hcPaginationBtn"
          >
            ‹
          </Button>

          <span>
            {currentPage} / {totalPages}
          </span>

          <Button
            onClick={goToNext}
            disabled={!canGoNext() || disabled}
            className="hcPaginationBtn"
          >
            ›
          </Button>
        </div>
      );
    }

    return (
      <div ref={ref} className={className ? `hcPagination ${className}` : 'hcPagination'} {...props}>
        {injectStyles ? <style suppressHydrationWarning>{_paginationCss}</style> : null}
        {showTotal && <div className="hcPaginationTotal">{showTotal(total, [start, end])}</div>}

        <div className="hcPaginationButtons">
          <Button
            onClick={goToFirst}
            disabled={!canGoPrev() || disabled}
            title="첫 페이지"
            className="hcPaginationBtn"
          >
            ‹‹
          </Button>

          <Button
            onClick={goToPrev}
            disabled={!canGoPrev() || disabled}
            title="이전 페이지"
            className="hcPaginationBtn"
          >
            ‹
          </Button>

          {pageNumbers.map((page) => (
            <Button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={disabled}
              className="hcPaginationBtn"
              data-active={page === currentPage ? 'true' : 'false'}
            >
              {page}
            </Button>
          ))}

          <Button
            onClick={goToNext}
            disabled={!canGoNext() || disabled}
            title="다음 페이지"
            className="hcPaginationBtn"
          >
            ›
          </Button>

          <Button
            onClick={goToLast}
            disabled={!canGoNext() || disabled}
            title="마지막 페이지"
            className="hcPaginationBtn"
          >
            ››
          </Button>
        </div>

        {(showSizeChanger || showQuickJumper) && <div className="hcPaginationExtras">
        {showSizeChanger && (
          <div>
            <Select
              value={currentPageSize}
              onChange={(value) => handleSizeChange(Number(value))}
              disabled={disabled}
              options={[
                { label: '10개씩', value: 10 },
                { label: '20개씩', value: 20 },
                { label: '50개씩', value: 50 },
                { label: '100개씩', value: 100 },
              ]}
            />
          </div>
        )}

        {showQuickJumper && (
          <div className="hcPaginationQuickJumper">
            <span>페이지로 이동:</span>
            <Input
              type="number"
              defaultValue={String(currentPage)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const page = Number((e.target as HTMLInputElement).value);
                  if (page >= 1 && page <= totalPages) {
                    handlePageChange(page);
                  }
                }
              }}
              disabled={disabled}
            />
          </div>
        )}
        </div>}
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';

export const PaginationCss = _paginationCss;
