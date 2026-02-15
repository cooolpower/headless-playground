'use client';

// components/headless/cascader/cascader.tsx
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Icon } from '../icon/icon';
import { Input } from '../input/input';
import { Checkbox } from '../checkbox/checkbox';
import { useCascader } from './use-cascader';
import { CascaderProps } from './type-cascader';
import { cascaderCss as _cascaderCss } from './cascader.styles';

export function Cascader(props: CascaderProps) {
  const {
    value,
    displayValue,
    isOpen,
    activePath,
    cascaderRef,
    handleToggle,
    handleSelect,
    getCurrentOptions,
    getPathLabels,
    size,
    disabled,
  } = useCascader(props);

  const {
    className,
    inputClassName,
    placeholder,
    separator,
    injectStyles = true,
  } = props;

  const currentOptions = getCurrentOptions();

  // 현재 선택된 경로 확인
  const isOptionSelected = (
    optionValue: string | number,
    depth: number,
  ): boolean => {
    if (value.length === 0) return false;

    // 1Depth에서 선택 확인
    if (depth === 0) {
      // value의 첫 번째 요소가 현재 옵션과 일치하고, 전체 경로가 완성되었는지 확인
      return value[0] === String(optionValue);
    }

    // 2Depth에서 선택 확인
    if (depth === 1) {
      // activePath의 첫 번째 요소와 value의 첫 번째 요소가 일치하고,
      // value의 두 번째 요소가 현재 옵션과 일치하는지 확인
      return (
        value.length === 2 &&
        value[0] === activePath[0] &&
        value[1] === String(optionValue)
      );
    }

    return false;
  };

  return (
    <div
      ref={cascaderRef}
      className={className ? `hcCascader ${className}` : 'hcCascader'}
      data-open={isOpen ? 'true' : 'false'}
      data-disabled={disabled ? 'true' : 'false'}
      data-size={size}
    >
      {injectStyles ? <style suppressHydrationWarning>{_cascaderCss}</style> : null}
      {/* Input Trigger */}
      <div onClick={handleToggle} className="hcCascaderTrigger">
        <Input
          value={displayValue}
          placeholder={placeholder}
          disabled={disabled}
          readonly
          size={size}
          className={inputClassName}
          inputStyle={{
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        />
        <div className="hcCascaderArrow" aria-hidden="true">
          <span className="hcCascaderArrowIcon">
            <Icon icon={isOpen ? ChevronDown : ChevronRight} size="small" />
          </span>
        </div>
      </div>

      {/* Dropdown Panels */}
      {isOpen && (
        <div className="hcCascaderPanels">
          {/* 1Depth Panel */}
          <div className="hcCascaderPanel" data-bordered={activePath.length > 0 ? 'true' : 'false'}>
            {props.options?.map((option) => {
              const isSelected = isOptionSelected(option.value, 0);
              const hasChildren = option.children && option.children.length > 0;

              return (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option, 0)}
                  className="hcCascaderOption"
                  data-selected={isSelected ? 'true' : 'false'}
                  data-disabled={option.disabled ? 'true' : 'false'}
                >
                  <div className="hcCascaderOptionMain">
                    <Checkbox
                      checked={isSelected}
                      disabled={option.disabled}
                      size="small"
                      onChange={() => {}}
                    />
                    <span className="hcCascaderOptionLabel">{option.label}</span>
                  </div>
                  {hasChildren && (
                    <span className="hcCascaderNextIcon" aria-hidden="true">
                      <Icon icon={ChevronRight} size="small" />
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* 2Depth Panel (activePath가 있을 때만 표시) */}
          {activePath.length > 0 && currentOptions.length > 0 && (
            <div className="hcCascaderPanel">
              {currentOptions.map((option) => {
                const isSelected = isOptionSelected(option.value, 1);
                const hasChildren =
                  option.children && option.children.length > 0;

                return (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option, activePath.length)}
                    className="hcCascaderOption"
                    data-selected={isSelected ? 'true' : 'false'}
                    data-disabled={option.disabled ? 'true' : 'false'}
                  >
                    <div className="hcCascaderOptionMain">
                      <Checkbox
                        checked={isSelected}
                        disabled={option.disabled}
                        size="small"
                        onChange={() => {}}
                      />
                      <span className="hcCascaderOptionLabel">{option.label}</span>
                    </div>
                    {hasChildren && (
                      <span className="hcCascaderNextIcon" aria-hidden="true">
                        <Icon icon={ChevronRight} size="small" />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export const CascaderCss = _cascaderCss;
