export const switchCss = `
:root{
  --hc-switch-radius: 9999px;
  --hc-switch-handle-radius: 50%;
  --hc-switch-rail: var(--color-border);
  --hc-switch-rail-active: var(--color-brand-primary);
  --hc-switch-handle-bg: var(--color-surface);
  --hc-switch-icon-on: var(--color-brand-primary);
  --hc-switch-icon-off: var(--color-text-secondary);
}

.hcSwitch{
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-tight);
  cursor: pointer;
}
.hcSwitch[data-disabled="true"]{ cursor: not-allowed; }

.hcSwitchInput{
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.hcSwitchRail{
  position: relative;
  display: inline-flex;
  align-items: center;
  border-radius: var(--hc-switch-radius);
  background: var(--hc-switch-rail);
  transition: background-color 0.2s;
  opacity: 1;
}
.hcSwitch[data-checked="true"] .hcSwitchRail{ background: var(--hc-switch-rail-active); }
.hcSwitch[data-disabled="true"] .hcSwitchRail{ opacity: 0.5; }

.hcSwitch[data-size="small"]{ --hc-switch-w: 2rem; --hc-switch-h: 1.25rem; --hc-switch-handle: 1rem; --hc-switch-tx: 0.75rem; }
.hcSwitch[data-size="medium"]{ --hc-switch-w: 2.75rem; --hc-switch-h: 1.5rem; --hc-switch-handle: 1.25rem; --hc-switch-tx: 1.25rem; }
.hcSwitch[data-size="large"]{ --hc-switch-w: 3.5rem; --hc-switch-h: 2rem; --hc-switch-handle: 1.75rem; --hc-switch-tx: 1.5rem; }

.hcSwitchRail{ width: var(--hc-switch-w); height: var(--hc-switch-h); }

.hcSwitchHandle{
  position: absolute;
  left: 0.125rem;
  width: var(--hc-switch-handle);
  height: var(--hc-switch-handle);
  border-radius: var(--hc-switch-handle-radius);
  background: var(--hc-switch-handle-bg);
  box-shadow: var(--shadow-sm);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: translateX(0);
  transition: transform 0.2s;
}
.hcSwitch[data-checked="true"] .hcSwitchHandle{
  transform: translateX(var(--hc-switch-tx));
}

.hcSwitch[data-round="false"]{
  --hc-switch-radius: var(--radius-md);
  --hc-switch-handle-radius: var(--radius-sm);
}

.hcSwitchIcon{
  color: var(--hc-switch-icon-off);
}
.hcSwitch[data-checked="true"] .hcSwitchIcon{
  color: var(--hc-switch-icon-on);
}

@keyframes hcSpin { 0%{ transform: rotate(0deg);} 100%{ transform: rotate(360deg);} }
.hcSwitch[data-loading="true"] .hcSwitchIcon{
  animation: hcSpin 1s linear infinite;
}

.hcSwitchText{
  user-select: none;
}
`;

