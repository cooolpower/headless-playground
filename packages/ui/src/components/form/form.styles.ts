export const formCss = `
.hcForm {
  display: flex;
  flex-direction: column;
  row-gap: var(--spacing-base);
  font-size: var(--font-size-base);
  color: var(--color-text);
}

.hcForm[data-layout="inline"] {
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: var(--spacing-sm);
}

.hcForm[data-size="small"] {
  font-size: var(--font-size-sm);
}
.hcForm[data-size="medium"] {
  font-size: var(--font-size-base);
}
.hcForm[data-size="large"] {
  font-size: var(--font-size-lg);
}

.hcFormItem {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.hcForm[data-layout="horizontal"] .hcFormItem {
  flex-direction: row;
  align-items: flex-start;
  gap: var(--spacing-lg);
}

.hcForm[data-layout="inline"] .hcFormItem {
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-sm);
}

.hcFormItemLabel {
  display: flex;
  font-weight: 500;
  color: var(--color-text-heading);
}

.hcForm[data-layout="horizontal"] .hcFormItemLabel {
  width: 120px;
  justify-content: flex-end;
  padding-top: 10px;
  text-align: right;
}

.hcForm[data-layout="inline"] .hcFormItemLabel {
  width: auto;
  justify-content: flex-start;
  padding-top: 0;
}

.hcFormItemRequiredMark {
  color: var(--color-semantic-error);
  margin-right: 4px;
}

.hcFormItemInputWrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  flex: 1;
  min-width: 0;
}

.hcFormItemControl {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-sm);
}

.hcFormItemControlInput {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.hcFormItemControlStatus {
  font-size: var(--font-size-sm);
}

.hcFormItemHelp {
  //margin-top: 6px;
  font-size: var(--font-size-xs);
  line-height: 1.5;
  color: var(--color-text-secondary);
}

.hcFormStatusText--error { color: var(--color-semantic-error); }
.hcFormStatusText--success { color: var(--color-semantic-success); }
.hcFormStatusText--warning { color: var(--color-semantic-warning); }
.hcFormStatusText--validating { color: var(--color-semantic-info); }

.hcFormStatusInput--error { border-color: var(--color-semantic-error) !important; }
.hcFormStatusInput--success { border-color: var(--color-semantic-success) !important; }
.hcFormStatusInput--warning { border-color: var(--color-semantic-warning) !important; }
.hcFormStatusInput--validating { border-color: var(--color-semantic-info) !important; }
`;

