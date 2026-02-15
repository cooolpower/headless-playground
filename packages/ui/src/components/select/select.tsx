'use client';

// components/headless/select/select.tsx
import { Check, ChevronDown, Loader2, X } from 'lucide-react';
import { Icon } from '../icon/icon';
import { useSelect, type SelectOption } from './use-select';
import { SelectProps } from './type-select';
import { selectCss as _selectCss } from './select.styles';

export function Select(props: SelectProps) {
  const {
    isOpen,
    containerProps,
    triggerProps,
    dropdownProps,
    searchInputProps,
    clearButtonProps,
    selectedLabel,
    filteredOptions,
    handleSelect,
    selectedValues,
    selectedOptions,
    multiple,
    loading,
  } = useSelect(props);

  const {
    className,
    placeholder = 'Select...',
    injectStyles = true,
    disabled,
    size = 'medium',
  } = props;

  const hasGroups = filteredOptions.some((o) => !!o.group);
  const groups = hasGroups
    ? Array.from(
        new Set(filteredOptions.map((o) => o.group ?? '__ungrouped__')),
      )
    : [];

  const hasValue = multiple
    ? selectedValues.length > 0
    : selectedOptions.length > 0;

  const containerRest = { ...(containerProps as any), style: undefined };
  const triggerRest = { ...(triggerProps as any), style: undefined };
  const dropdownRest = { ...(dropdownProps as any), style: undefined };

  const searchInput = searchInputProps as any;
  const clearButton = clearButtonProps as any;

  return (
    <div
      {...containerRest}
      className={className ? `hcSelect ${className}` : 'hcSelect'}
      data-open={isOpen ? 'true' : 'false'}
      data-disabled={disabled ? 'true' : 'false'}
      data-size={size}
      data-has-value={hasValue ? 'true' : 'false'}
    >
      {injectStyles ? <style suppressHydrationWarning>{_selectCss}</style> : null}
      {/* Trigger */}
      <div {...triggerRest} className="hcSelectTrigger" role="button" aria-disabled={disabled}>
        <div className="hcSelectValue">
          {!multiple && selectedOptions[0]?.iconPreview && (
            <div>{selectedOptions[0].iconPreview}</div>
          )}
          {!multiple && selectedOptions[0]?.colorPreview && (
            <div
              // colorPreview는 사용자 입력 값이므로 inline style로 전달합니다.
              style={{ backgroundColor: selectedOptions[0].colorPreview }}
            />
          )}
          <span className="hcSelectValueText">
            {selectedLabel}
          </span>
        </div>
        <div className="hcSelectIcons">
          {clearButton && (
            <button {...clearButton} type="button" className="hcSelectClearButton">
              <Icon icon={X} size="small" />
            </button>
          )}
          <Icon icon={ChevronDown} size="small" />
        </div>
      </div>

      {/* Dropdown */}
      <div {...dropdownRest} className="hcSelectDropdown" role="listbox">
        {searchInput && (
          <div className="hcSelectSearchWrap">
            <input {...searchInput} className="hcSelectSearchInput" />
          </div>
        )}

        {loading ? (
          <div className="hcSelectLoading">
            <div className="hcSelectSpinner">
              <Icon icon={Loader2} size="small" />
            </div>
            <span>로딩 중...</span>
          </div>
        ) : (
          <div>
            {(hasGroups ? groups : ['__all__']).map((groupKey) => {
              const groupLabel = groupKey === '__ungrouped__' ? '' : groupKey;
              const groupOptions =
                groupKey === '__all__'
                  ? filteredOptions
                  : filteredOptions.filter(
                      (o) => (o.group ?? '__ungrouped__') === groupKey,
                    );

              if (groupOptions.length === 0) return null;

              return (
                <div key={groupKey}>
                  {hasGroups && groupLabel && (
                    <div className="hcSelectGroupLabel">
                      {groupLabel}
                    </div>
                  )}

                  {groupOptions.map((option) => {
                    const isSelected = selectedValues.includes(option.value);
                    const isCreateOption = option.value
                      .toString()
                      .startsWith('__create__');

                    return (
                      <div
                        key={option.value}
                        onClick={() => handleSelect(option)}
                        className="hcSelectOption"
                        data-disabled={option.disabled ? 'true' : 'false'}
                        data-selected={isSelected ? 'true' : 'false'}
                        data-create={isCreateOption ? 'true' : 'false'}
                      >
                        <div className="hcSelectOptionLeft">
                          {option.colorPreview && (
                            <div
                              // colorPreview는 사용자 입력 값이므로 inline style로 전달합니다.
                              style={{ backgroundColor: option.colorPreview }}
                            />
                          )}
                          {option.iconPreview && (
                            <div>{option.iconPreview}</div>
                          )}
                          <div className="hcSelectOptionText">
                            <div className="hcSelectOptionLabel">
                              {option.label}
                            </div>
                            {option.description && (
                              <div className="hcSelectOptionDescription">
                                {option.description}
                              </div>
                            )}
                          </div>
                        </div>

                        {isSelected && (
                          <span className="hcSelectOptionCheck">
                            <Icon icon={Check} size="small" />
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export const SelectCss = _selectCss;
