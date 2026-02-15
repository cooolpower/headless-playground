export const dynamicInputCss = `
.hcDynamicInput {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.hcDynamicInputItem {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.hcDynamicInputItemInput {
  flex: 1;
}

.hcDynamicInputRemoveButton {
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

.hcDynamicInputRemoveButton:hover {
  background-color: var(--color-surface-hover);
  color: var(--color-text);
}

.hcDynamicInputRemoveButton:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.hcDynamicInputAddButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px;
  background: none;
  cursor: pointer;
  color: var(--color-text-secondary);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  width: fit-content;
  border: 1px solid var(--color-button-border);
}

.hcDynamicInputAddButton:hover {
  background-color: var(--color-surface-hover);
  color: var(--color-text);
}

.hcDynamicInputAddButton:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.hcDynamicInputAddButton span {
  line-height: 1;
}
`;

