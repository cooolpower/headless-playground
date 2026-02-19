export const buttonCss = `
.hcButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-button-icon-text, 8px);
  border-radius: 3px;
  cursor: pointer;
  font-size: var(--font-size-sm, 14px);
  font-weight: 400;
  transition: var(--transition-button, all 0.2s cubic-bezier(0.4, 0, 0.2, 1));
  user-select: none;
  padding: 0 14px;
  height: var(--spacing-2xl, 34px);
  line-height: 1;
  white-space: nowrap;
  outline: none;
  border: 1px solid transparent;
  background-color: transparent;
  color: inherit;
  position: relative;
  box-sizing: border-box;
}

.hcButton:active {
  transform: scale(0.98);
}

.hcButton[data-disabled="true"] {
  background-color: var(--color-background-disabled, #f3f3f3) !important;
  color: var(--color-text-disabled, #a0a0a0) !important;
  border-color: var(--color-divider, #e0e0e0) !important;
  cursor: not-allowed;
  transform: none !important;
}

/* Color Variables setup */
.hcButton {
  --button-hue: var(--color-success);
}
.hcButton[data-button-color="success"] { --button-hue: var(--color-success); }
.hcButton[data-button-color="warning"] { --button-hue: var(--color-warning); }
.hcButton[data-button-color="info"] { --button-hue: var(--color-info); }
.hcButton[data-button-color="error"] { --button-hue: var(--color-error); }

/* Type Variants */
.hcButton[data-button-type="primary"] {
  background-color: oklch(0.83 0.13 var(--button-hue));
  color: oklch(0.1 0.12 var(--button-hue));
  border: 1px solid var(--button-hue);
}
[data-theme="light"] .hcButton[data-button-type="primary"] {
  color: oklch(1 0 var(--button-hue));
}
.hcButton[data-button-type="primary"]:hover {
  background-color: oklch(0.86 0.11 calc(var(--button-hue) + 1.67));
}

.hcButton[data-button-type="secondary"] {
  background-color: oklch(0.83 0.13 var(--button-hue) / 0.16);
  color: oklch(0.7 0.13 var(--button-hue));
  border: 1px solid var(--button-hue);
}
.hcButton[data-button-type="secondary"]:hover {
  background-color: oklch(0.86 0.11 calc(var(--button-hue) + 0.67) / 0.07);
}

.hcButton[data-button-type="tertiary"] {
  color: oklch(0.83 0.13 var(--button-hue));
}
.hcButton[data-button-type="tertiary"]:hover {
  background-color: oklch(0.86 0.11 calc(var(--button-hue) + 0.67) / 0.17);
}

.hcButton[data-button-type="dashed"] {
  border: 1px dashed oklch(0.83 0.13 var(--button-hue));
  color: oklch(0.83 0.13 var(--button-hue));
}
.hcButton[data-button-type="dashed"]:hover {
  background-color: oklch(0.86 0.11 calc(var(--button-hue) + 0.67) / 0.07);
}

.hcButton[data-button-type="quaternary"] {
  color: oklch(0.83 0.13 var(--button-hue));
}
.hcButton[data-button-type="quaternary"]:hover {
  background-color: oklch(1 0 calc(var(--button-hue) + 0.67) / 0.10);
}

/* Size Variants */
.hcButton[data-button-size="tiny"] { height: 22px; padding: 0 8px; font-size: 12px; border-radius: 2px; }
.hcButton[data-button-size="small"] { height: 1.75rem; padding: 0 12px; font-size: 0.8125rem; border-radius: 3px; }
.hcButton[data-button-size="medium"] { height: var(--spacing-2xl, 34px); padding: 0 14px; font-size: var(--font-size-sm, 14px); border-radius: 3px; }
.hcButton[data-button-size="large"] { height: 2.25rem; padding: 0 16px; font-size: var(--font-size-sm, 14px); border-radius: 4px; }
.hcButton[data-button-size="huge"] { height: 40px; padding: 0 20px; font-size: 0.9375rem; border-radius: 4px; }

/* Loading State */
.hcButton.loading {
  opacity: 0.7;
  pointer-events: none;
}
.hcButton.loading::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  margin: auto;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: hcSpinner 0.8s linear infinite;
  inset: 0;
}

@keyframes hcSpinner {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;
