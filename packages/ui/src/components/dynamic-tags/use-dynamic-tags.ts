'use client';

import { useState, useCallback, useMemo } from 'react';
import { DynamicTagsProps } from './type-dynamic-tags';

export interface UseDynamicTagsProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  max?: number;
  onCreate?: (tag: string) => void | boolean | Promise<void | boolean>;
  onRemove?: (tag: string, index: number) => void | boolean | Promise<void | boolean>;
  disabled?: boolean;
}

export interface UseDynamicTagsReturn {
  tags: string[];
  inputValue: string;
  setInputValue: (value: string) => void;
  handleAddTag: (tag: string) => Promise<void>;
  handleRemoveTag: (index: number) => Promise<void>;
  canAdd: boolean;
  handleInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleInputBlur: () => void;
}

export function useDynamicTags({
  value,
  defaultValue = [],
  onChange,
  max,
  onCreate,
  onRemove,
  disabled = false,
}: UseDynamicTagsProps): UseDynamicTagsReturn {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);

  const tags = isControlled ? value : internalValue;

  const [inputValue, setInputValue] = useState('');

  const canAdd = useMemo(() => {
    if (disabled) return false;
    if (max !== undefined && tags.length >= max) return false;
    return true;
  }, [disabled, max, tags.length]);

  const handleAddTag = useCallback(
    async (tag: string) => {
      if (!tag.trim() || !canAdd) return;
      if (tags.includes(tag.trim())) return;

      const shouldAdd = onCreate ? await onCreate(tag.trim()) : true;
      if (shouldAdd === false) return;

      const newTags = [...tags, tag.trim()];
      if (!isControlled) {
        setInternalValue(newTags);
      }
      onChange?.(newTags);
      setInputValue('');
    },
    [tags, canAdd, onCreate, isControlled, onChange],
  );

  const handleRemoveTag = useCallback(
    async (index: number) => {
      if (disabled) return;
      const tag = tags[index];
      const shouldRemove = onRemove ? await onRemove(tag, index) : true;
      if (shouldRemove === false) return;

      const newTags = tags.filter((_, i) => i !== index);
      if (!isControlled) {
        setInternalValue(newTags);
      }
      onChange?.(newTags);
    },
    [tags, disabled, onRemove, isControlled, onChange],
  );

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;
      if (e.key === 'Enter' && inputValue.trim()) {
        e.preventDefault();
        handleAddTag(inputValue);
      } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
        e.preventDefault();
        handleRemoveTag(tags.length - 1);
      }
    },
    [disabled, inputValue, tags, handleAddTag, handleRemoveTag],
  );

  const handleInputBlur = useCallback(() => {
    if (inputValue.trim()) {
      handleAddTag(inputValue);
    }
  }, [inputValue, handleAddTag]);

  return {
    tags,
    inputValue,
    setInputValue,
    handleAddTag,
    handleRemoveTag,
    canAdd,
    handleInputKeyDown,
    handleInputBlur,
  };
}
