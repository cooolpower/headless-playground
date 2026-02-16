export const badgeCss = `
:root{
  --hc-badge-radius: 9999px;
  --hc-badge-font: var(--font-size-xs);
  --hc-badge-height-sm: 1rem;
  --hc-badge-height-md: 1.125rem;
  --hc-badge-height-lg: 1.25rem;
  --hc-badge-min-w-sm: 1rem;
  --hc-badge-min-w-md: 1.125rem;
  --hc-badge-min-w-lg: 1.25rem;
}

.hcBadgeContainer{
  position: relative;
  display: inline-flex;
}

.hcBadgeCount,
.hcBadgeDot{
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: var(--hc-badge-radius);
  font-weight: var(--font-weight-medium);
  font-size: var(--hc-badge-font);
  line-height: 1;
  box-sizing: border-box;
}

.hcBadgeCount.hcBadge-small{
  height: var(--hc-badge-height-sm);
  min-width: var(--hc-badge-min-w-sm);
  padding: 0 var(--spacing-2xs);
}
.hcBadgeCount.hcBadge-medium{
  height: var(--hc-badge-height-md);
  min-width: var(--hc-badge-min-w-md);
  padding: 0 var(--spacing-xs);
}
.hcBadgeCount.hcBadge-large{
  height: var(--hc-badge-height-lg);
  min-width: var(--hc-badge-min-w-lg);
  padding: 0 var(--spacing-sm);
}

.hcBadgeDot{
  width: 0.5rem;
  height: 0.5rem;
  padding: 0;
  min-width: 0;
}
.hcBadgeDot.hcBadge-small{ width: 0.375rem; height: 0.375rem; }
.hcBadgeDot.hcBadge-medium{ width: 0.5rem; height: 0.5rem; }
.hcBadgeDot.hcBadge-large{ width: 0.625rem; height: 0.625rem; }

.hcBadge-default{
  background: var(--color-text-secondary);
  color: var(--color-text-on-primary);
  border: var(--border-width-thin) solid var(--color-border);
}
.hcBadge-primary{
  background: var(--color-brand-primary);
  color: var(--color-text-on-primary);
  border: none;
}
.hcBadge-success{
  background: var(--color-semantic-success);
  color: var(--color-text-on-success);
  border: none;
}
.hcBadge-warning{
  background: var(--color-semantic-warning);
  color: var(--color-text-on-warning);
  border: none;
}
.hcBadge-danger{
  background: var(--color-semantic-error);
  color: var(--color-text-on-error);
  border: none;
}
.hcBadge-info{
  background: var(--color-semantic-info);
  color: var(--color-text-on-info);
  border: none;
}

@keyframes hcBadgePulse{
  0%{ box-shadow: 0 0 0 0 var(--color-semantic-info); }
  70%{ box-shadow: 0 0 0 0.375rem transparent; }
  100%{ box-shadow: 0 0 0 0 transparent; }
}

.hcBadgeProcessing{
  animation: hcBadgePulse 1.2s ease-out infinite;
}
`;

