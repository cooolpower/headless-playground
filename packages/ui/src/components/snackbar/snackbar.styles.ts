export const snackbarCss = `
:root{
  --hc-snackbar-radius: var(--radius-md);
  --hc-snackbar-shadow: var(--shadow-lg);
  --hc-snackbar-border: var(--color-border);
  --hc-snackbar-bg: var(--color-surface);
  --hc-snackbar-text: var(--color-text);
  --hc-snackbar-accent: var(--color-brand-primary);
}

.hcSnackbar{
  position: fixed;
  display: flex;
  align-items: center;
  gap: var(--spacing-base);
  padding: var(--spacing-base);
  border: var(--border-width-thin) solid var(--hc-snackbar-border);
  border-radius: var(--hc-snackbar-radius);
  background: var(--hc-snackbar-bg);
  color: var(--hc-snackbar-text);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
  min-width: 18.75rem;
  max-width: 31.25rem;
  box-shadow: var(--hc-snackbar-shadow);
  transition: bottom 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
}

.hcSnackbarBody{
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  position: relative;
}

.hcSnackbarAction{
  flex-shrink: 0;
  margin-left: var(--spacing-tight);
}

.hcSnackbarClose{
  flex-shrink: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: var(--font-size-lg);
  color: var(--hc-snackbar-text);
  opacity: 0.7;
  padding: var(--spacing-xs);
  border-radius: var(--radius-sm);
  transition: opacity 0.2s;
}
.hcSnackbarClose:hover{ opacity: 1; }

.hcSnackbarProgressTrack{
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(var(--spacing-base) * -1);
  height: 0.1875rem;
  background: var(--hc-snackbar-border);
  border-radius: 0 0 var(--hc-snackbar-radius) var(--hc-snackbar-radius);
  overflow: hidden;
}
.hcSnackbarProgressFill{
  height: 100%;
  width: 100%;
  background: var(--hc-snackbar-accent);
  transition: width 0.05s linear;
}
`;

