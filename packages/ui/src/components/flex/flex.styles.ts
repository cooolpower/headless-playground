export const flexCss = `
.hcFlex {
  display: flex;
  flex-direction: var(--hc-flex-direction, row);
  flex-wrap: var(--hc-flex-wrap, nowrap);
  justify-content: var(--hc-flex-justify, flex-start);
  align-items: var(--hc-flex-align, stretch);
  gap: var(--hc-flex-gap, 0px);
}

.hcFlex[data-inline="true"] {
  display: inline-flex;
}
`;

