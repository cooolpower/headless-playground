export const tagCss = `
.hcTag{
  display: inline-flex;
  align-items: center;
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  user-select: none;
}

.hcTag[data-disabled="true"]{
  opacity: 0.5;
  cursor: not-allowed;
}

.hcTag[data-disabled="false"]{
  opacity: 1;
}

.hcTag[data-size="small"]{
  padding: 0.125rem 0.375rem;
  font-size: var(--font-size-xs);
  gap: var(--spacing-xs);
}
.hcTag[data-size="medium"]{
  padding: 0.25rem 0.5rem;
  font-size: var(--font-size-sm);
  gap: var(--spacing-sm);
}
.hcTag[data-size="large"]{
  padding: 0.375rem 0.75rem;
  font-size: var(--font-size-base);
  gap: var(--spacing-base);
}

.hcTag[data-variant="default"]{
  background: var(--color-surface);
  color: var(--color-text);
  //border: var(--border-width-thin) solid var(--color-border);
}
.hcTag[data-variant="primary"]{
  background: oklch(0.83 0.13 var(--color-info));
  color: var(--color-text-on-info);
  border: none;
}
.hcTag[data-variant="success"]{
  background: oklch(0.83 0.13 var(--color-success));
  color: var(--color-text-on-success);
  border: none;
}
.hcTag[data-variant="warning"]{
  background: oklch(0.83 0.13 var(--color-warning));
  color: var(--color-text-on-warning);
  border: none;
}
.hcTag[data-variant="error"]{
  background: oklch(0.83 0.13 var(--color-error));
  color: var(--color-text-on-error);
  border: none;
}

.hcTagClose{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.25rem;
  padding: 0;
  background: none;
  border: none;
  color: inherit;
  opacity: 0.7;
  cursor: pointer;
}

.hcTag[data-disabled="true"] .hcTagClose{
  cursor: not-allowed;
}
`;

