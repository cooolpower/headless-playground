export const modalCss = `
:root{
  --hc-modal-radius: var(--radius-xl);
  --hc-modal-shadow: var(--shadow-xl);
  --hc-modal-border: var(--color-border);
  --hc-modal-bg: var(--color-surface);
  --hc-modal-text: var(--color-text);
  --hc-modal-text-heading: var(--color-text-heading);
  --hc-modal-backdrop: var(--color-background);
  --hc-modal-width: 32.5rem;
}

@keyframes hcModalFadeIn { 0%{ opacity: 0; } 100%{ opacity: 0.45; } }
@keyframes hcModalSlideIn { 0%{ transform: translateY(-8px); opacity: 0; } 100%{ transform: translateY(0); opacity: 1; } }

.hcModalMask{
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  padding: 6.25rem var(--spacing-loose) var(--spacing-loose);
}
.hcModalMask[data-centered="true"]{
  align-items: center;
  padding: var(--spacing-loose);
}
.hcModalBackdrop{
  position: absolute;
  inset: 0;
  background: var(--hc-modal-backdrop);
  animation: hcModalFadeIn 0.3s ease-out forwards;
}
.hcModalWrap{ position: relative; width: 100%; display: flex; justify-content: center; }

.hcModal{
  position: relative;
  width: var(--hc-modal-width);
  max-width: 90vw;
  max-height: 90vh;
  background: var(--hc-modal-bg);
  border-radius: var(--hc-modal-radius);
  box-shadow: var(--hc-modal-shadow);
  outline: none;
  overflow: hidden;
  animation: hcModalSlideIn 0.3s ease-out;
}

.hcModalHeader{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-loose);
  border-bottom: var(--border-width-thin) solid var(--hc-modal-border);
}
.hcModalTitle{
  margin: 0;
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--hc-modal-text-heading);
}
.hcModalClose{
  border: 0;
  background: transparent;
  cursor: pointer;
  color: var(--color-text-secondary);
  padding: var(--spacing-xs);
  border-radius: var(--radius-sm);
}

.hcModalBody{
  padding: var(--spacing-loose);
  max-height: 60vh;
  overflow: auto;
  color: var(--hc-modal-text);
}

.hcModalFooter{
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-tight);
  padding: var(--spacing-loose);
  border-top: var(--border-width-thin) solid var(--hc-modal-border);
}
`;

