export const statisticCss = `
.hcStatistic{
  display: flex;
  flex-direction: column;
  gap: 0;
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
  line-height: 1.2;
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

.hcStatisticPrefix,
.hcStatisticSuffix{
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}

@keyframes hcStatisticShimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.hcStatisticSkeleton{
  height: 2rem;
  width: 10rem;
  border-radius: var(--radius-md);
  background: linear-gradient(
    90deg,
    var(--color-divider) 25%,
    var(--color-surface-hover) 50%,
    var(--color-divider) 75%
  );
  background-size: 200% 100%;
  animation: hcStatisticShimmer 2s ease-in-out infinite;
}
`;

