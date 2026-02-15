export const timePickerCss = `
.hcTimePicker {
  position: relative;
  width: max-content;
  color: var(--color-text);
}

.hcTimePickerInputWrapper {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem;
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}

.hcTimePickerInput {
  border: none;
  outline: none;
  background: transparent;
  color: inherit;
  padding: 0.5rem 0.75rem;
  min-width: 10.5rem;
  font-size: 0.875rem;
}

.hcTimePickerActions {
  display: inline-flex;
  gap: 0.25rem;
}

.hcTimePickerIconButton {
  border: none;
  background: transparent;
  color: inherit;
  border-radius: var(--radius-md);
  width: 2rem;
  height: 2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.hcTimePickerIconButton:hover:not(:disabled) {
  background: var(--color-surface-hover);
}

.hcTimePickerIconButton:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.hcTimePickerBackdrop {
  position: fixed;
  inset: 0;
  background: transparent;
  z-index: 999;
}

.hcTimePickerPanelWrapper {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  z-index: 1000;
}

.hcTimePickerPanel {
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-xl);
  background: var(--color-surface);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  padding: 0.75rem;
  min-width: 18rem;
}

.hcTimePickerPanelHeader {
  font-weight: 700;
  color: var(--color-text-heading);
  margin-bottom: 0.75rem;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.hcTimePickerPanelBody {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.hcTimePickerField {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.hcTimePickerLabel {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.hcTimePickerSelect {
  width: 100%;
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text);
  padding: 0.5rem 0.625rem;
}

.hcTimePickerPanelFooter {
  margin-top: 0.75rem;
  display: flex;
  justify-content: flex-end;
}

.hcTimePickerNowButton {
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text);
  padding: 0.5rem 0.75rem;
  cursor: pointer;
}

.hcTimePickerNowButton:hover {
  background: var(--color-surface-hover);
}
`;

