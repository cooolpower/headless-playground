export const stepsCss = `
.hcSteps {
  display: flex;
  gap: 1rem;
  width: 100%;
}

.hcSteps[data-direction="vertical"] {
  flex-direction: column;
  gap: 0.75rem;
}

.hcStep {
  display: flex;
  align-items: flex-start;
  position: relative;
}

.hcSteps[data-direction="horizontal"] .hcStep {
  flex: 1 1 0%;
}

.hcStepMain {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.hcStepIcon {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid var(--color-divider);
  background: var(--color-surface);
  color: var(--color-text);
  font-weight: 700;
  line-height: 1;
  padding: 0;
}

.hcStepIcon:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.hcStepIcon:not(:disabled) {
  cursor: pointer;
}

.hcStepContent {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  padding-top: 0.125rem;
}

.hcStepTitle {
  font-weight: 600;
  color: var(--color-text-heading);
}

.hcStepDescription {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  line-height: 1.4;
}

.hcStepTail {
  position: absolute;
  background: var(--color-divider);
}

/* Horizontal tail */
.hcSteps[data-direction="horizontal"] .hcStepTail {
  top: 0.875rem;
  left: calc(var(--hc-step-icon-size, 2rem) + 0.75rem);
  right: -1rem;
  height: 1px;
}

/* Vertical tail */
.hcSteps[data-direction="vertical"] .hcStepTail {
  left: calc(var(--hc-step-icon-size, 2rem) / 2 - 0.5px);
  top: calc(var(--hc-step-icon-size, 2rem) + 0.5rem);
  bottom: -0.75rem;
  width: 1px;
}

/* Sizes */
.hcSteps[data-size="small"] {
  --hc-step-icon-size: 1.75rem;
  font-size: 0.875rem;
}
.hcSteps[data-size="medium"] {
  --hc-step-icon-size: 2rem;
  font-size: 1rem;
}
.hcSteps[data-size="large"] {
  --hc-step-icon-size: 2.5rem;
  font-size: 1.125rem;
}
.hcSteps .hcStepIcon {
  width: var(--hc-step-icon-size, 2rem);
  height: var(--hc-step-icon-size, 2rem);
  font-size: calc(var(--hc-step-icon-size, 2rem) * 0.5);
}

/* Status */
.hcStep[data-status="finish"] .hcStepIcon {
  background: var(--color-semantic-success);
  border-color: var(--color-semantic-success);
  color: var(--color-text-on-success);
}

.hcStep[data-status="process"] .hcStepIcon {
  background: var(--color-brand-primary);
  border-color: var(--color-brand-primary);
  color: var(--color-text-on-primary);
}

.hcStep[data-status="error"] .hcStepIcon {
  background: var(--color-semantic-error);
  border-color: var(--color-semantic-error);
  color: var(--color-text-on-error);
}

.hcStep[data-disabled="true"] .hcStepTitle,
.hcStep[data-disabled="true"] .hcStepDescription {
  color: var(--color-text-disabled);
}
`;

