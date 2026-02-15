export const calendarCss = `
.hcCalendar {
  width: 100%;
  color: var(--color-text);
}

.hcCalendar[data-fullscreen="false"] {
  width: max-content;
}

.hcCalendarHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem;
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}

.hcCalendarNav {
  display: inline-flex;
  gap: 0.25rem;
}

.hcCalendarNavButton {
  border: 1px solid var(--color-divider);
  background: var(--color-surface);
  color: var(--color-text);
  border-radius: var(--radius-md);
  padding: 0.25rem 0.5rem;
  line-height: 1;
  cursor: pointer;
}

.hcCalendarNavButton:hover {
  background: var(--color-surface-hover);
}

.hcCalendarHeaderLabel {
  font-weight: 700;
  color: var(--color-text-heading);
}

.hcCalendarBody {
  margin-top: 0.75rem;
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-surface);
}

.hcCalendarWeekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-bottom: 1px solid var(--color-divider);
  background: var(--color-background);
}

.hcCalendarWeekday {
  padding: 0.5rem;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.hcCalendarGrid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.hcCalendarCell {
  padding: 0.25rem;
}

.hcCalendarCellButton {
  width: 100%;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  background: transparent;
  padding: 0.5rem 0;
  cursor: pointer;
  color: inherit;
}

.hcCalendarCellButton:hover {
  background: var(--color-surface-hover);
}

.hcCalendarCell[data-current-month="false"] .hcCalendarCellButton {
  color: var(--color-text-muted);
}

.hcCalendarCell[data-disabled="true"] .hcCalendarCellButton {
  cursor: not-allowed;
  opacity: 0.45;
}

.hcCalendarCell[data-disabled="true"] .hcCalendarCellButton:hover {
  background: transparent;
}

.hcCalendarCell[data-today="true"] .hcCalendarCellButton {
  border-color: var(--color-brand-primary);
}

.hcCalendarCell[data-selected="true"] .hcCalendarCellButton {
  background: var(--color-brand-primary);
  color: var(--color-text-on-primary);
  border-color: var(--color-brand-primary);
}
`;

