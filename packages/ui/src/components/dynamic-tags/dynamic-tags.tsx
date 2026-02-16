'use client';

import React from 'react';
import { X, Plus } from 'lucide-react';
import { Icon } from '../icon/icon';
import { Tag } from '../tag/tag';
import { useDynamicTags } from './use-dynamic-tags';
import { DynamicTagsProps } from './type-dynamic-tags';
import { Input } from '../input/input';
import { dynamicTagsCss as _dynamicTagsCss } from './dynamic-tags.styles';

export const DynamicTagsCss = _dynamicTagsCss;

import { cx } from '../../utils';

export function DynamicTags(props: DynamicTagsProps) {
  const {
    value,
    defaultValue,
    onChange,
    max,
    onCreate,
    onRemove,
    disabled = false,
    className,
    injectStyles = true,
    classNames,
    renderTag,
    placeholder = '태그를 입력하세요',
    size = 'medium',
  } = props;

  const {
    tags,
    inputValue,
    setInputValue,
    handleAddTag,
    handleRemoveTag,
    canAdd,
    handleInputKeyDown,
    handleInputBlur,
  } = useDynamicTags({
    value,
    defaultValue,
    onChange,
    max,
    onCreate,
    onRemove,
    disabled,
  });

  const sizeStyles = {
    custom: {},
    small: { minHeight: '32px', maxHeight: '32px', fontSize: '12px' },
    medium: { minHeight: '40px', maxHeight: '40px', fontSize: '14px' },
    large: { minHeight: '48px', maxHeight: '48px', fontSize: '16px' },
  };

  return (
    <div
      className={cx('hcDynamicTags', className, classNames?.dynamicTags)}
      data-disabled={disabled ? 'true' : 'false'}
    >
      {injectStyles && (
        <style suppressHydrationWarning>{_dynamicTagsCss}</style>
      )}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          alignItems: 'center',
        }}
      >
        {tags.map((tag, index) => (
          <div
            key={`${tag}-${index}`}
            className={cx('hcDynamicTagsTag', classNames?.tag)}
            style={sizeStyles[size]}
          >
            {renderTag ? (
              renderTag(tag, index)
            ) : (
              <Tag
                onClose={disabled ? undefined : () => handleRemoveTag(index)}
                closable={!disabled}
              >
                {tag}
                {!disabled && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveTag(index);
                    }}
                    style={{
                      marginLeft: '4px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '0',
                    }}
                    aria-label={`${tag} 태그 제거`}
                  >
                    <Icon icon={X} size="small" />
                  </button>
                )}
              </Tag>
            )}
          </div>
        ))}
        {canAdd && (
          <div
            className={
              injectStyles ? 'hcDynamicTagsTagInput' : classNames?.tagInput
            }
            style={{ display: 'inline-flex' }}
          >
            <Input
              type="text"
              value={inputValue}
              onChange={(val) => setInputValue(val)}
              onKeyDown={handleInputKeyDown}
              onBlur={handleInputBlur}
              placeholder={placeholder}
              disabled={disabled}
              size={size}
              className={cx('hcDynamicTagsTagInput', classNames?.tagInput)}
              style={{
                width: '120px',
                height: '34px',
                ...sizeStyles[size],
              }}
            />
          </div>
        )}
        {canAdd && (
          <button
            type="button"
            onClick={() => {
              if (inputValue.trim()) {
                handleAddTag(inputValue);
              }
            }}
            disabled={disabled || !inputValue.trim()}
            className={cx('hcDynamicTagsAddButton', classNames?.addButton)}
            style={{
              border: injectStyles ? undefined : 'none',
              background: injectStyles ? undefined : 'none',
            }}
            aria-label="태그 추가"
          >
            <Icon icon={Plus} size="small" />
          </button>
        )}
      </div>
    </div>
  );
}
