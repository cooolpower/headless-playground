'use client';

import React, { forwardRef } from 'react';
import { TreeSelectProps } from './type-tree-select';
import { useTreeSelect } from './use-tree-select';
import { Tree } from '../tree/tree';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Icon } from '../icon/icon';
import { treeSelectCss as _treeSelectCss } from './tree-select.styles';

const TreeSelectComponent = forwardRef<HTMLDivElement, TreeSelectProps>(
  (
    {
      injectStyles = true,
      treeData,
      value,
      defaultValue,
      onChange,
      open,
      defaultOpen,
      onOpenChange,
      multiple = false,
      disabled = false,
      placeholder = '선택해주세요',
      defaultExpandedKeys = [],
      className,
      classNames,
      treeClassNames,
      children,
      ...props
    },
    ref
  ) => {
    const {
      selectedKeys,
      setSelectedKeys,
      isOpen,
      toggleOpen,
      close,
      wrapperRef,
      displayText,
    } = useTreeSelect({
      treeData,
      value,
      defaultValue,
      onChange,
      open,
      defaultOpen,
      onOpenChange,
      multiple,
      disabled,
      placeholder,
    });

    const rootClass =
      className || classNames?.treeselect
        ? ['hcTreeSelect', classNames?.treeselect, className]
            .filter(Boolean)
            .join(' ')
        : 'hcTreeSelect';

    const triggerClass = classNames?.trigger
      ? `hcTreeSelectTrigger ${classNames.trigger}`
      : 'hcTreeSelectTrigger';

    const triggerTextClass = classNames?.triggerText
      ? `hcTreeSelectTriggerText ${classNames.triggerText}`
      : 'hcTreeSelectTriggerText';

    const dropdownClass = classNames?.dropdown
      ? `hcTreeSelectDropdown ${classNames.dropdown}`
      : 'hcTreeSelectDropdown';

    return (
      <div ref={wrapperRef} className={rootClass}>
        {injectStyles ? (
          <style suppressHydrationWarning>{_treeSelectCss}</style>
        ) : null}
        <div ref={ref} {...props}>
          {children ? (
            <div className={classNames?.content}>{children}</div>
          ) : (
            <>
              <button
                type="button"
                className={triggerClass}
                onClick={toggleOpen}
                disabled={disabled}
                aria-expanded={isOpen}
                aria-haspopup="tree"
              >
                <span className={triggerTextClass}>{displayText}</span>
                <Icon icon={isOpen ? ChevronUp : ChevronDown} size="small" />
              </button>

              {isOpen && (
                <div className={dropdownClass} role="tree">
                  <Tree
                    treeData={treeData}
                    selectable
                    multiple={multiple}
                    selectedKeys={selectedKeys}
                    onSelect={(keys) => {
                      setSelectedKeys(keys);
                      if (!multiple && keys.length > 0) close();
                    }}
                    defaultExpandedKeys={defaultExpandedKeys}
                    injectStyles={false}
                    className="hcTreeSelectTreeRoot"
                    classNames={treeClassNames}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
);

TreeSelectComponent.displayName = 'TreeSelect';

export const TreeSelect = TreeSelectComponent;

export const TreeSelectCss = _treeSelectCss;
