export const colorPickerCss = `
.hcColorPicker {
  display: inline-flex;
  flex-direction: column;
  gap: 0.5rem;
  width: max-content;
}

.hcColorPickerTop {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.hcColorPickerSwatch {
  width: 2rem;
  height: 2rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-divider);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
}

.hcColorPickerSwatch:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.hcColorPickerInput {
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text);
  padding: 0.5rem 0.75rem;
  min-width: 12rem;
}

.hcColorPickerInput:disabled {
  opacity: 0.6;
}

.hcColorPickerPopover {
  position: relative;
}

.hcColorPickerPalette {
  margin-top: 0.5rem;
  display: grid;
  grid-template-columns: repeat(8, 1.5rem);
  gap: 0.375rem;
  padding: 0.625rem;
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-lg);
}

.hcColorPickerChip {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-divider);
  cursor: pointer;
}

.hcColorPickerChip:hover {
  transform: translateY(-1px);
}
`;

