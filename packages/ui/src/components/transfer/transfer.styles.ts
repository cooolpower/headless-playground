export const transferCss = `
:root{
  --hc-transfer-border: var(--color-border);
  --hc-transfer-bg: var(--color-surface);
  --hc-transfer-muted: var(--color-text-secondary);
  --hc-transfer-radius: var(--radius-lg);
}

.hcTransfer{
  display: flex;
  align-items: stretch;
  gap: var(--spacing-base);
  width: 100%;
}

.hcTransferList{
  flex: 1;
  min-width: 0;
  border: var(--border-width-thin) solid var(--hc-transfer-border);
  border-radius: var(--hc-transfer-radius);
  background: var(--hc-transfer-bg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.hcTransferListHeader{
  padding: var(--spacing-sm) var(--spacing-base);
  border-bottom: var(--border-width-thin) solid var(--hc-transfer-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
}

.hcTransferListTitle{
  font-weight: 600;
  color: var(--color-text);
}

.hcTransferCount{
  margin-left: var(--spacing-tight);
  color: var(--hc-transfer-muted);
  font-size: var(--font-size-xs);
}

.hcTransferListSearch{
  padding: var(--spacing-sm) var(--spacing-base);
  border-bottom: var(--border-width-thin) solid var(--hc-transfer-border);
}

.hcTransferSearchInput{
  width: 100%;
  border: var(--border-width-thin) solid var(--hc-transfer-border);
  border-radius: var(--radius-md);
  padding: 0.375rem 0.5rem;
  background: var(--hc-transfer-bg);
  color: var(--color-text);
  font-size: var(--font-size-sm);
}

.hcTransferListBody{
  flex: 1;
  overflow: auto;
}

.hcTransferListContent{
  margin: 0;
  padding: 0;
  list-style: none;
}

.hcTransferListItem{
  padding: 0.25rem var(--spacing-base);
}

.hcTransferItemContent{
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.hcTransferItemDescription{
  font-size: var(--font-size-xs);
  color: var(--hc-transfer-muted);
}

.hcTransferOperations{
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--spacing-sm);
}

.hcTransferOperationButton{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-md);
  border: var(--border-width-thin) solid var(--hc-transfer-border);
  background: var(--hc-transfer-bg);
  cursor: pointer;
  user-select: none;
}

.hcTransferOperationButton[disabled]{
  opacity: 0.5;
  cursor: not-allowed;
}

.hcTransferOperationButtonEnabled{
  border-color: var(--color-semantic-primary);
  color: var(--color-semantic-primary);
}

.hcTransferOperationLabel{
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}
`;

