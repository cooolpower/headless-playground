export const spaceCss = `
.hcSpace {
  display: flex;
  flex-direction: row;
  gap: var(--hc-space-gap, var(--spacing-base));
  align-items: center;
  justify-content: flex-start;
  flex-wrap: nowrap;
}

.hcSpace[data-direction="vertical"] {
  flex-direction: column;
}

.hcSpace[data-align="start"] {
  align-items: flex-start;
}
.hcSpace[data-align="center"] {
  align-items: center;
}
.hcSpace[data-align="end"] {
  align-items: flex-end;
}
.hcSpace[data-align="baseline"] {
  align-items: baseline;
}
.hcSpace[data-align="stretch"] {
  align-items: stretch;
}

.hcSpace[data-justify="start"] {
  justify-content: flex-start;
}
.hcSpace[data-justify="center"] {
  justify-content: center;
}
.hcSpace[data-justify="end"] {
  justify-content: flex-end;
}
.hcSpace[data-justify="space-between"] {
  justify-content: space-between;
}
.hcSpace[data-justify="space-around"] {
  justify-content: space-around;
}
.hcSpace[data-justify="space-evenly"] {
  justify-content: space-evenly;
}

.hcSpace[data-wrap="true"] {
  flex-wrap: wrap;
}
`;

