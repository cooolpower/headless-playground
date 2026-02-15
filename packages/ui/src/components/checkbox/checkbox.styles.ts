export const checkboxCss = `
:root{
  --hc-checkbox-border: var(--color-border);
  --hc-checkbox-bg: var(--color-surface);
  --hc-checkbox-bg-disabled: var(--color-background-disabled);
  --hc-checkbox-text: var(--color-text);
  --hc-checkbox-text-disabled: var(--color-text-disabled);
  --hc-checkbox-accent: var(--color-semantic-info);
  --hc-checkbox-radius: var(--radius-md);
}

.hcCheckbox{
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-tight);
  cursor: pointer;
}
.hcCheckbox[data-disabled="true"]{ cursor: not-allowed; }

.hcCheckboxInput{
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.hcCheckboxBox{
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: var(--border-width-medium) solid var(--hc-checkbox-border);
  border-radius: var(--hc-checkbox-radius);
  background: var(--hc-checkbox-bg);
  transition: all 0.2s;
}

.hcCheckbox[data-size="small"] .hcCheckboxBox{ width: 1rem; height: 1rem; }
.hcCheckbox[data-size="medium"] .hcCheckboxBox{ width: 1.25rem; height: 1.25rem; }
.hcCheckbox[data-size="large"] .hcCheckboxBox{ width: 1.5rem; height: 1.5rem; }

.hcCheckbox[data-checked="true"] .hcCheckboxBox,
.hcCheckbox[data-indeterminate="true"] .hcCheckboxBox{
  border-color: var(--hc-checkbox-accent);
  background: var(--hc-checkbox-accent);
}

.hcCheckbox[data-disabled="true"] .hcCheckboxBox{
  background: var(--hc-checkbox-bg-disabled);
  border-color: var(--hc-checkbox-border);
}

.hcCheckboxMark{
  color: var(--color-text-on-info);
  font-weight: 700;
  line-height: 1;
}
.hcCheckbox[data-size="small"] .hcCheckboxMark{ font-size: var(--font-size-xs); }
.hcCheckbox[data-size="medium"] .hcCheckboxMark{ font-size: var(--font-size-sm); }
.hcCheckbox[data-size="large"] .hcCheckboxMark{ font-size: var(--font-size-md); }

.hcCheckboxText{
  user-select: none;
  color: var(--hc-checkbox-text);
  font-size: var(--font-size-sm);
}
.hcCheckbox[data-disabled="true"] .hcCheckboxText{ color: var(--hc-checkbox-text-disabled); }
`;

