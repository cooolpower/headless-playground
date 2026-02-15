export const radioCss = `
.hcRadioGroup{
  display: flex;
  flex-direction: column;
  gap: var(--spacing-base);
}

.hcRadioLabel{
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  gap: var(--spacing-base);
}

.hcRadioLabel[data-disabled="true"]{
  cursor: not-allowed;
  opacity: 0.6;
}

.hcRadioInput{
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

.hcRadioCircle{
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background: var(--color-surface);
  transition: border-color 0.2s, background-color 0.2s;
  flex-shrink: 0;
}

.hcRadioCircle[data-size="small"]{ width: 1rem; height: 1rem; border: 0.125rem solid var(--color-border); }
.hcRadioCircle[data-size="medium"]{ width: 1.25rem; height: 1.25rem; border: 0.125rem solid var(--color-border); }
.hcRadioCircle[data-size="large"]{ width: 1.5rem; height: 1.5rem; border: 0.125rem solid var(--color-border); }

.hcRadioCircle[data-checked="true"]{
  border-color: var(--color-brand-primary);
}

.hcRadioCircle[data-disabled="true"]{
  background: var(--color-background-disabled);
}

.hcRadioDot{
  border-radius: 9999px;
  background: var(--color-brand-primary);
}

.hcRadioDot[data-size="small"]{ width: 0.375rem; height: 0.375rem; }
.hcRadioDot[data-size="medium"]{ width: 0.5rem; height: 0.5rem; }
.hcRadioDot[data-size="large"]{ width: 0.625rem; height: 0.625rem; }

.hcRadioText{
  user-select: none;
}
`;

