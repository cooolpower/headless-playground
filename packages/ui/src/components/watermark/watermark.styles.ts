export const watermarkCss = `
.hcWatermarkContainer {
  position: relative;
  overflow: hidden;
}

.hcWatermark {
  --hc-watermark-opacity: 0.1;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  font-size: 3rem; /* 48px */
  font-weight: 700;
  color: var(--color-text-heading);
  opacity: var(--hc-watermark-opacity);
  pointer-events: none;
  z-index: 0;
  white-space: nowrap;
}
`;

