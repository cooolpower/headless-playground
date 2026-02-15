export const collapseCss = `
.hcCollapse {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.hcCollapsePanel {
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  overflow: hidden;
}

.hcCollapseHeader {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 0.875rem;
  cursor: pointer;
  user-select: none;
  background: var(--color-surface);
}

.hcCollapseHeader:hover {
  background: var(--color-surface-hover);
}

.hcCollapsePanel[data-disabled="true"] .hcCollapseHeader {
  cursor: not-allowed;
  opacity: 0.6;
}

.hcCollapseHeaderMain {
  flex: 1 1 auto;
  min-width: 0;
  font-weight: 600;
  color: var(--color-text-heading);
}

.hcCollapseExtra {
  flex: none;
  color: var(--color-text-secondary);
}

.hcCollapseArrow {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  color: var(--color-text-secondary);
  transition: transform 0.2s ease;
}

.hcCollapsePanel[data-active="true"] .hcCollapseArrow {
  transform: rotate(90deg);
}

.hcCollapseContent {
  padding: 0.75rem 0.875rem;
  border-top: 1px solid var(--color-divider);
  color: var(--color-text);
}
`;

