export const popoverCss = `
:root{
  --hc-popover-bg: var(--color-surface);
  --hc-popover-border: var(--color-border);
  --hc-popover-text: var(--color-text);
  --hc-popover-title: var(--color-text-heading);
  --hc-popover-shadow: var(--shadow-lg);
  --hc-popover-radius: var(--radius-lg);
}

.hcPopoverOverlay{
  position: absolute;
  z-index: 1000;
  min-width: 12.5rem;
}

.hcPopoverArrow{
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  background: var(--hc-popover-bg);
  border-left: var(--border-width-thin) solid var(--hc-popover-border);
  border-top: var(--border-width-thin) solid var(--hc-popover-border);
  transform: rotate(45deg);
}

.hcPopoverCard{
  background: var(--hc-popover-bg);
  border: var(--border-width-thin) solid var(--hc-popover-border);
  border-radius: var(--hc-popover-radius);
  box-shadow: var(--hc-popover-shadow);
  color: var(--hc-popover-text);
  overflow: hidden;
}

.hcPopoverTitle{
  padding: var(--spacing-tight) var(--spacing-base);
  font-weight: 600;
  color: var(--hc-popover-title);
  border-bottom: var(--border-width-thin) solid var(--hc-popover-border);
  font-size: var(--font-size-sm);
}

.hcPopoverContent{
  padding: var(--spacing-base);
  font-size: var(--font-size-sm);
  color: var(--hc-popover-text);
}
`;

