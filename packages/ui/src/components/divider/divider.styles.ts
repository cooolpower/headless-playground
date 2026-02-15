export const dividerCss = `
:root{
  --hc-divider-color: var(--color-divider);
}

.hcDivider{
  border: none;
  margin: 0;
  padding: 0;
  flex-shrink: 0;
  background: var(--hc-divider-color);
}

.hcDivider[data-orientation="horizontal"]{
  height: var(--border-width-thin);
  flex: 1;
}

.hcDivider[data-orientation="vertical"]{
  width: var(--border-width-thin);
  height: 100%;
}
`;

