export const textareaCss = `
:root{
  --hc-textarea-bg: var(--color-surface);
  --hc-textarea-border: var(--color-border);
  --hc-textarea-text: var(--color-text);
  --hc-textarea-muted: var(--color-text-secondary);
  --hc-textarea-radius: var(--radius-md);
}

.hcTextareaWrap{
  position: relative;
  width: 100%;
}

.hcTextarea{
  width: 100%;
  border-width: var(--border-width-thin);
  border-style: solid;
  border-color: var(--hc-textarea-border);
  border-radius: var(--hc-textarea-radius);
  background: var(--hc-textarea-bg);
  color: var(--hc-textarea-text);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  //font-family: var(--font-family-nanumGothic);
  line-height: var(--line-height-normal);
}

.hcTextarea[data-disabled="true"]{
  background: transparent;
  color: var(--color-text-disabled);
  cursor: not-allowed;
}

.hcTextarea[data-disabled="false"]{
  cursor: text;
}

.hcTextarea[data-size="small"]{
  padding: var(--spacing-sm) var(--spacing-base);
  font-size: var(--font-size-sm);
  min-height: 5rem;
}

.hcTextarea[data-size="medium"]{
  padding: var(--spacing-base) var(--spacing-lg);
  font-size: var(--font-size-base);
  min-height: 6.25rem;
}

.hcTextarea[data-size="large"]{
  padding: var(--spacing-lg) var(--spacing-xl);
  font-size: var(--font-size-lg);
  min-height: 7.5rem;
}

.hcTextareaClear{
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  padding: 0;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--hc-textarea-muted);
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.hcTextareaClear:hover{
  background: var(--color-surface-hover);
  color: var(--hc-textarea-text);
}
`;

