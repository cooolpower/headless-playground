export const inputCss = `
:root{
  --hc-input-border: var(--color-border);
  --hc-input-bg: var(--color-surface);
  --hc-input-bg-disabled: var(--color-background-disabled);
  --hc-input-text: var(--color-text);
  --hc-input-text-disabled: var(--color-text-disabled);
  --hc-input-radius: var(--radius-md);
}

.hcInputRoot{ position: relative; width: 100%; }

.hcInput{
  width: 100%;
  border: var(--border-width-thin) solid var(--hc-input-border);
  border-radius: var(--hc-input-radius);
  background: var(--hc-input-bg);
  color: var(--hc-input-text);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.hcInputRoot[data-disabled="true"] .hcInput{
  background: transparent;
  color: var(--hc-input-text-disabled);
  cursor: not-allowed;
}

.hcInputRoot[data-size="small"] .hcInput{ height: 2rem; padding: 0 var(--spacing-base); font-size: var(--font-size-sm); }
.hcInputRoot[data-size="medium"] .hcInput{ height: 2.5rem; padding: 0 var(--spacing-base); font-size: var(--font-size-md); }
.hcInputRoot[data-size="large"] .hcInput{ height: 3rem; padding: 0 calc(var(--spacing-base) + var(--spacing-tight)); font-size: var(--font-size-lg); }

.hcInputClearButton,
.hcInputPasswordToggle{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  background: transparent;
  padding: var(--spacing-xs);
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  color: var(--hc-input-text-disabled);
}

.hcInputClearButton{ right: var(--spacing-xs); }
.hcInputPasswordToggle{ right: var(--spacing-xs); }

`;

