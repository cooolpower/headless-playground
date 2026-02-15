export const paginationCss = `
:root{
  --hc-pagination-gap: var(--spacing-tight);
  --hc-pagination-font: var(--font-size-sm);
  --hc-pagination-muted: var(--color-text-secondary);
  --hc-pagination-bg: var(--color-surface);
  --hc-pagination-border: var(--color-border);
  --hc-pagination-radius: var(--radius-md);
}

.hcPagination{
  display: flex;
  align-items: center;
  gap: var(--hc-pagination-gap);
  font-size: var(--hc-pagination-font);
  color: var(--color-text);
}

.hcPaginationTotal{
  margin-right: var(--spacing-tight);
  color: var(--hc-pagination-muted);
}

.hcPaginationButtons{
  display: inline-flex;
  align-items: center;
  gap: var(--hc-pagination-gap);
}

.hcPaginationBtn{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 2rem;
  padding: 0 var(--spacing-tight);
  border: var(--border-width-thin) solid var(--hc-pagination-border);
  border-radius: var(--hc-pagination-radius);
  background: var(--hc-pagination-bg);
  color: var(--color-text);
  user-select: none;
}

.hcPaginationBtn[aria-disabled="true"]{
  opacity: 0.5;
  cursor: not-allowed;
}

.hcPaginationBtn[data-active="true"]{
  border-color: var(--color-semantic-primary);
  color: var(--color-semantic-primary);
}

.hcPaginationExtras{
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-tight);
}

.hcPaginationQuickJumper{
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-tight);
  color: var(--hc-pagination-muted);
}
`;

