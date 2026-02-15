export const buttonCss = `
.hcButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  user-select: none;
  cursor: pointer;

  border: 1px solid var(--color-divider);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text);

  padding: 0.5rem 0.875rem;
  font-size: var(--font-size-sm);
  line-height: 1;

  transition: var(--transition-button);
}

.hcButton:hover {
  background: var(--color-surface-hover);
  border-color: var(--color-border-hover);
}

.hcButton:focus-visible {
  outline: 2px solid var(--color-semantic-info);
  outline-offset: 2px;
}

.hcButton[data-disabled="true"] {
  background: var(--color-background-disabled);
  color: var(--color-text-disabled);
  border-color: var(--color-divider);
  cursor: not-allowed;
}
`;

