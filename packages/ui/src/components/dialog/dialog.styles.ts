export const dialogCss = `
:root{
  --hc-dialog-bg: var(--color-surface);
  --hc-dialog-border: var(--color-border);
  --hc-dialog-shadow: var(--shadow-xl);
  --hc-dialog-radius: var(--radius-lg);
  --hc-dialog-backdrop: color-mix(in oklab, var(--color-neutral-200) 70%, transparent);
}

.hcDialogMask{
  position: fixed;
  inset: 0;
  z-index: 1000;
}

.hcDialogBackdrop{
  position: absolute;
  inset: 0;
  background: var(--hc-dialog-backdrop);
}

.hcDialogWrap{
  position: absolute;
  inset: 0;
  display: flex;
  padding: var(--spacing-2xl);
  justify-content: center;
  align-items: flex-start;
}

.hcDialogWrap[data-centered="true"]{
  align-items: center;
}

.hcDialog{
  width: var(--hc-dialog-width, 32.5rem);
  max-width: 90vw;
  max-height: 90vh;
  background: var(--hc-dialog-bg);
  border: var(--border-width-thin) solid var(--hc-dialog-border);
  border-radius: var(--hc-dialog-radius);
  box-shadow: var(--hc-dialog-shadow);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: hcDialogIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes hcDialogIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.hcDialogHeader{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-base);
  padding: var(--spacing-base) var(--spacing-2xl);
  border-bottom: var(--border-width-thin) solid var(--hc-dialog-border);
}

.hcDialogTitle{
  font-weight: 600;
  color: var(--color-text-heading, #fff);
}

.hcDialogClose{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: var(--radius-md);
  border: var(--border-width-thin) solid var(--hc-dialog-border);
  background: transparent;
  color: var(--color-text-secondary, #999);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1.25rem;
}

.hcDialogClose:hover{
  background: var(--color-surface-hover);
  color: var(--color-text-heading, #fff);
}

.hcDialogBody{
  padding: var(--spacing-2xl);
  overflow: auto;
  flex: 1;
  color: var(--color-text);
  font-size: var(--font-size-sm);
  line-height: 1.6;
}

.hcDialogFooter{
  padding: var(--spacing-base) var(--spacing-2xl);
  border-top: var(--border-width-thin) solid var(--hc-dialog-border);
  display: 'flex';
  background: color-mix(in oklab, var(--hc-dialog-bg) 95%, white 5%);
  justify-content: flex-end;
  gap: var(--spacing-sm);
}

.hcDialogFooterBtn{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.25rem;
  padding: 0 var(--spacing-lg);
  border-radius: var(--radius-md);
  border: var(--border-width-thin) solid var(--hc-dialog-border);
  background: var(--color-surface);
  color: var(--color-text-heading, #fff);
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.hcDialogFooterBtn:hover{
  background: var(--color-surface-hover);
  border-color: var(--color-brand-primary);
}

.hcDialogFooterBtn:last-child {
  background: var(--color-brand-primary);
  color: var(--color-text-on-primary, #000);
  border-color: var(--color-brand-primary);
}

.hcDialogFooterBtn:last-child:hover {
  filter: brightness(1.1);
}

.hcDialogFooterBtn[aria-disabled="true"]{
  opacity: 0.6;
  cursor: not-allowed;
}

.hcDialogSpinner{
  display: inline-block;
  margin-right: var(--spacing-tight);
  animation: hcSpin 1s linear infinite;
}

@keyframes hcSpin{
  from{ transform: rotate(0deg); }
  to{ transform: rotate(360deg); }
}
`;

