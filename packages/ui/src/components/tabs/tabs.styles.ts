export const tabsCss = `
:root{
  --hc-tabs-border: var(--color-border);
  --hc-tabs-text: var(--color-text-heading);
  --hc-tabs-text-muted: var(--color-text-secondary);
  --hc-tabs-bg: transparent;
  --hc-tabs-hover: var(--color-surface-hover);
  --hc-tabs-active: var(--color-background-hover);
}

.hcTabs{ display: flex; flex-direction: column; width: 100%; }
.hcTabs[data-position="left"], .hcTabs[data-position="right"]{ flex-direction: row; }

.hcTabsBar{
  display: flex;
  gap: var(--spacing-xs);
}
.hcTabs[data-position="left"] .hcTabsBar,
.hcTabs[data-position="right"] .hcTabsBar{
  flex-direction: column;
  width: 12.5rem;
  flex-shrink: 0;
}

.hcTabs[data-type="line"][data-position="top"] .hcTabsBar{ border-bottom: var(--border-width-thin) solid var(--hc-tabs-border); }
.hcTabs[data-type="line"][data-position="bottom"] .hcTabsBar{ border-top: var(--border-width-thin) solid var(--hc-tabs-border); }
.hcTabs[data-type="line"][data-position="left"] .hcTabsBar{ border-right: var(--border-width-thin) solid var(--hc-tabs-border); }
.hcTabs[data-type="line"][data-position="right"] .hcTabsBar{ border-left: var(--border-width-thin) solid var(--hc-tabs-border); }

.hcTabsTab{
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-tight);
  color: var(--hc-tabs-text);
  cursor: pointer;
  user-select: none;
}
.hcTabsTab:hover{ background: var(--hc-tabs-hover); }
.hcTabsTab[data-disabled="true"]{ cursor: not-allowed; opacity: 0.5; }

.hcTabsTabClose{
  margin-left: var(--spacing-tight);
  border: 0;
  background: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  color: inherit;
  opacity: 0.7;
}
.hcTabsTabClose:hover{ opacity: 1; }

.hcTabsContent{ flex: 1; min-width: 0; }
.hcTabsPanel{ padding: var(--spacing-loose); }

@keyframes hcSpin { 0%{ transform: rotate(0deg);} 100%{ transform: rotate(360deg);} }
.hcTabsLoading{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem;
  gap: var(--spacing-tight);
  color: var(--hc-tabs-text-muted);
  font-size: var(--font-size-sm);
}
.hcTabsSpinner{ display: inline-flex; animation: hcSpin 1s linear infinite; }
`;

