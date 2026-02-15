export const gridCss = `
.hcGrid {
  display: grid;
  grid-template-columns: var(--hc-grid-template-columns, repeat(1, 1fr));
  grid-template-rows: var(--hc-grid-template-rows, initial);
  grid-template-areas: var(--hc-grid-template-areas, none);
  grid-auto-flow: var(--hc-grid-auto-flow, row);
  gap: var(--hc-grid-gap, var(--spacing-base));
  min-height: var(--hc-grid-min-height, auto);

  justify-items: stretch;
  align-items: stretch;
  justify-content: start;
  align-content: start;
}

.hcGrid[data-justify-items="start"] { justify-items: start; }
.hcGrid[data-justify-items="center"] { justify-items: center; }
.hcGrid[data-justify-items="end"] { justify-items: end; }
.hcGrid[data-justify-items="stretch"] { justify-items: stretch; }

.hcGrid[data-align-items="start"] { align-items: start; }
.hcGrid[data-align-items="center"] { align-items: center; }
.hcGrid[data-align-items="end"] { align-items: end; }
.hcGrid[data-align-items="stretch"] { align-items: stretch; }

.hcGrid[data-justify-content="start"] { justify-content: start; }
.hcGrid[data-justify-content="center"] { justify-content: center; }
.hcGrid[data-justify-content="end"] { justify-content: end; }
.hcGrid[data-justify-content="space-between"] { justify-content: space-between; }
.hcGrid[data-justify-content="space-around"] { justify-content: space-around; }
.hcGrid[data-justify-content="space-evenly"] { justify-content: space-evenly; }

.hcGrid[data-align-content="start"] { align-content: start; }
.hcGrid[data-align-content="center"] { align-content: center; }
.hcGrid[data-align-content="end"] { align-content: end; }
.hcGrid[data-align-content="space-between"] { align-content: space-between; }
.hcGrid[data-align-content="space-around"] { align-content: space-around; }
.hcGrid[data-align-content="space-evenly"] { align-content: space-evenly; }
`;

