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

.badge-container{
  position: relative;
  display: inline-flex;
}

.badge-count,
.badge-dot{
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

.badge-count.badge-small{
  height: var(--hc-badge-height-sm);
  min-width: var(--hc-badge-min-w-sm);
  padding: 0 var(--spacing-2xs);
}
.badge-count.badge-medium{
  height: var(--hc-badge-height-md);
  min-width: var(--hc-badge-min-w-md);
  padding: 0 var(--spacing-xs);
}
.badge-count.badge-large{
  height: var(--hc-badge-height-lg);
  min-width: var(--hc-badge-min-w-lg);
  padding: 0 var(--spacing-sm);
}

.badge-dot{
  width: 0.5rem;
  height: 0.5rem;
  padding: 0;
  min-width: 0;
}
.badge-dot.badge-small{ width: 0.375rem; height: 0.375rem; }
.badge-dot.badge-medium{ width: 0.5rem; height: 0.5rem; }
.badge-dot.badge-large{ width: 0.625rem; height: 0.625rem; }

.badge-default{
  background: var(--color-text-secondary);
  color: var(--color-text-on-primary);
  border: var(--border-width-thin) solid var(--color-border);
}
.badge-primary{
  background: var(--color-brand-primary);
  color: var(--color-text-on-primary);
  border: none;
}
.badge-success{
  background: var(--color-semantic-success);
  color: var(--color-text-on-success);
  border: none;
}
.badge-warning{
  background: var(--color-semantic-warning);
  color: var(--color-text-on-warning);
  border: none;
}
.badge-danger{
  background: var(--color-semantic-error);
  color: var(--color-text-on-error);
  border: none;
}
.badge-info{
  background: var(--color-semantic-info);
  color: var(--color-text-on-info);
  border: none;
}

@keyframes hcBadgePulse{
  0%{ box-shadow: 0 0 0 0 var(--color-semantic-info); }
  70%{ box-shadow: 0 0 0 0.375rem transparent; }
  100%{ box-shadow: 0 0 0 0 transparent; }
}

.badge-processing{
  animation: hcBadgePulse 1.2s ease-out infinite;
}
`;

