export const listCss = `
.hcList{
  background: var(--color-neutral-1000);
}

.hcList[data-bordered="true"]{
  border: var(--border-width-thin) solid var(--color-border);
  border-radius: var(--radius-lg);
}

.hcListHeader,
.hcListFooter,
.hcListLoading,
.hcListEmpty,
.hcListItem{
  padding: var(--spacing-base) var(--spacing-lg);
  font-size: var(--font-size-base);
}

.hcList[data-size="small"] .hcListHeader,
.hcList[data-size="small"] .hcListFooter,
.hcList[data-size="small"] .hcListLoading,
.hcList[data-size="small"] .hcListEmpty,
.hcList[data-size="small"] .hcListItem{
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: var(--font-size-sm);
}

.hcList[data-size="large"] .hcListHeader,
.hcList[data-size="large"] .hcListFooter,
.hcList[data-size="large"] .hcListLoading,
.hcList[data-size="large"] .hcListEmpty,
.hcList[data-size="large"] .hcListItem{
  padding: var(--spacing-lg) var(--spacing-lg);
  font-size: var(--font-size-lg);
}

.hcListHeader{
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}
.hcListFooter{
  color: var(--color-text-secondary);
}

.hcList[data-split="true"] .hcListHeader{
  border-bottom: var(--border-width-thin) solid var(--color-border);
}
.hcList[data-split="true"] .hcListFooter{
  border-top: var(--border-width-thin) solid var(--color-border);
}

.hcListUl{
  list-style: none;
  margin: 0;
  padding: 0;
}

.hcList[data-split="true"] .hcListItem{
  border-bottom: var(--border-width-thin) solid var(--color-border);
}
.hcList[data-split="true"] .hcListItem:last-child{
  border-bottom: none;
}

.hcListLoading{
  text-align: center;
  color: var(--color-text-secondary);
}

.hcListEmpty{
  text-align: center;
  color: var(--color-text-disabled);
}
`;

