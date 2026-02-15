export const toastCss = `
:root{
  --hc-toast-radius: var(--radius-md);
  --hc-toast-shadow: var(--shadow-lg);
  --hc-toast-border: var(--color-border);
  --hc-toast-bg: var(--color-surface);
  --hc-toast-text: var(--color-text);
  --hc-toast-accent: var(--color-brand-primary);
}

.hcToast{
  position: fixed;
  display: flex;
  align-items: center;
  gap: var(--spacing-base);
  padding: var(--spacing-base);
  border: var(--border-width-thin) solid var(--hc-toast-border);
  border-radius: var(--hc-toast-radius);
  background: var(--hc-toast-bg);
  color: var(--hc-toast-text);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
  min-width: 18.75rem;
  max-width: 31.25rem;
  box-shadow: var(--hc-toast-shadow);
  transition: top 0.3s ease, bottom 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
  overflow: hidden;
}

.hcToast[data-type="success"]{
  --hc-toast-bg: var(--color-semantic-success);
  --hc-toast-border: var(--color-semantic-success-hover);
  --hc-toast-text: var(--color-text-on-success);
  --hc-toast-accent: var(--color-text-on-success);
}
.hcToast[data-type="info"]{
  --hc-toast-bg: var(--color-semantic-info);
  --hc-toast-border: var(--color-semantic-info-hover);
  --hc-toast-text: var(--color-text-on-info);
  --hc-toast-accent: var(--color-text-on-info);
}
.hcToast[data-type="warning"]{
  --hc-toast-bg: var(--color-semantic-warning);
  --hc-toast-border: var(--color-semantic-warning-hover);
  --hc-toast-text: var(--color-text-on-warning);
  --hc-toast-accent: var(--color-text-on-warning);
}
.hcToast[data-type="error"]{
  --hc-toast-bg: var(--color-semantic-error);
  --hc-toast-border: var(--color-semantic-error-hover);
  --hc-toast-text: var(--color-text-on-error);
  --hc-toast-accent: var(--color-text-on-error);
}

.hcToastIcon{
  flex-shrink: 0;
  font-size: 1.25rem;
  line-height: 1;
}

.hcToastBody{
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.hcToastProgressTrack{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0.1875rem;
  background: var(--hc-toast-border);
  border-radius: 0 0 var(--hc-toast-radius) var(--hc-toast-radius);
  overflow: hidden;
}

.hcToastProgressFill{
  height: 100%;
  width: 100%;
  background: var(--hc-toast-accent);
  transition: width 0.05s linear;
}
`;

