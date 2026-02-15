export const selectCss = `
:root{
  --hc-select-radius: var(--radius-lg);
  --hc-select-border: var(--color-border);
  --hc-select-bg: var(--color-surface);
  --hc-select-bg-disabled: var(--color-background-disabled);
  --hc-select-text: var(--color-text-heading);
  --hc-select-text-muted: var(--color-text-secondary);
  --hc-select-text-disabled: var(--color-text-disabled);
  --hc-select-shadow: var(--shadow-lg);
  --hc-select-accent: var(--color-brand-primary);
}

.hcSelect{ position: relative; width: 100%; }

.hcSelectTrigger{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-tight);
  padding: 0 var(--spacing-base);
  border: var(--border-width-thin) solid var(--hc-select-border);
  border-radius: var(--hc-select-radius);
  background: var(--hc-select-bg);
  cursor: pointer;
  outline: none;
  user-select: none;
}

.hcSelect[data-disabled="true"] .hcSelectTrigger{
  background: var(--hc-select-bg-disabled);
  cursor: not-allowed;
}

.hcSelect[data-size="small"] .hcSelectTrigger{ height: 2rem; font-size: var(--font-size-sm); }
.hcSelect[data-size="medium"] .hcSelectTrigger{ height: 2.5rem; font-size: var(--font-size-md); }
.hcSelect[data-size="large"] .hcSelectTrigger{ height: 3rem; font-size: var(--font-size-lg); }

.hcSelectValue{
  min-width: 0;
  flex: 1;
  display: flex;
  align-items: center;
  gap: var(--spacing-tight);
  color: var(--hc-select-text);
}

.hcSelect[data-has-value="false"] .hcSelectValue{ color: var(--hc-select-text-muted); }
.hcSelect[data-disabled="true"] .hcSelectValue{ color: var(--hc-select-text-disabled); }

.hcSelectValueText{
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hcSelectIcons{
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--hc-select-text-muted);
}

.hcSelectClearButton{
  border: 0;
  background: transparent;
  padding: var(--spacing-xs);
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  color: var(--hc-select-text-disabled);
}

.hcSelect[data-disabled="true"] .hcSelectClearButton{ cursor: not-allowed; }

.hcSelectDropdown{
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  margin-top: var(--spacing-xs);
  padding: var(--spacing-xs) 0;
  border: var(--border-width-thin) solid var(--hc-select-border);
  border-radius: var(--hc-select-radius);
  background: var(--hc-select-bg);
  box-shadow: var(--hc-select-shadow);
  max-height: 12.5rem;
  overflow: auto;
  display: none;
}
.hcSelect[data-open="true"] .hcSelectDropdown{ display: block; }

.hcSelectSearchWrap{ padding: 0 var(--spacing-base) var(--spacing-xs); }
.hcSelectSearchInput{
  width: 100%;
  border: var(--border-width-thin) solid var(--hc-select-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-xs) var(--spacing-tight);
  background: var(--hc-select-bg);
  color: var(--hc-select-text);
  outline: none;
  font-size: var(--font-size-sm);
}

.hcSelectGroupLabel{
  padding: var(--spacing-xs) var(--spacing-base);
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--hc-select-text-muted);
}

.hcSelectOption{
  padding: var(--spacing-xs) var(--spacing-base);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-base);
  cursor: pointer;
  background: transparent;
  color: var(--hc-select-text);
}
.hcSelectOption:hover{ background: var(--color-surface-hover); }

.hcSelectOption[data-selected="true"]{
  background: var(--color-background-hover);
}
.hcSelectOption[data-disabled="true"]{
  cursor: not-allowed;
  opacity: 0.5;
  background: var(--color-background-disabled);
  color: var(--hc-select-text-disabled);
}
.hcSelectOption[data-create="true"]{
  font-weight: 500;
}

.hcSelectOptionLeft{
  min-width: 0;
  display: flex;
  align-items: center;
  gap: var(--spacing-tight);
}
.hcSelectOptionText{ min-width: 0; flex: 1; }
.hcSelectOptionLabel{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hcSelectOptionDescription{
  margin-top: 0.125rem;
  font-size: var(--font-size-xs);
  color: var(--hc-select-text-muted);
}
.hcSelectOptionCheck{
  flex-shrink: 0;
  display: inline-flex;
  color: var(--hc-select-accent);
}

@keyframes hcSpin { 0%{ transform: rotate(0deg);} 100%{ transform: rotate(360deg);} }
.hcSelectLoading{
  padding: var(--spacing-base);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-tight);
  color: var(--hc-select-text-muted);
  font-size: var(--font-size-sm);
}
.hcSelectSpinner{ display: inline-flex; animation: hcSpin 1s linear infinite; }
`;

