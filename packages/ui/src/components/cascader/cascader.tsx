'use client';

// components/headless/cascader/cascader.tsx
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Icon } from '../icon/icon';
import { Input } from '../input/input';
import { Checkbox } from '../checkbox/checkbox';
import { useCascader } from './use-cascader';
import { CascaderProps } from './type-cascader';
import { cascaderCss as _cascaderCss } from './cascader.styles';
import { cx } from '../../utils';

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

  // 실제 저장된 값인지 확인 (텍스트 하이라이트 전용)
  const isSelected = (optionValue: string | number, depth: number): boolean => {
    const stringValue = String(optionValue);
    return value.length > depth && value[depth] === stringValue;
  };

  // 현재 사용자가 탐색 중인 경로인지 확인 (체크박스 및 배경 하이라이트 전용)
  const isNavigating = (
    optionValue: string | number,
    depth: number,
  ): boolean => {
    const stringValue = String(optionValue);
    return activePath.length > depth && activePath[depth] === stringValue;
  };

  return (
    <div
      ref={cascaderRef}
      className={cx('hcCascader', className)}
      data-open={isOpen ? 'true' : 'false'}
      data-disabled={disabled ? 'true' : 'false'}
      data-size={size}
    >
      {injectStyles ? (
        <style suppressHydrationWarning>{_cascaderCss}</style>
      ) : null}
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
          <div
            className="hcCascaderPanel"
            data-bordered={activePath.length > 0 ? 'true' : 'false'}
          >
            {props.options?.map((option) => {
              const selected = isSelected(option.value, 0);
              const navigating = isNavigating(option.value, 0);
              const hasChildren = option.children && option.children.length > 0;

              return (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option, 0)}
                  className="hcCascaderOption"
                  data-selected={selected ? 'true' : 'false'}
                  data-active={navigating ? 'true' : 'false'}
                  data-disabled={option.disabled ? 'true' : 'false'}
                >
                  <div className="hcCascaderOptionMain">
                    <Checkbox
                      checked={navigating}
                      disabled={option.disabled}
                      size="small"
                      onChange={() => handleSelect(option, 0)}
                      onClick={(e: React.MouseEvent<HTMLLabelElement>) =>
                        e.stopPropagation()
                      }
                    />
                    <span className="hcCascaderOptionLabel">
                      {option.label}
                    </span>
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
                const depth = activePath.length;
                const selected = isSelected(option.value, depth);
                const navigating = isNavigating(option.value, depth);
                const hasChildren =
                  option.children && option.children.length > 0;

                return (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option, depth)}
                    className="hcCascaderOption"
                    data-selected={selected ? 'true' : 'false'}
                    data-active={navigating ? 'true' : 'false'}
                    data-disabled={option.disabled ? 'true' : 'false'}
                  >
                    <div className="hcCascaderOptionMain">
                      <Checkbox
                        checked={navigating}
                        disabled={option.disabled}
                        size="small"
                        onChange={() => handleSelect(option, depth)}
                        onClick={(e: React.MouseEvent<HTMLLabelElement>) =>
                          e.stopPropagation()
                        }
                      />
                      <span className="hcCascaderOptionLabel">
                        {option.label}
                      </span>
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
