export const statisticCss = `
.hcStatistic{
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.hcStatisticTitle{
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.hcStatisticContent{
  display: inline-flex;
  align-items: baseline;
  gap: var(--spacing-xs);
}

.hcStatisticValue{
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

.hcStatisticPrefix,
.hcStatisticSuffix{
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}

.hcStatisticSkeleton{
  height: 2rem;
  width: 10rem;
  border-radius: var(--radius-md);
  background: var(--color-surface-hover);
}
`;

