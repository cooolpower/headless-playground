export const datePickerCss = `
.hcDatePicker {
  position: relative;
  width: max-content;
  color: var(--color-text);
}

.hcDatePickerInputWrapper {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem;
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}

.hcDatePickerInputWrapper[data-disabled="true"] {
  opacity: 0.6;
  cursor: not-allowed;
}

.hcDatePickerInput {
  border: none;
  outline: none;
  background: transparent;
  color: inherit;
  padding: 0.5rem 0.75rem;
  min-width: 10.5rem;
  font-size: 0.875rem;
}

.hcDatePickerIconButton {
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

.hcDatePickerIconButton:hover {
  background: var(--color-surface-hover);
}

.hcDatePickerPanelWrapper {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  z-index: 1000;
}

.hcDatePickerCalendar {
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-xl);
  background: var(--color-surface);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  width: 18.5rem;
}

.hcDatePickerCalendarHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.75rem;
  border-bottom: 1px solid var(--color-divider);
  background: var(--color-background);
}

.hcDatePickerNavButton {
  border: 1px solid var(--color-divider);
  background: var(--color-surface);
  color: var(--color-text);
  border-radius: var(--radius-md);
  width: 2rem;
  height: 2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.hcDatePickerNavButton:hover {
  background: var(--color-surface-hover);
}

.hcDatePickerMonthYear {
  font-weight: 700;
  color: var(--color-text-heading);
  font-size: 0.875rem;
}

.hcDatePickerWeekHeader {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 0.5rem 0.5rem 0.25rem;
}

.hcDatePickerWeekDay {
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.hcDatePickerDateGrid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
  padding: 0.5rem;
}

.hcDatePickerDateCell {
  border: none;
  background: transparent;
  color: inherit;
  border-radius: var(--radius-md);
  padding: 0.5rem 0;
  cursor: pointer;
  font-size: 0.875rem;
}

.hcDatePickerDateCell:hover:not(:disabled) {
  background: var(--color-surface-hover);
}

.hcDatePickerDateCell:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.hcDatePickerDateCellToday {
  outline: 1px solid var(--color-brand-primary);
  outline-offset: -1px;
}

.hcDatePickerDateCellSelected {
  background: var(--color-brand-primary);
  color: var(--color-text-on-primary);
}

/* Range (single input range picker) */
.hcDatePickerRangePanel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  padding: 0.75rem;
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-xl);
  background: var(--color-surface);
  box-shadow: var(--shadow-xl);
}

.hcDatePickerDateCellInRange {
  background: var(--color-surface-hover);
}

.hcDatePickerDateCellRangeStart {
  background: var(--color-brand-primary);
  color: var(--color-text-on-primary);
}

.hcDatePickerDateCellRangeEnd {
  background: var(--color-brand-primary);
  color: var(--color-text-on-primary);
}
`;

