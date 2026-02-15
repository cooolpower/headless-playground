export const loadingBarCss = `
.hcLoadingBar{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--loading-bar-height, 0.1875rem);
  z-index: 9999;
  background: transparent;
  overflow: hidden;
}

.hcLoadingBarProgress{
  height: 100%;
  background: var(--loading-bar-color, var(--color-semantic-info));
  transition: width 0.3s ease-in-out;
  transform-origin: left;
}
`;

