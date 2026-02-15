export const floatButtonCss = `
.hcFloatButton {
  position: absolute;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  box-shadow: var(--shadow-lg);
}

.hcFloatButton[data-show="false"] {
  display: none;
}

.hcFloatButton[data-disabled="true"],
.hcFloatButton[data-loading="true"] {
  cursor: not-allowed;
}

.hcFloatButton:not([data-disabled="true"]):not([data-loading="true"]):hover {
  transform: scale(1.1);
  box-shadow: var(--shadow-xl);
}

.hcFloatButton[data-in-group="true"] {
  position: static;
  transform: none;
}

.hcFloatButton[data-position="bottom-center"] {
  left: 50%;
  transform: translateX(-50%);
}

.hcFloatButton[data-position="bottom-center"]:not([data-disabled="true"]):not([data-loading="true"]):hover {
  transform: translateX(-50%) scale(1.1);
}

.hcFloatButton[data-size="small"] {
  width: 2.5rem; /* 40px */
  height: 2.5rem;
  font-size: 1rem; /* 16px */
}

.hcFloatButton[data-size="medium"] {
  width: 3.5rem; /* 56px */
  height: 3.5rem;
  font-size: 1.25rem; /* 20px */
}

.hcFloatButton[data-size="large"] {
  width: 4.5rem; /* 72px */
  height: 4.5rem;
  font-size: 1.5rem; /* 24px */
}

.hcFloatButton[data-shape="circle"] {
  border-radius: 50%;
}

.hcFloatButton[data-shape="square"] {
  border-radius: 0.5rem; /* 8px */
}

.hcFloatButton[data-type="default"] {
  background-color: var(--color-surface-hover);
  color: var(--color-text);
}

.hcFloatButton[data-type="primary"] {
  background-color: var(--color-semantic-info);
  color: var(--color-neutral-1000);
}

.hcFloatButton[data-type="info"] {
  background-color: var(--color-semantic-info);
  color: var(--color-neutral-1000);
}

.hcFloatButton[data-type="success"] {
  background-color: var(--color-semantic-success);
  color: var(--color-neutral-1000);
}

.hcFloatButton[data-type="warning"] {
  background-color: var(--color-semantic-warning);
  color: var(--color-neutral-1000);
}

.hcFloatButton[data-type="error"] {
  background-color: var(--color-semantic-error);
  color: var(--color-neutral-1000);
}

.hcFloatButton[data-disabled="true"] {
  background-color: var(--color-text-muted);
  color: var(--color-text-disabled);
}

.hcFloatButton[data-loading="true"] {
  opacity: 0.6;
}

.hcFloatButtonGroup {
  position: absolute;
  display: flex;
  z-index: 1000;
  bottom: 1.25rem; /* 20px */
  right: 1.25rem;
  gap: var(--hc-fb-group-gap, 1rem);
}

.hcFloatButtonGroup[data-direction="row"] {
  flex-direction: row;
}

.hcFloatButtonGroup[data-direction="column"] {
  flex-direction: column;
}
`;

