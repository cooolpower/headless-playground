export const treeSelectCss = `
:root{
  --hc-tree-select-bg: var(--color-surface);
  --hc-tree-select-border: var(--color-border);
  --hc-tree-select-radius: var(--radius-md);
  --hc-tree-select-shadow: var(--shadow-lg);
  --hc-tree-select-muted: var(--color-text-secondary);
}

.hcTreeSelect{
  position: relative;
  width: 100%;
  max-width: 25rem;
}

.hcTreeSelectTrigger{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-base);
  border: var(--border-width-thin) solid var(--hc-tree-select-border);
  border-radius: var(--hc-tree-select-radius);
  background: var(--hc-tree-select-bg);
  color: var(--color-text);
  font-size: var(--font-size-sm);
  cursor: pointer;
  user-select: none;
}

.hcTreeSelectTrigger:disabled{
  opacity: 0.6;
  cursor: not-allowed;
}

.hcTreeSelectTriggerText{
  flex: 1;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hcTreeSelectCount{
  color: var(--hc-tree-select-muted);
  margin-left: var(--spacing-tight);
}

.hcTreeSelectDropdown{
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: var(--spacing-xs);
  padding: var(--spacing-sm);
  border: var(--border-width-thin) solid var(--hc-tree-select-border);
  border-radius: var(--hc-tree-select-radius);
  background: var(--hc-tree-select-bg);
  box-shadow: var(--hc-tree-select-shadow);
  z-index: 1000;
  max-height: 18.75rem;
  overflow: auto;
}

/* Minimal default Tree styling within TreeSelect */
.hcTreeSelectTreeRoot{
  margin: 0;
  padding: 0;
  list-style: none;
}

.hcTreeSelectTreeRoot li{
  list-style: none;
}

.hcTreeSelectTreeRoot [role="treeitem"]{
  display: flex;
  align-items: center;
  gap: var(--spacing-tight);
  padding: 0.25rem 0.375rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.hcTreeSelectTreeRoot [role="treeitem"]:hover{
  background: var(--color-surface-hover);
}

.hcTreeSelectTreeRoot [role="treeitem"][aria-selected="true"]{
  background: var(--color-background-hover);
}

.hcTreeSelectTreeRoot [role="treeitem"][aria-disabled="true"]{
  opacity: 0.5;
  cursor: not-allowed;
}

.hcTreeSelectTreeRoot button{
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}
`;

