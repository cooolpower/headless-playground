export const iconCss = `
.hcIcon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  width: var(--hc-icon-size, var(--spacing-xl));
  height: var(--hc-icon-size, var(--spacing-xl));
  font-size: var(--hc-icon-size, var(--spacing-xl));
}

.hcIcon[data-size="small"] {
  --hc-icon-size: var(--spacing-base);
}

.hcIcon[data-size="medium"] {
  --hc-icon-size: var(--spacing-xl);
}

.hcIcon[data-size="large"] {
  --hc-icon-size: var(--spacing-2xl);
}
`;

