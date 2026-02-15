export const imageCss = `
.hcImageContainer{
  position: relative;
  display: inline-block;
  width: var(--hc-image-w, auto);
  height: var(--hc-image-h, auto);
  overflow: hidden;
}

.hcImageContainer[data-preview="true"]{
  cursor: pointer;
}

.hcImageImg{
  width: 100%;
  height: 100%;
  object-fit: var(--hc-image-fit, cover);
  display: block;
}

.hcImageContainer[data-loading="true"] .hcImageImg,
.hcImageContainer[data-error="true"] .hcImageImg{
  display: none;
}

.hcImagePlaceholder,
.hcImageFallback{
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--spacing-base);
}

.hcImagePlaceholder{
  background: var(--color-surface-hover);
  color: var(--color-text-secondary);
}

.hcImageFallback{
  background: var(--color-semantic-error);
  color: var(--color-text-on-error);
}

.hcImagePreviewOverlay{
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  background: color-mix(in oklch, var(--color-neutral-0) 80%, transparent);
  cursor: pointer;
}

.hcImagePreviewClose{
  position: absolute;
  top: var(--spacing-xl, 1.5rem);
  right: var(--spacing-xl, 1.5rem);
  padding: 0.25rem 0.75rem;
  border: none;
  border-radius: 9999px;
  background: color-mix(in oklch, var(--color-neutral-900) 90%, transparent);
  color: var(--color-text-on-primary, #fff);
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
}

.hcImagePreviewClose:focus-visible{
  outline: 2px solid var(--color-focus-ring, var(--color-primary));
  outline-offset: 2px;
}

.hcImagePreviewImg{
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  display: block;
}
`;

