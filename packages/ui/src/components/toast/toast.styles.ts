export const toastCss = `
:root{
  --hc-toast-radius: var(--radius-md);
  --hc-toast-shadow: var(--shadow-lg);
  --hc-toast-border: var(--color-border);
  --hc-toast-bg: var(--color-surface);
  --hc-toast-text: var(--color-text);
  --hc-toast-accent: var(--color-brand-primary);
}

.hcToastContainer{
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  pointer-events: none;
  max-width: 100vw;
  padding: var(--spacing-base);
}

.hcToastContainer[data-placement^="top"] {
  top: 0;
  flex-direction: column;
}

.hcToastContainer[data-placement^="bottom"] {
  bottom: 0;
  flex-direction: column-reverse;
}

.hcToastContainer[data-placement$="left"] {
  left: 0;
  align-items: flex-start;
}

.hcToastContainer[data-placement$="right"] {
  right: 0;
  align-items: flex-end;
}

.hcToastContainer[data-placement="top"],
.hcToastContainer[data-placement="bottom"] {
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}

.hcToast{
  position: relative;
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
  transition: opacity 0.3s ease, transform 0.3s ease;
  overflow: hidden;
  pointer-events: auto;
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
  gap: 2px;
}

.hcToastTitle {
  font-weight: 600;
  font-size: var(--font-size-base);
  line-height: var(--line-height-tight);
}

.hcToastDescription {
  font-size: var(--font-size-sm);
  color: inherit;
  opacity: 0.9;
  white-space: pre-wrap;
  line-height: var(--line-height-relaxed);
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
}

.hcToastClose{
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  cursor: pointer;
  border: none;
  background: transparent;
  color: inherit;
  opacity: 0.6;
  border-radius: 4px;
  transition: all 0.2s;
}

.hcToastClose:hover{
  opacity: 1;
  background: rgba(0, 0, 0, 0.05);
}

.hcToast[data-type] .hcToastClose:hover{
  background: rgba(255, 255, 255, 0.2);
}
`;

