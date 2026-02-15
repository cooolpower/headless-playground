'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { TransferProps, TransferClassNames } from './type-transfer';
import { useTransfer } from './use-transfer';
import { Checkbox } from '../checkbox/checkbox';
import { Icon } from '../icon/icon';
import { transferCss as _transferCss } from './transfer.styles';

interface TransferListProps {
  title: React.ReactNode;
  data: any[];
  selectedKeys: string[];
  onSelectChange: (selectedKeys: string[]) => void;
  onSelectAll: (selected: boolean) => void;
  onScroll?: (
    direction: 'left' | 'right',
    e: React.UIEvent<HTMLUListElement>,
  ) => void;
  showSearch?: boolean;
  filterOption?: (inputValue: string, item: any) => boolean;
  render?: (item: any) => React.ReactNode;
  disabled?: boolean;
  showSelectAll?: boolean;
  classNames?: TransferClassNames;
}

function TransferList({
  title,
  data,
  selectedKeys,
  onSelectChange,
  onSelectAll,
  onScroll,
  showSearch = false,
  filterOption,
  render,
  disabled = false,
  showSelectAll = true,
  classNames,
}: TransferListProps) {
  const [searchValue, setSearchValue] = useState('');

  const filteredData =
    showSearch && filterOption && searchValue
      ? data.filter((item) => filterOption(searchValue, item))
      : data;

  const selectableData = filteredData.filter((item) => !item.disabled);
  const allSelected =
    selectableData.length > 0 &&
    selectableData.every((item) => selectedKeys.includes(String(item.key)));
  const indeterminate =
    selectableData.some((item) => selectedKeys.includes(String(item.key))) &&
    !allSelected;

  const handleItemSelect = (key: string, checked: boolean) => {
    const newSelectedKeys = checked
      ? [...selectedKeys, key]
      : selectedKeys.filter((k) => k !== key);
    onSelectChange(newSelectedKeys);
  };

  return (
    <div className={classNames?.transferList ?? 'hcTransferList'}>
      <div className={classNames?.transferListHeader ?? 'hcTransferListHeader'}>
        {showSelectAll && (
          <Checkbox
            checked={allSelected}
            indeterminate={indeterminate}
            onChange={(checked) => onSelectAll(checked)}
            disabled={disabled || selectableData.length === 0}
            className={classNames?.checkboxLabel}
          >
            <span className={classNames?.transferListTitle ?? 'hcTransferListTitle'}>{title}</span>
            <span className={classNames?.count ?? 'hcTransferCount'}>
              ({selectedKeys.length}/{filteredData.length})
            </span>
          </Checkbox>
        )}
        {!showSelectAll && (
          <div className={classNames?.transferListTitle ?? 'hcTransferListTitle'}>{title}</div>
        )}
      </div>

      {showSearch && (
        <div className={classNames?.transferListSearch ?? 'hcTransferListSearch'}>
          <input
            type="text"
            placeholder="검색..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={classNames?.searchInput ?? 'hcTransferSearchInput'}
          />
        </div>
      )}

      <div className={classNames?.transferListBody ?? 'hcTransferListBody'}>
        <ul
          className={classNames?.transferListContent ?? 'hcTransferListContent'}
          onScroll={onScroll ? (e) => onScroll('left', e) : undefined}
        >
          {filteredData.map((item) => {
            const key = String(item.key);
            const isSelected = selectedKeys.includes(key);
            const isDisabled = item.disabled || disabled;

            return (
              <li key={key} className={classNames?.transferListItem ?? 'hcTransferListItem'}>
                <Checkbox
                  checked={isSelected}
                  onChange={(checked) => handleItemSelect(key, checked)}
                  disabled={isDisabled}
                  className={classNames?.checkboxLabel}
                >
                  <span className={classNames?.itemLabel}>
                    {render ? (
                      render(item)
                    ) : (
                      <div className={classNames?.itemContent ?? 'hcTransferItemContent'}>
                        <div>{item.title}</div>
                        {item.description && (
                          <div className={classNames?.itemDescription ?? 'hcTransferItemDescription'}>
                            {item.description}
                          </div>
                        )}
                      </div>
                    )}
                  </span>
                </Checkbox>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export const Transfer = React.forwardRef<HTMLDivElement, TransferProps>(
  (
    {
      injectStyles = true,
      dataSource,
      targetKeys,
      selectedKeys,
      onChange,
      onSelectChange,
      onScroll,
      titles = ['Source', 'Target'],
      operations,
      showSearch = false,
      filterOption,
      render,
      disabled = false,
      showSelectAll = true,
      className,
      classNames,
      ...divProps
    },
    ref,
  ) => {
    const {
      sourceData,
      targetData,
      sourceSelectedKeys,
      targetSelectedKeys,
      handleSelectChange,
      handleTransfer,
      handleSelectAll,
      canTransfer,
    } = useTransfer({
      dataSource,
      targetKeys,
      selectedKeys,
      onChange,
      onSelectChange,
      disabled,
    });

    const mergedClassNames: TransferClassNames = {
      transfer: classNames?.transfer ?? 'hcTransfer',
      transferList: classNames?.transferList ?? 'hcTransferList',
      transferListHeader: classNames?.transferListHeader ?? 'hcTransferListHeader',
      transferListTitle: classNames?.transferListTitle ?? 'hcTransferListTitle',
      transferListSearch: classNames?.transferListSearch ?? 'hcTransferListSearch',
      searchInput: classNames?.searchInput ?? 'hcTransferSearchInput',
      transferListBody: classNames?.transferListBody ?? 'hcTransferListBody',
      transferListContent: classNames?.transferListContent ?? 'hcTransferListContent',
      transferListItem: classNames?.transferListItem ?? 'hcTransferListItem',
      checkboxLabel: classNames?.checkboxLabel,
      itemLabel: classNames?.itemLabel,
      itemContent: classNames?.itemContent ?? 'hcTransferItemContent',
      itemDescription: classNames?.itemDescription ?? 'hcTransferItemDescription',
      count: classNames?.count ?? 'hcTransferCount',
      transferOperations: classNames?.transferOperations ?? 'hcTransferOperations',
      operationButton: classNames?.operationButton ?? 'hcTransferOperationButton',
      operationButtonEnabled:
        classNames?.operationButtonEnabled ?? 'hcTransferOperationButtonEnabled',
    };

    return (
      <div
        ref={ref}
        className={
          className
            ? `${mergedClassNames.transfer ?? 'hcTransfer'} ${className}`
            : mergedClassNames.transfer ?? 'hcTransfer'
        }
        {...divProps}
      >
        {injectStyles ? <style suppressHydrationWarning>{_transferCss}</style> : null}
        <TransferList
          title={titles[0]}
          data={sourceData}
          selectedKeys={sourceSelectedKeys}
          onSelectChange={(keys) => handleSelectChange('left', keys)}
          onSelectAll={(selected) => handleSelectAll('left', selected)}
          onScroll={(direction, e) => onScroll?.(direction, e)}
          showSearch={showSearch}
          filterOption={filterOption}
          render={render}
          disabled={disabled}
          showSelectAll={showSelectAll}
          classNames={mergedClassNames}
        />

        <div className={mergedClassNames.transferOperations}>
          <button
            onClick={() => handleTransfer('right')}
            disabled={!canTransfer('right')}
            title={operations?.[0]?.replace(/→/g, '')?.trim() || '오른쪽으로 이동'}
            className={`${mergedClassNames.operationButton || ''} ${
              canTransfer('right')
                ? mergedClassNames.operationButtonEnabled || ''
                : ''
            }`.trim()}
          >
            {operations?.[0] ? (
              <span className="hcTransferOperationLabel">
                {operations[0].replace(/→/g, '').trim()}
                {operations[0].includes('→') && <Icon icon={ChevronRight} size="small" />}
              </span>
            ) : (
              <Icon icon={ChevronRight} size="small" />
            )}
          </button>
          <button
            onClick={() => handleTransfer('left')}
            disabled={!canTransfer('left')}
            title={operations?.[1]?.replace(/←/g, '')?.trim() || '왼쪽으로 이동'}
            className={`${mergedClassNames.operationButton || ''} ${
              canTransfer('left')
                ? mergedClassNames.operationButtonEnabled || ''
                : ''
            }`.trim()}
          >
            {operations?.[1] ? (
              <span className="hcTransferOperationLabel">
                {operations[1].includes('←') && <Icon icon={ChevronLeft} size="small" />}
                {operations[1].replace(/←/g, '').trim()}
              </span>
            ) : (
              <Icon icon={ChevronLeft} size="small" />
            )}
          </button>
        </div>

        <TransferList
          title={titles[1]}
          data={targetData}
          selectedKeys={targetSelectedKeys}
          onSelectChange={(keys) => handleSelectChange('right', keys)}
          onSelectAll={(selected) => handleSelectAll('right', selected)}
          onScroll={(direction, e) => onScroll?.(direction, e)}
          showSearch={showSearch}
          filterOption={filterOption}
          render={render}
          disabled={disabled}
          showSelectAll={showSelectAll}
          classNames={mergedClassNames}
        />
      </div>
    );
  },
);

Transfer.displayName = 'Transfer';

export const TransferCss = _transferCss;
