export const dropdownCss = `
:root{
  --hc-dropdown-bg: var(--color-surface);
  --hc-dropdown-border: var(--color-border);
  --hc-dropdown-shadow: var(--shadow-lg);
  --hc-dropdown-radius: var(--radius-md);
  --hc-dropdown-text: var(--color-text);
  --hc-dropdown-muted: var(--color-text-secondary);
}

.hcDropdown{
  position: relative;
  display: inline-block;
}

.hcDropdownTrigger{
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-tight);
  padding: var(--spacing-sm) var(--spacing-base);
  border: var(--border-width-thin) solid var(--hc-dropdown-border);
  border-radius: var(--hc-dropdown-radius);
  background: var(--hc-dropdown-bg);
  color: var(--hc-dropdown-text);
  cursor: pointer;
  user-select: none;
}

.hcDropdownTrigger[aria-disabled="true"]{
  opacity: 0.5;
  cursor: not-allowed;
}

.hcDropdownMenu{
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.25rem;
  min-width: 12.5rem;
  background: var(--hc-dropdown-bg);
  border: var(--border-width-thin) solid var(--hc-dropdown-border);
  border-radius: var(--hc-dropdown-radius);
  box-shadow: var(--hc-dropdown-shadow);
  padding: 0.25rem;
  z-index: 1000;
  display: none;
}

.hcDropdownMenu[data-open="true"]{
  display: block;
}

.hcDropdownItem{
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--spacing-tight);
  padding: var(--spacing-sm) var(--spacing-base);
  border-radius: var(--radius-sm);
  color: var(--hc-dropdown-text);
  background: transparent;
  cursor: pointer;
}

.hcDropdownItem:hover{
  background: var(--color-surface-hover);
}

.hcDropdownItem[aria-disabled="true"]{
  opacity: 0.5;
  cursor: not-allowed;
}

.hcDropdownItem[aria-disabled="true"]:hover{
  background: transparent;
}
`;

