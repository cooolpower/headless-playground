export const cascaderCss = `
:root{
  --hc-cascader-bg: var(--color-surface);
  --hc-cascader-border: var(--color-border);
  --hc-cascader-shadow: var(--shadow-lg);
  --hc-cascader-radius: var(--radius-md);
  --hc-cascader-muted: var(--color-text-secondary);
  --hc-cascader-hover: var(--color-surface-hover);
  --hc-cascader-selected: var(--color-background-hover);
}

.hcCascader{
  position: relative;
  width: 100%;
}

.hcCascaderTrigger{
  position: relative;
  width: 100%;
  cursor: pointer;
}

.hcCascader[data-disabled="true"] .hcCascaderTrigger{
  cursor: not-allowed;
}

.hcCascaderArrow{
  position: absolute;
  right: var(--spacing-base);
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  display: inline-flex;
  align-items: center;
  color: var(--hc-cascader-muted);
}

.hcCascaderArrowIcon{
  display: inline-flex;
  transition: transform 0.2s ease;
}

.hcCascader[data-open="false"] .hcCascaderArrowIcon{
  transform: rotate(-90deg);
}

.hcCascaderPanels{
  position: absolute;
  left: 0;
  z-index: 1000;
  display: flex;
  background: var(--hc-cascader-bg);
  border: var(--border-width-thin) solid var(--hc-cascader-border);
  border-radius: var(--hc-cascader-radius);
  box-shadow: var(--hc-cascader-shadow);
  min-width: 12.5rem;
  max-height: 25rem;
  overflow: hidden;
}

.hcCascader[data-size="small"] .hcCascaderPanels{ top: calc(100% + 0.25rem); }
.hcCascader[data-size="medium"] .hcCascaderPanels{ top: calc(100% + 0.5rem); }
.hcCascader[data-size="large"] .hcCascaderPanels{ top: calc(100% + 0.75rem); }

.hcCascaderPanel{
  min-width: 12.5rem;
  max-height: 25rem;
  overflow-y: auto;
}

.hcCascaderPanel[data-bordered="true"]{
  border-right: var(--border-width-thin) solid var(--hc-cascader-border);
}

.hcCascaderOption{
  padding: var(--spacing-sm) var(--spacing-base);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
  cursor: pointer;
  background: transparent;
  color: var(--color-text);
  opacity: 1;
  transition: background-color 0.2s ease;
}

.hcCascaderOption[data-active="true"]{
  background: var(--hc-cascader-hover);
}

.hcCascaderOption[data-selected="true"]{
  background: var(--hc-cascader-selected);
  color: var(--color-semantic-info);
  font-weight: var(--font-weight-medium);
}

.hcCascaderOption[data-disabled="true"]{
  cursor: not-allowed;
  color: var(--color-text-disabled);
  opacity: 0.5;
}

.hcCascaderOption[data-disabled="false"]:not([data-selected="true"]):hover{
  background: var(--hc-cascader-hover);
}

.hcCascaderOptionMain{
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex: 1;
  min-width: 0;
}

.hcCascaderOptionLabel{
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hcCascaderNextIcon{
  display: inline-flex;
  align-items: center;
  color: var(--hc-cascader-muted);
}
`;

