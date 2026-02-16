export const qrCodeCss = `
.hcQrCode {
  display: inline-flex;
  //padding: var(--spacing-base);
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  min-width: 128px;
  min-height: 128px;
  align-items: center;
  justify-content: center;
}

.hcQrCodeContent {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hcQrCodeContent > .hcWatermarkContainer {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hcQrCodeContent .hcWatermark{
  --hc-watermark-opacity: 1 !important;
  font-size: 2rem !important;
}

.hcQrCodeSvg{
  display: flex;
  flex:1;
}

.hcQrCodeSvg svg {
  display: block;
  max-width: 100%;
  height: auto;
}

.hcQrCodePlaceholder {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.hcQrCode[data-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
}

.hcQrCode[data-loading="true"] {
  opacity: 0.7;
}
`;

