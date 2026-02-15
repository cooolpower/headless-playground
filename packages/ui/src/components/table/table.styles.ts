export const tableCss = `
.hcTableWrap{
  position: relative;
  width: 100%;
}

.hcTable{
  width: 100%;
  border-collapse: collapse;
  border: none;
}

.hcTable[data-bordered="true"]{
  border: var(--border-width-thin) solid var(--color-border);
}

.hcTable thead{
  background: var(--color-surface);
}

.hcTable th{
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-heading);
  background: var(--color-surface);
  border-bottom: var(--border-width-medium) solid var(--color-border);
}

.hcTable td{
  border-bottom: var(--border-width-thin) solid var(--color-divider);
  color: var(--color-text);
}

.hcTable[data-size="small"] th,
.hcTable[data-size="small"] td{
  padding: var(--spacing-sm) var(--spacing-base);
  font-size: var(--font-size-sm);
  line-height: 1.4;
}
.hcTable[data-size="medium"] th,
.hcTable[data-size="medium"] td{
  padding: var(--spacing-base) var(--spacing-lg);
  font-size: var(--font-size-base);
  line-height: 1.5;
}
.hcTable[data-size="large"] th,
.hcTable[data-size="large"] td{
  padding: var(--spacing-lg) var(--spacing-xl);
  font-size: var(--font-size-lg);
  line-height: 1.6;
}

.hcTable[data-bordered="true"] th,
.hcTable[data-bordered="true"] td{
  border-right: var(--border-width-thin) solid var(--color-divider);
}
.hcTable[data-bordered="true"] th:last-child,
.hcTable[data-bordered="true"] td:last-child{
  border-right: none;
}

.hcTable[data-striped="true"] tbody tr:nth-child(even){
  background: var(--color-surface);
}

.hcTable[data-hoverable="true"] tbody tr:hover{
  background: var(--color-surface-hover);
}

.hcTableCell[data-align="left"], .hcTableHeaderCell[data-align="left"]{ text-align: left; }
.hcTableCell[data-align="center"], .hcTableHeaderCell[data-align="center"]{ text-align: center; }
.hcTableCell[data-align="right"], .hcTableHeaderCell[data-align="right"]{ text-align: right; }

.hcTableCell[data-ellipsis="true"]{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hcTableLoading{
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  background: color-mix(in oklch, var(--color-neutral-1000) 80%, transparent);
  color: var(--color-text-on-primary);
}
`;

