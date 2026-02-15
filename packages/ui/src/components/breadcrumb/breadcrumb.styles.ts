export const breadcrumbCss = `
.hcBreadcrumbNav{
  display: block;
}

.hcBreadcrumbList{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  color: var(--color-text-secondary);
  margin: 0;
  padding: 0;
  list-style: none;
}

.hcBreadcrumbList[data-size="small"]{ font-size: var(--font-size-sm); }
.hcBreadcrumbList[data-size="medium"]{ font-size: var(--font-size-base); }
.hcBreadcrumbList[data-size="large"]{ font-size: var(--font-size-lg); }

.hcBreadcrumbLi{
  display: flex;
  align-items: center;
  font-size: inherit;
}

.hcBreadcrumbLi:first-child .hcBreadcrumbItem{
  padding-left: 0px !important;
}

.hcBreadcrumbItem{
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: background-color 0.2s, color 0.2s;
}

.hcBreadcrumbList[data-size="small"] .hcBreadcrumbItem{ padding: var(--spacing-xs) var(--spacing-sm); }
.hcBreadcrumbList[data-size="medium"] .hcBreadcrumbItem{ padding: var(--spacing-sm) var(--spacing-base); }
.hcBreadcrumbList[data-size="large"] .hcBreadcrumbItem{ padding: var(--spacing-base) var(--spacing-lg); }

.hcBreadcrumbItem[data-current="true"]{
  color: var(--color-text-heading);
  font-weight: var(--font-weight-semibold);
  cursor: default;
}

.hcBreadcrumbItem[data-clickable="true"]{
  color: var(--color-text);
  cursor: pointer;
}

.hcBreadcrumbItem[data-clickable="true"]:hover{
  background: var(--color-surface-hover);
}

.hcBreadcrumbItem[data-disabled="true"]{
  color: var(--color-text-muted);
  cursor: default;
}

.hcBreadcrumbIcon{
  margin-right: 0;
  display: inline-flex;
  align-items: center;
}

.hcBreadcrumbSep{
  margin: 0;
  color: var(--color-text-muted);
  user-select: none;
}
`;

