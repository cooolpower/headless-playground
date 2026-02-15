export const dynamicTagsCss = `
.hcDynamicTags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  align-items: center;
}

.hcDynamicTagsTag {
  display: inline-flex;
  border: 1px solid var(--color-button-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--color-surface);
  color: var(--color-text);
  font-size: var(--font-size-sm);
  font-weight: 500;
  line-height: 1;
  height: fit-content;
}

.hcDynamicTagsTagInput {
  display: inline-flex;
  min-width: 120px;
}

.hcDynamicTagsTagInput input {
  height: 34px;
  padding: 0 var(--spacing-sm);
}

.hcDynamicTagsAddButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary);
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
}

.hcDynamicTagsAddButton:hover {
  background-color: var(--color-surface-hover);
  color: var(--color-text);
}

.hcDynamicTagsAddButton:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
`;

