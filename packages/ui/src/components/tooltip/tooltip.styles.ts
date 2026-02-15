export const tooltipCss = `
:root{
  --hc-tooltip-bg: var(--color-neutral-200);
  --hc-tooltip-border: var(--color-border);
  --hc-tooltip-text: var(--color-text);
  --hc-tooltip-shadow: var(--shadow-lg);
  --hc-tooltip-radius: var(--radius-md);
}

.hcTooltipOverlay{
  position: absolute;
  z-index: 1000;
  max-width: 18.75rem;
}

.hcTooltipArrow{
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  background: var(--hc-tooltip-bg);
  border-left: var(--border-width-thin) solid var(--hc-tooltip-border);
  border-top: var(--border-width-thin) solid var(--hc-tooltip-border);
  transform: rotate(45deg);
}

.hcTooltipCard{
  background: var(--hc-tooltip-bg);
  border: var(--border-width-thin) solid var(--hc-tooltip-border);
  border-radius: var(--hc-tooltip-radius);
  box-shadow: var(--hc-tooltip-shadow);
  color: var(--hc-tooltip-text);
  padding: var(--spacing-sm) var(--spacing-base);
  font-size: var(--font-size-sm);
  line-height: 1.4;
}
`;

