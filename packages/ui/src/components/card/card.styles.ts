export const cardCss = `
.hcCard{
  border: var(--border-width-thin) solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  color: var(--color-text);
  overflow: hidden;
}

.hcCard[data-clickable="true"]{
  cursor: pointer;
}

.hcCard[data-disabled="true"]{
  cursor: not-allowed;
  opacity: 0.7;
}

.hcCardHeader{
  padding: var(--spacing-lg) var(--spacing-lg) 0;
  // border-bottom: var(--border-width-thin) solid var(--color-divider);
}

.hcCardContent{
  padding: var(--spacing-lg);
}

.hcCardFooter{
  padding: var(--spacing-lg);
  // border-top: var(--border-width-thin) solid var(--color-divider);
}
`;

