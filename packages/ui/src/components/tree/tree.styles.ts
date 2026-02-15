export const treeCss = `
:root{
  --hc-tree-border: var(--color-border);
  --hc-tree-hover: var(--color-surface-hover);
  --hc-tree-selected: var(--color-background-hover);
  --hc-tree-muted: var(--color-text-secondary);
}

.hcTree{
  margin: 0;
  padding: 0;
  list-style: none;
}

.hcTreeNode{
  list-style: none;
}

.hcTreeNodeContent{
  display: flex;
  align-items: center;
  gap: var(--spacing-tight);
  padding: 0.25rem 0.375rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  user-select: none;
}

.hcTreeNodeContent:hover{
  background: var(--hc-tree-hover);
}

.hcTreeNodeSelected{
  background: var(--hc-tree-selected);
}

.hcTreeNodeDisabled{
  opacity: 0.5;
  cursor: not-allowed;
}

.hcTreeNodeChildren{
  margin: 0;
  padding: 0;
  list-style: none;
}

.hcTreeSwitcher{
  display: inline-flex;
  width: 1.25rem;
  justify-content: center;
}

.hcTreeSwitcherButton{
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

.hcTreeSwitcherExpanded{
  transform: rotate(90deg);
}

.hcTreeSwitcherLeaf{
  width: 0.25rem;
  height: 0.25rem;
  border-radius: 9999px;
  background: var(--hc-tree-muted);
}

.hcTreeCheckbox{
  display: inline-flex;
  align-items: center;
}

.hcTreeIcon{
  display: inline-flex;
  align-items: center;
}

.hcTreeTitle{
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
`;

