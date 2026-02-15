'use client';

import React from 'react';
import { X, Plus } from 'lucide-react';
import { Icon } from '../icon/icon';
import { useDynamicInput } from './use-dynamic-input';
import { DynamicInputProps } from './type-dynamic-input';
import { Input } from '../input/input';
import { dynamicInputCss as _dynamicInputCss } from './dynamic-input.styles';

export const DynamicInputCss = _dynamicInputCss;

function cx(...parts: Array<string | undefined | null | false>) {
  return parts.filter(Boolean).join(' ');
}

export function DynamicInput(props: DynamicInputProps) {
  const {
    value,
    defaultValue,
    onChange,
    min,
    max,
    onCreate,
    onRemove,
    disabled = false,
    className,
    injectStyles = true,
    classNames,
    renderInput,
    placeholder = '입력하세요',
    size = 'medium',
  } = props;

  const {
    inputs,
    handleAddInput,
    handleRemoveInput,
    handleInputChange,
    canAdd,
    canRemove,
  } = useDynamicInput({
    value,
    defaultValue,
    onChange,
    min,
    max,
    onCreate,
    onRemove,
    disabled,
  });

  const getPlaceholder = (index: number): string => {
    if (typeof placeholder === 'function') {
      return placeholder(index);
    }
    return placeholder;
  };

  return (
    <div
      className={
        injectStyles ? cx('hcDynamicInput', className) : className || classNames?.dynamicInput
      }
      data-disabled={disabled ? 'true' : 'false'}
    >
      {injectStyles && <style suppressHydrationWarning>{_dynamicInputCss}</style>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {inputs.map((inputValue, index) => (
          <div
            key={index}
            className={injectStyles ? 'hcDynamicInputItem' : classNames?.inputItem}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {renderInput ? (
              renderInput(inputValue, index, (val) =>
                handleInputChange(index, val),
              )
            ) : (
              <Input
                type="text"
                value={inputValue}
                onChange={(val) => handleInputChange(index, val)}
                placeholder={getPlaceholder(index)}
                disabled={disabled}
                size={size}
                className={injectStyles ? 'hcDynamicInputItemInput' : classNames?.input}
                style={{ flex: 1 }}
              />
            )}
            {canRemove(index) && (
              <button
                type="button"
                onClick={() => handleRemoveInput(index)}
                disabled={disabled}
                className={injectStyles ? 'hcDynamicInputRemoveButton' : classNames?.removeButton}
                aria-label={`${index + 1}번째 입력 필드 제거`}
              >
                <Icon icon={X} size="small" />
              </button>
            )}
          </div>
        ))}
        {canAdd && (
          <button
            type="button"
            onClick={handleAddInput}
            disabled={disabled}
            className={injectStyles ? 'hcDynamicInputAddButton' : classNames?.addButton}
            aria-label="입력 필드 추가"
          >
            <Icon icon={Plus} size="small" />
            <span>추가</span>
          </button>
        )}
      </div>
    </div>
  );
}
