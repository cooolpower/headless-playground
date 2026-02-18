export const datePickerCss = `
.hcDatePicker {
  position: relative;
  width: max-content;
  color: var(--color-text);
  font-family: inherit;
  --hc-date-picker-brand: var(--color-brand-primary);
  --hc-date-picker-brand-text: var(--color-text-on-primary);
}

.hcDatePickerInputWrapper {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.75rem;
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
}

.hcDatePickerInputWrapper:hover:not([data-disabled="true"]) {
  border-color: var(--hc-date-picker-brand);
}

.hcDatePickerInputWrapper:focus-within:not([data-disabled="true"]) {
  border-color: var(--hc-date-picker-brand);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--hc-date-picker-brand), transparent 80%);
}

.hcDatePickerInputWrapper[data-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
  background: var(--color-background);
}

.hcDatePickerInput {
  border: none;
  outline: none;
  background: transparent;
  color: inherit;
  font-size: 0.875rem;
  width: 100%;
  cursor: pointer;
  height: 100%;
}

.hcDatePickerInput:disabled {
  cursor: not-allowed;
}

/* Sizes */
.hcDatePicker[data-size="small"] .hcDatePickerInputWrapper {
  height: 2rem;
  font-size: 0.8125rem;
}
.hcDatePicker[data-size="medium"] .hcDatePickerInputWrapper {
  height: 2.5rem;
  font-size: 0.875rem;
}
.hcDatePicker[data-size="large"] .hcDatePickerInputWrapper {
  height: 3rem;
  font-size: 1rem;
}

.hcDatePickerIconButton {
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  border-radius: var(--radius-sm);
  width: 1.5rem;
  height: 1.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.2s;
}

.hcDatePickerIconButton:hover {
  color: var(--color-text);
}

.hcDatePickerPanelWrapper {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  z-index: 1000;
  animation: hcDatePickerFadeIn 0.2s ease-out;
}

@keyframes hcDatePickerFadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

.hcDatePickerCalendar {
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  width: 18rem;
  user-select: none;
}

.hcDatePickerCalendarHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border-bottom: 1px solid var(--color-divider-subtle);
}

.hcDatePickerNavButton {
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  border-radius: var(--radius-md);
  width: 1.75rem;
  height: 1.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.hcDatePickerNavButton:hover {
  background: var(--color-surface-hover);
  color: var(--color-text);
}

.hcDatePickerMonthYear {
  font-weight: 600;
  color: var(--color-text-heading);
  font-size: 0.9375rem;
}

.hcDatePickerWeekHeader {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 0.5rem 0.75rem 0.25rem;
}

.hcDatePickerWeekDay {
  text-align: center;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hcDatePickerDateGrid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 0.25rem 0.75rem 0.75rem;
}

.hcDatePickerDateCell {
  border: none;
  background: transparent;
  color: var(--color-text);
  border-radius: var(--radius-md);
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.8125rem;
  position: relative;
  transition: all 0.2s;
}

.hcDatePickerDateCell:hover:not(:disabled) {
  background: var(--color-surface-hover);
}

.hcDatePickerDateCellDisabled,
.hcDatePickerDateCell:disabled {
  color: var(--color-text-dimmed) !important;
  cursor: not-allowed;
  opacity: 0.4;
  background: transparent !important;
}

.hcDatePickerDateCellToday {
  color: var(--hc-date-picker-brand);
  font-weight: 700;
}

.hcDatePickerDateCellToday::after {
  content: '';
  position: absolute;
  bottom: 4px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--hc-date-picker-brand);
}

.hcDatePickerDateCellSelected {
  background: var(--hc-date-picker-brand) !important;
  color: var(--hc-date-picker-brand-text) !important;
  font-weight: 600;
}

.hcDatePickerDateCellSelected.hcDatePickerDateCellToday::after {
  background: var(--hc-date-picker-brand-text);
}

/* Range Picker Specific */
.hcDatePickerRangePanel {
  display: flex;
  background: var(--color-surface);
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
}

.hcDatePickerRangePanel .hcDatePickerCalendar {
  border: none;
  box-shadow: none;
}

.hcDatePickerRangePanel .hcDatePickerCalendar:first-child {
  border-right: 1px solid var(--color-divider-subtle);
}

.hcDatePickerDateCellInRange {
  background: color-mix(in srgb, var(--hc-date-picker-brand), transparent 90%);
  border-radius: 0;
}

.hcDatePickerDateCellInRange:hover {
  background: color-mix(in srgb, var(--hc-date-picker-brand), transparent 80%);
}

.hcDatePickerDateCellRangeStart {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.hcDatePickerDateCellRangeEnd {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
`;

