export const qrCodeCss = `
.hcQrCode {
  padding: var(--spacing-base);
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-md);
  background: var(--color-surface);
}

.hcQrCode[data-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
}
`;

