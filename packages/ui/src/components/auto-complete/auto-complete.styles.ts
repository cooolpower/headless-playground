export const autoCompleteCss = `
.hcAutocomplete {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  padding: 0;
}

.hcAutocomplete[data-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Dropdown/List Styles */
.hcAutocompleteDropdown {
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: var(--shadow-lg);
  margin-top: 4px;
  overflow: hidden;
}

.hcAutocompleteItem {
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: var(--color-text);
  font-size: var(--font-size-sm);
}

.hcAutocompleteItem:hover {
  background-color: var(--color-surface-hover);
}

.hcAutocompleteItem[data-active="true"] {
  background-color: var(--color-surface-active);
  color: var(--color-brand-primary);
}

`;

