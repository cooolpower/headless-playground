export const inputNumberCss = `
.hcInputNumber {
  display: inline-flex;
  align-items: stretch;
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-surface);
  color: var(--color-text);
}

.hcInputNumber[data-disabled="true"] {
  opacity: 0.6;
}

.hcInputNumberInput {
  border: none;
  outline: none;
  background: transparent;
  color: inherit;
  padding: 0 0.75rem;
  min-width: 7rem;
  font-size: inherit;
  text-align: center;
}

.hcInputNumberButton {
  border: none;
  background: var(--color-surface);
  color: inherit;
  width: 2.25rem;
  height: 2.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-align: center;
}

.hcInputNumberButton:hover {
  background: var(--color-surface-hover);
}

.hcInputNumberButton:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.hcInputNumber[data-size="small"] {
  font-size: 0.875rem;
}
.hcInputNumber[data-size="small"] .hcInputNumberInput {
  padding: 0 0.5rem;
  min-width: 6rem;
}
.hcInputNumber[data-size="small"] .hcInputNumberButton {
  width: 2rem;
}

.hcInputNumber[data-size="medium"] {
  font-size: 1rem;
}

.hcInputNumber[data-size="large"] {
  font-size: 1.125rem;
}
.hcInputNumber[data-size="large"] .hcInputNumberInput {
  padding: 0 0.875rem;
  min-width: 8rem;
}
.hcInputNumber[data-size="large"] .hcInputNumberButton {
  width: 2.5rem;
}
`;

