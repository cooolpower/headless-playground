export const menuCss = `
:root{
  --hc-menu-danger: var(--color-semantic-error);
}

.hcMenuTitle{
  display: inline;
}

.hcMenuTitle[data-danger="true"]{
  color: var(--hc-menu-danger);
}
`;

